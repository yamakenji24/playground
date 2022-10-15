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
        let request = URLRequest(url: URL(string: "https://www.google.co.jp/")!)
        webView.load(request)
    }


}

