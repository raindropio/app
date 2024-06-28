"use strict";var Ir=Object.defineProperty;var Sn=t=>{throw TypeError(t)};var qr=(t,e,n)=>e in t?Ir(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ct=(t,e,n)=>qr(t,typeof e!="symbol"?e+"":e,n),Nn=(t,e,n)=>e.has(t)||Sn("Cannot "+n);var Z=(t,e,n)=>(Nn(t,e,"read from private field"),n?n.call(t):e.get(t)),Ie=(t,e,n)=>e.has(t)?Sn("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),qe=(t,e,n,r)=>(Nn(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n);(function(){var t=window.Document.prototype.createElement,e=window.Document.prototype.createElementNS,n=window.Document.prototype.importNode,r=window.Document.prototype.prepend,o=window.Document.prototype.append,s=window.DocumentFragment.prototype.prepend,c=window.DocumentFragment.prototype.append,v=window.Node.prototype.cloneNode,p=window.Node.prototype.appendChild,d=window.Node.prototype.insertBefore,y=window.Node.prototype.removeChild,w=window.Node.prototype.replaceChild,E=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),g=window.Element.prototype.attachShadow,z=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),T=window.Element.prototype.getAttribute,k=window.Element.prototype.setAttribute,O=window.Element.prototype.removeAttribute,$=window.Element.prototype.toggleAttribute,C=window.Element.prototype.getAttributeNS,D=window.Element.prototype.setAttributeNS,ut=window.Element.prototype.removeAttributeNS,S=window.Element.prototype.insertAdjacentElement,N=window.Element.prototype.insertAdjacentHTML,J=window.Element.prototype.prepend,M=window.Element.prototype.append,L=window.Element.prototype.before,W=window.Element.prototype.after,G=window.Element.prototype.replaceWith,tt=window.Element.prototype.remove,et=window.HTMLElement,rt=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),ht=window.HTMLElement.prototype.insertAdjacentElement,Jt=window.HTMLElement.prototype.insertAdjacentHTML,_n=new Set;"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(i){return _n.add(i)});function yn(i){var l=_n.has(i);return i=/^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(i),!l&&i}var Or=document.contains?document.contains.bind(document):document.documentElement.contains.bind(document.documentElement);function F(i){var l=i.isConnected;if(l!==void 0)return l;if(Or(i))return!0;for(;i&&!(i.__CE_isImportDocument||i instanceof Document);)i=i.parentNode||(window.ShadowRoot&&i instanceof ShadowRoot?i.host:void 0);return!(!i||!(i.__CE_isImportDocument||i instanceof Document))}function Re(i){var l=i.children;if(l)return Array.prototype.slice.call(l);for(l=[],i=i.firstChild;i;i=i.nextSibling)i.nodeType===Node.ELEMENT_NODE&&l.push(i);return l}function He(i,l){for(;l&&l!==i&&!l.nextSibling;)l=l.parentNode;return l&&l!==i?l.nextSibling:null}function je(i,l,u){for(var h=i;h;){if(h.nodeType===Node.ELEMENT_NODE){var a=h;l(a);var f=a.localName;if(f==="link"&&a.getAttribute("rel")==="import"){if(h=a.import,u===void 0&&(u=new Set),h instanceof Node&&!u.has(h))for(u.add(h),h=h.firstChild;h;h=h.nextSibling)je(h,l,u);h=He(i,a);continue}else if(f==="template"){h=He(i,a);continue}if(a=a.__CE_shadowRoot)for(a=a.firstChild;a;a=a.nextSibling)je(a,l,u)}h=h.firstChild?h.firstChild:He(i,h)}}function pe(){var i=!(vt==null||!vt.noDocumentConstructionObserver),l=!(vt==null||!vt.shadyDomFastWalk);this.m=[],this.g=[],this.j=!1,this.shadyDomFastWalk=l,this.I=!i}function Gt(i,l,u,h){var a=window.ShadyDOM;if(i.shadyDomFastWalk&&a&&a.inUse){if(l.nodeType===Node.ELEMENT_NODE&&u(l),l.querySelectorAll)for(i=a.nativeMethods.querySelectorAll.call(l,"*"),l=0;l<i.length;l++)u(i[l])}else je(l,u,h)}function Lr(i,l){i.j=!0,i.m.push(l)}function Mr(i,l){i.j=!0,i.g.push(l)}function Fe(i,l){i.j&&Gt(i,l,function(u){return Ft(i,u)})}function Ft(i,l){if(i.j&&!l.__CE_patched){l.__CE_patched=!0;for(var u=0;u<i.m.length;u++)i.m[u](l);for(u=0;u<i.g.length;u++)i.g[u](l)}}function pt(i,l){var u=[];for(Gt(i,l,function(a){return u.push(a)}),l=0;l<u.length;l++){var h=u[l];h.__CE_state===1?i.connectedCallback(h):ve(i,h)}}function nt(i,l){var u=[];for(Gt(i,l,function(a){return u.push(a)}),l=0;l<u.length;l++){var h=u[l];h.__CE_state===1&&i.disconnectedCallback(h)}}function bt(i,l,u){u=u===void 0?{}:u;var h=u.J,a=u.upgrade||function(m){return ve(i,m)},f=[];for(Gt(i,l,function(m){if(i.j&&Ft(i,m),m.localName==="link"&&m.getAttribute("rel")==="import"){var _=m.import;_ instanceof Node&&(_.__CE_isImportDocument=!0,_.__CE_registry=document.__CE_registry),_&&_.readyState==="complete"?_.__CE_documentLoadHandled=!0:m.addEventListener("load",function(){var b=m.import;if(!b.__CE_documentLoadHandled){b.__CE_documentLoadHandled=!0;var x=new Set;h&&(h.forEach(function(H){return x.add(H)}),x.delete(b)),bt(i,b,{J:x,upgrade:a})}})}else f.push(m)},h),l=0;l<f.length;l++)a(f[l])}function ve(i,l){try{var u=l.ownerDocument,h=u.__CE_registry,a=h&&(u.defaultView||u.__CE_isImportDocument)?me(h,l.localName):void 0;if(a&&l.__CE_state===void 0){a.constructionStack.push(l);try{try{if(new a.constructorFunction!==l)throw Error("The custom element constructor did not produce the element being upgraded.")}finally{a.constructionStack.pop()}}catch(b){throw l.__CE_state=2,b}if(l.__CE_state=1,l.__CE_definition=a,a.attributeChangedCallback&&l.hasAttributes()){var f=a.observedAttributes;for(a=0;a<f.length;a++){var m=f[a],_=l.getAttribute(m);_!==null&&i.attributeChangedCallback(l,m,null,_,null)}}F(l)&&i.connectedCallback(l)}}catch(b){Pt(b)}}pe.prototype.connectedCallback=function(i){var l=i.__CE_definition;if(l.connectedCallback)try{l.connectedCallback.call(i)}catch(u){Pt(u)}},pe.prototype.disconnectedCallback=function(i){var l=i.__CE_definition;if(l.disconnectedCallback)try{l.disconnectedCallback.call(i)}catch(u){Pt(u)}},pe.prototype.attributeChangedCallback=function(i,l,u,h,a){var f=i.__CE_definition;if(f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(l))try{f.attributeChangedCallback.call(i,l,u,h,a)}catch(m){Pt(m)}};function wn(i,l,u,h){var a=l.__CE_registry;if(a&&(h===null||h==="http://www.w3.org/1999/xhtml")&&(a=me(a,u)))try{var f=new a.constructorFunction;if(f.__CE_state===void 0||f.__CE_definition===void 0)throw Error("Failed to construct '"+u+"': The returned value was not constructed with the HTMLElement constructor.");if(f.namespaceURI!=="http://www.w3.org/1999/xhtml")throw Error("Failed to construct '"+u+"': The constructed element's namespace must be the HTML namespace.");if(f.hasAttributes())throw Error("Failed to construct '"+u+"': The constructed element must not have any attributes.");if(f.firstChild!==null)throw Error("Failed to construct '"+u+"': The constructed element must not have any children.");if(f.parentNode!==null)throw Error("Failed to construct '"+u+"': The constructed element must not have a parent node.");if(f.ownerDocument!==l)throw Error("Failed to construct '"+u+"': The constructed element's owner document is incorrect.");if(f.localName!==u)throw Error("Failed to construct '"+u+"': The constructed element's local name is incorrect.");return f}catch(m){return Pt(m),l=h===null?t.call(l,u):e.call(l,h,u),Object.setPrototypeOf(l,HTMLUnknownElement.prototype),l.__CE_state=2,l.__CE_definition=void 0,Ft(i,l),l}return l=h===null?t.call(l,u):e.call(l,h,u),Ft(i,l),l}function Pt(i){var l="",u="",h=0,a=0;i instanceof Error?(l=i.message,u=i.sourceURL||i.fileName||"",h=i.line||i.lineNumber||0,a=i.column||i.columnNumber||0):l="Uncaught "+String(i);var f=void 0;ErrorEvent.prototype.initErrorEvent===void 0?f=new ErrorEvent("error",{cancelable:!0,message:l,filename:u,lineno:h,colno:a,error:i}):(f=document.createEvent("ErrorEvent"),f.initErrorEvent("error",!1,!0,l,u,h),f.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0}})}),f.error===void 0&&Object.defineProperty(f,"error",{configurable:!0,enumerable:!0,get:function(){return i}}),window.dispatchEvent(f),f.defaultPrevented||console.error(i)}function bn(){var i=this;this.g=void 0,this.F=new Promise(function(l){i.l=l})}bn.prototype.resolve=function(i){if(this.g)throw Error("Already resolved.");this.g=i,this.l(i)};function En(i){var l=document;this.l=void 0,this.h=i,this.g=l,bt(this.h,this.g),this.g.readyState==="loading"&&(this.l=new MutationObserver(this.G.bind(this)),this.l.observe(this.g,{childList:!0,subtree:!0}))}function Cn(i){i.l&&i.l.disconnect()}En.prototype.G=function(i){var l=this.g.readyState;for(l!=="interactive"&&l!=="complete"||Cn(this),l=0;l<i.length;l++)for(var u=i[l].addedNodes,h=0;h<u.length;h++)bt(this.h,u[h])};function q(i){this.s=new Map,this.u=new Map,this.C=new Map,this.A=!1,this.B=new Map,this.o=function(l){return l()},this.i=!1,this.v=[],this.h=i,this.D=i.I?new En(i):void 0}q.prototype.H=function(i,l){var u=this;if(!(l instanceof Function))throw new TypeError("Custom element constructor getters must be functions.");$n(this,i),this.s.set(i,l),this.v.push(i),this.i||(this.i=!0,this.o(function(){return xn(u)}))},q.prototype.define=function(i,l){var u=this;if(!(l instanceof Function))throw new TypeError("Custom element constructors must be functions.");$n(this,i),kn(this,i,l),this.v.push(i),this.i||(this.i=!0,this.o(function(){return xn(u)}))};function $n(i,l){if(!yn(l))throw new SyntaxError("The element name '"+l+"' is not valid.");if(me(i,l))throw Error("A custom element with name '"+(l+"' has already been defined."));if(i.A)throw Error("A custom element is already being defined.")}function kn(i,l,u){i.A=!0;var h;try{var a=u.prototype;if(!(a instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var f=function(H){var It=a[H];if(It!==void 0&&!(It instanceof Function))throw Error("The '"+H+"' callback must be a function.");return It},m=f("connectedCallback"),_=f("disconnectedCallback"),b=f("adoptedCallback"),x=(h=f("attributeChangedCallback"))&&u.observedAttributes||[]}catch(H){throw H}finally{i.A=!1}return u={localName:l,constructorFunction:u,connectedCallback:m,disconnectedCallback:_,adoptedCallback:b,attributeChangedCallback:h,observedAttributes:x,constructionStack:[]},i.u.set(l,u),i.C.set(u.constructorFunction,u),u}q.prototype.upgrade=function(i){bt(this.h,i)};function xn(i){if(i.i!==!1){i.i=!1;for(var l=[],u=i.v,h=new Map,a=0;a<u.length;a++)h.set(u[a],[]);for(bt(i.h,document,{upgrade:function(b){if(b.__CE_state===void 0){var x=b.localName,H=h.get(x);H?H.push(b):i.u.has(x)&&l.push(b)}}}),a=0;a<l.length;a++)ve(i.h,l[a]);for(a=0;a<u.length;a++){for(var f=u[a],m=h.get(f),_=0;_<m.length;_++)ve(i.h,m[_]);(f=i.B.get(f))&&f.resolve(void 0)}u.length=0}}q.prototype.get=function(i){if(i=me(this,i))return i.constructorFunction},q.prototype.whenDefined=function(i){if(!yn(i))return Promise.reject(new SyntaxError("'"+i+"' is not a valid custom element name."));var l=this.B.get(i);if(l)return l.F;l=new bn,this.B.set(i,l);var u=this.u.has(i)||this.s.has(i);return i=this.v.indexOf(i)===-1,u&&i&&l.resolve(void 0),l.F},q.prototype.polyfillWrapFlushCallback=function(i){this.D&&Cn(this.D);var l=this.o;this.o=function(u){return i(function(){return l(u)})}};function me(i,l){var u=i.u.get(l);if(u)return u;if(u=i.s.get(l)){i.s.delete(l);try{return kn(i,l,u())}catch(h){Pt(h)}}}q.prototype.define=q.prototype.define,q.prototype.upgrade=q.prototype.upgrade,q.prototype.get=q.prototype.get,q.prototype.whenDefined=q.prototype.whenDefined,q.prototype.polyfillDefineLazy=q.prototype.H,q.prototype.polyfillWrapFlushCallback=q.prototype.polyfillWrapFlushCallback;function Pe(i,l,u){function h(a){return function(f){for(var m=[],_=0;_<arguments.length;++_)m[_]=arguments[_];_=[];for(var b=[],x=0;x<m.length;x++){var H=m[x];if(H instanceof Element&&F(H)&&b.push(H),H instanceof DocumentFragment)for(H=H.firstChild;H;H=H.nextSibling)_.push(H);else _.push(H)}for(a.apply(this,m),m=0;m<b.length;m++)nt(i,b[m]);if(F(this))for(m=0;m<_.length;m++)b=_[m],b instanceof Element&&pt(i,b)}}u.prepend!==void 0&&(l.prepend=h(u.prepend)),u.append!==void 0&&(l.append=h(u.append))}function Rr(i){Document.prototype.createElement=function(l){return wn(i,this,l,null)},Document.prototype.importNode=function(l,u){return l=n.call(this,l,!!u),this.__CE_registry?bt(i,l):Fe(i,l),l},Document.prototype.createElementNS=function(l,u){return wn(i,this,u,l)},Pe(i,Document.prototype,{prepend:r,append:o})}function Hr(i){function l(h){return function(a){for(var f=[],m=0;m<arguments.length;++m)f[m]=arguments[m];m=[];for(var _=[],b=0;b<f.length;b++){var x=f[b];if(x instanceof Element&&F(x)&&_.push(x),x instanceof DocumentFragment)for(x=x.firstChild;x;x=x.nextSibling)m.push(x);else m.push(x)}for(h.apply(this,f),f=0;f<_.length;f++)nt(i,_[f]);if(F(this))for(f=0;f<m.length;f++)_=m[f],_ instanceof Element&&pt(i,_)}}var u=Element.prototype;L!==void 0&&(u.before=l(L)),W!==void 0&&(u.after=l(W)),G!==void 0&&(u.replaceWith=function(h){for(var a=[],f=0;f<arguments.length;++f)a[f]=arguments[f];f=[];for(var m=[],_=0;_<a.length;_++){var b=a[_];if(b instanceof Element&&F(b)&&m.push(b),b instanceof DocumentFragment)for(b=b.firstChild;b;b=b.nextSibling)f.push(b);else f.push(b)}for(_=F(this),G.apply(this,a),a=0;a<m.length;a++)nt(i,m[a]);if(_)for(nt(i,this),a=0;a<f.length;a++)m=f[a],m instanceof Element&&pt(i,m)}),tt!==void 0&&(u.remove=function(){var h=F(this);tt.call(this),h&&nt(i,this)})}function jr(i){function l(a,f){Object.defineProperty(a,"innerHTML",{enumerable:f.enumerable,configurable:!0,get:f.get,set:function(m){var _=this,b=void 0;if(F(this)&&(b=[],Gt(i,this,function(It){It!==_&&b.push(It)})),f.set.call(this,m),b)for(var x=0;x<b.length;x++){var H=b[x];H.__CE_state===1&&i.disconnectedCallback(H)}return this.ownerDocument.__CE_registry?bt(i,this):Fe(i,this),m}})}function u(a,f){a.insertAdjacentElement=function(m,_){var b=F(_);return m=f.call(this,m,_),b&&nt(i,_),F(m)&&pt(i,_),m}}function h(a,f){function m(_,b){for(var x=[];_!==b;_=_.nextSibling)x.push(_);for(b=0;b<x.length;b++)bt(i,x[b])}a.insertAdjacentHTML=function(_,b){if(_=_.toLowerCase(),_==="beforebegin"){var x=this.previousSibling;f.call(this,_,b),m(x||this.parentNode.firstChild,this)}else if(_==="afterbegin")x=this.firstChild,f.call(this,_,b),m(this.firstChild,x);else if(_==="beforeend")x=this.lastChild,f.call(this,_,b),m(x||this.firstChild,null);else if(_==="afterend")x=this.nextSibling,f.call(this,_,b),m(this.nextSibling,x);else throw new SyntaxError("The value provided ("+String(_)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.")}}g&&(Element.prototype.attachShadow=function(a){if(a=g.call(this,a),i.j&&!a.__CE_patched){a.__CE_patched=!0;for(var f=0;f<i.m.length;f++)i.m[f](a)}return this.__CE_shadowRoot=a}),z&&z.get?l(Element.prototype,z):rt&&rt.get?l(HTMLElement.prototype,rt):Mr(i,function(a){l(a,{enumerable:!0,configurable:!0,get:function(){return v.call(this,!0).innerHTML},set:function(f){var m=this.localName==="template",_=m?this.content:this,b=e.call(document,this.namespaceURI,this.localName);for(b.innerHTML=f;0<_.childNodes.length;)y.call(_,_.childNodes[0]);for(f=m?b.content:b;0<f.childNodes.length;)p.call(_,f.childNodes[0])}})}),Element.prototype.setAttribute=function(a,f){if(this.__CE_state!==1)return k.call(this,a,f);var m=T.call(this,a);k.call(this,a,f),f=T.call(this,a),i.attributeChangedCallback(this,a,m,f,null)},Element.prototype.setAttributeNS=function(a,f,m){if(this.__CE_state!==1)return D.call(this,a,f,m);var _=C.call(this,a,f);D.call(this,a,f,m),m=C.call(this,a,f),i.attributeChangedCallback(this,f,_,m,a)},Element.prototype.removeAttribute=function(a){if(this.__CE_state!==1)return O.call(this,a);var f=T.call(this,a);O.call(this,a),f!==null&&i.attributeChangedCallback(this,a,f,null,null)},$&&(Element.prototype.toggleAttribute=function(a,f){if(this.__CE_state!==1)return $.call(this,a,f);var m=T.call(this,a),_=m!==null;return f=$.call(this,a,f),_!==f&&i.attributeChangedCallback(this,a,m,f?"":null,null),f}),Element.prototype.removeAttributeNS=function(a,f){if(this.__CE_state!==1)return ut.call(this,a,f);var m=C.call(this,a,f);ut.call(this,a,f);var _=C.call(this,a,f);m!==_&&i.attributeChangedCallback(this,f,m,_,a)},ht?u(HTMLElement.prototype,ht):S&&u(Element.prototype,S),Jt?h(HTMLElement.prototype,Jt):N&&h(Element.prototype,N),Pe(i,Element.prototype,{prepend:J,append:M}),Hr(i)}var Tn={};function Fr(i){function l(){var u=this.constructor,h=document.__CE_registry.C.get(u);if(!h)throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var a=h.constructionStack;if(a.length===0)return a=t.call(document,h.localName),Object.setPrototypeOf(a,u.prototype),a.__CE_state=1,a.__CE_definition=h,Ft(i,a),a;var f=a.length-1,m=a[f];if(m===Tn)throw Error("Failed to construct '"+h.localName+"': This element was already constructed.");return a[f]=Tn,Object.setPrototypeOf(m,u.prototype),Ft(i,m),m}l.prototype=et.prototype,Object.defineProperty(HTMLElement.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:l}),window.HTMLElement=l}function Pr(i){function l(u,h){Object.defineProperty(u,"textContent",{enumerable:h.enumerable,configurable:!0,get:h.get,set:function(a){if(this.nodeType===Node.TEXT_NODE)h.set.call(this,a);else{var f=void 0;if(this.firstChild){var m=this.childNodes,_=m.length;if(0<_&&F(this)){f=Array(_);for(var b=0;b<_;b++)f[b]=m[b]}}if(h.set.call(this,a),f)for(a=0;a<f.length;a++)nt(i,f[a])}}})}Node.prototype.insertBefore=function(u,h){if(u instanceof DocumentFragment){var a=Re(u);if(u=d.call(this,u,h),F(this))for(h=0;h<a.length;h++)pt(i,a[h]);return u}return a=u instanceof Element&&F(u),h=d.call(this,u,h),a&&nt(i,u),F(this)&&pt(i,u),h},Node.prototype.appendChild=function(u){if(u instanceof DocumentFragment){var h=Re(u);if(u=p.call(this,u),F(this))for(var a=0;a<h.length;a++)pt(i,h[a]);return u}return h=u instanceof Element&&F(u),a=p.call(this,u),h&&nt(i,u),F(this)&&pt(i,u),a},Node.prototype.cloneNode=function(u){return u=v.call(this,!!u),this.ownerDocument.__CE_registry?bt(i,u):Fe(i,u),u},Node.prototype.removeChild=function(u){var h=u instanceof Element&&F(u),a=y.call(this,u);return h&&nt(i,u),a},Node.prototype.replaceChild=function(u,h){if(u instanceof DocumentFragment){var a=Re(u);if(u=w.call(this,u,h),F(this))for(nt(i,h),h=0;h<a.length;h++)pt(i,a[h]);return u}a=u instanceof Element&&F(u);var f=w.call(this,u,h),m=F(this);return m&&nt(i,h),a&&nt(i,u),m&&pt(i,u),f},E&&E.get?l(Node.prototype,E):Lr(i,function(u){l(u,{enumerable:!0,configurable:!0,get:function(){for(var h=[],a=this.firstChild;a;a=a.nextSibling)a.nodeType!==Node.COMMENT_NODE&&h.push(a.textContent);return h.join("")},set:function(h){for(;this.firstChild;)y.call(this,this.firstChild);h!=null&&h!==""&&p.call(this,document.createTextNode(h))}})})}var vt=window.customElements;function zn(){var i=new pe;Fr(i),Rr(i),Pe(i,DocumentFragment.prototype,{prepend:s,append:c}),Pr(i),jr(i),window.CustomElementRegistry=q,i=new q(i),document.__CE_registry=i,Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:i})}vt&&!vt.forcePolyfill&&typeof vt.define=="function"&&typeof vt.get=="function"||zn(),window.__CE_installPolyfill=zn}).call(self);const re=1,on=2,Br=4,Wn=8,Yr=16,We=64,Vr=2,Wr=1,Ur=2,ye="[",Un="]",Xr="",Xn=`${Un}!`,Ue={},qt=Symbol(),Kr=["touchstart","touchmove","touchend"];function Jr(t){console.warn("hydration_mismatch")}let X=!1;function $t(t){X=t}let Ht=null,Tt;function Gr(t){Ht=t,Tt=t&&t[0]}function Wt(t){if(t.nodeType!==8)return t;var e=t;if(e.data!==ye)return t;for(var n=[],r=0;(e=e.nextSibling)!==null;){if(e.nodeType===8){var o=e.data;if(o===ye)r+=1;else if(o[0]===Un){if(r===0)return Ht=n,Tt=n[0],e;r-=1}}n.push(e)}throw Jr(),Ue}var Dt=Array.isArray,Zr=Array.from,we=Object.keys,Kn=Object.isFrozen,oe=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,Qr=Object.prototype,to=Array.prototype,eo=Object.getPrototypeOf;const Ot=2,Jn=4,Ut=8,Gn=16,yt=32,sn=64,zt=128,be=256,dt=512,_t=1024,Lt=2048,Mt=4096,Xt=8192,no=16384,ln=32768,U=Symbol("$state"),ro=Symbol("$state.frozen"),oo=Symbol("");function Zn(t){return t===this.v}function io(t,e){return t!=t?e==e:t!==e||t!==null&&typeof t=="object"||typeof t=="function"}function so(t){return!io(t,this.v)}function lo(t){throw new Error("effect_in_teardown")}function ao(){throw new Error("effect_in_unowned_derived")}function uo(t){throw new Error("effect_orphan")}function co(){throw new Error("effect_update_depth_exceeded")}function fo(){throw new Error("hydration_failed")}function ho(t){throw new Error("props_invalid_value")}function po(){throw new Error("state_unsafe_mutation")}function Q(t){return{f:0,v:t,reactions:null,equals:Zn,version:0}}function Ee(t){var n;const e=Q(t);return e.equals=so,V!==null&&V.l!==null&&((n=V.l).s??(n.s=[])).push(e),e}function P(t,e){var n=t.v!==qt;return n&&I!==null&&Ge()&&I.f&Ot&&po(),t.equals(e)||(t.v=e,t.version=ir(),cn(t,_t,!0),Ge()&&n&&R!==null&&R.f&dt&&!(R.f&yt)&&(Y!==null&&Y.includes(t)?(at(R,_t),De(R)):xt===null?Co([t]):xt.push(t))),e}function it(t,e=!0,n=null,r){if(typeof t=="object"&&t!=null&&!Kn(t)&&!(ro in t)){if(U in t){const s=t[U];if(s.t===t||s.p===t)return s.p}const o=eo(t);if(o===Qr||o===to){const s=new Proxy(t,vo);return oe(t,U,{value:{s:new Map,v:Q(0),a:Dt(t),i:e,p:s,t},writable:!0,enumerable:!1}),s}}return t}function An(t,e=1){P(t,t.v+e)}const vo={defineProperty(t,e,n){if(n.value){const r=t[U],o=r.s.get(e);o!==void 0&&P(o,it(n.value,r.i,r))}return Reflect.defineProperty(t,e,n)},deleteProperty(t,e){const n=t[U],r=n.s.get(e),o=n.a,s=delete t[e];if(o&&s){const c=n.s.get("length"),v=t.length-1;c!==void 0&&c.v!==v&&P(c,v)}return r!==void 0&&P(r,qt),s&&An(n.v),s},get(t,e,n){var s;if(e===U)return Reflect.get(t,U);const r=t[U];let o=r.s.get(e);if(o===void 0&&(!(e in t)||(s=Xe(t,e))!=null&&s.writable)&&(o=(r.i?Q:Ee)(it(t[e],r.i,r)),r.s.set(e,o)),o!==void 0){const c=A(o);return c===qt?void 0:c}return Reflect.get(t,e,n)},getOwnPropertyDescriptor(t,e){const n=Reflect.getOwnPropertyDescriptor(t,e);if(n&&"value"in n){const o=t[U].s.get(e);o&&(n.value=A(o))}return n},has(t,e){var s;if(e===U)return!0;const n=t[U],r=Reflect.has(t,e);let o=n.s.get(e);return(o!==void 0||R!==null&&(!r||(s=Xe(t,e))!=null&&s.writable))&&(o===void 0&&(o=(n.i?Q:Ee)(r?it(t[e],n.i,n):qt),n.s.set(e,o)),A(o)===qt)?!1:r},set(t,e,n,r){const o=t[U];let s=o.s.get(e);s===void 0&&(fr(()=>r[e]),s=o.s.get(e)),s!==void 0&&P(s,it(n,o.i,o));const c=o.a,v=!(e in t);if(c&&e==="length")for(let p=n;p<t.length;p+=1){const d=o.s.get(p+"");d!==void 0&&P(d,qt)}if(t[e]=n,v){if(c){const p=o.s.get("length"),d=t.length;p!==void 0&&p.v!==d&&P(p,d)}An(o.v)}return!0},ownKeys(t){const e=t[U];return A(e.v),Reflect.ownKeys(t)}};function Ce(t){if(t!==null&&typeof t=="object"&&U in t){var e=t[U];if(e)return e.p}return t}function mo(t,e){return Object.is(Ce(t),Ce(e))}function Qn(t){for(var e=0;e<t.length;e++)t[e]()}const go=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let $e=!1,ke=!1,Ke=[],Je=[];function tr(){$e=!1;const t=Ke.slice();Ke=[],Qn(t)}function er(){ke=!1;const t=Je.slice();Je=[],Qn(t)}function le(t){$e||($e=!0,queueMicrotask(tr)),Ke.push(t)}function _o(t){ke||(ke=!0,go(er)),Je.push(t)}function yo(){$e&&tr(),ke&&er()}function wo(t){let e=Ot|_t;R===null&&(e|=zt);const n={deps:null,deriveds:null,equals:Zn,f:e,first:null,fn:t,last:null,reactions:null,v:null,version:0};if(I!==null&&I.f&Ot){var r=I;r.deriveds===null?r.deriveds=[n]:r.deriveds.push(n)}return n}function nr(t){un(t);var e=t.deriveds;if(e!==null){t.deriveds=null;for(var n=0;n<e.length;n+=1)bo(e[n])}}function rr(t){nr(t);var e=sr(t),n=(Bt||t.f&zt)&&t.deps!==null?Lt:dt;at(t,n),t.equals(e)||(t.v=e,t.version=ir(),cn(t,_t,!1))}function bo(t){nr(t),Ne(t,0),at(t,Xt),t.first=t.last=t.deps=t.reactions=t.fn=null}const or=0,Eo=1;let ge=or,ie=!1,Yt=!1,an=!1;function Dn(t){Yt=t}function On(t){an=t}let Nt=[],Vt=0,I=null;function Ln(t){I=t}let R=null,Y=null,B=0,xt=null;function Co(t){xt=t}let $o=0,Bt=!1,V=null;function ir(){return $o++}function Ge(){return V!==null&&V.l===null}function ae(t){var w;var e=t.f,n=(e&_t)!==0;if(n)return!0;var r=(e&zt)!==0,o=(e&be)!==0;if(e&Lt){var s=t.deps;if(s!==null)for(var c=s.length,v,p=0;p<c;p++){var d=s[p];!n&&ae(d)&&rr(d);var y=d.version;if(r){if(y>t.version)return!0;!Bt&&!((w=d==null?void 0:d.reactions)!=null&&w.includes(t))&&(d.reactions??(d.reactions=[])).push(t)}else{if(t.f&_t)return!0;o&&(y>t.version&&(n=!0),v=d.reactions,v===null?d.reactions=[t]:v.includes(t)||v.push(t))}}r||at(t,dt),o&&(t.f^=be)}return n}function ko(t,e,n){throw t}function sr(t){const e=Y,n=B,r=xt,o=I,s=Bt;Y=null,B=0,xt=null,I=t.f&(yt|sn)?null:t,Bt=!Yt&&(t.f&zt)!==0;try{let c=(0,t.fn)(),v=t.deps;if(Y!==null){let p;if(v!==null){const d=v.length,y=B===0?Y:v.slice(0,B).concat(Y),E=y.length>16&&d-B>1?new Set(y):null;for(p=B;p<d;p++){const g=v[p];(E!==null?!E.has(g):!y.includes(g))&&lr(t,g)}}if(v!==null&&B>0)for(v.length=B+Y.length,p=0;p<Y.length;p++)v[B+p]=Y[p];else t.deps=v=Y;if(!Bt)for(p=B;p<v.length;p++){const d=v[p],y=d.reactions;y===null?d.reactions=[t]:y[y.length-1]!==t&&!y.includes(t)&&y.push(t)}}else v!==null&&B<v.length&&(Ne(t,B),v.length=B);return c}finally{Y=e,B=n,xt=r,I=o,Bt=s}}function lr(t,e){const n=e.reactions;let r=0;if(n!==null){r=n.length-1;const o=n.indexOf(t);o!==-1&&(r===0?e.reactions=null:(n[o]=n[r],n.pop()))}r===0&&e.f&Ot&&(at(e,Lt),e.f&(zt|be)||(e.f^=be),Ne(e,0))}function Ne(t,e){const n=t.deps;if(n!==null){const r=e===0?null:n.slice(0,e);let o;for(o=e;o<n.length;o++){const s=n[o];(r===null||!r.includes(s))&&lr(t,s)}}}function un(t,e=!0){let n=t.first;t.first=null,t.last=null;for(var r;n!==null;)r=n.next,de(n,e),n=r}function Ae(t){var e=t.f;if(!(e&Xt)){at(t,dt);var n=t.ctx,r=R,o=V;R=t,V=n;try{e&Gn||un(t),pr(t);var s=sr(t);t.teardown=typeof s=="function"?s:null}catch(c){ko(c)}finally{R=r,V=o}}}function ar(){Vt>1e3&&(Vt=0,co()),Vt++}function ur(t){var e=t.length;if(e!==0){ar();var n=Yt;Yt=!0;try{for(var r=0;r<e;r++){var o=t[r];if(o.first===null&&!(o.f&yt))Mn([o]);else{var s=[];cr(o,s),Mn(s)}}}finally{Yt=n}}}function Mn(t){var e=t.length;if(e!==0)for(var n=0;n<e;n++){var r=t[n];!(r.f&(Xt|Mt))&&ae(r)&&(Ae(r),r.deps===null&&r.first===null&&r.dom===null&&(r.teardown===null?vr(r):r.fn=null))}}function xo(){if(ie=!1,Vt>1001)return;const t=Nt;Nt=[],ur(t),ie||(Vt=0)}function De(t){ge===or&&(ie||(ie=!0,queueMicrotask(xo)));for(var e=t;e.parent!==null;){e=e.parent;var n=e.f;if(n&yt){if(!(n&dt))return;at(e,Lt)}}Nt.push(e)}function cr(t,e){var n=t.first,r=[];t:for(;n!==null;){var o=n.f,s=(o&(Xt|Mt))===0,c=o&yt,v=(o&dt)!==0,p=n.first;if(s&&(!c||!v)){if(c&&at(n,dt),o&Ut){if(!c&&ae(n)&&(Ae(n),p=n.first),p!==null){n=p;continue}}else if(o&Jn)if(c||v){if(p!==null){n=p;continue}}else r.push(n)}var d=n.next;if(d===null){let E=n.parent;for(;E!==null;){if(t===E)break t;var y=E.next;if(y!==null){n=y;continue t}E=E.parent}}n=d}for(var w=0;w<r.length;w++)p=r[w],e.push(p),cr(p,e)}function jt(t,e=!0){var n=ge,r=Nt;try{ar();const s=[];ge=Eo,Nt=s,ie=!1,e&&ur(r);var o=t==null?void 0:t();return yo(),(Nt.length>0||s.length>0)&&jt(),Vt=0,o}finally{ge=n,Nt=r}}function A(t){const e=t.f;if(e&Xt)return t.v;if(I!==null){const n=(I.f&zt)!==0,r=I.deps;Y===null&&r!==null&&r[B]===t&&!(n&&R!==null)?B++:(r===null||B===0||r[B-1]!==t)&&(Y===null?Y=[t]:Y[Y.length-1]!==t&&Y.push(t)),xt!==null&&R!==null&&R.f&dt&&!(R.f&yt)&&xt.includes(t)&&(at(R,_t),De(R))}return e&Ot&&ae(t)&&rr(t),t.v}function cn(t,e,n){var r=t.reactions;if(r!==null)for(var o=Ge(),s=r.length,c=0;c<s;c++){var v=r[c],p=v.f;if(!(p&_t||(!n||!o)&&v===R)){at(v,e);var d=(p&Lt)!==0,y=(p&zt)!==0;(p&dt||d&&y)&&(v.f&Ot?cn(v,Lt,n):De(v))}}}function fr(t){const e=I;try{return I=null,t()}finally{I=e}}const To=~(_t|Lt|dt);function at(t,e){t.f=t.f&To|e}function zo(t){return typeof t=="object"&&t!==null&&typeof t.f=="number"}function ue(t,e=!1,n){V={p:V,c:null,e:null,m:!1,s:t,x:null,l:null},e||(V.l={s:null,u:null,r1:[],r2:Q(!1)})}function ce(t){const e=V;if(e!==null){t!==void 0&&(e.x=t);const r=e.e;if(r!==null){e.e=null;for(var n=0;n<r.length;n++)dn(r[n])}V=e.p,e.m=!0}return t||{}}function K(t){return zo(t)?A(t):t}function So(t){var e=document.createElement("template");return e.innerHTML=t,e.content}function fn(t){if(Dt(t))for(var e=0;e<t.length;e++){var n=t[e];n.isConnected&&n.remove()}else t.isConnected&&t.remove()}function No(t){R===null&&I===null&&uo(),I!==null&&I.f&zt&&ao(),an&&lo()}function Rn(t,e){var n=e.last;n===null?e.last=e.first=t:(n.next=t,t.prev=n,e.last=t)}function Kt(t,e,n){var r=(t&sn)!==0,o={ctx:V,deps:null,dom:null,f:t|_t,first:null,fn:e,last:null,next:null,parent:r?null:R,prev:null,teardown:null,transitions:null};if(n){var s=Yt;try{Dn(!0),Ae(o),o.f|=no}finally{Dn(s)}}else e!==null&&De(o);var c=n&&o.deps===null&&o.first===null&&o.dom===null&&o.teardown===null;return!c&&!r&&(R!==null&&Rn(o,R),I!==null&&I.f&Ot&&Rn(o,I)),o}function dr(t){const e=Kt(Ut,null,!1);return at(e,dt),e.teardown=t,e}function Ze(t){No();var e=R!==null&&(R.f&Ut)!==0&&V!==null&&!V.m;if(e){var n=V;(n.e??(n.e=[])).push(t)}else{var r=dn(t);return r}}function Ao(t){const e=Kt(sn,t,!0);return()=>{de(e)}}function dn(t){return Kt(Jn,t,!1)}function fe(t){return Kt(Ut,t,!0)}function gt(t){return fe(t)}function hr(t,e=0){return Kt(Ut|Gn|e,t,!0)}function se(t){return Kt(Ut|yt,t,!0)}function pr(t){var e=t.teardown;if(e!==null){const n=an,r=I;On(!0),Ln(null);try{e.call(null)}finally{On(n),Ln(r)}}}function de(t,e=!0){var n=t.dom;if(n!==null&&e&&fn(n),un(t,e),Ne(t,0),at(t,Xt),t.transitions)for(const o of t.transitions)o.stop();pr(t);var r=t.parent;r!==null&&t.f&yt&&r.first!==null&&vr(t),t.next=t.prev=t.teardown=t.ctx=t.dom=t.deps=t.parent=t.fn=null}function vr(t){var e=t.parent,n=t.prev,r=t.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),e!==null&&(e.first===t&&(e.first=r),e.last===t&&(e.last=n))}function Qe(t,e){var n=[];hn(t,n,!0),mr(n,()=>{de(t),e&&e()})}function mr(t,e){var n=t.length;if(n>0){var r=()=>--n||e();for(var o of t)o.out(r)}else e()}function hn(t,e,n){if(!(t.f&Mt)){if(t.f^=Mt,t.transitions!==null)for(const c of t.transitions)(c.is_global||n)&&e.push(c);for(var r=t.first;r!==null;){var o=r.next,s=(r.f&ln)!==0||(r.f&yt)!==0;hn(r,e,s?n:!1),r=o}}}function xe(t){gr(t,!0)}function gr(t,e){if(t.f&Mt){t.f^=Mt,ae(t)&&Ae(t);for(var n=t.first;n!==null;){var r=n.next,o=(n.f&ln)!==0||(n.f&yt)!==0;gr(n,o?e:!1),n=r}if(t.transitions!==null)for(const s of t.transitions)(s.is_global||e)&&s.in()}}var Te,St;function _r(){if(Te===void 0){Te=window,St=document;var t=Element.prototype;t.__click=void 0,t.__className="",t.__attributes=null,t.__e=void 0,Text.prototype.__t=void 0}}function he(){return document.createTextNode("")}function st(t){const e=t.firstChild;return X?e===null?t.appendChild(he()):Wt(e):e}function pn(t,e){return X?Wt(Tt):t.firstChild}function j(t,e=!1){var n=t.nextSibling;if(!X)return n;var r=n.nodeType;if(r===8&&n.data===Xr)return j(n,e);if(e&&r!==3){var o=he(),s=R.dom;return s.unshift(o),n==null||n.before(o),o}return Wt(n)}function vn(t){t.textContent=""}function Do(t){return document.createElement(t)}function Oo(t,e,n,r){function o(s){if(r.capture||Qt.call(e,s),!s.cancelBubble)return n.call(this,s)}return t.startsWith("pointer")||t==="wheel"?le(()=>{e.addEventListener(t,o,r)}):e.addEventListener(t,o,r),o}function mt(t,e,n,r,o){var s={capture:r,passive:o},c=Oo(t,e,n,s);(e===document.body||e===window||e===document)&&dr(()=>{e.removeEventListener(t,c,s)})}function yr(t){for(var e=0;e<t.length;e++)wr.add(t[e]);for(var n of tn)n(t)}function Qt(t){var k;var e=this,n=e.ownerDocument,r=t.type,o=((k=t.composedPath)==null?void 0:k.call(t))||[],s=o[0]||t.target,c=0,v=t.__root;if(v){var p=o.indexOf(v);if(p!==-1&&(e===document||e===window)){t.__root=e;return}var d=o.indexOf(e);if(d===-1)return;p<=d&&(c=p)}if(s=o[c]||t.target,s!==e){oe(t,"currentTarget",{configurable:!0,get(){return s||n}});try{for(var y,w=[];s!==null;){var E=s.parentNode||s.host||null;try{var g=s["__"+r];if(g!==void 0&&!s.disabled)if(Dt(g)){var[z,...T]=g;z.apply(s,[t,...T])}else g.call(s,t)}catch(O){y?w.push(O):y=O}if(t.cancelBubble||E===e||E===null)break;s=E}if(y){for(let O of w)queueMicrotask(()=>{throw O});throw y}}finally{t.__root=e,s=e}}}const wr=new Set,tn=new Set;function Be(t,e){(t.__t??(t.__t=t.nodeValue))!==e&&(t.nodeValue=t.__t=e)}function br(t,e){const n=e.anchor??e.target.appendChild(he());return jt(()=>Er(t,{...e,anchor:n}),!1)}function Lo(t,e){const n=e.target,r=Ht;try{return jt(()=>{$t(!0);for(var o=n.firstChild;o&&(o.nodeType!==8||o.data!==ye);)o=o.nextSibling;if(!o)throw Ue;const s=Wt(o),c=Er(t,{...e,anchor:s});return $t(!1),c},!1)}catch(o){if(o===Ue)return e.recover===!1&&fo(),_r(),vn(n),$t(!1),br(t,e);throw o}finally{$t(!!r),Gr(r)}}function Er(t,{target:e,anchor:n,props:r={},events:o,context:s,intro:c=!1}){_r();const v=new Set,p=w=>{for(let E=0;E<w.length;E++){const g=w[E],z=Kr.includes(g);v.has(g)||(v.add(g),e.addEventListener(g,Qt,{passive:z}),document.addEventListener(g,Qt,{passive:z}))}};p(Zr(wr)),tn.add(p);let d;const y=Ao(()=>(se(()=>{if(s){ue({});var w=V;w.c=s}o&&(r.$$events=o),d=t(n,r)||{},s&&ce()}),()=>{for(const w of v)e.removeEventListener(w,Qt),document.removeEventListener(w,Qt);tn.delete(p),en.delete(d)}));return en.set(d,y),d}let en=new WeakMap;function Mo(t){const e=en.get(t);e==null||e()}async function mn(t,e,n){await Promise.resolve();const r=Ro(t);if(!r.getElementById(e)){const o=Do("style");o.id=e,o.textContent=n,(r.head||r).appendChild(o)}}function Ro(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function ze(t,e,n,r=null,o=!1){var s=null,c=null,v=null,p=o?ln:0;hr(()=>{if(v===(v=!!e()))return;let d=!1;if(X){const y=t.data===Xn;v===y&&(fn(Ht),$t(!1),d=!0)}v?(s?xe(s):s=se(()=>n(t)),c&&Qe(c,()=>{c=null})):(c?xe(c):r&&(c=se(()=>r(t))),s&&Qe(s,()=>{s=null})),d&&$t(!0)},p)}let Ye=null;function Ho(t,e){return e}function jo(t,e,n){for(var r=[],o=t.length,s=0;s<o;s++)hn(t[s].e,r,!0);var c=o>0&&r.length===0&&e!==null;if(c){var v=e.parentNode;vn(v),v.append(e),n.clear(),kt(t[0].prev,t[o-1].next)}mr(r,()=>{for(var p=0;p<o;p++){var d=t[p];c||(n.delete(d.k),kt(d.prev,d.next)),de(d.e,!c)}})}function gn(t,e,n,r,o,s=null){var c={flags:e,items:new Map,next:null},v=(e&Wn)!==0;if(v){var p=t;t=X?Wt(p.firstChild):p.appendChild(he())}var d=null;hr(()=>{var y=n(),w=Dt(y)?y:y==null?[]:Array.from(y),E=w.length,g=c.flags;g&We&&!Kn(w)&&!(U in w)&&(g^=We,g&Br&&!(g&re)&&(g^=re));let z=!1;if(X){var T=t.data===Xn;(T!==(E===0)||Tt===void 0)&&(fn(Ht),$t(!1),z=!0)}if(X){for(var k=Tt,O=c,$,C=0;C<E;C++){if(k.nodeType!==8||k.data!==ye){z=!0,$t(!1);break}k=Wt(k);var D=w[C],ut=r(D,C);$=Cr(k,O,null,D,ut,C,o,g),c.items.set(ut,$),k=k.nextSibling,O=$}if(E>0)for(;k!==t;){var S=k.nextSibling;k.remove(),k=S}}X||Fo(w,c,t,o,g,r),s!==null&&(E===0?d?xe(d):d=se(()=>s(t)):d!==null&&Qe(d,()=>{d=null})),z&&$t(!0)})}function Fo(t,e,n,r,o,s){var tt,et,rt,ht;var c=(o&Yr)!==0,v=(o&(re|on))!==0,p=t.length,d=e.items,y=e.next,w=y,E=new Set,g=e,z=new Set,T=[],k=[],O,$,C,D;if(c)for(D=0;D<p;D+=1)O=t[D],$=s(O,D),C=d.get($),C!==void 0&&((tt=C.a)==null||tt.measure(),z.add(C));for(D=0;D<p;D+=1){if(O=t[D],$=s(O,D),C=d.get($),C===void 0){var ut=w?ee(w.e):n;g=Cr(ut,g,g.next,O,$,D,r,o),d.set($,g),T=[],k=[],w=g.next;continue}if(v&&Po(C,O,D,o),C.e.f&Mt&&(xe(C.e),c&&((et=C.a)==null||et.unfix(),z.delete(C))),C!==w){if(E.has(C)){if(T.length<k.length){var S=k[0],N;g=S.prev;var J=T[0],M=T[T.length-1];for(N=0;N<T.length;N+=1)jn(T[N],S,n);for(N=0;N<k.length;N+=1)E.delete(k[N]);kt(J.prev,M.next),kt(g,J),kt(M,S),w=S,g=M,D-=1,T=[],k=[]}else E.delete(C),jn(C,w,n),kt(C.prev,C.next),kt(C,g.next),kt(g,C),g=C;continue}for(T=[],k=[];w!==null&&w.k!==$;)E.add(w),k.push(w),w=w.next;if(w===null)continue;C=w}T.push(C),g=C,w=C.next}const L=Array.from(E);for(;w!==null;)L.push(w),w=w.next;var W=L.length;if(W>0){var G=o&Wn&&p===0?n:null;if(c){for(D=0;D<W;D+=1)(rt=L[D].a)==null||rt.measure();for(D=0;D<W;D+=1)(ht=L[D].a)==null||ht.fix()}jo(L,G,d)}c&&le(()=>{var Jt;for(C of z)(Jt=C.a)==null||Jt.apply()})}function Po(t,e,n,r){r&re&&P(t.v,e),r&on?P(t.i,n):t.i=n}function Cr(t,e,n,r,o,s,c,v){var p=Ye;try{var d=(v&re)!==0,y=(v&We)===0,w=d?y?Ee(r):Q(r):r,E=v&on?Q(s):s,g={i:E,v:w,k:o,a:null,e:null,prev:e,next:n};return e.next=g,n!==null&&(n.prev=g),Ye=g,g.e=se(()=>c(t,w,E)),g}finally{Ye=p}}function Hn(t,e){if(t.nodeType===3&&t.data===""||t.nodeType===8){for(var n=e.first,r;n!==null&&(r=n.first,n.dom===null);){if(r===null)return t.previousSibling;n=r}return ee(n)}return t}function ee(t){var e=t.dom;return Dt(e)?Hn(e[0],t):Hn(e,t)}function jn(t,e,n){for(var r=t.next?ee(t.next.e):n,o=e?ee(e.e):n,s=ee(t.e);s!==r;){var c=s.nextSibling;o.before(s),s=c}}function kt(t,e){t.next=e,e!==null&&(e.prev=t)}function Se(t,e=R){var n=e.dom;return n===null?e.dom=t:(Dt(n)||(n=e.dom=[n]),Dt(t)?n.push(...t):n.push(t)),t}function wt(t,e){var n=(e&Wr)!==0,r=(e&Ur)!==0,o;return()=>{if(X)return Se(n?Ht:Tt),Tt;o||(o=So(t),n||(o=o.firstChild));var s=r?document.importNode(o,!0):o.cloneNode(!0);return Se(n?[...s.childNodes]:s),s}}function Io(){if(X)return Se(Ht),Tt;var t=document.createDocumentFragment(),e=he();return t.append(e),Se([e]),t}function lt(t,e){X||t.before(e)}function qo(t,e){{const n=document.body;t.autofocus=!0,le(()=>{document.activeElement===n&&t.focus()})}}function Bo(t){X&&t.firstChild!==null&&vn(t)}let Fn=!1;function $r(){Fn||(Fn=!0,document.addEventListener("reset",t=>{Promise.resolve().then(()=>{var e;if(!t.defaultPrevented)for(const n of t.target.elements)(e=n.__on_r)==null||e.call(n)})},{capture:!0}))}function Yo(t){if(X){var e=!1,n=()=>{if(!e){if(e=!0,t.hasAttribute("value")){var r=t.value;ft(t,"value",null),t.value=r}if(t.hasAttribute("checked")){var o=t.checked;ft(t,"checked",null),t.checked=o}}};t.__on_r=n,_o(n),$r()}}function Vo(t,e){var n=t.__attributes??(t.__attributes={});n.value!==(n.value=e)&&(t.value=e)}function ft(t,e,n){n=n==null?null:n+"";var r=t.__attributes??(t.__attributes={});X&&(r[e]=t.getAttribute(e),e==="src"||e==="href"||e==="srcset")||r[e]!==(r[e]=n)&&(e==="loading"&&(t[oo]=n),n===null?t.removeAttribute(e):t.setAttribute(e,n))}function ne(t,e,n){n?t.classList.add(e):t.classList.remove(e)}function kr(t,e,n,r=n){t.addEventListener(e,n);const o=t.__on_r;o?t.__on_r=()=>{o(),r()}:t.__on_r=r,$r()}function Wo(t,e,n){kr(t,"input",()=>{n(In(t)?qn(t.value):t.value)}),fe(()=>{var r=e();if(X&&t.defaultValue!==t.value){n(t.value);return}In(t)&&r===qn(t.value)||t.type==="date"&&!r&&!t.value||(t.value=r??"")})}function Uo(t,e,n,r,o){var s=n.getAttribute("type")==="checkbox",c=t;let v=!1;if(e!==null)for(var p of e){var d=c;c=d[p],c===void 0&&(c=d[p]=[])}c.push(n),kr(n,"change",()=>{var y=n.__value;s&&(y=Pn(c,y,n.checked)),o(y)},()=>o(s?[]:null)),fe(()=>{var y=r();if(X&&n.defaultChecked!==n.checked){v=!0;return}s?(y=y||[],n.checked=Ce(y).includes(Ce(n.__value))):n.checked=mo(n.__value,y)}),dr(()=>{var y=c.indexOf(n);y!==-1&&c.splice(y,1)}),le(()=>{if(c.sort((E,g)=>E.compareDocumentPosition(g)===4?-1:1),v){var y;if(s)y=Pn(c,y,n.checked);else{var w=c.find(E=>E.checked);y=w==null?void 0:w.__value}o(y)}})}function Pn(t,e,n){for(var r=new Set,o=0;o<t.length;o+=1)t[o].checked&&r.add(t[o].__value);return n||r.delete(e),Array.from(r)}function In(t){var e=t.type;return e==="number"||e==="range"}function qn(t){return t===""?null:+t}function Bn(t,e){var r;var n=t&&((r=t[U])==null?void 0:r.t);return t===e||n===e}function nn(t,e,n,r){dn(()=>{var o,s;return fe(()=>{o=s,s=[],fr(()=>{t!==n(...s)&&(e(t,...s),o&&Bn(n(...o),t)&&e(null,...o))})}),()=>{le(()=>{s&&Bn(n(...s),t)&&e(null,...s)})}})}function Oe(t,e,n,r){var z;var o=(n&Vr)!==0,s=t[e],c=(z=Xe(t,e))==null?void 0:z.set,v=r,p=()=>v;s===void 0&&r!==void 0&&(c&&o&&ho(),s=p(),c&&c(s));var d;if(d=()=>{var T=t[e];return T===void 0?p():T},c){var y=t.$$legacy;return function(T,k){return arguments.length>0?((!k||y)&&c(k?d():T),T):d()}}var w=!1,E=Ee(s),g=wo(()=>{var T=d(),k=A(E);return w?(w=!1,k):E.v=T});return function(T,k){var O=A(g);if(arguments.length>0){const $=k?A(g):T;return g.equals($)||(w=!0,P(E,$),A(g)),T}return O}}function Xo(t){return new Ko(t)}var Et,ot;class Ko{constructor(e){Ie(this,Et);Ie(this,ot);const n=it({...e.props||{},$$events:{}},!1);qe(this,ot,(e.hydrate?Lo:br)(e.component,{target:e.target,props:n,context:e.context,intro:e.intro,recover:e.recover})),qe(this,Et,n.$$events);for(const r of Object.keys(Z(this,ot)))r==="$set"||r==="$destroy"||r==="$on"||oe(this,r,{get(){return Z(this,ot)[r]},set(o){Z(this,ot)[r]=o},enumerable:!0});Z(this,ot).$set=r=>{Object.assign(n,r)},Z(this,ot).$destroy=()=>{Mo(Z(this,ot))}}$set(e){Z(this,ot).$set(e)}$on(e,n){Z(this,Et)[e]=Z(this,Et)[e]||[];const r=(...o)=>n.call(this,...o);return Z(this,Et)[e].push(r),()=>{Z(this,Et)[e]=Z(this,Et)[e].filter(o=>o!==r)}}$destroy(){Z(this,ot).$destroy()}}Et=new WeakMap,ot=new WeakMap;let xr;typeof HTMLElement=="function"&&(xr=class extends HTMLElement{constructor(e,n,r){super();ct(this,"$$ctor");ct(this,"$$s");ct(this,"$$c");ct(this,"$$cn",!1);ct(this,"$$d",{});ct(this,"$$r",!1);ct(this,"$$p_d",{});ct(this,"$$l",{});ct(this,"$$l_u",new Map);ct(this,"$$me");this.$$ctor=e,this.$$s=n,r&&this.attachShadow({mode:"open"})}addEventListener(e,n,r){if(this.$$l[e]=this.$$l[e]||[],this.$$l[e].push(n),this.$$c){const o=this.$$c.$on(e,n);this.$$l_u.set(n,o)}super.addEventListener(e,n,r)}removeEventListener(e,n,r){if(super.removeEventListener(e,n,r),this.$$c){const o=this.$$l_u.get(n);o&&(o(),this.$$l_u.delete(n))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){let e=function(o){return s=>{const c=document.createElement("slot");o!=="default"&&(c.name=o),lt(s,c)}};if(await Promise.resolve(),!this.$$cn||this.$$c)return;const n={},r=Jo(this);for(const o of this.$$s)o in r&&(o==="default"&&!this.$$d.children?(this.$$d.children=e(o),n.default=!0):n[o]=e(o));for(const o of this.attributes){const s=this.$$g_p(o.name);s in this.$$d||(this.$$d[s]=_e(s,o.value,this.$$p_d,"toProp"))}for(const o in this.$$p_d)!(o in this.$$d)&&this[o]!==void 0&&(this.$$d[o]=this[o],delete this[o]);this.$$c=Xo({component:this.$$ctor,target:this.shadowRoot||this,props:{...this.$$d,$$slots:n,$$host:this}}),this.$$me=fe(()=>{var o;this.$$r=!0;for(const s of we(this.$$c)){if(!((o=this.$$p_d[s])!=null&&o.reflect))continue;this.$$d[s]=this.$$c[s];const c=_e(s,this.$$d[s],this.$$p_d,"toAttribute");c==null?this.removeAttribute(this.$$p_d[s].attribute||s):this.setAttribute(this.$$p_d[s].attribute||s,c)}this.$$r=!1});for(const o in this.$$l)for(const s of this.$$l[o]){const c=this.$$c.$on(o,s);this.$$l_u.set(s,c)}this.$$l={}}}attributeChangedCallback(e,n,r){var o;this.$$r||(e=this.$$g_p(e),this.$$d[e]=_e(e,r,this.$$p_d,"toProp"),(o=this.$$c)==null||o.$set({[e]:this.$$d[e]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then(()=>{!this.$$cn&&this.$$c&&(this.$$c.$destroy(),de(this.$$me),this.$$c=void 0)})}$$g_p(e){return we(this.$$p_d).find(n=>this.$$p_d[n].attribute===e||!this.$$p_d[n].attribute&&n.toLowerCase()===e)||e}});function _e(t,e,n,r){var s;const o=(s=n[t])==null?void 0:s.type;if(e=o==="Boolean"&&typeof e!="boolean"?e!=null:e,!r||!n[t])return e;if(r==="toAttribute")switch(o){case"Object":case"Array":return e==null?null:JSON.stringify(e);case"Boolean":return e?"":null;case"Number":return e??null;default:return e}else switch(o){case"Object":case"Array":return e&&JSON.parse(e);case"Boolean":return e;case"Number":return e!=null?+e:e;default:return e}}function Jo(t){const e={};return t.childNodes.forEach(n=>{e[n.slot||"default"]=!0}),e}function Le(t,e,n,r,o,s){let c=class extends xr{constructor(){super(t,n,o),this.$$p_d=e}static get observedAttributes(){return we(e).map(v=>(e[v].attribute||v).toLowerCase())}};return we(e).forEach(v=>{oe(c.prototype,v,{get(){return this.$$c&&v in this.$$c?this.$$c[v]:this.$$d[v]},set(p){var d;p=_e(v,p,e),this.$$d[v]=p,(d=this.$$c)==null||d.$set({[v]:p})}})}),r.forEach(v=>{oe(c.prototype,v,{get(){var p;return(p=this.$$c)==null?void 0:p[v]}})}),t.element=c,c}const Rt=new Map([["yellow","#F8B920"],["red","#FF4646"],["blue","#0064FF"],["green","#00C564"]]),Go=["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","OPTION"];function Tr(t){const e=t.map(c=>c.trim().toLocaleLowerCase()),n=e.map(()=>({start:null,end:null,shift:0})),r=e.map(()=>[]),o=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,c=>{var v,p;return Go.includes((v=c.parentNode)==null?void 0:v.tagName)||!((p=c.parentNode)!=null&&p.checkVisibility())?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let s;for(;s=o.nextNode();)if(s!=null&&s.nodeValue)for(let c=0;c<s.nodeValue.length;c++){const v=s.nodeValue[c].toLocaleLowerCase().trim();v&&e.forEach((p,d)=>{var w;for(;p[n[d].shift]&&!p[n[d].shift].trim();)n[d].shift++;let y=p[n[d].shift]===v;if(!y&&n[d].shift&&(n[d].shift=0,y=p[n[d].shift]===v),y&&(n[d].shift||(n[d].start=[s,c]),n[d].end=[s,c],n[d].shift++),n[d].shift>=p.length){const E=document.createRange();E.setStart(n[d].start[0],n[d].start[1]),E.setEnd(n[d].end[0],n[d].end[1]+1),!E.collapsed&&((w=E.commonAncestorContainer.parentElement)!=null&&w.checkVisibility())?r[d].push(E):E.detach(),y=!1}y||(n[d].shift=0,n[d].start=null,n[d].end=null)})}return r}const At=`rh-${new Date().getTime()}-`,Me="highlights"in CSS;function Zo(t){if(!t.length&&!CSS.highlights.size)return;const e=[];if(CSS.highlights.clear(),t.length){const r=Tr(t.map(({text:o})=>o||""));for(const o in t){if(!r[o].length)continue;const{_id:s,color:c}=t[o],v=`${At}${s}`;CSS.highlights.set(v,new Highlight(...r[o]));const p=r[o][0].getBoundingClientRect();e.push(`
                ::highlight(${v}) {
                    all: unset;
                    background-color: color-mix(in srgb, ${Rt.get(c)||c}, white 50%) !important;
                    color: black;
                }

                :root {
                    --highlight-${s}-top: ${(100/document.documentElement.scrollHeight*(window.scrollY+p.top-10)).toFixed(2)}%;
                }
            `);for(const d of r[o])d.detach()}}const n=(()=>{let r=document.getElementById(At);return r||(r=document.createElement("style"),r.id=At,document.head.appendChild(r)),r})();n.innerHTML=e.join(`
`)}function Qo(){var t;(t=document.getElementById(At))==null||t.remove()}function ti(t){var e;for(const[n,r]of CSS.highlights){const o=n.replace(At,"");if(t==o)for(const s of r){(e=s.startContainer.parentElement)==null||e.scrollIntoView({behavior:"smooth",block:"start"});break}}}function ei(t){let e;for(const[n,r]of CSS.highlights)for(const o of r){const s=t.compareBoundaryPoints(Range.START_TO_START,o),c=t.compareBoundaryPoints(Range.END_TO_END,o);(s==0&&c==0||t!=null&&t.collapsed&&s>=0&&c<=0)&&(e=[n.replace(At,""),o])}if(e)return e[0].replace(At,"")}const Ct=`rh-${new Date().getTime()}`;function ni(t){const e=document.body.querySelectorAll(`.${Ct}`);if(!t.length&&!e.length)return;e.forEach(s=>s.outerHTML=s.innerText);const n=[],r=Tr(t.map(({text:s})=>s||""));for(const s in t){const{_id:c,color:v}=t[s];for(const p of r[s]){const d=document.createElement("mark");d.className=Ct,d.setAttribute("data-id",String(c)),d.append(p.extractContents()),p.insertNode(d),p.detach()}n.push(`
            .${Ct}[data-id="${c}"] {
                all: unset;
                display: inline-block !important;
                background-color: white !important;
                background-image: linear-gradient(to bottom, ${Yn(Rt.get(v)||v,.4)} 0, ${Yn(Rt.get(v)||v,.4)} 100%) !important;
                color: black !important;
            }
        `)}const o=(()=>{let s=document.getElementById(Ct);return s||(s=document.createElement("style"),s.id=Ct,document.head.appendChild(s)),s})();o.innerHTML=n.join(`
`)}function ri(){var t;document.body.querySelectorAll(`.${Ct}`).forEach(e=>e.outerHTML=e.innerText),(t=document.getElementById(Ct))==null||t.remove()}function oi(t){const e=document.body.querySelector(`.${Ct}[data-id="${t}"]`);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}function ii(t){const e=t.commonAncestorContainer.nodeType==Node.ELEMENT_NODE?t.commonAncestorContainer:t.commonAncestorContainer.parentElement;if((e==null?void 0:e.className)==Ct){if(!t.collapsed){const n=new Range;n.selectNodeContents(t.commonAncestorContainer);const r=t.compareBoundaryPoints(Range.START_TO_START,n),o=t.compareBoundaryPoints(Range.END_TO_END,n);if(n.detach(),r!=0||o!=0)return}return e.getAttribute("data-id")||void 0}}function Yn(t,e){if(!t)return t;const n=parseInt(t.slice(1,3),16),r=parseInt(t.slice(3,5),16),o=parseInt(t.slice(5,7),16);return`rgba(${n}, ${r}, ${o}, ${e})`}function si(t){return Me?Zo(t):ni(t)}function Ve(t){return si(t)}function li(){return Me?Qo():ri()}function zr(t){return Me?ti(t):oi(t)}function Sr(){var n,r;const t=document.getSelection();if(!(t!=null&&t.rangeCount))return;const e=t.getRangeAt(0);if(!((r=(n=e==null?void 0:e.commonAncestorContainer)==null?void 0:n.parentElement)!=null&&r.hasAttribute("contenteditable")))return e}function te(){const t=document.getSelection();t!=null&&t.rangeCount&&t.removeAllRanges()}function ai(t){return Me?ei(t):ii(t)}function Vn(t){if(!t)return"";var e=document.createElement("div");e.appendChild(t.cloneContents().cloneNode(!0)),document.body.appendChild(e);const n=e.innerText;return document.body.removeChild(e),e=void 0,n}function ui(t,e,n){let r=Q(it([])),o=Q(!1),s=Q(!1),c=Q(void 0);function v(g){const z=ai(g);if(z)return A(r).find(k=>k._id==z);if(Vn(g).trim())return{text:Vn(g).trim()}}function p(g){const z={...g._id?{_id:g._id}:{},...g.text?{text:g.text}:{},...g.note?{note:g.note}:{},color:g.color||"yellow"};if(!z.text)return;const T=A(r).findIndex(k=>{var O,$;return k._id==z._id||((O=k.text)==null?void 0:O.toLocaleLowerCase().trim())===(($=z.text)==null?void 0:$.toLocaleLowerCase().trim())});T!=-1?(A(r)[T]=z,e(z)):(A(r).push(z),t(z))}function d({_id:g}){P(r,it(A(r).filter(z=>z._id!=g))),n({_id:g})}function y(g){P(c,it(JSON.parse(JSON.stringify(g))))}function w(){A(c)&&(p(A(c)),P(c,void 0))}function E(){P(c,void 0)}return{get highlights(){return A(r)},set highlights(g){P(r,it(g))},get pro(){return A(o)},set pro(g){P(o,it(g))},get nav(){return A(s)},set nav(g){P(s,it(g))},get draft(){return A(c)},find:v,upsert:p,remove:d,setDraft:y,draftSubmit:w,draftCancel:E}}const ci="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ci);function fi(t,e){let n=null,r=!0;return function(...s){n||(r?(t(...s),r=!1):(clearTimeout(n),n=setTimeout(()=>{t(...s),clearTimeout(n),n=null},e)))}}function rn(){var t;return(t=navigator==null?void 0:navigator.userAgentData)!=null&&t.mobile?!0:/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)}var di=wt('<button type="submit" class="svelte-1iojgl7"><span class="color svelte-1iojgl7"></span></button>'),hi=wt('<button type="submit" value="remove" title="Delete highlight" class="svelte-1iojgl7"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-1iojgl7"><g class="svelte-1iojgl7"><line x1="2.75" y1="4.25" x2="15.25" y2="4.25" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-1iojgl7"></line><path d="M6.75,4.25v-1.5c0-.552,.448-1,1-1h2.5c.552,0,1,.448,1,1v1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-1iojgl7"></path><path d="M13.5,6.75l-.4,7.605c-.056,1.062-.934,1.895-1.997,1.895H6.898c-1.064,0-1.941-.833-1.997-1.895l-.4-7.605" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-1iojgl7"></path></g></svg></button>'),pi=wt('<dialog class="svelte-1iojgl7"><form method="dialog" class="svelte-1iojgl7"><!> <button type="submit" value="note" title="Add note" class="svelte-1iojgl7"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-1iojgl7"><g class="svelte-1iojgl7"><path stroke-linecap="round" stroke-linejoin="round" d="M9,1.75C4.996,1.75,1.75,4.996,1.75,9c0,1.319,.358,2.552,.973,3.617,.43,.806-.053,2.712-.973,3.633,1.25,.068,2.897-.497,3.633-.973,.489,.282,1.264,.656,2.279,.848,.433,.082,.881,.125,1.338,.125,4.004,0,7.25-3.246,7.25-7.25S13.004,1.75,9,1.75Z" class="svelte-1iojgl7"></path><path stroke-width="0" d="M9,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-1iojgl7"></path><path stroke-width="0" d="M5.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-1iojgl7"></path><path stroke-width="0" d="M12.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-1iojgl7"></path></g></svg></button> <!></form></dialog>');function Nr(t,e){ue(e,!0);let n=Oe(e,"store",7),r,o=Q(void 0),s=Q(!1);function c(S){if(!A(o))return;const N=S.currentTarget.returnValue;switch(S.currentTarget.returnValue="",N){case"add":n().upsert(A(o)),te();break;case"note":n().setDraft(A(o)),te();break;case"remove":n().remove(A(o)),te();break;default:if(Rt.has(N)){n().upsert({...A(o),color:N}),te();return}break}}function v(){P(s,!0)}function p(){P(s,!1),setTimeout(d)}function d(){if(A(s)){r==null||r.close();return}requestAnimationFrame(()=>{const S=Sr(),N=S&&n().find(S);if(!S||!(N!=null&&N._id)&&!S.toString().trim()){r==null||r.close();return}P(o,it(N)),r.inert=!0,r==null||r.show(),r.inert=!1;const J=256,M=10,L=S.getBoundingClientRect(),W=Math.min(Math.max(L.x,M)+window.scrollX,window.innerWidth+window.scrollX-J-M),G=Math.min(window.innerWidth-Math.max(L.x,M)-window.scrollX-L.width,window.innerWidth-window.scrollX-J-M),tt=Math.max(L.y,40)+window.scrollY+L.height+4,et=window.innerHeight-Math.max(L.y,40)-window.scrollY+4,rt=W<window.innerWidth/2+window.scrollX,ht=tt<window.innerHeight/2+window.scrollY;r==null||r.style.setProperty("left",rt?`${W}px`:"unset"),r==null||r.style.setProperty("right",rt?"unset":`${G}px`),r==null||r.style.setProperty("top",ht?`${tt}px`:"unset"),r==null||r.style.setProperty("bottom",ht?"unset":`${et}px`)})}const y=fi(d,200);var w=pi();mt("mousedown",St,v,!1),mt("touchstart",St,v,!1,!0),mt("mouseup",St,p,!1),mt("touchend",St,p,!1,!0),mt("touchcancel",St,p,!1,!0),mt("selectionchange",St,y,!1),nn(w,S=>r=S,()=>r),gt(()=>ne(w,"mobile",rn()));var E=st(w),g=st(E);gn(g,71,()=>Rt,(S,N)=>K(K(S))[0],(S,N,J)=>{let M=()=>K(K(N))[0],L=()=>K(K(N))[1];var W=di(),G=st(W);gt(()=>{var tt;Vo(W,M()),ft(G,"style",`--color: ${L()??""}`),ne(G,"active",M()==((tt=A(o))==null?void 0:tt.color))}),lt(S,W)});var z=j(j(g,!0)),T=st(z),k=st(T),O=st(k),$=j(O),C=j($),D=j(C),ut=j(j(z,!0));return ze(ut,()=>{var S;return(S=A(o))==null?void 0:S._id},S=>{var N=hi();lt(S,N)}),gt(()=>{var S,N,J,M,L,W;ne(w,"new",!((S=A(o))!=null&&S._id)),ft(O,"fill",(N=A(o))!=null&&N.note?"currentColor":"none"),ft(O,"stroke-width",(J=A(o))!=null&&J.note?"0":void 0),ft($,"fill",(M=A(o))!=null&&M.note?"none":"currentColor"),ft(C,"fill",(L=A(o))!=null&&L.note?"none":"currentColor"),ft(D,"fill",(W=A(o))!=null&&W.note?"none":"currentColor")}),mt("close",w,c,!1),lt(t,w),mn(t,"svelte-1iojgl7",`
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
`),ce({get store(){return n()},set store(S){n(S),jt()}})}Le(Nr,{store:{}},[],[],!0);function vi(t){const e=t.currentTarget.getBoundingClientRect();e.top<=t.clientY&&t.clientY<=e.top+e.height&&e.left<=t.clientX&&t.clientX<=e.left+e.width||(t.preventDefault(),t.currentTarget.close())}var mi=(t,e)=>P(e,!1),gi=wt('<input type="radio" name="color" class="svelte-2yzs5z">'),_i=wt('<div class="unlock svelte-2yzs5z"><a href="https://raindrop.io/pro/buy" target="_blank" class="svelte-2yzs5z">Upgrade to Pro</a> to unlock annotation</div>'),yi=wt('<blockquote role="presentation" class="svelte-2yzs5z"> </blockquote> <fieldset class="color svelte-2yzs5z"></fieldset> <textarea class="note svelte-2yzs5z" rows="4" maxlength="5000" placeholder="Notes (optional)"></textarea> <!>',1),wi=wt('<dialog role="presentation" class="svelte-2yzs5z"><header class="svelte-2yzs5z"> </header> <form method="dialog" class="svelte-2yzs5z"><!> <footer class="svelte-2yzs5z"><button formnovalidate="" class="svelte-2yzs5z">Cancel <sup class="svelte-2yzs5z">esc</sup></button> <button type="submit" value="OK" class="svelte-2yzs5z"> <sup class="svelte-2yzs5z">&crarr;</sup></button></footer></form></dialog>');function Ar(t,e){ue(e,!0);const n=[];let r=Oe(e,"store",7),o,s,c=Q(!0);Ze(()=>{r().draft?(P(c,!0),o==null||o.showModal()):o==null||o.close()});function v($){const C=$.currentTarget.returnValue;$.currentTarget.returnValue="",setTimeout(C?r().draftSubmit:r().draftCancel,200)}function p($){var C;rn()||($.stopImmediatePropagation(),$.stopPropagation(),$.key=="Enter"&&!$.shiftKey&&($.preventDefault(),s&&((C=$.currentTarget.closest("form"))==null||C.requestSubmit(s))))}var d=wi();nn(d,$=>o=$,()=>o),d.__mousedown=[vi],gt(()=>ne(d,"mobile",rn()));var y=st(d),w=st(y),E=j(j(y,!0)),g=st(E);ze(g,()=>r().draft,$=>{var C=yi(),D=pn(C);D.__click=[mi,c];var ut=st(D);gt(()=>{var M,L;return Be(ut,((L=(M=r().draft)==null?void 0:M.text)==null?void 0:L.trim())||"")});var S=j(j(D,!0));gn(S,73,()=>Rt,Ho,(M,L,W)=>{let G=()=>K(K(L))[0],tt=()=>K(K(L))[1];var et=gi();Yo(et);var rt;gt(()=>{rt!==(rt=G())&&(et.value=(et.__value=G())==null?"":G()),ft(et,"style",`--color: ${tt()??""}`)}),Uo(n,[],et,()=>(G(),r().draft.color),ht=>r().draft.color=ht),lt(M,et)});var N=j(j(S,!0));Bo(N),qo(N),N.__keydown=p;var J=j(j(N,!0));ze(J,()=>!r().pro,M=>{var L=_i();lt(M,L)}),gt(()=>{ne(D,"compact",A(c)),N.disabled=!r().pro}),Wo(N,()=>r().draft.note,M=>r().draft.note=M),lt($,C)});var z=j(j(g,!0)),T=st(z),k=j(j(T,!0));nn(k,$=>s=$,()=>s);var O=st(k);return gt(()=>{var $,C;Be(w,`${(($=r().draft)!=null&&$._id?"Edit":"New")??""} highlight`),Be(O,`${((C=r().draft)!=null&&C._id?"Update":"Create")??""} `)}),mt("close",d,v,!1),lt(t,d),mn(t,"svelte-2yzs5z",`
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
`),ce({get store(){return r()},set store($){r($),jt()}})}yr(["mousedown","click","keydown"]);Le(Ar,{store:{}},[],[],!0);const bi=(t,e)=>{const n=t.target.getAttribute("data-highlight");n&&(t.preventDefault(),e(n))};var Ei=wt('<div class="svelte-1t9y4ki"></div>'),Ci=wt('<nav role="presentation" class="svelte-1t9y4ki"></nav>');function Dr(t,e){ue(e,!0);let n=Oe(e,"store",7);var r=Io(),o=pn(r);return ze(o,()=>n().nav,s=>{var c=Ci();c.__click=[bi,zr],gn(c,77,()=>n().highlights,(v,p)=>K(v)._id,(v,p,d)=>{var y=Ei();gt(()=>ft(y,"style",`top: var(--highlight-${K(p)._id??""}-top); --color: ${(Rt.get(K(p).color)||K(p).color)??""}`)),gt(()=>ft(y,"data-highlight",K(p)._id)),lt(v,y)}),lt(s,c)}),lt(t,r),mn(t,"svelte-1t9y4ki",`
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
`),ce({get store(){return n()},set store(s){n(s),jt()}})}yr(["click"]);Le(Dr,{store:{}},[],[],!0);var $i=wt("<!> <!> <!>",1);function ki(t,e){ue(e,!0);let n=Oe(e,"store",7);Ze(()=>{Ve(n().highlights)});let r;function o(){Ve(n().highlights),clearTimeout(r),r=setTimeout(()=>Ve(n().highlights),3e3)}Ze(()=>li);var s=$i();mt("load",Te,o,!1),mt("popstate",Te,o,!1);var c=pn(s);Nr(c,{get store(){return n()}});var v=j(j(c,!0));Ar(v,{get store(){return n()}});var p=j(j(v,!0));return Dr(p,{get store(){return n()}}),lt(t,s),ce({get store(){return n()},set store(d){n(d),jt()}})}customElements.define("rdh-ui",Le(ki,{store:{}},[],[],!0));function xi(t){if(typeof chrome=="object"&&chrome.runtime&&chrome.runtime.onMessage||typeof browser=="object"&&browser.runtime&&browser.runtime.onMessage){const{runtime:e}=typeof browser=="object"?browser:chrome,n=(r,o)=>{o.id==e.id&&typeof r.type=="string"&&t(r)};return e.onMessage.removeListener(n),e.onMessage.addListener(n),r=>e.sendMessage(null,r)}if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.rdh)return window.rdhSend=t,e=>window.webkit.messageHandlers.rdh.postMessage(e);if(typeof window<"u"&&typeof window.process=="object"&&window.process.type==="renderer"||typeof process<"u"&&typeof process.versions=="object"&&process.versions.electron){const{ipcRenderer:e}=require("electron"),n=(r,o)=>t(o);return e.removeListener("RDH",n),e.on("RDH",n),r=>e.sendToHost("RDH",r)}if("ReactNativeWebView"in window)return window.ReactNativeWebViewSendMessage=t,e=>window.ReactNativeWebView.postMessage(JSON.stringify(e));if(window.self!==window.top){const e=({data:n,source:r})=>{r!==window.parent||typeof n!="object"||typeof n.type!="string"||t(n)};return window.removeEventListener("message",e),window.addEventListener("message",e),n=>window.parent.postMessage(n,"*")}throw new Error("unsupported platform")}async function Ti(t){let e=!1;const n=new Set,r=xi(o=>{if(!e){n.add(o);return}t(o)});await new Promise(o=>{function s(){window.removeEventListener("DOMContentLoaded",s),o()}document.readyState=="loading"?(window.removeEventListener("DOMContentLoaded",s),window.addEventListener("DOMContentLoaded",s,{once:!0})):o()}),e=!0;for(const o of n)t(o),n.delete(o);return r}const Zt=document.createElement("rdh-ui");(async()=>{const t=await Ti(n=>{switch(n.type){case"RDH_APPLY":Array.isArray(n.payload)&&(e.highlights=n.payload);break;case"RDH_CONFIG":typeof n.payload.pro=="boolean"&&(e.pro=n.payload.pro),typeof n.payload.nav=="boolean"&&(e.nav=n.payload.nav),typeof n.payload.enabled=="boolean"&&(n.payload.enabled===!0?document.body.contains(Zt)||document.body.appendChild(Zt):document.body.contains(Zt)&&document.body.removeChild(Zt));break;case"RDH_SCROLL":typeof n.payload._id=="string"&&zr(n.payload._id);break;case"RDH_ADD_SELECTION":const r=Sr();if(!r)return;const o=e.find(r);if(!o)return;e.upsert(o),te();break;case"RDH_NOTE_SELECTION":console.log("not implemented yet");break}}),e=ui(n=>t({type:"RDH_ADD",payload:n}),n=>t({type:"RDH_UPDATE",payload:n}),({_id:n})=>t({type:"RDH_REMOVE",payload:{_id:n}}));Zt.store=e,t({type:"RDH_READY",payload:{url:location.href}})})();
