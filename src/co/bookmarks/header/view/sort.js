import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem } from '~co/popover'
import Icon from '~co/common/icon'

export default class BookmarksHeaderSort extends React.Component {
    state = {
        menu: false
    }

    options = {
        'score':        t.s('byRelevance'),
        'created':      t.s('byDate')+' ↑',
        '-created':     t.s('byDate')+' ↓',
        'title':        t.s('byName')+' (A-Z)',
        '-title':       t.s('byName')+' (Z-A)',
        'domain':       t.s('sites')+' (A-Z)',
        '-domain':      t.s('sites')+' (Z-A)',
        'sort':         t.s('manual')
    }

    onContextMenuClick = (e)=>{
        e.preventDefault()
        this.setState({ menu: true })
    }

    onContextMenuClose = ()=>
        this.setState({ menu: false })

    onSortClick = (e)=>{
        this.props.actions.changeSort(this.props.cid, e.target.getAttribute('data-sort'))
    }

    render() {
        const { menu } = this.state
        const { sort, sorts } = this.props

        return (
            <>
                <a href='' className='button default' onClick={this.onContextMenuClick}>
                    <Icon name={'sort_'+sort} />
        
                    <span>
                        {this.options[sort]||''}
                    </span>
                </a>

                {menu && (
                    <Popover onClose={this.onContextMenuClose}>
                        <Menu>
                            {Object.keys(this.options).map(sort=>(
                                <MenuItem 
                                    key={sort}
                                    data-sort={sort}
                                    disabled={sorts[sort] && !sorts[sort].enabled}
                                    onClick={this.onSortClick}>
                                    <Icon name={'sort_'+sort} />
                                    {this.options[sort]}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Popover>
                )}
            </>
        )
    }
}