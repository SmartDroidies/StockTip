"use strict";

var exec = require("cordova/exec");

var GCMPush = {

    register : function (onSuccess, onError, options) {
        cordova.exec( onSuccess, onError, "GCMPush", "register", [options]);
    },

    unregister: function (onSuccess, onError) {
        cordova.exec( onSuccess, onError, "GCMPush", "unregister", []);
    }

};

module.exports = GCMPush;