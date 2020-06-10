import React from 'react'
import Edit from '~co/bookmarks/edit'

class ReaderEdit extends React.Component {
	render() {
        const { item: { _id } } = this.props

        return (
            <Edit _id={_id} />
        )
	}
}

export default ReaderEdit