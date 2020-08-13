import s from './edit.module.styl'
import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { clientUpdate } from '~data/actions/oauth'
import { makeClient } from '~data/selectors/oauth'

import { Layout, Label, Text, Buttons, Title, Separator } from '~co/common/form'
import Modal, { Header, Content } from '~co/overlay/modal'
import { Error } from '~co/overlay/dialog'
import Button from '~co/common/button'

class DevEdit extends React.Component {
    static defaultProps = {
        _id: 0,
        onClose: undefined
    }

    state = {
        loading: false,
        unsaved: false,
        client: this.props._client
    }

    componentDidUpdate(prev) {
        if (prev._client != this.props._client)
            this.setState({ client: this.props._client })
    }

    onTextChange = e=>{
        const key = e.currentTarget.name
        const val = e.currentTarget.value

        this.setState({
            unsaved: true,
            client: {
                ...this.state.client,
                ...(Array.isArray(this.state.client[key]) ? {
                    [key]: [val]
                } : {
                    [key]: val
                })
            }
        })
    }

    onSubmit = (e)=>{
        e.preventDefault()
        this.setState({ loading: true })

        this.props.clientUpdate(
            this.props._id,
            this.state.client,
            ()=>{
                this.setState({ loading: false, unsaved: false })
            },
            e => {
                this.setState({ loading: false })
                Error(e)
            }
        )
    }

    render() {
        const { onClose } = this.props
        const { loading, unsaved, client: { _id, name, description, site, redirects: [redirect=''], secret } } = this.state

        return (
            <Modal 
                className={s.edit}
                onClose={onClose}>
                <Header title={t.s('app')} />

                <Content>
                    <form onSubmit={this.onSubmit}>
                        <Layout type='grid'>
                            <Label>{t.s('name')}</Label>
                            <Text 
                                autoFocus
                                required
                                disabled={loading}
                                value={name}
                                name='name'
                                onChange={this.onTextChange} />

                            <Label>{t.s('description')}</Label>
                            <Text 
                                required
                                autoSize
                                disabled={loading}
                                value={description}
                                name='description'
                                onChange={this.onTextChange} />

                            <Label>{t.s('site')}</Label>
                            <Text 
                                required
                                autoSize
                                disabled={loading}
                                value={site}
                                name='site'
                                onChange={this.onTextChange} />

                            <Label>Redirect URI</Label>
                            <Text 
                                required
                                autoSize
                                disabled={loading}
                                value={redirect}
                                name='redirects'
                                onChange={this.onTextChange} />

                            {unsaved && (
                                <Buttons>
                                    <Button
                                        as='input'
                                        type='submit'
                                        variant='primary'
                                        disabled={loading}
                                        value={t.s('save')} />
                                </Buttons>
                            )}

                            <Separator />

                            <Title>Credentials</Title>

                            <Label>Client ID</Label>
                            <Text 
                                readOnly
                                variant='less'
                                value={_id} />

                            <Label>Client secret</Label>
                            <Text 
                                readOnly
                                variant='less'
                                value={secret} />

                            <Label>Test token</Label>
                            <Text 
                                readOnly
                                variant='less'
                                value={secret} />
                        </Layout>
                    </form>
                </Content>
            </Modal>
        )
    }
}

export default connect(
    ()=>{
        const getClient = makeClient()

        return (state, { _id })=>({
            _client: getClient(state, _id)
        })
    },
    { clientUpdate }
)(DevEdit)