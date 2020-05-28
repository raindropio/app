import React from 'react'
import { Portal } from 'react-portal'
import Context from './context'
import Header from './header'
import Content from './content'

export default class Popover extends React.Component {
    static defaultProps = {
        onClose: undefined      //func, required
    }

    store = {
        close: ()=>{
            this.props.onClose()
        }
    }

    onContainerKeyDown = (e)=>{
        switch(e.key) {
            case 'Escape':
                e.stopPropagation()
                this.store.close()
            break
        }
    }

    render() {
        const { children, onClose, ...etc } = this.props

        return (
            <Portal>
                <Context.Provider value={this.store}>
                    <div className='modal' onKeyDown={this.onContainerKeyDown}>
                        <div className='modal-body' {...etc}>
                            {children}
                        </div>
                    </div>
                </Context.Provider>
            </Portal>
        )
    }
}

export {
    Header,
    Content
}