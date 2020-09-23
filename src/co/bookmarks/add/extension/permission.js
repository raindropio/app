import React from 'react'
import Button from '~co/common/button'
import browser from '~target/extension/browser'
import { Error } from '~co/overlay/dialog'

export default class BookmarksAddPermission extends React.Component {
    static defaultProps = {
        onChange: undefined
    }

    onRequestClick = ()=>{
        browser.permissions
            .request({
                permissions: ['tabs']
            })
            .then(this.props.onChange)
            .catch(Error)
    }

    render() {
        return (
            <Button 
                variant='link'
                accent='danger'
                onClick={this.onRequestClick}>
                ⚠️
            </Button>
        )
    }
}