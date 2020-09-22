import React from 'react'
import { connect } from 'react-redux'
import { getDraftStatus, makeDraftUnsaved } from '~data/selectors/bookmarks'

import Protected from '~co/screen/protected'
import Screen from '~co/screen/basic'
import Header from './header'
import Content from './content'
import Events from './events'

/*
    ?link=&title=&autoCreate=
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
            const { autoCreate=false, ...item } = Object.fromEntries(new URLSearchParams(search))||{}
    
            return {
                status: getDraftStatus(state, item.link),
                unsaved: getDraftUnsaved(state, item.link),

                item,
                autoCreate: autoCreate ? true : false,
            }
        }
	}
)(Add)