(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{FcBo:function(t,e,n){"use strict";n.d(e,"a",(function(){return D}));var a=n("KQm4"),r=n("rePB"),o=n("o0o1"),c=n.n(o),l=n("HaE+"),s=n("ODXe"),i=n("q1tI"),u=n.n(i),p=n("pJr+"),m=n("MfSh"),d=n("HXPj"),f=n("rffq"),h=n("Oi1/"),b=n("bTPZ"),y=n("tJ/W"),v=n("Au3V"),g=n("RtTr"),w=n("Hh1h"),j=n("AoAR"),k=n("dSKx"),O=n("5D78");var x=function t(e){return e.offsetTop+(e.offsetParent?t(e.offsetParent):0)},C=n("PWtr"),q=n.n(C),A=n("3nDQ"),_=n.n(A),I=n("T4vU"),S=n.n(I),T=u.a.createElement,H=T("b",null,"\u5e7f\u544a\u8bc4\u8bba\uff0c\u5df2\u88ab\u5c4f\u853d"),P=T("b",null,"\u8be5\u8bc4\u8bba\u5df2\u88ab\u5220\u9664"),R="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",B=u.a.createContext({url:"",callback:function(){}});function E(t){return"blotter-comment-".concat(t)}var N=function(t){var e=t.id,n=t.closeEditorCallback,a=u.a.useState(""),o=Object(s.a)(a,2),i=o[0],m=o[1],g=u.a.useState(!1),w=Object(s.a)(g,2),k=w[0],x=w[1],C=u.a.useContext(B),A=C.url,_=C.callback,I=u.a.useState(""),S=Object(s.a)(I,2),H=S[0],P=S[1],E=u.a.useState(""),N=Object(s.a)(E,2),W=N[0],U=N[1],D=u.a.useState(!0),J=Object(s.a)(D,2),L=J[0],M=J[1],z=function(){var t=Object(l.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:x(!0),Object(j.b)({url:A,reply:e,email:H,recv:L,raw:W}).then((function(t){Object(O.b)(t)&&(n?n():U(""),_&&_())})).finally((function(){x(!1)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return T(p.a,{subAxis:"flex-start",wrap:!1},T(p.a.Item,{style:{flex:"0 0 5em",display:"flex",justifyContent:"center"}},T(d.a,{src:i||R,style:{width:"2.5em",height:"2.5em"}})),T(p.a.Item,{style:{flex:"1 1 auto"}},T(p.a,{direction:"TB",fullWidth:!0},T(y.j,{value:H,onBlur:function(){Object(j.g)(H,(function(t){return m(t.avatar)}))},placeholder:"\u8f93\u5165\u60a8\u7684\u90ae\u7bb1(\u4ec5\u7528\u4e8e\u6536\u53d6\u6709\u4eba\u56de\u590d\u60a8\u7684\u901a\u77e5\uff0c\u4e0d\u4f1a\u5728\u524d\u7aef\u6cc4\u9732)",style:{width:"100%"},onChange:P,hint:""!==H&&!/^(\w+)(\.\w+)*@(\w+)(\.\w+)*.(\w+)$/i.test(H)&&T(y.d,{error:!0},"\u4f60\u786e\u5b9a\u8fd9\u662f\u4e00\u4e2a\u90ae\u7bb1\uff1f")}),T(y.g,{value:W,rows:5,placeholder:"\u793c\u8c8c\u4ea4\u6d41\uff0c\u81f3\u5c115\u4e2a\u5b57\u7b26",style:{width:"100%"},onChange:U,hint:""!==W&&W.length<5&&T(y.d,{error:!0},"\u8bc4\u8bba\u8fde\u4e94\u4e2a\u5b57\u90fd\u4e0d\u5230\uff1f\u4e0d\u4f1a\u5427\u4e0d\u4f1a\u5427")}),T(p.a,null,T(y.a,{value:L,onChange:M},"\u6536\u5230\u56de\u590d\u65f6\u4f7f\u7528\u90ae\u4ef6\u901a\u77e5"),T(f.d,{trigger:["click","hover"],placement:"bottom",style:{lineHeight:"100%"},popoverClass:q.a.shadow,popoverStyle:Object(r.a)({boxShadow:"5px 5px 30px var(--shadow)"},"--popover-backgroud","var(--background)"),component:T(b.a,{style:{background:"var(--background)",maxWidth:"80vw"}},T("p",null,"\u8bc4\u8bba\u652f\u6301Markdown\uff0c\u5982\u679c\u6709\u4eba\u56de\u590d\u4f60\u7684\u8bc4\u8bba\uff0c\u4f1a\u6709\u90ae\u4ef6\u63d0\u9192\u53d1\u9001\u5230\u4f60\u7684\u90ae\u7bb1\uff0c\u5982\u679c\u4e0d\u60f3\u67e5\u770b\uff0c\u53ef\u4ee5\u53d6\u6d88"),T("p",null,"\u5934\u50cf\u5c06\u4f18\u5148\u4f7f\u7528\u90ae\u7bb1\u5bf9\u5e94Github\u8d26\u6237\u5934\u50cf,\u5982\u679c\u83b7\u53d6\u5931\u8d25\u5c06\u4f7f\u7528",T("a",{href:"https://cn.gravatar.com/"},"Gravatar"),"\u5934\u50cf"),T("p",null,"\u90ae\u7bb1\u5730\u5740\u4e0d\u4f1a\u5728\u524d\u7aef\u6e32\u67d3\uff0c\u53ef\u4ee5\u907f\u514d\u88ab\u626b\u63cf\u5de5\u5177\u8bb0\u5f55\uff0c\u4f46\u4ecd\u53ef\u80fd\u901a\u8fc7\u5934\u50cf\u5730\u5740\u9006\u63a8\u51fa\u90ae\u7bb1"),T("p",null,"\u8bc4\u8bba\u5185\u5bb9\u8bf7\u9075\u5b88\u76f8\u5e94\u6cd5\u5f8b\u6cd5\u89c4\uff0c\u5e76\u4e14\u8bf7\u4e0d\u8981\u53d1\u5e03\u5e7f\u544a"))},T(h.F,null)),T(p.a.Item,{style:{flex:"1 1 auto",textAlign:"right"}},T(v.b,{primary:!0,neumorphism:!0,onClick:z,loading:k,disabled:W.length<5||!/^(\w+)(\.\w+)*@(\w+)(\.\w+)*.(\w+)$/i.test(H)},"\u8bc4\u8bba"))))))},W=function t(e){var n,a=e.comment,r=e.depth,o=e.quote,c=e.parent,l=u.a.useState(!1),i=Object(s.a)(l,2),m=i[0],b=i[1],y=Object(g.a)(a.time),v=function(){return T(u.a.Fragment,null,m?T(N,{id:a.id,closeEditorCallback:function(){return b(!1)}}):null,T(U,{comments:a.children,depth:r+1,parent:a}))},j=u.a.useContext(k.a).big_screen?5:2;return n=o?[T("span",{key:"jump",className:Object(w.a)(_.a.secondary,_.a.em75),onClick:function(){return function(t){var e=document.getElementById(E(t)),n=x(e);e&&n>0&&scrollTo(0,n+10)}(a.id)},style:{lineHeight:"100%"}},"\u8df3\u8f6c\u5230\u8be5\u8bc4\u8bba")]:[m?T("span",{key:"cancel",className:Object(w.a)(_.a.secondary,_.a.em75),onClick:function(){return b(!1)},style:{cursor:"pointer",lineHeight:"100%"}},"\u53d6\u6d88\u56de\u590d",T(h.e,null)):T("span",{key:"reply",className:Object(w.a)(_.a.secondary,_.a.em75),onClick:function(){return b(!0)},style:{cursor:"pointer",lineHeight:"100%"}},"\u56de\u590d"),T("span",{key:"email",className:Object(w.a)(_.a.secondary,_.a.em75),style:{lineHeight:"100%"}},a.recv?T(f.c,{title:"\u5f53\u4f60\u56de\u590d\u8be5\u8bc4\u8bba\uff0c\u8bc4\u8bba\u8005\u4f1a\u6536\u5230\u90ae\u4ef6\u63d0\u9192\uff08\u4f46\u662f\u4ed6/\u5979\u4e0d\u4e00\u5b9a\u4f1a\u770b\u90ae\u4ef6\uff09"},T(h.y,null)):T(f.c,{title:"\u5f53\u4f60\u56de\u590d\u8be5\u8bc4\u8bba\uff0c\u8bc4\u8bba\u8005\u4e0d\u4f1a\u6536\u5230\u90ae\u4ef6\u63d0\u9192\uff08\u6240\u4ee5\u4f60\u53ef\u80fd\u65e0\u6cd5\u5f97\u5230\u53cd\u9988\uff09"},T(h.h,null)))],T("div",{id:o?"":E(a.id),className:S.a.comment},T(p.a,{subAxis:"flex-start",wrap:!1,style:o?{borderLeft:"#ccc 5px solid",paddingLeft:10}:{}},T(p.a.Item,{style:{flex:"0 0 5em",display:"flex",justifyContent:"center"}},T(d.a,{src:a.avatar?a.avatar:R,style:{width:"2.5em",height:"2.5em"}})),T(p.a.Item,{style:{flex:"1 1 auto"}},T(p.a,{mainSize:"small",direction:"TB",fullWidth:!0},T(p.a,{mainAxis:"flex-start"},a.email,T(f.c,{title:y.format("YYYY-MM-DD HH:mm:ss")},T("span",{className:Object(w.a)(_.a.secondary,_.a.em75)},y.fromNow()))),T("div",null,a.ad?H:a.show?T("div",null,!o&&1!=r&&r>=j?T(t,{comment:c,depth:r,quote:!0}):null,T("div",{dangerouslySetInnerHTML:{__html:a.content}})):P),T(p.a,{mainAxis:"flex-start",subAxis:"baseline"},n),!o&&T("hr",null),!o&&r<j?v():null))),!o&&r>=j?v():null)},U=function(t){var e=t.comments,n=t.depth,r=t.parent,o=t.total;return t.loading?T(m.a,null):e.length||1==n?T(p.a,{direction:"TB",fullWidth:!0,className:"comment-list"},[T("p",{key:"total"},o?"\u5171 ".concat(o," \u6761\u8bc4\u8bba"):null)].concat(Object(a.a)(e.map((function(t){return T(p.a.Item,{key:t.id},T(W,{comment:t,depth:n,quote:!1,parent:r}))}))))):null};function D(t){var e=t.url,n=u.a.useState(!1),a=Object(s.a)(n,2),r=a[0],o=a[1],c=u.a.useState(0),l=Object(s.a)(c,2),i=l[0],m=l[1],d=u.a.useState([]),f=Object(s.a)(d,2),h=f[0],b=f[1],y=u.a.useCallback((function(){o(!0),Object(j.j)(e).then((function(t){m(t.total),b(t.comments.reverse())})).finally((function(){o(!1)}))}),[o,m,b,e]);return u.a.useEffect((function(){return y()}),[]),T(B.Provider,{value:{url:e,callback:y}},T(p.a,{direction:"TB",id:"blotter-comment",className:S.a.comments,fullWidth:!0},T(N,{id:"000000000000"}),T(U,{comments:h,depth:1,total:i,loading:r})))}},TULW:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/post/[url]",function(){return n("cgyg")}])},cgyg:function(t,e,n){"use strict";n.r(e);var a=n("o0o1"),r=n.n(a),o=n("HaE+"),c=n("1OyB"),l=n("JX7q"),s=n("vuIU"),i=n("Ji7U"),u=n("md7G"),p=n("foSv"),m=n("rePB"),d=n("q1tI"),f=n.n(d),h=n("8Kt/"),b=n.n(h),y=n("nOHt"),v=n("FcBo"),g=n("pJr+"),w=n("gkId"),j=n("Oi1/"),k=n("bTPZ"),O=n("HXPj"),x=n("Au3V"),C=n("AoAR"),q=n("dSKx"),A=(n("Vdni"),f.a.createElement);function _(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,a=Object(p.a)(t);if(e){var r=Object(p.a)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return Object(u.a)(this,n)}}var I=function(t){Object(i.a)(n,t);var e=_(n);function n(t){var a;return Object(c.a)(this,n),a=e.call(this,t),Object(m.a)(Object(l.a)(a),"render_share",(function(){return A(q.a.Consumer,null,(function(t){if("undefined"===typeof document)return null;var e="".concat(t.root.replace(/\/$/,""),"/").concat(document.location.pathname.replace(/^\//,""));return A(g.a,{direction:"TB",mainAxis:"flex-start",fullWidth:!0},A(g.a,{direction:"LR"},A(g.a.Item,{style:{flex:"0 0 5em",display:"flex",justifyContent:"center"}},A(O.a,{src:t.avatar,style:{width:"5em",height:"5em"}})),A(g.a.Item,{style:{flex:"1 1 auto"}},A("strong",null,t.author),A("div",null,"\u672c\u6587\u7ae0\u53d1\u5e03\u81ea ",A("a",{href:t.root},t.blog_name),"\uff0c\u539f\u6587\u300e",A("a",{href:e},a.props.post.title),"\u300f",A("br",null),"\u5982\u65e0\u7279\u522b\u8bf4\u660e\uff0c\u53ef\u4ee5\u76f4\u63a5\u8f6c\u8f7d\uff0c\u4f46\u8bf7\u6ce8\u660e\u539f\u6587\u51fa\u5904\u94fe\u63a5\uff1a",A("a",{href:e},e)))),A(g.a,{direction:"LR",mainAxis:"space-around"},A(x.a,{target:"_blank",href:"http://connect.qq.com/widget/shareqq/index.html?url=".concat(encodeURIComponent(e),"&sharesource=qzone&title=").concat(encodeURIComponent(a.props.post.title),"&pics=").concat(a.props.post.head_image,"&summary=").concat(a.props.post.abstract,"&desc=").concat(a.props.post.abstract),icon:A(j.E,null)}),A(x.a,{target:"_blank",href:"https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=".concat(encodeURIComponent(e),"&sharesource=qzone&title=").concat(encodeURIComponent(a.props.post.title),"&pics=").concat(a.props.post.head_image,"&summary=").concat(a.props.post.abstract),icon:A(j.G,null)}),A(x.b,{icon:A(j.v,null),onClick:function(){return alert("\u8bf7\u590d\u5236\uff1a".concat(e))}})))}))})),a.state={},a}return Object(s.a)(n,null,[{key:"getInitialProps",value:function(){var t=Object(o.a)(r.a.mark((function t(e){var n,a;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.query.url,Array.isArray(n)&&(n=n[0]),t.next=4,Object(C.w)(n);case 4:return a=t.sent,t.abrupt("return",{post:a});case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}]),Object(s.a)(n,[{key:"componentDidMount",value:function(){var t=this.props.router.query.url;Array.isArray(t)&&(t=t[0]),Object(C.T)(t)}},{key:"render",value:function(){var t=this;return"undefined"===typeof this.props.post?null:A("div",null,A(q.a.Consumer,null,(function(e){return A(b.a,null,A("title",null,"".concat(t.props.post.title,"|").concat(e.blog_name)),A("meta",{name:"keywords",key:"keywords",content:Array.isArray(t.props.post.keywords)?t.props.post.keywords.join(","):""}),A("meta",{key:"description",name:"description",content:t.props.post.abstract}))})),A(g.a,{direction:"TB",fullWidth:!0},A(k.a,{neumorphism:!0},A(w.a,{post:this.props.post})),A(k.a,{neumorphism:!0},this.render_share()),A(k.a,{neumorphism:!0},A(v.a,{url:"/post/".concat(this.props.router.query.url)}))))}}]),n}(f.a.Component);Object(m.a)(I,"defaultProps",{anchors:[]}),e.default=Object(y.withRouter)(I)}},[["TULW",0,2,12,1,3,4,5,6,7,8,10,11,15,16,24,25,9]]]);