import React from 'react'
import { Switch as RouterSwitch, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

export function Switch(props) {
    const location = useLocation()

    return (
        <AnimatePresence initial={false}>
            <RouterSwitch 
                {...props}
                location={location}
                key={location.pathname} />
        </AnimatePresence>
    )
}