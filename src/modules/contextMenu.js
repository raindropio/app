import Pop from '../actions/pop'
import { getCurrentBrowser } from './strings'

export default {
	show(items, pos) {
		if (getCurrentBrowser().indexOf("electron")!=-1){
			const {remote} = require('electron');
			const {Menu, MenuItem} = remote;

			const menu = new Menu();
			items.forEach((obj)=>{
				var item = Object.assign(obj,{});

				if (item.href){
					item.click = ()=>{
						remote.shell.openExternal(item.href);
					}
				}
				menu.append(new MenuItem(item));
			});
			menu.popup(remote.getCurrentWindow(), pos.x, pos.y);
		}
		else	
			Pop.show("contextMenu", {
				items: items,
				mousePosition: pos,
				force: "vertical"
			});
	}
}