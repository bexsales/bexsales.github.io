import{r as n,j as e,x as v,P as w,w as ce,C as O,F as P,S as T,y as S,T as i,G as ue,z as I,E as q,M as he,W as xe}from"./index-D9HG3xCK.js";import{P as pe}from"./product-view-BhUXeoo4.js";import{D as R,a as M,b as N,c as G,G as U}from"./Grid-ItDJWfVO.js";import{F as V,T as L,L as me}from"./LoadingButton-A0K07KAE.js";import{C as je}from"./customer-view-C38vaqhK.js";import{d as ge,e as ye,b as fe,T as k,a as u,f as _e}from"./search-fill-DiV1wS1u.js";import{C as be}from"./Container-k7Q7pOEO.js";import{C as Ce}from"./Card-DbNlxdCL.js";import{u as Se}from"./use-auth-DsIcbDKn.js";import"./Select-D02yl1P-.js";import"./isMuiElement-CEOezJ-p.js";function H({onSelect:x}){const[f,m]=n.useState(!1),j=()=>{m(!0)},h=()=>{m(!1)},_=g=>{x(g),h()};return e.jsxs("div",{children:[e.jsx(v,{variant:"outlined",onClick:j,children:"Add Product"}),e.jsxs(R,{open:f,onClose:h,maxWidth:"xl",fullWidth:!0,children:[e.jsx(M,{children:"Products"}),e.jsx(N,{children:e.jsx(V,{sx:{width:"100%"},children:e.jsx(pe,{onSelect:_,style:{width:"100%"}})})}),e.jsx(G,{children:e.jsx(v,{onClick:h,color:"primary",children:"Close"})})]})]})}H.propTypes={onSelect:w.func};function Q({onSelect:x}){const[f,m]=n.useState(!1),j=()=>{m(!0)},h=()=>{m(!1)},_=g=>{x(g),h()};return e.jsxs("div",{children:[e.jsx(v,{variant:"outlined",onClick:j,children:"Set"}),e.jsxs(R,{open:f,onClose:h,maxWidth:"xl",fullWidth:!0,children:[e.jsx(M,{children:"Customers"}),e.jsx(N,{sx:{padding:0},children:e.jsx(V,{sx:{width:"100%"},children:e.jsx(je,{onSelect:_,style:{width:"100%"}})})}),e.jsx(G,{children:e.jsx(v,{onClick:h,color:"primary",children:"Close"})})]})]})}Q.propTypes={onSelect:w.func};function X({orderId:x}){const f=ce(),[m,j]=n.useState(!1),[h,_]=n.useState(""),[g,J]=n.useState(""),[s,D]=n.useState({id:0,name:"",street:"",city:"",state:"",country:"",zip:"",phone:"",mobile:"",email:""}),[c,b]=n.useState([]),[F,K]=n.useState([]),[$,Y]=n.useState({}),[Z,W]=n.useState(0),[ee,A]=n.useState(0),[B,E]=n.useState("");n.useEffect(()=>{ae()},[]);const te=()=>{z(!0)},re=(t,r)=>{console.log("Fetching order totals");const a=`${q.baseURL}/api-proxy/proxy?method=post&resource=ordertotals`;console.log(a);const o=c.map(d=>({product_id:d[2].id,product_uom_qty:d[2].product_uom_qty})),p={partner_id:s.id,order_line:o};console.log("Request body",p),O.post(a,p,{headers:{Authorization:`Bearer ${P.get("jwt")}`}}).then(d=>{console.log(d.data),Y(d.data.result.product_prices),W(d.data.result.subtotal),A(d.data.result.total)}).catch(d=>{console.error("Error fetching order totals:",d)})};n.useEffect(()=>{re()},[s,c]);const oe=t=>{E(t.target.value)},z=t=>{j(!0),console.log("Saving Order");let r="post";t===!0&&(r="cancel");const a=`${q.baseURL}/api-proxy/proxy?method=${r}&resource=orders`;console.log(a),console.log(c);const o=c.map(l=>[l[0],l[1],{product_id:l[2].id,product_uom_qty:l[2].product_uom_qty}]),p=F.map(l=>[2,l[1],{}]),d=o.concat(p),y={order:{id:parseInt(x,10),partner_id:s.id,order_line:d,x_studio_notes:B}};console.log("Request body",y),O.post(a,y,{headers:{Authorization:`Bearer ${P.get("jwt")}`}}).then(l=>{console.log(l.data),j(!1),l.data.result.success===!1?alert(l.data.result.message):f.push(`/orders/${l.data.result.sale_order_id}`)}).catch(l=>{console.error("Error saving order:",l)})},ne=(t,r,a)=>{if(t<0||t>=c.length)return;const o=c.filter((d,y)=>y===t);o[0][0]!==0&&(console.log("Adding line to delete queue",o),K(F.concat(o)));const p=c.filter((d,y)=>y!==t);b(p)},se=(t,r)=>{const a=c.map((o,p)=>p===t?(console.log("handle qty change",o),[o[0],o[1],{...o[2],product_uom_qty:r!==0?Number(r):0}]):o);b(a)},C=t=>t?`$${t.toFixed(2)}`:"",ae=()=>{console.log("Fetching Order Details");const t=`${q.baseURL}/api-proxy/proxy?method=get&resource=orders&order_id=${x}`;console.log(t),O.get(t,{headers:{Authorization:`Bearer ${P.get("jwt")}`}}).then(r=>{console.log(r.data.data),_(r.data.data.name),D(r.data.data.customer_id),E(r.data.data.x_studio_notes);const a=r.data.data.order_line.map(o=>[1,o.id,{line_id:o.id,id:o.product_id.id,name:o.name,product_uom_qty:o.product_uom_qty}]);console.log(a),b(a),W(r.data.data.amount_untaxed),A(r.data.data.amount_total),J(r.data.data.state)}).catch(r=>{console.error("Error fetching order details:",r)})},de=t=>{console.log("Setting order partner"),console.log(t),D({id:t.id,name:t.name,street:t.street,city:t.city,state:t.state,country:t.country,zip:t.zip,phone:t.phone,mobile:t.mobile,email:t.email})},le=t=>{console.log("Adding order line"),console.log(t),b([...c,[0,0,{id:t.id,name:`[${t.default_code}] ${t.name}`,product_uom_qty:1}]])},ie=e.jsxs(e.Fragment,{children:[e.jsx(T,{spacing:3,direction:"row",alignItems:"center",children:e.jsx(L,{fullWidth:!0,name:"partner_id",label:"Customer",value:s.name,InputProps:{readOnly:!0,endAdornment:e.jsx(S,{children:e.jsx(Q,{onSelect:de})})}})}),s.name&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(i,{variant:"body1",fontWeight:"bold",children:"Address:"}),e.jsx(i,{variant:"body1",children:s.street}),e.jsxs(i,{variant:"body1",children:[s.city," ",s.state]}),e.jsxs(i,{variant:"body1",children:[s.country," ",s.zip]}),e.jsxs(i,{variant:"body1",children:[e.jsx("b",{children:"Phone:"})," ",s.phone]}),e.jsxs(i,{variant:"body1",children:[e.jsx("b",{children:"Mobile:"})," ",s.mobile]}),e.jsxs(i,{variant:"body1",children:[e.jsx("b",{children:"Email:"})," ",s.email]})]}),e.jsx(S,{children:e.jsx(H,{onSelect:le})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(ge,{component:ue,children:e.jsxs(ye,{children:[e.jsx(fe,{children:e.jsxs(k,{children:[e.jsx(u,{children:"Product"}),e.jsx(u,{children:"Unit Price"}),e.jsx(u,{children:"Qty"}),e.jsx(u,{children:"Subtotal"}),e.jsx(u,{})]})}),e.jsx(_e,{children:c.map((t,r)=>e.jsxs(k,{children:[e.jsx(u,{children:t[2].name}),e.jsx(u,{children:C($[t[2].id])}),e.jsx(u,{children:e.jsx(L,{type:"number",style:{minWidth:"100px"},value:t[2].product_uom_qty!==0?t[2].product_uom_qty:"",onChange:a=>se(r,a.target.value)})}),e.jsx(u,{children:C($[t[2].id]*t[2].product_uom_qty)}),e.jsx(u,{align:"right",children:e.jsx(S,{onClick:()=>ne(r),children:e.jsx(I,{icon:"eva:trash-2-outline"})})})]},r))})]})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsxs(i,{variant:"body1",fontWeight:"bold",children:["Subtotal: ",C(Z)]}),e.jsxs(i,{variant:"body1",fontWeight:"bold",children:["Total: ",C(ee)]}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(U,{container:!0,spacing:2,children:e.jsx(U,{item:!0,xs:12,md:6,lg:6,children:e.jsx(L,{label:"Notes",value:B,multiline:!0,fullWidth:!0,rows:4,onChange:oe})})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(me,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:z,loading:m,children:"Save"})]});return e.jsxs(be,{children:[e.jsxs(T,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[e.jsxs(i,{variant:"h4",children:["Order ",h," [",g,"]"]}),g==="draft"&&e.jsxs(T,{direction:"row",alignItems:"center",children:[e.jsx(i,{variant:"body1",sx:{color:"red"},children:"Cancel"}),e.jsxs(S,{onClick:te,sx:{color:"red"},children:[e.jsx(I,{icon:"eva:close-outline"})," "]})]})]}),ie,e.jsx(Ce,{})]})}X.propTypes={orderId:w.any};function Ae(){Se();const{orderId:x}=he();return e.jsxs(e.Fragment,{children:[e.jsx(xe,{children:e.jsx("title",{children:" Order Detail | BEX Sales "})}),e.jsx(X,{orderId:x})]})}export{Ae as default};