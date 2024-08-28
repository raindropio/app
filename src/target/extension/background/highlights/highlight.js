"use strict";var Xr=Object.defineProperty;var Rn=t=>{throw TypeError(t)};var Kr=(t,e,n)=>e in t?Xr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var at=(t,e,n)=>Kr(t,typeof e!="symbol"?e+"":e,n),Fn=(t,e,n)=>e.has(t)||Rn("Cannot "+n);var X=(t,e,n)=>(Fn(t,e,"read from private field"),n?n.call(t):e.get(t)),Ve=(t,e,n)=>e.has(t)?Rn("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),We=(t,e,n,r)=>(Fn(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n);(function(){var t=window.Document.prototype.createElement,e=window.Document.prototype.createElementNS,n=window.Document.prototype.importNode,r=window.Document.prototype.prepend,o=window.Document.prototype.append,s=window.DocumentFragment.prototype.prepend,l=window.DocumentFragment.prototype.append,v=window.Node.prototype.cloneNode,d=window.Node.prototype.appendChild,f=window.Node.prototype.insertBefore,_=window.Node.prototype.removeChild,m=window.Node.prototype.replaceChild,b=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),g=window.Element.prototype.attachShadow,k=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),$=window.Element.prototype.getAttribute,A=window.Element.prototype.setAttribute,C=window.Element.prototype.removeAttribute,N=window.Element.prototype.toggleAttribute,x=window.Element.prototype.getAttributeNS,L=window.Element.prototype.setAttributeNS,ft=window.Element.prototype.removeAttributeNS,D=window.Element.prototype.insertAdjacentElement,M=window.Element.prototype.insertAdjacentHTML,B=window.Element.prototype.prepend,P=window.Element.prototype.append,j=window.Element.prototype.before,U=window.Element.prototype.after,z=window.Element.prototype.replaceWith,lt=window.Element.prototype.remove,xt=window.HTMLElement,yt=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),Tt=window.HTMLElement.prototype.insertAdjacentElement,re=window.HTMLElement.prototype.insertAdjacentHTML,$n=new Set;"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(i){return $n.add(i)});function xn(i){var a=$n.has(i);return i=/^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(i),!a&&i}var Ir=document.contains?document.contains.bind(document):document.documentElement.contains.bind(document.documentElement);function V(i){var a=i.isConnected;if(a!==void 0)return a;if(Ir(i))return!0;for(;i&&!(i.__CE_isImportDocument||i instanceof Document);)i=i.parentNode||(window.ShadowRoot&&i instanceof ShadowRoot?i.host:void 0);return!(!i||!(i.__CE_isImportDocument||i instanceof Document))}function He(i){var a=i.children;if(a)return Array.prototype.slice.call(a);for(a=[],i=i.firstChild;i;i=i.nextSibling)i.nodeType===Node.ELEMENT_NODE&&a.push(i);return a}function Pe(i,a){for(;a&&a!==i&&!a.nextSibling;)a=a.parentNode;return a&&a!==i?a.nextSibling:null}function Ie(i,a,c){for(var p=i;p;){if(p.nodeType===Node.ELEMENT_NODE){var u=p;a(u);var h=u.localName;if(h==="link"&&u.getAttribute("rel")==="import"){if(p=u.import,c===void 0&&(c=new Set),p instanceof Node&&!c.has(p))for(c.add(p),p=p.firstChild;p;p=p.nextSibling)Ie(p,a,c);p=Pe(i,u);continue}else if(h==="template"){p=Pe(i,u);continue}if(u=u.__CE_shadowRoot)for(u=u.firstChild;u;u=u.nextSibling)Ie(u,a,c)}p=p.firstChild?p.firstChild:Pe(i,p)}}function ge(){var i=!(ht==null||!ht.noDocumentConstructionObserver),a=!(ht==null||!ht.shadyDomFastWalk);this.m=[],this.g=[],this.j=!1,this.shadyDomFastWalk=a,this.I=!i}function oe(i,a,c,p){var u=window.ShadyDOM;if(i.shadyDomFastWalk&&u&&u.inUse){if(a.nodeType===Node.ELEMENT_NODE&&c(a),a.querySelectorAll)for(i=u.nativeMethods.querySelectorAll.call(a,"*"),a=0;a<i.length;a++)c(i[a])}else Ie(a,c,p)}function qr(i,a){i.j=!0,i.m.push(a)}function Br(i,a){i.j=!0,i.g.push(a)}function qe(i,a){i.j&&oe(i,a,function(c){return Bt(i,c)})}function Bt(i,a){if(i.j&&!a.__CE_patched){a.__CE_patched=!0;for(var c=0;c<i.m.length;c++)i.m[c](a);for(c=0;c<i.g.length;c++)i.g[c](a)}}function dt(i,a){var c=[];for(oe(i,a,function(u){return c.push(u)}),a=0;a<c.length;a++){var p=c[a];p.__CE_state===1?i.connectedCallback(p):we(i,p)}}function G(i,a){var c=[];for(oe(i,a,function(u){return c.push(u)}),a=0;a<c.length;a++){var p=c[a];p.__CE_state===1&&i.disconnectedCallback(p)}}function bt(i,a,c){c=c===void 0?{}:c;var p=c.J,u=c.upgrade||function(w){return we(i,w)},h=[];for(oe(i,a,function(w){if(i.j&&Bt(i,w),w.localName==="link"&&w.getAttribute("rel")==="import"){var y=w.import;y instanceof Node&&(y.__CE_isImportDocument=!0,y.__CE_registry=document.__CE_registry),y&&y.readyState==="complete"?y.__CE_documentLoadHandled=!0:w.addEventListener("load",function(){var E=w.import;if(!E.__CE_documentLoadHandled){E.__CE_documentLoadHandled=!0;var S=new Set;p&&(p.forEach(function(H){return S.add(H)}),S.delete(E)),bt(i,E,{J:S,upgrade:u})}})}else h.push(w)},p),a=0;a<h.length;a++)u(h[a])}function we(i,a){try{var c=a.ownerDocument,p=c.__CE_registry,u=p&&(c.defaultView||c.__CE_isImportDocument)?ye(p,a.localName):void 0;if(u&&a.__CE_state===void 0){u.constructionStack.push(a);try{try{if(new u.constructorFunction!==a)throw Error("The custom element constructor did not produce the element being upgraded.")}finally{u.constructionStack.pop()}}catch(E){throw a.__CE_state=2,E}if(a.__CE_state=1,a.__CE_definition=u,u.attributeChangedCallback&&a.hasAttributes()){var h=u.observedAttributes;for(u=0;u<h.length;u++){var w=h[u],y=a.getAttribute(w);y!==null&&i.attributeChangedCallback(a,w,null,y,null)}}V(a)&&i.connectedCallback(a)}}catch(E){Vt(E)}}ge.prototype.connectedCallback=function(i){var a=i.__CE_definition;if(a.connectedCallback)try{a.connectedCallback.call(i)}catch(c){Vt(c)}},ge.prototype.disconnectedCallback=function(i){var a=i.__CE_definition;if(a.disconnectedCallback)try{a.disconnectedCallback.call(i)}catch(c){Vt(c)}},ge.prototype.attributeChangedCallback=function(i,a,c,p,u){var h=i.__CE_definition;if(h.attributeChangedCallback&&-1<h.observedAttributes.indexOf(a))try{h.attributeChangedCallback.call(i,a,c,p,u)}catch(w){Vt(w)}};function Tn(i,a,c,p){var u=a.__CE_registry;if(u&&(p===null||p==="http://www.w3.org/1999/xhtml")&&(u=ye(u,c)))try{var h=new u.constructorFunction;if(h.__CE_state===void 0||h.__CE_definition===void 0)throw Error("Failed to construct '"+c+"': The returned value was not constructed with the HTMLElement constructor.");if(h.namespaceURI!=="http://www.w3.org/1999/xhtml")throw Error("Failed to construct '"+c+"': The constructed element's namespace must be the HTML namespace.");if(h.hasAttributes())throw Error("Failed to construct '"+c+"': The constructed element must not have any attributes.");if(h.firstChild!==null)throw Error("Failed to construct '"+c+"': The constructed element must not have any children.");if(h.parentNode!==null)throw Error("Failed to construct '"+c+"': The constructed element must not have a parent node.");if(h.ownerDocument!==a)throw Error("Failed to construct '"+c+"': The constructed element's owner document is incorrect.");if(h.localName!==c)throw Error("Failed to construct '"+c+"': The constructed element's local name is incorrect.");return h}catch(w){return Vt(w),a=p===null?t.call(a,c):e.call(a,p,c),Object.setPrototypeOf(a,HTMLUnknownElement.prototype),a.__CE_state=2,a.__CE_definition=void 0,Bt(i,a),a}return a=p===null?t.call(a,c):e.call(a,p,c),Bt(i,a),a}function Vt(i){var a="",c="",p=0,u=0;i instanceof Error?(a=i.message,c=i.sourceURL||i.fileName||"",p=i.line||i.lineNumber||0,u=i.column||i.columnNumber||0):a="Uncaught "+String(i);var h=void 0;ErrorEvent.prototype.initErrorEvent===void 0?h=new ErrorEvent("error",{cancelable:!0,message:a,filename:c,lineno:p,colno:u,error:i}):(h=document.createEvent("ErrorEvent"),h.initErrorEvent("error",!1,!0,a,c,p),h.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0}})}),h.error===void 0&&Object.defineProperty(h,"error",{configurable:!0,enumerable:!0,get:function(){return i}}),window.dispatchEvent(h),h.defaultPrevented||console.error(i)}function Nn(){var i=this;this.g=void 0,this.F=new Promise(function(a){i.l=a})}Nn.prototype.resolve=function(i){if(this.g)throw Error("Already resolved.");this.g=i,this.l(i)};function Sn(i){var a=document;this.l=void 0,this.h=i,this.g=a,bt(this.h,this.g),this.g.readyState==="loading"&&(this.l=new MutationObserver(this.G.bind(this)),this.l.observe(this.g,{childList:!0,subtree:!0}))}function An(i){i.l&&i.l.disconnect()}Sn.prototype.G=function(i){var a=this.g.readyState;for(a!=="interactive"&&a!=="complete"||An(this),a=0;a<i.length;a++)for(var c=i[a].addedNodes,p=0;p<c.length;p++)bt(this.h,c[p])};function W(i){this.s=new Map,this.u=new Map,this.C=new Map,this.A=!1,this.B=new Map,this.o=function(a){return a()},this.i=!1,this.v=[],this.h=i,this.D=i.I?new Sn(i):void 0}W.prototype.H=function(i,a){var c=this;if(!(a instanceof Function))throw new TypeError("Custom element constructor getters must be functions.");Dn(this,i),this.s.set(i,a),this.v.push(i),this.i||(this.i=!0,this.o(function(){return Mn(c)}))},W.prototype.define=function(i,a){var c=this;if(!(a instanceof Function))throw new TypeError("Custom element constructors must be functions.");Dn(this,i),Ln(this,i,a),this.v.push(i),this.i||(this.i=!0,this.o(function(){return Mn(c)}))};function Dn(i,a){if(!xn(a))throw new SyntaxError("The element name '"+a+"' is not valid.");if(ye(i,a))throw Error("A custom element with name '"+(a+"' has already been defined."));if(i.A)throw Error("A custom element is already being defined.")}function Ln(i,a,c){i.A=!0;var p;try{var u=c.prototype;if(!(u instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var h=function(H){var Wt=u[H];if(Wt!==void 0&&!(Wt instanceof Function))throw Error("The '"+H+"' callback must be a function.");return Wt},w=h("connectedCallback"),y=h("disconnectedCallback"),E=h("adoptedCallback"),S=(p=h("attributeChangedCallback"))&&c.observedAttributes||[]}catch(H){throw H}finally{i.A=!1}return c={localName:a,constructorFunction:c,connectedCallback:w,disconnectedCallback:y,adoptedCallback:E,attributeChangedCallback:p,observedAttributes:S,constructionStack:[]},i.u.set(a,c),i.C.set(c.constructorFunction,c),c}W.prototype.upgrade=function(i){bt(this.h,i)};function Mn(i){if(i.i!==!1){i.i=!1;for(var a=[],c=i.v,p=new Map,u=0;u<c.length;u++)p.set(c[u],[]);for(bt(i.h,document,{upgrade:function(E){if(E.__CE_state===void 0){var S=E.localName,H=p.get(S);H?H.push(E):i.u.has(S)&&a.push(E)}}}),u=0;u<a.length;u++)we(i.h,a[u]);for(u=0;u<c.length;u++){for(var h=c[u],w=p.get(h),y=0;y<w.length;y++)we(i.h,w[y]);(h=i.B.get(h))&&h.resolve(void 0)}c.length=0}}W.prototype.get=function(i){if(i=ye(this,i))return i.constructorFunction},W.prototype.whenDefined=function(i){if(!xn(i))return Promise.reject(new SyntaxError("'"+i+"' is not a valid custom element name."));var a=this.B.get(i);if(a)return a.F;a=new Nn,this.B.set(i,a);var c=this.u.has(i)||this.s.has(i);return i=this.v.indexOf(i)===-1,c&&i&&a.resolve(void 0),a.F},W.prototype.polyfillWrapFlushCallback=function(i){this.D&&An(this.D);var a=this.o;this.o=function(c){return i(function(){return a(c)})}};function ye(i,a){var c=i.u.get(a);if(c)return c;if(c=i.s.get(a)){i.s.delete(a);try{return Ln(i,a,c())}catch(p){Vt(p)}}}W.prototype.define=W.prototype.define,W.prototype.upgrade=W.prototype.upgrade,W.prototype.get=W.prototype.get,W.prototype.whenDefined=W.prototype.whenDefined,W.prototype.polyfillDefineLazy=W.prototype.H,W.prototype.polyfillWrapFlushCallback=W.prototype.polyfillWrapFlushCallback;function Be(i,a,c){function p(u){return function(h){for(var w=[],y=0;y<arguments.length;++y)w[y]=arguments[y];y=[];for(var E=[],S=0;S<w.length;S++){var H=w[S];if(H instanceof Element&&V(H)&&E.push(H),H instanceof DocumentFragment)for(H=H.firstChild;H;H=H.nextSibling)y.push(H);else y.push(H)}for(u.apply(this,w),w=0;w<E.length;w++)G(i,E[w]);if(V(this))for(w=0;w<y.length;w++)E=y[w],E instanceof Element&&dt(i,E)}}c.prepend!==void 0&&(a.prepend=p(c.prepend)),c.append!==void 0&&(a.append=p(c.append))}function Vr(i){Document.prototype.createElement=function(a){return Tn(i,this,a,null)},Document.prototype.importNode=function(a,c){return a=n.call(this,a,!!c),this.__CE_registry?bt(i,a):qe(i,a),a},Document.prototype.createElementNS=function(a,c){return Tn(i,this,c,a)},Be(i,Document.prototype,{prepend:r,append:o})}function Wr(i){function a(p){return function(u){for(var h=[],w=0;w<arguments.length;++w)h[w]=arguments[w];w=[];for(var y=[],E=0;E<h.length;E++){var S=h[E];if(S instanceof Element&&V(S)&&y.push(S),S instanceof DocumentFragment)for(S=S.firstChild;S;S=S.nextSibling)w.push(S);else w.push(S)}for(p.apply(this,h),h=0;h<y.length;h++)G(i,y[h]);if(V(this))for(h=0;h<w.length;h++)y=w[h],y instanceof Element&&dt(i,y)}}var c=Element.prototype;j!==void 0&&(c.before=a(j)),U!==void 0&&(c.after=a(U)),z!==void 0&&(c.replaceWith=function(p){for(var u=[],h=0;h<arguments.length;++h)u[h]=arguments[h];h=[];for(var w=[],y=0;y<u.length;y++){var E=u[y];if(E instanceof Element&&V(E)&&w.push(E),E instanceof DocumentFragment)for(E=E.firstChild;E;E=E.nextSibling)h.push(E);else h.push(E)}for(y=V(this),z.apply(this,u),u=0;u<w.length;u++)G(i,w[u]);if(y)for(G(i,this),u=0;u<h.length;u++)w=h[u],w instanceof Element&&dt(i,w)}),lt!==void 0&&(c.remove=function(){var p=V(this);lt.call(this),p&&G(i,this)})}function Yr(i){function a(u,h){Object.defineProperty(u,"innerHTML",{enumerable:h.enumerable,configurable:!0,get:h.get,set:function(w){var y=this,E=void 0;if(V(this)&&(E=[],oe(i,this,function(Wt){Wt!==y&&E.push(Wt)})),h.set.call(this,w),E)for(var S=0;S<E.length;S++){var H=E[S];H.__CE_state===1&&i.disconnectedCallback(H)}return this.ownerDocument.__CE_registry?bt(i,this):qe(i,this),w}})}function c(u,h){u.insertAdjacentElement=function(w,y){var E=V(y);return w=h.call(this,w,y),E&&G(i,y),V(w)&&dt(i,y),w}}function p(u,h){function w(y,E){for(var S=[];y!==E;y=y.nextSibling)S.push(y);for(E=0;E<S.length;E++)bt(i,S[E])}u.insertAdjacentHTML=function(y,E){if(y=y.toLowerCase(),y==="beforebegin"){var S=this.previousSibling;h.call(this,y,E),w(S||this.parentNode.firstChild,this)}else if(y==="afterbegin")S=this.firstChild,h.call(this,y,E),w(this.firstChild,S);else if(y==="beforeend")S=this.lastChild,h.call(this,y,E),w(S||this.firstChild,null);else if(y==="afterend")S=this.nextSibling,h.call(this,y,E),w(this.nextSibling,S);else throw new SyntaxError("The value provided ("+String(y)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.")}}g&&(Element.prototype.attachShadow=function(u){if(u=g.call(this,u),i.j&&!u.__CE_patched){u.__CE_patched=!0;for(var h=0;h<i.m.length;h++)i.m[h](u)}return this.__CE_shadowRoot=u}),k&&k.get?a(Element.prototype,k):yt&&yt.get?a(HTMLElement.prototype,yt):Br(i,function(u){a(u,{enumerable:!0,configurable:!0,get:function(){return v.call(this,!0).innerHTML},set:function(h){var w=this.localName==="template",y=w?this.content:this,E=e.call(document,this.namespaceURI,this.localName);for(E.innerHTML=h;0<y.childNodes.length;)_.call(y,y.childNodes[0]);for(h=w?E.content:E;0<h.childNodes.length;)d.call(y,h.childNodes[0])}})}),Element.prototype.setAttribute=function(u,h){if(this.__CE_state!==1)return A.call(this,u,h);var w=$.call(this,u);A.call(this,u,h),h=$.call(this,u),i.attributeChangedCallback(this,u,w,h,null)},Element.prototype.setAttributeNS=function(u,h,w){if(this.__CE_state!==1)return L.call(this,u,h,w);var y=x.call(this,u,h);L.call(this,u,h,w),w=x.call(this,u,h),i.attributeChangedCallback(this,h,y,w,u)},Element.prototype.removeAttribute=function(u){if(this.__CE_state!==1)return C.call(this,u);var h=$.call(this,u);C.call(this,u),h!==null&&i.attributeChangedCallback(this,u,h,null,null)},N&&(Element.prototype.toggleAttribute=function(u,h){if(this.__CE_state!==1)return N.call(this,u,h);var w=$.call(this,u),y=w!==null;return h=N.call(this,u,h),y!==h&&i.attributeChangedCallback(this,u,w,h?"":null,null),h}),Element.prototype.removeAttributeNS=function(u,h){if(this.__CE_state!==1)return ft.call(this,u,h);var w=x.call(this,u,h);ft.call(this,u,h);var y=x.call(this,u,h);w!==y&&i.attributeChangedCallback(this,h,w,y,u)},Tt?c(HTMLElement.prototype,Tt):D&&c(Element.prototype,D),re?p(HTMLElement.prototype,re):M&&p(Element.prototype,M),Be(i,Element.prototype,{prepend:B,append:P}),Wr(i)}var jn={};function Ur(i){function a(){var c=this.constructor,p=document.__CE_registry.C.get(c);if(!p)throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var u=p.constructionStack;if(u.length===0)return u=t.call(document,p.localName),Object.setPrototypeOf(u,c.prototype),u.__CE_state=1,u.__CE_definition=p,Bt(i,u),u;var h=u.length-1,w=u[h];if(w===jn)throw Error("Failed to construct '"+p.localName+"': This element was already constructed.");return u[h]=jn,Object.setPrototypeOf(w,c.prototype),Bt(i,w),w}a.prototype=xt.prototype,Object.defineProperty(HTMLElement.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:a}),window.HTMLElement=a}function zr(i){function a(c,p){Object.defineProperty(c,"textContent",{enumerable:p.enumerable,configurable:!0,get:p.get,set:function(u){if(this.nodeType===Node.TEXT_NODE)p.set.call(this,u);else{var h=void 0;if(this.firstChild){var w=this.childNodes,y=w.length;if(0<y&&V(this)){h=Array(y);for(var E=0;E<y;E++)h[E]=w[E]}}if(p.set.call(this,u),h)for(u=0;u<h.length;u++)G(i,h[u])}}})}Node.prototype.insertBefore=function(c,p){if(c instanceof DocumentFragment){var u=He(c);if(c=f.call(this,c,p),V(this))for(p=0;p<u.length;p++)dt(i,u[p]);return c}return u=c instanceof Element&&V(c),p=f.call(this,c,p),u&&G(i,c),V(this)&&dt(i,c),p},Node.prototype.appendChild=function(c){if(c instanceof DocumentFragment){var p=He(c);if(c=d.call(this,c),V(this))for(var u=0;u<p.length;u++)dt(i,p[u]);return c}return p=c instanceof Element&&V(c),u=d.call(this,c),p&&G(i,c),V(this)&&dt(i,c),u},Node.prototype.cloneNode=function(c){return c=v.call(this,!!c),this.ownerDocument.__CE_registry?bt(i,c):qe(i,c),c},Node.prototype.removeChild=function(c){var p=c instanceof Element&&V(c),u=_.call(this,c);return p&&G(i,c),u},Node.prototype.replaceChild=function(c,p){if(c instanceof DocumentFragment){var u=He(c);if(c=m.call(this,c,p),V(this))for(G(i,p),p=0;p<u.length;p++)dt(i,u[p]);return c}u=c instanceof Element&&V(c);var h=m.call(this,c,p),w=V(this);return w&&G(i,p),u&&G(i,c),w&&dt(i,c),h},b&&b.get?a(Node.prototype,b):qr(i,function(c){a(c,{enumerable:!0,configurable:!0,get:function(){for(var p=[],u=this.firstChild;u;u=u.nextSibling)u.nodeType!==Node.COMMENT_NODE&&p.push(u.textContent);return p.join("")},set:function(p){for(;this.firstChild;)_.call(this,this.firstChild);p!=null&&p!==""&&d.call(this,document.createTextNode(p))}})})}var ht=window.customElements;function On(){var i=new ge;Ur(i),Vr(i),Be(i,DocumentFragment.prototype,{prepend:s,append:l}),zr(i),Yr(i),window.CustomElementRegistry=W,i=new W(i),document.__CE_registry=i,Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:i})}ht&&!ht.forcePolyfill&&typeof ht.define=="function"&&typeof ht.get=="function"||On(),window.__CE_installPolyfill=On}).call(self);const ln=1,an=2,Qn=4,Jr=8,Gr=16,Zr=2,Qr=1,to=2,tr="[",un="[!",cn="]",ae={},Z=Symbol();function fn(t){console.warn("hydration_mismatch")}var dn=Array.isArray,hn=Array.from,ke=Object.keys,Ce=Object.defineProperty,Ft=Object.getOwnPropertyDescriptor,eo=Object.prototype,no=Array.prototype,ro=Object.getPrototypeOf;function er(t){for(var e=0;e<t.length;e++)t[e]()}const At=2,nr=4,Gt=8,rr=16,gt=32,vn=64,qt=128,$e=256,ct=512,Dt=1024,Zt=2048,Pt=4096,Qt=8192,oo=16384,pn=32768,io=1<<18,zt=Symbol("$state"),so=Symbol("");function or(t){return t===this.v}function lo(t,e){return t!=t?e==e:t!==e||t!==null&&typeof t=="object"||typeof t=="function"}function ao(t){return!lo(t,this.v)}function uo(t){throw new Error("effect_in_teardown")}function co(){throw new Error("effect_in_unowned_derived")}function fo(t){throw new Error("effect_orphan")}function ho(){throw new Error("effect_update_depth_exceeded")}function vo(){throw new Error("hydration_failed")}function po(t){throw new Error("props_invalid_value")}function _o(){throw new Error("state_descriptors_fixed")}function mo(){throw new Error("state_prototype_fixed")}function go(){throw new Error("state_unsafe_local_read")}function wo(){throw new Error("state_unsafe_mutation")}function tt(t){return{f:0,v:t,reactions:null,equals:or,version:0}}function Ot(t){return yo(tt(t))}function _n(t){var n;const e=tt(t);return e.equals=ao,Y!==null&&Y.l!==null&&((n=Y.l).s??(n.s=[])).push(e),e}function yo(t){return q!==null&&q.f&At&&(_t===null?No([t]):_t.push(t)),t}function I(t,e){return q!==null&&Qe()&&q.f&At&&(_t===null||!_t.includes(t))&&wo(),t.equals(e)||(t.v=e,t.version=wr(),ir(t,Dt),Qe()&&F!==null&&F.f&ct&&!(F.f&gt)&&(K!==null&&K.includes(t)?(st(F,Dt),Me(F)):St===null?So([t]):St.push(t))),e}function ir(t,e){var n=t.reactions;if(n!==null)for(var r=Qe(),o=n.length,s=0;s<o;s++){var l=n[s],v=l.f;v&Dt||!r&&l===F||(st(l,e),v&(ct|qt)&&(v&At?ir(l,Zt):Me(l)))}}function bo(t){F===null&&q===null&&fo(),q!==null&&q.f&qt&&co(),wn&&uo()}function Hn(t,e){var n=e.last;n===null?e.last=e.first=t:(n.next=t,t.prev=n,e.last=t)}function te(t,e,n,r=!0){var o=(t&vn)!==0,s=F,l={ctx:Y,deps:null,nodes_start:null,nodes_end:null,f:t|Dt,first:null,fn:e,last:null,next:null,parent:o?null:s,prev:null,teardown:null,transitions:null,version:0};if(n){var v=Xt;try{Pn(!0),Le(l),l.f|=oo}catch(f){throw ee(l),f}finally{Pn(v)}}else e!==null&&Me(l);var d=n&&l.deps===null&&l.first===null&&l.nodes_start===null&&l.teardown===null;return!d&&!o&&r&&(s!==null&&Hn(l,s),q!==null&&q.f&At&&Hn(l,q)),l}function sr(t){const e=te(Gt,null,!1);return st(e,ct),e.teardown=t,e}function Ke(t){bo();var e=F!==null&&(F.f&Gt)!==0&&Y!==null&&!Y.m;if(e){var n=Y;(n.e??(n.e=[])).push(t)}else{var r=mn(t);return r}}function lr(t){const e=te(vn,t,!0);return()=>{ee(e)}}function mn(t){return te(nr,t,!1)}function he(t){return te(Gt,t,!0)}function pt(t){return he(t)}function ar(t,e=0){return te(Gt|rr|e,t,!0)}function ce(t,e=!0){return te(Gt|gt,t,!0,e)}function ur(t){var e=t.teardown;if(e!==null){const n=wn,r=q;In(!0),qn(null);try{e.call(null)}finally{In(n),qn(r)}}}function ee(t,e=!0){var n=!1;if((e||t.f&io)&&t.nodes_start!==null){for(var r=t.nodes_start,o=t.nodes_end;r!==null;){var s=r===o?null:$t(r);r.remove(),r=s}n=!0}yn(t,e&&!n),de(t,0),st(t,Qt);var l=t.transitions;if(l!==null)for(const d of l)d.stop();ur(t);var v=t.parent;v!==null&&t.f&gt&&v.first!==null&&cr(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.parent=t.fn=t.nodes_start=t.nodes_end=null}function cr(t){var e=t.parent,n=t.prev,r=t.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),e!==null&&(e.first===t&&(e.first=r),e.last===t&&(e.last=n))}function Je(t,e){var n=[];gn(t,n,!0),fr(n,()=>{ee(t),e&&e()})}function fr(t,e){var n=t.length;if(n>0){var r=()=>--n||e();for(var o of t)o.out(r)}else e()}function gn(t,e,n){if(!(t.f&Pt)){if(t.f^=Pt,t.transitions!==null)for(const l of t.transitions)(l.is_global||n)&&e.push(l);for(var r=t.first;r!==null;){var o=r.next,s=(r.f&pn)!==0||(r.f&gt)!==0;gn(r,e,s?n:!1),r=o}}}function xe(t){dr(t,!0)}function dr(t,e){if(t.f&Pt){t.f^=Pt,ve(t)&&Le(t);for(var n=t.first;n!==null;){var r=n.next,o=(n.f&pn)!==0||(n.f&gt)!==0;dr(n,o?e:!1),n=r}if(t.transitions!==null)for(const s of t.transitions)(s.is_global||e)&&s.in()}}const Eo=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let Te=!1,Ne=!1,Ge=[],Ze=[];function hr(){Te=!1;const t=Ge.slice();Ge=[],er(t)}function vr(){Ne=!1;const t=Ze.slice();Ze=[],er(t)}function It(t){Te||(Te=!0,queueMicrotask(hr)),Ge.push(t)}function ko(t){Ne||(Ne=!0,Eo(vr)),Ze.push(t)}function Co(){Te&&hr(),Ne&&vr()}function $o(t){let e=At|Dt;F===null&&(e|=qt);const n={deps:null,deriveds:null,equals:or,f:e,first:null,fn:t,last:null,reactions:null,v:null,version:0};if(q!==null&&q.f&At){var r=q;r.deriveds===null?r.deriveds=[n]:r.deriveds.push(n)}return n}function pr(t){yn(t);var e=t.deriveds;if(e!==null){t.deriveds=null;for(var n=0;n<e.length;n+=1)xo(e[n])}}function _r(t){var e;pr(t),e=yr(t);var n=(Ut||t.f&qt)&&t.deps!==null?Zt:ct;st(t,n),t.equals(e)||(t.v=e,t.version=wr())}function xo(t){pr(t),de(t,0),st(t,Qt),t.first=t.last=t.deps=t.reactions=t.fn=null}const mr=0,To=1;let be=mr,fe=!1,Xt=!1,wn=!1;function Pn(t){Xt=t}function In(t){wn=t}let Rt=[],Kt=0,q=null;function qn(t){q=t}let F=null,_t=null;function No(t){_t=t}let K=null,Q=0,St=null;function So(t){St=t}let gr=0,Ut=!1,Y=null;function wr(){return gr++}function Qe(){return Y!==null&&Y.l===null}function ve(t){var l,v;var e=t.f;if(e&Dt)return!0;if(e&Zt){var n=t.deps,r=(e&qt)!==0;if(n!==null){var o;if(e&$e){for(o=0;o<n.length;o++)((l=n[o]).reactions??(l.reactions=[])).push(t);t.f^=$e}for(o=0;o<n.length;o++){var s=n[o];if(ve(s)&&_r(s),s.version>t.version)return!0;r&&!Ut&&!((v=s==null?void 0:s.reactions)!=null&&v.includes(t))&&(s.reactions??(s.reactions=[])).push(t)}}r||st(t,ct)}return!1}function Ao(t,e,n){throw t}function yr(t){var _;var e=K,n=Q,r=St,o=q,s=Ut,l=_t;K=null,Q=0,St=null,q=t.f&(gt|vn)?null:t,Ut=!Xt&&(t.f&qt)!==0,_t=null;try{var v=(0,t.fn)(),d=t.deps;if(K!==null){var f;if(de(t,Q),d!==null&&Q>0)for(d.length=Q+K.length,f=0;f<K.length;f++)d[Q+f]=K[f];else t.deps=d=K;if(!Ut)for(f=Q;f<d.length;f++)((_=d[f]).reactions??(_.reactions=[])).push(t)}else d!==null&&Q<d.length&&(de(t,Q),d.length=Q);return v}finally{K=e,Q=n,St=r,q=o,Ut=s,_t=l}}function Do(t,e){let n=e.reactions;if(n!==null){var r=n.indexOf(t);if(r!==-1){var o=n.length-1;o===0?n=e.reactions=null:(n[r]=n[o],n.pop())}}n===null&&e.f&At&&(st(e,Zt),e.f&(qt|$e)||(e.f^=$e),de(e,0))}function de(t,e){var n=t.deps;if(n!==null)for(var r=e;r<n.length;r++)Do(t,n[r])}function yn(t,e=!1){var n=t.first;for(t.first=t.last=null;n!==null;){var r=n.next;ee(n,e),n=r}}function Le(t){var e=t.f;if(!(e&Qt)){st(t,ct);var n=t.ctx,r=F,o=Y;F=t,Y=n;try{e&rr||yn(t),ur(t);var s=yr(t);t.teardown=typeof s=="function"?s:null,t.version=gr}catch(l){Ao(l)}finally{F=r,Y=o}}}function br(){Kt>1e3&&(Kt=0,ho()),Kt++}function Er(t){var e=t.length;if(e!==0){br();var n=Xt;Xt=!0;try{for(var r=0;r<e;r++){var o=t[r];if(o.first===null&&!(o.f&gt))Bn([o]);else{var s=[];kr(o,s),Bn(s)}}}finally{Xt=n}}}function Bn(t){var e=t.length;if(e!==0)for(var n=0;n<e;n++){var r=t[n];!(r.f&(Qt|Pt))&&ve(r)&&(Le(r),r.deps===null&&r.first===null&&r.nodes_start===null&&(r.teardown===null?cr(r):r.fn=null))}}function Lo(){if(fe=!1,Kt>1001)return;const t=Rt;Rt=[],Er(t),fe||(Kt=0)}function Me(t){be===mr&&(fe||(fe=!0,queueMicrotask(Lo)));for(var e=t;e.parent!==null;){e=e.parent;var n=e.f;if(n&gt){if(!(n&ct))return;st(e,Zt)}}Rt.push(e)}function kr(t,e){var n=t.first,r=[];t:for(;n!==null;){var o=n.f,s=(o&(Qt|Pt))===0,l=(o&gt)!==0,v=(o&ct)!==0,d=n.first;if(s&&(!l||!v)){if(l&&st(n,ct),o&Gt){if(!l&&ve(n)&&(Le(n),d=n.first),d!==null){n=d;continue}}else if(o&nr)if(l||v){if(d!==null){n=d;continue}}else r.push(n)}var f=n.next;if(f===null){let b=n.parent;for(;b!==null;){if(t===b)break t;var _=b.next;if(_!==null){n=_;continue t}b=b.parent}}n=f}for(var m=0;m<r.length;m++)d=r[m],e.push(d),kr(d,e)}function ne(t){var e=be,n=Rt;try{br();const o=[];be=To,Rt=o,fe=!1,Er(n);var r=t==null?void 0:t();return Co(),(Rt.length>0||o.length>0)&&ne(),Kt=0,r}finally{be=e,Rt=n}}function T(t){var e=t.f;if(e&Qt)return t.v;if(q!==null){_t!==null&&_t.includes(t)&&go();var n=q.deps;K===null&&n!==null&&n[Q]===t?Q++:K===null?K=[t]:K.push(t),St!==null&&F!==null&&F.f&ct&&!(F.f&gt)&&St.includes(t)&&(st(F,Dt),Me(F))}if(e&At){var r=t;ve(r)&&_r(r)}return t.v}function Mo(t){const e=q;try{return q=null,t()}finally{q=e}}const jo=~(Dt|Zt|ct);function st(t,e){t.f=t.f&jo|e}function pe(t,e=!1,n){Y={p:Y,c:null,e:null,m:!1,s:t,x:null,l:null},e||(Y.l={s:null,u:null,r1:[],r2:tt(!1)})}function _e(t){const e=Y;if(e!==null){t!==void 0&&(e.x=t);const r=e.e;if(r!==null){e.e=null;for(var n=0;n<r.length;n++)mn(r[n])}Y=e.p,e.m=!0}return t||{}}function rt(t,e=null,n){if(typeof t!="object"||t===null||zt in t)return t;const r=ro(t);if(r!==eo&&r!==no)return t;var o=new Map,s=dn(t),l=tt(0);s&&o.set("length",tt(t.length));var v;return new Proxy(t,{defineProperty(d,f,_){(!("value"in _)||_.configurable===!1||_.enumerable===!1||_.writable===!1)&&_o();var m=o.get(f);return m===void 0?(m=tt(_.value),o.set(f,m)):I(m,rt(_.value,v)),!0},deleteProperty(d,f){var _=o.get(f);return _===void 0?f in d&&o.set(f,tt(Z)):(I(_,Z),Vn(l)),!0},get(d,f,_){var k;if(f===zt)return t;var m=o.get(f),b=f in d;if(m===void 0&&(!b||(k=Ft(d,f))!=null&&k.writable)&&(m=tt(rt(b?d[f]:Z,v)),o.set(f,m)),m!==void 0){var g=T(m);return g===Z?void 0:g}return Reflect.get(d,f,_)},getOwnPropertyDescriptor(d,f){var _=Reflect.getOwnPropertyDescriptor(d,f);if(_&&"value"in _){var m=o.get(f);m&&(_.value=T(m))}else if(_===void 0){var b=o.get(f),g=b==null?void 0:b.v;if(b!==void 0&&g!==Z)return{enumerable:!0,configurable:!0,value:g,writable:!0}}return _},has(d,f){var g;if(f===zt)return!0;var _=o.get(f),m=_!==void 0&&_.v!==Z||Reflect.has(d,f);if(_!==void 0||F!==null&&(!m||(g=Ft(d,f))!=null&&g.writable)){_===void 0&&(_=tt(m?rt(d[f],v):Z),o.set(f,_));var b=T(_);if(b===Z)return!1}return m},set(d,f,_,m){var x;var b=o.get(f),g=f in d;if(s&&f==="length")for(var k=_;k<b.v;k+=1){var $=o.get(k+"");$!==void 0?I($,Z):k in d&&($=tt(Z),o.set(k+"",$))}b===void 0?(!g||(x=Ft(d,f))!=null&&x.writable)&&(b=tt(void 0),I(b,rt(_,v)),o.set(f,b)):(g=b.v!==Z,I(b,rt(_,v)));var A=Reflect.getOwnPropertyDescriptor(d,f);if(A!=null&&A.set&&A.set.call(m,_),!g){if(s&&typeof f=="string"){var C=o.get("length"),N=Number(f);Number.isInteger(N)&&N>=C.v&&I(C,N+1)}Vn(l)}return!0},ownKeys(d){T(l);var f=Reflect.ownKeys(d).filter(b=>{var g=o.get(b);return g===void 0||g.v!==Z});for(var[_,m]of o)m.v!==Z&&!(_ in d)&&f.push(_);return f},setPrototypeOf(){mo()}})}function Vn(t,e=1){I(t,t.v+e)}function Se(t){return t!==null&&typeof t=="object"&&zt in t?t[zt]:t}function Oo(t,e){return Object.is(Se(t),Se(e))}var Ae,jt,Cr,$r;function tn(){if(Ae===void 0){Ae=window,jt=document;var t=Element.prototype,e=Node.prototype;Cr=Ft(e,"firstChild").get,$r=Ft(e,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__e=void 0,Text.prototype.__t=void 0}}function me(t=""){return document.createTextNode(t)}function Lt(t){return Cr.call(t)}function $t(t){return $r.call(t)}function ot(t){if(!O)return Lt(t);var e=Lt(R);return e===null&&(e=R.appendChild(me())),mt(e),e}function bn(t,e){if(!O){var n=Lt(t);return n instanceof Comment&&n.data===""?$t(n):n}return R}function et(t,e=1,n=!1){let r=O?R:t;for(;e--;)r=$t(r);if(!O)return r;var o=r.nodeType;if(n&&o!==3){var s=me();return r==null||r.before(s),mt(s),s}return mt(r),r}function En(t){t.textContent=""}let O=!1;function Ct(t){O=t}let R;function mt(t){if(t===null)throw fn(),ae;return R=t}function je(){return mt($t(R))}function J(t){if(O){if($t(R)!==null)throw fn(),ae;R=t}}function Ro(t=1){if(O){for(var e=t,n=R;e--;)n=$t(n);R=n}}function en(){for(var t=0,e=R;;){if(e.nodeType===8){var n=e.data;if(n===cn){if(t===0)return e;t-=1}else(n===tr||n===un)&&(t+=1)}var r=$t(e);e.remove(),e=r}}const xr=new Set,nn=new Set;function Fo(t,e,n,r){function o(s){if(r.capture||se.call(e,s),!s.cancelBubble)return n.call(this,s)}return t.startsWith("pointer")||t.startsWith("touch")||t==="wheel"?It(()=>{e.addEventListener(t,o,r)}):e.addEventListener(t,o,r),o}function vt(t,e,n,r,o){var s={capture:r,passive:o},l=Fo(t,e,n,s);(e===document.body||e===window||e===document)&&sr(()=>{e.removeEventListener(t,l,s)})}function Tr(t){for(var e=0;e<t.length;e++)xr.add(t[e]);for(var n of nn)n(t)}function se(t){var A;var e=this,n=e.ownerDocument,r=t.type,o=((A=t.composedPath)==null?void 0:A.call(t))||[],s=o[0]||t.target,l=0,v=t.__root;if(v){var d=o.indexOf(v);if(d!==-1&&(e===document||e===window)){t.__root=e;return}var f=o.indexOf(e);if(f===-1)return;d<=f&&(l=d)}if(s=o[l]||t.target,s!==e){Ce(t,"currentTarget",{configurable:!0,get(){return s||n}});try{for(var _,m=[];s!==null;){var b=s.parentNode||s.host||null;try{var g=s["__"+r];if(g!==void 0&&!s.disabled)if(dn(g)){var[k,...$]=g;k.apply(s,[t,...$])}else g.call(s,t)}catch(C){_?m.push(C):_=C}if(t.cancelBubble||b===e||b===null)break;s=b}if(_){for(let C of m)queueMicrotask(()=>{throw C});throw _}}finally{t.__root=e,s=e}}}function Ho(t){var e=document.createElement("template");return e.innerHTML=t,e.content}function Jt(t,e){var n=F;n.nodes_start===null&&(n.nodes_start=t,n.nodes_end=e)}function wt(t,e){var n=(e&Qr)!==0,r=(e&to)!==0,o,s=!t.startsWith("<!>");return()=>{if(O)return Jt(R,null),R;o===void 0&&(o=Ho(s?t:"<!>"+t),n||(o=Lt(o)));var l=r?document.importNode(o,!0):o.cloneNode(!0);if(n){var v=Lt(l),d=l.lastChild;Jt(v,d)}else Jt(l,l);return l}}function Po(){if(O)return Jt(R,null),R;var t=document.createDocumentFragment(),e=document.createComment(""),n=me();return t.append(e,n),Jt(e,n),t}function it(t,e){if(O){F.nodes_end=R,je();return}t!==null&&t.before(e)}const Io=["wheel","mousewheel","touchstart","touchmove"];function qo(t){return Io.includes(t)}function Ye(t,e){e!==(t.__t??(t.__t=t.nodeValue))&&(t.__t=e,t.nodeValue=e==null?"":e+"")}function Nr(t,e){const n=e.anchor??e.target.appendChild(me());return Sr(t,{...e,anchor:n})}function Bo(t,e){tn(),e.intro=e.intro??!1;const n=e.target,r=O,o=R;try{for(var s=Lt(n);s&&(s.nodeType!==8||s.data!==tr);)s=$t(s);if(!s)throw ae;Ct(!0),mt(s),je();const l=Sr(t,{...e,anchor:s});if(R===null||R.nodeType!==8||R.data!==cn)throw fn(),ae;return Ct(!1),l}catch(l){if(l===ae)return e.recover===!1&&vo(),tn(),En(n),Ct(!1),Nr(t,e);throw l}finally{Ct(r),mt(o)}}const Yt=new Map;function Sr(t,{target:e,anchor:n,props:r={},events:o,context:s,intro:l=!0}){tn();var v=new Set,d=m=>{for(var b=0;b<m.length;b++){var g=m[b];if(!v.has(g)){v.add(g);var k=qo(g);e.addEventListener(g,se,{passive:k});var $=Yt.get(g);$===void 0?(document.addEventListener(g,se,{passive:k}),Yt.set(g,1)):Yt.set(g,$+1)}}};d(hn(xr)),nn.add(d);var f=void 0,_=lr(()=>(ce(()=>{if(s){pe({});var m=Y;m.c=s}o&&(r.$$events=o),O&&Jt(n,null),f=t(n,r)||{},O&&(F.nodes_end=R),s&&_e()}),()=>{for(var m of v){e.removeEventListener(m,se);var b=Yt.get(m);--b===0?(document.removeEventListener(m,se),Yt.delete(m)):Yt.set(m,b)}nn.delete(d),rn.delete(f)}));return rn.set(f,_),f}let rn=new WeakMap;function Vo(t){const e=rn.get(t);e&&e()}function De(t,e,n,r=null,o=!1){O&&je();var s=t,l=null,v=null,d=null,f=o?pn:0;ar(()=>{if(d===(d=!!e()))return;let _=!1;if(O){const m=s.data===un;d===m&&(s=en(),mt(s),Ct(!1),_=!0)}d?(l?xe(l):l=ce(()=>n(s)),v&&Je(v,()=>{v=null})):(v?xe(v):r&&(v=ce(()=>r(s))),l&&Je(l,()=>{l=null})),_&&Ct(!0)},f),O&&(s=R)}let Ue=null;function Wo(t,e){return e}function Yo(t,e,n,r){for(var o=[],s=e.length,l=0;l<s;l++)gn(e[l].e,o,!0);var v=s>0&&o.length===0&&n!==null;if(v){var d=n.parentNode;En(d),d.append(n),r.clear(),Nt(t,e[0].prev,e[s-1].next)}fr(o,()=>{for(var f=0;f<s;f++){var _=e[f];v||(r.delete(_.k),Nt(t,_.prev,_.next)),ee(_.e,!v)}})}function kn(t,e,n,r,o,s=null){var l=t,v={flags:e,items:new Map,first:null},d=(e&Qn)!==0;if(d){var f=t;l=O?mt(Lt(f)):f.appendChild(me())}O&&je();var _=null;ar(()=>{var m=n(),b=dn(m)?m:m==null?[]:hn(m),g=b.length;let k=!1;if(O){var $=l.data===un;$!==(g===0)&&(l=en(),mt(l),Ct(!1),k=!0)}if(O){for(var A=null,C,N=0;N<g;N++){if(R.nodeType===8&&R.data===cn){l=R,k=!0,Ct(!1);break}var x=b[N],L=r(x,N);C=Ar(R,v,A,null,x,L,N,o,e),v.items.set(L,C),A=C}g>0&&mt(en())}O||Uo(b,v,l,o,e,r),s!==null&&(g===0?_?xe(_):_=ce(()=>s(l)):_!==null&&Je(_,()=>{_=null})),k&&Ct(!0)}),O&&(l=R)}function Uo(t,e,n,r,o,s){var lt,xt,yt,Tt;var l=(o&Jr)!==0,v=(o&(ln|an))!==0,d=t.length,f=e.items,_=e.first,m=_,b,g=null,k,$=[],A=[],C,N,x,L;if(l)for(L=0;L<d;L+=1)C=t[L],N=s(C,L),x=f.get(N),x!==void 0&&((lt=x.a)==null||lt.measure(),(k??(k=new Set)).add(x));for(L=0;L<d;L+=1){if(C=t[L],N=s(C,L),x=f.get(N),x===void 0){var ft=m?m.e.nodes_start:n;g=Ar(ft,e,g,g===null?e.first:g.next,C,N,L,r,o),f.set(N,g),$=[],A=[],m=g.next;continue}if(v&&zo(x,C,L,o),x.e.f&Pt&&(xe(x.e),l&&((xt=x.a)==null||xt.unfix(),(k??(k=new Set)).delete(x))),x!==m){if(b!==void 0&&b.has(x)){if($.length<A.length){var D=A[0],M;g=D.prev;var B=$[0],P=$[$.length-1];for(M=0;M<$.length;M+=1)Wn($[M],D,n);for(M=0;M<A.length;M+=1)b.delete(A[M]);Nt(e,B.prev,P.next),Nt(e,g,B),Nt(e,P,D),m=D,g=P,L-=1,$=[],A=[]}else b.delete(x),Wn(x,m,n),Nt(e,x.prev,x.next),Nt(e,x,g===null?e.first:g.next),Nt(e,g,x),g=x;continue}for($=[],A=[];m!==null&&m.k!==N;)(b??(b=new Set)).add(m),A.push(m),m=m.next;if(m===null)continue;x=m}$.push(x),g=x,m=x.next}if(m!==null||b!==void 0){for(var j=b===void 0?[]:hn(b);m!==null;)j.push(m),m=m.next;var U=j.length;if(U>0){var z=o&Qn&&d===0?n:null;if(l){for(L=0;L<U;L+=1)(yt=j[L].a)==null||yt.measure();for(L=0;L<U;L+=1)(Tt=j[L].a)==null||Tt.fix()}Yo(e,j,z,f)}}l&&It(()=>{var re;if(k!==void 0)for(x of k)(re=x.a)==null||re.apply()}),F.first=e.first&&e.first.e,F.last=g&&g.e}function zo(t,e,n,r){r&ln&&I(t.v,e),r&an?I(t.i,n):t.i=n}function Ar(t,e,n,r,o,s,l,v,d){var f=Ue;try{var _=(d&ln)!==0,m=(d&Gr)===0,b=_?m?_n(o):tt(o):o,g=d&an?tt(l):l,k={i:g,v:b,k:s,a:null,e:null,prev:n,next:r};return Ue=k,k.e=ce(()=>v(t,b,g),O),k.e.prev=n&&n.e,k.e.next=r&&r.e,n===null?e.first=k:(n.next=k,n.e.next=k.e),r!==null&&(r.prev=k,r.e.prev=k.e),k}finally{Ue=f}}function Wn(t,e,n){for(var r=t.next?t.next.e.nodes_start:n,o=e?e.e.nodes_start:n,s=t.e.nodes_start;s!==r;){var l=$t(s);o.before(s),s=l}}function Nt(t,e,n){e===null?t.first=n:(e.next=n,e.e.next=n&&n.e),n!==null&&(n.prev=e,n.e.prev=e&&e.e)}var Yn=new Set;function Cn(t,e,n=!1){if(!n){if(Yn.has(e))return;Yn.add(e)}It(()=>{var r=t.getRootNode(),o=r.host?r:r.head??r.ownerDocument.head;if(!o.querySelector("#"+e.hash)){const s=document.createElement("style");s.id=e.hash,s.textContent=e.code,o.appendChild(s)}})}function Xo(t,e){{const n=document.body;t.autofocus=!0,It(()=>{document.activeElement===n&&t.focus()})}}function Ko(t){O&&Lt(t)!==null&&En(t)}let Un=!1;function Dr(){Un||(Un=!0,document.addEventListener("reset",t=>{Promise.resolve().then(()=>{var e;if(!t.defaultPrevented)for(const n of t.target.elements)(e=n.__on_r)==null||e.call(n)})},{capture:!0}))}function Jo(t){if(O){var e=!1,n=()=>{if(!e){if(e=!0,t.hasAttribute("value")){var r=t.value;ut(t,"value",null),t.value=r}if(t.hasAttribute("checked")){var o=t.checked;ut(t,"checked",null),t.checked=o}}};t.__on_r=n,ko(n),Dr()}}function Go(t,e){var n=t.__attributes??(t.__attributes={});n.value!==(n.value=e)&&(t.value=e)}function ut(t,e,n,r){n=n==null?null:n+"";var o=t.__attributes??(t.__attributes={});O&&(o[e]=t.getAttribute(e),e==="src"||e==="srcset"||e==="href"&&t.nodeName==="LINK")||o[e]!==(o[e]=n)&&(e==="loading"&&(t[so]=n),n===null?t.removeAttribute(e):t.setAttribute(e,n))}function ue(t,e,n){if(n){if(t.classList.contains(e))return;t.classList.add(e)}else{if(!t.classList.contains(e))return;t.classList.remove(e)}}function Lr(t,e,n,r=n){t.addEventListener(e,n);const o=t.__on_r;o?t.__on_r=()=>{o(),r()}:t.__on_r=r,Dr()}function Zo(t,e,n){Lr(t,"input",()=>{n(Xn(t)?Kn(t.value):t.value)}),he(()=>{var r=e();if(O&&t.defaultValue!==t.value){n(t.value);return}Xn(t)&&r===Kn(t.value)||t.type==="date"&&!r&&!t.value||(t.value=r??"")})}const ze=new Set;function Qo(t,e,n,r,o){var s=n.getAttribute("type")==="checkbox",l=t;let v=!1;if(e!==null)for(var d of e)l=l[d]??(l[d]=[]);l.push(n),Lr(n,"change",()=>{var f=n.__value;s&&(f=zn(l,f,n.checked)),o(f)},()=>o(s?[]:null)),he(()=>{var f=r();if(O&&n.defaultChecked!==n.checked){v=!0;return}s?(f=f||[],n.checked=Se(f).includes(Se(n.__value))):n.checked=Oo(n.__value,f)}),sr(()=>{var f=l.indexOf(n);f!==-1&&l.splice(f,1)}),ze.has(l)||(ze.add(l),It(()=>{l.sort((f,_)=>f.compareDocumentPosition(_)===4?-1:1),ze.delete(l)})),It(()=>{if(v){var f;if(s)f=zn(l,f,n.checked);else{var _=l.find(m=>m.checked);f=_==null?void 0:_.__value}o(f)}})}function zn(t,e,n){for(var r=new Set,o=0;o<t.length;o+=1)t[o].checked&&r.add(t[o].__value);return n||r.delete(e),Array.from(r)}function Xn(t){var e=t.type;return e==="number"||e==="range"}function Kn(t){return t===""?null:+t}function Jn(t,e){return t===e||(t==null?void 0:t[zt])===e}function on(t={},e,n,r){return mn(()=>{var o,s;return he(()=>{o=s,s=[],Mo(()=>{t!==n(...s)&&(e(t,...s),o&&Jn(n(...o),t)&&e(null,...o))})}),()=>{It(()=>{s&&Jn(n(...s),t)&&e(null,...s)})}}),t}function Oe(t,e,n,r){var k;var o=(n&Zr)!==0,s=t[e],l=(k=Ft(t,e))==null?void 0:k.set,v=r,d=()=>v;s===void 0&&r!==void 0&&(l&&o&&po(),s=d(),l&&l(s));var f;if(f=()=>{var $=t[e];return $===void 0?d():$},l){var _=t.$$legacy;return function($,A){return arguments.length>0?((!A||_)&&l(A?f():$),$):f()}}var m=!1,b=_n(s),g=$o(()=>{var $=f(),A=T(b);return m?(m=!1,A):b.v=$});return function($,A){var C=T(g);if(arguments.length>0){const N=A?T(g):$;return g.equals(N)||(m=!0,I(b,N),T(g)),$}return C}}function ti(t){return new ei(t)}var Et,nt;class ei{constructor(e){Ve(this,Et);Ve(this,nt);var s;var n=new Map,r=(l,v)=>{var d=_n(v);return n.set(l,d),d};const o=new Proxy({...e.props||{},$$events:{}},{get(l,v){return T(n.get(v)??r(v,Reflect.get(l,v)))},has(l,v){return T(n.get(v)??r(v,Reflect.get(l,v))),Reflect.has(l,v)},set(l,v,d){return I(n.get(v)??r(v,d),d),Reflect.set(l,v,d)}});We(this,nt,(e.hydrate?Bo:Nr)(e.component,{target:e.target,props:o,context:e.context,intro:e.intro??!1,recover:e.recover})),(!((s=e==null?void 0:e.props)!=null&&s.$$host)||e.sync===!1)&&ne(),We(this,Et,o.$$events);for(const l of Object.keys(X(this,nt)))l==="$set"||l==="$destroy"||l==="$on"||Ce(this,l,{get(){return X(this,nt)[l]},set(v){X(this,nt)[l]=v},enumerable:!0});X(this,nt).$set=l=>{Object.assign(o,l)},X(this,nt).$destroy=()=>{Vo(X(this,nt))}}$set(e){X(this,nt).$set(e)}$on(e,n){X(this,Et)[e]=X(this,Et)[e]||[];const r=(...o)=>n.call(this,...o);return X(this,Et)[e].push(r),()=>{X(this,Et)[e]=X(this,Et)[e].filter(o=>o!==r)}}$destroy(){X(this,nt).$destroy()}}Et=new WeakMap,nt=new WeakMap;let Mr;typeof HTMLElement=="function"&&(Mr=class extends HTMLElement{constructor(e,n,r){super();at(this,"$$ctor");at(this,"$$s");at(this,"$$c");at(this,"$$cn",!1);at(this,"$$d",{});at(this,"$$r",!1);at(this,"$$p_d",{});at(this,"$$l",{});at(this,"$$l_u",new Map);at(this,"$$me");this.$$ctor=e,this.$$s=n,r&&this.attachShadow({mode:"open"})}addEventListener(e,n,r){if(this.$$l[e]=this.$$l[e]||[],this.$$l[e].push(n),this.$$c){const o=this.$$c.$on(e,n);this.$$l_u.set(n,o)}super.addEventListener(e,n,r)}removeEventListener(e,n,r){if(super.removeEventListener(e,n,r),this.$$c){const o=this.$$l_u.get(n);o&&(o(),this.$$l_u.delete(n))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){let e=function(o){return s=>{const l=document.createElement("slot");o!=="default"&&(l.name=o),it(s,l)}};if(await Promise.resolve(),!this.$$cn||this.$$c)return;const n={},r=ni(this);for(const o of this.$$s)o in r&&(o==="default"&&!this.$$d.children?(this.$$d.children=e(o),n.default=!0):n[o]=e(o));for(const o of this.attributes){const s=this.$$g_p(o.name);s in this.$$d||(this.$$d[s]=Ee(s,o.value,this.$$p_d,"toProp"))}for(const o in this.$$p_d)!(o in this.$$d)&&this[o]!==void 0&&(this.$$d[o]=this[o],delete this[o]);this.$$c=ti({component:this.$$ctor,target:this.shadowRoot||this,props:{...this.$$d,$$slots:n,$$host:this}}),this.$$me=he(()=>{var o;this.$$r=!0;for(const s of ke(this.$$c)){if(!((o=this.$$p_d[s])!=null&&o.reflect))continue;this.$$d[s]=this.$$c[s];const l=Ee(s,this.$$d[s],this.$$p_d,"toAttribute");l==null?this.removeAttribute(this.$$p_d[s].attribute||s):this.setAttribute(this.$$p_d[s].attribute||s,l)}this.$$r=!1});for(const o in this.$$l)for(const s of this.$$l[o]){const l=this.$$c.$on(o,s);this.$$l_u.set(s,l)}this.$$l={}}}attributeChangedCallback(e,n,r){var o;this.$$r||(e=this.$$g_p(e),this.$$d[e]=Ee(e,r,this.$$p_d,"toProp"),(o=this.$$c)==null||o.$set({[e]:this.$$d[e]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then(()=>{!this.$$cn&&this.$$c&&(this.$$c.$destroy(),ee(this.$$me),this.$$c=void 0)})}$$g_p(e){return ke(this.$$p_d).find(n=>this.$$p_d[n].attribute===e||!this.$$p_d[n].attribute&&n.toLowerCase()===e)||e}});function Ee(t,e,n,r){var s;const o=(s=n[t])==null?void 0:s.type;if(e=o==="Boolean"&&typeof e!="boolean"?e!=null:e,!r||!n[t])return e;if(r==="toAttribute")switch(o){case"Object":case"Array":return e==null?null:JSON.stringify(e);case"Boolean":return e?"":null;case"Number":return e??null;default:return e}else switch(o){case"Object":case"Array":return e&&JSON.parse(e);case"Boolean":return e;case"Number":return e!=null?+e:e;default:return e}}function ni(t){const e={};return t.childNodes.forEach(n=>{e[n.slot||"default"]=!0}),e}function Re(t,e,n,r,o,s){let l=class extends Mr{constructor(){super(t,n,o),this.$$p_d=e}static get observedAttributes(){return ke(e).map(v=>(e[v].attribute||v).toLowerCase())}};return ke(e).forEach(v=>{Ce(l.prototype,v,{get(){return this.$$c&&v in this.$$c?this.$$c[v]:this.$$d[v]},set(d){var m;d=Ee(v,d,e),this.$$d[v]=d;var f=this.$$c;if(f){var _=(m=Ft(f,v))==null?void 0:m.get;_?f[v]=d:f.$set({[v]:d})}}})}),r.forEach(v=>{Ce(l.prototype,v,{get(){var d;return(d=this.$$c)==null?void 0:d[v]}})}),t.element=l,l}const Mt=new Map([["yellow","#F8B920"],["red","#FF4646"],["blue","#0064FF"],["green","#00C564"]]),ri=["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","OPTION"];function jr(t){const e=document.documentElement.lang||void 0,n=t.map(v=>v.trim().toLocaleLowerCase(e)),r=n.map(()=>({start:null,end:null,shift:0})),o=n.map(()=>[]),s=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,v=>{var d,f;return ri.includes((d=v.parentNode)==null?void 0:d.tagName)||((f=v.parentNode)==null?void 0:f.contentEditable)=="true"?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let l;for(;l=s.nextNode();)if(l!=null&&l.nodeValue)for(let v=0;v<l.nodeValue.length;v++){const d=l.nodeValue[v].toLocaleLowerCase(e).trim();d&&n.forEach((f,_)=>{var b;for(;f[r[_].shift]&&!f[r[_].shift].trim();)r[_].shift++;let m=f[r[_].shift]===d;if(!m&&r[_].shift&&(r[_].shift=0,m=f[r[_].shift]===d),m&&(r[_].shift||(r[_].start=[l,v]),r[_].end=[l,v],r[_].shift++),r[_].shift>=f.length){const g=document.createRange();g.setStart(r[_].start[0],r[_].start[1]),g.setEnd(r[_].end[0],r[_].end[1]+1),!g.collapsed&&((b=g.commonAncestorContainer.parentElement)!=null&&b.checkVisibility())?o[_].push(g):g.detach(),m=!1}m||(r[_].shift=0,r[_].start=null,r[_].end=null)})}return o}const Ht=`rh-${new Date().getTime()}-`,Fe="highlights"in CSS;function oi(t){if(!t.length&&!CSS.highlights.size)return;const e=[];if(CSS.highlights.clear(),t.length){const r=jr(t.map(({text:o})=>o||""));for(const o in t){if(!r[o].length)continue;const{_id:s,color:l,note:v}=t[o],d=`${Ht}${s}`;CSS.highlights.set(d,new Highlight(...r[o]));const f=r[o][0].getBoundingClientRect();e.push(`
                ::highlight(${d}) {
                    all: unset;
                    background-color: color-mix(in srgb, ${Mt.get(l)||l||"yellow"}, white 60%) !important;
                    color: color-mix(in srgb, ${Mt.get(l)||l||"yellow"}, black 80%) !important;
                    ${v?"text-decoration: underline wavy; -webkit-text-decoration: underline wavy;":""}
                    text-decoration-thickness: from-font;
                }

                /* fuck you dark reader */
                html[data-darkreader-scheme="dark"] ::highlight(${d}) {
                    color: CanvasText !important;
                }

                :root {
                    --highlight-${s}-top: ${(100/document.documentElement.scrollHeight*(window.scrollY+f.top-10)).toFixed(2)}%;
                }
            `);for(const _ of r[o])_.detach()}}const n=(()=>{let r=document.getElementById(Ht);return r||(r=document.createElement("style"),r.id=Ht,document.head.appendChild(r)),r})();n.innerHTML=e.join(`
`)}function ii(){var t;(t=document.getElementById(Ht))==null||t.remove()}function si(t){var e;for(const[n,r]of CSS.highlights){const o=n.replace(Ht,"");if(t==o)for(const s of r){(e=s.startContainer.parentElement)==null||e.scrollIntoView({behavior:"smooth",block:"start"});break}}}function li(t){let e;for(const[n,r]of CSS.highlights)for(const o of r){const s=t.compareBoundaryPoints(Range.START_TO_START,o),l=t.compareBoundaryPoints(Range.END_TO_END,o);(s==0&&l==0||t!=null&&t.collapsed&&s>=0&&l<=0)&&(e=[n.replace(Ht,""),o])}if(e)return e[0].replace(Ht,"")}const kt=`rh-${new Date().getTime()}`;function ai(t){const e=document.body.querySelectorAll(`.${kt}`);if(!t.length&&!e.length)return;e.forEach(s=>s.outerHTML=s.innerText);const n=[],r=jr(t.map(({text:s})=>s||""));for(const s in t){const{_id:l,color:v}=t[s];for(const d of r[s]){const f=document.createElement("mark");f.className=kt,f.setAttribute("data-id",String(l)),f.append(d.extractContents()),d.insertNode(f),d.detach()}n.push(`
            .${kt}[data-id="${l}"] {
                all: unset;
                display: inline-block !important;
                background-color: white !important;
                background-image: linear-gradient(to bottom, ${Gn(Mt.get(v)||v,.4)} 0, ${Gn(Mt.get(v)||v,.4)} 100%) !important;
                color: black !important;
            }
        `)}const o=(()=>{let s=document.getElementById(kt);return s||(s=document.createElement("style"),s.id=kt,document.head.appendChild(s)),s})();o.innerHTML=n.join(`
`)}function ui(){var t;document.body.querySelectorAll(`.${kt}`).forEach(e=>e.outerHTML=e.innerText),(t=document.getElementById(kt))==null||t.remove()}function ci(t){const e=document.body.querySelector(`.${kt}[data-id="${t}"]`);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}function fi(t){const e=t.commonAncestorContainer.nodeType==Node.ELEMENT_NODE?t.commonAncestorContainer:t.commonAncestorContainer.parentElement;if((e==null?void 0:e.className)==kt){if(!t.collapsed){const n=new Range;n.selectNodeContents(t.commonAncestorContainer);const r=t.compareBoundaryPoints(Range.START_TO_START,n),o=t.compareBoundaryPoints(Range.END_TO_END,n);if(n.detach(),r!=0||o!=0)return}return e.getAttribute("data-id")||void 0}}function Gn(t,e){if(!t)return t;const n=parseInt(t.slice(1,3),16),r=parseInt(t.slice(3,5),16),o=parseInt(t.slice(5,7),16);return`rgba(${n}, ${r}, ${o}, ${e})`}function di(t){return Fe?oi(t):ai(t)}function Xe(t){return di(t)}function hi(){return Fe?ii():ui()}function Or(t){return Fe?si(t):ci(t)}function Rr(){var n,r,o;const t=document.getSelection();if(!(t!=null&&t.rangeCount))return;const e=t.getRangeAt(0);if(!((o=((n=e==null?void 0:e.commonAncestorContainer)==null?void 0:n.nodeType)==1?e==null?void 0:e.commonAncestorContainer:(r=e==null?void 0:e.commonAncestorContainer)==null?void 0:r.parentElement)!=null&&o.closest('[contenteditable=""], [contenteditable=true]')))return e}function le(){const t=document.getSelection();t!=null&&t.rangeCount&&t.removeAllRanges()}function vi(t){return Fe?li(t):fi(t)}function Zn(t){if(!t)return"";var e=document.createElement("div");e.appendChild(t.cloneContents().cloneNode(!0)),document.body.appendChild(e);const n=e.innerText;return document.body.removeChild(e),e=void 0,n}function pi(t,e,n){let r=Ot(rt([])),o=Ot(!1),s=Ot(!1),l=Ot(void 0);function v(g){const k=vi(g);if(k)return T(r).find(A=>A._id==k);if(Zn(g).trim())return{text:Zn(g).trim()}}function d(g){const k={...typeof g._id=="string"?{_id:g._id}:{},...typeof g.text=="string"?{text:g.text}:{},...typeof g.note=="string"?{note:g.note}:{},color:g.color||"yellow"};if(!k.text)return;const $=T(r).findIndex(A=>{var C,N;return A._id==k._id||((C=A.text)==null?void 0:C.toLocaleLowerCase().trim())===((N=k.text)==null?void 0:N.toLocaleLowerCase().trim())});$!=-1?(T(r)[$]=k,e(k)):(T(r).push(k),t(k))}function f({_id:g}){I(r,rt(T(r).filter(k=>k._id!=g))),n({_id:g})}function _(g){I(l,rt(JSON.parse(JSON.stringify(g))))}function m(){T(l)&&(d(T(l)),I(l,void 0))}function b(){I(l,void 0)}return{get highlights(){return T(r)},set highlights(g){I(r,rt(g))},get pro(){return T(o)},set pro(g){I(o,rt(g))},get nav(){return T(s)},set nav(g){I(s,rt(g))},get draft(){return T(l)},find:v,upsert:d,remove:f,setDraft:_,draftSubmit:m,draftCancel:b}}const _i="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(_i);function mi(t,e){let n=null,r=!0;return function(...s){n||(r?(t(...s),r=!1):(clearTimeout(n),n=setTimeout(()=>{t(...s),clearTimeout(n),n=null},e)))}}function sn(){var t;return(t=navigator==null?void 0:navigator.userAgentData)!=null&&t.mobile?!0:/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)}var gi=wt('<button type="submit" class="svelte-f9ok5r"><span class="color svelte-f9ok5r"></span></button>'),wi=wt('<button type="submit" value="remove" title="Delete highlight" class="svelte-f9ok5r"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-f9ok5r"><g class="svelte-f9ok5r"><line x1="2.75" y1="4.25" x2="15.25" y2="4.25" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-f9ok5r"></line><path d="M6.75,4.25v-1.5c0-.552,.448-1,1-1h2.5c.552,0,1,.448,1,1v1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-f9ok5r"></path><path d="M13.5,6.75l-.4,7.605c-.056,1.062-.934,1.895-1.997,1.895H6.898c-1.064,0-1.941-.833-1.997-1.895l-.4-7.605" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-f9ok5r"></path></g></svg></button>'),yi=wt('<dialog class="svelte-f9ok5r"><form method="dialog" class="svelte-f9ok5r"><!> <button type="submit" value="note" title="Add note" class="svelte-f9ok5r"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-f9ok5r"><g class="svelte-f9ok5r"><path stroke-linecap="round" stroke-linejoin="round" d="M9,1.75C4.996,1.75,1.75,4.996,1.75,9c0,1.319,.358,2.552,.973,3.617,.43,.806-.053,2.712-.973,3.633,1.25,.068,2.897-.497,3.633-.973,.489,.282,1.264,.656,2.279,.848,.433,.082,.881,.125,1.338,.125,4.004,0,7.25-3.246,7.25-7.25S13.004,1.75,9,1.75Z" class="svelte-f9ok5r"></path><path stroke-width="0" d="M9,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-f9ok5r"></path><path stroke-width="0" d="M5.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-f9ok5r"></path><path stroke-width="0" d="M12.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-f9ok5r"></path></g></svg></button> <!></form></dialog>');const bi={hash:"svelte-f9ok5r",code:`
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
`};function Fr(t,e){pe(e,!0),Cn(t,bi,!0);let n=Oe(e,"store",7),r,o=Ot(void 0),s=Ot(!1);function l(D){if(!T(o))return;const M=D.currentTarget.returnValue;switch(D.currentTarget.returnValue="",M){case"add":n().upsert(T(o)),le();break;case"note":n().setDraft(T(o)),le();break;case"remove":n().remove(T(o)),le();break;default:if(Mt.has(M)){n().upsert({...T(o),color:M}),le();return}break}}function v(){I(s,!0)}function d(){I(s,!1),setTimeout(f)}function f(){if(T(s)){r==null||r.close();return}requestAnimationFrame(()=>{const D=Rr(),M=D&&n().find(D);if(!D||!(M!=null&&M._id)&&!D.toString().trim()){r==null||r.close();return}I(o,rt(M)),r.inert=!0,r==null||r.show(),r.inert=!1;const B=256,P=10,j=D.getBoundingClientRect(),U=Math.min(Math.max(j.x,P)+window.scrollX,window.innerWidth+window.scrollX-B-P),z=Math.min(window.innerWidth-Math.max(j.x,P)-window.scrollX-j.width,window.innerWidth-window.scrollX-B-P),lt=Math.max(j.y,40)+window.scrollY+j.height+4,xt=window.innerHeight-Math.max(j.y,40)-window.scrollY+4,yt=U<window.innerWidth/2+window.scrollX,Tt=lt<window.innerHeight/2+window.scrollY;r==null||r.style.setProperty("left",yt?`${U}px`:"unset"),r==null||r.style.setProperty("right",yt?"unset":`${z}px`),r==null||r.style.setProperty("top",Tt?`${lt}px`:"unset"),r==null||r.style.setProperty("bottom",Tt?"unset":`${xt}px`)})}const _=mi(f,200);var m=yi();vt("mousedown",jt,v),vt("touchstart",jt,v,void 0,!0),vt("mouseup",jt,d),vt("touchend",jt,d),vt("touchcancel",jt,d),vt("selectionchange",jt,_),on(m,D=>r=D,()=>r),pt(()=>ue(m,"mobile",sn()));var b=ot(m),g=ot(b);kn(g,17,()=>Mt,([D,M])=>D,(D,M)=>{let B=()=>T(M)[0],P=()=>T(M)[1];var j=gi(),U=ot(j);J(j),pt(()=>{var z;Go(j,B()),ut(U,"style",`--color: ${P()??""}`),ue(U,"active",B()==((z=T(o))==null?void 0:z.color))}),it(D,j)});var k=et(g,2),$=ot(k),A=ot($),C=ot(A),N=et(C),x=et(N),L=et(x);J(A),J($),J(k);var ft=et(k,2);return De(ft,()=>{var D;return(D=T(o))==null?void 0:D._id},D=>{var M=wi();it(D,M)}),J(b),J(m),pt(()=>{var D,M,B,P,j,U;ue(m,"new",!((D=T(o))!=null&&D._id)),ut(C,"fill",(M=T(o))!=null&&M.note?"currentColor":"none"),ut(C,"stroke-width",(B=T(o))!=null&&B.note?"0":void 0),ut(N,"fill",(P=T(o))!=null&&P.note?"none":"currentColor"),ut(x,"fill",(j=T(o))!=null&&j.note?"none":"currentColor"),ut(L,"fill",(U=T(o))!=null&&U.note?"none":"currentColor")}),vt("close",m,l),it(t,m),_e({get store(){return n()},set store(D){n(D),ne()}})}Re(Fr,{store:{}},[],[],!0);function Ei(t){const e=t.currentTarget.getBoundingClientRect();e.top<=t.clientY&&t.clientY<=e.top+e.height&&e.left<=t.clientX&&t.clientX<=e.left+e.width||(t.preventDefault(),t.currentTarget.close())}var ki=(t,e)=>I(e,!1),Ci=wt('<input type="radio" name="color" class="svelte-n7j6yt">'),$i=wt('<div class="unlock svelte-n7j6yt"><a href="https://raindrop.io/pro/buy" target="_blank" class="svelte-n7j6yt">Upgrade to Pro</a> to unlock annotation</div>'),xi=wt('<blockquote role="presentation" class="svelte-n7j6yt"> </blockquote> <fieldset class="color svelte-n7j6yt"></fieldset> <textarea class="note svelte-n7j6yt" rows="4" maxlength="5000" placeholder="Notes (optional)"></textarea> <!>',1),Ti=wt('<dialog role="presentation" class="svelte-n7j6yt"><header class="svelte-n7j6yt"> </header> <form method="dialog" class="svelte-n7j6yt"><!> <footer class="svelte-n7j6yt"><button formnovalidate="" class="svelte-n7j6yt">Cancel <sup class="svelte-n7j6yt">esc</sup></button> <button type="submit" value="OK" class="svelte-n7j6yt"> <sup class="svelte-n7j6yt">&crarr;</sup></button></footer></form></dialog>');const Ni={hash:"svelte-n7j6yt",code:`
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
`};function Hr(t,e){pe(e,!0),Cn(t,Ni,!0);const n=[];let r=Oe(e,"store",7),o,s,l=Ot(!0);Ke(()=>{r().draft?(I(l,!0),o==null||o.showModal()):o==null||o.close()});function v(C){const N=C.currentTarget.returnValue;C.currentTarget.returnValue="",setTimeout(N?r().draftSubmit:r().draftCancel,200)}function d(C){var N;sn()||(C.stopImmediatePropagation(),C.stopPropagation(),C.key=="Enter"&&!C.shiftKey&&(C.preventDefault(),s&&((N=C.currentTarget.closest("form"))==null||N.requestSubmit(s))))}var f=Ti();on(f,C=>o=C,()=>o),f.__mousedown=[Ei],pt(()=>ue(f,"mobile",sn()));var _=ot(f),m=ot(_);J(_);var b=et(_,2),g=ot(b);De(g,()=>r().draft,C=>{var N=xi(),x=bn(N);x.__click=[ki,l];var L=ot(x);pt(()=>{var B,P;return Ye(L,((P=(B=r().draft)==null?void 0:B.text)==null?void 0:P.trim())||"")}),J(x);var ft=et(x,2);kn(ft,21,()=>Mt,Wo,(B,P)=>{let j=()=>T(P)[0],U=()=>T(P)[1];var z=Ci();Jo(z);var lt;pt(()=>{lt!==(lt=j())&&(z.value=(z.__value=j())==null?"":j()),ut(z,"style",`--color: ${U()??""}`)}),Qo(n,[],z,()=>(j(),r().draft.color),xt=>r().draft.color=xt),it(B,z)}),J(ft);var D=et(ft,2);Ko(D),Xo(D),D.__keydown=d;var M=et(D,2);De(M,()=>!r().pro,B=>{var P=$i();it(B,P)}),pt(()=>{ue(x,"compact",T(l)),D.disabled=!r().pro}),Zo(D,()=>r().draft.note,B=>r().draft.note=B),it(C,N)});var k=et(g,2),$=et(ot(k),2);on($,C=>s=C,()=>s);var A=ot($);return Ro(),J($),J(k),J(b),J(f),pt(()=>{var C,N;Ye(m,`${((C=r().draft)!=null&&C._id?"Edit":"New")??""} highlight`),Ye(A,`${((N=r().draft)!=null&&N._id?"Update":"Create")??""} `)}),vt("close",f,v),it(t,f),_e({get store(){return r()},set store(C){r(C),ne()}})}Tr(["mousedown","click","keydown"]);Re(Hr,{store:{}},[],[],!0);const Si=t=>{const e=t.target.getAttribute("data-highlight");e&&(t.preventDefault(),Or(e))};var Ai=wt('<div class="svelte-rwfy02"></div>'),Di=wt('<nav role="presentation" class="svelte-rwfy02"></nav>');const Li={hash:"svelte-rwfy02",code:`
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
`};function Pr(t,e){pe(e,!0),Cn(t,Li,!0);let n=Oe(e,"store",7);var r=Po(),o=bn(r);return De(o,()=>n().nav,s=>{var l=Di();l.__click=[Si],kn(l,21,()=>n().highlights,v=>v._id,(v,d)=>{var f=Ai();pt(()=>ut(f,"style",`top: var(--highlight-${T(d)._id??""}-top); --color: ${(Mt.get(T(d).color)||T(d).color)??""}`)),pt(()=>ut(f,"data-highlight",T(d)._id)),it(v,f)}),J(l),it(s,l)}),it(t,r),_e({get store(){return n()},set store(s){n(s),ne()}})}Tr(["click"]);Re(Pr,{store:{}},[],[],!0);var Mi=wt("<!> <!> <!>",1);function ji(t,e){pe(e,!0);let n=Oe(e,"store",7);Ke(()=>{Xe(n().highlights)});let r;function o(){Xe(n().highlights),clearTimeout(r),r=setTimeout(()=>Xe(n().highlights),3e3)}lr(()=>{document.readyState&&o()}),Ke(()=>hi);var s=Mi();vt("load",Ae,o),vt("popstate",Ae,o);var l=bn(s);Fr(l,{get store(){return n()}});var v=et(l,2);Hr(v,{get store(){return n()}});var d=et(v,2);return Pr(d,{get store(){return n()}}),it(t,s),_e({get store(){return n()},set store(f){n(f),ne()}})}customElements.define("rdh-ui",Re(ji,{store:{}},[],[],!0));function Oi(t){if(typeof chrome=="object"&&chrome.runtime&&chrome.runtime.onMessage||typeof browser=="object"&&browser.runtime&&browser.runtime.onMessage){const{runtime:e}=typeof browser=="object"?browser:chrome,n=(r,o)=>{o.id==e.id&&typeof r.type=="string"&&t(r)};return e.onMessage.removeListener(n),e.onMessage.addListener(n),r=>e.sendMessage(null,r)}if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.rdh)return window.rdhSend=t,e=>window.webkit.messageHandlers.rdh.postMessage(e);if(typeof window<"u"&&typeof window.process=="object"&&window.process.type==="renderer"||typeof process<"u"&&typeof process.versions=="object"&&process.versions.electron){const{ipcRenderer:e}=require("electron"),n=(r,o)=>t(o);return e.removeListener("RDH",n),e.on("RDH",n),r=>e.sendToHost("RDH",r)}if("ReactNativeWebView"in window)return window.ReactNativeWebViewSendMessage=t,e=>window.ReactNativeWebView.postMessage(JSON.stringify(e));if(window.self!==window.top){const e=({data:n,source:r})=>{r!==window.parent||typeof n!="object"||typeof n.type!="string"||t(n)};return window.removeEventListener("message",e),window.addEventListener("message",e),n=>window.parent.postMessage(n,"*")}throw new Error("unsupported platform")}async function Ri(t){let e=!1;const n=new Set,r=Oi(o=>{if(!e){n.add(o);return}t(o)});await new Promise(o=>{function s(){window.removeEventListener("DOMContentLoaded",s),o()}document.readyState=="loading"?(window.removeEventListener("DOMContentLoaded",s),window.addEventListener("DOMContentLoaded",s,{once:!0})):o()}),e=!0;for(const o of n)t(o),n.delete(o);return r}const ie=document.createElement("rdh-ui");(async()=>{const t=await Ri(n=>{switch(n.type){case"RDH_APPLY":Array.isArray(n.payload)&&(e.highlights=n.payload);break;case"RDH_CONFIG":typeof n.payload.pro=="boolean"&&(e.pro=n.payload.pro),typeof n.payload.nav=="boolean"&&(e.nav=n.payload.nav),typeof n.payload.enabled=="boolean"&&(n.payload.enabled===!0?document.body.contains(ie)||document.body.appendChild(ie):document.body.contains(ie)&&document.body.removeChild(ie));break;case"RDH_SCROLL":typeof n.payload._id=="string"&&Or(n.payload._id);break;case"RDH_ADD_SELECTION":const r=Rr();if(!r)return;const o=e.find(r);if(!o)return;e.upsert(o),le();break;case"RDH_NOTE_SELECTION":console.log("not implemented yet");break}}),e=pi(n=>t({type:"RDH_ADD",payload:n}),n=>t({type:"RDH_UPDATE",payload:n}),({_id:n})=>t({type:"RDH_REMOVE",payload:{_id:n}}));ie.store=e,t({type:"RDH_READY",payload:{url:location.href}})})();
