import React from 'react'
import { connect } from 'react-redux'
import { setLastCollection } from '~data/actions/config'

import Main from '~co/screen/splitview/main'
import Header from './header'
import Content from './content'

class CollectionsMain extends React.Component {
    componentDidMount() {
        this.props.setLastCollection(this.props.cid)
    }

    componentDidUpdate(prev) {
        if (prev.cid != this.props.cid)
            this.props.setLastCollection(this.props.cid)
    }

    render() {
        return (
            <Main>
                <Header {...this.props} />
                <Content {...this.props} />
            </Main>
        )
    }
}

export default connect(
	undefined,
	{ setLastCollection }
)(CollectionsMain)