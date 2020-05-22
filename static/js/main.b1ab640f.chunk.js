(this.webpackJsonprouting=this.webpackJsonprouting||[]).push([[0],{139:function(e,n,t){e.exports=t(223)},164:function(e,n,t){},223:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),i=t(20),o=t.n(i),c=t(10),s=t(29),u=t(117),l=t(6),m=t(224),d=t(18),p=t.n(d),b=t(45),f=t(227),h=t(118),g=t.n(h).a.create({baseURL:"https://conduit.productionready.io/api"});g.interceptors.request.use((function(e){var n=localStorage.getItem("token");return n&&(g.defaults.headers.common.Authorization="Token ".concat(n)),e}));var E,v,w,O,x=g,j=t(119),y=function(e){var n=Object(j.a)({},e.response.data.errors);return Object.keys(n).forEach((function(e){n[e]=n[e].toString()})),n},k=function(e){return Object.keys(e.response.data.errors).map((function(n){return"".concat(n,": ").concat(e.response.data.errors[n][0])}))},S=Object(f.a)("USER_LOGIN_REQUEST"),R=Object(f.a)("USER_LOGIN_SUCCESS"),N=Object(f.a)("USER_LOGIN_FAILURE"),_=Object(f.a)("USER_LOGOUT"),A=Object(f.a)("USER_REGISTER_REQUEST"),L=Object(f.a)("USER_REGISTER_SUCCESS"),U=Object(f.a)("USER_REGISTER_FAILURE"),I=function(){return function(){var e=Object(b.a)(p.a.mark((function e(n){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(S()),e.prev=1,e.next=4,x.get("/user");case 4:t=e.sent,n(R(t.data)),e.next=12;break;case 8:throw e.prev=8,e.t0=e.catch(1),n(N({errors:e.t0.response})),e.t0;case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(n){return e.apply(this,arguments)}}()},T=Object(m.a)((E={},Object(l.a)(E,S,(function(){return"requested"})),Object(l.a)(E,R,(function(){return"finished"})),Object(l.a)(E,N,(function(){return"failed"})),E),"none"),q=Object(m.a)((v={},Object(l.a)(v,A,(function(){return"requested"})),Object(l.a)(v,L,(function(){return"finished"})),Object(l.a)(v,U,(function(){return"failed"})),v),"none"),F=Object(m.a)((w={},Object(l.a)(w,R,(function(e,n){return n.payload.user})),Object(l.a)(w,N,(function(e,n){return{errors:n.payload.errors}})),Object(l.a)(w,_,(function(){return{}})),w),{}),C=Object(m.a)((O={},Object(l.a)(O,R,(function(){return!0})),Object(l.a)(O,_,(function(){return!1})),O),!1),G=Object(s.c)({userLoginFetching:T,userRegisterFetching:q,user:F,isAuth:C}),P=(t(164),t(11)),D=t(34),V=t(30),X=t(12),z=t(60),B=t(61),J=t(67),Q=t(66),W=t(90),H="".concat("/Routing","/login"),$="".concat("/Routing","/singup"),K=function(e){return Object(c.b)((function(e){return{isAuth:e.isAuth}}))((function(n){var t=n.isAuth,a=localStorage.getItem("token");return t||a?r.a.createElement(e,n):r.a.createElement(V.a,{to:H})}))};function M(){var e=Object(P.a)(["\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  position: absolute;\n\n  .backdrop {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    align-items: center;\n    height: 100%;\n    width: 100%;\n  }\n\n  .loader {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-align: center;\n    align-items: center;\n    -webkit-box-pack: center;\n    justify-content: center;\n  }\n\n  .dot {\n    background: white;\n    margin: 5px;\n    -webkit-animation-name: loader;\n    animation-name: loader;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-iteration-count: infinite;\n    animation-iteration-count: infinite;\n    -webkit-animation-direction: alternate;\n    animation-direction: alternate;\n  }\n\n  .dot:nth-child(1) {\n    -webkit-animation-delay: 0.2s;\n    animation-delay: 0.2s;\n  }\n  .dot:nth-child(2) {\n    -webkit-animation-delay: 0.4s;\n    animation-delay: 0.4s;\n  }\n  .dot:nth-child(3) {\n    -webkit-animation-delay: 0.6s;\n    animation-delay: 0.6s;\n  }\n  .dot:nth-child(4) {\n    -webkit-animation-delay: 0.8s;\n    animation-delay: 0.8s;\n  }\n  .dot:nth-child(5) {\n    -webkit-animation-delay: 1s;\n    animation-delay: 1s;\n  }\n\n  @-webkit-keyframes loader {\n    from {\n      width: 2px;\n      height: 2px;\n      border-radius: 1px;\n    }\n    to {\n      width: 20px;\n      height: 20px;\n      border-radius: 10px;\n    }\n  }\n\n  @keyframes loader {\n    from {\n      width: 2px;\n      height: 2px;\n      border-radius: 1px;\n    }\n    to {\n      width: 20px;\n      height: 20px;\n      border-radius: 10px;\n    }\n  }\n"]);return M=function(){return e},e}var Y=X.a.div(M()),Z=function(){return r.a.createElement(Y,null,r.a.createElement("div",{className:"backdrop"},r.a.createElement("div",{className:"loader"},r.a.createElement("div",{className:"dot"}),r.a.createElement("div",{className:"dot"}),r.a.createElement("div",{className:"dot"}),r.a.createElement("div",{className:"dot"}),r.a.createElement("div",{className:"dot"}))))},ee=function(e){var n={loginUserToken:I},t=function(n){Object(J.a)(a,n);var t=Object(Q.a)(a);function a(){var e;Object(z.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).handleLoginAction=function(){(0,e.props.loginUserToken)()},e}return Object(B.a)(a,[{key:"render",value:function(){var n=this.props,t=n.isAuth,a=n.userLoginFetching,i=localStorage.getItem("token");return!t&&i&&"requested"!==a&&this.handleLoginAction(),!t&&i&&"finished"!==a?r.a.createElement(Z,null):r.a.createElement(e,this.props)}}]),a}(r.a.Component);return Object(c.b)((function(e){return{isAuth:e.isAuth,userLoginFetching:e.userLoginFetching}}),n)(t)};function ne(){var e=Object(P.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n"]);return ne=function(){return e},e}var te={logout:_},ae=function(e){Object(J.a)(t,e);var n=Object(Q.a)(t);function t(){var e;Object(z.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=n.call.apply(n,[this].concat(r))).logout=function(){var n=e.props.logout;localStorage.removeItem("token"),n()},e}return Object(B.a)(t,[{key:"render",value:function(){var e=this.props.user;return r.a.createElement("div",{className:"content"},r.a.createElement("h1",null,"Home page"),r.a.createElement(re,null,r.a.createElement("span",{className:"user-name"},e.username),r.a.createElement(W.a,{type:"link",onClick:this.logout},"Log out")),r.a.createElement("p",null,"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, aliquid velit repellendus accusamus quasi consequuntur. Perspiciatis eos error natus rem laborum, reiciendis omnis, maxime sapiente ducimus tempora molestias aut officia."))}}]),t}(r.a.Component),re=X.a.div(ne());ae.defaultProps={user:{}};var ie=K(ee(ae)),oe=Object(c.b)((function(e){return{user:e.user}}),te)(ie),ce=t(17),se=t(226),ue=t(1),le=t.n(ue);t(115);function me(){var e=Object(P.a)(["\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n\n  & .error {\n    margin-left: 20px;\n    color: tomato;\n  }\n"]);return me=function(){return e},e}function de(){var e=Object(P.a)(["\n  margin-bottom: 20px;\n"]);return de=function(){return e},e}var pe={singin:function(e){return function(){var n=Object(b.a)(p.a.mark((function n(t){var a,r;return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t(S()),n.prev=1,n.next=4,x.post("/users/login",{user:e});case 4:a=n.sent,t(R(a.data)),n.next=13;break;case 8:throw n.prev=8,n.t0=n.catch(1),r=k(n.t0),t(N({errors:r})),n.t0;case 13:case"end":return n.stop()}}),n,null,[[1,8]])})));return function(e){return n.apply(this,arguments)}}()}},be=function(e){var n=e.user,t=e.isAuth,a=e.userLoginFetching,i=e.singin;if(t)return localStorage.setItem("token",n.token),r.a.createElement(V.a,{to:"/Routing"});var o=function(e,n,t){return le()({error:n[e]&&t[e]})};return r.a.createElement("div",{className:"content"},r.a.createElement("h1",null,"Autorization:"),r.a.createElement(ce.c,{initialValues:{email:"",password:""},onSubmit:function(e){i(e)}},(function(e){var t=e.errors,i=e.touched;return r.a.createElement(ce.b,null,r.a.createElement(fe,null,r.a.createElement(ce.a,{as:se.a,className:o("email",t,i),type:"email",name:"email",placeholder:"Email",disabled:"requested"===a})),r.a.createElement(fe,null,r.a.createElement(ce.a,{as:se.a.Password,className:o("password",t,i),name:"password",placeholder:"Input your password",disabled:"requested"===a})),r.a.createElement(he,null,r.a.createElement("div",null,r.a.createElement(W.a,{type:"primary",htmlType:"submit",disabled:"requested"===a},"Sing In"),n.errors&&r.a.createElement("span",{className:"error"},n.errors)),r.a.createElement(W.a,{type:"link"},r.a.createElement(D.b,{to:$},"Create a new user"))))})))},fe=X.a.div(de()),he=X.a.div(me());be.defaultProps={user:{}};var ge=ee(be),Ee=Object(c.b)((function(e){return{userLoginFetching:e.userLoginFetching,user:e.user,isAuth:e.isAuth}}),pe)(ge);function ve(){var e=Object(P.a)(["\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n"]);return ve=function(){return e},e}function we(){var e=Object(P.a)(["\n  margin-bottom: 20px;\n\n  & .error {\n    border-color: tomato;\n  }\n\n  & .error-text {\n    margin-left: 5px;\n    color: tomato;\n  }\n"]);return we=function(){return e},e}var Oe={register:function(e){return function(){var n=Object(b.a)(p.a.mark((function n(t){return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t(A()),n.prev=1,n.next=4,x.post("/users",{user:e});case 4:t(L()),n.next=11;break;case 7:throw n.prev=7,n.t0=n.catch(1),t(U()),n.t0;case 11:case"end":return n.stop()}}),n,null,[[1,7]])})));return function(e){return n.apply(this,arguments)}}()}},xe=X.a.div(we()),je=X.a.div(ve()),ye=ee((function(e){var n=e.isAuth,t=e.userRegisterFetching,a=e.register;if(n||"finished"===t)return r.a.createElement(V.a,{to:H});var i=function(e,n,t){return le()({error:n[e]&&t[e]})};return r.a.createElement("div",{className:"content"},r.a.createElement("h1",null,"Register a new user account:"),r.a.createElement(ce.c,{initialValues:{username:"",email:"",password:""},onSubmit:function(){var e=Object(b.a)(p.a.mark((function e(n,t){var r,i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.setErrors,e.prev=1,e.next=4,a(n);case 4:e.next=10;break;case 6:e.prev=6,e.t0=e.catch(1),i=y(e.t0),r(i);case 10:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(n,t){return e.apply(this,arguments)}}()},(function(e){var n=e.errors,a=e.touched;return r.a.createElement(ce.b,null,r.a.createElement(xe,null,r.a.createElement(ce.a,{as:se.a,className:i("username",n,a),name:"username",placeholder:"Username",disabled:"requested"===t}),n.username&&a.username&&r.a.createElement("span",{className:"error-text"},n.username)),r.a.createElement(xe,null,r.a.createElement(ce.a,{as:se.a,className:i("email",n,a),type:"email",name:"email",placeholder:"Email",disabled:"requested"===t}),n.email&&a.email&&r.a.createElement("span",{className:"error-text"},n.email)),r.a.createElement(xe,null,r.a.createElement(ce.a,{as:se.a.Password,className:i("password",n,a),name:"password",placeholder:"Input your password",disabled:"requested"===t}),n.password&&a.password&&r.a.createElement("span",{className:"error-text"},n.password)),r.a.createElement(je,null,r.a.createElement(W.a,{type:"primary",htmlType:"submit",disabled:"requested"===t},"Sign Up"),r.a.createElement(W.a,{type:"link"},r.a.createElement(D.b,{to:H},"Login"))))})))})),ke=Object(c.b)((function(e){return{isAuth:e.isAuth,userRegisterFetching:e.userRegisterFetching}}),Oe)(ye);function Se(){var e=Object(P.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 50px 0;\n  height: 100vh;\n  background: rgb(2, 0, 36);\n  background: linear-gradient(\n    25deg,\n    rgba(2, 0, 36, 1) 0%,\n    rgba(9, 9, 121, 1) 20%,\n    rgba(0, 212, 255, 1) 100%\n  );\n\n  & .content {\n    width: 40%;\n\n    padding: 20px;\n\n    background-color: #fff;\n    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.5);\n    border: 2px solid lightblue;\n    border-radius: 5px;\n\n    & h1 {\n      margin: 0;\n      margin-bottom: 20px;\n      font-size: 24px;\n      font-weight: 400;\n    }\n\n    & p {\n      margin: 0;\n    }\n  }\n"]);return Se=function(){return e},e}var Re=X.a.div(Se()),Ne=function(){return r.a.createElement(Re,null,r.a.createElement(D.a,null,r.a.createElement(V.d,null,r.a.createElement(V.b,{path:"/Routing",exact:!0,component:oe}),r.a.createElement(V.b,{path:H,exact:!0,component:Ee}),r.a.createElement(V.b,{path:$,exact:!0,component:ke}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var _e=Object(s.e)(G,Object(s.d)(Object(s.a)(u.a),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()));o.a.render(r.a.createElement(c.a,{store:_e},r.a.createElement(Ne,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[139,1,2]]]);
//# sourceMappingURL=main.b1ab640f.chunk.js.map