"use strict";var Ur=Object.defineProperty;var Dn=t=>{throw TypeError(t)};var Xr=(t,e,n)=>e in t?Ur(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ft=(t,e,n)=>Xr(t,typeof e!="symbol"?e+"":e,n),jn=(t,e,n)=>e.has(t)||Dn("Cannot "+n);var tt=(t,e,n)=>(jn(t,e,"read from private field"),n?n.call(t):e.get(t)),Ie=(t,e,n)=>e.has(t)?Dn("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),qe=(t,e,n,r)=>(jn(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n);(function(){var t=window.Document.prototype.createElement,e=window.Document.prototype.createElementNS,n=window.Document.prototype.importNode,r=window.Document.prototype.prepend,o=window.Document.prototype.append,i=window.DocumentFragment.prototype.prepend,l=window.DocumentFragment.prototype.append,d=window.Node.prototype.cloneNode,v=window.Node.prototype.appendChild,p=window.Node.prototype.insertBefore,g=window.Node.prototype.removeChild,w=window.Node.prototype.replaceChild,E=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),_=window.Element.prototype.attachShadow,k=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),$=window.Element.prototype.getAttribute,D=window.Element.prototype.setAttribute,O=window.Element.prototype.removeAttribute,x=window.Element.prototype.toggleAttribute,C=window.Element.prototype.getAttributeNS,j=window.Element.prototype.setAttributeNS,ct=window.Element.prototype.removeAttributeNS,A=window.Element.prototype.insertAdjacentElement,S=window.Element.prototype.insertAdjacentHTML,K=window.Element.prototype.prepend,R=window.Element.prototype.append,L=window.Element.prototype.before,W=window.Element.prototype.after,Q=window.Element.prototype.replaceWith,nt=window.Element.prototype.remove,rt=window.HTMLElement,it=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),vt=window.HTMLElement.prototype.insertAdjacentElement,Zt=window.HTMLElement.prototype.insertAdjacentHTML,wn=new Set;"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(s){return wn.add(s)});function bn(s){var a=wn.has(s);return s=/^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(s),!a&&s}var Pr=document.contains?document.contains.bind(document):document.documentElement.contains.bind(document.documentElement);function B(s){var a=s.isConnected;if(a!==void 0)return a;if(Pr(s))return!0;for(;s&&!(s.__CE_isImportDocument||s instanceof Document);)s=s.parentNode||(window.ShadowRoot&&s instanceof ShadowRoot?s.host:void 0);return!(!s||!(s.__CE_isImportDocument||s instanceof Document))}function Me(s){var a=s.children;if(a)return Array.prototype.slice.call(a);for(a=[],s=s.firstChild;s;s=s.nextSibling)s.nodeType===Node.ELEMENT_NODE&&a.push(s);return a}function Re(s,a){for(;a&&a!==s&&!a.nextSibling;)a=a.parentNode;return a&&a!==s?a.nextSibling:null}function Fe(s,a,c){for(var h=s;h;){if(h.nodeType===Node.ELEMENT_NODE){var u=h;a(u);var f=u.localName;if(f==="link"&&u.getAttribute("rel")==="import"){if(h=u.import,c===void 0&&(c=new Set),h instanceof Node&&!c.has(h))for(c.add(h),h=h.firstChild;h;h=h.nextSibling)Fe(h,a,c);h=Re(s,u);continue}else if(f==="template"){h=Re(s,u);continue}if(u=u.__CE_shadowRoot)for(u=u.firstChild;u;u=u.nextSibling)Fe(u,a,c)}h=h.firstChild?h.firstChild:Re(s,h)}}function ve(){var s=!(gt==null||!gt.noDocumentConstructionObserver),a=!(gt==null||!gt.shadyDomFastWalk);this.m=[],this.g=[],this.j=!1,this.shadyDomFastWalk=a,this.I=!s}function Qt(s,a,c,h){var u=window.ShadyDOM;if(s.shadyDomFastWalk&&u&&u.inUse){if(a.nodeType===Node.ELEMENT_NODE&&c(a),a.querySelectorAll)for(s=u.nativeMethods.querySelectorAll.call(a,"*"),a=0;a<s.length;a++)c(s[a])}else Fe(a,c,h)}function Ir(s,a){s.j=!0,s.m.push(a)}function qr(s,a){s.j=!0,s.g.push(a)}function He(s,a){s.j&&Qt(s,a,function(c){return Ht(s,c)})}function Ht(s,a){if(s.j&&!a.__CE_patched){a.__CE_patched=!0;for(var c=0;c<s.m.length;c++)s.m[c](a);for(c=0;c<s.g.length;c++)s.g[c](a)}}function mt(s,a){var c=[];for(Qt(s,a,function(u){return c.push(u)}),a=0;a<c.length;a++){var h=c[a];h.__CE_state===1?s.connectedCallback(h):me(s,h)}}function ot(s,a){var c=[];for(Qt(s,a,function(u){return c.push(u)}),a=0;a<c.length;a++){var h=c[a];h.__CE_state===1&&s.disconnectedCallback(h)}}function Et(s,a,c){c=c===void 0?{}:c;var h=c.J,u=c.upgrade||function(m){return me(s,m)},f=[];for(Qt(s,a,function(m){if(s.j&&Ht(s,m),m.localName==="link"&&m.getAttribute("rel")==="import"){var y=m.import;y instanceof Node&&(y.__CE_isImportDocument=!0,y.__CE_registry=document.__CE_registry),y&&y.readyState==="complete"?y.__CE_documentLoadHandled=!0:m.addEventListener("load",function(){var b=m.import;if(!b.__CE_documentLoadHandled){b.__CE_documentLoadHandled=!0;var T=new Set;h&&(h.forEach(function(I){return T.add(I)}),T.delete(b)),Et(s,b,{J:T,upgrade:u})}})}else f.push(m)},h),a=0;a<f.length;a++)u(f[a])}function me(s,a){try{var c=a.ownerDocument,h=c.__CE_registry,u=h&&(c.defaultView||c.__CE_isImportDocument)?ge(h,a.localName):void 0;if(u&&a.__CE_state===void 0){u.constructionStack.push(a);try{try{if(new u.constructorFunction!==a)throw Error("The custom element constructor did not produce the element being upgraded.")}finally{u.constructionStack.pop()}}catch(b){throw a.__CE_state=2,b}if(a.__CE_state=1,a.__CE_definition=u,u.attributeChangedCallback&&a.hasAttributes()){var f=u.observedAttributes;for(u=0;u<f.length;u++){var m=f[u],y=a.getAttribute(m);y!==null&&s.attributeChangedCallback(a,m,null,y,null)}}B(a)&&s.connectedCallback(a)}}catch(b){Pt(b)}}ve.prototype.connectedCallback=function(s){var a=s.__CE_definition;if(a.connectedCallback)try{a.connectedCallback.call(s)}catch(c){Pt(c)}},ve.prototype.disconnectedCallback=function(s){var a=s.__CE_definition;if(a.disconnectedCallback)try{a.disconnectedCallback.call(s)}catch(c){Pt(c)}},ve.prototype.attributeChangedCallback=function(s,a,c,h,u){var f=s.__CE_definition;if(f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(a))try{f.attributeChangedCallback.call(s,a,c,h,u)}catch(m){Pt(m)}};function En(s,a,c,h){var u=a.__CE_registry;if(u&&(h===null||h==="http://www.w3.org/1999/xhtml")&&(u=ge(u,c)))try{var f=new u.constructorFunction;if(f.__CE_state===void 0||f.__CE_definition===void 0)throw Error("Failed to construct '"+c+"': The returned value was not constructed with the HTMLElement constructor.");if(f.namespaceURI!=="http://www.w3.org/1999/xhtml")throw Error("Failed to construct '"+c+"': The constructed element's namespace must be the HTML namespace.");if(f.hasAttributes())throw Error("Failed to construct '"+c+"': The constructed element must not have any attributes.");if(f.firstChild!==null)throw Error("Failed to construct '"+c+"': The constructed element must not have any children.");if(f.parentNode!==null)throw Error("Failed to construct '"+c+"': The constructed element must not have a parent node.");if(f.ownerDocument!==a)throw Error("Failed to construct '"+c+"': The constructed element's owner document is incorrect.");if(f.localName!==c)throw Error("Failed to construct '"+c+"': The constructed element's local name is incorrect.");return f}catch(m){return Pt(m),a=h===null?t.call(a,c):e.call(a,h,c),Object.setPrototypeOf(a,HTMLUnknownElement.prototype),a.__CE_state=2,a.__CE_definition=void 0,Ht(s,a),a}return a=h===null?t.call(a,c):e.call(a,h,c),Ht(s,a),a}function Pt(s){var a="",c="",h=0,u=0;s instanceof Error?(a=s.message,c=s.sourceURL||s.fileName||"",h=s.line||s.lineNumber||0,u=s.column||s.columnNumber||0):a="Uncaught "+String(s);var f=void 0;ErrorEvent.prototype.initErrorEvent===void 0?f=new ErrorEvent("error",{cancelable:!0,message:a,filename:c,lineno:h,colno:u,error:s}):(f=document.createEvent("ErrorEvent"),f.initErrorEvent("error",!1,!0,a,c,h),f.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0}})}),f.error===void 0&&Object.defineProperty(f,"error",{configurable:!0,enumerable:!0,get:function(){return s}}),window.dispatchEvent(f),f.defaultPrevented||console.error(s)}function kn(){var s=this;this.g=void 0,this.F=new Promise(function(a){s.l=a})}kn.prototype.resolve=function(s){if(this.g)throw Error("Already resolved.");this.g=s,this.l(s)};function Cn(s){var a=document;this.l=void 0,this.h=s,this.g=a,Et(this.h,this.g),this.g.readyState==="loading"&&(this.l=new MutationObserver(this.G.bind(this)),this.l.observe(this.g,{childList:!0,subtree:!0}))}function $n(s){s.l&&s.l.disconnect()}Cn.prototype.G=function(s){var a=this.g.readyState;for(a!=="interactive"&&a!=="complete"||$n(this),a=0;a<s.length;a++)for(var c=s[a].addedNodes,h=0;h<c.length;h++)Et(this.h,c[h])};function V(s){this.s=new Map,this.u=new Map,this.C=new Map,this.A=!1,this.B=new Map,this.o=function(a){return a()},this.i=!1,this.v=[],this.h=s,this.D=s.I?new Cn(s):void 0}V.prototype.H=function(s,a){var c=this;if(!(a instanceof Function))throw new TypeError("Custom element constructor getters must be functions.");xn(this,s),this.s.set(s,a),this.v.push(s),this.i||(this.i=!0,this.o(function(){return Sn(c)}))},V.prototype.define=function(s,a){var c=this;if(!(a instanceof Function))throw new TypeError("Custom element constructors must be functions.");xn(this,s),Tn(this,s,a),this.v.push(s),this.i||(this.i=!0,this.o(function(){return Sn(c)}))};function xn(s,a){if(!bn(a))throw new SyntaxError("The element name '"+a+"' is not valid.");if(ge(s,a))throw Error("A custom element with name '"+(a+"' has already been defined."));if(s.A)throw Error("A custom element is already being defined.")}function Tn(s,a,c){s.A=!0;var h;try{var u=c.prototype;if(!(u instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var f=function(I){var It=u[I];if(It!==void 0&&!(It instanceof Function))throw Error("The '"+I+"' callback must be a function.");return It},m=f("connectedCallback"),y=f("disconnectedCallback"),b=f("adoptedCallback"),T=(h=f("attributeChangedCallback"))&&c.observedAttributes||[]}catch(I){throw I}finally{s.A=!1}return c={localName:a,constructorFunction:c,connectedCallback:m,disconnectedCallback:y,adoptedCallback:b,attributeChangedCallback:h,observedAttributes:T,constructionStack:[]},s.u.set(a,c),s.C.set(c.constructorFunction,c),c}V.prototype.upgrade=function(s){Et(this.h,s)};function Sn(s){if(s.i!==!1){s.i=!1;for(var a=[],c=s.v,h=new Map,u=0;u<c.length;u++)h.set(c[u],[]);for(Et(s.h,document,{upgrade:function(b){if(b.__CE_state===void 0){var T=b.localName,I=h.get(T);I?I.push(b):s.u.has(T)&&a.push(b)}}}),u=0;u<a.length;u++)me(s.h,a[u]);for(u=0;u<c.length;u++){for(var f=c[u],m=h.get(f),y=0;y<m.length;y++)me(s.h,m[y]);(f=s.B.get(f))&&f.resolve(void 0)}c.length=0}}V.prototype.get=function(s){if(s=ge(this,s))return s.constructorFunction},V.prototype.whenDefined=function(s){if(!bn(s))return Promise.reject(new SyntaxError("'"+s+"' is not a valid custom element name."));var a=this.B.get(s);if(a)return a.F;a=new kn,this.B.set(s,a);var c=this.u.has(s)||this.s.has(s);return s=this.v.indexOf(s)===-1,c&&s&&a.resolve(void 0),a.F},V.prototype.polyfillWrapFlushCallback=function(s){this.D&&$n(this.D);var a=this.o;this.o=function(c){return s(function(){return a(c)})}};function ge(s,a){var c=s.u.get(a);if(c)return c;if(c=s.s.get(a)){s.s.delete(a);try{return Tn(s,a,c())}catch(h){Pt(h)}}}V.prototype.define=V.prototype.define,V.prototype.upgrade=V.prototype.upgrade,V.prototype.get=V.prototype.get,V.prototype.whenDefined=V.prototype.whenDefined,V.prototype.polyfillDefineLazy=V.prototype.H,V.prototype.polyfillWrapFlushCallback=V.prototype.polyfillWrapFlushCallback;function Pe(s,a,c){function h(u){return function(f){for(var m=[],y=0;y<arguments.length;++y)m[y]=arguments[y];y=[];for(var b=[],T=0;T<m.length;T++){var I=m[T];if(I instanceof Element&&B(I)&&b.push(I),I instanceof DocumentFragment)for(I=I.firstChild;I;I=I.nextSibling)y.push(I);else y.push(I)}for(u.apply(this,m),m=0;m<b.length;m++)ot(s,b[m]);if(B(this))for(m=0;m<y.length;m++)b=y[m],b instanceof Element&&mt(s,b)}}c.prepend!==void 0&&(a.prepend=h(c.prepend)),c.append!==void 0&&(a.append=h(c.append))}function Br(s){Document.prototype.createElement=function(a){return En(s,this,a,null)},Document.prototype.importNode=function(a,c){return a=n.call(this,a,!!c),this.__CE_registry?Et(s,a):He(s,a),a},Document.prototype.createElementNS=function(a,c){return En(s,this,c,a)},Pe(s,Document.prototype,{prepend:r,append:o})}function Yr(s){function a(h){return function(u){for(var f=[],m=0;m<arguments.length;++m)f[m]=arguments[m];m=[];for(var y=[],b=0;b<f.length;b++){var T=f[b];if(T instanceof Element&&B(T)&&y.push(T),T instanceof DocumentFragment)for(T=T.firstChild;T;T=T.nextSibling)m.push(T);else m.push(T)}for(h.apply(this,f),f=0;f<y.length;f++)ot(s,y[f]);if(B(this))for(f=0;f<m.length;f++)y=m[f],y instanceof Element&&mt(s,y)}}var c=Element.prototype;L!==void 0&&(c.before=a(L)),W!==void 0&&(c.after=a(W)),Q!==void 0&&(c.replaceWith=function(h){for(var u=[],f=0;f<arguments.length;++f)u[f]=arguments[f];f=[];for(var m=[],y=0;y<u.length;y++){var b=u[y];if(b instanceof Element&&B(b)&&m.push(b),b instanceof DocumentFragment)for(b=b.firstChild;b;b=b.nextSibling)f.push(b);else f.push(b)}for(y=B(this),Q.apply(this,u),u=0;u<m.length;u++)ot(s,m[u]);if(y)for(ot(s,this),u=0;u<f.length;u++)m=f[u],m instanceof Element&&mt(s,m)}),nt!==void 0&&(c.remove=function(){var h=B(this);nt.call(this),h&&ot(s,this)})}function Wr(s){function a(u,f){Object.defineProperty(u,"innerHTML",{enumerable:f.enumerable,configurable:!0,get:f.get,set:function(m){var y=this,b=void 0;if(B(this)&&(b=[],Qt(s,this,function(It){It!==y&&b.push(It)})),f.set.call(this,m),b)for(var T=0;T<b.length;T++){var I=b[T];I.__CE_state===1&&s.disconnectedCallback(I)}return this.ownerDocument.__CE_registry?Et(s,this):He(s,this),m}})}function c(u,f){u.insertAdjacentElement=function(m,y){var b=B(y);return m=f.call(this,m,y),b&&ot(s,y),B(m)&&mt(s,y),m}}function h(u,f){function m(y,b){for(var T=[];y!==b;y=y.nextSibling)T.push(y);for(b=0;b<T.length;b++)Et(s,T[b])}u.insertAdjacentHTML=function(y,b){if(y=y.toLowerCase(),y==="beforebegin"){var T=this.previousSibling;f.call(this,y,b),m(T||this.parentNode.firstChild,this)}else if(y==="afterbegin")T=this.firstChild,f.call(this,y,b),m(this.firstChild,T);else if(y==="beforeend")T=this.lastChild,f.call(this,y,b),m(T||this.firstChild,null);else if(y==="afterend")T=this.nextSibling,f.call(this,y,b),m(this.nextSibling,T);else throw new SyntaxError("The value provided ("+String(y)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.")}}_&&(Element.prototype.attachShadow=function(u){if(u=_.call(this,u),s.j&&!u.__CE_patched){u.__CE_patched=!0;for(var f=0;f<s.m.length;f++)s.m[f](u)}return this.__CE_shadowRoot=u}),k&&k.get?a(Element.prototype,k):it&&it.get?a(HTMLElement.prototype,it):qr(s,function(u){a(u,{enumerable:!0,configurable:!0,get:function(){return d.call(this,!0).innerHTML},set:function(f){var m=this.localName==="template",y=m?this.content:this,b=e.call(document,this.namespaceURI,this.localName);for(b.innerHTML=f;0<y.childNodes.length;)g.call(y,y.childNodes[0]);for(f=m?b.content:b;0<f.childNodes.length;)v.call(y,f.childNodes[0])}})}),Element.prototype.setAttribute=function(u,f){if(this.__CE_state!==1)return D.call(this,u,f);var m=$.call(this,u);D.call(this,u,f),f=$.call(this,u),s.attributeChangedCallback(this,u,m,f,null)},Element.prototype.setAttributeNS=function(u,f,m){if(this.__CE_state!==1)return j.call(this,u,f,m);var y=C.call(this,u,f);j.call(this,u,f,m),m=C.call(this,u,f),s.attributeChangedCallback(this,f,y,m,u)},Element.prototype.removeAttribute=function(u){if(this.__CE_state!==1)return O.call(this,u);var f=$.call(this,u);O.call(this,u),f!==null&&s.attributeChangedCallback(this,u,f,null,null)},x&&(Element.prototype.toggleAttribute=function(u,f){if(this.__CE_state!==1)return x.call(this,u,f);var m=$.call(this,u),y=m!==null;return f=x.call(this,u,f),y!==f&&s.attributeChangedCallback(this,u,m,f?"":null,null),f}),Element.prototype.removeAttributeNS=function(u,f){if(this.__CE_state!==1)return ct.call(this,u,f);var m=C.call(this,u,f);ct.call(this,u,f);var y=C.call(this,u,f);m!==y&&s.attributeChangedCallback(this,f,m,y,u)},vt?c(HTMLElement.prototype,vt):A&&c(Element.prototype,A),Zt?h(HTMLElement.prototype,Zt):S&&h(Element.prototype,S),Pe(s,Element.prototype,{prepend:K,append:R}),Yr(s)}var Nn={};function Vr(s){function a(){var c=this.constructor,h=document.__CE_registry.C.get(c);if(!h)throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var u=h.constructionStack;if(u.length===0)return u=t.call(document,h.localName),Object.setPrototypeOf(u,c.prototype),u.__CE_state=1,u.__CE_definition=h,Ht(s,u),u;var f=u.length-1,m=u[f];if(m===Nn)throw Error("Failed to construct '"+h.localName+"': This element was already constructed.");return u[f]=Nn,Object.setPrototypeOf(m,c.prototype),Ht(s,m),m}a.prototype=rt.prototype,Object.defineProperty(HTMLElement.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:a}),window.HTMLElement=a}function zr(s){function a(c,h){Object.defineProperty(c,"textContent",{enumerable:h.enumerable,configurable:!0,get:h.get,set:function(u){if(this.nodeType===Node.TEXT_NODE)h.set.call(this,u);else{var f=void 0;if(this.firstChild){var m=this.childNodes,y=m.length;if(0<y&&B(this)){f=Array(y);for(var b=0;b<y;b++)f[b]=m[b]}}if(h.set.call(this,u),f)for(u=0;u<f.length;u++)ot(s,f[u])}}})}Node.prototype.insertBefore=function(c,h){if(c instanceof DocumentFragment){var u=Me(c);if(c=p.call(this,c,h),B(this))for(h=0;h<u.length;h++)mt(s,u[h]);return c}return u=c instanceof Element&&B(c),h=p.call(this,c,h),u&&ot(s,c),B(this)&&mt(s,c),h},Node.prototype.appendChild=function(c){if(c instanceof DocumentFragment){var h=Me(c);if(c=v.call(this,c),B(this))for(var u=0;u<h.length;u++)mt(s,h[u]);return c}return h=c instanceof Element&&B(c),u=v.call(this,c),h&&ot(s,c),B(this)&&mt(s,c),u},Node.prototype.cloneNode=function(c){return c=d.call(this,!!c),this.ownerDocument.__CE_registry?Et(s,c):He(s,c),c},Node.prototype.removeChild=function(c){var h=c instanceof Element&&B(c),u=g.call(this,c);return h&&ot(s,c),u},Node.prototype.replaceChild=function(c,h){if(c instanceof DocumentFragment){var u=Me(c);if(c=w.call(this,c,h),B(this))for(ot(s,h),h=0;h<u.length;h++)mt(s,u[h]);return c}u=c instanceof Element&&B(c);var f=w.call(this,c,h),m=B(this);return m&&ot(s,h),u&&ot(s,c),m&&mt(s,c),f},E&&E.get?a(Node.prototype,E):Ir(s,function(c){a(c,{enumerable:!0,configurable:!0,get:function(){for(var h=[],u=this.firstChild;u;u=u.nextSibling)u.nodeType!==Node.COMMENT_NODE&&h.push(u.textContent);return h.join("")},set:function(h){for(;this.firstChild;)g.call(this,this.firstChild);h!=null&&h!==""&&v.call(this,document.createTextNode(h))}})})}var gt=window.customElements;function An(){var s=new ve;Vr(s),Br(s),Pe(s,DocumentFragment.prototype,{prepend:i,append:l}),zr(s),Wr(s),window.CustomElementRegistry=V,s=new V(s),document.__CE_registry=s,Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:s})}gt&&!gt.forcePolyfill&&typeof gt.define=="function"&&typeof gt.get=="function"||An(),window.__CE_installPolyfill=An}).call(self);const ie=1,on=2,Kr=4,Xn=8,Jr=16,ze=64,Gr=2,Zr=1,Qr=2,Kn="[",sn="[!",ln="]",_e={},te=Symbol(),to=["touchstart","touchmove","touchend"];function Jn(t){console.warn("hydration_mismatch")}let H=!1;function $t(t){H=t}let P;function xt(t){return P=t}function ue(){if(P===null)throw Jn(),_e;return P=P.nextSibling}function z(t){H&&(P=t)}function eo(){H&&ue()}function Ue(){for(var t=0,e=P;;){if(e.nodeType===8){var n=e.data;if(n===ln){if(t===0)return e;t-=1}else(n===Kn||n===sn)&&(t+=1)}var r=e.nextSibling;e.remove(),e=r}}const Ot=2,Gn=4,zt=8,Zn=16,wt=32,an=64,Ft=128,be=256,pt=512,Nt=1024,Ut=2048,Mt=4096,Xt=8192,no=16384,un=32768,ro=1<<18,G=Symbol("$state"),Qn=Symbol("$state.frozen"),oo=Symbol("");var cn=Array.isArray,io=Array.from,Ee=Object.keys,tr=Object.isFrozen,se=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,so=Object.prototype,lo=Array.prototype,ao=Object.getPrototypeOf;function er(t){for(var e=0;e<t.length;e++)t[e]()}const uo=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let ke=!1,Ce=!1,Ke=[],Je=[];function nr(){ke=!1;const t=Ke.slice();Ke=[],er(t)}function rr(){Ce=!1;const t=Je.slice();Je=[],er(t)}function Rt(t){ke||(ke=!0,queueMicrotask(nr)),Ke.push(t)}function co(t){Ce||(Ce=!0,uo(rr)),Je.push(t)}function fo(){ke&&nr(),Ce&&rr()}function or(t){return t===this.v}function ho(t,e){return t!=t?e==e:t!==e||t!==null&&typeof t=="object"||typeof t=="function"}function po(t){return!ho(t,this.v)}function vo(t){throw new Error("effect_in_teardown")}function mo(){throw new Error("effect_in_unowned_derived")}function go(t){throw new Error("effect_orphan")}function _o(){throw new Error("effect_update_depth_exceeded")}function yo(){throw new Error("hydration_failed")}function wo(t){throw new Error("props_invalid_value")}function bo(){throw new Error("state_unsafe_mutation")}function et(t){return{f:0,v:t,reactions:null,equals:or,version:0}}function fn(t){var n;const e=et(t);return e.equals=po,X!==null&&X.l!==null&&((n=X.l).s??(n.s=[])).push(e),e}function q(t,e){return Y!==null&&Ge()&&Y.f&Ot&&bo(),t.equals(e)||(t.v=e,t.version=cr(),ir(t,Nt),Ge()&&M!==null&&M.f&pt&&!(M.f&wt)&&(U!==null&&U.includes(t)?(ut(M,Nt),De(M)):St===null?$o([t]):St.push(t))),e}function ir(t,e){var n=t.reactions;if(n!==null)for(var r=Ge(),o=n.length,i=0;i<o;i++){var l=n[i],d=l.f;d&Nt||!r&&l===M||(ut(l,e),d&(pt|Ft)&&(d&Ot?ir(l,Ut):De(l)))}}function Eo(t){let e=Ot|Nt;M===null&&(e|=Ft);const n={deps:null,deriveds:null,equals:or,f:e,first:null,fn:t,last:null,reactions:null,v:null,version:0};if(Y!==null&&Y.f&Ot){var r=Y;r.deriveds===null?r.deriveds=[n]:r.deriveds.push(n)}return n}function sr(t){hn(t);var e=t.deriveds;if(e!==null){t.deriveds=null;for(var n=0;n<e.length;n+=1)ko(e[n])}}function lr(t){sr(t);var e=fr(t),n=(Bt||t.f&Ft)&&t.deps!==null?Ut:pt;ut(t,n),t.equals(e)||(t.v=e,t.version=cr())}function ko(t){sr(t),Ne(t,0),ut(t,Xt),t.first=t.last=t.deps=t.reactions=t.fn=null}const ar=0,Co=1;let ye=ar,le=!1,Yt=!1,dn=!1;function Ln(t){Yt=t}function On(t){dn=t}let jt=[],Wt=0,Y=null;function Mn(t){Y=t}let M=null,U=null,J=0,St=null;function $o(t){St=t}let ur=0,Bt=!1,X=null;function cr(){return ur++}function Ge(){return X!==null&&X.l===null}function ce(t){var l,d;var e=t.f;if(e&Nt)return!0;if(e&Ut){var n=t.deps;if(n!==null){var r=(e&Ft)!==0,o;if(e&be){for(o=0;o<n.length;o++)((l=n[o]).reactions??(l.reactions=[])).push(t);t.f^=be}for(o=0;o<n.length;o++){var i=n[o];if(ce(i)&&lr(i),i.version>t.version)return!0;r&&!Bt&&!((d=i==null?void 0:i.reactions)!=null&&d.includes(t))&&(i.reactions??(i.reactions=[])).push(t)}}ut(t,pt)}return!1}function xo(t,e,n){throw t}function fr(t){var e=U,n=J,r=St,o=Y,i=Bt;U=null,J=0,St=null,Y=t.f&(wt|an)?null:t,Bt=!Yt&&(t.f&Ft)!==0;try{var l=(0,t.fn)(),d=t.deps;if(U!==null){var v,p;if(d!==null){var g=J===0?U:d.slice(0,J).concat(U),w=g.length>16?new Set(g):null;for(p=J;p<d.length;p++)v=d[p],(w!==null?!w.has(v):!g.includes(v))&&dr(t,v)}if(d!==null&&J>0)for(d.length=J+U.length,p=0;p<U.length;p++)d[J+p]=U[p];else t.deps=d=U;if(!Bt)for(p=J;p<d.length;p++){v=d[p];var E=v.reactions;E===null?v.reactions=[t]:E[E.length-1]!==t&&!E.includes(t)&&E.push(t)}}else d!==null&&J<d.length&&(Ne(t,J),d.length=J);return l}finally{U=e,J=n,St=r,Y=o,Bt=i}}function dr(t,e){const n=e.reactions;let r=0;if(n!==null){r=n.length-1;const o=n.indexOf(t);o!==-1&&(r===0?e.reactions=null:(n[o]=n[r],n.pop()))}r===0&&e.f&Ot&&(ut(e,Ut),e.f&(Ft|be)||(e.f^=be),Ne(e,0))}function Ne(t,e){var n=t.deps;if(n!==null)for(var r=e===0?null:n.slice(0,e),o=new Set,i=e;i<n.length;i++){var l=n[i];o.has(l)||(o.add(l),(r===null||!r.includes(l))&&dr(t,l))}}function hn(t,e=!1){var n=t.first;for(t.first=t.last=null;n!==null;){var r=n.next;Gt(n,e),n=r}}function Ae(t){var e=t.f;if(!(e&Xt)){ut(t,pt);var n=t.ctx,r=M,o=X;M=t,X=n;try{e&Zn||hn(t),wr(t);var i=fr(t);t.teardown=typeof i=="function"?i:null,t.version=ur}catch(l){xo(l)}finally{M=r,X=o}}}function hr(){Wt>1e3&&(Wt=0,_o()),Wt++}function pr(t){var e=t.length;if(e!==0){hr();var n=Yt;Yt=!0;try{for(var r=0;r<e;r++){var o=t[r];if(o.first===null&&!(o.f&wt))Rn([o]);else{var i=[];vr(o,i),Rn(i)}}}finally{Yt=n}}}function Rn(t){var e=t.length;if(e!==0)for(var n=0;n<e;n++){var r=t[n];!(r.f&(Xt|Mt))&&ce(r)&&(Ae(r),r.deps===null&&r.first===null&&r.nodes===null&&(r.teardown===null?br(r):r.fn=null))}}function To(){if(le=!1,Wt>1001)return;const t=jt;jt=[],pr(t),le||(Wt=0)}function De(t){ye===ar&&(le||(le=!0,queueMicrotask(To)));for(var e=t;e.parent!==null;){e=e.parent;var n=e.f;if(n&wt){if(!(n&pt))return;ut(e,Ut)}}jt.push(e)}function vr(t,e){var n=t.first,r=[];t:for(;n!==null;){var o=n.f,i=(o&(Xt|Mt))===0,l=o&wt,d=(o&pt)!==0,v=n.first;if(i&&(!l||!d)){if(l&&ut(n,pt),o&zt){if(!l&&ce(n)&&(Ae(n),v=n.first),v!==null){n=v;continue}}else if(o&Gn)if(l||d){if(v!==null){n=v;continue}}else r.push(n)}var p=n.next;if(p===null){let E=n.parent;for(;E!==null;){if(t===E)break t;var g=E.next;if(g!==null){n=g;continue t}E=E.parent}}n=p}for(var w=0;w<r.length;w++)v=r[w],e.push(v),vr(v,e)}function Kt(t){var e=ye,n=jt;try{hr();const o=[];ye=Co,jt=o,le=!1,pr(n);var r=t==null?void 0:t();return fo(),(jt.length>0||o.length>0)&&Kt(),Wt=0,r}finally{ye=e,jt=n}}function N(t){var e=t.f;if(e&Xt)return t.v;if(Y!==null){var n=Y.deps;U===null&&n!==null&&n[J]===t?J++:(n===null||J===0||n[J-1]!==t)&&(U===null?U=[t]:U[U.length-1]!==t&&U.push(t)),St!==null&&M!==null&&M.f&pt&&!(M.f&wt)&&St.includes(t)&&(ut(M,Nt),De(M))}if(e&Ot){var r=t;ce(r)&&lr(r)}return t.v}function mr(t){const e=Y;try{return Y=null,t()}finally{Y=e}}const So=~(Nt|Ut|pt);function ut(t,e){t.f=t.f&So|e}function No(t){return typeof t=="object"&&t!==null&&typeof t.f=="number"}function fe(t,e=!1,n){X={p:X,c:null,e:null,m:!1,s:t,x:null,l:null},e||(X.l={s:null,u:null,r1:[],r2:et(!1)})}function de(t){const e=X;if(e!==null){t!==void 0&&(e.x=t);const r=e.e;if(r!==null){e.e=null;for(var n=0;n<r.length;n++)pn(r[n])}X=e.p,e.m=!0}return t||{}}function lt(t){return No(t)?N(t):t}function Ao(t){M===null&&Y===null&&go(),Y!==null&&Y.f&Ft&&mo(),dn&&vo()}function Fn(t,e){var n=e.last;n===null?e.last=e.first=t:(n.next=t,t.prev=n,e.last=t)}function Jt(t,e,n,r=!0){var o=(t&an)!==0,i={ctx:X,deps:null,nodes:null,f:t|Nt,first:null,fn:e,last:null,next:null,parent:o?null:M,prev:null,teardown:null,transitions:null,version:0};if(n){var l=Yt;try{Ln(!0),Ae(i),i.f|=no}catch(v){throw Gt(i),v}finally{Ln(l)}}else e!==null&&De(i);var d=n&&i.deps===null&&i.first===null&&i.nodes===null&&i.teardown===null;return!d&&!o&&r&&(M!==null&&Fn(i,M),Y!==null&&Y.f&Ot&&Fn(i,Y)),i}function gr(t){const e=Jt(zt,null,!1);return ut(e,pt),e.teardown=t,e}function Ze(t){Ao();var e=M!==null&&(M.f&zt)!==0&&X!==null&&!X.m;if(e){var n=X;(n.e??(n.e=[])).push(t)}else{var r=pn(t);return r}}function _r(t){const e=Jt(an,t,!0);return()=>{Gt(e)}}function pn(t){return Jt(Gn,t,!1)}function he(t){return Jt(zt,t,!0)}function yt(t){return he(t)}function yr(t,e=0){return Jt(zt|Zn|e,t,!0)}function ae(t,e=!0){return Jt(zt|wt,t,!0,e)}function wr(t){var e=t.teardown;if(e!==null){const n=dn,r=Y;On(!0),Mn(null);try{e.call(null)}finally{On(n),Mn(r)}}}function Gt(t,e=!0){var n=!1;if((e||t.f&ro)&&t.nodes!==null){for(var r=t.nodes.start,o=t.nodes.end;r!==null;){var i=r===o?null:r.nextSibling;r.remove(),r=i}n=!0}if(hn(t,e&&!n),Ne(t,0),ut(t,Xt),t.transitions)for(const d of t.transitions)d.stop();wr(t);var l=t.parent;l!==null&&t.f&wt&&l.first!==null&&br(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.parent=t.fn=t.nodes=null}function br(t){var e=t.parent,n=t.prev,r=t.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),e!==null&&(e.first===t&&(e.first=r),e.last===t&&(e.last=n))}function Qe(t,e){var n=[];vn(t,n,!0),Er(n,()=>{Gt(t),e&&e()})}function Er(t,e){var n=t.length;if(n>0){var r=()=>--n||e();for(var o of t)o.out(r)}else e()}function vn(t,e,n){if(!(t.f&Mt)){if(t.f^=Mt,t.transitions!==null)for(const l of t.transitions)(l.is_global||n)&&e.push(l);for(var r=t.first;r!==null;){var o=r.next,i=(r.f&un)!==0||(r.f&wt)!==0;vn(r,e,i?n:!1),r=o}}}function $e(t){kr(t,!0)}function kr(t,e){if(t.f&Mt){t.f^=Mt,ce(t)&&Ae(t);for(var n=t.first;n!==null;){var r=n.next,o=(n.f&un)!==0||(n.f&wt)!==0;kr(n,o?e:!1),n=r}if(t.transitions!==null)for(const i of t.transitions)(i.is_global||e)&&i.in()}}function dt(t,e=null,n){if(typeof t=="object"&&t!=null&&!tr(t)&&!(Qn in t)){if(G in t){const o=t[G];if(o.t===t||o.p===t)return o.p}const r=ao(t);if(r===so||r===lo){const o=new Proxy(t,Do);return se(t,G,{value:{s:new Map,v:et(0),a:cn(t),p:o,t},writable:!0,enumerable:!1}),o}}return t}function Hn(t,e=1){q(t,t.v+e)}const Do={defineProperty(t,e,n){if(n.value){const r=t[G],o=r.s.get(e);o!==void 0&&q(o,dt(n.value,r))}return Reflect.defineProperty(t,e,n)},deleteProperty(t,e){const n=t[G],r=n.s.get(e),o=n.a,i=delete t[e];if(o&&i){const l=n.s.get("length"),d=t.length-1;l!==void 0&&l.v!==d&&q(l,d)}return r!==void 0&&q(r,te),i&&Hn(n.v),i},get(t,e,n){var i;if(e===G)return Reflect.get(t,G);const r=t[G];let o=r.s.get(e);if(o===void 0&&(!(e in t)||(i=Xe(t,e))!=null&&i.writable)&&(o=et(dt(t[e],r)),r.s.set(e,o)),o!==void 0){const l=N(o);return l===te?void 0:l}return Reflect.get(t,e,n)},getOwnPropertyDescriptor(t,e){const n=Reflect.getOwnPropertyDescriptor(t,e);if(n&&"value"in n){const o=t[G].s.get(e);o&&(n.value=N(o))}return n},has(t,e){var i;if(e===G)return!0;const n=t[G],r=Reflect.has(t,e);let o=n.s.get(e);return(o!==void 0||M!==null&&(!r||(i=Xe(t,e))!=null&&i.writable))&&(o===void 0&&(o=et(r?dt(t[e],n):te),n.s.set(e,o)),N(o)===te)?!1:r},set(t,e,n,r){const o=t[G];let i=o.s.get(e);i===void 0&&(mr(()=>r[e]),i=o.s.get(e)),i!==void 0&&q(i,dt(n,o));const l=o.a,d=!(e in t);if(l&&e==="length")for(let p=n;p<t.length;p+=1){const g=o.s.get(p+"");g!==void 0&&q(g,te)}var v=Reflect.getOwnPropertyDescriptor(t,e);if(v!=null&&v.set?v.set.call(r,n):t[e]=n,d){if(l){const p=o.s.get("length"),g=t.length;p!==void 0&&p.v!==g&&q(p,g)}Hn(o.v)}return!0},ownKeys(t){const e=t[G];return N(e.v),Reflect.ownKeys(t)}};function xe(t){if(t!==null&&typeof t=="object"&&G in t){var e=t[G];if(e)return e.p}return t}function jo(t,e){return Object.is(xe(t),xe(e))}var Te,Dt;function Cr(){if(Te===void 0){Te=window,Dt=document;var t=Element.prototype;t.__click=void 0,t.__className="",t.__attributes=null,t.__e=void 0,Text.prototype.__t=void 0}}function pe(){return document.createTextNode("")}function Z(t){if(!H)return t.firstChild;var e=P.firstChild;return e===null&&(e=P.appendChild(pe())),xt(e),e}function mn(t,e){if(!H){var n=t.firstChild;return n instanceof Comment&&n.data===""?n.nextSibling:n}return P}function F(t,e=!1){if(!H)return t.nextSibling;var n=P.nextSibling,r=n.nodeType;if(e&&r!==3){var o=pe();return n==null||n.before(o),xt(o),o}return xt(n),n}function gn(t){t.textContent=""}const $r=new Set,tn=new Set;function Lo(t,e,n,r){function o(i){if(r.capture||ne.call(e,i),!i.cancelBubble)return n.call(this,i)}return t.startsWith("pointer")||t==="wheel"?Rt(()=>{e.addEventListener(t,o,r)}):e.addEventListener(t,o,r),o}function _t(t,e,n,r,o){var i={capture:r,passive:o},l=Lo(t,e,n,i);(e===document.body||e===window||e===document)&&gr(()=>{e.removeEventListener(t,l,i)})}function xr(t){for(var e=0;e<t.length;e++)$r.add(t[e]);for(var n of tn)n(t)}function ne(t){var D;var e=this,n=e.ownerDocument,r=t.type,o=((D=t.composedPath)==null?void 0:D.call(t))||[],i=o[0]||t.target,l=0,d=t.__root;if(d){var v=o.indexOf(d);if(v!==-1&&(e===document||e===window)){t.__root=e;return}var p=o.indexOf(e);if(p===-1)return;v<=p&&(l=v)}if(i=o[l]||t.target,i!==e){se(t,"currentTarget",{configurable:!0,get(){return i||n}});try{for(var g,w=[];i!==null;){var E=i.parentNode||i.host||null;try{var _=i["__"+r];if(_!==void 0&&!i.disabled)if(cn(_)){var[k,...$]=_;k.apply(i,[t,...$])}else _.call(i,t)}catch(O){g?w.push(O):g=O}if(t.cancelBubble||E===e||E===null)break;i=E}if(g){for(let O of w)queueMicrotask(()=>{throw O});throw g}}finally{t.__root=e,i=e}}}function Oo(t){var e=document.createElement("template");return e.innerHTML=t,e.content}function Vt(t,e){M.nodes??(M.nodes={start:t,end:e})}function bt(t,e){var n=(e&Zr)!==0,r=(e&Qr)!==0,o,i=!t.startsWith("<!>");return()=>{if(H)return Vt(P,null),P;o||(o=Oo(i?t:"<!>"+t),n||(o=o.firstChild));var l=r?document.importNode(o,!0):o.cloneNode(!0);if(n){var d=l.firstChild,v=l.lastChild;Vt(d,v)}else Vt(l,l);return l}}function Mo(){if(H)return Vt(P,null),P;var t=document.createDocumentFragment(),e=document.createComment(""),n=pe();return t.append(e,n),Vt(e,n),t}function at(t,e){if(H){M.nodes.end=P,ue();return}t!==null&&t.before(e)}function Be(t,e){(t.__t??(t.__t=t.nodeValue))!==e&&(t.nodeValue=t.__t=e)}function Tr(t,e){const n=e.anchor??e.target.appendChild(pe());return Sr(t,{...e,anchor:n})}function Ro(t,e){e.intro=e.intro??!1;const n=e.target,r=H,o=P;try{for(var i=n.firstChild;i&&(i.nodeType!==8||i.data!==Kn);)i=i.nextSibling;if(!i)throw _e;$t(!0),xt(i),ue();const l=Sr(t,{...e,anchor:i});if(P===null||P.nodeType!==8||P.data!==ln)throw Jn(),_e;return $t(!1),l}catch(l){if(l===_e)return e.recover===!1&&yo(),Cr(),gn(n),$t(!1),Tr(t,e);throw l}finally{$t(r),xt(o)}}const qt=new Map;function Sr(t,{target:e,anchor:n,props:r={},events:o,context:i,intro:l=!0}){Cr();var d=new Set,v=w=>{for(var E=0;E<w.length;E++){var _=w[E];if(!d.has(_)){d.add(_);var k=to.includes(_);e.addEventListener(_,ne,{passive:k});var $=qt.get(_);$===void 0?(document.addEventListener(_,ne,{passive:k}),qt.set(_,1)):qt.set(_,$+1)}}};v(io($r)),tn.add(v);var p=void 0,g=_r(()=>(ae(()=>{if(i){fe({});var w=X;w.c=i}o&&(r.$$events=o),H&&Vt(n,null),p=t(n,r)||{},H&&(M.nodes.end=P),i&&de()}),()=>{for(var w of d){e.removeEventListener(w,ne);var E=qt.get(w);--E===0?(document.removeEventListener(w,ne),qt.delete(w)):qt.set(w,E)}tn.delete(v),en.delete(p)}));return en.set(p,g),p}let en=new WeakMap;function Fo(t){const e=en.get(t);e==null||e()}function Se(t,e,n,r=null,o=!1){H&&ue();var i=t,l=null,d=null,v=null,p=o?un:0;yr(()=>{if(v===(v=!!e()))return;let g=!1;if(H){const w=i.data===sn;v===w&&(i=Ue(),xt(i),$t(!1),g=!0)}v?(l?$e(l):l=ae(()=>n(i)),d&&Qe(d,()=>{d=null})):(d?$e(d):r&&(d=ae(()=>r(i))),l&&Qe(l,()=>{l=null})),g&&$t(!0)},p),H&&(i=P)}let Ye=null;function Ho(t,e){return e}function Po(t,e,n,r){for(var o=[],i=e.length,l=0;l<i;l++)vn(e[l].e,o,!0);var d=i>0&&o.length===0&&n!==null;if(d){var v=n.parentNode;gn(v),v.append(n),r.clear(),Tt(t,e[0].prev,e[i-1].next)}Er(o,()=>{for(var p=0;p<i;p++){var g=e[p];d||(r.delete(g.k),Tt(t,g.prev,g.next)),Gt(g.e,!d)}})}function _n(t,e,n,r,o,i=null){var l=t,d={flags:e,items:new Map,first:null},v=(e&Xn)!==0;if(v){var p=t;l=H?xt(p.firstChild):p.appendChild(pe())}H&&ue();var g=null;yr(()=>{var w=n(),E=cn(w)?w:w==null?[]:Array.from(w),_=E.length,k=d.flags;k&ze&&!tr(E)&&!(Qn in E)&&!(G in E)&&(k^=ze,k&Kr&&!(k&ie)&&(k^=ie));let $=!1;if(H){var D=l.data===sn;D!==(_===0)&&(l=Ue(),xt(l),$t(!1),$=!0)}if(H){for(var O=null,x,C=0;C<_;C++){if(P.nodeType===8&&P.data===ln){l=P,$=!0,$t(!1);break}var j=E[C],ct=r(j,C);x=Nr(P,d,O,null,j,ct,C,o,k),d.items.set(ct,x),O=x}_>0&&xt(Ue())}H||Io(E,d,l,o,k,r),i!==null&&(_===0?g?$e(g):g=ae(()=>i(l)):g!==null&&Qe(g,()=>{g=null})),$&&$t(!0)}),H&&(l=P)}function Io(t,e,n,r,o,i){var nt,rt,it,vt;var l=(o&Jr)!==0,d=(o&(ie|on))!==0,v=t.length,p=e.items,g=e.first,w=g,E=new Set,_=null,k=new Set,$=[],D=[],O,x,C,j;if(l)for(j=0;j<v;j+=1)O=t[j],x=i(O,j),C=p.get(x),C!==void 0&&((nt=C.a)==null||nt.measure(),k.add(C));for(j=0;j<v;j+=1){if(O=t[j],x=i(O,j),C=p.get(x),C===void 0){var ct=w?w.e.nodes.start:n;_=Nr(ct,e,_,_===null?e.first:_.next,O,x,j,r,o),p.set(x,_),$=[],D=[],w=_.next;continue}if(d&&qo(C,O,j,o),C.e.f&Mt&&($e(C.e),l&&((rt=C.a)==null||rt.unfix(),k.delete(C))),C!==w){if(E.has(C)){if($.length<D.length){var A=D[0],S;_=A.prev;var K=$[0],R=$[$.length-1];for(S=0;S<$.length;S+=1)Pn($[S],A,n);for(S=0;S<D.length;S+=1)E.delete(D[S]);Tt(e,K.prev,R.next),Tt(e,_,K),Tt(e,R,A),w=A,_=R,j-=1,$=[],D=[]}else E.delete(C),Pn(C,w,n),Tt(e,C.prev,C.next),Tt(e,C,_===null?e.first:_.next),Tt(e,_,C),_=C;continue}for($=[],D=[];w!==null&&w.k!==x;)E.add(w),D.push(w),w=w.next;if(w===null)continue;C=w}$.push(C),_=C,w=C.next}const L=Array.from(E);for(;w!==null;)L.push(w),w=w.next;var W=L.length;if(W>0){var Q=o&Xn&&v===0?n:null;if(l){for(j=0;j<W;j+=1)(it=L[j].a)==null||it.measure();for(j=0;j<W;j+=1)(vt=L[j].a)==null||vt.fix()}Po(e,L,Q,p)}l&&Rt(()=>{var Zt;for(C of k)(Zt=C.a)==null||Zt.apply()}),M.first=e.first&&e.first.e,M.last=_&&_.e}function qo(t,e,n,r){r&ie&&q(t.v,e),r&on?q(t.i,n):t.i=n}function Nr(t,e,n,r,o,i,l,d,v){var p=Ye;try{var g=(v&ie)!==0,w=(v&ze)===0,E=g?w?fn(o):et(o):o,_=v&on?et(l):l,k={i:_,v:E,k:i,a:null,e:null,prev:n,next:r};return Ye=k,k.e=ae(()=>d(t,E,_),H),k.e.prev=n&&n.e,k.e.next=r&&r.e,n===null?e.first=k:(n.next=k,n.e.next=k.e),r!==null&&(r.prev=k,r.e.prev=k.e),k}finally{Ye=p}}function Pn(t,e,n){for(var r=t.next?t.next.e.nodes.start:n,o=e?e.e.nodes.start:n,i=t.e.nodes.start;i!==r;){var l=i.nextSibling;o.before(i),i=l}}function Tt(t,e,n){e===null?t.first=n:(e.next=n,e.e.next=n&&n.e),n!==null&&(n.prev=e,n.e.prev=e&&e.e)}var In=new Set;function yn(t,e){{if(In.has(e))return;In.add(e)}Rt(()=>{var n=t.getRootNode(),r=n.host?n:n.head??n.ownerDocument.head;if(!r.querySelector("#"+e.hash)){const o=document.createElement("style");o.id=e.hash,o.textContent=e.code,r.appendChild(o)}})}function Bo(t,e){{const n=document.body;t.autofocus=!0,Rt(()=>{document.activeElement===n&&t.focus()})}}function Yo(t){H&&t.firstChild!==null&&gn(t)}let qn=!1;function Ar(){qn||(qn=!0,document.addEventListener("reset",t=>{Promise.resolve().then(()=>{var e;if(!t.defaultPrevented)for(const n of t.target.elements)(e=n.__on_r)==null||e.call(n)})},{capture:!0}))}function Wo(t){if(H){var e=!1,n=()=>{if(!e){if(e=!0,t.hasAttribute("value")){var r=t.value;ht(t,"value",null),t.value=r}if(t.hasAttribute("checked")){var o=t.checked;ht(t,"checked",null),t.checked=o}}};t.__on_r=n,co(n),Ar()}}function Vo(t,e){var n=t.__attributes??(t.__attributes={});n.value!==(n.value=e)&&(t.value=e)}function ht(t,e,n){n=n==null?null:n+"";var r=t.__attributes??(t.__attributes={});H&&(r[e]=t.getAttribute(e),e==="src"||e==="href"||e==="srcset")||r[e]!==(r[e]=n)&&(e==="loading"&&(t[oo]=n),n===null?t.removeAttribute(e):t.setAttribute(e,n))}function oe(t,e,n){n?t.classList.add(e):t.classList.remove(e)}function Dr(t,e,n,r=n){t.addEventListener(e,n);const o=t.__on_r;o?t.__on_r=()=>{o(),r()}:t.__on_r=r,Ar()}function zo(t,e,n){Dr(t,"input",()=>{n(Yn(t)?Wn(t.value):t.value)}),he(()=>{var r=e();if(H&&t.defaultValue!==t.value){n(t.value);return}Yn(t)&&r===Wn(t.value)||t.type==="date"&&!r&&!t.value||(t.value=r??"")})}const We=new Set;function Uo(t,e,n,r,o){var i=n.getAttribute("type")==="checkbox",l=t;let d=!1;if(e!==null)for(var v of e)l=l[v]??(l[v]=[]);l.push(n),Dr(n,"change",()=>{var p=n.__value;i&&(p=Bn(l,p,n.checked)),o(p)},()=>o(i?[]:null)),he(()=>{var p=r();if(H&&n.defaultChecked!==n.checked){d=!0;return}i?(p=p||[],n.checked=xe(p).includes(xe(n.__value))):n.checked=jo(n.__value,p)}),gr(()=>{var p=l.indexOf(n);p!==-1&&l.splice(p,1)}),We.has(l)||(We.add(l),Rt(()=>{l.sort((p,g)=>p.compareDocumentPosition(g)===4?-1:1),We.delete(l)})),Rt(()=>{if(d){var p;if(i)p=Bn(l,p,n.checked);else{var g=l.find(w=>w.checked);p=g==null?void 0:g.__value}o(p)}})}function Bn(t,e,n){for(var r=new Set,o=0;o<t.length;o+=1)t[o].checked&&r.add(t[o].__value);return n||r.delete(e),Array.from(r)}function Yn(t){var e=t.type;return e==="number"||e==="range"}function Wn(t){return t===""?null:+t}function Vn(t,e){var r;var n=t&&((r=t[G])==null?void 0:r.t);return t===e||n===e}function nn(t={},e,n,r){return pn(()=>{var o,i;return he(()=>{o=i,i=[],mr(()=>{t!==n(...i)&&(e(t,...i),o&&Vn(n(...o),t)&&e(null,...o))})}),()=>{Rt(()=>{i&&Vn(n(...i),t)&&e(null,...i)})}}),t}function je(t,e,n,r){var k;var o=(n&Gr)!==0,i=t[e],l=(k=Xe(t,e))==null?void 0:k.set,d=r,v=()=>d;i===void 0&&r!==void 0&&(l&&o&&wo(),i=v(),l&&l(i));var p;if(p=()=>{var $=t[e];return $===void 0?v():$},l){var g=t.$$legacy;return function($,D){return arguments.length>0?((!D||g)&&l(D?p():$),$):p()}}var w=!1,E=fn(i),_=Eo(()=>{var $=p(),D=N(E);return w?(w=!1,D):E.v=$});return function($,D){var O=N(_);if(arguments.length>0){const x=D?N(_):$;return _.equals(x)||(w=!0,q(E,x),N(_)),$}return O}}function Xo(t){return new Ko(t)}var kt,st;class Ko{constructor(e){Ie(this,kt);Ie(this,st);var n=new Map,r=(i,l)=>{var d=fn(l);return n.set(i,d),d};const o=new Proxy({...e.props||{},$$events:{}},{get(i,l){return N(n.get(l)??r(l,Reflect.get(i,l)))},has(i,l){return N(n.get(l)??r(l,Reflect.get(i,l))),Reflect.has(i,l)},set(i,l,d){return q(n.get(l)??r(l,d),d),Reflect.set(i,l,d)}});qe(this,st,(e.hydrate?Ro:Tr)(e.component,{target:e.target,props:o,context:e.context,intro:e.intro??!1,recover:e.recover})),Kt(),qe(this,kt,o.$$events);for(const i of Object.keys(tt(this,st)))i==="$set"||i==="$destroy"||i==="$on"||se(this,i,{get(){return tt(this,st)[i]},set(l){tt(this,st)[i]=l},enumerable:!0});tt(this,st).$set=i=>{Object.assign(o,i)},tt(this,st).$destroy=()=>{Fo(tt(this,st))}}$set(e){tt(this,st).$set(e)}$on(e,n){tt(this,kt)[e]=tt(this,kt)[e]||[];const r=(...o)=>n.call(this,...o);return tt(this,kt)[e].push(r),()=>{tt(this,kt)[e]=tt(this,kt)[e].filter(o=>o!==r)}}$destroy(){tt(this,st).$destroy()}}kt=new WeakMap,st=new WeakMap;let jr;typeof HTMLElement=="function"&&(jr=class extends HTMLElement{constructor(e,n,r){super();ft(this,"$$ctor");ft(this,"$$s");ft(this,"$$c");ft(this,"$$cn",!1);ft(this,"$$d",{});ft(this,"$$r",!1);ft(this,"$$p_d",{});ft(this,"$$l",{});ft(this,"$$l_u",new Map);ft(this,"$$me");this.$$ctor=e,this.$$s=n,r&&this.attachShadow({mode:"open"})}addEventListener(e,n,r){if(this.$$l[e]=this.$$l[e]||[],this.$$l[e].push(n),this.$$c){const o=this.$$c.$on(e,n);this.$$l_u.set(n,o)}super.addEventListener(e,n,r)}removeEventListener(e,n,r){if(super.removeEventListener(e,n,r),this.$$c){const o=this.$$l_u.get(n);o&&(o(),this.$$l_u.delete(n))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){let e=function(o){return i=>{const l=document.createElement("slot");o!=="default"&&(l.name=o),at(i,l)}};if(await Promise.resolve(),!this.$$cn||this.$$c)return;const n={},r=Jo(this);for(const o of this.$$s)o in r&&(o==="default"&&!this.$$d.children?(this.$$d.children=e(o),n.default=!0):n[o]=e(o));for(const o of this.attributes){const i=this.$$g_p(o.name);i in this.$$d||(this.$$d[i]=we(i,o.value,this.$$p_d,"toProp"))}for(const o in this.$$p_d)!(o in this.$$d)&&this[o]!==void 0&&(this.$$d[o]=this[o],delete this[o]);this.$$c=Xo({component:this.$$ctor,target:this.shadowRoot||this,props:{...this.$$d,$$slots:n,$$host:this}}),this.$$me=he(()=>{var o;this.$$r=!0;for(const i of Ee(this.$$c)){if(!((o=this.$$p_d[i])!=null&&o.reflect))continue;this.$$d[i]=this.$$c[i];const l=we(i,this.$$d[i],this.$$p_d,"toAttribute");l==null?this.removeAttribute(this.$$p_d[i].attribute||i):this.setAttribute(this.$$p_d[i].attribute||i,l)}this.$$r=!1});for(const o in this.$$l)for(const i of this.$$l[o]){const l=this.$$c.$on(o,i);this.$$l_u.set(i,l)}this.$$l={}}}attributeChangedCallback(e,n,r){var o;this.$$r||(e=this.$$g_p(e),this.$$d[e]=we(e,r,this.$$p_d,"toProp"),(o=this.$$c)==null||o.$set({[e]:this.$$d[e]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then(()=>{!this.$$cn&&this.$$c&&(this.$$c.$destroy(),Gt(this.$$me),this.$$c=void 0)})}$$g_p(e){return Ee(this.$$p_d).find(n=>this.$$p_d[n].attribute===e||!this.$$p_d[n].attribute&&n.toLowerCase()===e)||e}});function we(t,e,n,r){var i;const o=(i=n[t])==null?void 0:i.type;if(e=o==="Boolean"&&typeof e!="boolean"?e!=null:e,!r||!n[t])return e;if(r==="toAttribute")switch(o){case"Object":case"Array":return e==null?null:JSON.stringify(e);case"Boolean":return e?"":null;case"Number":return e??null;default:return e}else switch(o){case"Object":case"Array":return e&&JSON.parse(e);case"Boolean":return e;case"Number":return e!=null?+e:e;default:return e}}function Jo(t){const e={};return t.childNodes.forEach(n=>{e[n.slot||"default"]=!0}),e}function Le(t,e,n,r,o,i){let l=class extends jr{constructor(){super(t,n,o),this.$$p_d=e}static get observedAttributes(){return Ee(e).map(d=>(e[d].attribute||d).toLowerCase())}};return Ee(e).forEach(d=>{se(l.prototype,d,{get(){return this.$$c&&d in this.$$c?this.$$c[d]:this.$$d[d]},set(v){var p;v=we(d,v,e),this.$$d[d]=v,(p=this.$$c)==null||p.$set({[d]:v})}})}),r.forEach(d=>{se(l.prototype,d,{get(){var v;return(v=this.$$c)==null?void 0:v[d]}})}),t.element=l,l}const At=new Map([["yellow","#F8B920"],["red","#FF4646"],["blue","#0064FF"],["green","#00C564"]]),Go=["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","OPTION"];function Lr(t){const e=document.documentElement.lang||void 0,n=t.map(d=>d.trim().toLocaleLowerCase(e)),r=n.map(()=>({start:null,end:null,shift:0})),o=n.map(()=>[]),i=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,d=>{var v,p;return Go.includes((v=d.parentNode)==null?void 0:v.tagName)||((p=d.parentNode)==null?void 0:p.contentEditable)=="true"?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let l;for(;l=i.nextNode();)if(l!=null&&l.nodeValue)for(let d=0;d<l.nodeValue.length;d++){const v=l.nodeValue[d].toLocaleLowerCase(e).trim();v&&n.forEach((p,g)=>{var E;for(;p[r[g].shift]&&!p[r[g].shift].trim();)r[g].shift++;let w=p[r[g].shift]===v;if(!w&&r[g].shift&&(r[g].shift=0,w=p[r[g].shift]===v),w&&(r[g].shift||(r[g].start=[l,d]),r[g].end=[l,d],r[g].shift++),r[g].shift>=p.length){const _=document.createRange();_.setStart(r[g].start[0],r[g].start[1]),_.setEnd(r[g].end[0],r[g].end[1]+1),!_.collapsed&&((E=_.commonAncestorContainer.parentElement)!=null&&E.checkVisibility())?o[g].push(_):_.detach(),w=!1}w||(r[g].shift=0,r[g].start=null,r[g].end=null)})}return o}const Lt=`rh-${new Date().getTime()}-`,Oe="highlights"in CSS;function Zo(t){if(!t.length&&!CSS.highlights.size)return;const e=[];if(CSS.highlights.clear(),t.length){const r=Lr(t.map(({text:o})=>o||""));for(const o in t){if(!r[o].length)continue;const{_id:i,color:l,note:d}=t[o],v=`${Lt}${i}`;CSS.highlights.set(v,new Highlight(...r[o]));const p=r[o][0].getBoundingClientRect();e.push(`
                ::highlight(${v}) {
                    all: unset;
                    background-color: color-mix(in srgb, ${At.get(l)||l||"yellow"}, white 60%) !important;
                    color: color-mix(in srgb, ${At.get(l)||l||"yellow"}, black 80%) !important;
                    ${d?"text-decoration: underline wavy; -webkit-text-decoration: underline wavy;":""}
                    text-decoration-thickness: from-font;
                }

                /* fuck you dark reader */
                html[data-darkreader-scheme="dark"] ::highlight(${v}) {
                    color: CanvasText !important;
                }

                :root {
                    --highlight-${i}-top: ${(100/document.documentElement.scrollHeight*(window.scrollY+p.top-10)).toFixed(2)}%;
                }
            `);for(const g of r[o])g.detach()}}const n=(()=>{let r=document.getElementById(Lt);return r||(r=document.createElement("style"),r.id=Lt,document.head.appendChild(r)),r})();n.innerHTML=e.join(`
`)}function Qo(){var t;(t=document.getElementById(Lt))==null||t.remove()}function ti(t){var e;for(const[n,r]of CSS.highlights){const o=n.replace(Lt,"");if(t==o)for(const i of r){(e=i.startContainer.parentElement)==null||e.scrollIntoView({behavior:"smooth",block:"start"});break}}}function ei(t){let e;for(const[n,r]of CSS.highlights)for(const o of r){const i=t.compareBoundaryPoints(Range.START_TO_START,o),l=t.compareBoundaryPoints(Range.END_TO_END,o);(i==0&&l==0||t!=null&&t.collapsed&&i>=0&&l<=0)&&(e=[n.replace(Lt,""),o])}if(e)return e[0].replace(Lt,"")}const Ct=`rh-${new Date().getTime()}`;function ni(t){const e=document.body.querySelectorAll(`.${Ct}`);if(!t.length&&!e.length)return;e.forEach(i=>i.outerHTML=i.innerText);const n=[],r=Lr(t.map(({text:i})=>i||""));for(const i in t){const{_id:l,color:d}=t[i];for(const v of r[i]){const p=document.createElement("mark");p.className=Ct,p.setAttribute("data-id",String(l)),p.append(v.extractContents()),v.insertNode(p),v.detach()}n.push(`
            .${Ct}[data-id="${l}"] {
                all: unset;
                display: inline-block !important;
                background-color: white !important;
                background-image: linear-gradient(to bottom, ${zn(At.get(d)||d,.4)} 0, ${zn(At.get(d)||d,.4)} 100%) !important;
                color: black !important;
            }
        `)}const o=(()=>{let i=document.getElementById(Ct);return i||(i=document.createElement("style"),i.id=Ct,document.head.appendChild(i)),i})();o.innerHTML=n.join(`
`)}function ri(){var t;document.body.querySelectorAll(`.${Ct}`).forEach(e=>e.outerHTML=e.innerText),(t=document.getElementById(Ct))==null||t.remove()}function oi(t){const e=document.body.querySelector(`.${Ct}[data-id="${t}"]`);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}function ii(t){const e=t.commonAncestorContainer.nodeType==Node.ELEMENT_NODE?t.commonAncestorContainer:t.commonAncestorContainer.parentElement;if((e==null?void 0:e.className)==Ct){if(!t.collapsed){const n=new Range;n.selectNodeContents(t.commonAncestorContainer);const r=t.compareBoundaryPoints(Range.START_TO_START,n),o=t.compareBoundaryPoints(Range.END_TO_END,n);if(n.detach(),r!=0||o!=0)return}return e.getAttribute("data-id")||void 0}}function zn(t,e){if(!t)return t;const n=parseInt(t.slice(1,3),16),r=parseInt(t.slice(3,5),16),o=parseInt(t.slice(5,7),16);return`rgba(${n}, ${r}, ${o}, ${e})`}function si(t){return Oe?Zo(t):ni(t)}function Ve(t){return si(t)}function li(){return Oe?Qo():ri()}function Or(t){return Oe?ti(t):oi(t)}function Mr(){var n,r,o;const t=document.getSelection();if(!(t!=null&&t.rangeCount))return;const e=t.getRangeAt(0);if(!((o=((n=e==null?void 0:e.commonAncestorContainer)==null?void 0:n.nodeType)==1?e==null?void 0:e.commonAncestorContainer:(r=e==null?void 0:e.commonAncestorContainer)==null?void 0:r.parentElement)!=null&&o.closest('[contenteditable=""], [contenteditable=true]')))return e}function re(){const t=document.getSelection();t!=null&&t.rangeCount&&t.removeAllRanges()}function ai(t){return Oe?ei(t):ii(t)}function Un(t){if(!t)return"";var e=document.createElement("div");e.appendChild(t.cloneContents().cloneNode(!0)),document.body.appendChild(e);const n=e.innerText;return document.body.removeChild(e),e=void 0,n}function ui(t,e,n){let r=et(dt([])),o=et(!1),i=et(!1),l=et(void 0);function d(_){const k=ai(_);if(k)return N(r).find(D=>D._id==k);if(Un(_).trim())return{text:Un(_).trim()}}function v(_){const k={...typeof _._id=="string"?{_id:_._id}:{},...typeof _.text=="string"?{text:_.text}:{},...typeof _.note=="string"?{note:_.note}:{},color:_.color||"yellow"};if(!k.text)return;const $=N(r).findIndex(D=>{var O,x;return D._id==k._id||((O=D.text)==null?void 0:O.toLocaleLowerCase().trim())===((x=k.text)==null?void 0:x.toLocaleLowerCase().trim())});$!=-1?(N(r)[$]=k,e(k)):(N(r).push(k),t(k))}function p({_id:_}){q(r,dt(N(r).filter(k=>k._id!=_))),n({_id:_})}function g(_){q(l,dt(JSON.parse(JSON.stringify(_))))}function w(){N(l)&&(v(N(l)),q(l,void 0))}function E(){q(l,void 0)}return{get highlights(){return N(r)},set highlights(_){q(r,dt(_))},get pro(){return N(o)},set pro(_){q(o,dt(_))},get nav(){return N(i)},set nav(_){q(i,dt(_))},get draft(){return N(l)},find:d,upsert:v,remove:p,setDraft:g,draftSubmit:w,draftCancel:E}}const ci="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ci);function fi(t,e){let n=null,r=!0;return function(...i){n||(r?(t(...i),r=!1):(clearTimeout(n),n=setTimeout(()=>{t(...i),clearTimeout(n),n=null},e)))}}function rn(){var t;return(t=navigator==null?void 0:navigator.userAgentData)!=null&&t.mobile?!0:/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)}var di=bt('<button type="submit" class="svelte-f9ok5r"><span class="color svelte-f9ok5r"></span></button>'),hi=bt('<button type="submit" value="remove" title="Delete highlight" class="svelte-f9ok5r"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-f9ok5r"><g class="svelte-f9ok5r"><line x1="2.75" y1="4.25" x2="15.25" y2="4.25" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-f9ok5r"></line><path d="M6.75,4.25v-1.5c0-.552,.448-1,1-1h2.5c.552,0,1,.448,1,1v1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-f9ok5r"></path><path d="M13.5,6.75l-.4,7.605c-.056,1.062-.934,1.895-1.997,1.895H6.898c-1.064,0-1.941-.833-1.997-1.895l-.4-7.605" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-f9ok5r"></path></g></svg></button>'),pi=bt('<dialog class="svelte-f9ok5r"><form method="dialog" class="svelte-f9ok5r"><!> <button type="submit" value="note" title="Add note" class="svelte-f9ok5r"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-f9ok5r"><g class="svelte-f9ok5r"><path stroke-linecap="round" stroke-linejoin="round" d="M9,1.75C4.996,1.75,1.75,4.996,1.75,9c0,1.319,.358,2.552,.973,3.617,.43,.806-.053,2.712-.973,3.633,1.25,.068,2.897-.497,3.633-.973,.489,.282,1.264,.656,2.279,.848,.433,.082,.881,.125,1.338,.125,4.004,0,7.25-3.246,7.25-7.25S13.004,1.75,9,1.75Z" class="svelte-f9ok5r"></path><path stroke-width="0" d="M9,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-f9ok5r"></path><path stroke-width="0" d="M5.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-f9ok5r"></path><path stroke-width="0" d="M12.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-f9ok5r"></path></g></svg></button> <!></form></dialog>');const vi={hash:"svelte-f9ok5r",code:`
    .svelte-f9ok5r {
        user-select: none;
        -webkit-user-select: none;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    dialog.svelte-f9ok5r {
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
        dialog.svelte-f9ok5r {
            --bg-light: rgba(255, 255, 255, .8);
            --bg-dark: rgba(60, 60, 60, .8);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }
    }

    dialog.mobile.svelte-f9ok5r {
        --control-size: 26px;
    }

    dialog.svelte-f9ok5r {
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

    dialog.mobile.new.svelte-f9ok5r {
        position: fixed;
        top: auto !important;
        left: auto !important;
        right: 16px !important;
        bottom: 16px !important;
        margin-right: env(safe-area-inset-right);
        margin-bottom: env(safe-area-inset-bottom);
    }

    [open].svelte-f9ok5r {
        box-shadow: 0 0 0 .5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.05), 0 15px 40px rgba(0,0,0,.1);
    }

    form.svelte-f9ok5r {
        display: flex;
        gap: 2px;
        margin: 0;
        padding: 0;
    }

    button.svelte-f9ok5r {
        border-radius: var(--control-size);
        border: 0;
        background: transparent;
        cursor: pointer;
        appearance: none;
        touch-action: manipulation;
        width: calc(var(--control-size) + var(--padding-s)*2);
        height: calc(var(--control-size) + var(--padding-s)*2);
        padding: var(--padding-s);
        color: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background .15s ease-in-out;
    }

    @media (pointer: fine) {
        button.svelte-f9ok5r:hover {
            transition: none;
            background: var(--hover-bg-light);

            @supports(color: light-dark(white,black)) {
                background: light-dark(var(--hover-bg-light), var(--hover-bg-dark));
            }
        }
    }

    button.svelte-f9ok5r:active {
        transition: none;
        background: var(--active-bg-light);

        @supports(color: light-dark(white,black)) {
            background: light-dark(var(--active-bg-light), var(--active-bg-dark));
        }
    }

    svg.svelte-f9ok5r {
        stroke: currentColor;
        stroke-width: 1.5px;
    }

    .color.svelte-f9ok5r {
        pointer-events: none;
        content: '';
        display: block;
        width: 15px;
        height: 15px;
        background: var(--color);
        transition: background .15s ease-in-out, box-shadow .15s ease-in-out;
        border-radius: 50%;
    }

    .color.active.svelte-f9ok5r {
        background: transparent;
        box-shadow: inset 0 0 0 5px var(--color);
    }

    /* animation */
    dialog.svelte-f9ok5r {
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

    [open].svelte-f9ok5r {
        opacity: 1;
    }

    dialog.svelte-f9ok5r:not([open]) {
        transition-duration: .2s;
        pointer-events: none;
    }

    @starting-style {
        [open].svelte-f9ok5r {
            opacity: 0;
        }
    }
`};function Rr(t,e){fe(e,!0),yn(t,vi);let n=je(e,"store",7),r,o=et(void 0),i=et(!1);function l(A){if(!N(o))return;const S=A.currentTarget.returnValue;switch(A.currentTarget.returnValue="",S){case"add":n().upsert(N(o)),re();break;case"note":n().setDraft(N(o)),re();break;case"remove":n().remove(N(o)),re();break;default:if(At.has(S)){n().upsert({...N(o),color:S}),re();return}break}}function d(){q(i,!0)}function v(){q(i,!1),setTimeout(p)}function p(){if(N(i)){r==null||r.close();return}requestAnimationFrame(()=>{const A=Mr(),S=A&&n().find(A);if(!A||!(S!=null&&S._id)&&!A.toString().trim()){r==null||r.close();return}q(o,dt(S)),r.inert=!0,r==null||r.show(),r.inert=!1;const K=256,R=10,L=A.getBoundingClientRect(),W=Math.min(Math.max(L.x,R)+window.scrollX,window.innerWidth+window.scrollX-K-R),Q=Math.min(window.innerWidth-Math.max(L.x,R)-window.scrollX-L.width,window.innerWidth-window.scrollX-K-R),nt=Math.max(L.y,40)+window.scrollY+L.height+4,rt=window.innerHeight-Math.max(L.y,40)-window.scrollY+4,it=W<window.innerWidth/2+window.scrollX,vt=nt<window.innerHeight/2+window.scrollY;r==null||r.style.setProperty("left",it?`${W}px`:"unset"),r==null||r.style.setProperty("right",it?"unset":`${Q}px`),r==null||r.style.setProperty("top",vt?`${nt}px`:"unset"),r==null||r.style.setProperty("bottom",vt?"unset":`${rt}px`)})}const g=fi(p,200);var w=pi();_t("mousedown",Dt,d,!1),_t("touchstart",Dt,d,!1,!0),_t("mouseup",Dt,v,!1),_t("touchend",Dt,v,!1,!0),_t("touchcancel",Dt,v,!1,!0),_t("selectionchange",Dt,g,!1),nn(w,A=>r=A,()=>r),yt(()=>oe(w,"mobile",rn()));var E=Z(w),_=Z(E);_n(_,69,()=>At,([A,S],K)=>A,(A,S,K)=>{let R=()=>lt(lt(S))[0],L=()=>lt(lt(S))[1];var W=di(),Q=Z(W);z(W),yt(()=>{var nt;Vo(W,R()),ht(Q,"style",`--color: ${L()??""}`),oe(Q,"active",R()==((nt=N(o))==null?void 0:nt.color))}),at(A,W)});var k=F(F(_,!0)),$=Z(k),D=Z($),O=Z(D),x=F(O),C=F(x),j=F(C);z(D),z($),z(k);var ct=F(F(k,!0));return Se(ct,()=>{var A;return(A=N(o))==null?void 0:A._id},A=>{var S=hi(),K=Z(S),R=Z(K),L=Z(R),W=F(L);F(W),z(R),z(K),z(S),at(A,S)}),z(E),z(w),yt(()=>{var A,S,K,R,L,W;oe(w,"new",!((A=N(o))!=null&&A._id)),ht(O,"fill",(S=N(o))!=null&&S.note?"currentColor":"none"),ht(O,"stroke-width",(K=N(o))!=null&&K.note?"0":void 0),ht(x,"fill",(R=N(o))!=null&&R.note?"none":"currentColor"),ht(C,"fill",(L=N(o))!=null&&L.note?"none":"currentColor"),ht(j,"fill",(W=N(o))!=null&&W.note?"none":"currentColor")}),_t("close",w,l,!1),at(t,w),de({get store(){return n()},set store(A){n(A),Kt()}})}Le(Rr,{store:{}},[],[],!0);function mi(t){const e=t.currentTarget.getBoundingClientRect();e.top<=t.clientY&&t.clientY<=e.top+e.height&&e.left<=t.clientX&&t.clientX<=e.left+e.width||(t.preventDefault(),t.currentTarget.close())}var gi=(t,e)=>q(e,!1),_i=bt('<input type="radio" name="color" class="svelte-n7j6yt">'),yi=bt('<div class="unlock svelte-n7j6yt"><a href="https://raindrop.io/pro/buy" target="_blank" class="svelte-n7j6yt">Upgrade to Pro</a> to unlock annotation</div>'),wi=bt('<blockquote role="presentation" class="svelte-n7j6yt"> </blockquote> <fieldset class="color svelte-n7j6yt"></fieldset> <textarea class="note svelte-n7j6yt" rows="4" maxlength="5000" placeholder="Notes (optional)"></textarea> <!>',1),bi=bt('<dialog role="presentation" class="svelte-n7j6yt"><header class="svelte-n7j6yt"> </header> <form method="dialog" class="svelte-n7j6yt"><!> <footer class="svelte-n7j6yt"><button formnovalidate="" class="svelte-n7j6yt">Cancel <sup class="svelte-n7j6yt">esc</sup></button> <button type="submit" value="OK" class="svelte-n7j6yt"> <sup class="svelte-n7j6yt">&crarr;</sup></button></footer></form></dialog>');const Ei={hash:"svelte-n7j6yt",code:`
    .svelte-n7j6yt {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    dialog.svelte-n7j6yt {
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

    dialog.mobile.svelte-n7j6yt {
        left: 0;right: 0;bottom: 0;top: 0;
        width: 100%;
        margin: 0;
        max-width: 100%;
        max-height: 100%;
        border-radius: 0;
        bottom: auto;
    }

    dialog.svelte-n7j6yt, header.svelte-n7j6yt {
        background: var(--bg-light);

        @supports(color: light-dark(white,black)) {
            background: light-dark(var(--bg-light), var(--bg-dark));
        }
    }

    [open].svelte-n7j6yt {
        box-shadow: 0 0 0 .5px rgba(60, 60, 60, .9), 0 3px 10px rgba(0,0,0,.05), 0 7px 15px -3px rgba(0,0,0,.15);
    }

    .svelte-n7j6yt::backdrop {
        background-color: rgba(0,0,0,.3);
    }

    header.svelte-n7j6yt {
        margin: 0;
        padding: 1em;
        font-weight: bold;
        position: sticky;
        top: 0;
    }

    @supports(animation-timeline: scroll()) {
        header.svelte-n7j6yt {
            animation: svelte-n7j6yt-header-scroll linear both;
            animation-timeline: scroll();
            animation-range: 0 1px;
        }
    }

    @keyframes svelte-n7j6yt-header-scroll {
        to {
            box-shadow: 0 .5px 0 rgba(0,0,0,.2);
        }
    }

    form.svelte-n7j6yt {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 1em;
        padding-top: 0;
    }

    .color.svelte-n7j6yt {
        all: unset;
        display: flex;
        gap: .75em;
    }

    .color.svelte-n7j6yt input[type="radio"]:where(.svelte-n7j6yt) {
        cursor: pointer;
        appearance: none;
        user-select: none;
        -webkit-user-select: none;
        margin: 0;
        background: var(--color);
        transition: box-shadow .2s ease-in-out, background .2s ease-in-out;
        width: 2em;
        height: 2em;
        border-radius: 50%;
    }

    .color.svelte-n7j6yt input[type="radio"]:where(.svelte-n7j6yt):checked {
        background: transparent;
        box-shadow: inset 0 0 0 .5em var(--color);
    }

    .color.svelte-n7j6yt input[type="radio"]:where(.svelte-n7j6yt):active {
        transform: translateY(1px);
    }

    blockquote.svelte-n7j6yt, .note.svelte-n7j6yt, button.svelte-n7j6yt {
        background: var(--control-bg-light);

        @supports(color: light-dark(white,black)) {
            background: light-dark(var(--control-bg-light), var(--control-bg-dark));
        }
    }

    blockquote.svelte-n7j6yt {
        white-space: pre-wrap;
        margin: 0;
        min-width: 100%;
        width: 0;
        font-size: 16px;
    }

    blockquote.compact.svelte-n7j6yt {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        overflow: clip;
    }

    blockquote.svelte-n7j6yt, .note.svelte-n7j6yt {
        border-radius: .5em;
        padding: .5em .6em;
    }

    .note.svelte-n7j6yt {
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

    .note.svelte-n7j6yt:focus {
        background: transparent;
    }
    
    footer.svelte-n7j6yt {
        all: unset;
        display: flex;
        justify-content: flex-end;
        gap: .75em;
    }

    button.svelte-n7j6yt {
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

    button.svelte-n7j6yt:active {
        transform: translateY(1px);
    }

    button.svelte-n7j6yt sup:where(.svelte-n7j6yt) {
        margin-left: .25em;
        vertical-align: text-top;
        opacity: .5;
    }

    dialog.mobile.svelte-n7j6yt button:where(.svelte-n7j6yt) sup:where(.svelte-n7j6yt) {
        display: none;
    }

    button[value].svelte-n7j6yt {
        background: blue;
        background: AccentColor;
        color: white;
    }

    .unlock.svelte-n7j6yt {
        font-size: .75em;
        color: GrayText;
    }

    /* animation */
    dialog.svelte-n7j6yt, .svelte-n7j6yt::backdrop {
        transition: 
            display .2s allow-discrete ease-in-out, 
            overlay .2s allow-discrete ease-in-out, 
            opacity .2s ease-in-out,
            transform .2s ease-in-out,
            box-shadow .2s ease-in-out;
        opacity: 0;
    }

    dialog.svelte-n7j6yt {
        transform: translateY(1em);
    }

    [open].svelte-n7j6yt,
    [open].svelte-n7j6yt::backdrop {
        opacity: 1;
        transform: translateY(0);
    }

    @starting-style {
        [open].svelte-n7j6yt,
        [open].svelte-n7j6yt::backdrop {
            opacity: 0;
        }

        [open].svelte-n7j6yt {
            transform: translateY(-1em);
        }
    }

    @supports not selector(::highlight(a)) {
        dialog.svelte-n7j6yt, dialog.svelte-n7j6yt::backdrop {
            animation: svelte-n7j6yt-simple-appear .2s forwards;
        }
        @keyframes svelte-n7j6yt-simple-appear {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    }
`};function Fr(t,e){fe(e,!0),yn(t,Ei);const n=[];let r=je(e,"store",7),o,i,l=et(!0);Ze(()=>{r().draft?(q(l,!0),o==null||o.showModal()):o==null||o.close()});function d(x){const C=x.currentTarget.returnValue;x.currentTarget.returnValue="",setTimeout(C?r().draftSubmit:r().draftCancel,200)}function v(x){var C;rn()||(x.stopImmediatePropagation(),x.stopPropagation(),x.key=="Enter"&&!x.shiftKey&&(x.preventDefault(),i&&((C=x.currentTarget.closest("form"))==null||C.requestSubmit(i))))}var p=bi();nn(p,x=>o=x,()=>o),p.__mousedown=[mi],yt(()=>oe(p,"mobile",rn()));var g=Z(p),w=Z(g);z(g);var E=F(F(g,!0)),_=Z(E);Se(_,()=>r().draft,x=>{var C=wi(),j=mn(C);j.__click=[gi,l];var ct=Z(j);yt(()=>{var R,L;return Be(ct,((L=(R=r().draft)==null?void 0:R.text)==null?void 0:L.trim())||"")}),z(j);var A=F(F(j,!0));_n(A,73,()=>At,Ho,(R,L,W)=>{let Q=()=>lt(lt(L))[0],nt=()=>lt(lt(L))[1];var rt=_i();Wo(rt);var it;yt(()=>{it!==(it=Q())&&(rt.value=(rt.__value=Q())==null?"":Q()),ht(rt,"style",`--color: ${nt()??""}`)}),Uo(n,[],rt,()=>(Q(),r().draft.color),vt=>r().draft.color=vt),at(R,rt)}),z(A);var S=F(F(A,!0));Yo(S),Bo(S),S.__keydown=v;var K=F(F(S,!0));Se(K,()=>!r().pro,R=>{var L=yi();Z(L),eo(),z(L),at(R,L)}),yt(()=>{oe(j,"compact",N(l)),S.disabled=!r().pro}),zo(S,()=>r().draft.note,R=>r().draft.note=R),at(x,C)});var k=F(F(_,!0)),$=Z(k);F(Z($)),z($);var D=F(F($,!0));nn(D,x=>i=x,()=>i);var O=Z(D);return F(O),z(D),z(k),z(E),z(p),yt(()=>{var x,C;Be(w,`${((x=r().draft)!=null&&x._id?"Edit":"New")??""} highlight`),Be(O,`${((C=r().draft)!=null&&C._id?"Update":"Create")??""} `)}),_t("close",p,d,!1),at(t,p),de({get store(){return r()},set store(x){r(x),Kt()}})}xr(["mousedown","click","keydown"]);Le(Fr,{store:{}},[],[],!0);const ki=t=>{const e=t.target.getAttribute("data-highlight");e&&(t.preventDefault(),Or(e))};var Ci=bt('<div class="svelte-rwfy02"></div>'),$i=bt('<nav role="presentation" class="svelte-rwfy02"></nav>');const xi={hash:"svelte-rwfy02",code:`
    nav.svelte-rwfy02 {
        all: unset;
    }
    
    div.svelte-rwfy02 {
        position: fixed;
        right: 0;
        width: 24px;
        height: 20px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;
        background: transparent;
        z-index: 99999999999999;
    }

    div.svelte-rwfy02::before {
        content: '';
        display: block;
        height: 3px;
        border-radius: 3px;
        width: 16px;
        background: var(--color);
        transition: width .15s ease-in-out;
    }

    div.svelte-rwfy02:hover::before {
        width: 100%;
    }
`};function Hr(t,e){fe(e,!0),yn(t,xi);let n=je(e,"store",7);var r=Mo(),o=mn(r);return Se(o,()=>n().nav,i=>{var l=$i();l.__click=[ki],_n(l,77,()=>n().highlights,(d,v)=>d._id,(d,v,p)=>{var g=Ci();yt(()=>ht(g,"style",`top: var(--highlight-${lt(v)._id??""}-top); --color: ${(At.get(lt(v).color)||lt(v).color)??""}`)),yt(()=>ht(g,"data-highlight",lt(v)._id)),at(d,g)}),z(l),at(i,l)}),at(t,r),de({get store(){return n()},set store(i){n(i),Kt()}})}xr(["click"]);Le(Hr,{store:{}},[],[],!0);var Ti=bt("<!> <!> <!>",1);function Si(t,e){fe(e,!0);let n=je(e,"store",7);Ze(()=>{Ve(n().highlights)});let r;function o(){Ve(n().highlights),clearTimeout(r),r=setTimeout(()=>Ve(n().highlights),3e3)}_r(()=>{document.readyState&&o()}),Ze(()=>li);var i=Ti();_t("load",Te,o,!1),_t("popstate",Te,o,!1);var l=mn(i);Rr(l,{get store(){return n()}});var d=F(F(l,!0));Fr(d,{get store(){return n()}});var v=F(F(d,!0));return Hr(v,{get store(){return n()}}),at(t,i),de({get store(){return n()},set store(p){n(p),Kt()}})}customElements.define("rdh-ui",Le(Si,{store:{}},[],[],!0));function Ni(t){if(typeof chrome=="object"&&chrome.runtime&&chrome.runtime.onMessage||typeof browser=="object"&&browser.runtime&&browser.runtime.onMessage){const{runtime:e}=typeof browser=="object"?browser:chrome,n=(r,o)=>{o.id==e.id&&typeof r.type=="string"&&t(r)};return e.onMessage.removeListener(n),e.onMessage.addListener(n),r=>e.sendMessage(null,r)}if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.rdh)return window.rdhSend=t,e=>window.webkit.messageHandlers.rdh.postMessage(e);if(typeof window<"u"&&typeof window.process=="object"&&window.process.type==="renderer"||typeof process<"u"&&typeof process.versions=="object"&&process.versions.electron){const{ipcRenderer:e}=require("electron"),n=(r,o)=>t(o);return e.removeListener("RDH",n),e.on("RDH",n),r=>e.sendToHost("RDH",r)}if("ReactNativeWebView"in window)return window.ReactNativeWebViewSendMessage=t,e=>window.ReactNativeWebView.postMessage(JSON.stringify(e));if(window.self!==window.top){const e=({data:n,source:r})=>{r!==window.parent||typeof n!="object"||typeof n.type!="string"||t(n)};return window.removeEventListener("message",e),window.addEventListener("message",e),n=>window.parent.postMessage(n,"*")}throw new Error("unsupported platform")}async function Ai(t){let e=!1;const n=new Set,r=Ni(o=>{if(!e){n.add(o);return}t(o)});await new Promise(o=>{function i(){window.removeEventListener("DOMContentLoaded",i),o()}document.readyState=="loading"?(window.removeEventListener("DOMContentLoaded",i),window.addEventListener("DOMContentLoaded",i,{once:!0})):o()}),e=!0;for(const o of n)t(o),n.delete(o);return r}const ee=document.createElement("rdh-ui");(async()=>{const t=await Ai(n=>{switch(n.type){case"RDH_APPLY":Array.isArray(n.payload)&&(e.highlights=n.payload);break;case"RDH_CONFIG":typeof n.payload.pro=="boolean"&&(e.pro=n.payload.pro),typeof n.payload.nav=="boolean"&&(e.nav=n.payload.nav),typeof n.payload.enabled=="boolean"&&(n.payload.enabled===!0?document.body.contains(ee)||document.body.appendChild(ee):document.body.contains(ee)&&document.body.removeChild(ee));break;case"RDH_SCROLL":typeof n.payload._id=="string"&&Or(n.payload._id);break;case"RDH_ADD_SELECTION":const r=Mr();if(!r)return;const o=e.find(r);if(!o)return;e.upsert(o),re();break;case"RDH_NOTE_SELECTION":console.log("not implemented yet");break}}),e=ui(n=>t({type:"RDH_ADD",payload:n}),n=>t({type:"RDH_UPDATE",payload:n}),({_id:n})=>t({type:"RDH_REMOVE",payload:{_id:n}}));ee.store=e,t({type:"RDH_READY",payload:{url:location.href}})})();
