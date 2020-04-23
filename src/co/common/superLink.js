import React from 'react'
import ReactDom from 'react-dom'

var helpers = {
	bind() {
		if (!this.binded){
			//document.addEventListener('focus', this.blurAll, true);
			this.binded=true;
		}
	},

	blurAll(e) {
		var forceBlur = false, selector = '[data-is-focus="true"] .superLink';
		if (e.target.tagName=="INPUT") forceBlur=true;
		if (e.target.tagName=="TEXTAREA") forceBlur=true;
		if ((e.target.tagName=="A")&&(e.target.classList.contains('superLink'))) forceBlur=true;

		if (!forceBlur)
			selector = ":not(.active)"+selector;
		
		var elems = document.querySelectorAll(selector);
		for(var i in elems)
			if (elems[i].parentElement)
				elems[i].parentElement.removeAttribute("data-is-focus");
	}
}

export default class SuperLink extends React.Component {
	displayName = "common/superLink"

	componentDidMount() {
		helpers.bind()
		window.addEventListener('blur', this.onWindowBlur);
		window.addEventListener('focus', this.onWindowFocus);
	}

	componentWillUnmount() {
		window.removeEventListener('blur', this.onWindowBlur);
		window.removeEventListener('focus', this.onWindowFocus);
	}

	onWindowBlur = (e)=>{
		var elem = ReactDom.findDOMNode(this.refs.link).parentElement;
		if (!elem) return;

		if (elem.getAttribute('data-is-focus')=="true"){
			this.needRefocus = true;
			elem.removeAttribute('data-is-focus');
		}else
			this.needRefocus = false;
	}
	onWindowFocus = (e)=>{
		if (this.needRefocus){
			var elem = ReactDom.findDOMNode(this.refs.link).parentElement;
			if (!elem) return;
			
			elem.setAttribute("data-is-focus","true");
		}
	}

	onFocus = (e)=>{
		try{e.target.parentElement.setAttribute("data-is-focus","true");}catch(e){}
	}

	onBlur = (e)=>{
		/*try{e.target.parentElement.removeAttribute("data-is-focus");}catch(e){}*/
	}

	onMouseDown = (e)=>{
		
	}

	onDoubleClick = (e)=>{
		if (typeof this.props.onDoubleClick == "function")
			this.props.onDoubleClick(e);
		else
			if (e.target.getAttribute('href'))
				window.open(e.target.href)
	}

	onKey = (e)=>{
		switch(e.keyCode){
			case 38: //top
			case 37: //left
				if (!this.scrollTo("top",e,this))
					e.preventDefault();
			break;

			case 40: //bottom
			case 39: //right
				if (!this.scrollTo("bottom",e,this))
                	e.preventDefault();
            break;

            case 27: //esc
            	if (this.props.onEsc)
            		this.props.onEsc();
            break;

            case 13: //enter
            	if (this.props.onEnter)
            		this.props.onEnter();
            break;

            default:
            	if (this.props.onKey)
            		return this.props.onKey(e);
            break;

            /*case 9: //tab
            	if ((e.shiftKey)&&(this.props.tabPrev)){
            		if (this.tab(this.props.tabPrev,e,this))
            			e.preventDefault();
            	}
            	else if (this.props.tabNext){
            		if (this.tab(this.props.tabNext,e,this))
            			e.preventDefault();
            	}
            break;*/
		}
	}

	tab = (next, e)=>{
		var nextElem = document.querySelectorAll("."+next+".active");
		if (nextElem.length==0)
			nextElem = document.querySelectorAll("."+next);
		//if (nextElem.getElementsByClassName(".active"))
		//	nextElem = nextElem.getElementsByClassName(".active");

		if (!nextElem[0]) return false;

		if (nextElem[0].tagName.toLowerCase()=="input")
			nextElem = nextElem[0];
		else
			nextElem = nextElem[0].getElementsByClassName('superLink')[0];

		if (!nextElem) return false;
		nextElem.focus();
		return true;
	}

	scrollTo = (dir, e)=>{
		if (!this.props.navPrefix) return false;

		var elements = document.querySelectorAll('.'+this.props.navPrefix+":not(.no-focus)");
		var nodeList = Array.prototype.slice.call( elements );
		var index = nodeList.indexOf( e.target.parentElement );

		var next = index+1;
		if (dir=="top") next = index-1;

		var nextElem = elements[next];
		if (!nextElem) return false;
		nextElem = nextElem.getElementsByClassName('superLink')[0];

		nextElem.focus();
		if (!this.props.onlyFocus)
			nextElem.click();
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.href != nextProps.href)
			return true;

		if (this.props.className != nextProps.className)
			return true;

		if (this.props.tabIndex != nextProps.tabIndex)
			return true;

		return false;
	}

	render() {
		//tabIndex="-1"
		return <a 	ref="link"
					href={this.props.href}
					tabIndex={typeof this.props.tabIndex == 'undefined' ? '-1' : this.props.tabIndex}
					onClick={this.props.onClick}
					onDoubleClick={this.onDoubleClick}
					className={this.props.className+" superLink"}
					target={this.props.target}
					onMouseDown={this.onMouseDown}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					onKeyDown={this.onKey}
					onContextMenu={this.props.onContextMenu} />;
	}
}