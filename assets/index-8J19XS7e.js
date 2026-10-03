import{c as Y,V as v,l as Q,a as J,al as je,y as Ee,as as ue,ac as de,ae as ne,af as Ce,ad as B,J as X,S as ee,aE as Ie,ab as fe,ah as ge,aj as Ge,a0 as Ue,a1 as be,a3 as Le,a4 as qe,a5 as Ke,Y as He,ak as Ae,P as Ve,am as Je,an as Xe,d as Se,aq as Ze,a7 as $e,ay as Ye}from"./Capsule-DQaDBPd7.js";import{m as Qe,l as ea,O as aa,P as ta,f as oa}from"./portals-CcgGbApM.js";import{r as sa,m as ra,K as na,i as la}from"./fx-Cg1jHl4w.js";import{m as ia,a as ca}from"./life-BkWgVUmY.js";const Pe=`
  float sk_h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  vec2 sk_h2(vec2 p){ return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453); }
  float sk_n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(sk_h(i), sk_h(i + vec2(1, 0)), f.x), mix(sk_h(i + vec2(0, 1)), sk_h(i + vec2(1, 1)), f.x), f.y); }`,Fe=`
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
  }
  // SKETCHY SHADOW FILL (the pano clouds' shading): broad soft grey strokes side by side on a slant, each its own
  // length / pressure, paper-light streaks between them. Returns coverage 0..1; id = per-stroke random.
  float sk_wash1(vec2 t, out float id){                    // t in row units: one row = one stroke's width
    float row = floor(t.y);
    float a = t.x + sk_h(vec2(row, 7.3)) * 40.0;            // along the stroke, rows staggered
    const float SEG = 7.0;                                 // a stroke + its gap, in stroke widths
    float seg = floor(a / SEG);
    vec2 k = vec2(seg, row);
    id = sk_h(k + 11.1);
    float H = SEG * mix(0.3, 0.46, sk_h(k));               // half length: some strokes long, some short
    float c = seg * SEG + SEG * 0.5 + (sk_h(k + 1.9) - 0.5) * (SEG - 2.0 * H);
    float hw = mix(0.36, 0.5, sk_h(k + 5.7));
    float vy = fract(t.y) - 0.5 - (sk_h(k + 3.1) - 0.5) * 0.2 + (sk_n(vec2(a * 0.35, row * 3.7)) - 0.5) * 0.12;
    float dx = max(abs(a - c) - (H - hw), 0.0);             // capsule: rounded marker ends
    float d = length(vec2(dx, vy));
    float aa = fwidth(t.y) * 1.5;
    float cov = 1.0 - smoothstep(hw * 0.55 - aa, hw + aa, d);
    return cov * mix(0.75, 1.0, sk_h(k + 9.2));
  }
  float sk_wash(vec2 fc, float spx, float ang, float seed, out float id){   // fc: pixels; spx: stroke width in px
    float ca = cos(ang), sa = sin(ang);
    vec2 r = vec2(ca * fc.x + sa * fc.y, -sa * fc.x + ca * fc.y) / spx + vec2(seed * 37.1, seed * 11.7);
    float j;
    float l1 = sk_wash1(r, id), l2 = sk_wash1(r + vec2(3.3, 0.5), j) * 0.6;
    return 1.0 - (1.0 - l1) * (1.0 - l2);                  // second layer offset half a stroke: overlaps go darker
  }
  // PENCIL SHADING: thin graphite strokes in short side-by-side runs, like quick tonal hatching. Each stroke has
  // its own threshold, so how many get drawn follows the darkness D (0 = none): light shadow = a few loose strokes,
  // deep shadow / occlusion = dense, and past D 0.55 a second layer crosses the first. t is in stroke-row units.
  float sk_pencil1(vec2 t, float D, vec3 sty){                        // sty: line px, length scale, tremor
    float row = floor(t.y);
    float u = t.x * sty.y + sk_h(vec2(row, 1.7)) * 9.0;
    const float SEG = 3.0;
    float seg = floor(u / SEG), f = u - seg * SEG;
    vec2 k = vec2(seg, row);
    float on = smoothstep(-0.04, 0.04, D - (0.06 + sk_h(k + 2.3) * 0.9));
    float len = SEG * mix(0.4, 0.92, sk_h(k));
    float vy = fract(t.y) - 0.5 + ((sk_h(k + 3.1) - 0.5) * 0.4 + (sk_n(vec2(u * 2.0, row * 3.3)) - 0.5) * 0.3
             + (f / SEG - 0.5) * (sk_h(k + 4.4) - 0.5) * 0.6) * sty.z;
    float ay = fwidth(t.y), ax = fwidth(u);
    float hw = 0.5 * sty.x * ay;
    float cov = 1.0 - smoothstep(hw - 0.5 * ay, hw + 0.5 * ay, abs(vy));
    float ends = smoothstep(0.0, 0.35, f) * (1.0 - smoothstep(len - 0.35, len + ax, f));
    return cov * ends * on * mix(0.45, 1.0, sk_h(k + 7.7));
  }
  float sk_pencil(vec2 p, float D, float spx, float ang, vec3 sty, float cross){            // constant on-screen row spacing, glued to the surface
    if (D <= 0.0) return 0.0;
    float ca = cos(ang), sa = sin(ang);
    vec2 r1 = vec2(ca * p.x + sa * p.y, -sa * p.x + ca * p.y);
    vec2 r2 = vec2(ca * p.x - sa * p.y, sa * p.x + ca * p.y) * 1.07 + 3.1;   // the crossing layer
    float L = log2(max(fwidth(r1.y), 1e-6) * spx);
    float q = exp2(floor(L)), fr = smoothstep(0.2, 0.8, fract(L));
    float D2 = cross > 0.0 ? (D - 0.55) / 0.45 : 0.0;
    float a = max(sk_pencil1(r1 / q, D, sty), sk_pencil1(r2 / q, D2, sty));
    float b = max(sk_pencil1(r1 / (2.0 * q) + 17.0, D, sty), sk_pencil1(r2 / (2.0 * q) + 17.0, D2, sty));
    return mix(a, b, fr);
  }`;function fa(e={}){const d={uInk:{value:new Y(e.ink??1842208)},uBands:{value:new v(e.midEdge??.62,e.shadowEdge??.34,0)},uTone:{value:new J(e.mid??.88,e.shadow??.72)},uCastTone:{value:e.cast??e.mid??.88},uSeed:{value:0},uWash:{value:new v(e.washPx??34,e.washAngle??.42,e.wash??0)},uHatch:{value:new v(e.hatchSpacing??8,e.hatchWidth??1.6,e.hatchAmt??.85)},uMarks:{value:e.marks??1},uStroke:{value:new v(e.strokePx??4.5,e.strokeAngle??.5,e.strokes??0)},uGraphite:{value:new Y(e.graphite??5592668)}},l={plaster:3.2,brick:1.5,cobble:2.2,flag:3},a=function(s,{marks:n=null,hatchScale:i=1}={}){const t=new je({name:s.name,color:s.color.clone(),side:s.side}),r=n?.startsWith("tex:")?n.slice(4):null;return t.onBeforeCompile=o=>{if(Object.assign(o.uniforms,d,{uHatchScale:{value:i}}),r){const h=e.surfaces,g=m=>new Ee(...h?.rects[m]||[0,0,1,1]);Object.assign(o.uniforms,{uSurf:{value:h?.atlas},uSurfR:{value:g(r)},uSurfRB:{value:g("brick")},uSurfM:{value:new J(l[r]||2.5,l.brick)}}),o.defines={...o.defines,SK_TEX:1,...r==="plaster"?{SK_TEX_BRICK:1}:{}}}else n&&(o.defines={...o.defines,["SK_"+n.toUpperCase()]:1});o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vSkP; varying vec3 vSkN;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
          vec4 skTmp = vec4(transformed, 1.0);
          #ifdef USE_INSTANCING
            skTmp = instanceMatrix * skTmp;
          #endif
          vSkP = (modelMatrix * skTmp).xyz;`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
          vSkN = normalize(mat3(modelMatrix) * objectNormal);`),o.fragmentShader=o.fragmentShader.replace("#include <common>",`#include <common>
          varying vec3 vSkP; varying vec3 vSkN;
          uniform vec3 uInk, uBands, uHatch, uStroke, uGraphite; uniform vec2 uTone; uniform float uMarks, uHatchScale, uCastTone, uSeed; uniform vec3 uWash;
          #ifdef SK_TEX
            uniform sampler2D uSurf; uniform vec4 uSurfR, uSurfRB; uniform vec2 uSurfM;
            // a tiling sheet packed in the atlas: wrap inside its rect (the packer's gutter repeats the tile, so the
            // bilinear / mip footprint never sees a neighbour); gradients from the unwrapped coords keep mips right.
            // The atlas is sRGB-decoded: back to the stored grey so lines keep their drawn weight
            float skSurf(vec4 r, vec2 t){
              vec2 s = r.zw - r.xy;
              vec3 c = textureGrad(uSurf, r.xy + fract(t) * s, dFdx(t) * s, dFdy(t) * s).rgb;
              return pow(c.r, 1.0 / 2.2);
            }
          #endif
          ${Pe}
          ${Fe}`).replace("#include <opaque_fragment>",`
          {
            vec3 fill = diffuseColor.rgb;
            float pl = max(dot(fill, vec3(0.299, 0.587, 0.114)), 1e-3);
            float amt = dot(outgoingLight, vec3(0.299, 0.587, 0.114)) / pl;
            float aa = max(fwidth(amt), 1e-3);
            vec3 an = abs(normalize(vSkN));
            vec2 p = an.y > max(an.x, an.z) ? vSkP.xz : (an.x > an.z ? vSkP.zy : vSkP.xy);
            float wId = 0.5, wCov = 0.0;
            if (uWash.z > 0.0) {                                       // strokes get broader with distance (on screen too): far
              float camD = length(cameraPosition - vSkP);              // in screen space at one slant for the whole view
              float wN, wF;                                             // (the pano clouds); far = the broad set
              float cN = sk_wash(gl_FragCoord.xy, uWash.x, uWash.y, uSeed, wId);
              float cF = sk_wash(gl_FragCoord.xy, uWash.x * 1.7, uWash.y, uSeed + 0.5, wF);
              wCov = mix(cN, cF, smoothstep(10.0, 30.0, camD));
            }
            float jit = 0.0;                                           // shadow edges stay where the light puts them
            float mid = 1.0 - smoothstep(uBands.x - aa, uBands.x + aa, amt);
            float shd = 1.0 - smoothstep(uBands.y + jit - aa, uBands.y + jit + aa, amt);
            float skCast = 0.0;                                         // shadowed though facing the sun: a cast shadow
            #if NUM_DIR_LIGHTS > 0
            {                                                         // illustrator's rule: only FORM shadow (turned away from
              float ndl = dot(normalize(normal), directionalLights[0].direction);   // the sun) is hatched; cast shadow
              float away = 1.0 - smoothstep(-0.02, 0.06, ndl);                        // on a lit-facing surface stays a
              skCast = shd * (1.0 - away);
              mid = max(mid, skCast);                                                   // flat mid grey
              shd *= away;
            }
            #endif
            vec3 col = fill * mix(1.0, uTone.x, max(mid - skCast, 0.0));   // light: paper / mid band
            float tC = uCastTone, tF = uTone.y;
            if (uWash.z > 0.0) {                                        // the shadow greys laid down as soft strokes: darker
              float deep = 1.0 - smoothstep(0.02, uBands.y, amt);      // strokes over a lighter wash, lighter toward the edge
              float v = wCov * 0.3 - 0.1 - (1.0 - deep) * 0.03;          // base a little lighter, strokes clearly darker
              tC = clamp(tC - v, 0.0, 1.0); tF = clamp(tF - v, 0.0, 1.0);
            }
            col = mix(col, fill * tC, skCast);                          // shadow: cast, then form (turned away)
            col = mix(col, fill * tF, shd);
            if (uStroke.z > 0.0) {                                       // pencil over the flat greys, density from how DARK it is:
              float dark = 1.0 - smoothstep(0.04, uBands.x, amt);        // light level inside the shadow (soft PCF edges too)
              float D = (skCast * mix(0.05, 0.38, dark) + shd * mix(0.18, 0.5, dark)) * uStroke.z;   // cross layer (D>0.55) only with AO on top   // cast / form shadow; AO adds in the composite
              float far_ = fwidth(vSkP.x) + fwidth(vSkP.z) + fwidth(vSkP.y);
              float pen = sk_pencil(p, D, uStroke.x, uStroke.y, vec3(1.0, 0.22, 1.0), 1.0) * (1.0 - 0.6 * smoothstep(0.03, 0.1, far_));
              col = mix(col, uGraphite * pl, pen * 0.6);
            }
            float ink = shd * sk_lines(dot(p, vec2(0.8, 0.6)), uHatch.x * uHatchScale, uHatch.y) * uHatch.z;
            float far = fwidth(vSkP.x) + fwidth(vSkP.z) + fwidth(vSkP.y);           // world units per pixel
            float near = 1.0 - smoothstep(0.02, 0.07, far);                           // doodle marks only up close
            // ...and only on surfaces that face the viewer: seen edge-on the patterns alias into black swirls
            float facing = abs(dot(normalize(vSkN), normalize(cameraPosition - vSkP)));
            near *= smoothstep(0.28, 0.5, facing);
            #ifdef SK_TEX
            {                                                         // the drawn sheet, world-projected; mips grey it out
              float fadeT = 1.0 - smoothstep(0.035, 0.11, far);        // with distance, then it goes before it can shimmer
              fadeT *= smoothstep(0.2, 0.42, facing);
              vec2 tp = p / uSurfM.x;
              if (an.y > max(an.x, an.z)) tp = tp.yx;                  // floors: any way round; walls: keep up = up
              float line = 1.0 - skSurf(uSurfR, tp);
              #ifdef SK_TEX_BRICK
                float patch_ = smoothstep(0.66, 0.78, sk_n(p * 0.42 + 7.0));   // brick shows through the plaster in places
                line = max(line * (1.0 - patch_), (1.0 - skSurf(uSurfRB, p / uSurfM.y)) * patch_);
              #endif
              ink = max(ink, smoothstep(0.15, 0.7, line) * fadeT * 0.85 * uMarks);
            }
            #endif
            #ifdef SK_COBBLE
            {
              vec2 q = vSkP.xz / vec2(0.42, 0.34);
              float e = sk_cell(q, vec2(0.7));
              float line = 1.0 - smoothstep(0.03, 0.03 + far * 2.6 * 1.4, e);          // pixel footprint, not fwidth(e): e jumps at cell borders -> fat curly clumps
              line *= step(0.18, sk_n(q * 1.7));                                     // leave gaps: drawn, not tiled
              line *= smoothstep(0.75, 0.92, an.y);          // floors only: projected from above, a riser / slab side smears it into blobs
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
          #include <opaque_fragment>`)},t.customProgramCacheKey=()=>"sketch"+(n||""),t};return a.uniforms=d,a}const ua={uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},uRes:{value:new J(1,1)},uNear:{value:.1},uFar:{value:1e3},uTime:{value:0},uInk:{value:new Y(1842208)},uWidth:{value:new J(1.8,3.6)},uInner:{value:.4},uWobble:{value:1.6},uBoil:{value:5},uDepthK:{value:.03},uNormalK:{value:.35},uFade:{value:new J(60,260)},uPaper:{value:new Y(16184817)},uGrain:{value:.06},tAO:{value:null},uAOStrength:{value:0},uAOTint:{value:new Y(9079696)},uAOCover:{value:0},uAOFade:{value:new J(30,80)},uAOContrast:{value:new J(.4,.97)},uProjInv:{value:new Q},uCamWorld:{value:new Q},uStroke:{value:new v(4.5,.5,1)},uGraphite:{value:new Y(5592668)}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
    #include <packing>
    uniform sampler2D tDiffuse, tNormal, tDepth, tAO;
    uniform vec2 uAOFade, uAOContrast; uniform float uAOStrength, uAOCover; uniform vec3 uAOTint, uGraphite, uStroke;
    uniform mat4 uProjInv, uCamWorld;
    uniform vec2 uRes, uWidth, uFade; uniform float uNear, uFar, uTime, uWobble, uBoil, uDepthK, uNormalK, uGrain, uInner;
    uniform vec3 uInk, uPaper;
    varying vec2 vUv;
    ${Pe}
    ${Fe}
    float viewZ(vec2 uv){ return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, uNear, uFar); }
    vec3 nrm(vec2 uv){ return texture2D(tNormal, uv).xyz * 2.0 - 1.0; }
    // silhouettes (depth breaks: an object's outline, also against a bigger object behind it) are drawn with the
    // full pen width r; creases inside one object (normal breaks, same depth) with a thin line r * uInner
    float edgeAt(vec2 uv, float r){
      float nE = 0.0;
      float z0 = viewZ(uv); vec3 n0 = nrm(uv);
      // depth breaks against the plane through the neighbours (second difference), not raw neighbour deltas: a floor
      // or wall seen at a grazing angle changes depth fast but linearly, which read as false edges -> wobbling blobs
      vec2 pd = r / uRes;
      float zR = viewZ(uv + vec2(pd.x, 0.0)), zL = viewZ(uv - vec2(pd.x, 0.0)), zU = viewZ(uv + vec2(0.0, pd.y)), zD = viewZ(uv - vec2(0.0, pd.y));
      float dE = max(abs(zR + zL - 2.0 * z0) / max(min(min(zR, zL), z0), 0.001), abs(zU + zD - 2.0 * z0) / max(min(min(zU, zD), z0), 0.001));
      for (int k = 0; k < 4; k++) {
        vec2 px = max(r * uInner, 0.75) / uRes;
        vec2 o = k == 0 ? vec2(px.x, 0.0) : k == 1 ? vec2(-px.x, 0.0) : k == 2 ? vec2(0.0, px.y) : vec2(0.0, -px.y);
        nE = max(nE, 1.0 - dot(n0, nrm(uv + o)));
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
      float zc = texture2D(tDepth, vUv).x;
      if (uAOStrength > 0.0 && zc < 1.0) {
        float zv = viewZ(vUv);
        vec4 nb = texture2D(tNormal, vUv);
        bool leaf = nb.a < 0.5 && nb.g < 0.02 && nb.b < 0.02;            // leaf card: its own occlusion in r
        float occ = leaf ? nb.r * 0.8 : (1.0 - smoothstep(uAOContrast.x, uAOContrast.y, texture2D(tAO, vUv).r)) * mix(uAOCover, 1.0, nb.a);
        occ *= uAOStrength * (1.0 - smoothstep(uAOFade.x, uAOFade.y, zv));
        base *= mix(vec3(1.0), uAOTint, occ * 0.5);                      // a light graphite tone in the corners...
        vec4 v = uProjInv * vec4(vUv * 2.0 - 1.0, zc * 2.0 - 1.0, 1.0); v /= v.w;
        vec3 wp = (uCamWorld * v).xyz, wn = normalize(mat3(uCamWorld) * (nb.xyz * 2.0 - 1.0));
        vec3 an = abs(wn);
        vec2 p = an.y > max(an.x, an.z) ? wp.xz : (an.x > an.z ? wp.zy : wp.xy);
        if (leaf) p = vec2(dot(wp, normalize(uCamWorld[0].xyz)), wp.y);   // cards face the camera: hatch in their plane
        // ...and ink hatching like the drawn props: short bold dashes (~0.6 of the outline width), one direction,
        // more of them the more occluded
        float pen = uStroke.z > 0.0 ? sk_pencil(p, occ * 2.0, uStroke.x, uStroke.y, vec3(uWidth.x * 0.62 + 0.4, 0.75, 0.35), 0.0) * uStroke.z : 0.0;
        base = mix(base, uInk, pen * 0.85);
      }
      vec3 col = mix(base, uInk, clamp(max(e, ghost), 0.0, 1.0));
      gl_FragColor = vec4(col, 1.0);
    }`},da={hats:0,clocks:1,sweets:2,flowers:3,bakery:4,books:5,cafe:7},va={hats:0,clocks:1,sweets:2,flowers:3,bakery:4,books:5,cafe:6},ha=[9,10,11,9,11,10,10,9];function ma(e,d,l,a,c,s,n,{ink:i=1842208}={}){const t=e.length,r=new ue;r.copy(new de(1,1));const o=new Float32Array(t*4),h=new Float32Array(t*4),g=new Float32Array(t*4),m=new Float32Array(t*4),y=new Float32Array(t*2),k=new Float32Array(t*4),b=new Float32Array(t*4),x=new ne(r,null,t),p=new Q,u=new Ce;return new v(0,1,0),e.forEach(([_,A,z,W,j,P,D,C,R,L,U],F)=>{const w=new v(W,0,-j).normalize();u.setFromUnitVectors(new v(0,0,1),w),p.compose(new v(_,z,-A),u,new v(P,D,1)),x.setMatrixAt(F,p);const M=C!=="home",E=M?va[C]??7:8+R%8,T=M?da[C]??6:ha[E-8],I=c[E]||[0,0,1,1],q=(I[2]-I[0])*.012,K=(I[3]-I[1])*.02;m.set([I[0]+q,I[1]+K,I[2]-q,I[3]-K],F*4);const O=n[E]||[0,0,1,1],ae=(O[2]-O[0])*.015,te=(O[3]-O[1])*.015;k.set([O[0]+ae,O[1]+te,O[2]-ae,O[3]-te],F*4);const oe=l[M?(T+1+R%3)%8:[10,11,9][R%3]]||[0,0,1,1,1];b.set([oe[0],oe[1],oe[2],oe[3]],F*4),y.set([L||P+1.6,U||0],F*2);const V=l[T]||[0,0,1,1,1];h.set([V[0],V[1],V[2],V[3]],F*4);const ve=M?3.2+R%3*.5:2.6+R%4*.35,he=M?.45:.95,le=M?.6:.45;o.set([P,D,ve,V[4]||1],F*4),g.set([M?1:0,R,he,le],F*4)}),r.setAttribute("aSize",new B(o,4)),r.setAttribute("aCard",new B(h,4)),r.setAttribute("aMisc",new B(g,4)),r.setAttribute("aWall",new B(m,4)),r.setAttribute("aRoom",new B(y,2)),r.setAttribute("aSide",new B(k,4)),r.setAttribute("aCard2",new B(b,4)),s.colorSpace=X,a.colorSpace=X,d.colorSpace=X,x.material=new ee({fog:!1,uniforms:{uAtlas:{value:d},uWalls:{value:a},uSides:{value:s},uInk:{value:new Y(i)},uDebug:{value:+(new URLSearchParams(location.search).get("idebug")||0)}},vertexShader:`
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
      }`}),x.frustumCulled=!1,x}function ze(e){const d=e.map(l=>{l.updateMatrixWorld(!0);const a=l.geometry.index?l.geometry.toNonIndexed():l.geometry.clone();for(const c of Object.keys(a.attributes))c!=="position"&&c!=="normal"&&a.deleteAttribute(c);return a.applyMatrix4(l.matrixWorld)});return new ge(Qe(d))}function pe(e,d,l,{sun:a,density:c=5.5,size:s=[.9,1.5],seed:n=17,lift:i=[.12,.37],pick:t=null}={}){const r=sa(n);e.updateMatrixWorld(!0);const o=e.geometry,h=o.attributes.position,g=o.attributes.normal,m=o.index,y=new v,k=new v,b=new v,x=new v,p=new Ie().getNormalMatrix(e.matrixWorld),u=[],_=m?m.count/3:h.count/3;for(let w=0;w<_;w++){const M=m?m.getX(w*3):w*3,E=m?m.getX(w*3+1):w*3+1,T=m?m.getX(w*3+2):w*3+2;y.fromBufferAttribute(h,M).applyMatrix4(e.matrixWorld),k.fromBufferAttribute(h,E).applyMatrix4(e.matrixWorld),b.fromBufferAttribute(h,T).applyMatrix4(e.matrixWorld);let q=new v().subVectors(k,y).cross(new v().subVectors(b,y)).length()*.5*c;for(;q>0&&!(q<1&&r()>q);){q-=1;let K=r(),O=r();K+O>1&&(K=1-K,O=1-O);const ae=y.clone().addScaledVector(new v().subVectors(k,y),K).addScaledVector(new v().subVectors(b,y),O);x.fromBufferAttribute(g,M).applyMatrix3(p).normalize();const te=t?t[r()*t.length|0]:r()*l.length|0;u.push({p:ae.addScaledVector(x,i[0]+r()*(i[1]-i[0])),n:x.clone(),s:s[0]+r()*(s[1]-s[0]),cell:te})}}const A=u.length,z=new ue;z.copy(new de(1,1));const W=new Float32Array(A*4),j=new Float32Array(A),P=new Float32Array(A),D=new Float32Array(A),C=new ne(z,null,A),R=new Q,L=(a||new v(-.38,.88,.28)).clone().normalize();u.forEach((w,M)=>{const E=l[w.cell];R.makeScale(w.s*Math.sqrt(E[4]||1),w.s/Math.sqrt(E[4]||1),1).setPosition(w.p),C.setMatrixAt(M,R),W.set(E.slice(0,4),M*4);const T=w.n.dot(L);j[M]=T>.25?1:T>-.15?.86:.72,P[M]=(r()-.5)*1.2;const I=Math.min(1,Math.max(0,(.15-w.n.y)/.85)),q=Math.min(1,Math.max(0,(.1-T)/.8));D[M]=Math.min(1,.7*I+.4*q+(r()-.5)*.15)}),z.setAttribute("aCell",new B(W,4)),z.setAttribute("aShade",new B(j,1)),z.setAttribute("aRot",new B(P,1)),z.setAttribute("aOcc",new B(D,1)),d.colorSpace=X;const U=`
    attribute vec4 aCell; attribute float aShade, aRot, aOcc;
    varying vec2 vUv; varying float vShade, vOcc;
    void main(){
      vUv = mix(aCell.xy, aCell.zw, uv); vShade = aShade; vOcc = aOcc;
      vec4 mv = modelViewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);          // camera-facing, rolled a little
      vec2 sz = vec2(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz));
      mv.xy += mat2(cos(aRot), -sin(aRot), sin(aRot), cos(aRot)) * (position.xy * sz);
      gl_Position = projectionMatrix * mv;
    }`,F={uMap:{value:d}};return C.material=new ee({uniforms:F,side:fe,fog:!1,vertexShader:U,fragmentShader:`
      uniform sampler2D uMap; varying vec2 vUv; varying float vShade;
      void main(){
        vec4 t = texture2D(uMap, vUv);
        if (t.a < 0.5) discard;
        float ink = 1.0 - smoothstep(0.25, 0.6, dot(t.rgb, vec3(0.333)));             // the drawn pen lines stay black
        vec3 col = mix(vec3(vShade), vec3(0.06), ink);
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }`}),C.userData.outlineMaterial=new ee({side:fe,uniforms:F,vertexShader:U,fragmentShader:"uniform sampler2D uMap; varying vec2 vUv; varying float vOcc; void main(){ if (texture2D(uMap, vUv).a < 0.5) discard; gl_FragColor = vec4(vOcc, 0.0, 0.0, 0.0); }"}),C.frustumCulled=!1,C}const Oe=[1.05,3.1,.95,3.6,.95,1.45,1.05,2.6,2.4,1.05,1,1.9];function pa(e,d,l,a){const c=new Ge,s=new v,n=new v;for(const i of e){const[t,r,o,h,g=0,m=0,y=3.2]=i,k=d[h]||[0,0,1,1,1],b=Oe[h]||1,x=b*(k[4]||1)/2+.06;let p=t,u=-r;const _=!(g||m)||y>=3.1,A=_?0:Math.atan2(-m,g),z=_?Math.PI:y;for(let j=0;j<3;j++){let P=0,D=0;for(let L=0;L<=8;L++){const U=A+(L/8*2-1)*z,F=[Math.cos(U),Math.sin(U)];for(const w of[-1,1])for(const M of[.25,b*.6]){n.set(F[1]*w,0,-F[0]*w),s.set(p,o+M,u),c.set(s,n),c.far=x;const E=c.intersectObjects(a,!1).find(T=>Math.abs(T.face.normal.y)<.5);if(E){const T=x-E.distance;T>0&&(P-=n.x*T,D-=n.z*T)}}}if(!P&&!D)break;const C=Math.hypot(P,D),R=Math.min(C,.6);p+=P/C*R,u+=D/C*R}s.set(p,o+2,u),c.set(s,n.set(0,-1,0)),c.far=4;const W=c.intersectObjects(l,!1)[0];i[0]=p,i[1]=-u,W&&(i[2]=W.point.y-.02)}return e}function xa(e,d,l){const a=e.length,c=new ue;c.copy(new de(1,1).translate(0,.5,0));const s=new Float32Array(a*4),n=new Float32Array(a*2),i=new Float32Array(a*3),t=new ne(c,null,a),r=new Q;e.forEach(([g,m,y,k,b=0,x=0,p=3.2],u)=>{i.set([b,-x,p],u*3);const _=l[k]||[0,0,1,1,1],A=Oe[k]||1;r.makeTranslation(g,y,-m),t.setMatrixAt(u,r),s.set(_.slice(0,4),u*4),n.set([A*(_[4]||1),A],u*2)}),c.setAttribute("aCell",new B(s,4)),c.setAttribute("aSize",new B(n,2)),c.setAttribute("aFace",new B(i,3)),d.colorSpace=X;const o=`
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
    }`,h={uMap:{value:d}};return t.material=new ee({uniforms:h,side:fe,vertexShader:o,fragmentShader:`
      uniform sampler2D uMap; varying vec2 vUv;
      void main(){ vec4 t = texture2D(uMap, vUv); if (t.a < 0.5) discard; gl_FragColor = vec4(t.rgb, 1.0);
        #include <colorspace_fragment>
      }`}),t.userData.outlineMaterial=new ee({side:fe,uniforms:h,vertexShader:o,fragmentShader:"uniform sampler2D uMap; varying vec2 vUv; varying vec3 vN; void main(){ if (texture2D(uMap, vUv).a < 0.5) discard; gl_FragColor = vec4(0.5, 0.5, 1.0, 0.0); }"}),t.frustumCulled=!1,t}const wa=new Set([0,1,2,3,10]);function we(e,d,l,{bottom:a=wa}={}){const c=e.length,s=new ue;s.copy(new de(1,1));const n=new Float32Array(c*4),i=new ne(s,null,c),t=new Q,r=new Ce,o=new v(0,0,1);e.forEach(([m,y,k,b,x,p,u,_],A)=>{const z=new v(b,0,-x).normalize(),W=l[_]||[0,0,1,1,1],j=W[4]||1,P=Math.min(p,u*j),D=P/j;r.setFromUnitVectors(o,z);const C=a.has(_)?k-u/2+D/2:k;t.compose(new v(m,C,-y),r,new v(P,D,1)),i.setMatrixAt(A,t),n.set(W.slice(0,4),A*4)}),s.setAttribute("aCell",new B(n,4)),d.colorSpace=X;const h=`
    attribute vec4 aCell; varying vec2 vUv; varying vec3 vN;
    void main(){ vUv = mix(aCell.xy, aCell.zw, uv); vN = normalize(normalMatrix * mat3(instanceMatrix) * vec3(0.0, 0.0, 1.0));
      gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0); }`,g={uMap:{value:d}};return i.material=new ee({uniforms:g,vertexShader:h,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,fragmentShader:`
      uniform sampler2D uMap; varying vec2 vUv;
      void main(){ vec4 t = texture2D(uMap, vUv); if (t.a < 0.5) discard; gl_FragColor = vec4(t.rgb, 1.0);
        #include <colorspace_fragment>
      }`}),i.userData.outlineMaterial=new ee({uniforms:g,vertexShader:h,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,fragmentShader:"uniform sampler2D uMap; varying vec2 vUv; varying vec3 vN; void main(){ if (texture2D(uMap, vUv).a < 0.5) discard; gl_FragColor = vec4(normalize(vN) * 0.5 + 0.5, 0.0); }"}),i.frustumCulled=!1,i}const ga=["Crumb & Co.","The Rolling Pin","Golden Crust","Madame Brioche","Rise & Shine","The Old Oven","Sourdough & Son","Cafe Noir","The Daily Grind","Le Petit Cup","Steam & Saucer","Moka","Bean There","Dog-Eared Books","The Inkwell","Chapter & Verse","Bookworm","Petal & Stem","Wild Bloom","Rosemary's","The Green Thumb","Bluebell","Tick & Tock","The Hourglass","Old Pendulum","Top Hat & Tails","The Mad Milliner","Bowler Brothers","Felt & Feather","Sugarplum","Gumdrop Corner","The Toffee Tin","Lolly & Pop","The Candy Jar","Pain Perdu","Espresso Bar"],_e={bakery:[0,1,2,3,4,6,34],cafe:[7,8,9,10,11,12,35],books:[13,15,16,14],flowers:[17,18,19,20,21],clocks:[22,23,24],hats:[25,26,27,28],sweets:[29,30,31,32,33]},xe={bakery:5,cafe:7,books:14},ya={bakery:[0,1,14,15],cafe:[2,14,3],books:[4,5,11],flowers:[6,7,3],clocks:[8,9,15],hats:[10,11,3],sweets:[12,13,15]};function ka(e,d,l,a,c){const s=new Set,n=[],i=Object.fromEntries(Object.entries(_e).map(([o,h])=>[o,h.filter(g=>g!==xe[o])]));for(const[o,h,g,m,y,k,b,x,,p]of e){let u=p&&xe[x]!==void 0?xe[x]:(i[x]||[]).find(_=>!s.has(_));u===void 0&&(u=Object.values(_e).flat().find(_=>!s.has(_))??0),s.add(u),n.push([o,h,g,m,y,k,b,u])}const t=d.map(([o,h,g,m,y,k,b,x,p])=>{const u=ya[x]||[3];return[o,h,g,m,y,k,b,u[p%u.length]]}),r=new Set;return{names:n.map(o=>ga[o[7]]),signs:we(n,l,a,{bottom:r}),glass:we(t,l,c,{bottom:r})}}const Oa=["assets/lane.draco.glb","assets/lane_sky.jpg","assets/tex/lane/lane_atlas_etc1s.ktx2","assets/tex/lane/lane_atlas.json","basis/basis_transcoder.js","basis/basis_transcoder.wasm"],ba="etc1s",se=1842208,Me=(e,d,l)=>new v(e,l,-d),Sa=+(new URLSearchParams(location.search).get("pencil")||0),za=[[/^cobble_square/,"tex:flag"],[/^cobble/,"tex:cobble"],[/^roof_tile/,"tiles"],[/^wall_/,"tex:plaster"]];async function Da({manager:e,renderer:d,camera:l}){const a=new Ue,c=await new be(e).loadAsync("assets/lane_sky.jpg");c.colorSpace=X;const s=ra(c,{yaw:0,style:0,lod:0});a.add(s),a.fog=new Le(15921903,80,320);const n=new v(-.38,.88,.28).normalize(),i=new v(0,3,-30);a.add(new qe(16777215,14211288,.9));const t=new Ke(16777215,Math.PI);t.position.copy(i).addScaledVector(n,120),t.target.position.copy(i),t.castShadow=!0,t.shadow.mapSize.set(4096,4096),Object.assign(t.shadow.camera,{left:-60,right:60,top:60,bottom:-60,near:20,far:260}),t.shadow.bias=-5e-4,t.shadow.normalBias=.03,a.add(t,t.target);const o=(await ea(e,"lane")).scene;a.add(o),o.updateMatrixWorld(!0);const h=new be(e),g=new He(e).setResponseType("json"),m=new URLSearchParams(location.search).get("ktx")??ba,y=m!=="0"?new na(e).setTranscoderPath("basis/").detectSupport(d).loadAsync(`assets/tex/lane/lane_atlas_${m}.ktx2`):h.loadAsync("assets/tex/lane/lane_atlas.webp"),[k,b]=await Promise.all([y,g.loadAsync("assets/tex/lane/lane_atlas.json")]);Object.assign(k,{colorSpace:X,anisotropy:Math.min(8,d.capabilities.getMaxAnisotropy())});const x={atlas:k,rects:b.surf},p=fa({ink:se,hatchSpacing:10,hatchWidth:1.3,hatchAmt:0,mid:1,cast:.7,shadow:.62,wash:0,strokes:Sa,surfaces:x}),u=new Map,_=[],A=[];let z={};const W=[],j=[];o.traverse(f=>{const S=f.name;if(S==="terrain_street"&&(z=f.userData),!f.isMesh)return;if(S.startsWith("col_")){f.visible=!1,_.push(f);return}if(S==="portal_return"){A.push({mesh:f,target:"hub",color:13215999,label:"Celestial Plaza"});return}const G=f.material;/^(flowers|leaves)$/.test(G.name||"")&&!/^tree_canopy/.test(S)&&!/^tree_canopy/.test(f.parent?.name||"")&&(G.name==="flowers"?W:j).push(f);const Z=(za.find(([N])=>N.test(G.name||""))||[])[1]||null;u.has(G.uuid)||(/^wall_/.test(G.name||"")&&G.color.setScalar(.97),u.set(G.uuid,p(G,{marks:Z}))),f.material=u.get(G.uuid),f.castShadow=!S.startsWith("terrain_"),f.receiveShadow=!0,S.startsWith("terrain_")&&_.push(f)});const P=[],D=JSON.parse(z.road||"null");if(D){const f=["vehicle_car","vehicle_car","vehicle_van","vehicle_scooter","vehicle_car","vehicle_bus","vehicle_van","vehicle_scooter"].map(H=>o.getObjectByName(H)).filter(Boolean);for(const H of new Set(f))H.visible=!1;const[S,G,Z,N]=D;f.forEach((H,$)=>{const me=$%2?-1:1,re=H.clone();re.visible=!0,re.rotation.set(0,me>0?0:Math.PI,0),re.position.set(0,0,-(me>0?S:G)),a.add(re);const We=H.name.includes("bus")?6:H.name.includes("scooter")?8:9+$%3*1.5;P.push({o:re,dir:me,speed:We,x0:Z,x1:N,off:$/f.length*(N-Z)+$*7.3})})}const C=new Ae;for(const f of _){const S=new ge(f.geometry);S.applyMatrix4(f.matrixWorld),C.add(S)}C.updateMatrixWorld(!0);const R=new aa;R.fromGraphNode(C);const L=ia(JSON.parse(z.laundry||"[]"),{palette:[16777215,15132390,13619151,11842740,15921906],rope:se}),U=ca(JSON.parse(z.chimneys||"[]").filter((f,S)=>S%3===0),{perSource:10});U.obj.material.uniforms.uCol.value.set(12105912);const F=_a(JSON.parse(z.lights||"[]")),w=la(new v(0,22,12),2,5);w.obj.material.color.set(se),a.add(L.group,U.obj,F.group,w.obj);const M=f=>[k,{cells:b.sheets[f]}],[[E,T],[I,q],[K,O],[ae,te],[oe,V],[ve,he]]=["cards","walls","leaves","sides","props","decor"].map(M);a.add(we(JSON.parse(z.decals||"[]"),ve,he.cells));const le=ka(JSON.parse(z.signs||"[]"),JSON.parse(z.glass||"[]"),k,b.sheets.signs,b.sheets.glass);a.add(le.signs,le.glass);const De=_.filter(f=>f.name.startsWith("terrain_")),Te=_.filter(f=>f.name.startsWith("col_")&&f.name!=="col_props");a.add(xa(pa(JSON.parse(z.props||"[]"),V.cells,De,Te),oe,V.cells));const Re=ma(JSON.parse(z.windows||"[]"),E,T.cells,I,q.cells,ae,te.cells,{ink:se});a.add(Re);const ie=o.getObjectByName("tree_canopy_square");let ye=null;if(ie){const f=ie.isMesh?ie:ie.children.find(S=>S.isMesh);ye=pe(f,K,O.cells,{sun:n}),a.add(ye)}const ke={sun:n,size:[.3,.5],lift:[.01,.06],density:40};W.length&&a.add(Object.assign(pe(ze(W),K,O.cells,{...ke,pick:[0,0,5,4],seed:23}),{name:"cards_flowers"})),j.length&&a.add(Object.assign(pe(ze(j),K,O.cells,{...ke,size:[.35,.65],density:24,seed:29}),{name:"cards_pots"}));const ce=new ta(A,i),Ne={...ce.arrival(ce.list[0],4.2),pitch:-.06};oa(a,[w.obj,...P.map(f=>f.o)]);const Be=new J;return{name:"pencil",scene:a,octree:R,portals:ce,spawn:Ne,exposure:1,shadowType:Ve,fov:66,sky:s,killY:-10,stats:{laundry:L.count,bulbs:F.count},postOpts:{outline:{shader:ua,exclude:[s,U.obj,w.obj],uniforms:{uInk:se,uStroke:[7.5,.62,1]}},ao:{strength:1,gtao:{radius:.9}},bloom:!1,minScale:.75,grade:{uSat:1,uShadow:0,uHighlight:16777215,uVignette:.12}},update(f,S,G){p.uniforms.uSeed.value=Math.floor(S*4);const Z=this.post?.outline?.pass.uniforms;Z&&(Z.uTime.value=S);for(const N of P){const H=N.x1-N.x0,$=((N.off+S*N.speed)%H+H)%H;N.o.position.x=N.dir>0?N.x0+$:N.x1-$,N.o.position.y=Math.abs(Math.sin(S*9+N.off))*.015}return L.update(S),U.update(S,d.getDrawingBufferSize(Be).y),w.update(S),ce.update(f,S,G)}}}function _a(e){const d=new Ae,l=[],a=[];for(const[i,t,r,o,h,g,m,y]of e){const k=Me(i,t,r),b=Me(o,h,g),x=p=>k.clone().lerp(b,p).add(new v(0,-m*4*p*(1-p),0));a.push(new Je(new Xe(Array.from({length:12},(p,u)=>x(u/11))),16,.015,4,!1));for(let p=0;p<y;p++)l.push(x((p+.5)/y).add(new v(0,-.12,0)))}if(!l.length)return{group:d,count:0};const c=new ge(a.length>1?Ma(a):a[0],new Se({color:se})),s=new ne(new Ze(.09,10,8),new Se({color:16777215}),l.length),n=new Q;return l.forEach((i,t)=>s.setMatrixAt(t,n.makeTranslation(i.x,i.y,i.z))),d.add(c,s),{group:d,count:l.length}}function Ma(e){let d=0;for(const n of e)d+=n.index.count;const l=[],a=[];let c=0;for(const n of e){l.push(...n.attributes.position.array);for(const i of n.index.array)a.push(i+c);c+=n.attributes.position.count}const s=new $e;return s.setAttribute("position",new Ye(l,3)),s.setIndex(a),s.computeVertexNormals(),s}export{Oa as PRELOAD,Da as createLane};
