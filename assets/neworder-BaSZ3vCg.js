import{r as d,j as e,x as _,P as N,w as xe,S as L,C as T,T as u,G as ye,D as ge,A as q,y as w,z as O,W as je}from"./index-q-doEjRX.js";import{P as me,C as fe}from"./product-view-DjvV0qPs.js";import{D as E,a as z,b as D,c as I,G as C}from"./Grid-B3twjIGj.js";import{F as M,T as S,L as _e}from"./LoadingButton-K0EtJydN.js";import{C as be}from"./customer-view-BokrV-Km.js";import{d as ve,e as Ce,b as Se,T as B,a as c,f as Pe}from"./search-fill-BoizWRcj.js";import{C as Te}from"./Container-BJIRdhTu.js";import{C as qe}from"./Card-Bh2mXYro.js";import{u as we}from"./use-auth-BCAmPnc2.js";import"./Select-W9zZeV8F.js";import"./isMuiElement-DMhMLA04.js";function Q({onSelect:m}){const[f,x]=d.useState(!1),a=()=>{x(!0)},p=()=>{x(!1)},i=j=>{m(j),p()};return e.jsxs("div",{children:[e.jsx(_,{variant:"outlined",onClick:a,children:"Add Product"}),e.jsxs(E,{open:f,onClose:p,maxWidth:"xl",fullWidth:!0,children:[e.jsx(z,{children:"Products"}),e.jsx(D,{children:e.jsx(M,{sx:{width:"100%"},children:e.jsx(me,{onSelect:i,style:{width:"100%"}})})}),e.jsx(I,{children:e.jsx(_,{onClick:p,color:"primary",children:"Close"})})]})]})}Q.propTypes={onSelect:N.func};function V({onSelect:m}){const[f,x]=d.useState(!1),a=()=>{x(!0)},p=()=>{x(!1)},i=j=>{m(j),p()};return e.jsxs("div",{children:[e.jsx(_,{variant:"outlined",onClick:a,children:"Set"}),e.jsxs(E,{open:f,onClose:p,maxWidth:"xl",fullWidth:!0,children:[e.jsx(z,{children:"Customers"}),e.jsx(D,{sx:{padding:0},children:e.jsx(M,{sx:{width:"100%"},children:e.jsx(be,{onSelect:i,style:{width:"100%"}})})}),e.jsx(I,{children:e.jsx(_,{onClick:p,color:"primary",children:"Close"})})]})]})}V.propTypes={onSelect:N.func};function Oe(){const m=xe(),[f,x]=d.useState(!1),[a,p]=d.useState({id:0,name:"",street:"",city:"",state:"",country:"",zip:"",phone:"",mobile:"",email:""}),[i,j]=d.useState([]),[k,G]=d.useState({}),[K,H]=d.useState(0),[X,J]=d.useState(0),[Y,Z]=d.useState(0),[A,ee]=d.useState(""),[$,te]=d.useState(""),[F,re]=d.useState(""),R=new FileReader,U=d.useRef(null);function oe(t,o=","){let s=t.slice(0,t.indexOf(`
`)).split(o);return s=s.map(n=>n.replace(`
`,"").replace("\r","")),t.slice(t.indexOf(`
`)+1).split(`
`).map(n=>{const y=n.split(o).map(h=>h.replace(`
`,"").replace("\r",""));return s.reduce((h,g,v)=>(h[g]=y[v],h),{})})}const se=()=>{U.current.click()},ne=async t=>{const o=t.target.files[0];re(o.name),R.onload=async s=>{const r=oe(s.target.result);r.pop(),console.log(r);const l=[],n=r.map(y=>{const P=`${q.baseURL}/api-proxy/proxy?method=get&resource=products&exact_match=true&name=${y.sku}`;return console.log(P),w.get(P,{headers:{Authorization:`Bearer ${O.get("jwt")}`}}).then(h=>{if(console.log(h.data.data),Array.isArray(h.data.data)&&h.data.data.length===0)alert(`There appears to be an issue with your CSV file. Please review and correct it. Product ${y.sku} not found.`);else{const g=h.data.data[0];g.category=g.categ_id.name,g.attributes=g.product_template_attribute_value_ids.map(v=>`${v.attribute}:${v.name}`),g.product_uom_qty=Number(y.qty),l.push(g)}}).catch(h=>{console.error("Error fetching products:",h)})});await Promise.all(n),console.log(`Total products fetched: ${l.length}`),l.length===r.length&&(console.log("Setting products"),console.log(l),l.forEach(y=>{W(y,y.product_uom_qty)})),t.target.value=null},R.readAsText(o)},ae=(t,o)=>{console.log("Fetching order totals");const s=`${q.baseURL}/api-proxy/proxy?method=post&resource=ordertotals`;console.log(s);const r=i.map(n=>({product_id:n.id,product_uom_qty:n.product_uom_qty})),l={partner_id:a.id,order_line:r};console.log("Request body",l),w.post(s,l,{headers:{Authorization:`Bearer ${O.get("jwt")}`}}).then(n=>{console.log(n.data),G(n.data.result.product_prices),H(n.data.result.subtotal),J(n.data.result.total)}).catch(n=>{console.error("Error fetching order totals:",n)})};d.useEffect(()=>{ae();const t=i.reduce((o,s)=>o+s.product_uom_qty,0);Z(t)},[a,i]);const le=(t,o,s)=>{if(t<0||t>=i.length)return;const r=i.filter((l,n)=>n!==t);j(r)},ie=(t,o)=>{const s=i.map((r,l)=>{if(l===t){console.log(r),console.log(o);const n=["consu","service"];return r.qty_available<o&&!n.includes(r.type)?(alert("Quantity available is insufficient."),r):{...r,product_uom_qty:o!==0?Number(o):0}}return r});j(s)},b=t=>t?`$${t.toFixed(2)}`:"",ce=t=>{console.log("Setting order partner"),console.log(t),p({id:t.id,name:t.name,street:t.street,city:t.city,state:t.state,country:t.country,zip:t.zip,phone:t.phone,mobile:t.mobile,email:t.email})},W=(t,o)=>{console.log("Adding order line"),console.log(t);let s=!1;i.forEach(l=>{l.id===t.id&&(s=!0)});const r=["consu","service"];t.qty_available<1&&!r.includes(t.type)?alert(`Cannot add product lines with 0 qty available: SKU ${t.default_code}`):s?alert(`Product has already been added: SKU ${t.default_code}`):j(l=>[...l,{id:t.id,name:t.name,default_code:t.default_code,category:t.category,type:t.type,lst_price:t.lst_price,invoice_policy:t.invoice_policy,description_sale:t.description_sale,attributes:t.attributes,sale_ok:t.sale_ok,purchase_ok:t.purchase_ok,sales_count:t.sales_count,product_uom_qty:o||1,qty_available:t.qty_available}])},de=t=>{ee(t.target.value)},ue=t=>{te(t.target.value)},he=()=>{x(!0),console.log("Creating an order");const t=`${q.baseURL}/api-proxy/proxy?method=post&resource=orders`;console.log(t),console.log(i);const o=i.map(r=>({product_id:r.id,product_uom_qty:r.product_uom_qty}));console.log(o);const s={order:{partner_id:a.id,order_line:o,x_studio_notes:A,client_order_ref:$}};console.log("Request body",s),w.post(t,s,{headers:{Authorization:`Bearer ${O.get("jwt")}`}}).then(r=>{console.log(r.data),x(!1),m.push(`/orders/${r.data.result.sale_order_id}`)}).catch(r=>{console.error("Error fetching customers:",r)})},pe=e.jsxs(e.Fragment,{children:[e.jsx(L,{spacing:3,direction:"row",alignItems:"center",children:e.jsx(S,{fullWidth:!0,name:"partner_id",label:"Customer",value:a.name,InputProps:{readOnly:!0,endAdornment:e.jsx(T,{children:e.jsx(V,{onSelect:ce})})}})}),a.name&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(u,{variant:"body1",fontWeight:"bold",children:"Address:"}),e.jsx(u,{variant:"body1",children:a.street}),e.jsxs(u,{variant:"body1",children:[a.city," ",a.state]}),e.jsxs(u,{variant:"body1",children:[a.country," ",a.zip]}),e.jsxs(u,{variant:"body1",children:[e.jsx("b",{children:"Phone:"})," ",a.phone]}),e.jsxs(u,{variant:"body1",children:[e.jsx("b",{children:"Mobile:"})," ",a.mobile]}),e.jsxs(u,{variant:"body1",children:[e.jsx("b",{children:"Email:"})," ",a.email]})]}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(T,{children:e.jsx(Q,{onSelect:W})}),e.jsx("input",{type:"file",accept:".csv",onChange:ne,ref:U,style:{display:"none"}}),e.jsx(_,{variant:"contained",color:"primary",onClick:se,children:"Upload CSV"}),F&&e.jsxs(u,{variant:"body1",style:{marginTop:"10px"},children:["Selected file: ",F]}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(ve,{component:ye,children:e.jsxs(Ce,{children:[e.jsx(Se,{children:e.jsxs(B,{children:[e.jsx(c,{children:"Product"}),e.jsx(c,{children:"Attributes"}),e.jsx(c,{children:"Unit Price"}),e.jsx(c,{children:"Qty Available"}),e.jsx(c,{children:"Qty"}),e.jsx(c,{children:"Subtotal"}),e.jsx(c,{})]})}),e.jsx(Pe,{children:i.map((t,o)=>e.jsxs(B,{children:[e.jsxs(c,{children:["[",t.default_code,"] ",t.name]}),e.jsx(c,{children:t.attributes.map((s,r)=>e.jsx(fe,{label:s,variant:"outlined"},r))}),e.jsx(c,{children:b(k[t.id])}),e.jsx(c,{children:t.qty_available}),e.jsx(c,{children:e.jsx(S,{type:"number",style:{minWidth:"100px"},value:t.product_uom_qty!==0?t.product_uom_qty:"",onChange:s=>ie(o,s.target.value)})}),e.jsx(c,{children:b(k[t.id]*t.product_uom_qty)}),e.jsx(c,{align:"right",children:e.jsx(T,{onClick:()=>le(o),children:e.jsx(ge,{icon:"eva:trash-2-outline"})})})]},o))})]})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsxs(u,{variant:"body1",fontWeight:"bold",children:["Total Product Qty: ",Y]}),e.jsxs(u,{variant:"body1",fontWeight:"bold",children:["Subtotal: ",b(K)]}),e.jsxs(u,{variant:"body1",fontWeight:"bold",children:["Total: ",b(X)]}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(C,{container:!0,spacing:2,children:e.jsx(C,{item:!0,xs:12,md:6,lg:6,children:e.jsx(S,{label:"Notes",value:A,multiline:!0,fullWidth:!0,rows:4,onChange:de})})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(C,{container:!0,spacing:2,children:e.jsx(C,{item:!0,xs:12,md:6,lg:6,children:e.jsx(S,{label:"PO Number",value:$,fullWidth:!0,onChange:ue})})}),e.jsx("div",{style:{margin:"16px 0"}}),e.jsx(_e,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:he,loading:f,children:"Create"})]});return e.jsxs(Te,{children:[e.jsx(L,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:e.jsx(u,{variant:"h4",children:"New Order"})}),pe,e.jsx(qe,{})]})}function ze(){return we(),e.jsxs(e.Fragment,{children:[e.jsx(je,{children:e.jsx("title",{children:" New Order | BEX Sales "})}),e.jsx(Oe,{})]})}export{ze as default};
