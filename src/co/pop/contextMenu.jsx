import React from 'react'
import ReactDom from 'react-dom'

import Pop from '../../actions/pop'

var mouseOver = false;

export default class ContextMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: (typeof props.selected != "undefined" ? props.selected : -1)
		}
	}

	componentDidMount() {
		this.onWheel = this.onWheel.bind(this);
		this.onKey = this.onKey.bind(this);

		if (typeof window != "undefined"){
			window.addEventListener("wheel", this.onWheel, true);
			window.addEventListener("keydown", this.onKey, true);
		}

		if (this.props.items[this.state.selected])
			this.props.onSelect(this.props.items[this.state.selected].label);
	}

	componentWillUnmount() {
		if (typeof window != "undefined"){
			window.removeEventListener("wheel", this.onWheel, true);
			window.removeEventListener("keydown", this.onKey, true);
		}
	}

	onKey(e) {
		switch(e.keyCode) {
			case 38://top
				if (this.scrollTo('top')) {e.preventDefault(); e.stopPropagation();}
			break;

			case 40://bottom
				if (this.scrollTo('bottom')) {e.preventDefault(); e.stopPropagation();}
			break;

			case 13://enter
				//if (this.state.selected)
					Pop.close();
			break;

			case 27://esc
				e.preventDefault();
				e.stopPropagation();
				Pop.close();
			break;
		}
	}

	scrollTo(dir) {
		//if (!this.props.keyboard) return false;

		var selected = 0;
		if (dir=="bottom")
			selected = this.state.selected+1;
		else
			selected = this.state.selected-1;

		if (selected<-1) selected=-1;
		if (selected>this.props.items.length-1) selected = this.props.items.length-1;

		if (this.props.onSelect)
			this.props.onSelect(selected>=0 ? this.props.items[selected].label : "");

		this.setState({selected: selected});

		//scroll overflow div
		var wrap = ReactDom.findDOMNode(this.refs.list).parentNode;

		if (selected>=0){
			var elem = ReactDom.findDOMNode(this.refs["item"+selected]);
			if (elem){ 
				var offset = elem.offsetTop;

				if (((offset-wrap.scrollTop+elem.clientHeight) > wrap.clientHeight)&&(dir=="bottom"))
					wrap.scrollTop = wrap.scrollTop + elem.clientHeight;
				else if ((offset<wrap.scrollTop)&&(dir=='top'))
					wrap.scrollTop = offset;
			}
	    }else{
	    	wrap.scrollTop = 0;
	    	Pop.close();
	    }

		return true;
	}

	onWheel(e) {
		if (!mouseOver){
			e.preventDefault();
			e.stopPropagation();
		}
	}

	componentDidUpdate() {
        this.props.onUpdate();
    }

	render() {
		var items = this.props.items.map((item,index)=>{
			switch(item.type||"") {
				case "separator":
					return <span key={index} className="separator"></span>
				break;

				default:
					var content = (
						<span ref={"item"+index} className={"contextMenuItem "+(this.state.selected==index ? "active" : "")}>
							{item.icon}
							<span className="title">{item.label}</span>
							<span className="sublabel">{item.sublabel}</span>
						</span>
					);

					if (item.href)
						return <a key={index} href={item.href} onClick={(e)=>{Pop.close()}} target="_blank" className="contextMenuItemWrap">{content}</a>;
					else
						return <span key={index} onClick={(e)=>{Pop.close(); item.click(e)}} className="contextMenuItemWrap">{content}</span>;
				break;
			}
		});

		var className = "contextMenuList";
		//if ((items||[]).length>=15)
		//	className+=" two-columns";

		return (
			<div className={className} ref="list" onMouseOver={()=>mouseOver=true} onMouseLeave={()=>mouseOver=false}  onContextMenu={(e)=>e.preventDefault()}>
				{items}
			</div>
		);
	}
}