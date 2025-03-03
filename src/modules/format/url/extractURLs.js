import _ from 'lodash-es'
import isURL from 'validator/es/lib/isURL'

const urlPattern = /https?:\/\/[^\s]+/gi;

export function extractURLs(text) {
    return _.uniq(
        (String(text)||'').match(urlPattern) || []
    )
        .filter(url=>
            isURL(url, { require_protocol: true, require_tld: true })
        )
}