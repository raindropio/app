window.rdportal = {
    page: '',
    iframe: null,

    open: function(path, mode) {
        //route loaded from actual site because of bug of safari/brave extension (local files doesn't have access)
        if (this.page.startsWith('safari') || 'brave' in navigator){
            const width = 420;
            const height = 600;
            const left = parseInt((screen.width/2)-(width/2));
            const top = parseInt((screen.height/2)-(height/2));
            return window.open(`https://app.raindrop.io${path}`, 'rdp', `width=${width},height=${height},left=${left},top=${top}`)
        }

        if (this.iframe && mode == 'browser_action'){
            this.close()
            return
        }

        if (!this.iframe){
            this.iframe = document.createElement('iframe')
            this.iframe.tabIndex = -1
            this.iframe.setAttribute('loading', 'eager')
            this.iframe.setAttribute('allowtransparency', 'true')
            this.iframe.setAttribute('plugins', 'true')
            this.iframe.style = `
                zoom: 1 !important;
                border: 0 !important;
                box-shadow: none !important;
                transform: none !important;
                transition: none !important;
                opacity: 1 !important;
                display: block !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                max-width: 100vw !important;
                max-height: 100vh !important;
                min-width: 0 !important;
                min-height: 0 !important;
                border-radius: 0 !important;

                color-scheme: light !important;
                background: transparent !important;
                position: fixed !important;
                top: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                z-index: 9999999999999 !important;
            `

            window.addEventListener('message', ({ origin, data })=>{
                if (!this.page.toLowerCase().startsWith(origin.toLowerCase())) return

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
    },

    show: function() {
        if (!this.iframe) return

        this.iframe.style.display = 'block'
    },

    hide: function() {
        if (!this.iframe) return

        this.iframe.style.display = 'none'
    }
}