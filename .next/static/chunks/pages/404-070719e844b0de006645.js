_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[20],{BdxU:function(t,n,e){"use strict";e.r(n),e.d(n,"default",(function(){return s}));var r=e("q1tI"),a=e.n(r),c=e("D4/9"),o=a.a.createElement;function s(){return o(c.default,{status:404})}},"D4/9":function(t,n,e){"use strict";e.r(n);var r=e("o0o1"),a=e.n(r),c=e("HaE+"),o=e("1OyB"),s=e("vuIU"),i=e("JX7q"),u=e("Ji7U"),l=e("md7G"),p=e("foSv"),f=e("rePB"),h=e("q1tI"),_=e.n(h),v=e("8Kt/"),d=e.n(v),m=e("nOHt"),y=e("bTPZ"),b=function(t,n){var e=n.length;return t.length>=e&&t.slice(0,e)===n},g=function(t,n){var e=t.length,r=n.length;return e>=r&&t.slice(e-r)===n},w=e("dSKx"),x=e("s0TQ"),O=e.n(x),j=_.a.createElement;function P(t){var n=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=Object(p.a)(t);if(n){var a=Object(p.a)(this).constructor;e=Reflect.construct(r,arguments,a)}else e=r.apply(this,arguments);return Object(l.a)(this,e)}}var k=function(t){Object(u.a)(e,t);var n=P(e);function e(){var t;Object(o.a)(this,e);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return t=n.call.apply(n,[this].concat(a)),Object(f.a)(Object(i.a)(t),"context",void 0),t}return Object(s.a)(e,[{key:"render",value:function(){var t=this,n=function(t){var n="";if(b(t,"/post/")){var e=t.slice(6).toLocaleLowerCase().replace(/\//g,"_");e=g(e,".html")?e.slice(0,e.length-5):e,e=g(e,"_")?e.slice(0,e.length-1):e,n="/post/".concat(e)}b(t,"/tag/")&&(e=t.slice(5).toLocaleLowerCase().replace(/\//g,"_"),e=g(e,".html")?e.slice(0,e.length-5):e,e=g(e,"_")?e.slice(0,e.length-1):e,n="/tag/".concat(e));return n==t&&(n=""),n}(this.props.router.asPath),e={403:j("span",null,"\u4f60\u8bbf\u95ee\u4e86\u6ca1\u6709\u6743\u9650\u7684\u9875\u9762"),404:j("span",null,"\u627e\u4e0d\u5230\u9875\u9762\uff0c\u5927\u6982\u662f\u91cd\u6784\u4fee\u6539\u4e86\u90e8\u5206\u9875\u9762\u7684\u94fe\u63a5\uff0c\u8bf7\u5c1d\u8bd5\u6839\u636e\u6807\u7b7e\u6216\u8005\u641c\u7d22\u529f\u80fd\u627e\u5230\u5bf9\u5e94\u7684\u5185\u5bb9"),500:j("span",null,"\u670d\u52a1\u5668\u70b8\u4e86\uff1f",j("a",{href:"mailto://".concat(this.context.email)},"\u8054\u7cfb\u6211"),"\u6765\u4fee\u590d\u5427"),501:j("span",null,"\u6ca1\u6709\u627e\u5230\u5bf9\u5e94\u7684\u63a5\u53e3\uff0c\u6b63\u5e38\u800c\u8a00\uff0c\u6b63\u5e38\u6d4f\u89c8\u4e0d\u4f1a\u9047\u5230\u8fd9\u4e2a\u9519\u8bef\u3002\u5982\u679c\u60f3\u8981\u83b7\u53d6\u535a\u5ba2\u76f8\u5173\u63a5\u53e3\uff0c\u53ef\u4ee5\u67e5\u770b",j("a",{href:"https://github.com/OhYee/blotter"},"\u5f00\u6e90\u9879\u76ee")),502:j("span",null,"\u7f51\u5173\u9519\u8bef\uff0c\u5927\u6982\u662f\u540e\u7aef\u670d\u52a1\u5668\u70b8\u4e86\u3002 ",j("a",{href:"mailto://".concat(this.context.email)},"\u8054\u7cfb\u6211"),"\u6765\u4fee\u590d\u5427")};return j(y.a,{neumorphism:!0},j(w.a.Consumer,null,(function(n){return j(d.a,null,j("title",null,"\u53d1\u751f\u4e00\u4e2a".concat(t.props.status,"\u9519\u8bef\uff01|").concat(t.context.blog_name)))})),j("h1",{className:O.a.color,style:{display:"inline-block",marginRight:10}},"\u53d1\u751f\u4e00\u4e2a".concat(this.props.status,"\u9519\u8bef\uff01")),j("p",{className:O.a.secondary,style:{display:"inline-block"}},e[this.props.status]),404==this.props.status&&""!==n?j("strong",null,"\u5f53\u524d\u60a8\u8bbf\u95ee\u7684\u9875\u9762\u662f",this.props.router.asPath,"\uff0c\u731c\u6d4b\u5f97\u51fa\u4f60\u5b9e\u9645\u8981\u8bbf\u95ee\u5f97\u8fde\u63a5\u662f",j("a",{href:n},n),"\uff08\u7eaf\u7cb9\u731c\u6d4b\uff09"):null,j("p",{style:{lineHeight:"2em"}},"\u4e00\u822c\u800c\u8a00\uff0c\u6240\u6709\u53d1\u751f\u9519\u8bef\u53ef\u80fd\u7684\u60c5\u51b5\u5982\u4e0b\uff1a",j("ul",null,Object.keys(e).map((function(t){return j("li",{key:t},j("strong",null,t,"\u9519\u8bef"),",",e[t])})))))}}],[{key:"getInitialProps",value:function(){var t=Object(c.a)(a.a.mark((function t(n){var e;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=n.res,t.abrupt("return",{status:e.statusCode});case 2:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}()}]),e}(h.Component);Object(f.a)(k,"contextType",w.a);n.default=Object(m.withRouter)(k)},"HaE+":function(t,n,e){"use strict";function r(t,n,e,r,a,c,o){try{var s=t[c](o),i=s.value}catch(u){return void e(u)}s.done?n(i):Promise.resolve(i).then(r,a)}function a(t){return function(){var n=this,e=arguments;return new Promise((function(a,c){var o=t.apply(n,e);function s(t){r(o,a,c,s,i,"next",t)}function i(t){r(o,a,c,s,i,"throw",t)}s(void 0)}))}}e.d(n,"a",(function(){return a}))},i67r:function(t,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/404",function(){return e("BdxU")}])},s0TQ:function(t,n,e){t.exports={color:"text_color__2A4_3",primary:"text_primary__37eNP",secondary:"text_secondary__2icKR",ellipsis:"text_ellipsis__3pMbC",em75:"text_em75__1_s6d"}}},[["i67r",0,2,1,3,9]]]);