import 'package:http/http.dart' as http;
import 'package:restaurant_app/const.dart';

class RemoteFoodService {
  var client = http.Client();
  var remoteUrl = '$BASE_URL/api/foods?Limit=100';
  var remoteUrlFood = '$BASE_URL/api/foods';

  Future<dynamic> get() async {
    var response = await client.get(Uri.parse(remoteUrl));
    return response;
  }

  Future<dynamic> getFoodById(String foodId) async {
    var response = await client.get(Uri.parse("$remoteUrlFood/$foodId"));
    return response;
  }

  Future<dynamic> getFoodByName(String text) async {
    var response = await client.get(Uri.parse("$remoteUrl&Search=$text"));
    return response;
  }
}
