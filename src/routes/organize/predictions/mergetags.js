import s from './style.module.styl'
import t from '~t'
import React, { useCallback, forwardRef } from 'react'

import Button from '~co/common/button'
import Icon from '~co/common/icon'

function Destination({ _id, onApply }) {
    const onApplyClick = useCallback(()=>onApply(_id), [_id])

    return (
        <header>
            <h4>{t.s('merge')} {t.s('tags').toLocaleLowerCase()}</h4>
            
            <Button as='button' variant='primary' data-shape='pill' onClick={onApplyClick}>
                <Icon name='ai' size='micro' /> {t.s('merge')}
            </Button>
        </header>
    )
}

export default forwardRef(function MyOrganizePredictionsMergetags({ prediction: { _id, tags }, onApply }, ref) {
    return (
        <div ref={ref} className={s.prediction}>
            <Destination _id={_id} onApply={onApply} />

            <ul>
                {tags.map(([original, ...dups])=>(
                    <li key={original}>
                        Replace {dups.map(tag=><React.Fragment key={tag}><s>#{tag}</s>, </React.Fragment>)} with <b>#{original}</b>
                    </li>
                ))}
            </ul>
        </div>
    )
})