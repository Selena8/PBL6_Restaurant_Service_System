import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:restaurant_app/components/TextWidget.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/model/model_product.dart';

class PopularsItem extends StatefulWidget {
  const PopularsItem({required this.product, Key? key}) : super(key: key);

  final Product product;

  @override
  State<PopularsItem> createState() => _PopularsItemState();
}

class _PopularsItemState extends State<PopularsItem> {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(20),
          child: Image.asset(
            AssetHelper.imageSalmonSalad,
            fit: BoxFit.cover,
            height: 150,
          ),
        ),
        Positioned(
          top: 10,
          left: 10,
          child: Container(
            width: 100,
            height: 34,
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: ColorPalette.white),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // const Padding(
                //   padding: EdgeInsets.only(bottom: 2),
                //   child: Icon(
                //     Icons.attach_money,
                //     size: 18,
                //     color: ColorPalette.primaryOrange,
                //   ),
                // ),
                TextSophia(
                        size: 18,
                        textData:  NumberFormat("#,##0", "en_US").format(widget.product.price),
                        color: ColorPalette.black,
                        weight: FontWeight.w400)
                    .textSophiaMedium,
                Padding(
                        padding: const EdgeInsets.only(bottom: 10),
                        child:AppText(
                          text: " VND",
                          color: ColorPalette.primaryOrange,
                          size: 10,
                          height: 2.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
              ],
            ),
          ),
        ),
        Positioned(
          top: 130,
          left: 10,
          child: Container(
            width: 80,
            height: 34,
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: ColorPalette.white),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                TextSophia(
                        size: 18,
                        textData: widget.product.star.toString(),
                        color: ColorPalette.black,
                        weight: FontWeight.w400)
                    .textSophiaMedium,
                const Padding(
                  padding: EdgeInsets.only(bottom: 2),
                  child: Icon(
                    Icons.star,
                    size: 18,
                    color: ColorPalette.yellow,
                  ),
                ),
                TextSophia(
                        size: 12,
                        textData: widget.product.numberOfRate,
                        color: ColorPalette.grayishBlue,
                        weight: FontWeight.w400)
                    .textSophiaRegular,
              ],
            ),
          ),
        ),
        Positioned(
          top: 170,
          left: 10,
          child: TextSophia(
                  size: 14,
                  color: ColorPalette.black,
                  weight: FontWeight.bold,
                  textData: widget.product.name)
              .textSophiaBold,
        ),
        Positioned(
          top: 184,
          left: 10,
          child: TextSophia(
                  size: 12,
                  color: ColorPalette.white,
                  weight: FontWeight.w300,
                  textData: widget.product.shortDesc)
              .textSophiaItalic,
        ),
      ],
    );
  }
}