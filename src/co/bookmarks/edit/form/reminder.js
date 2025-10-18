import React, { useCallback, useMemo, useState } from 'react'
import t from '~t'
import { add, nextSunday } from 'date-fns'
import { useSelector } from 'react-redux'
import { isPro } from '~data/selectors/user'

import { DateTime } from '~co/common/form'
import { More, Menu, MenuItem } from '~co/overlay/popover'
import Icon from '~co/common/icon'
import Button from '~co/common/button'
import UserUpgrade from '~co/user/upgrade'

function Templates({ onSetDate }) {
    const templates = useMemo(()=>[
        ['Tomorrow', add(new Date(), { days: 1 })],
        ['This weekend', nextSunday(new Date())],
        ['Next week', add(new Date(), { weeks: 1 })],
        ['Random date', add(new Date(), { days: Math.floor(Math.random() * 365) })]
    ], [])

    return (
        <More 
            variant='outline' 
            content={<Icon name='reminder_add' />}
            title={t.s('add') + ' ' + t.s('reminder').toLowerCase()}
            onClick={()=>onSetDate(new Date())}>
            <Menu>
                {templates.map(([title, date])=>
                    <MenuItem 
                        key={title} 
                        onClick={()=>onSetDate(date)}>
                        {title}
                    </MenuItem>
                )}
            </Menu>
        </More>
    )
}

function Free() {
    const [show, setShow] = useState(false)
    const onClick = useCallback((e)=>{
        e.preventDefault()
        setShow(true)
    }, [setShow])

    return (
        <>
            <Button onClick={onClick} variant='outline' title={t.s('add') + ' ' + t.s('reminder').toLowerCase()}>
                <Icon name='reminder' />
            </Button>

            {show ? <UserUpgrade onClose={()=>setShow(false)} /> : null}
        </>
    )
}

export default function BookmarkEditFormReminder({ item: { reminder }, onChange, onSave }) {
    const pro = useSelector(state=>isPro(state))
    const minDate = useMemo(()=>new Date(), [])

    const onChangeDate = useCallback(date=>{
        onChange({ reminder: { date } })
    }, [onChange])

    const onSetDate = useCallback((date)=>{
        onChangeDate(date)
        onSave()
    }, [onChangeDate, onSave])

    const onDisable = useCallback(()=>{
        onChangeDate(undefined)
        onSave()
    }, [onChangeDate, onSave])


    if (!pro)
        return <Free />

    return reminder.date ? (<>
        <DateTime 
            left={<Icon name='reminder' style={{color: 'var(--accent-color)'}} />}
            right={(
                <Button onClick={onDisable} size='small'>
                    <Icon name='close' size='micro' />
                </Button>
            )}
            min={minDate}
            value={reminder.date}
            onChange={onChangeDate}
            onBlur={onSave} />
    </>) : (
        <Templates onSetDate={onSetDate} />
    )
}