import t from '~t'
import React from 'react'

import { Link } from 'react-router-dom'
import Screen from '~co/screen/basic'
import Header, { Title } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Howto from './howto'
import Permissions, { usePermissionsGranted } from './permissions'

export default ()=>{
    const granted = usePermissionsGranted()

	return (
		<Screen>
            <Header data-no-shadow>
                <Button 
                    as={Link}
                    to='/'
                    title={t.s('back')}>
                    <Icon name='back' />
                </Button>
                <Title>{`${t.s('add')} ${t.s('highlights').toLowerCase()}`}</Title>
            </Header>
            
			{granted ? <Howto /> : <Permissions />}
		</Screen>
	)
}