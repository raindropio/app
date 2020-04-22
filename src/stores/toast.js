import Reflux from 'reflux'
import Toasts from '../actions/toast'
import strings from '../modules/strings'

var _ = {
  findIndex: require('lodash/findIndex')
}

var _toasts = [],
    _timeout = 3000;

const isElectron = false;//strings.getCurrentBrowser().indexOf("electron")!=-1;

var ToastStore = Reflux.createStore({
    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(Toasts.show, this.onShow);
        this.listenTo(Toasts.close, this.onClose);
        this.listenTo(Toasts.stopTimer, this.onStopTimer);
    },

    onShow: function(params) {
        params.id = parseInt(new Date().getTime());

        if (params.timeout!==0)
        params.timeout = setTimeout(function() {
            Toasts.close({id:params.id});
        }, _timeout);
        params.closing = false;

        if (isElectron){
            params.nativeNotification = new Notification(params.title||params.text, {
                title: params.title,
                body: params.text,
                requireInteraction: false,
                silent: (params.status != "error")
            })

            params.nativeNotification.onclick = ()=>{
                Toasts.close({id:params.id});
            }
        }

        _toasts.push(params);

        //if (_toasts.length>=10) {
        //    this._removeItem(0,true);
        //}

        this.trigger(_toasts);
    },

    onClose: function(params) {
        //var index = _.findIndex(_toasts, {id: parseInt(params.id)});

        //if (index!=-1){
            this._removeItem(parseInt(params.id));
        //}
    },

    onStopTimer: function(params) {
        var index = _.findIndex(_toasts, {id: parseInt(params.id)});

        if (index!=-1){
            clearTimeout(_toasts[index].timeout);
        }
    },

    _removeItem: function(id, withoutUpdate) {
        var _this = this;

        var index = _.findIndex(_toasts, {id: id});
        if (index==-1) return;

        try{clearTimeout(_toasts[index].timeout);}catch(e){}

        if (typeof _toasts[index].nativeNotification != "undefined")
            try{_toasts[index].nativeNotification.close();}catch(e){}

        _toasts.splice(index, 1);

        if (typeof withoutUpdate == 'undefined')
            _this.trigger(_toasts);
    },

    getToasts: function() {
        return _toasts;
    },

    reset: function() {
        _toasts=[];
    }
});

module.exports = ToastStore;