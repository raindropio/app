import React from 'react'
import t from '~t'
import config from '~config'

import { Layout, Label } from '~co/common/form'
import Button from '~co/common/button'

export default class AccountExtension extends React.Component {
    componentDidMount() {
        window.addEventListener('focus', this.onWindowFocus)
    }

    componentWillUnmount() {
        window.removeEventListener('focus', this.onWindowFocus)
    }

    onWindowFocus = ()=>{
        this.props.history.replace('/')
    }

    render() {
        return (
            <>
                <Layout>
                    <Label>{t.s('startToSave')}</Label>
                    <div />
    
                    <Button
                        href={new URL('/account/signup', config.links.app.index).toString()}
                        target='_blank'
                        variant='primary'
                        data-block>
                        {t.s('register')}
                    </Button>

                    <Button
                        href={new URL('/account/login', config.links.app.index).toString()}
                        target='_blank'
                        variant='outline'
                        data-block>
                        {t.s('signIn')}
                    </Button>
                </Layout>
            </>
        )
    }
}