import React from 'react'
import t from '~t'
import normalizeUrl from 'normalize-url'
import isURL from 'validator/es/lib/isURL'

import { Layout, Label, Text } from '~co/common/form'
import { Alert } from '~co/overlay/dialog'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'

export default class PickerSourceLink extends React.Component {
    state = {
        link: '',
        status: ''
    }

    textRef = React.createRef()

    async componentDidMount() {
        const text = await navigator.clipboard.readText()

        if (isURL(text, { require_host: false }))
            this.setState({ link: text }, ()=>{
                this.textRef.current.select()
            })
    }
    
    onLinkChange = (e)=>
        this.setState({ link: e.target.value })

    onLinkSubmit = async(e)=>{
        e.preventDefault()
        
        this.setState({ status: 'loading' })

        try{
            await this.props.onLink(normalizeUrl(this.state.link, { defaultProtocol: 'https:' }))
            this.props.onClose()
        } catch (e) {
            await Alert(`${t.s('saveError')}\n${e.message}`)
            this.setState({ status: 'error' })
        }
    }

    render() {
        const { link, status='' } = this.state

        return (
            <form onSubmit={this.onLinkSubmit}>
                <Layout>
                    <Label>URL</Label>

                    <Text
                        ref={this.textRef}
                        required
                        autoSize
                        className='field'
                        placeholder='https://'
                        value={link}
                        disabled={status=='loading'}
                        onChange={this.onLinkChange}
                        autoFocus>
                        {status == 'loading' ? (
                            <Preloader />
                        ) : (
                            <Button
                                as='input'
                                type='submit'
                                variant='link'
                                hidden={!link}
                                value={t.s('saveLink')} />
                        )}
                    </Text>
                </Layout>
            </form>
        )
    }
}