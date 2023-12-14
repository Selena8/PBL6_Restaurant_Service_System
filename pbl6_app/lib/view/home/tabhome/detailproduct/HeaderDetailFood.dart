// ignore_for_file: must_be_immutable

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/helper/asset_helper.dart';

class HeaderDetailFood extends StatelessWidget {
  HeaderDetailFood({
    required this.onTapBack,
    this.onTapGredient,
    required this.foodName,
    required this.urlImage,
    required this.isVisibleGredientIcon,
    super.key,
  });

  VoidCallback onTapBack;
  VoidCallback? onTapGredient;
  bool isVisibleGredientIcon;
  String foodName;
  String urlImage;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(10),
          child: CachedNetworkImage(
                errorWidget: (context, url, error) => const Icon(Icons.error),
                placeholder: (context, url) =>
                    Image.asset(AssetHelper.imagePlaceHolder),
                imageUrl: urlImage,
                height: 300,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
        ),
        Positioned(
          top: 20,
          left: 20,
          child: InkWell(
            onTap: onTapBack,
            child: Container(
              height: 38,
              width: 38,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                color: ColorPalette.white,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.2),
                    spreadRadius: 2,
                    blurRadius: 5,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: SvgPicture.asset(
                AssetHelper.icoBack,
                fit: BoxFit.none,
              ),
            ),
          ),
        ),
        isVisibleGredientIcon
            ? Positioned(
                top: 20,
                right: 20,
                child: InkWell(
                  onTap: onTapGredient,
                  child: Container(
                      height: 42,
                      width: 42,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(21),
                        color: ColorPalette.white,
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.2),
                            spreadRadius: 2,
                            blurRadius: 5,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: Image.asset(
                        AssetHelper.icoRecipe,
                        width: 26,
                        height: 26,
                      )),
                ),
              )
            : const SizedBox(),
      ],
    );
  }
}
