import s from './view.module.styl'
import React from 'react'
import getThumbUri from '~data/modules/format/thumb'
import getScreenshotUri from '~data/modules/format/screenshot'
import getFaviconUri from '~data/modules/format/favicon'
import size from './size'
import Preloader from '~co/common/preloader'

//cache thumb/screenshot uri
const thumbs = {}
const getUri = (uri, mode='', domain)=>{
    if (!thumbs[uri])
        switch (mode) {
            case 'screenshot':
                thumbs[uri] = getScreenshotUri(uri)
                break

            case 'favicon':
                thumbs[uri] = domain ? getFaviconUri(domain) : getThumbUri(uri)
                break
        
            default:
                thumbs[uri] = getThumbUri(uri)
                break
        }
    return thumbs[uri]
}

//pixel density
const dpr = {
    grid: (window.devicePixelRatio||1)+1,
    masonry: (window.devicePixelRatio||1)+1,
    default: window.devicePixelRatio||1
}

//main component
export default class BookmarkItemCover extends React.PureComponent {
    static defaultProps = {
        cover:  '',
        link:   '', //required
        view:   'list',
        indicator:false
    }

    constructor(props) {
        super(props)

        this.state = {
            loaded: props.indicator ? false : true
        }
    }

    componentDidUpdate(prev) {
        if (prev.cover != this.props.cover && this.props.indicator)
            this.setState({ loaded: false })
    }

    onImageLoadSuccess = ()=>{
        this.setState({ loaded: true })
    }

    renderImage = ()=>{
        const { cover, view, link, domain, coverSize, indicator, ...etc } = this.props
        let { width, height, ar } = size(view, coverSize) //use height only for img element
        let uri

        switch(view){
            //simple always have a favicon
            case 'simple':
                if (link)
                    uri = getUri(link, 'favicon', domain)
                break

            //in other view modes we show a thumbnail or screenshot
            default:
                if (cover)
                    uri = getUri(cover)
                else if (link)
                    uri = getUri(link, 'screenshot')
                break
        }

        let mode
        switch(view) {
            case 'grid':
                mode = 'fillmax'
                break

            default:
                mode = 'crop'
                break
        }

        return (
            <>
                <source
                    srcSet={uri && `${uri}?mode=${mode}&fill=solid&format=webp&width=${width||''}&ar=${ar||''}&dpr=${dpr[view]||dpr.default}`}
                    type='image/webp' />

                <img 
                    tabIndex='-1'
                    className={s.image}
                    data-ar={ar}
                    width={width}
                    height={height}
                    alt=' '
                    loading={view=='masonry' ? 'eager' : 'lazy'}
                    {...etc}
                    src={uri && `${uri}?mode=${mode}&fill=solid&width=${width||''}&ar=${ar||''}&dpr=${dpr[view]||dpr.default}`}
                    //type='image/jpeg'
                    onLoad={indicator && uri ? this.onImageLoadSuccess : undefined}
                    onError={indicator && uri ? this.onImageLoadSuccess : undefined} />
            </>
        )
    }

    render() {
        const { className='', view, cover, link } = this.props
        const { loaded } = this.state

        return (
            <picture 
                role='img'
                className={s.wrap+' '+s[view]+' '+className}>
                {this.renderImage()}
                {!loaded && (cover||link) && <div className={s.preloader}><Preloader /></div>}
            </picture>
        )
    }
}