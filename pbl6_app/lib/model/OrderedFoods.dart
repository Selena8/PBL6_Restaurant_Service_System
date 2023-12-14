class OrderedFoods {
  final int orderDetailId;
  late int orderStatus = 0;
  int quantity;
  final int foodId;

  OrderedFoods(
      {required this.orderDetailId,
      required this.orderStatus,
      required this.quantity,
      required this.foodId});

  factory OrderedFoods.fromJson(Map<String, dynamic> data) {
    return OrderedFoods(
      orderDetailId: data['orderDetailId'],
      orderStatus: data['orderStatus'],
      quantity: data['quantity'],
      foodId: data['foodId'],
    );
  }
}
