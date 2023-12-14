import 'package:flutter/material.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/components/button_widget.dart';
import 'package:restaurant_app/components/line_widget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';

class ChangeStatusFoodOrderDialog extends StatelessWidget {
  final bool isChecked;
  final Function() onConfirmPressed;

  ChangeStatusFoodOrderDialog(
      {required this.isChecked, required this.onConfirmPressed});

  void onCancelPressed(BuildContext context) {
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    String dialogText = isChecked
        ? "The action will not be undone, are you sure you want to update the order status to preparation status?"
        : "The action will not be undone, are you sure you want to update the order status to done status?";

    return AlertDialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(Dimensions.radius20),
        side: const BorderSide(color: ColorPalette.primaryOrange, width: 2.0),
      ),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildTitle('Change status Order'),
          SizedBox(height: Dimensions.height5),
          LineWidget(
            width: Dimensions.width300,
            strokeWidth: 1,
            color: ColorPalette.grey,
          ),
          SizedBox(height: Dimensions.height10),
          Text(
            dialogText,
            textAlign: TextAlign.center,
          ),
          SizedBox(height: Dimensions.height20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ButtonWidget(
                title: "Cancel",
                size: Dimensions.font14,
                borderRadius: Dimensions.radius40,
                width: Dimensions.width130,
                height: Dimensions.height40,
                color: ColorPalette.black,
                background: ColorPalette.white,
                blur: 1,
                onTap: () => onCancelPressed(context),
              ),
              SizedBox(width: Dimensions.width10),
              ButtonWidget(
                title: "Confirm",
                size: Dimensions.font14,
                borderRadius: Dimensions.radius40,
                width: Dimensions.width130,
                height: Dimensions.height40,
                color: ColorPalette.white,
                background: ColorPalette.primaryOrange,
                blur: 1,
                onTap: onConfirmPressed,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTitle(String title) {
    return AppText(
      text: title,
      color: ColorPalette.black,
      size: Dimensions.font25,
      height: 1.2,
      fontWeight: FontWeight.w800,
    );
  }
}
