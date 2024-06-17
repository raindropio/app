"use strict";var Jr=Object.defineProperty;var On=t=>{throw TypeError(t)};var Zr=(t,e,n)=>e in t?Jr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ct=(t,e,n)=>Zr(t,typeof e!="symbol"?e+"":e,n),Ln=(t,e,n)=>e.has(t)||On("Cannot "+n);var tt=(t,e,n)=>(Ln(t,e,"read from private field"),n?n.call(t):e.get(t)),We=(t,e,n)=>e.has(t)?On("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),Ue=(t,e,n,r)=>(Ln(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n);(function(){var t=window.Document.prototype.createElement,e=window.Document.prototype.createElementNS,n=window.Document.prototype.importNode,r=window.Document.prototype.prepend,o=window.Document.prototype.append,s=window.DocumentFragment.prototype.prepend,c=window.DocumentFragment.prototype.append,v=window.Node.prototype.cloneNode,f=window.Node.prototype.appendChild,h=window.Node.prototype.insertBefore,m=window.Node.prototype.removeChild,_=window.Node.prototype.replaceChild,E=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),y=window.Element.prototype.attachShadow,C=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),S=window.Element.prototype.getAttribute,z=window.Element.prototype.setAttribute,O=window.Element.prototype.removeAttribute,T=window.Element.prototype.toggleAttribute,x=window.Element.prototype.getAttributeNS,A=window.Element.prototype.setAttributeNS,K=window.Element.prototype.removeAttributeNS,k=window.Element.prototype.insertAdjacentElement,$=window.Element.prototype.insertAdjacentHTML,L=window.Element.prototype.prepend,j=window.Element.prototype.append,F=window.Element.prototype.before,V=window.Element.prototype.after,J=window.Element.prototype.replaceWith,ut=window.Element.prototype.remove,B=window.HTMLElement,ot=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),St=window.HTMLElement.prototype.insertAdjacentElement,Zt=window.HTMLElement.prototype.insertAdjacentHTML,Qt=new Set;"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(i){return Qt.add(i)});function Cn(i){var l=Qt.has(i);return i=/^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(i),!l&&i}var Br=document.contains?document.contains.bind(document):document.documentElement.contains.bind(document.documentElement);function H(i){var l=i.isConnected;if(l!==void 0)return l;if(Br(i))return!0;for(;i&&!(i.__CE_isImportDocument||i instanceof Document);)i=i.parentNode||(window.ShadowRoot&&i instanceof ShadowRoot?i.host:void 0);return!(!i||!(i.__CE_isImportDocument||i instanceof Document))}function He(i){var l=i.children;if(l)return Array.prototype.slice.call(l);for(l=[],i=i.firstChild;i;i=i.nextSibling)i.nodeType===Node.ELEMENT_NODE&&l.push(i);return l}function Pe(i,l){for(;l&&l!==i&&!l.nextSibling;)l=l.parentNode;return l&&l!==i?l.nextSibling:null}function qe(i,l,u){for(var p=i;p;){if(p.nodeType===Node.ELEMENT_NODE){var a=p;l(a);var d=a.localName;if(d==="link"&&a.getAttribute("rel")==="import"){if(p=a.import,u===void 0&&(u=new Set),p instanceof Node&&!u.has(p))for(u.add(p),p=p.firstChild;p;p=p.nextSibling)qe(p,l,u);p=Pe(i,a);continue}else if(d==="template"){p=Pe(i,a);continue}if(a=a.__CE_shadowRoot)for(a=a.firstChild;a;a=a.nextSibling)qe(a,l,u)}p=p.firstChild?p.firstChild:Pe(i,p)}}function ge(){var i=!(vt==null||!vt.noDocumentConstructionObserver),l=!(vt==null||!vt.shadyDomFastWalk);this.m=[],this.g=[],this.j=!1,this.shadyDomFastWalk=l,this.I=!i}function te(i,l,u,p){var a=window.ShadyDOM;if(i.shadyDomFastWalk&&a&&a.inUse){if(l.nodeType===Node.ELEMENT_NODE&&u(l),l.querySelectorAll)for(i=a.nativeMethods.querySelectorAll.call(l,"*"),l=0;l<i.length;l++)u(i[l])}else qe(l,u,p)}function Yr(i,l){i.j=!0,i.m.push(l)}function Wr(i,l){i.j=!0,i.g.push(l)}function Be(i,l){i.j&&te(i,l,function(u){return It(i,u)})}function It(i,l){if(i.j&&!l.__CE_patched){l.__CE_patched=!0;for(var u=0;u<i.m.length;u++)i.m[u](l);for(u=0;u<i.g.length;u++)i.g[u](l)}}function pt(i,l){var u=[];for(te(i,l,function(a){return u.push(a)}),l=0;l<u.length;l++){var p=u[l];p.__CE_state===1?i.connectedCallback(p):me(i,p)}}function rt(i,l){var u=[];for(te(i,l,function(a){return u.push(a)}),l=0;l<u.length;l++){var p=u[l];p.__CE_state===1&&i.disconnectedCallback(p)}}function wt(i,l,u){u=u===void 0?{}:u;var p=u.J,a=u.upgrade||function(g){return me(i,g)},d=[];for(te(i,l,function(g){if(i.j&&It(i,g),g.localName==="link"&&g.getAttribute("rel")==="import"){var b=g.import;b instanceof Node&&(b.__CE_isImportDocument=!0,b.__CE_registry=document.__CE_registry),b&&b.readyState==="complete"?b.__CE_documentLoadHandled=!0:g.addEventListener("load",function(){var w=g.import;if(!w.__CE_documentLoadHandled){w.__CE_documentLoadHandled=!0;var N=new Set;p&&(p.forEach(function(R){return N.add(R)}),N.delete(w)),wt(i,w,{J:N,upgrade:a})}})}else d.push(g)},p),l=0;l<d.length;l++)a(d[l])}function me(i,l){try{var u=l.ownerDocument,p=u.__CE_registry,a=p&&(u.defaultView||u.__CE_isImportDocument)?_e(p,l.localName):void 0;if(a&&l.__CE_state===void 0){a.constructionStack.push(l);try{try{if(new a.constructorFunction!==l)throw Error("The custom element constructor did not produce the element being upgraded.")}finally{a.constructionStack.pop()}}catch(w){throw l.__CE_state=2,w}if(l.__CE_state=1,l.__CE_definition=a,a.attributeChangedCallback&&l.hasAttributes()){var d=a.observedAttributes;for(a=0;a<d.length;a++){var g=d[a],b=l.getAttribute(g);b!==null&&i.attributeChangedCallback(l,g,null,b,null)}}H(l)&&i.connectedCallback(l)}}catch(w){Ft(w)}}ge.prototype.connectedCallback=function(i){var l=i.__CE_definition;if(l.connectedCallback)try{l.connectedCallback.call(i)}catch(u){Ft(u)}},ge.prototype.disconnectedCallback=function(i){var l=i.__CE_definition;if(l.disconnectedCallback)try{l.disconnectedCallback.call(i)}catch(u){Ft(u)}},ge.prototype.attributeChangedCallback=function(i,l,u,p,a){var d=i.__CE_definition;if(d.attributeChangedCallback&&-1<d.observedAttributes.indexOf(l))try{d.attributeChangedCallback.call(i,l,u,p,a)}catch(g){Ft(g)}};function kn(i,l,u,p){var a=l.__CE_registry;if(a&&(p===null||p==="http://www.w3.org/1999/xhtml")&&(a=_e(a,u)))try{var d=new a.constructorFunction;if(d.__CE_state===void 0||d.__CE_definition===void 0)throw Error("Failed to construct '"+u+"': The returned value was not constructed with the HTMLElement constructor.");if(d.namespaceURI!=="http://www.w3.org/1999/xhtml")throw Error("Failed to construct '"+u+"': The constructed element's namespace must be the HTML namespace.");if(d.hasAttributes())throw Error("Failed to construct '"+u+"': The constructed element must not have any attributes.");if(d.firstChild!==null)throw Error("Failed to construct '"+u+"': The constructed element must not have any children.");if(d.parentNode!==null)throw Error("Failed to construct '"+u+"': The constructed element must not have a parent node.");if(d.ownerDocument!==l)throw Error("Failed to construct '"+u+"': The constructed element's owner document is incorrect.");if(d.localName!==u)throw Error("Failed to construct '"+u+"': The constructed element's local name is incorrect.");return d}catch(g){return Ft(g),l=p===null?t.call(l,u):e.call(l,p,u),Object.setPrototypeOf(l,HTMLUnknownElement.prototype),l.__CE_state=2,l.__CE_definition=void 0,It(i,l),l}return l=p===null?t.call(l,u):e.call(l,p,u),It(i,l),l}function Ft(i){var l="",u="",p=0,a=0;i instanceof Error?(l=i.message,u=i.sourceURL||i.fileName||"",p=i.line||i.lineNumber||0,a=i.column||i.columnNumber||0):l="Uncaught "+String(i);var d=void 0;ErrorEvent.prototype.initErrorEvent===void 0?d=new ErrorEvent("error",{cancelable:!0,message:l,filename:u,lineno:p,colno:a,error:i}):(d=document.createEvent("ErrorEvent"),d.initErrorEvent("error",!1,!0,l,u,p),d.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0}})}),d.error===void 0&&Object.defineProperty(d,"error",{configurable:!0,enumerable:!0,get:function(){return i}}),window.dispatchEvent(d),d.defaultPrevented||console.error(i)}function xn(){var i=this;this.g=void 0,this.F=new Promise(function(l){i.l=l})}xn.prototype.resolve=function(i){if(this.g)throw Error("Already resolved.");this.g=i,this.l(i)};function Tn(i){var l=document;this.l=void 0,this.h=i,this.g=l,wt(this.h,this.g),this.g.readyState==="loading"&&(this.l=new MutationObserver(this.G.bind(this)),this.l.observe(this.g,{childList:!0,subtree:!0}))}function $n(i){i.l&&i.l.disconnect()}Tn.prototype.G=function(i){var l=this.g.readyState;for(l!=="interactive"&&l!=="complete"||$n(this),l=0;l<i.length;l++)for(var u=i[l].addedNodes,p=0;p<u.length;p++)wt(this.h,u[p])};function q(i){this.s=new Map,this.u=new Map,this.C=new Map,this.A=!1,this.B=new Map,this.o=function(l){return l()},this.i=!1,this.v=[],this.h=i,this.D=i.I?new Tn(i):void 0}q.prototype.H=function(i,l){var u=this;if(!(l instanceof Function))throw new TypeError("Custom element constructor getters must be functions.");Sn(this,i),this.s.set(i,l),this.v.push(i),this.i||(this.i=!0,this.o(function(){return Nn(u)}))},q.prototype.define=function(i,l){var u=this;if(!(l instanceof Function))throw new TypeError("Custom element constructors must be functions.");Sn(this,i),zn(this,i,l),this.v.push(i),this.i||(this.i=!0,this.o(function(){return Nn(u)}))};function Sn(i,l){if(!Cn(l))throw new SyntaxError("The element name '"+l+"' is not valid.");if(_e(i,l))throw Error("A custom element with name '"+(l+"' has already been defined."));if(i.A)throw Error("A custom element is already being defined.")}function zn(i,l,u){i.A=!0;var p;try{var a=u.prototype;if(!(a instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var d=function(R){var Ht=a[R];if(Ht!==void 0&&!(Ht instanceof Function))throw Error("The '"+R+"' callback must be a function.");return Ht},g=d("connectedCallback"),b=d("disconnectedCallback"),w=d("adoptedCallback"),N=(p=d("attributeChangedCallback"))&&u.observedAttributes||[]}catch(R){throw R}finally{i.A=!1}return u={localName:l,constructorFunction:u,connectedCallback:g,disconnectedCallback:b,adoptedCallback:w,attributeChangedCallback:p,observedAttributes:N,constructionStack:[]},i.u.set(l,u),i.C.set(u.constructorFunction,u),u}q.prototype.upgrade=function(i){wt(this.h,i)};function Nn(i){if(i.i!==!1){i.i=!1;for(var l=[],u=i.v,p=new Map,a=0;a<u.length;a++)p.set(u[a],[]);for(wt(i.h,document,{upgrade:function(w){if(w.__CE_state===void 0){var N=w.localName,R=p.get(N);R?R.push(w):i.u.has(N)&&l.push(w)}}}),a=0;a<l.length;a++)me(i.h,l[a]);for(a=0;a<u.length;a++){for(var d=u[a],g=p.get(d),b=0;b<g.length;b++)me(i.h,g[b]);(d=i.B.get(d))&&d.resolve(void 0)}u.length=0}}q.prototype.get=function(i){if(i=_e(this,i))return i.constructorFunction},q.prototype.whenDefined=function(i){if(!Cn(i))return Promise.reject(new SyntaxError("'"+i+"' is not a valid custom element name."));var l=this.B.get(i);if(l)return l.F;l=new xn,this.B.set(i,l);var u=this.u.has(i)||this.s.has(i);return i=this.v.indexOf(i)===-1,u&&i&&l.resolve(void 0),l.F},q.prototype.polyfillWrapFlushCallback=function(i){this.D&&$n(this.D);var l=this.o;this.o=function(u){return i(function(){return l(u)})}};function _e(i,l){var u=i.u.get(l);if(u)return u;if(u=i.s.get(l)){i.s.delete(l);try{return zn(i,l,u())}catch(p){Ft(p)}}}q.prototype.define=q.prototype.define,q.prototype.upgrade=q.prototype.upgrade,q.prototype.get=q.prototype.get,q.prototype.whenDefined=q.prototype.whenDefined,q.prototype.polyfillDefineLazy=q.prototype.H,q.prototype.polyfillWrapFlushCallback=q.prototype.polyfillWrapFlushCallback;function Ye(i,l,u){function p(a){return function(d){for(var g=[],b=0;b<arguments.length;++b)g[b]=arguments[b];b=[];for(var w=[],N=0;N<g.length;N++){var R=g[N];if(R instanceof Element&&H(R)&&w.push(R),R instanceof DocumentFragment)for(R=R.firstChild;R;R=R.nextSibling)b.push(R);else b.push(R)}for(a.apply(this,g),g=0;g<w.length;g++)rt(i,w[g]);if(H(this))for(g=0;g<b.length;g++)w=b[g],w instanceof Element&&pt(i,w)}}u.prepend!==void 0&&(l.prepend=p(u.prepend)),u.append!==void 0&&(l.append=p(u.append))}function Ur(i){Document.prototype.createElement=function(l){return kn(i,this,l,null)},Document.prototype.importNode=function(l,u){return l=n.call(this,l,!!u),this.__CE_registry?wt(i,l):Be(i,l),l},Document.prototype.createElementNS=function(l,u){return kn(i,this,u,l)},Ye(i,Document.prototype,{prepend:r,append:o})}function Vr(i){function l(p){return function(a){for(var d=[],g=0;g<arguments.length;++g)d[g]=arguments[g];g=[];for(var b=[],w=0;w<d.length;w++){var N=d[w];if(N instanceof Element&&H(N)&&b.push(N),N instanceof DocumentFragment)for(N=N.firstChild;N;N=N.nextSibling)g.push(N);else g.push(N)}for(p.apply(this,d),d=0;d<b.length;d++)rt(i,b[d]);if(H(this))for(d=0;d<g.length;d++)b=g[d],b instanceof Element&&pt(i,b)}}var u=Element.prototype;F!==void 0&&(u.before=l(F)),V!==void 0&&(u.after=l(V)),J!==void 0&&(u.replaceWith=function(p){for(var a=[],d=0;d<arguments.length;++d)a[d]=arguments[d];d=[];for(var g=[],b=0;b<a.length;b++){var w=a[b];if(w instanceof Element&&H(w)&&g.push(w),w instanceof DocumentFragment)for(w=w.firstChild;w;w=w.nextSibling)d.push(w);else d.push(w)}for(b=H(this),J.apply(this,a),a=0;a<g.length;a++)rt(i,g[a]);if(b)for(rt(i,this),a=0;a<d.length;a++)g=d[a],g instanceof Element&&pt(i,g)}),ut!==void 0&&(u.remove=function(){var p=H(this);ut.call(this),p&&rt(i,this)})}function Xr(i){function l(a,d){Object.defineProperty(a,"innerHTML",{enumerable:d.enumerable,configurable:!0,get:d.get,set:function(g){var b=this,w=void 0;if(H(this)&&(w=[],te(i,this,function(Ht){Ht!==b&&w.push(Ht)})),d.set.call(this,g),w)for(var N=0;N<w.length;N++){var R=w[N];R.__CE_state===1&&i.disconnectedCallback(R)}return this.ownerDocument.__CE_registry?wt(i,this):Be(i,this),g}})}function u(a,d){a.insertAdjacentElement=function(g,b){var w=H(b);return g=d.call(this,g,b),w&&rt(i,b),H(g)&&pt(i,b),g}}function p(a,d){function g(b,w){for(var N=[];b!==w;b=b.nextSibling)N.push(b);for(w=0;w<N.length;w++)wt(i,N[w])}a.insertAdjacentHTML=function(b,w){if(b=b.toLowerCase(),b==="beforebegin"){var N=this.previousSibling;d.call(this,b,w),g(N||this.parentNode.firstChild,this)}else if(b==="afterbegin")N=this.firstChild,d.call(this,b,w),g(this.firstChild,N);else if(b==="beforeend")N=this.lastChild,d.call(this,b,w),g(N||this.firstChild,null);else if(b==="afterend")N=this.nextSibling,d.call(this,b,w),g(this.nextSibling,N);else throw new SyntaxError("The value provided ("+String(b)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.")}}y&&(Element.prototype.attachShadow=function(a){if(a=y.call(this,a),i.j&&!a.__CE_patched){a.__CE_patched=!0;for(var d=0;d<i.m.length;d++)i.m[d](a)}return this.__CE_shadowRoot=a}),C&&C.get?l(Element.prototype,C):ot&&ot.get?l(HTMLElement.prototype,ot):Wr(i,function(a){l(a,{enumerable:!0,configurable:!0,get:function(){return v.call(this,!0).innerHTML},set:function(d){var g=this.localName==="template",b=g?this.content:this,w=e.call(document,this.namespaceURI,this.localName);for(w.innerHTML=d;0<b.childNodes.length;)m.call(b,b.childNodes[0]);for(d=g?w.content:w;0<d.childNodes.length;)f.call(b,d.childNodes[0])}})}),Element.prototype.setAttribute=function(a,d){if(this.__CE_state!==1)return z.call(this,a,d);var g=S.call(this,a);z.call(this,a,d),d=S.call(this,a),i.attributeChangedCallback(this,a,g,d,null)},Element.prototype.setAttributeNS=function(a,d,g){if(this.__CE_state!==1)return A.call(this,a,d,g);var b=x.call(this,a,d);A.call(this,a,d,g),g=x.call(this,a,d),i.attributeChangedCallback(this,d,b,g,a)},Element.prototype.removeAttribute=function(a){if(this.__CE_state!==1)return O.call(this,a);var d=S.call(this,a);O.call(this,a),d!==null&&i.attributeChangedCallback(this,a,d,null,null)},T&&(Element.prototype.toggleAttribute=function(a,d){if(this.__CE_state!==1)return T.call(this,a,d);var g=S.call(this,a),b=g!==null;return d=T.call(this,a,d),b!==d&&i.attributeChangedCallback(this,a,g,d?"":null,null),d}),Element.prototype.removeAttributeNS=function(a,d){if(this.__CE_state!==1)return K.call(this,a,d);var g=x.call(this,a,d);K.call(this,a,d);var b=x.call(this,a,d);g!==b&&i.attributeChangedCallback(this,d,g,b,a)},St?u(HTMLElement.prototype,St):k&&u(Element.prototype,k),Zt?p(HTMLElement.prototype,Zt):$&&p(Element.prototype,$),Ye(i,Element.prototype,{prepend:L,append:j}),Vr(i)}var An={};function Gr(i){function l(){var u=this.constructor,p=document.__CE_registry.C.get(u);if(!p)throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var a=p.constructionStack;if(a.length===0)return a=t.call(document,p.localName),Object.setPrototypeOf(a,u.prototype),a.__CE_state=1,a.__CE_definition=p,It(i,a),a;var d=a.length-1,g=a[d];if(g===An)throw Error("Failed to construct '"+p.localName+"': This element was already constructed.");return a[d]=An,Object.setPrototypeOf(g,u.prototype),It(i,g),g}l.prototype=B.prototype,Object.defineProperty(HTMLElement.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:l}),window.HTMLElement=l}function Kr(i){function l(u,p){Object.defineProperty(u,"textContent",{enumerable:p.enumerable,configurable:!0,get:p.get,set:function(a){if(this.nodeType===Node.TEXT_NODE)p.set.call(this,a);else{var d=void 0;if(this.firstChild){var g=this.childNodes,b=g.length;if(0<b&&H(this)){d=Array(b);for(var w=0;w<b;w++)d[w]=g[w]}}if(p.set.call(this,a),d)for(a=0;a<d.length;a++)rt(i,d[a])}}})}Node.prototype.insertBefore=function(u,p){if(u instanceof DocumentFragment){var a=He(u);if(u=h.call(this,u,p),H(this))for(p=0;p<a.length;p++)pt(i,a[p]);return u}return a=u instanceof Element&&H(u),p=h.call(this,u,p),a&&rt(i,u),H(this)&&pt(i,u),p},Node.prototype.appendChild=function(u){if(u instanceof DocumentFragment){var p=He(u);if(u=f.call(this,u),H(this))for(var a=0;a<p.length;a++)pt(i,p[a]);return u}return p=u instanceof Element&&H(u),a=f.call(this,u),p&&rt(i,u),H(this)&&pt(i,u),a},Node.prototype.cloneNode=function(u){return u=v.call(this,!!u),this.ownerDocument.__CE_registry?wt(i,u):Be(i,u),u},Node.prototype.removeChild=function(u){var p=u instanceof Element&&H(u),a=m.call(this,u);return p&&rt(i,u),a},Node.prototype.replaceChild=function(u,p){if(u instanceof DocumentFragment){var a=He(u);if(u=_.call(this,u,p),H(this))for(rt(i,p),p=0;p<a.length;p++)pt(i,a[p]);return u}a=u instanceof Element&&H(u);var d=_.call(this,u,p),g=H(this);return g&&rt(i,p),a&&rt(i,u),g&&pt(i,u),d},E&&E.get?l(Node.prototype,E):Yr(i,function(u){l(u,{enumerable:!0,configurable:!0,get:function(){for(var p=[],a=this.firstChild;a;a=a.nextSibling)a.nodeType!==Node.COMMENT_NODE&&p.push(a.textContent);return p.join("")},set:function(p){for(;this.firstChild;)m.call(this,this.firstChild);p!=null&&p!==""&&f.call(this,document.createTextNode(p))}})})}var vt=window.customElements;function Dn(){var i=new ge;Gr(i),Ur(i),Ye(i,DocumentFragment.prototype,{prepend:s,append:c}),Kr(i),Xr(i),window.CustomElementRegistry=q,i=new q(i),document.__CE_registry=i,Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:i})}vt&&!vt.forcePolyfill&&typeof vt.define=="function"&&typeof vt.get=="function"||Dn(),window.__CE_installPolyfill=Dn}).call(self);const ie=1,fn=2,Qr=4,Zn=8,to=16,Je=64,eo=2,no=1,ro=2,we="[",Qn="]",oo="",tr=`${Qn}!`,Ze={},Pt=Symbol(),jn=["touchstart","touchmove","touchend"];function io(t){console.warn("hydration_mismatch")}let G=!1;function kt(t){G=t}let Mt=null,Dt;function so(t){Mt=t,Dt=t&&t[0]}function Wt(t){if(t.nodeType!==8)return t;var e=t;if(e.data!==we)return t;for(var n=[],r=0;(e=e.nextSibling)!==null;){if(e.nodeType===8){var o=e.data;if(o===we)r+=1;else if(o[0]===Qn){if(r===0)return Mt=n,Dt=n[0],e;r-=1}}n.push(e)}throw io(),Ze}var Ut=Array.isArray,lo=Array.from,Ee=Object.keys,er=Object.isFrozen,se=Object.defineProperty,Qe=Object.getOwnPropertyDescriptor,ao=Object.prototype,uo=Array.prototype,co=Object.getPrototypeOf;const Ot=2,nr=4,Xt=8,rr=16,yt=32,dn=64,$t=128,Ce=256,dt=512,bt=1024,Lt=2048,jt=4096,Gt=8192,fo=16384,hn=32768,X=Symbol("$state"),ho=Symbol("$state.frozen"),po=Symbol("");function or(t){return t===this.v}function vo(t,e){return t!=t?e==e:t!==e||t!==null&&typeof t=="object"||typeof t=="function"}function go(t){return!vo(t,this.v)}function mo(t){throw new Error("effect_in_teardown")}function _o(){throw new Error("effect_in_unowned_derived")}function yo(t){throw new Error("effect_orphan")}function bo(){throw new Error("effect_update_depth_exceeded")}function wo(){throw new Error("hydration_failed")}function Eo(t){throw new Error("props_invalid_value")}function Co(){throw new Error("state_unsafe_mutation")}function nt(t){return{f:0,reactions:null,equals:or,v:t,version:0}}function ke(t){var n;const e=nt(t);return e.equals=go,U!==null&&U.l!==null&&((n=U.l).s??(n.s=[])).push(e),e}function P(t,e){var n=t.v!==Pt;return!_t&&n&&Z!==null&&nn()&&Z.f&Ot&&Co(),t.equals(e)||(t.v=e,t.version++,nn()&&n&&M!==null&&M.f&dt&&!(M.f&yt)&&(W!==null&&W.includes(t)?(at(M,bt),je(M)):Tt===null?Do([t]):Tt.push(t)),gn(t,bt,!0)),e}function st(t,e=!0,n=null,r){if(typeof t=="object"&&t!=null&&!er(t)&&!(ho in t)){if(X in t){const s=t[X];if(s.t===t||s.p===t)return s.p}const o=co(t);if(o===ao||o===uo){const s=new Proxy(t,ko);return se(t,X,{value:{s:new Map,v:nt(0),a:Ut(t),i:e,p:s,t},writable:!0,enumerable:!1}),s}}return t}function Mn(t,e=1){P(t,t.v+e)}const ko={defineProperty(t,e,n){if(n.value){const r=t[X],o=r.s.get(e);o!==void 0&&P(o,st(n.value,r.i,r))}return Reflect.defineProperty(t,e,n)},deleteProperty(t,e){const n=t[X],r=n.s.get(e),o=n.a,s=delete t[e];if(o&&s){const c=n.s.get("length"),v=t.length-1;c!==void 0&&c.v!==v&&P(c,v)}return r!==void 0&&P(r,Pt),s&&Mn(n.v),s},get(t,e,n){var s;if(e===X)return Reflect.get(t,X);const r=t[X];let o=r.s.get(e);if(o===void 0&&(!(e in t)||(s=Qe(t,e))!=null&&s.writable)&&(o=(r.i?nt:ke)(st(t[e],r.i,r)),r.s.set(e,o)),o!==void 0){const c=D(o);return c===Pt?void 0:c}return Reflect.get(t,e,n)},getOwnPropertyDescriptor(t,e){const n=Reflect.getOwnPropertyDescriptor(t,e);if(n&&"value"in n){const o=t[X].s.get(e);o&&(n.value=D(o))}return n},has(t,e){var s;if(e===X)return!0;const n=t[X],r=Reflect.has(t,e);let o=n.s.get(e);return(o!==void 0||M!==null&&(!r||(s=Qe(t,e))!=null&&s.writable))&&(o===void 0&&(o=(n.i?nt:ke)(r?st(t[e],n.i,n):Pt),n.s.set(e,o)),D(o)===Pt)?!1:r},set(t,e,n,r){const o=t[X];let s=o.s.get(e);s===void 0&&(gr(()=>r[e]),s=o.s.get(e)),s!==void 0&&P(s,st(n,o.i,o));const c=o.a,v=!(e in t);if(c&&e==="length")for(let f=n;f<t.length;f+=1){const h=o.s.get(f+"");h!==void 0&&P(h,Pt)}if(t[e]=n,v){if(c){const f=o.s.get("length"),h=t.length;f!==void 0&&f.v!==h&&P(f,h)}Mn(o.v)}return!0},ownKeys(t){const e=t[X];return D(e.v),Reflect.ownKeys(t)}};function xe(t){if(t!==null&&typeof t=="object"&&X in t){var e=t[X];if(e)return e.p}return t}function xo(t,e){return Object.is(xe(t),xe(e))}function ir(t){for(var e=0;e<t.length;e++)t[e]()}const To=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let Te=!1,$e=!1,tn=[],en=[];function sr(){Te=!1;const t=tn.slice();tn=[],ir(t)}function lr(){$e=!1;const t=en.slice();en=[],ir(t)}function ce(t){Te||(Te=!0,queueMicrotask(sr)),tn.push(t)}function $o(t){$e||($e=!0,To(lr)),en.push(t)}function So(){Te&&sr(),$e&&lr()}function zo(t){let e=Ot|bt;M===null&&(e|=$t);const n={deps:null,deriveds:null,equals:or,f:e,first:null,fn:t,last:null,reactions:null,v:null,version:0};if(Z!==null&&Z.f&Ot){var r=Z;r.deriveds===null?r.deriveds=[n]:r.deriveds.push(n)}return n}function ar(t){vn(t);var e=t.deriveds;if(e!==null){t.deriveds=null;for(var n=0;n<e.length;n+=1)No(e[n])}}function ur(t,e){ar(t);var n=fr(t),r=(qt||t.f&$t)&&t.deps!==null?Lt:dt;at(t,r);var o=t.equals(n);return o||(t.v=n,gn(t,bt,e)),o}function No(t){ar(t),Oe(t,0),at(t,Gt),t.first=t.last=t.deps=t.reactions=t.fn=null}const cr=0,Ao=1;let ye=cr,le=!1,Bt=!1,pn=!1;function Rn(t){Bt=t}function In(t){pn=t}function Fn(t){_t=t}let Nt=[],Yt=0,Z=null,M=null,W=null,Y=0,Tt=null;function Do(t){Tt=t}let _t=!1,qt=!1,U=null;function nn(){return U!==null&&U.l===null}function fe(t){var E;var e=t.f,n=(e&bt)!==0,r=(e&$t)!==0;if(n&&!r)return!0;var o=(e&Ce)!==0;if(e&Lt||n&&r){var s=t.deps;if(s!==null)for(var c=s.length,v,f,h=0;h<c;h++){var m=s[h];!n&&fe(m)&&(v=ur(m,!0));var _=m.version;if(r){if(_>t.version)return t.version=_,!v;!qt&&!((E=m==null?void 0:m.reactions)!=null&&E.includes(t))&&(f=m.reactions,f===null?m.reactions=[t]:f.push(t))}else{if(t.f&bt)return!0;o&&(_>t.version&&(t.version=_,n=!0),f=m.reactions,f===null?m.reactions=[t]:f.includes(t)||f.push(t))}}r||at(t,dt),o&&(t.f^=Ce)}return n}function Oo(t,e,n){throw t}function fr(t){const e=W,n=Y,r=Tt,o=Z,s=qt,c=_t;W=null,Y=0,Tt=null,Z=t,qt=!Bt&&(t.f&$t)!==0,_t=!1;try{let v=(0,t.fn)(),f=t.deps;if(W!==null){let h;if(f!==null){const m=f.length,_=Y===0?W:f.slice(0,Y).concat(W),y=_.length>16&&m-Y>1?new Set(_):null;for(h=Y;h<m;h++){const C=f[h];(y!==null?!y.has(C):!_.includes(C))&&dr(t,C)}}if(f!==null&&Y>0)for(f.length=Y+W.length,h=0;h<W.length;h++)f[Y+h]=W[h];else t.deps=f=W;if(!qt)for(h=Y;h<f.length;h++){const m=f[h],_=m.reactions;_===null?m.reactions=[t]:_[_.length-1]!==t&&_.push(t)}}else f!==null&&Y<f.length&&(Oe(t,Y),f.length=Y);return v}finally{W=e,Y=n,Tt=r,Z=o,qt=s,_t=c}}function dr(t,e){const n=e.reactions;let r=0;if(n!==null){r=n.length-1;const o=n.indexOf(t);o!==-1&&(r===0?e.reactions=null:(n[o]=n[r],n.pop()))}r===0&&e.f&Ot&&(at(e,Lt),e.f&($t|Ce)||(e.f^=Ce),Oe(e,0))}function Oe(t,e){const n=t.deps;if(n!==null){const r=e===0?null:n.slice(0,e);let o;for(o=e;o<n.length;o++){const s=n[o];(r===null||!r.includes(s))&&dr(t,s)}}}function vn(t,e=!0){let n=t.first;t.first=null,t.last=null;for(var r;n!==null;)r=n.next,ve(n,e),n=r}function Le(t){var e=t.f;if(!(e&Gt)){at(t,dt);var n=t.ctx,r=M,o=U;M=t,U=n;try{e&rr||vn(t),yr(t);var s=fr(t);t.teardown=typeof s=="function"?s:null}catch(c){Oo(c)}finally{M=r,U=o}}}function hr(){Yt>1e3&&(Yt=0,bo()),Yt++}function pr(t){var e=t.length;if(e!==0){hr();var n=Bt;Bt=!0;try{for(var r=0;r<e;r++){var o=t[r];if(o.first===null&&!(o.f&yt))Hn([o]);else{var s=[];vr(o,s),Hn(s)}}}finally{Bt=n}}}function Hn(t){var e=t.length;if(e!==0)for(var n=0;n<e;n++){var r=t[n];!(r.f&(Gt|jt))&&fe(r)&&(Le(r),r.deps===null&&r.first===null&&r.dom===null&&(r.teardown===null?br(r):r.fn=null))}}function Lo(){if(le=!1,Yt>1001)return;const t=Nt;Nt=[],pr(t),le||(Yt=0)}function je(t){ye===cr&&(le||(le=!0,queueMicrotask(Lo)));for(var e=t;e.parent!==null;){e=e.parent;var n=e.f;if(n&yt){if(!(n&dt))return;at(e,Lt)}}Nt.push(e)}function vr(t,e){var n=t.first,r=[];t:for(;n!==null;){var o=n.f,s=(o&(Gt|jt))===0,c=o&yt,v=(o&dt)!==0,f=n.first;if(s&&(!c||!v)){if(c&&at(n,dt),o&Xt){if(!c&&fe(n)&&(Le(n),f=n.first),f!==null){n=f;continue}}else if(o&nr)if(c||v){if(f!==null){n=f;continue}}else r.push(n)}var h=n.next;if(h===null){let E=n.parent;for(;E!==null;){if(t===E)break t;var m=E.next;if(m!==null){n=m;continue t}E=E.parent}}n=h}for(var _=0;_<r.length;_++)f=r[_],e.push(f),vr(f,e)}function Rt(t,e=!0){var n=ye,r=Nt;try{hr();const s=[];ye=Ao,Nt=s,le=!1,e&&pr(r);var o=t==null?void 0:t();return So(),(Nt.length>0||s.length>0)&&Rt(),Yt=0,o}finally{ye=n,Nt=r}}function D(t){const e=t.f;if(e&Gt)return t.v;if(Z!==null&&!(Z.f&(yt|dn))&&!_t){const n=(Z.f&$t)!==0,r=Z.deps;W===null&&r!==null&&r[Y]===t&&!(n&&M!==null)?Y++:(r===null||Y===0||r[Y-1]!==t)&&(W===null?W=[t]:W[W.length-1]!==t&&W.push(t)),Tt!==null&&M!==null&&M.f&dt&&!(M.f&yt)&&Tt.includes(t)&&(at(M,bt),je(M))}return e&Ot&&fe(t)&&ur(t,!1),t.v}function gn(t,e,n){var r=t.reactions;if(r!==null)for(var o=nn(),s=r.length,c=0;c<s;c++){var v=r[c],f=v.f;if(!(f&bt||(!n||!o)&&v===M)){at(v,e);var h=(f&Lt)!==0,m=(f&$t)!==0;(f&dt||h&&m)&&(v.f&Ot?gn(v,Lt,n):je(v))}}}function gr(t){const e=_t;try{return _t=!0,t()}finally{_t=e}}const jo=~(bt|Lt|dt);function at(t,e){t.f=t.f&jo|e}function Mo(t){return typeof t=="object"&&t!==null&&typeof t.f=="number"}function de(t,e=!1,n){U={p:U,c:null,e:null,m:!1,s:t,x:null,l:null},e||(U.l={s:null,u:null,r1:[],r2:nt(!1)})}function he(t){const e=U;if(e!==null){t!==void 0&&(e.x=t);const r=e.e;if(r!==null){e.e=null;for(var n=0;n<r.length;n++)_n(r[n])}U=e.p,e.m=!0}return t||{}}function Q(t){return Mo(t)?D(t):t}function Ro(t){var e=document.createElement("template");return e.innerHTML=t,e.content}function mn(t){if(Ut(t))for(var e=0;e<t.length;e++){var n=t[e];n.isConnected&&n.remove()}else t.isConnected&&t.remove()}function Io(t){M===null&&Z===null&&yo(),pn&&mo()}function Pn(t,e){var n=e.last;n===null?e.last=e.first=t:(n.next=t,t.prev=n,e.last=t)}function Kt(t,e,n){var r=(t&dn)!==0,o={ctx:U,deps:null,dom:null,f:t|bt,first:null,fn:e,last:null,next:null,parent:r?null:M,prev:null,teardown:null,transitions:null};if(n){var s=Bt;try{Rn(!0),Le(o),o.f|=fo}finally{Rn(s)}}else e!==null&&je(o);var c=n&&o.deps===null&&o.first===null&&o.dom===null&&o.teardown===null;if(!c&&Z!==null&&!r){var v=Z.f;v&Ot&&(v&$t&&_o(),M!==null&&Pn(o,M)),Pn(o,Z)}return o}function mr(t){const e=Kt(Xt,null,!1);return at(e,dt),e.teardown=t,e}function rn(t){Io();var e=M!==null&&(M.f&Xt)!==0&&U!==null&&!U.m;if(e){var n=U;(n.e??(n.e=[])).push(t)}else{var r=_n(t);return r}}function Fo(t){const e=Kt(dn,t,!0);return()=>{ve(e)}}function _n(t){return Kt(nr,t,!1)}function pe(t){return Kt(Xt,t,!0)}function mt(t){return pe(t)}function _r(t,e=0){return Kt(Xt|rr|e,t,!0)}function ae(t){return Kt(Xt|yt,t,!0)}function yr(t){var e=t.teardown;if(e!==null){const n=pn,r=_t;In(!0),Fn(!0);try{e.call(null)}finally{In(n),Fn(r)}}}function ve(t,e=!0){var n=t.dom;if(n!==null&&e&&mn(n),vn(t,e),Oe(t,0),at(t,Gt),t.transitions)for(const o of t.transitions)o.stop();yr(t);var r=t.parent;r!==null&&t.f&yt&&r.first!==null&&br(t),t.next=t.prev=t.teardown=t.ctx=t.dom=t.deps=t.parent=t.fn=null}function br(t){var e=t.parent,n=t.prev,r=t.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),e!==null&&(e.first===t&&(e.first=r),e.last===t&&(e.last=n))}function on(t,e){var n=[];yn(t,n,!0),wr(n,()=>{ve(t),e&&e()})}function wr(t,e){var n=t.length;if(n>0){var r=()=>--n||e();for(var o of t)o.out(r)}else e()}function yn(t,e,n){if(!(t.f&jt)){if(t.f^=jt,t.transitions!==null)for(const c of t.transitions)(c.is_global||n)&&e.push(c);for(var r=t.first;r!==null;){var o=r.next,s=(r.f&hn)!==0||(r.f&yt)!==0;yn(r,e,s?n:!1),r=o}}}function Se(t){Er(t,!0)}function Er(t,e){if(t.f&jt){t.f^=jt,fe(t)&&Le(t);for(var n=t.first;n!==null;){var r=n.next,o=(n.f&hn)!==0||(n.f&yt)!==0;Er(n,o?e:!1),n=r}if(t.transitions!==null)for(const s of t.transitions)(s.is_global||e)&&s.in()}}var ze,zt;function Cr(){if(ze===void 0){ze=window,zt=document;var t=Element.prototype;t.__click=void 0,t.__className="",t.__attributes=null,t.__e=void 0,Text.prototype.__t=void 0}}function Jt(){return document.createTextNode("")}function lt(t){const e=t.firstChild;return G?e===null?t.appendChild(Jt()):Wt(e):e}function Me(t,e){return G?Wt(Dt):t.firstChild}function I(t,e=!1){var n=t.nextSibling;if(!G)return n;var r=n.nodeType;if(r===8&&n.data===oo)return I(n,e);if(e&&r!==3){var o=Jt(),s=M.dom;return s.unshift(o),n==null||n.before(o),o}return Wt(n)}function bn(t){t.textContent=""}function Ho(t){return document.createElement(t)}function Po(t,e,n,r){function o(s){if(r.capture||sn(e,s),!s.cancelBubble)return n.call(this,s)}return t.startsWith("pointer")||t==="wheel"?ce(()=>{e.addEventListener(t,o,r)}):e.addEventListener(t,o,r),o}function gt(t,e,n,r,o){var s={capture:r,passive:o},c=Po(t,e,n,s);(e===document.body||e===window||e===document)&&mr(()=>{e.removeEventListener(t,c,s)})}function kr(t){for(var e=0;e<t.length;e++)xr.add(t[e]);for(var n of ln)n(t)}function sn(t,e){var z;var n=t.ownerDocument,r=e.type,o=((z=e.composedPath)==null?void 0:z.call(e))||[],s=o[0]||e.target,c=0,v=e.__root;if(v){var f=o.indexOf(v);if(f!==-1&&(t===document||t===window)){e.__root=t;return}var h=o.indexOf(t);if(h===-1)return;f<=h&&(c=f)}if(s=o[c]||e.target,s!==t){se(e,"currentTarget",{configurable:!0,get(){return s||n}});try{for(var m,_=[];s!==null;){var E=s.parentNode||s.host||null;try{var y=s["__"+r];if(y!==void 0&&!s.disabled)if(Ut(y)){var[C,...S]=y;C.apply(s,[e,...S])}else y.call(s,e)}catch(O){m?_.push(O):m=O}if(e.cancelBubble||E===t||E===null)break;s=E}if(m){for(let O of _)queueMicrotask(()=>{throw O});throw m}}finally{e.__root=t,s=t}}}const xr=new Set,ln=new Set;function Ve(t,e){(t.__t??(t.__t=t.nodeValue))!==e&&(t.nodeValue=t.__t=e)}function Tr(t,e){const n=e.anchor??e.target.appendChild(Jt());return Rt(()=>$r(t,{...e,anchor:n}),!1)}function qo(t,e){const n=e.target,r=Mt;try{return Rt(()=>{kt(!0);for(var o=n.firstChild;o&&(o.nodeType!==8||o.data!==we);)o=o.nextSibling;if(!o)throw Ze;const s=Wt(o),c=$r(t,{...e,anchor:s});return kt(!1),c},!1)}catch(o){if(o===Ze)return e.recover===!1&&wo(),Cr(),bn(n),kt(!1),Tr(t,e);throw o}finally{kt(!!r),so(r)}}function $r(t,{target:e,anchor:n,props:r={},events:o,context:s,intro:c=!1}){Cr();const v=new Set,f=sn.bind(null,e),h=sn.bind(null,document),m=y=>{for(let C=0;C<y.length;C++){const S=y[C];v.has(S)||(v.add(S),e.addEventListener(S,f,jn.includes(S)?{passive:!0}:void 0),document.addEventListener(S,h,jn.includes(S)?{passive:!0}:void 0))}};m(lo(xr)),ln.add(m);let _;const E=Fo(()=>(ae(()=>{if(s){de({});var y=U;y.c=s}o&&(r.$$events=o),_=t(n,r)||{},s&&he()}),()=>{for(const y of v)e.removeEventListener(y,f);ln.delete(m),an.delete(_)}));return an.set(_,E),_}let an=new WeakMap;function Bo(t){const e=an.get(t);e==null||e()}async function wn(t,e,n){await Promise.resolve();const r=Yo(t);if(!r.getElementById(e)){const o=Ho("style");o.id=e,o.textContent=n,(r.head||r).appendChild(o)}}function Yo(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function ue(t,e,n,r=null,o=!1){var s=null,c=null,v=null,f=o?hn:0;_r(()=>{if(v===(v=!!e()))return;let h=!1;if(G){const m=t.data===tr;v===m&&(mn(Mt),kt(!1),h=!0)}v?(s?Se(s):s=ae(()=>n(t)),c&&on(c,()=>{c=null})):(c?Se(c):r&&(c=ae(()=>r(t))),s&&on(s,()=>{s=null})),h&&kt(!0)},f)}let Xe=null;function Wo(t,e){return e}function Uo(t,e,n){for(var r=[],o=t.length,s=0;s<o;s++)yn(t[s].e,r,!0);var c=o>0&&r.length===0&&e!==null;if(c){var v=e.parentNode;bn(v),v.append(e),n.clear(),xt(t[0].prev,t[o-1].next)}wr(r,()=>{for(var f=0;f<o;f++){var h=t[f];c||(n.delete(h.k),h.o.remove(),xt(h.prev,h.next)),ve(h.e,!c)}})}function En(t,e,n,r,o,s=null){var c={flags:e,items:new Map,next:null},v=(e&Zn)!==0;if(v){var f=t;t=G?Wt(f.firstChild):f.appendChild(Jt())}var h=null;_r(()=>{var m=n(),_=Ut(m)?m:m==null?[]:Array.from(m),E=_.length,y=c.flags;y&Je&&!er(_)&&!(X in _)&&(y^=Je,y&Qr&&!(y&ie)&&(y^=ie));let C=!1;if(G){var S=t.data===tr;S!==(E===0)&&(mn(Mt),kt(!1),C=!0)}if(G){for(var z=Dt,O=c,T,x=0;x<E;x++){if(z.nodeType!==8||z.data!==we){C=!0,kt(!1);break}var A=z;z=Wt(z);var K=_[x],k=r(K,x);T=Sr(A,z,O,null,K,k,x,o,y),c.items.set(k,T),z=z.nextSibling,O=T}if(E>0)for(;z!==t;){var $=z.nextSibling;z.remove(),z=$}}G||Vo(_,c,t,o,y,r),s!==null&&(E===0?h?Se(h):h=ae(()=>s(t)):h!==null&&on(h,()=>{h=null})),C&&kt(!0)})}function Vo(t,e,n,r,o,s){var B,ot,St,Zt;var c=(o&to)!==0,v=(o&(ie|fn))!==0,f=t.length,h=e.items,m=e.next,_=m,E=new Set,y=e,C=new Set,S=[],z=[],O,T,x,A;if(c)for(A=0;A<f;A+=1)O=t[A],T=s(O,A),x=h.get(T),x!==void 0&&((B=x.a)==null||B.measure(),C.add(x));for(A=0;A<f;A+=1){if(O=t[A],T=s(O,A),x=h.get(T),x===void 0){var K=Jt(),k=_?_.o:n;k.before(K),y=Sr(K,k,y,y.next,O,T,A,r,o),h.set(T,y),S=[],z=[],_=y.next;continue}if(v&&Xo(x,O,A,o),x.e.f&jt&&(Se(x.e),c&&((ot=x.a)==null||ot.unfix(),C.delete(x))),x!==_){if(E.has(x)){if(S.length<z.length){var $=z[0],L;y=$.prev;var j=S[0],F=S[S.length-1];for(L=0;L<S.length;L+=1)qn(S[L],$,n);for(L=0;L<z.length;L+=1)E.delete(z[L]);xt(j.prev,F.next),xt(y,j),xt(F,$),_=$,y=F,A-=1,S=[],z=[]}else E.delete(x),qn(x,_,n),xt(x.prev,x.next),xt(x,y.next),xt(y,x),y=x;continue}for(S=[],z=[];_!==null&&_.k!==T;)E.add(_),z.push(_),_=_.next;if(_===null)continue;x=_}S.push(x),y=x,_=x.next}const V=Array.from(E);for(;_!==null;)V.push(_),_=_.next;var J=V.length;if(J>0){var ut=o&Zn&&f===0?n:null;if(c){for(A=0;A<J;A+=1)(St=V[A].a)==null||St.measure();for(A=0;A<J;A+=1)(Zt=V[A].a)==null||Zt.fix()}Uo(V,ut,h)}c&&ce(()=>{var Qt;for(x of C)(Qt=x.a)==null||Qt.apply()})}function Xo(t,e,n,r){r&ie&&P(t.v,e),r&fn?P(t.i,n):t.i=n}function Sr(t,e,n,r,o,s,c,v,f){var h=Xe;try{var m=(f&ie)!==0,_=(f&Je)===0,E=m?_?ke(o):nt(o):o,y=f&fn?nt(c):c,C={i:y,v:E,k:s,a:null,e:null,o:t,prev:n,next:r};return n.next=C,r!==null&&(r.prev=C),Xe=C,C.e=ae(()=>v(e,E,y)),C}finally{Xe=h}}function qn(t,e,n){for(var r=t.next?t.next.o:n,o=e?e.o:n,s=t.o;s!==r;){var c=s.nextSibling;o.before(s),s=c}}function xt(t,e){t.next=e,e!==null&&(e.prev=t)}function Ne(t,e=M){var n=e.dom;return n===null?e.dom=t:(Ut(n)||(n=e.dom=[n]),Ut(t)?n.push(...t):n.push(t)),t}function ht(t,e){var n=(e&no)!==0,r=(e&ro)!==0,o;return()=>{if(G)return Ne(n?Mt:Dt),Dt;o||(o=Ro(t),n||(o=o.firstChild));var s=r?document.importNode(o,!0):o.cloneNode(!0);return Ne(n?[...s.childNodes]:s),s}}function zr(){if(G)return Ne(Mt),Dt;var t=document.createDocumentFragment(),e=Jt();return t.append(e),Ne([e]),t}function et(t,e){G||t.before(e)}function Go(t,e){{const n=document.body;t.autofocus=!0,ce(()=>{document.activeElement===n&&t.focus()})}}function Ko(t){G&&t.firstChild!==null&&bn(t)}let Bn=!1;function Nr(){Bn||(Bn=!0,document.addEventListener("reset",t=>{Promise.resolve().then(()=>{var e;if(!t.defaultPrevented)for(const n of t.target.elements)(e=n.__on_r)==null||e.call(n)})},{capture:!0}))}function Jo(t){if(G){let e=!1;const n=()=>{if(e)return;e=!0;const r=t.getAttribute("value");ft(t,"value",null),ft(t,"checked",null),r&&(t.value=r)};t.__on_r=n,$o(n),Nr()}}function Zo(t,e){var n=t.__attributes??(t.__attributes={});n.value!==(n.value=e)&&(t.value=e)}function ft(t,e,n){n=n==null?null:n+"";var r=t.__attributes??(t.__attributes={});G&&(r[e]=t.getAttribute(e),e==="src"||e==="href"||e==="srcset")||r[e]!==(r[e]=n)&&(e==="loading"&&(t[po]=n),n===null?t.removeAttribute(e):t.setAttribute(e,n))}function oe(t,e,n){n?t.classList.add(e):t.classList.remove(e)}function Ar(t,e,n,r=n){t.addEventListener(e,n);const o=t.__on_r;o?t.__on_r=()=>{o(),r()}:t.__on_r=r,Nr()}function Qo(t,e,n){Ar(t,"input",()=>{n(Wn(t)?Un(t.value):t.value)}),pe(()=>{var r=e();if(G&&t.defaultValue!==t.value){n(t.value);return}Wn(t)&&r===Un(t.value)||t.type==="date"&&!r&&!t.value||(t.value=r??"")})}function ti(t,e,n,r,o){var s=n.getAttribute("type")==="checkbox",c=t;let v=!1;if(e!==null)for(var f of e){var h=c;c=h[f],c===void 0&&(c=h[f]=[])}c.push(n),Ar(n,"change",()=>{var m=n.__value;s&&(m=Yn(c,m,n.checked)),o(m)},()=>o(s?[]:null)),pe(()=>{var m=r();if(G&&n.defaultChecked!==n.checked){v=!0;return}s?(m=m||[],n.checked=xe(m).includes(xe(n.__value))):n.checked=xo(n.__value,m)}),mr(()=>{var m=c.indexOf(n);m!==-1&&c.splice(m,1)}),ce(()=>{if(c.sort((E,y)=>E.compareDocumentPosition(y)===4?-1:1),v){var m;if(s)m=Yn(c,m,n.checked);else{var _=c.find(E=>E.checked);m=_==null?void 0:_.__value}o(m)}})}function Yn(t,e,n){for(var r=new Set,o=0;o<t.length;o+=1)t[o].checked&&r.add(t[o].__value);return n||r.delete(e),Array.from(r)}function Wn(t){var e=t.type;return e==="number"||e==="range"}function Un(t){return t===""?null:+t}function Vn(t,e){var r;var n=t&&((r=t[X])==null?void 0:r.t);return t===e||n===e}function un(t,e,n,r){_n(()=>{var o,s;return pe(()=>{o=s,s=[],gr(()=>{t!==n(...s)&&(e(t,...s),o&&Vn(n(...o),t)&&e(null,...o))})}),()=>{ce(()=>{s&&Vn(n(...s),t)&&e(null,...s)})}})}function Re(t,e,n,r){var y;var o=(n&eo)!==0,s=t[e],c=(y=Qe(t,e))==null?void 0:y.set,v=r,f=()=>v;s===void 0&&r!==void 0&&(c&&o&&Eo(),s=f(),c&&c(s));var h;if(h=()=>{var C=t[e];return C===void 0?f():C},c)return function(C){return arguments.length===1?(c(C),C):h()};var m=!1,_=ke(s),E=zo(()=>{var C=h(),S=D(_);return m?(m=!1,S):_.v=C});return function(C){var S=D(E);return arguments.length>0?(E.equals(C)||(m=!0,P(_,C),D(E),E.version++),C):S}}function ei(t){return new ni(t)}var Et,it;class ni{constructor(e){We(this,Et);We(this,it);const n=st({...e.props||{},$$events:{}},!1);Ue(this,it,(e.hydrate?qo:Tr)(e.component,{target:e.target,props:n,context:e.context,intro:e.intro,recover:e.recover})),Ue(this,Et,n.$$events);for(const r of Object.keys(tt(this,it)))r==="$set"||r==="$destroy"||r==="$on"||se(this,r,{get(){return tt(this,it)[r]},set(o){tt(this,it)[r]=o},enumerable:!0});tt(this,it).$set=r=>{Object.assign(n,r)},tt(this,it).$destroy=()=>{Bo(tt(this,it))}}$set(e){tt(this,it).$set(e)}$on(e,n){tt(this,Et)[e]=tt(this,Et)[e]||[];const r=(...o)=>n.call(this,...o);return tt(this,Et)[e].push(r),()=>{tt(this,Et)[e]=tt(this,Et)[e].filter(o=>o!==r)}}$destroy(){tt(this,it).$destroy()}}Et=new WeakMap,it=new WeakMap;let Dr;typeof HTMLElement=="function"&&(Dr=class extends HTMLElement{constructor(e,n,r){super();ct(this,"$$ctor");ct(this,"$$s");ct(this,"$$c");ct(this,"$$cn",!1);ct(this,"$$d",{});ct(this,"$$r",!1);ct(this,"$$p_d",{});ct(this,"$$l",{});ct(this,"$$l_u",new Map);ct(this,"$$me");this.$$ctor=e,this.$$s=n,r&&this.attachShadow({mode:"open"})}addEventListener(e,n,r){if(this.$$l[e]=this.$$l[e]||[],this.$$l[e].push(n),this.$$c){const o=this.$$c.$on(e,n);this.$$l_u.set(n,o)}super.addEventListener(e,n,r)}removeEventListener(e,n,r){if(super.removeEventListener(e,n,r),this.$$c){const o=this.$$l_u.get(n);o&&(o(),this.$$l_u.delete(n))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){let e=function(o){return s=>{const c=document.createElement("slot");o!=="default"&&(c.name=o),et(s,c)}};if(await Promise.resolve(),!this.$$cn||this.$$c)return;const n={},r=ri(this);for(const o of this.$$s)o in r&&(o==="default"&&!this.$$d.children?(this.$$d.children=e(o),n.default=!0):n[o]=e(o));for(const o of this.attributes){const s=this.$$g_p(o.name);s in this.$$d||(this.$$d[s]=be(s,o.value,this.$$p_d,"toProp"))}for(const o in this.$$p_d)!(o in this.$$d)&&this[o]!==void 0&&(this.$$d[o]=this[o],delete this[o]);this.$$c=ei({component:this.$$ctor,target:this.shadowRoot||this,props:{...this.$$d,$$slots:n,$$host:this}}),this.$$me=pe(()=>{var o;this.$$r=!0;for(const s of Ee(this.$$c)){if(!((o=this.$$p_d[s])!=null&&o.reflect))continue;this.$$d[s]=this.$$c[s];const c=be(s,this.$$d[s],this.$$p_d,"toAttribute");c==null?this.removeAttribute(this.$$p_d[s].attribute||s):this.setAttribute(this.$$p_d[s].attribute||s,c)}this.$$r=!1});for(const o in this.$$l)for(const s of this.$$l[o]){const c=this.$$c.$on(o,s);this.$$l_u.set(s,c)}this.$$l={}}}attributeChangedCallback(e,n,r){var o;this.$$r||(e=this.$$g_p(e),this.$$d[e]=be(e,r,this.$$p_d,"toProp"),(o=this.$$c)==null||o.$set({[e]:this.$$d[e]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then(()=>{!this.$$cn&&this.$$c&&(this.$$c.$destroy(),ve(this.$$me),this.$$c=void 0)})}$$g_p(e){return Ee(this.$$p_d).find(n=>this.$$p_d[n].attribute===e||!this.$$p_d[n].attribute&&n.toLowerCase()===e)||e}});function be(t,e,n,r){var s;const o=(s=n[t])==null?void 0:s.type;if(e=o==="Boolean"&&typeof e!="boolean"?e!=null:e,!r||!n[t])return e;if(r==="toAttribute")switch(o){case"Object":case"Array":return e==null?null:JSON.stringify(e);case"Boolean":return e?"":null;case"Number":return e??null;default:return e}else switch(o){case"Object":case"Array":return e&&JSON.parse(e);case"Boolean":return e;case"Number":return e!=null?+e:e;default:return e}}function ri(t){const e={};return t.childNodes.forEach(n=>{e[n.slot||"default"]=!0}),e}function Ie(t,e,n,r,o,s){let c=class extends Dr{constructor(){super(t,n,o),this.$$p_d=e}static get observedAttributes(){return Ee(e).map(v=>(e[v].attribute||v).toLowerCase())}};return Ee(e).forEach(v=>{se(c.prototype,v,{get(){return this.$$c&&v in this.$$c?this.$$c[v]:this.$$d[v]},set(f){var h;f=be(v,f,e),this.$$d[v]=f,(h=this.$$c)==null||h.$set({[v]:f})}})}),r.forEach(v=>{se(c.prototype,v,{get(){var f;return(f=this.$$c)==null?void 0:f[v]}})}),t.element=c,c}const Vt=new Map([["yellow","#F8B920"],["red","#FF4646"],["blue","#0064FF"],["green","#00C564"]]),oi=["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","OPTION"];function Or(t){const e=t.map(c=>c.trim().toLocaleLowerCase()),n=e.map(()=>({start:null,end:null,shift:0})),r=e.map(()=>[]),o=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,c=>{var v,f;return oi.includes((v=c.parentNode)==null?void 0:v.tagName)||!((f=c.parentNode)!=null&&f.checkVisibility())?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let s;for(;s=o.nextNode();)if(s!=null&&s.nodeValue)for(let c=0;c<s.nodeValue.length;c++){const v=s.nodeValue[c].toLocaleLowerCase().trim();v&&e.forEach((f,h)=>{var _;for(;f[n[h].shift]&&!f[n[h].shift].trim();)n[h].shift++;let m=f[n[h].shift]===v;if(!m&&n[h].shift&&(n[h].shift=0,m=f[n[h].shift]===v),m&&(n[h].shift||(n[h].start=[s,c]),n[h].end=[s,c],n[h].shift++),n[h].shift>=f.length){const E=document.createRange();E.setStart(n[h].start[0],n[h].start[1]),E.setEnd(n[h].end[0],n[h].end[1]+1),!E.collapsed&&((_=E.commonAncestorContainer.parentElement)!=null&&_.checkVisibility())?r[h].push(E):E.detach(),m=!1}m||(n[h].shift=0,n[h].start=null,n[h].end=null)})}return r}const At=`rh-${new Date().getTime()}-`,Fe="highlights"in CSS;function ii(t){if(!t.length&&!CSS.highlights.size)return;const e=[];if(CSS.highlights.clear(),t.length){const r=Or(t.map(({text:o})=>o||""));for(const o in t){if(!r[o].length)continue;const{_id:s,color:c}=t[o],v=`${At}${s}`;CSS.highlights.set(v,new Highlight(...r[o]));const f=r[o][0].getBoundingClientRect();e.push(`
                ::highlight(${v}) {
                    all: unset;
                    background-color: color-mix(in srgb, ${Vt.get(c)||c}, white 50%) !important;
                    color: black;
                }

                :root {
                    --highlight-${s}-top: ${(100/document.documentElement.scrollHeight*(window.scrollY+f.top-10)).toFixed(2)}%;
                }
            `);for(const h of r[o])h.detach()}}const n=(()=>{let r=document.getElementById(At);return r||(r=document.createElement("style"),r.id=At,document.head.appendChild(r)),r})();n.innerHTML=e.join(`
`)}function si(){var t;(t=document.getElementById(At))==null||t.remove()}function li(t){var e;for(const[n,r]of CSS.highlights){const o=n.replace(At,"");if(t==o)for(const s of r){(e=s.startContainer.parentElement)==null||e.scrollIntoView({behavior:"smooth",block:"start"});break}}}function ai(t){let e;for(const[n,r]of CSS.highlights)for(const o of r){const s=t.compareBoundaryPoints(Range.START_TO_START,o),c=t.compareBoundaryPoints(Range.END_TO_END,o);(s==0&&c==0||t!=null&&t.collapsed&&s>=0&&c<=0)&&(e=[n.replace(At,""),o])}if(e)return e[0].replace(At,"")}const Ct=`rh-${new Date().getTime()}`;function ui(t){const e=document.body.querySelectorAll(`.${Ct}`);if(!t.length&&!e.length)return;e.forEach(s=>s.outerHTML=s.innerText);const n=[],r=Or(t.map(({text:s})=>s||""));for(const s in t){const{_id:c,color:v}=t[s];for(const f of r[s]){const h=document.createElement("mark");h.className=Ct,h.setAttribute("data-id",String(c)),h.append(f.extractContents()),f.insertNode(h),f.detach()}n.push(`
            .${Ct}[data-id="${c}"] {
                all: unset;
                display: inline-block;
                background-color: ${hi(Vt.get(v)||v,.5)} !important;
            }
        `)}const o=(()=>{let s=document.getElementById(Ct);return s||(s=document.createElement("style"),s.id=Ct,document.head.appendChild(s)),s})();o.innerHTML=n.join(`
`)}function ci(){var t;document.body.querySelectorAll(`.${Ct}`).forEach(e=>e.outerHTML=e.innerText),(t=document.getElementById(Ct))==null||t.remove()}function fi(t){const e=document.body.querySelector(`.${Ct}[data-id="${t}"]`);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}function di(t){const e=t.commonAncestorContainer.nodeType==Node.ELEMENT_NODE?t.commonAncestorContainer:t.commonAncestorContainer.parentElement;if((e==null?void 0:e.className)==Ct){if(!t.collapsed){const n=new Range;n.selectNodeContents(t.commonAncestorContainer);const r=t.compareBoundaryPoints(Range.START_TO_START,n),o=t.compareBoundaryPoints(Range.END_TO_END,n);if(n.detach(),r!=0||o!=0)return}return e.getAttribute("data-id")||void 0}}function hi(t,e){if(!t)return t;const n=parseInt(t.slice(1,3),16),r=parseInt(t.slice(3,5),16),o=parseInt(t.slice(5,7),16);return`rgba(${n}, ${r}, ${o}, ${e})`}function Ae(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var pi=typeof global=="object"&&global&&global.Object===Object&&global,vi=typeof self=="object"&&self&&self.Object===Object&&self,Lr=pi||vi||Function("return this")(),Ge=function(){return Lr.Date.now()},gi=/\s/;function mi(t){for(var e=t.length;e--&&gi.test(t.charAt(e)););return e}var _i=/^\s+/;function yi(t){return t&&t.slice(0,mi(t)+1).replace(_i,"")}var De=Lr.Symbol,jr=Object.prototype,bi=jr.hasOwnProperty,wi=jr.toString,ee=De?De.toStringTag:void 0;function Ei(t){var e=bi.call(t,ee),n=t[ee];try{t[ee]=void 0;var r=!0}catch{}var o=wi.call(t);return r&&(e?t[ee]=n:delete t[ee]),o}var Ci=Object.prototype,ki=Ci.toString;function xi(t){return ki.call(t)}var Ti="[object Null]",$i="[object Undefined]",Xn=De?De.toStringTag:void 0;function Si(t){return t==null?t===void 0?$i:Ti:Xn&&Xn in Object(t)?Ei(t):xi(t)}function zi(t){return t!=null&&typeof t=="object"}var Ni="[object Symbol]";function Ai(t){return typeof t=="symbol"||zi(t)&&Si(t)==Ni}var Gn=NaN,Di=/^[-+]0x[0-9a-f]+$/i,Oi=/^0b[01]+$/i,Li=/^0o[0-7]+$/i,ji=parseInt;function Kn(t){if(typeof t=="number")return t;if(Ai(t))return Gn;if(Ae(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=Ae(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=yi(t);var n=Oi.test(t);return n||Li.test(t)?ji(t.slice(2),n?2:8):Di.test(t)?Gn:+t}var Mi="Expected a function",Ri=Math.max,Ii=Math.min;function Fi(t,e,n){var r,o,s,c,v,f,h=0,m=!1,_=!1,E=!0;if(typeof t!="function")throw new TypeError(Mi);e=Kn(e)||0,Ae(n)&&(m=!!n.leading,_="maxWait"in n,s=_?Ri(Kn(n.maxWait)||0,e):s,E="trailing"in n?!!n.trailing:E);function y(k){var $=r,L=o;return r=o=void 0,h=k,c=t.apply(L,$),c}function C(k){return h=k,v=setTimeout(O,e),m?y(k):c}function S(k){var $=k-f,L=k-h,j=e-$;return _?Ii(j,s-L):j}function z(k){var $=k-f,L=k-h;return f===void 0||$>=e||$<0||_&&L>=s}function O(){var k=Ge();if(z(k))return T(k);v=setTimeout(O,S(k))}function T(k){return v=void 0,E&&r?y(k):(r=o=void 0,c)}function x(){v!==void 0&&clearTimeout(v),h=0,r=f=o=v=void 0}function A(){return v===void 0?c:T(Ge())}function K(){var k=Ge(),$=z(k);if(r=arguments,o=this,f=k,$){if(v===void 0)return C(f);if(_)return clearTimeout(v),v=setTimeout(O,e),y(f)}return v===void 0&&(v=setTimeout(O,e)),c}return K.cancel=x,K.flush=A,K}var Hi="Expected a function";function Mr(t,e,n){var r=!0,o=!0;if(typeof t!="function")throw new TypeError(Hi);return Ae(n)&&(r="leading"in n?!!n.leading:r,o="trailing"in n?!!n.trailing:o),Fi(t,e,{leading:r,maxWait:e,trailing:o})}function Rr(t){return Fe?ii(t):ui(t)}const Pi=Mr(Rr,500);function Ke(t){return t.length?Pi(t):Rr(t)}function qi(){return Fe?si():ci()}function Ir(t){return Fe?li(t):fi(t)}function Fr(){const t=document.getSelection();if(t!=null&&t.rangeCount)return t.getRangeAt(0)}function re(){const t=document.getSelection();t!=null&&t.rangeCount&&t.removeAllRanges()}function Bi(t){return Fe?ai(t):di(t)}function Jn(t){if(!t)return"";var e=document.createElement("div");e.appendChild(t.cloneContents().cloneNode(!0)),document.body.appendChild(e);const n=e.innerText;return document.body.removeChild(e),e=void 0,n}function Yi(t,e,n){let r=nt(st([])),o=nt(!1),s=nt(!1),c=nt(void 0);function v(y){const C=Bi(y);if(C)return D(r).find(z=>z._id==C);if(Jn(y).trim())return{text:Jn(y).trim(),color:"yellow"}}function f(y){const C={...y._id?{_id:y._id}:{},...y.text?{text:y.text}:{},...y.note?{note:y.note}:{},...y.color?{color:y.color}:{}};if(!C.text)return;const S=D(r).findIndex(z=>{var O,T;return z._id==C._id||((O=z.text)==null?void 0:O.toLocaleLowerCase().trim())===((T=C.text)==null?void 0:T.toLocaleLowerCase().trim())});S!=-1?(D(r)[S]=C,e(C)):(D(r).push(C),t(C))}function h({_id:y}){P(r,st(D(r).filter(C=>C._id!=y))),n({_id:y})}function m(y){P(c,st(JSON.parse(JSON.stringify(y))))}function _(){D(c)&&(f(D(c)),P(c,void 0))}function E(){P(c,void 0)}return{get highlights(){return D(r)},set highlights(y){P(r,st(y))},get pro(){return D(o)},set pro(y){P(o,st(y))},get nav(){return D(s)},set nav(y){P(s,st(y))},get draft(){return D(c)},find:v,upsert:f,remove:h,setDraft:m,draftSubmit:_,draftCancel:E}}const Wi="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Wi);function cn(){var t;return(t=navigator==null?void 0:navigator.userAgentData)!=null&&t.mobile?!0:/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)}var Ui=ht('<button type="submit" class="svelte-1iojgl7"><span class="color svelte-1iojgl7"></span></button>'),Vi=ht('<button type="submit" value="add" title="Create highlight" class="svelte-1iojgl7"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-1iojgl7"><g class="svelte-1iojgl7"><path d="M12.974,8.731c-.474,3.691-3.724,4.113-6.974,3.519" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-1iojgl7"></path><path d="M2.75,15.25S4.062,3.729,15.25,2.75c-.56,.976-.573,2.605-.946,4.239-.524,2.011-2.335,2.261-4.554,2.261" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-1iojgl7"></path></g></svg></button>'),Xi=ht('<button type="submit" value="remove" title="Delete highlight" class="svelte-1iojgl7"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-1iojgl7"><g class="svelte-1iojgl7"><line x1="2.75" y1="4.25" x2="15.25" y2="4.25" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-1iojgl7"></line><path d="M6.75,4.25v-1.5c0-.552,.448-1,1-1h2.5c.552,0,1,.448,1,1v1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-1iojgl7"></path><path d="M13.5,6.75l-.4,7.605c-.056,1.062-.934,1.895-1.997,1.895H6.898c-1.064,0-1.941-.833-1.997-1.895l-.4-7.605" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-1iojgl7"></path></g></svg></button>'),Gi=ht('<dialog class="svelte-1iojgl7"><form method="dialog" class="svelte-1iojgl7"><!> <button type="submit" value="note" title="Add note" class="svelte-1iojgl7"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-1iojgl7"><g class="svelte-1iojgl7"><path stroke-linecap="round" stroke-linejoin="round" d="M9,1.75C4.996,1.75,1.75,4.996,1.75,9c0,1.319,.358,2.552,.973,3.617,.43,.806-.053,2.712-.973,3.633,1.25,.068,2.897-.497,3.633-.973,.489,.282,1.264,.656,2.279,.848,.433,.082,.881,.125,1.338,.125,4.004,0,7.25-3.246,7.25-7.25S13.004,1.75,9,1.75Z" class="svelte-1iojgl7"></path><path stroke-width="0" d="M9,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-1iojgl7"></path><path stroke-width="0" d="M5.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-1iojgl7"></path><path stroke-width="0" d="M12.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-1iojgl7"></path></g></svg></button> <!></form></dialog>');function Hr(t,e){de(e,!0);let n=Re(e,"store",7),r,o=nt(void 0),s=nt(!1);function c(k){if(!D(o))return;const $=k.currentTarget.returnValue;switch(k.currentTarget.returnValue="",$){case"add":e.store.upsert(D(o)),re();break;case"note":e.store.setDraft(D(o)),re();break;case"remove":e.store.remove(D(o)),re();break;default:if(Vt.has($)){e.store.upsert({...D(o),color:$}),re();return}break}}function v(){P(s,!0)}function f(){P(s,!1),h()}function h(){if(D(s)){r==null||r.close();return}requestAnimationFrame(()=>{const k=Fr(),$=k&&e.store.find(k);if(!k||!($!=null&&$._id)&&!k.toString().trim()){r==null||r.close();return}P(o,st($)),r.inert=!0,r==null||r.show(),r.inert=!1;const L=k.getBoundingClientRect(),j=Math.max(L.x,10)+window.scrollX,F=window.innerWidth-Math.max(L.x,10)-window.scrollX-L.width,V=Math.max(L.y,40)+window.scrollY+L.height+4,J=window.innerHeight-Math.max(L.y,40)-window.scrollY+4,ut=j<window.innerWidth/2+window.scrollX,B=V<window.innerHeight/2+window.scrollY;r==null||r.style.setProperty("left",ut?`${j}px`:"unset"),r==null||r.style.setProperty("right",ut?"unset":`${F}px`),r==null||r.style.setProperty("top",B?`${V}px`:"unset"),r==null||r.style.setProperty("bottom",B?"unset":`${J}px`)})}const m=Mr(h,200,{leading:!0,trailing:!0});var _=Gi();gt("mousedown",zt,v,!1),gt("touchstart",zt,v,!1,!0),gt("mouseup",zt,f,!1),gt("touchend",zt,f,!1,!0),gt("touchcancel",zt,f,!1,!0),gt("selectionchange",zt,m,!1),un(_,k=>r=k,()=>r),mt(()=>oe(_,"mobile",cn()));var E=lt(_),y=lt(E);ue(y,()=>{var k;return(k=D(o))==null?void 0:k._id},k=>{var $=zr(),L=Me($);En(L,71,()=>Vt,(j,F)=>Q(Q(j))[0],(j,F,V)=>{let J=()=>Q(Q(F))[0],ut=()=>Q(Q(F))[1];var B=Ui(),ot=lt(B);mt(()=>{Zo(B,J()),ft(ot,"style",`--color: ${ut()??""}`),oe(ot,"active",J()==D(o).color)}),et(j,B)}),et(k,$)},k=>{var $=Vi();et(k,$)});var C=I(I(y,!0)),S=lt(C),z=lt(S),O=lt(z),T=I(O),x=I(T),A=I(x),K=I(I(C,!0));return ue(K,()=>{var k;return(k=D(o))==null?void 0:k._id},k=>{var $=Xi();et(k,$)}),mt(()=>{var k,$,L,j,F,V;oe(_,"new",!((k=D(o))!=null&&k._id)),ft(O,"fill",($=D(o))!=null&&$.note?"currentColor":"none"),ft(O,"stroke-width",(L=D(o))!=null&&L.note?"0":void 0),ft(T,"fill",(j=D(o))!=null&&j.note?"none":"currentColor"),ft(x,"fill",(F=D(o))!=null&&F.note?"none":"currentColor"),ft(A,"fill",(V=D(o))!=null&&V.note?"none":"currentColor")}),gt("close",_,c,!1),et(t,_),wn(t,"svelte-1iojgl7",`
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
`),he({get store(){return n()},set store(k){n(k),Rt()}})}Ie(Hr,{store:{}},[],[],!0);function Ki(t){const e=t.currentTarget.getBoundingClientRect();e.top<=t.clientY&&t.clientY<=e.top+e.height&&e.left<=t.clientX&&t.clientX<=e.left+e.width||(t.preventDefault(),t.currentTarget.close())}var Ji=(t,e)=>P(e,!1),Zi=ht('<input type="radio" name="color" class="svelte-2yzs5z">'),Qi=ht('<div class="unlock svelte-2yzs5z"><a href="https://raindrop.io/pro/buy" target="_blank" class="svelte-2yzs5z">Upgrade to Pro</a> to unlock annotation</div>'),ts=ht('<blockquote role="presentation" class="svelte-2yzs5z"> </blockquote> <fieldset class="color svelte-2yzs5z"></fieldset> <textarea class="note svelte-2yzs5z" rows="4" maxlength="5000" placeholder="Notes (optional)"></textarea> <!>',1),es=ht('<dialog role="presentation" class="svelte-2yzs5z"><header class="svelte-2yzs5z"> </header> <form method="dialog" class="svelte-2yzs5z"><!> <footer class="svelte-2yzs5z"><button formnovalidate="" class="svelte-2yzs5z">Cancel <sup class="svelte-2yzs5z">esc</sup></button> <button type="submit" value="OK" class="svelte-2yzs5z"> <sup class="svelte-2yzs5z">&crarr;</sup></button></footer></form></dialog>');function Pr(t,e){de(e,!0);const n=[];let r=Re(e,"store",7),o,s,c=nt(!0);rn(()=>{e.store.draft?(P(c,!0),o==null||o.showModal()):o==null||o.close()});function v(T){const x=T.currentTarget.returnValue;T.currentTarget.returnValue="",setTimeout(x?e.store.draftSubmit:e.store.draftCancel,200)}function f(T){var x;cn()||(T.stopImmediatePropagation(),T.stopPropagation(),T.key=="Enter"&&!T.shiftKey&&(T.preventDefault(),s&&((x=T.currentTarget.closest("form"))==null||x.requestSubmit(s))))}var h=es();un(h,T=>o=T,()=>o),h.__mousedown=[Ki],mt(()=>oe(h,"mobile",cn()));var m=lt(h),_=lt(m),E=I(I(m,!0)),y=lt(E);ue(y,()=>e.store.draft,T=>{var x=ts(),A=Me(x);A.__click=[Ji,c];var K=lt(A);mt(()=>{var j,F;return Ve(K,((F=(j=e.store.draft)==null?void 0:j.text)==null?void 0:F.trim())||"")});var k=I(I(A,!0));En(k,73,()=>Vt,Wo,(j,F,V)=>{let J=()=>Q(Q(F))[0],ut=()=>Q(Q(F))[1];var B=Zi();Jo(B);var ot;mt(()=>{ot!==(ot=J())&&(B.value=(B.__value=J())==null?"":J()),ft(B,"style",`--color: ${ut()??""}`)}),ti(n,[],B,()=>(J(),e.store.draft.color),St=>e.store.draft.color=St),et(j,B)});var $=I(I(k,!0));Ko($),Go($),$.__keydown=f;var L=I(I($,!0));ue(L,()=>!e.store.pro,j=>{var F=Qi();et(j,F)}),mt(()=>{oe(A,"compact",D(c)),$.disabled=!e.store.pro}),Qo($,()=>e.store.draft.note,j=>e.store.draft.note=j),et(T,x)});var C=I(I(y,!0)),S=lt(C),z=I(I(S,!0));un(z,T=>s=T,()=>s);var O=lt(z);return mt(()=>{var T,x;Ve(_,`${((T=e.store.draft)!=null&&T._id?"Edit":"New")??""} highlight`),Ve(O,`${((x=e.store.draft)!=null&&x._id?"Update":"Create")??""} `)}),gt("close",h,v,!1),et(t,h),wn(t,"svelte-2yzs5z",`
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
`),he({get store(){return r()},set store(T){r(T),Rt()}})}kr(["mousedown","click","keydown"]);Ie(Pr,{store:{}},[],[],!0);const ns=(t,e)=>{const n=t.target.getAttribute("data-highlight");n&&(t.preventDefault(),e(n))};var rs=ht('<div class="svelte-1t9y4ki"></div>'),os=ht('<nav role="presentation" class="svelte-1t9y4ki"></nav>');function qr(t,e){de(e,!0);let n=Re(e,"store",7);var r=zr(),o=Me(r);return ue(o,()=>e.store.nav,s=>{var c=os();c.__click=[ns,Ir],En(c,77,()=>e.store.highlights,(v,f)=>Q(v)._id,(v,f,h)=>{var m=rs();mt(()=>ft(m,"style",`top: var(--highlight-${Q(f)._id??""}-top); --color: ${(Vt.get(Q(f).color)||Q(f).color)??""}`)),mt(()=>ft(m,"data-highlight",Q(f)._id)),et(v,m)}),et(s,c)}),et(t,r),wn(t,"svelte-1t9y4ki",`
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
`),he({get store(){return n()},set store(s){n(s),Rt()}})}kr(["click"]);Ie(qr,{store:{}},[],[],!0);var is=ht("<!> <!> <!>",1);function ss(t,e){de(e,!0);let n=Re(e,"store",7);rn(()=>{Ke(e.store.highlights)});let r;function o(){Ke(e.store.highlights),clearTimeout(r),r=setTimeout(()=>Ke(e.store.highlights),3e3)}rn(()=>qi);var s=is();gt("load",ze,o,!1),gt("popstate",ze,o,!1);var c=Me(s);Hr(c,{get store(){return e.store}});var v=I(I(c,!0));Pr(v,{get store(){return e.store}});var f=I(I(v,!0));return qr(f,{get store(){return e.store}}),et(t,s),he({get store(){return n()},set store(h){n(h),Rt()}})}customElements.define("rdh-ui",Ie(ss,{store:{}},[],[],!0));function ls(t){if(typeof chrome=="object"&&chrome.runtime&&chrome.runtime.onMessage||typeof browser=="object"&&browser.runtime&&browser.runtime.onMessage){const{runtime:e}=typeof browser=="object"?browser:chrome,n=(r,o)=>{o.id==e.id&&typeof r.type=="string"&&t(r)};return e.onMessage.removeListener(n),e.onMessage.addListener(n),r=>e.sendMessage(null,r)}if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.rdh)return window.rdhSend=t,e=>window.webkit.messageHandlers.rdh.postMessage(e);if(typeof window<"u"&&typeof window.process=="object"&&window.process.type==="renderer"||typeof process<"u"&&typeof process.versions=="object"&&process.versions.electron){const{ipcRenderer:e}=require("electron"),n=(r,o)=>t(o);return e.removeListener("RDH",n),e.on("RDH",n),r=>e.sendToHost("RDH",r)}if("ReactNativeWebView"in window)return window.ReactNativeWebViewSendMessage=t,e=>window.ReactNativeWebView.postMessage(JSON.stringify(e));if(window.self!==window.top){const e=({data:n,source:r})=>{r!==window.parent||typeof n!="object"||typeof n.type!="string"||t(n)};return window.removeEventListener("message",e),window.addEventListener("message",e),n=>window.parent.postMessage(n,"*")}throw new Error("unsupported platform")}async function as(t){let e=!1;const n=new Set,r=ls(o=>{if(!e){n.add(o);return}t(o)});await new Promise(o=>{function s(){window.removeEventListener("DOMContentLoaded",s),o()}document.readyState=="loading"?(window.removeEventListener("DOMContentLoaded",s),window.addEventListener("DOMContentLoaded",s,{once:!0})):o()}),e=!0;for(const o of n)t(o),n.delete(o);return r}const ne=document.createElement("rdh-ui");(async()=>{const t=await as(n=>{switch(n.type){case"RDH_APPLY":Array.isArray(n.payload)&&(e.highlights=n.payload);break;case"RDH_CONFIG":typeof n.payload.pro=="boolean"&&(e.pro=n.payload.pro),typeof n.payload.nav=="boolean"&&(e.nav=n.payload.nav),typeof n.payload.enabled=="boolean"&&(n.payload.enabled===!0?document.body.contains(ne)||document.body.appendChild(ne):document.body.contains(ne)&&document.body.removeChild(ne));break;case"RDH_SCROLL":typeof n.payload._id=="string"&&Ir(n.payload._id);break;case"RDH_ADD_SELECTION":const r=Fr();if(!r)return;const o=e.find(r);if(!o)return;e.upsert(o),re();break;case"RDH_NOTE_SELECTION":console.log("not implemented yet");break}}),e=Yi(n=>t({type:"RDH_ADD",payload:n}),n=>t({type:"RDH_UPDATE",payload:n}),({_id:n})=>t({type:"RDH_REMOVE",payload:{_id:n}}));ne.store=e,t({type:"RDH_READY",payload:{url:location.href}})})();
