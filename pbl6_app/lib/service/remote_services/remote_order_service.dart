import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:restaurant_app/const.dart';
import 'package:shared_preferences/shared_preferences.dart';

class RemoteOrderService {
  var client = http.Client();
  var remoteUrl = '$BASE_URL/api/orders';
  var remoteUrlGetOrderByTable =
      '$BASE_URL/api/orders/get-order-by-table?Limit=1000';

  Future<dynamic> get(String token) async {
    var response = await client.get(
      Uri.parse(remoteUrl),
      headers: {'accept': 'text/plain', 'Authorization': token},
    );
    // var response = await client.get(Uri.parse(remoteUrl));
    return response;
  }

  Future<dynamic> getOrderByTable(String token) async {
    print("HHEHEEHH : $token");
    var response = await client.get(
      Uri.parse(remoteUrlGetOrderByTable),
      headers: {'accept': 'text/plain', 'Authorization': token},
    );
    return response;
  }

  Future<dynamic> getOrderById(int orderId) async {
    final prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('token')!;
    var response = await client.get(
      Uri.parse("$remoteUrl/$orderId"),
      headers: {'accept': 'text/plain', 'Authorization': token},
    );
    return response;
  }

  Future<dynamic> createOrder(int tableId, String token) async {
    print("$tableId hehehehe");
    var requestBody = jsonEncode({
      "tableId": tableId,
    });

    var response = await client.post(
      Uri.parse(remoteUrl),
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json-patch+json',
        'Authorization': token
      },
      body: requestBody,
    );
    print("aaaaaaaaaaaa ${response.body}");
    return response;
  }

  Future<dynamic> orderFoodToOrder(
      int orderId, int idFood, int quantity, String token,
      {int? orderDetailId}) async {
    if (orderDetailId == null) {
      orderDetailId = 9999;
    }
    List<Map<String, dynamic>> orders = [
      {
        "orderDetailId": orderDetailId,
        "foodId": idFood,
        "quantity": quantity,
      }
    ];
    var requestBody = jsonEncode(<String, dynamic>{"orders": orders});
    print("$remoteUrl/$orderId/order-food");

    try {
      var response = await http.put(
        Uri.parse("$remoteUrl/$orderId/order-food"),
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json-patch+json',
          'Authorization': token
        },
        body: requestBody,
      );
      print("${response.body} hehehehkkkk");

      return response;
    } catch (e) {
      print('Lỗi khi gửi yêu cầu: $e');
      return http.Response('Failed to send request', 500);
    }
  }

  Future<dynamic> updateStatusOrder(
      int orderId, int orderDetailId, int newStatus, String token) async {
    try {
      var response = await http.put(
        Uri.parse('$remoteUrl/$orderId/$orderDetailId/update-status-order'),
        headers: {'accept': 'text/plain', 'Authorization': token},
        body: {
          'newstatus': newStatus.toString(),
        },
      );

      return response;
    } catch (e) {
      print('Lỗi khi gửi yêu cầu: $e');
      return http.Response('Failed to send request', 500);
    }
  }
}
