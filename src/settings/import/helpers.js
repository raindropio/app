import t from 't'
import Api from 'api'
import Pop from '../../actions/pop'
import UserStore from '../../stores/user'

export default {
    pause: 50,
    chunkSize: 1000,
    importDuplicates: false,

	collections: null,
    bookmarks: [],
    haveNested: false,

	handleFile: function(_this,e, scope) {
        if (!e.target.files.length)
            return;

		this.collections = null;
        this.bookmarks = [];
        this.haveNested = false;

        Pop.show('loading')

        Api.uploadPost('import/file', {name: "import", file: e.target.files[0]}, (progress)=>{
            Pop.show('loading', {title: progress+"%"});
        }, (json)=>{
            Pop.close()

            if ((!json.result)||(!json.items.length))
                return alert(t.s('fileUploadUnable'))

            this.collections = json.items

            if (!UserStore.isPro())
                for(var i in this.collections)
                    if (this.collections[i])
                        if (this.collections[i].folders)
                            if (this.collections[i].folders.length){
                                this.haveNested=true;
                                break;
                            }

            window.location.hash = "#/settings/import/"+(this.haveNested ? "nesting" : "collections");
        })
	}
}