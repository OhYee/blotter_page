(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{HXPj:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n("q1tI"),a=n.n(r),o=n("IrJS"),i=n.n(o),c=a.a.createElement;function s(e){var t=e.src,n=e.className,r=e.style,a=e.children;return c("div",{className:[n,i.a.avatar].join(" "),style:r},!a&&t?c("img",{src:t}):a)}},IrJS:function(e,t,n){e.exports={avatar:"avatar___FhI1z"}},LjU7:function(e,t,n){"use strict";n.r(t);var r=n("wx14"),a=n("o0o1"),o=n.n(a),i=n("HaE+"),c=n("1OyB"),s=n("JX7q"),l=n("vuIU"),u=n("Ji7U"),f=n("md7G"),p=n("foSv"),h=n("rePB"),d=n("q1tI"),m=n.n(d),v=n("8Kt/"),y=n.n(v),g=n("YFqc"),b=n.n(g),w=n("pJr+"),k=n("bTPZ"),j=n("HXPj"),O=n("rffq"),R=n("dSKx"),x=n("AoAR"),P=n("efQU"),S=n.n(P),_=n("3nDQ"),N=n.n(_),U=n("RtTr"),C=m.a.createElement;function E(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(p.a)(e);if(t){var a=Object(p.a)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}U.a.locale("zh-cn");var I=5,T=function(e){Object(u.a)(n,e);var t=E(n);function n(e){var a;return Object(c.a)(this,n),a=t.call(this,e),Object(h.a)(Object(s.a)(a),"getSourceData",(function(e){for(var t=[],n=0;n<I;n++)if(n<e.length){var r=e[n];t.push(C("a",{href:r.link,target:"_blank",className:N.a.color},C(O.c,{title:r.title,ellipsis:!0,style:{width:0!==r.time?"calc(100% - 4em)":"100%",display:"inline-block"}},r.title),0!==r.time?C(O.c,{title:Object(U.a)(r.time,"X").format("YYYY-MM-DD HH:mm:SS"),ellipsis:!0,style:{width:"calc(4em * 4 / 3)",textAlign:"right",fontSize:"0.75em",display:"inline-block"}},Object(U.a)(r.time,"X").fromNow()):null))}else t.push(C(O.c,{ellipsis:!0,className:N.a.color},"\u6ca1\u6709\u6570\u636e"));return t})),Object(h.a)(Object(s.a)(a),"renderCard",(function(e){return C(k.a,{neumorphism:!0,style:{width:"90vw",maxWidth:330,position:"relative",overflow:"hidden"}},C(w.a,{direction:"TB",fullWidth:!0},C(w.a,{wrap:!1},C(w.a.Item,{style:{flex:"0 0 5em",display:"flex",justifyContent:"center"}},C(j.a,{className:S.a.avatar,style:{width:"2.5em",height:"2.5em"}},C("img",Object(r.a)({src:e.image},{referrerPolicy:"no-referrer"})))),C(w.a.Item,{style:{flex:"1 1 auto"}},C(w.a,{direction:"TB",subAxis:"flex-start"},C(O.c,{ellipsis:!0,title:e.name},C("strong",null,C("a",{href:e.link,target:"_blank",className:N.a.color},e.name))),C(O.c,{ellipsis:!0,title:e.description?e.description:"\u6ca1\u6709\u63cf\u8ff0",className:N.a.color,style:{lineHeight:"2em",width:"100%"}},e.description?e.description:"\u6ca1\u6709\u63cf\u8ff0")))),C(w.a,{direction:"TB",mainAxis:"space-around",fullWidth:!0},a.getSourceData(e.posts).map((function(e,t){return C(w.a.Item,{key:t},e)})))),e.rss?C("div",{className:S.a.corner,style:{background:e.error?"crimson":"mediumseagreen"}},e.error?"\u6293\u53d6\u5931\u8d25":"\u6293\u53d6\u6210\u529f"):null)})),a.state={loading:!1},a}return Object(l.a)(n,null,[{key:"getInitialProps",value:function(){var e=Object(i.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(x.l)();case 2:return n=e.sent,e.abrupt("return",{friends:n,rendered:!0});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}]),Object(l.a)(n,[{key:"render",value:function(){var e=this;return C(R.a.Consumer,null,(function(t){return C(d.Fragment,null,C(y.a,null,C("title",null,"\u4f18\u79c0\u535a\u5ba2\u8ba2\u9605|".concat(t.blog_name))),C(w.a,{direction:"TB",fullWidth:!0},C(k.a,{neumorphism:!0},C("h1",{className:N.a.color,style:{display:"inline-block",marginRight:10}},"\u4f18\u79c0\u535a\u5ba2\u8ba2\u9605"),C("p",{className:N.a.secondary,style:{display:"inline-block"}},"\u53cb\u60c5\u94fe\u63a5"),C("p",null,"\u53ef\u4ee5\u5728",C(b.a,{href:"/comment"},C("a",null,"\u8bc4\u8bba\u533a")),"\u6216\u8005\u4f7f\u7528",C("a",{href:"mailto:".concat(t.email)},"\u90ae\u4ef6"),"\u6dfb\u52a0\u8ba2\u9605(\u7533\u8bf7\u53cb\u94fe)"),C("p",null,"\u552f\u4e00\u7684\u8981\u6c42\u5c31\u662f\u8d77\u7801\u4e00\u5e74\u80fd\u66f4\u65b0\u51e0\u7bc7\u6587\u7ae0\u5427\uff0c\u522b\u7684\u53ea\u8981\u5185\u5bb9\u5408\u6cd5\u5408\u89c4\uff0c\u6765\u8005\u4e0d\u62d2"),C("p",null,"\u5982\u679c\u53ef\u4ee5\uff0c\u6700\u597d\u63d0\u4f9blogo\u4ee5\u53ca\u7ad9\u70b9RSS\uff0cRSS\u5c06\u7528\u4e8e\u66f4\u65b0\u6700\u65b0\u6587\u7ae0\uff08\u6ca1\u6709\u4e5f\u6ca1\u4e8b\uff0c\u5c31\u5f53\u6211\u7ec3\u4e60\u722c\u866b\u6280\u672f\u4e86\uff09",C("br",null),"\u53cb\u94fe\u987a\u5e8f\u4f1a\u6309\u7167\u535a\u5ba2\u6700\u65b0\u6587\u7ae0\u624b\u52a8\u968f\u7f18\u6392\u5e8f\uff08\u66f4\u65b0\u52e4\u5feb\u7684\u9ad8\u8d28\u91cf\u5927\u4f6c\u4f18\u5148\uff09",C("br",null),"\u6bcf\u6b21\u4f1a\u5c06\u6700\u65b0 ",I," ","\u7bc7\u6587\u7ae0\u66f4\u65b0\u5230\u8fd9\u91cc\uff0c\u8fd9\u6837\u6211\u5c31\u53ef\u4ee5\u5728\u4e00\u4e2a\u9875\u9762\u770b\u5230\u8bf8\u4f4d\u5927\u4f6c\u7684\u6700\u65b0\u6210\u679c\u4e86"),C("p",null,"\u53cb\u94fe\u6587\u7ae0\u722c\u866b\u89c1",C("a",{href:"https://github.com/OhYee/blotter/tree/master/spider",target:"_blank"},"\u76f8\u5173\u4ee3\u7801"),"\uff0cUser-Agent \u4e3a",C("code",null,"OhYee Spider"),"\uff0c\u5982\u6709\u5fc5\u8981\uff0c\u8bf7\u52a0\u767d\u540d\u5355\u3002\u6587\u7ae0\u722c\u53d6\u4efb\u52a1\u4f1a\u5728\u6bcf\u5929\u51cc\u6668 3 \u70b9\u6267\u884c")),C(w.a,{mainAxis:"space-around",itemStyle:{margin:10}},e.props.friends.map((function(t){return C(w.a.Item,{key:t.name},e.renderCard(t))})))))}))}}]),n}(m.a.Component);Object(h.a)(T,"defaultProps",{friends:[]}),t.default=T},RtTr:function(e,t,n){"use strict";var r=n("wd/R"),a=n.n(r);a.a.locale("zh-cn"),t.a=a.a},YFqc:function(e,t,n){e.exports=n("cTJO")},cTJO:function(e,t,n){"use strict";var r=n("/GRZ"),a=n("i2R6"),o=n("48fX"),i=n("tCBg"),c=n("T0f4");function s(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=c(e);if(t){var a=c(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return i(this,n)}}var l=n("AroE"),u=n("7KCV");t.__esModule=!0,t.default=void 0;var f,p=u(n("q1tI")),h=n("QmWs"),d=n("g/15"),m=l(n("nOHt")),v=n("elyg");function y(e){return e&&"object"===typeof e?(0,d.formatWithValidation)(e):e}var g=new Map,b=window.IntersectionObserver,w={};function k(){return f||(b?f=new b((function(e){e.forEach((function(e){if(g.has(e.target)){var t=g.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(f.unobserve(e.target),g.delete(e.target),t())}}))}),{rootMargin:"200px"}):void 0)}var j=function(e){o(n,e);var t=s(n);function n(e){var a;return r(this,n),(a=t.call(this,e)).p=void 0,a.cleanUpListeners=function(){},a.formatUrls=function(e){var t=null,n=null,r=null;return function(a,o){if(r&&a===t&&o===n)return r;var i=e(a,o);return t=a,n=o,r=i,i}}((function(e,t){return{href:(0,v.addBasePath)(y(e)),as:t?(0,v.addBasePath)(y(t)):t}})),a.linkClicked=function(e){var t=e.currentTarget,n=t.nodeName,r=t.target;if("A"!==n||!(r&&"_self"!==r||e.metaKey||e.ctrlKey||e.shiftKey||e.nativeEvent&&2===e.nativeEvent.which)){var o=a.formatUrls(a.props.href,a.props.as),i=o.href,c=o.as;if(function(e){var t=(0,h.parse)(e,!1,!0),n=(0,h.parse)((0,d.getLocationOrigin)(),!1,!0);return!t.host||t.protocol===n.protocol&&t.host===n.host}(i)){var s=window.location.pathname;i=(0,h.resolve)(s,i),c=c?(0,h.resolve)(s,c):i,e.preventDefault();var l=a.props.scroll;null==l&&(l=c.indexOf("#")<0),m.default[a.props.replace?"replace":"push"](i,c,{shallow:a.props.shallow}).then((function(e){e&&l&&(window.scrollTo(0,0),document.body.focus())}))}}},a.p=!1!==e.prefetch,a}return a(n,[{key:"componentWillUnmount",value:function(){this.cleanUpListeners()}},{key:"getPaths",value:function(){var e=window.location.pathname,t=this.formatUrls(this.props.href,this.props.as),n=t.href,r=t.as,a=(0,h.resolve)(e,n);return[a,r?(0,h.resolve)(e,r):a]}},{key:"handleRef",value:function(e){var t=this;this.p&&b&&e&&e.tagName&&(this.cleanUpListeners(),w[this.getPaths().join("%")]||(this.cleanUpListeners=function(e,t){var n=k();return n?(n.observe(e),g.set(e,t),function(){try{n.unobserve(e)}catch(t){console.error(t)}g.delete(e)}):function(){}}(e,(function(){t.prefetch()}))))}},{key:"prefetch",value:function(e){if(this.p){var t=this.getPaths();m.default.prefetch(t[0],t[1],e).catch((function(e){0})),w[t.join("%")]=!0}}},{key:"render",value:function(){var e=this,t=this.props.children,n=this.formatUrls(this.props.href,this.props.as),r=n.href,a=n.as;"string"===typeof t&&(t=p.default.createElement("a",null,t));var o=p.Children.only(t),i={ref:function(t){e.handleRef(t),o&&"object"===typeof o&&o.ref&&("function"===typeof o.ref?o.ref(t):"object"===typeof o.ref&&(o.ref.current=t))},onMouseEnter:function(t){o.props&&"function"===typeof o.props.onMouseEnter&&o.props.onMouseEnter(t),e.prefetch({priority:!0})},onClick:function(t){o.props&&"function"===typeof o.props.onClick&&o.props.onClick(t),t.defaultPrevented||e.linkClicked(t)}};return!this.props.passHref&&("a"!==o.type||"href"in o.props)||(i.href=a||r),p.default.cloneElement(o,i)}}]),n}(p.Component);t.default=j},oQRH:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/friends",function(){return n("LjU7")}])}},[["oQRH",0,2,10,1,3,4,5,6,8,11,9]]]);