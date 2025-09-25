import Cocoa
import WebKit

class Extension: NSViewController {
    let webView: WebView
    let cancel: NSButton
    let auth: Auth
    
    var currentURL: NSURL?
    
    override init(nibName nibNameOrNil: NSNib.Name?, bundle nibBundleOrNil: Bundle?) {
        //webview
        webView = WebView()
        
        //cancel button
        cancel = NSButton(title: "Cancel", target: nil, action: nil)
        cancel.keyEquivalent = "\r"
        cancel.isHidden = true
        
        //auth view
        auth = Auth(frame: .zero)
        auth.isHidden = true
        
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
        
        //configure auth
        auth.callbackURLScheme = "rniomacsafari"
        auth.url = URL(string: "https://api.raindrop.io/v1/auth/jwt?done_uri=rniomacsafari://done")!
        auth.onDone = onAuthDone
        
        //configure webView
        webView.onClose = onClose
        webView.onSizeChange = onSizeChange
        webView.onUrlChange = onUrlChange
        webView.onOpenUrl = onOpenUrl
        
        //configure cancel button
        cancel.target = self
        cancel.action = #selector(onClose)
    }
    
    //extension received items
    override func beginRequest(with context: NSExtensionContext) {
        super.beginRequest(with: context)
        
        Task {
            for input in context.inputItems {
                guard let input = input as? NSExtensionItem else { continue }
                guard let attachments = input.attachments else { continue }
                for provider in attachments {
                    if provider.canLoadObject(ofClass: NSURL.self) {
                        let data = try? await provider.loadObject(ofClass: NSURL.self)
                        currentURL = data as? NSURL
                    }
                }
            }
            
            addCurrentUrl()
        }
    }
    
    //prepare view
    override func loadView() {
        preferredContentSize = NSSize(width: 450, height: 550)
        view = NSView(frame: .init(x: 0, y: 0, width: preferredContentSize.width, height: preferredContentSize.height))
        view.translatesAutoresizingMaskIntoConstraints = false
        
        webView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(webView)
        
        cancel.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(cancel)
        
        auth.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(auth, positioned: .above, relativeTo: webView)
        
        NSLayoutConstraint.activate([
            cancel.topAnchor.constraint(equalTo: view.topAnchor, constant: 12),
            cancel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -12),

            webView.topAnchor.constraint(equalTo: view.topAnchor),
            webView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            webView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            
            auth.topAnchor.constraint(equalTo: view.topAnchor),
            auth.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            auth.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            auth.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }
    
    private func addCurrentUrl() {
        webView.load(.init(url: URL(string: "https://app.raindrop.io/add?link=\(currentURL?.absoluteString?.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed) ?? "")")!))
    }
    
    private func onAuthDone(_ url: URL) {
        //parse search params
        var query = [String:String]()
        if let components = URLComponents(url: url, resolvingAgainstBaseURL: false),
            let queryItems = components.queryItems {
            for item in queryItems {
                query[item.name] = item.value!
            }
        }
        
        let token = query["token"] ?? ""
        
        webView.load(.init(url: URL(string: "https://app.raindrop.io/account/jwt?token=\(token)&redirect=/add?link=\(currentURL?.absoluteString?.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed) ?? "")")!))
    }
    
    private func onUrlChange(_ url: URL) {
        cancel.isHidden = url.absoluteString.contains("/add")
        webView.isHidden = url.absoluteString.contains("/account") || url.absoluteString.contains("/auth")
        auth.isHidden = !webView.isHidden
        
        if url.absoluteString.contains("/settings") {
            self.onClose()
            NSWorkspace.shared.open(url)
        }
    }
    
    @objc private func onClose() {
        extensionContext?.cancelRequest(
            withError: NSError(domain: NSCocoaErrorDomain, code: NSUserCancelledError)
        )
    }
    
    private func onSizeChange(_ size: NSSize) {
        preferredContentSize = .init(
            width: preferredContentSize.width,
            height: min(max(size.height, 200), 800)
        )
    }
    
    private func onOpenUrl(_ url: URL) {
        NSWorkspace.shared.open(url)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
