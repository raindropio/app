import React from 'react'
import getThumbUri from '~data/modules/format/thumb'
import getScreenshotUri from '~data/modules/format/screenshot'
import getFaviconUri from '~data/modules/format/favicon'
import size from './size'

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

//cache thumb/screenshot uri
const thumbs = {}
const getStellaUri = (uri, mode='')=>{
    if (!thumbs[uri])
        switch (mode) {
            case 'screenshot':
                thumbs[uri] = getScreenshotUri(uri)
                break

            case 'favicon':
                thumbs[uri] = getFaviconUri(uri)
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
        src:    '',
        link:   '', //required
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
        const { src, view, link, gridSize, ...etc } = this.props
        let { width, height } = size(view, gridSize)
        let mode = 'crop'
        let uri

        switch(view){
            //simple always have a favicon
            case 'simple':
                uri = getStellaUri(link, 'favicon')
                break

            //in other view modes we show a thumbnail, screenshot or placeholder, depends on status
            default:
                switch(status[src]) {
                    case 'error':
                        return (
                            <span className='cover cover-placeholder' />
                        )
        
                    case 'screenshot':
                        uri = getStellaUri(link, 'screenshot')
                        break
        
                    default:
                        uri = getStellaUri(src)
                        break
                }
                break
        }

        return (
            <img 
                className='cover'
                loading='lazy'
                {...etc}
                src={`${uri}&mode=${mode}&width=${width}&height=${height}&dpr=${window.devicePixelRatio}`}
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