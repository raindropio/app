"use strict";var Vr=Object.defineProperty;var Xr=(t,e,n)=>e in t?Vr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ct=(t,e,n)=>(Xr(t,typeof e!="symbol"?e+"":e,n),n),On=(t,e,n)=>{if(!e.has(t))throw TypeError("Cannot "+n)};var tt=(t,e,n)=>(On(t,e,"read from private field"),n?n.call(t):e.get(t)),Ye=(t,e,n)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,n)},We=(t,e,n,r)=>(On(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n);(function(){var t=window.Document.prototype.createElement,e=window.Document.prototype.createElementNS,n=window.Document.prototype.importNode,r=window.Document.prototype.prepend,o=window.Document.prototype.append,s=window.DocumentFragment.prototype.prepend,c=window.DocumentFragment.prototype.append,v=window.Node.prototype.cloneNode,d=window.Node.prototype.appendChild,f=window.Node.prototype.insertBefore,y=window.Node.prototype.removeChild,g=window.Node.prototype.replaceChild,k=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),b=window.Element.prototype.attachShadow,E=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),S=window.Element.prototype.getAttribute,N=window.Element.prototype.setAttribute,L=window.Element.prototype.removeAttribute,$=window.Element.prototype.toggleAttribute,x=window.Element.prototype.getAttributeNS,D=window.Element.prototype.setAttributeNS,G=window.Element.prototype.removeAttributeNS,C=window.Element.prototype.insertAdjacentElement,T=window.Element.prototype.insertAdjacentHTML,M=window.Element.prototype.prepend,R=window.Element.prototype.append,z=window.Element.prototype.before,V=window.Element.prototype.after,K=window.Element.prototype.replaceWith,ut=window.Element.prototype.remove,B=window.HTMLElement,ot=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),St=window.HTMLElement.prototype.insertAdjacentElement,Qt=window.HTMLElement.prototype.insertAdjacentHTML,te=new Set;"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(i){return te.add(i)});function En(i){var l=te.has(i);return i=/^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(i),!l&&i}var zr=document.contains?document.contains.bind(document):document.documentElement.contains.bind(document.documentElement);function P(i){var l=i.isConnected;if(l!==void 0)return l;if(zr(i))return!0;for(;i&&!(i.__CE_isImportDocument||i instanceof Document);)i=i.parentNode||(window.ShadowRoot&&i instanceof ShadowRoot?i.host:void 0);return!(!i||!(i.__CE_isImportDocument||i instanceof Document))}function ze(i){var l=i.children;if(l)return Array.prototype.slice.call(l);for(l=[],i=i.firstChild;i;i=i.nextSibling)i.nodeType===Node.ELEMENT_NODE&&l.push(i);return l}function Pe(i,l){for(;l&&l!==i&&!l.nextSibling;)l=l.parentNode;return l&&l!==i?l.nextSibling:null}function je(i,l,u){for(var p=i;p;){if(p.nodeType===Node.ELEMENT_NODE){var a=p;l(a);var h=a.localName;if(h==="link"&&a.getAttribute("rel")==="import"){if(p=a.import,u===void 0&&(u=new Set),p instanceof Node&&!u.has(p))for(u.add(p),p=p.firstChild;p;p=p.nextSibling)je(p,l,u);p=Pe(i,a);continue}else if(h==="template"){p=Pe(i,a);continue}if(a=a.__CE_shadowRoot)for(a=a.firstChild;a;a=a.nextSibling)je(a,l,u)}p=p.firstChild?p.firstChild:Pe(i,p)}}function ve(){var i=!(vt==null||!vt.noDocumentConstructionObserver),l=!(vt==null||!vt.shadyDomFastWalk);this.m=[],this.g=[],this.j=!1,this.shadyDomFastWalk=l,this.I=!i}function ee(i,l,u,p){var a=window.ShadyDOM;if(i.shadyDomFastWalk&&a&&a.inUse){if(l.nodeType===Node.ELEMENT_NODE&&u(l),l.querySelectorAll)for(i=a.nativeMethods.querySelectorAll.call(l,"*"),l=0;l<i.length;l++)u(i[l])}else je(l,u,p)}function Pr(i,l){i.j=!0,i.m.push(l)}function jr(i,l){i.j=!0,i.g.push(l)}function qe(i,l){i.j&&ee(i,l,function(u){return Ht(i,u)})}function Ht(i,l){if(i.j&&!l.__CE_patched){l.__CE_patched=!0;for(var u=0;u<i.m.length;u++)i.m[u](l);for(u=0;u<i.g.length;u++)i.g[u](l)}}function pt(i,l){var u=[];for(ee(i,l,function(a){return u.push(a)}),l=0;l<u.length;l++){var p=u[l];p.__CE_state===1?i.connectedCallback(p):me(i,p)}}function rt(i,l){var u=[];for(ee(i,l,function(a){return u.push(a)}),l=0;l<u.length;l++){var p=u[l];p.__CE_state===1&&i.disconnectedCallback(p)}}function yt(i,l,u){u=u===void 0?{}:u;var p=u.J,a=u.upgrade||function(m){return me(i,m)},h=[];for(ee(i,l,function(m){if(i.j&&Ht(i,m),m.localName==="link"&&m.getAttribute("rel")==="import"){var _=m.import;_ instanceof Node&&(_.__CE_isImportDocument=!0,_.__CE_registry=document.__CE_registry),_&&_.readyState==="complete"?_.__CE_documentLoadHandled=!0:m.addEventListener("load",function(){var w=m.import;if(!w.__CE_documentLoadHandled){w.__CE_documentLoadHandled=!0;var A=new Set;p&&(p.forEach(function(F){return A.add(F)}),A.delete(w)),yt(i,w,{J:A,upgrade:a})}})}else h.push(m)},p),l=0;l<h.length;l++)a(h[l])}function me(i,l){try{var u=l.ownerDocument,p=u.__CE_registry,a=p&&(u.defaultView||u.__CE_isImportDocument)?ge(p,l.localName):void 0;if(a&&l.__CE_state===void 0){a.constructionStack.push(l);try{try{if(new a.constructorFunction!==l)throw Error("The custom element constructor did not produce the element being upgraded.")}finally{a.constructionStack.pop()}}catch(w){throw l.__CE_state=2,w}if(l.__CE_state=1,l.__CE_definition=a,a.attributeChangedCallback&&l.hasAttributes()){var h=a.observedAttributes;for(a=0;a<h.length;a++){var m=h[a],_=l.getAttribute(m);_!==null&&i.attributeChangedCallback(l,m,null,_,null)}}P(l)&&i.connectedCallback(l)}}catch(w){zt(w)}}ve.prototype.connectedCallback=function(i){var l=i.__CE_definition;if(l.connectedCallback)try{l.connectedCallback.call(i)}catch(u){zt(u)}},ve.prototype.disconnectedCallback=function(i){var l=i.__CE_definition;if(l.disconnectedCallback)try{l.disconnectedCallback.call(i)}catch(u){zt(u)}},ve.prototype.attributeChangedCallback=function(i,l,u,p,a){var h=i.__CE_definition;if(h.attributeChangedCallback&&-1<h.observedAttributes.indexOf(l))try{h.attributeChangedCallback.call(i,l,u,p,a)}catch(m){zt(m)}};function Cn(i,l,u,p){var a=l.__CE_registry;if(a&&(p===null||p==="http://www.w3.org/1999/xhtml")&&(a=ge(a,u)))try{var h=new a.constructorFunction;if(h.__CE_state===void 0||h.__CE_definition===void 0)throw Error("Failed to construct '"+u+"': The returned value was not constructed with the HTMLElement constructor.");if(h.namespaceURI!=="http://www.w3.org/1999/xhtml")throw Error("Failed to construct '"+u+"': The constructed element's namespace must be the HTML namespace.");if(h.hasAttributes())throw Error("Failed to construct '"+u+"': The constructed element must not have any attributes.");if(h.firstChild!==null)throw Error("Failed to construct '"+u+"': The constructed element must not have any children.");if(h.parentNode!==null)throw Error("Failed to construct '"+u+"': The constructed element must not have a parent node.");if(h.ownerDocument!==l)throw Error("Failed to construct '"+u+"': The constructed element's owner document is incorrect.");if(h.localName!==u)throw Error("Failed to construct '"+u+"': The constructed element's local name is incorrect.");return h}catch(m){return zt(m),l=p===null?t.call(l,u):e.call(l,p,u),Object.setPrototypeOf(l,HTMLUnknownElement.prototype),l.__CE_state=2,l.__CE_definition=void 0,Ht(i,l),l}return l=p===null?t.call(l,u):e.call(l,p,u),Ht(i,l),l}function zt(i){var l="",u="",p=0,a=0;i instanceof Error?(l=i.message,u=i.sourceURL||i.fileName||"",p=i.line||i.lineNumber||0,a=i.column||i.columnNumber||0):l="Uncaught "+String(i);var h=void 0;ErrorEvent.prototype.initErrorEvent===void 0?h=new ErrorEvent("error",{cancelable:!0,message:l,filename:u,lineno:p,colno:a,error:i}):(h=document.createEvent("ErrorEvent"),h.initErrorEvent("error",!1,!0,l,u,p),h.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0}})}),h.error===void 0&&Object.defineProperty(h,"error",{configurable:!0,enumerable:!0,get:function(){return i}}),window.dispatchEvent(h),h.defaultPrevented||console.error(i)}function kn(){var i=this;this.g=void 0,this.F=new Promise(function(l){i.l=l})}kn.prototype.resolve=function(i){if(this.g)throw Error("Already resolved.");this.g=i,this.l(i)};function xn(i){var l=document;this.l=void 0,this.h=i,this.g=l,yt(this.h,this.g),this.g.readyState==="loading"&&(this.l=new MutationObserver(this.G.bind(this)),this.l.observe(this.g,{childList:!0,subtree:!0}))}function Tn(i){i.l&&i.l.disconnect()}xn.prototype.G=function(i){var l=this.g.readyState;for(l!=="interactive"&&l!=="complete"||Tn(this),l=0;l<i.length;l++)for(var u=i[l].addedNodes,p=0;p<u.length;p++)yt(this.h,u[p])};function q(i){this.s=new Map,this.u=new Map,this.C=new Map,this.A=!1,this.B=new Map,this.o=function(l){return l()},this.i=!1,this.v=[],this.h=i,this.D=i.I?new xn(i):void 0}q.prototype.H=function(i,l){var u=this;if(!(l instanceof Function))throw new TypeError("Custom element constructor getters must be functions.");$n(this,i),this.s.set(i,l),this.v.push(i),this.i||(this.i=!0,this.o(function(){return Nn(u)}))},q.prototype.define=function(i,l){var u=this;if(!(l instanceof Function))throw new TypeError("Custom element constructors must be functions.");$n(this,i),Sn(this,i,l),this.v.push(i),this.i||(this.i=!0,this.o(function(){return Nn(u)}))};function $n(i,l){if(!En(l))throw new SyntaxError("The element name '"+l+"' is not valid.");if(ge(i,l))throw Error("A custom element with name '"+(l+"' has already been defined."));if(i.A)throw Error("A custom element is already being defined.")}function Sn(i,l,u){i.A=!0;var p;try{var a=u.prototype;if(!(a instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var h=function(F){var Pt=a[F];if(Pt!==void 0&&!(Pt instanceof Function))throw Error("The '"+F+"' callback must be a function.");return Pt},m=h("connectedCallback"),_=h("disconnectedCallback"),w=h("adoptedCallback"),A=(p=h("attributeChangedCallback"))&&u.observedAttributes||[]}catch(F){throw F}finally{i.A=!1}return u={localName:l,constructorFunction:u,connectedCallback:m,disconnectedCallback:_,adoptedCallback:w,attributeChangedCallback:p,observedAttributes:A,constructionStack:[]},i.u.set(l,u),i.C.set(u.constructorFunction,u),u}q.prototype.upgrade=function(i){yt(this.h,i)};function Nn(i){if(i.i!==!1){i.i=!1;for(var l=[],u=i.v,p=new Map,a=0;a<u.length;a++)p.set(u[a],[]);for(yt(i.h,document,{upgrade:function(w){if(w.__CE_state===void 0){var A=w.localName,F=p.get(A);F?F.push(w):i.u.has(A)&&l.push(w)}}}),a=0;a<l.length;a++)me(i.h,l[a]);for(a=0;a<u.length;a++){for(var h=u[a],m=p.get(h),_=0;_<m.length;_++)me(i.h,m[_]);(h=i.B.get(h))&&h.resolve(void 0)}u.length=0}}q.prototype.get=function(i){if(i=ge(this,i))return i.constructorFunction},q.prototype.whenDefined=function(i){if(!En(i))return Promise.reject(new SyntaxError("'"+i+"' is not a valid custom element name."));var l=this.B.get(i);if(l)return l.F;l=new kn,this.B.set(i,l);var u=this.u.has(i)||this.s.has(i);return i=this.v.indexOf(i)===-1,u&&i&&l.resolve(void 0),l.F},q.prototype.polyfillWrapFlushCallback=function(i){this.D&&Tn(this.D);var l=this.o;this.o=function(u){return i(function(){return l(u)})}};function ge(i,l){var u=i.u.get(l);if(u)return u;if(u=i.s.get(l)){i.s.delete(l);try{return Sn(i,l,u())}catch(p){zt(p)}}}q.prototype.define=q.prototype.define,q.prototype.upgrade=q.prototype.upgrade,q.prototype.get=q.prototype.get,q.prototype.whenDefined=q.prototype.whenDefined,q.prototype.polyfillDefineLazy=q.prototype.H,q.prototype.polyfillWrapFlushCallback=q.prototype.polyfillWrapFlushCallback;function Be(i,l,u){function p(a){return function(h){for(var m=[],_=0;_<arguments.length;++_)m[_]=arguments[_];_=[];for(var w=[],A=0;A<m.length;A++){var F=m[A];if(F instanceof Element&&P(F)&&w.push(F),F instanceof DocumentFragment)for(F=F.firstChild;F;F=F.nextSibling)_.push(F);else _.push(F)}for(a.apply(this,m),m=0;m<w.length;m++)rt(i,w[m]);if(P(this))for(m=0;m<_.length;m++)w=_[m],w instanceof Element&&pt(i,w)}}u.prepend!==void 0&&(l.prepend=p(u.prepend)),u.append!==void 0&&(l.append=p(u.append))}function qr(i){Document.prototype.createElement=function(l){return Cn(i,this,l,null)},Document.prototype.importNode=function(l,u){return l=n.call(this,l,!!u),this.__CE_registry?yt(i,l):qe(i,l),l},Document.prototype.createElementNS=function(l,u){return Cn(i,this,u,l)},Be(i,Document.prototype,{prepend:r,append:o})}function Br(i){function l(p){return function(a){for(var h=[],m=0;m<arguments.length;++m)h[m]=arguments[m];m=[];for(var _=[],w=0;w<h.length;w++){var A=h[w];if(A instanceof Element&&P(A)&&_.push(A),A instanceof DocumentFragment)for(A=A.firstChild;A;A=A.nextSibling)m.push(A);else m.push(A)}for(p.apply(this,h),h=0;h<_.length;h++)rt(i,_[h]);if(P(this))for(h=0;h<m.length;h++)_=m[h],_ instanceof Element&&pt(i,_)}}var u=Element.prototype;z!==void 0&&(u.before=l(z)),V!==void 0&&(u.after=l(V)),K!==void 0&&(u.replaceWith=function(p){for(var a=[],h=0;h<arguments.length;++h)a[h]=arguments[h];h=[];for(var m=[],_=0;_<a.length;_++){var w=a[_];if(w instanceof Element&&P(w)&&m.push(w),w instanceof DocumentFragment)for(w=w.firstChild;w;w=w.nextSibling)h.push(w);else h.push(w)}for(_=P(this),K.apply(this,a),a=0;a<m.length;a++)rt(i,m[a]);if(_)for(rt(i,this),a=0;a<h.length;a++)m=h[a],m instanceof Element&&pt(i,m)}),ut!==void 0&&(u.remove=function(){var p=P(this);ut.call(this),p&&rt(i,this)})}function Yr(i){function l(a,h){Object.defineProperty(a,"innerHTML",{enumerable:h.enumerable,configurable:!0,get:h.get,set:function(m){var _=this,w=void 0;if(P(this)&&(w=[],ee(i,this,function(Pt){Pt!==_&&w.push(Pt)})),h.set.call(this,m),w)for(var A=0;A<w.length;A++){var F=w[A];F.__CE_state===1&&i.disconnectedCallback(F)}return this.ownerDocument.__CE_registry?yt(i,this):qe(i,this),m}})}function u(a,h){a.insertAdjacentElement=function(m,_){var w=P(_);return m=h.call(this,m,_),w&&rt(i,_),P(m)&&pt(i,_),m}}function p(a,h){function m(_,w){for(var A=[];_!==w;_=_.nextSibling)A.push(_);for(w=0;w<A.length;w++)yt(i,A[w])}a.insertAdjacentHTML=function(_,w){if(_=_.toLowerCase(),_==="beforebegin"){var A=this.previousSibling;h.call(this,_,w),m(A||this.parentNode.firstChild,this)}else if(_==="afterbegin")A=this.firstChild,h.call(this,_,w),m(this.firstChild,A);else if(_==="beforeend")A=this.lastChild,h.call(this,_,w),m(A||this.firstChild,null);else if(_==="afterend")A=this.nextSibling,h.call(this,_,w),m(this.nextSibling,A);else throw new SyntaxError("The value provided ("+String(_)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.")}}b&&(Element.prototype.attachShadow=function(a){if(a=b.call(this,a),i.j&&!a.__CE_patched){a.__CE_patched=!0;for(var h=0;h<i.m.length;h++)i.m[h](a)}return this.__CE_shadowRoot=a}),E&&E.get?l(Element.prototype,E):ot&&ot.get?l(HTMLElement.prototype,ot):jr(i,function(a){l(a,{enumerable:!0,configurable:!0,get:function(){return v.call(this,!0).innerHTML},set:function(h){var m=this.localName==="template",_=m?this.content:this,w=e.call(document,this.namespaceURI,this.localName);for(w.innerHTML=h;0<_.childNodes.length;)y.call(_,_.childNodes[0]);for(h=m?w.content:w;0<h.childNodes.length;)d.call(_,h.childNodes[0])}})}),Element.prototype.setAttribute=function(a,h){if(this.__CE_state!==1)return N.call(this,a,h);var m=S.call(this,a);N.call(this,a,h),h=S.call(this,a),i.attributeChangedCallback(this,a,m,h,null)},Element.prototype.setAttributeNS=function(a,h,m){if(this.__CE_state!==1)return D.call(this,a,h,m);var _=x.call(this,a,h);D.call(this,a,h,m),m=x.call(this,a,h),i.attributeChangedCallback(this,h,_,m,a)},Element.prototype.removeAttribute=function(a){if(this.__CE_state!==1)return L.call(this,a);var h=S.call(this,a);L.call(this,a),h!==null&&i.attributeChangedCallback(this,a,h,null,null)},$&&(Element.prototype.toggleAttribute=function(a,h){if(this.__CE_state!==1)return $.call(this,a,h);var m=S.call(this,a),_=m!==null;return h=$.call(this,a,h),_!==h&&i.attributeChangedCallback(this,a,m,h?"":null,null),h}),Element.prototype.removeAttributeNS=function(a,h){if(this.__CE_state!==1)return G.call(this,a,h);var m=x.call(this,a,h);G.call(this,a,h);var _=x.call(this,a,h);m!==_&&i.attributeChangedCallback(this,h,m,_,a)},St?u(HTMLElement.prototype,St):C&&u(Element.prototype,C),Qt?p(HTMLElement.prototype,Qt):T&&p(Element.prototype,T),Be(i,Element.prototype,{prepend:M,append:R}),Br(i)}var An={};function Wr(i){function l(){var u=this.constructor,p=document.__CE_registry.C.get(u);if(!p)throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var a=p.constructionStack;if(a.length===0)return a=t.call(document,p.localName),Object.setPrototypeOf(a,u.prototype),a.__CE_state=1,a.__CE_definition=p,Ht(i,a),a;var h=a.length-1,m=a[h];if(m===An)throw Error("Failed to construct '"+p.localName+"': This element was already constructed.");return a[h]=An,Object.setPrototypeOf(m,u.prototype),Ht(i,m),m}l.prototype=B.prototype,Object.defineProperty(HTMLElement.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:l}),window.HTMLElement=l}function Ur(i){function l(u,p){Object.defineProperty(u,"textContent",{enumerable:p.enumerable,configurable:!0,get:p.get,set:function(a){if(this.nodeType===Node.TEXT_NODE)p.set.call(this,a);else{var h=void 0;if(this.firstChild){var m=this.childNodes,_=m.length;if(0<_&&P(this)){h=Array(_);for(var w=0;w<_;w++)h[w]=m[w]}}if(p.set.call(this,a),h)for(a=0;a<h.length;a++)rt(i,h[a])}}})}Node.prototype.insertBefore=function(u,p){if(u instanceof DocumentFragment){var a=ze(u);if(u=f.call(this,u,p),P(this))for(p=0;p<a.length;p++)pt(i,a[p]);return u}return a=u instanceof Element&&P(u),p=f.call(this,u,p),a&&rt(i,u),P(this)&&pt(i,u),p},Node.prototype.appendChild=function(u){if(u instanceof DocumentFragment){var p=ze(u);if(u=d.call(this,u),P(this))for(var a=0;a<p.length;a++)pt(i,p[a]);return u}return p=u instanceof Element&&P(u),a=d.call(this,u),p&&rt(i,u),P(this)&&pt(i,u),a},Node.prototype.cloneNode=function(u){return u=v.call(this,!!u),this.ownerDocument.__CE_registry?yt(i,u):qe(i,u),u},Node.prototype.removeChild=function(u){var p=u instanceof Element&&P(u),a=y.call(this,u);return p&&rt(i,u),a},Node.prototype.replaceChild=function(u,p){if(u instanceof DocumentFragment){var a=ze(u);if(u=g.call(this,u,p),P(this))for(rt(i,p),p=0;p<a.length;p++)pt(i,a[p]);return u}a=u instanceof Element&&P(u);var h=g.call(this,u,p),m=P(this);return m&&rt(i,p),a&&rt(i,u),m&&pt(i,u),h},k&&k.get?l(Node.prototype,k):Pr(i,function(u){l(u,{enumerable:!0,configurable:!0,get:function(){for(var p=[],a=this.firstChild;a;a=a.nextSibling)a.nodeType!==Node.COMMENT_NODE&&p.push(a.textContent);return p.join("")},set:function(p){for(;this.firstChild;)y.call(this,this.firstChild);p!=null&&p!==""&&d.call(this,document.createTextNode(p))}})})}var vt=window.customElements;function Dn(){var i=new ve;Wr(i),qr(i),Be(i,DocumentFragment.prototype,{prepend:s,append:c}),Ur(i),Yr(i),window.CustomElementRegistry=q,i=new q(i),document.__CE_registry=i,Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:i})}vt&&!vt.forcePolyfill&&typeof vt.define=="function"&&typeof vt.get=="function"||Dn(),window.__CE_installPolyfill=Dn}).call(self);const ie=1,cn=2,Gr=4,Gn=8,Kr=16,Ke=64,Jr=2,Zr=1,Qr=2,ye="[",Kn="]",to="",Jn=`${Kn}!`,Je={},jt=Symbol(),Ln=["touchstart","touchmove","touchend"];function eo(t){console.warn("hydration_mismatch")}let Q=!1;function Ct(t){Q=t}let It=null,Ot;function no(t){It=t,Ot=t&&t[0]}function Wt(t){if(t.nodeType!==8)return t;var e=t;if(e.data!==ye)return t;for(var n=[],r=0;(e=e.nextSibling)!==null;){if(e.nodeType===8){var o=e.data;if(o===ye)r+=1;else if(o[0]===Kn){if(r===0)return It=n,Ot=n[0],e;r-=1}}n.push(e)}throw eo(),Je}var Ut=Array.isArray,ro=Array.from,we=Object.keys,Zn=Object.isFrozen,se=Object.defineProperty,Ze=Object.getOwnPropertyDescriptor,oo=Object.prototype,io=Array.prototype,so=Object.getPrototypeOf;const Lt=2,Qn=4,Xt=8,tr=16,_t=32,fn=64,$t=128,Ee=256,dt=512,bt=1024,Mt=2048,Rt=4096,Gt=8192,lo=16384,dn=32768,X=Symbol("$state"),ao=Symbol("$state.frozen"),uo=Symbol("");function er(t){return t===this.v}function co(t,e){return t!=t?e==e:t!==e||t!==null&&typeof t=="object"||typeof t=="function"}function fo(t){return!co(t,this.v)}function ho(t){throw new Error("effect_in_teardown")}function po(){throw new Error("effect_in_unowned_derived")}function vo(t){throw new Error("effect_orphan")}function mo(){throw new Error("effect_update_depth_exceeded")}function go(){throw new Error("hydration_failed")}function _o(t){throw new Error("props_invalid_value")}function bo(){throw new Error("state_unsafe_mutation")}function nt(t){return{f:0,reactions:null,equals:er,v:t,version:0}}function Ce(t){var n;const e=nt(t);return e.equals=fo,U!==null&&U.l!==null&&((n=U.l).s??(n.s=[])).push(e),e}function j(t,e){var n=t.v!==jt;return!gt&&n&&J!==null&&en()&&J.f&Lt&&bo(),t.equals(e)||(t.v=e,t.version++,en()&&n&&I!==null&&I.f&dt&&!(I.f&_t)&&(W!==null&&W.includes(t)?(at(I,bt),Me(I)):Tt===null?So([t]):Tt.push(t)),vn(t,bt,!0)),e}function st(t,e=!0,n=null,r){if(typeof t=="object"&&t!=null&&!Zn(t)&&!(ao in t)){if(X in t){const s=t[X];if(s.t===t||s.p===t)return s.p}const o=so(t);if(o===oo||o===io){const s=new Proxy(t,yo);return se(t,X,{value:{s:new Map,v:nt(0),a:Ut(t),i:e,p:s,t},writable:!0,enumerable:!1}),s}}return t}function Mn(t,e=1){j(t,t.v+e)}const yo={defineProperty(t,e,n){if(n.value){const r=t[X],o=r.s.get(e);o!==void 0&&j(o,st(n.value,r.i,r))}return Reflect.defineProperty(t,e,n)},deleteProperty(t,e){const n=t[X],r=n.s.get(e),o=n.a,s=delete t[e];if(o&&s){const c=n.s.get("length"),v=t.length-1;c!==void 0&&c.v!==v&&j(c,v)}return r!==void 0&&j(r,jt),s&&Mn(n.v),s},get(t,e,n){var s;if(e===X)return Reflect.get(t,X);const r=t[X];let o=r.s.get(e);if(o===void 0&&(!(e in t)||(s=Ze(t,e))!=null&&s.writable)&&(o=(r.i?nt:Ce)(st(t[e],r.i,r)),r.s.set(e,o)),o!==void 0){const c=O(o);return c===jt?void 0:c}return Reflect.get(t,e,n)},getOwnPropertyDescriptor(t,e){const n=Reflect.getOwnPropertyDescriptor(t,e);if(n&&"value"in n){const o=t[X].s.get(e);o&&(n.value=O(o))}return n},has(t,e){var s;if(e===X)return!0;const n=t[X],r=Reflect.has(t,e);let o=n.s.get(e);return(o!==void 0||I!==null&&(!r||(s=Ze(t,e))!=null&&s.writable))&&(o===void 0&&(o=(n.i?nt:Ce)(r?st(t[e],n.i,n):jt),n.s.set(e,o)),O(o)===jt)?!1:r},set(t,e,n,r){const o=t[X];let s=o.s.get(e);s===void 0&&(mn(()=>r[e]),s=o.s.get(e)),s!==void 0&&j(s,st(n,o.i,o));const c=o.a,v=!(e in t);if(c&&e==="length")for(let d=n;d<t.length;d+=1){const f=o.s.get(d+"");f!==void 0&&j(f,jt)}if(t[e]=n,v){if(c){const d=o.s.get("length"),f=t.length;d!==void 0&&d.v!==f&&j(d,f)}Mn(o.v)}return!0},ownKeys(t){const e=t[X];return O(e.v),Reflect.ownKeys(t)}};function ke(t){if(t!==null&&typeof t=="object"&&X in t){var e=t[X];if(e)return e.p}return t}function wo(t,e){return Object.is(ke(t),ke(e))}function nr(t){for(var e=0;e<t.length;e++)t[e]()}const Eo=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let xe=!1,Te=!1,Qe=[],tn=[];function rr(){xe=!1;const t=Qe.slice();Qe=[],nr(t)}function or(){Te=!1;const t=tn.slice();tn=[],nr(t)}function ir(t){xe||(xe=!0,queueMicrotask(rr)),Qe.push(t)}function Co(t){Te||(Te=!0,Eo(or)),tn.push(t)}function ko(){xe&&rr(),Te&&or()}function xo(t){let e=Lt|bt;I===null&&(e|=$t);const n={deps:null,deriveds:null,equals:er,f:e,first:null,fn:t,last:null,reactions:null,v:null,version:0};if(J!==null&&J.f&Lt){var r=J;r.deriveds===null?r.deriveds=[n]:r.deriveds.push(n)}return n}function sr(t){pn(t);var e=t.deriveds;if(e!==null){t.deriveds=null;for(var n=0;n<e.length;n+=1)To(e[n])}}function lr(t,e){sr(t);var n=ur(t),r=(qt||t.f&$t)&&t.deps!==null?Mt:dt;at(t,r);var o=t.equals(n);return o||(t.v=n,vn(t,bt,e)),o}function To(t){sr(t),Oe(t,0),at(t,Gt),t.first=t.last=t.deps=t.reactions=t.fn=null}const ar=0,$o=1;let _e=ar,le=!1,Bt=!1,hn=!1;function Rn(t){Bt=t}function In(t){hn=t}function Fn(t){gt=t}let At=[],Yt=0,J=null,I=null,W=null,Y=0,Tt=null;function So(t){Tt=t}let gt=!1,qt=!1,U=null;function en(){return U!==null&&U.l===null}function ce(t){var k;var e=t.f,n=(e&bt)!==0,r=(e&$t)!==0;if(n&&!r)return!0;var o=(e&Ee)!==0;if(e&Mt||n&&r){var s=t.deps;if(s!==null)for(var c=s.length,v,d,f=0;f<c;f++){var y=s[f];!n&&ce(y)&&(v=lr(y,!0));var g=y.version;if(r){if(g>t.version)return t.version=g,!v;!qt&&!((k=y==null?void 0:y.reactions)!=null&&k.includes(t))&&(d=y.reactions,d===null?y.reactions=[t]:d.push(t))}else{if(t.f&bt)return!0;o&&(g>t.version&&(t.version=g,n=!0),d=y.reactions,d===null?y.reactions=[t]:d.includes(t)||d.push(t))}}r||at(t,dt),o&&(t.f^=Ee)}return n}function No(t,e,n){throw t}function ur(t){const e=W,n=Y,r=Tt,o=J,s=qt,c=gt;W=null,Y=0,Tt=null,J=t,qt=!Bt&&(t.f&$t)!==0,gt=!1;try{let v=(0,t.fn)(),d=t.deps;if(W!==null){let f;if(d!==null){const y=d.length,g=Y===0?W:d.slice(0,Y).concat(W),b=g.length>16&&y-Y>1?new Set(g):null;for(f=Y;f<y;f++){const E=d[f];(b!==null?!b.has(E):!g.includes(E))&&cr(t,E)}}if(d!==null&&Y>0)for(d.length=Y+W.length,f=0;f<W.length;f++)d[Y+f]=W[f];else t.deps=d=W;if(!qt)for(f=Y;f<d.length;f++){const y=d[f],g=y.reactions;g===null?y.reactions=[t]:g[g.length-1]!==t&&g.push(t)}}else d!==null&&Y<d.length&&(Oe(t,Y),d.length=Y);return v}finally{W=e,Y=n,Tt=r,J=o,qt=s,gt=c}}function cr(t,e){const n=e.reactions;let r=0;if(n!==null){r=n.length-1;const o=n.indexOf(t);o!==-1&&(r===0?e.reactions=null:(n[o]=n[r],n.pop()))}r===0&&e.f&Lt&&(at(e,Mt),e.f&($t|Ee)||(e.f^=Ee),Oe(e,0))}function Oe(t,e){const n=t.deps;if(n!==null){const r=e===0?null:n.slice(0,e);let o;for(o=e;o<n.length;o++){const s=n[o];(r===null||!r.includes(s))&&cr(t,s)}}}function pn(t,e=!0){let n=t.first;t.first=null,t.last=null;for(var r;n!==null;)r=n.next,pe(n,e),n=r}function Le(t){var e=t.f;if(!(e&Gt)){at(t,dt);var n=t.ctx,r=I,o=U;I=t,U=n;try{e&tr||pn(t),mr(t);var s=ur(t);t.teardown=typeof s=="function"?s:null}catch(c){No(c)}finally{I=r,U=o}}}function fr(){Yt>1e3&&(Yt=0,mo()),Yt++}function dr(t){const e=t.length;if(e!==0){fr();var n=Bt;Bt=!0;try{for(var r=0;r<e;r++){var o=t[r];if(o.first===null&&!(o.f&_t))Hn([o]);else{var s=[];hr(o,s),Hn(s)}}}finally{Bt=n}}}function Hn(t){var e=t.length;if(e!==0)for(var n=0;n<e;n++){var r=t[n];!(r.f&(Gt|Rt))&&ce(r)&&Le(r)}}function Ao(){if(le=!1,Yt>1001)return;const t=At;At=[],dr(t),le||(Yt=0)}function Me(t){_e===ar&&(le||(le=!0,queueMicrotask(Ao)));for(var e=t;e.parent!==null;){e=e.parent;var n=e.f;if(n&_t){if(!(n&dt))return;at(e,Mt)}}At.push(e)}function hr(t,e){var n=t.first,r=[];t:for(;n!==null;){var o=n.f,s=(o&(Gt|Rt))===0,c=o&_t,v=(o&dt)!==0,d=n.first;if(s&&(!c||!v)){if(c&&at(n,dt),o&Xt){if(!c&&ce(n)&&(Le(n),d=n.first),d!==null){n=d;continue}}else if(o&Qn)if(c||v){if(d!==null){n=d;continue}}else r.push(n)}var f=n.next;if(f===null){let k=n.parent;for(;k!==null;){if(t===k)break t;var y=k.next;if(y!==null){n=y;continue t}k=k.parent}}n=f}for(var g=0;g<r.length;g++)d=r[g],e.push(d),hr(d,e)}function Ft(t,e=!0){var n=_e,r=At;try{fr();const s=[];_e=$o,At=s,le=!1,e&&dr(r);var o=t==null?void 0:t();return ko(),(At.length>0||s.length>0)&&Ft(),Yt=0,o}finally{_e=n,At=r}}function O(t){const e=t.f;if(e&Gt)return t.v;if(J!==null&&!(J.f&(_t|fn))&&!gt){const n=(J.f&$t)!==0,r=J.deps;W===null&&r!==null&&r[Y]===t&&!(n&&I!==null)?Y++:(r===null||Y===0||r[Y-1]!==t)&&(W===null?W=[t]:W[W.length-1]!==t&&W.push(t)),Tt!==null&&I!==null&&I.f&dt&&!(I.f&_t)&&Tt.includes(t)&&(at(I,bt),Me(I))}return e&Lt&&ce(t)&&lr(t,!1),t.v}function vn(t,e,n){var r=t.reactions;if(r!==null)for(var o=en(),s=r.length,c=0;c<s;c++){var v=r[c],d=v.f;if(!(d&bt||(!n||!o)&&v===I)){at(v,e);var f=(d&Mt)!==0,y=(d&$t)!==0;(d&dt||f&&y)&&(v.f&Lt?vn(v,Mt,n):Me(v))}}}function mn(t){const e=gt;try{return gt=!0,t()}finally{gt=e}}const Do=~(bt|Mt|dt);function at(t,e){t.f=t.f&Do|e}function Oo(t){return typeof t=="object"&&t!==null&&typeof t.f=="number"}function fe(t,e=!1,n){U={p:U,c:null,e:null,m:!1,s:t,x:null,l:null},e||(U.l={s:null,u:null,r1:[],r2:nt(!1)})}function de(t){const e=U;if(e!==null){t!==void 0&&(e.x=t);const r=e.e;if(r!==null){e.e=null;for(var n=0;n<r.length;n++)Jt(r[n])}U=e.p,e.m=!0}return t||{}}function Z(t){return Oo(t)?O(t):t}function Lo(t){var e=document.createElement("template");return e.innerHTML=t,e.content}function gn(t){if(Ut(t))for(var e=0;e<t.length;e++){var n=t[e];n.isConnected&&n.remove()}else t.isConnected&&t.remove()}function Mo(t){I===null&&J===null&&vo(),hn&&ho()}function zn(t,e){var n=e.last;n===null?e.last=e.first=t:(n.next=t,t.prev=n,e.last=t)}function Kt(t,e,n){var r=(t&fn)!==0,o={ctx:U,deps:null,dom:null,f:t|bt,first:null,fn:e,last:null,next:null,parent:r?null:I,prev:null,teardown:null,transitions:null};if(J!==null&&!r){var s=J.f;s&Lt&&(s&$t&&po(),I!==null&&zn(o,I)),zn(o,J)}if(n){var c=Bt;try{Rn(!0),Le(o),o.f|=lo}finally{Rn(c)}}else e!==null&&Me(o);return o}function pr(t){const e=Kt(Xt,null,!1);return at(e,dt),e.teardown=t,e}function nn(t){Mo();var e=I!==null&&(I.f&Xt)!==0&&U!==null&&!U.m;if(e){var n=U;(n.e??(n.e=[])).push(t)}else{var r=Jt(t);return r}}function Ro(t){const e=Kt(fn,t,!0);return()=>{pe(e)}}function Jt(t){return Kt(Qn,t,!1)}function he(t){return Kt(Xt,t,!0)}function xt(t){return he(t)}function vr(t,e=0){return Kt(Xt|tr|e,t,!0)}function ae(t){return Kt(Xt|_t,t,!0)}function mr(t){var e=t.teardown;if(e!==null){const n=hn,r=gt;In(!0),Fn(!0);try{e.call(null)}finally{In(n),Fn(r)}}}function pe(t,e=!0){var n=t.dom;if(n!==null&&e&&gn(n),pn(t,e),Oe(t,0),at(t,Gt),t.transitions)for(const c of t.transitions)c.stop();mr(t);var r=t.parent;if(r!==null&&t.f&_t&&r.first!==null){var o=t.prev,s=t.next;o!==null?s!==null?(o.next=s,s.prev=o):(o.next=null,r.last=o):s!==null?(s.prev=null,r.first=s):(r.first=null,r.last=null)}t.next=t.prev=t.teardown=t.ctx=t.dom=t.deps=t.parent=t.fn=null}function rn(t,e){var n=[];_n(t,n,!0),gr(n,()=>{pe(t),e&&e()})}function gr(t,e){var n=t.length;if(n>0){var r=()=>--n||e();for(var o of t)o.out(r)}else e()}function _n(t,e,n){if(!(t.f&Rt)){if(t.f^=Rt,t.transitions!==null)for(const c of t.transitions)(c.is_global||n)&&e.push(c);for(var r=t.first;r!==null;){var o=r.next,s=(r.f&dn)!==0||(r.f&_t)!==0;_n(r,e,s?n:!1),r=o}}}function $e(t){_r(t,!0)}function _r(t,e){if(t.f&Rt){t.f^=Rt,ce(t)&&Le(t);for(var n=t.first;n!==null;){var r=n.next,o=(n.f&dn)!==0||(n.f&_t)!==0;_r(n,o?e:!1),n=r}if(t.transitions!==null)for(const s of t.transitions)(s.is_global||e)&&s.in()}}var Se,Nt;function br(){if(Se===void 0){Se=window,Nt=document;var t=Element.prototype;t.__click=void 0,t.__className="",t.__attributes=null,t.__e=void 0,Text.prototype.__t=void 0}}function Zt(){return document.createTextNode("")}function lt(t){const e=t.firstChild;return Q?e===null?t.appendChild(Zt()):Wt(e):e}function Re(t,e){return Q?Wt(Ot):t.firstChild}function H(t,e=!1){var n=t.nextSibling;if(!Q)return n;var r=n.nodeType;if(r===8&&n.data===to)return H(n,e);if(e&&r!==3){var o=Zt(),s=I.dom;return s.unshift(o),n==null||n.before(o),o}return Wt(n)}function bn(t){t.textContent=""}function Io(t){return document.createElement(t)}function Fo(t,e,n,r){function o(s){if(r.capture||on(e,s),!s.cancelBubble)return n.call(this,s)}return t.startsWith("pointer")||t==="wheel"?ir(()=>{e.addEventListener(t,o,r)}):e.addEventListener(t,o,r),o}function mt(t,e,n,r,o){var s={capture:r,passive:o},c=Fo(t,e,n,s);(e===document.body||e===window||e===document)&&pr(()=>{e.removeEventListener(t,c,s)})}function yr(t){for(var e=0;e<t.length;e++)wr.add(t[e]);for(var n of sn)n(t)}function on(t,e){var N;var n=t.ownerDocument,r=e.type,o=((N=e.composedPath)==null?void 0:N.call(e))||[],s=o[0]||e.target,c=0,v=e.__root;if(v){var d=o.indexOf(v);if(d!==-1&&(t===document||t===window)){e.__root=t;return}var f=o.indexOf(t);if(f===-1)return;d<=f&&(c=d+1)}s=o[c]||e.target,se(e,"currentTarget",{configurable:!0,get(){return s||n}});try{for(var y,g=[];s!==null;){var k=s.parentNode||s.host||null;try{var b=s["__"+r];if(b!==void 0&&!s.disabled)if(Ut(b)){var[E,...S]=b;E.apply(s,[e,...S])}else b.call(s,e)}catch(L){y?g.push(L):y=L}if(e.cancelBubble||k===t||k===null||s===t)break;s=k}if(y){for(let L of g)queueMicrotask(()=>{throw L});throw y}}finally{e.__root=t,s=t}}const wr=new Set,sn=new Set;function Ue(t,e){(t.__t??(t.__t=t.nodeValue))!==e&&(t.nodeValue=t.__t=e)}function Er(t,e){const n=e.anchor??e.target.appendChild(Zt());return Ft(()=>Cr(t,{...e,anchor:n}),!1)}function Ho(t,e){const n=e.target,r=It;try{return Ft(()=>{Ct(!0);for(var o=n.firstChild;o&&(o.nodeType!==8||o.data!==ye);)o=o.nextSibling;if(!o)throw Je;const s=Wt(o),c=Cr(t,{...e,anchor:s});return Ct(!1),c},!1)}catch(o){if(o===Je)return e.recover===!1&&go(),br(),bn(n),Ct(!1),Er(t,e);throw o}finally{Ct(!!r),no(r)}}function Cr(t,{target:e,anchor:n,props:r={},events:o,context:s,intro:c=!1}){br();const v=new Set,d=on.bind(null,e),f=on.bind(null,document),y=b=>{for(let E=0;E<b.length;E++){const S=b[E];v.has(S)||(v.add(S),e.addEventListener(S,d,Ln.includes(S)?{passive:!0}:void 0),document.addEventListener(S,f,Ln.includes(S)?{passive:!0}:void 0))}};y(ro(wr)),sn.add(y);let g;const k=Ro(()=>(ae(()=>{if(s){fe({});var b=U;b.c=s}o&&(r.$$events=o),g=t(n,r)||{},s&&de()}),()=>{for(const b of v)e.removeEventListener(b,d);sn.delete(y),ln.delete(g)}));return ln.set(g,k),g}let ln=new WeakMap;function zo(t){const e=ln.get(t);e==null||e()}async function yn(t,e,n){await Promise.resolve();const r=Po(t);if(!r.getElementById(e)){const o=Io("style");o.id=e,o.textContent=n,(r.head||r).appendChild(o)}}function Po(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function ue(t,e,n,r=null,o=!1){var s=null,c=null,v=null,d=o?dn:0;vr(()=>{if(v===(v=!!e()))return;let f=!1;if(Q){const y=t.data===Jn;v===y&&(gn(It),Ct(!1),f=!0)}v?(s?$e(s):s=ae(()=>n(t)),c&&rn(c,()=>{c=null})):(c?$e(c):r&&(c=ae(()=>r(t))),s&&rn(s,()=>{s=null})),f&&Ct(!0)},d)}let Ve=null;function jo(t,e){return e}function qo(t,e,n){for(var r=[],o=t.length,s=0;s<o;s++)_n(t[s].e,r,!0);var c=o>0&&r.length===0&&e!==null;if(c){var v=e.parentNode;bn(v),v.append(e),n.clear(),kt(t[0].prev,t[o-1].next)}gr(r,()=>{for(var d=0;d<o;d++){var f=t[d];c||(n.delete(f.k),f.o.remove(),kt(f.prev,f.next)),pe(f.e,!c)}})}function wn(t,e,n,r,o,s=null){var c={flags:e,items:new Map,next:null},v=(e&Gn)!==0;if(v){var d=t;t=Q?Wt(d.firstChild):d.appendChild(Zt())}var f=null;vr(()=>{var y=n(),g=Ut(y)?y:y==null?[]:Array.from(y),k=g.length,b=c.flags;b&Ke&&!Zn(g)&&!(X in g)&&(b^=Ke,b&Gr&&!(b&ie)&&(b^=ie));let E=!1;if(Q){var S=t.data===Jn;S!==(k===0)&&(gn(It),Ct(!1),E=!0)}if(Q){for(var N=Ot,L=c,$,x=0;x<k;x++){if(N.nodeType!==8||N.data!==ye){E=!0,Ct(!1);break}var D=N;N=Wt(N);var G=g[x],C=r(G,x);$=kr(D,N,L,null,G,C,x,o,b),c.items.set(C,$),N=N.nextSibling,L=$}if(k>0)for(;N!==t;){var T=N.nextSibling;N.remove(),N=T}}Q||Bo(g,c,t,o,b,r),s!==null&&(k===0?f?$e(f):f=ae(()=>s(t)):f!==null&&rn(f,()=>{f=null})),E&&Ct(!0)})}function Bo(t,e,n,r,o,s){var B,ot,St,Qt;var c=(o&Kr)!==0,v=(o&(ie|cn))!==0,d=t.length,f=e.items,y=e.next,g=y,k=new Set,b=e,E=new Set,S=[],N=[],L,$,x,D;if(c)for(D=0;D<d;D+=1)L=t[D],$=s(L,D),x=f.get($),x!==void 0&&((B=x.a)==null||B.measure(),E.add(x));for(D=0;D<d;D+=1){if(L=t[D],$=s(L,D),x=f.get($),x===void 0){var G=Zt(),C=g?g.o:n;C.before(G),b=kr(G,C,b,b.next,L,$,D,r,o),f.set($,b),S=[],N=[],g=b.next;continue}if(v&&Yo(x,L,D,o),x.e.f&Rt&&($e(x.e),c&&((ot=x.a)==null||ot.unfix(),E.delete(x))),x!==g){if(k.has(x)){if(S.length<N.length){var T=N[0],M;b=T.prev;var R=S[0],z=S[S.length-1];for(M=0;M<S.length;M+=1)Pn(S[M],T,n);for(M=0;M<N.length;M+=1)k.delete(N[M]);kt(R.prev,z.next),kt(b,R),kt(z,T),g=T,b=z,D-=1,S=[],N=[]}else k.delete(x),Pn(x,g,n),kt(x.prev,x.next),kt(x,b.next),kt(b,x),b=x;continue}for(S=[],N=[];g!==null&&g.k!==$;)k.add(g),N.push(g),g=g.next;if(g===null)continue;x=g}S.push(x),b=x,g=x.next}const V=Array.from(k);for(;g!==null;)V.push(g),g=g.next;var K=V.length;if(K>0){var ut=o&Gn&&d===0?n:null;if(c){for(D=0;D<K;D+=1)(St=V[D].a)==null||St.measure();for(D=0;D<K;D+=1)(Qt=V[D].a)==null||Qt.fix()}qo(V,ut,f)}c&&Jt(()=>{mn(()=>{var te;for(x of E)(te=x.a)==null||te.apply()})})}function Yo(t,e,n,r){r&ie&&j(t.v,e),r&cn?j(t.i,n):t.i=n}function kr(t,e,n,r,o,s,c,v,d){var f=Ve;try{var y=(d&ie)!==0,g=(d&Ke)===0,k=y?g?Ce(o):nt(o):o,b=d&cn?nt(c):c,E={i:b,v:k,k:s,a:null,e:null,o:t,prev:n,next:r};return n.next=E,r!==null&&(r.prev=E),Ve=E,E.e=ae(()=>v(e,k,b)),E}finally{Ve=f}}function Pn(t,e,n){for(var r=t.next?t.next.o:n,o=e?e.o:n,s=t.o;s!==r;){var c=s.nextSibling;o.before(s),s=c}}function kt(t,e){t.next=e,e!==null&&(e.prev=t)}function Ne(t,e=I){var n=e.dom;return n===null?e.dom=t:(Ut(n)||(n=e.dom=[n]),Ut(t)?n.push(...t):n.push(t)),t}function ht(t,e){var n=(e&Zr)!==0,r=(e&Qr)!==0,o;return()=>{if(Q)return Ne(n?It:Ot),Ot;o||(o=Lo(t),n||(o=o.firstChild));var s=r?document.importNode(o,!0):o.cloneNode(!0);return Ne(n?[...s.childNodes]:s),s}}function xr(){if(Q)return Ne(It),Ot;var t=document.createDocumentFragment(),e=Zt();return t.append(e),Ne([e]),t}function et(t,e){Q||t.before(e)}function Wo(t,e){{const n=document.body;t.autofocus=!0,Jt(()=>{document.activeElement===n&&t.focus()})}}function Uo(t){Q&&t.firstChild!==null&&bn(t)}let jn=!1;function Tr(){jn||(jn=!0,document.addEventListener("reset",t=>{Promise.resolve().then(()=>{var e;if(!t.defaultPrevented)for(const n of t.target.elements)(e=n.__on_r)==null||e.call(n)})},{capture:!0}))}function Vo(t){if(Q){let e=!1;const n=()=>{if(e)return;e=!0;const r=t.getAttribute("value");ft(t,"value",null),ft(t,"checked",null),r&&(t.value=r)};t.__on_r=n,Co(n),Tr()}}function Xo(t,e){var n=t.__attributes??(t.__attributes={});n.value!==(n.value=e)&&(t.value=e)}function ft(t,e,n){n=n==null?null:n+"";var r=t.__attributes??(t.__attributes={});Q&&(r[e]=t.getAttribute(e),e==="src"||e==="href"||e==="srcset")||r[e]!==(r[e]=n)&&(e==="loading"&&(t[uo]=n),n===null?t.removeAttribute(e):t.setAttribute(e,n))}function an(t,e,n){n?t.classList.add(e):t.classList.remove(e)}function $r(t,e,n,r=n){t.addEventListener(e,n);const o=t.__on_r;o?t.__on_r=()=>{o(),r()}:t.__on_r=r,Tr()}function Go(t,e,n){$r(t,"input",()=>{n(qn(t)?Bn(t.value):t.value)}),he(()=>{var r=e();t.__value=r,!(qn(t)&&r===Bn(t.value))&&(t.type==="date"&&!r&&!t.value||(t.value=r??""))})}function Ko(t,e,n,r,o){var s=n.getAttribute("type")==="checkbox",c=t;if(e!==null)for(var v of e){var d=c;c=d[v],c===void 0&&(c=d[v]=[])}c.push(n),$r(n,"change",()=>{var f=n.__value;s&&(f=Jo(c,f,n.checked)),o(f)},()=>o(s?[]:null)),he(()=>{var f=r();s?(f=f||[],n.checked=ke(f).includes(ke(n.__value))):n.checked=wo(n.__value,f)}),pr(()=>{var f=c.indexOf(n);f!==-1&&c.splice(f,1)}),Jt(()=>{c.sort((f,y)=>f.compareDocumentPosition(y)===4?-1:1)})}function Jo(t,e,n){for(var r=new Set,o=0;o<t.length;o+=1)t[o].checked&&r.add(t[o].__value);return n||r.delete(e),Array.from(r)}function qn(t){var e=t.type;return e==="number"||e==="range"}function Bn(t){return t===""?null:+t}function Yn(t,e){var r;var n=t&&((r=t[X])==null?void 0:r.t);return t===e||n===e}function un(t,e,n,r){Jt(()=>{var o,s;return he(()=>{o=s,s=[],mn(()=>{t!==n(...s)&&(e(t,...s),o&&Yn(n(...o),t)&&e(null,...o))})}),()=>{ir(()=>{s&&Yn(n(...s),t)&&e(null,...s)})}})}function Ie(t,e,n,r){var b;var o=(n&Jr)!==0,s=t[e],c=(b=Ze(t,e))==null?void 0:b.set,v=r,d=()=>v;s===void 0&&r!==void 0&&(c&&o&&_o(),s=d(),c&&c(s));var f;if(f=()=>{var E=t[e];return E===void 0?d():E},c)return function(E){return arguments.length===1?(c(E),E):f()};var y=!1,g=Ce(s),k=xo(()=>{var E=f(),S=O(g);return y?(y=!1,S):g.v=E});return function(E){var S=O(k);return arguments.length>0?(k.equals(E)||(y=!0,j(g,E),O(k),k.version++),E):S}}function Zo(t){return new Qo(t)}var wt,it;class Qo{constructor(e){Ye(this,wt,void 0);Ye(this,it,void 0);const n=st({...e.props||{},$$events:{}},!1);We(this,it,(e.hydrate?Ho:Er)(e.component,{target:e.target,props:n,context:e.context,intro:e.intro,recover:e.recover})),We(this,wt,n.$$events);for(const r of Object.keys(tt(this,it)))r==="$set"||r==="$destroy"||r==="$on"||se(this,r,{get(){return tt(this,it)[r]},set(o){tt(this,it)[r]=o},enumerable:!0});tt(this,it).$set=r=>{Object.assign(n,r)},tt(this,it).$destroy=()=>{zo(tt(this,it))}}$set(e){tt(this,it).$set(e)}$on(e,n){tt(this,wt)[e]=tt(this,wt)[e]||[];const r=(...o)=>n.call(this,...o);return tt(this,wt)[e].push(r),()=>{tt(this,wt)[e]=tt(this,wt)[e].filter(o=>o!==r)}}$destroy(){tt(this,it).$destroy()}}wt=new WeakMap,it=new WeakMap;let Sr;typeof HTMLElement=="function"&&(Sr=class extends HTMLElement{constructor(e,n,r){super();ct(this,"$$ctor");ct(this,"$$s");ct(this,"$$c");ct(this,"$$cn",!1);ct(this,"$$d",{});ct(this,"$$r",!1);ct(this,"$$p_d",{});ct(this,"$$l",{});ct(this,"$$l_u",new Map);ct(this,"$$me");this.$$ctor=e,this.$$s=n,r&&this.attachShadow({mode:"open"})}addEventListener(e,n,r){if(this.$$l[e]=this.$$l[e]||[],this.$$l[e].push(n),this.$$c){const o=this.$$c.$on(e,n);this.$$l_u.set(n,o)}super.addEventListener(e,n,r)}removeEventListener(e,n,r){if(super.removeEventListener(e,n,r),this.$$c){const o=this.$$l_u.get(n);o&&(o(),this.$$l_u.delete(n))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){let e=function(o){return s=>{const c=document.createElement("slot");o!=="default"&&(c.name=o),et(s,c)}};if(await Promise.resolve(),!this.$$cn||this.$$c)return;const n={},r=ti(this);for(const o of this.$$s)o in r&&(o==="default"&&!this.$$d.children?(this.$$d.children=e(o),n.default=!0):n[o]=e(o));for(const o of this.attributes){const s=this.$$g_p(o.name);s in this.$$d||(this.$$d[s]=be(s,o.value,this.$$p_d,"toProp"))}for(const o in this.$$p_d)!(o in this.$$d)&&this[o]!==void 0&&(this.$$d[o]=this[o],delete this[o]);this.$$c=Zo({component:this.$$ctor,target:this.shadowRoot||this,props:{...this.$$d,$$slots:n,$$host:this}}),this.$$me=he(()=>{var o;this.$$r=!0;for(const s of we(this.$$c)){if(!((o=this.$$p_d[s])!=null&&o.reflect))continue;this.$$d[s]=this.$$c[s];const c=be(s,this.$$d[s],this.$$p_d,"toAttribute");c==null?this.removeAttribute(this.$$p_d[s].attribute||s):this.setAttribute(this.$$p_d[s].attribute||s,c)}this.$$r=!1});for(const o in this.$$l)for(const s of this.$$l[o]){const c=this.$$c.$on(o,s);this.$$l_u.set(s,c)}this.$$l={}}}attributeChangedCallback(e,n,r){var o;this.$$r||(e=this.$$g_p(e),this.$$d[e]=be(e,r,this.$$p_d,"toProp"),(o=this.$$c)==null||o.$set({[e]:this.$$d[e]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then(()=>{!this.$$cn&&this.$$c&&(this.$$c.$destroy(),pe(this.$$me),this.$$c=void 0)})}$$g_p(e){return we(this.$$p_d).find(n=>this.$$p_d[n].attribute===e||!this.$$p_d[n].attribute&&n.toLowerCase()===e)||e}});function be(t,e,n,r){var s;const o=(s=n[t])==null?void 0:s.type;if(e=o==="Boolean"&&typeof e!="boolean"?e!=null:e,!r||!n[t])return e;if(r==="toAttribute")switch(o){case"Object":case"Array":return e==null?null:JSON.stringify(e);case"Boolean":return e?"":null;case"Number":return e??null;default:return e}else switch(o){case"Object":case"Array":return e&&JSON.parse(e);case"Boolean":return e;case"Number":return e!=null?+e:e;default:return e}}function ti(t){const e={};return t.childNodes.forEach(n=>{e[n.slot||"default"]=!0}),e}function Fe(t,e,n,r,o,s){let c=class extends Sr{constructor(){super(t,n,o),this.$$p_d=e}static get observedAttributes(){return we(e).map(v=>(e[v].attribute||v).toLowerCase())}};return we(e).forEach(v=>{se(c.prototype,v,{get(){return this.$$c&&v in this.$$c?this.$$c[v]:this.$$d[v]},set(d){var f;d=be(v,d,e),this.$$d[v]=d,(f=this.$$c)==null||f.$set({[v]:d})}})}),r.forEach(v=>{se(c.prototype,v,{get(){var d;return(d=this.$$c)==null?void 0:d[v]}})}),t.element=c,c}const Vt=new Map([["yellow","#F8B920"],["red","#FF4646"],["blue","#0064FF"],["green","#00C564"]]),ei=["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","OPTION"];function Nr(t){const e=t.map(c=>c.trim().toLocaleLowerCase()),n=e.map(()=>({start:null,end:null,shift:0})),r=e.map(()=>[]),o=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,c=>{var v,d;return ei.includes((v=c.parentNode)==null?void 0:v.tagName)||!((d=c.parentNode)!=null&&d.checkVisibility())?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let s;for(;s=o.nextNode();)if(s!=null&&s.nodeValue)for(let c=0;c<s.nodeValue.length;c++){const v=s.nodeValue[c].toLocaleLowerCase().trim();v&&e.forEach((d,f)=>{var g;for(;d[n[f].shift]&&!d[n[f].shift].trim();)n[f].shift++;let y=d[n[f].shift]===v;if(!y&&n[f].shift&&(n[f].shift=0,y=d[n[f].shift]===v),y&&(n[f].shift||(n[f].start=[s,c]),n[f].end=[s,c],n[f].shift++),n[f].shift>=d.length){const k=document.createRange();k.setStart(n[f].start[0],n[f].start[1]),k.setEnd(n[f].end[0],n[f].end[1]+1),!k.collapsed&&((g=k.commonAncestorContainer.parentElement)!=null&&g.checkVisibility())?r[f].push(k):k.detach(),y=!1}y||(n[f].shift=0,n[f].start=null,n[f].end=null)})}return r}const Dt=`rh-${new Date().getTime()}-`,He="highlights"in CSS;function ni(t){if(!t.length&&!CSS.highlights.size)return;const e=[];if(CSS.highlights.clear(),t.length){const r=Nr(t.map(({text:o})=>o||""));for(const o in t){if(!r[o].length)continue;const{_id:s,color:c}=t[o],v=`${Dt}${s}`;CSS.highlights.set(v,new Highlight(...r[o]));const d=r[o][0].getBoundingClientRect();e.push(`
                ::highlight(${v}) {
                    all: unset;
                    background-color: color-mix(in srgb, ${Vt.get(c)||c}, transparent 50%) !important;
                }

                :root {
                    --highlight-${s}-top: ${(100/document.documentElement.scrollHeight*(window.scrollY+d.top-10)).toFixed(2)}%;
                }
            `);for(const f of r[o])f.detach()}}const n=(()=>{let r=document.getElementById(Dt);return r||(r=document.createElement("style"),r.id=Dt,document.head.appendChild(r)),r})();n.innerHTML=e.join(`
