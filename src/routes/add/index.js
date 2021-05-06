import React from 'react'
import { connect } from 'react-redux'
import { getDraftStatus, makeDraftUnsaved } from '~data/selectors/bookmarks'

import Protected from '~co/screen/protected'
import Screen from '~co/screen/basic'
import Header from './header'
import Content from './content'
import Events from './events'

/*
    ?link=&title=
*/
class Add extends React.Component {
    componentDidMount() {
        window.addEventListener('keydown', this.onWindowKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onWindowKeyDown)
    }

    onWindowKeyDown = (e)=>{
        switch(e.key) {
            case 'Escape':
                if (!this.props.unsaved || this.props.status == 'new')
                    window.close()
            break
        }
    }

    render() {
        return (
            <Protected redirect>
                <Screen>
                    <Header {...this.props} />
                    <Content {...this.props} />
                    <Events {...this.props} />
                </Screen>
            </Protected>
        )
    }
}

export default connect(
    () => {
		const getDraftUnsaved = makeDraftUnsaved()
	
		return (state, { location: { search } })=>{
            const item = Object.fromEntries(new URLSearchParams(search))||{}
            for(const i in item)
                try{item[i]=JSON.parse(item[i])}catch(e){}

            const { config: { add_default_collection, last_collection } } = state

            //tags
            if (item.tags)
                item.tags = item.tags.split(',')
    
            return {
                status: getDraftStatus(state, item.link),
                unsaved: getDraftUnsaved(state, item.link),

                item: {
                    collectionId: add_default_collection || last_collection,
                    ...item,
                }
            }
        }
	}
)(Add)