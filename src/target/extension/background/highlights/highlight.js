"use strict";var Ur=Object.defineProperty;var Vr=(e,t,n)=>t in e?Ur(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ce=(e,t,n)=>(Vr(e,typeof t!="symbol"?t+"":t,n),n),Ln=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)};var te=(e,t,n)=>(Ln(e,t,"read from private field"),n?n.call(e):t.get(e)),Wt=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},zt=(e,t,n,r)=>(Ln(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n);(function(){var e=window.Document.prototype.createElement,t=window.Document.prototype.createElementNS,n=window.Document.prototype.importNode,r=window.Document.prototype.prepend,o=window.Document.prototype.append,s=window.DocumentFragment.prototype.prepend,c=window.DocumentFragment.prototype.append,v=window.Node.prototype.cloneNode,d=window.Node.prototype.appendChild,f=window.Node.prototype.insertBefore,y=window.Node.prototype.removeChild,g=window.Node.prototype.replaceChild,x=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),E=window.Element.prototype.attachShadow,S=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),w=window.Element.prototype.getAttribute,T=window.Element.prototype.setAttribute,N=window.Element.prototype.removeAttribute,$=window.Element.prototype.toggleAttribute,k=window.Element.prototype.getAttributeNS,O=window.Element.prototype.setAttributeNS,G=window.Element.prototype.removeAttributeNS,C=window.Element.prototype.insertAdjacentElement,A=window.Element.prototype.insertAdjacentHTML,M=window.Element.prototype.prepend,R=window.Element.prototype.append,q=window.Element.prototype.before,V=window.Element.prototype.after,K=window.Element.prototype.replaceWith,ue=window.Element.prototype.remove,Y=window.HTMLElement,ee=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),Se=window.HTMLElement.prototype.insertAdjacentElement,Qe=window.HTMLElement.prototype.insertAdjacentHTML,et=new Set;"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(i){return et.add(i)});function kn(i){var l=et.has(i);return i=/^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(i),!l&&i}var Hr=document.contains?document.contains.bind(document):document.documentElement.contains.bind(document.documentElement);function P(i){var l=i.isConnected;if(l!==void 0)return l;if(Hr(i))return!0;for(;i&&!(i.__CE_isImportDocument||i instanceof Document);)i=i.parentNode||(window.ShadowRoot&&i instanceof ShadowRoot?i.host:void 0);return!(!i||!(i.__CE_isImportDocument||i instanceof Document))}function Pt(i){var l=i.children;if(l)return Array.prototype.slice.call(l);for(l=[],i=i.firstChild;i;i=i.nextSibling)i.nodeType===Node.ELEMENT_NODE&&l.push(i);return l}function jt(i,l){for(;l&&l!==i&&!l.nextSibling;)l=l.parentNode;return l&&l!==i?l.nextSibling:null}function qt(i,l,u){for(var p=i;p;){if(p.nodeType===Node.ELEMENT_NODE){var a=p;l(a);var h=a.localName;if(h==="link"&&a.getAttribute("rel")==="import"){if(p=a.import,u===void 0&&(u=new Set),p instanceof Node&&!u.has(p))for(u.add(p),p=p.firstChild;p;p=p.nextSibling)qt(p,l,u);p=jt(i,a);continue}else if(h==="template"){p=jt(i,a);continue}if(a=a.__CE_shadowRoot)for(a=a.firstChild;a;a=a.nextSibling)qt(a,l,u)}p=p.firstChild?p.firstChild:jt(i,p)}}function vt(){var i=!(ve==null||!ve.noDocumentConstructionObserver),l=!(ve==null||!ve.shadyDomFastWalk);this.m=[],this.g=[],this.j=!1,this.shadyDomFastWalk=l,this.I=!i}function tt(i,l,u,p){var a=window.ShadyDOM;if(i.shadyDomFastWalk&&a&&a.inUse){if(l.nodeType===Node.ELEMENT_NODE&&u(l),l.querySelectorAll)for(i=a.nativeMethods.querySelectorAll.call(l,"*"),l=0;l<i.length;l++)u(i[l])}else qt(l,u,p)}function Pr(i,l){i.j=!0,i.m.push(l)}function jr(i,l){i.j=!0,i.g.push(l)}function Bt(i,l){i.j&&tt(i,l,function(u){return He(i,u)})}function He(i,l){if(i.j&&!l.__CE_patched){l.__CE_patched=!0;for(var u=0;u<i.m.length;u++)i.m[u](l);for(u=0;u<i.g.length;u++)i.g[u](l)}}function pe(i,l){var u=[];for(tt(i,l,function(a){return u.push(a)}),l=0;l<u.length;l++){var p=u[l];p.__CE_state===1?i.connectedCallback(p):mt(i,p)}}function oe(i,l){var u=[];for(tt(i,l,function(a){return u.push(a)}),l=0;l<u.length;l++){var p=u[l];p.__CE_state===1&&i.disconnectedCallback(p)}}function be(i,l,u){u=u===void 0?{}:u;var p=u.J,a=u.upgrade||function(m){return mt(i,m)},h=[];for(tt(i,l,function(m){if(i.j&&He(i,m),m.localName==="link"&&m.getAttribute("rel")==="import"){var _=m.import;_ instanceof Node&&(_.__CE_isImportDocument=!0,_.__CE_registry=document.__CE_registry),_&&_.readyState==="complete"?_.__CE_documentLoadHandled=!0:m.addEventListener("load",function(){var b=m.import;if(!b.__CE_documentLoadHandled){b.__CE_documentLoadHandled=!0;var D=new Set;p&&(p.forEach(function(F){return D.add(F)}),D.delete(b)),be(i,b,{J:D,upgrade:a})}})}else h.push(m)},p),l=0;l<h.length;l++)a(h[l])}function mt(i,l){try{var u=l.ownerDocument,p=u.__CE_registry,a=p&&(u.defaultView||u.__CE_isImportDocument)?gt(p,l.localName):void 0;if(a&&l.__CE_state===void 0){a.constructionStack.push(l);try{try{if(new a.constructorFunction!==l)throw Error("The custom element constructor did not produce the element being upgraded.")}finally{a.constructionStack.pop()}}catch(b){throw l.__CE_state=2,b}if(l.__CE_state=1,l.__CE_definition=a,a.attributeChangedCallback&&l.hasAttributes()){var h=a.observedAttributes;for(a=0;a<h.length;a++){var m=h[a],_=l.getAttribute(m);_!==null&&i.attributeChangedCallback(l,m,null,_,null)}}P(l)&&i.connectedCallback(l)}}catch(b){Pe(b)}}vt.prototype.connectedCallback=function(i){var l=i.__CE_definition;if(l.connectedCallback)try{l.connectedCallback.call(i)}catch(u){Pe(u)}},vt.prototype.disconnectedCallback=function(i){var l=i.__CE_definition;if(l.disconnectedCallback)try{l.disconnectedCallback.call(i)}catch(u){Pe(u)}},vt.prototype.attributeChangedCallback=function(i,l,u,p,a){var h=i.__CE_definition;if(h.attributeChangedCallback&&-1<h.observedAttributes.indexOf(l))try{h.attributeChangedCallback.call(i,l,u,p,a)}catch(m){Pe(m)}};function Cn(i,l,u,p){var a=l.__CE_registry;if(a&&(p===null||p==="http://www.w3.org/1999/xhtml")&&(a=gt(a,u)))try{var h=new a.constructorFunction;if(h.__CE_state===void 0||h.__CE_definition===void 0)throw Error("Failed to construct '"+u+"': The returned value was not constructed with the HTMLElement constructor.");if(h.namespaceURI!=="http://www.w3.org/1999/xhtml")throw Error("Failed to construct '"+u+"': The constructed element's namespace must be the HTML namespace.");if(h.hasAttributes())throw Error("Failed to construct '"+u+"': The constructed element must not have any attributes.");if(h.firstChild!==null)throw Error("Failed to construct '"+u+"': The constructed element must not have any children.");if(h.parentNode!==null)throw Error("Failed to construct '"+u+"': The constructed element must not have a parent node.");if(h.ownerDocument!==l)throw Error("Failed to construct '"+u+"': The constructed element's owner document is incorrect.");if(h.localName!==u)throw Error("Failed to construct '"+u+"': The constructed element's local name is incorrect.");return h}catch(m){return Pe(m),l=p===null?e.call(l,u):t.call(l,p,u),Object.setPrototypeOf(l,HTMLUnknownElement.prototype),l.__CE_state=2,l.__CE_definition=void 0,He(i,l),l}return l=p===null?e.call(l,u):t.call(l,p,u),He(i,l),l}function Pe(i){var l="",u="",p=0,a=0;i instanceof Error?(l=i.message,u=i.sourceURL||i.fileName||"",p=i.line||i.lineNumber||0,a=i.column||i.columnNumber||0):l="Uncaught "+String(i);var h=void 0;ErrorEvent.prototype.initErrorEvent===void 0?h=new ErrorEvent("error",{cancelable:!0,message:l,filename:u,lineno:p,colno:a,error:i}):(h=document.createEvent("ErrorEvent"),h.initErrorEvent("error",!1,!0,l,u,p),h.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0}})}),h.error===void 0&&Object.defineProperty(h,"error",{configurable:!0,enumerable:!0,get:function(){return i}}),window.dispatchEvent(h),h.defaultPrevented||console.error(i)}function xn(){var i=this;this.g=void 0,this.F=new Promise(function(l){i.l=l})}xn.prototype.resolve=function(i){if(this.g)throw Error("Already resolved.");this.g=i,this.l(i)};function Tn(i){var l=document;this.l=void 0,this.h=i,this.g=l,be(this.h,this.g),this.g.readyState==="loading"&&(this.l=new MutationObserver(this.G.bind(this)),this.l.observe(this.g,{childList:!0,subtree:!0}))}function $n(i){i.l&&i.l.disconnect()}Tn.prototype.G=function(i){var l=this.g.readyState;for(l!=="interactive"&&l!=="complete"||$n(this),l=0;l<i.length;l++)for(var u=i[l].addedNodes,p=0;p<u.length;p++)be(this.h,u[p])};function B(i){this.s=new Map,this.u=new Map,this.C=new Map,this.A=!1,this.B=new Map,this.o=function(l){return l()},this.i=!1,this.v=[],this.h=i,this.D=i.I?new Tn(i):void 0}B.prototype.H=function(i,l){var u=this;if(!(l instanceof Function))throw new TypeError("Custom element constructor getters must be functions.");Sn(this,i),this.s.set(i,l),this.v.push(i),this.i||(this.i=!0,this.o(function(){return An(u)}))},B.prototype.define=function(i,l){var u=this;if(!(l instanceof Function))throw new TypeError("Custom element constructors must be functions.");Sn(this,i),Nn(this,i,l),this.v.push(i),this.i||(this.i=!0,this.o(function(){return An(u)}))};function Sn(i,l){if(!kn(l))throw new SyntaxError("The element name '"+l+"' is not valid.");if(gt(i,l))throw Error("A custom element with name '"+(l+"' has already been defined."));if(i.A)throw Error("A custom element is already being defined.")}function Nn(i,l,u){i.A=!0;var p;try{var a=u.prototype;if(!(a instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var h=function(F){var je=a[F];if(je!==void 0&&!(je instanceof Function))throw Error("The '"+F+"' callback must be a function.");return je},m=h("connectedCallback"),_=h("disconnectedCallback"),b=h("adoptedCallback"),D=(p=h("attributeChangedCallback"))&&u.observedAttributes||[]}catch(F){throw F}finally{i.A=!1}return u={localName:l,constructorFunction:u,connectedCallback:m,disconnectedCallback:_,adoptedCallback:b,attributeChangedCallback:p,observedAttributes:D,constructionStack:[]},i.u.set(l,u),i.C.set(u.constructorFunction,u),u}B.prototype.upgrade=function(i){be(this.h,i)};function An(i){if(i.i!==!1){i.i=!1;for(var l=[],u=i.v,p=new Map,a=0;a<u.length;a++)p.set(u[a],[]);for(be(i.h,document,{upgrade:function(b){if(b.__CE_state===void 0){var D=b.localName,F=p.get(D);F?F.push(b):i.u.has(D)&&l.push(b)}}}),a=0;a<l.length;a++)mt(i.h,l[a]);for(a=0;a<u.length;a++){for(var h=u[a],m=p.get(h),_=0;_<m.length;_++)mt(i.h,m[_]);(h=i.B.get(h))&&h.resolve(void 0)}u.length=0}}B.prototype.get=function(i){if(i=gt(this,i))return i.constructorFunction},B.prototype.whenDefined=function(i){if(!kn(i))return Promise.reject(new SyntaxError("'"+i+"' is not a valid custom element name."));var l=this.B.get(i);if(l)return l.F;l=new xn,this.B.set(i,l);var u=this.u.has(i)||this.s.has(i);return i=this.v.indexOf(i)===-1,u&&i&&l.resolve(void 0),l.F},B.prototype.polyfillWrapFlushCallback=function(i){this.D&&$n(this.D);var l=this.o;this.o=function(u){return i(function(){return l(u)})}};function gt(i,l){var u=i.u.get(l);if(u)return u;if(u=i.s.get(l)){i.s.delete(l);try{return Nn(i,l,u())}catch(p){Pe(p)}}}B.prototype.define=B.prototype.define,B.prototype.upgrade=B.prototype.upgrade,B.prototype.get=B.prototype.get,B.prototype.whenDefined=B.prototype.whenDefined,B.prototype.polyfillDefineLazy=B.prototype.H,B.prototype.polyfillWrapFlushCallback=B.prototype.polyfillWrapFlushCallback;function Yt(i,l,u){function p(a){return function(h){for(var m=[],_=0;_<arguments.length;++_)m[_]=arguments[_];_=[];for(var b=[],D=0;D<m.length;D++){var F=m[D];if(F instanceof Element&&P(F)&&b.push(F),F instanceof DocumentFragment)for(F=F.firstChild;F;F=F.nextSibling)_.push(F);else _.push(F)}for(a.apply(this,m),m=0;m<b.length;m++)oe(i,b[m]);if(P(this))for(m=0;m<_.length;m++)b=_[m],b instanceof Element&&pe(i,b)}}u.prepend!==void 0&&(l.prepend=p(u.prepend)),u.append!==void 0&&(l.append=p(u.append))}function qr(i){Document.prototype.createElement=function(l){return Cn(i,this,l,null)},Document.prototype.importNode=function(l,u){return l=n.call(this,l,!!u),this.__CE_registry?be(i,l):Bt(i,l),l},Document.prototype.createElementNS=function(l,u){return Cn(i,this,u,l)},Yt(i,Document.prototype,{prepend:r,append:o})}function Br(i){function l(p){return function(a){for(var h=[],m=0;m<arguments.length;++m)h[m]=arguments[m];m=[];for(var _=[],b=0;b<h.length;b++){var D=h[b];if(D instanceof Element&&P(D)&&_.push(D),D instanceof DocumentFragment)for(D=D.firstChild;D;D=D.nextSibling)m.push(D);else m.push(D)}for(p.apply(this,h),h=0;h<_.length;h++)oe(i,_[h]);if(P(this))for(h=0;h<m.length;h++)_=m[h],_ instanceof Element&&pe(i,_)}}var u=Element.prototype;q!==void 0&&(u.before=l(q)),V!==void 0&&(u.after=l(V)),K!==void 0&&(u.replaceWith=function(p){for(var a=[],h=0;h<arguments.length;++h)a[h]=arguments[h];h=[];for(var m=[],_=0;_<a.length;_++){var b=a[_];if(b instanceof Element&&P(b)&&m.push(b),b instanceof DocumentFragment)for(b=b.firstChild;b;b=b.nextSibling)h.push(b);else h.push(b)}for(_=P(this),K.apply(this,a),a=0;a<m.length;a++)oe(i,m[a]);if(_)for(oe(i,this),a=0;a<h.length;a++)m=h[a],m instanceof Element&&pe(i,m)}),ue!==void 0&&(u.remove=function(){var p=P(this);ue.call(this),p&&oe(i,this)})}function Yr(i){function l(a,h){Object.defineProperty(a,"innerHTML",{enumerable:h.enumerable,configurable:!0,get:h.get,set:function(m){var _=this,b=void 0;if(P(this)&&(b=[],tt(i,this,function(je){je!==_&&b.push(je)})),h.set.call(this,m),b)for(var D=0;D<b.length;D++){var F=b[D];F.__CE_state===1&&i.disconnectedCallback(F)}return this.ownerDocument.__CE_registry?be(i,this):Bt(i,this),m}})}function u(a,h){a.insertAdjacentElement=function(m,_){var b=P(_);return m=h.call(this,m,_),b&&oe(i,_),P(m)&&pe(i,_),m}}function p(a,h){function m(_,b){for(var D=[];_!==b;_=_.nextSibling)D.push(_);for(b=0;b<D.length;b++)be(i,D[b])}a.insertAdjacentHTML=function(_,b){if(_=_.toLowerCase(),_==="beforebegin"){var D=this.previousSibling;h.call(this,_,b),m(D||this.parentNode.firstChild,this)}else if(_==="afterbegin")D=this.firstChild,h.call(this,_,b),m(this.firstChild,D);else if(_==="beforeend")D=this.lastChild,h.call(this,_,b),m(D||this.firstChild,null);else if(_==="afterend")D=this.nextSibling,h.call(this,_,b),m(this.nextSibling,D);else throw new SyntaxError("The value provided ("+String(_)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.")}}E&&(Element.prototype.attachShadow=function(a){if(a=E.call(this,a),i.j&&!a.__CE_patched){a.__CE_patched=!0;for(var h=0;h<i.m.length;h++)i.m[h](a)}return this.__CE_shadowRoot=a}),S&&S.get?l(Element.prototype,S):ee&&ee.get?l(HTMLElement.prototype,ee):jr(i,function(a){l(a,{enumerable:!0,configurable:!0,get:function(){return v.call(this,!0).innerHTML},set:function(h){var m=this.localName==="template",_=m?this.content:this,b=t.call(document,this.namespaceURI,this.localName);for(b.innerHTML=h;0<_.childNodes.length;)y.call(_,_.childNodes[0]);for(h=m?b.content:b;0<h.childNodes.length;)d.call(_,h.childNodes[0])}})}),Element.prototype.setAttribute=function(a,h){if(this.__CE_state!==1)return T.call(this,a,h);var m=w.call(this,a);T.call(this,a,h),h=w.call(this,a),i.attributeChangedCallback(this,a,m,h,null)},Element.prototype.setAttributeNS=function(a,h,m){if(this.__CE_state!==1)return O.call(this,a,h,m);var _=k.call(this,a,h);O.call(this,a,h,m),m=k.call(this,a,h),i.attributeChangedCallback(this,h,_,m,a)},Element.prototype.removeAttribute=function(a){if(this.__CE_state!==1)return N.call(this,a);var h=w.call(this,a);N.call(this,a),h!==null&&i.attributeChangedCallback(this,a,h,null,null)},$&&(Element.prototype.toggleAttribute=function(a,h){if(this.__CE_state!==1)return $.call(this,a,h);var m=w.call(this,a),_=m!==null;return h=$.call(this,a,h),_!==h&&i.attributeChangedCallback(this,a,m,h?"":null,null),h}),Element.prototype.removeAttributeNS=function(a,h){if(this.__CE_state!==1)return G.call(this,a,h);var m=k.call(this,a,h);G.call(this,a,h);var _=k.call(this,a,h);m!==_&&i.attributeChangedCallback(this,h,m,_,a)},Se?u(HTMLElement.prototype,Se):C&&u(Element.prototype,C),Qe?p(HTMLElement.prototype,Qe):A&&p(Element.prototype,A),Yt(i,Element.prototype,{prepend:M,append:R}),Br(i)}var Dn={};function Wr(i){function l(){var u=this.constructor,p=document.__CE_registry.C.get(u);if(!p)throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var a=p.constructionStack;if(a.length===0)return a=e.call(document,p.localName),Object.setPrototypeOf(a,u.prototype),a.__CE_state=1,a.__CE_definition=p,He(i,a),a;var h=a.length-1,m=a[h];if(m===Dn)throw Error("Failed to construct '"+p.localName+"': This element was already constructed.");return a[h]=Dn,Object.setPrototypeOf(m,u.prototype),He(i,m),m}l.prototype=Y.prototype,Object.defineProperty(HTMLElement.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:l}),window.HTMLElement=l}function zr(i){function l(u,p){Object.defineProperty(u,"textContent",{enumerable:p.enumerable,configurable:!0,get:p.get,set:function(a){if(this.nodeType===Node.TEXT_NODE)p.set.call(this,a);else{var h=void 0;if(this.firstChild){var m=this.childNodes,_=m.length;if(0<_&&P(this)){h=Array(_);for(var b=0;b<_;b++)h[b]=m[b]}}if(p.set.call(this,a),h)for(a=0;a<h.length;a++)oe(i,h[a])}}})}Node.prototype.insertBefore=function(u,p){if(u instanceof DocumentFragment){var a=Pt(u);if(u=f.call(this,u,p),P(this))for(p=0;p<a.length;p++)pe(i,a[p]);return u}return a=u instanceof Element&&P(u),p=f.call(this,u,p),a&&oe(i,u),P(this)&&pe(i,u),p},Node.prototype.appendChild=function(u){if(u instanceof DocumentFragment){var p=Pt(u);if(u=d.call(this,u),P(this))for(var a=0;a<p.length;a++)pe(i,p[a]);return u}return p=u instanceof Element&&P(u),a=d.call(this,u),p&&oe(i,u),P(this)&&pe(i,u),a},Node.prototype.cloneNode=function(u){return u=v.call(this,!!u),this.ownerDocument.__CE_registry?be(i,u):Bt(i,u),u},Node.prototype.removeChild=function(u){var p=u instanceof Element&&P(u),a=y.call(this,u);return p&&oe(i,u),a},Node.prototype.replaceChild=function(u,p){if(u instanceof DocumentFragment){var a=Pt(u);if(u=g.call(this,u,p),P(this))for(oe(i,p),p=0;p<a.length;p++)pe(i,a[p]);return u}a=u instanceof Element&&P(u);var h=g.call(this,u,p),m=P(this);return m&&oe(i,p),a&&oe(i,u),m&&pe(i,u),h},x&&x.get?l(Node.prototype,x):Pr(i,function(u){l(u,{enumerable:!0,configurable:!0,get:function(){for(var p=[],a=this.firstChild;a;a=a.nextSibling)a.nodeType!==Node.COMMENT_NODE&&p.push(a.textContent);return p.join("")},set:function(p){for(;this.firstChild;)y.call(this,this.firstChild);p!=null&&p!==""&&d.call(this,document.createTextNode(p))}})})}var ve=window.customElements;function On(){var i=new vt;Wr(i),qr(i),Yt(i,DocumentFragment.prototype,{prepend:s,append:c}),zr(i),Yr(i),window.CustomElementRegistry=B,i=new B(i),document.__CE_registry=i,Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:i})}ve&&!ve.forcePolyfill&&typeof ve.define=="function"&&typeof ve.get=="function"||On(),window.__CE_installPolyfill=On}).call(self);const it=1,fn=2,Xr=4,Gn=8,Gr=16,Jt=64,Kr=2,Jr=1,Zr=2,bt="[",Kn="]",Qr="",Jn=`${Kn}!`,Zt={},qe=Symbol(),Mn=["touchstart","touchmove","touchend"];function eo(e){console.warn("hydration_mismatch")}let Q=!1;function ke(e){Q=e}let Ie=null,Oe;function to(e){Ie=e,Oe=e&&e[0]}function ze(e){if(e.nodeType!==8)return e;var t=e;if(t.data!==bt)return e;for(var n=[],r=0;(t=t.nextSibling)!==null;){if(t.nodeType===8){var o=t.data;if(o===bt)r+=1;else if(o[0]===Kn){if(r===0)return Ie=n,Oe=n[0],t;r-=1}}n.push(t)}throw eo(),Zt}var Ue=Array.isArray,no=Array.from,wt=Object.keys,Zn=Object.isFrozen,st=Object.defineProperty,Qt=Object.getOwnPropertyDescriptor,ro=Object.prototype,oo=Array.prototype,io=Object.getPrototypeOf;const Le=2,Qn=4,Xe=8,er=16,_e=32,dn=64,$e=128,Et=256,de=512,ye=1024,Me=2048,Re=4096,Ge=8192,so=16384,hn=32768,X=Symbol("$state"),lo=Symbol("$state.frozen"),ao=Symbol("");function tr(e){return e===this.v}function uo(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function co(e){return!uo(e,this.v)}function fo(e){throw new Error("effect_in_teardown")}function ho(){throw new Error("effect_in_unowned_derived")}function po(e){throw new Error("effect_orphan")}function vo(){throw new Error("effect_update_depth_exceeded")}function mo(){throw new Error("hydration_failed")}function go(e){throw new Error("props_invalid_value")}function _o(){throw new Error("state_unsafe_mutation")}function re(e){return{f:0,reactions:null,equals:tr,v:e,version:0}}function kt(e){var n;const t=re(e);return t.equals=co,U!==null&&U.l!==null&&((n=U.l).s??(n.s=[])).push(t),t}function j(e,t){var n=e.v!==qe;return!ge&&n&&J!==null&&nn()&&J.f&Le&&_o(),e.equals(t)||(e.v=t,e.version++,nn()&&n&&I!==null&&I.f&de&&!(I.f&_e)&&(z!==null&&z.includes(e)?(ae(I,ye),Mt(I)):Te===null?$o([e]):Te.push(e)),mn(e,ye,!0)),t}function se(e,t=!0,n=null,r){if(typeof e=="object"&&e!=null&&!Zn(e)&&!(lo in e)){if(X in e){const s=e[X];if(s.t===e||s.p===e)return s.p}const o=io(e);if(o===ro||o===oo){const s=new Proxy(e,yo);return st(e,X,{value:{s:new Map,v:re(0),a:Ue(e),i:t,p:s,t:e},writable:!0,enumerable:!1}),s}}return e}function Rn(e,t=1){j(e,e.v+t)}const yo={defineProperty(e,t,n){if(n.value){const r=e[X],o=r.s.get(t);o!==void 0&&j(o,se(n.value,r.i,r))}return Reflect.defineProperty(e,t,n)},deleteProperty(e,t){const n=e[X],r=n.s.get(t),o=n.a,s=delete e[t];if(o&&s){const c=n.s.get("length"),v=e.length-1;c!==void 0&&c.v!==v&&j(c,v)}return r!==void 0&&j(r,qe),s&&Rn(n.v),s},get(e,t,n){var s;if(t===X)return Reflect.get(e,X);const r=e[X];let o=r.s.get(t);if(o===void 0&&(!(t in e)||(s=Qt(e,t))!=null&&s.writable)&&(o=(r.i?re:kt)(se(e[t],r.i,r)),r.s.set(t,o)),o!==void 0){const c=L(o);return c===qe?void 0:c}return Reflect.get(e,t,n)},getOwnPropertyDescriptor(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);if(n&&"value"in n){const o=e[X].s.get(t);o&&(n.value=L(o))}return n},has(e,t){var s;if(t===X)return!0;const n=e[X],r=Reflect.has(e,t);let o=n.s.get(t);return(o!==void 0||I!==null&&(!r||(s=Qt(e,t))!=null&&s.writable))&&(o===void 0&&(o=(n.i?re:kt)(r?se(e[t],n.i,n):qe),n.s.set(t,o)),L(o)===qe)?!1:r},set(e,t,n,r){const o=e[X];let s=o.s.get(t);s===void 0&&(gn(()=>r[t]),s=o.s.get(t)),s!==void 0&&j(s,se(n,o.i,o));const c=o.a,v=!(t in e);if(c&&t==="length")for(let d=n;d<e.length;d+=1){const f=o.s.get(d+"");f!==void 0&&j(f,qe)}if(e[t]=n,v){if(c){const d=o.s.get("length"),f=e.length;d!==void 0&&d.v!==f&&j(d,f)}Rn(o.v)}return!0},ownKeys(e){const t=e[X];return L(t.v),Reflect.ownKeys(e)}};function Ct(e){if(e!==null&&typeof e=="object"&&X in e){var t=e[X];if(t)return t.p}return e}function bo(e,t){return Object.is(Ct(e),Ct(t))}function nr(e){for(var t=0;t<e.length;t++)e[t]()}const wo=typeof requestIdleCallback>"u"?e=>setTimeout(e,1):requestIdleCallback;let xt=!1,Tt=!1,en=[],tn=[];function rr(){xt=!1;const e=en.slice();en=[],nr(e)}function or(){Tt=!1;const e=tn.slice();tn=[],nr(e)}function ir(e){xt||(xt=!0,queueMicrotask(rr)),en.push(e)}function Eo(e){Tt||(Tt=!0,wo(or)),tn.push(e)}function ko(){xt&&rr(),Tt&&or()}function Co(e){let t=Le|ye;I===null&&(t|=$e);const n={deps:null,deriveds:null,equals:tr,f:t,first:null,fn:e,last:null,reactions:null,v:null,version:0};if(J!==null&&J.f&Le){var r=J;r.deriveds===null?r.deriveds=[n]:r.deriveds.push(n)}return n}function sr(e){vn(e);var t=e.deriveds;if(t!==null){e.deriveds=null;for(var n=0;n<t.length;n+=1)xo(t[n])}}function lr(e,t){sr(e);var n=ur(e),r=(Be||e.f&$e)&&e.deps!==null?Me:de;ae(e,r);var o=e.equals(n);return o||(e.v=n,mn(e,ye,t)),o}function xo(e){sr(e),Ot(e,0),ae(e,Ge),e.first=e.last=e.deps=e.reactions=e.fn=null}const ar=0,To=1;let _t=ar,lt=!1,Ye=!1,pn=!1;function In(e){Ye=e}function Fn(e){pn=e}function Hn(e){ge=e}let Ae=[],We=0,J=null,I=null,z=null,W=0,Te=null;function $o(e){Te=e}let ge=!1,Be=!1,U=null;function nn(){return U!==null&&U.l===null}function ct(e){var x;var t=e.f,n=(t&ye)!==0,r=(t&$e)!==0;if(n&&!r)return!0;var o=(t&Et)!==0;if(t&Me||n&&r){var s=e.deps;if(s!==null)for(var c=s.length,v,d,f=0;f<c;f++){var y=s[f];!n&&ct(y)&&(v=lr(y,!0));var g=y.version;if(r){if(g>e.version)return e.version=g,!v;!Be&&!((x=y==null?void 0:y.reactions)!=null&&x.includes(e))&&(d=y.reactions,d===null?y.reactions=[e]:d.push(e))}else{if(e.f&ye)return!0;o&&(g>e.version&&(e.version=g,n=!0),d=y.reactions,d===null?y.reactions=[e]:d.includes(e)||d.push(e))}}r||ae(e,de),o&&(e.f^=Et)}return n}function So(e,t,n){throw e}function ur(e){const t=z,n=W,r=Te,o=J,s=Be,c=ge;z=null,W=0,Te=null,J=e,Be=!Ye&&(e.f&$e)!==0,ge=!1;try{let v=(0,e.fn)(),d=e.deps;if(z!==null){let f;if(d!==null){const y=d.length,g=W===0?z:d.slice(0,W).concat(z),E=g.length>16&&y-W>1?new Set(g):null;for(f=W;f<y;f++){const S=d[f];(E!==null?!E.has(S):!g.includes(S))&&cr(e,S)}}if(d!==null&&W>0)for(d.length=W+z.length,f=0;f<z.length;f++)d[W+f]=z[f];else e.deps=d=z;if(!Be)for(f=W;f<d.length;f++){const y=d[f],g=y.reactions;g===null?y.reactions=[e]:g[g.length-1]!==e&&g.push(e)}}else d!==null&&W<d.length&&(Ot(e,W),d.length=W);return v}finally{z=t,W=n,Te=r,J=o,Be=s,ge=c}}function cr(e,t){const n=t.reactions;let r=0;if(n!==null){r=n.length-1;const o=n.indexOf(e);o!==-1&&(r===0?t.reactions=null:(n[o]=n[r],n.pop()))}r===0&&t.f&Le&&(ae(t,Me),t.f&($e|Et)||(t.f^=Et),Ot(t,0))}function Ot(e,t){const n=e.deps;if(n!==null){const r=t===0?null:n.slice(0,t);let o;for(o=t;o<n.length;o++){const s=n[o];(r===null||!r.includes(s))&&cr(e,s)}}}function vn(e,t=!0){let n=e.first;e.first=null,e.last=null;for(var r;n!==null;)r=n.next,pt(n,t),n=r}function Lt(e){var t=e.f;if(!(t&Ge)){ae(e,de);var n=e.ctx,r=I,o=U;I=e,U=n;try{t&er||vn(e),mr(e);var s=ur(e);e.teardown=typeof s=="function"?s:null}catch(c){So(c)}finally{I=r,U=o}}}function fr(){We>1e3&&(We=0,vo()),We++}function dr(e){const t=e.length;if(t!==0){fr();var n=Ye;Ye=!0;try{for(var r=0;r<t;r++){var o=e[r];if(o.first===null&&!(o.f&_e))Pn([o]);else{var s=[];hr(o,s),Pn(s)}}}finally{Ye=n}}}function Pn(e){var t=e.length;if(t!==0)for(var n=0;n<t;n++){var r=e[n];!(r.f&(Ge|Re))&&ct(r)&&Lt(r)}}function No(){if(lt=!1,We>1001)return;const e=Ae;Ae=[],dr(e),lt||(We=0)}function Mt(e){_t===ar&&(lt||(lt=!0,queueMicrotask(No)));for(var t=e;t.parent!==null;){t=t.parent;var n=t.f;if(n&_e){if(!(n&de))return;ae(t,Me)}}Ae.push(t)}function hr(e,t){var n=e.first,r=[];e:for(;n!==null;){var o=n.f,s=(o&(Ge|Re))===0,c=o&_e,v=(o&de)!==0,d=n.first;if(s&&(!c||!v)){if(c&&ae(n,de),o&Xe){if(!c&&ct(n)&&(Lt(n),d=n.first),d!==null){n=d;continue}}else if(o&Qn)if(c||v){if(d!==null){n=d;continue}}else r.push(n)}var f=n.next;if(f===null){let x=n.parent;for(;x!==null;){if(e===x)break e;var y=x.next;if(y!==null){n=y;continue e}x=x.parent}}n=f}for(var g=0;g<r.length;g++)d=r[g],t.push(d),hr(d,t)}function Fe(e,t=!0){var n=_t,r=Ae;try{fr();const s=[];_t=To,Ae=s,lt=!1,t&&dr(r);var o=e==null?void 0:e();return ko(),(Ae.length>0||s.length>0)&&Fe(),We=0,o}finally{_t=n,Ae=r}}function L(e){const t=e.f;if(t&Ge)return e.v;if(J!==null&&!(J.f&(_e|dn))&&!ge){const n=(J.f&$e)!==0,r=J.deps;z===null&&r!==null&&r[W]===e&&!(n&&I!==null)?W++:(r===null||W===0||r[W-1]!==e)&&(z===null?z=[e]:z[z.length-1]!==e&&z.push(e)),Te!==null&&I!==null&&I.f&de&&!(I.f&_e)&&Te.includes(e)&&(ae(I,ye),Mt(I))}return t&Le&&ct(e)&&lr(e,!1),e.v}function mn(e,t,n){var r=e.reactions;if(r!==null)for(var o=nn(),s=r.length,c=0;c<s;c++){var v=r[c],d=v.f;if(!(d&ye||(!n||!o)&&v===I)){ae(v,t);var f=(d&Me)!==0,y=(d&$e)!==0;(d&de||f&&y)&&(v.f&Le?mn(v,Me,n):Mt(v))}}}function gn(e){const t=ge;try{return ge=!0,e()}finally{ge=t}}const Ao=~(ye|Me|de);function ae(e,t){e.f=e.f&Ao|t}function Do(e){return typeof e=="object"&&e!==null&&typeof e.f=="number"}function ft(e,t=!1,n){U={p:U,c:null,e:null,m:!1,s:e,x:null,l:null},t||(U.l={s:null,u:null,r1:[],r2:re(!1)})}function dt(e){const t=U;if(t!==null){e!==void 0&&(t.x=e);const r=t.e;if(r!==null){t.e=null;for(var n=0;n<r.length;n++)Je(r[n])}U=t.p,t.m=!0}return e||{}}function Z(e){return Do(e)?L(e):e}function Oo(e){var t=document.createElement("template");return t.innerHTML=e,t.content}function _n(e){if(Ue(e))for(var t=0;t<e.length;t++){var n=e[t];n.isConnected&&n.remove()}else e.isConnected&&e.remove()}function Lo(e){I===null&&J===null&&po(),pn&&fo()}function jn(e,t){var n=t.last;n===null?t.last=t.first=e:(n.next=e,e.prev=n,t.last=e)}function Ke(e,t,n){var r=(e&dn)!==0,o={ctx:U,deps:null,dom:null,f:e|ye,first:null,fn:t,last:null,next:null,parent:r?null:I,prev:null,teardown:null,transitions:null};if(J!==null&&!r){var s=J.f;s&Le&&(s&$e&&ho(),I!==null&&jn(o,I)),jn(o,J)}if(n){var c=Ye;try{In(!0),Lt(o),o.f|=so}finally{In(c)}}else t!==null&&Mt(o);return o}function pr(e){const t=Ke(Xe,null,!1);return ae(t,de),t.teardown=e,t}function rn(e){Lo();var t=I!==null&&(I.f&Xe)!==0&&U!==null&&!U.m;if(t){var n=U;(n.e??(n.e=[])).push(e)}else{var r=Je(e);return r}}function Mo(e){const t=Ke(dn,e,!0);return()=>{pt(t)}}function Je(e){return Ke(Qn,e,!1)}function ht(e){return Ke(Xe,e,!0)}function xe(e){return ht(e)}function vr(e,t=0){return Ke(Xe|er|t,e,!0)}function at(e){return Ke(Xe|_e,e,!0)}function mr(e){var t=e.teardown;if(t!==null){const n=pn,r=ge;Fn(!0),Hn(!0);try{t.call(null)}finally{Fn(n),Hn(r)}}}function pt(e,t=!0){var n=e.dom;if(n!==null&&t&&_n(n),vn(e,t),Ot(e,0),ae(e,Ge),e.transitions)for(const c of e.transitions)c.stop();mr(e);var r=e.parent;if(r!==null&&e.f&_e&&r.first!==null){var o=e.prev,s=e.next;o!==null?s!==null?(o.next=s,s.prev=o):(o.next=null,r.last=o):s!==null?(s.prev=null,r.first=s):(r.first=null,r.last=null)}e.next=e.prev=e.teardown=e.ctx=e.dom=e.deps=e.parent=e.fn=null}function on(e,t){var n=[];yn(e,n,!0),gr(n,()=>{pt(e),t&&t()})}function gr(e,t){var n=e.length;if(n>0){var r=()=>--n||t();for(var o of e)o.out(r)}else t()}function yn(e,t,n){if(!(e.f&Re)){if(e.f^=Re,e.transitions!==null)for(const c of e.transitions)(c.is_global||n)&&t.push(c);for(var r=e.first;r!==null;){var o=r.next,s=(r.f&hn)!==0||(r.f&_e)!==0;yn(r,t,s?n:!1),r=o}}}function $t(e){_r(e,!0)}function _r(e,t){if(e.f&Re){e.f^=Re,ct(e)&&Lt(e);for(var n=e.first;n!==null;){var r=n.next,o=(n.f&hn)!==0||(n.f&_e)!==0;_r(n,o?t:!1),n=r}if(e.transitions!==null)for(const s of e.transitions)(s.is_global||t)&&s.in()}}var St,Ne;function yr(){if(St===void 0){St=window,Ne=document;var e=Element.prototype;e.__click=void 0,e.__className="",e.__attributes=null,e.__e=void 0,Text.prototype.__t=void 0}}function Ze(){return document.createTextNode("")}function le(e){const t=e.firstChild;return Q?t===null?e.appendChild(Ze()):ze(t):t}function Rt(e,t){return Q?ze(Oe):e.firstChild}function H(e,t=!1){var n=e.nextSibling;if(!Q)return n;var r=n.nodeType;if(r===8&&n.data===Qr)return H(n,t);if(t&&r!==3){var o=Ze(),s=I.dom;return s.unshift(o),n==null||n.before(o),o}return ze(n)}function bn(e){e.textContent=""}function Ro(e){return document.createElement(e)}function Io(e,t,n,r){function o(s){if(r.capture||sn(t,s),!s.cancelBubble)return n.call(this,s)}return e.startsWith("pointer")||e==="wheel"?ir(()=>{t.addEventListener(e,o,r)}):t.addEventListener(e,o,r),o}function me(e,t,n,r,o){var s={capture:r,passive:o},c=Io(e,t,n,s);(t===document.body||t===window||t===document)&&pr(()=>{t.removeEventListener(e,c,s)})}function br(e){for(var t=0;t<e.length;t++)wr.add(e[t]);for(var n of ln)n(e)}function sn(e,t){var T;var n=e.ownerDocument,r=t.type,o=((T=t.composedPath)==null?void 0:T.call(t))||[],s=o[0]||t.target,c=0,v=t.__root;if(v){var d=o.indexOf(v);if(d!==-1&&(e===document||e===window)){t.__root=e;return}var f=o.indexOf(e);if(f===-1)return;d<=f&&(c=d+1)}s=o[c]||t.target,st(t,"currentTarget",{configurable:!0,get(){return s||n}});try{for(var y,g=[];s!==null;){var x=s.parentNode||s.host||null;try{var E=s["__"+r];if(E!==void 0&&!s.disabled)if(Ue(E)){var[S,...w]=E;S.apply(s,[t,...w])}else E.call(s,t)}catch(N){y?g.push(N):y=N}if(t.cancelBubble||x===e||x===null||s===e)break;s=x}if(y){for(let N of g)queueMicrotask(()=>{throw N});throw y}}finally{t.__root=e,s=e}}const wr=new Set,ln=new Set;function Ut(e,t){(e.__t??(e.__t=e.nodeValue))!==t&&(e.nodeValue=e.__t=t)}function Er(e,t){const n=t.anchor??t.target.appendChild(Ze());return Fe(()=>kr(e,{...t,anchor:n}),!1)}function Fo(e,t){const n=t.target,r=Ie;try{return Fe(()=>{ke(!0);for(var o=n.firstChild;o&&(o.nodeType!==8||o.data!==bt);)o=o.nextSibling;if(!o)throw Zt;const s=ze(o),c=kr(e,{...t,anchor:s});return ke(!1),c},!1)}catch(o){if(o===Zt)return t.recover===!1&&mo(),yr(),bn(n),ke(!1),Er(e,t);throw o}finally{ke(!!r),to(r)}}function kr(e,{target:t,anchor:n,props:r={},events:o,context:s,intro:c=!1}){yr();const v=new Set,d=sn.bind(null,t),f=sn.bind(null,document),y=E=>{for(let S=0;S<E.length;S++){const w=E[S];v.has(w)||(v.add(w),t.addEventListener(w,d,Mn.includes(w)?{passive:!0}:void 0),document.addEventListener(w,f,Mn.includes(w)?{passive:!0}:void 0))}};y(no(wr)),ln.add(y);let g;const x=Mo(()=>(at(()=>{if(s){ft({});var E=U;E.c=s}o&&(r.$$events=o),g=e(n,r)||{},s&&dt()}),()=>{for(const E of v)t.removeEventListener(E,d);ln.delete(y),an.delete(g)}));return an.set(g,x),g}let an=new WeakMap;function Ho(e){const t=an.get(e);t==null||t()}async function wn(e,t,n){await Promise.resolve();const r=Po(e);if(!r.getElementById(t)){const o=Ro("style");o.id=t,o.textContent=n,(r.head||r).appendChild(o)}}function Po(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function ut(e,t,n,r=null,o=!1){var s=null,c=null,v=null,d=o?hn:0;vr(()=>{if(v===(v=!!t()))return;let f=!1;if(Q){const y=e.data===Jn;v===y&&(_n(Ie),ke(!1),f=!0)}v?(s?$t(s):s=at(()=>n(e)),c&&on(c,()=>{c=null})):(c?$t(c):r&&(c=at(()=>r(e))),s&&on(s,()=>{s=null})),f&&ke(!0)},d)}let Vt=null;function jo(e,t){return t}function qo(e,t,n){for(var r=[],o=e.length,s=0;s<o;s++)yn(e[s].e,r,!0);var c=o>0&&r.length===0&&t!==null;if(c){var v=t.parentNode;bn(v),v.append(t),n.clear(),Ce(e[0].prev,e[o-1].next)}gr(r,()=>{for(var d=0;d<o;d++){var f=e[d];c||(n.delete(f.k),f.o.remove(),Ce(f.prev,f.next)),pt(f.e,!c)}})}function En(e,t,n,r,o,s=null){var c={flags:t,items:new Map,next:null},v=(t&Gn)!==0;if(v){var d=e;e=Q?ze(d.firstChild):d.appendChild(Ze())}var f=null;vr(()=>{var y=n(),g=Ue(y)?y:y==null?[]:Array.from(y),x=g.length,E=c.flags;E&Jt&&!Zn(g)&&!(X in g)&&(E^=Jt,E&Xr&&!(E&it)&&(E^=it));let S=!1;if(Q){var w=e.data===Jn;w!==(x===0)&&(_n(Ie),ke(!1),S=!0)}if(Q){for(var T=Oe,N=c,$,k=0;k<x;k++){if(T.nodeType!==8||T.data!==bt){S=!0,ke(!1);break}var O=T;T=ze(T);var G=g[k],C=r(G,k);$=Cr(O,T,N,null,G,C,k,o,E),c.items.set(C,$),T=T.nextSibling,N=$}if(x>0)for(;T!==e;){var A=T.nextSibling;T.remove(),T=A}}Q||Bo(g,c,e,o,E,r),s!==null&&(x===0?f?$t(f):f=at(()=>s(e)):f!==null&&on(f,()=>{f=null})),S&&ke(!0)})}function Bo(e,t,n,r,o,s){var Y,ee,Se,Qe;var c=(o&Gr)!==0,v=(o&(it|fn))!==0,d=e.length,f=t.items,y=t.next,g=y,x=new Set,E=t,S=new Set,w=[],T=[],N,$,k,O;if(c)for(O=0;O<d;O+=1)N=e[O],$=s(N,O),k=f.get($),k!==void 0&&((Y=k.a)==null||Y.measure(),S.add(k));for(O=0;O<d;O+=1){if(N=e[O],$=s(N,O),k=f.get($),k===void 0){var G=Ze(),C=g?g.o:n;C.before(G),E=Cr(G,C,E,E.next,N,$,O,r,o),f.set($,E),w=[],T=[],g=E.next;continue}if(v&&Yo(k,N,O,o),k.e.f&Re&&($t(k.e),c&&((ee=k.a)==null||ee.unfix(),S.delete(k))),k!==g){if(x.has(k)){if(w.length<T.length){var A=T[0],M;E=A.prev;var R=w[0],q=w[w.length-1];for(M=0;M<w.length;M+=1)qn(w[M],A,n);for(M=0;M<T.length;M+=1)x.delete(T[M]);Ce(R.prev,q.next),Ce(E,R),Ce(q,A),g=A,E=q,O-=1,w=[],T=[]}else x.delete(k),qn(k,g,n),Ce(k.prev,k.next),Ce(k,E.next),Ce(E,k),E=k;continue}for(w=[],T=[];g!==null&&g.k!==$;)x.add(g),T.push(g),g=g.next;if(g===null)continue;k=g}w.push(k),E=k,g=k.next}const V=Array.from(x);for(;g!==null;)V.push(g),g=g.next;var K=V.length;if(K>0){var ue=o&Gn&&d===0?n:null;if(c){for(O=0;O<K;O+=1)(Se=V[O].a)==null||Se.measure();for(O=0;O<K;O+=1)(Qe=V[O].a)==null||Qe.fix()}qo(V,ue,f)}c&&Je(()=>{gn(()=>{var et;for(k of S)(et=k.a)==null||et.apply()})})}function Yo(e,t,n,r){r&it&&j(e.v,t),r&fn?j(e.i,n):e.i=n}function Cr(e,t,n,r,o,s,c,v,d){var f=Vt;try{var y=(d&it)!==0,g=(d&Jt)===0,x=y?g?kt(o):re(o):o,E=d&fn?re(c):c,S={i:E,v:x,k:s,a:null,e:null,o:e,prev:n,next:r};return n.next=S,r!==null&&(r.prev=S),Vt=S,S.e=at(()=>v(t,x,E)),S}finally{Vt=f}}function qn(e,t,n){for(var r=e.next?e.next.o:n,o=t?t.o:n,s=e.o;s!==r;){var c=s.nextSibling;o.before(s),s=c}}function Ce(e,t){e.next=t,t!==null&&(t.prev=e)}function Nt(e,t=I){var n=t.dom;return n===null?t.dom=e:(Ue(n)||(n=t.dom=[n]),Ue(e)?n.push(...e):n.push(e)),e}function he(e,t){var n=(t&Jr)!==0,r=(t&Zr)!==0,o;return()=>{if(Q)return Nt(n?Ie:Oe),Oe;o||(o=Oo(e),n||(o=o.firstChild));var s=r?document.importNode(o,!0):o.cloneNode(!0);return Nt(n?[...s.childNodes]:s),s}}function xr(){if(Q)return Nt(Ie),Oe;var e=document.createDocumentFragment(),t=Ze();return e.append(t),Nt([t]),e}function ne(e,t){Q||e.before(t)}function Wo(e,t){{const n=document.body;e.autofocus=!0,Je(()=>{document.activeElement===n&&e.focus()})}}function zo(e){Q&&e.firstChild!==null&&bn(e)}let Bn=!1;function Tr(){Bn||(Bn=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const n of e.target.elements)(t=n.__on_r)==null||t.call(n)})},{capture:!0}))}function Uo(e){if(Q){let t=!1;const n=()=>{if(t)return;t=!0;const r=e.getAttribute("value");fe(e,"value",null),fe(e,"checked",null),r&&(e.value=r)};e.__on_r=n,Eo(n),Tr()}}function Vo(e,t){var n=e.__attributes??(e.__attributes={});n.value!==(n.value=t)&&(e.value=t)}function fe(e,t,n){n=n==null?null:n+"";var r=e.__attributes??(e.__attributes={});Q&&(r[t]=e.getAttribute(t),t==="src"||t==="href"||t==="srcset")||r[t]!==(r[t]=n)&&(t==="loading"&&(e[ao]=n),n===null?e.removeAttribute(t):e.setAttribute(t,n))}function un(e,t,n){n?e.classList.add(t):e.classList.remove(t)}function $r(e,t,n,r=n){e.addEventListener(t,n);const o=e.__on_r;o?e.__on_r=()=>{o(),r()}:e.__on_r=r,Tr()}function Xo(e,t,n){$r(e,"input",()=>{n(Yn(e)?Wn(e.value):e.value)}),ht(()=>{var r=t();e.__value=r,!(Yn(e)&&r===Wn(e.value))&&(e.type==="date"&&!r&&!e.value||(e.value=r??""))})}function Go(e,t,n,r,o){var s=n.getAttribute("type")==="checkbox",c=e;if(t!==null)for(var v of t){var d=c;c=d[v],c===void 0&&(c=d[v]=[])}c.push(n),$r(n,"change",()=>{var f=n.__value;s&&(f=Ko(c,f,n.checked)),o(f)},()=>o(s?[]:null)),ht(()=>{var f=r();s?(f=f||[],n.checked=Ct(f).includes(Ct(n.__value))):n.checked=bo(n.__value,f)}),pr(()=>{var f=c.indexOf(n);f!==-1&&c.splice(f,1)}),Je(()=>{c.sort((f,y)=>f.compareDocumentPosition(y)===4?-1:1)})}function Ko(e,t,n){for(var r=new Set,o=0;o<e.length;o+=1)e[o].checked&&r.add(e[o].__value);return n||r.delete(t),Array.from(r)}function Yn(e){var t=e.type;return t==="number"||t==="range"}function Wn(e){return e===""?null:+e}function zn(e,t){var r;var n=e&&((r=e[X])==null?void 0:r.t);return e===t||n===t}function cn(e,t,n,r){Je(()=>{var o,s;return ht(()=>{o=s,s=[],gn(()=>{e!==n(...s)&&(t(e,...s),o&&zn(n(...o),e)&&t(null,...o))})}),()=>{ir(()=>{s&&zn(n(...s),e)&&t(null,...s)})}})}function It(e,t,n,r){var E;var o=(n&Kr)!==0,s=e[t],c=(E=Qt(e,t))==null?void 0:E.set,v=r,d=()=>v;s===void 0&&r!==void 0&&(c&&o&&go(),s=d(),c&&c(s));var f;if(f=()=>{var S=e[t];return S===void 0?d():S},c)return function(S){return arguments.length===1?(c(S),S):f()};var y=!1,g=kt(s),x=Co(()=>{var S=f(),w=L(g);return y?(y=!1,w):g.v=S});return function(S){var w=L(x);return arguments.length>0?(x.equals(S)||(y=!0,j(g,S),L(x),x.version++),S):w}}function Jo(e){return new Zo(e)}var we,ie;class Zo{constructor(t){Wt(this,we,void 0);Wt(this,ie,void 0);const n=se({...t.props||{},$$events:{}},!1);zt(this,ie,(t.hydrate?Fo:Er)(t.component,{target:t.target,props:n,context:t.context,intro:t.intro,recover:t.recover})),zt(this,we,n.$$events);for(const r of Object.keys(te(this,ie)))r==="$set"||r==="$destroy"||r==="$on"||st(this,r,{get(){return te(this,ie)[r]},set(o){te(this,ie)[r]=o},enumerable:!0});te(this,ie).$set=r=>{Object.assign(n,r)},te(this,ie).$destroy=()=>{Ho(te(this,ie))}}$set(t){te(this,ie).$set(t)}$on(t,n){te(this,we)[t]=te(this,we)[t]||[];const r=(...o)=>n.call(this,...o);return te(this,we)[t].push(r),()=>{te(this,we)[t]=te(this,we)[t].filter(o=>o!==r)}}$destroy(){te(this,ie).$destroy()}}we=new WeakMap,ie=new WeakMap;let Sr;typeof HTMLElement=="function"&&(Sr=class extends HTMLElement{constructor(t,n,r){super();ce(this,"$$ctor");ce(this,"$$s");ce(this,"$$c");ce(this,"$$cn",!1);ce(this,"$$d",{});ce(this,"$$r",!1);ce(this,"$$p_d",{});ce(this,"$$l",{});ce(this,"$$l_u",new Map);ce(this,"$$me");this.$$ctor=t,this.$$s=n,r&&this.attachShadow({mode:"open"})}addEventListener(t,n,r){if(this.$$l[t]=this.$$l[t]||[],this.$$l[t].push(n),this.$$c){const o=this.$$c.$on(t,n);this.$$l_u.set(n,o)}super.addEventListener(t,n,r)}removeEventListener(t,n,r){if(super.removeEventListener(t,n,r),this.$$c){const o=this.$$l_u.get(n);o&&(o(),this.$$l_u.delete(n))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){let t=function(o){return s=>{const c=document.createElement("slot");o!=="default"&&(c.name=o),ne(s,c)}};if(await Promise.resolve(),!this.$$cn||this.$$c)return;const n={},r=Qo(this);for(const o of this.$$s)o in r&&(o==="default"&&!this.$$d.children?(this.$$d.children=t(o),n.default=!0):n[o]=t(o));for(const o of this.attributes){const s=this.$$g_p(o.name);s in this.$$d||(this.$$d[s]=yt(s,o.value,this.$$p_d,"toProp"))}for(const o in this.$$p_d)!(o in this.$$d)&&this[o]!==void 0&&(this.$$d[o]=this[o],delete this[o]);this.$$c=Jo({component:this.$$ctor,target:this.shadowRoot||this,props:{...this.$$d,$$slots:n,$$host:this}}),this.$$me=ht(()=>{var o;this.$$r=!0;for(const s of wt(this.$$c)){if(!((o=this.$$p_d[s])!=null&&o.reflect))continue;this.$$d[s]=this.$$c[s];const c=yt(s,this.$$d[s],this.$$p_d,"toAttribute");c==null?this.removeAttribute(this.$$p_d[s].attribute||s):this.setAttribute(this.$$p_d[s].attribute||s,c)}this.$$r=!1});for(const o in this.$$l)for(const s of this.$$l[o]){const c=this.$$c.$on(o,s);this.$$l_u.set(s,c)}this.$$l={}}}attributeChangedCallback(t,n,r){var o;this.$$r||(t=this.$$g_p(t),this.$$d[t]=yt(t,r,this.$$p_d,"toProp"),(o=this.$$c)==null||o.$set({[t]:this.$$d[t]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then(()=>{!this.$$cn&&this.$$c&&(this.$$c.$destroy(),pt(this.$$me),this.$$c=void 0)})}$$g_p(t){return wt(this.$$p_d).find(n=>this.$$p_d[n].attribute===t||!this.$$p_d[n].attribute&&n.toLowerCase()===t)||t}});function yt(e,t,n,r){var s;const o=(s=n[e])==null?void 0:s.type;if(t=o==="Boolean"&&typeof t!="boolean"?t!=null:t,!r||!n[e])return t;if(r==="toAttribute")switch(o){case"Object":case"Array":return t==null?null:JSON.stringify(t);case"Boolean":return t?"":null;case"Number":return t??null;default:return t}else switch(o){case"Object":case"Array":return t&&JSON.parse(t);case"Boolean":return t;case"Number":return t!=null?+t:t;default:return t}}function Qo(e){const t={};return e.childNodes.forEach(n=>{t[n.slot||"default"]=!0}),t}function Ft(e,t,n,r,o,s){let c=class extends Sr{constructor(){super(e,n,o),this.$$p_d=t}static get observedAttributes(){return wt(t).map(v=>(t[v].attribute||v).toLowerCase())}};return wt(t).forEach(v=>{st(c.prototype,v,{get(){return this.$$c&&v in this.$$c?this.$$c[v]:this.$$d[v]},set(d){var f;d=yt(v,d,t),this.$$d[v]=d,(f=this.$$c)==null||f.$set({[v]:d})}})}),r.forEach(v=>{st(c.prototype,v,{get(){var d;return(d=this.$$c)==null?void 0:d[v]}})}),e.element=c,c}const Ve=new Map([["yellow","#F8B920"],["red","#FF4646"],["blue","#0064FF"],["green","#00C564"]]),ei=["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","OPTION"];function Nr(e){const t=e.map(c=>c.trim().toLocaleLowerCase()),n=t.map(()=>({start:null,end:null,shift:0})),r=t.map(()=>[]),o=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,c=>{var v,d;return ei.includes((v=c.parentNode)==null?void 0:v.tagName)||!((d=c.parentNode)!=null&&d.checkVisibility())?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let s;for(;s=o.nextNode();)if(s!=null&&s.nodeValue)for(let c=0;c<s.nodeValue.length;c++){const v=s.nodeValue[c].toLocaleLowerCase().trim();v&&t.forEach((d,f)=>{var g;for(;d[n[f].shift]&&!d[n[f].shift].trim();)n[f].shift++;let y=d[n[f].shift]===v;if(!y&&n[f].shift&&(n[f].shift=0,y=d[n[f].shift]===v),y&&(n[f].shift||(n[f].start=[s,c]),n[f].end=[s,c],n[f].shift++),n[f].shift>=d.length){const x=document.createRange();x.setStart(n[f].start[0],n[f].start[1]),x.setEnd(n[f].end[0],n[f].end[1]+1),!x.collapsed&&((g=x.commonAncestorContainer.parentElement)!=null&&g.checkVisibility())?r[f].push(x):x.detach(),y=!1}y||(n[f].shift=0,n[f].start=null,n[f].end=null)})}return r}const De=`rh-${new Date().getTime()}-`,Ht="highlights"in CSS;function ti(e){if(!e.length&&!CSS.highlights.size)return;const t=[];if(CSS.highlights.clear(),e.length){const r=Nr(e.map(({text:o})=>o));for(const o in e){if(!r[o].length)continue;const{_id:s,color:c}=e[o],v=`${De}${s}`;CSS.highlights.set(v,new Highlight(...r[o]));const d=r[o][0].getBoundingClientRect();t.push(`
                ::highlight(${v}) {
                    all: unset;
                    background-color: color-mix(in srgb, ${Ve.get(c)||c}, transparent 50%) !important;
                }

                :root {
                    --highlight-${s}-top: ${(100/document.documentElement.scrollHeight*(window.scrollY+d.top-10)).toFixed(2)}%;
                }
            `);for(const f of r[o])f.detach()}}const n=(()=>{let r=document.getElementById(De);return r||(r=document.createElement("style"),r.id=De,document.head.appendChild(r)),r})();n.innerHTML=t.join(`
