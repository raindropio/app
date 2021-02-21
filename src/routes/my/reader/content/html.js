import s from './html.module.styl'
import React from 'react'
import { connect } from 'react-redux'
import DOMPurify from 'dompurify'
import { getHtml } from '~data/selectors/bookmarks'
import { ShortDate } from '~modules/format/date'
import { htmlLoad } from '~data/actions/bookmarks'

import Preloader from '~co/common/preloader'

class ReaderHTML extends React.Component {
    componentDidMount() {
        this.props.htmlLoad(this.props.item._id)
    }

    getHtml = ()=>{
        const {
            html: { html }
        } = this.props

        return {
            dangerouslySetInnerHTML: {
                __html: DOMPurify.sanitize(html, {
                    ADD_TAGS: ['iframe'],
                    ADD_ATTR: ['frameborder', 'allowfullscreen']
                })
            }
        }
    }

    render() {
        const {
            item: { type, title, domain, created  },
            html: { status },
            font_family, font_size
        } = this.props

        const loading = status=='loading' && <div className={s.loading}><Preloader enlarge='1.5' /></div>

        switch(type) {
            default:
                return (
                    <article 
                        role='article'
                        className={s.article}
                        style={{'--html-font-size': font_size+'px', fontFamily: font_family}}>
                        {loading}

                        <div className={s.domain}><b>{domain}</b> &nbsp;&middot;&nbsp; <ShortDate date={created}/></div>
                        <h1 className={s.title}><a href={(this.props.item||{}).link} rel='noopener' target='_blank'>{title}</a></h1>

                        <div {...this.getHtml()} />
                    </article>
                )

            case 'image':
            case 'audio':
            case 'video':
            case 'document':
                return (
                    <div
                        role='article'
                        className={s.content}>
                        {loading}
                        
                        <div className={s.html} {...this.getHtml()} />
                    </div>
                )
        }
    }
}

export default connect(
    ()=>{
        return (state, { item })=>({
            html: getHtml(state, item._id),

            font_size: state.config.font_size,
            font_family: state.config.font_family
        })
    },
    { htmlLoad }
)(ReaderHTML)