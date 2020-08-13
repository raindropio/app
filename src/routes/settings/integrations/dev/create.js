import React from 'react'
import t from '~t'
import config from '~config'
import { connect } from 'react-redux'
import { clientCreate } from '~data/actions/oauth'

import { Layout, Label, Text, Checkbox, Buttons } from '~co/common/form'
import { Item, ItemIcon, ItemTitle } from '~co/common/list'
import Icon from '~co/common/icon'
import Modal, { Header, Content } from '~co/overlay/modal'
import { Error } from '~co/overlay/dialog'
import Button from '~co/common/button'

class DevCreate extends React.Component {
    state = {
        show: false,
        name: '',
        loading: false
    }

    title = t.s('create')+' '+t.s('newString').toLowerCase()+' '+t.s('app').toLowerCase()

    onNameChange = (e)=>
        this.setState({ name: e.target.value })

    onSubmit = (e)=>{
        e.preventDefault()
        this.setState({ loading: true })

        this.props.clientCreate(
            { name: this.state.name },
            ({ _id })=>{
                this.setState({ loading: false, show: false })
            },
            e => {
                this.setState({ loading: false })
                Error(e)
            }
        )
    }

    onShowClick = (e)=>{
        e.preventDefault()
        this.setState({ show: true })
    }

    onCloseClick = ()=>
        this.setState({ show: false })

    render() {
        const { show, name, loading } = this.state

        return (
            <>
                <Item
                    as='a'
                    href=''
                    onClick={this.onShowClick}>
                    <ItemIcon><Icon name='add' /></ItemIcon>
                    <ItemTitle>{this.title}</ItemTitle>
                </Item>

                {show && (
                    <Modal
                        onClose={this.onCloseClick}>
                        <Header title={this.title} />

                        <Content>
                            <form onSubmit={this.onSubmit}>
                                <Layout>
                                    <Label>{t.s('name')}</Label>
                                    <Text 
                                        autoFocus
                                        required
                                        disabled={loading}
                                        value={name}
                                        onChange={this.onNameChange} />

                                    <Checkbox 
                                        required
                                        disabled={loading}>
                                        I accept the <a href={config.links.dev.terms} target='_blank'>Raindrop.io API Terms & Guidelines</a>
                                    </Checkbox>

                                    <Buttons>
                                        <Button
                                            as='input'
                                            type='submit'
                                            variant='primary'
                                            disabled={loading}
                                            value={t.s('create')} />
                                    </Buttons>
                                </Layout>
                            </form>
                        </Content>
                    </Modal>
                )}
            </>
        )
    }
}

export default connect(
    undefined,
    { clientCreate }
)(DevCreate)