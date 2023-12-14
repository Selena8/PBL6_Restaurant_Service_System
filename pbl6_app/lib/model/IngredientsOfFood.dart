class IngredientsOfFood {
  final int seq;
  final String description;

  IngredientsOfFood({
    required this.seq,
    required this.description,
  });

  factory IngredientsOfFood.fromJson(Map<String, dynamic> data) {
    return IngredientsOfFood(
      seq: data['seq'],
      description: data['name'] ?? "",
    );
  }
}
