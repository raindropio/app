import React from 'react'
import t from '~t'

import Popover from '~co/overlay/popover'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Menu from './menu'
import Show from './show'
import GridSize from './gridSize'

class BookmarksHeaderView extends React.Component {
    static defaultProps = {
        spaceId: 0,
        collection: {}
    }

    pin = React.createRef()

    state = {
        menu: false
    }

    onMenuClick = (e)=>{
        e.preventDefault()
        this.setState({ menu: true })
    }

    onMenuClose = ()=>
        this.setState({ menu: false })

    render() {
        const { menu } = this.state
        const { collection: { view } } = this.props

        return (
            <>
                <Button ref={this.pin} onClick={this.onMenuClick}>
                    <Icon name={'view_'+view} />
                    <span className='hide-on-small-body'>{t.s(`view_${view}`)}</span>
                </Button>

                {menu ? (
                    <Popover pin={this.pin} onClose={this.onMenuClose}>
                        <Menu {...this.props} />
                        
                        <div className='superForm'>
                            <Show {...this.props} />
                            <GridSize {...this.props} />
                        </div>
                    </Popover>
                ) : null}
            </>
        )
    }
}

export default BookmarksHeaderView