import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import MobileDetect from 'mobile-detect'
import { getCurrentBrowser, scrollbarIsObtrusive } from './modules/strings'
import environment from './helpers/environment'
import keyvalStore from './stores/keyval'
import _ from 'lodash'

class Base extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

	onKeyvalChange(all) {
		var bodyClass = [], fontSize = "";
		_.each(all, function(val,key) {
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

    componentDidMount() {
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
            var env = getCurrentBrowser();
            for(var i in env)
                document.documentElement.classList.add(env[i]);

            if (scrollbarIsObtrusive())
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

        environment.onLoad();
        
        if (typeof document !== 'undefined')
        this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange);
    }

    componentWillUnmount() {
        if (typeof document !== 'undefined')
        this.unsubscribeKeyval();
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
		return (
            <DndProvider backend={HTML5Backend}>
                {this.props.children}
            </DndProvider>
        );
	}
}

export default Base