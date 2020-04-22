import Reflux from 'reflux'
import Api from '~api'
import t from '~t'
import config from '../modules/config'
import { swapArray } from '../modules/strings'
import _ from 'lodash'
import ls from 'localforage'

import Toasts from '../actions/toast'
import UserActions from '../actions/user'
import CollectionsStore from './collections.js'

var _user = {}, _logged = false, _loading = false, _trusted = false, _subscription = { loading:true };

var UserStore = Reflux.createStore({
    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(UserActions.load, this.onLoad);
        this.listenTo(UserActions.refresh, this.onRefresh);

        this.listenTo(UserActions.toggleGroup, this.onToggleGroup);
        this.listenTo(UserActions.updateGroup, this.onUpdateGroup);
        this.listenTo(UserActions.insertGroup, this.onInsertGroup);
        this.listenTo(UserActions.removeGroup, this.onRemoveGroup);
        this.listenTo(UserActions.swapGroups, this.onSwapGroups);
        this.listenTo(UserActions.saveGroups, this.saveGroups);

        this.listenTo(UserActions.updateCollection, this.onUpdateCollection);
        this.listenTo(UserActions.swapCollections, this.onSwapCollections);

        this.listenTo(UserActions.updateLanguage, this.onUpdateLanguage);
        this.listenTo(UserActions.updateConfig, this.onUpdateConfig);
        this.listenTo(UserActions.logOut, this.onLogOut);
    },

    isTrusted: function() {
      return _trusted;
    },

    onLoad: function(callback, params={}) {
        const { force=false } = params

        if (_loading){
          if (typeof callback == "function")
              callback("loading");

          return this.trigger(_user);
        }

        if (_logged && !force)
          if (_trusted){
            if (typeof callback == "function")
                callback("logged");

            return this.trigger(_user);
          }

        var _this = this;
        _loading = true;

        Api.get("user", function(json){
            var afterCheck = function() {
              if (json.result||false) {
                  _user = json.user;
                  _logged = true;
                  _this.cleanGroups();
              }else{
                _user = {};
                _logged = false;
              }

              _loading = false;
              _trusted = true;

              _this.trigger(_user)
              _this._checkGroupsStability()
              _this.updateAnalytics()
            }

            if ((typeof json.result == "boolean") || (typeof json.auth == "boolean")){
              afterCheck();
              if (typeof callback == "function") callback(json.result ? "logged" : false);
            }else{
              _loading = false;
              _user = {};
              _logged = false;
              _trusted = true;
              _this.trigger(_user);

              if (typeof callback == "function")
                callback('error');
            }
        });
    },

    onRefresh: function(callback) {
      this.onLoad(callback, { force: true })
    },

    onLoadSubscription: function() {
      Api.get("user/subscription", (json)=>{
        _subscription = json
        this.trigger(_user)
      })
    },

    updateAnalytics: function() {
      try{
        window.gtag('set', {'user_id': _user._id.toString()});
      } catch(e) {}
    },

    onToggleGroup: function(params={}){
        if ((_user.groups||[]).length == 0) return

        const { id, index, persist=true, hidden } = params
        
        //find by index or id
        let group
        if (typeof index != 'undefined') group = _user.groups[index]
        else if (typeof id != 'undefined') group = _user.groups[_.findIndex(_user.groups, { id })]

        if (group) {
            const newVal = typeof hidden == 'boolean' ? hidden : !group.hidden
            if (group.hidden === newVal) return

            //Set value or toggle if not specified
            group.hidden = newVal

            //Save to DB or just update local model
            if (persist)
              this.saveGroups()
            else
              this.trigger(_user)
        }
    },

    onUpdateGroup: function(params) {
        var index = _.findIndex((_user.groups||[]), { id: params.id });
        if (index!=-1) {
            for(var i in params.item)
                _user.groups[index][i] = params.item[i];

            this.saveGroups(function(json){
                if (json.result)
                    Toasts.show({text: t.s("saveSuccess"), title: t.s("group")+" "+params.item.title});
                else
                    Toasts.show({text: t.s("saveError"), title: t.s("group")+" "+params.item.title, status: "error"});
            });
        }
    },

    onInsertGroup: function(params, callback) {
        if (typeof params.item.collections == "string")
          params.item.collections = JSON.parse(params.item.collections)

        _user.groups.push({
            title: params.item.title,
            hidden: false,
            id: new Date().getTime(),
            sort: (_user.groups||[]).length,
            collections: params.item.collections || [],
            edit: (params.item.edit ? true : false)
        });
        this.saveGroups(function(json){
            if (!params.silent)
              if (json.result)
                  Toasts.show({text: t.s("addSuccess"), title: t.s("group")+" "+params.item.title});
              else
                  Toasts.show({text: t.s("saveError"), title: t.s("group")+" "+params.item.title, status: "error"});

            if (typeof callback == "function")
              callback(json.result);
        }, params);
    },

    onRemoveGroup: function(params) {
        var index = _.findIndex((_user.groups||[]), { id: params.id }), result = false, title = "";
        if (index!=-1) {
            title = _user.groups[index].title;
            if ((_user.groups[index].collections||[]).length==0) {
                _user.groups.splice(index, 1);
                result = true;
            }
        }

        if (result){
            this.saveGroups();
            Toasts.show({text: t.s("removeSuccess"), title: t.s("group")+" "+title});
        }else{
            Toasts.show({text: t.s("removeGroupError"), title: t.s("group")+" "+title, status: "error"});
        }
    },

    onSwapGroups: function(params) {
      if (params.fromId==params.toId)
        return false;

      var fromIndex = _.findIndex(_user.groups, {id: parseInt(params.fromId)});
      var toIndex = _.findIndex(_user.groups, {id: parseInt(params.toId)});

      if ((fromIndex!=-1)&&(toIndex!=-1)){
        _user.groups = swapArray(_user.groups, fromIndex, toIndex);
        for(var i in _user.groups){
          _user.groups[i].sort = i;
        }

        this.saveGroups();
      }else{
        return false;
      }
    },

    onUpdateCollection: function(params) {
        var needUpdate = false, found = null;

        if (typeof params.group == 'undefined')
            params.group = -1;

        for(var i in _user.groups)
            for(var j in (_user.groups[i].collections||[]))
                if (_user.groups[i].collections[j]==params._id) {
                    if (params.group != i) {
                        _user.groups[i].collections.splice(j, 1);
                        needUpdate = true;
                    }
                    found = j;
                }

        //just move to bottom
        if ((found!==null)&&(!needUpdate)){
          _user.groups[params.group].collections.splice(found, 1);
          _user.groups[params.group].collections.push(params._id);
          this.saveGroups();
          return;
        }

        if ((needUpdate)||(found===null)) {
            if (params.group>=0) {
                if (typeof _user.groups[params.group].collections != 'object')
                    _user.groups[params.group].collections = [];

                if (typeof params.toTop != "undefined")
                  _user.groups[params.group].collections.unshift(params._id);
                else
                  _user.groups[params.group].collections.push(params._id);
                _user.groups[params.group].hidden = false;
            }

            this.saveGroups();
        }
    },

    _findCollectionIndex: function(_id) {
      var tempIndex=-1,tempGroup=-1;
      for(var i in _user.groups){
        tempIndex = (_user.groups[i].collections||[]).indexOf(parseInt(_id));
        tempGroup = i;
        if (tempIndex!=-1) break;
      }
      return {
        group: tempGroup,
        index: tempIndex
      };
    },

    _removeCollectionFromGroupsById: function(_id) {
      var tmp = this._findCollectionIndex(_id);
      if (tmp.index!=-1){
        _user.groups[tmp.group].collections.splice(tmp.index,1);
        this.saveGroups();
      }
    },

    onSwapCollections: function(params) {
      if (params.fromId==params.toId)
        return false;

      this._removeCollectionFromGroupsById(params.fromId);

      var to = this._findCollectionIndex(params.toId);

      _user.groups[to.group].collections.splice(to.index,0,params.fromId);
      this.saveGroups();
    },

    onUpdateLanguage: function(params, callback) {
        if (typeof _user.config != "object")
            _user.config = {};

        _user.config.lang = params.lang;
        this.saveConfig({lang:_user.config.lang}, callback);
    },

    onUpdateConfig: function(params, callback) {
      if (typeof _user.config != "object")
          _user.config = {};

      for(var i in params)
        _user.config[i] = params[i];

      this.saveConfig(params, callback);
    },

    onLogOut: function(callback) {
      var _this = this;
      _this._cleanCache(function(){
        Api.get("auth/logout", function(){
          _this.reset();
          _this._redirectToLogin("/login");
          if (typeof callback == "function") callback();
        });
      });
    },

    _cleanCache: function(callback) {

      //Api.get("user", function(json){
        //if ((json||{}).result||false){
          Api.clear();

          try{
            ls.clear(function(err) {
              callback();
            });
          }catch(e){if(e)callback();}
        //}else
          //callback();
      //});
    },

    getUser: function() {
        //if (typeof _user._id == 'undefined')
        //    this._resetFromCache();

        return _.clone(_user);
    },

    getGroup: function(id) {
        var index = _.findIndex((_user.groups||[]), { id: id });
        if (index!=-1)
            return _user.groups[index];
        else
            return null;
    },

    getSubscription: function() {
      return _.clone(_subscription);
    },

    isLogged: function() {
      return _logged;
    },

    isLoading: function() {
      return _loading;
    },

    isPro: function() {
      if (_logged)
        if (_user.pro)
          return true;

      return false;
    },

    getId: function() {
      if (_logged)
        if (_user._id)
          return _user._id;

      return null;
    },

    reset: function() {
        _user = {};
        _logged = false;
        _loading = false;
        _trusted = false;
    },

    cleanGroups: function() {
        if ((_user.groups||[]).length>0) {
            for (var i in _user.groups)
                if ((_user.groups[i].id || null) == null)
                    _user.groups[i].id = parseInt(i);

            _user.groups = _.sortBy(_user.groups, function (item) {
                return item.sort;
            });
        }else{
            _user.groups = [{id:0, sort: 0, title: t.s("myCollections"), hidden: false}];
        }
    },

    saveGroups: function(callback, params) {
      //cleanup
      params = params || {};
      if (typeof params.cleanCollections == "undefined")
        params.cleanCollections = true;

      if ((CollectionsStore.getCount()>0)&&(params.cleanCollections)) {
        for(var i in _user.groups){
          var indexes = [];
          for(var j in (_user.groups[i].collections||[]))
            if (CollectionsStore.getCollection(_user.groups[i].collections[j])==null)
              indexes.push(j);

          _.pullAt(_user.groups[i].collections, indexes);
        }
      }

      this.saveConfig({groups:_user.groups}, callback);
    },

    removeEmptyGroups: function(callback) {
      var indexes = [];

      for(var i in _user.groups){
        if ((_user.groups[i].collections||[]).length==0)
          indexes.push(i);
      }

      _.pullAt(_user.groups, indexes);
      this.saveGroups(callback, {cleanCollections: false});
    },

    saveConfig: function(params, callback) {
        if (typeof params.updateModel == "undefined")
            params.updateModel = true;

        try{
          if (params.updateModel){
            _user.config[params.name] = true;
          }
        }catch(e){}

        //if (_logged)
        Api.put('userConfig', params, function(json) {
            if (typeof callback=="function")
                callback(json);
        });

        this.trigger(_user);
    },

    getCollectionGroup: function(cId) {
        for(var i in _user.groups)
            for(var j in (_user.groups[i].collections||[]))
                if (_user.groups[i].collections[j]==cId)
                    return parseInt(i);
        return null;
    },

    getConfig: function(key) {
        var val = false;
        try{val = _user.config[key]} catch(e){}
        return val;
    },

    _checkGroupsStability: function() {
      if ( (UserStore.isLogged()) && (!UserStore.isLoading()) && (CollectionsStore.getCount()>0) && (!CollectionsStore.isLoading()) ){
        var noGroup = [];
        var collections = CollectionsStore.getCollections();

        collections.forEach(function(coll) {
          var found = (coll._id<=0);

          if (typeof coll.parent != "undefined")
            found = true;

          if (typeof coll.parentId != "undefined")
            found = true;

          (_user.groups||[]).forEach(function(group) {
            var inGroup = (group.collections||[]).some(function(cId) {
              return ((parseInt(cId)) == (parseInt(coll._id)));
            });
            if (inGroup)
              found = true;
          });

          if (!found)
            noGroup.push(parseInt(coll._id));
        });

        if (noGroup.length>0){
          noGroup = _.uniq(noGroup);

          var index = _.findIndex((_user.groups||[]), { title: t.s("myCollections") });
          if (index!=-1){
              _user.groups[index].collections = (_user.groups[index].collections||[]).concat(noGroup);
          }
          else{
              _user.groups = _user.groups || [];
              _user.groups.push({id: _user.groups.length, sort: _user.groups.length, title: t.s("myCollections"), hidden: false, collections: noGroup});
          }

          UserStore.saveGroups();
        }
      }
    },

    _resetFromCache: function(callback) {
      if (typeof callback == "function")
          return callback(_logged);
      return;
    },

    _setProData: function(isPro, proExpire){
      _user.pro = isPro;
      _user.proExpire = proExpire;
    },

    _redirectToLogin: function(suffix) {
      window.location.hash = "#/account"+(suffix||"")//+encodeURIComponent(window.location.pathname.substr(1,9999)+window.location.search+window.location.hash);
    }
});

export default UserStore