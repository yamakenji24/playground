//
//  ViewController.swift
//  webView
//
//

import UIKit
import WebKit


class ViewController: UIViewController {
    var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()
        webView = WKWebView(frame: view.frame)
        view.addSubview(webView)
        // let url = "https://www.google.co.jp/"
        let url = "http://localhost:3001/"
        let request = URLRequest(url: URL(string: url)!)
        webView.load(request)
    }


}

