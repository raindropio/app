"use strict";var Yr=Object.defineProperty;var Sn=t=>{throw TypeError(t)};var zr=(t,e,n)=>e in t?Yr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ct=(t,e,n)=>zr(t,typeof e!="symbol"?e+"":e,n),Nn=(t,e,n)=>e.has(t)||Sn("Cannot "+n);var Z=(t,e,n)=>(Nn(t,e,"read from private field"),n?n.call(t):e.get(t)),je=(t,e,n)=>e.has(t)?Sn("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),Be=(t,e,n,r)=>(Nn(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n);(function(){var t=window.Document.prototype.createElement,e=window.Document.prototype.createElementNS,n=window.Document.prototype.importNode,r=window.Document.prototype.prepend,o=window.Document.prototype.append,s=window.DocumentFragment.prototype.prepend,c=window.DocumentFragment.prototype.append,p=window.Node.prototype.cloneNode,h=window.Node.prototype.appendChild,d=window.Node.prototype.insertBefore,_=window.Node.prototype.removeChild,b=window.Node.prototype.replaceChild,E=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),g=window.Element.prototype.attachShadow,$=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),S=window.Element.prototype.getAttribute,x=window.Element.prototype.setAttribute,O=window.Element.prototype.removeAttribute,k=window.Element.prototype.toggleAttribute,C=window.Element.prototype.getAttributeNS,L=window.Element.prototype.setAttributeNS,ut=window.Element.prototype.removeAttributeNS,N=window.Element.prototype.insertAdjacentElement,A=window.Element.prototype.insertAdjacentHTML,J=window.Element.prototype.prepend,q=window.Element.prototype.append,M=window.Element.prototype.before,U=window.Element.prototype.after,G=window.Element.prototype.replaceWith,tt=window.Element.prototype.remove,et=window.HTMLElement,rt=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),ht=window.HTMLElement.prototype.insertAdjacentElement,Jt=window.HTMLElement.prototype.insertAdjacentHTML,_n=new Set;"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(i){return _n.add(i)});function gn(i){var l=_n.has(i);return i=/^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(i),!l&&i}var Rr=document.contains?document.contains.bind(document):document.documentElement.contains.bind(document.documentElement);function P(i){var l=i.isConnected;if(l!==void 0)return l;if(Rr(i))return!0;for(;i&&!(i.__CE_isImportDocument||i instanceof Document);)i=i.parentNode||(window.ShadowRoot&&i instanceof ShadowRoot?i.host:void 0);return!(!i||!(i.__CE_isImportDocument||i instanceof Document))}function qe(i){var l=i.children;if(l)return Array.prototype.slice.call(l);for(l=[],i=i.firstChild;i;i=i.nextSibling)i.nodeType===Node.ELEMENT_NODE&&l.push(i);return l}function He(i,l){for(;l&&l!==i&&!l.nextSibling;)l=l.parentNode;return l&&l!==i?l.nextSibling:null}function Fe(i,l,u){for(var v=i;v;){if(v.nodeType===Node.ELEMENT_NODE){var a=v;l(a);var f=a.localName;if(f==="link"&&a.getAttribute("rel")==="import"){if(v=a.import,u===void 0&&(u=new Set),v instanceof Node&&!u.has(v))for(u.add(v),v=v.firstChild;v;v=v.nextSibling)Fe(v,l,u);v=He(i,a);continue}else if(f==="template"){v=He(i,a);continue}if(a=a.__CE_shadowRoot)for(a=a.firstChild;a;a=a.nextSibling)Fe(a,l,u)}v=v.firstChild?v.firstChild:He(i,v)}}function pe(){var i=!(vt==null||!vt.noDocumentConstructionObserver),l=!(vt==null||!vt.shadyDomFastWalk);this.m=[],this.g=[],this.j=!1,this.shadyDomFastWalk=l,this.I=!i}function Gt(i,l,u,v){var a=window.ShadyDOM;if(i.shadyDomFastWalk&&a&&a.inUse){if(l.nodeType===Node.ELEMENT_NODE&&u(l),l.querySelectorAll)for(i=a.nativeMethods.querySelectorAll.call(l,"*"),l=0;l<i.length;l++)u(i[l])}else Fe(l,u,v)}function qr(i,l){i.j=!0,i.m.push(l)}function Hr(i,l){i.j=!0,i.g.push(l)}function Pe(i,l){i.j&&Gt(i,l,function(u){return Ft(i,u)})}function Ft(i,l){if(i.j&&!l.__CE_patched){l.__CE_patched=!0;for(var u=0;u<i.m.length;u++)i.m[u](l);for(u=0;u<i.g.length;u++)i.g[u](l)}}function pt(i,l){var u=[];for(Gt(i,l,function(a){return u.push(a)}),l=0;l<u.length;l++){var v=u[l];v.__CE_state===1?i.connectedCallback(v):ve(i,v)}}function nt(i,l){var u=[];for(Gt(i,l,function(a){return u.push(a)}),l=0;l<u.length;l++){var v=u[l];v.__CE_state===1&&i.disconnectedCallback(v)}}function yt(i,l,u){u=u===void 0?{}:u;var v=u.J,a=u.upgrade||function(m){return ve(i,m)},f=[];for(Gt(i,l,function(m){if(i.j&&Ft(i,m),m.localName==="link"&&m.getAttribute("rel")==="import"){var w=m.import;w instanceof Node&&(w.__CE_isImportDocument=!0,w.__CE_registry=document.__CE_registry),w&&w.readyState==="complete"?w.__CE_documentLoadHandled=!0:m.addEventListener("load",function(){var y=m.import;if(!y.__CE_documentLoadHandled){y.__CE_documentLoadHandled=!0;var T=new Set;v&&(v.forEach(function(H){return T.add(H)}),T.delete(y)),yt(i,y,{J:T,upgrade:a})}})}else f.push(m)},v),l=0;l<f.length;l++)a(f[l])}function ve(i,l){try{var u=l.ownerDocument,v=u.__CE_registry,a=v&&(u.defaultView||u.__CE_isImportDocument)?me(v,l.localName):void 0;if(a&&l.__CE_state===void 0){a.constructionStack.push(l);try{try{if(new a.constructorFunction!==l)throw Error("The custom element constructor did not produce the element being upgraded.")}finally{a.constructionStack.pop()}}catch(y){throw l.__CE_state=2,y}if(l.__CE_state=1,l.__CE_definition=a,a.attributeChangedCallback&&l.hasAttributes()){var f=a.observedAttributes;for(a=0;a<f.length;a++){var m=f[a],w=l.getAttribute(m);w!==null&&i.attributeChangedCallback(l,m,null,w,null)}}P(l)&&i.connectedCallback(l)}}catch(y){Pt(y)}}pe.prototype.connectedCallback=function(i){var l=i.__CE_definition;if(l.connectedCallback)try{l.connectedCallback.call(i)}catch(u){Pt(u)}},pe.prototype.disconnectedCallback=function(i){var l=i.__CE_definition;if(l.disconnectedCallback)try{l.disconnectedCallback.call(i)}catch(u){Pt(u)}},pe.prototype.attributeChangedCallback=function(i,l,u,v,a){var f=i.__CE_definition;if(f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(l))try{f.attributeChangedCallback.call(i,l,u,v,a)}catch(m){Pt(m)}};function wn(i,l,u,v){var a=l.__CE_registry;if(a&&(v===null||v==="http://www.w3.org/1999/xhtml")&&(a=me(a,u)))try{var f=new a.constructorFunction;if(f.__CE_state===void 0||f.__CE_definition===void 0)throw Error("Failed to construct '"+u+"': The returned value was not constructed with the HTMLElement constructor.");if(f.namespaceURI!=="http://www.w3.org/1999/xhtml")throw Error("Failed to construct '"+u+"': The constructed element's namespace must be the HTML namespace.");if(f.hasAttributes())throw Error("Failed to construct '"+u+"': The constructed element must not have any attributes.");if(f.firstChild!==null)throw Error("Failed to construct '"+u+"': The constructed element must not have any children.");if(f.parentNode!==null)throw Error("Failed to construct '"+u+"': The constructed element must not have a parent node.");if(f.ownerDocument!==l)throw Error("Failed to construct '"+u+"': The constructed element's owner document is incorrect.");if(f.localName!==u)throw Error("Failed to construct '"+u+"': The constructed element's local name is incorrect.");return f}catch(m){return Pt(m),l=v===null?t.call(l,u):e.call(l,v,u),Object.setPrototypeOf(l,HTMLUnknownElement.prototype),l.__CE_state=2,l.__CE_definition=void 0,Ft(i,l),l}return l=v===null?t.call(l,u):e.call(l,v,u),Ft(i,l),l}function Pt(i){var l="",u="",v=0,a=0;i instanceof Error?(l=i.message,u=i.sourceURL||i.fileName||"",v=i.line||i.lineNumber||0,a=i.column||i.columnNumber||0):l="Uncaught "+String(i);var f=void 0;ErrorEvent.prototype.initErrorEvent===void 0?f=new ErrorEvent("error",{cancelable:!0,message:l,filename:u,lineno:v,colno:a,error:i}):(f=document.createEvent("ErrorEvent"),f.initErrorEvent("error",!1,!0,l,u,v),f.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0}})}),f.error===void 0&&Object.defineProperty(f,"error",{configurable:!0,enumerable:!0,get:function(){return i}}),window.dispatchEvent(f),f.defaultPrevented||console.error(i)}function bn(){var i=this;this.g=void 0,this.F=new Promise(function(l){i.l=l})}bn.prototype.resolve=function(i){if(this.g)throw Error("Already resolved.");this.g=i,this.l(i)};function yn(i){var l=document;this.l=void 0,this.h=i,this.g=l,yt(this.h,this.g),this.g.readyState==="loading"&&(this.l=new MutationObserver(this.G.bind(this)),this.l.observe(this.g,{childList:!0,subtree:!0}))}function En(i){i.l&&i.l.disconnect()}yn.prototype.G=function(i){var l=this.g.readyState;for(l!=="interactive"&&l!=="complete"||En(this),l=0;l<i.length;l++)for(var u=i[l].addedNodes,v=0;v<u.length;v++)yt(this.h,u[v])};function B(i){this.s=new Map,this.u=new Map,this.C=new Map,this.A=!1,this.B=new Map,this.o=function(l){return l()},this.i=!1,this.v=[],this.h=i,this.D=i.I?new yn(i):void 0}B.prototype.H=function(i,l){var u=this;if(!(l instanceof Function))throw new TypeError("Custom element constructor getters must be functions.");Cn(this,i),this.s.set(i,l),this.v.push(i),this.i||(this.i=!0,this.o(function(){return kn(u)}))},B.prototype.define=function(i,l){var u=this;if(!(l instanceof Function))throw new TypeError("Custom element constructors must be functions.");Cn(this,i),$n(this,i,l),this.v.push(i),this.i||(this.i=!0,this.o(function(){return kn(u)}))};function Cn(i,l){if(!gn(l))throw new SyntaxError("The element name '"+l+"' is not valid.");if(me(i,l))throw Error("A custom element with name '"+(l+"' has already been defined."));if(i.A)throw Error("A custom element is already being defined.")}function $n(i,l,u){i.A=!0;var v;try{var a=u.prototype;if(!(a instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var f=function(H){var It=a[H];if(It!==void 0&&!(It instanceof Function))throw Error("The '"+H+"' callback must be a function.");return It},m=f("connectedCallback"),w=f("disconnectedCallback"),y=f("adoptedCallback"),T=(v=f("attributeChangedCallback"))&&u.observedAttributes||[]}catch(H){throw H}finally{i.A=!1}return u={localName:l,constructorFunction:u,connectedCallback:m,disconnectedCallback:w,adoptedCallback:y,attributeChangedCallback:v,observedAttributes:T,constructionStack:[]},i.u.set(l,u),i.C.set(u.constructorFunction,u),u}B.prototype.upgrade=function(i){yt(this.h,i)};function kn(i){if(i.i!==!1){i.i=!1;for(var l=[],u=i.v,v=new Map,a=0;a<u.length;a++)v.set(u[a],[]);for(yt(i.h,document,{upgrade:function(y){if(y.__CE_state===void 0){var T=y.localName,H=v.get(T);H?H.push(y):i.u.has(T)&&l.push(y)}}}),a=0;a<l.length;a++)ve(i.h,l[a]);for(a=0;a<u.length;a++){for(var f=u[a],m=v.get(f),w=0;w<m.length;w++)ve(i.h,m[w]);(f=i.B.get(f))&&f.resolve(void 0)}u.length=0}}B.prototype.get=function(i){if(i=me(this,i))return i.constructorFunction},B.prototype.whenDefined=function(i){if(!gn(i))return Promise.reject(new SyntaxError("'"+i+"' is not a valid custom element name."));var l=this.B.get(i);if(l)return l.F;l=new bn,this.B.set(i,l);var u=this.u.has(i)||this.s.has(i);return i=this.v.indexOf(i)===-1,u&&i&&l.resolve(void 0),l.F},B.prototype.polyfillWrapFlushCallback=function(i){this.D&&En(this.D);var l=this.o;this.o=function(u){return i(function(){return l(u)})}};function me(i,l){var u=i.u.get(l);if(u)return u;if(u=i.s.get(l)){i.s.delete(l);try{return $n(i,l,u())}catch(v){Pt(v)}}}B.prototype.define=B.prototype.define,B.prototype.upgrade=B.prototype.upgrade,B.prototype.get=B.prototype.get,B.prototype.whenDefined=B.prototype.whenDefined,B.prototype.polyfillDefineLazy=B.prototype.H,B.prototype.polyfillWrapFlushCallback=B.prototype.polyfillWrapFlushCallback;function Ie(i,l,u){function v(a){return function(f){for(var m=[],w=0;w<arguments.length;++w)m[w]=arguments[w];w=[];for(var y=[],T=0;T<m.length;T++){var H=m[T];if(H instanceof Element&&P(H)&&y.push(H),H instanceof DocumentFragment)for(H=H.firstChild;H;H=H.nextSibling)w.push(H);else w.push(H)}for(a.apply(this,m),m=0;m<y.length;m++)nt(i,y[m]);if(P(this))for(m=0;m<w.length;m++)y=w[m],y instanceof Element&&pt(i,y)}}u.prepend!==void 0&&(l.prepend=v(u.prepend)),u.append!==void 0&&(l.append=v(u.append))}function Fr(i){Document.prototype.createElement=function(l){return wn(i,this,l,null)},Document.prototype.importNode=function(l,u){return l=n.call(this,l,!!u),this.__CE_registry?yt(i,l):Pe(i,l),l},Document.prototype.createElementNS=function(l,u){return wn(i,this,u,l)},Ie(i,Document.prototype,{prepend:r,append:o})}function Pr(i){function l(v){return function(a){for(var f=[],m=0;m<arguments.length;++m)f[m]=arguments[m];m=[];for(var w=[],y=0;y<f.length;y++){var T=f[y];if(T instanceof Element&&P(T)&&w.push(T),T instanceof DocumentFragment)for(T=T.firstChild;T;T=T.nextSibling)m.push(T);else m.push(T)}for(v.apply(this,f),f=0;f<w.length;f++)nt(i,w[f]);if(P(this))for(f=0;f<m.length;f++)w=m[f],w instanceof Element&&pt(i,w)}}var u=Element.prototype;M!==void 0&&(u.before=l(M)),U!==void 0&&(u.after=l(U)),G!==void 0&&(u.replaceWith=function(v){for(var a=[],f=0;f<arguments.length;++f)a[f]=arguments[f];f=[];for(var m=[],w=0;w<a.length;w++){var y=a[w];if(y instanceof Element&&P(y)&&m.push(y),y instanceof DocumentFragment)for(y=y.firstChild;y;y=y.nextSibling)f.push(y);else f.push(y)}for(w=P(this),G.apply(this,a),a=0;a<m.length;a++)nt(i,m[a]);if(w)for(nt(i,this),a=0;a<f.length;a++)m=f[a],m instanceof Element&&pt(i,m)}),tt!==void 0&&(u.remove=function(){var v=P(this);tt.call(this),v&&nt(i,this)})}function Ir(i){function l(a,f){Object.defineProperty(a,"innerHTML",{enumerable:f.enumerable,configurable:!0,get:f.get,set:function(m){var w=this,y=void 0;if(P(this)&&(y=[],Gt(i,this,function(It){It!==w&&y.push(It)})),f.set.call(this,m),y)for(var T=0;T<y.length;T++){var H=y[T];H.__CE_state===1&&i.disconnectedCallback(H)}return this.ownerDocument.__CE_registry?yt(i,this):Pe(i,this),m}})}function u(a,f){a.insertAdjacentElement=function(m,w){var y=P(w);return m=f.call(this,m,w),y&&nt(i,w),P(m)&&pt(i,w),m}}function v(a,f){function m(w,y){for(var T=[];w!==y;w=w.nextSibling)T.push(w);for(y=0;y<T.length;y++)yt(i,T[y])}a.insertAdjacentHTML=function(w,y){if(w=w.toLowerCase(),w==="beforebegin"){var T=this.previousSibling;f.call(this,w,y),m(T||this.parentNode.firstChild,this)}else if(w==="afterbegin")T=this.firstChild,f.call(this,w,y),m(this.firstChild,T);else if(w==="beforeend")T=this.lastChild,f.call(this,w,y),m(T||this.firstChild,null);else if(w==="afterend")T=this.nextSibling,f.call(this,w,y),m(this.nextSibling,T);else throw new SyntaxError("The value provided ("+String(w)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.")}}g&&(Element.prototype.attachShadow=function(a){if(a=g.call(this,a),i.j&&!a.__CE_patched){a.__CE_patched=!0;for(var f=0;f<i.m.length;f++)i.m[f](a)}return this.__CE_shadowRoot=a}),$&&$.get?l(Element.prototype,$):rt&&rt.get?l(HTMLElement.prototype,rt):Hr(i,function(a){l(a,{enumerable:!0,configurable:!0,get:function(){return p.call(this,!0).innerHTML},set:function(f){var m=this.localName==="template",w=m?this.content:this,y=e.call(document,this.namespaceURI,this.localName);for(y.innerHTML=f;0<w.childNodes.length;)_.call(w,w.childNodes[0]);for(f=m?y.content:y;0<f.childNodes.length;)h.call(w,f.childNodes[0])}})}),Element.prototype.setAttribute=function(a,f){if(this.__CE_state!==1)return x.call(this,a,f);var m=S.call(this,a);x.call(this,a,f),f=S.call(this,a),i.attributeChangedCallback(this,a,m,f,null)},Element.prototype.setAttributeNS=function(a,f,m){if(this.__CE_state!==1)return L.call(this,a,f,m);var w=C.call(this,a,f);L.call(this,a,f,m),m=C.call(this,a,f),i.attributeChangedCallback(this,f,w,m,a)},Element.prototype.removeAttribute=function(a){if(this.__CE_state!==1)return O.call(this,a);var f=S.call(this,a);O.call(this,a),f!==null&&i.attributeChangedCallback(this,a,f,null,null)},k&&(Element.prototype.toggleAttribute=function(a,f){if(this.__CE_state!==1)return k.call(this,a,f);var m=S.call(this,a),w=m!==null;return f=k.call(this,a,f),w!==f&&i.attributeChangedCallback(this,a,m,f?"":null,null),f}),Element.prototype.removeAttributeNS=function(a,f){if(this.__CE_state!==1)return ut.call(this,a,f);var m=C.call(this,a,f);ut.call(this,a,f);var w=C.call(this,a,f);m!==w&&i.attributeChangedCallback(this,f,m,w,a)},ht?u(HTMLElement.prototype,ht):N&&u(Element.prototype,N),Jt?v(HTMLElement.prototype,Jt):A&&v(Element.prototype,A),Ie(i,Element.prototype,{prepend:J,append:q}),Pr(i)}var xn={};function jr(i){function l(){var u=this.constructor,v=document.__CE_registry.C.get(u);if(!v)throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var a=v.constructionStack;if(a.length===0)return a=t.call(document,v.localName),Object.setPrototypeOf(a,u.prototype),a.__CE_state=1,a.__CE_definition=v,Ft(i,a),a;var f=a.length-1,m=a[f];if(m===xn)throw Error("Failed to construct '"+v.localName+"': This element was already constructed.");return a[f]=xn,Object.setPrototypeOf(m,u.prototype),Ft(i,m),m}l.prototype=et.prototype,Object.defineProperty(HTMLElement.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:l}),window.HTMLElement=l}function Br(i){function l(u,v){Object.defineProperty(u,"textContent",{enumerable:v.enumerable,configurable:!0,get:v.get,set:function(a){if(this.nodeType===Node.TEXT_NODE)v.set.call(this,a);else{var f=void 0;if(this.firstChild){var m=this.childNodes,w=m.length;if(0<w&&P(this)){f=Array(w);for(var y=0;y<w;y++)f[y]=m[y]}}if(v.set.call(this,a),f)for(a=0;a<f.length;a++)nt(i,f[a])}}})}Node.prototype.insertBefore=function(u,v){if(u instanceof DocumentFragment){var a=qe(u);if(u=d.call(this,u,v),P(this))for(v=0;v<a.length;v++)pt(i,a[v]);return u}return a=u instanceof Element&&P(u),v=d.call(this,u,v),a&&nt(i,u),P(this)&&pt(i,u),v},Node.prototype.appendChild=function(u){if(u instanceof DocumentFragment){var v=qe(u);if(u=h.call(this,u),P(this))for(var a=0;a<v.length;a++)pt(i,v[a]);return u}return v=u instanceof Element&&P(u),a=h.call(this,u),v&&nt(i,u),P(this)&&pt(i,u),a},Node.prototype.cloneNode=function(u){return u=p.call(this,!!u),this.ownerDocument.__CE_registry?yt(i,u):Pe(i,u),u},Node.prototype.removeChild=function(u){var v=u instanceof Element&&P(u),a=_.call(this,u);return v&&nt(i,u),a},Node.prototype.replaceChild=function(u,v){if(u instanceof DocumentFragment){var a=qe(u);if(u=b.call(this,u,v),P(this))for(nt(i,v),v=0;v<a.length;v++)pt(i,a[v]);return u}a=u instanceof Element&&P(u);var f=b.call(this,u,v),m=P(this);return m&&nt(i,v),a&&nt(i,u),m&&pt(i,u),f},E&&E.get?l(Node.prototype,E):qr(i,function(u){l(u,{enumerable:!0,configurable:!0,get:function(){for(var v=[],a=this.firstChild;a;a=a.nextSibling)a.nodeType!==Node.COMMENT_NODE&&v.push(a.textContent);return v.join("")},set:function(v){for(;this.firstChild;)_.call(this,this.firstChild);v!=null&&v!==""&&h.call(this,document.createTextNode(v))}})})}var vt=window.customElements;function Tn(){var i=new pe;jr(i),Fr(i),Ie(i,DocumentFragment.prototype,{prepend:s,append:c}),Br(i),Ir(i),window.CustomElementRegistry=B,i=new B(i),document.__CE_registry=i,Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:i})}vt&&!vt.forcePolyfill&&typeof vt.define=="function"&&typeof vt.get=="function"||Tn(),window.__CE_installPolyfill=Tn}).call(self);const re=1,on=2,Vr=4,zn=8,Wr=16,We=64,Ur=2,Xr=1,Kr=2,Jr=4,we="[",Vn="]",Gr="",Wn=`${Vn}!`,Ue={},jt=Symbol(),Zr=["touchstart","touchmove","touchend"];function Qr(t){console.warn("hydration_mismatch")}let V=!1;function $t(t){V=t}let kt=null,xt;function to(t){kt=t,xt=t&&t[0]}function Un(){return xt.previousSibling??xt}function Wt(t){if(t.nodeType!==8)return t;var e=t;if(e.data!==we)return t;for(var n=[],r=0;(e=e.nextSibling)!==null;){if(e.nodeType===8){var o=e.data;if(o===we)r+=1;else if(o[0]===Vn){if(r===0)return kt=n,xt=n[0],e;r-=1}}n.push(e)}throw Qr(),Ue}var Ne=Array.isArray,eo=Array.from,be=Object.keys,Xn=Object.isFrozen,oe=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,no=Object.prototype,ro=Array.prototype,oo=Object.getPrototypeOf;const Mt=2,Kn=4,Ut=8,Jn=16,wt=32,sn=64,At=128,ye=256,dt=512,gt=1024,Rt=2048,qt=4096,Xt=8192,io=16384,ln=32768,Gn=1<<18,X=Symbol("$state"),so=Symbol("$state.frozen"),lo=Symbol("");function Zn(t){return t===this.v}function ao(t,e){return t!=t?e==e:t!==e||t!==null&&typeof t=="object"||typeof t=="function"}function uo(t){return!ao(t,this.v)}function co(t){throw new Error("effect_in_teardown")}function fo(){throw new Error("effect_in_unowned_derived")}function ho(t){throw new Error("effect_orphan")}function po(){throw new Error("effect_update_depth_exceeded")}function vo(){throw new Error("hydration_failed")}function mo(t){throw new Error("props_invalid_value")}function _o(){throw new Error("state_unsafe_mutation")}function Q(t){return{f:0,v:t,reactions:null,equals:Zn,version:0}}function Ee(t){var n;const e=Q(t);return e.equals=uo,W!==null&&W.l!==null&&((n=W.l).s??(n.s=[])).push(e),e}function I(t,e){var n=t.v!==jt;return n&&j!==null&&Ge()&&j.f&Mt&&_o(),t.equals(e)||(t.v=e,t.version=ir(),cn(t,gt,!0),Ge()&&n&&R!==null&&R.f&dt&&!(R.f&wt)&&(z!==null&&z.includes(t)?(at(R,gt),Le(R)):St===null?xo([t]):St.push(t))),e}function it(t,e=!0,n=null,r){if(typeof t=="object"&&t!=null&&!Xn(t)&&!(so in t)){if(X in t){const s=t[X];if(s.t===t||s.p===t)return s.p}const o=oo(t);if(o===no||o===ro){const s=new Proxy(t,go);return oe(t,X,{value:{s:new Map,v:Q(0),a:Ne(t),i:e,p:s,t},writable:!0,enumerable:!1}),s}}return t}function An(t,e=1){I(t,t.v+e)}const go={defineProperty(t,e,n){if(n.value){const r=t[X],o=r.s.get(e);o!==void 0&&I(o,it(n.value,r.i,r))}return Reflect.defineProperty(t,e,n)},deleteProperty(t,e){const n=t[X],r=n.s.get(e),o=n.a,s=delete t[e];if(o&&s){const c=n.s.get("length"),p=t.length-1;c!==void 0&&c.v!==p&&I(c,p)}return r!==void 0&&I(r,jt),s&&An(n.v),s},get(t,e,n){var s;if(e===X)return Reflect.get(t,X);const r=t[X];let o=r.s.get(e);if(o===void 0&&(!(e in t)||(s=Xe(t,e))!=null&&s.writable)&&(o=(r.i?Q:Ee)(it(t[e],r.i,r)),r.s.set(e,o)),o!==void 0){const c=D(o);return c===jt?void 0:c}return Reflect.get(t,e,n)},getOwnPropertyDescriptor(t,e){const n=Reflect.getOwnPropertyDescriptor(t,e);if(n&&"value"in n){const o=t[X].s.get(e);o&&(n.value=D(o))}return n},has(t,e){var s;if(e===X)return!0;const n=t[X],r=Reflect.has(t,e);let o=n.s.get(e);return(o!==void 0||R!==null&&(!r||(s=Xe(t,e))!=null&&s.writable))&&(o===void 0&&(o=(n.i?Q:Ee)(r?it(t[e],n.i,n):jt),n.s.set(e,o)),D(o)===jt)?!1:r},set(t,e,n,r){const o=t[X];let s=o.s.get(e);s===void 0&&(fr(()=>r[e]),s=o.s.get(e)),s!==void 0&&I(s,it(n,o.i,o));const c=o.a,p=!(e in t);if(c&&e==="length")for(let h=n;h<t.length;h+=1){const d=o.s.get(h+"");d!==void 0&&I(d,jt)}if(t[e]=n,p){if(c){const h=o.s.get("length"),d=t.length;h!==void 0&&h.v!==d&&I(h,d)}An(o.v)}return!0},ownKeys(t){const e=t[X];return D(e.v),Reflect.ownKeys(t)}};function Ce(t){if(t!==null&&typeof t=="object"&&X in t){var e=t[X];if(e)return e.p}return t}function wo(t,e){return Object.is(Ce(t),Ce(e))}function Qn(t){for(var e=0;e<t.length;e++)t[e]()}const bo=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let $e=!1,ke=!1,Ke=[],Je=[];function tr(){$e=!1;const t=Ke.slice();Ke=[],Qn(t)}function er(){ke=!1;const t=Je.slice();Je=[],Qn(t)}function le(t){$e||($e=!0,queueMicrotask(tr)),Ke.push(t)}function yo(t){ke||(ke=!0,bo(er)),Je.push(t)}function Eo(){$e&&tr(),ke&&er()}function Co(t){let e=Mt|gt;R===null&&(e|=At);const n={deps:null,deriveds:null,equals:Zn,f:e,first:null,fn:t,last:null,reactions:null,v:null,version:0};if(j!==null&&j.f&Mt){var r=j;r.deriveds===null?r.deriveds=[n]:r.deriveds.push(n)}return n}function nr(t){un(t);var e=t.deriveds;if(e!==null){t.deriveds=null;for(var n=0;n<e.length;n+=1)$o(e[n])}}function rr(t){nr(t);var e=sr(t),n=(Bt||t.f&At)&&t.deps!==null?Rt:dt;at(t,n),t.equals(e)||(t.v=e,t.version=ir(),cn(t,gt,!1))}function $o(t){nr(t),Ae(t,0),at(t,Xt),t.first=t.last=t.deps=t.reactions=t.fn=null}const or=0,ko=1;let _e=or,ie=!1,Yt=!1,an=!1;function Dn(t){Yt=t}function Ln(t){an=t}let Lt=[],zt=0,j=null;function On(t){j=t}let R=null,z=null,Y=0,St=null;function xo(t){St=t}let To=0,Bt=!1,W=null;function ir(){return To++}function Ge(){return W!==null&&W.l===null}function ae(t){var b;var e=t.f,n=(e&gt)!==0;if(n)return!0;var r=(e&At)!==0,o=(e&ye)!==0;if(e&Rt){var s=t.deps;if(s!==null)for(var c=s.length,p,h=0;h<c;h++){var d=s[h];!n&&ae(d)&&rr(d);var _=d.version;if(r){if(_>t.version)return!0;!Bt&&!((b=d==null?void 0:d.reactions)!=null&&b.includes(t))&&(d.reactions??(d.reactions=[])).push(t)}else{if(t.f&gt)return!0;o&&(_>t.version&&(n=!0),p=d.reactions,p===null?d.reactions=[t]:p.includes(t)||p.push(t))}}r||at(t,dt),o&&(t.f^=ye)}return n}function So(t,e,n){throw t}function sr(t){const e=z,n=Y,r=St,o=j,s=Bt;z=null,Y=0,St=null,j=t.f&(wt|sn)?null:t,Bt=!Yt&&(t.f&At)!==0;try{let c=(0,t.fn)(),p=t.deps;if(z!==null){let h;if(p!==null){const d=p.length,_=Y===0?z:p.slice(0,Y).concat(z),E=_.length>16&&d-Y>1?new Set(_):null;for(h=Y;h<d;h++){const g=p[h];(E!==null?!E.has(g):!_.includes(g))&&lr(t,g)}}if(p!==null&&Y>0)for(p.length=Y+z.length,h=0;h<z.length;h++)p[Y+h]=z[h];else t.deps=p=z;if(!Bt)for(h=Y;h<p.length;h++){const d=p[h],_=d.reactions;_===null?d.reactions=[t]:_[_.length-1]!==t&&!_.includes(t)&&_.push(t)}}else p!==null&&Y<p.length&&(Ae(t,Y),p.length=Y);return c}finally{z=e,Y=n,St=r,j=o,Bt=s}}function lr(t,e){const n=e.reactions;let r=0;if(n!==null){r=n.length-1;const o=n.indexOf(t);o!==-1&&(r===0?e.reactions=null:(n[o]=n[r],n.pop()))}r===0&&e.f&Mt&&(at(e,Rt),e.f&(At|ye)||(e.f^=ye),Ae(e,0))}function Ae(t,e){const n=t.deps;if(n!==null){const r=e===0?null:n.slice(0,e);let o;for(o=e;o<n.length;o++){const s=n[o];(r===null||!r.includes(s))&&lr(t,s)}}}function un(t,e=!0){let n=t.first;t.first=null,t.last=null;for(var r;n!==null;)r=n.next,de(n,e),n=r}function De(t){var e=t.f;if(!(e&Xt)){at(t,dt);var n=t.ctx,r=R,o=W;R=t,W=n;try{e&Jn||un(t),vr(t);var s=sr(t);t.teardown=typeof s=="function"?s:null}catch(c){So(c)}finally{R=r,W=o}}}function ar(){zt>1e3&&(zt=0,po()),zt++}function ur(t){var e=t.length;if(e!==0){ar();var n=Yt;Yt=!0;try{for(var r=0;r<e;r++){var o=t[r];if(o.first===null&&!(o.f&wt))Mn([o]);else{var s=[];cr(o,s),Mn(s)}}}finally{Yt=n}}}function Mn(t){var e=t.length;if(e!==0)for(var n=0;n<e;n++){var r=t[n];!(r.f&(Xt|qt))&&ae(r)&&(De(r),r.deps===null&&r.first===null&&r.nodes===null&&(r.teardown===null?mr(r):r.fn=null))}}function No(){if(ie=!1,zt>1001)return;const t=Lt;Lt=[],ur(t),ie||(zt=0)}function Le(t){_e===or&&(ie||(ie=!0,queueMicrotask(No)));for(var e=t;e.parent!==null;){e=e.parent;var n=e.f;if(n&wt){if(!(n&dt))return;at(e,Rt)}}Lt.push(e)}function cr(t,e){var n=t.first,r=[];t:for(;n!==null;){var o=n.f,s=(o&(Xt|qt))===0,c=o&wt,p=(o&dt)!==0,h=n.first;if(s&&(!c||!p)){if(c&&at(n,dt),o&Ut){if(!c&&ae(n)&&(De(n),h=n.first),h!==null){n=h;continue}}else if(o&Kn)if(c||p){if(h!==null){n=h;continue}}else r.push(n)}var d=n.next;if(d===null){let E=n.parent;for(;E!==null;){if(t===E)break t;var _=E.next;if(_!==null){n=_;continue t}E=E.parent}}n=d}for(var b=0;b<r.length;b++)h=r[b],e.push(h),cr(h,e)}function Ht(t,e=!0){var n=_e,r=Lt;try{ar();const s=[];_e=ko,Lt=s,ie=!1,e&&ur(r);var o=t==null?void 0:t();return Eo(),(Lt.length>0||s.length>0)&&Ht(),zt=0,o}finally{_e=n,Lt=r}}function D(t){const e=t.f;if(e&Xt)return t.v;if(j!==null){const n=(j.f&At)!==0,r=j.deps;z===null&&r!==null&&r[Y]===t&&!(n&&R!==null)?Y++:(r===null||Y===0||r[Y-1]!==t)&&(z===null?z=[t]:z[z.length-1]!==t&&z.push(t)),St!==null&&R!==null&&R.f&dt&&!(R.f&wt)&&St.includes(t)&&(at(R,gt),Le(R))}return e&Mt&&ae(t)&&rr(t),t.v}function cn(t,e,n){var r=t.reactions;if(r!==null)for(var o=Ge(),s=r.length,c=0;c<s;c++){var p=r[c],h=p.f;if(!(h&gt||(!n||!o)&&p===R)){at(p,e);var d=(h&Rt)!==0,_=(h&At)!==0;(h&dt||d&&_)&&(p.f&Mt?cn(p,Rt,n):Le(p))}}}function fr(t){const e=j;try{return j=null,t()}finally{j=e}}const Ao=~(gt|Rt|dt);function at(t,e){t.f=t.f&Ao|e}function Do(t){return typeof t=="object"&&t!==null&&typeof t.f=="number"}function ue(t,e=!1,n){W={p:W,c:null,e:null,m:!1,s:t,x:null,l:null},e||(W.l={s:null,u:null,r1:[],r2:Q(!1)})}function ce(t){const e=W;if(e!==null){t!==void 0&&(e.x=t);const r=e.e;if(r!==null){e.e=null;for(var n=0;n<r.length;n++)fn(r[n])}W=e.p,e.m=!0}return t||{}}function K(t){return Do(t)?D(t):t}function Lo(t){R===null&&j===null&&ho(),j!==null&&j.f&At&&fo(),an&&co()}function Rn(t,e){var n=e.last;n===null?e.last=e.first=t:(n.next=t,t.prev=n,e.last=t)}function Kt(t,e,n,r=!0){var o=(t&sn)!==0,s={ctx:W,deps:null,nodes:null,f:t|gt,first:null,fn:e,last:null,next:null,parent:o?null:R,prev:null,teardown:null,transitions:null};if(n){var c=Yt;try{Dn(!0),De(s),s.f|=io}finally{Dn(c)}}else e!==null&&Le(s);var p=n&&s.deps===null&&s.first===null&&s.nodes===null&&s.teardown===null;return!p&&!o&&r&&(R!==null&&Rn(s,R),j!==null&&j.f&Mt&&Rn(s,j)),s}function dr(t){const e=Kt(Ut,null,!1);return at(e,dt),e.teardown=t,e}function Ze(t){Lo();var e=R!==null&&(R.f&Ut)!==0&&W!==null&&!W.m;if(e){var n=W;(n.e??(n.e=[])).push(t)}else{var r=fn(t);return r}}function hr(t){const e=Kt(sn,t,!0);return()=>{de(e)}}function fn(t){return Kt(Kn,t,!1)}function fe(t){return Kt(Ut,t,!0)}function _t(t){return fe(t)}function pr(t,e,n){const r=Kt(Ut|Jn|e,n,!0);return t!==null&&(r.nodes={start:null,anchor:null,end:t}),r}function se(t,e=!0){return Kt(Ut|wt,t,!0,e)}function vr(t){var e=t.teardown;if(e!==null){const n=an,r=j;Ln(!0),On(null);try{e.call(null)}finally{Ln(n),On(r)}}}function de(t,e=!0){var n=!1;if((e||t.f&Gn)&&t.nodes!==null){for(var r=Vt(t),o=t.nodes.end;r!==null;){var s=r===o?null:r.nextSibling;r.remove(),r=s}n=!0}if(un(t,e&&!n),Ae(t,0),at(t,Xt),t.transitions)for(const p of t.transitions)p.stop();vr(t);var c=t.parent;c!==null&&t.f&wt&&c.first!==null&&mr(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.parent=t.fn=t.nodes=null}function Vt(t){var e=t.nodes,n=e.start;if(n===void 0)return e.anchor;if(n!==null)return n;for(var r=t.first;r&&(r.nodes===null||r.f&Gn);)r=r.next;return r!==null&&r.nodes!==null?Vt(r):e.end}function mr(t){var e=t.parent,n=t.prev,r=t.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),e!==null&&(e.first===t&&(e.first=r),e.last===t&&(e.last=n))}function Qe(t,e){var n=[];dn(t,n,!0),_r(n,()=>{de(t),e&&e()})}function _r(t,e){var n=t.length;if(n>0){var r=()=>--n||e();for(var o of t)o.out(r)}else e()}function dn(t,e,n){if(!(t.f&qt)){if(t.f^=qt,t.transitions!==null)for(const c of t.transitions)(c.is_global||n)&&e.push(c);for(var r=t.first;r!==null;){var o=r.next,s=(r.f&ln)!==0||(r.f&wt)!==0;dn(r,e,s?n:!1),r=o}}}function xe(t){gr(t,!0)}function gr(t,e){if(t.f&qt){t.f^=qt,ae(t)&&De(t);for(var n=t.first;n!==null;){var r=n.next,o=(n.f&ln)!==0||(n.f&wt)!==0;gr(n,o?e:!1),n=r}if(t.transitions!==null)for(const s of t.transitions)(s.is_global||e)&&s.in()}}var Te,Dt;function wr(){if(Te===void 0){Te=window,Dt=document;var t=Element.prototype;t.__click=void 0,t.__className="",t.__attributes=null,t.__e=void 0,Text.prototype.__t=void 0}}function he(){return document.createTextNode("")}function st(t){const e=t.firstChild;return V?e===null?t.appendChild(he()):Wt(e):e}function hn(t,e){return V?Wt(xt):t.firstChild}function F(t,e=!1){var n=t.nextSibling;if(!V)return n;var r=n.nodeType;if(r===8&&n.data===Gr)return F(n,e);if(e&&r!==3){var o=he();return n==null||n.before(o),o}return Wt(n)}function pn(t){t.textContent=""}function Oo(t){return document.createElement(t)}function Mo(t,e,n,r){function o(s){if(r.capture||Qt.call(e,s),!s.cancelBubble)return n.call(this,s)}return t.startsWith("pointer")||t==="wheel"?le(()=>{e.addEventListener(t,o,r)}):e.addEventListener(t,o,r),o}function mt(t,e,n,r,o){var s={capture:r,passive:o},c=Mo(t,e,n,s);(e===document.body||e===window||e===document)&&dr(()=>{e.removeEventListener(t,c,s)})}function br(t){for(var e=0;e<t.length;e++)yr.add(t[e]);for(var n of tn)n(t)}function Qt(t){var x;var e=this,n=e.ownerDocument,r=t.type,o=((x=t.composedPath)==null?void 0:x.call(t))||[],s=o[0]||t.target,c=0,p=t.__root;if(p){var h=o.indexOf(p);if(h!==-1&&(e===document||e===window)){t.__root=e;return}var d=o.indexOf(e);if(d===-1)return;h<=d&&(c=h)}if(s=o[c]||t.target,s!==e){oe(t,"currentTarget",{configurable:!0,get(){return s||n}});try{for(var _,b=[];s!==null;){var E=s.parentNode||s.host||null;try{var g=s["__"+r];if(g!==void 0&&!s.disabled)if(Ne(g)){var[$,...S]=g;$.apply(s,[t,...S])}else g.call(s,t)}catch(O){_?b.push(O):_=O}if(t.cancelBubble||E===e||E===null)break;s=E}if(_){for(let O of b)queueMicrotask(()=>{throw O});throw _}}finally{t.__root=e,s=e}}}const yr=new Set,tn=new Set;function Ye(t,e){(t.__t??(t.__t=t.nodeValue))!==e&&(t.nodeValue=t.__t=e)}function Er(t,e){const n=e.anchor??e.target.appendChild(he());return Ht(()=>Cr(t,{...e,anchor:n}),!1)}function Ro(t,e){const n=e.target,r=kt;try{return Ht(()=>{$t(!0);for(var o=n.firstChild;o&&(o.nodeType!==8||o.data!==we);)o=o.nextSibling;if(!o)throw Ue;const s=Wt(o),c=Cr(t,{...e,anchor:s});return $t(!1),c},!1)}catch(o){if(o===Ue)return e.recover===!1&&vo(),wr(),pn(n),$t(!1),Er(t,e);throw o}finally{$t(!!r),to(r)}}function Cr(t,{target:e,anchor:n,props:r={},events:o,context:s,intro:c=!1}){wr();const p=new Set,h=b=>{for(let E=0;E<b.length;E++){const g=b[E],$=Zr.includes(g);p.has(g)||(p.add(g),e.addEventListener(g,Qt,{passive:$}),document.addEventListener(g,Qt,{passive:$}))}};h(eo(yr)),tn.add(h);let d;const _=hr(()=>(se(()=>{if(s){ue({});var b=W;b.c=s}o&&(r.$$events=o),d=t(n,r)||{},s&&ce()}),()=>{for(const b of p)e.removeEventListener(b,Qt),document.removeEventListener(b,Qt);tn.delete(h),en.delete(d)}));return en.set(d,_),d}let en=new WeakMap;function qo(t){const e=en.get(t);e==null||e()}async function vn(t,e,n){await Promise.resolve();const r=Ho(t);if(!r.getElementById(e)){const o=Oo("style");o.id=e,o.textContent=n,(r.head||r).appendChild(o)}}function Ho(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Fo(t){var e=document.createElement("template");return e.innerHTML=t,e.content}function $r(t){if(Ne(t))for(var e=0;e<t.length;e++){var n=t[e];n.isConnected&&n.remove()}else t.isConnected&&t.remove()}function Se(t,e,n,r=null,o=!1){var s=null,c=null,p=null,h=o?ln:0;pr(t,h,()=>{if(p===(p=!!e()))return;let d=!1;if(V){const _=t.data===Wn;p===_&&($r(kt),$t(!1),d=!0)}p?(s?xe(s):s=se(()=>n(t)),c&&Qe(c,()=>{c=null})):(c?xe(c):r&&(c=se(()=>r(t))),s&&Qe(s,()=>{s=null})),d&&$t(!0)})}let ze=null;function Po(t,e){return e}function Io(t,e,n,r){for(var o=[],s=e.length,c=0;c<s;c++)dn(e[c].e,o,!0);var p=s>0&&o.length===0&&n!==null;if(p){var h=n.parentNode;pn(h),h.append(n),r.clear(),Tt(t,e[0].prev,e[s-1].next)}_r(o,()=>{for(var d=0;d<s;d++){var _=e[d];p||(r.delete(_.k),Tt(t,_.prev,_.next)),de(_.e,!p)}})}function mn(t,e,n,r,o,s=null){var c={flags:e,items:new Map,first:null},p=(e&zn)!==0;if(p){var h=t;t=V?Wt(h.firstChild):h.appendChild(he())}var d=null;pr(t,0,()=>{var _=n(),b=Ne(_)?_:_==null?[]:Array.from(_),E=b.length,g=c.flags;g&We&&!Xn(b)&&!(X in b)&&(g^=We,g&Vr&&!(g&re)&&(g^=re));let $=!1;if(V){var S=t.data===Wn;(S!==(E===0)||xt===void 0)&&($r(kt),$t(!1),$=!0)}if(V){for(var x=xt,O=null,k,C=0;C<E;C++){if(x.nodeType!==8||x.data!==we){$=!0,$t(!1);break}x=Wt(x);var L=b[C],ut=r(L,C);k=kr(x,c,O,null,L,ut,C,o,g),c.items.set(ut,k),x=x.nextSibling,O=k}if(E>0)for(;x!==t;){var N=x.nextSibling;x.remove(),x=N}}V||jo(b,c,t,o,g,r),s!==null&&(E===0?d?xe(d):d=se(()=>s(t)):d!==null&&Qe(d,()=>{d=null})),$&&$t(!0)})}function jo(t,e,n,r,o,s){var tt,et,rt,ht;var c=(o&Wr)!==0,p=(o&(re|on))!==0,h=t.length,d=e.items,_=e.first,b=_,E=new Set,g=null,$=new Set,S=[],x=[],O,k,C,L;if(c)for(L=0;L<h;L+=1)O=t[L],k=s(O,L),C=d.get(k),C!==void 0&&((tt=C.a)==null||tt.measure(),$.add(C));for(L=0;L<h;L+=1){if(O=t[L],k=s(O,L),C=d.get(k),C===void 0){var ut=b?Vt(b.e):n;g=kr(ut,e,g,g===null?e.first:g.next,O,k,L,r,o),d.set(k,g),S=[],x=[],b=g.next;continue}if(p&&Bo(C,O,L,o),C.e.f&qt&&(xe(C.e),c&&((et=C.a)==null||et.unfix(),$.delete(C))),C!==b){if(E.has(C)){if(S.length<x.length){var N=x[0],A;g=N.prev;var J=S[0],q=S[S.length-1];for(A=0;A<S.length;A+=1)qn(S[A],N,n);for(A=0;A<x.length;A+=1)E.delete(x[A]);Tt(e,J.prev,q.next),Tt(e,g,J),Tt(e,q,N),b=N,g=q,L-=1,S=[],x=[]}else E.delete(C),qn(C,b,n),Tt(e,C.prev,C.next),Tt(e,C,g===null?e.first:g.next),Tt(e,g,C),g=C;continue}for(S=[],x=[];b!==null&&b.k!==k;)E.add(b),x.push(b),b=b.next;if(b===null)continue;C=b}S.push(C),g=C,b=C.next}const M=Array.from(E);for(;b!==null;)M.push(b),b=b.next;var U=M.length;if(U>0){var G=o&zn&&h===0?n:null;if(c){for(L=0;L<U;L+=1)(rt=M[L].a)==null||rt.measure();for(L=0;L<U;L+=1)(ht=M[L].a)==null||ht.fix()}Io(e,M,G,d)}c&&le(()=>{var Jt;for(C of $)(Jt=C.a)==null||Jt.apply()}),R.first=e.first&&e.first.e,R.last=g&&g.e}function Bo(t,e,n,r){r&re&&I(t.v,e),r&on?I(t.i,n):t.i=n}function kr(t,e,n,r,o,s,c,p,h){var d=ze;try{var _=(h&re)!==0,b=(h&We)===0,E=_?b?Ee(o):Q(o):o,g=h&on?Q(c):c,$={i:g,v:E,k:s,a:null,e:null,prev:n,next:r};return ze=$,$.e=se(()=>p(t,E,g),V),$.e.prev=n&&n.e,$.e.next=r&&r.e,n===null?e.first=$:(n.next=$,n.e.next=$.e),r!==null&&(r.prev=$,r.e.prev=$.e),$}finally{ze=d}}function qn(t,e,n){for(var r=t.next?Vt(t.next.e):n,o=e?Vt(e.e):n,s=Vt(t.e);s!==r;){var c=s.nextSibling;o.before(s),s=c}}function Tt(t,e,n){e===null?t.first=n:(e.next=n,e.e.next=n&&n.e),n!==null&&(n.prev=e,n.e.prev=e&&e.e)}function ee(t,e,n=null){const r=R;r.nodes===null?r.nodes={start:t,anchor:n,end:e}:r.nodes.start===void 0&&(r.nodes.start=t)}function bt(t,e){var n=(e&Xr)!==0,r=(e&Kr)!==0,o,s=!t.startsWith("<!>"),c=(e&Jr)!==0;return()=>{if(V)return ee(Un(),kt[kt.length-1]),xt;o||(o=Fo(t),n||(o=o.firstChild));var p=r?document.importNode(o,!0):o.cloneNode(!0);if(n){var h=p.firstChild,d=s?h:c?void 0:null,_=p.lastChild;ee(d,_,h)}else ee(p,p);return p}}function Yo(t=!1){if(V)return ee(Un(),kt[kt.length-1]),xt;var e=document.createDocumentFragment(),n=he();return e.append(n),ee(t?void 0:null,n,n),e}function lt(t,e){V||t.before(e)}function zo(t,e){{const n=document.body;t.autofocus=!0,le(()=>{document.activeElement===n&&t.focus()})}}function Vo(t){V&&t.firstChild!==null&&pn(t)}let Hn=!1;function xr(){Hn||(Hn=!0,document.addEventListener("reset",t=>{Promise.resolve().then(()=>{var e;if(!t.defaultPrevented)for(const n of t.target.elements)(e=n.__on_r)==null||e.call(n)})},{capture:!0}))}function Wo(t){if(V){var e=!1,n=()=>{if(!e){if(e=!0,t.hasAttribute("value")){var r=t.value;ft(t,"value",null),t.value=r}if(t.hasAttribute("checked")){var o=t.checked;ft(t,"checked",null),t.checked=o}}};t.__on_r=n,yo(n),xr()}}function Uo(t,e){var n=t.__attributes??(t.__attributes={});n.value!==(n.value=e)&&(t.value=e)}function ft(t,e,n){n=n==null?null:n+"";var r=t.__attributes??(t.__attributes={});V&&(r[e]=t.getAttribute(e),e==="src"||e==="href"||e==="srcset")||r[e]!==(r[e]=n)&&(e==="loading"&&(t[lo]=n),n===null?t.removeAttribute(e):t.setAttribute(e,n))}function ne(t,e,n){n?t.classList.add(e):t.classList.remove(e)}function Tr(t,e,n,r=n){t.addEventListener(e,n);const o=t.__on_r;o?t.__on_r=()=>{o(),r()}:t.__on_r=r,xr()}function Xo(t,e,n){Tr(t,"input",()=>{n(Pn(t)?In(t.value):t.value)}),fe(()=>{var r=e();if(V&&t.defaultValue!==t.value){n(t.value);return}Pn(t)&&r===In(t.value)||t.type==="date"&&!r&&!t.value||(t.value=r??"")})}function Ko(t,e,n,r,o){var s=n.getAttribute("type")==="checkbox",c=t;let p=!1;if(e!==null)for(var h of e){var d=c;c=d[h],c===void 0&&(c=d[h]=[])}c.push(n),Tr(n,"change",()=>{var _=n.__value;s&&(_=Fn(c,_,n.checked)),o(_)},()=>o(s?[]:null)),fe(()=>{var _=r();if(V&&n.defaultChecked!==n.checked){p=!0;return}s?(_=_||[],n.checked=Ce(_).includes(Ce(n.__value))):n.checked=wo(n.__value,_)}),dr(()=>{var _=c.indexOf(n);_!==-1&&c.splice(_,1)}),le(()=>{if(c.sort((E,g)=>E.compareDocumentPosition(g)===4?-1:1),p){var _;if(s)_=Fn(c,_,n.checked);else{var b=c.find(E=>E.checked);_=b==null?void 0:b.__value}o(_)}})}function Fn(t,e,n){for(var r=new Set,o=0;o<t.length;o+=1)t[o].checked&&r.add(t[o].__value);return n||r.delete(e),Array.from(r)}function Pn(t){var e=t.type;return e==="number"||e==="range"}function In(t){return t===""?null:+t}function jn(t,e){var r;var n=t&&((r=t[X])==null?void 0:r.t);return t===e||n===e}function nn(t,e,n,r){fn(()=>{var o,s;return fe(()=>{o=s,s=[],fr(()=>{t!==n(...s)&&(e(t,...s),o&&jn(n(...o),t)&&e(null,...o))})}),()=>{le(()=>{s&&jn(n(...s),t)&&e(null,...s)})}})}function Oe(t,e,n,r){var $;var o=(n&Ur)!==0,s=t[e],c=($=Xe(t,e))==null?void 0:$.set,p=r,h=()=>p;s===void 0&&r!==void 0&&(c&&o&&mo(),s=h(),c&&c(s));var d;if(d=()=>{var S=t[e];return S===void 0?h():S},c){var _=t.$$legacy;return function(S,x){return arguments.length>0?((!x||_)&&c(x?d():S),S):d()}}var b=!1,E=Ee(s),g=Co(()=>{var S=d(),x=D(E);return b?(b=!1,x):E.v=S});return function(S,x){var O=D(g);if(arguments.length>0){const k=x?D(g):S;return g.equals(k)||(b=!0,I(E,k),D(g)),S}return O}}function Jo(t){return new Go(t)}var Et,ot;class Go{constructor(e){je(this,Et);je(this,ot);const n=it({...e.props||{},$$events:{}},!1);Be(this,ot,(e.hydrate?Ro:Er)(e.component,{target:e.target,props:n,context:e.context,intro:e.intro,recover:e.recover})),Be(this,Et,n.$$events);for(const r of Object.keys(Z(this,ot)))r==="$set"||r==="$destroy"||r==="$on"||oe(this,r,{get(){return Z(this,ot)[r]},set(o){Z(this,ot)[r]=o},enumerable:!0});Z(this,ot).$set=r=>{Object.assign(n,r)},Z(this,ot).$destroy=()=>{qo(Z(this,ot))}}$set(e){Z(this,ot).$set(e)}$on(e,n){Z(this,Et)[e]=Z(this,Et)[e]||[];const r=(...o)=>n.call(this,...o);return Z(this,Et)[e].push(r),()=>{Z(this,Et)[e]=Z(this,Et)[e].filter(o=>o!==r)}}$destroy(){Z(this,ot).$destroy()}}Et=new WeakMap,ot=new WeakMap;let Sr;typeof HTMLElement=="function"&&(Sr=class extends HTMLElement{constructor(e,n,r){super();ct(this,"$$ctor");ct(this,"$$s");ct(this,"$$c");ct(this,"$$cn",!1);ct(this,"$$d",{});ct(this,"$$r",!1);ct(this,"$$p_d",{});ct(this,"$$l",{});ct(this,"$$l_u",new Map);ct(this,"$$me");this.$$ctor=e,this.$$s=n,r&&this.attachShadow({mode:"open"})}addEventListener(e,n,r){if(this.$$l[e]=this.$$l[e]||[],this.$$l[e].push(n),this.$$c){const o=this.$$c.$on(e,n);this.$$l_u.set(n,o)}super.addEventListener(e,n,r)}removeEventListener(e,n,r){if(super.removeEventListener(e,n,r),this.$$c){const o=this.$$l_u.get(n);o&&(o(),this.$$l_u.delete(n))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){let e=function(o){return s=>{const c=document.createElement("slot");o!=="default"&&(c.name=o),lt(s,c)}};if(await Promise.resolve(),!this.$$cn||this.$$c)return;const n={},r=Zo(this);for(const o of this.$$s)o in r&&(o==="default"&&!this.$$d.children?(this.$$d.children=e(o),n.default=!0):n[o]=e(o));for(const o of this.attributes){const s=this.$$g_p(o.name);s in this.$$d||(this.$$d[s]=ge(s,o.value,this.$$p_d,"toProp"))}for(const o in this.$$p_d)!(o in this.$$d)&&this[o]!==void 0&&(this.$$d[o]=this[o],delete this[o]);this.$$c=Jo({component:this.$$ctor,target:this.shadowRoot||this,props:{...this.$$d,$$slots:n,$$host:this}}),this.$$me=fe(()=>{var o;this.$$r=!0;for(const s of be(this.$$c)){if(!((o=this.$$p_d[s])!=null&&o.reflect))continue;this.$$d[s]=this.$$c[s];const c=ge(s,this.$$d[s],this.$$p_d,"toAttribute");c==null?this.removeAttribute(this.$$p_d[s].attribute||s):this.setAttribute(this.$$p_d[s].attribute||s,c)}this.$$r=!1});for(const o in this.$$l)for(const s of this.$$l[o]){const c=this.$$c.$on(o,s);this.$$l_u.set(s,c)}this.$$l={}}}attributeChangedCallback(e,n,r){var o;this.$$r||(e=this.$$g_p(e),this.$$d[e]=ge(e,r,this.$$p_d,"toProp"),(o=this.$$c)==null||o.$set({[e]:this.$$d[e]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then(()=>{!this.$$cn&&this.$$c&&(this.$$c.$destroy(),de(this.$$me),this.$$c=void 0)})}$$g_p(e){return be(this.$$p_d).find(n=>this.$$p_d[n].attribute===e||!this.$$p_d[n].attribute&&n.toLowerCase()===e)||e}});function ge(t,e,n,r){var s;const o=(s=n[t])==null?void 0:s.type;if(e=o==="Boolean"&&typeof e!="boolean"?e!=null:e,!r||!n[t])return e;if(r==="toAttribute")switch(o){case"Object":case"Array":return e==null?null:JSON.stringify(e);case"Boolean":return e?"":null;case"Number":return e??null;default:return e}else switch(o){case"Object":case"Array":return e&&JSON.parse(e);case"Boolean":return e;case"Number":return e!=null?+e:e;default:return e}}function Zo(t){const e={};return t.childNodes.forEach(n=>{e[n.slot||"default"]=!0}),e}function Me(t,e,n,r,o,s){let c=class extends Sr{constructor(){super(t,n,o),this.$$p_d=e}static get observedAttributes(){return be(e).map(p=>(e[p].attribute||p).toLowerCase())}};return be(e).forEach(p=>{oe(c.prototype,p,{get(){return this.$$c&&p in this.$$c?this.$$c[p]:this.$$d[p]},set(h){var d;h=ge(p,h,e),this.$$d[p]=h,(d=this.$$c)==null||d.$set({[p]:h})}})}),r.forEach(p=>{oe(c.prototype,p,{get(){var h;return(h=this.$$c)==null?void 0:h[p]}})}),t.element=c,c}const Nt=new Map([["yellow","#F8B920"],["red","#FF4646"],["blue","#0064FF"],["green","#00C564"]]),Qo=["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","OPTION"];function Nr(t){const e=t.map(c=>c.trim().toLocaleLowerCase()),n=e.map(()=>({start:null,end:null,shift:0})),r=e.map(()=>[]),o=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,c=>{var p,h,d;return Qo.includes((p=c.parentNode)==null?void 0:p.tagName)||((h=c.parentNode)==null?void 0:h.contentEditable)=="true"||!((d=c.parentNode)!=null&&d.checkVisibility())?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let s;for(;s=o.nextNode();)if(s!=null&&s.nodeValue)for(let c=0;c<s.nodeValue.length;c++){const p=s.nodeValue[c].toLocaleLowerCase().trim();p&&e.forEach((h,d)=>{var b;for(;h[n[d].shift]&&!h[n[d].shift].trim();)n[d].shift++;let _=h[n[d].shift]===p;if(!_&&n[d].shift&&(n[d].shift=0,_=h[n[d].shift]===p),_&&(n[d].shift||(n[d].start=[s,c]),n[d].end=[s,c],n[d].shift++),n[d].shift>=h.length){const E=document.createRange();E.setStart(n[d].start[0],n[d].start[1]),E.setEnd(n[d].end[0],n[d].end[1]+1),!E.collapsed&&((b=E.commonAncestorContainer.parentElement)!=null&&b.checkVisibility())?r[d].push(E):E.detach(),_=!1}_||(n[d].shift=0,n[d].start=null,n[d].end=null)})}return r}const Ot=`rh-${new Date().getTime()}-`,Re="highlights"in CSS;function ti(t){if(!t.length&&!CSS.highlights.size)return;const e=[];if(CSS.highlights.clear(),t.length){const r=Nr(t.map(({text:o})=>o||""));for(const o in t){if(!r[o].length)continue;const{_id:s,color:c,note:p}=t[o],h=`${Ot}${s}`;CSS.highlights.set(h,new Highlight(...r[o]));const d=r[o][0].getBoundingClientRect();e.push(`
                ::highlight(${h}) {
                    all: unset;
                    background-color: color-mix(in srgb, ${Nt.get(c)||c||"yellow"}, white 60%) !important;
                    color: color-mix(in srgb, ${Nt.get(c)||c||"yellow"}, black 80%) !important;
                    ${p?"text-decoration: underline wavy; -webkit-text-decoration: underline wavy;":""}
                    text-decoration-thickness: from-font;
                }

                :root {
                    --highlight-${s}-top: ${(100/document.documentElement.scrollHeight*(window.scrollY+d.top-10)).toFixed(2)}%;
                }
            `);for(const _ of r[o])_.detach()}}const n=(()=>{let r=document.getElementById(Ot);return r||(r=document.createElement("style"),r.id=Ot,document.head.appendChild(r)),r})();n.innerHTML=e.join(`
`)}function ei(){var t;(t=document.getElementById(Ot))==null||t.remove()}function ni(t){var e;for(const[n,r]of CSS.highlights){const o=n.replace(Ot,"");if(t==o)for(const s of r){(e=s.startContainer.parentElement)==null||e.scrollIntoView({behavior:"smooth",block:"start"});break}}}function ri(t){let e;for(const[n,r]of CSS.highlights)for(const o of r){const s=t.compareBoundaryPoints(Range.START_TO_START,o),c=t.compareBoundaryPoints(Range.END_TO_END,o);(s==0&&c==0||t!=null&&t.collapsed&&s>=0&&c<=0)&&(e=[n.replace(Ot,""),o])}if(e)return e[0].replace(Ot,"")}const Ct=`rh-${new Date().getTime()}`;function oi(t){const e=document.body.querySelectorAll(`.${Ct}`);if(!t.length&&!e.length)return;e.forEach(s=>s.outerHTML=s.innerText);const n=[],r=Nr(t.map(({text:s})=>s||""));for(const s in t){const{_id:c,color:p}=t[s];for(const h of r[s]){const d=document.createElement("mark");d.className=Ct,d.setAttribute("data-id",String(c)),d.append(h.extractContents()),h.insertNode(d),h.detach()}n.push(`
            .${Ct}[data-id="${c}"] {
                all: unset;
                display: inline-block !important;
                background-color: white !important;
                background-image: linear-gradient(to bottom, ${Bn(Nt.get(p)||p,.4)} 0, ${Bn(Nt.get(p)||p,.4)} 100%) !important;
                color: black !important;
            }
        `)}const o=(()=>{let s=document.getElementById(Ct);return s||(s=document.createElement("style"),s.id=Ct,document.head.appendChild(s)),s})();o.innerHTML=n.join(`
`)}function ii(){var t;document.body.querySelectorAll(`.${Ct}`).forEach(e=>e.outerHTML=e.innerText),(t=document.getElementById(Ct))==null||t.remove()}function si(t){const e=document.body.querySelector(`.${Ct}[data-id="${t}"]`);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}function li(t){const e=t.commonAncestorContainer.nodeType==Node.ELEMENT_NODE?t.commonAncestorContainer:t.commonAncestorContainer.parentElement;if((e==null?void 0:e.className)==Ct){if(!t.collapsed){const n=new Range;n.selectNodeContents(t.commonAncestorContainer);const r=t.compareBoundaryPoints(Range.START_TO_START,n),o=t.compareBoundaryPoints(Range.END_TO_END,n);if(n.detach(),r!=0||o!=0)return}return e.getAttribute("data-id")||void 0}}function Bn(t,e){if(!t)return t;const n=parseInt(t.slice(1,3),16),r=parseInt(t.slice(3,5),16),o=parseInt(t.slice(5,7),16);return`rgba(${n}, ${r}, ${o}, ${e})`}function ai(t){return Re?ti(t):oi(t)}function Ve(t){return ai(t)}function ui(){return Re?ei():ii()}function Ar(t){return Re?ni(t):si(t)}function Dr(){var n,r,o;const t=document.getSelection();if(!(t!=null&&t.rangeCount))return;const e=t.getRangeAt(0);if(!((o=((n=e==null?void 0:e.commonAncestorContainer)==null?void 0:n.nodeType)==1?e==null?void 0:e.commonAncestorContainer:(r=e==null?void 0:e.commonAncestorContainer)==null?void 0:r.parentElement)!=null&&o.closest('[contenteditable=""], [contenteditable=true]')))return e}function te(){const t=document.getSelection();t!=null&&t.rangeCount&&t.removeAllRanges()}function ci(t){return Re?ri(t):li(t)}function Yn(t){if(!t)return"";var e=document.createElement("div");e.appendChild(t.cloneContents().cloneNode(!0)),document.body.appendChild(e);const n=e.innerText;return document.body.removeChild(e),e=void 0,n}function fi(t,e,n){let r=Q(it([])),o=Q(!1),s=Q(!1),c=Q(void 0);function p(g){const $=ci(g);if($)return D(r).find(x=>x._id==$);if(Yn(g).trim())return{text:Yn(g).trim()}}function h(g){const $={...typeof g._id=="string"?{_id:g._id}:{},...typeof g.text=="string"?{text:g.text}:{},...typeof g.note=="string"?{note:g.note}:{},color:g.color||"yellow"};if(!$.text)return;const S=D(r).findIndex(x=>{var O,k;return x._id==$._id||((O=x.text)==null?void 0:O.toLocaleLowerCase().trim())===((k=$.text)==null?void 0:k.toLocaleLowerCase().trim())});S!=-1?(D(r)[S]=$,e($)):(D(r).push($),t($))}function d({_id:g}){I(r,it(D(r).filter($=>$._id!=g))),n({_id:g})}function _(g){I(c,it(JSON.parse(JSON.stringify(g))))}function b(){D(c)&&(h(D(c)),I(c,void 0))}function E(){I(c,void 0)}return{get highlights(){return D(r)},set highlights(g){I(r,it(g))},get pro(){return D(o)},set pro(g){I(o,it(g))},get nav(){return D(s)},set nav(g){I(s,it(g))},get draft(){return D(c)},find:p,upsert:h,remove:d,setDraft:_,draftSubmit:b,draftCancel:E}}const di="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(di);function hi(t,e){let n=null,r=!0;return function(...s){n||(r?(t(...s),r=!1):(clearTimeout(n),n=setTimeout(()=>{t(...s),clearTimeout(n),n=null},e)))}}function rn(){var t;return(t=navigator==null?void 0:navigator.userAgentData)!=null&&t.mobile?!0:/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)}var pi=bt('<button type="submit" class="svelte-q15s48"><span class="color svelte-q15s48"></span></button>'),vi=bt('<button type="submit" value="remove" title="Delete highlight" class="svelte-q15s48"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-q15s48"><g class="svelte-q15s48"><line x1="2.75" y1="4.25" x2="15.25" y2="4.25" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-q15s48"></line><path d="M6.75,4.25v-1.5c0-.552,.448-1,1-1h2.5c.552,0,1,.448,1,1v1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-q15s48"></path><path d="M13.5,6.75l-.4,7.605c-.056,1.062-.934,1.895-1.997,1.895H6.898c-1.064,0-1.941-.833-1.997-1.895l-.4-7.605" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-q15s48"></path></g></svg></button>'),mi=bt('<dialog class="svelte-q15s48"><form method="dialog" class="svelte-q15s48"><!> <button type="submit" value="note" title="Add note" class="svelte-q15s48"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-q15s48"><g class="svelte-q15s48"><path stroke-linecap="round" stroke-linejoin="round" d="M9,1.75C4.996,1.75,1.75,4.996,1.75,9c0,1.319,.358,2.552,.973,3.617,.43,.806-.053,2.712-.973,3.633,1.25,.068,2.897-.497,3.633-.973,.489,.282,1.264,.656,2.279,.848,.433,.082,.881,.125,1.338,.125,4.004,0,7.25-3.246,7.25-7.25S13.004,1.75,9,1.75Z" class="svelte-q15s48"></path><path stroke-width="0" d="M9,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-q15s48"></path><path stroke-width="0" d="M5.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-q15s48"></path><path stroke-width="0" d="M12.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-q15s48"></path></g></svg></button> <!></form></dialog>');function Lr(t,e){ue(e,!0);let n=Oe(e,"store",7),r,o=Q(void 0),s=Q(!1);function c(N){if(!D(o))return;const A=N.currentTarget.returnValue;switch(N.currentTarget.returnValue="",A){case"add":n().upsert(D(o)),te();break;case"note":n().setDraft(D(o)),te();break;case"remove":n().remove(D(o)),te();break;default:if(Nt.has(A)){n().upsert({...D(o),color:A}),te();return}break}}function p(){I(s,!0)}function h(){I(s,!1),setTimeout(d)}function d(){if(D(s)){r==null||r.close();return}requestAnimationFrame(()=>{const N=Dr(),A=N&&n().find(N);if(!N||!(A!=null&&A._id)&&!N.toString().trim()){r==null||r.close();return}I(o,it(A)),r.inert=!0,r==null||r.show(),r.inert=!1;const J=256,q=10,M=N.getBoundingClientRect(),U=Math.min(Math.max(M.x,q)+window.scrollX,window.innerWidth+window.scrollX-J-q),G=Math.min(window.innerWidth-Math.max(M.x,q)-window.scrollX-M.width,window.innerWidth-window.scrollX-J-q),tt=Math.max(M.y,40)+window.scrollY+M.height+4,et=window.innerHeight-Math.max(M.y,40)-window.scrollY+4,rt=U<window.innerWidth/2+window.scrollX,ht=tt<window.innerHeight/2+window.scrollY;r==null||r.style.setProperty("left",rt?`${U}px`:"unset"),r==null||r.style.setProperty("right",rt?"unset":`${G}px`),r==null||r.style.setProperty("top",ht?`${tt}px`:"unset"),r==null||r.style.setProperty("bottom",ht?"unset":`${et}px`)})}const _=hi(d,200);var b=mi();mt("mousedown",Dt,p,!1),mt("touchstart",Dt,p,!1,!0),mt("mouseup",Dt,h,!1),mt("touchend",Dt,h,!1,!0),mt("touchcancel",Dt,h,!1,!0),mt("selectionchange",Dt,_,!1),nn(b,N=>r=N,()=>r),_t(()=>ne(b,"mobile",rn()));var E=st(b),g=st(E);mn(g,71,()=>Nt,(N,A)=>K(K(N))[0],(N,A,J)=>{let q=()=>K(K(A))[0],M=()=>K(K(A))[1];var U=pi(),G=st(U);_t(()=>{var tt;Uo(U,q()),ft(G,"style",`--color: ${M()??""}`),ne(G,"active",q()==((tt=D(o))==null?void 0:tt.color))}),lt(N,U)});var $=F(F(g,!0)),S=st($),x=st(S),O=st(x),k=F(O),C=F(k),L=F(C),ut=F(F($,!0));return Se(ut,()=>{var N;return(N=D(o))==null?void 0:N._id},N=>{var A=vi();lt(N,A)}),_t(()=>{var N,A,J,q,M,U;ne(b,"new",!((N=D(o))!=null&&N._id)),ft(O,"fill",(A=D(o))!=null&&A.note?"currentColor":"none"),ft(O,"stroke-width",(J=D(o))!=null&&J.note?"0":void 0),ft(k,"fill",(q=D(o))!=null&&q.note?"none":"currentColor"),ft(C,"fill",(M=D(o))!=null&&M.note?"none":"currentColor"),ft(L,"fill",(U=D(o))!=null&&U.note?"none":"currentColor")}),mt("close",b,c,!1),lt(t,b),vn(t,"svelte-q15s48",`
    .svelte-q15s48 {
        user-select: none;
        -webkit-user-select: none;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    dialog.svelte-q15s48 {
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
        dialog.svelte-q15s48 {
            --bg-light: rgba(255, 255, 255, .8);
            --bg-dark: rgba(60, 60, 60, .8);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }
    }

    dialog.mobile.svelte-q15s48 {
        --control-size: 26px;
    }

    dialog.svelte-q15s48 {
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

    dialog.mobile.new.svelte-q15s48 {
        position: fixed;
        top: auto !important;
        left: auto !important;
        right: 16px !important;
        bottom: 16px !important;
        margin-right: env(safe-area-inset-right);
        margin-bottom: env(safe-area-inset-bottom);
    }

    [open].svelte-q15s48 {
        box-shadow: 0 0 0 .5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.05), 0 15px 40px rgba(0,0,0,.1);
    }

    form.svelte-q15s48 {
        display: flex;
        margin: 0;
        padding: 0;
    }

    button.svelte-q15s48 {
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

    button.svelte-q15s48:first-child {
        border-top-left-radius: var(--control-size);
        border-bottom-left-radius: var(--control-size);
    }

    button.svelte-q15s48:last-child {
        border-top-right-radius: var(--control-size);
        border-bottom-right-radius: var(--control-size);
    }

    @media (pointer: fine) {
        button.svelte-q15s48:hover {
            background: var(--hover-bg-light);

            @supports(color: light-dark(white,black)) {
                background: light-dark(var(--hover-bg-light), var(--hover-bg-dark));
            }
        }
    }

    button.svelte-q15s48:active {
        transition: none;
        background: var(--active-bg-light);

        @supports(color: light-dark(white,black)) {
            background: light-dark(var(--active-bg-light), var(--active-bg-dark));
        }
    }

    svg.svelte-q15s48 {
        stroke: currentColor;
        stroke-width: 1.5px;
    }

    .color.svelte-q15s48 {
        pointer-events: none;
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        box-shadow: inset 0 0 0 6px var(--color);
        transition: width .15s ease-in-out, height .15s ease-in-out;
        border-radius: 50%;
    }

    .color.active.svelte-q15s48 {
        width: 16px;
        height: 16px;
        box-shadow: inset 0 0 0 6px var(--color)
    }

    /* animation */
    dialog.svelte-q15s48 {
        transition: 
            display .25s allow-discrete ease-in-out, 
            overlay .25s allow-discrete ease-in-out, 
            box-shadow .25s allow-discrete ease-in-out, 
            opacity .25s ease-in-out,
            left .15s ease-in-out,
            top .15s ease-in-out,
            right .15s ease-in-out,
            bottom .15s ease-in-out;
        opacity: 0;
    }

    [open].svelte-q15s48 {
        opacity: 1;
    }

    dialog.svelte-q15s48:not([open]) {
        transition-duration: .2s;
        pointer-events: none;
    }

    @starting-style {
        [open].svelte-q15s48 {
            opacity: 0;
        }
    }
`),ce({get store(){return n()},set store(N){n(N),Ht()}})}Me(Lr,{store:{}},[],[],!0);function _i(t){const e=t.currentTarget.getBoundingClientRect();e.top<=t.clientY&&t.clientY<=e.top+e.height&&e.left<=t.clientX&&t.clientX<=e.left+e.width||(t.preventDefault(),t.currentTarget.close())}var gi=(t,e)=>I(e,!1),wi=bt('<input type="radio" name="color" class="svelte-aehutt">'),bi=bt('<div class="unlock svelte-aehutt"><a href="https://raindrop.io/pro/buy" target="_blank" class="svelte-aehutt">Upgrade to Pro</a> to unlock annotation</div>'),yi=bt('<blockquote role="presentation" class="svelte-aehutt"> </blockquote> <fieldset class="color svelte-aehutt"></fieldset> <textarea class="note svelte-aehutt" rows="4" maxlength="5000" placeholder="Notes (optional)"></textarea> <!>',1),Ei=bt('<dialog role="presentation" class="svelte-aehutt"><header class="svelte-aehutt"> </header> <form method="dialog" class="svelte-aehutt"><!> <footer class="svelte-aehutt"><button formnovalidate="" class="svelte-aehutt">Cancel <sup class="svelte-aehutt">esc</sup></button> <button type="submit" value="OK" class="svelte-aehutt"> <sup class="svelte-aehutt">&crarr;</sup></button></footer></form></dialog>');function Or(t,e){ue(e,!0);const n=[];let r=Oe(e,"store",7),o,s,c=Q(!0);Ze(()=>{r().draft?(I(c,!0),o==null||o.showModal()):o==null||o.close()});function p(k){const C=k.currentTarget.returnValue;k.currentTarget.returnValue="",setTimeout(C?r().draftSubmit:r().draftCancel,200)}function h(k){var C;rn()||(k.stopImmediatePropagation(),k.stopPropagation(),k.key=="Enter"&&!k.shiftKey&&(k.preventDefault(),s&&((C=k.currentTarget.closest("form"))==null||C.requestSubmit(s))))}var d=Ei();nn(d,k=>o=k,()=>o),d.__mousedown=[_i],_t(()=>ne(d,"mobile",rn()));var _=st(d),b=st(_),E=F(F(_,!0)),g=st(E);Se(g,()=>r().draft,k=>{var C=yi(),L=hn(C);L.__click=[gi,c];var ut=st(L);_t(()=>{var q,M;return Ye(ut,((M=(q=r().draft)==null?void 0:q.text)==null?void 0:M.trim())||"")});var N=F(F(L,!0));mn(N,73,()=>Nt,Po,(q,M,U)=>{let G=()=>K(K(M))[0],tt=()=>K(K(M))[1];var et=wi();Wo(et);var rt;_t(()=>{rt!==(rt=G())&&(et.value=(et.__value=G())==null?"":G()),ft(et,"style",`--color: ${tt()??""}`)}),Ko(n,[],et,()=>(G(),r().draft.color),ht=>r().draft.color=ht),lt(q,et)});var A=F(F(N,!0));Vo(A),zo(A),A.__keydown=h;var J=F(F(A,!0));Se(J,()=>!r().pro,q=>{var M=bi();lt(q,M)}),_t(()=>{ne(L,"compact",D(c)),A.disabled=!r().pro}),Xo(A,()=>r().draft.note,q=>r().draft.note=q),lt(k,C)});var $=F(F(g,!0)),S=st($),x=F(F(S,!0));nn(x,k=>s=k,()=>s);var O=st(x);return _t(()=>{var k,C;Ye(b,`${((k=r().draft)!=null&&k._id?"Edit":"New")??""} highlight`),Ye(O,`${((C=r().draft)!=null&&C._id?"Update":"Create")??""} `)}),mt("close",d,p,!1),lt(t,d),vn(t,"svelte-aehutt",`
    .svelte-aehutt {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    dialog.svelte-aehutt {
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

    dialog.mobile.svelte-aehutt {
        left: 0;right: 0;bottom: 0;top: 0;
        width: 100%;
        margin: 0;
        max-width: 100%;
        max-height: 100%;
        border-radius: 0;
        bottom: auto;
    }

    dialog.svelte-aehutt, header.svelte-aehutt {
        background: var(--bg-light);

        @supports(color: light-dark(white,black)) {
            background: light-dark(var(--bg-light), var(--bg-dark));
        }
    }

    [open].svelte-aehutt {
        box-shadow: 0 0 0 .5px rgba(60, 60, 60, .9), 0 3px 10px rgba(0,0,0,.05), 0 7px 15px -3px rgba(0,0,0,.15);
    }

    .svelte-aehutt::backdrop {
        background-color: rgba(0,0,0,.3);
    }

    header.svelte-aehutt {
        margin: 0;
        padding: 1em;
        font-weight: bold;
        position: sticky;
        top: 0;
    }

    @supports(animation-timeline: scroll()) {
        header.svelte-aehutt {
            animation: svelte-aehutt-header-scroll linear both;
            animation-timeline: scroll();
            animation-range: 0 1px;
        }
    }

    @keyframes svelte-aehutt-header-scroll {
        to {
            box-shadow: 0 .5px 0 rgba(0,0,0,.2);
        }
    }

    form.svelte-aehutt {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 1em;
        padding-top: 0;
    }

    .color.svelte-aehutt {
        all: unset;
        display: flex;
        gap: .75em;
    }

    .color.svelte-aehutt input[type="radio"]:where(.svelte-aehutt) {
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

    .color.svelte-aehutt input[type="radio"]:where(.svelte-aehutt):checked {
        box-shadow: inset 0 0 0 .5em var(--color);
    }

    .color.svelte-aehutt input[type="radio"]:where(.svelte-aehutt):active {
        transform: translateY(1px);
    }

    blockquote.svelte-aehutt, .note.svelte-aehutt, button.svelte-aehutt {
        background: var(--control-bg-light);

        @supports(color: light-dark(white,black)) {
            background: light-dark(var(--control-bg-light), var(--control-bg-dark));
        }
    }

    blockquote.svelte-aehutt {
        white-space: pre-wrap;
        margin: 0;
        min-width: 100%;
        width: 0;
        font-size: 16px;
    }

    blockquote.compact.svelte-aehutt {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        overflow: clip;
    }

    blockquote.svelte-aehutt, .note.svelte-aehutt {
        border-radius: .5em;
        padding: .5em .6em;
    }

    .note.svelte-aehutt {
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

    .note.svelte-aehutt:focus {
        background: transparent;
    }
    
    footer.svelte-aehutt {
        all: unset;
        display: flex;
        justify-content: flex-end;
        gap: .75em;
    }

    button.svelte-aehutt {
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

    button.svelte-aehutt:active {
        transform: translateY(1px);
    }

    button.svelte-aehutt sup:where(.svelte-aehutt) {
        margin-left: .25em;
        vertical-align: text-top;
        opacity: .5;
    }

    dialog.mobile.svelte-aehutt button:where(.svelte-aehutt) sup:where(.svelte-aehutt) {
        display: none;
    }

    button[value].svelte-aehutt {
        background: blue;
        background: AccentColor;
        color: white;
    }

    .unlock.svelte-aehutt {
        font-size: .75em;
        color: GrayText;
    }

    /* animation */
    dialog.svelte-aehutt, .svelte-aehutt::backdrop {
        transition: 
            display .2s allow-discrete ease-in-out, 
            overlay .2s allow-discrete ease-in-out, 
            opacity .2s ease-in-out,
            transform .2s ease-in-out,
            box-shadow .2s ease-in-out;
        opacity: 0;
    }

    dialog.svelte-aehutt {
        transform: translateY(1em);
    }

    [open].svelte-aehutt,
    [open].svelte-aehutt::backdrop {
        opacity: 1;
        transform: translateY(0);
    }

    @starting-style {
        [open].svelte-aehutt,
        [open].svelte-aehutt::backdrop {
            opacity: 0;
        }

        [open].svelte-aehutt {
            transform: translateY(-1em);
        }
    }

    @supports not selector(::highlight(a)) {
        dialog.svelte-aehutt, dialog.svelte-aehutt::backdrop {
            animation: svelte-aehutt-simple-appear .2s forwards;
        }
        @keyframes svelte-aehutt-simple-appear {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    }
`),ce({get store(){return r()},set store(k){r(k),Ht()}})}br(["mousedown","click","keydown"]);Me(Or,{store:{}},[],[],!0);const Ci=(t,e)=>{const n=t.target.getAttribute("data-highlight");n&&(t.preventDefault(),e(n))};var $i=bt('<div class="svelte-1t9y4ki"></div>'),ki=bt('<nav role="presentation" class="svelte-1t9y4ki"></nav>');function Mr(t,e){ue(e,!0);let n=Oe(e,"store",7);var r=Yo(),o=hn(r);return Se(o,()=>n().nav,s=>{var c=ki();c.__click=[Ci,Ar],mn(c,77,()=>n().highlights,(p,h)=>K(p)._id,(p,h,d)=>{var _=$i();_t(()=>ft(_,"style",`top: var(--highlight-${K(h)._id??""}-top); --color: ${(Nt.get(K(h).color)||K(h).color)??""}`)),_t(()=>ft(_,"data-highlight",K(h)._id)),lt(p,_)}),lt(s,c)}),lt(t,r),vn(t,"svelte-1t9y4ki",`
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
`),ce({get store(){return n()},set store(s){n(s),Ht()}})}br(["click"]);Me(Mr,{store:{}},[],[],!0);var xi=bt("<!> <!> <!>",5);function Ti(t,e){ue(e,!0);let n=Oe(e,"store",7);Ze(()=>{Ve(n().highlights)});let r;function o(){Ve(n().highlights),clearTimeout(r),r=setTimeout(()=>{console.log("rerender",n().highlights),Ve(n().highlights)},3e3)}hr(()=>{document.readyState&&o()}),Ze(()=>ui);var s=xi();mt("load",Te,o,!1),mt("popstate",Te,o,!1);var c=hn(s);Lr(c,{get store(){return n()}});var p=F(F(c,!0));Or(p,{get store(){return n()}});var h=F(F(p,!0));return Mr(h,{get store(){return n()}}),lt(t,s),ce({get store(){return n()},set store(d){n(d),Ht()}})}customElements.define("rdh-ui",Me(Ti,{store:{}},[],[],!0));function Si(t){if(typeof chrome=="object"&&chrome.runtime&&chrome.runtime.onMessage||typeof browser=="object"&&browser.runtime&&browser.runtime.onMessage){const{runtime:e}=typeof browser=="object"?browser:chrome,n=(r,o)=>{o.id==e.id&&typeof r.type=="string"&&t(r)};return e.onMessage.removeListener(n),e.onMessage.addListener(n),r=>e.sendMessage(null,r)}if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.rdh)return window.rdhSend=t,e=>window.webkit.messageHandlers.rdh.postMessage(e);if(typeof window<"u"&&typeof window.process=="object"&&window.process.type==="renderer"||typeof process<"u"&&typeof process.versions=="object"&&process.versions.electron){const{ipcRenderer:e}=require("electron"),n=(r,o)=>t(o);return e.removeListener("RDH",n),e.on("RDH",n),r=>e.sendToHost("RDH",r)}if("ReactNativeWebView"in window)return window.ReactNativeWebViewSendMessage=t,e=>window.ReactNativeWebView.postMessage(JSON.stringify(e));if(window.self!==window.top){const e=({data:n,source:r})=>{r!==window.parent||typeof n!="object"||typeof n.type!="string"||t(n)};return window.removeEventListener("message",e),window.addEventListener("message",e),n=>window.parent.postMessage(n,"*")}throw new Error("unsupported platform")}async function Ni(t){let e=!1;const n=new Set,r=Si(o=>{if(!e){n.add(o);return}t(o)});await new Promise(o=>{function s(){window.removeEventListener("DOMContentLoaded",s),o()}document.readyState=="loading"?(window.removeEventListener("DOMContentLoaded",s),window.addEventListener("DOMContentLoaded",s,{once:!0})):o()}),e=!0;for(const o of n)t(o),n.delete(o);return r}const Zt=document.createElement("rdh-ui");(async()=>{const t=await Ni(n=>{switch(n.type){case"RDH_APPLY":Array.isArray(n.payload)&&(e.highlights=n.payload);break;case"RDH_CONFIG":typeof n.payload.pro=="boolean"&&(e.pro=n.payload.pro),typeof n.payload.nav=="boolean"&&(e.nav=n.payload.nav),typeof n.payload.enabled=="boolean"&&(n.payload.enabled===!0?document.body.contains(Zt)||document.body.appendChild(Zt):document.body.contains(Zt)&&document.body.removeChild(Zt));break;case"RDH_SCROLL":typeof n.payload._id=="string"&&Ar(n.payload._id);break;case"RDH_ADD_SELECTION":const r=Dr();if(!r)return;const o=e.find(r);if(!o)return;e.upsert(o),te();break;case"RDH_NOTE_SELECTION":console.log("not implemented yet");break}}),e=fi(n=>t({type:"RDH_ADD",payload:n}),n=>t({type:"RDH_UPDATE",payload:n}),({_id:n})=>t({type:"RDH_REMOVE",payload:{_id:n}}));Zt.store=e,t({type:"RDH_READY",payload:{url:location.href}})})();
