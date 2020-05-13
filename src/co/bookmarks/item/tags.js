import React from 'react'
import Icon from '~co/common/icon'

class BookmarksItemTag extends React.PureComponent {
    onClick = (e)=>{
        e.preventDefault()
        this.props.onClick(this.props.tag)
    }

    render() {
        const { tag } = this.props
        
        return (
            <a href='' key={tag} onClick={this.onClick}>
                <Icon name='tag' size='micro' />
                {tag}
            </a>
        )
    }
}

export default class BookmarksItemTags extends React.PureComponent {
    render() {
        const { tags=[], onTagClick } = this.props

        if (!tags.length)
            return null

        return (
            <p>
                <span className='tags'>
                    {tags.map(tag=>
                        <BookmarksItemTag 
                            key={tag}
                            tag={tag}
                            onClick={onTagClick} />
                    )}
                </span>
            </p>
        )
    }
}