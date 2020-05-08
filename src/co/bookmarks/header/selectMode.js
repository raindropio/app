import React from 'react'
import _ from 'lodash'
import t from '~t'
import Icon from '~co/common/icon'

export default class BookmarksHeaderSelectMode extends React.PureComponent {
    render() {
        const { selectMode } = this.props
        const { onSelectAllClick, onCancelSelectModeClick, onImportantClick, onAddTagsClick, onRemoveClick, onMoreClick } = this.props

        return (
            <div className='elements-header select-mode'>
                <div className='header'>
                    <a href='' className='button active' onClick={onSelectAllClick}>
                        <Icon name='select_all' />
                        <span className='hide-on-small-body'>{t.s('selectAll')}</span>
                    </a>

                    <div className='title'>
                        {selectMode.ids.length} {t.s('elements')}
                    </div>

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

					<a className='button active' onClick={onMoreClick}>
                        {t.s('more')}<Icon name='arrow'/>
                    </a>

                    <a href='' className='button default' onClick={onCancelSelectModeClick}>
                        <Icon name='close' />
                    </a>
                </div>
            </div>
        )
    }
}