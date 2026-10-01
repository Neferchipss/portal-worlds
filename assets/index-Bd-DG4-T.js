const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./hub-CQXKSeXG.js","./Capsule-CAAjHJID.js","./portals-CEiaI1ve.js","./index--YOz5f2w.js","./fx-CRoevLXV.js","./grass-BlkuCv3v.js","./index-BOrqQdca.js","./reflection-CbyYwIKA.js","./outline-B2XbQAMz.js","./life-2ElI8OVv.js","./index-Dzs1l4Vi.js","./index-D2yp8B6S.js"])))=>i.map(i=>d[i]);
import{C as Ht,V as Q,M as mt,a as V,W as ye,H as Te,N as we,b as Nt,c as oe,U as me,S as J,A as Ft,d as Gt,R as Wt,e as qt,f as Qt,L as Xt,g as Zt,h as Yt,i as Kt,j as Jt,k as Lt,l as Re,D as Ot,m as ot,n as es,o as Ze,Z as Ye,p as Mt,q as wt,r as ts,s as ss,t as is,u as as,v as rt,w as os,x as rs,y as ns,T as xt,z as ls,P as ut,B as cs,E as us,F as hs,G as ds,I as fs,J as ps,K as ms,O as vs,Q as nt,X as gs,Y as xs}from"./Capsule-CAAjHJID.js";import{P as Ue,S as it,F as Oe,O as Ss,m as Ms,K as zt}from"./outline-B2XbQAMz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();const ws="modulepreload",bs=function(s,e){return new URL(s,e).href},bt={},be=function(e,t,a){let o=Promise.resolve();if(t&&t.length>0){let n=function(u){return Promise.all(u.map(l=>Promise.resolve(l).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};const r=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),p=h?.nonce||h?.getAttribute("nonce");o=n(t.map(u=>{if(u=bs(u,a),u in bt)return;bt[u]=!0;const l=u.endsWith(".css"),m=l?'[rel="stylesheet"]':"";if(!!a)for(let R=r.length-1;R>=0;R--){const N=r[R];if(N.href===u&&(!l||N.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${m}`))return;const v=document.createElement("link");if(v.rel=l?"stylesheet":ws,l||(v.as="script"),v.crossOrigin="",v.href=u,p&&v.setAttribute("nonce",p),document.head.appendChild(v),l)return new Promise((R,N)=>{v.addEventListener("load",R),v.addEventListener("error",()=>N(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(n){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=n,window.dispatchEvent(r),!r.defaultPrevented)throw n}return o.then(n=>{for(const r of n||[])r.status==="rejected"&&i(r.reason);return e().catch(i)})},ys=new Q,Ts=new Q,Ps=new Q,_s=28,Ke=.35,Cs=.22;class Es{constructor(e,t){this.camera=e,this.dom=t,this.collider=new Ht(new Q(0,Ke,0),new Q(0,1.45,0),Ke),this.velocity=new Q,this.onFloor=!1,this.octree=null,this.keys={},this.yaw=0,this.pitch=0,this.enabled=!0,this.padSeen=0,this._feel={amt:0,phase:0,t:0,dip:0,dipV:0,fall:0,wasGrounded:!0},addEventListener("keydown",a=>{this.keys[a.code]=!0}),addEventListener("keyup",a=>{this.keys[a.code]=!1}),document.addEventListener("mousemove",a=>{document.pointerLockElement===t&&(this.yaw-=a.movementX*.0022,this.pitch=mt.clamp(this.pitch-a.movementY*.0022,-1.45,1.45))})}get locked(){return document.pointerLockElement===this.dom}get padActive(){return this.padSeen>0&&performance.now()-this.padSeen<6e4}pollPad(){const e=navigator.getGamepads?navigator.getGamepads():[],t=Array.from(e||[]).find(u=>u&&u.connected);if(!t)return null;const a=(u,l)=>{const m=Math.hypot(u,l);if(m<.18)return[0,0];const M=Math.min(1,(m-.18)/.82)/m;return[u*M,l*M]},[o,i]=a(t.axes[0]||0,t.axes[1]||0),[n,r]=a(t.axes[2]||0,t.axes[3]||0),h=u=>!!t.buttons[u]?.pressed;return(o||i||n||r||t.buttons.some(u=>u.pressed))&&(this.padSeen=performance.now()),{mx:o,my:i,lx:n,ly:r,jump:h(0),sprint:h(4)||h(10)}}teleport(e,t=0){this.collider.start.set(e.x,e.y+Ke,e.z),this.collider.end.set(e.x,e.y+1.45,e.z),this.velocity.set(0,0,0),this.yaw=t,this.pitch=0,this.syncCamera()}feel(e){const t=this._feel,a=Math.hypot(this.velocity.x,this.velocity.z),o=this.onFloor,i=o?Math.min(a/4.4,1.6):0;t.amt+=(i-t.amt)*Math.min(1,e*6),t.phase+=e*Math.PI*(1.8+.5*Math.max(0,i-1)/.6)*(i>.05?1:0),t.t+=e,o&&!t.wasGrounded&&t.fall<-3&&(t.dipV-=Math.min(-t.fall,18)*.035),!o&&t.wasGrounded&&this.velocity.y>4&&(t.dipV+=.35),t.wasGrounded=o,o||(t.fall=this.velocity.y),t.dipV+=(-t.dip*90-t.dipV*14)*e,t.dip+=t.dipV*e;const n=t.amt,r=Math.max(0,n-1)/.6,h=(.5-.5*Math.cos(2*t.phase))*.034*Math.min(n,1)*(1+r*.5),p=Math.sin(t.phase)*.02*Math.min(n,1),u=1-Math.min(n,1),l=u*(Math.sin(t.t*1.25)*.018+Math.sin(t.t*.43+1)*.008);return{y:h+l+t.dip,x:p+u*Math.sin(t.t*.31)*.012,pitch:u*(Math.sin(t.t*1.25+.8)*.006+Math.sin(t.t*.37)*.004)+Math.sin(2*t.phase+.6)*.004*Math.min(n,1)-r*.02-t.dip*.2,roll:Math.sin(t.phase)*.006*Math.min(n,1)*(1+r*.4)+u*Math.sin(t.t*.53)*.004}}syncCamera(e=0){const t=e>0?this._off=this.feel(e):this._off||{x:0,y:0,pitch:0,roll:0};this.camera.position.copy(this.collider.end).y+=Cs+t.y,this.camera.rotation.set(this.pitch+t.pitch,this.yaw,t.roll,"YXZ"),this.camera.position.x+=Math.cos(this.yaw)*t.x,this.camera.position.z-=Math.sin(this.yaw)*t.x}collide(){this.onFloor=!1;const e=this.octree&&this.octree.capsuleIntersect(this.collider);e&&(this.onFloor=e.normal.y>.35,this.onFloor||this.velocity.addScaledVector(e.normal,-e.normal.dot(this.velocity)),e.depth>=1e-10&&this.collider.translate(e.normal.multiplyScalar(e.depth)))}update(e){const t=this.keys,a=ys.set(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),o=Ts.set(-a.z,0,a.x),i=this.pollPad(),n=t.ShiftLeft||t.ShiftRight||i?.sprint,r=(this.onFloor?24:7)*(n?1.6:1);if(this.enabled&&i&&(this.locked||this.padActive)){const p=2.6*e;this.yaw-=Math.sign(i.lx)*Math.abs(i.lx)**1.6*p,this.pitch=mt.clamp(this.pitch-Math.sign(i.ly)*Math.abs(i.ly)**1.6*p*.8,-1.45,1.45),this.velocity.addScaledVector(a,-i.my*r*e),this.velocity.addScaledVector(o,i.mx*r*e),this.onFloor&&i.jump&&(this.velocity.y=9)}this.enabled&&this.locked&&(t.KeyW&&this.velocity.addScaledVector(a,r*e),t.KeyS&&this.velocity.addScaledVector(a,-r*e),t.KeyA&&this.velocity.addScaledVector(o,-r*e),t.KeyD&&this.velocity.addScaledVector(o,r*e),this.onFloor&&t.Space&&(this.velocity.y=9));let h=Math.exp(-5.5*e)-1;this.onFloor||(this.velocity.y-=_s*e,h*=.12),this.velocity.addScaledVector(this.velocity,h),this.collider.translate(Ps.copy(this.velocity).multiplyScalar(e)),this.collide(),this.syncCamera(e)}get feet(){return this.collider.start.clone().setY(this.collider.start.y-Ke)}}const We={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class yt extends Ue{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,a){const o=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let n,r;this.inverse?(n=0,r=1):(n=1,r=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),i.buffers.stencil.setFunc(o.ALWAYS,n,4294967295),i.buffers.stencil.setClear(r),i.buffers.stencil.setLocked(!0),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(o.EQUAL,1,4294967295),i.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),i.buffers.stencil.setLocked(!0)}}class Ds extends Ue{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Rs{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const a=e.getSize(new V);this._width=a.width,this._height=a.height,t=new ye(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Te}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new it(We),this.copyPass.material.blending=we,this.clock=new Nt}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let a=!1;for(let o=0,i=this.passes.length;o<i;o++){const n=this.passes[o];if(n.enabled!==!1){if(n.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(o),n.render(this.renderer,this.writeBuffer,this.readBuffer,e,a),n.needsSwap){if(a){const r=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}yt!==void 0&&(n instanceof yt?a=!0:n instanceof Ds&&(a=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new V);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const a=this._width*this._pixelRatio,o=this._height*this._pixelRatio;this.renderTarget1.setSize(a,o),this.renderTarget2.setSize(a,o);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(a,o)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Us extends Ue{constructor(e,t,a=null,o=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=a,this.clearColor=o,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new oe}render(e,t,a){const o=e.autoClear;e.autoClear=!1;let i,n;this.overrideMaterial!==null&&(n=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=n),e.autoClear=o}}const As={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new oe(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class $e extends Ue{constructor(e,t,a,o){super(),this.strength=t!==void 0?t:1,this.radius=a,this.threshold=o,this.resolution=e!==void 0?new V(e.x,e.y):new V(256,256),this.clearColor=new oe(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);this.renderTargetBright=new ye(i,n,{type:Te}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let l=0;l<this.nMips;l++){const m=new ye(i,n,{type:Te});m.texture.name="UnrealBloomPass.h"+l,m.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(m);const M=new ye(i,n,{type:Te});M.texture.name="UnrealBloomPass.v"+l,M.texture.generateMipmaps=!1,this.renderTargetsVertical.push(M),i=Math.round(i/2),n=Math.round(n/2)}const r=As;this.highPassUniforms=me.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=o,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new J({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const h=[3,5,7,9,11];i=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);for(let l=0;l<this.nMips;l++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(h[l])),this.separableBlurMaterials[l].uniforms.invSize.value=new V(1/i,1/n),i=Math.round(i/2),n=Math.round(n/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const p=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=p,this.bloomTintColors=[new Q(1,1,1),new Q(1,1,1),new Q(1,1,1),new Q(1,1,1),new Q(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=We;this.copyUniforms=me.clone(u.uniforms),this.blendMaterial=new J({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Ft,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new oe,this.oldClearAlpha=1,this.basic=new Gt,this.fsQuad=new Oe(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let a=Math.round(e/2),o=Math.round(t/2);this.renderTargetBright.setSize(a,o);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(a,o),this.renderTargetsVertical[i].setSize(a,o),this.separableBlurMaterials[i].uniforms.invSize.value=new V(1/a,1/o),a=Math.round(a/2),o=Math.round(o/2)}render(e,t,a,o,i){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const n=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=a.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let r=this.renderTargetBright;for(let h=0;h<this.nMips;h++)this.fsQuad.material=this.separableBlurMaterials[h],this.separableBlurMaterials[h].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[h].uniforms.direction.value=$e.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[h]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[h].uniforms.colorTexture.value=this.renderTargetsHorizontal[h].texture,this.separableBlurMaterials[h].uniforms.direction.value=$e.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[h]),e.clear(),this.fsQuad.render(e),r=this.renderTargetsVertical[h];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(a),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=n}getSeperableBlurMaterial(e){const t=[];for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(e*e))/e);return new J({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new V(.5,.5)},direction:{value:new V(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new J({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}$e.BlurDirectionX=new V(1,0);$e.BlurDirectionY=new V(0,1);const Ns={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

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

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Fs extends Ue{constructor(){super();const e=Ns;this.uniforms=me.clone(e.uniforms),this.material=new Wt({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Oe(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,a){this.uniforms.tDiffuse.value=a.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},qt.getTransfer(this._outputColorSpace)===Qt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Xt?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Zt?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Yt?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Kt?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Jt?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Lt&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Je={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new V},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Re},cameraProjectionMatrixInverse:{value:new Re},cameraWorldMatrix:{value:new Re},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new Q(-1,-1,-1)},sceneBoxMax:{value:new Q(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;		
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif
		
		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {  
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {   
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}
		
		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif
			
			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {
				
				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w); 
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));
				
				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));
				
				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);	

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}		

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);		
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},et={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},ht={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function Ls(s=5){const e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=Os(e),a=t.length,o=new Uint8Array(a*4);for(let n=0;n<a;++n){const r=t[n],h=2*Math.PI*r/a,p=new Q(Math.cos(h),Math.sin(h),0).normalize();o[n*4]=(p.x*.5+.5)*255,o[n*4+1]=(p.y*.5+.5)*255,o[n*4+2]=127,o[n*4+3]=255}const i=new Ot(o,e,e);return i.wrapS=ot,i.wrapT=ot,i.needsUpdate=!0,i}function Os(s){const e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=e*e,a=Array(t).fill(0);let o=Math.floor(e/2),i=e-1;for(let n=1;n<=t;){if(o===-1&&i===e?(i=e-2,o=0):(i===e&&(i=0),o<0&&(o=e-1)),a[o*e+i]!==0){i-=2,o++;continue}else a[o*e+i]=n++;i++,o--}return a}const tt={defines:{SAMPLES:16,SAMPLE_VECTORS:It(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new V},cameraProjectionMatrixInverse:{value:new Re},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;
		
		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}
		
		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1    
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1    
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);
			
			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;
		
			denoised += w * neighborColor;
			totalWeight += w;
		}
		
		void main() {
			float depth = getDepth(vUv.xy);	
			vec3 viewNormal = getViewNormal(vUv);	
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);
		
			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}
		
			if (totalWeight > 0.) { 
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function It(s,e,t){const a=zs(s,e,t);let o="vec3[SAMPLES](";for(let i=0;i<s;i++){const n=a[i];o+=`vec3(${n.x}, ${n.y}, ${n.z})${i<s-1?",":")"}`}return o}function zs(s,e,t){const a=[];for(let o=0;o<s;o++){const i=2*Math.PI*e*o/s,n=Math.pow(o/(s-1),t);a.push(new Q(Math.cos(i),Math.sin(i),n))}return a}class Is{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(e,t,a){return e[0]*t+e[1]*a}dot3(e,t,a,o){return e[0]*t+e[1]*a+e[2]*o}dot4(e,t,a,o,i){return e[0]*t+e[1]*a+e[2]*o+e[3]*i}noise(e,t){let a,o,i;const n=.5*(Math.sqrt(3)-1),r=(e+t)*n,h=Math.floor(e+r),p=Math.floor(t+r),u=(3-Math.sqrt(3))/6,l=(h+p)*u,m=h-l,M=p-l,v=e-m,R=t-M;let N,U;v>R?(N=1,U=0):(N=0,U=1);const g=v-N+u,f=R-U+u,c=v-1+2*u,x=R-1+2*u,E=h&255,P=p&255,k=this.perm[E+this.perm[P]]%12,D=this.perm[E+N+this.perm[P+U]]%12,A=this.perm[E+1+this.perm[P+1]]%12;let _=.5-v*v-R*R;_<0?a=0:(_*=_,a=_*_*this.dot(this.grad3[k],v,R));let F=.5-g*g-f*f;F<0?o=0:(F*=F,o=F*F*this.dot(this.grad3[D],g,f));let X=.5-c*c-x*x;return X<0?i=0:(X*=X,i=X*X*this.dot(this.grad3[A],c,x)),70*(a+o+i)}noise3d(e,t,a){let o,i,n,r;const p=(e+t+a)*.3333333333333333,u=Math.floor(e+p),l=Math.floor(t+p),m=Math.floor(a+p),M=1/6,v=(u+l+m)*M,R=u-v,N=l-v,U=m-v,g=e-R,f=t-N,c=a-U;let x,E,P,k,D,A;g>=f?f>=c?(x=1,E=0,P=0,k=1,D=1,A=0):g>=c?(x=1,E=0,P=0,k=1,D=0,A=1):(x=0,E=0,P=1,k=1,D=0,A=1):f<c?(x=0,E=0,P=1,k=0,D=1,A=1):g<c?(x=0,E=1,P=0,k=0,D=1,A=1):(x=0,E=1,P=0,k=1,D=1,A=0);const _=g-x+M,F=f-E+M,X=c-P+M,ve=g-k+2*M,Pe=f-D+2*M,_e=c-A+2*M,K=g-1+3*M,ge=f-1+3*M,O=c-1+3*M,xe=u&255,Se=l&255,Me=m&255,ze=this.perm[xe+this.perm[Se+this.perm[Me]]]%12,Ae=this.perm[xe+x+this.perm[Se+E+this.perm[Me+P]]]%12,Ie=this.perm[xe+k+this.perm[Se+D+this.perm[Me+A]]]%12,te=this.perm[xe+1+this.perm[Se+1+this.perm[Me+1]]]%12;let se=.6-g*g-f*f-c*c;se<0?o=0:(se*=se,o=se*se*this.dot3(this.grad3[ze],g,f,c));let Z=.6-_*_-F*F-X*X;Z<0?i=0:(Z*=Z,i=Z*Z*this.dot3(this.grad3[Ae],_,F,X));let $=.6-ve*ve-Pe*Pe-_e*_e;$<0?n=0:($*=$,n=$*$*this.dot3(this.grad3[Ie],ve,Pe,_e));let re=.6-K*K-ge*ge-O*O;return re<0?r=0:(re*=re,r=re*re*this.dot3(this.grad3[te],K,ge,O)),32*(o+i+n+r)}noise4d(e,t,a,o){const i=this.grad4,n=this.simplex,r=this.perm,h=(Math.sqrt(5)-1)/4,p=(5-Math.sqrt(5))/20;let u,l,m,M,v;const R=(e+t+a+o)*h,N=Math.floor(e+R),U=Math.floor(t+R),g=Math.floor(a+R),f=Math.floor(o+R),c=(N+U+g+f)*p,x=N-c,E=U-c,P=g-c,k=f-c,D=e-x,A=t-E,_=a-P,F=o-k,X=D>A?32:0,ve=D>_?16:0,Pe=A>_?8:0,_e=D>F?4:0,K=A>F?2:0,ge=_>F?1:0,O=X+ve+Pe+_e+K+ge,xe=n[O][0]>=3?1:0,Se=n[O][1]>=3?1:0,Me=n[O][2]>=3?1:0,ze=n[O][3]>=3?1:0,Ae=n[O][0]>=2?1:0,Ie=n[O][1]>=2?1:0,te=n[O][2]>=2?1:0,se=n[O][3]>=2?1:0,Z=n[O][0]>=1?1:0,$=n[O][1]>=1?1:0,re=n[O][2]>=1?1:0,He=n[O][3]>=1?1:0,Ce=D-xe+p,Ee=A-Se+p,De=_-Me+p,je=F-ze+p,Ve=D-Ae+2*p,he=A-Ie+2*p,d=_-te+2*p,w=F-se+2*p,y=D-Z+3*p,L=A-$+3*p,G=_-re+3*p,H=F-He+3*p,W=D-1+4*p,b=A-1+4*p,I=_-1+4*p,de=F-1+4*p,q=N&255,ne=U&255,fe=g&255,le=f&255,Ne=r[q+r[ne+r[fe+r[le]]]]%32,ie=r[q+xe+r[ne+Se+r[fe+Me+r[le+ze]]]]%32,Fe=r[q+Ae+r[ne+Ie+r[fe+te+r[le+se]]]]%32,pe=r[q+Z+r[ne+$+r[fe+re+r[le+He]]]]%32,S=r[q+1+r[ne+1+r[fe+1+r[le+1]]]]%32;let z=.6-D*D-A*A-_*_-F*F;z<0?u=0:(z*=z,u=z*z*this.dot4(i[Ne],D,A,_,F));let T=.6-Ce*Ce-Ee*Ee-De*De-je*je;T<0?l=0:(T*=T,l=T*T*this.dot4(i[ie],Ce,Ee,De,je));let C=.6-Ve*Ve-he*he-d*d-w*w;C<0?m=0:(C*=C,m=C*C*this.dot4(i[Fe],Ve,he,d,w));let j=.6-y*y-L*L-G*G-H*H;j<0?M=0:(j*=j,M=j*j*this.dot4(i[pe],y,L,G,H));let Ge=.6-W*W-b*b-I*I-de*de;return Ge<0?v=0:(Ge*=Ge,v=Ge*Ge*this.dot4(i[S],W,b,I,de)),27*(u+l+m+M+v)}}class ce extends Ue{constructor(e,t,a,o,i,n,r){super(),this.width=a!==void 0?a:512,this.height=o!==void 0?o:512,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Ls(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new ye(this.width,this.height,{type:Te}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new J({defines:Object.assign({},Je.defines),uniforms:me.clone(Je.uniforms),vertexShader:Je.vertexShader,fragmentShader:Je.fragmentShader,blending:we,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new es,this.normalMaterial.blending=we,this.pdMaterial=new J({defines:Object.assign({},tt.defines),uniforms:me.clone(tt.uniforms),vertexShader:tt.vertexShader,fragmentShader:tt.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new J({defines:Object.assign({},et.defines),uniforms:me.clone(et.uniforms),vertexShader:et.vertexShader,fragmentShader:et.fragmentShader,blending:we}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new J({uniforms:me.clone(We.uniforms),vertexShader:We.vertexShader,fragmentShader:We.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:wt,blendDst:Ye,blendEquation:Ze,blendSrcAlpha:Mt,blendDstAlpha:Ye,blendEquationAlpha:Ze}),this.blendMaterial=new J({uniforms:me.clone(ht.uniforms),vertexShader:ht.vertexShader,fragmentShader:ht.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:ts,blendSrc:wt,blendDst:Ye,blendEquation:Ze,blendSrcAlpha:Mt,blendDstAlpha:Ye,blendEquationAlpha:Ze}),this.fsQuad=new Oe(null),this.originalClearColor=new oe,this.setGBuffer(i?i.depthTexture:void 0,i?i.normalTexture:void 0),n!==void 0&&this.updateGtaoMaterial(n),r!==void 0&&this.updatePdMaterial(r)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new ss,this.depthTexture.format=is,this.depthTexture.type=as,this.normalRenderTarget=new ye(this.width,this.height,{minFilter:rt,magFilter:rt,type:Te,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const a=this.normalTexture?1:0,o=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=a,this.gtaoMaterial.defines.DEPTH_SWIZZLING=o,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=a,this.pdMaterial.defines.DEPTH_SWIZZLING=o,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=It(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,a){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case ce.OUTPUT.Off:break;case ce.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=a.texture,this.copyMaterial.blending=we,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case ce.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=we,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case ce.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=we,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case ce.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case ce.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=we,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case ce.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=a.texture,this.copyMaterial.blending=we,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(e,t,a,o,i){e.getClearColor(this.originalClearColor);const n=e.getClearAlpha(),r=e.autoClear;e.setRenderTarget(a),e.autoClear=!1,o!=null&&(e.setClearColor(o),e.setClearAlpha(i||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=r,e.setClearColor(this.originalClearColor),e.setClearAlpha(n)}renderOverride(e,t,a,o,i){e.getClearColor(this.originalClearColor);const n=e.getClearAlpha(),r=e.autoClear;e.setRenderTarget(a),e.autoClear=!1,o=t.clearColor||o,i=t.clearAlpha||i,o!=null&&(e.setClearColor(o),e.setClearAlpha(i||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=r,e.setClearColor(this.originalClearColor),e.setClearAlpha(n)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(a){t.set(a,a.visible),(a.isPoints||a.isLine)&&(a.visible=!1)})}restoreVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(a){const o=t.get(a);a.visible=o}),t.clear()}generateNoise(e=64){const t=new Is,a=e*e*4,o=new Uint8Array(a);for(let n=0;n<e;n++)for(let r=0;r<e;r++){const h=n,p=r;o[(n*e+r)*4]=(t.noise(h,p)*.5+.5)*255,o[(n*e+r)*4+1]=(t.noise(h+e,p)*.5+.5)*255,o[(n*e+r)*4+2]=(t.noise(h,p+e)*.5+.5)*255,o[(n*e+r)*4+3]=(t.noise(h+e,p+e)*.5+.5)*255}const i=new Ot(o,e,e,os,rs);return i.wrapS=ot,i.wrapT=ot,i.needsUpdate=!0,i}}ce.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const js={uniforms:{tDiffuse:{value:null},tDepth:{value:null},uProjInv:{value:new Re},uCamWorld:{value:new Re},uPrevVP:{value:new Re},uAmt:{value:.35},uScale:{value:1}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse, tDepth; uniform mat4 uProjInv, uCamWorld, uPrevVP; uniform float uAmt, uScale;
    varying vec2 vUv;
    void main(){
      float d = texture2D(tDepth, vUv).x;
      vec4 ndc = vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
      vec4 v = uProjInv * ndc; v /= v.w;
      vec4 w = uCamWorld * v;
      if (d >= 1.0) w = uCamWorld * vec4(normalize(v.xyz) * 500.0, 1.0);    // sky: blur by rotation only
      vec4 p = uPrevVP * w;
      vec2 prev = p.xy / p.w * 0.5 + 0.5;
      vec2 vel = (vUv - prev) * uAmt * uScale;
      float L = length(vel);
      if (L > 0.02) vel *= 0.02 / L;                                        // cap at ~2% of the screen
      vec4 c = vec4(0.0);
      float j = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;   // per-pixel dither: no ghost steps
      for (int i = 0; i < 8; i++) c += texture2D(tDiffuse, vUv - vel * ((float(i) + j) / 7.0 - 0.5));
      gl_FragColor = c / 8.0;
    }`},Vs={uniforms:{tDiffuse:{value:null},uShadow:{value:new oe(.2,.13,.32)},uHighlight:{value:new oe(1,.93,.86)},uSat:{value:1.08},uVignette:{value:.32},uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform vec3 uShadow, uHighlight; uniform float uSat, uVignette, uTime;
    varying vec2 vUv;
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      float l = dot(c.rgb, vec3(0.299, 0.587, 0.114));
      c.rgb = mix(vec3(l), c.rgb, uSat);
      c.rgb = mix(c.rgb + uShadow * 0.12 * (1.0 - l), c.rgb * uHighlight, smoothstep(0.4, 1.0, l) * 0.5);
      vec2 v = vUv - 0.5; c.rgb *= 1.0 - uVignette * dot(v, v) * 2.2;
      gl_FragColor = c;
    }`};class Bs extends Ue{constructor(e){super(),this.outline=e,this.needsSwap=!1}render(){this.outline.renderScene()}}const Tt={uniforms:{tRaw:{value:null},tPaint:{value:null},tDepth:{value:null},uNear:{value:.1},uFar:{value:1e3},uRange:{value:new ns(4,30,.15,1)}},vertexShader:zt.vertexShader,fragmentShader:`
    #include <packing>
    uniform sampler2D tRaw, tPaint, tDepth; uniform float uNear, uFar; uniform vec4 uRange;
    varying vec2 vUv;
    void main(){
      float d = texture2D(tDepth, vUv).x;
      float z = d >= 0.99999 ? 1e6 : -perspectiveDepthToViewZ(d, uNear, uFar);
      float k = mix(uRange.z, uRange.w, smoothstep(uRange.x, uRange.y, z));
      gl_FragColor = vec4(mix(texture2D(tRaw, vUv).rgb, texture2D(tPaint, vUv).rgb, k), 1.0);
    }`};class ks extends Ue{constructor(e,t,{radius:a=5,hard:o=8,sharp:i=8,scale:n=1,maxPixels:r=960*540,near:h=4,far:p=30,nearAmt:u=.15,farAmt:l=1}={}){super(),this.outline=e,this.camera=t,this.needsSwap=!1,this.scale=n,this.maxPixels=e.optimized?r:1/0,this.rt=new ye(1,1,{type:Te,depthBuffer:!1}),this.out=new ye(1,1,{type:Te,depthBuffer:!1});const M=e.optimized&&a<=5&&new URLSearchParams(location.search).get("kernel")!=="legacy"?Ms(a,i):zt;this.quad=new Oe(new J({...M,uniforms:me.clone(M.uniforms),defines:{RADIUS:a|0},depthTest:!1,depthWrite:!1})),this.quad.material.uniforms.uHard.value=o,this.quad.material.uniforms.uSharp.value=i,this.blend=new Oe(new J({...Tt,uniforms:me.clone(Tt.uniforms),depthTest:!1,depthWrite:!1}));const v=this.blend.material.uniforms;v.tPaint.value=this.rt.texture,v.tDepth.value=e.rt.depthTexture,v.uRange.value.set(h,p,u,l)}get texture(){return this.out.texture}setSize(e,t){const a=Math.min(this.scale,Math.sqrt(this.maxPixels/(e*t))),o=Math.max(1,Math.round(e*a)),i=Math.max(1,Math.round(t*a));this.rt.setSize(o,i),this.quad.material.uniforms.uTexel.value.set(1/Math.max(1,e*this.scale),1/Math.max(1,t*this.scale)),this.out.setSize(e,t)}render(e,t,a){const o=this.outline.depthReuse?this.outline.sceneRT:a;this.quad.material.uniforms.tSrc.value=o.texture,e.setRenderTarget(this.rt),this.quad.render(e);const i=this.blend.material.uniforms;i.tRaw.value=o.texture,i.uNear.value=this.camera.near,i.uFar.value=this.camera.far,e.setRenderTarget(this.out),this.blend.render(e)}}function $s(s,e,t,a={}){const o=s.getSize(new V),i=new Rs(s),n=new URLSearchParams(location.search).get("zpre")!=="0",r=a.outline?new Ss(s,e,t,{...a.outline,depthReuse:n}):null,h=!!r?.optimized;r?.depthReuse?(i.addPass(new Bs(r)),r.pass.textureID=null,r.pass.uniforms.tDiffuse.value=r.sceneRT.texture):i.addPass(new Us(e,t));const p=()=>r?.depthReuse?r.sceneRT:i.readBuffer;let u=null;const l=a.ao===!1?null:{...a.ao||{}};if(r&&l&&new URLSearchParams(location.search).get("ao")!=="0"){const f=s.getDrawingBufferSize(new V);if(u=new ce(e,t,f.x,f.y,void 0,{radius:1.1,distanceExponent:1.5,thickness:1.5,scale:1,samples:12,distanceFallOff:1,...l.gtao},{lumaPhi:10,depthPhi:2,normalPhi:3,radius:6,rings:2,samples:12,...l.denoise}),u.setGBuffer(r.rt.depthTexture,r.rt.texture),h){const x=u.setSize.bind(u),E=Number(new URLSearchParams(location.search).get("aoscale")||.5),P=Number.isFinite(E)?mt.clamp(E,.25,1):.5,k=u.pdMaterial.uniforms.radius.value;u.setSize=(D,A)=>{const _=Math.min(P,Math.sqrt((l.maxPixels??518400)/(D*A)));x(Math.max(1,Math.round(D*_)),Math.max(1,Math.round(A*_))),r.pass.uniforms.uAORes.value.set(u.width,u.height),u.pdMaterial.uniforms.radius.value=k*_},u.setSize(f.x,f.y),u.gtaoRenderTarget.depthBuffer=!1,u.pdRenderTarget.depthBuffer=!1,u.pdMaterial.fragmentShader=u.pdMaterial.fragmentShader.replace("void main() {",`
        vec2 packNormal(vec3 n){
          n/=max(abs(n.x)+abs(n.y)+abs(n.z),1e-6);
          vec2 p=n.xy;
          if(n.z<0.0)p=(1.0-abs(p.yx))*vec2(p.x>=0.0?1.0:-1.0,p.y>=0.0?1.0:-1.0);
          return p;
        }
        void main() {`).replace("gl_FragColor = FRAGMENT_OUTPUT;","gl_FragColor=vec4(denoised.r,-viewPos.z,packNormal(viewNormal));"),u.pdMaterial.fragmentShader=u.pdMaterial.fragmentShader.replace(`discard;
				return;`,"gl_FragColor=vec4(1.0,65504.0,0.0,0.0);return;"),u.pdMaterial.needsUpdate=!0,u.pdRenderTarget.texture.minFilter=rt,u.pdRenderTarget.texture.magFilter=rt}u.output=ce.OUTPUT.Off,u.needsSwap=!1,i.addPass(u);const c=r.pass.uniforms;c.tAO.value=u.pdRenderTarget.texture,c.uAOStrength.value=l.strength??.85,l.tint!==void 0&&c.uAOTint.value.set(l.tint),l.cover!==void 0&&(c.uAOCover.value=l.cover),l.fade&&c.uAOFade.value.set(...l.fade),l.contrast&&c.uAOContrast.value.set(...l.contrast)}let m=null;r&&a.paint&&new URLSearchParams(location.search).get("paint")!=="0"&&(m=new ks(r,t,a.paint),i.addPass(m),r.pass.textureID=null,r.pass.uniforms.tDiffuse.value=m.texture),r&&i.addPass(r.pass);let M=null;if(a.bloom!==!1){const[f,c,x]=a.bloom||[.35,.5,.9];M=new $e(o,f,c,x),i.addPass(M)}let v=null;const R=a.mblur??.22;r&&R>0&&new URLSearchParams(location.search).get("mblur")!=="0"&&(v=new it(js),v.uniforms.tDepth.value=r.rt.depthTexture,v.uniforms.uAmt.value=R,i.addPass(v));const N=new it(Vs);for(const[f,c]of Object.entries(a.grade||{})){const x=N.uniforms[f];x.value?.isColor?x.value.set(c):x.value=c}i.addPass(N);let U=null;if(a.finish&&new URLSearchParams(location.search).get("finish")!=="0"){U=new it(a.finish.shader);for(const[f,c]of Object.entries(a.finish.uniforms||{})){const x=U.uniforms[f];x.value?.isColor?x.value.set(c):x.value=c}U.uniforms.tDepth&&r&&(U.uniforms.tDepth.value=r.rt.depthTexture),U.uniforms.uRes?.value.copy(s.getDrawingBufferSize(new V)),i.addPass(U)}const g=new Fs;if(h&&!U){N.enabled=!1;for(const[f,c]of Object.entries(N.uniforms))f!=="tDiffuse"&&(g.uniforms[f]=c);g.material.fragmentShader=g.material.fragmentShader.replace("uniform sampler2D tDiffuse;","uniform sampler2D tDiffuse; uniform vec3 uShadow,uHighlight; uniform float uSat,uVignette;").replace("// tone mapping",`float l=dot(gl_FragColor.rgb,vec3(0.299,0.587,0.114));
        gl_FragColor.rgb=mix(vec3(l),gl_FragColor.rgb,uSat);
        gl_FragColor.rgb=mix(gl_FragColor.rgb+uShadow*0.12*(1.0-l),gl_FragColor.rgb*uHighlight,smoothstep(0.4,1.0,l)*0.5);
        vec2 v=vUv-0.5; gl_FragColor.rgb*=1.0-uVignette*dot(v,v)*2.2;
        // tone mapping`)}return i.addPass(g),{composer:i,bloom:M,grade:N,outline:r,ao:u,finish:U,paint:m,output:g,quality:{...h?{maxPixels:1920*1080}:{},minScale:a.minScale},render(f){U?.uniforms.uProjInv&&(U.uniforms.uProjInv.value.copy(t.projectionMatrixInverse),U.uniforms.uCamWorld.value.copy(t.matrixWorld));const c=s.shadowMap,x=c.autoUpdate;if(x&&(c.autoUpdate=!1,c.needsUpdate=!0),v){const E=v.uniforms;t.updateMatrixWorld(),E.uProjInv.value.copy(t.projectionMatrixInverse),E.uCamWorld.value.copy(t.matrixWorld);const P=new Re().multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse);this._prevVP||(this._prevVP=P.clone()),E.uPrevVP.value.copy(this._prevVP),E.uScale.value=f>0?Math.min(1,1/60/f):0,this._prevVP.copy(P)}r?.prepass(),i.render(f),c.autoUpdate=x},async precompile(){e.traverse(x=>{for(const E of Array.isArray(x.material)?x.material:x.material?[x.material]:[]){for(const P of Object.values(E))P?.isTexture&&!P.isRenderTargetTexture&&s.initTexture(P);if(E.uniforms)for(const P of Object.values(E.uniforms))P?.value?.isTexture&&!P.value.isRenderTargetTexture&&s.initTexture(P.value)}});const f=s.getRenderTarget();s.setRenderTarget(p());const c=s.compileAsync(e,t);s.setRenderTarget(f),await Promise.all([c,r?.precompile()])},warmUp(){const f=[];e.traverse(c=>{c.frustumCulled&&(c.frustumCulled=!1,f.push(c))}),this.render(0);for(const c of f)c.frustumCulled=!0},setSize(f,c){i.setPixelRatio(s.getPixelRatio()),i.setSize(f,c),r?.setSize(f,c),U?.uniforms.uRes?.value.copy(s.getDrawingBufferSize(new V))}}}const Pt="pw.stats",Hs=["lit","wireframe","overdraw","draw calls","outline normals","ambient occlusion"],_t="float dbgDist = 1.0 / gl_FragCoord.w;",Gs={1:`${_t} gl_FragColor = vec4(mix(vec3(0.16, 0.3, 0.34), vec3(0.55, 1.0, 0.85), exp(-dbgDist / 90.0)), 1.0);`,2:"gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);",3:`${_t} gl_FragColor = vec4(uDbgColor * (0.45 + 0.55 * exp(-dbgDist / 160.0)), 1.0);`},Ws=`
  uniform sampler2D tCount; varying vec2 vUv;
  void main(){
    float n = texture2D(tCount, vUv).r;
    vec3 c = n < 0.5 ? vec3(0.02, 0.02, 0.05)
           : n < 1.5 ? vec3(0.10, 0.20, 0.55)                        // 1 layer
           : n < 2.5 ? vec3(0.10, 0.60, 0.35)                        // 2
           : n < 4.5 ? vec3(0.95, 0.80, 0.20)                        // 3-4
           : n < 8.5 ? vec3(0.95, 0.35, 0.15)                        // 5-8
           : n < 16.5 ? vec3(0.85, 0.10, 0.45) : vec3(1.0);          // 9-16, 17+
    gl_FragColor = vec4(c, 1.0);
  }`,qs="uniform sampler2D tMap; varying vec2 vUv; void main(){ gl_FragColor = vec4(texture2D(tMap, vUv).rgb, 1.0); }",Ct="varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }";function Qs(s,e){const t=/void\s+main\s*\(\s*\)/g;let a,o=null;for(;a=t.exec(s);)o=a;return o?`uniform vec3 uDbgColor;
`+s.slice(0,o.index)+"void _dbgMain()"+s.slice(o.index+o[0].length)+`
void main(){ _dbgMain(); ${e} }
`:s}const Xs=s=>{const e=(s*.61803398875%1+1)%1;return new oe().setHSL(e,.62,.55)};function Zs(s,e,t){const a=s.clone();s.isShaderMaterial&&(a.uniforms={...s.uniforms});const o={value:t},i=s.onBeforeCompile,n=i&&i!==ds.prototype.onBeforeCompile;a.onBeforeCompile=function(h,p){n&&i.call(this,h,p),h.uniforms.uDbgColor=o,h.fragmentShader=Qs(h.fragmentShader,Gs[e])};const r=s.customProgramCacheKey.call(s);return a.customProgramCacheKey=()=>`${r}|dbg${e}`,e===1&&(a.wireframe=!0),e===2&&Object.assign(a,{blending:Ft,transparent:!0,depthTest:!1,depthWrite:!1}),a}const Ys=s=>s.userData.isSky||s.material?.side===hs&&s.material?.depthWrite===!1,dt=s=>s>=1e6?(s/1e6).toFixed(2)+"M":s>=1e4?(s/1e3).toFixed(0)+"k":s>=1e3?(s/1e3).toFixed(1)+"k":String(Math.round(s)),ft=s=>(s/1048576).toFixed(1);function Ks(s){for(const[e,t]of Object.entries(xt))if(t===s&&/Format$/.test(e))return e.replace(/_Format$|Format$/,"").replace(/^RGBA?_/,"");return String(s)}function Js(s,e,t,a){const o=s.info,i=s.getContext(),n=i.getExtension("WEBGL_debug_renderer_info"),r=(n?i.getParameter(n.UNMASKED_RENDERER_WEBGL):i.getParameter(i.RENDERER)).replace(/^ANGLE \((.*)\)$/,"$1").replace(/ Direct3D.*$/,"").replace(/\s*\(0x[0-9A-Fa-f]+\)/g,""),h=i.getSupportedExtensions()||[],p=d=>h.includes(d),u=[["bc7","EXT_texture_compression_bptc"],["s3tc","WEBGL_compressed_texture_s3tc"],["etc","WEBGL_compressed_texture_etc"],["astc","WEBGL_compressed_texture_astc"]].filter(([,d])=>p(d)).map(([d])=>d).join(" ")||"none",l={maxTex:i.getParameter(i.MAX_TEXTURE_SIZE),msaa:i.getContextAttributes().antialias?i.getParameter(i.SAMPLES):0},m=Object.fromEntries(Object.entries(xt).filter(([d])=>/ToneMapping$/.test(d)).map(([d,w])=>[w,d.replace("ToneMapping","")])),M={[us]:"Basic",[cs]:"PCF",[ut]:"PCFSoft",[ls]:"VSM"},v=document.createElement("div");v.id="stats",v.innerHTML='<canvas width="260" height="48"></canvas><pre class="body"></pre><div class="views"></div><pre class="legend"></pre>',document.body.appendChild(v);const R=v.querySelector("canvas").getContext("2d"),N=v.querySelector(".body"),U=v.querySelector(".views"),g=v.querySelector(".legend");let f=!1,c=0;try{f=localStorage.getItem(Pt)==="1"}catch{}const x=()=>{U.innerHTML=Hs.slice(1).map((d,w)=>`<span class="${c===w+1?"on":""}">${w+1} ${d}</span>`).join(""),g.textContent=c===2?`layers  1 blue · 2 green · 3-4 yellow
        5-8 orange · 9-16 magenta · 17+ white`:c===3?"each colour = one draw call":c===4?'grass/foliage/water write "cover" (no ink)':c===5?"white = open, dark = occluded (off with ?ao=0)":"",g.hidden=!g.textContent},E=d=>{f=d,v.hidden=!d,d||(c=0),x();try{localStorage.setItem(Pt,d?"1":"0")}catch{}};E(f),addEventListener("keydown",d=>{if(d.repeat)return;if(d.code==="Backquote"){E(!f);return}if(!f)return;const w={Digit1:1,Digit2:2,Digit3:3,Digit4:4,Digit5:5}[d.code];w&&(c=c===w?0:w,x())});const P=new URLSearchParams(location.search),k=`textures ${P.get("ktx")==="0"?"webp":"ktx2"} · meshes ${P.get("draco")==="0"?"raw glb":"draco"}`;let D=!1,A=[],_={calls:0,tris:0};const F=()=>({calls:o.render.calls,tris:o.render.triangles}),X=s.render.bind(s);s.render=(d,w)=>{if(!D)return X(d,w);const y=F(),L={..._},G=s.getRenderTarget();X(d,w);const H=F();A.push({scene:d,target:G,calls:H.calls-y.calls-(_.calls-L.calls),tris:H.tris-y.tris-(_.tris-L.tris)})};const ve=s.shadowMap,Pe=ve.render.bind(ve);ve.render=(...d)=>{if(!D)return Pe(...d);const w=F();Pe(...d);const y=F();_.calls+=y.calls-w.calls,_.tris+=y.tris-w.tris};const _e=new WeakMap;let K=null,ge=null,O=null;const xe=(d,w)=>{let y=_e.get(d);if(y||_e.set(d,y={}),!(w in y))try{y[w]=Zs(d.material,w,Xs(d.id))}catch(L){console.warn("[stats] no debug material for",d.name||d.type,L),y[w]=null}return y[w]||d.material},Se=(d,w)=>{const y=s.getClearColor(new oe),L=s.getClearAlpha();Me(d,w),s.setClearColor(y,L)},Me=(d,w)=>{const y=d.scene;if(c===4||c===5){const b=d.post?.outline,I=d.post?.ao;if(!b||c===5&&!I){ze();return}c===5?d.post.render(0):b.prepass(),ge??=new Oe(new J({uniforms:{tMap:{value:null}},vertexShader:Ct,fragmentShader:qs})),ge.material.uniforms.tMap.value=c===5?I.pdRenderTarget.texture:b.rt.texture,s.setRenderTarget(null),ge.render(s);return}const L=[],G=[];y.traverseVisible(b=>{if(!(!(b.isMesh||b.isPoints)||Array.isArray(b.material))){if(c!==2&&Ys(b)){b.visible=!1,G.push(b);return}L.push([b,b.material]),b.material=xe(b,c)}});const H=y.background,W=y.fog;if(y.background=c===2?null:new oe(724502),y.fog=null,c===2){const b=s.getDrawingBufferSize(new V);(!K||K.width!==b.x||K.height!==b.y)&&(K?.dispose(),K=new ye(b.x,b.y,{type:Te,depthBuffer:!1})),s.setRenderTarget(K),s.setClearColor(0,0),s.clear(),s.render(y,w),O??=new Oe(new J({uniforms:{tCount:{value:null}},vertexShader:Ct,fragmentShader:Ws})),O.material.uniforms.tCount.value=K.texture,s.setRenderTarget(null),O.render(s)}else s.setRenderTarget(null),s.render(y,w);y.background=H,y.fog=W;for(const[b,I]of L)b.material=I;for(const b of G)b.visible=!0},ze=()=>{s.setRenderTarget(null),s.setClearColor(3149848,1),s.clear()};let Ae={};function Ie(d,w){const y=d.scene,L=new Map,G=new Set;let H=0,W=0,b=0,I=0,de=0,q=0,ne=[],fe=null;y.traverse(S=>{if(S.isLight&&(q++,S.castShadow&&S.shadow&&ne.push(S.shadow.mapSize.x)),!(S.isMesh||S.isPoints))return;S.isPoints?de++:H++;let z=!0;S.traverseAncestors(C=>{C.visible||(z=!1)}),z&&S.visible&&W++;const T=S.geometry;S.isInstancedMesh?(b+=S.count,I++):T.isInstancedBufferGeometry&&(b+=T.instanceCount,I++);for(const C of Object.values(T.attributes))G.add((C.data||C).array);T.index&&G.add(T.index.array);for(const C of Array.isArray(S.material)?S.material:[S.material])if(C){for(const j of Object.values(C))j?.isTexture&&L.set(j.source?.uuid||j.uuid,j);if(C.uniforms)for(const j of Object.values(C.uniforms))j?.value?.isTexture&&L.set(j.value.source?.uuid||j.value.uuid,j.value)}});let le=0;for(const S of L.values())if(S.isCompressedTexture&&S.mipmaps?.length)le+=S.mipmaps.reduce((z,T)=>z+(T.data?.byteLength||0),0),fe??=Ks(S.format);else{const z=S.image;le+=(z?.width||0)*(z?.height||0)*4*(S.generateMipmaps!==!1?4/3:1)}let Ne=0;for(const S of G)Ne+=S.byteLength;const ie=d.post,Fe=ie?.composer?.passes?.length??0,pe=[ie?.ao&&"gtao",ie?.outline&&"outline",ie?.bloom&&`bloom ${ie.bloom.strength.toFixed(2)}`,ie?.grade&&"grade"].filter(Boolean).join(" · ");Ae={meshes:H,visibleMeshes:W,points:de,inst:b,instObjs:I,lights:q,shadowLights:ne,texB:le,geoB:Ne,compressed:fe,texN:L.size,chain:pe,passesN:Fe,shadowType:M[w.shadowMap.type]??"?"}}const te=260,se=new Float32Array(te);let Z=0,$=0,re=performance.now(),He=0,Ce=0,Ee=0,De=0,je=0,Ve=0,he=null;return{begin(){const d=performance.now();se[Z]=d-re,Z=(Z+1)%te,$=Math.min($+1,te),re=d,f&&(o.autoReset=!1,o.reset(),A=[],_={calls:0,tris:0},D=!0,He=Ce=d)},mark(){f&&(Ce=performance.now())},render(d,w){return!f||!c?!1:(Se(d,w),!0)},end(){if(!f){o.autoReset=!0,D=!1;return}D=!1;const d=performance.now();Ee=Ee*.9+(Ce-He)*.1,De=De*.9+(d-Ce)*.1;const{world:w,camera:y,player:L}=e(),G=w?.post?.outline,H={outline:{calls:0,tris:0,n:0},main:{calls:0,tris:0,n:0},post:{calls:0,tris:0,n:0},debug:{calls:0,tris:0,n:0}};for(const T of A){const C=c?"debug":G&&T.target===G.rt?"outline":T.scene===w?.scene?"main":"post";H[C].calls+=T.calls,H[C].tris+=T.tris,H[C].n++}he={agg:H,shadow:{..._},calls:o.render.calls,tris:o.render.triangles,points:o.render.points};const W=R,b=260,I=48,de=I/40;W.clearRect(0,0,b,I),W.fillStyle="rgba(255,255,255,0.12)",W.fillRect(0,I-16.7*de,b,1),W.fillRect(0,I-33.3*de,b,1);for(let T=0;T<$;T++){const C=se[(Z-$+T+te)%te];W.fillStyle=C>33.4?"#ff7a6b":C>17.5?"#ffc98a":"#8fe3a8";const j=Math.min(C*de,I);W.fillRect(b-$+T,I-j,1,j)}if(d<je)return;je=d+250,w&&d>Ve&&(Ie(w,s),Ve=d+2e3);const q=Array.from({length:$},(T,C)=>se[(Z-$+C+te)%te]).sort((T,C)=>T-C),ne=q.reduce((T,C)=>T+C,0)/(q.length||1),fe=q[Math.floor(q.length*.99)]||0,le=performance.memory?`${ft(performance.memory.usedJSHeapSize)} MB`:"n/a",Ne=s.getDrawingBufferSize(new V),ie=y.position,Fe=T=>T.toFixed(1),pe=(T,C)=>`  ${T.padEnd(13)}${String(C.calls).padStart(6)}${dt(C.tris).padStart(9)}`,S=Ae,z=he.agg;N.textContent=[`FPS ${(1e3/ne).toFixed(0).padStart(4)}   1% low ${(1e3/(fe||1)).toFixed(0)}   worst ${q[q.length-1]?.toFixed(1)??"-"} ms`,`frame ${ne.toFixed(2)} ms`,`CPU   ${(Ee+De).toFixed(2)} ms  (sim ${Ee.toFixed(2)} · render ${De.toFixed(2)})`,`GPU   ${t.supported?isNaN(t.ms)?"...":t.ms.toFixed(2)+" ms":"n/a (no timer query)"}`,`res   ${a.enabled?`${Math.round(a.scale*100)}% dynamic (GPU budget ${a.budget} ms)`:"100% fixed (dynamic res off)"}`,"",`PASSES          calls  ${c===1?"lines":" tris"}`,...c?[pe(["","wireframe","overdraw","draw calls","outline nrm","ao buffer"][c],c===1?{calls:z.debug.calls,tris:o.render.lines}:z.debug),pe("shadow",he.shadow)]:[pe("shadow",he.shadow),pe("outline pre",z.outline),pe("main",z.main),pe(`post (${z.post.n})`,z.post)],`  ${"total".padEnd(13)}${String(he.calls).padStart(6)}${dt(he.tris).padStart(9)}`,"","SCENE",`  meshes ${S.meshes} (${S.visibleMeshes} visible) · points ${S.points}`,`  instances ${dt(S.inst??0)} in ${S.instObjs} batches`,`  lights ${S.lights} · shadow ${S.shadowLights?.map(T=>T+"²").join(" ")||"none"} ${S.shadowType}`,`  post ${S.chain||"none"} (${S.passesN} passes)`,"","MEMORY",`  textures ${S.texN} · tex VRAM ~${ft(S.texB??0)} MB`,`  gpu format ${S.compressed??"uncompressed RGBA8"}`,`  geometry ~${ft(S.geoB??0)} MB · ${o.memory.geometries} geos`,`  programs ${o.programs?.length??0} · JS heap ${le}`,"","RENDERER",`  ${r}`,`  ${Ne.x}x${Ne.y} @${s.getPixelRatio()}x · MSAA ${l.msaa?l.msaa+"x":"off"}`,`  tonemap ${m[s.toneMapping]??"?"} · exposure ${s.toneMappingExposure.toFixed(2)}`,`  max tex ${l.maxTex} · formats ${u}`,"",`WORLD  ${w?.name??"-"} · ${k}`,`  pos ${Fe(ie.x)} ${Fe(ie.y)} ${Fe(ie.z)} · yaw ${L.yaw.toFixed(2)} · pitch ${(L.pitch??0).toFixed(2)}`,`  fov ${y.fov} · far ${y.far}`].join(`
`)}}}function ei(s){const e=s.getExtension("EXT_disjoint_timer_query_webgl2"),t=[];let a=null,o=NaN,i=0;return{supported:!!e,get ms(){return o},get stamp(){return i},begin(){if(e){for(let n=t.length-1;n>=0;n--){const r=t[n];s.getQueryParameter(r,s.QUERY_RESULT_AVAILABLE)&&(s.getParameter(e.GPU_DISJOINT_EXT)||(o=s.getQueryParameter(r,s.QUERY_RESULT)/1e6,i++),s.deleteQuery(r),t.splice(n,1))}t.length<4&&(a=s.createQuery(),s.beginQuery(e.TIME_ELAPSED_EXT,a),t.push(a))}},end(){a&&(s.endQuery(e.TIME_ELAPSED_EXT),a=null)}}}const Be=[1,.85,.72,.6,.5,.42,.35];function ti(s,e,t){const a=new URLSearchParams(location.search),o=a.get("dynres"),i=o!=="0"&&(o==="1"||!navigator.webdriver),n=Number(a.get("budget")||12),r=Number.isFinite(n)&&n>0?n:12;let h=1/0,p=Be.length-1;const u=()=>Math.min(devicePixelRatio,2,Math.sqrt(h/Math.max(1,innerWidth*innerHeight)));let l=0,m=[],M=0,v=0,R=performance.now(),N=R;const U=g=>{s.setPixelRatio(u()*Be[l]),t(),m=[],v=g+1500};return{get enabled(){return i},get scale(){return Be[l]},budget:r,update(){if(!i)return;const g=performance.now(),f=g-N;if(N=g,document.hidden){m=[],R=g;return}if(e.supported?e.stamp!==M&&(M=e.stamp,g>v&&!isNaN(e.ms)&&m.push(e.ms)):g>v&&f>0&&f<250&&m.push(f),g-R<1e3||(R=g,m.length<8))return;m.sort((E,P)=>E-P);const c=m[Math.floor(m.length*.75)];m=[];const x=e.supported?r:1e3/60;c>x*(e.supported?1.1:1.2)&&l<p?(l++,U(g)):l>0&&g>v+2e3&&c*(Be[l-1]/Be[l])**2<x*.9&&(l--,U(g))},reset(){l=0,s.setPixelRatio(u())},setProfile(g={}){const f=g.maxPixels??1/0,c=g.minScale??.5;p=Be.findLastIndex(x=>x>=c-1e-6),!(f===h&&l<=p)&&(h=f,l=0,U(performance.now()))}}}var si={"assets/harbour.draco.glb":1689012,"assets/harbour.glb":16629868,"assets/harbour_sky.jpg":534883,"assets/hub.draco.glb":521856,"assets/hub.glb":4395904,"assets/hub_sky.jpg":293074,"assets/lane.draco.glb":1438384,"assets/lane.glb":8679744,"assets/lane_sky.jpg":635699,"assets/temple.draco.glb":246044,"assets/temple.glb":5675148,"assets/temple_sky.jpg":254388,"assets/tex/atlas.json":426,"assets/tex/atlas.webp":2399660,"assets/tex/atlas_etc1s.ktx2":2703862,"assets/tex/atlas_n.ktx2":3014814,"assets/tex/atlas_n.webp":6328918,"assets/tex/bark.jpg":243344,"assets/tex/bark_n.png":2343396,"assets/tex/bark_r.jpg":94276,"assets/tex/carved.jpg":272593,"assets/tex/carved_n.png":2481817,"assets/tex/carved_r.jpg":182335,"assets/tex/cliff.jpg":251989,"assets/tex/cliff_n.png":1834796,"assets/tex/cliff_r.jpg":115444,"assets/tex/clouds.json":1162,"assets/tex/clouds.webp":454862,"assets/tex/cobble.jpg":239432,"assets/tex/cobble_n.png":1922083,"assets/tex/cobble_r.jpg":187220,"assets/tex/dirt.jpg":168794,"assets/tex/dirt_n.png":1597486,"assets/tex/dirt_r.jpg":29608,"assets/tex/foliage_atlas.png":2562339,"assets/tex/grass.jpg":347599,"assets/tex/harbour/grass.jpg":393443,"assets/tex/harbour/harbour_clouds.json":579,"assets/tex/harbour/harbour_clouds.webp":298468,"assets/tex/harbour/harbour_lanterns.json":154,"assets/tex/harbour/harbour_lanterns.webp":182460,"assets/tex/harbour/harbour_plants.json":587,"assets/tex/harbour/harbour_plants.webp":601260,"assets/tex/harbour/palette.png":164,"assets/tex/harbour/pigment.json":301,"assets/tex/harbour/plaster.jpg":314812,"assets/tex/harbour/rock.jpg":428326,"assets/tex/harbour/roof.jpg":368940,"assets/tex/harbour/stone.jpg":377448,"assets/tex/harbour/wood.jpg":369442,"assets/tex/lane/lane_cards.json":965,"assets/tex/lane/lane_cards.webp":199770,"assets/tex/lane/lane_decor.json":1214,"assets/tex/lane/lane_decor.webp":436648,"assets/tex/lane/lane_leaves.json":522,"assets/tex/lane/lane_leaves.webp":143308,"assets/tex/lane/lane_props.json":989,"assets/tex/lane/lane_props.webp":325326,"assets/tex/lane/lane_sides.json":1195,"assets/tex/lane/lane_sides.webp":1130278,"assets/tex/lane/lane_walls.json":1273,"assets/tex/lane/lane_walls.webp":1413666,"assets/tex/leaves_atlas.png":1606172,"assets/tex/plaster.jpg":151406,"assets/tex/plaster_n.png":908283,"assets/tex/plaster_r.jpg":50531,"assets/tex/roof.jpg":221499,"assets/tex/roof_n.png":2128599,"assets/tex/roof_r.jpg":158543,"assets/tex/sandstone.jpg":97746,"assets/tex/sandstone_n.png":1040039,"assets/tex/sandstone_r.jpg":63792,"assets/tex/stone.jpg":152794,"assets/tex/stone_n.png":1384939,"assets/tex/stone_r.jpg":118511,"assets/tex/wood.jpg":184166,"assets/tex/wood_n.png":1961760,"assets/tex/wood_r.jpg":120414,"assets/windward.draco.glb":640160,"assets/windward.glb":5277080,"assets/windward_sky.jpg":177737,"basis/basis_transcoder.js":57529,"basis/basis_transcoder.wasm":527333,"draco/draco_decoder.js":512465,"draco/draco_decoder.wasm":192420,"draco/draco_wasm_wrapper.js":58456};const St=document.getElementById("c"),ee=s=>document.getElementById(s),B=new fs({canvas:St,antialias:!0,powerPreference:"high-performance"});B.setPixelRatio(Math.min(devicePixelRatio,2));B.setSize(innerWidth,innerHeight);B.shadowMap.enabled=!0;B.shadowMap.type=ut;B.toneMapping=Lt;B.outputColorSpace=ps;const ae=new ms(72,innerWidth/innerHeight,.1,1200),Y=new Es(ae,St),qe=ei(B.getContext()),Xe=ti(B,qe,kt),ii=new vs,jt={hub:()=>be(()=>import("./hub-CQXKSeXG.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(s=>s.createHub),anime:()=>be(()=>import("./index--YOz5f2w.js"),__vite__mapDeps([3,1,4,2,5]),import.meta.url).then(s=>s.createWindward),watercolor:()=>be(()=>import("./index-BOrqQdca.js"),__vite__mapDeps([6,1,2,4,7,8,9,5]),import.meta.url).then(s=>s.createHarbour),moebius:()=>be(()=>import("./index-Dzs1l4Vi.js"),__vite__mapDeps([10,1,2,4,7,8]),import.meta.url).then(s=>s.createTemple),pencil:()=>be(()=>import("./index-D2yp8B6S.js"),__vite__mapDeps([11,1,2,4,9]),import.meta.url).then(s=>s.createLane)};nt.enabled=!0;const lt={anime:()=>be(()=>import("./index--YOz5f2w.js"),__vite__mapDeps([3,1,4,2,5]),import.meta.url).then(s=>s.PRELOAD),watercolor:()=>be(()=>import("./index-BOrqQdca.js"),__vite__mapDeps([6,1,2,4,7,8,9,5]),import.meta.url).then(s=>s.PRELOAD),moebius:()=>be(()=>import("./index-Dzs1l4Vi.js"),__vite__mapDeps([10,1,2,4,7,8]),import.meta.url).then(s=>s.PRELOAD),pencil:()=>be(()=>import("./index-D2yp8B6S.js"),__vite__mapDeps([11,1,2,4,9]),import.meta.url).then(s=>s.PRELOAD)},at=new Set;function Vt(s,e){if(nt.get(s))return Promise.resolve();if(/\.(jpe?g|png|webp)$/.test(s))return new gs().loadAsync(s);const t=/\.json$/.test(s)?"json":/\.js$/.test(s)?"text":"arraybuffer";return new xs().setResponseType(t).loadAsync(s,e&&(a=>e(a.loaded)))}const ai=["assets/hub_sky.jpg","assets/hub.draco.glb","draco/draco_wasm_wrapper.js","draco/draco_decoder.wasm"];async function oi(){const s=ee("loading").querySelector(".bar i"),e=ee("loading").querySelector(".bytes"),t=[["hub",ai],...await Promise.all(Object.entries(lt).map(async([l,m])=>[l,await m()]))],a=[...new Set(t.flatMap(([,l])=>l))],o=l=>si[l]||1,i=a.reduce((l,m)=>l+o(m),0),n=new Map,r=new Set,h=()=>{const l=[...n.values()].reduce((m,M)=>m+M,0);s.style.width=`${l/i*100}%`,e.textContent=`${(l/1048576).toFixed(1)} / ${(i/1048576).toFixed(1)} MB`;for(const[m,M]of t)ee("loading").querySelector(`[data-w="${m}"]`)?.classList.toggle("done",M.every(v=>r.has(v)))},p=[...a],u=async()=>{for(let l;l=p.shift();)await Vt(l,m=>{n.set(l,Math.min(m,o(l))),h()}).catch(m=>console.warn("[preload]",l,m)),n.set(l,o(l)),r.add(l),h()};h(),await Promise.all(Array.from({length:6},u));for(const l of Object.keys(lt))at.add(l)}async function ri(){for(const[s,e]of Object.entries(lt))if(!(ke.has(s)||at.has(s))){at.add(s);try{for(const t of await e())await Vt(t).catch(()=>{})}catch{at.delete(s)}}}async function ni(){const s=new Set;for(const[e,t]of Object.entries(lt))if(!ke.has(e))for(const a of await t())s.add(a);for(const e of Object.keys(nt.files))s.has(e)||nt.remove(e)}const ke=new Map;async function ct(s){if(!ke.has(s)){const t=await(await jt[s]())({manager:ii,renderer:B,camera:ae});B.shadowMap.type=t.shadowType??ut,t.post=$s(B,t.scene,ae,t.postOpts||{}),await t.post.precompile(),t.post.warmUp(),ke.set(s,t),ni()}return ke.get(s)}let ue=null,vt=null,pt=0;function Qe(s,e){ue=s,Xe.setProfile(s.post.quality),Y.octree=s.octree,Y.teleport(e.pos,e.yaw),Y.pitch=e.pitch??0,s.portals.reset(),B.toneMappingExposure=s.exposure??1,B.shadowMap.type=s.shadowType??ut,ae.fov=s.fov??72,ae.updateProjectionMatrix(),vt={pos:e.pos.clone(),yaw:e.yaw}}const Bt=new URLSearchParams(location.search).get("preload")!=="0";Bt&&await oi();ee("loading").querySelector(".status").textContent="building the plaza…";const Et=await ct("hub");Qe(Et,Et.spawn);Bt||(self.requestIdleCallback||(s=>setTimeout(s,1500)))(()=>ri(),{timeout:4e3});ee("loading").hidden=!0;ee("enter").hidden=!1;ee("enter").addEventListener("click",()=>St.requestPointerLock());document.addEventListener("pointerlockchange",()=>{ee("enter").hidden=Y.locked||Y.padActive});addEventListener("gamepadconnected",s=>console.info("[pad]",s.gamepad.id));function kt(){ae.aspect=innerWidth/innerHeight,ae.updateProjectionMatrix(),B.setSize(innerWidth,innerHeight);for(const s of ke.values())s.post.setSize(innerWidth,innerHeight)}addEventListener("resize",()=>{Xe.reset(),kt()});let Dt;function Rt(s,e=3200){const t=ee("toast");t.innerHTML=s,t.classList.add("show"),clearTimeout(Dt),Dt=setTimeout(()=>t.classList.remove("show"),e)}let Le=null;function gt(s,e){if(Le)return;const t=ee("fade");t.style.background=`#${new oe(s).lerp(new oe(16777215),.55).getHexString()}`,Le={t:0,phase:"in",midpoint:e,busy:!1},Y.enabled=!1}function li(s){if(!Le)return;const e=Le,t=ee("fade");e.t+=s,e.phase==="in"?(t.style.opacity=Math.min(1,e.t/.45),e.t>=.5&&!e.busy&&(e.busy=!0,Promise.resolve(e.midpoint()).then(()=>{e.phase="out",e.t=0}))):(t.style.opacity=Math.max(0,1-e.t/.7),e.t>.7&&(Le=null,Y.enabled=!0))}function ci(s){const e=ue.name;jt[s.target]?gt(s.color,async()=>{const t=await ct(s.target);Qe(t,s.target==="hub"?t.arrivalFrom(e):t.spawn),Rt(`<b>${s.target==="hub"?"Celestial Plaza":s.world.name}</b>${s.world?" · "+s.world.style:""}`,2600)}):gt(s.color,()=>{Qe(ue,ue.portals.arrival(s)),Rt(`<b>${s.world.name}</b> · ${s.world.style} — opening soon`)})}const Ut=new Nt,At=4,st=Js(B,()=>({world:ue,camera:ae,player:Y}),qe,Xe);function $t(){qe.begin(),st.begin();const s=Math.min(Ut.getDelta(),.05),e=Ut.elapsedTime;for(let a=0;a<At;a++)Y.update(s/At);Y.padActive&&!ee("enter").hidden&&(ee("enter").hidden=!0),pt+=s,Y.onFloor&&pt>.5&&(pt=0,vt={pos:Y.feet,yaw:Y.yaw}),ae.position.y<(ue.killY??-30)&&!Le&&gt(16777215,()=>Qe(ue,vt));const t=ue.update(s,e,ae.position);t&&!Le&&ci(t),li(s),st.mark(),st.render(ue,ae)||ue.post.render(s),qe.end(),st.end(),Xe.update()}B.setAnimationLoop($t);window.__game={THREE:xt,renderer:B,camera:ae,player:Y,getWorld:ct,tick:$t,gpuTimer:qe,dynres:Xe,get world(){return ue},goto:async s=>{const e=await ct(s);Qe(e,e.spawn)}};
