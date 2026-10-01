import{V as M,c as d,ak as U,S as F,a0 as q,a1 as K,J as V,a3 as $,a4 as Y,a5 as J,ai as Q,aj as j,aa as D,ab as A,ac as X,P as Z}from"./Capsule-CAAjHJID.js";import{l as ee,O as ae,P as te,f as oe}from"./portals-CEiaI1ve.js";import{m as ne,i as re}from"./fx-CRoevLXV.js";import{m as se}from"./reflection-CbyYwIKA.js";import"./outline-B2XbQAMz.js";const E=`
  float mb_h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float mb_n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mb_h(i), mb_h(i + vec2(1, 0)), f.x), mix(mb_h(i + vec2(0, 1)), mb_h(i + vec2(1, 1)), f.x), f.y); }
  // one family of parallel ink lines across coordinate t (world units), drawn like a pen: lines stay ~uPx.x px
  // apart and ~uPx.y px wide at any distance. Spacing snaps to power-of-two octaves of the world spacing, so the
  // lines stay glued to the surface; each octave's in-between lines fade in/out smoothly (no popping, no moire).
  float mb_ink1(float t, float wpx){
    float fw = max(fwidth(t), 1e-5);
    float d = min(fract(t), 1.0 - fract(t)) / fw;                   // distance to the nearest line, in pixels
    return 1.0 - smoothstep(wpx * 0.5 - 0.5, wpx * 0.5 + 0.5, d);
  }
  float mb_lines(float t, float spx, float wpx){
    float L = log2(max(fwidth(t), 1e-6) * spx);                     // octave where spacing ~= spx pixels
    float q = exp2(floor(L)), f = fract(L);
    float fine = mb_ink1(t / q, wpx), coarse = mb_ink1(t / (2.0 * q), wpx);
    return mix(fine, coarse, smoothstep(0.2, 0.8, f));
  }`;function ie(t={}){const f={uShade:{value:new d(t.shade??10128064)},uShadeAmt:{value:t.shadeAmt??.42},uInk:{value:new d(t.ink??2760760)},uWarm:{value:new d(t.warm??16774372)},uEdge:{value:t.edge??.3},uLitLevel:{value:t.litLevel??1},uHatch:{value:new M(t.hatchSpacing??7,t.hatchWidth??1.2,t.hatchAmt??.8)},uCross:{value:t.cross??.12}};return function(o,{ripples:p=!1,courses:v=!1,hatchScale:x=1}={}){const b=new U({name:o.name,color:o.color.clone(),side:o.side});return b.onBeforeCompile=s=>{Object.assign(s.uniforms,f,{uHatchScale:{value:x}}),p&&(s.defines={...s.defines,MB_RIPPLES:1}),v&&(s.defines={...s.defines,MB_COURSES:1}),s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vMbP; varying vec3 vMbN;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
          vec4 mbTmp = vec4(transformed, 1.0);
          #ifdef USE_INSTANCING
            mbTmp = instanceMatrix * mbTmp;
          #endif
          vMbP = (modelMatrix * mbTmp).xyz;`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
          vMbN = normalize(mat3(modelMatrix) * objectNormal);`),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
          varying vec3 vMbP; varying vec3 vMbN;
          uniform vec3 uShade, uInk, uWarm, uHatch; uniform float uShadeAmt, uEdge, uLitLevel, uCross, uHatchScale;
          ${E}`).replace("#include <opaque_fragment>",`
          {
            vec3 fill = diffuseColor.rgb;
            vec3 light = outgoingLight;
            float pl = max(dot(fill, vec3(0.299, 0.587, 0.114)), 1e-3);
            float amt = dot(light, vec3(0.299, 0.587, 0.114)) / pl / uLitLevel;
            float aa = max(fwidth(amt), 1e-3);
            float lit = smoothstep(uEdge - aa, uEdge + aa, amt);           // one crisp terminator, anti-aliased
            vec3 shade = mix(fill * vec3(0.7, 0.72, 0.9), uShade, uShadeAmt);
            vec3 col = mix(shade, fill * uWarm, lit);

            // world-anchored hatching on the surface's dominant plane
            vec3 an = abs(normalize(vMbN));
            vec2 p = an.y > max(an.x, an.z) ? vMbP.xz : (an.x > an.z ? vMbP.zy : vMbP.xy);
            float h1 = mb_lines(dot(p, vec2(0.7071, 0.7071)), uHatch.x * uHatchScale, uHatch.y);
            float h2 = mb_lines(dot(p, vec2(0.7071, -0.7071)), uHatch.x * uHatchScale * 1.2, uHatch.y * 0.9);
            float deep = 1.0 - smoothstep(uCross - aa, uCross + aa, amt);
            float hatch = (1.0 - lit) * max(h1, h2 * deep) * uHatch.z;
            #ifdef MB_RIPPLES
            {                                                           // sparse broken ink strokes: wind ripples
              float w = vMbP.x * 0.34 + vMbP.z * 0.94 + 1.6 * mb_n(vMbP.xz * 0.07);
              float r = mb_ink1(w * 0.55, 1.0) * (1.0 - smoothstep(0.08, 0.3, fwidth(w * 0.55)));   // fixed-in-world strokes, fade out far off
              float seg = smoothstep(0.58, 0.66, mb_n(vMbP.xz * vec2(0.09, 0.35) + 3.1));
              hatch = max(hatch, r * seg * 0.55 * lit);
            }
            #endif
            #ifdef MB_COURSES
            if (an.y < 0.5) {                                           // sketched stone courses: a few joints, not a grid
              float row = floor(vMbP.y / 1.6);
              float along = an.x > an.z ? vMbP.z : vMbP.x;
              float fade = 1.0 - smoothstep(0.12, 0.35, fwidth(vMbP.y / 1.6));
              float bed = mb_ink1(vMbP.y / 1.6, 1.0) * smoothstep(0.35, 0.5, mb_n(vec2(along * 0.18, row * 3.7)));
              float head = mb_ink1(along / 2.6 + row * 0.5, 1.0) * step(0.55, mb_h(vec2(floor(along / 2.6 + row * 0.5), row)));
              hatch = max(hatch, max(bed, head) * fade * 0.75);
            }
            #endif
            col = mix(col, uInk, hatch);
            outgoingLight = col;
          }
          #include <opaque_fragment>`)},b.customProgramCacheKey=()=>"moebius"+(p?"-r":"")+(v?"-c":""),b}}function le(t,f={}){return new F({fog:!1,uniforms:{tRef:{value:t.texture},uTexMat:{value:t.textureMatrix},uTime:{value:0},uWater:{value:new d(f.water??2930884)},uDeep:{value:new d(f.deep??1870504)},uInk:{value:new d(f.ink??2760760)}},vertexShader:`
      uniform mat4 uTexMat; varying vec3 vW; varying vec4 vRef;
      void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vRef = uTexMat * w; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`
      uniform sampler2D tRef; uniform vec3 uWater, uDeep, uInk; uniform float uTime;
      varying vec3 vW; varying vec4 vRef;
      ${E}
      void main(){
        vec2 wob = vec2(0.0, (mb_n(vW.xz * vec2(0.6, 2.2) + uTime * 0.3) - 0.5) * 0.012);
        vec3 ref = texture2D(tRef, vRef.xy / vRef.w + wob).rgb;
        float l = dot(ref, vec3(0.299, 0.587, 0.114));
        float band = smoothstep(0.34, 0.36, l);                         // reflections as two flat tones
        vec3 col = mix(uDeep, mix(uWater, ref, 0.35), band);
        col = mix(col, ref * uWater * 1.6, 0.25);
        float t = vW.z * 1.6 + mb_n(vW.xz * 0.3 + uTime * 0.05) * 1.5;  // short ink dashes drifting on the surface
        float dash = mb_ink1(t, 1.0) * (1.0 - smoothstep(0.1, 0.35, fwidth(t))) * smoothstep(0.62, 0.7, mb_n(vec2(vW.x * 0.45 + uTime * 0.2, t * 0.5)));
        col = mix(col, uInk, dash * 0.7);
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }`})}const ve=["assets/temple.draco.glb","assets/temple_sky.jpg"];function ce(t,f){const h=(t-.5)*Math.PI*2,o=(.5-f)*Math.PI;return new M(Math.cos(o)*Math.cos(h),Math.sin(o),Math.cos(o)*Math.sin(h)).normalize()}const S=2760760;async function xe({manager:t,renderer:f,camera:h}){const o=new q,p=await new K(t).loadAsync("assets/temple_sky.jpg");p.colorSpace=V;const v=1.354,x=ne(p,{yaw:v,style:0,lod:0});o.add(x),o.fog=new $(16305304,160,700);const b=ce(.2989,.31).applyAxisAngle(new M(0,1,0),v),s=new M(0,0,0);o.add(new Y(12576511,15907210,.7));const m=new J(16773852,Math.PI);m.position.copy(s).addScaledVector(b,180),m.target.position.copy(s),m.castShadow=!0,m.shadow.mapSize.set(4096,4096),Object.assign(m.shadow.camera,{left:-100,right:100,top:100,bottom:-100,near:20,far:380}),m.shadow.bias=-6e-4,m.shadow.normalBias=.04,o.add(m,m.target);const _=(await ee(t,"temple")).scene;o.add(_),_.updateMatrixWorld(!0);const k=ie({ink:S}),P=new Map,W=[],T=[],w=[];let C={},R=null,N=null;const z=se(f,{height:-2.2,scale:.5});_.traverse(e=>{const a=e.name;if(a==="terrain_land"&&(C=e.userData),/^float_rock_\d+$/.test(a)&&w.push({o:e,y:e.position.y,k:w.length}),!e.isMesh)return;if(a.startsWith("col_")){e.visible=!1,W.push(e);return}if(a==="portal_return"){T.push({mesh:e,target:"hub",color:13215999,label:"Celestial Plaza"});return}if(a==="water_pool"){e.material=R=le(z,{ink:S}),N=e;return}const u=e.material,n=/^sand/.test(u.name),c=/^temple_(rose|pale)$/.test(u.name),r=u.uuid+(n?"r":"");P.has(r)||P.set(r,k(u,{ripples:n,courses:c,hatchScale:n?.8:1})),e.material=P.get(r),e.castShadow=!a.startsWith("terrain_land"),e.receiveShadow=!0;const i=e.parent&&/^float_rock_/.test(e.parent.name);/^(terrain_|temple_|prop_)/.test(a)&&!i&&W.push(e)});const L=new Q;for(const e of W){const a=new j(e.geometry);a.applyMatrix4(e.matrixWorld),L.add(a)}L.updateMatrixWorld(!0);const H=new ae;H.fromGraphNode(L);const O=k(new D({color:new d(12867660),side:A})),B=k(new D({color:new d(4889780),side:A})),I=JSON.parse(C.banners||"[]").map(([e,a,u,n,c],r)=>{const i=new X(n,c,1,10);i.translate(0,-c/2,0);const l=new j(i,r%2?B:O);return l.position.set(e,u,-a),l.rotation.y=Math.PI,l.castShadow=!0,o.add(l),{m:l,base:i.attributes.position.array.slice(),len:c,k:r}}),g=re(new M(10,34,-8),1,2);g.obj.material.color.set(S),o.add(g.obj);const y=new te(T,s),G={...y.arrival(y.list[0],4.5),pitch:-.1};return oe(o,[...w.map(e=>e.o),...I.map(e=>e.m),g.obj]),{name:"moebius",scene:o,octree:H,portals:y,spawn:G,reflection:z,exposure:1,shadowType:Z,fov:62,sky:x,killY:-10,stats:{floats:w.length,banners:I.length},postOpts:{outline:{exclude:[x,g.obj],uniforms:{uThickness:1.25,uInk:S,uInkMix:1,uStrength:1,uDepthK:.025,uNormalK:.35,uFade:[140,420]}},bloom:!1,minScale:.72,grade:{uSat:1,uShadow:0,uHighlight:16777215,uVignette:.08}},update(e,a,u){R.uniforms.uTime.value=a,z.render(o,h,[N]);for(const{o:n,y:c,k:r}of w)n.position.y=c+Math.sin(a*.22+r*1.7)*1.4,n.rotation.y=a*.02*(r%2?1:-1)+r;for(const n of I){const c=n.m.geometry.attributes.position,r=c.array;for(let i=0;i<r.length;i+=3){const l=-n.base[i+1]/n.len;r[i+2]=n.base[i+2]+Math.sin(a*1.6+l*3+n.k)*.35*l*l,r[i]=n.base[i]+Math.sin(a*1.1+l*2+n.k*2)*.12*l}c.needsUpdate=!0}return g.update(a),y.update(e,a,u)}}}export{ve as PRELOAD,xe as createTemple};
