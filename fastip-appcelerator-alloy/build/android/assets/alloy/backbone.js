(function(){var t,e=this,i=e.Backbone,r=Array.prototype.slice,n=Array.prototype.splice;t="undefined"!=typeof exports?exports:e.Backbone={},t.VERSION="0.9.2";var o=e._;o||"undefined"==typeof require||(o=require("alloy/underscore"));var s=e.jQuery||e.Zepto||e.ender;t.setDomLibrary=function(t){s=t},t.noConflict=function(){return e.Backbone=i,this},t.emulateHTTP=!1,t.emulateJSON=!1;var a=/\s+/,l=t.Events={on:function(t,e,i){var r,n,o,s,l;if(!e)return this;for(t=t.split(a),r=this._callbacks||(this._callbacks={});n=t.shift();)l=r[n],o=l?l.tail:{},o.next=s={},o.context=i,o.callback=e,r[n]={tail:s,next:l?l.next:o};return this},off:function(t,e,i){var r,n,s,l,u,c;if(n=this._callbacks){if(!(t||e||i))return delete this._callbacks,this;for(t=t?t.split(a):o.keys(n);r=t.shift();)if(s=n[r],delete n[r],s&&(e||i))for(l=s.tail;(s=s.next)!==l;)u=s.callback,c=s.context,(e&&u!==e||i&&c!==i)&&this.on(r,u,c);return this}},trigger:function(t){var e,i,n,o,s,l,u;if(!(n=this._callbacks))return this;for(l=n.all,t=t.split(a),u=r.call(arguments,1);e=t.shift();){if(i=n[e])for(o=i.tail;(i=i.next)!==o;)i.callback.apply(i.context||this,u);if(i=l)for(o=i.tail,s=[e].concat(u);(i=i.next)!==o;)i.callback.apply(i.context||this,s)}return this}};l.bind=l.on,l.unbind=l.off;var u=t.Model=function(t,e){var i;t||(t={}),e&&e.parse&&(t=this.parse(t)),(i=x(this,"defaults"))&&(t=o.extend({},i,t)),e&&e.collection&&(this.collection=e.collection),this.attributes={},this._escapedAttributes={},this.cid=o.uniqueId("c"),this.changed={},this._silent={},this._pending={},this.set(t,{silent:!0}),this.changed={},this._silent={},this._pending={},this._previousAttributes=o.clone(this.attributes),this.initialize.apply(this,arguments)};o.extend(u.prototype,l,{changed:null,_silent:null,_pending:null,idAttribute:"id",initialize:function(){},toJSON:function(){return o.clone(this.attributes)},get:function(t){return this.attributes[t]},escape:function(t){var e;if(e=this._escapedAttributes[t])return e;var i=this.get(t);return this._escapedAttributes[t]=o.escape(null==i?"":""+i)},has:function(t){return null!=this.get(t)},set:function(t,e,i){var r,n,s;if(o.isObject(t)||null==t?(r=t,i=e):(r={},r[t]=e),i||(i={}),!r)return this;if(r instanceof u&&(r=r.attributes),i.unset)for(n in r)r[n]=void 0;if(!this._validate(r,i))return!1;this.idAttribute in r&&(this.id=r[this.idAttribute]);var a=i.changes={},l=this.attributes,c=this._escapedAttributes,d=this._previousAttributes||{};for(n in r)s=r[n],(!o.isEqual(l[n],s)||i.unset&&o.has(l,n))&&(delete c[n],(i.silent?this._silent:a)[n]=!0),i.unset?delete l[n]:l[n]=s,o.isEqual(d[n],s)&&o.has(l,n)==o.has(d,n)?(delete this.changed[n],delete this._pending[n]):(this.changed[n]=s,i.silent||(this._pending[n]=!0));return i.silent||this.change(i),this},unset:function(t,e){return(e||(e={})).unset=!0,this.set(t,null,e)},clear:function(t){return(t||(t={})).unset=!0,this.set(o.clone(this.attributes),t)},fetch:function(e){e=e?o.clone(e):{};var i=this,r=e.success;return e.success=function(t,n,o){return i.set(i.parse(t,o),e)?void(r&&r(i,t)):!1},e.error=t.wrapError(e.error,i,e),(this.sync||t.sync).call(this,"read",this,e)},save:function(e,i,r){var n,s;if(o.isObject(e)||null==e?(n=e,r=i):(n={},n[e]=i),r=r?o.clone(r):{},r.wait){if(!this._validate(n,r))return!1;s=o.clone(this.attributes)}var a=o.extend({},r,{silent:!0});if(n&&!this.set(n,r.wait?a:r))return!1;var l=this,u=r.success;r.success=function(t,e,i){var s=l.parse(t,i);return r.wait&&(delete r.wait,s=o.extend(n||{},s)),l.set(s,r)?void(u?u(l,t):l.trigger("sync",l,t,r)):!1},r.error=t.wrapError(r.error,l,r);var c=this.isNew()?"create":"update",d=(this.sync||t.sync).call(this,c,this,r);return r.wait&&this.set(s,a),d},destroy:function(e){e=e?o.clone(e):{};var i=this,r=e.success,n=function(){i.trigger("destroy",i,i.collection,e)};if(this.isNew())return n(),!1;e.success=function(t){e.wait&&n(),r?r(i,t):i.trigger("sync",i,t,e)},e.error=t.wrapError(e.error,i,e);var s=(this.sync||t.sync).call(this,"delete",this,e);return e.wait||n(),s},url:function(){var t=x(this,"urlRoot")||x(this.collection,"url")||S();return this.isNew()?t:t+("/"==t.charAt(t.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(t){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},change:function(t){t||(t={});var e=this._changing;this._changing=!0;for(var i in this._silent)this._pending[i]=!0;var r=o.extend({},t.changes,this._silent);this._silent={};for(var i in r)this.trigger("change:"+i,this,this.get(i),t);if(e)return this;for(;!o.isEmpty(this._pending);){this._pending={},this.trigger("change",this,t);for(var i in this.changed)this._pending[i]||this._silent[i]||delete this.changed[i];this._previousAttributes=o.clone(this.attributes)}return this._changing=!1,this},hasChanged:function(t){return arguments.length?o.has(this.changed,t):!o.isEmpty(this.changed)},changedAttributes:function(t){if(!t)return this.hasChanged()?o.clone(this.changed):!1;var e,i=!1,r=this._previousAttributes;for(var n in t)o.isEqual(r[n],e=t[n])||((i||(i={}))[n]=e);return i},previous:function(t){return arguments.length&&this._previousAttributes?this._previousAttributes[t]:null},previousAttributes:function(){return o.clone(this._previousAttributes)},isValid:function(){return!this.validate(this.attributes)},_validate:function(t,e){if(e.silent||!this.validate)return!0;t=o.extend({},this.attributes,t);var i=this.validate(t,e);return i?(e&&e.error?e.error(this,i,e):this.trigger("error",this,i,e),!1):!0}});var c=t.Collection=function(t,e){e||(e={}),e.model&&(this.model=e.model),e.comparator&&(this.comparator=e.comparator),this._reset(),this.initialize.apply(this,arguments),t&&this.reset(t,{silent:!0,parse:e.parse})};o.extend(c.prototype,l,{model:u,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},add:function(t,e){var i,r,s,a,l,u,c={},d={},h=[];for(e||(e={}),t=o.isArray(t)?t.slice():[t],i=0,s=t.length;s>i;i++){if(!(a=t[i]=this._prepareModel(t[i],e)))throw new Error("Can't add an invalid model to a collection");l=a.cid,u=a.id,c[l]||this._byCid[l]||null!=u&&(d[u]||this._byId[u])?h.push(i):c[l]=d[u]=a}for(i=h.length;i--;)t.splice(h[i],1);for(i=0,s=t.length;s>i;i++)(a=t[i]).on("all",this._onModelEvent,this),this._byCid[a.cid]=a,null!=a.id&&(this._byId[a.id]=a);if(this.length+=s,r=null!=e.at?e.at:this.models.length,n.apply(this.models,[r,0].concat(t)),this.comparator&&this.sort({silent:!0}),e.silent)return this;for(i=0,s=this.models.length;s>i;i++)c[(a=this.models[i]).cid]&&(e.index=i,a.trigger("add",a,this,e));return this},remove:function(t,e){var i,r,n,s;for(e||(e={}),t=o.isArray(t)?t.slice():[t],i=0,r=t.length;r>i;i++)s=this.getByCid(t[i])||this.get(t[i]),s&&(delete this._byId[s.id],delete this._byCid[s.cid],n=this.indexOf(s),this.models.splice(n,1),this.length--,e.silent||(e.index=n,s.trigger("remove",s,this,e)),this._removeReference(s));return this},push:function(t,e){return t=this._prepareModel(t,e),this.add(t,e),t},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t),e},unshift:function(t,e){return t=this._prepareModel(t,e),this.add(t,o.extend({at:0},e)),t},shift:function(t){var e=this.at(0);return this.remove(e,t),e},get:function(t){return null==t?void 0:this._byId[null!=t.id?t.id:t]},getByCid:function(t){return t&&this._byCid[t.cid||t]},at:function(t){return this.models[t]},where:function(t){return o.isEmpty(t)?[]:this.filter(function(e){for(var i in t)if(t[i]!==e.get(i))return!1;return!0})},sort:function(t){if(t||(t={}),!this.comparator)throw new Error("Cannot sort a set without a comparator");var e=o.bind(this.comparator,this);return 1==this.comparator.length?this.models=this.sortBy(e):this.models.sort(e),t.silent||this.trigger("reset",this,t),this},pluck:function(t){return o.map(this.models,function(e){return e.get(t)})},reset:function(t,e){t||(t=[]),e||(e={});for(var i=0,r=this.models.length;r>i;i++)this._removeReference(this.models[i]);return this._reset(),this.add(t,o.extend({silent:!0},e)),e.silent||this.trigger("reset",this,e),this},fetch:function(e){e=e?o.clone(e):{},void 0===e.parse&&(e.parse=!0);var i=this,r=e.success;return e.success=function(t,n,o){i[e.add?"add":"reset"](i.parse(t,o),e),r&&r(i,t)},e.error=t.wrapError(e.error,i,e),(this.sync||t.sync).call(this,"read",this,e)},create:function(t,e){var i=this;if(e=e?o.clone(e):{},t=this._prepareModel(t,e),!t)return!1;e.wait||i.add(t,e);var r=e.success;return e.success=function(n,o){e.wait&&i.add(n,e),r?r(n,o):n.trigger("sync",t,o,e)},t.save(null,e),t},parse:function(t){return t},chain:function(){return o(this.models).chain()},_reset:function(){this.length=0,this.models=[],this._byId={},this._byCid={}},_prepareModel:function(t,e){if(e||(e={}),t instanceof u)t.collection||(t.collection=this);else{var i=t;e.collection=this,t=new this.model(i,e),t._validate(t.attributes,e)||(t=!1)}return t},_removeReference:function(t){this==t.collection&&delete t.collection,t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){("add"!=t&&"remove"!=t||i==this)&&("destroy"==t&&this.remove(e,r),e&&t==="change:"+e.idAttribute&&(delete this._byId[e.previous(e.idAttribute)],this._byId[e.id]=e),this.trigger.apply(this,arguments))}});var d=["forEach","each","map","reduce","reduceRight","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","sortBy","sortedIndex","toArray","size","first","initial","rest","last","without","indexOf","shuffle","lastIndexOf","isEmpty","groupBy"];o.each(d,function(t){c.prototype[t]=function(){return o[t].apply(o,[this.models].concat(o.toArray(arguments)))}});var h=t.Router=function(t){t||(t={}),t.routes&&(this.routes=t.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},p=/:\w+/g,f=/\*\w+/g,_=/[-[\]{}()+?.,\\^$|#\s]/g;o.extend(h.prototype,l,{initialize:function(){},route:function(e,i,r){return t.history||(t.history=new g),o.isRegExp(e)||(e=this._routeToRegExp(e)),r||(r=this[i]),t.history.route(e,o.bind(function(n){var o=this._extractParameters(e,n);r&&r.apply(this,o),this.trigger.apply(this,["route:"+i].concat(o)),t.history.trigger("route",this,i,o)},this)),this},navigate:function(e,i){t.history.navigate(e,i)},_bindRoutes:function(){if(this.routes){var t=[];for(var e in this.routes)t.unshift([e,this.routes[e]]);for(var i=0,r=t.length;r>i;i++)this.route(t[i][0],t[i][1],this[t[i][1]])}},_routeToRegExp:function(t){return t=t.replace(_,"\\$&").replace(p,"([^/]+)").replace(f,"(.*?)"),new RegExp("^"+t+"$")},_extractParameters:function(t,e){return t.exec(e).slice(1)}});var g=t.History=function(){this.handlers=[],o.bindAll(this,"checkUrl")},v=/^[#\/]/,y=/msie [\w.]+/;g.started=!1,o.extend(g.prototype,l,{interval:50,getHash:function(t){var e=t?t.location:window.location,i=e.href.match(/#(.*)$/);return i?i[1]:""},getFragment:function(t,e){if(null==t)if(this._hasPushState||e){t=window.location.pathname;var i=window.location.search;i&&(t+=i)}else t=this.getHash();return t.indexOf(this.options.root)||(t=t.substr(this.options.root.length)),t.replace(v,"")},start:function(t){if(g.started)throw new Error("Backbone.history has already been started");g.started=!0,this.options=o.extend({},{root:"/"},this.options,t),this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&window.history&&window.history.pushState);var e=this.getFragment(),i=document.documentMode,r=y.exec(navigator.userAgent.toLowerCase())&&(!i||7>=i);r&&(this.iframe=s('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(e)),this._hasPushState?s(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!r?s(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=e;var n=window.location,a=n.pathname==this.options.root;return this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!a?(this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0):(this._wantsPushState&&this._hasPushState&&a&&n.hash&&(this.fragment=this.getHash().replace(v,""),window.history.replaceState({},document.title,n.protocol+"//"+n.host+this.options.root+this.fragment)),this.options.silent?void 0:this.loadUrl())},stop:function(){s(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),g.started=!1},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(){var t=this.getFragment();return t==this.fragment&&this.iframe&&(t=this.getFragment(this.getHash(this.iframe))),t==this.fragment?!1:(this.iframe&&this.navigate(t),void(this.loadUrl()||this.loadUrl(this.getHash())))},loadUrl:function(t){var e=this.fragment=this.getFragment(t),i=o.any(this.handlers,function(t){return t.route.test(e)?(t.callback(e),!0):void 0});return i},navigate:function(t,e){if(!g.started)return!1;e&&e!==!0||(e={trigger:e});var i=(t||"").replace(v,"");this.fragment!=i&&(this._hasPushState?(0!=i.indexOf(this.options.root)&&(i=this.options.root+i),this.fragment=i,window.history[e.replace?"replaceState":"pushState"]({},document.title,i)):this._wantsHashChange?(this.fragment=i,this._updateHash(window.location,i,e.replace),this.iframe&&i!=this.getFragment(this.getHash(this.iframe))&&(e.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,i,e.replace))):window.location.assign(this.options.root+t),e.trigger&&this.loadUrl(t))},_updateHash:function(t,e,i){i?t.replace(t.toString().replace(/(javascript:|#).*$/,"")+"#"+e):t.hash=e}});var m=t.View=function(t){this.cid=o.uniqueId("view"),this._configure(t||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},T=/^(\S+)\s*(.*)$/,b=["model","collection","el","id","attributes","className","tagName"];o.extend(m.prototype,l,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this},make:function(t,e,i){var r=document.createElement(t);return e&&s(r).attr(e),i&&s(r).html(i),r},setElement:function(t,e){return this.$el&&this.undelegateEvents(),this.$el=t instanceof s?t:s(t),this.el=this.$el[0],e!==!1&&this.delegateEvents(),this},delegateEvents:function(t){if(t||(t=x(this,"events"))){this.undelegateEvents();for(var e in t){var i=t[e];if(o.isFunction(i)||(i=this[t[e]]),!i)throw new Error('Method "'+t[e]+'" does not exist');var r=e.match(T),n=r[1],s=r[2];i=o.bind(i,this),n+=".delegateEvents"+this.cid,""===s?this.$el.bind(n,i):this.$el.delegate(s,n,i)}}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(t){this.options&&(t=o.extend({},this.options,t));for(var e=0,i=b.length;i>e;e++){var r=b[e];t[r]&&(this[r]=t[r])}this.options=t},_ensureElement:function(){if(this.el)this.setElement(this.el,!1);else{var t=x(this,"attributes")||{};this.id&&(t.id=this.id),this.className&&(t["class"]=this.className),this.setElement(this.make(this.tagName,t),!1)}}});var A=function(t,e){var i=I(this,t,e);return i.extend=this.extend,i};u.extend=c.extend=h.extend=m.extend=A;var E={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};t.sync=function(e,i,r){var n=E[e];r||(r={});var a={type:n,dataType:"json"};return r.url||(a.url=x(i,"url")||S()),r.data||!i||"create"!=e&&"update"!=e||(a.contentType="application/json",a.data=JSON.stringify(i.toJSON())),t.emulateJSON&&(a.contentType="application/x-www-form-urlencoded",a.data=a.data?{model:a.data}:{}),t.emulateHTTP&&("PUT"===n||"DELETE"===n)&&(t.emulateJSON&&(a.data._method=n),a.type="POST",a.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",n)}),"GET"===a.type||t.emulateJSON||(a.processData=!1),s.ajax(o.extend(a,r))},t.wrapError=function(t,e,i){return function(r,n){n=r===e?n:r,t?t(e,n,i):e.trigger("error",e,n,i)}};var w=function(){},I=function(t,e,i){var r;return r=e&&e.hasOwnProperty("constructor")?e.constructor:function(){t.apply(this,arguments)},o.extend(r,t),w.prototype=t.prototype,r.prototype=new w,e&&o.extend(r.prototype,e),i&&o.extend(r,i),r.prototype.constructor=r,r.__super__=t.prototype,r},x=function(t,e){return t&&t[e]?o.isFunction(t[e])?t[e]():t[e]:null},S=function(){throw new Error('A "url" property or function must be specified')}}).call(this);