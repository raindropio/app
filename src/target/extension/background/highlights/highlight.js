"use strict";var zr=Object.defineProperty;var Ur=(e,t,n)=>t in e?zr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ce=(e,t,n)=>(Ur(e,typeof t!="symbol"?t+"":t,n),n),Dn=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)};var te=(e,t,n)=>(Dn(e,t,"read from private field"),n?n.call(e):t.get(e)),Bt=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},Yt=(e,t,n,r)=>(Dn(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n);(function(){var e=window.Document.prototype.createElement,t=window.Document.prototype.createElementNS,n=window.Document.prototype.importNode,r=window.Document.prototype.prepend,o=window.Document.prototype.append,s=window.DocumentFragment.prototype.prepend,c=window.DocumentFragment.prototype.append,p=window.Node.prototype.cloneNode,d=window.Node.prototype.appendChild,f=window.Node.prototype.insertBefore,b=window.Node.prototype.removeChild,m=window.Node.prototype.replaceChild,x=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),E=window.Element.prototype.attachShadow,S=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),y=window.Element.prototype.getAttribute,T=window.Element.prototype.setAttribute,N=window.Element.prototype.removeAttribute,$=window.Element.prototype.toggleAttribute,k=window.Element.prototype.getAttributeNS,O=window.Element.prototype.setAttributeNS,G=window.Element.prototype.removeAttributeNS,C=window.Element.prototype.insertAdjacentElement,A=window.Element.prototype.insertAdjacentHTML,M=window.Element.prototype.prepend,R=window.Element.prototype.append,q=window.Element.prototype.before,V=window.Element.prototype.after,K=window.Element.prototype.replaceWith,ue=window.Element.prototype.remove,Y=window.HTMLElement,ee=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),$e=window.HTMLElement.prototype.insertAdjacentElement,Qe=window.HTMLElement.prototype.insertAdjacentHTML,et=new Set;"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(i){return et.add(i)});function yn(i){var l=et.has(i);return i=/^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(i),!l&&i}var Fr=document.contains?document.contains.bind(document):document.documentElement.contains.bind(document.documentElement);function P(i){var l=i.isConnected;if(l!==void 0)return l;if(Fr(i))return!0;for(;i&&!(i.__CE_isImportDocument||i instanceof Document);)i=i.parentNode||(window.ShadowRoot&&i instanceof ShadowRoot?i.host:void 0);return!(!i||!(i.__CE_isImportDocument||i instanceof Document))}function Ft(i){var l=i.children;if(l)return Array.prototype.slice.call(l);for(l=[],i=i.firstChild;i;i=i.nextSibling)i.nodeType===Node.ELEMENT_NODE&&l.push(i);return l}function Ht(i,l){for(;l&&l!==i&&!l.nextSibling;)l=l.parentNode;return l&&l!==i?l.nextSibling:null}function Pt(i,l,u){for(var v=i;v;){if(v.nodeType===Node.ELEMENT_NODE){var a=v;l(a);var h=a.localName;if(h==="link"&&a.getAttribute("rel")==="import"){if(v=a.import,u===void 0&&(u=new Set),v instanceof Node&&!u.has(v))for(u.add(v),v=v.firstChild;v;v=v.nextSibling)Pt(v,l,u);v=Ht(i,a);continue}else if(h==="template"){v=Ht(i,a);continue}if(a=a.__CE_shadowRoot)for(a=a.firstChild;a;a=a.nextSibling)Pt(a,l,u)}v=v.firstChild?v.firstChild:Ht(i,v)}}function vt(){var i=!(pe==null||!pe.noDocumentConstructionObserver),l=!(pe==null||!pe.shadyDomFastWalk);this.m=[],this.g=[],this.j=!1,this.shadyDomFastWalk=l,this.I=!i}function tt(i,l,u,v){var a=window.ShadyDOM;if(i.shadyDomFastWalk&&a&&a.inUse){if(l.nodeType===Node.ELEMENT_NODE&&u(l),l.querySelectorAll)for(i=a.nativeMethods.querySelectorAll.call(l,"*"),l=0;l<i.length;l++)u(i[l])}else Pt(l,u,v)}function Hr(i,l){i.j=!0,i.m.push(l)}function Pr(i,l){i.j=!0,i.g.push(l)}function jt(i,l){i.j&&tt(i,l,function(u){return Fe(i,u)})}function Fe(i,l){if(i.j&&!l.__CE_patched){l.__CE_patched=!0;for(var u=0;u<i.m.length;u++)i.m[u](l);for(u=0;u<i.g.length;u++)i.g[u](l)}}function ve(i,l){var u=[];for(tt(i,l,function(a){return u.push(a)}),l=0;l<u.length;l++){var v=u[l];v.__CE_state===1?i.connectedCallback(v):pt(i,v)}}function oe(i,l){var u=[];for(tt(i,l,function(a){return u.push(a)}),l=0;l<u.length;l++){var v=u[l];v.__CE_state===1&&i.disconnectedCallback(v)}}function we(i,l,u){u=u===void 0?{}:u;var v=u.J,a=u.upgrade||function(g){return pt(i,g)},h=[];for(tt(i,l,function(g){if(i.j&&Fe(i,g),g.localName==="link"&&g.getAttribute("rel")==="import"){var _=g.import;_ instanceof Node&&(_.__CE_isImportDocument=!0,_.__CE_registry=document.__CE_registry),_&&_.readyState==="complete"?_.__CE_documentLoadHandled=!0:g.addEventListener("load",function(){var w=g.import;if(!w.__CE_documentLoadHandled){w.__CE_documentLoadHandled=!0;var D=new Set;v&&(v.forEach(function(F){return D.add(F)}),D.delete(w)),we(i,w,{J:D,upgrade:a})}})}else h.push(g)},v),l=0;l<h.length;l++)a(h[l])}function pt(i,l){try{var u=l.ownerDocument,v=u.__CE_registry,a=v&&(u.defaultView||u.__CE_isImportDocument)?gt(v,l.localName):void 0;if(a&&l.__CE_state===void 0){a.constructionStack.push(l);try{try{if(new a.constructorFunction!==l)throw Error("The custom element constructor did not produce the element being upgraded.")}finally{a.constructionStack.pop()}}catch(w){throw l.__CE_state=2,w}if(l.__CE_state=1,l.__CE_definition=a,a.attributeChangedCallback&&l.hasAttributes()){var h=a.observedAttributes;for(a=0;a<h.length;a++){var g=h[a],_=l.getAttribute(g);_!==null&&i.attributeChangedCallback(l,g,null,_,null)}}P(l)&&i.connectedCallback(l)}}catch(w){He(w)}}vt.prototype.connectedCallback=function(i){var l=i.__CE_definition;if(l.connectedCallback)try{l.connectedCallback.call(i)}catch(u){He(u)}},vt.prototype.disconnectedCallback=function(i){var l=i.__CE_definition;if(l.disconnectedCallback)try{l.disconnectedCallback.call(i)}catch(u){He(u)}},vt.prototype.attributeChangedCallback=function(i,l,u,v,a){var h=i.__CE_definition;if(h.attributeChangedCallback&&-1<h.observedAttributes.indexOf(l))try{h.attributeChangedCallback.call(i,l,u,v,a)}catch(g){He(g)}};function En(i,l,u,v){var a=l.__CE_registry;if(a&&(v===null||v==="http://www.w3.org/1999/xhtml")&&(a=gt(a,u)))try{var h=new a.constructorFunction;if(h.__CE_state===void 0||h.__CE_definition===void 0)throw Error("Failed to construct '"+u+"': The returned value was not constructed with the HTMLElement constructor.");if(h.namespaceURI!=="http://www.w3.org/1999/xhtml")throw Error("Failed to construct '"+u+"': The constructed element's namespace must be the HTML namespace.");if(h.hasAttributes())throw Error("Failed to construct '"+u+"': The constructed element must not have any attributes.");if(h.firstChild!==null)throw Error("Failed to construct '"+u+"': The constructed element must not have any children.");if(h.parentNode!==null)throw Error("Failed to construct '"+u+"': The constructed element must not have a parent node.");if(h.ownerDocument!==l)throw Error("Failed to construct '"+u+"': The constructed element's owner document is incorrect.");if(h.localName!==u)throw Error("Failed to construct '"+u+"': The constructed element's local name is incorrect.");return h}catch(g){return He(g),l=v===null?e.call(l,u):t.call(l,v,u),Object.setPrototypeOf(l,HTMLUnknownElement.prototype),l.__CE_state=2,l.__CE_definition=void 0,Fe(i,l),l}return l=v===null?e.call(l,u):t.call(l,v,u),Fe(i,l),l}function He(i){var l="",u="",v=0,a=0;i instanceof Error?(l=i.message,u=i.sourceURL||i.fileName||"",v=i.line||i.lineNumber||0,a=i.column||i.columnNumber||0):l="Uncaught "+String(i);var h=void 0;ErrorEvent.prototype.initErrorEvent===void 0?h=new ErrorEvent("error",{cancelable:!0,message:l,filename:u,lineno:v,colno:a,error:i}):(h=document.createEvent("ErrorEvent"),h.initErrorEvent("error",!1,!0,l,u,v),h.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0}})}),h.error===void 0&&Object.defineProperty(h,"error",{configurable:!0,enumerable:!0,get:function(){return i}}),window.dispatchEvent(h),h.defaultPrevented||console.error(i)}function kn(){var i=this;this.g=void 0,this.F=new Promise(function(l){i.l=l})}kn.prototype.resolve=function(i){if(this.g)throw Error("Already resolved.");this.g=i,this.l(i)};function Cn(i){var l=document;this.l=void 0,this.h=i,this.g=l,we(this.h,this.g),this.g.readyState==="loading"&&(this.l=new MutationObserver(this.G.bind(this)),this.l.observe(this.g,{childList:!0,subtree:!0}))}function xn(i){i.l&&i.l.disconnect()}Cn.prototype.G=function(i){var l=this.g.readyState;for(l!=="interactive"&&l!=="complete"||xn(this),l=0;l<i.length;l++)for(var u=i[l].addedNodes,v=0;v<u.length;v++)we(this.h,u[v])};function B(i){this.s=new Map,this.u=new Map,this.C=new Map,this.A=!1,this.B=new Map,this.o=function(l){return l()},this.i=!1,this.v=[],this.h=i,this.D=i.I?new Cn(i):void 0}B.prototype.H=function(i,l){var u=this;if(!(l instanceof Function))throw new TypeError("Custom element constructor getters must be functions.");Tn(this,i),this.s.set(i,l),this.v.push(i),this.i||(this.i=!0,this.o(function(){return Sn(u)}))},B.prototype.define=function(i,l){var u=this;if(!(l instanceof Function))throw new TypeError("Custom element constructors must be functions.");Tn(this,i),$n(this,i,l),this.v.push(i),this.i||(this.i=!0,this.o(function(){return Sn(u)}))};function Tn(i,l){if(!yn(l))throw new SyntaxError("The element name '"+l+"' is not valid.");if(gt(i,l))throw Error("A custom element with name '"+(l+"' has already been defined."));if(i.A)throw Error("A custom element is already being defined.")}function $n(i,l,u){i.A=!0;var v;try{var a=u.prototype;if(!(a instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var h=function(F){var Pe=a[F];if(Pe!==void 0&&!(Pe instanceof Function))throw Error("The '"+F+"' callback must be a function.");return Pe},g=h("connectedCallback"),_=h("disconnectedCallback"),w=h("adoptedCallback"),D=(v=h("attributeChangedCallback"))&&u.observedAttributes||[]}catch(F){throw F}finally{i.A=!1}return u={localName:l,constructorFunction:u,connectedCallback:g,disconnectedCallback:_,adoptedCallback:w,attributeChangedCallback:v,observedAttributes:D,constructionStack:[]},i.u.set(l,u),i.C.set(u.constructorFunction,u),u}B.prototype.upgrade=function(i){we(this.h,i)};function Sn(i){if(i.i!==!1){i.i=!1;for(var l=[],u=i.v,v=new Map,a=0;a<u.length;a++)v.set(u[a],[]);for(we(i.h,document,{upgrade:function(w){if(w.__CE_state===void 0){var D=w.localName,F=v.get(D);F?F.push(w):i.u.has(D)&&l.push(w)}}}),a=0;a<l.length;a++)pt(i.h,l[a]);for(a=0;a<u.length;a++){for(var h=u[a],g=v.get(h),_=0;_<g.length;_++)pt(i.h,g[_]);(h=i.B.get(h))&&h.resolve(void 0)}u.length=0}}B.prototype.get=function(i){if(i=gt(this,i))return i.constructorFunction},B.prototype.whenDefined=function(i){if(!yn(i))return Promise.reject(new SyntaxError("'"+i+"' is not a valid custom element name."));var l=this.B.get(i);if(l)return l.F;l=new kn,this.B.set(i,l);var u=this.u.has(i)||this.s.has(i);return i=this.v.indexOf(i)===-1,u&&i&&l.resolve(void 0),l.F},B.prototype.polyfillWrapFlushCallback=function(i){this.D&&xn(this.D);var l=this.o;this.o=function(u){return i(function(){return l(u)})}};function gt(i,l){var u=i.u.get(l);if(u)return u;if(u=i.s.get(l)){i.s.delete(l);try{return $n(i,l,u())}catch(v){He(v)}}}B.prototype.define=B.prototype.define,B.prototype.upgrade=B.prototype.upgrade,B.prototype.get=B.prototype.get,B.prototype.whenDefined=B.prototype.whenDefined,B.prototype.polyfillDefineLazy=B.prototype.H,B.prototype.polyfillWrapFlushCallback=B.prototype.polyfillWrapFlushCallback;function qt(i,l,u){function v(a){return function(h){for(var g=[],_=0;_<arguments.length;++_)g[_]=arguments[_];_=[];for(var w=[],D=0;D<g.length;D++){var F=g[D];if(F instanceof Element&&P(F)&&w.push(F),F instanceof DocumentFragment)for(F=F.firstChild;F;F=F.nextSibling)_.push(F);else _.push(F)}for(a.apply(this,g),g=0;g<w.length;g++)oe(i,w[g]);if(P(this))for(g=0;g<_.length;g++)w=_[g],w instanceof Element&&ve(i,w)}}u.prepend!==void 0&&(l.prepend=v(u.prepend)),u.append!==void 0&&(l.append=v(u.append))}function jr(i){Document.prototype.createElement=function(l){return En(i,this,l,null)},Document.prototype.importNode=function(l,u){return l=n.call(this,l,!!u),this.__CE_registry?we(i,l):jt(i,l),l},Document.prototype.createElementNS=function(l,u){return En(i,this,u,l)},qt(i,Document.prototype,{prepend:r,append:o})}function qr(i){function l(v){return function(a){for(var h=[],g=0;g<arguments.length;++g)h[g]=arguments[g];g=[];for(var _=[],w=0;w<h.length;w++){var D=h[w];if(D instanceof Element&&P(D)&&_.push(D),D instanceof DocumentFragment)for(D=D.firstChild;D;D=D.nextSibling)g.push(D);else g.push(D)}for(v.apply(this,h),h=0;h<_.length;h++)oe(i,_[h]);if(P(this))for(h=0;h<g.length;h++)_=g[h],_ instanceof Element&&ve(i,_)}}var u=Element.prototype;q!==void 0&&(u.before=l(q)),V!==void 0&&(u.after=l(V)),K!==void 0&&(u.replaceWith=function(v){for(var a=[],h=0;h<arguments.length;++h)a[h]=arguments[h];h=[];for(var g=[],_=0;_<a.length;_++){var w=a[_];if(w instanceof Element&&P(w)&&g.push(w),w instanceof DocumentFragment)for(w=w.firstChild;w;w=w.nextSibling)h.push(w);else h.push(w)}for(_=P(this),K.apply(this,a),a=0;a<g.length;a++)oe(i,g[a]);if(_)for(oe(i,this),a=0;a<h.length;a++)g=h[a],g instanceof Element&&ve(i,g)}),ue!==void 0&&(u.remove=function(){var v=P(this);ue.call(this),v&&oe(i,this)})}function Br(i){function l(a,h){Object.defineProperty(a,"innerHTML",{enumerable:h.enumerable,configurable:!0,get:h.get,set:function(g){var _=this,w=void 0;if(P(this)&&(w=[],tt(i,this,function(Pe){Pe!==_&&w.push(Pe)})),h.set.call(this,g),w)for(var D=0;D<w.length;D++){var F=w[D];F.__CE_state===1&&i.disconnectedCallback(F)}return this.ownerDocument.__CE_registry?we(i,this):jt(i,this),g}})}function u(a,h){a.insertAdjacentElement=function(g,_){var w=P(_);return g=h.call(this,g,_),w&&oe(i,_),P(g)&&ve(i,_),g}}function v(a,h){function g(_,w){for(var D=[];_!==w;_=_.nextSibling)D.push(_);for(w=0;w<D.length;w++)we(i,D[w])}a.insertAdjacentHTML=function(_,w){if(_=_.toLowerCase(),_==="beforebegin"){var D=this.previousSibling;h.call(this,_,w),g(D||this.parentNode.firstChild,this)}else if(_==="afterbegin")D=this.firstChild,h.call(this,_,w),g(this.firstChild,D);else if(_==="beforeend")D=this.lastChild,h.call(this,_,w),g(D||this.firstChild,null);else if(_==="afterend")D=this.nextSibling,h.call(this,_,w),g(this.nextSibling,D);else throw new SyntaxError("The value provided ("+String(_)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.")}}E&&(Element.prototype.attachShadow=function(a){if(a=E.call(this,a),i.j&&!a.__CE_patched){a.__CE_patched=!0;for(var h=0;h<i.m.length;h++)i.m[h](a)}return this.__CE_shadowRoot=a}),S&&S.get?l(Element.prototype,S):ee&&ee.get?l(HTMLElement.prototype,ee):Pr(i,function(a){l(a,{enumerable:!0,configurable:!0,get:function(){return p.call(this,!0).innerHTML},set:function(h){var g=this.localName==="template",_=g?this.content:this,w=t.call(document,this.namespaceURI,this.localName);for(w.innerHTML=h;0<_.childNodes.length;)b.call(_,_.childNodes[0]);for(h=g?w.content:w;0<h.childNodes.length;)d.call(_,h.childNodes[0])}})}),Element.prototype.setAttribute=function(a,h){if(this.__CE_state!==1)return T.call(this,a,h);var g=y.call(this,a);T.call(this,a,h),h=y.call(this,a),i.attributeChangedCallback(this,a,g,h,null)},Element.prototype.setAttributeNS=function(a,h,g){if(this.__CE_state!==1)return O.call(this,a,h,g);var _=k.call(this,a,h);O.call(this,a,h,g),g=k.call(this,a,h),i.attributeChangedCallback(this,h,_,g,a)},Element.prototype.removeAttribute=function(a){if(this.__CE_state!==1)return N.call(this,a);var h=y.call(this,a);N.call(this,a),h!==null&&i.attributeChangedCallback(this,a,h,null,null)},$&&(Element.prototype.toggleAttribute=function(a,h){if(this.__CE_state!==1)return $.call(this,a,h);var g=y.call(this,a),_=g!==null;return h=$.call(this,a,h),_!==h&&i.attributeChangedCallback(this,a,g,h?"":null,null),h}),Element.prototype.removeAttributeNS=function(a,h){if(this.__CE_state!==1)return G.call(this,a,h);var g=k.call(this,a,h);G.call(this,a,h);var _=k.call(this,a,h);g!==_&&i.attributeChangedCallback(this,h,g,_,a)},$e?u(HTMLElement.prototype,$e):C&&u(Element.prototype,C),Qe?v(HTMLElement.prototype,Qe):A&&v(Element.prototype,A),qt(i,Element.prototype,{prepend:M,append:R}),qr(i)}var Nn={};function Yr(i){function l(){var u=this.constructor,v=document.__CE_registry.C.get(u);if(!v)throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var a=v.constructionStack;if(a.length===0)return a=e.call(document,v.localName),Object.setPrototypeOf(a,u.prototype),a.__CE_state=1,a.__CE_definition=v,Fe(i,a),a;var h=a.length-1,g=a[h];if(g===Nn)throw Error("Failed to construct '"+v.localName+"': This element was already constructed.");return a[h]=Nn,Object.setPrototypeOf(g,u.prototype),Fe(i,g),g}l.prototype=Y.prototype,Object.defineProperty(HTMLElement.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:l}),window.HTMLElement=l}function Wr(i){function l(u,v){Object.defineProperty(u,"textContent",{enumerable:v.enumerable,configurable:!0,get:v.get,set:function(a){if(this.nodeType===Node.TEXT_NODE)v.set.call(this,a);else{var h=void 0;if(this.firstChild){var g=this.childNodes,_=g.length;if(0<_&&P(this)){h=Array(_);for(var w=0;w<_;w++)h[w]=g[w]}}if(v.set.call(this,a),h)for(a=0;a<h.length;a++)oe(i,h[a])}}})}Node.prototype.insertBefore=function(u,v){if(u instanceof DocumentFragment){var a=Ft(u);if(u=f.call(this,u,v),P(this))for(v=0;v<a.length;v++)ve(i,a[v]);return u}return a=u instanceof Element&&P(u),v=f.call(this,u,v),a&&oe(i,u),P(this)&&ve(i,u),v},Node.prototype.appendChild=function(u){if(u instanceof DocumentFragment){var v=Ft(u);if(u=d.call(this,u),P(this))for(var a=0;a<v.length;a++)ve(i,v[a]);return u}return v=u instanceof Element&&P(u),a=d.call(this,u),v&&oe(i,u),P(this)&&ve(i,u),a},Node.prototype.cloneNode=function(u){return u=p.call(this,!!u),this.ownerDocument.__CE_registry?we(i,u):jt(i,u),u},Node.prototype.removeChild=function(u){var v=u instanceof Element&&P(u),a=b.call(this,u);return v&&oe(i,u),a},Node.prototype.replaceChild=function(u,v){if(u instanceof DocumentFragment){var a=Ft(u);if(u=m.call(this,u,v),P(this))for(oe(i,v),v=0;v<a.length;v++)ve(i,a[v]);return u}a=u instanceof Element&&P(u);var h=m.call(this,u,v),g=P(this);return g&&oe(i,v),a&&oe(i,u),g&&ve(i,u),h},x&&x.get?l(Node.prototype,x):Hr(i,function(u){l(u,{enumerable:!0,configurable:!0,get:function(){for(var v=[],a=this.firstChild;a;a=a.nextSibling)a.nodeType!==Node.COMMENT_NODE&&v.push(a.textContent);return v.join("")},set:function(v){for(;this.firstChild;)b.call(this,this.firstChild);v!=null&&v!==""&&d.call(this,document.createTextNode(v))}})})}var pe=window.customElements;function An(){var i=new vt;Yr(i),jr(i),qt(i,DocumentFragment.prototype,{prepend:s,append:c}),Wr(i),Br(i),window.CustomElementRegistry=B,i=new B(i),document.__CE_registry=i,Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:i})}pe&&!pe.forcePolyfill&&typeof pe.define=="function"&&typeof pe.get=="function"||An(),window.__CE_installPolyfill=An}).call(self);const ot=1,an=2,Vr=4,Vn=8,Xr=16,Gt=64,Gr=2,Kr=1,Jr=2,bt="[",Xn="]",Zr="",Gn=`${Xn}!`,Kt={},je=Symbol(),On=["touchstart","touchmove","touchend"];function Qr(e){console.warn("hydration_mismatch")}let Q=!1;function Ee(e){Q=e}let Re=null,De;function eo(e){Re=e,De=e&&e[0]}function ze(e){if(e.nodeType!==8)return e;var t=e;if(t.data!==bt)return e;for(var n=[],r=0;(t=t.nextSibling)!==null;){if(t.nodeType===8){var o=t.data;if(o===bt)r+=1;else if(o[0]===Xn){if(r===0)return Re=n,De=n[0],t;r-=1}}n.push(t)}throw Qr(),Kt}var Ue=Array.isArray,to=Array.from,wt=Object.keys,Kn=Object.isFrozen,it=Object.defineProperty,Jt=Object.getOwnPropertyDescriptor,no=Object.prototype,ro=Array.prototype,oo=Object.getPrototypeOf;const Oe=2,Jn=4,Xe=8,Zn=16,_e=32,un=64,Te=128,yt=256,de=512,be=1024,Le=2048,Me=4096,Ge=8192,io=16384,cn=32768,X=Symbol("$state"),so=Symbol("$state.frozen"),lo=Symbol("");function Qn(e){return e===this.v}function ao(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function uo(e){return!ao(e,this.v)}function co(e){throw new Error("effect_in_teardown")}function fo(){throw new Error("effect_in_unowned_derived")}function ho(e){throw new Error("effect_orphan")}function vo(){throw new Error("effect_update_depth_exceeded")}function po(){throw new Error("hydration_failed")}function go(e){throw new Error("props_invalid_value")}function mo(){throw new Error("state_unsafe_mutation")}function re(e){return{f:0,reactions:null,equals:Qn,v:e,version:0}}function Et(e){var n;const t=re(e);return t.equals=uo,U!==null&&U.l!==null&&((n=U.l).s??(n.s=[])).push(t),t}function j(e,t){var n=e.v!==je;return!me&&n&&J!==null&&en()&&J.f&Oe&&mo(),e.equals(t)||(e.v=t,e.version++,en()&&n&&I!==null&&I.f&de&&!(I.f&_e)&&(z!==null&&z.includes(e)?(ae(I,be),Lt(I)):xe===null?To([e]):xe.push(e)),hn(e,be,!0)),t}function se(e,t=!0,n=null,r){if(typeof e=="object"&&e!=null&&!Kn(e)&&!(so in e)){if(X in e){const s=e[X];if(s.t===e||s.p===e)return s.p}const o=oo(e);if(o===no||o===ro){const s=new Proxy(e,_o);return it(e,X,{value:{s:new Map,v:re(0),a:Ue(e),i:t,p:s,t:e},writable:!0,enumerable:!1}),s}}return e}function Ln(e,t=1){j(e,e.v+t)}const _o={defineProperty(e,t,n){if(n.value){const r=e[X],o=r.s.get(t);o!==void 0&&j(o,se(n.value,r.i,r))}return Reflect.defineProperty(e,t,n)},deleteProperty(e,t){const n=e[X],r=n.s.get(t),o=n.a,s=delete e[t];if(o&&s){const c=n.s.get("length"),p=e.length-1;c!==void 0&&c.v!==p&&j(c,p)}return r!==void 0&&j(r,je),s&&Ln(n.v),s},get(e,t,n){var s;if(t===X)return Reflect.get(e,X);const r=e[X];let o=r.s.get(t);if(o===void 0&&(!(t in e)||(s=Jt(e,t))!=null&&s.writable)&&(o=(r.i?re:Et)(se(e[t],r.i,r)),r.s.set(t,o)),o!==void 0){const c=L(o);return c===je?void 0:c}return Reflect.get(e,t,n)},getOwnPropertyDescriptor(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);if(n&&"value"in n){const o=e[X].s.get(t);o&&(n.value=L(o))}return n},has(e,t){var s;if(t===X)return!0;const n=e[X],r=Reflect.has(e,t);let o=n.s.get(t);return(o!==void 0||I!==null&&(!r||(s=Jt(e,t))!=null&&s.writable))&&(o===void 0&&(o=(n.i?re:Et)(r?se(e[t],n.i,n):je),n.s.set(t,o)),L(o)===je)?!1:r},set(e,t,n,r){const o=e[X];let s=o.s.get(t);s===void 0&&(vn(()=>r[t]),s=o.s.get(t)),s!==void 0&&j(s,se(n,o.i,o));const c=o.a,p=!(t in e);if(c&&t==="length")for(let d=n;d<e.length;d+=1){const f=o.s.get(d+"");f!==void 0&&j(f,je)}if(e[t]=n,p){if(c){const d=o.s.get("length"),f=e.length;d!==void 0&&d.v!==f&&j(d,f)}Ln(o.v)}return!0},ownKeys(e){const t=e[X];return L(t.v),Reflect.ownKeys(e)}};function kt(e){if(e!==null&&typeof e=="object"&&X in e){var t=e[X];if(t)return t.p}return e}function bo(e,t){return Object.is(kt(e),kt(t))}function er(e){for(var t=0;t<e.length;t++)e[t]()}const wo=typeof requestIdleCallback>"u"?e=>setTimeout(e,1):requestIdleCallback;let Ct=!1,xt=!1,Zt=[],Qt=[];function tr(){Ct=!1;const e=Zt.slice();Zt=[],er(e)}function nr(){xt=!1;const e=Qt.slice();Qt=[],er(e)}function rr(e){Ct||(Ct=!0,queueMicrotask(tr)),Zt.push(e)}function yo(e){xt||(xt=!0,wo(nr)),Qt.push(e)}function Eo(){Ct&&tr(),xt&&nr()}function ko(e){let t=Oe|be;I===null&&(t|=Te);const n={deps:null,deriveds:null,equals:Qn,f:t,first:null,fn:e,last:null,reactions:null,v:null,version:0};if(J!==null&&J.f&Oe){var r=J;r.deriveds===null?r.deriveds=[n]:r.deriveds.push(n)}return n}function or(e){dn(e);var t=e.deriveds;if(t!==null){e.deriveds=null;for(var n=0;n<t.length;n+=1)Co(t[n])}}function ir(e,t){or(e);var n=lr(e),r=(qe||e.f&Te)&&e.deps!==null?Le:de;ae(e,r);var o=e.equals(n);return o||(e.v=n,hn(e,be,t)),o}function Co(e){or(e),Dt(e,0),ae(e,Ge),e.first=e.last=e.deps=e.reactions=e.fn=null}const sr=0,xo=1;let mt=sr,st=!1,Be=!1,fn=!1;function Mn(e){Be=e}function Rn(e){fn=e}function In(e){me=e}let Ae=[],Ye=0,J=null,I=null,z=null,W=0,xe=null;function To(e){xe=e}let me=!1,qe=!1,U=null;function en(){return U!==null&&U.l===null}function ut(e){var x;var t=e.f,n=(t&be)!==0,r=(t&Te)!==0;if(n&&!r)return!0;var o=(t&yt)!==0;if(t&Le||n&&r){var s=e.deps;if(s!==null)for(var c=s.length,p,d,f=0;f<c;f++){var b=s[f];!n&&ut(b)&&(p=ir(b,!0));var m=b.version;if(r){if(m>e.version)return e.version=m,!p;!qe&&!((x=b==null?void 0:b.reactions)!=null&&x.includes(e))&&(d=b.reactions,d===null?b.reactions=[e]:d.push(e))}else{if(e.f&be)return!0;o&&(m>e.version&&(e.version=m,n=!0),d=b.reactions,d===null?b.reactions=[e]:d.includes(e)||d.push(e))}}r||ae(e,de),o&&(e.f^=yt)}return n}function $o(e,t,n){throw e}function lr(e){const t=z,n=W,r=xe,o=J,s=qe,c=me;z=null,W=0,xe=null,J=e,qe=!Be&&(e.f&Te)!==0,me=!1;try{let p=(0,e.fn)(),d=e.deps;if(z!==null){let f;if(d!==null){const b=d.length,m=W===0?z:d.slice(0,W).concat(z),E=m.length>16&&b-W>1?new Set(m):null;for(f=W;f<b;f++){const S=d[f];(E!==null?!E.has(S):!m.includes(S))&&ar(e,S)}}if(d!==null&&W>0)for(d.length=W+z.length,f=0;f<z.length;f++)d[W+f]=z[f];else e.deps=d=z;if(!qe)for(f=W;f<d.length;f++){const b=d[f],m=b.reactions;m===null?b.reactions=[e]:m[m.length-1]!==e&&m.push(e)}}else d!==null&&W<d.length&&(Dt(e,W),d.length=W);return p}finally{z=t,W=n,xe=r,J=o,qe=s,me=c}}function ar(e,t){const n=t.reactions;let r=0;if(n!==null){r=n.length-1;const o=n.indexOf(e);o!==-1&&(r===0?t.reactions=null:(n[o]=n[r],n.pop()))}r===0&&t.f&Oe&&(ae(t,Le),t.f&(Te|yt)||(t.f^=yt),Dt(t,0))}function Dt(e,t){const n=e.deps;if(n!==null){const r=t===0?null:n.slice(0,t);let o;for(o=t;o<n.length;o++){const s=n[o];(r===null||!r.includes(s))&&ar(e,s)}}}function dn(e,t=!0){let n=e.first;e.first=null,e.last=null;for(var r;n!==null;)r=n.next,ht(n,t),n=r}function Ot(e){var t=e.f;if(!(t&Ge)){ae(e,de);var n=e.ctx,r=I,o=U;I=e,U=n;try{t&Zn||dn(e),pr(e);var s=lr(e);e.teardown=typeof s=="function"?s:null}catch(c){$o(c)}finally{I=r,U=o}}}function ur(){Ye>1e3&&(Ye=0,vo()),Ye++}function cr(e){const t=e.length;if(t!==0){ur();var n=Be;Be=!0;try{for(var r=0;r<t;r++){var o=e[r];if(o.first===null&&!(o.f&_e))Fn([o]);else{var s=[];fr(o,s),Fn(s)}}}finally{Be=n}}}function Fn(e){var t=e.length;if(t!==0)for(var n=0;n<t;n++){var r=e[n];!(r.f&(Ge|Me))&&ut(r)&&Ot(r)}}function So(){if(st=!1,Ye>1001)return;const e=Ae;Ae=[],cr(e),st||(Ye=0)}function Lt(e){mt===sr&&(st||(st=!0,queueMicrotask(So)));for(var t=e;t.parent!==null;){t=t.parent;var n=t.f;if(n&_e){if(!(n&de))return;ae(t,Le)}}Ae.push(t)}function fr(e,t){var n=e.first,r=[];e:for(;n!==null;){var o=n.f,s=(o&(Ge|Me))===0,c=o&_e,p=(o&de)!==0,d=n.first;if(s&&(!c||!p)){if(c&&ae(n,de),o&Xe){if(!c&&ut(n)&&(Ot(n),d=n.first),d!==null){n=d;continue}}else if(o&Jn)if(c||p){if(d!==null){n=d;continue}}else r.push(n)}var f=n.next;if(f===null){let x=n.parent;for(;x!==null;){if(e===x)break e;var b=x.next;if(b!==null){n=b;continue e}x=x.parent}}n=f}for(var m=0;m<r.length;m++)d=r[m],t.push(d),fr(d,t)}function Ie(e,t=!0){var n=mt,r=Ae;try{ur();const s=[];mt=xo,Ae=s,st=!1,t&&cr(r);var o=e==null?void 0:e();return Eo(),(Ae.length>0||s.length>0)&&Ie(),Ye=0,o}finally{mt=n,Ae=r}}function L(e){const t=e.f;if(t&Ge)return e.v;if(J!==null&&!(J.f&(_e|un))&&!me){const n=(J.f&Te)!==0,r=J.deps;z===null&&r!==null&&r[W]===e&&!(n&&I!==null)?W++:(r===null||W===0||r[W-1]!==e)&&(z===null?z=[e]:z[z.length-1]!==e&&z.push(e)),xe!==null&&I!==null&&I.f&de&&!(I.f&_e)&&xe.includes(e)&&(ae(I,be),Lt(I))}return t&Oe&&ut(e)&&ir(e,!1),e.v}function hn(e,t,n){var r=e.reactions;if(r!==null)for(var o=en(),s=r.length,c=0;c<s;c++){var p=r[c],d=p.f;if(!(d&be||(!n||!o)&&p===I)){ae(p,t);var f=(d&Le)!==0,b=(d&Te)!==0;(d&de||f&&b)&&(p.f&Oe?hn(p,Le,n):Lt(p))}}}function vn(e){const t=me;try{return me=!0,e()}finally{me=t}}const No=~(be|Le|de);function ae(e,t){e.f=e.f&No|t}function Ao(e){return typeof e=="object"&&e!==null&&typeof e.f=="number"}function ct(e,t=!1,n){U={p:U,c:null,e:null,m:!1,s:e,x:null,l:null},t||(U.l={s:null,u:null,r1:[],r2:re(!1)})}function ft(e){const t=U;if(t!==null){e!==void 0&&(t.x=e);const r=t.e;if(r!==null){t.e=null;for(var n=0;n<r.length;n++)Je(r[n])}U=t.p,t.m=!0}return e||{}}function Z(e){return Ao(e)?L(e):e}function Do(e){var t=document.createElement("template");return t.innerHTML=e,t.content}function pn(e){if(Ue(e))for(var t=0;t<e.length;t++){var n=e[t];n.isConnected&&n.remove()}else e.isConnected&&e.remove()}function Oo(e){I===null&&J===null&&ho(),fn&&co()}function Hn(e,t){var n=t.last;n===null?t.last=t.first=e:(n.next=e,e.prev=n,t.last=e)}function Ke(e,t,n){var r=(e&un)!==0,o={ctx:U,deps:null,dom:null,f:e|be,first:null,fn:t,last:null,next:null,parent:r?null:I,prev:null,teardown:null,transitions:null};if(J!==null&&!r){var s=J.f;s&Oe&&(s&Te&&fo(),I!==null&&Hn(o,I)),Hn(o,J)}if(n){var c=Be;try{Mn(!0),Ot(o),o.f|=io}finally{Mn(c)}}else t!==null&&Lt(o);return o}function dr(e){const t=Ke(Xe,null,!1);return ae(t,de),t.teardown=e,t}function hr(e){Oo();var t=I!==null&&(I.f&Xe)!==0&&U!==null&&!U.m;if(t){var n=U;(n.e??(n.e=[])).push(e)}else{var r=Je(e);return r}}function Lo(e){const t=Ke(un,e,!0);return()=>{ht(t)}}function Je(e){return Ke(Jn,e,!1)}function dt(e){return Ke(Xe,e,!0)}function Ce(e){return dt(e)}function vr(e,t=0){return Ke(Xe|Zn|t,e,!0)}function lt(e){return Ke(Xe|_e,e,!0)}function pr(e){var t=e.teardown;if(t!==null){const n=fn,r=me;Rn(!0),In(!0);try{t.call(null)}finally{Rn(n),In(r)}}}function ht(e,t=!0){var n=e.dom;if(n!==null&&t&&pn(n),dn(e,t),Dt(e,0),ae(e,Ge),e.transitions)for(const c of e.transitions)c.stop();pr(e);var r=e.parent;if(r!==null&&e.f&_e&&r.first!==null){var o=e.prev,s=e.next;o!==null?s!==null?(o.next=s,s.prev=o):(o.next=null,r.last=o):s!==null?(s.prev=null,r.first=s):(r.first=null,r.last=null)}e.next=e.prev=e.teardown=e.ctx=e.dom=e.deps=e.parent=e.fn=null}function tn(e,t){var n=[];gn(e,n,!0),gr(n,()=>{ht(e),t&&t()})}function gr(e,t){var n=e.length;if(n>0){var r=()=>--n||t();for(var o of e)o.out(r)}else t()}function gn(e,t,n){if(!(e.f&Me)){if(e.f^=Me,e.transitions!==null)for(const c of e.transitions)(c.is_global||n)&&t.push(c);for(var r=e.first;r!==null;){var o=r.next,s=(r.f&cn)!==0||(r.f&_e)!==0;gn(r,t,s?n:!1),r=o}}}function Tt(e){mr(e,!0)}function mr(e,t){if(e.f&Me){e.f^=Me,ut(e)&&Ot(e);for(var n=e.first;n!==null;){var r=n.next,o=(n.f&cn)!==0||(n.f&_e)!==0;mr(n,o?t:!1),n=r}if(e.transitions!==null)for(const s of e.transitions)(s.is_global||t)&&s.in()}}var $t,Se;function _r(){if($t===void 0){$t=window,Se=document;var e=Element.prototype;e.__click=void 0,e.__className="",e.__attributes=null,e.__e=void 0,Text.prototype.__t=void 0}}function Ze(){return document.createTextNode("")}function le(e){const t=e.firstChild;return Q?t===null?e.appendChild(Ze()):ze(t):t}function Mt(e,t){return Q?ze(De):e.firstChild}function H(e,t=!1){var n=e.nextSibling;if(!Q)return n;var r=n.nodeType;if(r===8&&n.data===Zr)return H(n,t);if(t&&r!==3){var o=Ze(),s=I.dom;return s.unshift(o),n==null||n.before(o),o}return ze(n)}function mn(e){e.textContent=""}function Mo(e){return document.createElement(e)}function Ro(e,t,n,r){function o(s){if(r.capture||nn(t,s),!s.cancelBubble)return n.call(this,s)}return e.startsWith("pointer")||e==="wheel"?rr(()=>{t.addEventListener(e,o,r)}):t.addEventListener(e,o,r),o}function ge(e,t,n,r,o){var s={capture:r,passive:o},c=Ro(e,t,n,s);(t===document.body||t===window||t===document)&&dr(()=>{t.removeEventListener(e,c,s)})}function br(e){for(var t=0;t<e.length;t++)wr.add(e[t]);for(var n of rn)n(e)}function nn(e,t){var T;var n=e.ownerDocument,r=t.type,o=((T=t.composedPath)==null?void 0:T.call(t))||[],s=o[0]||t.target,c=0,p=t.__root;if(p){var d=o.indexOf(p);if(d!==-1&&(e===document||e===window)){t.__root=e;return}var f=o.indexOf(e);if(f===-1)return;d<=f&&(c=d+1)}s=o[c]||t.target,it(t,"currentTarget",{configurable:!0,get(){return s||n}});try{for(var b,m=[];s!==null;){var x=s.parentNode||s.host||null;try{var E=s["__"+r];if(E!==void 0&&!s.disabled)if(Ue(E)){var[S,...y]=E;S.apply(s,[t,...y])}else E.call(s,t)}catch(N){b?m.push(N):b=N}if(t.cancelBubble||x===e||x===null||s===e)break;s=x}if(b){for(let N of m)queueMicrotask(()=>{throw N});throw b}}finally{t.__root=e,s=e}}const wr=new Set,rn=new Set;function Wt(e,t){(e.__t??(e.__t=e.nodeValue))!==t&&(e.nodeValue=e.__t=t)}function yr(e,t){const n=t.anchor??t.target.appendChild(Ze());return Ie(()=>Er(e,{...t,anchor:n}),!1)}function Io(e,t){const n=t.target,r=Re;try{return Ie(()=>{Ee(!0);for(var o=n.firstChild;o&&(o.nodeType!==8||o.data!==bt);)o=o.nextSibling;if(!o)throw Kt;const s=ze(o),c=Er(e,{...t,anchor:s});return Ee(!1),c},!1)}catch(o){if(o===Kt)return t.recover===!1&&po(),_r(),mn(n),Ee(!1),yr(e,t);throw o}finally{Ee(!!r),eo(r)}}function Er(e,{target:t,anchor:n,props:r={},events:o,context:s,intro:c=!1}){_r();const p=new Set,d=nn.bind(null,t),f=nn.bind(null,document),b=E=>{for(let S=0;S<E.length;S++){const y=E[S];p.has(y)||(p.add(y),t.addEventListener(y,d,On.includes(y)?{passive:!0}:void 0),document.addEventListener(y,f,On.includes(y)?{passive:!0}:void 0))}};b(to(wr)),rn.add(b);let m;const x=Lo(()=>(lt(()=>{if(s){ct({});var E=U;E.c=s}o&&(r.$$events=o),m=e(n,r)||{},s&&ft()}),()=>{for(const E of p)t.removeEventListener(E,d);rn.delete(b),on.delete(m)}));return on.set(m,x),m}let on=new WeakMap;function Fo(e){const t=on.get(e);t==null||t()}async function _n(e,t,n){await Promise.resolve();const r=Ho(e);if(!r.getElementById(t)){const o=Mo("style");o.id=t,o.textContent=n,(r.head||r).appendChild(o)}}function Ho(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function at(e,t,n,r=null,o=!1){var s=null,c=null,p=null,d=o?cn:0;vr(()=>{if(p===(p=!!t()))return;let f=!1;if(Q){const b=e.data===Gn;p===b&&(pn(Re),Ee(!1),f=!0)}p?(s?Tt(s):s=lt(()=>n(e)),c&&tn(c,()=>{c=null})):(c?Tt(c):r&&(c=lt(()=>r(e))),s&&tn(s,()=>{s=null})),f&&Ee(!0)},d)}let zt=null;function Po(e,t){return t}function jo(e,t,n){for(var r=[],o=e.length,s=0;s<o;s++)gn(e[s].e,r,!0);var c=o>0&&r.length===0&&t!==null;if(c){var p=t.parentNode;mn(p),p.append(t),n.clear(),ke(e[0].prev,e[o-1].next)}gr(r,()=>{for(var d=0;d<o;d++){var f=e[d];c||(n.delete(f.k),f.o.remove(),ke(f.prev,f.next)),ht(f.e,!c)}})}function bn(e,t,n,r,o,s=null){var c={flags:t,items:new Map,next:null},p=(t&Vn)!==0;if(p){var d=e;e=Q?ze(d.firstChild):d.appendChild(Ze())}var f=null;vr(()=>{var b=n(),m=Ue(b)?b:b==null?[]:Array.from(b),x=m.length,E=c.flags;E&Gt&&!Kn(m)&&!(X in m)&&(E^=Gt,E&Vr&&!(E&ot)&&(E^=ot));let S=!1;if(Q){var y=e.data===Gn;y!==(x===0)&&(pn(Re),Ee(!1),S=!0)}if(Q){for(var T=De,N=c,$,k=0;k<x;k++){if(T.nodeType!==8||T.data!==bt){S=!0,Ee(!1);break}var O=T;T=ze(T);var G=m[k],C=r(G,k);$=kr(O,T,N,null,G,C,k,o,E),c.items.set(C,$),T=T.nextSibling,N=$}if(x>0)for(;T!==e;){var A=T.nextSibling;T.remove(),T=A}}Q||qo(m,c,e,o,E,r),s!==null&&(x===0?f?Tt(f):f=lt(()=>s(e)):f!==null&&tn(f,()=>{f=null})),S&&Ee(!0)})}function qo(e,t,n,r,o,s){var Y,ee,$e,Qe;var c=(o&Xr)!==0,p=(o&(ot|an))!==0,d=e.length,f=t.items,b=t.next,m=b,x=new Set,E=t,S=new Set,y=[],T=[],N,$,k,O;if(c)for(O=0;O<d;O+=1)N=e[O],$=s(N,O),k=f.get($),k!==void 0&&((Y=k.a)==null||Y.measure(),S.add(k));for(O=0;O<d;O+=1){if(N=e[O],$=s(N,O),k=f.get($),k===void 0){var G=Ze(),C=m?m.o:n;C.before(G),E=kr(G,C,E,E.next,N,$,O,r,o),f.set($,E),y=[],T=[],m=E.next;continue}if(p&&Bo(k,N,O,o),k.e.f&Me&&(Tt(k.e),c&&((ee=k.a)==null||ee.unfix(),S.delete(k))),k!==m){if(x.has(k)){if(y.length<T.length){var A=T[0],M;E=A.prev;var R=y[0],q=y[y.length-1];for(M=0;M<y.length;M+=1)Pn(y[M],A,n);for(M=0;M<T.length;M+=1)x.delete(T[M]);ke(R.prev,q.next),ke(E,R),ke(q,A),m=A,E=q,O-=1,y=[],T=[]}else x.delete(k),Pn(k,m,n),ke(k.prev,k.next),ke(k,E.next),ke(E,k),E=k;continue}for(y=[],T=[];m!==null&&m.k!==$;)x.add(m),T.push(m),m=m.next;if(m===null)continue;k=m}y.push(k),E=k,m=k.next}const V=Array.from(x);for(;m!==null;)V.push(m),m=m.next;var K=V.length;if(K>0){var ue=o&Vn&&d===0?n:null;if(c){for(O=0;O<K;O+=1)($e=V[O].a)==null||$e.measure();for(O=0;O<K;O+=1)(Qe=V[O].a)==null||Qe.fix()}jo(V,ue,f)}c&&Je(()=>{vn(()=>{var et;for(k of S)(et=k.a)==null||et.apply()})})}function Bo(e,t,n,r){r&ot&&j(e.v,t),r&an?j(e.i,n):e.i=n}function kr(e,t,n,r,o,s,c,p,d){var f=zt;try{var b=(d&ot)!==0,m=(d&Gt)===0,x=b?m?Et(o):re(o):o,E=d&an?re(c):c,S={i:E,v:x,k:s,a:null,e:null,o:e,prev:n,next:r};return n.next=S,r!==null&&(r.prev=S),zt=S,S.e=lt(()=>p(t,x,E)),S}finally{zt=f}}function Pn(e,t,n){for(var r=e.next?e.next.o:n,o=t?t.o:n,s=e.o;s!==r;){var c=s.nextSibling;o.before(s),s=c}}function ke(e,t){e.next=t,t!==null&&(t.prev=e)}function St(e,t=I){var n=t.dom;return n===null?t.dom=e:(Ue(n)||(n=t.dom=[n]),Ue(e)?n.push(...e):n.push(e)),e}function he(e,t){var n=(t&Kr)!==0,r=(t&Jr)!==0,o;return()=>{if(Q)return St(n?Re:De),De;o||(o=Do(e),n||(o=o.firstChild));var s=r?document.importNode(o,!0):o.cloneNode(!0);return St(n?[...s.childNodes]:s),s}}function Cr(){if(Q)return St(Re),De;var e=document.createDocumentFragment(),t=Ze();return e.append(t),St([t]),e}function ne(e,t){Q||e.before(t)}function Yo(e,t){{const n=document.body;e.autofocus=!0,Je(()=>{document.activeElement===n&&e.focus()})}}function Wo(e){Q&&e.firstChild!==null&&mn(e)}let jn=!1;function xr(){jn||(jn=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const n of e.target.elements)(t=n.__on_r)==null||t.call(n)})},{capture:!0}))}function zo(e){if(Q){let t=!1;const n=()=>{if(t)return;t=!0;const r=e.getAttribute("value");fe(e,"value",null),fe(e,"checked",null),r&&(e.value=r)};e.__on_r=n,yo(n),xr()}}function Uo(e,t){var n=e.__attributes??(e.__attributes={});n.value!==(n.value=t)&&(e.value=t)}function fe(e,t,n){n=n==null?null:n+"";var r=e.__attributes??(e.__attributes={});Q&&(r[t]=e.getAttribute(t),t==="src"||t==="href"||t==="srcset")||r[t]!==(r[t]=n)&&(t==="loading"&&(e[lo]=n),n===null?e.removeAttribute(t):e.setAttribute(t,n))}function sn(e,t,n){n?e.classList.add(t):e.classList.remove(t)}function Tr(e,t,n,r=n){e.addEventListener(t,n);const o=e.__on_r;o?e.__on_r=()=>{o(),r()}:e.__on_r=r,xr()}function Vo(e,t,n){Tr(e,"input",()=>{n(qn(e)?Bn(e.value):e.value)}),dt(()=>{var r=t();e.__value=r,!(qn(e)&&r===Bn(e.value))&&(e.type==="date"&&!r&&!e.value||(e.value=r??""))})}function Xo(e,t,n,r,o){var s=n.getAttribute("type")==="checkbox",c=e;if(t!==null)for(var p of t){var d=c;c=d[p],c===void 0&&(c=d[p]=[])}c.push(n),Tr(n,"change",()=>{var f=n.__value;s&&(f=Go(c,f,n.checked)),o(f)},()=>o(s?[]:null)),dt(()=>{var f=r();s?(f=f||[],n.checked=kt(f).includes(kt(n.__value))):n.checked=bo(n.__value,f)}),dr(()=>{var f=c.indexOf(n);f!==-1&&c.splice(f,1)}),Je(()=>{c.sort((f,b)=>f.compareDocumentPosition(b)===4?-1:1)})}function Go(e,t,n){for(var r=new Set,o=0;o<e.length;o+=1)e[o].checked&&r.add(e[o].__value);return n||r.delete(t),Array.from(r)}function qn(e){var t=e.type;return t==="number"||t==="range"}function Bn(e){return e===""?null:+e}function Yn(e,t){var r;var n=e&&((r=e[X])==null?void 0:r.t);return e===t||n===t}function ln(e,t,n,r){Je(()=>{var o,s;return dt(()=>{o=s,s=[],vn(()=>{e!==n(...s)&&(t(e,...s),o&&Yn(n(...o),e)&&t(null,...o))})}),()=>{rr(()=>{s&&Yn(n(...s),e)&&t(null,...s)})}})}function Rt(e,t,n,r){var E;var o=(n&Gr)!==0,s=e[t],c=(E=Jt(e,t))==null?void 0:E.set,p=r,d=()=>p;s===void 0&&r!==void 0&&(c&&o&&go(),s=d(),c&&c(s));var f;if(f=()=>{var S=e[t];return S===void 0?d():S},c)return function(S){return arguments.length===1?(c(S),S):f()};var b=!1,m=Et(s),x=ko(()=>{var S=f(),y=L(m);return b?(b=!1,y):m.v=S});return function(S){var y=L(x);return arguments.length>0?(x.equals(S)||(b=!0,j(m,S),L(x),x.version++),S):y}}function Ko(e){return new Jo(e)}var ye,ie;class Jo{constructor(t){Bt(this,ye,void 0);Bt(this,ie,void 0);const n=se({...t.props||{},$$events:{}},!1);Yt(this,ie,(t.hydrate?Io:yr)(t.component,{target:t.target,props:n,context:t.context,intro:t.intro,recover:t.recover})),Yt(this,ye,n.$$events);for(const r of Object.keys(te(this,ie)))r==="$set"||r==="$destroy"||r==="$on"||it(this,r,{get(){return te(this,ie)[r]},set(o){te(this,ie)[r]=o},enumerable:!0});te(this,ie).$set=r=>{Object.assign(n,r)},te(this,ie).$destroy=()=>{Fo(te(this,ie))}}$set(t){te(this,ie).$set(t)}$on(t,n){te(this,ye)[t]=te(this,ye)[t]||[];const r=(...o)=>n.call(this,...o);return te(this,ye)[t].push(r),()=>{te(this,ye)[t]=te(this,ye)[t].filter(o=>o!==r)}}$destroy(){te(this,ie).$destroy()}}ye=new WeakMap,ie=new WeakMap;let $r;typeof HTMLElement=="function"&&($r=class extends HTMLElement{constructor(t,n,r){super();ce(this,"$$ctor");ce(this,"$$s");ce(this,"$$c");ce(this,"$$cn",!1);ce(this,"$$d",{});ce(this,"$$r",!1);ce(this,"$$p_d",{});ce(this,"$$l",{});ce(this,"$$l_u",new Map);ce(this,"$$me");this.$$ctor=t,this.$$s=n,r&&this.attachShadow({mode:"open"})}addEventListener(t,n,r){if(this.$$l[t]=this.$$l[t]||[],this.$$l[t].push(n),this.$$c){const o=this.$$c.$on(t,n);this.$$l_u.set(n,o)}super.addEventListener(t,n,r)}removeEventListener(t,n,r){if(super.removeEventListener(t,n,r),this.$$c){const o=this.$$l_u.get(n);o&&(o(),this.$$l_u.delete(n))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){let t=function(o){return s=>{const c=document.createElement("slot");o!=="default"&&(c.name=o),ne(s,c)}};if(await Promise.resolve(),!this.$$cn||this.$$c)return;const n={},r=Zo(this);for(const o of this.$$s)o in r&&(o==="default"&&!this.$$d.children?(this.$$d.children=t(o),n.default=!0):n[o]=t(o));for(const o of this.attributes){const s=this.$$g_p(o.name);s in this.$$d||(this.$$d[s]=_t(s,o.value,this.$$p_d,"toProp"))}for(const o in this.$$p_d)!(o in this.$$d)&&this[o]!==void 0&&(this.$$d[o]=this[o],delete this[o]);this.$$c=Ko({component:this.$$ctor,target:this.shadowRoot||this,props:{...this.$$d,$$slots:n,$$host:this}}),this.$$me=dt(()=>{var o;this.$$r=!0;for(const s of wt(this.$$c)){if(!((o=this.$$p_d[s])!=null&&o.reflect))continue;this.$$d[s]=this.$$c[s];const c=_t(s,this.$$d[s],this.$$p_d,"toAttribute");c==null?this.removeAttribute(this.$$p_d[s].attribute||s):this.setAttribute(this.$$p_d[s].attribute||s,c)}this.$$r=!1});for(const o in this.$$l)for(const s of this.$$l[o]){const c=this.$$c.$on(o,s);this.$$l_u.set(s,c)}this.$$l={}}}attributeChangedCallback(t,n,r){var o;this.$$r||(t=this.$$g_p(t),this.$$d[t]=_t(t,r,this.$$p_d,"toProp"),(o=this.$$c)==null||o.$set({[t]:this.$$d[t]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then(()=>{!this.$$cn&&this.$$c&&(this.$$c.$destroy(),ht(this.$$me),this.$$c=void 0)})}$$g_p(t){return wt(this.$$p_d).find(n=>this.$$p_d[n].attribute===t||!this.$$p_d[n].attribute&&n.toLowerCase()===t)||t}});function _t(e,t,n,r){var s;const o=(s=n[e])==null?void 0:s.type;if(t=o==="Boolean"&&typeof t!="boolean"?t!=null:t,!r||!n[e])return t;if(r==="toAttribute")switch(o){case"Object":case"Array":return t==null?null:JSON.stringify(t);case"Boolean":return t?"":null;case"Number":return t??null;default:return t}else switch(o){case"Object":case"Array":return t&&JSON.parse(t);case"Boolean":return t;case"Number":return t!=null?+t:t;default:return t}}function Zo(e){const t={};return e.childNodes.forEach(n=>{t[n.slot||"default"]=!0}),t}function It(e,t,n,r,o,s){let c=class extends $r{constructor(){super(e,n,o),this.$$p_d=t}static get observedAttributes(){return wt(t).map(p=>(t[p].attribute||p).toLowerCase())}};return wt(t).forEach(p=>{it(c.prototype,p,{get(){return this.$$c&&p in this.$$c?this.$$c[p]:this.$$d[p]},set(d){var f;d=_t(p,d,t),this.$$d[p]=d,(f=this.$$c)==null||f.$set({[p]:d})}})}),r.forEach(p=>{it(c.prototype,p,{get(){var d;return(d=this.$$c)==null?void 0:d[p]}})}),e.element=c,c}const Ve=new Map([["yellow","#F8B920"],["red","#FF4646"],["blue","#0064FF"],["green","#00C564"]]),Qo=["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","OPTION"];function Sr(e){const t=e.map(c=>c.trim().toLocaleLowerCase()),n=t.map(()=>({start:null,end:null,shift:0})),r=t.map(()=>[]),o=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,c=>{var p,d;return Qo.includes((p=c.parentNode)==null?void 0:p.tagName)||!((d=c.parentNode)!=null&&d.checkVisibility())?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let s;for(;s=o.nextNode();)if(s!=null&&s.nodeValue)for(let c=0;c<s.nodeValue.length;c++){const p=s.nodeValue[c].toLocaleLowerCase().trim();p&&t.forEach((d,f)=>{var m;for(;d[n[f].shift]&&!d[n[f].shift].trim();)n[f].shift++;let b=d[n[f].shift]===p;if(!b&&n[f].shift&&(n[f].shift=0,b=d[n[f].shift]===p),b&&(n[f].shift||(n[f].start=[s,c]),n[f].end=[s,c],n[f].shift++),n[f].shift>=d.length){const x=document.createRange();x.setStart(n[f].start[0],n[f].start[1]),x.setEnd(n[f].end[0],n[f].end[1]+1),!x.collapsed&&((m=x.commonAncestorContainer.parentElement)!=null&&m.checkVisibility())?r[f].push(x):x.detach(),b=!1}b||(n[f].shift=0,n[f].start=null,n[f].end=null)})}return r}const We=`rh-${new Date().getTime()}-`,wn="highlights"in CSS;function ei(e){if(!e.length&&!CSS.highlights.size)return;const t=[];if(CSS.highlights.clear(),e.length){const r=Sr(e.map(({text:o})=>o));for(const o in e){if(!r[o].length)continue;const{_id:s,color:c}=e[o],p=`${We}${s}`;CSS.highlights.set(p,new Highlight(...r[o]));const d=r[o][0].getBoundingClientRect();t.push(`
                ::highlight(${p}) {
                    all: unset;
                    background-color: color-mix(in srgb, ${Ve.get(c)||c}, transparent 50%) !important;
                }

                :root {
                    --highlight-${s}-top: ${(100/document.documentElement.scrollHeight*(window.scrollY+d.top-10)).toFixed(2)}%;
                }
            `);for(const f of r[o])f.detach()}}const n=(()=>{let r=document.getElementById(We);return r||(r=document.createElement("style"),r.id=We,document.head.appendChild(r)),r})();n.innerHTML=t.join(`
