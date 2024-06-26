import s from './style.module.styl'
import t from '~t'
import React, { useCallback, forwardRef } from 'react'

import Button from '~co/common/button'
import Icon from '~co/common/icon'

function Destination({ _id, status, onApply }) {
    const onApplyClick = useCallback(()=>onApply(_id), [_id])

    return (
        <header>
            <h4>{t.s('merge')} {t.s('tags').toLocaleLowerCase()}</h4>
            
            {status == 'success' ? (
                <Button disabled variant='active'>{t.s('done')}</Button>
            ) : (
                <Button
                    disabled={status ? true : false}
                    as='button' variant='primary' data-shape='pill' onClick={onApplyClick}>
                    <Icon name='ai' size='micro' /> {t.s('merge')}
                </Button>
            )}
        </header>
    )
}

export default forwardRef(function MySuggestionsPredictionsMergetags({ prediction: { _id, tags }, status, onUpdate, onApply }, ref) {
    //events
    const onRemoveClick = useCallback(e=>{
        e.preventDefault()
        const index = parseInt(e.currentTarget.getAttribute('data-index'))
        onUpdate({
            _id,
            tags: tags.filter((_,i)=>i != index)
        })
    }, [onUpdate, _id, tags])

    if (!tags.length)
        return null

    return (
        <div ref={ref} className={s.prediction} data-status={status}>
            <Destination _id={_id} status={status} onApply={onApply} />

            <ul>
                {tags.map(([original, ...dups], index)=>(
                    <li key={original}>
                        <span>
                            Replace {dups.map(tag=><React.Fragment key={tag}><s>#{tag}</s>, </React.Fragment>)} with <b>#{original}</b>
                        </span>
                        &nbsp;
                        <a href='' data-index={index} onClick={onRemoveClick}><Icon name='close' size='micro' /></a>
                    </li>
                ))}
            </ul>
        </div>
    )
})