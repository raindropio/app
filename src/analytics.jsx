var id = 'UA-45127971-1';
var enabled = true;

//Disable for Firefox extension
if (window.location.search.includes('is_clipper') && ('MozAppearance' in document.documentElement.style))
    enabled = false;

if (enabled) {
    //inject script
    (function(d, s, tagId){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(tagId)){ return; }
        js = d.createElement(s);
        js.id = tagId;
        js.async = true;
        js.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'gasrc'));

    //init GA
    window.dataLayer = window.dataLayer || []
    window.gtag = function(){dataLayer.push(arguments);}
    window.gtag('js', new Date())
    window.gtag('set', 'checkProtocolTask', null)
    window.gtag('set', {'checkProtocolTask': null})

    function pageview() {
        const page_path = location.hash.substr(1)

        if (page_path!='/app/loading')
            window.gtag('config', id, {
                page_path,
                page_title: document.title,
            })
    }

    pageview()
    window.onhashchange = pageview
}