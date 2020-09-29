import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { appendTagsSelected } from '~data/actions/bookmarks'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import TagsPicker from '~co/picker/tags'

class BookmarksHeaderSelectMode extends React.Component {
    static defaultProps = {
        selectMode: {}
    }

    state = {
        show: false,
        tags: []
    }

    onClick = ()=>
        this.setState({ show: true })

    onClose = () =>
        this.setState({ show: false })

    onChange = tags =>
        this.setState({ tags })

    onSubmit = () => {
        if (this.state.tags.length)
            this.props.appendTagsSelected(this.props.selectMode.spaceId, this.state.tags)
        
        this.onClose()
    }

    render() {
        const { selectMode: { spaceId, all, ids } } = this.props
        const { tags, show } = this.state

        return (
            <>
                <Button 
                    variant='outline'
                    title={t.s('addTags')}
                    disabled={!all && !ids.length}
                    onClick={this.onClick}>
                    <Icon name='tag' />
                    
                    <span className='hide-on-small-body'>{t.s('addTags')}</span>
                </Button>

                {show && (
                    <TagsPicker 
                        value={tags}
                        spaceId={spaceId}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        onClose={this.onClose} />
                )}
            </>
        )
    }
}

export default connect(
	undefined,
	{ appendTagsSelected }
)(BookmarksHeaderSelectMode)