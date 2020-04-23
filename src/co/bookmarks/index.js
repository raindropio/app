import React from 'react'
import t from '~t'
import S from 'string'

import isToday from 'date-fns/isToday'
import isYesterday from 'date-fns/isYesterday'
import isThisWeek from 'date-fns/isThisWeek'
import isThisYear from 'date-fns/isThisYear'

import keyvalActions from '~actions/keyval'
import keyvalStore from '~stores/keyval'

import listItem from './item/list'
import simpleItem from './item/simple'
import gridItem from './item/grid'
import Section from './section'
import Masonry from 'react-masonry-component'

export default class Items extends React.Component {
	displayName = "bookmarks/index"

	constructor(props) {
		super(props);

		var reader = (keyvalStore.onGet('mode-reader')||{});

		this.state = {
			gridSize: keyvalStore.onGet('grid-size')||2,
			listCoverSize: keyvalStore.onGet('list-cover-size')||0,
			activeElement: reader.id,
			isEditMode: (reader.tab == "edit"),
			anim: false
		}
	}

	openReader(_id) {
		var params = Object.assign(keyvalStore.onGet("mode-reader")||{}, {});

		keyvalActions.set('mode-reader', {
			id: parseInt(_id),
			tab: (params.tab=="edit"?"edit":"")
		});
	}

	closeReader() {
		keyvalActions.remove('mode-reader');
	}


	onKeyvalChange(all) {
		var gridSize = keyvalStore.onGet('grid-size')||2;
		if (this.state.gridSize != gridSize)
			this.setState({gridSize: gridSize});

		var listCoverSize = keyvalStore.onGet('list-cover-size')||0;
		if (this.state.listCoverSize != listCoverSize)
			this.setState({listCoverSize: listCoverSize});

		var reader = (keyvalStore.onGet('mode-reader')||{});

		var activeElement = reader.id;
		if (this.state.activeElement != activeElement)
			this.setState({activeElement: activeElement});

		var isEditMode = (reader.tab == "edit");
		if (this.state.isEditMode != isEditMode)
			this.setState({isEditMode: isEditMode});

		setTimeout(()=>{if (this.refs.masonry) {this.refs.masonry.masonry.layout()}},300);
	}

	componentDidMount() {
        this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribeKeyval();
    }

    componentDidUpdate() {
    	if (this.refs.masonry)
    		this.refs.masonry.masonry.layout()
    }

    onImageLoaded() {
    	if (this.refs.masonry)
    		this.refs.masonry.masonry.layout()
	}

	makeItem = (view, item,index)=>{
		var Renderer
		switch(view) {
			case "grid":
			case "masonry":
				Renderer = gridItem;
			break;
			case "simple":
				Renderer = simpleItem;
			break;
			default:
				Renderer = listItem;
			break;
		}

		var coverWidth = false;
		if (this.state.gridSize>=4)
			coverWidth = 460;

		return <Renderer
						key={item._id}
						activeId={this.state.activeElement}
						isEditMode={this.state.activeElement == item._id ? this.state.isEditMode : false}
						isFirst={index==0}
						index={index}
						view={view}
						item={item}
						sort={this.props.sort}
						withColor={this.props.withColor}
						author={this.props.author}
						spaceId={this.props.spaceId}
						coverWidth={coverWidth}
						appendQuery={this.props.appendQuery}
						selectModeEnabled={this.props.selectMode}
						onClick={this.openReader}
						onEsc={this.closeReader}
						onImageLoaded={this.onImageLoaded.bind(this)} />;
	}

	renderList = (view)=>{
		var lastSection = null, currentSection = null, firstValue = 0, step=0, itFirstSection = true;

		return (this.props.items||[]).map((item, itterIndex)=>{
			var element = this.makeItem(view, item, itterIndex);

			if (this.props.sort!="-sort" || this.props.sort!="sort") {
				var html = [element];
				var sectionClassName = ''

				switch(this.props.sort){
					case "-created":
					case "created":{
						const created = new Date(item.created || item.lastUpdate)
						currentSection = created.getMonth()

						//today
						if (isToday(created))
							currentSection = "today";
						//yesterday
						else if (isYesterday(created))
							currentSection = "yesterday";
						//week
						else if (isThisWeek(created))
							currentSection = "this_week";
						//year
						else if (!isThisYear(created))
							currentSection = created.getYear()
					}
					break;
					case "title":
					case "-title":
						currentSection = "—";
						try {
							currentSection = item.title.trim().toUpperCase().substr(0, 1);
						}catch(e){}

						if (S(currentSection).isNumeric())
							currentSection = "#";
					break;
					case "domain":
					case "-domain":
						currentSection = item.domain;
					break;

					case "score":
						currentSection = (item.collection.$id == this.props.spaceId) ? 'current' : 'other'
					break;
				}

				if (currentSection != lastSection) {
					var sectionObj = {};
					lastSection = currentSection;

					switch(this.props.sort) {
						case "-created":
						case "created":
							switch(currentSection){
								case 'today':
								case 'yesterday':
								case 'this_week':
									sectionObj = {type: "text", value: t.s(currentSection)};
								break;

								default:
									sectionObj = {type: "date", value: item.created || item.lastUpdate};
								break;
							}
						break;

						case "title":
						case "domain":
						case "-title":
						case "-domain":
							sectionObj = {type: "text", value: lastSection};
						break;

						case "score":
							switch(lastSection) {
								case 'current':
									sectionObj = {type: "text", value: t.s('found')+' '+t.s('in')+' "'+this.props.title+'"'}
								break
								case 'other':
									sectionObj = {
										type: "text",
										value: this.props.spaceId ? t.s('found')+' '+t.s('in')+' '+t.s('other')+' '+t.s('collectionsCount') : t.s('everywhere')
									}
									sectionClassName = 'other'

									if (itFirstSection && this.props.spaceId){
										html.unshift(
											<Section item={sectionObj} className={sectionClassName} key={"books_sec_notihng-"+sectionObj.value} />
										)
										sectionObj = {type: "text", value: t.s('nothingFound')+' '+t.s('inCollection')}
										sectionClassName = ''
									}
									
								break
							}
						break;
					}

					html.unshift(
						<Section item={sectionObj} className={sectionClassName} key={"books_sec_"+sectionObj.value} />
					);

					itFirstSection = false;
				}

				return html;
			}
			else
				return element;
		});
	}

	render() {
		var view = this.props.view||"list";

		var commonClass = " view-grid-size-"+this.state.gridSize+" view-list-cover-size-"+this.state.listCoverSize+" view-sort-"+this.props.sort;
		if (this.props.selectMode)
			commonClass += " select-mode";

		if (view=="masonry"){
			//<div className="sectionName"></div>{this.props.count}&nbsp;{t.s("elements2")}
			return (
				<div>
					<Masonry ref="masonry" className={"view-masonry"+commonClass} elementType="article" options={{transitionDuration: "0"}} onContextMenu={(e)=>e.preventDefault()}>
						{(this.props.items||[]).map((item,index)=>this.makeItem(view,item,index))}
					</Masonry>
				</div>
			);
		}
		else{
			return (
				<div className={"elements view-"+view+commonClass} onContextMenu={(e)=>e.preventDefault()}>
					{this.renderList(view)}
				</div>
			);
		}
	}
}