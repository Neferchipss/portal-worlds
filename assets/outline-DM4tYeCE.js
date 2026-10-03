import{ah as F,ax as _,a7 as U,ay as z,S as x,U as y,a as d,y as b,W as w,v as T,x as N,c as D,H as R,s as E,az as W,n as I,N as P}from"./Capsule-DQaDBPd7.js";class K{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const H=new _(-1,1,1,-1,0,1);class B extends U{constructor(){super(),this.setAttribute("position",new z([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new z([0,2,0,0,2,0],2))}}const q=new B;class C{constructor(e){this._mesh=new F(q,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,H)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class V extends K{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof x?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=y.clone(e.uniforms),this.material=new x({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new C(this.material)}render(e,t,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}function L(v=5,e=8){const t=Math.max(1,Math.min(5,v|0)),s=2/t,a=(s+Math.cos(.58))/Math.sin(.58)**2,r=[],u=new Array(8).fill(0);for(let o=-t;o<=t;o++)for(let h=-t;h<=t;h++){if(h*h+o*o>t*t)continue;const f=new Array(8);for(let c=0;c<2;c++){const l=c?.70710678*(h-o)/t:h/t,p=c?.70710678*(h+o)/t:o/t,k=s-a*l*l,S=s-a*p*p;[p+k,-l+S,-p+k,l+S].forEach((M,A)=>f[c+2*A]=Math.max(0,M)**2)}const g=f.reduce((c,l)=>c+l,0),m=Math.exp(-3.125*(h*h+o*o)/(t*t))/Math.max(g,1e-5);f.forEach((c,l)=>{f[l]=c*m,u[l]+=f[l]}),(o<0||o===0&&h<=0)&&r.push({x:h,y:o,weights:f})}const n=[],i=[];for(const{x:o,y:h,weights:f}of r){const g=o===0&&h===0?.5:1,m=f.map((c,l)=>c/u[l]*g);n.push(new b(...m.slice(0,4))),i.push(new b(...m.slice(4)))}return{uniforms:{...y.clone(O.uniforms),uWeights0:{value:n},uWeights1:{value:i}},vertexShader:O.vertexShader,fragmentShader:`
      uniform sampler2D tSrc; uniform vec2 uTexel; uniform float uHard,uSharp;
      uniform vec4 uWeights0[${r.length}],uWeights1[${r.length}];
      varying vec2 vUv;
      void main(){
        vec3 m[8];float s[8];
        for(int k=0;k<8;k++){m[k]=vec3(0.0);s[k]=0.0;}
        int tap=0;
        for(int y=-${t};y<=0;y++)for(int x=-${t};x<=${t};x++){
          if(x*x+y*y>${t*t} || (y==0 && x>0))continue;
          vec2 offset=vec2(float(x),float(y))*uTexel;
          vec3 c=clamp(texture2D(tSrc,vUv+offset).rgb,0.0,1.0);
          vec3 opposite=(x==0&&y==0)?c:clamp(texture2D(tSrc,vUv-offset).rgb,0.0,1.0);
          float c2=dot(c,c),o2=dot(opposite,opposite);
          vec4 a=uWeights0[tap],b=uWeights1[tap];tap++;
          for(int k=0;k<4;k++){
            m[k]+=c*a[k]+opposite*b[k];s[k]+=c2*a[k]+o2*b[k];
            m[k+4]+=c*b[k]+opposite*a[k];s[k+4]+=c2*b[k]+o2*a[k];
          }
        }
        float a[8],amin=1e30;
        for(int k=0;k<8;k++){a[k]=uHard*1000.0*max(0.0,s[k]-dot(m[k],m[k]));amin=min(amin,a[k]);}
        float sc=1.0/max(1.0,amin);vec3 colour=vec3(0.0);float ws=0.0;
        for(int k=0;k<8;k++){
          float t=a[k]*sc;
          ${e===8?"float t2=t*t;float weight=1.0/(1.0+t2*t2);":"float weight=1.0/(1.0+pow(t,0.5*uSharp));"}
          colour+=m[k]*weight;ws+=weight;
        }
        gl_FragColor=vec4(colour/max(ws,1e-6),1.0);
      }`}}const O={uniforms:{tSrc:{value:null},uTexel:{value:new d},uHard:{value:8},uSharp:{value:8}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`
    #define R RADIUS
    uniform sampler2D tSrc; uniform vec2 uTexel; uniform float uHard, uSharp;
    varying vec2 vUv;
    void main(){
      vec4 m[8]; vec3 s[8];
      for (int k = 0; k < 8; k++) { m[k] = vec4(0.0); s[k] = vec3(0.0); }
      float zeta = 2.0 / float(R), zc = 0.58, sz = sin(zc), eta = (zeta + cos(zc)) / (sz * sz);
      for (int y = -R; y <= R; y++) for (int x = -R; x <= R; x++) {
        vec2 v0 = vec2(float(x), float(y)) / float(R);
        if (dot(v0, v0) > 1.0) continue;
        vec3 c = clamp(texture2D(tSrc, vUv + vec2(float(x), float(y)) * uTexel).rgb, 0.0, 1.0);
        float w[8], z, vxx, vyy, sum = 0.0; vec2 v = v0;
        vxx = zeta - eta * v.x * v.x; vyy = zeta - eta * v.y * v.y;
        z = max(0.0, v.y + vxx);  w[0] = z * z;  z = max(0.0, -v.x + vyy); w[2] = z * z;
        z = max(0.0, -v.y + vxx); w[4] = z * z;  z = max(0.0, v.x + vyy);  w[6] = z * z;
        v = 0.70710678 * vec2(v.x - v.y, v.x + v.y);
        vxx = zeta - eta * v.x * v.x; vyy = zeta - eta * v.y * v.y;
        z = max(0.0, v.y + vxx);  w[1] = z * z;  z = max(0.0, -v.x + vyy); w[3] = z * z;
        z = max(0.0, -v.y + vxx); w[5] = z * z;  z = max(0.0, v.x + vyy);  w[7] = z * z;
        for (int k = 0; k < 8; k++) sum += w[k];
        float g = exp(-3.125 * dot(v0, v0)) / max(sum, 1e-5);
        for (int k = 0; k < 8; k++) { float wk = w[k] * g; m[k] += vec4(c * wk, wk); s[k] += c * c * wk; }
      }
      // weights 1 / (1 + (h * sigma)^q). In busy texture EVERY sector is noisy, all weights underflow and the pixel
      // goes black; so sigma is rescaled by the calmest sector first (a no-op when that one is already calm).
      vec3 mu[8]; float a[8], amin = 1e30;
      for (int k = 0; k < 8; k++) {
        float wsum = max(m[k].w, 1e-6);
        mu[k] = m[k].rgb / wsum;
        vec3 var = abs(s[k] / wsum - mu[k] * mu[k]);
        a[k] = m[k].w > 0.0 ? uHard * 1000.0 * (var.r + var.g + var.b) : 1e30;
        amin = min(amin, a[k]);
      }
      float sc = 1.0 / max(1.0, amin);
      vec3 o = vec3(0.0); float ws = 0.0;
      for (int k = 0; k < 8; k++) {
        float wk = 1.0 / (1.0 + pow(a[k] * sc, 0.5 * uSharp));
        o += mu[k] * wk; ws += wk;
      }
      gl_FragColor = vec4(o / ws, 1.0);
    }`};class ${constructor(e,t){this.targets=[0,1].map(()=>new w(1,1,{type:N,depthBuffer:!1,minFilter:T,magFilter:T})),this.quad=new C(new x({...e,uniforms:y.clone(e.uniforms),depthTest:!1,depthWrite:!1})),t.tFieldA={value:this.targets[0].texture},t.tFieldB={value:this.targets[1].texture},this.width=0,this.height=0}update(e,t,s){if(t===this.width&&s===this.height)return;const a=e.getRenderTarget();this.quad.material.uniforms.uRes.value.set(t,s);for(let r=0;r<2;r++)this.targets[r].setSize(t,s),this.quad.material.uniforms.uField.value=r,e.setRenderTarget(this.targets[r]),this.quad.render(e);e.setRenderTarget(a),this.width=t,this.height=s}dispose(){this.targets.forEach(e=>e.dispose()),this.quad.material.dispose(),this.quad.dispose()}}const j={uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},uRes:{value:new d(1,1)},uNear:{value:.1},uFar:{value:1e3},uThickness:{value:1.6},uInk:{value:new D(2758464)},uInkMix:{value:.7},uStrength:{value:.9},uDepthK:{value:.035},uNormalK:{value:.45},uFade:{value:new d(35,120)},tAO:{value:null},uAOStrength:{value:0},uAOTint:{value:new D(5989544)},uAOCover:{value:.35},uAOFade:{value:new d(40,110)},uAOContrast:{value:new d(.25,.95)}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
    #include <packing>
    uniform sampler2D tDiffuse, tNormal, tDepth, tAO;
    uniform vec2 uRes, uFade, uAOFade, uAOContrast; uniform float uNear, uFar, uThickness, uInkMix, uStrength, uDepthK, uNormalK;
    uniform float uAOStrength, uAOCover;
    uniform vec3 uInk, uAOTint;
    varying vec2 vUv;
    float viewZ(vec2 uv){ return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, uNear, uFar); }
    vec3 nrm(vec2 uv){ return texture2D(tNormal, uv).xyz * 2.0 - 1.0; }
    void main(){
      vec4 base = texture2D(tDiffuse, vUv);
      vec2 px = uThickness / uRes;
      float z0 = viewZ(vUv);
      vec3 n0 = nrm(vUv);
      float dEdge = 0.0, nEdge = 0.0;
      vec2 offs[4]; offs[0] = vec2(px.x, 0.0); offs[1] = vec2(-px.x, 0.0); offs[2] = vec2(0.0, px.y); offs[3] = vec2(0.0, -px.y);
      float zMin = z0;
      for (int i = 0; i < 4; i++) {
        float z = viewZ(vUv + offs[i]);
        zMin = min(zMin, z);
        dEdge = max(dEdge, abs(z - z0) / max(min(z, z0), 0.001));
        nEdge = max(nEdge, 1.0 - dot(n0, nrm(vUv + offs[i])));
      }
      float e = max(smoothstep(uDepthK, uDepthK * 2.0, dEdge), smoothstep(uNormalK, uNormalK + 0.25, nEdge));
      // alpha 0 in the normal buffer = foliage cover (grass): no ink through or around it
      float cover = texture2D(tNormal, vUv).a;
      for (int i = 0; i < 4; i++) cover = min(cover, texture2D(tNormal, vUv + offs[i]).a);
      e *= cover;
      e *= 1.0 - smoothstep(uFade.x, uFade.y, zMin);           // distance fade (nearest side of the edge)
      if (uAOStrength > 0.0) {
        float occ = 1.0 - smoothstep(uAOContrast.x, uAOContrast.y, texture2D(tAO, vUv).r);    // 0 open .. 1 occluded
        occ *= uAOStrength * (1.0 - smoothstep(uAOFade.x, uAOFade.y, z0)) * mix(uAOCover, 1.0, texture2D(tNormal, vUv).a);
        base.rgb *= mix(vec3(1.0), uAOTint, occ);
      }
      vec3 ink = mix(base.rgb * 0.35, uInk, uInkMix);
      gl_FragColor = vec4(mix(base.rgb, ink, e * uStrength), base.a);
    }`};class Z{constructor(e,t,s,a={}){this.renderer=e,this.scene=t,this.camera=s,this.exclude=a.exclude||[];const r=e.getDrawingBufferSize(new d);this.rt=new w(r.x,r.y,{type:R}),this.rt.depthTexture=new E(r.x,r.y),this.rt.depthTexture.type=W,this.depthReuse=a.depthReuse??!0,this.depthReuse&&(this.sceneRT=new w(r.x,r.y,{type:R}),this.sceneRT.depthTexture=this.rt.depthTexture),this._participants=new Set,this._noDepth=new WeakMap,this._discard=new WeakMap,this.normalMat=new I,this.pass=new V(a.shader||j),this.optimized=!!a.shader?.paperCache&&new URLSearchParams(location.search).get("postlegacy")!=="1",this.optimized?new URLSearchParams(location.search).get("papercache")==="0"?this.pass.material.fragmentShader=a.shader.proceduralFragmentShader:(this.paperCache=new $(a.shader.paperCache,this.pass.uniforms),this.pass.material.fragmentShader=a.shader.cachedFragmentShader):a.shader?.legacyFragmentShader&&(this.pass.material.fragmentShader=a.shader.legacyFragmentShader);const u=this.pass.uniforms;u.tNormal.value=this.rt.texture,u.tDepth.value=this.rt.depthTexture,u.uRes.value.copy(r);for(const[n,i]of Object.entries(a.uniforms||{}))u[n].value?.set&&typeof i=="object"?u[n].value.set(...Array.isArray(i)?i:[i]):u[n].value?.set?u[n].value.set(i):u[n].value=i}setSize(e,t){const s=this.renderer.getDrawingBufferSize(new d);this.rt.setSize(s.x,s.y),this.sceneRT?.setSize(s.x,s.y),this.pass.uniforms.uRes.value.copy(s)}suspend(){this.rt.setSize(1,1),this.sceneRT?.setSize(1,1),this.paperCache&&(this.paperCache.targets.forEach(e=>e.setSize(1,1)),this.paperCache.width=this.paperCache.height=0)}_swapIn(){const{renderer:e,scene:t}=this,s={bg:t.background,fog:t.fog,auto:e.shadowMap.autoUpdate,hidden:this.exclude.filter(a=>a.visible),swapped:[]};return s.hidden.forEach(a=>{a.visible=!1}),t.traverseVisible(a=>{if(!(a.isMesh||a.isInstancedMesh)){(a.isSprite||a.isPoints||a.isLine)&&(a.visible=!1,s.hidden.push(a));return}s.swapped.push([a,a.material]);let r=a.userData.outlineMaterial||this.normalMat;r.polygonOffset||Object.assign(r,{polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),a.material.transparent&&(r=this._translucentCover(r)),a.material=r}),t.background=null,t.fog=null,e.shadowMap.autoUpdate=!1,s}_swapOut(e){const{renderer:t,scene:s}=this;s.background=e.bg,s.fog=e.fog;for(const[a,r]of e.swapped)a.material=r;t.shadowMap.autoUpdate=e.auto,e.hidden.forEach(a=>{a.visible=!0})}prepass(){const{renderer:e,scene:t,camera:s}=this;this.paperCache?.update(e,this.rt.width,this.rt.height);const a=this._swapIn();e.setRenderTarget(this.rt),e.setClearColor(8421631,1),e.clear(),e.render(t,s),e.setRenderTarget(null),this._participants.clear();for(const[r]of a.swapped)this._participants.add(r);this._swapOut(a),this.pass.uniforms.uNear.value=s.near,this.pass.uniforms.uFar.value=s.far}_translucentCover(e){let t=this._noDepth.get(e);return t||(t=e.clone(),e.isShaderMaterial&&(t.uniforms=e.uniforms),Object.assign(t,{transparent:!0,depthWrite:!1,blending:P}),this._noDepth.set(e,t)),t}_hasDiscard(e){let t=this._discard.get(e);return t===void 0&&this._discard.set(e,t=e.alphaTest>0||!!e.alphaHash||!!e.isShaderMaterial&&/discard/.test(e.fragmentShader)),t}renderScene(){const{renderer:e,scene:t,camera:s}=this,a=new Map;t.traverseVisible(n=>{if(!(n.isMesh||n.isPoints||n.isSprite||n.isLine)||Array.isArray(n.material))return;const i=n.material,o=this._participants.has(n)?i.depthWrite&&!this._hasDiscard(i):!1;i.depthWrite!==o&&(a.has(i)||a.set(i,i.depthWrite),i.depthWrite=o)});const r=e.autoClearDepth,u=e.autoClearStencil;e.autoClearDepth=!1,e.autoClearStencil=!1,e.setRenderTarget(this.sceneRT),e.render(t,s),e.autoClearDepth=r,e.autoClearStencil=u;for(const[n,i]of a)n.depthWrite=i}precompile(){const{renderer:e,scene:t,camera:s}=this,a=this._swapIn(),r=e.getRenderTarget();e.setRenderTarget(this.rt);const u=e.compileAsync(t,s);return e.setRenderTarget(r),this._swapOut(a),u}}export{C as F,O as K,Z as O,K as P,V as S,L as m};
