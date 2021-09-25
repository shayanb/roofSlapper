parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"yLaI":[function(require,module,exports) {
const t=t=>"injected"===t?"injected":t.endsWith(".ipc")?"ipc":t.startsWith("wss://")||t.startsWith("ws://")?"ws":t.startsWith("https://")||t.startsWith("http://")?"http":"";module.exports=((o,c)=>[].concat(...[].concat(o).map(o=>c[o]?c[o].map(c=>({type:o,location:c,protocol:t(c)})):{type:"custom",location:o,protocol:t(o)})).filter(t=>!(!t.protocol&&"injected"!==t.type)||(console.log('eth-provider | Invalid provider preset/location: "'+t.location+'"'),!1)));
},{}],"rOzs":[function(require,module,exports) {
const t=require("events");class s extends t{constructor(t){super(),this.enable=this.enable.bind(this),this._send=this._send.bind(this),this.send=this.send.bind(this),this._sendBatch=this._sendBatch.bind(this),this.subscribe=this.subscribe.bind(this),this.unsubscribe=this.unsubscribe.bind(this),this.sendAsync=this.sendAsync.bind(this),this.sendAsyncBatch=this.sendAsyncBatch.bind(this),this.isConnected=this.isConnected.bind(this),this.close=this.close.bind(this),this.request=this.request.bind(this),this.connected=!1,this.nextId=0,this.promises={},this.subscriptions=[],this.connection=t,this.connection.on("connect",()=>this.checkConnection()),this.connection.on("close",()=>{this.connected=!1,this.emit("close"),this.emit("disconnect")}),this.connection.on("payload",t=>{const{id:s,method:e,error:i,result:n}=t;void 0!==s?this.promises[s]&&(t.error?this.promises[s].reject(i):this.promises[s].resolve(n),delete this.promises[s]):e&&e.indexOf("_subscription")>-1&&(this.emit(t.params.subscription,t.params.result),this.emit(e,t.params),this.emit("message",{type:t.method,data:{subscription:t.params.subscription,result:t.params.result}}),this.emit("data",t))}),this.on("newListener",(t,s)=>{"chainChanged"===t&&!this.attemptedChainSubscription&&this.connected?this.startChainSubscription():"accountsChanged"===t&&!this.attemptedAccountsSubscription&&this.connected?this.startAccountsSubscription():"networkChanged"===t&&!this.attemptedNetworkSubscription&&this.connected&&(this.startNetworkSubscription(),console.warn("The networkChanged event is being deprecated, use chainChainged instead"))})}async checkConnection(){try{this.emit("connect",await this._send("net_version")),this.connected=!0,this.listenerCount("networkChanged")&&!this.attemptedNetworkSubscription&&this.startNetworkSubscription(),this.listenerCount("chainChanged")&&!this.attemptedChainSubscription&&this.startNetworkSubscription(),this.listenerCount("accountsChanged")&&!this.attemptedAccountsSubscription&&this.startAccountsSubscription()}catch(t){this.connected=!1}}async startNetworkSubscription(){this.attemptedNetworkSubscription=!0;try{const s=await this.subscribe("eth_subscribe","networkChanged");this.on(s,t=>this.emit("networkChanged",t))}catch(t){console.warn("Unable to subscribe to networkChanged",t)}}async startChainSubscription(){this.attemptedChainSubscription=!0;try{const s=await this.subscribe("eth_subscribe","chainChanged");this.on(s,t=>this.emit("chainChanged",t))}catch(t){console.warn("Unable to subscribe to chainChanged",t)}}async startAccountsSubscription(){this.attemptedAccountsSubscription=!0;try{const s=await this.subscribe("eth_subscribe","accountsChanged");this.on(s,t=>this.emit("accountsChanged",t))}catch(t){console.warn("Unable to subscribe to accountsChanged",t)}}enable(){return new Promise((t,s)=>{this._send("eth_accounts").then(e=>{if(e.length>0)this.accounts=e,this.coinbase=e[0],this.emit("enable"),t(e);else{const t=new Error("User Denied Full Provider");t.code=4001,s(t)}}).catch(s)})}_send(t,s=[]){return new Promise((e,i)=>{let n;"object"==typeof t&&null!==t?((n=t).params=n.params||[],n.jsonrpc="2.0",n.id=this.nextId++):n={jsonrpc:"2.0",id:this.nextId++,method:t,params:s},this.promises[n.id]={resolve:e,reject:i},n.method&&"string"==typeof n.method?n.params instanceof Array?this.connection.send(n):(this.promises[n.id].reject(new Error("Params is not a valid array.")),delete this.promises[n.id]):(this.promises[n.id].reject(new Error("Method is not a valid string.")),delete this.promises[n.id])})}send(...t){return this._send(...t)}_sendBatch(t){return Promise.all(t.map(t=>this._send(t.method,t.params)))}subscribe(t,s,e=[]){return this._send(t,[s,...e]).then(t=>(this.subscriptions.push(t),t))}unsubscribe(t,s){return this._send(t,[s]).then(t=>{if(t)return this.subscriptions=this.subscriptions.filter(t=>t!==s),this.removeAllListeners(s),t})}sendAsync(t,s){return s&&"function"==typeof s?t?(t.jsonrpc="2.0",t.id=t.id||this.nextId++,t instanceof Array?this.sendAsyncBatch(t,s):this._send(t.method,t.params).then(e=>{s(null,{id:t.id,jsonrpc:t.jsonrpc,result:e})}).catch(t=>{s(t)})):s(new Error("Invalid Payload")):s(new Error("Invalid or undefined callback provided to sendAsync"))}sendAsyncBatch(t,s){return this._sendBatch(t).then(e=>{const i=e.map((s,e)=>({id:t[e].id,jsonrpc:t[e].jsonrpc,result:s}));s(null,i)}).catch(t=>{s(t)})}isConnected(){return this.connected}close(){this.connection&&this.connection.close&&this.connection.close(),this.connected=!1;const t=new Error("Provider closed, subscription lost, please subscribe again.");this.subscriptions.forEach(s=>this.emit(s,t)),this.subscriptions=[]}request(t){return this._send(t.method,t.params)}}module.exports=s;
},{"events":"LMQS"}],"JZ6N":[function(require,module,exports) {
const t=require("events"),e=!1;class n extends t{constructor(t,e,n){super(),this.targets=e,this.options=n,this.connections=t,this.connected=!1,this.status="loading",this.interval=n.interval||5e3,this.name=n.name||"default",this.inSetup=!0,this.connect()}connect(t=0){if(e&&0===t&&console.log(`\n\n\n\nA connection cycle started for provider with name: ${this.name}`),this.connection&&"connected"===this.connection.status&&t>=this.connection.index)e&&console.log("Stopping connection cycle becasuse we're already connected to a higher priority provider");else if(0===this.targets.length)e&&console.log("No valid targets supplied");else{const{protocol:n,location:o}=this.targets[t];this.connection=this.connections[n](o,this.options),this.connection.on("error",e=>this.connected?this.listenerCount("error")?this.emit("error",e):void console.warn("eth-provider - Uncaught connection error: "+e.message):this.connectionError(t,e)),this.connection.on("close",()=>{this.connected=!1,this.emitClose(),this.closing||this.refresh()}),this.connection.on("connect",()=>{this.connection.target=this.targets[t],this.connection.index=t,this.targets[t].status=this.connection.status,this.connected=!0,this.inSetup=!1,e&&console.log("Successfully connected to: "+this.targets[t].location),this.emit("connect")}),this.connection.on("data",t=>this.emit("data",t)),this.connection.on("payload",t=>this.emit("payload",t))}}refresh(t=this.interval){e&&console.log(`Reconnect queued for ${(t/1e3).toFixed(2)}s in the future`),clearTimeout(this.connectTimer),this.connectTimer=setTimeout(()=>this.connect(),t)}connectionError(t,n){this.targets[t].status=n,this.targets.length-1===t?(this.inSetup=!1,e&&console.warn("eth-provider unable to connect to any targets, view connection cycle summary: ",this.targets),this.refresh()):this.connect(++t)}emitClose(){this.emit("close")}close(){this.closing=!0,this.connection&&this.connection.close&&!this.connection.closed?this.connection.close():this.emit("close"),clearTimeout(this.connectTimer),clearTimeout(this.setupTimer)}error(t,e,n=-1){this.emit("payload",{id:t.id,jsonrpc:t.jsonrpc,error:{message:e,code:n}})}send(t){this.inSetup?this.setupTimer=setTimeout(()=>this.send(t),100):this.connection.closed?this.error(t,"Not connected",4900):this.connection.send(t)}}module.exports=n;
},{"events":"LMQS"}],"JmAo":[function(require,module,exports) {
const e=require("events"),n=require("ethereum-provider"),t=require("../ConnectionManager"),i=n=>{function t(t){n.status=t,n instanceof e&&n.emit("status",t)}async function i(){if(n.inSetup)return setTimeout(i,1e3);try{await n.send("eth_syncing")?(t("syncing"),setTimeout(()=>i(),5e3)):t("connected")}catch(e){t("disconnected")}}return t("loading"),i(),n.on("connect",()=>i()),n.on("close",()=>t("disconnected")),n};module.exports=((e,r,c)=>{if(e.injected.__isProvider&&r.map(e=>e.type).indexOf("injected")>-1)return delete e.injected.__isProvider,i(e.injected);const s=new n(new t(e,r,c));return s.setMaxListeners(128),i(s)});
},{"events":"LMQS","ethereum-provider":"rOzs","../ConnectionManager":"JZ6N"}],"BqEi":[function(require,module,exports) {
module.exports=((i={})=>({injected:["injected"],frame:["ws://127.0.0.1:1248","http://127.0.0.1:1248"],direct:["ws://127.0.0.1:8546","http://127.0.0.1:8545"],infura:[`wss://mainnet.infura.io/ws/v3/${i.infuraId}`,`https://mainnet.infura.io/v3/${i.infuraId}`],alchemy:[`wss://eth-mainnet.ws.alchemyapi.io/v2/${i.alchemyId}`,`https://eth-mainnet.alchemyapi.io/v2/${i.alchemyId}`],infuraRopsten:[`wss://ropsten.infura.io/ws/v3/${i.infuraId}`,`https://ropsten.infura.io/v3/${i.infuraId}`],alchemyRopsten:[`wss://eth-ropsten.ws.alchemyapi.io/v2/${i.alchemyId}`,`https://eth-ropsten.alchemyapi.io/v2/${i.alchemyId}`],infuraRinkeby:[`wss://rinkeby.infura.io/ws/v3/${i.infuraId}`,`https://rinkeby.infura.io/v3/${i.infuraId}`],alchemyRinkeby:[`wss://eth-rinkeby.ws.alchemyapi.io/v2/${i.alchemyId}`,`https://eth-rinkeby.alchemyapi.io/v2/${i.alchemyId}`],infuraKovan:[`wss://kovan.infura.io/ws/v3/${i.infuraId}`,`https://kovan.infura.io/v3/${i.infuraId}`],alchemyKovan:[`wss://eth-kovan.ws.alchemyapi.io/v2/${i.alchemyId}`,`https://eth-kovan.alchemyapi.io/v2/${i.alchemyId}`],infuraGoerli:[`wss://goerli.infura.io/ws/v3/${i.infuraId}`,`https://goerli.infura.io/ws/v3/${i.infuraId}`],alchemyGoerli:[`wss://eth-goerli.ws.alchemyapi.io/v2/${i.alchemyId}`,`https://eth-goerli.alchemyapi.io/v2/${i.alchemyId}`],idChain:["wss://idchain.one/ws/"],xDai:["https://rpc.xdaichain.com","https://dai.poa.network"],matic:["https://rpc-mainnet.maticvigil.com"]}));
},{}],"fOi9":[function(require,module,exports) {
const e=require("events");class r extends e{constructor(e,r){super(),e?setTimeout(()=>this.emit("error",new Error("Injected web3 provider is not currently supported")),0):setTimeout(()=>this.emit("error",new Error("No injected provider found")),0)}}module.exports=(e=>t=>new r(e,t));
},{"events":"LMQS"}],"Voyf":[function(require,module,exports) {
const e=require("events");class r extends e{constructor(e){super(),setTimeout(()=>this.emit("error",new Error(e)),0)}}module.exports=(e=>()=>new r(e));
},{"events":"LMQS"}],"sZJA":[function(require,module,exports) {
let e,r;module.exports=((l,t)=>{const o=[];l.replace(/\}[\n\r]?\{/g,"}|--|{").replace(/\}\][\n\r]?\[\{/g,"}]|--|[{").replace(/\}[\n\r]?\[\{/g,"}|--|[{").replace(/\}\][\n\r]?\{/g,"}]|--|{").split("|--|").forEach(l=>{let a;e&&(l=e+l);try{a=JSON.parse(l)}catch(c){return e=l,clearTimeout(r),void(r=setTimeout(()=>t(new Error("Parse response timeout")),15e3))}clearTimeout(r),e=null,a&&o.push(a)}),t(null,o)});
},{}],"AHi1":[function(require,module,exports) {
const e=require("events"),t=require("../parse"),s=!1;let o;class i extends e{constructor(e,t,s){super(),o=e,setTimeout(()=>this.create(t,s),0)}create(e,s){o||this.emit("error",new Error("No WebSocket transport available"));try{this.socket=new o(e,[],{origin:s.origin})}catch(i){return this.emit("error",i)}this.socket.addEventListener("error",e=>this.emit("error",e)),this.socket.addEventListener("open",()=>{this.emit("connect"),this.socket.addEventListener("message",e=>{const s="string"==typeof e.data?e.data:"";t(s,(e,t)=>{e||t.forEach(e=>{Array.isArray(e)?e.forEach(e=>this.emit("payload",e)):this.emit("payload",e)})})}),this.socket.addEventListener("close",()=>this.onClose())})}onClose(){this.socket=null,this.closed=!0,s&&console.log("Closing WebSocket connection"),this.emit("close"),this.removeAllListeners()}close(){this.socket?this.socket.close():this.onClose()}error(e,t,s=-1){this.emit("payload",{id:e.id,jsonrpc:e.jsonrpc,error:{message:t,code:s}})}send(e){this.socket&&this.socket.readyState===this.socket.CONNECTING?setTimeout(t=>this.send(e),10):!this.socket||this.socket.readyState>1?(this.connected=!1,this.error(e,"Not connected")):this.socket.send(JSON.stringify(e))}}module.exports=(e=>(t,s)=>new i(e,t,s));
},{"events":"LMQS","../parse":"sZJA"}],"IUSL":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=o;var t=new Uint8Array(16);function o(){if(!e&&!(e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return e(t)}
},{}],"YMNi":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;exports.default=e;
},{}],"WNAv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./regex.js"));function t(e){return e&&e.__esModule?e:{default:e}}function r(t){return"string"==typeof t&&e.default.test(t)}var u=r;exports.default=u;
},{"./regex.js":"YMNi"}],"Gptm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("./validate.js"));function r(e){return e&&e.__esModule?e:{default:e}}for(var t=[],i=0;i<256;++i)t.push((i+256).toString(16).substr(1));function o(r){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=(t[r[i+0]]+t[r[i+1]]+t[r[i+2]]+t[r[i+3]]+"-"+t[r[i+4]]+t[r[i+5]]+"-"+t[r[i+6]]+t[r[i+7]]+"-"+t[r[i+8]]+t[r[i+9]]+"-"+t[r[i+10]]+t[r[i+11]]+t[r[i+12]]+t[r[i+13]]+t[r[i+14]]+t[r[i+15]]).toLowerCase();if(!(0,e.default)(o))throw TypeError("Stringified UUID is invalid");return o}var u=o;exports.default=u;
},{"./validate.js":"WNAv"}],"w91e":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e,r,s=o(require("./rng.js")),n=o(require("./stringify.js"));function o(e){return e&&e.__esModule?e:{default:e}}var u=0,t=0;function a(o,a,l){var d=a&&l||0,i=a||new Array(16),c=(o=o||{}).node||e,v=void 0!==o.clockseq?o.clockseq:r;if(null==c||null==v){var f=o.random||(o.rng||s.default)();null==c&&(c=e=[1|f[0],f[1],f[2],f[3],f[4],f[5]]),null==v&&(v=r=16383&(f[6]<<8|f[7]))}var q=void 0!==o.msecs?o.msecs:Date.now(),m=void 0!==o.nsecs?o.nsecs:t+1,p=q-u+(m-t)/1e4;if(p<0&&void 0===o.clockseq&&(v=v+1&16383),(p<0||q>u)&&void 0===o.nsecs&&(m=0),m>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");u=q,t=m,r=v;var w=(1e4*(268435455&(q+=122192928e5))+m)%4294967296;i[d++]=w>>>24&255,i[d++]=w>>>16&255,i[d++]=w>>>8&255,i[d++]=255&w;var _=q/4294967296*1e4&268435455;i[d++]=_>>>8&255,i[d++]=255&_,i[d++]=_>>>24&15|16,i[d++]=_>>>16&255,i[d++]=v>>>8|128,i[d++]=255&v;for(var g=0;g<6;++g)i[d+g]=c[g];return a||(0,n.default)(i)}var l=a;exports.default=l;
},{"./rng.js":"IUSL","./stringify.js":"Gptm"}],"m8Mt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("./validate.js"));function r(e){return e&&e.__esModule?e:{default:e}}function t(r){if(!(0,e.default)(r))throw TypeError("Invalid UUID");var t,s=new Uint8Array(16);return s[0]=(t=parseInt(r.slice(0,8),16))>>>24,s[1]=t>>>16&255,s[2]=t>>>8&255,s[3]=255&t,s[4]=(t=parseInt(r.slice(9,13),16))>>>8,s[5]=255&t,s[6]=(t=parseInt(r.slice(14,18),16))>>>8,s[7]=255&t,s[8]=(t=parseInt(r.slice(19,23),16))>>>8,s[9]=255&t,s[10]=(t=parseInt(r.slice(24,36),16))/1099511627776&255,s[11]=t/4294967296&255,s[12]=t>>>24&255,s[13]=t>>>16&255,s[14]=t>>>8&255,s[15]=255&t,s}var s=t;exports.default=s;
},{"./validate.js":"WNAv"}],"Cxgm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=s,exports.URL=exports.DNS=void 0;var e=t(require("./stringify.js")),r=t(require("./parse.js"));function t(e){return e&&e.__esModule?e:{default:e}}function n(e){e=unescape(encodeURIComponent(e));for(var r=[],t=0;t<e.length;++t)r.push(e.charCodeAt(t));return r}var a="6ba7b810-9dad-11d1-80b4-00c04fd430c8";exports.DNS=a;var o="6ba7b811-9dad-11d1-80b4-00c04fd430c8";function s(t,s,u){function i(t,a,o,i){if("string"==typeof t&&(t=n(t)),"string"==typeof a&&(a=(0,r.default)(a)),16!==a.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var d=new Uint8Array(16+t.length);if(d.set(a),d.set(t,a.length),(d=u(d))[6]=15&d[6]|s,d[8]=63&d[8]|128,o){i=i||0;for(var f=0;f<16;++f)o[i+f]=d[f];return o}return(0,e.default)(d)}try{i.name=t}catch(d){}return i.DNS=a,i.URL=o,i}exports.URL=o;
},{"./stringify.js":"Gptm","./parse.js":"m8Mt"}],"ygwd":[function(require,module,exports) {
"use strict";function n(n){if("string"==typeof n){var t=unescape(encodeURIComponent(n));n=new Uint8Array(t.length);for(var o=0;o<t.length;++o)n[o]=t.charCodeAt(o)}return r(e(u(n),8*n.length))}function r(n){for(var r=[],t=32*n.length,e=0;e<t;e+=8){var u=n[e>>5]>>>e%32&255,o=parseInt("0123456789abcdef".charAt(u>>>4&15)+"0123456789abcdef".charAt(15&u),16);r.push(o)}return r}function t(n){return 14+(n+64>>>9<<4)+1}function e(n,r){n[r>>5]|=128<<r%32,n[t(r)-1]=r;for(var e=1732584193,u=-271733879,f=-1732584194,a=271733878,v=0;v<n.length;v+=16){var s=e,d=u,p=f,g=a;e=c(e,u,f,a,n[v],7,-680876936),a=c(a,e,u,f,n[v+1],12,-389564586),f=c(f,a,e,u,n[v+2],17,606105819),u=c(u,f,a,e,n[v+3],22,-1044525330),e=c(e,u,f,a,n[v+4],7,-176418897),a=c(a,e,u,f,n[v+5],12,1200080426),f=c(f,a,e,u,n[v+6],17,-1473231341),u=c(u,f,a,e,n[v+7],22,-45705983),e=c(e,u,f,a,n[v+8],7,1770035416),a=c(a,e,u,f,n[v+9],12,-1958414417),f=c(f,a,e,u,n[v+10],17,-42063),u=c(u,f,a,e,n[v+11],22,-1990404162),e=c(e,u,f,a,n[v+12],7,1804603682),a=c(a,e,u,f,n[v+13],12,-40341101),f=c(f,a,e,u,n[v+14],17,-1502002290),e=i(e,u=c(u,f,a,e,n[v+15],22,1236535329),f,a,n[v+1],5,-165796510),a=i(a,e,u,f,n[v+6],9,-1069501632),f=i(f,a,e,u,n[v+11],14,643717713),u=i(u,f,a,e,n[v],20,-373897302),e=i(e,u,f,a,n[v+5],5,-701558691),a=i(a,e,u,f,n[v+10],9,38016083),f=i(f,a,e,u,n[v+15],14,-660478335),u=i(u,f,a,e,n[v+4],20,-405537848),e=i(e,u,f,a,n[v+9],5,568446438),a=i(a,e,u,f,n[v+14],9,-1019803690),f=i(f,a,e,u,n[v+3],14,-187363961),u=i(u,f,a,e,n[v+8],20,1163531501),e=i(e,u,f,a,n[v+13],5,-1444681467),a=i(a,e,u,f,n[v+2],9,-51403784),f=i(f,a,e,u,n[v+7],14,1735328473),e=h(e,u=i(u,f,a,e,n[v+12],20,-1926607734),f,a,n[v+5],4,-378558),a=h(a,e,u,f,n[v+8],11,-2022574463),f=h(f,a,e,u,n[v+11],16,1839030562),u=h(u,f,a,e,n[v+14],23,-35309556),e=h(e,u,f,a,n[v+1],4,-1530992060),a=h(a,e,u,f,n[v+4],11,1272893353),f=h(f,a,e,u,n[v+7],16,-155497632),u=h(u,f,a,e,n[v+10],23,-1094730640),e=h(e,u,f,a,n[v+13],4,681279174),a=h(a,e,u,f,n[v],11,-358537222),f=h(f,a,e,u,n[v+3],16,-722521979),u=h(u,f,a,e,n[v+6],23,76029189),e=h(e,u,f,a,n[v+9],4,-640364487),a=h(a,e,u,f,n[v+12],11,-421815835),f=h(f,a,e,u,n[v+15],16,530742520),e=l(e,u=h(u,f,a,e,n[v+2],23,-995338651),f,a,n[v],6,-198630844),a=l(a,e,u,f,n[v+7],10,1126891415),f=l(f,a,e,u,n[v+14],15,-1416354905),u=l(u,f,a,e,n[v+5],21,-57434055),e=l(e,u,f,a,n[v+12],6,1700485571),a=l(a,e,u,f,n[v+3],10,-1894986606),f=l(f,a,e,u,n[v+10],15,-1051523),u=l(u,f,a,e,n[v+1],21,-2054922799),e=l(e,u,f,a,n[v+8],6,1873313359),a=l(a,e,u,f,n[v+15],10,-30611744),f=l(f,a,e,u,n[v+6],15,-1560198380),u=l(u,f,a,e,n[v+13],21,1309151649),e=l(e,u,f,a,n[v+4],6,-145523070),a=l(a,e,u,f,n[v+11],10,-1120210379),f=l(f,a,e,u,n[v+2],15,718787259),u=l(u,f,a,e,n[v+9],21,-343485551),e=o(e,s),u=o(u,d),f=o(f,p),a=o(a,g)}return[e,u,f,a]}function u(n){if(0===n.length)return[];for(var r=8*n.length,e=new Uint32Array(t(r)),u=0;u<r;u+=8)e[u>>5]|=(255&n[u/8])<<u%32;return e}function o(n,r){var t=(65535&n)+(65535&r);return(n>>16)+(r>>16)+(t>>16)<<16|65535&t}function f(n,r){return n<<r|n>>>32-r}function a(n,r,t,e,u,a){return o(f(o(o(r,n),o(e,a)),u),t)}function c(n,r,t,e,u,o,f){return a(r&t|~r&e,n,r,u,o,f)}function i(n,r,t,e,u,o,f){return a(r&e|t&~e,n,r,u,o,f)}function h(n,r,t,e,u,o,f){return a(r^t^e,n,r,u,o,f)}function l(n,r,t,e,u,o,f){return a(t^(r|~e),n,r,u,o,f)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var v=n;exports.default=v;
},{}],"PYP0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./v35.js")),r=t(require("./md5.js"));function t(e){return e&&e.__esModule?e:{default:e}}var u=(0,e.default)("v3",48,r.default),d=u;exports.default=d;
},{"./v35.js":"Cxgm","./md5.js":"ygwd"}],"uLR0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./rng.js")),r=t(require("./stringify.js"));function t(e){return e&&e.__esModule?e:{default:e}}function u(t,u,n){var a=(t=t||{}).random||(t.rng||e.default)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,u){n=n||0;for(var f=0;f<16;++f)u[n+f]=a[f];return u}return(0,r.default)(a)}var n=u;exports.default=n;
},{"./rng.js":"IUSL","./stringify.js":"Gptm"}],"OdaN":[function(require,module,exports) {
"use strict";function r(r,e,t,a){switch(r){case 0:return e&t^~e&a;case 1:return e^t^a;case 2:return e&t^e&a^t&a;case 3:return e^t^a}}function e(r,e){return r<<e|r>>>32-e}function t(t){var a=[1518500249,1859775393,2400959708,3395469782],o=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof t){var n=unescape(encodeURIComponent(t));t=[];for(var s=0;s<n.length;++s)t.push(n.charCodeAt(s))}else Array.isArray(t)||(t=Array.prototype.slice.call(t));t.push(128);for(var f=t.length/4+2,u=Math.ceil(f/16),c=new Array(u),l=0;l<u;++l){for(var i=new Uint32Array(16),v=0;v<16;++v)i[v]=t[64*l+4*v]<<24|t[64*l+4*v+1]<<16|t[64*l+4*v+2]<<8|t[64*l+4*v+3];c[l]=i}c[u-1][14]=8*(t.length-1)/Math.pow(2,32),c[u-1][14]=Math.floor(c[u-1][14]),c[u-1][15]=8*(t.length-1)&4294967295;for(var h=0;h<u;++h){for(var p=new Uint32Array(80),y=0;y<16;++y)p[y]=c[h][y];for(var d=16;d<80;++d)p[d]=e(p[d-3]^p[d-8]^p[d-14]^p[d-16],1);for(var A=o[0],g=o[1],w=o[2],M=o[3],x=o[4],U=0;U<80;++U){var C=Math.floor(U/20),_=e(A,5)+r(C,g,w,M)+x+a[C]+p[U]>>>0;x=M,M=w,w=e(g,30)>>>0,g=A,A=_}o[0]=o[0]+A>>>0,o[1]=o[1]+g>>>0,o[2]=o[2]+w>>>0,o[3]=o[3]+M>>>0,o[4]=o[4]+x>>>0}return[o[0]>>24&255,o[0]>>16&255,o[0]>>8&255,255&o[0],o[1]>>24&255,o[1]>>16&255,o[1]>>8&255,255&o[1],o[2]>>24&255,o[2]>>16&255,o[2]>>8&255,255&o[2],o[3]>>24&255,o[3]>>16&255,o[3]>>8&255,255&o[3],o[4]>>24&255,o[4]>>16&255,o[4]>>8&255,255&o[4]]}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var a=t;exports.default=a;
},{}],"eWup":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./v35.js")),r=t(require("./sha1.js"));function t(e){return e&&e.__esModule?e:{default:e}}var u=(0,e.default)("v5",80,r.default),s=u;exports.default=s;
},{"./v35.js":"Cxgm","./sha1.js":"OdaN"}],"HTSB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e="00000000-0000-0000-0000-000000000000";exports.default=e;
},{}],"B0tE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("./validate.js"));function r(e){return e&&e.__esModule?e:{default:e}}function t(r){if(!(0,e.default)(r))throw TypeError("Invalid UUID");return parseInt(r.substr(14,1),16)}var u=t;exports.default=u;
},{"./validate.js":"WNAv"}],"Dc9V":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"v1",{enumerable:!0,get:function(){return e.default}}),Object.defineProperty(exports,"v3",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(exports,"v4",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(exports,"v5",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(exports,"NIL",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(exports,"version",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(exports,"validate",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(exports,"stringify",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(exports,"parse",{enumerable:!0,get:function(){return s.default}});var e=a(require("./v1.js")),r=a(require("./v3.js")),t=a(require("./v4.js")),n=a(require("./v5.js")),u=a(require("./nil.js")),i=a(require("./version.js")),o=a(require("./validate.js")),f=a(require("./stringify.js")),s=a(require("./parse.js"));function a(e){return e&&e.__esModule?e:{default:e}}
},{"./v1.js":"w91e","./v3.js":"PYP0","./v4.js":"uLR0","./v5.js":"eWup","./nil.js":"HTSB","./version.js":"B0tE","./validate.js":"WNAv","./stringify.js":"Gptm","./parse.js":"m8Mt"}],"FHBT":[function(require,module,exports) {
const t=require("events"),{v4:s}=require("uuid"),e=!1;let i;class r extends t{constructor(t,e,r){super(),i=t,this.options=r,this.connected=!1,this.subscriptions=!1,this.status="loading",this.url=e,this.pollId=s(),setTimeout(()=>this.create(),0),this._emit=((...t)=>this.closed?null:this.emit(...t))}create(){if(!i)return this._emit("error",new Error("No HTTP transport available"));this.on("error",()=>{this.connected&&this.close()}),this.init()}init(){this.send({jsonrpc:"2.0",method:"net_version",params:[],id:1},(t,s)=>{if(t)return this._emit("error",t);this.connected=!0,this._emit("connect"),this.send({jsonrpc:"2.0",id:1,method:"eth_pollSubscriptions",params:[this.pollId,"immediate"]},(t,s)=>{t||(this.subscriptions=!0,this.pollSubscriptions())})})}pollSubscriptions(){this.send({jsonrpc:"2.0",id:1,method:"eth_pollSubscriptions",params:[this.pollId]},(t,s)=>{if(t)return this.subscriptionTimeout=setTimeout(()=>this.pollSubscriptions(),1e4),this._emit("error",t);this.closed||(this.subscriptionTimeout=this.pollSubscriptions()),s&&s.map(t=>{let s;try{s=JSON.parse(t)}catch(e){s=!1}return s}).filter(t=>t).forEach(t=>this._emit("payload",t))})}close(){e&&console.log("Closing HTTP connection"),this.closed=!0,this._emit("close"),clearTimeout(this.subscriptionTimeout),this.removeAllListeners()}filterStatus(t){if(t.status>=200&&t.status<300)return t;const s=new Error(t.statusText);throw s.res=t,s.message}error(t,s,e=-1){this._emit("payload",{id:t.id,jsonrpc:t.jsonrpc,error:{message:s,code:e}})}send(t,s){if(this.closed)return this.error(t,"Not connected");if("eth_subscribe"===t.method){if(!this.subscriptions)return this.error(t,"Subscriptions are not supported by this HTTP endpoint");t.pollId=this.pollId}const e=new i;let r=!1;const o=(i,o)=>{if(!r)if(e.abort(),r=!0,s)s(i,o);else{const{id:s,jsonrpc:e}=t,r=i?{id:s,jsonrpc:e,error:{message:i.message,code:i.code}}:{id:s,jsonrpc:e,result:o};this._emit("payload",r)}};e.open("POST",this.url,!0),e.setRequestHeader("Content-Type","application/json"),e.timeout=6e4,e.onerror=o,e.ontimeout=o,e.onreadystatechange=(()=>{if(4===e.readyState)try{const s=JSON.parse(e.responseText);o(s.error,s.result)}catch(t){o(t)}}),e.send(JSON.stringify(t))}}module.exports=(t=>(s,e)=>new r(t,s,e));
},{"events":"LMQS","uuid":"Dc9V"}],"AxAd":[function(require,module,exports) {
const e=require("./resolve"),n=require("./provider"),o=require("./presets"),r={ethereum:"undefined"!=typeof window&&void 0!==window.ethereum?window.ethereum:null,web3:"undefined"!=typeof window&&void 0!==window.web3?window.web3.currentProvider:null},t="undefined"!=typeof window&&void 0!==window.WebSocket?window.WebSocket:null,i="undefined"!=typeof window&&void 0!==window.XMLHttpRequest?window.XMLHttpRequest:null;r.ethereum&&(r.ethereum.__isProvider=!0);const d={injected:r.ethereum||require("./connections/injected")(r.web3),ipc:require("./connections/unavailable")("IPC connections are unavliable in the browser"),ws:require("./connections/ws")(t),http:require("./connections/http")(i)};module.exports=((r,t)=>{!r||Array.isArray(r)||"object"!=typeof r||t||(t=r,r=void 0),r||(r=["injected","frame"]),t||(t={}),(r=[].concat(r)).forEach(e=>{if(e.startsWith("alchemy")&&!t.alchemyId)throw new Error("Alchemy was included as a connection target but no Alchemy project ID was passed in options e.g. { alchemyId: '123abc' }");if(e.startsWith("infura")&&!t.infuraId)throw new Error("Infura was included as a connection target but no Infura project ID was passed in options e.g. { infuraId: '123abc' }")});const i=o(t);return n(d,e(r,i),t)});
},{"./resolve":"yLaI","./provider":"JmAo","./presets":"BqEi","./connections/injected":"fOi9","./connections/unavailable":"Voyf","./connections/ws":"AHi1","./connections/http":"FHBT"}]},{},[], null)