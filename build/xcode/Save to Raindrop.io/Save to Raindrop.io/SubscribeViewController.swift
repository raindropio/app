//
//  PurchaseViewController.swift
//  Raindrop for Safari
//
//  Created by Mussabekov, Rustem on 08/02/2019.
//  Copyright © 2019 Raindrop.io. All rights reserved.
//

import Cocoa
import SwiftyStoreKit
import Just
import WebKit

class SubscribeViewController: NSViewController {
    
    @IBOutlet var userLabel: NSTextField!
    @IBOutlet var userEmail: NSTextField!
    @IBOutlet var loading: NSProgressIndicator!
    @IBOutlet var mainStack: NSStackView!
    @IBOutlet var purchase1: NSButton!
    @IBOutlet var purchase12: NSButton!
    @IBOutlet var troubleshooting: NSButton!
    @IBOutlet var webView: WKWebView!

    var purchaseButtons: [Int: NSButton] { return [1: purchase1, 12: purchase12] }
    
    var userId = 0
    let ids: [Int: String] = [1: "mac_safari_promonthly1", 12: "mac_safari_proannual1"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        webView.load(URLRequest(url: URL(string: "https://raindrop.io/pro?frame=1&pro=1")!))
    }
    
    override func viewDidAppear() {
        super.viewDidAppear()
    }
    
    func login(token: String) {
        loadingStart()
        
        for (_, button) in self.purchaseButtons {
            button.isEnabled = false
        }
        
        //login with JWT token
        let jwt = Just.post(
            "https://api.raindrop.io/v1/auth/jwt",
            json: [
                "token": token
            ]
        )
        
        //success JWT login
        if jwt.ok, let jwtData = jwt.json as? [String: Any], jwtData["result"] as! Bool == true {
            //load user data
            let r = Just.get("https://api.raindrop.io/v1/user")
            if r.ok, let jsonData = r.json as? [String: Any] {
                if jsonData["user"] != nil {
                    let user = jsonData["user"] as! [String: Any]
                    
                    userId = user["_id"] as! Int
                    
                    if let fullName = user["fullName"] {
                        self.userLabel.stringValue = fullName as! String
                    }
                    
                    if let email = user["email"] {
                        self.userEmail.stringValue = email as! String
                        self.userEmail.isHidden = false
                    }
                    
                    if user["pro"] as! Bool == true {
                        self.userEmail.stringValue = "⚠️ You already have a Pro subscription!"
                    }
                    else {
                        for (_, button) in self.purchaseButtons {
                            button.isEnabled = true
                        }
                    }
                } else {
                    self.userLabel.stringValue = "⚠️ Please login first!"
                }
            } else {
                self.userLabel.stringValue = "⚠️ Can't connect to main server"
            }
        } else {
            self.userLabel.stringValue = "⚠️ Can't login try again"
        }
        
        SwiftyStoreKit.completeTransactions(){_ in}
        
        //update pricing and names for subscription
        SwiftyStoreKit.retrieveProductsInfo(Set(self.ids.values)) { result in
            for product in result.retrievedProducts {
                let period = self.getPeriodByIdentifier(product.productIdentifier)
                
                if let button = self.purchaseButtons[period] {
                    button.title = "\(product.localizedTitle), \(product.localizedPrice!)"
                }
            }
            
            self.loadingStop()
        }
        
        view.window?.makeMain()
        view.window?.makeKeyAndOrderFront(nil)
    }
    
    func loadingStart() {
        DispatchQueue.main.async{
            NSAnimationContext.runAnimationGroup({ (context) in
                context.duration = 0.3
                self.loading.startAnimation(self)
                self.mainStack.animator().alphaValue = 0
            }, completionHandler: {
                self.mainStack.isHidden = true
            })
        }
    }
    
    func loadingStop() {
        DispatchQueue.main.async{
            NSAnimationContext.runAnimationGroup({ (context) in
                context.duration = 0.3
                self.loading.stopAnimation(self)
                self.mainStack.animator().alphaValue = 1
            }, completionHandler: {
                self.mainStack.isHidden = false
            })
        }
    }
    
