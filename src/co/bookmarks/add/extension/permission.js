import React from 'react'
import Button from '~co/common/button'
import browser from '~target/extension/browser'
import { Alert } from '~co/overlay/dialog'

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
            .catch(e=>{
                Alert('Can`t set required permissions', {
                    variant: 'error',
                    description: 'Try to click on our extension (button on browser toolbar), then click your profile name and open Settings. Then enable "All tabs" access.'
                })
            })
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