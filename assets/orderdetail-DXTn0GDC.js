import{r as d,j as e,x as v,P as L,w as ae,E as O,G as P,S as T,y as C,T as i,H as de,z as B,F as q,N as le,W as ie}from"./index-C4aEVAIO.js";import{P as ce}from"./product-view-yWfXX181.js";import{D as I,a as U,b as k,c as R}from"./DialogTitle-CuyA9zbL.js";import{F as M,T as E,L as ue}from"./LoadingButton-CknKQFc2.js";import{C as he}from"./customer-view-BxdNVutC.js";import{d as pe,e as xe,b as me,T as z,a as u,f as je}from"./search-fill-DgZ60Vpt.js";import{C as ge}from"./Container-XkK8WIan.js";import{C as ye}from"./Card-B8I5Ci5u.js";import{u as fe}from"./use-auth-BMt8vlfP.js";import"./Select-D1m6HJc_.js";import"./isMuiElement-DOFGs5mA.js";function N({onSelect:p}){const[f,m]=d.useState(!1),j=()=>{m(!0)},h=()=>{m(!1)},_=g=>{p(g),h()};return e.jsxs("div",{children:[e.jsx(v,{variant:"outlined",onClick:j,children:"Add Product"}),e.jsxs(I,{open:f,onClose:h,maxWidth:"xl",fullWidth:!0,children:[e.jsx(U,{children:"Products"}),e.jsx(k,{children:e.jsx(M,{sx:{width:"100%"},children:e.jsx(ce,{onSelect:_,style:{width:"100%"}})})}),e.jsx(R,{children:e.jsx(v,{onClick:h,color:"primary",children:"Close"})})]})]})}N.propTypes={onSelect:L.func};function V({onSelect:p}){const[f,m]=d.useState(!1),j=()=>{m(!0)},h=()=>{m(!1)},_=g=>{p(g),h()};return e.jsxs("div",{children:[e.jsx(v,{variant:"outlined",onClick:j,children:"Set"}),e.jsxs(I,{open:f,onClose:h,maxWidth:"xl",fullWidth:!0,children:[e.jsx(U,{children:"Customers"}),e.jsx(k,{sx:{padding:0},children:e.jsx(M,{sx:{width:"100%"},children:e.jsx(he,{onSelect:_,style:{width:"100%"}})})}),e.jsx(R,{children:e.jsx(v,{onClick:h,color:"primary",children:"Close"})})]})]})}V.propTypes={onSelect:L.func};function G({orderId:p}){const f=ae(),[m,j]=d.useState(!1),[h,_]=d.useState(""),[g,H]=d.useState(""),[n,w]=d.useState({id:0,name:"",street:"",city:"",state:"",country:"",zip:"",phone:"",mobile:"",email:""}),[c,b]=d.useState([]),[D,Q]=d.useState([]),[F,X]=d.useState({}),[J,$]=d.useState(0),[K,W]=d.useState(0);d.useEffect(()=>{re()},[]);const Y=()=>{A(!0)},Z=(t,r)=>{console.log("Fetching order totals");const s=`${q.baseURL}/api-proxy/proxy?method=post&resource=ordertotals`;console.log(s);const o=c.map(a=>({product_id:a[2].id,product_uom_qty:a[2].product_uom_qty})),x={partner_id:n.id,order_line:o};console.log("Request body",x),O.post(s,x,{headers:{Authorization:`Bearer ${P.get("jwt")}`}}).then(a=>{console.log(a.data),X(a.data.result.product_prices),$(a.data.result.subtotal),W(a.data.result.total)}).catch(a=>{console.error("Error fetching order totals:",a)})};d.useEffect(()=>{Z()},[n,c]);const A=t=>{j(!0),console.log("Saving Order");let r="post";t===!0&&(r="cancel");const s=`${q.baseURL}/api-proxy/proxy?method=${r}&resource=orders`;console.log(s),console.log(c);const o=c.map(l=>[l[0],l[1],{product_id:l[2].id,product_uom_qty:l[2].product_uom_qty}]),x=D.map(l=>[2,l[1],{}]),a=o.concat(x),y={order:{id:parseInt(p,10),partner_id:n.id,order_line:a}};console.log("Request body",y),O.post(s,y,{headers:{Authorization:`Bearer ${P.get("jwt")}`}}).then(l=>{console.log(l.data),j(!1),f.push(`/orders/${l.data.result.sale_order_id}`)}).catch(l=>{console.error("Error fetching customers:",l)})},ee=(t,r,s)=>{if(t<0||t>=c.length)return;const o=c.filter((a,y)=>y===t);o[0][0]!==0&&(console.log("Adding line to delete queue",o),Q(D.concat(o)));const x=c.filter((a,y)=>y!==t);b(x)},te=(t,r)=>{const s=c.map((o,x)=>x===t?(console.log("handle qty change",o),[o[0],o[1],{...o[2],product_uom_qty:r!==0?Number(r):0}]):o);b(s)},S=t=>t?`$${t.toFixed(2)}`:"",re=()=>{console.log("Fetching Order Details");const t=`${q.baseURL}/api-proxy/proxy?method=get&resource=orders&order_id=${p}`;console.log(t),O.get(t,{headers:{Authorization:`Bearer ${P.get("jwt")}`}}).then(r=>{console.log(r.data.data),_(r.data.data.name),w(r.data.data.customer_id);const s=r.data.data.order_line.map(o=>[1,o.id,{line_id:o.id,id:o.product_id.id,name:o.name,product_uom_qty:o.product_uom_qty}]);console.log(s),b(s),$(r.data.data.amount_untaxed),W(r.data.data.amount_total),H(r.data.data.state)}).catch(r=>{console.error("Error fetching order details:",r)})},oe=t=>{console.log("Setting order partner"),console.log(t),w({id:t.id,name:t.name,street:t.street,city:t.city,state:t.state,country:t.country,zip:t.zip,phone:t.phone,mobile:t.mobile,email:t.email})},ne=t=>{console.log("Adding order line"),console.log(t),b([...c,[0,0,{id:t.id,name:`[${t.default_code}] ${t.name}`,product_uom_qty:1}]])},se=e.jsxs(e.Fragment,{children:[e.jsx(T,{spacing:3,direction:"row",alignItems:"center",children:e.jsx(E,{fullWidth:!0,name:"partner_id",label:"Customer",value:n.name,InputProps:{readOnly:!0,endAdornment:e.jsx(C,{children:e.jsx(V,{onSelect:oe})})}})}),n.name&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(i,{variant:"body1",fontWeight:"bold",children:"Address:"}),e.jsx(i,{variant:"body1",children:n.street}),e.jsxs(i,{variant:"body1",children:[n.city," ",n.state]}),e.jsxs(i,{variant:"body1",children:[n.country," ",n.zip]}),e.jsxs(i,{variant:"body1",children:[e.jsx("b",{children:"Phone:"})," ",n.phone]}),e.jsxs(i,{variant:"body1",children:[e.jsx("b",{children:"Mobile:"})," ",n.mobile]}),e.jsxs(i,{variant:"body1",children:[e.jsx("b",{children:"Email:"})," ",n.email]})]}),e.jsx(C,{children:e.jsx(N,{onSelect:ne})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(pe,{component:de,children:e.jsxs(xe,{children:[e.jsx(me,{children:e.jsxs(z,{children:[e.jsx(u,{children:"Product"}),e.jsx(u,{children:"Unit Price"}),e.jsx(u,{children:"Qty"}),e.jsx(u,{children:"Subtotal"}),e.jsx(u,{})]})}),e.jsx(je,{children:c.map((t,r)=>e.jsxs(z,{children:[e.jsx(u,{children:t[2].name}),e.jsx(u,{children:S(F[t[2].id])}),e.jsx(u,{children:e.jsx(E,{type:"number",style:{minWidth:"100px"},value:t[2].product_uom_qty!==0?t[2].product_uom_qty:"",onChange:s=>te(r,s.target.value)})}),e.jsx(u,{children:S(F[t[2].id]*t[2].product_uom_qty)}),e.jsx(u,{align:"right",children:e.jsx(C,{onClick:()=>ee(r),children:e.jsx(B,{icon:"eva:trash-2-outline"})})})]},r))})]})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsxs(i,{variant:"body1",fontWeight:"bold",children:["Subtotal: ",S(J)]}),e.jsxs(i,{variant:"body1",fontWeight:"bold",children:["Total: ",S(K)]}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(ue,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:A,loading:m,children:"Save"})]});return e.jsxs(ge,{children:[e.jsxs(T,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[e.jsxs(i,{variant:"h4",children:["Order ",h," [",g,"]"]}),g==="draft"&&e.jsxs(T,{direction:"row",alignItems:"center",children:[e.jsx(i,{variant:"body1",sx:{color:"red"},children:"Cancel"}),e.jsxs(C,{onClick:Y,sx:{color:"red"},children:[e.jsx(B,{icon:"eva:close-outline"})," "]})]})]}),se,e.jsx(ye,{})]})}G.propTypes={orderId:L.any};function De(){fe();const{orderId:p}=le();return e.jsxs(e.Fragment,{children:[e.jsx(ie,{children:e.jsx("title",{children:" Order Detail | BEX Sales "})}),e.jsx(G,{orderId:p})]})}export{De as default};
