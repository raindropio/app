import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import sessionStorage from '~modules/sessionStorage'

export default function PageMyItemDefault({ tabs }) {
    const last_tab = sessionStorage.getItem('my-item-last-tab')
    const { raindrops_click } = useSelector(state=>state.config)
    const tab = last_tab || raindrops_click

    return (
        <Navigate 
            to={tabs.includes(tab) ? tab : tabs[0]}
            replace />
    )
}