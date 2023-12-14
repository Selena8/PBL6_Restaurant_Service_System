import 'dart:convert';

import 'package:restaurant_app/model/FoodMakingProcessOfFood.dart';
import 'package:restaurant_app/model/IngredientsOfFood.dart';

List<Food> foodListFromJson(String val) => List<Food>.from(
    json.decode(val)['data'].map((food) => Food.foodFromJson(food)));
Food foodByIdFromJson(String val) => Food.foodByIdFromJson(json.decode(val));

class Food {
  final String id;
  final String name;
  final String description;
  final double price;
  final int? createdUserId;
  final int? categoryId;
  final String image;
  final List<IngredientsOfFood> ingredients;
  final List<FoodMakingProcessOfFood> foodMakingProcesses;

  Food(
      {required this.id,
      required this.name,
      required this.description,
      required this.price,
      this.createdUserId,
      this.categoryId,
      required this.image,
      required this.ingredients,
      required this.foodMakingProcesses});
  factory Food.foodFromJson(Map<String, dynamic> data) => Food(
        id: data['id'],
        name: data['name'],
        description: data['description'],
        price: data['price'],
        createdUserId: data['createdUserId'],
        categoryId: data['categoryId'],
        image: data['image'],
        ingredients: [],
        foodMakingProcesses: [],
      );

  factory Food.foodByIdFromJson(Map<String, dynamic> data) {
    return Food(
      id: data['id'].toString(),
      name: data['name'].toString(),
      description: data['description'].toString(),
      price: data['price'] is int
          ? (data['price'] as int).toDouble()
          : data['price'],
      image: data['image'].toString(),
      ingredients: List<IngredientsOfFood>.from(
        (data['ingredientsOfFoodResponse'] as List<dynamic>).map(
            (val) => IngredientsOfFood.fromJson(val as Map<String, dynamic>)),
      ),
      foodMakingProcesses: List<FoodMakingProcessOfFood>.from(
        (data['foodMakingProcessResponse'] as List<dynamic>).map((val) =>
            FoodMakingProcessOfFood.fromJson(val as Map<String, dynamic>)),
      ),
    );
  }
}
