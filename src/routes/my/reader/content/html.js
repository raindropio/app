import s from './html.module.styl'
import React from 'react'
import { connect } from 'react-redux'
import { getHtml } from '~data/selectors/bookmarks'
import { ShortDate } from '~modules/format/date'
import { htmlLoad } from '~data/actions/bookmarks'

import Preloader from '~co/common/preloader'

class ReaderHTML extends React.Component {
    componentDidMount() {
        this.props.htmlLoad(this.props.item._id)
    }

    render() {
        const {
            item: { type, title, domain, created  },
            html: { html, status },
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
                        <h1 className={s.title}><a href={(this.props.item||{}).link} target='_blank'>{title}</a></h1>

                        <div dangerouslySetInnerHTML={{ __html: html }} />
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
                        
                        <div className={s.html} dangerouslySetInnerHTML={{ __html: html }} />
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