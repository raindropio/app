import thumb from './thumb'

export default function(domain=''){
    if (!domain)
        return ''

    return thumb(`https://logo.clearbit.com/${domain}`)
}