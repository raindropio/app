import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '~data/actions/user'
import * as localActions from '~local/actions'
import { user } from '~data/selectors/user'

import Button from '~co/common/button'
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

    handlers = {
        onLogoutClick: ()=>
            this.props.userActions.logout(),

        onToggleDarkThemeClick: ()=>
            this.props.localActions.setTheme(this.props.theme == 'night' ? 'day' : 'night', false),

        onToggleLargeFontSizeClick: ()=>
            this.props.localActions.setAppSize(this.props.appSize == 'large' ? 'default' : 'large'),

        onMenuClose: ()=>
            this.setState({menu: false})
    }

    render() {
        const { user } = this.props
        const { menu } = this.state

        return (
            <>
                <Button ref={this.pin} onClick={this.onProfileClick}>
                    <Avatar src={user.email_MD5} size='40' />
                    <span>{user.fullName}</span>
                </Button>
                
                {menu && <Contextmenu pin={this.pin} {...this.props} {...this.handlers} />}
            </>
        )
    }
}

export default connect(
	(state)=>({
        user: user(state),
        theme: state.local.theme,
        appSize: state.local.appSize
	}),
	(dispatch)=>({
        userActions: bindActionCreators(userActions, dispatch),
        localActions: bindActionCreators(localActions, dispatch),
    })
)(SidebarProfile)