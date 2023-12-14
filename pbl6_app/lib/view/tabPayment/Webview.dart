import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/controller/payment_controller.dart';
import 'package:webview_flutter/webview_flutter.dart';

class WebViewApp extends StatefulWidget {
  WebViewApp({super.key});

  @override
  State<WebViewApp> createState() => _WebViewAppState();
}

class _WebViewAppState extends State<WebViewApp> {
  var controller = WebViewController();

  @override
  void initState() {
    if (Get.arguments != null && Get.arguments as String != "") {
      print(" ================= ${Get.arguments as String}");
    }
    else{
      print(" ================= nullllllll");
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(child: Obx(() {
        if (paymentController.urlPaymentOnline.value != "") {
          controller = WebViewController()
          ..setJavaScriptMode(JavaScriptMode.unrestricted)
          ..setBackgroundColor(const Color(0x00000000))
          ..setNavigationDelegate(
            NavigationDelegate(
              onProgress: (int progress) {},
              onPageStarted: (String url) {},
              onPageFinished: (String url) {},
              onWebResourceError: (WebResourceError error) {},
              onNavigationRequest: (NavigationRequest request) {
                if (request.url.startsWith('https://www.youtube.com/')) {
                  return NavigationDecision.prevent;
                }
                return NavigationDecision.navigate;
              },
            ),
          )
          ..loadRequest(Uri.parse(paymentController.urlPaymentOnline.value));
          return WebViewWidget(controller: controller);
        } else {
          return const SizedBox();
        }
      })),
    );
  }
}
