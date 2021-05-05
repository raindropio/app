import React from 'react'
import SplitView from '~co/screen/splitview'

import Sidebar from './sidebar'
import Main from './main'
import Reader from './reader'

export default class MyRoute extends React.PureComponent {
    state = {}

    static getDerivedStateFromProps({ match: { params }, location }) {
        let { _id, search='' } = params

        //clean up
        _id = parseInt(_id)
        try{ search = (search ? decodeURIComponent(search||'') : '').replace('_percent_', '%') } catch(e) {}

        return {
            _id: _id+(search ? 's' : ''),
            search,
            query: location.search ? Object.fromEntries(new URLSearchParams(location.search)) : {}
        }
    }

    handlers = {
        getLink: ({ _id=null, search=null, refine=null, ...query })=>{
            const { match, location } = this.props
    
            //overrides
            let $_id = match.params._id,
                $searchRaw = (match.params.search||''),
                $query = location.search
    
            //changed collection
            if (_id !== null){
                $_id = parseInt(_id)
                $query = query.full ? 'full=true' : ''
    
                if (refine === null)
                    $searchRaw = ''
            }
    
            //search
            if (refine){
                const refineEncoded = refine.trim()
    
                if (!$searchRaw.includes(refineEncoded+' ') &&
                    !$searchRaw.endsWith(refineEncoded))
                    $searchRaw = 
                        ($searchRaw ? $searchRaw.trim() + ' ' : '') + 
                        refineEncoded + ' '
            }
            else if (search !== null)
                $searchRaw = search
            
            //when search started make collection compact
            if (!match.params.search && 
                $searchRaw &&
                $searchRaw != match.params.search)
                $query = query.full ? 'full=true' : ''
    
            //changed query
            let queryIsChanged = false
            for(const i in query){ queryIsChanged=true; break; }
    
            if (queryIsChanged){
                const merged = {...this.state.query, ...query}
                const params = new URLSearchParams('')
    
                for(const key in merged||{})
                    if (merged[key])
                        params.set(key, merged[key])
    
                $query = params.toString()
            }
    
            return `/my/${$_id}${$searchRaw ? '/' + encodeURIComponent($searchRaw.replace('%', '_percent_')) : ''}${$query ? '?' + $query : ''}`
        }
    }

    render() {
        return (
            <CollectionRouteContent 
                {...this.state}
                {...this.handlers} />
        )
    }
}

function CollectionRouteContent(props) {
	return (
        <SplitView>
            <Sidebar {...props} />
            <Main {...props} />
            <Reader {...props} />
        </SplitView>
    )
}