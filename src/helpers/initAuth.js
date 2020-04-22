import CollectionsStore from '../stores/collections'
import StatsActions from '../actions/stats'

if (typeof window !== "undefined")
	window.UserStore = require('../stores/user.js')
else
	global.UserStore = require('../stores/user.js')

/*
done
error
needLogin
*/

module.exports = {
	timeout: null,

	checkStatus(callback) {
		var callbackIsSended = false;

		this.timeout = setTimeout(()=>{
			if (!callbackIsSended){
				callbackIsSended=true;
				callback('error')
			}
		},10000);

		Promise.all([
				new Promise(function(resolve,reject){
                    CollectionsStore.onLoad({},(r)=>resolve({collections:r}));
                }),
                new Promise(function(resolve,reject){
                    UserStore.onLoad((r)=>resolve({user:r}));
				}),
				new Promise(function(resolve,reject){
                    StatsActions.load((r)=>resolve({stats:r}));
				}),
            ])
            .then((arr)=>{
            	clearTimeout(this.timeout);

            	var results = {};
            	arr.forEach((item)=>{for(var i in item) results[i]=item[i];});
            	
            	//User check
            	switch(results.user){
            		case false:
            			if (!callbackIsSended){
							callbackIsSended=true;
							callback('needLogin');
						}
						return;
            		break;
            	}

            	if ((results.user=="error")||(!results.collections))
            		throw new Error('login error');

				//if (!callbackIsSended){
					callbackIsSended=true;
					callback('done')
				//}
            })
            .catch((e)=>{
            	clearTimeout(this.timeout);

            	if (!callbackIsSended){
					callbackIsSended=true;
					callback('error');
				}
            });
	}
}