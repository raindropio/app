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
        const { cover, view, link, domain, gridSize, indicator, ...etc } = this.props
        let { width, height, ar } = size(view, gridSize) //use height only for img element
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

        return (
            <>
                <source
                    srcSet={uri && `${uri}?mode=crop&format=webp&width=${width||''}&ar=${ar||''}&dpr=${window.devicePixelRatio||1} ${window.devicePixelRatio||1}x`}
                    type='image/webp' />

                <img 
                    tabIndex='-1'
                    className={s.image}
                    data-ar={ar}
                    width={width}
                    height={height}
                    alt=' '
                    {...etc}
                    src={uri && `${uri}?mode=crop&width=${width||''}&ar=${ar||''}&dpr=${window.devicePixelRatio||1}`}
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
                role='image'
                className={s.wrap+' '+s[view]+' '+className}>
                {this.renderImage()}
                {!loaded && (cover||link) && <div className={s.preloader}><Preloader /></div>}
            </picture>
        )
    }
}