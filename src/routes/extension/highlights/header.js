import t from '~t'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Header, { Title, Space } from '~co/common/header'
import Modal, * as Modals from '~co/overlay/modal'
import Empty from './empty'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function ExtensionHighlightsScreen({ count }) {
    const [add, setAdd] = useState(false)

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
            
            {count ? (<>
                <Button variant='link' onClick={()=>setAdd(true)}>
                    <Icon name='add' />
                </Button>

                {add ? (
                    <Modal onClose={()=>setAdd(false)}>
                        <Modals.Header title={t.s('add')} data-no-shadow />
                        <Empty/>
                    </Modal>
                ) : null}
            </>) : null}
        </Header>
    )
}