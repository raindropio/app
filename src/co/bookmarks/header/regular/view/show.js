import React from 'react'
import _ from 'lodash'
import t from '~t'
import { connect } from 'react-redux'
import { makeViewHide } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'
import { viewToggle, setListCoverRight } from '~data/actions/bookmarks'

import { Checkbox, Radio, Label } from '~co/common/form'

class BookmarksHeaderViewShow extends React.Component {
    static defaultProps = {
        spaceId: 0,
        collection: {}
    }

    onClick = (field)=>{
        this.props.viewToggle(this.props.spaceId, field)
    }

    onSetListCoverRight = ()=>{
        this.props.setListCoverRight(this.props.spaceId, !this.props.listCoverRight)
    }

    render() {
        const { viewHide=[], view, listCoverRight } = this.props

        const options = [
            ['cover', t.s(view == 'simple' ? 'icon' : 'cover')],
            ['title', t.s('title')],
            ['excerpt', t.s('description')],
            ['tags', t.s('tags')],
            ['info', _.capitalize(t.s('bookmarks')) + ' ' + t.s('info').toLowerCase()]
        ]

        return (
            <>
                <Label>{t.s('show')} {t.s('in')} {t.s('view_'+view).toLowerCase()}</Label>
                
                <div>
                    {options.map(([key, title])=>
                        <Checkbox 
                            key={key}
                            checked={!viewHide.includes(key)}
                            onChange={()=>this.onClick(key)}>
                            {title}
                        </Checkbox>
                    )}
                </div>

                {view == 'list' && !viewHide.includes('cover') ? (
                    <>
                        <Label>{t.s('cover')} {t.s('position')}</Label>

                        <div>
                            <Radio 
                                checked={!listCoverRight}
                                onChange={this.onSetListCoverRight}>
                                {t.s('left')}
                            </Radio>
                            <Radio 
                                checked={listCoverRight}
                                onChange={this.onSetListCoverRight}>
                                {t.s('right')}
                            </Radio>
                        </div>
                    </>
                ) : null}
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
            viewHide: getViewHide(state, spaceId),
            listCoverRight: state.config.raindrops_list_cover_right
        })
    },
	{ viewToggle, setListCoverRight }
)(BookmarksHeaderViewShow)