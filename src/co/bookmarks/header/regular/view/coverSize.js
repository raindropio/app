import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { makeViewHide, getCoverSize } from '~data/selectors/bookmarks'
import { changeCoverSize } from '~data/actions/bookmarks'

import { Label, Range } from '~co/common/form'

class BookmarksHeaderViewCoverSize extends React.Component {
    static defaultProps = {
        spaceId: 0,
        collection: {}
    }

    onCoverSizeChange = (e)=>
        this.props.changeCoverSize(this.props.spaceId, this.props.collection.view, parseInt(e.target.value))

    render() {
        const { collection: { view }, viewHide, coverSize } = this.props

        switch(view) {
            case 'grid':
            case 'masonry':
                if (viewHide.includes('cover')) return null
            break

            default:
                return null
        }

        return (
            <>
                <Label>{t.s('cover')}</Label>
                
                <div>
                    <Range 
                        min='1'
                        max='10'
                        value={coverSize}
                        onChange={this.onCoverSizeChange} />
                </div>
            </>
        )
    }
}

export default connect(
	() => {
        const getViewHide = makeViewHide()

        return (state, { spaceId, collection: { view } })=>({
            viewHide: getViewHide(state, spaceId),
            coverSize: getCoverSize(state, view)
        })
    },
	{ changeCoverSize }
)(BookmarksHeaderViewCoverSize)