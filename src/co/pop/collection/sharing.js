import React from 'react'
import t from '~t'
import network from '~network'
import Api from '~api'

import Icon from '~icon'

import Toasts from '../../../actions/toast'
import UserStore from '../../../stores/user'

import CollectionsActions from '../../../actions/collections'
import Avatar from "../../common/avatar"

var _roles = [
    {
        key: "owner",
        value: t.s("role_owner")
    },
    {
        key: "member",
        value: t.s("role_member")
    },
    {
        key: "viewer",
        value: t.s("role_viewer")
    }
];

export default class CollectionSharing extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            collection: props.collection,
            collaborators: [],
            invite: {
                emails: "",
                role: "member",
                loading: false
            }
        }
    }

    componentDidMount() {
        this.loadCollaborators()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.state.collection = nextProps.collection;
        this.loadCollaborators();

        this.setState({
            collection: nextProps.collection
        });
    }

    loadCollaborators = (force)=>{
        var _this = this, link = "collection/"+this.state.collection._id+"/collaborators";

        //frome cache
        if (this.state.collaborators.length==0){
            var temp = null;
            try{temp = JSON.parse(Api.getItem(link));} catch(e) {}
            if (temp)
                this.setState({collaborators: temp||[]});
        }

        if ((this.state.collaborators.length==0)||(typeof force != 'undefined'))
            Api.get(link, function(json){
                _this.setState({collaborators: json.items||[]});
                Api.setItem(link, JSON.stringify(json.items||[]));
            });
    }

    handleChangePublic = (e)=>{
        e.preventDefault();
        this.state.collection.public = !this.state.collection.public;

        CollectionsActions.updateCollection({
            item: {
                _id: this.state.collection._id,
                public: this.state.collection.public
            },
            silent: true
        }, function (cId) {});

        this.setState({collection: this.state.collection});
    }

    handleChangeRole = (e)=>{
        var role = e.target.value,
            userId = parseInt(e.target.getAttribute("data-userid"));

        var _this = this;
        Api.put("collection/"+this.state.collection._id+"/role", {accesslevel: role, userId: userId}, function(json){
            if (json.result){
                _this.loadCollaborators(true);
                /*var index = _.findIndex(_this.state.collaborators, { userId: parseInt(params.userId) });
                if (index!=-1)
                    _this.state.collaborators[index].role = role;
                    _this.setState({collaborators: _this.state.collaborators});*/
            }
        });
    }

    handleRemoveRole = (e)=>{
        e.preventDefault();
        this.handleChangeRole("", {userId: e.target.getAttribute("data-userid")});
    }

    handleUnshareCollection = (e)=>{
        e.preventDefault();

        var _this = this;
        Api.put("collection/"+this.state.collection._id+"/unshare", {}, function(json){
            //if (json.result){
                Toasts.show({text: t.s("unshareSuccess"), title: _this.state.collection.title});
                _this.loadCollaborators(true);
            //}
        });
    }

    handleEmailsChange = (e)=>{
        this.state.invite.emails = e.target.value;
        this.setState({invite: this.state.invite});
    }

    handleChangeInviteRole = (e)=>{
        this.state.invite.role = this.state.invite.role=='viewer' ? 'member' : 'viewer';
        this.setState({invite: this.state.invite});
    }

    handleSendInvites = (e)=>{
        e.preventDefault();
        var _this = this;

        this.state.invite.loading = true;
        this.setState({invite: this.state.invite});

        Api.get("collection/"+this.state.collection._id+"/invite?emails="+this.state.invite.emails+"&accesslevel="+this.state.invite.role, function(json){
            if (json.result){
                _this.state.invite.emails = "";

                Toasts.show({title: t.s("invitesSendTo"), text: json.emails.join(", ") });
            }else{
                Toasts.show({text: t.s("error"), status: "error"});
            }

            _this.state.invite.loading = false;
            _this.setState({invite: _this.state.invite});
        });
    }

    handleSelectAll = (e)=>{
        e.target.focus();
        e.target.select();
    }

    renderMember = (item,index)=>{
        var first = (index==0);
        var actions = t.s("role_"+item.role);
        if (item.role!="owner" && this.state.collection.author)
            actions = (
                <label className="but select default onlyicons">
                    <Icon name="settings" />
                    <Icon name="arrow" />

                    <select value={item.role} data-userid={item._id} onChange={this.handleChangeRole}>
                        <optgroup label={t.s("withAccessLevel")}>
                            {item.role=="owner" ? <option value="owner">{t.s("role_owner")}</option> : null}
                            <option value="member">{t.s("role_member")}</option>
                            <option value="viewer">{t.s("role_viewer")}</option>
                        </optgroup>

                        <optgroup label="&#8984;">
                            <option value="">{t.s("remove")}</option>
                        </optgroup>
                    </select>
                </label>
            );

        return (
            <div key={"member"+item._id} className={"item "+(first?"first":"")}>
                <div className="icon">
                    <Avatar src={item.email_MD5} size="64" />
                </div>

                <div className="title">
                    {item.fullName}
                    <input type="text" value={item.email} readOnly  onFocus={this.handleSelectAll} onMouseUp={this.handleSelectAll} />
                </div>

                <div className="actions">
                    {actions}
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        this.props.onUpdate();
    }

    render() {
        var _this = this, collaborators = [], members = [], viewers = [];

        members = this.state.collaborators.filter(function(item){
            return ((item.role == "owner")||(item.role == "member"));
        });

        viewers = this.state.collaborators.filter(function(item){
            return (item.role == "viewer");
        });

        //Members
        if (members.length>0){
            collaborators.push(<div key="memberSeparator" className="separator">{t.s("role_members")}</div>);
            members.forEach(function(item,index) {collaborators.push(_this.renderMember(item, index));});
        }

        //Viewers
        if (viewers.length>0){
            collaborators.push(<div key="viewerSeparator" className="separator">{t.s("role_viewer")}</div>);
            viewers.forEach(function(item,index) {collaborators.push(_this.renderMember(item, index));});
        }

        //Unshare button
        var unshare = null;
        if (this.state.collection.user["$id"] == UserStore.getUser()._id)
            unshare = <a href="" className="button" onClick={this.handleUnshareCollection}>{t.s("unshareCollection")}</a>;

        //Invite
        var invite = null;
        if (this.state.invite.emails.trim()!="") {
            unshare = null;

            if (!this.state.invite.loading)
                invite = <a href="" className="button active pull-right" onClick={this.handleSendInvites}><b>{t.s("sendInvites")}</b></a>;
            else
                invite = <div className="pull-right">{t.s("loading")}</div>;
        }

    	return (
    		<div className="pop-content">


                    <div className="list">
                        <div className="item first">
                            <div className="icon">
                                <div className="icon-link"><Icon name="link" /></div>
                            </div>

                            <div className="title">
                                {t.s("accessViaLink")}
                                <input type="text" className={this.state.collection.public ? "" : "hidden"} readOnly autoFocus value={network.fixURL("/collection/"+this.state.collection._id||"")} onFocus={this.handleSelectAll} onMouseUp={this.handleSelectAll} />
                            </div>

                            <div className="actions">
                                <div onClick={this.handleChangePublic} className={"extra-checkbox"+(this.state.collection.public?" active":"")}></div>
                            </div>
                        </div>

                        {collaborators}


                        <div className="separator">{t.s("inviteMorePeople")}</div>

                        <div className="item first">
                            <div className="icon">
                                <Icon name="add" className="icn-blue" />
                            </div>

                            <div className="title">
                                <textarea placeholder={t.s("enterEmails")} disabled={this.state.invite.loading} value={this.state.invite.emails} onChange={this.handleEmailsChange}></textarea>
                            </div>
                        </div>

                        <div className={"item " + (!invite ? "hidden" : null)}>
                            <div className="icon">
                                <Icon name="lock" className="icn-blue" />
                            </div>

                            <div className="title">
                                <label className="check">
                                    <input type="checkbox" checked={this.state.invite.role=='member'} onChange={this.handleChangeInviteRole} />
                                    &nbsp;
                                    {t.s("role_members")}
                                </label>
                            </div>

                            <div className="actions">
                                
                            </div>
                        </div>

                        <footer className={!invite && !unshare ? "hidden" : null}>
                            {invite}
                            {unshare}
                        </footer>
                    </div>

            </div>
    	);
    }
}