function Controller(){function t(){e()}function e(){var t=parseFloat(i.tipPctTextField.value);t>0?(Ti.App.Properties.setDouble("tipPct",t/100),Ti.API.log("info","Settings saved"),i.trigger("closeDetail",null)):Ti.UI.createAlertDialog({message:"Enter a tip percentage greater than zero",ok:"Try Again",title:"Invalid Percentage"}).show()}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="detail",arguments[0]?arguments[0].__parentSymbol:null,arguments[0]?arguments[0].$model:null,arguments[0]?arguments[0].__itemTemplate:null;var i=this,r={},s={};i.__views.detail=Ti.UI.createWindow({backgroundColor:"#fff",title:"Settings",id:"detail"}),i.__views.detail&&i.addTopLevelView(i.__views.detail),i.__views.doneButton=Ti.UI.createButton({width:Ti.UI.SIZE,height:Ti.UI.SIZE,borderRadius:15,id:"doneButton",title:"Done"}),t?i.__views.doneButton.addEventListener("click",t):s["$.__views.doneButton!click!clickedDone"]=!0,i.__views.detail.rightNavButton=i.__views.doneButton,i.__views.__alloyId2=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000",text:"Set tip percentage",top:"35",id:"__alloyId2"}),i.__views.detail.add(i.__views.__alloyId2),i.__views.tipPctTextField=Ti.UI.createTextField({color:"#000",paddingLeft:10,paddingRight:10,borderColor:"#000",borderRadius:"10",borderWidth:"1",id:"tipPctTextField",top:"72",width:"60",height:"35",textAlign:"right",hintText:"Tip %",keyboardType:Ti.UI.KEYBOARD_DECIMAL_PAD,returnKeyType:Ti.UI.RETURNKEY_DONE}),i.__views.detail.add(i.__views.tipPctTextField),i.__views.__alloyId3=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000",text:"%",top:"72",left:"195",id:"__alloyId3"}),i.__views.detail.add(i.__views.__alloyId3),i.__views.saveButton=Ti.UI.createButton({width:"130",height:Ti.UI.SIZE,borderRadius:15,backgroundColor:"#3883B5",color:"#fff",id:"saveButton",title:"Save Settings",top:"120"}),i.__views.detail.add(i.__views.saveButton),e?i.__views.saveButton.addEventListener("click",e):s["$.__views.saveButton!click!clickedSave"]=!0,r.destroy=function(){},_.extend(i,i.__views),arguments[0]||{};var n=Ti.App.Properties.getDouble("tipPct",.15);i.tipPctTextField.value=(100*n).toFixed(1),s["$.__views.doneButton!click!clickedDone"]&&i.__views.doneButton.addEventListener("click",t),s["$.__views.saveButton!click!clickedSave"]&&i.__views.saveButton.addEventListener("click",e),_.extend(i,r)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;