function __processArg(t,e){var i=null;return t&&(i=t[e]||null,delete t[e]),i}function Controller(){require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="index",arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var t=this,e={};t.__views.calculator=Alloy.createController("calculator",{id:"calculator"}),t.__views.calculator&&t.addTopLevelView(t.__views.calculator),e.destroy=function(){},_.extend(t,t.__views),t.calculator.getView().open(),_.extend(t,e)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;