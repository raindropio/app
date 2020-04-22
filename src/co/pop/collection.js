import React from 'react'
import ReactDom from 'react-dom'
import t from '~t'
import Api from '~api'
import config from '~config'

import CollectionsActions from '../../actions/collections'
import CollectionsStore from '../../stores/collections'
import Pop from '../../actions/pop'
import UserStore from '../../stores/user'

import Textarea from 'react-textarea-autosize'
import Icon from '~icon'
import CollectionIcon from '../collections/icon'
import TableRow from '../form/tableRow'
import ThemeColor from '../collections/themeColor'
import Preloader from '../common/preloader'
import PathHelper from './helpers/path'

var _defaultItem = {
    _id: 0,
    title: t.s("untitled"),
    view: "list",
    group: 0,
    empty: true,
    blank: true
};

export default class PopCollection extends React.Component {
    displayName = "Pop/Collection"

    updateCover: false

    constructor(props) {
        super(props);

        var item;
        var disableNested = false;
        _defaultItem.group = props.group || 0;

        if (props.id || props.forceEdit) {
            var item = {
                _id: parseInt(props.id || 0),
                empty: true
            };

            var collection = CollectionsStore.getCollection(props.id);
            if (collection == null)
                CollectionsStore.onLoadId(props.id);
            else {
                item = JSON.parse(JSON.stringify(collection));
            }
        }

        var loading = (/*!(item||{})._id ||*/ (item||{}).empty);
        if (!item)
            loading = false;

        item = item || JSON.parse(JSON.stringify(_defaultItem));
        if (item.blank){
            if ((props.parentId||0)>0){
                item.title = t.s("nestedCollections").split(" ")[0] + " " + t.s('collection').toLowerCase();

                if (!UserStore.isPro())
                    disableNested = true;
            }
        }

        this.state = {
            step: (props.step ? props.step : "form"),
            loading: loading,
            item: item,
            collaboratorsText: "",
            disableNested: disableNested
        };
    }

    onCollectionsChange() {
        var temp = null;

        if ((this.state.item.empty)&&(this.state.item._id)){
            collection = CollectionsStore.getCollection(this.state.item._id);
            if (collection != null)
              temp = JSON.parse(JSON.stringify(collection));
        }

        if (temp!=null)
          this.setState({
              item: temp,
              loading: false
          });

        this.setState({step: this.state.step});
    }

    componentDidMount() {
        var _this = this;

        this.focusMainInput();

        this.unsubscribeCollections = CollectionsStore.listen(this.onCollectionsChange.bind(this));

        if ((this.props.parentId||0)>0){
            this.handleChangeCollection( {_id: this.props.parentId} );
        }

        if (this.state.item._id)
            Api.get("collection/"+this.state.item._id+"/collaborators", function(json){
                if (json.items){
                    var members = 0, viewers = 0;
                    for(var i in json.items)
                        if (json.items[i].role=="member") members++;
                        else if ((json.items[i].role=="owner")&&(_this.state.item.public)) members++;
                        else if (json.items[i].role=="viewer") viewers++;

                    var collaboratorsText = "";
                    if ((members)||(viewers))
                        collaboratorsText = ", " + parseInt(members+viewers)+" "+t.s("members").toLowerCase();

                    if (viewers)
                        collaboratorsText += " (" + viewers+" "+t.s("role_viewer").toLowerCase() + ")";

                    if (collaboratorsText)
                        _this.setState({collaboratorsText: collaboratorsText});
                }
            });
    }

    componentWillUnmount() {
        this.unsubscribeCollections();
    }

    focusMainInput() {
        var _this = this;
        setTimeout(function() {
            var input = ReactDom.findDOMNode(_this.refs.title);
            if (input){
                input.focus();
                if (_this.state.item._id==0)
                    input.setSelectionRange && input.setSelectionRange(0, input.value.length);
                else
                    input.setSelectionRange && input.setSelectionRange(input.value.length, input.value.length);
            }
        }, 0);
    }

    handleTitleChange(value) {
        this.state.item.title = value;
        this.setState({item: this.state.item});
    }

    handleExcerptChange(e) {
        this.state.item.excerpt = e.target.value;
        this.setState({item: this.state.item});
    }

    handleOpenCollectionsList(e) {
        e.preventDefault();
        this.setState({step: "parent"});
    }

    handleOpenIcons(e) {
        e.preventDefault();
        if ((this.state.item.author && this.state.item._id>=0)||(this.state.item.blank))
            this.setState({step: "icons"});
    }

