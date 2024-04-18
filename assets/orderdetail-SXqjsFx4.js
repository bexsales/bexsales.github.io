import{r as n,j as e,x as v,P as L,C as O,F as P,S as T,y as S,T as i,G as ie,z as I,E as q,M as ce,W as ue}from"./index-C0cJGDtN.js";import{P as he}from"./product-view-D8FfSflt.js";import{D as R,a as M,b as N,c as G,G as U}from"./Grid-BLESJ7hL.js";import{F as V,T as w,L as xe}from"./LoadingButton-DRwx4hKI.js";import{C as pe}from"./customer-view-BEPnotw_.js";import{d as me,e as je,b as ge,T as k,a as u,f as ye}from"./search-fill-Driv2q2_.js";import{C as fe}from"./Container-C17YOyMP.js";import{C as _e}from"./Card-LhXz-8Lk.js";import{u as be}from"./use-auth-Bpqzk9Q_.js";import"./Select-D7p2pmiW.js";import"./isMuiElement-24kUHOmg.js";function H({onSelect:x}){const[y,p]=n.useState(!1),f=()=>{p(!0)},h=()=>{p(!1)},j=_=>{x(_),h()};return e.jsxs("div",{children:[e.jsx(v,{variant:"outlined",onClick:f,children:"Add Product"}),e.jsxs(R,{open:y,onClose:h,maxWidth:"xl",fullWidth:!0,children:[e.jsx(M,{children:"Products"}),e.jsx(N,{children:e.jsx(V,{sx:{width:"100%"},children:e.jsx(he,{onSelect:j,style:{width:"100%"}})})}),e.jsx(G,{children:e.jsx(v,{onClick:h,color:"primary",children:"Close"})})]})]})}H.propTypes={onSelect:L.func};function Q({onSelect:x}){const[y,p]=n.useState(!1),f=()=>{p(!0)},h=()=>{p(!1)},j=_=>{x(_),h()};return e.jsxs("div",{children:[e.jsx(v,{variant:"outlined",onClick:f,children:"Set"}),e.jsxs(R,{open:y,onClose:h,maxWidth:"xl",fullWidth:!0,children:[e.jsx(M,{children:"Customers"}),e.jsx(N,{sx:{padding:0},children:e.jsx(V,{sx:{width:"100%"},children:e.jsx(pe,{onSelect:j,style:{width:"100%"}})})}),e.jsx(G,{children:e.jsx(v,{onClick:h,color:"primary",children:"Close"})})]})]})}Q.propTypes={onSelect:L.func};function X({orderId:x}){const[y,p]=n.useState(!1),[f,h]=n.useState(""),[j,_]=n.useState(""),[s,D]=n.useState({id:0,name:"",street:"",city:"",state:"",country:"",zip:"",phone:"",mobile:"",email:""}),[c,b]=n.useState([]),[F,J]=n.useState([]),[W,K]=n.useState({}),[Y,$]=n.useState(0),[Z,A]=n.useState(0),[B,E]=n.useState("");n.useEffect(()=>{se()},[]);const ee=()=>{z(!0)},te=(t,r)=>{console.log("Fetching order totals");const a=`${q.baseURL}/api-proxy/proxy?method=post&resource=ordertotals`;console.log(a);const o=c.map(d=>({product_id:d[2].id,product_uom_qty:d[2].product_uom_qty})),m={partner_id:s.id,order_line:o};console.log("Request body",m),O.post(a,m,{headers:{Authorization:`Bearer ${P.get("jwt")}`}}).then(d=>{console.log(d.data),K(d.data.result.product_prices),$(d.data.result.subtotal),A(d.data.result.total)}).catch(d=>{console.error("Error fetching order totals:",d)})};n.useEffect(()=>{te()},[s,c]);const re=t=>{E(t.target.value)},z=t=>{p(!0),console.log("Saving Order");let r="post";t===!0&&(r="cancel");const a=`${q.baseURL}/api-proxy/proxy?method=${r}&resource=orders`;console.log(a),console.log(c);const o=c.map(l=>[l[0],l[1],{product_id:l[2].id,product_uom_qty:l[2].product_uom_qty}]),m=F.map(l=>[2,l[1],{}]),d=o.concat(m),g={order:{id:parseInt(x,10),partner_id:s.id,order_line:d,x_studio_notes:B}};console.log("Request body",g),O.post(a,g,{headers:{Authorization:`Bearer ${P.get("jwt")}`}}).then(l=>{console.log(l.data),p(!1),l.data.result.success===!1?alert(l.data.result.message):window.location.reload()}).catch(l=>{console.error("Error saving order:",l)})},oe=(t,r,a)=>{if(t<0||t>=c.length)return;const o=c.filter((d,g)=>g===t);o[0][0]!==0&&(console.log("Adding line to delete queue",o),J(F.concat(o)));const m=c.filter((d,g)=>g!==t);b(m)},ne=(t,r)=>{const a=c.map((o,m)=>m===t?(console.log("handle qty change",o),[o[0],o[1],{...o[2],product_uom_qty:r!==0?Number(r):0}]):o);b(a)},C=t=>t?`$${t.toFixed(2)}`:"",se=()=>{console.log("Fetching Order Details");const t=`${q.baseURL}/api-proxy/proxy?method=get&resource=orders&order_id=${x}`;console.log(t),O.get(t,{headers:{Authorization:`Bearer ${P.get("jwt")}`}}).then(r=>{console.log(r.data.data),h(r.data.data.name),D(r.data.data.customer_id),E(r.data.data.x_studio_notes);const a=r.data.data.order_line.map(o=>[1,o.id,{line_id:o.id,id:o.product_id.id,name:o.name,product_uom_qty:o.product_uom_qty}]);console.log(a),b(a),$(r.data.data.amount_untaxed),A(r.data.data.amount_total),_(r.data.data.state)}).catch(r=>{console.error("Error fetching order details:",r)})},ae=t=>{console.log("Setting order partner"),console.log(t),D({id:t.id,name:t.name,street:t.street,city:t.city,state:t.state,country:t.country,zip:t.zip,phone:t.phone,mobile:t.mobile,email:t.email})},de=t=>{console.log("Adding order line"),console.log(t),b([...c,[0,0,{id:t.id,name:`[${t.default_code}] ${t.name}`,product_uom_qty:1}]])},le=e.jsxs(e.Fragment,{children:[e.jsx(T,{spacing:3,direction:"row",alignItems:"center",children:e.jsx(w,{fullWidth:!0,name:"partner_id",label:"Customer",value:s.name,InputProps:{readOnly:!0,endAdornment:e.jsx(S,{children:e.jsx(Q,{onSelect:ae})})}})}),s.name&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(i,{variant:"body1",fontWeight:"bold",children:"Address:"}),e.jsx(i,{variant:"body1",children:s.street}),e.jsxs(i,{variant:"body1",children:[s.city," ",s.state]}),e.jsxs(i,{variant:"body1",children:[s.country," ",s.zip]}),e.jsxs(i,{variant:"body1",children:[e.jsx("b",{children:"Phone:"})," ",s.phone]}),e.jsxs(i,{variant:"body1",children:[e.jsx("b",{children:"Mobile:"})," ",s.mobile]}),e.jsxs(i,{variant:"body1",children:[e.jsx("b",{children:"Email:"})," ",s.email]})]}),e.jsx(S,{children:e.jsx(H,{onSelect:de})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(me,{component:ie,children:e.jsxs(je,{children:[e.jsx(ge,{children:e.jsxs(k,{children:[e.jsx(u,{children:"Product"}),e.jsx(u,{children:"Unit Price"}),e.jsx(u,{children:"Qty"}),e.jsx(u,{children:"Subtotal"}),e.jsx(u,{})]})}),e.jsx(ye,{children:c.map((t,r)=>e.jsxs(k,{children:[e.jsx(u,{children:t[2].name}),e.jsx(u,{children:C(W[t[2].id])}),e.jsx(u,{children:e.jsx(w,{type:"number",style:{minWidth:"100px"},value:t[2].product_uom_qty!==0?t[2].product_uom_qty:"",onChange:a=>ne(r,a.target.value)})}),e.jsx(u,{children:C(W[t[2].id]*t[2].product_uom_qty)}),e.jsx(u,{align:"right",children:e.jsx(S,{onClick:()=>oe(r),children:e.jsx(I,{icon:"eva:trash-2-outline"})})})]},r))})]})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsxs(i,{variant:"body1",fontWeight:"bold",children:["Subtotal: ",C(Y)]}),e.jsxs(i,{variant:"body1",fontWeight:"bold",children:["Total: ",C(Z)]}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(U,{container:!0,spacing:2,children:e.jsx(U,{item:!0,xs:12,md:6,lg:6,children:e.jsx(w,{label:"Notes",value:B,multiline:!0,fullWidth:!0,rows:4,onChange:re})})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(xe,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:z,loading:y,children:"Save"})]});return e.jsxs(fe,{children:[e.jsxs(T,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[e.jsxs(i,{variant:"h4",children:["Order ",f," [",j,"]"]}),j==="draft"&&e.jsxs(T,{direction:"row",alignItems:"center",children:[e.jsx(i,{variant:"body1",sx:{color:"red"},children:"Cancel"}),e.jsxs(S,{onClick:ee,sx:{color:"red"},children:[e.jsx(I,{icon:"eva:close-outline"})," "]})]})]}),le,e.jsx(_e,{})]})}X.propTypes={orderId:L.any};function We(){be();const{orderId:x}=ce();return e.jsxs(e.Fragment,{children:[e.jsx(ue,{children:e.jsx("title",{children:" Order Detail | BEX Sales "})}),e.jsx(X,{orderId:x})]})}export{We as default};
