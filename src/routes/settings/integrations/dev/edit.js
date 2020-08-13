import s from './edit.module.styl'
import React from 'react'
import t from '~t'
import config from '~config'
import { connect } from 'react-redux'
import { clientUpdate, clientResetToken, clientTestTokenCreate, clientTestTokenLoad, clientRevoke } from '~data/actions/oauth'
import { makeClient, getTestToken } from '~data/selectors/oauth'

import { Layout, Label, Text, Buttons, Title, Separator } from '~co/common/form'
import Modal, { Header, Content } from '~co/overlay/modal'
import { Error, Confirm } from '~co/overlay/dialog'
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

    componentDidMount() {
        this.props.clientTestTokenLoad(this.props._id)
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

    onResetSecretClick = async(e)=>{
        e.preventDefault()

        if (await Confirm(t.s('areYouSure')))
            this.props.clientResetToken(this.props._id, ()=>{}, Error)
    }

    onCreateTestTokenClick = async(e)=>{
        e.preventDefault()

        if (await Confirm(t.s('areYouSure')))
            this.props.clientTestTokenCreate(this.props._id, ()=>{}, Error)
    }

    onRevokeAllTokensClick = async(e)=>{
        e.preventDefault()

        if (await Confirm(t.s('areYouSure')))
            this.props.clientRevoke(this.props._id, ()=>{}, Error)
    }

    render() {
        const { testToken, onClose } = this.props
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
                            <div>
                                <Text 
                                    readOnly
                                    variant='less'
                                    value={secret} />

                                <a href='' onClick={this.onResetSecretClick}>
                                    Reset secret
                                </a>
                            </div>

                            <Label>Test token</Label>
                            <div>
                                {testToken && (
                                    <Text 
                                        readOnly
                                        variant='less'
                                        value={testToken} />
                                )}

                                <a href='' onClick={this.onCreateTestTokenClick}>
                                    {testToken ? 'Reset' : 'Create'} test token
                                </a>

                                <br /><br />

                                <a href={config.links.dev.token} target='_blank'>
                                    {t.s('howToUse')}
                                </a>
                            </div>

                            <Buttons>
                                <Button
                                    variant='outline'
                                    onClick={this.onRevokeAllTokensClick}>
                                    Revoke all user tokens
                                </Button>
                            </Buttons>
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
            _client: getClient(state, _id),
            testToken: getTestToken(state, _id)
        })
    },
    { clientUpdate, clientResetToken, clientTestTokenCreate, clientTestTokenLoad, clientRevoke }
)(DevEdit)