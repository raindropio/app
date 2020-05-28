import React from 'react'
import Context from './context'
import Icon from '~co/common/icon'

class ModalHeader extends React.Component {
    static contextType = Context

    render() {
        return (
            <header>
                {this.props.title && <div className='title'>
                    {this.props.title}
                </div>}

                {this.props.children}

                {this.context.closable ? (
                    <a className='button default modal-close' onClick={this.context.onClose}>
                        <Icon name='close' />
                    </a>
                ) : null}
            </header>
        )
    }
}

export default ModalHeader