import React from 'react'
import t from '~t'

import Icon from '~co/common/icon'

export default class CollectionsSelectMode extends React.Component {
    onSelectAll = ()=>
        this.props.actions.selectAll()

    onCancel = ()=>
        this.props.actions.unselectAll()

    onMergeSelected = ()=>{

    }

    onRemoveSelected = ()=>{
        const { selectMode: { ids } } = this.props
        confirm(`${t.s('areYouSure')}
        ${t.s('remove')} ${ids.length} ${t.s('collectionsCount')} + ${t.s('all').toLowerCase()} ${t.s('nestedCollections').toLowerCase()}`)
    }

    render() {
        const { selectMode: { enabled, ids } } = this.props
        
        if (!enabled)
            return null

        return (
            <div className='collections-select-mode'>
                <div className='collections-select-mode-header'>
                    <div className='title'>{ids.length} {t.s('collectionsCount')}</div>

                    <a className='button min' onClick={this.onSelectAll}>{t.s('all')}</a>
                    &nbsp; &nbsp;
                    <a className='button min' onClick={this.onCancel}>{t.s('cancel')}</a>
                </div>

                <div className='collections-select-mode-actions'>
                    <a className='button default active' onClick={this.onMergeSelected}>
                        <Icon name='duplicates' />
                        
                        <span className='hide-on-small-body'>{t.s('merge')}</span>
                    </a>

                    <a className='button default active' onClick={this.onRemoveSelected}>
                        <Icon name='trash' />
                        
                        <span className='hide-on-small-body'>{t.s('remove')}</span>
                    </a>
                </div>
            </div>
        )
    }
}