`)}function ri(){var t;(t=document.getElementById(Dt))==null||t.remove()}function oi(t){var e;for(const[n,r]of CSS.highlights){const o=n.replace(Dt,"");if(t==o)for(const s of r){(e=s.startContainer.parentElement)==null||e.scrollIntoView({behavior:"smooth",block:"start"});break}}}function ii(t){let e;for(const[n,r]of CSS.highlights)for(const o of r){const s=t.compareBoundaryPoints(Range.START_TO_START,o),c=t.compareBoundaryPoints(Range.END_TO_END,o);(s==0&&c==0||t!=null&&t.collapsed&&s>=0&&c<=0)&&(e=[n.replace(Dt,""),o])}if(e)return e[0].replace(Dt,"")}const Et=`rh-${new Date().getTime()}`;function si(t){const e=document.body.querySelectorAll(`.${Et}`);if(!t.length&&!e.length)return;e.forEach(s=>s.outerHTML=s.innerText);const n=[],r=Nr(t.map(({text:s})=>s||""));for(const s in t){const{_id:c,color:v}=t[s];for(const d of r[s]){const f=document.createElement("mark");f.className=Et,f.setAttribute("data-id",String(c)),f.append(d.extractContents()),d.insertNode(f),d.detach()}n.push(`
            .${Et}[data-id="${c}"] {
                all: unset;
                display: inline-block;
                background-color: ${ci(Vt.get(v)||v,.5)} !important;
            }
        `)}const o=(()=>{let s=document.getElementById(Et);return s||(s=document.createElement("style"),s.id=Et,document.head.appendChild(s)),s})();o.innerHTML=n.join(`
