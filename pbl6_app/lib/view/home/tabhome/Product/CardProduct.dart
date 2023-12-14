import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
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

class CardProduct extends StatefulWidget {
  final Food food;

  CardProduct({required this.food, Key? key}) : super(key: key);

  @override
  _CardProductState createState() => _CardProductState();
}

class _CardProductState extends State<CardProduct> {
  bool stateOrder = false;

  Future<void> handleClick() async {
    Food? food = await homeController.getFoodById(widget.food.id);
    Get.to(
      () => DetailProduct(),
      arguments: food,
    );
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        handleClick();
      },
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 26, vertical: 20),
        decoration: BoxDecoration(borderRadius: BorderRadius.circular(20)),
        child: Row(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(20),
              child: CachedNetworkImage(
                errorWidget: (context, url, error) => const Icon(Icons.error),
                placeholder: (context, url) =>
                    Image.asset(AssetHelper.imagePlaceHolder),
                imageUrl: widget.food.image,
                height: 140,
                width: 140,
                fit: BoxFit.cover,
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(left: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: Dimensions.widthContainerTextCardFood,
                    child: TextSophia(
                      size: 24,
                      textData: widget.food.name,
                      color: ColorPalette.black,
                      weight: FontWeight.w500,
                    ).textSophiaMedium,
                  ),
                  SizedBox(
                    width: Dimensions.widthContainerTextCardFood,
                    child: Text(
                      widget.food.description,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: 18,
                        fontFamily: "Sofia",
                        color: ColorPalette.dartGrey,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
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
                                  textData: NumberFormat("#,##0", "en_US").format(widget.food.price),
                                      // widget.food.price.toStringAsFixed(2),
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
                        height: 45,
                        width: 80,
                        decoration: BoxDecoration(
                          color: ColorPalette.white,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: ColorPalette.primaryOrange,
                            width: 1.0,
                          ),
                        ),
                        child: InkWell(
                          onTap: () {
                            handleClick();
                          },
                          child: TextSophia(
                            size: 16,
                            textData: "Add to cart",
                            color: ColorPalette.primaryRed,
                            weight: FontWeight.w500,
                          ).textSophiaMedium,
                        ),
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
