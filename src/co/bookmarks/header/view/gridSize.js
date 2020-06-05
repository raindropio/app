import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { getItemHide, getGridSize } from '~data/selectors/bookmarks'
import { changeGridSize } from '~data/actions/bookmarks'

import Slider from '~co/common/slider'

class BookmarksHeaderViewGridSize extends React.Component {
    static defaultProps = {
        spaceId: 0,
        collection: {}
    }

    onGridSizeChange = (val)=>
        this.props.changeGridSize(this.props.spaceId, val)

    render() {
        const { collection: { view }, itemHide, gridSize } = this.props

        if (itemHide.includes(`${view}_cover`)) return null

        return (
            <>
                <figure className='fieldWrap no-border'>
                    <label className='fieldName'>{t.s('cover')}</label>
                </figure>
                
                <div className='fieldLink'>
                    <Slider 
                        min='1'
                        max='10'
                        value={gridSize}
                        leftIcon='size_small'
                        rightIcon='size_big'
                        onChange={this.onGridSizeChange} />
                </div>
            </>
        )
    }
}

export default connect(
	() => {
        return (state, { spaceId })=>({
            itemHide: getItemHide(state, spaceId),
            gridSize: getGridSize(state, spaceId)
        })
    },
	{ changeGridSize }
)(BookmarksHeaderViewGridSize)