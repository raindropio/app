import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as collectionsActions from '~data/actions/collections'
import { makeTreeFlat, makeCollectionsStatus } from '~data/selectors/collections'

import Tree from './tree'

class CollectionsItems extends React.Component {
    static defaultProps = {
        uriPrefix:          '',
        selectedId:         undefined,
        options:            {}, //hideIds[], showGroups:true
        events:             {}  //onItemSelect, onGroupSelect
    }

    componentDidMount() {
        this.props.actions.changeDefaults({
			items: [
				{_id: 0, title: t.s('allBookmarks')},
				{_id: -1, title: t.s('defaultCollection--1')},
				{_id: -99, title: t.s('defaultCollection--99')}
			],
			groupTitle: t.s('myCollections')
        })
        
        this.props.actions.load()
    }

    componentDidUpdate({ selectedId, status }) {
        //expand tree to selected id
        if (selectedId != this.props.selectedId ||
            (status != this.props.status && this.props.status == 'loaded') )
            this.props.actions.expandTo(this.props.selectedId)
    }

    createNewCollection = (e)=>{
        let asChild = false
        if (e) {
            e.preventDefault()
            asChild = e.shiftKey ? true : false
        }

        this.props.actions.addBlank(this.props.selectedId, asChild)
    }

    render() {
        return <Tree {...this.props} />
    }
}

export default connect(
	() => {
        const getTree = makeTreeFlat()
        const getCollectionsStatus = makeCollectionsStatus()
    
        return (state, props)=>{
            const status = getCollectionsStatus(state)
    
            return {
                data: getTree(state, props),
                status
            }
        }
    },
	(dispatch)=>({
		actions: bindActionCreators(collectionsActions, dispatch)
    }),
    undefined,
    { forwardRef: true }
)(CollectionsItems)