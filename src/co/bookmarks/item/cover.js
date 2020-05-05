import React from 'react'
import getThumb from '~data/modules/format/thumb'
import { getColorForString } from '~data/helpers/colors'
import { getDomain } from '~modules/format/url'

//status by url
const status = {
    '': 'error' //undefined/error
}

const Placeholder = React.memo(({ domain, src })=>(
    <span 
        className='cover cover-placeholder'
        style={{backgroundColor: getColorForString(domain || getDomain(src))}} />
))

export default class BookmarkItemCover extends React.PureComponent {
    static defaultProps = {
        //everything optional
        src:    '',
        domain: '',
        width:  '',
        height: '',
        mode:   'crop',
        ar:     '' //aspect-ratio
    }

    state = {}

    onImageLoadError = ()=>{
        status[this.props.src] = 'error'

        this.setState({n: (this.state.n||0)+1})
    }

    renderImage = ()=>{
        const { src, domain, width, height, mode, ar, ...etc } = this.props

        switch(status[src]) {
            case 'error':
                return (
                    <Placeholder 
                        domain={domain}
                        src={src} />
                )

            default:
                return (
                    <img 
                        className='cover' 
                        {...etc}
                        src={src && `${getThumb(src)}&mode=${mode}&ar=${ar}&width=${width}&height=${height}&dpr=${window.devicePixelRatio}`}
                        onError={this.onImageLoadError} />
                )
        }
    }

    render() {
        const { className='' } = this.props

        return (
            <div className={'cover-wrap '+className}>
                <div className='cover-over'  />
                {this.renderImage()}
            </div>
        )
    }
}