import s from './index.module.css'
import React from 'react'
import { connect } from 'react-redux'
import { setTheme } from '~local/actions'

import Dialog from '~co/overlay/dialog'

class ScreenBasic extends React.Component {
    componentDidMount() {
        this._darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        this.onPrefersColorSchemeChange(this._darkModeMediaQuery)
        this._darkModeMediaQuery.addListener(this.onPrefersColorSchemeChange)
    }

    componentWillUnmount() {
        this._darkModeMediaQuery && this._darkModeMediaQuery.removeListener(this.onPrefersColorSchemeChange)
    }

    onPrefersColorSchemeChange = e => {
        const theme = e.matches ? 'night' : 'day'

        if (this.props.autoTheme || this.props.theme == theme)
            this.props.setTheme(theme)
    }

    render() {
        const { className, children, theme, appSize, autoTheme, setTheme, ...etc } = this.props
        
        return (
            <div 
                {...etc} 
                className={s.page + ' ' + className}
                data-theme={theme}
                data-app-size={appSize}>
                {children}

                <Dialog />
            </div>
        )
    }
}

export default connect(
    (state, { appSize })=>({
        theme: state.local.theme,
        autoTheme: state.local.autoTheme,
        appSize: appSize || state.local.appSize,
    }),
    {
        setTheme
    }
)(ScreenBasic)