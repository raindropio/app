import t from '~t'
import React from 'react'
import { Link } from 'react-router-dom'

import Header, { Title, Space } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import ExportButton from '~co/highlights/export-button'

export default function ExtensionHighlightsScreen({ _id, count }) {
    return (
        <Header 
            data-no-shadow
            data-static>
            <Button
                as={Link}
                to='/'
                title={t.s('back')}>
                <Icon name='back' />
            </Button>

            <Title>{count ? `${count} ${t.s('highlights').toLowerCase()}` : t.s('highlights')}</Title>

            <Space />
            
            {count ? (<>
                <Button
                    as={Link}
                    to='/extension/highlights'
                    variant='link'
                    title={t.s('add')+' '+t.s('highlights').toLowerCase()}>
                    <Icon name='add' />
                </Button>

                <ExportButton _id={_id}>
                    <Icon name='download' />
                </ExportButton>
            </>) : null}
        </Header>
    )
}