import React from 'react'
import t from '~t'

import Icon from '~co/common/icon'
import Preloader from '~co/common/preloader'

export default class CollectionsSelectMode extends React.Component {
    onSelectAll = ()=>
        this.props.actions.selectAll()

    onCancel = ()=>
        this.props.actions.unselectAll()

    onMergeSelected = ()=>{
        const { selectMode: { ids }, actions: { mergeSelected } } = this.props
        
        if (confirm(`${t.s('areYouSure')}\n${t.s('merge')} ${ids.length} ${t.s('collectionsCount')}`))
            mergeSelected()
    }

    onRemoveSelected = ()=>{
        const { selectMode: { ids }, actions: { removeSelected } } = this.props

        if (confirm(`${t.s('areYouSure')}\n${t.s('remove')} ${ids.length} ${t.s('collectionsCount')}`))
            removeSelected()
    }

    render() {
        const { selectMode: { enabled, ids, working } } = this.props
        
        if (!enabled)
            return null

        return (
            <div className='collections-select-mode'>
                { working ? (
                    <div className='collections-select-mode-header'>
                        <div className='title'>{t.s(working)} {ids.length} {t.s('collectionsCount')}...</div>
                        <Preloader data-size='small' />
                    </div>
                ) : (
                    <>
                        <div className='collections-select-mode-header'>
                            <div className='title'>{ids.length} {t.s('collectionsCount')}</div>

                            <a className='button min' onClick={this.onSelectAll}>{t.s('all')}</a>
                            &nbsp; &nbsp;
                            <a className='button min' onClick={this.onCancel}>{t.s('cancel')}</a>
                        </div>

                        <div className='collections-select-mode-actions'>
                            {ids.length > 1 ? (
                                <a className='button default active' onClick={this.onMergeSelected}>
                                    <Icon name='duplicates' />
                                    
                                    <span className='hide-on-small-body'>{t.s('merge')}</span>
                                </a>
                            ) : null}

                            <a className='button default active' onClick={this.onRemoveSelected}>
                                <Icon name='trash' />
                                
                                <span className='hide-on-small-body'>{t.s('remove')}</span>
                            </a>
                        </div>
                    </>
                )}
            </div>
        )
    }
}