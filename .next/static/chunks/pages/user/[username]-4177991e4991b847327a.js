_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[51],{"5D78":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n("wvHr");function a(e){return e.success?Object(r.b)({title:e.title,content:e.content,alertType:"success"}):Object(r.b)({title:e.title,content:e.content,alertType:"error"}),e.success}},"EE/t":function(e,t,n){"use strict";n.r(t);var r=n("vJKn"),a=n.n(r),c=n("rg98"),s=n("H+61"),i=n("UlJF"),u=n("+Css"),o=n("7LId"),l=n("VIvw"),f=n("iHvq"),j=n("cpVT"),p=n("nKUr"),b=n("q1tI"),h=n.n(b),d=n("8Kt/"),O=n.n(d),m=n("nOHt"),v=n("pJr+"),x=n("Au3V"),y=n("bTPZ"),w=n("tJ/W"),_=n("HXPj"),g=n("IgCw"),k=n("dSKx"),q=n("AoAR"),S=n("5D78");function R(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(f.a)(e);if(t){var a=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var C=function(e){Object(o.a)(n,e);var t=R(n);function n(e){var r;return Object(s.a)(this,n),r=t.call(this,e),Object(j.a)(Object(u.a)(r),"context",void 0),Object(j.a)(Object(u.a)(r),"getData",Object(c.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(q.p)(r.props.router.query.username);case 2:t=e.sent,r.setState({user:t});case 4:case"end":return e.stop()}}),e)})))),Object(j.a)(Object(u.a)(r),"update",Object(c.a)(a.a.mark((function e(){var t,n,c,s,i,u,o,l,f,j;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.setState({loading:!0}),t=r.state.user,n=t.username,c=t.email,s=t.ns_id,i=t.ns_name,u=t.ac_name,o=t.ac_island,l=t.qq,f=t.avatar,e.next=4,Object(q.P)(n,c,f,s,i,u,o,l,r.state.password);case 4:j=e.sent,Object(S.a)(j)&&(r.props.router.push("/user/[username]","/user/".concat(n)),r.context.callback({user:r.state.user})),r.setState({loading:!1});case 7:case"end":return e.stop()}}),e)})))),r.state={user:r.props.user,loading:!1,loadingAvatar:!1,password:""},r}return Object(i.a)(n,[{key:"componentDidMount",value:function(){this.getData()}},{key:"render",value:function(){var e=this,t=[{key:"avatar",name:"\u5934\u50cf",self:!0,rewrite:function(e){return e.replace("http://","https://")}},{key:"username",name:"\u7528\u6237\u540d",self:!1},{key:"email",name:"\u90ae\u7bb1",self:!1},{key:"qq",name:"QQ \u53f7",self:!0},{key:"ns_id",name:"NS ID",self:!1,prefix:"SW",rewrite:function(e){return e.replace(/[^0-9\-]/g,"")}},{key:"ns_name",name:"NS \u540d\u79f0",self:!1},{key:"ac_name",name:"\u52a8\u68ee\u540d\u79f0",self:!1},{key:"ac_island",name:"\u52a8\u68ee\u5c9b\u540d",self:!1,suffix:"\u5c9b",rewrite:function(e){return e.length>0&&"\u5c9b"==e[e.length-1]&&(e=e.slice(0,e.length-1)),e}}],n=this.state.user.self?t:t.filter((function(e){return!e.self}));return Object(p.jsxs)(y.a,{neumorphism:!0,children:[Object(p.jsx)(k.a.Consumer,{children:function(t){return Object(p.jsx)(O.a,{children:Object(p.jsx)("title",{children:"".concat(e.props.router.query.username,"|\u7528\u6237\u9875|").concat(t.blog_name)})})}}),Object(p.jsxs)(v.a,{direction:"TB",fullWidth:!0,children:[Object(p.jsx)(_.a,{style:{fontSize:128,margin:"auto"},src:this.state.user.avatar}),Object(p.jsx)(g.a,{condition:this.state.user.self,children:Object(p.jsxs)(v.a,{children:[Object(p.jsx)(x.b,{neumorphism:!0,loading:this.state.loadingAvatar,onClick:Object(c.a)(a.a.mark((function t(){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setState({loadingAvatar:!0}),t.next=3,Object(q.g)(e.state.user.email);case 3:n=t.sent,e.setState((function(e){var t=e.user;return t.avatar=n.avatar,{user:t,loadingAvatar:!1}}));case 5:case"end":return t.stop()}}),t)}))),children:"\u6839\u636e\u90ae\u7bb1\u66f4\u65b0 Github\u3001Gavatar \u5934\u50cf"}),Object(p.jsx)("a",{href:"/api/user/qq_avatar",target:"_blank",children:Object(p.jsx)(x.b,{neumorphism:!0,disabled:!this.state.user.qq_connected,children:"\u66f4\u65b0 QQ \u5934\u50cf"})}),Object(p.jsx)(x.b,{neumorphism:!0,onClick:function(){return e.getData()},children:"\u5237\u65b0\u6570\u636e"})]})}),Object(p.jsx)(v.a,{direction:"TB",fullWidth:!0,children:n.map((function(t){return e.state.user.self?Object(p.jsx)(w.j,{label:t.name,prefix:t.prefix,suffix:t.suffix,value:e.state.user[t.key],onChange:function(n){t.rewrite&&(n=t.rewrite(n)),e.setState((function(e){var r=e.user;return r[t.key]=n,{user:r}}))}},t.key):Object(p.jsxs)("p",{children:[t.prefix," ",e.state.user[t.key]," ",t.suffix]})}))}),Object(p.jsx)(g.a,{condition:this.state.user.self,children:Object(p.jsxs)(v.a,{children:[Object(p.jsx)(w.j,{type:"password",placeholder:"\u5982\u679c\u4e0d\u9700\u8981\u4fee\u6539\u5bc6\u7801\u8bf7\u7559\u7a7a",value:this.state.password,onChange:function(t){return e.setState({password:t})}}),this.state.user.qq_connected?Object(p.jsx)(x.b,{neumorphism:!0,disabled:!0,children:"\u5df2\u7ed1\u5b9a QQ \u767b\u5f55"}):Object(p.jsx)("a",{href:"/api/user/jump_to_qq?state=connect",target:"_blank",children:Object(p.jsx)(x.b,{neumorphism:!0,children:"\u7ed1\u5b9a QQ \u767b\u5f55"})}),this.state.user.github_connected?Object(p.jsx)(x.b,{neumorphism:!0,disabled:!0,children:"\u5df2\u7ed1\u5b9a Github \u767b\u5f55"}):Object(p.jsx)("a",{href:"/api/user/jump_to_github?state=connect",target:"_blank",children:Object(p.jsx)(x.b,{neumorphism:!0,children:"\u7ed1\u5b9a Github \u767b\u5f55"})}),Object(p.jsx)(x.b,{neumorphism:!0,loading:this.state.loading,primary:!0,onClick:this.update,children:"\u66f4\u65b0\u4fe1\u606f"})]})})]})]})}}],[{key:"getInitialProps",value:function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(q.p)(t.query.username);case 2:return n=e.sent,e.abrupt("return",{user:n});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}]),n}(h.a.Component);Object(j.a)(C,"defaultProps",{}),Object(j.a)(C,"contextType",k.a),t.default=Object(m.withRouter)(C)},HXPj:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n("nKUr"),a=(n("q1tI"),n("bLBL")),c=n.n(a);function s(e){var t=e.src,n=e.className,a=e.style,s=e.children;return Object(r.jsx)("div",{className:[n,c.a.avatar].join(" "),style:a,children:!s&&t?Object(r.jsx)("img",{src:t}):s})}},IgCw:function(e,t,n){"use strict";var r=n("H+61"),a=n("UlJF"),c=n("7LId"),s=n("VIvw"),i=n("iHvq"),u=n("cpVT"),o=n("q1tI");function l(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(i.a)(e);if(t){var a=Object(i.a)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Object(s.a)(this,n)}}var f=function(e){Object(c.a)(n,e);var t=l(n);function n(e){return Object(r.a)(this,n),t.call(this,e)}return Object(a.a)(n,[{key:"render",value:function(){return this.props.condition?this.props.children:null}}]),n}(n.n(o).a.Component);Object(u.a)(f,"defaultProps",{condition:!0}),t.a=f},bLBL:function(e,t,n){e.exports={avatar:"avatar_avatar__1jw4O"}},rc3b:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/user/[username]",function(){return n("EE/t")}])}},[["rc3b",0,1,2,3,4,5,6,7,8,9]]]);