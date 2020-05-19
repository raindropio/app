import React from 'react'
import _ from 'lodash'
import t from '~t'
import Icon from '~co/common/icon'

export default class BookmarksHeaderSelectMode extends React.PureComponent {
    _allCheckbox = React.createRef()

    componentDidMount() {
        this.updateCheckbox()
    }

    componentDidUpdate(prev) {
        if (prev.selectMode.all != this.props.selectMode.all ||
            prev.selectMode.ids.length != this.props.selectMode.ids.length)
            this.updateCheckbox()
    }

    updateCheckbox = ()=>{
        const { all, ids } = this.props.selectMode
        this._allCheckbox.current.indeterminate = !all && ids.length != 0 ? true : undefined
    }

    onInputClick = ()=>
        this.props.onSelectAllClick()

    render() {
        const { selectMode, collection } = this.props
        const { onSelectAllClick, onCancelSelectModeClick, onImportantClick, onAddTagsClick, onRemoveClick, onMoreClick } = this.props

        let title = collection._id ? t.s('in') + ' ' + collection.title : ''

        return (
            <div className='elements-header select-mode'>
                <div className='header'>
                    <label className='button flat'>
                        <input 
                            ref={this._allCheckbox}
                            type='checkbox'
                            checked={selectMode.all}
                            onChange={this.onInputClick} />
                    </label>

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

					<a className='button active' onClick={onMoreClick}>
                        {t.s('more')}<Icon name='arrow'/>
                    </a>

                    <a href='' className='button default' onClick={onCancelSelectModeClick}>
                        <Icon name='close' />
                        <span className='hide-on-small-body'>{t.s('cancel')}</span>
                    </a>
                </div>
            </div>
        )
    }
}