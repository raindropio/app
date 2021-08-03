window.rdportal = {
    page: '',
    iframe: null,

    open: function(path, mode) {
        if (this.iframe && mode == 'browser_action'){
            this.close()
            return
        }

        if (!this.iframe){
            this.iframe = document.createElement('iframe')
            this.iframe.tabIndex = -1
            this.iframe.allowtransparency = true
            this.iframe.plugins = true
            this.iframe.style = `
                border: 0;
                background: transparent;
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999999999999;
                color-scheme: light;
            `

            window.addEventListener('message', ({ origin, data })=>{
                if (!this.page.startsWith(origin)) return

                switch(data.action) {
                    case 'close':
                        return this.close()
                }
            })
            
            document.body.append(this.iframe)
        }

        this.iframe.src = `${this.page}?mode=${mode}#${path}`
    },

    close: function() {
        if (!this.iframe) return
        
        this.iframe.remove()
        this.iframe = null
    }
}