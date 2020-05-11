import React from 'react'
import { Header } from '~co/screen/splitview/main'
import Icon from '~co/common/icon'
import Search from '~co/search'

function CollectionsMainHeader(){
    return (
        <Header>
            <Search />

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