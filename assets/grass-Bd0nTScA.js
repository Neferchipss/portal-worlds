import{c as D,_ as J,a as R,M as Q,D as V,$ as Z,Y as ee,aA as te,a1 as oe,J as ae,av as ie,aa as re,a8 as z,ay as G,ah as L,V as A,ac as Y,ab as C,S as k,ak as ne,ai as se,as as K,ad as P,aB as le,y as ce,U as ue,at as O,a7 as de}from"./Capsule-DQaDBPd7.js";import{K as ve,r as U}from"./fx-Cg1jHl4w.js";import{m as me}from"./portals-CcgGbApM.js";function fe(e,a,r=.5,n=.012){const t=new Uint8Array(1024);for(let i=0;i<256;i++){const p=Q.smoothstep(i/255,r-n,r+n),c=e.clone().lerp(a,p);t.set([c.r*255,c.g*255,c.b*255,255],i*4)}const o=new V(t,256,1);return o.minFilter=o.magFilter=Z,o.needsUpdate=!0,o}const j={uCloudTime:{value:0},uCloudDir:{value:new R(.8,.35)},uCloudAmt:{value:.18}},q=`
  uniform float uCloudTime, uCloudAmt; uniform vec2 uCloudDir;
  float cs_hash(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
  float cs_noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
    return mix(mix(cs_hash(i), cs_hash(i+vec2(1,0)), f.x), mix(cs_hash(i+vec2(0,1)), cs_hash(i+vec2(1,1)), f.x), f.y); }
  float cloudShadow(vec3 wp){
    vec2 p = wp.xz * 0.018 - uCloudDir * uCloudTime * 0.03;
    float n = cs_noise(p) * 0.6 + cs_noise(p * 2.3) * 0.4;
    return 1.0 - uCloudAmt * smoothstep(0.52, 0.58, n);   // crisp-edged anime cloud shadow
  }`;function Te(e={}){const a=fe(new D(e.shadow??10135264),new D(16777215),e.edge??.45),r=new D(e.rimColor??16774368),n={value:e.rim??.35};return function(t,{cloudShadows:o=!0,rim:i,tex:p=null,texScale:c=.4,texTint:s=1,uv:g=!1,normalMap:f=null,normalScale:u=.6,roughMap:d=null,spec:x=.35}={}){const y=g?null:p,v=new J({name:t.name,color:t.color.clone(),map:t.map||null,emissive:t.emissive?t.emissive.clone():new D(0),emissiveIntensity:Math.min(t.emissiveIntensity??1,2),gradientMap:a,transparent:t.transparent,opacity:t.opacity,side:t.side}),_=i===void 0?n:{value:i};p&&v.color.setScalar(s);const h=m=>{const S=m.clone();return S.repeat.set(c,c),S.needsUpdate=!0,S};let b=null;return p&&g&&(v.map=h(p),f&&(v.normalMap=h(f),v.normalScale.set(u,u)),d&&(b=h(d))),v.onBeforeCompile=m=>{m.uniforms.uRimColor={value:r},m.uniforms.uRim=_,y&&(m.uniforms.uTri={value:y},m.uniforms.uTriScale={value:c}),b&&(m.uniforms.uRough={value:b},m.uniforms.uSpec={value:x}),Object.assign(m.uniforms,j),m.vertexShader=m.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vWorldP; varying vec3 vWorldN;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
          vec4 wpTmp = vec4(transformed, 1.0);
          #ifdef USE_INSTANCING
            wpTmp = instanceMatrix * wpTmp;
          #endif
          vWorldP = (modelMatrix * wpTmp).xyz;
          vWorldN = normalize(mat3(modelMatrix) * objectNormal);`),m.fragmentShader=m.fragmentShader.replace("#include <common>",`#include <common>
          uniform vec3 uRimColor; uniform float uRim; varying vec3 vWorldP; varying vec3 vWorldN;
          ${y?"uniform sampler2D uTri; uniform float uTriScale;":""}
          ${q}`).replace("#include <map_fragment>",y?`
          vec3 tw = pow(abs(normalize(vWorldN)), vec3(4.0)); tw /= (tw.x + tw.y + tw.z);
          vec3 tp = vWorldP * uTriScale;
          vec4 triC = texture2D(uTri, tp.zy) * tw.x + texture2D(uTri, tp.xz) * tw.y + texture2D(uTri, tp.xy) * tw.z;
          diffuseColor.rgb *= triC.rgb;`:"#include <map_fragment>").replace("#include <common>",b?`#include <common>
uniform sampler2D uRough; uniform float uSpec;`:"#include <common>").replace("#include <opaque_fragment>",`
          ${b?`
          // stylised specular: one crisp highlight shape, size + strength from the roughness map (toon has no PBR spec)
          #if NUM_DIR_LIGHTS > 0
          {
            float rgh = texture2D(uRough, vMapUv).g;
            vec3 Ld = directionalLights[0].direction;
            vec3 Hh = normalize(Ld + normalize(vViewPosition));
            float nh = max(dot(normal, Hh), 0.0);
            float shin = mix(90.0, 10.0, rgh);
            float spc = smoothstep(0.55, 0.62, pow(nh, shin)) * step(0.0, dot(normal, Ld)) * (1.0 - rgh);
            outgoingLight += directionalLights[0].color * spc * uSpec;
          }
          #endif`:""}
          ${o?"outgoingLight *= cloudShadow(vWorldP);":""}
          float rimF = smoothstep(0.62, 0.72, 1.0 - saturate(dot(normalize(vViewPosition), normal)));
          outgoingLight += uRimColor * rimF * uRim * (0.4 + 0.6 * saturate(normal.y));
          #include <opaque_fragment>`)},v}}let W;async function Ae(e,a){const r=new URLSearchParams(location.search),n=a&&r.get("ktx")!=="0";let l,t;const o=new ee(e).setResponseType("json").loadAsync("assets/tex/atlas.json");if(n)W??=new ve(e).setTranscoderPath("basis/").detectSupport(a),[l,t]=await Promise.all([W.loadAsync("assets/tex/atlas_etc1s.ktx2"),W.loadAsync("assets/tex/atlas_n.ktx2")]),t.colorSpace=te;else{const i=new oe(e);[l,t]=await Promise.all([i.loadAsync("assets/tex/atlas.webp"),i.loadAsync("assets/tex/atlas_n.webp")])}l.colorSpace=ae;for(const i of[l,t])i.anisotropy=8,i.wrapS=i.wrapT=ie;return{meta:await o,map:l,nrm:t}}const pe={size:4096,slot:1024,pad:32,grid:4};function X(e){const a=e.size,r=e.grid;return`
    const float AT_SLOT = ${(e.slot/a).toFixed(6)}, AT_PAD = ${(e.pad/a).toFixed(6)}, AT_INNER = ${((e.slot-2*e.pad)/a).toFixed(6)};
    vec2 atlasTileUv(float idxIn, vec2 tu){
      float idx = floor(idxIn + 0.5);                                     // varyings arrive as 7.9999: round the tile id
      float col = mod(idx, ${r.toFixed(1)}), row = floor(idx / ${r.toFixed(1)});
      vec2 o = vec2(col * AT_SLOT, 1.0 - (row + 1.0) * AT_SLOT);          // flipY: image row 0 = top = v 1
      return o + AT_PAD + fract(tu) * AT_INNER;
    }
    vec4 atlasSample(sampler2D tex, float idx, vec2 tu){
      return textureGrad(tex, atlasTileUv(idx, tu), dFdx(tu) * AT_INNER, dFdy(tu) * AT_INNER);
    }`}function De(e,a){const r=new re({color:16777215}),n=e(r,{cloudShadows:!0});n.vertexColors=!0,n.map=a.map,n.normalMap=a.nrm,n.normalScale.set(1,1);const l=X(a.meta),t=n.onBeforeCompile;return n.onBeforeCompile=(o,i)=>{t(o,i),o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
attribute vec3 aTile; varying vec3 vTile; varying vec2 vTileUv;`).replace("#include <uv_vertex>",`#include <uv_vertex>
vTile = aTile; vTileUv = uv * aTile.y;`),o.fragmentShader=o.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vTile; varying vec2 vTileUv;
${l}`).replace("#include <map_fragment>",`
        vec2 atUv = atlasTileUv(vTile.x, vTileUv);
        vec2 atGx = dFdx(vTileUv) * AT_INNER, atGy = dFdy(vTileUv) * AT_INNER;
        diffuseColor *= textureGrad(map, atUv, atGx, atGy);`).replace("#include <normal_fragment_maps>",`
        vec3 mapN = textureGrad(normalMap, atUv, atGx, atGy).xyz * 2.0 - 1.0;
        mapN.xy *= normalScale * vTile.z;
        normal = normalize(tbn * mapN);`)},n.customProgramCacheKey=()=>"level-atlas",n}function Pe(e,a,{tile:r,scale:n,nScale:l,tint:t}){const o=e.geometry,i=o.attributes.position.count,p=new Float32Array(i*3),c=new Float32Array(i*3);for(let s=0;s<i;s++)p.set([r,n,l],s*3),c.set([t.r,t.g,t.b],s*3);o.setAttribute("aTile",new z(p,3)),o.setAttribute("color",new z(c,3)),e.material=a}function Fe(e,a,r){const n=[];for(const{mesh:t,tile:o,scale:i,nScale:p,tint:c}of e){t.updateWorldMatrix(!0,!1);let s=t.geometry.clone();for(const d of Object.keys(s.attributes))["position","normal","uv"].includes(d)||s.deleteAttribute(d);s.attributes.uv||s.setAttribute("uv",new G(new Float32Array(s.attributes.position.count*2),2)),s.index||s.setIndex([...Array(s.attributes.position.count).keys()]),s.applyMatrix4(t.matrixWorld);const g=s.attributes.position.count,f=new Float32Array(g*3),u=new Float32Array(g*3);for(let d=0;d<g;d++)f.set([o,i,p],d*3),u.set([c.r,c.g,c.b],d*3);s.setAttribute("aTile",new z(f,3)),s.setAttribute("color",new z(u,3)),n.push(s)}const l=new L(me(n,!1),a);return l.name=r,l}const ge={uFieldA:{value:new D(5086011)},uFieldB:{value:new D(6271046)},uFieldTip:{value:new D(12906364)},uFieldShadow:{value:new D(8689626)},uSunDir:{value:new A(0,1,0)},uGrassTex:{value:(()=>{const e=new V(new Uint8Array([255,255,255,255]),1,1);return e.needsUpdate=!0,e})()},uGrassAvg:{value:new A(1,1,1)},uGrassScale:{value:.22},uGrassTile:{value:-1}},$=`
  ${q}
  uniform vec3 uFieldA, uFieldB, uFieldTip, uFieldShadow, uSunDir, uGrassAvg;
  uniform sampler2D uGrassTex; uniform float uGrassScale, uGrassTile;
  ${X(pe)}
  vec3 fieldBase(vec3 wp){                                  // painted meadow patches + painted grass detail
    float n = cs_noise(wp.xz * 0.06) * 0.62 + cs_noise(wp.xz * 0.17 + 3.1) * 0.38;
    vec3 base = mix(uFieldA, uFieldB, smoothstep(0.48, 0.52, n));
    vec3 g = (uGrassTile < 0.0 ? texture2D(uGrassTex, wp.xz * uGrassScale).rgb : atlasSample(uGrassTex, uGrassTile, wp.xz * uGrassScale).rgb) / uGrassAvg;
    return base * mix(vec3(1.0), clamp(g, 0.4, 2.2), 0.5);
  }
  vec3 fieldShade(vec3 c, vec3 wp, vec3 N, float sh){
    float lit = step(-0.1, dot(N, uSunDir)) * step(0.5, sh);
    return mix(c * uFieldShadow, c, lit) * cloudShadow(wp);
  }`,B=`
  float sh = 1.0;
  #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
    DirectionalLightShadow dls = directionalLightShadows[ 0 ];
    sh = getShadow( directionalShadowMap[ 0 ], dls.shadowMapSize, dls.shadowIntensity, dls.shadowBias, dls.shadowRadius, vDirectionalShadowCoord[ 0 ] );
  #endif`;function I(e){const a=new k({fog:!0,lights:!0,uniforms:ue.merge([O.fog,O.lights,e])});return Object.assign(a.uniforms,j,ge),a}function Me(){const e=I({});return e.vertexShader=`
    #include <common>
    #include <fog_pars_vertex>
    #include <shadowmap_pars_vertex>
    varying vec3 vW; varying vec3 vN;
    void main(){
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vW = worldPosition.xyz;
      vN = normalize(mat3(modelMatrix) * normal);
      vec4 mvPosition = viewMatrix * worldPosition;
      gl_Position = projectionMatrix * mvPosition;
      vec3 transformedNormal = normalMatrix * normal;
      #include <shadowmap_vertex>
      #include <fog_vertex>
    }`,e.fragmentShader=`
    #include <common>
    #include <packing>
    #include <fog_pars_fragment>
    #include <shadowmap_pars_fragment>
    ${$}
    varying vec3 vW; varying vec3 vN;
    void main(){
      ${B}
      vec3 c = fieldShade(fieldBase(vW), vW, normalize(vN), sh);
      gl_FragColor = vec4(c, 1.0);
      #include <colorspace_fragment>
      #include <fog_fragment>
    }`,e}function Re(e,a,r,n=1){const l=U(n),t=[],o=new A,i=new A,p=new A,c=new A,s=new A,g=new A;for(const f of e){f.updateWorldMatrix(!0,!1);const u=f.geometry,d=u.attributes.position,x=u.index,y=x?x.count/3:d.count/3;for(let v=0;v<y;v++){const _=x?x.getX(v*3):v*3,h=x?x.getX(v*3+1):v*3+1,b=x?x.getX(v*3+2):v*3+2;o.fromBufferAttribute(d,_).applyMatrix4(f.matrixWorld),i.fromBufferAttribute(d,h).applyMatrix4(f.matrixWorld),p.fromBufferAttribute(d,b).applyMatrix4(f.matrixWorld),c.subVectors(i,o),s.subVectors(p,o),g.crossVectors(c,s);const m=g.length()/2;if(g.normalize(),g.y<0&&g.negate(),g.y<.6)continue;let S=m*a;S=Math.floor(S)+(l()<S%1?1:0);for(let F=0;F<S;F++){let T=l(),M=l();T+M>1&&(T=1-T,M=1-M);const N=o.clone().addScaledVector(c,T).addScaledVector(s,M);r(N)||(N.n=g.clone(),t.push(N))}}}return t}const E=16,H=new URLSearchParams(location.search).get("grasslod")!=="0",w={near:20,mid:65,far:130,keepMid:.3,keepFar:.1},xe=e=>{const a=(r,n,l)=>{const t=Math.min(Math.max((l-r)/(n-r),0),1);return t*t*(3-2*t)};return e<w.mid?1+(w.keepMid-1)*a(w.near,w.mid,e):w.keepMid+(w.keepFar-w.keepMid)*a(w.mid,w.far,e)},he=`
  float lodKeep(float d){
    return d < ${w.mid.toFixed(1)} ? mix(1.0, ${w.keepMid.toFixed(2)}, smoothstep(${w.near.toFixed(1)}, ${w.mid.toFixed(1)}, d))
                        : mix(${w.keepMid.toFixed(2)}, ${w.keepFar.toFixed(2)}, smoothstep(${w.mid.toFixed(1)}, ${w.far.toFixed(1)}, d));
  }`;function ze(e,a={}){const r=U(a.seed??11),n=new Y(1,1,1,4);n.translate(0,.5,0);const l=a.height??.6,t=new Map;for(const f of e){const u=Math.floor(f.x/E)+","+Math.floor(f.z/E);let d=t.get(u);d||t.set(u,d=[]),d.push({p:f,rnd:[.5+r()*.5,r()*Math.PI*2,r(),r()],keep:r()})}const o=I({uTime:{value:0},uPlayer:{value:new A(1e5,0,0)},uWindDir:{value:new R(.85,.5).normalize()},uHeight:{value:a.height??.6},uWidth:{value:a.width??.085},uLodOn:{value:H?1:0}});o.side=C,o.vertexShader=`
    #include <common>
    #include <fog_pars_vertex>
    #include <shadowmap_pars_vertex>
    attribute vec3 iPos; attribute vec3 iNrm; attribute vec4 iRnd; attribute float iKeep;
    uniform float uTime, uHeight, uWidth, uLodOn; uniform vec3 uPlayer; uniform vec2 uWindDir;
    ${he}
    varying float vY; varying vec3 vW; varying vec3 vRoot; varying vec3 vN; varying float vTip;
    float h2(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(h2(i), h2(i+vec2(1,0)), f.x), mix(h2(i+vec2(0,1)), h2(i+vec2(1,1)), f.x), f.y); }
    void main(){
      float y = position.y;
      float camD = distance(iPos, cameraPosition);
      float keep = uLodOn > 0.5 ? lodKeep(camD) : 1.0;
      if (iKeep >= keep) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }   // thinned out: outside clip space
      float h = uHeight * iRnd.x * (1.0 - 0.85 * smoothstep(45.0, 80.0, camD));   // far blades melt into the field
      float w = uWidth * (1.0 - y * 0.85) * (1.0 + smoothstep(15.0, 60.0, camD)) * inversesqrt(keep);  // wider far (less shimmer) + fills thinned gaps
      float ang = iRnd.y;
      vec3 local = vec3(position.x * w, y * h, 0.0);
      local.xz = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * local.xz;
      vec2 wp = iPos.xz * 0.06 - uWindDir * uTime * 0.45;
      float gust = n2(wp) * 0.7 + n2(wp * 3.1 + 7.0) * 0.3;
      float sway = sin(uTime * 2.4 + iRnd.z * 6.28 + iPos.x * 0.3) * 0.08;
      float bend = (0.15 + gust * 0.85) * 0.75 + sway;
      vec3 disp = vec3(uWindDir.x, 0.0, uWindDir.y) * bend * y * y * h;
      vec3 toP = iPos - uPlayer; toP.y = 0.0;
      disp += normalize(toP + 1e-4) * smoothstep(1.3, 0.2, length(toP)) * 0.55 * y * h;
      vec3 world = iPos + local + disp;
      world.y -= length(disp) * 0.35 * y;
      vec4 mvPosition = viewMatrix * vec4(world, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      vY = y; vW = world; vRoot = iPos; vN = iNrm;
      vTip = (1.0 - smoothstep(18.0, 55.0, camD)) * (0.75 + 0.25 * iRnd.w);
      vec4 worldPosition = vec4(world, 1.0);
      vec3 transformedNormal = (viewMatrix * vec4(iNrm, 0.0)).xyz;
      #include <shadowmap_vertex>
      #include <fog_vertex>
    }`,o.fragmentShader=`
    #include <common>
    #include <packing>
    #include <fog_pars_fragment>
    #include <shadowmap_pars_fragment>
    ${$}
    varying float vY; varying vec3 vW; varying vec3 vRoot; varying vec3 vN; varying float vTip;
    void main(){
      ${B}
      vec3 base = fieldBase(vRoot);                           // root = exact ground colour under it
      vec3 c = mix(base, mix(base, uFieldTip, 0.75), pow(vY, 1.4) * vTip);
      c = fieldShade(c, vW, normalize(vN), sh);
      gl_FragColor = vec4(c, 1.0);
      #include <colorspace_fragment>
      #include <fog_fragment>
    }`;const i=o.vertexShader.replace("#include <shadowmap_pars_vertex>","").replace("#include <shadowmap_vertex>","").replace("#include <fog_pars_vertex>","").replace("#include <fog_vertex>",""),p=new k({side:C,uniforms:o.uniforms,vertexShader:i,fragmentShader:"void main(){ gl_FragColor = vec4(0.5, 1.0, 0.5, 0.0); }"}),c=new ne;c.name="grass",c.material=o;const s=[],g=l*1.6+.6;for(const f of t.values()){f.sort((m,S)=>m.keep-S.keep);const u=f.length,d=new Float32Array(u*3),x=new Float32Array(u*3),y=new Float32Array(u*4),v=new Float32Array(u),_=new se;f.forEach(({p:m,rnd:S,keep:F},T)=>{d.set([m.x,m.y,m.z],T*3),x.set([m.n.x,m.n.y,m.n.z],T*3),y.set(S,T*4),v[T]=F,_.expandByPoint(m)});const h=new K;h.index=n.index,h.attributes.position=n.attributes.position,h.attributes.uv=n.attributes.uv,h.setAttribute("iPos",new P(d,3)),h.setAttribute("iNrm",new P(x,3)),h.setAttribute("iRnd",new P(y,4)),h.setAttribute("iKeep",new P(v,1)),h.instanceCount=u,_.expandByScalar(g),h.boundingBox=_,h.boundingSphere=_.getBoundingSphere(new le);const b=new L(h,o);b.receiveShadow=!0,b.userData.outlineMaterial=p,c.add(b),s.push({geo:h,box:_,n:u,keeps:v})}return c.update=f=>{if(H)for(const u of s){const d=xe(u.box.distanceToPoint(f));let x=0,y=u.n;for(;x<y;){const v=x+y>>1;u.keeps[v]<d?x=v+1:y=v}u.geo.instanceCount=x}},c.chunks=s.length,c}const we=[{h:1,w:.9},{h:.6,w:.9},{h:1.3,w:1.5},{h:1.3,w:1.5},{h:.65,w:.8},{h:.6,w:.8},{h:1.25,w:.9},{h:1,w:1.1}];function Ce(e,a,r){const n=U(13),l=new Y(1,1);l.translate(0,.5,0);const t=l.clone().rotateY(Math.PI/2),o=ye(l,t),i=new K;i.index=o.index,i.attributes.position=o.attributes.position,i.attributes.uv=o.attributes.uv;const p=e.length,c=new Float32Array(p*3),s=new Float32Array(p*4);e.forEach(({p:d,type:x},y)=>{const v=we[x],_=.8+n()*.45;c.set([d.x,d.y-.05,d.z],y*3),s.set([x,v.w*_,v.h*_,n()*Math.PI],y*4)}),i.setAttribute("iPos",new P(c,3)),i.setAttribute("iDat",new P(s,4)),i.instanceCount=p;const g=I({uTime:{value:0},uWindDir:{value:new R(.85,.5).normalize()},uSheet:{value:a},uRegion:{value:new ce(...r.slice(0,4))},uCR:{value:new R(r[4],r[5])}});g.side=C;const f=`
    #include <common>
    #include <fog_pars_vertex>
    #include <shadowmap_pars_vertex>
    attribute vec3 iPos; attribute vec4 iDat;
    uniform float uTime; uniform vec2 uWindDir; uniform vec4 uRegion; uniform vec2 uCR;
    varying vec2 vUv; varying vec3 vW; varying float vY;
    float h2(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(h2(i), h2(i+vec2(1,0)), f.x), mix(h2(i+vec2(0,1)), h2(i+vec2(1,1)), f.x), f.y); }
    void main(){
      float ty = iDat.x, col = mod(ty, uCR.x), row = floor(ty / uCR.x);
      vec2 cell = (uRegion.zw - uRegion.xy) / uCR;
      vUv = uRegion.xy + vec2(col, uCR.y - 1.0 - row) * cell + uv * cell;
      vec3 local = vec3(position.x * iDat.y, position.y * iDat.z, position.z * iDat.y);
      float c = cos(iDat.w), s = sin(iDat.w);
      local.xz = mat2(c, -s, s, c) * local.xz;
      vec2 wp = iPos.xz * 0.06 - uWindDir * uTime * 0.45;
      float gust = n2(wp) * 0.7 + n2(wp * 3.1 + 7.0) * 0.3;
      float y = position.y;
      local.xz += uWindDir * (0.1 + gust * 0.35) * y * y * iDat.z * 0.6 + sin(uTime * 2.1 + iPos.x) * 0.03 * y;
      vec3 world = iPos + local;
      vec4 mvPosition = viewMatrix * vec4(world, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      vW = world; vY = y;
      vec4 worldPosition = vec4(world, 1.0);
      vec3 transformedNormal = (viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz;
      #include <shadowmap_vertex>
      #include <fog_vertex>
    }`;g.vertexShader=f,g.fragmentShader=`
    #include <common>
    #include <packing>
    #include <fog_pars_fragment>
    #include <shadowmap_pars_fragment>
    ${$}
    uniform sampler2D uSheet;
    varying vec2 vUv; varying vec3 vW; varying float vY;
    void main(){
      vec4 t = texture2D(uSheet, vUv);
      if (t.a < 0.5) discard;
      ${B}
      vec3 c = fieldShade(t.rgb, vW, vec3(0.0, 1.0, 0.0), sh);
      c *= 0.82 + 0.18 * vY;                                      // a touch darker at the roots, sits into the grass
      gl_FragColor = vec4(c, 1.0);
      #include <colorspace_fragment>
      #include <fog_fragment>
    }`;const u=new L(i,g);return u.frustumCulled=!1,u.receiveShadow=!0,u.userData.outlineMaterial=new k({side:C,uniforms:g.uniforms,vertexShader:f.replace("#include <shadowmap_pars_vertex>","").replace("#include <shadowmap_vertex>","").replace("#include <fog_pars_vertex>","").replace("#include <fog_vertex>",""),fragmentShader:"uniform sampler2D uSheet; varying vec2 vUv; void main(){ if (texture2D(uSheet, vUv).a < 0.5) discard; gl_FragColor = vec4(0.5, 1.0, 0.5, 0.0); }"}),u}function ye(e,a){const r=new de,n=e.attributes.position.array,l=a.attributes.position.array,t=e.attributes.uv.array,o=a.attributes.uv.array;r.setAttribute("position",new G([...n,...l],3)),r.setAttribute("uv",new G([...t,...o],2));const i=e.attributes.position.count;return r.setIndex([...e.index.array,...Array.from(a.index.array,p=>p+i)]),r}export{Me as a,De as b,Pe as c,Fe as d,ze as e,ge as f,Ce as g,j as h,Ae as l,Te as m,Re as s};
