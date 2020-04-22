import Reflux from 'reflux'
import PopActions from '../actions/pop';

var _params = false;

export default Reflux.createStore({
    timeout: null,

    init: function() {
      // Here we listen to actions and register callbacks
      this.listenTo(PopActions.show, this.onShow);
      this.listenTo(PopActions.close, this.onClose);
    },

    onShow: function(name,params) {
      clearTimeout(this.timeout);
      _params = params||{};
      _params.name = name;
      this.trigger(_params);
    },

    onClose: function() {
      if (_params){
        clearTimeout(this.timeout);

        //close with anim
        if (typeof document !== 'undefined'){
        if ((document.getElementById(_params.pin))||(_params.mousePosition)){
          _params = _params||{};
          _params.isClosing = true;
          this.trigger(_params);

          this.timeout = setTimeout(()=>{this._forceClose()},200);
        }else
          this._forceClose();
        }
      }
    },

    isShowing: function() {
      return (_params ? true : false)
    },

    _forceClose: function() {
      _params=false;
      this.trigger(_params);
    },

    getParams: function() {
      return _params;
    }
});