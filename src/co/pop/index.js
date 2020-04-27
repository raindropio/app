import React from 'react'
import ReactDom from 'react-dom'
import isMobile from 'ismobilejs'

import Pop from '~actions/pop'
import PopStore from '~stores/pop'

var gap = 10;
var updateTimeout = null,
    attached = false;

var activeInactive = {};

import ViewPop from './view'
import PreviewPop from './preview'
import ReaderPop from './reader'
//import CollectionPop from './collection'
import ContextMenu from './contextMenu'

import NewCover from './newCover'
import Sharing from './collection/sharing'
import RSS from './collection/rss'
import CollectionsSortByTitle from './collectionsSortByTitle'

import Loading from './loading'
import Sort from './sort'
import Prompt from './prompt'

export default class PopView extends React.Component {
    displayName = "Pop/Pop"

    constructor(props) {
        super(props);

        this.state = {
            params: PopStore.getParams()
        }
    }

	componentDidMount() {
		this.unsubscribePop = PopStore.listen(this.onPopChange.bind(this));
        if (typeof window != "undefined"){
            //window.addEventListener("blur", this.windowBlur.bind(this));
    		window.addEventListener("resize", this.afterComponentsUpdate.bind(this));
            window.addEventListener("scroll", this.afterComponentsUpdate.bind(this));
            window.addEventListener("wheel", this.afterComponentsUpdate.bind(this));
        }
	}

	componentWillUnmount() {
        if (this.unsubscribePop)
        this.unsubscribePop();
        if (typeof window != "undefined"){
            //window.removeEventListener("blur", this.windowBlur.bind(this));
            window.removeEventListener("resize", this.afterComponentsUpdate.bind(this));
            window.removeEventListener("scroll", this.afterComponentsUpdate.bind(this));
            window.removeEventListener("wheel", this.afterComponentsUpdate.bind(this));
        }
    }

    onPopChange(params) {
    	var _this = this;

    	if (params == false){
    		//document.body.classList.add("pop-mode-will-close");
    		//setTimeout(function(){
                /*if (!activeInactive[this.state.params.pin]){
                    var pin = document.getElementById(this.state.params.pin);
                    if (pin) pin.classList.remove('active');
                }*/

    			_this.setState({params: params});
    		//	document.body.classList.remove("pop-mode-will-close");
    		//},200);
    	}else{
    		this.setState({params: params});

            /*var pin = document.getElementById(params.pin);
            if (pin){
                activeInactive[params.pin] = pin.classList.contains('active');

                if (!activeInactive[params.pin])
                    pin.classList.add('active');
            }*/
        }
    }

    windowBlur() {
        if (!__DEV__)
            Pop.close();
    }

    afterComponentsUpdate() {
        this.updatePosition();
    	//clearTimeout(updateTimeout);
    	//updateTimeout = setTimeout(this.updatePosition, 0);
    }

    updatePosition() {
        if (isMobile(navigator.userAgent).phone) return;
        
    	var body = ReactDom.findDOMNode(this.refs.body);
    	if (!body) return;

        if (this.state.params.width)
            body.style.width=this.state.params.width+"px";

        var windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;

    	var positions = [],
            points = {},
    		havePlace = ((body.offsetWidth < windowWidth)&&(body.offsetHeight < windowHeight)),
    		pinVisible = false,
    		dir = "";

    	var pin = (typeof document !== 'undefined' ? document.getElementById(this.state.params.pin) : {});
        var rect = {top:0,left:0};

    	//Possible positions
    	if (pin){
    		rect = pin.getBoundingClientRect();
    	}else if (this.state.params.mousePosition) {
            rect.left = this.state.params.mousePosition.x;
            rect.top = this.state.params.mousePosition.y;
            pin = {
                offsetWidth: 0,
                offsetHeight: 0
            }
        }

        if (pin){
            pinVisible = (((windowHeight + window.pageYOffset) > (rect.top+window.scrollY)) && ((window.pageYOffset - window.innerHeight) < (rect.top + window.scrollY + pin.offsetHeight) ));

            if ((body.offsetHeight < rect.top)&&(havePlace)&&(pinVisible)){
                points.top = rect.top;
                positions.push("top");
            }

            if ((body.offsetWidth < rect.left)&&(havePlace)&&(pinVisible)){
                points.left = rect.left;
                positions.push("left");
            }

            if (((rect.left + pin.offsetWidth + body.offsetWidth) < windowWidth)&&(havePlace)&&(pinVisible)){
                points.right = windowWidth - (rect.left + pin.offsetWidth);
                positions.push("right");
            }

            if (((rect.top + pin.offsetHeight + body.offsetHeight) < windowHeight)&&(havePlace)&&(pinVisible)){
                points.bottom = windowHeight - (rect.top + pin.offsetHeight);
                positions.push("bottom");
            }
        }

    	if ((havePlace)/*&&(pinVisible)*/) {
    		positions.push("center");
            points.center = 0;
        }

        var max = -1;

        if (this.state.params.force == "vertical") {
            if (points.bottom)
                points.bottom+=10000;
            else if (points.top)
                points.top+=10000;
        } else if (this.state.params.force == "horizontal") {
            if (points.left)
                points.left+=10000;
            else if (points.right)
                points.right+=10000;
        }

        for(var i in points)
            if (points[i]>max){
                max = points[i];
                dir = i;
            }

        /*if (dir==""){
            Pop.close();
            return;
        }*/

    	//Make magic
    	//body.removeAttribute("style");
    	body.setAttribute("data-dir", dir);
        body.setAttribute("data-is-mouse", (this.state.params.mousePosition?true:false));

    	switch(dir) {
    		case "top":
    			body.style.bottom = parseInt(windowHeight - rect.top - gap)+"px";
                body.style.top = "";
    		break;

    		case "bottom":
    			body.style.top = parseInt(rect.top + pin.offsetHeight)+"px";// - gap
                body.style.bottom = "";
    		break;

    		case "left":
    			body.style.right = parseInt(windowWidth - rect.left + gap)+"px";
                body.style.left = "";
    		break;

    		case "right":
    			body.style.left = parseInt(rect.left + pin.offsetWidth - gap)+"px";
                body.style.right = "";
    		break;

    		case "center":
    			body.style.left = parseInt((windowWidth / 2) - (body.offsetWidth/2))+"px";
    			body.style.top = parseInt((windowHeight / 2) - (body.offsetHeight/2)) + "px";
                body.style.right = "";
                body.style.bottom = "";
    		break;

    		default:
    			body.style.left = 0;
    			body.style.top = 0;
                body.style.right = "";
                body.style.bottom = "";
    		break;
    	}


    	var arrow = ReactDom.findDOMNode(this.refs.arrow);
    	//arrow.removeAttribute("style");
    	switch(dir) {
    		case "left":
    		case "right":
    			var tempTop = parseInt(rect.top + (pin.offsetHeight/2) - (body.offsetHeight/2));
    			if ((tempTop+body.offsetHeight) > windowHeight)
    				tempTop = windowHeight - body.offsetHeight - gap;
    			if (tempTop<0) tempTop = gap;
    			body.style.top = tempTop + "px";

    			arrow.style.top = parseInt( rect.top - tempTop + (pin.offsetHeight/2) + 5 )+"px";
                arrow.style.left = "";
    		break;

    		case "top":
    		case "bottom":
    			var tempLeft = parseInt(rect.left + (pin.offsetWidth/2) - (body.offsetWidth/2));

                //mouse left
                if (this.state.params.mousePosition)
                    tempLeft = parseInt(rect.left + 1);

    			if ((tempLeft+body.offsetWidth) > windowWidth)
    				tempLeft = windowWidth - body.offsetWidth - gap;
    			if (tempLeft<0)
    				tempLeft = gap;
    			body.style.left = tempLeft + "px";

    			arrow.style.left = parseInt(rect.left - tempLeft + (pin.offsetWidth/2) + 5)+"px";
                arrow.style.top = "";
    		break;
    	}
    }

