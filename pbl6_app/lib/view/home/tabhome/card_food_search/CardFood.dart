import 'package:flutter/material.dart';
import 'package:restaurant_app/components/TextWidget.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/model/Food.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:get/get.dart';
import 'package:restaurant_app/view/home/tabhome/detailproduct/DetailProduct.dart';

class CardFood extends StatefulWidget {
  final Food food;

  CardFood({required this.food, Key? key}) : super(key: key);

  @override
  _CardFoodState createState() => _CardFoodState();
}

class _CardFoodState extends State<CardFood> {
  bool stateOrder = false;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () async {
        Food? food = await homeController.getFoodById(widget.food.id);
        Get.to(
          () => DetailProduct(),
          arguments: food,
        );
      },
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 26, vertical: 20),
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          color: const Color.fromARGB(32, 103, 240, 178),
          border: Border.all(
              color: const Color.fromARGB(57, 206, 145, 1), width: 2),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.2),
              spreadRadius: 2,
              blurRadius: 3,
              offset: const Offset(0, 1),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(70),
                boxShadow: [
                  BoxShadow(
                    color: Colors.white.withOpacity(0.5),
                    spreadRadius: 2,
                    blurRadius: 3,
                    offset: const Offset(0, 5),
                  ),
                ],
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(70),
                child: CachedNetworkImage(
                  errorWidget: (context, url, error) => const Icon(Icons.error),
                  placeholder: (context, url) =>
                      Image.asset(AssetHelper.imagePlaceHolder),
                  imageUrl: widget.food.image,
                  height: 120,
                  width: 120,
                  fit: BoxFit.cover,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(left: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: Dimensions.widthContainerTextCardFood,
                    child: TextSophia(
                      size: 24,
                      textData: widget.food.name,
                      color: ColorPalette.black,
                      weight: FontWeight.w500,
                    ).textSophiaMedium,
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          // const Icon(
                          //   Icons.attach_money,
                          //   color: ColorPalette.primaryOrange,
                          // ),
                          Container(
                            width:
                                120, // Đặt giá trị cho chiều rộng của TextSophia
                            child: Row(
                              children: [
                                TextSophia(
                                  size: 20,
                                  textData: 
                                      widget.food.price.toStringAsFixed(2),
                                  color: ColorPalette.dartGrey.withOpacity(0.7),
                                  weight: FontWeight.w300,
                                ).textSophiaRegular,
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
                          ),
                        ],
                      ),
                      Container(
                        alignment: Alignment.center,
                        height: 30,
                        width: 80,
                        decoration: BoxDecoration(
                          color: ColorPalette.white,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: ColorPalette.primaryOrange,
                            width: 1.0,
                          ),
                        ),
                        child: TextSophia(
                          size: 14,
                          textData: "Add to cart",
                          color: ColorPalette.primaryRed,
                          weight: FontWeight.w500,
                        ).textSophiaMedium,
                      )
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
