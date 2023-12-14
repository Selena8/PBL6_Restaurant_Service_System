class FoodMakingProcessOfFood {
  final int seq;
  final String description;

  FoodMakingProcessOfFood({
    required this.seq,
    required this.description,
  });

  factory FoodMakingProcessOfFood.fromJson(Map<String, dynamic> data) {
    return FoodMakingProcessOfFood(
      seq: data['seq'],
      description: data['description'] ?? "",
    );
  }
}
