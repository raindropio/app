import React from 'react'
import t from '~t'

import Preloader from '~co/common/preloader'
import Button, { ButtonsGroup } from '~co/common/button'

export default function BookmarkEditFormActionMain({ status, onRemove }) {
    switch(status){
        case 'saving':
        case 'loading':
            return (
                <Button>
                    <Preloader />
                </Button>
            )

        case 'loaded':
            return (
                <ButtonsGroup>
                    <Button 
                        variant='flat'
                        accent='danger'
                        onClick={onRemove}>
                        {t.s('remove')}
                    </Button>
                </ButtonsGroup>
            )

        case 'removed':
            return (
                <Button 
                    variant='link'
                    accent='danger'
                    onClick={onRemove}>
                    {t.s('remove')} {t.s('from')} {t.s('defaultCollection--99')}
                </Button>
            )

        case 'idle':
            return null

        default: //new|error|errorSaving
            return (
                <Button
                    as='input'
                    type='submit'
                    variant='primary'
                    value={t.s('save')} />
            )
    }
}