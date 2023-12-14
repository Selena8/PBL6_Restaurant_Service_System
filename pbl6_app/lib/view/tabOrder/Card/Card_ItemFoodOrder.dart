// ignore_for_file: must_be_immutable

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:intl/intl.dart';
import 'package:restaurant_app/components/TextWidget.dart';
import 'package:restaurant_app/components/app_icon.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/components/button_widget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/view/tabOrder/Card/Dialog_CancelFoodOrder.dart';

class CardItemFoodOrder extends StatefulWidget {
  final String nameFood;
  final String ingredients;
  final String image;
  final double price;
  int number;
  final Function() onCancelPressed;
  final Function() onFoodProcessingPressed;
  final Function() onCallBackPressed;
  final Function() onDonePressed;
  final Function() onCheckboxPressed;
  final Function() decrementNumber;
  final Function() incrementNumber;

  final double height;
  bool isChecked;
  bool isDone;
  bool isStaff;

  CardItemFoodOrder({
    required this.nameFood,
    required this.ingredients,
    required this.image,
    required this.price,
    required this.number,
    required this.onCancelPressed,
    required this.onFoodProcessingPressed,
    required this.onCallBackPressed,
    required this.onCheckboxPressed,
    required this.onDonePressed,
    required this.decrementNumber,
    required this.incrementNumber,
    required this.height,
    required this.isChecked,
    required this.isDone,
    required this.isStaff,
  });

  @override
  _CardItemFoodOrderState createState() => _CardItemFoodOrderState();
}

class _CardItemFoodOrderState extends State<CardItemFoodOrder> {
  final ValueNotifier<int> number = ValueNotifier<int>(0);
  final ValueNotifier<bool> status = ValueNotifier<bool>(false);
  @override
  void initState() {
    number.value = widget.number;
    status.value = widget.isChecked;
    super.initState();
  }

