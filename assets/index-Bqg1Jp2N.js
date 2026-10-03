import{a as B,c as j,al as Ve,y as re,S as se,V as k,l as ue,ak as ve,am as Ue,an as Ce,ah as ne,d as oe,ae as xe,ao as He,ap as be,aq as Ke,ar as Fe,ac as qe,as as Ye,ad as fe,J as pe,U as Oe,at as Je,ab as _e,af as Xe,K as Ze,au as Qe,a0 as Le,W as et,H as tt,Y as me,a1 as ce,av as ke,a8 as ye,a3 as at,a4 as ot,a5 as rt,m as ze,ai as Ae,aw as st,A as nt,a6 as it,z as ct}from"./Capsule-DQaDBPd7.js";import{m as le,l as lt,O as ut,P as ft,f as mt}from"./portals-CcgGbApM.js";import{r as Pe,K as vt,m as pt,i as dt,d as ht}from"./fx-Cg1jHl4w.js";import{O as wt,F as gt,K as Te}from"./outline-DM4tYeCE.js";import{m as xt,a as bt,b as yt}from"./life-BkWgVUmY.js";import"./grass-Bd0nTScA.js";import{m as de}from"./device-BZgtGmh4.js";const we=`
  float wc_h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float wc_n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(wc_h(i), wc_h(i + vec2(1, 0)), f.x), mix(wc_h(i + vec2(0, 1)), wc_h(i + vec2(1, 1)), f.x), f.y); }
  float wc_fbm(vec2 p){ return wc_n(p) * 0.55 + wc_n(p * 2.07 + 5.3) * 0.3 + wc_n(p * 4.3 + 9.1) * 0.15; }`;function St(e={}){const m={uShadowTint:{value:new j(e.shadowTint??8225464)},uPaper:{value:new j(e.paper??16512488)},uLift:{value:e.lift??.34},uLitLevel:{value:e.litLevel??2.2},uEdges:{value:new B(e.shadowEdge??.3,e.litEdge??.7)},uSoft:{value:e.soft??.09},uHueAmt:{value:e.hueAmt??.55}};return function(a,{density:d=.14,emissiveBoost:h=1,pigment:r=null}={}){const t=new Ve({name:a.name,color:a.color.clone(),emissive:a.emissive?a.emissive.clone():new j(0),emissiveIntensity:Math.min((a.emissiveIntensity??1)*h,3),transparent:a.transparent,opacity:a.opacity,side:a.side}),n=r?{uPig:{value:r.tex},uPigMean:{value:r.mean},uPigAmt:{value:r.amt??.6},uPigScale:{value:r.scale??.33},uPigRect:{value:r.rect??new re(0,0,1,1)}}:{};return r&&!r.world&&(t.map=r.tex),t.onBeforeCompile=l=>{Object.assign(l.uniforms,m,n,{uDensity:{value:d}}),r&&(l.defines={...l.defines,WC_PIG:1,...r.world?{WC_PIG_WORLD:1}:{}}),l.vertexShader=l.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vWcP;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
          vec4 wcTmp = vec4(transformed, 1.0);
          #ifdef USE_INSTANCING
            wcTmp = instanceMatrix * wcTmp;
          #endif
          vWcP = (modelMatrix * wcTmp).xyz;`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
          vWcN = normalize(mat3(modelMatrix) * objectNormal);`).replace("varying vec3 vWcP;","varying vec3 vWcP; varying vec3 vWcN;"),l.fragmentShader=l.fragmentShader.replace("#include <common>",`#include <common>
          varying vec3 vWcP; varying vec3 vWcN;
          #ifdef WC_PIG
            uniform sampler2D uPig; uniform vec3 uPigMean; uniform float uPigAmt, uPigScale; uniform vec4 uPigRect;
          #endif
          uniform vec3 uShadowTint, uPaper; uniform float uLift, uLitLevel, uSoft, uHueAmt, uDensity; uniform vec2 uEdges;
          ${we}`).replace("#include <map_fragment>",`
          #ifdef WC_PIG
          {
            #ifdef WC_PIG_WORLD
              vec3 an = abs(normalize(vWcN));                                   // world box projection, dominant axis
              vec2 puv = an.y > max(an.x, an.z) ? vWcP.xz : (an.x > an.z ? vWcP.zy : vWcP.xy);
            #else
              vec2 puv = vMapUv;
            #endif
            vec2 tileUV = puv * uPigScale;
            vec3 pt = textureGrad(uPig, uPigRect.xy + fract(tileUV) * uPigRect.zw, dFdx(tileUV) * uPigRect.zw, dFdy(tileUV) * uPigRect.zw).rgb;
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
          #include <opaque_fragment>`)},t.customProgramCacheKey=()=>"watercolour"+(r?r.world?"-pw":"-p":""),t}}const G=32;function _t(e,{yaw:m=0,sun:v=new k(0,.1,1),reflection:a,ripples:d=[]}={}){const h=Array.from({length:G},(t,n)=>new re(...d[n]||[0,0,0,0])),r=new se({fog:!1,uniforms:{uSky:{value:e},uYaw:{value:m},uTime:{value:0},uSun:{value:v.clone().normalize()},tRef:{value:a.texture},uTexMat:{value:a.textureMatrix},uRes:{value:new B(1600,900)},uDeep:{value:new j(3029612)},uMidWash:{value:new j(5922966)},uRefTint:{value:new j(14867696)},uSpark:{value:new j(16773330)},uRip:{value:h},uRipA:{value:new Float32Array(G)},uRipN:{value:Math.min(d.length,G)}},vertexShader:`
      uniform mat4 uTexMat;
      varying vec3 vW; varying vec4 vRef;
      void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vRef = uTexMat * w; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`
      uniform sampler2D uSky, tRef; uniform float uYaw, uTime; uniform vec3 uSun, uDeep, uMidWash, uRefTint, uSpark;
      uniform vec2 uRes; uniform vec4 uRip[${G}]; uniform float uRipA[${G}]; uniform int uRipN;
      varying vec3 vW; varying vec4 vRef;
      ${we}
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
        for (int i = 0; i < ${G}; i++) {
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
      }`});if(new URLSearchParams(location.search).get("postlegacy")!=="1"){const t=Array.from({length:G},()=>new re),n=Array.from({length:G},()=>new B);r.uniforms.uRipShape={value:t},r.uniforms.uRipRadius={value:n},r.userData.updateRipples=l=>{for(let u=0;u<r.uniforms.uRipN.value;u++){const i=r.uniforms.uRip.value[u],z=r.uniforms.uRipA.value[u];t[u].set(Math.cos(z),Math.sin(z),1/Math.max(i.z,1e-5),i.w>0?1/i.w:1);const b=Math.sin(l*.8+u)*.04,p=Math.abs(i.w-1)>.01;n[u].set((p?1.18:1.8)+b,(p?1.34:2.35)+b)}},r.fragmentShader=r.fragmentShader.replace("varying vec3 vW; varying vec4 vRef;",`uniform vec4 uRipShape[${G}];uniform vec2 uRipRadius[${G}]; varying vec3 vW; varying vec4 vRef;`).replace("vec3 refl = vec3(0.0); float wsum = 0.0;","vec3 core=texture2D(tRef,uv0).rgb;vec3 refl=core;float wsum=1.0;").replace("for (int k = 0; k < 6; k++)","for (int k = 1; k < 6; k++)").replace("vec3 core = texture2D(tRef, uv0).rgb;","").replace(/float grain = wc_n\(fc \* 0.5\)[^;]+;/,"").replace(/float stroke = wc_n\(vW.xz[\s\S]*?float spark = toward \*[^;]+;/,`float spark=0.0;
        if(toward>0.0){
          float grain=wc_n(fc*0.5)*0.6+wc_n(fc*0.13+3.0)*0.4;
          float stroke=wc_n(vW.xz*vec2(0.35,0.12)+drift);
          spark=toward*smoothstep(0.55,0.7,grain*0.5+stroke*0.7)*calm;
        }`).replace(/for \(int i = 0; i < 32; i\+\+\) \{[\s\S]*?\n        \}\n        c = mix\(c, skyWash/,`if(dist<60.0)for(int i=0;i<${G};i++){
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
        c = mix(c, skyWash`).replace("smoothstep(0.035, 0.0, abs(bloom - 0.55))","(1.0-smoothstep(0.0,0.035,abs(bloom-0.55)))").replace("smoothstep(0.16, 0.1, abs(lum(core) - lum(refl)))","(1.0-smoothstep(0.1,0.16,abs(lum(core)-lum(refl))))"),r.userData.updateRipples(0)}return r}const I={uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},uRes:{value:new B(1,1)},uNear:{value:.1},uFar:{value:1e3},uWobble:{value:2.2},uBleed:{value:0},uSoftAmt:{value:.35},uEdge:{value:.42},uWash:{value:.35},uPaperAmt:{value:.1},uGran:{value:.22},uPaper:{value:new j(16512488)},uDepthK:{value:.03},uNormalK:{value:.4},uFade:{value:new B(40,180)},tAO:{value:null},uAOStrength:{value:0},uAOTint:{value:new j(7301800)},uAOCover:{value:.35},uAOFade:{value:new B(40,110)},uAOContrast:{value:new B(.25,.95)}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
    #include <packing>
    uniform sampler2D tDiffuse, tNormal, tDepth, tAO;
    uniform vec2 uRes, uFade, uAOFade, uAOContrast; uniform float uNear, uFar, uWobble, uBleed, uEdge, uWash, uPaperAmt, uGran, uSoftAmt;
    uniform float uDepthK, uNormalK, uAOStrength, uAOCover; uniform vec3 uPaper, uAOTint;
    varying vec2 vUv;
    ${we}
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
    }`};I.paperCache={uniforms:{uRes:{value:new B},uField:{value:0}},vertexShader:I.vertexShader,fragmentShader:`${we}
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
    }`};I.cachedFragmentShader=I.fragmentShader.replace("uniform sampler2D tDiffuse, tNormal, tDepth, tAO;","uniform sampler2D tDiffuse, tNormal, tDepth, tAO, tFieldA, tFieldB;").replace(/vec2 wob =[^;]+;\s*wob \+= [^;]+;/,"vec4 fieldA=texture2D(tFieldA,vUv);vec4 fieldB=texture2D(tFieldB,vUv);fieldA.xy=(fieldA.xy-0.5)*5.5;fieldA.z=fieldA.z*2.8+0.8;fieldB.xy=(fieldB.xy-0.5)*20.0;fieldB.w*=1.25;vec2 wob=fieldA.xy*uWobble*px;").replace(/float fa =[^;]+;\s*vec2 fd =[^;]+;\s*float bl =[^;]+;/,"vec2 fd=fieldB.xy; float bl=1.0;").replace(/float fingers =[^;]+;/,"float fingers=fieldB.z;").replace("if (uBleed > 0.0)","if (uBleed > 0.0 && fieldB.z > 0.0)").replace(/float reach =[^;]+;/,"float reach=fieldA.z;").replace(/e \*= smoothstep\(0.3, 0.55,[^;]+;/,"e *= fieldA.w;").replace(/float g = wc_n\(fc \* 0.55\)[\s\S]*?float paper = g \+ fib \* 0.25;/,"float paper=fieldB.w;");I.uniforms.uAORes={value:new B(1,1)};const Ee=e=>e.replace("varying vec2 vUv;",`uniform vec2 uAORes; varying vec2 vUv;
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
    }`).replace("texture2D(tAO, vUv).r","aoVisibility(vUv)");I.cachedFragmentShader=Ee(I.cachedFragmentShader);I.proceduralFragmentShader=Ee(I.fragmentShader);I.legacyFragmentShader=I.fragmentShader.replace("if (uAOStrength > 0.0 && !sky && z0 < uAOFade.y)","if (uAOStrength > 0.0 && !sky)").replace("bool geometryEdge = !sky && z0 < uFade.y && uEdge > 0.0;","bool geometryEdge = true;");new B(1,1),new ue,new ue,new j(16512488);const he=(e,m,v)=>new k(e,v,-m),Mt=.7,Se=[{name:"capsule",w:.34,ribs:[15,4],cap:.13,top:.38,bot:-.38,prof:[[0,-.36],[.12,-.36],[.19,-.31],[.222,-.2],[.23,0],[.222,.2],[.19,.31],[.12,.36],[0,.36]]},{name:"globe",w:.3,ribs:[11,6],cap:.1,top:.27,bot:-.27,prof:[[0,-.26],[.09,-.25],[.18,-.19],[.24,-.09],[.255,0],[.24,.09],[.18,.19],[.09,.25],[0,.26]]},{name:"drum",w:.18,ribs:[7,8],cap:.2,top:.19,bot:-.19,prof:[[0,-.17],[.2,-.17],[.26,-.12],[.28,0],[.26,.12],[.2,.17],[0,.17]]},{name:"gourd",w:.18,ribs:[12,5],cap:.08,top:.33,bot:-.33,prof:[[0,-.31],[.1,-.3],[.2,-.2],[.245,-.07],[.22,.08],[.15,.2],[.09,.29],[0,.31]]}],Re=[14242350,14706220,13123628,14711348,13650484,15391936,15116092,11546154];function kt(e){const m=new oe({color:16777215});return m.onBeforeCompile=v=>{v.vertexShader=v.vertexShader.replace("#include <common>",`#include <common>
        varying vec2 vLUv; varying vec3 vLN; varying vec3 vLV;`).replace("#include <project_vertex>",`#include <project_vertex>
        vLUv = uv; vLV = -mvPosition.xyz;
        vLN = normalize(normalMatrix * mat3(instanceMatrix) * normal);`),v.fragmentShader=v.fragmentShader.replace("#include <common>",`#include <common>
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
          float hr = abs(fract(vLUv.y * ${e[0].toFixed(1)}) - 0.5);         // horizontal ribs
          float vr = abs(fract(vLUv.x * ${e[1].toFixed(1)} + 0.125) - 0.5); // vertical ribs
          float rib = max(smoothstep(0.42, 0.49, hr), smoothstep(0.47, 0.495, vr) * 0.9);
          c = mix(c, pig * vec3(0.7, 0.45, 0.38), rib * 0.55);
          diffuseColor.rgb = c;
        }`)},m.customProgramCacheKey=()=>"lantern"+e.join("x"),m}const zt=[.85,.68],De=[[0,1,1],[.06,1.1,.82],[-.18,1,1],[-.34,.95,1.05],[-.08,1,.92],[-.4,.35,1.12],[0,1,1],[3,.8,1],[2.65,.75,.95]];function At(e,m,v,a){const d=new ve,h=[],r=[];for(const[g,c,x,R,D,A,W,L]of e){const V=he(g,c,x),_=he(R,D,A),y=S=>V.clone().lerp(_,S).add(new k(0,-W*4*S*(1-S),0));h.push(new Ue(new Ce(Array.from({length:24},(S,E)=>y(E/23))),32,.02,4,!1));for(let S=0;S<L;S++){const E=a()<.55?0:1,F=zt[E]*(.8+a()*.35),P=F*v[E][4]*(.88+a()*.24)*(a()<.5?-1:1);r.push({p:y((S+.5)/L).add(new k(0,-.05-a()*.15,0)),cell:E,w:P,h:F,hue:De[a()*De.length|0],seed:a()})}}d.add(new ne(le(h),new oe({color:3878712})));const t=new qe(1,1).translate(0,-.5,0),n=new Ye;n.index=t.index,n.attributes.position=t.attributes.position,n.attributes.uv=t.attributes.uv;const l=r.length,u=new Float32Array(l*4),i=new Float32Array(l*2),z=new Float32Array(l*4),b=new Float32Array(l*3);r.forEach((g,c)=>{u.set([g.p.x,g.p.y,g.p.z,g.seed],c*4),i.set([g.w,g.h],c*2),z.set(v[g.cell].slice(0,4),c*4),b.set(g.hue,c*3)}),n.setAttribute("iPos",new fe(u,4)),n.setAttribute("iSize",new fe(i,2)),n.setAttribute("iUv",new fe(z,4)),n.setAttribute("iHue",new fe(b,3)),n.instanceCount=l,m.colorSpace=pe;const p=Oe.merge([Je.fog,{uTex:{value:null},uTime:{value:0}}]);p.uTex.value=m;const U=`
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
    }`,O=new se({uniforms:p,fog:!0,side:_e,vertexShader:U,fragmentShader:`
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
      }`}),C=new ne(n,O);C.frustumCulled=!1,C.userData.outlineMaterial=new se({side:_e,uniforms:p,vertexShader:U.replace("#include <fog_pars_vertex>","").replace("#include <fog_vertex>",""),fragmentShader:"uniform sampler2D uTex; varying vec2 vUv; void main(){ if (texture2D(uTex, vUv).a < 0.4) discard; gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0); }"}),d.add(C);const w=[],f=Math.max(1,Math.floor(l/12));for(let g=Math.floor(f/2);g<l&&w.length<12;g+=f)w.push(r[g].p.clone());return{group:d,count:l,lightSpots:w,update(g){p.uTime.value=g}}}function Pt(e,{seed:m=41,painted:v=null}={}){if(v)return At(e,v.tex,v.cells,Pe(m));const a=Pe(m),d=new ve,h=[],r=[],t=Se.map(()=>[]);for(const[f,g,c,x,R,D,A,W]of e){const L=he(f,g,c),V=he(x,R,D),_=y=>L.clone().lerp(V,y).add(new k(0,-A*4*y*(1-y),0));h.push(new Ue(new Ce(Array.from({length:24},(y,S)=>_(S/23))),32,.02,4,!1));for(let y=0;y<W;y++){const S=(y+.5)/W,E=a(),F=E<.4?0:E<.62?1:E<.82?2:3,P=Se[F],N=Mt*(.82+a()*.3),Y=.08+a()*.18,X={p:_(S).add(new k(0,-(P.top+.04)*N-Y,0)),sc:N,seed:a(),ti:F,col:Re[a()*Re.length|0]};r.push(X),t[F].push(X)}}d.add(new ne(le(h),new oe({color:3878712})));const n=new oe({color:4863280}),l=new oe({color:11023404}),u=[],i=new j;Se.forEach((f,g)=>{const c=t[g];if(!c.length)return;const x=new xe(new He(f.prof.map(([_,y])=>new B(_,y)),16),kt(f.ribs),c.length),R=new be(f.cap,f.cap,.07,12).translate(0,f.top,0),D=new be(f.cap*.9,f.cap*.9,.06,12).translate(0,f.bot,0),A=new Ke(.028,8,6).translate(0,f.bot-.07,0),W=new be(.012,.03,.2,8).translate(0,f.bot-.18,0);for(const _ of[R,D,A,W])_.deleteAttribute("uv");const L=new xe(le([R,D]),n,c.length),V=new xe(le([A,W]),l,c.length);c.forEach((_,y)=>x.setColorAt(y,i.set(_.col)));for(const _ of[x,L,V])_.frustumCulled=!1,d.add(_);u.push({list:c,parts:[x,L,V]})});const z=new ue,b=new Xe,p=new Fe,U=new k,O=f=>{for(const{list:g,parts:c}of u){g.forEach((x,R)=>{p.set(Math.sin(f*1.3+x.seed*20)*.08,x.seed*6.28,Math.cos(f*1.1+x.seed*13)*.06),z.compose(x.p,b.setFromEuler(p),U.setScalar(x.sc));for(const D of c)D.setMatrixAt(R,z)});for(const x of c)x.instanceMatrix.needsUpdate=!0}};O(0);const C=[],w=Math.max(1,Math.floor(r.length/12));for(let f=Math.floor(w/2);f<r.length&&C.length<12;f+=w)C.push(r[f].p.clone());return{group:d,count:r.length,lightSpots:C,update(f){O(f)}}}const Ne={uniforms:{tSrc:{value:null},uStep:{value:new B}},vertexShader:Te.vertexShader,fragmentShader:`
    uniform sampler2D tSrc; uniform vec2 uStep; varying vec2 vUv;
    void main(){
      vec3 c = vec3(0.0); float ws = 0.0;
      for (int i = -6; i <= 6; i++) { float t = float(i) / 3.0, w = exp(-0.5 * t * t); c += texture2D(tSrc, vUv + uStep * t).rgb * w; ws += w; }
      gl_FragColor = vec4(c / ws, 1.0);
    }`};function We(e){const m=new Map;let v=0;for(let d=-6;d<=6;d++){const h=e*d/3,r=Math.exp(-.5*(d/3)**2),t=Math.floor(h>0?h-1e-8:h),n=m.get(t)||{weight:0,offset:0};n.weight+=r,n.offset+=h*r,m.set(t,n),v+=r}const a=[...m.values()].map(d=>`texture2D(tSrc,vUv+uStep*${(d.offset/d.weight).toFixed(9)}).rgb*${(d.weight/v).toFixed(9)}`).join("+");return{...Ne,fragmentShader:`uniform sampler2D tSrc;uniform vec2 uStep;varying vec2 vUv;void main(){gl_FragColor=vec4(${a},1.0);}`}}function Rt(e,{height:m=0,scale:v=.5,scaleY:a=v,maxPixels:d=960*540,clipBias:h=.003,paint:r=0,blur:t=null}={}){const n=new URLSearchParams(location.search).get("postlegacy")==="1",l=(P=!1)=>new et(1,1,{type:tt,depthBuffer:P}),u=l(!0),i=r>0||t?l():null,z=t?l():null,b=(P,N)=>new gt(new se({...P,uniforms:Oe.clone(P.uniforms),defines:N,depthTest:!1,depthWrite:!1})),p=r>0?b(Te,{RADIUS:r|0}):null,U=t?b(Ne):null,O=t&&!n?b(We(t[0])):U,C=t&&!n?b(We(t[1])):U;let w=null,f=null;const g=t?i:i||u,c=new Ze,x=new ue,R=new k(0,1,0),D=new k(0,m,0),A=new k,W=new k,L=new k,V=new k,_=new ue,y=new Qe,S=new re,E=new re,F=new B;return{texture:g.texture,textureMatrix:x,suspend(){[u,i,z,f].forEach(P=>P?.setSize(1,1)),w?.suspend()},paintWith({shader:P,uniforms:N={},exclude:Y=[]}){w=new wt(e,new Le,c,{shader:P,uniforms:N,exclude:Y,depthReuse:!1}),f=l()},render(P,N,Y=[]){w&&(w.scene=P),e.getDrawingBufferSize(F);const X=n?1:Math.min(1,Math.sqrt(d/(F.x*v*F.y*a))),K=Math.max(1,Math.round(F.x*v*X)),q=Math.max(1,Math.round(F.y*a*X));if((u.width!==K||u.height!==q)&&(u.setSize(K,q),i?.setSize(K,q),z?.setSize(K,q),f?.setSize(K,q),w?.rt.setSize(K,q),w?.pass.uniforms.uRes.value.set(K,q)),A.setFromMatrixPosition(N.matrixWorld),W.subVectors(D,A),W.dot(R)>0)return;W.reflect(R).negate().add(D),_.extractRotation(N.matrixWorld),L.set(0,0,-1).applyMatrix4(_).add(A),V.subVectors(D,L).reflect(R).negate().add(D),c.position.copy(W),c.up.set(0,1,0).applyMatrix4(_).reflect(R),c.lookAt(V),c.far=N.far,c.updateMatrixWorld(),c.projectionMatrix.copy(N.projectionMatrix),x.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1).multiply(c.projectionMatrix).multiply(c.matrixWorldInverse),y.setFromNormalAndCoplanarPoint(R,D).applyMatrix4(c.matrixWorldInverse),S.set(y.normal.x,y.normal.y,y.normal.z,y.constant);const H=c.projectionMatrix.elements;E.set((Math.sign(S.x)+H[8])/H[0],(Math.sign(S.y)+H[9])/H[5],-1,(1+H[10])/H[14]),S.multiplyScalar(2/S.dot(E)),H[2]=S.x,H[6]=S.y,H[10]=S.z+1-h,H[14]=S.w;const Z=e.getRenderTarget(),ie=e.shadowMap.autoUpdate,ge=Y.map($=>$.visible);Y.forEach($=>{$.visible=!1}),e.shadowMap.autoUpdate=!1,w&&w.prepass(),e.setRenderTarget(u),e.clear(),e.render(P,c);let Q=u;if(w&&(w.pass.render(e,f,u),Q=f),p&&(p.material.uniforms.tSrc.value=Q.texture,p.material.uniforms.uTexel.value.set(1/K,1/q),e.setRenderTarget(i),p.render(e),Q=i),U){const $=O.material.uniforms,te=C.material.uniforms;$.tSrc.value=Q.texture,$.uStep.value.set((n?t[0]:1)/K,0),e.setRenderTarget(z),O.render(e),te.tSrc.value=z.texture,te.uStep.value.set(0,(n?t[1]:1)/q),e.setRenderTarget(i),C.render(e)}e.setRenderTarget(Z),e.shadowMap.autoUpdate=ie,Y.forEach(($,te)=>{$.visible=ge[te]})}}}async function Dt(e,m){const v="assets/tex/harbour/",a=de?"mobile":"desktop",d=await new me(e).setResponseType("json").loadAsync(v+"pigment-atlas.json");let h;if(new URLSearchParams(location.search).get("ktx")!=="0"){const r=new vt(e).setTranscoderPath("basis/").setWorkerLimit(1).detectSupport(m);try{h=await r.loadAsync(`${v}pigment-atlas-${a}.ktx2`)}catch(t){console.warn("[harbour] compressed atlas unavailable; using WebP",t)}finally{r.dispose()}}return h??=await new ce(e).loadAsync(`${v}pigment-atlas-${a}.webp`),Object.assign(h,{colorSpace:pe,anisotropy:Math.min(de?2:8,m.capabilities.getMaxAnisotropy()),wrapS:ke,wrapT:ke}),h.name=`Harbour pigment atlas (${a})`,Object.fromEntries(Object.entries(d.tiles).map(([r,t])=>[r,{tex:h,rect:new re(...t.rect),mean:new j(...t.mean)}]))}function Wt(e,m,v){const a=new Map,d=new Set(v.map(t=>t.o));let h=0;e.traverse(t=>{if(!t.isMesh||!t.visible||!t.material.userData.harbourBatch||t.material.transparent)return;for(let i=t;i;i=i.parent)if(d.has(i))return;const n=t.material;t.geometry.computeBoundingBox();const l=t.geometry.boundingBox.getCenter(new k).applyMatrix4(t.matrixWorld),u=[n.userData.harbourBatch,n.emissive.getHex(),n.emissiveIntensity,n.side,n.opacity,t.castShadow,t.receiveShadow,Math.floor(l.x/40),Math.floor(l.z/40)].join(":");a.has(u)||a.set(u,[]),a.get(u).push(t),h++});let r=0;for(const t of a.values()){if(t.length===1)continue;const n=t[0].material,l=n.clone();l.onBeforeCompile=n.onBeforeCompile,l.customProgramCacheKey=n.customProgramCacheKey,l.vertexColors=!0,l.color.set(16777215);const u=t.map(b=>{const p=b.geometry.clone();p.applyMatrix4(b.matrixWorld);for(const w of Object.keys(p.attributes))["position","normal","uv"].includes(w)||p.deleteAttribute(w);p.attributes.normal||p.computeVertexNormals();const U=p.attributes.position.count;p.index||p.setIndex(new ye(Uint32Array.from({length:U},(w,f)=>f),1)),p.attributes.uv||p.setAttribute("uv",new ye(new Float32Array(U*2),2));const O=new Float32Array(U*3),C=b.material.color;for(let w=0;w<U;w++)O.set([C.r,C.g,C.b],w*3);return p.setAttribute("color",new ye(O,3)),p.clearGroups(),p}),i=le(u,!1);if(u.forEach(b=>b.dispose()),!i){l.dispose();continue}i.computeBoundingSphere(),i.computeBoundingBox();const z=new ne(i,l);z.name=`harbour_static_${r++}`,z.castShadow=t[0].castShadow,z.receiveShadow=t[0].receiveShadow,m.add(z),t.forEach(b=>b.removeFromParent())}return{sourceMeshes:h,mergedBatches:r,remainingSingletons:[...a.values()].filter(t=>t.length===1).length}}const Bt=["assets/harbour.draco.glb","assets/harbour_sky.jpg","assets/tex/harbour/pigment-atlas.json","assets/tex/harbour/pigment-atlas-desktop.ktx2","basis/basis_transcoder.js","basis/basis_transcoder.wasm",...["lanterns","clouds"].flatMap(e=>[`assets/tex/harbour/harbour_${e}.webp`,`assets/tex/harbour/harbour_${e}.json`])];function Ut(e,m){const v=(e-.5)*Math.PI*2,a=(.5-m)*Math.PI;return new k(Math.cos(a)*Math.cos(v),Math.sin(a),Math.cos(a)*Math.sin(v)).normalize()}async function jt({manager:e,renderer:m,camera:v}){const a=new Le,d=await new ce(e).loadAsync("assets/harbour_sky.jpg");d.colorSpace=pe;const h=-.962,r=pt(d,{yaw:h,style:0});a.add(r),a.fog=new at(10127528,70,520);const t=Ut(.6274,.4893).applyAxisAngle(new k(0,1,0),h),n=.2,l=new k(t.x,0,t.z).normalize().multiplyScalar(Math.cos(n)).setY(Math.sin(n)),u=new k(-8,0,40);a.add(new ot(6184092,4862514,.34));const i=new rt(16738856,3.3);i.position.copy(u).addScaledVector(l,160),i.target.position.copy(u),i.castShadow=!0,i.shadow.mapSize.set(2048,2048),Object.assign(i.shadow.camera,{left:-95,right:95,top:95,bottom:-95,near:10,far:340}),i.shadow.bias=-8e-4,i.shadow.normalBias=.03,i.shadow.radius=7,i.shadow.blurSamples=16,a.add(i,i.target);const b=(await lt(e,"harbour")).scene;a.add(b),b.updateMatrixWorld(!0);const p=St({shadowTint:9211080,lift:.14,litLevel:1.9,shadowEdge:.2,litEdge:.5,hueAmt:.8,soft:.2}),U=[[/^plaster_|^chapel_white$/,"plaster",.55,1/3],[/^(quay|step|wall)_stone$|^stone$/,"stone",.6,1/3],[/^roof_/,"roof",.7,1/2.5],[/^wood|^hull_/,"wood",.6,1/2],[/^land/,"grass",.65,1/9,!0],[/^rock$/,"rock",.65,1/6,!0]];let O={};if(new URLSearchParams(location.search).get("tex")!=="0")if(new URLSearchParams(location.search).get("harbouratlas")!=="0")O=await Dt(e,m);else{const o=await new me(e).setResponseType("json").loadAsync("assets/tex/harbour/pigment.json"),s=new ce(e),M=Math.min(8,m.capabilities.getMaxAnisotropy());await Promise.all(Object.keys(o).map(async J=>{const T=await s.loadAsync(`assets/tex/harbour/${J}.jpg`);Object.assign(T,{colorSpace:pe,wrapS:ze,wrapT:ze,anisotropy:M}),O[J]={tex:T,mean:new j(...o[J])}}))}const C=o=>{const s=U.find(([M])=>M.test(o||""));return s&&O[s[1]]?{...O[s[1]],amt:s[2],scale:s[3],world:!!s[4]}:null},w=new Map,f=[],g=[],c=[];let x=null,R=null,D=null,A={};const W=Rt(m,{height:0,scale:de?.3:.5,maxPixels:de?384*216:960*540,blur:[.5,1]});b.traverse(o=>{const s=o.name;if(/^boat_\d+$/.test(s)&&c.push({o,y:o.position.y,k:c.length}),s==="terrain_land"&&(A=o.userData),!o.isMesh)return;if(s.startsWith("col_")){o.visible=!1,f.push(o);return}if(s==="portal_return"){g.push({mesh:o,target:"hub",color:13215999,label:"Celestial Plaza"});return}if(s==="water_sea"){o.material=x=_t(d,{yaw:h,sun:t,reflection:W}),R=o,o.userData.outlineMaterial=new se({vertexShader:"void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"void main(){ gl_FragColor = vec4(0.5, 1.0, 0.5, 0.0); }"});return}if(s==="lighthouse_lamp"){o.material=new oe({color:16767392}),D=o;return}const M=o.material;w.has(M.uuid)||w.set(M.uuid,p(M,{emissiveBoost:.22,pigment:C(M.name)})),o.material=w.get(M.uuid);const J=U.findIndex(([ee])=>ee.test(M.name||""));if(o.material.userData.harbourBatch=`wash-${J}`,s.startsWith("terrain_")){f.push(o),o.receiveShadow=!0,o.castShadow=s!=="terrain_land";return}const T=(M.emissiveIntensity??0)>0&&M.emissive&&M.emissive.getHex()!==0;o.castShadow=!T,o.receiveShadow=!0});const L=JSON.parse(A.ripples||"[]").map(([o,s,M])=>[o,-s,M,1]);for(const[o,s]of JSON.parse(A.buoys||"[]"))L.push([o,-s,.55,1]);for(const{o}of c){const s=o.quaternion.clone(),M=new Fe().setFromQuaternion(s,"YXZ").y;o.quaternion.identity(),o.updateMatrixWorld(!0);const J=new Ae().setFromObject(o),T=J.getSize(new k);o.quaternion.copy(s),o.updateMatrixWorld(!0);const ee=new Ae().setFromObject(o).getCenter(new k),Ie=T.x>=T.z;L.push([ee.x,ee.z,Math.max(T.x,T.z)/2,Math.min(T.x,T.z)/Math.max(T.x,T.z,.01),Ie?M:M+Math.PI/2])}L.slice(0,G).forEach((o,s)=>{x.uniforms.uRip.value[s].set(o[0],o[1],o[2],o[3]),x.uniforms.uRipA.value[s]=o[4]||0}),x.uniforms.uRipN.value=Math.min(L.length,G),x.userData.updateRipples?.(0);const V=new B,_=new ve;for(const o of f){const s=new ne(o.geometry);s.applyMatrix4(o.matrixWorld),_.add(s)}_.updateMatrixWorld(!0);const y=new ut;y.fromGraphNode(_);const S=new URLSearchParams(location.search).get("harbourbatch")==="0"?null:Wt(b,a,c),E=await Promise.all([new ce(e).loadAsync("assets/tex/harbour/harbour_lanterns.webp"),new me(e).setResponseType("json").loadAsync("assets/tex/harbour/harbour_lanterns.json")]).then(([o,s])=>({tex:o,cells:s.cells})).catch(()=>null),F=Pt(JSON.parse(A.lanterns||"[]"),{painted:E});a.add(F.group);const P=xt(JSON.parse(A.laundry||"[]")),N=bt(JSON.parse(A.chimneys||"[]")),Y=yt(JSON.parse(A.buoys||"[]"),o=>p(o,{emissiveBoost:0})),X=dt(new k(-6,6,62),3,7);X.obj.material.color.set(4867174),a.add(P.group,N.obj,Y.group,X.obj);const[K,q,H]=JSON.parse(A.lighthouse||"[-38,-106,18.9]"),Z=new ve;Z.position.set(K,H,-q);const ie=new st(4.5,70,24,1,!0);ie.rotateZ(-Math.PI/2),ie.translate(35,0,0);const ge=new se({transparent:!0,depthWrite:!1,blending:nt,side:_e,uniforms:{uCol:{value:new j(16767392)}},vertexShader:"varying float vX; void main(){ vX = position.x / 70.0; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"uniform vec3 uCol; varying float vX; void main(){ gl_FragColor = vec4(uCol * 0.1 * pow(1.0 - vX, 2.0), 1.0); }"}),Q=new ne(ie,ge);if(Z.add(Q),a.add(Z),D){const o=new it(16761466,6,26,1.6);o.position.copy(Z.position),a.add(o)}const $=new ft(g,u),te={...$.arrival($.list[0],4.2),pitch:-.12};mt(a,[...c.map(o=>o.o),Z]);const Be=new ce(e),je=new me(e).setResponseType("json"),[$e,Ge]=await Promise.all([Be.loadAsync("assets/tex/harbour/harbour_clouds.webp"),je.loadAsync("assets/tex/harbour/harbour_clouds.json")]),ae=ht({texture:$e,cells:Ge.cells,opacity:.9,layers:[{count:16,rMin:230,rMax:330,yMin:55,yMax:120,wMin:70,wMax:140,cx:u.x,cz:u.z},{count:14,rMin:330,rMax:470,yMin:90,yMax:190,wMin:110,wMax:200,cx:u.x,cz:u.z}]});ae.obj.material.uniforms.uHaze.value.set(10127528),ae.obj.material.uniforms.uHazeDist.value.set(300,900),a.add(ae.obj);const Me={uPaperAmt:.16,uGran:.38,uWobble:2.7,uBleed:.8,uEdge:.36,uWash:.3};return W.paintWith({shader:I,exclude:[r,Q,ae.obj],uniforms:{...Me,uWobble:1.6,uPaperAmt:.08}}),{name:"watercolor",scene:a,octree:y,portals:$,spawn:te,reflection:W,exposure:1,shadowType:ct,fov:58,sky:r,killY:-6,stats:{lanterns:F.count,boats:c.length,...S},postOpts:{outline:{shader:I,exclude:[r,Q,ae.obj],uniforms:Me},ao:{tint:8024752,strength:.75,cover:.3},bloom:!1,minScale:.75,paint:{radius:5,hard:8,sharp:8,scale:.5,near:4,far:40,nearAmt:.35,farAmt:.75},grade:{uSat:1.02,uShadow:3813488,uHighlight:16773340,uVignette:.3}},update(o,s,M){x.uniforms.uTime.value=s,x.userData.updateRipples?.(s),x.uniforms.uRes.value.copy(m.getDrawingBufferSize(V)),W.render(a,v,[R]),F.update(s),P.update(s),N.update(s,m.getDrawingBufferSize(V).y),Y.update(s),X.update(s),ae.update(s,M),Z.rotation.y=s*.45;for(const{o:J,y:T,k:ee}of c)J.position.y=T+Math.sin(s*.9+ee*1.7)*.08,J.rotation.x=Math.sin(s*.7+ee)*.03;return $.update(o,s,M)}}}export{Bt as PRELOAD,jt as createHarbour};
