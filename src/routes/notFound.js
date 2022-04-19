import React from 'react'
import t from '~t'
import { Link } from 'react-router-dom'
import Screen from '~co/screen/basic'
import Icon from '~co/common/icon'
import Button from '~co/common/button'

export default function NotFound() {
    return (
        <Screen style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Icon 
                name='broken' 
                enlarge='3'
                style={{color: 'var(--accent-color)'}} />
            <h2>{t.s('nothingFound')}</h2>

            <Button
                as={Link}
                to='/'
                variant='outline'>
                {t.s('goHome')}
            </Button>
        </Screen>
    )
}