import React from 'react'
import t from '~t'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import OpenAllBookmarks from '~co/bookmarks/openAll'

class BookmarksSelectModeOpen extends React.Component {
    static defaultProps = {
        selectMode: {}
    }

    state = {
        show: false
    }

    onOpenSelectedClick = ()=>
        this.setState({ show: true })

    onOpenSelectedClose = ()=>
        this.setState({ show: false })

    render() {
        const { selectMode: { all, ids } } = this.props

        return (
            <Button 
                variant='outline'
                title={t.s('open')}
                disabled={!all && !ids.length}
                onClick={this.onOpenSelectedClick}>
                <Icon name='open' />
                
                <span className='hide-on-small-body'>
                    {t.s('open')}
                </span>

                {this.state.show ? (
                    <OpenAllBookmarks
                        spaceId={this.props.selectMode.spaceId}
                        selected={true}
                        onClose={this.onOpenSelectedClose}
                        />
                ) : null}
            </Button>
        )
    }
}

export default BookmarksSelectModeOpen