import s from './suggested.module.styl'
import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { makeSuggestedTags } from '~data/selectors/tags'

import Button from '~co/common/button'
import Icon from '~co/common/icon'

class BookmarkEditFormTagsSuggested extends React.Component {
    onAddSuggestedTag = e => {
        const name = e.currentTarget.getAttribute('data-tag')
        this.props.onChange({ tags: [...this.props.item.tags, name] })
    }

    render() {
        const { suggested } = this.props
        if (!suggested.length) return null

        const title = t.s('add')+' '+t.s('suggested').toLowerCase()+' '+t.s('tag')

        return (
            <div className={s.suggested}>
                {suggested.map(item=>(
                    <Button 
                        key={item._id}
                        variant='outline'
                        size='small'
                        data-tag={item._id}
                        title={title}
                        onClick={this.onAddSuggestedTag}>
                        {item._id}
                    </Button>
                ))}
            </div>
        )
    }
}

export default connect(
    () => {
        const getSuggestedTags = makeSuggestedTags()
    
        return (state, props) => ({
            suggested: getSuggestedTags(state, props.item._id)
        })
    }
)(BookmarkEditFormTagsSuggested)