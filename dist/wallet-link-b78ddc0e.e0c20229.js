parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"VTne":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./icon-coinbase-7f74eb94.js");function n(e,n,r,t,o,a,c){try{var u=e[a](c),i=u.value}catch(s){return void r(s)}u.done?n(i):Promise.resolve(i).then(t,o)}function r(e){return function(){var r=this,t=arguments;return new Promise(function(o,a){var c=e.apply(r,t);function u(e){n(c,o,a,u,i,"next",e)}function i(e){n(c,o,a,u,i,"throw",e)}u(void 0)})}}function t(n){var t=n.rpcUrl,o=n.appName,a=n.appLogoUrl,c=n.networkId,u=n.preferred,i=n.label,s=n.iconSrc;return{name:i||"Coinbase Wallet",svg:n.svg||e.c,iconSrc:s,wallet:function(){var e=r(regeneratorRuntime.mark(function e(n){var r,u,i,s,f,l,p;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.getBalance,u=n.getAddress,i=n.getNetwork,e.next=3,require("_bundle_loader")(require.resolve("walletlink"));case 3:return s=e.sent,f=s.default,l=new f({appName:o,appLogoUrl:a}),p=l.makeWeb3Provider(t,c),e.abrupt("return",{provider:p,interface:{name:"WalletConnect",connect:function(){return new Promise(function(e,n){p.enable().then(function(n){return e(n)}).catch(function(){return n({message:"This dapp needs access to your account information."})})})},disconnect:function(){p.disconnect()},address:{get:function(){return u(p)}},network:{get:function(){return i(p)}},balance:{get:function(){return r(p)}}}});case 8:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),type:"sdk",desktop:!0,preferred:u}}var o=t;exports.default=o;
},{"./icon-coinbase-7f74eb94.js":"tSEK","_bundle_loader":"yU0Q","walletlink":[["dist.0d73acf1.js","RnBH"],"RnBH"]}],"ARet":[function(require,module,exports) {
var t=null;function e(){return t||(t=n()),t}function n(){try{throw new Error}catch(e){var t=(""+e.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);if(t)return r(t[0])}return"/"}function r(t){return(""+t).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/,"$1")+"/"}exports.getBundleURL=e,exports.getBaseURL=r;
},{}],"yU0Q":[function(require,module,exports) {
var r=require("./bundle-url").getBundleURL;function e(r){Array.isArray(r)||(r=[r]);var e=r[r.length-1];try{return Promise.resolve(require(e))}catch(n){if("MODULE_NOT_FOUND"===n.code)return new s(function(n,i){t(r.slice(0,-1)).then(function(){return require(e)}).then(n,i)});throw n}}function t(r){return Promise.all(r.map(u))}var n={};function i(r,e){n[r]=e}module.exports=exports=e,exports.load=t,exports.register=i;var o={};function u(e){var t;if(Array.isArray(e)&&(t=e[1],e=e[0]),o[e])return o[e];var i=(e.substring(e.lastIndexOf(".")+1,e.length)||e).toLowerCase(),u=n[i];return u?o[e]=u(r()+e).then(function(r){return r&&module.bundle.register(t,r),r}).catch(function(r){throw delete o[e],r}):void 0}function s(r){this.executor=r,this.promise=null}s.prototype.then=function(r,e){return null===this.promise&&(this.promise=new Promise(this.executor)),this.promise.then(r,e)},s.prototype.catch=function(r){return null===this.promise&&(this.promise=new Promise(this.executor)),this.promise.catch(r)};
},{"./bundle-url":"ARet"}],"Bs6y":[function(require,module,exports) {
module.exports=function(n){return new Promise(function(e,o){var r=document.createElement("script");r.async=!0,r.type="text/javascript",r.charset="utf-8",r.src=n,r.onerror=function(n){r.onerror=r.onload=null,o(n)},r.onload=function(){r.onerror=r.onload=null,e()},document.getElementsByTagName("head")[0].appendChild(r)})};
},{}],0:[function(require,module,exports) {
var b=require("yU0Q");b.register("js",require("Bs6y"));b.load([]).then(function(){require("VTne");});
},{}]},{},[0], null)