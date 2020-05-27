import config from '~config'

export default {
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
    }
}