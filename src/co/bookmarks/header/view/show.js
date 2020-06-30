import React from 'react'
import _ from 'lodash'
import t from '~t'
import { connect } from 'react-redux'
import { makeViewHide } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'
import { viewToggle } from '~data/actions/bookmarks'

import { Checkbox, Label } from '~co/common/form'

class BookmarksHeaderViewShow extends React.Component {
    static defaultProps = {
        spaceId: 0,
        collection: {}
    }

    onClick = (field)=>{
        this.props.viewToggle(this.props.spaceId, field)
    }

    render() {
        const { viewHide=[], view } = this.props

        const options = [
            ['cover', t.s(view == 'simple' ? 'icon' : 'cover')],
            ['title', t.s('title')],
            ...(view != 'simple' ? [['excerpt', t.s('description')]] : []),
            ['tags', t.s('tags')],
            ['info', _.capitalize(t.s('elements')) + ' ' + t.s('info').toLowerCase()]
        ]

        return (
            <>
                <Label>{t.s('show')}</Label>
                
                <div>
                    {options.map(([key, title])=>
                        <Checkbox 
                            checked={!viewHide.includes(key)} onClick={()=>this.onClick(key)}>
                            {title}
                        </Checkbox>
                    )}
                </div>
            </>
        )
    }
}

export default connect(
	() => {
        const getViewHide = makeViewHide()
        const getCollection = makeCollection()

        return (state, { spaceId })=>({
            view: getCollection(state, spaceId).view,
            viewHide: getViewHide(state, spaceId)
        })
    },
	{ viewToggle }
)(BookmarksHeaderViewShow)