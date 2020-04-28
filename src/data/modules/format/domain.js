export default function(s='') {
    try{s = s.trim();} catch(e) {if(e)s='';}
    return s.replace(/^www\./, '')
}