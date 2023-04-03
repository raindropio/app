import React, { useMemo } from 'react'
import t from '~t'
import { Link, useMatch, useLocation } from 'react-router-dom'
import { target } from '~target'

import { Section, SectionTitle } from '~co/common/list'
import { Item, ItemIcon, ItemTitle, ItemLink } from '~co/common/list'
import Icon from '~co/common/icon'

function PageItem({ to, title, icon, isActive }) {
    return (
        <Item 
            size='large'
            focusable
            active={isActive}>
            <ItemIcon>
                <Icon name={icon} />
            </ItemIcon>
            
            <ItemTitle>
                {title}
            </ItemTitle>

            <ItemLink 
                as={Link}
                to={to} />
        </Item>
    )
}

export default function PageSettingsSidebarPages() {
    const location = useLocation()
    const match = useMatch(location.pathname)
    const pages = useMemo(()=>(
        [
            ...(target == 'extension' ? [
                { to: 'extension', title: t.s('browserExtension'), icon: 'extension'}
            ] : []),
            { to: 'app', title: t.s('app'), icon: 'sidebar_alt'},
            { to: 'account', title: t.s('account'), icon: 'user' },
            { to: 'pro', title: t.s('subscription'), icon: 'diamond' },
            { to: 'import', title: t.s('import'), icon: 'import' },
            { to: 'integrations', title: t.s('integrations'), icon: 'integrations' },
            { to: 'backups', title: t.s('backups'), icon: 'export' },
            { to: 'tfa', title: '2FA', icon: 'lock' },
        ]
            .map(page=>({
                ...page,
                isActive: match.pathname.includes(page.to)
            }))
    ), [match.pathname])

    return (<>
        <Section>
            <SectionTitle>{t.s('settings')}</SectionTitle>
        </Section>

        {pages.map(page=>(
            <PageItem key={page.to} {...page} />
        ))}
    </>)
}