/**
 * Array.nocomplex version: "0.0.19" Copyright (c) 2011-2012, Cyril Agosta ( cyril.agosta@gmail.com) All Rights Reserved.
 * Available via the MIT license.
 * see: http://github.com/cagosta/Array.nocomplex for details
 */

define("Array.nocomplex/collect",[],function(){Array.prototype.collect=function(r){var n=[];if("string"==typeof r)for(var e=-1,t=this.length;++e<t;)n.push(this[e][r]);else for(var e=-1,t=this.length;++e<t;)n.push(r(this[e]));return n}}),define("Array.nocomplex/each",[],function(){Array.prototype.each=function(r){for(var n=0,e=this.length;e>n;n++)r(this[n],n);return this}}),define("Array.nocomplex/first",[],function(){Array.prototype.first=function(r){for(var n=0,e=this.length;e>n;n++)if(r(this[n]))return this[n];return null}}),define("Array.nocomplex/has",[],function(){Array.prototype.has=function(r){for(var n=this.length;n--;)if(this[n]===r)return!0;return!1}}),define("Array.nocomplex/last",[],function(){Array.prototype.last=function(){return this[this.length-1]}}),define("Array.nocomplex/map",[],function(){Array.prototype.map=Array.prototype.map||function(r,n){n&&(r=r.bind(n));var e=this.slice();if("function"==typeof r)for(var t=0,o=e.length;o>t;t++)e[t]=r(e[t],t);else{r=r.substr(2,r.length);for(var t=0,o=e.length;o>t;t++)e[t]=e[t][r]()}return e}}),define("Array.nocomplex/onEls",[],function(){Array.prototype.onEls=function(r){for(var n=this.length;n--;)this[n]=r(this[n],n);return this}}),define("Array.nocomplex/remove",[],function(){Array.prototype.remove=function(r){for(var n=this.length;n--;)this[n]===r&&this.splice(n,1);return this}}),define("Array.nocomplex/removeOneValue",[],function(){Array.prototype.removeOneValue=function(r){for(var n=this.length;n--;)if(this[n]===r)return this.splice(n,1)}}),define("Array.nocomplex/except",[],function(){Array.prototype.except=function(r){for(var n=[],e=0,t=this.length;t>e;e++)this[e]!==r&&n.push(this[e]);return n}}),define("Array.nocomplex/exceptFn",[],function(){Array.prototype.exceptFn=function(r){for(var n=this.slice(),e=n.length;e--;)r(n[e])&&n.splice(e,1);return n}}),define("Array.nocomplex/indexOf",[],function(){Array.prototype.indexOf=Array.prototype.indexOf||function(r){var n,e;for(n=0,e=this.length;e>n;n++)if(this[n]===r)return n;return-1}}),define("Array.nocomplex/isIn",["./has"],function(){Array.prototype.isIn=function(r){for(var n=this.length;n--;)if(!r.has(this[n]))return!1;return!0}}),define("Array.nocomplex/send",[],function(){Array.prototype.send=function(r){var n=Array.prototype.slice.call(arguments);if(n.splice(0,1),"string"==typeof r)for(var e=-1,t=this.length;++e<t;)this[e]&&this[e][r].apply(this[e],n);else for(var e=-1,t=this.length;++e<t;)r.apply({},[this[e]].concat(n));return this}}),define("Array.nocomplex/uniq",["./has"],function(){Array.prototype.uniq=function(r){if(r){for(var n=[],e=[],t=0,o=this.length;o>t;t++){var i=r(this[t]);e.has(i)||(n.push(this[t]),e.push(i))}return n}for(var n=[],t=this.length;t--;)!n.has(this[t])&&n.push(this[t]);return n}}),define("Array.nocomplex/equals",["./isIn"],function(){Array.prototype.equals=function(r){return this.isIn(r)&&r.isIn(this)?!0:!1}}),define("Array.nocomplex/find",[],function(){Array.prototype.find=function(r){for(var n=0,e=this.length;e>n;n++)if(r(this[n],n))return this[n];return!1},Array.prototype.findReverse=function(r){for(var n=this.length;n--;)if(r(this[n],n))return this[n];return!1}}),define("Array.nocomplex/where",[],function(){Array.prototype.where=function(r){for(var n=[],e=0,t=this.length;t>e;e++)r(this[e])&&n.push(this[e]);return n}}),define("Array.nocomplex/findIndexOf",[],function(){Array.prototype.findIndexOf=function(r){for(var n=0,e=this.length;e>n;n++)if(r(this[n],n))return n;return!1}}),define("Array.nocomplex/findByKey",[],function(){Array.prototype.findByKey=function(r,n){for(var e=0,t=this.length;t>e;e++)if(this[e][r]===n)return this[e];return!1}}),define("Array.nocomplex/basics",["./collect","./each","./first","./has","./last","./map","./onEls","./remove","./removeOneValue","./remove","./except","./exceptFn","./indexOf","./isIn","./send","./uniq","./equals","./find","./where","./findIndexOf","./findByKey"],function(){return Array.prototype}),define("Array.nocomplex/math/all",[],function(){var r={equals:function(r){for(var n=this.length;n--;)if(r[n]!==this[n])return!1;return!0},multiply:function(r){var n=[];if("number"==typeof r)for(var e=this.length;e--;)n[e]=this[e]*r;else for(var e=this.length;e--;)n[e]=this[e]*r[e];return n},divide:function(r){var n=[];if("number"==typeof r)for(var e=this.length;e--;)n[e]=this[e]/r;else for(var e=this.length;e--;)n[e]=this[e]/r[e];return n},min:function(r){var n=r?this.map(r):this;return Math.min.apply(null,n)},minMax:function(r){return[this.min(r),this.max(r)]},max:function(r){var n=r?this.map(r):this;return Math.max.apply(null,n)},average:function(){for(var r=0,n=this.length;n--;)r+=this[n];return r/this.length},minus:function(r){var n=[];if("number"==typeof r)for(var e=this.length;e--;)n[e]=this[e]-r;else for(var e=this.length;e--;)n[e]=this[e]-r[e];return n},domain:function(r,n){var e,t,o=n&&"number"==typeof n[0]?n[0]:this.min(),i=n&&"number"==typeof n[1]?n[1]:this.max();return o===i?this.map(function(){return r[0]}):(e=(r[1]-r[0])/(i-o),t=(r[0]*i-r[1]*o)/(i-o),this.multiply(e).add(t))},add:function(r){var n=[];if("number"==typeof r)for(var e=this.length;e--;)n[e]=this[e]+r;else for(var e=this.length;e--;)n[e]=this[e]+r[e];return n},round:function(){for(var r=this.length;r--;)this[r]=Math.round(this[r]);return this},sum:function(r){for(var n=0,e=this.length;e--;)n+=r(e);return n},orth:function(){if(2!=this.length)throw Error;return[-this[1],this[0]]},norm:function(){return Math.sqrt(this.sum(function(r){return r*r}))}};for(var n in r)r.hasOwnProperty(n)&&(Array.prototype[n]=r[n]);return Array.prototype}),define("Array.nocomplex/Array.nocomplex",["./basics","./math/all"],function(){return Array.prototype});var EngineDetector=function(){this.isNode=!1,this.isBrowser=!1,this.isUnknown=!1,this._exports,this.detect()};EngineDetector.prototype={detect:function(){"undefined"!=typeof module&&module.exports?this._setAsNode():"undefined"!=typeof window?this._setAsBrowser():this._setAsUnknown()},_setAsNode:function(){this.isNode=!0,this.name="node"},_setAsBrowser:function(){this.isBrowser=!0,this._global=window,this.name="browser"},_setAsUnknown:function(){this.isUnknown=!0,this.name="unknown"},setGlobal:function(r){this._global=r},ifNode:function(r){this.isNode&&r()},ifBrowser:function(r){this.isBrowser&&r()},exports:function(r,n){this.isNode?this._global.exports=n:this.isBrowser&&(this._global[r]=n)}};var engine=new EngineDetector,baseUrl,requirejs;engine.ifNode(function(){baseUrl=__dirname,requirejs=require("requirejs"),engine.setGlobal(module)}),engine.ifBrowser(function(){baseUrl="."}),requirejs.config({baseUrl:function(){return"undefined"==typeof define?__dirname:"."}(),shim:{mocha:{exports:"mocha"}},paths:{"Array.nocomplex":".",almond:"bower_components/almond/almond",chai:"bower_components/chai/chai","chai-as-promised":"bower_components/chai-as-promised/lib/chai-as-promised",mocha:"bower_components/mocha/mocha","normalize-css":"bower_components/normalize-css/normalize.css",requirejs:"bower_components/requirejs/require",async:"bower_components/requirejs-plugins/src/async",depend:"bower_components/requirejs-plugins/src/depend",font:"bower_components/requirejs-plugins/src/font",goog:"bower_components/requirejs-plugins/src/goog",image:"bower_components/requirejs-plugins/src/image",json:"bower_components/requirejs-plugins/src/json",mdown:"bower_components/requirejs-plugins/src/mdown",noext:"bower_components/requirejs-plugins/src/noext",propertyParser:"bower_components/requirejs-plugins/src/propertyParser","Markdown.Converter":"bower_components/requirejs-plugins/lib/Markdown.Converter",text:"bower_components/requirejs-plugins/lib/text","sinon-chai":"bower_components/sinon-chai/lib/sinon-chai",sinonjs:"bower_components/sinonjs/sinon"}});var isStandalone=!!requirejs._defined,synchronous=isStandalone;if(engine.ifNode(function(){synchronous=!0}),synchronous){var ArrayNocomplex=requirejs("Array.nocomplex/Array.nocomplex");engine.exports("ArrayNocomplex",ArrayNocomplex)}else requirejs(["Array.nocomplex/Array.nocomplex"],function(r){engine.exports("ArrayNocomplex",r)});define("Array.nocomplex/main",function(){});