`)}function li(){var t;document.body.querySelectorAll(`.${Et}`).forEach(e=>e.outerHTML=e.innerText),(t=document.getElementById(Et))==null||t.remove()}function ai(t){const e=document.body.querySelector(`.${Et}[data-id="${t}"]`);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}function ui(t){const e=t.commonAncestorContainer.nodeType==Node.ELEMENT_NODE?t.commonAncestorContainer:t.commonAncestorContainer.parentElement;if((e==null?void 0:e.className)==Et){if(!t.collapsed){const n=new Range;n.selectNodeContents(t.commonAncestorContainer);const r=t.compareBoundaryPoints(Range.START_TO_START,n),o=t.compareBoundaryPoints(Range.END_TO_END,n);if(n.detach(),r!=0||o!=0)return}return e.getAttribute("data-id")||void 0}}function ci(t,e){if(!t)return t;const n=parseInt(t.slice(1,3),16),r=parseInt(t.slice(3,5),16),o=parseInt(t.slice(5,7),16);return`rgba(${n}, ${r}, ${o}, ${e})`}function Ae(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var fi=typeof global=="object"&&global&&global.Object===Object&&global,di=typeof self=="object"&&self&&self.Object===Object&&self,Ar=fi||di||Function("return this")(),Xe=function(){return Ar.Date.now()},hi=/\s/;function pi(t){for(var e=t.length;e--&&hi.test(t.charAt(e)););return e}var vi=/^\s+/;function mi(t){return t&&t.slice(0,pi(t)+1).replace(vi,"")}var De=Ar.Symbol,Dr=Object.prototype,gi=Dr.hasOwnProperty,_i=Dr.toString,ne=De?De.toStringTag:void 0;function bi(t){var e=gi.call(t,ne),n=t[ne];try{t[ne]=void 0;var r=!0}catch{}var o=_i.call(t);return r&&(e?t[ne]=n:delete t[ne]),o}var yi=Object.prototype,wi=yi.toString;function Ei(t){return wi.call(t)}var Ci="[object Null]",ki="[object Undefined]",Wn=De?De.toStringTag:void 0;function xi(t){return t==null?t===void 0?ki:Ci:Wn&&Wn in Object(t)?bi(t):Ei(t)}function Ti(t){return t!=null&&typeof t=="object"}var $i="[object Symbol]";function Si(t){return typeof t=="symbol"||Ti(t)&&xi(t)==$i}var Un=NaN,Ni=/^[-+]0x[0-9a-f]+$/i,Ai=/^0b[01]+$/i,Di=/^0o[0-7]+$/i,Oi=parseInt;function Vn(t){if(typeof t=="number")return t;if(Si(t))return Un;if(Ae(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=Ae(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=mi(t);var n=Ai.test(t);return n||Di.test(t)?Oi(t.slice(2),n?2:8):Ni.test(t)?Un:+t}var Li="Expected a function",Mi=Math.max,Ri=Math.min;function Ii(t,e,n){var r,o,s,c,v,d,f=0,y=!1,g=!1,k=!0;if(typeof t!="function")throw new TypeError(Li);e=Vn(e)||0,Ae(n)&&(y=!!n.leading,g="maxWait"in n,s=g?Mi(Vn(n.maxWait)||0,e):s,k="trailing"in n?!!n.trailing:k);function b(C){var T=r,M=o;return r=o=void 0,f=C,c=t.apply(M,T),c}function E(C){return f=C,v=setTimeout(L,e),y?b(C):c}function S(C){var T=C-d,M=C-f,R=e-T;return g?Ri(R,s-M):R}function N(C){var T=C-d,M=C-f;return d===void 0||T>=e||T<0||g&&M>=s}function L(){var C=Xe();if(N(C))return $(C);v=setTimeout(L,S(C))}function $(C){return v=void 0,k&&r?b(C):(r=o=void 0,c)}function x(){v!==void 0&&clearTimeout(v),f=0,r=d=o=v=void 0}function D(){return v===void 0?c:$(Xe())}function G(){var C=Xe(),T=N(C);if(r=arguments,o=this,d=C,T){if(v===void 0)return E(d);if(g)return clearTimeout(v),v=setTimeout(L,e),b(d)}return v===void 0&&(v=setTimeout(L,e)),c}return G.cancel=x,G.flush=D,G}var Fi="Expected a function";function Or(t,e,n){var r=!0,o=!0;if(typeof t!="function")throw new TypeError(Fi);return Ae(n)&&(r="leading"in n?!!n.leading:r,o="trailing"in n?!!n.trailing:o),Ii(t,e,{leading:r,maxWait:e,trailing:o})}function Lr(t){return He?ni(t):si(t)}const Hi=Or(Lr,500);function Ge(t){return t.length?Hi(t):Lr(t)}function zi(){return He?ri():li()}function Mr(t){return He?oi(t):ai(t)}function Rr(){const t=document.getSelection();if(t!=null&&t.rangeCount)return t.getRangeAt(0)}function oe(){const t=document.getSelection();t!=null&&t.rangeCount&&t.removeAllRanges()}function Pi(t){return He?ii(t):ui(t)}function Xn(t){if(!t)return"";var e=document.createElement("div");e.appendChild(t.cloneContents().cloneNode(!0)),document.body.appendChild(e);const n=e.innerText;return document.body.removeChild(e),e=void 0,n}function ji(t,e,n){let r=nt(st([])),o=nt(!1),s=nt(!1),c=nt(void 0);function v(b){const E=Pi(b);if(E)return O(r).find(N=>N._id==E);if(Xn(b).trim())return{text:Xn(b).trim(),color:"yellow"}}function d(b){const E={...b._id?{_id:b._id}:{},text:b.text||"",note:b.note||"",color:b.color||"yellow"};if(!E.text)return;const S=O(r).findIndex(N=>{var L;return N._id==E._id||((L=N.text)==null?void 0:L.toLocaleLowerCase().trim())===E.text.toLocaleLowerCase().trim()});S!=-1?(O(r)[S]=E,e(E)):(O(r).push(E),t(E))}function f({_id:b}){j(r,st(O(r).filter(E=>E._id!=b))),n({_id:b})}function y(b){j(c,st(JSON.parse(JSON.stringify(b))))}function g(){O(c)&&(d(O(c)),j(c,void 0))}function k(){j(c,void 0)}return{get highlights(){return O(r)},set highlights(b){j(r,st(b))},get pro(){return O(o)},set pro(b){j(o,st(b))},get nav(){return O(s)},set nav(b){j(s,st(b))},get draft(){return O(c)},find:v,upsert:d,remove:f,setDraft:y,draftSubmit:g,draftCancel:k}}const qi="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(qi);var Bi=ht('<button type="submit" class="svelte-140u1z3"><span class="color svelte-140u1z3"></span></button>'),Yi=ht('<button type="submit" value="add" title="Create highlight" class="svelte-140u1z3"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-140u1z3"><g class="svelte-140u1z3"><path d="M12.974,8.731c-.474,3.691-3.724,4.113-6.974,3.519" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-140u1z3"></path><path d="M2.75,15.25S4.062,3.729,15.25,2.75c-.56,.976-.573,2.605-.946,4.239-.524,2.011-2.335,2.261-4.554,2.261" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-140u1z3"></path></g></svg></button>'),Wi=ht('<button type="submit" value="remove" title="Delete highlight" class="svelte-140u1z3"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-140u1z3"><g class="svelte-140u1z3"><line x1="2.75" y1="4.25" x2="15.25" y2="4.25" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-140u1z3"></line><path d="M6.75,4.25v-1.5c0-.552,.448-1,1-1h2.5c.552,0,1,.448,1,1v1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-140u1z3"></path><path d="M13.5,6.75l-.4,7.605c-.056,1.062-.934,1.895-1.997,1.895H6.898c-1.064,0-1.941-.833-1.997-1.895l-.4-7.605" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-140u1z3"></path></g></svg></button>'),Ui=ht('<dialog class="svelte-140u1z3"><form method="dialog" class="svelte-140u1z3"><!> <button type="submit" value="note" title="Add note" class="svelte-140u1z3"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-140u1z3"><g class="svelte-140u1z3"><path stroke-linecap="round" stroke-linejoin="round" d="M9,1.75C4.996,1.75,1.75,4.996,1.75,9c0,1.319,.358,2.552,.973,3.617,.43,.806-.053,2.712-.973,3.633,1.25,.068,2.897-.497,3.633-.973,.489,.282,1.264,.656,2.279,.848,.433,.082,.881,.125,1.338,.125,4.004,0,7.25-3.246,7.25-7.25S13.004,1.75,9,1.75Z" class="svelte-140u1z3"></path><path stroke-width="0" d="M9,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-140u1z3"></path><path stroke-width="0" d="M5.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-140u1z3"></path><path stroke-width="0" d="M12.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-140u1z3"></path></g></svg></button> <!></form></dialog>');function Ir(t,e){fe(e,!0);let n=Ie(e,"store",7),r,o=nt(void 0),s=nt(!1);function c(C){if(!O(o))return;const T=C.currentTarget.returnValue;switch(C.currentTarget.returnValue="",T){case"add":e.store.upsert(O(o)),oe();break;case"note":e.store.setDraft(O(o)),oe();break;case"remove":e.store.remove(O(o)),oe();break;default:if(Vt.has(T)){e.store.upsert({...O(o),color:T}),oe();return}break}}function v(){j(s,!0)}function d(){j(s,!1),f()}function f(){if(O(s)){r==null||r.close();return}requestAnimationFrame(()=>{const C=Rr(),T=C&&e.store.find(C);if(!C||!(T!=null&&T._id)&&!C.toString().trim()){r==null||r.close();return}j(o,st(T)),r.inert=!0,r==null||r.show(),r.inert=!1;const M=C.getBoundingClientRect(),R=Math.max(M.x,10)+window.scrollX,z=window.innerWidth-Math.max(M.x,10)-window.scrollX-M.width,V=Math.max(M.y,40)+window.scrollY+M.height+4,K=window.innerHeight-Math.max(M.y,40)-window.scrollY+4,ut=R<window.innerWidth/2+window.scrollX,B=V<window.innerHeight/2+window.scrollY;r==null||r.style.setProperty("left",ut?`${R}px`:"unset"),r==null||r.style.setProperty("right",ut?"unset":`${z}px`),r==null||r.style.setProperty("top",B?`${V}px`:"unset"),r==null||r.style.setProperty("bottom",B?"unset":`${K}px`)})}const y=Or(f,200,{leading:!0,trailing:!0});var g=Ui();mt("mousedown",Nt,v,!1),mt("touchstart",Nt,v,!1,!0),mt("mouseup",Nt,d,!1),mt("touchend",Nt,d,!1,!0),mt("touchcancel",Nt,d,!1,!0),mt("selectionchange",Nt,y,!1),un(g,C=>r=C,()=>r);var k=lt(g),b=lt(k);ue(b,()=>{var C;return(C=O(o))==null?void 0:C._id},C=>{var T=xr(),M=Re(T);wn(M,71,()=>Vt,(R,z)=>Z(Z(R))[0],(R,z,V)=>{let K=()=>Z(Z(z))[0],ut=()=>Z(Z(z))[1];var B=Bi(),ot=lt(B);xt(()=>{Xo(B,K()),ft(ot,"style",`--color: ${ut()??""}`),an(ot,"active",K()==O(o).color)}),et(R,B)}),et(C,T)},C=>{var T=Yi();et(C,T)});var E=H(H(b,!0)),S=lt(E),N=lt(S),L=lt(N),$=H(L),x=H($),D=H(x),G=H(H(E,!0));return ue(G,()=>{var C;return(C=O(o))==null?void 0:C._id},C=>{var T=Wi();et(C,T)}),xt(()=>{var C,T,M,R,z,V;an(g,"new",!((C=O(o))!=null&&C._id)),ft(L,"fill",(T=O(o))!=null&&T.note?"currentColor":"none"),ft(L,"stroke-width",(M=O(o))!=null&&M.note?"0":void 0),ft($,"fill",(R=O(o))!=null&&R.note?"none":"currentColor"),ft(x,"fill",(z=O(o))!=null&&z.note?"none":"currentColor"),ft(D,"fill",(V=O(o))!=null&&V.note?"none":"currentColor")}),mt("close",g,c,!1),et(t,g),yn(t,"svelte-140u1z3",`
    .svelte-140u1z3 {
        user-select: none;
        -webkit-user-select: none;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    dialog.svelte-140u1z3 {
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
        dialog.svelte-140u1z3 {
            --bg-light: rgba(255, 255, 255, .8);
            --bg-dark: rgba(60, 60, 60, .8);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }
    }

    @media (pointer: coarse) {
        dialog.svelte-140u1z3 {
            --control-size: 26px;
        }
    }

    dialog.svelte-140u1z3 {
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
        dialog.new.svelte-140u1z3 {
            position: fixed;
            top: auto !important;
            left: auto !important;
            right: 16px !important;
            bottom: 16px !important;
            margin-right: env(safe-area-inset-right);
            margin-bottom: env(safe-area-inset-bottom);
        }

        dialog.new[open].svelte-140u1z3 {
            box-shadow: 0 0 0 5px color-mix(in srgb, currentColor 10%, transparent), 0 0 0 .5px color-mix(in srgb, currentColor 20%, transparent);
        }
    }

    [open].svelte-140u1z3 {
        box-shadow: 0 0 0 .5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.05), 0 15px 40px rgba(0,0,0,.1);
    }

    form.svelte-140u1z3 {
        display: flex;
        margin: 0;
        padding: 0;
    }

    button.svelte-140u1z3 {
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

    button.svelte-140u1z3:first-child {
        border-top-left-radius: var(--control-size);
        border-bottom-left-radius: var(--control-size);
    }

    button.svelte-140u1z3:last-child {
        border-top-right-radius: var(--control-size);
        border-bottom-right-radius: var(--control-size);
    }

    @media (pointer: fine) {
        button.svelte-140u1z3:hover {
            background: var(--hover-bg-light);
            background: light-dark(var(--hover-bg-light), var(--hover-bg-dark));
        }
    }

    button.svelte-140u1z3:active {
        transition: none;
        background: var(--active-bg-light);
        background: light-dark(var(--active-bg-light), var(--active-bg-dark));
    }

    svg.svelte-140u1z3 {
        stroke: currentColor;
        stroke-width: 1.5px;
    }

    .color.svelte-140u1z3 {
        pointer-events: none;
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        box-shadow: inset 0 0 0 6px var(--color);
        transition: width .15s ease-in-out, height .15s ease-in-out;
        border-radius: 50%;
    }

    .color.active.svelte-140u1z3 {
        width: 16px;
        height: 16px;
        box-shadow: inset 0 0 0 6px var(--color)
    }

    /* animation */
    dialog.svelte-140u1z3 {
        transition: 
            display .25s allow-discrete ease-in-out, 
            overlay .25s allow-discrete ease-in-out, 
            box-shadow .25s allow-discrete ease-in-out, 
            transform .25s allow-discrete ease-in-out,
            opacity .25s ease-in-out;
        opacity: 0;
        transform: translateY(3px);
    }

    [open].svelte-140u1z3 {
        opacity: 1;
        transform: translateY(0);
    }

    dialog.svelte-140u1z3:not([open]) {
        transition-duration: .2s;
        pointer-events: none;
    }

    @starting-style {
        [open].svelte-140u1z3 {
            opacity: 0;
            transform: translateY(-3px);
        }
    }
`),de({get store(){return n()},set store(C){n(C),Ft()}})}Fe(Ir,{store:{}},[],[],!0);function Vi(t){const e=t.currentTarget.getBoundingClientRect();e.top<=t.clientY&&t.clientY<=e.top+e.height&&e.left<=t.clientX&&t.clientX<=e.left+e.width||(t.preventDefault(),t.currentTarget.close())}var Xi=(t,e)=>j(e,!1),Gi=ht('<input type="radio" name="color" class="svelte-1me8cmn">'),Ki=ht('<div class="unlock svelte-1me8cmn"><a href="https://raindrop.io/pro/buy" target="_blank" class="svelte-1me8cmn">Upgrade to Pro</a> to unlock annotation</div>'),Ji=ht('<blockquote role="presentation" class="svelte-1me8cmn"> </blockquote> <fieldset class="color svelte-1me8cmn"></fieldset> <textarea class="note svelte-1me8cmn" rows="4" maxlength="5000" placeholder="Notes (optional)"></textarea> <!>',1),Zi=ht('<dialog role="presentation" class="svelte-1me8cmn"><header class="svelte-1me8cmn"> </header> <form method="dialog" class="svelte-1me8cmn"><!> <footer class="svelte-1me8cmn"><button formnovalidate="" class="svelte-1me8cmn">Cancel <sup class="svelte-1me8cmn">esc</sup></button> <button type="submit" value="OK" class="svelte-1me8cmn"> <sup class="svelte-1me8cmn">&crarr;</sup></button></footer></form></dialog>');function Fr(t,e){fe(e,!0);const n=[];let r=Ie(e,"store",7),o,s,c=nt(!0);nn(()=>{e.store.draft?(j(c,!0),o==null||o.showModal()):o==null||o.close()});function v($){const x=$.currentTarget.returnValue;$.currentTarget.returnValue="",setTimeout(x?e.store.draftSubmit:e.store.draftCancel,200)}function d($){var x;$.stopImmediatePropagation(),$.stopPropagation(),$.key=="Enter"&&!$.shiftKey&&($.preventDefault(),s&&((x=$.currentTarget.closest("form"))==null||x.requestSubmit(s)))}var f=Zi();un(f,$=>o=$,()=>o),f.__mousedown=[Vi];var y=lt(f),g=lt(y),k=H(H(y,!0)),b=lt(k);ue(b,()=>e.store.draft,$=>{var x=Ji(),D=Re(x);D.__click=[Xi,c];var G=lt(D);xt(()=>{var R,z;return Ue(G,((z=(R=e.store.draft)==null?void 0:R.text)==null?void 0:z.trim())||"")});var C=H(H(D,!0));wn(C,73,()=>Vt,jo,(R,z,V)=>{let K=()=>Z(Z(z))[0],ut=()=>Z(Z(z))[1];var B=Gi();Vo(B);var ot;xt(()=>{ot!==(ot=K())&&(B.value=(B.__value=K())==null?"":K()),ft(B,"style",`--color: ${ut()??""}`)}),Ko(n,[],B,()=>(K(),e.store.draft.color),St=>e.store.draft.color=St),et(R,B)});var T=H(H(C,!0));Uo(T),Wo(T),T.__keydown=d;var M=H(H(T,!0));ue(M,()=>!e.store.pro,R=>{var z=Ki();et(R,z)}),xt(()=>{an(D,"compact",O(c)),T.disabled=!e.store.pro}),Go(T,()=>e.store.draft.note,R=>e.store.draft.note=R),et($,x)});var E=H(H(b,!0)),S=lt(E),N=H(H(S,!0));un(N,$=>s=$,()=>s);var L=lt(N);return xt(()=>{var $,x;Ue(g,`${(($=e.store.draft)!=null&&$._id?"Edit":"New")??""} highlight`),Ue(L,`${((x=e.store.draft)!=null&&x._id?"Update":"Create")??""} `)}),mt("close",f,v,!1),et(t,f),yn(t,"svelte-1me8cmn",`
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
`),de({get store(){return r()},set store($){r($),Ft()}})}yr(["mousedown","click","keydown"]);Fe(Fr,{store:{}},[],[],!0);const Qi=(t,e)=>{const n=t.target.getAttribute("data-highlight");n&&(t.preventDefault(),e(n))};var ts=ht('<div class="svelte-1t9y4ki"></div>'),es=ht('<nav role="presentation" class="svelte-1t9y4ki"></nav>');function Hr(t,e){fe(e,!0);let n=Ie(e,"store",7);var r=xr(),o=Re(r);return ue(o,()=>e.store.nav,s=>{var c=es();c.__click=[Qi,Mr],wn(c,77,()=>e.store.highlights,(v,d)=>Z(v)._id,(v,d,f)=>{var y=ts();xt(()=>ft(y,"style",`top: var(--highlight-${Z(d)._id??""}-top); --color: ${(Vt.get(Z(d).color)||Z(d).color)??""}`)),xt(()=>ft(y,"data-highlight",Z(d)._id)),et(v,y)}),et(s,c)}),et(t,r),yn(t,"svelte-1t9y4ki",`
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
`),de({get store(){return n()},set store(s){n(s),Ft()}})}yr(["click"]);Fe(Hr,{store:{}},[],[],!0);var ns=ht("<!> <!> <!>",1);function rs(t,e){fe(e,!0);let n=Ie(e,"store",7);nn(()=>{Ge(e.store.highlights)});let r;function o(){Ge(e.store.highlights),clearTimeout(r),r=setTimeout(()=>Ge(e.store.highlights),3e3)}nn(()=>zi);var s=ns();mt("load",Se,o,!1),mt("popstate",Se,o,!1);var c=Re(s);Ir(c,{get store(){return e.store}});var v=H(H(c,!0));Fr(v,{get store(){return e.store}});var d=H(H(v,!0));return Hr(d,{get store(){return e.store}}),et(t,s),de({get store(){return n()},set store(f){n(f),Ft()}})}customElements.define("rdh-ui",Fe(rs,{store:{}},[],[],!0));function os(t){if(typeof chrome=="object"&&chrome.runtime&&chrome.runtime.onMessage||typeof browser=="object"&&browser.runtime&&browser.runtime.onMessage){const{runtime:e}=typeof browser=="object"?browser:chrome,n=(r,o)=>{o.id==e.id&&typeof r.type=="string"&&t(r)};return e.onMessage.removeListener(n),e.onMessage.addListener(n),r=>e.sendMessage(null,r)}if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.rdh)return window.rdhSend=t,e=>window.webkit.messageHandlers.rdh.postMessage(e);if(typeof window<"u"&&typeof window.process=="object"&&window.process.type==="renderer"||typeof process<"u"&&typeof process.versions=="object"&&process.versions.electron||typeof navigator=="object"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Electron")>=0){const{ipcRenderer:e}=require("electron"),n=(r,o)=>t(o);return e.removeListener("RDH",n),e.on("RDH",n),r=>e.sendToHost("RDH",r)}if("ReactNativeWebView"in window)return window.ReactNativeWebViewSendMessage=t,e=>window.ReactNativeWebView.postMessage(JSON.stringify(e));if(window.self!==window.top){const e=({data:n,source:r})=>{r!==window.parent||typeof n!="object"||typeof n.type!="string"||t(n)};return window.removeEventListener("message",e),window.addEventListener("message",e),n=>window.parent.postMessage(n,"*")}throw new Error("unsupported platform")}async function is(t){let e=!1;const n=new Set,r=os(o=>{if(!e){n.add(o);return}t(o)});await new Promise(o=>{function s(){window.removeEventListener("DOMContentLoaded",s),o()}document.readyState=="loading"?(window.removeEventListener("DOMContentLoaded",s),window.addEventListener("DOMContentLoaded",s,{once:!0})):o()}),e=!0;for(const o of n)t(o),n.delete(o);return r}const re=document.createElement("rdh-ui");(async()=>{const t=await is(n=>{switch(n.type){case"RDH_APPLY":Array.isArray(n.payload)&&(e.highlights=n.payload);break;case"RDH_CONFIG":typeof n.payload.pro=="boolean"&&(e.pro=n.payload.pro),typeof n.payload.nav=="boolean"&&(e.nav=n.payload.nav),typeof n.payload.enabled=="boolean"&&(n.payload.enabled===!0?document.body.contains(re)||document.body.appendChild(re):document.body.contains(re)&&document.body.removeChild(re));break;case"RDH_SCROLL":typeof n.payload._id=="string"&&Mr(n.payload._id);break;case"RDH_ADD_SELECTION":const r=Rr();if(!r)return;const o=e.find(r);if(!o)return;e.upsert(o),oe();break;case"RDH_NOTE_SELECTION":console.log("not implemented yet");break}}),e=ji(n=>t({type:"RDH_ADD",payload:n}),n=>t({type:"RDH_UPDATE",payload:n}),({_id:n})=>t({type:"RDH_REMOVE",payload:{_id:n}}));re.store=e,t({type:"RDH_READY",payload:{url:location.href}})})();
