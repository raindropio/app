import s from './cache.module.styl'
import React from 'react'
import t from '~t'
import getCacheURL from '~data/modules/format/cache_url'

import Icon from '~co/common/icon'
import SuperFrame from '~co/common/superFrame'

const invalidStatus = {
    'invalid-origin': 'Origin is unreachable.',
    'invalid-size': 'Page size too large.',
    'invalid-timeout': 'Timeout.'
}

class ReaderCache extends React.Component {
    state = {
        url: ''
    }

    async componentDidMount(){
        await this.load()
    }

    async componentDidUpdate(prev) {
        if (prev.item._id != this.props.item._id)
            await this.load()
    }

    load = async()=>{
        this.setState({ url: await getCacheURL(this.props.item._id) })
    }

    renderStatus() {
        const { item: {cache} } = this.props
        let icon = '', text = ''

        switch(cache) {
            case 'ready':
                icon = 'ready'
                text = <p>{t.s('permanentCopy')} {t.s('saved').toLowerCase()}</p>
            break

            case 'retry':
                icon = 'retry'
                text = <p>{t.s('permanentCopy')} {t.s('uploadProgress').toLowerCase()}</p>
            break

            default:
                icon = 'failed'
                text = <p>{t.s('supportOnlyUrls')} <b>{invalidStatus[cache]}</b></p>
            break
        } 

        return (
            <div className={s.status} data-status={cache}>
                {icon && <Icon name={'cache_'+icon} className={s.icon} />}
                {text}
            </div>
        )
    }

	render() {
        const { item: { cache } } = this.props
        const { url } = this.state

        switch(cache) {
            case 'ready':
                return (
                    <div className={s.cache}>
                        {this.renderStatus()}
                        <SuperFrame className={s.frame} src={url} />
                    </div>
                )
            
            default:
                return this.renderStatus()
        }
	}
}

export default ReaderCache