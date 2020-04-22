import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import MobileDetect from 'mobile-detect'
import strings from './modules/strings'
import environment from './helpers/environment'

if (typeof document !== 'undefined')
    var keyvalStore = require('./stores/keyval')

const _each = require('lodash/forEach');

class Base extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.pathName(props);
    }

	onKeyvalChange(all) {
		var bodyClass = [], fontSize = "";
		_each(all, function(val,key) {
			if (key.indexOf('mode')==0)
				bodyClass.push(key);
            else if (key=="font-size")
                fontSize = val;
		});

        if (typeof document !== 'undefined'){
    		document.body.setAttribute('class', bodyClass.join(' '));
            document.documentElement.setAttribute('font-size',fontSize);
        }
    }

    componentWillMount() {
        var md = new MobileDetect((typeof window != "undefined" ? window.navigator.userAgent : null));

        if (typeof document !== 'undefined')
    	document.documentElement.classList.add(md.mobile() ? 'mobile' : 'web');
        
        if (md.is('iOS')){
            if (typeof window !== "undefined"){
                window.addEventListener("resize", this.setViewportHeight.bind(this), false);
                window.addEventListener("scroll", this.setViewportHeight.bind(this), false);
                window.addEventListener("orientationchange", this.setViewportHeight.bind(this), false);
            }
            this.setViewportHeight();
        }

        if (typeof document !== 'undefined'){
            var env = strings.getCurrentBrowser();
            for(var i in env)
                document.documentElement.classList.add(env[i]);

            if (strings.scrollbarIsObtrusive())
                document.documentElement.classList.add('scrollbar-obtrusive')
        }

        //is retina display?
        if (typeof window !== "undefined")
        if (window.devicePixelRatio && devicePixelRatio >= 2)
            if (typeof document !== 'undefined')
                document.documentElement.classList.add('retina');

        if (environment.isClipper())
            document.documentElement.classList.add('clipper');

        this.onKeyvalChange(keyvalStore.onAll())
    }

    componentDidMount() {
        environment.onLoad();
        
        if (typeof document !== 'undefined')
        this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange);
    }

    componentWillUnmount() {
        if (typeof document !== 'undefined')
        this.unsubscribeKeyval();
    }

    pathName(props) {
        var routeName = "";
        try{
            var names = [];
            props.routes.forEach((route)=>{
                if (typeof route.name != "undefined")
                    if (route.name)
                        names.push(route.name);
            });
            routeName = names.join('/');
        } catch(e) {}
        document.body.setAttribute('data-route', routeName);
    }

    componentWillReceiveProps(nextProps) {
        this.pathName(nextProps);
    }

    setViewportHeight(){
        function debounced(){
            if (typeof document !== 'undefined'){
                document.documentElement.style.height = window.innerHeight + "px";
                if (document.body.scrollTop !== 0) {
                    window.scrollTo(0, 0);
                }
            }
        }
        var cancelable = null;

        return function(){
            cancelable && clearTimeout(cancelable);
            cancelable = setTimeout(debounced, 100);
        };
    }

	render() {
		return this.props.children;
	}
}

export default DragDropContext(HTML5Backend)(Base);