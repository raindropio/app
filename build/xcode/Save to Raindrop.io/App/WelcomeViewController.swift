//
//  ViewController.swift
//  Save to Raindrop.io
//
//  Created by Rustem Mussabekov on 18.09.2020.
//

import Cocoa
import SafariServices.SFSafariApplication
import SafariServices.SFSafariExtensionManager

let appName = "Save to Raindrop.io"
let extensionBundleIdentifier = "io.raindrop.safari.extension"

class WelcomeViewController: NSViewController {

    @IBOutlet var appNameLabel: NSTextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.appNameLabel.stringValue = appName
        SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: extensionBundleIdentifier) { (state, error) in
            guard let state = state, error == nil else {
                // Insert code to inform the user that something went wrong.
                return
            }

            DispatchQueue.main.async {
                if (state.isEnabled) {
                    self.appNameLabel.stringValue = "Extension is currently on"
                } else {
                    self.appNameLabel.stringValue = "Extension is currently off. You can turn it on in Safari Extensions preferences"
                }
            }
        }
    }
    
    @IBAction func openSafariExtensionPreferences(_ sender: AnyObject?) {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: extensionBundleIdentifier) { error in
            guard error == nil else {
                // Insert code to inform the user that something went wrong.
                return
            }

            DispatchQueue.main.async {
                NSApplication.shared.terminate(nil)
            }
        }
    }

    @IBAction func troubleshootingClick(_ sender: Any) {
        NSWorkspace.shared.open(URL(string: "https://help.raindrop.io/safari-mac-problems")!)
    }
}
