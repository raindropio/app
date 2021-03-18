import React from 'react'
import t from '~t'
import Button from '~co/common/button'
import browser from '~target/extension/browser'
import { environment } from '~target'
import { Alert } from '~co/overlay/dialog'

export default class BookmarksAddPermission extends React.Component {
    static defaultProps = {
        onChange: undefined
    }

    onRequestClick = ()=>{
        browser.permissions
            .request({
                permissions: ['tabs'],
                ...(environment.includes('safari') ? {
                    origins: ['<all_urls>']
                } : {})
            })
            .then(this.props.onChange)
            .catch(e=>{
                Alert('Can`t set required permissions', {
                    variant: 'error',
                    description: `Fix: Click Raindrop.io extension button in browser toolbar, then click your profile picture and open Settings. In settings screen enable "${t.s('highlightSavedPages')}" checkbox.`
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