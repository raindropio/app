import React from 'react'
import t from '~t'

import Bookmark from './bookmark';

import Preloader from '../../co/common/preloader'

class Note extends React.Component {
	displayName = "reader/note"

	render() {
		if (this.props.status=="loading")
			return (
				<div className="preview">
					<div className="centerContentWrap status-loading"><Preloader /></div>
				</div>
			);

		return <b>gg</b>;
	}
}

export default Bookmark(Note)