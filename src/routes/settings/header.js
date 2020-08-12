import React from 'react'
import t from '~t'
import { Link } from 'react-router-dom'

import Header, { Title, FirstAction } from '~co/common/header'
import Icon from '~co/common/icon'
import Button from '~co/common/button'

export default class SettingsHeader extends React.Component {
    render() {
        return (
            <Header 
                data-solid>
                <FirstAction>
                    <Button as={Link} to='/'><Icon name='back' /></Button>
                </FirstAction>

                <Title>{t.s('settings')}</Title>
            </Header>
        )
    }
}