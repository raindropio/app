import React from 'react'
import t from '~t'
import { normalizeURL } from '~modules/format/url'
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
        //in safari readText works bad, so this line prevents run on safari
        try{
            await navigator.permissions.query({name: 'clipboard-read'})
        }catch(e) {
            return false
        }

        let text = ''
        try{
            text = await navigator.clipboard.readText()
        }catch(e){}

        if (isURL(text, { require_protocol: true }))
            this.setState({ link: text }, ()=>{
                this.textRef.current.select()
            })
    }
    
    onChange = (e)=>
        this.setState({ link: e.target.value })

    onSubmit = async(e)=>{
        e.preventDefault()
        e.stopPropagation()
        
        this.setState({ status: 'loading' })

        try{
            await this.props.onLink(normalizeURL(this.state.link, { defaultProtocol: 'https:' }))
            this.props.onClose()
        } catch (e) {
            await Alert(`${t.s('saveError')}\n${e.message}`)
            this.setState({ status: 'error' })
        }
    }

    render() {
        const { link, status='' } = this.state

        return (
            <form onSubmit={this.onSubmit}>
                <Layout>
                    <Label>URL</Label>

                    <Text
                        type='url'
                        inputMode='url'
                        ref={this.textRef}
                        required
                        className='field'
                        placeholder='https://'
                        value={link}
                        disabled={status=='loading'}
                        onChange={this.onChange}
                        autoFocus>
                        {status == 'loading' ? (
                            <Preloader />
                        ) : (
                            <Button
                                as='input'
                                type='submit'
                                variant='link'
                                hidden={!link}
                                value={t.s('save')} />
                        )}
                    </Text>
                </Layout>
            </form>
        )
    }
}