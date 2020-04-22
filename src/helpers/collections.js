import collectionsActions from '../actions/collections'
import collectionsStore from '../stores/collections'
import keyvalStore from '../stores/keyval'
import UserStore from '../stores/user'
import Pop from '../actions/pop'
import t from '~t'
import _ from 'lodash'

export default {
    createBlank(item,params,callback) {
        params = params || {};

        if (typeof params.open == "undefined")
            params.open = true;

        if (!item.title)
            item.title = t.s("untitled");

        if ((item.parentId)&&(!UserStore.isPro()))
            return window.location.hash = "#/settings/upgrade";

        if (!params.quiet)
            Pop.show('loading');

        collectionsActions.insertCollection({
            item: item,
            silent: true
        }, (_id)=>{
            if (!params.quiet)
                Pop.close();

            if (params.edit){
                setTimeout(()=>keyvalStore.onSet('mode-panel',{page: "collection", cid:_id,focus:true}), 100);
            }else
                keyvalStore.onRemove('mode-panel');

            if (params.open)
                window.location.hash="#/collection/"+_id;

            if (typeof callback == "function")
                callback(_id);
        })
    },

    createBlankGroup(item) {
        item = item || {};
        if (!item.title)
            item.title = t.s("untitled");

        UserStore.onInsertGroup({
            item: item,
            silent: true
        }, (_id)=>{
            
        })
    },

    canMoveTo(fromId,toId) {
        //find destination item (to)
        var collections = collectionsStore.getCollections();
        var index = _.findIndex(collections, {_id: toId});
        if (index == -1) return false;
        if (!collections[index].parent) return true;

        var to = collections[index];

        if (to.parent){
            if (to.parent.$id==fromId)
                {return false;}
            
            var targetIsChild = false;
            var checkIsChild = (cId)=>{
                var index = _.findIndex(collections, {_id: cId});
                if (index!=-1) if (collections[index].parent){
                    if (collections[index].parent.$id == fromId)
                        targetIsChild = true;
                    else
                        checkIsChild(collections[index].parent.$id);
                }
            }
            
            checkIsChild(to._id);
            if (targetIsChild) {return false;}
        }

        return true;
    },

	remove(item, onSuccess) {
		var lastId = item._id;
    	
        Pop.show('loading', {title: t.s("remove")+" "+t.s("collection").toLowerCase()});

    	collectionsActions.removeCollection({
            item: item
        }, (result)=>{
            Pop.close();

            if (result){
                if (collectionsStore.getCurrentId() == lastId){
                    setTimeout(()=>{
                        window.location.hash="#/collection/0";
                    },100)
                }

                if (typeof onSuccess == "function") onSuccess();
            }
        });
	},

    cleanTrash() {
        Pop.show('loading',{title: t.s("remove")+" "+t.s("all").toLowerCase()});

        collectionsActions.removeCollection({
            item: collectionsStore.getCollection(-99),
            silent: true
        }, ()=>{
            Pop.close();
        })
    }
}