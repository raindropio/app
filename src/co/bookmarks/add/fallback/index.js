import React from 'react'
import t from '~t'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Popover from './popover'

export default class BookmarksAdd extends React.Component {
    static defaultProps = {
        //...same as ../index
    }

    state = {
        show: false
    }

    pin = React.createRef()

    onAddClick = (e)=>{
        e.preventDefault()
        this.setState({ show: !this.state.show })
    }

    onAddClose = ()=>
        this.setState({ show: false })
    
    render() {
        const { show } = this.state
        const { autoFocus } = this.props

        return (
            <>
                <Button 
                    ref={this.pin}
                    variant='primary'
                    title={t.s('add')}
                    autoFocus={autoFocus}
                    onMouseDown={this.onAddClick}>
                    <Icon name='new_bookmark' />
                    {t.s('add')}
                </Button>

                {show ? (
                    <Popover 
                        pin={this.pin}
                        {...this.props}
                        onClose={this.onAddClose} />
                ) : null}
            </>
        )
    }
}