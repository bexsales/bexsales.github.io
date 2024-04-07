import{r as i,aq as he,a as ne,g as re,s as _,b as x,u as ie,_ as k,j as F,ar as be,d as ae,e as le,as as ge,at as Se,an as Z,K as Me,au as Pe,F as ve,av as xe,l as Ce,R as ee}from"./index-d3e5ebce.js";var o={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Q=Symbol.for("react.element"),X=Symbol.for("react.portal"),j=Symbol.for("react.fragment"),N=Symbol.for("react.strict_mode"),K=Symbol.for("react.profiler"),U=Symbol.for("react.provider"),z=Symbol.for("react.context"),we=Symbol.for("react.server_context"),A=Symbol.for("react.forward_ref"),H=Symbol.for("react.suspense"),O=Symbol.for("react.suspense_list"),V=Symbol.for("react.memo"),G=Symbol.for("react.lazy"),Ie=Symbol.for("react.offscreen"),ue;ue=Symbol.for("react.module.reference");function g(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case Q:switch(e=e.type,e){case j:case K:case N:case H:case O:return e;default:switch(e=e&&e.$$typeof,e){case we:case z:case A:case G:case V:case U:return e;default:return t}}case X:return t}}}o.ContextConsumer=z;o.ContextProvider=U;o.Element=Q;o.ForwardRef=A;o.Fragment=j;o.Lazy=G;o.Memo=V;o.Portal=X;o.Profiler=K;o.StrictMode=N;o.Suspense=H;o.SuspenseList=O;o.isAsyncMode=function(){return!1};o.isConcurrentMode=function(){return!1};o.isContextConsumer=function(e){return g(e)===z};o.isContextProvider=function(e){return g(e)===U};o.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===Q};o.isForwardRef=function(e){return g(e)===A};o.isFragment=function(e){return g(e)===j};o.isLazy=function(e){return g(e)===G};o.isMemo=function(e){return g(e)===V};o.isPortal=function(e){return g(e)===X};o.isProfiler=function(e){return g(e)===K};o.isStrictMode=function(e){return g(e)===N};o.isSuspense=function(e){return g(e)===H};o.isSuspenseList=function(e){return g(e)===O};o.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===j||e===K||e===N||e===H||e===O||e===Ie||typeof e=="object"&&e!==null&&(e.$$typeof===G||e.$$typeof===V||e.$$typeof===U||e.$$typeof===z||e.$$typeof===A||e.$$typeof===ue||e.getModuleId!==void 0)};o.typeOf=g;let te=0;function Re(e){const[t,s]=i.useState(e),p=e||t;return i.useEffect(()=>{t==null&&(te+=1,s(`mui-${te}`))},[t]),p}const se=he["useId".toString()];function Je(e){if(se!==void 0){const t=se();return e??t}return Re(e)}function Qe({controlled:e,default:t,name:s,state:p="value"}){const{current:u}=i.useRef(e!==void 0),[m,c]=i.useState(t),r=u?e:m,y=i.useCallback(b=>{u||c(b)},[]);return[r,y]}function Le(e){return re("MuiList",e)}const $e=ne("MuiList",["root","padding","dense","subheader"]),Xe=$e,Fe=["children","className","component","dense","disablePadding","subheader"],Ee=e=>{const{classes:t,disablePadding:s,dense:p,subheader:u}=e;return le({root:["root",!s&&"padding",p&&"dense",u&&"subheader"]},Le,t)},De=_("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,!s.disablePadding&&t.padding,s.dense&&t.dense,s.subheader&&t.subheader]}})(({ownerState:e})=>x({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Te=i.forwardRef(function(t,s){const p=ie({props:t,name:"MuiList"}),{children:u,className:m,component:c="ul",dense:r=!1,disablePadding:y=!1,subheader:b}=p,P=k(p,Fe),v=i.useMemo(()=>({dense:r}),[r]),C=x({},p,{component:c,dense:r,disablePadding:y}),h=Ee(C);return F.jsx(be.Provider,{value:v,children:F.jsxs(De,x({as:c,className:ae(h.root,m),ref:s,ownerState:C},P,{children:[b,u]}))})}),ke=Te,_e=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function J(e,t,s){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:s?null:e.firstChild}function oe(e,t,s){return e===t?s?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:s?null:e.lastChild}function ce(e,t){if(t===void 0)return!0;let s=e.innerText;return s===void 0&&(s=e.textContent),s=s.trim().toLowerCase(),s.length===0?!1:t.repeating?s[0]===t.keys[0]:s.indexOf(t.keys.join(""))===0}function $(e,t,s,p,u,m){let c=!1,r=u(e,t,t?s:!1);for(;r;){if(r===e.firstChild){if(c)return!1;c=!0}const y=p?!1:r.disabled||r.getAttribute("aria-disabled")==="true";if(!r.hasAttribute("tabindex")||!ce(r,m)||y)r=u(e,r,s);else return r.focus(),!0}return!1}const je=i.forwardRef(function(t,s){const{actions:p,autoFocus:u=!1,autoFocusItem:m=!1,children:c,className:r,disabledItemsFocusable:y=!1,disableListWrap:b=!1,onKeyDown:P,variant:v="selectedMenu"}=t,C=k(t,_e),h=i.useRef(null),W=i.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});ge(()=>{u&&h.current.focus()},[u]),i.useImperativeHandle(p,()=>({adjustStyleForScrollbar:(n,a)=>{const d=!h.current.style.width;if(n.clientHeight<h.current.clientHeight&&d){const S=`${Se(Z(n))}px`;h.current.style[a.direction==="rtl"?"paddingLeft":"paddingRight"]=S,h.current.style.width=`calc(100% + ${S})`}return h.current}}),[]);const E=n=>{const a=h.current,d=n.key,S=Z(a).activeElement;if(d==="ArrowDown")n.preventDefault(),$(a,S,b,y,J);else if(d==="ArrowUp")n.preventDefault(),$(a,S,b,y,oe);else if(d==="Home")n.preventDefault(),$(a,null,b,y,J);else if(d==="End")n.preventDefault(),$(a,null,b,y,oe);else if(d.length===1){const l=W.current,w=d.toLowerCase(),I=performance.now();l.keys.length>0&&(I-l.lastTime>500?(l.keys=[],l.repeating=!0,l.previousKeyMatched=!0):l.repeating&&w!==l.keys[0]&&(l.repeating=!1)),l.lastTime=I,l.keys.push(w);const q=S&&!l.repeating&&ce(S,l);l.previousKeyMatched&&(q||$(a,S,!1,y,J,l))?n.preventDefault():l.previousKeyMatched=!1}P&&P(n)},R=Me(h,s);let f=-1;i.Children.forEach(c,(n,a)=>{if(!i.isValidElement(n)){f===a&&(f+=1,f>=c.length&&(f=-1));return}n.props.disabled||(v==="selectedMenu"&&n.props.selected||f===-1)&&(f=a),f===a&&(n.props.disabled||n.props.muiSkipListHighlight||n.type.muiSkipListHighlight)&&(f+=1,f>=c.length&&(f=-1))});const L=i.Children.map(c,(n,a)=>{if(a===f){const d={};return m&&(d.autoFocus=!0),n.props.tabIndex===void 0&&v==="selectedMenu"&&(d.tabIndex=0),i.cloneElement(n,d)}return n});return F.jsx(ke,x({role:"menu",ref:R,className:r,onKeyDown:E,tabIndex:u?0:-1},C,{children:L}))}),Ne=je;function Ke(e){return re("MuiMenu",e)}ne("MuiMenu",["root","paper","list"]);const Ue=["onEntering"],ze=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Ae={vertical:"top",horizontal:"right"},He={vertical:"top",horizontal:"left"},Oe=e=>{const{classes:t}=e;return le({root:["root"],paper:["paper"],list:["list"]},Ke,t)},Ve=_(Pe,{shouldForwardProp:e=>ve(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ge=_(xe,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),We=_(Ne,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),qe=i.forwardRef(function(t,s){var p,u;const m=ie({props:t,name:"MuiMenu"}),{autoFocus:c=!0,children:r,className:y,disableAutoFocusItem:b=!1,MenuListProps:P={},onClose:v,open:C,PaperProps:h={},PopoverClasses:W,transitionDuration:E="auto",TransitionProps:{onEntering:R}={},variant:f="selectedMenu",slots:L={},slotProps:n={}}=m,a=k(m.TransitionProps,Ue),d=k(m,ze),S=Ce(),l=S.direction==="rtl",w=x({},m,{autoFocus:c,disableAutoFocusItem:b,MenuListProps:P,onEntering:R,PaperProps:h,transitionDuration:E,TransitionProps:a,variant:f}),I=Oe(w),q=c&&!b&&C,B=i.useRef(null),fe=(M,T)=>{B.current&&B.current.adjustStyleForScrollbar(M,S),R&&R(M,T)},pe=M=>{M.key==="Tab"&&(M.preventDefault(),v&&v(M,"tabKeyDown"))};let D=-1;i.Children.map(r,(M,T)=>{i.isValidElement(M)&&(M.props.disabled||(f==="selectedMenu"&&M.props.selected||D===-1)&&(D=T))});const Y=(p=L.paper)!=null?p:Ge,de=(u=n.paper)!=null?u:h,me=ee({elementType:L.root,externalSlotProps:n.root,ownerState:w,className:[I.root,y]}),ye=ee({elementType:Y,externalSlotProps:de,ownerState:w,className:I.paper});return F.jsx(Ve,x({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:l?"right":"left"},transformOrigin:l?Ae:He,slots:{paper:Y,root:L.root},slotProps:{root:me,paper:ye},open:C,ref:s,transitionDuration:E,TransitionProps:x({onEntering:fe},a),ownerState:w},d,{classes:W,children:F.jsx(We,x({onKeyDown:pe,actions:B,autoFocus:c&&(D===-1||b),autoFocusItem:q,variant:f},P,{className:ae(I.list,P.className),children:r}))}))}),Ye=qe;export{Ye as M,Je as a,Xe as l,Qe as u};
