import s from './web.module.styl'
import React from 'react'
import SuperFrame from '~co/common/superFrame'

class ReaderWeb extends React.Component {
	render() {
        const { item: { link } } = this.props

        return <SuperFrame className={s.web} src={link} />
	}
}

export default ReaderWeb