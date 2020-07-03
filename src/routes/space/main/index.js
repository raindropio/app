import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { collection } from '~data/selectors/collections'
import { setLastCollection } from '~data/actions/config'

import Main from '~co/screen/splitview/main'
import Header from './header'
import Bookmarks from './bookmarks'
import Collections from './collections'
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
                    <Helmet>
                        <title>{this.props.search || this.props.title}</title>
                    </Helmet>
                    <Header {...this.props} />
                    <Collections {...this.props} />
                    <Bookmarks {...this.props} />
                </Main>
            }</AccentColor>
        )
    }
}

export default connect(
	(state, { spaceId }) => {
        const { title, access } = collection(state, spaceId)
        return { title, access }
    },
	{ setLastCollection }
)(CollectionsMain)