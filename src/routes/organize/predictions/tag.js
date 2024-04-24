import s from './style.module.styl'
import t from '~t'
import React, { useState, useCallback, forwardRef } from 'react'

import Button from '~co/common/button'
import RaindropsList from './raindrops-list'
import TagsField from '~co/tags/field'
import Icon from '~co/common/icon'

function Destination({ prediction: { _id, tags }, onUpdate, onApply }) {
    const [focused, setFocused] = useState(false)
    const onChange = useCallback(tags=>onUpdate({ _id, tags }), [onUpdate])
    const onFocus = useCallback(e=>{ e.preventDefault(); setFocused(true) }, [setFocused])
    const onBlur = useCallback(e=>{ e.preventDefault(); setFocused(false) }, [setFocused])
    const onApplyClick = useCallback(()=>onApply(_id), [_id])

    return (
        <header>
            <h4>
                {focused ? (
                    <TagsField
                        autoFocus={focused}
                        className={s.field}
                        value={tags}
                        onChange={onChange}
                        onBlur={onBlur} />
                ) : (<>
                    {t.s('add')} <a className={s.destination} href='' onClick={onFocus}>
                        {tags.length ? tags.map(tag=>`#${tag}`).join(', ') : 'tags'}&nbsp;<Icon name='arrow' size='micro' />
                    </a>
                </>)}
            </h4>
            
            {tags.length ? (
                <Button as='button' variant='primary' data-shape='pill' onClick={onApplyClick}>
                    <Icon name='ai' size='micro' /> {t.s('add')}
                </Button>
            ) : null}
        </header>
    )
}

export default forwardRef(function MyOrganizePredictionsTag({ prediction, onUpdate, onApply }, ref) {
    return (
        <div ref={ref} className={s.prediction}>
            <Destination prediction={prediction} onUpdate={onUpdate} onApply={onApply} />
            <RaindropsList prediction={prediction} onUpdate={onUpdate} />
        </div>
    )
})