import React from 'react'
import { Header } from '~co/screen/splitview/main'
import Icon from '~co/common/icon'
import Search from '~co/search'

export default class CollectionsMainHeader extends React.Component {
    searchEvents = {
        onSubmit: val=>{
            this.props.onSearch(val, 'current')
        }
    }

    render() {
        const { cid, search } = this.props

        return (
            <Header>
                <Search 
                    value={search}
                    events={this.searchEvents} />
    
                {cid > 0 && (
                    <a href='' className='button default'>
                        <Icon name='share' />
                    </a>
                )}
    
                <a href='' className='button active'>
                    <b>
                        <Icon name='add' />
                    </b>
                </a>
            </Header>
        )
    }
}