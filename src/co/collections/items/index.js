import s from './index.module.styl'
import React from 'react'
import t from '~t'
import _ from 'lodash-es'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as collectionsActions from '~data/actions/collections'
import { makeTreeFlat, makeCollectionsStatus, selectMode, getBlankId } from '~data/selectors/collections'

import withPause from '~co/common/withPause'
import Tree from './tree'
import SelectMode from './selectMode'

class CollectionsItems extends React.Component {
    static defaultProps = {
        activeId:           undefined, //string||number||array
        options:            {}, //hideIds[], showGroups:true, search:''
        getLink:            undefined,
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
			groupTitle: _.capitalize(t.s('collectionsCount'))
        })
        
        this.props.actions.load()

        window.addEventListener('focus', this.refresh)
    }

    componentDidUpdate({ activeId, status }) {
        //expand tree to active id
        if (activeId != this.props.activeId ||
            (status != this.props.status && this.props.status == 'loaded') )
            if (typeof this.props.activeId != 'object')
                this.props.actions.expandTo(this.props.activeId)

        //reset selection when active change
        if (activeId != this.props.activeId)
            this.props.actions.unselectAll()
    }

    componentWillUnmount() {
        this.props.actions.unselectAll()

        window.removeEventListener('focus', this.refresh)
    }

    refresh = ()=>
        this.props.actions.refresh()

    createNewCollection = (e)=>{
        let asChild = false
        if (typeof e == 'object' && e.preventDefault) {
            e.preventDefault()
            asChild = e.shiftKey ? true : false
        }

        if (typeof this.props.activeId != 'object')
            this.props.actions.addBlank(this.props.activeId, asChild)
    }

    render() {
        const { selectMode, activeId, ...etc } = this.props

        return (
            <div className={s.wrap} role='list'>
                <SelectMode 
                    selectMode={selectMode}
                    {...etc} />
                    
                <Tree 
                    {...etc}
                    activeId={selectMode.enabled ? selectMode.ids : activeId}
                    data={this.props.data} />
            </div>
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
                status,
                selectMode: selectMode(state),
                blankId: getBlankId(state)
            }
        }
    },
    (dispatch)=>({
        actions: bindActionCreators(collectionsActions, dispatch)
    }),
    undefined,
    { forwardRef: true }
)(withPause(CollectionsItems))