`)}function ti(e){var t;for(const[n,r]of CSS.highlights){const o=n.replace(We,"");if(e==o)for(const s of r){(t=s.startContainer.parentElement)==null||t.scrollIntoView({behavior:"smooth",block:"start"});break}}}function ni(e){let t;for(const[n,r]of CSS.highlights)for(const o of r){const s=e.compareBoundaryPoints(Range.START_TO_START,o),c=e.compareBoundaryPoints(Range.END_TO_END,o);(s==0&&c==0||e!=null&&e.collapsed&&s>=0&&c<=0)&&(t=[n.replace(We,""),o])}if(t)return t[0].replace(We,"")}const Ne=`rh-${new Date().getTime()}`;function ri(e){const t=document.body.querySelectorAll(`.${Ne}`);if(!e.length&&!t.length)return;t.forEach(s=>s.outerHTML=s.innerText);const n=[],r=Sr(e.map(({text:s})=>s));for(const s in e){const{_id:c,color:p}=e[s];for(const d of r[s]){const f=document.createElement("mark");f.className=Ne,f.setAttribute("data-id",String(c)),f.append(d.extractContents()),d.insertNode(f),d.detach()}n.push(`
            .${Ne}[data-id="${c}"] {
                all: unset;
                display: inline-block;
                background-color: ${si(Ve.get(p)||p,.5)} !important;
            }
        `)}const o=(()=>{let s=document.getElementById(Ne);return s||(s=document.createElement("style"),s.id=Ne,document.head.appendChild(s)),s})();o.innerHTML=n.join(`
