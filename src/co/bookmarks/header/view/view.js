import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem } from '~co/popover'
import Icon from '~co/common/icon'

export default class BookmarksHeaderView extends React.Component {
    state = {
        menu: false
    }

    options = {
        'list':     t.s('view_list'),
        'grid':     t.s('view_grid'),
        'simple':   t.s('view_simple'),
        'masonry':  t.s('view_masonry'),
    }

    onContextMenuClick = (e)=>{
        e.preventDefault()
        this.setState({ menu: true })
    }

    onContextMenuClose = ()=>
        this.setState({ menu: false })

    onViewClick = (e)=>{
        this.props.collectionsActions.oneChangeView(this.props.cid, e.target.getAttribute('data-view'))
    }

    render() {
        const { menu } = this.state
        const { collection } = this.props

        return (
            <>
                <a href='' className='button default' onClick={this.onContextMenuClick}>
                    <Icon name={'view_'+collection.view} />
        
                    <span>
                        <span className='hide-on-small-body'>{t.s(`view_${collection.view}`)}</span>
                    </span>
                </a>

                {menu && (
                    <Popover onClose={this.onContextMenuClose}>
                        <Menu>
                            {Object.keys(this.options).map(view=>(
                                <MenuItem 
                                    key={view}
                                    data-view={view}
                                    onClick={this.onViewClick}>
                                    <Icon name={'view_'+view} />
                                    {t.s(`view_${view}`)}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Popover>
                )}
            </>
        )
    }
}