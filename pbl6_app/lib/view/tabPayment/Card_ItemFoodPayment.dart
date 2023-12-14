import 'package:flutter/material.dart';
import 'package:restaurant_app/components/TextWidget.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';

class CardItemFoodPayment extends StatelessWidget {
  final String nameFood;
  final String ingredients;
  final String image;
  final String price;
  final int number;

  CardItemFoodPayment({
    required this.nameFood,
    required this.ingredients,
    required this.image,
    required this.price,
    required this.number,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(
        horizontal: Dimensions.width20,
        vertical: Dimensions.height10,
      ),
      child: Row(
        children: [
          Container(
            width: Dimensions.listViewImgSize,
            height: Dimensions.listViewImgSize,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(Dimensions.radius20),
              color: Colors.white38,
              image: DecorationImage(
                fit: BoxFit.cover,
                image: NetworkImage(image),
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.3),
                  blurRadius: 5,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
          ),
          Expanded(
            child: Container(
              height: 200,
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
                    TextSophia(
                      size: Dimensions.font25,
                      textData: nameFood,
                      color: ColorPalette.black,
                      weight: FontWeight.w600,
                    ).textSophiaMedium,
                    SizedBox(height: Dimensions.height10),
                    AppText(
                      text: ingredients,
                      lines: 1,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            // Padding(
                            //   padding:
                            //       EdgeInsets.only(top: Dimensions.height10),
                            //   child: Icon(
                            //     Icons.attach_money,
                            //     size: Dimensions.height30,
                            //     color: ColorPalette.primaryOrange,
                            //   ),
                            // ),
                            AppText(
                              text: price,
                              color: ColorPalette.primaryOrange,
                              size: Dimensions.font20,
                              height: 2.0,
                              fontWeight: FontWeight.bold,
                            ),
                            Padding(
                              padding: EdgeInsets.only(bottom: 10),
                              child: AppText(
                                text: " VND",
                                color: ColorPalette.primaryOrange,
                                size: 10,
                                height: 2.0,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        AppText(
                          text: number.toString(),
                          color: ColorPalette.black,
                          size: Dimensions.font20,
                          height: 2.0,
                          fontWeight: FontWeight.w600,
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
    );
  }
}
