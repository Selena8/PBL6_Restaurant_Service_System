import 'dart:convert';

List<Category> categoryListFromJson(String val) => List<Category>.from(json
    .decode(val)['data']
    .map((category) => Category.categoryFromJson(category)));

class Category {
  final int id;
  final String name;
  final String description;

  Category({required this.id, required this.name, required this.description});
  factory Category.categoryFromJson(Map<String, dynamic> data) => Category(
      id: data['id'], name: data['name'], description: data['description']);
}
