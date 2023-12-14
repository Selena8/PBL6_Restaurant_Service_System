import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:restaurant_app/const.dart';
class RemoteRequestService {
  var client = http.Client();
  var remoteUrl = '$BASE_URL/api/request-support';

  Future<dynamic> getAllRequests(String token) async {
    var response = await client.get(
      Uri.parse(remoteUrl),
      headers: {'accept': 'application/json', 'Authorization': token},
    );
    if (response.statusCode == 200) {  
      print("Successful!");
      
      // Print the list of requests
      return response;
    } else {
      throw Exception('Failed to load requests');
    }
  }

  Future<dynamic> createNewRequest(String token, int type, String description) async {
    var requestBody = jsonEncode({
      'type': type,
      'description': description,
    });

    var response = await client.post(
      Uri.parse(remoteUrl),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: requestBody,
    );

    return response;
  }
  Future<dynamic> resolveRequest(String token, int id) async {
    var resolveUrl = '$remoteUrl/resolve-request/$id';

    var response = await client.patch(
      Uri.parse(resolveUrl),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    );

    return response;
  }
  
}
