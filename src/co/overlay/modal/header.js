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

                <a className='button default' onClick={this.context.close}>
                    <Icon name='close' />
                </a>
            </header>
        )
    }
}

export default ModalHeader