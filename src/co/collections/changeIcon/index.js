import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as collectionsActions from '~data/actions/collections'

import PickerIcon from '~co/picker/icon'

class CollectionChangeIcon extends React.Component {
    static defaultProps = {
        _id: 0
    }

    onLink = (link)=>
        new Promise((res, rej)=>
            this.props.actions.oneUpdate(this.props._id, { cover: [link] }, res, rej)
        )

    onFile = ()=>{

    }

    render() {
        return (
            <PickerIcon 
                {...this.props}
                onLink={this.onLink}
                onFile={this.onFile} />
        )
    }
}

export default connect(
	undefined,
	(dispatch)=>({
        actions: bindActionCreators(collectionsActions, dispatch)
    }),
)(CollectionChangeIcon)