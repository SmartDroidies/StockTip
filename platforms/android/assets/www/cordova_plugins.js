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
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-google-analytics": "0.8.1",
    "cordova-plugin-smaato": "0.5.2",
    "cordova-plugin-whitelist": "1.2.1",
    "org.apache.cordova.plugin.cache": "1.0.5"
};
// BOTTOM OF METADATA
});