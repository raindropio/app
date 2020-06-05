import React from 'react'
import { connect } from 'react-redux'
import { makeSelectMode } from '~data/selectors/bookmarks'

import Title from './title'
import AddTags from './addTags'
import Move from './move'
import Checkbox from './checkbox'
import More from './more'
import Remove from './remove'
import Open from './open'
import Working from './working'
import Cancel from './cancel'

class BookmarksSelectMode extends React.Component {
    render() {
        if (this.props.selectMode.working)
            return <Working {...this.props} />

        return (
            <div className='elements-header select-mode'>
                <div className='header'>
                    <Checkbox {...this.props} />
                    <Title {...this.props} />

                    <div className='space' />

                    <Move {...this.props} />
					<AddTags {...this.props} />
                    <Remove {...this.props} />
                    <Open {...this.props} />
					<More {...this.props} />
                    <Cancel {...this.props} />
                </div>
            </div>
        )
    }
}

export default connect(
	() => {
        const getSelectMode = makeSelectMode()
    
        return (state, { spaceId })=>({
            selectMode: getSelectMode(state, spaceId)
        })
    }
)(BookmarksSelectMode)