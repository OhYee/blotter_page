(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{"/0+H":function(e,t,n){"use strict";t.__esModule=!0,t.isInAmpMode=i,t.useAmp=function(){return i(o.default.useContext(a.AmpStateContext))};var r,o=(r=n("q1tI"))&&r.__esModule?r:{default:r},a=n("lwAK");function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,o=void 0!==r&&r,a=e.hasQuery;return n||o&&(void 0!==a&&a)}},"5fIB":function(e,t,n){var r=n("7eYB");e.exports=function(e){if(Array.isArray(e))return r(e)}},"8Kt/":function(e,t,n){"use strict";t.__esModule=!0,t.defaultHead=s,t.default=void 0;var r=u(n("q1tI")),o=u(n("Xuae")),a=n("lwAK"),i=n("FYa8"),c=n("/0+H");function u(e){return e&&e.__esModule?e:{default:e}}function s(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[r.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(r.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function f(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===r.default.Fragment?e.concat(r.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var l=["name","httpEquiv","charSet","itemProp"];function p(e,t){return e.reduce((function(e,t){var n=r.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(f,[]).reverse().concat(s(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(o){var a=!0;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){var i=o.key.slice(o.key.indexOf("$")+1);e.has(i)?a=!1:e.add(i)}switch(o.type){case"title":case"base":t.has(o.type)?a=!1:t.add(o.type);break;case"meta":for(var c=0,u=l.length;c<u;c++){var s=l[c];if(o.props.hasOwnProperty(s))if("charSet"===s)n.has(s)?a=!1:n.add(s);else{var f=o.props[s],p=r[s]||new Set;p.has(f)?a=!1:(p.add(f),r[s]=p)}}}return a}}()).reverse().map((function(e,t){var n=e.key||t;return r.default.cloneElement(e,{key:n})}))}var d=(0,o.default)();function h(e){var t=e.children;return(r.default.createElement(a.AmpStateContext.Consumer,null,(function(e){return r.default.createElement(i.HeadManagerContext.Consumer,null,(function(n){return r.default.createElement(d,{reduceComponentsToState:p,handleStateChange:n,inAmpMode:(0,c.isInAmpMode)(e)},t)}))})))}h.rewind=d.rewind;var v=h;t.default=v},HXPj:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n("q1tI"),o=n.n(r),a=n("IrJS"),i=n.n(a),c=o.a.createElement;function u(e){var t=e.src,n=e.className,r=e.style,o=e.children;return c("div",{className:[n,i.a.avatar].join(" "),style:r},!o&&t?c("img",{src:t}):o)}},IrJS:function(e,t,n){e.exports={avatar:"avatar___FhI1z"}},Xuae:function(e,t,n){"use strict";var r=n("/GRZ"),o=n("qXWd"),a=n("i2R6"),i=n("48fX"),c=n("tCBg"),u=n("T0f4"),s=n("mPvQ");function f(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=u(e);if(t){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}t.__esModule=!0,t.default=void 0;var l=n("q1tI"),p=!1;t.default=function(){var e,t=new Set;function n(n){e=n.props.reduceComponentsToState(s(t),n.props),n.props.handleStateChange&&n.props.handleStateChange(e)}return(function(c){i(s,c);var u=f(s);function s(e){var a;return r(this,s),a=u.call(this,e),p&&(t.add(o(a)),n(o(a))),a}return a(s,null,[{key:"rewind",value:function(){var n=e;return e=void 0,t.clear(),n}}]),a(s,[{key:"componentDidMount",value:function(){t.add(this),n(this)}},{key:"componentDidUpdate",value:function(){n(this)}},{key:"componentWillUnmount",value:function(){t.delete(this),n(this)}},{key:"render",value:function(){return null}}]),s}(l.Component))}},YFqc:function(e,t,n){e.exports=n("cTJO")},ZCUL:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/apps",function(){return n("r7gc")}])},cTJO:function(e,t,n){"use strict";var r=n("/GRZ"),o=n("i2R6"),a=n("48fX"),i=n("tCBg"),c=n("T0f4");function u(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=c(e);if(t){var o=c(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return i(this,n)}}var s=n("AroE"),f=n("7KCV");t.__esModule=!0,t.default=void 0;var l,p=f(n("q1tI")),d=n("QmWs"),h=n("g/15"),v=s(n("nOHt")),y=n("elyg");function m(e){return e&&"object"===typeof e?(0,h.formatWithValidation)(e):e}var g=new Map,b=window.IntersectionObserver,w={};function k(){return l||(b?l=new b((function(e){e.forEach((function(e){if(g.has(e.target)){var t=g.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(l.unobserve(e.target),g.delete(e.target),t())}}))}),{rootMargin:"200px"}):void 0)}var O=function(e){a(n,e);var t=u(n);function n(e){var o;return r(this,n),(o=t.call(this,e)).p=void 0,o.cleanUpListeners=function(){},o.formatUrls=function(e){var t=null,n=null,r=null;return function(o,a){if(r&&o===t&&a===n)return r;var i=e(o,a);return t=o,n=a,r=i,i}}((function(e,t){return{href:(0,y.addBasePath)(m(e)),as:t?(0,y.addBasePath)(m(t)):t}})),o.linkClicked=function(e){var t=e.currentTarget,n=t.nodeName,r=t.target;if("A"!==n||!(r&&"_self"!==r||e.metaKey||e.ctrlKey||e.shiftKey||e.nativeEvent&&2===e.nativeEvent.which)){var a=o.formatUrls(o.props.href,o.props.as),i=a.href,c=a.as;if(function(e){var t=(0,d.parse)(e,!1,!0),n=(0,d.parse)((0,h.getLocationOrigin)(),!1,!0);return!t.host||t.protocol===n.protocol&&t.host===n.host}(i)){var u=window.location.pathname;i=(0,d.resolve)(u,i),c=c?(0,d.resolve)(u,c):i,e.preventDefault();var s=o.props.scroll;null==s&&(s=c.indexOf("#")<0),v.default[o.props.replace?"replace":"push"](i,c,{shallow:o.props.shallow}).then((function(e){e&&s&&(window.scrollTo(0,0),document.body.focus())}))}}},o.p=!1!==e.prefetch,o}return o(n,[{key:"componentWillUnmount",value:function(){this.cleanUpListeners()}},{key:"getPaths",value:function(){var e=window.location.pathname,t=this.formatUrls(this.props.href,this.props.as),n=t.href,r=t.as,o=(0,d.resolve)(e,n);return[o,r?(0,d.resolve)(e,r):o]}},{key:"handleRef",value:function(e){var t=this;this.p&&b&&e&&e.tagName&&(this.cleanUpListeners(),w[this.getPaths().join("%")]||(this.cleanUpListeners=function(e,t){var n=k();return n?(n.observe(e),g.set(e,t),function(){try{n.unobserve(e)}catch(t){console.error(t)}g.delete(e)}):function(){}}(e,(function(){t.prefetch()}))))}},{key:"prefetch",value:function(e){if(this.p){var t=this.getPaths();v.default.prefetch(t[0],t[1],e).catch((function(e){0})),w[t.join("%")]=!0}}},{key:"render",value:function(){var e=this,t=this.props.children,n=this.formatUrls(this.props.href,this.props.as),r=n.href,o=n.as;"string"===typeof t&&(t=p.default.createElement("a",null,t));var a=p.Children.only(t),i={ref:function(t){e.handleRef(t),a&&"object"===typeof a&&a.ref&&("function"===typeof a.ref?a.ref(t):"object"===typeof a.ref&&(a.ref.current=t))},onMouseEnter:function(t){a.props&&"function"===typeof a.props.onMouseEnter&&a.props.onMouseEnter(t),e.prefetch({priority:!0})},onClick:function(t){a.props&&"function"===typeof a.props.onClick&&a.props.onClick(t),t.defaultPrevented||e.linkClicked(t)}};return!this.props.passHref&&("a"!==a.type||"href"in a.props)||(i.href=o||r),p.default.cloneElement(a,i)}}]),n}(p.Component);t.default=O},kG2m:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},lwAK:function(e,t,n){"use strict";var r;t.__esModule=!0,t.AmpStateContext=void 0;var o=((r=n("q1tI"))&&r.__esModule?r:{default:r}).default.createContext({});t.AmpStateContext=o},mPvQ:function(e,t,n){var r=n("5fIB"),o=n("rlHP"),a=n("KckH"),i=n("kG2m");e.exports=function(e){return r(e)||o(e)||a(e)||i()}},r7gc:function(e,t,n){"use strict";n.r(t);var r=n("o0o1"),o=n.n(r),a=n("HaE+"),i=n("rePB"),c=n("1OyB"),u=n("vuIU"),s=n("Ji7U"),f=n("md7G"),l=n("foSv"),p=n("q1tI"),d=n.n(p),h=n("8Kt/"),v=n.n(h),y=n("bTPZ"),m=n("HXPj"),g=n("Oi1/"),b=n("Au3V"),w=n("YFqc"),k=n.n(w),O=n("pJr+"),S=n("dSKx"),C=d.a.createElement;function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function _(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(l.a)(e);if(t){var o=Object(l.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}var x=function(e){Object(s.a)(n,e);var t=_(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).state={loading:!1},r}return Object(u.a)(n,[{key:"render",value:function(){return C(y.a,{neumorphism:!0},C(S.a.Consumer,null,(function(e){return C(v.a,null,C("title",null,"\u5e94\u7528\u5217\u8868|".concat(e.blog_name)))})),C(O.a,{mainAxis:"space-around"},this.props.apps.map((function(e){return C(O.a,{key:e.name,direction:"TB",fullWidth:!0},C(k.a,{href:e.link,key:e.name,passHref:!0},C(b.a,{neumorphism:!0,icon:"undefined"!==typeof e.img?C(m.a,{src:e.img,style:j({fontSize:64},e.style)}):C(m.a,{style:j({fontSize:64},e.style)},C(g.S,{icon:e.icon})),style:{fontSize:64,borderRadius:10}})),C("p",{style:{textAlign:"center"}},e.name))}))))}}],[{key:"getInitialProps",value:function(){var e=Object(a.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",{apps:[{name:"\u52a8\u68ee\u5019\u673a\u5927\u5385",link:"/apps/queue",img:"https://static.oyohyee.com/apps/queue.png"},{name:"\u5728\u7ebf\u5bc6\u7801\u5b66",link:"/apps/crypto",icon:"lock",style:{color:" #109025"}},{name:"\u6e38\u8bb0",link:"/apps/travels",icon:"compass",style:{color:" #f30000"}}]});case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),n}(d.a.Component);t.default=x},rlHP:function(e,t){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}}},[["ZCUL",0,2,1,3,7]]]);