import React from 'react'
import t from '~t'
import openAllBookmarks from '~co/bookmarks/openAll'

import Button from '~co/common/button'
import Icon from '~co/common/icon'

class BookmarksSelectModeOpen extends React.Component {
    static defaultProps = {
        selectMode: {}
    }

    onOpenSelectedClick = (e)=>{
        e.preventDefault()

        openAllBookmarks(this.props.selectMode.spaceId, true)
    }

    render() {
        return (
            <Button 
                variant='outline'
                title={t.s('open')}
                onClick={this.onOpenSelectedClick}>
                <Icon name='open' />
                
                <span className='hide-on-small-body'>
                    {t.s('open')}
                </span>
            </Button>
        )
    }
}

export default BookmarksSelectModeOpen