import s from './cache.module.styl'
import React from 'react'
import t from '~t'
import getCacheURL from '~data/modules/format/cache_url'

import Header, { Title, Space } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import SuperFrame from '~co/common/superFrame'
import Popover from '~co/overlay/popover'

const invalidStatus = {
    'invalid-origin': 'Origin is unreachable.',
    'invalid-size': 'Page size too large.',
    'invalid-timeout': 'Timeout.'
}

class ReaderCache extends React.Component {
    state = {
        url: '',
        download: false
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

    onDownloadClick = (e)=>{
        e.preventDefault()
        this.setState({ download: true })
    }

    onDownloadClose = ()=>
        this.setState({ download: false })

    renderStatus() {
        const { url } = this.state
        const { item: { cache, domain } } = this.props

        let icon = '', title = ''

        switch(cache) {
            case 'ready':
                icon = 'ready'
                title = t.s('permanentCopy') + ' ' + t.s('saved').toLowerCase()
            break

            case 'retry':
                icon = 'retry'
                title = t.s('permanentCopy') + ' ' + t.s('uploadProgress').toLowerCase()
            break

            default:
                icon = 'failed'
                title = <>{t.s('supportOnlyUrls')} <b>{invalidStatus[cache]}</b></>
            break
        }

        return (
            <Header className={s.status} data-status={cache}>
                {icon && <Icon name={'cache_'+icon} className={s.icon} />}
                <Title>{title}</Title>
                <Space />

                {cache == 'ready' && (
                    <>
                        <Button 
                            href={url}
                            target='_blank'>
                            <Icon name='open' size='micro' />
                            {t.s('open')}
                        </Button>

                        <Button 
                            href={url}
                            target='_blank'
                            download={domain+'.html'}
                            onClick={this.onDownloadClick}>
                            <Icon name='document' size='micro' />
                            {t.s('download')}
                        </Button>
                    </>
                )}
            </Header>
        )
    }

	render() {
        const { item: { cache } } = this.props
        const { url, download } = this.state

        switch(cache) {
            case 'ready':
                return (
                    <div className={s.cache}>
                        {this.renderStatus()}
                        <SuperFrame className={s.frame} src={url} />

                        {download && <Popover onClose={this.onDownloadClose}>Right click on this button and select "Save link as..."</Popover>}
                    </div>
                )
            
            default:
                return this.renderStatus()
        }
	}
}

export default ReaderCache