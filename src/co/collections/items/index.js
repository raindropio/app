import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as collectionsActions from '~data/actions/collections'
import { makeTreeFlat, makeCollectionsStatus } from '~data/selectors/collections'

import withPause from '~co/common/withPause'
import Tree from './tree'

class CollectionsItems extends React.Component {
    static defaultProps = {
        uriPrefix:          '',
        activeId:           undefined,
        options:            {}, //hideIds[], showGroups:true, search:''
        events:             {}, //onItemClick, onGroupClick
        
        customRows:         undefined, //[] additional items in tree
        customRowRenderer:  undefined, //(row) renderer for additional items
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

    componentDidUpdate({ activeId, status }) {
        //expand tree to active id
        if (activeId != this.props.activeId ||
            (status != this.props.status && this.props.status == 'loaded') )
            this.props.actions.expandTo(this.props.activeId)
    }

    createNewCollection = (e)=>{
        let asChild = false
        if (e) {
            e.preventDefault()
            asChild = e.shiftKey ? true : false
        }

        this.props.actions.addBlank(this.props.activeId, asChild)
    }

    render() {
        const { ...etc } = this.props

        return (
            <Tree 
                {...etc}
                data={this.props.data} />
        )
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
)(withPause(CollectionsItems))