import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { makeViewHide, getGridSize } from '~data/selectors/bookmarks'
import { changeGridSize } from '~data/actions/bookmarks'

import { Label, Range } from '~co/common/form'

class BookmarksHeaderViewGridSize extends React.Component {
    static defaultProps = {
        spaceId: 0,
        collection: {}
    }

    onGridSizeChange = (e)=>
        this.props.changeGridSize(this.props.spaceId, parseInt(e.target.value))

    render() {
        const { collection: { view }, viewHide, gridSize } = this.props

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
                        value={gridSize}
                        onChange={this.onGridSizeChange} />
                </div>
            </>
        )
    }
}

export default connect(
	() => {
        const getViewHide = makeViewHide()

        return (state, { spaceId })=>({
            viewHide: getViewHide(state, spaceId),
            gridSize: getGridSize(state, spaceId)
        })
    },
	{ changeGridSize }
)(BookmarksHeaderViewGridSize)