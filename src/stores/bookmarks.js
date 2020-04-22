import Reflux from 'reflux'
import t from 't'
import Api from 'api'
import _ from 'lodash'
import { getErrorFromJSON } from '../modules/strings'
import network from 'network'
import S from 'string'
import config from 'config'
import { parse } from '../helpers/clipper'
import ls from 'localforage'

import Toasts from '../actions/toast'
import BookmarkActions from '../actions/bookmarks';
import CollectionsActions from '../actions/collections';
import CollectionsStore from '../stores/collections';
import LastBookmarkActions from '../actions/lastBookmark';
import KeyValStore from './keyval'
import UserStore from '../stores/user'

import V from 'validator'

var cacheDisabled = true;

var _state = {
  cid: null,
  bookmarks: [],
  status: "",
  noMore: false,
  canLoadFromCache: false,
  page: 0,
  count: 0,
  sort: "",
  disableCustomSort: false,
  disableScoreSort: true,
  search: [],
  changed: false,
  perpage: 0
}

var _reorderSnapshot = []

var _url = "", _speed = "sync";
var _selectedCount = 0;
var _disableForceScoreSearch = {}

var _blankBookmark = {
    excerpt: "",
    html: "",
    media: [],
    title: "",
    type: "link"
}

var _initFavorites = {
  "en_US": [
    {_id: 1, sort:4, title: "Raindrop.io", link: "https://raindrop.io", domain: "raindrop.io", collectionId: -2},
    {_id: 2, sort:3, title: "Facebook", link: "https://facebook.com", domain: "facebook.com", collectionId: -2},
    {_id: 3, sort:2, title: "Twitter", link: "https://twitter.com", domain: "twitter.com", collectionId: -2},
    {_id: 4, sort:1, title: "Wikipedia.org", link: "http://en.wikipedia.org", domain: "wikipedia.org", collectionId: -2},
  ],

  "ru_RU": [
    {_id: 1, sort:4, title: "Raindrop.io", link: "https://raindrop.io", domain: "raindrop.io", collectionId: -2},
    {_id: 2, sort:3, title: "Вконтакте", link: "https://vk.com", domain: "vk.com", collectionId: -2},
    {_id: 3, sort:2, title: "Яндекс", link: "https://yandex.ru", domain: "yandex.ru", collectionId: -2},
    {_id: 4, sort:1, title: "Wikipedia.org", link: "https://ru.wikipedia.org", domain: "wikipedia.org", collectionId: -2},
  ]
};

