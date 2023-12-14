import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:restaurant_app/const.dart';

class RemoteShiftService {
  var client = http.Client();
  var remoteUrl = '$BASE_URL/api/shifts';

  Future<dynamic> getAllShift(String token) async {
    var response = await client.get(
      Uri.parse(remoteUrl),
      headers: {
        'accept': 'text/plain',
        'Authorization': token,
      },
    );
    if (response.statusCode == 200) {
      print("Successful!");
      return response;
    } else {
      throw Exception('Failed to load requests');
    }
  }

  Future<dynamic> getShiftById(String token, int shiftId) async {
    var remoteUrlCheckIn = '$BASE_URL/api/shifts/$shiftId';
    print("checkIn! $remoteUrlCheckIn");
    var response = await client.get(
      Uri.parse(remoteUrlCheckIn),
      headers: {
        'accept': 'text/plain',
        'Authorization': token,
      },
    );
    if (response.statusCode == 200) {
      print("Successful!");
      return response;
    } else {
      throw Exception('Failed to load requests');
    }
  }

  Future<dynamic> checkIn(String token, int shiftId) async {
    var remoteUrlCheckIn = '$BASE_URL/api/shifts/$shiftId/check-in';
    print("checkIn! $remoteUrlCheckIn");
    var response = await client.post(
      Uri.parse(remoteUrlCheckIn),
      headers: {
        'accept': 'text/plain',
        'Authorization': token,
      },
    );
    if (response.statusCode == 200) {
      print("Successful!");
      return response;
    } else {
      throw Exception('Failed to load requests');
    }
  }

  Future<dynamic> checkOut(String token, int shiftId) async {
    var remoteUrlCheckOut = '$BASE_URL/api/shifts/$shiftId/check-out';
    print("checkOut! $remoteUrlCheckOut");
    var response = await client.put(
      Uri.parse(remoteUrlCheckOut),
      headers: {
        'accept': 'text/plain',
        'Authorization': token,
      },
    );
    print("================ ${response.statusCode}");
    if (response.statusCode == 200) {
      print("Successful!");
      return response;
    } else {
      throw Exception('Failed to load requests');
    }
  }

  Future<dynamic> requestChangeWorklog(
      String token, Map<String, dynamic> jsonRequest) async {
    var remoteUrlRequestChangeWorklog =
        '$BASE_URL/api/shifts/request-change-worklog';
    print("checkOut! $remoteUrlRequestChangeWorklog");
    var response = await client.post(Uri.parse(remoteUrlRequestChangeWorklog),
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json-patch+json',
          'Authorization': token,
        },
        body: jsonEncode(jsonRequest));
    if (response != null) {
      print("nullllllllllllll");
    }
    return response;
  }

  Future<dynamic> getAllRequestChangeWorklog(String token) async {
    var response = await client.get(
      Uri.parse("$remoteUrl/request-change-worklog"),
      headers: {
        'accept': 'text/plain',
        'Authorization': token,
      },
    );
    if (response.statusCode == 200) {
      print("Successful!");
      return response;
    } else {
      throw Exception('Failed to load requests');
    }
  }

  Future<dynamic> deleteRequestChangeWorklog(
      String token, int indexDelete) async {
    var response =
        await client.delete(Uri.parse("$remoteUrl/request-change-worklog"),
            headers: {
              'accept': 'text/plain',
              'Authorization': token,
              'Content-Type': 'application/json-patch+json'
            },
            body: jsonEncode([indexDelete]));
    return response;
  }
}
