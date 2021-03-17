import React from 'react'
import t from '~t'
import debounce from '~modules/format/callback/debounce'
import { connect } from 'react-redux'
import * as actions from '~data/actions/covers'

import Modal, { Header, Content } from '~co/overlay/modal'
import { Layout, Search } from '~co/common/form'
import Items from './items'
import Add from './add'
import Reset from './reset'

let lastSearch = ''

class PickerIcon extends React.Component {
    static defaultProps = {
        onLink: undefined, //async
        onFile: undefined, //async
        onClose: undefined
    }

    state = {
        search: lastSearch
    }

    componentDidMount() {
        this.load()
    }

    componentWillUnmount() {
        lastSearch = this.state.search
    }

    onSearchChange = e =>
        this.setState({ search: e.target.value }, this.load)

    load = debounce(()=>{
        if (!this.state.search.length || this.state.search.length>1)
            this.props.load(this.state.search)
    }, 250, { maxWait: 1000 })

    handlers = {
        onLink: async(link)=>{
            await this.props.onLink(link)
            this.props.onClose()
        },

        onFile: async(file)=>{
            await this.props.onFile(file)
            this.props.onClose()
        }
    }

    render() {
        const { search } = this.state

        return (
            <Modal 
                onClose={this.props.onClose}
                stretch>
                <Header 
                    title={t.s('changeIcon')}
                    data-no-shadow>
                    <Reset {...this.handlers} />
                    <Add {...this.handlers} />
                </Header>

                <Layout>
                    <Search 
                        autoFocus
                        value={search}
                        placeholder={`${t.s('defaultCollection-0')} ${t.s('icon').toLowerCase()}...`}
                        loading={this.props.status == 'loading'}
                        onChange={this.onSearchChange} />
                </Layout>

                <Content>
                    <Items
                        {...this.props}
                        {...this.handlers} />
                </Content>
            </Modal>
        )
    }
}

export default connect(
	(state)=>state.covers,
	actions
)(PickerIcon)