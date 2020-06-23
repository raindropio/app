import React from 'react'
import t from '~t'
import getLinks from '~data/modules/bookmarks/getLinks'

import Button from '~co/common/button'
import Icon from '~co/common/icon'

class BookmarksSelectModeOpen extends React.Component {
    static defaultProps = {
        selectMode: {}
    }

    onOpenSelectedClick = (e)=>{
        e.preventDefault()

        getLinks(this.props.selectMode.spaceId, true)
            .forEach(link => window.open(link))
    }

    render() {
        return (
            <Button onClick={this.onOpenSelectedClick}>
                <Icon name='open' />
                
                <span className='hide-on-small-body'>
                    {t.s('open')}
                </span>
            </Button>
        )
    }
}

export default BookmarksSelectModeOpen