import React from 'react'
import { Header } from '~co/screen/splitview/main'
import Icon from '~co/common/icon'
import Search from '~co/search'

function CollectionsMainHeader({ match }){
    return (
        <Header>
            <Search 
                value={match.params.search} />

            <a href='' className='button default'>
                <Icon name='share' />
            </a>

            <a href='' className='button active'>
                <b>
                    <Icon name='add' />
                </b>
            </a>
        </Header>
    )
}

export default CollectionsMainHeader