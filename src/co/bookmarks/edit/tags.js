import React from 'react'
import ReactDom from 'react-dom'
import t from 't'
import Icon from 'icon'

import tagsStore from '../../../stores/tags'
import Pop from '../../../actions/pop'
import PopStore from '../../../stores/pop'
import _ from 'lodash'

export default class EditTags extends React.Component {
	displayName = "bookmarks/edit/tags"

	constructor(props) {
		super(props);

		this.state = {
			removeLast: false,
			query: "",
			items: (this.props.item||{}).tags||[]
		}

		this.prepareTagItem = this.prepareTagItem.bind(this);
		
		this.onTagsChange = this.onTagsChange.bind(this)
	}

	onTagsChange({items}) {
		this.setState({tags: items});
	}

	componentDidMount() {
		this.onTagsChange(tagsStore.getState())
        this.unsubscribeTags = tagsStore.listen(this.onTagsChange)

        tagsStore.onLoad()
    }

    componentWillUnmount() {
        this.unsubscribeTags();
    }

    prepareTagItem(item) {
        return {label: item.title || item._id, sublabel: item.count||"", click: ()=>{
            var elem = ReactDom.findDOMNode(this.refs.input);
            elem.focus();

            this.state.query = item.title || item._id;
            this.setState({query: this.state.query});
            this.onSubmit();
        }}
    }

    showContext(moreParams) {
    	var elem = ReactDom.findDOMNode(this.refs.input);
    	var query = (this.state.query||"").trim();

    	var items;
    	items = (this.state.tags||[]).map(this.prepareTagItem);

        if ((this.props.suggestedTags||[]).length){
            var suggestedItems = this.props.suggestedTags.sort().map((item)=>{
                return this.prepareTagItem({
                    _id: item,
                    count: "*"
                })
			});
			
            if ((suggestedItems||[]).length){
                suggestedItems.push({type: "separator"})
                items = suggestedItems.concat(items||[]);
            }
        }

    	items = (items||[]).filter((item)=>{
            if ((item.type||"")=="separator")
                return true;

    		if (this.state.items.indexOf(item.label)!=-1)
    			return false;

    		return (item.label.toLowerCase().indexOf(query.toLowerCase())!=-1)
		});
		
		if ((items||[]).length && items[0].type == 'separator')
			items.shift()

    	if ((items||[]).length==0)
			return Pop.close();
    	
    	var pos = elem.getBoundingClientRect();
    	Pop.show("contextMenu", Object.assign({
    		mousePosition: {
	    		x: pos.left-20,
	    		y: pos.top+elem.clientHeight
	    	},
	    	force: "vertical",
	    	items: items,
	    	keyboard: true,
	    	onSelect: (label)=>this.setState({query:label})
	    },moreParams||{}))
    }

    onSubmit(e) {
    	if (e) if(e.preventDefault) e.preventDefault();

    	var query = (this.state.query||"").replace(/\,/g,"").trim();
    	if (query=="") {
            if (typeof this.props.onEmptySubmit == "function")
                this.props.onEmptySubmit();
            return;
        }

    	var items = JSON.parse(JSON.stringify(this.state.items));
    	items.push(query);
    	items = _.uniq(items);

    	this.setState({items: items, query:""});
        this.saveChanges(items);
    }

    onClick() {
    	//if ((this.state.query||"").trim()=="") return;

    	if (PopStore.isShowing())
    		Pop.close();
    	else
    		this.showContext();
    }

    onDoubleClick() {
    	if ((this.state.query||"").trim()!="") return;

    	this.showContext();
    }

    onFocus() {
        if (this.props.autoFocus){
            setTimeout(()=>this.showContext(),100)
        }
    }

    onChange(e) {
    	this.state.query = e.target.value||"";
    	this.setState({query: this.state.query});

    	if (this.state.query.indexOf(',')==this.state.query.length-1)
    		this.onSubmit();

    	this.showContext();
    }

    onKeyDown(e) {
    	switch(e.keyCode) {
    		case 40: //down
    			this.showContext({selected:0});
    		break;

    		case 8://backspace
    			if (this.state.removeLast){
                    this.removeItem(this.state.items.length-1);
    				this.setState({removeLast:false});
    			}
    			else
    				this.setState({removeLast: (this.state.items.length>0)&&(!this.state.query)});
    		break;

    		default:
    			this.setState({removeLast:false});
    		break;
    	}
    }

    onBlur(e) {
        setTimeout(()=>{
            this.onSubmit();
            this.setState({removeLast:false, query:""})
        },200);
    }

    removeItem(index) {
        var items = JSON.parse(JSON.stringify(this.state.items));
        items.splice(index,1);

        this.setState({items: items});
        this.saveChanges(items);
    }

    saveChanges(items) {
        this.props.onChange(items);
    }

	render() {
		var className = "editTags";
		if (this.state.removeLast)
			className += " remove-last";

		var items = this.state.items.map((item,index)=>{
			return (<div key={index} className={"tag "+(index==this.state.items.length-1?"last":"")} onClick={this.removeItem.bind(this,index)}>
				{item}
                <Icon className="close" name="close" size="micro" />
			</div>)
		});

		return (
			<form className={className} onSubmit={this.onSubmit.bind(this)}>
                <Icon name="tag" className="tagIcon" />

				{items}

				<input id="bookmarkTags"
						ref="input"
						type="text"
						placeholder={t.s("addTag")+"..."}
						className="field"
						autoComplete="off"
                        autoFocus={this.props.autoFocus?true:false}
						value={this.state.query}
						onContextMenu={(e)=>{e.preventDefault();this.showContext()}}
                        onBlur={this.onBlur.bind(this)}
						onChange={this.onChange.bind(this)}
						onKeyDown={this.onKeyDown.bind(this)}
						onClick={this.onClick.bind(this)}
						onDoubleClick={this.onDoubleClick.bind(this)}
						onFocus={this.onFocus.bind(this)} />
			</form>
		);
	}
}