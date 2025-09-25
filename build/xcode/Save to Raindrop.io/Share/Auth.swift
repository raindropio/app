import Cocoa
import AuthenticationServices

class Auth: NSView, ASWebAuthenticationPresentationContextProviding {
    private var session: ASWebAuthenticationSession?
    
    var url: URL?
    var callbackURLScheme: String?
    var onDone: ((URL) -> Void)?
    
    override init(frame frameRect: NSRect) {
        super.init(frame: frameRect)
        
        let label = NSTextField(labelWithString: "Please sign in to save bookmark to Raindrop.io")
        let button = NSButton(title: "Sign in", target: self, action: #selector(onClickSignIn))
        
        label.translatesAutoresizingMaskIntoConstraints = false
        button.translatesAutoresizingMaskIntoConstraints = false
        
        addSubview(label)
        addSubview(button)
        
        NSLayoutConstraint.activate([
            // center horizontally
            label.centerXAnchor.constraint(equalTo: centerXAnchor),
            button.centerXAnchor.constraint(equalTo: centerXAnchor),
            
            // vertical stacking
            label.centerYAnchor.constraint(equalTo: centerYAnchor, constant: -12),
            button.topAnchor.constraint(equalTo: label.bottomAnchor, constant: 12)
        ])
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    @objc private func onClickSignIn() {
        session?.cancel()
        
        if let url, let callbackURLScheme {
            session = .init(url: url, callbackURLScheme: callbackURLScheme) { endUrl, error in
                if let endUrl, let onDone = self.onDone {
                    DispatchQueue.main.async {
                        onDone(endUrl)
                    }
                }
            }
            session?.presentationContextProvider = self
            session?.start()
        }
    }
    
    @MainActor
    public func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor {
        return ASPresentationAnchor()
    }
}
