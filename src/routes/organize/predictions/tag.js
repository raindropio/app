import s from './style.module.styl'
import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { patch } from '~data/actions/predictions'

import Button from '~co/common/button'
import RaindropsList from './raindrops-list'
import TagsField from '~co/tags/field'
import Icon from '~co/common/icon'

function Destination({ _id, tags }) {
    const dispatch = useDispatch()
    const [focused, setFocused] = useState(false)
    const onChange = useCallback(tags=>dispatch(patch({ _id, tags })), [dispatch])
    const onFocus = useCallback(e=>{ e.preventDefault(); setFocused(true) }, [setFocused])
    const onBlur = useCallback(e=>{ e.preventDefault(); setFocused(false) }, [setFocused])

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
                    Add <a className={s.destination} href='' onClick={onFocus}>
                        {tags.length ? tags.map(tag=>`#${tag}`).join(', ') : 'tags'}&nbsp;<Icon name='arrow' size='micro' />
                    </a>
                </>)}
            </h4>
            
            {tags.length ? (
                <Button variant='primary'>
                    &nbsp;Add tags&nbsp;
                </Button>
            ) : null}
        </header>
    )
}

export default function MyOrganizePredictionsTag({ prediction: { _id, tags, raindropRefs } }) {
    return (
        <div className={s.prediction}>
            <Destination _id={_id} tags={tags} />
            <RaindropsList raindropRefs={raindropRefs} />
        </div>
    )
}