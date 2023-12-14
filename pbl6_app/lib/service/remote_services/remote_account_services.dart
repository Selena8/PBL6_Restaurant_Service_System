import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:restaurant_app/const.dart';

class RemoteAccountService {
  var client = http.Client();
  var remoteUrl = '$BASE_URL/api/users/me';
  var remoteUrlUpdate = '$BASE_URL/api/users/me';
  var remoteUrlAcc = '$BASE_URL/api/staffs';

  Future<dynamic> getAccountById(int accountId) async {
    var response = await client.get(Uri.parse("$remoteUrlAcc/$accountId"));
    return response;
  }

  Future<dynamic> fetchAccountInfo(String token) async {
    var headers = {
      'accept': 'text/plain',
      'Authorization': token,
    };
    var response = await http.get(Uri.parse(remoteUrl), headers: headers);
    return response;
  }

  Future<dynamic> updateAccount(
      Map<String, dynamic> requestBody, String token) async {
    final Map<String, String> headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json-patch+json',
      'Authorization': token,
    };
    final http.Response response = await http.put(
      Uri.parse(remoteUrlUpdate),
      headers: headers,
      body: jsonEncode(requestBody),
    );
    print("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: ${response.body}");
    return response;
  }
}
