import { APP_BASE_URL } from '../../constants/app'

export default function(s=''){
    try{s = s.trim();} catch(e) {if(e)s='';}

    if (s.indexOf('data:')==0)
        return ''

    if (s.indexOf('//')==0)
        return 'http:'+s;
    else if (s.indexOf('/')==0)
        return APP_BASE_URL+s;
    else
        return s;
}