import React from 'react'
import _ from 'lodash'
import t from '~t'
import { connect } from 'react-redux'
import { getItemHide, getGridSize } from '~data/selectors/bookmarks'
import { oneChangeView } from '~data/actions/collections'
import { changeItemHide, changeGridSize } from '~data/actions/bookmarks'

import Popover, { Menu, MenuItem } from '~co/overlay/popover'
import Icon from '~co/common/icon'
import Slider from '~co/common/slider'

class BookmarksHeaderView extends React.Component {
    static defaultProps = {
        spaceId: 0,
        collection: {}
    }

    state = {
        menu: false
    }

    options = {
        'list':     t.s('view_list'),
        'grid':     t.s('view_grid'),
        'simple':   t.s('view_simple'),
        'masonry':  t.s('view_masonry'),
    }

    itemHideOptions = [
        ['cover', t.s('cover')],
        ['title', t.s('title')],
        ['excerpt', t.s('description')],
        ['tags', t.s('tags')],
        ['info', _.capitalize(t.s('elements')) + ' ' + t.s('info').toLowerCase()]
    ]

    onContextMenuClick = (e)=>{
        e.preventDefault()
        this.setState({ menu: true })
    }

    onContextMenuClose = ()=>
        this.setState({ menu: false })

    onViewClick = (e)=>
        this.props.oneChangeView(this.props.spaceId, e.target.getAttribute('data-view'))

    onItemHideClick = (key)=>{
        let itemHide = [...this.props.itemHide]

        if (itemHide.includes(key))
            itemHide = itemHide.filter(i=>i!=key)
        else
            itemHide.push(key)

        this.props.changeItemHide(this.props.spaceId, itemHide)
    }

    onGridSizeChange = (val)=>
        this.props.changeGridSize(this.props.spaceId, val)

    render() {
        const { menu } = this.state
        const { collection, itemHide, gridSize } = this.props

        return (
            <>
                <a href='' className='button default' onClick={this.onContextMenuClick}>
                    <Icon name={'view_'+collection.view} />
        
                    <span>
                        <span className='hide-on-small-body'>{t.s(`view_${collection.view}`)}</span>
                    </span>
                </a>

                {menu ? (
                    <Popover onClose={this.onContextMenuClose}>
                        <Menu>
                            {Object.keys(this.options).map(view=>(
                                <MenuItem 
                                    key={view}
                                    data-view={view}
                                    checked={collection.view==view}
                                    onClick={this.onViewClick}>
                                    <Icon name={'view_'+view} />
                                    {t.s(`view_${view}`)}
                                </MenuItem>
                            ))}
                        </Menu>

                        <div className='superForm'>
                            <figure className='fieldWrap no-border'>
                                <label className='fieldName'>{t.s('show')}</label>
                            </figure>
                            
                            {this.itemHideOptions.map(([key, title])=>
                                <div 
                                    key={key}
                                    className='fieldLink fieldColumns'
                                    onClick={()=>this.onItemHideClick(key)}>
                                    <span className={'extra-checkbox '+(!itemHide.includes(key)?'active':'')} />
                                    <span>{title}</span>
                                </div>
                            )}


                            <figure className='fieldWrap no-border'>
                                <label className='fieldName'>{t.s('cover')}</label>
                            </figure>
                            
                            <div className={'fieldLink '+(itemHide.includes('cover') ? 'hidden':'')}>
                                <Slider 
                                    min='1'
                                    max='10'
                                    value={gridSize}
                                    leftIcon='size_small'
                                    rightIcon='size_big'
                                    onChange={this.onGridSizeChange} />
                            </div>
                        </div>
                    </Popover>
                ) : null}
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
	{ oneChangeView, changeItemHide, changeGridSize }
)(BookmarksHeaderView)