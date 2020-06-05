import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { oneChangeView } from '~data/actions/collections'

import { Menu, MenuItem } from '~co/overlay/popover'
import Icon from '~co/common/icon'

class BookmarksHeaderViewMenu extends React.Component {
    static defaultProps = {
        spaceId: 0,
        collection: {}
    }

    options = {
        'list':     t.s('view_list'),
        'grid':     t.s('view_grid'),
        'simple':   t.s('view_simple'),
        'masonry':  t.s('view_masonry'),
    }

    onViewClick = (e)=>
        this.props.oneChangeView(this.props.spaceId, e.target.getAttribute('data-view'))

    render() {
        const { collection: { view } } = this.props

        return (
            <Menu>
                {Object.keys(this.options).map(item=>(
                    <MenuItem 
                        key={item}
                        data-view={item}
                        checked={view==item}
                        onClick={this.onViewClick}>
                        <Icon name={'view_'+item} />
                        {t.s(`view_${item}`)}
                    </MenuItem>
                ))}
            </Menu>
        )
    }
}

export default connect(
	undefined,
	{ oneChangeView }
)(BookmarksHeaderViewMenu)