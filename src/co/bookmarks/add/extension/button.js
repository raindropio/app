import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { draftLoad } from '~data/actions/bookmarks'
import { getDraftItem, getDraftStatus } from '~data/selectors/bookmarks'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Preloader from '~co/common/preloader'

class BookmarksAddButton extends React.Component {
    static defaultProps = {
        current: {}, //{ url, title }
        //...same as ../index
    }

    componentDidMount() {
        this.load({})
    }

    componentDidUpdate(prev) {
        if (prev.current != this.props.current)
            this.load({})

        //after successfull save
        if (prev.status == 'saving' &&
            this.props.status == 'loaded')
            this.onEditClick()
    }

    load = ({ autoCreate = false })=>{
        const { draftLoad, current, spaceId } = this.props

        draftLoad(current.url, {
            item: {
                ...current,
                collectionId: parseInt(spaceId)
            },
            autoCreate
        })
    }

    onAddClick = ()=>{
        this.load({ autoCreate: true })
    }

    onEditClick = ()=>{
        const { onEdit, item } = this.props

        onEdit(item)
    }

    render() {
        const { status } = this.props

        switch(status) {
            case 'saving':
                return (
                    <Button>
                        <Preloader />
                    </Button>
                )

            case 'loaded':
                return (
                    <Button 
                        variant='active'
                        title={t.s('add')}
                        onClick={this.onEditClick}>
                        <Icon name='check_active' />
                        {t.s('saved')}
                    </Button>
                )

            default:
                return (
                    <Button 
                        disabled={status == 'loading' || status == 'idle'}
                        variant='primary'
                        title={t.s('add')}
                        onClick={this.onAddClick}>
                        <Icon name='new_bookmark' />
                        {t.s('add')}
                    </Button>
                )
        }
    }
}

export default connect(
	(state, { current })=>({
        status: getDraftStatus(state, current.url),
        item: getDraftItem(state, current.url)
    }),
	{ draftLoad }
)(BookmarksAddButton)