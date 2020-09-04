import s from './index.module.styl'
import React from 'react'
import { connect } from 'react-redux'
import { user } from '~data/selectors/user'

import Button from '~co/common/button'
import Avatar from '~co/common/avatar'
import Contextmenu from '~co/user/profile'
import Icon from '~co/common/icon'

class SidebarProfile extends React.PureComponent {
    state = {
        menu: false
    }

    pin = React.createRef()

    onProfileClick = (e)=>{
        e.preventDefault()
        this.setState({menu: true})
    }

    onProfileClose = ()=>
        this.setState({menu: false})

    render() {
        const { user } = this.props
        const { menu } = this.state

        return (
            <>
                <Button 
                    ref={this.pin} 
                    id={s.button}
                    onClick={this.onProfileClick}>
                    <Avatar src={user.email_MD5} size='40' />
                    <span>{user.fullName}</span>
                    <Icon name='arrow' size='micro' />
                </Button>
                
                {menu && <Contextmenu pin={this.pin} onClose={this.onProfileClose} />}
            </>
        )
    }
}

export default connect(
	(state)=>({
        user: user(state)
	})
)(SidebarProfile)