`)}function ni(){var e;(e=document.getElementById(De))==null||e.remove()}function ri(e){var t;for(const[n,r]of CSS.highlights){const o=n.replace(De,"");if(e==o)for(const s of r){(t=s.startContainer.parentElement)==null||t.scrollIntoView({behavior:"smooth",block:"start"});break}}}function oi(e){let t;for(const[n,r]of CSS.highlights)for(const o of r){const s=e.compareBoundaryPoints(Range.START_TO_START,o),c=e.compareBoundaryPoints(Range.END_TO_END,o);(s==0&&c==0||e!=null&&e.collapsed&&s>=0&&c<=0)&&(t=[n.replace(De,""),o])}if(t)return t[0].replace(De,"")}const Ee=`rh-${new Date().getTime()}`;function ii(e){const t=document.body.querySelectorAll(`.${Ee}`);if(!e.length&&!t.length)return;t.forEach(s=>s.outerHTML=s.innerText);const n=[],r=Nr(e.map(({text:s})=>s));for(const s in e){const{_id:c,color:v}=e[s];for(const d of r[s]){const f=document.createElement("mark");f.className=Ee,f.setAttribute("data-id",String(c)),f.append(d.extractContents()),d.insertNode(f),d.detach()}n.push(`
            .${Ee}[data-id="${c}"] {
                all: unset;
                display: inline-block;
                background-color: ${ui(Ve.get(v)||v,.5)} !important;
            }
        `)}const o=(()=>{let s=document.getElementById(Ee);return s||(s=document.createElement("style"),s.id=Ee,document.head.appendChild(s)),s})();o.innerHTML=n.join(`
