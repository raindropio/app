import React from 'react'
import Icon from '~co/common/icon'

export default class SearchView extends React.PureComponent {
    render() {
        const { focus } = this.props
        const { onInputFocus, onInputBlur } = this.props

        return (
            <div className='search'>
                <div className='s-content' data-focus={focus}>
                    <Icon name='search' className='s-icon' />

                    <input 
                        type='search'
                        onFocus={onInputFocus}
                        onBlur={onInputBlur} />
                </div>
            </div>
        )
    }
}