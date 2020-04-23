import Reflux from 'reflux'
import Api from '~api'
import AppsActions from '~actions/apps'
import t from '~t'

var _state = {
    connections: {
        status: 'empty',
        items: []
    },
    clients: {
        status: 'empty',
        items: []
    }
}

var _blankClient = {
    redirects: []
}

export default Reflux.createStore({
	init: function() {
        this.listenTo(AppsActions.loadConnections, this.onLoadConnections)
        this.listenTo(AppsActions.loadClients, this.onLoadClients)
        this.listenTo(AppsActions.revoke, this.onRevoke)

        this.listenTo(AppsActions.removeClient, this.onRemoveClient)
        this.listenTo(AppsActions.updateClient, this.onUpdateClient)
        this.listenTo(AppsActions.uploadIconClient, this.onUploadIconClient)
        this.listenTo(AppsActions.resetSecretClient, this.onResetSecretClient)
        this.listenTo(AppsActions.createClient, this.onCreateClient)
    },

    onLoadConnections: function() {
        if (_state.connections.status == 'loading')
            return

        _state.connections.status = 'loading'
        this.trigger(_state)

        Api.get('oauth/connections', json=>{
            if (json.errorMessage)
                alert(json.errorMessage)

            _state.connections.status = json.result ? 'loaded' : 'error'
            _state.connections.items = json.items || []

            this.trigger(_state)
        })
    },

    onLoadClients: function() {
        if (_state.clients.status == 'loading')
            return

        _state.clients.status = 'loading'
        this.trigger(_state)

        Api.get('oauth/clients', json=>{
            if (json.errorMessage)
                alert(json.errorMessage)

            _state.clients.status = json.result ? 'loaded' : 'error'
            _state.clients.items = json.items || []

            this.trigger(_state)
        })
    },

    onRevoke: function(id) {
        if (!id) return
        if (!confirm(t.s('areYouSure'))) return

        Api.put(`oauth/client/${id}/revoke`, {}, json=>{
            if (!json.result) {
                alert(json.errorMessage)

                return
            }

            alert(t.s('saveSuccess'))

            _state.connections.items = _state.connections.items.filter(item=>item._id != id)
            this.trigger(_state)
        })
    },

    onCreateClient: function(body, callback) {
        Api.post('oauth/client', body, json=>{
            if (!this.afterUpdateClient(json))
                callback(false)
            else
                callback(json.item._id)

            this.trigger(_state)
        })
    },

    onRemoveClient: function(id, callback) {
        if (!id) return (callback && callback(false))
        if (!confirm(t.s('areYouSure'))) return (callback && callback(false))

        Api.del(`oauth/client/${id}`, json=>{
            if (!json.result) {
                alert(json.errorMessage)

                return (callback && callback(false))
            }

            alert(t.s('removeSuccess'))

            _state.clients.items = _state.clients.items.filter(item=>item._id != id)
            this.trigger(_state)
            callback && callback(true)
        })
    },

    onUpdateClient: function(id, body, callback) {
        Api.put(`oauth/client/${id}`, body, json=>{
            callback(this.afterUpdateClient(json))
            this.trigger(_state)
        })
    },

    onUploadIconClient: function(id, file, callback) {
        Api.upload(
            `oauth/client/${id}/icon`,
            {name: "icon", file},
            function(progress){},
            json=>{
                callback(this.afterUpdateClient(json))
                this.trigger(_state)
            }
        )
    },

    onResetSecretClient: function(id, callback) {
        if (!confirm(t.s('areYouSure'))) return callback(true)

        Api.put(`oauth/client/${id}/reset_secret`, {}, json=>{
            callback(this.afterUpdateClient(json))
            this.trigger(_state)
        })
    },

    getTestTokenClient: function(id, callback) {
        Api.get(`oauth/client/${id}/test_token`, json=>{
            if (!json.result)
                alert(json.errorMessage)

            callback(json.token||'')
        })
    },

    createTestTokenClient: function(id, callback) {
        Api.post(`oauth/client/${id}/test_token`, {}, json=>{
            if (!json.result)
                alert(json.errorMessage)

            callback(json.token||'')
        })
    },

    afterUpdateClient: json=>{
        if (!json.result) {
            alert(json.errorMessage)
            return false
        }

        const index = _state.clients.items.findIndex(item=>item._id==json.item._id)
        if (index!=-1)
            _state.clients.items[index] = json.item
        else
            _state.clients.items.push(json.item)

        return true
    },

    getClient(id) {
        return _state.clients.items.find(item=>item._id == id) || _blankClient
    },

    getState() {
		return _state;
	}
})