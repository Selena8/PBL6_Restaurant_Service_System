// ignore_for_file: library_private_types_in_public_api

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:restaurant_app/components/TextWidget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/model/Food.dart';
import 'package:restaurant_app/route/app_route.dart';
import 'package:restaurant_app/view/home/tabhome/detailproduct/HeaderDetailFood.dart';

class CookingSequence extends StatefulWidget {
  const CookingSequence({Key? key}) : super(key: key);

  @override
  _CookingSequenceState createState() => _CookingSequenceState();
}

class _CookingSequenceState extends State<CookingSequence> {
  late Food food;

  List<bool> isExpanded = List.generate(11, (index) => false);

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
              children: [
                HeaderDetailFood(
                  urlImage: food.image,
                  onTapBack: () {
                    Navigator.pop(context, AppRoute.ingredient);
                  },
                  foodName: food.name,
                  isVisibleGredientIcon: false,
                ),
                const SizedBox(
                  height: 10,
                ),
                TextSophia(
                  size: 34,
                  textData: food.name,
                  color: ColorPalette.dartGrey,
                  weight: FontWeight.bold,
                ).textSophiaBold,
                const SizedBox(
                  height: 10,
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: food.foodMakingProcesses.map((step) {
                    final int stepNumber = step.seq;
                    final String stepText = step.description;
                    return InkWell(
                      onTap: () {
                        setState(() {
                          isExpanded[stepNumber - 1] =
                              !isExpanded[stepNumber - 1];
                        });
                      },
                      child: Wrap(
                        children: <Widget>[
                          Container(
                            margin: const EdgeInsets.symmetric(vertical: 10),
                            padding: const EdgeInsets.all(8.0),
                            decoration: BoxDecoration(
                              border: Border.all(
                                color: Colors.black,
                                width: 1.0,
                              ),
                              borderRadius: BorderRadius.circular(30.0),
                            ),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Container(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 10.0),
                                  height: 40,
                                  width: 80,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(20.0),
                                    color: ColorPalette.primaryOrange,
                                  ),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Text(
                                        stepNumber.toString(),
                                        style: const TextStyle(
                                          fontSize: 20,
                                          fontFamily: "Sofia",
                                          color: ColorPalette.white,
                                          fontWeight: FontWeight.w400,
                                        ),
                                      ),
                                      const SizedBox(
                                        width: 12,
                                      ),
                                      Container(
                                        height: 18,
                                        width: 18,
                                        padding: const EdgeInsets.all(5.0),
                                        decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(10.0),
                                          color: ColorPalette.white,
                                        ),
                                        child: !isExpanded[stepNumber - 1]
                                            ? SvgPicture.asset(
                                                AssetHelper.icoDown,
                                              )
                                            : SvgPicture.asset(
                                                AssetHelper.icoUp,
                                              ),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(width: 20),
                                Container(
                                  padding: isExpanded[stepNumber - 1]
                                      ? const EdgeInsets.only(top: 0)
                                      : const EdgeInsets.only(top: 7),
                                  width: Dimensions.width230,
                                  child: Text(
                                    stepText,
                                    overflow: isExpanded[stepNumber - 1]
                                        ? TextOverflow.visible
                                        : TextOverflow.ellipsis,
                                    softWrap: isExpanded[stepNumber - 1],
                                    style: const TextStyle(
                                      fontSize: 22,
                                      fontFamily: "Sofia-Regular",
                                      color: ColorPalette.black,
                                      fontWeight: FontWeight.w400,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
