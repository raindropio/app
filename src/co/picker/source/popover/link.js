import React from 'react'
import t from '~t'
import normalizeUrl from 'normalize-url'

import { Layout, Label, Text } from '~co/common/form'
import { Alert } from '~co/overlay/dialog'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'

export default class PickerSourceLink extends React.Component {
    state = {
        link: '',
        status: ''
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
                        type='text'
                        required
                        className='field'
                        placeholder='https://'
                        value={link}
                        disabled={status=='loading'}
                        onChange={this.onLinkChange}
                        autoFocus
                        icon={status == 'loading' ? <Preloader /> : null}>
                        <Button
                            Tag='input'
                            type='submit'
                            variant='link'
                            hidden={!link}
                            disabled={status == 'loading'}
                            value={t.s('saveLink')} />
                    </Text>
                </Layout>
            </form>
        )
    }
}