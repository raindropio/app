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
    static defaultProps = {
        search: '',
        getLink: undefined
    }

    render() {
        const { items, show, search, toggleCollectionsSearchResults, getLink } = this.props
        if (!items.length) return null

        return (
            <div>
                <Header>
                    <Title>{t.s('found')} {items.length} {t.s('collectionsCount')}</Title>
                    <Button onClick={toggleCollectionsSearchResults}>
                        {t.s(show ? 'hide' : 'show')}
                    </Button>
                </Header>

                {show && (
                    <div className={s.items}>
                        {items.map(item=>(
                            <Item 
                                key={item._id} 
                                {...item} 
                                search={search}
                                getLink={getLink} />
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
    
        return (state, { search, ignore })=>({
            items: getItems(state, search, ignore),
            show: state.local.collectionsSearchResults
        })
    },
    {
        toggleCollectionsSearchResults
    }
)(CollectionsSearch)