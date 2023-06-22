import s from './tags.module.styl'
import React from 'react'
import { Link } from 'react-router-dom'

import Icon from '~co/common/icon'

class BookmarksItemTag extends React.PureComponent {
    render() {
        const { tag, spaceId } = this.props
        
        return (
            <Link 
                key={tag} 
                tabIndex='-1'
                to={'/my/'+spaceId+'/'+encodeURIComponent(tag.includes(' ') ? `"#${tag}"` : `#${tag}`)}>
                <Icon name='tag' size='micro' />
                {tag}
            </Link>
        )
    }
}

export default class BookmarksItemTags extends React.PureComponent {
    render() {
        const { tags=[], className, spaceId } = this.props

        if (!tags.length)
            return null

        return (
            <div className={className}>
                <span className={s.tags}>
                    {tags.map(tag=>
                        <BookmarksItemTag 
                            key={tag}
                            tag={tag}
                            spaceId={spaceId} />
                    )}
                </span>
            </div>
        )
    }
}