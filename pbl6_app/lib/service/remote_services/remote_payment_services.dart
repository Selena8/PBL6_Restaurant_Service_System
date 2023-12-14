import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:restaurant_app/const.dart';

class RemotePaymentService {
  var client = http.Client();
  var remoteUrl = '$BASE_URL/api/payment/create-payment/online';

  Future<dynamic> getUrlPaymentOnline(
      String token, int type, int orderId) async {
    print("$remoteUrl/$orderId");
    var response = await client.post(
      Uri.parse("$remoteUrl/$orderId"),
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json-patch+json',
        'Authorization': token,
      },
      body: json.encode({
        "orderId": 0,
        "type": type,
      }),
    );
    print(response.body);
    return response;
  }
}