    handleOpenSharing(e) {
        e.preventDefault();
        this.setState({step: "sharing"});
    }

    handleChangeCollection(collection) {
        if (UserStore.isPro()){
          this.state.item.parentId = parseInt(collection._id);
          this.state.item.parent = {"$id": this.state.item.parentId};
          delete this.state.item.group;
        }

        this.setState({item: this.state.item, step: "form"});
        this.focusMainInput();
    }

    handleChangeGroup(group, index) {
        this.state.item.group = parseInt(index);
        delete this.state.item.parent;
        delete this.state.item.parentId;

        this.setState({item: this.state.item, step: "form"});
        this.focusMainInput();
    }

    goToForm(e) {
        e.preventDefault();
        this.setState({step: "form"});
        this.focusMainInput();
    }

    handleCollectionSave(cId) {
        if ((this.state.item._id==0)||(cId == CollectionsStore.getCurrentId()))
            window.location.hash="#/collection/"+cId+"?d="+new Date().getTime();
        //this.props.router.transitionTo('collection', {cId: this.state.cId}, {d: new Date().getTime() });
        Pop.close();
    }

    handleSave(e) {
        e.preventDefault();

        var _this = this;

        if (this.state.item._id==0)
            CollectionsActions.insertCollection({
                item: this.state.item
            }, function(cId){
                if (cId>0)
                    _this.handleCollectionSave(cId);
                else
                    _this.setState({loading:false});
            });
        else {
            var toUpdate = {
                _id: this.state.item._id,
                title: this.state.item.title,
                //excerpt: this.state.item.excerpt,
                parentId: this.state.item.parentId,
                group: this.state.item.group
            };

            if (this.updateCover){
                toUpdate.cover = this.state.item.cover;
                toUpdate.cover_path = this.state.item.cover_path;
            }

            CollectionsActions.updateCollection({
                item: toUpdate
            }, function (cId) {
                if (cId > 0) {
                    _this.handleCollectionSave(cId);
                }else
                    _this.setState({loading:false});
            });
        }

        this.setState({loading: true});
    }

    handleRemoveCollection(e) {
        e.preventDefault();
        var _this = this, lastId = this.state.item._id;

        CollectionsActions.removeCollection({
            item: this.state.item
        }, function(result){
            if (result){
                if (CollectionsStore.getCurrentId() == lastId){
                    setTimeout(()=>{
                        window.location.hash="#/collection/0";
                    },100)
                    //this.props.router.transitionTo('app', {}, {reset: "true"});
                }

                Pop.close();
            }
        });
    }

    setCover(cover, cover_path) {
        this.updateCover = true;
        this.state.item.cover = [cover];
        this.state.item.cover_path = cover_path;
        this.setState({item: this.state.item, step: "form"});
    }

    handleClose(e) {
        e.preventDefault();
        Pop.close();
    }

    handleRSS(e) {
        var link = config.host + "/collection/" + this.state.item._id + "/feed";
        if (e.target.value=="private"){
            link = config.host + "/feed/" + this.state.item.uniqKey;
        }
        window.open(link);
    }

    handleSubFolder(e) {
        e.preventDefault();
        Pop.close();
        Pop.show("collection", {
            parentId: this.state.item._id,
            pin: this.props.pin,
            force: this.props.force
        })
    }

    componentDidUpdate() {
        this.props.onUpdate();
    }

