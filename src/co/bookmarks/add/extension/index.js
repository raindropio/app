import React from 'react'
import { currentTab, getMeta } from '~target'
import browser from '~target/extension/browser'

import Button from './button'
import Permission from './permission'

export default class BookmarksAdd extends React.Component {
    static defaultProps = {
        //...same as ../index
    }

    state = {
        loading: true,
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
        this.setState({ loading: true })

        const tab = await currentTab()
        const { url, title } = tab
        const meta = await getMeta(tab)

        this.setState({
            loading: false,
            current: {
                link: url,
                title,
                ...meta
            }
        })
    }

    render() {
        if (!this.state.loading &&
            !this.state.current.link)
            return <Permission onChange={this.reload} />

        return (
            <Button {...this.props} {...this.state} />
        )
    }
}