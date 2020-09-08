import React from 'react'
import t from '~t'
import { ShortDate } from '~modules/format/date'

import { Buttons } from '~co/common/form'
import Preloader from '~co/common/preloader'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default class BookmarkEditFormButtons extends React.Component {
    render() {
        const { status, item: { created, lastUpdate } } = this.props

        switch(status){
            case 'saving':
            case 'loading':
                return (
                    <Buttons>
                        <Button data-block>
                            <Preloader />
                        </Button>
                    </Buttons>
                )

            case 'loaded':
                return (
                    <Buttons>
                        <Button
                            disabled
                            data-block>
                            <Icon name='check_active' />
                            {t.s('addSuccess')} <ShortDate date={created} />
                        </Button>
        
                        <Button 
                            data-block
                            variant='link'
                            accent='danger'
                            onClick={this.props.onRemove}>
                            {t.s('remove')}
                        </Button>
                    </Buttons>
                )

            case 'removed':
                return (
                    <Buttons>
                        <Button
                            disabled
                            data-block>
                            <Icon name='check_active' />
                            {t.s('removeSuccess')} <ShortDate date={lastUpdate} />
                        </Button>
        
                        <Button 
                            data-block
                            variant='link'
                            accent='danger'
                            onClick={this.props.onRemove}>
                            {t.s('remove')} {t.s('from')} {t.s('defaultCollection--99')}
                        </Button>
                    </Buttons>
                )

            case 'idle':
                return null

            default: //new|error|errorSaving
                return (
                    <Buttons>
                        <Button
                            as='input'
                            type='submit'
                            variant='primary'
                            data-block
                            value={t.s('saveLink')} />
                    </Buttons>
                )
        }
    }
}