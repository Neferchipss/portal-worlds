import{a as W,c as D,ak as Ee,y as we,S as X,V as _,l as de,ai as se,al as _e,am as ke,aj as Q,d as K,ae as ue,an as Ne,ao as fe,ap as Te,aq as ze,ac as je,ar as Be,ad as te,J as oe,U as Ge,as as Ie,ab as pe,af as $e,a0 as He,a1 as Z,a3 as Ve,a4 as qe,a5 as Ke,Y as ve,m as xe,$ as Ye,ah as ge,at as Je,A as Ze,a6 as Xe,z as Qe}from"./Capsule-CAAjHJID.js";import{m as re,l as ea,O as aa,P as ta,f as oa}from"./portals-CEiaI1ve.js";import{r as be,m as ra,i as sa,d as na}from"./fx-CRoevLXV.js";import{m as ia}from"./reflection-CbyYwIKA.js";import{m as ca,a as la,b as ua}from"./life-2ElI8OVv.js";import"./grass-BlkuCv3v.js";import"./outline-B2XbQAMz.js";const ie=`
  float wc_h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float wc_n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(wc_h(i), wc_h(i + vec2(1, 0)), f.x), mix(wc_h(i + vec2(0, 1)), wc_h(i + vec2(1, 1)), f.x), f.y); }
  float wc_fbm(vec2 p){ return wc_n(p) * 0.55 + wc_n(p * 2.07 + 5.3) * 0.3 + wc_n(p * 4.3 + 9.1) * 0.15; }`;function fa(o={}){const i={uShadowTint:{value:new D(o.shadowTint??8225464)},uPaper:{value:new D(o.paper??16512488)},uLift:{value:o.lift??.34},uLitLevel:{value:o.litLevel??2.2},uEdges:{value:new W(o.shadowEdge??.3,o.litEdge??.7)},uSoft:{value:o.soft??.09},uHueAmt:{value:o.hueAmt??.55}};return function(t,{density:g=.14,emissiveBoost:k=1,pigment:r=null}={}){const h=new Ee({name:t.name,color:t.color.clone(),emissive:t.emissive?t.emissive.clone():new D(0),emissiveIntensity:Math.min((t.emissiveIntensity??1)*k,3),transparent:t.transparent,opacity:t.opacity,side:t.side}),f=r?{uPig:{value:r.tex},uPigMean:{value:r.mean},uPigAmt:{value:r.amt??.6},uPigScale:{value:r.scale??.33}}:{};return r&&!r.world&&(h.map=r.tex),h.onBeforeCompile=c=>{Object.assign(c.uniforms,i,f,{uDensity:{value:g}}),r&&(c.defines={...c.defines,WC_PIG:1,...r.world?{WC_PIG_WORLD:1}:{}}),c.vertexShader=c.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vWcP;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
          vec4 wcTmp = vec4(transformed, 1.0);
          #ifdef USE_INSTANCING
            wcTmp = instanceMatrix * wcTmp;
          #endif
          vWcP = (modelMatrix * wcTmp).xyz;`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
          vWcN = normalize(mat3(modelMatrix) * objectNormal);`).replace("varying vec3 vWcP;","varying vec3 vWcP; varying vec3 vWcN;"),c.fragmentShader=c.fragmentShader.replace("#include <common>",`#include <common>
          varying vec3 vWcP; varying vec3 vWcN;
          #ifdef WC_PIG
            uniform sampler2D uPig; uniform vec3 uPigMean; uniform float uPigAmt, uPigScale;
          #endif
          uniform vec3 uShadowTint, uPaper; uniform float uLift, uLitLevel, uSoft, uHueAmt, uDensity; uniform vec2 uEdges;
          ${ie}`).replace("#include <map_fragment>",`
          #ifdef WC_PIG
          {
            #ifdef WC_PIG_WORLD
              vec3 an = abs(normalize(vWcN));                                   // world box projection, dominant axis
              vec2 puv = an.y > max(an.x, an.z) ? vWcP.xz : (an.x > an.z ? vWcP.zy : vWcP.xy);
            #else
              vec2 puv = vMapUv;
            #endif
            vec3 pt = texture2D(uPig, puv * uPigScale).rgb;
            diffuseColor.rgb *= mix(vec3(1.0), clamp(pt / uPigMean, 0.0, 2.5), uPigAmt);   // relative: palette kept
          }
          #endif`).replace("#include <opaque_fragment>",`
          {
            vec3 pig = diffuseColor.rgb;
            vec3 light = outgoingLight - totalEmissiveRadiance;                  // what Lambert's lights delivered
            float pl = max(dot(pig, vec3(0.299, 0.587, 0.114)), 1e-3);
            float amt = dot(light, vec3(0.299, 0.587, 0.114)) / pl / uLitLevel;
            vec3 hue = light / max(dot(light, vec3(0.333)), 1e-3);               // the light's colour, brightness removed
            float wob = wc_fbm(vWcP.xz * 0.32 + vWcP.y * 0.21) - 0.5;            // hand-laid wash boundaries
            float k1 = smoothstep(uEdges.x - uSoft, uEdges.x + uSoft, amt + wob * 0.22);
            float k2 = smoothstep(uEdges.y - uSoft, uEdges.y + uSoft, amt + wob * 0.18);
            vec3 shade = pig * uShadowTint;
            vec3 lit = mix(pig, uPaper, uLift);
            vec3 col = mix(shade, pig, k1);
            col = mix(col, lit, k2);
            col *= mix(vec3(1.0), clamp(hue, 0.6, 1.6), uHueAmt * (0.35 + 0.65 * k1)); // warm sun / cool sky / lantern glow
            col *= 1.0 + (wc_fbm(vWcP.xz * 0.045 + vWcP.y * 0.03) - 0.5) * uDensity * 2.0;   // uneven wash density
            outgoingLight = col + totalEmissiveRadiance;
          }
          #include <opaque_fragment>`)},h.customProgramCacheKey=()=>"watercolour"+(r?r.world?"-pw":"-p":""),h}}const M=32;function va(o,{yaw:i=0,sun:u=new _(0,.1,1),reflection:t,ripples:g=[]}={}){const k=Array.from({length:M},(h,f)=>new we(...g[f]||[0,0,0,0])),r=new X({fog:!1,uniforms:{uSky:{value:o},uYaw:{value:i},uTime:{value:0},uSun:{value:u.clone().normalize()},tRef:{value:t.texture},uTexMat:{value:t.textureMatrix},uRes:{value:new W(1600,900)},uDeep:{value:new D(3029612)},uMidWash:{value:new D(5922966)},uRefTint:{value:new D(14867696)},uSpark:{value:new D(16773330)},uRip:{value:k},uRipA:{value:new Float32Array(M)},uRipN:{value:Math.min(g.length,M)}},vertexShader:`
      uniform mat4 uTexMat;
      varying vec3 vW; varying vec4 vRef;
      void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vRef = uTexMat * w; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`
      uniform sampler2D uSky, tRef; uniform float uYaw, uTime; uniform vec3 uSun, uDeep, uMidWash, uRefTint, uSpark;
      uniform vec2 uRes; uniform vec4 uRip[${M}]; uniform float uRipA[${M}]; uniform int uRipN;
      varying vec3 vW; varying vec4 vRef;
      ${ie}
      vec2 panoUv(vec3 d){
        float c0 = cos(uYaw), s0 = sin(uYaw);
        vec3 p = vec3(d.x * c0 - d.z * s0, d.y, d.x * s0 + d.z * c0);
        return vec2(atan(p.z, p.x) * 0.15915494 + 0.5, asin(clamp(p.y, -1.0, 1.0)) * 0.31830989 + 0.5);
      }
      float lum(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }
      void main(){
        vec3 v = normalize(vW - cameraPosition);
        float dist = length(vW.xz - cameraPosition.xz);
        float down = clamp(-v.y, 0.0, 1.0);
        vec2 sc = gl_FragCoord.xy / uRes;
        float far = smoothstep(150.0, 420.0, dist);                             // hand over to the painted pano sea
        float drift = uTime * 0.025;

        // ---- body: graded wash + wet-in-wet blooms
        vec2 hz = normalize(v.xz + vec2(1e-5));
        float yb = -(0.004 + 0.196 * (1.0 - exp(-down * 3.0)));
        vec3 horizon = texture2D(uSky, panoUv(normalize(vec3(hz.x * sqrt(1.0 - yb * yb), yb, hz.y * sqrt(1.0 - yb * yb))))).rgb;
        float grade = smoothstep(8.0, 200.0, dist) * (1.0 - smoothstep(0.1, 0.6, down));
        vec3 body = mix(uDeep, uMidWash, smoothstep(0.0, 0.5, grade));
        body = mix(body, horizon, smoothstep(0.35, 1.0, grade));
        float bloom = wc_fbm(vW.xz * 0.018 + vec2(drift * 0.3, 0.0));
        body *= 0.9 + 0.2 * bloom;                                               // uneven wash
        body *= 1.0 - 0.14 * smoothstep(0.035, 0.0, abs(bloom - 0.55)) * (1.0 - far);   // pooled bloom rims

        // ---- reflection: pulled down (vertical smear), three washes, duller + darker
        vec2 uv0 = vRef.xy / vRef.w;
        vec2 wn = vec2(wc_fbm(vW.xz * 0.07 + drift), wc_fbm(vW.xz * 0.06 + 7.0 - drift)) - 0.5;
        float wet = mix(0.25, 1.0, 1.0 - smoothstep(15.0, 70.0, dist));          // far shore: crisp; near you: bleeding
        uv0 += wn * vec2(0.03, 0.016) * wet;                                     // wet-in-wet bleed, pinned to the water
        vec3 refl = vec3(0.0); float wsum = 0.0;
        for (int k = 0; k < 6; k++) {
          float fk = float(k), w = 1.0 - fk / 7.0;
          refl += texture2D(tRef, uv0 + vec2(0.0, -fk * 0.006 * wet)).rgb * w;        // drag downward
          wsum += w;
        }
        refl /= wsum;
        vec3 core = texture2D(tRef, uv0).rgb;
        float rim = smoothstep(0.03, 0.1, abs(lum(core) - lum(refl))) * smoothstep(0.16, 0.1, abs(lum(core) - lum(refl)));          // where two washes meet: pooled pigment
        refl *= 1.0 - 0.22 * rim;
        refl = mix(vec3(lum(refl)), refl, 0.92) * uRefTint;
        float fres = mix(0.2, 0.93, pow(1.0 - down, 2.0)) * (1.0 - far);   // the water is mostly its reflection
        vec3 c = mix(body, refl, fres);

        float calm = 1.0 - smoothstep(0.3, 0.65, down);
        vec3 skyWash = mix(horizon, vec3(lum(horizon)) * vec3(1.02, 1.0, 1.08), 0.2) * 1.08;
        vec2 fc = gl_FragCoord.xy;
        float grain = wc_n(fc * 0.5) * 0.6 + wc_n(fc * 0.13 + 3.0) * 0.4;


        // ---- dry-brush sparkle in the sun path: bare paper where the brush skipped the grain
        vec3 flatSun = normalize(vec3(uSun.x, 0.0, uSun.z));
        float toward = pow(max(dot(hz, flatSun.xz), 0.0), 40.0) * (1.0 - smoothstep(0.05, 0.4, down));
        float stroke = wc_n(vW.xz * vec2(0.35, 0.12) + drift);              // pinned to the water
        float spark = toward * smoothstep(0.55, 0.7, grain * 0.5 + stroke * 0.7) * calm;
        c = mix(c, uSpark, spark * 0.9);

        // ---- contact ripples: broken rings around posts and hulls
        float rings = 0.0;
        for (int i = 0; i < ${M}; i++) {
          if (i >= uRipN) break;
          vec4 r = uRip[i];
          vec2 dw = vW.xz - r.xy; float ca = cos(uRipA[i]), sa = sin(uRipA[i]);
          vec2 dv = vec2(dw.x * ca - dw.y * sa, dw.x * sa + dw.y * ca) / vec2(1.0, r.w > 0.0 ? r.w : 1.0);   // hull frame; w = squash
          float d = length(dv) / r.z;
          float ang = atan(dv.y, dv.x);
          bool hull = abs(r.w - 1.0) > 0.01;                                     // hulls: rings hug the boat
          for (int k = 1; k <= 2; k++) {
            float R = (hull ? 1.02 + float(k) * 0.16 : 1.25 + float(k) * 0.55) + sin(uTime * 0.8 + float(i)) * 0.04;
            float line = smoothstep(0.1, 0.0, abs(d - R)) * smoothstep(0.35, 0.55, wc_n(vec2(ang * 2.5 + float(k) * 3.1, float(i))));
            rings = max(rings, line * (1.0 - float(k - 1) * 0.35));
          }
        }
        c = mix(c, skyWash * 0.95, rings * 0.6 * (1.0 - smoothstep(20.0, 60.0, dist)));   // light rings: they catch the sky

        c = mix(c, horizon, far);                                                // far: the painted pano sea
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }`});if(new URLSearchParams(location.search).get("postlegacy")!=="1"){const h=Array.from({length:M},()=>new we),f=Array.from({length:M},()=>new W);r.uniforms.uRipShape={value:h},r.uniforms.uRipRadius={value:f},r.userData.updateRipples=c=>{for(let v=0;v<r.uniforms.uRipN.value;v++){const m=r.uniforms.uRip.value[v],N=r.uniforms.uRipA.value[v];h[v].set(Math.cos(N),Math.sin(N),1/Math.max(m.z,1e-5),m.w>0?1/m.w:1);const O=Math.sin(c*.8+v)*.04,z=Math.abs(m.w-1)>.01;f[v].set((z?1.18:1.8)+O,(z?1.34:2.35)+O)}},r.fragmentShader=r.fragmentShader.replace("varying vec3 vW; varying vec4 vRef;",`uniform vec4 uRipShape[${M}];uniform vec2 uRipRadius[${M}]; varying vec3 vW; varying vec4 vRef;`).replace("vec3 refl = vec3(0.0); float wsum = 0.0;","vec3 core=texture2D(tRef,uv0).rgb;vec3 refl=core;float wsum=1.0;").replace("for (int k = 0; k < 6; k++)","for (int k = 1; k < 6; k++)").replace("vec3 core = texture2D(tRef, uv0).rgb;","").replace(/float grain = wc_n\(fc \* 0.5\)[^;]+;/,"").replace(/float stroke = wc_n\(vW.xz[\s\S]*?float spark = toward \*[^;]+;/,`float spark=0.0;
        if(toward>0.0){
          float grain=wc_n(fc*0.5)*0.6+wc_n(fc*0.13+3.0)*0.4;
          float stroke=wc_n(vW.xz*vec2(0.35,0.12)+drift);
          spark=toward*smoothstep(0.55,0.7,grain*0.5+stroke*0.7)*calm;
        }`).replace(/for \(int i = 0; i < 32; i\+\+\) \{[\s\S]*?\n        \}\n        c = mix\(c, skyWash/,`if(dist<60.0)for(int i=0;i<${M};i++){
          if(i>=uRipN)break;
          vec2 dw=vW.xz-uRip[i].xy;vec4 sh=uRipShape[i];
          vec2 dv=vec2(dw.x*sh.x-dw.y*sh.y,dw.x*sh.y+dw.y*sh.x)*sh.z;
          dv.y*=sh.w;float d2=dot(dv,dv);
          vec2 R=uRipRadius[i];float outer=R.y+0.1,inner=max(0.0,R.x-0.1);
          if(d2>outer*outer || d2<inner*inner)continue;
          float d=sqrt(d2);vec2 delta=abs(vec2(d)-R);
          if(min(delta.x,delta.y)>=0.1)continue;
          float ang=atan(dv.y,dv.x);
          for(int k=1;k<=2;k++){
            float line=(1.0-smoothstep(0.0,0.1,k==1?delta.x:delta.y))*smoothstep(0.35,0.55,wc_n(vec2(ang*2.5+float(k)*3.1,float(i))));
            rings=max(rings,line*(k==1?1.0:0.65));
          }
        }
        c = mix(c, skyWash`).replace("smoothstep(0.035, 0.0, abs(bloom - 0.55))","(1.0-smoothstep(0.0,0.035,abs(bloom-0.55)))").replace("smoothstep(0.16, 0.1, abs(lum(core) - lum(refl)))","(1.0-smoothstep(0.1,0.16,abs(lum(core)-lum(refl))))"),r.userData.updateRipples(0)}return r}const P={uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},uRes:{value:new W(1,1)},uNear:{value:.1},uFar:{value:1e3},uWobble:{value:2.2},uBleed:{value:0},uSoftAmt:{value:.35},uEdge:{value:.42},uWash:{value:.35},uPaperAmt:{value:.1},uGran:{value:.22},uPaper:{value:new D(16512488)},uDepthK:{value:.03},uNormalK:{value:.4},uFade:{value:new W(40,180)},tAO:{value:null},uAOStrength:{value:0},uAOTint:{value:new D(7301800)},uAOCover:{value:.35},uAOFade:{value:new W(40,110)},uAOContrast:{value:new W(.25,.95)}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
    #include <packing>
    uniform sampler2D tDiffuse, tNormal, tDepth, tAO;
    uniform vec2 uRes, uFade, uAOFade, uAOContrast; uniform float uNear, uFar, uWobble, uBleed, uEdge, uWash, uPaperAmt, uGran, uSoftAmt;
    uniform float uDepthK, uNormalK, uAOStrength, uAOCover; uniform vec3 uPaper, uAOTint;
    varying vec2 vUv;
    ${ie}
    float viewZ(vec2 uv){ return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, uNear, uFar); }
    vec3 nrm(vec2 uv){ return texture2D(tNormal, uv).xyz * 2.0 - 1.0; }
    float lum(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }
    void main(){
      vec2 px = 1.0 / uRes, fc = vUv * uRes;
      // hand tremor: low-frequency screen-space offset; colour is sampled wobbled, so it bleeds across edges
      vec2 wob = (vec2(wc_fbm(fc * 0.012), wc_fbm(fc * 0.012 + 17.0)) - 0.5) * 2.0 * uWobble * px;
      wob += (vec2(wc_n(fc * 0.0035 + 3.0), wc_n(fc * 0.0035 + 41.0)) - 0.5) * 2.0 * uWobble * 1.75 * px;   // slow wander (the 'breathing' in motion)
      vec2 uv = vUv + wob;
      vec3 base = texture2D(tDiffuse, uv).rgb;
      vec3 soft = (texture2D(tDiffuse, uv + vec2(px.x, 0.0) * 1.5).rgb + texture2D(tDiffuse, uv - vec2(px.x, 0.0) * 1.5).rgb +
                   texture2D(tDiffuse, uv + vec2(0.0, px.y) * 1.5).rgb + texture2D(tDiffuse, uv - vec2(0.0, px.y) * 1.5).rgb) * 0.25;
      base = mix(base, soft, uSoftAmt);                               // wet edges: a touch of bleed
      // wet-in-wet: pull the neighbouring wash in along a meandering flow, 3-10 px, in irregular fingers. Only
      // where colours differ, so flat washes stay put and objects run into each other at their borders.
      if (uBleed > 0.0) {
        float fa = wc_fbm(fc * 0.009 + 11.0) * 12.566;
        vec2 fd = vec2(cos(fa), sin(fa));
        float bl = mix(3.0, 10.0, wc_n(fc * 0.025 + 2.0));
        vec3 acc = vec3(0.0); float ws = 0.0;
        for (int i = 1; i <= 4; i++) {
          float t = float(i) * 0.25, w = 1.0 - t * 0.5;
          acc += texture2D(tDiffuse, uv + fd * bl * t * px).rgb * w; ws += w;
        }
        acc /= ws;
        float fingers = smoothstep(0.32, 0.6, wc_fbm(fc * 0.02 + 31.0));
        float k = uBleed * smoothstep(0.03, 0.2, length(acc - base)) * fingers;
        base = mix(base, acc, k * 0.65);
        base *= 1.0 - 0.12 * k * (1.0 - k) * 4.0;                     // a faint darker tide-line where the run stops
      }
      float depth0 = texture2D(tDepth,uv).x;
      float z0 = -perspectiveDepthToViewZ(depth0,uNear,uFar);
      bool sky = depth0 >= 0.99999;

      // ambient occlusion as pooled lavender pigment in the creases
      if (uAOStrength > 0.0 && !sky && z0 < uAOFade.y) {
        float occ = 1.0 - smoothstep(uAOContrast.x, uAOContrast.y, texture2D(tAO, vUv).r);
        occ *= uAOStrength * (1.0 - smoothstep(uAOFade.x, uAOFade.y, z0)) * mix(uAOCover, 1.0, texture2D(tNormal, vUv).a);
        base *= mix(vec3(1.0), uAOTint, occ);
      }

      // pigment pooling: along geometry edges (depth / normal breaks, found on the wobbled position so they wobble
      // with the paint) and along wash boundaries (colour steps) -- darker, richer pigment, never an ink line
      bool geometryEdge = !sky && z0 < uFade.y && uEdge > 0.0;
      vec4 normal0 = geometryEdge ? texture2D(tNormal,uv) : vec4(0.0);
      vec3 n0 = normal0.xyz * 2.0 - 1.0;
      float dEdge = 0.0, nEdge = 0.0, cEdge = 0.0;
      float reach = mix(0.8, 3.6, smoothstep(0.2, 0.8, wc_fbm(fc * 0.018 + 5.0)));        // brush pressure: thin .. fat
      vec2 o[4]; o[0] = vec2(reach * px.x, 0.0); o[1] = vec2(-reach * px.x, 0.0); o[2] = vec2(0.0, reach * px.y); o[3] = vec2(0.0, -reach * px.y);
      float l0 = lum(base);
      for (int i = 0; i < 4; i++) {
        if (geometryEdge) {
          float z = viewZ(uv + o[i]);
          dEdge = max(dEdge, abs(z - z0) / max(min(z, z0), 0.001));
          nEdge = max(nEdge, 1.0 - dot(n0, nrm(uv + o[i])));
        }
        cEdge = max(cEdge, lum(texture2D(tDiffuse, uv + o[i] * 1.5).rgb) - l0);   // we are the darker side of a step
      }
      float e = max(smoothstep(uDepthK, uDepthK * 2.5, dEdge), smoothstep(uNormalK, uNormalK + 0.3, nEdge));
      e *= smoothstep(0.3, 0.55, wc_fbm(fc * 0.011 + 23.0)) * mix(0.55, 1.0, wc_n(fc * 0.06));   // broken, uneven: a brush, not a pen
      float cover = normal0.a;
      e *= cover * (1.0 - smoothstep(uFade.x, uFade.y, z0));
      float w = smoothstep(0.03, 0.14, cEdge) * uWash;
      float pool = max(e * uEdge, w) * (sky ? 0.25 : 1.0);
      vec3 rich = base * base * 1.15;                                 // pooled pigment: darker and more saturated
      base = mix(base, rich, pool);

      // cold-press paper: grain at three scales + faint fibres; pigment settles in the valleys (granulation),
      // the whites stay warm paper
      float g = wc_n(fc * 0.55) * 0.5 + wc_n(fc * 0.19 + 3.1) * 0.3 + wc_n(fc * 0.045 + 7.7) * 0.2;
      float fib = wc_n(vec2(fc.x * 0.05, fc.y * 0.9) + 11.0) * wc_n(vec2(fc.x * 0.9, fc.y * 0.05) + 23.0);
      float paper = g + fib * 0.25;
      float ink = 1.0 - lum(base);
      float skyK = sky ? 0.35 : 1.0;                                  // the pano already has paper in it
      base *= 1.0 - uGran * ink * (paper - 0.45) * skyK;
      base = mix(base, base * (0.94 + 0.12 * paper), uPaperAmt * skyK * 4.0);
      base = mix(base, uPaper, smoothstep(0.86, 1.0, lum(base)) * 0.35);
      gl_FragColor = vec4(base, 1.0);
    }`};P.paperCache={uniforms:{uRes:{value:new W},uField:{value:0}},vertexShader:P.vertexShader,fragmentShader:`${ie}
    uniform vec2 uRes; uniform int uField; varying vec2 vUv;
    void main(){vec2 fc=vUv*uRes;
      if(uField==0){
        vec2 wob=(vec2(wc_fbm(fc*0.012),wc_fbm(fc*0.012+17.0))-0.5)*2.0;
        wob+=(vec2(wc_n(fc*0.0035+3.0),wc_n(fc*0.0035+41.0))-0.5)*3.5;
        float reach=mix(0.8,3.6,smoothstep(0.2,0.8,wc_fbm(fc*0.018+5.0)));
        float mask=smoothstep(0.3,0.55,wc_fbm(fc*0.011+23.0))*mix(0.55,1.0,wc_n(fc*0.06));
        gl_FragColor=vec4(wob/5.5+0.5,(reach-0.8)/2.8,mask);
      }else{
        float a=wc_fbm(fc*0.009+11.0)*12.566;
        float bl=mix(3.0,10.0,wc_n(fc*0.025+2.0));
        float fingers=smoothstep(0.32,0.6,wc_fbm(fc*0.02+31.0));
        float grain=wc_n(fc*0.55)*0.5+wc_n(fc*0.19+3.1)*0.3+wc_n(fc*0.045+7.7)*0.2;
        float fib=wc_n(vec2(fc.x*0.05,fc.y*0.9)+11.0)*wc_n(vec2(fc.x*0.9,fc.y*0.05)+23.0);
        gl_FragColor=vec4(vec2(cos(a),sin(a))*bl/20.0+0.5,fingers,(grain+fib*0.25)/1.25);
      }
    }`};P.cachedFragmentShader=P.fragmentShader.replace("uniform sampler2D tDiffuse, tNormal, tDepth, tAO;","uniform sampler2D tDiffuse, tNormal, tDepth, tAO, tFieldA, tFieldB;").replace(/vec2 wob =[^;]+;\s*wob \+= [^;]+;/,"vec4 fieldA=texture2D(tFieldA,vUv);vec4 fieldB=texture2D(tFieldB,vUv);fieldA.xy=(fieldA.xy-0.5)*5.5;fieldA.z=fieldA.z*2.8+0.8;fieldB.xy=(fieldB.xy-0.5)*20.0;fieldB.w*=1.25;vec2 wob=fieldA.xy*uWobble*px;").replace(/float fa =[^;]+;\s*vec2 fd =[^;]+;\s*float bl =[^;]+;/,"vec2 fd=fieldB.xy; float bl=1.0;").replace(/float fingers =[^;]+;/,"float fingers=fieldB.z;").replace("if (uBleed > 0.0)","if (uBleed > 0.0 && fieldB.z > 0.0)").replace(/float reach =[^;]+;/,"float reach=fieldA.z;").replace(/e \*= smoothstep\(0.3, 0.55,[^;]+;/,"e *= fieldA.w;").replace(/float g = wc_n\(fc \* 0.55\)[\s\S]*?float paper = g \+ fib \* 0.25;/,"float paper=fieldB.w;");P.uniforms.uAORes={value:new W(1,1)};const Ae=o=>o.replace("varying vec2 vUv;",`uniform vec2 uAORes; varying vec2 vUv;
    vec3 unpackNormal(vec2 p){
      vec3 n=vec3(p,1.0-abs(p.x)-abs(p.y));
      float t=max(-n.z,0.0);n.xy+=vec2(n.x>=0.0?-t:t,n.y>=0.0?-t:t);
      return n;
    }
    float aoVisibility(vec2 uv){
      vec2 p=uv*uAORes-0.5, b=floor(p), f=fract(p);
      float centerD=texture2D(tDepth,uv).r;
      float z0=-perspectiveDepthToViewZ(centerD,uNear,uFar);
      vec3 n0=texture2D(tNormal,uv).xyz*2.0-1.0;
      float acc=0.0,ws=0.0;
      for(int i=0;i<4;i++){
        vec2 o=vec2(float(i-2*(i/2)),float(i/2));
        vec2 tap=(b+o+0.5)/uAORes;
        vec4 aoData=texture2D(tAO,tap);
        float z=aoData.g;
        vec3 n=unpackNormal(aoData.ba);
        vec2 bil=mix(1.0-f,f,o);
        float similarity=max(dot(n0,n),0.0);similarity=similarity*similarity/max(dot(n,n),1e-6);similarity*=similarity;similarity*=similarity;
        float weight=bil.x*bil.y*exp(-abs(z-z0)/max(0.05,z0*0.01))*similarity;
        acc+=aoData.r*weight;ws+=weight;
      }
      return ws>0.00001?acc/ws:texture2D(tAO,uv).r;
    }`).replace("texture2D(tAO, vUv).r","aoVisibility(vUv)");P.cachedFragmentShader=Ae(P.cachedFragmentShader);P.proceduralFragmentShader=Ae(P.fragmentShader);P.legacyFragmentShader=P.fragmentShader.replace("if (uAOStrength > 0.0 && !sky && z0 < uAOFade.y)","if (uAOStrength > 0.0 && !sky)").replace("bool geometryEdge = !sky && z0 < uFade.y && uEdge > 0.0;","bool geometryEdge = true;");new W(1,1),new de,new de,new D(16512488);const ne=(o,i,u)=>new _(o,u,-i),ma=.7,me=[{name:"capsule",w:.34,ribs:[15,4],cap:.13,top:.38,bot:-.38,prof:[[0,-.36],[.12,-.36],[.19,-.31],[.222,-.2],[.23,0],[.222,.2],[.19,.31],[.12,.36],[0,.36]]},{name:"globe",w:.3,ribs:[11,6],cap:.1,top:.27,bot:-.27,prof:[[0,-.26],[.09,-.25],[.18,-.19],[.24,-.09],[.255,0],[.24,.09],[.18,.19],[.09,.25],[0,.26]]},{name:"drum",w:.18,ribs:[7,8],cap:.2,top:.19,bot:-.19,prof:[[0,-.17],[.2,-.17],[.26,-.12],[.28,0],[.26,.12],[.2,.17],[0,.17]]},{name:"gourd",w:.18,ribs:[12,5],cap:.08,top:.33,bot:-.33,prof:[[0,-.31],[.1,-.3],[.2,-.2],[.245,-.07],[.22,.08],[.15,.2],[.09,.29],[0,.31]]}],ye=[14242350,14706220,13123628,14711348,13650484,15391936,15116092,11546154];function da(o){const i=new K({color:16777215});return i.onBeforeCompile=u=>{u.vertexShader=u.vertexShader.replace("#include <common>",`#include <common>
        varying vec2 vLUv; varying vec3 vLN; varying vec3 vLV;`).replace("#include <project_vertex>",`#include <project_vertex>
        vLUv = uv; vLV = -mvPosition.xyz;
        vLN = normalize(normalMatrix * mat3(instanceMatrix) * normal);`),u.fragmentShader=u.fragmentShader.replace("#include <common>",`#include <common>
        varying vec2 vLUv; varying vec3 vLN; varying vec3 vLV;
        float lh(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float ln(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(lh(i), lh(i + vec2(1, 0)), f.x), mix(lh(i + vec2(0, 1)), lh(i + vec2(1, 1)), f.x), f.y); }`).replace("#include <color_fragment>",`#include <color_fragment>
        {
          vec3 pig = diffuseColor.rgb;
          float face = abs(dot(normalize(vLN), normalize(vLV)));              // 1 facing you .. 0 at the silhouette
          float mid = sin(clamp(vLUv.y, 0.0, 1.0) * 3.14159);                 // brightest halfway up the body
          vec3 deep = pig * vec3(0.72, 0.42, 0.34);                          // redder, deeper at the edges
          vec3 lit = mix(pig, vec3(1.0, 0.72, 0.36), 0.45);                  // warm core: painted glow
          float core = smoothstep(0.45, 1.0, face * (0.35 + 0.65 * mid));
          vec3 c = mix(deep, pig * 0.82, smoothstep(0.1, 0.5, face));
          c = mix(c, lit, core * core);
          c *= 0.9 + 0.2 * ln(vec2(vLUv.x * 9.0, vLUv.y * 6.0));             // mottled wash
          float hr = abs(fract(vLUv.y * ${o[0].toFixed(1)}) - 0.5);         // horizontal ribs
          float vr = abs(fract(vLUv.x * ${o[1].toFixed(1)} + 0.125) - 0.5); // vertical ribs
          float rib = max(smoothstep(0.42, 0.49, hr), smoothstep(0.47, 0.495, vr) * 0.9);
          c = mix(c, pig * vec3(0.7, 0.45, 0.38), rib * 0.55);
          diffuseColor.rgb = c;
        }`)},i.customProgramCacheKey=()=>"lantern"+o.join("x"),i}const pa=[.85,.68],Se=[[0,1,1],[.06,1.1,.82],[-.18,1,1],[-.34,.95,1.05],[-.08,1,.92],[-.4,.35,1.12],[0,1,1],[3,.8,1],[2.65,.75,.95]];function ha(o,i,u,t){const g=new se,k=[],r=[];for(const[n,d,l,x,C,j,b,R]of o){const F=ne(n,d,l),y=ne(x,C,j),w=S=>F.clone().lerp(y,S).add(new _(0,-b*4*S*(1-S),0));k.push(new _e(new ke(Array.from({length:24},(S,L)=>w(L/23))),32,.02,4,!1));for(let S=0;S<R;S++){const L=t()<.55?0:1,U=pa[L]*(.8+t()*.35),$=U*u[L][4]*(.88+t()*.24)*(t()<.5?-1:1);r.push({p:w((S+.5)/R).add(new _(0,-.05-t()*.15,0)),cell:L,w:$,h:U,hue:Se[t()*Se.length|0],seed:t()})}}g.add(new Q(re(k),new K({color:3878712})));const h=new je(1,1).translate(0,-.5,0),f=new Be;f.index=h.index,f.attributes.position=h.attributes.position,f.attributes.uv=h.attributes.uv;const c=r.length,v=new Float32Array(c*4),m=new Float32Array(c*2),N=new Float32Array(c*4),O=new Float32Array(c*3);r.forEach((n,d)=>{v.set([n.p.x,n.p.y,n.p.z,n.seed],d*4),m.set([n.w,n.h],d*2),N.set(u[n.cell].slice(0,4),d*4),O.set(n.hue,d*3)}),f.setAttribute("iPos",new te(v,4)),f.setAttribute("iSize",new te(m,2)),f.setAttribute("iUv",new te(N,4)),f.setAttribute("iHue",new te(O,3)),f.instanceCount=c,i.colorSpace=oe;const z=Ge.merge([Ie.fog,{uTex:{value:null},uTime:{value:0}}]);z.uTex.value=i;const I=`
    #include <common>
    #include <fog_pars_vertex>
    attribute vec4 iPos; attribute vec2 iSize; attribute vec4 iUv; attribute vec3 iHue; uniform float uTime;
    varying vec2 vUv; varying vec3 vHue;
    void main(){
      vec3 toCam = cameraPosition - iPos.xyz; toCam.y = 0.0;
      vec3 fwd = normalize(toCam + vec3(1e-4, 0.0, 0.0));
      vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
      float sw = sin(uTime * 1.3 + iPos.w * 20.0) * 0.07;              // sway about the cord point
      vec2 lp = vec2(position.x * iSize.x, position.y * iSize.y);
      lp = vec2(lp.x * cos(sw) - lp.y * sin(sw), lp.x * sin(sw) + lp.y * cos(sw));
      vec3 w = iPos.xyz + right * lp.x + vec3(0.0, lp.y, 0.0);
      vec4 mvPosition = viewMatrix * vec4(w, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      vUv = vec2(mix(iUv.x, iUv.z, uv.x), mix(iUv.y, iUv.w, uv.y)); vHue = iHue;
      #include <fog_vertex>
    }`,B=new X({uniforms:z,fog:!0,side:pe,vertexShader:I,fragmentShader:`
      #include <common>
      #include <fog_pars_fragment>
      uniform sampler2D uTex; varying vec2 vUv; varying vec3 vHue;
      vec3 hueRot(vec3 c, float a){                                      // rotate hue in YIQ, keep luma
        const mat3 toY = mat3(0.299, 0.596, 0.211, 0.587, -0.274, -0.523, 0.114, -0.322, 0.312);
        const mat3 toR = mat3(1.0, 1.0, 1.0, 0.956, -0.272, -1.106, 0.621, -0.647, 1.703);
        vec3 y = toY * c; float cs = cos(a), sn = sin(a);
        y.yz = vec2(y.y * cs - y.z * sn, y.y * sn + y.z * cs);
        return toR * y;
      }
      void main(){
        vec4 t = texture2D(uTex, vUv);
        if (t.a < 0.4) discard;
        vec3 c = hueRot(t.rgb, vHue.x);
        float l = dot(c, vec3(0.299, 0.587, 0.114));
        c = mix(vec3(l), c, vHue.y) * vHue.z;                              // saturation, value
        gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`}),T=new Q(f,B);T.frustumCulled=!1,T.userData.outlineMaterial=new X({side:pe,uniforms:z,vertexShader:I.replace("#include <fog_pars_vertex>","").replace("#include <fog_vertex>",""),fragmentShader:"uniform sampler2D uTex; varying vec2 vUv; void main(){ if (texture2D(uTex, vUv).a < 0.4) discard; gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0); }"}),g.add(T);const G=[],s=Math.max(1,Math.floor(c/12));for(let n=Math.floor(s/2);n<c&&G.length<12;n+=s)G.push(r[n].p.clone());return{group:g,count:c,lightSpots:G,update(n){z.uTime.value=n}}}function wa(o,{seed:i=41,painted:u=null}={}){if(u)return ha(o,u.tex,u.cells,be(i));const t=be(i),g=new se,k=[],r=[],h=me.map(()=>[]);for(const[s,n,d,l,x,C,j,b]of o){const R=ne(s,n,d),F=ne(l,x,C),y=w=>R.clone().lerp(F,w).add(new _(0,-j*4*w*(1-w),0));k.push(new _e(new ke(Array.from({length:24},(w,S)=>y(S/23))),32,.02,4,!1));for(let w=0;w<b;w++){const S=(w+.5)/b,L=t(),U=L<.4?0:L<.62?1:L<.82?2:3,$=me[U],Y=ma*(.82+t()*.3),ee=.08+t()*.18,H={p:y(S).add(new _(0,-($.top+.04)*Y-ee,0)),sc:Y,seed:t(),ti:U,col:ye[t()*ye.length|0]};r.push(H),h[U].push(H)}}g.add(new Q(re(k),new K({color:3878712})));const f=new K({color:4863280}),c=new K({color:11023404}),v=[],m=new D;me.forEach((s,n)=>{const d=h[n];if(!d.length)return;const l=new ue(new Ne(s.prof.map(([y,w])=>new W(y,w)),16),da(s.ribs),d.length),x=new fe(s.cap,s.cap,.07,12).translate(0,s.top,0),C=new fe(s.cap*.9,s.cap*.9,.06,12).translate(0,s.bot,0),j=new Te(.028,8,6).translate(0,s.bot-.07,0),b=new fe(.012,.03,.2,8).translate(0,s.bot-.18,0);for(const y of[x,C,j,b])y.deleteAttribute("uv");const R=new ue(re([x,C]),f,d.length),F=new ue(re([j,b]),c,d.length);d.forEach((y,w)=>l.setColorAt(w,m.set(y.col)));for(const y of[l,R,F])y.frustumCulled=!1,g.add(y);v.push({list:d,parts:[l,R,F]})});const N=new de,O=new $e,z=new ze,I=new _,B=s=>{for(const{list:n,parts:d}of v){n.forEach((l,x)=>{z.set(Math.sin(s*1.3+l.seed*20)*.08,l.seed*6.28,Math.cos(s*1.1+l.seed*13)*.06),N.compose(l.p,O.setFromEuler(z),I.setScalar(l.sc));for(const C of d)C.setMatrixAt(x,N)});for(const l of d)l.instanceMatrix.needsUpdate=!0}};B(0);const T=[],G=Math.max(1,Math.floor(r.length/12));for(let s=Math.floor(G/2);s<r.length&&T.length<12;s+=G)T.push(r[s].p.clone());return{group:g,count:r.length,lightSpots:T,update(s){B(s)}}}const Aa=["assets/harbour.draco.glb","assets/harbour_sky.jpg","assets/tex/harbour/pigment.json",...["grass","plaster","rock","roof","stone","wood"].map(o=>`assets/tex/harbour/${o}.jpg`),"assets/tex/harbour/palette.png",...["lanterns","clouds"].flatMap(o=>[`assets/tex/harbour/harbour_${o}.webp`,`assets/tex/harbour/harbour_${o}.json`])];function xa(o,i){const u=(o-.5)*Math.PI*2,t=(.5-i)*Math.PI;return new _(Math.cos(t)*Math.cos(u),Math.sin(t),Math.cos(t)*Math.sin(u)).normalize()}async function Ma({manager:o,renderer:i,camera:u}){const t=new He,g=await new Z(o).loadAsync("assets/harbour_sky.jpg");g.colorSpace=oe;const k=-.962,r=ra(g,{yaw:k,style:0});t.add(r),t.fog=new Ve(10127528,70,520);const h=xa(.6274,.4893).applyAxisAngle(new _(0,1,0),k),f=.2,c=new _(h.x,0,h.z).normalize().multiplyScalar(Math.cos(f)).setY(Math.sin(f)),v=new _(-8,0,40);t.add(new qe(6184092,4862514,.34));const m=new Ke(16738856,3.3);m.position.copy(v).addScaledVector(c,160),m.target.position.copy(v),m.castShadow=!0,m.shadow.mapSize.set(2048,2048),Object.assign(m.shadow.camera,{left:-95,right:95,top:95,bottom:-95,near:10,far:340}),m.shadow.bias=-8e-4,m.shadow.normalBias=.03,m.shadow.radius=7,m.shadow.blurSamples=16,t.add(m,m.target);const O=(await ea(o,"harbour")).scene;t.add(O),O.updateMatrixWorld(!0);const z=fa({shadowTint:9211080,lift:.14,litLevel:1.9,shadowEdge:.2,litEdge:.5,hueAmt:.8,soft:.2}),I=[[/^plaster_|^chapel_white$/,"plaster",.55,1/3],[/^(quay|step|wall)_stone$|^stone$/,"stone",.6,1/3],[/^roof_/,"roof",.7,1/2.5],[/^wood|^hull_/,"wood",.6,1/2],[/^land/,"grass",.65,1/9,!0],[/^rock$/,"rock",.65,1/6,!0]],B={};if(new URLSearchParams(location.search).get("tex")!=="0"){const e=await new ve(o).setResponseType("json").loadAsync("assets/tex/harbour/pigment.json"),a=new Z(o),p=Math.min(8,i.capabilities.getMaxAnisotropy());await Promise.all(Object.keys(e).map(async E=>{const A=await a.loadAsync(`assets/tex/harbour/${E}.jpg`);Object.assign(A,{colorSpace:oe,wrapS:xe,wrapT:xe,anisotropy:p}),B[E]={tex:A,mean:new D(...e[E])}}))}const T=e=>{const a=I.find(([p])=>p.test(e||""));return a&&B[a[1]]?{...B[a[1]],amt:a[2],scale:a[3],world:!!a[4]}:null},G=await new Z(o).loadAsync("assets/tex/harbour/palette.png");Object.assign(G,{colorSpace:oe,generateMipmaps:!1,minFilter:Ye});const s=new Map,n=[],d=[],l=[];let x=null,C=null,j=null,b={};const R=ia(i,{height:0,scale:.5,blur:[.5,1]});O.traverse(e=>{const a=e.name;if(/^boat_\d+$/.test(a)&&l.push({o:e,y:e.position.y,k:l.length}),a==="terrain_land"&&(b=e.userData),!e.isMesh)return;if(a.startsWith("col_")){e.visible=!1,n.push(e);return}if(a==="portal_return"){d.push({mesh:e,target:"hub",color:13215999,label:"Celestial Plaza"});return}if(a==="water_sea"){e.material=x=va(g,{yaw:k,sun:h,reflection:R}),C=e,e.userData.outlineMaterial=new X({vertexShader:"void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"void main(){ gl_FragColor = vec4(0.5, 1.0, 0.5, 0.0); }"});return}if(a==="lighthouse_lamp"){e.material=new K({color:16767392}),j=e;return}const p=e.material;if(s.has(p.uuid)||s.set(p.uuid,z(p,{emissiveBoost:.22,pigment:T(p.name)})),e.material=s.get(p.uuid),a.startsWith("terrain_")){n.push(e),e.receiveShadow=!0,e.castShadow=a!=="terrain_land";return}const E=(p.emissiveIntensity??0)>0&&p.emissive&&p.emissive.getHex()!==0;e.castShadow=!E,e.receiveShadow=!0});const F=JSON.parse(b.ripples||"[]").map(([e,a,p])=>[e,-a,p,1]);for(const[e,a]of JSON.parse(b.buoys||"[]"))F.push([e,-a,.55,1]);for(const{o:e}of l){const a=e.quaternion.clone(),p=new ze().setFromQuaternion(a,"YXZ").y;e.quaternion.identity(),e.updateMatrixWorld(!0);const E=new ge().setFromObject(e),A=E.getSize(new _);e.quaternion.copy(a),e.updateMatrixWorld(!0);const J=new ge().setFromObject(e).getCenter(new _),Ue=A.x>=A.z;F.push([J.x,J.z,Math.max(A.x,A.z)/2,Math.min(A.x,A.z)/Math.max(A.x,A.z,.01),Ue?p:p+Math.PI/2])}F.slice(0,M).forEach((e,a)=>{x.uniforms.uRip.value[a].set(e[0],e[1],e[2],e[3]),x.uniforms.uRipA.value[a]=e[4]||0}),x.uniforms.uRipN.value=Math.min(F.length,M),x.userData.updateRipples?.(0);const y=new W,w=new se;for(const e of n){const a=new Q(e.geometry);a.applyMatrix4(e.matrixWorld),w.add(a)}w.updateMatrixWorld(!0);const S=new aa;S.fromGraphNode(w);const L=await Promise.all([new Z(o).loadAsync("assets/tex/harbour/harbour_lanterns.webp"),new ve(o).setResponseType("json").loadAsync("assets/tex/harbour/harbour_lanterns.json")]).then(([e,a])=>({tex:e,cells:a.cells})).catch(()=>null),U=wa(JSON.parse(b.lanterns||"[]"),{painted:L});t.add(U.group);const $=ca(JSON.parse(b.laundry||"[]")),Y=la(JSON.parse(b.chimneys||"[]")),ee=ua(JSON.parse(b.buoys||"[]"),e=>z(e,{emissiveBoost:0})),H=sa(new _(-6,6,62),3,7);H.obj.material.color.set(4867174),t.add($.group,Y.obj,ee.group,H.obj);const[Me,De,Pe]=JSON.parse(b.lighthouse||"[-38,-106,18.9]"),V=new se;V.position.set(Me,Pe,-De);const ce=new Je(4.5,70,24,1,!0);ce.rotateZ(-Math.PI/2),ce.translate(35,0,0);const Re=new X({transparent:!0,depthWrite:!1,blending:Ze,side:pe,uniforms:{uCol:{value:new D(16767392)}},vertexShader:"varying float vX; void main(){ vX = position.x / 70.0; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"uniform vec3 uCol; varying float vX; void main(){ gl_FragColor = vec4(uCol * 0.1 * pow(1.0 - vX, 2.0), 1.0); }"}),le=new Q(ce,Re);if(V.add(le),t.add(V),j){const e=new Xe(16761466,6,26,1.6);e.position.copy(V.position),t.add(e)}const ae=new ta(d,v),We={...ae.arrival(ae.list[0],4.2),pitch:-.12};oa(t,[...l.map(e=>e.o),V]);const Oe=new Z(o),Ce=new ve(o).setResponseType("json"),[Fe,Le]=await Promise.all([Oe.loadAsync("assets/tex/harbour/harbour_clouds.webp"),Ce.loadAsync("assets/tex/harbour/harbour_clouds.json")]),q=na({texture:Fe,cells:Le.cells,opacity:.9,layers:[{count:16,rMin:230,rMax:330,yMin:55,yMax:120,wMin:70,wMax:140,cx:v.x,cz:v.z},{count:14,rMin:330,rMax:470,yMin:90,yMax:190,wMin:110,wMax:200,cx:v.x,cz:v.z}]});q.obj.material.uniforms.uHaze.value.set(10127528),q.obj.material.uniforms.uHazeDist.value.set(300,900),t.add(q.obj);const he={uPaperAmt:.16,uGran:.38,uWobble:2.7,uBleed:.8,uEdge:.36,uWash:.3};return R.paintWith({shader:P,exclude:[r,le,q.obj],uniforms:{...he,uWobble:1.6,uPaperAmt:.08}}),{name:"watercolor",scene:t,octree:S,portals:ae,spawn:We,reflection:R,exposure:1,shadowType:Qe,fov:58,sky:r,killY:-6,stats:{lanterns:U.count,boats:l.length},postOpts:{outline:{shader:P,exclude:[r,le,q.obj],uniforms:he},ao:{tint:8024752,strength:.75,cover:.3},bloom:!1,minScale:.72,paint:{radius:5,hard:8,sharp:8,scale:.5,near:4,far:40,nearAmt:.35,farAmt:.75},grade:{uSat:1.02,uShadow:3813488,uHighlight:16773340,uVignette:.3}},update(e,a,p){x.uniforms.uTime.value=a,x.userData.updateRipples?.(a),x.uniforms.uRes.value.copy(i.getDrawingBufferSize(y)),R.render(t,u,[C]),U.update(a),$.update(a),Y.update(a,i.getDrawingBufferSize(y).y),ee.update(a),H.update(a),q.update(a,p),V.rotation.y=a*.45;for(const{o:E,y:A,k:J}of l)E.position.y=A+Math.sin(a*.9+J*1.7)*.08,E.rotation.x=Math.sin(a*.7+J)*.03;return ae.update(e,a,p)}}}export{Aa as PRELOAD,Ma as createHarbour};
