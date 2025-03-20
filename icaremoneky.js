// ==UserScript==
// @name         iCareMonkey
// @namespace    http://parceiro.sky.com.br
// @version      1.3.3
// @description  iCareMonkey
// @author       Você
// @match        https://parceiro.sky.com.br/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/lemardigital/icaremonkey/refs/heads/main/icaremoneky.js
// @downloadURL  https://raw.githubusercontent.com/lemardigital/icaremonkey/refs/heads/main/icaremoneky.js
// ==/UserScript==

(function() {
    'use strict';

    const loginSimultaneo = `{
        true
        }`;
        // Intercepta XMLHttpRequest LoginSimultaneo
        const loginSimultaneoOriginal = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url, ...rest) {
            if (url.includes("LoginSimultaneo.ashx")) {
                console.log("[Tampermonkey] Interceptando LoginSimultaneo.ashx (XHR)");
    
                this.addEventListener("readystatechange", function() {
                    if (this.readyState === 4) {
                        Object.defineProperty(this, "responseText", {
                            get: () => loginSimultaneo
                        });
                    }
                });
            }
    
            loginSimultaneoOriginal.call(this, method, url, ...rest);
        };

    // Cria um JSON seguro para uso dentro do script
    const safeJSON = (function() {
        try {
            if (typeof window.JSON?.parse === 'function' && typeof window.JSON?.stringify === 'function') {
                return { parse: window.JSON.parse, stringify: window.JSON.stringify };
            }
        } catch (e) {
            console.warn("[Tampermonkey] JSON nativo indisponível, usando fallback.");
        }

        return {
            parse: function(text) {
                try {
                    return (new Function("return " + text))();
                } catch (error) {
                    throw new Error("JSON inválido: " + error.message);
                }
            }
        };
    })();

    // Obtém data e período atual
    function getCurrentDateInfo() {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentDay = now.getDate();
        const hours = now.getHours();

        let period = "";
        if (hours < 13) {
            period = "Manha";
        } else if (hours < 18) {
            period = "Tarde";
        } else {
            period = "Noite";
        }

        return { currentMonth, currentDay, period };
    }

    const periodList = ["Manha", "Tarde", "Noite"];

    function toJSONString(obj) {
        return Object.keys(obj).map(key => {
            const value = obj[key];

            // Se o valor for um objeto, processa recursivamente
            if (value && typeof value === "object") {
                // Se for um array, mapeia cada item do array recursivamente
                if (Array.isArray(value)) {
                    return `"${key}": [${value.map(item => `{${toJSONString(item)}}`).join(", ")}]`;
                } else {
                    // Se for um objeto, chama a função recursivamente
                    return `"${key}": {${toJSONString(value)}}`;
                }
            } else {
                // Se o valor for um número ou null, não coloca aspas
                if (value === null) {
                    return `"${key}": null`;
                } else if (typeof value === "number" || typeof value === "boolean") {
                    return `"${key}": ${value}`;
                } else if (typeof value === "string" && value.startsWith("/Date(") && value.endsWith(")/")) {
                    // Formato especial de data como /Date(1741833056450)/, com as barras invertidas escapadas
                    return `"${key}": "\\/Date(${value.slice(6, -2)})\\/"`; // Escapa as barras invertidas corretamente
                } else {
                    // Coloca aspas para strings comuns
                    return `"${key}": "${value}"`;
                }
            }
        }).join(", ");
    }

    // Intercepta XMLHttpRequest
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        if (url.includes("DealerCapacity.ashx")) {
            console.log("[Tampermonkey] Interceptando DealerCapacity.ashx (XHR)");

            this.addEventListener("readystatechange", function() {
                if (this.readyState === 4) {
                    try {
                        let json = safeJSON.parse(this.responseText);
                        const { currentMonth, currentDay, period } = getCurrentDateInfo();

                        if (json.Capacidade?.Month === currentMonth) {
                            console.log("[Tampermonkey] Mês atual identificado, aplicando override...");

                            let days = json.Capacidade.Days;
                            if (!Array.isArray(days)) {
                                console.warn("[Tampermonkey] Estrutura de Days inválida.");
                                return;
                            }

                            const dayIndex = currentDay - 1;
                            const periodIndex = periodList.indexOf(period);

                            for (let d = dayIndex; d < days.length; d++) {
                                let day = days[d];
                                if (!day.Periods) continue;

                                if (d === dayIndex) {
                                    for (let p = periodIndex; p < periodList.length; p++) {
                                        let periodName = periodList[p];
                                        if (day.Periods[periodName]) {
                                            day.Periods[periodName].Status = 0;
                                        }
                                    }
                                } else {
                                    for (let periodName of periodList) {
                                        if (day.Periods[periodName]) {
                                            day.Periods[periodName].Status = 0;
                                        }
                                    }
                                }
                            }
                        }

                        console.log("[Tampermonkey] Capacidade modificada:", json);

                        const modifiedContent = json;
                        const jsonData = `{${toJSONString(modifiedContent)}}`;
                        console.log(jsonData);

                        Object.defineProperty(this, "responseText", {
                            get: () => jsonData
                        });

                    } catch (error) {
                        console.warn("[Tampermonkey] Erro ao processar JSON:", error);
                    }
                }
            });
        }

        originalOpen.call(this, method, url, ...rest);
    };

})();
