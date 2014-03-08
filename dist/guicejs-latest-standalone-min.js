/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

/**
 * guicejs version: "0.0.3" Copyright (c) 2011-2012, Cyril Agosta ( cyril.agosta.dev@gmail.com) All Rights Reserved.
 * Available via the MIT license.
 * see: http://github.com/cagosta/guicejs for details
 */

var requirejs,require,define;!function(e){function t(e,t){return y.call(e,t)}function n(e,t){var n,i,o,r,s,u,c,f,p,a,d,l=t&&t.split("/"),g=h.map,w=g&&g["*"]||{};if(e&&"."===e.charAt(0))if(t){for(l=l.slice(0,l.length-1),e=e.split("/"),s=e.length-1,h.nodeIdCompat&&j.test(e[s])&&(e[s]=e[s].replace(j,"")),e=l.concat(e),p=0;p<e.length;p+=1)if(d=e[p],"."===d)e.splice(p,1),p-=1;else if(".."===d){if(1===p&&(".."===e[2]||".."===e[0]))break;p>0&&(e.splice(p-1,2),p-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((l||w)&&g){for(n=e.split("/"),p=n.length;p>0;p-=1){if(i=n.slice(0,p).join("/"),l)for(a=l.length;a>0;a-=1)if(o=g[l.slice(0,a).join("/")],o&&(o=o[i])){r=o,u=p;break}if(r)break;!c&&w&&w[i]&&(c=w[i],f=p)}!r&&c&&(r=c,u=f),r&&(n.splice(0,u,r),e=n.join("/"))}return e}function i(t,n){return function(){return p.apply(e,m.call(arguments,0).concat([t,n]))}}function o(e){return function(t){return n(t,e)}}function r(e){return function(t){l[e]=t}}function s(n){if(t(g,n)){var i=g[n];delete g[n],w[n]=!0,f.apply(e,i)}if(!t(l,n)&&!t(w,n))throw new Error("No "+n);return l[n]}function u(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function c(e){return function(){return h&&h.config&&h.config[e]||{}}}var f,p,a,d,l={},g={},h={},w={},y=Object.prototype.hasOwnProperty,m=[].slice,j=/\.js$/;a=function(e,t){var i,r=u(e),c=r[0];return e=r[1],c&&(c=n(c,t),i=s(c)),c?e=i&&i.normalize?i.normalize(e,o(t)):n(e,t):(e=n(e,t),r=u(e),c=r[0],e=r[1],c&&(i=s(c))),{f:c?c+"!"+e:e,n:e,pr:c,p:i}},d={require:function(e){return i(e)},exports:function(e){var t=l[e];return"undefined"!=typeof t?t:l[e]={}},module:function(e){return{id:e,uri:"",exports:l[e],config:c(e)}}},f=function(n,o,u,c){var f,p,h,y,m,j,x=[],b=typeof u;if(c=c||n,"undefined"===b||"function"===b){for(o=!o.length&&u.length?["require","exports","module"]:o,m=0;m<o.length;m+=1)if(y=a(o[m],c),p=y.f,"require"===p)x[m]=d.require(n);else if("exports"===p)x[m]=d.exports(n),j=!0;else if("module"===p)f=x[m]=d.module(n);else if(t(l,p)||t(g,p)||t(w,p))x[m]=s(p);else{if(!y.p)throw new Error(n+" missing "+p);y.p.load(y.n,i(c,!0),r(p),{}),x[m]=l[p]}h=u?u.apply(l[n],x):void 0,n&&(f&&f.exports!==e&&f.exports!==l[n]?l[n]=f.exports:h===e&&j||(l[n]=h))}else n&&(l[n]=u)},requirejs=require=p=function(t,n,i,o,r){if("string"==typeof t)return d[t]?d[t](n):s(a(t,n).f);if(!t.splice){if(h=t,h.deps&&p(h.deps,h.callback),!n)return;n.splice?(t=n,n=i,i=null):t=e}return n=n||function(){},"function"==typeof i&&(i=o,o=r),o?f(e,t,n,i):setTimeout(function(){f(e,t,n,i)},4),p},p.config=function(e){return p(e)},requirejs._defined=l,define=function(e,n,i){n.splice||(i=n,n=[]),t(l,e)||t(g,e)||(g[e]=[e,n,i])},define.amd={jQuery:!0}}(),define("bower_components/almond/almond",function(){}),define("Seed/helpers",[],function(){return Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;return function(){return t.apply(e,arguments)}}),{capitalize:function(e){return e.charAt(0).toUpperCase()+e.slice(1)},remove:function(e,t){for(var n=e.length;n--;)e[n]===t&&e.splice(n,1);return e},clone:function(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t},extend:function(e){for(var t=1,n=arguments.length;n>t;t++){var i="object"==typeof arguments[t]||"function"==typeof arguments[t]?arguments[t]:{};for(var o in i)i.hasOwnProperty(o)&&(e[o]=i[o])}return e},find:function(e,t){for(var n=0,i=e.length;i>n;n++)if(t(e[n],n))return e[n];return!1}}}),define("Seed/Extendable",["./helpers"],function(e){var t=function(){};return t._seedPlugins=[],t.getSeedPlugins=function(){return this._seedPlugins},t.hasSeedPlugin=function(e){for(var t=this.getSeedPlugins(),n=t.length;n--;)if(t[n].getId()===e)return!0;return!1},t.prototype.constructor=function(){},t.use=function(t){var n,i,o,r;return t=t||{},o=t.plugins||[],i=function(){var e=arguments[0]!==!1;this.Class=i,e&&i.prototype.constructor.apply(this,arguments)},n=e.clone(this),e.extend(i,n),i._seedPlugins=o,r=e.extend(new this(!1)),i.prototype=r,i},t.Class=t,t.extend=function(t){var n,i,o,r;i=function(){this.Class=i;var e=arguments[0]!==!1;e&&i.prototype.constructor.apply(this,arguments)},n=e.clone(this),e.extend(i,n),o=e.extend(new this(!1),t),r=this.getSeedPlugins(),i.prototype=o;for(var s=0;s<r.length;s++)r[s].handle({extendedPrototype:this.prototype,Class:i,extension:t});return i},t}),define("mangrove-utils/extend",[],function(){return function(e){e.prototype&&(e=e.prototype);for(var t=1,n=arguments.length;n>t;t++){var i=arguments[t].prototype||arguments[t];for(var o in i)i.hasOwnProperty(o)&&(e[o]=i[o])}return e}}),define("Seed/plugins/AbstractExtendHook",["Seed/Extendable","mangrove-utils/extend"],function(e,t){return e.extend({constructor:function(e){this.pluginId=e.pluginId,this.Class=e.Class,this.newPrototype=this.getNewPrototype(),this.extendedPrototype=e.extendedPrototype,this.extension=e.extension,this.confKey="seedPlugin",this.pluginInitialized()||this.initializePlugin()},extendNewPrototype:function(e){t(this.getNewPrototype(),e)},pluginInitialized:function(){return this.getNewPrototypeAttr(this.confKey)?this.getNewPrototypeAttr(this.confKey)[this.pluginId]?!0:!1:!1},initializePlugin:function(){this.getNewPrototypeAttr(this.confKey)||this.setNewPrototypeAttr(this.confKey,{}),this.getNewPrototypeAttr(this.confKey)[this.pluginId]||(this.getNewPrototypeAttr(this.confKey)[this.pluginId]={})},defineNewPrototypeMethod:function(e,t){this.setNewPrototypeAttr(e,t)},getPluginConfig:function(){return this.getNewPrototype()[this.confKey][this.pluginId]},getPluginConfigAttr:function(e){return this.getPluginConfig()[e]},setPluginConfigAttr:function(e,t){this.getPluginConfig()[e]=t},getNewPrototype:function(){return this.getClass().prototype},setNewPrototypeAttr:function(e,t){return this.getNewPrototype()[e]=t},getNewPrototypeAttr:function(e){return this.getNewPrototype()[e]},getExtensionAttr:function(e){return this.getExtension()[e]},setExtensionAttr:function(e,t){return this.getExtension()[e]=t},getExtension:function(){return this.extension},getNewPrototype:function(){return this.Class.prototype},getExtendedPrototypeAttr:function(e){return this.extendedPrototype[e]},getExtendedPrototype:function(){return this.extendedPrototype},getClass:function(){return this.Class}})}),define("Seed/plugins/AbstractSeedPlugin",["Seed/Extendable","./AbstractExtendHook"],function(e,t){return e.extend({constructor:function(){this.ExtendHook=this.ExtendHook||t,this.extendHooks=[]},getId:function(){return this.id},handle:function(e){this.buildExtendHook(e)},buildExtendHook:function(e){e.pluginId=this.id;var t,n=this.ExtendHook;t=new n(e),this.extendHooks.push(t),this.onExtend(t)},onExtend:function(){}})}),define("guicejs/GuiceExtendHook",["Seed/plugins/AbstractExtendHook","Seed/helpers"],function(e){return e.extend({constructor:function(){e.prototype.constructor.apply(this,arguments)},initializePlugin:function(){this.hasInjection()&&e.prototype.initializePlugin.apply(this,arguments)},hasInjection:function(){return!!this.getInjection()},getInjection:function(){return this.getExtensionAttr("$inject")}})}),define("guicejs/GuiceInjector",["Seed/Extendable","mangrove-utils/extend"],function(e,t){return e.extend({constructor:function(e){this.structure=e.structure,this.injectionRepo=e.injectionRepo},getInstance:function(e){var t=this.getBindedClass(e),n=this.getOptions(e);if(!t)throw new Error("GuiceInjector -> Could not find a Class for "+dataset);return new t(n)},getBindedId:function(e){if(!this.getStructure(e).$id)throw new Error("GuiceInjector -> Coult not find a injector structor for "+injectionId);return this.getStructure(e).$id},getBindedClass:function(e){return this.getClass(this.getBindedId(e))},getOptions:function(e){var n,i,o=this.getStructure(e),r=this.getBindedId(e),s=this.getInjection(r);i=t({},o);for(var u in s)s.hasOwnProperty(u)&&"$id"!==u&&"string"==typeof s[u]&&(n=s[u],i[u]=this.getInstance(n));return i},getStructure:function(e){if(!this.structure[e])throw new Error;return this.structure[e]},getClass:function(e){return this.getInjection(e).Class},getInjection:function(e){var t=this.injectionRepo[e];if(!t)throw new Error("GuiceInjector -> no injection found for "+e);return t}})}),define("guicejs/guicejs",["Seed/plugins/AbstractSeedPlugin","./GuiceExtendHook","./GuiceInjector"],function(e,t,n){var i=e.extend({constructor:function(){this.id="guice",this.ExtendHook=t,this.injectors=[],this.injectionRepo={},e.prototype.constructor.apply(this,arguments)},createInjector:function(e){var t=new n({structure:e,injectionRepo:this.injectionRepo});return this.injectors.push(t),t},onExtend:function(e){e.hasInjection()&&this.initializeInjection(e)},registerInjection:function(e,t){this.injectionRepo[e]=t},initializeInjection:function(e){var t,n=e.getInjection(),i=n.$id;if(!i)throw new Error("Guicejs -> Injection should have an $id");t=e.getClass(),n.Class=t,this.registerInjection(i,n)}});return new i});var EngineDetector=function(){this.isNode=!1,this.isBrowser=!1,this.isUnknown=!1,this._exports,this.detect()};EngineDetector.prototype={detect:function(){"undefined"!=typeof module&&module.exports?this._setAsNode():"undefined"!=typeof window?this._setAsBrowser():this._setAsUnknown()},_setAsNode:function(){this.isNode=!0,this.name="node"},_setAsBrowser:function(){this.isBrowser=!0,this._global=window,this.name="browser"},_setAsUnknown:function(){this.isUnknown=!0,this.name="unknown"},setGlobal:function(e){this._global=e},ifNode:function(e){this.isNode&&e()},ifBrowser:function(e){this.isBrowser&&e()},exports:function(e,t){this.isNode?this._global.exports=t:this.isBrowser&&(this._global[e]=t)}};var engine=new EngineDetector,baseUrl,requirejs;engine.ifNode(function(){baseUrl=__dirname,requirejs=require("requirejs"),engine.setGlobal(module)}),engine.ifBrowser(function(){baseUrl="."}),requirejs.config({baseUrl:function(){return"undefined"==typeof define?__dirname:"."}(),shim:{mocha:{exports:"mocha"}},paths:{guicejs:".",sinonjs:"bower_components/sinonjs/sinon","sinon-chai":"bower_components/sinon-chai/lib/sinon-chai",async:"bower_components/requirejs-plugins/src/async",depend:"bower_components/requirejs-plugins/src/depend",font:"bower_components/requirejs-plugins/src/font",goog:"bower_components/requirejs-plugins/src/goog",image:"bower_components/requirejs-plugins/src/image",json:"bower_components/requirejs-plugins/src/json",mdown:"bower_components/requirejs-plugins/src/mdown",noext:"bower_components/requirejs-plugins/src/noext",propertyParser:"bower_components/requirejs-plugins/src/propertyParser","Markdown.Converter":"bower_components/requirejs-plugins/lib/Markdown.Converter",text:"bower_components/requirejs-plugins/lib/text",requirejs:"bower_components/requirejs/require",mocha:"bower_components/mocha/mocha","mangrove-utils":"bower_components/mangrove-utils/app","chai-as-promised":"bower_components/chai-as-promised/lib/chai-as-promised",chai:"bower_components/chai/chai",almond:"bower_components/almond/almond","Array.nocomplex":"bower_components/Array.nocomplex/app",Seed:"bower_components/Seed/app"}});var isStandalone=!!requirejs._defined,synchronous=isStandalone;if(engine.ifNode(function(){synchronous=!0}),synchronous){var guicejs=requirejs("guicejs/guicejs");engine.exports("guicejs",guicejs)}else requirejs(["guicejs/guicejs"],function(e){engine.exports("guicejs",e)});define("guicejs/main",function(){});