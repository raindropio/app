import s from './prompt.module.styl'
import React from 'react'
import t from '~t'
import Modal, { Header } from '~co/overlay/modal'
import Button from '~co/common/button'
import { Layout, Text } from '~co/common/form'

export default class DialogPromptView extends React.PureComponent {
    state = {
        value: (this.props.value||'') + ''
    }

    onFieldChange = e =>
        this.setState({ value: e.target.value })

    onSubmit = e => {
        e.preventDefault()
        e.stopPropagation()
        this.props.sendResult(this.props.id, this.state.value)
    }

    onCancel = () => {
        this.props.sendResult(this.props.id, '')
    }

    render() {
        const { message } = this.props
        const { value } = this.state

        return (
            <Modal 
                className={s.prompt}
                important={true}
                onClose={this.onCancel}>
                <Header 
                    title={message}
                    data-no-shadow />
    
                <form onSubmit={this.onSubmit}>
                    <Layout>
                        <Text 
                            autoFocus
                            selectAll
                            autoSize
                            value={value}
                            onChange={this.onFieldChange} />

                        <Button 
                            data-block
                            as='input'
                            type='submit'
                            variant='primary'
                            value='OK' />

                        <Button 
                            data-block
                            variant='outline'
                            onClick={this.onCancel}>
                            {t.s('cancel')}
                        </Button>
                    </Layout>
                </form>
            </Modal>
        )
    }
}