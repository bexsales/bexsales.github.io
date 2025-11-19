import{r as n,as as E,g as w,k as z,at as j,h as C,l as f,_ as u,au as U,i as V,a as F,j as x,b as G,f as K}from"./index-B8l5MPOb.js";let $=0;function W(r){const[e,s]=n.useState(r),t=r||e;return n.useEffect(()=>{e==null&&($+=1,s(`mui-${$}`))},[e]),t}const I=E.useId;function Y(r){if(I!==void 0){const e=I();return r??e}return W(r)}function O({controlled:r,default:e,name:s,state:t="value"}){const{current:o}=n.useRef(r!==void 0),[c,h]=n.useState(e),l=o?r:c,p=n.useCallback(i=>{o||h(i)},[]);return[l,p]}function B(r){return w("MuiCircularProgress",r)}z("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const L=["className","color","disableShrink","size","style","thickness","value","variant"];let m=r=>r,R,D,_,M;const a=44,T=j(R||(R=m`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),Z=j(D||(D=m`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),q=r=>{const{classes:e,variant:s,color:t,disableShrink:o}=r,c={root:["root",s,`color${f(t)}`],svg:["svg"],circle:["circle",`circle${f(s)}`,o&&"circleDisableShrink"]};return K(c,B,e)},A=C("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.root,e[s.variant],e[`color${f(s.color)}`]]}})(({ownerState:r,theme:e})=>u({display:"inline-block"},r.variant==="determinate"&&{transition:e.transitions.create("transform")},r.color!=="inherit"&&{color:(e.vars||e).palette[r.color].main}),({ownerState:r})=>r.variant==="indeterminate"&&U(_||(_=m`
      animation: ${0} 1.4s linear infinite;
    `),T)),H=C("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,e)=>e.svg})({display:"block"}),J=C("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.circle,e[`circle${f(s.variant)}`],s.disableShrink&&e.circleDisableShrink]}})(({ownerState:r,theme:e})=>u({stroke:"currentColor"},r.variant==="determinate"&&{transition:e.transitions.create("stroke-dashoffset")},r.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink&&U(M||(M=m`
      animation: ${0} 1.4s ease-in-out infinite;
    `),Z)),Q=n.forwardRef(function(e,s){const t=V({props:e,name:"MuiCircularProgress"}),{className:o,color:c="primary",disableShrink:h=!1,size:l=40,style:p,thickness:i=3.6,value:g=0,variant:y="indeterminate"}=t,N=F(t,L),d=u({},t,{color:c,disableShrink:h,size:l,thickness:i,value:g,variant:y}),v=q(d),k={},P={},b={};if(y==="determinate"){const S=2*Math.PI*((a-i)/2);k.strokeDasharray=S.toFixed(3),b["aria-valuenow"]=Math.round(g),k.strokeDashoffset=`${((100-g)/100*S).toFixed(3)}px`,P.transform="rotate(-90deg)"}return x.jsx(A,u({className:G(v.root,o),style:u({width:l,height:l},P,p),ownerState:d,ref:s,role:"progressbar"},b,N,{children:x.jsx(H,{className:v.svg,ownerState:d,viewBox:`${a/2} ${a/2} ${a} ${a}`,children:x.jsx(J,{className:v.circle,style:k,ownerState:d,cx:a,cy:a,r:(a-i)/2,fill:"none",strokeWidth:i})})}))}),rr=Q;export{rr as C,Y as a,O as u};
