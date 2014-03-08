/**
 * almond 0.2.7 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

/**
 * engineDetector version: "0.0.18" Copyright (c) 2011-2012, Cyril Agosta ( cyril.agosta.dev@gmail.com) All Rights Reserved.
 * Available via the MIT license.
 * see: http://github.com/cagosta/engineDetector for details
 */

!function(){var e,n,o;!function(i){function t(e,n){return N.call(e,n)}function s(e,n){var o,i,t,s,r,c,u,f,l,p,a=n&&n.split("/"),d=_.map,h=d&&d["*"]||{};if(e&&"."===e.charAt(0))if(n){for(a=a.slice(0,a.length-1),e=a.concat(e.split("/")),f=0;f<e.length;f+=1)if(p=e[f],"."===p)e.splice(f,1),f-=1;else if(".."===p){if(1===f&&(".."===e[2]||".."===e[0]))break;f>0&&(e.splice(f-1,2),f-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((a||h)&&d){for(o=e.split("/"),f=o.length;f>0;f-=1){if(i=o.slice(0,f).join("/"),a)for(l=a.length;l>0;l-=1)if(t=d[a.slice(0,l).join("/")],t&&(t=t[i])){s=t,r=f;break}if(s)break;!c&&h&&h[i]&&(c=h[i],u=f)}!s&&c&&(s=c,r=u),s&&(o.splice(0,r,s),e=o.join("/"))}return e}function r(e,n){return function(){return d.apply(i,j.call(arguments,0).concat([e,n]))}}function c(e){return function(n){return s(n,e)}}function u(e){return function(n){g[e]=n}}function f(e){if(t(m,e)){var n=m[e];delete m[e],b[e]=!0,a.apply(i,n)}if(!t(g,e)&&!t(b,e))throw new Error("No "+e);return g[e]}function l(e){var n,o=e?e.indexOf("!"):-1;return o>-1&&(n=e.substring(0,o),e=e.substring(o+1,e.length)),[n,e]}function p(e){return function(){return _&&_.config&&_.config[e]||{}}}var a,d,h,w,g={},m={},_={},b={},N=Object.prototype.hasOwnProperty,j=[].slice;h=function(e,n){var o,i=l(e),t=i[0];return e=i[1],t&&(t=s(t,n),o=f(t)),t?e=o&&o.normalize?o.normalize(e,c(n)):s(e,n):(e=s(e,n),i=l(e),t=i[0],e=i[1],t&&(o=f(t))),{f:t?t+"!"+e:e,n:e,pr:t,p:o}},w={require:function(e){return r(e)},exports:function(e){var n=g[e];return"undefined"!=typeof n?n:g[e]={}},module:function(e){return{id:e,uri:"",exports:g[e],config:p(e)}}},a=function(e,n,o,s){var c,l,p,a,d,_,N=[],j=typeof o;if(s=s||e,"undefined"===j||"function"===j){for(n=!n.length&&o.length?["require","exports","module"]:n,d=0;d<n.length;d+=1)if(a=h(n[d],s),l=a.f,"require"===l)N[d]=w.require(e);else if("exports"===l)N[d]=w.exports(e),_=!0;else if("module"===l)c=N[d]=w.module(e);else if(t(g,l)||t(m,l)||t(b,l))N[d]=f(l);else{if(!a.p)throw new Error(e+" missing "+l);a.p.load(a.n,r(s,!0),u(l),{}),N[d]=g[l]}p=o?o.apply(g[e],N):void 0,e&&(c&&c.exports!==i&&c.exports!==g[e]?g[e]=c.exports:p===i&&_||(g[e]=p))}else e&&(g[e]=o)},e=n=d=function(e,n,o,t,s){return"string"==typeof e?w[e]?w[e](n):f(h(e,n).f):(e.splice||(_=e,n.splice?(e=n,n=o,o=null):e=i),n=n||function(){},"function"==typeof o&&(o=t,t=s),t?a(i,e,n,o):setTimeout(function(){a(i,e,n,o)},4),d)},d.config=function(e){return _=e,_.deps&&d(_.deps,_.callback),d},e._defined=g,o=function(e,n,o){n.splice||(o=n,n=[]),t(g,e)||t(m,e)||(m[e]=[e,n,o])},o.amd={jQuery:!0}}(),o("bower_components/almond/almond",function(){}),o("engineDetector/EngineDetector",[],function(){var e=function(){this.isNode=!1,this.isBrowser=!1,this.isUnknown=!1,this._exports,this.detect()};return e.prototype={detect:function(){try{process.argv,this._setAsNode()}catch(e){}try{window.location.search,this._setAsBrowser()}catch(e){}this.isNode||this.isBrowser||this._setAsUnknown()},_setAsNode:function(){this.isNode=!0,this.name="node"},_setAsBrowser:function(){this.isBrowser=!0,this._global=window,this.name="browser"},_setAsUnknown:function(){this.isUnknown=!0,this.name="unknown"},setGlobal:function(e){this._global=e},ifNode:function(e){this.isNode&&e()},ifNotNode:function(e){this.isNode||e()},ifNotBrowser:function(e){this.isBrowser||e()},ifBrowser:function(e){this.isBrowser&&e()},exports:function(e,n){this.isNode?this._global.exports=n:this.isBrowser&&(this._global[e]=n)}},e}),o("engineDetector/engineDetector",["./EngineDetector"],function(e){return new e});var i=function(){this.isNode=!1,this.isBrowser=!1,this.isUnknown=!1,this._exports,this.detect()};i.prototype={detect:function(){"undefined"!=typeof module&&module.exports?this._setAsNode():"undefined"!=typeof window?this._setAsBrowser():this._setAsUnknown()},_setAsNode:function(){this.isNode=!0,this.name="node"},_setAsBrowser:function(){this.isBrowser=!0,this._global=window,this.name="browser"},_setAsUnknown:function(){this.isUnknown=!0,this.name="unknown"},setGlobal:function(e){this._global=e},ifNode:function(e){this.isNode&&e()},ifBrowser:function(e){this.isBrowser&&e()},exports:function(e,n){this.isNode?this._global.exports=n:this.isBrowser&&(this._global[e]=n)}};var t,e,s=new i;s.ifNode(function(){t=__dirname,e=n("requirejs"),s.setGlobal(module)}),s.ifBrowser(function(){t="."}),e.config({baseUrl:function(){return"undefined"==typeof o?__dirname:"."}(),shim:{mocha:{exports:"mocha"}},paths:{engineDetector:".",ifEngineIsNode:"engineDetector/ifEngineIsNode",ifEngineIsBrowser:"engineDetector/ifEngineIsBrowser",fakeWindowOnNode:"engineDetector/fakeWindowOnNode",almond:"bower_components/almond/almond",chai:"bower_components/chai/chai","chai-as-promised":"bower_components/chai-as-promised/lib/chai-as-promised",mocha:"bower_components/mocha/mocha","normalize-css":"bower_components/normalize-css/normalize.css",requirejs:"bower_components/requirejs/require",async:"bower_components/requirejs-plugins/src/async",depend:"bower_components/requirejs-plugins/src/depend",font:"bower_components/requirejs-plugins/src/font",goog:"bower_components/requirejs-plugins/src/goog",image:"bower_components/requirejs-plugins/src/image",json:"bower_components/requirejs-plugins/src/json",mdown:"bower_components/requirejs-plugins/src/mdown",noext:"bower_components/requirejs-plugins/src/noext",propertyParser:"bower_components/requirejs-plugins/src/propertyParser","Markdown.Converter":"bower_components/requirejs-plugins/lib/Markdown.Converter",text:"bower_components/requirejs-plugins/lib/text","sinon-chai":"bower_components/sinon-chai/lib/sinon-chai",sinonjs:"bower_components/sinonjs/sinon"}});var r=!!e._defined,c=r;if(s.ifNode(function(){c=!0}),c){var u=e("engineDetector/engineDetector");s.exports("engineDetector",u)}else e(["engineDetector/engineDetector"],function(e){s.exports("engineDetector",e)});o("engineDetector/main",function(){})}();