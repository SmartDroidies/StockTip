cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-google-analytics/www/analytics.js",
        "id": "cordova-plugin-google-analytics.UniversalAnalytics",
        "clobbers": [
            "analytics"
        ]
    },
    {
        "file": "plugins/cordova-plugin-smaato/www/SmaatoPositions.js",
        "id": "cordova-plugin-smaato.SmaatoPositions",
        "clobbers": [
            "window.SMAATO_AD_POSITION"
        ]
    },
    {
        "file": "plugins/cordova-plugin-smaato/www/SmaatoSizes.js",
        "id": "cordova-plugin-smaato.SmaatoSizes",
        "clobbers": [
            "window.SMAATO_AD_SIZE"
        ]
    },
    {
        "file": "plugins/cordova-plugin-smaato/www/vast-client.js",
        "id": "cordova-plugin-smaato.DMVAST"
    },
    {
        "file": "plugins/cordova-plugin-smaato/www/Smaato.js",
        "id": "cordova-plugin-smaato.Smaato",
        "clobbers": [
            "window.Smaato"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.plugin.cache/www/Cache.js",
        "id": "org.apache.cordova.plugin.cache.Cache",
        "clobbers": [
            "cache"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "id": "cordova-plugin-dialogs.notification_android",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-gcmpush/www/gcm.js",
        "id": "cordova-plugin-gcmpush.GCMPush",
        "clobbers": [
            "GCMPush"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-google-analytics": "0.8.1",
    "cordova-plugin-smaato": "0.5.2",
    "cordova-plugin-whitelist": "1.2.1",
    "org.apache.cordova.plugin.cache": "1.0.5",
    "cordova-plugin-dialogs": "1.2.0",
    "cordova-plugin-gcmpush": "0.0.1"
};
// BOTTOM OF METADATA
});