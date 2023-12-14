import 'package:get/get.dart';
import 'package:restaurant_app/model/Request.dart';
import 'package:restaurant_app/service/remote_services/remote_request_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DetailRequestController extends GetxController {
  static DetailRequestController instance = Get.find();
  Rx<Request?> currentOrder = Rx<Request?>(null);
  String token = "";

  @override
  void onInit() {
    super.onInit();
    getToken();
  }

  void getToken() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;
  }

  Future<bool> createNewRequest(int type, String description) async {
    try {
      var result = await RemoteRequestService()
          .createNewRequest(token, type, description);

      if (result != null) {
        if (result.statusCode == 200) {
          print("Request created successfully!");
          return true;
        } else {
          print("Failed to create request. Status code: ${result.statusCode}. Content error: ${result.message}");
          return false;
        }
      }
    } catch (e) {
      print("Failed to create request: $e");
    }

    return false; // Return false in case of exceptions or other failure cases
  }
}
