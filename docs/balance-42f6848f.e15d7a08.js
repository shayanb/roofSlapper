parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"lQGD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,require("regenerator-runtime/runtime");var e=require("./onboard-fc062f99.js");function n(e,n,r,t,a,i,u){try{var o=e[i](u),c=o.value}catch(s){return void r(s)}o.done?n(c):Promise.resolve(c).then(t,a)}function r(e){return function(){var r=this,t=arguments;return new Promise(function(a,i){var u=e.apply(r,t);function o(e){n(u,a,i,o,c,"next",e)}function c(e){n(u,a,i,o,c,"throw",e)}o(void 0)})}}function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{minimumBalance:"0"},t=n.minimumBalance,a=n.heading,i=n.description,u=n.icon,o=n.html,c=n.button;return function(){var n=r(regeneratorRuntime.mark(function n(r){var s,l,f,m;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(s=r.balance,l=r.BigNumber,f=r.stateSyncStatus,m=r.stateStore,null!==s){n.next=10;break}if(!f.balance){n.next=10;break}return n.prev=3,n.next=6,f.balance;case 6:n.next=10;break;case 8:n.prev=8,n.t0=n.catch(3);case 10:if(!l(m.balance.get()).lt(l(t))){n.next=12;break}return n.abrupt("return",{heading:a||"Get Some ETH",description:i||"Your current account has less than the necessary minimum balance of ".concat(l(t).div(l("1000000000000000000")).toString(10)," ETH."),eventCode:"nsfFail",icon:u||e.d,html:o,button:c});case 12:case"end":return n.stop()}},n,null,[[3,8]])}));return function(e){return n.apply(this,arguments)}}()}require("bignumber.js"),require("bnc-sdk"),require("bowser");var a=t;exports.default=a;
},{"regenerator-runtime/runtime":"VuXv","./onboard-fc062f99.js":"S1Lg","bignumber.js":"hCCC","bnc-sdk":"sIJN","bowser":"bdFC"}]},{},[], null)