import{ai as b,al as Q,am as Y,aj as A,d as P,ac as H,ab as k,n as J,ae as K,l as O,V as y,c as q,af as X,a7 as Z,a8 as B,U as $,as as ee,S as ae,a9 as oe,ao as U,at as te,aa as W,a as ne}from"./Capsule-CAAjHJID.js";import{m as E}from"./portals-CEiaI1ve.js";import{r as F}from"./fx-CRoevLXV.js";const S=(f,o,c)=>new y(f,c,-o),se=new ne(.8,-.35).normalize();function le(f,{seed:o=5,palette:c=null,rope:l=3878712}={}){const n=F(o),d=new b,g=[],s=[];for(const[a,x,D,L,N,R,I,C]of f){const T=S(a,x,D),_=S(L,N,R),z=p=>T.clone().lerp(_,p).add(new y(0,-I*4*p*(1-p),0));g.push(new Q(new Y(Array.from({length:16},(p,M)=>z(M/15))),20,.018,4,!1));const G=_.clone().sub(T).setY(0).normalize();for(let p=0;p<C;p++){const M=(p+.3+n()*.4)/C;s.push({p:z(M),yaw:Math.atan2(-G.z,G.x),w:.5+n()*.55,h:.55+n()*.7,seed:n()})}}d.add(new A(E(g),new P({color:l})));const t=new H(1,1,1,4).translate(0,-.5,0),r={uTime:{value:0}},e=new P({color:16777215,side:k}),u=a=>{a.uniforms.uTime=r.uTime,a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        float hang = -position.y;                                         // 0 at the peg line .. 1 at the hem
        float ph = instanceMatrix[3].x * 0.7 + instanceMatrix[3].z * 0.4;
        transformed.z += (sin(uTime * 1.7 + ph) * 0.22 + sin(uTime * 3.1 + ph * 1.3) * 0.08 + 0.12) * hang * hang;`)};e.onBeforeCompile=u;const i=new J({side:k});i.onBeforeCompile=u;const h=c||[16052196,15262422,11125984,15180186,15848058,10471344,16052196,14197700],m=new K(t,e,s.length),v=new O,w=new X,V=new y,j=new q;return s.forEach((a,x)=>{v.compose(a.p,w.setFromAxisAngle(new y(0,1,0),a.yaw),V.set(a.w,a.h,1)),m.setMatrixAt(x,v),m.setColorAt(x,j.set(h[n()*h.length|0]))}),m.frustumCulled=!1,m.userData.outlineMaterial=i,d.add(m),{group:d,count:s.length,update(a){r.uTime.value=a}}}function ue(f,{perSource:o=14}={}){const c=F(9),l=f.length*o,n=new Float32Array(l*3),d=new Float32Array(l*2);f.forEach(([e,u,i],h)=>{const m=S(e,u,i);for(let v=0;v<o;v++){const w=h*o+v;n.set([m.x,m.y,m.z],w*3),d.set([v/o+c()*.03,c()],w*2)}});const g=new Z;g.setAttribute("position",new B(n,3)),g.setAttribute("aSeed",new B(d,2));const s=$.merge([ee.fog,{uTime:{value:0},uWind:{value:se.clone()},uScale:{value:600},uCol:{value:new q(12036550)}}]),t=new ae({uniforms:s,transparent:!0,depthWrite:!1,fog:!0,vertexShader:`
      #include <common>
      #include <fog_pars_vertex>
      attribute vec2 aSeed; uniform float uTime, uScale; uniform vec2 uWind;
      varying float vAge; varying float vSeed;
      void main(){
        float age = fract(aSeed.x + uTime * 0.045);                    // ~22 s from chimney to gone
        vec3 p = position;
        p.y += age * 7.5;                                               // rises, slowing
        p.xz += uWind * (age * age * 9.0) + vec2(sin(uTime * 0.4 + aSeed.y * 9.0), cos(uTime * 0.35 + aSeed.y * 7.0)) * age * 0.8;
        vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = (0.6 + age * 2.4) * uScale / -mvPosition.z;
        vAge = age; vSeed = aSeed.y;
        #include <fog_vertex>
      }`,fragmentShader:`
      #include <common>
      #include <fog_pars_fragment>
      uniform vec3 uCol; varying float vAge; varying float vSeed;
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
      void main(){
        vec2 q = gl_PointCoord - 0.5;
        float r = length(q) + (n(q * 5.0 + vSeed * 13.0) - 0.5) * 0.22;   // ragged, wet-edged puff
        float a = smoothstep(0.5, 0.36, r) * smoothstep(0.0, 0.12, vAge) * (1.0 - smoothstep(0.45, 1.0, vAge)) * 0.5;
        if (a < 0.01) discard;
        vec3 c = mix(uCol * 0.82, uCol * 1.08, smoothstep(0.4, 0.0, r));    // pooled, darker rim
        gl_FragColor = vec4(c, a);
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`}),r=new oe(g,t);return r.frustumCulled=!1,{obj:r,count:l,update(e,u){s.uTime.value=e,u&&(s.uScale.value=u*.6)}}}function me(f,o){const c=new b,l=[],n=E([new U(.42,.5,.7,12).translate(0,.1,0),new te(.42,.7,12).translate(0,.8,0)]),d=new U(.04,.04,.9,6).translate(0,1.5,0),g=[13781560,15788250].map(t=>o(new W({color:t,name:"buoy"}))),s=o(new W({color:3026484,name:"iron"}));return f.forEach(([t,r,e],u)=>{const i=new b;i.add(new A(n,g[e%2]),new A(d,s)),i.position.copy(S(t,r,0)),i.children.forEach(h=>{h.castShadow=!0}),c.add(i),l.push({g:i,k:u*1.37})}),{group:c,count:l.length,update(t){for(const{g:r,k:e}of l)r.position.y=Math.sin(t*1.1+e)*.12-.15,r.rotation.set(Math.sin(t*.9+e*2.1)*.12,0,Math.cos(t*.8+e)*.1)}}}export{ue as a,me as b,le as m};
