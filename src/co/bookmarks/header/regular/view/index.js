import React from 'react'
import t from '~t'

import Popover from '~co/overlay/popover'
import { Layout } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Menu from './menu'
import Show from './show'
import CoverSize from './coverSize'

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
        this.setState({ menu: !this.state.menu })
    }

    onMenuClose = ()=>
        this.setState({ menu: false })

    render() {
        const { menu } = this.state
        const { collection: { view } } = this.props

        return (
            <>
                <Button 
                    ref={this.pin}
                    title={t.s('view')}
                    onMouseDown={this.onMenuClick}>
                    <Icon name={'view_'+view} />
                    <span className='hide-on-small-body'>{t.s(`view_${view}`)}</span>
                </Button>

                {menu ? (
                    <Popover pin={this.pin} onClose={this.onMenuClose}>
                        <Layout>
                            <Menu {...this.props} />
                            <Show {...this.props} />
                            <CoverSize {...this.props} />
                        </Layout>
                    </Popover>
                ) : null}
            </>
        )
    }
}

export default BookmarksHeaderView