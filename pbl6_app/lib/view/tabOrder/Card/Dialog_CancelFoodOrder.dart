import 'package:flutter/material.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/components/button_widget.dart';
import 'package:restaurant_app/components/line_widget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';

class CancelFoodOrderDialog extends StatelessWidget {
  final bool isChecked;
  final Function() onConfirmPressed;

  CancelFoodOrderDialog({required this.isChecked, required this.onConfirmPressed});

  void onCancelPressed(BuildContext context) {
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    String dialogText = isChecked
        ? "The dish is in the processing stage, the order can not be change!"
        : "Are you sure cancel this order?";

    return AlertDialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(Dimensions.radius20),
        side: const BorderSide(color: ColorPalette.primaryOrange, width: 2.0),
      ),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildTitle('Cancel Order'),
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
          if (!isChecked)
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
          if (isChecked)
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ButtonWidget(
                  title: "OK",
                  size: Dimensions.font14,
                  borderRadius: Dimensions.radius40,
                  width: Dimensions.width130,
                  height: Dimensions.height40,
                  color: ColorPalette.white,
                  background: ColorPalette.primaryOrange,
                  blur: 1,
                  onTap: () => onCancelPressed(context),
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
