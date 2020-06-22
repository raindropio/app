import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '~data/actions/user'
import { user } from '~data/selectors/user'

import Avatar from '~co/common/avatar'
import Contextmenu from './contextmenu'

class SidebarProfile extends React.PureComponent {
    state = {
        menu: false
    }

    pin = React.createRef()

    onProfileClick = (e)=>{
        e.preventDefault()
        this.setState({menu: true})
    }

    onMenuClose = ()=>
        this.setState({menu: false})

    render() {
        const { user } = this.props
        const { menu } = this.state

        return (
            <>
                <a ref={this.pin} className='button min' style={{flex:1}} onClick={this.onProfileClick}>
                    <Avatar src={user.email_MD5} size='40' />
                    <span>{user.fullName}</span>
                </a>
                
                {menu && <Contextmenu pin={this.pin} {...this.props} onMenuClose={this.onMenuClose} />}
            </>
        )
    }
}

export default connect(
	(state)=>({
		user: user(state),
	}),
	(dispatch)=>({
		actions: bindActionCreators(userActions, dispatch)
    })
)(SidebarProfile)