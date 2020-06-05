import React from 'react'
import _ from 'lodash'
import t from '~t'
import { connect } from 'react-redux'
import { getItemHide } from '~data/selectors/bookmarks'
import { changeItemHide } from '~data/actions/bookmarks'

class BookmarksHeaderViewShow extends React.Component {
    static defaultProps = {
        spaceId: 0,
        collection: {}
    }

    onClick = (key)=>{
        let itemHide = [...this.props.itemHide]

        if (itemHide.includes(key))
            itemHide = itemHide.filter(i=>i!=key)
        else
            itemHide.push(key)

        this.props.changeItemHide(this.props.spaceId, itemHide)
    }

    render() {
        const { collection: { view }, itemHide=[] } = this.props

        const options = [
            [`${view}_cover`, t.s('cover')],
            [`${view}_title`, t.s('title')],
            [`${view}_excerpt`, t.s('description')],
            [`${view}_tags`, t.s('tags')],
            [`${view}_info`, _.capitalize(t.s('elements')) + ' ' + t.s('info').toLowerCase()]
        ]

        return (
            <>
                <figure className='fieldWrap no-border'>
                    <label className='fieldName'>{t.s('show')}</label>
                </figure>
                
                {options.map(([key, title])=>
                    <div 
                        key={key}
                        className='fieldLink fieldColumns'
                        onClick={()=>this.onClick(key)}>
                        <span className={'extra-checkbox '+(!itemHide.includes(key)?'active':'')} />
                        <span>{title}</span>
                    </div>
                )}
            </>
        )
    }
}

export default connect(
	() => {
        return (state, { spaceId })=>({
            itemHide: getItemHide(state, spaceId)
        })
    },
	{ changeItemHide }
)(BookmarksHeaderViewShow)