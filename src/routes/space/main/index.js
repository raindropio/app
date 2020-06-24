import React from 'react'
import { connect } from 'react-redux'
import { setLastCollection } from '~data/actions/config'

import Main from '~co/screen/splitview/main'
import Header from './header'
import Content from './content'
import AccentColor from '~co/collections/item/accentColor'

class CollectionsMain extends React.Component {
    componentDidMount() {
        this.props.setLastCollection(this.props.spaceId)
    }

    componentDidUpdate(prev) {
        if (prev.spaceId != this.props.spaceId)
            this.props.setLastCollection(this.props.spaceId)
    }

    render() {
        return (
            <AccentColor _id={this.props.spaceId}>{style=>
                <Main style={style}>
                    <Header {...this.props} />
                    <Content {...this.props} />
                </Main>
            }</AccentColor>
        )
    }
}

export default connect(
	undefined,
	{ setLastCollection }
)(CollectionsMain)