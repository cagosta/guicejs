/**
 * almond 0.2.7 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

/**
 * engineDetector version: "0.0.23" Copyright (c) 2011-2012, Cyril Agosta ( cyril.agosta.dev@gmail.com) All Rights Reserved.
 * Available via the MIT license.
 * see: http://github.com/cagosta/engineDetector for details
 */

var requirejs,require,define;!function(e){function n(e,n){return m.call(e,n)}function o(e,n){var o,i,r,t,s,c,u,f,l,a,p=n&&n.split("/"),d=g.map,h=d&&d["*"]||{};if(e&&"."===e.charAt(0))if(n){for(p=p.slice(0,p.length-1),e=p.concat(e.split("/")),f=0;f<e.length;f+=1)if(a=e[f],"."===a)e.splice(f,1),f-=1;else if(".."===a){if(1===f&&(".."===e[2]||".."===e[0]))break;f>0&&(e.splice(f-1,2),f-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((p||h)&&d){for(o=e.split("/"),f=o.length;f>0;f-=1){if(i=o.slice(0,f).join("/"),p)for(l=p.length;l>0;l-=1)if(r=d[p.slice(0,l).join("/")],r&&(r=r[i])){t=r,s=f;break}if(t)break;!c&&h&&h[i]&&(c=h[i],u=f)}!t&&c&&(t=c,s=u),t&&(o.splice(0,s,t),e=o.join("/"))}return e}function i(n,o){return function(){return l.apply(e,b.call(arguments,0).concat([n,o]))}}function r(e){return function(n){return o(n,e)}}function t(e){return function(n){d[e]=n}}function s(o){if(n(h,o)){var i=h[o];delete h[o],w[o]=!0,f.apply(e,i)}if(!n(d,o)&&!n(w,o))throw new Error("No "+o);return d[o]}function c(e){var n,o=e?e.indexOf("!"):-1;return o>-1&&(n=e.substring(0,o),e=e.substring(o+1,e.length)),[n,e]}function u(e){return function(){return g&&g.config&&g.config[e]||{}}}var f,l,a,p,d={},h={},g={},w={},m=Object.prototype.hasOwnProperty,b=[].slice;a=function(e,n){var i,t=c(e),u=t[0];return e=t[1],u&&(u=o(u,n),i=s(u)),u?e=i&&i.normalize?i.normalize(e,r(n)):o(e,n):(e=o(e,n),t=c(e),u=t[0],e=t[1],u&&(i=s(u))),{f:u?u+"!"+e:e,n:e,pr:u,p:i}},p={require:function(e){return i(e)},exports:function(e){var n=d[e];return"undefined"!=typeof n?n:d[e]={}},module:function(e){return{id:e,uri:"",exports:d[e],config:u(e)}}},f=function(o,r,c,u){var f,l,g,m,b,_,j=[],q=typeof c;if(u=u||o,"undefined"===q||"function"===q){for(r=!r.length&&c.length?["require","exports","module"]:r,b=0;b<r.length;b+=1)if(m=a(r[b],u),l=m.f,"require"===l)j[b]=p.require(o);else if("exports"===l)j[b]=p.exports(o),_=!0;else if("module"===l)f=j[b]=p.module(o);else if(n(d,l)||n(h,l)||n(w,l))j[b]=s(l);else{if(!m.p)throw new Error(o+" missing "+l);m.p.load(m.n,i(u,!0),t(l),{}),j[b]=d[l]}g=c?c.apply(d[o],j):void 0,o&&(f&&f.exports!==e&&f.exports!==d[o]?d[o]=f.exports:g===e&&_||(d[o]=g))}else o&&(d[o]=c)},requirejs=require=l=function(n,o,i,r,t){return"string"==typeof n?p[n]?p[n](o):s(a(n,o).f):(n.splice||(g=n,o.splice?(n=o,o=i,i=null):n=e),o=o||function(){},"function"==typeof i&&(i=r,r=t),r?f(e,n,o,i):setTimeout(function(){f(e,n,o,i)},4),l)},l.config=function(e){return g=e,g.deps&&l(g.deps,g.callback),l},requirejs._defined=d,define=function(e,o,i){o.splice||(i=o,o=[]),n(d,e)||n(h,e)||(h[e]=[e,o,i])},define.amd={jQuery:!0}}(),define("bower_components/almond/almond",function(){}),define("engineDetector/EngineDetector",[],function(){var e=function(){this.isNode=!1,this.isBrowser=!1,this.isUnknown=!1,this._exports,this.detect()};return e.prototype={detect:function(){try{process.argv,this._setAsNode()}catch(e){}try{window.location.search,this._setAsBrowser()}catch(e){}this.isNode||this.isBrowser||this._setAsUnknown()},_setAsNode:function(){this.isNode=!0,this.name="node"},_setAsBrowser:function(){this.isBrowser=!0,this._global=window,this.name="browser"},_setAsUnknown:function(){this.isUnknown=!0,this.name="unknown"},setGlobal:function(e){this._global=e},ifNode:function(e){this.isNode&&e()},ifNotNode:function(e){this.isNode||e()},ifNotBrowser:function(e){this.isBrowser||e()},ifBrowser:function(e){this.isBrowser&&e()},exports:function(e,n){this.isNode?this._global.exports=n:this.isBrowser&&(this._global[e]=n)}},e}),define("engineDetector/engineDetector",["./EngineDetector"],function(e){return new e});var EngineDetector=function(){this.isNode=!1,this.isBrowser=!1,this.isUnknown=!1,this._exports,this.detect()};EngineDetector.prototype={detect:function(){"undefined"!=typeof module&&module.exports?this._setAsNode():"undefined"!=typeof window?this._setAsBrowser():this._setAsUnknown()},_setAsNode:function(){this.isNode=!0,this.name="node"},_setAsBrowser:function(){this.isBrowser=!0,this._global=window,this.name="browser"},_setAsUnknown:function(){this.isUnknown=!0,this.name="unknown"},setGlobal:function(e){this._global=e},ifNode:function(e){this.isNode&&e()},ifBrowser:function(e){this.isBrowser&&e()},exports:function(e,n){this.isNode?this._global.exports=n:this.isBrowser&&(this._global[e]=n)}};var engine=new EngineDetector,baseUrl,requirejs;engine.ifNode(function(){baseUrl=__dirname,requirejs=require("requirejs"),engine.setGlobal(module)}),engine.ifBrowser(function(){baseUrl="."}),requirejs.config({baseUrl:function(){return"undefined"==typeof define?__dirname:"."}(),shim:{mocha:{exports:"mocha"}},paths:{engineDetector:".",ifEngineIsNode:"engineDetector/ifEngineIsNode",ifEngineIsBrowser:"engineDetector/ifEngineIsBrowser",fakeWindowOnNode:"engineDetector/fakeWindowOnNode",almond:"bower_components/almond/almond",chai:"bower_components/chai/chai","chai-as-promised":"bower_components/chai-as-promised/lib/chai-as-promised",mocha:"bower_components/mocha/mocha","normalize-css":"bower_components/normalize-css/normalize.css",requirejs:"bower_components/requirejs/require",async:"bower_components/requirejs-plugins/src/async",depend:"bower_components/requirejs-plugins/src/depend",font:"bower_components/requirejs-plugins/src/font",goog:"bower_components/requirejs-plugins/src/goog",image:"bower_components/requirejs-plugins/src/image",json:"bower_components/requirejs-plugins/src/json",mdown:"bower_components/requirejs-plugins/src/mdown",noext:"bower_components/requirejs-plugins/src/noext",propertyParser:"bower_components/requirejs-plugins/src/propertyParser","Markdown.Converter":"bower_components/requirejs-plugins/lib/Markdown.Converter",text:"bower_components/requirejs-plugins/lib/text","sinon-chai":"bower_components/sinon-chai/lib/sinon-chai",sinonjs:"bower_components/sinonjs/sinon"}});var isStandalone=!!requirejs._defined,synchronous=isStandalone;if(engine.ifNode(function(){synchronous=!0}),synchronous){var engineDetector=requirejs("engineDetector/engineDetector");engine.exports("engineDetector",engineDetector)}else requirejs(["engineDetector/engineDetector"],function(e){engine.exports("engineDetector",e)});define("engineDetector/main",function(){});