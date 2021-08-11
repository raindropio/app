import React from 'react'
import t from '~t'
import { Link } from 'react-router-dom'
import { target } from '~target'

import { Section, SectionTitle } from '~co/common/list'
import { Item, ItemIcon, ItemTitle, ItemLink } from '~co/common/list'
import Icon from '~co/common/icon'

export default class SettingsSidebarPages extends React.Component {
    pages = [
        ...(target == 'extension' ? [
            { to: '/extension', title: t.s('browserExtension'), icon: 'extension'}
        ] : []),
        { to: '/app', title: t.s('app'), icon: 'sidebar_alt'},
        { to: '/account', title: t.s('account'), icon: 'user' },
        { to: '/pro', title: t.s('subscription'), icon: 'diamond' },
        { to: '/import', title: t.s('import'), icon: 'import' },
        { to: '/integrations', title: t.s('integrations'), icon: 'integrations' },
        { to: '/backups', title: t.s('backups'), icon: 'export' },
    ]

    renderPage = ({ to, title, icon })=>{
        const { match: { path }, location: { pathname } } = this.props

        return (
            <Item 
                key={to}
                size='large'
                focusable
                active={new RegExp(`${to}($|/)`).test(pathname)}>
                <ItemIcon>
                    <Icon name={icon} />
                </ItemIcon>
                
                <ItemTitle>
                    {title}
                </ItemTitle>

                <ItemLink 
                    as={Link}
                    to={`${path}${to}`} />
            </Item>
        )
    }

    render() {
        return (<>
            <Section>
                <SectionTitle>{t.s('settings')}</SectionTitle>
            </Section>

            {this.pages.map(this.renderPage)}
        </>)
    }
}