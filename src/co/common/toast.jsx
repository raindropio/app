import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Toasts from '../../actions/toast'
import ToastStore from '../../stores/toast'

import Icon from 'icon'

const isElectron = false; //strings.getCurrentBrowser().indexOf("electron")!=-1;

export default class Toast extends React.Component {
	displayName = "common/Toast"

	constructor(props) {
		super(props);
		this.state = {items: ToastStore.getToasts()}
	}

	onToastsChange(toasts) {
        this.setState({items:toasts});
    }

    componentDidMount() {
        this.unsubscribeToast = ToastStore.listen(this.onToastsChange.bind(this));
    }

    componentWillUnmount() {
        if (this.unsubscribeToast)
            this.unsubscribeToast();
    }

    handleCloseItem(e) {
        Toasts.close({id: e.target.getAttribute("data-id")});
    }

    handleStopTimer(e) {
        //Toasts.stopTimer({id: e.target.getAttribute("data-id")});
    }

	render() {
        if (isElectron) return null;
        
		var _this = this;

        var items = this.state.items.map(function(item){
            var title = null;
            if (item.title)
                title = <div className="title"><strong>{item.title}</strong></div>;

            var icon = "info";
            if (item.status||"" == "error")
                icon = "close";

            return (
                <li key={"toast_"+item.id} data-id={item.id} id={"toast-"+item.id} onMouseEnter={_this.handleStopTimer.bind(_this)} onClick={_this.handleCloseItem.bind(_this)}>
                    <div className={"item-wrap status-"+item.status||""}>
                        <div>
                            {title}
                            
                        </div>
                        <div className="excerpt">{item.text}</div>
                    </div>
                </li>
            );
        });

        return (
            <div id="app-toast">
            <ReactCSSTransitionGroup component="ul" transitionName="toastanim" transitionEnterTimeout={300} transitionLeaveTimeout={400}>
                {items}
            </ReactCSSTransitionGroup>
            </div>
        );
	}
}