import s from './view.module.styl'
import React from 'react'
import getThumbUri from '~data/modules/format/thumb'
import getScreenshotUri from '~data/modules/format/screenshot'
import getFaviconUri from '~data/modules/format/favicon'
import size from './size'
import transparentPng from '~assets/images/transparent.png'

//cache cover statuses
const status = {
    '': 'error' //undefined/error
}

const onCoverError = (cover)=>{
    if (!status[cover])
        status[cover] = 'screenshot'
    else
        status[cover] = 'error'
}

//cache thumb/screenshot uri
const thumbs = {}
const getStellaUri = (uri, mode='', domain)=>{
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
    }

    constructor(props) {
        super(props)

        if (!props.cover)
            onCoverError(props.cover)

        this.state = {}
    }

    //rotate status on error
    onImageLoadError = ()=>{
        onCoverError(this.props.cover)
        this.forceUpdate()
    }

    renderImage = ()=>{
        const { cover, view, link, domain, gridSize, ...etc } = this.props
        let { width, height, ar } = size(view, gridSize) //use height only for img element
        let uri

        if (status[cover] == 'error')
            return (
                <img 
                    src={transparentPng}
                    className={s.cover + ' ' + s.placeholder}
                    data-ar={ar}
                    width={width}
                    height={height} />
            )

        switch(view){
            //simple always have a favicon
            case 'simple':
                uri = getStellaUri(link, 'favicon', domain)
                break

            //in other view modes we show a thumbnail, screenshot or placeholder, depends on status
            default:
                switch(status[cover]) {
                    case 'screenshot':
                        uri = getStellaUri(link, 'screenshot', domain)
                        break
        
                    default:
                        uri = getStellaUri(cover, '', domain)
                        break
                }
                break
        }

        return (
            <>
                <source
                    srcSet={`${uri}&mode=crop&format=webp&width=${width||''}&ar=${ar||''}&dpr=${window.devicePixelRatio||1} ${window.devicePixelRatio||1}x`}
                    type='image/webp' />

                <img 
                    className={s.cover}
                    data-ar={ar}
                    loading='lazy'
                    width={width}
                    height={height}
                    {...etc}
                    src={`${uri}&mode=crop&width=${width||''}&ar=${ar||''}&dpr=${window.devicePixelRatio||1}`}
                    onError={this.onImageLoadError} />
            </>
        )
    }

    render() {
        const { className='', view } = this.props

        return (
            <picture className={s.wrap+' '+s[view]+' '+className}>
                {this.renderImage()}
            </picture>
        )
    }
}