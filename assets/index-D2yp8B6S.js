import{c as se,a as te,V as i,ak as ye,ar as le,ac as ce,ae as oe,l as re,af as pe,ad as A,J as Z,S as X,aV as be,ab as ie,a0 as Se,a1 as ue,a3 as ke,a4 as ze,a5 as Me,ai as xe,aj as he,Y as _e,P as Ce,al as Pe,am as Ae,d as de,ap as Fe,a7 as Ne,aR as De}from"./Capsule-CAAjHJID.js";import{l as Re,O as Be,P as Ue,f as Te}from"./portals-CEiaI1ve.js";import{r as We,m as Oe,i as je}from"./fx-CRoevLXV.js";import{m as Ie,a as qe}from"./life-2ElI8OVv.js";const we=`
  float sk_h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  vec2 sk_h2(vec2 p){ return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453); }
  float sk_n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(sk_h(i), sk_h(i + vec2(1, 0)), f.x), mix(sk_h(i + vec2(0, 1)), sk_h(i + vec2(1, 1)), f.x), f.y); }`,Ee=`
  float sk_ink1(float t, float wpx){
    float fw = max(fwidth(t), 1e-5);
    float d = min(fract(t), 1.0 - fract(t)) / fw;
    return 1.0 - smoothstep(wpx * 0.5 - 0.5, wpx * 0.5 + 0.5, d);
  }
  float sk_lines(float t, float spx, float wpx){                 // constant on-screen spacing, glued to the surface
    float L = log2(max(fwidth(t), 1e-6) * spx);
    float q = exp2(floor(L)), f = fract(L);
    return mix(sk_ink1(t / q, wpx), sk_ink1(t / (2.0 * q), wpx), smoothstep(0.2, 0.8, f));
  }
  // distance (world units) to the border of a jittered cell: rounded cobbles / bricks
  float sk_cell(vec2 p, vec2 jitter){
    vec2 i = floor(p), f = fract(p);
    float d1 = 8.0, d2 = 8.0;
    for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(x, y), o = 0.5 + (sk_h2(i + g) - 0.5) * jitter;
      float d = length(g + o - f);
      if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) d2 = d;
    }
    return d2 - d1;                                               // 0 on the border between two cells
  }`;function Le(e={}){const f={uInk:{value:new se(e.ink??1842208)},uBands:{value:new i(e.midEdge??.62,e.shadowEdge??.34,0)},uTone:{value:new te(e.mid??.88,e.shadow??.72)},uHatch:{value:new i(e.hatchSpacing??8,e.hatchWidth??1.6,e.hatchAmt??.85)},uMarks:{value:e.marks??1}};return function(a,{marks:l=null,hatchScale:s=1}={}){const n=new ye({name:a.name,color:a.color.clone(),side:a.side});return n.onBeforeCompile=t=>{Object.assign(t.uniforms,f,{uHatchScale:{value:s}}),l&&(t.defines={...t.defines,["SK_"+l.toUpperCase()]:1}),t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vSkP; varying vec3 vSkN;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
          vec4 skTmp = vec4(transformed, 1.0);
          #ifdef USE_INSTANCING
            skTmp = instanceMatrix * skTmp;
          #endif
          vSkP = (modelMatrix * skTmp).xyz;`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
          vSkN = normalize(mat3(modelMatrix) * objectNormal);`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
          varying vec3 vSkP; varying vec3 vSkN;
          uniform vec3 uInk, uBands, uHatch; uniform vec2 uTone; uniform float uMarks, uHatchScale;
          ${we}
          ${Ee}`).replace("#include <opaque_fragment>",`
          {
            vec3 fill = diffuseColor.rgb;
            float pl = max(dot(fill, vec3(0.299, 0.587, 0.114)), 1e-3);
            float amt = dot(outgoingLight, vec3(0.299, 0.587, 0.114)) / pl;
            float aa = max(fwidth(amt), 1e-3);
            float mid = 1.0 - smoothstep(uBands.x - aa, uBands.x + aa, amt);
            float shd = 1.0 - smoothstep(uBands.y - aa, uBands.y + aa, amt);
            #if NUM_DIR_LIGHTS > 0
            {                                                         // illustrator's rule: only FORM shadow (turned away from
              float ndl = dot(normalize(normal), directionalLights[0].direction);   // the sun) is hatched; cast shadow
              float away = 1.0 - smoothstep(-0.02, 0.06, ndl);                        // on a lit-facing surface stays a
              mid = max(mid, shd * (1.0 - away));                                     // flat mid grey
              shd *= away;
            }
            #endif
            vec3 col = fill * mix(1.0, uTone.x, mid);
            col = mix(col, fill * uTone.y, shd);
            vec3 an = abs(normalize(vSkN));
            vec2 p = an.y > max(an.x, an.z) ? vSkP.xz : (an.x > an.z ? vSkP.zy : vSkP.xy);
            float ink = shd * sk_lines(dot(p, vec2(0.8, 0.6)), uHatch.x * uHatchScale, uHatch.y) * uHatch.z;
            float far = fwidth(vSkP.x) + fwidth(vSkP.z) + fwidth(vSkP.y);           // world units per pixel
            float near = 1.0 - smoothstep(0.02, 0.07, far);                           // doodle marks only up close
            // ...and only on surfaces that face the viewer: seen edge-on the patterns alias into black swirls
            float facing = abs(dot(normalize(vSkN), normalize(cameraPosition - vSkP)));
            near *= smoothstep(0.28, 0.5, facing);
            #ifdef SK_COBBLE
            {
              vec2 q = vSkP.xz / vec2(0.42, 0.34);
              float e = sk_cell(q, vec2(0.7));
              float line = 1.0 - smoothstep(0.03, 0.03 + fwidth(e) * 1.4, e);
              line *= step(0.18, sk_n(q * 1.7));                                     // leave gaps: drawn, not tiled
              ink = max(ink, line * near * 0.8 * uMarks);
            }
            #endif
            #ifdef SK_TILES
            {
              float r = vSkP.y / 0.34;
              float along = (an.x > an.z ? vSkP.z : vSkP.x) / 0.36 + floor(r) * 0.5;
              float row = sk_ink1(r, 1.2) * step(0.35, sk_n(vec2(along * 0.25, floor(r))));
              float tick = sk_ink1(along, 1.2) * (1.0 - smoothstep(0.0, 0.45, fract(r))) * step(0.5, sk_h(vec2(floor(along), floor(r))));
              ink = max(ink, max(row, tick) * near * 0.75 * uMarks);
            }
            #endif
            #ifdef SK_BRICKS
            if (an.y < 0.5) {
              float along = an.x > an.z ? vSkP.z : vSkP.x;
              vec2 q = vec2(along / 0.5, vSkP.y / 0.22);
              q.x += floor(q.y) * 0.5;
              vec2 f = fract(q);
              float b = min(min(f.x, 1.0 - f.x) / max(fwidth(q.x), 1e-4), min(f.y, 1.0 - f.y) / max(fwidth(q.y), 1e-4));
              float line = 1.0 - smoothstep(0.4, 1.2, b);
              float patch_ = smoothstep(0.72, 0.8, sk_n(vec2(along, vSkP.y) * 0.45 + 7.0));   // a few clusters only
              ink = max(ink, line * patch_ * near * 0.7 * uMarks);
            }
            #endif
            #ifdef SK_TICKS
            {
              vec2 q = vSkP.xz / 0.9;
              vec2 c = floor(q), f = fract(q) - 0.5 - (sk_h2(c) - 0.5) * 0.6;
              float on = step(0.7, sk_h(c + 3.1));
              float t1 = 1.0 - smoothstep(0.012, 0.012 + far * 1.2, abs(f.x - f.y * 0.25) ) ;
              t1 *= step(-0.12, f.y) * step(f.y, 0.02);
              ink = max(ink, t1 * on * near * 0.6 * uMarks);
            }
            #endif
            outgoingLight = mix(col, uInk, clamp(ink, 0.0, 1.0));
          }
          #include <opaque_fragment>`)},n.customProgramCacheKey=()=>"sketch"+(l||""),n}}const Ve={uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},uRes:{value:new te(1,1)},uNear:{value:.1},uFar:{value:1e3},uTime:{value:0},uInk:{value:new se(1842208)},uWidth:{value:new te(1.8,3.6)},uInner:{value:.4},uWobble:{value:1.6},uBoil:{value:5},uDepthK:{value:.03},uNormalK:{value:.35},uFade:{value:new te(60,260)},uPaper:{value:new se(16184817)},uGrain:{value:.06}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
    #include <packing>
    uniform sampler2D tDiffuse, tNormal, tDepth;
    uniform vec2 uRes, uWidth, uFade; uniform float uNear, uFar, uTime, uWobble, uBoil, uDepthK, uNormalK, uGrain, uInner;
    uniform vec3 uInk, uPaper;
    varying vec2 vUv;
    ${we}
    float viewZ(vec2 uv){ return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, uNear, uFar); }
    vec3 nrm(vec2 uv){ return texture2D(tNormal, uv).xyz * 2.0 - 1.0; }
    // silhouettes (depth breaks: an object's outline, also against a bigger object behind it) are drawn with the
    // full pen width r; creases inside one object (normal breaks, same depth) with a thin line r * uInner
    float edgeAt(vec2 uv, float r){
      float dE = 0.0, nE = 0.0;
      float z0 = viewZ(uv); vec3 n0 = nrm(uv);
      for (int i = 0; i < 8; i++) {
        float rr = i < 4 ? r : max(r * uInner, 0.75);
        vec2 px = rr / uRes;
        int k = i - (i < 4 ? 0 : 4);
        vec2 o = k == 0 ? vec2(px.x, 0.0) : k == 1 ? vec2(-px.x, 0.0) : k == 2 ? vec2(0.0, px.y) : vec2(0.0, -px.y);
        if (i < 4) { float z = viewZ(uv + o); dE = max(dE, abs(z - z0) / max(min(z, z0), 0.001)); }
        else nE = max(nE, 1.0 - dot(n0, nrm(uv + o)));
      }
      float e = max(smoothstep(uDepthK, uDepthK * 2.0, dE), smoothstep(uNormalK, uNormalK + 0.25, nE) * 0.8);
      return e * texture2D(tNormal, uv).a;
    }
    void main(){
      vec2 fc = vUv * uRes;
      float frame = uBoil > 0.0 ? floor(uTime * uBoil) : 0.0;        // the drawing is re-drawn a few times a second
      vec2 seed = vec2(frame * 17.3, frame * 9.1);
      vec2 wob = (vec2(sk_n(fc * 0.035 + seed), sk_n(fc * 0.035 + seed + 31.0)) - 0.5) * 2.0 * uWobble / uRes;
      vec2 uv = vUv + wob;
      float z = viewZ(uv);
      float fade = smoothstep(uFade.x, uFade.y, z);
      // pen pressure: width swells and thins along the stroke (screen-space noise, re-seeded each redraw)
      float press = sk_n(fc * 0.02 + seed * 0.3);
      float r = mix(uWidth.x, uWidth.y, press) * mix(1.0, 0.55, fade);
      float e = edgeAt(uv, r);
      // a faint second pass slightly off the first: construction lines / overshoot, only in places
      float ghost = edgeAt(vUv + wob * -1.6 + vec2(1.2) / uRes, r * 0.6) * smoothstep(0.62, 0.72, sk_n(fc * 0.006 + seed * 0.1)) * 0.45;
      vec3 base = texture2D(tDiffuse, vUv + wob * 0.35).rgb;
      float grain = sk_n(fc * 0.9) * 0.6 + sk_n(fc * 0.23) * 0.4;
      base *= 1.0 - uGrain * (grain - 0.5);
      vec3 col = mix(base, uInk, clamp(max(e, ghost), 0.0, 1.0));
      gl_FragColor = vec4(col, 1.0);
    }`},Ge={hats:0,clocks:1,sweets:2,flowers:3,bakery:4,books:5,cafe:7},Ke={hats:0,clocks:1,sweets:2,flowers:3,bakery:4,books:5,cafe:6},He=[9,10,11,9,11,10,10,9];function Je(e,f,v,a,l,s,n,{ink:t=1842208}={}){const o=e.length,u=new le;u.copy(new ce(1,1));const w=new Float32Array(o*4),p=new Float32Array(o*4),h=new Float32Array(o*4),k=new Float32Array(o*4),b=new Float32Array(o*2),d=new Float32Array(o*4),C=new Float32Array(o*4),g=new oe(u,null,o),m=new re,x=new pe;return new i(0,1,0),e.forEach(([S,P,W,F,D,R,N,V,B,y,U],z)=>{const G=new i(F,0,-D).normalize();x.setFromUnitVectors(new i(0,0,1),G),m.compose(new i(S,W,-P),x,new i(R,N,1)),g.setMatrixAt(z,m);const O=V!=="home",j=O?Ke[V]??7:8+B%8,q=O?Ge[V]??6:He[j-8],M=l[j]||[0,0,1,1],Y=(M[2]-M[0])*.012,ne=(M[3]-M[1])*.02;k.set([M[0]+Y,M[1]+ne,M[2]-Y,M[3]-ne],z*4);const I=n[j]||[0,0,1,1],K=(I[2]-I[0])*.015,ee=(I[3]-I[1])*.015;d.set([I[0]+K,I[1]+ee,I[2]-K,I[3]-ee],z*4);const E=v[O?(q+1+B%3)%8:[10,11,9][B%3]]||[0,0,1,1,1];C.set([E[0],E[1],E[2],E[3]],z*4),b.set([y||R+1.6,U||0],z*2);const H=v[q]||[0,0,1,1,1];p.set([H[0],H[1],H[2],H[3]],z*4);const fe=O?3.2+B%3*.5:2.6+B%4*.35,r=O?.45:.95,c=O?.6:.45;w.set([R,N,fe,H[4]||1],z*4),h.set([O?1:0,B,r,c],z*4)}),u.setAttribute("aSize",new A(w,4)),u.setAttribute("aCard",new A(p,4)),u.setAttribute("aMisc",new A(h,4)),u.setAttribute("aWall",new A(k,4)),u.setAttribute("aRoom",new A(b,2)),u.setAttribute("aSide",new A(d,4)),u.setAttribute("aCard2",new A(C,4)),s.colorSpace=Z,a.colorSpace=Z,f.colorSpace=Z,g.material=new X({fog:!1,uniforms:{uAtlas:{value:f},uWalls:{value:a},uSides:{value:s},uInk:{value:new se(t)},uDebug:{value:+(new URLSearchParams(location.search).get("idebug")||0)}},vertexShader:`
      attribute vec4 aSize, aCard, aMisc, aWall, aSide, aCard2; attribute vec2 aRoom;
      varying vec3 vPos, vCam; varying vec4 vSize, vCard, vMisc, vWall, vSide, vCard2; varying vec2 vRoom;
      void main(){
        // room space: x right, y up, z INTO the room (the glass is z = 0), in metres
        vPos = vec3(position.x * aSize.x, position.y * aSize.y, 0.0);
        mat4 im = modelMatrix * instanceMatrix;
        vec3 ax = normalize(im[0].xyz), ay = normalize(im[1].xyz), az = normalize(im[2].xyz);
        vec3 rel = cameraPosition - (im * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        vCam = vec3(dot(rel, ax), dot(rel, ay), -dot(rel, az));
        vSize = aSize; vCard = aCard; vMisc = aMisc; vWall = aWall; vRoom = aRoom; vSide = aSide; vCard2 = aCard2;
        gl_Position = projectionMatrix * viewMatrix * im * vec4(position, 1.0);
      }`,fragmentShader:`
      uniform sampler2D uAtlas, uWalls, uSides; uniform vec3 uInk; uniform float uDebug;
      varying vec3 vPos, vCam; varying vec4 vSize, vCard, vMisc, vWall, vSide, vCard2; varying vec2 vRoom;
      float h1(float n){ return fract(sin(n * 91.3458) * 47453.5453); }
      float gPx;                                                            // metres per pixel at the hit, set once in main()
      float line(float d, float wpx){ return 1.0 - smoothstep(wpx * 0.5 - 0.5, wpx * 0.5 + 0.5, abs(d) / gPx); }
      void main(){
        float shop = vMisc.x, v = floor(vMisc.y + 0.5);   // round: interpolation error x the sine hash = per-pixel noise
        vec3 d = normalize(vPos - vCam);
        d.z = max(d.z, 1e-3);
        // the room spans the whole house front (behind the door too), not just the window
        float rx0 = vRoom.y - vRoom.x * 0.5 + 0.2, rx1 = vRoom.y + vRoom.x * 0.5 - 0.2;
        float hw = (rx1 - rx0) * 0.5;
        vec3 lo = vec3(rx0, -vSize.y * 0.5 - vMisc.z, 0.0), hi = vec3(rx1, vSize.y * 0.5 + vMisc.w, vSize.z);
        vec3 tA = (lo - vPos) / d, tB = (hi - vPos) / d;
        vec3 tf = max(tA, tB);
        float t = min(min(tf.x, tf.y), tf.z);
        vec3 p = vPos + d * t;
        // pixel footprint from the smooth ray length (t * pixel angle): derivatives of the hit point itself jump at
        // room corners, and derivatives taken inside per-surface branches are undefined -> speckle
        gPx = max(t * length(fwidth(d)), 1e-4);
        // which surface: 0 back, 1 side, 2 floor, 3 ceiling
        float surf = t == tf.z ? 0.0 : (t == tf.x ? 1.0 : (d.y < 0.0 ? 2.0 : 3.0));
        float r1 = h1(v), r2 = h1(v + 7.1), r3 = h1(v + 13.7);
        float tb = (hi.z - vPos.z) / d.z;
        vec3 pb = vPos + d * tb;
        vec2 buv = vec2((pb.x - lo.x) / (hi.x - lo.x), (pb.y - lo.y) / ((hi.x - lo.x) * 0.5));   // elevations are 2:1
        vec2 bauv = mix(vWall.xy, vWall.zw, clamp(buv, 0.0, 1.0));
        vec4 bw = textureGrad(uWalls, bauv, dFdx(bauv), dFdy(bauv));
        float sxw = d.x > 0.0 ? hi.x : lo.x;
        float ts = (sxw - vPos.x) / (abs(d.x) > 1e-4 ? d.x : 1e-4);
        vec3 ps = vPos + d * ts;
        float su = d.x > 0.0 ? ps.z / vSize.z : 1.0 - ps.z / vSize.z;          // mirrored so both walls read front-to-back
        vec2 suv = vec2(su, (ps.y - lo.y) / vSize.z);                          // square panels, depth x depth
        vec2 sauv = mix(vSide.xy, vSide.zw, clamp(suv, 0.0, 1.0));
        vec4 sw = textureGrad(uSides, sauv, dFdx(sauv), dFdy(sauv));
        vec3 col; float ink = 0.0;
        if (surf == 2.0) {                                                    // floor: boards running into the room
          col = vec3(0.56 + r2 * 0.08);
          ink = max(ink, line(fract(p.x / 0.22 + 0.5) - 0.5, 1.0) * 0.45);
        } else if (surf == 3.0) {
          col = vec3(0.86);
        } else {
          float wall = 0.8 + r1 * 0.1 - (surf == 1.0 ? 0.08 : 0.0);
          col = vec3(wall);
          float along = surf == 0.0 ? p.x : p.z;
          float yf = p.y - lo.y;                                              // height above the floor
          if (r2 > 0.45) {                                                    // wallpaper stripes above a wainscot rail
            if (yf > 0.95) col *= 1.0 - 0.06 * step(0.5, fract(along / (0.18 + r3 * 0.15)));
            else col *= 0.9;
            ink = max(ink, line(yf - 0.95, 1.2) * 0.8);
          }
          if (surf == 0.0 && buv.y < 1.0 && bw.a > 0.5) { col = pow(bw.rgb, vec3(1.0 / 2.2)); ink = 0.0; }
          else if (surf == 1.0 && suv.y < 1.0 && sw.a > 0.5) { col = pow(sw.rgb, vec3(1.0 / 2.2)) * 0.93; ink = 0.0; }
          else if (surf == 0.0 && buv.y < 1.0) {}
          else if (surf == 0.0 && r3 > 0.35) {                                // a framed picture on the back wall
            vec2 c = vec2((r1 - 0.5) * hw, 1.65 - (r2 - 0.5) * 0.3);
            vec2 s = vec2(0.28 + r3 * 0.25, 0.22 + r1 * 0.15);
            vec2 q = abs(vec2(along, yf) - c) - s;
            float inside = step(max(q.x, q.y), 0.0);
            col = mix(col, vec3(0.62 + r2 * 0.25), inside * 0.85);
            ink = max(ink, line(max(q.x, q.y), 1.4));
          }
        }
        // ink where the room's planes meet (distance to the nearest box edge on this face)
        vec3 e = min(p - lo, hi - p);
        float edge = surf == 0.0 ? min(e.x, e.y) : (surf == 1.0 ? min(e.y, e.z) : min(e.x, e.z));
        ink = max(ink, line(edge, 1.8));
        // furniture card standing at mid-depth, on the floor
        float cz = vSize.z * (shop > 0.5 ? 0.72 : 0.66);
        // card uv computed unconditionally: mip selection needs derivatives from uniform control flow
        float tc = (cz - vPos.z) / d.z;
        vec3 pc = vPos + d * tc;
        float ch = shop > 0.5 ? 1.55 : 1.45;                                  // card height (m), width from its aspect
        float cw = ch * vSize.w;
        float side = r1 < 0.5 ? -1.0 : 1.0;                                    // stands to one side, never mid-room
        float cx = vRoom.y + side * max(hw - cw * 0.5 - 0.35, 0.0);
        vec2 uv = vec2((pc.x - cx) / cw + 0.5, (pc.y - lo.y) / ch);
        vec2 auv = mix(vCard.xy, vCard.zw, clamp(uv, 0.0, 1.0));
        vec4 s = textureGrad(uAtlas, auv, dFdx(auv), dFdy(auv));
        {
          if (tc < t) {
            if (uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0) {
              if (s.a > 0.5) { col = pow(s.rgb, vec3(1.0 / 2.2)); ink = 0.0; t = tc; }   // atlas decodes to linear; greys here are sRGB
            }
          }
        }
        {
          float cz2 = vSize.z * 0.32, tc2 = (cz2 - vPos.z) / d.z;
          vec3 pc2 = vPos + d * tc2;
          float ch2 = 1.2, cw2 = ch2 * 0.8;
          float cx2 = vRoom.y - side * max(hw - cw2 * 0.5 - 0.25, 0.0);
          vec2 uv2 = vec2((pc2.x - cx2) / cw2 + 0.5, (pc2.y - lo.y) / ch2);
          vec2 auv2 = mix(vCard2.xy, vCard2.zw, clamp(uv2, 0.0, 1.0));
          vec4 s2 = textureGrad(uAtlas, auv2, dFdx(auv2), dFdy(auv2));
          if (tc2 < t && uv2.x > 0.0 && uv2.x < 1.0 && uv2.y > 0.0 && uv2.y < 1.0 && s2.a > 0.5) { col = pow(s2.rgb, vec3(1.0 / 2.2)); ink = 0.0; t = tc2; }
        }
        col *= mix(1.0, 0.72, clamp(t / (vSize.z * 1.6), 0.0, 1.0));        // rooms darken toward the back
        col = mix(col, uInk, ink);
        // on the glass: curtains / a half-drawn blind for homes, a pale diagonal glint for everyone
        vec2 g = vPos.xy / vSize.xy + 0.5;
        if (shop < 0.5) {
          float open = 0.2 + r2 * 0.18;
          float cur = step(g.x, open) + step(1.0 - open, g.x);
          if (r3 > 0.7) cur = step(1.0 - (0.25 + r1 * 0.35), g.y);          // a roller blind instead
          if (cur > 0.0) {
            float fold = fract(g.x * vSize.x / 0.09);
            col = vec3(0.9 - 0.08 * step(0.5, fold));
          }
        }
        float glint = smoothstep(0.035, 0.0, abs(g.x - g.y * 0.6 - 0.25));
        col = mix(col, vec3(0.97), glint * 0.35);
        gl_FragColor = vec4(pow(col, vec3(2.2)), 1.0);
        if (uDebug == 1.0) gl_FragColor = vec4(fract(p * 2.0), 1.0);
        if (uDebug == 2.0) gl_FragColor = vec4(vec3(surf / 3.0), 1.0);
        if (uDebug == 3.0) gl_FragColor = vec4(vec3(ink), 1.0);                        // greys authored in sRGB
        #include <colorspace_fragment>
      }`}),g.frustumCulled=!1,g}function $e(e,f,v,{sun:a,density:l=5.5,size:s=[.9,1.5],seed:n=17}={}){const t=We(n);e.updateMatrixWorld(!0);const o=e.geometry,u=o.attributes.position,w=o.attributes.normal,p=o.index,h=new i,k=new i,b=new i,d=new i,C=new be().getNormalMatrix(e.matrixWorld),g=[],m=p?p.count/3:u.count/3;for(let y=0;y<m;y++){const U=p?p.getX(y*3):y*3,z=p?p.getX(y*3+1):y*3+1,G=p?p.getX(y*3+2):y*3+2;h.fromBufferAttribute(u,U).applyMatrix4(e.matrixWorld),k.fromBufferAttribute(u,z).applyMatrix4(e.matrixWorld),b.fromBufferAttribute(u,G).applyMatrix4(e.matrixWorld);let j=new i().subVectors(k,h).cross(new i().subVectors(b,h)).length()*.5*l;for(;j>0&&!(j<1&&t()>j);){j-=1;let q=t(),M=t();q+M>1&&(q=1-q,M=1-M);const Y=h.clone().addScaledVector(new i().subVectors(k,h),q).addScaledVector(new i().subVectors(b,h),M);d.fromBufferAttribute(w,U).applyMatrix3(C).normalize(),g.push({p:Y.addScaledVector(d,.12+t()*.25),n:d.clone(),s:s[0]+t()*(s[1]-s[0]),cell:t()*v.length|0})}}const x=g.length,S=new le;S.copy(new ce(1,1));const P=new Float32Array(x*4),W=new Float32Array(x),F=new Float32Array(x),D=new oe(S,null,x),R=new re,N=(a||new i(-.38,.88,.28)).clone().normalize();g.forEach((y,U)=>{const z=v[y.cell];R.makeScale(y.s*Math.sqrt(z[4]||1),y.s/Math.sqrt(z[4]||1),1).setPosition(y.p),D.setMatrixAt(U,R),P.set(z.slice(0,4),U*4);const G=y.n.dot(N);W[U]=G>.25?1:G>-.15?.86:.72,F[U]=(t()-.5)*1.2}),S.setAttribute("aCell",new A(P,4)),S.setAttribute("aShade",new A(W,1)),S.setAttribute("aRot",new A(F,1)),f.colorSpace=Z;const V=`
    attribute vec4 aCell; attribute float aShade, aRot;
    varying vec2 vUv; varying float vShade;
    void main(){
      vUv = mix(aCell.xy, aCell.zw, uv); vShade = aShade;
      vec4 mv = modelViewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);          // camera-facing, rolled a little
      vec2 sz = vec2(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz));
      mv.xy += mat2(cos(aRot), -sin(aRot), sin(aRot), cos(aRot)) * (position.xy * sz);
      gl_Position = projectionMatrix * mv;
    }`,B={uMap:{value:f}};return D.material=new X({uniforms:B,side:ie,fog:!1,vertexShader:V,fragmentShader:`
      uniform sampler2D uMap; varying vec2 vUv; varying float vShade;
      void main(){
        vec4 t = texture2D(uMap, vUv);
        if (t.a < 0.5) discard;
        float ink = 1.0 - smoothstep(0.25, 0.6, dot(t.rgb, vec3(0.333)));             // the drawn pen lines stay black
        vec3 col = mix(vec3(vShade), vec3(0.06), ink);
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }`}),D.userData.outlineMaterial=new X({side:ie,uniforms:B,vertexShader:V,fragmentShader:"uniform sampler2D uMap; varying vec2 vUv; void main(){ if (texture2D(uMap, vUv).a < 0.5) discard; gl_FragColor = vec4(0.5, 1.0, 0.5, 0.0); }"}),D.frustumCulled=!1,D}const Ze=[1.05,3.1,.95,3.6,.95,1.45,1.05,2.6,2.4,1.05,1,1.9];function Xe(e,f,v){const a=e.length,l=new le;l.copy(new ce(1,1).translate(0,.5,0));const s=new Float32Array(a*4),n=new Float32Array(a*2),t=new Float32Array(a*3),o=new oe(l,null,a),u=new re;e.forEach(([h,k,b,d,C=0,g=0,m=3.2],x)=>{t.set([C,-g,m],x*3);const S=v[d]||[0,0,1,1,1],P=Ze[d]||1;u.makeTranslation(h,b,-k),o.setMatrixAt(x,u),s.set(S.slice(0,4),x*4),n.set([P*(S[4]||1),P],x*2)}),l.setAttribute("aCell",new A(s,4)),l.setAttribute("aSize",new A(n,2)),l.setAttribute("aFace",new A(t,3)),f.colorSpace=Z;const w=`
    attribute vec4 aCell; attribute vec2 aSize; attribute vec3 aFace; varying vec2 vUv; varying vec3 vN;
    void main(){
      vUv = mix(aCell.xy, aCell.zw, uv);
      vec3 base = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
      vec3 toCam = cameraPosition - base; toCam.y = 0.0; toCam = normalize(toCam);
      if (dot(aFace.xy, aFace.xy) > 0.0) {                              // turn toward the camera only within +-amax of
        vec2 f = normalize(aFace.xy);                                   // the facing (wall-side props can't swing into walls)
        float a = atan(toCam.x * f.y - toCam.z * f.x, toCam.x * f.x + toCam.z * f.y);
        a = clamp(a, -aFace.z, aFace.z);
        float c = cos(a), s = sin(a);
        toCam = vec3(f.x * c + f.y * s, 0.0, -f.x * s + f.y * c);
      }
      vec3 right = vec3(toCam.z, 0.0, -toCam.x);
      vec3 wp = base + right * position.x * aSize.x + vec3(0.0, position.y * aSize.y, 0.0);
      vN = toCam;
      gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
    }`,p={uMap:{value:f}};return o.material=new X({uniforms:p,side:ie,vertexShader:w,fragmentShader:`
      uniform sampler2D uMap; varying vec2 vUv;
      void main(){ vec4 t = texture2D(uMap, vUv); if (t.a < 0.5) discard; gl_FragColor = vec4(t.rgb, 1.0);
        #include <colorspace_fragment>
      }`}),o.userData.outlineMaterial=new X({side:ie,uniforms:p,vertexShader:w,fragmentShader:"uniform sampler2D uMap; varying vec2 vUv; varying vec3 vN; void main(){ if (texture2D(uMap, vUv).a < 0.5) discard; gl_FragColor = vec4(0.5, 0.5, 1.0, 0.0); }"}),o.frustumCulled=!1,o}const Ye=new Set([0,1,2,3,10]);function Qe(e,f,v){const a=e.length,l=new le;l.copy(new ce(1,1));const s=new Float32Array(a*4),n=new oe(l,null,a),t=new re,o=new pe,u=new i(0,0,1);e.forEach(([h,k,b,d,C,g,m,x],S)=>{const P=new i(d,0,-C).normalize(),W=v[x]||[0,0,1,1,1],F=W[4]||1,D=Math.min(g,m*F),R=D/F;o.setFromUnitVectors(u,P);const N=Ye.has(x)?b-m/2+R/2:b;t.compose(new i(h,N,-k),o,new i(D,R,1)),n.setMatrixAt(S,t),s.set(W.slice(0,4),S*4)}),l.setAttribute("aCell",new A(s,4)),f.colorSpace=Z;const w=`
    attribute vec4 aCell; varying vec2 vUv; varying vec3 vN;
    void main(){ vUv = mix(aCell.xy, aCell.zw, uv); vN = normalize(normalMatrix * mat3(instanceMatrix) * vec3(0.0, 0.0, 1.0));
      gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0); }`,p={uMap:{value:f}};return n.material=new X({uniforms:p,vertexShader:w,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,fragmentShader:`
      uniform sampler2D uMap; varying vec2 vUv;
      void main(){ vec4 t = texture2D(uMap, vUv); if (t.a < 0.5) discard; gl_FragColor = vec4(t.rgb, 1.0);
        #include <colorspace_fragment>
      }`}),n.userData.outlineMaterial=new X({uniforms:p,vertexShader:w,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,fragmentShader:"uniform sampler2D uMap; varying vec2 vUv; varying vec3 vN; void main(){ if (texture2D(uMap, vUv).a < 0.5) discard; gl_FragColor = vec4(normalize(vN) * 0.5 + 0.5, 0.0); }"}),n.frustumCulled=!1,n}const ia=["assets/lane.draco.glb","assets/lane_sky.jpg",...["cards","walls","leaves","sides","props","decor"].flatMap(e=>[`assets/tex/lane/lane_${e}.webp`,`assets/tex/lane/lane_${e}.json`])],Q=1842208,me=(e,f,v)=>new i(e,v,-f),ea=[[/^cobble/,"cobble"],[/^roof_tile/,"tiles"],[/^wall_/,"bricks"]];async function la({manager:e,renderer:f,camera:v}){const a=new Se,l=await new ue(e).loadAsync("assets/lane_sky.jpg");l.colorSpace=Z;const s=Oe(l,{yaw:0,style:0,lod:0});a.add(s),a.fog=new ke(15921903,80,320);const n=new i(-.38,.88,.28).normalize(),t=new i(0,3,-30);a.add(new ze(16777215,14211288,.9));const o=new Me(16777215,Math.PI);o.position.copy(t).addScaledVector(n,120),o.target.position.copy(t),o.castShadow=!0,o.shadow.mapSize.set(4096,4096),Object.assign(o.shadow.camera,{left:-60,right:60,top:60,bottom:-60,near:20,far:260}),o.shadow.bias=-5e-4,o.shadow.normalBias=.03,a.add(o,o.target);const w=(await Re(e,"lane")).scene;a.add(w),w.updateMatrixWorld(!0);const p=Le({ink:Q,hatchSpacing:10,hatchWidth:1.3,hatchAmt:0,mid:.92,shadow:.8}),h=new Map,k=[],b=[];let d={};w.traverse(r=>{const c=r.name;if(c==="terrain_street"&&(d=r.userData),!r.isMesh)return;if(c.startsWith("col_")){r.visible=!1,k.push(r);return}if(c==="portal_return"){b.push({mesh:r,target:"hub",color:13215999,label:"Celestial Plaza"});return}const L=r.material,J=(ea.find(([_])=>_.test(L.name||""))||[])[1]||null;h.has(L.uuid)||h.set(L.uuid,p(L,{marks:J})),r.material=h.get(L.uuid),r.castShadow=!c.startsWith("terrain_"),r.receiveShadow=!0,c.startsWith("terrain_")&&k.push(r)});const C=[],g=JSON.parse(d.road||"null");if(g){const r=["vehicle_car","vehicle_car","vehicle_van","vehicle_scooter","vehicle_car","vehicle_bus","vehicle_van","vehicle_scooter"].map(T=>w.getObjectByName(T)).filter(Boolean);for(const T of new Set(r))T.visible=!1;const[c,L,J,_]=g;r.forEach((T,$)=>{const ve=$%2?-1:1,ae=T.clone();ae.visible=!0,ae.rotation.set(0,ve>0?0:Math.PI,0),ae.position.set(0,0,-(ve>0?c:L)),a.add(ae);const ge=T.name.includes("bus")?6:T.name.includes("scooter")?8:9+$%3*1.5;C.push({o:ae,dir:ve,speed:ge,x0:J,x1:_,off:$/r.length*(_-J)+$*7.3})})}const m=new xe;for(const r of k){const c=new he(r.geometry);c.applyMatrix4(r.matrixWorld),m.add(c)}m.updateMatrixWorld(!0);const x=new Be;x.fromGraphNode(m);const S=Ie(JSON.parse(d.laundry||"[]"),{palette:[16777215,15132390,13619151,11842740,15921906],rope:Q}),P=qe(JSON.parse(d.chimneys||"[]").filter((r,c)=>c%3===0),{perSource:10});P.obj.material.uniforms.uCol.value.set(12105912);const W=aa(JSON.parse(d.lights||"[]")),F=je(new i(0,22,12),2,5);F.obj.material.color.set(Q),a.add(S.group,P.obj,W.group,F.obj);const D=new ue(e),R=new _e(e).setResponseType("json"),N=r=>Promise.all([D.loadAsync(`assets/tex/lane/${r}.webp`),R.loadAsync(`assets/tex/lane/${r}.json`)]),[[V,B],[y,U],[z,G],[O,j],[q,M],[Y,ne]]=await Promise.all([N("lane_cards"),N("lane_walls"),N("lane_leaves"),N("lane_sides"),N("lane_props"),N("lane_decor")]);a.add(Qe(JSON.parse(d.decals||"[]"),Y,ne.cells)),a.add(Xe(JSON.parse(d.props||"[]"),q,M.cells));const I=Je(JSON.parse(d.windows||"[]"),V,B.cells,y,U.cells,O,j.cells,{ink:Q});a.add(I);const K=w.getObjectByName("tree_canopy_square");let ee=null;if(K){const r=K.isMesh?K:K.children.find(c=>c.isMesh);ee=$e(r,z,G.cells,{sun:n}),a.add(ee)}const E=new Ue(b,t),H={...E.arrival(E.list[0],4.2),pitch:-.06};Te(a,[F.obj,...C.map(r=>r.o)]);const fe=new te;return{name:"pencil",scene:a,octree:x,portals:E,spawn:H,exposure:1,shadowType:Ce,fov:66,sky:s,killY:-10,stats:{laundry:S.count,bulbs:W.count},postOpts:{outline:{shader:Ve,exclude:[s,P.obj,F.obj],uniforms:{uInk:Q}},ao:!1,bloom:!1,minScale:.72,grade:{uSat:1,uShadow:0,uHighlight:16777215,uVignette:.12}},update(r,c,L){const J=this.post?.outline?.pass.uniforms;J&&(J.uTime.value=c);for(const _ of C){const T=_.x1-_.x0,$=((_.off+c*_.speed)%T+T)%T;_.o.position.x=_.dir>0?_.x0+$:_.x1-$,_.o.position.y=Math.abs(Math.sin(c*9+_.off))*.015}return S.update(c),P.update(c,f.getDrawingBufferSize(fe).y),F.update(c),E.update(r,c,L)}}}function aa(e){const f=new xe,v=[],a=[];for(const[t,o,u,w,p,h,k,b]of e){const d=me(t,o,u),C=me(w,p,h),g=m=>d.clone().lerp(C,m).add(new i(0,-k*4*m*(1-m),0));a.push(new Pe(new Ae(Array.from({length:12},(m,x)=>g(x/11))),16,.015,4,!1));for(let m=0;m<b;m++)v.push(g((m+.5)/b).add(new i(0,-.12,0)))}if(!v.length)return{group:f,count:0};const l=new he(a.length>1?ta(a):a[0],new de({color:Q})),s=new oe(new Fe(.09,10,8),new de({color:16777215}),v.length),n=new re;return v.forEach((t,o)=>s.setMatrixAt(o,n.makeTranslation(t.x,t.y,t.z))),f.add(l,s),{group:f,count:v.length}}function ta(e){let f=0;for(const n of e)f+=n.index.count;const v=[],a=[];let l=0;for(const n of e){v.push(...n.attributes.position.array);for(const t of n.index.array)a.push(t+l);l+=n.attributes.position.count}const s=new Ne;return s.setAttribute("position",new De(v,3)),s.setIndex(a),s.computeVertexNormals(),s}export{ia as PRELOAD,la as createLane};
