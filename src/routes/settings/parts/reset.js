import React from 'react'
import t from '~t'
import Api from '~api'
import Pop from '~actions/pop'
import UserStore from '~stores/user'

import Button from '~co/common/button'

export default class Reset extends React.Component {
	displayName = "settings/parts/reset"

	handleReset() {
		if (!confirm(t.s("areYouSure")))
			return;

		var worker = {
	      count: 0,
	      index: -1,
	      items: [],

	      next: function() {
	        var _this = this;
	        Api.del('collection/'+this.items[this.index]._id, function(){
	          UserStore.onUpdateCollection({_id: _this.items[_this.index]._id});
	          _this.check();
	        });
	      },

	      check: function() {
	        worker.index++;
	        if (worker.index>=worker.count){
	          alert("Done!");
	          Pop.close();
	        }else{
	          worker.next();
	        }
	      }
	    }

	    Pop.show('loading');
	    Api.get("collections", function(json) {
	      worker.items = json.items || [];
	      worker.items.push({_id:-1});
	      //worker.items.push({_id:-99});
	      //worker.items.push({_id:0});
	      
	      worker.count = worker.items.length;
	      worker.check();
	    });
	}

	render() {
		return (
			<Button onClick={this.handleReset.bind(this)}>
				{
					t.s("remove")+" "+
					t.s("all").toLowerCase()+" "+
					t.s("myCollections").toLowerCase()+" "+
					t.s("und")+" "+
					t.s("elements2").toLowerCase()
				}
			</Button>
		);
	}
}