import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/components/button_widget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/helper/asset_helper.dart';

class CardTablePayment extends StatefulWidget {
  final String nameTable;
  final int numberItemOrder;
  final DateTime timeStartOrder;
  final Function() onCheckoutPressed;
  final double height;

  CardTablePayment({
    required this.nameTable,
    required this.numberItemOrder,
    required this.timeStartOrder,
    required this.onCheckoutPressed,
    required this.height,
  });

  @override
  _CardTablePaymentState createState() => _CardTablePaymentState();
}

class _CardTablePaymentState extends State<CardTablePayment> {
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
                  padding:  EdgeInsets.only(top: Dimensions.height15, left: Dimensions.width15),
                  child: Container(
                    width: Dimensions.listViewImgSize,
                    height: Dimensions.listViewImgSize,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(Dimensions.radius20),
                      color: Colors.white38,
                      image: DecorationImage(
                        fit: BoxFit.cover,
                        image: AssetImage(AssetHelper.imageFoodHaven),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: Container(
                    height: Dimensions.height160,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.only(
                        topRight: Radius.circular(Dimensions.radius20),
                        bottomRight: Radius.circular(Dimensions.radius20),
                      ),
                      color: Colors.white,
                    ),
                    child: Padding(
                      padding: EdgeInsets.symmetric(
                        horizontal: Dimensions.width15,
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Row(
                            children: [
                              Icon(Icons.access_alarm,
                                  size: Dimensions.iconSize24,
                                  color: ColorPalette.black),
                              SizedBox(width: Dimensions.width5),
                              AppText(
                                text: DateFormat('HH:mm:ss dd-MM-yyyy').format(widget.timeStartOrder),
                                color: ColorPalette.black,
                                size: Dimensions.font12,
                                height: 2.0,
                                fontWeight: FontWeight.bold,
                              ),
                            ],
                          ),
                          AppText(
                            text: widget.nameTable,
                            color: ColorPalette.black,
                            size: Dimensions.font25,
                            height: 2.0,
                            fontWeight: FontWeight.bold,
                          ),
                          SizedBox(height: Dimensions.height10),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              AppText(
                                text: widget.numberItemOrder.toString() +
                                    " Items",
                              ),
                              ButtonWidget(
                                title: "Checkout",
                                size: Dimensions.font14,
                                borderRadius: Dimensions.radius40,
                                width: Dimensions.width130,
                                height: Dimensions.height40,
                                color: ColorPalette.white,
                                background: ColorPalette.primaryOrange,
                                blur: 1,
                                onTap: widget.onCheckoutPressed,
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
