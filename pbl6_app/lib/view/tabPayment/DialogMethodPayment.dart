import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/components/button_widget.dart';
import 'package:restaurant_app/components/line_widget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/controller/payment_controller.dart';
import 'package:restaurant_app/model/Order.dart';
import 'package:restaurant_app/view/tabPayment/Webview.dart';

class DialogMethodPayment extends StatefulWidget {
  final Order orderPayment;
  const DialogMethodPayment({super.key, required this.orderPayment});

  @override
  State<DialogMethodPayment> createState() => _DialogMethodPaymentState();
}

class _DialogMethodPaymentState extends State<DialogMethodPayment> {
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(Dimensions.radius20),
        side: const BorderSide(color: ColorPalette.primaryOrange, width: 2.0),
      ),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          AppText(
            text: "Payment method",
            color: ColorPalette.black,
            size: Dimensions.font25,
            height: 1.2,
            fontWeight: FontWeight.w800,
          ),
          SizedBox(height: Dimensions.height5),
          LineWidget(
            width: Dimensions.width300,
            strokeWidth: 1,
            color: ColorPalette.grey,
          ),
          SizedBox(height: Dimensions.height10),
          const Text(
            "Select payment method !",
            textAlign: TextAlign.center,
          ),
          SizedBox(height: Dimensions.height20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ButtonWidget(
                title: "Cash",
                size: Dimensions.font14,
                borderRadius: Dimensions.radius40,
                width: Dimensions.width130,
                borderColor: ColorPalette.primaryOrange,
                height: Dimensions.height40,
                color: ColorPalette.black,
                background: ColorPalette.white,
                blur: 1,
                onTap: (){
                  Get.put(PaymentController());
                  paymentController.getUrlPayment(
                      0, widget.orderPayment.id);
                },
              ),
              SizedBox(width: Dimensions.width10),
              InkWell(
                onTap: () {
                  Get.put(PaymentController());
                  paymentController.getUrlPayment(
                      1, widget.orderPayment.id);
                  if (paymentController.isPaymentLoading.value == true) {
                    Get.to(
                      () => WebViewApp(),
                      arguments: paymentController.urlPaymentOnline.value,
                    );
                  }
                },
                child: ButtonWidget(
                  title: "Banking",
                  size: Dimensions.font14,
                  borderRadius: Dimensions.radius40,
                  borderColor: ColorPalette.primaryOrange,
                  width: Dimensions.width130,
                  height: Dimensions.height40,
                  color: ColorPalette.black,
                  background: ColorPalette.white,
                  blur: 1,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
