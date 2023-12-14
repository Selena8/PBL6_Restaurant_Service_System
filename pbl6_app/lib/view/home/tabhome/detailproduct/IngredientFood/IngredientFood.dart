import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:restaurant_app/components/TextWidget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/model/Food.dart';
import 'package:restaurant_app/route/app_route.dart';
import 'package:restaurant_app/view/home/tabhome/detailproduct/HeaderDetailFood.dart';
import 'package:restaurant_app/view/home/tabhome/detailproduct/cooking_sequence/CookingSequence.dart';

class IngredientFood extends StatefulWidget {
  IngredientFood({Key? key}) : super(key: key);

  @override
  _IngredientFoodState createState() => _IngredientFoodState();
}

class _IngredientFoodState extends State<IngredientFood> {
  late Food food;
  bool isShowGredient = false;

  @override
  void initState() {
    super.initState();
    if (Get.arguments != null) {
      food = Get.arguments as Food;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Padding(
            padding: const EdgeInsets.all(26.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                HeaderDetailFood(
                    urlImage: food.image,
                    onTapBack: () {
                      Navigator.pop(context, AppRoute.detailProduct);
                    },
                    onTapGredient: () {
                      print("sssssssss");
                      Get.to(
                        () => const CookingSequence(),
                        arguments: food,
                      );
                    },
                    foodName: food.name,
                    isVisibleGredientIcon: true),
                const SizedBox(
                  height: 10,
                ),
                Align(
                  alignment: Alignment.center,
                  child: TextSophia(
                    size: 34,
                    textData: food.name,
                    color: ColorPalette.dartGrey,
                    weight: FontWeight.bold,
                  ).textSophiaBold,
                ),
                const SizedBox(
                  height: 10,
                ),
                Text(
                  food.description,
                  textAlign: TextAlign.justify,
                  style: const TextStyle(
                    fontSize: 18,
                    fontFamily: "Sofia",
                    color: ColorPalette.dartGrey,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                Align(
                  alignment: Alignment.topLeft,
                  child: InkWell(
                    onTap: () {
                      setState(() {
                        isShowGredient = !isShowGredient;
                      });
                    },
                    child: Container(
                      width: 150,
                      height: 44,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(22),
                        color: ColorPalette.primaryOrange,
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            height: 30,
                            width: 30,
                            padding: const EdgeInsets.all(8.0),
                            decoration: BoxDecoration(
                              color: ColorPalette.white,
                              borderRadius: BorderRadius.circular(15),
                            ),
                            child: SvgPicture.asset(
                              isShowGredient
                                  ? AssetHelper.icoUp
                                  : AssetHelper.icoDown,
                            ),
                          ),
                          const SizedBox(
                            width: 10,
                          ),
                          Text(
                            "Ingredient".toUpperCase(),
                            style: const TextStyle(
                              color: ColorPalette.white,
                              fontSize: 14.0,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                AnimatedOpacity(
                  duration: const Duration(milliseconds: 500),
                  opacity: isShowGredient ? 1.0 : 0.0,
                  child: isShowGredient
                      ? Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: food.ingredients.map((ingredient) {
                            return RichText(
                              text: TextSpan(
                                children: [
                                  const WidgetSpan(
                                    alignment: PlaceholderAlignment.middle,
                                    child: Padding(
                                      padding: EdgeInsets.only(right: 8.0),
                                      child: Icon(
                                        Icons.brightness_1,
                                        size: 8,
                                        color: ColorPalette.dartGrey,
                                      ),
                                    ),
                                  ),
                                  TextSpan(
                                    text: ingredient.description,
                                    style: const TextStyle(
                                      fontSize: 18,
                                      fontFamily: "Sofia",
                                      color: ColorPalette.dartGrey,
                                      fontWeight: FontWeight.w400,
                                    ),
                                  ),
                                ],
                              ),
                            );
                          }).toList(),
                        )
                      : Container(),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