    func showAlert(_ messageText: String) {
        let alert = NSAlert()
        alert.messageText = messageText
        alert.runModal()
    }
    
    func getPeriodByIdentifier(_ indentifier: String)->Int {
        for (period, id) in ids {
            if (id == indentifier){
                return period
            }
        }
        return 0
    }
    
    func validatePurchase(completion: @escaping(Bool)->()) {
        loadingStart()
        
        SwiftyStoreKit.fetchReceipt(forceRefresh: true) { result in
            switch result {
            case .success(let receiptData):
                let encryptedReceipt = receiptData.base64EncodedString(options: [])
                print(encryptedReceipt)
                
                let r = Just.post(
                    "https://api.raindrop.io/v1/user/subscription/apple_restore",
                    json: [
                        "receipt": encryptedReceipt
                    ]
                )
                
                var error = ""
                
                if r.ok, let jsonData = r.json as? [String: Any] {
                    if jsonData["valid"] != nil, jsonData["valid"] as! Bool == true {
                        //everything ok
                    }else{
                        if let errorString = jsonData["errorString"] as? String {
                            error = errorString
                        }else {
                            error = "Error can't validate purchase. We already aware of this problem, but just in case please send email to info@raindrop.io with this value: \(encryptedReceipt)"
                        }
                    }
                } else if (r.error != nil) {
                    error = r.error?.localizedDescription ?? "unknown error"
                }
                
                //everything ok
                if error.isEmpty {
                    completion(true)
                    self.showAlert("You successfully unlocked Pro features!")
                }
                //error
                else{
                    self.showAlert(error)
                    self.loadingStop()
                    completion(false)
                }
                
            case .error(let error):
                self.loadingStop()
                self.showAlert("Fetch receipt failed: \(error)")
                completion(false)
            }
        }
    }
    
    @IBAction func purchaseButtonClick(_ sender: Any) {
        let target = sender as! NSButton
        var id: String = ""
        
        for (period, button) in purchaseButtons {
            if button == target {
                id = ids[period] ?? ""
            }
        }
        
        if id.isEmpty == false {
            loadingStart()
            
            SwiftyStoreKit.purchaseProduct(id, quantity: 1, atomically: false) { result in
                switch result {
                    case .success(let product):
                        self.validatePurchase(){(success) -> () in
                            if success {
                                NSApplication.shared.terminate(self)
                                if product.needsFinishTransaction {
                                    SwiftyStoreKit.finishTransaction(product.transaction)
                                }
                            }
                        }
                                            
                    case .error(let error):
                        self.loadingStop()
                        
                        switch error.code {
                            case .unknown: self.showAlert("Unknown error. Please contact support")
                            case .clientInvalid: self.showAlert("Not allowed to make the payment")
                            case .paymentCancelled: break
                            case .paymentInvalid: self.showAlert("The purchase identifier was invalid")
                            case .paymentNotAllowed: self.showAlert("The device is not allowed to make the payment")
                            case .storeProductNotAvailable: self.showAlert("The product is not available in the current storefront")
                            case .cloudServicePermissionDenied: self.showAlert("Access to cloud service information is not allowed")
                            case .cloudServiceNetworkConnectionFailed: self.showAlert("Could not connect to the network")
                            case .cloudServiceRevoked: self.showAlert("User has revoked permission to use this cloud service")
                            default: self.showAlert((error as NSError).localizedDescription)
                        }
                }
            }
        }
    }
    
    @IBAction func troubleshootingClick(_ sender: Any) {
        self.validatePurchase(){(success) -> () in}
    }
    
    @IBAction func helpClick(_ sender: Any) {
        NSWorkspace.shared.open(URL(string: "https://help.raindrop.io")!)
    }
    
    @IBAction func privacyClick(_ sender: Any) {
        NSWorkspace.shared.open(URL(string: "https://help.raindrop.io/privacy")!)
    }
    
    @IBAction func termsClick(_ sender: Any) {
        NSWorkspace.shared.open(URL(string: "https://help.raindrop.io/terms")!)
    }
}
