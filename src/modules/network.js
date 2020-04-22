import config from './config'

export default {
    defaultIcons: function(s) {
      switch(parseInt(s)){
        case 0: return "infinite"; break;
        case -1: return "inbox"; break;
        case -2: return "best"; break;
        case -99: return "trash"; break;
        default: return "default-folder"; break;
      }
    },
    
    getDomain: function(url){
      url = url || "";
      if(typeof document != "undefined"){
          var a = document.createElement('a');
          a.href = url;
          var host = a.hostname;
          //delete a;
          return host;
      }else{
        var domain;
        //find & remove protocol (http, ftp, etc.) and get domain
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        }
        else {
            domain = url.split('/')[0];
        }

        //find & remove port number
        domain = domain.split(':')[0];

        return domain;
      }
    },

    getProtocol: function(url) {
        if (typeof document === 'undefined')
            return host;
        
        url = url || "";
        var a = document.createElement('a');
        a.href = url;
        var host = a.protocol;
        //delete a;
        return host;
    },

    fixURL: function(s) {
        try{
            s = s.trim();
        } catch(e) {if(e)s="";}

        if (s.indexOf('//')==0)
            return "http:"+s;
        else if (s.indexOf('/')==0)/*((s.indexOf('http://')!=0)&&(s.indexOf('https://')!=0)&&(s.indexOf('chrome-extension://')!=0))*/
            return config.host+s;
        else
            return s;
    },

    favIcon: function(s,size) {
        switch(size){
            case "retina":
                return "https://logo.clearbit.com/"+(s||"")+"?size="+(50*((window||{}).devicePixelRatio||1));
                //return config.host+"/favicon/"+(s||"");
            break;

            default:
                //return "https://favicon.yandex.net/favicon/"+(s||"")+"?color=255,255,255,0";
                return "https://plus.google.com/_/favicon?domain="+(s||"");
            break;
        }
    },

    thumb: function(s,width) {
        try{
            s = s.trim();
        } catch(e) {if(e)s="";}

        if (typeof width == "undefined")
            width = 230;

        if (s!="") {
            if (s.indexOf('http')!=0)
                return this.fixURL(s);
            else if (s.indexOf('stella.raindrop.io')!=-1 || s.indexOf('raindrop.io/screenshot')!=-1)
                return s;
            else
                return config.thumbService+"?url=" + encodeURIComponent(s) + "&width=" + width;
        }
        else
            return "about:blank";
    },

    cleanDomain: function(domain) {
        try{
            var temp = domain.split('.'), maxSize = 2;
            if (temp.length>maxSize){
                if ((temp[ temp.length-2 ] == 'org')||(temp[ temp.length-2 ] == 'net')||(temp[ temp.length-2 ] == 'com')||(temp[ temp.length-2 ] == 'co'))
                    maxSize = 3;

                temp.splice(0, temp.length-maxSize );
                domain = temp.join('.');
            }
        }catch(e){}

        return domain;
    },

    linkTarget: function() {
        var _target = "_self";
        if ((window.environment||[]).indexOf("clipper")!=-1)
            _target = "_top";

        return _target;
    },

    settingsURL: function() {
        var sURL = "../settings/settings.html#/settings";
        var _target = "_self";
        if ((window.environment||[]).indexOf("clipper")!=-1){
            _target = "_blank";
        }
        
        if (window.location.protocol.indexOf("http")!=-1) {
            sURL = "/settings#/settings";
        }
        if ((window.environment||[]).indexOf("mac")!=-1)
        {
            sURL = "../settings/settings.html?isMac#/settings";
        }
        
        return sURL;
    },

    getAvatar: function(emailMD5) {
        return "https://www.gravatar.com/avatar/"+emailMD5+"?d=mm&s="+40;
    },

    getSearchParam: function(name, url) {
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
};
