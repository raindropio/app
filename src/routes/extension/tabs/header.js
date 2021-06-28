import React from 'react'
import t from '~t'
import { Link } from 'react-router-dom'

import Header, { Title } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function ExtensionTabsHeader() {
    return (
        <Header data-no-shadow data-static>
            <Button 
                as={Link}
                to='/'
                title={t.s('back')}>
                <Icon name='back' />
            </Button>

            <Title>
                {t.s('save')} {t.s('tabs').toLowerCase()}
            </Title>
        </Header>
    )
}