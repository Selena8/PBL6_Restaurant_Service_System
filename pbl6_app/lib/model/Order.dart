import 'dart:convert';

import 'package:restaurant_app/model/OrderedFoods.dart';

List<Order> orderListFromJson(String val) => List<Order>.from(
    json.decode(val)['data'].map((order) => Order.orderFromJson(order)));

class Order {
  final int id;
  final DateTime orderTime;
  final int orderStatus;
  final int userId;
  final int tableId;
  final List<OrderedFoods> orderedFoods;
  final double total;

  Order(
      {required this.id,
      required this.orderTime,
      required this.orderStatus,
      required this.userId,
      required this.tableId,
      required this.orderedFoods,
      required this.total});

  factory Order.orderFromJson(Map<String, dynamic> data) {
    return Order(
      id: data['id'] as int,
      orderTime: DateTime.parse(data['orderTime']),
      orderStatus: data['orderStatus'] as int,
      userId: data['userId'] as int,
      tableId: data['tableId'] as int,
      orderedFoods: List<OrderedFoods>.from(
        (data['orderedfoods'] as List<dynamic>)
            .map((val) => OrderedFoods.fromJson(val as Map<String, dynamic>)),
      ),
      total: data['total'] as double,
    );
  }

  void remove(OrderedFoods foodItemOrder) {}
}
