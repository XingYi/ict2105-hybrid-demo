function Controller(){function t(){var t=parseFloat(i.tipPctTextField.value);t>0?(Ti.App.Properties.setDouble("tipPct",t/100),Ti.API.log("info","Settings saved"),e()):Ti.UI.createAlertDialog({message:"Enter a tip percentage greater than zero",ok:"Try Again",title:"Invalid Percentage"}).show()}function e(){Ti.App.fireEvent("recalc");var t=i.getView();Alloy.Globals.navgroup?Alloy.Globals.navgroup.closeWindow(t,{animated:!0}):t.close()}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="settings",arguments[0]?arguments[0].__parentSymbol:null,arguments[0]?arguments[0].$model:null,arguments[0]?arguments[0].__itemTemplate:null;var i=this,r={},o={};i.__views.settings=Ti.UI.createWindow({backgroundColor:"#fff",title:"Settings",backButtonTitle:"",id:"settings"}),i.__views.settings&&i.addTopLevelView(i.__views.settings),i.__views.__alloyId7=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000",text:"Set tip percentage",top:"35",id:"__alloyId7"}),i.__views.settings.add(i.__views.__alloyId7),i.__views.tipPctTextField=Ti.UI.createTextField({color:"#000",paddingLeft:10,paddingRight:10,borderColor:"#000",borderRadius:"10",borderWidth:"1",id:"tipPctTextField",top:"72",width:"60",height:"35",textAlign:"right",hintText:"Tip %",keyboardType:Ti.UI.KEYBOARD_DECIMAL_PAD,returnKeyType:Ti.UI.RETURNKEY_DONE}),i.__views.settings.add(i.__views.tipPctTextField),i.__views.__alloyId8=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000",text:"%",top:"72",left:"195",id:"__alloyId8"}),i.__views.settings.add(i.__views.__alloyId8),i.__views.saveButton=Ti.UI.createButton({width:"130",height:Ti.UI.SIZE,borderRadius:15,backgroundColor:"#3883B5",color:"#fff",id:"saveButton",title:"Save Settings",top:"120"}),i.__views.settings.add(i.__views.saveButton),t?i.__views.saveButton.addEventListener("click",t):o["$.__views.saveButton!click!clickedSave"]=!0,r.destroy=function(){},_.extend(i,i.__views);var s=Ti.App.Properties.getDouble("tipPct",.15);i.tipPctTextField.value=(100*s).toFixed(1),o["$.__views.saveButton!click!clickedSave"]&&i.__views.saveButton.addEventListener("click",t),_.extend(i,r)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;