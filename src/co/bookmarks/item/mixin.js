import React from 'react'
import isMobile from 'ismobilejs'
import contextMenu from '../../../modules/contextMenu'
import { copyTextToClipboard } from '../../../modules/strings'
import environment from '../../../helpers/environment'
import t from '~t'
import Icon from '~icon'
import bookmarksActions from '../../../actions/bookmarks'

import keyvalActions from '../../../actions/keyval'
import keyvalStore from '../../../stores/keyval'
import ClipperStore from '../../../stores/clipper'
import Pop from '../../../actions/pop'

export default ComposedComponent => class extends React.PureComponent {
	constructor(props) {
        super(props);
        this.state = {};
    }

	openReader(e,_this) {
        if (isMobile(navigator.userAgent).phone) return true;

        if (e.nativeEvent.shiftKey){
            e.preventDefault();
            bookmarksActions.setSelected({id: _this.props.item._id, selected: !_this.props.item.selected, shift: true});
            return false;
        }

        var openViewer = false;
        if (_this.props.onClick)
            if ((_this.props.item.type!= (keyvalStore.onGet("mode-reader-including-links")?"":"link") )||(!e.nativeEvent.isTrusted)||(environment.isDesktop()))
                openViewer = true;

        if (keyvalStore.onGet("mode-disable-reader"))
            openViewer = false;

        if (environment.isClipper())
            openViewer = false;

        var params = (keyvalStore.onGet('mode-reader')||{});

        if ((openViewer)||(params.id)) {
            if (e.nativeEvent.metaKey) return false;
            if (e.nativeEvent.ctrlKey) return false;
            if (!e.nativeEvent.button==0) return false;

            e.preventDefault();
            _this.props.onClick(_this.props.item._id);
        }else{
            //bridge.close();
        }
	}

    closeReader(e,_this) {
        if (_this.props.onEsc)
            _this.props.onEsc();
    }

    onContextMenu(e) {
        e.preventDefault();

        var items = [
            {label: t.s("openInBrowser"), href: this.props.item.link},
            {label: t.s("copyLinkToClipboard"), click: this.handleCopyToClippboard.bind(this)},
            {type: "separator"}
        ]

        if (!this.props.item.cache || this.props.item.type != 'link')
            items.push({label: t.s('open')+' '+t.s("preview").toLowerCase(), click: ()=>this.props.onClick(this.props.item._id)})

        if (this.props.item.cache){
            
            items.push({label: (this.props.item.cache.status != 'ready' ? '⚠️ '+t.s("permanentCopy") : t.s('open') + ' ' +t.s("permanentCopy").toLowerCase()), click: this.handleCache.bind(this)})
        }

        if (this.props.author){
            var favPrefix = t.s("add") +" " + t.s("to");
            if (this.props.item.important)
                favPrefix = t.s("remove")+" "+t.s("from");

            items = items.concat([
                {type: "separator"},
                {label: t.s("select"), click: this.checkElement.bind(this)},
                {label: favPrefix + " " + t.s("favoriteSites").toLowerCase(), click: this.handleImportant.bind(this)},
                {label: t.s("clickToMakeScreenshot"), click: this.handleScreenshot.bind(this)},
                {label: t.s("refresh")+" "+t.s('preview').toLowerCase(), click: this.handleReparse.bind(this)},
                {type: "separator"},
                {label: t.s("edit"), click: this.handleEdit.bind(this)},
                {label: t.s("remove"), click: this.handleRemove.bind(this)}
            ]);
        }

        contextMenu.show(items, {x: e.clientX, y: e.clientY});
    }

    onKey(e) {
        if (
            ((e.keyCode == 8)&&(e.metaKey || e.ctrlKey))|| //backspace+command
            (e.keyCode == 46) //delete
        )
            this.handleRemove();
    }

    handleCopyToClippboard() {
        copyTextToClipboard(this.props.item.link);
    }

    handleEdit() {
        var tab = "edit", id = parseInt(this.props.item._id), params = (keyvalStore.onGet('mode-reader')||{});

        if ((params.id == id)&&(params.tab=="edit"))
            tab = "";

        keyvalActions.set('mode-reader', {id:id, tab: tab});
    }

    handleCache() {
        var tab = "cache", id = parseInt(this.props.item._id), params = (keyvalStore.onGet('mode-reader')||{});

        if ((params.id == id)&&(params.tab=="cache"))
            tab = "";

        keyvalActions.set('mode-reader', {id:id, tab: tab});
    }

    handleScreenshot() {
        this.checkElement();
        Pop.show('loading',{title: t.s("clickToMakeScreenshot")});
        bookmarksActions.setScreenshotSelectedBookmarks((result)=>{
            Pop.close();
        })
    }

    handleReparse() {
        this.checkElement();
        Pop.show('loading',{title: t.s("refresh")+" "+t.s('preview').toLowerCase()});
        bookmarksActions.reparseSelectedBookmarks((result)=>{
            Pop.close();
        })
    }

    handleRemove() {
        bookmarksActions.removeBookmark({
            item: this.props.item
        });
    }

    handleImportant() {
        bookmarksActions.updateBookmark({
            silent: true,
            item: {
                _id: this.props.item._id,
                important: !this.props.item.important
            }
        });
    }

    onCheckContextMenu(e) {
        e.preventDefault();

        var items = [
            {label: t.s(this.props.item.selected ? "removeIt" : "select"), click: this.checkElement.bind(this)},
            {type: "separator"},
            {label: t.s("selectAll"), click: bookmarksActions.selectAll},
            {label: t.s("cancel"), click: bookmarksActions.clearSelect},
        ];

        contextMenu.show(items, {x: e.clientX, y: e.clientY});
    }

    checkElement(e) {
        var shift = false;
        try{shift = e.nativeEvent.shiftKey} catch(e){}
        bookmarksActions.setSelected({id: this.props.item._id, selected: !this.props.item.selected, shift: shift});
    }

    addToFavorite() {
        if (!this.props.author) return null;

        var favPrefix = t.s("add") +" " + t.s("to");
        if (this.props.item.important)
            favPrefix = t.s("remove")+" "+t.s("from");

        return (
            <a className="addToFavorite" title={favPrefix + " " + t.s("favoriteSites").toLowerCase()} onClick={this.handleImportant.bind(this)}>
                <Icon name="like_outline" className="outline" />
                <Icon name="like_active" className="filled" />
            </a>
        );
    }

	render() {
        var authorActions;

        if (this.props.author)
            authorActions = [
                //<span key="important" className={"button min action-small important-action "+(this.props.item.important ? "active" : "")} onClick={this.handleImportant.bind(this)} title={t.s("add") +" " + t.s("to") + " " + t.s("favoriteSites").toLowerCase()}><Icon name={"like"+(this.props.item.important?"_active":"")} /></span>,
                //<span key="remove" className="button min action-small " onClick={this.handleRemove.bind(this)} title={t.s("remove")}><Icon name="trash" /></span>,
                <span key="edit" className={"button min default elementEditAction "+(this.props.isEditMode ? " active" : "")} onClick={this.handleEdit.bind(this)}><b>{t.s("editMin")}</b></span>,
                //<span key="select" className="button min action-small" title={t.s("select")}><Icon name="check" /></span>,
                <span key="more" className="button min default " onClick={this.onContextMenu.bind(this)} title={t.s("helpContextD")}><b><Icon name="more_horizontal" style={{margin:"-4px",verticalAlign: "-1px"}} /></b></span>,
            ];
        else
            authorActions = [
                <span key="edit" className="button min active elementEditAction"><b>{t.s("save")}</b></span>,
            ];

        var actions = (
            <div className="actions" onContextMenu={(e)=>e.preventDefault()}>
                {environment.isClipper() ? null : <a href={this.props.item.link} tabIndex="-1" target="_blank" className="button min action-small" title={t.s("openInBrowser")}><Icon name="open" /></a>}
                
                {authorActions}
            </div>
        )

        var checkIcon;
        if (this.props.author)
            checkIcon = <a className="selectElement" title={t.s("select")} onClick={this.checkElement.bind(this)} onContextMenu={this.onCheckContextMenu.bind(this)}><label><span className="selectCheckbox"><Icon name="check_active" /></span></label></a>;

        //Class
        var className = "";

        if (this.props.item.important)
            className += " important";

        if (this.props.item.broken)
            className += " broken";

        if (this.props.item.selected)
            className += " checked";
        
        if (ClipperStore.getURL() == this.props.item.link)
            className += " current-clipper-bookmark";

        return <ComposedComponent
                    openReader={this.openReader}
                    closeReader={this.closeReader}
                    {...this.props}
                    className={className}
                    actions={actions}
                    addToFavorite={this.addToFavorite.bind(this)}
                    checkIcon={checkIcon}
                    onDoubleClick={this.handleEdit.bind(this)}
                    onContextMenu={this.onContextMenu.bind(this)}
                    onKey={this.onKey.bind(this)} />;
    }
}