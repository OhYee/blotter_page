(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{"57m7":function(t,e,n){"use strict";n("1SKB"),n("m3Kr")},"5D78":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"a",(function(){return i}));n("MQDG");var r=n("rR1Q"),a=n.n(r);function o(t){return t.success?a.a.success({message:t.title,description:t.content}):a.a.error({message:t.title,description:t.content}),t.success}function i(t){"undefined"!==typeof document&&(Notification.requestPermission(),new Notification("\u901a\u77e5",{body:t,icon:"/static/img/logo_196x196.png"}))}},Cp9S:function(t,e,n){"use strict";function r(t){return(r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==r(t)&&"function"!==typeof t)return{default:t};var e=u();if(e&&e.has(t))return e.get(t);var n={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=a?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(n("q1tI")),o=s(n("TSYQ")),i=s(n("0r0h")),c=n("vgIT");function s(t){return t&&t.__esModule?t:{default:t}}function u(){if("function"!==typeof WeakMap)return null;var t=new WeakMap;return u=function(){return t},t}function l(){return(l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var p=function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(t);a<r.length;a++)e.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(t,r[a])&&(n[r[a]]=t[r[a]])}return n},d={small:8,middle:16,large:24},v=function(t){var e=a.useContext(c.ConfigContext),n=e.getPrefixCls,r=e.space,s=e.direction,u=t.size,v=void 0===u?(null===r||void 0===r?void 0:r.size)||"small":u,y=t.className,m=t.children,g=t.direction,h=void 0===g?"horizontal":g,b=t.prefixCls,O=p(t,["size","className","children","direction","prefixCls"]),j=(0,i.default)(m),w=j.length;if(0===w)return null;var S=n("space",b),x=(0,o.default)(S,"".concat(S,"-").concat(h),f({},"".concat(S,"-rtl"),"rtl"===s),y),P="".concat(S,"-item"),_="rtl"===s?"marginLeft":"marginRight";return a.createElement("div",l({className:x},O),j.map((function(t,e){return a.createElement("div",{className:P,key:"".concat(P,"-").concat(e),style:e===w-1?{}:f({},"vertical"===h?"marginBottom":_,"string"===typeof v?d[v]:v)},t)})))};e.default=v},"EE/t":function(t,e,n){"use strict";n.r(e);n("RV09");var r=n("N9UN"),a=n.n(r),o=(n("57m7"),n("Cp9S")),i=n.n(o),c=(n("X1UN"),n("hqwM")),s=n.n(c),u=(n("1mXb"),n("iJl9")),l=n.n(u),f=(n("89vs"),n("lbd2")),p=n.n(f),d=(n("SoD3"),n("9xET")),v=n.n(d),y=(n("YKpo"),n("ZPTe")),m=n.n(y),g=(n("bAY4"),n("4IMT")),h=n.n(g),b=(n("SJAb"),n("pWf2")),O=n.n(b),j=n("o0o1"),w=n.n(j),S=n("1OyB"),x=n("vuIU"),P=n("JX7q"),_=n("Ji7U"),k=n("md7G"),C=n("foSv"),E=n("rePB"),q=n("q1tI"),I=n.n(q),A=n("8Kt/"),N=n.n(A),R=n("nOHt"),D=n("pJr+"),T=n("dSKx"),M=n("AoAR"),W=n("5D78"),Q=n("IgCw"),z=I.a.createElement;function J(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var B=function(t){Object(_.a)(r,t);var e,n=(e=r,function(){var t,n=Object(C.a)(e);if(J()){var r=Object(C.a)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return Object(k.a)(this,t)});function r(t){var e;return Object(S.a)(this,r),e=n.call(this,t),Object(E.a)(Object(P.a)(e),"context",void 0),Object(E.a)(Object(P.a)(e),"getData",(function(){var t;return w.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,w.a.awrap(Object(M.p)(e.props.router.query.username));case 2:t=n.sent,e.setState({user:t});case 4:case"end":return n.stop()}}),null,null,null,Promise)})),Object(E.a)(Object(P.a)(e),"update",(function(){var t,n,r,a,o,i,c,s,u,l;return w.a.async((function(f){for(;;)switch(f.prev=f.next){case 0:return e.setState({loading:!0}),t=e.state.user,n=t.username,r=t.email,a=t.ns_id,o=t.ns_name,i=t.ac_name,c=t.ac_island,s=t.qq,u=t.avatar,f.next=4,w.a.awrap(Object(M.F)(n,r,u,a,o,i,c,s,e.state.password));case 4:l=f.sent,Object(W.b)(l)&&(e.props.router.push("/user/[username]","/user/".concat(n)),e.context.callback({user:e.state.user})),e.setState({loading:!1});case 7:case"end":return f.stop()}}),null,null,null,Promise)})),e.state={user:e.props.user,loading:!1,loadingAvatar:!1,password:""},e}return Object(x.a)(r,[{key:"componentDidMount",value:function(){this.getData()}},{key:"render",value:function(){var t=this,e=[{key:"avatar",name:"\u5934\u50cf",self:!0,rewrite:function(t){return t.replace("http://","https://")}},{key:"username",name:"\u7528\u6237\u540d",self:!1},{key:"email",name:"\u90ae\u7bb1",self:!1},{key:"qq",name:"QQ \u53f7",self:!0},{key:"ns_id",name:"NS ID",self:!1,prefix:"SW",rewrite:function(t){return t.replace(/[^0-9\-]/g,"")}},{key:"ns_name",name:"NS \u540d\u79f0",self:!1},{key:"ac_name",name:"\u52a8\u68ee\u540d\u79f0",self:!1},{key:"ac_island",name:"\u52a8\u68ee\u5c9b\u540d",self:!1,suffix:"\u5c9b",rewrite:function(t){return t.length>0&&"\u5c9b"==t[t.length-1]&&(t=t.slice(0,t.length-1)),t}}],n=this.state.user.self?e:e.filter((function(t){return!t.self}));return z(D.a,null,z(T.a.Consumer,null,(function(e){return z(N.a,null,z("title",null,"".concat(t.props.router.query.username,"|\u7528\u6237\u9875|").concat(e.blog_name)))})),z(a.a,null,z("p",{style:{textAlign:"center"}},z(O.a,{size:128,src:this.state.user.avatar})),z(Q.a,{condition:this.state.user.self},z(v.a,{justify:"center",gutter:20},z(m.a,null,z(h.a,{loading:this.state.loadingAvatar,onClick:function(){var e;return w.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return t.setState({loadingAvatar:!0}),n.next=3,w.a.awrap(Object(M.g)(t.state.user.email));case 3:e=n.sent,t.setState((function(t){var n=t.user;return n.avatar=e.avatar,{user:n,loadingAvatar:!1}}));case 5:case"end":return n.stop()}}),null,null,null,Promise)}},"\u6839\u636e\u90ae\u7bb1\u66f4\u65b0 Github\u3001Gavatar \u5934\u50cf")),z(m.a,null,z("a",{href:"/api/user/qq_avatar",target:"_blank"},z(h.a,{disabled:!this.state.user.qq_connected},"\u66f4\u65b0 QQ \u5934\u50cf"))),z(m.a,null,z(h.a,{onClick:function(){return t.getData()}},"\u5237\u65b0\u6570\u636e")))),z(s.a,{dataSource:n,renderItem:function(e){return z(s.a.Item,{key:e.key},z(v.a,{style:{width:"100%"}},z(m.a,{span:4},z(p.a.Text,{strong:!0},e.name)),z(m.a,{span:20},t.state.user.self?z(l.a,{addonBefore:e.prefix,addonAfter:e.suffix,value:t.state.user[e.key],onChange:function(n){var r=n.target.value;e.rewrite&&(r=e.rewrite(r)),t.setState((function(t){var n=t.user;return n[e.key]=r,{user:n}}))}}):z("p",null,e.prefix," ",t.state.user[e.key]," ",e.suffix))))}}),z(Q.a,{condition:this.state.user.self},z(i.a,{direction:"vertical",style:{width:"100%"}},z(l.a,{type:"password",placeholder:"\u5982\u679c\u4e0d\u9700\u8981\u4fee\u6539\u5bc6\u7801\u8bf7\u7559\u7a7a",value:this.state.password,onChange:function(e){return t.setState({password:e.target.value})}}),z(v.a,{justify:"space-between"},z(m.a,null,this.state.user.qq_connected?z(h.a,{disabled:!0},"\u5df2\u7ed1\u5b9a QQ \u767b\u5f55"):z("a",{href:"/api/user/jump_to_qq?state=connect",target:"_blank"},z(h.a,null,"\u7ed1\u5b9a QQ \u767b\u5f55"))),z(m.a,{style:{textAlign:"right"}},z(h.a,{loading:this.state.loading,type:"primary",onClick:this.update},"\u66f4\u65b0\u4fe1\u606f")))))))}}],[{key:"getInitialProps",value:function(t){var e;return w.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,w.a.awrap(Object(M.p)(t.query.username));case 2:return e=n.sent,n.abrupt("return",{user:e});case 4:case"end":return n.stop()}}),null,null,null,Promise)}}]),r}(I.a.Component);Object(E.a)(B,"defaultProps",{}),Object(E.a)(B,"contextType",T.a),e.default=Object(R.withRouter)(B)},IgCw:function(t,e,n){"use strict";var r=n("1OyB"),a=n("vuIU"),o=n("Ji7U"),i=n("md7G"),c=n("foSv"),s=n("rePB"),u=n("q1tI");function l(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var f=function(t){Object(o.a)(s,t);var e,n=(e=s,function(){var t,n=Object(c.a)(e);if(l()){var r=Object(c.a)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return Object(i.a)(this,t)});function s(t){return Object(r.a)(this,s),n.call(this,t)}return Object(a.a)(s,[{key:"render",value:function(){return this.props.condition?this.props.children:null}}]),s}(n.n(u).a.Component);Object(s.a)(f,"defaultProps",{condition:!0}),e.a=f},SJAb:function(t,e,n){"use strict";n("1SKB"),n("Tlp2")},Tlp2:function(t,e,n){t.exports={"ant-avatar":"ant-avatar",antAvatar:"ant-avatar","ant-avatar-image":"ant-avatar-image",antAvatarImage:"ant-avatar-image","ant-avatar-string":"ant-avatar-string",antAvatarString:"ant-avatar-string","ant-avatar-icon":"ant-avatar-icon",antAvatarIcon:"ant-avatar-icon",anticon:"anticon","ant-avatar-lg":"ant-avatar-lg",antAvatarLg:"ant-avatar-lg","ant-avatar-lg-string":"ant-avatar-lg-string",antAvatarLgString:"ant-avatar-lg-string","ant-avatar-sm":"ant-avatar-sm",antAvatarSm:"ant-avatar-sm","ant-avatar-sm-string":"ant-avatar-sm-string",antAvatarSmString:"ant-avatar-sm-string","ant-avatar-square":"ant-avatar-square",antAvatarSquare:"ant-avatar-square"}},pWf2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==u(t)&&"function"!==typeof t)return{default:t};var e=s();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a)){var o=r?Object.getOwnPropertyDescriptor(t,a):null;o&&(o.get||o.set)?Object.defineProperty(n,a,o):n[a]=t[a]}n.default=t,e&&e.set(t,n);return n}(n("q1tI")),a=c(n("TSYQ")),o=n("vgIT"),i=c(n("aVg8"));function c(t){return t&&t.__esModule?t:{default:t}}function s(){if("function"!==typeof WeakMap)return null;var t=new WeakMap;return s=function(){return t},t}function u(t){return(u="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(){return(l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function p(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function d(t,e){return(d=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function v(t,e){return!e||"object"!==u(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function y(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function m(t){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var g=function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(t);a<r.length;a++)e.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(t,r[a])&&(n[r[a]]=t[r[a]])}return n},h=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&d(t,e)}(h,t);var e,n,c,s,u=(e=h,function(){var t,n=m(e);if(y()){var r=m(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return v(this,t)});function h(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,h),(t=u.apply(this,arguments)).state={scale:1,mounted:!1,isImgExist:!0},t.setScale=function(){if(t.avatarChildren&&t.avatarNode){var e=t.avatarChildren.offsetWidth,n=t.avatarNode.offsetWidth;0===e||0===n||t.lastChildrenWidth===e&&t.lastNodeWidth===n||(t.lastChildrenWidth=e,t.lastNodeWidth=n,t.setState({scale:n-8<e?(n-8)/e:1}))}},t.handleImgLoadError=function(){var e=t.props.onError;!1!==(e?e():void 0)&&t.setState({isImgExist:!1})},t.renderAvatar=function(e){var n,o,c=e.getPrefixCls,s=t.props,u=s.prefixCls,p=s.shape,d=s.size,v=s.src,y=s.srcSet,m=s.icon,h=s.className,b=s.alt,O=g(s,["prefixCls","shape","size","src","srcSet","icon","className","alt"]);(0,i.default)(!("string"===typeof m&&m.length>2),"Avatar","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(m,"` at https://ant.design/components/icon"));var j=t.state,w=j.isImgExist,S=j.scale,x=(j.mounted,c("avatar",u)),P=(0,a.default)((f(n={},"".concat(x,"-lg"),"large"===d),f(n,"".concat(x,"-sm"),"small"===d),n)),_=(0,a.default)(x,h,P,(f(o={},"".concat(x,"-").concat(p),p),f(o,"".concat(x,"-image"),v&&w),f(o,"".concat(x,"-icon"),m),o)),k="number"===typeof d?{width:d,height:d,lineHeight:"".concat(d,"px"),fontSize:m?d/2:18}:{},C=t.props.children;if(v&&w)C=r.createElement("img",{src:v,srcSet:y,onError:t.handleImgLoadError,alt:b});else if(m)C=m;else{if(t.avatarChildren||1!==S){var E="scale(".concat(S,") translateX(-50%)"),q={msTransform:E,WebkitTransform:E,transform:E},I="number"===typeof d?{lineHeight:"".concat(d,"px")}:{};C=r.createElement("span",{className:"".concat(x,"-string"),ref:function(e){return t.avatarChildren=e},style:l(l({},I),q)},C)}else{C=r.createElement("span",{className:"".concat(x,"-string"),style:{opacity:0},ref:function(e){return t.avatarChildren=e}},C)}}return(r.createElement("span",l({},O,{style:l(l({},k),O.style),className:_,ref:function(e){return t.avatarNode=e}}),C))},t}return n=h,(c=[{key:"componentDidMount",value:function(){this.setScale(),this.setState({mounted:!0})}},{key:"componentDidUpdate",value:function(t){this.setScale(),t.src!==this.props.src&&this.setState({isImgExist:!0,scale:1})}},{key:"render",value:function(){return r.createElement(o.ConfigConsumer,null,this.renderAvatar)}}])&&p(n.prototype,c),s&&p(n,s),h}(r.Component);e.default=h,h.defaultProps={shape:"circle",size:"default"}},uOxi:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/user/[username]",function(){return n("EE/t")}])}},[["uOxi",1,2,0,3,4,8,6,5,7,10,11,12,13,14,15,19,21,22,9]]]);