import React from 'react'
import Cover from './cover'

export default class BookmarkItemView extends React.PureComponent {
    render() {
        const { title, excerpt, body, cover, domain, view, selected } = this.props

        return (
            <article className={`element element-${view} ${selected&&'active'} `}>
                <Cover
                    src={cover}
                    domain={domain}
                    width={50}
                    ar='1:1' />

                <div className='about'>
                    <span className='title'>{title}</span>
                    <div>
                        <p className='description'>{excerpt}</p>
                        {body && <p className='description from-body'>{body}</p>}
                    </div>
                </div>
            </article>
        )
    }
}