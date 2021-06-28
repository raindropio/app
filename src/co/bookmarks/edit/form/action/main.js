import React from 'react'
import t from '~t'
import { ShortDate } from '~modules/format/date'

import Preloader from '~co/common/preloader'
import Button, { ButtonsGroup } from '~co/common/button'
import Icon from '~co/common/icon'

export default function BookmarkEditFormActionMain({ status, item: { created }, onRemove }) {
    switch(status){
        case 'saving':
        case 'loading':
            return (
                <Button data-block>
                    <Preloader />
                </Button>
            )

        case 'loaded':
            return (
                <ButtonsGroup>
                    <Button 
                        data-block
                        variant='link'
                        accent='danger'
                        onClick={onRemove}>
                        {t.s('remove')}
                    </Button>

                    <Button
                        disabled
                        data-block>
                        <Icon name='check_active' />
                        <ShortDate date={created} />
                    </Button>
                </ButtonsGroup>
            )

        case 'removed':
            return (
                <Button 
                    data-block
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
                    data-block
                    value={t.s('save')} />
            )
    }
}