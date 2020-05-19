import React from 'react'
import _ from 'lodash'
import t from '~t'
import Icon from '~co/common/icon'

import Checkbox from './checkbox'
import More from './more'

export default class BookmarksHeaderSelectMode extends React.PureComponent {
    render() {
        const { selectMode, collection } = this.props
        const { onSelectAllClick, onCancelSelectModeClick, onImportantClick, onAddTagsClick, onRemoveClick, onOpenAllClick } = this.props

        let title = collection._id ? t.s('in') + ' ' + collection.title : ''

        return (
            <div className='elements-header select-mode'>
                <div className='header'>
                    <Checkbox {...this.props} />

                    <div className='title' onClick={onSelectAllClick}>
                        {selectMode.all ? <span className='selected-all-badge'>{t.s('all')}</span> : selectMode.ids.length} {title}
                    </div>

                    <div className='space' />

                    <a className='button active' onClick={onImportantClick}>
                        <Icon name='like' />

                        <span className='hide-on-small-body'>
                            {_.capitalize(t.s('to')) + ' ' + t.s('favoriteSites').toLowerCase()}
                        </span>
                    </a>

					<a className='button active' onClick={onAddTagsClick}>
                        <Icon name='tag' />
                        
                        <span className='hide-on-small-body'>{t.s('addTags')}</span>
                    </a>

					<a className='button active' onClick={onRemoveClick}>
                        <Icon name='trash' />
                        
                        <span className='hide-on-small-body'>
                            {t.s('remove')}
                        </span>
                    </a>

                    <a className='button active' onClick={onOpenAllClick}>
                        <Icon name='open' />
                        
                        <span className='hide-on-small-body'>
                            {t.s('open')}
                        </span>
                    </a>

					<More {...this.props} />

                    <a href='' className='button default' onClick={onCancelSelectModeClick}>
                        <Icon name='close' />
                        <span className='hide-on-small-body'>{t.s('cancel')}</span>
                    </a>
                </div>
            </div>
        )
    }
}