import React from 'react'
import SplitView from '~co/screen/splitview'
import Protected from '~co/screen/protected'

import Sidebar from './sidebar'
import Main from './main'
import Reader from './reader'

export default class SpaceRoute extends React.PureComponent {
	state = {
        spaceId: 0,
        full: false,
        search: '',
        reader: {}
    }

    static getDerivedStateFromProps({ match, location }) {
        return {
            spaceId: match.params.spaceId,
            full: match.params.modifier == 'full',
            search: decodeURIComponent(match.params.search||''),
            reader: Object.fromEntries(new URLSearchParams(location.search))
        }
    }

    handlers = {
        onSearch: (value, mode='')=>{
            let spaceId, search

            switch(mode) {
                case 'append':
                    if (new RegExp(`${value}\\b`,'i').test(this.state.search))
                        return

                    spaceId = this.state.spaceId
                    search = (this.state.search||'').trim()+' '+value
                break

                case 'current':
                    spaceId = this.state.spaceId
                    search = value
                break

                default:
                    spaceId = 0
                    search = value
                break
            }

            this.props.history.push(`/space/${spaceId}${this.state.full?'full':''}/${encodeURIComponent(search)}`)
        },

        onReader: (update)=>{
            const params = new URLSearchParams('')

            for(const key in update||{})
                if (update[key])
                    params.set(key, update[key])

            const search = params.toString()

            this.props.history[search && this.props.location.search ? 'replace' : 'push'](this.props.match.url+'?'+search)
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