import s from './index.module.styl'
import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { makeFiltered } from '~data/selectors/collections'
import { toggleCollectionsSearchResults } from '~local/actions'

import Header, { Title } from '~co/common/header'
import Button from '~co/common/button'
import Item from './item'

class CollectionsSearch extends React.PureComponent {
    render() {
        const { items, show, toggleCollectionsSearchResults } = this.props
        if (!items.length) return null

        return (
            <div>
                <Header>
                    <Title>{t.s('found')} {t.s('collectionsCount')}</Title>
                    <Button onClick={toggleCollectionsSearchResults}>
                        {t.s(show ? 'hide' : 'show')}
                    </Button>
                </Header>

                {show && (
                    <div className={s.items}>
                        {items.map(item=>(
                            <Item key={item._id} {...item} />
                        ))}
                    </div>
                )}
            </div>
        )
    }
}

export default connect(
    () => {
        const getItems = makeFiltered()
    
        return (state, { search })=>({
            items: getItems(state, search),
            show: state.local.collectionsSearchResults
        })
    },
    {
        toggleCollectionsSearchResults
    }
)(CollectionsSearch)