import 'package:flutter/material.dart';
import 'package:restaurant_app/components/TextWidget.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';
import 'package:lottie/lottie.dart';

class CarouselSalesOff extends StatefulWidget {
  CarouselSalesOff({Key? key}) : super(key: key);

  Widget itemSlider(String uriImage) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(20),
      child: Stack(
        fit: StackFit.expand,
        children: [
          Image.asset(
            uriImage,
            fit: BoxFit.fill,
          ),
          Positioned(
            top: 0,
            bottom: 0,
            right: 0,
            width: 100,
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.6),
              ),
            ),
          ),
          Positioned(
            top: 0,
            bottom: 0,
            right: 0,
            width: 100,
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.4),
              ),
            ),
          ),
          Positioned(
            top: 60,
            right: 5,
            child: ClipRRect(
              child: Column(
                children: [
                  Row(
                    children: [
                      // const Icon(Icons.attach_money,
                      //     size: 16, color: ColorPalette.primaryOrange),
                      TextSophia(
                        size: 14,
                        textData: "100000",
                        color: ColorPalette.primaryRed,
                        weight: FontWeight.bold,
                        isLineThrough: true,
                        lineThroughColor: ColorPalette.primaryRed,
                      ).textSophiaItalic,
                      Padding(
                        padding: EdgeInsets.only(bottom: 10),
                        child:AppText(
                          text: " VND",
                          color: ColorPalette.primaryOrange,
                          size: 10,
                          height: 2.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ),
          ),
          Positioned(
            top: 86,
            right: 15,
            child: ClipRRect(
              child: Column(
                children: [
                  Row(
                    children: [
                      // const Icon(Icons.attach_money,
                      //     size: 24, color: ColorPalette.primaryOrange),
                      TextSophia(
                        size: 24,
                        textData: "30000",
                        color: ColorPalette.primaryRed,
                        weight: FontWeight.bold,
                        isLineThrough: false,
                      ).textSophiaMedium,
                      Padding(
                        padding: EdgeInsets.only(bottom: 10),
                        child:AppText(
                          text: " VND",
                          color: ColorPalette.primaryOrange,
                          size: 10,
                          height: 2.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ),
          ),
          Positioned(
              right: 0,
              bottom: 0,
              height: 60,
              width: 60,
              child: Image.asset(
                AssetHelper.imageProductSalesOff,
                fit: BoxFit.cover,
              )),
          Positioned(
              top: 0,
              right: 46,
              child: Lottie.asset(
                AssetHelper.animationSales,
                height: 70,
                width: 70,
                fit: BoxFit.fill,
              ))
        ],
      ),
    );
  }

  @override
  _CarouselSalesOffState createState() => _CarouselSalesOffState();
}

class _CarouselSalesOffState extends State<CarouselSalesOff> {
  int myCurrentIndex = 0;

  final myitems = [
    CarouselSalesOff().itemSlider(AssetHelper.imageProductSales1),
    CarouselSalesOff().itemSlider(AssetHelper.imageProductSales1),
    CarouselSalesOff().itemSlider(AssetHelper.imageProductSales1),
  ];

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          CarouselSlider(
            options: CarouselOptions(
              autoPlay: true,
              height: 180,
              autoPlayCurve: Curves.fastOutSlowIn,
              autoPlayAnimationDuration: const Duration(milliseconds: 800),
              autoPlayInterval: const Duration(seconds: 2),
              enlargeCenterPage: true,
              aspectRatio: 16 / 9,
              onPageChanged: (index, reason) {
                setState(() {
                  myCurrentIndex = index;
                });
              },
            ),
            items: myitems,
          ),
          const SizedBox(
            height: 20,
          ),
          AnimatedSmoothIndicator(
            activeIndex: myCurrentIndex,
            count: myitems.length,
            effect: WormEffect(
              dotHeight: 8,
              dotWidth: 8,
              spacing: 10,
              dotColor: Colors.grey.shade200,
              activeDotColor: ColorPalette.primaryOrange,
              paintStyle: PaintingStyle.fill,
            ),
          )
        ],
      ),
    );
  }
}