    componentDidUpdate() {
    	this.afterComponentsUpdate();
    	//body.offsetWidth;
    }

    canCloseSmoothly() {
        return (this.state.params.name!="loading");
    }

    handleBeyondClick(e) {
        var body = ReactDom.findDOMNode(this.refs.body);
        if (!body) return;

        var rect = body.getBoundingClientRect();

        var mouseOver = ((e.clientX > rect.left) && (e.clientX < (rect.left+body.offsetWidth)) && (e.clientY > rect.top) && (e.clientY < (rect.top+body.offsetHeight)));

		//if (e.target.id=="pop-body-black")
        if (!mouseOver)
            if (this.canCloseSmoothly())
			 Pop.close();
	}

    handleGlobalKeyPress(e) {
        if (e.keyCode==27)
            if (this.canCloseSmoothly())
                Pop.close();
    }



	render() {
		if (!this.state.params){
            //if ((window.environment||[]).indexOf("clipper")!=-1)
            if (typeof document !== 'undefined'){
                document.body.classList.remove("pop-mode");
                document.body.removeEventListener("mousedown", this.handleBeyondClick.bind(this));
                document.removeEventListener("keyup", this.handleGlobalKeyPress.bind(this));
            }

            attached = false;
			return null;
		}

        var bodyBlack = null;
        var showBodyBlack = false;
        if (
            (!this.canCloseSmoothly())||
            (document.documentElement.classList.contains('mobile'))
        )
            showBodyBlack = true;

        if (showBodyBlack) {
            if (typeof document !== 'undefined') 
                document.body.classList.add("pop-mode");
            bodyBlack = <div id="pop-body-black" onMouseDown={this.handleBeyondClick.bind(this)}></div>;
        }

        if (!attached){
            attached = true;

            if (typeof document !== 'undefined'){
                document.body.addEventListener("mousedown", this.handleBeyondClick.bind(this));
                document.addEventListener("keyup", this.handleGlobalKeyPress.bind(this));
            }
        }

		var Component = null;
		switch(this.state.params.name){
            //case "collection": Component = CollectionPop; break;
            case "view": Component = ViewPop; break;
            case "preview": Component = PreviewPop; break;
            case "reader": Component = ReaderPop; break;
            case "contextMenu": Component = ContextMenu; break;

            case "newCover": Component = NewCover; break;
            case "rss": Component = RSS; break;
            case "sharing": Component = Sharing; break;
            case "collectionsSortByTitle": Component = CollectionsSortByTitle; break;

            case "loading": Component = Loading; break;
            case "sort": Component = Sort; break;
            case "prompt": Component = Prompt; break;
		}

		return (
			<div key="pop">
				{bodyBlack}
				<div id="pop-body" data-name={this.state.params.name} data-is-closing={this.state.params.isClosing?true:false} ref="body">
					<div id="pop-arrow" ref="arrow"></div>
					<div className="overflow-scroll">
						{Component ? <Component {...this.state.params} onUpdate={this.afterComponentsUpdate.bind(this)} /> : null}
					</div>
				</div>
			</div>
		);
	}
};