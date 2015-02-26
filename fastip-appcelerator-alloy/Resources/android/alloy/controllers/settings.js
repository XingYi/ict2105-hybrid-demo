function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId10() {
        $.__views.settings.removeEventListener("open", __alloyId10);
        if ($.__views.settings.activity) $.__views.settings.activity.onCreateOptionsMenu = function(e) {
            var __alloyId9 = {
                title: "Done",
                icon: Ti.Android.R.drawable.ic_menu_save,
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                id: "__alloyId8"
            };
            $.__views.__alloyId8 = e.menu.add(_.pick(__alloyId9, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId8.applyProperties(_.omit(__alloyId9, Alloy.Android.menuItemCreateArgs));
            clickedDone ? $.__views.__alloyId8.addEventListener("click", clickedDone) : __defers["$.__views.__alloyId8!click!clickedDone"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function clickedDone() {
        clickedSave();
    }
    function clickedSave() {
        var tipPct = parseFloat($.tipPctTextField.value);
        if (tipPct > 0) {
            Ti.App.Properties.setDouble("tipPct", tipPct / 100);
            Ti.API.log("info", "Settings saved");
            closeSettings();
        } else {
            Ti.UI.createAlertDialog({
                message: "Enter a tip percentage greater than zero",
                ok: "Try Again",
                title: "Invalid Percentage"
            }).show();
        }
    }
    function closeSettings() {
        Ti.App.fireEvent("recalc");
        var settingsWindow = $.getView();
        Alloy.Globals.navgroup ? Alloy.Globals.navgroup.closeWindow(settingsWindow, {
            animated: true
        }) : settingsWindow.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.settings = Ti.UI.createWindow({
        backgroundColor: "#fff",
        navBarHidden: false,
        title: "Settings",
        backButtonTitle: "",
        id: "settings"
    });
    $.__views.settings && $.addTopLevelView($.__views.settings);
    $.__views.settings.addEventListener("open", __alloyId10);
    $.__views.__alloyId11 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Set tip percentage",
        top: "35",
        id: "__alloyId11"
    });
    $.__views.settings.add($.__views.__alloyId11);
    $.__views.tipPctTextField = Ti.UI.createTextField({
        color: "#000",
        id: "tipPctTextField",
        top: "72",
        width: "60",
        height: "35",
        textAlign: "right",
        hintText: "Tip %",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        returnKeyType: Ti.UI.RETURNKEY_DONE
    });
    $.__views.settings.add($.__views.tipPctTextField);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "%",
        top: "72",
        left: "195",
        id: "__alloyId12"
    });
    $.__views.settings.add($.__views.__alloyId12);
    $.__views.saveButton = Ti.UI.createButton({
        width: "130",
        height: Ti.UI.SIZE,
        borderRadius: 15,
        backgroundColor: "#3883B5",
        color: "#fff",
        id: "saveButton",
        title: "Save Settings",
        top: "120"
    });
    $.__views.settings.add($.__views.saveButton);
    clickedSave ? $.__views.saveButton.addEventListener("click", clickedSave) : __defers["$.__views.saveButton!click!clickedSave"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var tipPct = Ti.App.Properties.getDouble("tipPct", .15);
    $.tipPctTextField.value = (100 * tipPct).toFixed(1);
    __defers["$.__views.__alloyId8!click!clickedDone"] && $.__views.__alloyId8.addEventListener("click", clickedDone);
    __defers["$.__views.saveButton!click!clickedSave"] && $.__views.saveButton.addEventListener("click", clickedSave);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;