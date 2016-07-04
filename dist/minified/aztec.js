!function(){"use strict";function e(e){l.debug&&console.log("[Aztec.js Debug] "+e)}function t(e){console.err("[Aztec.js Error] "+e)}function n(e){var t=e.match(o),n=l.getCurrentLocale();for(var r in t){var a=t[r].substring(2,t[r].length-2);e=n[a]?e.replace(i+a+c,n[a]):e.replace(i+a+c,"")}return e}var r={},a="default",o=/{%[a-zA-Z0-9_]+%}/gim,i="{%",c="%}",l={debug:!1,translateAttr:"render",addLocale:function(n,a){return"string"!=typeof n?(t("addLocale() - <name> parameter is not a String!"),!1):"object"!=typeof a?(t("addLocale() - <keys> parameter is not an Object!"),!1):(r[n]=a,e("Locale <"+n+"> added."),!0)},setLocale:function(n){return"string"!=typeof n?(t("setLocale() - <name> parameter is not a String!"),!1):null===r[n]?(t("setLocale() - Locale with given <name> does not exist: "+n),!1):(a=n,e("Locale <"+n+"> activated."),!0)},render:function(t){l.debug&&console.time("Elapsed time"),t=t||document.body,t==document.body&&e("render() - <element> is not specified or it is body, rendering whole page...");for(var r=t.querySelectorAll("["+this.translateAttr+"]"),a=0;a<r.length;a++)e("Rendering node: "+a),r[a].innerHTML=n(r[a].getAttribute(this.translateAttr));l.debug&&console.timeEnd("Elapsed time")},getCurrentLocale:function(){return r[a]},translate:function(e){return"string"!=typeof e?(t("translate() - <name> parameter is not a String!"),!1):null===l.getCurrentLocale()[e]?(t("translate() - key with given name does not exist: "+e),!1):l.getCurrentLocale()[e]}};window.Aztec=l}();