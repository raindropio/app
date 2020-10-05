import { FAVICON_URL } from '../../constants/app'

export default function(domain=''){
    if (!domain)
        return ''

    return `${FAVICON_URL}/${domain}`
}