`)}function si(){var e;document.body.querySelectorAll(`.${Ee}`).forEach(t=>t.outerHTML=t.innerText),(e=document.getElementById(Ee))==null||e.remove()}function li(e){const t=document.body.querySelector(`.${Ee}[data-id="${e}"]`);t&&t.scrollIntoView({behavior:"smooth",block:"start"})}function ai(e){const t=e.commonAncestorContainer.nodeType==Node.ELEMENT_NODE?e.commonAncestorContainer:e.commonAncestorContainer.parentElement;if((t==null?void 0:t.className)==Ee){if(!e.collapsed){const n=new Range;n.selectNodeContents(e.commonAncestorContainer);const r=e.compareBoundaryPoints(Range.START_TO_START,n),o=e.compareBoundaryPoints(Range.END_TO_END,n);if(n.detach(),r!=0||o!=0)return}return t.getAttribute("data-id")||void 0}}function ui(e,t){if(!e)return e;const n=parseInt(e.slice(1,3),16),r=parseInt(e.slice(3,5),16),o=parseInt(e.slice(5,7),16);return`rgba(${n}, ${r}, ${o}, ${t})`}function At(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var ci=typeof global=="object"&&global&&global.Object===Object&&global,fi=typeof self=="object"&&self&&self.Object===Object&&self,Ar=ci||fi||Function("return this")(),Xt=function(){return Ar.Date.now()},di=/\s/;function hi(e){for(var t=e.length;t--&&di.test(e.charAt(t)););return t}var pi=/^\s+/;function vi(e){return e&&e.slice(0,hi(e)+1).replace(pi,"")}var Dt=Ar.Symbol,Dr=Object.prototype,mi=Dr.hasOwnProperty,gi=Dr.toString,nt=Dt?Dt.toStringTag:void 0;function _i(e){var t=mi.call(e,nt),n=e[nt];try{e[nt]=void 0;var r=!0}catch{}var o=gi.call(e);return r&&(t?e[nt]=n:delete e[nt]),o}var yi=Object.prototype,bi=yi.toString;function wi(e){return bi.call(e)}var Ei="[object Null]",ki="[object Undefined]",Un=Dt?Dt.toStringTag:void 0;function Ci(e){return e==null?e===void 0?ki:Ei:Un&&Un in Object(e)?_i(e):wi(e)}function xi(e){return e!=null&&typeof e=="object"}var Ti="[object Symbol]";function $i(e){return typeof e=="symbol"||xi(e)&&Ci(e)==Ti}var Vn=NaN,Si=/^[-+]0x[0-9a-f]+$/i,Ni=/^0b[01]+$/i,Ai=/^0o[0-7]+$/i,Di=parseInt;function Xn(e){if(typeof e=="number")return e;if($i(e))return Vn;if(At(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=At(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=vi(e);var n=Ni.test(e);return n||Ai.test(e)?Di(e.slice(2),n?2:8):Si.test(e)?Vn:+e}var Oi="Expected a function",Li=Math.max,Mi=Math.min;function Ri(e,t,n){var r,o,s,c,v,d,f=0,y=!1,g=!1,x=!0;if(typeof e!="function")throw new TypeError(Oi);t=Xn(t)||0,At(n)&&(y=!!n.leading,g="maxWait"in n,s=g?Li(Xn(n.maxWait)||0,t):s,x="trailing"in n?!!n.trailing:x);function E(C){var A=r,M=o;return r=o=void 0,f=C,c=e.apply(M,A),c}function S(C){return f=C,v=setTimeout(N,t),y?E(C):c}function w(C){var A=C-d,M=C-f,R=t-A;return g?Mi(R,s-M):R}function T(C){var A=C-d,M=C-f;return d===void 0||A>=t||A<0||g&&M>=s}function N(){var C=Xt();if(T(C))return $(C);v=setTimeout(N,w(C))}function $(C){return v=void 0,x&&r?E(C):(r=o=void 0,c)}function k(){v!==void 0&&clearTimeout(v),f=0,r=d=o=v=void 0}function O(){return v===void 0?c:$(Xt())}function G(){var C=Xt(),A=T(C);if(r=arguments,o=this,d=C,A){if(v===void 0)return S(d);if(g)return clearTimeout(v),v=setTimeout(N,t),E(d)}return v===void 0&&(v=setTimeout(N,t)),c}return G.cancel=k,G.flush=O,G}var Ii="Expected a function";function Or(e,t,n){var r=!0,o=!0;if(typeof e!="function")throw new TypeError(Ii);return At(n)&&(r="leading"in n?!!n.leading:r,o="trailing"in n?!!n.trailing:o),Ri(e,t,{leading:r,maxWait:t,trailing:o})}function Lr(e){return Ht?ti(e):ii(e)}const Fi=Or(Lr,500);function Gt(e){return e.length?Fi(e):Lr(e)}function Hi(){return Ht?ni():si()}function Mr(e){return Ht?ri(e):li(e)}function Pi(e){return Ht?oi(e):ai(e)}function ot(){const e=(()=>{const t=document.getSelection();return t!=null&&t.rangeCount?t.getRangeAt(0):null})();if(e){const t=Pi(e);if(t)return{range:e,id:t}}if(e&&!e.collapsed&&e.toString().trim())return{range:e}}function ji(e){if(!e)return"";var t=document.createElement("div");t.appendChild(e.cloneContents().cloneNode(!0)),document.body.appendChild(t);const n=t.innerText;return document.body.removeChild(t),t=void 0,n}function Kt(e){return{text:ji(e).trim(),note:"",color:""}}function qi(e,t,n){let r=re(se([])),o=re(!1),s=re(!1),c=re(void 0);function v(w){const T={...w,text:w.text||"",note:w.note||"",color:w.color||"yellow"};if(w._id){const N=L(r).findIndex($=>$._id==w._id);N!=-1&&(L(r)[N]=T),t(T)}else{if(L(r).some(N=>N.text.toLocaleLowerCase().trim()==T.text.toLocaleLowerCase().trim()))return;L(r).push(T),e(T)}}function d(w){j(r,se(L(r).filter(T=>T._id!=w))),n({_id:w})}function f(){var N;const{range:w,id:T}=ot()||{};!w||T||(v(Kt(w)),(N=document.getSelection())==null||N.removeAllRanges())}function y(w){var k;const{range:T,id:N}=ot()||{};if(!T)return;const $=N?L(r).find(O=>O._id==N):Kt(T);$&&(v({...$,color:w}),(k=document.getSelection())==null||k.removeAllRanges())}function g(){var T;const{id:w}=ot()||{};w&&(d(w),(T=document.getSelection())==null||T.removeAllRanges())}function x(){const{range:w,id:T}=ot()||{};if(!w)return;const N=T?L(r).find($=>$._id==T):Kt(w);N&&j(c,se(JSON.parse(JSON.stringify(N))))}function E(){L(c)&&(v(L(c)),j(c,void 0))}function S(){j(c,void 0)}return{get highlights(){return L(r)},set highlights(w){j(r,se(w))},get pro(){return L(o)},set pro(w){j(o,se(w))},get nav(){return L(s)},set nav(w){j(s,se(w))},get draft(){return L(c)},addSelected:f,colorSelected:y,removeSelected:g,draftSelected:x,draftSubmit:E,draftCancel:S}}const Bi="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Bi);var Yi=he('<button type="submit" class="svelte-o4uskr"><span class="color svelte-o4uskr"></span></button>'),Wi=he('<button type="submit" value="add" title="Create highlight" class="svelte-o4uskr"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-o4uskr"><g class="svelte-o4uskr"><path d="M12.974,8.731c-.474,3.691-3.724,4.113-6.974,3.519" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-o4uskr"></path><path d="M2.75,15.25S4.062,3.729,15.25,2.75c-.56,.976-.573,2.605-.946,4.239-.524,2.011-2.335,2.261-4.554,2.261" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-o4uskr"></path></g></svg></button>'),zi=he('<button type="submit" value="remove" title="Delete highlight" class="svelte-o4uskr"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-o4uskr"><g class="svelte-o4uskr"><line x1="2.75" y1="4.25" x2="15.25" y2="4.25" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-o4uskr"></line><path d="M6.75,4.25v-1.5c0-.552,.448-1,1-1h2.5c.552,0,1,.448,1,1v1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-o4uskr"></path><path d="M13.5,6.75l-.4,7.605c-.056,1.062-.934,1.895-1.997,1.895H6.898c-1.064,0-1.941-.833-1.997-1.895l-.4-7.605" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-o4uskr"></path></g></svg></button>'),Ui=he('<dialog class="svelte-o4uskr"><form method="dialog" class="svelte-o4uskr"><!> <button type="submit" value="note" title="Add note" class="svelte-o4uskr"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-o4uskr"><g class="svelte-o4uskr"><path stroke-linecap="round" stroke-linejoin="round" d="M9,1.75C4.996,1.75,1.75,4.996,1.75,9c0,1.319,.358,2.552,.973,3.617,.43,.806-.053,2.712-.973,3.633,1.25,.068,2.897-.497,3.633-.973,.489,.282,1.264,.656,2.279,.848,.433,.082,.881,.125,1.338,.125,4.004,0,7.25-3.246,7.25-7.25S13.004,1.75,9,1.75Z" class="svelte-o4uskr"></path><path stroke-width="0" d="M9,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-o4uskr"></path><path stroke-width="0" d="M5.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-o4uskr"></path><path stroke-width="0" d="M12.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-o4uskr"></path></g></svg></button> <!></form></dialog>');function Rr(e,t){ft(t,!0);let n=It(t,"store",7),r,o=re(void 0),s=re(!1);function c(C){const A=C.currentTarget.returnValue;switch(C.currentTarget.returnValue="",A){case"add":t.store.addSelected();break;case"note":t.store.draftSelected();break;case"remove":t.store.removeSelected();break;default:if(Ve.has(A)){t.store.colorSelected(A);return}break}}function v(){j(s,!0)}function d(){j(s,!1),f()}function f(){if(L(s)){r==null||r.close();return}requestAnimationFrame(()=>{const{range:C,id:A}=ot()||{};if(!C){r==null||r.close();return}j(o,se(t.store.highlights.find(ee=>ee._id==A))),r.inert=!0,r==null||r.show(),r.inert=!1;const M=C.getBoundingClientRect(),R=Math.max(M.x,10)+window.scrollX,q=window.innerWidth-Math.max(M.x,10)-window.scrollX-M.width,V=Math.max(M.y,40)+window.scrollY+M.height+4,K=window.innerHeight-Math.max(M.y,40)-window.scrollY+4,ue=R<window.innerWidth/2+window.scrollX,Y=V<window.innerHeight/2+window.scrollY;r==null||r.style.setProperty("left",ue?`${R}px`:"unset"),r==null||r.style.setProperty("right",ue?"unset":`${q}px`),r==null||r.style.setProperty("top",Y?`${V}px`:"unset"),r==null||r.style.setProperty("bottom",Y?"unset":`${K}px`)})}const y=Or(f,200,{leading:!0,trailing:!0});var g=Ui();me("mousedown",Ne,v,!1),me("touchstart",Ne,v,!1,!0),me("mouseup",Ne,d,!1),me("touchend",Ne,d,!1,!0),me("touchcancel",Ne,d,!1,!0),me("selectionchange",Ne,y,!1),cn(g,C=>r=C,()=>r);var x=le(g),E=le(x);ut(E,()=>{var C;return(C=L(o))==null?void 0:C._id},C=>{var A=xr(),M=Rt(A);En(M,71,()=>Ve,(R,q)=>Z(Z(R))[0],(R,q,V)=>{let K=()=>Z(Z(q))[0],ue=()=>Z(Z(q))[1];var Y=Yi(),ee=le(Y);xe(()=>{Vo(Y,K()),fe(ee,"style",`--color: ${ue()??""}`),un(ee,"active",K()==L(o).color)}),ne(R,Y)}),ne(C,A)},C=>{var A=Wi();ne(C,A)});var S=H(H(E,!0)),w=le(S),T=le(w),N=le(T),$=H(N),k=H($),O=H(k),G=H(H(S,!0));return ut(G,()=>{var C;return(C=L(o))==null?void 0:C._id},C=>{var A=zi();ne(C,A)}),xe(()=>{var C,A,M,R,q,V;un(g,"new",!((C=L(o))!=null&&C._id)),fe(N,"fill",(A=L(o))!=null&&A.note?"currentColor":"none"),fe(N,"stroke-width",(M=L(o))!=null&&M.note?"0":void 0),fe($,"fill",(R=L(o))!=null&&R.note?"none":"currentColor"),fe(k,"fill",(q=L(o))!=null&&q.note?"none":"currentColor"),fe(O,"fill",(V=L(o))!=null&&V.note?"none":"currentColor")}),me("close",g,c,!1),ne(e,g),wn(e,"svelte-o4uskr",`
    .svelte-o4uskr {
        user-select: none;
        -webkit-user-select: none;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    dialog.svelte-o4uskr {
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
        dialog.svelte-o4uskr {
            --bg-light: rgba(255, 255, 255, .8);
            --bg-dark: rgba(60, 60, 60, .8);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }
    }

    @media (pointer: coarse) {
        dialog.svelte-o4uskr {
            --control-size: 26px;
        }
    }

    dialog.svelte-o4uskr {
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
        background: light-dark(var(--bg-light), var(--bg-dark));
        color: var(--control-fg-light);
        color: light-dark(var(--control-fg-light), var(--control-fg-dark));
    }

    @media (pointer: coarse) {
        dialog.new.svelte-o4uskr {
            position: fixed;
            top: auto !important;
            left: auto !important;
            right: 16px !important;
            bottom: 16px !important;
            margin-right: env(safe-area-inset-right);
            margin-bottom: env(safe-area-inset-bottom);
        }
    }

    [open].svelte-o4uskr {
        box-shadow: 0 0 0 .5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.05), 0 15px 40px rgba(0,0,0,.1);
    }

    form.svelte-o4uskr {
        display: flex;
        margin: 0;
        padding: 0;
    }

    button.svelte-o4uskr {
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

    button.svelte-o4uskr:first-child {
        border-top-left-radius: var(--control-size);
        border-bottom-left-radius: var(--control-size);
    }

    button.svelte-o4uskr:last-child {
        border-top-right-radius: var(--control-size);
        border-bottom-right-radius: var(--control-size);
    }

    @media (pointer: fine) {
        button.svelte-o4uskr:hover {
            background: var(--hover-bg-light);
            background: light-dark(var(--hover-bg-light), var(--hover-bg-dark));
        }
    }

    button.svelte-o4uskr:active {
        transition: none;
        background: var(--active-bg-light);
        background: light-dark(var(--active-bg-light), var(--active-bg-dark));
    }

    svg.svelte-o4uskr {
        stroke: currentColor;
        stroke-width: 1.5px;
    }

    .color.svelte-o4uskr {
        pointer-events: none;
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        box-shadow: inset 0 0 0 6px var(--color);
        transition: width .15s ease-in-out, height .15s ease-in-out;
        border-radius: 50%;
    }

    .color.active.svelte-o4uskr {
        width: 16px;
        height: 16px;
        box-shadow: inset 0 0 0 6px var(--color)
    }

    /* animation */
    dialog.svelte-o4uskr {
        transition: 
            display .25s allow-discrete ease-in-out, 
            overlay .25s allow-discrete ease-in-out, 
            box-shadow .25s allow-discrete ease-in-out, 
            transform .25s allow-discrete ease-in-out,
            opacity .25s ease-in-out;
        opacity: 0;
        transform: translateY(3px);
    }

    [open].svelte-o4uskr {
        opacity: 1;
        transform: translateY(0);
    }

    dialog.svelte-o4uskr:not([open]) {
        transition-duration: .2s;
        pointer-events: none;
    }

    @starting-style {
        [open].svelte-o4uskr {
            opacity: 0;
            transform: translateY(-3px);
        }
    }
`),dt({get store(){return n()},set store(C){n(C),Fe()}})}Ft(Rr,{store:{}},[],[],!0);function Vi(e){const t=e.currentTarget.getBoundingClientRect();t.top<=e.clientY&&e.clientY<=t.top+t.height&&t.left<=e.clientX&&e.clientX<=t.left+t.width||(e.preventDefault(),e.currentTarget.close())}var Xi=(e,t)=>j(t,!1),Gi=he('<input type="radio" name="color" class="svelte-1me8cmn">'),Ki=he('<div class="unlock svelte-1me8cmn"><a href="https://raindrop.io/pro/buy" target="_blank" class="svelte-1me8cmn">Upgrade to Pro</a> to unlock annotation</div>'),Ji=he('<blockquote role="presentation" class="svelte-1me8cmn"> </blockquote> <fieldset class="color svelte-1me8cmn"></fieldset> <textarea class="note svelte-1me8cmn" rows="4" maxlength="5000" placeholder="Notes (optional)"></textarea> <!>',1),Zi=he('<dialog role="presentation" class="svelte-1me8cmn"><header class="svelte-1me8cmn"> </header> <form method="dialog" class="svelte-1me8cmn"><!> <footer class="svelte-1me8cmn"><button formnovalidate="" class="svelte-1me8cmn">Cancel <sup class="svelte-1me8cmn">esc</sup></button> <button type="submit" value="OK" class="svelte-1me8cmn"> <sup class="svelte-1me8cmn">&crarr;</sup></button></footer></form></dialog>');function Ir(e,t){ft(t,!0);const n=[];let r=It(t,"store",7),o,s,c=re(!0);rn(()=>{t.store.draft?(j(c,!0),o==null||o.showModal()):o==null||o.close()});function v($){const k=$.currentTarget.returnValue;$.currentTarget.returnValue="",setTimeout(k?t.store.draftSubmit:t.store.draftCancel,200)}function d($){var k;$.stopImmediatePropagation(),$.stopPropagation(),$.key=="Enter"&&!$.shiftKey&&($.preventDefault(),s&&((k=$.currentTarget.closest("form"))==null||k.requestSubmit(s)))}var f=Zi();cn(f,$=>o=$,()=>o),f.__mousedown=[Vi];var y=le(f),g=le(y),x=H(H(y,!0)),E=le(x);ut(E,()=>t.store.draft,$=>{var k=Ji(),O=Rt(k);O.__click=[Xi,c];var G=le(O);xe(()=>{var R;return Ut(G,((R=t.store.draft)==null?void 0:R.text.trim())||"")});var C=H(H(O,!0));En(C,73,()=>Ve,jo,(R,q,V)=>{let K=()=>Z(Z(q))[0],ue=()=>Z(Z(q))[1];var Y=Gi();Uo(Y);var ee;xe(()=>{ee!==(ee=K())&&(Y.value=(Y.__value=K())==null?"":K()),fe(Y,"style",`--color: ${ue()??""}`)}),Go(n,[],Y,()=>(K(),t.store.draft.color),Se=>t.store.draft.color=Se),ne(R,Y)});var A=H(H(C,!0));zo(A),Wo(A),A.__keydown=d;var M=H(H(A,!0));ut(M,()=>!t.store.pro,R=>{var q=Ki();ne(R,q)}),xe(()=>{un(O,"compact",L(c)),A.disabled=!t.store.pro}),Xo(A,()=>t.store.draft.note,R=>t.store.draft.note=R),ne($,k)});var S=H(H(E,!0)),w=le(S),T=H(H(w,!0));cn(T,$=>s=$,()=>s);var N=le(T);return xe(()=>{var $,k;Ut(g,`${(($=t.store.draft)!=null&&$._id?"Edit":"New")??""} highlight`),Ut(N,`${((k=t.store.draft)!=null&&k._id?"Update":"Create")??""} `)}),me("close",f,v,!1),ne(e,f),wn(e,"svelte-1me8cmn",`
    .svelte-1me8cmn {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    dialog.svelte-1me8cmn {
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
        color: light-dark(var(--fg-light), var(--fg-dark));
    }

    @media (max-width: 1000px) and (pointer: coarse) {
        dialog.svelte-1me8cmn {
            left: 0;right: 0;bottom: 0;top: 0;
            width: 100%;
            margin: 0;
            max-width: 100%;
            max-height: 100%;
            border-radius: 0;
        }
    }

    @media (pointer: coarse) {
        dialog.svelte-1me8cmn {
            bottom: auto;
        }
    }

    dialog.svelte-1me8cmn, header.svelte-1me8cmn {
        background: var(--bg-light);
        background: light-dark(var(--bg-light), var(--bg-dark));
    }

    [open].svelte-1me8cmn {
        box-shadow: 0 0 0 .5px rgba(60, 60, 60, .9), 0 3px 10px rgba(0,0,0,.05), 0 7px 15px -3px rgba(0,0,0,.15);
    }

    .svelte-1me8cmn::backdrop {
        background-color: rgba(0,0,0,.3);
    }

    header.svelte-1me8cmn {
        margin: 0;
        padding: 1em;
        font-weight: bold;
        position: sticky;
        top: 0;
        
    }

    @supports(animation-timeline: scroll()) {
        header.svelte-1me8cmn {
            animation: svelte-1me8cmn-header-scroll linear both;
            animation-timeline: scroll();
            animation-range: 0 1px;
        }
    }

    @keyframes svelte-1me8cmn-header-scroll {
        to {
            box-shadow: 0 .5px 0 rgba(0,0,0,.2);
        }
    }

    form.svelte-1me8cmn {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 1em;
        padding-top: 0;
    }

    .color.svelte-1me8cmn {
        all: unset;
        display: flex;
        gap: .75em;
    }

    .color.svelte-1me8cmn input[type="radio"]:where(.svelte-1me8cmn) {
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

    .color.svelte-1me8cmn input[type="radio"]:where(.svelte-1me8cmn):checked {
        box-shadow: inset 0 0 0 .5em var(--color);
    }

    .color.svelte-1me8cmn input[type="radio"]:where(.svelte-1me8cmn):active {
        transform: translateY(1px);
    }

    blockquote.svelte-1me8cmn, .note.svelte-1me8cmn, button.svelte-1me8cmn {
        background: var(--control-bg-light);
        background: light-dark(var(--control-bg-light), var(--control-bg-dark));
    }

    blockquote.svelte-1me8cmn {
        white-space: pre-wrap;
        margin: 0;
        min-width: 100%;
        width: 0;
        font-size: 16px;
    }

    blockquote.compact.svelte-1me8cmn {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        overflow: clip;
    }

    blockquote.svelte-1me8cmn, .note.svelte-1me8cmn {
        border-radius: .5em;
        padding: .5em .6em;
    }

    .note.svelte-1me8cmn {
        min-width: min(21em, 70vw);
        min-height: 4lh;
        appearance: none;
        border: 0;
        font: inherit;
        display: block;
        scroll-margin-top: 100vh;
        transition: background .15s ease-in-out, box-shadow .15s ease-in-out;
    }

    .note.svelte-1me8cmn:focus {
        background: transparent;
    }
    
    footer.svelte-1me8cmn {
        all: unset;
        display: flex;
        justify-content: flex-end;
        gap: .75em;
    }

    button.svelte-1me8cmn {
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

    button.svelte-1me8cmn:active {
        transform: translateY(1px);
    }

    button.svelte-1me8cmn sup:where(.svelte-1me8cmn) {
        margin-left: .25em;
        vertical-align: text-top;
        opacity: .5;
    }

    @media (pointer: coarse) {
        button.svelte-1me8cmn sup:where(.svelte-1me8cmn) {
            display: none;
        }
    }

    button[value].svelte-1me8cmn {
        background: blue;
        background: AccentColor;
        color: white;
    }

    .unlock.svelte-1me8cmn {
        font-size: .75em;
        color: GrayText;
    }

    /* animation */
    dialog.svelte-1me8cmn, .svelte-1me8cmn::backdrop {
        transition: 
            display .2s allow-discrete ease-in-out, 
            overlay .2s allow-discrete ease-in-out, 
            opacity .2s ease-in-out,
            transform .2s ease-in-out,
            box-shadow .2s ease-in-out;
        opacity: 0;
    }

    dialog.svelte-1me8cmn {
        transform: translateY(1em);
    }

    [open].svelte-1me8cmn,
    [open].svelte-1me8cmn::backdrop {
        opacity: 1;
        transform: translateY(0);
    }

    @starting-style {
        [open].svelte-1me8cmn,
        [open].svelte-1me8cmn::backdrop {
            opacity: 0;
        }

        [open].svelte-1me8cmn {
            transform: translateY(-1em);
        }
    }

    @supports not selector(::highlight(a)) {
        dialog.svelte-1me8cmn, dialog.svelte-1me8cmn::backdrop {
            animation: svelte-1me8cmn-simple-appear .2s forwards;
        }
        @keyframes svelte-1me8cmn-simple-appear {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    }
`),dt({get store(){return r()},set store($){r($),Fe()}})}br(["mousedown","click","keydown"]);Ft(Ir,{store:{}},[],[],!0);const Qi=(e,t)=>{const n=e.target.getAttribute("data-highlight");n&&(e.preventDefault(),t(n))};var es=he('<div class="svelte-1t9y4ki"></div>'),ts=he('<nav role="presentation" class="svelte-1t9y4ki"></nav>');function Fr(e,t){ft(t,!0);let n=It(t,"store",7);var r=xr(),o=Rt(r);return ut(o,()=>t.store.nav,s=>{var c=ts();c.__click=[Qi,Mr],En(c,77,()=>t.store.highlights,(v,d)=>Z(v)._id,(v,d,f)=>{var y=es();xe(()=>fe(y,"style",`top: var(--highlight-${Z(d)._id??""}-top); --color: ${(Ve.get(Z(d).color)||Z(d).color)??""}`)),xe(()=>fe(y,"data-highlight",Z(d)._id)),ne(v,y)}),ne(s,c)}),ne(e,r),wn(e,"svelte-1t9y4ki",`
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
`),dt({get store(){return n()},set store(s){n(s),Fe()}})}br(["click"]);Ft(Fr,{store:{}},[],[],!0);var ns=he("<!> <!> <!>",1);function rs(e,t){ft(t,!0);let n=It(t,"store",7);rn(()=>{Gt(t.store.highlights)});let r;function o(){Gt(t.store.highlights),clearTimeout(r),r=setTimeout(()=>Gt(t.store.highlights),3e3)}rn(()=>Hi);var s=ns();me("load",St,o,!1),me("popstate",St,o,!1);var c=Rt(s);Rr(c,{get store(){return t.store}});var v=H(H(c,!0));Ir(v,{get store(){return t.store}});var d=H(H(v,!0));return Fr(d,{get store(){return t.store}}),ne(e,s),dt({get store(){return n()},set store(f){n(f),Fe()}})}customElements.define("rdh-ui",Ft(rs,{store:{}},[],[],!0));function os(e){if(typeof chrome=="object"&&chrome.runtime&&chrome.runtime.onMessage||typeof browser=="object"&&browser.runtime&&browser.runtime.onMessage){const{runtime:t}=typeof browser=="object"?browser:chrome,n=(r,o)=>{o.id==t.id&&typeof r.type=="string"&&e(r)};return t.onMessage.removeListener(n),t.onMessage.addListener(n),r=>t.sendMessage(null,r)}if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.rdh)return window.rdhSend=e,t=>window.webkit.messageHandlers.rdh.postMessage(t);if(typeof window<"u"&&typeof window.process=="object"&&window.process.type==="renderer"||typeof process<"u"&&typeof process.versions=="object"&&process.versions.electron||typeof navigator=="object"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Electron")>=0){const{ipcRenderer:t}=require("electron"),n=(r,o)=>e(o);return t.removeListener("RDH",n),t.on("RDH",n),r=>t.sendToHost("RDH",r)}if("ReactNativeWebView"in window)return window.ReactNativeWebViewSendMessage=e,t=>window.ReactNativeWebView.postMessage(JSON.stringify(t));if(window.self!==window.top){const t=({data:n,source:r})=>{r!==window.parent||typeof n!="object"||typeof n.type!="string"||e(n)};return window.removeEventListener("message",t),window.addEventListener("message",t),n=>window.parent.postMessage(n,"*")}throw new Error("unsupported platform")}async function is(e){let t=!1;const n=new Set,r=os(o=>{if(!t){n.add(o);return}e(o)});await new Promise(o=>{function s(){window.removeEventListener("DOMContentLoaded",s),o()}document.readyState=="loading"?(window.removeEventListener("DOMContentLoaded",s),window.addEventListener("DOMContentLoaded",s,{once:!0})):o()}),t=!0;for(const o of n)e(o),n.delete(o);return r}const rt=document.createElement("rdh-ui");(async()=>{const e=await is(n=>{switch(n.type){case"RDH_APPLY":Array.isArray(n.payload)&&(t.highlights=n.payload);break;case"RDH_CONFIG":typeof n.payload.pro=="boolean"&&(t.pro=n.payload.pro),typeof n.payload.nav=="boolean"&&(t.nav=n.payload.nav),typeof n.payload.enabled=="boolean"&&(n.payload.enabled===!0?document.body.contains(rt)||document.body.appendChild(rt):document.body.contains(rt)&&document.body.removeChild(rt));break;case"RDH_SCROLL":typeof n.payload._id=="string"&&Mr(n.payload._id);break;case"RDH_ADD_SELECTION":t.addSelected();break;case"RDH_NOTE_SELECTION":t.draftSelected();break}}),t=qi(n=>e({type:"RDH_ADD",payload:n}),n=>e({type:"RDH_UPDATE",payload:n}),({_id:n})=>e({type:"RDH_REMOVE",payload:{_id:n}}));rt.store=t,e({type:"RDH_READY",payload:{url:location.href}})})();
