import React from 'react'
import ReactDom from 'react-dom'

import PopComponent from '../pop'
import Toasts from '../common/toast'

import keyvalStore from '../../stores/keyval'

export default function(Component, params={}) {
	return class LayoutWrap extends React.Component {
		displayName = "columns/layoutWrap"

		constructor(props) {
			super(props);

			try{
				if (!keyvalStore.onGet("theme") && matchMedia('(prefers-color-scheme: dark)').matches)
					keyvalStore.onSet("theme", 'dark themeDark', true)
			} catch(e) {}

			this.state = {
	        	theme: keyvalStore.onGet("theme")||'default',
	        };

	        this.onWindowResize = this.onWindowResize.bind(this);
			this.onWindowFocus = this.onWindowFocus.bind(this);
			this.onWindowBlur = this.onWindowBlur.bind(this);
		}

		onKeyvalChange(all) {
			var theme = keyvalStore.onGet('theme')||'default';
			if (this.state.theme != theme)
				this.setState({theme: theme});
		}

		componentDidMount() {
			if (typeof window != "undefined"){
				window.addEventListener("resize", this.onWindowResize, true);
				window.addEventListener("orientationchange", this.onWindowResize);
				window.addEventListener("focus", this.onWindowFocus);
				window.addEventListener("blur", this.onWindowBlur);
			}

			this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange.bind(this));
		}

		componentWillUnmount() {
			if (typeof window != "undefined"){
				window.removeEventListener("resize", this.onWindowResize, true);
				window.removeEventListener("orientationchange", this.onWindowResize);
				window.removeEventListener("focus", this.onWindowFocus);
				window.removeEventListener("blur", this.onWindowBlur);
			}

			if (this.unsubscribeKeyval) this.unsubscribeKeyval();
		}

		onWindowResize() {
			var markupElem = ReactDom.findDOMNode(this.refs.markup);
			if (markupElem){
				markupElem.classList.add("disable-layout-transition");
				clearTimeout(this.resizeTimeout);

				this.resizeTimeout = setTimeout(()=>{
					var markupElem = ReactDom.findDOMNode(this.refs.markup);
					if (markupElem)
					markupElem.classList.remove("disable-layout-transition");
				},400);
			}
		}

		onWindowFocus() {
			if (typeof document !== 'undefined')
				document.documentElement.classList.remove("blur");
		}

		onWindowBlur() {
			if (typeof document !== 'undefined')
				document.documentElement.classList.add("blur");
		}

		render() {
			var className;
			if (!params.disableTheme)
				className = "theme-sidebar-"+this.state.theme;

			return (
				<div id="markup" ref="markup" key="pageMarkup" className={className}>
					<span id="js_markup_status" />

					<Component
						{...this.props} />

					<Toasts /><PopComponent/>
				</div>
			);
		}
	}
}