import s from './index.module.styl'
import React from 'react'
import { connect } from 'react-redux'
import { makeBranchIds } from '~data/selectors/collections'

import Lazy from '~co/virtual/lazy'
import Container from './container'

class Bookmarks extends React.Component {
    static defaultProps = {
        //...+ ./container
        spaceId: 0,
        search: '',
        full: false //don't show nested folders in compact mode
    }

    renderSpace = spaceId=>{
        const { ids, ...etc } = this.props

        return (
            <Container 
                {...etc}
                spaceId={spaceId}
                compact={ids.length>1} />
        )
    }

    keyExtractor = _id=>_id

    render() {
        const { ids } = this.props

        if (ids.length<=1)
            return this.renderSpace(ids[0])

        return (
            <div className={s.bookmarks}>
                <Lazy
                    data={ids} 
                    keyExtractor={this.keyExtractor}
                    initialNumToRender={20}
                    activateAfter={20}>
                    {spaceId=>this.renderSpace(spaceId)}
                </Lazy>
            </div>
        )
    }
}

export default connect(
	() => {
        const getBranchIds = makeBranchIds()
    
        return (state, { spaceId, full })=>{
            const { nested_view_legacy } = state.config

            if (full || nested_view_legacy)
                return {
                    ids: [ spaceId ],
                }
            else{
                const ids = getBranchIds(state, spaceId)
                
                return {
                    ids,
                }
            }
        }
    }
)(Bookmarks)