    _render() {
    	if (this.state.disableNested)
            return (
                <div className={(this.props.isSubContent ? "pop-sub-content":"pop-content")}>
                    

                    <footer>
                        <a href={config.proPage} target="_blank" className="but accent pull-right">{t.s("goToPRO")}</a>
                        <a href="" onClick={this.handleClose} className="but default pull-right">{t.s("cancel")}</a>
                    </footer>
                </div>
            );

        var loading = this.state.loading;

        if (!loading){
            //Change collection
            if (this.state.step == "parent"){
                return (
                    <div className="pop-content">
                    <div className="pop-sticky-header">
                        <div className="sticky-header">
                            <header>
                                <div className="actions">
                                    <a href="" className="but default onlyicons" onClick={this.goToForm}><Icon name="back" /></a>
                                </div>
                                <div className="max title center">
                                    {t.s("parent")}
                                </div>
                                <div className="actions"></div>
                            </header>
                        </div>

                        <CollectionsList
                            skipCollection={this.state.item._id}
                            activeCollection={this.state.item.parentId}
                            activeGroup={this.state.item.group}
                            onSelectCollection={this.handleChangeCollection}
                            onSelectGroup={this.handleChangeGroup}
                            onCancel={this.goToForm} />
                    </div>
                    </div>
                );
            }

            //Change icons
            if (this.state.step == "icons"){
                return <CollectionIcon
                                    collection={this.state.item}
                                    goToForm={this.goToForm}
                                    onUpdate={this.props.onUpdate}
                                    setCover={this.setCover} />;
            }

            //Sharing
            if (this.state.step == "sharing"){
                return <CollectionSharing
                                    collection={this.state.item}
                                    goToForm={this.goToForm}
                                    onUpdate={this.props.onUpdate} />;
            }
        }
        

        var parent = null, cover = null;

        if (typeof this.state.item.parentId == 'number') {
            parent = CollectionsStore.getCollection(this.state.item.parentId);
            cover = <CollectionIcon className="small-icon" src={(parent.cover||[])[0]} _id={this.state.item.parentId} />;
        }else if (typeof this.state.item.group == 'number') {
            try{
              parent = {
                  isGroup: true,
                  title: UserStore.getUser().groups[this.state.item.group].title
              };
            }catch(e){}
            cover = <Icon name="group" className="content-icon" />;
        }

        if (parent==null){
            parent = {
                title: ""
            }
        }

        var removeCollection = null;
        if (this.state.item._id>0)
            removeCollection = <a href="" className="button " onClick={this.handleRemoveCollection}>{t.s("remove")}</a>;

        var viewDesc = "";
        switch(this.state.item.view){
            case "grid":
                viewDesc = t.s("visualBookmarks");
            break;

            case "masonry":
                viewDesc = t.s("visualBookmarks") + " (Moodboard)";
            break;

            case "simple":
                viewDesc = t.s("icon") + ", " + t.s("title").toLowerCase() + " " + t.s("und") + " " + t.s("tags").toLowerCase();
            break;

            default:
                viewDesc = t.s("cover") + ", " + t.s("title").toLowerCase() + ", " + t.s("description").toLowerCase() + " " + t.s("und") + " " + t.s("tags").toLowerCase();
            break;
        }

        return (
        <div>
            <div className={(this.props.isSubContent ? "pop-sub-content":"pop-content")+" "+(loading ? "invisible" : null)}>
                <form onSubmit={this.handleSave.bind(this)}>
                    <header>
                        <div className="max title" style={{marginRight:0}}>
                            <input type="text" className="important" required autoFocus valueLink={{value: this.state.item.title, requestChange: this.handleTitleChange}} ref="title" />
                            
                            <div className={"sublinks" + (this.state.item._id <= 0 ? " hidden" : "")}>
                                <a href={config.host+"/collection/"+this.state.item._id} target="_blank" className={"button small " + (this.state.item.public ? "" : "hidden")}><Icon name="link" /> {t.s("link")}</a>

                                <label className="button small select">
                                    <Icon name="rss" />
                                    <select value="-1" onChange={this.handleRSS.bind(this)}>
                                        {this.state.item.public ? <option value="public">{t.s("publicRSSfeed")}</option> : null}
                                        <option value="private">{t.s("privateRSSfeed")}</option>
                                        <option value="-1" disabled>{t.s('feedWarning')}</option>
                                    </select>
                                    RSS
                                </label>
                            </div>
                        </div>

                        <div className="cover" onClick={this.handleOpenIcons.bind(this)}>
                        	<CollectionIcon className="cover-img cover-small" src={(this.state.item.cover||[])[0]} _id={this.state.item._id||null} />
                            {/*className="cover-img cover-small"*/}
                        </div>
                    </header>

                    <div className="entries">
                        <div className="row">
                            <div className="title">{t.s("path")}</div>
                            <div className="content">
                                <a href="" className="block-link" onClick={this.handleOpenCollectionsList.bind(this)}>{cover}{parent.title}</a>
                            </div>
                        </div>

                        <div className={"row" + (this.state.item._id <= 0 ? " hidden" : "")}>
                            <div className="title wrap-text">{t.s("sharing")}</div>
                            <div className="content">
                                <a href="" className="block-link" onClick={this.handleOpenSharing.bind(this)}><Icon name={this.state.item.public ? "link" : "lock"} className="content-icon" />{t.s((this.state.item.public ? "publicD" : "privateD"))}{this.state.collaboratorsText}</a>
                            </div>
                        </div>
                    </div>

                    <footer>
                        <input type="submit" className={"button active pull-right "+((!this.state.item.author || this.state.item._id<0) && !this.state.item.blank  ? "hidden" : "")} value={this.state.item._id > 0 ? t.s("save") : t.s("createNewCollection")}/>
                        <a href="" onClick={this.handleClose.bind(this)} className="button pull-right">{t.s("cancel")}</a>

                        {removeCollection}
                    </footer>
                </form>
            </div>

            <div className={"pop-loader "+(loading ? null : "hidden")}></div>
        </div>);
    }

