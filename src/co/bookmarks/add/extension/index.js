import React from 'react'
import { currentTab } from '~target'
import Button from './button'

export default class BookmarksAdd extends React.Component {
    static defaultProps = {
        //...same as ../index
    }

    state = {
        current: {}
    }

    async componentDidMount() {
        const { url, title } = await currentTab()

        this.setState({
            current: {
                url, title
            }
        })
    }

    render() {
        return (
            <Button {...this.props} {...this.state} />
        )
    }
}