`)}function oi(e){const t=document.body.querySelector(`.${Ne}[data-id="${e}"]`);t&&t.scrollIntoView({behavior:"smooth",block:"start"})}function ii(e){const t=e.commonAncestorContainer.nodeType==Node.ELEMENT_NODE?e.commonAncestorContainer:e.commonAncestorContainer.parentElement;if((t==null?void 0:t.className)==Ne){if(!e.collapsed){const n=new Range;n.selectNodeContents(e.commonAncestorContainer);const r=e.compareBoundaryPoints(Range.START_TO_START,n),o=e.compareBoundaryPoints(Range.END_TO_END,n);if(n.detach(),r!=0||o!=0)return}return t.getAttribute("data-id")||void 0}}function si(e,t){const n=parseInt(e.slice(1,3),16),r=parseInt(e.slice(3,5),16),o=parseInt(e.slice(5,7),16);return`rgba(${n}, ${r}, ${o}, ${t})`}function Nt(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var li=typeof global=="object"&&global&&global.Object===Object&&global,ai=typeof self=="object"&&self&&self.Object===Object&&self,Nr=li||ai||Function("return this")(),Ut=function(){return Nr.Date.now()},ui=/\s/;function ci(e){for(var t=e.length;t--&&ui.test(e.charAt(t)););return t}var fi=/^\s+/;function di(e){return e&&e.slice(0,ci(e)+1).replace(fi,"")}var At=Nr.Symbol,Ar=Object.prototype,hi=Ar.hasOwnProperty,vi=Ar.toString,nt=At?At.toStringTag:void 0;function pi(e){var t=hi.call(e,nt),n=e[nt];try{e[nt]=void 0;var r=!0}catch{}var o=vi.call(e);return r&&(t?e[nt]=n:delete e[nt]),o}var gi=Object.prototype,mi=gi.toString;function _i(e){return mi.call(e)}var bi="[object Null]",wi="[object Undefined]",Wn=At?At.toStringTag:void 0;function yi(e){return e==null?e===void 0?wi:bi:Wn&&Wn in Object(e)?pi(e):_i(e)}function Ei(e){return e!=null&&typeof e=="object"}var ki="[object Symbol]";function Ci(e){return typeof e=="symbol"||Ei(e)&&yi(e)==ki}var zn=NaN,xi=/^[-+]0x[0-9a-f]+$/i,Ti=/^0b[01]+$/i,$i=/^0o[0-7]+$/i,Si=parseInt;function Un(e){if(typeof e=="number")return e;if(Ci(e))return zn;if(Nt(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=Nt(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=di(e);var n=Ti.test(e);return n||$i.test(e)?Si(e.slice(2),n?2:8):xi.test(e)?zn:+e}var Ni="Expected a function",Ai=Math.max,Di=Math.min;function Oi(e,t,n){var r,o,s,c,p,d,f=0,b=!1,m=!1,x=!0;if(typeof e!="function")throw new TypeError(Ni);t=Un(t)||0,Nt(n)&&(b=!!n.leading,m="maxWait"in n,s=m?Ai(Un(n.maxWait)||0,t):s,x="trailing"in n?!!n.trailing:x);function E(C){var A=r,M=o;return r=o=void 0,f=C,c=e.apply(M,A),c}function S(C){return f=C,p=setTimeout(N,t),b?E(C):c}function y(C){var A=C-d,M=C-f,R=t-A;return m?Di(R,s-M):R}function T(C){var A=C-d,M=C-f;return d===void 0||A>=t||A<0||m&&M>=s}function N(){var C=Ut();if(T(C))return $(C);p=setTimeout(N,y(C))}function $(C){return p=void 0,x&&r?E(C):(r=o=void 0,c)}function k(){p!==void 0&&clearTimeout(p),f=0,r=d=o=p=void 0}function O(){return p===void 0?c:$(Ut())}function G(){var C=Ut(),A=T(C);if(r=arguments,o=this,d=C,A){if(p===void 0)return S(d);if(m)return clearTimeout(p),p=setTimeout(N,t),E(d)}return p===void 0&&(p=setTimeout(N,t)),c}return G.cancel=k,G.flush=O,G}var Li="Expected a function";function Dr(e,t,n){var r=!0,o=!0;if(typeof e!="function")throw new TypeError(Li);return Nt(n)&&(r="leading"in n?!!n.leading:r,o="trailing"in n?!!n.trailing:o),Oi(e,t,{leading:r,maxWait:t,trailing:o})}function Or(e){return wn?ei(e):ri(e)}const Mi=Dr(Or,500);function Vt(e){return e.length?Mi(e):Or(e)}function Lr(e){return wn?ti(e):oi(e)}function Ri(e){return wn?ni(e):ii(e)}function rt(){const e=(()=>{const t=document.getSelection();return t!=null&&t.rangeCount?t.getRangeAt(0):null})();if(e){const t=Ri(e);if(t)return{range:e,id:t}}if(e&&!e.collapsed&&e.toString().trim())return{range:e}}function Ii(e){if(!e)return"";var t=document.createElement("div");t.appendChild(e.cloneContents().cloneNode(!0)),document.body.appendChild(t);const n=t.innerText;return document.body.removeChild(t),t=void 0,n}function Xt(e){return{text:Ii(e).trim(),note:"",color:""}}function Fi(e,t,n){let r=re(se([])),o=re(!1),s=re(!1),c=re(void 0);function p(y){const T={...y,text:y.text||"",note:y.note||"",color:y.color||"yellow"};if(y._id){const N=L(r).findIndex($=>$._id==y._id);N!=-1&&(L(r)[N]=T),t(T)}else{if(L(r).some(N=>N.text.toLocaleLowerCase().trim()==T.text.toLocaleLowerCase().trim()))return;L(r).push(T),e(T)}}function d(y){j(r,se(L(r).filter(T=>T._id!=y))),n({_id:y})}function f(){var N;const{range:y,id:T}=rt()||{};!y||T||(p(Xt(y)),(N=document.getSelection())==null||N.removeAllRanges())}function b(y){var k;const{range:T,id:N}=rt()||{};if(!T)return;const $=N?L(r).find(O=>O._id==N):Xt(T);$&&(p({...$,color:y}),(k=document.getSelection())==null||k.removeAllRanges())}function m(){var T;const{id:y}=rt()||{};y&&(d(y),(T=document.getSelection())==null||T.removeAllRanges())}function x(){const{range:y,id:T}=rt()||{};if(!y)return;const N=T?L(r).find($=>$._id==T):Xt(y);N&&j(c,se(JSON.parse(JSON.stringify(N))))}function E(){L(c)&&(p(L(c)),j(c,void 0))}function S(){j(c,void 0)}return{get highlights(){return L(r)},set highlights(y){j(r,se(y))},get pro(){return L(o)},set pro(y){j(o,se(y))},get nav(){return L(s)},set nav(y){j(s,se(y))},get draft(){return L(c)},addSelected:f,colorSelected:b,removeSelected:m,draftSelected:x,draftSubmit:E,draftCancel:S}}const Hi="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Hi);var Pi=he('<button type="submit" class="svelte-o4uskr"><span class="color svelte-o4uskr"></span></button>'),ji=he('<button type="submit" value="add" title="Create highlight" class="svelte-o4uskr"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-o4uskr"><g class="svelte-o4uskr"><path d="M12.974,8.731c-.474,3.691-3.724,4.113-6.974,3.519" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-o4uskr"></path><path d="M2.75,15.25S4.062,3.729,15.25,2.75c-.56,.976-.573,2.605-.946,4.239-.524,2.011-2.335,2.261-4.554,2.261" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-o4uskr"></path></g></svg></button>'),qi=he('<button type="submit" value="remove" title="Delete highlight" class="svelte-o4uskr"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-o4uskr"><g class="svelte-o4uskr"><line x1="2.75" y1="4.25" x2="15.25" y2="4.25" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-o4uskr"></line><path d="M6.75,4.25v-1.5c0-.552,.448-1,1-1h2.5c.552,0,1,.448,1,1v1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-o4uskr"></path><path d="M13.5,6.75l-.4,7.605c-.056,1.062-.934,1.895-1.997,1.895H6.898c-1.064,0-1.941-.833-1.997-1.895l-.4-7.605" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-o4uskr"></path></g></svg></button>'),Bi=he('<dialog class="svelte-o4uskr"><form method="dialog" class="svelte-o4uskr"><!> <button type="submit" value="note" title="Add note" class="svelte-o4uskr"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-o4uskr"><g class="svelte-o4uskr"><path stroke-linecap="round" stroke-linejoin="round" d="M9,1.75C4.996,1.75,1.75,4.996,1.75,9c0,1.319,.358,2.552,.973,3.617,.43,.806-.053,2.712-.973,3.633,1.25,.068,2.897-.497,3.633-.973,.489,.282,1.264,.656,2.279,.848,.433,.082,.881,.125,1.338,.125,4.004,0,7.25-3.246,7.25-7.25S13.004,1.75,9,1.75Z" class="svelte-o4uskr"></path><path stroke-width="0" d="M9,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-o4uskr"></path><path stroke-width="0" d="M5.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-o4uskr"></path><path stroke-width="0" d="M12.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-o4uskr"></path></g></svg></button> <!></form></dialog>');function Mr(e,t){ct(t,!0);let n=Rt(t,"store",7),r,o=re(void 0),s=re(!1);function c(C){const A=C.currentTarget.returnValue;switch(C.currentTarget.returnValue="",A){case"add":t.store.addSelected();break;case"note":t.store.draftSelected();break;case"remove":t.store.removeSelected();break;default:if(Ve.has(A)){t.store.colorSelected(A);return}break}}function p(){j(s,!0)}function d(){j(s,!1),f()}function f(){if(L(s)){r==null||r.close();return}requestAnimationFrame(()=>{const{range:C,id:A}=rt()||{};if(!C){r==null||r.close();return}j(o,se(t.store.highlights.find(ee=>ee._id==A))),r.inert=!0,r==null||r.show(),r.inert=!1;const M=C.getBoundingClientRect(),R=Math.max(M.x,10)+window.scrollX,q=window.innerWidth-Math.max(M.x,10)-window.scrollX-M.width,V=Math.max(M.y,40)+window.scrollY+M.height+4,K=window.innerHeight-Math.max(M.y,40)-window.scrollY+4,ue=R<window.innerWidth/2+window.scrollX,Y=V<window.innerHeight/2+window.scrollY;r==null||r.style.setProperty("left",ue?`${R}px`:"unset"),r==null||r.style.setProperty("right",ue?"unset":`${q}px`),r==null||r.style.setProperty("top",Y?`${V}px`:"unset"),r==null||r.style.setProperty("bottom",Y?"unset":`${K}px`)})}const b=Dr(f,200,{leading:!0,trailing:!0});var m=Bi();ge("mousedown",Se,p,!1),ge("touchstart",Se,p,!1,!0),ge("mouseup",Se,d,!1),ge("touchend",Se,d,!1,!0),ge("touchcancel",Se,d,!1,!0),ge("selectionchange",Se,b,!1),ln(m,C=>r=C,()=>r);var x=le(m),E=le(x);at(E,()=>{var C;return(C=L(o))==null?void 0:C._id},C=>{var A=Cr(),M=Mt(A);bn(M,71,()=>Ve,(R,q)=>Z(Z(R))[0],(R,q,V)=>{let K=()=>Z(Z(q))[0],ue=()=>Z(Z(q))[1];var Y=Pi(),ee=le(Y);Ce(()=>{Uo(Y,K()),fe(ee,"style",`--color: ${ue()??""}`),sn(ee,"active",K()==L(o).color)}),ne(R,Y)}),ne(C,A)},C=>{var A=ji();ne(C,A)});var S=H(H(E,!0)),y=le(S),T=le(y),N=le(T),$=H(N),k=H($),O=H(k),G=H(H(S,!0));return at(G,()=>{var C;return(C=L(o))==null?void 0:C._id},C=>{var A=qi();ne(C,A)}),Ce(()=>{var C,A,M,R,q,V;sn(m,"new",!((C=L(o))!=null&&C._id)),fe(N,"fill",(A=L(o))!=null&&A.note?"currentColor":"none"),fe(N,"stroke-width",(M=L(o))!=null&&M.note?"0":void 0),fe($,"fill",(R=L(o))!=null&&R.note?"none":"currentColor"),fe(k,"fill",(q=L(o))!=null&&q.note?"none":"currentColor"),fe(O,"fill",(V=L(o))!=null&&V.note?"none":"currentColor")}),ge("close",m,c,!1),ne(e,m),_n(e,"svelte-o4uskr",`
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
`),ft({get store(){return n()},set store(C){n(C),Ie()}})}It(Mr,{store:{}},[],[],!0);function Yi(e){const t=e.currentTarget.getBoundingClientRect();t.top<=e.clientY&&e.clientY<=t.top+t.height&&t.left<=e.clientX&&e.clientX<=t.left+t.width||(e.preventDefault(),e.currentTarget.close())}var Wi=(e,t)=>j(t,!1),zi=he('<input type="radio" name="color" class="svelte-1b8vie9">'),Ui=he('<div class="unlock svelte-1b8vie9"><a href="https://raindrop.io/pro/buy" target="_blank" class="svelte-1b8vie9">Upgrade to Pro</a> to unlock annotation</div>'),Vi=he('<blockquote role="presentation" class="svelte-1b8vie9"> </blockquote> <fieldset class="color svelte-1b8vie9"></fieldset> <textarea class="note svelte-1b8vie9" rows="4" maxlength="5000" placeholder="Notes (optional)"></textarea> <!>',1),Xi=he('<dialog role="presentation" class="svelte-1b8vie9"><header class="svelte-1b8vie9"> </header> <form method="dialog" class="svelte-1b8vie9"><!> <footer class="svelte-1b8vie9"><button formnovalidate="" class="svelte-1b8vie9">Cancel <sup class="svelte-1b8vie9">esc</sup></button> <button type="submit" value="OK" class="svelte-1b8vie9"> <sup class="svelte-1b8vie9">&crarr;</sup></button></footer></form></dialog>');function Rr(e,t){ct(t,!0);const n=[];let r=Rt(t,"store",7),o,s,c=re(!0);hr(()=>{t.store.draft?(j(c,!0),o==null||o.showModal()):o==null||o.close()});function p($){const k=$.currentTarget.returnValue;$.currentTarget.returnValue="",setTimeout(k?t.store.draftSubmit:t.store.draftCancel,200)}function d($){var k;$.stopImmediatePropagation(),$.stopPropagation(),$.key=="Enter"&&!$.shiftKey&&($.preventDefault(),s&&((k=$.currentTarget.closest("form"))==null||k.requestSubmit(s)))}var f=Xi();ln(f,$=>o=$,()=>o),f.__mousedown=[Yi];var b=le(f),m=le(b),x=H(H(b,!0)),E=le(x);at(E,()=>t.store.draft,$=>{var k=Vi(),O=Mt(k);O.__click=[Wi,c];var G=le(O);Ce(()=>{var R;return Wt(G,((R=t.store.draft)==null?void 0:R.text.trim())||"")});var C=H(H(O,!0));bn(C,73,()=>Ve,Po,(R,q,V)=>{let K=()=>Z(Z(q))[0],ue=()=>Z(Z(q))[1];var Y=zi();zo(Y);var ee;Ce(()=>{ee!==(ee=K())&&(Y.value=(Y.__value=K())==null?"":K()),fe(Y,"style",`--color: ${ue()??""}`)}),Xo(n,[],Y,()=>(K(),t.store.draft.color),$e=>t.store.draft.color=$e),ne(R,Y)});var A=H(H(C,!0));Wo(A),Yo(A),A.__keydown=d;var M=H(H(A,!0));at(M,()=>!t.store.pro,R=>{var q=Ui();ne(R,q)}),Ce(()=>{sn(O,"compact",L(c)),A.disabled=!t.store.pro}),Vo(A,()=>t.store.draft.note,R=>t.store.draft.note=R),ne($,k)});var S=H(H(E,!0)),y=le(S),T=H(H(y,!0));ln(T,$=>s=$,()=>s);var N=le(T);return Ce(()=>{var $,k;Wt(m,`${(($=t.store.draft)!=null&&$._id?"Edit":"New")??""} highlight`),Wt(N,`${((k=t.store.draft)!=null&&k._id?"Update":"Create")??""} `)}),ge("close",f,p,!1),ne(e,f),_n(e,"svelte-1b8vie9",`
    .svelte-1b8vie9 {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    dialog.svelte-1b8vie9 {
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
        dialog.svelte-1b8vie9 {
            left: 0;right: 0;bottom: 0;top: 0;
            width: 100%;
            margin: 0;
            max-width: 100%;
            max-height: 100%;
            border-radius: 0;
        }
    }

    @media (pointer: coarse) {
        dialog.svelte-1b8vie9 {
            bottom: auto;
        }
    }

    dialog.svelte-1b8vie9, header.svelte-1b8vie9 {
        background: var(--bg-light);
        background: light-dark(var(--bg-light), var(--bg-dark));
    }

    [open].svelte-1b8vie9 {
        box-shadow: 0 0 0 .5px rgba(60, 60, 60, .9), 0 3px 10px rgba(0,0,0,.05), 0 7px 15px -3px rgba(0,0,0,.15);
    }

    .svelte-1b8vie9::backdrop {
        background-color: rgba(0,0,0,.3);
    }

    header.svelte-1b8vie9 {
        margin: 0;
        padding: 1em;
        font-weight: bold;
        position: sticky;
        top: 0;
        
    }

    @supports(animation-timeline: scroll()) {
        header.svelte-1b8vie9 {
            animation: svelte-1b8vie9-header-scroll linear both;
            animation-timeline: scroll();
            animation-range: 0 1px;
        }
    }

    @keyframes svelte-1b8vie9-header-scroll {
        to {
            box-shadow: 0 .5px 0 rgba(0,0,0,.2);
        }
    }

    form.svelte-1b8vie9 {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 1em;
        padding-top: 0;
    }

    .color.svelte-1b8vie9 {
        all: unset;
        display: flex;
        gap: .75em;
    }

    .color.svelte-1b8vie9 input[type="radio"]:where(.svelte-1b8vie9) {
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

    .color.svelte-1b8vie9 input[type="radio"]:where(.svelte-1b8vie9):checked {
        box-shadow: inset 0 0 0 .5em var(--color);
    }

    .color.svelte-1b8vie9 input[type="radio"]:where(.svelte-1b8vie9):active {
        transform: translateY(1px);
    }

    blockquote.svelte-1b8vie9, .note.svelte-1b8vie9, button.svelte-1b8vie9 {
        background: var(--control-bg-light);
        background: light-dark(var(--control-bg-light), var(--control-bg-dark));
    }

    blockquote.svelte-1b8vie9 {
        white-space: pre-line;
        margin: 0;
        min-width: 100%;
        width: 0;
        font-size: 16px;
    }

    blockquote.compact.svelte-1b8vie9 {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        overflow: clip;
    }

    blockquote.svelte-1b8vie9, .note.svelte-1b8vie9 {
        border-radius: .5em;
        padding: .5em .6em;
    }

    .note.svelte-1b8vie9 {
        min-width: min(21em, 70vw);
        min-height: 4lh;
        appearance: none;
        border: 0;
        font: inherit;
        display: block;
        scroll-margin-top: 100vh;
        transition: background .15s ease-in-out, box-shadow .15s ease-in-out;
    }

    .note.svelte-1b8vie9:focus {
        background: transparent;
    }
    
    footer.svelte-1b8vie9 {
        all: unset;
        display: flex;
        justify-content: flex-end;
        gap: .75em;
    }

    button.svelte-1b8vie9 {
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

    button.svelte-1b8vie9:active {
        transform: translateY(1px);
    }

    button.svelte-1b8vie9 sup:where(.svelte-1b8vie9) {
        margin-left: .25em;
        vertical-align: text-top;
        opacity: .5;
    }

    @media (pointer: coarse) {
        button.svelte-1b8vie9 sup:where(.svelte-1b8vie9) {
            display: none;
        }
    }

    button[value].svelte-1b8vie9 {
        background: blue;
        background: AccentColor;
        color: white;
    }

    .unlock.svelte-1b8vie9 {
        font-size: .75em;
        color: GrayText;
    }

    /* animation */
    dialog.svelte-1b8vie9, .svelte-1b8vie9::backdrop {
        transition: 
            display .2s allow-discrete ease-in-out, 
            overlay .2s allow-discrete ease-in-out, 
            opacity .2s ease-in-out,
            transform .2s ease-in-out,
            box-shadow .2s ease-in-out;
        opacity: 0;
    }

    dialog.svelte-1b8vie9 {
        transform: translateY(1em);
    }

    [open].svelte-1b8vie9,
    [open].svelte-1b8vie9::backdrop {
        opacity: 1;
        transform: translateY(0);
    }

    @starting-style {
        [open].svelte-1b8vie9,
        [open].svelte-1b8vie9::backdrop {
            opacity: 0;
        }

        [open].svelte-1b8vie9 {
            transform: translateY(-1em);
        }
    }

    @supports not selector(::highlight(a)) {
        dialog.svelte-1b8vie9, dialog.svelte-1b8vie9::backdrop {
            animation: svelte-1b8vie9-simple-appear .2s forwards;
        }
        @keyframes svelte-1b8vie9-simple-appear {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    }
`),ft({get store(){return r()},set store($){r($),Ie()}})}br(["mousedown","click","keydown"]);It(Rr,{store:{}},[],[],!0);const Gi=(e,t)=>{const n=e.target.getAttribute("data-highlight");n&&(e.preventDefault(),t(n))};var Ki=he('<div class="svelte-1t9y4ki"></div>'),Ji=he('<nav role="presentation" class="svelte-1t9y4ki"></nav>');function Ir(e,t){ct(t,!0);let n=Rt(t,"store",7);var r=Cr(),o=Mt(r);return at(o,()=>t.store.nav,s=>{var c=Ji();c.__click=[Gi,Lr],bn(c,77,()=>t.store.highlights,(p,d)=>Z(p)._id,(p,d,f)=>{var b=Ki();Ce(()=>fe(b,"style",`top: var(--highlight-${Z(d)._id??""}-top); --color: ${(Ve.get(Z(d).color)||Z(d).color)??""}`)),Ce(()=>fe(b,"data-highlight",Z(d)._id)),ne(p,b)}),ne(s,c)}),ne(e,r),_n(e,"svelte-1t9y4ki",`
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
`),ft({get store(){return n()},set store(s){n(s),Ie()}})}br(["click"]);It(Ir,{store:{}},[],[],!0);var Zi=he("<!> <!> <!>",1);function Qi(e,t){ct(t,!0);let n=Rt(t,"store",7);hr(()=>{Vt(t.store.highlights)});let r;function o(){Vt(t.store.highlights),clearTimeout(r),r=setTimeout(()=>Vt(t.store.highlights),3e3)}var s=Zi();ge("load",$t,o,!1),ge("popstate",$t,o,!1);var c=Mt(s);Mr(c,{get store(){return t.store}});var p=H(H(c,!0));Rr(p,{get store(){return t.store}});var d=H(H(p,!0));return Ir(d,{get store(){return t.store}}),ne(e,s),ft({get store(){return n()},set store(f){n(f),Ie()}})}customElements.define("rdh-ui",It(Qi,{store:{}},[],[],!0));function es(e){if(typeof chrome=="object"&&chrome.runtime&&chrome.runtime.onMessage||typeof browser=="object"&&browser.runtime&&browser.runtime.onMessage){const{runtime:t}=typeof browser=="object"?browser:chrome,n=(r,o)=>{o.id==t.id&&typeof r.type=="string"&&e(r)};return t.onMessage.removeListener(n),t.onMessage.addListener(n),r=>t.sendMessage(null,r)}if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.rdh)return window.rdhSend=e,t=>window.webkit.messageHandlers.rdh.postMessage(t);if(typeof window<"u"&&typeof window.process=="object"&&window.process.type==="renderer"||typeof process<"u"&&typeof process.versions=="object"&&process.versions.electron||typeof navigator=="object"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Electron")>=0){const{ipcRenderer:t}=require("electron"),n=(r,o)=>e(o);return t.removeListener("RDH",n),t.on("RDH",n),r=>t.sendToHost("RDH",r)}if("ReactNativeWebView"in window)return window.ReactNativeWebViewSendMessage=e,t=>window.ReactNativeWebView.postMessage(JSON.stringify(t));if(window.self!==window.top){const t=({data:n,source:r})=>{r!==window.parent||typeof n!="object"||typeof n.type!="string"||e(n)};return window.removeEventListener("message",t),window.addEventListener("message",t),n=>window.parent.postMessage(n,"*")}throw new Error("unsupported platform")}async function ts(e){let t=!1;const n=new Set,r=es(o=>{if(!t){n.add(o);return}e(o)});await new Promise(o=>{function s(){window.removeEventListener("DOMContentLoaded",s),o()}document.readyState=="loading"?(window.removeEventListener("DOMContentLoaded",s),window.addEventListener("DOMContentLoaded",s,{once:!0})):o()}),t=!0;for(const o of n)e(o),n.delete(o);return r}(async()=>{const e=await ts(r=>{switch(r.type){case"RDH_APPLY":Array.isArray(r.payload)&&(t.highlights=r.payload);break;case"RDH_CONFIG":t.pro=r.payload.pro||!1,t.nav=r.payload.nav||!1;break;case"RDH_SCROLL":typeof r.payload._id=="string"&&Lr(r.payload._id);break;case"RDH_ADD_SELECTION":t.addSelected();break;case"RDH_NOTE_SELECTION":t.draftSelected();break}}),t=Fi(r=>e({type:"RDH_ADD",payload:r}),r=>e({type:"RDH_UPDATE",payload:r}),({_id:r})=>e({type:"RDH_REMOVE",payload:{_id:r}})),n=document.createElement("rdh-ui");n.store=t,document.body.appendChild(n),e({type:"RDH_READY",payload:{url:location.href}})})();
