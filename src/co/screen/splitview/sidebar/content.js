import s from './content.module.styl'
import React from 'react'

export default class SplitViewSidebarContent extends React.Component {
    render() {
        return (
            <div className={s.content}>
                {this.props.children}
            </div>
        )
    }
}