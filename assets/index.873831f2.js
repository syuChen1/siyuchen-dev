import{D as o,S as t,P as e,W as n,a,M as s,b as i,c,A as r,T as d,d as l}from"./vendor.671f623d.js";var p=0;const w=new o;w.setDecoderPath("./src/draco/");const u=new t,y=new e(75,window.innerWidth/window.innerHeight,.1,1e3),m=new n({canvas:document.querySelector("#bg")});m.setPixelRatio(window.devicePixelRatio),m.setSize(window.innerWidth,window.innerHeight),y.position.setZ(30),y.position.setX(-3),m.render(u,y);const f=new a(10),g=new s({color:16777215,wireframe:!0}),b=new i(f,g);u.add(b);const x=new c(16777215);x.position.set(5,5,5);const z=new r(16777215,.75);u.add(x,z),Array(200).fill().forEach((function(){const o=new a(.25,24,24),t=new s({color:16777215,opacity:.7,transparent:!0}),e=new i(o,t),[n,c,r]=Array(3).fill().map((()=>l.randFloatSpread(100)));e.position.set(n,c,r),u.add(e)}));const S=(new d).load("/assets/ocean2.ffdb8f21.jpg");u.background=S;const j=(new d).load("/assets/seastar_texture.2d87a241.jpeg");w.load("./src/seastar.drc",(function(o){const t=new s({map:j}),e=new i(o,t);e.scale.multiplyScalar(.03),e.name="seastar",e.position.z=-5,e.position.y=-1,e.position.x=3,u.add(e),2===++p&&document.querySelector("body").classList.toggle("loaded")}),(function(o){console.log(o.loaded/o.total*100+"% loaded")}),(function(o){console.error(o)}));const h=(new d).load("/assets/scallop_texture.d47d12f7.png");function B(){const o=u.getObjectByName("seastar"),t=u.getObjectByName("scallop"),e=document.body.getBoundingClientRect().top;o&&(o.position.z=-.01*e-5,o.position.x=-2e-4*e+3,o.position.y=-1),t&&(t.rotation.x+=.015,t.rotation.y+=.03,t.rotation.z+=.015,e<-3e3&&(t.position.z=-.005*(e+3e3)+17,t.position.x=-2e-4*(e+3e3)-10)),y.position.z=-.01*e,y.position.x=-2e-4*e}w.load("./src/scallop.drc",(function(o){const t=new s({map:h}),e=new i(o,t);e.scale.multiplyScalar(.08),e.name="scallop",e.position.z=17,e.position.y=0,e.position.x=-10,u.add(e),2===++p&&document.querySelector("body").classList.toggle("loaded")}),(function(o){console.log(o.loaded/o.total*100+"% loaded")}),(function(o){console.error(o)})),document.body.onscroll=B,B(),function o(){requestAnimationFrame(o),b.rotation.x+=.001,b.rotation.y+=.001,b.rotation.z+=.001;const t=u.getObjectByName("seastar");t&&(t.rotation.x-=.0017,t.rotation.z+=.009);const e=u.getObjectByName("scallop");e&&(e.rotation.y+=.01),m.render(u,y)}();