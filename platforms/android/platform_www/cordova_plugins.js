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
    },
    {
        "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
        "id": "cordova-plugin-x-socialsharing.SocialSharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "file": "plugins/cordova-plugin-email-composer/www/email_composer.js",
        "id": "cordova-plugin-email-composer.EmailComposer",
        "clobbers": [
            "cordova.plugins.email",
            "plugin.email"
        ]
    },
    {
        "file": "plugins/cordova-plugin-admobpro/www/AdMob.js",
        "id": "cordova-plugin-admobpro.AdMob",
        "clobbers": [
            "window.AdMob"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-google-analytics": "0.8.1",
    "cordova-plugin-whitelist": "1.2.1",
    "org.apache.cordova.plugin.cache": "1.0.5",
    "cordova-plugin-dialogs": "1.2.0",
    "cordova-plugin-gcmpush": "0.0.1",
    "cordova-plugin-x-socialsharing": "5.0.11",
    "cordova-plugin-device": "1.1.1",
    "cordova-plugin-inappbrowser": "1.3.0",
    "cordova-plugin-email-composer": "0.8.3",
    "cordova-plugin-extension": "1.5.1",
    "cordova-plugin-admobpro": "2.18.0"
};
// BOTTOM OF METADATA
});