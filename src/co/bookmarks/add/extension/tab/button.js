import s from './button.module.styl'
import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { draftLoad } from '~data/actions/bookmarks'
import { getDraftItem, getDraftStatus } from '~data/selectors/bookmarks'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Preloader from '~co/common/preloader'

class BookmarksAddSave extends React.Component {
    static defaultProps = {
        tab: {}, //{ link, title }
        //...same as ../index
    }

    componentDidMount() {
        this.load({})
    }

    componentDidUpdate(prev) {
        if (prev.tab != this.props.tab)
            this.load({})

        //after successfull save
        if (prev.status == 'saving' &&
            this.props.status == 'loaded')
            this.onEditClick()
    }

    load = (details={})=>{
        const { draftLoad, tab, spaceId } = this.props

        draftLoad(tab.link, {
            item: {
                ...tab,
                collectionId: parseInt(spaceId)
            },
            autoCreate: false,
            ...details
        })
    }

    onAddClick = ()=>{
        this.load({
            autoCreate: true,
            preventDuplicate: false //no need to check for duplicate, because we already know that it's new
        })
    }

    onEditClick = ()=>{
        const { onEdit, item } = this.props

        onEdit([item])
    }

    render() {
        const { status, search } = this.props

        switch(status) {
            case 'saving':
                return (
                    <Button
                        className={s.button}>
                        <Preloader />
                        <span className={s.label}>{t.s('save')}…</span>
                    </Button>
                )

            case 'loaded':
                return (
                    <Button 
                        className={s.button}
                        variant='active'
                        title={t.s('edit')}
                        onClick={this.onEditClick}>
                        <Icon name='check_active' />
                        <span className={s.label}>{!search && t.s('saved')}</span>
                    </Button>
                )

            default:
                return (
                    <Button 
                        className={s.button}
                        data-init={status == 'loading' || status == 'idle'}
                        variant='primary'
                        title={t.s('save')}
                        onMouseDown={this.onAddClick}>
                        <Icon name='new_bookmark' />
                        <span className={s.label}>{!search && t.s('save')}</span>
                    </Button>
                )
        }
    }
}

export default connect(
	(state, { tab })=>({
        status: getDraftStatus(state, tab.link),
        item: getDraftItem(state, tab.link)
    }),
	{ draftLoad }
)(BookmarksAddSave)