var BookmarksStore = Reflux.createStore({
    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(BookmarkActions.load, this.onLoad);
        this.listenTo(BookmarkActions.reset, this.reset);
        this.listenTo(BookmarkActions.parseURL, this.onParseURL);
        this.listenTo(BookmarkActions.loadBookmark, this.onLoadBookmark);
        this.listenTo(BookmarkActions.insertBookmark, this.onInsertBookmark);
        this.listenTo(BookmarkActions.updateBookmark, this.onUpdateBookmark);
        this.listenTo(BookmarkActions.updateSelectedBookmarks, this.onUpdateSelectedBookmarks);
        this.listenTo(BookmarkActions.removeBookmark, this.onRemoveBookmark);
        this.listenTo(BookmarkActions.removeSelectedBookmarks, this.onRemoveSelectedBookmarks);
        this.listenTo(BookmarkActions.reparseSelectedBookmarks, this.onReparseSelectedBookmarks);
        this.listenTo(BookmarkActions.setScreenshotSelectedBookmarks, this.onSetScreenshotSelectedBookmarks);
        this.listenTo(BookmarkActions.copySelectedBookmarks, this.onCopySelectedBookmarks);
        this.listenTo(BookmarkActions.uploadCover, this.onUploadCover);

        this.listenTo(BookmarkActions.afterReorderBookmark, this.onAfterReorderBookmark);
        this.listenTo(BookmarkActions.reorderBookmark, this.onReorderBookmark);

        this.listenTo(BookmarkActions.setSelected, this.onSetSelected);
        this.listenTo(BookmarkActions.selectAll, this.onSelectAll);
        this.listenTo(BookmarkActions.clearSelect, this.onClearSelect);

        this.listenTo(BookmarkActions.initFavorites, this.onInitFavorites);

        this.listenTo(BookmarkActions.loadUpToId, this.onLoadUpToId);
    },

    onLoad: function(params, callback) {
        params.page = params.page || 0;

        if (typeof params.speed != "undefined")
          _speed = params.speed;
        else
          _speed = "sync";

        if (_state.status!="loading")
          if (params.page == 0)
              this.reset();


        if ((_state.status!="loading")&&(!_state.noMore)) {
            _state.status="loading";
            _state.cid = params.cid;
            _state.changed = false;

            var _this = this;
            _url = "raindrops/" + params.cid;

            //query params
            params.perpage = _state.perpage||parseInt((window.innerWidth+window.innerHeight)/100);
            params.sort = params.sort || KeyValStore.onGet("raindrops_sort") || 'sort';
            params.search = params.search || [];

            _state.disableCustomSort = (params.cid == 0 || params.search.length)
            _state.disableScoreSort = !params.search.length

            //Prevent sorting by 'sort' or 'score' when it's not possible
            if (((params.sort == '-sort' || params.sort == 'sort') && _state.disableCustomSort)||
                (params.sort == 'score' && _state.disableScoreSort)) {
              params.sort = _state.disableScoreSort ? '-created' : 'score'
            }

            //Search
            if (!_state.disableScoreSort && !sessionStorage.getItem('forceSort'+params.cid)){
              params.sort = 'score'
            }

            var q = [];
            _.forEach(params, function (val, index) {
                if (typeof val == "object"){
                  var isEmpty = false;

                  if (Array.isArray(val)){
                    if (val.length==0)
                      isEmpty = true;
                  }else
                    if (Object.keys(val).length==0)
                      isEmpty = true;

                  if (!isEmpty){
                    var tempVal = encodeURIComponent(JSON.stringify(val));
                    q.push(index + "=" + tempVal);
                  }
                }
                else
                  q.push(index + "=" + encodeURIComponent(val));
            });
            if (q.length > 0)
                _url += "?" + q.join("&");

            _state.canLoadFromCache=((params.sort!="title")&&(!params.page)/*&&(!params.search)*/);

            if (typeof window != "undefined")
            if (cacheDisabled)
              _state.canLoadFromCache = false;

            _state.page = params.page;
            _state.sort = params.sort;
            _state.search = params.search;
            
            if (_state.canLoadFromCache){
                switch(_speed){
                  case "async":
                    try{ls.getItem(_url)
                      .then(function (val) {
                          if ((val) && (_state.status=="")) {
                              _state.bookmarks = val;
                              _this.trigger(_state);
                          }
                      })
                      .catch(function(e){

                      });}catch(e){}
                  break;

                  case 'sync':
                    _state.bookmarks = [];
                    try{
                      _state.bookmarks = JSON.parse(Api.getItem(_url)) || [];
                    }catch(e){if (e) _state.bookmarks = [];}
                    if (_state.bookmarks.length>0)
                      _this.trigger(_state);
                  break;
                }
            }

            _this.trigger(_state);

            Api.get(_url, function (json) {
              //everything ok, apped bookmarks
              if ((json.result||false)&&(json.collectionId === _state.cid)) {
                _state.count = json.count || 0;
                if (_state.search.length==0)
                  if (json.count)
                    CollectionsActions.updateCountCollection({_id: json.collectionId, count: json.count || 0});

                _state.status="done";

                if (params.page == 0){
                  _state.bookmarks = (json.items||[]);
                }
                else{
                  _state.bookmarks = _state.bookmarks.concat((json.items||[]));
                }

                //no more check
                _state.noMore = ((json.items||[]).length == 0);

                if ((json.items||[]).length < params.perpage-1)
                  _state.noMore = true;

                if ((json.items||[]).length == json.count)
                  _state.noMore = true;
              }else{
                _state.noMore = true;

                if (params.page == 0){
                  _state.bookmarks = [];
                  _state.status = "error";
                }else
                  _state.status = "error_page";
              }

              _this.update(false);

              if (typeof callback != "undefined")
                callback();
            });
        }else {
          if (typeof callback != "undefined")
            callback();
        }
    },

    onLoadBookmark: function(params, callback) {
      var _this = this;

      var getById = function(id, params) {
        var q = [];
        for(var i in params)
          q.push(i+"="+params[i]);

        Api.get("raindrop/"+id+"?"+q.join("&"), function(json) {
          if (json.result)
            callback(_this._prepareBookmark(json.item, json.item));
          else
            callback(false);
        });
      }

      if (typeof params.url != "undefined")
        Api.post("check/url", {url: params.url}, function(json) {
          if (json.result){
            if (params.onlyId)
              callback({_id: json.id});
            else
              getById(json.id, params);
          }
          else
            callback(false);
        });
      else
        getById(params._id, {});
    },

    onParseURL: function(params, callback) {
        var url = (params.item.url||params.item.link||""), _this = this;

        try{
          if (url.indexOf('://') < 3)
            url = "http://"+url;
        }catch(e){}

        Promise.race([
          new Promise(res=>{
            Api.get("parse?url="+encodeURIComponent(url), function(json){
              try{
                json = JSON.parse(json);
              }catch(e){}
    
              json = json || {result:false}
              res(json.item)
            }, {text:true})
          }),

          new Promise(res=>{
            try{
              parse(url, (item)=>{
                if (item) res(item)
                //otherwise wait for server
              })
            } catch(e) {}
          })
        ]).then(item=>{
          if (!item)
            throw new Error('not found')

          item = _this._prepareBookmark(params.item, item)
          callback(item)
        }).catch((e)=>{
          console.log(e)
          return callback(false)
        })
    },

    _prepareBookmark: function(params, item) {
      var empty = false;

      if (typeof item == "undefined")
        empty = true;
      else
        if (item == null)
          empty = true;

      if (empty)
        item = _.clone(_blankBookmark);

      item.link = params.url || item.link;
      item.url = params.url;
      item.cover = 0;
      item.coverId = params.coverId;
      item.coverEnabled = true;

      item.domain = item.domain || network.getDomain(params.url);
      if (item.title==""){
        item.title = S(item.domain).capitalize().s;
        try{
          item.title = item.title.split(".")[0];
        }catch(e){}
      }

      if (typeof params.collection != "undefined"){
        item.collectionId = params.collection["$id"];
      }

      if (typeof params.collectionId != "undefined"){
        item.collectionId = params.collectionId;
        item.collection = {"$id": params.collectionId};
      }

      return item;
    },

    onInsertBookmark: function(params, callback) {
        var _this = this;
        params.dontAdd = params.dontAdd || false;

        //sort to end if favorite
        if (params.toEndOfList)
          params.item.sort = 0;

        var insertToModels = function(item) {
          if (!params.dontAdd){
              item._id = item._id || new Date().getTime();

              //Default override bookmark item
              if (typeof params.placeholder == "object"){
                for(var i in params.placeholder)
                  item[i] = params.placeholder[i];
              }

              if (params.toEndOfList)
                _state.bookmarks.push(item);
              else
                _state.bookmarks.unshift(item);

              CollectionsActions.updateCountCollection({_id: params.item.collectionId, count: "+"});
              _this.update(true);
          }

          if (!params.silent)
            if (typeof Toasts != "undefined") Toasts.show({text: t.s((params.item.type||"link") + 'Saved')/*, title: params.item.title*/});

          LastBookmarkActions.insert(item);
        }

        Api.post("raindrop", params.item, function(json){
            if (json.result){
              insertToModels(json.item);
            }else{
              if (!params.silent)
                if (typeof Toasts != "undefined") Toasts.show({text: getErrorFromJSON(json)/*, title: params.item.title*/, status:"error"});
            }

            var reason = false;
            if (Object.keys(json).length==0)
              reason = "error";
            else if (json.auth === false)
              reason = "noAuth";

            callback(json.item||false, reason);
        });
    },

    onUploadFile: function(params, callback) {
      var _this = this;

      Api.upload("raindrop/"+params.item._id+"/file", {name: "file", file: params.file}, function(progress){
        if (progress){
          var index = _.findIndex(_state.bookmarks, {_id: params.item._id});
          if (index!=-1){
            _state.bookmarks[index].progress = progress;
          }

          _this.update(true);
        }
      }, function(json){
        if (json.result){
          var index = _.findIndex(_state.bookmarks, {_id: params.item._id});
          if (index!=-1){
            _state.bookmarks[index] = json.item;
            _state.bookmarks[index].loading = false;
          }

          _this.update(true);
        }else{
          if (typeof Toasts != "undefined") Toasts.show({text: t.s("fileUploadUnable"), title: params.item.title, status: "error"});
          _this.onRemoveBookmark({
            item: params.item,
            silent: true
          });
        }

        callback(json);
      });
    },

    onUploadCover: function({_id, file}, callback) {
      Api.upload(
        "raindrop/"+_id+"/cover",
        {name: "cover", file},
        function(progress){},
        (json)=>{
            if (json.result){
              this.afterUpdateBookmark({item: {_id}}, json)
              this.update(true)
            } else {
                Toasts.show({text: t.s('fileUploadError'), title: t.s('file'), status: "error"})
            }

            typeof callback == 'function' && callback(json.result && json.item.cover)
        }
      )
  },

    onAfterReorderBookmark: function(_id, originalOrder, callback) {
      var order = _.findIndex(_state.bookmarks, { _id })

      if (order==-1){
        if (typeof callback == 'function')
          return callback(false)
        return 
      }

      this.onUpdateBookmark({
        item: {
          _id,
          order
        },
        silent: false
      }, (result)=>{
        //Revert changes if fail
        if (!result)
          this.onReorderBookmark({ from: order, to: originalOrder })

        if (typeof callback == 'function')
          callback(result ? true : false)
      })
    },

    onReorderBookmark: function({ from, to }) {
      if (from == to)
        return;

      var element = _state.bookmarks[from]

      _state.bookmarks.splice(from, 1)
      _state.bookmarks.splice(to, 0, element)
      this.update(true)
    },

    onUpdateBookmark: function(p, callback) {
      var params = _.clone(p);
      var _this = this;

      if (typeof params.successMessage == "undefined")
          params.successMessage = t.s("saveSuccess");

      _this.beforeUpdateBookmark(params)

      Api.put("raindrop/"+params.item._id, params.item, function(json){
        if (json.result) {
          LastBookmarkActions.update(json.item);
          
          Api.setItem("last_collection", json.item.collection["$id"]);
          
          _this.afterUpdateBookmark(params, json)
          _this.update(true)

          if (!params.silent)
            if (typeof Toasts != "undefined") Toasts.show({text: params.successMessage/*, title: json.item.title*/});
        }else{
            if (!params.silent)
                if (typeof Toasts != "undefined") Toasts.show({text: getErrorFromJSON(json), status: "error"});
        }

        if (typeof callback == 'function')
            callback((json.item || [])._id || false);
      });
    },

    beforeUpdateBookmark: function(params) {
      if (typeof params.append == "object")
        if (params.append.length>0){
          var index = _.findIndex(_state.bookmarks, {_id: params.item._id});
          if (index!=-1){
            for(var i in params.append){
              switch(typeof _state.bookmarks[index][params.append[i]]){
                case "object":
                  params.item[params.append[i]] = _state.bookmarks[index][params.append[i]].concat(params.item[params.append[i]]);
                  params.item[params.append[i]] = _.uniq(params.item[params.append[i]]);
                break;

                case "string":
                  params.item[params.append[i]] = _state.bookmarks[index][params.append[i]] + params.item[params.append[i]];
                break;
              }
            }
          }
        }
    },

    afterUpdateBookmark: function(params, json) {
      if (typeof params.updateModel == "undefined")
          params.updateModel = true;

      if (params.updateModel){
        var index = _.findIndex(_state.bookmarks, {_id: params.item._id});
        if (index!=-1) {
          var action = "update";

          //Fix after multi update
          if (json.item.collectionId)
            json.item.collection = { $id: json.item.collectionId }

          if (json.item.parser && !json.item.pleaseParse)
            json.item.pleaseParse = { weight: 1 }

          //Actions
          if (json.item.collection["$id"]!=_state.bookmarks[index].collection["$id"])
            action = "remove";

          if (params.showingCollectionId === 0)
            action = "update";

          switch(action){
            case "update":
              _state.bookmarks[index] = json.item;
            break;

            case "remove":
              CollectionsActions.updateCountCollection({_id: _state.bookmarks[index].collection["$id"], count: "-"});
              CollectionsActions.updateCountCollection({_id: json.item.collection["$id"], count: "+"});
              _state.bookmarks.splice(index, 1);
            break;
          }
        }
      }
    },

    onUpdateSelectedBookmarks: function(params, callback) {
      var selected = [], _this = this;
      for(var i in _state.bookmarks)
        if (_state.bookmarks[i].selected || false){
          selected.push(_state.bookmarks[i])
        }

      if (!selected.length) return

      function u(cid, ids){
        Api.put(
          `raindrops/${cid}`,
          {
            ...params.item,
            ids,
          },
          function (json) {
            if (json.modified){
              selected.forEach(({_id})=>{
                var temp = JSON.parse(JSON.stringify(params))
                temp.item._id = _id
  
                _this.beforeUpdateBookmark(temp)
  
                _this.afterUpdateBookmark(temp, {
                  item: Object.assign({}, _state.bookmarks.find(item=>item._id==_id), temp.item)
                })
              })
  
              _this.update(true)
            }
  
            _this.onClearSelect()
  
            if (typeof callback == "function")
              callback(json.result||false)
          }
        )
      }

      Object.entries(_.groupBy(selected, 'collection.$id')).forEach(([cid, items])=>{
        u(cid, items.map(({_id})=>_id))
      })
    },

    onCopySelectedBookmarks: function(params, callback) {
      var selectedIds = [], _this = this;
      for(var i in _state.bookmarks)
        if (_state.bookmarks[i].selected || false)
          selectedIds.push(_state.bookmarks[i]._id);

      var step = 0,
          count = _selectedCount,
          check = function(result) {
            if (result){
              step++;
              if (step<=count-1)
                now();
              else{
                _this.onClearSelect();
                callback(true);
              }
            }else{
              _this.onClearSelect();
              callback(false);
            }
          },

          now = function(){
            Api.get("raindrop/"+selectedIds[step], function(json) {
              if (json.result){
                var link = json.item.link;
                json.item = _this._prepareBookmark(json.item, json.item);
                json.item.link = json.item.url = link;
                json.item.collectionId = params.collectionId;
                delete json.item._id;
                delete json.item.sort;
                delete json.item.collection;
                delete json.item.created;
                delete json.item.lastUpdate;
                BookmarkActions.insertBookmark({item: json.item, dontAdd: true, silent: true}, check);
              }else{
                _this.onClearSelect();
                callback(false);
              }
            });
            
            /*var temp = JSON.parse(JSON.stringify(params));
            temp.item._id = parseInt(selectedIds[step]);
            BookmarkActions.updateBookmark(temp, check);*/
          }

      now();
    },

    onRemoveBookmark: function(params, callback) {
        var _this = this;
        var perm = "";

        if (UserStore.isLogged())
        Api.del("raindrop/"+params.item._id, function(json) {
            if (json.result) {
              perm = _this.afterRemoveBookmark(params);
              _this.update(true);
            }else{
                if (!params.silent)
                  if (typeof Toasts != "undefined") Toasts.show({text: getErrorFromJSON(json)/*, title: params.item.title*/, status:"error"});
            }

            if (typeof callback == "function")
                callback(json.result||false, perm);
        });
        else{
          perm = _this.afterRemoveBookmark(params);
          _this.update(true);

          if (typeof callback == "function")
              callback(true, perm);
        }
    },

    afterRemoveBookmark: function(params) {
      var perm = "";

      if (params.item.collectionId)
        params.item.collection = { $id: params.item.collectionId }

      if (typeof params.item.collection != "undefined")
      if (params.item.collection["$id"]==-99)
          perm = "Permament";

      if (!UserStore.isLogged())
          perm = "Permament";

      var index = _.findIndex(_state.bookmarks, {_id: params.item._id});
      try{
        CollectionsActions.updateCountCollection({_id: params.item.collection["$id"], count: "-"});
      }catch(e) {}
      if (index!=-1) {
          _state.bookmarks.splice(index, 1);
      }

      if (!params.silent)
        if (typeof Toasts != "undefined") Toasts.show({text: t.s((params.item.type||"link") + 'Removed' + perm)/*, title: params.item.title*/});

      LastBookmarkActions.remove(params.item);

      return perm
    },

    onRemoveSelectedBookmarks: function(params, callback) {
      var selectedItems = this._getSelected(), _this = this;

      function u(cid, ids) {
        Api.del(
          `raindrops/${cid}`,
          {
            ids: ids,
          },
          function (json) {
            var perm = ''
  
            if (json.modified){
              selectedItems.forEach(item=>{
                var temp = JSON.parse(JSON.stringify(params))
                temp.item = item
  
                perm = _this.afterRemoveBookmark(temp);
              })
  
              _this.update(true)
            }
  
            _this.onClearSelect()
  
            if (typeof callback == "function")
              callback(json.result||false, perm)
          }
        )
      }

      Object.entries(_.groupBy(selectedItems, 'collection.$id')).forEach(([cid, items])=>{
        u(cid, items.map(({_id})=>_id))
      })
    },

    onReparseSelectedBookmarks: function(callback) {
      this.onUpdateSelectedBookmarks({silent: true, item:{parser:"local"}}, callback);

      /*var selectedItems = this._getSelected(), _this = this;

      var step = 0,
          count = _selectedCount,
          check = function(result, perm) {
            if (result){
              step++;
              if (step<=count-1)
                now();
              else{
                _this.onClearSelect();
                callback(true, perm);
              }
            }else{
              _this.onClearSelect();
              callback(false);
            }
          },

          now = function(){
            var temp = {};
            temp.item = selectedItems[step];
            
            _this.onParseURL(temp, (json)=>{
              if (typeof json.title == "undefined") return check(true);
              if (!json.title) return check(true);

              var updateItem = {
                _id: parseInt(temp.item._id),
                type: json.type
              };

              if ((json.media||[]).length){
                updateItem.media = json.media;
                updateItem.cover = 0;
                updateItem.coverId = 0;
              }

              if ((json.excerpt)&&(temp.item.excerpt))
                updateItem.excerpt = json.excerpt;

              if (json.html)
                updateItem.html = json.html;

              BookmarkActions.updateBookmark({item:updateItem,silent:true}, check);
            })
          }

      now();*/
    },

    onSetScreenshotSelectedBookmarks: function(callback) {
      var selectedItems = this._getSelected(), _this = this;

      var step = 0,
      count = _selectedCount,
      check = function(result) {
        if (result){
          step++;
          if (step<=count-1)
            now();
          else{
            _this.onClearSelect();
            callback(true);
          }
        }else{
          _this.onClearSelect();
          callback(false);
        }
      },

      now = function(){
        var item = selectedItems[step];

        var temp = {item: {
          _id: item._id,
          cover: 0,
          coverId: 0,
          coverEnabled: true,
          media: [
            {link: config.screenshotService+encodeURIComponent(item.link), type: "image", screenshot: true}
          ]
        }, silent: true};

        temp.item.media = temp.item.media.concat(item.media||[]);
        temp.item.media = _.uniq(temp.item.media);

        BookmarkActions.updateBookmark(temp, check);
      }

      now();
    },

    _getSelected: function() {
      var selectedItems = [];
      for(var i in _state.bookmarks)
        if (_state.bookmarks[i].selected || false)
          selectedItems.push(_state.bookmarks[i]);

      return JSON.parse(JSON.stringify(selectedItems));
    },

    onSetSelected: function(params) {
      var index = _.findIndex(_state.bookmarks, {_id: params.id});
      if (index!=-1) {
          _state.bookmarks[index].selected = params.selected;

          if (params.shift){
            var nearIndexs = [], closestIndex = 0;
            _state.bookmarks.forEach(function(item,i){
              if ((item.selected || false)&&(i!=index))
                nearIndexs.push(i);
            });

            if (nearIndexs.length>0)
            closestIndex = nearIndexs.reduce(function (prev, curr) {
              return (Math.abs(curr - index) < Math.abs(prev - index) ? curr : prev);
            });

            if (closestIndex < index){
              for(var i=closestIndex; i < index; i++){
                _state.bookmarks[i].selected = true;
              }
            }else{
              for(var i=index; i < closestIndex; i++)
                _state.bookmarks[i].selected = true;
            }
          }

          _selectedCount = 0;
          _state.bookmarks.forEach(function(item){
            if (item.selected || false)
              _selectedCount++;
          });

          this.trigger(_state);
      }
      else
          return null;
    },

    onSelectAll: function() {
      for(var i in _state.bookmarks)
        _state.bookmarks[i].selected = true;

      _selectedCount = _state.bookmarks.length;
      this.trigger(_state);
    },

    onClearSelect: function() {
      _selectedCount = 0;
      for(var i in _state.bookmarks)
        _state.bookmarks[i].selected = false;

      this.trigger(_state);
    },

    getBookmarks: function() {
        return _state.bookmarks;
    },

    getBookmark: function(id) {
        var index = _.findIndex(_state.bookmarks, {_id: id});
        if (index!=-1) {
            try{
              _state.bookmarks[index].collectionId = _state.bookmarks[index].collection["$id"];
            }catch(e){}
            _state.bookmarks[index].coverEnabled = true;
            return JSON.parse(JSON.stringify(_state.bookmarks[index]));
        }
        else
            return null;
    },

    getIsNoMore: function() {
        return _state.noMore;
    },

    getCount: function() {
        return _state.bookmarks.length;
    },

    getSelectedCount: function() {
      return _selectedCount;
    },

    update: function(listIsChanged) {
        //if bookmarks more than 0 and status is not done, then correct it
        if ((_state.status!="done")&&(_state.status!="error_page")&&(_state.bookmarks.length!=0))
          _state.status="done";

        //if not error but bookmarks 0 is no_items
        if ((_state.status!="error")&&(_state.bookmarks.length==0))
          _state.status="no_items";

        _state.changed = listIsChanged||false;

        this.trigger(_state);

        if (!cacheDisabled)
        if ((_state.canLoadFromCache)) {
          switch(_speed){
            case "async":
              try{ls.setItem(_url, _state.bookmarks).then(function(){}).catch(function(e){})}catch(e){};
            break;

            case "sync":
              Api.setItem(_url, JSON.stringify(_state.bookmarks));
            break;
          }
        }
    },

    handleDropFiles: function(e) {
      var _this = this;
      var cId = e.collectionId || CollectionsStore.getCurrentId("file");

      var current = Promise.resolve();
      var queue = e.files.map((f)=>{
        
        current = current.then(function(){
          return new Promise(function(res,rej){
            if (cId != CollectionsStore.getCurrentId()){
              window.location.hash="#/collection/"+cId;
              setTimeout(function(){
                res(true);
              },200);
            }else
              res(true);
          })
        })
        //get dataURI preview
        .then(function(){
          return new Promise(function(res,rej){
            if (f.file.size<1048576){//1mb
              var reader  = new FileReader();
              reader.onloadend = function () {
                res(reader.result);
              }
              reader.onerror = function () {
                res(null);
              }

              reader.readAsDataURL(f.file);
            }else
              res(null);
          })
        })
        //save placeholder bookmark
        .then((dataURI)=> {
          return new Promise((res,rej)=>{
            this.onInsertBookmark({
              silent: true,
              item: {
                title: f.file.name.split('.')[0],
                collectionId: cId,
                url: "https://raindrop.io/ping"
              },
              placeholder: {
                //cover: "https://raindrop.io/img/other/parsing.png",
                loading: true
              }
            }, function(item) {
              //set placeholder image
              /*setTimeout(function(){
                var coverElement = null;
                try{coverElement = (document.getElementById("element"+item._id).parentElement).getElementsByClassName('cover-img')[0]}catch(e){};
                if (coverElement) {
                  try{
                    if (dataURI){
                      coverElement.src = dataURI||""; coverElement.removeAttribute("srcset");
                    }
                  }catch(e){}
                }
              },1);*/
              var index = _.findIndex(_state.bookmarks, {_id: item._id});
              if (index!=-1){
                if (dataURI){
                  _state.bookmarks[index].cover = dataURI||"";
                  _this.trigger(_state);
                }
              }

              res({item: item, file: f.file});
            });
          });
        })
        return current;
      });
      
      if (queue.length>0){
        if (typeof Toasts != "undefined") Toasts.show({text: t.s("importingInfo2"), title: t.s("uploadProgress")});

        Promise.all(queue)
          .then(function(result) {
            result.reverse();
            
            var c = Promise.resolve();
            var uploadQueue = result.map(function(r){
              var item = r.item; 
              c = c.then(function(){
                return new Promise(function(res,rej){
                  if (!item)
                    res(null);
                  else
                    BookmarksStore.onUploadFile({
                      item: item,
                      file: r.file
                    }, function(item) {
                      res(item);
                    })
                });
              });
              return c;
            });

            return Promise.all(uploadQueue);
          })
          .then(function(items) {
            var doneCount = 0;
            for(var i in items)
              if (items[i].result) doneCount++;

            //check all
            if (doneCount)
              if (typeof Toasts != "undefined") Toasts.show({text: t.s("saveSuccess"), title: doneCount+" files"});
            //else
            //  Toasts.show({text: t.s("fileUploadError"), status: "error"});
          });
      }else{
        if (typeof Toasts != "undefined") Toasts.show({text: t.s("fileUploadError"), status: "error"});
      }
    },

    _bookmarkNavigation: function(id) {
      var index = _.findIndex(_state.bookmarks, {_id: id});
      if (index!=-1){
        var next = 0, prev = 0;
        if (typeof _state.bookmarks[index+1] != "undefined")
          next = _state.bookmarks[index+1]._id;
        if (typeof _state.bookmarks[index-1] != "undefined")
          prev = _state.bookmarks[index-1]._id;
        return {next: next, prev: prev};
      }else
        return {next: 0, prev: 0};
    },

    _comparePrevOrNext: function(prevId, nextId) {
      var prevIndex = _.findIndex(_state.bookmarks, {_id: prevId});
      var nextIndex = _.findIndex(_state.bookmarks, {_id: nextId});
      return (prevIndex > nextIndex ? "prev" : "next");
    },

    onLoadUpToId: function(bookmarkId, callback) {
      var page = 0;
      var loadMore = ()=>{
        var getNextPage = true, found=false;

        if (_state.noMore)
          getNextPage = false;

        if (_.findIndex(_state.bookmarks||[], {_id: bookmarkId}) != -1){
          found = true;
          getNextPage = false;
        }

        if (!getNextPage){
          return callback(found);
        }

        this.onLoad({
          cid: _state.cid,
          sort: _state.sort,
          page: page,
          perpage: 40
        }, ()=>{
          page++; loadMore();
        })
      }

      loadMore();
    },

    reset: function(withUpdate) {
        _state.bookmarks = [];
        _state.status="";
        _state.noMore = false;
        _state.page = 0;
        //_state.count = 0;
        _state.sort = "";
        _state.perpage = 0;
        _selectedCount = 0;

        if (withUpdate) this.update();
    }
});

export default BookmarksStore;