    themeCSSBlock(c) {
        return `
            #pop-body .button.active, #pop-body .button:hover, .popCollectionCover {color:${c} !important;}
            #pop-body .button.active b {background:${c} !important;}
            #pop-body .preloader .preloaderPath {stroke: ${c}}
        `
    }

    renderLoading() {
        if (!this.state.loading) return null;

        return (
            <div className="popLayoutOverlay">
                <Preloader />
            </div>
        );
    }

    renderOptional() {
        if (this.state.item._id <= 0)
            return null;

        return [
            (
                <TableRow key="access" title={t.s("access")}>
                    <a className="button active min">
                        <Icon name="status_public" />
                        {t.s((this.state.item.public ? "publicD" : "private"))+this.state.collaboratorsText}
                    </a>
                    <a className="button active min"><Icon name="rss" />RSS</a>
                </TableRow>
            )
        ];
    }

    renderMain() {
        var parent = null, parentCover = null;

        if (typeof this.state.item.parentId == 'number') {
            parent = CollectionsStore.getCollection(this.state.item.parentId);
            parentCover = <CollectionIcon src={(parent.cover||[])[0]} _id={this.state.item.parentId} />;
        }else if (typeof this.state.item.group == 'number') {
            try{
              parent = {
                  isGroup: true,
                  title: UserStore.getUser().groups[this.state.item.group].title
              };
            }catch(e){}
            parentCover = <Icon name="group" className="content-icon" />;
        }

        if (parent==null){
            parent = {
                title: ""
            }
        }

        var collectionIcon = t.s("icon");
        if ((this.state.item.cover||[]).length>0)
            collectionIcon = [<CollectionIcon key="cicon" className="popCollectionCoverImg" src={(this.state.item.cover||[])[0]} _id={this.state.item._id||null} />,<Icon key="carrow" name="arrow" />];

        return (
            <form ref="form" className="popLayout" onSubmit={this.handleSave.bind(this)}>
                <header>
                    <div className="title">
                        <label className="miniHeader" htmlFor="itemTitle">{this.state.item._id ? t.s('collection') : t.s("collectionNew")}</label>
                        <input id="itemTitle" className="primaryInput" type="text" required autoFocus valueLink={{value: this.state.item.title, requestChange: this.handleTitleChange}} ref="title" />
                    </div>

                    <div className="popCollectionCover">
                        {collectionIcon}
                    </div>
                </header>

                <article>
                    <div className="tableForm">
                        <TableRow title={t.s("parent")}>
                            <a className="button active min" onClick={this.handleOpenCollectionsList.bind(this)}>{parentCover}{parent.title}</a>
                        </TableRow>

                        {this.renderOptional()}
                    </div>
                </article>

                <footer>
                    <div className="title">
                        {this.state.item._id ? <a className="button" onClick={this.handleRemoveCollection.bind(this)}><Icon name="trash" /></a> : null}
                    </div>

                    <a className="button active" onClick={this.handleSave.bind(this)}><b>{t.s("save")}</b></a>
                </footer>
            </form>
        );
    }

    render() {
        var content = null;
        switch(this.state.step) {
            case "parent":
                content = <PathHelper
                    title={t.s("parent")} 
                    skipCollection={this.state.item._id}
                    activeCollection={this.state.item.parentId}
                    activeGroup={this.state.item.group}
                    onSelectCollection={this.handleChangeCollection.bind(this)}
                    onSelectGroup={this.handleChangeGroup.bind(this)}
                    onCancel={this.goToForm.bind(this)}
                />;
            break;

            default:
                content = this.renderMain();
            break;
        }

        return (
            <div className={"popLayoutWrap "+(this.state.loading ? "loading" : "")}>
                <ThemeColor collection={this.state.item} cssBlock={this.themeCSSBlock} />
                {this.renderLoading()}

                {content}
            </div>
        );
    }
}