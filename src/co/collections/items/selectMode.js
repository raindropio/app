import s from './selectMode.module.styl'
import React from 'react'
import t from '~t'

import Button from '~co/common/button'
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
            <div className={s.wrap}>
                <div className={s.mode}>
                    { working ? (
                        <div className={s.header}>
                            <div className={s.title}>{t.s(working)} {ids.length} {t.s('collectionsCount')}...</div>
                            <Preloader />
                        </div>
                    ) : (
                        <>
                            <div className={s.header}>
                                <div className={s.title}>{ids.length} {t.s('collectionsCount')}</div>

                                <Button onClick={this.onSelectAll}>{t.s('all')}</Button>
                                &nbsp; &nbsp;
                                <Button onClick={this.onCancel}>{t.s('cancel')}</Button>
                            </div>

                            <div className={s.actions}>
                                {ids.length > 1 ? (
                                    <Button variant='link' onClick={this.onMergeSelected}>
                                        <Icon name='duplicates' />
                                        
                                        <span className='hide-on-small-body'>{t.s('merge')}</span>
                                    </Button>
                                ) : null}

                                <Button variant='link' onClick={this.onRemoveSelected}>
                                    <Icon name='trash' />
                                    
                                    <span className='hide-on-small-body'>{t.s('remove')}</span>
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        )
    }
}