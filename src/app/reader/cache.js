import React from 'react'
import t from '~t'
import config from '../../modules/config'
import { humanDate, humanFileSize } from '../../modules/strings'

import Icon from '~icon'
import SuperFrame from '../../co/common/superFrame'

const invalidStatus = {
    'invalid-origin': 'Origin is unreachable.',
    'invalid-size': 'Page size too large.',
    'invalid-timeout': 'Timeout.'
}

class Cache extends React.Component {
    displayName = 'reader/cache'
    
    renderStatus() {
        const { cache={} } = this.props.item||{}
        let icon = '', text = ''

        switch(cache.status) {
            case 'ready':
                icon = 'ready'
                text = <p>{t.s('permanentCopy')} {t.s('saved').toLowerCase()} <b>{humanDate(cache.created)}</b> ({humanFileSize(cache.size)})</p>
            break

            case 'retry':
                icon = 'retry'
                text = <p>{t.s('permanentCopy')} {t.s('uploadProgress').toLowerCase()}</p>
            break

            default:
                icon = 'failed'
                text = <p>{t.s('supportOnlyUrls')} <b>{invalidStatus[cache.status]}</b></p>
            break
        } 

        return (
            <div className='cache-status' data-status={cache.status}>
                {icon && <Icon name={'cache_'+icon} className='cache-status-icon' />}
                {text}
            </div>
        )
    }

	render() {
        const { _id, domain, cache={} } = this.props.item||{}

        switch(cache.status) {
            case 'ready':
                return (
                    <SuperFrame src={getCacheLink(_id)} domain={domain}>
                        {this.renderStatus()}
                    </SuperFrame>
                )
            
            default:
                return this.renderStatus()
        }
	}
}

export function getCacheLink(_id) {
    return `${config.apiPrefix}raindrop/${_id}/cache`
}

export default Cache