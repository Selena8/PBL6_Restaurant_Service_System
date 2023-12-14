import 'package:flutter/material.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/components/button_widget.dart';
import 'package:restaurant_app/components/line_widget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/route/app_route.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DialogPaymentResult extends StatefulWidget {
  final bool isPaymentSuccess;
  final String? tableName;
  const DialogPaymentResult(
      {super.key, required this.isPaymentSuccess, required this.tableName});

  @override
  State<DialogPaymentResult> createState() => _DialogPaymentResultState();
}

class _DialogPaymentResultState extends State<DialogPaymentResult> {
  @override
  void initState() {
    getRole();
    super.initState();
  }

  bool? isRoleTable = false;

  void getRole() async {
    final prefs = await SharedPreferences.getInstance();
    isRoleTable = prefs.getBool('isRoleTable');
    isRoleTable ??= false;
  }

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
            text: widget.isPaymentSuccess
                ? "Payment Success at\n${widget.tableName}!"
                : "Payment Fail at \n${widget.tableName}!",
            lines: 2,
            textAlign: TextAlign.center,
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
          Text(
            widget.isPaymentSuccess
                ? "Thank you for completing the payment. We appreciate it!"
                : "Payment encountered an issue. Please proceed with the payment again!",
            textAlign: TextAlign.center,
          ),
          SizedBox(height: Dimensions.height20),
          ButtonWidget(
            title: widget.isPaymentSuccess
                ? "Close"
                : isRoleTable!
                    ? "Go to Payment"
                    : "Go to Table",
            size: Dimensions.font14,
            borderRadius: Dimensions.radius40,
            width: Dimensions.height160,
            borderColor: ColorPalette.primaryOrange,
            height: Dimensions.height40,
            color: ColorPalette.black,
            background: ColorPalette.white,
            blur: 1,
            onTap: () {
              if (isRoleTable!) {
                Navigator.of(context).pop();
              } else {
                if (widget.isPaymentSuccess) {
                  Navigator.pushNamedAndRemoveUntil(
                      context, AppRoute.homestaff, (route) => false);
                } else {
                  Navigator.of(context).pop();
                }
              }
            },
          ),
        ],
      ),
    );
  }
}
