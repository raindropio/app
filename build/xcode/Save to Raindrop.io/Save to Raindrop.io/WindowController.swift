//
//  WindowController.swift
//  Raindrop.io
//
//  Created by Rustem Mussabekov on 05/06/2019.
//  Copyright © 2019 Raindrop.io. All rights reserved.
//

import Cocoa

class WindowController: NSWindowController {
    var controllers: [String:NSViewController] = [:]

    override func windowDidLoad() {
        super.windowDidLoad()
        
        NSAppleEventManager.shared().setEventHandler(self, andSelector: #selector(handleURLEvent(_:replyEvent:)), forEventClass: UInt32(kInternetEventClass), andEventID: UInt32(kAEGetURL))
    }
    
    @objc func handleURLEvent(_ event: NSAppleEventDescriptor?, replyEvent: NSAppleEventDescriptor?) {
        guard let event = event else { return }
        guard let urlString = event.paramDescriptor(forKeyword: UInt32(keyDirectObject))?.stringValue else { return }
        guard let url = URL(string: urlString) else { return }
        
        if let host = url.host {
            //Parse query
            var query = [String:String]()
            if let components = URLComponents(url: url, resolvingAgainstBaseURL: false),
                let queryItems = components.queryItems {
                for item in queryItems {
                    query[item.name] = item.value!
                }
            }
            
            switch host {
                case "subscribe":
                    changeView("subscribe")
                    
                    let subscribeController = controllers["subscribe"] as! SubscribeViewController
                    subscribeController.login(token: query["token"] ?? "")
                break

                default:
                    NSLog("no host")
            }
        }
    }
    
    func changeView(_ name: String) {
        if controllers[name] == nil {
            controllers[name] = storyboard?.instantiateController(withIdentifier: name+"ViewController") as? NSViewController
        }
        
        if controllers[name] != nil {
            self.window?.contentViewController = controllers[name]
        }
    }

}
