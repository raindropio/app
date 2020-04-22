import keyvalStore from '../stores/keyval'
import collectionsStore from '../stores/collections'
import BookmarksActions from '../actions/bookmarks'
import bookmarksStore from '../stores/bookmarks'
import Pop from '../actions/pop'
import Toasts from '../actions/toast'
import t from '~t'

const maxFileSize = 10485760, //10mb
      fileTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "application/pdf"];

export default {
    createBlank() {
    	var timeout = 0;
    	if (window.location.hash.indexOf('#/collection')!=0){
    		window.location.hash = "#/";
    		timeout = 100;
    	}

    	setTimeout(()=>keyvalStore.onSet('mode-panel', {page: "url"}), timeout);
    },

    insertLink(params={}, callback) {
    	params.collectionId = params.collectionId || collectionsStore.getCurrentId() || -1;

        BookmarksActions.parseURL({item: {
        	url: params.url,
        	collectionId: params.collectionId
        }}, function(item){
            if (item){
                item.collectionId = params.collectionId;
                item.tags = params.tags;

                BookmarksActions.insertBookmark({item: item}, function(result){
                    if (result){
                        if (!params.disableRedirect){
                            if (item.collectionId != -2){
    				          window.location.hash="#/collection/"+item.collectionId;
    				          //this.props.router.transitionTo('collection', {cId: cId});
    				        }
    				        else{
    				          window.location.hash="#/";
    				          //this.props.router.transitionTo('app');
    				        }
                        }

				        if (params.edit){
				        	keyvalStore.onSet('mode-reader', {
					            id: parseInt(result._id),
					            tab: "edit"
					        });

					        keyvalStore.onRemove('mode-panel');
					    }

				        Pop.close();
                    }

                    if (typeof callback == "function") callback(result);
                });
            }else{
                Toasts.show({text: t.s('supportOnlyUrls'), status:"error"});
                if (typeof callback == "function") callback(false);
            }
        });
    },

    drop(item,onDropStart) {
        if (item.urls) {
            Toasts.show({text: t.s("loading"), title: item.urls[0]});
            this.insertLink({url: item.urls[0], collectionId: item.collectionId, disableRedirect: true});

            if (typeof onDropStart == "function") onDropStart();
            return true;
        }

        if (item.files){
            var cleanFiles = [];
            var isHTML = false;

            for(var i in item.files){
                var f = item.files[i];

                if (typeof f == 'object' && f.type){
                    if (f.type=="text/html") isHTML=true;
                    else
                    //if ((fileTypes.indexOf(f.type)!=-1)&&(f.size<=maxFileSize))
                        cleanFiles.push({
                            file: f
                        });
                }
            }

            if (isHTML){
                window.location.hash = "#/settings/import";
                Toasts.show({text: t.s("importBookmarksD"), title: t.s("startImport")});
            }
            else
                bookmarksStore.handleDropFiles({files:cleanFiles, collectionId: item.collectionId});

            if (typeof onDropStart == "function") onDropStart();
            return true;
        }
    }
}