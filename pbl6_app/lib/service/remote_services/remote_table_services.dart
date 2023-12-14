import 'package:http/http.dart' as http;
import 'package:restaurant_app/const.dart';

class RemoteTableService {
  var client = http.Client();
  var remoteUrl = '$BASE_URL/api/tables?Limit=1000';

  Future<List<dynamic>> getAllTables(String token) async {
    final List<Future<dynamic>> futures = [
      getTablesByStatus(token, 0),
      getTablesByStatus(token, 1),
    ];

    final List<dynamic> results = await Future.wait(futures);
    return results;
  }

  Future<dynamic> getTablesByStatus(String token, int status) async {
    var response = await client.get(
      Uri.parse(
          'https://api.restaurantservice.online/api/tables?CurrentStatus=$status'),
      headers: {'accept': 'text/plain', 'Authorization': token},
    );
    return response;
  }
}
