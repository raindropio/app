"use strict";var Kr=Object.defineProperty;var In=t=>{throw TypeError(t)};var Jr=(t,e,n)=>e in t?Kr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ct=(t,e,n)=>Jr(t,typeof e!="symbol"?e+"":e,n),Pn=(t,e,n)=>e.has(t)||In("Cannot "+n);var K=(t,e,n)=>(Pn(t,e,"read from private field"),n?n.call(t):e.get(t)),Ue=(t,e,n)=>e.has(t)?In("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),ze=(t,e,n,r)=>(Pn(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n);(function(){var t=window.Document.prototype.createElement,e=window.Document.prototype.createElementNS,n=window.Document.prototype.importNode,r=window.Document.prototype.prepend,o=window.Document.prototype.append,s=window.DocumentFragment.prototype.prepend,l=window.DocumentFragment.prototype.append,d=window.Node.prototype.cloneNode,h=window.Node.prototype.appendChild,f=window.Node.prototype.insertBefore,_=window.Node.prototype.removeChild,m=window.Node.prototype.replaceChild,k=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),g=window.Element.prototype.attachShadow,b=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),T=window.Element.prototype.getAttribute,L=window.Element.prototype.setAttribute,S=window.Element.prototype.removeAttribute,C=window.Element.prototype.toggleAttribute,$=window.Element.prototype.getAttributeNS,A=window.Element.prototype.setAttributeNS,xt=window.Element.prototype.removeAttributeNS,Z=window.Element.prototype.insertAdjacentElement,N=window.Element.prototype.insertAdjacentHTML,I=window.Element.prototype.prepend,P=window.Element.prototype.append,F=window.Element.prototype.before,O=window.Element.prototype.after,X=window.Element.prototype.replaceWith,U=window.Element.prototype.remove,yt=window.HTMLElement,ut=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),te=window.HTMLElement.prototype.insertAdjacentElement,ee=window.HTMLElement.prototype.insertAdjacentHTML,Nn=new Set;"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(i){return Nn.add(i)});function Sn(i){var a=Nn.has(i);return i=/^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(i),!a&&i}var qr=document.contains?document.contains.bind(document):document.documentElement.contains.bind(document.documentElement);function V(i){var a=i.isConnected;if(a!==void 0)return a;if(qr(i))return!0;for(;i&&!(i.__CE_isImportDocument||i instanceof Document);)i=i.parentNode||(window.ShadowRoot&&i instanceof ShadowRoot?i.host:void 0);return!(!i||!(i.__CE_isImportDocument||i instanceof Document))}function qe(i){var a=i.children;if(a)return Array.prototype.slice.call(a);for(a=[],i=i.firstChild;i;i=i.nextSibling)i.nodeType===Node.ELEMENT_NODE&&a.push(i);return a}function Be(i,a){for(;a&&a!==i&&!a.nextSibling;)a=a.parentNode;return a&&a!==i?a.nextSibling:null}function Ve(i,a,c){for(var p=i;p;){if(p.nodeType===Node.ELEMENT_NODE){var u=p;a(u);var v=u.localName;if(v==="link"&&u.getAttribute("rel")==="import"){if(p=u.import,c===void 0&&(c=new Set),p instanceof Node&&!c.has(p))for(c.add(p),p=p.firstChild;p;p=p.nextSibling)Ve(p,a,c);p=Be(i,u);continue}else if(v==="template"){p=Be(i,u);continue}if(u=u.__CE_shadowRoot)for(u=u.firstChild;u;u=u.nextSibling)Ve(u,a,c)}p=p.firstChild?p.firstChild:Be(i,p)}}function ge(){var i=!(dt==null||!dt.noDocumentConstructionObserver),a=!(dt==null||!dt.shadyDomFastWalk);this.m=[],this.g=[],this.j=!1,this.shadyDomFastWalk=a,this.I=!i}function ne(i,a,c,p){var u=window.ShadyDOM;if(i.shadyDomFastWalk&&u&&u.inUse){if(a.nodeType===Node.ELEMENT_NODE&&c(a),a.querySelectorAll)for(i=u.nativeMethods.querySelectorAll.call(a,"*"),a=0;a<i.length;a++)c(i[a])}else Ve(a,c,p)}function Br(i,a){i.j=!0,i.m.push(a)}function Vr(i,a){i.j=!0,i.g.push(a)}function We(i,a){i.j&&ne(i,a,function(c){return qt(i,c)})}function qt(i,a){if(i.j&&!a.__CE_patched){a.__CE_patched=!0;for(var c=0;c<i.m.length;c++)i.m[c](a);for(c=0;c<i.g.length;c++)i.g[c](a)}}function ft(i,a){var c=[];for(ne(i,a,function(u){return c.push(u)}),a=0;a<c.length;a++){var p=c[a];p.__CE_state===1?i.connectedCallback(p):ye(i,p)}}function Q(i,a){var c=[];for(ne(i,a,function(u){return c.push(u)}),a=0;a<c.length;a++){var p=c[a];p.__CE_state===1&&i.disconnectedCallback(p)}}function wt(i,a,c){c=c===void 0?{}:c;var p=c.J,u=c.upgrade||function(y){return ye(i,y)},v=[];for(ne(i,a,function(y){if(i.j&&qt(i,y),y.localName==="link"&&y.getAttribute("rel")==="import"){var w=y.import;w instanceof Node&&(w.__CE_isImportDocument=!0,w.__CE_registry=document.__CE_registry),w&&w.readyState==="complete"?w.__CE_documentLoadHandled=!0:y.addEventListener("load",function(){var E=y.import;if(!E.__CE_documentLoadHandled){E.__CE_documentLoadHandled=!0;var D=new Set;p&&(p.forEach(function(q){return D.add(q)}),D.delete(E)),wt(i,E,{J:D,upgrade:u})}})}else v.push(y)},p),a=0;a<v.length;a++)u(v[a])}function ye(i,a){try{var c=a.ownerDocument,p=c.__CE_registry,u=p&&(c.defaultView||c.__CE_isImportDocument)?we(p,a.localName):void 0;if(u&&a.__CE_state===void 0){u.constructionStack.push(a);try{try{if(new u.constructorFunction!==a)throw Error("The custom element constructor did not produce the element being upgraded.")}finally{u.constructionStack.pop()}}catch(E){throw a.__CE_state=2,E}if(a.__CE_state=1,a.__CE_definition=u,u.attributeChangedCallback&&a.hasAttributes()){var v=u.observedAttributes;for(u=0;u<v.length;u++){var y=v[u],w=a.getAttribute(y);w!==null&&i.attributeChangedCallback(a,y,null,w,null)}}V(a)&&i.connectedCallback(a)}}catch(E){Bt(E)}}ge.prototype.connectedCallback=function(i){var a=i.__CE_definition;if(a.connectedCallback)try{a.connectedCallback.call(i)}catch(c){Bt(c)}},ge.prototype.disconnectedCallback=function(i){var a=i.__CE_definition;if(a.disconnectedCallback)try{a.disconnectedCallback.call(i)}catch(c){Bt(c)}},ge.prototype.attributeChangedCallback=function(i,a,c,p,u){var v=i.__CE_definition;if(v.attributeChangedCallback&&-1<v.observedAttributes.indexOf(a))try{v.attributeChangedCallback.call(i,a,c,p,u)}catch(y){Bt(y)}};function An(i,a,c,p){var u=a.__CE_registry;if(u&&(p===null||p==="http://www.w3.org/1999/xhtml")&&(u=we(u,c)))try{var v=new u.constructorFunction;if(v.__CE_state===void 0||v.__CE_definition===void 0)throw Error("Failed to construct '"+c+"': The returned value was not constructed with the HTMLElement constructor.");if(v.namespaceURI!=="http://www.w3.org/1999/xhtml")throw Error("Failed to construct '"+c+"': The constructed element's namespace must be the HTML namespace.");if(v.hasAttributes())throw Error("Failed to construct '"+c+"': The constructed element must not have any attributes.");if(v.firstChild!==null)throw Error("Failed to construct '"+c+"': The constructed element must not have any children.");if(v.parentNode!==null)throw Error("Failed to construct '"+c+"': The constructed element must not have a parent node.");if(v.ownerDocument!==a)throw Error("Failed to construct '"+c+"': The constructed element's owner document is incorrect.");if(v.localName!==c)throw Error("Failed to construct '"+c+"': The constructed element's local name is incorrect.");return v}catch(y){return Bt(y),a=p===null?t.call(a,c):e.call(a,p,c),Object.setPrototypeOf(a,HTMLUnknownElement.prototype),a.__CE_state=2,a.__CE_definition=void 0,qt(i,a),a}return a=p===null?t.call(a,c):e.call(a,p,c),qt(i,a),a}function Bt(i){var a="",c="",p=0,u=0;i instanceof Error?(a=i.message,c=i.sourceURL||i.fileName||"",p=i.line||i.lineNumber||0,u=i.column||i.columnNumber||0):a="Uncaught "+String(i);var v=void 0;ErrorEvent.prototype.initErrorEvent===void 0?v=new ErrorEvent("error",{cancelable:!0,message:a,filename:c,lineno:p,colno:u,error:i}):(v=document.createEvent("ErrorEvent"),v.initErrorEvent("error",!1,!0,a,c,p),v.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0}})}),v.error===void 0&&Object.defineProperty(v,"error",{configurable:!0,enumerable:!0,get:function(){return i}}),window.dispatchEvent(v),v.defaultPrevented||console.error(i)}function Dn(){var i=this;this.g=void 0,this.F=new Promise(function(a){i.l=a})}Dn.prototype.resolve=function(i){if(this.g)throw Error("Already resolved.");this.g=i,this.l(i)};function Ln(i){var a=document;this.l=void 0,this.h=i,this.g=a,wt(this.h,this.g),this.g.readyState==="loading"&&(this.l=new MutationObserver(this.G.bind(this)),this.l.observe(this.g,{childList:!0,subtree:!0}))}function Mn(i){i.l&&i.l.disconnect()}Ln.prototype.G=function(i){var a=this.g.readyState;for(a!=="interactive"&&a!=="complete"||Mn(this),a=0;a<i.length;a++)for(var c=i[a].addedNodes,p=0;p<c.length;p++)wt(this.h,c[p])};function W(i){this.s=new Map,this.u=new Map,this.C=new Map,this.A=!1,this.B=new Map,this.o=function(a){return a()},this.i=!1,this.v=[],this.h=i,this.D=i.I?new Ln(i):void 0}W.prototype.H=function(i,a){var c=this;if(!(a instanceof Function))throw new TypeError("Custom element constructor getters must be functions.");jn(this,i),this.s.set(i,a),this.v.push(i),this.i||(this.i=!0,this.o(function(){return Rn(c)}))},W.prototype.define=function(i,a){var c=this;if(!(a instanceof Function))throw new TypeError("Custom element constructors must be functions.");jn(this,i),On(this,i,a),this.v.push(i),this.i||(this.i=!0,this.o(function(){return Rn(c)}))};function jn(i,a){if(!Sn(a))throw new SyntaxError("The element name '"+a+"' is not valid.");if(we(i,a))throw Error("A custom element with name '"+(a+"' has already been defined."));if(i.A)throw Error("A custom element is already being defined.")}function On(i,a,c){i.A=!0;var p;try{var u=c.prototype;if(!(u instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var v=function(q){var Vt=u[q];if(Vt!==void 0&&!(Vt instanceof Function))throw Error("The '"+q+"' callback must be a function.");return Vt},y=v("connectedCallback"),w=v("disconnectedCallback"),E=v("adoptedCallback"),D=(p=v("attributeChangedCallback"))&&c.observedAttributes||[]}catch(q){throw q}finally{i.A=!1}return c={localName:a,constructorFunction:c,connectedCallback:y,disconnectedCallback:w,adoptedCallback:E,attributeChangedCallback:p,observedAttributes:D,constructionStack:[]},i.u.set(a,c),i.C.set(c.constructorFunction,c),c}W.prototype.upgrade=function(i){wt(this.h,i)};function Rn(i){if(i.i!==!1){i.i=!1;for(var a=[],c=i.v,p=new Map,u=0;u<c.length;u++)p.set(c[u],[]);for(wt(i.h,document,{upgrade:function(E){if(E.__CE_state===void 0){var D=E.localName,q=p.get(D);q?q.push(E):i.u.has(D)&&a.push(E)}}}),u=0;u<a.length;u++)ye(i.h,a[u]);for(u=0;u<c.length;u++){for(var v=c[u],y=p.get(v),w=0;w<y.length;w++)ye(i.h,y[w]);(v=i.B.get(v))&&v.resolve(void 0)}c.length=0}}W.prototype.get=function(i){if(i=we(this,i))return i.constructorFunction},W.prototype.whenDefined=function(i){if(!Sn(i))return Promise.reject(new SyntaxError("'"+i+"' is not a valid custom element name."));var a=this.B.get(i);if(a)return a.F;a=new Dn,this.B.set(i,a);var c=this.u.has(i)||this.s.has(i);return i=this.v.indexOf(i)===-1,c&&i&&a.resolve(void 0),a.F},W.prototype.polyfillWrapFlushCallback=function(i){this.D&&Mn(this.D);var a=this.o;this.o=function(c){return i(function(){return a(c)})}};function we(i,a){var c=i.u.get(a);if(c)return c;if(c=i.s.get(a)){i.s.delete(a);try{return On(i,a,c())}catch(p){Bt(p)}}}W.prototype.define=W.prototype.define,W.prototype.upgrade=W.prototype.upgrade,W.prototype.get=W.prototype.get,W.prototype.whenDefined=W.prototype.whenDefined,W.prototype.polyfillDefineLazy=W.prototype.H,W.prototype.polyfillWrapFlushCallback=W.prototype.polyfillWrapFlushCallback;function Ye(i,a,c){function p(u){return function(v){for(var y=[],w=0;w<arguments.length;++w)y[w]=arguments[w];w=[];for(var E=[],D=0;D<y.length;D++){var q=y[D];if(q instanceof Element&&V(q)&&E.push(q),q instanceof DocumentFragment)for(q=q.firstChild;q;q=q.nextSibling)w.push(q);else w.push(q)}for(u.apply(this,y),y=0;y<E.length;y++)Q(i,E[y]);if(V(this))for(y=0;y<w.length;y++)E=w[y],E instanceof Element&&ft(i,E)}}c.prepend!==void 0&&(a.prepend=p(c.prepend)),c.append!==void 0&&(a.append=p(c.append))}function Wr(i){Document.prototype.createElement=function(a){return An(i,this,a,null)},Document.prototype.importNode=function(a,c){return a=n.call(this,a,!!c),this.__CE_registry?wt(i,a):We(i,a),a},Document.prototype.createElementNS=function(a,c){return An(i,this,c,a)},Ye(i,Document.prototype,{prepend:r,append:o})}function Yr(i){function a(p){return function(u){for(var v=[],y=0;y<arguments.length;++y)v[y]=arguments[y];y=[];for(var w=[],E=0;E<v.length;E++){var D=v[E];if(D instanceof Element&&V(D)&&w.push(D),D instanceof DocumentFragment)for(D=D.firstChild;D;D=D.nextSibling)y.push(D);else y.push(D)}for(p.apply(this,v),v=0;v<w.length;v++)Q(i,w[v]);if(V(this))for(v=0;v<y.length;v++)w=y[v],w instanceof Element&&ft(i,w)}}var c=Element.prototype;F!==void 0&&(c.before=a(F)),O!==void 0&&(c.after=a(O)),X!==void 0&&(c.replaceWith=function(p){for(var u=[],v=0;v<arguments.length;++v)u[v]=arguments[v];v=[];for(var y=[],w=0;w<u.length;w++){var E=u[w];if(E instanceof Element&&V(E)&&y.push(E),E instanceof DocumentFragment)for(E=E.firstChild;E;E=E.nextSibling)v.push(E);else v.push(E)}for(w=V(this),X.apply(this,u),u=0;u<y.length;u++)Q(i,y[u]);if(w)for(Q(i,this),u=0;u<v.length;u++)y=v[u],y instanceof Element&&ft(i,y)}),U!==void 0&&(c.remove=function(){var p=V(this);U.call(this),p&&Q(i,this)})}function Ur(i){function a(u,v){Object.defineProperty(u,"innerHTML",{enumerable:v.enumerable,configurable:!0,get:v.get,set:function(y){var w=this,E=void 0;if(V(this)&&(E=[],ne(i,this,function(Vt){Vt!==w&&E.push(Vt)})),v.set.call(this,y),E)for(var D=0;D<E.length;D++){var q=E[D];q.__CE_state===1&&i.disconnectedCallback(q)}return this.ownerDocument.__CE_registry?wt(i,this):We(i,this),y}})}function c(u,v){u.insertAdjacentElement=function(y,w){var E=V(w);return y=v.call(this,y,w),E&&Q(i,w),V(y)&&ft(i,w),y}}function p(u,v){function y(w,E){for(var D=[];w!==E;w=w.nextSibling)D.push(w);for(E=0;E<D.length;E++)wt(i,D[E])}u.insertAdjacentHTML=function(w,E){if(w=w.toLowerCase(),w==="beforebegin"){var D=this.previousSibling;v.call(this,w,E),y(D||this.parentNode.firstChild,this)}else if(w==="afterbegin")D=this.firstChild,v.call(this,w,E),y(this.firstChild,D);else if(w==="beforeend")D=this.lastChild,v.call(this,w,E),y(D||this.firstChild,null);else if(w==="afterend")D=this.nextSibling,v.call(this,w,E),y(this.nextSibling,D);else throw new SyntaxError("The value provided ("+String(w)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.")}}g&&(Element.prototype.attachShadow=function(u){if(u=g.call(this,u),i.j&&!u.__CE_patched){u.__CE_patched=!0;for(var v=0;v<i.m.length;v++)i.m[v](u)}return this.__CE_shadowRoot=u}),b&&b.get?a(Element.prototype,b):ut&&ut.get?a(HTMLElement.prototype,ut):Vr(i,function(u){a(u,{enumerable:!0,configurable:!0,get:function(){return d.call(this,!0).innerHTML},set:function(v){var y=this.localName==="template",w=y?this.content:this,E=e.call(document,this.namespaceURI,this.localName);for(E.innerHTML=v;0<w.childNodes.length;)_.call(w,w.childNodes[0]);for(v=y?E.content:E;0<v.childNodes.length;)h.call(w,v.childNodes[0])}})}),Element.prototype.setAttribute=function(u,v){if(this.__CE_state!==1)return L.call(this,u,v);var y=T.call(this,u);L.call(this,u,v),v=T.call(this,u),i.attributeChangedCallback(this,u,y,v,null)},Element.prototype.setAttributeNS=function(u,v,y){if(this.__CE_state!==1)return A.call(this,u,v,y);var w=$.call(this,u,v);A.call(this,u,v,y),y=$.call(this,u,v),i.attributeChangedCallback(this,v,w,y,u)},Element.prototype.removeAttribute=function(u){if(this.__CE_state!==1)return S.call(this,u);var v=T.call(this,u);S.call(this,u),v!==null&&i.attributeChangedCallback(this,u,v,null,null)},C&&(Element.prototype.toggleAttribute=function(u,v){if(this.__CE_state!==1)return C.call(this,u,v);var y=T.call(this,u),w=y!==null;return v=C.call(this,u,v),w!==v&&i.attributeChangedCallback(this,u,y,v?"":null,null),v}),Element.prototype.removeAttributeNS=function(u,v){if(this.__CE_state!==1)return xt.call(this,u,v);var y=$.call(this,u,v);xt.call(this,u,v);var w=$.call(this,u,v);y!==w&&i.attributeChangedCallback(this,v,y,w,u)},te?c(HTMLElement.prototype,te):Z&&c(Element.prototype,Z),ee?p(HTMLElement.prototype,ee):N&&p(Element.prototype,N),Ye(i,Element.prototype,{prepend:I,append:P}),Yr(i)}var Fn={};function zr(i){function a(){var c=this.constructor,p=document.__CE_registry.C.get(c);if(!p)throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var u=p.constructionStack;if(u.length===0)return u=t.call(document,p.localName),Object.setPrototypeOf(u,c.prototype),u.__CE_state=1,u.__CE_definition=p,qt(i,u),u;var v=u.length-1,y=u[v];if(y===Fn)throw Error("Failed to construct '"+p.localName+"': This element was already constructed.");return u[v]=Fn,Object.setPrototypeOf(y,c.prototype),qt(i,y),y}a.prototype=yt.prototype,Object.defineProperty(HTMLElement.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:a}),window.HTMLElement=a}function Xr(i){function a(c,p){Object.defineProperty(c,"textContent",{enumerable:p.enumerable,configurable:!0,get:p.get,set:function(u){if(this.nodeType===Node.TEXT_NODE)p.set.call(this,u);else{var v=void 0;if(this.firstChild){var y=this.childNodes,w=y.length;if(0<w&&V(this)){v=Array(w);for(var E=0;E<w;E++)v[E]=y[E]}}if(p.set.call(this,u),v)for(u=0;u<v.length;u++)Q(i,v[u])}}})}Node.prototype.insertBefore=function(c,p){if(c instanceof DocumentFragment){var u=qe(c);if(c=f.call(this,c,p),V(this))for(p=0;p<u.length;p++)ft(i,u[p]);return c}return u=c instanceof Element&&V(c),p=f.call(this,c,p),u&&Q(i,c),V(this)&&ft(i,c),p},Node.prototype.appendChild=function(c){if(c instanceof DocumentFragment){var p=qe(c);if(c=h.call(this,c),V(this))for(var u=0;u<p.length;u++)ft(i,p[u]);return c}return p=c instanceof Element&&V(c),u=h.call(this,c),p&&Q(i,c),V(this)&&ft(i,c),u},Node.prototype.cloneNode=function(c){return c=d.call(this,!!c),this.ownerDocument.__CE_registry?wt(i,c):We(i,c),c},Node.prototype.removeChild=function(c){var p=c instanceof Element&&V(c),u=_.call(this,c);return p&&Q(i,c),u},Node.prototype.replaceChild=function(c,p){if(c instanceof DocumentFragment){var u=qe(c);if(c=m.call(this,c,p),V(this))for(Q(i,p),p=0;p<u.length;p++)ft(i,u[p]);return c}u=c instanceof Element&&V(c);var v=m.call(this,c,p),y=V(this);return y&&Q(i,p),u&&Q(i,c),y&&ft(i,c),v},k&&k.get?a(Node.prototype,k):Br(i,function(c){a(c,{enumerable:!0,configurable:!0,get:function(){for(var p=[],u=this.firstChild;u;u=u.nextSibling)u.nodeType!==Node.COMMENT_NODE&&p.push(u.textContent);return p.join("")},set:function(p){for(;this.firstChild;)_.call(this,this.firstChild);p!=null&&p!==""&&h.call(this,document.createTextNode(p))}})})}var dt=window.customElements;function Hn(){var i=new ge;zr(i),Wr(i),Ye(i,DocumentFragment.prototype,{prepend:s,append:l}),Xr(i),Ur(i),window.CustomElementRegistry=W,i=new W(i),document.__CE_registry=i,Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:i})}dt&&!dt.forcePolyfill&&typeof dt.define=="function"&&typeof dt.get=="function"||Hn(),window.__CE_installPolyfill=Hn}).call(self);const cn=1,fn=2,Zn=4,Gr=8,Zr=16,Qr=2,to=1,eo=2,Qn="[",dn="[!",hn="]",se={},tt=Symbol(),tr=!1;function vn(t){console.warn("hydration_mismatch")}var pn=Array.isArray,_n=Array.from,ke=Object.keys,Ce=Object.defineProperty,Rt=Object.getOwnPropertyDescriptor,no=Object.prototype,ro=Array.prototype,oo=Object.getPrototypeOf;function er(t){for(var e=0;e<t.length;e++)t[e]()}const Ct=2,nr=4,Jt=8,rr=16,Lt=32,je=64,Pt=128,$e=256,G=512,St=1024,fe=2048,Ht=4096,de=8192,io=16384,mn=32768,so=1<<18,or=1<<19,Ut=Symbol("$state"),lo=Symbol("");function ir(t){return t===this.v}function ao(t,e){return t!=t?e==e:t!==e||t!==null&&typeof t=="object"||typeof t=="function"}function uo(t){return!ao(t,this.v)}function co(t){throw new Error("effect_in_teardown")}function fo(){throw new Error("effect_in_unowned_derived")}function ho(t){throw new Error("effect_orphan")}function vo(){throw new Error("effect_update_depth_exceeded")}function po(){throw new Error("hydration_failed")}function _o(t){throw new Error("props_invalid_value")}function mo(){throw new Error("state_descriptors_fixed")}function go(){throw new Error("state_prototype_fixed")}function yo(){throw new Error("state_unsafe_local_read")}function wo(){throw new Error("state_unsafe_mutation")}function nt(t){return{f:0,v:t,reactions:null,equals:ir,version:0}}function jt(t){return bo(nt(t))}function gn(t){var n;const e=nt(t);return e.equals=uo,Y!==null&&Y.l!==null&&((n=Y.l).s??(n.s=[])).push(e),e}function bo(t){return H!==null&&H.f&Ct&&(pt===null?So([t]):pt.push(t)),t}function B(t,e){return H!==null&&nn()&&H.f&Ct&&(pt===null||!pt.includes(t))&&wo(),t.equals(e)||(t.v=e,t.version=yr(),sr(t,St),nn()&&M!==null&&M.f&G&&!(M.f&Lt)&&(z!==null&&z.includes(t)?(mt(M,St),Re(M)):Nt===null?Ao([t]):Nt.push(t))),e}function sr(t,e){var n=t.reactions;if(n!==null)for(var r=nn(),o=n.length,s=0;s<o;s++){var l=n[s],d=l.f;d&St||!r&&l===M||(mt(l,e),d&(G|Pt)&&(d&Ct?sr(l,fe):Re(l)))}}function Eo(t){M===null&&H===null&&ho(),H!==null&&H.f&Pt&&fo(),kn&&co()}function ko(t,e){var n=e.last;n===null?e.last=e.first=t:(n.next=t,t.prev=n,e.last=t)}function Gt(t,e,n,r=!0){var o=(t&je)!==0,s=M,l={ctx:Y,deps:null,nodes_start:null,nodes_end:null,f:t|St,first:null,fn:e,last:null,next:null,parent:o?null:s,prev:null,teardown:null,transitions:null,version:0};if(n){var d=zt;try{qn(!0),Oe(l),l.f|=io}catch(_){throw Zt(l),_}finally{qn(d)}}else e!==null&&Re(l);var h=n&&l.deps===null&&l.first===null&&l.nodes_start===null&&l.teardown===null&&(l.f&or)===0;if(!h&&!o&&r&&(s!==null&&ko(l,s),H!==null&&H.f&Ct)){var f=H;(f.children??(f.children=[])).push(l)}return l}function lr(t){const e=Gt(Jt,null,!1);return mt(e,G),e.teardown=t,e}function Ze(t){Eo();var e=M!==null&&(M.f&Jt)!==0&&Y!==null&&!Y.m;if(e){var n=Y;(n.e??(n.e=[])).push({fn:t,effect:M,reaction:H})}else{var r=wn(t);return r}}function yn(t){const e=Gt(je,t,!0);return()=>{Zt(e)}}function wn(t){return Gt(nr,t,!1)}function he(t){return Gt(Jt,t,!0)}function vt(t){return he(t)}function ar(t,e=0){return Gt(Jt|rr|e,t,!0)}function ae(t,e=!0){return Gt(Jt|Lt,t,!0,e)}function ur(t){var e=t.teardown;if(e!==null){const n=kn,r=H;Bn(!0),Se(null);try{e.call(null)}finally{Bn(n),Se(r)}}}function Zt(t,e=!0){var n=!1;if((e||t.f&so)&&t.nodes_start!==null){for(var r=t.nodes_start,o=t.nodes_end;r!==null;){var s=r===o?null:$t(r);r.remove(),r=s}n=!0}br(t,e&&!n),ce(t,0),mt(t,de);var l=t.transitions;if(l!==null)for(const h of l)h.stop();ur(t);var d=t.parent;d!==null&&d.first!==null&&cr(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.parent=t.fn=t.nodes_start=t.nodes_end=null}function cr(t){var e=t.parent,n=t.prev,r=t.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),e!==null&&(e.first===t&&(e.first=r),e.last===t&&(e.last=n))}function Qe(t,e){var n=[];bn(t,n,!0),fr(n,()=>{Zt(t),e&&e()})}function fr(t,e){var n=t.length;if(n>0){var r=()=>--n||e();for(var o of t)o.out(r)}else e()}function bn(t,e,n){if(!(t.f&Ht)){if(t.f^=Ht,t.transitions!==null)for(const l of t.transitions)(l.is_global||n)&&e.push(l);for(var r=t.first;r!==null;){var o=r.next,s=(r.f&mn)!==0||(r.f&Lt)!==0;bn(r,e,s?n:!1),r=o}}}function xe(t){dr(t,!0)}function dr(t,e){if(t.f&Ht){t.f^=Ht,ve(t)&&Oe(t);for(var n=t.first;n!==null;){var r=n.next,o=(n.f&mn)!==0||(n.f&Lt)!==0;dr(n,o?e:!1),n=r}if(t.transitions!==null)for(const s of t.transitions)(s.is_global||e)&&s.in()}}const Co=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let Te=!1,Ne=!1,tn=[],en=[];function hr(){Te=!1;const t=tn.slice();tn=[],er(t)}function vr(){Ne=!1;const t=en.slice();en=[],er(t)}function It(t){Te||(Te=!0,queueMicrotask(hr)),tn.push(t)}function $o(t){Ne||(Ne=!0,Co(vr)),en.push(t)}function xo(){Te&&hr(),Ne&&vr()}function En(t){let e=Ct|St;M===null?e|=Pt:M.f|=or;const n={children:null,deps:null,equals:ir,f:e,fn:t,reactions:null,v:null,version:0,parent:M};if(H!==null&&H.f&Ct){var r=H;(r.children??(r.children=[])).push(n)}return n}function pr(t){var e=t.children;if(e!==null){t.children=null;for(var n=0;n<e.length;n+=1){var r=e[n];r.f&Ct?To(r):Zt(r)}}}function _r(t){var e,n=M;Ae(t.parent);try{pr(t),e=wr(t)}finally{Ae(n)}var r=(Yt||t.f&Pt)&&t.deps!==null?fe:G;mt(t,r),t.equals(e)||(t.v=e,t.version=yr())}function To(t){pr(t),ce(t,0),mt(t,de),t.children=t.deps=t.reactions=t.fn=null}const mr=0,No=1;let be=mr,ue=!1,zt=!1,kn=!1;function qn(t){zt=t}function Bn(t){kn=t}let Ot=[],Xt=0;let H=null;function Se(t){H=t}let M=null;function Ae(t){M=t}let pt=null;function So(t){pt=t}let z=null,et=0,Nt=null;function Ao(t){Nt=t}let gr=0,Yt=!1,Y=null;function yr(){return++gr}function nn(){return Y!==null&&Y.l===null}function ve(t){var l,d;var e=t.f;if(e&St)return!0;if(e&fe){var n=t.deps,r=(e&Pt)!==0;if(n!==null){var o;if(e&$e){for(o=0;o<n.length;o++)((l=n[o]).reactions??(l.reactions=[])).push(t);t.f^=$e}for(o=0;o<n.length;o++){var s=n[o];if(ve(s)&&_r(s),r&&M!==null&&!Yt&&!((d=s==null?void 0:s.reactions)!=null&&d.includes(t))&&(s.reactions??(s.reactions=[])).push(t),s.version>t.version)return!0}}r||mt(t,G)}return!1}function Do(t,e,n){throw t}function wr(t){var _;var e=z,n=et,r=Nt,o=H,s=Yt,l=pt;z=null,et=0,Nt=null,H=t.f&(Lt|je)?null:t,Yt=!zt&&(t.f&Pt)!==0,pt=null;try{var d=(0,t.fn)(),h=t.deps;if(z!==null){var f;if(ce(t,et),h!==null&&et>0)for(h.length=et+z.length,f=0;f<z.length;f++)h[et+f]=z[f];else t.deps=h=z;if(!Yt)for(f=et;f<h.length;f++)((_=h[f]).reactions??(_.reactions=[])).push(t)}else h!==null&&et<h.length&&(ce(t,et),h.length=et);return d}finally{z=e,et=n,Nt=r,H=o,Yt=s,pt=l}}function Lo(t,e){let n=e.reactions;if(n!==null){var r=n.indexOf(t);if(r!==-1){var o=n.length-1;o===0?n=e.reactions=null:(n[r]=n[o],n.pop())}}n===null&&e.f&Ct&&(z===null||!z.includes(e))&&(mt(e,fe),e.f&(Pt|$e)||(e.f^=$e),ce(e,0))}function ce(t,e){var n=t.deps;if(n!==null)for(var r=e;r<n.length;r++)Lo(t,n[r])}function br(t,e=!1){var n=t.first;for(t.first=t.last=null;n!==null;){var r=n.next;Zt(n,e),n=r}}function Oe(t){var e=t.f;if(!(e&de)){mt(t,G);var n=M,r=Y;M=t,Y=t.ctx;try{e&rr||br(t),ur(t);var o=wr(t);t.teardown=typeof o=="function"?o:null,t.version=gr}catch(s){Do(s)}finally{M=n,Y=r}}}function Er(){Xt>1e3&&(Xt=0,vo()),Xt++}function kr(t){var e=t.length;if(e!==0){Er();var n=zt;zt=!0;try{for(var r=0;r<e;r++){var o=t[r];o.f&G||(o.f^=G);var s=[];Cr(o,s),Mo(s)}}finally{zt=n}}}function Mo(t){var e=t.length;if(e!==0)for(var n=0;n<e;n++){var r=t[n];!(r.f&(de|Ht))&&ve(r)&&(Oe(r),r.deps===null&&r.first===null&&r.nodes_start===null&&(r.teardown===null?cr(r):r.fn=null))}}function jo(){if(ue=!1,Xt>1001)return;const t=Ot;Ot=[],kr(t),ue||(Xt=0)}function Re(t){be===mr&&(ue||(ue=!0,queueMicrotask(jo)));for(var e=t;e.parent!==null;){e=e.parent;var n=e.f;if(n&(je|Lt)){if(!(n&G))return;e.f^=G}}Ot.push(e)}function Cr(t,e){var n=t.first,r=[];t:for(;n!==null;){var o=n.f,s=(o&Lt)!==0,l=s&&(o&G)!==0;if(!l&&!(o&Ht))if(o&Jt){s?n.f^=G:ve(n)&&Oe(n);var d=n.first;if(d!==null){n=d;continue}}else o&nr&&r.push(n);var h=n.next;if(h===null){let m=n.parent;for(;m!==null;){if(t===m)break t;var f=m.next;if(f!==null){n=f;continue t}m=m.parent}}n=h}for(var _=0;_<r.length;_++)d=r[_],e.push(d),Cr(d,e)}function Qt(t){var e=be,n=Ot;try{Er();const o=[];be=No,Ot=o,ue=!1,kr(n);var r=t==null?void 0:t();return xo(),(Ot.length>0||o.length>0)&&Qt(),Xt=0,r}finally{be=e,Ot=n}}function x(t){var e=t.f;if(e&de)return t.v;if(H!==null){pt!==null&&pt.includes(t)&&yo();var n=H.deps;z===null&&n!==null&&n[et]===t?et++:z===null?z=[t]:z.push(t),Nt!==null&&M!==null&&M.f&G&&!(M.f&Lt)&&Nt.includes(t)&&(mt(M,St),Re(M))}if(e&Ct){var r=t;ve(r)&&_r(r)}return t.v}function Oo(t){const e=H;try{return H=null,t()}finally{H=e}}const Ro=~(St|fe|G);function mt(t,e){t.f=t.f&Ro|e}function pe(t,e=!1,n){Y={p:Y,c:null,e:null,m:!1,s:t,x:null,l:null},e||(Y.l={s:null,u:null,r1:[],r2:nt(!1)})}function _e(t){const e=Y;if(e!==null){t!==void 0&&(e.x=t);const l=e.e;if(l!==null){var n=M,r=H;e.e=null;try{for(var o=0;o<l.length;o++){var s=l[o];Ae(s.effect),Se(s.reaction),wn(s.fn)}}finally{Ae(n),Se(r)}}Y=e.p,e.m=!0}return t||{}}function st(t,e=null,n){if(typeof t!="object"||t===null||Ut in t)return t;const r=oo(t);if(r!==no&&r!==ro)return t;var o=new Map,s=pn(t),l=nt(0);s&&o.set("length",nt(t.length));var d;return new Proxy(t,{defineProperty(h,f,_){(!("value"in _)||_.configurable===!1||_.enumerable===!1||_.writable===!1)&&mo();var m=o.get(f);return m===void 0?(m=nt(_.value),o.set(f,m)):B(m,st(_.value,d)),!0},deleteProperty(h,f){var _=o.get(f);return _===void 0?f in h&&o.set(f,nt(tt)):(B(_,tt),Vn(l)),!0},get(h,f,_){var b;if(f===Ut)return t;var m=o.get(f),k=f in h;if(m===void 0&&(!k||(b=Rt(h,f))!=null&&b.writable)&&(m=nt(st(k?h[f]:tt,d)),o.set(f,m)),m!==void 0){var g=x(m);return g===tt?void 0:g}return Reflect.get(h,f,_)},getOwnPropertyDescriptor(h,f){var _=Reflect.getOwnPropertyDescriptor(h,f);if(_&&"value"in _){var m=o.get(f);m&&(_.value=x(m))}else if(_===void 0){var k=o.get(f),g=k==null?void 0:k.v;if(k!==void 0&&g!==tt)return{enumerable:!0,configurable:!0,value:g,writable:!0}}return _},has(h,f){var g;if(f===Ut)return!0;var _=o.get(f),m=_!==void 0&&_.v!==tt||Reflect.has(h,f);if(_!==void 0||M!==null&&(!m||(g=Rt(h,f))!=null&&g.writable)){_===void 0&&(_=nt(m?st(h[f],d):tt),o.set(f,_));var k=x(_);if(k===tt)return!1}return m},set(h,f,_,m){var $;var k=o.get(f),g=f in h;if(s&&f==="length")for(var b=_;b<k.v;b+=1){var T=o.get(b+"");T!==void 0?B(T,tt):b in h&&(T=nt(tt),o.set(b+"",T))}k===void 0?(!g||($=Rt(h,f))!=null&&$.writable)&&(k=nt(void 0),B(k,st(_,d)),o.set(f,k)):(g=k.v!==tt,B(k,st(_,d)));var L=Reflect.getOwnPropertyDescriptor(h,f);if(L!=null&&L.set&&L.set.call(m,_),!g){if(s&&typeof f=="string"){var S=o.get("length"),C=Number(f);Number.isInteger(C)&&C>=S.v&&B(S,C+1)}Vn(l)}return!0},ownKeys(h){x(l);var f=Reflect.ownKeys(h).filter(k=>{var g=o.get(k);return g===void 0||g.v!==tt});for(var[_,m]of o)m.v!==tt&&!(_ in h)&&f.push(_);return f},setPrototypeOf(){go()}})}function Vn(t,e=1){B(t,t.v+e)}function De(t){return t!==null&&typeof t=="object"&&Ut in t?t[Ut]:t}function Fo(t,e){return Object.is(De(t),De(e))}var Le,Mt,$r,xr;function rn(){if(Le===void 0){Le=window,Mt=document;var t=Element.prototype,e=Node.prototype;$r=Rt(e,"firstChild").get,xr=Rt(e,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__e=void 0,Text.prototype.__t=void 0}}function me(t=""){return document.createTextNode(t)}function At(t){return $r.call(t)}function $t(t){return xr.call(t)}function lt(t){if(!j)return At(t);var e=At(R);return e===null&&(e=R.appendChild(me())),_t(e),e}function Cn(t,e){if(!j){var n=At(t);return n instanceof Comment&&n.data===""?$t(n):n}return R}function rt(t,e=1,n=!1){let r=j?R:t;for(;e--;)r=$t(r);if(!j)return r;var o=r.nodeType;if(n&&o!==3){var s=me();return r==null||r.before(s),_t(s),s}return _t(r),r}function $n(t){t.textContent=""}let j=!1;function kt(t){j=t}let R;function _t(t){if(t===null)throw vn(),se;return R=t}function Fe(){return _t($t(R))}function J(t){if(j){if($t(R)!==null)throw vn(),se;R=t}}function Ho(t=1){if(j){for(var e=t,n=R;e--;)n=$t(n);R=n}}function on(){for(var t=0,e=R;;){if(e.nodeType===8){var n=e.data;if(n===hn){if(t===0)return e;t-=1}else(n===Qn||n===dn)&&(t+=1)}var r=$t(e);e.remove(),e=r}}const Tr=new Set,sn=new Set;function Io(t,e,n,r){function o(s){if(r.capture||oe.call(e,s),!s.cancelBubble)return n.call(this,s)}return t.startsWith("pointer")||t.startsWith("touch")||t==="wheel"?It(()=>{e.addEventListener(t,o,r)}):e.addEventListener(t,o,r),o}function ht(t,e,n,r,o){var s={capture:r,passive:o},l=Io(t,e,n,s);(e===document.body||e===window||e===document)&&lr(()=>{e.removeEventListener(t,l,s)})}function Nr(t){for(var e=0;e<t.length;e++)Tr.add(t[e]);for(var n of sn)n(t)}function oe(t){var L;var e=this,n=e.ownerDocument,r=t.type,o=((L=t.composedPath)==null?void 0:L.call(t))||[],s=o[0]||t.target,l=0,d=t.__root;if(d){var h=o.indexOf(d);if(h!==-1&&(e===document||e===window)){t.__root=e;return}var f=o.indexOf(e);if(f===-1)return;h<=f&&(l=h)}if(s=o[l]||t.target,s!==e){Ce(t,"currentTarget",{configurable:!0,get(){return s||n}});try{for(var _,m=[];s!==null;){var k=s.assignedSlot||s.parentNode||s.host||null;try{var g=s["__"+r];if(g!==void 0&&!s.disabled)if(pn(g)){var[b,...T]=g;b.apply(s,[t,...T])}else g.call(s,t)}catch(S){_?m.push(S):_=S}if(t.cancelBubble||k===e||k===null)break;s=k}if(_){for(let S of m)queueMicrotask(()=>{throw S});throw _}}finally{t.__root=e,delete t.currentTarget}}}function Po(t){var e=document.createElement("template");return e.innerHTML=t,e.content}function Kt(t,e){var n=M;n.nodes_start===null&&(n.nodes_start=t,n.nodes_end=e)}function gt(t,e){var n=(e&to)!==0,r=(e&eo)!==0,o,s=!t.startsWith("<!>");return()=>{if(j)return Kt(R,null),R;o===void 0&&(o=Po(s?t:"<!>"+t),n||(o=At(o)));var l=r?document.importNode(o,!0):o.cloneNode(!0);if(n){var d=At(l),h=l.lastChild;Kt(d,h)}else Kt(l,l);return l}}function qo(){if(j)return Kt(R,null),R;var t=document.createDocumentFragment(),e=document.createComment(""),n=me();return t.append(e,n),Kt(e,n),t}function at(t,e){if(j){M.nodes_end=R,Fe();return}t!==null&&t.before(e)}const Bo=["touchstart","touchmove"];function Vo(t){return Bo.includes(t)}function Xe(t,e){e!==(t.__t??(t.__t=t.nodeValue))&&(t.__t=e,t.nodeValue=e==null?"":e+"")}function Sr(t,e){const n=e.anchor??e.target.appendChild(me());return Ar(t,{...e,anchor:n})}function Wo(t,e){rn(),e.intro=e.intro??!1;const n=e.target,r=j,o=R;try{for(var s=At(n);s&&(s.nodeType!==8||s.data!==Qn);)s=$t(s);if(!s)throw se;kt(!0),_t(s),Fe();const l=Ar(t,{...e,anchor:s});if(R===null||R.nodeType!==8||R.data!==hn)throw vn(),se;return kt(!1),l}catch(l){if(l===se)return e.recover===!1&&po(),rn(),$n(n),kt(!1),Sr(t,e);throw l}finally{kt(r),_t(o)}}const Wt=new Map;function Ar(t,{target:e,anchor:n,props:r={},events:o,context:s,intro:l=!0}){rn();var d=new Set,h=m=>{for(var k=0;k<m.length;k++){var g=m[k];if(!d.has(g)){d.add(g);var b=Vo(g);e.addEventListener(g,oe,{passive:b});var T=Wt.get(g);T===void 0?(document.addEventListener(g,oe,{passive:b}),Wt.set(g,1)):Wt.set(g,T+1)}}};h(_n(Tr)),sn.add(h);var f=void 0,_=yn(()=>(ae(()=>{if(s){pe({});var m=Y;m.c=s}o&&(r.$$events=o),j&&Kt(n,null),f=t(n,r)||{},j&&(M.nodes_end=R),s&&_e()}),()=>{for(var m of d){e.removeEventListener(m,oe);var k=Wt.get(m);--k===0?(document.removeEventListener(m,oe),Wt.delete(m)):Wt.set(m,k)}sn.delete(h),ln.delete(f)}));return ln.set(f,_),f}let ln=new WeakMap;function Yo(t){const e=ln.get(t);e&&e()}function Me(t,e,n,r=null,o=!1){j&&Fe();var s=t,l=null,d=null,h=null,f=o?mn:0;ar(()=>{if(h===(h=!!e()))return;let _=!1;if(j){const m=s.data===dn;h===m&&(s=on(),_t(s),kt(!1),_=!0)}h?(l?xe(l):l=ae(()=>n(s)),d&&Qe(d,()=>{d=null})):(d?xe(d):r&&(d=ae(()=>r(s))),l&&Qe(l,()=>{l=null})),_&&kt(!0)},f),j&&(s=R)}let Ke=null;function Uo(t,e){return e}function zo(t,e,n,r){for(var o=[],s=e.length,l=0;l<s;l++)bn(e[l].e,o,!0);var d=s>0&&o.length===0&&n!==null;if(d){var h=n.parentNode;$n(h),h.append(n),r.clear(),Tt(t,e[0].prev,e[s-1].next)}fr(o,()=>{for(var f=0;f<s;f++){var _=e[f];d||(r.delete(_.k),Tt(t,_.prev,_.next)),Zt(_.e,!d)}})}function xn(t,e,n,r,o,s=null){var l=t,d={flags:e,items:new Map,first:null},h=(e&Zn)!==0;if(h){var f=t;l=j?_t(At(f)):f.appendChild(me())}j&&Fe();var _=null;ar(()=>{var m=n(),k=pn(m)?m:m==null?[]:_n(m),g=k.length;let b=!1;if(j){var T=l.data===dn;T!==(g===0)&&(l=on(),_t(l),kt(!1),b=!0)}if(j){for(var L=null,S,C=0;C<g;C++){if(R.nodeType===8&&R.data===hn){l=R,b=!0,kt(!1);break}var $=k[C],A=r($,C);S=Dr(R,d,L,null,$,A,C,o,e),d.items.set(A,S),L=S}g>0&&_t(on())}j||Xo(k,d,l,o,e,r),s!==null&&(g===0?_?xe(_):_=ae(()=>s(l)):_!==null&&Qe(_,()=>{_=null})),b&&kt(!0)}),j&&(l=R)}function Xo(t,e,n,r,o,s){var U,yt,ut,te;var l=(o&Gr)!==0,d=(o&(cn|fn))!==0,h=t.length,f=e.items,_=e.first,m=_,k,g=null,b,T=[],L=[],S,C,$,A;if(l)for(A=0;A<h;A+=1)S=t[A],C=s(S,A),$=f.get(C),$!==void 0&&((U=$.a)==null||U.measure(),(b??(b=new Set)).add($));for(A=0;A<h;A+=1){if(S=t[A],C=s(S,A),$=f.get(C),$===void 0){var xt=m?m.e.nodes_start:n;g=Dr(xt,e,g,g===null?e.first:g.next,S,C,A,r,o),f.set(C,g),T=[],L=[],m=g.next;continue}if(d&&Ko($,S,A,o),$.e.f&Ht&&(xe($.e),l&&((yt=$.a)==null||yt.unfix(),(b??(b=new Set)).delete($))),$!==m){if(k!==void 0&&k.has($)){if(T.length<L.length){var Z=L[0],N;g=Z.prev;var I=T[0],P=T[T.length-1];for(N=0;N<T.length;N+=1)Wn(T[N],Z,n);for(N=0;N<L.length;N+=1)k.delete(L[N]);Tt(e,I.prev,P.next),Tt(e,g,I),Tt(e,P,Z),m=Z,g=P,A-=1,T=[],L=[]}else k.delete($),Wn($,m,n),Tt(e,$.prev,$.next),Tt(e,$,g===null?e.first:g.next),Tt(e,g,$),g=$;continue}for(T=[],L=[];m!==null&&m.k!==C;)(k??(k=new Set)).add(m),L.push(m),m=m.next;if(m===null)continue;$=m}T.push($),g=$,m=$.next}if(m!==null||k!==void 0){for(var F=k===void 0?[]:_n(k);m!==null;)F.push(m),m=m.next;var O=F.length;if(O>0){var X=o&Zn&&h===0?n:null;if(l){for(A=0;A<O;A+=1)(ut=F[A].a)==null||ut.measure();for(A=0;A<O;A+=1)(te=F[A].a)==null||te.fix()}zo(e,F,X,f)}}l&&It(()=>{var ee;if(b!==void 0)for($ of b)(ee=$.a)==null||ee.apply()}),M.first=e.first&&e.first.e,M.last=g&&g.e}function Ko(t,e,n,r){r&cn&&B(t.v,e),r&fn?B(t.i,n):t.i=n}function Dr(t,e,n,r,o,s,l,d,h){var f=Ke;try{var _=(h&cn)!==0,m=(h&Zr)===0,k=_?m?gn(o):nt(o):o,g=h&fn?nt(l):l,b={i:g,v:k,k:s,a:null,e:null,prev:n,next:r};return Ke=b,b.e=ae(()=>d(t,k,g),j),b.e.prev=n&&n.e,b.e.next=r&&r.e,n===null?e.first=b:(n.next=b,n.e.next=b.e),r!==null&&(r.prev=b,r.e.prev=b.e),b}finally{Ke=f}}function Wn(t,e,n){for(var r=t.next?t.next.e.nodes_start:n,o=e?e.e.nodes_start:n,s=t.e.nodes_start;s!==r;){var l=$t(s);o.before(s),s=l}}function Tt(t,e,n){e===null?t.first=n:(e.next=n,e.e.next=n&&n.e),n!==null&&(n.prev=e,n.e.prev=e&&e.e)}function Tn(t,e){It(()=>{var n=t.getRootNode(),r=n.host?n:n.head??n.ownerDocument.head;if(!r.querySelector("#"+e.hash)){const o=document.createElement("style");o.id=e.hash,o.textContent=e.code,r.appendChild(o)}})}function Jo(t,e){{const n=document.body;t.autofocus=!0,It(()=>{document.activeElement===n&&t.focus()})}}function Go(t){j&&At(t)!==null&&$n(t)}let Yn=!1;function Lr(){Yn||(Yn=!0,document.addEventListener("reset",t=>{Promise.resolve().then(()=>{var e;if(!t.defaultPrevented)for(const n of t.target.elements)(e=n.__on_r)==null||e.call(n)})},{capture:!0}))}function Zo(t){if(j){var e=!1,n=()=>{if(!e){if(e=!0,t.hasAttribute("value")){var r=t.value;it(t,"value",null),t.value=r}if(t.hasAttribute("checked")){var o=t.checked;it(t,"checked",null),t.checked=o}}};t.__on_r=n,$o(n),Lr()}}function Qo(t,e){var n=t.__attributes??(t.__attributes={});n.value!==(n.value=e)&&(t.value=e)}function it(t,e,n,r){n=n==null?null:n+"";var o=t.__attributes??(t.__attributes={});j&&(o[e]=t.getAttribute(e),e==="src"||e==="srcset"||e==="href"&&t.nodeName==="LINK")||o[e]!==(o[e]=n)&&(e==="loading"&&(t[lo]=n),n===null?t.removeAttribute(e):t.setAttribute(e,n))}function le(t,e,n){if(n){if(t.classList.contains(e))return;t.classList.add(e)}else{if(!t.classList.contains(e))return;t.classList.remove(e)}}function Mr(t,e,n,r=n){t.addEventListener(e,n);const o=t.__on_r;o?t.__on_r=()=>{o(),r()}:t.__on_r=r,Lr()}function ti(t,e,n=e){Mr(t,"input",()=>{n(zn(t)?Xn(t.value):t.value)}),he(()=>{var r=e();if(j&&t.defaultValue!==t.value){n(t.value);return}zn(t)&&r===Xn(t.value)||t.type==="date"&&!r&&!t.value||(t.value=r??"")})}const Je=new Set;function ei(t,e,n,r,o=r){var s=n.getAttribute("type")==="checkbox",l=t;let d=!1;if(e!==null)for(var h of e)l=l[h]??(l[h]=[]);l.push(n),Mr(n,"change",()=>{var f=n.__value;s&&(f=Un(l,f,n.checked)),o(f)},()=>o(s?[]:null)),he(()=>{var f=r();if(j&&n.defaultChecked!==n.checked){d=!0;return}s?(f=f||[],n.checked=De(f).includes(De(n.__value))):n.checked=Fo(n.__value,f)}),lr(()=>{var f=l.indexOf(n);f!==-1&&l.splice(f,1)}),Je.has(l)||(Je.add(l),It(()=>{l.sort((f,_)=>f.compareDocumentPosition(_)===4?-1:1),Je.delete(l)})),It(()=>{if(d){var f;if(s)f=Un(l,f,n.checked);else{var _=l.find(m=>m.checked);f=_==null?void 0:_.__value}o(f)}})}function Un(t,e,n){for(var r=new Set,o=0;o<t.length;o+=1)t[o].checked&&r.add(t[o].__value);return n||r.delete(e),Array.from(r)}function zn(t){var e=t.type;return e==="number"||e==="range"}function Xn(t){return t===""?null:+t}function Kn(t,e){return t===e||(t==null?void 0:t[Ut])===e}function an(t={},e,n,r){return wn(()=>{var o,s;return he(()=>{o=s,s=[],Oo(()=>{t!==n(...s)&&(e(t,...s),o&&Kn(n(...o),t)&&e(null,...o))})}),()=>{It(()=>{s&&Kn(n(...s),t)&&e(null,...s)})}}),t}function He(t,e,n,r){var L;var o=(n&Qr)!==0,s=t[e],l=(L=Rt(t,e))==null?void 0:L.set,d=r,h=!0,f=!1,_=()=>(f=!0,h&&(h=!1,d=r),d);s===void 0&&r!==void 0&&(l&&o&&_o(),s=_(),l&&l(s));var m;if(m=()=>{var S=t[e];return S===void 0?_():(h=!0,f=!1,S)},l){var k=t.$$legacy;return function(S,C){return arguments.length>0?((!C||k)&&l(C?m():S),S):m()}}var g=!1,b=gn(s),T=En(()=>{var S=m(),C=x(b);return g?(g=!1,C):b.v=S});return function(S,C){var $=x(T);if(arguments.length>0){const A=C?x(T):S;return T.equals(A)||(g=!0,B(b,A),f&&d!==void 0&&(d=A),x(T)),S}return $}}function ni(t){return new ri(t)}var bt,ot;class ri{constructor(e){Ue(this,bt);Ue(this,ot);var s;var n=new Map,r=(l,d)=>{var h=gn(d);return n.set(l,h),h};const o=new Proxy({...e.props||{},$$events:{}},{get(l,d){return x(n.get(d)??r(d,Reflect.get(l,d)))},has(l,d){return x(n.get(d)??r(d,Reflect.get(l,d))),Reflect.has(l,d)},set(l,d,h){return B(n.get(d)??r(d,h),h),Reflect.set(l,d,h)}});ze(this,ot,(e.hydrate?Wo:Sr)(e.component,{target:e.target,props:o,context:e.context,intro:e.intro??!1,recover:e.recover})),(!((s=e==null?void 0:e.props)!=null&&s.$$host)||e.sync===!1)&&Qt(),ze(this,bt,o.$$events);for(const l of Object.keys(K(this,ot)))l==="$set"||l==="$destroy"||l==="$on"||Ce(this,l,{get(){return K(this,ot)[l]},set(d){K(this,ot)[l]=d},enumerable:!0});K(this,ot).$set=l=>{Object.assign(o,l)},K(this,ot).$destroy=()=>{Yo(K(this,ot))}}$set(e){K(this,ot).$set(e)}$on(e,n){K(this,bt)[e]=K(this,bt)[e]||[];const r=(...o)=>n.call(this,...o);return K(this,bt)[e].push(r),()=>{K(this,bt)[e]=K(this,bt)[e].filter(o=>o!==r)}}$destroy(){K(this,ot).$destroy()}}bt=new WeakMap,ot=new WeakMap;let jr;typeof HTMLElement=="function"&&(jr=class extends HTMLElement{constructor(e,n,r){super();ct(this,"$$ctor");ct(this,"$$s");ct(this,"$$c");ct(this,"$$cn",!1);ct(this,"$$d",{});ct(this,"$$r",!1);ct(this,"$$p_d",{});ct(this,"$$l",{});ct(this,"$$l_u",new Map);ct(this,"$$me");this.$$ctor=e,this.$$s=n,r&&this.attachShadow({mode:"open"})}addEventListener(e,n,r){if(this.$$l[e]=this.$$l[e]||[],this.$$l[e].push(n),this.$$c){const o=this.$$c.$on(e,n);this.$$l_u.set(n,o)}super.addEventListener(e,n,r)}removeEventListener(e,n,r){if(super.removeEventListener(e,n,r),this.$$c){const o=this.$$l_u.get(n);o&&(o(),this.$$l_u.delete(n))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){let e=function(o){return s=>{const l=document.createElement("slot");o!=="default"&&(l.name=o),at(s,l)}};if(await Promise.resolve(),!this.$$cn||this.$$c)return;const n={},r=oi(this);for(const o of this.$$s)o in r&&(o==="default"&&!this.$$d.children?(this.$$d.children=e(o),n.default=!0):n[o]=e(o));for(const o of this.attributes){const s=this.$$g_p(o.name);s in this.$$d||(this.$$d[s]=Ee(s,o.value,this.$$p_d,"toProp"))}for(const o in this.$$p_d)!(o in this.$$d)&&this[o]!==void 0&&(this.$$d[o]=this[o],delete this[o]);this.$$c=ni({component:this.$$ctor,target:this.shadowRoot||this,props:{...this.$$d,$$slots:n,$$host:this}}),this.$$me=yn(()=>{he(()=>{var o;this.$$r=!0;for(const s of ke(this.$$c)){if(!((o=this.$$p_d[s])!=null&&o.reflect))continue;this.$$d[s]=this.$$c[s];const l=Ee(s,this.$$d[s],this.$$p_d,"toAttribute");l==null?this.removeAttribute(this.$$p_d[s].attribute||s):this.setAttribute(this.$$p_d[s].attribute||s,l)}this.$$r=!1})});for(const o in this.$$l)for(const s of this.$$l[o]){const l=this.$$c.$on(o,s);this.$$l_u.set(s,l)}this.$$l={}}}attributeChangedCallback(e,n,r){var o;this.$$r||(e=this.$$g_p(e),this.$$d[e]=Ee(e,r,this.$$p_d,"toProp"),(o=this.$$c)==null||o.$set({[e]:this.$$d[e]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then(()=>{!this.$$cn&&this.$$c&&(this.$$c.$destroy(),this.$$me(),this.$$c=void 0)})}$$g_p(e){return ke(this.$$p_d).find(n=>this.$$p_d[n].attribute===e||!this.$$p_d[n].attribute&&n.toLowerCase()===e)||e}});function Ee(t,e,n,r){var s;const o=(s=n[t])==null?void 0:s.type;if(e=o==="Boolean"&&typeof e!="boolean"?e!=null:e,!r||!n[t])return e;if(r==="toAttribute")switch(o){case"Object":case"Array":return e==null?null:JSON.stringify(e);case"Boolean":return e?"":null;case"Number":return e??null;default:return e}else switch(o){case"Object":case"Array":return e&&JSON.parse(e);case"Boolean":return e;case"Number":return e!=null?+e:e;default:return e}}function oi(t){const e={};return t.childNodes.forEach(n=>{e[n.slot||"default"]=!0}),e}function Ie(t,e,n,r,o,s){let l=class extends jr{constructor(){super(t,n,o),this.$$p_d=e}static get observedAttributes(){return ke(e).map(d=>(e[d].attribute||d).toLowerCase())}};return ke(e).forEach(d=>{Ce(l.prototype,d,{get(){return this.$$c&&d in this.$$c?this.$$c[d]:this.$$d[d]},set(h){var m;h=Ee(d,h,e),this.$$d[d]=h;var f=this.$$c;if(f){var _=(m=Rt(f,d))==null?void 0:m.get;_?f[d]=h:f.$set({[d]:h})}}})}),r.forEach(d=>{Ce(l.prototype,d,{get(){var h;return(h=this.$$c)==null?void 0:h[d]}})}),t.element=l,l}const Dt=new Map([["yellow","#F8B920"],["red","#FF4646"],["blue","#0064FF"],["green","#00C564"]]),ii=["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","OPTION"];function Or(t){const e=document.documentElement.lang||void 0,n=t.map(d=>d.trim().toLocaleLowerCase(e)),r=n.map(()=>({start:null,end:null,shift:0})),o=n.map(()=>[]),s=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,d=>{var h,f;return ii.includes((h=d.parentNode)==null?void 0:h.tagName)||((f=d.parentNode)==null?void 0:f.contentEditable)=="true"?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let l;for(;l=s.nextNode();)if(l!=null&&l.nodeValue)for(let d=0;d<l.nodeValue.length;d++){const h=l.nodeValue[d].toLocaleLowerCase(e).trim();h&&n.forEach((f,_)=>{var k,g;for(;f[r[_].shift]&&!f[r[_].shift].trim();)r[_].shift++;let m=f[r[_].shift]===h;if(!m&&r[_].shift&&(r[_].shift=0,m=f[r[_].shift]===h),m&&(r[_].shift||(r[_].start=[l,d]),r[_].end=[l,d],r[_].shift++),r[_].shift>=f.length){const b=document.createRange();b.setStart(r[_].start[0],r[_].start[1]),b.setEnd(r[_].end[0],r[_].end[1]+1),!b.collapsed&&(!((k=b.commonAncestorContainer.parentElement)!=null&&k.checkVisibility)||(g=b.commonAncestorContainer.parentElement)!=null&&g.checkVisibility())?o[_].push(b):b.detach(),m=!1}m||(r[_].shift=0,r[_].start=null,r[_].end=null)})}return o}const Ft=`rh-${new Date().getTime()}-`,Pe="highlights"in CSS;function si(t){if(!t.length&&!CSS.highlights.size)return;const e=[];if(CSS.highlights.clear(),t.length){const r=Or(t.map(({text:o})=>o||""));for(const o in t){if(!r[o].length)continue;const{_id:s,color:l,note:d}=t[o],h=`${Ft}${s}`;CSS.highlights.set(h,new Highlight(...r[o]));const f=r[o][0].getBoundingClientRect();e.push(`
                ::highlight(${h}) {
                    all: unset;
                    background-color: color-mix(in srgb, ${Dt.get(l)||l||"yellow"}, white 60%) !important;
                    color: color-mix(in srgb, ${Dt.get(l)||l||"yellow"}, black 80%) !important;
                    ${d?"text-decoration: underline wavy; -webkit-text-decoration: underline wavy;":""}
                    text-decoration-thickness: from-font;
                }

                /* fuck you dark reader */
                html[data-darkreader-scheme="dark"] ::highlight(${h}) {
                    color: CanvasText !important;
                }

                :root {
                    --highlight-${s}-top: ${(100/document.documentElement.scrollHeight*(window.scrollY+f.top-10)).toFixed(2)}%;
                }
            `);for(const _ of r[o])_.detach()}}const n=(()=>{let r=document.getElementById(Ft);return r||(r=document.createElement("style"),r.id=Ft,document.head.appendChild(r)),r})();n.innerHTML=e.join(`
`)}function li(){var t;(t=document.getElementById(Ft))==null||t.remove()}function ai(t){var e;for(const[n,r]of CSS.highlights){const o=n.replace(Ft,"");if(t==o)for(const s of r){(e=s.startContainer.parentElement)==null||e.scrollIntoView({behavior:"smooth",block:"start"});break}}}function ui(t){let e;for(const[n,r]of CSS.highlights)for(const o of r){const s=t.compareBoundaryPoints(Range.START_TO_START,o),l=t.compareBoundaryPoints(Range.END_TO_END,o);(s==0&&l==0||t!=null&&t.collapsed&&s>=0&&l<=0)&&(e=[n.replace(Ft,""),o])}if(e)return e[0].replace(Ft,"")}const Et=`rh-${new Date().getTime()}`;function ci(t){const e=document.body.querySelectorAll(`.${Et}`);if(!t.length&&!e.length)return;e.forEach(s=>s.outerHTML=s.innerText);const n=[],r=Or(t.map(({text:s})=>s||""));for(const s in t){const{_id:l,color:d}=t[s];for(const h of r[s]){const f=document.createElement("mark");f.className=Et,f.setAttribute("data-id",String(l)),f.append(h.extractContents()),h.insertNode(f),h.detach()}n.push(`
            .${Et}[data-id="${l}"] {
                all: unset;
                display: inline-block !important;
                background-color: white !important;
                background-image: linear-gradient(to bottom, ${Jn(Dt.get(d)||d,.4)} 0, ${Jn(Dt.get(d)||d,.4)} 100%) !important;
                color: black !important;
            }
        `)}const o=(()=>{let s=document.getElementById(Et);return s||(s=document.createElement("style"),s.id=Et,document.head.appendChild(s)),s})();o.innerHTML=n.join(`
`)}function fi(){var t;document.body.querySelectorAll(`.${Et}`).forEach(e=>e.outerHTML=e.innerText),(t=document.getElementById(Et))==null||t.remove()}function di(t){const e=document.body.querySelector(`.${Et}[data-id="${t}"]`);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}function hi(t){const e=t.commonAncestorContainer.nodeType==Node.ELEMENT_NODE?t.commonAncestorContainer:t.commonAncestorContainer.parentElement;if((e==null?void 0:e.className)==Et){if(!t.collapsed){const n=new Range;n.selectNodeContents(t.commonAncestorContainer);const r=t.compareBoundaryPoints(Range.START_TO_START,n),o=t.compareBoundaryPoints(Range.END_TO_END,n);if(n.detach(),r!=0||o!=0)return}return e.getAttribute("data-id")||void 0}}function Jn(t,e){if(!t)return t;const n=parseInt(t.slice(1,3),16),r=parseInt(t.slice(3,5),16),o=parseInt(t.slice(5,7),16);return`rgba(${n}, ${r}, ${o}, ${e})`}function vi(t){return Pe?si(t):ci(t)}function Ge(t){return vi(t)}function pi(){return Pe?li():fi()}function Rr(t){return Pe?ai(t):di(t)}function Fr(){var n,r,o;const t=document.getSelection();if(!(t!=null&&t.rangeCount))return;const e=t.getRangeAt(0);if(!((o=((n=e==null?void 0:e.commonAncestorContainer)==null?void 0:n.nodeType)==1?e==null?void 0:e.commonAncestorContainer:(r=e==null?void 0:e.commonAncestorContainer)==null?void 0:r.parentElement)!=null&&o.closest('[contenteditable=""], [contenteditable=true]')))return e}function ie(){const t=document.getSelection();t!=null&&t.rangeCount&&t.removeAllRanges()}function _i(t){return Pe?ui(t):hi(t)}function Gn(t){if(!t)return"";var e=document.createElement("div");e.appendChild(t.cloneContents().cloneNode(!0)),document.body.appendChild(e);const n=e.innerText;return document.body.removeChild(e),e=void 0,n}function mi(t,e,n){let r=jt(st([])),o=jt(!1),s=jt(!1),l=jt(void 0);function d(g){const b=_i(g);if(b)return x(r).find(L=>L._id==b);if(Gn(g).trim())return{text:Gn(g).trim()}}function h(g){const b={...typeof g._id=="string"?{_id:g._id}:{},...typeof g.text=="string"?{text:g.text}:{},...typeof g.note=="string"?{note:g.note}:{},color:g.color||"yellow"};if(!b.text)return;const T=x(r).findIndex(L=>{var S,C;return L._id==b._id||((S=L.text)==null?void 0:S.toLocaleLowerCase().trim())===((C=b.text)==null?void 0:C.toLocaleLowerCase().trim())});T!=-1?(x(r)[T]=b,e(b)):(x(r).push(b),t(b))}function f({_id:g}){B(r,st(x(r).filter(b=>b._id!=g))),n({_id:g})}function _(g){B(l,st(JSON.parse(JSON.stringify(g))))}function m(){x(l)&&(h(x(l)),B(l,void 0))}function k(){B(l,void 0)}return{get highlights(){return x(r)},set highlights(g){B(r,st(g))},get pro(){return x(o)},set pro(g){B(o,st(g))},get nav(){return x(s)},set nav(g){B(s,st(g))},get draft(){return x(l)},find:d,upsert:h,remove:f,setDraft:_,draftSubmit:m,draftCancel:k}}const gi="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(gi);function yi(t,e){let n=null,r=!0;return function(...s){n||(r?(t(...s),r=!1):(clearTimeout(n),n=setTimeout(()=>{t(...s),clearTimeout(n),n=null},e)))}}function un(){var t;return(t=navigator==null?void 0:navigator.userAgentData)!=null&&t.mobile?!0:/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)}var wi=gt('<button type="submit" class="svelte-f9ok5r"><span class="color svelte-f9ok5r"></span></button>'),bi=gt('<button type="submit" value="remove" title="Delete highlight" aria-label="Delete highlight" class="svelte-f9ok5r"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-f9ok5r"><g class="svelte-f9ok5r"><line x1="2.75" y1="4.25" x2="15.25" y2="4.25" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-f9ok5r"></line><path d="M6.75,4.25v-1.5c0-.552,.448-1,1-1h2.5c.552,0,1,.448,1,1v1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-f9ok5r"></path><path d="M13.5,6.75l-.4,7.605c-.056,1.062-.934,1.895-1.997,1.895H6.898c-1.064,0-1.941-.833-1.997-1.895l-.4-7.605" fill="none" stroke-linecap="round" stroke-linejoin="round" class="svelte-f9ok5r"></path></g></svg></button>'),Ei=gt('<dialog class="svelte-f9ok5r"><form method="dialog" class="svelte-f9ok5r"><!> <button type="submit" value="note" title="Add note" aria-label="Add note" class="svelte-f9ok5r"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="svelte-f9ok5r"><g class="svelte-f9ok5r"><path stroke-linecap="round" stroke-linejoin="round" d="M9,1.75C4.996,1.75,1.75,4.996,1.75,9c0,1.319,.358,2.552,.973,3.617,.43,.806-.053,2.712-.973,3.633,1.25,.068,2.897-.497,3.633-.973,.489,.282,1.264,.656,2.279,.848,.433,.082,.881,.125,1.338,.125,4.004,0,7.25-3.246,7.25-7.25S13.004,1.75,9,1.75Z" class="svelte-f9ok5r"></path><path stroke-width="0" d="M9,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-f9ok5r"></path><path stroke-width="0" d="M5.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-f9ok5r"></path><path stroke-width="0" d="M12.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" class="svelte-f9ok5r"></path></g></svg></button> <!></form></dialog>');const ki={hash:"svelte-f9ok5r",code:`
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
`};function Hr(t,e){pe(e,!0),Tn(t,ki);let n=He(e,"store",7),r,o=jt(void 0),s=jt(!1);function l(N){if(!x(o))return;const I=N.currentTarget.returnValue;switch(N.currentTarget.returnValue="",I){case"add":n().upsert(x(o)),ie();break;case"note":n().setDraft(x(o)),ie();break;case"remove":n().remove(x(o)),ie();break;default:if(Dt.has(I)){n().upsert({...x(o),color:I}),ie();return}break}}function d(){B(s,!0)}function h(){B(s,!1),setTimeout(f)}function f(){if(x(s)){r==null||r.close();return}requestAnimationFrame(()=>{const N=Fr(),I=N&&n().find(N);if(!N||!(I!=null&&I._id)&&!N.toString().trim()){r==null||r.close();return}B(o,st(I)),r.inert=!0,r==null||r.show(),r.inert=!1;const P=256,F=10,O=N.getBoundingClientRect(),X=Math.min(Math.max(O.x,F)+window.scrollX,window.innerWidth+window.scrollX-P-F),U=Math.min(window.innerWidth-Math.max(O.x,F)-window.scrollX-O.width,window.innerWidth-window.scrollX-P-F),yt=Math.max(O.y,40)+window.scrollY+O.height+4;window.innerHeight-Math.max(O.y,40)-window.scrollY+4;const ut=X<window.innerWidth/2+window.scrollX;r==null||r.style.setProperty("left",ut?`${X}px`:"unset"),r==null||r.style.setProperty("right",ut?"unset":`${U}px`),r==null||r.style.setProperty("top",`${yt}px`),r==null||r.style.setProperty("bottom","unset")})}const _=yi(f,200);var m=Ei();ht("mousedown",Mt,d),ht("touchstart",Mt,d,void 0,!0),ht("mouseup",Mt,h),ht("touchend",Mt,h),ht("touchcancel",Mt,h),ht("selectionchange",Mt,_),an(m,N=>r=N,()=>r);const k=En(un);vt(()=>le(m,"mobile",x(k)));var g=lt(m),b=lt(g);xn(b,17,()=>Dt,([N,I])=>N,(N,I)=>{let P=()=>x(I)[0],F=()=>x(I)[1];var O=wi(),X=lt(O);J(O),vt(()=>{var U;it(O,"aria-label",P()),Qo(O,P()),it(X,"style",`--color: ${F()??""}`),le(X,"active",P()==((U=x(o))==null?void 0:U.color))}),at(N,O)});var T=rt(b,2),L=lt(T),S=lt(L),C=lt(S),$=rt(C),A=rt($),xt=rt(A);J(S),J(L),J(T);var Z=rt(T,2);return Me(Z,()=>{var N;return(N=x(o))==null?void 0:N._id},N=>{var I=bi();at(N,I)}),J(g),J(m),vt(()=>{var N,I,P,F,O,X;le(m,"new",!((N=x(o))!=null&&N._id)),it(C,"fill",(I=x(o))!=null&&I.note?"currentColor":"none"),it(C,"stroke-width",(P=x(o))!=null&&P.note?"0":void 0),it($,"fill",(F=x(o))!=null&&F.note?"none":"currentColor"),it(A,"fill",(O=x(o))!=null&&O.note?"none":"currentColor"),it(xt,"fill",(X=x(o))!=null&&X.note?"none":"currentColor")}),ht("close",m,l),at(t,m),_e({get store(){return n()},set store(N){n(N),Qt()}})}Ie(Hr,{store:{}},[],[],!0);function Ci(t){const e=t.currentTarget.getBoundingClientRect();e.top<=t.clientY&&t.clientY<=e.top+e.height&&e.left<=t.clientX&&t.clientX<=e.left+e.width||(t.preventDefault(),t.currentTarget.close())}var $i=(t,e)=>B(e,!1),xi=gt('<input type="radio" name="color" class="svelte-n7j6yt">'),Ti=gt('<div class="unlock svelte-n7j6yt"><a href="https://raindrop.io/pro/buy" target="_blank" class="svelte-n7j6yt">Upgrade to Pro</a> to unlock annotation</div>'),Ni=gt('<blockquote role="presentation" class="svelte-n7j6yt"> </blockquote> <fieldset class="color svelte-n7j6yt"></fieldset> <textarea class="note svelte-n7j6yt" rows="4" maxlength="5000" placeholder="Notes (optional)"></textarea> <!>',1),Si=gt('<dialog role="presentation" class="svelte-n7j6yt"><header class="svelte-n7j6yt"> </header> <form method="dialog" class="svelte-n7j6yt"><!> <footer class="svelte-n7j6yt"><button formnovalidate="" class="svelte-n7j6yt">Cancel <sup class="svelte-n7j6yt">esc</sup></button> <button type="submit" value="OK" class="svelte-n7j6yt"> <sup class="svelte-n7j6yt">&crarr;</sup></button></footer></form></dialog>');const Ai={hash:"svelte-n7j6yt",code:`
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
`};function Ir(t,e){pe(e,!0),Tn(t,Ai);const n=[];let r=He(e,"store",7),o,s,l=jt(!0);Ze(()=>{r().draft?(B(l,!0),o==null||o.showModal()):o==null||o.close()});function d(C){const $=C.currentTarget.returnValue;C.currentTarget.returnValue="",setTimeout($?r().draftSubmit:r().draftCancel,200)}function h(C){var $;un()||(C.stopImmediatePropagation(),C.stopPropagation(),C.key=="Enter"&&!C.shiftKey&&(C.preventDefault(),s&&(($=C.currentTarget.closest("form"))==null||$.requestSubmit(s))))}var f=Si();an(f,C=>o=C,()=>o),f.__mousedown=[Ci];const _=En(un);vt(()=>le(f,"mobile",x(_)));var m=lt(f),k=lt(m);J(m);var g=rt(m,2),b=lt(g);Me(b,()=>r().draft,C=>{var $=Ni(),A=Cn($);A.__click=[$i,l];var xt=lt(A);vt(()=>{var P,F;return Xe(xt,((F=(P=r().draft)==null?void 0:P.text)==null?void 0:F.trim())||"")}),J(A);var Z=rt(A,2);xn(Z,21,()=>Dt,Uo,(P,F)=>{let O=()=>x(F)[0],X=()=>x(F)[1];var U=xi();Zo(U);var yt;vt(()=>{yt!==(yt=O())&&(U.value=(U.__value=O())==null?"":O()),it(U,"style",`--color: ${X()??""}`)}),ei(n,[],U,()=>(O(),r().draft.color),ut=>r().draft.color=ut),at(P,U)}),J(Z);var N=rt(Z,2);Go(N),Jo(N),N.__keydown=h;var I=rt(N,2);Me(I,()=>!r().pro,P=>{var F=Ti();at(P,F)}),vt(()=>{le(A,"compact",x(l)),N.disabled=!r().pro}),ti(N,()=>r().draft.note,P=>r().draft.note=P),at(C,$)});var T=rt(b,2),L=rt(lt(T),2);an(L,C=>s=C,()=>s);var S=lt(L);return Ho(),J(L),J(T),J(g),J(f),vt(()=>{var C,$;Xe(k,`${((C=r().draft)!=null&&C._id?"Edit":"New")??""} highlight`),Xe(S,`${(($=r().draft)!=null&&$._id?"Update":"Create")??""} `)}),ht("close",f,d),at(t,f),_e({get store(){return r()},set store(C){r(C),Qt()}})}Nr(["mousedown","click","keydown"]);Ie(Ir,{store:{}},[],[],!0);const Di=t=>{const e=t.target.getAttribute("data-highlight");e&&(t.preventDefault(),Rr(e))};var Li=gt('<div class="svelte-rwfy02"></div>'),Mi=gt('<nav role="presentation" class="svelte-rwfy02"></nav>');const ji={hash:"svelte-rwfy02",code:`
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
`};function Pr(t,e){pe(e,!0),Tn(t,ji);let n=He(e,"store",7);var r=qo(),o=Cn(r);return Me(o,()=>n().nav,s=>{var l=Mi();l.__click=[Di],xn(l,21,()=>n().highlights,d=>d._id,(d,h)=>{var f=Li();vt(()=>it(f,"style",`top: var(--highlight-${x(h)._id??""}-top); --color: ${(Dt.get(x(h).color)||x(h).color)??""}`)),vt(()=>it(f,"data-highlight",x(h)._id)),at(d,f)}),J(l),at(s,l)}),at(t,r),_e({get store(){return n()},set store(s){n(s),Qt()}})}Nr(["click"]);Ie(Pr,{store:{}},[],[],!0);var Oi=gt("<!> <!> <!>",1);function Ri(t,e){pe(e,!0);let n=He(e,"store",7);Ze(()=>{Ge(n().highlights)});let r;function o(){Ge(n().highlights),clearTimeout(r),r=setTimeout(()=>Ge(n().highlights),3e3)}yn(()=>{document.readyState&&o()}),Ze(()=>pi);var s=Oi();ht("load",Le,o),ht("popstate",Le,o);var l=Cn(s);Hr(l,{get store(){return n()}});var d=rt(l,2);Ir(d,{get store(){return n()}});var h=rt(d,2);return Pr(h,{get store(){return n()}}),at(t,s),_e({get store(){return n()},set store(f){n(f),Qt()}})}customElements.define("rdh-ui",Ie(Ri,{store:{}},[],[],!0));function Fi(t){if(typeof chrome=="object"&&chrome.runtime&&chrome.runtime.onMessage||typeof browser=="object"&&browser.runtime&&browser.runtime.onMessage){const{runtime:e}=typeof browser=="object"?browser:chrome,n=(r,o)=>{o.id==e.id&&typeof r.type=="string"&&t(r)};return e.onMessage.removeListener(n),e.onMessage.addListener(n),r=>e.sendMessage(null,r)}if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.rdh)return window.rdhSend=t,e=>window.webkit.messageHandlers.rdh.postMessage(e);if(typeof window<"u"&&typeof window.process=="object"&&window.process.type==="renderer"||typeof process<"u"&&typeof process.versions=="object"&&process.versions.electron){const{ipcRenderer:e}=require("electron"),n=(r,o)=>t(o);return e.removeListener("RDH",n),e.on("RDH",n),r=>e.sendToHost("RDH",r)}if("ReactNativeWebView"in window)return window.ReactNativeWebViewSendMessage=t,e=>window.ReactNativeWebView.postMessage(JSON.stringify(e));if(window.self!==window.top){const e=({data:n,source:r})=>{r!==window.parent||typeof n!="object"||typeof n.type!="string"||t(n)};return window.removeEventListener("message",e),window.addEventListener("message",e),n=>window.parent.postMessage(n,"*")}throw new Error("unsupported platform")}async function Hi(t){let e=!1;const n=new Set,r=Fi(o=>{if(!e){n.add(o);return}t(o)});await new Promise(o=>{function s(){window.removeEventListener("DOMContentLoaded",s),o()}document.readyState=="loading"?(window.removeEventListener("DOMContentLoaded",s),window.addEventListener("DOMContentLoaded",s,{once:!0})):o()}),e=!0;for(const o of n)t(o),n.delete(o);return r}const re=document.createElement("rdh-ui");(async()=>{const t=await Hi(n=>{switch(n.type){case"RDH_APPLY":Array.isArray(n.payload)&&(e.highlights=n.payload);break;case"RDH_CONFIG":typeof n.payload.pro=="boolean"&&(e.pro=n.payload.pro),typeof n.payload.nav=="boolean"&&(e.nav=n.payload.nav),typeof n.payload.enabled=="boolean"&&(n.payload.enabled===!0?document.body.contains(re)||document.body.appendChild(re):document.body.contains(re)&&document.body.removeChild(re));break;case"RDH_SCROLL":typeof n.payload._id=="string"&&Rr(n.payload._id);break;case"RDH_ADD_SELECTION":const r=Fr();if(!r)return;const o=e.find(r);if(!o)return;e.upsert(o),ie();break;case"RDH_NOTE_SELECTION":console.log("not implemented yet");break}}),e=mi(n=>t({type:"RDH_ADD",payload:n}),n=>t({type:"RDH_UPDATE",payload:n}),({_id:n})=>t({type:"RDH_REMOVE",payload:{_id:n}}));re.store=e,t({type:"RDH_READY",payload:{url:location.href}})})();
