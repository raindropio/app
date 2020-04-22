import Api from './api'

export default {
	search: function(q, page, callback) {
		Api.get("https://api.iconfinder.com/v2/icons/search?query="+encodeURIComponent(""+q)+"&minimum_size=128&count=100&offset="+(100*page), function(json) {
			if (json.icons){
				var icons = [];
				json.icons.forEach(function(item) {
					//var isPixel = _.findIndex(item.styles, {identifier: "pixel"});
					if ((!item.is_premium)/*&&(isPixel==-1)*/)
						icons.push(item["raster_sizes"][item["raster_sizes"].length-1].formats[0].preview_url);
				});
				callback(icons);
			}else
				callback([]);
		}, {
			credentials: ""
		});
	}
}