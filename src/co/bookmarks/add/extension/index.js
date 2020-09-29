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

        const { url, title } = await currentTab()

        this.setState({
            loading: false,
            current: {
                url, title
            }
        })
    }

    render() {
        if (!this.state.loading &&
            !this.state.current.url)
            return <Permission onChange={this.reload} />

        return (
            <Button {...this.props} {...this.state} />
        )
    }
}