export function parseAgent() {
    var browser = [];
  
    if (typeof navigator != 'undefined'){
      if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase()))
        browser.push('chrome');
  
      if (navigator.userAgent.toLowerCase().includes('safari')
          && !navigator.userAgent.toLowerCase().includes('chrome'))
        browser.push('safari');
  
      if ('MozAppearance' in document.documentElement.style)
        browser.push('firefox');
  
      if (!!window.opera || /opera|opr/i.test(navigator.userAgent))
        browser.push('opera');
  
      if ('WebkitAppearance' in document.documentElement.style)
        browser.push('webkit');
  
      if (navigator.userAgent.includes('Edg'))
        browser.push('edge');
  
      //OS
      if (navigator.appVersion.indexOf('Win')!=-1) browser.push('windows');
      if (navigator.appVersion.indexOf('Mac')!=-1) browser.push('mac');
      if (navigator.appVersion.indexOf('X11')!=-1) browser.push('unix');
      if (navigator.appVersion.indexOf('Linux')!=-1) browser.push('linux');
  
      if (navigator.appVersion.indexOf('Electron')!=-1) browser.push('electron');
    }
  
    return browser;
}