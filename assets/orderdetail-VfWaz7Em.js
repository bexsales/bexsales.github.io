import{g as Ce,k as _e,h as ve,T as a,M as Se,r as s,i as Pe,a as Oe,j as e,_ as J,b as Te,f as qe,x as C,P as v,S as D,C as P,D as K,y as k,z as M,G as De,A as $,N as we,W as Le}from"./index-BrwgQKfZ.js";import{P as We,C as Ae}from"./product-view-Ptnn2pLK.js";import{D as w,a as L,b as W,c as A,G as q}from"./Grid-2-usXYCF.js";import{F as z,T as S,L as Fe}from"./LoadingButton-C06c9HOX.js";import{C as Y}from"./customer-view-B0Jed1SY.js";import{d as ke,e as Me,b as $e,T as X,a as x,f as ze}from"./search-fill-Ce3__Rwk.js";import{C as Re}from"./Container-D4oRyIBi.js";import{C as Ue}from"./Card-Bc929Og7.js";import{u as Ee}from"./use-auth-CBsstwnw.js";import"./Select-CW7AANIO.js";import"./isMuiElement-DfaQQ-59.js";function Ie(n){return Ce("MuiDialogContentText",n)}_e("MuiDialogContentText",["root"]);const Ne=["children","className"],Be=n=>{const{classes:i}=n,u=qe({root:["root"]},Ie,i);return J({},i,u)},Qe=ve(a,{shouldForwardProp:n=>Se(n)||n==="classes",name:"MuiDialogContentText",slot:"Root",overridesResolver:(n,i)=>i.root})({}),Ge=s.forwardRef(function(i,c){const u=Pe({props:i,name:"MuiDialogContentText"}),{className:h}=u,m=Oe(u,Ne),b=Be(m);return e.jsx(Qe,J({component:"p",variant:"body1",color:"text.secondary",ref:c,ownerState:m,className:Te(b.root,h)},u,{classes:b}))}),Ve=Ge;function Z({onSelect:n}){const[i,c]=s.useState(!1),u=()=>{c(!0)},h=()=>{c(!1)},m=b=>{n(b),h()};return e.jsxs("div",{children:[e.jsx(C,{variant:"outlined",onClick:u,children:"Add Product"}),e.jsxs(w,{open:i,onClose:h,maxWidth:"xl",fullWidth:!0,children:[e.jsx(L,{children:"Products"}),e.jsx(W,{children:e.jsx(z,{sx:{width:"100%"},children:e.jsx(We,{onSelect:m,style:{width:"100%"}})})}),e.jsx(A,{children:e.jsx(C,{onClick:h,color:"primary",children:"Close"})})]})]})}Z.propTypes={onSelect:v.func};function ee({onSelect:n}){const[i,c]=s.useState(!1),u=()=>{c(!0)},h=()=>{c(!1)},m=b=>{n(b),h()};return e.jsxs("div",{children:[e.jsx(C,{variant:"outlined",onClick:u,children:"Set"}),e.jsxs(w,{open:i,onClose:h,maxWidth:"xl",fullWidth:!0,children:[e.jsx(L,{children:"Customers"}),e.jsx(W,{sx:{padding:0},children:e.jsx(z,{sx:{width:"100%"},children:e.jsx(Y,{onSelect:m,style:{width:"100%"}})})}),e.jsx(A,{children:e.jsx(C,{onClick:h,color:"primary",children:"Close"})})]})]})}ee.propTypes={onSelect:v.func};function te({onSelect:n,filterParentContactOption:i}){const[c,u]=s.useState(!1),h=()=>{u(!0)},m=()=>{u(!1)},b=l=>{n(l),m()};return s.useEffect(()=>{console.log("DeliveryPopupModal Props:"),console.log("filterParentContactOption:",i)},[n,i]),e.jsxs("div",{children:[e.jsx(C,{variant:"outlined",onClick:h,children:"Set"}),e.jsxs(w,{open:c,onClose:m,maxWidth:"xl",fullWidth:!0,children:[e.jsx(L,{children:"Customers"}),e.jsx(W,{sx:{padding:0},children:e.jsx(z,{sx:{width:"100%"},children:e.jsx(Y,{onSelect:b,filterTypeOption:"delivery",filterParentContactOption:i,style:{width:"100%"}})})}),e.jsx(A,{children:e.jsx(C,{onClick:m,color:"primary",children:"Close"})})]})]})}te.propTypes={onSelect:v.func,filterParentContactOption:v.number};function oe({handleCancelOrder:n}){const[i,c]=s.useState(!1),u=()=>{c(!0)},h=()=>{c(!1)};return e.jsxs(D,{direction:"row",alignItems:"center",children:[e.jsx(a,{variant:"body1",sx:{color:"red"},children:"Cancel"}),e.jsxs(P,{onClick:u,sx:{color:"red"},children:[e.jsx(K,{icon:"eva:close-outline"})," "]}),e.jsxs(w,{open:i,onClose:h,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(L,{id:"alert-dialog-title",children:"Confirm Cancellation"}),e.jsx(W,{children:e.jsx(Ve,{id:"alert-dialog-description",children:"Are you sure you want to cancel this order?"})}),e.jsxs(A,{children:[e.jsx(C,{onClick:h,color:"primary",children:"Cancel"}),e.jsx(C,{onClick:n,color:"primary",autoFocus:!0,children:"Confirm"})]})]})]})}oe.propTypes={handleCancelOrder:v.func};function re({orderId:n}){const[i,c]=s.useState(!1),[u,h]=s.useState(""),[m,b]=s.useState(""),[l,R]=s.useState({id:0,name:"",street:"",city:"",state:"",country:"",zip:"",phone:"",mobile:"",email:""}),[f,F]=s.useState({id:0,name:"",street:"",city:"",state:"",country:"",zip:"",phone:"",mobile:"",email:""}),[y,O]=s.useState([]),[U,ne]=s.useState([]),[E,se]=s.useState({}),[ae,I]=s.useState(0),[le,N]=s.useState(0),[ie,de]=s.useState(0),[B,Q]=s.useState(""),[G,V]=s.useState("");s.useEffect(()=>{je()},[]);const ce=()=>{H(!0)},ue=(t,o)=>{console.log("Fetching order totals");const d=`${$.baseURL}/api-proxy/proxy?method=post&resource=ordertotals`;console.log(d);const r=y.map(p=>({product_id:p[2].id,product_uom_qty:p[2].product_uom_qty})),g={partner_id:l.id,order_line:r};console.log("Request body",g),k.post(d,g,{headers:{Authorization:`Bearer ${M.get("jwt")}`}}).then(p=>{console.log(p.data),se(p.data.result.product_prices),I(p.data.result.subtotal),N(p.data.result.total)}).catch(p=>{console.error("Error fetching order totals:",p)})};s.useEffect(()=>{ue();const t=y.reduce((o,d)=>o+d[2].product_uom_qty,0);de(t)},[l,y]);const he=t=>{Q(t.target.value)},pe=t=>{V(t.target.value)},H=t=>{c(!0),console.log("Saving Order");let o="post";t===!0&&(o="cancel");const d=`${$.baseURL}/api-proxy/proxy?method=${o}&resource=orders`;console.log(d),console.log(y);const r=y.map(j=>[j[0],j[1],{product_id:j[2].id,product_uom_qty:j[2].product_uom_qty}]),g=U.map(j=>[2,j[1],{}]),p=r.concat(g),_={order:{id:parseInt(n,10),partner_id:l.id,order_line:p,x_studio_notes:B,client_order_ref:G,...f.id&&{partner_shipping_id:f.id}}};console.log("Request body",_),k.post(d,_,{headers:{Authorization:`Bearer ${M.get("jwt")}`}}).then(j=>{console.log(j.data),c(!1),j.data.result.success===!1?alert(j.data.result.message):window.location.reload()}).catch(j=>{console.error("Error saving order:",j)})},xe=(t,o,d)=>{if(t<0||t>=y.length)return;const r=y.filter((p,_)=>_===t);r[0][0]!==0&&(console.log("Adding line to delete queue",r),ne(U.concat(r)));const g=y.filter((p,_)=>_!==t);O(g)},me=(t,o)=>{const d=y.map((r,g)=>{if(g===t){console.log("handle qty change",r);const p=["consu","service"];return r[2].qty_available<o&&!p.includes(r[2].type)?(alert("Quantity available is insufficient."),r):[r[0],r[1],{...r[2],product_uom_qty:o!==0?Number(o):0}]}return r});O(d)},T=t=>t?`$${t.toFixed(2)}`:"",je=()=>{console.log("Fetching Order Details");const t=`${$.baseURL}/api-proxy/proxy?method=get&resource=orders&order_id=${n}`;console.log(t),k.get(t,{headers:{Authorization:`Bearer ${M.get("jwt")}`}}).then(o=>{console.log(o.data.data),h(o.data.data.name),R(o.data.data.customer_id),F(o.data.data.partner_shipping_id),Q(o.data.data.x_studio_notes),V(o.data.data.client_order_ref?o.data.data.client_order_ref:"");const d=o.data.data.order_line.map(r=>[1,r.id,{line_id:r.id,id:r.product_id.id,name:r.name,product_uom_qty:r.product_uom_qty,attributes:r.product_id.attributes.map(g=>`${g.attribute}:${g.name}`),qty_available:r.product_id.qty_available,type:r.product_id.type}]);console.log(d),O(d),I(o.data.data.amount_untaxed),N(o.data.data.amount_total),b(o.data.data.state)}).catch(o=>{console.error("Error fetching order details:",o)})},ye=t=>{console.log("Setting order partner"),console.log(t),R({id:t.id,name:t.name,street:t.street,city:t.city,state:t.state,country:t.country,zip:t.zip,phone:t.phone,mobile:t.mobile,email:t.email}),F({id:0,name:"",street:"",city:"",state:"",country:"",zip:"",phone:"",mobile:"",email:""})},ge=t=>{console.log("Setting order partner"),console.log(t),F({id:t.id,name:t.name,street:t.street,city:t.city,state:t.state,country:t.country,zip:t.zip,phone:t.phone,mobile:t.mobile,email:t.email})},be=t=>{console.log("Adding order line"),console.log(t);const o=["consu","service"];t.qty_available<1&&!o.includes(t.type)?alert("Cannot add product lines with 0 qty available"):O([...y,[0,0,{id:t.id,name:`[${t.default_code}] ${t.name}`,product_uom_qty:1,attributes:t.attributes,qty_available:t.qty_available}]])},fe=e.jsxs(e.Fragment,{children:[e.jsx(D,{spacing:3,direction:"row",alignItems:"center",children:e.jsx(S,{fullWidth:!0,name:"partner_id",label:"Customer",value:l.name,InputProps:{readOnly:!0,endAdornment:e.jsx(P,{children:e.jsx(ee,{onSelect:ye})})}})}),l.name&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(a,{variant:"body1",fontWeight:"bold",children:"Address:"}),e.jsx(a,{variant:"body1",children:l.street}),e.jsxs(a,{variant:"body1",children:[l.city," ",l.state]}),e.jsxs(a,{variant:"body1",children:[l.country," ",l.zip]}),e.jsxs(a,{variant:"body1",children:[e.jsx("b",{children:"Phone:"})," ",l.phone]}),e.jsxs(a,{variant:"body1",children:[e.jsx("b",{children:"Mobile:"})," ",l.mobile]}),e.jsxs(a,{variant:"body1",children:[e.jsx("b",{children:"Email:"})," ",l.email]})]}),e.jsx("div",{style:{margin:"16px 0"}}),l.name&&e.jsx(D,{spacing:3,direction:"row",alignItems:"center",children:e.jsx(S,{fullWidth:!0,name:"partner_shipping_id",label:"Delivery Address",value:f.name,InputProps:{readOnly:!0,endAdornment:e.jsx(P,{children:e.jsx(te,{onSelect:ge,filterParentContactOption:l.id})})}})}),f.name&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(a,{variant:"body1",fontWeight:"bold",children:"Address:"}),e.jsx(a,{variant:"body1",children:f.street}),e.jsxs(a,{variant:"body1",children:[f.city," ",l.state]}),e.jsxs(a,{variant:"body1",children:[f.country," ",l.zip]}),e.jsxs(a,{variant:"body1",children:[e.jsx("b",{children:"Phone:"})," ",f.phone]}),e.jsxs(a,{variant:"body1",children:[e.jsx("b",{children:"Mobile:"})," ",f.mobile]}),e.jsxs(a,{variant:"body1",children:[e.jsx("b",{children:"Email:"})," ",f.email]})]}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(P,{children:e.jsx(Z,{onSelect:be})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(ke,{component:De,children:e.jsxs(Me,{children:[e.jsx($e,{children:e.jsxs(X,{children:[e.jsx(x,{children:"Product"}),e.jsx(x,{children:"Attributes"}),e.jsx(x,{children:"Unit Price"}),e.jsx(x,{children:"Qty Available"}),e.jsx(x,{children:"Qty"}),e.jsx(x,{children:"Subtotal"}),e.jsx(x,{})]})}),e.jsx(ze,{children:y.map((t,o)=>e.jsxs(X,{children:[e.jsx(x,{children:t[2].name}),e.jsx(x,{children:t[2].attributes.map((d,r)=>e.jsx(Ae,{label:d,variant:"outlined"},r))}),e.jsx(x,{children:T(E[t[2].id])}),e.jsx(x,{children:t[2].qty_available}),e.jsx(x,{children:e.jsx(S,{type:"number",style:{minWidth:"100px"},value:t[2].product_uom_qty!==0?t[2].product_uom_qty:"",onChange:d=>me(o,d.target.value)})}),e.jsx(x,{children:T(E[t[2].id]*t[2].product_uom_qty)}),e.jsx(x,{align:"right",children:e.jsx(P,{onClick:()=>xe(o),children:e.jsx(K,{icon:"eva:trash-2-outline"})})})]},o))})]})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsxs(a,{variant:"body1",fontWeight:"bold",children:["Total Product Qty: ",ie]}),e.jsxs(a,{variant:"body1",fontWeight:"bold",children:["Subtotal: ",T(ae)]}),e.jsxs(a,{variant:"body1",fontWeight:"bold",children:["Total: ",T(le)]}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(q,{container:!0,spacing:2,children:e.jsx(q,{item:!0,xs:12,md:6,lg:6,children:e.jsx(S,{label:"Notes",value:B,multiline:!0,fullWidth:!0,rows:4,onChange:he})})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(q,{container:!0,spacing:2,children:e.jsx(q,{item:!0,xs:12,md:6,lg:6,children:e.jsx(S,{label:"PO Number",value:G,fullWidth:!0,onChange:pe})})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(Fe,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:H,loading:i,children:"Save"})]});return e.jsxs(Re,{children:[e.jsxs(D,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[e.jsxs(a,{variant:"h4",children:["Order ",u," [",m,"]"]}),m==="draft"&&e.jsx(oe,{handleCancelOrder:ce})]}),fe,e.jsx(Ue,{})]})}re.propTypes={orderId:v.any};function st(){Ee();const{orderId:n}=we();return e.jsxs(e.Fragment,{children:[e.jsx(Le,{children:e.jsx("title",{children:" Order Detail | BEX Sales "})}),e.jsx(re,{orderId:n})]})}export{st as default};