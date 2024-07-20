"use strict";var zr=Object.defineProperty;var Dn=t=>{throw TypeError(t)};var Ur=(t,e,n)=>e in t?zr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ft=(t,e,n)=>Ur(t,typeof e!="symbol"?e+"":e,n),jn=(t,e,n)=>e.has(t)||Dn("Cannot "+n);var et=(t,e,n)=>(jn(t,e,"read from private field"),n?n.call(t):e.get(t)),Pe=(t,e,n)=>e.has(t)?Dn("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),Ie=(t,e,n,r)=>(jn(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n);(function(){var t=window.Document.prototype.createElement,e=window.Document.prototype.createElementNS,n=window.Document.prototype.importNode,r=window.Document.prototype.prepend,o=window.Document.prototype.append,i=window.DocumentFragment.prototype.prepend,a=window.DocumentFragment.prototype.append,d=window.Node.prototype.cloneNode,v=window.Node.prototype.appendChild,p=window.Node.prototype.insertBefore,g=window.Node.prototype.removeChild,y=window.Node.prototype.replaceChild,E=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),w=window.Element.prototype.attachShadow,k=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),$=window.Element.prototype.getAttribute,D=window.Element.prototype.setAttribute,O=window.Element.prototype.removeAttribute,x=window.Element.prototype.toggleAttribute,C=window.Element.prototype.getAttributeNS,j=window.Element.prototype.setAttributeNS,ct=window.Element.prototype.removeAttributeNS,A=window.Element.prototype.insertAdjacentElement,S=window.Element.prototype.insertAdjacentHTML,K=window.Element.prototype.prepend,R=window.Element.prototype.append,L=window.Element.prototype.before,W=window.Element.prototype.after,tt=window.Element.prototype.replaceWith,rt=window.Element.prototype.remove,ot=window.HTMLElement,st=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),vt=window.HTMLElement.prototype.insertAdjacentElement,Zt=window.HTMLElement.prototype.insertAdjacentHTML,wn=new Set;"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(s){return wn.add(s)});function bn(s){var l=wn.has(s);return s=/^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(s),!l&&s}var Hr=document.contains?document.contains.bind(document):document.documentElement.contains.bind(document.documentElement);function B(s){var l=s.isConnected;if(l!==void 0)return l;if(Hr(s))return!0;for(;s&&!(s.__CE_isImportDocument||s instanceof Document);)s=s.parentNode||(window.ShadowRoot&&s instanceof ShadowRoot?s.host:void 0);return!(!s||!(s.__CE_isImportDocument||s instanceof Document))}function Oe(s){var l=s.children;if(l)return Array.prototype.slice.call(l);for(l=[],s=s.firstChild;s;s=s.nextSibling)s.nodeType===Node.ELEMENT_NODE&&l.push(s);return l}function Me(s,l){for(;l&&l!==s&&!l.nextSibling;)l=l.parentNode;return l&&l!==s?l.nextSibling:null}function Re(s,l,c){for(var h=s;h;){if(h.nodeType===Node.ELEMENT_NODE){var u=h;l(u);var f=u.localName;if(f==="link"&&u.getAttribute("rel")==="import"){if(h=u.import,c===void 0&&(c=new Set),h instanceof Node&&!c.has(h))for(c.add(h),h=h.firstChild;h;h=h.nextSibling)Re(h,l,c);h=Me(s,u);continue}else if(f==="template"){h=Me(s,u);continue}if(u=u.__CE_shadowRoot)for(u=u.firstChild;u;u=u.nextSibling)Re(u,l,c)}h=h.firstChild?h.firstChild:Me(s,h)}}function ve(){var s=!(gt==null||!gt.noDocumentConstructionObserver),l=!(gt==null||!gt.shadyDomFastWalk);this.m=[],this.g=[],this.j=!1,this.shadyDomFastWalk=l,this.I=!s}function Qt(s,l,c,h){var u=window.ShadyDOM;if(s.shadyDomFastWalk&&u&&u.inUse){if(l.nodeType===Node.ELEMENT_NODE&&c(l),l.querySelectorAll)for(s=u.nativeMethods.querySelectorAll.call(l,"*"),l=0;l<s.length;l++)c(s[l])}else Re(l,c,h)}function Pr(s,l){s.j=!0,s.m.push(l)}function Ir(s,l){s.j=!0,s.g.push(l)}function Fe(s,l){s.j&&Qt(s,l,function(c){return Pt(s,c)})}function Pt(s,l){if(s.j&&!l.__CE_patched){l.__CE_patched=!0;for(var c=0;c<s.m.length;c++)s.m[c](l);for(c=0;c<s.g.length;c++)s.g[c](l)}}function mt(s,l){var c=[];for(Qt(s,l,function(u){return c.push(u)}),l=0;l<c.length;l++){var h=c[l];h.__CE_state===1?s.connectedCallback(h):me(s,h)}}function it(s,l){var c=[];for(Qt(s,l,function(u){return c.push(u)}),l=0;l<c.length;l++){var h=c[l];h.__CE_state===1&&s.disconnectedCallback(h)}}function Et(s,l,c){c=c===void 0?{}:c;var h=c.J,u=c.upgrade||function(m){return me(s,m)},f=[];for(Qt(s,l,function(m){if(s.j&&Pt(s,m),m.localName==="link"&&m.getAttribute("rel")==="import"){var _=m.import;_ instanceof Node&&(_.__CE_isImportDocument=!0,_.__CE_registry=document.__CE_registry),_&&_.readyState==="complete"?_.__CE_documentLoadHandled=!0:m.addEventListener("load",function(){var b=m.import;if(!b.__CE_documentLoadHandled){b.__CE_documentLoadHandled=!0;var T=new Set;h&&(h.forEach(function(P){return T.add(P)}),T.delete(b)),Et(s,b,{J:T,upgrade:u})}})}else f.push(m)},h),l=0;l<f.length;l++)u(f[l])}function me(s,l){try{var c=l.ownerDocument,h=c.__CE_registry,u=h&&(c.defaultView||c.__CE_isImportDocument)?ge(h,l.localName):void 0;if(u&&l.__CE_state===void 0){u.constructionStack.push(l);try{try{if(new u.constructorFunction!==l)throw Error("The custom element constructor did not produce the element being upgraded.")}finally{u.constructionStack.pop()}}catch(b){throw l.__CE_state=2,b}if(l.__CE_state=1,l.__CE_definition=u,u.attributeChangedCallback&&l.hasAttributes()){var f=u.observedAttributes;for(u=0;u<f.length;u++){var m=f[u],_=l.getAttribute(m);_!==null&&s.attributeChangedCallback(l,m,null,_,null)}}B(l)&&s.connectedCallback(l)}}catch(b){It(b)}}ve.prototype.connectedCallback=function(s){var l=s.__CE_definition;if(l.connectedCallback)try{l.connectedCallback.call(s)}catch(c){It(c)}},ve.prototype.disconnectedCallback=function(s){var l=s.__CE_definition;if(l.disconnectedCallback)try{l.disconnectedCallback.call(s)}catch(c){It(c)}},ve.prototype.attributeChangedCallback=function(s,l,c,h,u){var f=s.__CE_definition;if(f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(l))try{f.attributeChangedCallback.call(s,l,c,h,u)}catch(m){It(m)}};function En(s,l,c,h){var u=l.__CE_registry;if(u&&(h===null||h==="http://www.w3.org/1999/xhtml")&&(u=ge(u,c)))try{var f=new u.constructorFunction;if(f.__CE_state===void 0||f.__CE_definition===void 0)throw Error("Failed to construct '"+c+"': The returned value was not constructed with the HTMLElement constructor.");if(f.namespaceURI!=="http://www.w3.org/1999/xhtml")throw Error("Failed to construct '"+c+"': The constructed element's namespace must be the HTML namespace.");if(f.hasAttributes())throw Error("Failed to construct '"+c+"': The constructed element must not have any attributes.");if(f.firstChild!==null)throw Error("Failed to construct '"+c+"': The constructed element must not have any children.");if(f.parentNode!==null)throw Error("Failed to construct '"+c+"': The constructed element must not have a parent node.");if(f.ownerDocument!==l)throw Error("Failed to construct '"+c+"': The constructed element's owner document is incorrect.");if(f.localName!==c)throw Error("Failed to construct '"+c+"': The constructed element's local name is incorrect.");return f}catch(m){return It(m),l=h===null?t.call(l,c):e.call(l,h,c),Object.setPrototypeOf(l,HTMLUnknownElement.prototype),l.__CE_state=2,l.__CE_definition=void 0,Pt(s,l),l}return l=h===null?t.call(l,c):e.call(l,h,c),Pt(s,l),l}function It(s){var l="",c="",h=0,u=0;s instanceof Error?(l=s.message,c=s.sourceURL||s.fileName||"",h=s.line||s.lineNumber||0,u=s.column||s.columnNumber||0):l="Uncaught "+String(s);var f=void 0;ErrorEvent.prototype.initErrorEvent===void 0?f=new ErrorEvent("error",{cancelable:!0,message:l,filename:c,lineno:h,colno:u,error:s}):(f=document.createEvent("ErrorEvent"),f.initErrorEvent("error",!1,!0,l,c,h),f.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0}})}),f.error===void 0&&Object.defineProperty(f,"error",{configurable:!0,enumerable:!0,get:function(){return s}}),window.dispatchEvent(f),f.defaultPrevented||console.error(s)}function kn(){var s=this;this.g=void 0,this.F=new Promise(function(l){s.l=l})}kn.prototype.resolve=function(s){if(this.g)throw Error("Already resolved.");this.g=s,this.l(s)};function Cn(s){var l=document;this.l=void 0,this.h=s,this.g=l,Et(this.h,this.g),this.g.readyState==="loading"&&(this.l=new MutationObserver(this.G.bind(this)),this.l.observe(this.g,{childList:!0,subtree:!0}))}function $n(s){s.l&&s.l.disconnect()}Cn.prototype.G=function(s){var l=this.g.readyState;for(l!=="interactive"&&l!=="complete"||$n(this),l=0;l<s.length;l++)for(var c=s[l].addedNodes,h=0;h<c.length;h++)Et(this.h,c[h])};function V(s){this.s=new Map,this.u=new Map,this.C=new Map,this.A=!1,this.B=new Map,this.o=function(l){return l()},this.i=!1,this.v=[],this.h=s,this.D=s.I?new Cn(s):void 0}V.prototype.H=function(s,l){var c=this;if(!(l instanceof Function))throw new TypeError("Custom element constructor getters must be functions.");xn(this,s),this.s.set(s,l),this.v.push(s),this.i||(this.i=!0,this.o(function(){return Sn(c)}))},V.prototype.define=function(s,l){var c=this;if(!(l instanceof Function))throw new TypeError("Custom element constructors must be functions.");xn(this,s),Tn(this,s,l),this.v.push(s),this.i||(this.i=!0,this.o(function(){return Sn(c)}))};function xn(s,l){if(!bn(l))throw new SyntaxError("The element name '"+l+"' is not valid.");if(ge(s,l))throw Error("A custom element with name '"+(l+"' has already been defined."));if(s.A)throw Error("A custom element is already being defined.")}function Tn(s,l,c){s.A=!0;var h;try{var u=c.prototype;if(!(u instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var f=function(P){var qt=u[P];if(qt!==void 0&&!(qt instanceof Function))throw Error("The '"+P+"' callback must be a function.");return qt},m=f("connectedCallback"),_=f("disconnectedCallback"),b=f("adoptedCallback"),T=(h=f("attributeChangedCallback"))&&c.observedAttributes||[]}catch(P){throw P}finally{s.A=!1}return c={localName:l,constructorFunction:c,connectedCallback:m,disconnectedCallback:_,adoptedCallback:b,attributeChangedCallback:h,observedAttributes:T,constructionStack:[]},s.u.set(l,c),s.C.set(c.constructorFunction,c),c}V.prototype.upgrade=function(s){Et(this.h,s)};function Sn(s){if(s.i!==!1){s.i=!1;for(var l=[],c=s.v,h=new Map,u=0;u<c.length;u++)h.set(c[u],[]);for(Et(s.h,document,{upgrade:function(b){if(b.__CE_state===void 0){var T=b.localName,P=h.get(T);P?P.push(b):s.u.has(T)&&l.push(b)}}}),u=0;u<l.length;u++)me(s.h,l[u]);for(u=0;u<c.length;u++){for(var f=c[u],m=h.get(f),_=0;_<m.length;_++)me(s.h,m[_]);(f=s.B.get(f))&&f.resolve(void 0)}c.length=0}}V.prototype.get=function(s){if(s=ge(this,s))return s.constructorFunction},V.prototype.whenDefined=function(s){if(!bn(s))return Promise.reject(new SyntaxError("'"+s+"' is not a valid custom element name."));var l=this.B.get(s);if(l)return l.F;l=new kn,this.B.set(s,l);var c=this.u.has(s)||this.s.has(s);return s=this.v.indexOf(s)===-1,c&&s&&l.resolve(void 0),l.F},V.prototype.polyfillWrapFlushCallback=function(s){this.D&&$n(this.D);var l=this.o;this.o=function(c){return s(function(){return l(c)})}};function ge(s,l){var c=s.u.get(l);if(c)return c;if(c=s.s.get(l)){s.s.delete(l);try{return Tn(s,l,c())}catch(h){It(h)}}}V.prototype.define=V.prototype.define,V.prototype.upgrade=V.prototype.upgrade,V.prototype.get=V.prototype.get,V.prototype.whenDefined=V.prototype.whenDefined,V.prototype.polyfillDefineLazy=V.prototype.H,V.prototype.polyfillWrapFlushCallback=V.prototype.polyfillWrapFlushCallback;function He(s,l,c){function h(u){return function(f){for(var m=[],_=0;_<arguments.length;++_)m[_]=arguments[_];_=[];for(var b=[],T=0;T<m.length;T++){var P=m[T];if(P instanceof Element&&B(P)&&b.push(P),P instanceof DocumentFragment)for(P=P.firstChild;P;P=P.nextSibling)_.push(P);else _.push(P)}for(u.apply(this,m),m=0;m<b.length;m++)it(s,b[m]);if(B(this))for(m=0;m<_.length;m++)b=_[m],b instanceof Element&&mt(s,b)}}c.prepend!==void 0&&(l.prepend=h(c.prepend)),c.append!==void 0&&(l.append=h(c.append))}function qr(s){Document.prototype.createElement=function(l){return En(s,this,l,null)},Document.prototype.importNode=function(l,c){return l=n.call(this,l,!!c),this.__CE_registry?Et(s,l):Fe(s,l),l},Document.prototype.createElementNS=function(l,c){return En(s,this,c,l)},He(s,Document.prototype,{prepend:r,append:o})}function Br(s){function l(h){return function(u){for(var f=[],m=0;m<arguments.length;++m)f[m]=arguments[m];m=[];for(var _=[],b=0;b<f.length;b++){var T=f[b];if(T instanceof Element&&B(T)&&_.push(T),T instanceof DocumentFragment)for(T=T.firstChild;T;T=T.nextSibling)m.push(T);else m.push(T)}for(h.apply(this,f),f=0;f<_.length;f++)it(s,_[f]);if(B(this))for(f=0;f<m.length;f++)_=m[f],_ instanceof Element&&mt(s,_)}}var c=Element.prototype;L!==void 0&&(c.before=l(L)),W!==void 0&&(c.after=l(W)),tt!==void 0&&(c.replaceWith=function(h){for(var u=[],f=0;f<arguments.length;++f)u[f]=arguments[f];f=[];for(var m=[],_=0;_<u.length;_++){var b=u[_];if(b instanceof Element&&B(b)&&m.push(b),b instanceof DocumentFragment)for(b=b.firstChild;b;b=b.nextSibling)f.push(b);else f.push(b)}for(_=B(this),tt.apply(this,u),u=0;u<m.length;u++)it(s,m[u]);if(_)for(it(s,this),u=0;u<f.length;u++)m=f[u],m instanceof Element&&mt(s,m)}),rt!==void 0&&(c.remove=function(){var h=B(this);rt.call(this),h&&it(s,this)})}function Yr(s){function l(u,f){Object.defineProperty(u,"innerHTML",{enumerable:f.enumerable,configurable:!0,get:f.get,set:function(m){var _=this,b=void 0;if(B(this)&&(b=[],Qt(s,this,function(qt){qt!==_&&b.push(qt)})),f.set.call(this,m),b)for(var T=0;T<b.length;T++){var P=b[T];P.__CE_state===1&&s.disconnectedCallback(P)}return this.ownerDocument.__CE_registry?Et(s,this):Fe(s,this),m}})}function c(u,f){u.insertAdjacentElement=function(m,_){var b=B(_);return m=f.call(this,m,_),b&&it(s,_),B(m)&&mt(s,_),m}}function h(u,f){function m(_,b){for(var T=[];_!==b;_=_.nextSibling)T.push(_);for(b=0;b<T.length;b++)Et(s,T[b])}u.insertAdjacentHTML=function(_,b){if(_=_.toLowerCase(),_==="beforebegin"){var T=this.previousSibling;f.call(this,_,b),m(T||this.parentNode.firstChild,this)}else if(_==="afterbegin")T=this.firstChild,f.call(this,_,b),m(this.firstChild,T);else if(_==="beforeend")T=this.lastChild,f.call(this,_,b),m(T||this.firstChild,null);else if(_==="afterend")T=this.nextSibling,f.call(this,_,b),m(this.nextSibling,T);else throw new SyntaxError("The value provided ("+String(_)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.")}}w&&(Element.prototype.attachShadow=function(u){if(u=w.call(this,u),s.j&&!u.__CE_patched){u.__CE_patched=!0;for(var f=0;f<s.m.length;f++)s.m[f](u)}return this.__CE_shadowRoot=u}),k&&k.get?l(Element.prototype,k):st&&st.get?l(HTMLElement.prototype,st):Ir(s,function(u){l(u,{enumerable:!0,configurable:!0,get:function(){return d.call(this,!0).innerHTML},set:function(f){var m=this.localName==="template",_=m?this.content:this,b=e.call(document,this.namespaceURI,this.localName);for(b.innerHTML=f;0<_.childNodes.length;)g.call(_,_.childNodes[0]);for(f=m?b.content:b;0<f.childNodes.length;)v.call(_,f.childNodes[0])}})}),Element.prototype.setAttribute=function(u,f){if(this.__CE_state!==1)return D.call(this,u,f);var m=$.call(this,u);D.call(this,u,f),f=$.call(this,u),s.attributeChangedCallback(this,u,m,f,null)},Element.prototype.setAttributeNS=function(u,f,m){if(this.__CE_state!==1)return j.call(this,u,f,m);var _=C.call(this,u,f);j.call(this,u,f,m),m=C.call(this,u,f),s.attributeChangedCallback(this,f,_,m,u)},Element.prototype.removeAttribute=function(u){if(this.__CE_state!==1)return O.call(this,u);var f=$.call(this,u);O.call(this,u),f!==null&&s.attributeChangedCallback(this,u,f,null,null)},x&&(Element.prototype.toggleAttribute=function(u,f){if(this.__CE_state!==1)return x.call(this,u,f);var m=$.call(this,u),_=m!==null;return f=x.call(this,u,f),_!==f&&s.attributeChangedCallback(this,u,m,f?"":null,null),f}),Element.prototype.removeAttributeNS=function(u,f){if(this.__CE_state!==1)return ct.call(this,u,f);var m=C.call(this,u,f);ct.call(this,u,f);var _=C.call(this,u,f);m!==_&&s.attributeChangedCallback(this,f,m,_,u)},vt?c(HTMLElement.prototype,vt):A&&c(Element.prototype,A),Zt?h(HTMLElement.prototype,Zt):S&&h(Element.prototype,S),He(s,Element.prototype,{prepend:K,append:R}),Br(s)}var Nn={};function Wr(s){function l(){var c=this.constructor,h=document.__CE_registry.C.get(c);if(!h)throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var u=h.constructionStack;if(u.length===0)return u=t.call(document,h.localName),Object.setPrototypeOf(u,c.prototype),u.__CE_state=1,u.__CE_definition=h,Pt(s,u),u;var f=u.length-1,m=u[f];if(m===Nn)throw Error("Failed to construct '"+h.localName+"': This element was already constructed.");return u[f]=Nn,Object.setPrototypeOf(m,c.prototype),Pt(s,m),m}l.prototype=ot.prototype,Object.defineProperty(HTMLElement.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:l}),window.HTMLElement=l}function Vr(s){function l(c,h){Object.defineProperty(c,"textContent",{enumerable:h.enumerable,configurable:!0,get:h.get,set:function(u){if(this.nodeType===Node.TEXT_NODE)h.set.call(this,u);else{var f=void 0;if(this.firstChild){var m=this.childNodes,_=m.length;if(0<_&&B(this)){f=Array(_);for(var b=0;b<_;b++)f[b]=m[b]}}if(h.set.call(this,u),f)for(u=0;u<f.length;u++)it(s,f[u])}}})}Node.prototype.insertBefore=function(c,h){if(c instanceof DocumentFragment){var u=Oe(c);if(c=p.call(this,c,h),B(this))for(h=0;h<u.length;h++)mt(s,u[h]);return c}return u=c instanceof Element&&B(c),h=p.call(this,c,h),u&&it(s,c),B(this)&&mt(s,c),h},Node.prototype.appendChild=function(c){if(c instanceof DocumentFragment){var h=Oe(c);if(c=v.call(this,c),B(this))for(var u=0;u<h.length;u++)mt(s,h[u]);return c}return h=c instanceof Element&&B(c),u=v.call(this,c),h&&it(s,c),B(this)&&mt(s,c),u},Node.prototype.cloneNode=function(c){return c=d.call(this,!!c),this.ownerDocument.__CE_registry?Et(s,c):Fe(s,c),c},Node.prototype.removeChild=function(c){var h=c instanceof Element&&B(c),u=g.call(this,c);return h&&it(s,c),u},Node.prototype.replaceChild=function(c,h){if(c instanceof DocumentFragment){var u=Oe(c);if(c=y.call(this,c,h),B(this))for(it(s,h),h=0;h<u.length;h++)mt(s,u[h]);return c}u=c instanceof Element&&B(c);var f=y.call(this,c,h),m=B(this);return m&&it(s,h),u&&it(s,c),m&&mt(s,c),f},E&&E.get?l(Node.prototype,E):Pr(s,function(c){l(c,{enumerable:!0,configurable:!0,get:function(){for(var h=[],u=this.firstChild;u;u=u.nextSibling)u.nodeType!==Node.COMMENT_NODE&&h.push(u.textContent);return h.join("")},set:function(h){for(;this.firstChild;)g.call(this,this.firstChild);h!=null&&h!==""&&v.call(this,document.createTextNode(h))}})})}var gt=window.customElements;function An(){var s=new ve;Wr(s),qr(s),He(s,DocumentFragment.prototype,{prepend:i,append:a}),Vr(s),Yr(s),window.CustomElementRegistry=V,s=new V(s),document.__CE_registry=s,Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:s})}gt&&!gt.forcePolyfill&&typeof gt.define=="function"&&typeof gt.get=="function"||An(),window.__CE_installPolyfill=An}).call(self);const ie=1,on=2,Xr=4,Xn=8,Kr=16,ze=64,Jr=2,Gr=1,Zr=2,Kn="[",sn="[!",ln="]",qe={},te=Symbol(),Qr=["touchstart","touchmove","touchend"];let H=!1;function $t(t){H=t}let q;function Tt(t){return q=t}function ue(){return q=q.nextSibling}function z(t){H&&(q=t)}function to(){H&&ue()}function Ue(){for(var t=0,e=q;;){if(e.nodeType===8){var n=e.data;if(n===ln){if(t===0)return e;t-=1}else(n===Kn||n===sn)&&(t+=1)}var r=e.nextSibling;e.remove(),e=r}}const Ot=2,Jn=4,Ut=8,Gn=16,wt=32,an=64,Ft=128,we=256,pt=512,Nt=1024,Xt=2048,Mt=4096,Kt=8192,eo=16384,un=32768,no=1<<18,G=Symbol("$state"),Zn=Symbol("$state.frozen"),ro=Symbol("");var cn=Array.isArray,oo=Array.from,be=Object.keys,Qn=Object.isFrozen,se=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,io=Object.prototype,so=Array.prototype,lo=Object.getPrototypeOf;function tr(t){for(var e=0;e<t.length;e++)t[e]()}const ao=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let Ee=!1,ke=!1,Ke=[],Je=[];function er(){Ee=!1;const t=Ke.slice();Ke=[],tr(t)}function nr(){ke=!1;const t=Je.slice();Je=[],tr(t)}function Rt(t){Ee||(Ee=!0,queueMicrotask(er)),Ke.push(t)}function uo(t){ke||(ke=!0,ao(nr)),Je.push(t)}function co(){Ee&&er(),ke&&nr()}function fo(t){console.warn("hydration_mismatch")}function rr(t){return t===this.v}function ho(t,e){return t!=t?e==e:t!==e||t!==null&&typeof t=="object"||typeof t=="function"}function po(t){return!ho(t,this.v)}function vo(t){throw new Error("effect_in_teardown")}function mo(){throw new Error("effect_in_unowned_derived")}function go(t){throw new Error("effect_orphan")}function _o(){throw new Error("effect_update_depth_exceeded")}function yo(){throw new Error("hydration_failed")}function wo(t){throw new Error("props_invalid_value")}function bo(){throw new Error("state_unsafe_mutation")}function nt(t){return{f:0,v:t,reactions:null,equals:rr,version:0}}function fn(t){var n;const e=nt(t);return e.equals=po,X!==null&&X.l!==null&&((n=X.l).s??(n.s=[])).push(e),e}function I(t,e){return Y!==null&&Ge()&&Y.f&Ot&&bo(),t.equals(e)||(t.v=e,t.version=ur(),or(t,Nt),Ge()&&M!==null&&M.f&pt&&!(M.f&wt)&&(U!==null&&U.includes(t)?(ut(M,Nt),Ae(M)):St===null?$o([t]):St.push(t))),e}function or(t,e){var n=t.reactions;if(n!==null)for(var r=Ge(),o=n.length,i=0;i<o;i++){var a=n[i],d=a.f;d&Nt||!r&&a===M||(ut(a,e),d&(pt|Ft)&&(d&Ot?or(a,Xt):Ae(a)))}}function Eo(t){let e=Ot|Nt;M===null&&(e|=Ft);const n={deps:null,deriveds:null,equals:rr,f:e,first:null,fn:t,last:null,reactions:null,v:null,version:0};if(Y!==null&&Y.f&Ot){var r=Y;r.deriveds===null?r.deriveds=[n]:r.deriveds.push(n)}return n}function ir(t){hn(t);var e=t.deriveds;if(e!==null){t.deriveds=null;for(var n=0;n<e.length;n+=1)ko(e[n])}}function sr(t){ir(t);var e=cr(t),n=(Yt||t.f&Ft)&&t.deps!==null?Xt:pt;ut(t,n),t.equals(e)||(t.v=e,t.version=ur())}function ko(t){ir(t),Se(t,0),ut(t,Kt),t.first=t.last=t.deps=t.reactions=t.fn=null}const lr=0,Co=1;let _e=lr,le=!1,Wt=!1,dn=!1;function Ln(t){Wt=t}function On(t){dn=t}let jt=[],Vt=0,Y=null;function Mn(t){Y=t}let M=null,U=null,J=0,St=null;function $o(t){St=t}let ar=0,Yt=!1,X=null;function ur(){return ar++}function Ge(){return X!==null&&X.l===null}function ce(t){var a,d;var e=t.f;if(e&Nt)return!0;if(e&Xt){var n=t.deps;if(n!==null){var r=(e&Ft)!==0,o;if(e&we){for(o=0;o<n.length;o++)((a=n[o]).reactions??(a.reactions=[])).push(t);t.f^=we}for(o=0;o<n.length;o++){var i=n[o];if(ce(i)&&sr(i),i.version>t.version)return!0;r&&!Yt&&!((d=i==null?void 0:i.reactions)!=null&&d.includes(t))&&(i.reactions??(i.reactions=[])).push(t)}}ut(t,pt)}return!1}function xo(t,e,n){throw t}function cr(t){var e=U,n=J,r=St,o=Y,i=Yt;U=null,J=0,St=null,Y=t.f&(wt|an)?null:t,Yt=!Wt&&(t.f&Ft)!==0;try{var a=(0,t.fn)(),d=t.deps;if(U!==null){var v,p;if(d!==null){var g=J===0?U:d.slice(0,J).concat(U),y=g.length>16?new Set(g):null;for(p=J;p<d.length;p++)v=d[p],(y!==null?!y.has(v):!g.includes(v))&&fr(t,v)}if(d!==null&&J>0)for(d.length=J+U.length,p=0;p<U.length;p++)d[J+p]=U[p];else t.deps=d=U;if(!Yt)for(p=J;p<d.length;p++){v=d[p];var E=v.reactions;E===null?v.reactions=[t]:E[E.length-1]!==t&&!E.includes(t)&&E.push(t)}}else d!==null&&J<d.length&&(Se(t,J),d.length=J);return a}finally{U=e,J=n,St=r,Y=o,Yt=i}}function fr(t,e){const n=e.reactions;let r=0;if(n!==null){r=n.length-1;const o=n.indexOf(t);o!==-1&&(r===0?e.reactions=null:(n[o]=n[r],n.pop()))}r===0&&e.f&Ot&&(ut(e,Xt),e.f&(Ft|we)||(e.f^=we),Se(e,0))}function Se(t,e){var n=t.deps;if(n!==null)for(var r=e===0?null:n.slice(0,e),o=new Set,i=e;i<n.length;i++){var a=n[i];o.has(a)||(o.add(a),(r===null||!r.includes(a))&&fr(t,a))}}function hn(t,e=!1){var n=t.first;for(t.first=t.last=null;n!==null;){var r=n.next;Gt(n,e),n=r}}function Ne(t){var e=t.f;if(!(e&Kt)){ut(t,pt);var n=t.ctx,r=M,o=X;M=t,X=n;try{e&Gn||hn(t),yr(t);var i=cr(t);t.teardown=typeof i=="function"?i:null,t.version=ar}catch(a){xo(a)}finally{M=r,X=o}}}function dr(){Vt>1e3&&(Vt=0,_o()),Vt++}function hr(t){var e=t.length;if(e!==0){dr();var n=Wt;Wt=!0;try{for(var r=0;r<e;r++){var o=t[r];if(o.first===null&&!(o.f&wt))Rn([o]);else{var i=[];pr(o,i),Rn(i)}}}finally{Wt=n}}}function Rn(t){var e=t.length;if(e!==0)for(var n=0;n<e;n++){var r=t[n];!(r.f&(Kt|Mt))&&ce(r)&&(Ne(r),r.deps===null&&r.first===null&&r.nodes===null&&(r.teardown===null?wr(r):r.fn=null))}}function To(){if(le=!1,Vt>1001)return;const t=jt;jt=[],hr(t),le||(Vt=0)}function Ae(t){_e===lr&&(le||(le=!0,queueMicrotask(To)));for(var e=t;e.parent!==null;){e=e.parent;var n=e.f;if(n&wt){if(!(n&pt))return;ut(e,Xt)}}jt.push(e)}function pr(t,e){var n=t.first,r=[];t:for(;n!==null;){var o=n.f,i=(o&(Kt|Mt))===0,a=o&wt,d=(o&pt)!==0,v=n.first;if(i&&(!a||!d)){if(a&&ut(n,pt),o&Ut){if(!a&&ce(n)&&(Ne(n),v=n.first),v!==null){n=v;continue}}else if(o&Jn)if(a||d){if(v!==null){n=v;continue}}else r.push(n)}var p=n.next;if(p===null){let E=n.parent;for(;E!==null;){if(t===E)break t;var g=E.next;if(g!==null){n=g;continue t}E=E.parent}}n=p}for(var y=0;y<r.length;y++)v=r[y],e.push(v),pr(v,e)}function Ht(t,e=!0){var n=_e,r=jt;try{dr();const i=[];_e=Co,jt=i,le=!1,e&&hr(r);var o=t==null?void 0:t();return co(),(jt.length>0||i.length>0)&&Ht(),Vt=0,o}finally{_e=n,jt=r}}function N(t){var e=t.f;if(e&Kt)return t.v;if(Y!==null){var n=Y.deps;U===null&&n!==null&&n[J]===t?J++:(n===null||J===0||n[J-1]!==t)&&(U===null?U=[t]:U[U.length-1]!==t&&U.push(t)),St!==null&&M!==null&&M.f&pt&&!(M.f&wt)&&St.includes(t)&&(ut(M,Nt),Ae(M))}if(e&Ot){var r=t;ce(r)&&sr(r)}return t.v}function vr(t){const e=Y;try{return Y=null,t()}finally{Y=e}}const So=~(Nt|Xt|pt);function ut(t,e){t.f=t.f&So|e}function No(t){return typeof t=="object"&&t!==null&&typeof t.f=="number"}function fe(t,e=!1,n){X={p:X,c:null,e:null,m:!1,s:t,x:null,l:null},e||(X.l={s:null,u:null,r1:[],r2:nt(!1)})}function de(t){const e=X;if(e!==null){t!==void 0&&(e.x=t);const r=e.e;if(r!==null){e.e=null;for(var n=0;n<r.length;n++)pn(r[n])}X=e.p,e.m=!0}return t||{}}function Q(t){return No(t)?N(t):t}function Ao(t){M===null&&Y===null&&go(),Y!==null&&Y.f&Ft&&mo(),dn&&vo()}function Fn(t,e){var n=e.last;n===null?e.last=e.first=t:(n.next=t,t.prev=n,e.last=t)}function Jt(t,e,n,r=!0){var o=(t&an)!==0,i={ctx:X,deps:null,nodes:null,f:t|Nt,first:null,fn:e,last:null,next:null,parent:o?null:M,prev:null,teardown:null,transitions:null,version:0};if(n){var a=Wt;try{Ln(!0),Ne(i),i.f|=eo}catch(v){throw Gt(i),v}finally{Ln(a)}}else e!==null&&Ae(i);var d=n&&i.deps===null&&i.first===null&&i.nodes===null&&i.teardown===null;return!d&&!o&&r&&(M!==null&&Fn(i,M),Y!==null&&Y.f&Ot&&Fn(i,Y)),i}function mr(t){const e=Jt(Ut,null,!1);return ut(e,pt),e.teardown=t,e}function Ze(t){Ao();var e=M!==null&&(M.f&Ut)!==0&&X!==null&&!X.m;if(e){var n=X;(n.e??(n.e=[])).push(t)}else{var r=pn(t);return r}}function gr(t){const e=Jt(an,t,!0);return()=>{Gt(e)}}function pn(t){return Jt(Jn,t,!1)}function he(t){return Jt(Ut,t,!0)}function yt(t){return he(t)}function _r(t,e=0){return Jt(Ut|Gn|e,t,!0)}function ae(t,e=!0){return Jt(Ut|wt,t,!0,e)}function yr(t){var e=t.teardown;if(e!==null){const n=dn,r=Y;On(!0),Mn(null);try{e.call(null)}finally{On(n),Mn(r)}}}function Gt(t,e=!0){var n=!1;if((e||t.f&no)&&t.nodes!==null){for(var r=t.nodes.start,o=t.nodes.end;r!==null;){var i=r===o?null:r.nextSibling;r.remove(),r=i}n=!0}if(hn(t,e&&!n),Se(t,0),ut(t,Kt),t.transitions)for(const d of t.transitions)d.stop();yr(t);var a=t.parent;a!==null&&t.f&wt&&a.first!==null&&wr(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.parent=t.fn=t.nodes=null}function wr(t){var e=t.parent,n=t.prev,r=t.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),e!==null&&(e.first===t&&(e.first=r),e.last===t&&(e.last=n))}function Qe(t,e){var n=[];vn(t,n,!0),br(n,()=>{Gt(t),e&&e()})}function br(t,e){var n=t.length;if(n>0){var r=()=>--n||e();for(var o of t)o.out(r)}else e()}function vn(t,e,n){if(!(t.f&Mt)){if(t.f^=Mt,t.transitions!==null)for(const a of t.transitions)(a.is_global||n)&&e.push(a);for(var r=t.first;r!==null;){var o=r.next,i=(r.f&un)!==0||(r.f&wt)!==0;vn(r,e,i?n:!1),r=o}}}function Ce(t){Er(t,!0)}function Er(t,e){if(t.f&Mt){t.f^=Mt,ce(t)&&Ne(t);for(var n=t.first;n!==null;){var r=n.next,o=(n.f&un)!==0||(n.f&wt)!==0;Er(n,o?e:!1),n=r}if(t.transitions!==null)for(const i of t.transitions)(i.is_global||e)&&i.in()}}function dt(t,e=null,n){if(typeof t=="object"&&t!=null&&!Qn(t)&&!(Zn in t)){if(G in t){const o=t[G];if(o.t===t||o.p===t)return o.p}const r=lo(t);if(r===io||r===so){const o=new Proxy(t,Do);return se(t,G,{value:{s:new Map,v:nt(0),a:cn(t),p:o,t},writable:!0,enumerable:!1}),o}}return t}function Hn(t,e=1){I(t,t.v+e)}const Do={defineProperty(t,e,n){if(n.value){const r=t[G],o=r.s.get(e);o!==void 0&&I(o,dt(n.value,r))}return Reflect.defineProperty(t,e,n)},deleteProperty(t,e){const n=t[G],r=n.s.get(e),o=n.a,i=delete t[e];if(o&&i){const a=n.s.get("length"),d=t.length-1;a!==void 0&&a.v!==d&&I(a,d)}return r!==void 0&&I(r,te),i&&Hn(n.v),i},get(t,e,n){var i;if(e===G)return Reflect.get(t,G);const r=t[G];let o=r.s.get(e);if(o===void 0&&(!(e in t)||(i=Xe(t,e))!=null&&i.writable)&&(o=nt(dt(t[e],r)),r.s.set(e,o)),o!==void 0){const a=N(o);return a===te?void 0:a}return Reflect.get(t,e,n)},getOwnPropertyDescriptor(t,e){const n=Reflect.getOwnPropertyDescriptor(t,e);if(n&&"value"in n){const o=t[G].s.get(e);o&&(n.value=N(o))}return n},has(t,e){var i;if(e===G)return!0;const n=t[G],r=Reflect.has(t,e);let o=n.s.get(e);return(o!==void 0||M!==null&&(!r||(i=Xe(t,e))!=null&&i.writable))&&(o===void 0&&(o=nt(r?dt(t[e],n):te),n.s.set(e,o)),N(o)===te)?!1:r},set(t,e,n,r){const o=t[G];let i=o.s.get(e);i===void 0&&(vr(()=>r[e]),i=o.s.get(e)),i!==void 0&&I(i,dt(n,o));const a=o.a,d=!(e in t);if(a&&e==="length")for(let p=n;p<t.length;p+=1){const g=o.s.get(p+"");g!==void 0&&I(g,te)}var v=Reflect.getOwnPropertyDescriptor(t,e);if(v!=null&&v.set?v.set.call(r,n):t[e]=n,d){if(a){const p=o.s.get("length"),g=t.length;p!==void 0&&p.v!==g&&I(p,g)}Hn(o.v)}return!0},ownKeys(t){const e=t[G];return N(e.v),Reflect.ownKeys(t)}};function $e(t){if(t!==null&&typeof t=="object"&&G in t){var e=t[G];if(e)return e.p}return t}function jo(t,e){return Object.is($e(t),$e(e))}var xe,Dt;function kr(){if(xe===void 0){xe=window,Dt=document;var t=Element.prototype;t.__click=void 0,t.__className="",t.__attributes=null,t.__e=void 0,Text.prototype.__t=void 0}}function pe(){return document.createTextNode("")}function Z(t){if(!H)return t.firstChild;var e=q.firstChild;return e===null&&(e=q.appendChild(pe())),Tt(e),e}function mn(t,e){if(!H){var n=t.firstChild;return n instanceof Comment&&n.data===""?n.nextSibling:n}return q}function F(t,e=!1){if(!H)return t.nextSibling;var n=q.nextSibling,r=n.nodeType;if(e&&r!==3){var o=pe();return n==null||n.before(o),Tt(o),o}return Tt(n),n}function gn(t){t.textContent=""}const Cr=new Set,tn=new Set;function Lo(t,e,n,r){function o(i){if(r.capture||ne.call(e,i),!i.cancelBubble)return n.call(this,i)}return t.startsWith("pointer")||t==="wheel"?Rt(()=>{e.addEventListener(t,o,r)}):e.addEventListener(t,o,r),o}function _t(t,e,n,r,o){var i={capture:r,passive:o},a=Lo(t,e,n,i);(e===document.body||e===window||e===document)&&mr(()=>{e.removeEventListener(t,a,i)})}function $r(t){for(var e=0;e<t.length;e++)Cr.add(t[e]);for(var n of tn)n(t)}function ne(t){var D;var e=this,n=e.ownerDocument,r=t.type,o=((D=t.composedPath)==null?void 0:D.call(t))||[],i=o[0]||t.target,a=0,d=t.__root;if(d){var v=o.indexOf(d);if(v!==-1&&(e===document||e===window)){t.__root=e;return}var p=o.indexOf(e);if(p===-1)return;v<=p&&(a=v)}if(i=o[a]||t.target,i!==e){se(t,"currentTarget",{configurable:!0,get(){return i||n}});try{for(var g,y=[];i!==null;){var E=i.parentNode||i.host||null;try{var w=i["__"+r];if(w!==void 0&&!i.disabled)if(cn(w)){var[k,...$]=w;k.apply(i,[t,...$])}else w.call(i,t)}catch(O){g?y.push(O):g=O}if(t.cancelBubble||E===e||E===null)break;i=E}if(g){for(let O of y)queueMicrotask(()=>{throw O});throw g}}finally{t.__root=e,i=e}}}function Oo(t){var e=document.createElement("template");return e.innerHTML=t,e.content}function zt(t,e){M.nodes??(M.nodes={start:t,end:e})}function bt(t,e){var n=(e&Gr)!==0,r=(e&Zr)!==0,o,i=!t.startsWith("<!>");return()=>{if(H)return zt(q,null),q;o||(o=Oo(i?t:"<!>"+t),n||(o=o.firstChild));var a=r?document.importNode(o,!0):o.cloneNode(!0);if(n){var d=a.firstChild,v=a.lastChild;zt(d,v)}else zt(a,a);return a}}function Mo(){if(H)return zt(q,null),q;var t=document.createDocumentFragment(),e=document.createComment(""),n=pe();return t.append(e,n),zt(e,n),t}function at(t,e){if(H){M.nodes.end=q,ue();return}t!==null&&t.before(e)}function Be(t,e){(t.__t??(t.__t=t.nodeValue))!==e&&(t.nodeValue=t.__t=e)}function xr(t,e){const n=e.anchor??e.target.appendChild(pe());return Ht(()=>Tr(t,{...e,anchor:n}),!1)}function Ro(t,e){e.intro=e.intro??!1;const n=e.target,r=H;try{return Ht(()=>{for(var o=n.firstChild;o&&(o.nodeType!==8||o.data!==Kn);)o=o.nextSibling;if(!o)throw qe;$t(!0),Tt(o),ue();const i=Tr(t,{...e,anchor:o});if(q.nodeType!==8||q.data!==ln)throw fo(),qe;return $t(!1),i},!1)}catch(o){if(o===qe)return e.recover===!1&&yo(),kr(),gn(n),$t(!1),xr(t,e);throw o}finally{$t(r)}}const Bt=new Map;function Tr(t,{target:e,anchor:n,props:r={},events:o,context:i,intro:a=!0}){kr();var d=new Set,v=y=>{for(var E=0;E<y.length;E++){var w=y[E];if(!d.has(w)){d.add(w);var k=Qr.includes(w);e.addEventListener(w,ne,{passive:k});var $=Bt.get(w);$===void 0?(document.addEventListener(w,ne,{passive:k}),Bt.set(w,1)):Bt.set(w,$+1)}}};v(oo(Cr)),tn.add(v);var p=void 0,g=gr(()=>(ae(()=>{if(i){fe({});var y=X;y.c=i}o&&(r.$$events=o),H&&zt(n,null),p=t(n,r)||{},H&&(M.nodes.end=q),i&&de()}),()=>{for(var y of d){e.removeEventListener(y,ne);var E=Bt.get(y);--E===0?(document.removeEventListener(y,ne),Bt.delete(y)):Bt.set(y,E)}tn.delete(v),en.delete(p)}));return en.set(p,g),p}let en=new WeakMap;function Fo(t){const e=en.get(t);e==null||e()}function Te(t,e,n,r=null,o=!1){H&&ue();var i=t,a=null,d=null,v=null,p=o?un:0;_r(()=>{if(v===(v=!!e()))return;let g=!1;if(H){const y=i.data===sn;v===y&&(i=Ue(),Tt(i),$t(!1),g=!0)}v?(a?Ce(a):a=ae(()=>n(i)),d&&Qe(d,()=>{d=null})):(d?Ce(d):r&&(d=ae(()=>r(i))),a&&Qe(a,()=>{a=null})),g&&$t(!0)},p),H&&(i=q)}let Ye=null;function Ho(t,e){return e}function Po(t,e,n,r){for(var o=[],i=e.length,a=0;a<i;a++)vn(e[a].e,o,!0);var d=i>0&&o.length===0&&n!==null;if(d){var v=n.parentNode;gn(v),v.append(n),r.clear(),xt(t,e[0].prev,e[i-1].next)}br(o,()=>{for(var p=0;p<i;p++){var g=e[p];d||(r.delete(g.k),xt(t,g.prev,g.next)),Gt(g.e,!d)}})}function _n(t,e,n,r,o,i=null){var a=t,d={flags:e,items:new Map,first:null},v=(e&Xn)!==0;if(v){var p=t;a=H?Tt(p.firstChild):p.appendChild(pe())}H&&ue();var g=null;_r(()=>{var y=n(),E=cn(y)?y:y==null?[]:Array.from(y),w=E.length,k=d.flags;k&ze&&!Qn(E)&&!(Zn in E)&&!(G in E)&&(k^=ze,k&Xr&&!(k&ie)&&(k^=ie));let $=!1;if(H){var D=a.data===sn;D!==(w===0)&&(a=Ue(),Tt(a),$t(!1),$=!0)}if(H){for(var O=null,x,C=0;C<w;C++){if(q.nodeType===8&&q.data===ln){a=q,$=!0,$t(!1);break}var j=E[C],ct=r(j,C);x=Sr(q,d,O,null,j,ct,C,o,k),d.items.set(ct,x),O=x}w>0&&Tt(Ue())}H||Io(E,d,a,o,k,r),i!==null&&(w===0?g?Ce(g):g=ae(()=>i(a)):g!==null&&Qe(g,()=>{g=null})),$&&$t(!0)}),H&&(a=q)}function Io(t,e,n,r,o,i){var rt,ot,st,vt;var a=(o&Kr)!==0,d=(o&(ie|on))!==0,v=t.length,p=e.items,g=e.first,y=g,E=new Set,w=null,k=new Set,$=[],D=[],O,x,C,j;if(a)for(j=0;j<v;j+=1)O=t[j],x=i(O,j),C=p.get(x),C!==void 0&&((rt=C.a)==null||rt.measure(),k.add(C));for(j=0;j<v;j+=1){if(O=t[j],x=i(O,j),C=p.get(x),C===void 0){var ct=y?y.e.nodes.start:n;w=Sr(ct,e,w,w===null?e.first:w.next,O,x,j,r,o),p.set(x,w),$=[],D=[],y=w.next;continue}if(d&&qo(C,O,j,o),C.e.f&Mt&&(Ce(C.e),a&&((ot=C.a)==null||ot.unfix(),k.delete(C))),C!==y){if(E.has(C)){if($.length<D.length){var A=D[0],S;w=A.prev;var K=$[0],R=$[$.length-1];for(S=0;S<$.length;S+=1)Pn($[S],A,n);for(S=0;S<D.length;S+=1)E.delete(D[S]);xt(e,K.prev,R.next),xt(e,w,K),xt(e,R,A),y=A,w=R,j-=1,$=[],D=[]}else E.delete(C),Pn(C,y,n),xt(e,C.prev,C.next),xt(e,C,w===null?e.first:w.next),xt(e,w,C),w=C;continue}for($=[],D=[];y!==null&&y.k!==x;)E.add(y),D.push(y),y=y.next;if(y===null)continue;C=y}$.push(C),w=C,y=C.next}const L=Array.from(E);for(;y!==null;)L.push(y),y=y.next;var W=L.length;if(W>0){var tt=o&Xn&&v===0?n:null;if(a){for(j=0;j<W;j+=1)(st=L[j].a)==null||st.measure();for(j=0;j<W;j+=1)(vt=L[j].a)==null||vt.fix()}Po(e,L,tt,p)}a&&Rt(()=>{var Zt;for(C of k)(Zt=C.a)==null||Zt.apply()}),M.first=e.first&&e.first.e,M.last=w&&w.e}function qo(t,e,n,r){r&ie&&I(t.v,e),r&on?I(t.i,n):t.i=n}function Sr(t,e,n,r,o,i,a,d,v){var p=Ye;try{var g=(v&ie)!==0,y=(v&ze)===0,E=g?y?fn(o):nt(o):o,w=v&on?nt(a):a,k={i:w,v:E,k:i,a:null,e:null,prev:n,next:r};return Ye=k,k.e=ae(()=>d(t,E,w),H),k.e.prev=n&&n.e,k.e.next=r&&r.e,n===null?e.first=k:(n.next=k,n.e.next=k.e),r!==null&&(r.prev=k,r.e.prev=k.e),k}finally{Ye=p}}function Pn(t,e,n){for(var r=t.next?t.next.e.nodes.start:n,o=e?e.e.nodes.start:n,i=t.e.nodes.start;i!==r;){var a=i.nextSibling;o.before(i),i=a}}function xt(t,e,n){e===null?t.first=n:(e.next=n,e.e.next=n&&n.e),n!==null&&(n.prev=e,n.e.prev=e&&e.e)}var In=new Set;function yn(t,e){{if(In.has(e))return;In.add(e)}Rt(()=>{var n=t.getRootNode(),r=n.host?n:n.head??n.ownerDocument.head;if(!r.querySelector("#"+e.hash)){const o=document.createElement("style");o.id=e.hash,o.textContent=e.code,r.appendChild(o)}})}function Bo(t,e){{const n=document.body;t.autofocus=!0,Rt(()=>{document.activeElement===n&&t.focus()})}}function Yo(t){H&&t.firstChild!==null&&gn(t)}let qn=!1;function Nr(){qn||(qn=!0,document.addEventListener("reset",t=>{Promise.resolve().then(()=>{var e;if(!t.defaultPrevented)for(const n of t.target.elements)(e=n.__on_r)==null||e.call(n)})},{capture:!0}))}function Wo(t){if(H){var e=!1,n=()=>{if(!e){if(e=!0,t.hasAttribute("value")){var r=t.value;ht(t,"value",null),t.value=r}if(t.hasAttribute("checked")){var o=t.checked;ht(t,"checked",null),t.checked=o}}};t.__on_r=n,uo(n),Nr()}}function Vo(t,e){var n=t.__attributes??(t.__attributes={});n.value!==(n.value=e)&&(t.value=e)}function ht(t,e,n){n=n==null?null:n+"";var r=t.__attributes??(t.__attributes={});H&&(r[e]=t.getAttribute(e),e==="src"||e==="href"||e==="srcset")||r[e]!==(r[e]=n)&&(e==="loading"&&(t[ro]=n),n===null?t.removeAttribute(e):t.setAttribute(e,n))}function oe(t,e,n){n?t.classList.add(e):t.classList.remove(e)}function Ar(t,e,n,r=n){t.addEventListener(e,n);const o=t.__on_r;o?t.__on_r=()=>{o(),r()}:t.__on_r=r,Nr()}function zo(t,e,n){Ar(t,"input",()=>{n(Yn(t)?Wn(t.value):t.value)}),he(()=>{var r=e();if(H&&t.defaultValue!==t.value){n(t.value);return}Yn(t)&&r===Wn(t.value)||t.type==="date"&&!r&&!t.value||(t.value=r??"")})}const We=new Set;function Uo(t,e,n,r,o){var i=n.getAttribute("type")==="checkbox",a=t;let d=!1;if(e!==null)for(var v of e){var p=a;a=p[v],a===void 0&&(a=p[v]=[])}a.push(n),Ar(n,"change",()=>{var g=n.__value;i&&(g=Bn(a,g,n.checked)),o(g)},()=>o(i?[]:null)),he(()=>{var g=r();if(H&&n.defaultChecked!==n.checked){d=!0;return}i?(g=g||[],n.checked=$e(g).includes($e(n.__value))):n.checked=jo(n.__value,g)}),mr(()=>{var g=a.indexOf(n);g!==-1&&a.splice(g,1)}),We.has(a)||(We.add(a),Rt(()=>{a.sort((g,y)=>g.compareDocumentPosition(y)===4?-1:1),We.delete(a)})),Rt(()=>{if(d){var g;if(i)g=Bn(a,g,n.checked);else{var y=a.find(E=>E.checked);g=y==null?void 0:y.__value}o(g)}})}function Bn(t,e,n){for(var r=new Set,o=0;o<t.length;o+=1)t[o].checked&&r.add(t[o].__value);return n||r.delete(e),Array.from(r)}function Yn(t){var e=t.type;return e==="number"||e==="range"}function Wn(t){return t===""?null:+t}function Vn(t,e){var r;var n=t&&((r=t[G])==null?void 0:r.t);return t===e||n===e}function nn(t={},e,n,r){return pn(()=>{var o,i;return he(()=>{o=i,i=[],vr(()=>{t!==n(...i)&&(e(t,...i),o&&Vn(n(...o),t)&&e(null,...o))})}),()=>{Rt(()=>{i&&Vn(n(...i),t)&&e(null,...i)})}}),t}function De(t,e,n,r){var k;var o=(n&Jr)!==0,i=t[e],a=(k=Xe(t,e))==null?void 0:k.set,d=r,v=()=>d;i===void 0&&r!==void 0&&(a&&o&&wo(),i=v(),a&&a(i));var p;if(p=()=>{var $=t[e];return $===void 0?v():$},a){var g=t.$$legacy;return function($,D){return arguments.length>0?((!D||g)&&a(D?p():$),$):p()}}var y=!1,E=fn(i),w=Eo(()=>{var $=p(),D=N(E);return y?(y=!1,D):E.v=$});return function($,D){var O=N(w);if(arguments.length>0){const x=D?N(w):$;return w.equals(x)||(y=!0,I(E,x),N(w)),$}return O}}function Xo(t){return new Ko(t)}var kt,lt;class Ko{constructor(e){Pe(this,kt);Pe(this,lt);var n=new Map,r=(i,a)=>{var d=fn(a);return n.set(i,d),d};const o=new Proxy({...e.props||{},$$events:{}},{get(i,a){return N(n.get(a)??r(a,Reflect.get(i,a)))},has(i,a){return N(n.get(a)??r(a,Reflect.get(i,a))),Reflect.has(i,a)},set(i,a,d){return I(n.get(a)??r(a,d),d),Reflect.set(i,a,d)}});Ie(this,lt,(e.hydrate?Ro:xr)(e.component,{target:e.target,props:o,context:e.context,intro:e.intro??!1,recover:e.recover})),Ie(this,kt,o.$$events);for(const i of Object.keys(et(this,lt)))i==="$set"||i==="$destroy"||i==="$on"||se(this,i,{get(){return et(this,lt)[i]},set(a){et(this,lt)[i]=a},enumerable:!0});et(this,lt).$set=i=>{Object.assign(o,i)},et(this,lt).$destroy=()=>{Fo(et(this,lt))}}$set(e){et(this,lt).$set(e)}$on(e,n){et(this,kt)[e]=et(this,kt)[e]||[];const r=(...o)=>n.call(this,...o);return et(this,kt)[e].push(r),()=>{et(this,kt)[e]=et(this,kt)[e].filter(o=>o!==r)}}$destroy(){et(this,lt).$destroy()}}kt=new WeakMap,lt=new WeakMap;let Dr;typeof HTMLElement=="function"&&(Dr=class extends HTMLElement{constructor(e,n,r){super();ft(this,"$$ctor");ft(this,"$$s");ft(this,"$$c");ft(this,"$$cn",!1);ft(this,"$$d",{});ft(this,"$$r",!1);ft(this,"$$p_d",{});ft(this,"$$l",{});ft(this,"$$l_u",new Map);ft(this,"$$me");this.$$ctor=e,this.$$s=n,r&&this.attachShadow({mode:"open"})}addEventListener(e,n,r){if(this.$$l[e]=this.$$l[e]||[],this.$$l[e].push(n),this.$$c){const o=this.$$c.$on(e,n);this.$$l_u.set(n,o)}super.addEventListener(e,n,r)}removeEventListener(e,n,r){if(super.removeEventListener(e,n,r),this.$$c){const o=this.$$l_u.get(n);o&&(o(),this.$$l_u.delete(n))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){let e=function(o){return i=>{const a=document.createElement("slot");o!=="default"&&(a.name=o),at(i,a)}};if(await Promise.resolve(),!this.$$cn||this.$$c)return;const n={},r=Jo(this);for(const o of this.$$s)o in r&&(o==="default"&&!this.$$d.children?(this.$$d.children=e(o),n.default=!0):n[o]=e(o));for(const o of this.attributes){const i=this.$$g_p(o.name);i in this.$$d||(this.$$d[i]=ye(i,o.value,this.$$p_d,"toProp"))}for(const o in this.$$p_d)!(o in this.$$d)&&this[o]!==void 0&&(this.$$d[o]=this[o],delete this[o]);this.$$c=Xo({component:this.$$ctor,target:this.shadowRoot||this,props:{...this.$$d,$$slots:n,$$host:this}}),this.$$me=he(()=>{var o;this.$$r=!0;for(const i of be(this.$$c)){if(!((o=this.$$p_d[i])!=null&&o.reflect))continue;this.$$d[i]=this.$$c[i];const a=ye(i,this.$$d[i],this.$$p_d,"toAttribute");a==null?this.removeAttribute(this.$$p_d[i].attribute||i):this.setAttribute(this.$$p_d[i].attribute||i,a)}this.$$r=!1});for(const o in this.$$l)for(const i of this.$$l[o]){const a=this.$$c.$on(o,i);this.$$l_u.set(i,a)}this.$$l={}}}attributeChangedCallback(e,n,r){var o;this.$$r||(e=this.$$g_p(e),this.$$d[e]=ye(e,r,this.$$p_d,"toProp"),(o=this.$$c)==null||o.$set({[e]:this.$$d[e]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then(()=>{!this.$$cn&&this.$$c&&(this.$$c.$destroy(),Gt(this.$$me),this.$$c=void 0)})}$$g_p(e){return be(this.$$p_d).find(n=>this.$$p_d[n].attribute===e||!this.$$p_d[n].attribute&&n.toLowerCase()===e)||e}});function ye(t,e,n,r){var i;const o=(i=n[t])==null?void 0:i.type;if(e=o==="Boolean"&&typeof e!="boolean"?e!=null:e,!r||!n[t])return e;if(r==="toAttribute")switch(o){case"Object":case"Array":return e==null?null:JSON.stringify(e);case"Boolean":return e?"":null;case"Number":return e??null;default:return e}else switch(o){case"Object":case"Array":return e&&JSON.parse(e);case"Boolean":return e;case"Number":return e!=null?+e:e;default:return e}}function Jo(t){const e={};return t.childNodes.forEach(n=>{e[n.slot||"default"]=!0}),e}function je(t,e,n,r,o,i){let a=class extends Dr{constructor(){super(t,n,o),this.$$p_d=e}static get observedAttributes(){return be(e).map(d=>(e[d].attribute||d).toLowerCase())}};return be(e).forEach(d=>{se(a.prototype,d,{get(){return this.$$c&&d in this.$$c?this.$$c[d]:this.$$d[d]},set(v){var p;v=ye(d,v,e),this.$$d[d]=v,(p=this.$$c)==null||p.$set({[d]:v})}})}),r.forEach(d=>{se(a.prototype,d,{get(){var v;return(v=this.$$c)==null?void 0:v[d]}})}),t.element=a,a}const At=new Map([["yellow","#F8B920"],["red","#FF4646"],["blue","#0064FF"],["green","#00C564"]]),Go=["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","OPTION"];function jr(t){const e=t.map(a=>a.trim().toLocaleLowerCase()),n=e.map(()=>({start:null,end:null,shift:0})),r=e.map(()=>[]),o=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,a=>{var d,v;return Go.includes((d=a.parentNode)==null?void 0:d.tagName)||((v=a.parentNode)==null?void 0:v.contentEditable)=="true"?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let i;for(;i=o.nextNode();)if(i!=null&&i.nodeValue)for(let a=0;a<i.nodeValue.length;a++){const d=i.nodeValue[a].toLocaleLowerCase().trim();d&&e.forEach((v,p)=>{var y;for(;v[n[p].shift]&&!v[n[p].shift].trim();)n[p].shift++;let g=v[n[p].shift]===d;if(!g&&n[p].shift&&(n[p].shift=0,g=v[n[p].shift]===d),g&&(n[p].shift||(n[p].start=[i,a]),n[p].end=[i,a],n[p].shift++),n[p].shift>=v.length){const E=document.createRange();E.setStart(n[p].start[0],n[p].start[1]),E.setEnd(n[p].end[0],n[p].end[1]+1),!E.collapsed&&((y=E.commonAncestorContainer.parentElement)!=null&&y.checkVisibility())?r[p].push(E):E.detach(),g=!1}g||(n[p].shift=0,n[p].start=null,n[p].end=null)})}return r}const Lt=`rh-${new Date().getTime()}-`,Le="highlights"in CSS;function Zo(t){if(!t.length&&!CSS.highlights.size)return;const e=[];if(CSS.highlights.clear(),t.length){const r=jr(t.map(({text:o})=>o||""));for(const o in t){if(!r[o].length)continue;const{_id:i,color:a,note:d}=t[o],v=`${Lt}${i}`;CSS.highlights.set(v,new Highlight(...r[o]));const p=r[o][0].getBoundingClientRect();e.push(`
                ::highlight(${v}) {
                    all: unset;
                    background-color: color-mix(in srgb, ${At.get(a)||a||"yellow"}, white 60%) !important;
                    color: color-mix(in srgb, ${At.get(a)||a||"yellow"}, black 80%) !important;
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
`)}function Qo(){var t;(t=document.getElementById(Lt))==null||t.remove()}function ti(t){var e;for(const[n,r]of CSS.highlights){const o=n.replace(Lt,"");if(t==o)for(const i of r){(e=i.startContainer.parentElement)==null||e.scrollIntoView({behavior:"smooth",block:"start"});break}}}function ei(t){let e;for(const[n,r]of CSS.highlights)for(const o of r){const i=t.compareBoundaryPoints(Range.START_TO_START,o),a=t.compareBoundaryPoints(Range.END_TO_END,o);(i==0&&a==0||t!=null&&t.collapsed&&i>=0&&a<=0)&&(e=[n.replace(Lt,""),o])}if(e)return e[0].replace(Lt,"")}const Ct=`rh-${new Date().getTime()}`;function ni(t){const e=document.body.querySelectorAll(`.${Ct}`);if(!t.length&&!e.length)return;e.forEach(i=>i.outerHTML=i.innerText);const n=[],r=jr(t.map(({text:i})=>i||""));for(const i in t){const{_id:a,color:d}=t[i];for(const v of r[i]){const p=document.createElement("mark");p.className=Ct,p.setAttribute("data-id",String(a)),p.append(v.extractContents()),v.insertNode(p),v.detach()}n.push(`
            .${Ct}[data-id="${a}"] {
                all: unset;
                display: inline-block !important;
                background-color: white !important;
                background-image: linear-gradient(to bottom, ${zn(At.get(d)||d,.4)} 0, ${zn(At.get(d)||d,.4)} 100%) !important;
                color: black !important;
            }
        `)}const o=(()=>{let i=document.getElementById(Ct);return i||(i=document.createElement("style"),i.id=Ct,document.head.appendChild(i)),i})();o.innerHTML=n.join(`
`)}function ri(){var t;document.body.querySelectorAll(`.${Ct}`).forEach(e=>e.outerHTML=e.innerText),(t=document.getElementById(Ct))==null||t.remove()}function oi(t){const e=document.body.querySelector(`.${Ct}[data-id="${t}"]`);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}function ii(t){const e=t.commonAncestorContainer.nodeType==Node.ELEMENT_NODE?t.commonAncestorContainer:t.commonAncestorContainer.parentElement;if((e==null?void 0:e.className)==Ct){if(!t.collapsed){const n=new Range;n.selectNodeContents(t.commonAncestorContainer);const r=t.compareBoundaryPoints(Range.START_TO_START,n),o=t.compareBoundaryPoints(Range.END_TO_END,n);if(n.detach(),r!=0||o!=0)return}return e.getAttribute("data-id")||void 0}}function zn(t,e){if(!t)return t;const n=parseInt(t.slice(1,3),16),r=parseInt(t.slice(3,5),16),o=parseInt(t.slice(5,7),16);return`rgba(${n}, ${r}, ${o}, ${e})`}function si(t){return Le?Zo(t):ni(t)}function Ve(t){return si(t)}function li(){return Le?Qo():ri()}function Lr(t){return Le?ti(t):oi(t)}function Or(){var n,r,o;const t=document.getSelection();if(!(t!=null&&t.rangeCount))return;const e=t.getRangeAt(0);if(!((o=((n=e==null?void 0:e.commonAncestorContainer)==null?void 0:n.nodeType)==1?e==null?void 0:e.commonAncestorContainer:(r=e==null?void 0:e.commonAncestorContainer)==null?void 0:r.parentElement)!=null&&o.closest('[contenteditable=""], [contenteditable=true]')))return e}function re(){const t=document.getSelection();t!=null&&t.rangeCount&&t.removeAllRanges()}function ai(t){return Le?ei(t):ii(t)}function Un(t){if(!t)return"";var e=document.createElement("div");e.appendChild(t.cloneContents().cloneNode(!0)),document.body.appendChild(e);const n=e.innerText;return document.body.removeChild(e),e=void 0,n}function ui(t,e,n){let r=nt(dt([])),o=nt(!1),i=nt(!1),a=nt(void 0);function d(w){const k=ai(w);if(k)return N(r).find(D=>D._id==k);if(Un(w).trim())return{text:Un(w).trim()}}function v(w){const k={...typeof w._id=="string"?{_id:w._id}:{},...typeof w.text=="string"?{text:w.text}:{},...typeof w.note=="string"?{note:w.note}:{},color:w.color||"yellow"};if(!k.text)return;const $=N(r).findIndex(D=>{var O,x;return D._id==k._id||((O=D.text)==null?void 0:O.toLocaleLowerCase().trim())===((x=k.text)==null?void 0:x.toLocaleLowerCase().trim())});$!=-1?(N(r)[$]=k,e(k)):(N(r).push(k),t(k))}function p({_id:w}){I(r,dt(N(r).filter(k=>k._id!=w))),n({_id:w})}function g(w){I(a,dt(JSON.parse(JSON.stringify(w))))}function y(){N(a)&&(v(N(a)),I(a,void 0))}function E(){I(a,void 0)}return{get highlights(){return N(r)},set highlights(w){I(r,dt(w))},get pro(){return N(o)},set pro(w){I(o,dt(w))},get nav(){return N(i)},set nav(w){I(i,dt(w))},get draft(){return N(a)},find:d,upsert:v,remove:p,setDraft:g,draftSubmit:y,draftCancel:E}}const ci="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ci);function fi(t,e){let n=null,r=!0;return function(...i){n||(r?(t(...i),r=!1):(clearTimeout(n),n=setTimeout(()=>{t(...i),clearTimeout(n),n=null},e)))}}function rn(){var t;return(t=navigator==null?void 0:navigator.userAgentData)!=null&&t.mobile?!0:/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)}var di=bt('<button type="submit" class="svelte-f9ok5r"><span class="color svelte-f9ok5r"></span></button>'),hi=bt('<button type="submit" value="remove" title="Delete highlight" class="svelte-f9ok5r"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-f9ok5r"><g class="svelte-f9ok5r"><line x1="2.75" y1="4.25" x2="15.25" y2="4.25" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-f9ok5r"></line><path d="M6.75,4.25v-1.5c0-.552,.448-1,1-1h2.5c.552,0,1,.448,1,1v1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-f9ok5r"></path><path d="M13.5,6.75l-.4,7.605c-.056,1.062-.934,1.895-1.997,1.895H6.898c-1.064,0-1.941-.833-1.997-1.895l-.4-7.605" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-f9ok5r"></path></g></svg></button>'),pi=bt('<dialog class="svelte-f9ok5r"><form method="dialog" class="svelte-f9ok5r"><!> <button type="submit" value="note" title="Add note" class="svelte-f9ok5r"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-f9ok5r"><g class="svelte-f9ok5r"><path stroke-linecap="round" stroke-linejoin="round" d="M9,1.75C4.996,1.75,1.75,4.996,1.75,9c0,1.319,.358,2.552,.973,3.617,.43,.806-.053,2.712-.973,3.633,1.25,.068,2.897-.497,3.633-.973,.489,.282,1.264,.656,2.279,.848,.433,.082,.881,.125,1.338,.125,4.004,0,7.25-3.246,7.25-7.25S13.004,1.75,9,1.75Z" class="svelte-f9ok5r"></path><path stroke-width="0" d="M9,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-f9ok5r"></path><path stroke-width="0" d="M5.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-f9ok5r"></path><path stroke-width="0" d="M12.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-f9ok5r"></path></g></svg></button> <!></form></dialog>');const vi={hash:"svelte-f9ok5r",code:`
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
`};function Mr(t,e){fe(e,!0),yn(t,vi);let n=De(e,"store",7),r,o=nt(void 0),i=nt(!1);function a(A){if(!N(o))return;const S=A.currentTarget.returnValue;switch(A.currentTarget.returnValue="",S){case"add":n().upsert(N(o)),re();break;case"note":n().setDraft(N(o)),re();break;case"remove":n().remove(N(o)),re();break;default:if(At.has(S)){n().upsert({...N(o),color:S}),re();return}break}}function d(){I(i,!0)}function v(){I(i,!1),setTimeout(p)}function p(){if(N(i)){r==null||r.close();return}requestAnimationFrame(()=>{const A=Or(),S=A&&n().find(A);if(!A||!(S!=null&&S._id)&&!A.toString().trim()){r==null||r.close();return}I(o,dt(S)),r.inert=!0,r==null||r.show(),r.inert=!1;const K=256,R=10,L=A.getBoundingClientRect(),W=Math.min(Math.max(L.x,R)+window.scrollX,window.innerWidth+window.scrollX-K-R),tt=Math.min(window.innerWidth-Math.max(L.x,R)-window.scrollX-L.width,window.innerWidth-window.scrollX-K-R),rt=Math.max(L.y,40)+window.scrollY+L.height+4,ot=window.innerHeight-Math.max(L.y,40)-window.scrollY+4,st=W<window.innerWidth/2+window.scrollX,vt=rt<window.innerHeight/2+window.scrollY;r==null||r.style.setProperty("left",st?`${W}px`:"unset"),r==null||r.style.setProperty("right",st?"unset":`${tt}px`),r==null||r.style.setProperty("top",vt?`${rt}px`:"unset"),r==null||r.style.setProperty("bottom",vt?"unset":`${ot}px`)})}const g=fi(p,200);var y=pi();_t("mousedown",Dt,d,!1),_t("touchstart",Dt,d,!1,!0),_t("mouseup",Dt,v,!1),_t("touchend",Dt,v,!1,!0),_t("touchcancel",Dt,v,!1,!0),_t("selectionchange",Dt,g,!1),nn(y,A=>r=A,()=>r),yt(()=>oe(y,"mobile",rn()));var E=Z(y),w=Z(E);_n(w,71,()=>At,(A,S)=>Q(Q(A))[0],(A,S,K)=>{let R=()=>Q(Q(S))[0],L=()=>Q(Q(S))[1];var W=di(),tt=Z(W);z(W),yt(()=>{var rt;Vo(W,R()),ht(tt,"style",`--color: ${L()??""}`),oe(tt,"active",R()==((rt=N(o))==null?void 0:rt.color))}),at(A,W)});var k=F(F(w,!0)),$=Z(k),D=Z($),O=Z(D),x=F(O),C=F(x),j=F(C);z(D),z($),z(k);var ct=F(F(k,!0));return Te(ct,()=>{var A;return(A=N(o))==null?void 0:A._id},A=>{var S=hi(),K=Z(S),R=Z(K),L=Z(R),W=F(L);F(W),z(R),z(K),z(S),at(A,S)}),z(E),z(y),yt(()=>{var A,S,K,R,L,W;oe(y,"new",!((A=N(o))!=null&&A._id)),ht(O,"fill",(S=N(o))!=null&&S.note?"currentColor":"none"),ht(O,"stroke-width",(K=N(o))!=null&&K.note?"0":void 0),ht(x,"fill",(R=N(o))!=null&&R.note?"none":"currentColor"),ht(C,"fill",(L=N(o))!=null&&L.note?"none":"currentColor"),ht(j,"fill",(W=N(o))!=null&&W.note?"none":"currentColor")}),_t("close",y,a,!1),at(t,y),de({get store(){return n()},set store(A){n(A),Ht()}})}je(Mr,{store:{}},[],[],!0);function mi(t){const e=t.currentTarget.getBoundingClientRect();e.top<=t.clientY&&t.clientY<=e.top+e.height&&e.left<=t.clientX&&t.clientX<=e.left+e.width||(t.preventDefault(),t.currentTarget.close())}var gi=(t,e)=>I(e,!1),_i=bt('<input type="radio" name="color" class="svelte-n7j6yt">'),yi=bt('<div class="unlock svelte-n7j6yt"><a href="https://raindrop.io/pro/buy" target="_blank" class="svelte-n7j6yt">Upgrade to Pro</a> to unlock annotation</div>'),wi=bt('<blockquote role="presentation" class="svelte-n7j6yt"> </blockquote> <fieldset class="color svelte-n7j6yt"></fieldset> <textarea class="note svelte-n7j6yt" rows="4" maxlength="5000" placeholder="Notes (optional)"></textarea> <!>',1),bi=bt('<dialog role="presentation" class="svelte-n7j6yt"><header class="svelte-n7j6yt"> </header> <form method="dialog" class="svelte-n7j6yt"><!> <footer class="svelte-n7j6yt"><button formnovalidate="" class="svelte-n7j6yt">Cancel <sup class="svelte-n7j6yt">esc</sup></button> <button type="submit" value="OK" class="svelte-n7j6yt"> <sup class="svelte-n7j6yt">&crarr;</sup></button></footer></form></dialog>');const Ei={hash:"svelte-n7j6yt",code:`
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
`};function Rr(t,e){fe(e,!0),yn(t,Ei);const n=[];let r=De(e,"store",7),o,i,a=nt(!0);Ze(()=>{r().draft?(I(a,!0),o==null||o.showModal()):o==null||o.close()});function d(x){const C=x.currentTarget.returnValue;x.currentTarget.returnValue="",setTimeout(C?r().draftSubmit:r().draftCancel,200)}function v(x){var C;rn()||(x.stopImmediatePropagation(),x.stopPropagation(),x.key=="Enter"&&!x.shiftKey&&(x.preventDefault(),i&&((C=x.currentTarget.closest("form"))==null||C.requestSubmit(i))))}var p=bi();nn(p,x=>o=x,()=>o),p.__mousedown=[mi],yt(()=>oe(p,"mobile",rn()));var g=Z(p),y=Z(g);z(g);var E=F(F(g,!0)),w=Z(E);Te(w,()=>r().draft,x=>{var C=wi(),j=mn(C);j.__click=[gi,a];var ct=Z(j);yt(()=>{var R,L;return Be(ct,((L=(R=r().draft)==null?void 0:R.text)==null?void 0:L.trim())||"")}),z(j);var A=F(F(j,!0));_n(A,73,()=>At,Ho,(R,L,W)=>{let tt=()=>Q(Q(L))[0],rt=()=>Q(Q(L))[1];var ot=_i();Wo(ot);var st;yt(()=>{st!==(st=tt())&&(ot.value=(ot.__value=tt())==null?"":tt()),ht(ot,"style",`--color: ${rt()??""}`)}),Uo(n,[],ot,()=>(tt(),r().draft.color),vt=>r().draft.color=vt),at(R,ot)}),z(A);var S=F(F(A,!0));Yo(S),Bo(S),S.__keydown=v;var K=F(F(S,!0));Te(K,()=>!r().pro,R=>{var L=yi();Z(L),to(),z(L),at(R,L)}),yt(()=>{oe(j,"compact",N(a)),S.disabled=!r().pro}),zo(S,()=>r().draft.note,R=>r().draft.note=R),at(x,C)});var k=F(F(w,!0)),$=Z(k);F(Z($)),z($);var D=F(F($,!0));nn(D,x=>i=x,()=>i);var O=Z(D);return F(O),z(D),z(k),z(E),z(p),yt(()=>{var x,C;Be(y,`${((x=r().draft)!=null&&x._id?"Edit":"New")??""} highlight`),Be(O,`${((C=r().draft)!=null&&C._id?"Update":"Create")??""} `)}),_t("close",p,d,!1),at(t,p),de({get store(){return r()},set store(x){r(x),Ht()}})}$r(["mousedown","click","keydown"]);je(Rr,{store:{}},[],[],!0);const ki=t=>{const e=t.target.getAttribute("data-highlight");e&&(t.preventDefault(),Lr(e))};var Ci=bt('<div class="svelte-1t9y4ki"></div>'),$i=bt('<nav role="presentation" class="svelte-1t9y4ki"></nav>');const xi={hash:"svelte-1t9y4ki",code:`
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
`};function Fr(t,e){fe(e,!0),yn(t,xi);let n=De(e,"store",7);var r=Mo(),o=mn(r);return Te(o,()=>n().nav,i=>{var a=$i();a.__click=[ki],_n(a,77,()=>n().highlights,(d,v)=>Q(d)._id,(d,v,p)=>{var g=Ci();yt(()=>ht(g,"style",`top: var(--highlight-${Q(v)._id??""}-top); --color: ${(At.get(Q(v).color)||Q(v).color)??""}`)),yt(()=>ht(g,"data-highlight",Q(v)._id)),at(d,g)}),z(a),at(i,a)}),at(t,r),de({get store(){return n()},set store(i){n(i),Ht()}})}$r(["click"]);je(Fr,{store:{}},[],[],!0);var Ti=bt("<!> <!> <!>",1);function Si(t,e){fe(e,!0);let n=De(e,"store",7);Ze(()=>{Ve(n().highlights)});let r;function o(){Ve(n().highlights),clearTimeout(r),r=setTimeout(()=>Ve(n().highlights),3e3)}gr(()=>{document.readyState&&o()}),Ze(()=>li);var i=Ti();_t("load",xe,o,!1),_t("popstate",xe,o,!1);var a=mn(i);Mr(a,{get store(){return n()}});var d=F(F(a,!0));Rr(d,{get store(){return n()}});var v=F(F(d,!0));return Fr(v,{get store(){return n()}}),at(t,i),de({get store(){return n()},set store(p){n(p),Ht()}})}customElements.define("rdh-ui",je(Si,{store:{}},[],[],!0));function Ni(t){if(typeof chrome=="object"&&chrome.runtime&&chrome.runtime.onMessage||typeof browser=="object"&&browser.runtime&&browser.runtime.onMessage){const{runtime:e}=typeof browser=="object"?browser:chrome,n=(r,o)=>{o.id==e.id&&typeof r.type=="string"&&t(r)};return e.onMessage.removeListener(n),e.onMessage.addListener(n),r=>e.sendMessage(null,r)}if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.rdh)return window.rdhSend=t,e=>window.webkit.messageHandlers.rdh.postMessage(e);if(typeof window<"u"&&typeof window.process=="object"&&window.process.type==="renderer"||typeof process<"u"&&typeof process.versions=="object"&&process.versions.electron){const{ipcRenderer:e}=require("electron"),n=(r,o)=>t(o);return e.removeListener("RDH",n),e.on("RDH",n),r=>e.sendToHost("RDH",r)}if("ReactNativeWebView"in window)return window.ReactNativeWebViewSendMessage=t,e=>window.ReactNativeWebView.postMessage(JSON.stringify(e));if(window.self!==window.top){const e=({data:n,source:r})=>{r!==window.parent||typeof n!="object"||typeof n.type!="string"||t(n)};return window.removeEventListener("message",e),window.addEventListener("message",e),n=>window.parent.postMessage(n,"*")}throw new Error("unsupported platform")}async function Ai(t){let e=!1;const n=new Set,r=Ni(o=>{if(!e){n.add(o);return}t(o)});await new Promise(o=>{function i(){window.removeEventListener("DOMContentLoaded",i),o()}document.readyState=="loading"?(window.removeEventListener("DOMContentLoaded",i),window.addEventListener("DOMContentLoaded",i,{once:!0})):o()}),e=!0;for(const o of n)t(o),n.delete(o);return r}const ee=document.createElement("rdh-ui");(async()=>{const t=await Ai(n=>{switch(n.type){case"RDH_APPLY":Array.isArray(n.payload)&&(e.highlights=n.payload);break;case"RDH_CONFIG":typeof n.payload.pro=="boolean"&&(e.pro=n.payload.pro),typeof n.payload.nav=="boolean"&&(e.nav=n.payload.nav),typeof n.payload.enabled=="boolean"&&(n.payload.enabled===!0?document.body.contains(ee)||document.body.appendChild(ee):document.body.contains(ee)&&document.body.removeChild(ee));break;case"RDH_SCROLL":typeof n.payload._id=="string"&&Lr(n.payload._id);break;case"RDH_ADD_SELECTION":const r=Or();if(!r)return;const o=e.find(r);if(!o)return;e.upsert(o),re();break;case"RDH_NOTE_SELECTION":console.log("not implemented yet");break}}),e=ui(n=>t({type:"RDH_ADD",payload:n}),n=>t({type:"RDH_UPDATE",payload:n}),({_id:n})=>t({type:"RDH_REMOVE",payload:{_id:n}}));ee.store=e,t({type:"RDH_READY",payload:{url:location.href}})})();
