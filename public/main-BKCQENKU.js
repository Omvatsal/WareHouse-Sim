var WT=Object.defineProperty,$T=Object.defineProperties;var qT=Object.getOwnPropertyDescriptors;var V_=Object.getOwnPropertySymbols;var XT=Object.prototype.hasOwnProperty,YT=Object.prototype.propertyIsEnumerable;var H_=(n,e,t)=>e in n?WT(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,mt=(n,e)=>{for(var t in e||={})XT.call(e,t)&&H_(n,t,e[t]);if(V_)for(var t of V_(e))YT.call(e,t)&&H_(n,t,e[t]);return n},Zt=(n,e)=>$T(n,qT(e));var rc=[null],hu=[!1],ks=1,ZT=null,fi=Symbol("SIGNAL");function Ne(n){let e=rc[0];return rc[0]=n,e}function yu(){return rc[0]}var Bs={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function sc(n){if(hu[0])throw new Error("");let e=rc[0];if(e===null)return;e.consumerOnSignalRead(n);let t=e.producersTail;if(t!==void 0&&t.producer===n)return;let i,r=e.recomputing;if(r&&(i=t!==void 0?t.nextProducer:e.producers,i!==void 0&&i.producer===n)){e.producersTail=i,i.lastReadVersion=n.version,i.knownValidAtEpoch=ks;return}let s=n.consumersTail;if(s!==void 0&&s.consumer===e&&(!r||s.knownValidAtEpoch===ks))return;let o=Ro(e),a={producer:n,consumer:e,nextProducer:i,prevConsumer:void 0,knownValidAtEpoch:ks,lastReadVersion:n.version,nextConsumer:void 0};e.producersTail=a,t!==void 0?t.nextProducer=a:e.producers=a,o&&W_(n,a)}function z_(){ks++}function oc(n){if(!(Ro(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===ks)){if(!n.producerMustRecompute(n)&&!vu(n)){gu(n);return}n.producerRecomputeValue(n),gu(n)}}function jp(n){if(n.consumers===void 0)return;let e=hu[0];hu[0]=!0;try{for(let t=n.consumers;t!==void 0;t=t.nextConsumer){let i=t.consumer;i.dirty||KT(i)}}finally{hu[0]=e}}function Wp(){return rc[0]?.consumerAllowSignalWrites!==!1}function KT(n){n.dirty=!0,jp(n),n.consumerMarkedDirty?.(n)}function gu(n){n.dirty=!1,n.lastCleanEpoch=ks}function Ao(n){return n&&G_(n),Ne(n)}function G_(n){if(n.producersTail?.knownValidAtEpoch===ks){let e=n.producers;for(;e!==void 0;)e.knownValidAtEpoch=null,e=e.nextProducer}n.producersTail=void 0,n.recomputing=!0}function ac(n,e){Ne(e),n&&j_(n)}function j_(n){n.recomputing=!1;let e=n.producersTail,t=e!==void 0?e.nextProducer:n.producers;if(t!==void 0){if(Ro(n))do t=$p(t);while(t!==void 0);e!==void 0?e.nextProducer=void 0:n.producers=void 0}}function vu(n){for(let e=n.producers;e!==void 0;e=e.nextProducer){let t=e.producer,i=e.lastReadVersion;if(i!==t.version||(oc(t),i!==t.version))return!0}return!1}function Io(n){if(Ro(n)){let e=n.producers;for(;e!==void 0;)e=$p(e)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function W_(n,e){let t=n.consumersTail,i=Ro(n);if(t!==void 0?(e.nextConsumer=t.nextConsumer,t.nextConsumer=e):(e.nextConsumer=void 0,n.consumers=e),e.prevConsumer=t,n.consumersTail=e,!i)for(let r=n.producers;r!==void 0;r=r.nextProducer)W_(r.producer,r)}function $p(n){let e=n.producer,t=n.nextProducer,i=n.nextConsumer,r=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:e.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(e.consumers=i,!Ro(e)){let s=e.producers;for(;s!==void 0;)s=$p(s)}return t}function Ro(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function _u(n){ZT?.(n)}function xu(n,e){return Object.is(n,e)}function Eu(n,e){let t=Object.create(JT);t.computation=n,e!==void 0&&(t.equal=e);let i=()=>{if(oc(t),sc(t),t.value===Us)throw t.error;return t.value};return i[fi]=t,_u(t),i}var pu=Symbol("UNSET"),mu=Symbol("COMPUTING"),Us=Symbol("ERRORED"),JT=Zt(mt({},Bs),{value:pu,dirty:!0,error:null,equal:xu,kind:"computed",producerMustRecompute(n){return n.value===pu||n.value===mu},producerRecomputeValue(n){if(n.value===mu)throw new Error("");let e=n.value;n.value=mu;let t=Ao(n),i,r=!1;try{i=n.computation(),Ne(null),r=e!==pu&&e!==Us&&i!==Us&&n.equal(e,i),n.error=null}catch(s){i=Us,n.error=s}finally{ac(n,t)}if(r){n.value=e;return}n.value=i,n.version++}});function QT(){throw new Error}var $_=QT;function q_(n){$_(n)}function qp(n){$_=n}var ew=null;function Xp(n,e){let t=Object.create(Zp);t.value=n,e!==void 0&&(t.equal=e);let i=()=>X_(t);return i[fi]=t,_u(t),[i,o=>cc(t,o),o=>Yp(t,o)]}function X_(n){return sc(n),n.value}function cc(n,e){Wp()||q_(n),n.equal(n.value,e)||(n.value=e,tw(n))}function Yp(n,e){Wp()||q_(n),cc(n,e(n.value))}var Zp=Zt(mt({},Bs),{equal:xu,value:void 0,kind:"signal"});function tw(n){n.version++,z_(),jp(n),ew?.(n)}var Kp=Zt(mt({},Bs),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function Jp(n){if(n.dirty=!1,n.version>0&&!vu(n))return;n.version++;let e=Ao(n);try{n.cleanup(),n.fn()}finally{ac(n,e)}}var Qp=[void 0];function Su(){return Qp[0]}function Xi(n){let e=Qp[0];return Qp[0]=n,e}var Y_=Symbol("NotFound");function No(n){return n===Y_||n?.name==="\u0275NotFound"}function Z_(n){let e=Ne(null);try{return n()}finally{Ne(e)}}function gt(n){return typeof n=="function"}function bu(n){let t=n(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var Mu=bu(n=>function(t){n(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function lc(n,e){if(n){let t=n.indexOf(e);0<=t&&n.splice(t,1)}}var Fn=class n{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let s of t)s.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(gt(i))try{i()}catch(s){e=s instanceof Mu?s.errors:[s]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let s of r)try{K_(s)}catch(o){e=e??[],o instanceof Mu?e=[...e,...o.errors]:e.push(o)}}if(e)throw new Mu(e)}}add(e){var t;if(e&&e!==this)if(this.closed)K_(e);else{if(e instanceof n){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&lc(t,e)}remove(e){let{_finalizers:t}=this;t&&lc(t,e),e instanceof n&&e._removeParent(this)}};Fn.EMPTY=(()=>{let n=new Fn;return n.closed=!0,n})();var em=Fn.EMPTY;function Tu(n){return n instanceof Fn||n&&"closed"in n&&gt(n.remove)&&gt(n.add)&&gt(n.unsubscribe)}function K_(n){gt(n)?n():n.unsubscribe()}var Ai={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Po={setTimeout(n,e,...t){let{delegate:i}=Po;return i?.setTimeout?i.setTimeout(n,e,...t):setTimeout(n,e,...t)},clearTimeout(n){let{delegate:e}=Po;return(e?.clearTimeout||clearTimeout)(n)},delegate:void 0};function wu(n){Po.setTimeout(()=>{let{onUnhandledError:e}=Ai;if(e)e(n);else throw n})}function tm(){}var J_=nm("C",void 0,void 0);function Q_(n){return nm("E",void 0,n)}function e0(n){return nm("N",n,void 0)}function nm(n,e,t){return{kind:n,value:e,error:t}}var Vs=null;function Oo(n){if(Ai.useDeprecatedSynchronousErrorHandling){let e=!Vs;if(e&&(Vs={errorThrown:!1,error:null}),n(),e){let{errorThrown:t,error:i}=Vs;if(Vs=null,t)throw i}}else n()}function t0(n){Ai.useDeprecatedSynchronousErrorHandling&&Vs&&(Vs.errorThrown=!0,Vs.error=n)}var Hs=class extends Fn{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,Tu(e)&&e.add(this)):this.destination=rw}static create(e,t,i){return new Lo(e,t,i)}next(e){this.isStopped?rm(e0(e),this):this._next(e)}error(e){this.isStopped?rm(Q_(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?rm(J_,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},nw=Function.prototype.bind;function im(n,e){return nw.call(n,e)}var sm=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(i){Cu(i)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(i){Cu(i)}else Cu(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){Cu(t)}}},Lo=class extends Hs{constructor(e,t,i){super();let r;if(gt(e)||!e)r={next:e??void 0,error:t??void 0,complete:i??void 0};else{let s;this&&Ai.useDeprecatedNextContext?(s=Object.create(e),s.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&im(e.next,s),error:e.error&&im(e.error,s),complete:e.complete&&im(e.complete,s)}):r=e}this.destination=new sm(r)}};function Cu(n){Ai.useDeprecatedSynchronousErrorHandling?t0(n):wu(n)}function iw(n){throw n}function rm(n,e){let{onStoppedNotification:t}=Ai;t&&Po.setTimeout(()=>t(n,e))}var rw={closed:!0,next:tm,error:iw,complete:tm};var Fo=typeof Symbol=="function"&&Symbol.observable||"@@observable";function n0(n){return n}function i0(n){return n.length===0?n0:n.length===1?n[0]:function(t){return n.reduce((i,r)=>r(i),t)}}var Bt=class n{constructor(e){e&&(this._subscribe=e)}lift(e){let t=new n;return t.source=this,t.operator=e,t}subscribe(e,t,i){let r=ow(e)?e:new Lo(e,t,i);return Oo(()=>{let{operator:s,source:o}=this;r.add(s?s.call(r,o):o?this._subscribe(r):this._trySubscribe(r))}),r}_trySubscribe(e){try{return this._subscribe(e)}catch(t){e.error(t)}}forEach(e,t){return t=r0(t),new t((i,r)=>{let s=new Lo({next:o=>{try{e(o)}catch(a){r(a),s.unsubscribe()}},error:r,complete:i});this.subscribe(s)})}_subscribe(e){var t;return(t=this.source)===null||t===void 0?void 0:t.subscribe(e)}[Fo](){return this}pipe(...e){return i0(e)(this)}toPromise(e){return e=r0(e),new e((t,i)=>{let r;this.subscribe(s=>r=s,s=>i(s),()=>t(r))})}};Bt.create=n=>new Bt(n);function r0(n){var e;return(e=n??Ai.Promise)!==null&&e!==void 0?e:Promise}function sw(n){return n&&gt(n.next)&&gt(n.error)&&gt(n.complete)}function ow(n){return n&&n instanceof Hs||sw(n)&&Tu(n)}function aw(n){return gt(n?.lift)}function hi(n){return e=>{if(aw(e))return e.lift(function(t){try{return n(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function vr(n,e,t,i,r){return new om(n,e,t,i,r)}var om=class extends Hs{constructor(e,t,i,r,s,o){super(e),this.onFinalize=s,this.shouldUnsubscribe=o,this._next=t?function(a){try{t(a)}catch(c){e.error(c)}}:super._next,this._error=r?function(a){try{r(a)}catch(c){e.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};var s0=bu(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var pi=class extends Bt{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(e){let t=new Du(this,this);return t.operator=e,t}_throwIfClosed(){if(this.closed)throw new s0}next(e){Oo(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let t of this.currentObservers)t.next(e)}})}error(e){Oo(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=e;let{observers:t}=this;for(;t.length;)t.shift().error(e)}})}complete(){Oo(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:e}=this;for(;e.length;)e.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var e;return((e=this.observers)===null||e===void 0?void 0:e.length)>0}_trySubscribe(e){return this._throwIfClosed(),super._trySubscribe(e)}_subscribe(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)}_innerSubscribe(e){let{hasError:t,isStopped:i,observers:r}=this;return t||i?em:(this.currentObservers=null,r.push(e),new Fn(()=>{this.currentObservers=null,lc(r,e)}))}_checkFinalizedStatuses(e){let{hasError:t,thrownError:i,isStopped:r}=this;t?e.error(i):r&&e.complete()}asObservable(){let e=new Bt;return e.source=this,e}};pi.create=(n,e)=>new Du(n,e);var Du=class extends pi{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,e)}error(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&i!==void 0?i:em}};var uc=class extends pi{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:i}=this;if(e)throw t;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};function o0(n){return n&&gt(n.schedule)}function cw(n){return n[n.length-1]}function a0(n){return o0(cw(n))?n.pop():void 0}function l0(n,e,t,i){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{l(i.next(u))}catch(d){o(d)}}function c(u){try{l(i.throw(u))}catch(d){o(d)}}function l(u){u.done?s(u.value):r(u.value).then(a,c)}l((i=i.apply(n,e||[])).next())})}function c0(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function zs(n){return this instanceof zs?(this.v=n,this):new zs(n)}function u0(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(n,e||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(f){return function(g){return Promise.resolve(g).then(f,d)}}function a(f,g){i[f]&&(r[f]=function(_){return new Promise(function(p,m){s.push([f,_,p,m])>1||c(f,_)})},g&&(r[f]=g(r[f])))}function c(f,g){try{l(i[f](g))}catch(_){h(s[0][3],_)}}function l(f){f.value instanceof zs?Promise.resolve(f.value.v).then(u,d):h(s[0][2],f)}function u(f){c("next",f)}function d(f){c("throw",f)}function h(f,g){f(g),s.shift(),s.length&&c(s[0][0],s[0][1])}}function d0(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=n[Symbol.asyncIterator],t;return e?e.call(n):(n=typeof c0=="function"?c0(n):n[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(s){t[s]=n[s]&&function(o){return new Promise(function(a,c){o=n[s](o),r(a,c,o.done,o.value)})}}function r(s,o,a,c){Promise.resolve(c).then(function(l){s({value:l,done:a})},o)}}var Au=(n=>n&&typeof n.length=="number"&&typeof n!="function");function Iu(n){return gt(n?.then)}function Ru(n){return gt(n[Fo])}function Nu(n){return Symbol.asyncIterator&&gt(n?.[Symbol.asyncIterator])}function Pu(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function lw(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Ou=lw();function Lu(n){return gt(n?.[Ou])}function Fu(n){return u0(this,arguments,function*(){let t=n.getReader();try{for(;;){let{value:i,done:r}=yield zs(t.read());if(r)return yield zs(void 0);yield yield zs(i)}}finally{t.releaseLock()}})}function ku(n){return gt(n?.getReader)}function Yi(n){if(n instanceof Bt)return n;if(n!=null){if(Ru(n))return uw(n);if(Au(n))return dw(n);if(Iu(n))return fw(n);if(Nu(n))return f0(n);if(Lu(n))return hw(n);if(ku(n))return pw(n)}throw Pu(n)}function uw(n){return new Bt(e=>{let t=n[Fo]();if(gt(t.subscribe))return t.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function dw(n){return new Bt(e=>{for(let t=0;t<n.length&&!e.closed;t++)e.next(n[t]);e.complete()})}function fw(n){return new Bt(e=>{n.then(t=>{e.closed||(e.next(t),e.complete())},t=>e.error(t)).then(null,wu)})}function hw(n){return new Bt(e=>{for(let t of n)if(e.next(t),e.closed)return;e.complete()})}function f0(n){return new Bt(e=>{mw(n,e).catch(t=>e.error(t))})}function pw(n){return f0(Fu(n))}function mw(n,e){var t,i,r,s;return l0(this,void 0,void 0,function*(){try{for(t=d0(n);i=yield t.next(),!i.done;){let o=i.value;if(e.next(o),e.closed)return}}catch(o){r={error:o}}finally{try{i&&!i.done&&(s=t.return)&&(yield s.call(t))}finally{if(r)throw r.error}}e.complete()})}function mi(n,e,t,i=0,r=!1){let s=e.schedule(function(){t(),r?n.add(this.schedule(null,i)):this.unsubscribe()},i);if(n.add(s),!r)return s}function Uu(n,e=0){return hi((t,i)=>{t.subscribe(vr(i,r=>mi(i,n,()=>i.next(r),e),()=>mi(i,n,()=>i.complete(),e),r=>mi(i,n,()=>i.error(r),e)))})}function Bu(n,e=0){return hi((t,i)=>{i.add(n.schedule(()=>t.subscribe(i),e))})}function h0(n,e){return Yi(n).pipe(Bu(e),Uu(e))}function p0(n,e){return Yi(n).pipe(Bu(e),Uu(e))}function m0(n,e){return new Bt(t=>{let i=0;return e.schedule(function(){i===n.length?t.complete():(t.next(n[i++]),t.closed||this.schedule())})})}function g0(n,e){return new Bt(t=>{let i;return mi(t,e,()=>{i=n[Ou](),mi(t,e,()=>{let r,s;try{({value:r,done:s}=i.next())}catch(o){t.error(o);return}s?t.complete():t.next(r)},0,!0)}),()=>gt(i?.return)&&i.return()})}function Vu(n,e){if(!n)throw new Error("Iterable cannot be null");return new Bt(t=>{mi(t,e,()=>{let i=n[Symbol.asyncIterator]();mi(t,e,()=>{i.next().then(r=>{r.done?t.complete():t.next(r.value)})},0,!0)})})}function y0(n,e){return Vu(Fu(n),e)}function v0(n,e){if(n!=null){if(Ru(n))return h0(n,e);if(Au(n))return m0(n,e);if(Iu(n))return p0(n,e);if(Nu(n))return Vu(n,e);if(Lu(n))return g0(n,e);if(ku(n))return y0(n,e)}throw Pu(n)}function _0(n,e){return e?v0(n,e):Yi(n)}function am(...n){let e=a0(n);return _0(n,e)}function Zi(n,e){return hi((t,i)=>{let r=0;t.subscribe(vr(i,s=>{i.next(n.call(e,s,r++))}))})}function x0(n,e,t,i,r,s,o,a){let c=[],l=0,u=0,d=!1,h=()=>{d&&!c.length&&!l&&e.complete()},f=_=>l<i?g(_):c.push(_),g=_=>{s&&e.next(_),l++;let p=!1;Yi(t(_,u++)).subscribe(vr(e,m=>{r?.(m),s?f(m):e.next(m)},()=>{p=!0},void 0,()=>{if(p)try{for(l--;c.length&&l<i;){let m=c.shift();o?mi(e,o,()=>g(m)):g(m)}h()}catch(m){e.error(m)}}))};return n.subscribe(vr(e,f,()=>{d=!0,h()})),()=>{a?.()}}function Hu(n,e,t=1/0){return gt(e)?Hu((i,r)=>Zi((s,o)=>e(i,s,r,o))(Yi(n(i,r))),t):(typeof e=="number"&&(t=e),hi((i,r)=>x0(i,r,n,t)))}function cm(n,e){return hi((t,i)=>{let r=0;t.subscribe(vr(i,s=>n.call(e,s,r++)&&i.next(s)))})}function lm(n,e){return gt(e)?Hu(n,e,1):Hu(n,1)}function um(n){return hi((e,t)=>{try{e.subscribe(t)}finally{t.add(n)}})}var Oe=class extends Error{code;constructor(e,t){super(qs(e,t)),this.code=e}};function gw(n){return`NG0${Math.abs(n)}`}function qs(n,e){return`${gw(n)}${e?": "+e:""}`}function Rt(n){for(let e in n)if(n[e]===Rt)return e;throw Error("")}function Yu(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(Yu).join(", ")}]`;if(n==null)return""+n;let e=n.overriddenName||n.name;if(e)return`${e}`;let t=n.toString();if(t==null)return""+t;let i=t.indexOf(`
`);return i>=0?t.slice(0,i):t}function Tm(n,e){return n?e?`${n} ${e}`:n:e||""}var yw=Rt({__forward_ref__:Rt});function Zu(n){return n.__forward_ref__=Zu,n}function ni(n){return T0(n)?n():n}function T0(n){return typeof n=="function"&&Object.hasOwn(n,yw)&&n.__forward_ref__===Zu}function ht(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function Bo(n){return{providers:n.providers||[],imports:n.imports||[]}}function Ku(n){return vw(n,Ju)}function vw(n,e){return Object.hasOwn(n,e)&&n[e]||null}function _w(n){let e=n?.[Ju]??null;return e||null}function fm(n){return n&&Object.hasOwn(n,Gu)?n[Gu]:null}var Ju=Rt({\u0275prov:Rt}),Gu=Rt({\u0275inj:Rt}),Xe=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,t){this._desc=e,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=ht({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function wm(n){return n&&!!n.\u0275providers}var Cm=Rt({\u0275cmp:Rt}),Dm=Rt({\u0275dir:Rt}),Am=Rt({\u0275pipe:Rt});var hm=Rt({\u0275fac:Rt}),Xs=Rt({__NG_ELEMENT_ID__:Rt}),E0=Rt({__NG_ENV_ID__:Rt});function Ys(n){return Im(n,"@Component"),n[Cm]||null}function Qu(n){return Im(n,"@Directive"),n[Dm]||null}function w0(n){return Im(n,"@Pipe"),n[Am]||null}function Im(n,e){if(n==null)throw new Oe(-919,!1)}function Rm(n){return typeof n=="string"?n:n==null?"":String(n)}var C0=Rt({ngErrorCode:Rt}),xw=Rt({ngErrorMessage:Rt}),Ew=Rt({ngTokenPath:Rt});function Nm(n,e){return D0("",-200,e)}function ed(n,e){throw new Oe(-201,!1)}function D0(n,e,t){let i=new Oe(e,n);return i[C0]=e,i[xw]=n,t&&(i[Ew]=t),i}function Sw(n){return n[C0]}var pm;function A0(){return pm}function kn(n){let e=pm;return pm=n,e}function Pm(n,e,t){let i=Ku(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&8)return null;if(e!==void 0)return e;ed(n,"")}var Zs=globalThis;var bw={},Gs=bw,Mw="__NG_DI_FLAG__",mm=class{injector;constructor(e){this.injector=e}retrieve(e,t){let i=js(t)||0;try{return this.injector.get(e,i&8?null:Gs,i)}catch(r){if(No(r))return r;throw r}}};function Tw(n,e=0){let t=Su();if(t===void 0)throw new Oe(-203,!1);if(t===null)return Pm(n,void 0,e);{let i=ww(e),r=t.retrieve(n,i);if(No(r)){if(i.optional)return null;throw r}return r}}function ot(n,e=0){return(A0()||Tw)(ni(n),e)}function _e(n,e){return ot(n,js(e))}function js(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function ww(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function gm(n){let e=[];for(let t=0;t<n.length;t++){let i=ni(n[t]);if(Array.isArray(i)){if(i.length===0)throw new Oe(900,!1);let r,s=0;for(let o=0;o<i.length;o++){let a=i[o],c=Cw(a);typeof c=="number"?c===-1?r=a.token:s|=c:r=a}e.push(ot(r,s))}else e.push(ot(i))}return e}function Cw(n){return n[Mw]}function Ws(n,e){let t=Object.hasOwn(n,hm);return t?n[hm]:null}function I0(n,e,t){if(n.length!==e.length)return!1;for(let i=0;i<n.length;i++){let r=n[i],s=e[i];if(t&&(r=t(r),s=t(s)),s!==r)return!1}return!0}function R0(n){return n.flat(Number.POSITIVE_INFINITY)}function td(n,e){n.forEach(t=>Array.isArray(t)?td(t,e):e(t))}function Om(n,e,t){e>=n.length?n.push(t):n.splice(e,0,t)}function pc(n,e){return e>=n.length-1?n.pop():n.splice(e,1)[0]}function N0(n,e,t,i){let r=n.length;if(r==e)n.push(t,i);else if(r===1)n.push(i,n[0]),n[0]=t;else{for(r--,n.push(n[r-1],n[r]);r>e;){let s=r-2;n[r]=n[s],r--}n[e]=t,n[e+1]=i}}function P0(n,e,t){let i=Vo(n,e);return i>=0?n[i|1]=t:(i=~i,N0(n,i,e,t)),i}function nd(n,e){let t=Vo(n,e);if(t>=0)return n[t|1]}function Vo(n,e){return Dw(n,e,1)}function Dw(n,e,t){let i=0,r=n.length>>t;for(;r!==i;){let s=i+(r-i>>1),o=n[s<<t];if(e===o)return s<<t;o>e?r=s:i=s+1}return~(r<<t)}var id={},gi=[],Ho=new Xe(""),Lm=new Xe("",-1),Fm=new Xe(""),Uo=class{get(e,t=Gs){if(t===Gs){let r=D0("",-201);throw r.name="\u0275NotFound",r}return t}};function Ks(n){return{\u0275providers:n}}function O0(n){return Ks([{provide:Ho,multi:!0,useValue:n}])}function L0(...n){return{\u0275providers:km(!0,n),\u0275fromNgModule:!0}}function km(n,...e){let t=[],i=new Set,r,s=o=>{t.push(o)};return td(e,o=>{let a=o;ju(a,s,[],i)&&(r||=[],r.push(a))}),r!==void 0&&F0(r,s),t}function F0(n,e){for(let t=0;t<n.length;t++){let{ngModule:i,providers:r}=n[t];Um(r,s=>{e(s,i)})}}function ju(n,e,t,i){if(n=ni(n),!n)return!1;let r=null,s=fm(n),o=!s&&Ys(n);if(!s&&!o){let c=n.ngModule;if(s=fm(c),s)r=c;else return!1}else{if(o&&!o.standalone)return!1;r=n}let a=i.has(r);if(o){if(a)return!1;if(i.add(r),o.dependencies){let c=typeof o.dependencies=="function"?o.dependencies():o.dependencies;for(let l of c)ju(l,e,t,i)}}else if(s){if(s.imports!=null&&!a){i.add(r);let l;td(s.imports,u=>{ju(u,e,t,i)&&(l||=[],l.push(u))}),l!==void 0&&F0(l,e)}if(!a){let l=Ws(r)||(()=>new r);e({provide:r,useFactory:l,deps:gi},r),e({provide:Fm,useValue:r,multi:!0},r),e({provide:Ho,useValue:()=>ot(r),multi:!0},r)}let c=s.providers;if(c!=null&&!a){let l=n;Um(c,u=>{e(u,l)})}}else return!1;return r!==n&&n.providers!==void 0}function Um(n,e){for(let t of n)wm(t)&&(t=t.\u0275providers),Array.isArray(t)?Um(t,e):e(t)}var Aw=Rt({provide:String,useValue:Rt});function k0(n){return n!==null&&typeof n=="object"&&Aw in n}function Iw(n){return!!(n&&n.useExisting)}function Rw(n){return!!(n&&n.useFactory)}function Wu(n){return typeof n=="function"}var mc=new Xe(""),zu={},S0={},dm;function gc(){return dm===void 0&&(dm=new Uo),dm}var qn=class{},$s=class extends qn{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,vm(e,o=>this.processProvider(o)),this.records.set(Lm,ko(void 0,this)),r.has("environment")&&this.records.set(qn,ko(void 0,this));let s=this.records.get(mc);s!=null&&typeof s.value=="string"&&this.scopes.add(s.value),this.injectorDefTypes=new Set(this.get(Fm,gi,{self:!0}))}retrieve(e,t){let i=js(t)||0;try{return this.get(e,Gs,i)}catch(r){if(No(r))return r;throw r}}destroy(){dc(this),this._destroyed=!0;let e=Ne(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),Ne(e)}}onDestroy(e){return dc(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){dc(this);let t=Xi(this),i=kn(void 0),r;try{return e()}finally{Xi(t),kn(i)}}get(e,t=Gs,i){if(dc(this),Object.hasOwn(e,E0))return e[E0](this);let r=js(i),s,o=Xi(this),a=kn(void 0);try{if(!(r&4)){let l=this.records.get(e);if(l===void 0){let u=Fw(e)&&Ku(e);u&&this.injectableDefInScope(u)?l=ko(ym(e),zu):l=null,this.records.set(e,l)}if(l!=null)return this.hydrate(e,l,r)}let c=r&2?gc():this.parent;return t=r&8&&t===Gs?null:t,c.get(e,t)}catch(c){let l=Sw(c);throw l===-200||l===-201?new Oe(l,null):c}finally{kn(a),Xi(o)}}resolveInjectorInitializers(){let e=Ne(null),t=Xi(this),i=kn(void 0),r;try{let s=this.get(Ho,gi,{self:!0});for(let o of s)o()}finally{Xi(t),kn(i),Ne(e)}}toString(){return"R3Injector[...]"}processProvider(e){e=ni(e);let t=Wu(e)?e:ni(e&&e.provide),i=Pw(e);if(!Wu(e)&&e.multi===!0){let r=this.records.get(t);r||(r=ko(void 0,zu,!0),r.factory=()=>gm(r.multi),this.records.set(t,r)),t=e,r.multi.push(e)}this.records.set(t,i)}hydrate(e,t,i){let r=Ne(null);try{if(t.value===S0)throw Nm("");return t.value===zu&&(t.value=S0,t.value=t.factory(void 0,i)),typeof t.value=="object"&&t.value&&Lw(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{Ne(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=ni(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function ym(n){let e=Ku(n),t=e!==null?e.factory:Ws(n);if(t!==null)return t;if(n instanceof Xe)throw new Oe(-204,!1);if(n instanceof Function)return Nw(n);throw new Oe(-204,!1)}function Nw(n){if(n.length>0)throw new Oe(-204,!1);let t=_w(n);return t!==null?()=>t.factory(n):()=>new n}function Pw(n){if(k0(n))return ko(void 0,n.useValue);{let e=U0(n);return ko(e,zu)}}function U0(n,e,t){let i;if(Wu(n)){let r=ni(n);return Ws(r)||ym(r)}else if(k0(n))i=()=>ni(n.useValue);else if(Rw(n))i=()=>n.useFactory(...gm(n.deps||[]));else if(Iw(n))i=(r,s)=>ot(ni(n.useExisting),s!==void 0&&s&8?8:void 0);else{let r=ni(n&&(n.useClass||n.provide));if(Ow(n))i=()=>new r(...gm(n.deps));else return Ws(r)||ym(r)}return i}function dc(n){if(n.destroyed)throw new Oe(-205,!1)}function ko(n,e,t=!1){return{factory:n,value:e,multi:t?[]:void 0}}function Ow(n){return!!n.deps}function Lw(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function Fw(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function vm(n,e){for(let t of n)Array.isArray(t)?vm(t,e):t&&wm(t)?vm(t.\u0275providers,e):e(t)}function zo(n,e){let t;n instanceof $s?(dc(n),t=n):t=new mm(n);let i,r=Xi(t),s=kn(void 0);try{return e()}finally{Xi(r),kn(s)}}function B0(){return A0()!==void 0||Su()!=null}var Ri=0,Be=1,We=2,en=3,_i=4,Xn=5,Go=6,jo=7,tn=8,br=9,Ki=10,nn=11,Wo=12,Bm=13,ns=14,ii=15,is=16,Js=17,Ji=18,yc=19,Vm=20,xr=21,rd=22,Er=23,ri=24,sd=25,V0=26,vc=27,on=28,H0=1,Hm=6,Qs=7,_c=8,eo=9,Kt=10;function rs(n){return Array.isArray(n)&&typeof n[H0]=="object"}function xi(n){return Array.isArray(n)&&n[H0]===!0}function zm(n){return(n.flags&4)!==0}function to(n){return n.componentOffset>-1}function od(n){return(n.flags&1)===1}function no(n){return!!n.template}function $o(n){return(n[We]&512)!==0}function io(n){return(n[We]&256)===256}var Gm="svg",z0="math";function xn(n){for(;Array.isArray(n);)n=n[Ri];return n}function jm(n,e){return xn(e[n])}function Ni(n,e){return xn(e[n.index])}function ad(n,e){return n.data[e]}function Wm(n,e){return n[e]}function $m(n,e,t,i){t>=n.data.length&&(n.data[t]=null,n.blueprint[t]=null),e[t]=i}function Mr(n,e){let t=e[n];return rs(t)?t:t[Ri]}function G0(n){return(n[We]&4)===4}function cd(n){return(n[We]&128)===128}function j0(n){return xi(n[en])}function Qi(n,e){return e==null?null:n[e]}function qm(n){n[Js]=0}function Xm(n){n[We]&1024||(n[We]|=1024,cd(n)&&qo(n))}function W0(n,e){for(;n>0;)e=e[ns],n--;return e}function xc(n){return!!(n[We]&9216||n[ri]?.dirty)}function ld(n){n[Ki].changeDetectionScheduler?.notify(8),n[We]&64&&(n[We]|=1024),xc(n)&&qo(n)}function qo(n){n[Ki].changeDetectionScheduler?.notify(0);let e=Sr(n);for(;e!==null&&!(e[We]&8192||(e[We]|=8192,!cd(e)));)e=Sr(e)}function ud(n,e){if(io(n))throw new Oe(911,!1);n[xr]===null&&(n[xr]=[]),n[xr].push(e)}function $0(n,e){if(n[xr]===null)return;let t=n[xr].indexOf(e);t!==-1&&n[xr].splice(t,1)}function Sr(n){let e=n[en];return xi(e)?e[en]:e}function Ym(n){return n[jo]??=[]}function Zm(n){return n.cleanup??=[]}function q0(n,e,t,i){let r=Ym(e);r.push(t),n.firstCreatePass&&Zm(n).push(i,r.length-1)}var it={lFrame:ax(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var _m=!1;function X0(){return it.lFrame.elementDepthCount}function Y0(){it.lFrame.elementDepthCount++}function Km(){it.lFrame.elementDepthCount--}function Z0(){return it.bindingsEnabled}function K0(){return it.skipHydrationRootTNode!==null}function Jm(n){return it.skipHydrationRootTNode===n}function Qm(){it.skipHydrationRootTNode=null}function _t(){return it.lFrame.lView}function Un(){return it.lFrame.tView}function Ei(){let n=eg();for(;n!==null&&n.type===64;)n=n.parent;return n}function eg(){return it.lFrame.currentTNode}function J0(){let n=it.lFrame,e=n.currentTNode;return n.isParent?e:e.parent}function Xo(n,e){let t=it.lFrame;t.currentTNode=n,t.isParent=e}function tg(){return it.lFrame.isParent}function Q0(){it.lFrame.isParent=!1}function ng(){return _m}function fc(n){let e=_m;return _m=n,e}function ig(){let n=it.lFrame,e=n.bindingRootIndex;return e===-1&&(e=n.bindingRootIndex=n.tView.bindingStartIndex),e}function ex(n){return it.lFrame.bindingIndex=n}function Yo(){return it.lFrame.bindingIndex++}function tx(n){let e=it.lFrame,t=e.bindingIndex;return e.bindingIndex=e.bindingIndex+n,t}function nx(){return it.lFrame.inI18n}function ix(n,e){let t=it.lFrame;t.bindingIndex=t.bindingRootIndex=n,dd(e)}function rx(){return it.lFrame.currentDirectiveIndex}function dd(n){it.lFrame.currentDirectiveIndex=n}function sx(n){let e=it.lFrame.currentDirectiveIndex;return e===-1?null:n[e]}function rg(){return it.lFrame.currentQueryIndex}function fd(n){it.lFrame.currentQueryIndex=n}function kw(n){let e=n[Be];return e.type===2?e.declTNode:e.type===1?n[Xn]:null}function sg(n,e,t){if(t&4){let r=e,s=n;for(;r=r.parent,r===null&&!(t&1);)if(r=kw(s),r===null||(s=s[ns],r.type&10))break;if(r===null)return!1;e=r,n=s}let i=it.lFrame=ox();return i.currentTNode=e,i.lView=n,!0}function hd(n){let e=ox(),t=n[Be];it.lFrame=e,e.currentTNode=t.firstChild,e.lView=n,e.tView=t,e.contextLView=n,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function ox(){let n=it.lFrame,e=n===null?null:n.child;return e===null?ax(n):e}function ax(n){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=e),e}function cx(){let n=it.lFrame;return it.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var og=cx;function pd(){let n=cx();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function lx(n){return(it.lFrame.contextLView=W0(n,it.lFrame.contextLView))[tn]}function ss(){return it.lFrame.selectedIndex}function os(n){it.lFrame.selectedIndex=n}function ag(){let n=it.lFrame;return ad(n.tView,n.selectedIndex)}function Dn(){it.lFrame.currentNamespace=Gm}function Yn(){Uw()}function Uw(){it.lFrame.currentNamespace=null}function cg(){return it.lFrame.currentNamespace}var ux=!0;function md(){return ux}function gd(n){ux=n}function xm(n,e=null,t=null,i){let r=dx(n,e,t,i);return r.resolveInjectorInitializers(),r}function dx(n,e=null,t=null,i,r=new Set){let s=[t||gi,L0(n)],o;return new $s(s,e||gc(),o||null,r)}var yi=class n{static THROW_IF_NOT_FOUND=Gs;static NULL=new Uo;static create(e,t){if(Array.isArray(e))return xm({name:""},t,e,"");{let i=e.name??"";return xm({name:i},e.parent,e.providers,i)}}static \u0275prov=ht({token:n,providedIn:"any",factory:()=>ot(Lm)});static __NG_ELEMENT_ID__=-1},En=new Xe(""),vi=class{static __NG_ELEMENT_ID__=Bw;static __NG_ENV_ID__=e=>e},$u=class extends vi{_lView;constructor(e){super(),this._lView=e}get destroyed(){return io(this._lView)}onDestroy(e){let t=this._lView;return ud(t,e),()=>$0(t,e)}};function Bw(){return new $u(_t())}var fx=!1,hx=new Xe(""),ro=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new uc(!1);debugTaskTracker=_e(hx,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new Bt(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),this.debugTaskTracker?.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.debugTaskTracker?.remove(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=ht({token:n,providedIn:"root",factory:()=>new n})}return n})(),Em=class extends pi{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,B0()&&(this.destroyRef=_e(vi,{optional:!0})??void 0,this.pendingTasks=_e(ro,{optional:!0})??void 0)}emit(e){let t=Ne(null);try{super.next(e)}finally{Ne(t)}}subscribe(e,t,i){let r=e,s=t||(()=>null),o=i;if(e&&typeof e=="object"){let c=e;r=c.next?.bind(c),s=c.error?.bind(c),o=c.complete?.bind(c)}this.__isAsync&&(s=this.wrapInTimeout(s),r&&(r=this.wrapInTimeout(r)),o&&(o=this.wrapInTimeout(o)));let a=super.subscribe({next:r,error:s,complete:o});return e instanceof Fn&&e.add(a),a}wrapInTimeout(e){return t=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},_r=Em;function qu(...n){}function lg(n){let e,t;function i(){n=qu;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{n(),i()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{n(),i()})),()=>i()}function px(n){return queueMicrotask(()=>n()),()=>{n=qu}}var mx="isAngularZone",_n=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new _r(!1);onMicrotaskEmpty=new _r(!1);onStable=new _r(!1);onError=new _r(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:s=fx}=e;if(typeof Zone>"u")throw new Oe(908,!1);Zone.assertZonePatched();let o=this;o._nesting=0,o._outer=o._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(o._inner=o._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(o._inner=o._inner.fork(Zone.longStackTraceZoneSpec)),o.shouldCoalesceEventChangeDetection=!r&&i,o.shouldCoalesceRunChangeDetection=r,o.callbackScheduled=!1,o.scheduleInRootZone=s,zw(o)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(mx)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new Oe(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new Oe(909,!1)}run(e,t,i){return this._inner.run(e,t,i)}runTask(e,t,i,r){let s=this._inner,o=s.scheduleEventTask("NgZoneEvent: "+r,e,Vw,qu,qu);try{return s.runTask(o,t,i)}finally{s.cancelTask(o)}}runGuarded(e,t,i){return this._inner.runGuarded(e,t,i)}runOutsideAngular(e){return this._outer.run(e)}},Vw={};function ug(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function Hw(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function e(){lg(()=>{n.callbackScheduled=!1,Sm(n),n.isCheckStableRunning=!0,ug(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{e()}):n._outer.run(()=>{e()}),Sm(n)}function zw(n){let e=()=>{Hw(n)};n._inner=n._inner.fork({name:"angular",properties:{[mx]:!0},onInvokeTask:(t,i,r,s,o,a)=>{if(Gw(a))return t.invokeTask(r,s,o,a);try{return b0(n),t.invokeTask(r,s,o,a)}finally{(n.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&e(),M0(n)}},onInvoke:(t,i,r,s,o,a,c)=>{try{return b0(n),t.invoke(r,s,o,a,c)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!jw(a)&&e(),M0(n)}},onHasTask:(t,i,r,s)=>{t.hasTask(r,s),i===r&&(s.change=="microTask"?(n._hasPendingMicrotasks=s.microTask,Sm(n),ug(n)):s.change=="macroTask"&&(n.hasPendingMacrotasks=s.macroTask))},onHandleError:(t,i,r,s)=>(t.handleError(r,s),n.runOutsideAngular(()=>n.onError.emit(s)),!1)})}function Sm(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function b0(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function M0(n){n._nesting--,ug(n)}var hc=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new _r;onMicrotaskEmpty=new _r;onStable=new _r;onError=new _r;run(e,t,i){return e.apply(t,i)}runGuarded(e,t,i){return e.apply(t,i)}runOutsideAngular(e){return e()}runTask(e,t,i,r){return e.apply(t,i)}};function Gw(n){return gx(n,"__ignore_ng_zone__")}function jw(n){return gx(n,"__scheduler_tick__")}function gx(n,e){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[e]===!0}var Ii=class{_console=console;handleError(e){this._console.error("ERROR",e)}};function yx(n){return vx(n)?n:new bm(n)}function vx(n){return n instanceof Error||typeof n=="object"&&n!==null&&typeof n.name=="string"&&typeof n.message=="string"}var bm=class extends Error{constructor(e){super(String(e),{cause:e}),this.name="ErrorBoundaryWrappedError"}},Tr=new Xe("",{factory:()=>{let n=_e(_n),e=_e(qn),t;return i=>{n.runOutsideAngular(()=>{e.destroyed&&!t?setTimeout(()=>{throw i}):(t??=e.get(Ii),t.handleError(i))})}}}),_x={provide:Ho,useValue:()=>{let n=_e(Ii,{optional:!0})},multi:!0},Ww=new Xe("",{factory:()=>{let n=_e(En).defaultView;if(!n)return;let e=_e(Tr),t=s=>{e(s.reason),s.preventDefault()},i=s=>{s.error?e(s.error):e(new Error(s.message,{cause:s})),s.preventDefault()},r=()=>{n.addEventListener("unhandledrejection",t),n.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),_e(vi).onDestroy(()=>{n.removeEventListener("error",i),n.removeEventListener("unhandledrejection",t)})}});function dg(){return Ks([O0(()=>{_e(Ww)})])}function Jt(n,e){let[t,i,r]=Xp(n,e?.equal),s=t,o=s[fi];return s.set=i,s.update=r,s.asReadonly=fg.bind(s),s}function fg(){let n=this[fi];if(n.readonlyFn===void 0){let e=()=>this();e[fi]=n,n.readonlyFn=e}return n.readonlyFn}var Ec=new Xe("",{factory:()=>$w}),$w="ng";var yd=new Xe(""),Sc=new Xe("",{providedIn:"platform",factory:()=>"unknown"});var bc=new Xe("",{factory:()=>_e(En).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var vd=(()=>{class n{view;node;constructor(t,i){this.view=t,this.node=i}static __NG_ELEMENT_ID__=qw}return n})();function qw(){return new vd(_t(),Ei())}var ts=class{},Mc=new Xe("",{factory:()=>!0});var hg=new Xe(""),_d=(()=>{class n{static \u0275prov=ht({token:n,providedIn:"root",factory:()=>new Mm})}return n})(),Mm=class{dirtyEffectCount=0;queues=new Map;add(e){this.enqueue(e),this.schedule(e)}schedule(e){e.dirty&&this.dirtyEffectCount++}remove(e){let t=e.zone,i=this.queues.get(t);i.has(e)&&(i.delete(e),e.dirty&&this.dirtyEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let i=this.queues.get(t);i.has(e)||i.add(e)}flush(){for(;this.dirtyEffectCount>0;){let e=!1;for(let[t,i]of this.queues)t===null?e||=this.flushQueue(i):e||=t.run(()=>this.flushQueue(i));e||(this.dirtyEffectCount=0)}}flushQueue(e){let t=!1;for(let i of e)i.dirty&&(this.dirtyEffectCount--,t=!0,i.run());return t}},Xu=class{constructor(e){this[fi]=e}destroy(){this[fi].destroy()}};function Zo(n,e){let t=e?.injector??_e(yi),i=e?.manualCleanup!==!0?t.get(vi):null,r,s=t.get(vd,null,{optional:!0}),o=t.get(ts);return s!==null?(r=Ex(s.view,o,n),i instanceof $u&&i._lView===s.view&&(i=null)):r=Zw(n,t.get(_d),o),r.injector=t,i!==null&&(r.onDestroyFns=[i.onDestroy(()=>r.destroy())]),new Xu(r)}var xx=Zt(mt({},Kp),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let n=fc(!1);try{Jp(this)}finally{fc(n)}},cleanup(){if(!this.cleanupFns?.length)return;let n=Ne(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],Ne(n)}}}),Xw=Zt(mt({},xx),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(Io(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.scheduler.remove(this)}}),Yw=Zt(mt({},xx),{consumerMarkedDirty(){this.view[We]|=8192,qo(this.view),this.notifier.notify(13)},destroy(){if(Io(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.view[Er]?.delete(this)}});function Ex(n,e,t){let i=Object.create(Yw);return i.view=n,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=e,i.userFn=t,i.fn=Sx(i,t),n[Er]??=new Set,n[Er].add(i),i.consumerMarkedDirty(i),i}function Zw(n,e,t){let i=Object.create(Xw);return i.userFn=n,i.fn=Sx(i,n),i.scheduler=e,i.notifier=t,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function Sx(n,e){return()=>{e(t=>(n.cleanupFns??=[]).push(t))}}var Tc=(()=>{class n{internalPendingTasks=_e(ro);scheduler=_e(ts);errorHandler=_e(Tr);add(){let t=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(t)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(t))}}run(t){let i=this.add();try{t().catch(this.errorHandler).finally(i)}catch(r){this.errorHandler(r),i()}}static \u0275prov=ht({token:n,providedIn:"root",factory:()=>new n})}return n})();function Zg(n){return{toString:n}.toString()}var St=(function(n){return n[n.TemplateCreateStart=0]="TemplateCreateStart",n[n.TemplateCreateEnd=1]="TemplateCreateEnd",n[n.TemplateUpdateStart=2]="TemplateUpdateStart",n[n.TemplateUpdateEnd=3]="TemplateUpdateEnd",n[n.LifecycleHookStart=4]="LifecycleHookStart",n[n.LifecycleHookEnd=5]="LifecycleHookEnd",n[n.OutputStart=6]="OutputStart",n[n.OutputEnd=7]="OutputEnd",n[n.BootstrapApplicationStart=8]="BootstrapApplicationStart",n[n.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",n[n.BootstrapComponentStart=10]="BootstrapComponentStart",n[n.BootstrapComponentEnd=11]="BootstrapComponentEnd",n[n.ChangeDetectionStart=12]="ChangeDetectionStart",n[n.ChangeDetectionEnd=13]="ChangeDetectionEnd",n[n.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",n[n.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",n[n.AfterRenderHooksStart=16]="AfterRenderHooksStart",n[n.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",n[n.ComponentStart=18]="ComponentStart",n[n.ComponentEnd=19]="ComponentEnd",n[n.DeferBlockStateStart=20]="DeferBlockStateStart",n[n.DeferBlockStateEnd=21]="DeferBlockStateEnd",n[n.DynamicComponentStart=22]="DynamicComponentStart",n[n.DynamicComponentEnd=23]="DynamicComponentEnd",n[n.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",n[n.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",n})(St||{});function hC(n,e,t,i){e!==null?e.applyValueToInputSignal(e,i):n[t]=i}var pC=null;function mC(){return pC}var bx=[];var Nt=function(n,e=null,t){for(let i=0;i<bx.length;i++){let r=bx[i];r(n,e,t)}};function gC(n,e,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:s}=e.type.prototype;if(i){let o=mC()(e);(t.preOrderHooks??=[]).push(n,o),(t.preOrderCheckHooks??=[]).push(n,o)}r&&(t.preOrderHooks??=[]).push(0-n,r),s&&((t.preOrderHooks??=[]).push(n,s),(t.preOrderCheckHooks??=[]).push(n,s))}function yC(n,e){for(let t=e.directiveStart,i=e.directiveEnd;t<i;t++){let s=n.data[t].type.prototype,{ngAfterContentInit:o,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=s;o&&(n.contentHooks??=[]).push(-t,o),a&&((n.contentHooks??=[]).push(t,a),(n.contentCheckHooks??=[]).push(t,a)),c&&(n.viewHooks??=[]).push(-t,c),l&&((n.viewHooks??=[]).push(t,l),(n.viewCheckHooks??=[]).push(t,l)),u!=null&&(n.destroyHooks??=[]).push(t,u)}}function Ed(n,e,t){Jx(n,e,3,t)}function Sd(n,e,t,i){(n[We]&3)===t&&Jx(n,e,t,i)}function pg(n,e){let t=n[We];(t&3)===e&&(t&=16383,t+=1,n[We]=t)}function Jx(n,e,t,i){let r=i!==void 0?n[Js]&65535:0,s=i??-1,o=e.length-1,a=0;for(let c=r;c<o;c++)if(typeof e[c+1]=="number"){if(a=e[c],i!=null&&a>=i)break}else e[c]<0&&(n[Js]+=65536),(a<s||s==-1)&&(vC(n,t,e,c),n[Js]=(n[Js]&4294901760)+c+2),c++}function Mx(n,e){Nt(St.LifecycleHookStart,n,e);let t=Ne(null);try{e.call(n)}finally{Ne(t),Nt(St.LifecycleHookEnd,n,e)}}function vC(n,e,t,i){let r=t[i]<0,s=t[i+1],o=r?-t[i]:t[i],a=n[o];r?n[We]>>14<n[Js]>>16&&(n[We]&3)===e&&(n[We]+=16384,Mx(a,s)):Mx(a,s)}var Qo=-1,Ac=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,i,r){this.factory=e,this.name=r,this.canSeeViewProviders=t,this.injectImpl=i}};function _C(n){return(n.flags&8)!==0}function xC(n){return(n.flags&16)!==0}function EC(n,e,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let s=t[i++],o=t[i++],a=t[i++];n.setAttribute(e,o,a,s)}else{let s=r,o=t[++i];bC(s)?n.setProperty(e,s,o):n.setAttribute(e,s,o),i++}}return i}function SC(n){return n===3||n===4||n===6}function bC(n){return n.charCodeAt(0)===64}function Bd(n,e){if(!(e===null||e.length===0))if(n===null||n.length===0)n=e.slice();else{let t=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?Tx(n,t,r,null,e[++i]):Tx(n,t,r,null,null))}}return n}function Tx(n,e,t,i,r){let s=0,o=n.length;if(e===-1)o=-1;else for(;s<n.length;){let a=n[s++];if(typeof a=="number"){if(a===e){o=-1;break}else if(a>e){o=s-1;break}}}for(;s<n.length;){let a=n[s];if(typeof a=="number")break;if(a===t){r!==null&&(n[s+1]=r);return}s++,r!==null&&s++}o!==-1&&(n.splice(o,0,e),s=o+1),n.splice(s++,0,t),r!==null&&n.splice(s++,0,r)}function Qx(n){return n!==Qo}function wd(n){return n&32767}function MC(n){return n>>16}function Cd(n,e){let t=MC(n),i=e;for(;t>0;)i=i[ns],t--;return i}var Sg=!0;function Dd(n){let e=Sg;return Sg=n,e}var TC=256,eE=TC-1,tE=5,wC=0,er={};function CC(n,e,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:Object.hasOwn(t,Xs)&&(i=t[Xs]),i==null&&(i=t[Xs]=wC++);let r=i&eE,s=1<<r;e.data[n+(r>>tE)]|=s}function nE(n,e){let t=iE(n,e);if(t!==-1)return t;let i=e[Be];i.firstCreatePass&&(n.injectorIndex=e.length,mg(i.data,n),mg(e,null),mg(i.blueprint,null));let r=Kg(n,e),s=n.injectorIndex;if(Qx(r)){let o=wd(r),a=Cd(r,e),c=a[Be].data;for(let l=0;l<8;l++)e[s+l]=a[o+l]|c[o+l]}return e[s+8]=r,s}function mg(n,e){n.push(0,0,0,0,0,0,0,0,e)}function iE(n,e){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||e[n.injectorIndex+8]===null?-1:n.injectorIndex}function Kg(n,e){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let t=0,i=null,r=e;for(;r!==null;){if(i=cE(r),i===null)return Qo;if(t++,r=r[ns],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return Qo}function DC(n,e,t){CC(n,e,t)}function rE(n,e,t){if(t&8||n!==void 0)return n;ed(e,"NodeInjector")}function sE(n,e,t,i){if(t&8&&i===void 0&&(i=null),(t&3)===0){let r=n[br],s=kn(void 0);try{return r?r.get(e,i,t&8):Pm(e,i,t&8)}finally{kn(s)}}return rE(i,e,t)}function oE(n,e,t,i=0,r){if(n!==null){if(e[We]&2048&&!(i&2)){let o=NC(n,e,t,i,er);if(o!==er)return o}let s=aE(n,e,t,i,er);if(s!==er)return s}return sE(e,t,i,r)}function aE(n,e,t,i,r){let s=IC(t);if(typeof s=="function"){if(!sg(e,n,i))return i&1?rE(r,t,i):sE(e,t,i,r);try{let o;if(o=s(i),o==null&&!(i&8))ed(t);else return o}finally{og()}}else if(typeof s=="number"){let o=null,a=iE(n,e),c=Qo,l=i&1?e[ii][Xn]:null;for((a===-1||i&4)&&(c=a===-1?Kg(n,e):e[a+8],c===Qo||!Cx(i,!1)?a=-1:(o=e[Be],a=wd(c),e=Cd(c,e)));a!==-1;){let u=e[Be];if(wx(s,a,u.data)){let d=AC(a,e,t,o,i,l);if(d!==er)return d}c=e[a+8],c!==Qo&&Cx(i,e[Be].data[a+8]===l)&&wx(s,a,e)?(o=u,a=wd(c),e=Cd(c,e)):a=-1}}return r}function AC(n,e,t,i,r,s){let o=e[Be],a=o.data[n+8],c=i==null?to(a)&&Sg:i!=o&&(a.type&3)!==0,l=r&1&&s===a,u=bd(a,o,t,c,l);return u!==null?Ad(e,o,u,a,r):er}function bd(n,e,t,i,r){let s=n.providerIndexes,o=e.data,a=s&1048575,c=n.directiveStart,l=n.directiveEnd,u=s>>20,d=i?a:a+u,h=r?a+u:l;for(let f=d;f<h;f++){let g=o[f];if(f<c&&t===g||f>=c&&g.type===t)return f}if(r){let f=o[c];if(f&&no(f)&&f.type===t)return c}return null}function Ad(n,e,t,i,r){let s=n[t],o=e.data;if(s instanceof Ac){let a=s;if(a.resolving)throw Nm("");let c=Dd(a.canSeeViewProviders);a.resolving=!0;let l=o[t].type||o[t],u,d=a.injectImpl?kn(a.injectImpl):null,h=sg(n,i,0);try{s=n[t]=a.factory(void 0,r,o,n,i),e.firstCreatePass&&t>=i.directiveStart&&gC(t,o[t],e)}finally{d!==null&&kn(d),Dd(c),a.resolving=!1,og()}}return s}function IC(n){if(typeof n=="string")return n.charCodeAt(0)||0;let e=Object.hasOwn(n,Xs)?n[Xs]:void 0;return typeof e=="number"?e>=0?e&eE:RC:e}function wx(n,e,t){let i=1<<n;return!!(t[e+(n>>tE)]&i)}function Cx(n,e){return!(n&2)&&!(n&1&&e)}var wr=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,i){return oE(this._tNode,this._lView,e,js(i),t)}};function RC(){return new wr(Ei(),_t())}function NC(n,e,t,i,r){let s=n,o=e;for(;s!==null&&o!==null&&o[We]&2048&&!$o(o);){let a=aE(s,o,t,i|2,er);if(a!==er)return a;i&=-5;let c=s.parent;if(!c){let l=o[Vm];if(l){let u=l.get(t,er,i);if(u!==er)return u}c=cE(o),o=o[ns]}s=c}return r}function cE(n){let e=n[Be],t=e.type;return t===2?e.declTNode:t===1?n[Xn]:null}function as(n){return{token:n.token,providedIn:n.autoProvided===!1?null:"root",factory:n.factory,value:void 0}}function PC(){return ra(Ei(),_t())}function ra(n,e){return new sa(Ni(n,e))}var sa=(()=>{class n{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=PC}return n})();function OC(n){return n instanceof sa?n.nativeElement:n}function LC(){return this._results[Symbol.iterator]()}var Id=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new pi}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let i=R0(e);(this._changesDetected=!I0(this._results,i,t))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=LC};function lE(n){return(n.flags&128)===128}var Jg=(function(n){return n[n.OnPush=0]="OnPush",n[n.Eager=1]="Eager",n[n.Default=1]="Default",n})(Jg||{}),uE=new Map,FC=0;function kC(){return FC++}function UC(n){uE.set(n[yc],n)}function bg(n){uE.delete(n[yc])}var Dx="__ngContext__";function ea(n,e){rs(e)?(n[Dx]=e[yc],UC(e)):n[Dx]=e}function dE(n){return hE(n[Wo])}function fE(n){return hE(n[_i])}function hE(n){for(;n!==null&&!xi(n);)n=n[_i];return n}var Mg;function Qg(n){Mg=n}function pE(){if(Mg!==void 0)return Mg;if(typeof document<"u")return document;throw new Oe(210,!1)}var mE="r";var gE="di";var yE=!1,vE=new Xe("",{factory:()=>yE});var Ax=new WeakMap;function BC(n,e){if(n==null||typeof n!="object")return;let t=Ax.get(n);t||(t=new WeakSet,Ax.set(n,t)),t.add(e)}var VC=(n,e,t,i)=>{};function HC(n,e,t,i){VC(n,e,t,i)}function ey(n){return(n.flags&32)===32}var zC=()=>null;function _E(n,e,t=!1){return zC(n,e,t)}function xE(n,e){let t=n.contentQueries;if(t!==null){let i=Ne(null);try{for(let r=0;r<t.length;r+=2){let s=t[r],o=t[r+1];if(o!==-1){let a=n.data[o];fd(s),a.contentQueries(2,e[o],o)}}}finally{Ne(i)}}}function Tg(n,e,t){fd(0);let i=Ne(null);try{e(n,t)}finally{Ne(i)}}function EE(n,e,t){if(zm(e)){let i=Ne(null);try{let r=e.directiveStart,s=e.directiveEnd;for(let o=r;o<s;o++){let a=n.data[o];if(a.contentQueries){let c=t[o];a.contentQueries(1,c,o)}}}finally{Ne(i)}}}var Oi=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n[n.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",n})(Oi||{}),wg=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}`}};function Rd(n){return n instanceof wg?n.changingThisBreaksApplicationSecurity:n}function GC(n,e){return n.createText(e)}function jC(n,e,t){n.setValue(e,t)}function SE(n,e,t){return n.createElement(e,t)}function so(n,e,t,i,r){n.insertBefore(e,t,i,r)}function bE(n,e,t){n.appendChild(e,t)}function Ix(n,e,t,i,r){i!==null?so(n,e,t,i,r):bE(n,e,t)}function ME(n,e,t,i){n.removeChild(null,e,t,i)}function WC(n,e,t,i,r,s,o){if(s==null)o?.(s,i||"",r),n.removeAttribute(e,r,t);else{let a=o==null?Rm(s):o(s,i||"",r);n.setAttribute(e,r,a,t)}}function $C(n,e,t){n.setAttribute(e,"style",t)}function qC(n,e,t){t===""?n.removeAttribute(e,"class"):n.setAttribute(e,"class",t)}function TE(n,e,t){let{mergedAttrs:i,classes:r,styles:s}=t;i!==null&&EC(n,e,i),r!==null&&qC(n,e,r),s!==null&&$C(n,e,s)}function XC(n,e,t){let i=n.length;for(;;){let r=n.indexOf(e,t);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let s=e.length;if(r+s===i||n.charCodeAt(r+s)<=32)return r}t=r+1}}var wE="ng-template";function YC(n,e,t,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&XC(e[r+1].toLowerCase(),t,0)!==-1)return!0}else if(ty(n))return!1;if(r=e.indexOf(1,r),r>-1){let s;for(;++r<e.length&&typeof(s=e[r])=="string";)if(s.toLowerCase()===t)return!0}return!1}function ty(n){return n.type===4&&n.value!==wE}function ZC(n,e,t){let i=n.type===4&&!t?wE:n.value;return e===i}function KC(n,e,t){let i=4,r=n.attrs,s=r!==null?eD(r):0,o=!1;for(let a=0;a<e.length;a++){let c=e[a];if(typeof c=="number"){if(!o&&!Pi(i)&&!Pi(c))return!1;if(o&&Pi(c))continue;o=!1,i=c|i&1;continue}if(!o)if(i&4){if(i=2|i&1,c!==""&&!ZC(n,c,t)||c===""&&e.length===1){if(Pi(i))return!1;o=!0}}else if(i&8){if(r===null||!YC(n,r,c,t)){if(Pi(i))return!1;o=!0}}else{let l=e[++a],u=JC(c,r,ty(n),t);if(u===-1){if(Pi(i))return!1;o=!0;continue}if(l!==""){let d;if(u>s?d="":d=r[u+1].toLowerCase(),i&2&&l!==d){if(Pi(i))return!1;o=!0}}}}return Pi(i)||o}function Pi(n){return(n&1)===0}function JC(n,e,t,i){if(e===null)return-1;let r=0;if(i||!t){let s=!1;for(;r<e.length;){let o=e[r];if(o===n)return r;if(o===3||o===6)s=!0;else if(o===1||o===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(o===4)break;if(o===0){r+=4;continue}}r+=s?1:2}return-1}else return tD(e,n)}function QC(n,e,t=!1){for(let i=0;i<e.length;i++)if(KC(n,e[i],t))return!0;return!1}function eD(n){for(let e=0;e<n.length;e++){let t=n[e];if(SC(t))return e}return n.length}function tD(n,e){let t=n.indexOf(4);if(t>-1)for(t++;t<n.length;){let i=n[t];if(typeof i=="number")return-1;if(i===e)return t;t++}return-1}function Rx(n,e){return n?":not("+e.trim()+")":e}function nD(n){let e=n[0],t=1,i=2,r="",s=!1;for(;t<n.length;){let o=n[t];if(typeof o=="string")if(i&2){let a=n[++t];r+="["+o+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+o:i&4&&(r+=" "+o);else r!==""&&!Pi(o)&&(e+=Rx(s,r),r=""),i=o,s=s||!Pi(i);t++}return r!==""&&(e+=Rx(s,r)),e}function iD(n){return n.map(nD).join(",")}function rD(n){let e=[],t=[],i=1,r=2;for(;i<n.length;){let s=n[i];if(typeof s=="string")r===2?s!==""&&e.push(s,n[++i]):r===8&&t.push(s);else{if(!Pi(r))break;r=s}i++}return t.length&&e.push(1,...t),e}var nr={},tr=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(tr||{}),sD;function ny(n,e){return sD(n,e)}var iy=new Set;var PV=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Cg=new WeakMap;function CE(n){return n?n[ns]??n:null}var Ko=new WeakSet;function oD(n,e,t){let i=Cg.get(n);if(!i||i.length===0)return;let r=e.parentNode,s=e.previousSibling,o=CE(t);for(let a=i.length-1;a>=0;a--){let{el:c,declarationView:l}=i[a],u=c.parentNode;c===e?(i.splice(a,1),Ko.add(c),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):s&&c===s?(i.splice(a,1),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),c.parentNode?.removeChild(c)):u&&r&&u!==r&&(o===null||l===null||o===l)&&(i.splice(a,1),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),c.parentNode?.removeChild(c))}}function aD(n,e,t){let i=CE(t),r=Cg.get(n);r?r.some(s=>s.el===e)||r.push({el:e,declarationView:i}):Cg.set(n,[{el:e,declarationView:i}])}var ry=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(ry||{}),cs=new Xe(""),Nx=new Set;function oa(n){Nx.has(n)||(Nx.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var DE=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=ht({token:n,providedIn:"root",factory:()=>new n})}return n})();var Dg=null,AE=null;function Px(n,e,t,i){Dg?.maybeQueueEnterAnimation(n,e,t,i)}function Ox(n,e,t,i){Dg===null?i(!1):Dg.runLeaveAnimationsWithCallback(n,e,t,i)}function cD(n){AE?.initViewDetachAnimations(n)}function lD(n){AE?.clearViewDetachAnimations(n)}function Jo(n,e,t,i,r,s,o,a){if(r!=null){let c,l=!1;xi(r)?c=r:rs(r)&&(l=!0,r=r[Ri]);let u=xn(r);n===0&&i!==null?(Px(a,i,s,t),o==null?bE(e,i,u):so(e,i,u,o||null,!0)):n===1&&i!==null?(so(e,i,u,o||null,!0),oD(s,u,a),Ko.has(u)||Px(a,i,s,t)):n===2?(a?.[V0]?.leave?.has(s.index)&&aD(s,u,a),Ko.delete(u),Ox(a,s,t,d=>{if(Ko.has(u)){Ko.delete(u);return}ME(e,u,l,d)})):n===3&&(Ko.delete(u),Ox(a,s,t,()=>{e.destroyNode(u)})),c!=null&&SD(e,n,t,c,s,i,o)}}function uD(n,e){IE(n,e),e[Ri]=null,e[Xn]=null}function dD(n,e,t,i,r,s){i[Ri]=r,i[Xn]=e,Hd(n,i,t,1,r,s)}function IE(n,e){e[Ki].changeDetectionScheduler?.notify(9),Hd(n,e,e[nn],2,null,null)}function fD(n){let e=n[Wo];if(!e)return gg(n[Be],n);for(;e;){let t=null;if(rs(e))t=e[Wo];else{let i=e[Kt];i&&(t=i)}if(!t){for(;e&&!e[_i]&&e!==n;)rs(e)&&gg(e[Be],e),e=e[en];e===null&&(e=n),rs(e)&&gg(e[Be],e),t=e&&e[_i]}e=t}}function sy(n,e){let t=n[eo],i=t.indexOf(e);t.splice(i,1)}function Vd(n,e){if(io(e))return;let t=e[nn];t.destroyNode&&Hd(n,e,t,3,null,null),fD(e)}function gg(n,e){if(io(e))return;let t=Ne(null);try{e[We]&=-129,e[We]|=256,e[ri]&&Io(e[ri]),pD(n,e),hD(n,e),e[Be].type===1&&e[nn].destroy();let i=e[is];if(i!==null&&xi(e[en])){i!==e[en]&&sy(i,e);let r=e[Ji];r!==null&&r.detachView(n)}bg(e)}finally{Ne(t)}}function hD(n,e){let t=n.cleanup,i=e[jo];if(t!==null)for(let o=0;o<t.length-1;o+=2)if(typeof t[o]=="string"){let a=t[o+3];a>=0?i[a]():i[-a].unsubscribe(),o+=2}else{let a=i[t[o+1]];t[o].call(a)}i!==null&&(e[jo]=null);let r=e[xr];if(r!==null){e[xr]=null;for(let o=0;o<r.length;o++){let a=r[o];a()}}let s=e[Er];if(s!==null){e[Er]=null;for(let o of s)o.destroy()}}function pD(n,e){let t;if(n!=null&&(t=n.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=e[t[i]];if(!(r instanceof Ac)){let s=t[i+1];if(Array.isArray(s))for(let o=0;o<s.length;o+=2){let a=r[s[o]],c=s[o+1];Nt(St.LifecycleHookStart,a,c);try{c.call(a)}finally{Nt(St.LifecycleHookEnd,a,c)}}else{Nt(St.LifecycleHookStart,r,s);try{s.call(r)}finally{Nt(St.LifecycleHookEnd,r,s)}}}}}function mD(n,e,t){if(e===null)throw new Oe(510,!1);return gD(n,e.parent,t)}function gD(n,e,t){let i=e;for(;i!==null&&i.type&168;)e=i,i=e.parent;if(i===null)return t[Ri];if(to(i)){let{encapsulation:r}=n.data[i.directiveStart+i.componentOffset];if(r===Oi.None||r===Oi.Emulated)return null}return Ni(i,t)}function yD(n,e,t){return _D(n,e,t)}function vD(n,e,t){return n.type&40?Ni(n,t):null}var _D=vD,Lx;function oy(n,e,t,i){let r=mD(n,i,e),s=e[nn],o=i.parent||e[Xn],a=yD(o,i,e);if(r!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)Ix(s,r,t[c],a,!1);else Ix(s,r,t,a,!1);Lx!==void 0&&Lx(s,i,e,t,r)}function Cc(n,e){if(e!==null){let t=e.type;if(t&3)return Ni(e,n);if(t&4)return Ag(-1,n[e.index]);if(t&8){let i=e.child;if(i!==null)return Cc(n,i);{let r=n[e.index];return xi(r)?Ag(-1,r):xn(r)}}else{if(t&128)return Cc(n,e.next);if(t&32)return ny(e,n)()||xn(n[e.index]);{let i=RE(n,e);if(i!==null){if(Array.isArray(i))return i[0];let r=Sr(n[ii]);return Cc(r,i)}else return Cc(n,e.next)}}}return null}function RE(n,e){if(e!==null){let i=n[ii][Xn],r=e.projection;return i.projection[r]}return null}function Ag(n,e){let t=Kt+n+1;if(t<e.length){let i=e[t],r=i[Be].firstChild;if(r!==null)return Cc(i,r)}return e[Qs]}function ay(n,e,t,i,r,s,o){for(;t!=null;){let a=i[br];if(t.type===128){t=t.next;continue}let c=i[t.index],l=t.type;if(o&&e===0&&(c&&ea(xn(c),i),t.flags|=2),!ey(t))if(l&8)ay(n,e,t.child,i,r,s,!1),Jo(e,n,a,r,c,t,s,i);else if(l&32){let u=ny(t,i),d;for(;d=u();)Jo(e,n,a,r,d,t,s,i);Jo(e,n,a,r,c,t,s,i)}else l&16?ED(n,e,i,t,r,s):Jo(e,n,a,r,c,t,s,i);t=o?t.projectionNext:t.next}}function Hd(n,e,t,i,r,s){n.type===3?xD(t,i,e,r,s):ay(t,i,n.firstChild,e,r,s,!1)}function xD(n,e,t,i,r){let o=t[Be].firstChild,a=o.next,c=xn(t[o.index]),l=xn(t[a.index]),u=a.index+1,d=t[u];if(e===1||e===0)i!==null&&(d&&d.hasChildNodes()?so(n,i,d,r,!0):(so(n,i,c,r,!0),so(n,i,l,r,!0)));else if(e===2){if(d||(d=document.createDocumentFragment(),t[u]=d),c&&c.parentNode===d)return;let h=c;for(;h!==null;){let f=h.nextSibling;if(d.appendChild(h),h===l)break;h=f}}}function ED(n,e,t,i,r,s){let o=t[ii],c=o[Xn].projection[i.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];Jo(e,n,t[br],r,u,i,s,t)}else{let l=c,u=o[en];lE(i)&&(l.flags|=128),ay(n,e,l,u,r,s,!0)}}function SD(n,e,t,i,r,s,o){let a=i[Qs],c=xn(i);if(a!==c&&Jo(e,n,t,s,a,r,o),(i[We]&4)===0)for(let l=Kt;l<i.length;l++){let u=i[l];Hd(u[Be],u,n,e,s,a)}}function bD(n,e,t,i,r){if(e)r?n.addClass(t,i):n.removeClass(t,i);else{let s=i.indexOf("-")===-1?void 0:tr.DashCase;r==null?n.removeStyle(t,i,s):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),s|=tr.Important),n.setStyle(t,i,r,s))}}function cy(n,e,t,i,r,s,o,a,c,l,u){let d=on+i,h=d+r,f=MD(d,h),g=typeof l=="function"?l():l;return f[Be]={type:n,blueprint:f,template:t,queries:null,viewQuery:a,declTNode:e,data:f.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof s=="function"?s():s,pipeRegistry:typeof o=="function"?o():o,firstChild:null,schemas:c,consts:g,incompleteFirstPass:!1,ssrId:u}}function MD(n,e){let t=[];for(let i=0;i<e;i++)t.push(i<n?null:nr);return t}function TD(n){let e=n.tView;return e===null||e.incompleteFirstPass?n.tView=cy(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):e}function ly(n,e,t,i,r,s,o,a,c,l,u){let d=e.blueprint.slice();return d[Ri]=r,d[We]=i|4|128|8|64|1024,(l!==null||n&&n[We]&2048)&&(d[We]|=2048),qm(d),d[en]=d[ns]=n,d[tn]=t,d[Ki]=o||n&&n[Ki],d[nn]=a||n&&n[nn],d[br]=c||n&&n[br]||null,d[Xn]=s,d[yc]=kC(),d[Go]=u,d[Vm]=l,d[ii]=e.type==2?n[ii]:d,d}function wD(n,e,t){let i=Ni(e,n),r=TD(t),s=n[Ki].rendererFactory,o=uy(n,ly(n,r,null,NE(t),i,e,null,s.createRenderer(i,t),null,null,null));return n[e.index]=o}function NE(n){let e=16;return n.signals?e=4096:n.onPush&&(e=64),e}function PE(n,e,t,i){if(t===0)return-1;let r=e.length;for(let s=0;s<t;s++)e.push(i),n.blueprint.push(i),n.data.push(null);return r}function uy(n,e){return n[Wo]?n[Bm][_i]=e:n[Wo]=e,n[Bm]=e,e}function Ue(n=1){OE(Un(),_t(),ss()+n,!1)}function OE(n,e,t,i){if(!i)if((e[We]&3)===3){let s=n.preOrderCheckHooks;s!==null&&Ed(e,s,t)}else{let s=n.preOrderHooks;s!==null&&Sd(e,s,0,t)}os(t)}var zd=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(zd||{});function Ig(n,e,t,i){let r=Ne(null);try{let[s,o,a]=n.inputs[t],c=null;(o&zd.SignalBased)!==0&&(c=e[s][fi]),c!==null&&c.transformFn!==void 0?i=c.transformFn(i):a!==null&&(i=a.call(e,i)),n.setInput!==null?n.setInput(e,c,i,t,s):hC(e,c,s,i)}finally{Ne(r)}}function LE(n,e,t,i,r){let s=ss(),o=i&2;try{os(-1),o&&e.length>on&&OE(n,e,on,!1);let a=o?St.TemplateUpdateStart:St.TemplateCreateStart;Nt(a,r,t),t(i,r)}finally{os(s);let a=o?St.TemplateUpdateEnd:St.TemplateCreateEnd;Nt(a,r,t)}}function FE(n,e,t){RD(n,e,t),(t.flags&64)===64&&ND(n,e,t)}function dy(n,e,t=Ni){let i=e.localNames;if(i!==null){let r=e.index+1;for(let s=0;s<i.length;s+=2){let o=i[s+1],a=o===-1?t(e,n):n[o];n[r++]=a}}}function CD(n,e,t,i){let s=i.get(vE,yE)||t===Oi.ShadowDom||t===Oi.ExperimentalIsolatedShadowDom,o=n.selectRootElement(e,s);return DD(o),o}function DD(n){AD(n)}var AD=()=>null;function ID(n,e,t,i,r,s){if(n.type&3){let o=Ni(n,e);i=s!=null?s(i,n.value||"",t):i,i=kE(t,o,i),r.setProperty(o,t,i)}else n.type&12}function kE(n,e,t,i=!1){return n==="src"&&(e.tagName==="IMG"||e.tagName==="VIDEO")?t==null?i?t:"":Rd(t):t}function RD(n,e,t){let i=t.directiveStart,r=t.directiveEnd;to(t)&&wD(e,t,n.data[i+t.componentOffset]),n.firstCreatePass||nE(t,e);let s=t.initialInputs;for(let o=i;o<r;o++){let a=n.data[o],c=Ad(e,n,o,t);if(ea(c,e),s!==null&&FD(e,o-i,c,a,t,s),no(a)){let l=Mr(t.index,e);l[tn]=Ad(e,n,o,t)}}}function ND(n,e,t){let i=t.directiveStart,r=t.directiveEnd,s=t.index,o=rx();try{os(s);for(let a=i;a<r;a++){let c=n.data[a],l=e[a];dd(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&PD(c,l)}}finally{os(-1),dd(o)}}function PD(n,e){n.hostBindings!==null&&n.hostBindings(1,e)}function OD(n,e){let t=n.directiveRegistry,i=null;if(t)for(let r=0;r<t.length;r++){let s=t[r];QC(e,s.selectors,!1)&&(i??=[],no(s)?i.unshift(s):i.push(s))}return i}function LD(n,e,t,i,r,s){let o=Ni(n,e);i=kE(t,o,i,!0),WC(e[nn],o,s,n.value,t,i,r)}function FD(n,e,t,i,r,s){let o=s[e];if(o!==null)for(let a=0;a<o.length;a+=2){let c=o[a],l=o[a+1];Ig(i,t,c,l)}}function UE(n,e,t,i,r){let s=on+t,o=e[Be],a=r(o,e,n,i,t);e[s]=a,Xo(n,!0);let c=n.type===2;return c?(TE(e[nn],a,n),(X0()===0||od(n))&&ea(a,e),Y0()):ea(a,e),md()&&(!c||!ey(n))&&oy(o,e,a,n),n}function BE(n){let e=n;return tg()?Q0():(e=e.parent,Xo(e,!1)),e}function kD(n,e){let t=n[br];if(!t)return;let i;try{i=t.get(Tr,null)}catch{i=null}i?.(e)}function VE(n,e,t,i,r){let s=n.inputs?.[i],o=n.hostDirectiveInputs?.[i],a=!1;if(o)for(let c=0;c<o.length;c+=2){let l=o[c],u=o[c+1],d=e.data[l];Ig(d,t[l],u,r),a=!0}if(s)for(let c of s){let l=t[c],u=e.data[c];Ig(u,l,i,r),a=!0}return a}function UD(n,e){let t=Mr(e,n),i=t[Be];BD(i,t);let r=t[Ri];r!==null&&t[Go]===null&&(t[Go]=_E(r,t[br])),Nt(St.ComponentStart);try{fy(i,t,t[tn])}finally{Nt(St.ComponentEnd,t[tn])}}function BD(n,e){for(let t=e.length;t<n.blueprint.length;t++)e.push(n.blueprint[t])}function fy(n,e,t){hd(e);try{let i=n.viewQuery;i!==null&&Tg(1,i,t);let r=n.template;r!==null&&LE(n,e,r,1,t),n.firstCreatePass&&(n.firstCreatePass=!1),e[Ji]?.finishViewCreation(n),n.staticContentQueries&&xE(n,e),n.staticViewQueries&&Tg(2,n.viewQuery,t);let s=n.components;s!==null&&VD(e,s)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{e[We]&=-5,pd()}}function VD(n,e){for(let t=0;t<e.length;t++)UD(n,e[t])}function Gd(n,e,t,i){let r=Ne(null);try{let s=e.tView,a=n[We]&4096?4096:16,c=ly(n,s,t,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),l=n[e.index];c[is]=l;let u=n[Ji];return u!==null&&(c[Ji]=u.createEmbeddedView(s)),fy(s,c,t),c}finally{Ne(r)}}function Ic(n,e){return!e||e.firstChild===null||lE(n)}function Rc(n,e,t,i,r=!1){if(n.type===3){let s=n.firstChild,o=s.next,a=xn(e[s.index]),c=xn(e[o.index]),l=a;for(;l!==null&&(i.push(l),l!==c);)l=l.nextSibling;return i}for(;t!==null;){if(t.type===128){t=r?t.projectionNext:t.next;continue}let s=e[t.index];if(s!==null)if(xi(s)){let a=s[Qs];a!==s[Ri]&&i.push(xn(s)),s[We]&4||HE(s,i),i.push(a)}else i.push(xn(s));let o=t.type;if(o&8)Rc(n,e,t.child,i);else if(o&32){let a=ny(t,e),c;for(;c=a();)i.push(c)}else if(o&16){let a=RE(e,t);if(Array.isArray(a))i.push(...a);else{let c=Sr(e[ii]);Rc(c[Be],c,a,i,!0)}}t=r?t.projectionNext:t.next}return i}function HE(n,e){for(let t=Kt;t<n.length;t++){let i=n[t],r=i[Be].firstChild;r!==null&&Rc(i[Be],i,r,e)}}function zE(n){if(n[sd]!==null){for(let e of n[sd])e.impl.addSequence(e);n[sd].length=0}}var GE=[];function HD(n){return n[ri]??zD(n)}function zD(n){let e=GE.pop()??Object.create(jD);return e.lView=n,e}function GD(n){n.lView[ri]!==n&&(n.lView=null,GE.push(n))}var jD=Zt(mt({},Bs),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{qo(n.lView)},consumerOnSignalRead(){this.lView[ri]=this}});function WD(n){let e=n[ri]??Object.create($D);return e.lView=n,e}var $D=Zt(mt({},Bs),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let e=Sr(n.lView);for(;e&&!jE(e[Be]);)e=Sr(e);e&&Xm(e)},consumerOnSignalRead(){this.lView[ri]=this}});function jE(n){return n.type!==2}function WE(n){if(n[Er]===null)return;let e=!0;for(;e;){let t=!1;for(let i of n[Er])if(i.dirty&&(t=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()),n[Er]===null))return;e=t&&!!(n[We]&8192)}}var qD=100;function $E(n,e=0){let i=n[Ki].rendererFactory,r=!1;r||i.begin?.();try{XD(n,e)}finally{r||i.end?.()}}function XD(n,e){let t=ng();try{fc(!0),Rg(n,e);let i=0;for(;xc(n);){if(i===qD)throw new Oe(103,!1);i++,Rg(n,1)}}finally{fc(t)}}function YD(n,e,t,i){if(io(e))return;let r=e[We],s=!1,o=!1;hd(e);let a=!0,c=null,l=null;s||(jE(n)?(l=HD(e),c=Ao(l)):yu()===null?(a=!1,l=WD(e),c=Ao(l)):e[ri]&&(Io(e[ri]),e[ri]=null));try{qm(e),ex(n.bindingStartIndex),t!==null&&LE(n,e,t,2,i);let u=(r&3)===3;if(!s)if(u){let f=n.preOrderCheckHooks;f!==null&&Ed(e,f,null)}else{let f=n.preOrderHooks;f!==null&&Sd(e,f,0,null),pg(e,0)}if(o||ZD(e),WE(e),XE(e,0),n.contentQueries!==null&&xE(n,e),!s)if(u){let f=n.contentCheckHooks;f!==null&&Ed(e,f)}else{let f=n.contentHooks;f!==null&&Sd(e,f,1),pg(e,1)}JD(n,e);let d=n.components;d!==null&&ZE(e,d,0);let h=n.viewQuery;if(h!==null&&Tg(2,h,i),!s)if(u){let f=n.viewCheckHooks;f!==null&&Ed(e,f)}else{let f=n.viewHooks;f!==null&&Sd(e,f,2),pg(e,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),e[rd]){for(let f of e[rd])f();e[rd]=null}s||(zE(e),e[We]&=-73)}catch(u){qE(e,u,s)}finally{l!==null&&(ac(l,c),a&&GD(l)),pd()}}function qE(n,e,t){let i=!1,r=e,s=n,o=Ne(null);try{for(;s!==null;){if(xi(s)){s=s[en];continue}let a=s[vc];if(a)try{let c=n[ii][tn],l=c?.constructor,u={declarationInstance:c,declarationType:l,caughtBy:a},d=Ne(null);try{a(yx(r),u)}finally{Ne(d)}i=!0;break}catch(c){r=c}s=s[en]}}finally{Ne(o)}if(!i)throw t||qo(n),r}function XE(n,e){for(let t=dE(n);t!==null;t=fE(t))for(let i=Kt;i<t.length;i++){let r=t[i];YE(r,e)}}function ZD(n){for(let e=dE(n);e!==null;e=fE(e)){if(!(e[We]&2))continue;let t=e[eo];for(let i=0;i<t.length;i++){let r=t[i];Xm(r)}}}function KD(n,e,t){Nt(St.ComponentStart);let i=Mr(e,n);try{YE(i,t)}finally{Nt(St.ComponentEnd,i[tn])}}function YE(n,e){cd(n)&&Rg(n,e)}function Rg(n,e){let i=n[Be],r=n[We],s=n[ri],o=!!(e===0&&r&16);if(o||=!!(r&64&&e===0),o||=!!(r&1024),o||=!!(s?.dirty&&vu(s)),o||=!1,s&&(s.dirty=!1),n[We]&=-9217,o)YD(i,n,i.template,n[tn]);else if(r&8192){let a=Ne(null);try{try{WE(n)}catch(l){qE(n,l,!1)}XE(n,1);let c=i.components;c!==null&&ZE(n,c,1),zE(n)}finally{Ne(a)}}}function ZE(n,e,t){for(let i=0;i<e.length;i++)KD(n,e[i],t)}function JD(n,e){let t=n.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)os(~r);else{let s=r,o=t[++i],a=t[++i];ix(o,s);let c=e[s];Nt(St.HostBindingsUpdateStart,c);try{a(2,c)}finally{Nt(St.HostBindingsUpdateEnd,c)}}}}finally{os(-1)}}function hy(n,e){let t=ng()?64:1088;for(n[Ki].changeDetectionScheduler?.notify(e);n;){n[We]|=t;let i=Sr(n);if($o(n)&&!i)return n;n=i}return null}function KE(n,e,t,i){return[n,!0,0,e,null,i,null,t,null,null]}function JE(n,e){let t=Kt+e;if(t<n.length)return n[t]}function jd(n,e,t,i=!0){let r=e[Be];if(QD(r,e,n,t),i){let o=Ag(t,n),a=e[nn],c=a.parentNode(n[Qs]);c!==null&&dD(r,n[Xn],a,e,c,o)}let s=e[Go];s!==null&&s.firstChild!==null&&(s.firstChild=null)}function QE(n,e){let t=Nc(n,e);return t!==void 0&&Vd(t[Be],t),t}function Nc(n,e){if(n.length<=Kt)return;let t=Kt+e,i=n[t];if(i){let r=i[is];r!==null&&r!==n&&sy(r,i),e>0&&(n[t-1][_i]=i[_i]);let s=pc(n,Kt+e);uD(i[Be],i);let o=s[Ji];o!==null&&o.detachView(s[Be]),i[en]=null,i[_i]=null,i[We]&=-129}return i}function QD(n,e,t,i){let r=Kt+i,s=t.length;i>0&&(t[r-1][_i]=e),i<s-Kt?(e[_i]=t[r],Om(t,Kt+i,e)):(t.push(e),e[_i]=null),e[en]=t;let o=e[is];o!==null&&t!==o&&eS(o,e);let a=e[Ji];a!==null&&a.insertView(n),ld(e),e[We]|=128}function eS(n,e){let t=n[eo],i=e[en];if(rs(i))n[We]|=2;else{let r=i[en][ii];e[ii]!==r&&(n[We]|=2)}t===null?n[eo]=[e]:t.push(e)}var ta=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let e=this._lView,t=e[Be];return Rc(t,e,t.firstChild,[])}constructor(e,t){this._lView=e,this._cdRefInjectingView=t}get context(){return this._lView[tn]}set context(e){this._lView[tn]=e}get destroyed(){return io(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[en];if(xi(e)){let t=e[_c],i=t?t.indexOf(this):-1;i>-1&&(Nc(e,i),pc(t,i))}this._attachedToViewContainer=!1}Vd(this._lView[Be],this._lView)}onDestroy(e){ud(this._lView,e)}markForCheck(){hy(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[We]&=-129}reattach(){ld(this._lView),this._lView[We]|=128}detectChanges(){this._lView[We]|=1024,$E(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new Oe(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=$o(this._lView),t=this._lView[is];t!==null&&!e&&sy(t,this._lView),IE(this._lView[Be],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new Oe(902,!1);this._appRef=e;let t=$o(this._lView),i=this._lView[is];i!==null&&!t&&eS(i,this._lView),ld(this._lView)}};var na=(()=>{class n{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=eA;constructor(t,i,r){this._declarationLView=t,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,i){return this.createEmbeddedViewImpl(t,i)}createEmbeddedViewImpl(t,i,r){let s=Gd(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:i,dehydratedView:r});return new ta(s)}}return n})();function eA(){return py(Ei(),_t())}function py(n,e){return n.type&4?new na(e,n,ra(n,e)):null}function Wd(n,e,t,i,r){let s=n.data[e];if(s===null)s=tA(n,e,t,i,r),nx()&&(s.flags|=32);else if(s.type&64){s.type=t,s.value=i,s.attrs=r;let o=J0();s.injectorIndex=o===null?-1:o.injectorIndex}return Xo(s,!0),s}function tA(n,e,t,i,r){let s=eg(),o=tg(),a=o?s:s&&s.parent,c=n.data[e]=iA(n,a,t,e,i,r);return nA(n,c,s,o),c}function nA(n,e,t,i){n.firstChild===null&&(n.firstChild=e),t!==null&&(i?t.child==null&&e.parent!==null&&(t.child=e):t.next===null&&(t.next=e,e.prev=t))}function iA(n,e,t,i,r,s){let o=e?e.injectorIndex:-1,a=0;return K0()&&(a|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:o,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,namespace:cg(),attrs:s,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function rA(n){let e=n[Hm]??[],i=n[en][nn],r=[];for(let s of e)s.data[gE]!==void 0?r.push(s):sA(s,i);n[Hm]=r}function sA(n,e){let t=0,i=n.firstChild;if(i){let r=n.data[mE];for(;t<r;){let s=i.nextSibling;ME(e,i,!1),i=s,t++}}}var oA=()=>null,aA=()=>null;function Ng(n,e){return oA(n,e)}function tS(n,e,t){return aA(n,e,t)}var nS=class{},oo=class{};var iS=(()=>{class n{static \u0275prov=ht({token:n,providedIn:"root",factory:()=>null})}return n})();function rS(n){return n.debugInfo?.className||n.type.name||null}var Md={},Nd=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,i){let r=this.injector.get(e,Md,i);return r!==Md||t===Md?r:this.parentInjector.get(e,t,i)}};function sS(n,e,t){return n[e]=t}function Cr(n,e,t){if(t===nr)return!1;let i=n[e];return Object.is(i,t)?!1:(n[e]=t,!0)}function cA(n,e,t,i){let r=Cr(n,e,t);return Cr(n,e+1,i)||r}function Td(n,e,t){return function i(r){let s=i.__ngNativeEl__;s!==void 0&&BC(r,s);let o=to(n)?Mr(n.index,e):e;hy(o,5);let a=e[tn],c=Fx(e,a,t,r),l=i.__ngNextListenerFn__;for(;l;)c=Fx(e,a,l,r)&&c,l=l.__ngNextListenerFn__;return c}}function Fx(n,e,t,i){let r=Ne(null);try{return Nt(St.OutputStart,e,t),t(i)!==!1}catch(s){return kD(n,s),!1}finally{Nt(St.OutputEnd,e,t),Ne(r)}}function oS(n,e,t,i,r,s,o,a){let c=od(n),l=!1,u=null;if(!i&&c&&(u=uA(e,t,s,n.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=o,u.__ngLastListenerFn__=o,l=!0}else{let d=Ni(n,t),h=i?i(d):d;HC(t,h,s,a),i||(a.__ngNativeEl__=d);let f=r.listen(h,s,a);if(!lA(s)){let g=i?_=>i(xn(_[n.index])):n.index;aS(g,e,t,s,a,f,!1)}}return l}function lA(n){return n.startsWith("animation")||n.startsWith("transition")}function uA(n,e,t,i){let r=n.cleanup;if(r!=null)for(let s=0;s<r.length-1;s+=2){let o=r[s];if(o===t&&r[s+1]===i){let a=e[jo],c=r[s+2];return a&&a.length>c?a[c]:null}typeof o=="string"&&(s+=2)}return null}function aS(n,e,t,i,r,s,o){let a=e.firstCreatePass?Zm(e):null,c=Ym(t),l=c.length;c.push(r,s),a&&a.push(i,n,l,(l+1)*(o?-1:1))}function kx(n,e,t,i,r,s){let o=e[t],a=e[Be],l=a.data[t].outputs[i],d=o[l].subscribe(s);aS(n.index,a,e,r,s,d,!0)}var Pg=Symbol("BINDING");var lo=new Xe("");function Pd(n,e,t){let i=t?n.styles:null,r=t?n.classes:null,s=0;if(e!==null)for(let o=0;o<e.length;o++){let a=e[o];if(typeof a=="number")s=a;else if(s==1)r=Tm(r,a);else if(s==2){let c=a,l=e[++o];i=Tm(i,c+": "+l+";")}}t?n.styles=i:n.stylesWithoutHost=i,t?n.classes=r:n.classesWithoutHost=r}function kc(n,e=0){let t=_t();if(t===null)return ot(n,e);let i=Ei();return oE(i,t,ni(n),e)}function dA(n,e,t,i,r){let s=i===null?null:{"":-1},o=r(n,t);if(o!==null){let a=o,c=null,l=null;for(let u of o)if(u.resolveHostDirectives!==null){[a,c,l]=u.resolveHostDirectives(o);break}pA(n,e,t,a,s,c,l)}s!==null&&i!==null&&fA(t,i,s)}function fA(n,e,t){let i=n.localNames=[];for(let r=0;r<e.length;r+=2){let s=t[e[r+1]];if(s==null)throw new Oe(-301,!1);i.push(e[r],s)}}function hA(n,e,t){e.componentOffset=t,(n.components??=[]).push(e.index)}function pA(n,e,t,i,r,s,o){let a=i.length,c=null;for(let h=0;h<a;h++){let f=i[h];c===null&&no(f)&&(c=f,hA(n,t,h)),DC(nE(t,e),n,f.type)}xA(t,n.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let h=0;h<a;h++){let f=i[h];f.providersResolver&&f.providersResolver(f)}let l=!1,u=!1,d=PE(n,e,a,null);a>0&&(t.directiveToIndex=new Map);for(let h=0;h<a;h++){let f=i[h];if(t.mergedAttrs=Bd(t.mergedAttrs,f.hostAttrs),gA(n,t,e,d,f),_A(d,f,r),o!==null&&o.has(f)){let[_,p]=o.get(f);t.directiveToIndex.set(f.type,[d,_+t.directiveStart,p+t.directiveStart])}else(s===null||!s.has(f))&&t.directiveToIndex.set(f.type,d);f.contentQueries!==null&&(t.flags|=4),(f.hostBindings!==null||f.hostAttrs!==null||f.hostVars!==0)&&(t.flags|=64);let g=f.type.prototype;!l&&(g.ngOnChanges||g.ngOnInit||g.ngDoCheck)&&((n.preOrderHooks??=[]).push(t.index),l=!0),!u&&(g.ngOnChanges||g.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(t.index),u=!0),d++}mA(n,t,s)}function mA(n,e,t){for(let i=e.directiveStart;i<e.directiveEnd;i++){let r=n.data[i];if(t===null||!t.has(r))Ux(0,e,r,i),Ux(1,e,r,i),Vx(e,i,!1);else{let s=t.get(r);Bx(0,e,s,i),Bx(1,e,s,i),Vx(e,i,!0)}}}function Ux(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(Object.hasOwn(r,s)){let o;n===0?o=e.inputs??={}:o=e.outputs??={},o[s]??=[],o[s].push(i),cS(e,s)}}function Bx(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(Object.hasOwn(r,s)){let o=r[s],a;n===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[o]??=[],a[o].push(i,s),cS(e,o)}}function cS(n,e){e==="class"?n.flags|=8:e==="style"&&(n.flags|=16)}function Vx(n,e,t){let{attrs:i,inputs:r,hostDirectiveInputs:s}=n;if(i===null||!t&&r===null||t&&s===null||ty(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let o=null,a=0;for(;a<i.length;){let c=i[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!t&&Object.hasOwn(r,c)){let l=r[c];for(let u of l)if(u===e){o??=[],o.push(c,i[a+1]);break}}else if(t&&Object.hasOwn(s,c)){let l=s[c];for(let u=0;u<l.length;u+=2)if(l[u]===e){o??=[],o.push(l[u+1],i[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(o)}function gA(n,e,t,i,r){n.data[i]=r;let s=r.factory||(r.factory=Ws(r.type,!0)),o=new Ac(s,no(r),kc,null);n.blueprint[i]=o,t[i]=o,yA(n,e,i,PE(n,t,r.hostVars,nr),r)}function yA(n,e,t,i,r){let s=r.hostBindings;if(s){let o=n.hostBindingOpCodes;o===null&&(o=n.hostBindingOpCodes=[]);let a=~e.index;vA(o)!=a&&o.push(a),o.push(t,i,s)}}function vA(n){let e=n.length;for(;e>0;){let t=n[--e];if(typeof t=="number"&&t<0)return t}return 0}function _A(n,e,t){if(t){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)t[e.exportAs[i]]=n;no(e)&&(t[""]=n)}}function xA(n,e,t){n.flags|=1,n.directiveStart=e,n.directiveEnd=e+t,n.providerIndexes=e}function lS(n,e,t,i,r,s,o,a){let c=e[Be],l=c.consts,u=Qi(l,o),d=Wd(c,n,t,i,u);return s&&dA(c,e,d,Qi(l,a),r),d.mergedAttrs=Bd(d.mergedAttrs,d.attrs),d.attrs!==null&&Pd(d,d.attrs,!1),d.mergedAttrs!==null&&Pd(d,d.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,d),d}function uS(n,e){yC(n,e),zm(e)&&n.queries.elementEnd(e)}function EA(n,e,t,i,r,s){let o=e.consts,a=Qi(o,r),c=Wd(e,n,t,i,a);if(c.mergedAttrs=Bd(c.mergedAttrs,c.attrs),s!=null){let l=Qi(o,s);c.localNames=[];for(let u=0;u<l.length;u+=2)c.localNames.push(l[u],-1)}return c.attrs!==null&&Pd(c,c.attrs,!1),c.mergedAttrs!==null&&Pd(c,c.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,c),c}var dS=typeof ShadowRoot<"u",SA=typeof Document<"u";function bA(n){return Object.keys(n).map(e=>{let[t,i,r]=n[e],s={propName:t,templateName:e,isSignal:(i&zd.SignalBased)!==0};return r&&(s.transform=r),s})}function MA(n){return Object.keys(n).map(e=>({propName:n[e],templateName:e}))}function TA(n,e,t){let i=e instanceof qn?e:e?.injector;return i&&n.getStandaloneInjector!==null&&(i=n.getStandaloneInjector(i)||i),i?new Nd(t,i):t}function wA(n){let e=n.get(oo,null);if(e===null)throw new Oe(407,!1);let t=n.get(iS,null),i=n.get(ts,null),r=n.get(cs,null,{optional:!0});return{rendererFactory:e,sanitizer:t,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function CA(n,e,t){let i=fS(n);return SE(e,i,i==="svg"?Gm:i==="math"?z0:t)}function DA(n){if((n&&"localName"in n&&typeof n.localName=="string"?n.localName:n?.tagName)?.toLowerCase()==="script")throw new Oe(905,!1)}function fS(n){return(n.selectors[0][0]||"div").toLowerCase()}var Pc=class{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=bA(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=MA(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=iD(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,i,r,s,o,a,c){Nt(St.DynamicComponentStart);let l=Ne(null);try{let u=this.componentDef,d=TA(u,r||this.ngModule,e),h=wA(d),f=h.tracingService;return f&&f.componentCreate?f.componentCreate(rS(u),()=>this.createComponentRef(h,d,t,i,s,o,a,c)):this.createComponentRef(h,d,t,i,s,o,a,c)}finally{Ne(l)}}createComponentRef(e,t,i,r,s,o,a,c){let l=this.componentDef,u=AA(r,l,o,s,c),d=e.rendererFactory.createRenderer(null,l),h=r?CD(d,r,l.encapsulation,t):CA(l,d,a??null);DA(h);let f=t.get(lo,null),g=IA(h,()=>t.get(En,null)??pE());f&&f.addHost(g);let _=o?.some(Hx)||s?.some(E=>typeof E!="function"&&E.bindings.some(Hx)),p=ly(null,u,null,512|NE(l),null,null,e,d,t,null,_E(h,t,!0));f&&dS&&g instanceof ShadowRoot&&ud(p,()=>{f.removeHost(g)}),p[on]=h,hd(p);let m=null;try{let E=lS(on,p,2,"#host",()=>u.directiveRegistry,!0,0);TE(d,h,E),ea(h,p),FE(u,p,E),EE(u,E,p),uS(u,E),i!==void 0&&NA(E,this.ngContentSelectors,i),m=Mr(E.index,p),p[tn]=m[tn],fy(u,p,null)}catch(E){throw m!==null&&bg(m),bg(p),E}finally{Nt(St.DynamicComponentEnd),pd()}return new Od(this.componentType,p,!!_)}};function AA(n,e,t,i,r){let s=n?["ng-version","22.2.6"]:rD(e.selectors[0]),o=null,a=null,c=0;if(t)for(let d of t)c+=d[Pg].requiredVars,d.create&&(d.targetIdx=0,(o??=[]).push(d)),d.update&&(d.targetIdx=0,(a??=[]).push(d));if(i)for(let d=0;d<i.length;d++){let h=i[d];if(typeof h!="function")for(let f of h.bindings){c+=f[Pg].requiredVars;let g=d+1;f.create&&(f.targetIdx=g,(o??=[]).push(f)),f.update&&(f.targetIdx=g,(a??=[]).push(f))}}let l=[e];if(i)for(let d of i){let h=typeof d=="function"?d:d.type,f=Qu(h);l.push(f)}return cy(0,null,RA(o,a),1,c,l,null,null,null,[s],null)}function IA(n,e){let t=n.getRootNode?.();return SA&&t instanceof Document?t.head:t&&dS&&t instanceof ShadowRoot?t:e().head}function RA(n,e){return!n&&!e?null:t=>{if(t&1&&n)for(let i of n)i.create();if(t&2&&e)for(let i of e)i.update()}}function Hx(n){let e=n[Pg].kind;return e==="input"||e==="twoWay"}var Od=class extends nS{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t,i){super(),this._rootLView=t,this._hasInputBindings=i,this._tNode=ad(t[Be],on),this.location=ra(this._tNode,t),this.instance=Mr(this._tNode.index,t)[tn],this.hostView=this.changeDetectorRef=new ta(t,void 0),this.componentType=e}setInput(e,t){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let r=this._rootLView,s=VE(i,r[Be],r,e,t);this.previousInputValues.set(e,t);let o=Mr(i.index,r);hy(o,1)}get injector(){return new wr(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function NA(n,e,t){let i=n.projection=[];for(let r=0;r<e.length;r++){let s=t[r];i.push(s!=null&&s.length?Array.from(s):null)}}var Uc=(()=>{class n{static __NG_ELEMENT_ID__=PA}return n})();function PA(){let n=Ei();return hS(n,_t())}var Og=class n extends Uc{_lContainer;_hostTNode;_hostLView;constructor(e,t,i){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=i}get element(){return ra(this._hostTNode,this._hostLView)}get injector(){return new wr(this._hostTNode,this._hostLView)}get parentInjector(){let e=Kg(this._hostTNode,this._hostLView);if(Qx(e)){let t=Cd(e,this._hostLView),i=wd(e),r=t[Be].data[i+8];return new wr(r,t)}else return new wr(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=zx(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-Kt}createEmbeddedView(e,t,i){let r,s,o;typeof i=="number"?r=i:i!=null&&(r=i.index,s=i.injector,o=i.onError);let a=Ng(this._lContainer,e.ssrId),c=e.createEmbeddedViewImpl(t||{},s,a);return o&&(c._lView[vc]=o),this.insertImpl(c,r,Ic(this._hostTNode,a)),c}createComponent(e,t,i,r,s,o,a){let c,l,u=t||{};c=u.index,i=u.injector,r=u.projectableNodes,s=u.environmentInjector||u.ngModuleRef,o=u.directives,a=u.bindings,l=u.onError;let d=new Pc(Ys(e)),h=i||this.parentInjector;if(!s&&d.ngModule==null){let E=this.parentInjector.get(qn,null);E&&(s=E)}let f=Ys(d.componentType??{}),g=Ng(this._lContainer,f?.id??null),_=g?.firstChild??null,p=d.create(h,r,_,s,o,a,this._getHostElementNamespace());return l&&(p.hostView._lView[vc]=l),this.insertImpl(p.hostView,c,Ic(this._hostTNode,g)),p}_getHostElementNamespace(){if(this._hostTNode.type&2){let e=this._hostTNode.parent??this._hostLView[Xn];return e!==null&&e.type&2&&typeof e.value=="string"&&e.value.toLowerCase()==="foreignobject"?null:e?.namespace??null}return this._hostTNode.namespace}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(e,t,i){let r=e._lView;if(j0(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let c=r[en],l=new n(c,c[Xn],c[en]);l.detach(l.indexOf(e))}}let s=this._adjustIndex(t),o=this._lContainer;return jd(o,r,s,i),e.attachToViewContainerRef(),Om(yg(o),s,e),e}move(e,t){return this.insert(e,t)}indexOf(e){let t=zx(this._lContainer);return t!==null?t.indexOf(e):-1}remove(e){let t=this._adjustIndex(e,-1),i=Nc(this._lContainer,t);i&&(pc(yg(this._lContainer),t),Vd(i[Be],i))}detach(e){let t=this._adjustIndex(e,-1),i=Nc(this._lContainer,t);return i&&pc(yg(this._lContainer),t)!=null?new ta(i):null}_adjustIndex(e,t=0){return e??this.length+t}};function zx(n){return n[_c]}function yg(n){return n[_c]||(n[_c]=[])}function hS(n,e){let t,i=e[n.index];return xi(i)?t=i:(t=KE(i,e,null,n),e[n.index]=t,uy(e,t)),LA(t,e,n,i),new Og(t,n,e)}function OA(n,e){let t=n[nn],i=t.createComment(""),r=Ni(e,n),s=t.parentNode(r);return so(t,s,i,t.nextSibling(r),!1),i}var LA=UA,FA=()=>!1;function kA(n,e,t){return FA(n,e,t)}function UA(n,e,t,i){if(n[Qs])return;let r;t.type&8?r=xn(i):r=OA(e,t),n[Qs]=r}var Lg=class n{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},Fg=class n{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let t=e.queries;if(t!==null){let i=e.contentQueries!==null?e.contentQueries[0]:t.length,r=[];for(let s=0;s<i;s++){let o=t.getByIndex(s),a=this.queries[o.indexInDeclarationView];r.push(a.clone())}return new n(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)my(e,t).matches!==null&&this.queries[t].setDirty()}},kg=class{flags;read;predicate;constructor(e,t,i=null){this.flags=t,this.read=i,typeof e=="string"?this.predicate=$A(e):this.predicate=e}},Ug=class n{queries;constructor(e=[]){this.queries=e}elementStart(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(e){let t=null;for(let i=0;i<this.length;i++){let r=t!==null?t.length:0,s=this.getByIndex(i).embeddedTView(e,r);s&&(s.indexInDeclarationView=i,t!==null?t.push(s):t=[s])}return t!==null?new n(t):null}template(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},Bg=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,t=-1){this.metadata=e,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(e,t){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,t),new n(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==t;)i=i.parent;return t===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,t){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let s=i[r];this.matchTNodeWithReadOption(e,t,BA(t,s)),this.matchTNodeWithReadOption(e,t,bd(t,e,s,!1,!1))}else i===na?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,bd(t,e,i,!1,!1))}matchTNodeWithReadOption(e,t,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===sa||r===Uc||r===yi||r===na&&t.type&4)this.addMatch(t.index,-2);else{let s=bd(t,e,r,!1,!1);s!==null&&this.addMatch(t.index,s)}else this.addMatch(t.index,i)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function BA(n,e){let t=n.localNames;if(t!==null){for(let i=0;i<t.length;i+=2)if(t[i]===e)return t[i+1]}return null}function VA(n,e){return n.type&11?ra(n,e):n.type&4?py(n,e):null}function HA(n,e,t,i){return t===-1?VA(e,n):t===-2?zA(n,e,i):Ad(n,n[Be],t,e)}function zA(n,e,t){if(t===sa)return ra(e,n);if(t===na)return py(e,n);if(t===Uc)return hS(e,n);if(t===yi)return new wr(e,n)}function pS(n,e,t,i){let r=e[Ji].queries[i];if(r.matches===null){let s=n.data,o=t.matches,a=[];for(let c=0;o!==null&&c<o.length;c+=2){let l=o[c];if(l<0)a.push(null);else{let u=s[l];a.push(HA(e,u,o[c+1],t.metadata.read))}}r.matches=a}return r.matches}function Vg(n,e,t,i){let r=n.queries.getByIndex(t),s=r.matches;if(s!==null){let o=pS(n,e,r,t);for(let a=0;a<s.length;a+=2){let c=s[a];if(c>0)i.push(o[a/2]);else{let l=s[a+1],u=e[-c];for(let d=Kt;d<u.length;d++){let h=u[d];h[is]===h[en]&&Vg(h[Be],h,l,i)}if(u[eo]!==null){let d=u[eo];for(let h=0;h<d.length;h++){let f=d[h];Vg(f[Be],f,l,i)}}}}}return i}function GA(n,e){return n[Ji].queries[e].queryList}function jA(n,e,t){let i=new Id((t&4)===4);return q0(n,e,i,i.destroy),(e[Ji]??=new Fg).queries.push(new Lg(i))-1}function WA(n,e,t){let i=Un();return i.firstCreatePass&&(qA(i,new kg(n,e,t),-1),(e&2)===2&&(i.staticViewQueries=!0)),jA(i,_t(),e)}function $A(n){return n.split(",").map(e=>e.trim())}function qA(n,e,t){n.queries===null&&(n.queries=new Ug),n.queries.track(new Bg(e,t))}function my(n,e){return n.queries.getByIndex(e)}function XA(n,e){let t=n[Be],i=my(t,e);return i.crossesNgTemplate?Vg(t,n,e,[]):pS(t,n,i,e)}function $d(n){return!!n&&typeof n.then=="function"}function gy(n){return!!n&&typeof n.subscribe=="function"}var Oc=class{};var Lc=class extends Oc{injector;instance=null;constructor(e){super();let t=new $s([...e.providers,{provide:Oc,useValue:this}],e.parent||gc(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function mS(n,e,t=null){return new Lc({providers:n,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var YA=(()=>{class n{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=km(!1,t.type),r=i.length>0?mS([i],this._injector,""):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=ht({token:n,providedIn:"environment",factory:()=>new n(ot(qn))})}return n})();function Bn(n){return Zg(()=>{let e=QA(n),t=Zt(mt({},e),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection!==Jg.Eager,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&n.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get(YA).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||Oi.Emulated,styles:n.styles||gi,_:null,schemas:n.schemas||null,tView:null,id:""});e.standalone&&oa("NgStandalone"),eI(t);let i=n.dependencies;return t.directiveDefs=Gx(i,ZA),t.pipeDefs=Gx(i,w0),t.id=tI(t),t})}function ZA(n){return Ys(n)||Qu(n)}function Bc(n){return Zg(()=>({type:n.type,bootstrap:n.bootstrap||gi,declarations:n.declarations||gi,imports:n.imports||gi,exports:n.exports||gi,transitiveCompileScopes:null,schemas:n.schemas||null,id:n.id||null}))}function KA(n,e){if(n==null)return id;let t={};for(let i in n)if(Object.hasOwn(n,i)){let r=n[i],s,o,a,c;Array.isArray(r)?(a=r[0],s=r[1],o=r[2]??s,c=r[3]||null):(s=r,o=r,a=zd.None,c=null),t[s]=[i,a,c],e[s]=o}return t}function JA(n){if(n==null)return id;let e={};for(let t in n)Object.hasOwn(n,t)&&(e[n[t]]=t);return e}function qd(n){return{type:n.type,name:n.name,factory:null,pure:n.pure!==!1,standalone:n.standalone??!0,onDestroy:n.type.prototype.ngOnDestroy||null}}function QA(n){let e={};return{type:n.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:e,inputConfig:n.inputs||id,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||gi,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,signalFormsInputPresence:null,inputs:KA(n.inputs,e),outputs:JA(n.outputs),debugInfo:null}}function eI(n){n.features?.forEach(e=>e(n))}function Gx(n,e){return n?()=>{let t=typeof n=="function"?n():n,i=[];for(let r of t){let s=e(r);s!==null&&i.push(s)}return i}:null}function tI(n){let e=0,t=typeof n.consts=="function"?"":n.consts,i=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,t,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let s of i.join("|"))e=Math.imul(31,e)+s.charCodeAt(0)<<0;return e+=2147483648,"c"+e}var gS=new Xe("");var yy=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i});appInits=_e(gS,{optional:!0})??[];injector=_e(yi);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let s=zo(this.injector,r);if($d(s))t.push(s);else if(gy(s)){let o=new Promise((a,c)=>{s.subscribe({complete:a,error:c})});t.push(o)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=as({token:n,factory:n.\u0275fac})}return n})();function nI(n,e,t,i,r,s,o,a){if(t.firstCreatePass){n.mergedAttrs=Bd(n.mergedAttrs,n.attrs);let u=n.tView=cy(2,n,r,s,o,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,n),u.queries=t.queries.embeddedTView(n))}a&&(n.flags|=a),Xo(n,!1);let c=iI(t,e,n,i);md()&&oy(t,e,c,n),ea(c,e);let l=KE(c,e,c,n);e[i+on]=l,uy(e,l),kA(l,n,e)}function Ld(n,e,t,i,r,s,o,a,c,l,u){let d=t+on,h;if(e.firstCreatePass){if(h=Wd(e,d,4,o||null,a||null),l!=null){let f=Qi(e.consts,l);h.localNames=[];for(let g=0;g<f.length;g+=2)h.localNames.push(f[g],-1)}}else h=e.data[d];return nI(h,n,e,t,i,r,s,c),l!=null&&dy(n,h,u),h}var iI=rI;function rI(n,e,t,i){return gd(!0),e[nn].createComment("")}var vy=new Xe("");var yS=new Xe("");function vS(){qp(n=>{let e="";throw new Oe(-600,e)})}var sI=10;var Xd=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=_e(Tr);afterRenderManager=_e(DE);zonelessEnabled=_e(Mc);rootEffectScheduler=_e(_d);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new pi;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=_e(ro);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(Zi(t=>!t))}constructor(){_e(cs,{optional:!0})}whenStable(){let t;return new Promise(i=>{t=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{t.unsubscribe()})}_injector=_e(qn);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,i){return this.bootstrapImpl(t,i)}bootstrapImpl(t,i,r=yi.NULL){return this._injector.get(_n).run(()=>{if(Nt(St.BootstrapComponentStart),!this._injector.get(yy).done){let m="";throw new Oe(405,m)}let a=Ys(t),c=this._injector.get(Oc),l=new Pc(a,c);this.componentTypes.push(t);let{hostElement:u,directives:d,bindings:h}=oI(i),f=u||l.selector,g=l.create(r,[],f,c.injector,d,h),_=g.location.nativeElement,p=g.injector.get(vy,null);return p?.registerApplication(_),g.onDestroy(()=>{this.detachView(g.hostView),Dc(this.components,g),p?.unregisterApplication(_)}),this._loadComponent(g),Nt(St.BootstrapComponentEnd,g),g})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){Nt(St.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(ry.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw Nt(St.ChangeDetectionEnd),new Oe(101,!1);let t=Ne(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,Ne(t),this.afterTick.next(),Nt(St.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(oo,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<sI;){Nt(St.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{Nt(St.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!xc(r))continue;let s=i&&!this.zonelessEnabled?0:1;$E(r,s),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>xc(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;Dc(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(t),this._injector.get(yS,[]).forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>Dc(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new Oe(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||n)};static \u0275prov=as({token:n,factory:n.\u0275fac})}return n})();function oI(n){return n===void 0||typeof n=="string"||n instanceof Element?{hostElement:n}:n}function Dc(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function Dr(n,e,t,i){let r=_t(),s=Yo();if(Cr(r,s,e)){let o=Un(),a=ag();LD(a,r,n,e,t,i)}return Dr}var Hg=class{destroy(e){}updateValue(e,t){}swap(e,t){let i=Math.min(e,t),r=Math.max(e,t),s=this.detach(r);if(r-i>1){let o=this.detach(i);this.attach(i,s),this.attach(r,o)}else this.attach(i,s)}move(e,t){this.attach(t,this.detach(e))}};function vg(n,e,t,i,r){return n===t&&Object.is(e,i)?1:Object.is(r(n,e),r(t,i))?-1:0}function aI(n,e,t,i){let r,s,o=0,a=n.length-1,c=void 0;if(Array.isArray(e)){Ne(i);let l=e.length-1;for(Ne(null);o<=a&&o<=l;){let u=n.at(o),d=e[o],h=vg(o,u,o,d,t);if(h!==0){h<0&&n.updateValue(o,d),o++;continue}let f=n.at(a),g=e[l],_=vg(a,f,l,g,t);if(_!==0){_<0&&n.updateValue(a,g),a--,l--;continue}let p=t(o,u),m=t(a,f),E=t(o,d);if(Object.is(E,m)){let C=t(l,g);Object.is(C,p)?(n.swap(o,a),n.updateValue(a,g),l--,a--):n.move(a,o),n.updateValue(o,d),o++;continue}if(r??=new Fd,s??=Wx(n,o,a,t),zg(n,r,o,E))n.updateValue(o,d),o++,a++;else if(s.has(E))r.set(p,n.detach(o)),a--;else{let C=n.create(o,e[o]);n.attach(o,C),o++,a++}}for(;o<=l;)jx(n,r,t,o,e[o]),o++}else if(e!=null){Ne(i);let l=e[Symbol.iterator]();Ne(null);let u=l.next();for(;!u.done&&o<=a;){let d=n.at(o),h=u.value,f=vg(o,d,o,h,t);if(f!==0)f<0&&n.updateValue(o,h),o++,u=l.next();else{r??=new Fd,s??=Wx(n,o,a,t);let g=t(o,h);if(zg(n,r,o,g))n.updateValue(o,h),o++,a++,u=l.next();else if(!s.has(g))n.attach(o,n.create(o,h)),o++,a++,u=l.next();else{let _=t(o,d);r.set(_,n.detach(o)),a--}}}for(;!u.done;)jx(n,r,t,n.length,u.value),u=l.next()}for(;o<=a;)n.destroy(n.detach(a--));r?.forEach(l=>{n.destroy(l)})}function zg(n,e,t,i){return e!==void 0&&e.has(i)?(n.attach(t,e.get(i)),e.delete(i),!0):!1}function jx(n,e,t,i,r){if(zg(n,e,i,t(i,r)))n.updateValue(i,r);else{let s=n.create(i,r);n.attach(i,s)}}function Wx(n,e,t,i){let r=new Set;for(let s=e;s<=t;s++)r.add(i(s,n.at(s)));return r}var Fd=class{kvMap=new Map;_vMap=void 0;has(e){return this.kvMap.has(e)}delete(e){if(!this.has(e))return!1;let t=this.kvMap.get(e);return this._vMap!==void 0&&this._vMap.has(t)?(this.kvMap.set(e,this._vMap.get(t)),this._vMap.delete(t)):this.kvMap.delete(e),!0}get(e){return this.kvMap.get(e)}set(e,t){if(this.kvMap.has(e)){let i=this.kvMap.get(e);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,t)}else this.kvMap.set(e,t)}forEach(e){for(let[t,i]of this.kvMap)if(e(i,t),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),e(i,t)}}};function ls(n,e,t,i,r,s,o,a){oa("NgControlFlow");let c=_t(),l=Un(),u=Qi(l.consts,s);return Ld(c,l,n,e,t,i,r,u,256,o,a),_y}function _y(n,e,t,i,r,s,o,a){return oa("NgControlFlow"),cI(n,e,t,i,r,s,o,a),_y}function cI(n,e,t,i,r,s,o,a){let c=_t(),l=Un(),u=Qi(l.consts,s);Ld(c,l,n,e,t,i,r,u,512,o,a)}function us(n,e){oa("NgControlFlow");let t=_t(),i=Yo(),r=t[i]!==nr?t[i]:-1,s=r!==-1?kd(t,on+r):void 0,o=0;if(Cr(t,i,n)){let a=Ne(null);try{if(s!==void 0&&QE(s,o),n!==-1){let c=on+n,l=kd(t,c),u=$g(t[Be],c),d=tS(l,u,t),h=Gd(t,u,e,{dehydratedView:d});jd(l,h,o,Ic(u,d))}}finally{Ne(a)}}else if(s!==void 0){let a=JE(s,o);a!==void 0&&(a[tn]=e)}}var Gg=class{lContainer;$implicit;$index;constructor(e,t,i){this.lContainer=e,this.$implicit=t,this.$index=i}get $count(){return this.lContainer.length-Kt}};var jg=class{hasEmptyBlock;trackByFn;liveCollection;constructor(e,t,i){this.hasEmptyBlock=e,this.trackByFn=t,this.liveCollection=i}};function Vc(n,e,t,i,r,s,o,a,c,l,u,d,h){oa("NgControlFlow");let f=_t(),g=Un(),_=c!==void 0,p=_t(),m=a?o.bind(p[ii][tn]):o,E=new jg(_,m);p[on+n]=E,Ld(f,g,n+1,e,t,i,r,Qi(g.consts,s),256),_&&Ld(f,g,n+2,c,l,u,d,Qi(g.consts,h),512)}var Wg=class extends Hg{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(e,t,i){super(),this.lContainer=e,this.hostLView=t,this.templateTNode=i}get length(){return this.lContainer.length-Kt}at(e){return this.getLView(e)[tn].$implicit}attach(e,t){let i=t[Go];this.needsIndexUpdate||=e!==this.length,jd(this.lContainer,t,e,Ic(this.templateTNode,i)),lI(this.lContainer,e)}detach(e){return this.needsIndexUpdate||=e!==this.length-1,uI(this.lContainer,e),dI(this.lContainer,e)}create(e,t){let i=Ng(this.lContainer,this.templateTNode.tView.ssrId);return Gd(this.hostLView,this.templateTNode,new Gg(this.lContainer,t,e),{dehydratedView:i})}destroy(e){Vd(e[Be],e)}updateValue(e,t){this.getLView(e)[tn].$implicit=t}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let e=0;e<this.length;e++)this.getLView(e)[tn].$index=e}getLView(e){return fI(this.lContainer,e)}};function Hc(n){let e=Ne(null),t=ss();try{let i=_t(),r=i[Be],s=i[t],o=t+1,a=kd(i,o);if(s.liveCollection===void 0){let l=$g(r,o);s.liveCollection=new Wg(a,i,l)}else s.liveCollection.reset();let c=s.liveCollection;if(aI(c,n,s.trackByFn,e),c.updateIndexes(),s.hasEmptyBlock){let l=Yo(),u=c.length===0;if(Cr(i,l,u)){let d=t+2,h=kd(i,d);if(u){let f=$g(r,d),g=tS(h,f,i),_=Gd(i,f,void 0,{dehydratedView:g});jd(h,_,0,Ic(f,g))}else r.firstUpdatePass&&rA(h),QE(h,0)}}}finally{Ne(e)}}function kd(n,e){return n[e]}function lI(n,e){if(n.length<=Kt)return;let t=Kt+e,i=n[t];i&&lD(i)}function uI(n,e){if(n.length<=Kt)return;let t=Kt+e,i=n[t];i&&cD(i)}function dI(n,e){return Nc(n,e)}function fI(n,e){return JE(n,e)}function $g(n,e){return ad(n,e)}function $x(n,e,t,i,r){VE(e,n,t,r?"class":"style",i)}function ao(n,e,t,i){let r=_t(),s=r[Be],o=n+on,a=s.firstCreatePass?lS(o,r,2,e,OD,Z0(),t,i):s.data[o];if(to(a)){let c=r[Ki].tracingService;if(c&&c.componentCreate){let l=s.data[a.directiveStart+a.componentOffset];return c.componentCreate(rS(l),()=>(qx(n,e,r,a,i),ao))}}return qx(n,e,r,a,i),ao}function qx(n,e,t,i,r){if(UE(i,t,n,e,_S),od(i)){let s=t[Be];FE(s,t,i),EE(s,i,t)}r!=null&&dy(t,i)}function uo(){let n=Un(),e=Ei(),t=BE(e);return n.firstCreatePass&&uS(n,t),Jm(t)&&Qm(),Km(),t.classesWithoutHost!=null&&_C(t)&&$x(n,t,_t(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&xC(t)&&$x(n,t,_t(),t.stylesWithoutHost,!1),uo}function zc(n,e,t,i){return ao(n,e,t,i),uo(),zc}function B(n,e,t,i){let r=_t(),s=r[Be],o=n+on,a=s.firstCreatePass?EA(o,s,2,e,t,i):s.data[o];return UE(a,r,n,e,_S),i!=null&&dy(r,a),B}function j(){let n=Ei(),e=BE(n);return Jm(e)&&Qm(),Km(),j}function bt(n,e,t,i){return B(n,e,t,i),j(),bt}var _S=(n,e,t,i,r)=>(gd(!0),SE(e[nn],i,cg()));function Si(n,e,t){let i=_t(),r=Yo();if(Cr(i,r,e)){let s=Un(),o=ag();ID(o,i,n,e,i[nn],t)}return Si}var wc=void 0;function hI(n){let e=Math.floor(Math.abs(n)),t=n.toString().replace(/^[^.]*\.?/,"").length;return e===1&&t===0?1:5}var pI=["en",[["a","p"],["AM","PM"]],[["AM","PM"]],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],wc,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],wc,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm\u202Fa","h:mm:ss\u202Fa","h:mm:ss\u202Fa z","h:mm:ss\u202Fa zzzz"],["{1}, {0}",wc,wc,wc],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",hI],_g=Object.create(null);function Yd(n){let e=mI(n),t=Xx(e);if(t)return t;let i=e.split("-")[0];if(t=Xx(i),t)return t;if(i==="en")return pI;throw new Oe(701,!1)}function Xx(n){if(!(n in _g)){let e=Zs.ng&&Zs.ng.common&&Zs.ng.common.locales&&Zs.ng.common.locales[n];return e!==void 0&&(_g[n]=e),e}return _g[n]}var aa={LocaleId:0,DayPeriodsFormat:1,DayPeriodsStandalone:2,DaysFormat:3,DaysStandalone:4,MonthsFormat:5,MonthsStandalone:6,Eras:7,FirstDayOfWeek:8,WeekendRange:9,DateFormat:10,TimeFormat:11,DateTimeFormat:12,NumberSymbols:13,NumberFormats:14,CurrencyCode:15,CurrencySymbol:16,CurrencyName:17,Currencies:18,Directionality:19,PluralCase:20,ExtraData:21};function mI(n){return n.toLowerCase().replace(/_/g,"-")}var Gc="en-US";var gI=Gc;function xS(n){typeof n=="string"&&(gI=n.toLowerCase().replace(/_/g,"-"))}function Zd(n,e,t){let i=_t(),r=Un(),s=Ei();return yI(r,i,i[nn],s,n,e,t),Zd}function Lt(n,e,t){let i=_t(),r=Un(),s=Ei();return(s.type&3||t)&&oS(s,r,i,t,i[nn],n,e,Td(s,i,e)),Lt}function yI(n,e,t,i,r,s,o){let a=!0,c=null;if((i.type&3||o)&&(c??=Td(i,e,s),oS(i,n,e,o,t,r,s,c)&&(a=!1)),a){let l=i.outputs?.[r],u=i.hostDirectiveOutputs?.[r];if(u&&u.length)for(let d=0;d<u.length;d+=2){let h=u[d],f=u[d+1];c??=Td(i,e,s),kx(i,e,h,f,r,c)}if(l&&l.length)for(let d of l)c??=Td(i,e,s),kx(i,e,d,r,r,c)}}function fo(n=1){return lx(n)}function ir(n,e,t){return WA(n,e,t),ir}function Li(n){let e=_t(),t=Un(),i=rg();fd(i+1);let r=my(t,i);if(n.dirty&&G0(e)===((r.metadata.flags&2)===2)){if(r.matches===null)n.reset([]);else{let s=XA(e,i);n.reset(s,OC),n.notifyOnChanges()}return!0}return!1}function Fi(){return GA(_t(),rg())}function xd(n,e){return n<<17|e<<2}function co(n){return n>>17&32767}function vI(n){return(n&2)==2}function _I(n,e){return n&131071|e<<17}function qg(n){return n|2}function ia(n){return(n&131068)>>2}function xg(n,e){return n&-131069|e<<2}function xI(n){return(n&1)===1}function Xg(n){return n|1}function EI(n,e,t,i,r,s){let o=s?e.classBindings:e.styleBindings,a=co(o),c=ia(o);n[i]=t;let l=!1,u;if(Array.isArray(t)){let d=t;u=d[1],(u===null||Vo(d,u)>0)&&(l=!0)}else u=t;if(r)if(c!==0){let h=co(n[a+1]);n[i+1]=xd(h,a),h!==0&&(n[h+1]=xg(n[h+1],i)),n[a+1]=_I(n[a+1],i)}else n[i+1]=xd(a,0),a!==0&&(n[a+1]=xg(n[a+1],i)),a=i;else n[i+1]=xd(c,0),a===0?a=i:n[c+1]=xg(n[c+1],i),c=i;l&&(n[i+1]=qg(n[i+1])),Yx(n,u,i,!0),Yx(n,u,i,!1),SI(e,u,n,i,s),o=xd(a,c),s?e.classBindings=o:e.styleBindings=o}function SI(n,e,t,i,r){let s=r?n.residualClasses:n.residualStyles;s!=null&&typeof e=="string"&&Vo(s,e)>=0&&(t[i+1]=Xg(t[i+1]))}function Yx(n,e,t,i){let r=n[t+1],s=e===null,o=i?co(r):ia(r),a=!1;for(;o!==0&&(a===!1||s);){let c=n[o],l=n[o+1];bI(c,e)&&(a=!0,n[o+1]=i?Xg(l):qg(l)),o=i?co(l):ia(l)}a&&(n[t+1]=i?qg(r):Xg(r))}function bI(n,e){return n===null||e==null||(Array.isArray(n)?n[1]:n)===e?!0:Array.isArray(n)&&typeof e=="string"?Vo(n,e)>=0:!1}function Kd(n,e,t){return ES(n,e,t,!1),Kd}function Vn(n,e){return ES(n,e,null,!0),Vn}function ES(n,e,t,i){let r=_t(),s=Un(),o=tx(2);if(s.firstUpdatePass&&TI(s,n,o,i),e!==nr&&Cr(r,o,e)){let a=s.data[ss()];II(s,a,r,r[nn],n,r[o+1]=RI(e,t),i,o)}}function MI(n,e){return e>=n.expandoStartIndex}function TI(n,e,t,i){let r=n.data;if(r[t+1]===null){let s=r[ss()],o=MI(n,t);NI(s,i)&&e===null&&!o&&(e=!1),e=wI(r,s,e,i),EI(r,s,e,t,o,i)}}function wI(n,e,t,i){let r=sx(n),s=i?e.residualClasses:e.residualStyles;if(r===null)(i?e.classBindings:e.styleBindings)===0&&(t=Eg(null,n,e,t,i),t=Fc(t,e.attrs,i),s=null);else{let o=e.directiveStylingLast;if(o===-1||n[o]!==r)if(t=Eg(r,n,e,t,i),s===null){let c=CI(n,e,i);c!==void 0&&Array.isArray(c)&&(c=Eg(null,n,e,c[1],i),c=Fc(c,e.attrs,i),DI(n,e,i,c))}else s=AI(n,e,i)}return s!==void 0&&(i?e.residualClasses=s:e.residualStyles=s),t}function CI(n,e,t){let i=t?e.classBindings:e.styleBindings;if(ia(i)!==0)return n[co(i)]}function DI(n,e,t,i){let r=t?e.classBindings:e.styleBindings;n[co(r)]=i}function AI(n,e,t){let i,r=e.directiveEnd;for(let s=1+e.directiveStylingLast;s<r;s++){let o=n[s].hostAttrs;i=Fc(i,o,t)}return Fc(i,e.attrs,t)}function Eg(n,e,t,i,r){let s=null,o=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<o&&(s=e[a],i=Fc(i,s.hostAttrs,r),s!==n);)a++;return n!==null&&(t.directiveStylingLast=a),i}function Fc(n,e,t){let i=t?1:2,r=-1;if(e!==null)for(let s=0;s<e.length;s++){let o=e[s];typeof o=="number"?r=o:r===i&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),P0(n,o,t?!0:e[++s]))}return n===void 0?null:n}function II(n,e,t,i,r,s,o,a){if(!(e.type&3))return;let c=n.data,l=c[a+1],u=xI(l)?Zx(c,e,t,r,ia(l),o):void 0;if(!Ud(u)){Ud(s)||vI(l)&&(s=Zx(c,null,t,r,a,o));let d=jm(ss(),t);bD(i,o,d,r,s)}}function Zx(n,e,t,i,r,s){let o=e===null,a;for(;r>0;){let c=n[r],l=Array.isArray(c),u=l?c[1]:c,d=u===null,h=t[r+1];h===nr&&(h=d?gi:void 0);let f=d?nd(h,i):u===i?h:void 0;if(l&&!Ud(f)&&(f=nd(c,i)),Ud(f)&&(a=f,o))return a;let g=n[r+1];r=o?co(g):ia(g)}if(e!==null){let c=s?e.residualClasses:e.residualStyles;c!=null&&(a=nd(c,i))}return a}function Ud(n){return n!==void 0}function RI(n,e){return n==null||n===""||(typeof e=="string"?n=Rd(n)+e:typeof n=="object"&&(n=Yu(Rd(n)))),n}function NI(n,e){return(n.flags&(e?8:16))!==0}function Y(n,e=""){let t=_t(),i=Un(),r=n+on,s=i.firstCreatePass?Wd(i,r,1,e,null):i.data[r],o=PI(i,t,s,e);t[r]=o,md()&&oy(i,t,o,s),Xo(s,!1)}var PI=(n,e,t,i)=>(gd(!0),GC(e[nn],i));function OI(n,e,t,i=""){return Cr(n,Yo(),t)?e+Rm(t)+i:nr}function Sn(n){return An("",n),Sn}function An(n,e,t){let i=_t(),r=OI(i,n,e,t);return r!==nr&&LI(i,ss(),r),An}function LI(n,e,t){let i=jm(e,n);jC(n[nn],i,t)}function SS(n,e){let t=n[e];return t===nr?void 0:t}function FI(n,e,t,i,r,s){let o=e+t;return Cr(n,o,r)?sS(n,o+1,s?i.call(s,r):i(r)):SS(n,o+1)}function kI(n,e,t,i,r,s,o){let a=e+t;return cA(n,a,r,s)?sS(n,a+2,o?i.call(o,r,s):i(r,s)):SS(n,a+2)}function ca(n,e){let t=Un(),i,r=n+on;t.firstCreatePass?(i=UI(e,t.pipeRegistry),t.data[r]=i,i.onDestroy&&(t.destroyHooks??=[]).push(r,i.onDestroy)):i=t.data[r];let s=i.factory||(i.factory=Ws(i.type,!0)),o,a=kn(kc);try{let c=Dd(!1),l=s();return Dd(c),$m(t,_t(),r,l),l}finally{kn(a)}}function UI(n,e){if(e)for(let t=e.length-1;t>=0;t--){let i=e[t];if(n===i.name)return i}}function xy(n,e,t){let i=n+on,r=_t(),s=Wm(r,i);return bS(r,i)?FI(r,ig(),e,s.transform,t,s):s.transform(t)}function jc(n,e,t,i){let r=n+on,s=_t(),o=Wm(s,r);return bS(s,r)?kI(s,ig(),e,o.transform,t,i,o):o.transform(t,i)}function bS(n,e){return n[Be].data[e].pure}var MS=(()=>{class n{applicationErrorHandler=_e(Tr);appRef=_e(Xd);taskService=_e(ro);ngZone=_e(_n);zonelessEnabled=_e(Mc);tracing=_e(cs,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new Fn;innerNgZone=this.zoneIsDefined?this.ngZone._inner??null:null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(_e(hg,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let t=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(t);return}this.switchToMicrotaskScheduler(),this.taskService.remove(t)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let t=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})})}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:case 2:{this.appRef.dirtyFlags|=2;break}case 3:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?px:lg;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.innerNgZone!==null&&this.isInNgZone())}isInNgZone(){let t=Zone.current;for(;t;){if(t===this.innerNgZone)return!0;t=t.parent}return!1}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(t),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=as({token:n,factory:n.\u0275fac})}return n})();function TS(){return[{provide:ts,useExisting:MS},{provide:_n,useClass:hc},{provide:Mc,useValue:!0}]}function BI(){return typeof $localize<"u"&&$localize.locale||Gc}var Wc=new Xe("",{factory:()=>_e(Wc,{optional:!0,skipSelf:!0})||BI()});var Jd=class{destroyed=!1;listeners=null;errorHandler=_e(Ii,{optional:!0});isEmitting=!1;hasNullListeners=!1;destroyRef=_e(vi);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0,this.listeners=null})}subscribe(e){if(this.destroyed)throw new Oe(953,!1);return(this.listeners??=[]).push(e),{unsubscribe:()=>{let t=this.listeners?this.listeners.indexOf(e):-1;t>-1&&(this.isEmitting?(this.hasNullListeners=!0,this.listeners[t]=null):this.listeners.splice(t,1))}}}emit(e){if(this.destroyed){console.warn(qs(953,!1));return}if(this.listeners===null)return;this.isEmitting=!0;let t=Ne(null);try{for(let i of this.listeners)try{i!==null&&i(e)}catch(r){this.errorHandler?.handleError(r)}}finally{this.hasNullListeners&&(this.hasNullListeners=!1,this.listeners&&VI(this.listeners)),Ne(t),this.isEmitting=!1}}};function VI(n){let e=n.length-1;for(;e>-1;)n[e]===null&&n.splice(e,1),e--}function Ar(n,e){return Eu(n,e?.equal)}function $c(n){return Z_(n)}function ef(n){return new Jd}var t1=1e4;var Wj=t1-1e3;var Ey=new Xe(""),n1=new Xe("");function qc(n){return!n.moduleRef}function i1(n){let e=qc(n)?n.r3Injector:n.moduleRef.injector,t=e.get(_n);return t.run(()=>{qc(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let i=e.get(Tr),r;if(t.runOutsideAngular(()=>{r=t.onError.subscribe({next:i})}),qc(n)){let s=()=>e.destroy(),o=n.platformInjector.get(Ey);o.add(s),e.onDestroy(()=>{r.unsubscribe(),o.delete(s)})}else{let s=()=>n.moduleRef.destroy(),o=n.platformInjector.get(Ey);o.add(s),n.moduleRef.onDestroy(()=>{Dc(n.allPlatformModules,n.moduleRef),r.unsubscribe(),o.delete(s)})}return s1(i,t,()=>{let s=e.get(ro),o=s.add(),a=e.get(yy);return a.runInitializers(),a.donePromise.then(()=>{let c=e.get(Wc,Gc);if(xS(c||Gc),!e.get(n1,!0))return qc(n)?e.get(Xd):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(qc(n)){let u=e.get(Xd);return n.rootComponent!==void 0&&u.bootstrap(n.rootComponent),u}else return r1?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>{s.remove(o)})})})}var r1;function s1(n,e,t){try{let i=t();return $d(i)?i.catch(r=>{throw e.runOutsideAngular(()=>n(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>n(i)),i}}var Qd=null;function o1(n=[],e){return yi.create({name:e,providers:[{provide:mc,useValue:"platform"},{provide:Ey,useValue:new Set([()=>Qd=null])},...n]})}function a1(n=[]){if(Qd)return Qd;let e=o1(n);return Qd=e,vS(),c1(e),e}function c1(n){let e=n.get(yd,null);zo(n,()=>{e?.forEach(t=>t())})}function wS(n){let{rootComponent:e,appProviders:t,platformProviders:i,platformRef:r}=n;Nt(St.BootstrapApplicationStart);try{let s=r?.injector??a1(i),o=[TS(),_x,...t||[]],a=new Lc({providers:o,parent:s,debugName:"",runEnvironmentInitializers:!1});return i1({r3Injector:a.injector,platformInjector:s,rootComponent:e})}catch(s){return Promise.reject(s)}finally{Nt(St.BootstrapApplicationEnd)}}var CS=null;function ds(){return CS}function Sy(n){CS??=n}var Yc=class{},tf=(()=>{class n{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ht({token:n,factory:()=>_e(DS),providedIn:"platform"})}return n})();var DS=(()=>{class n extends tf{_location;_history;_doc=_e(En);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return ds().getBaseHref(this._doc)}onPopState(t){let i=ds().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",t,!1),()=>i.removeEventListener("popstate",t)}onHashChange(t){let i=ds().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",t,!1),()=>i.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,i,r){this._history.pushState(t,i,r)}replaceState(t,i,r){this._history.replaceState(t,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ht({token:n,factory:()=>new n,providedIn:"platform"})}return n})();var Ty=(function(n){return n[n.Decimal=0]="Decimal",n[n.Percent=1]="Percent",n[n.Currency=2]="Currency",n[n.Scientific=3]="Scientific",n})(Ty||{});var ki={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function la(n,e){let t=Yd(n),i=t[aa.NumberSymbols][e];if(typeof i>"u"){if(e===ki.CurrencyDecimal)return t[aa.NumberSymbols][ki.Decimal];if(e===ki.CurrencyGroup)return t[aa.NumberSymbols][ki.Group]}return i}function IS(n,e){return Yd(n)[aa.NumberFormats][e]}var l1=/^(\d+)?\.((\d+)(-(\d+))?)?$/,AS=22,nf=".",Zc="0",u1=";",d1=",",by="#";function f1(n,e,t,i,r,s,o=!1){let a="",c=!1;if(!isFinite(n))a=la(t,Number.isNaN(n)?ki.NaN:ki.Infinity);else{let l=m1(n);o&&(l=p1(l));let u=e.minInt,d=e.minFrac,h=e.maxFrac;if(s){let E=s.match(l1);if(E===null)throw new Oe(2306,!1);let C=E[1],b=E[3],w=E[5];C!=null&&(u=My(C)),b!=null&&(d=My(b)),w!=null?h=My(w):b!=null&&d>h&&(h=d);let M=100;if(u>M||d>M||h>M)throw new Oe(2306,!1)}g1(l,d,h);let f=l.digits,g=l.integerLen,_=l.exponent,p=[];for(c=f.every(E=>!E);g<u;g++)f.unshift(0);for(;g<0;g++)f.unshift(0);g>0?p=f.splice(g,f.length):(p=f,f=[0]);let m=[];for(f.length>=e.lgSize&&m.unshift(f.splice(-e.lgSize,f.length).join(""));f.length>e.gSize;)m.unshift(f.splice(-e.gSize,f.length).join(""));f.length&&m.unshift(f.join("")),a=m.join(la(t,i)),p.length&&(a+=la(t,r)+p.join("")),_&&(a+=la(t,ki.Exponential)+"+"+_)}return n<0&&!c?a=e.negPre+a+e.negSuf:a=e.posPre+a+e.posSuf,a}function RS(n,e,t){let i=IS(e,Ty.Decimal),r=h1(i,la(e,ki.MinusSign));return f1(n,r,e,ki.Group,ki.Decimal,t)}function h1(n,e="-"){let t={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},i=n.split(u1),r=i[0],s=i[1],o=r.indexOf(nf)!==-1?r.split(nf):[r.substring(0,r.lastIndexOf(Zc)+1),r.substring(r.lastIndexOf(Zc)+1)],a=o[0],c=o[1]||"";t.posPre=a.substring(0,a.indexOf(by));for(let u=0;u<c.length;u++){let d=c.charAt(u);d===Zc?t.minFrac=t.maxFrac=u+1:d===by?t.maxFrac=u+1:t.posSuf+=d}let l=a.split(d1);if(t.gSize=l[1]?l[1].length:0,t.lgSize=l[2]||l[1]?(l[2]||l[1]).length:0,s){let u=r.length-t.posPre.length-t.posSuf.length,d=s.indexOf(by);t.negPre=s.substring(0,d).replace(/'/g,""),t.negSuf=s.slice(d+u).replace(/'/g,"")}else t.negPre=e+t.posPre,t.negSuf=t.posSuf;return t}function p1(n){if(n.digits[0]===0)return n;let e=n.digits.length-n.integerLen;return n.exponent?n.exponent+=2:(e===0?n.digits.push(0,0):e===1&&n.digits.push(0),n.integerLen+=2),n}function m1(n){let e=Math.abs(n)+"",t=0,i,r,s,o,a;for((r=e.indexOf(nf))>-1&&(e=e.replace(nf,"")),(s=e.search(/e/i))>0?(r<0&&(r=s),r+=+e.slice(s+1),e=e.substring(0,s)):r<0&&(r=e.length),s=0;e.charAt(s)===Zc;s++);if(s===(a=e.length))i=[0],r=1;else{for(a--;e.charAt(a)===Zc;)a--;for(r-=s,i=[],o=0;s<=a;s++,o++)i[o]=Number(e.charAt(s))}return r>AS&&(i=i.splice(0,AS-1),t=r-1,r=1),{digits:i,exponent:t,integerLen:r}}function g1(n,e,t){if(e>t)throw new Oe(2307,!1);let i=n.digits,r=i.length-n.integerLen,s=Math.min(Math.max(e,r),t),o=s+n.integerLen,a=i[o];if(o>0){i.splice(Math.max(n.integerLen,o));for(let d=o;d<i.length;d++)i[d]=0}else{r=Math.max(0,r),n.integerLen=1,i.length=Math.max(1,o=s+1),i[0]=0;for(let d=1;d<o;d++)i[d]=0}if(a>=5)if(o-1<0){for(let d=0;d>o;d--)i.unshift(0),n.integerLen++;i.unshift(1),n.integerLen++}else i[o-1]++;for(;r<Math.max(0,s);r++)i.push(0);let c=s!==0,l=e+n.integerLen,u=i.reduceRight(function(d,h,f,g){return h=h+d,g[f]=h<10?h:h-10,c&&(g[f]===0&&f>=l?g.pop():c=!1),h>=10?1:0},0);u&&(i.unshift(u),n.integerLen++)}function My(n){let e=parseInt(n);if(isNaN(e))throw new Oe(2305,!1);return e}function NS(n,e){return new Oe(2100,!1)}var wy=(()=>{class n{transform(t){return t==null?null:(y1(n,t),t.toUpperCase())}static \u0275fac=function(i){return new(i||n)};static \u0275pipe=qd({name:"uppercase",type:n,pure:!0})}return n})();function y1(n,e){if(typeof e!="string")throw NS(n,e)}var Kc=(()=>{class n{_locale;constructor(t){this._locale=t}transform(t,i,r){if(!v1(t))return null;r||=this._locale;try{let s=_1(t);return RS(s,r,i)}catch(s){throw NS(n,s.message)}}static \u0275fac=function(i){return new(i||n)(kc(Wc,16))};static \u0275pipe=qd({name:"number",type:n,pure:!0})}return n})();function v1(n){return!(n==null||n===""||n!==n)}function _1(n){if(typeof n=="string"&&!isNaN(Number(n)-parseFloat(n)))return Number(n);if(typeof n!="number")throw new Oe(2309,!1);return n}var Zn=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Bc({type:n});static \u0275inj=Bo({})}return n})();function Jc(n,e){e=encodeURIComponent(e);for(let t of n.split(";")){let i=t.indexOf("="),[r,s]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()!==e)continue;let o=s;try{o=decodeURIComponent(s)}catch{}return o.length>1&&o[0]==='"'&&o[o.length-1]==='"'&&(o=o.slice(1,-1)),o}return null}var PS="browser";var Qc=class{_doc;constructor(e){this._doc=e}manager},rf=(()=>{class n extends Qc{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r,s){return t.addEventListener(i,r,s),()=>this.removeEventListener(t,i,r,s)}removeEventListener(t,i,r,s){return t.removeEventListener(i,r,s)}static \u0275fac=function(i){return new(i||n)(ot(En))};static \u0275prov=ht({token:n,factory:n.\u0275fac})}return n})(),af=new Xe(""),Iy=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,i){this._zone=i,t.forEach(o=>{o.manager=this});let r=t.filter(o=>!(o instanceof rf));this._plugins=r.slice().reverse();let s=t.find(o=>o instanceof rf);s&&this._plugins.push(s)}addEventListener(t,i,r,s){return this._findPluginFor(i).addEventListener(t,i,r,s)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(s=>s.supports(t)),!i)throw new Oe(-5101,!1);return this._eventNameToPlugin.set(t,i),i}static \u0275fac=function(i){return new(i||n)(ot(af),ot(_n))};static \u0275prov=ht({token:n,factory:n.\u0275fac})}return n})(),Cy="ng-app-id";function LS(n){for(let e of n)e.remove()}function FS(n,e){let t=e.createElement("style");return t.textContent=n,t}function S1(n,e,t,i){let r=n.head?.querySelectorAll(`style[${Cy}="${e}"],link[${Cy}="${e}"]`);if(!r||r.length===0)return!1;for(let s of r)s.removeAttribute(Cy),s instanceof HTMLLinkElement?i.set(s.href.slice(s.href.lastIndexOf("/")+1),{usage:0,elements:[s]}):s.textContent&&t.set(s.textContent,{usage:0,elements:[s]});return!0}function Ay(n,e){let t=e.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",n),t}var Ry=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,i,r,s={}){this.doc=t,this.appId=i,this.nonce=r,S1(t,i,this.inline,this.external)&&this.hosts.add(t.head)}addStyles(t,i){for(let r of t)this.addUsage(r,this.inline,FS);i?.forEach(r=>this.addUsage(r,this.external,Ay))}removeStyles(t,i){for(let r of t)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(t,i,r){let s=i.get(t);s?s.usage++:i.set(t,{usage:1,elements:[...this.hosts].map(o=>this.addElement(o,r(t,this.doc)))})}removeUsage(t,i){let r=i.get(t);r&&(r.usage--,r.usage<=0&&(LS(r.elements),i.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])LS(t);this.hosts.clear()}addHost(t){if(!this.hosts.has(t)){this.hosts.add(t);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(t,FS(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(t,Ay(i,this.doc)))}}removeHost(t){this.hosts.delete(t);for(let i of[...this.inline.values(),...this.external.values()]){let r=[];for(let s of i.elements)s.parentNode===t?s.remove():r.push(s);i.elements=r}}addElement(t,i){return this.nonce&&i.setAttribute("nonce",this.nonce),t.appendChild(i)}static \u0275fac=function(i){return new(i||n)(ot(En),ot(Ec),ot(bc,8),ot(Sc))};static \u0275prov=ht({token:n,factory:n.\u0275fac})}return n})(),Dy={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Ny=/%COMP%/g;var US="%COMP%",b1=`_nghost-${US}`,M1=`_ngcontent-${US}`,T1=!0,w1=new Xe("",{factory:()=>T1}),C1=new Xe("");function D1(n){return M1.replace(Ny,n)}function A1(n){return b1.replace(Ny,n)}function BS(n,e){return e.map(t=>t.replace(Ny,n))}var Py=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;cssVarNamespace;constructor(t,i,r,s,o,a,c=null,l=null,u=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=s,this.doc=o,this.ngZone=a,this.nonce=c,this.tracingService=l,this.cssVarNamespace=u??"",this.defaultRenderer=new el(t,o,a,this.tracingService,this.cssVarNamespace)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(t,i);return r instanceof of?r.applyToHost(t):r instanceof tl&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,s=r.get(i.id);if(!s){let o=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.tracingService;switch(i.encapsulation){case Oi.Emulated:s=new of(c,l,i,this.appId,u,o,a,d,this.cssVarNamespace);break;case Oi.ShadowDom:return new sf(c,t,i,o,a,this.nonce,d,this.cssVarNamespace,l);case Oi.ExperimentalIsolatedShadowDom:return new sf(c,t,i,o,a,this.nonce,d,this.cssVarNamespace);default:s=new tl(c,l,i,u,o,a,d,this.cssVarNamespace);break}r.set(i.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(i){return new(i||n)(ot(Iy),ot(lo),ot(Ec),ot(w1),ot(En),ot(_n),ot(bc),ot(cs,8),ot(C1,8))};static \u0275prov=ht({token:n,factory:n.\u0275fac})}return n})(),el=class{eventManager;doc;ngZone;tracingService;cssVarNamespace;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,i,r,s=""){this.eventManager=e,this.doc=t,this.ngZone=i,this.tracingService=r,this.cssVarNamespace=s}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS(Dy[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(kS(e)?e.content:e).appendChild(t)}insertBefore(e,t,i){if(e){let r=kS(e)?e.content:e;if(i!=null&&i.parentNode!==r)throw new Oe(-5106,!1);r.insertBefore(t,i)}}removeChild(e,t){t.remove()}selectRootElement(e,t){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new Oe(-5104,!1);return t||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,i,r){if(r){t=r+":"+t;let s=Dy[r];s?e.setAttributeNS(s,t,i):e.setAttribute(t,i)}else e.setAttribute(t,i)}removeAttribute(e,t,i){if(i){let r=Dy[i];r?e.removeAttributeNS(r,t):e.removeAttribute(`${i}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,i,r){let s=t.startsWith("--");s&&(t=t.replace("%NS%",this.cssVarNamespace)),s||r&(tr.DashCase|tr.Important)?e.style.setProperty(t,i,r&tr.Important?"important":""):e.style[t]=i}removeStyle(e,t,i){let r=t.startsWith("--");r&&(t=t.replace("%NS%",this.cssVarNamespace)),r||i&tr.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,i){e!=null&&(e[t]=i)}setValue(e,t){e.nodeValue=t}listen(e,t,i,r){if(typeof e=="string"&&(e=ds().getGlobalEventTarget(this.doc,e),!e))throw new Oe(-5102,!1);let s=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(s=this.tracingService.wrapEventListener(e,t,s)),this.eventManager.addEventListener(e,t,s,r)}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;e(t)===!1&&t.preventDefault()}}};function kS(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var sf=class extends el{hostEl;sharedStylesHost;shadowRoot;constructor(e,t,i,r,s,o,a,c,l){super(e,r,s,a,c),this.hostEl=t,this.sharedStylesHost=l,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let u=i.styles;u=BS(i.id,u).map(h=>h.replace(/%NS%/g,c));for(let h of u){let f=document.createElement("style");o&&f.setAttribute("nonce",o),f.textContent=h,this.shadowRoot.appendChild(f)}let d=i.getExternalStyles?.();if(d)for(let h of d){let f=Ay(h,r);o&&f.setAttribute("nonce",o),this.shadowRoot.appendChild(f)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,i){return super.insertBefore(this.nodeOrShadowRoot(e),t,i)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},tl=class extends el{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,i,r,s,o,a,c,l){super(e,s,o,a,c),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let u=i.styles,d=l?BS(l,u):u;this.styles=d.map(h=>h.replace(/%NS%/g,c)),this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&iy.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},of=class extends tl{contentAttr;hostAttr;constructor(e,t,i,r,s,o,a,c,l){let u=r+"-"+i.id;super(e,t,i,s,o,a,c,l,u),this.contentAttr=D1(u),this.hostAttr=A1(u)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let i=super.createElement(e,t);return super.setAttribute(i,this.contentAttr,""),i}};var cf=class n extends Yc{supportsDOMEvents=!0;static makeCurrent(){Sy(new n)}onAndCancel(e,t,i,r){return e.addEventListener(t,i,r),()=>{e.removeEventListener(t,i,r)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=I1();return t==null?null:R1(t)}resetBaseElement(){nl=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return Jc(document.cookie,e)}},nl=null;function I1(){return nl=nl||document.head.querySelector("base"),nl?nl.getAttribute("href"):null}function R1(n){return new URL(n,document.baseURI).pathname}var VS=["alt","control","meta","shift"],N1={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},P1={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},HS=(()=>{class n extends Qc{constructor(t){super(t)}supports(t){return n.parseEventName(t)!=null}addEventListener(t,i,r,s){let o=n.parseEventName(i),a=n.eventCallback(o.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>ds().onAndCancel(t,o.domEventName,a,s))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let s=n._normalizeKey(i.pop()),o="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),o="code."),VS.forEach(l=>{let u=i.indexOf(l);u>-1&&(i.splice(u,1),o+=l+".")}),o+=s,i.length!=0||s.length===0)return null;let c={};return c.domEventName=r,c.fullKey=o,c}static matchEventFullKeyCode(t,i){let r=N1[t.key]||t.key,s="";return i.indexOf("code.")>-1&&(r=t.code,s="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),VS.forEach(o=>{if(o!==r){let a=P1[o];a(t)&&(s+=o+".")}}),s+=r,s===i)}static eventCallback(t,i,r){return s=>{n.matchEventFullKeyCode(s,t)&&r.runGuarded(()=>i(s))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(i){return new(i||n)(ot(En))};static \u0275prov=ht({token:n,factory:n.\u0275fac})}return n})();async function Oy(n,e,t){let i=mt({rootComponent:n},O1(e,t));return wS(i)}function O1(n,e){return{platformRef:e?.platformRef,appProviders:[...B1,...n?.providers??[]],platformProviders:U1}}function L1(){cf.makeCurrent()}function F1(){return new Ii}function k1(){return Qg(document),document}var U1=[{provide:Sc,useValue:PS},{provide:yd,useValue:L1,multi:!0},{provide:En,useFactory:k1}];var B1=[{provide:mc,useValue:"root"},{provide:Ii,useFactory:F1},{provide:af,useClass:rf,multi:!0},{provide:af,useClass:HS,multi:!0},Py,{provide:lo,useClass:Ry},{provide:Ry,useExisting:lo},Iy,{provide:oo,useExisting:Py},[]];var Rr=class n{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(e){e?typeof e=="string"?this.lazyInit=()=>{this.headers=new Map,e.split(`
`).forEach(t=>{let i=t.indexOf(":");if(i>0){let r=t.slice(0,i),s=t.slice(i+1).trim();this.addHeaderEntry(r,s)}})}:typeof Headers<"u"&&e instanceof Headers?(this.headers=new Map,e.forEach((t,i)=>{this.addHeaderEntry(i,t)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(e).forEach(([t,i])=>{this.setHeaderEntries(t,i)})}:this.headers=new Map}has(e){return this.init(),this.headers.has(e.toLowerCase())}get(e){this.init();let t=this.headers.get(e.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(e){return this.init(),this.headers.get(e.toLowerCase())||null}append(e,t){return this.clone({name:e,value:t,op:"a"})}set(e,t){return this.clone({name:e,value:t,op:"s"})}delete(e,t){return this.clone({name:e,value:t,op:"d"})}maybeSetNormalizedName(e,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,e)}init(){this.lazyInit&&(this.lazyInit instanceof n?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(e=>this.applyUpdate(e)),this.lazyUpdate=null))}copyFrom(e){e.init();for(let[t,i]of e.headers.entries())this.headers.set(t,i),this.normalizedNames.set(t,e.normalizedNames.get(t))}clone(e){let t=new n;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof n?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([e]),t}applyUpdate(e){let t=e.name.toLowerCase();switch(e.op){case"a":case"s":let i=e.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(e.name,t);let r=e.op==="a"?(this.headers.get(t)||[]).slice():[];r.push(...i),this.headers.set(t,r);break;case"d":let s=e.value;if(s===void 0)this.headers.delete(t),this.normalizedNames.delete(t);else{let o=Array.isArray(s)?s:[s],a=this.headers.get(t);if(!a)return;a=a.filter(c=>o.indexOf(c)===-1),a.length===0?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,a)}break}}addHeaderEntry(e,t){let i=e.toLowerCase();this.maybeSetNormalizedName(e,i),this.headers.has(i)?this.headers.get(i).push(t):this.headers.set(i,[t])}setHeaderEntries(e,t){let i=(Array.isArray(t)?t:[t]).map(s=>s.toString()),r=e.toLowerCase();this.headers.set(r,i),this.maybeSetNormalizedName(e,r)}forEach(e){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>e(this.normalizedNames.get(t),this.headers.get(t)))}};var uf=class{map=new Map;set(e,t){return this.map.set(e,t),this}get(e){return this.map.has(e)||this.map.set(e,e.defaultValue()),this.map.get(e)}delete(e){return this.map.delete(e),this}has(e){return this.map.has(e)}keys(){return this.map.keys()}},df=class{encodeKey(e){return zS(e)}encodeValue(e){return zS(e)}decodeKey(e){return decodeURIComponent(e)}decodeValue(e){return decodeURIComponent(e)}};function V1(n,e){let t=new Map;return n.length>0&&n.replace(/^\?/,"").split("&").forEach(r=>{let s=r.indexOf("="),[o,a]=s==-1?[e.decodeKey(r),""]:[e.decodeKey(r.slice(0,s)),e.decodeValue(r.slice(s+1))],c=t.get(o)||[];c.push(a),t.set(o,c)}),t}var H1=/[&+#]/g;function zS(n){return encodeURI(n).replace(H1,encodeURIComponent)}function lf(n){return`${n}`}var Ir=class n{map;encoder;updates=null;cloneFrom=null;constructor(e={}){if(this.encoder=e.encoder||new df,e.fromString){if(e.fromObject)throw new Oe(2805,!1);this.map=V1(e.fromString,this.encoder)}else e.fromObject?(this.map=new Map,Object.keys(e.fromObject).forEach(t=>{let i=e.fromObject[t],r=Array.isArray(i)?i.map(lf):[lf(i)];r.length>0&&this.map.set(t,r)})):this.map=null}has(e){return this.init(),this.map.has(e)}get(e){this.init();let t=this.map.get(e);return t?t[0]:null}getAll(e){return this.init(),this.map.get(e)||null}keys(){return this.init(),Array.from(this.map.keys())}append(e,t){return this.clone({param:e,value:t,op:"a"})}appendAll(e){let t=[];return Object.keys(e).forEach(i=>{let r=e[i];Array.isArray(r)?r.forEach(s=>{t.push({param:i,value:s,op:"a"})}):t.push({param:i,value:r,op:"a"})}),this.clone(t)}set(e,t){return this.clone({param:e,value:t,op:"s"})}delete(e,t){return this.clone({param:e,value:t,op:"d"})}toString(){return this.init(),this.keys().map(e=>{let t=this.encoder.encodeKey(e);return this.map.get(e).map(i=>t+"="+this.encoder.encodeValue(i)).join("&")}).filter(e=>e!=="").join("&")}clone(e){let t=new n({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(e),t}init(){if(this.map===null&&(this.map=new Map),this.cloneFrom!==null){this.cloneFrom.init();for(let[e,t]of this.cloneFrom.map.entries())this.map.set(e,t);this.updates.forEach(e=>{switch(e.op){case"a":case"s":let t=e.op==="a"?(this.map.get(e.param)||[]).slice():[];t.push(lf(e.value)),this.map.set(e.param,t);break;case"d":if(e.value!==void 0){let i=(this.map.get(e.param)||[]).slice(),r=i.indexOf(lf(e.value));r!==-1&&i.splice(r,1),i.length>0?this.map.set(e.param,i):this.map.delete(e.param)}else{this.map.delete(e.param);break}}}),this.cloneFrom=this.updates=null}}};function z1(n){switch(n){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function GS(n){return typeof ArrayBuffer<"u"&&n instanceof ArrayBuffer}function jS(n){return typeof Blob<"u"&&n instanceof Blob}function WS(n){return typeof FormData<"u"&&n instanceof FormData}function G1(n){return typeof URLSearchParams<"u"&&n instanceof URLSearchParams}var Ly="Content-Type",$S="Accept",YS="text/plain",ZS="application/json",j1=`${ZS}, ${YS}, */*`,ua=class n{url;body=null;headers;context;reportProgress=!1;reportUploadProgress=!1;reportDownloadProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(e,t,i,r){this.url=t,this.method=e.toUpperCase();let s;if(z1(this.method)||r?(this.body=i!==void 0?i:null,s=r):s=i,s){if(this.reportProgress=!!s.reportProgress,this.reportUploadProgress=!!s.reportUploadProgress,this.reportDownloadProgress=!!s.reportDownloadProgress,this.withCredentials=!!s.withCredentials,this.keepalive=!!s.keepalive,s.responseType&&(this.responseType=s.responseType),s.headers&&(this.headers=s.headers),s.context&&(this.context=s.context),s.params&&(this.params=s.params),s.priority&&(this.priority=s.priority),s.cache&&(this.cache=s.cache),s.credentials&&(this.credentials=s.credentials),typeof s.timeout=="number"){if(s.timeout<1||!Number.isInteger(s.timeout))throw new Oe(2822,"");this.timeout=s.timeout}s.mode&&(this.mode=s.mode),s.redirect&&(this.redirect=s.redirect),s.integrity&&(this.integrity=s.integrity),s.referrer!==void 0&&(this.referrer=s.referrer),s.referrerPolicy&&(this.referrerPolicy=s.referrerPolicy),this.transferCache=s.transferCache}if(this.headers??=new Rr,this.context??=new uf,!this.params)this.params=new Ir,this.urlWithParams=t;else{let o=this.params.toString();if(o.length===0)this.urlWithParams=t;else{let a=t,c="",l=t.indexOf("#");l!==-1&&(c=t.substring(l),a=t.substring(0,l));let u=a.indexOf("?"),d=u===-1?"?":u<a.length-1?"&":"";this.urlWithParams=a+d+o+c}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||GS(this.body)||jS(this.body)||WS(this.body)||G1(this.body)?this.body:this.body instanceof Ir?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||WS(this.body)?null:jS(this.body)?this.body.type||null:GS(this.body)?null:typeof this.body=="string"?YS:this.body instanceof Ir?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?ZS:null}clone(e={}){let t=e.method||this.method,i=e.url||this.url,r=e.responseType||this.responseType,s=e.keepalive??this.keepalive,o=e.priority||this.priority,a=e.cache||this.cache,c=e.mode||this.mode,l=e.redirect||this.redirect,u=e.credentials||this.credentials,d=e.referrer??this.referrer,h=e.integrity||this.integrity,f=e.referrerPolicy||this.referrerPolicy,g=e.transferCache??this.transferCache,_=e.timeout??this.timeout,p=e.body!==void 0?e.body:this.body,m=e.withCredentials??this.withCredentials,E=e.reportProgress??this.reportProgress,C=e.reportUploadProgress??this.reportUploadProgress,b=e.reportDownloadProgress??this.reportDownloadProgress,w=e.headers||this.headers,M=e.params||this.params,y=e.context??this.context;return e.setHeaders!==void 0&&(w=Object.keys(e.setHeaders).reduce((S,L)=>S.set(L,e.setHeaders[L]),w)),e.setParams&&(M=Object.keys(e.setParams).reduce((S,L)=>S.set(L,e.setParams[L]),M)),new n(t,i,p,{params:M,headers:w,context:y,reportProgress:E,reportUploadProgress:C,reportDownloadProgress:b,responseType:r,withCredentials:m,transferCache:g,keepalive:s,cache:a,priority:o,timeout:_,mode:c,redirect:l,credentials:u,referrer:d,integrity:h,referrerPolicy:f})}},mo=(function(n){return n[n.Sent=0]="Sent",n[n.UploadProgress=1]="UploadProgress",n[n.ResponseHeader=2]="ResponseHeader",n[n.DownloadProgress=3]="DownloadProgress",n[n.Response=4]="Response",n[n.User=5]="User",n})(mo||{}),da=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(e,t=200,i="OK"){this.headers=e.headers||new Rr,this.status=e.status!==void 0?e.status:t,this.statusText=e.statusText||i,this.url=e.url||null,this.redirected=e.redirected,this.responseType=e.responseType,this.ok=this.status>=200&&this.status<300}},ff=class n extends da{constructor(e={}){super(e)}type=mo.ResponseHeader;clone(e={}){return new n({headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},il=class n extends da{body;constructor(e={}){super(e),this.body=e.body!==void 0?e.body:null}type=mo.Response;clone(e={}){return new n({body:e.body!==void 0?e.body:this.body,headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0,redirected:e.redirected??this.redirected,responseType:e.responseType??this.responseType})}},po=class extends da{name="HttpErrorResponse";message;error;ok=!1;constructor(e){super(e,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${e.url||"(unknown url)"}`:this.message=`Http failure response for ${e.url||"(unknown url)"}: ${e.status} ${e.statusText}`,this.error=e.error||null}},W1=200;var $1=/^\)\]\}',?\n/,e$=1024*1024,KS=new Xe("",{factory:()=>null}),hf=(()=>{class n{fetchImpl=_e(ky,{optional:!0})?.fetch??((...t)=>globalThis.fetch(...t));ngZone=_e(_n);destroyRef=_e(vi);maxResponseSize=_e(KS);handle(t){return new Bt(i=>{let r=new AbortController,s=!1,o={next:c=>{c.type===mo.Response&&(s=!0),i.next(c)},error:c=>{s=!0,i.error(c)},complete:()=>{s=!0,i.complete()}};this.doRequest(t,r.signal,o).then(Uy,c=>o.error(new po({error:c})));let a;return t.timeout&&(a=this.ngZone.runOutsideAngular(()=>setTimeout(()=>{r.signal.aborted||r.abort(new DOMException("signal timed out","TimeoutError"))},t.timeout))),()=>{a!==void 0&&clearTimeout(a),!s&&!r.signal.aborted&&r.abort()}})}async doRequest(t,i,r){let s=this.createRequestInit(t),o;try{let p=this.ngZone.runOutsideAngular(()=>this.fetchImpl(t.urlWithParams,mt({signal:i},s)));q1(p),r.next({type:mo.Sent}),o=await p}catch(p){r.error(new po({error:p,status:p.status??0,statusText:p.statusText,url:t.urlWithParams,headers:p.headers}));return}let a=new Rr(o.headers),c=o.statusText,l=o.url||t.urlWithParams,u=o.status,d=null,h=t.reportProgress||t.reportDownloadProgress;if(h&&r.next(new ff({headers:a,status:u,statusText:c,url:l})),o.body){let p=o.headers.get(Ly)??"",m=o.headers.get("content-length"),E=m!==null?Number(m):NaN;this.maxResponseSize!==null&&Number.isFinite(E)&&E>this.maxResponseSize&&(await o.body.cancel(),qS(this.maxResponseSize));let C=[],b=o.body.getReader(),w=0,M,y,S=typeof Zone<"u"&&Zone.current,L=!1;if(await this.ngZone.runOutsideAngular(async()=>{for(;;){if(this.destroyRef.destroyed){await b.cancel(),L=!0;break}let{done:O,value:k}=await b.read();if(O)break;if(C.push(k),w+=k.length,this.maxResponseSize!==null&&w>this.maxResponseSize&&(await b.cancel(),qS(this.maxResponseSize)),h){y=t.responseType==="text"?(y??"")+(M??=XS(p)).decode(k,{stream:!0}):void 0;let W=()=>r.next({type:mo.DownloadProgress,total:Number.isFinite(E)?E:void 0,loaded:w,partialText:y});S?S.run(W):W()}}}),L){r.complete();return}let I=this.concatChunks(C,w);try{d=this.parseBody(t,I,p,u)}catch(O){r.error(new po({error:O,headers:new Rr(o.headers),status:o.status,statusText:o.statusText,url:o.url||t.urlWithParams}));return}}u===0&&(u=d?W1:0);let f=u>=200&&u<300,g=o.redirected,_=o.type;f?(r.next(new il({body:d,headers:a,status:u,statusText:c,url:l,redirected:g,responseType:_})),r.complete()):r.error(new po({error:d,headers:a,status:u,statusText:c,url:l,redirected:g,responseType:_}))}parseBody(t,i,r,s){switch(t.responseType){case"json":let o=new TextDecoder().decode(i).replace($1,"");if(o==="")return null;try{return JSON.parse(o)}catch(a){if(s<200||s>=300)return o;throw a}case"text":return XS(r).decode(i);case"blob":return new Blob([i],{type:r});case"arraybuffer":return i.buffer}}createRequestInit(t){if(t.reportUploadProgress)throw new Oe(2824,!1);let i={},r;if(r=t.credentials,t.withCredentials&&(r="include"),t.headers.forEach((s,o)=>i[s]=o.join(",")),t.headers.has($S)||(i[$S]=j1),!t.headers.has(Ly)){let s=t.detectContentTypeHeader();s!==null&&(i[Ly]=s)}return{body:t.serializeBody(),method:t.method,headers:i,credentials:r,keepalive:t.keepalive,cache:t.cache,priority:t.priority,mode:t.mode,redirect:t.redirect,referrer:t.referrer,integrity:t.integrity,referrerPolicy:t.referrerPolicy}}concatChunks(t,i){let r=new Uint8Array(i),s=0;for(let o of t)r.set(o,s),s+=o.length;return r}static \u0275fac=function(i){return new(i||n)};static \u0275prov=as({token:n,factory:n.\u0275fac})}return n})(),ky=class{};function Uy(){}function q1(n){n.then(Uy,Uy)}function qS(n){throw new Oe(-2825,!1)}var X1=/charset=\s*["']?([^;"'\s]+)["']?/i;function XS(n){let e=n.match(X1);if(e!==null)try{return new TextDecoder(e[1])}catch{}return new TextDecoder}var Y1=new Xe("",{factory:()=>!0}),Z1="XSRF-TOKEN",K1=new Xe("",{factory:()=>Z1}),J1="X-XSRF-TOKEN",Q1=new Xe("",{factory:()=>J1}),eR=(()=>{class n{cookieName=_e(K1);doc=_e(En);lastCookieString="";lastToken=null;parseCount=0;getToken(){let t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=Jc(t,this.cookieName),this.lastCookieString=t),this.lastToken}static \u0275fac=function(i){return new(i||n)};static \u0275prov=as({token:n,factory:n.\u0275fac})}return n})(),JS=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=ht({token:n,factory:function(i){let r=null;return i?r=new(i||n):r=ot(eR),r},providedIn:"root"})}return n})();function QS(n,e){if(!_e(Y1)||n.method==="GET"||n.method==="HEAD")return e(n);try{let r=_e(tf).href,{origin:s}=new URL(r),{origin:o}=new URL(n.url,s);if(s!==o)return e(n)}catch{return e(n)}let t=_e(JS).getToken(),i=_e(Q1);return t!=null&&!n.headers.has(i)&&(n=n.clone({headers:n.headers.set(i,t)})),e(n)}function tR(n,e){return e(n)}function nR(n,e,t){return(i,r)=>zo(t,()=>e(i,s=>n(s,r)))}var eb=new Xe("",{factory:()=>[QS]}),tb=new Xe(""),nb=new Xe("",{factory:()=>!0});var By=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=ht({token:n,factory:function(i){let r=null;return i?r=new(i||n):r=ot(hf),r},providedIn:"root"})}return n})();var pf=(()=>{class n{backend;injector;chain=null;pendingTasks=_e(Tc);contributeToStability=_e(nb);constructor(t,i){this.backend=t,this.injector=i}handle(t){if(this.chain===null){let r=this.injector.get(mf,null,{skipSelf:!0}),s=r!==null&&this.backend===r,o=this.injector.get(tb,[],s?{self:!0}:void 0),a=Array.from(new Set([...this.injector.get(eb),...o]));this.chain=a.reduceRight((c,l)=>nR(c,l,this.injector),tR)}let i=this.chain;if(this.contributeToStability){let r=this.pendingTasks.add();try{return $c(()=>i(t,s=>this.backend.handle(s))).pipe(um(r))}catch(s){throw r(),s}}else return $c(()=>i(t,r=>this.backend.handle(r)))}static \u0275fac=function(i){return new(i||n)(ot(By),ot(qn))};static \u0275prov=ht({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),mf=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=ht({token:n,factory:function(i){let r=null;return i?r=new(i||n):r=ot(pf),r},providedIn:"root"})}return n})();function Fy(n,e){return mt({body:e},n)}var gf=(()=>{class n{handler;constructor(t){this.handler=t}request(t,i,r={}){let s;if(t instanceof ua)s=t;else{let c;r.headers instanceof Rr?c=r.headers:c=new Rr(r.headers);let l;r.params&&(r.params instanceof Ir?l=r.params:l=new Ir({fromObject:r.params})),s=new ua(t,i,r.body!==void 0?r.body:null,{headers:c,context:r.context,params:l,reportProgress:r.reportProgress,reportUploadProgress:r.reportUploadProgress,reportDownloadProgress:r.reportDownloadProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials,transferCache:r.transferCache,keepalive:r.keepalive,priority:r.priority,cache:r.cache,mode:r.mode,redirect:r.redirect,credentials:r.credentials,referrer:r.referrer,referrerPolicy:r.referrerPolicy,integrity:r.integrity,timeout:r.timeout})}let o=am(s).pipe(lm(c=>this.handler.handle(c)));if(t instanceof ua||r.observe==="events")return o;let a=o.pipe(cm(c=>c instanceof il));switch(r.observe||"body"){case"body":switch(s.responseType){case"arraybuffer":return a.pipe(Zi(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new Oe(2806,!1);return c.body}));case"blob":return a.pipe(Zi(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new Oe(2807,!1);return c.body}));case"text":return a.pipe(Zi(c=>{if(c.body!==null&&typeof c.body!="string")throw new Oe(2808,!1);return c.body}));default:return a.pipe(Zi(c=>c.body))}case"response":return a;default:throw new Oe(2809,!1)}}delete(t,i={}){return this.request("DELETE",t,i)}get(t,i={}){return this.request("GET",t,i)}head(t,i={}){return this.request("HEAD",t,i)}jsonp(t,i){return this.request("JSONP",t,{params:new Ir().append(i,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,i={}){return this.request("OPTIONS",t,i)}patch(t,i,r={}){return this.request("PATCH",t,Fy(r,i))}post(t,i,r={}){return this.request("POST",t,Fy(r,i))}put(t,i,r={}){return this.request("PUT",t,Fy(r,i))}static \u0275fac=function(i){return new(i||n)(ot(mf))};static \u0275prov=ht({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Vy(...n){let e=[gf,hf,pf,{provide:mf,useExisting:pf},{provide:By,useFactory:()=>_e(hf)},{provide:eb,useValue:QS,multi:!0}];for(let t of n)e.push(...t.\u0275providers);return Ks(e)}var ib={providers:[dg(),Vy()]};var yf=class n{http=_e(gf);getScenario(){return this.http.get("/api/scenario")}generateRandomScenario(e){return this.http.get(`/api/scenario/random?seed=${e}`)}getResults(){return this.http.get("/api/results")}runAlgorithm(e){return this.http.get(`/api/run/${e}`)}runTrolley(){return this.http.get("/api/trolley")}static \u0275fac=function(t){return new(t||n)};static \u0275prov=ht({token:n,factory:n.\u0275fac,providedIn:"root"})};var bs={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ms={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Rb=0,gv=1,Nb=2;var zl=1,xh=2,Ha=3,Ts=0,Wn=1,cr=2,Eo=0,za=1,yv=2,vv=3,_v=4,Pb=5;var So=100,Ob=101,Lb=102,Fb=103,kb=104,Ub=200,Bb=201,Vb=202,Hb=203,xv=204,Ev=205,zb=206,Gb=207,jb=208,Wb=209,$b=210,qb=211,Xb=212,Yb=213,Zb=214,Gf=0,jf=1,Wf=2,Ia=3,$f=4,qf=5,Xf=6,Yf=7,Sv=0,Kb=1,Jb=2,lr=0,bv=1,Mv=2,Tv=3,wv=4,Cv=5,Dv=6,Av=7;var Iv=300,bo=301,Ga=302,Eh=303,Sh=304,Zf=1e3,sr=1001,Kf=1002,yn=1003,Qb=1004;var Gl=1005;var Gn=1006,bh=1007;var jr=1008;var Jn=1009,Rv=1010,Nv=1011,ja=1012,Mh=1013,Gi=1014,ji=1015,Wi=1016,Th=1017,wh=1018,Mo=1020,Pv=35902,Ov=35899,Lv=1021,Fv=1022,$i=1023,Br=1026,Wr=1027,kv=1028,Ch=1029,ws=1030,Dh=1031;var Ah=1033,jl=33776,Wl=33777,$l=33778,ql=33779,Ih=35840,Rh=35841,Nh=35842,Ph=35843,Oh=36196,Lh=37492,Fh=37496,kh=37488,Uh=37489,Xl=37490,Bh=37491,Vh=37808,Hh=37809,zh=37810,Gh=37811,jh=37812,Wh=37813,$h=37814,qh=37815,Xh=37816,Yh=37817,Zh=37818,Kh=37819,Jh=37820,Qh=37821,ep=36492,tp=36494,np=36495,ip=36283,rp=36284,Yl=36285,sp=36286;var pl=2300,Jf=2301,Hf=2302,cv=2303,lv=2400,uv=2401,dv=2402;var eM=3200;var op=0,tM=1,$r="",zn="srgb",ml="srgb-linear",gl="linear",Ct="srgb";var zf=7680;var nM=519,iM=512,rM=513,sM=514,Uv=515,oM=516,aM=517,Bv=518,Vv=519,Hv=35044;var zv="300 es",Mi=2e3,Ra=2001;function iR(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function rR(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function yl(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function cM(){let n=yl("canvas");return n.style.display="block",n}var rb={},Na=null;function vl(...n){let e="THREE."+n.shift();Na?Na("log",e,...n):console.log(e,...n)}function lM(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ve(...n){n=lM(n);let e="THREE."+n.shift();if(Na)Na("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function He(...n){n=lM(n);let e="THREE."+n.shift();if(Na)Na("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function dl(...n){let e=n.join(" ");e in rb||(rb[e]=!0,Ve(...n))}function uM(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var dM={[Gf]:Gf,[Wf]:Xf,[$f]:$f,[Ia]:qf,[jf]:jf,[Xf]:Wf,[Yf]:Yf,[qf]:Ia},zi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},Rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],sb=1234567,fl=Math.PI/180,Pa=180/Math.PI;function Cs(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Rn[n&255]+Rn[n>>8&255]+Rn[n>>16&255]+Rn[n>>24&255]+"-"+Rn[e&255]+Rn[e>>8&255]+"-"+Rn[e>>16&15|64]+Rn[e>>24&255]+"-"+Rn[t&63|128]+Rn[t>>8&255]+"-"+Rn[t>>16&255]+Rn[t>>24&255]+Rn[i&255]+Rn[i>>8&255]+Rn[i>>16&255]+Rn[i>>24&255]).toLowerCase()}function rt(n,e,t){return Math.max(e,Math.min(t,n))}function Gv(n,e){return(n%e+e)%e}function sR(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function oR(n,e,t){return n!==e?(t-n)/(e-n):0}function hl(n,e,t){return(1-t)*n+t*e}function aR(n,e,t,i){return hl(n,e,1-Math.exp(-t*i))}function cR(n,e=1){return e-Math.abs(Gv(n,e*2)-e)}function lR(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function uR(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function dR(n,e){return n+Math.floor(Math.random()*(e-n+1))}function fR(n,e){return n+Math.random()*(e-n)}function hR(n){return n*(.5-Math.random())}function pR(n){n!==void 0&&(sb=n);let e=sb+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function mR(n){return n*fl}function gR(n){return n*Pa}function yR(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function vR(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function jv(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function _R(n,e,t,i,r){let s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+i)/2),u=o((e+i)/2),d=s((e-i)/2),h=o((e-i)/2),f=s((i-e)/2),g=o((i-e)/2);switch(r){case"XYX":n.set(a*u,c*d,c*h,a*l);break;case"YZY":n.set(c*h,a*u,c*d,a*l);break;case"ZXZ":n.set(c*d,c*h,a*u,a*l);break;case"XZX":n.set(a*u,c*g,c*f,a*l);break;case"YXY":n.set(c*f,a*u,c*g,a*l);break;case"ZYZ":n.set(c*g,c*f,a*u,a*l);break;default:Ve("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ap(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Wv(n,e){if(e.constructor===Float32Array)return n;let t=ap(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/t,-1)}function $v(n,e){if(e.constructor===Float32Array)return n;let t=ap(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*t)}var qv={DEG2RAD:fl,RAD2DEG:Pa,generateUUID:Cs,clamp:rt,euclideanModulo:Gv,mapLinear:sR,inverseLerp:oR,lerp:hl,damp:aR,pingpong:cR,smoothstep:lR,smootherstep:uR,randInt:dR,randFloat:fR,randFloatSpread:hR,seededRandom:pR,degToRad:mR,radToDeg:gR,isPowerOfTwo:yR,ceilPowerOfTwo:vR,floorPowerOfTwo:jv,setQuaternionFromProperEuler:_R,normalize:$v,denormalize:Wv},Le=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ci=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],h=s[o+0],f=s[o+1],g=s[o+2],_=s[o+3];if(d!==_||c!==h||l!==f||u!==g){let p=c*h+l*f+u*g+d*_;p<0&&(h=-h,f=-f,g=-g,_=-_,p=-p);let m=1-a;if(p<.9995){let E=Math.acos(p),C=Math.sin(E);m=Math.sin(m*E)/C,a=Math.sin(a*E)/C,c=c*m+h*a,l=l*m+f*a,u=u*m+g*a,d=d*m+_*a}else{c=c*m+h*a,l=l*m+f*a,u=u*m+g*a,d=d*m+_*a;let E=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=E,l*=E,u*=E,d*=E}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=s[o],h=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+u*d+c*f-l*h,e[t+1]=c*g+u*h+l*d-a*f,e[t+2]=l*g+u*f+a*h-c*d,e[t+3]=u*g-a*d-c*h-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),d=a(s/2),h=c(i/2),f=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"YZX":this._x=h*u*d+l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d-h*f*g;break;case"XZY":this._x=h*u*d-l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d+h*f*g;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=i+a+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(s-l)*f,this._z=(o-r)*f}else if(i>a&&i>d){let f=2*Math.sqrt(1+i-a-d);this._w=(u-c)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+l)/f}else if(a>d){let f=2*Math.sqrt(1+a-i-d);this._w=(s-l)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+d-i-a);this._w=(o-r)/f,this._x=(s+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ob.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ob.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+c*l+o*d-a*u,this.y=i+c*u+a*l-s*d,this.z=r+c*d+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Hy.copy(this).projectOnVector(e),this.sub(Hy)}reflect(e){return this.sub(Hy.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Hy=new F,ob=new ci,je=class{static{this.prototype.isMatrix3=!0}constructor(e,t,i,r,s,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],d=i[7],h=i[2],f=i[5],g=i[8],_=r[0],p=r[3],m=r[6],E=r[1],C=r[4],b=r[7],w=r[2],M=r[5],y=r[8];return s[0]=o*_+a*E+c*w,s[3]=o*p+a*C+c*M,s[6]=o*m+a*b+c*y,s[1]=l*_+u*E+d*w,s[4]=l*p+u*C+d*M,s[7]=l*m+u*b+d*y,s[2]=h*_+f*E+g*w,s[5]=h*p+f*C+g*M,s[8]=h*m+f*b+g*y,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,h=a*c-u*s,f=l*s-o*c,g=t*d+i*h+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=d*_,e[1]=(r*l-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=h*_,e[4]=(u*t-r*c)*_,e[5]=(r*s-a*t)*_,e[6]=f*_,e[7]=(i*c-l*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return dl("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(zy.makeScale(e,t)),this}rotate(e){return dl("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(zy.makeRotation(-e)),this}translate(e,t){return dl("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(zy.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},zy=new je,ab=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cb=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xR(){let n={enabled:!0,workingColorSpace:ml,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Ct&&(r.r=Ur(r.r),r.g=Ur(r.g),r.b=Ur(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ct&&(r.r=Aa(r.r),r.g=Aa(r.g),r.b=Aa(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===$r?gl:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[o].fromXYZ).multiply(this.spaces[s].toXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ml]:{primaries:e,whitePoint:i,transfer:gl,toXYZ:ab,fromXYZ:cb,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:zn},outputColorSpaceConfig:{drawingBufferColorSpace:zn}},[zn]:{primaries:e,whitePoint:i,transfer:Ct,toXYZ:ab,fromXYZ:cb,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:zn}}}),n}var ut=xR();function Ur(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Aa(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var fa,Qf=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{fa===void 0&&(fa=yl("canvas")),fa.width=e.width,fa.height=e.height;let r=fa.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=fa}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=yl("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ur(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ur(t[i]/255)*255):t[i]=Ur(t[i]);return{data:t,width:e.width,height:e.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ER=0,Oa=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ER++}),this.uuid=Cs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Gy(r[o].image)):s.push(Gy(r[o]))}else s=Gy(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function Gy(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Qf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}var SR=0,jy=new F,jn=class n extends zi{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=sr,r=sr,s=Gn,o=jr,a=$i,c=Jn,l=n.DEFAULT_ANISOTROPY,u=$r){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:SR++}),this.uuid=Cs(),this.name="",this.source=new Oa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Le(0,0),this.repeat=new Le(1,1),this.center=new Le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(jy).x}get height(){return this.source.getSize(jy).y}get depth(){return this.source.getSize(jy).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Ve(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ve(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Iv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Zf:e.x=e.x-Math.floor(e.x);break;case sr:e.x=e.x<0?0:1;break;case Kf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Zf:e.y=e.y-Math.floor(e.y);break;case sr:e.y=e.y<0?0:1;break;case Kf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};jn.DEFAULT_IMAGE=null;jn.DEFAULT_MAPPING=Iv;jn.DEFAULT_ANISOTROPY=1;var $t=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],f=c[5],g=c[9],_=c[2],p=c[6],m=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let C=(l+1)/2,b=(f+1)/2,w=(m+1)/2,M=(u+h)/4,y=(d+_)/4,S=(g+p)/4;return C>b&&C>w?C<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(C),r=M/i,s=y/i):b>w?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=M/r,s=S/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=y/s,r=S/s),this.set(i,r,s,t),this}let E=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(E)<.001&&(E=1),this.x=(p-g)/E,this.y=(d-_)/E,this.z=(h-u)/E,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},eh=class extends zi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new $t(0,0,e,t),this.scissorTest=!1,this.viewport=new $t(0,0,e,t),this.textures=[];let r=i.count;for(let s=0;s<r;s++)this.textures[s]=new jn({width:e,height:t,depth:i.depth}),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Gn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Oa(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},li=class extends eh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},_l=class extends jn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=yn,this.minFilter=yn,this.wrapR=sr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var th=class extends jn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=yn,this.minFilter=yn,this.wrapR=sr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ht=class n{static{this.prototype.isMatrix4=!0}constructor(e,t,i,r,s,o,a,c,l,u,d,h,f,g,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,u,d,h,f,g,_,p)}set(e,t,i,r,s,o,a,c,l,u,d,h,f,g,_,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,r=1/ha.setFromMatrixColumn(e,0).length(),s=1/ha.setFromMatrixColumn(e,1).length(),o=1/ha.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let h=o*u,f=o*d,g=a*u,_=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=f+g*l,t[5]=h-_*l,t[9]=-a*c,t[2]=_-h*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){let h=c*u,f=c*d,g=l*u,_=l*d;t[0]=h+_*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=f*a-g,t[6]=_+h*a,t[10]=o*c}else if(e.order==="ZXY"){let h=c*u,f=c*d,g=l*u,_=l*d;t[0]=h-_*a,t[4]=-o*d,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let h=o*u,f=o*d,g=a*u,_=a*d;t[0]=c*u,t[4]=g*l-f,t[8]=h*l+_,t[1]=c*d,t[5]=_*l+h,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let h=o*c,f=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=_-h*d,t[8]=g*d+f,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=f*d+g,t[10]=h-_*d}else if(e.order==="XZY"){let h=o*c,f=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+_,t[5]=o*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=a*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bR,e,MR)}lookAt(e,t,i){let r=this.elements;return si.subVectors(e,t),si.lengthSq()===0&&(si.z=1),si.normalize(),fs.crossVectors(i,si),fs.lengthSq()===0&&(Math.abs(i.z)===1?si.x+=1e-4:si.z+=1e-4,si.normalize(),fs.crossVectors(i,si)),fs.normalize(),vf.crossVectors(si,fs),r[0]=fs.x,r[4]=vf.x,r[8]=si.x,r[1]=fs.y,r[5]=vf.y,r[9]=si.y,r[2]=fs.z,r[6]=vf.z,r[10]=si.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],d=i[5],h=i[9],f=i[13],g=i[2],_=i[6],p=i[10],m=i[14],E=i[3],C=i[7],b=i[11],w=i[15],M=r[0],y=r[4],S=r[8],L=r[12],I=r[1],O=r[5],k=r[9],W=r[13],A=r[2],z=r[6],$=r[10],G=r[14],re=r[3],P=r[7],X=r[11],ie=r[15];return s[0]=o*M+a*I+c*A+l*re,s[4]=o*y+a*O+c*z+l*P,s[8]=o*S+a*k+c*$+l*X,s[12]=o*L+a*W+c*G+l*ie,s[1]=u*M+d*I+h*A+f*re,s[5]=u*y+d*O+h*z+f*P,s[9]=u*S+d*k+h*$+f*X,s[13]=u*L+d*W+h*G+f*ie,s[2]=g*M+_*I+p*A+m*re,s[6]=g*y+_*O+p*z+m*P,s[10]=g*S+_*k+p*$+m*X,s[14]=g*L+_*W+p*G+m*ie,s[3]=E*M+C*I+b*A+w*re,s[7]=E*y+C*O+b*z+w*P,s[11]=E*S+C*k+b*$+w*X,s[15]=E*L+C*W+b*G+w*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],_=e[7],p=e[11],m=e[15],E=c*f-l*h,C=a*f-l*d,b=a*h-c*d,w=o*f-l*u,M=o*h-c*u,y=o*d-a*u;return t*(_*E-p*C+m*b)-i*(g*E-p*w+m*M)+r*(g*C-_*w+m*y)-s*(g*b-_*M+p*y)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],o=e[5],a=e[9],c=e[2],l=e[6],u=e[10];return t*(o*u-a*l)-i*(s*u-a*c)+r*(s*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],_=e[13],p=e[14],m=e[15],E=t*a-i*o,C=t*c-r*o,b=t*l-s*o,w=i*c-r*a,M=i*l-s*a,y=r*l-s*c,S=u*_-d*g,L=u*p-h*g,I=u*m-f*g,O=d*p-h*_,k=d*m-f*_,W=h*m-f*p,A=E*W-C*k+b*O+w*I-M*L+y*S;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/A;return e[0]=(a*W-c*k+l*O)*z,e[1]=(r*k-i*W-s*O)*z,e[2]=(_*y-p*M+m*w)*z,e[3]=(h*M-d*y-f*w)*z,e[4]=(c*I-o*W-l*L)*z,e[5]=(t*W-r*I+s*L)*z,e[6]=(p*b-g*y-m*C)*z,e[7]=(u*y-h*b+f*C)*z,e[8]=(o*k-a*I+l*S)*z,e[9]=(i*I-t*k-s*S)*z,e[10]=(g*M-_*b+m*E)*z,e[11]=(d*b-u*M-f*E)*z,e[12]=(a*L-o*O-c*S)*z,e[13]=(t*O-i*L+r*S)*z,e[14]=(_*C-g*w-p*E)*z,e[15]=(u*w-d*C+h*E)*z,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,d=a+a,h=s*l,f=s*u,g=s*d,_=o*u,p=o*d,m=a*d,E=c*l,C=c*u,b=c*d,w=i.x,M=i.y,y=i.z;return r[0]=(1-(_+m))*w,r[1]=(f+b)*w,r[2]=(g-C)*w,r[3]=0,r[4]=(f-b)*M,r[5]=(1-(h+m))*M,r[6]=(p+E)*M,r[7]=0,r[8]=(g+C)*y,r[9]=(p-E)*y,r[10]=(1-(h+_))*y,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let o=ha.set(r[0],r[1],r[2]).length(),a=ha.set(r[4],r[5],r[6]).length(),c=ha.set(r[8],r[9],r[10]).length();s<0&&(o=-o),Ui.copy(this);let l=1/o,u=1/a,d=1/c;return Ui.elements[0]*=l,Ui.elements[1]*=l,Ui.elements[2]*=l,Ui.elements[4]*=u,Ui.elements[5]*=u,Ui.elements[6]*=u,Ui.elements[8]*=d,Ui.elements[9]*=d,Ui.elements[10]*=d,t.setFromRotationMatrix(Ui),i.x=o,i.y=a,i.z=c,this}makePerspective(e,t,i,r,s,o,a=Mi,c=!1){let l=this.elements,u=2*s/(t-e),d=2*s/(i-r),h=(t+e)/(t-e),f=(i+r)/(i-r),g,_;if(c)g=s/(o-s),_=o*s/(o-s);else if(a===Mi)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Ra)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Mi,c=!1){let l=this.elements,u=2/(t-e),d=2/(i-r),h=-(t+e)/(t-e),f=-(i+r)/(i-r),g,_;if(c)g=1/(o-s),_=o/(o-s);else if(a===Mi)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===Ra)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},ha=new F,Ui=new Ht,bR=new F(0,0,0),MR=new F(1,1,1),fs=new F,vf=new F,si=new F,lb=new Ht,ub=new ci,Vr=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-rt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(rt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return lb.makeRotationFromQuaternion(e),this.setFromRotationMatrix(lb,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ub.setFromEuler(this),this.setFromQuaternion(ub,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Vr.DEFAULT_ORDER="XYZ";var xl=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},TR=0,db=new F,pa=new ci,Nr=new Ht,_f=new F,rl=new F,wR=new F,CR=new ci,fb=new F(1,0,0),hb=new F(0,1,0),pb=new F(0,0,1),mb={type:"added"},DR={type:"removed"},ma={type:"childadded",child:null},Wy={type:"childremoved",child:null},bn=class n extends zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:TR++}),this.uuid=Cs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new F,t=new Vr,i=new ci,r=new F(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ht},normalMatrix:{value:new je}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pa.setFromAxisAngle(e,t),this.quaternion.multiply(pa),this}rotateOnWorldAxis(e,t){return pa.setFromAxisAngle(e,t),this.quaternion.premultiply(pa),this}rotateX(e){return this.rotateOnAxis(fb,e)}rotateY(e){return this.rotateOnAxis(hb,e)}rotateZ(e){return this.rotateOnAxis(pb,e)}translateOnAxis(e,t){return db.copy(e).applyQuaternion(this.quaternion),this.position.add(db.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fb,e)}translateY(e){return this.translateOnAxis(hb,e)}translateZ(e){return this.translateOnAxis(pb,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Nr.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?_f.copy(e):_f.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),rl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nr.lookAt(rl,_f,this.up):Nr.lookAt(_f,rl,this.up),this.quaternion.setFromRotationMatrix(Nr),r&&(Nr.extractRotation(r.matrixWorld),pa.setFromRotationMatrix(Nr),this.quaternion.premultiply(pa.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(He("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(mb),ma.child=e,this.dispatchEvent(ma),ma.child=null):He("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(DR),Wy.child=e,this.dispatchEvent(Wy),Wy.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Nr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Nr.multiply(e.parent.matrixWorld)),e.applyMatrix4(Nr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(mb),ma.child=e,this.dispatchEvent(ma),ma.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rl,e,wR),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rl,CR,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>Zt(mt({},a),{boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>mt({},a)),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};bn.DEFAULT_UP=new F(0,1,0);bn.DEFAULT_MATRIX_AUTO_UPDATE=!0;bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Kn=class extends bn{constructor(){super(),this.isGroup=!0,this.type="Group"}},AR={type:"move"},La=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Kn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Kn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Kn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let p=t.getJointPose(_,i),m=this._getHandJoint(l,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&h>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(AR)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Kn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},fM={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hs={h:0,s:0,l:0},xf={h:0,s:0,l:0};function $y(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Ke=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=ut.workingColorSpace){return this.r=e,this.g=t,this.b=i,ut.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=ut.workingColorSpace){if(e=Gv(e,1),t=rt(t,0,1),i=rt(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=$y(o,s,e+1/3),this.g=$y(o,s,e),this.b=$y(o,s,e-1/3)}return ut.colorSpaceToWorking(this,r),this}setStyle(e,t=zn){function i(s){s!==void 0&&parseFloat(s)<1&&Ve("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseFloat(s[1]))/100,Math.min(100,parseFloat(s[2]))/100,Math.min(100,parseFloat(s[3]))/100,t);break;case"hsl":case"hsla":if(s=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ve("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zn){let i=fM[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ur(e.r),this.g=Ur(e.g),this.b=Ur(e.b),this}copyLinearToSRGB(e){return this.r=Aa(e.r),this.g=Aa(e.g),this.b=Aa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zn){return ut.workingToColorSpace(Nn.copy(this),e),Math.round(rt(Nn.r*255,0,255))*65536+Math.round(rt(Nn.g*255,0,255))*256+Math.round(rt(Nn.b*255,0,255))}getHexString(e=zn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.workingToColorSpace(Nn.copy(this),t);let i=Nn.r,r=Nn.g,s=Nn.b,o=Math.max(i,r,s),a=Math.min(i,r,s),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=ut.workingColorSpace){return ut.workingToColorSpace(Nn.copy(this),t),e.r=Nn.r,e.g=Nn.g,e.b=Nn.b,e}getStyle(e=zn){ut.workingToColorSpace(Nn.copy(this),e);let t=Nn.r,i=Nn.g,r=Nn.b;return e!==zn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(hs),this.setHSL(hs.h+e,hs.s+t,hs.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(hs),e.getHSL(xf);let i=hl(hs.h,xf.h,t),r=hl(hs.s,xf.s,t),s=hl(hs.l,xf.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Nn=new Ke;Ke.NAMES=fM;var El=class n{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ke(e),this.near=t,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Sl=class extends bn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vr,this.environmentIntensity=1,this.environmentRotation=new Vr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Bi=new F,Pr=new F,qy=new F,Or=new F,ga=new F,ya=new F,gb=new F,Xy=new F,Yy=new F,Zy=new F,Ky=new $t,Jy=new $t,Qy=new $t,kr=class n{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Bi.subVectors(e,t),r.cross(Bi);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Bi.subVectors(r,t),Pr.subVectors(i,t),qy.subVectors(e,t);let o=Bi.dot(Bi),a=Bi.dot(Pr),c=Bi.dot(qy),l=Pr.dot(Pr),u=Pr.dot(qy),d=o*l-a*a;if(d===0)return s.set(0,0,0),null;let h=1/d,f=(l*c-a*u)*h,g=(o*u-a*c)*h;return s.set(1-f-g,g,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Or)===null?!1:Or.x>=0&&Or.y>=0&&Or.x+Or.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,Or)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Or.x),c.addScaledVector(o,Or.y),c.addScaledVector(a,Or.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return Ky.setScalar(0),Jy.setScalar(0),Qy.setScalar(0),Ky.fromBufferAttribute(e,t),Jy.fromBufferAttribute(e,i),Qy.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Ky,s.x),o.addScaledVector(Jy,s.y),o.addScaledVector(Qy,s.z),o}static isFrontFacing(e,t,i,r){return Bi.subVectors(i,t),Pr.subVectors(e,t),Bi.cross(Pr).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Bi.subVectors(this.c,this.b),Pr.subVectors(this.a,this.b),Bi.cross(Pr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;ga.subVectors(r,i),ya.subVectors(s,i),Xy.subVectors(e,i);let c=ga.dot(Xy),l=ya.dot(Xy);if(c<=0&&l<=0)return t.copy(i);Yy.subVectors(e,r);let u=ga.dot(Yy),d=ya.dot(Yy);if(u>=0&&d<=u)return t.copy(r);let h=c*d-u*l;if(h<=0&&c>=0&&u<=0&&c-u>0)return o=c/(c-u),t.copy(i).addScaledVector(ga,o);Zy.subVectors(e,s);let f=ga.dot(Zy),g=ya.dot(Zy);if(g>=0&&f<=g)return t.copy(s);let _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(ya,a);let p=u*g-f*d;if(p<=0&&d-u>=0&&f-g>=0)return gb.subVectors(s,r),a=(d-u)/(d-u+(f-g)),t.copy(r).addScaledVector(gb,a);let m=1/(p+_+h);return o=_*m,a=h*m,t.copy(i).addScaledVector(ga,o).addScaledVector(ya,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ys=class{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Vi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Vi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Vi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Vi):Vi.fromBufferAttribute(s,o),Vi.applyMatrix4(e.matrixWorld),this.expandByPoint(Vi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ef.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ef.copy(i.boundingBox)),Ef.applyMatrix4(e.matrixWorld),this.union(Ef)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vi),Vi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(sl),Sf.subVectors(this.max,sl),va.subVectors(e.a,sl),_a.subVectors(e.b,sl),xa.subVectors(e.c,sl),ps.subVectors(_a,va),ms.subVectors(xa,_a),go.subVectors(va,xa);let t=[0,-ps.z,ps.y,0,-ms.z,ms.y,0,-go.z,go.y,ps.z,0,-ps.x,ms.z,0,-ms.x,go.z,0,-go.x,-ps.y,ps.x,0,-ms.y,ms.x,0,-go.y,go.x,0];return!ev(t,va,_a,xa,Sf)||(t=[1,0,0,0,1,0,0,0,1],!ev(t,va,_a,xa,Sf))?!1:(bf.crossVectors(ps,ms),t=[bf.x,bf.y,bf.z],ev(t,va,_a,xa,Sf))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Lr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Lr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Lr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Lr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Lr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Lr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Lr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Lr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Lr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Lr=[new F,new F,new F,new F,new F,new F,new F,new F],Vi=new F,Ef=new ys,va=new F,_a=new F,xa=new F,ps=new F,ms=new F,go=new F,sl=new F,Sf=new F,bf=new F,yo=new F;function ev(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){yo.fromArray(n,s);let a=r.x*Math.abs(yo.x)+r.y*Math.abs(yo.y)+r.z*Math.abs(yo.z),c=e.dot(yo),l=t.dot(yo),u=i.dot(yo);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var an=new F,Mf=new Le,IR=0,Hi=class extends zi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:IR++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Hv,this.updateRanges=[],this.gpuType=ji,this.version=0,this._normalizationScale=e!==void 0?ap(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Mf.fromBufferAttribute(this,t),Mf.applyMatrix3(e),this.setXY(t,Mf.x,Mf.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)an.fromBufferAttribute(this,t),an.applyMatrix3(e),this.setXYZ(t,an.x,an.y,an.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)an.fromBufferAttribute(this,t),an.applyMatrix4(e),this.setXYZ(t,an.x,an.y,an.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)an.fromBufferAttribute(this,t),an.applyNormalMatrix(e),this.setXYZ(t,an.x,an.y,an.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)an.fromBufferAttribute(this,t),an.transformDirection(e),this.setXYZ(t,an.x,an.y,an.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),r=this._normalize(r),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Wv(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):$v(e,this.array)}};var bl=class extends Hi{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Ml=class extends Hi{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var rn=class extends Hi{constructor(e,t,i){super(new Float32Array(e),t,i)}},RR=new ys,ol=new F,tv=new F,Fa=class{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):RR.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ol.subVectors(e,this.center);let t=ol.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ol,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(tv.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ol.copy(e.center).add(tv)),this.expandByPoint(ol.copy(e.center).sub(tv))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},NR=0,bi=new Ht,nv=new bn,Ea=new F,oi=new ys,al=new ys,gn=new F,Ti=class n extends zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:NR++}),this.uuid=Cs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(iR(e)?Ml:bl)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return bi.makeRotationFromQuaternion(e),this.applyMatrix4(bi),this}rotateX(e){return bi.makeRotationX(e),this.applyMatrix4(bi),this}rotateY(e){return bi.makeRotationY(e),this.applyMatrix4(bi),this}rotateZ(e){return bi.makeRotationZ(e),this.applyMatrix4(bi),this}translate(e,t,i){return bi.makeTranslation(e,t,i),this.applyMatrix4(bi),this}scale(e,t,i){return bi.makeScale(e,t,i),this.applyMatrix4(bi),this}lookAt(e){return nv.lookAt(e),nv.updateMatrix(),this.applyMatrix4(nv.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ea).negate(),this.translate(Ea.x,Ea.y,Ea.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new rn(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ys);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];oi.setFromBufferAttribute(s),this.morphTargetsRelative?(gn.addVectors(this.boundingBox.min,oi.min),this.boundingBox.expandByPoint(gn),gn.addVectors(this.boundingBox.max,oi.max),this.boundingBox.expandByPoint(gn)):(this.boundingBox.expandByPoint(oi.min),this.boundingBox.expandByPoint(oi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&He('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fa);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){let i=this.boundingSphere.center;if(oi.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];al.setFromBufferAttribute(a),this.morphTargetsRelative?(gn.addVectors(oi.min,al.min),oi.expandByPoint(gn),gn.addVectors(oi.max,al.max),oi.expandByPoint(gn)):(oi.expandByPoint(al.min),oi.expandByPoint(al.max))}oi.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)gn.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(gn));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)gn.fromBufferAttribute(a,l),c&&(Ea.fromBufferAttribute(e,l),gn.add(Ea)),r=Math.max(r,i.distanceToSquared(gn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&He('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){He("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new Hi(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],c=[],l=new Uint8Array(i.count);for(let L=0;L<i.count;L++)a[L]=new F,c[L]=new F;let u=new F,d=new F,h=new F,f=new Le,g=new Le,_=new Le,p=new F,m=new F;function E(L,I,O){l[L]=l[I]=l[O]=1,u.fromBufferAttribute(i,L),d.fromBufferAttribute(i,I),h.fromBufferAttribute(i,O),f.fromBufferAttribute(s,L),g.fromBufferAttribute(s,I),_.fromBufferAttribute(s,O),d.sub(u),h.sub(u),g.sub(f),_.sub(f);let k=1/(g.x*_.y-_.x*g.y);isFinite(k)&&(p.copy(d).multiplyScalar(_.y).addScaledVector(h,-g.y).multiplyScalar(k),m.copy(h).multiplyScalar(g.x).addScaledVector(d,-_.x).multiplyScalar(k),a[L].add(p),a[I].add(p),a[O].add(p),c[L].add(m),c[I].add(m),c[O].add(m))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let L=0,I=C.length;L<I;++L){let O=C[L],k=O.start,W=O.count;for(let A=k,z=k+W;A<z;A+=3)E(e.getX(A+0),e.getX(A+1),e.getX(A+2))}let b=new F,w=new F,M=new F,y=new F;function S(L){M.fromBufferAttribute(r,L),y.copy(M);let I=a[L];b.copy(I),b.sub(M.multiplyScalar(M.dot(I))).normalize(),w.crossVectors(y,I);let k=w.dot(c[L])<0?-1:1;o.setXYZW(L,b.x,b.y,b.z,k)}for(let L=0,I=i.count;L<I;++L)l[L]&&S(L);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Hi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);let r=new F,s=new F,o=new F,a=new F,c=new F,l=new F,u=new F,d=new F;if(e)for(let h=0,f=e.count;h<f;h+=3){let g=e.getX(h+0),_=e.getX(h+1),p=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,p),a.add(u),c.add(u),l.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let h=0,f=t.count;h<f;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)gn.fromBufferAttribute(e,t),gn.normalize(),e.setXYZ(t,gn.x,gn.y,gn.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,h=new l.constructor(c.length*u),f=0,g=0;for(let _=0,p=c.length;_<p;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*u;for(let m=0;m<u;m++)h[g++]=l[f++]}return new Hi(h,u,d)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,i);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let u=0,d=l.length;u<d;u++){let h=l[u],f=e(h,i);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){let f=l[d];u.push(f.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],d=s[l];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},nh=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Hv,this.updateRanges=[],this.version=0,this.uuid=Cs()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=yb(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let i=new this.array.constructor(e.arrayBuffers[t]),r=new this.constructor(i,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=yb(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let i={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}};function yb(n){return n.buffer._uuid===void 0&&(n.buffer._uuid=Cs()),n.byteOffset===0&&n.byteLength===n.buffer.byteLength?n.buffer._uuid:n.buffer._uuid+":"+n.byteOffset+":"+n.byteLength}var Hn=new F,Tl=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r,this._normalizationScale=e!==void 0?ap(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Hn.fromBufferAttribute(this,t),Hn.applyMatrix4(e),this.setXYZ(t,Hn.x,Hn.y,Hn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Hn.fromBufferAttribute(this,t),Hn.applyNormalMatrix(e),this.setXYZ(t,Hn.x,Hn.y,Hn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Hn.fromBufferAttribute(this,t),Hn.transformDirection(e),this.setXYZ(t,Hn.x,Hn.y,Hn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),r=this._normalize(r),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){vl("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Hi(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){vl("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Wv(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):$v(e,this.data.array)}},iv=new F,PR=new F,OR=new je,ai=class{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=iv.subVectors(i,t).cross(PR.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(iv),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||OR.getNormalMatrix(e),r=this.coplanarPoint(iv).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},LR=0,Hr=class extends zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:LR++}),this.uuid=Cs(),this.name="",this.type="Material",this.blending=za,this.side=Ts,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xv,this.blendDst=Ev,this.blendEquation=So,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=Ia,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zf,this.stencilZFail=zf,this.stencilZPass=zf,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ve(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ve(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ke().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new ai().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Le().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Le().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ka=class extends Hr{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ke(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Sa,cl=new F,ba=new F,Ma=new F,Ta=new Le,ll=new Le,hM=new Ht,Tf=new F,ul=new F,wf=new F,vb=new Le,rv=new Le,_b=new Le,wl=class extends bn{constructor(e=new ka){if(super(),this.isSprite=!0,this.type="Sprite",Sa===void 0){Sa=new Ti;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new nh(t,5);Sa.setIndex([0,1,2,0,2,3]),Sa.setAttribute("position",new Tl(i,3,0,!1)),Sa.setAttribute("uv",new Tl(i,2,3,!1))}this.geometry=Sa,this.material=e,this.center=new Le(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&He('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ba.setFromMatrixScale(this.matrixWorld),hM.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ma.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ba.multiplyScalar(-Ma.z);let i=this.material.rotation,r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));let o=this.center;Cf(Tf.set(-.5,-.5,0),Ma,o,ba,r,s),Cf(ul.set(.5,-.5,0),Ma,o,ba,r,s),Cf(wf.set(.5,.5,0),Ma,o,ba,r,s),vb.set(0,0),rv.set(1,0),_b.set(1,1);let a=e.ray.intersectTriangle(Tf,ul,wf,!1,cl);if(a===null&&(Cf(ul.set(-.5,.5,0),Ma,o,ba,r,s),rv.set(0,1),a=e.ray.intersectTriangle(Tf,wf,ul,!1,cl),a===null))return;let c=e.ray.origin.distanceTo(cl);c<e.near||c>e.far||t.push({distance:c,point:cl.clone(),uv:kr.getInterpolation(cl,Tf,ul,wf,vb,rv,_b,new Le),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function Cf(n,e,t,i,r,s){Ta.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(ll.x=s*Ta.x-r*Ta.y,ll.y=r*Ta.x+s*Ta.y):ll.copy(Ta),n.copy(e),n.x+=ll.x,n.y+=ll.y,n.applyMatrix4(hM)}var Fr=new F,sv=new F,Df=new F,Af=new F,Ua=class{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Fr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fr.copy(this.origin).addScaledVector(this.direction,t),Fr.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){sv.copy(e).add(t).multiplyScalar(.5),Df.copy(t).sub(e).normalize(),Af.copy(this.origin).sub(sv);let s=e.distanceTo(t)*.5,o=-this.direction.dot(Df),a=Af.dot(this.direction),c=-Af.dot(Df),l=Af.lengthSq(),u=Math.abs(1-o*o),d,h,f,g;if(u>0)if(d=o*c-a,h=o*a-c,g=s*u,d>=0)if(h>=-g)if(h<=g){let _=1/u;d*=_,h*=_,f=d*(d+o*h+2*a)+h*(o*d+h+2*c)+l}else h=s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;else h=-s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-c),s),f=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-s,-c),s),f=h*(h+2*c)+l):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-c),s),f=-d*d+h*(h+2*c)+l);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(sv).addScaledVector(Df,h),f}intersectSphere(e,t){if(e.radius<0)return null;Fr.subVectors(e.center,this.origin);let i=Fr.dot(this.direction),r=Fr.dot(Fr)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Fr)!==null}intersectTriangle(e,t,i,r,s){let o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,d=e.x-o.x,h=e.y-o.y,f=e.z-o.z,g=t.x-o.x,_=t.y-o.y,p=t.z-o.z,m=i.x-o.x,E=i.y-o.y,C=i.z-o.z,b=Math.abs(c),w=Math.abs(l),M=Math.abs(u),y,S,L,I,O,k,W,A,z,$,G,re;if(b>=w&&b>=M?(L=c,k=d,z=g,re=m,c>=0?(y=l,S=u,I=h,O=f,W=_,A=p,$=E,G=C):(y=u,S=l,I=f,O=h,W=p,A=_,$=C,G=E)):w>=M?(L=l,k=h,z=_,re=E,l>=0?(y=u,S=c,I=f,O=d,W=p,A=g,$=C,G=m):(y=c,S=u,I=d,O=f,W=g,A=p,$=m,G=C)):(L=u,k=f,z=p,re=C,u>=0?(y=c,S=l,I=d,O=h,W=g,A=_,$=m,G=E):(y=l,S=c,I=h,O=d,W=_,A=g,$=E,G=m)),L===0)return null;let P=y/L,X=S/L,ie=1/L,Ee=I-P*k,Fe=O-X*k,J=W-P*z,le=A-X*z,ye=$-P*re,Ae=G-X*re,de=ye*le-Ae*J,be=Ee*Ae-Fe*ye,dt=J*Fe-le*Ee;if(r){if(de<0||be<0||dt<0)return null}else if((de<0||be<0||dt<0)&&(de>0||be>0||dt>0))return null;let Re=de+be+dt;if(Re===0)return null;let Ye=ie*(de*k+be*z+dt*re);return(Re>0?Ye<0:Ye>0)?null:this.at(Ye/Re,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ih=class extends Hr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vr,this.combine=Sv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},xb=new Ht,vo=new Ua,If=new Fa,Eb=new F,Rf=new F,Nf=new F,Pf=new F,ov=new F,Of=new F,Sb=new F,Lf=new F,Qt=class extends bn{constructor(e=new Ti,t=new ih){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){Of.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=a[c],d=s[c];u!==0&&(ov.fromBufferAttribute(d,e),o?Of.addScaledVector(ov,u):Of.addScaledVector(ov.sub(t),u))}t.add(Of)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),If.copy(i.boundingSphere),If.applyMatrix4(s),vo.copy(e.ray).recast(e.near),!(If.containsPoint(vo.origin)===!1&&(vo.intersectSphere(If,Eb)===null||vo.origin.distanceToSquared(Eb)>(e.far-e.near)**2))&&(xb.copy(s).invert(),vo.copy(e.ray).applyMatrix4(xb),!(i.boundingBox!==null&&vo.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,vo)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){let p=h[g],m=o[p.materialIndex],E=Math.max(p.start,f.start),C=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let b=E,w=C;b<w;b+=3){let M=a.getX(b),y=a.getX(b+1),S=a.getX(b+2);r=Ff(this,m,e,i,l,u,d,M,y,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){let E=a.getX(p),C=a.getX(p+1),b=a.getX(p+2);r=Ff(this,o,e,i,l,u,d,E,C,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){let p=h[g],m=o[p.materialIndex],E=Math.max(p.start,f.start),C=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let b=E,w=C;b<w;b+=3){let M=b,y=b+1,S=b+2;r=Ff(this,m,e,i,l,u,d,M,y,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){let E=p,C=p+1,b=p+2;r=Ff(this,o,e,i,l,u,d,E,C,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}};function FR(n,e,t,i,r,s,o,a){let c;if(e.side===Wn?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===Ts,a),c===null)return null;Lf.copy(a),Lf.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Lf);return l<t.near||l>t.far?null:{distance:l,point:Lf.clone(),object:n}}function Ff(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,Rf),n.getVertexPosition(c,Nf),n.getVertexPosition(l,Pf);let u=FR(n,e,t,i,Rf,Nf,Pf,Sb);if(u){let d=new F;kr.getBarycoord(Sb,Rf,Nf,Pf,d),r&&(u.uv=kr.getInterpolatedAttribute(r,a,c,l,d,new Le)),s&&(u.uv1=kr.getInterpolatedAttribute(s,a,c,l,d,new Le)),o&&(u.normal=kr.getInterpolatedAttribute(o,a,c,l,d,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new F,materialIndex:0};kr.getNormal(Rf,Nf,Pf,h.normal),u.face=h,u.barycoord=d}return u}var rh=class extends jn{constructor(e=null,t=1,i=1,r,s,o,a,c,l=yn,u=yn,d,h){super(null,o,a,c,l,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var _o=new Fa,kR=new Le(.5,.5),kf=new F,vs=class{constructor(e=new ai,t=new ai,i=new ai,r=new ai,s=new ai,o=new ai){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Mi,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],d=s[5],h=s[6],f=s[7],g=s[8],_=s[9],p=s[10],m=s[11],E=s[12],C=s[13],b=s[14],w=s[15];if(r[0].setComponents(l-o,f-u,m-g,w-E).normalize(),r[1].setComponents(l+o,f+u,m+g,w+E).normalize(),r[2].setComponents(l+a,f+d,m+_,w+C).normalize(),r[3].setComponents(l-a,f-d,m-_,w-C).normalize(),i)r[4].setComponents(c,h,p,b).normalize(),r[5].setComponents(l-c,f-h,m-p,w-b).normalize();else if(r[4].setComponents(l-c,f-h,m-p,w-b).normalize(),t===Mi)r[5].setComponents(l+c,f+h,m+p,w+b).normalize();else if(t===Ra)r[5].setComponents(c,h,p,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_o.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_o.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_o)}intersectsSprite(e){_o.center.set(0,0,0);let t=kR.distanceTo(e.center);return _o.radius=.7071067811865476+t,_o.applyMatrix4(e.matrixWorld),this.intersectsSphere(_o)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(kf.x=r.normal.x>0?e.max.x:e.min.x,kf.y=r.normal.y>0?e.max.y:e.min.y,kf.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(kf)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},bb=new Ht,sh=class n{constructor(){this.coordinateSystem=Mi,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,i=this._frustums;for(let r=0;r<t.length;r++){let s=t[r];bb.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),i[r]===void 0&&(i[r]=new vs),i[r].setFromProjectionMatrix(bb,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,i=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new vs),t[r].copy(i[r]);return this._count=e._count,this}clone(){return new n().copy(this)}};var Cl=class extends jn{constructor(e=[],t=bo,i,r,s,o,a,c,l,u){super(e,t,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Dl=class extends jn{constructor(e,t,i,r,s,o,a,c,l){super(e,t,i,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var zr=class extends jn{constructor(e,t,i=Gi,r,s,o,a=yn,c=yn,l,u=Br,d=1){if(u!==Br&&u!==Wr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Oa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Al=class extends zr{constructor(e,t=Gi,i=bo,r,s,o=yn,a=yn,c,l=Br){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Il=class extends jn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},or=class n extends Ti{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],u=[],d=[],h=0,f=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new rn(l,3)),this.setAttribute("normal",new rn(u,3)),this.setAttribute("uv",new rn(d,2));function g(_,p,m,E,C,b,w,M,y,S,L){let I=b/y,O=w/S,k=b/2,W=w/2,A=M/2,z=y+1,$=S+1,G=0,re=0,P=new F;for(let X=0;X<$;X++){let ie=X*O-W;for(let Ee=0;Ee<z;Ee++){let Fe=Ee*I-k;P[_]=Fe*E,P[p]=ie*C,P[m]=A,l.push(P.x,P.y,P.z),P[_]=0,P[p]=0,P[m]=M>0?1:-1,u.push(P.x,P.y,P.z),d.push(Ee/y),d.push(1-X/S),G+=1}}for(let X=0;X<S;X++)for(let ie=0;ie<y;ie++){let Ee=h+ie+z*X,Fe=h+ie+z*(X+1),J=h+(ie+1)+z*(X+1),le=h+(ie+1)+z*X;c.push(Ee,Fe,le),c.push(Fe,J,le),re+=6}a.addGroup(f,re,L),f+=re,h+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Gr=class n extends Ti{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let u=[],d=[],h=[],f=[],g=0,_=[],p=i/2,m=0;E(),o===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(u),this.setAttribute("position",new rn(d,3)),this.setAttribute("normal",new rn(h,3)),this.setAttribute("uv",new rn(f,2));function E(){let b=new F,w=new F,M=0,y=(t-e)/i;for(let S=0;S<=s;S++){let L=[],I=S/s,O=I*(t-e)+e;for(let k=0;k<=r;k++){let W=k/r,A=W*c+a,z=Math.sin(A),$=Math.cos(A);w.x=O*z,w.y=-I*i+p,w.z=O*$,d.push(w.x,w.y,w.z),b.set(z,y,$).normalize(),h.push(b.x,b.y,b.z),f.push(W,1-I),L.push(g++)}_.push(L)}for(let S=0;S<r;S++)for(let L=0;L<s;L++){let I=_[L][S],O=_[L+1][S],k=_[L+1][S+1],W=_[L][S+1];(e>0||L!==0)&&(u.push(I,O,W),M+=3),(t>0||L!==s-1)&&(u.push(O,k,W),M+=3)}l.addGroup(m,M,0),m+=M}function C(b){let w=g,M=new Le,y=new F,S=0,L=b===!0?e:t,I=b===!0?1:-1;for(let k=1;k<=r;k++)d.push(0,p*I,0),h.push(0,I,0),f.push(.5,.5),g++;let O=g;for(let k=0;k<=r;k++){let A=k/r*c+a,z=Math.cos(A),$=Math.sin(A);y.x=L*$,y.y=p*I,y.z=L*z,d.push(y.x,y.y,y.z),h.push(0,I,0),M.x=z*.5+.5,M.y=$*.5*I+.5,f.push(M.x,M.y),g++}for(let k=0;k<r;k++){let W=w+k,A=O+k;b===!0?u.push(A,A+1,W):u.push(A+1,A,W),S+=3}l.addGroup(m,S,b===!0?1:2),m+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var xo=class n extends Ti{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,d=e/a,h=t/c,f=[],g=[],_=[],p=[];for(let m=0;m<u;m++){let E=m*h-o;for(let C=0;C<l;C++){let b=C*d-s;g.push(b,-E,0),_.push(0,0,1),p.push(C/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let E=0;E<a;E++){let C=E+l*m,b=E+l*(m+1),w=E+1+l*(m+1),M=E+1+l*m;f.push(C,b,M),f.push(b,w,M)}this.setIndex(f),this.setAttribute("position",new rn(g,3)),this.setAttribute("normal",new rn(_,3)),this.setAttribute("uv",new rn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var Rl=class n extends Ti{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,u=[],d=new F,h=new F,f=[],g=[],_=[],p=[];for(let m=0;m<=i;m++){let E=[],C=m/i,b=o+C*a,w=e*Math.cos(b),M=Math.sqrt(e*e-w*w),y=0;m===0&&o===0?y=.5/t:m===i&&c===Math.PI&&(y=-.5/t);for(let S=0;S<=t;S++){let L=S/t,I=r+L*s;d.x=-M*Math.cos(I),d.y=w,d.z=M*Math.sin(I),g.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),p.push(L+y,1-C),E.push(l++)}u.push(E)}for(let m=0;m<i;m++)for(let E=0;E<t;E++){let C=u[m][E+1],b=u[m][E],w=u[m+1][E],M=u[m+1][E+1];(m!==0||o>0)&&f.push(C,b,M),(m!==i-1||c<Math.PI)&&f.push(b,w,M)}this.setIndex(f),this.setAttribute("position",new rn(g,3)),this.setAttribute("normal",new rn(_,3)),this.setAttribute("uv",new rn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Nl=class n extends Ti{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s,thetaStart:o,thetaLength:a},i=Math.floor(i),r=Math.floor(r);let c=[],l=[],u=[],d=[],h=new F,f=new F,g=new F;for(let _=0;_<=i;_++){let p=o+_/i*a;for(let m=0;m<=r;m++){let E=m/r*s;f.x=(e+t*Math.cos(p))*Math.cos(E),f.y=(e+t*Math.cos(p))*Math.sin(E),f.z=t*Math.sin(p),l.push(f.x,f.y,f.z),h.x=e*Math.cos(E),h.y=e*Math.sin(E),g.subVectors(f,h).normalize(),u.push(g.x,g.y,g.z),d.push(m/r),d.push(_/i)}}for(let _=1;_<=i;_++)for(let p=1;p<=r;p++){let m=(r+1)*_+p-1,E=(r+1)*(_-1)+p-1,C=(r+1)*(_-1)+p,b=(r+1)*_+p;c.push(m,E,b),c.push(E,C,b)}this.setIndex(c),this.setAttribute("position",new rn(l,3)),this.setAttribute("normal",new rn(u,3)),this.setAttribute("uv",new rn(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function To(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(Mb(r))r.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Mb(r[0])){let s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function On(n){let e={};for(let t=0;t<n.length;t++){let i=To(n[t]);for(let r in i)e[r]=i[r]}return e}function Mb(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function UR(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Xv(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ut.workingColorSpace}var pM={clone:To,merge:On},BR=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,VR=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ar=class extends Hr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=BR,this.fragmentShader=VR,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=To(e.uniforms),this.uniformsGroups=UR(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Ke().setHex(r.value);break;case"v2":this.uniforms[i].value=new Le().fromArray(r.value);break;case"v3":this.uniforms[i].value=new F().fromArray(r.value);break;case"v4":this.uniforms[i].value=new $t().fromArray(r.value);break;case"m3":this.uniforms[i].value=new je().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Ht().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},oh=class extends ar{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Pl=class extends Hr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=op,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var ah=class extends Hr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=eM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ch=class extends Hr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function wa(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Uf(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var _s=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];e:{t:{let o;n:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break t}o=t.length;break n}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break t}o=i,i=0;break n}break e}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},lh=class extends _s{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:lv,endingEnd:lv}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case uv:s=e,a=2*t-i;break;case dv:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case uv:o=e,c=2*i-t;break;case dv:o=1,c=i+r[1]-r[0];break;default:o=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(i-t)/(r-t),_=g*g,p=_*g,m=-h*p+2*h*_-h*g,E=(1+h)*p+(-1.5-2*h)*_+(-.5+h)*g+1,C=(-1-f)*p+(1.5+f)*_+.5*g,b=f*p-f*_;for(let w=0;w!==a;++w)s[w]=m*o[u+w]+E*o[l+w]+C*o[c+w]+b*o[d+w];return s}},uh=class extends _s{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(i-t)/(r-t),d=1-u;for(let h=0;h!==a;++h)s[h]=o[l+h]*d+o[c+h]*u;return s}},dh=class extends _s{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},fh=class extends _s{interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this.inTangents,d=this.outTangents;if(!u||!d){let g=(i-t)/(r-t),_=1-g;for(let p=0;p!==a;++p)s[p]=o[l+p]*_+o[c+p]*g;return s}let h=a*2,f=e-1;for(let g=0;g!==a;++g){let _=o[l+g],p=o[c+g],m=f*h+g*2,E=d[m],C=d[m+1],b=e*h+g*2,w=u[b],M=u[b+1],y=zR(i,t,E,w,r);s[g]=mM(y,_,C,M,p)}return s}};function mM(n,e,t,i,r){let s=1-n;return s*s*s*e+3*s*s*n*t+3*s*n*n*i+n*n*n*r}function HR(n,e,t,i,r){let s=1-n;return 3*s*s*(t-e)+6*s*n*(i-t)+3*n*n*(r-i)}function zR(n,e,t,i,r){let s=(n-e)/(r-e);for(let o=0;o<8;o++){let a=mM(s,e,t,i,r)-n;if(Math.abs(a)<1e-10)break;let c=HR(s,e,t,i,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-a/c))}return s}var ui=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=wa(t,this.TimeBufferType),this.values=wa(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:wa(e.times,Array),values:wa(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),Uf(e.settings)&&(i.settings={inTangents:wa(e.settings.inTangents,Array),outTangents:wa(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new dh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new uh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new lh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new fh(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case pl:t=this.InterpolantFactoryMethodDiscrete;break;case Jf:t=this.InterpolantFactoryMethodLinear;break;case Hf:t=this.InterpolantFactoryMethodSmooth;break;case cv:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ve("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return pl;case this.InterpolantFactoryMethodLinear:return Jf;case this.InterpolantFactoryMethodSmooth:return Hf;case this.InterpolantFactoryMethodBezier:return cv}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e;Uf(this.settings)&&(Tb(this.settings.inTangents,e),Tb(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;Uf(this.settings)&&(wb(this.settings.inTangents,e),wb(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(He("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(He("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){He("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){He("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&rR(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){He("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Hf,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*i,h=d-i,f=d+i;for(let g=0;g!==i;++g){let _=t[d+g];if(_!==t[h+g]||_!==t[f+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*i,h=o*i;for(let f=0;f!==i;++f)t[h+f]=t[d+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,Uf(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Tb(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]+=e}function wb(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}ui.prototype.ValueTypeName="";ui.prototype.TimeBufferType=Float32Array;ui.prototype.ValueBufferType=Float32Array;ui.prototype.DefaultInterpolation=Jf;var xs=class extends ui{constructor(e,t,i){super(e,t,i)}};xs.prototype.ValueTypeName="bool";xs.prototype.ValueBufferType=Array;xs.prototype.DefaultInterpolation=pl;xs.prototype.InterpolantFactoryMethodLinear=void 0;xs.prototype.InterpolantFactoryMethodSmooth=void 0;var hh=class extends ui{constructor(e,t,i,r){super(e,t,i,r)}};hh.prototype.ValueTypeName="color";var ph=class extends ui{constructor(e,t,i,r){super(e,t,i,r)}};ph.prototype.ValueTypeName="number";var mh=class extends _s{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)ci.slerpFlat(s,0,o,l-a,o,l,c);return s}},Ol=class extends ui{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new mh(this.times,this.values,this.getValueSize(),e)}};Ol.prototype.ValueTypeName="quaternion";Ol.prototype.InterpolantFactoryMethodSmooth=void 0;var Es=class extends ui{constructor(e,t,i){super(e,t,i)}};Es.prototype.ValueTypeName="string";Es.prototype.ValueBufferType=Array;Es.prototype.DefaultInterpolation=pl;Es.prototype.InterpolantFactoryMethodLinear=void 0;Es.prototype.InterpolantFactoryMethodSmooth=void 0;var gh=class extends ui{constructor(e,t,i,r){super(e,t,i,r)}};gh.prototype.ValueTypeName="vector";var yh=class{constructor(e,t,i){let r=this,s=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){let f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},gM=new yh,vh=class{constructor(e){this.manager=e!==void 0?e:gM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};vh.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ss=class extends bn{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ll=class extends Ss{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(bn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},av=new Ht,Cb=new F,Db=new F,Fl=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Le(512,512),this.mapType=Jn,this.map=null,this.mapPass=null,this.matrix=new Ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vs,this._frameExtents=new Le(1,1),this._viewportCount=1,this._viewports=[new $t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Cb.setFromMatrixPosition(e.matrixWorld),t.position.copy(Cb),Db.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Db),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){av.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(av,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,o=r?r.z/s.x:1,a=r?r.w/s.y:1,c=r?r.x/s.x:0,l=r?r.y/s.y:0;e.coordinateSystem===Ra||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(av)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Bf=new F,Vf=new ci,rr=new F,kl=class extends bn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=Mi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Bf,Vf,rr),rr.x===1&&rr.y===1&&rr.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Bf,Vf,rr.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Bf,Vf,rr),rr.x===1&&rr.y===1&&rr.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Bf,Vf,rr.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},gs=new F,Ab=new Le,Ib=new Le,Pn=class extends kl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Pa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(fl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Pa*2*Math.atan(Math.tan(fl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){gs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(gs.x,gs.y).multiplyScalar(-e/gs.z),gs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(gs.x,gs.y).multiplyScalar(-e/gs.z)}getViewSize(e,t){return this.getViewBounds(e,Ab,Ib),t.subVectors(Ib,Ab)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(fl*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var fv=class extends Fl{constructor(){super(new Pn(90,1,.5,500)),this.isPointLightShadow=!0}},Ul=class extends Ss{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new fv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Bl=class extends kl{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},hv=class extends Fl{constructor(){super(new Bl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Vl=class extends Ss{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bn.DEFAULT_UP),this.updateMatrix(),this.target=new bn,this.shadow=new hv}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Ca=-90,Da=1,Ba=class extends bn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Pn(Ca,Da,e,t);r.layers=this.layers,this.add(r);let s=new Pn(Ca,Da,e,t);s.layers=this.layers,this.add(s);let o=new Pn(Ca,Da,e,t);o.layers=this.layers,this.add(o);let a=new Pn(Ca,Da,e,t);a.layers=this.layers,this.add(a);let c=new Pn(Ca,Da,e,t);c.layers=this.layers,this.add(c);let l=new Pn(Ca,Da,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===Mi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ra)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.mipmapsAutoUpdate=_,e.setRenderTarget(i,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},_h=class extends Pn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var Yv="\\[\\]\\.:\\/",GR=new RegExp("["+Yv+"]","g"),Zv="[^"+Yv+"]",jR="[^"+Yv.replace("\\.","")+"]",WR=/((?:WC+[\/:])*)/.source.replace("WC",Zv),$R=/(WCOD+)?/.source.replace("WCOD",jR),qR=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zv),XR=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zv),YR=new RegExp("^"+WR+$R+qR+XR+"$"),ZR=["material","materials","bones","map"],pv=class{constructor(e,t,i){let r=i||Vt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Vt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(GR,"")}static parseTrackName(e){let t=YR.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);ZR.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let c=i(a.children);if(c)return c}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ve("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){He("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){He("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){He("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){He("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){He("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[r];if(o===void 0){let l=t.nodeName;He("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Vt.Composite=pv;Vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Vt.prototype.GetterByBindingType=[Vt.prototype._getValue_direct,Vt.prototype._getValue_array,Vt.prototype._getValue_arrayElement,Vt.prototype._getValue_toArray];Vt.prototype.SetterByBindingTypeAndVersioning=[[Vt.prototype._setValue_direct,Vt.prototype._setValue_direct_setNeedsUpdate,Vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_array,Vt.prototype._setValue_array_setNeedsUpdate,Vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_arrayElement,Vt.prototype._setValue_arrayElement_setNeedsUpdate,Vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_fromArray,Vt.prototype._setValue_fromArray_setNeedsUpdate,Vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var V$=new Float32Array(1);var Va=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=rt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(rt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var mv=class{static{this.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};var Hl=class extends zi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Kv(n,e,t,i){let r=KR(i);switch(t){case Lv:return n*e;case kv:return n*e/r.components*r.byteLength;case Ch:return n*e/r.components*r.byteLength;case ws:return n*e*2/r.components*r.byteLength;case Dh:return n*e*2/r.components*r.byteLength;case Fv:return n*e*3/r.components*r.byteLength;case $i:return n*e*4/r.components*r.byteLength;case Ah:return n*e*4/r.components*r.byteLength;case jl:case Wl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $l:case ql:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Rh:case Ph:return Math.max(n,16)*Math.max(e,8)/4;case Ih:case Nh:return Math.max(n,8)*Math.max(e,8)/2;case Oh:case Lh:case kh:case Uh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Fh:case Xl:case Bh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Vh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Hh:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case zh:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Gh:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case jh:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Wh:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case $h:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case qh:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Xh:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Yh:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Zh:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Kh:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Jh:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Qh:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ep:case tp:case np:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ip:case rp:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Yl:case sp:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function KR(n){switch(n){case Jn:case Rv:return{byteLength:1,components:1};case ja:case Nv:case Wi:return{byteLength:2,components:1};case Th:case wh:return{byteLength:2,components:4};case Gi:case Mh:case ji:return{byteLength:4,components:1};case Pv:case Ov:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function UM(){let n=null,e=!1,t=null,i=null;function r(s,o){i=n.requestAnimationFrame(r),t(s,o)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function QR(n){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,d=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),a.onUploadCallback();let f;if(l instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=n.SHORT;else if(l instanceof Uint32Array)f=n.UNSIGNED_INT;else if(l instanceof Int32Array)f=n.INT;else if(l instanceof Int8Array)f=n.BYTE;else if(l instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){let u=c.array,d=c.updateRanges;if(n.bindBuffer(l,a),d.length===0)n.bufferSubData(l,0,u);else{d.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<d.length;f++){let g=d[h],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,d[h]=_)}d.length=h+1;for(let f=0,g=d.length;f<g;f++){let _=d[f];n.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var eN=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tN=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,nN=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,iN=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rN=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sN=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,oN=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aN=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cN=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,lN=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,uN=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dN=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fN=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,hN=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,pN=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,mN=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,gN=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yN=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vN=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_N=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,xN=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,EN=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,SN=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,bN=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,MN=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,TN=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wN=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,CN=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,DN=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,AN="gl_FragColor = linearToOutputTexel( gl_FragColor );",IN=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,RN=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,NN=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,PN=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ON=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,LN=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,FN=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kN=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,UN=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,BN=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,VN=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,HN=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zN=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,GN=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,jN=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,WN=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,$N=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qN=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,XN=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,YN=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ZN=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,KN=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,JN=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,QN=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,eP=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tP=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,nP=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,iP=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rP=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sP=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,oP=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,aP=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cP=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,lP=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,uP=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dP=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fP=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,hP=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pP=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mP=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,gP=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yP=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,vP=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,_P=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xP=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,EP=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,SP=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,bP=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,MP=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,TP=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wP=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,CP=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,DP=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,AP=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,IP=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,RP=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,NP=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,PP=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,OP=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,LP=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,FP=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,kP=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,UP=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,BP=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,VP=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,HP=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zP=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,GP=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jP=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,WP=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$P=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,qP=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,XP=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,YP=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ZP=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,KP=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,JP=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,QP=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,eO=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tO=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nO=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iO=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rO=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sO=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,oO=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,aO=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cO=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,lO=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uO=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dO=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fO=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hO=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,pO=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mO=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gO=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yO=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,vO=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_O=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,xO=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,EO=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,SO=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bO=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,MO=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TO=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wO=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,CO=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,DO=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,AO=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,IO=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,RO=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,NO=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,et={alphahash_fragment:eN,alphahash_pars_fragment:tN,alphamap_fragment:nN,alphamap_pars_fragment:iN,alphatest_fragment:rN,alphatest_pars_fragment:sN,aomap_fragment:oN,aomap_pars_fragment:aN,batching_pars_vertex:cN,batching_vertex:lN,begin_vertex:uN,beginnormal_vertex:dN,bsdfs:fN,iridescence_fragment:hN,bumpmap_pars_fragment:pN,clipping_planes_fragment:mN,clipping_planes_pars_fragment:gN,clipping_planes_pars_vertex:yN,clipping_planes_vertex:vN,color_fragment:_N,color_pars_fragment:xN,color_pars_vertex:EN,color_vertex:SN,common:bN,defaultnormal_vertex:MN,displacementmap_pars_vertex:TN,displacementmap_vertex:wN,emissivemap_fragment:CN,emissivemap_pars_fragment:DN,colorspace_fragment:AN,colorspace_pars_fragment:IN,envmap_fragment:RN,envmap_common_pars_fragment:NN,envmap_pars_fragment:PN,envmap_pars_vertex:ON,envmap_physical_pars_fragment:WN,envmap_vertex:LN,fog_vertex:FN,fog_pars_vertex:kN,fog_fragment:UN,fog_pars_fragment:BN,gradientmap_pars_fragment:VN,lightmap_pars_fragment:HN,lights_lambert_fragment:zN,lights_lambert_pars_fragment:GN,lights_pars_begin:jN,lights_toon_fragment:$N,lights_toon_pars_fragment:qN,lights_phong_fragment:XN,lights_phong_pars_fragment:YN,lights_physical_fragment:ZN,lights_physical_pars_fragment:KN,lights_fragment_begin:JN,lights_fragment_maps:QN,lights_fragment_end:eP,lightprobes_pars_fragment:tP,logdepthbuf_fragment:nP,logdepthbuf_pars_fragment:iP,logdepthbuf_pars_vertex:rP,logdepthbuf_vertex:sP,map_fragment:oP,map_pars_fragment:aP,map_particle_fragment:cP,map_particle_pars_fragment:lP,metalnessmap_fragment:uP,metalnessmap_pars_fragment:dP,morphinstance_vertex:fP,morphcolor_vertex:hP,morphnormal_vertex:pP,morphtarget_pars_vertex:mP,morphtarget_vertex:gP,normal_fragment_begin:yP,normal_fragment_maps:vP,normal_pars_fragment:_P,normal_pars_vertex:xP,normal_vertex:EP,normalmap_pars_fragment:SP,clearcoat_normal_fragment_begin:bP,clearcoat_normal_fragment_maps:MP,clearcoat_pars_fragment:TP,iridescence_pars_fragment:wP,opaque_fragment:CP,packing:DP,premultiplied_alpha_fragment:AP,project_vertex:IP,dithering_fragment:RP,dithering_pars_fragment:NP,roughnessmap_fragment:PP,roughnessmap_pars_fragment:OP,shadowmap_pars_fragment:LP,shadowmap_pars_vertex:FP,shadowmap_vertex:kP,shadowmask_pars_fragment:UP,skinbase_vertex:BP,skinning_pars_vertex:VP,skinning_vertex:HP,skinnormal_vertex:zP,specularmap_fragment:GP,specularmap_pars_fragment:jP,tonemapping_fragment:WP,tonemapping_pars_fragment:$P,transmission_fragment:qP,transmission_pars_fragment:XP,uv_pars_fragment:YP,uv_pars_vertex:ZP,uv_vertex:KP,worldpos_vertex:JP,background_vert:QP,background_frag:eO,backgroundCube_vert:tO,backgroundCube_frag:nO,cube_vert:iO,cube_frag:rO,depth_vert:sO,depth_frag:oO,distance_vert:aO,distance_frag:cO,equirect_vert:lO,equirect_frag:uO,linedashed_vert:dO,linedashed_frag:fO,meshbasic_vert:hO,meshbasic_frag:pO,meshlambert_vert:mO,meshlambert_frag:gO,meshmatcap_vert:yO,meshmatcap_frag:vO,meshnormal_vert:_O,meshnormal_frag:xO,meshphong_vert:EO,meshphong_frag:SO,meshphysical_vert:bO,meshphysical_frag:MO,meshtoon_vert:TO,meshtoon_frag:wO,points_vert:CO,points_frag:DO,shadow_vert:AO,shadow_frag:IO,sprite_vert:RO,sprite_frag:NO},xe={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new Le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new Le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},dr={basic:{uniforms:On([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:On([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Ke(0)},envMapIntensity:{value:1}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:On([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:On([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:On([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new Ke(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:On([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:On([xe.points,xe.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:On([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:On([xe.common,xe.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:On([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:On([xe.sprite,xe.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distance:{uniforms:On([xe.common,xe.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distance_vert,fragmentShader:et.distance_frag},shadow:{uniforms:On([xe.lights,xe.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};dr.physical={uniforms:On([dr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new Le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new je},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new Le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new Le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};var cp={r:0,b:0,g:0},PO=new Ht,BM=new je;BM.set(-1,0,0,0,1,0,0,0,1);function OO(n,e,t,i,r,s){let o=new Ke(0),a=r===!0?0:1,c,l,u=null,d=0,h=null;function f(E){let C=E.isScene===!0?E.background:null;if(C&&C.isTexture){let b=E.backgroundBlurriness>0;C=e.get(C,b)}return C}function g(E){let C=!1,b=f(E);b===null?p(o,a):b&&b.isColor&&(p(b,1),C=!0);let w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(E,C){let b=f(C);b&&b.isCubeTexture?(l===void 0&&(l=new Qt(new or(1,1,1),new ar({name:"BackgroundCubeMaterial",uniforms:To(dr.backgroundCube.uniforms),vertexShader:dr.backgroundCube.vertexShader,fragmentShader:dr.backgroundCube.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,M,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(PO.makeRotationFromEuler(C.backgroundRotation)).transpose(),b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(BM),l.material.toneMapped=ut.getTransfer(b.colorSpace)!==Ct,(u!==b||d!==b.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=b,d=b.version,h=n.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Qt(new xo(2,2),new ar({name:"BackgroundMaterial",uniforms:To(dr.background.uniforms),vertexShader:dr.background.vertexShader,fragmentShader:dr.background.fragmentShader,side:Ts,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.toneMapped=ut.getTransfer(b.colorSpace)!==Ct,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||d!==b.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=b,d=b.version,h=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,C){E.getRGB(cp,Xv(n)),t.buffers.color.setClear(cp.r,cp.g,cp.b,C,s)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,C=1){o.set(E),a=C,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(E){a=E,p(o,a)},render:g,addToRenderList:_,dispose:m}}function LO(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null),s=r,o=!1;function a(O,k,W,A,z){let $=!1,G=d(O,A,W,k);s!==G&&(s=G,l(s.object)),$=f(O,A,W,z),$&&g(O,A,W,z),z!==null&&e.update(z,n.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,b(O,k,W,A),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function c(){return n.createVertexArray()}function l(O){return n.bindVertexArray(O)}function u(O){return n.deleteVertexArray(O)}function d(O,k,W,A){let z=A.wireframe===!0,$=i[k.id];$===void 0&&($={},i[k.id]=$);let G=O.isInstancedMesh===!0?O.id:0,re=$[G];re===void 0&&(re={},$[G]=re);let P=re[W.id];P===void 0&&(P={},re[W.id]=P);let X=P[z];return X===void 0&&(X=h(c()),P[z]=X),X}function h(O){let k=[],W=[],A=[];for(let z=0;z<t;z++)k[z]=0,W[z]=0,A[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:W,attributeDivisors:A,object:O,attributes:{},index:null}}function f(O,k,W,A){let z=s.attributes,$=k.attributes,G=0,re=W.getAttributes();for(let P in re)if(re[P].location>=0){let ie=z[P],Ee=$[P];if(Ee===void 0&&(P==="instanceMatrix"&&O.instanceMatrix&&(Ee=O.instanceMatrix),P==="instanceColor"&&O.instanceColor&&(Ee=O.instanceColor)),ie===void 0||ie.attribute!==Ee||Ee&&ie.data!==Ee.data)return!0;G++}return s.attributesNum!==G||s.index!==A}function g(O,k,W,A){let z={},$=k.attributes,G=0,re=W.getAttributes();for(let P in re)if(re[P].location>=0){let ie=$[P];ie===void 0&&(P==="instanceMatrix"&&O.instanceMatrix&&(ie=O.instanceMatrix),P==="instanceColor"&&O.instanceColor&&(ie=O.instanceColor));let Ee={};Ee.attribute=ie,ie&&ie.data&&(Ee.data=ie.data),z[P]=Ee,G++}s.attributes=z,s.attributesNum=G,s.index=A}function _(){let O=s.newAttributes;for(let k=0,W=O.length;k<W;k++)O[k]=0}function p(O){m(O,0)}function m(O,k){let W=s.newAttributes,A=s.enabledAttributes,z=s.attributeDivisors;W[O]=1,A[O]===0&&(n.enableVertexAttribArray(O),A[O]=1),z[O]!==k&&(n.vertexAttribDivisor(O,k),z[O]=k)}function E(){let O=s.newAttributes,k=s.enabledAttributes;for(let W=0,A=k.length;W<A;W++)k[W]!==O[W]&&(n.disableVertexAttribArray(W),k[W]=0)}function C(O,k,W,A,z,$,G){G===!0?n.vertexAttribIPointer(O,k,W,z,$):n.vertexAttribPointer(O,k,W,A,z,$)}function b(O,k,W,A){_();let z=A.attributes,$=W.getAttributes(),G=k.defaultAttributeValues;for(let re in $){let P=$[re];if(P.location>=0){let X=z[re];if(X===void 0&&(re==="instanceMatrix"&&O.instanceMatrix&&(X=O.instanceMatrix),re==="instanceColor"&&O.instanceColor&&(X=O.instanceColor)),X!==void 0){let ie=X.normalized,Ee=X.itemSize,Fe=e.get(X);if(Fe===void 0)continue;let J=Fe.buffer,le=Fe.type,ye=Fe.bytesPerElement,Ae=le===n.INT||le===n.UNSIGNED_INT||X.gpuType===Mh;if(X.isInterleavedBufferAttribute){let de=X.data,be=de.isInterleavedBuffer===!0?de.stride:de.itemSize,dt=X.offset;if(de.isInstancedInterleavedBuffer||de.isInstancedBufferAttribute){for(let Re=0;Re<P.locationSize;Re++)m(P.location+Re,de.meshPerAttribute);O.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Re=0;Re<P.locationSize;Re++)p(P.location+Re);n.bindBuffer(n.ARRAY_BUFFER,J);for(let Re=0;Re<P.locationSize;Re++)C(P.location+Re,Ee/P.locationSize,le,ie,be*ye,(dt+Ee/P.locationSize*Re)*ye,Ae)}else{if(X.isInstancedBufferAttribute){for(let de=0;de<P.locationSize;de++)m(P.location+de,X.meshPerAttribute);O.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let de=0;de<P.locationSize;de++)p(P.location+de);n.bindBuffer(n.ARRAY_BUFFER,J);for(let de=0;de<P.locationSize;de++)C(P.location+de,Ee/P.locationSize,le,ie,Ee*ye,Ee/P.locationSize*de*ye,Ae)}}else if(G!==void 0){let ie=G[re];if(ie!==void 0)switch(ie.length){case 2:n.vertexAttrib2fv(P.location,ie);break;case 3:n.vertexAttrib3fv(P.location,ie);break;case 4:n.vertexAttrib4fv(P.location,ie);break;default:n.vertexAttrib1fv(P.location,ie)}}}}E()}function w(){L();for(let O in i){let k=i[O];for(let W in k){let A=k[W];for(let z in A){let $=A[z];for(let G in $)u($[G].object),delete $[G];delete A[z]}}delete i[O]}}function M(O){if(i[O.id]===void 0)return;let k=i[O.id];for(let W in k){let A=k[W];for(let z in A){let $=A[z];for(let G in $)u($[G].object),delete $[G];delete A[z]}}delete i[O.id]}function y(O){for(let k in i){let W=i[k];for(let A in W){let z=W[A];if(z[O.id]===void 0)continue;let $=z[O.id];for(let G in $)u($[G].object),delete $[G];delete z[O.id]}}}function S(O){for(let k in i){let W=i[k],A=O.isInstancedMesh===!0?O.id:0,z=W[A];if(z!==void 0){for(let $ in z){let G=z[$];for(let re in G)u(G[re].object),delete G[re];delete z[$]}delete W[A],Object.keys(W).length===0&&delete i[k]}}}function L(){I(),o=!0,s!==r&&(s=r,l(s.object))}function I(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:L,resetDefaultState:I,dispose:w,releaseStatesOfGeometry:M,releaseStatesOfObject:S,releaseStatesOfProgram:y,initAttributes:_,enableAttribute:p,disableUnusedAttributes:E}}function FO(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function o(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function a(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let h=0;for(let f=0;f<u;f++)h+=l[f];t.update(h,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function kO(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let y=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(y){return!(y!==$i&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(y){let S=y===Wi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(y!==Jn&&y!==ji&&!S&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(y){if(y==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(Ve("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=t.logarithmicDepthBuffer===!0&&d===!1;t.reversedDepthBuffer===!0&&d===!1&&Ve("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&d===!0&&Ve("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),C=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),M=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:E,maxVaryings:C,maxFragmentUniforms:b,maxSamples:w,samples:M}}function UO(n){let e=this,t=null,i=0,r=!1,s=!1,o=new ai,a=new je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||i!==0||r;return r=h,i=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){let g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,m=n.get(d);if(!r||g===null||g.length===0||s&&!p)s?u(null):l();else{let E=s?0:i,C=E*4,b=m.clippingState||null;c.value=b,b=u(g,h,C,f);for(let w=0;w!==C;++w)b[w]=t[w];m.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,f,g){let _=d!==null?d.length:0,p=null;if(_!==0){if(p=c.value,g!==!0||p===null){let m=f+_*4,E=h.matrixWorldInverse;a.getNormalMatrix(E),(p===null||p.length<m)&&(p=new Float32Array(m));for(let C=0,b=f;C!==_;++C,b+=4)o.copy(d[C]).applyMatrix4(E,a),o.normal.toArray(p,b),p[b+3]=o.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}var Jl=class extends li{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Cl(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new or(5,5,5),s=new ar({name:"CubemapFromEquirect",uniforms:To(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Wn,blending:Eo});s.uniforms.tEquirect.value=t;let o=new Qt(r,s),a=t.minFilter;return t.minFilter===jr&&(t.minFilter=Gn),new Ba(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}},yM=256,BO=3,VO=20,VM=256,HM=16,HO=3,zO=new F,GO=new Ke,up=class n{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ba(1,10,null),this._boxMesh=new Qt(new or(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=zO}=s,c=this._renderer;this._setSize(o);let l=this._allocateTarget(),u=this._getSourceTarget(!0);t>0&&(u.texture.mipmapsAutoUpdate=!1);let d=c.autoClear,h=c.autoClearColor,f=c.autoClearDepth,g=c.autoClearStencil,_=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,_===null&&(e.background=c.getClearColor(GO));let p=new Ba(i,r,u);return p.position.copy(a),p.update(c,e),c.autoClear=d,c.autoClearColor=h,c.autoClearDepth=f,c.autoClearStencil=g,e.background=_,t>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xM(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_M(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(yM,jv(e))}_fromTexture(e,t){e.mapping===bo||e.mapping===Ga?this._setSize(e.image.length===0?yM:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let i=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){let e=this._cubeSize,t=vM(e,!1,!1),i=Math.log2(e)-BO;for(let r=0;r<=i;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=vM(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,i){let r=this._boxMesh,s=this._cubeCamera;r.material=i,s.renderTarget=e,s.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),s.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===bo||e.mapping===Ga?(this._cubemapMaterial===null&&(this._cubemapMaterial=xM()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=_M()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=jO(),this._integrationMaterial=WO());let t=this._cubeSize,i=e.texture.mipmaps.length-1,r=this._ggxMaterial.uniforms;r.envMap.value=this._sourceTarget.texture;let s=this._integrationMaterial.uniforms;s.envMap.value=this._sourceTarget.texture,s.sourceLod.value=Math.log2(t/HM);for(let o=0;o<=i;o++){let a=n.lodToRoughness(o,i);if(o>i-HO)s.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let c=a>0?Math.log2(t)+.5*Math.log2(6/(VM*Math.pow(a,4)))+.5:0;r.roughness.value=a,r.lodBias.value=c,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=$O());let i=this._blurMaterial,r=i.uniforms,s=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=s.texture,this._renderCube(e,0,i),r.envMap.value=e.texture,this._renderCube(s,0,i)}};function vM(n,e,t){return new Jl(n,{minFilter:jr,generateMipmaps:e,type:Wi,colorSpace:ml,depthBuffer:t})}function Ql(n,e,t){return new ar({name:n,uniforms:e,vertexShader:et.cube_vert,fragmentShader:t,side:Wn,blending:Eo,depthTest:!1,depthWrite:!1})}function jO(){return Ql("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${VM}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function WO(){return Ql("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:HM}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function $O(){return Ql("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${VO}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function _M(){return Ql("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function xM(){return Ql("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function qO(n){let e=new WeakMap,t=new WeakMap,i=null;function r(h,f=!1){return h==null?null:f?o(h):s(h)}function s(h){if(h&&h.isTexture){let f=h.mapping;if(f===Eh||f===Sh)if(e.has(h)){let g=e.get(h).texture;return a(g,h.mapping)}else{let g=h.image;if(g&&g.height>0){let _=new Jl(g.height);return _.fromEquirectangularTexture(n,h),e.set(h,_),h.addEventListener("dispose",l),a(_.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture&&h.isPMREMTexture!==!0){let f=h.mapping,g=f===Eh||f===Sh,_=f===bo||f===Ga;if(g||_){let p=t.get(h),m=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return i===null&&(i=new up(n)),p=g?i.fromEquirectangular(h,p):i.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),p.texture;if(p!==void 0)return p.texture;{let E=h.image;return g&&E&&E.height>0||_&&E&&c(E)?(i===null&&(i=new up(n)),p=g?i.fromEquirectangular(h):i.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function a(h,f){return f===Eh?h.mapping=bo:f===Sh&&(h.mapping=Ga),h}function c(h){let f=0,g=6;for(let _=0;_<g;_++)h[_]!==void 0&&f++;return f===g}function l(h){let f=h.target;f.removeEventListener("dispose",l);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function u(h){let f=h.target;f.removeEventListener("dispose",u);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function XO(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&dl("WebGLRenderer: "+i+" extension not supported."),r}}}function YO(n,e,t,i){let r={},s=new WeakMap,o=new FinalizationRegistry(g=>delete r[g]);function a(g){c(g.target)}function c(g){g.index!==null&&e.remove(g.index);for(let p in g.attributes)e.remove(g.attributes[p]);g.removeEventListener("dispose",a),delete r[g.id],o.unregister(g);let _=s.get(g);_&&(e.remove(_),s.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function l(g,_){return r[_.id]!==void 0||(_.addEventListener("dispose",a),r[_.id]=new WeakRef(_),o.register(_,_.id,_),t.memory.geometries++),_}function u(g){let _=g.attributes;for(let p in _)e.update(_[p],n.ARRAY_BUFFER)}function d(g){let _=g.index,p=g.attributes.position,m=0;if(p===void 0)return;let E=_!==null?_.array.length:p.array.length/3-1,C=p.count>=65535?Ml:bl,b=new C(Math.ceil(E/3)*6,1),w=b.array;if(_!==null){let y=_.array;m=_.version;for(let S=0,L=0;S<E;S+=3){let I=y[S+0],O=y[S+1],k=y[S+2];w[L++]=I,w[L++]=O,w[L++]=O,w[L++]=k,w[L++]=k,w[L++]=I}}else{m=p.version;for(let y=0,S=0;y<E;y+=3){let L=y+0,I=y+1,O=y+2;w[S++]=L,w[S++]=I,w[S++]=I,w[S++]=O,w[S++]=O,w[S++]=L}}b.version=m;let M=s.get(g);M&&e.remove(M),s.set(g,b)}function h(g){let _=s.get(g);if(_){let p=g.index;p!==null&&_.version<p.version&&d(g)}else d(g);return s.get(g)}function f(){for(let g in r){let _=r[g].deref();_!==void 0&&c(_)}}return{get:l,update:u,getWireframeAttribute:h,dispose:f}}function ZO(n,e,t){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,h){n.drawElements(i,h,s,d*o),t.update(h,i,1)}function l(d,h,f){f!==0&&(n.drawElementsInstanced(i,h,s,d*o,f),t.update(h,i,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,d,0,f);let _=0;for(let p=0;p<f;p++)_+=h[p];t.update(_,i,1)}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function KO(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:He("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function JO(n,e,t){let i=new WeakMap,r=new $t;function s(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,h=i.get(a);if(h===void 0||h.count!==d){let L=function(){y.dispose(),i.delete(a),a.removeEventListener("dispose",L)};h!==void 0&&h.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],E=a.morphAttributes.color||[],C=0;f===!0&&(C=1),g===!0&&(C=2),_===!0&&(C=3);let b=a.attributes.position.count*C,w=1;b>e.maxTextureSize&&(w=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let M=new Float32Array(b*w*4*d),y=new _l(M,b,w,d);y.type=ji,y.needsUpdate=!0;let S=C*4;for(let I=0;I<d;I++){let O=p[I],k=m[I],W=E[I],A=b*w*4*I;for(let z=0;z<O.count;z++){let $=z*S;f===!0&&(r.fromBufferAttribute(O,z),M[A+$+0]=r.x,M[A+$+1]=r.y,M[A+$+2]=r.z,M[A+$+3]=0),g===!0&&(r.fromBufferAttribute(k,z),M[A+$+4]=r.x,M[A+$+5]=r.y,M[A+$+6]=r.z,M[A+$+7]=0),_===!0&&(r.fromBufferAttribute(W,z),M[A+$+8]=r.x,M[A+$+9]=r.y,M[A+$+10]=r.z,M[A+$+11]=W.itemSize===4?r.w:1)}}h={count:d,texture:y,size:new Le(b,w)},i.set(a,h),a.addEventListener("dispose",L)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function QO(n,e,t,i,r){let s=new WeakMap;function o(l){let u=r.render.frame,d=l.geometry,h=e.get(l,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return h}function a(){s=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var eL={[bv]:"LINEAR_TONE_MAPPING",[Mv]:"REINHARD_TONE_MAPPING",[Tv]:"CINEON_TONE_MAPPING",[wv]:"ACES_FILMIC_TONE_MAPPING",[Dv]:"AGX_TONE_MAPPING",[Av]:"NEUTRAL_TONE_MAPPING",[Cv]:"CUSTOM_TONE_MAPPING"};function tL(n,e,t,i,r,s){let o=new li(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=null,u=new Ti;u.setAttribute("position",new rn([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new rn([0,2,0,0,2,0],2));let d=new oh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new Qt(u,d),f=new Bl(-1,1,1,-1,0,1),g=null,_=null,p=!1,m,E=null,C=[],b=!1;this.setSize=function(w,M){o.setSize(w,M),a!==null&&a.setSize(w,M),c!==null&&c.setSize(w,M);for(let y=0;y<C.length;y++){let S=C[y];S.setSize&&S.setSize(w,M)}},this.setEffects=function(w){C=w,b=C.length>0&&C[0].isRenderPass===!0;let M=o.width,y=o.height;C.length>0&&a===null&&(a=new li(M,y,{type:Wi,depthBuffer:!1,stencilBuffer:!1}),c=new li(M,y,{type:Wi,depthBuffer:!1,stencilBuffer:!1}));let S=r===!0&&C.some(L=>L.needsDepthTexture===!0);S!==(o.depthTexture!==null)&&(S===!0&&l===null&&(l=new zr(M,y),s===!0&&(l.format=Wr,l.type=Mo)),o.dispose(),o.depthTexture=S?l:null,o.resolveDepthBuffer=S,o.storeMultisampledDepthBuffer=S);for(let L=0;L<C.length;L++){let I=C[L];I.setSize&&I.setSize(M,y),S&&I.needsDepthTexture===!0&&I.setDepthTexture&&I.setDepthTexture(l)}},this.begin=function(w,M){if(p||w.toneMapping===lr&&C.length===0)return!1;if(E=M,M!==null){let y=M.width,S=M.height;(o.width!==y||o.height!==S)&&this.setSize(y,S)}return b===!1&&w.setRenderTarget(o),m=w.toneMapping,w.toneMapping=lr,!0},this.hasRenderPass=function(){return b},this.end=function(w,M){w.toneMapping=m,p=!0;let y=o,S=a;for(let L=0;L<C.length;L++){let I=C[L];I.enabled!==!1&&(I.render(w,S,y,M),I.needsSwap!==!1&&(y=S,S=S===a?c:a))}if(g!==w.outputColorSpace||_!==w.toneMapping){g=w.outputColorSpace,_=w.toneMapping,d.defines={},ut.getTransfer(g)===Ct&&(d.defines.SRGB_TRANSFER="");let L=eL[_];L&&(d.defines[L]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=y.texture,w.setRenderTarget(E),w.render(h,f),E=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var zM=new jn,GM=new zr(1,1),jM=new Al(1),WM=new _l,$M=new th,qM=new Cl,EM=[],SM=[],bM=new Float32Array(16),MM=new Float32Array(9),TM=new Float32Array(4);function $a(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=EM[r];if(s===void 0&&(s=new Float32Array(r),EM[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function un(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function dn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function fp(n,e){let t=SM[e];t===void 0&&(t=new Int32Array(e),SM[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function nL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function iL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(un(t,e))return;n.uniform2fv(this.addr,e),dn(t,e)}}function rL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(un(t,e))return;n.uniform3fv(this.addr,e),dn(t,e)}}function sL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(un(t,e))return;n.uniform4fv(this.addr,e),dn(t,e)}}function oL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(un(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),dn(t,e)}else{if(un(t,i))return;TM.set(i),n.uniformMatrix2fv(this.addr,!1,TM),dn(t,i)}}function aL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(un(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),dn(t,e)}else{if(un(t,i))return;MM.set(i),n.uniformMatrix3fv(this.addr,!1,MM),dn(t,i)}}function cL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(un(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),dn(t,e)}else{if(un(t,i))return;bM.set(i),n.uniformMatrix4fv(this.addr,!1,bM),dn(t,i)}}function lL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function uL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(un(t,e))return;n.uniform2iv(this.addr,e),dn(t,e)}}function dL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(un(t,e))return;n.uniform3iv(this.addr,e),dn(t,e)}}function fL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(un(t,e))return;n.uniform4iv(this.addr,e),dn(t,e)}}function hL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function pL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(un(t,e))return;n.uniform2uiv(this.addr,e),dn(t,e)}}function mL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(un(t,e))return;n.uniform3uiv(this.addr,e),dn(t,e)}}function gL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(un(t,e))return;n.uniform4uiv(this.addr,e),dn(t,e)}}function hp(n){return n.version===0&&(n.compareFunction=Vv,n.needsUpdate=!0),n}function yL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?s=hp(GM):s=zM,t.setTexture2D(e||s,r)}function vL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||$M,r)}function _L(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_CUBE_SHADOW?s=hp(jM):s=qM,t.setTextureCube(e||s,r)}function xL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||WM,r)}function EL(n){switch(n){case 5126:return nL;case 35664:return iL;case 35665:return rL;case 35666:return sL;case 35674:return oL;case 35675:return aL;case 35676:return cL;case 5124:case 35670:return lL;case 35667:case 35671:return uL;case 35668:case 35672:return dL;case 35669:case 35673:return fL;case 5125:return hL;case 36294:return pL;case 36295:return mL;case 36296:return gL;case 35678:case 36198:case 36298:case 36306:case 35682:return yL;case 35679:case 36299:case 36307:return vL;case 35680:case 36300:case 36308:case 36293:return _L;case 36289:case 36303:case 36311:case 36292:return xL}}function SL(n,e){n.uniform1fv(this.addr,e)}function bL(n,e){let t=$a(e,this.size,2);n.uniform2fv(this.addr,t)}function ML(n,e){let t=$a(e,this.size,3);n.uniform3fv(this.addr,t)}function TL(n,e){let t=$a(e,this.size,4);n.uniform4fv(this.addr,t)}function wL(n,e){let t=$a(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function CL(n,e){let t=$a(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function DL(n,e){let t=$a(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function AL(n,e){n.uniform1iv(this.addr,e)}function IL(n,e){n.uniform2iv(this.addr,e)}function RL(n,e){n.uniform3iv(this.addr,e)}function NL(n,e){n.uniform4iv(this.addr,e)}function PL(n,e){n.uniform1uiv(this.addr,e)}function OL(n,e){n.uniform2uiv(this.addr,e)}function LL(n,e){n.uniform3uiv(this.addr,e)}function FL(n,e){n.uniform4uiv(this.addr,e)}function kL(n,e,t){let i=this.cache,r=e.length,s=fp(t,r);un(i,s)||(n.uniform1iv(this.addr,s),dn(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=hp(GM):o=zM;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function UL(n,e,t){let i=this.cache,r=e.length,s=fp(t,r);un(i,s)||(n.uniform1iv(this.addr,s),dn(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||$M,s[o])}function BL(n,e,t){let i=this.cache,r=e.length,s=fp(t,r);un(i,s)||(n.uniform1iv(this.addr,s),dn(i,s));let o;this.type===n.SAMPLER_CUBE_SHADOW?o=hp(jM):o=qM;for(let a=0;a!==r;++a)t.setTextureCube(e[a]||o,s[a])}function VL(n,e,t){let i=this.cache,r=e.length,s=fp(t,r);un(i,s)||(n.uniform1iv(this.addr,s),dn(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||WM,s[o])}function HL(n){switch(n){case 5126:return SL;case 35664:return bL;case 35665:return ML;case 35666:return TL;case 35674:return wL;case 35675:return CL;case 35676:return DL;case 5124:case 35670:return AL;case 35667:case 35671:return IL;case 35668:case 35672:return RL;case 35669:case 35673:return NL;case 5125:return PL;case 36294:return OL;case 36295:return LL;case 36296:return FL;case 35678:case 36198:case 36298:case 36306:case 35682:return kL;case 35679:case 36299:case 36307:return UL;case 35680:case 36300:case 36308:case 36293:return BL;case 36289:case 36303:case 36311:case 36292:return VL}}var e_=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=EL(t.type)}},t_=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=HL(t.type)}},n_=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},Jv=/(\w+)(\])?(\[|\.)?/g;function wM(n,e){n.seq.push(e),n.map[e.id]=e}function zL(n,e,t){let i=n.name,r=i.length;for(Jv.lastIndex=0;;){let s=Jv.exec(i),o=Jv.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){wM(t,l===void 0?new e_(a,n,e):new t_(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new n_(a),wM(t,d)),t=d}}}var Wa=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);zL(a,c,this)}let r=[],s=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function CM(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var GL=37297,jL=0;function WL(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var DM=new je;function $L(n){ut._getMatrix(DM,ut.workingColorSpace,n);let e=`mat3( ${DM.elements.map(t=>t.toFixed(4))} )`;switch(ut.getTransfer(n)){case gl:return[e,"LinearTransferOETF"];case Ct:return[e,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function AM(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+WL(n.getShaderSource(e),a)}else return s}function qL(n,e){let t=$L(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var XL={[bv]:"Linear",[Mv]:"Reinhard",[Tv]:"Cineon",[wv]:"ACESFilmic",[Dv]:"AgX",[Av]:"Neutral",[Cv]:"Custom"};function YL(n,e){let t=XL[e];return t===void 0?(Ve("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var lp=new F;function ZL(){ut.getLuminanceCoefficients(lp);let n=lp.x.toFixed(4),e=lp.y.toFixed(4),t=lp.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function KL(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Kl).join(`
`)}function JL(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function QL(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Kl(n){return n!==""}function IM(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function RM(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var eF=/^[ \t]*#include +<([\w\d./]+)>/gm;function i_(n){return n.replace(eF,tF)}function tF(n,e){let t=et[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return i_(t)}var nF=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function NM(n){return n.replace(nF,iF)}function iF(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function PM(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var rF={[zl]:"SHADOWMAP_TYPE_PCF",[Ha]:"SHADOWMAP_TYPE_VSM"};function sF(n){return rF[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var oF={[Ga]:"ENVMAP_MODE_REFRACTION"};function aF(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":oF[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var cF={[Sv]:"ENVMAP_BLENDING_MULTIPLY",[Kb]:"ENVMAP_BLENDING_MIX",[Jb]:"ENVMAP_BLENDING_ADD"};function lF(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":cF[n.combine]||"ENVMAP_BLENDING_NONE"}function uF(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=sF(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=aF(t),d=lF(t),h=KL(t),f=JL(s),g=r.createProgram(),_,p,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Kl).join(`
`),_.length>0&&(_+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Kl).join(`
`),p.length>0&&(p+=`
`)):(_=[PM(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Kl).join(`
`),p=[PM(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==lr?"#define TONE_MAPPING":"",t.toneMapping!==lr?et.tonemapping_pars_fragment:"",t.toneMapping!==lr?YL("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,qL("linearToOutputTexel",t.outputColorSpace),ZL(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Kl).join(`
`)),o=i_(o),o=IM(o,t),o=RM(o,t),a=i_(a),a=IM(a,t),a=RM(a,t),o=NM(o),a=NM(a),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,_=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,p=["#define varying in",t.glslVersion===zv?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let E=m+_+o,C=m+p+a,b=CM(r,r.VERTEX_SHADER,E),w=CM(r,r.FRAGMENT_SHADER,C);r.attachShader(g,b),r.attachShader(g,w),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function M(I){if(n.debug.checkShaderErrors){let O=r.getProgramInfoLog(g)||"",k=r.getShaderInfoLog(b)||"",W=r.getShaderInfoLog(w)||"",A=O.trim(),z=k.trim(),$=W.trim(),G=!0,re=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(G=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,g,b,w);else{let P=AM(r,b,"vertex"),X=AM(r,w,"fragment");He("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+A+`
`+P+`
`+X)}else A!==""?Ve("WebGLProgram: Program Info Log:",A):(z===""||$==="")&&(re=!1);re&&(I.diagnostics={runnable:G,programLog:A,vertexShader:{log:z,prefix:_},fragmentShader:{log:$,prefix:p}})}r.deleteShader(b),r.deleteShader(w),y=new Wa(r,g),S=QL(r,g)}let y;this.getUniforms=function(){return y===void 0&&M(this),y};let S;this.getAttributes=function(){return S===void 0&&M(this),S};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(g,GL)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=jL++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=b,this.fragmentShader=w,this}var dF=0,r_=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new s_(e),t.set(e,i)),i}},s_=class{constructor(e){this.id=dF++,this.code=e,this.usedTimes=0}};function fF(n){return n===ws||n===Xl||n===Yl}function hF(n,e,t,i,r,s){let o=new xl,a=new r_,c=new Set,l=[],u=new Map,d=i.logarithmicDepthBuffer,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(y){return c.add(y),y===0?"uv":`uv${y}`}function g(y,S,L,I,O,k){let W=I.fog,A=O.geometry,z=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?I.environment:null,$=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,G=e.get(y.envMap||z,$),re=h[y.type],P=i.precision;y.precision!==null&&(P=i.getMaxPrecision(y.precision),P!==y.precision&&Ve("WebGLProgram.getParameters:",y.precision,"not supported, using",P,"instead."));let X=A.morphAttributes.position||A.morphAttributes.normal||A.morphAttributes.color,ie=X!==void 0?X.length:0,Ee=0;A.morphAttributes.position!==void 0&&(Ee=1),A.morphAttributes.normal!==void 0&&(Ee=2),A.morphAttributes.color!==void 0&&(Ee=3);let Fe,J,le,ye;if(re){let ve=dr[re];Fe=ve.vertexShader,J=ve.fragmentShader}else{Fe=y.vertexShader,J=y.fragmentShader;let ve=a.getVertexShaderStage(y),Dt=a.getFragmentShaderStage(y);a.update(y,ve,Dt),le=ve.id,ye=Dt.id}let Ae=n.getRenderTarget(),de=n.state.buffers.depth.getReversed(),be=O.isInstancedMesh===!0,dt=O.isBatchedMesh===!0,Re=!!y.map,Ye=!!y.matcap,nt=!!G,Ge=nt&&G.isPMREMTexture===!0,kt=!!y.aoMap,st=!!y.lightMap,It=!!y.bumpMap&&y.wireframe===!1,at=!!y.normalMap,Gt=!!y.displacementMap,Ut=!!y.emissiveMap,jt=!!y.metalnessMap,Yt=!!y.roughnessMap,xt=y.anisotropy>0,N=y.clearcoat>0,wt=y.diffuseRoughness>0,yt=y.dispersion>0,ft=y.retroreflectivity>0,he=y.iridescence>0,Wt=y.sheen>0,Pe=y.transmission>0,ke=xt&&!!y.anisotropyMap,T=N&&!!y.clearcoatMap,v=N&&!!y.clearcoatNormalMap,U=N&&!!y.clearcoatRoughnessMap,se=wt&&!!y.diffuseRoughnessMap,ne=he&&!!y.iridescenceMap,fe=he&&!!y.iridescenceThicknessMap,pe=Wt&&!!y.sheenColorMap,K=Wt&&!!y.sheenRoughnessMap,Q=!!y.specularMap,oe=!!y.specularColorMap,D=!!y.specularIntensityMap,te=Pe&&!!y.transmissionMap,Z=Pe&&!!y.thicknessMap,ce=!!y.gradientMap,ae=!!y.alphaMap,ue=y.alphaTest>0,Me=!!y.alphaHash,$e=!!y.extensions,ee=lr;y.toneMapped&&(Ae===null||Ae.isXRRenderTarget===!0)&&(ee=n.toneMapping);let Te=Ge?G.isCompressedCubeTexture?G.image[0].mipmaps:G.mipmaps:null,Ze={shaderID:re,shaderType:y.type,shaderName:y.name,vertexShader:Fe,fragmentShader:J,defines:y.defines,customVertexShaderID:le,customFragmentShaderID:ye,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:P,batching:dt,batchingColor:dt&&O._colorsTexture!==null,instancing:be,instancingColor:be&&O.instanceColor!==null,instancingMorph:be&&O.morphTexture!==null,outputColorSpace:Ae===null?n.outputColorSpace:Ae.isXRRenderTarget===!0?Ae.texture.colorSpace:ut.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Re,matcap:Ye,envMap:nt,envMapMode:nt&&G.mapping,envMapPMREM:Ge,envMapMaxLod:Ge?Te.length-1:null,envMapSize:Ge?Te[0].width:null,aoMap:kt,lightMap:st,bumpMap:It,normalMap:at,displacementMap:Gt,emissiveMap:Ut,normalMapObjectSpace:at&&y.normalMapType===tM,normalMapTangentSpace:at&&y.normalMapType===op,packedNormalMap:at&&y.normalMapType===op&&fF(y.normalMap.format),metalnessMap:jt,roughnessMap:Yt,anisotropy:xt,anisotropyMap:ke,clearcoat:N,clearcoatMap:T,clearcoatNormalMap:v,clearcoatRoughnessMap:U,diffuseRoughness:wt,diffuseRoughnessMap:se,dispersion:yt,retroreflection:ft,iridescence:he,iridescenceMap:ne,iridescenceThicknessMap:fe,sheen:Wt,sheenColorMap:pe,sheenRoughnessMap:K,specularMap:Q,specularColorMap:oe,specularIntensityMap:D,transmission:Pe,transmissionMap:te,thicknessMap:Z,gradientMap:ce,opaque:y.transparent===!1&&y.blending===za&&y.alphaToCoverage===!1,alphaMap:ae,alphaTest:ue,alphaHash:Me,combine:y.combine,mapUv:Re&&f(y.map.channel),aoMapUv:kt&&f(y.aoMap.channel),lightMapUv:st&&f(y.lightMap.channel),bumpMapUv:It&&f(y.bumpMap.channel),normalMapUv:at&&f(y.normalMap.channel),displacementMapUv:Gt&&f(y.displacementMap.channel),emissiveMapUv:Ut&&f(y.emissiveMap.channel),metalnessMapUv:jt&&f(y.metalnessMap.channel),roughnessMapUv:Yt&&f(y.roughnessMap.channel),anisotropyMapUv:ke&&f(y.anisotropyMap.channel),clearcoatMapUv:T&&f(y.clearcoatMap.channel),clearcoatNormalMapUv:v&&f(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:U&&f(y.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:se&&f(y.diffuseRoughnessMap.channel),iridescenceMapUv:ne&&f(y.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&f(y.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&f(y.sheenColorMap.channel),sheenRoughnessMapUv:K&&f(y.sheenRoughnessMap.channel),specularMapUv:Q&&f(y.specularMap.channel),specularColorMapUv:oe&&f(y.specularColorMap.channel),specularIntensityMapUv:D&&f(y.specularIntensityMap.channel),transmissionMapUv:te&&f(y.transmissionMap.channel),thicknessMapUv:Z&&f(y.thicknessMap.channel),alphaMapUv:ae&&f(y.alphaMap.channel),vertexTangents:!!A.attributes.tangent&&(at||xt),vertexNormals:!!A.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!A.attributes.color&&A.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!A.attributes.uv&&(Re||ae),fog:!!W,useFog:y.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||A.attributes.normal===void 0&&at===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:de,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:A.attributes.position!==void 0,morphTargets:A.morphAttributes.position!==void 0,morphNormals:A.morphAttributes.normal!==void 0,morphColors:A.morphAttributes.color!==void 0,morphTargetsCount:ie,morphTextureStride:Ee,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:k.filter(ve=>ve.texture!==null).length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:ee,decodeVideoTexture:Re&&y.map.isVideoTexture===!0&&ut.getTransfer(y.map.colorSpace)===Ct,decodeVideoTextureEmissive:Ut&&y.emissiveMap.isVideoTexture===!0&&ut.getTransfer(y.emissiveMap.colorSpace)===Ct,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===cr,flipSided:y.side===Wn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:$e&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($e&&y.extensions.multiDraw===!0||dt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ze.vertexUv1s=c.has(1),Ze.vertexUv2s=c.has(2),Ze.vertexUv3s=c.has(3),c.clear(),Ze}function _(y){let S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(let L in y.defines)S.push(L),S.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(p(S,y),m(S,y),S.push(n.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function p(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapPMREM),y.push(S.envMapMaxLod),y.push(S.envMapSize),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.diffuseRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.numSunLights),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numSunLightShadows),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.numLightProbeGrids),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function m(y,S){o.disableAll(),S.instancing&&o.enable(0),S.instancingColor&&o.enable(1),S.instancingMorph&&o.enable(2),S.matcap&&o.enable(3),S.envMap&&o.enable(4),S.normalMapObjectSpace&&o.enable(5),S.normalMapTangentSpace&&o.enable(6),S.clearcoat&&o.enable(7),S.iridescence&&o.enable(8),S.alphaTest&&o.enable(9),S.vertexColors&&o.enable(10),S.vertexAlphas&&o.enable(11),S.vertexUv1s&&o.enable(12),S.vertexUv2s&&o.enable(13),S.vertexUv3s&&o.enable(14),S.vertexTangents&&o.enable(15),S.anisotropy&&o.enable(16),S.alphaHash&&o.enable(17),S.batching&&o.enable(18),S.dispersion&&o.enable(19),S.retroreflection&&o.enable(24),S.diffuseRoughness&&o.enable(25),S.batchingColor&&o.enable(20),S.gradientMap&&o.enable(21),S.packedNormalMap&&o.enable(22),S.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),S.numLightProbeGrids>0&&o.enable(22),S.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function E(y){let S=h[y.type],L;if(S){let I=dr[S];L=pM.clone(I.uniforms)}else L=y.uniforms;return L}function C(y,S){let L=u.get(S);return L!==void 0?++L.usedTimes:(L=new uF(n,S,y,r),l.push(L),u.set(S,L)),L}function b(y){if(--y.usedTimes===0){let S=l.indexOf(y);l[S]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function w(y){a.remove(y)}function M(){a.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:E,acquireProgram:C,releaseProgram:b,releaseShaderCache:w,programs:l,dispose:M}}function pF(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function mF(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function OM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function LM(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function a(h,f,g,_,p,m){let E=n[e];return E===void 0?(E={id:h.id,object:h,geometry:f,material:g,materialVariant:o(h),groupOrder:_,renderOrder:h.renderOrder,z:p,group:m},n[e]=E):(E.id=h.id,E.object=h,E.geometry=f,E.material=g,E.materialVariant=o(h),E.groupOrder=_,E.renderOrder=h.renderOrder,E.z=p,E.group=m),e++,E}function c(h,f,g,_,p,m,E){E.reversedDepth===!0&&(p=-p);let C=a(h,f,g,_,p,m);g.transmission>0?i.push(C):g.transparent===!0?r.push(C):t.push(C)}function l(h,f,g,_,p,m){let E=a(h,f,g,_,p,m);g.transmission>0?i.unshift(E):g.transparent===!0?r.unshift(E):t.unshift(E)}function u(h,f){t.length>1&&t.sort(h||mF),i.length>1&&i.sort(f||OM),r.length>1&&r.sort(f||OM)}function d(){for(let h=e,f=n.length;h<f;h++){let g=n[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:d,sort:u}}function gF(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new LM,n.set(i,[o])):r>=s.length?(o=new LM,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function yF(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new F,color:new Ke};break;case"SpotLight":t={position:new F,direction:new F,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function vF(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var _F=0;function xF(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function EF(n){let e=new yF,t=vF(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new F);let r=new F,s=new Ht,o=new Ht;function a(l){let u=0,d=0,h=0;for(let k=0;k<9;k++)i.probe[k].set(0,0,0);let f=0,g=0,_=0,p=0,m=0,E=0,C=0,b=0,w=0,M=0,y=0,S=0,L=0,I=0;l.sort(xF);for(let k=0,W=l.length;k<W;k++){let A=l[k],z=A.color,$=A.intensity,G=A.distance,re=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===ws?re=A.shadow.map.texture:re=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)u+=z.r*$,d+=z.g*$,h+=z.b*$;else if(A.isLightProbe){for(let P=0;P<9;P++)i.probe[P].addScaledVector(A.sh.coefficients[P],$);I++}else if(A.isSunLight){let P=e.get(A);if(P.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let X=A.shadow,ie=t.get(A);ie.shadowIntensity=X.intensity,ie.shadowBias=X.bias,ie.shadowNormalBias=X.normalBias,ie.shadowRadius=X.radius,ie.shadowMapSize.copy(X.mapSize).multiply(X.getFrameExtents()),i.sunShadow[g]=ie,i.sunShadowMap[g]=re;let Ee=X.getViewportCount();for(let Fe=0;Fe<Ee;Fe++)i.sunShadowMatrix[_+Fe]=X.getMatrix(Fe),i.sunShadowCascade[_+Fe]=X._cascadeData[Fe];_+=Ee,g++}i.sun[f]=P,f++}else if(A.isDirectionalLight){let P=e.get(A);if(P.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let X=A.shadow,ie=t.get(A);ie.shadowIntensity=X.intensity,ie.shadowBias=X.bias,ie.shadowNormalBias=X.normalBias,ie.shadowRadius=X.radius,ie.shadowMapSize=X.mapSize,i.directionalShadow[p]=ie,i.directionalShadowMap[p]=re,i.directionalShadowMatrix[p]=A.shadow.matrix,w++}i.directional[p]=P,p++}else if(A.isSpotLight){let P=e.get(A);P.position.setFromMatrixPosition(A.matrixWorld),P.color.copy(z).multiplyScalar($),P.distance=G,P.coneCos=Math.cos(A.angle),P.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),P.decay=A.decay,i.spot[E]=P;let X=A.shadow;if(A.map&&(i.spotLightMap[S]=A.map,S++,X.updateMatrices(A),A.castShadow&&L++),i.spotLightMatrix[E]=X.matrix,A.castShadow){let ie=t.get(A);ie.shadowIntensity=X.intensity,ie.shadowBias=X.bias,ie.shadowNormalBias=X.normalBias,ie.shadowRadius=X.radius,ie.shadowMapSize=X.mapSize,i.spotShadow[E]=ie,i.spotShadowMap[E]=re,y++}E++}else if(A.isRectAreaLight){let P=e.get(A);P.color.copy(z).multiplyScalar($),P.halfWidth.set(A.width*.5,0,0),P.halfHeight.set(0,A.height*.5,0),i.rectArea[C]=P,C++}else if(A.isPointLight){let P=e.get(A);if(P.color.copy(A.color).multiplyScalar(A.intensity),P.distance=A.distance,P.decay=A.decay,A.castShadow){let X=A.shadow,ie=t.get(A);ie.shadowIntensity=X.intensity,ie.shadowBias=X.bias,ie.shadowNormalBias=X.normalBias,ie.shadowRadius=X.radius,ie.shadowMapSize=X.mapSize,ie.shadowCameraNear=X.camera.near,ie.shadowCameraFar=X.camera.far,i.pointShadow[m]=ie,i.pointShadowMap[m]=re,i.pointShadowMatrix[m]=A.shadow.matrix,M++}i.point[m]=P,m++}else if(A.isHemisphereLight){let P=e.get(A);P.skyColor.copy(A.color).multiplyScalar($),P.groundColor.copy(A.groundColor).multiplyScalar($),i.hemi[b]=P,b++}}C>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xe.LTC_FLOAT_1,i.rectAreaLTC2=xe.LTC_FLOAT_2):(i.rectAreaLTC1=xe.LTC_HALF_1,i.rectAreaLTC2=xe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;let O=i.hash;(O.sunLength!==f||O.directionalLength!==p||O.pointLength!==m||O.spotLength!==E||O.rectAreaLength!==C||O.hemiLength!==b||O.numSunShadows!==g||O.numDirectionalShadows!==w||O.numPointShadows!==M||O.numSpotShadows!==y||O.numSpotMaps!==S||O.numLightProbes!==I)&&(i.sun.length=f,i.directional.length=p,i.spot.length=E,i.rectArea.length=C,i.point.length=m,i.hemi.length=b,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=_,i.sunShadowCascade.length=_,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=M,i.pointShadowMap.length=M,i.pointShadowMatrix.length=M,i.spotShadow.length=y,i.spotShadowMap.length=y,i.spotLightMatrix.length=y+S-L,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=I,O.sunLength=f,O.directionalLength=p,O.pointLength=m,O.spotLength=E,O.rectAreaLength=C,O.hemiLength=b,O.numSunShadows=g,O.numDirectionalShadows=w,O.numPointShadows=M,O.numSpotShadows=y,O.numSpotMaps=S,O.numLightProbes=I,i.version=_F++)}function c(l,u){let d=0,h=0,f=0,g=0,_=0,p=0,m=u.matrixWorldInverse;for(let E=0,C=l.length;E<C;E++){let b=l[E];if(b.isSunLight){let w=i.sun[d];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(m),d++}else if(b.isDirectionalLight){let w=i.directional[h];w.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(m),h++}else if(b.isSpotLight){let w=i.spot[g];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(m),g++}else if(b.isRectAreaLight){let w=i.rectArea[_];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(m),o.identity(),s.copy(b.matrixWorld),s.premultiply(m),o.extractRotation(s),w.halfWidth.set(b.width*.5,0,0),w.halfHeight.set(0,b.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),_++}else if(b.isPointLight){let w=i.point[f];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(m),f++}else if(b.isHemisphereLight){let w=i.hemi[p];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(m),p++}}}return{setup:a,setupView:c,state:i}}function FM(n){let e=new EF(n),t=[],i=[],r=[];function s(d){u.camera=d,t.length=0,i.length=0,r.length=0}function o(d){d.isLightProbeGrid?r.push(d):t.push(d)}function a(d){i.push(d)}function c(){e.setup(t),r.sort((d,h)=>d.priority-h.priority||d.id-h.id)}function l(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function SF(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new FM(n),e.set(r,[a])):s>=o.length?(a=new FM(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var bF=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,MF=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,TF=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],wF=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],kM=new Ht,Zl=new F,Qv=new F;function CF(n,e,t){let i=new vs,r=new Le,s=new Le,o=new $t,a=new ah,c=new ch,l={},u=t.maxTextureSize,d={[Ts]:Wn,[Wn]:Ts,[cr]:cr},h=new ar({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Le},radius:{value:4}},vertexShader:bF,fragmentShader:MF}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ti;g.setAttribute("position",new Hi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Qt(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zl;let m=this.type;this.render=function(M,y,S){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||M.length===0)return;this.type===xh&&(Ve("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=zl);let L=n.getRenderTarget(),I=n.getActiveCubeFace(),O=n.getActiveMipmapLevel(),k=n.state;k.setBlending(Eo),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let W=m!==this.type;W&&y.traverse(function(A){A.material&&(Array.isArray(A.material)?A.material.forEach(z=>z.needsUpdate=!0):A.material.needsUpdate=!0)});for(let A=0,z=M.length;A<z;A++){let $=M[A],G=$.shadow;if(G===void 0){Ve("WebGLShadowMap:",$,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);let re=G.getFrameExtents();r.multiply(re),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/re.x),r.x=s.x*re.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/re.y),r.y=s.y*re.y,G.mapSize.y=s.y));let P=n.state.buffers.depth.getReversed();if(G.camera._reversedDepth=P,G.map===null||W===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Ha){if($.isPointLight){Ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new li(r.x,r.y,{format:ws,type:Wi,minFilter:Gn,magFilter:Gn,generateMipmaps:!1}),G.map.texture.name=$.name+".shadowMap",G.map.depthTexture=new zr(r.x,r.y,ji),G.map.depthTexture.name=$.name+".shadowMapDepth",G.map.depthTexture.format=Br,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=yn,G.map.depthTexture.magFilter=yn}else $.isPointLight?(G.map=new Jl(r.x),G.map.depthTexture=new Al(r.x,Gi)):(G.map=new li(r.x,r.y),G.map.depthTexture=new zr(r.x,r.y,Gi)),G.map.depthTexture.name=$.name+".shadowMap",G.map.depthTexture.format=Br,this.type===zl?(G.map.depthTexture.compareFunction=P?Bv:Uv,G.map.depthTexture.minFilter=Gn,G.map.depthTexture.magFilter=Gn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=yn,G.map.depthTexture.magFilter=yn);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==r.x||G.map.height!==r.y)&&G.map.setSize(r.x,r.y);let X=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();$.isPointLight!==!0&&G.updateMatrices($,S);let ie=(G.camera.layers.mask&4294967294)!==0?G.camera.layers:S.layers;for(let Ee=0;Ee<X;Ee++){let Fe=G.getCamera(Ee);if($.isPointLight){let J=G.camera,le=G.matrix,ye=$.distance||J.far;ye!==J.far&&(J.far=ye,J.updateProjectionMatrix()),Zl.setFromMatrixPosition($.matrixWorld),J.position.copy(Zl),Qv.copy(J.position),Qv.add(TF[Ee]),J.up.copy(wF[Ee]),J.lookAt(Qv),J.updateMatrixWorld(),le.makeTranslation(-Zl.x,-Zl.y,-Zl.z),kM.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),G._frustum.setFromProjectionMatrix(kM,J.coordinateSystem,J.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)n.setRenderTarget(G.map,Ee),n.clear();else{Ee===0&&(n.setRenderTarget(G.map),n.clear());let J=G.getViewport(Ee);o.set(s.x*J.x,s.y*J.y,s.x*J.z,s.y*J.w),k.viewport(o)}i=G.getFrustum(Ee),b(y,S,Fe,$,ie,this.type)}G.isPointLightShadow!==!0&&this.type===Ha&&E(G,S),G.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(L,I,O)};function E(M,y){let S=e.update(_);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null?M.mapPass=new li(r.x,r.y,{format:ws,type:Wi}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),h.uniforms.shadow_pass.value=M.map.depthTexture,h.uniforms.resolution.value.set(M.map.width,M.map.height),h.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(y,null,S,h,_,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value.set(M.map.width,M.map.height),f.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(y,null,S,f,_,null)}function C(M,y,S,L){let I=null,O=S.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(O!==void 0)I=O;else if(I=S.isPointLight===!0?c:a,n.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){let k=I.uuid,W=y.uuid,A=l[k];A===void 0&&(A={},l[k]=A);let z=A[W];z===void 0&&(z=I.clone(),A[W]=z,y.addEventListener("dispose",w)),I=z}if(I.visible=y.visible,I.wireframe=y.wireframe,L===Ha?I.side=y.shadowSide!==null?y.shadowSide:y.side:I.side=y.shadowSide!==null?y.shadowSide:d[y.side],I.alphaMap=y.alphaMap,I.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,I.map=y.map,I.clipShadows=y.clipShadows,I.clippingPlanes=y.clippingPlanes,I.clipIntersection=y.clipIntersection,I.displacementMap=y.displacementMap,I.displacementScale=y.displacementScale,I.displacementBias=y.displacementBias,I.wireframeLinewidth=y.wireframeLinewidth,I.linewidth=y.linewidth,S.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let k=n.properties.get(I);k.light=S}return I}function b(M,y,S,L,I,O){if(M.visible===!1)return;if(M.layers.test(I)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&O===Ha)&&(!M.frustumCulled||M.intersectsFrustum(i))){M.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,M.matrixWorld);let A=e.update(M),z=M.material;if(Array.isArray(z)){let $=A.groups;for(let G=0,re=$.length;G<re;G++){let P=$[G],X=z[P.materialIndex];if(X&&X.visible){let ie=C(M,X,L,O);M.onBeforeShadow(n,M,y,S,A,ie,P),n.renderBufferDirect(S,null,A,ie,M,P),M.onAfterShadow(n,M,y,S,A,ie,P)}}}else if(z.visible){let $=C(M,z,L,O);M.onBeforeShadow(n,M,y,S,A,$,null),n.renderBufferDirect(S,null,A,$,M,null),M.onAfterShadow(n,M,y,S,A,$,null)}}let W=M.children;for(let A=0,z=W.length;A<z;A++)b(W[A],y,S,L,I,O)}function w(M){M.target.removeEventListener("dispose",w);for(let S in l){let L=l[S],I=M.target.uuid;I in L&&(L[I].dispose(),delete L[I])}}}function DF(n,e){function t(){let D=!1,te=new $t,Z=null,ce=new $t(0,0,0,0);return{setMask:function(ae){Z!==ae&&!D&&(n.colorMask(ae,ae,ae,ae),Z=ae)},setLocked:function(ae){D=ae},setClear:function(ae,ue,Me,$e,ee){ee===!0&&(ae*=$e,ue*=$e,Me*=$e),te.set(ae,ue,Me,$e),ce.equals(te)===!1&&(n.clearColor(ae,ue,Me,$e),ce.copy(te))},reset:function(){D=!1,Z=null,ce.set(-1,0,0,0)}}}function i(){let D=!1,te=!1,Z=null,ce=null,ae=null;return{setReversed:function(ue){if(te!==ue){let Me=e.get("EXT_clip_control");ue?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),te=ue;let $e=ae;ae=null,this.setClear($e)}},getReversed:function(){return te},setTest:function(ue){ue?de(n.DEPTH_TEST):be(n.DEPTH_TEST)},setMask:function(ue){Z!==ue&&!D&&(n.depthMask(ue),Z=ue)},setFunc:function(ue){if(te&&(ue=dM[ue]),ce!==ue){switch(ue){case Gf:n.depthFunc(n.NEVER);break;case jf:n.depthFunc(n.ALWAYS);break;case Wf:n.depthFunc(n.LESS);break;case Ia:n.depthFunc(n.LEQUAL);break;case $f:n.depthFunc(n.EQUAL);break;case qf:n.depthFunc(n.GEQUAL);break;case Xf:n.depthFunc(n.GREATER);break;case Yf:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ce=ue}},setLocked:function(ue){D=ue},setClear:function(ue){ae!==ue&&(ae=ue,te&&(ue=1-ue),n.clearDepth(ue))},reset:function(){D=!1,Z=null,ce=null,ae=null,te=!1}}}function r(){let D=!1,te=null,Z=null,ce=null,ae=null,ue=null,Me=null,$e=null,ee=null;return{setTest:function(Te){D||(Te?de(n.STENCIL_TEST):be(n.STENCIL_TEST))},setMask:function(Te){te!==Te&&!D&&(n.stencilMask(Te),te=Te)},setFunc:function(Te,Ze,ve){(Z!==Te||ce!==Ze||ae!==ve)&&(n.stencilFunc(Te,Ze,ve),Z=Te,ce=Ze,ae=ve)},setOp:function(Te,Ze,ve){(ue!==Te||Me!==Ze||$e!==ve)&&(n.stencilOp(Te,Ze,ve),ue=Te,Me=Ze,$e=ve)},setLocked:function(Te){D=Te},setClear:function(Te){ee!==Te&&(n.clearStencil(Te),ee=Te)},reset:function(){D=!1,te=null,Z=null,ce=null,ae=null,ue=null,Me=null,$e=null,ee=null}}}let s=new t,o=new i,a=new r,c={},l=new WeakMap,u={},d={},h={},f=new WeakMap,g=[],_=null,p=!1,m=null,E=null,C=null,b=null,w=null,M=null,y=null,S=new Ke(0,0,0),L=0,I=!1,O=null,k=null,W=null,A=null,z=null,$=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,re=0,P=n.getParameter(n.VERSION);P.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(P)[1]),G=re>=1):P.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),G=re>=2);let X=null,ie={},Ee=n.getParameter(n.SCISSOR_BOX),Fe=n.getParameter(n.VIEWPORT),J=new $t().fromArray(Ee),le=new $t().fromArray(Fe);function ye(D,te,Z,ce){let ae=new Uint8Array(4),ue=n.createTexture();n.bindTexture(D,ue),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Me=0;Me<Z;Me++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(te,0,n.RGBA,1,1,ce,0,n.RGBA,n.UNSIGNED_BYTE,ae):n.texImage2D(te+Me,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ae);return ue}let Ae={};Ae[n.TEXTURE_2D]=ye(n.TEXTURE_2D,n.TEXTURE_2D,1),Ae[n.TEXTURE_CUBE_MAP]=ye(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ae[n.TEXTURE_2D_ARRAY]=ye(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ae[n.TEXTURE_3D]=ye(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),de(n.DEPTH_TEST),o.setFunc(Ia),It(!1),at(gv),de(n.CULL_FACE),kt(Eo);function de(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function be(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function dt(D,te){return h[D]!==te?(n.bindFramebuffer(D,te),h[D]=te,D===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=te),D===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=te),!0):!1}function Re(D,te){let Z=g,ce=!1;if(D){Z=f.get(te),Z===void 0&&(Z=[],f.set(te,Z));let ae=D.textures;if(Z.length!==ae.length||Z[0]!==n.COLOR_ATTACHMENT0){for(let ue=0,Me=ae.length;ue<Me;ue++)Z[ue]=n.COLOR_ATTACHMENT0+ue;Z.length=ae.length,ce=!0}}else Z[0]!==n.BACK&&(Z[0]=n.BACK,ce=!0);ce&&n.drawBuffers(Z)}function Ye(D){return _!==D?(n.useProgram(D),_=D,!0):!1}let nt={[So]:n.FUNC_ADD,[Ob]:n.FUNC_SUBTRACT,[Lb]:n.FUNC_REVERSE_SUBTRACT};nt[Fb]=n.MIN,nt[kb]=n.MAX;let Ge={[Ub]:n.ZERO,[Bb]:n.ONE,[Vb]:n.SRC_COLOR,[xv]:n.SRC_ALPHA,[$b]:n.SRC_ALPHA_SATURATE,[jb]:n.DST_COLOR,[zb]:n.DST_ALPHA,[Hb]:n.ONE_MINUS_SRC_COLOR,[Ev]:n.ONE_MINUS_SRC_ALPHA,[Wb]:n.ONE_MINUS_DST_COLOR,[Gb]:n.ONE_MINUS_DST_ALPHA,[qb]:n.CONSTANT_COLOR,[Xb]:n.ONE_MINUS_CONSTANT_COLOR,[Yb]:n.CONSTANT_ALPHA,[Zb]:n.ONE_MINUS_CONSTANT_ALPHA};function kt(D,te,Z,ce,ae,ue,Me,$e,ee,Te){if(D===Eo){p===!0&&(be(n.BLEND),p=!1);return}if(p===!1&&(de(n.BLEND),p=!0),D!==Pb){if(D!==m||Te!==I){if((E!==So||w!==So)&&(n.blendEquation(n.FUNC_ADD),E=So,w=So),Te)switch(D){case za:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yv:n.blendFunc(n.ONE,n.ONE);break;case vv:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _v:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:He("WebGLState: Invalid blending: ",D);break}else switch(D){case za:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yv:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case vv:He("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case _v:He("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:He("WebGLState: Invalid blending: ",D);break}C=null,b=null,M=null,y=null,S.set(0,0,0),L=0,m=D,I=Te}return}ae=ae||te,ue=ue||Z,Me=Me||ce,(te!==E||ae!==w)&&(n.blendEquationSeparate(nt[te],nt[ae]),E=te,w=ae),(Z!==C||ce!==b||ue!==M||Me!==y)&&(n.blendFuncSeparate(Ge[Z],Ge[ce],Ge[ue],Ge[Me]),C=Z,b=ce,M=ue,y=Me),($e.equals(S)===!1||ee!==L)&&(n.blendColor($e.r,$e.g,$e.b,ee),S.copy($e),L=ee),m=D,I=!1}function st(D,te){D.side===cr?be(n.CULL_FACE):de(n.CULL_FACE);let Z=D.side===Wn;te&&(Z=!Z),It(Z),D.blending===za&&D.transparent===!1?kt(Eo):kt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);let ce=D.stencilWrite;a.setTest(ce),ce&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ut(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?de(n.SAMPLE_ALPHA_TO_COVERAGE):be(n.SAMPLE_ALPHA_TO_COVERAGE)}function It(D){O!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),O=D)}function at(D){D!==Rb?(de(n.CULL_FACE),D!==k&&(D===gv?n.cullFace(n.BACK):D===Nb?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):be(n.CULL_FACE),k=D}function Gt(D){D!==W&&(G&&n.lineWidth(D),W=D)}function Ut(D,te,Z){D?(de(n.POLYGON_OFFSET_FILL),(A!==te||z!==Z)&&(A=te,z=Z,o.getReversed()&&(te=-te,Z=-Z),n.polygonOffset(te,Z))):be(n.POLYGON_OFFSET_FILL)}function jt(D){D?de(n.SCISSOR_TEST):be(n.SCISSOR_TEST)}function Yt(D){D===void 0&&(D=n.TEXTURE0+$-1),X!==D&&(n.activeTexture(D),X=D)}function xt(D,te,Z){Z===void 0&&(X===null?Z=n.TEXTURE0+$-1:Z=X);let ce=ie[Z];ce===void 0&&(ce={type:void 0,texture:void 0},ie[Z]=ce),(ce.type!==D||ce.texture!==te)&&(X!==Z&&(n.activeTexture(Z),X=Z),n.bindTexture(D,te||Ae[D]),ce.type=D,ce.texture=te)}function N(){let D=ie[X];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function wt(){try{n.compressedTexImage2D(...arguments)}catch(D){He("WebGLState:",D)}}function yt(){try{n.compressedTexImage3D(...arguments)}catch(D){He("WebGLState:",D)}}function ft(){try{n.texSubImage2D(...arguments)}catch(D){He("WebGLState:",D)}}function he(){try{n.texSubImage3D(...arguments)}catch(D){He("WebGLState:",D)}}function Wt(){try{n.compressedTexSubImage2D(...arguments)}catch(D){He("WebGLState:",D)}}function Pe(){try{n.compressedTexSubImage3D(...arguments)}catch(D){He("WebGLState:",D)}}function ke(){try{n.texStorage2D(...arguments)}catch(D){He("WebGLState:",D)}}function T(){try{n.texStorage3D(...arguments)}catch(D){He("WebGLState:",D)}}function v(){try{n.texImage2D(...arguments)}catch(D){He("WebGLState:",D)}}function U(){try{n.texImage3D(...arguments)}catch(D){He("WebGLState:",D)}}function se(D){return d[D]!==void 0?d[D]:n.getParameter(D)}function ne(D,te){d[D]!==te&&(n.pixelStorei(D,te),d[D]=te)}function fe(D){J.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),J.copy(D))}function pe(D){le.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),le.copy(D))}function K(D,te){let Z=l.get(te);Z===void 0&&(Z=new WeakMap,l.set(te,Z));let ce=Z.get(D);ce===void 0&&(ce=n.getUniformBlockIndex(te,D.name),n.uniformBlockBinding(te,ce,ce),Z.set(D,ce))}function Q(D,te,Z){let ae=l.get(te).get(D);c[ae]!==Z&&(n.bindBufferBase(n.UNIFORM_BUFFER,ae,Z),c[ae]=Z)}function oe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},X=null,ie={},h={},c={},f=new WeakMap,g=[],_=null,p=!1,m=null,E=null,C=null,b=null,w=null,M=null,y=null,S=new Ke(0,0,0),L=0,I=!1,O=null,k=null,W=null,A=null,z=null,J.set(0,0,n.canvas.width,n.canvas.height),le.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:de,disable:be,bindFramebuffer:dt,drawBuffers:Re,useProgram:Ye,setBlending:kt,setMaterial:st,setFlipSided:It,setCullFace:at,setLineWidth:Gt,setPolygonOffset:Ut,setScissorTest:jt,activeTexture:Yt,bindTexture:xt,unbindTexture:N,compressedTexImage2D:wt,compressedTexImage3D:yt,texImage2D:v,texImage3D:U,pixelStorei:ne,getParameter:se,updateUBOMapping:K,uniformBlockBinding:Q,texStorage2D:ke,texStorage3D:T,texSubImage2D:ft,texSubImage3D:he,compressedTexSubImage2D:Wt,compressedTexSubImage3D:Pe,scissor:fe,viewport:pe,reset:oe}}function AF(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Le,u=new WeakMap,d=new Set,h,f=new WeakMap,g=new Set,_=new FinalizationRegistry(T=>g.delete(T)),p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(T,v){return p?new OffscreenCanvas(T,v):yl("canvas")}function E(T,v,U){let se=1,ne=ke(T);if((ne.width>U||ne.height>U)&&(se=U/Math.max(ne.width,ne.height)),se<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let fe=Math.floor(se*ne.width),pe=Math.floor(se*ne.height);h===void 0&&(h=m(fe,pe));let K=v?m(fe,pe):h;return K.width=fe,K.height=pe,K.getContext("2d").drawImage(T,0,0,fe,pe),Ve("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+fe+"x"+pe+")."),K}else return"data"in T&&Ve("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),T;return T}function C(T){return T.generateMipmaps}function b(T){n.generateMipmap(T)}function w(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(T,v,U,se,ne,fe=!1){if(T!==null){if(n[T]!==void 0)return n[T];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let pe;se&&(pe=e.get("EXT_texture_norm16"),pe||Ve("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=v;if(v===n.RED&&(U===n.FLOAT&&(K=n.R32F),U===n.HALF_FLOAT&&(K=n.R16F),U===n.UNSIGNED_BYTE&&(K=n.R8),U===n.UNSIGNED_SHORT&&pe&&(K=pe.R16_EXT),U===n.SHORT&&pe&&(K=pe.R16_SNORM_EXT)),v===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(K=n.R8UI),U===n.UNSIGNED_SHORT&&(K=n.R16UI),U===n.UNSIGNED_INT&&(K=n.R32UI),U===n.BYTE&&(K=n.R8I),U===n.SHORT&&(K=n.R16I),U===n.INT&&(K=n.R32I)),v===n.RG&&(U===n.FLOAT&&(K=n.RG32F),U===n.HALF_FLOAT&&(K=n.RG16F),U===n.UNSIGNED_BYTE&&(K=n.RG8),U===n.UNSIGNED_SHORT&&pe&&(K=pe.RG16_EXT),U===n.SHORT&&pe&&(K=pe.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(K=n.RG8UI),U===n.UNSIGNED_SHORT&&(K=n.RG16UI),U===n.UNSIGNED_INT&&(K=n.RG32UI),U===n.BYTE&&(K=n.RG8I),U===n.SHORT&&(K=n.RG16I),U===n.INT&&(K=n.RG32I)),v===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(K=n.RGB8UI),U===n.UNSIGNED_SHORT&&(K=n.RGB16UI),U===n.UNSIGNED_INT&&(K=n.RGB32UI),U===n.BYTE&&(K=n.RGB8I),U===n.SHORT&&(K=n.RGB16I),U===n.INT&&(K=n.RGB32I)),v===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),U===n.UNSIGNED_INT&&(K=n.RGBA32UI),U===n.BYTE&&(K=n.RGBA8I),U===n.SHORT&&(K=n.RGBA16I),U===n.INT&&(K=n.RGBA32I)),v===n.RGB&&(U===n.UNSIGNED_SHORT&&pe&&(K=pe.RGB16_EXT),U===n.SHORT&&pe&&(K=pe.RGB16_SNORM_EXT),U===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(K=n.R11F_G11F_B10F)),v===n.RGBA){let Q=fe?gl:ut.getTransfer(ne);U===n.FLOAT&&(K=n.RGBA32F),U===n.HALF_FLOAT&&(K=n.RGBA16F),U===n.UNSIGNED_BYTE&&(K=Q===Ct?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT&&pe&&(K=pe.RGBA16_EXT),U===n.SHORT&&pe&&(K=pe.RGBA16_SNORM_EXT),U===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function y(T,v){let U;return T?v===null||v===Gi||v===Mo?U=n.DEPTH24_STENCIL8:v===ji?U=n.DEPTH32F_STENCIL8:v===ja&&(U=n.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Gi||v===Mo?U=n.DEPTH_COMPONENT24:v===ji?U=n.DEPTH_COMPONENT32F:v===ja&&(U=n.DEPTH_COMPONENT16),U}function S(T,v){return C(T)===!0||T.isFramebufferTexture&&T.minFilter!==yn&&T.minFilter!==Gn?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function L(T){let v=new WeakRef(T);i.get(T).__ref=v,g.add(v),_.register(T,v,v)}function I(T){let v=i.get(T).__ref;v!==void 0&&(g.delete(v),_.unregister(v))}function O(T){W(T.target)}function k(T){A(T.target)}function W(T){T.removeEventListener("dispose",O),I(T),$(T),T.isVideoTexture&&u.delete(T),T.isHTMLTexture&&d.delete(T)}function A(T){T.removeEventListener("dispose",k),I(T),re(T)}function z(){for(let T of g){let v=T.deref();v!==void 0&&(v.isRenderTarget===!0?A(v):W(v))}g.clear(),d.clear()}function $(T){let v=i.get(T);if(v.__webglInit===void 0)return;let U=T.source,se=f.get(U);if(se){let ne=se[v.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&G(T),Object.keys(se).length===0&&f.delete(U)}i.remove(T)}function G(T){let v=i.get(T);n.deleteTexture(v.__webglTexture);let U=T.source,se=f.get(U);delete se[v.__cacheKey],o.memory.textures--}function re(T){let v=i.get(T);v.__depthDisposeCallback&&v.__depthDisposeCallback();let U=T.depthTexture;if(U&&U.renderTarget===T&&W(U),T.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(v.__webglFramebuffer[ne]))for(let fe=0;fe<v.__webglFramebuffer[ne].length;fe++)n.deleteFramebuffer(v.__webglFramebuffer[ne][fe]);else n.deleteFramebuffer(v.__webglFramebuffer[ne]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[ne])}else{if(Array.isArray(v.__webglFramebuffer))for(let ne=0;ne<v.__webglFramebuffer.length;ne++)n.deleteFramebuffer(v.__webglFramebuffer[ne]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let ne=0;ne<v.__webglColorRenderbuffer.length;ne++)v.__webglColorRenderbuffer[ne]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[ne]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let se=T.textures;for(let ne=0,fe=se.length;ne<fe;ne++){let pe=i.get(se[ne]);pe.__webglTexture&&(n.deleteTexture(pe.__webglTexture),o.memory.textures--),i.remove(se[ne])}i.remove(T)}let P=0;function X(){P=0}function ie(){return P}function Ee(T){P=T}function Fe(){let T=P;return T>=r.maxTextures&&Ve("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+r.maxTextures),P+=1,T}function J(T){let v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.mipmapsAutoUpdate),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function le(T,v){let U=i.get(T);if(T.isVideoTexture&&Wt(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&U.__version!==T.version){let se=T.image;if(se===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{st(U,T,v);return}}else T.isExternalTexture&&(U.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+v)}function ye(T,v){let U=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&U.__version!==T.version){st(U,T,v);return}else T.isExternalTexture&&(U.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+v)}function Ae(T,v){let U=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&U.__version!==T.version){st(U,T,v);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+v)}function de(T,v){let U=i.get(T);if(T.version>0&&U.__version!==T.version){It(U,T,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+v)}let be={[Zf]:n.REPEAT,[sr]:n.CLAMP_TO_EDGE,[Kf]:n.MIRRORED_REPEAT},dt={[yn]:n.NEAREST,[Qb]:n.NEAREST_MIPMAP_NEAREST,[Gl]:n.NEAREST_MIPMAP_LINEAR,[Gn]:n.LINEAR,[bh]:n.LINEAR_MIPMAP_NEAREST,[jr]:n.LINEAR_MIPMAP_LINEAR},Re={[iM]:n.NEVER,[Vv]:n.ALWAYS,[rM]:n.LESS,[Uv]:n.LEQUAL,[sM]:n.EQUAL,[Bv]:n.GEQUAL,[oM]:n.GREATER,[aM]:n.NOTEQUAL};function Ye(T,v){if(v.type===ji&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Gn||v.magFilter===bh||v.magFilter===Gl||v.magFilter===jr||v.minFilter===Gn||v.minFilter===bh||v.minFilter===Gl||v.minFilter===jr)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,be[v.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,be[v.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,be[v.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,dt[v.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,dt[v.minFilter]),v.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,Re[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===yn||v.minFilter!==Gl&&v.minFilter!==jr||v.type===ji&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){let U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function nt(T,v){let U=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",O),L(v));let se=v.source,ne=f.get(se);ne===void 0&&(ne={},f.set(se,ne));let fe=J(v);if(fe!==T.__cacheKey){ne[fe]===void 0&&(ne[fe]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),ne[fe].usedTimes++;let pe=ne[T.__cacheKey];pe!==void 0&&(ne[T.__cacheKey].usedTimes--,pe.usedTimes===0&&G(v)),T.__cacheKey=fe,T.__webglTexture=ne[fe].texture}return U}function Ge(T,v,U){return Math.floor(Math.floor(T/U)/v)}function kt(T,v,U,se){let fe=T.updateRanges;if(fe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,U,se,v.data);else{fe.sort((D,te)=>D.start-te.start);let pe=0;for(let D=1;D<fe.length;D++){let te=fe[pe],Z=fe[D],ce=te.start+te.count,ae=Ge(Z.start,v.width,4),ue=Ge(te.start,v.width,4);Z.start<=ce+1&&ae===ue&&Ge(Z.start+Z.count-1,v.width,4)===ae?te.count=Math.max(te.count,Z.start+Z.count-te.start):(++pe,fe[pe]=Z)}fe.length=pe+1;let K=t.getParameter(n.UNPACK_ROW_LENGTH),Q=t.getParameter(n.UNPACK_SKIP_PIXELS),oe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let D=0,te=fe.length;D<te;D++){let Z=fe[D],ce=Math.floor(Z.start/4),ae=Math.ceil(Z.count/4),ue=ce%v.width,Me=Math.floor(ce/v.width),$e=ae,ee=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,ue),t.pixelStorei(n.UNPACK_SKIP_ROWS,Me),t.texSubImage2D(n.TEXTURE_2D,0,ue,Me,$e,ee,U,se,v.data)}T.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,K),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(n.UNPACK_SKIP_ROWS,oe)}}function st(T,v,U){let se=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(se=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(se=n.TEXTURE_3D);let ne=nt(T,v),fe=v.source;t.bindTexture(se,T.__webglTexture,n.TEXTURE0+U);let pe=i.get(fe);if(fe.version!==pe.__version||ne===!0){if(t.activeTexture(n.TEXTURE0+U),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let ee=ut.getPrimaries(ut.workingColorSpace),Te=v.colorSpace===$r?null:ut.getPrimaries(v.colorSpace),Ze=v.colorSpace===$r||ee===Te?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let Q=E(v.image,!1,r.maxTextureSize);Q=Pe(v,Q);let oe=s.convert(v.format,v.colorSpace),D=s.convert(v.type),te=M(v.internalFormat,oe,D,v.normalized,v.colorSpace,v.isVideoTexture);Ye(se,v);let Z,ce=v.mipmaps,ae=v.isVideoTexture!==!0,ue=pe.__version===void 0||ne===!0,Me=fe.dataReady,$e=S(v,Q);if(v.isDepthTexture)te=y(v.format===Wr,v.type),ue&&(ae?t.texStorage2D(n.TEXTURE_2D,1,te,Q.width,Q.height):t.texImage2D(n.TEXTURE_2D,0,te,Q.width,Q.height,0,oe,D,null));else if(v.isDataTexture)if(ce.length>0){ae&&ue&&t.texStorage2D(n.TEXTURE_2D,$e,te,ce[0].width,ce[0].height);for(let ee=0,Te=ce.length;ee<Te;ee++)Z=ce[ee],ae?Me&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,Z.width,Z.height,oe,D,Z.data):t.texImage2D(n.TEXTURE_2D,ee,te,Z.width,Z.height,0,oe,D,Z.data);v.generateMipmaps=!1}else ae?(ue&&t.texStorage2D(n.TEXTURE_2D,$e,te,Q.width,Q.height),Me&&kt(v,Q,oe,D)):t.texImage2D(n.TEXTURE_2D,0,te,Q.width,Q.height,0,oe,D,Q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){ae&&ue&&t.texStorage3D(n.TEXTURE_2D_ARRAY,$e,te,ce[0].width,ce[0].height,Q.depth);for(let ee=0,Te=ce.length;ee<Te;ee++)if(Z=ce[ee],v.format!==$i)if(oe!==null)if(ae){if(Me)if(v.layerUpdates.size>0){let Ze=Kv(Z.width,Z.height,v.format,v.type);for(let ve of v.layerUpdates){let Dt=Z.data.subarray(ve*Ze/Z.data.BYTES_PER_ELEMENT,(ve+1)*Ze/Z.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,ve,Z.width,Z.height,1,oe,Dt)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,Z.width,Z.height,Q.depth,oe,Z.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,te,Z.width,Z.height,Q.depth,0,Z.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ae?Me&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,Z.width,Z.height,Q.depth,oe,D,Z.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,te,Z.width,Z.height,Q.depth,0,oe,D,Z.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{ae&&ue&&t.texStorage2D(n.TEXTURE_2D,$e,te,ce[0].width,ce[0].height);for(let ee=0,Te=ce.length;ee<Te;ee++)Z=ce[ee],v.format!==$i?oe!==null?ae?Me&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,Z.width,Z.height,oe,Z.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,te,Z.width,Z.height,0,Z.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?Me&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,Z.width,Z.height,oe,D,Z.data):t.texImage2D(n.TEXTURE_2D,ee,te,Z.width,Z.height,0,oe,D,Z.data)}else if(v.isDataArrayTexture)if(ae){if(ue&&t.texStorage3D(n.TEXTURE_2D_ARRAY,$e,te,Q.width,Q.height,Q.depth),Me)if(v.layerUpdates.size>0){let ee=Kv(Q.width,Q.height,v.format,v.type);for(let Te of v.layerUpdates){let Ze=Q.data.subarray(Te*ee/Q.data.BYTES_PER_ELEMENT,(Te+1)*ee/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Te,Q.width,Q.height,1,oe,D,Ze)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,oe,D,Q.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,te,Q.width,Q.height,Q.depth,0,oe,D,Q.data);else if(v.isData3DTexture)ae?(ue&&t.texStorage3D(n.TEXTURE_3D,$e,te,Q.width,Q.height,Q.depth),Me&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,oe,D,Q.data)):t.texImage3D(n.TEXTURE_3D,0,te,Q.width,Q.height,Q.depth,0,oe,D,Q.data);else if(v.isFramebufferTexture){if(ue)if(ae)t.texStorage2D(n.TEXTURE_2D,$e,te,Q.width,Q.height);else{let ee=Q.width,Te=Q.height;for(let Ze=0;Ze<$e;Ze++)t.texImage2D(n.TEXTURE_2D,Ze,te,ee,Te,0,oe,D,null),ee>>=1,Te>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){let ee=n.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),Q.parentNode!==ee){ee.appendChild(Q),d.add(v),ee.onpaint=Te=>{let Ze=Te.changedElements;for(let ve of d)Ze.includes(ve.image)&&(ve.needsUpdate=!0)},ee.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Q);else{let Ze=n.RGBA,ve=n.RGBA,Dt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ze,ve,Dt,Q)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ce.length>0){if(ae&&ue){let ee=ke(ce[0]);t.texStorage2D(n.TEXTURE_2D,$e,te,ee.width,ee.height)}for(let ee=0,Te=ce.length;ee<Te;ee++)Z=ce[ee],ae?Me&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,oe,D,Z):t.texImage2D(n.TEXTURE_2D,ee,te,oe,D,Z);v.generateMipmaps=!1}else if(ae){if(ue){let ee=ke(Q);t.texStorage2D(n.TEXTURE_2D,$e,te,ee.width,ee.height)}Me&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe,D,Q)}else t.texImage2D(n.TEXTURE_2D,0,te,oe,D,Q);C(v)&&v.mipmapsAutoUpdate===!0&&b(se),pe.__version=fe.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function It(T,v,U){if(v.image.length!==6)return;let se=nt(T,v),ne=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+U);let fe=i.get(ne);if(ne.version!==fe.__version||se===!0){t.activeTexture(n.TEXTURE0+U);let pe=ut.getPrimaries(ut.workingColorSpace),K=v.colorSpace===$r?null:ut.getPrimaries(v.colorSpace),Q=v.colorSpace===$r||pe===K?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let oe=v.isCompressedTexture||v.image[0].isCompressedTexture,D=v.image[0]&&v.image[0].isDataTexture,te=[];for(let ve=0;ve<6;ve++)!oe&&!D?te[ve]=E(v.image[ve],!0,r.maxCubemapSize):te[ve]=D?v.image[ve].image:v.image[ve],te[ve]=Pe(v,te[ve]);let Z=te[0],ce=s.convert(v.format,v.colorSpace),ae=s.convert(v.type),ue=M(v.internalFormat,ce,ae,v.normalized,v.colorSpace),Me=v.isVideoTexture!==!0,$e=fe.__version===void 0||se===!0,ee=ne.dataReady,Te=S(v,Z);Ye(n.TEXTURE_CUBE_MAP,v);let Ze;if(v.isDepthTexture){if(ue=y(v.format===Wr,v.type),$e)if(Me)t.texStorage2D(n.TEXTURE_CUBE_MAP,1,ue,Z.width,Z.height);else for(let ve=0;ve<6;ve++)t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ue,Z.width,Z.height,0,ce,ae,null)}else if(oe){Me&&$e&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Te,ue,Z.width,Z.height);for(let ve=0;ve<6;ve++){Ze=te[ve].mipmaps;for(let Dt=0;Dt<Ze.length;Dt++){let pn=Ze[Dt];v.format!==$i?ce!==null?Me?ee&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Dt,0,0,pn.width,pn.height,ce,pn.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Dt,ue,pn.width,pn.height,0,pn.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Me?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Dt,0,0,pn.width,pn.height,ce,ae,pn.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Dt,ue,pn.width,pn.height,0,ce,ae,pn.data)}}}else{if(Ze=v.mipmaps,Me&&$e){Ze.length>0&&Te++;let ve=ke(te[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Te,ue,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(D){Me?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,te[ve].width,te[ve].height,ce,ae,te[ve].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ue,te[ve].width,te[ve].height,0,ce,ae,te[ve].data);for(let Dt=0;Dt<Ze.length;Dt++){let Qr=Ze[Dt].image[ve].image;Me?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Dt+1,0,0,Qr.width,Qr.height,ce,ae,Qr.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Dt+1,ue,Qr.width,Qr.height,0,ce,ae,Qr.data)}}else{Me?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,ce,ae,te[ve]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ue,ce,ae,te[ve]);for(let Dt=0;Dt<Ze.length;Dt++){let pn=Ze[Dt];Me?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Dt+1,0,0,ce,ae,pn.image[ve]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Dt+1,ue,ce,ae,pn.image[ve])}}}C(v)&&v.mipmapsAutoUpdate===!0&&b(n.TEXTURE_CUBE_MAP),fe.__version=ne.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function at(T,v,U,se,ne,fe){let pe=s.convert(U.format,U.colorSpace),K=s.convert(U.type),Q=M(U.internalFormat,pe,K,U.normalized,U.colorSpace),oe=i.get(v),D=i.get(U);if(D.__renderTarget=v,!oe.__hasExternalTextures){let te=Math.max(1,v.width>>fe),Z=Math.max(1,v.height>>fe);ne===n.TEXTURE_3D||ne===n.TEXTURE_2D_ARRAY?t.texImage3D(ne,fe,Q,te,Z,v.depth,0,pe,K,null):t.texImage2D(ne,fe,Q,te,Z,0,pe,K,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),he(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,se,ne,D.__webglTexture,0,ft(v)):(ne===n.TEXTURE_2D||ne>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,se,ne,D.__webglTexture,fe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Gt(T,v,U){if(n.bindRenderbuffer(n.RENDERBUFFER,T),v.depthBuffer){let se=v.depthTexture,ne=se&&se.isDepthTexture?se.type:null,fe=y(v.stencilBuffer,ne),pe=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;he(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ft(v),fe,v.width,v.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,ft(v),fe,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,fe,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,pe,n.RENDERBUFFER,T)}else{let se=v.textures;for(let ne=0;ne<se.length;ne++){let fe=se[ne],pe=s.convert(fe.format,fe.colorSpace),K=s.convert(fe.type),Q=M(fe.internalFormat,pe,K,fe.normalized,fe.colorSpace);he(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ft(v),Q,v.width,v.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,ft(v),Q,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Q,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ut(T,v,U){let se=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ne=i.get(v.depthTexture);ne.__renderTarget=v;let fe=se?v.depthTexture.image[0]:v.depthTexture.image;(!ne.__webglTexture||fe.width!==v.width||fe.height!==v.height)&&(fe.width=v.width,fe.height=v.height,v.depthTexture.needsUpdate=!0),se?de(v.depthTexture,0):le(v.depthTexture,0);let pe=ne.__webglTexture,K=ft(v),Q=se?n.TEXTURE_CUBE_MAP_POSITIVE_X+U:n.TEXTURE_2D,oe=v.depthTexture.format===Wr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===Br)he(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,oe,Q,pe,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,oe,Q,pe,0);else if(v.depthTexture.format===Wr)he(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,oe,Q,pe,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,oe,Q,pe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function jt(T){let v=i.get(T),U=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){let se=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),se){let ne=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,se.removeEventListener("dispose",ne)};se.addEventListener("dispose",ne),v.__depthDisposeCallback=ne}v.__boundDepthTexture=se}if(T.depthTexture&&!v.__autoAllocateDepthBuffer)if(U)for(let se=0;se<6;se++)Ut(v.__webglFramebuffer[se],T,se);else T.texture.mipmaps.length>0?Ut(v.__webglFramebuffer[0],T,0):Ut(v.__webglFramebuffer,T,0);else if(U){v.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[se]),v.__webglDepthbuffer[se]===void 0)v.__webglDepthbuffer[se]=n.createRenderbuffer(),Gt(v.__webglDepthbuffer[se],T,!1);else{let ne=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=v.__webglDepthbuffer[se];n.bindRenderbuffer(n.RENDERBUFFER,fe),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,fe)}}else if(T.texture.mipmaps.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Gt(v.__webglDepthbuffer,T,!1);else{let ne=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,fe),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,fe)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Yt(T,v,U){let se=i.get(T);v!==void 0&&at(se.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&jt(T)}function xt(T){let v=T.texture,U=i.get(T),se=i.get(v);T.addEventListener("dispose",k),L(T);let ne=T.textures,fe=T.isWebGLCubeRenderTarget===!0,pe=ne.length>1;if(pe||(se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture()),se.__version=v.version,o.memory.textures++),fe){U.__webglFramebuffer=[];for(let K=0;K<6;K++)if(v.mipmaps.length>0){U.__webglFramebuffer[K]=[];for(let Q=0;Q<v.mipmaps.length;Q++)U.__webglFramebuffer[K][Q]=n.createFramebuffer()}else U.__webglFramebuffer[K]=n.createFramebuffer()}else{if(v.mipmaps.length>0){U.__webglFramebuffer=[];for(let K=0;K<v.mipmaps.length;K++)U.__webglFramebuffer[K]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(pe)for(let K=0,Q=ne.length;K<Q;K++){let oe=i.get(ne[K]);oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&he(T)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let K=0;K<ne.length;K++){let Q=ne[K];U.__webglColorRenderbuffer[K]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[K]);let oe=s.convert(Q.format,Q.colorSpace),D=s.convert(Q.type),te=M(Q.internalFormat,oe,D,Q.normalized,Q.colorSpace,T.isXRRenderTarget===!0),Z=ft(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Z,te,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+K,n.RENDERBUFFER,U.__webglColorRenderbuffer[K])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Gt(U.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(fe){t.bindTexture(n.TEXTURE_CUBE_MAP,se.__webglTexture),Ye(n.TEXTURE_CUBE_MAP,v);for(let K=0;K<6;K++)if(v.mipmaps.length>0)for(let Q=0;Q<v.mipmaps.length;Q++)at(U.__webglFramebuffer[K][Q],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Q);else at(U.__webglFramebuffer[K],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);C(v)?b(n.TEXTURE_CUBE_MAP):v.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}else if(pe){for(let K=0,Q=ne.length;K<Q;K++){let oe=ne[K],D=i.get(oe),te=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(te=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(te,D.__webglTexture),Ye(te,oe),at(U.__webglFramebuffer,T,oe,n.COLOR_ATTACHMENT0+K,te,0),C(oe)&&b(te)}t.unbindTexture()}else{let K=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(K=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(K,se.__webglTexture),Ye(K,v),v.mipmaps.length>0)for(let Q=0;Q<v.mipmaps.length;Q++)at(U.__webglFramebuffer[Q],T,v,n.COLOR_ATTACHMENT0,K,Q);else at(U.__webglFramebuffer,T,v,n.COLOR_ATTACHMENT0,K,0);C(v)?b(K):v.mipmaps.length>0&&n.texParameteri(K,n.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}T.depthBuffer&&jt(T)}function N(T){let v=T.textures;for(let U=0,se=v.length;U<se;U++){let ne=v[U];if(C(ne)&&ne.mipmapsAutoUpdate===!0){let fe=w(T),pe=i.get(ne).__webglTexture;t.bindTexture(fe,pe),b(fe),t.unbindTexture()}}}let wt=[];function yt(T){if(T.samples>0){if(he(T)===!1){let v=T.textures,U=T.width,se=T.height,ne=n.COLOR_BUFFER_BIT,fe=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pe=i.get(T),K=v.length>1;if(K)for(let oe=0;oe<v.length;oe++)t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer),T.texture.mipmaps.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let oe=0;oe<v.length;oe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(ne|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(ne|=n.STENCIL_BUFFER_BIT)),K){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pe.__webglColorRenderbuffer[oe]);let D=i.get(v[oe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,D,0)}n.blitFramebuffer(0,0,U,se,0,0,U,se,ne,n.NEAREST),c===!0&&(wt.length=0,wt.push(n.COLOR_ATTACHMENT0+oe),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&wt.push(fe),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,wt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),K)for(let oe=0;oe<v.length;oe++){t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,pe.__webglColorRenderbuffer[oe]);let D=i.get(v[oe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,D,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&c){let v=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function ft(T){return Math.min(r.maxSamples,T.samples)}function he(T){let v=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Wt(T){let v=o.render.frame;u.get(T)!==v&&(u.set(T,v),T.update())}function Pe(T,v){let U=T.colorSpace,se=T.format,ne=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||U!==ml&&U!==$r&&(ut.getTransfer(U)===Ct?(se!==$i||ne!==Jn)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):He("WebGLTextures: Unsupported texture color space:",U)),v}function ke(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=Fe,this.resetTextureUnits=X,this.getTextureUnits=ie,this.setTextureUnits=Ee,this.setTexture2D=le,this.setTexture2DArray=ye,this.setTexture3D=Ae,this.setTextureCube=de,this.rebindTextures=Yt,this.setupRenderTarget=xt,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=yt,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=at,this.useMultisampledRTT=he,this.dispose=z}function IF(n,e){function t(i,r=$r){let s,o=ut.getTransfer(r);if(i===Jn)return n.UNSIGNED_BYTE;if(i===Th)return n.UNSIGNED_SHORT_4_4_4_4;if(i===wh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Pv)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ov)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Rv)return n.BYTE;if(i===Nv)return n.SHORT;if(i===ja)return n.UNSIGNED_SHORT;if(i===Mh)return n.INT;if(i===Gi)return n.UNSIGNED_INT;if(i===ji)return n.FLOAT;if(i===Wi)return n.HALF_FLOAT;if(i===Lv)return n.ALPHA;if(i===Fv)return n.RGB;if(i===$i)return n.RGBA;if(i===Br)return n.DEPTH_COMPONENT;if(i===Wr)return n.DEPTH_STENCIL;if(i===kv)return n.RED;if(i===Ch)return n.RED_INTEGER;if(i===ws)return n.RG;if(i===Dh)return n.RG_INTEGER;if(i===Ah)return n.RGBA_INTEGER;if(i===jl||i===Wl||i===$l||i===ql)if(o===Ct)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===jl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Wl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===$l)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ql)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===jl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Wl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===$l)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ql)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ih||i===Rh||i===Nh||i===Ph)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ih)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Rh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Nh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ph)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Oh||i===Lh||i===Fh||i===kh||i===Uh||i===Xl||i===Bh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Oh||i===Lh)return o===Ct?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Fh)return o===Ct?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===kh)return s.COMPRESSED_R11_EAC;if(i===Uh)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Xl)return s.COMPRESSED_RG11_EAC;if(i===Bh)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Vh||i===Hh||i===zh||i===Gh||i===jh||i===Wh||i===$h||i===qh||i===Xh||i===Yh||i===Zh||i===Kh||i===Jh||i===Qh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Vh)return o===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Hh)return o===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===zh)return o===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Gh)return o===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===jh)return o===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Wh)return o===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===$h)return o===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===qh)return o===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Xh)return o===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Yh)return o===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Zh)return o===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Kh)return o===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Jh)return o===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Qh)return o===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ep||i===tp||i===np)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ep)return o===Ct?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===tp)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===np)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ip||i===rp||i===Yl||i===sp)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ip)return s.COMPRESSED_RED_RGTC1_EXT;if(i===rp)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Yl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===sp)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Mo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var RF=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,NF=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,o_=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Il(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new ar({vertexShader:RF,fragmentShader:NF,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qt(new xo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},a_=class extends zi{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,h=null,f=null,g=null,_=typeof XRWebGLBinding<"u",p=new o_,m={},E=t.getContextAttributes(),C=null,b=null,w=[],M=[],y=new Le,S=null,L=null,I=new Pn;I.viewport=new $t;let O=new Pn;O.viewport=new $t;let k=[I,O],W=new _h,A=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let le=w[J];return le===void 0&&(le=new La,w[J]=le),le.getTargetRaySpace()},this.getControllerGrip=function(J){let le=w[J];return le===void 0&&(le=new La,w[J]=le),le.getGripSpace()},this.getHand=function(J){let le=w[J];return le===void 0&&(le=new La,w[J]=le),le.getHandSpace()};function $(J){let le=M.indexOf(J.inputSource);if(le===-1)return;let ye=w[le];ye!==void 0&&(ye.update(J.inputSource,J.frame,l||o),ye.dispatchEvent({type:J.type,data:J.inputSource}))}function G(){r.removeEventListener("select",$),r.removeEventListener("selectstart",$),r.removeEventListener("selectend",$),r.removeEventListener("squeeze",$),r.removeEventListener("squeezestart",$),r.removeEventListener("squeezeend",$),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",re);for(let J=0;J<w.length;J++){let le=M[J];le!==null&&(M[J]=null,w[J].disconnect(le))}A=null,z=null,p.reset();for(let J in m)delete m[J];if(e.setRenderTarget(C),f=null,h=null,d=null,r=null,b=null,Fe.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(y.width,y.height,!1),L!==null){let J=L.camera;J.fov=L.fov,J.zoom=L.zoom,J.updateProjectionMatrix(),L=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,i.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,i.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(C=e.getRenderTarget(),r.addEventListener("select",$),r.addEventListener("selectstart",$),r.addEventListener("selectend",$),r.addEventListener("squeeze",$),r.addEventListener("squeezestart",$),r.addEventListener("squeezeend",$),r.addEventListener("end",G),r.addEventListener("inputsourceschange",re),E.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(y),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,Ae=null,de=null;E.depth&&(de=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=E.stencil?Wr:Br,Ae=E.stencil?Mo:Gi);let be={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(be),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),b=new li(h.textureWidth,h.textureHeight,{format:$i,type:Jn,depthTexture:new zr(h.textureWidth,h.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let ye={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,ye),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new li(f.framebufferWidth,f.framebufferHeight,{format:$i,type:Jn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),Fe.setContext(r),Fe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function re(J){for(let le=0;le<J.removed.length;le++){let ye=J.removed[le],Ae=M.indexOf(ye);Ae>=0&&(M[Ae]=null,w[Ae].disconnect(ye))}for(let le=0;le<J.added.length;le++){let ye=J.added[le],Ae=M.indexOf(ye);if(Ae===-1){for(let be=0;be<w.length;be++)if(be>=M.length){M.push(ye),Ae=be;break}else if(M[be]===null){M[be]=ye,Ae=be;break}if(Ae===-1)break}let de=w[Ae];de&&de.connect(ye)}}function P(J,le){le===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(le.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;let le=J.near,ye=J.far;p.texture!==null&&(p.depthNear>0&&(le=p.depthNear),p.depthFar>0&&(ye=p.depthFar)),W.near=O.near=I.near=le,W.far=O.far=I.far=ye,(A!==W.near||z!==W.far)&&(r.updateRenderState({depthNear:W.near,depthFar:W.far}),A=W.near,z=W.far),W.layers.mask=J.layers.mask|6,I.layers.mask=W.layers.mask&-5,O.layers.mask=W.layers.mask&-3;let Ae=J.parent,de=W.cameras;P(W,Ae);for(let be=0;be<de.length;be++)P(de[be],Ae);W.projectionMatrix.copy(I.projectionMatrix),W.projectionMatrixInverse.copy(I.projectionMatrixInverse),L===null&&J.isPerspectiveCamera&&(L={camera:J,fov:J.fov,zoom:J.zoom}),X(J,W,Ae)};function X(J,le,ye){ye===null?J.matrix.copy(le.matrixWorld):(J.matrix.copy(ye.matrixWorld),J.matrix.invert(),J.matrix.multiply(le.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(le.projectionMatrix),J.projectionMatrixInverse.copy(le.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Pa*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(J){c=J,h!==null&&(h.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(W)},this.getCameraTexture=function(J){return m[J]};let ie=null;function Ee(J,le){if(u=le.getViewerPose(l||o),g=le,u!==null){let ye=u.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let Ae=!1;ye.length!==W.cameras.length&&(W.cameras.length=0,Ae=!0);for(let Re=0;Re<ye.length;Re++){let Ye=ye[Re],nt=null;if(f!==null)nt=f.getViewport(Ye);else{let kt=d.getViewSubImage(h,Ye);nt=kt.viewport,Re===0&&(e.setRenderTargetTextures(b,kt.colorTexture,kt.depthStencilTexture),e.setRenderTarget(b))}let Ge=k[Re];Ge===void 0&&(Ge=new Pn,Ge.layers.enable(Re),Ge.viewport=new $t,k[Re]=Ge),Ge.matrix.fromArray(Ye.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(Ye.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(nt.x,nt.y,nt.width,nt.height),Re===0&&(W.matrix.copy(Ge.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Ae===!0&&W.cameras.push(Ge)}let de=r.enabledFeatures;if(de&&de.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){d=i.getBinding();let Re=d.getDepthInformation(ye[0]);Re&&Re.isValid&&Re.texture&&p.init(Re,r.renderState)}if(de&&de.includes("camera-access")&&_){e.state.unbindTexture(),d=i.getBinding();for(let Re=0;Re<ye.length;Re++){let Ye=ye[Re].camera;if(Ye){let nt=m[Ye];nt||(nt=new Il,m[Ye]=nt);let Ge=d.getCameraImage(Ye);nt.sourceTexture=Ge}}}}for(let ye=0;ye<w.length;ye++){let Ae=M[ye],de=w[ye];Ae!==null&&de!==void 0&&de.update(Ae,le,l||o)}ie&&ie(J,le),le.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:le}),g=null}let Fe=new UM;Fe.setAnimationLoop(Ee),this.setAnimationLoop=function(J){ie=J},this.dispose=function(){}}},PF=new Ht,XM=new je;XM.set(-1,0,0,0,1,0,0,0,1);function OF(n,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Xv(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,E,C,b){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(p,m):m.isMeshLambertMaterial?(s(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(p,m),h(p,m),m.isMeshPhysicalMaterial&&f(p,m,b)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,E,C):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Wn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Wn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let E=e.get(m),C=E.envMap,b=E.envMapRotation;C&&(p.envMap.value=C,p.envMapRotation.value.setFromMatrix4(PF.makeRotationFromEuler(b)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(XM),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,E,C){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*E,p.scale.value=C*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,E){p.ior.value=m.ior,m.diffuseRoughness>0&&(p.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Wn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=E.texture,p.transmissionSamplerSize.value.set(E.width,E.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){let E=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(E.matrixWorld),p.nearDistance.value=E.shadow.camera.near,p.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function LF(n,e,t,i){let r={},s={};function o(E,C){let b=C.program;i.uniformBlockBinding(E,b,r[E.id])}function a(E,C){let b=r[E.id];b===void 0&&(g(E),b=c(E),r[E.id]=b,E.addEventListener("dispose",p));let w=C.program;i.updateUBOMapping(E,w);let M=e.render.frame;s[E.id]!==M&&(l(E),s[E.id]=M)}function c(E){let C=n.createBuffer(),b=E.__size,w=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,C),n.bufferData(n.UNIFORM_BUFFER,b,w),n.bindBuffer(n.UNIFORM_BUFFER,null),C}function l(E){let C=r[E.id],b=E.uniforms,w=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,C);for(let M=0,y=b.length;M<y;M++){let S=b[M];if(Array.isArray(S))for(let L=0,I=S.length;L<I;L++)u(S[L],M,L,w);else u(S,M,0,w)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(E,C,b,w){if(h(E,C,b,w)===!0){let M=E.__offset,y=E.value;if(Array.isArray(y)){let S=0;for(let L=0;L<y.length;L++){let I=y[L],O=_(I,!0);d(I,E.__data,S),S+=O.storage/Float32Array.BYTES_PER_ELEMENT}}else d(y,E.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,M,E.__data)}}function d(E,C,b){typeof E=="number"||typeof E=="boolean"?C[b]=E:E.isMatrix3?(C[b]=E.elements[0],C[b+1]=E.elements[1],C[b+2]=E.elements[2],C[b+3]=0,C[b+4]=E.elements[3],C[b+5]=E.elements[4],C[b+6]=E.elements[5],C[b+7]=0,C[b+8]=E.elements[6],C[b+9]=E.elements[7],C[b+10]=E.elements[8],C[b+11]=0):ArrayBuffer.isView(E)?C.set(E.subarray(0,C.length-b),b):E.toArray(C,b)}function h(E,C,b,w){let M=E.value,y=C+"_"+b;if(Array.isArray(M)){w[y]===void 0&&(w[y]=[]);let S=w[y],L=!1;for(let I=0;I<M.length;I++)f(M[I],S,I)===!0&&(L=!0);return L}return f(M,w,y)}function f(E,C,b){if(C[b]===void 0)return typeof E=="number"||typeof E=="boolean"?C[b]=E:ArrayBuffer.isView(E)?C[b]=E.slice():C[b]=E.clone(),!0;{let w=C[b];if(typeof E=="number"||typeof E=="boolean"){if(w!==E)return C[b]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(w.equals(E)===!1)return w.copy(E),!0}}return!1}function g(E){let C=E.uniforms,b=0,w=16;for(let y=0,S=C.length;y<S;y++){let L=Array.isArray(C[y])?C[y]:[C[y]];for(let I=0,O=L.length;I<O;I++){let k=L[I],W=Array.isArray(k.value)?k.value:[k.value],A=Array.isArray(C[y])||Array.isArray(k.value),z=b;for(let G=0,re=W.length;G<re;G++){let P=W[G],X=_(P,A),ie=b%w,Ee=ie%X.boundary,Fe=ie+Ee;b+=Ee,Fe!==0&&w-Fe<X.storage&&(b+=w-Fe),G===0&&(z=b),b+=X.storage}let $=k.type==="int"?Int32Array:k.type==="uint"?Uint32Array:Float32Array;k.__data=new $((b-z)/Float32Array.BYTES_PER_ELEMENT),k.__offset=z}}let M=b%w;return M>0&&(b+=w-M),E.__size=b,E.__cache={},this}function _(E,C){let b={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(b.boundary=4,b.storage=4):E.isVector2?(b.boundary=8,b.storage=8):E.isVector3||E.isColor?(b.boundary=16,b.storage=12):E.isVector4?(b.boundary=16,b.storage=16):E.isMatrix3?(b.boundary=16,b.storage=48):E.isMatrix4?(b.boundary=16,b.storage=64):E.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(b.boundary=16,b.storage=E.byteLength):Ve("WebGLRenderer: Unsupported uniform value type.",E),C===!0&&(b.boundary=16,b.storage=Math.ceil(b.storage/16)*16),b}function p(E){let C=E.target;C.removeEventListener("dispose",p),n.deleteBuffer(r[C.id]),delete r[C.id],delete s[C.id]}function m(){for(let E in r)n.deleteBuffer(r[E]);r={},s={}}return{bind:o,update:a,dispose:m}}var FF=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ur=null;function kF(){return ur===null&&(ur=new rh(FF,16,16,ws,Wi),ur.name="DFG_LUT",ur.minFilter=Gn,ur.magFilter=Gn,ur.wrapS=sr,ur.wrapT=sr,ur.generateMipmaps=!1,ur.needsUpdate=!0),ur}var dp=class{constructor(e={}){let{canvas:t=cM(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=Jn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;let _=f,p=new Set([Ah,Dh,Ch]),m=new Set([Jn,Gi,ja,Mo,Th,wh]),E=new Uint32Array(4),C=new Int32Array(4),b={textures:[],min:[],max:[],resolution:[]},w=null,M=null,y=[],S=[],L=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=lr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,O=!1,k=null,W=null,A=null,z=null;this._outputColorSpace=zn;let $=0,G=0,re=null,P=-1,X=null,ie=new $t,Ee=new $t,Fe=null,J=new Ke(0),le=0,ye=t.width,Ae=t.height,de=1,be=null,dt=null,Re=new $t(0,0,ye,Ae),Ye=new $t(0,0,ye,Ae),nt=!1,Ge=new vs,kt=new sh,st=!1,It=!1,at=new Ht,Gt=new F,Ut=new $t,jt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Yt=!1;function xt(){return re===null?de:1}let N=i;function wt(x,R){return t.getContext(x,R)}let yt,ft,he,Wt,Pe,ke,T,v,U,se,ne,fe,pe,K,Q,oe,D,te,Z,ce,ae,ue,Me;try{let x={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",Te,!1),t.addEventListener("webglcontextrestored",Ze,!1),t.addEventListener("webglcontextcreationerror",ve,!1),N===null){let R="webgl2";if(N=wt(R,x),N===null)throw wt(R)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}$e()}catch(x){throw t.removeEventListener("webglcontextlost",Te,!1),t.removeEventListener("webglcontextrestored",Ze,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),He("WebGLRenderer: "+x.message),x}function $e(){yt=new XO(N),yt.init(),ae=new IF(N,yt),ft=new kO(N,yt,e,ae),he=new DF(N,yt),ft.reversedDepthBuffer&&h&&he.buffers.depth.setReversed(!0),W=N.createFramebuffer(),A=N.createFramebuffer(),z=N.createFramebuffer(),Wt=new KO(N),Pe=new pF,ke=new AF(N,yt,he,Pe,ft,ae,Wt),T=new qO(I),v=new QR(N),ue=new LO(N,v),U=new YO(N,v,Wt,ue),se=new QO(N,U,v,ue,Wt),te=new JO(N,ft,ke),Q=new UO(Pe),ne=new hF(I,T,yt,ft,ue,Q),fe=new OF(I,Pe),pe=new gF,K=new SF(yt),D=new OO(I,T,he,se,g,c),oe=new CF(I,se,ft),Me=new LF(N,Wt,ft,he),Z=new FO(N,yt,Wt),ce=new ZO(N,yt,Wt),Wt.programs=ne.programs,I.capabilities=ft,I.extensions=yt,I.properties=Pe,I.renderLists=pe,I.shadowMap=oe,I.state=he,I.info=Wt}_!==Jn&&(L=new tL(_,t.width,t.height,a,r,s));let ee=new a_(I,N);this.xr=ee,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let x=yt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=yt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return de},this.setPixelRatio=function(x){x!==void 0&&(de=x,this.setSize(ye,Ae,!1))},this.getSize=function(x){return x.set(ye,Ae)},this.setSize=function(x,R,q=!0){if(ee.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}ye=x,Ae=R,t.width=Math.floor(x*de),t.height=Math.floor(R*de),q===!0&&(t.style.width=x+"px",t.style.height=R+"px"),L!==null&&L.setSize(t.width,t.height),this.setViewport(0,0,x,R)},this.getDrawingBufferSize=function(x){return x.set(ye*de,Ae*de).floor()},this.setDrawingBufferSize=function(x,R,q){ye=x,Ae=R,de=q,t.width=Math.floor(x*q),t.height=Math.floor(R*q),this.setViewport(0,0,x,R)},this.setEffects=function(x){if(_===Jn){He("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let R=0;R<x.length;R++)if(x[R].isOutputPass===!0){Ve("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(ie)},this.getViewport=function(x){return x.copy(Re)},this.setViewport=function(x,R,q,V){x.isVector4?Re.set(x.x,x.y,x.z,x.w):Re.set(x,R,q,V),he.viewport(ie.copy(Re).multiplyScalar(xt()).round())},this.getScissor=function(x){return x.copy(Ye)},this.setScissor=function(x,R,q,V){x.isVector4?Ye.set(x.x,x.y,x.z,x.w):Ye.set(x,R,q,V),he.scissor(Ee.copy(Ye).multiplyScalar(xt()).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(x){he.setScissorTest(nt=x)},this.setOpaqueSort=function(x){be=x},this.setTransparentSort=function(x){dt=x},this.getClearColor=function(x){return x.copy(D.getClearColor())},this.setClearColor=function(){D.setClearColor(...arguments)},this.getClearAlpha=function(){return D.getClearAlpha()},this.setClearAlpha=function(){D.setClearAlpha(...arguments)},this.clear=function(x=!0,R=!0,q=!0){let V=0;if(x){let H=!1;if(re!==null){let ge=re.texture.format;H=p.has(ge)}if(H){let ge=re.texture.type,we=m.has(ge),me=D.getClearColor(),Se=D.getClearAlpha(),Ie=me.r,qe=me.g,ct=me.b;we?(E[0]=Ie,E[1]=qe,E[2]=ct,E[3]=Se,N.clearBufferuiv(N.COLOR,0,E)):(C[0]=Ie,C[1]=qe,C[2]=ct,C[3]=Se,N.clearBufferiv(N.COLOR,0,C))}else V|=N.COLOR_BUFFER_BIT}R&&(V|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(V|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&N.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(x){x.setRenderer(this),k=x},this.dispose=function(){t.removeEventListener("webglcontextlost",Te,!1),t.removeEventListener("webglcontextrestored",Ze,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),D.dispose(),pe.dispose(),K.dispose(),ke.dispose(),Pe.dispose(),T.dispose(),se.dispose(),U.dispose(),ue.dispose(),Me.dispose(),ne.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",I_),ee.removeEventListener("sessionend",R_),Os.stop()};function Te(x){x.preventDefault(),vl("WebGLRenderer: Context Lost."),O=!0}function Ze(){vl("WebGLRenderer: Context Restored."),O=!1;let x=Wt.autoReset,R=oe.enabled,q=oe.autoUpdate,V=oe.needsUpdate,H=oe.type;$e(),Wt.autoReset=x,oe.enabled=R,oe.autoUpdate=q,oe.needsUpdate=V,oe.type=H}function ve(x){He("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Dt(x){let R=x.target;R.removeEventListener("dispose",Dt),pn(R)}function pn(x){Qr(x),Pe.remove(x)}function Qr(x){let R=Pe.get(x).programs;R!==void 0&&(R.forEach(function(q){ne.releaseProgram(q)}),x.isShaderMaterial&&ne.releaseShaderCache(x))}this.renderBufferDirect=function(x,R,q,V,H,ge){R===null&&(R=jt);let we=H.isMesh&&H.matrixWorld.determinantAffine()<0,me=zT(x,R,q,V,H);he.setMaterial(V,we);let Se=q.index,Ie=1;if(V.wireframe===!0){if(Se=U.getWireframeAttribute(q),Se===void 0)return;Ie=2}let qe=q.drawRange,ct=q.attributes.position,Ce=qe.start*Ie,lt=(qe.start+qe.count)*Ie;ge!==null&&(Ce=Math.max(Ce,ge.start*Ie),lt=Math.min(lt,(ge.start+ge.count)*Ie)),Se!==null?(Ce=Math.max(Ce,0),lt=Math.min(lt,Se.count)):ct!=null&&(Ce=Math.max(Ce,0),lt=Math.min(lt,ct.count));let sn=lt-Ce;if(sn<0||sn===1/0)return;ue.setup(H,V,me,q,Se);let Ft,Ot=Z;if(Se!==null&&(Ft=v.get(Se),Ot=ce,Ot.setIndex(Ft)),H.isMesh)V.wireframe===!0?(he.setLineWidth(V.wireframeLinewidth*xt()),Ot.setMode(N.LINES)):Ot.setMode(N.TRIANGLES);else if(H.isLine){let wn=V.linewidth;wn===void 0&&(wn=1),he.setLineWidth(wn*xt()),H.isLineSegments?Ot.setMode(N.LINES):H.isLineLoop?Ot.setMode(N.LINE_LOOP):Ot.setMode(N.LINE_STRIP)}else H.isPoints?Ot.setMode(N.POINTS):H.isSprite&&Ot.setMode(N.TRIANGLES);if(H.isBatchedMesh)if(yt.get("WEBGL_multi_draw"))Ot.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let wn=H._multiDrawStarts,De=H._multiDrawCounts,Ln=H._multiDrawCount,Et=Se?v.get(Se).bytesPerElement:1,Ls=Pe.get(V).currentProgram.getUniforms();for(let Cn=0;Cn<Ln;Cn++)Ls.setValue(N,"_gl_DrawID",Cn),Ot.render(wn[Cn]/Et,De[Cn])}else if(H.isInstancedMesh)Ot.renderInstances(Ce,sn,H.count);else if(q.isInstancedBufferGeometry){let wn=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,De=Math.min(q.instanceCount,wn);Ot.renderInstances(Ce,sn,De)}else Ot.render(Ce,sn)};function A_(x,R,q,V){k!==null&&x.isNodeMaterial&&k.setObject(V,x),st===!0&&Q.setState(x,q,!1),x.transparent===!0&&x.side===cr&&x.forceSinglePass===!1?(x.side=Wn,x.needsUpdate=!0,ic(x,R,V),x.side=Ts,x.needsUpdate=!0,ic(x,R,V),x.side=cr):ic(x,R,V)}this.compile=function(x,R,q=null){q===null&&(q=x),k!==null&&k.renderStart(x,R,q),M=K.get(q),M.init(R),S.push(M),q.traverseVisible(function(H){H.isLight&&H.layers.test(R.layers)&&(M.pushLight(H),H.castShadow&&M.pushShadow(H))}),x!==q&&x.traverseVisible(function(H){H.isLight&&H.layers.test(R.layers)&&(M.pushLight(H),H.castShadow&&M.pushShadow(H))}),M.setupLights(),k!==null&&k.updateLights(M.state.lightsArray),It=this.localClippingEnabled,st=Q.init(this.clippingPlanes,It),st===!0&&Q.setGlobalState(this.clippingPlanes,R),k!==null&&oe.render(M.state.shadowsArray,q,R);let V=new Set;return x.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let ge=H.material;if(ge)if(Array.isArray(ge))for(let we=0;we<ge.length;we++){let me=ge[we];A_(me,q,R,H),V.add(me)}else A_(ge,q,R,H),V.add(ge)}),M=S.pop(),k!==null&&k.renderEnd(),V},this.compileAsync=function(x,R,q=null){let V=this.compile(x,R,q);return new Promise(H=>{function ge(){if(V.forEach(function(we){let Se=Pe.get(we).currentProgram;(Se===void 0||Se.isReady())&&V.delete(we)}),V.size===0){H(x);return}setTimeout(ge,10)}yt.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let zp=null;function VT(x){zp&&zp(x)}function I_(){Os.stop()}function R_(){Os.start()}let Os=new UM;Os.setAnimationLoop(VT),typeof self<"u"&&Os.setContext(self),this.setAnimationLoop=function(x){zp=x,ee.setAnimationLoop(x),x===null?Os.stop():Os.start()},ee.addEventListener("sessionstart",I_),ee.addEventListener("sessionend",R_),this.render=function(x,R){if(R!==void 0&&R.isCamera!==!0){He("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;k!==null&&k.renderStart(x,R);let q=ee.enabled===!0&&ee.isPresenting===!0,V=L!==null&&(re===null||q)&&L.begin(I,re);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),R.parent===null&&R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(R),R=ee.getCamera()),x.isScene===!0&&x.onBeforeRender(I,x,R,re),M=K.get(x,S.length),M.init(R),M.state.textureUnits=ke.getTextureUnits(),S.push(M),at.multiplyMatrices(R.projectionMatrix,R.matrixWorldInverse),R.isArrayCamera?kt.setFromArrayCamera(R):Ge.setFromProjectionMatrix(at,Mi,R.reversedDepth),It=this.localClippingEnabled,st=Q.init(this.clippingPlanes,It),w=pe.get(x,y.length),w.init(),y.push(w),this.info.render.frame++,ee.enabled===!0&&ee.isPresenting===!0){let we=I.xr.getDepthSensingMesh();we!==null&&Gp(we,R,-1/0,I.sortObjects)}Gp(x,R,0,I.sortObjects),w.finish(),k!==null&&k.updateLights(M.state.lightsArray),I.sortObjects===!0&&w.sort(be,dt),Yt=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,Yt&&D.addToRenderList(w,x),this.info.autoReset===!0&&this.info.reset(),st===!0&&Q.beginShadows();let H=M.state.shadowsArray;if(oe.render(H,x,R),st===!0&&Q.endShadows(),(V&&L.hasRenderPass())===!1){let we=w.opaque,me=w.transmissive;if(M.setupLights(),R.isArrayCamera){let Se=R.cameras;if(me.length>0)for(let Ie=0,qe=Se.length;Ie<qe;Ie++){let ct=Se[Ie];P_(we,me,x,ct)}Yt&&D.render(x);for(let Ie=0,qe=Se.length;Ie<qe;Ie++){let ct=Se[Ie];N_(w,x,ct,ct.viewport)}}else me.length>0&&P_(we,me,x,R),Yt&&D.render(x),N_(w,x,R)}re!==null&&G===0&&(ke.updateMultisampleRenderTarget(re),ke.updateRenderTargetMipmap(re)),V&&L.end(I),x.isScene===!0&&x.onAfterRender(I,x,R),ue.resetDefaultState(),P=-1,X=null,S.pop(),S.length>0?(M=S[S.length-1],ke.setTextureUnits(M.state.textureUnits),st===!0&&Q.setGlobalState(I.clippingPlanes,M.state.camera)):M=null,y.pop(),y.length>0?w=y[y.length-1]:w=null,k!==null&&k.renderEnd()};function Gp(x,R,q,V){if(x.visible===!1)return;if(x.layers.test(R.layers)){if(x.isGroup)q=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(R);else if(x.isLight)M.pushLight(x),x.castShadow&&M.pushShadow(x);else if(x.isSprite){let we=R.isArrayCamera?kt:Ge;if(!x.frustumCulled||x.intersectsFrustum(we)){V&&Ut.setFromMatrixPosition(x.matrixWorld).applyMatrix4(at);let me=se.update(x),Se=x.material;Se.visible&&w.push(x,me,Se,q,Ut.z,null,R)}}else if(x.isMesh||x.isLine||x.isPoints){let we=R.isArrayCamera?kt:Ge;if(!x.frustumCulled||x.intersectsFrustum(we)){let me=se.update(x),Se=x.material;if(V&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ut.copy(x.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Ut.copy(me.boundingSphere.center)),Ut.applyMatrix4(x.matrixWorld).applyMatrix4(at)),Array.isArray(Se)){let Ie=me.groups;for(let qe=0,ct=Ie.length;qe<ct;qe++){let Ce=Ie[qe],lt=Se[Ce.materialIndex];lt&&lt.visible&&w.push(x,me,lt,q,Ut.z,Ce,R)}}else Se.visible&&w.push(x,me,Se,q,Ut.z,null,R)}}}let ge=x.children;for(let we=0,me=ge.length;we<me;we++)Gp(ge[we],R,q,V)}function N_(x,R,q,V){let{opaque:H,transmissive:ge,transparent:we}=x;M.setupLightsView(q),st===!0&&Q.setGlobalState(I.clippingPlanes,q),V&&he.viewport(ie.copy(V)),H.length>0&&du(H,R,q),ge.length>0&&du(ge,R,q),we.length>0&&du(we,R,q),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function P_(x,R,q,V){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[V.id]===void 0){let Ce=yt.has("EXT_color_buffer_half_float")||yt.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[V.id]=new li(1,1,{generateMipmaps:!0,type:Ce?Wi:Jn,minFilter:jr,samples:Math.max(4,ft.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ut.workingColorSpace})}let ge=M.state.transmissionRenderTarget[V.id],we=V.viewport||ie;ge.setSize(we.z*I.transmissionResolutionScale,we.w*I.transmissionResolutionScale);let me=I.getRenderTarget(),Se=I.getActiveCubeFace(),Ie=I.getActiveMipmapLevel();I.setRenderTarget(ge),I.getClearColor(J),le=I.getClearAlpha(),le<1&&I.setClearColor(16777215,.5),I.clear(),Yt&&D.render(q);let qe=I.toneMapping;I.toneMapping=lr;let ct=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),M.setupLightsView(V),st===!0&&Q.setGlobalState(I.clippingPlanes,V),du(x,q,V),ke.updateMultisampleRenderTarget(ge),ke.updateRenderTargetMipmap(ge),yt.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let lt=0,sn=R.length;lt<sn;lt++){let Ft=R[lt],{object:Ot,geometry:wn,material:De,group:Ln}=Ft;if(De.side===cr&&Ot.layers.test(V.layers)){let Et=De.side;De.side=Wn,De.needsUpdate=!0,O_(Ot,q,V,wn,De,Ln),De.side=Et,De.needsUpdate=!0,Ce=!0}}Ce===!0&&(ke.updateMultisampleRenderTarget(ge),ke.updateRenderTargetMipmap(ge))}I.setRenderTarget(me,Se,Ie),I.setClearColor(J,le),ct!==void 0&&(V.viewport=ct),I.toneMapping=qe}function du(x,R,q){let V=R.isScene===!0?R.overrideMaterial:null;for(let H=0,ge=x.length;H<ge;H++){let we=x[H],{object:me,geometry:Se,group:Ie}=we,qe=we.material;qe.allowOverride===!0&&V!==null&&(qe=V),me.layers.test(q.layers)&&O_(me,R,q,Se,qe,Ie)}}function O_(x,R,q,V,H,ge){k!==null&&H.isNodeMaterial&&k.setObject(x,H),x.onBeforeRender(I,R,q,V,H,ge),x.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),H.onBeforeRender(I,R,q,V,x,ge),H.transparent===!0&&H.side===cr&&H.forceSinglePass===!1?(H.side=Wn,H.needsUpdate=!0,I.renderBufferDirect(q,R,V,H,x,ge),H.side=Ts,H.needsUpdate=!0,I.renderBufferDirect(q,R,V,H,x,ge),H.side=cr):I.renderBufferDirect(q,R,V,H,x,ge),x.onAfterRender(I,R,q,V,H,ge)}function L_(x){let R=0;for(let q of x)q.texture!==null&&R++;return R}function ic(x,R,q){R.isScene!==!0&&(R=jt);let V=Pe.get(x),H=M.state.lights,ge=M.state.shadowsArray,we=H.state.version,me=ne.getParameters(x,H.state,ge,R,q,M.state.lightProbeGridArray),Se=ne.getProgramCacheKey(me),Ie=V.programs;V.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,V.fog=R.fog;let qe=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;V.envMap=T.get(x.envMap||V.environment,qe),V.envMapRotation=V.environment!==null&&x.envMap===null?R.environmentRotation:x.envMapRotation,Ie===void 0&&(x.addEventListener("dispose",Dt),Ie=new Map,V.programs=Ie,V.programVariants=new Map);let ct=Ie.get(Se);if(ct!==void 0){if(V.currentProgram===ct&&V.lightsStateVersion===we)return k_(x,me),ct}else me.uniforms=ne.getUniforms(x),k!==null&&x.isNodeMaterial&&k.build(x,q,me),x.onBeforeCompile(me,I),ct=ne.acquireProgram(me,Se),Ie.set(Se,ct),V.uniforms=me.uniforms;let Ce=V.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Ce.clippingPlanes=Q.uniform),k_(x,me),V.needsLights=jT(x),V.lightsStateVersion=we,V.needsLights&&(Ce.ambientLightColor.value=H.state.ambient,Ce.lightProbe.value=H.state.probe,Ce.sunLights.value=H.state.sun,Ce.sunLightShadows.value=H.state.sunShadow,Ce.directionalLights.value=H.state.directional,Ce.directionalLightShadows.value=H.state.directionalShadow,Ce.spotLights.value=H.state.spot,Ce.spotLightShadows.value=H.state.spotShadow,Ce.rectAreaLights.value=H.state.rectArea,Ce.ltc_1.value=H.state.rectAreaLTC1,Ce.ltc_2.value=H.state.rectAreaLTC2,Ce.pointLights.value=H.state.point,Ce.pointLightShadows.value=H.state.pointShadow,Ce.hemisphereLights.value=H.state.hemi,Ce.sunShadowMatrix.value=H.state.sunShadowMatrix,Ce.sunShadowCascade.value=H.state.sunShadowCascade,Ce.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ce.spotLightMatrix.value=H.state.spotLightMatrix,Ce.spotLightMap.value=H.state.spotLightMap,Ce.pointShadowMatrix.value=H.state.pointShadowMatrix),V.numLightProbeGrids=L_(M.state.lightProbeGridArray),V.currentProgram=ct,V.uniformsList=null,ct}function HT(x,R,q,V,H){let ge=Pe.get(x),we=ge.currentProgram.id+","+V+","+H,me=ge.programVariants.get(we);return me===void 0?(me=ic(x,R,q),ge.programVariants.set(we,me)):(ge.currentProgram=me,ge.uniformsList=null,ge.outputColorSpace=V,ge.toneMapping=H),me}function F_(x){if(x.uniformsList===null){let R=x.currentProgram.getUniforms();x.uniformsList=Wa.seqWithValue(R.seq,x.uniforms)}return x.uniformsList}function k_(x,R){let q=Pe.get(x);q.outputColorSpace=R.outputColorSpace,q.batching=R.batching,q.batchingColor=R.batchingColor,q.instancing=R.instancing,q.instancingColor=R.instancingColor,q.instancingMorph=R.instancingMorph,q.skinning=R.skinning,q.morphTargets=R.morphTargets,q.morphNormals=R.morphNormals,q.morphColors=R.morphColors,q.morphTargetsCount=R.morphTargetsCount,q.numClippingPlanes=R.numClippingPlanes,q.numIntersection=R.numClipIntersection,q.vertexAlphas=R.vertexAlphas,q.vertexTangents=R.vertexTangents,q.toneMapping=R.toneMapping}function zT(x,R,q,V,H){R.isScene!==!0&&(R=jt),ke.resetTextureUnits();let ge=R.fog,we=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?R.environment:null,me=re===null?I.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:ut.workingColorSpace,Se=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ie=T.get(V.envMap||we,Se),qe=V.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,ct=!!q.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ce=!!q.morphAttributes.position,lt=!!q.morphAttributes.normal,sn=!!q.morphAttributes.color,Ft=lr;V.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(Ft=I.toneMapping);let Ot=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,wn=Ot!==void 0?Ot.length:0,De=Pe.get(V),Ln=M.state.lights;if(st===!0&&(It===!0||x!==X)){let Xt=x===X&&V.id===P;Q.setState(V,x,Xt)}let Et=!1,Ls=!1;V.version===De.__version?De.needsLights&&De.lightsStateVersion!==Ln.state.version||H.isBatchedMesh&&De.batching===!1||!H.isBatchedMesh&&De.batching===!0||H.isBatchedMesh&&De.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&De.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&De.instancing===!1||!H.isInstancedMesh&&De.instancing===!0||H.isSkinnedMesh&&De.skinning===!1||!H.isSkinnedMesh&&De.skinning===!0||H.isInstancedMesh&&De.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&De.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&De.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&De.instancingMorph===!1&&H.morphTexture!==null||De.envMap!==Ie||V.fog===!0&&De.fog!==ge||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==Q.numPlanes||De.numIntersection!==Q.numIntersection)||De.vertexAlphas!==qe||De.vertexTangents!==ct||De.morphTargets!==Ce||De.morphNormals!==lt||De.morphColors!==sn||De.morphTargetsCount!==wn||De.numLightProbeGrids!==L_(M.state.lightProbeGridArray)?Et=!0:(De.outputColorSpace!==me||De.toneMapping!==Ft)&&(Ls=!0):(Et=!0,De.__version=V.version);let Cn=De.currentProgram;(Et===!0||Ls===!0)&&(Cn=Ls===!0?HT(V,R,H,me,Ft):ic(V,R,H),k&&V.isNodeMaterial&&k.onUpdateProgram(V,Cn,De));let fu=!1,es=!1,Fs=!1,vt=Cn.getUniforms(),vn=De.uniforms;if(he.useProgram(Cn.program)&&(fu=!0,es=!0,Fs=!0),V.id!==P&&(P=V.id,es=!0),fu||X!==x){he.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),vt.setValue(N,"projectionMatrix",x.projectionMatrix),vt.setValue(N,"viewMatrix",x.matrixWorldInverse);let mn=vt.map.cameraPosition;mn!==void 0&&mn.setValue(N,Gt.setFromMatrixPosition(x.matrixWorld)),ft.logarithmicDepthBuffer&&vt.setValue(N,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&vt.setValue(N,"isOrthographic",x.isOrthographicCamera===!0),X!==x&&(X=x,es=!0,Fs=!0)}if(De.needsLights&&(Ln.state.sunShadowMap.length>0&&vt.setValue(N,"sunShadowMap",Ln.state.sunShadowMap,ke),Ln.state.directionalShadowMap.length>0&&vt.setValue(N,"directionalShadowMap",Ln.state.directionalShadowMap,ke),Ln.state.spotShadowMap.length>0&&vt.setValue(N,"spotShadowMap",Ln.state.spotShadowMap,ke),Ln.state.pointShadowMap.length>0&&vt.setValue(N,"pointShadowMap",Ln.state.pointShadowMap,ke)),H.isSkinnedMesh){vt.setOptional(N,H,"bindMatrix"),vt.setOptional(N,H,"bindMatrixInverse");let Xt=H.skeleton;Xt&&(Xt.boneTexture===null&&Xt.computeBoneTexture(),vt.setValue(N,"boneTexture",Xt.boneTexture,ke))}H.isBatchedMesh&&(vt.setOptional(N,H,"batchingTexture"),vt.setValue(N,"batchingTexture",H._matricesTexture,ke),vt.setOptional(N,H,"batchingIdTexture"),vt.setValue(N,"batchingIdTexture",H._indirectTexture,ke),vt.setOptional(N,H,"batchingColorTexture"),H._colorsTexture!==null&&vt.setValue(N,"batchingColorTexture",H._colorsTexture,ke));let Di=q.morphAttributes;if((Di.position!==void 0||Di.normal!==void 0||Di.color!==void 0)&&te.update(H,q,Cn),(es||De.receiveShadow!==H.receiveShadow)&&(De.receiveShadow=H.receiveShadow,vt.setValue(N,"receiveShadow",H.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&R.environment!==null&&(vn.envMapIntensity.value=R.environmentIntensity),vn.dfgLUT!==void 0&&(vn.dfgLUT.value=kF()),es){if(vt.setValue(N,"toneMappingExposure",I.toneMappingExposure),De.needsLights&&GT(vn,Fs),ge&&V.fog===!0&&fe.refreshFogUniforms(vn,ge),fe.refreshMaterialUniforms(vn,V,de,Ae,M.state.transmissionRenderTarget[x.id]),De.needsLights&&De.numLightProbeGrids>0){let Xt=b,mn=0;for(let yr of M.state.lightProbeGridArray)yr.texture!==null&&(Xt.textures[mn]=yr.texture,Xt.min[mn]=yr.boundingBox.min,Xt.max[mn]=yr.boundingBox.max,Xt.resolution[mn]=yr.resolution,mn++);for(let yr in Xt)Xt[yr].length=mn;vn.probesSH.value=Xt.textures,vn.probesMin.value=Xt.min,vn.probesMax.value=Xt.max,vn.probesResolution.value=Xt.resolution}Wa.upload(N,F_(De),vn,ke)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Wa.upload(N,F_(De),vn,ke),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&vt.setValue(N,"center",H.center),vt.setValue(N,"modelViewMatrix",H.modelViewMatrix),vt.setValue(N,"normalMatrix",H.normalMatrix),vt.setValue(N,"modelMatrix",H.matrixWorld),V.uniformsGroups!==void 0){let Xt=V.uniformsGroups;for(let mn=0,yr=Xt.length;mn<yr;mn++){let B_=Xt[mn];Me.update(B_,Cn),Me.bind(B_,Cn)}}return Cn}function GT(x,R){x.ambientLightColor.needsUpdate=R,x.lightProbe.needsUpdate=R,x.sunLights.needsUpdate=R,x.sunLightShadows.needsUpdate=R,x.directionalLights.needsUpdate=R,x.directionalLightShadows.needsUpdate=R,x.pointLights.needsUpdate=R,x.pointLightShadows.needsUpdate=R,x.spotLights.needsUpdate=R,x.spotLightShadows.needsUpdate=R,x.rectAreaLights.needsUpdate=R,x.hemisphereLights.needsUpdate=R}function jT(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return re},this.setRenderTargetTextures=function(x,R,q){let V=Pe.get(x);V.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),Pe.get(x.texture).__webglTexture=R,Pe.get(x.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:q,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,R){let q=Pe.get(x);q.__webglFramebuffer=R,q.__useDefaultFramebuffer=R===void 0},this.setRenderTarget=function(x,R=0,q=0){re=x,$=R,G=q;let V=null,H=!1,ge=!1;if(x){let me=Pe.get(x);if(me.__useDefaultFramebuffer!==void 0){he.bindFramebuffer(N.FRAMEBUFFER,me.__webglFramebuffer),ie.copy(x.viewport),Ee.copy(x.scissor),Fe=x.scissorTest,he.viewport(ie),he.scissor(Ee),he.setScissorTest(Fe),P=-1;return}else if(me.__webglFramebuffer===void 0)ke.setupRenderTarget(x);else if(me.__hasExternalTextures)ke.rebindTextures(x,Pe.get(x.texture).__webglTexture,Pe.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let qe=x.depthTexture;if(me.__boundDepthTexture!==qe){if(qe!==null&&Pe.has(qe)&&(x.width!==qe.image.width||x.height!==qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ke.setupDepthRenderbuffer(x)}}let Se=x.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(ge=!0);let Ie=Pe.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ie[R])?V=Ie[R][q]:V=Ie[R],H=!0):x.samples>0&&ke.useMultisampledRTT(x)===!1?V=Pe.get(x).__webglMultisampledFramebuffer:Array.isArray(Ie)?V=Ie[q]:V=Ie,ie.copy(x.viewport),Ee.copy(x.scissor),Fe=x.scissorTest}else ie.copy(Re).multiplyScalar(de).floor(),Ee.copy(Ye).multiplyScalar(de).floor(),Fe=nt;if(q!==0&&(V=W),he.bindFramebuffer(N.FRAMEBUFFER,V)&&he.drawBuffers(x,V),he.viewport(ie),he.scissor(Ee),he.setScissorTest(Fe),H){let me=Pe.get(x.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+R,me.__webglTexture,q)}else if(ge){let me=R;for(let Se=0;Se<x.textures.length;Se++){let Ie=Pe.get(x.textures[Se]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Se,Ie.__webglTexture,q,me)}}else if(x!==null&&q!==0){let me=Pe.get(x.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,me.__webglTexture,q)}P=-1};function U_(x){let R=Pe.get(x);return(R.__readFormat!==x.format||R.__readType!==x.type)&&(R.__readFormat=x.format,R.__readType=x.type,R.__formatReadable=ft.textureFormatReadable(x.format),R.__typeReadable=ft.textureTypeReadable(x.type)),R}this.readRenderTargetPixels=function(x,R,q,V,H,ge,we,me=0){if(!(x&&x.isWebGLRenderTarget)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Pe.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&we!==void 0&&(Se=Se[we],Array.isArray(Se)&&(Se=Se[0])),Se){he.bindFramebuffer(N.FRAMEBUFFER,Se);try{let Ie=x.textures[me],qe=Ie.format,ct=Ie.type;x.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+me);let Ce=U_(Ie);if(Ce.__formatReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ce.__typeReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}R>=0&&R<=x.width-V&&q>=0&&q<=x.height-H&&N.readPixels(R,q,V,H,ae.convert(qe),ae.convert(ct),ge)}finally{let Ie=re!==null?Pe.get(re).__webglFramebuffer:null;he.bindFramebuffer(N.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(x,R,q,V,H,ge,we,me=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=Pe.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&we!==void 0&&(Se=Se[we],Array.isArray(Se)&&(Se=Se[0])),Se)if(R>=0&&R<=x.width-V&&q>=0&&q<=x.height-H){he.bindFramebuffer(N.FRAMEBUFFER,Se);let Ie=x.textures[me],qe=Ie.format,ct=Ie.type;x.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+me);let Ce=U_(Ie);if(Ce.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ce.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let lt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,lt),N.bufferData(N.PIXEL_PACK_BUFFER,ge.byteLength,N.STREAM_READ),N.readPixels(R,q,V,H,ae.convert(qe),ae.convert(ct),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let sn=re!==null?Pe.get(re).__webglFramebuffer:null;he.bindFramebuffer(N.FRAMEBUFFER,sn);let Ft=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await uM(N,Ft,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,lt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ge),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(lt),N.deleteSync(Ft),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,R=null,q=0){let V=Math.pow(2,-q),H=Math.floor(x.image.width*V),ge=Math.floor(x.image.height*V),we=R!==null?R.x:0,me=R!==null?R.y:0;ke.setTexture2D(x,0),N.copyTexSubImage2D(N.TEXTURE_2D,q,0,0,we,me,H,ge),he.unbindTexture()},this.copyTextureToTexture=function(x,R,q=null,V=null,H=0,ge=0){let we,me,Se,Ie,qe,ct,Ce,lt,sn,Ft=x.isCompressedTexture?x.mipmaps[ge]:x.image;if(q!==null)we=q.max.x-q.min.x,me=q.max.y-q.min.y,Se=q.isBox3?q.max.z-q.min.z:1,Ie=q.min.x,qe=q.min.y,ct=q.isBox3?q.min.z:0;else{let vt=Math.pow(2,-H);we=Math.floor(Ft.width*vt),me=Math.floor(Ft.height*vt),x.isDataArrayTexture?Se=Ft.depth:x.isData3DTexture?Se=Math.floor(Ft.depth*vt):Se=1,Ie=0,qe=0,ct=0}V!==null?(Ce=V.x,lt=V.y,sn=V.z):(Ce=0,lt=0,sn=0);let Ot=ae.convert(R.format),wn=ae.convert(R.type),De;R.isData3DTexture?(ke.setTexture3D(R,0),De=N.TEXTURE_3D):R.isDataArrayTexture||R.isCompressedArrayTexture?(ke.setTexture2DArray(R,0),De=N.TEXTURE_2D_ARRAY):(ke.setTexture2D(R,0),De=N.TEXTURE_2D),he.activeTexture(N.TEXTURE0),he.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,R.flipY),he.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),he.pixelStorei(N.UNPACK_ALIGNMENT,R.unpackAlignment);let Ln=he.getParameter(N.UNPACK_ROW_LENGTH),Et=he.getParameter(N.UNPACK_IMAGE_HEIGHT),Ls=he.getParameter(N.UNPACK_SKIP_PIXELS),Cn=he.getParameter(N.UNPACK_SKIP_ROWS),fu=he.getParameter(N.UNPACK_SKIP_IMAGES);he.pixelStorei(N.UNPACK_ROW_LENGTH,Ft.width),he.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ft.height),he.pixelStorei(N.UNPACK_SKIP_PIXELS,Ie),he.pixelStorei(N.UNPACK_SKIP_ROWS,qe),he.pixelStorei(N.UNPACK_SKIP_IMAGES,ct);let es=x.isDataArrayTexture||x.isData3DTexture,Fs=R.isDataArrayTexture||R.isData3DTexture;if(x.isDepthTexture){let vt=Pe.get(x),vn=Pe.get(R),Di=Pe.get(vt.__renderTarget),Xt=Pe.get(vn.__renderTarget);he.bindFramebuffer(N.READ_FRAMEBUFFER,Di.__webglFramebuffer),he.bindFramebuffer(N.DRAW_FRAMEBUFFER,Xt.__webglFramebuffer);for(let mn=0;mn<Se;mn++)es&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pe.get(x).__webglTexture,H,ct+mn),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pe.get(R).__webglTexture,ge,sn+mn)),N.blitFramebuffer(Ie,qe,Ie+we,qe+me,Ce,lt,Ce+we,lt+me,N.DEPTH_BUFFER_BIT,N.NEAREST);he.bindFramebuffer(N.READ_FRAMEBUFFER,null),he.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(H!==0||x.isRenderTargetTexture||Pe.has(x)){let vt=Pe.get(x),vn=Pe.get(R);he.bindFramebuffer(N.READ_FRAMEBUFFER,A),he.bindFramebuffer(N.DRAW_FRAMEBUFFER,z);for(let Di=0;Di<Se;Di++)es?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,vt.__webglTexture,H,ct+Di):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,vt.__webglTexture,H),Fs?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,vn.__webglTexture,ge,sn+Di):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,vn.__webglTexture,ge),H!==0?N.blitFramebuffer(Ie,qe,Ie+we,qe+me,Ce,lt,Ce+we,lt+me,N.COLOR_BUFFER_BIT,N.NEAREST):Fs?N.copyTexSubImage3D(De,ge,Ce,lt,sn+Di,Ie,qe,we,me):N.copyTexSubImage2D(De,ge,Ce,lt,Ie,qe,we,me);he.bindFramebuffer(N.READ_FRAMEBUFFER,null),he.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Fs?x.isDataTexture||x.isData3DTexture?N.texSubImage3D(De,ge,Ce,lt,sn,we,me,Se,Ot,wn,Ft.data):R.isCompressedArrayTexture?N.compressedTexSubImage3D(De,ge,Ce,lt,sn,we,me,Se,Ot,Ft.data):N.texSubImage3D(De,ge,Ce,lt,sn,we,me,Se,Ot,wn,Ft):x.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ge,Ce,lt,we,me,Ot,wn,Ft.data):x.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ge,Ce,lt,Ft.width,Ft.height,Ot,Ft.data):N.texSubImage2D(N.TEXTURE_2D,ge,Ce,lt,we,me,Ot,wn,Ft);he.pixelStorei(N.UNPACK_ROW_LENGTH,Ln),he.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Et),he.pixelStorei(N.UNPACK_SKIP_PIXELS,Ls),he.pixelStorei(N.UNPACK_SKIP_ROWS,Cn),he.pixelStorei(N.UNPACK_SKIP_IMAGES,fu),ge===0&&R.generateMipmaps===!0&&R.mipmapsAutoUpdate===!0&&N.generateMipmap(De),he.unbindTexture()},this.initRenderTarget=function(x){Pe.get(x).__webglFramebuffer===void 0&&ke.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?ke.setTextureCube(x,0):x.isData3DTexture?ke.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?ke.setTexture2DArray(x,0):ke.setTexture2D(x,0),he.unbindTexture()},this.resetState=function(){$=0,G=0,re=null,he.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=ut._getUnpackColorSpace()}};var YM={type:"change"},l_={type:"start"},KM={type:"end"},pp=new Ua,ZM=new ai,BF=Math.cos(70*qv.DEG2RAD),fn=new F,Qn=2*Math.PI,Mt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},c_=1e-6,mp=class extends Hl{constructor(e,t=null){super(e,t),this.state=Mt.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:bs.ROTATE,MIDDLE:bs.DOLLY,RIGHT:bs.PAN},this.touches={ONE:Ms.ROTATE,TWO:Ms.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new ci,this._lastTargetPosition=new F,this._quat=new ci().setFromUnitVectors(e.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Va,this._sphericalDelta=new Va,this._scale=1,this._panOffset=new F,this._rotateStart=new Le,this._rotateEnd=new Le,this._rotateDelta=new Le,this._panStart=new Le,this._panEnd=new Le,this._panDelta=new Le,this._dollyStart=new Le,this._dollyEnd=new Le,this._dollyDelta=new Le,this._dollyDirection=new F,this._mouse=new Le,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=HF.bind(this),this._onPointerDown=VF.bind(this),this._onPointerUp=zF.bind(this),this._onContextMenu=YF.bind(this),this._onMouseWheel=WF.bind(this),this._onKeyDown=$F.bind(this),this._onTouchStart=qF.bind(this),this._onTouchMove=XF.bind(this),this._onMouseDown=GF.bind(this),this._onMouseMove=jF.bind(this),this._interceptControlDown=ZF.bind(this),this._interceptControlUp=KF.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Mt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(YM),this.update(),this.state=Mt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;fn.copy(t).sub(this.target),fn.applyQuaternion(this._quat),this._spherical.setFromVector3(fn),this.autoRotate&&this.state===Mt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=Qn:i>Math.PI&&(i-=Qn),r<-Math.PI?r+=Qn:r>Math.PI&&(r-=Qn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(fn.setFromSpherical(this._spherical),fn.applyQuaternion(this._quatInverse),t.copy(this.target).add(fn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=fn.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){let a=new F(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;let l=new F(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=fn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(pp.origin.copy(this.object.position),pp.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(pp.direction))<BF?this.object.lookAt(this.target):(ZM.setFromNormalAndCoplanarPoint(this.object.up,this.target),pp.intersectPlane(ZM,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>c_||8*(1-this._lastQuaternion.dot(this.object.quaternion))>c_||this._lastTargetPosition.distanceToSquared(this.target)>c_?(this.dispatchEvent(YM),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qn/60*this.autoRotateSpeed*e:Qn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){fn.setFromMatrixColumn(t,0),fn.multiplyScalar(-e),this._panOffset.add(fn)}_panUp(e,t){this.screenSpacePanning===!0?fn.setFromMatrixColumn(t,1):(fn.setFromMatrixColumn(t,0),fn.crossVectors(this.object.up,fn)),fn.multiplyScalar(e),this._panOffset.add(fn)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;fn.copy(r).sub(this.target);let s=fn.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Qn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Qn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Le,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function VF(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function HF(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function zF(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(KM),this.state=Mt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function GF(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case bs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Mt.DOLLY;break;case bs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Mt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Mt.ROTATE}break;case bs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Mt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Mt.PAN}break;default:this.state=Mt.NONE}this.state!==Mt.NONE&&this.dispatchEvent(l_)}function jF(n){switch(this.state){case Mt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Mt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Mt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function WF(n){this.enabled===!1||this.enableZoom===!1||this.state!==Mt.NONE||(n.preventDefault(),this.dispatchEvent(l_),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(KM))}function $F(n){this.enabled!==!1&&this._handleKeyDown(n)}function qF(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ms.ROTATE:if(this.enableRotate===!1){this.state=Mt.NONE;break}this._handleTouchStartRotate(n),this.state=Mt.TOUCH_ROTATE;break;case Ms.PAN:if(this.enablePan===!1){this.state=Mt.NONE;break}this._handleTouchStartPan(n),this.state=Mt.TOUCH_PAN;break;default:this.state=Mt.NONE}break;case 2:switch(this.touches.TWO){case Ms.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Mt.TOUCH_DOLLY_PAN;break;case Ms.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Mt.TOUCH_DOLLY_ROTATE;break;default:this.state=Mt.NONE}break;default:this.state=Mt.NONE}this.state!==Mt.NONE&&this.dispatchEvent(l_)}function XF(n){switch(this._trackPointer(n),this.state){case Mt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Mt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Mt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Mt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Mt.NONE}}function YF(n){this.enabled!==!1&&n.preventDefault()}function ZF(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function KF(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var tt={background:527378,floor:988962,grid:1713718,shelf:3359061,box:9592888,restricted:15680580,crowded:7877903,frontier:3003583,candidate:16096779,route:15381256,current:16777215,start:1096065,goal:16096779},qa=class n{ngZone=_e(_n);container=null;scene;camera;renderer;controls;animationFrameId=null;resizeObserver=null;scenario=null;robotMesh=null;robotBeaconMesh=null;trolleyMesh=null;overlays=[];coordinateLabels=[];cellMeshes=new Map;init(e){this.container=e,this.scene=new Sl,this.scene.background=new Ke(tt.background),this.scene.fog=new El(tt.background,16,36);let t=e.clientWidth||800,i=e.clientHeight||600;this.camera=new Pn(36,t/i,.1,120),this.camera.position.set(11,13,14),this.renderer=new dp({antialias:!0,alpha:!1}),this.renderer.setSize(t,i),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=xh,this.renderer.outputColorSpace=zn,e.appendChild(this.renderer.domElement),this.controls=new mp(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.minDistance=8,this.controls.maxDistance=32,this.controls.maxPolarAngle=Math.PI/2.05,this.controls.target.set(0,0,0);let r=new Ll(11852770,330770,1.8);this.scene.add(r);let s=new Vl(15268863,2.4);s.position.set(-8,16,9),s.castShadow=!0,s.shadow.mapSize.set(2048,2048),s.shadow.camera.near=.5,s.shadow.camera.far=40,s.shadow.camera.left=-12,s.shadow.camera.right=12,s.shadow.camera.top=12,s.shadow.camera.bottom=-12,this.scene.add(s);let o=new Ul(tt.frontier,20,24,2);o.position.set(4,5,-3),this.scene.add(o),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.startRenderLoop()}startRenderLoop(){this.ngZone.runOutsideAngular(()=>{let e=t=>{this.controls.update(),this.robotMesh&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(this.robotMesh.position.y=.02+Math.sin(t*.0035)*.025),this.renderer.render(this.scene,this.camera),this.animationFrameId=requestAnimationFrame(e)};this.animationFrameId=requestAnimationFrame(e)})}buildWarehouse(e,t=!1){this.clearGeneratedScene(),this.scenario=e;let{rows:i,cols:r,cells:s,start:o,goal:a}=e,c=new Qt(new xo(r+2.8,i+2.8),this.material(659479,{roughness:.95}));c.rotation.x=-Math.PI/2,c.position.y=-.07,c.receiveShadow=!0,this.scene.add(c),s.forEach(({position:l,terrain:u})=>{let d=u==="crowded"?2365970:tt.floor,h=new Qt(new or(.92,.06,.92),this.material(d,{roughness:.7}));h.position.copy(this.worldPosition(l,-.015)),h.receiveShadow=!0,this.scene.add(h),this.cellMeshes.set(l.join(","),h),u==="shelf"&&this.buildShelf(l),u==="restricted"&&this.buildRestricted(l),u==="crowded"&&this.buildCrowded(l);let f=this.textSprite(`${l[0]},${l[1]}`);f.position.copy(this.worldPosition(l,.12)),f.rotation.x=-Math.PI/2,f.visible=t,this.scene.add(f),this.coordinateLabels.push(f)}),this.addMarker(o,tt.start,"START"),this.addMarker(a,tt.goal,"GOAL"),this.robotMesh=this.buildRobot(o),this.trolleyMesh=this.buildTrolley(e.trolley),this.resetCamera()}clearGeneratedScene(){if(this.scene){for(let e of[...this.scene.children])e instanceof Ss||(this.scene.remove(e),e.traverse(t=>{let i=t;i.geometry?.dispose();let r=i.material;Array.isArray(r)?r.forEach(s=>s.dispose()):r?.dispose()}));this.overlays=[],this.coordinateLabels=[],this.cellMeshes.clear(),this.robotMesh=null,this.robotBeaconMesh=null,this.trolleyMesh=null}}material(e,t={}){return new Pl(mt({color:e,roughness:.65,metalness:.15},t))}box(e,t,i,r,s=t/2){let o=new Qt(new or(e,t,i),this.material(r));return o.position.y=s,o.castShadow=!0,o.receiveShadow=!0,o}worldPosition(e,t=0){if(!this.scenario)return new F;let{rows:i,cols:r}=this.scenario;return new F(e[1]-(r-1)/2,t,e[0]-(i-1)/2)}addAt(e,t){let i=this.worldPosition(t);return e.position.x+=i.x,e.position.z+=i.z,this.scene.add(e),e}buildShelf(e){let t=new Kn;return[-.34,.34].forEach(i=>[-.34,.34].forEach(r=>{let s=this.box(.07,1.25,.07,tt.shelf,.625);s.position.x=i,s.position.z=r,t.add(s)})),[.25,.68,1.12].forEach((i,r)=>{let s=this.box(.84,.06,.84,tt.shelf,i);if(t.add(s),r<2){let o=this.box(.28,.22,.32,r?8146724:tt.box,i+.14);o.position.x=r?-.18:.17,t.add(o)}}),this.addAt(t,e)}buildRestricted(e){let t=new Kn;[-.32,.32].forEach(a=>[-.32,.32].forEach(c=>{let l=this.box(.06,.8,.06,tt.restricted,.4);l.position.x=a,l.position.z=c,t.add(l)}));let i=this.box(.7,.05,.05,tt.restricted,.7);i.position.z=-.32,t.add(i);let r=this.box(.7,.05,.05,tt.restricted,.7);r.position.z=.32,t.add(r);let s=this.box(.05,.05,.7,tt.restricted,.7);s.position.x=-.32,t.add(s);let o=this.box(.05,.05,.7,tt.restricted,.7);return o.position.x=.32,t.add(o),this.addAt(t,e)}buildCrowded(e){let t=new Kn,i=this.box(.78,.025,.78,5517846,.035);return t.add(i),[-.29,.29].forEach((r,s)=>{let o=this.box(.18,.16+s*.04,.18,tt.crowded,.12+s*.02);o.position.x=r,o.position.z=s?.27:-.27,o.rotation.y=s?-.18:.16,t.add(o)}),this.addAt(t,e)}buildRobot(e){let t=new Kn,i=new Qt(new Gr(.28,.32,.22,16),this.material(tt.frontier,{metalness:.5}));i.position.y=.24,i.castShadow=!0,t.add(i);let r=this.box(.36,.25,.34,14215917,.48);t.add(r);let s=this.box(.22,.07,.02,465696,.5);s.position.z=-.18,t.add(s);let o=new Qt(new Gr(.015,.015,.22),this.material(tt.frontier));return o.position.y=.72,t.add(o),this.robotBeaconMesh=new Qt(new Rl(.048,12,10),this.material(tt.candidate,{emissive:tt.candidate,emissiveIntensity:2.2})),this.robotBeaconMesh.position.y=.85,t.add(this.robotBeaconMesh),t.position.copy(this.worldPosition(e)),t.position.y=.02,this.scene.add(t),t}buildTrolley(e){let t=new Kn,i=this.box(.58,.13,.42,14251782,.28);t.add(i),[-.22,.22].forEach(o=>[-.17,.17].forEach(a=>{let c=new Qt(new Gr(.08,.08,.05,12),this.material(1252644));c.rotation.z=Math.PI/2,c.position.set(o,.11,a),t.add(c)}));let r=this.box(.05,.65,.05,9741240,.55);r.position.x=.26,t.add(r);let s=this.box(.32,.04,.04,9741240,.86);return s.position.x=.12,t.add(s),t.position.copy(this.worldPosition(e)),t.visible=!1,this.scene.add(t),t}textSprite(e){let t=document.createElement("canvas");t.width=128,t.height=64;let i=t.getContext("2d");i&&(i.fillStyle="rgba(10, 16, 24, 0.85)",i.fillRect(8,10,112,44),i.font="600 20px Consolas, monospace",i.textAlign="center",i.fillStyle="#94a3b8",i.fillText(e,64,38));let r=new wl(new ka({map:new Dl(t),transparent:!0,depthTest:!1}));return r.scale.set(.8,.4,1),r.renderOrder=20,r}addMarker(e,t,i){let r=new Kn,s=new Qt(new Nl(.32,.04,10,28),this.material(t,{emissive:t,emissiveIntensity:.8}));s.rotation.x=Math.PI/2,s.position.y=.08,r.add(s);let o=this.textSprite(i);o.position.y=.72,o.scale.set(.6,.3,1),r.add(o),this.addAt(r,e)}overlayCell(e,t,i=.55,r=.08){let s=new Qt(new or(.82,.035,.82),this.material(t,{transparent:!0,opacity:i,emissive:t,emissiveIntensity:.7}));return s.position.copy(this.worldPosition(e,r)),this.scene.add(s),this.overlays.push(s),s}clearOverlays(){this.overlays.forEach(e=>this.scene.remove(e)),this.overlays=[]}drawPath(e,t=tt.route){!e||e.length===0||e.forEach((i,r)=>{if(this.overlayCell(i,t,.72,.105),!e[r+1])return;let s=this.worldPosition(i,.16),o=this.worldPosition(e[r+1],.16),a=new F().subVectors(o,s),c=a.length(),l=new Qt(new Gr(.04,.04,c,10),this.material(t,{emissive:t,emissiveIntensity:1.3}));l.position.copy(s).add(o).multiplyScalar(.5),l.quaternion.setFromUnitVectors(new F(0,1,0),a.normalize()),this.scene.add(l),this.overlays.push(l)})}renderTraceEvent(e,t){this.clearOverlays(),t&&e.frontier.forEach(i=>this.overlayCell(i,tt.frontier,.28)),e.considered.forEach(i=>this.overlayCell(i,tt.candidate,.72,.1)),this.overlayCell(e.current,tt.current,.96,.13)}setRobotPosition(e){this.robotMesh&&(this.robotMesh.position.copy(this.worldPosition(e,.02)),this.robotMesh.rotation.y=0)}setTrolley(e,t=!0){this.trolleyMesh&&(this.trolleyMesh.position.copy(this.worldPosition(e)),this.trolleyMesh.visible=t)}showObstacleAlert(e,t){this.trolleyMesh&&(this.trolleyMesh.position.copy(this.worldPosition(e)),this.trolleyMesh.visible=!0),this.overlayCell(e,tt.restricted,.88,.1);let i=this.worldPosition(t,.35),r=this.worldPosition(e,.35),s=new F().subVectors(r,i),o=s.length(),a=new Qt(new Gr(.03,.03,o,8),this.material(tt.restricted,{emissive:tt.restricted,emissiveIntensity:2.2}));a.position.copy(i).add(r).multiplyScalar(.5),a.quaternion.setFromUnitVectors(new F(0,1,0),s.normalize()),this.scene.add(a),this.overlays.push(a),this.robotBeaconMesh&&(this.robotBeaconMesh.material.color.setHex(tt.restricted),this.robotBeaconMesh.material.emissive.setHex(tt.restricted),this.robotBeaconMesh.material.emissiveIntensity=3.5)}resetRobotBeacon(){this.robotBeaconMesh&&(this.robotBeaconMesh.material.color.setHex(tt.candidate),this.robotBeaconMesh.material.emissive.setHex(tt.candidate),this.robotBeaconMesh.material.emissiveIntensity=2.2)}celebrateGoal(){this.robotBeaconMesh&&(this.robotBeaconMesh.material.color.setHex(tt.start),this.robotBeaconMesh.material.emissive.setHex(tt.start),this.robotBeaconMesh.material.emissiveIntensity=3.5)}async driveRobot(e,t,i){if(!(!this.robotMesh||!e||e.length===0))for(let r=0;r<e.length;r++){let s=e[r],o=this.worldPosition(s,.02);if(r<e.length-1){let a=e[r+1],c=a[0]-s[0],l=a[1]-s[1],u=Math.atan2(l,c);this.robotMesh.rotation.y=u}this.robotMesh.position.copy(o),this.overlayCell(s,tt.route,.45,.08),i&&i(s,r),await new Promise(a=>setTimeout(a,t))}}toggleLabels(e){this.coordinateLabels.forEach(t=>t.visible=e)}resetCamera(){!this.camera||!this.controls||(this.camera.position.set(10.5,12.5,13.5),this.controls.target.set(0,0,0),this.controls.update())}topCamera(){!this.camera||!this.controls||(this.camera.position.set(0,22,.01),this.controls.target.set(0,0,0),this.controls.update())}resize(){if(!this.container||!this.renderer||!this.camera)return;let e=this.container.clientWidth,t=this.container.clientHeight;this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}destroy(){this.animationFrameId!==null&&cancelAnimationFrame(this.animationFrameId),this.resizeObserver&&this.resizeObserver.disconnect(),this.renderer?.dispose()}static \u0275fac=function(t){return new(t||n)};static \u0275prov=ht({token:n,factory:n.\u0275fac,providedIn:"root"})};var wi=typeof window<"u",gp=wi?window:null,Ds=wi?document:null,Pt={OBJECT:0,ATTRIBUTE:1,CSS:2,TRANSFORM:3,CSS_VAR:4},Je={NUMBER:0,UNIT:1,COLOR:2,COMPLEX:3},Mn={NONE:0,AUTO:1,FORCE:2},cn={replace:0,none:1,blend:2},u_=Symbol(),fr=Symbol(),yp=Symbol(),As=Symbol(),JM=Symbol(),pt=1e-11,eu=1e12,hr=1e3,tu=240,pr="",QM="var(",nu=[],vp=(()=>{let n=new Map;return n.set("x","translateX"),n.set("y","translateY"),n.set("z","translateZ"),n})(),Xa=["perspective","translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY"],eT=Xa.reduce((n,e)=>Zt(mt({},n),{[e]:e+"("}),{}),$n=()=>{},tT=n=>n,nT=/\)\s*[-.\d]/,iT=/(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,rT=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,sT=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,oT=/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,aT=/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,d_=/[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,cT=/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,lT=/([a-z])([A-Z])/g;var uT=/var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)/;var Ya={id:null,keyframes:null,playbackEase:null,playbackRate:1,frameRate:tu,loop:0,reversed:!1,alternate:!1,autoplay:!0,persist:!1,duration:hr,delay:0,loopDelay:0,ease:"out(2)",composition:cn.replace,modifier:tT,onBegin:$n,onBeforeUpdate:$n,onUpdate:$n,onLoop:$n,onPause:$n,onComplete:$n,onRender:$n},iu={current:null,root:Ds},qt={defaults:Ya,precision:4,timeScale:1,tickThreshold:200,editor:null},f_={version:"4.5.0",engine:null};wi&&(gp.AnimeJS||(gp.AnimeJS=[]),gp.AnimeJS.push(f_));var h_=n=>n.replace(lT,"$1-$2").toLowerCase(),qi=(n,e)=>n.indexOf(e)===0,qr=Date.now,Is=Array.isArray,_p=n=>n&&n.constructor===Object,fT=n=>typeof n=="number"&&!isNaN(n),Xr=n=>typeof n=="string",Yr=n=>typeof n=="function",At=n=>typeof n>"u",Rs=n=>At(n)||n===null,xp=n=>wi&&n instanceof SVGElement,p_=n=>iT.test(n),m_=n=>qi(n,"rgb"),g_=n=>qi(n,"hsl"),hT=n=>p_(n)||(m_(n)||g_(n))&&(n[n.length-1]===")"||!nT.test(n)),ru=n=>!qt.defaults.hasOwnProperty(n),JF=["opacity","rotate","overflow","color"],pT=(n,e)=>{if(JF.includes(e))return!1;if(n.getAttribute(e)||e in n){if(e==="scale"){let t=n.parentNode;return t&&t.tagName==="filter"}return!0}};var wo=Math.pow,mT=Math.sqrt,gT=Math.sin,yT=Math.cos;var vT=Math.floor,_T=Math.asin;var su=Math.PI,dT=Math.round,ei=(n,e,t)=>n<e?e:n>t?t:n,Tt=(n,e)=>{if(e<0)return n;if(!e)return dT(n);let t=10**e;return dT(n*t)/t};var Za=(n,e,t)=>t===1?e:t===0?n:n+(e-n)*t,ou=n=>n===1/0?eu:n===-1/0?-eu:n,Co=n=>n<=pt?pt:ou(Tt(n,11)),ln=n=>Is(n)?[...n]:n,xT=(n,e)=>{let t=mt({},n);for(let i in e){let r=n[i];t[i]=At(r)?e[i]:r}return t},zt=(n,e,t,i="_prev",r="_next")=>{let s=n._head,o=r;for(t&&(s=n._tail,o=i);s;){let a=s[o];e(s),s=a}},Do=(n,e,t="_prev",i="_next")=>{let r=e[t],s=e[i];r?r[i]=s:n._head=s,s?s[t]=r:n._tail=r,e[t]=null,e[i]=null},Zr=(n,e,t,i="_prev",r="_next")=>{let s=n._tail;for(;s&&t&&t(s,e);)s=s[i];let o=s?s[r]:n._head;s?s[r]=e:n._head=e,o?o[i]=e:n._tail=e,e[i]=s,e[r]=o};var ET=(n,e,t)=>{let i=n.style.transform;if(i){let r=n[As],s=0,o=i.length,a;for(;s<o;){for(;s<o&&i.charCodeAt(s)===32;)s++;if(s>=o)break;let l=s;for(;s<o&&i.charCodeAt(s)!==40;)s++;if(s>=o)break;let u=i.substring(l,s),d=1,h=s+1,f=-1,g=-1;for(s++;s<o&&d>0;){let p=i.charCodeAt(s);p===40?d++:p===41?d--:p===44&&d===1&&(f===-1?f=s:g===-1&&(g=s)),s++}let _=s-1;u==="translate"||u==="translate3d"?(f===-1?r.translateX=i.substring(h,_).trim():(r.translateX=i.substring(h,f).trim(),g===-1?r.translateY=i.substring(f+1,_).trim():(r.translateY=i.substring(f+1,g).trim(),r.translateZ=i.substring(g+1,_).trim())),a=i.substring(h,_)):u==="scale"||u==="scale3d"?f===-1?r.scale=i.substring(h,_).trim():(r.scaleX=i.substring(h,f).trim(),g===-1?r.scaleY=i.substring(f+1,_).trim():(r.scaleY=i.substring(f+1,g).trim(),r.scaleZ=i.substring(g+1,_).trim())):r[u]=i.substring(h,_)}if(e==="translate3d"&&a)return t&&(t[e]=a),a;let c=r[e];if(!At(c))return t&&(t[e]=c),c}return e==="translate3d"?"0px, 0px, 0px":e==="rotate3d"?"0, 0, 0, 0deg":qi(e,"scale")?"1":qi(e,"rotate")||qi(e,"skew")?"0deg":"0px"},Ep=n=>{let e=pr;for(let t=0,i=Xa.length;t<i;t++){let r=Xa[t],s=n[r];if(s!==void 0){if(r==="translateX"){let o=n.translateY;if(o!==void 0){let a=n.translateZ;a!==void 0?(e+=`translate3d(${s},${o},${a}) `,t+=2):(e+=`translate(${s},${o}) `,t+=1);continue}}if(r==="scaleX"&&n.scale===void 0){let o=n.scaleY;if(o!==void 0){let a=n.scaleZ;a!==void 0?(e+=`scale3d(${s},${o},${a}) `,t+=2):(e+=`scale(${s},${o}) `,t+=1);continue}}e+=`${eT[r]}${s}) `}r==="rotateZ"&&n.rotate3d!==void 0&&(e+=`rotate3d(${n.rotate3d}) `)}return n.matrix!==void 0&&(e+=`matrix(${n.matrix}) `),n.matrix3d!==void 0&&(e+=`matrix3d(${n.matrix3d}) `),e};var y_=[];function Sp(n,e){if(!n)return null;let t=y_.length;e:for(let i=0;i<t;i++){let r=y_[i];if(r.detect&&!r.detect(n))continue;let s=r.targetAdapters;for(let o=0,a=s.length;o<a;o++){let c=s[o];if(c.detect(n)){let l=c.props[e];if(l&&(!l.gate||l.gate(n)))return l;break e}}}for(let i=0;i<t;i++){let r=y_[i];if(r.detect&&!r.detect(n))continue;let s=r.propertyResolvers;for(let o=0,a=s.length;o<a;o++){let c=s[o](n,e);if(c)return c}}return null}var QF=n=>{let e=rT.exec(n)||sT.exec(n),t=At(e[4])?1:+e[4];return[+e[1],+e[2],+e[3],t]},e2=n=>{let e=n.length,t=e===4||e===5;return[+("0x"+n[1]+n[t?1:2]),+("0x"+n[t?2:3]+n[t?2:4]),+("0x"+n[t?3:5]+n[t?3:6]),e===5||e===9?+(+("0x"+n[t?4:7]+n[t?4:8])/255).toFixed(3):1]},v_=(n,e,t)=>(t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*(2/3-t)*6:n),t2=n=>{let e=oT.exec(n)||aT.exec(n),t=+e[1]/360,i=+e[2]/100,r=+e[3]/100,s=At(e[4])?1:+e[4],o,a,c;if(i===0)o=a=c=r;else{let l=r<.5?r*(1+i):r+i-r*i,u=2*r-l;o=Tt(v_(u,l,t+1/3)*255,0),a=Tt(v_(u,l,t)*255,0),c=Tt(v_(u,l,t-1/3)*255,0)}return[o,a,c,s]},ST=n=>m_(n)?QF(n):p_(n)?e2(n):g_(n)?t2(n):[0,0,0,1];var hn=(n,e)=>At(n)?e:n,bT=(n,e)=>{let t=n.match(uT),i=e[fr]?e:document.documentElement,r=getComputedStyle(i)?.getPropertyValue(t[1]);return(!r||r.trim()===pr)&&t[2]&&(r=t[2].trim()),r||0},mr=(n,e,t,i,r,s)=>{if(Yr(n)){if(!r){let a=n(e,t,i,s);return isNaN(+a)?a||0:+a}let o=()=>{let a=n(e,t,i,s);return isNaN(+a)?a||0:+a};return r.func=o,o()}if(Xr(n)&&qi(n,QM)){if(!r)return bT(n,e);let o=()=>bT(n,e);return r.func=o,o()}return n},__=(n,e)=>n[fr]?n[yp]&&pT(n,e)?Pt.ATTRIBUTE:Xa.includes(e)||vp.get(e)?Pt.TRANSFORM:qi(e,"--")?Pt.CSS_VAR:e in n.style?Pt.CSS:e in n?Pt.OBJECT:Pt.ATTRIBUTE:Pt.OBJECT,MT=(n,e,t)=>{let i=n.style[e];i&&t&&(t[e]=i);let r=i||getComputedStyle(n[JM]||n).getPropertyValue(e);return r==="auto"?"0":r},Ka=(n,e,t,i)=>{let r=At(t)?__(n,e):t,s=Sp(n,e);if(s){let o=s.get(n);return o&&i&&(i[e]=o),o??0}if(r===Pt.OBJECT){let o=n[e];return o&&i&&(i[e]=o),o||0}if(r===Pt.ATTRIBUTE){let o=n.getAttribute(e);return o&&i&&(i[e]=o),o}return r===Pt.TRANSFORM?ET(n,e,i):r===Pt.CSS_VAR?MT(n,e,i).trimStart():MT(n,e,i)},bp=(n,e,t)=>t==="-"?n-e:t==="+"?n+e:n*e,Mp=()=>({t:Je.NUMBER,n:0,u:null,o:null,d:null,s:null}),ti=(n,e)=>{if(e.t=Je.NUMBER,e.n=0,e.u=null,e.o=null,e.d=null,e.s=null,!n)return e;let t=+n;if(!isNaN(t))return e.n=t,e;let i=n;i[1]==="="&&(e.o=i[0],i=i.slice(2));let r=i.includes(" ")?!1:cT.exec(i);if(r)return e.t=Je.UNIT,e.n=+r[1],e.u=r[2],e;if(e.o)return e.n=+i,e;if(hT(i))return e.t=Je.COLOR,e.d=ST(i),e;{let s=i.match(d_);return e.t=Je.COMPLEX,e.d=s?s.map(Number):[],e.s=i.split(d_)||[],e}},x_=(n,e)=>(e.t=n._valueType,e.n=n._toNumber,e.u=n._unit,e.o=null,e.d=ln(n._toNumbers),e.s=ln(n._strings),e),di=Mp(),Tp=(n,e,t)=>{let i=n._modifier,r=n._fromNumbers,s=n._toNumbers,o=n._strings,a=o[0];for(let c=0,l=s.length;c<l;c++){let u=i(Tt(Za(r[c],s[c],e),t)),d=o[c+1];a+=`${d?u+d:u}`,n._numbers[c]=u}return a};var au=(n,e,t,i,r)=>{let s=n.parent,o=n.duration,a=n.completed,c=n.iterationDuration,l=n.iterationCount,u=n._currentIteration,d=n._loopDelay,h=n._reversed,f=n._alternate,g=n._hasChildren,_=n._delay,p=n._currentTime,m=_+c,E=e-_,C=ei(p,-_,o),b=ei(E,-_,o),w=E-p,M=b>0,y=b>=o,S=o<=pt,L=r===Mn.FORCE,I=0,O=E,k=0;if(l>1){let G=c+(y?0:d),re=~~(b/G);n._currentIteration=ei(re,0,l),y&&n._currentIteration--,I=n._currentIteration%2,O=b-re*G||0}let W=h^(f&&I),A=n._ease,z=y?W?0:o:W?c-O:O;A&&(z=c*A(z/c)||0);let $=(s?s.backwards:E<p)?!W:!!W;if(n._currentTime=E,n._iterationTime=z,n.backwards=$,M&&!n.began?(n.began=!0,!t&&!(s&&($||!s.began))&&n.onBegin(n)):E<=0&&(n.began=!1),!t&&!g&&M&&n._currentIteration!==u&&n.onLoop(n),L||r===Mn.AUTO&&(e>=(s&&_>0?0:_)&&e<=m||e<=_&&C>_||e>=m&&C!==o)||z>=m&&C!==o||z<=_&&C>0&&!y||e<=C&&C===o&&a||y&&!a&&S){if(M&&(n.computeDeltaTime(C),t||n.onBeforeUpdate(n)),!g){let G=L||($?w*-1:w)>=qt.tickThreshold,re=Tt(n._offset+(s?s._offset:0)+_+z,12),P=n._head,X,ie,Ee,Fe,J=0;for(;P;){let le=P._composition,ye=P._currentTime,Ae=P._changeDuration,de=P._absoluteStartTime+P._changeDuration,be=P._nextRep,dt=P._prevRep,Re=le!==cn.none,Ye=dt?dt._absoluteStartTime+dt._changeDuration:0,nt=dt&&dt.parent!==P.parent,Ge=!be||be._isOverridden?de:be.parent===P.parent?de+be._delay:be._absoluteStartTime<be._absoluteUpdateStartTime?be._absoluteStartTime:be._absoluteUpdateStartTime;if((G||(ye!==Ae||re<=Ge||dt&&!nt&&(!be||be.parent!==P.parent))&&(ye!==0||re>=P._absoluteStartTime||nt&&!P._hasFromValue&&!dt._isOverridden&&re>=Ye||be&&!be._isOverridden&&be.parent===P.parent&&be._currentTime!==0&&z<be._startTime))&&(!dt||nt||z>=P._startTime)&&(!Re||!P._isOverridden&&(!P._isOverlapped||re<=de)&&(!be||be._isOverridden||re<=Ge)&&(!dt||dt._isOverridden||(nt?re>=P._absoluteStartTime||!P._hasFromValue&&re>=Ye:re>=Ye+P._delay)))){let kt=P._currentTime=ei(z-P._startTime,0,Ae),st=P._ease(kt/P._updateDuration),It=P._modifier,at=P._valueType,Gt=P._tweenType,Ut=Gt===Pt.OBJECT,jt=at===Je.NUMBER,Yt=jt&&Ut||st===0||st===1?-1:qt.precision,xt,N;if(jt)xt=N=It(Tt(Za(P._fromNumber,P._toNumber,st),Yt));else if(at===Je.UNIT)N=It(Tt(Za(P._fromNumber,P._toNumber,st),Yt)),xt=`${N}${P._unit}`;else if(at===Je.COLOR){let wt=P._numbers,yt=P._fromNumbers,ft=P._toNumbers,he=1-st,Wt=yt[0],Pe=yt[1],ke=yt[2],T=ft[0],v=ft[1],U=ft[2];wt[0]=It(Math.sqrt(Wt*Wt*he+T*T*st)),wt[1]=It(Math.sqrt(Pe*Pe*he+v*v*st)),wt[2]=It(Math.sqrt(ke*ke*he+U*U*st)),wt[3]=It(Za(yt[3],ft[3],st)),(!P._setter||i)&&(xt=`rgba(${Tt(wt[0],0)},${Tt(wt[1],0)},${Tt(wt[2],0)},${wt[3]})`)}else at===Je.COMPLEX&&(xt=Tp(P,st,Yt));if(Re&&(P._number=N),!i&&le!==cn.blend){let wt=P.property;X=P.target,P._setter?P._setter(X,N,P):Ut?X[wt]=xt:Gt===Pt.ATTRIBUTE?X.setAttribute(wt,xt):(ie=X.style,Gt===Pt.TRANSFORM?(X!==Ee&&(Ee=X,Fe=X[As]),Fe[wt]=xt,J=1):Gt===Pt.CSS?ie[wt]=xt:Gt===Pt.CSS_VAR&&ie.setProperty(wt,xt)),M&&(k=1)}else P._value=xt}else ye&&dt&&!nt&&z<P._startTime&&(P._currentTime=0);J&&P._renderTransforms&&(ie.transform=Ep(Fe),J=0),P=P._next}!t&&k&&n.onRender(n)}!t&&M&&n.onUpdate(n)}return s&&S?!t&&(s.began&&!$&&E>0&&!a||$&&E<=pt&&a)&&(n.onComplete(n),n.completed=!$):M&&y?l===1/0?n._startTime+=n.duration:n._currentIteration>=l-1&&(n.paused=!0,!a&&!g&&(n.completed=!0,!t&&!(s&&($||!s.began))&&(n.onComplete(n),n._resolve(n)))):n.completed=!1,k},Ns=(n,e,t,i,r)=>{let s=n._currentIteration;if(au(n,e,t,i,r),n._hasChildren){let o=n,a=o.backwards,c=i?e:o._iterationTime,l=qr(),u=0,d=!0;if(!i&&o._currentIteration!==s){let h=o.iterationDuration;zt(o,f=>{if(!a)!f.completed&&!f.backwards&&f._currentTime<f.iterationDuration&&au(f,h,t,1,Mn.FORCE),f.began=!1,f.completed=!1;else{let g=f.duration,_=f._offset+f._delay,p=_+g;!t&&g<=pt&&(!_||p===h)&&f.onComplete(f)}}),t||o.onLoop(o)}zt(o,h=>{let f=Tt((c-h._offset)*h._speed,12);if(a&&f>h._delay+h.duration)return;let g=h._fps<o._fps?h.requestTick(l):r;u+=au(h,f,t,i,g),!h.completed&&d&&(d=!1)},a),!t&&u&&o.onRender(o),(d||a)&&o._currentTime>=o.duration&&(o.paused=!0,o.completed||(o.completed=!0,t||(o.onComplete(o),o._resolve(o))))}};var TT={},wT=(n,e,t)=>{if(t===Pt.TRANSFORM){let i=vp.get(n);return i||n}else if(t===Pt.CSS||t===Pt.ATTRIBUTE&&xp(e)&&n in e.style){let i=TT[n];if(i)return i;{let r=n&&h_(n);return TT[n]=r,r}}else return n},E_=(n,e=!1)=>{if(n._hasChildren)zt(n,t=>E_(t,e),!0);else{let t=n;t.pause(),zt(t,i=>{let r=i.property,s=i.target,o=i._tweenType,a=i._inlineValue,c=Rs(a)||a===pr;if(i._setter){if(!e&&!c){if(ti(a,di),di.d){let l=di.d,u=i._numbers;for(let d=0,h=l.length;d<h;d++)u[d]=l[d]}else i._number=di.n;i._setter(i.target,i._number,i)}}else if(o===Pt.OBJECT)!e&&!c&&(s[r]=a);else if(s[fr])if(o===Pt.ATTRIBUTE)e||(c?s.removeAttribute(r):s.setAttribute(r,a));else{let l=s.style;if(o===Pt.TRANSFORM){let u=s[As];c?delete u[r]:u[r]=a,i._renderTransforms&&(Object.keys(u).length?l.transform=Ep(u):l.removeProperty("transform"))}else c?l.removeProperty(h_(r)):l[r]=a}s[fr]&&t._tail===i&&t.targets.forEach(l=>{l.getAttribute&&l.getAttribute("style")===pr&&l.removeAttribute("style")})})}return n};var Ja=class{constructor(e=0){this.deltaTime=0,this._currentTime=e,this._lastTickTime=e,this._startTime=e,this._lastTime=e,this._frameDuration=hr/tu,this._fps=tu,this._speed=1,this._hasChildren=!1,this._head=null,this._tail=null}get fps(){return this._fps}set fps(e){let t=+e,i=t<pt?pt:t,r=hr/i;i>Ya.frameRate&&(Ya.frameRate=i),this._fps=i,this._frameDuration=r}get speed(){return this._speed}set speed(e){let t=+e;this._speed=t<pt?pt:t}requestTick(e){let t=this._frameDuration,i=e-this._lastTickTime,r=t*.25,s=r<4?r:4;return i+s<t?Mn.NONE:(this._lastTickTime=i>=t?e-i%t:e,Mn.AUTO)}computeDeltaTime(e){let t=e-this._lastTime;return this.deltaTime=t,this._lastTime=e,t}};var Kr={animation:null,update:$n},CT=n=>{let e=Kr.animation;return e||(e={duration:pt,computeDeltaTime:$n,_offset:0,_delay:0,_head:null,_tail:null},Kr.animation=e,Kr.update=()=>{n.forEach(t=>{for(let i in t){let r=t[i],s=r._head;if(s){let o=s._valueType,a=o===Je.COMPLEX||o===Je.COLOR?ln(s._fromNumbers):null,c=s._fromNumber,l=r._tail;for(;l&&l!==s;){if(a)for(let u=0,d=l._numbers.length;u<d;u++)a[u]+=l._numbers[u];else c+=l._number;l=l._prevAdd}s._toNumber=c,s._toNumbers=a}}}),au(e,1,1,0,Mn.FORCE)}),e};var DT=wi?requestAnimationFrame:setImmediate,n2=wi?cancelAnimationFrame:clearImmediate,S_=class extends Ja{constructor(e){super(e),this.useDefaultMainLoop=!0,this.pauseOnDocumentHidden=!0,this.defaults=Ya,this.paused=!0,this.reqId=0}update(){let e=this._currentTime=qr();if(this.requestTick(e)){this.computeDeltaTime(e);let t=this._speed,i=this._fps,r=this._head;for(;r;){let s=r._next;r.paused?(Do(this,r),this._hasChildren=!!this._tail,r._running=!1,r.completed&&!r._cancelled&&r.cancel()):Ns(r,(e-r._startTime)*r._speed*t,0,0,r._fps<i?r.requestTick(e):Mn.AUTO),r=s}Kr.update()}}wake(){return this.useDefaultMainLoop&&!this.reqId&&(this.requestTick(qr()),this.reqId=DT(AT)),this}pause(){if(this.reqId)return this.paused=!0,i2()}resume(){if(this.paused)return this.paused=!1,zt(this,e=>e.resetTime()),this.wake()}get speed(){return this._speed*(qt.timeScale===1?1:hr)}set speed(e){let t=e*qt.timeScale;this._speed!==t&&(this._speed=t,zt(this,i=>i.speed=i._speed))}get timeUnit(){return qt.timeScale===1?"ms":"s"}set timeUnit(e){let i=e==="s",r=i?.001:1;if(qt.timeScale!==r){qt.timeScale=r,qt.tickThreshold=200*r;let s=i?.001:hr;this.defaults.duration*=s,this._speed*=s}}get precision(){return qt.precision}set precision(e){qt.precision=e}},Tn=(()=>{let n=new S_(qr());return wi&&(f_.engine=n,Ds.addEventListener("visibilitychange",()=>{n.pauseOnDocumentHidden&&(Ds.hidden?n.pause():n.resume())})),n})(),AT=()=>{Tn._head?(Tn.reqId=DT(AT),Tn.update()):Tn.reqId=0},i2=()=>(n2(Tn.reqId),Tn.reqId=0,Tn);var wp={_rep:new WeakMap,_add:new Map},lu=(n,e,t="_rep")=>{let i=wp[t],r=i.get(n);return r||(r={},i.set(n,r)),r[e]?r[e]:r[e]={_head:null,_tail:null}},r2=(n,e)=>n._isOverridden||n._absoluteStartTime>e._absoluteStartTime,cu=n=>{n._isOverlapped=1,n._isOverridden=1,n._changeDuration=pt,n._currentTime=pt},Cp=(n,e)=>{let t=n._composition;if(t===cn.replace){let i=n._absoluteStartTime;Zr(e,n,r2,"_prevRep","_nextRep");let r=n._prevRep;if(r){let s=r.parent,o=r._absoluteEndTime;if(n.parent.id!==s.id&&s.iterationCount>1&&o+(s.duration-s.iterationDuration)>i){cu(r);let l=r._prevRep;for(;l&&l.parent.id===s.id;)cu(l),l=l._prevRep}let a=n._absoluteUpdateStartTime;if(o>a){let l=r._startTime,u=o-(l+r._updateDuration),d=Tt(a-u-l,12);r._changeDuration=d,r._currentTime=d,r._isOverlapped=1,d<pt&&cu(r)}let c=n.parent.parent;if(!c||c!==s.parent){let l=!0;if(zt(s,u=>{u._isOverlapped||(l=!1)}),l){let u=s.parent;if(u){let d=!0;zt(u,h=>{h!==s&&zt(h,f=>{f._isOverlapped||(d=!1)})}),d&&u.cancel()}else s.cancel()}}}}else if(t===cn.blend){let i=lu(n.target,n.property,"_add"),r=CT(wp._add),s=i._head;s||(s=mt({},n),s._composition=cn.replace,s._updateDuration=pt,s._startTime=0,s._numbers=ln(n._fromNumbers),s._number=0,s._next=null,s._prev=null,Zr(i,s),Zr(r,s));let o=n._toNumber;if(n._fromNumber=s._fromNumber-o,n._toNumber=0,n._numbers=ln(n._fromNumbers),n._number=0,s._fromNumber=o,n._toNumbers.length){let a=ln(n._toNumbers);a.forEach((c,l)=>{n._fromNumbers[l]=s._fromNumbers[l]-c,n._toNumbers[l]=0}),s._fromNumbers=a}Zr(i,n,null,"_prevAdd","_nextAdd")}return n},IT=n=>{let e=n._composition;if(e!==cn.none){let t=n.target,i=n.property,o=wp._rep.get(t)[i];if(Do(o,n,"_prevRep","_nextRep"),e===cn.blend){let a=wp._add,c=a.get(t);if(!c)return;let l=c[i],u=Kr.animation;Do(l,n,"_prevAdd","_nextAdd");let d=l._head;if(d&&d===l._tail){Do(l,d,"_prevAdd","_nextAdd"),Do(u,d);let h=!0;for(let f in c)if(c[f]._head){h=!1;break}h&&a.delete(t)}}}return n};var RT=n=>(n.paused=!0,n.began=!1,n.completed=!1,n),b_=n=>(n._cancelled&&(n._hasChildren?zt(n,b_):zt(n,e=>{e._composition!==cn.none&&Cp(e,lu(e.target,e.property))}),n._cancelled=0),n),NT=0,s2=(n,e)=>n._priority>e._priority,Dp=class extends Ja{constructor(e={},t=null,i=0){super(0),++NT;let{id:r,delay:s,duration:o,reversed:a,alternate:c,loop:l,loopDelay:u,autoplay:d,frameRate:h,playbackRate:f,priority:g,onComplete:_,onLoop:p,onPause:m,onBegin:E,onBeforeUpdate:C,onUpdate:b}=e;iu.current&&iu.current.register(this);let w=t?0:Tn._lastTickTime,M=t?t.defaults:qt.defaults,y=Yr(s)||At(s)?M.delay:+s,S=Yr(o)||At(o)?1/0:+o,L=hn(l,M.loop),I=hn(u,M.loopDelay),O=L===!0||L===1/0||L<0?1/0:L+1,k=0;t?k=i:(Tn.reqId||Tn.requestTick(qr()),k=(Tn._lastTickTime-Tn._startTime)*qt.timeScale),this.id=At(r)?NT:r,this.parent=t,this.duration=ou((S+I)*O-I)||pt,this.backwards=!1,this.paused=!0,this.began=!1,this.completed=!1,this.onBegin=E||M.onBegin,this.onBeforeUpdate=C||M.onBeforeUpdate,this.onUpdate=b||M.onUpdate,this.onLoop=p||M.onLoop,this.onPause=m||M.onPause,this.onComplete=_||M.onComplete,this.iterationDuration=S,this.iterationCount=O,this._autoplay=t?!1:hn(d,M.autoplay),this._offset=k,this._delay=y,this._loopDelay=I,this._iterationTime=0,this._currentIteration=0,this._resolve=$n,this._running=!1,this._reversed=+hn(a,M.reversed),this._reverse=this._reversed,this._cancelled=0,this._alternate=hn(c,M.alternate),this._prev=null,this._next=null,this._lastTickTime=w,this._startTime=w,this._lastTime=w,this._fps=hn(h,M.frameRate),this._speed=hn(f,M.playbackRate),this._priority=+hn(g,1)}get cancelled(){return!!this._cancelled}set cancelled(e){e?this.cancel():this.reset(!0).play()}get currentTime(){return ei(Tt(this._currentTime,qt.precision),-this._delay,this.duration)}set currentTime(e){let t=this.paused;this.pause().seek(+e),t||this.resume()}get iterationCurrentTime(){return ei(Tt(this._iterationTime,qt.precision),0,this.iterationDuration)}set iterationCurrentTime(e){this.currentTime=this.iterationDuration*this._currentIteration+e}get progress(){return ei(Tt(this._currentTime/this.duration,10),0,1)}set progress(e){this.currentTime=this.duration*e}get iterationProgress(){return ei(Tt(this._iterationTime/this.iterationDuration,10),0,1)}set iterationProgress(e){let t=this.iterationDuration;this.currentTime=t*this._currentIteration+t*e}get currentIteration(){return this._currentIteration}set currentIteration(e){this.currentTime=this.iterationDuration*ei(+e,0,this.iterationCount-1)}get reversed(){return!!this._reversed}set reversed(e){e?this.reverse():this.play()}get speed(){return super.speed}set speed(e){super.speed=e,this.resetTime()}reset(e=!1){return b_(this),this._reversed&&!this._reverse&&(this.reversed=!1),this._iterationTime=this.iterationDuration,Ns(this,0,1,~~e,Mn.FORCE),RT(this),this._hasChildren&&zt(this,RT),this}init(e=!1){this.fps=this._fps,this.speed=this._speed,!e&&this._hasChildren&&Ns(this,this.duration,1,~~e,Mn.FORCE),this.reset(e);let t=this._autoplay;return t===!0?this.resume():t&&!At(t.linked)&&t.link(this),this}resetTime(){let e=1/(this._speed*Tn._speed);return this._startTime=qr()-(this._currentTime+this._delay)*e,this}pause(){return this.paused?this:(this.paused=!0,this.onPause(this),this)}resume(){return this.paused?(this.paused=!1,this.duration<=pt&&!this._hasChildren?Ns(this,pt,0,0,Mn.FORCE):(this._running||(Zr(Tn,this,s2),Tn._hasChildren=!0,this._running=!0),this.resetTime(),this._startTime-=12,Tn.wake()),this):this}restart(){return this.reset().resume()}seek(e,t=0,i=0){b_(this),this.completed=!1;let r=this.paused;return this.paused=!0,Ns(this,e+this._delay,~~t,~~i,Mn.AUTO),r?this:this.resume()}alternate(){let e=this._reversed,t=this.iterationCount,i=this.iterationDuration,r=t===1/0?vT(eu/i):t;return this._reversed=+(this._alternate&&!(r%2)?e:!e),t===1/0?this.iterationProgress=this._reversed?1-this.iterationProgress:this.iterationProgress:this.seek(i*r-this._currentTime),this.resetTime(),this}play(){return this._reversed&&this.alternate(),this.resume()}reverse(){return this._reversed||this.alternate(),this.resume()}cancel(){return this._hasChildren?zt(this,e=>e.cancel(),!0):zt(this,IT),this._cancelled=1,this.pause()}stretch(e){let t=this.duration,i=Co(e);if(t===i)return this;let r=e/t,s=e<=pt;return this.duration=s?pt:i,this.iterationDuration=s?pt:Co(this.iterationDuration*r),this._offset*=r,this._delay*=r,this._loopDelay*=r,this}revert(){Ns(this,0,1,0,Mn.AUTO);let e=this._autoplay;return e&&e.linked&&e.linked===this&&e.revert(),this.cancel()}complete(e=0){return this.seek(this.duration,e).cancel()}then(e=$n){let t=this.then,i=()=>{this.then=null,e(this),this.then=t,this._resolve=$n};return new Promise(r=>(this._resolve=()=>r(i()),this.completed&&this._resolve(),this))}};function PT(n){let e=Xr(n)?iu.root.querySelectorAll(n):n;if(e instanceof NodeList||e instanceof HTMLCollection)return e}function o2(n){if(Rs(n))return[];if(!wi)return Is(n)&&n.flat(1/0)||[n];if(Is(n)){let t=n.flat(1/0),i=[];for(let r=0,s=t.length;r<s;r++){let o=t[r];if(!Rs(o)){let a=PT(o);if(a)for(let c=0,l=a.length;c<l;c++){let u=a[c];if(!Rs(u)){let d=!1;for(let h=0,f=i.length;h<f;h++)if(i[h]===u){d=!0;break}d||i.push(u)}}else{let c=!1;for(let l=0,u=i.length;l<u;l++)if(i[l]===o){c=!0;break}c||i.push(o)}}}return i}let e=PT(n);return e?Array.from(e):[n]}function OT(n){let e=o2(n),t=e.length;for(let i=0;i<t;i++){let r=e[i];if(!r[u_]){r[u_]=!0;let s=xp(r);(r.nodeType||s)&&(r[fr]=!0,r[yp]=s,r[As]={})}}return e}var M_={deg:1,rad:180/su,turn:360},LT={},T_=(n,e,t,i=!1)=>{let r=e.u,s=e.n;if(e.t===Je.UNIT&&r===t)return e;let o=s+r+t,a=LT[o];if(!At(a)&&!i)e.n=a;else{let c;if(r in M_)c=s*M_[r]/M_[t];else{let u=n.cloneNode(),d=n.parentNode,h=d&&d!==Ds?d:Ds.body;h.appendChild(u);let f=u.style;f.width=100+r;let g=u.offsetWidth||100;f.width=100+t;let _=u.offsetWidth||100,p=g/_;h.removeChild(u),c=p*s}e.n=c,LT[o]=c}return e.t,Je.UNIT,e.u=t,e};var Jr=n=>n;var uu=(n=1.68)=>e=>wo(e,+n),C_={in:n=>e=>n(e),out:n=>e=>1-n(1-e),inOut:n=>e=>e<.5?n(e*2)/2:1-n(e*-2+2)/2,outIn:n=>e=>e<.5?(1-n(1-e*2))/2:(n(e*2-1)+1)/2},a2=su/2,FT=su*2,kT={[pr]:uu,Quad:uu(2),Cubic:uu(3),Quart:uu(4),Quint:uu(5),Sine:n=>1-yT(n*a2),Circ:n=>1-mT(1-n*n),Expo:n=>n?wo(2,10*n-10):0,Bounce:n=>{let e,t=4;for(;n<((e=wo(2,--t))-1)/11;);return 1/wo(4,3-t)-7.5625*wo((e*3-2)/22-n,2)},Back:(n=1.7)=>e=>(+n+1)*e*e*e-+n*e*e,Elastic:(n=1,e=.3)=>{let t=ei(+n,1,10),i=ei(+e,pt,2),r=i/FT*_T(1/t),s=FT/i;return o=>o===0||o===1?o:-t*wo(2,-10*(1-o))*gT((1-o-r)*s)}},w_=(()=>{let n={linear:Jr,none:Jr};for(let e in C_)for(let t in kT){let i=kT[t],r=C_[e];n[e+t]=t===pr||t==="Back"||t==="Elastic"?(s,o)=>r(i(s,o)):r(i)}return n})(),Ap={linear:Jr,none:Jr},c2=n=>{if(Ap[n])return Ap[n];if(n.indexOf("(")<=-1){let t=C_[n]||n.includes("Back")||n.includes("Elastic")?w_[n]():w_[n];return t?Ap[n]=t:Jr}else{let e=n.slice(0,-1).split("("),t=w_[e[0]];return t?Ap[n]=t(...e[1].split(",")):Jr}},UT=["steps(","irregular(","linear(","cubicBezier("],D_=n=>{if(Xr(n)){for(let t=0,i=UT.length;t<i;t++)if(qi(n,UT[t]))return console.warn(`String syntax for \`ease: "${n}"\` has been removed from the core and replaced by importing and passing the easing function directly: \`ease: ${n}\``),Jr}return Yr(n)?n:Xr(n)?c2(n):Jr};var ze=Mp(),Qe=Mp(),Qa={},Ip={func:null},Rp={func:null},Np=[null],ec=[null,null],Pp={to:null},l2=0,BT=0,Ps,gr,u2=(n,e)=>{let t={};if(Is(n)){let i=[].concat(...n.map(r=>Object.keys(r))).filter(ru);for(let r=0,s=i.length;r<s;r++){let o=i[r],a=n.map(c=>{let l={};for(let u in c){let d=c[u];ru(u)?u===o&&(l.to=d):l[u]=d}return l});t[o]=a}}else{let i=hn(e.duration,qt.defaults.duration);Object.keys(n).map(s=>({o:parseFloat(s)/100,p:n[s]})).sort((s,o)=>s.o-o.o).forEach(s=>{let o=s.o,a=s.p;for(let c in a)if(ru(c)){let l=t[c];l||(l=t[c]=[]);let u=o*i,d=l.length,h=l[d-1],f={to:a[c]},g=0;for(let _=0;_<d;_++)g+=l[_].duration;d===1&&(f.from=h.to),a.ease&&(f.ease=a.ease),f.duration=u-(d?g:0),l.push(f)}return s});for(let s in t){let o=t[s],a;for(let c=0,l=o.length;c<l;c++){let u=o[c],d=u.ease;u.ease=a||void 0,a=d}o[0].duration||o.shift()}}return t},Op=class extends Dp{constructor(e,t,i,r,s=!1,o=0,a){super(t,i,r),this._head,this._tail,++BT;let c=OT(e),l=c.length,u=t.keyframes,d=u?xT(u2(u,t),t):t,{id:h,delay:f,duration:g,ease:_,playbackEase:p,modifier:m,composition:E,onRender:C}=d,b=i?i.defaults:qt.defaults,w=hn(_,b.ease),M=hn(p,b.playbackEase),y=M?D_(M):null,S=!At(w.ease),L=S?w.ease:hn(_,y?"linear":b.ease),I=S?w.settlingDuration:hn(g,b.duration),O=hn(f,b.delay),k=m||b.modifier,W=At(E)&&l>=hr?cn.none:At(E)?b.composition:E,A=this._offset+(i?i._offset:0);S&&(w.parent=this);let z=NaN,$=NaN,G=0,re=0;for(let P=0;P<l;P++){let X=c[P],ie=o||P,Ee=a||c,Fe=NaN,J=NaN;for(let le in d)if(ru(le)){let ye=__(X,le),Ae=Sp(X,le),de=wT(le,X,ye),be=d[le],dt=Is(be);if(s&&!dt&&(ec[0]=be,ec[1]=be,be=ec),dt){let st=be.length,It=!_p(be[0]);st===2&&It?(Pp.to=be,Np[0]=Pp,Ps=Np):st>2&&It?(Ps=[],be.forEach((at,Gt)=>{Gt?Gt===1?(ec[1]=at,Ps.push(ec)):Ps.push(at):ec[0]=at})):Ps=be}else Np[0]=be,Ps=Np;let Re=null,Ye=null,nt=NaN,Ge=0,kt=0;for(let st=Ps.length;kt<st;kt++){let It=Ps[kt];_p(It)?gr=It:(Pp.to=It,gr=Pp),Ip.func=null,Rp.func=null;let at=mr(hn(gr.composition,W),X,ie,Ee,null,null),Gt=fT(at)?at:cn[at];!Re&&Gt!==cn.none&&(Re=lu(X,de));let Ut=Re?Re._tail:null,jt=i&&Ut&&Ut.parent.parent===i?Ut:Ye,Yt=mr(gr.to,X,ie,Ee,Ip,jt),xt;_p(Yt)&&!At(Yt.to)?(gr=Yt,xt=Yt.to):xt=Yt;let N=mr(gr.from,X,ie,Ee,Rp,jt),wt=gr.ease||L,yt=mr(wt,X,ie,Ee,null,jt),ft=Yr(yt)||Xr(yt)?yt:wt,he=!At(ft)&&!At(ft.ease),Wt=he?ft.ease:ft,Pe=he?ft.settlingDuration:mr(hn(gr.duration,st>1?mr(I,X,ie,Ee,null,jt)/st:I),X,ie,Ee,null,jt),ke=mr(hn(gr.delay,kt?0:O),X,ie,Ee,null,jt),T=gr.modifier||k,v=!At(N),U=!At(xt),se=Is(xt),ne=se||v&&U,fe=Ye?Ge:0,pe=Ye?Ge+ke:ke,K=Tt(A+pe,12),Q=Tt(A+fe,12);!re&&(v||se)&&(re=1);let oe=Ye;if(Gt!==cn.none){let ee=Re._head;for(;ee&&ee._absoluteStartTime<=K;)if(ee._isOverridden||(oe=ee),ee=ee._nextRep,ee&&ee._absoluteStartTime>=K)for(;ee;)cu(ee),ee=ee._nextRep}if(ne){ti(se?mr(xt[0],X,ie,Ee,Rp,jt):N,ze),ti(se?mr(xt[1],X,ie,Ee,Ip,jt):xt,Qe);let ee=Ka(X,de,ye,Qa);ze.t===Je.NUMBER&&(oe?oe._valueType===Je.UNIT&&(ze.t=Je.UNIT,ze.u=oe._unit):(ti(ee,di),di.t===Je.UNIT&&(ze.t=Je.UNIT,ze.u=di.u)))}else U?ti(xt,Qe):Ye?x_(Ye,Qe):ti(i&&oe&&oe.parent.parent===i?oe._value:Ka(X,de,ye,Qa),Qe),v?ti(N,ze):Ye?x_(Ye,ze):ti(i&&oe&&oe.parent.parent===i?oe._value:Ka(X,de,ye,Qa),ze);if(ze.o&&(ze.n=bp(oe?oe._toNumber:ti(Ka(X,de,ye,Qa),di).n,ze.n,ze.o)),Qe.o&&(Qe.n=bp(ze.n,Qe.n,Qe.o)),ze.t!==Qe.t){if(ze.t===Je.COMPLEX||Qe.t===Je.COMPLEX){let ee=ze.t===Je.COMPLEX?ze:Qe,Te=ze.t===Je.COMPLEX?Qe:ze;Te.t=Je.COMPLEX,Te.s=ln(ee.s),Te.d=ee.d.map(()=>Te.n)}else if(ze.t===Je.UNIT||Qe.t===Je.UNIT){let ee=ze.t===Je.UNIT?ze:Qe,Te=ze.t===Je.UNIT?Qe:ze;Te.t=Je.UNIT,Te.u=ee.u}else if(ze.t===Je.COLOR||Qe.t===Je.COLOR){let ee=ze.t===Je.COLOR?ze:Qe,Te=ze.t===Je.COLOR?Qe:ze;Te.t=Je.COLOR,Te.d=ee.d.map(()=>0)}}if(ze.u!==Qe.u){let ee=Qe.u?ze:Qe;ee=T_(X,ee,Qe.u?Qe.u:ze.u,!1)}if(Qe.d&&ze.d&&Qe.d.length!==ze.d.length){let ee=ze.d.length>Qe.d.length?ze:Qe,Te=ee===ze?Qe:ze;Te.d=ee.d.map((Ze,ve)=>At(Te.d[ve])?0:Te.d[ve]),Te.s=ln(ee.s)}let D=Tt(+Pe||pt,12),te=Qa[de];Rs(te)||(Qa[de]=null);let Z=Ae?Ae.set:null;Ge=Tt(pe+D,12);let ce=ze.d,ae=Qe.d,ue=Qe.s,Me={parent:this,id:l2++,property:de,target:X,_value:null,_toFunc:Ip.func,_fromFunc:Rp.func,_ease:D_(Wt),_fromNumbers:ce?ln(ce):nu,_toNumbers:ae?ln(ae):nu,_strings:ue?ln(ue):nu,_fromNumber:ze.n,_toNumber:Qe.n,_numbers:ce?ln(ce):nu,_number:ze.n,_unit:Qe.u,_modifier:T,_currentTime:0,_startTime:pe,_delay:+ke,_updateDuration:D,_changeDuration:D,_absoluteStartTime:K,_absoluteUpdateStartTime:Q,_absoluteEndTime:Tt(A+Ge,12),_hasFromValue:v||se?1:0,_tweenType:ye,_setter:Z,_valueType:Qe.t,_composition:Gt,_isOverlapped:0,_isOverridden:0,_renderTransforms:0,_inlineValue:te,_prevRep:null,_nextRep:null,_prevAdd:null,_nextAdd:null,_prev:null,_next:null};Gt!==cn.none&&Cp(Me,Re);let $e=Me._valueType;if($e===Je.COMPLEX)Me._value=Tp(Me,1,-1);else if($e===Je.UNIT)Me._value=`${T(Me._toNumber)}${Me._unit}`;else if($e===Je.COLOR){let ee=Qe.d;Me._value=`rgba(${Tt(ee[0],0)},${Tt(ee[1],0)},${Tt(ee[2],0)},${ee[3]})`}else Me._value=T(Me._toNumber);isNaN(nt)&&(nt=Me._startTime),Ye=Me,G++,Zr(this,Me)}(isNaN($)||nt<$)&&($=nt),(isNaN(z)||Ge>z)&&(z=Ge),ye===Pt.TRANSFORM&&(Fe=G-kt,J=G)}if(!isNaN(Fe)){let le=0;zt(this,ye=>{le>=Fe&&le<J&&(ye._renderTransforms=1,ye._composition===cn.blend&&zt(Kr.animation,Ae=>{Ae.id===ye.id&&(Ae._renderTransforms=1)})),le++})}}l||console.warn("No target found. Make sure the element you're trying to animate is accessible before creating your animation."),$?(zt(this,P=>{P._startTime-P._delay||(P._delay-=$),P._startTime-=$}),z-=$):$=0,z||(z=pt,this.iterationCount=0),this.targets=c,this.id=At(h)?BT:h,this.duration=z===pt?pt:ou((z+this._loopDelay)*this.iterationCount-this._loopDelay)||pt,this.onRender=C||b.onRender,this._ease=y,this._delay=$,this.iterationDuration=z,!this._autoplay&&re&&this.onRender(this)}stretch(e){let t=this.duration;if(t===Co(e))return this;let i=e/t;return zt(this,r=>{r._updateDuration=Co(r._updateDuration*i),r._changeDuration=Co(r._changeDuration*i),r._currentTime*=i,r._delay*=i,r._startTime*=i,r._absoluteStartTime*=i,r._absoluteUpdateStartTime*=i,r._absoluteEndTime*=i}),super.stretch(e)}refresh(){return zt(this,e=>{let t=e._toFunc,i=e._fromFunc;(t||i)&&(i?(ti(i(),ze),ze.u!==e._unit&&e.target[fr]&&T_(e.target,ze,e._unit,!0),e._fromNumbers=ln(ze.d),e._fromNumber=ze.n):t&&(ti(Ka(e.target,e.property,e._tweenType),di),e._fromNumbers=ln(di.d),e._fromNumber=di.n),t&&(ti(t(),Qe),e._toNumbers=ln(Qe.d),e._strings=ln(Qe.s),e._toNumber=Qe.o?bp(e._fromNumber,Qe.n,Qe.o):Qe.n))}),this.duration===pt&&this.restart(),this}revert(){return super.revert(),E_(this)}then(e){return super.then(e)}},tc=(n,e)=>qt.editor?qt.editor.addAnimation(n,e):new Op(n,e,null,0,!1).init();var nc=class n{isReducedMotion(){return typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}animateEntrance(e){this.isReducedMotion()||tc(e,{opacity:[0,1],translateY:[14,0],duration:450,ease:"outQuad"})}animateCounter(e,t,i,r=350){if(this.isReducedMotion()){e.textContent=String(i);return}let s={val:t};tc(s,{val:i,duration:r,ease:"outQuad",onUpdate:()=>{e.textContent=String(Math.round(s.val))}})}animateFeedItem(e){this.isReducedMotion()||tc(e,{opacity:[0,1],translateX:[10,0],duration:200,ease:"outCubic"})}animateAlert(e){this.isReducedMotion()||tc(e,{scale:[1,1.04,1],duration:300,ease:"outBack"})}static \u0275fac=function(t){return new(t||n)};static \u0275prov=ht({token:n,factory:n.\u0275fac,providedIn:"root"})};var Ci=class n{api=_e(yf);scene=_e(qa);animation=_e(nc);scenario=Jt(null);selectedAlgorithm=Jt("astar");isRunning=Jt(!1);playbackSpeed=Jt(2);showFrontier=Jt(!0);showLabels=Jt(!1);currentResult=Jt(null);activeStep=Jt(0);totalSteps=Jt(0);activeEvent=Jt(null);feedEvents=Jt([]);comparisonData=Jt([]);systemStatus=Jt("ready");statusMessage=Jt("Select an algorithm, then start the simulation.");stepLabel=Jt("Awaiting run");trolleyActive=Jt(!1);randomScenarioCounter=0;moves=Ar(()=>this.currentResult()?.moves??0);totalCost=Ar(()=>this.currentResult()?.totalCost??0);nodesExpanded=Ar(()=>this.currentResult()?.nodesExpanded??0);elapsedMs=Ar(()=>this.currentResult()?.elapsedMs??0);goalReached=Ar(()=>this.currentResult()?.reached??!1);isAstar=Ar(()=>this.selectedAlgorithm()==="astar");speedLabel=Ar(()=>{switch(this.playbackSpeed()){case 1:return"0.5\xD7";case 2:return"1.0\xD7";case 3:return"2.0\xD7";case 4:return"4.0\xD7";default:return"1.0\xD7"}});getStepDelay(){return[400,200,90,25][this.playbackSpeed()-1]}getDriveDelay(){return[160,90,45,18][this.playbackSpeed()-1]}sleep(e){return new Promise(t=>setTimeout(t,e))}init(){this.api.getScenario().subscribe({next:e=>{this.scenario.set(e),this.scene.buildWarehouse(e,this.showLabels()),this.loadComparison()},error:()=>{this.systemStatus.set("error"),this.statusMessage.set("Could not connect to simulation server. Verify server.py is running.")}})}generateRandomScenario(){if(this.isRunning())return;let e=Date.now()+ ++this.randomScenarioCounter*997;this.api.generateRandomScenario(e).subscribe({next:t=>{this.scenario.set(t),this.currentResult.set(null),this.feedEvents.set([]),this.scene.clearOverlays(),this.scene.buildWarehouse(t,this.showLabels()),this.loadComparison(),this.systemStatus.set("ready"),this.stepLabel.set(`Scenario ${e} generated`),this.statusMessage.set("Random grid ready. Every search will respect the generated obstacles.")},error:()=>this.statusMessage.set("Could not generate a random scenario.")})}loadComparison(){this.api.getResults().subscribe({next:({results:e})=>this.comparisonData.set(e),error:()=>console.warn("Could not load comparison metrics")})}selectAlgorithm(e){this.isRunning()||(this.selectedAlgorithm.set(e),this.statusMessage.set(`Selected ${e.toUpperCase()}. Ready to run.`),this.stepLabel.set("Strategy configured"))}setSpeed(e){this.playbackSpeed.set(e)}toggleFrontier(e){this.showFrontier.set(e)}toggleLabels(e){this.showLabels.set(e),this.scene.toggleLabels(e)}resetCamera(){this.scene.resetCamera()}topCamera(){this.scene.topCamera()}async runSelected(){if(this.isRunning())return;this.isRunning.set(!0),this.systemStatus.set("running"),this.trolleyActive.set(!1),this.feedEvents.set([]),this.scene.clearOverlays(),this.scene.resetRobotBeacon(),this.scene.setTrolley([0,0],!1),this.scenario()&&this.scene.setRobotPosition(this.scenario().start);let e=this.selectedAlgorithm();this.statusMessage.set(`Computing ${e==="astar"?"A*":e.toUpperCase()} state-space search...`),this.api.runAlgorithm(e).subscribe({next:async t=>{this.currentResult.set(t),this.totalSteps.set(t.trace.length),await this.animateTrace(t),this.scene.clearOverlays(),this.scene.drawPath(t.path,tt.route),t.reached&&(this.stepLabel.set(`${t.algorithm.toUpperCase()} Route Committed \xB7 Robot in Transit`),await this.scene.driveRobot(t.path,this.getDriveDelay(),(i,r)=>{this.statusMessage.set(`AMR in transit: step ${r+1} of ${t.moves} at [${i.join(", ")}].`)}),this.scene.celebrateGoal(),this.stepLabel.set("Delivery Complete \xB7 Goal Reached"),this.statusMessage.set(`${t.algorithm.toUpperCase()} successfully delivered to Dispatch [${this.scenario()?.goal.join(", ")}]! Moves: ${t.moves}, Total Cost: ${t.totalCost}.`)),this.isRunning.set(!1),this.systemStatus.set("complete")},error:()=>{this.isRunning.set(!1),this.systemStatus.set("error"),this.statusMessage.set("Search execution failed on backend.")}})}async animateTrace(e){let t=this.animation.isReducedMotion(),i=t?Math.max(1,Math.ceil(e.trace.length/8)):1;for(let r=0;r<e.trace.length&&this.isRunning();r+=i){let s=e.trace[r];this.activeStep.set(r+1),this.activeEvent.set(s),this.scene.renderTraceEvent(s,this.showFrontier());let o=s.scores?.[0],a=o&&["greedy","astar"].includes(this.selectedAlgorithm())?`Score: g=${o.g}, h=${o.h}${o.f!=null?`, f=${o.f}`:""}`:`${s.considered.length} candidate${s.considered.length===1?"":"s"} \xB7 ${s.frontier.length} waiting`;this.feedEvents.update(c=>[...c,{index:s.step+1,current:s.current,detail:a,scores:o}]),this.stepLabel.set(`Decision ${s.step+1} of ${e.trace.length}`),this.statusMessage.set(`Expanding [${s.current.join(", ")}]; ${s.frontier.length} cells in frontier.`),await this.sleep(t?15:this.getStepDelay())}}async runTrolley(){this.isRunning()||(this.isRunning.set(!0),this.systemStatus.set("running"),this.trolleyActive.set(!0),this.selectedAlgorithm.set("astar"),this.feedEvents.set([]),this.scene.clearOverlays(),this.scene.resetRobotBeacon(),this.scene.setTrolley([0,0],!1),this.scenario()&&this.scene.setRobotPosition(this.scenario().start),this.stepLabel.set("Phase 1: Initial Dispatch Route (A*)"),this.statusMessage.set(`Computing initial optimal route. The trolley at [${this.scenario()?.trolley.join(", ")}] is unmapped and omitted from the robot's known map.`),this.api.runTrolley().subscribe({next:async e=>{this.scene.drawPath(e.original.path,tt.frontier),this.stepLabel.set(`Phase 1: Initial Plan Committed \xB7 ${e.original.moves} Moves \xB7 Cost ${e.original.totalCost}`),this.statusMessage.set(`Initial plan committed: ${e.original.moves} moves, cost ${e.original.totalCost}. Robot departing from Packing Station [${this.scenario()?.start.join(", ")}].`),await this.sleep(700),this.stepLabel.set("Phase 2: Robot in Transit along Planned Route"),await this.scene.driveRobot(e.travelled,this.getDriveDelay(),(t,i)=>{this.statusMessage.set(`AMR navigating: waypoint ${i+1} of ${e.travelled.length} at [${t.join(", ")}].`)}),this.scene.showObstacleAlert(e.trolley,e.detectedAt),this.stepLabel.set("Phase 3: Obstacle Detected 1 Cell Ahead!"),this.statusMessage.set(`PROXIMITY WARNING: Unmapped trolley detected at [${e.trolley.join(", ")}] (Distance = ${e.distanceToBlockedCell} cell). Robot halted at [${e.detectedAt.join(", ")}]. Updating belief map.`),this.feedEvents.update(t=>[...t,{index:1,current:e.detectedAt,detail:`HALT: Proximity sensor detected unmapped trolley at [${e.trolley.join(", ")}]. Map updated: blocked={[${e.trolley.join(", ")}]}. Triggering online A* replan.`}]),await this.sleep(1400),this.stepLabel.set(`Phase 4: Online A* Replanning from [${e.detectedAt.join(", ")}]`),this.statusMessage.set(`A* searching state space from current position [${e.detectedAt.join(", ")}] with [${e.trolley.join(", ")}] blocked...`),this.currentResult.set({algorithm:"astar_replan",reached:e.goalReached,path:e.combinedPath,moves:e.moves,totalCost:e.totalCost,nodesExpanded:e.nodesExpanded,elapsedMs:e.revised.elapsedMs,trace:e.revised.trace,replans:e.replans,trolley:e.trolley,detectedAt:e.detectedAt}),await this.animateTrace(e.revised),this.scene.clearOverlays(),this.scene.setTrolley(e.trolley,!0),this.scene.overlayCell(e.trolley,tt.restricted,.88,.1),this.scene.drawPath(e.travelled,tt.frontier),this.scene.drawPath(e.revised.path,tt.route),e.goalReached?(this.stepLabel.set("Phase 5: Detour Committed \xB7 Executing Revised Route"),this.statusMessage.set(`Detour confirmed through an open bypass. Circumventing trolley at [${e.trolley.join(", ")}].`),await this.sleep(600),await this.scene.driveRobot(e.revised.path,this.getDriveDelay(),(t,i)=>{this.statusMessage.set(`AMR executing detour: waypoint ${i+1} of ${e.revised.path.length} at [${t.join(", ")}].`)}),this.scene.celebrateGoal(),this.stepLabel.set("Mission Complete \xB7 1 Replan \xB7 Goal Reached!"),this.statusMessage.set(`Delivered to Dispatch [${this.scenario()?.goal.join(", ")}]! Total journey: ${e.moves} moves, total cost: ${e.totalCost} (1 Replan).`)):(this.stepLabel.set("Replan Failed \xB7 No Alternative Route Exists"),this.statusMessage.set("A* search exhausted: no feasible path exists from current position to destination.")),this.isRunning.set(!1),this.systemStatus.set("complete"),this.loadComparison()},error:()=>{this.isRunning.set(!1),this.systemStatus.set("error"),this.statusMessage.set("Dynamic trolley experiment failed on backend.")}}))}static \u0275fac=function(t){return new(t||n)};static \u0275prov=ht({token:n,factory:n.\u0275fac,providedIn:"root"})};var Lp=class n{store=_e(Ci);openGuide=ef();static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Bn({type:n,selectors:[["app-header"]],outputs:{openGuide:"openGuide"},decls:36,vars:10,consts:[[1,"topbar"],[1,"brand"],["aria-hidden","true",1,"brand-glyph"],[1,"box-face","top"],[1,"box-face","left"],[1,"box-face","right"],[1,"brand-text"],[1,"badge"],[1,"center-status"],[1,"status-indicator"],[1,"pulse-dot"],[1,"status-text"],[1,"controls-right"],["role","group","aria-label","Playback speed",1,"speed-selector"],[1,"speed-label"],[1,"speed-pills"],["type","button","aria-label","0.5x speed",3,"click"],["type","button","aria-label","1x speed",3,"click"],["type","button","aria-label","2x speed",3,"click"],["type","button","aria-label","4x speed",3,"click"],["type","button","aria-label","Open operator guide","title","Open operator guide",1,"guide-btn",3,"click"],["width","16","height","16","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2"],["cx","12","cy","12","r","10"],["d","M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"],["x1","12","y1","17","x2","12.01","y2","17"]],template:function(t,i){t&1&&(B(0,"header",0)(1,"div",1)(2,"div",2),bt(3,"span",3)(4,"span",4)(5,"span",5),j(),B(6,"div",6)(7,"h1"),Y(8,"Warehouse Route Lab"),j(),B(9,"span",7),Y(10,"AI-04 \xB7 Autonomous Navigation"),j()()(),B(11,"div",8)(12,"div",9),bt(13,"span",10),B(14,"span",11),Y(15),j()()(),B(16,"div",12)(17,"div",13)(18,"span",14),Y(19,"Speed"),j(),B(20,"div",15)(21,"button",16),Lt("click",function(){return i.store.setSpeed(1)}),Y(22," 0.5\xD7 "),j(),B(23,"button",17),Lt("click",function(){return i.store.setSpeed(2)}),Y(24," 1.0\xD7 "),j(),B(25,"button",18),Lt("click",function(){return i.store.setSpeed(3)}),Y(26," 2.0\xD7 "),j(),B(27,"button",19),Lt("click",function(){return i.store.setSpeed(4)}),Y(28," 4.0\xD7 "),j()()(),B(29,"button",20),Lt("click",function(){return i.openGuide.emit()}),Dn(),B(30,"svg",21),bt(31,"circle",22)(32,"path",23)(33,"line",24),j(),Yn(),B(34,"span"),Y(35,"Guide"),j()()()()),t&2&&(Ue(12),Dr("data-status",i.store.systemStatus()),Ue(3),Sn(i.store.statusMessage()),Ue(6),Vn("active",i.store.playbackSpeed()===1),Ue(2),Vn("active",i.store.playbackSpeed()===2),Ue(2),Vn("active",i.store.playbackSpeed()===3),Ue(2),Vn("active",i.store.playbackSpeed()===4))},dependencies:[Zn],styles:[".topbar[_ngcontent-%COMP%]{height:64px;padding:0 var(--%NS%space-5);display:flex;align-items:center;justify-content:space-between;background:var(--%NS%surface-card);border-bottom:1px solid var(--%NS%border-subtle);position:sticky;top:0;z-index:40}.brand[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--%NS%space-3)}.brand-glyph[_ngcontent-%COMP%]{width:28px;height:28px;position:relative;perspective:120px}.box-face[_ngcontent-%COMP%]{position:absolute;border:1px solid rgba(45,212,191,.4)}.box-face.top[_ngcontent-%COMP%]{width:18px;height:18px;background:#2dd4bf40;transform:rotateX(60deg) rotate(45deg);top:1px;left:5px}.box-face.left[_ngcontent-%COMP%]{width:13px;height:14px;background:#2dd4bf66;top:10px;left:2px;transform:skewY(28deg)}.box-face.right[_ngcontent-%COMP%]{width:13px;height:14px;background:#2dd4bf26;top:10px;right:2px;transform:skewY(-28deg)}.brand-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:15px;font-weight:600;letter-spacing:-.01em;color:var(--%NS%text-primary)}.badge[_ngcontent-%COMP%]{font-size:11px;font-family:var(--%NS%font-mono);color:var(--%NS%text-tertiary)}.center-status[_ngcontent-%COMP%]{display:flex;align-items:center;max-width:480px;overflow:hidden}.status-indicator[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:var(--%NS%space-2);padding:4px var(--%NS%space-3);border-radius:var(--%NS%radius-full);background:var(--%NS%surface-elevated);border:1px solid var(--%NS%border-subtle);font-size:12px;color:var(--%NS%text-secondary);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.pulse-dot[_ngcontent-%COMP%]{width:6px;height:6px;border-radius:50%;background:var(--%NS%accent-success);box-shadow:0 0 8px var(--%NS%accent-success);flex-shrink:0}[data-status=running][_ngcontent-%COMP%]   .pulse-dot[_ngcontent-%COMP%]{background:var(--%NS%accent-frontier);box-shadow:0 0 8px var(--%NS%accent-frontier);animation:_ngcontent-%COMP%_pulse 1s infinite alternate}[data-status=error][_ngcontent-%COMP%]   .pulse-dot[_ngcontent-%COMP%]{background:var(--%NS%accent-danger);box-shadow:0 0 8px var(--%NS%accent-danger)}@keyframes _ngcontent-%COMP%_pulse{0%{opacity:.4}to{opacity:1}}.controls-right[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--%NS%space-4)}.speed-selector[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--%NS%space-2)}.speed-label[_ngcontent-%COMP%]{font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.04em;color:var(--%NS%text-tertiary)}.speed-pills[_ngcontent-%COMP%]{display:flex;background:var(--%NS%surface-elevated);border:1px solid var(--%NS%border-subtle);border-radius:var(--%NS%radius-sm);padding:2px;gap:2px}.speed-pills[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:3px 8px;font-size:11px;font-family:var(--%NS%font-mono);background:transparent;border:none;border-radius:4px;cursor:pointer;color:var(--%NS%text-secondary);transition:all .15s ease}.speed-pills[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{color:var(--%NS%text-primary)}.speed-pills[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]{background:var(--%NS%surface-subtle);color:var(--%NS%accent-frontier);font-weight:600}.guide-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 var(--%NS%space-3);border-radius:var(--%NS%radius-sm);background:var(--%NS%surface-elevated);border:1px solid var(--%NS%border-subtle);color:var(--%NS%text-secondary);cursor:pointer;font-size:12px;font-weight:500;transition:all .15s ease}.guide-btn[_ngcontent-%COMP%]:hover{background:var(--%NS%surface-subtle);color:var(--%NS%text-primary);border-color:var(--%NS%border-hover)}@media(max-width:900px){.center-status[_ngcontent-%COMP%]{display:none}}"]})};var Fp=class n{store=_e(Ci);static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Bn({type:n,selectors:[["app-control-panel"]],decls:111,vars:18,consts:[["aria-label","Simulation configuration and triggers",1,"control-panel"],[1,"panel-section"],[1,"section-header"],[1,"section-eyebrow"],["role","group","aria-label","Select search algorithm",1,"algorithm-grid"],["type","button",1,"algo-card",3,"click","disabled"],[1,"algo-title-row"],[1,"algo-name"],[1,"algo-tag","optimal"],[1,"algo-desc"],[1,"algo-tag"],[1,"panel-section","actions"],["type","button","aria-label","Generate a new random warehouse grid",1,"btn-secondary",3,"click","disabled"],["aria-hidden","true"],["type","button",1,"btn-primary",3,"click","disabled"],["width","14","height","14","viewBox","0 0 24 24","fill","currentColor"],["points","5 3 19 12 5 21 5 3"],["type","button",1,"btn-secondary",3,"click","disabled"],["width","14","height","14","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2"],["d","m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"],["x1","12","y1","9","x2","12","y2","13"],["x1","12","y1","17","x2","12.01","y2","17"],[1,"panel-section","overlays"],[1,"switch-row"],[1,"switch-meta"],[1,"switch-title"],[1,"switch-sub"],["type","checkbox",3,"change","checked"],[1,"slider"],[1,"panel-section","legend"],[1,"legend-grid"],[1,"legend-item"],[1,"swatch","normal"],[1,"swatch","crowded"],[1,"swatch","shelf"],[1,"swatch","restricted"],[1,"swatch","frontier"],[1,"swatch","route"]],template:function(t,i){t&1&&(B(0,"aside",0)(1,"section",1)(2,"header",2)(3,"span",3),Y(4,"Search Protocol"),j(),B(5,"h2"),Y(6,"Algorithm Strategy"),j()(),B(7,"div",4)(8,"button",5),Lt("click",function(){return i.store.selectAlgorithm("astar")}),B(9,"div",6)(10,"span",7),Y(11,"A* Search"),j(),B(12,"span",8),Y(13,"Optimal"),j()(),B(14,"p",9),Y(15,"Minimizes path cost using f(n) = g(n) + h(n)"),j()(),B(16,"button",5),Lt("click",function(){return i.store.selectAlgorithm("bfs")}),B(17,"div",6)(18,"span",7),Y(19,"BFS"),j(),B(20,"span",10),Y(21,"Fewest Hops"),j()(),B(22,"p",9),Y(23,"FIFO level-order queue; ignores terrain cost"),j()(),B(24,"button",5),Lt("click",function(){return i.store.selectAlgorithm("greedy")}),B(25,"div",6)(26,"span",7),Y(27,"Greedy Best"),j(),B(28,"span",10),Y(29,"Heuristic"),j()(),B(30,"p",9),Y(31,"Follows h(n) distance; vulnerable to cost traps"),j()(),B(32,"button",5),Lt("click",function(){return i.store.selectAlgorithm("dfs")}),B(33,"div",6)(34,"span",7),Y(35,"DFS"),j(),B(36,"span",10),Y(37,"Deep First"),j()(),B(38,"p",9),Y(39,"LIFO stack traversal; non-optimal depth probe"),j()()()(),B(40,"section",11)(41,"button",12),Lt("click",function(){return i.store.generateRandomScenario()}),B(42,"span",13),Y(43,"\u2928"),j(),B(44,"span"),Y(45,"Generate Random Grid"),j()(),B(46,"button",14),Lt("click",function(){return i.store.runSelected()}),Dn(),B(47,"svg",15),bt(48,"polygon",16),j(),Yn(),B(49,"span"),Y(50),j()(),B(51,"button",17),Lt("click",function(){return i.store.runTrolley()}),Dn(),B(52,"svg",18),bt(53,"path",19)(54,"line",20)(55,"line",21),j(),Yn(),B(56,"span"),Y(57,"Simulate Hidden Trolley Event"),j()()(),B(58,"section",22)(59,"header",2)(60,"span",3),Y(61,"Scene Layers"),j(),B(62,"h3"),Y(63,"Visual Overlays"),j()(),B(64,"label",23)(65,"div",24)(66,"span",25),Y(67,"Decision Frontier"),j(),B(68,"span",26),Y(69,"Highlight queued search nodes in teal"),j()(),B(70,"input",27),Lt("change",function(s){return i.store.toggleFrontier(s.target.checked)}),j(),bt(71,"span",28),j(),B(72,"label",23)(73,"div",24)(74,"span",25),Y(75,"Cell Coordinates"),j(),B(76,"span",26),Y(77,"Display [row, col] reference sprites"),j()(),B(78,"input",27),Lt("change",function(s){return i.store.toggleLabels(s.target.checked)}),j(),bt(79,"span",28),j()(),B(80,"section",29)(81,"header",2)(82,"span",3),Y(83,"Map Reference"),j(),B(84,"h3"),Y(85,"Terrain Classification"),j()(),B(86,"div",30)(87,"div",31),bt(88,"span",32),B(89,"span"),Y(90,"Open Aisle (Cost 1)"),j()(),B(91,"div",31),bt(92,"span",33),B(93,"span"),Y(94,"Crowded (Cost 4)"),j()(),B(95,"div",31),bt(96,"span",34),B(97,"span"),Y(98,"Storage Rack"),j()(),B(99,"div",31),bt(100,"span",35),B(101,"span"),Y(102,"Hazard Barrier"),j()(),B(103,"div",31),bt(104,"span",36),B(105,"span"),Y(106,"Active Frontier"),j()(),B(107,"div",31),bt(108,"span",37),B(109,"span"),Y(110,"Committed Route"),j()()()()()),t&2&&(Ue(8),Vn("active",i.store.selectedAlgorithm()==="astar"),Si("disabled",i.store.isRunning()),Ue(8),Vn("active",i.store.selectedAlgorithm()==="bfs"),Si("disabled",i.store.isRunning()),Ue(8),Vn("active",i.store.selectedAlgorithm()==="greedy"),Si("disabled",i.store.isRunning()),Ue(8),Vn("active",i.store.selectedAlgorithm()==="dfs"),Si("disabled",i.store.isRunning()),Ue(9),Si("disabled",i.store.isRunning()),Ue(5),Si("disabled",i.store.isRunning()),Ue(4),An("Run ",i.store.selectedAlgorithm()==="astar"?"A*":i.store.selectedAlgorithm().toUpperCase()," Search"),Ue(),Si("disabled",i.store.isRunning()),Ue(19),Si("checked",i.store.showFrontier()),Ue(8),Si("checked",i.store.showLabels()))},dependencies:[Zn],styles:['.control-panel[_ngcontent-%COMP%]{padding:var(--%NS%space-5);background:var(--%NS%surface-card);border-right:1px solid var(--%NS%border-subtle);overflow-y:auto;display:flex;flex-direction:column;gap:var(--%NS%space-5)}.panel-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--%NS%space-3)}.section-eyebrow[_ngcontent-%COMP%]{font-size:11px;font-family:var(--%NS%font-mono);color:var(--%NS%accent-frontier);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:2px}.section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:15px;font-weight:600;color:var(--%NS%text-primary)}.section-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:13px;font-weight:600;color:var(--%NS%text-primary)}.algorithm-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:var(--%NS%space-2)}.algo-card[_ngcontent-%COMP%]{padding:var(--%NS%space-3);background:var(--%NS%surface-elevated);border:1px solid var(--%NS%border-subtle);border-radius:var(--%NS%radius-md);text-align:left;cursor:pointer;display:flex;flex-direction:column;gap:4px;transition:all .18s ease}.algo-card[_ngcontent-%COMP%]:hover:not(:disabled){border-color:var(--%NS%border-hover);background:var(--%NS%surface-subtle)}.algo-card.active[_ngcontent-%COMP%]{border-color:var(--%NS%accent-frontier);background:#2dd4bf14;box-shadow:inset 0 0 0 1px #2dd4bf33}.algo-card[_ngcontent-%COMP%]:disabled{opacity:.55;cursor:not-allowed}.algo-title-row[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.algo-name[_ngcontent-%COMP%]{font-size:13px;font-weight:600;color:var(--%NS%text-primary)}.algo-tag[_ngcontent-%COMP%]{font-size:10px;font-family:var(--%NS%font-mono);padding:1px 5px;border-radius:var(--%NS%radius-sm);background:#ffffff0f;color:var(--%NS%text-tertiary)}.algo-tag.optimal[_ngcontent-%COMP%]{background:#2dd4bf26;color:var(--%NS%accent-frontier)}.algo-desc[_ngcontent-%COMP%]{font-size:11px;color:var(--%NS%text-secondary);line-height:1.35}.actions[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--%NS%space-2);padding:var(--%NS%space-2) 0}.btn-primary[_ngcontent-%COMP%], .btn-secondary[_ngcontent-%COMP%]{height:40px;display:flex;align-items:center;justify-content:center;gap:var(--%NS%space-2);border-radius:var(--%NS%radius-sm);font-size:13px;font-weight:600;cursor:pointer;transition:all .18s ease}.btn-primary[_ngcontent-%COMP%]{background:var(--%NS%accent-frontier);color:#051b1c;border:none;box-shadow:var(--%NS%shadow-glow-teal)}.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled){background:#5eead4;transform:translateY(-1px)}.btn-primary[_ngcontent-%COMP%]:disabled, .btn-secondary[_ngcontent-%COMP%]:disabled{opacity:.5;cursor:not-allowed;transform:none}.btn-secondary[_ngcontent-%COMP%]{background:#f59e0b14;border:1px solid rgba(245,158,11,.3);color:#fbbf24}.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled){background:#f59e0b29;border-color:#f59e0b80}.switch-row[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:var(--%NS%space-2) 0;cursor:pointer;position:relative}.switch-meta[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2px}.switch-title[_ngcontent-%COMP%]{font-size:12px;font-weight:500;color:var(--%NS%text-primary)}.switch-sub[_ngcontent-%COMP%]{font-size:11px;color:var(--%NS%text-tertiary)}.switch-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{position:absolute;opacity:0;width:0;height:0}.slider[_ngcontent-%COMP%]{width:34px;height:18px;background:var(--%NS%surface-subtle);border:1px solid var(--%NS%border-subtle);border-radius:var(--%NS%radius-full);position:relative;transition:all .2s ease;flex-shrink:0}.slider[_ngcontent-%COMP%]:before{content:"";position:absolute;width:12px;height:12px;left:2px;top:2px;background:var(--%NS%text-tertiary);border-radius:50%;transition:all .2s ease}.switch-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked + .slider[_ngcontent-%COMP%]{background:#2dd4bf33;border-color:var(--%NS%accent-frontier)}.switch-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked + .slider[_ngcontent-%COMP%]:before{transform:translate(16px);background:var(--%NS%accent-frontier)}.legend-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:var(--%NS%space-2)}.legend-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--%NS%space-2);font-size:11px;color:var(--%NS%text-secondary)}.swatch[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:2px;flex-shrink:0}.swatch.normal[_ngcontent-%COMP%]{background:#132230;border:1px solid #1e3347}.swatch.crowded[_ngcontent-%COMP%]{background:var(--%NS%accent-crowded)}.swatch.shelf[_ngcontent-%COMP%]{background:var(--%NS%accent-shelf)}.swatch.restricted[_ngcontent-%COMP%]{background:var(--%NS%accent-danger)}.swatch.frontier[_ngcontent-%COMP%]{background:var(--%NS%accent-frontier)}.swatch.route[_ngcontent-%COMP%]{background:var(--%NS%accent-route)}']})};var d2=["canvasHost"],kp=class n{canvasHostRef;scene=_e(qa);store=_e(Ci);ngOnInit(){this.scene.init(this.canvasHostRef.nativeElement),this.store.init()}ngOnDestroy(){this.scene.destroy()}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Bn({type:n,selectors:[["app-stage-3d"]],viewQuery:function(t,i){if(t&1&&ir(d2,7),t&2){let r;Li(r=Fi())&&(i.canvasHostRef=r.first)}},decls:28,vars:2,consts:[["canvasHost",""],["aria-label","3D warehouse simulation stage",1,"stage-container"],["role","img","aria-label","Interactive 3D simulation of warehouse robot grid",1,"webgl-canvas"],[1,"viewport-tools"],["type","button","title","Reset Isometric Camera","aria-label","Reset isometric camera",1,"tool-btn",3,"click"],["width","15","height","15","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2"],["d","m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"],["points","9 22 9 12 15 12 15 22"],["type","button","title","Top-Down Plan View","aria-label","Top-down plan view",1,"tool-btn",3,"click"],["width","18","height","18","x","3","y","3","rx","2"],["d","M3 9h18M3 15h18M9 3v18M15 3v18"],[1,"stage-hud"],[1,"hud-main"],[1,"hud-step"],[1,"hud-msg"],[1,"hud-key"],[1,"key-item"],[1,"key-dot","current"],[1,"key-dot","candidate"],[1,"key-dot","route"]],template:function(t,i){t&1&&(B(0,"div",1),bt(1,"div",2,0),B(3,"div",3)(4,"button",4),Lt("click",function(){return i.store.resetCamera()}),Dn(),B(5,"svg",5),bt(6,"path",6)(7,"polyline",7),j()(),Yn(),B(8,"button",8),Lt("click",function(){return i.store.topCamera()}),Dn(),B(9,"svg",5),bt(10,"rect",9)(11,"path",10),j()()(),Yn(),B(12,"div",11)(13,"div",12)(14,"span",13),Y(15),j(),B(16,"p",14),Y(17),j()(),B(18,"div",15)(19,"span",16),bt(20,"i",17),Y(21,"Expanding"),j(),B(22,"span",16),bt(23,"i",18),Y(24,"Candidate"),j(),B(25,"span",16),bt(26,"i",19),Y(27,"Route"),j()()()()),t&2&&(Ue(15),Sn(i.store.stepLabel()),Ue(2),Sn(i.store.statusMessage()))},dependencies:[Zn],styles:[".stage-container[_ngcontent-%COMP%]{position:relative;width:100%;height:100%;min-height:520px;background:var(--%NS%surface-ground);overflow:hidden;display:flex;flex-direction:column}.webgl-canvas[_ngcontent-%COMP%]{width:100%;height:100%;flex:1;display:block}.viewport-tools[_ngcontent-%COMP%]{position:absolute;top:var(--%NS%space-4);right:var(--%NS%space-4);display:flex;flex-direction:column;gap:var(--%NS%space-2);z-index:10}.tool-btn[_ngcontent-%COMP%]{width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--%NS%surface-card);border:1px solid var(--%NS%border-subtle);border-radius:var(--%NS%radius-sm);color:var(--%NS%text-secondary);cursor:pointer;box-shadow:var(--%NS%shadow-card);transition:all .15s ease}.tool-btn[_ngcontent-%COMP%]:hover{background:var(--%NS%surface-elevated);color:var(--%NS%text-primary);border-color:var(--%NS%border-hover)}.stage-hud[_ngcontent-%COMP%]{position:absolute;bottom:var(--%NS%space-4);left:var(--%NS%space-4);right:var(--%NS%space-4);display:flex;align-items:center;justify-content:space-between;padding:var(--%NS%space-3) var(--%NS%space-4);background:#121820e0;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border:1px solid var(--%NS%border-subtle);border-radius:var(--%NS%radius-md);box-shadow:var(--%NS%shadow-card);z-index:10;gap:var(--%NS%space-4)}.hud-main[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2px;min-width:0}.hud-step[_ngcontent-%COMP%]{font-size:11px;font-family:var(--%NS%font-mono);color:var(--%NS%accent-frontier);text-transform:uppercase;letter-spacing:.05em}.hud-msg[_ngcontent-%COMP%]{font-size:13px;font-weight:500;color:var(--%NS%text-primary);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.hud-key[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--%NS%space-3);flex-shrink:0}.key-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--%NS%text-tertiary)}.key-dot[_ngcontent-%COMP%]{width:8px;height:8px;border-radius:2px}.key-dot.current[_ngcontent-%COMP%]{background:#fff}.key-dot.candidate[_ngcontent-%COMP%]{background:var(--%NS%accent-candidate)}.key-dot.route[_ngcontent-%COMP%]{background:var(--%NS%accent-route)}@media(max-width:768px){.stage-hud[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start;bottom:var(--%NS%space-2);left:var(--%NS%space-2);right:var(--%NS%space-2);padding:var(--%NS%space-2) var(--%NS%space-3)}.hud-key[_ngcontent-%COMP%]{display:none}}"]})};var f2=["feedContainer"],h2=["costVal"],p2=["movesVal"],m2=(n,e)=>e.index;function g2(n,e){n&1&&(B(0,"div",21),Dn(),B(1,"svg",25),bt(2,"circle",26)(3,"line",27)(4,"line",28),j(),Yn(),B(5,"p"),Y(6,"Expansion events will stream here during search execution."),j()())}function y2(n,e){if(n&1&&(B(0,"div",29)(1,"span",30),Y(2),j(),B(3,"div",31)(4,"div",32)(5,"strong"),Y(6),j()(),B(7,"p",33),Y(8),j()()()),n&2){let t=e.$implicit;Ue(2),Sn(t.index),Ue(4),An("Expand [",t.current.join(", "),"]"),Ue(2),Sn(t.detail)}}function v2(n,e){if(n&1&&Vc(0,y2,9,3,"div",29,m2),n&2){let t=fo();Hc(t.store.feedEvents())}}var Up=class n{feedContainerRef;costValRef;movesValRef;store=_e(Ci);animation=_e(nc);constructor(){Zo(()=>{if(this.store.feedEvents().length>0&&this.feedContainerRef){let t=this.feedContainerRef.nativeElement;t.scrollTop=t.scrollHeight}}),Zo(()=>{let e=this.store.totalCost();this.costValRef&&this.animation.animateCounter(this.costValRef.nativeElement,0,e,300)}),Zo(()=>{let e=this.store.moves();this.movesValRef&&this.animation.animateCounter(this.movesValRef.nativeElement,0,e,300)})}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Bn({type:n,selectors:[["app-telemetry-panel"]],viewQuery:function(t,i){if(t&1&&ir(f2,5)(h2,5)(p2,5),t&2){let r;Li(r=Fi())&&(i.feedContainerRef=r.first),Li(r=Fi())&&(i.costValRef=r.first),Li(r=Fi())&&(i.movesValRef=r.first)}},decls:69,vars:14,consts:[["costVal",""],["movesVal",""],["feedContainer",""],["aria-label","Real-time search telemetry and decision feed",1,"telemetry-panel"],[1,"telemetry-header"],[1,"telemetry-eyebrow"],[1,"state-pill"],[1,"metrics-grid"],[1,"metric-card","hero","cost"],[1,"metric-label"],[1,"metric-value-row"],[1,"metric-val","hero-num"],[1,"metric-unit"],[1,"metric-sub"],[1,"metric-card","hero","moves"],[1,"metric-card","sub"],[1,"metric-val"],[1,"feed-section"],[1,"feed-header"],[1,"feed-count"],["tabindex","0","aria-label","Historical expansion log",1,"feed-scroll"],[1,"empty-feed"],[1,"heuristic-card"],[1,"card-icon"],[1,"card-text"],["width","24","height","24","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","1.5"],["cx","12","cy","12","r","10"],["x1","12","y1","8","x2","12","y2","12"],["x1","12","y1","16","x2","12.01","y2","16"],[1,"feed-item"],[1,"feed-badge"],[1,"feed-content"],[1,"feed-top"],[1,"feed-detail"]],template:function(t,i){t&1&&(B(0,"aside",3)(1,"header",4)(2,"div")(3,"span",5),Y(4,"Real-Time Telemetry"),j(),B(5,"h2"),Y(6),j()(),B(7,"span",6),Y(8),ca(9,"uppercase"),j()(),B(10,"section",7)(11,"article",8)(12,"span",9),Y(13,"Total Path Cost"),j(),B(14,"div",10)(15,"strong",11,0),Y(17),j(),B(18,"span",12),Y(19,"cost"),j()(),B(20,"span",13),Y(21,"Open = 1 \xB7 Crowded = 4"),j()(),B(22,"article",14)(23,"span",9),Y(24,"Path Length"),j(),B(25,"div",10)(26,"strong",11,1),Y(28),j(),B(29,"span",12),Y(30,"moves"),j()(),B(31,"span",13),Y(32,"Orthogonal steps"),j()(),B(33,"article",15)(34,"span",9),Y(35,"Nodes Expanded"),j(),B(36,"div",10)(37,"strong",16),Y(38),j(),B(39,"span",12),Y(40,"nodes"),j()()(),B(41,"article",15)(42,"span",9),Y(43,"Execution Time"),j(),B(44,"div",10)(45,"strong",16),Y(46),ca(47,"number"),j(),B(48,"span",12),Y(49,"ms"),j()()()(),B(50,"section",17)(51,"div",18)(52,"h3"),Y(53,"Decision Feed"),j(),B(54,"span",19),Y(55),j()(),B(56,"div",20,2),ls(58,g2,7,0,"div",21)(59,v2,2,0),j()(),B(60,"section",22)(61,"div",23)(62,"span"),Y(63,"h(n)"),j()(),B(64,"div",24)(65,"strong"),Y(66,"Manhattan Distance Heuristic"),j(),B(67,"p"),Y(68," Admissible and monotone lower bound: with strictly 4-directional moves and min step cost of 1, |\u0394row| + |\u0394col| never exceeds true remaining travel cost. "),j()()()()),t&2&&(Ue(6),An("",i.store.selectedAlgorithm()==="astar"?"A*":i.store.selectedAlgorithm().toUpperCase()," Search Analysis"),Ue(),Dr("data-state",i.store.systemStatus()),Ue(),An(" ",xy(9,9,i.store.systemStatus())," "),Ue(9),Sn(i.store.totalCost()),Ue(11),Sn(i.store.moves()),Ue(10),Sn(i.store.nodesExpanded()),Ue(8),Sn(jc(47,11,i.store.elapsedMs(),"1.2-3")),Ue(9),An("",i.store.feedEvents().length," events"),Ue(3),us(i.store.feedEvents().length===0?58:59))},dependencies:[Zn,wy,Kc],styles:[".telemetry-panel[_ngcontent-%COMP%]{padding:var(--%NS%space-5);background:var(--%NS%surface-card);border-left:1px solid var(--%NS%border-subtle);overflow-y:auto;display:flex;flex-direction:column;gap:var(--%NS%space-5)}.telemetry-eyebrow[_ngcontent-%COMP%]{font-size:11px;font-family:var(--%NS%font-mono);color:var(--%NS%accent-frontier);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:2px}.telemetry-header[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--%NS%space-2)}.telemetry-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:15px;font-weight:600;color:var(--%NS%text-primary)}.state-pill[_ngcontent-%COMP%]{font-size:10px;font-family:var(--%NS%font-mono);padding:3px 7px;border-radius:var(--%NS%radius-sm);background:var(--%NS%surface-elevated);border:1px solid var(--%NS%border-subtle);color:var(--%NS%text-tertiary);letter-spacing:.05em}[data-state=running][_ngcontent-%COMP%]{color:var(--%NS%accent-frontier);border-color:#2dd4bf66;background:#2dd4bf14}[data-state=complete][_ngcontent-%COMP%]{color:var(--%NS%accent-success);border-color:#10b98166;background:#10b98114}[data-state=error][_ngcontent-%COMP%]{color:var(--%NS%accent-danger);border-color:#f43f5e66;background:#f43f5e14}.metrics-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:var(--%NS%space-2)}.metric-card[_ngcontent-%COMP%]{padding:var(--%NS%space-3);background:var(--%NS%surface-elevated);border:1px solid var(--%NS%border-subtle);border-radius:var(--%NS%radius-md);display:flex;flex-direction:column;gap:2px}.metric-card.hero[_ngcontent-%COMP%]{grid-column:span 1;background:linear-gradient(180deg,var(--%NS%surface-elevated) 0%,rgba(18,24,32,.6) 100%)}.metric-card.hero.cost[_ngcontent-%COMP%]{border-top:2px solid var(--%NS%accent-route)}.metric-card.hero.moves[_ngcontent-%COMP%]{border-top:2px solid var(--%NS%accent-frontier)}.metric-label[_ngcontent-%COMP%]{font-size:11px;font-weight:500;color:var(--%NS%text-tertiary);text-transform:uppercase;letter-spacing:.04em}.metric-value-row[_ngcontent-%COMP%]{display:flex;align-items:baseline;gap:4px}.metric-val[_ngcontent-%COMP%]{font-family:var(--%NS%font-mono);font-size:16px;font-weight:600;color:var(--%NS%text-primary)}.hero-num[_ngcontent-%COMP%]{font-size:24px;font-weight:700}.metric-unit[_ngcontent-%COMP%]{font-size:11px;color:var(--%NS%text-tertiary);font-family:var(--%NS%font-mono)}.metric-sub[_ngcontent-%COMP%]{font-size:10px;color:var(--%NS%text-tertiary);margin-top:2px}.feed-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--%NS%space-2);flex:1;min-height:220px}.feed-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.feed-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--%NS%text-secondary)}.feed-count[_ngcontent-%COMP%]{font-size:11px;font-family:var(--%NS%font-mono);color:var(--%NS%text-tertiary)}.feed-scroll[_ngcontent-%COMP%]{height:240px;overflow-y:auto;border:1px solid var(--%NS%border-subtle);border-radius:var(--%NS%radius-md);background:var(--%NS%surface-elevated);padding:var(--%NS%space-2);display:flex;flex-direction:column;gap:var(--%NS%space-2)}.empty-feed[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--%NS%space-2);color:var(--%NS%text-tertiary);text-align:center;padding:var(--%NS%space-4);font-size:12px}.feed-item[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:var(--%NS%space-2);padding:6px 8px;background:var(--%NS%surface-card);border:1px solid rgba(255,255,255,.03);border-radius:var(--%NS%radius-sm);animation:_ngcontent-%COMP%_fadeIn .18s ease-out}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}.feed-badge[_ngcontent-%COMP%]{width:20px;height:20px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#2dd4bf1f;color:var(--%NS%accent-frontier);font-size:10px;font-family:var(--%NS%font-mono);flex-shrink:0}.feed-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1px;min-width:0}.feed-top[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:12px;font-family:var(--%NS%font-mono);color:var(--%NS%text-primary)}.feed-detail[_ngcontent-%COMP%]{font-size:11px;color:var(--%NS%text-secondary);line-height:1.35}.heuristic-card[_ngcontent-%COMP%]{display:flex;gap:var(--%NS%space-3);padding:var(--%NS%space-3);background:#2dd4bf0a;border:1px solid rgba(45,212,191,.15);border-radius:var(--%NS%radius-md)}.card-icon[_ngcontent-%COMP%]{font-family:var(--%NS%font-mono);font-size:12px;font-weight:700;color:var(--%NS%accent-frontier);flex-shrink:0}.card-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;font-size:12px;color:var(--%NS%text-primary);margin-bottom:2px}.card-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:11px;color:var(--%NS%text-secondary);line-height:1.45}"]})};var _2=(n,e)=>e.algorithm;function x2(n,e){n&1&&(B(0,"tr")(1,"td",13),bt(2,"span",14),Y(3," Loading benchmark comparison data... "),j()())}function E2(n,e){n&1&&(B(0,"span",20),Y(1,"Lowest cost"),j())}function S2(n,e){n&1&&(B(0,"span",21),Y(1,"Dynamic detour"),j())}function b2(n,e){n&1&&(B(0,"span",22),Y(1,"Non-optimal"),j())}function M2(n,e){n&1&&(B(0,"span",22),Y(1,"Crowded penalty"),j())}function T2(n,e){n&1&&(B(0,"span",23),Y(1,"1 Replan"),j())}function w2(n,e){n&1&&(B(0,"span",24),Y(1,"0"),j())}function C2(n,e){if(n&1&&(B(0,"tr")(1,"td",16)(2,"strong"),Y(3),j()(),B(4,"td")(5,"span",17),Y(6),j()(),B(7,"td",18),Y(8),j(),B(9,"td",19)(10,"strong"),Y(11),j(),ls(12,E2,2,0,"span",20)(13,S2,2,0,"span",21)(14,b2,2,0,"span",22)(15,M2,2,0,"span",22),j(),B(16,"td",18),Y(17),j(),B(18,"td",18),ls(19,T2,2,0,"span",23)(20,w2,2,0,"span",24),j(),B(21,"td",18),Y(22),ca(23,"number"),j(),B(24,"td")(25,"span",25),Y(26),j()()()),n&2){let t=e.$implicit,i=fo(3);Vn("highlight",t.algorithm==="astar")("replan-row",t.algorithm==="astar_replan"),Ue(3),Sn(i.formatAlgorithmName(t.algorithm)),Ue(2),Vn("success",t.reached),Ue(),An(" ",t.reached?"Yes":"No"," "),Ue(2),An("",t.moves," moves"),Ue(3),Sn(t.totalCost),Ue(),us(t.algorithm==="astar"?12:t.algorithm==="astar_replan"?13:t.algorithm==="dfs"?14:15),Ue(5),An("",t.nodesExpanded," nodes"),Ue(2),us(t.replans&&t.replans>0?19:20),Ue(3),An("",jc(23,16,t.elapsedMs,"1.3-3")," ms"),Ue(3),Dr("data-algo",t.algorithm),Ue(),An(" ",i.getCharacteristic(t.algorithm)," ")}}function D2(n,e){if(n&1&&Vc(0,C2,27,19,"tr",15,_2),n&2){let t=fo(2);Hc(t.store.comparisonData())}}function A2(n,e){if(n&1&&(B(0,"div",10)(1,"table",11)(2,"thead")(3,"tr")(4,"th",12),Y(5,"Algorithm"),j(),B(6,"th",12),Y(7,"Goal Reached"),j(),B(8,"th",12),Y(9,"Path Length"),j(),B(10,"th",12),Y(11,"Total Cost"),j(),B(12,"th",12),Y(13,"Nodes Expanded"),j(),B(14,"th",12),Y(15,"Replans"),j(),B(16,"th",12),Y(17,"Execution Time"),j(),B(18,"th",12),Y(19,"Behavior & Optimality"),j()()(),B(20,"tbody"),ls(21,x2,4,0,"tr")(22,D2,2,0),j()()()),n&2){let t=fo();Ue(21),us(t.store.comparisonData().length===0?21:22)}}var Bp=class n{store=_e(Ci);isCollapsed=Jt(!1);toggleCollapsed(){this.isCollapsed.update(e=>!e)}formatAlgorithmName(e){switch(e){case"astar":return"A* (Baseline)";case"astar_replan":case"trolley_replan":return"A* (Trolley Replan)";case"bfs":return"BFS";case"dfs":return"DFS";case"greedy":return"Greedy Best";default:return e.toUpperCase()}}getCharacteristic(e){switch(e){case"astar":return"Cost-Optimal (Balances cost-so-far + Manhattan distance, avoids crowded corridor)";case"astar_replan":case"trolley_replan":return"Dynamic Obstacle Avoidance (detects the hidden trolley, updates the map, and replans)";case"bfs":return"Hop-Optimal (takes the short centre aisle without considering its crowded-cell cost)";case"greedy":return"Heuristic Trap (heads directly toward the goal through the crowded centre aisle)";case"dfs":return"LIFO Deep Dive (explores a long perimeter branch and is not path-optimal)";default:return"Standard Search"}}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Bn({type:n,selectors:[["app-comparison-dock"]],decls:14,vars:4,consts:[["aria-labelledby","comparison-heading",1,"comparison-dock"],["type","button","aria-controls","comparison-results",1,"dock-header",3,"click"],[1,"dock-title-group"],[1,"dock-eyebrow"],["id","comparison-heading"],[1,"dock-actions"],[1,"dock-sub"],["aria-hidden","true",1,"collapse-btn"],["width","16","height","16","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2"],["points","6 9 12 15 18 9"],["id","comparison-results",1,"table-wrap"],[1,"benchmark-table"],["scope","col"],["colspan","8",1,"loading-cell"],[1,"spinner"],[3,"highlight","replan-row"],[1,"cell-algo"],[1,"status-badge"],[1,"cell-mono"],[1,"cell-mono","cost-val"],[1,"cost-tag","best"],[1,"cost-tag","detour"],[1,"cost-tag","penalty"],[1,"replan-badge"],[1,"replan-zero"],[1,"char-tag"]],template:function(t,i){t&1&&(B(0,"section",0)(1,"button",1),Lt("click",function(){return i.toggleCollapsed()}),B(2,"div",2)(3,"span",3),Y(4,"Task 5 Evaluation Matrix"),j(),B(5,"h2",4),Y(6,"Performance Comparison & Replanning Metrics"),j()(),B(7,"div",5)(8,"span",6),Y(9,"Comparing step count vs operating cost & dynamic replans."),j(),B(10,"span",7),Dn(),B(11,"svg",8),bt(12,"polyline",9),j()()()(),ls(13,A2,23,1,"div",10),j()),t&2&&(Ue(),Dr("aria-expanded",!i.isCollapsed()),Ue(10),Kd("transform",i.isCollapsed()?"rotate(180deg)":"rotate(0)"),Ue(2),us(i.isCollapsed()?-1:13))},dependencies:[Zn,Kc],styles:[".comparison-dock[_ngcontent-%COMP%]{background:var(--%NS%surface-card);border-top:1px solid var(--%NS%border-subtle);transition:all .25s ease}.dock-header[_ngcontent-%COMP%]{width:100%;padding:var(--%NS%space-4) var(--%NS%space-5);display:flex;align-items:center;justify-content:space-between;cursor:pointer;-webkit-user-select:none;user-select:none;border:0;color:inherit;text-align:left;font:inherit}.dock-header[_ngcontent-%COMP%]:hover{background:var(--%NS%surface-elevated)}.dock-title-group[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:15px;font-weight:600;color:var(--%NS%text-primary)}.dock-eyebrow[_ngcontent-%COMP%]{font-size:11px;font-family:var(--%NS%font-mono);color:var(--%NS%accent-frontier);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:2px}.dock-actions[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--%NS%space-3)}.dock-sub[_ngcontent-%COMP%]{font-size:12px;color:var(--%NS%text-tertiary)}.collapse-btn[_ngcontent-%COMP%]{width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:var(--%NS%radius-sm);background:var(--%NS%surface-subtle);border:1px solid var(--%NS%border-subtle);color:var(--%NS%text-secondary);cursor:pointer}.table-wrap[_ngcontent-%COMP%]{padding:0 var(--%NS%space-5) var(--%NS%space-5);overflow-x:auto}.benchmark-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-size:13px;text-align:left;background:var(--%NS%surface-elevated);border:1px solid var(--%NS%border-subtle);border-radius:var(--%NS%radius-md);overflow:hidden}.benchmark-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:10px 14px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:var(--%NS%text-tertiary);border-bottom:1px solid var(--%NS%border-subtle);background:#0003}.benchmark-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:11px 14px;border-bottom:1px solid var(--%NS%border-subtle);color:var(--%NS%text-secondary)}.benchmark-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%]{border-bottom:none}.benchmark-table[_ngcontent-%COMP%]   tr.highlight[_ngcontent-%COMP%]{background:#2dd4bf0a}.benchmark-table[_ngcontent-%COMP%]   tr.replan-row[_ngcontent-%COMP%]{background:#f59e0b0a}.cell-algo[_ngcontent-%COMP%]{color:var(--%NS%text-primary)}.cell-mono[_ngcontent-%COMP%]{font-family:var(--%NS%font-mono);font-size:12px}.cost-val[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px}.cost-tag[_ngcontent-%COMP%]{font-size:10px;padding:1px 5px;border-radius:var(--%NS%radius-sm)}.cost-tag.best[_ngcontent-%COMP%]{background:#2dd4bf26;color:var(--%NS%accent-frontier);font-weight:600}.cost-tag.detour[_ngcontent-%COMP%]{background:#f59e0b26;color:var(--%NS%accent-candidate);font-weight:600}.cost-tag.penalty[_ngcontent-%COMP%]{background:#f43f5e1f;color:var(--%NS%accent-danger)}.replan-badge[_ngcontent-%COMP%]{display:inline-flex;font-size:10px;font-family:var(--%NS%font-mono);padding:2px 6px;border-radius:var(--%NS%radius-sm);background:#f59e0b26;color:var(--%NS%accent-candidate);font-weight:600}.replan-zero[_ngcontent-%COMP%]{color:var(--%NS%text-tertiary)}.status-badge[_ngcontent-%COMP%]{display:inline-flex;font-size:11px;font-family:var(--%NS%font-mono);padding:2px 6px;border-radius:var(--%NS%radius-sm);background:#ffffff0d;color:var(--%NS%text-tertiary)}.status-badge.success[_ngcontent-%COMP%]{background:#10b9811f;color:var(--%NS%accent-success)}.char-tag[_ngcontent-%COMP%]{font-size:11px;color:var(--%NS%text-secondary)}.char-tag[data-algo=astar][_ngcontent-%COMP%]{color:var(--%NS%accent-frontier);font-weight:500}.char-tag[data-algo=astar_replan][_ngcontent-%COMP%]{color:var(--%NS%accent-candidate);font-weight:500}.loading-cell[_ngcontent-%COMP%]{text-align:center;padding:var(--%NS%space-6);color:var(--%NS%text-tertiary)}.spinner[_ngcontent-%COMP%]{display:inline-block;width:14px;height:14px;border:2px solid var(--%NS%border-subtle);border-top-color:var(--%NS%accent-frontier);border-radius:50%;animation:_ngcontent-%COMP%_spin .7s linear infinite;vertical-align:middle;margin-right:6px}@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}@media(max-width:900px){.dock-sub[_ngcontent-%COMP%]{display:none}}"]})};var I2=["dialogRef"],Vp=class n{dialogRef;closed=ef();open(){this.dialogRef?.nativeElement.showModal()}close(){this.dialogRef?.nativeElement.close(),this.closed.emit()}onBackdropClick(e){e.target===this.dialogRef?.nativeElement&&this.close()}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Bn({type:n,selectors:[["app-guide-modal"]],viewQuery:function(t,i){if(t&1&&ir(I2,5),t&2){let r;Li(r=Fi())&&(i.dialogRef=r.first)}},outputs:{closed:"closed"},decls:69,vars:0,consts:[["dialogRef",""],[1,"guide-dialog",3,"click"],[1,"dialog-content"],[1,"dialog-header"],[1,"dialog-eyebrow"],["type","button","aria-label","Close guide",1,"close-btn",3,"click"],["width","18","height","18","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2"],["x1","18","y1","6","x2","6","y2","18"],["x1","6","y1","6","x2","18","y2","18"],[1,"guide-grid"],[1,"guide-card"],[1,"card-step"],[1,"dialog-footer"],[1,"footer-tip"],["type","button",1,"btn-done",3,"click"]],template:function(t,i){t&1&&(B(0,"dialog",1,0),Lt("click",function(s){return i.onBackdropClick(s)}),B(2,"div",2)(3,"header",3)(4,"div")(5,"span",4),Y(6,"Operator Manual"),j(),B(7,"h2"),Y(8,"How to Navigate the Simulation"),j()(),B(9,"button",5),Lt("click",function(){return i.close()}),Dn(),B(10,"svg",6),bt(11,"line",7)(12,"line",8),j()()(),Yn(),B(13,"div",9)(14,"article",10)(15,"div",11),Y(16,"01"),j(),B(17,"h3"),Y(18,"Select a Strategy"),j(),B(19,"p"),Y(20," Compare four pathfinding paradigms on the exact same warehouse topology. "),B(21,"strong"),Y(22,"BFS"),j(),Y(23," guarantees the minimum move count; "),B(24,"strong"),Y(25,"DFS"),j(),Y(26," probes a single branch deeply; "),B(27,"strong"),Y(28,"Greedy"),j(),Y(29," rushes toward the heuristic goal; and "),B(30,"strong"),Y(31,"A*"),j(),Y(32," mathematically balances accumulated path cost with remaining distance to guarantee minimal total cost. "),j()(),B(33,"article",10)(34,"div",11),Y(35,"02"),j(),B(36,"h3"),Y(37,"Observe the Wavefront"),j(),B(38,"p"),Y(39," The 3D warehouse floor projects the active search state in real time: "),B(40,"strong"),Y(41,"Teal tiles"),j(),Y(42," represent cells queued in the frontier; "),B(43,"strong"),Y(44,"Amber tiles"),j(),Y(45," represent newly evaluated neighboring candidates; the "),B(46,"strong"),Y(47,"pulsing white tile"),j(),Y(48," is being expanded; and the "),B(49,"strong"),Y(50,"golden beam"),j(),Y(51," indicates the final committed route. "),j()(),B(52,"article",10)(53,"div",11),Y(54,"03"),j(),B(55,"h3"),Y(56,"Test Dynamic Disruption"),j(),B(57,"p"),Y(58," Trigger the "),B(59,"strong"),Y(60,"Hidden Trolley Event"),j(),Y(61," to test sensor-horizon replanning. The obstacle is absent from the robot's initial dispatch map. The AMR travels along its planned path until proximity sensors detect the trolley 1 cell ahead. It halts, updates its internal belief map, and replans an optimal avoidance route using A*. "),j()()(),B(62,"footer",12)(63,"div",13)(64,"strong"),Y(65,"Camera Tip:"),j(),Y(66," Left-click and drag to orbit in 3D; right-click to pan; scroll to zoom. Use the top-right toolbar for instant top-down and isometric resets. "),j(),B(67,"button",14),Lt("click",function(){return i.close()}),Y(68,"Got it"),j()()()())},dependencies:[Zn],styles:[".guide-dialog[_ngcontent-%COMP%]{width:min(800px,100vw - 32px);border:1px solid var(--%NS%border-subtle);border-radius:var(--%NS%radius-lg);background:var(--%NS%surface-card);color:var(--%NS%text-primary);padding:0;margin:auto;box-shadow:var(--%NS%shadow-elevated)}.guide-dialog[_ngcontent-%COMP%]::backdrop{background:#04080ebf;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.dialog-content[_ngcontent-%COMP%]{padding:var(--%NS%space-6);display:flex;flex-direction:column;gap:var(--%NS%space-5)}.dialog-header[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between}.dialog-eyebrow[_ngcontent-%COMP%]{font-size:11px;font-family:var(--%NS%font-mono);color:var(--%NS%accent-frontier);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:2px}.dialog-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:18px;font-weight:600;color:var(--%NS%text-primary)}.close-btn[_ngcontent-%COMP%]{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:var(--%NS%radius-sm);background:var(--%NS%surface-elevated);border:1px solid var(--%NS%border-subtle);color:var(--%NS%text-secondary);cursor:pointer;transition:all .15s ease}.close-btn[_ngcontent-%COMP%]:hover{background:var(--%NS%surface-subtle);color:var(--%NS%text-primary);border-color:var(--%NS%border-hover)}.guide-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--%NS%space-3)}.guide-card[_ngcontent-%COMP%]{padding:var(--%NS%space-4);background:var(--%NS%surface-elevated);border:1px solid var(--%NS%border-subtle);border-radius:var(--%NS%radius-md);display:flex;flex-direction:column;gap:var(--%NS%space-2)}.card-step[_ngcontent-%COMP%]{font-family:var(--%NS%font-mono);font-size:11px;font-weight:700;color:var(--%NS%accent-frontier)}.guide-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:14px;font-weight:600;color:var(--%NS%text-primary)}.guide-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:12px;color:var(--%NS%text-secondary);line-height:1.5}.guide-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:var(--%NS%text-primary)}.dialog-footer[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding-top:var(--%NS%space-4);border-top:1px solid var(--%NS%border-subtle);gap:var(--%NS%space-4)}.footer-tip[_ngcontent-%COMP%]{font-size:11px;color:var(--%NS%text-tertiary);line-height:1.4}.footer-tip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:var(--%NS%text-secondary)}.btn-done[_ngcontent-%COMP%]{height:36px;padding:0 var(--%NS%space-5);border-radius:var(--%NS%radius-sm);background:var(--%NS%accent-frontier);color:#051b1c;border:none;font-size:13px;font-weight:600;cursor:pointer;flex-shrink:0;transition:all .15s ease}.btn-done[_ngcontent-%COMP%]:hover{background:#5eead4}@media(max-width:768px){.guide-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.dialog-footer[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}}"]})};var R2=["guideModal"],Hp=class n{guideModal;onOpenGuide(){this.guideModal?.open()}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Bn({type:n,selectors:[["app-root"]],viewQuery:function(t,i){if(t&1&&ir(R2,5),t&2){let r;Li(r=Fi())&&(i.guideModal=r.first)}},decls:9,vars:0,consts:[["guideModal",""],[1,"studio-shell"],[3,"openGuide"],["id","main-content",1,"workspace-grid"],[1,"rail-controls"],[1,"stage-viewport"],[1,"rail-telemetry"]],template:function(t,i){t&1&&(ao(0,"div",1)(1,"app-header",2),Zd("openGuide",function(){return i.onOpenGuide()}),uo(),ao(2,"main",3),zc(3,"app-control-panel",4)(4,"app-stage-3d",5)(5,"app-telemetry-panel",6),uo(),zc(6,"app-comparison-dock")(7,"app-guide-modal",null,0),uo())},dependencies:[Lp,Fp,kp,Up,Bp,Vp],styles:[".studio-shell[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-height:100vh;background:var(--%NS%surface-ground)}.workspace-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:280px minmax(480px,1fr) 320px;min-height:calc(100vh - 64px);max-height:940px}.rail-controls[_ngcontent-%COMP%]{height:100%;overflow-y:auto}.stage-viewport[_ngcontent-%COMP%]{height:100%;min-width:0}.rail-telemetry[_ngcontent-%COMP%]{height:100%;overflow-y:auto}@media(max-width:1200px){.workspace-grid[_ngcontent-%COMP%]{grid-template-columns:260px 1fr;max-height:none}.rail-telemetry[_ngcontent-%COMP%]{grid-column:1/-1;border-left:none;border-top:1px solid var(--%NS%border-subtle)}}@media(max-width:768px){.workspace-grid[_ngcontent-%COMP%]{display:flex;flex-direction:column;max-height:none}.stage-viewport[_ngcontent-%COMP%]{height:48vh;min-height:380px;order:-1}.rail-controls[_ngcontent-%COMP%]{border-right:none;border-bottom:1px solid var(--%NS%border-subtle)}}"]})};Oy(Hp,ib).catch(n=>console.error(n));
