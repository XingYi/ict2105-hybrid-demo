function ucfirst(t){return t?t[0].toUpperCase()+t.substr(1):t}var Alloy=require("alloy"),widgets={};module.exports=function(t){var e=this;return widgets[t]?widgets[t]:(this.widgetId=t,this.Collections={},this.Models={},this.Shared={},this.createController=function(e,i){return new(require("alloy/widgets/"+t+"/controllers/"+e))(i)},this.createCollection=function(e,i){return new(require("alloy/widgets/"+t+"/models/"+ucfirst(e)).Collection)(i)},this.createModel=function(e,i){return new(require("alloy/widgets/"+t+"/models/"+ucfirst(e)).Model)(i)},this.createWidget=Alloy.createWidget,this.Collections.instance=function(t){return e.Collections[t]||(e.Collections[t]=e.createCollection(t))},this.Models.instance=function(t){return e.Models[t]||(e.Models[t]=e.createModel(t))},void(widgets[t]=this))};