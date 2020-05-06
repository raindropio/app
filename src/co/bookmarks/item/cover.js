import React from 'react'
import getThumbUri from '~data/modules/format/thumb'
import getScreenshotUri from '~data/modules/format/screenshot'
import { getColorForString } from '~data/helpers/colors'
import { getDomain } from '~modules/format/url'

//cache src statuses
const status = {
    '': 'error' //undefined/error
}

const onSrcError = (src)=>{
    if (!status[src])
        status[src] = 'screenshot'
    else
        status[src] = 'error'
}

//main component
export default class BookmarkItemCover extends React.PureComponent {
    static defaultProps = {
        src:    '',
        link:   '', //required
        domain: '',
        view:   'list',
    }

    constructor(props) {
        super(props)

        if (!props.src)
            onSrcError(props.src)

        this.state = {}
    }

    //rotate status on error
    onImageLoadError = ()=>{
        onSrcError(this.props.src)

        this.setState({n: (this.state.n||0)+1})
    }

    renderImage = ()=>{
        const { src, domain, view, link, ...etc } = this.props
        let width, mode, ar, uri

        switch(status[src]) {
            case 'error':
                return (
                    <Placeholder 
                        domain={domain}
                        src={src} />
                )

            case 'screenshot':
                uri = getScreenshotUri(link)
                break

            default:
                uri = src
                break
        }

        switch (view) {
            case 'grid':
                width = 250
                mode = 'crop'
                ar = '16:9'
                break;

            case 'masonry':
                width = 250
                break;
        
            default:
                width = 50
                mode = 'crop'
                ar = '1:1'
                break;
        }

        return (
            <img 
                className='cover' 
                {...etc}
                loading='lazy'
                srcSet={`${getThumbUri(uri)}&mode=${mode}&ar=${ar}&width=${width}&dpr=${window.devicePixelRatio}`}
                onError={this.onImageLoadError} />
        )
    }

    render() {
        const { className='' } = this.props

        return (
            <div className={'cover-wrap '+className}>
                {this.renderImage()}
            </div>
        )
    }
}

const Placeholder = React.memo(({ domain, src })=>(
    <span 
        className='cover cover-placeholder'
        style={{backgroundColor: getColorForString(domain || getDomain(src))}} />
))