import React from 'react'
import { currentTab } from '~target'
import browser from '~target/extension/browser'

import Button from './button'
import Permission from './permission'

export default class BookmarksAdd extends React.Component {
    static defaultProps = {
        //...same as ../index
    }

    state = {
        current: {}
    }

    componentDidMount() {
        this.reload()

        browser.tabs.onUpdated.addListener(this.onTabUpdated)
        browser.tabs.onActivated.addListener(this.reload)
    }

    componentWillUnmount() {
        browser.tabs.onUpdated.removeListener(this.onTabUpdated)
        browser.tabs.onActivated.removeListener(this.reload)
    }

    onTabUpdated = (id, { status })=>{
        if (status == 'complete')
            this.reload()
    }

    reload = async()=>{
        const { url, title } = await currentTab()

        this.setState({
            current: {
                url, title
            }
        })
    }

    render() {
        if (!this.state.current.url)
            return <Permission onChange={this.reload} />

        return (
            <Button {...this.props} {...this.state} />
        )
    }
}