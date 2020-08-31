import React from 'react'
import Edit from '~co/bookmarks/edit'

class ReaderEdit extends React.Component {
	render() {
        const { item: { _id }, query: { autoFocus='title' } } = this.props

        return (
            <div className='reader-edit-bookmark'>
                <Edit 
                    key={_id} //otherwise autoFocus doesn't work
                    _id={_id}
                    autoFocus={autoFocus} />
            </div>
        )
	}
}

export default ReaderEdit