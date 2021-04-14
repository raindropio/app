import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { user } from '~data/selectors/user'
import { logout } from '~data/actions/user'

import { Link } from 'react-router-dom'
import { Header } from '~co/screen/basic'
import { Title, FirstAction, Space } from '~co/common/header'
import Icon, { Avatar } from '~co/common/icon'
import Button from '~co/common/button'

class SettingsHeader extends React.Component {
    render() {
        const { user: { name, avatar }, logout } = this.props

        return (
            <Header 
                data-solid>
                <FirstAction>
                    <Button 
                        as={Link} 
                        to='/'
                        title={t.s('back')}>
                        <Icon name='back' />
                    </Button>
                </FirstAction>

                <Space />

                <Title>
                    {t.s('settings')} &nbsp;·&nbsp; <Avatar src={avatar} /> {name}
                </Title>
                
                <Space />

                <Button 
                    title={t.s('logOut')}
                    onClick={logout}>
                    <Icon name='exit' />
                </Button>
            </Header>
        )
    }
}

export default connect(
	(state)=>({
        user: user(state)
    }),
    { logout }
)(SettingsHeader)