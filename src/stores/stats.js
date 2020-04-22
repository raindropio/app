import Reflux from 'reflux'
import Api from '~api'
import StatsActions from '../actions/stats'
import CollectionsActions from '../actions/collections'
import _ from 'lodash'
import ls from 'localforage'

var _stat = {
    collections: [],
    duplicates: 0,
    broken: 0,
    tags: 0
}, _loading = false, _all = 0, _loaded = false;

var StatsStore = Reflux.createStore({
    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(StatsActions.load, this.onLoad);
        this.listenTo(CollectionsActions.updateCountCollection, this.onUpdate);
    },

    onLoad: function(callback) {
    	var _this = this;

    	if (_loading)
    		return;

        try{ls.getItem("stat")
            .then(function (val) {
                if ((val) && (!_loaded)) {
                    if (val.collections){
                        _stat = val;
                        _this._countAll();
                        _this.trigger(_stat);
                    }
                }
            })
            .catch(function(e){
                            
            });}catch(e){}

        _loading = true;
        
        Promise.all([
            new Promise(function(resolve,reject){
                Api.get("stat", resolve);
            }),
            new Promise(function(resolve,reject){
                Api.get("tags", resolve)
            })
        ])
        .then(function([stat, tags]){
            if (stat.result){
	    		_stat = {
                    collections: stat.items
                };
                try{_stat.duplicates = stat.meta.duplicates.count}catch(e){}
                try{_stat.broken = stat.meta.broken.count}catch(e){}
	    		_this._countAll();
                try{ls.setItem("stat", _stat).then(function(){}).catch(function(e){})}catch(e){};
            }
            
            if (tags.result)
                _stat.tags = tags.items.length

            _loading = false;
            _loaded = true;

            _this.trigger(_stat)
            callback(_stat)
        })
        .catch(e=>{
            callback(null)
        })
    },

    onUpdate: function(params) {
        var index = _.findIndex(_stat.collections, {_id: params._id});

        switch(params.count){
          case "+":
            if (params._id!=-99) _all++;
            if (index!=-1) _stat.collections[index].count++;
            this.trigger(_stat);
          break;

          case "-":
            if (params._id!=-99) _all--;
            if (_all<0)
                _all = 0;

            if (index!=-1) {
                _stat.collections[index].count--;
                if (_stat.collections[index].count<0)
                    _stat.collections[index].count = 0;
            }
            this.trigger(_stat);
          break;
        }
    },

    _countAll: function() {
    	_all = 0;

    	for(var i in _stat.collections)
            if (_stat.collections[i]._id === 0){
    		  _all = parseInt(_stat.collections[i].count||0);
              break;
            }

        if (_all<0) _all = 0;
    },

    getStat: function() {
    	return _stat;
    },

    getAllCount: function() {
    	return _all;
    },

    getCollectionCount: function(id) {
        var index = _.findIndex(_stat.collections, {_id: id});
        if (index!=-1)
            return _stat.collections[index].count;
        else
            return 0;
    },

    getDuplicatesCount: function() {
        return _stat.duplicates||0
    },

    getBrokenCount: function() {
        return _stat.broken||0
    },

    getTagsCount: function() {
        return _stat.tags||0
    },
});

export default StatsStore