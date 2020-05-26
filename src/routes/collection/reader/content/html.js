import React from 'react'
import { connect } from 'react-redux'
import { getHtml } from '~data/selectors/bookmarks'
import { ShortDate } from '~modules/format/date'

import Preloader from '~co/common/preloader'

class ReaderHTML extends React.Component {
    componentDidMount() {
        this.props.actions.htmlLoad(this.props.item._id)
    }

    render() {
        const {
            item: { type, title, domain, created  },
            html: { html, status }
        } = this.props

        return (
            <div className={`preview preview-type-${type} vfontcolor- vfontsize-1 vfontfamily-default`}>
                {status=='loading' ? <div className='centerContentWrap status-loading'><Preloader /></div> : null}

                <div className={`previewContent ${status}`}>
                    <div className='domain'><b>{domain}</b> &nbsp;&middot;&nbsp; <ShortDate date={created}/></div>
					<h1 className='previewTitle'><a href={(this.props.item||{}).link} target='_blank'>{title}</a></h1>

					<div className='text-viewer-raindrop'>
						<article dangerouslySetInnerHTML={{ __html: html }}></article>
					</div>
                </div>
            </div>
        )
    }
}

export default connect(
    ()=>{
        return (state, { item })=>({
            html: getHtml(state, item._id)
        })
    }
)(ReaderHTML)