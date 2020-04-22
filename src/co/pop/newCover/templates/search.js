import React from 'react'
import ReactDom from 'react-dom'
import _ from 'lodash'
import t from 't'
import CoversStore from '../../../../stores/covers'
import SearchInput from '../../../common/searchInput'

export default class NewCoverTempalteSearch extends React.Component {
    render() {
        return (
            <div className='nc-search'>
                <SearchInput
                    value={this.props.query}
                    loading={this.props.loading}
                    onChange={CoversStore.onSearch}
                    autoFocus
                    placeholder={`${t.s('defaultCollection-0')} ${t.s('icon').toLowerCase()}...`}
                    />
            </div>
        )
    }
}