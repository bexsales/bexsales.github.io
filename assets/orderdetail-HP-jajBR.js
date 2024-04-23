import{g as je,k as ge,h as ye,T as x,M as fe,r as n,i as Ce,a as _e,j as e,_ as V,b as be,f as Se,x as _,P,S as L,y as O,z as H,C as w,F as D,G as ve,E as q,N as Te,W as Oe}from"./index-B8DdthNH.js";import{P as Pe}from"./product-view-BrXtzTgE.js";import{D as F,a as W,b as R,c as U,G as v}from"./Grid-BdMT6fcE.js";import{F as X,T,L as we}from"./LoadingButton-C_C39sY-.js";import{C as De}from"./customer-view-D4LqNlfX.js";import{d as qe,e as Le,b as Fe,T as G,a as j,f as We}from"./search-fill-BCIY0mPt.js";import{C as Re}from"./Container-DgwCG4qh.js";import{C as Ue}from"./Card-Z0OQqWNB.js";import{u as $e}from"./use-auth-CcEPYmc4.js";import"./Select-B-Wb-ekU.js";import"./isMuiElement-S3DAsH90.js";function ke(r){return je("MuiDialogContentText",r)}ge("MuiDialogContentText",["root"]);const Ae=["children","className"],Me=r=>{const{classes:l}=r,c=Se({root:["root"]},ke,l);return V({},l,c)},Ne=ye(x,{shouldForwardProp:r=>fe(r)||r==="classes",name:"MuiDialogContentText",slot:"Root",overridesResolver:(r,l)=>l.root})({}),Be=n.forwardRef(function(l,d){const c=Ce({props:l,name:"MuiDialogContentText"}),{className:i}=c,g=_e(c,Ae),y=Me(g);return e.jsx(Ne,V({component:"p",variant:"body1",color:"text.secondary",ref:d,ownerState:g,className:be(y.root,i)},c,{classes:y}))}),Ee=Be;function J({onSelect:r}){const[l,d]=n.useState(!1),c=()=>{d(!0)},i=()=>{d(!1)},g=y=>{r(y),i()};return e.jsxs("div",{children:[e.jsx(_,{variant:"outlined",onClick:c,children:"Add Product"}),e.jsxs(F,{open:l,onClose:i,maxWidth:"xl",fullWidth:!0,children:[e.jsx(W,{children:"Products"}),e.jsx(R,{children:e.jsx(X,{sx:{width:"100%"},children:e.jsx(Pe,{onSelect:g,style:{width:"100%"}})})}),e.jsx(U,{children:e.jsx(_,{onClick:i,color:"primary",children:"Close"})})]})]})}J.propTypes={onSelect:P.func};function K({onSelect:r}){const[l,d]=n.useState(!1),c=()=>{d(!0)},i=()=>{d(!1)},g=y=>{r(y),i()};return e.jsxs("div",{children:[e.jsx(_,{variant:"outlined",onClick:c,children:"Set"}),e.jsxs(F,{open:l,onClose:i,maxWidth:"xl",fullWidth:!0,children:[e.jsx(W,{children:"Customers"}),e.jsx(R,{sx:{padding:0},children:e.jsx(X,{sx:{width:"100%"},children:e.jsx(De,{onSelect:g,style:{width:"100%"}})})}),e.jsx(U,{children:e.jsx(_,{onClick:i,color:"primary",children:"Close"})})]})]})}K.propTypes={onSelect:P.func};function Y({handleCancelOrder:r}){const[l,d]=n.useState(!1),c=()=>{d(!0)},i=()=>{d(!1)};return e.jsxs(L,{direction:"row",alignItems:"center",children:[e.jsx(x,{variant:"body1",sx:{color:"red"},children:"Cancel"}),e.jsxs(O,{onClick:c,sx:{color:"red"},children:[e.jsx(H,{icon:"eva:close-outline"})," "]}),e.jsxs(F,{open:l,onClose:i,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(W,{id:"alert-dialog-title",children:"Confirm Cancellation"}),e.jsx(R,{children:e.jsx(Ee,{id:"alert-dialog-description",children:"Are you sure you want to cancel this order?"})}),e.jsxs(U,{children:[e.jsx(_,{onClick:i,color:"primary",children:"Cancel"}),e.jsx(_,{onClick:r,color:"primary",autoFocus:!0,children:"Confirm"})]})]})]})}Y.propTypes={handleCancelOrder:P.func};function Z({orderId:r}){const[l,d]=n.useState(!1),[c,i]=n.useState(""),[g,y]=n.useState(""),[u,$]=n.useState({id:0,name:"",street:"",city:"",state:"",country:"",zip:"",phone:"",mobile:"",email:""}),[m,b]=n.useState([]),[k,ee]=n.useState([]),[A,te]=n.useState({}),[oe,M]=n.useState(0),[re,N]=n.useState(0),[se,ne]=n.useState(0),[B,E]=n.useState(""),[z,I]=n.useState("");n.useEffect(()=>{he()},[]);const ae=()=>{Q(!0)},le=(t,o)=>{console.log("Fetching order totals");const a=`${q.baseURL}/api-proxy/proxy?method=post&resource=ordertotals`;console.log(a);const s=m.map(h=>({product_id:h[2].id,product_uom_qty:h[2].product_uom_qty})),f={partner_id:u.id,order_line:s};console.log("Request body",f),w.post(a,f,{headers:{Authorization:`Bearer ${D.get("jwt")}`}}).then(h=>{console.log(h.data),te(h.data.result.product_prices),M(h.data.result.subtotal),N(h.data.result.total)}).catch(h=>{console.error("Error fetching order totals:",h)})};n.useEffect(()=>{le();const t=m.reduce((o,a)=>o+a[2].product_uom_qty,0);ne(t)},[u,m]);const de=t=>{E(t.target.value)},ie=t=>{I(t.target.value)},Q=t=>{d(!0),console.log("Saving Order");let o="post";t===!0&&(o="cancel");const a=`${q.baseURL}/api-proxy/proxy?method=${o}&resource=orders`;console.log(a),console.log(m);const s=m.map(p=>[p[0],p[1],{product_id:p[2].id,product_uom_qty:p[2].product_uom_qty}]),f=k.map(p=>[2,p[1],{}]),h=s.concat(f),C={order:{id:parseInt(r,10),partner_id:u.id,order_line:h,x_studio_notes:B,client_order_ref:z}};console.log("Request body",C),w.post(a,C,{headers:{Authorization:`Bearer ${D.get("jwt")}`}}).then(p=>{console.log(p.data),d(!1),p.data.result.success===!1?alert(p.data.result.message):window.location.reload()}).catch(p=>{console.error("Error saving order:",p)})},ce=(t,o,a)=>{if(t<0||t>=m.length)return;const s=m.filter((h,C)=>C===t);s[0][0]!==0&&(console.log("Adding line to delete queue",s),ee(k.concat(s)));const f=m.filter((h,C)=>C!==t);b(f)},ue=(t,o)=>{const a=m.map((s,f)=>f===t?(console.log("handle qty change",s),[s[0],s[1],{...s[2],product_uom_qty:o!==0?Number(o):0}]):s);b(a)},S=t=>t?`$${t.toFixed(2)}`:"",he=()=>{console.log("Fetching Order Details");const t=`${q.baseURL}/api-proxy/proxy?method=get&resource=orders&order_id=${r}`;console.log(t),w.get(t,{headers:{Authorization:`Bearer ${D.get("jwt")}`}}).then(o=>{console.log(o.data.data),i(o.data.data.name),$(o.data.data.customer_id),E(o.data.data.x_studio_notes),I(o.data.data.client_order_ref?o.data.data.client_order_ref:"");const a=o.data.data.order_line.map(s=>[1,s.id,{line_id:s.id,id:s.product_id.id,name:s.name,product_uom_qty:s.product_uom_qty}]);console.log(a),b(a),M(o.data.data.amount_untaxed),N(o.data.data.amount_total),y(o.data.data.state)}).catch(o=>{console.error("Error fetching order details:",o)})},xe=t=>{console.log("Setting order partner"),console.log(t),$({id:t.id,name:t.name,street:t.street,city:t.city,state:t.state,country:t.country,zip:t.zip,phone:t.phone,mobile:t.mobile,email:t.email})},pe=t=>{console.log("Adding order line"),console.log(t),b([...m,[0,0,{id:t.id,name:`[${t.default_code}] ${t.name}`,product_uom_qty:1}]])},me=e.jsxs(e.Fragment,{children:[e.jsx(L,{spacing:3,direction:"row",alignItems:"center",children:e.jsx(T,{fullWidth:!0,name:"partner_id",label:"Customer",value:u.name,InputProps:{readOnly:!0,endAdornment:e.jsx(O,{children:e.jsx(K,{onSelect:xe})})}})}),u.name&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(x,{variant:"body1",fontWeight:"bold",children:"Address:"}),e.jsx(x,{variant:"body1",children:u.street}),e.jsxs(x,{variant:"body1",children:[u.city," ",u.state]}),e.jsxs(x,{variant:"body1",children:[u.country," ",u.zip]}),e.jsxs(x,{variant:"body1",children:[e.jsx("b",{children:"Phone:"})," ",u.phone]}),e.jsxs(x,{variant:"body1",children:[e.jsx("b",{children:"Mobile:"})," ",u.mobile]}),e.jsxs(x,{variant:"body1",children:[e.jsx("b",{children:"Email:"})," ",u.email]})]}),e.jsx(O,{children:e.jsx(J,{onSelect:pe})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(qe,{component:ve,children:e.jsxs(Le,{children:[e.jsx(Fe,{children:e.jsxs(G,{children:[e.jsx(j,{children:"Product"}),e.jsx(j,{children:"Unit Price"}),e.jsx(j,{children:"Qty"}),e.jsx(j,{children:"Subtotal"}),e.jsx(j,{})]})}),e.jsx(We,{children:m.map((t,o)=>e.jsxs(G,{children:[e.jsx(j,{children:t[2].name}),e.jsx(j,{children:S(A[t[2].id])}),e.jsx(j,{children:e.jsx(T,{type:"number",style:{minWidth:"100px"},value:t[2].product_uom_qty!==0?t[2].product_uom_qty:"",onChange:a=>ue(o,a.target.value)})}),e.jsx(j,{children:S(A[t[2].id]*t[2].product_uom_qty)}),e.jsx(j,{align:"right",children:e.jsx(O,{onClick:()=>ce(o),children:e.jsx(H,{icon:"eva:trash-2-outline"})})})]},o))})]})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsxs(x,{variant:"body1",fontWeight:"bold",children:["Total Product Qty: ",se]}),e.jsxs(x,{variant:"body1",fontWeight:"bold",children:["Subtotal: ",S(oe)]}),e.jsxs(x,{variant:"body1",fontWeight:"bold",children:["Total: ",S(re)]}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(v,{container:!0,spacing:2,children:e.jsx(v,{item:!0,xs:12,md:6,lg:6,children:e.jsx(T,{label:"Notes",value:B,multiline:!0,fullWidth:!0,rows:4,onChange:de})})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(v,{container:!0,spacing:2,children:e.jsx(v,{item:!0,xs:12,md:6,lg:6,children:e.jsx(T,{label:"PO Number",value:z,fullWidth:!0,onChange:ie})})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(we,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:Q,loading:l,children:"Save"})]});return e.jsxs(Re,{children:[e.jsxs(L,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[e.jsxs(x,{variant:"h4",children:["Order ",c," [",g,"]"]}),g==="draft"&&e.jsx(Y,{handleCancelOrder:ae})]}),me,e.jsx(Ue,{})]})}Z.propTypes={orderId:P.any};function et(){$e();const{orderId:r}=Te();return e.jsxs(e.Fragment,{children:[e.jsx(Oe,{children:e.jsx("title",{children:" Order Detail | BEX Sales "})}),e.jsx(Z,{orderId:r})]})}export{et as default};
