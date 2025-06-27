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
            },
            stringify: function(obj) {
                try {
                    return Object.prototype.toString.call(obj) === "[object Object]" || Array.isArray(obj)
                        ? new Function("return JSON.stringify")(obj)  // tenta acessar nativamente, mesmo que sobrescrito
                        : String(obj);
                } catch (error) {
                    throw new Error("Erro ao converter JSON: " + error.message);
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

    const n8nWebhookURL = "https://mtsmendoa.app.n8n.cloud/webhook-test/d0e972f6-886d-4e8d-839f-bacce28bf3f8";

    // Intercepta XMLHttpRequest - JobCardManagement
    const jobcardOpenOriginal = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        if (url.includes("JobCardManagement.ashx")) {
            const _this = this;
            const originalSend = this.send;

            this.send = function(body) {
                let isTargetRequest = false;

                try {
                    const parsedBody = safeJSON.parse(body);
                    if (parsedBody?.HandleAction === "GetJobcardDetail") {
                        isTargetRequest = true;
                        console.log("[Tampermonkey] Interceptando GetJobcardDetail:", parsedBody);
                    }
                } catch (e) {
                    console.warn("[Tampermonkey] Erro ao analisar corpo do request:", e);
                }

                if (isTargetRequest) {
                    _this.addEventListener("readystatechange", function() {
                        if (_this.readyState === 4) {
                            try {
                                // Envia o responseText diretamente, sem parse/stringify
                                console.log("[Tampermonkey] Enviando conteúdo para webhook n8n...");

                                fetch(n8nWebhookURL, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: _this.responseText
                                }).then(res => {
                                    if (!res.ok) {
                                        console.warn("[Tampermonkey] Webhook retornou erro:", res.status);
                                    } else {
                                        console.log("[Tampermonkey] Dados enviados com sucesso ao webhook!");
                                    }
                                }).catch(err => {
                                    console.warn("[Tampermonkey] Falha ao enviar para webhook:", err);
                                });
                            } catch (err) {
                                console.warn("[Tampermonkey] Erro ao processar resposta JSON:", err);
                            }
                        }
                    });
                }

                return originalSend.call(this, body);
            };
        }

        return jobcardOpenOriginal.call(this, method, url, ...rest);
    };


})();
