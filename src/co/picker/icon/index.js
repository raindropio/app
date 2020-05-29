import React from 'react'
import t from '~t'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as actions from '~data/actions/covers'

import Modal, { Header, Content } from '~co/overlay/modal'
import SearchInput from '~co/search/input'
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

    onSearchChange = search=>
        this.setState({ search }, this.load)

    load = _.debounce(()=>{
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
                data-stretch>
                <Header title={t.s('changeIcon')}>
                    <Reset {...this.handlers} />
                    <Add {...this.handlers} />
                </Header>

                <div className='picker-search-input'>
                    <SearchInput 
                        autoFocus
                        value={search}
                        placeholder={`${t.s('defaultCollection-0')} ${t.s('icon').toLowerCase()}...`}
                        loading={this.props.status == 'loading'}
                        onChange={this.onSearchChange} />
                </div>

                <Content>
                    <Items
                        key={search} 
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