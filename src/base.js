import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import isMobile from 'ismobilejs'
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
        if (typeof document !== 'undefined')
    	    document.documentElement.classList.add(isMobile(navigator.userAgent).phone ? 'mobile' : 'web')

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

	render() {
		return (
            <DndProvider backend={HTML5Backend}>
                {this.props.children}
            </DndProvider>
        );
	}
}

export default Base