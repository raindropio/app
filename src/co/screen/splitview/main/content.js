import s from './content.module.styl'
import React from 'react'

export default class SplitViewMainContent extends React.Component {
    render() {
        const { children, ...other } = this.props

        return (
            <div className={s.content} {...other}>
                {children}
            </div>
        )
    }
}