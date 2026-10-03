const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./hub-HtAURyed.js","./Capsule-DQaDBPd7.js","./portals-CcgGbApM.js","./index-CI1HXwUV.js","./fx-Cg1jHl4w.js","./device-BZgtGmh4.js","./grass-Bd0nTScA.js","./index-Bqg1Jp2N.js","./outline-DM4tYeCE.js","./life-BkWgVUmY.js","./index-Bb6BxQbU.js","./index-8J19XS7e.js"])))=>i.map(i=>d[i]);
import{C as Zt,V as K,M as yt,a as k,W as Te,H as Pe,N as Me,b as kt,c as re,U as ve,S as ie,A as Vt,d as Kt,R as Jt,e as ei,f as ti,L as ii,g as ai,h as si,i as oi,j as ni,k as Bt,l as Ae,D as $t,m as ut,n as ri,o as it,Z as at,p as Ct,q as Rt,r as li,s as ci,t as ui,u as di,v as dt,w as hi,x as fi,y as pi,T as Dt,z as mi,P as mt,B as vi,E as gi,F as xi,G as Si,I as bi,J as wi,K as Mi,O as yi,Q as Ye,X as Ti,Y as Pi}from"./Capsule-DQaDBPd7.js";import{P as Le,S as Xe,F as Oe,O as Di,m as _i,K as Gt}from"./outline-DM4tYeCE.js";import{p as ze,m as I,a as Ei}from"./device-BZgtGmh4.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();const Ci="modulepreload",Ri=function(i,e){return new URL(i,e).href},At={},ye=function(e,t,a){let o=Promise.resolve();if(t&&t.length>0){let n=function(u){return Promise.all(u.map(l=>Promise.resolve(l).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};const r=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),f=h?.nonce||h?.getAttribute("nonce");o=n(t.map(u=>{if(u=Ri(u,a),u in At)return;At[u]=!0;const l=u.endsWith(".css"),m=l?'[rel="stylesheet"]':"";if(!!a)for(let C=r.length-1;C>=0;C--){const N=r[C];if(N.href===u&&(!l||N.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${m}`))return;const v=document.createElement("link");if(v.rel=l?"stylesheet":Ci,l||(v.as="script"),v.crossOrigin="",v.href=u,f&&v.setAttribute("nonce",f),document.head.appendChild(v),l)return new Promise((C,N)=>{v.addEventListener("load",C),v.addEventListener("error",()=>N(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(n){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=n,window.dispatchEvent(r),!r.defaultPrevented)throw n}return o.then(n=>{for(const r of n||[])r.status==="rejected"&&s(r.reason);return e().catch(s)})},Ai=new K,Li=new K,Ui=new K,Ni=28,st=.35,Fi=.22;class zi{constructor(e,t){this.camera=e,this.dom=t,this.collider=new Zt(new K(0,st,0),new K(0,1.45,0),st),this.velocity=new K,this.onFloor=!1,this.octree=null,this.keys={},this.yaw=0,this.pitch=0,this.enabled=!0,this.padSeen=0,this._feel={amt:0,phase:0,t:0,dip:0,dipV:0,fall:0,wasGrounded:!0},addEventListener("keydown",a=>{this.keys[a.code]=!0}),addEventListener("keyup",a=>{this.keys[a.code]=!1}),addEventListener("blur",()=>{this.keys={}}),document.addEventListener("mousemove",a=>{document.pointerLockElement===t&&(this.yaw-=a.movementX*.0022,this.pitch=yt.clamp(this.pitch-a.movementY*.0022,-1.45,1.45))})}get locked(){return document.pointerLockElement===this.dom}get padActive(){return this.padSeen>0&&performance.now()-this.padSeen<6e4}pollPad(){const e=navigator.getGamepads?navigator.getGamepads():[],t=Array.from(e||[]).find(u=>u&&u.connected);if(!t)return null;const a=(u,l)=>{const m=Math.hypot(u,l);if(m<.18)return[0,0];const S=Math.min(1,(m-.18)/.82)/m;return[u*S,l*S]},[o,s]=a(t.axes[0]||0,t.axes[1]||0),[n,r]=a(t.axes[2]||0,t.axes[3]||0),h=u=>!!t.buttons[u]?.pressed;return(o||s||n||r||t.buttons.some(u=>u.pressed))&&(this.padSeen=performance.now()),{mx:o,my:s,lx:n,ly:r,jump:h(0),sprint:h(4)||h(10)}}teleport(e,t=0){this.collider.start.set(e.x,e.y+st,e.z),this.collider.end.set(e.x,e.y+1.45,e.z),this.velocity.set(0,0,0),this.yaw=t,this.pitch=0,this.syncCamera()}feel(e){const t=this._feel,a=Math.hypot(this.velocity.x,this.velocity.z),o=this.onFloor,s=o?Math.min(a/4.4,1.6):0;t.amt+=(s-t.amt)*Math.min(1,e*6),t.phase+=e*Math.PI*(1.8+.5*Math.max(0,s-1)/.6)*(s>.05?1:0),t.t+=e,o&&!t.wasGrounded&&t.fall<-3&&(t.dipV-=Math.min(-t.fall,18)*.035),!o&&t.wasGrounded&&this.velocity.y>4&&(t.dipV+=.35),t.wasGrounded=o,o||(t.fall=this.velocity.y),t.dipV+=(-t.dip*90-t.dipV*14)*e,t.dip+=t.dipV*e;const n=t.amt,r=Math.max(0,n-1)/.6,h=(.5-.5*Math.cos(2*t.phase))*.034*Math.min(n,1)*(1+r*.5),f=Math.sin(t.phase)*.02*Math.min(n,1),u=1-Math.min(n,1),l=u*(Math.sin(t.t*1.25)*.018+Math.sin(t.t*.43+1)*.008);return{y:h+l+t.dip,x:f+u*Math.sin(t.t*.31)*.012,pitch:u*(Math.sin(t.t*1.25+.8)*.006+Math.sin(t.t*.37)*.004)+Math.sin(2*t.phase+.6)*.004*Math.min(n,1)-r*.02-t.dip*.2,roll:Math.sin(t.phase)*.006*Math.min(n,1)*(1+r*.4)+u*Math.sin(t.t*.53)*.004}}syncCamera(e=0){const t=e>0?this._off=this.feel(e):this._off||{x:0,y:0,pitch:0,roll:0};this.camera.position.copy(this.collider.end).y+=Fi+t.y,this.camera.rotation.set(this.pitch+t.pitch,this.yaw,t.roll,"YXZ"),this.camera.position.x+=Math.cos(this.yaw)*t.x,this.camera.position.z-=Math.sin(this.yaw)*t.x}collide(){this.onFloor=!1;const e=this.octree&&this.octree.capsuleIntersect(this.collider);e&&(this.onFloor=e.normal.y>.35,this.onFloor||this.velocity.addScaledVector(e.normal,-e.normal.dot(this.velocity)),e.depth>=1e-10&&this.collider.translate(e.normal.multiplyScalar(e.depth)))}update(e){const t=this.keys,a=Ai.set(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),o=Li.set(-a.z,0,a.x),s=this.pollPad(),n=this.touch?.active?this.touch:null,r=t.ShiftLeft||t.ShiftRight||s?.sprint||n?.sprint,h=(this.onFloor?24:7)*(r?1.6:1);if(this.enabled&&s&&(this.locked||this.padActive)){const u=2.6*e;this.yaw-=Math.sign(s.lx)*Math.abs(s.lx)**1.6*u,this.pitch=yt.clamp(this.pitch-Math.sign(s.ly)*Math.abs(s.ly)**1.6*u*.8,-1.45,1.45),this.velocity.addScaledVector(a,-s.my*h*e),this.velocity.addScaledVector(o,s.mx*h*e),this.onFloor&&s.jump&&(this.velocity.y=9)}this.enabled&&this.locked&&(t.KeyW&&this.velocity.addScaledVector(a,h*e),t.KeyS&&this.velocity.addScaledVector(a,-h*e),t.KeyA&&this.velocity.addScaledVector(o,-h*e),t.KeyD&&this.velocity.addScaledVector(o,h*e),this.onFloor&&t.Space&&(this.velocity.y=9)),this.enabled&&n&&(performance.now()>n.jumpUntil&&(n.jump=!1),this.velocity.addScaledVector(a,-n.y*h*e),this.velocity.addScaledVector(o,n.x*h*e),this.onFloor&&n.jump&&(this.velocity.y=9,n.jump=!1));let f=Math.exp(-5.5*e)-1;this.onFloor||(this.velocity.y-=Ni*e,f*=.12),this.velocity.addScaledVector(this.velocity,f),this.collider.translate(Ui.copy(this.velocity).multiplyScalar(e)),this.collide(),this.syncCamera(e)}get feet(){return this.collider.start.clone().setY(this.collider.start.y-st)}}const Ze={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Lt extends Le{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,a){const o=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let n,r;this.inverse?(n=0,r=1):(n=1,r=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),s.buffers.stencil.setFunc(o.ALWAYS,n,4294967295),s.buffers.stencil.setClear(r),s.buffers.stencil.setLocked(!0),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(o.EQUAL,1,4294967295),s.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),s.buffers.stencil.setLocked(!0)}}class Ii extends Le{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Oi{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const a=e.getSize(new k);this._width=a.width,this._height=a.height,t=new Te(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Pe}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Xe(Ze),this.copyPass.material.blending=Me,this.clock=new kt}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let a=!1;for(let o=0,s=this.passes.length;o<s;o++){const n=this.passes[o];if(n.enabled!==!1){if(n.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(o),n.render(this.renderer,this.writeBuffer,this.readBuffer,e,a),n.needsSwap){if(a){const r=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}Lt!==void 0&&(n instanceof Lt?a=!0:n instanceof Ii&&(a=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new k);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const a=this._width*this._pixelRatio,o=this._height*this._pixelRatio;this.renderTarget1.setSize(a,o),this.renderTarget2.setSize(a,o);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(a,o)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class ji extends Le{constructor(e,t,a=null,o=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=a,this.clearColor=o,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new re}render(e,t,a){const o=e.autoClear;e.autoClear=!1;let s,n;this.overrideMaterial!==null&&(n=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=n),e.autoClear=o}}const ki={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new re(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class We extends Le{constructor(e,t,a,o){super(),this.strength=t!==void 0?t:1,this.radius=a,this.threshold=o,this.resolution=e!==void 0?new k(e.x,e.y):new k(256,256),this.clearColor=new re(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);this.renderTargetBright=new Te(s,n,{type:Pe}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let l=0;l<this.nMips;l++){const m=new Te(s,n,{type:Pe});m.texture.name="UnrealBloomPass.h"+l,m.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(m);const S=new Te(s,n,{type:Pe});S.texture.name="UnrealBloomPass.v"+l,S.texture.generateMipmaps=!1,this.renderTargetsVertical.push(S),s=Math.round(s/2),n=Math.round(n/2)}const r=ki;this.highPassUniforms=ve.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=o,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ie({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const h=[3,5,7,9,11];s=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);for(let l=0;l<this.nMips;l++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(h[l])),this.separableBlurMaterials[l].uniforms.invSize.value=new k(1/s,1/n),s=Math.round(s/2),n=Math.round(n/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const f=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=f,this.bloomTintColors=[new K(1,1,1),new K(1,1,1),new K(1,1,1),new K(1,1,1),new K(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Ze;this.copyUniforms=ve.clone(u.uniforms),this.blendMaterial=new ie({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Vt,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new re,this.oldClearAlpha=1,this.basic=new Kt,this.fsQuad=new Oe(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let a=Math.round(e/2),o=Math.round(t/2);this.renderTargetBright.setSize(a,o);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(a,o),this.renderTargetsVertical[s].setSize(a,o),this.separableBlurMaterials[s].uniforms.invSize.value=new k(1/a,1/o),a=Math.round(a/2),o=Math.round(o/2)}render(e,t,a,o,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const n=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=a.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let r=this.renderTargetBright;for(let h=0;h<this.nMips;h++)this.fsQuad.material=this.separableBlurMaterials[h],this.separableBlurMaterials[h].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[h].uniforms.direction.value=We.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[h]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[h].uniforms.colorTexture.value=this.renderTargetsHorizontal[h].texture,this.separableBlurMaterials[h].uniforms.direction.value=We.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[h]),e.clear(),this.fsQuad.render(e),r=this.renderTargetsVertical[h];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(a),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=n}getSeperableBlurMaterial(e){const t=[];for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(e*e))/e);return new ie({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new k(.5,.5)},direction:{value:new k(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new ie({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}We.BlurDirectionX=new k(1,0);We.BlurDirectionY=new k(0,1);const Vi={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Bi extends Le{constructor(){super();const e=Vi;this.uniforms=ve.clone(e.uniforms),this.material=new Jt({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Oe(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,a){this.uniforms.tDiffuse.value=a.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ei.getTransfer(this._outputColorSpace)===ti&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ii?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ai?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===si?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===oi?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ni?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Bt&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const ot={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new k},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Ae},cameraProjectionMatrixInverse:{value:new Ae},cameraWorldMatrix:{value:new Ae},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new K(-1,-1,-1)},sceneBoxMax:{value:new K(1,1,1)}},vertexShader:`

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
		}`},nt={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},vt={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function $i(i=5){const e=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),t=Gi(e),a=t.length,o=new Uint8Array(a*4);for(let n=0;n<a;++n){const r=t[n],h=2*Math.PI*r/a,f=new K(Math.cos(h),Math.sin(h),0).normalize();o[n*4]=(f.x*.5+.5)*255,o[n*4+1]=(f.y*.5+.5)*255,o[n*4+2]=127,o[n*4+3]=255}const s=new $t(o,e,e);return s.wrapS=ut,s.wrapT=ut,s.needsUpdate=!0,s}function Gi(i){const e=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),t=e*e,a=Array(t).fill(0);let o=Math.floor(e/2),s=e-1;for(let n=1;n<=t;){if(o===-1&&s===e?(s=e-2,o=0):(s===e&&(s=0),o<0&&(o=e-1)),a[o*e+s]!==0){s-=2,o++;continue}else a[o*e+s]=n++;s++,o--}return a}const rt={defines:{SAMPLES:16,SAMPLE_VECTORS:Ht(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new k},cameraProjectionMatrixInverse:{value:new Ae},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Ht(i,e,t){const a=Hi(i,e,t);let o="vec3[SAMPLES](";for(let s=0;s<i;s++){const n=a[s];o+=`vec3(${n.x}, ${n.y}, ${n.z})${s<i-1?",":")"}`}return o}function Hi(i,e,t){const a=[];for(let o=0;o<i;o++){const s=2*Math.PI*e*o/i,n=Math.pow(o/(i-1),t);a.push(new K(Math.cos(s),Math.sin(s),n))}return a}class Wi{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(e,t,a){return e[0]*t+e[1]*a}dot3(e,t,a,o){return e[0]*t+e[1]*a+e[2]*o}dot4(e,t,a,o,s){return e[0]*t+e[1]*a+e[2]*o+e[3]*s}noise(e,t){let a,o,s;const n=.5*(Math.sqrt(3)-1),r=(e+t)*n,h=Math.floor(e+r),f=Math.floor(t+r),u=(3-Math.sqrt(3))/6,l=(h+f)*u,m=h-l,S=f-l,v=e-m,C=t-S;let N,P;v>C?(N=1,P=0):(N=0,P=1);const x=v-N+u,b=C-P+u,d=v-1+2*u,c=C-1+2*u,g=h&255,D=f&255,R=this.perm[g+this.perm[D]]%12,y=this.perm[g+N+this.perm[D+P]]%12,L=this.perm[g+1+this.perm[D+1]]%12;let U=.5-v*v-C*C;U<0?a=0:(U*=U,a=U*U*this.dot(this.grad3[R],v,C));let F=.5-x*x-b*b;F<0?o=0:(F*=F,o=F*F*this.dot(this.grad3[y],x,b));let J=.5-d*d-c*c;return J<0?s=0:(J*=J,s=J*J*this.dot(this.grad3[L],d,c)),70*(a+o+s)}noise3d(e,t,a){let o,s,n,r;const f=(e+t+a)*.3333333333333333,u=Math.floor(e+f),l=Math.floor(t+f),m=Math.floor(a+f),S=1/6,v=(u+l+m)*S,C=u-v,N=l-v,P=m-v,x=e-C,b=t-N,d=a-P;let c,g,D,R,y,L;x>=b?b>=d?(c=1,g=0,D=0,R=1,y=1,L=0):x>=d?(c=1,g=0,D=0,R=1,y=0,L=1):(c=0,g=0,D=1,R=1,y=0,L=1):b<d?(c=0,g=0,D=1,R=0,y=1,L=1):x<d?(c=0,g=1,D=0,R=0,y=1,L=1):(c=0,g=1,D=0,R=1,y=1,L=0);const U=x-c+S,F=b-g+S,J=d-D+S,ge=x-R+2*S,De=b-y+2*S,_e=d-L+2*S,te=x-1+3*S,xe=b-1+3*S,O=d-1+3*S,Se=u&255,be=l&255,we=m&255,ke=this.perm[Se+this.perm[be+this.perm[we]]]%12,Ue=this.perm[Se+c+this.perm[be+g+this.perm[we+D]]]%12,Ve=this.perm[Se+R+this.perm[be+y+this.perm[we+L]]]%12,ae=this.perm[Se+1+this.perm[be+1+this.perm[we+1]]]%12;let se=.6-x*x-b*b-d*d;se<0?o=0:(se*=se,o=se*se*this.dot3(this.grad3[ke],x,b,d));let ee=.6-U*U-F*F-J*J;ee<0?s=0:(ee*=ee,s=ee*ee*this.dot3(this.grad3[Ue],U,F,J));let q=.6-ge*ge-De*De-_e*_e;q<0?n=0:(q*=q,n=q*q*this.dot3(this.grad3[Ve],ge,De,_e));let le=.6-te*te-xe*xe-O*O;return le<0?r=0:(le*=le,r=le*le*this.dot3(this.grad3[ae],te,xe,O)),32*(o+s+n+r)}noise4d(e,t,a,o){const s=this.grad4,n=this.simplex,r=this.perm,h=(Math.sqrt(5)-1)/4,f=(5-Math.sqrt(5))/20;let u,l,m,S,v;const C=(e+t+a+o)*h,N=Math.floor(e+C),P=Math.floor(t+C),x=Math.floor(a+C),b=Math.floor(o+C),d=(N+P+x+b)*f,c=N-d,g=P-d,D=x-d,R=b-d,y=e-c,L=t-g,U=a-D,F=o-R,J=y>L?32:0,ge=y>U?16:0,De=L>U?8:0,_e=y>F?4:0,te=L>F?2:0,xe=U>F?1:0,O=J+ge+De+_e+te+xe,Se=n[O][0]>=3?1:0,be=n[O][1]>=3?1:0,we=n[O][2]>=3?1:0,ke=n[O][3]>=3?1:0,Ue=n[O][0]>=2?1:0,Ve=n[O][1]>=2?1:0,ae=n[O][2]>=2?1:0,se=n[O][3]>=2?1:0,ee=n[O][0]>=1?1:0,q=n[O][1]>=1?1:0,le=n[O][2]>=1?1:0,qe=n[O][3]>=1?1:0,Ee=y-Se+f,Ce=L-be+f,Re=U-we+f,Be=F-ke+f,$e=y-Ue+2*f,he=L-Ve+2*f,p=U-ae+2*f,M=F-se+2*f,_=y-ee+3*f,z=L-q+3*f,X=U-le+3*f,Q=F-qe+3*f,Y=y-1+4*f,T=L-1+4*f,B=U-1+4*f,fe=F-1+4*f,Z=N&255,ce=P&255,pe=x&255,ue=b&255,Ne=r[Z+r[ce+r[pe+r[ue]]]]%32,oe=r[Z+Se+r[ce+be+r[pe+we+r[ue+ke]]]]%32,Fe=r[Z+Ue+r[ce+Ve+r[pe+ae+r[ue+se]]]]%32,me=r[Z+ee+r[ce+q+r[pe+le+r[ue+qe]]]]%32,w=r[Z+1+r[ce+1+r[pe+1+r[ue+1]]]]%32;let j=.6-y*y-L*L-U*U-F*F;j<0?u=0:(j*=j,u=j*j*this.dot4(s[Ne],y,L,U,F));let E=.6-Ee*Ee-Ce*Ce-Re*Re-Be*Be;E<0?l=0:(E*=E,l=E*E*this.dot4(s[oe],Ee,Ce,Re,Be));let A=.6-$e*$e-he*he-p*p-M*M;A<0?m=0:(A*=A,m=A*A*this.dot4(s[Fe],$e,he,p,M));let $=.6-_*_-z*z-X*X-Q*Q;$<0?S=0:($*=$,S=$*$*this.dot4(s[me],_,z,X,Q));let Qe=.6-Y*Y-T*T-B*B-fe*fe;return Qe<0?v=0:(Qe*=Qe,v=Qe*Qe*this.dot4(s[w],Y,T,B,fe)),27*(u+l+m+S+v)}}class de extends Le{constructor(e,t,a,o,s,n,r){super(),this.width=a!==void 0?a:512,this.height=o!==void 0?o:512,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=$i(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new Te(this.width,this.height,{type:Pe}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new ie({defines:Object.assign({},ot.defines),uniforms:ve.clone(ot.uniforms),vertexShader:ot.vertexShader,fragmentShader:ot.fragmentShader,blending:Me,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new ri,this.normalMaterial.blending=Me,this.pdMaterial=new ie({defines:Object.assign({},rt.defines),uniforms:ve.clone(rt.uniforms),vertexShader:rt.vertexShader,fragmentShader:rt.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new ie({defines:Object.assign({},nt.defines),uniforms:ve.clone(nt.uniforms),vertexShader:nt.vertexShader,fragmentShader:nt.fragmentShader,blending:Me}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new ie({uniforms:ve.clone(Ze.uniforms),vertexShader:Ze.vertexShader,fragmentShader:Ze.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Rt,blendDst:at,blendEquation:it,blendSrcAlpha:Ct,blendDstAlpha:at,blendEquationAlpha:it}),this.blendMaterial=new ie({uniforms:ve.clone(vt.uniforms),vertexShader:vt.vertexShader,fragmentShader:vt.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:li,blendSrc:Rt,blendDst:at,blendEquation:it,blendSrcAlpha:Ct,blendDstAlpha:at,blendEquationAlpha:it}),this.fsQuad=new Oe(null),this.originalClearColor=new re,this.setGBuffer(s?s.depthTexture:void 0,s?s.normalTexture:void 0),n!==void 0&&this.updateGtaoMaterial(n),r!==void 0&&this.updatePdMaterial(r)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new ci,this.depthTexture.format=ui,this.depthTexture.type=di,this.normalRenderTarget=new Te(this.width,this.height,{minFilter:dt,magFilter:dt,type:Pe,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const a=this.normalTexture?1:0,o=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=a,this.gtaoMaterial.defines.DEPTH_SWIZZLING=o,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=a,this.pdMaterial.defines.DEPTH_SWIZZLING=o,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Ht(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,a){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case de.OUTPUT.Off:break;case de.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=a.texture,this.copyMaterial.blending=Me,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case de.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=Me,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case de.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=Me,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case de.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case de.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Me,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case de.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=a.texture,this.copyMaterial.blending=Me,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(e,t,a,o,s){e.getClearColor(this.originalClearColor);const n=e.getClearAlpha(),r=e.autoClear;e.setRenderTarget(a),e.autoClear=!1,o!=null&&(e.setClearColor(o),e.setClearAlpha(s||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=r,e.setClearColor(this.originalClearColor),e.setClearAlpha(n)}renderOverride(e,t,a,o,s){e.getClearColor(this.originalClearColor);const n=e.getClearAlpha(),r=e.autoClear;e.setRenderTarget(a),e.autoClear=!1,o=t.clearColor||o,s=t.clearAlpha||s,o!=null&&(e.setClearColor(o),e.setClearAlpha(s||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=r,e.setClearColor(this.originalClearColor),e.setClearAlpha(n)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(a){t.set(a,a.visible),(a.isPoints||a.isLine)&&(a.visible=!1)})}restoreVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(a){const o=t.get(a);a.visible=o}),t.clear()}generateNoise(e=64){const t=new Wi,a=e*e*4,o=new Uint8Array(a);for(let n=0;n<e;n++)for(let r=0;r<e;r++){const h=n,f=r;o[(n*e+r)*4]=(t.noise(h,f)*.5+.5)*255,o[(n*e+r)*4+1]=(t.noise(h+e,f)*.5+.5)*255,o[(n*e+r)*4+2]=(t.noise(h,f+e)*.5+.5)*255,o[(n*e+r)*4+3]=(t.noise(h+e,f+e)*.5+.5)*255}const s=new $t(o,e,e,hi,fi);return s.wrapS=ut,s.wrapT=ut,s.needsUpdate=!0,s}}de.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const qi={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new k(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		// FXAA algorithm from NVIDIA, C# implementation by Jasper Flick, GLSL port by Dave Hoskins
		// http://developer.download.nvidia.com/assets/gamedev/files/sdk/11/FXAA_WhitePaper.pdf
		// https://catlikecoding.com/unity/tutorials/advanced-rendering/fxaa/

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;
			
			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {
				
				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );
			
		}`},Qi={uniforms:{tDiffuse:{value:null},tDepth:{value:null},uProjInv:{value:new Ae},uCamWorld:{value:new Ae},uPrevVP:{value:new Ae},uAmt:{value:.35},uScale:{value:1}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
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
    }`},Xi={uniforms:{tDiffuse:{value:null},uShadow:{value:new re(.2,.13,.32)},uHighlight:{value:new re(1,.93,.86)},uSat:{value:1.08},uVignette:{value:.32},uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform vec3 uShadow, uHighlight; uniform float uSat, uVignette, uTime;
    varying vec2 vUv;
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      float l = dot(c.rgb, vec3(0.299, 0.587, 0.114));
      c.rgb = mix(vec3(l), c.rgb, uSat);
      c.rgb = mix(c.rgb + uShadow * 0.12 * (1.0 - l), c.rgb * uHighlight, smoothstep(0.4, 1.0, l) * 0.5);
      vec2 v = vUv - 0.5; c.rgb *= 1.0 - uVignette * dot(v, v) * 2.2;
      gl_FragColor = c;
    }`};class Yi extends Le{constructor(e){super(),this.outline=e,this.needsSwap=!1}render(){this.outline.renderScene()}}const Ut={uniforms:{tRaw:{value:null},tPaint:{value:null},tDepth:{value:null},uNear:{value:.1},uFar:{value:1e3},uRange:{value:new pi(4,30,.15,1)}},vertexShader:Gt.vertexShader,fragmentShader:`
    #include <packing>
    uniform sampler2D tRaw, tPaint, tDepth; uniform float uNear, uFar; uniform vec4 uRange;
    varying vec2 vUv;
    void main(){
      float d = texture2D(tDepth, vUv).x;
      float z = d >= 0.99999 ? 1e6 : -perspectiveDepthToViewZ(d, uNear, uFar);
      float k = mix(uRange.z, uRange.w, smoothstep(uRange.x, uRange.y, z));
      gl_FragColor = vec4(mix(texture2D(tRaw, vUv).rgb, texture2D(tPaint, vUv).rgb, k), 1.0);
    }`};class Zi extends Le{constructor(e,t,{radius:a=5,hard:o=8,sharp:s=8,scale:n=1,maxPixels:r=960*540,near:h=4,far:f=30,nearAmt:u=.15,farAmt:l=1}={}){super(),this.outline=e,this.camera=t,this.needsSwap=!1,this.scale=n,this.maxPixels=e.optimized?r:1/0,this.rt=new Te(1,1,{type:Pe,depthBuffer:!1}),this.out=new Te(1,1,{type:Pe,depthBuffer:!1});const S=e.optimized&&a<=5&&new URLSearchParams(location.search).get("kernel")!=="legacy"?_i(a,s):Gt;this.quad=new Oe(new ie({...S,uniforms:ve.clone(S.uniforms),defines:{RADIUS:a|0},depthTest:!1,depthWrite:!1})),this.quad.material.uniforms.uHard.value=o,this.quad.material.uniforms.uSharp.value=s,this.blend=new Oe(new ie({...Ut,uniforms:ve.clone(Ut.uniforms),depthTest:!1,depthWrite:!1}));const v=this.blend.material.uniforms;v.tPaint.value=this.rt.texture,v.tDepth.value=e.rt.depthTexture,v.uRange.value.set(h,f,u,l)}get texture(){return this.out.texture}setSize(e,t){const a=Math.min(this.scale,Math.sqrt(this.maxPixels/(e*t))),o=Math.max(1,Math.round(e*a)),s=Math.max(1,Math.round(t*a));this.rt.setSize(o,s),this.quad.material.uniforms.uTexel.value.set(1/Math.max(1,e*this.scale),1/Math.max(1,t*this.scale)),this.out.setSize(e,t)}render(e,t,a){const o=this.outline.depthReuse?this.outline.sceneRT:a;this.quad.material.uniforms.tSrc.value=o.texture,e.setRenderTarget(this.rt),this.quad.render(e);const s=this.blend.material.uniforms;s.tRaw.value=o.texture,s.uNear.value=this.camera.near,s.uFar.value=this.camera.far,e.setRenderTarget(this.out),this.blend.render(e)}}function Ki(i,e,t,a={}){const o=i.getSize(new k),s=new Oi(i),n=new URLSearchParams(location.search).get("zpre")!=="0",r=a.outline?new Di(i,e,t,{...a.outline,depthReuse:n}):null,h=!!r?.optimized;r?.depthReuse?(s.addPass(new Yi(r)),r.pass.textureID=null,r.pass.uniforms.tDiffuse.value=r.sceneRT.texture):s.addPass(new ji(e,t));const f=()=>r?.depthReuse?r.sceneRT:s.readBuffer;let u=null;const l=a.ao===!1?null:{...a.ao||{}};if(r&&l&&new URLSearchParams(location.search).get("ao")!=="0"){const d=i.getDrawingBufferSize(new k);if(u=new de(e,t,d.x,d.y,void 0,{radius:1.1,distanceExponent:1.5,thickness:1.5,scale:1,samples:12,distanceFallOff:1,...l.gtao},{lumaPhi:10,depthPhi:2,normalPhi:3,radius:6,rings:2,samples:12,...l.denoise}),u.setGBuffer(r.rt.depthTexture,r.rt.texture),h){const g=u.setSize.bind(u),D=Number(new URLSearchParams(location.search).get("aoscale")||.5),R=Number.isFinite(D)?yt.clamp(D,.25,1):.5,y=u.pdMaterial.uniforms.radius.value;u.setSize=(L,U)=>{const F=Math.min(R,Math.sqrt((l.maxPixels??518400)/(L*U)));g(Math.max(1,Math.round(L*F)),Math.max(1,Math.round(U*F))),r.pass.uniforms.uAORes.value.set(u.width,u.height),u.pdMaterial.uniforms.radius.value=y*F},u.setSize(d.x,d.y),u.gtaoRenderTarget.depthBuffer=!1,u.pdRenderTarget.depthBuffer=!1,u.pdMaterial.fragmentShader=u.pdMaterial.fragmentShader.replace("void main() {",`
        vec2 packNormal(vec3 n){
          n/=max(abs(n.x)+abs(n.y)+abs(n.z),1e-6);
          vec2 p=n.xy;
          if(n.z<0.0)p=(1.0-abs(p.yx))*vec2(p.x>=0.0?1.0:-1.0,p.y>=0.0?1.0:-1.0);
          return p;
        }
        void main() {`).replace("gl_FragColor = FRAGMENT_OUTPUT;","gl_FragColor=vec4(denoised.r,-viewPos.z,packNormal(viewNormal));"),u.pdMaterial.fragmentShader=u.pdMaterial.fragmentShader.replace(`discard;
				return;`,"gl_FragColor=vec4(1.0,65504.0,0.0,0.0);return;"),u.pdMaterial.needsUpdate=!0,u.pdRenderTarget.texture.minFilter=dt,u.pdRenderTarget.texture.magFilter=dt}u.output=de.OUTPUT.Off,u.needsSwap=!1,s.addPass(u);const c=r.pass.uniforms;c.tAO.value=u.pdRenderTarget.texture,c.uAOStrength.value=l.strength??.85,l.tint!==void 0&&c.uAOTint.value.set(l.tint),l.cover!==void 0&&(c.uAOCover.value=l.cover),l.fade&&c.uAOFade.value.set(...l.fade),l.contrast&&c.uAOContrast.value.set(...l.contrast)}let m=null;r&&a.paint&&new URLSearchParams(location.search).get("paint")!=="0"&&(m=new Zi(r,t,a.paint),s.addPass(m),r.pass.textureID=null,r.pass.uniforms.tDiffuse.value=m.texture),r&&s.addPass(r.pass);let S=null;if(a.bloom!==!1){const[d,c,g]=a.bloom||[.35,.5,.9];S=new We(o,d,c,g),s.addPass(S)}let v=null;const C=a.mblur??.22;r&&C>0&&new URLSearchParams(location.search).get("mblur")!=="0"&&(v=new Xe(Qi),v.uniforms.tDepth.value=r.rt.depthTexture,v.uniforms.uAmt.value=C,s.addPass(v));const N=new Xe(Xi);for(const[d,c]of Object.entries(a.grade||{})){const g=N.uniforms[d];g.value?.isColor?g.value.set(c):g.value=c}s.addPass(N);let P=null;if(a.finish&&new URLSearchParams(location.search).get("finish")!=="0"){P=new Xe(a.finish.shader);for(const[d,c]of Object.entries(a.finish.uniforms||{})){const g=P.uniforms[d];g.value?.isColor?g.value.set(c):g.value=c}P.uniforms.tDepth&&r&&(P.uniforms.tDepth.value=r.rt.depthTexture),P.uniforms.uRes?.value.copy(i.getDrawingBufferSize(new k)),s.addPass(P)}const x=new Bi;if(h&&!P){N.enabled=!1;for(const[d,c]of Object.entries(N.uniforms))d!=="tDiffuse"&&(x.uniforms[d]=c);x.material.fragmentShader=x.material.fragmentShader.replace("uniform sampler2D tDiffuse;","uniform sampler2D tDiffuse; uniform vec3 uShadow,uHighlight; uniform float uSat,uVignette;").replace("// tone mapping",`float l=dot(gl_FragColor.rgb,vec3(0.299,0.587,0.114));
        gl_FragColor.rgb=mix(vec3(l),gl_FragColor.rgb,uSat);
        gl_FragColor.rgb=mix(gl_FragColor.rgb+uShadow*0.12*(1.0-l),gl_FragColor.rgb*uHighlight,smoothstep(0.4,1.0,l)*0.5);
        vec2 v=vUv-0.5; gl_FragColor.rgb*=1.0-uVignette*dot(v,v)*2.2;
        // tone mapping`)}s.addPass(x);const b=a.antialias?new Xe(qi):null;if(b){const d=i.getDrawingBufferSize(new k);b.uniforms.resolution.value.set(1/d.x,1/d.y),s.addPass(b)}return{composer:s,bloom:S,grade:N,outline:r,ao:u,finish:P,paint:m,output:x,quality:{maxPixels:a.maxPixels??(h?1920*1080:1/0),minScale:a.minScale},suspend(){s.setSize(1,1),r?.suspend(),m?.rt.setSize(1,1),m?.out.setSize(1,1)},render(d){P?.uniforms.uProjInv&&(P.uniforms.uProjInv.value.copy(t.projectionMatrixInverse),P.uniforms.uCamWorld.value.copy(t.matrixWorld));const c=i.shadowMap,g=c.autoUpdate;if(g&&(c.autoUpdate=!1,c.needsUpdate=!0),v){const R=v.uniforms;t.updateMatrixWorld(),R.uProjInv.value.copy(t.projectionMatrixInverse),R.uCamWorld.value.copy(t.matrixWorld);const y=new Ae().multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse);this._prevVP||(this._prevVP=y.clone()),R.uPrevVP.value.copy(this._prevVP),R.uScale.value=d>0?Math.min(1,1/60/d):0,this._prevVP.copy(y)}const D=r?.pass.uniforms;D?.uProjInv&&(t.updateMatrixWorld(),D.uProjInv.value.copy(t.projectionMatrixInverse),D.uCamWorld.value.copy(t.matrixWorld)),r?.prepass(),s.render(d),c.autoUpdate=g},async precompile(){e.traverse(g=>{for(const D of Array.isArray(g.material)?g.material:g.material?[g.material]:[]){for(const R of Object.values(D))R?.isTexture&&!R.isRenderTargetTexture&&i.initTexture(R);if(D.uniforms)for(const R of Object.values(D.uniforms))R?.value?.isTexture&&!R.value.isRenderTargetTexture&&i.initTexture(R.value)}});const d=i.getRenderTarget();i.setRenderTarget(f());const c=i.compileAsync(e,t);i.setRenderTarget(d),await Promise.all([c,r?.precompile()])},warmUp(){const d=[];e.traverse(c=>{c.frustumCulled&&(c.frustumCulled=!1,d.push(c))}),this.render(0);for(const c of d)c.frustumCulled=!0},setSize(d,c){s.setPixelRatio(i.getPixelRatio()),s.setSize(d,c),r?.setSize(d,c);const g=i.getDrawingBufferSize(new k);P?.uniforms.uRes?.value.copy(g),b?.uniforms.resolution.value.set(1/g.x,1/g.y)}}}const Nt="pw.stats",Ji=["lit","wireframe","overdraw","draw calls","outline normals","ambient occlusion"],Ft="float dbgDist = 1.0 / gl_FragCoord.w;",ea={1:`${Ft} gl_FragColor = vec4(mix(vec3(0.16, 0.3, 0.34), vec3(0.55, 1.0, 0.85), exp(-dbgDist / 90.0)), 1.0);`,2:"gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);",3:`${Ft} gl_FragColor = vec4(uDbgColor * (0.45 + 0.55 * exp(-dbgDist / 160.0)), 1.0);`},ta=`
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
  }`,ia="uniform sampler2D tMap; varying vec2 vUv; void main(){ gl_FragColor = vec4(texture2D(tMap, vUv).rgb, 1.0); }",zt="varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }";function aa(i,e){const t=/void\s+main\s*\(\s*\)/g;let a,o=null;for(;a=t.exec(i);)o=a;return o?`uniform vec3 uDbgColor;
`+i.slice(0,o.index)+"void _dbgMain()"+i.slice(o.index+o[0].length)+`
void main(){ _dbgMain(); ${e} }
`:i}const sa=i=>{const e=(i*.61803398875%1+1)%1;return new re().setHSL(e,.62,.55)};function oa(i,e,t){const a=i.clone();i.isShaderMaterial&&(a.uniforms={...i.uniforms});const o={value:t},s=i.onBeforeCompile,n=s&&s!==Si.prototype.onBeforeCompile;a.onBeforeCompile=function(h,f){n&&s.call(this,h,f),h.uniforms.uDbgColor=o,h.fragmentShader=aa(h.fragmentShader,ea[e])};const r=i.customProgramCacheKey.call(i);return a.customProgramCacheKey=()=>`${r}|dbg${e}`,e===1&&(a.wireframe=!0),e===2&&Object.assign(a,{blending:Vt,transparent:!0,depthTest:!1,depthWrite:!1}),a}const na=i=>i.userData.isSky||i.material?.side===xi&&i.material?.depthWrite===!1,gt=i=>i>=1e6?(i/1e6).toFixed(2)+"M":i>=1e4?(i/1e3).toFixed(0)+"k":i>=1e3?(i/1e3).toFixed(1)+"k":String(Math.round(i)),xt=i=>(i/1048576).toFixed(1);function ra(i){for(const[e,t]of Object.entries(Dt))if(t===i&&/Format$/.test(e))return e.replace(/_Format$|Format$/,"").replace(/^RGBA?_/,"");return String(i)}function la(i,e,t,a){const o=i.info,s=i.getContext(),n=s.getExtension("WEBGL_debug_renderer_info"),r=(n?s.getParameter(n.UNMASKED_RENDERER_WEBGL):s.getParameter(s.RENDERER)).replace(/^ANGLE \((.*)\)$/,"$1").replace(/ Direct3D.*$/,"").replace(/\s*\(0x[0-9A-Fa-f]+\)/g,""),h=s.getSupportedExtensions()||[],f=p=>h.includes(p),u=[["bc7","EXT_texture_compression_bptc"],["s3tc","WEBGL_compressed_texture_s3tc"],["etc","WEBGL_compressed_texture_etc"],["astc","WEBGL_compressed_texture_astc"]].filter(([,p])=>f(p)).map(([p])=>p).join(" ")||"none",l={maxTex:s.getParameter(s.MAX_TEXTURE_SIZE),msaa:s.getContextAttributes().antialias?s.getParameter(s.SAMPLES):0},m=Object.fromEntries(Object.entries(Dt).filter(([p])=>/ToneMapping$/.test(p)).map(([p,M])=>[M,p.replace("ToneMapping","")])),S={[gi]:"Basic",[vi]:"PCF",[mt]:"PCFSoft",[mi]:"VSM"},v=document.createElement("div");v.id="stats",v.innerHTML='<canvas width="260" height="48"></canvas><pre class="body"></pre><div class="views"></div><pre class="legend"></pre>',document.body.appendChild(v);const C=v.querySelector("canvas").getContext("2d"),N=v.querySelector(".body"),P=v.querySelector(".views"),x=v.querySelector(".legend");let b=!1,d=0;try{b=localStorage.getItem(Nt)==="1"}catch{}const c=()=>{P.innerHTML=Ji.slice(1).map((p,M)=>`<span class="${d===M+1?"on":""}">${M+1} ${p}</span>`).join(""),x.textContent=d===2?`layers  1 blue · 2 green · 3-4 yellow
        5-8 orange · 9-16 magenta · 17+ white`:d===3?"each colour = one draw call":d===4?'grass/foliage/water write "cover" (no ink)':d===5?"white = open, dark = occluded (off with ?ao=0)":"",x.hidden=!x.textContent},g=p=>{b=p,v.hidden=!p,p||(d=0),c();try{localStorage.setItem(Nt,p?"1":"0")}catch{}};g(b),addEventListener("keydown",p=>{if(p.repeat)return;if(p.code==="Backquote"){g(!b);return}if(!b)return;const M={Digit1:1,Digit2:2,Digit3:3,Digit4:4,Digit5:5}[p.code];M&&(d=d===M?0:M,c())});const D=new URLSearchParams(location.search),R=`textures ${D.get("ktx")==="0"?"webp":"ktx2"} · meshes ${D.get("draco")==="0"?"raw glb":"draco"}`;let y=!1,L=[],U={calls:0,tris:0};const F=()=>({calls:o.render.calls,tris:o.render.triangles}),J=i.render.bind(i);i.render=(p,M)=>{if(!y)return J(p,M);const _=F(),z={...U},X=i.getRenderTarget();J(p,M);const Q=F();L.push({scene:p,target:X,calls:Q.calls-_.calls-(U.calls-z.calls),tris:Q.tris-_.tris-(U.tris-z.tris)})};const ge=i.shadowMap,De=ge.render.bind(ge);ge.render=(...p)=>{if(!y)return De(...p);const M=F();De(...p);const _=F();U.calls+=_.calls-M.calls,U.tris+=_.tris-M.tris};const _e=new WeakMap;let te=null,xe=null,O=null;const Se=(p,M)=>{let _=_e.get(p);if(_||_e.set(p,_={}),!(M in _))try{_[M]=oa(p.material,M,sa(p.id))}catch(z){console.warn("[stats] no debug material for",p.name||p.type,z),_[M]=null}return _[M]||p.material},be=(p,M)=>{const _=i.getClearColor(new re),z=i.getClearAlpha();we(p,M),i.setClearColor(_,z)},we=(p,M)=>{const _=p.scene;if(d===4||d===5){const T=p.post?.outline,B=p.post?.ao;if(!T||d===5&&!B){ke();return}d===5?p.post.render(0):T.prepass(),xe??=new Oe(new ie({uniforms:{tMap:{value:null}},vertexShader:zt,fragmentShader:ia})),xe.material.uniforms.tMap.value=d===5?B.pdRenderTarget.texture:T.rt.texture,i.setRenderTarget(null),xe.render(i);return}const z=[],X=[];_.traverseVisible(T=>{if(!(!(T.isMesh||T.isPoints)||Array.isArray(T.material))){if(d!==2&&na(T)){T.visible=!1,X.push(T);return}z.push([T,T.material]),T.material=Se(T,d)}});const Q=_.background,Y=_.fog;if(_.background=d===2?null:new re(724502),_.fog=null,d===2){const T=i.getDrawingBufferSize(new k);(!te||te.width!==T.x||te.height!==T.y)&&(te?.dispose(),te=new Te(T.x,T.y,{type:Pe,depthBuffer:!1})),i.setRenderTarget(te),i.setClearColor(0,0),i.clear(),i.render(_,M),O??=new Oe(new ie({uniforms:{tCount:{value:null}},vertexShader:zt,fragmentShader:ta})),O.material.uniforms.tCount.value=te.texture,i.setRenderTarget(null),O.render(i)}else i.setRenderTarget(null),i.render(_,M);_.background=Q,_.fog=Y;for(const[T,B]of z)T.material=B;for(const T of X)T.visible=!0},ke=()=>{i.setRenderTarget(null),i.setClearColor(3149848,1),i.clear()};let Ue={};function Ve(p,M){const _=p.scene,z=new Map,X=new Set;let Q=0,Y=0,T=0,B=0,fe=0,Z=0,ce=[],pe=null;_.traverse(w=>{if(w.isLight&&(Z++,w.castShadow&&w.shadow&&ce.push(w.shadow.mapSize.x)),!(w.isMesh||w.isPoints))return;w.isPoints?fe++:Q++;let j=!0;w.traverseAncestors(A=>{A.visible||(j=!1)}),j&&w.visible&&Y++;const E=w.geometry;w.isInstancedMesh?(T+=w.count,B++):E.isInstancedBufferGeometry&&(T+=E.instanceCount,B++);for(const A of Object.values(E.attributes))X.add((A.data||A).array);E.index&&X.add(E.index.array);for(const A of Array.isArray(w.material)?w.material:[w.material])if(A){for(const $ of Object.values(A))$?.isTexture&&z.set($.source?.uuid||$.uuid,$);if(A.uniforms)for(const $ of Object.values(A.uniforms))$?.value?.isTexture&&z.set($.value.source?.uuid||$.value.uuid,$.value)}});let ue=0;for(const w of z.values())if(w.isCompressedTexture&&w.mipmaps?.length)ue+=w.mipmaps.reduce((j,E)=>j+(E.data?.byteLength||0),0),pe??=ra(w.format);else{const j=w.image;ue+=(j?.width||0)*(j?.height||0)*4*(w.generateMipmaps!==!1?4/3:1)}let Ne=0;for(const w of X)Ne+=w.byteLength;const oe=p.post,Fe=oe?.composer?.passes?.length??0,me=[oe?.ao&&"gtao",oe?.outline&&"outline",oe?.bloom&&`bloom ${oe.bloom.strength.toFixed(2)}`,oe?.grade&&"grade"].filter(Boolean).join(" · ");Ue={meshes:Q,visibleMeshes:Y,points:fe,inst:T,instObjs:B,lights:Z,shadowLights:ce,texB:ue,geoB:Ne,compressed:pe,texN:z.size,chain:me,passesN:Fe,shadowType:S[M.shadowMap.type]??"?"}}const ae=260,se=new Float32Array(ae);let ee=0,q=0,le=performance.now(),qe=0,Ee=0,Ce=0,Re=0,Be=0,$e=0,he=null;return{begin(){const p=performance.now();se[ee]=p-le,ee=(ee+1)%ae,q=Math.min(q+1,ae),le=p,b&&(o.autoReset=!1,o.reset(),L=[],U={calls:0,tris:0},y=!0,qe=Ee=p)},mark(){b&&(Ee=performance.now())},render(p,M){return!b||!d?!1:(be(p,M),!0)},end(){if(!b){o.autoReset=!0,y=!1;return}y=!1;const p=performance.now();Ce=Ce*.9+(Ee-qe)*.1,Re=Re*.9+(p-Ee)*.1;const{world:M,camera:_,player:z}=e(),X=M?.post?.outline,Q={outline:{calls:0,tris:0,n:0},main:{calls:0,tris:0,n:0},post:{calls:0,tris:0,n:0},debug:{calls:0,tris:0,n:0}};for(const E of L){const A=d?"debug":X&&E.target===X.rt?"outline":E.scene===M?.scene?"main":"post";Q[A].calls+=E.calls,Q[A].tris+=E.tris,Q[A].n++}he={agg:Q,shadow:{...U},calls:o.render.calls,tris:o.render.triangles,points:o.render.points};const Y=C,T=260,B=48,fe=B/40;Y.clearRect(0,0,T,B),Y.fillStyle="rgba(255,255,255,0.12)",Y.fillRect(0,B-16.7*fe,T,1),Y.fillRect(0,B-33.3*fe,T,1);for(let E=0;E<q;E++){const A=se[(ee-q+E+ae)%ae];Y.fillStyle=A>33.4?"#ff7a6b":A>17.5?"#ffc98a":"#8fe3a8";const $=Math.min(A*fe,B);Y.fillRect(T-q+E,B-$,1,$)}if(p<Be)return;Be=p+250,M&&p>$e&&(Ve(M,i),$e=p+2e3);const Z=Array.from({length:q},(E,A)=>se[(ee-q+A+ae)%ae]).sort((E,A)=>E-A),ce=Z.reduce((E,A)=>E+A,0)/(Z.length||1),pe=Z[Math.floor(Z.length*.99)]||0,ue=performance.memory?`${xt(performance.memory.usedJSHeapSize)} MB`:"n/a",Ne=i.getDrawingBufferSize(new k),oe=_.position,Fe=E=>E.toFixed(1),me=(E,A)=>`  ${E.padEnd(13)}${String(A.calls).padStart(6)}${gt(A.tris).padStart(9)}`,w=Ue,j=he.agg;N.textContent=[`FPS ${(1e3/ce).toFixed(0).padStart(4)}   1% low ${(1e3/(pe||1)).toFixed(0)}   worst ${Z[Z.length-1]?.toFixed(1)??"-"} ms`,`frame ${ce.toFixed(2)} ms`,`CPU   ${(Ce+Re).toFixed(2)} ms  (sim ${Ce.toFixed(2)} · render ${Re.toFixed(2)})`,`GPU   ${t.supported?isNaN(t.ms)?"...":t.ms.toFixed(2)+" ms":"n/a (no timer query)"}`,`res   ${a.enabled?`${Math.round(a.scale*100)}% dynamic (GPU budget ${a.budget} ms)`:"100% fixed (dynamic res off)"}`,"",`PASSES          calls  ${d===1?"lines":" tris"}`,...d?[me(["","wireframe","overdraw","draw calls","outline nrm","ao buffer"][d],d===1?{calls:j.debug.calls,tris:o.render.lines}:j.debug),me("shadow",he.shadow)]:[me("shadow",he.shadow),me("outline pre",j.outline),me("main",j.main),me(`post (${j.post.n})`,j.post)],`  ${"total".padEnd(13)}${String(he.calls).padStart(6)}${gt(he.tris).padStart(9)}`,"","SCENE",`  meshes ${w.meshes} (${w.visibleMeshes} visible) · points ${w.points}`,`  instances ${gt(w.inst??0)} in ${w.instObjs} batches`,`  lights ${w.lights} · shadow ${w.shadowLights?.map(E=>E+"²").join(" ")||"none"} ${w.shadowType}`,`  post ${w.chain||"none"} (${w.passesN} passes)`,"","MEMORY",`  textures ${w.texN} · tex VRAM ~${xt(w.texB??0)} MB`,`  gpu format ${w.compressed??"uncompressed RGBA8"}`,`  geometry ~${xt(w.geoB??0)} MB · ${o.memory.geometries} geos`,`  programs ${o.programs?.length??0} · JS heap ${ue}`,"","RENDERER",`  ${r}`,`  ${Ne.x}x${Ne.y} @${i.getPixelRatio()}x · MSAA ${l.msaa?l.msaa+"x":"off"}`,`  tonemap ${m[i.toneMapping]??"?"} · exposure ${i.toneMappingExposure.toFixed(2)}`,`  max tex ${l.maxTex} · formats ${u}`,"",`WORLD  ${M?.name??"-"} · ${R}`,`  pos ${Fe(oe.x)} ${Fe(oe.y)} ${Fe(oe.z)} · yaw ${z.yaw.toFixed(2)} · pitch ${(z.pitch??0).toFixed(2)}`,`  fov ${_.fov} · far ${_.far}`].join(`
`)}}}function ca(i){const e=i.getExtension("EXT_disjoint_timer_query_webgl2"),t=[];let a=null,o=NaN,s=0;return{supported:!!e,get ms(){return o},get stamp(){return s},begin(){if(e){for(let n=t.length-1;n>=0;n--){const r=t[n];i.getQueryParameter(r,i.QUERY_RESULT_AVAILABLE)&&(i.getParameter(e.GPU_DISJOINT_EXT)||(o=i.getQueryParameter(r,i.QUERY_RESULT)/1e6,s++),i.deleteQuery(r),t.splice(n,1))}t.length<4&&(a=i.createQuery(),i.beginQuery(e.TIME_ELAPSED_EXT,a),t.push(a))}},end(){a&&(i.endQuery(e.TIME_ELAPSED_EXT),a=null)}}}const Ge=[1,.85,.75,.6,.5,.42,.35];function ua(i,e,t){const a=new URLSearchParams(location.search),o=a.get("dynres"),s=o!=="0"&&(o==="1"||!navigator.webdriver),n=Number(a.get("budget")||(I?ze.budget:12)),r=Number.isFinite(n)&&n>0?n:12;let h=1/0,f=Ge.length-1;const u=()=>Math.min(devicePixelRatio,I?ze.pixelRatio:2,Math.sqrt(Math.min(h,I?ze.maxPixels:1/0)/Math.max(1,innerWidth*innerHeight)));let l=0,m=[],S=0,v=0,C=performance.now(),N=C;const P=x=>{i.setPixelRatio(u()*Ge[l]),t(),m=[],v=x+1500};return{get enabled(){return s},get scale(){return Ge[l]},budget:r,update(){if(!s)return;const x=performance.now(),b=x-N;if(N=x,document.hidden){m=[],C=x;return}if(e.supported?e.stamp!==S&&(S=e.stamp,x>v&&!isNaN(e.ms)&&m.push(e.ms)):x>v&&b>0&&b<250&&m.push(b),x-C<1e3||(C=x,m.length<8))return;m.sort((g,D)=>g-D);const d=m[Math.floor(m.length*.75)];m=[];const c=e.supported?r:1e3/(I?ze.fps:60);d>c*(e.supported?1.1:1.2)&&l<f?(l++,P(x)):l>0&&x>v+2e3&&d*(Ge[l-1]/Ge[l])**2<c*.9&&(l--,P(x))},reset(){l=0,i.setPixelRatio(u())},setProfile(x={}){const b=x.maxPixels??1/0,d=x.minScale??.75;f=Ge.reduce((c,g,D)=>g>=d-1e-6?D:c,0),!(b===h&&l<=f)&&(h=b,l=0,P(performance.now()))}}}function da(i,{interact:e,pause:t}){if(!I)return null;document.documentElement.classList.add("mobile");const a=document.createElement("div");a.id="touch-controls",a.hidden=!0,a.innerHTML=`<div id="touch-look" aria-label="Drag to look"></div>
    <div id="touch-stick" aria-label="Movement joystick"><i></i><span>MOVE</span></div>
    <div class="touch-actions"><button id="touch-use" type="button">Use</button><button id="touch-jump" type="button">Jump</button><button id="touch-run" type="button" aria-pressed="false">Run</button></div>
    <button id="touch-pause" type="button" aria-label="Pause game">Ⅱ</button>`,document.body.append(a);const o=document.createElement("div");o.id="rotate-phone",o.innerHTML='<span aria-hidden="true">↻</span><h2>Turn your phone sideways</h2><p>These worlds are made for landscape.<br>Your game is paused while you rotate.</p>',o.setAttribute("role","status"),document.body.append(o);const s=i.touch={active:!1,x:0,y:0,jump:!1,sprint:!1},n=a.querySelector("#touch-stick"),r=n.querySelector("i"),h=a.querySelector("#touch-look");let f=null,u=null,l=null,m=0,S=0;const v=()=>{r.style.transform=`translate(${s.x*38}px, ${s.y*38}px)`},C=()=>{f=u=l=null,s.x=s.y=0,s.jump=s.sprint=!1,i.keys={},i.velocity.x=i.velocity.z=0,a.querySelector("#touch-run").setAttribute("aria-pressed","false"),v()},N=c=>{const g=n.getBoundingClientRect(),D=(c.clientX-g.left-g.width/2)/42,R=(c.clientY-g.top-g.height/2)/42,y=Math.hypot(D,R),L=y<.12?0:Math.min(1,(y-.12)/.88)/y;s.x=D*L,s.y=R*L,v()};n.onpointerdown=c=>{!s.active||f!==null||(c.preventDefault(),f=c.pointerId,n.setPointerCapture(f),N(c))},n.onpointermove=c=>{c.pointerId===f&&N(c)},n.onpointerup=n.onpointercancel=n.onlostpointercapture=c=>{c.pointerId===f&&(f=null,s.x=s.y=0,v())},h.onpointerdown=c=>{!s.active||u!==null||(c.preventDefault(),u=c.pointerId,m=c.clientX,S=c.clientY,h.setPointerCapture(u))},h.onpointermove=c=>{c.pointerId===u&&(i.enabled&&(i.yaw-=(c.clientX-m)*.004,i.pitch=Math.max(-1.45,Math.min(1.45,i.pitch-(c.clientY-S)*.004))),m=c.clientX,S=c.clientY)},h.onpointerup=h.onpointercancel=h.onlostpointercapture=c=>{c.pointerId===u&&(u=null)};const P=a.querySelector("#touch-jump");P.onpointerdown=c=>{!s.active||l!==null||(c.preventDefault(),l=c.pointerId,P.setPointerCapture(l),s.jump=!0,s.jumpUntil=performance.now()+180)},P.onpointerup=c=>{c.pointerId===l&&(l=null)},P.onpointercancel=P.onlostpointercapture=c=>{c.pointerId===l&&(s.jump=!1,l=null)},a.querySelector("#touch-run").onclick=c=>{s.sprint=!s.sprint,c.currentTarget.setAttribute("aria-pressed",String(s.sprint))},a.querySelector("#touch-use").onclick=()=>{s.active&&i.enabled&&e()},a.querySelector("#touch-pause").onclick=()=>{d.stop(),t()};const x=()=>innerWidth>innerHeight,b=()=>{o.hidden=x(),x()||(d.stop(),t())},d={reset:C,get portrait(){return!x()},start(){if(!x())return;C(),s.active=!0,a.hidden=!1;const c=()=>{try{screen.orientation?.lock?.("landscape").catch(()=>{})}catch{}};try{const g=document.documentElement.requestFullscreen?.();g?g.then(c).catch(()=>{}):c()}catch{}},stop(){s.active=!1,a.hidden=!0,C()},setWorld(c){a.querySelector("#touch-use").hidden=!c.interact}};return addEventListener("resize",b),addEventListener("blur",()=>{d.stop(),t()}),document.addEventListener("visibilitychange",()=>{document.hidden&&(d.stop(),t())}),b(),d}function Wt(i){i.post.suspend(),i.reflection?.suspend?.();const e=new Set,t=a=>{a?.isTexture&&!a.isRenderTargetTexture&&e.add(a)};i.scene.traverse(a=>{a.geometry&&e.add(a.geometry);for(const o of Array.isArray(a.material)?a.material:a.material?[a.material]:[])Object.values(o).forEach(t),Object.values(o.uniforms||{}).forEach(s=>t(s.value));a.shadow&&(a.shadow.map?.dispose(),a.shadow.mapPass?.dispose(),a.shadow.map=a.shadow.mapPass=null)}),e.forEach(a=>a.dispose())}var ha={"assets/dragon_fly.draco.glb":135772,"assets/dragon_fly.glb":381996,"assets/dragon_sleep.draco.glb":182640,"assets/dragon_sleep.glb":623832,"assets/dreamhouse.draco.glb":1182780,"assets/dreamhouse.glb":5711356,"assets/harbour.draco.glb":1689012,"assets/harbour.glb":16629868,"assets/harbour_sky.jpg":534883,"assets/hub.draco.glb":521856,"assets/hub.glb":4395904,"assets/hub_sky.jpg":293074,"assets/lane.draco.glb":1366220,"assets/lane.glb":8340156,"assets/lane_sky.jpg":635699,"assets/temple.draco.glb":246044,"assets/temple.glb":5675148,"assets/temple_sky.jpg":254388,"assets/tex/atlas.json":426,"assets/tex/atlas.webp":2399660,"assets/tex/atlas_etc1s.ktx2":2703862,"assets/tex/atlas_n.ktx2":3014814,"assets/tex/atlas_n.webp":6328918,"assets/tex/bark.jpg":243344,"assets/tex/bark_n.png":2343396,"assets/tex/bark_r.jpg":94276,"assets/tex/carved.jpg":272593,"assets/tex/carved_n.png":2481817,"assets/tex/carved_r.jpg":182335,"assets/tex/cliff.jpg":251989,"assets/tex/cliff_n.png":1834796,"assets/tex/cliff_r.jpg":115444,"assets/tex/clouds.json":1162,"assets/tex/clouds.webp":454862,"assets/tex/cobble.jpg":239432,"assets/tex/cobble_n.png":1922083,"assets/tex/cobble_r.jpg":187220,"assets/tex/dirt.jpg":168794,"assets/tex/dirt_n.png":1597486,"assets/tex/dirt_r.jpg":29608,"assets/tex/foliage_atlas.png":2562339,"assets/tex/grass.jpg":347599,"assets/tex/harbour/grass.jpg":393443,"assets/tex/harbour/harbour_clouds.json":579,"assets/tex/harbour/harbour_clouds.webp":298468,"assets/tex/harbour/harbour_lanterns.json":154,"assets/tex/harbour/harbour_lanterns.webp":182460,"assets/tex/harbour/harbour_plants.json":587,"assets/tex/harbour/harbour_plants.webp":601260,"assets/tex/harbour/palette.png":164,"assets/tex/harbour/pigment-atlas-desktop.ktx2":1598048,"assets/tex/harbour/pigment-atlas-desktop.webp":2654872,"assets/tex/harbour/pigment-atlas-mobile.ktx2":439634,"assets/tex/harbour/pigment-atlas-mobile.webp":811730,"assets/tex/harbour/pigment-atlas.json":1518,"assets/tex/harbour/pigment.json":301,"assets/tex/harbour/plaster.jpg":314812,"assets/tex/harbour/rock.jpg":428326,"assets/tex/harbour/roof.jpg":368940,"assets/tex/harbour/stone.jpg":377448,"assets/tex/harbour/wood.jpg":369442,"assets/tex/lane/lane_atlas.json":6753,"assets/tex/lane/lane_atlas.webp":4361874,"assets/tex/lane/lane_atlas_etc1s.ktx2":3018376,"assets/tex/leaves_atlas.png":1606172,"assets/tex/plaster.jpg":151406,"assets/tex/plaster_n.png":908283,"assets/tex/plaster_r.jpg":50531,"assets/tex/roof.jpg":221499,"assets/tex/roof_n.png":2128599,"assets/tex/roof_r.jpg":158543,"assets/tex/sandstone.jpg":97746,"assets/tex/sandstone_n.png":1040039,"assets/tex/sandstone_r.jpg":63792,"assets/tex/stone.jpg":152794,"assets/tex/stone_n.png":1384939,"assets/tex/stone_r.jpg":118511,"assets/tex/wood.jpg":184166,"assets/tex/wood_n.png":1961760,"assets/tex/wood_r.jpg":120414,"assets/windward.draco.glb":640160,"assets/windward.glb":5277080,"assets/windward_sky.jpg":177737,"basis/basis_transcoder.js":57529,"basis/basis_transcoder.wasm":527333,"draco/draco_decoder.js":512465,"draco/draco_decoder.wasm":192420,"draco/draco_wasm_wrapper.js":58456};const _t=document.getElementById("c"),V=i=>document.getElementById(i),W=new bi({canvas:_t,antialias:!I,powerPreference:I?"default":"high-performance"});W.setPixelRatio(Math.min(devicePixelRatio,I?ze.pixelRatio:2,I?Math.sqrt(ze.maxPixels/(innerWidth*innerHeight)):1/0));W.setSize(innerWidth,innerHeight);W.shadowMap.enabled=!0;W.shadowMap.type=mt;W.toneMapping=Bt;W.outputColorSpace=wi;const ne=new Mi(72,innerWidth/innerHeight,.1,1200),G=new zi(ne,_t);let H=null;const je=da(G,{interact:()=>H?.interact?.(),pause:()=>{V("enter").hidden=!1}});I&&(V("enter").querySelector("p").textContent="tap to explore",V("enter").querySelector("small").textContent="Left thumb move · drag right side to look · Run / Jump",V("loading").querySelector(".status").textContent="opening the plaza…",V("loading").querySelector(".bytes").textContent="Other worlds load on entry");const Ke=ca(W.getContext()),tt=ua(W,Ke,Xt),fa=new yi,Et={hub:()=>ye(()=>import("./hub-HtAURyed.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(i=>i.createHub),anime:()=>ye(()=>import("./index-CI1HXwUV.js"),__vite__mapDeps([3,1,4,2,5,6]),import.meta.url).then(i=>i.createWindward),watercolor:()=>ye(()=>import("./index-Bqg1Jp2N.js"),__vite__mapDeps([7,1,2,4,8,9,6,5]),import.meta.url).then(i=>i.createHarbour),psychedelic:()=>ye(()=>import("./index-Bb6BxQbU.js"),__vite__mapDeps([10,1,2,5]),import.meta.url).then(i=>i.createDreamhouse),pencil:()=>ye(()=>import("./index-8J19XS7e.js"),__vite__mapDeps([11,1,2,4,9]),import.meta.url).then(i=>i.createLane)};Ye.enabled=!0;const ht={anime:()=>ye(()=>import("./index-CI1HXwUV.js"),__vite__mapDeps([3,1,4,2,5,6]),import.meta.url).then(i=>i.PRELOAD),watercolor:()=>ye(()=>import("./index-Bqg1Jp2N.js"),__vite__mapDeps([7,1,2,4,8,9,6,5]),import.meta.url).then(i=>i.PRELOAD),psychedelic:()=>ye(()=>import("./index-Bb6BxQbU.js"),__vite__mapDeps([10,1,2,5]),import.meta.url).then(i=>i.PRELOAD),pencil:()=>ye(()=>import("./index-8J19XS7e.js"),__vite__mapDeps([11,1,2,4,9]),import.meta.url).then(i=>i.PRELOAD)},ct=new Set;function qt(i,e){if(Ye.get(i))return Promise.resolve();if(/\.(jpe?g|png|webp)$/.test(i))return new Ti().loadAsync(i);const t=/\.json$/.test(i)?"json":/\.js$/.test(i)?"text":"arraybuffer";return new Pi().setResponseType(t).loadAsync(i,e&&(a=>e(a.loaded)))}const pa=["assets/hub_sky.jpg","assets/hub.draco.glb","draco/draco_wasm_wrapper.js","draco/draco_decoder.wasm"];async function ma(){const i=V("loading").querySelector(".bar i"),e=V("loading").querySelector(".bytes"),t=[["hub",pa],...await Promise.all(Object.entries(ht).map(async([l,m])=>[l,await m()]))],a=[...new Set(t.flatMap(([,l])=>l))],o=l=>ha[l]||1,s=a.reduce((l,m)=>l+o(m),0),n=new Map,r=new Set,h=()=>{const l=[...n.values()].reduce((m,S)=>m+S,0);i.style.width=`${l/s*100}%`,e.textContent=`${(l/1048576).toFixed(1)} / ${(s/1048576).toFixed(1)} MB`;for(const[m,S]of t)V("loading").querySelector(`[data-w="${m}"]`)?.classList.toggle("done",S.every(v=>r.has(v)))},f=[...a],u=async()=>{for(let l;l=f.shift();)await qt(l,m=>{n.set(l,Math.min(m,o(l))),h()}).catch(m=>console.warn("[preload]",l,m)),n.set(l,o(l)),r.add(l),h()};h(),await Promise.all(Array.from({length:6},u));for(const l of Object.keys(ht))ct.add(l)}async function va(){for(const[i,e]of Object.entries(ht))if(!(He.has(i)||ct.has(i))){ct.add(i);try{for(const t of await e())await qt(t).catch(()=>{})}catch{ct.delete(i)}}}async function ga(){if(I){Ye.clear();return}const i=new Set;for(const[e,t]of Object.entries(ht))if(!He.has(e))for(const a of await t())i.add(a);for(const e of Object.keys(Ye.files))i.has(e)||Ye.remove(e)}const He=new Map;async function Je(i){if(!He.has(i)){const t=await(await Et[i]())({manager:fa,renderer:W,camera:ne});I&&t.scene.traverse(a=>{a.shadow&&(a.shadow.mapSize.set(Math.min(1024,a.shadow.mapSize.x),Math.min(1024,a.shadow.mapSize.y)),a.shadow.blurSamples=Math.min(4,a.shadow.blurSamples))}),W.shadowMap.type=t.shadowType??mt,t.post=Ki(W,t.scene,ne,Ei(t.postOpts||{})),await t.post.precompile(),t.post.warmUp(),He.set(i,t),ga()}return He.get(i)}let Tt=null,St=0;function et(i,e){H?.onLeave?.(),I&&H&&H!==i&&Wt(H),H=i,tt.setProfile(i.post.quality),i.post.setSize(innerWidth,innerHeight),je?.reset(),je?.setWorld(i),G.octree=i.octree,G.teleport(e.pos,e.yaw),G.pitch=e.pitch??0,i.portals.reset(),W.toneMappingExposure=i.exposure??1,W.shadowMap.type=i.shadowType??mt,ne.fov=i.fov??72,ne.updateProjectionMatrix(),Tt={pos:e.pos.clone(),yaw:e.yaw},i.onEnter?.()}const Qt=!I&&new URLSearchParams(location.search).get("preload")!=="0";Qt&&await ma();V("loading").querySelector(".status").textContent="building the plaza…";const ft=await Je("hub"),bt=new URLSearchParams(location.search).get("world"),pt=bt&&Et[bt]?await Je(bt):ft;et(pt,pt.spawn);pt!==ft&&!I&&(V("enter").querySelector("p").textContent="click to step into the world");I&&pt!==ft&&Wt(ft);!Qt&&!I&&(self.requestIdleCallback||(i=>setTimeout(i,1500)))(()=>va(),{timeout:4e3});V("loading").hidden=!0;V("enter").hidden=!1;V("enter").addEventListener("click",()=>{je?(je.start(),V("enter").hidden=!!G.touch.active):_t.requestPointerLock()});document.addEventListener("pointerlockchange",()=>{V("enter").hidden=G.locked||G.padActive||!!G.touch?.active});addEventListener("gamepadconnected",i=>console.info("[pad]",i.gamepad.id));function Xt(){ne.aspect=innerWidth/innerHeight,ne.updateProjectionMatrix(),W.setSize(innerWidth,innerHeight);for(const i of He.values())(!I||i===H)&&i.post.setSize(innerWidth,innerHeight)}addEventListener("resize",()=>{tt.reset(),Xt()});let It;function Ot(i,e=3200){const t=V("toast");t.innerHTML=i,t.classList.add("show"),clearTimeout(It),It=setTimeout(()=>t.classList.remove("show"),e)}let Ie=null;function Pt(i,e){if(Ie)return;const t=V("fade");t.style.background=`#${new re(i).lerp(new re(16777215),.55).getHexString()}`,Ie={t:0,phase:"in",midpoint:e,busy:!1},je?.reset(),G.enabled=!1}function xa(i){if(!Ie)return;const e=Ie,t=V("fade");e.t+=i,e.phase==="in"?(t.style.opacity=Math.min(1,e.t/.45),e.t>=.5&&!e.busy&&(e.busy=!0,Promise.resolve(e.midpoint()).then(()=>{e.phase="out",e.t=0}))):(t.style.opacity=Math.max(0,1-e.t/.7),e.t>.7&&(Ie=null,G.enabled=!0))}function Sa(i){const e=H.name;Et[i.target]?Pt(i.color,async()=>{const t=await Je(i.target);et(t,i.arrival??(i.target==="hub"?t.arrivalFrom(e):t.spawn)),Ot(`<b>${i.target==="hub"?"Celestial Plaza":i.world.name}</b>${i.world?" · "+i.world.style:""}`,2600)}):Pt(i.color,()=>{et(H,H.portals.arrival(i)),Ot(`<b>${i.world.name}</b> · ${i.world.style} — opening soon`)})}const wt=new kt,jt=4,lt=la(W,()=>({world:H,camera:ne,player:G}),Ke,tt);let Mt=0;function Yt(){if(document.hidden||I&&(je.portrait||!G.touch.active)){wt.getDelta();return}if(I){const a=performance.now(),o=1e3/ze.fps;if(a-Mt<o-1)return;Mt=a-Math.max(0,a-Mt-o)%o}Ke.begin(),lt.begin();const i=Math.min(wt.getDelta(),.05),e=wt.elapsedTime;for(let a=0;a<jt;a++)G.update(i/jt);G.padActive&&!V("enter").hidden&&(V("enter").hidden=!0),St+=i,G.onFloor&&St>.5&&(St=0,Tt={pos:G.feet,yaw:G.yaw}),ne.position.y<(H.killY??-30)&&!Ie&&Pt(16777215,()=>et(H,Tt));const t=H.update(i,e,ne.position);t&&!Ie&&Sa(t),xa(i),lt.mark(),lt.render(H,ne)||H.post.render(i),Ke.end(),lt.end(),tt.update()}W.setAnimationLoop(Yt);window.__game={THREE:Dt,renderer:W,camera:ne,player:G,getWorld:Je,tick:Yt,gpuTimer:Ke,dynres:tt,touch:je,mobile:I,get world(){return H},goto:async i=>{const e=await Je(i);et(e,e.spawn)}};
