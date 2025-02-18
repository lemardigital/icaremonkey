// ==UserScript==
// @name         iCareMonkey
// @namespace    http://parceiro.sky.com.br
// @version      1.4
// @description  iCareMonkey
// @author       Você
// @match        https://parceiro.sky.com.br/*
// @grant        none
// ==/UserScript==
// @updateURL    https://raw.githubusercontent.com/lemardigital/icaremonkey/refs/heads/main/icaremoneky.js
// @downloadURL  https://raw.githubusercontent.com/lemardigital/icaremonkey/refs/heads/main/icaremoneky.js

(function() {
    'use strict';

    // Conteúdo do arquivo DealerCapacity.ashx
    const customContent = `{
    "Capacidade":{"CustomerCode":0,"ZipCode":null,"Reason":0,"ServiceType":null,"DeviceModel":0,"Month":2,"Year":2025,"Days":[{"Day":1,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":2,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":3,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":4,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":5,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":6,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":7,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":8,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":9,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":10,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":11,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":12,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":13,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":14,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":15,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":16,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":17,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":18,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":19,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":20,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":21,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":22,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":23,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":24,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":25,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":26,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":27,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}},{"Day":28,"Month":2,"Year":2025,"Periods":{"Manha":{"PeriodName":"M","Period":{"Period":"M","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Tarde":{"PeriodName":"T","Period":{"Period":"T","InitialTime":"\/Date(1738412980393)\/"},"Status":0},"Noite":{"PeriodName":"N","Period":{"Period":"N","InitialTime":"\/Date(1738412980393)\/"},"Status":0}}}]},"OK":true,"Mensagem":null,"DealerId":0
    }`;


    // Intercepta XMLHttpRequest
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        if (url.includes("DealerCapacity.ashx")) {
            console.log("[Tampermonkey] Interceptando DealerCapacity.ashx (XHR)");

            this.addEventListener("readystatechange", function() {
                if (this.readyState === 4) {
                    Object.defineProperty(this, "responseText", {
                        get: () => customContent
                    });
                }
            });
        }

        originalOpen.call(this, method, url, ...rest);
    };

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
})();

//teste