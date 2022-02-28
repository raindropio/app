import t from '~t'
import React from 'react'
import { Link } from 'react-router-dom'

import Header, { Title, Space } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function ExtensionHighlightsScreen({ count }) {
    return (
        <Header 
            data-no-shadow
            data-fancy>
            <Button
                as={Link}
                to='/'
                title={t.s('back')}>
                <Icon name='back' />
            </Button>

            <Title>{count ? `${count} ${t.s('highlights').toLowerCase()}` : t.s('highlights')}</Title>

            <Space />
            
            {count ? (
                <Button
                    as={Link}
                    to='/extension/highlights'
                    variant='link'>
                    <Icon name='add' />
                </Button>
            ) : null}
        </Header>
    )
}