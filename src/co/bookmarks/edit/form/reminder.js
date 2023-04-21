import React, { useCallback, useMemo } from 'react'
import t from '~t'
import { add, nextSunday } from 'date-fns'

import { DateTime } from '~co/common/form'
import { More, Menu, MenuItem } from '~co/overlay/popover'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

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
            onClick={()=>onSetDate(templates[0][1])}>
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

export default function BookmarkEditFormReminder({ item: { reminder }, onChange, onSave }) {
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

    return reminder.date ? (<>
        <DateTime 
            left={<Icon name='reminder' style={{color: 'var(--accent-color)'}} />}
            right={(
                <Button onClick={onDisable} size='small'>
                    <Icon name='close' size='micro' />
                </Button>
            )}
            value={reminder.date}
            onChange={onChangeDate}
            onBlur={onSave} />
    </>) : (
        <Templates onSetDate={onSetDate} />
    )
}