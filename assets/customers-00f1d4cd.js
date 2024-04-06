import{j as e,v as K,T as C,P as n,B as V,w as X,x as Z,I as G,y as J,r as i,z as Q,A as Y,S as ee,h as te,C as ne,W as se}from"./index-58ea0f34.js";import{T as j,a as c,b as re,c as ae,s as oe,d as ie,e as ce,f as le,g as de}from"./search-fill-3b0d23cc.js";import{O as ue}from"./Select-73143bba.js";import{C as he}from"./Container-c52c4247.js";import{C as pe}from"./Card-8f4d38d7.js";import{u as me}from"./use-auth-8f151975.js";import"./Menu-6b3eeb48.js";const xe={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function ge(t,a,o){return t?Math.max(0,(1+t)*a-o):0}function k({query:t}){return e.jsx(j,{children:e.jsx(c,{align:"center",colSpan:6,sx:{py:3},children:e.jsxs(K,{sx:{textAlign:"center"},children:[e.jsx(C,{variant:"h6",paragraph:!0,children:"Not found"}),e.jsxs(C,{variant:"body2",children:["No results found for  ",e.jsxs("strong",{children:['"',t,'"']}),".",e.jsx("br",{})," Try checking for typos or using complete words."]})]})})})}k.propTypes={query:n.string};function I({selected:t,name:a,street:o,city:d,state:p,country:r,zip:m,phone:b,mobile:f,email:y,handleClick:h}){return e.jsxs(j,{hover:!0,tabIndex:-1,children:[e.jsx(c,{children:a}),e.jsx(c,{children:o}),e.jsx(c,{children:d}),e.jsx(c,{children:p}),e.jsx(c,{children:r}),e.jsx(c,{children:m}),e.jsx(c,{children:b}),e.jsx(c,{children:f}),e.jsx(c,{children:y})]})}I.propTypes={selected:n.any,name:n.any,street:n.any,city:n.any,state:n.any,country:n.any,zip:n.any,phone:n.any,mobile:n.any,email:n.any,handleClick:n.func};function z({order:t,orderBy:a,headLabel:o,onRequestSort:d}){const p=r=>m=>{d(m,r)};return e.jsx(re,{children:e.jsx(j,{children:o.map(r=>e.jsx(c,{align:r.align||"left",sortDirection:a===r.id?t:!1,sx:{width:r.width,minWidth:r.minWidth},children:e.jsxs(ae,{hideSortIcon:!0,active:a===r.id,direction:a===r.id?t:"asc",onClick:p(r.id),children:[r.label,a===r.id?e.jsx(V,{sx:{...xe},children:t==="desc"?"sorted descending":"sorted ascending"}):null]})},r.id))})})}z.propTypes={order:n.oneOf(["asc","desc"]),orderBy:n.string,headLabel:n.array,onRequestSort:n.func};function A({emptyRows:t,height:a}){return t?e.jsx(j,{sx:{...a&&{height:a*t}},children:e.jsx(c,{colSpan:9})}):null}A.propTypes={emptyRows:n.number,height:n.number};function F({filterName:t,onFilterName:a,onClickSearch:o,onHitEnter:d}){return e.jsx(X,{sx:{height:96,display:"flex",justifyContent:"space-between",p:p=>p.spacing(0,1,0,3)},children:e.jsx(ue,{value:t,onChange:a,onKeyDown:d,placeholder:"Search customer...",endAdornment:e.jsx(Z,{position:"end",children:e.jsx(G,{onClick:o,edge:"end",children:e.jsx(J,{icon:oe,sx:{color:"text.disabled",width:20,height:20}})})})})})}F.propTypes={filterName:n.string,onFilterName:n.func,onClickSearch:n.func,onHitEnter:n.func};function fe(){const[t,a]=i.useState([]),[o,d]=i.useState(0),[p,r]=i.useState(0),[m,b]=i.useState("asc"),[f,y]=i.useState("name"),[h,B]=i.useState(""),[l,O]=i.useState(25),[q,H]=i.useState(0),R=i.useRef(t),P=i.useRef(l),w=i.useRef(o),v=i.useRef(h);i.useEffect(()=>{R.current=t,P.current=l,w.current=o,v.current=h,S(w.current,P.current,R.current,v.current)},[]);const S=(s,u,x,E)=>{console.log("Fetching Customers");const _=s+1;let T=`${ne.baseURL}/api-proxy/proxy?method=get&resource=customers&page=${_}&page_size=${u}`;E&&(T+=`&name=${E}`),console.log(T),Q.get(T,{headers:{Authorization:`Bearer ${Y.get("jwt")}`}}).then(g=>{console.log(g.data.data),a([...x,...g.data.data]),H(g.data.count)}).catch(g=>{console.error("Error fetching customers:",g)})},U=(s,u)=>{u!==""&&(b(f===u&&m==="asc"?"desc":"asc"),y(u))},$=(s,u)=>{d(u);const x=l*u;x>p&&(r(x),S(u,l,t,h))},L=s=>{d(0),O(parseInt(s.target.value,10))},W=s=>{B(s.target.value)},D=s=>{s.key==="Enter"&&N()},N=s=>{d(0),S(o,l,[],h)},M=!t.length&&!!h;return e.jsxs(he,{children:[e.jsx(ee,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:e.jsx(C,{variant:"h4",children:"Customers"})}),e.jsxs(pe,{children:[e.jsx(F,{filterName:h,onFilterName:W,onClickSearch:N,onHitEnter:D}),e.jsx(te,{children:e.jsx(ie,{sx:{overflow:"unset"},children:e.jsxs(ce,{sx:{minWidth:800},children:[e.jsx(z,{order:m,orderBy:f,rowCount:t.length,onRequestSort:U,headLabel:[{id:"name",label:"Name"},{id:"street",label:"Street"},{id:"city",label:"City"},{id:"state",label:"State"},{id:"country",label:"Country"},{id:"zip",label:"Zip"},{id:"phone",label:"Phone"},{id:"mobile",label:"Mobile"},{id:"email",label:"Email"}]}),e.jsxs(le,{children:[t.slice(o*l,o*l+l).map(s=>e.jsx(I,{name:s.name,street:s.street,city:s.city,state:s.state_id.name,country:s.country_id.name,zip:s.zip,phone:s.phone,mobile:s.mobile,email:s.email},s.id)),e.jsx(A,{height:77,emptyRows:ge(o,l,t.length)}),M&&e.jsx(k,{query:h})]})]})})}),e.jsx(de,{page:o,component:"div",count:q,rowsPerPage:l,onPageChange:$,rowsPerPageOptions:[25],onRowsPerPageChange:L})]})]})}function Pe(){return me(),e.jsxs(e.Fragment,{children:[e.jsx(se,{children:e.jsx("title",{children:" Customer | BEX Sales "})}),e.jsx(fe,{})]})}export{Pe as default};
