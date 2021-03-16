import s from './index.module.styl'
import React from 'react'
import t from '~t'
import Modal, { Header, Content } from '~co/overlay/modal'
import { Layout, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Field from '~co/tags/field'

export default class PicketTagsModal extends React.Component {
    static defaultProps = {
        //...same as ../field
        onSubmit: undefined,
        onClose: undefined
    }

    onSubmit = e => {
        e.preventDefault()
        e.stopPropagation()
        this.props.onSubmit && this.props.onSubmit()
    }

    render() {
        const { onSubmit, onClose, ...etc } = this.props

        return (
            <Modal 
                as='form'
                onSubmit={this.onSubmit}
                onClose={onClose}>
                <Header 
                    title={t.s('addTags')}
                    data-no-shadow>
                    <Button 
                        as='input'
                        type='submit'
                        disabled={!etc.value.length}
                        variant='primary'
                        value={etc.value.length ? `${t.s('add')} ${etc.value.length} ${t.s('tags').toLowerCase()}` : t.s('addTags')} />
                </Header>

                <Content>
                    <Layout>
                        <div className={s.field}>
                            <Field 
                                autoFocus={true}
                                placeholder=''
                                {...etc} />
                        </div>
                    </Layout>
                </Content>
            </Modal>
        )
    }
}