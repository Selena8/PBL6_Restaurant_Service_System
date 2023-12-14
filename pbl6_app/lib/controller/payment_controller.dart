import 'package:get/get.dart';
import 'package:restaurant_app/service/remote_services/remote_payment_services.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PaymentController extends GetxController {
  static PaymentController instance = Get.find();
  // RxList<Shift> shiftList = List<Shift>.empty(growable: true).obs;
  Rx<String> urlPaymentOnline = Rx<String>("");
  RxBool isPaymentLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
  }

  void getUrlPayment(int type, int orderId) async {
    isPaymentLoading.value = true;
    final prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('token');
    if (token == null) {
      print("token getUrlPayment invalid !");
      urlPaymentOnline.value = "";
    }
    try {
      var result = await RemotePaymentService()
          .getUrlPaymentOnline(token!, type, orderId);
      if (result.statusCode == 200) {
        if (result != null) {
          isPaymentLoading.value = false;
          urlPaymentOnline.value = result.body;
        }
      } else {
        isPaymentLoading.value = false;
        urlPaymentOnline.value = "";
      }
    } catch (e) {
      print(e);
      isPaymentLoading.value = true;
      urlPaymentOnline.value = "";
    }
  }
}
