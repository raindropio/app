import React from 'react'
import Edit from '~co/bookmarks/edit'

class ReaderEdit extends React.Component {
	render() {
        const { item: { _id } } = this.props

        return (
            <div className='reader-edit-bookmark'>
                <Edit _id={_id} />
            </div>
        )
	}
}

export default ReaderEdit