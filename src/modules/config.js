var home = "raindrop.io";
var host = "https://"+home;

if(typeof window != "undefined"){
    if (window.location.protocol.indexOf('http')==0)
        host = window.location.protocol+"//"+home;
}

export default {
    home: home,
	host: host,
    apiPrefix: __DEV__ ? "http://dev.raindrop.io:3000/v1/" : "https://api.raindrop.io/v1/",
    screenshotService: "https://stella.raindrop.io/imager/screenshot.jpg?width=460&url=",
    thumbService: "https://stella.raindrop.io/imager/thumb.jpg",
    contentTypes: ["link", "article", "image", "video"],

    proPage: host + "/pro",

    collectionExpandPrefix: "collection_expanded_",

    "links": {
        "apps": host+"/settings#/settings/install",
        "extension": {
            "chrome": "https://raindrop.io/r/extension/chrome",
            "firefox": "https://raindrop.io/r/extension/firefox",
            "safari": "https://raindrop.io/r/extension/safari",
            "opera": "https://raindrop.io/r/extension/opera",
            "edge": "https://raindrop.io/r/extension/edge"
        },
        "newtab": {
            "chrome": "https://chrome.google.com/webstore/detail/raindropio-new-tab-speed/knifgjkgmgdinjeecneiphoniamhgbof",
            "firefox": "https://raindrop.io/releases/newtab.xpi"
        },
        "ios": "https://raindrop.io/r/app/ios",
        "android": "https://raindrop.io/r/app/android",

        "macos": "https://raindrop.io/r/app/macos",
        "windows": "https://raindrop.io/r/app/windows",

        "settings": host+"/settings#/settings",

        "pro": {
            "buy": "https://raindrop.io/pro/buy",
            "compare": "https://raindrop.io/pro",
            "faq": "https://help.raindrop.io/category/11-pro-account",
            "help-legacy-subscription": "https://help.raindrop.io/article/52-legacy-subscription",
            "help-change-billing-cycle": "https://help.raindrop.io/article/51-change-billing-cycle"
        }
    },

    getImportLink: function() {
        return this.host+"/app#/settings/import";
    }
}