parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"qsxw":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./content-612bd04b.js");function n(e,n,r,t,i,o,a){try{var s=e[o](a),l=s.value}catch(d){return void r(d)}s.done?n(l):Promise.resolve(l).then(t,i)}function r(e){return function(){var r=this,t=arguments;return new Promise(function(i,o){var a=e.apply(r,t);function s(e){n(a,i,o,s,l,"next",e)}function l(e){n(a,i,o,s,l,"throw",e)}s(void 0)})}}var t='\n  <svg width="40px" height="40px" viewBox="0 0 132 132" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>Shape Copy</title>\n    <desc>Created with Sketch.</desc>\n    <defs>\n        <linearGradient x1="15.8%" y1="84.9%" x2="106.3%" y2="-17.2%" id="linearGradient-1">\n            <stop stop-color="#0877FF" offset="0%"></stop>\n            <stop stop-color="#3CCEF9" offset="100%"></stop>\n        </linearGradient>\n    </defs>\n    <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <path d="M65.8599735,0.000607031223 C64.4416737,0.000607031223 63.0363726,0.0454744869 61.6440701,0.135209398 C59.3754119,0.301605871 57.6214113,2.19771449 57.6274798,4.47722124 L57.6274798,32.8001645 C57.6294466,34.0359685 58.1568063,35.2123819 59.0774227,36.0346405 C59.9980391,36.8568991 61.224677,37.2470878 62.4499879,37.1074402 C63.5818523,36.9749894 64.7204182,36.9083004 65.8599735,36.9077077 C77.6016631,36.9077077 88.1871903,43.995619 92.6805403,54.8663598 C97.1738904,65.7371006 94.690175,78.2498645 86.3875466,86.5699693 C78.0849183,94.8900741 65.5984376,97.3790175 54.7505309,92.8762093 C43.9026243,88.373401 36.8296011,77.765592 36.8296011,65.999187 L36.8296011,19.2231276 C36.8304083,16.5637094 35.3161377,14.1371901 32.9297089,12.9738059 C30.54328,11.8104217 27.7035052,12.1143438 25.6160782,13.7565347 C9.44722987,26.2414401 -0.0174670853,45.544213 2.42011117e-05,65.999187 C2.42011117e-05,102.411298 30.0832892,132.297366 66.4189165,131.997767 C102.792362,131.843094 132.153742,102.169136 131.999394,65.7191272 C131.845046,29.269118 102.233419,-0.154065705 65.8599735,0.000607031223 Z" id="Shape-Copy" fill="url(#linearGradient-1)" fill-rule="nonzero"></path>\n    </g>\n  </svg>\n';function i(n){var i=n.preferred;return{name:n.label||"Ownbit",iconSrc:n.iconSrc,svg:n.svg||t,wallet:function(){var e=r(regeneratorRuntime.mark(function e(n){var r,t,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.getProviderName,t=n.createModernProviderInterface,i=window.ethereum||window.web3&&window.web3.currentProvider,e.abrupt("return",{provider:i,interface:"Ownbit"===r(i)&&t(i)||null});case 3:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),type:"injected",link:"https://ownbit.io",installMessage:e.m,mobile:!0,preferred:i}}var o=i;exports.default=o;
},{"./content-612bd04b.js":"DLd2"}]},{},[], null)