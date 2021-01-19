import React from 'react'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Popover, { Menu, MenuItem } from '~co/overlay/popover'

export default class Select extends React.Component {
    static defaultProps = {
        //...same as Button +
        children: [], //should have <option> tags, other can bee too
        onChange: undefined, //({ target: { value } })
    }

    state = {
		show: false
    }

    pin = React.createRef()
    
    onButtonClick = (e)=>{
        const { children=[] } = this.props

        const haveOptions = (Array.isArray(children) ? children : [children]).some(child=>child && child.type == 'option')

        if (haveOptions)
            this.setState({ show: true })
        else if (this.props.onClick)
            this.props.onClick(e)
    }

    onPopoverClose = ()=>
        this.setState({ show: false })

    onOptionClick = e=>{
        this.props.onChange({
            target: {
                value: e.currentTarget.getAttribute('data-value')
            },
            currentTarget: this.pin.current
        })
    }

    renderOption = child => {
        if (!child || child.type != 'option')
            return null

        return (
            <MenuItem 
                key={child.props.value}
                data-value={child.props.value}
                onClick={this.onOptionClick}>
                <Icon name={child.props.value == this.props.value ? 'check' : 'blank'} />
                {child.props.children}
            </MenuItem>
        )
    }

    renderChildren = child => {
        if (child &&
            child.type == 'option' && 
            child.props &&
            this.props.value != child.props.value)
            return null
        
        if (child && child.type == 'option')
            return (
                <React.Fragment key={child.props.value}>
                    {child.props.children}
                </React.Fragment>
            )
            
        return child
    }

    render() {
        const { children=[], value, ...etc } = this.props
        const { show } = this.state

        return (
            <>
                <Button 
                    ref={this.pin}
                    data-value={value} 
                    {...etc}
                    onClick={this.onButtonClick}>
                    {(Array.isArray(children) ? children : [children]).map(this.renderChildren)}
                    <Icon name='arrow' />
                </Button>

                {show && (
                    <Popover
                        pin={this.pin}
                        onClose={this.onPopoverClose}>
                        <Menu>
                            {(Array.isArray(children) ? children : [children]).map(this.renderOption)}
                        </Menu>
                    </Popover>
                )}
            </>
        )
    }
}