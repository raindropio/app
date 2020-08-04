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

class MyMain extends React.Component {
    componentDidMount() {
        this.props.setLastCollection(this.props._id)
    }

    componentDidUpdate(prev) {
        if (prev._id != this.props._id)
            this.props.setLastCollection(this.props._id)
    }

    render() {
        return (
            <AccentColor _id={this.props._id}>{style=>
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
	(state, props) => {
        const { title, access } = collection(state, props._id)
        return { title, access }
    },
	{ setLastCollection }
)(MyMain)