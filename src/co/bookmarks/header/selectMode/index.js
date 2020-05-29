import React from 'react'
import _ from 'lodash'
import t from '~t'
import getLinks from '~data/modules/bookmarks/getLinks'

import Icon from '~co/common/icon'
import Move from './move'
import Checkbox from './checkbox'
import More from './more'

export default class BookmarksHeaderSelectMode extends React.PureComponent {
    handlers = {
        onCancelSelectModeClick: (e)=>{
            e.preventDefault()
            this.props.actions.cancelSelectMode(this.props.spaceId)
        },

        onSelectAllClick: (e)=>{
            e && e.preventDefault && e.preventDefault()

            if (this.props.selectMode.all)
                this.props.actions.unselectAll(this.props.spaceId)
            else
                this.props.actions.selectAll(this.props.spaceId)
        },

        onMove: (to)=>{
            this.props.actions.moveSelected(this.props.spaceId, to)
        },

        onImportantClick: (e)=>{
            e.preventDefault()
            this.props.actions.importantSelected(this.props.spaceId, true)
        },

        onImportantRemoveClick: (e)=>{
            e.preventDefault()
            this.props.actions.importantSelected(this.props.spaceId, false)
        },

        onScreenshotClick: (e)=>{
            e.preventDefault()
            this.props.actions.screenshotSelected(this.props.spaceId)
        },

        onAddTagsClick: (e)=>{
            e.preventDefault()
        },

        onRemoveTagsClick: (e)=>{
            e.preventDefault()
            this.props.actions.removeTagsSelected(this.props.spaceId, [])
        },

        onReparseClick: (e)=>{
            e.preventDefault()
            this.props.actions.reparseSelected(this.props.spaceId)
        },

        onRemoveClick: (e)=>{
            e.preventDefault()
            if (confirm(t.s('areYouSure')))
                this.props.actions.removeSelected(this.props.spaceId)
        },

        onOpenSelectedClick: (e)=>{
            e.preventDefault()

            getLinks(this.props.spaceId, true).forEach(link => window.open(link))
        }
    }

    render() {
        const { selectMode, collection, isSearching } = this.props
        const { onSelectAllClick, onCancelSelectModeClick, onAddTagsClick, onRemoveClick, onOpenSelectedClick } = this.handlers

        let title = collection._id ? (t.s('in') + ' ' + collection.title + (isSearching?' / '+t.s('defaultCollection-0'):'')) : ''

        return (
            <div className='elements-header select-mode'>
                <div className='header'>
                    <Checkbox 
                        {...this.props}
                        {...this.handlers} />

                    <div className='title' onClick={onSelectAllClick}>
                        {selectMode.all ? <span className='selected-all-badge'>{t.s('all')}</span> : selectMode.ids.length} {title}
                    </div>

                    <div className='space' />

                    <Move 
                        {...this.handlers} />

					<a className='button default' onClick={onAddTagsClick}>
                        <Icon name='tag' />
                        
                        <span className='hide-on-small-body'>{t.s('addTags')}</span>
                    </a>

					<a className='button default' onClick={onRemoveClick}>
                        <Icon name='trash' />
                        
                        <span className='hide-on-small-body'>
                            {t.s('remove')}
                        </span>
                    </a>

                    <a className='button default' onClick={onOpenSelectedClick}>
                        <Icon name='open' />
                        
                        <span className='hide-on-small-body'>
                            {t.s('open')}
                        </span>
                    </a>

					<More {...this.props} {...this.handlers} />

                    <a href='' className='button default' onClick={onCancelSelectModeClick}>
                        <Icon name='close' />
                        <span className='hide-on-small-body'>{t.s('cancel')}</span>
                    </a>
                </div>
            </div>
        )
    }
}