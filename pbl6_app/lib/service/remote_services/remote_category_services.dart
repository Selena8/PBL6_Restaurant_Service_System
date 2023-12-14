import 'package:http/http.dart' as http;
import 'package:restaurant_app/const.dart';

class RemoteCategoryService {
  var client = http.Client();
  var remoteUrl = '$BASE_URL/api/categories';

  Future<dynamic> get() async {
    var response = await client.get(Uri.parse(remoteUrl));
    return response;
  }
}
