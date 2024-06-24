"use strict";var Zr=Object.defineProperty;var On=t=>{throw TypeError(t)};var Qr=(t,e,n)=>e in t?Zr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ct=(t,e,n)=>Qr(t,typeof e!="symbol"?e+"":e,n),Ln=(t,e,n)=>e.has(t)||On("Cannot "+n);var Q=(t,e,n)=>(Ln(t,e,"read from private field"),n?n.call(t):e.get(t)),Be=(t,e,n)=>e.has(t)?On("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),Ye=(t,e,n,r)=>(Ln(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n);(function(){var t=window.Document.prototype.createElement,e=window.Document.prototype.createElementNS,n=window.Document.prototype.importNode,r=window.Document.prototype.prepend,o=window.Document.prototype.append,s=window.DocumentFragment.prototype.prepend,c=window.DocumentFragment.prototype.append,h=window.Node.prototype.cloneNode,d=window.Node.prototype.appendChild,p=window.Node.prototype.insertBefore,_=window.Node.prototype.removeChild,b=window.Node.prototype.replaceChild,E=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),m=window.Element.prototype.attachShadow,z=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),x=window.Element.prototype.getAttribute,T=window.Element.prototype.setAttribute,O=window.Element.prototype.removeAttribute,k=window.Element.prototype.toggleAttribute,$=window.Element.prototype.getAttributeNS,A=window.Element.prototype.setAttributeNS,K=window.Element.prototype.removeAttributeNS,C=window.Element.prototype.insertAdjacentElement,S=window.Element.prototype.insertAdjacentHTML,q=window.Element.prototype.prepend,L=window.Element.prototype.append,M=window.Element.prototype.before,V=window.Element.prototype.after,Z=window.Element.prototype.replaceWith,et=window.Element.prototype.remove,nt=window.HTMLElement,ot=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),ht=window.HTMLElement.prototype.insertAdjacentElement,Kt=window.HTMLElement.prototype.insertAdjacentHTML,En=new Set;"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(i){return En.add(i)});function Cn(i){var l=En.has(i);return i=/^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(i),!l&&i}var Yr=document.contains?document.contains.bind(document):document.documentElement.contains.bind(document.documentElement);function F(i){var l=i.isConnected;if(l!==void 0)return l;if(Yr(i))return!0;for(;i&&!(i.__CE_isImportDocument||i instanceof Document);)i=i.parentNode||(window.ShadowRoot&&i instanceof ShadowRoot?i.host:void 0);return!(!i||!(i.__CE_isImportDocument||i instanceof Document))}function Ie(i){var l=i.children;if(l)return Array.prototype.slice.call(l);for(l=[],i=i.firstChild;i;i=i.nextSibling)i.nodeType===Node.ELEMENT_NODE&&l.push(i);return l}function Fe(i,l){for(;l&&l!==i&&!l.nextSibling;)l=l.parentNode;return l&&l!==i?l.nextSibling:null}function He(i,l,u){for(var v=i;v;){if(v.nodeType===Node.ELEMENT_NODE){var a=v;l(a);var f=a.localName;if(f==="link"&&a.getAttribute("rel")==="import"){if(v=a.import,u===void 0&&(u=new Set),v instanceof Node&&!u.has(v))for(u.add(v),v=v.firstChild;v;v=v.nextSibling)He(v,l,u);v=Fe(i,a);continue}else if(f==="template"){v=Fe(i,a);continue}if(a=a.__CE_shadowRoot)for(a=a.firstChild;a;a=a.nextSibling)He(a,l,u)}v=v.firstChild?v.firstChild:Fe(i,v)}}function pe(){var i=!(vt==null||!vt.noDocumentConstructionObserver),l=!(vt==null||!vt.shadyDomFastWalk);this.m=[],this.g=[],this.j=!1,this.shadyDomFastWalk=l,this.I=!i}function Jt(i,l,u,v){var a=window.ShadyDOM;if(i.shadyDomFastWalk&&a&&a.inUse){if(l.nodeType===Node.ELEMENT_NODE&&u(l),l.querySelectorAll)for(i=a.nativeMethods.querySelectorAll.call(l,"*"),l=0;l<i.length;l++)u(i[l])}else He(l,u,v)}function Wr(i,l){i.j=!0,i.m.push(l)}function Ur(i,l){i.j=!0,i.g.push(l)}function Pe(i,l){i.j&&Jt(i,l,function(u){return It(i,u)})}function It(i,l){if(i.j&&!l.__CE_patched){l.__CE_patched=!0;for(var u=0;u<i.m.length;u++)i.m[u](l);for(u=0;u<i.g.length;u++)i.g[u](l)}}function pt(i,l){var u=[];for(Jt(i,l,function(a){return u.push(a)}),l=0;l<u.length;l++){var v=u[l];v.__CE_state===1?i.connectedCallback(v):ve(i,v)}}function rt(i,l){var u=[];for(Jt(i,l,function(a){return u.push(a)}),l=0;l<u.length;l++){var v=u[l];v.__CE_state===1&&i.disconnectedCallback(v)}}function wt(i,l,u){u=u===void 0?{}:u;var v=u.J,a=u.upgrade||function(g){return ve(i,g)},f=[];for(Jt(i,l,function(g){if(i.j&&It(i,g),g.localName==="link"&&g.getAttribute("rel")==="import"){var y=g.import;y instanceof Node&&(y.__CE_isImportDocument=!0,y.__CE_registry=document.__CE_registry),y&&y.readyState==="complete"?y.__CE_documentLoadHandled=!0:g.addEventListener("load",function(){var w=g.import;if(!w.__CE_documentLoadHandled){w.__CE_documentLoadHandled=!0;var N=new Set;v&&(v.forEach(function(R){return N.add(R)}),N.delete(w)),wt(i,w,{J:N,upgrade:a})}})}else f.push(g)},v),l=0;l<f.length;l++)a(f[l])}function ve(i,l){try{var u=l.ownerDocument,v=u.__CE_registry,a=v&&(u.defaultView||u.__CE_isImportDocument)?ge(v,l.localName):void 0;if(a&&l.__CE_state===void 0){a.constructionStack.push(l);try{try{if(new a.constructorFunction!==l)throw Error("The custom element constructor did not produce the element being upgraded.")}finally{a.constructionStack.pop()}}catch(w){throw l.__CE_state=2,w}if(l.__CE_state=1,l.__CE_definition=a,a.attributeChangedCallback&&l.hasAttributes()){var f=a.observedAttributes;for(a=0;a<f.length;a++){var g=f[a],y=l.getAttribute(g);y!==null&&i.attributeChangedCallback(l,g,null,y,null)}}F(l)&&i.connectedCallback(l)}}catch(w){Ft(w)}}pe.prototype.connectedCallback=function(i){var l=i.__CE_definition;if(l.connectedCallback)try{l.connectedCallback.call(i)}catch(u){Ft(u)}},pe.prototype.disconnectedCallback=function(i){var l=i.__CE_definition;if(l.disconnectedCallback)try{l.disconnectedCallback.call(i)}catch(u){Ft(u)}},pe.prototype.attributeChangedCallback=function(i,l,u,v,a){var f=i.__CE_definition;if(f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(l))try{f.attributeChangedCallback.call(i,l,u,v,a)}catch(g){Ft(g)}};function $n(i,l,u,v){var a=l.__CE_registry;if(a&&(v===null||v==="http://www.w3.org/1999/xhtml")&&(a=ge(a,u)))try{var f=new a.constructorFunction;if(f.__CE_state===void 0||f.__CE_definition===void 0)throw Error("Failed to construct '"+u+"': The returned value was not constructed with the HTMLElement constructor.");if(f.namespaceURI!=="http://www.w3.org/1999/xhtml")throw Error("Failed to construct '"+u+"': The constructed element's namespace must be the HTML namespace.");if(f.hasAttributes())throw Error("Failed to construct '"+u+"': The constructed element must not have any attributes.");if(f.firstChild!==null)throw Error("Failed to construct '"+u+"': The constructed element must not have any children.");if(f.parentNode!==null)throw Error("Failed to construct '"+u+"': The constructed element must not have a parent node.");if(f.ownerDocument!==l)throw Error("Failed to construct '"+u+"': The constructed element's owner document is incorrect.");if(f.localName!==u)throw Error("Failed to construct '"+u+"': The constructed element's local name is incorrect.");return f}catch(g){return Ft(g),l=v===null?t.call(l,u):e.call(l,v,u),Object.setPrototypeOf(l,HTMLUnknownElement.prototype),l.__CE_state=2,l.__CE_definition=void 0,It(i,l),l}return l=v===null?t.call(l,u):e.call(l,v,u),It(i,l),l}function Ft(i){var l="",u="",v=0,a=0;i instanceof Error?(l=i.message,u=i.sourceURL||i.fileName||"",v=i.line||i.lineNumber||0,a=i.column||i.columnNumber||0):l="Uncaught "+String(i);var f=void 0;ErrorEvent.prototype.initErrorEvent===void 0?f=new ErrorEvent("error",{cancelable:!0,message:l,filename:u,lineno:v,colno:a,error:i}):(f=document.createEvent("ErrorEvent"),f.initErrorEvent("error",!1,!0,l,u,v),f.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0}})}),f.error===void 0&&Object.defineProperty(f,"error",{configurable:!0,enumerable:!0,get:function(){return i}}),window.dispatchEvent(f),f.defaultPrevented||console.error(i)}function kn(){var i=this;this.g=void 0,this.F=new Promise(function(l){i.l=l})}kn.prototype.resolve=function(i){if(this.g)throw Error("Already resolved.");this.g=i,this.l(i)};function xn(i){var l=document;this.l=void 0,this.h=i,this.g=l,wt(this.h,this.g),this.g.readyState==="loading"&&(this.l=new MutationObserver(this.G.bind(this)),this.l.observe(this.g,{childList:!0,subtree:!0}))}function Tn(i){i.l&&i.l.disconnect()}xn.prototype.G=function(i){var l=this.g.readyState;for(l!=="interactive"&&l!=="complete"||Tn(this),l=0;l<i.length;l++)for(var u=i[l].addedNodes,v=0;v<u.length;v++)wt(this.h,u[v])};function B(i){this.s=new Map,this.u=new Map,this.C=new Map,this.A=!1,this.B=new Map,this.o=function(l){return l()},this.i=!1,this.v=[],this.h=i,this.D=i.I?new xn(i):void 0}B.prototype.H=function(i,l){var u=this;if(!(l instanceof Function))throw new TypeError("Custom element constructor getters must be functions.");Sn(this,i),this.s.set(i,l),this.v.push(i),this.i||(this.i=!0,this.o(function(){return Nn(u)}))},B.prototype.define=function(i,l){var u=this;if(!(l instanceof Function))throw new TypeError("Custom element constructors must be functions.");Sn(this,i),zn(this,i,l),this.v.push(i),this.i||(this.i=!0,this.o(function(){return Nn(u)}))};function Sn(i,l){if(!Cn(l))throw new SyntaxError("The element name '"+l+"' is not valid.");if(ge(i,l))throw Error("A custom element with name '"+(l+"' has already been defined."));if(i.A)throw Error("A custom element is already being defined.")}function zn(i,l,u){i.A=!0;var v;try{var a=u.prototype;if(!(a instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var f=function(R){var Ht=a[R];if(Ht!==void 0&&!(Ht instanceof Function))throw Error("The '"+R+"' callback must be a function.");return Ht},g=f("connectedCallback"),y=f("disconnectedCallback"),w=f("adoptedCallback"),N=(v=f("attributeChangedCallback"))&&u.observedAttributes||[]}catch(R){throw R}finally{i.A=!1}return u={localName:l,constructorFunction:u,connectedCallback:g,disconnectedCallback:y,adoptedCallback:w,attributeChangedCallback:v,observedAttributes:N,constructionStack:[]},i.u.set(l,u),i.C.set(u.constructorFunction,u),u}B.prototype.upgrade=function(i){wt(this.h,i)};function Nn(i){if(i.i!==!1){i.i=!1;for(var l=[],u=i.v,v=new Map,a=0;a<u.length;a++)v.set(u[a],[]);for(wt(i.h,document,{upgrade:function(w){if(w.__CE_state===void 0){var N=w.localName,R=v.get(N);R?R.push(w):i.u.has(N)&&l.push(w)}}}),a=0;a<l.length;a++)ve(i.h,l[a]);for(a=0;a<u.length;a++){for(var f=u[a],g=v.get(f),y=0;y<g.length;y++)ve(i.h,g[y]);(f=i.B.get(f))&&f.resolve(void 0)}u.length=0}}B.prototype.get=function(i){if(i=ge(this,i))return i.constructorFunction},B.prototype.whenDefined=function(i){if(!Cn(i))return Promise.reject(new SyntaxError("'"+i+"' is not a valid custom element name."));var l=this.B.get(i);if(l)return l.F;l=new kn,this.B.set(i,l);var u=this.u.has(i)||this.s.has(i);return i=this.v.indexOf(i)===-1,u&&i&&l.resolve(void 0),l.F},B.prototype.polyfillWrapFlushCallback=function(i){this.D&&Tn(this.D);var l=this.o;this.o=function(u){return i(function(){return l(u)})}};function ge(i,l){var u=i.u.get(l);if(u)return u;if(u=i.s.get(l)){i.s.delete(l);try{return zn(i,l,u())}catch(v){Ft(v)}}}B.prototype.define=B.prototype.define,B.prototype.upgrade=B.prototype.upgrade,B.prototype.get=B.prototype.get,B.prototype.whenDefined=B.prototype.whenDefined,B.prototype.polyfillDefineLazy=B.prototype.H,B.prototype.polyfillWrapFlushCallback=B.prototype.polyfillWrapFlushCallback;function qe(i,l,u){function v(a){return function(f){for(var g=[],y=0;y<arguments.length;++y)g[y]=arguments[y];y=[];for(var w=[],N=0;N<g.length;N++){var R=g[N];if(R instanceof Element&&F(R)&&w.push(R),R instanceof DocumentFragment)for(R=R.firstChild;R;R=R.nextSibling)y.push(R);else y.push(R)}for(a.apply(this,g),g=0;g<w.length;g++)rt(i,w[g]);if(F(this))for(g=0;g<y.length;g++)w=y[g],w instanceof Element&&pt(i,w)}}u.prepend!==void 0&&(l.prepend=v(u.prepend)),u.append!==void 0&&(l.append=v(u.append))}function Vr(i){Document.prototype.createElement=function(l){return $n(i,this,l,null)},Document.prototype.importNode=function(l,u){return l=n.call(this,l,!!u),this.__CE_registry?wt(i,l):Pe(i,l),l},Document.prototype.createElementNS=function(l,u){return $n(i,this,u,l)},qe(i,Document.prototype,{prepend:r,append:o})}function Xr(i){function l(v){return function(a){for(var f=[],g=0;g<arguments.length;++g)f[g]=arguments[g];g=[];for(var y=[],w=0;w<f.length;w++){var N=f[w];if(N instanceof Element&&F(N)&&y.push(N),N instanceof DocumentFragment)for(N=N.firstChild;N;N=N.nextSibling)g.push(N);else g.push(N)}for(v.apply(this,f),f=0;f<y.length;f++)rt(i,y[f]);if(F(this))for(f=0;f<g.length;f++)y=g[f],y instanceof Element&&pt(i,y)}}var u=Element.prototype;M!==void 0&&(u.before=l(M)),V!==void 0&&(u.after=l(V)),Z!==void 0&&(u.replaceWith=function(v){for(var a=[],f=0;f<arguments.length;++f)a[f]=arguments[f];f=[];for(var g=[],y=0;y<a.length;y++){var w=a[y];if(w instanceof Element&&F(w)&&g.push(w),w instanceof DocumentFragment)for(w=w.firstChild;w;w=w.nextSibling)f.push(w);else f.push(w)}for(y=F(this),Z.apply(this,a),a=0;a<g.length;a++)rt(i,g[a]);if(y)for(rt(i,this),a=0;a<f.length;a++)g=f[a],g instanceof Element&&pt(i,g)}),et!==void 0&&(u.remove=function(){var v=F(this);et.call(this),v&&rt(i,this)})}function Gr(i){function l(a,f){Object.defineProperty(a,"innerHTML",{enumerable:f.enumerable,configurable:!0,get:f.get,set:function(g){var y=this,w=void 0;if(F(this)&&(w=[],Jt(i,this,function(Ht){Ht!==y&&w.push(Ht)})),f.set.call(this,g),w)for(var N=0;N<w.length;N++){var R=w[N];R.__CE_state===1&&i.disconnectedCallback(R)}return this.ownerDocument.__CE_registry?wt(i,this):Pe(i,this),g}})}function u(a,f){a.insertAdjacentElement=function(g,y){var w=F(y);return g=f.call(this,g,y),w&&rt(i,y),F(g)&&pt(i,y),g}}function v(a,f){function g(y,w){for(var N=[];y!==w;y=y.nextSibling)N.push(y);for(w=0;w<N.length;w++)wt(i,N[w])}a.insertAdjacentHTML=function(y,w){if(y=y.toLowerCase(),y==="beforebegin"){var N=this.previousSibling;f.call(this,y,w),g(N||this.parentNode.firstChild,this)}else if(y==="afterbegin")N=this.firstChild,f.call(this,y,w),g(this.firstChild,N);else if(y==="beforeend")N=this.lastChild,f.call(this,y,w),g(N||this.firstChild,null);else if(y==="afterend")N=this.nextSibling,f.call(this,y,w),g(this.nextSibling,N);else throw new SyntaxError("The value provided ("+String(y)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.")}}m&&(Element.prototype.attachShadow=function(a){if(a=m.call(this,a),i.j&&!a.__CE_patched){a.__CE_patched=!0;for(var f=0;f<i.m.length;f++)i.m[f](a)}return this.__CE_shadowRoot=a}),z&&z.get?l(Element.prototype,z):ot&&ot.get?l(HTMLElement.prototype,ot):Ur(i,function(a){l(a,{enumerable:!0,configurable:!0,get:function(){return h.call(this,!0).innerHTML},set:function(f){var g=this.localName==="template",y=g?this.content:this,w=e.call(document,this.namespaceURI,this.localName);for(w.innerHTML=f;0<y.childNodes.length;)_.call(y,y.childNodes[0]);for(f=g?w.content:w;0<f.childNodes.length;)d.call(y,f.childNodes[0])}})}),Element.prototype.setAttribute=function(a,f){if(this.__CE_state!==1)return T.call(this,a,f);var g=x.call(this,a);T.call(this,a,f),f=x.call(this,a),i.attributeChangedCallback(this,a,g,f,null)},Element.prototype.setAttributeNS=function(a,f,g){if(this.__CE_state!==1)return A.call(this,a,f,g);var y=$.call(this,a,f);A.call(this,a,f,g),g=$.call(this,a,f),i.attributeChangedCallback(this,f,y,g,a)},Element.prototype.removeAttribute=function(a){if(this.__CE_state!==1)return O.call(this,a);var f=x.call(this,a);O.call(this,a),f!==null&&i.attributeChangedCallback(this,a,f,null,null)},k&&(Element.prototype.toggleAttribute=function(a,f){if(this.__CE_state!==1)return k.call(this,a,f);var g=x.call(this,a),y=g!==null;return f=k.call(this,a,f),y!==f&&i.attributeChangedCallback(this,a,g,f?"":null,null),f}),Element.prototype.removeAttributeNS=function(a,f){if(this.__CE_state!==1)return K.call(this,a,f);var g=$.call(this,a,f);K.call(this,a,f);var y=$.call(this,a,f);g!==y&&i.attributeChangedCallback(this,f,g,y,a)},ht?u(HTMLElement.prototype,ht):C&&u(Element.prototype,C),Kt?v(HTMLElement.prototype,Kt):S&&v(Element.prototype,S),qe(i,Element.prototype,{prepend:q,append:L}),Xr(i)}var An={};function Kr(i){function l(){var u=this.constructor,v=document.__CE_registry.C.get(u);if(!v)throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var a=v.constructionStack;if(a.length===0)return a=t.call(document,v.localName),Object.setPrototypeOf(a,u.prototype),a.__CE_state=1,a.__CE_definition=v,It(i,a),a;var f=a.length-1,g=a[f];if(g===An)throw Error("Failed to construct '"+v.localName+"': This element was already constructed.");return a[f]=An,Object.setPrototypeOf(g,u.prototype),It(i,g),g}l.prototype=nt.prototype,Object.defineProperty(HTMLElement.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:l}),window.HTMLElement=l}function Jr(i){function l(u,v){Object.defineProperty(u,"textContent",{enumerable:v.enumerable,configurable:!0,get:v.get,set:function(a){if(this.nodeType===Node.TEXT_NODE)v.set.call(this,a);else{var f=void 0;if(this.firstChild){var g=this.childNodes,y=g.length;if(0<y&&F(this)){f=Array(y);for(var w=0;w<y;w++)f[w]=g[w]}}if(v.set.call(this,a),f)for(a=0;a<f.length;a++)rt(i,f[a])}}})}Node.prototype.insertBefore=function(u,v){if(u instanceof DocumentFragment){var a=Ie(u);if(u=p.call(this,u,v),F(this))for(v=0;v<a.length;v++)pt(i,a[v]);return u}return a=u instanceof Element&&F(u),v=p.call(this,u,v),a&&rt(i,u),F(this)&&pt(i,u),v},Node.prototype.appendChild=function(u){if(u instanceof DocumentFragment){var v=Ie(u);if(u=d.call(this,u),F(this))for(var a=0;a<v.length;a++)pt(i,v[a]);return u}return v=u instanceof Element&&F(u),a=d.call(this,u),v&&rt(i,u),F(this)&&pt(i,u),a},Node.prototype.cloneNode=function(u){return u=h.call(this,!!u),this.ownerDocument.__CE_registry?wt(i,u):Pe(i,u),u},Node.prototype.removeChild=function(u){var v=u instanceof Element&&F(u),a=_.call(this,u);return v&&rt(i,u),a},Node.prototype.replaceChild=function(u,v){if(u instanceof DocumentFragment){var a=Ie(u);if(u=b.call(this,u,v),F(this))for(rt(i,v),v=0;v<a.length;v++)pt(i,a[v]);return u}a=u instanceof Element&&F(u);var f=b.call(this,u,v),g=F(this);return g&&rt(i,v),a&&rt(i,u),g&&pt(i,u),f},E&&E.get?l(Node.prototype,E):Wr(i,function(u){l(u,{enumerable:!0,configurable:!0,get:function(){for(var v=[],a=this.firstChild;a;a=a.nextSibling)a.nodeType!==Node.COMMENT_NODE&&v.push(a.textContent);return v.join("")},set:function(v){for(;this.firstChild;)_.call(this,this.firstChild);v!=null&&v!==""&&d.call(this,document.createTextNode(v))}})})}var vt=window.customElements;function Dn(){var i=new pe;Kr(i),Vr(i),qe(i,DocumentFragment.prototype,{prepend:s,append:c}),Jr(i),Gr(i),window.CustomElementRegistry=B,i=new B(i),document.__CE_registry=i,Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:i})}vt&&!vt.forcePolyfill&&typeof vt.define=="function"&&typeof vt.get=="function"||Dn(),window.__CE_installPolyfill=Dn}).call(self);const re=1,un=2,to=4,Qn=8,eo=16,Ge=64,no=2,ro=1,oo=2,ye="[",tr="]",io="",er=`${tr}!`,Ke={},Pt=Symbol(),Mn=["touchstart","touchmove","touchend"];function so(t){console.warn("hydration_mismatch")}let G=!1;function $t(t){G=t}let jt=null,Tt;function lo(t){jt=t,Tt=t&&t[0]}function Wt(t){if(t.nodeType!==8)return t;var e=t;if(e.data!==ye)return t;for(var n=[],r=0;(e=e.nextSibling)!==null;){if(e.nodeType===8){var o=e.data;if(o===ye)r+=1;else if(o[0]===tr){if(r===0)return jt=n,Tt=n[0],e;r-=1}}n.push(e)}throw so(),Ke}var Dt=Array.isArray,ao=Array.from,be=Object.keys,nr=Object.isFrozen,oe=Object.defineProperty,Je=Object.getOwnPropertyDescriptor,uo=Object.prototype,co=Array.prototype,fo=Object.getPrototypeOf;const Ot=2,rr=4,Vt=8,or=16,yt=32,cn=64,St=128,we=256,dt=512,_t=1024,Lt=2048,Mt=4096,Xt=8192,ho=16384,fn=32768,X=Symbol("$state"),po=Symbol("$state.frozen"),vo=Symbol("");function ir(t){return t===this.v}function go(t,e){return t!=t?e==e:t!==e||t!==null&&typeof t=="object"||typeof t=="function"}function mo(t){return!go(t,this.v)}function _o(t){throw new Error("effect_in_teardown")}function yo(){throw new Error("effect_in_unowned_derived")}function bo(t){throw new Error("effect_orphan")}function wo(){throw new Error("effect_update_depth_exceeded")}function Eo(){throw new Error("hydration_failed")}function Co(t){throw new Error("props_invalid_value")}function $o(){throw new Error("state_unsafe_mutation")}function tt(t){return{f:0,v:t,reactions:null,equals:ir,version:0}}function Ee(t){var n;const e=tt(t);return e.equals=mo,U!==null&&U.l!==null&&((n=U.l).s??(n.s=[])).push(e),e}function H(t,e){var n=t.v!==Pt;return n&&P!==null&&tn()&&P.f&Ot&&$o(),t.equals(e)||(t.v=e,t.version=dr(),pn(t,_t,!0),tn()&&n&&j!==null&&j.f&dt&&!(j.f&yt)&&(W!==null&&W.includes(t)?(ut(j,_t),Le(j)):xt===null?Oo([t]):xt.push(t))),e}function st(t,e=!0,n=null,r){if(typeof t=="object"&&t!=null&&!nr(t)&&!(po in t)){if(X in t){const s=t[X];if(s.t===t||s.p===t)return s.p}const o=fo(t);if(o===uo||o===co){const s=new Proxy(t,ko);return oe(t,X,{value:{s:new Map,v:tt(0),a:Dt(t),i:e,p:s,t},writable:!0,enumerable:!1}),s}}return t}function jn(t,e=1){H(t,t.v+e)}const ko={defineProperty(t,e,n){if(n.value){const r=t[X],o=r.s.get(e);o!==void 0&&H(o,st(n.value,r.i,r))}return Reflect.defineProperty(t,e,n)},deleteProperty(t,e){const n=t[X],r=n.s.get(e),o=n.a,s=delete t[e];if(o&&s){const c=n.s.get("length"),h=t.length-1;c!==void 0&&c.v!==h&&H(c,h)}return r!==void 0&&H(r,Pt),s&&jn(n.v),s},get(t,e,n){var s;if(e===X)return Reflect.get(t,X);const r=t[X];let o=r.s.get(e);if(o===void 0&&(!(e in t)||(s=Je(t,e))!=null&&s.writable)&&(o=(r.i?tt:Ee)(st(t[e],r.i,r)),r.s.set(e,o)),o!==void 0){const c=D(o);return c===Pt?void 0:c}return Reflect.get(t,e,n)},getOwnPropertyDescriptor(t,e){const n=Reflect.getOwnPropertyDescriptor(t,e);if(n&&"value"in n){const o=t[X].s.get(e);o&&(n.value=D(o))}return n},has(t,e){var s;if(e===X)return!0;const n=t[X],r=Reflect.has(t,e);let o=n.s.get(e);return(o!==void 0||j!==null&&(!r||(s=Je(t,e))!=null&&s.writable))&&(o===void 0&&(o=(n.i?tt:Ee)(r?st(t[e],n.i,n):Pt),n.s.set(e,o)),D(o)===Pt)?!1:r},set(t,e,n,r){const o=t[X];let s=o.s.get(e);s===void 0&&(_r(()=>r[e]),s=o.s.get(e)),s!==void 0&&H(s,st(n,o.i,o));const c=o.a,h=!(e in t);if(c&&e==="length")for(let d=n;d<t.length;d+=1){const p=o.s.get(d+"");p!==void 0&&H(p,Pt)}if(t[e]=n,h){if(c){const d=o.s.get("length"),p=t.length;d!==void 0&&d.v!==p&&H(d,p)}jn(o.v)}return!0},ownKeys(t){const e=t[X];return D(e.v),Reflect.ownKeys(t)}};function Ce(t){if(t!==null&&typeof t=="object"&&X in t){var e=t[X];if(e)return e.p}return t}function xo(t,e){return Object.is(Ce(t),Ce(e))}function sr(t){for(var e=0;e<t.length;e++)t[e]()}const To=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let $e=!1,ke=!1,Ze=[],Qe=[];function lr(){$e=!1;const t=Ze.slice();Ze=[],sr(t)}function ar(){ke=!1;const t=Qe.slice();Qe=[],sr(t)}function le(t){$e||($e=!0,queueMicrotask(lr)),Ze.push(t)}function So(t){ke||(ke=!0,To(ar)),Qe.push(t)}function zo(){$e&&lr(),ke&&ar()}function No(t){let e=Ot|_t;j===null&&(e|=St);const n={deps:null,deriveds:null,equals:ir,f:e,first:null,fn:t,last:null,reactions:null,v:null,version:0};if(P!==null&&P.f&Ot){var r=P;r.deriveds===null?r.deriveds=[n]:r.deriveds.push(n)}return n}function ur(t){hn(t);var e=t.deriveds;if(e!==null){t.deriveds=null;for(var n=0;n<e.length;n+=1)Ao(e[n])}}function cr(t){ur(t);var e=hr(t),n=(qt||t.f&St)&&t.deps!==null?Lt:dt;ut(t,n),t.equals(e)||(t.v=e,t.version=dr(),pn(t,_t,!1))}function Ao(t){ur(t),De(t,0),ut(t,Xt),t.first=t.last=t.deps=t.reactions=t.fn=null}const fr=0,Do=1;let me=fr,ie=!1,Bt=!1,dn=!1;function Rn(t){Bt=t}function In(t){dn=t}let Nt=[],Yt=0,P=null;function Fn(t){P=t}let j=null,W=null,Y=0,xt=null;function Oo(t){xt=t}let Lo=0,qt=!1,U=null;function dr(){return Lo++}function tn(){return U!==null&&U.l===null}function ae(t){var b;var e=t.f,n=(e&_t)!==0;if(n)return!0;var r=(e&St)!==0,o=(e&we)!==0;if(e&Lt){var s=t.deps;if(s!==null)for(var c=s.length,h,d=0;d<c;d++){var p=s[d];!n&&ae(p)&&cr(p);var _=p.version;if(r){if(_>t.version)return!0;!qt&&!((b=p==null?void 0:p.reactions)!=null&&b.includes(t))&&(p.reactions??(p.reactions=[])).push(t)}else{if(t.f&_t)return!0;o&&(_>t.version&&(n=!0),h=p.reactions,h===null?p.reactions=[t]:h.includes(t)||h.push(t))}}r||ut(t,dt),o&&(t.f^=we)}return n}function Mo(t,e,n){throw t}function hr(t){const e=W,n=Y,r=xt,o=P,s=qt;W=null,Y=0,xt=null,P=t.f&(yt|cn)?null:t,qt=!Bt&&(t.f&St)!==0;try{let c=(0,t.fn)(),h=t.deps;if(W!==null){let d;if(h!==null){const p=h.length,_=Y===0?W:h.slice(0,Y).concat(W),E=_.length>16&&p-Y>1?new Set(_):null;for(d=Y;d<p;d++){const m=h[d];(E!==null?!E.has(m):!_.includes(m))&&pr(t,m)}}if(h!==null&&Y>0)for(h.length=Y+W.length,d=0;d<W.length;d++)h[Y+d]=W[d];else t.deps=h=W;if(!qt)for(d=Y;d<h.length;d++){const p=h[d],_=p.reactions;_===null?p.reactions=[t]:_[_.length-1]!==t&&!_.includes(t)&&_.push(t)}}else h!==null&&Y<h.length&&(De(t,Y),h.length=Y);return c}finally{W=e,Y=n,xt=r,P=o,qt=s}}function pr(t,e){const n=e.reactions;let r=0;if(n!==null){r=n.length-1;const o=n.indexOf(t);o!==-1&&(r===0?e.reactions=null:(n[o]=n[r],n.pop()))}r===0&&e.f&Ot&&(ut(e,Lt),e.f&(St|we)||(e.f^=we),De(e,0))}function De(t,e){const n=t.deps;if(n!==null){const r=e===0?null:n.slice(0,e);let o;for(o=e;o<n.length;o++){const s=n[o];(r===null||!r.includes(s))&&pr(t,s)}}}function hn(t,e=!0){let n=t.first;t.first=null,t.last=null;for(var r;n!==null;)r=n.next,de(n,e),n=r}function Oe(t){var e=t.f;if(!(e&Xt)){ut(t,dt);var n=t.ctx,r=j,o=U;j=t,U=n;try{e&or||hn(t),wr(t);var s=hr(t);t.teardown=typeof s=="function"?s:null}catch(c){Mo(c)}finally{j=r,U=o}}}function vr(){Yt>1e3&&(Yt=0,wo()),Yt++}function gr(t){var e=t.length;if(e!==0){vr();var n=Bt;Bt=!0;try{for(var r=0;r<e;r++){var o=t[r];if(o.first===null&&!(o.f&yt))Hn([o]);else{var s=[];mr(o,s),Hn(s)}}}finally{Bt=n}}}function Hn(t){var e=t.length;if(e!==0)for(var n=0;n<e;n++){var r=t[n];!(r.f&(Xt|Mt))&&ae(r)&&(Oe(r),r.deps===null&&r.first===null&&r.dom===null&&(r.teardown===null?Er(r):r.fn=null))}}function jo(){if(ie=!1,Yt>1001)return;const t=Nt;Nt=[],gr(t),ie||(Yt=0)}function Le(t){me===fr&&(ie||(ie=!0,queueMicrotask(jo)));for(var e=t;e.parent!==null;){e=e.parent;var n=e.f;if(n&yt){if(!(n&dt))return;ut(e,Lt)}}Nt.push(e)}function mr(t,e){var n=t.first,r=[];t:for(;n!==null;){var o=n.f,s=(o&(Xt|Mt))===0,c=o&yt,h=(o&dt)!==0,d=n.first;if(s&&(!c||!h)){if(c&&ut(n,dt),o&Vt){if(!c&&ae(n)&&(Oe(n),d=n.first),d!==null){n=d;continue}}else if(o&rr)if(c||h){if(d!==null){n=d;continue}}else r.push(n)}var p=n.next;if(p===null){let E=n.parent;for(;E!==null;){if(t===E)break t;var _=E.next;if(_!==null){n=_;continue t}E=E.parent}}n=p}for(var b=0;b<r.length;b++)d=r[b],e.push(d),mr(d,e)}function Rt(t,e=!0){var n=me,r=Nt;try{vr();const s=[];me=Do,Nt=s,ie=!1,e&&gr(r);var o=t==null?void 0:t();return zo(),(Nt.length>0||s.length>0)&&Rt(),Yt=0,o}finally{me=n,Nt=r}}function D(t){const e=t.f;if(e&Xt)return t.v;if(P!==null){const n=(P.f&St)!==0,r=P.deps;W===null&&r!==null&&r[Y]===t&&!(n&&j!==null)?Y++:(r===null||Y===0||r[Y-1]!==t)&&(W===null?W=[t]:W[W.length-1]!==t&&W.push(t)),xt!==null&&j!==null&&j.f&dt&&!(j.f&yt)&&xt.includes(t)&&(ut(j,_t),Le(j))}return e&Ot&&ae(t)&&cr(t),t.v}function pn(t,e,n){var r=t.reactions;if(r!==null)for(var o=tn(),s=r.length,c=0;c<s;c++){var h=r[c],d=h.f;if(!(d&_t||(!n||!o)&&h===j)){ut(h,e);var p=(d&Lt)!==0,_=(d&St)!==0;(d&dt||p&&_)&&(h.f&Ot?pn(h,Lt,n):Le(h))}}}function _r(t){const e=P;try{return P=null,t()}finally{P=e}}const Ro=~(_t|Lt|dt);function ut(t,e){t.f=t.f&Ro|e}function Io(t){return typeof t=="object"&&t!==null&&typeof t.f=="number"}function ue(t,e=!1,n){U={p:U,c:null,e:null,m:!1,s:t,x:null,l:null},e||(U.l={s:null,u:null,r1:[],r2:tt(!1)})}function ce(t){const e=U;if(e!==null){t!==void 0&&(e.x=t);const r=e.e;if(r!==null){e.e=null;for(var n=0;n<r.length;n++)gn(r[n])}U=e.p,e.m=!0}return t||{}}function J(t){return Io(t)?D(t):t}function Fo(t){var e=document.createElement("template");return e.innerHTML=t,e.content}function vn(t){if(Dt(t))for(var e=0;e<t.length;e++){var n=t[e];n.isConnected&&n.remove()}else t.isConnected&&t.remove()}function Ho(t){j===null&&P===null&&bo(),P!==null&&P.f&St&&yo(),dn&&_o()}function Pn(t,e){var n=e.last;n===null?e.last=e.first=t:(n.next=t,t.prev=n,e.last=t)}function Gt(t,e,n){var r=(t&cn)!==0,o={ctx:U,deps:null,dom:null,f:t|_t,first:null,fn:e,last:null,next:null,parent:r?null:j,prev:null,teardown:null,transitions:null};if(n){var s=Bt;try{Rn(!0),Oe(o),o.f|=ho}finally{Rn(s)}}else e!==null&&Le(o);var c=n&&o.deps===null&&o.first===null&&o.dom===null&&o.teardown===null;return!c&&!r&&(j!==null&&Pn(o,j),P!==null&&P.f&Ot&&Pn(o,P)),o}function yr(t){const e=Gt(Vt,null,!1);return ut(e,dt),e.teardown=t,e}function en(t){Ho();var e=j!==null&&(j.f&Vt)!==0&&U!==null&&!U.m;if(e){var n=U;(n.e??(n.e=[])).push(t)}else{var r=gn(t);return r}}function Po(t){const e=Gt(cn,t,!0);return()=>{de(e)}}function gn(t){return Gt(rr,t,!1)}function fe(t){return Gt(Vt,t,!0)}function mt(t){return fe(t)}function br(t,e=0){return Gt(Vt|or|e,t,!0)}function se(t){return Gt(Vt|yt,t,!0)}function wr(t){var e=t.teardown;if(e!==null){const n=dn,r=P;In(!0),Fn(null);try{e.call(null)}finally{In(n),Fn(r)}}}function de(t,e=!0){var n=t.dom;if(n!==null&&e&&vn(n),hn(t,e),De(t,0),ut(t,Xt),t.transitions)for(const o of t.transitions)o.stop();wr(t);var r=t.parent;r!==null&&t.f&yt&&r.first!==null&&Er(t),t.next=t.prev=t.teardown=t.ctx=t.dom=t.deps=t.parent=t.fn=null}function Er(t){var e=t.parent,n=t.prev,r=t.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),e!==null&&(e.first===t&&(e.first=r),e.last===t&&(e.last=n))}function nn(t,e){var n=[];mn(t,n,!0),Cr(n,()=>{de(t),e&&e()})}function Cr(t,e){var n=t.length;if(n>0){var r=()=>--n||e();for(var o of t)o.out(r)}else e()}function mn(t,e,n){if(!(t.f&Mt)){if(t.f^=Mt,t.transitions!==null)for(const c of t.transitions)(c.is_global||n)&&e.push(c);for(var r=t.first;r!==null;){var o=r.next,s=(r.f&fn)!==0||(r.f&yt)!==0;mn(r,e,s?n:!1),r=o}}}function xe(t){$r(t,!0)}function $r(t,e){if(t.f&Mt){t.f^=Mt,ae(t)&&Oe(t);for(var n=t.first;n!==null;){var r=n.next,o=(n.f&fn)!==0||(n.f&yt)!==0;$r(n,o?e:!1),n=r}if(t.transitions!==null)for(const s of t.transitions)(s.is_global||e)&&s.in()}}var Te,zt;function kr(){if(Te===void 0){Te=window,zt=document;var t=Element.prototype;t.__click=void 0,t.__className="",t.__attributes=null,t.__e=void 0,Text.prototype.__t=void 0}}function he(){return document.createTextNode("")}function lt(t){const e=t.firstChild;return G?e===null?t.appendChild(he()):Wt(e):e}function _n(t,e){return G?Wt(Tt):t.firstChild}function I(t,e=!1){var n=t.nextSibling;if(!G)return n;var r=n.nodeType;if(r===8&&n.data===io)return I(n,e);if(e&&r!==3){var o=he(),s=j.dom;return s.unshift(o),n==null||n.before(o),o}return Wt(n)}function yn(t){t.textContent=""}function qo(t){return document.createElement(t)}function Bo(t,e,n,r){function o(s){if(r.capture||rn(e,s),!s.cancelBubble)return n.call(this,s)}return t.startsWith("pointer")||t==="wheel"?le(()=>{e.addEventListener(t,o,r)}):e.addEventListener(t,o,r),o}function gt(t,e,n,r,o){var s={capture:r,passive:o},c=Bo(t,e,n,s);(e===document.body||e===window||e===document)&&yr(()=>{e.removeEventListener(t,c,s)})}function xr(t){for(var e=0;e<t.length;e++)Tr.add(t[e]);for(var n of on)n(t)}function rn(t,e){var T;var n=t.ownerDocument,r=e.type,o=((T=e.composedPath)==null?void 0:T.call(e))||[],s=o[0]||e.target,c=0,h=e.__root;if(h){var d=o.indexOf(h);if(d!==-1&&(t===document||t===window)){e.__root=t;return}var p=o.indexOf(t);if(p===-1)return;d<=p&&(c=d)}if(s=o[c]||e.target,s!==t){oe(e,"currentTarget",{configurable:!0,get(){return s||n}});try{for(var _,b=[];s!==null;){var E=s.parentNode||s.host||null;try{var m=s["__"+r];if(m!==void 0&&!s.disabled)if(Dt(m)){var[z,...x]=m;z.apply(s,[e,...x])}else m.call(s,e)}catch(O){_?b.push(O):_=O}if(e.cancelBubble||E===t||E===null)break;s=E}if(_){for(let O of b)queueMicrotask(()=>{throw O});throw _}}finally{e.__root=t,s=t}}}const Tr=new Set,on=new Set;function We(t,e){(t.__t??(t.__t=t.nodeValue))!==e&&(t.nodeValue=t.__t=e)}function Sr(t,e){const n=e.anchor??e.target.appendChild(he());return Rt(()=>zr(t,{...e,anchor:n}),!1)}function Yo(t,e){const n=e.target,r=jt;try{return Rt(()=>{$t(!0);for(var o=n.firstChild;o&&(o.nodeType!==8||o.data!==ye);)o=o.nextSibling;if(!o)throw Ke;const s=Wt(o),c=zr(t,{...e,anchor:s});return $t(!1),c},!1)}catch(o){if(o===Ke)return e.recover===!1&&Eo(),kr(),yn(n),$t(!1),Sr(t,e);throw o}finally{$t(!!r),lo(r)}}function zr(t,{target:e,anchor:n,props:r={},events:o,context:s,intro:c=!1}){kr();const h=new Set,d=rn.bind(null,e),p=rn.bind(null,document),_=m=>{for(let z=0;z<m.length;z++){const x=m[z];h.has(x)||(h.add(x),e.addEventListener(x,d,Mn.includes(x)?{passive:!0}:void 0),document.addEventListener(x,p,Mn.includes(x)?{passive:!0}:void 0))}};_(ao(Tr)),on.add(_);let b;const E=Po(()=>(se(()=>{if(s){ue({});var m=U;m.c=s}o&&(r.$$events=o),b=t(n,r)||{},s&&ce()}),()=>{for(const m of h)e.removeEventListener(m,d),document.removeEventListener(m,d);on.delete(_),sn.delete(b)}));return sn.set(b,E),b}let sn=new WeakMap;function Wo(t){const e=sn.get(t);e==null||e()}async function bn(t,e,n){await Promise.resolve();const r=Uo(t);if(!r.getElementById(e)){const o=qo("style");o.id=e,o.textContent=n,(r.head||r).appendChild(o)}}function Uo(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Se(t,e,n,r=null,o=!1){var s=null,c=null,h=null,d=o?fn:0;br(()=>{if(h===(h=!!e()))return;let p=!1;if(G){const _=t.data===er;h===_&&(vn(jt),$t(!1),p=!0)}h?(s?xe(s):s=se(()=>n(t)),c&&nn(c,()=>{c=null})):(c?xe(c):r&&(c=se(()=>r(t))),s&&nn(s,()=>{s=null})),p&&$t(!0)},d)}let Ue=null;function Vo(t,e){return e}function Xo(t,e,n){for(var r=[],o=t.length,s=0;s<o;s++)mn(t[s].e,r,!0);var c=o>0&&r.length===0&&e!==null;if(c){var h=e.parentNode;yn(h),h.append(e),n.clear(),kt(t[0].prev,t[o-1].next)}Cr(r,()=>{for(var d=0;d<o;d++){var p=t[d];c||(n.delete(p.k),kt(p.prev,p.next)),de(p.e,!c)}})}function wn(t,e,n,r,o,s=null){var c={flags:e,items:new Map,next:null},h=(e&Qn)!==0;if(h){var d=t;t=G?Wt(d.firstChild):d.appendChild(he())}var p=null;br(()=>{var _=n(),b=Dt(_)?_:_==null?[]:Array.from(_),E=b.length,m=c.flags;m&Ge&&!nr(b)&&!(X in b)&&(m^=Ge,m&to&&!(m&re)&&(m^=re));let z=!1;if(G){var x=t.data===er;(x!==(E===0)||Tt===void 0)&&(vn(jt),$t(!1),z=!0)}if(G){for(var T=Tt,O=c,k,$=0;$<E;$++){if(T.nodeType!==8||T.data!==ye){z=!0,$t(!1);break}T=Wt(T);var A=b[$],K=r(A,$);k=Nr(T,O,null,A,K,$,o,m),c.items.set(K,k),T=T.nextSibling,O=k}if(E>0)for(;T!==t;){var C=T.nextSibling;T.remove(),T=C}}G||Go(b,c,t,o,m,r),s!==null&&(E===0?p?xe(p):p=se(()=>s(t)):p!==null&&nn(p,()=>{p=null})),z&&$t(!0)})}function Go(t,e,n,r,o,s){var et,nt,ot,ht;var c=(o&eo)!==0,h=(o&(re|un))!==0,d=t.length,p=e.items,_=e.next,b=_,E=new Set,m=e,z=new Set,x=[],T=[],O,k,$,A;if(c)for(A=0;A<d;A+=1)O=t[A],k=s(O,A),$=p.get(k),$!==void 0&&((et=$.a)==null||et.measure(),z.add($));for(A=0;A<d;A+=1){if(O=t[A],k=s(O,A),$=p.get(k),$===void 0){var K=b?ee(b.e):n;m=Nr(K,m,m.next,O,k,A,r,o),p.set(k,m),x=[],T=[],b=m.next;continue}if(h&&Ko($,O,A,o),$.e.f&Mt&&(xe($.e),c&&((nt=$.a)==null||nt.unfix(),z.delete($))),$!==b){if(E.has($)){if(x.length<T.length){var C=T[0],S;m=C.prev;var q=x[0],L=x[x.length-1];for(S=0;S<x.length;S+=1)Bn(x[S],C,n);for(S=0;S<T.length;S+=1)E.delete(T[S]);kt(q.prev,L.next),kt(m,q),kt(L,C),b=C,m=L,A-=1,x=[],T=[]}else E.delete($),Bn($,b,n),kt($.prev,$.next),kt($,m.next),kt(m,$),m=$;continue}for(x=[],T=[];b!==null&&b.k!==k;)E.add(b),T.push(b),b=b.next;if(b===null)continue;$=b}x.push($),m=$,b=$.next}const M=Array.from(E);for(;b!==null;)M.push(b),b=b.next;var V=M.length;if(V>0){var Z=o&Qn&&d===0?n:null;if(c){for(A=0;A<V;A+=1)(ot=M[A].a)==null||ot.measure();for(A=0;A<V;A+=1)(ht=M[A].a)==null||ht.fix()}Xo(M,Z,p)}c&&le(()=>{var Kt;for($ of z)(Kt=$.a)==null||Kt.apply()})}function Ko(t,e,n,r){r&re&&H(t.v,e),r&un?H(t.i,n):t.i=n}function Nr(t,e,n,r,o,s,c,h){var d=Ue;try{var p=(h&re)!==0,_=(h&Ge)===0,b=p?_?Ee(r):tt(r):r,E=h&un?tt(s):s,m={i:E,v:b,k:o,a:null,e:null,prev:e,next:n};return e.next=m,n!==null&&(n.prev=m),Ue=m,m.e=se(()=>c(t,b,E)),m}finally{Ue=d}}function qn(t,e){if(t.nodeType===3&&t.data===""||t.nodeType===8){for(var n=e.first,r;n!==null&&(r=n.first,n.dom===null);){if(r===null)return t.previousSibling;n=r}return ee(n)}return t}function ee(t){var e=t.dom;return Dt(e)?qn(e[0],t):qn(e,t)}function Bn(t,e,n){for(var r=t.next?ee(t.next.e):n,o=e?ee(e.e):n,s=ee(t.e);s!==r;){var c=s.nextSibling;o.before(s),s=c}}function kt(t,e){t.next=e,e!==null&&(e.prev=t)}function ze(t,e=j){var n=e.dom;return n===null?e.dom=t:(Dt(n)||(n=e.dom=[n]),Dt(t)?n.push(...t):n.push(t)),t}function bt(t,e){var n=(e&ro)!==0,r=(e&oo)!==0,o;return()=>{if(G)return ze(n?jt:Tt),Tt;o||(o=Fo(t),n||(o=o.firstChild));var s=r?document.importNode(o,!0):o.cloneNode(!0);return ze(n?[...s.childNodes]:s),s}}function Jo(){if(G)return ze(jt),Tt;var t=document.createDocumentFragment(),e=he();return t.append(e),ze([e]),t}function at(t,e){G||t.before(e)}function Zo(t,e){{const n=document.body;t.autofocus=!0,le(()=>{document.activeElement===n&&t.focus()})}}function Qo(t){G&&t.firstChild!==null&&yn(t)}let Yn=!1;function Ar(){Yn||(Yn=!0,document.addEventListener("reset",t=>{Promise.resolve().then(()=>{var e;if(!t.defaultPrevented)for(const n of t.target.elements)(e=n.__on_r)==null||e.call(n)})},{capture:!0}))}function ti(t){if(G){var e=!1,n=()=>{if(!e){if(e=!0,t.hasAttribute("value")){var r=t.value;ft(t,"value",null),t.value=r}if(t.hasAttribute("checked")){var o=t.checked;ft(t,"checked",null),t.checked=o}}};t.__on_r=n,So(n),Ar()}}function ei(t,e){var n=t.__attributes??(t.__attributes={});n.value!==(n.value=e)&&(t.value=e)}function ft(t,e,n){n=n==null?null:n+"";var r=t.__attributes??(t.__attributes={});G&&(r[e]=t.getAttribute(e),e==="src"||e==="href"||e==="srcset")||r[e]!==(r[e]=n)&&(e==="loading"&&(t[vo]=n),n===null?t.removeAttribute(e):t.setAttribute(e,n))}function ne(t,e,n){n?t.classList.add(e):t.classList.remove(e)}function Dr(t,e,n,r=n){t.addEventListener(e,n);const o=t.__on_r;o?t.__on_r=()=>{o(),r()}:t.__on_r=r,Ar()}function ni(t,e,n){Dr(t,"input",()=>{n(Un(t)?Vn(t.value):t.value)}),fe(()=>{var r=e();if(G&&t.defaultValue!==t.value){n(t.value);return}Un(t)&&r===Vn(t.value)||t.type==="date"&&!r&&!t.value||(t.value=r??"")})}function ri(t,e,n,r,o){var s=n.getAttribute("type")==="checkbox",c=t;let h=!1;if(e!==null)for(var d of e){var p=c;c=p[d],c===void 0&&(c=p[d]=[])}c.push(n),Dr(n,"change",()=>{var _=n.__value;s&&(_=Wn(c,_,n.checked)),o(_)},()=>o(s?[]:null)),fe(()=>{var _=r();if(G&&n.defaultChecked!==n.checked){h=!0;return}s?(_=_||[],n.checked=Ce(_).includes(Ce(n.__value))):n.checked=xo(n.__value,_)}),yr(()=>{var _=c.indexOf(n);_!==-1&&c.splice(_,1)}),le(()=>{if(c.sort((E,m)=>E.compareDocumentPosition(m)===4?-1:1),h){var _;if(s)_=Wn(c,_,n.checked);else{var b=c.find(E=>E.checked);_=b==null?void 0:b.__value}o(_)}})}function Wn(t,e,n){for(var r=new Set,o=0;o<t.length;o+=1)t[o].checked&&r.add(t[o].__value);return n||r.delete(e),Array.from(r)}function Un(t){var e=t.type;return e==="number"||e==="range"}function Vn(t){return t===""?null:+t}function Xn(t,e){var r;var n=t&&((r=t[X])==null?void 0:r.t);return t===e||n===e}function ln(t,e,n,r){gn(()=>{var o,s;return fe(()=>{o=s,s=[],_r(()=>{t!==n(...s)&&(e(t,...s),o&&Xn(n(...o),t)&&e(null,...o))})}),()=>{le(()=>{s&&Xn(n(...s),t)&&e(null,...s)})}})}function Me(t,e,n,r){var z;var o=(n&no)!==0,s=t[e],c=(z=Je(t,e))==null?void 0:z.set,h=r,d=()=>h;s===void 0&&r!==void 0&&(c&&o&&Co(),s=d(),c&&c(s));var p;if(p=()=>{var x=t[e];return x===void 0?d():x},c){var _=t.$$legacy;return function(x,T){return arguments.length>0?((!T||_)&&c(T?p():x),x):p()}}var b=!1,E=Ee(s),m=No(()=>{var x=p(),T=D(E);return b?(b=!1,T):E.v=x});return function(x,T){var O=D(m);if(arguments.length>0){const k=T?D(m):x;return m.equals(k)||(b=!0,H(E,k),D(m)),x}return O}}function oi(t){return new ii(t)}var Et,it;class ii{constructor(e){Be(this,Et);Be(this,it);const n=st({...e.props||{},$$events:{}},!1);Ye(this,it,(e.hydrate?Yo:Sr)(e.component,{target:e.target,props:n,context:e.context,intro:e.intro,recover:e.recover})),Ye(this,Et,n.$$events);for(const r of Object.keys(Q(this,it)))r==="$set"||r==="$destroy"||r==="$on"||oe(this,r,{get(){return Q(this,it)[r]},set(o){Q(this,it)[r]=o},enumerable:!0});Q(this,it).$set=r=>{Object.assign(n,r)},Q(this,it).$destroy=()=>{Wo(Q(this,it))}}$set(e){Q(this,it).$set(e)}$on(e,n){Q(this,Et)[e]=Q(this,Et)[e]||[];const r=(...o)=>n.call(this,...o);return Q(this,Et)[e].push(r),()=>{Q(this,Et)[e]=Q(this,Et)[e].filter(o=>o!==r)}}$destroy(){Q(this,it).$destroy()}}Et=new WeakMap,it=new WeakMap;let Or;typeof HTMLElement=="function"&&(Or=class extends HTMLElement{constructor(e,n,r){super();ct(this,"$$ctor");ct(this,"$$s");ct(this,"$$c");ct(this,"$$cn",!1);ct(this,"$$d",{});ct(this,"$$r",!1);ct(this,"$$p_d",{});ct(this,"$$l",{});ct(this,"$$l_u",new Map);ct(this,"$$me");this.$$ctor=e,this.$$s=n,r&&this.attachShadow({mode:"open"})}addEventListener(e,n,r){if(this.$$l[e]=this.$$l[e]||[],this.$$l[e].push(n),this.$$c){const o=this.$$c.$on(e,n);this.$$l_u.set(n,o)}super.addEventListener(e,n,r)}removeEventListener(e,n,r){if(super.removeEventListener(e,n,r),this.$$c){const o=this.$$l_u.get(n);o&&(o(),this.$$l_u.delete(n))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){let e=function(o){return s=>{const c=document.createElement("slot");o!=="default"&&(c.name=o),at(s,c)}};if(await Promise.resolve(),!this.$$cn||this.$$c)return;const n={},r=si(this);for(const o of this.$$s)o in r&&(o==="default"&&!this.$$d.children?(this.$$d.children=e(o),n.default=!0):n[o]=e(o));for(const o of this.attributes){const s=this.$$g_p(o.name);s in this.$$d||(this.$$d[s]=_e(s,o.value,this.$$p_d,"toProp"))}for(const o in this.$$p_d)!(o in this.$$d)&&this[o]!==void 0&&(this.$$d[o]=this[o],delete this[o]);this.$$c=oi({component:this.$$ctor,target:this.shadowRoot||this,props:{...this.$$d,$$slots:n,$$host:this}}),this.$$me=fe(()=>{var o;this.$$r=!0;for(const s of be(this.$$c)){if(!((o=this.$$p_d[s])!=null&&o.reflect))continue;this.$$d[s]=this.$$c[s];const c=_e(s,this.$$d[s],this.$$p_d,"toAttribute");c==null?this.removeAttribute(this.$$p_d[s].attribute||s):this.setAttribute(this.$$p_d[s].attribute||s,c)}this.$$r=!1});for(const o in this.$$l)for(const s of this.$$l[o]){const c=this.$$c.$on(o,s);this.$$l_u.set(s,c)}this.$$l={}}}attributeChangedCallback(e,n,r){var o;this.$$r||(e=this.$$g_p(e),this.$$d[e]=_e(e,r,this.$$p_d,"toProp"),(o=this.$$c)==null||o.$set({[e]:this.$$d[e]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then(()=>{!this.$$cn&&this.$$c&&(this.$$c.$destroy(),de(this.$$me),this.$$c=void 0)})}$$g_p(e){return be(this.$$p_d).find(n=>this.$$p_d[n].attribute===e||!this.$$p_d[n].attribute&&n.toLowerCase()===e)||e}});function _e(t,e,n,r){var s;const o=(s=n[t])==null?void 0:s.type;if(e=o==="Boolean"&&typeof e!="boolean"?e!=null:e,!r||!n[t])return e;if(r==="toAttribute")switch(o){case"Object":case"Array":return e==null?null:JSON.stringify(e);case"Boolean":return e?"":null;case"Number":return e??null;default:return e}else switch(o){case"Object":case"Array":return e&&JSON.parse(e);case"Boolean":return e;case"Number":return e!=null?+e:e;default:return e}}function si(t){const e={};return t.childNodes.forEach(n=>{e[n.slot||"default"]=!0}),e}function je(t,e,n,r,o,s){let c=class extends Or{constructor(){super(t,n,o),this.$$p_d=e}static get observedAttributes(){return be(e).map(h=>(e[h].attribute||h).toLowerCase())}};return be(e).forEach(h=>{oe(c.prototype,h,{get(){return this.$$c&&h in this.$$c?this.$$c[h]:this.$$d[h]},set(d){var p;d=_e(h,d,e),this.$$d[h]=d,(p=this.$$c)==null||p.$set({[h]:d})}})}),r.forEach(h=>{oe(c.prototype,h,{get(){var d;return(d=this.$$c)==null?void 0:d[h]}})}),t.element=c,c}const Ut=new Map([["yellow","#F8B920"],["red","#FF4646"],["blue","#0064FF"],["green","#00C564"]]),li=["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","OPTION"];function Lr(t){const e=t.map(c=>c.trim().toLocaleLowerCase()),n=e.map(()=>({start:null,end:null,shift:0})),r=e.map(()=>[]),o=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,c=>{var h,d;return li.includes((h=c.parentNode)==null?void 0:h.tagName)||!((d=c.parentNode)!=null&&d.checkVisibility())?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let s;for(;s=o.nextNode();)if(s!=null&&s.nodeValue)for(let c=0;c<s.nodeValue.length;c++){const h=s.nodeValue[c].toLocaleLowerCase().trim();h&&e.forEach((d,p)=>{var b;for(;d[n[p].shift]&&!d[n[p].shift].trim();)n[p].shift++;let _=d[n[p].shift]===h;if(!_&&n[p].shift&&(n[p].shift=0,_=d[n[p].shift]===h),_&&(n[p].shift||(n[p].start=[s,c]),n[p].end=[s,c],n[p].shift++),n[p].shift>=d.length){const E=document.createRange();E.setStart(n[p].start[0],n[p].start[1]),E.setEnd(n[p].end[0],n[p].end[1]+1),!E.collapsed&&((b=E.commonAncestorContainer.parentElement)!=null&&b.checkVisibility())?r[p].push(E):E.detach(),_=!1}_||(n[p].shift=0,n[p].start=null,n[p].end=null)})}return r}const At=`rh-${new Date().getTime()}-`,Re="highlights"in CSS;function ai(t){if(!t.length&&!CSS.highlights.size)return;const e=[];if(CSS.highlights.clear(),t.length){const r=Lr(t.map(({text:o})=>o||""));for(const o in t){if(!r[o].length)continue;const{_id:s,color:c}=t[o],h=`${At}${s}`;CSS.highlights.set(h,new Highlight(...r[o]));const d=r[o][0].getBoundingClientRect();e.push(`
                ::highlight(${h}) {
                    all: unset;
                    background-color: color-mix(in srgb, ${Ut.get(c)||c}, white 50%) !important;
                    color: black;
                }

                :root {
                    --highlight-${s}-top: ${(100/document.documentElement.scrollHeight*(window.scrollY+d.top-10)).toFixed(2)}%;
                }
            `);for(const p of r[o])p.detach()}}const n=(()=>{let r=document.getElementById(At);return r||(r=document.createElement("style"),r.id=At,document.head.appendChild(r)),r})();n.innerHTML=e.join(`
`)}function ui(){var t;(t=document.getElementById(At))==null||t.remove()}function ci(t){var e;for(const[n,r]of CSS.highlights){const o=n.replace(At,"");if(t==o)for(const s of r){(e=s.startContainer.parentElement)==null||e.scrollIntoView({behavior:"smooth",block:"start"});break}}}function fi(t){let e;for(const[n,r]of CSS.highlights)for(const o of r){const s=t.compareBoundaryPoints(Range.START_TO_START,o),c=t.compareBoundaryPoints(Range.END_TO_END,o);(s==0&&c==0||t!=null&&t.collapsed&&s>=0&&c<=0)&&(e=[n.replace(At,""),o])}if(e)return e[0].replace(At,"")}const Ct=`rh-${new Date().getTime()}`;function di(t){const e=document.body.querySelectorAll(`.${Ct}`);if(!t.length&&!e.length)return;e.forEach(s=>s.outerHTML=s.innerText);const n=[],r=Lr(t.map(({text:s})=>s||""));for(const s in t){const{_id:c,color:h}=t[s];for(const d of r[s]){const p=document.createElement("mark");p.className=Ct,p.setAttribute("data-id",String(c)),p.append(d.extractContents()),d.insertNode(p),d.detach()}n.push(`
            .${Ct}[data-id="${c}"] {
                all: unset;
                display: inline-block;
                background-color: ${gi(Ut.get(h)||h,.5)} !important;
            }
        `)}const o=(()=>{let s=document.getElementById(Ct);return s||(s=document.createElement("style"),s.id=Ct,document.head.appendChild(s)),s})();o.innerHTML=n.join(`
`)}function hi(){var t;document.body.querySelectorAll(`.${Ct}`).forEach(e=>e.outerHTML=e.innerText),(t=document.getElementById(Ct))==null||t.remove()}function pi(t){const e=document.body.querySelector(`.${Ct}[data-id="${t}"]`);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}function vi(t){const e=t.commonAncestorContainer.nodeType==Node.ELEMENT_NODE?t.commonAncestorContainer:t.commonAncestorContainer.parentElement;if((e==null?void 0:e.className)==Ct){if(!t.collapsed){const n=new Range;n.selectNodeContents(t.commonAncestorContainer);const r=t.compareBoundaryPoints(Range.START_TO_START,n),o=t.compareBoundaryPoints(Range.END_TO_END,n);if(n.detach(),r!=0||o!=0)return}return e.getAttribute("data-id")||void 0}}function gi(t,e){if(!t)return t;const n=parseInt(t.slice(1,3),16),r=parseInt(t.slice(3,5),16),o=parseInt(t.slice(5,7),16);return`rgba(${n}, ${r}, ${o}, ${e})`}function Ne(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var mi=typeof global=="object"&&global&&global.Object===Object&&global,_i=typeof self=="object"&&self&&self.Object===Object&&self,Mr=mi||_i||Function("return this")(),Ve=function(){return Mr.Date.now()},yi=/\s/;function bi(t){for(var e=t.length;e--&&yi.test(t.charAt(e)););return e}var wi=/^\s+/;function Ei(t){return t&&t.slice(0,bi(t)+1).replace(wi,"")}var Ae=Mr.Symbol,jr=Object.prototype,Ci=jr.hasOwnProperty,$i=jr.toString,Zt=Ae?Ae.toStringTag:void 0;function ki(t){var e=Ci.call(t,Zt),n=t[Zt];try{t[Zt]=void 0;var r=!0}catch{}var o=$i.call(t);return r&&(e?t[Zt]=n:delete t[Zt]),o}var xi=Object.prototype,Ti=xi.toString;function Si(t){return Ti.call(t)}var zi="[object Null]",Ni="[object Undefined]",Gn=Ae?Ae.toStringTag:void 0;function Ai(t){return t==null?t===void 0?Ni:zi:Gn&&Gn in Object(t)?ki(t):Si(t)}function Di(t){return t!=null&&typeof t=="object"}var Oi="[object Symbol]";function Li(t){return typeof t=="symbol"||Di(t)&&Ai(t)==Oi}var Kn=NaN,Mi=/^[-+]0x[0-9a-f]+$/i,ji=/^0b[01]+$/i,Ri=/^0o[0-7]+$/i,Ii=parseInt;function Jn(t){if(typeof t=="number")return t;if(Li(t))return Kn;if(Ne(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=Ne(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=Ei(t);var n=ji.test(t);return n||Ri.test(t)?Ii(t.slice(2),n?2:8):Mi.test(t)?Kn:+t}var Fi="Expected a function",Hi=Math.max,Pi=Math.min;function qi(t,e,n){var r,o,s,c,h,d,p=0,_=!1,b=!1,E=!0;if(typeof t!="function")throw new TypeError(Fi);e=Jn(e)||0,Ne(n)&&(_=!!n.leading,b="maxWait"in n,s=b?Hi(Jn(n.maxWait)||0,e):s,E="trailing"in n?!!n.trailing:E);function m(C){var S=r,q=o;return r=o=void 0,p=C,c=t.apply(q,S),c}function z(C){return p=C,h=setTimeout(O,e),_?m(C):c}function x(C){var S=C-d,q=C-p,L=e-S;return b?Pi(L,s-q):L}function T(C){var S=C-d,q=C-p;return d===void 0||S>=e||S<0||b&&q>=s}function O(){var C=Ve();if(T(C))return k(C);h=setTimeout(O,x(C))}function k(C){return h=void 0,E&&r?m(C):(r=o=void 0,c)}function $(){h!==void 0&&clearTimeout(h),p=0,r=d=o=h=void 0}function A(){return h===void 0?c:k(Ve())}function K(){var C=Ve(),S=T(C);if(r=arguments,o=this,d=C,S){if(h===void 0)return z(d);if(b)return clearTimeout(h),h=setTimeout(O,e),m(d)}return h===void 0&&(h=setTimeout(O,e)),c}return K.cancel=$,K.flush=A,K}var Bi="Expected a function";function Rr(t,e,n){var r=!0,o=!0;if(typeof t!="function")throw new TypeError(Bi);return Ne(n)&&(r="leading"in n?!!n.leading:r,o="trailing"in n?!!n.trailing:o),qi(t,e,{leading:r,maxWait:e,trailing:o})}function Ir(t){return Re?ai(t):di(t)}const Yi=Rr(Ir,500);function Xe(t){return t.length?Yi(t):Ir(t)}function Wi(){return Re?ui():hi()}function Fr(t){return Re?ci(t):pi(t)}function Hr(){const t=document.getSelection();if(t!=null&&t.rangeCount)return t.getRangeAt(0)}function te(){const t=document.getSelection();t!=null&&t.rangeCount&&t.removeAllRanges()}function Ui(t){return Re?fi(t):vi(t)}function Zn(t){if(!t)return"";var e=document.createElement("div");e.appendChild(t.cloneContents().cloneNode(!0)),document.body.appendChild(e);const n=e.innerText;return document.body.removeChild(e),e=void 0,n}function Vi(t,e,n){let r=tt(st([])),o=tt(!1),s=tt(!1),c=tt(void 0);function h(m){const z=Ui(m);if(z)return D(r).find(T=>T._id==z);if(Zn(m).trim())return{text:Zn(m).trim()}}function d(m){const z={...m._id?{_id:m._id}:{},...m.text?{text:m.text}:{},...m.note?{note:m.note}:{},color:m.color||"yellow"};if(!z.text)return;const x=D(r).findIndex(T=>{var O,k;return T._id==z._id||((O=T.text)==null?void 0:O.toLocaleLowerCase().trim())===((k=z.text)==null?void 0:k.toLocaleLowerCase().trim())});x!=-1?(D(r)[x]=z,e(z)):(D(r).push(z),t(z))}function p({_id:m}){H(r,st(D(r).filter(z=>z._id!=m))),n({_id:m})}function _(m){H(c,st(JSON.parse(JSON.stringify(m))))}function b(){D(c)&&(d(D(c)),H(c,void 0))}function E(){H(c,void 0)}return{get highlights(){return D(r)},set highlights(m){H(r,st(m))},get pro(){return D(o)},set pro(m){H(o,st(m))},get nav(){return D(s)},set nav(m){H(s,st(m))},get draft(){return D(c)},find:h,upsert:d,remove:p,setDraft:_,draftSubmit:b,draftCancel:E}}const Xi="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Xi);function an(){var t;return(t=navigator==null?void 0:navigator.userAgentData)!=null&&t.mobile?!0:/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)}var Gi=bt('<button type="submit" class="svelte-1iojgl7"><span class="color svelte-1iojgl7"></span></button>'),Ki=bt('<button type="submit" value="remove" title="Delete highlight" class="svelte-1iojgl7"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-1iojgl7"><g class="svelte-1iojgl7"><line x1="2.75" y1="4.25" x2="15.25" y2="4.25" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-1iojgl7"></line><path d="M6.75,4.25v-1.5c0-.552,.448-1,1-1h2.5c.552,0,1,.448,1,1v1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-1iojgl7"></path><path d="M13.5,6.75l-.4,7.605c-.056,1.062-.934,1.895-1.997,1.895H6.898c-1.064,0-1.941-.833-1.997-1.895l-.4-7.605" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-1iojgl7"></path></g></svg></button>'),Ji=bt('<dialog class="svelte-1iojgl7"><form method="dialog" class="svelte-1iojgl7"><!> <button type="submit" value="note" title="Add note" class="svelte-1iojgl7"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-1iojgl7"><g class="svelte-1iojgl7"><path stroke-linecap="round" stroke-linejoin="round" d="M9,1.75C4.996,1.75,1.75,4.996,1.75,9c0,1.319,.358,2.552,.973,3.617,.43,.806-.053,2.712-.973,3.633,1.25,.068,2.897-.497,3.633-.973,.489,.282,1.264,.656,2.279,.848,.433,.082,.881,.125,1.338,.125,4.004,0,7.25-3.246,7.25-7.25S13.004,1.75,9,1.75Z" class="svelte-1iojgl7"></path><path stroke-width="0" d="M9,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-1iojgl7"></path><path stroke-width="0" d="M5.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-1iojgl7"></path><path stroke-width="0" d="M12.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-1iojgl7"></path></g></svg></button> <!></form></dialog>');function Pr(t,e){ue(e,!0);let n=Me(e,"store",7),r,o=tt(void 0),s=tt(!1);function c(C){if(!D(o))return;const S=C.currentTarget.returnValue;switch(C.currentTarget.returnValue="",S){case"add":n().upsert(D(o)),te();break;case"note":n().setDraft(D(o)),te();break;case"remove":n().remove(D(o)),te();break;default:if(Ut.has(S)){n().upsert({...D(o),color:S}),te();return}break}}function h(){H(s,!0)}function d(){H(s,!1),setTimeout(p)}function p(){if(D(s)){r==null||r.close();return}requestAnimationFrame(()=>{const C=Hr(),S=C&&n().find(C);if(!C||!(S!=null&&S._id)&&!C.toString().trim()){r==null||r.close();return}H(o,st(S)),r.inert=!0,r==null||r.show(),r.inert=!1;const q=256,L=10,M=C.getBoundingClientRect(),V=Math.min(Math.max(M.x,L)+window.scrollX,window.innerWidth+window.scrollX-q-L),Z=Math.min(window.innerWidth-Math.max(M.x,L)-window.scrollX-M.width,window.innerWidth-window.scrollX-q-L),et=Math.max(M.y,40)+window.scrollY+M.height+4,nt=window.innerHeight-Math.max(M.y,40)-window.scrollY+4,ot=V<window.innerWidth/2+window.scrollX,ht=et<window.innerHeight/2+window.scrollY;r==null||r.style.setProperty("left",ot?`${V}px`:"unset"),r==null||r.style.setProperty("right",ot?"unset":`${Z}px`),r==null||r.style.setProperty("top",ht?`${et}px`:"unset"),r==null||r.style.setProperty("bottom",ht?"unset":`${nt}px`)})}const _=Rr(p,200,{leading:!0,trailing:!0});var b=Ji();gt("mousedown",zt,h,!1),gt("touchstart",zt,h,!1,!0),gt("mouseup",zt,d,!1),gt("touchend",zt,d,!1,!0),gt("touchcancel",zt,d,!1,!0),gt("selectionchange",zt,_,!1),ln(b,C=>r=C,()=>r),mt(()=>ne(b,"mobile",an()));var E=lt(b),m=lt(E);wn(m,71,()=>Ut,(C,S)=>J(J(C))[0],(C,S,q)=>{let L=()=>J(J(S))[0],M=()=>J(J(S))[1];var V=Gi(),Z=lt(V);mt(()=>{var et;ei(V,L()),ft(Z,"style",`--color: ${M()??""}`),ne(Z,"active",L()==((et=D(o))==null?void 0:et.color))}),at(C,V)});var z=I(I(m,!0)),x=lt(z),T=lt(x),O=lt(T),k=I(O),$=I(k),A=I($),K=I(I(z,!0));return Se(K,()=>{var C;return(C=D(o))==null?void 0:C._id},C=>{var S=Ki();at(C,S)}),mt(()=>{var C,S,q,L,M,V;ne(b,"new",!((C=D(o))!=null&&C._id)),ft(O,"fill",(S=D(o))!=null&&S.note?"currentColor":"none"),ft(O,"stroke-width",(q=D(o))!=null&&q.note?"0":void 0),ft(k,"fill",(L=D(o))!=null&&L.note?"none":"currentColor"),ft($,"fill",(M=D(o))!=null&&M.note?"none":"currentColor"),ft(A,"fill",(V=D(o))!=null&&V.note?"none":"currentColor")}),gt("close",b,c,!1),at(t,b),bn(t,"svelte-1iojgl7",`
    .svelte-1iojgl7 {
        user-select: none;
        -webkit-user-select: none;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    dialog.svelte-1iojgl7 {
        --control-size: 16px;
        --padding-s: 6px;
        --padding-m: 8px;

        --bg-light: rgb(255, 255, 255);
        --bg-dark: rgb(60, 60, 60);
        --control-fg-light: rgb(65, 65, 65);
        --control-fg-dark: rgb(230, 230, 230);
        --hover-bg-light: rgba(0,0,0,.07);
        --hover-bg-dark: rgba(255,255,255,.1);
        --active-bg-light: rgba(0,0,0,.13);
        --active-bg-dark: rgba(255,255,255,.2);
    }

    @supports (background-color: -apple-system-control-background) {
        dialog.svelte-1iojgl7 {
            --bg-light: rgba(255, 255, 255, .8);
            --bg-dark: rgba(60, 60, 60, .8);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }
    }

    dialog.mobile.svelte-1iojgl7 {
        --control-size: 26px;
    }

    dialog.svelte-1iojgl7 {
        position: absolute;
        left: unset;
        top: unset;
        right: unset;
        bottom: unset;
        border: none;
        padding: 2px;
        border-radius: var(--control-size);
        overflow: clip;
        z-index: 999999999999999;

        background: var(--bg-light);
        color: var(--control-fg-light);

        @supports(color: light-dark(white,black)) {
            background: light-dark(var(--bg-light), var(--bg-dark));
            color: light-dark(var(--control-fg-light), var(--control-fg-dark));
        }
    }    

    dialog.mobile.new.svelte-1iojgl7 {
        position: fixed;
        top: auto !important;
        left: auto !important;
        right: 16px !important;
        bottom: 16px !important;
        margin-right: env(safe-area-inset-right);
        margin-bottom: env(safe-area-inset-bottom);
    }

    [open].svelte-1iojgl7 {
        box-shadow: 0 0 0 .5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.05), 0 15px 40px rgba(0,0,0,.1);
    }

    form.svelte-1iojgl7 {
        display: flex;
        margin: 0;
        padding: 0;
    }

    button.svelte-1iojgl7 {
        border-radius: 8px;
        border: 0;
        background: transparent;
        cursor: pointer;
        appearance: none;
        touch-action: manipulation;
        width: calc(var(--control-size) + var(--padding-m)*2);
        height: calc(var(--control-size) + var(--padding-s)*2);
        padding: var(--padding-s) var(--padding-m);
        color: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background .15s ease-in-out;
    }

    button.svelte-1iojgl7:first-child {
        border-top-left-radius: var(--control-size);
        border-bottom-left-radius: var(--control-size);
    }

    button.svelte-1iojgl7:last-child {
        border-top-right-radius: var(--control-size);
        border-bottom-right-radius: var(--control-size);
    }

    @media (pointer: fine) {
        button.svelte-1iojgl7:hover {
            background: var(--hover-bg-light);

            @supports(color: light-dark(white,black)) {
                background: light-dark(var(--hover-bg-light), var(--hover-bg-dark));
            }
        }
    }

    button.svelte-1iojgl7:active {
        transition: none;
        background: var(--active-bg-light);

        @supports(color: light-dark(white,black)) {
            background: light-dark(var(--active-bg-light), var(--active-bg-dark));
        }
    }

    svg.svelte-1iojgl7 {
        stroke: currentColor;
        stroke-width: 1.5px;
    }

    .color.svelte-1iojgl7 {
        pointer-events: none;
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        box-shadow: inset 0 0 0 6px var(--color);
        transition: width .15s ease-in-out, height .15s ease-in-out;
        border-radius: 50%;
    }

    .color.active.svelte-1iojgl7 {
        width: 16px;
        height: 16px;
        box-shadow: inset 0 0 0 6px var(--color)
    }

    /* animation */
    dialog.svelte-1iojgl7 {
        transition: 
            display .25s allow-discrete ease-in-out, 
            overlay .25s allow-discrete ease-in-out, 
            box-shadow .25s allow-discrete ease-in-out, 
            transform .25s allow-discrete ease-in-out,
            opacity .25s ease-in-out;
        opacity: 0;
        transform: translateY(3px);
    }

    [open].svelte-1iojgl7 {
        opacity: 1;
        transform: translateY(0);
    }

    dialog.svelte-1iojgl7:not([open]) {
        transition-duration: .2s;
        pointer-events: none;
    }

    @starting-style {
        [open].svelte-1iojgl7 {
            opacity: 0;
            transform: translateY(-3px);
        }
    }
`),ce({get store(){return n()},set store(C){n(C),Rt()}})}je(Pr,{store:{}},[],[],!0);function Zi(t){const e=t.currentTarget.getBoundingClientRect();e.top<=t.clientY&&t.clientY<=e.top+e.height&&e.left<=t.clientX&&t.clientX<=e.left+e.width||(t.preventDefault(),t.currentTarget.close())}var Qi=(t,e)=>H(e,!1),ts=bt('<input type="radio" name="color" class="svelte-2yzs5z">'),es=bt('<div class="unlock svelte-2yzs5z"><a href="https://raindrop.io/pro/buy" target="_blank" class="svelte-2yzs5z">Upgrade to Pro</a> to unlock annotation</div>'),ns=bt('<blockquote role="presentation" class="svelte-2yzs5z"> </blockquote> <fieldset class="color svelte-2yzs5z"></fieldset> <textarea class="note svelte-2yzs5z" rows="4" maxlength="5000" placeholder="Notes (optional)"></textarea> <!>',1),rs=bt('<dialog role="presentation" class="svelte-2yzs5z"><header class="svelte-2yzs5z"> </header> <form method="dialog" class="svelte-2yzs5z"><!> <footer class="svelte-2yzs5z"><button formnovalidate="" class="svelte-2yzs5z">Cancel <sup class="svelte-2yzs5z">esc</sup></button> <button type="submit" value="OK" class="svelte-2yzs5z"> <sup class="svelte-2yzs5z">&crarr;</sup></button></footer></form></dialog>');function qr(t,e){ue(e,!0);const n=[];let r=Me(e,"store",7),o,s,c=tt(!0);en(()=>{r().draft?(H(c,!0),o==null||o.showModal()):o==null||o.close()});function h(k){const $=k.currentTarget.returnValue;k.currentTarget.returnValue="",setTimeout($?r().draftSubmit:r().draftCancel,200)}function d(k){var $;an()||(k.stopImmediatePropagation(),k.stopPropagation(),k.key=="Enter"&&!k.shiftKey&&(k.preventDefault(),s&&(($=k.currentTarget.closest("form"))==null||$.requestSubmit(s))))}var p=rs();ln(p,k=>o=k,()=>o),p.__mousedown=[Zi],mt(()=>ne(p,"mobile",an()));var _=lt(p),b=lt(_),E=I(I(_,!0)),m=lt(E);Se(m,()=>r().draft,k=>{var $=ns(),A=_n($);A.__click=[Qi,c];var K=lt(A);mt(()=>{var L,M;return We(K,((M=(L=r().draft)==null?void 0:L.text)==null?void 0:M.trim())||"")});var C=I(I(A,!0));wn(C,73,()=>Ut,Vo,(L,M,V)=>{let Z=()=>J(J(M))[0],et=()=>J(J(M))[1];var nt=ts();ti(nt);var ot;mt(()=>{ot!==(ot=Z())&&(nt.value=(nt.__value=Z())==null?"":Z()),ft(nt,"style",`--color: ${et()??""}`)}),ri(n,[],nt,()=>(Z(),r().draft.color),ht=>r().draft.color=ht),at(L,nt)});var S=I(I(C,!0));Qo(S),Zo(S),S.__keydown=d;var q=I(I(S,!0));Se(q,()=>!r().pro,L=>{var M=es();at(L,M)}),mt(()=>{ne(A,"compact",D(c)),S.disabled=!r().pro}),ni(S,()=>r().draft.note,L=>r().draft.note=L),at(k,$)});var z=I(I(m,!0)),x=lt(z),T=I(I(x,!0));ln(T,k=>s=k,()=>s);var O=lt(T);return mt(()=>{var k,$;We(b,`${((k=r().draft)!=null&&k._id?"Edit":"New")??""} highlight`),We(O,`${(($=r().draft)!=null&&$._id?"Update":"Create")??""} `)}),gt("close",p,h,!1),at(t,p),bn(t,"svelte-2yzs5z",`
    .svelte-2yzs5z {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    dialog.svelte-2yzs5z {
        --bg-light: rgb(245, 245, 245);
        --bg-dark: rgb(35, 35, 35);
        --fg-light: black;
        --fg-dark: white;
        --control-bg-light: rgb(230, 230, 230);
        --control-bg-dark: rgb(55, 55, 55);

        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
        font-size: 18px;
        line-height: 1.4;
        border: none;
        border-radius: .5em;
        padding: 0;
        overscroll-behavior: none;

        color: var(--fg-light);

        @supports(color: light-dark(white,black)) {
            color: light-dark(var(--fg-light), var(--fg-dark));
        }
    }

    dialog.mobile.svelte-2yzs5z {
        left: 0;right: 0;bottom: 0;top: 0;
        width: 100%;
        margin: 0;
        max-width: 100%;
        max-height: 100%;
        border-radius: 0;
        bottom: auto;
    }

    dialog.svelte-2yzs5z, header.svelte-2yzs5z {
        background: var(--bg-light);

        @supports(color: light-dark(white,black)) {
            background: light-dark(var(--bg-light), var(--bg-dark));
        }
    }

    [open].svelte-2yzs5z {
        box-shadow: 0 0 0 .5px rgba(60, 60, 60, .9), 0 3px 10px rgba(0,0,0,.05), 0 7px 15px -3px rgba(0,0,0,.15);
    }

    .svelte-2yzs5z::backdrop {
        background-color: rgba(0,0,0,.3);
    }

    header.svelte-2yzs5z {
        margin: 0;
        padding: 1em;
        font-weight: bold;
        position: sticky;
        top: 0;
        
    }

    @supports(animation-timeline: scroll()) {
        header.svelte-2yzs5z {
            animation: svelte-2yzs5z-header-scroll linear both;
            animation-timeline: scroll();
            animation-range: 0 1px;
        }
    }

    @keyframes svelte-2yzs5z-header-scroll {
        to {
            box-shadow: 0 .5px 0 rgba(0,0,0,.2);
        }
    }

    form.svelte-2yzs5z {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 1em;
        padding-top: 0;
    }

    .color.svelte-2yzs5z {
        all: unset;
        display: flex;
        gap: .75em;
    }

    .color.svelte-2yzs5z input[type="radio"]:where(.svelte-2yzs5z) {
        cursor: pointer;
        appearance: none;
        user-select: none;
        -webkit-user-select: none;
        margin: 0;
        background: Canvas;
        box-shadow: inset 0 0 0 1em var(--color);
        transition: box-shadow .2s ease-in-out;
        width: 2em;
        height: 2em;
        border-radius: 50%;
    }

    .color.svelte-2yzs5z input[type="radio"]:where(.svelte-2yzs5z):checked {
        box-shadow: inset 0 0 0 .5em var(--color);
    }

    .color.svelte-2yzs5z input[type="radio"]:where(.svelte-2yzs5z):active {
        transform: translateY(1px);
    }

    blockquote.svelte-2yzs5z, .note.svelte-2yzs5z, button.svelte-2yzs5z {
        background: var(--control-bg-light);

        @supports(color: light-dark(white,black)) {
            background: light-dark(var(--control-bg-light), var(--control-bg-dark));
        }
    }

    blockquote.svelte-2yzs5z {
        white-space: pre-wrap;
        margin: 0;
        min-width: 100%;
        width: 0;
        font-size: 16px;
    }

    blockquote.compact.svelte-2yzs5z {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        overflow: clip;
    }

    blockquote.svelte-2yzs5z, .note.svelte-2yzs5z {
        border-radius: .5em;
        padding: .5em .6em;
    }

    .note.svelte-2yzs5z {
        min-width: min(21em, 70vw);
        min-height: 4lh;
        appearance: none;
        border: 0;
        font: inherit;
        color: inherit;
        display: block;
        scroll-margin-top: 100vh;
        transition: background .15s ease-in-out, box-shadow .15s ease-in-out;
    }

    .note.svelte-2yzs5z:focus {
        background: transparent;
    }
    
    footer.svelte-2yzs5z {
        all: unset;
        display: flex;
        justify-content: flex-end;
        gap: .75em;
    }

    button.svelte-2yzs5z {
        appearance: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        border: 0;
        font: inherit;
        color: inherit;
        cursor: pointer;
        padding: .25em .75em;
        border-radius: .5em;
    }

    button.svelte-2yzs5z:active {
        transform: translateY(1px);
    }

    button.svelte-2yzs5z sup:where(.svelte-2yzs5z) {
        margin-left: .25em;
        vertical-align: text-top;
        opacity: .5;
    }

    dialog.mobile.svelte-2yzs5z button:where(.svelte-2yzs5z) sup:where(.svelte-2yzs5z) {
        display: none;
    }

    button[value].svelte-2yzs5z {
        background: blue;
        background: AccentColor;
        color: white;
    }

    .unlock.svelte-2yzs5z {
        font-size: .75em;
        color: GrayText;
    }

    /* animation */
    dialog.svelte-2yzs5z, .svelte-2yzs5z::backdrop {
        transition: 
            display .2s allow-discrete ease-in-out, 
            overlay .2s allow-discrete ease-in-out, 
            opacity .2s ease-in-out,
            transform .2s ease-in-out,
            box-shadow .2s ease-in-out;
        opacity: 0;
    }

    dialog.svelte-2yzs5z {
        transform: translateY(1em);
    }

    [open].svelte-2yzs5z,
    [open].svelte-2yzs5z::backdrop {
        opacity: 1;
        transform: translateY(0);
    }

    @starting-style {
        [open].svelte-2yzs5z,
        [open].svelte-2yzs5z::backdrop {
            opacity: 0;
        }

        [open].svelte-2yzs5z {
            transform: translateY(-1em);
        }
    }

    @supports not selector(::highlight(a)) {
        dialog.svelte-2yzs5z, dialog.svelte-2yzs5z::backdrop {
            animation: svelte-2yzs5z-simple-appear .2s forwards;
        }
        @keyframes svelte-2yzs5z-simple-appear {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    }
`),ce({get store(){return r()},set store(k){r(k),Rt()}})}xr(["mousedown","click","keydown"]);je(qr,{store:{}},[],[],!0);const os=(t,e)=>{const n=t.target.getAttribute("data-highlight");n&&(t.preventDefault(),e(n))};var is=bt('<div class="svelte-1t9y4ki"></div>'),ss=bt('<nav role="presentation" class="svelte-1t9y4ki"></nav>');function Br(t,e){ue(e,!0);let n=Me(e,"store",7);var r=Jo(),o=_n(r);return Se(o,()=>n().nav,s=>{var c=ss();c.__click=[os,Fr],wn(c,77,()=>n().highlights,(h,d)=>J(h)._id,(h,d,p)=>{var _=is();mt(()=>ft(_,"style",`top: var(--highlight-${J(d)._id??""}-top); --color: ${(Ut.get(J(d).color)||J(d).color)??""}`)),mt(()=>ft(_,"data-highlight",J(d)._id)),at(h,_)}),at(s,c)}),at(t,r),bn(t,"svelte-1t9y4ki",`
    nav.svelte-1t9y4ki {
        all: unset;
    }
    
    div.svelte-1t9y4ki {
        position: fixed;
        right: 0;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        cursor: pointer;
        background: transparent;
        z-index: 99999999999999;
    }

    div.svelte-1t9y4ki::before {
        content: '';
        display: block;
        height: 3px;
        border-radius: 3px;
        width: 100%;
        background: var(--color);
    }
`),ce({get store(){return n()},set store(s){n(s),Rt()}})}xr(["click"]);je(Br,{store:{}},[],[],!0);var ls=bt("<!> <!> <!>",1);function as(t,e){ue(e,!0);let n=Me(e,"store",7);en(()=>{Xe(n().highlights)});let r;function o(){Xe(n().highlights),clearTimeout(r),r=setTimeout(()=>Xe(n().highlights),3e3)}en(()=>Wi);var s=ls();gt("load",Te,o,!1),gt("popstate",Te,o,!1);var c=_n(s);Pr(c,{get store(){return n()}});var h=I(I(c,!0));qr(h,{get store(){return n()}});var d=I(I(h,!0));return Br(d,{get store(){return n()}}),at(t,s),ce({get store(){return n()},set store(p){n(p),Rt()}})}customElements.define("rdh-ui",je(as,{store:{}},[],[],!0));function us(t){if(typeof chrome=="object"&&chrome.runtime&&chrome.runtime.onMessage||typeof browser=="object"&&browser.runtime&&browser.runtime.onMessage){const{runtime:e}=typeof browser=="object"?browser:chrome,n=(r,o)=>{o.id==e.id&&typeof r.type=="string"&&t(r)};return e.onMessage.removeListener(n),e.onMessage.addListener(n),r=>e.sendMessage(null,r)}if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.rdh)return window.rdhSend=t,e=>window.webkit.messageHandlers.rdh.postMessage(e);if(typeof window<"u"&&typeof window.process=="object"&&window.process.type==="renderer"||typeof process<"u"&&typeof process.versions=="object"&&process.versions.electron){const{ipcRenderer:e}=require("electron"),n=(r,o)=>t(o);return e.removeListener("RDH",n),e.on("RDH",n),r=>e.sendToHost("RDH",r)}if("ReactNativeWebView"in window)return window.ReactNativeWebViewSendMessage=t,e=>window.ReactNativeWebView.postMessage(JSON.stringify(e));if(window.self!==window.top){const e=({data:n,source:r})=>{r!==window.parent||typeof n!="object"||typeof n.type!="string"||t(n)};return window.removeEventListener("message",e),window.addEventListener("message",e),n=>window.parent.postMessage(n,"*")}throw new Error("unsupported platform")}async function cs(t){let e=!1;const n=new Set,r=us(o=>{if(!e){n.add(o);return}t(o)});await new Promise(o=>{function s(){window.removeEventListener("DOMContentLoaded",s),o()}document.readyState=="loading"?(window.removeEventListener("DOMContentLoaded",s),window.addEventListener("DOMContentLoaded",s,{once:!0})):o()}),e=!0;for(const o of n)t(o),n.delete(o);return r}const Qt=document.createElement("rdh-ui");(async()=>{const t=await cs(n=>{switch(n.type){case"RDH_APPLY":Array.isArray(n.payload)&&(e.highlights=n.payload);break;case"RDH_CONFIG":typeof n.payload.pro=="boolean"&&(e.pro=n.payload.pro),typeof n.payload.nav=="boolean"&&(e.nav=n.payload.nav),typeof n.payload.enabled=="boolean"&&(n.payload.enabled===!0?document.body.contains(Qt)||document.body.appendChild(Qt):document.body.contains(Qt)&&document.body.removeChild(Qt));break;case"RDH_SCROLL":typeof n.payload._id=="string"&&Fr(n.payload._id);break;case"RDH_ADD_SELECTION":const r=Hr();if(!r)return;const o=e.find(r);if(!o)return;e.upsert(o),te();break;case"RDH_NOTE_SELECTION":console.log("not implemented yet");break}}),e=Vi(n=>t({type:"RDH_ADD",payload:n}),n=>t({type:"RDH_UPDATE",payload:n}),({_id:n})=>t({type:"RDH_REMOVE",payload:{_id:n}}));Qt.store=e,t({type:"RDH_READY",payload:{url:location.href}})})();
