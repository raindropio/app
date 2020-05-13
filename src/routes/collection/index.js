import React from 'react'
import SplitView from '~co/screen/splitview'
import Protected from '~co/screen/protected'

import Sidebar from './sidebar'
import Main from './main'
import Reader from './reader'

export default class CollectionRoute extends React.PureComponent {
	state = {
        cid: 0,
        search: ''
    }

    static getDerivedStateFromProps({ match }) {
        return {
            cid: match.params.cid,
            search: decodeURIComponent(match.params.search||'')
        }
    }

    handlers = {
        onSearch: (value, mode='')=>{
            let cid, search

            switch(mode) {
                case 'append':
                    if (new RegExp(`${value}\\b`,'i').test(this.state.search))
                        return

                    cid = this.state.cid
                    search = (this.state.search||'').trim()+' '+value
                break

                case 'current':
                    cid = this.state.cid
                    search = value
                break

                default:
                    cid = 0
                    search = value
                break
            }

            this.props.history.push(`/collection/${cid}/${encodeURIComponent(search)}`)
        }
    }

	render() {
		return (
			<Protected>
				<SplitView>
					<Sidebar {...this.state} {...this.handlers} />
					<Main {...this.state} {...this.handlers} />
					<Reader {...this.state} {...this.handlers} />
				</SplitView>
			</Protected>
		)
	}
}