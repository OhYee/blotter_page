(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{"3nDQ":function(e,r,t){e.exports={color:"color___2WBY8",primary:"primary___a0AGn",secondary:"secondary___3qQjV",ellipsis:"ellipsis___IDoKh"}},HXPj:function(e,r,t){"use strict";t.d(r,"a",(function(){return c}));var a=t("q1tI"),n=t.n(a),f=t("IrJS"),o=t.n(f),i=n.a.createElement;function c(e){var r=e.src,t=e.className,a=e.style,n=e.children;return i("div",{className:[t,o.a.avatar].join(" "),style:a},!n&&r?i("img",{src:r}):n)}},Hfro:function(e,r,t){e.exports={tag:"tag___CfNDX"}},IrJS:function(e,r,t){e.exports={avatar:"avatar___FhI1z"}},LjQu:function(e,r,t){"use strict";t.d(r,"a",(function(){return q}));var a=t("rePB"),n=t("ODXe"),f=t("q1tI"),o=t.n(f),i=t("YFqc"),c=t.n(i),l=t("HXPj"),s=t("Hh1h"),u=t("pJr+"),d={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",feldspar:"#d19275",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslateblue:"#8470ff",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",violetred:"#d02090",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},p=/(^#([0-9A-F]{1,2})([0-9A-F]{1,2})([0-9A-F]{1,2})$)/i,h=/^rgb\((\d+),(\d+),(\d+)\)$/i;function b(e){return Math.min(255,Math.max(0,Math.round(e))).toString(16).padStart(2,"0")}function g(e){e=e.replace(/ /g,"").toLowerCase();var r=0,t=0,a=0;if(d[e]&&(e=d[e]),p.test(e)){var n=p.exec(e),f=n[2],o=n[3],i=n[4];1===f.length&&(f+=f),1===o.length&&(o+=o),1===i.length&&(i+=i),r=parseInt(f,16),t=parseInt(o,16),a=parseInt(i,16)}else if(h.test(e)){var c=p.exec(e);r=parseInt(c[1]),t=parseInt(c[2]),a=parseInt(c[3])}return[r,t,a]}var v=t("Hfro"),m=t.n(v),y=t("3nDQ"),k=t.n(y),w=t("PWtr"),O=t.n(w),j=o.a.createElement;function _(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function P(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?_(Object(t),!0).forEach((function(r){Object(a.a)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):_(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function M(e){var r=g(e),t=Object(n.a)(r,3),a=function(e,r,t){e/=255,r/=255,t/=255;var a,n,f=Math.min(e,r,t),o=Math.max(e,r,t),i=o-f,c=(f+o)/2;if(o==f)a=0,n=0;else{switch(n=c>.5?i/(2-o-f):i/(o+f),o){case e:a=(r-t)/i+(r<t?6:0);break;case r:a=2+(t-e)/i;break;case t:a=4+(e-r)/i}a=Math.round(60*a)}return[a,n=Math.round(100*n),c=Math.round(100*c)]}(t[0],t[1],t[2]),f=Object(n.a)(a,3),o=f[0],i=f[1],c=f[2],l=function(e,r,t){e/=360,t/=100;var a=[];if(0==(r=r/100))a=[Math.round(255*t),Math.round(255*t),Math.round(255*t)];else for(var n=t>=.5?t+r-t*r:t*(1+r),f=2*t-n,o=(a[0]=e+1/3,a[1]=e,a[2]=e-1/3,0);o<a.length;o++){var i=a[o];switch(i<0?i+=1:i>1&&(i-=1),!0){case i<1/6:i=f+6*(n-f)*i;break;case 1/6<=i&&i<.5:i=n;break;case.5<=i&&i<2/3:i=f+(n-f)*(4-6*i);break;default:i=f}a[o]=Math.round(255*i)}return a}(o,100,c>50?c-50:c<=25?100-c:i>50?100:c+50),s=Object(n.a)(l,3),u=s[0],d=s[1],p=s[2];return"#".concat(b(u)).concat(b(d)).concat(b(p))}function q(e){var r=e.tag,t=e.onClose,a=e.className,n=e.style;return j(c.a,{href:"/tag/[tag]",as:"/tag/".concat(r.short)},j("a",null,j(u.a,{className:Object(s.a)(m.a.tag,a,k.a.color,O.a.neumorphism_light,O.a.clickable),mainAxis:"space-around",mainSize:"small",wrap:!1,style:P(P({},r.color?{background:r.color,color:M(r.color)}:{}),n)},r.icon?j(l.a,{src:r.icon,style:{fontSize:"0.75em",background:"white"}}):null,r.name,t?"x":null)))}},YFqc:function(e,r,t){e.exports=t("cTJO")},cTJO:function(e,r,t){"use strict";var a=t("/GRZ"),n=t("i2R6"),f=t("48fX"),o=t("tCBg"),i=t("T0f4");function c(e){var r=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,a=i(e);if(r){var n=i(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return o(this,t)}}var l=t("AroE"),s=t("7KCV");r.__esModule=!0,r.default=void 0;var u,d=s(t("q1tI")),p=t("QmWs"),h=t("g/15"),b=l(t("nOHt")),g=t("elyg");function v(e){return e&&"object"===typeof e?(0,h.formatWithValidation)(e):e}var m=new Map,y=window.IntersectionObserver,k={};function w(){return u||(y?u=new y((function(e){e.forEach((function(e){if(m.has(e.target)){var r=m.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(u.unobserve(e.target),m.delete(e.target),r())}}))}),{rootMargin:"200px"}):void 0)}var O=function(e){f(t,e);var r=c(t);function t(e){var n;return a(this,t),(n=r.call(this,e)).p=void 0,n.cleanUpListeners=function(){},n.formatUrls=function(e){var r=null,t=null,a=null;return function(n,f){if(a&&n===r&&f===t)return a;var o=e(n,f);return r=n,t=f,a=o,o}}((function(e,r){return{href:(0,g.addBasePath)(v(e)),as:r?(0,g.addBasePath)(v(r)):r}})),n.linkClicked=function(e){var r=e.currentTarget,t=r.nodeName,a=r.target;if("A"!==t||!(a&&"_self"!==a||e.metaKey||e.ctrlKey||e.shiftKey||e.nativeEvent&&2===e.nativeEvent.which)){var f=n.formatUrls(n.props.href,n.props.as),o=f.href,i=f.as;if(function(e){var r=(0,p.parse)(e,!1,!0),t=(0,p.parse)((0,h.getLocationOrigin)(),!1,!0);return!r.host||r.protocol===t.protocol&&r.host===t.host}(o)){var c=window.location.pathname;o=(0,p.resolve)(c,o),i=i?(0,p.resolve)(c,i):o,e.preventDefault();var l=n.props.scroll;null==l&&(l=i.indexOf("#")<0),b.default[n.props.replace?"replace":"push"](o,i,{shallow:n.props.shallow}).then((function(e){e&&l&&(window.scrollTo(0,0),document.body.focus())}))}}},n.p=!1!==e.prefetch,n}return n(t,[{key:"componentWillUnmount",value:function(){this.cleanUpListeners()}},{key:"getPaths",value:function(){var e=window.location.pathname,r=this.formatUrls(this.props.href,this.props.as),t=r.href,a=r.as,n=(0,p.resolve)(e,t);return[n,a?(0,p.resolve)(e,a):n]}},{key:"handleRef",value:function(e){var r=this;this.p&&y&&e&&e.tagName&&(this.cleanUpListeners(),k[this.getPaths().join("%")]||(this.cleanUpListeners=function(e,r){var t=w();return t?(t.observe(e),m.set(e,r),function(){try{t.unobserve(e)}catch(r){console.error(r)}m.delete(e)}):function(){}}(e,(function(){r.prefetch()}))))}},{key:"prefetch",value:function(e){if(this.p){var r=this.getPaths();b.default.prefetch(r[0],r[1],e).catch((function(e){0})),k[r.join("%")]=!0}}},{key:"render",value:function(){var e=this,r=this.props.children,t=this.formatUrls(this.props.href,this.props.as),a=t.href,n=t.as;"string"===typeof r&&(r=d.default.createElement("a",null,r));var f=d.Children.only(r),o={ref:function(r){e.handleRef(r),f&&"object"===typeof f&&f.ref&&("function"===typeof f.ref?f.ref(r):"object"===typeof f.ref&&(f.ref.current=r))},onMouseEnter:function(r){f.props&&"function"===typeof f.props.onMouseEnter&&f.props.onMouseEnter(r),e.prefetch({priority:!0})},onClick:function(r){f.props&&"function"===typeof f.props.onClick&&f.props.onClick(r),r.defaultPrevented||e.linkClicked(r)}};return!this.props.passHref&&("a"!==f.type||"href"in f.props)||(o.href=n||a),d.default.cloneElement(f,o)}}]),t}(d.Component);r.default=O}}]);