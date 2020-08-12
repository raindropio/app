import s from './tabs.module.styl'
import React from 'react'
import t from '~t'
import { Link } from 'react-router-dom'

import Header from '~co/common/header'
import Button from '~co/common/button'

export default class SettingsHeader extends React.Component {
    tabs = [
        { to: '/app', title: t.s('basic') },
        { to: '/profile', title: t.s('profile') },
        { to: '/pro', title: t.s('subscription') },
        { to: '/import', title: t.s('importBookmarks') },
        { to: '/backups', title: t.s('backups') },
        { to: '/integrations', title: t.s('integrations') },
        { to: '/help', title: t.s('help') },
    ]

    renderTab = ({ to, title })=>{
        const { match: { path }, location: { pathname } } = this.props

        return (
            <Button 
                key={to}
                as={Link}
                to={`${path}${to}`}
                variant={new RegExp(`${to}($|/)`).test(pathname) ? 'active' : ''}>
                {title}
            </Button>
        )
    }

    render() {
        return (
            <>
                <Header data-fancy>
                    <div className={s.tabs}>
                        {this.tabs.map(this.renderTab)}
                    </div>
                </Header>
            </>
        )
    }
}