import WebKit

class WebView: WKWebView, WKScriptMessageHandler, WKUIDelegate {
    private var urlObs: NSKeyValueObservation?
    
    var onUrlChange: ((URL) -> Void)?
    var onClose: (() -> Void)?
    var onSizeChange: ((NSSize) -> Void)?
    var onOpenUrl:((URL) -> Void)?

    init() {
        let configuration = WKWebViewConfiguration()
        super.init(frame: .zero, configuration: configuration)
        
        setValue(false, forKey: "drawsBackground")
        wantsLayer = true
        layer?.backgroundColor = NSColor.clear.cgColor
        
        //custom scripts
        let userScript = WKUserScript(
            source: """
                window.close = ()=>window.webkit.messageHandlers.close.postMessage(null)
            
                document.body.style.height='auto'
                function track() {
                    window.webkit.messageHandlers.size.postMessage({
                        width: Math.min(document.body.scrollWidth, document.documentElement.scrollWidth),
                        height: Math.min(document.body.scrollHeight, document.documentElement.scrollHeight)
                    })
                }
                track()
                var ro = new ResizeObserver(track)
                ro.observe(document.documentElement)
                ro.observe(document.body)
            """,
            injectionTime: .atDocumentEnd,
            forMainFrameOnly: true
        )
        configuration.userContentController.addUserScript(userScript)
        configuration.userContentController.add(self, name: "close")
        configuration.userContentController.add(self, name: "size")
        
        //track url change
        urlObs = observe(\.url, options: [.new]) { [weak self] wv, change in
            guard let url = change.newValue as? URL else { return }
            if let onchange = self?.onUrlChange {
                onchange(url)
            }
        }
        
        //delegates
        uiDelegate = self
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "close" {
            if let onclose = onClose {
                onclose()
            }
        }
        
        if message.name == "size" {
            guard let dict = message.body as? [String: Any],
                  let width = dict["width"] as? CGFloat,
                  let height = dict["height"] as? CGFloat else { return }
            
            if let onchange = onSizeChange {
                onchange(.init(width: width, height: height))
            }
        }
    }
    
    //window.open, etc
    public func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if navigationAction.targetFrame == nil {
            load(navigationAction.request)
        }
        if let url = navigationAction.request.url, let openurl = onOpenUrl {
            openurl(url)
        }
        return nil
    }
}
