import React from 'react'
import t from '~t'
import Modal, { Header, Content } from '~co/overlay/modal'
import Items from '~co/collections/items'
import SearchInput from '~co/search/input'
import { Layout } from '~co/common/form'

export default class CollectionsPicker extends React.Component {
    state = {
        options: {
            hideIds: [0],
            search: ''
        }
    }

    onSearchChange = (search)=>
        this.setState({ options: { ...this.state.options, search } })

    render() {
        const { onClose, ...etc } = this.props

        return (
            <Modal onClose={onClose} data-stretch>
                <Header title={t.s('selectCollection')} />

                <Layout>
                    <SearchInput 
                        autoFocus
                        value={this.state.options.search}
                        placeholder={t.s('findOrCreateCollection')}
                        onChange={this.onSearchChange} />
                </Layout>

                <Content>
                    <Items 
                        pauseId='picker'
                        {...etc}
                        {...this.state} />
                </Content>
            </Modal>
        )
    }
}