import{ay as se,S as z,c as D,F as le,aj as R,ap as ce,d as K,V as T,aW as J,R as Y,A as q,a as B,aX as ue,y as ve,x as Q,a7 as H,aY as fe,aZ as $,aR as me,ab as I,ae as ee,a_ as de,ac as te,ar as pe,ad as W,J as ae,U as O,as as X,a$ as he,l as xe,af as ge,a8 as N,a9 as ie,b0 as ye,ai as we,a6 as Me,ag as be}from"./Capsule-CAAjHJID.js";function Z(u){let e=u>>>0;return()=>{e=e+1831565813>>>0;let r=e;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}function Pe(u,e={}){u.generateMipmaps=!0,u.minFilter=se;const r=new z({side:le,depthWrite:!1,fog:!1,uniforms:{uTex:{value:u},uYaw:{value:e.yaw??0},uLod:{value:e.lod??1.6},uLevels:{value:e.levels??5},uBandSoft:{value:e.bandSoft??.18},uSat:{value:e.sat??1.1},uTint:{value:new D(e.tint??16777215)},uTintAmt:{value:e.tintAmt??0},uBelow:{value:new D(e.below??12572405)},uBelowAmt:{value:e.belowAmt??0},uStyle:{value:e.style??1}},vertexShader:`
      varying vec3 vDir;
      void main(){ vDir = position; vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }`,fragmentShader:`
      uniform sampler2D uTex; uniform float uYaw, uLod, uLevels, uBandSoft, uSat, uTintAmt, uBelowAmt, uStyle;
      uniform vec3 uTint, uBelow;
      varying vec3 vDir;
      void main(){
        vec3 d = normalize(vDir);
        float c0 = cos(uYaw), s0 = sin(uYaw);
        vec3 p = vec3(d.x * c0 - d.z * s0, d.y, d.x * s0 + d.z * c0);
        vec2 uv = vec2(atan(p.z, p.x) * 0.15915494 + 0.5, asin(clamp(p.y, -1.0, 1.0)) * 0.31830989 + 0.5);
        vec3 raw = textureLod(uTex, uv, 0.0).rgb;
        vec3 c = textureLod(uTex, uv, uLod).rgb;
        float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
        float x = l * uLevels;
        float q = (floor(x) + smoothstep(0.5 - uBandSoft, 0.5 + uBandSoft, fract(x))) / uLevels;  // soft cel bands
        c *= q / max(l, 1e-4);
        float g = dot(c, vec3(0.2126, 0.7152, 0.0722));
        c = mix(vec3(g), c, uSat);
        c = mix(c, c * uTint, uTintAmt);
        c = mix(c, uBelow, uBelowAmt * smoothstep(0.0, -0.08, d.y));
        gl_FragColor = vec4(mix(raw, c, uStyle), 1.0);
        #include <colorspace_fragment>
      }`}),o=new R(new ce(1e3,64,32),r);return o.frustumCulled=!1,o.renderOrder=-10,o.onBeforeRender=(n,d,v)=>o.position.copy(v.position),o}class k extends R{constructor(){super(k.Geometry,new K({opacity:0,transparent:!0})),this.isLensflare=!0,this.type="Lensflare",this.frustumCulled=!1,this.renderOrder=1/0;const e=new T,r=new T,o=new J(16,16),n=new J(16,16);let d=Q;const v=k.Geometry,s=new Y({uniforms:{scale:{value:null},screenPosition:{value:null}},vertexShader:`

				precision highp float;

				uniform vec3 screenPosition;
				uniform vec2 scale;

				attribute vec3 position;

				void main() {

					gl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );

				}`,fragmentShader:`

				precision highp float;

				void main() {

					gl_FragColor = vec4( 1.0, 0.0, 1.0, 1.0 );

				}`,depthTest:!0,depthWrite:!1,transparent:!1}),a=new Y({uniforms:{map:{value:o},scale:{value:null},screenPosition:{value:null}},vertexShader:`

				precision highp float;

				uniform vec3 screenPosition;
				uniform vec2 scale;

				attribute vec3 position;
				attribute vec2 uv;

				varying vec2 vUV;

				void main() {

					vUV = uv;

					gl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );

				}`,fragmentShader:`

				precision highp float;

				uniform sampler2D map;

				varying vec2 vUV;

				void main() {

					gl_FragColor = texture2D( map, vUV );

				}`,depthTest:!1,depthWrite:!1,transparent:!1}),i=new R(v,s),l=[],f=_.Shader,x=new Y({name:f.name,uniforms:{map:{value:null},occlusionMap:{value:n},color:{value:new D(16777215)},scale:{value:new B},screenPosition:{value:new T}},vertexShader:f.vertexShader,fragmentShader:f.fragmentShader,blending:q,transparent:!0,depthWrite:!1}),g=new R(v,x);this.addElement=function(m){l.push(m)};const y=new B,P=new B,C=new ue,t=new ve;this.onBeforeRender=function(m,c,p){m.getCurrentViewport(t);const h=m.getRenderTarget(),w=h!==null?h.texture.type:Q;d!==w&&(o.dispose(),n.dispose(),o.type=n.type=w,d=w);const U=t.w/t.z,A=t.z/2,S=t.w/2;let M=16/t.w;if(y.set(M*U,M),C.min.set(t.x,t.y),C.max.set(t.x+(t.z-16),t.y+(t.w-16)),r.setFromMatrixPosition(this.matrixWorld),r.applyMatrix4(p.matrixWorldInverse),!(r.z>0)&&(e.copy(r).applyMatrix4(p.projectionMatrix),P.x=t.x+e.x*A+A-8,P.y=t.y+e.y*S+S-8,C.containsPoint(P))){m.copyFramebufferToTexture(o,P);let b=s.uniforms;b.scale.value=y,b.screenPosition.value=e,m.renderBufferDirect(p,null,v,s,i,null),m.copyFramebufferToTexture(n,P),b=a.uniforms,b.scale.value=y,b.screenPosition.value=e,m.renderBufferDirect(p,null,v,a,i,null);const j=-e.x*2,oe=-e.y*2;for(let E=0,ne=l.length;E<ne;E++){const F=l[E],V=x.uniforms;V.color.value.copy(F.color),V.map.value=F.texture,V.screenPosition.value.x=e.x+j*F.distance,V.screenPosition.value.y=e.y+oe*F.distance,M=F.size/t.w;const re=t.w/t.z;V.scale.value.set(M*re,M),x.uniformsNeedUpdate=!0,m.renderBufferDirect(p,null,v,x,g,null)}}},this.dispose=function(){s.dispose(),a.dispose(),x.dispose(),o.dispose(),n.dispose();for(let m=0,c=l.length;m<c;m++)l[m].texture.dispose()}}}class _{constructor(e,r=1,o=0,n=new D(16777215)){this.texture=e,this.size=r,this.distance=o,this.color=n}}_.Shader={name:"LensflareElementShader",uniforms:{map:{value:null},occlusionMap:{value:null},color:{value:null},scale:{value:null},screenPosition:{value:null}},vertexShader:`

		precision highp float;

		uniform vec3 screenPosition;
		uniform vec2 scale;

		uniform sampler2D occlusionMap;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUV;
		varying float vVisibility;

		void main() {

			vUV = uv;

			vec2 pos = position.xy;

			vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );
			visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );
			visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );
			visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );
			visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );
			visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );
			visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );
			visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );
			visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );

			vVisibility =        visibility.r / 9.0;
			vVisibility *= 1.0 - visibility.g / 9.0;
			vVisibility *=       visibility.b / 9.0;

			gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D map;
		uniform vec3 color;

		varying vec2 vUV;
		varying float vVisibility;

		void main() {

			vec4 texture = texture2D( map, vUV );
			texture.a *= vVisibility;
			gl_FragColor = texture;
			gl_FragColor.rgb *= color;

		}`};k.Geometry=(function(){const u=new H,e=new Float32Array([-1,-1,0,0,0,1,-1,0,1,0,1,1,0,1,1,-1,1,0,0,1]),r=new fe(e,5);return u.setIndex([0,1,2,0,2,3]),u.setAttribute("position",new $(r,3,0,!1)),u.setAttribute("uv",new $(r,2,3,!1)),u})();function G(u,e){const r=document.createElement("canvas");r.width=r.height=u,e(r.getContext("2d"),u);const o=new be(r);return o.colorSpace=ae,o}function ze(u,e=14,r=40){const o=new we,n=new te(1,1,64,1),d=[];for(let a=0;a<e;a++){const i=new z({transparent:!0,depthWrite:!1,side:I,blending:q,uniforms:{uHead:{value:0},uLen:{value:9+Math.random()*8},uCurl:{value:Math.random()<.45?1:0},uSeed:{value:Math.random()*10},uAlpha:{value:.55}},vertexShader:`
        uniform float uHead, uLen, uCurl, uSeed; varying float vT; varying float vS;
        void main(){
          float s = uv.x;                                  // along the streak
          float x = (s - 1.0) * uLen + uHead;              // travels along +x
          vec3 p = vec3(x, sin(x * 0.35 + uSeed) * 0.8, cos(x * 0.22 + uSeed) * 1.2);
          // optional loop-de-loop near the head
          float lp = smoothstep(0.55, 0.8, s) * uCurl;
          float th = (s - 0.55) * 18.0;
          p += lp * vec3(-sin(th) * 1.1, (1.0 - cos(th)) * 1.1, 0.0);
          p.y += (uv.y - 0.5) * 0.07;
          vT = s; vS = uv.y;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,fragmentShader:`
        uniform float uAlpha; varying float vT; varying float vS;
        void main(){
          float a = smoothstep(0.0, 0.7, vT) * smoothstep(1.0, 0.92, vT) * (1.0 - abs(vS - 0.5) * 2.0);
          gl_FragColor = vec4(vec3(1.0), a * uAlpha);
        }`}),l=new R(n,i);l.frustumCulled=!1,o.add(l),d.push({m:l,life:-Math.random()*6,dur:0})}const v=Math.atan2(-.5,.85);function s(a){const i=Math.random()*Math.PI*2,l=Math.random()*r;a.m.position.set(u.x+Math.cos(i)*l,u.y+1.2+Math.random()*7,u.z+Math.sin(i)*l),a.m.rotation.set(0,v+(Math.random()-.5)*.4,0),a.dur=2.2+Math.random()*1.8,a.life=0,a.m.material.uniforms.uSeed.value=Math.random()*10,a.m.material.uniforms.uCurl.value=Math.random()<.4?1:0}return{group:o,update(a){for(const i of d){if(i.life+=a,i.life<0){i.m.visible=!1;continue}(!i.dur||i.life>i.dur)&&s(i),i.m.visible=!0;const l=i.life/i.dur,f=i.m.material.uniforms;f.uHead.value=l*(f.uLen.value+14),f.uAlpha.value=Math.sin(Math.PI*l)*.6}}}}function Ce(u,e=260,r=45){const o=new H,n=new Float32Array(e*3),d=new Float32Array(e);for(let a=0;a<e;a++)n.set([(Math.random()-.5)*r*2,Math.random()*14,(Math.random()-.5)*r*2],a*3),d[a]=Math.random();o.setAttribute("position",new N(n,3)),o.setAttribute("seed",new N(d,1));const v=new z({transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uPx:{value:Math.min(devicePixelRatio,2)},uR:{value:r},uC:{value:u.clone()}},vertexShader:`
      uniform float uTime, uPx, uR; uniform vec3 uC; attribute float seed; varying float vS; varying float vRot;
      void main(){
        vec3 p = position;
        p.x = mod(p.x + uR + uTime * (2.4 + seed * 1.5), uR * 2.0) - uR;
        p.z = mod(p.z + uR - uTime * (1.3 + seed), uR * 2.0) - uR;
        p.y += sin(uTime * (1.0 + seed) + seed * 30.0) * 1.2;
        p += uC;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (3.0 + seed * 3.0) * uPx * (14.0 / -mv.z);
        vS = seed; vRot = uTime * (2.0 + seed * 3.0) + seed * 20.0;
      }`,fragmentShader:`
      varying float vS; varying float vRot;
      void main(){
        vec2 q = gl_PointCoord - 0.5;
        q = mat2(cos(vRot), -sin(vRot), sin(vRot), cos(vRot)) * q;
        float petal = step(length(q * vec2(1.0, 2.2 + abs(sin(vRot)) * 1.5)), 0.42);
        if (petal < 0.5) discard;
        vec3 c = vS < 0.6 ? vec3(1.0, 0.8, 0.88) : vec3(0.6, 0.85, 0.35);
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }`}),s=new ie(o,v);return s.frustumCulled=!1,{obj:s,update(a){v.uniforms.uTime.value=a}}}function Te(u,e=3,r=9){const o=new H,n=[0,0,.35,-.9,.25,-.2,0,0,-.25,0,0,.35,.9,.25,-.2,0,0,-.25];o.setAttribute("position",new me(n,3)),o.computeVertexNormals();const d=new K({color:2766160,side:I,fog:!0}),v=e*r,s=new ee(o,d,v);s.frustumCulled=!1;const a=[];for(let l=0;l<e;l++){const f=45+l*28,x=14+l*6,g=(.09+l*.02)*(l%2?-1:1),y=Math.random()*6;for(let P=0;P<r;P++)a.push({R:f,h:x,sp:g,ph:y,off:new T((Math.random()-.5)*6,(Math.random()-.5)*3,(Math.random()-.5)*6),flap:Math.random()*6,s:.8+Math.random()*.5})}const i=new de;return{obj:s,update(l){a.forEach((f,x)=>{const g=f.ph+l*f.sp;i.position.set(u.x+Math.cos(g)*f.R,u.y+f.h+Math.sin(l*.5+f.ph)*2,u.z+Math.sin(g)*f.R).add(f.off),i.rotation.set(0,-g+(f.sp>0?0:Math.PI),0);const y=Math.sin(l*9+f.flap);i.scale.set(f.s,f.s*(.25+.9*y),f.s),i.updateMatrix(),s.setMatrixAt(x,i.matrix)}),s.instanceMatrix.needsUpdate=!0}}}function _e(u,e=4.7){return new z({fog:!0,uniforms:O.merge([X.fog,{uTime:{value:0},uC:{value:u.clone()},uR:{value:e}}]),vertexShader:`
      #include <fog_pars_vertex>
      varying vec3 vW;
      void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vec4 mvPosition = viewMatrix * w; gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,fragmentShader:`
      #include <fog_pars_fragment>
      uniform float uTime, uR; uniform vec3 uC; varying vec3 vW;
      float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
      float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }
      void main(){
        float r = length(vW.xz - uC.xz);
        vec3 deep = vec3(0.12, 0.45, 0.72), shallow = vec3(0.35, 0.8, 0.9);
        vec3 c = mix(deep, shallow, step(uR * 0.77, r));
        float rip = n(vW.xz * 1.3 + vec2(uTime * 0.3, -uTime * 0.2)) + n(vW.xz * 2.1 - uTime * 0.25) * 0.5;
        c = mix(c, vec3(0.9, 0.98, 1.0), step(1.12, rip) * 0.8);          // crisp ripple highlights
        c = mix(c, vec3(1.0), smoothstep(uR * 0.93, uR * 0.98, r));       // shoreline foam ring
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`})}function Ae(){return new z({transparent:!0,side:I,depthWrite:!1,fog:!0,uniforms:O.merge([X.fog,{uTime:{value:0}}]),vertexShader:`
      #include <fog_pars_vertex>
      varying vec2 vUv;
      void main(){ vUv = uv; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,fragmentShader:`
      #include <fog_pars_fragment>
      uniform float uTime; varying vec2 vUv;
      float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
      float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }
      void main(){
        float fall = 1.0 - vUv.y;                                         // 0 at the pond, 1 at the bottom
        float speed = fall < 0.25 ? 0.8 : 2.6;
        float s = n(vec2(vUv.x * 7.0, vUv.y * 14.0 + uTime * speed));
        vec3 c = mix(vec3(0.32, 0.72, 0.92), vec3(0.62, 0.9, 1.0), step(0.45, s));
        c = mix(c, vec3(1.0), step(0.78, s));                               // white streaks
        float edge = abs(vUv.x - 0.5) * 2.0;
        c = mix(c, vec3(1.0), smoothstep(0.75, 0.95, edge) * step(0.25, fall));
        float a = (1.0 - smoothstep(0.75, 1.0, fall)) * (1.0 - smoothstep(0.9, 1.0, edge) * step(0.25, fall));
        gl_FragColor = vec4(c, a * 0.95);
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`})}function Re(u,e=900){const r=G(256,(s,a)=>{const i=s.createRadialGradient(a/2,a/2,0,a/2,a/2,a/2);i.addColorStop(0,"rgba(255,255,245,1)"),i.addColorStop(.18,"rgba(255,250,220,0.9)"),i.addColorStop(.4,"rgba(255,230,170,0.25)"),i.addColorStop(1,"rgba(255,220,160,0)"),s.fillStyle=i,s.fillRect(0,0,a,a)}),o=G(128,(s,a)=>{s.beginPath();for(let i=0;i<6;i++){const l=i/6*Math.PI*2;s.lineTo(a/2+Math.cos(l)*a*.45,a/2+Math.sin(l)*a*.45)}s.closePath(),s.fillStyle="rgba(190,230,255,0.35)",s.fill()}),n=G(256,(s,a)=>{s.strokeStyle="rgba(200,240,255,0.35)",s.lineWidth=a*.035,s.beginPath(),s.arc(a/2,a/2,a*.4,0,7),s.stroke()}),d=new Me(16777215,0);d.position.copy(u).multiplyScalar(e);const v=new k;return v.addElement(new _(r,420,0,new D(1,.97,.9))),v.addElement(new _(o,60,.35)),v.addElement(new _(o,90,.55)),v.addElement(new _(n,220,.75)),v.addElement(new _(o,45,.9)),v.addElement(new _(o,130,1.1)),d.add(v),d}const L={lit:16644334,mid:14936314,shade:12042990,bottom:11122662,haze:14281981};function De({islands:u,sun:e,layers:r=[]}){const o=Z(32),n=(t,m)=>t+o()*(m-t),d=[];for(const t of u)for(let m=0;m<t.count;m++){const c=m/t.count*Math.PI*2+n(-.25,.25),p=t.radius*n(.75,1.35);d.push({c:new T(t.center.x+Math.cos(c)*p,t.baseY+n(-3,5),t.center.z+Math.sin(c)*p),size:n(4,8)*t.scale})}for(const t of r)for(let m=0;m<t.count;m++){const c=o()*Math.PI*2,p=n(t.rMin,t.rMax);d.push({c:new T(Math.cos(c)*p+22,n(t.yMin,t.yMax),Math.sin(c)*p),size:n(t.sMin??10,t.sMax??22)})}const v=[];d.forEach((t,m)=>{const c=t.size,p=m*.618%1,h=(S,M,b,j)=>v.push({p:t.c.clone().add(new T(S,M,b)),r:j,c:t.c,S:c,seed:p});h(0,0,0,c*.55);const w=7+(o()*4|0);for(let S=0;S<w;S++){const M=S/w*Math.PI*2+n(-.3,.3),b=c*n(.55,.95);h(Math.cos(M)*b,n(-.08,.05)*c,Math.sin(M)*b*.75,c*n(.3,.42))}const U=5+(o()*3|0);for(let S=0;S<U;S++){const M=o()*Math.PI*2,b=c*n(.1,.5);h(Math.cos(M)*b,n(.2,.42)*c,Math.sin(M)*b*.75,c*n(.3,.4))}const A=4+(o()*4|0);for(let S=0;S<A;S++){const M=o()*Math.PI*2,b=c*n(0,.4);h(Math.cos(M)*b,n(.45,.62)*c,Math.sin(M)*b*.7,c*n(.16,.26))}});const s=new he(1,2),a=v.length,i=new Float32Array(a*4),l=new Float32Array(a),f=t=>new D(t),x=new z({fog:!0,uniforms:O.merge([X.fog,{uTime:{value:0},uSun:{value:e.clone()},uLit:{value:f(L.lit)},uMid:{value:f(L.mid)},uShade:{value:f(L.shade)},uBottom:{value:f(L.bottom)},uHaze:{value:f(L.haze)},uHazeDist:{value:new B(70,320)}}]),vertexShader:`
      #include <fog_pars_vertex>
      attribute vec4 iCenter; attribute float iSeed; uniform float uTime;
      varying vec3 vNL; varying vec3 vNC; varying vec3 vV; varying vec3 vW; varying float vH; varying float vDist;
      void main(){
        vec3 p = position * (1.0 + 0.025 * sin(uTime * 0.6 + iSeed * 40.0));            // breathe
        vec4 w = modelMatrix * instanceMatrix * vec4(p, 1.0);
        vec2 drift = vec2(0.85, 0.5) * sin(uTime * 0.05 + iSeed * 6.0) * 4.0;           // whole cluster drifts together
        w.xz += drift;
        vec3 C = iCenter.xyz + vec3(drift.x, 0.0, drift.y);
        float S = iCenter.w, baseY = C.y - S * 0.12;
        if (w.y < baseY) w.y = mix(w.y, baseY, 0.8);                                     // flat underside
        vec3 nL = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
        vec3 nC = normalize((w.xyz - C) * vec3(1.0, 1.7, 1.3));                          // the cloud's overall mass
        vNL = nL; vNC = nC;                                                                // lobe + mass normals: shading and creases
        vW = w.xyz;
        vV = normalize(cameraPosition - w.xyz);
        vH = (w.y - baseY) / S;
        vDist = distance(cameraPosition, w.xyz);
        vec4 mvPosition = viewMatrix * w;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,fragmentShader:`
      #include <fog_pars_fragment>
      uniform vec3 uSun, uLit, uMid, uShade, uBottom, uHaze; uniform vec2 uHazeDist;
      varying vec3 vNL; varying vec3 vNC; varying vec3 vV; varying vec3 vW; varying float vH; varying float vDist;
      float h2(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
      float n2(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(h2(i), h2(i + vec2(1, 0)), f.x), mix(h2(i + vec2(0, 1)), h2(i + vec2(1, 1)), f.x), f.y); }
      void main(){
        vec3 NL = normalize(vNL), NC = normalize(vNC);
        vec3 N = normalize(mix(NL, NC, 0.5));                                              // half lobe, half mass: each lobe keeps a highlight
        float crease = smoothstep(0.2, 0.65, 1.0 - dot(NL, NC));                          // lobe curling away from the mass = crease between lobes
        float l = dot(N, uSun) * 0.5 + 0.5 + 0.1 * N.y - crease * 0.28;                   // creases fall into lavender, like the painted pano
        l += (n2(vW.xz * 0.35 + vW.y * 0.2) - 0.5) * 0.12;                               // painterly unevenness
        vec3 c = mix(uShade, uMid, smoothstep(0.28, 0.52, l));
        c = mix(c, uLit, smoothstep(0.55, 0.63, l));                                       // painted highlight shape, soft edge
        c = mix(c, uBottom, (1.0 - smoothstep(0.0, 0.3, vH)) * 0.55);                      // cool flat underside
        float rim = pow(1.0 - max(dot(N, normalize(vV)), 0.0), 3.0);
        c = mix(c, uLit, rim * smoothstep(0.45, 0.7, l) * 0.35);                         // bright sunlit silhouette
        c = mix(c, uHaze, smoothstep(uHazeDist.x, uHazeDist.y, vDist) * 0.7);             // aerial perspective
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`}),g=new ee(s,x,a),y=new xe,P=new ge,C=new T;return v.forEach((t,m)=>{y.compose(t.p,P,C.set(t.r,t.r*.85,t.r)),g.setMatrixAt(m,y),i.set([t.c.x,t.c.y,t.c.z,t.S],m*4),l[m]=t.seed}),s.setAttribute("iCenter",new W(i,4)),s.setAttribute("iSeed",new W(l,1)),g.frustumCulled=!1,g.userData.outlineMaterial=new z({uniforms:x.uniforms,vertexShader:x.vertexShader.replace("#include <fog_pars_vertex>","").replace("#include <fog_vertex>",""),fragmentShader:"void main(){ gl_FragColor = vec4(0.5, 0.5, 1.0, 0.0); }"}),{obj:g,lobes:a,update(t){x.uniforms.uTime.value=t}}}function Ue({texture:u,cells:e,layers:r,opacity:o=.82}){const n=Z(33),d=(c,p)=>c+n()*(p-c),v=[];for(const c of r)for(let p=0;p<c.count;p++){const h=n()*Math.PI*2,w=d(c.rMin,c.rMax),U=n()*e.length|0,A=d(c.wMin,c.wMax);v.push({p:new T(Math.cos(h)*w+(c.cx??0),d(c.yMin,c.yMax),Math.sin(h)*w+(c.cz??0)),w:A,h:A/e[U][4],cell:U,seed:n()})}const s=v.length,a=new te(1,1),i=new pe;i.index=a.index,i.attributes.position=a.attributes.position,i.attributes.uv=a.attributes.uv;const l=new W(new Float32Array(s*4),4),f=new W(new Float32Array(s*2),2),x=new W(new Float32Array(s*4),4);i.setAttribute("iPos",l),i.setAttribute("iSize",f),i.setAttribute("iUv",x),i.instanceCount=s,u.colorSpace=ae;const g=new z({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uTex:{value:u},uTime:{value:0},uHaze:{value:new D(L.haze)},uHazeDist:{value:new B(90,380)},uNear:{value:new B(25,45)},uOpacity:{value:o}},vertexShader:`
      attribute vec4 iPos; attribute vec2 iSize; attribute vec4 iUv; uniform float uTime;
      varying vec2 vUv; varying float vDist;
      void main(){
        vec3 c = iPos.xyz;
        c.xz += vec2(0.85, 0.5) * sin(uTime * 0.04 + iPos.w * 6.28) * 5.0;              // slow drift
        vec3 toCam = cameraPosition - c; toCam.y = 0.0;
        vec3 fwd = normalize(toCam + vec3(1e-4, 0.0, 0.0));
        vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));                          // upright billboard
        vec3 w = c + right * position.x * iSize.x + vec3(0.0, 1.0, 0.0) * (position.y + 0.5) * iSize.y;   // base sits on c
        vUv = vec2(mix(iUv.x, iUv.z, uv.x), mix(iUv.y, iUv.w, uv.y));
        vDist = distance(cameraPosition, c);
        gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
      }`,fragmentShader:`
      uniform sampler2D uTex; uniform vec3 uHaze; uniform vec2 uHazeDist, uNear; uniform float uOpacity;
      varying vec2 vUv; varying float vDist;
      void main(){
        vec4 t = texture2D(uTex, vUv);
        vec3 c = mix(t.rgb, uHaze, smoothstep(uHazeDist.x, uHazeDist.y, vDist) * 0.75);    // aerial perspective
        float a = t.a * uOpacity * smoothstep(uNear.x, uNear.y, vDist);                    // never let a card read flat
        if (a < 0.01) discard;
        gl_FragColor = vec4(c, a);
        #include <colorspace_fragment>
      }`}),y=new R(i,g);y.frustumCulled=!1,y.renderOrder=-1;const P=v.map((c,p)=>p),C=new Float32Array(s),t=()=>{P.forEach((c,p)=>{const h=v[c],w=e[h.cell];l.setXYZW(p,h.p.x,h.p.y,h.p.z,h.seed),f.setXY(p,h.w,h.h),x.setXYZW(p,w[0],w[1],w[2],w[3])}),l.needsUpdate=f.needsUpdate=x.needsUpdate=!0};t();let m=-1;return{obj:y,count:s,update(c,p){if(g.uniforms.uTime.value=c,!(!p||c-m<.25)){m=c;for(let h=0;h<s;h++)C[h]=v[h].p.distanceToSquared(p);P.sort((h,w)=>C[w]-C[h]),t()}}}}function Le(u,e=70){const r=Z(33),o=u.length*e,n=new H,d=new Float32Array(o*3),v=new Float32Array(o),s=new Float32Array(o);u.forEach(({p:l,spread:f},x)=>{for(let g=0;g<e;g++){const y=x*e+g;d.set([l.x,l.y,l.z],y*3),v[y]=r(),s[y]=f}}),n.setAttribute("position",new N(d,3)),n.setAttribute("seed",new N(v,1)),n.setAttribute("spread",new N(s,1));const a=new z({transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uPx:{value:Math.min(devicePixelRatio,2)}},vertexShader:`
      uniform float uTime, uPx; attribute float seed; attribute float spread; varying float vA;
      void main(){
        float life = fract(uTime * (0.18 + seed * 0.12) + seed * 7.0);
        float a = seed * 43.0;
        vec3 p = position + vec3(cos(a), 0.0, sin(a)) * spread * (0.3 + life) + vec3(0.0, life * spread * 0.9, 0.0);
        vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = spread * (6.0 + life * 16.0) * uPx * (10.0 / -mvPosition.z);
        vA = sin(life * 3.14159) * 0.55;
      }`,fragmentShader:`
      varying float vA;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.35, d) * vA;                     // soft-edged but still a clean cel puff
        gl_FragColor = vec4(vec3(1.0), a);
      }`}),i=new ie(n,a);return i.frustumCulled=!1,{obj:i,update(l){a.uniforms.uTime.value=l}}}function Be(u,e=14){const r=new ye(e*.86,e,96,1,0,Math.PI),o=new z({transparent:!0,depthWrite:!1,side:I,blending:q,uniforms:{uR0:{value:e*.86},uR1:{value:e},uTime:{value:0}},vertexShader:"varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
      uniform float uR0, uR1, uTime; varying vec2 vP;
      vec3 band(float t){                                         // flat anime bands, red outside -> violet inside
        vec3 c[6]; c[0]=vec3(1.0,0.35,0.4); c[1]=vec3(1.0,0.65,0.3); c[2]=vec3(1.0,0.95,0.4);
        c[3]=vec3(0.45,0.95,0.5); c[4]=vec3(0.4,0.7,1.0); c[5]=vec3(0.65,0.5,1.0);
        int i = int(clamp(t * 6.0, 0.0, 5.99)); return c[5 - i];
      }
      void main(){
        float t = (length(vP) - uR0) / (uR1 - uR0);
        float ends = smoothstep(0.0, 0.35, vP.y / uR1);
        float a = 0.32 * smoothstep(0.0, 0.12, t) * smoothstep(1.0, 0.88, t) * ends * (0.85 + 0.15 * sin(uTime * 0.7));
        gl_FragColor = vec4(band(t) * a, a);
      }`}),n=new R(r,o);return u.add(n),n.rotation.x=0,{obj:n,update(d){o.uniforms.uTime.value=d}}}export{_e as a,Ae as b,De as c,Ue as d,Le as e,Be as f,ze as g,Ce as h,Te as i,Re as j,Pe as m,Z as r};
