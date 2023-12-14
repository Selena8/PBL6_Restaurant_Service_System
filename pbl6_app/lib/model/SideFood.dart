import 'package:flutter/material.dart';
import 'package:restaurant_app/helper/asset_helper.dart';

class SideFood {
  SideFood({
    required this.image,
    required this.name,
    required this.price,
  });

  Image image;
  String name;
  double price;

  static List<SideFood> foodList = [
    SideFood(
        image: Image.asset(AssetHelper.imagePepper),
        name: "Pepper Julienned",
        price: 2.30),
    SideFood(
        image: Image.asset(AssetHelper.imageSpinach),
        name: "Baby Spinach",
        price: 4.70),
    SideFood(
        image: Image.asset(AssetHelper.imageMasroom),
        name: "Masroom",
        price: 2.50),
        SideFood(
        image: Image.asset(AssetHelper.imagePepper),
        name: "Pepper Julienned",
        price: 2.30),
    SideFood(
        image: Image.asset(AssetHelper.imageSpinach),
        name: "Baby Spinach",
        price: 4.70),
    SideFood(
        image: Image.asset(AssetHelper.imageMasroom),
        name: "Masroom",
        price: 2.50),
  ];
}
