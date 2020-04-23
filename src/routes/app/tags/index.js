import React from 'react'
import t from '~t'

import MainWrap from '~co/columns/mainWrap'
import Init from './init'
import Empty from './empty'
import Loaded from './loaded'

import Pop from '~actions/pop'
import Toast from '~actions/toast'
import tagsActions from '~actions/tags'
import tagsStore from '~stores/tags'

class Main extends React.Component {
	displayName = "app/tags"

	constructor(props) {
		super(props);

		this.state = tagsStore.getState()
	}

	changeSelection = (val)=> {
		tagsActions.changeSelection(val);
	}

	selectAll = ()=>{
		tagsActions.selectAll();
	}

	unselectAll = ()=>{
		tagsActions.unselectAll();
	}

	removeItem = (tag)=>{
		tagsStore.onRemoveItem(tag)
			.then(()=>{
				Toast.show({title: t.s("removeSuccess")});
			})
			.catch(()=>{
				Toast.show({title: t.s("error"), status:"error"});
			})
	}

	updateItem = (obj)=>{
		tagsStore.onUpdateItem(obj)
			.then(()=>{
				Toast.show({title: t.s("saveSuccess")});
			})
			.catch(()=>{
				Toast.show({title: t.s("error"), status:"error"});
			})
	}

	removeSelected = ()=>{
		if (!confirm( `${t.s("remove")} ${this.state.selected.length} ${t.s("tags").toLowerCase()}?` ))
			return

		Pop.show('loading')

		tagsStore.onRemoveSelected()
			.then(()=>{
				Toast.show({title: t.s("removeSuccess")});
				Pop.close()
			})
			.catch(()=>{
				Toast.show({title: t.s("error"), status:"error"});
				Pop.close()
			})
	}

	mergeSelected = (e)=>{
		Pop.show("prompt", {
			pin: 'mergeSelectedTags',
			force: "vertical",

			title: t.s("newString")+" "+t.s("name").toLowerCase(),
			value: tagsStore.getTitleById(this.state.selected[0]),
			onSubmit: (newName)=>{
				if (!newName) return;

				Pop.show('loading')

				tagsStore.onMergeSelected(newName)
					.then(()=>{
						Toast.show({title: t.s("merge")});
						Pop.close()
					})
					.catch(()=>{
						Toast.show({title: t.s("error"), status:"error"});
						Pop.close()
					})
			}
		})
	}

	changeSort = (val)=>{
		tagsActions.changeSort(val)
	}

	onTagsChange = (state) => {
		this.setState(state)
	}

	componentDidMount() {
        this.unsubscribeTags = tagsStore.listen(this.onTagsChange);

        tagsStore.onLoad();
    }

    componentWillUnmount() {
        this.unsubscribeTags();
    }

	render() {
		switch(this.state.step){
			case "loaded":
				return <Loaded 
							{...this.props}
							{...this.state}
							changeSelection={this.changeSelection}
							selectAll={this.selectAll}
							unselectAll={this.unselectAll}
							removeItem={this.removeItem}
							updateItem={this.updateItem}
							removeSelected={this.removeSelected}
							mergeSelected={this.mergeSelected}
							changeSort={this.changeSort}
							sortingValues={tagsStore.getSortingValues()} />
			break;

			case "empty":
				return <Empty {...this.props} />
			break;

			default:
				return <Init {...this.props} />
			break;
		}
	}
}

export default MainWrap(Main)