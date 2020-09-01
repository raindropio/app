import React from 'react'
import t from '~t'
import { ShortDate } from '~modules/format/date'

import { Buttons } from '~co/common/form'
import Preloader from '~co/common/preloader'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default class BookmarkEditFormButtons extends React.Component {
    render() {
        const { unsaved, status, item: { created } } = this.props

        if (status == 'saving')
            return (
                <Buttons>
                    <Button data-block>
                        <Preloader />
                    </Button>
                </Buttons>
            )

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
    }
}