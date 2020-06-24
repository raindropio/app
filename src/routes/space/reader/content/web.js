import React from 'react'
import SuperFrame from '~co/common/superFrame'

class ReaderWeb extends React.Component {
	render() {
        const { item: { link } } = this.props

        return <SuperFrame src={link} />
	}
}

export default ReaderWeb