  void _decrementNumber() {
    print("heeeeeeeeee");
    if (widget.isChecked) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return CancelFoodOrderDialog(
              isChecked: widget.isChecked,
              onConfirmPressed: () {
                print("Huỷ món");
              });
        },
      );
    } else if (number.value > 0) {
      widget.decrementNumber.call();
      number.value -= 1;
    }
  }

  void _incrementNumber() {
    if (number.value < 20) {
      widget.incrementNumber.call();
      number.value += 1;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(Dimensions.height20),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(Dimensions.radius20),
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.3),
              blurRadius: 5,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          children: <Widget>[
            Row(
              children: [
                Padding(
                  padding: EdgeInsets.only(left: Dimensions.width10, top: 2),
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(Dimensions.radius20),
                      color: Colors.white38,
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(20),
                      child: CachedNetworkImage(
                        errorWidget: (context, url, error) =>
                            const Icon(Icons.error),
                        placeholder: (context, url) =>
                            Image.asset(AssetHelper.imagePlaceHolder),
                        imageUrl: widget.image,
                        height: 110,
                        width: 110,
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: Container(
                    height: widget.height,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.only(
                        topRight: Radius.circular(Dimensions.radius20),
                        bottomRight: Radius.circular(Dimensions.radius20),
                      ),
                      color: Colors.white,
                    ),
                    child: Padding(
                      padding: const EdgeInsets.only(left: 5, right: 5, top: 5),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          TextSophia(
                            size: Dimensions.font25,
                            textData: widget.nameFood,
                            color: ColorPalette.black,
                            weight: FontWeight.w600,
                          ).textSophiaMedium,
                          SizedBox(height: Dimensions.height10),
                          AppText(text: widget.ingredients),
                          Container(
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    AppText(
                                      text: NumberFormat("#,##0", "en_US").format(widget.price),
                                      color: ColorPalette.primaryOrange,
                                      size: Dimensions.font20,
                                      height: 2.0,
                                      fontWeight: FontWeight.bold,
                                    ),
                                    Padding(
                                      padding:
                                          const EdgeInsets.only(bottom: 10),
                                      child: //Icon(
                                          // Icons.attach_money,
                                          // size: Dimensions.height30,
                                          // color: ColorPalette.primaryOrange,),
                                          AppText(
                                        text: " VND",
                                        color: ColorPalette.primaryOrange,
                                        size: 10,
                                        height: 2.0,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ],
                                ),
                                Row(
                                  children: [
                                    Visibility(
                                      visible: widget.isDone,
                                      child: GestureDetector(
                                        onTap: _decrementNumber,
                                        child: AppIcon(
                                          icon: Icons.remove,
                                          backgroundColor: Colors.white,
                                          iconColor: ColorPalette.primaryOrange,
                                          iconSize: 24,
                                          width: 30,
                                          height: 30,
                                          shiftRight: 3,
                                        ),
                                      ),
                                    ),
                                    SizedBox(width: Dimensions.width5),
                                    ValueListenableBuilder<int>(
                                        valueListenable: number,
                                        builder: (context, numberFood, child) {
                                          return Padding(
                                            padding: const EdgeInsets.only(
                                                bottom: 8.0),
                                            child: AppText(
                                              text: numberFood.toString(),
                                              color: ColorPalette.black,
                                              size: Dimensions.font20,
                                              height: 2.0,
                                              fontWeight: FontWeight.w600,
                                            ),
                                          );
                                        }),
                                    SizedBox(width: Dimensions.width5),
                                    Visibility(
                                      visible: widget.isDone,
                                      child: GestureDetector(
                                        onTap: _incrementNumber,
                                        child: AppIcon(
                                          icon: Icons.add,
                                          backgroundColor:
                                              ColorPalette.primaryOrange,
                                          iconColor: ColorPalette.white,
                                          iconSize: 24,
                                          width: 30,
                                          height: 30,
                                          shiftRight: 3,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
            Visibility(
              visible: widget.isDone,
              child: Column(
                children: [
                  Padding(
                    padding: EdgeInsets.only(left: Dimensions.width20),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Expanded(
                          child: AppText(
                            text: "The dish is in preparation",
                            color: ColorPalette.black,
                            size: Dimensions.font14,
                            height: 0.7,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        ValueListenableBuilder<bool>(
                            valueListenable: status,
                            builder: (context, isChecked, child) {
                              return Checkbox(
                                value: isChecked,
                                onChanged: widget.isStaff
                                    ? (bool? newValue) {
                                        if(!status.value){
                                          widget.onCheckboxPressed.call();
                                        }
                                        homeController.isUpdateStatusOrder
                                            .listen((newShift) {
                                          if (mounted) {
                                            if (widget.isChecked == false) {
                                              status.value = newValue!;
                                            }
                                          }
                                        });
                                      }
                                    : null,
                                activeColor: ColorPalette.primaryOrange,
                              );
                            })
                      ],
                    ),
                  ),
                  SizedBox(height: Dimensions.height10),
                  Row(
                    mainAxisAlignment: widget.isStaff
                        ? MainAxisAlignment.spaceEvenly
                        : MainAxisAlignment.center,
                    children: [
                      ButtonWidget(
                        title: "Cancel",
                        size: Dimensions.font14,
                        borderRadius: Dimensions.radius40,
                        width: Dimensions.width130,
                        height: Dimensions.height40,
                        color: ColorPalette.black,
                        background: ColorPalette.white,
                        borderColor: ColorPalette.primaryOrange,
                        blur: 1,
                        onTap: widget.onCancelPressed,
                      ),
                      widget.isStaff
                          ? ButtonWidget(
                              title: widget.isDone ? "Done" : "Food Processing",
                              size: Dimensions.font14,
                              borderRadius: Dimensions.radius40,
                              width: Dimensions.width130,
                              height: Dimensions.height40,
                              color: ColorPalette.white,
                              background: ColorPalette.primaryOrange,
                              blur: 1,
                              onTap: widget.isDone
                                  ? widget.onDonePressed
                                  : widget.onFoodProcessingPressed,
                            )
                          : const SizedBox(
                              width: 0,
                            ),
                    ],
                  ),
                ],
              ),
            ),
            Visibility(
              visible: !widget.isDone,
              child: ButtonWidget(
                title: "Call Back",
                size: Dimensions.font14,
                borderRadius: Dimensions.radius40,
                width: Dimensions.width130,
                height: Dimensions.width45,
                color: ColorPalette.white,
                background: ColorPalette.primaryOrange,
                blur: 1,
                onTap: widget.onCallBackPressed,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
