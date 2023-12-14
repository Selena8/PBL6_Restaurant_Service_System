import 'package:get/get.dart';
import 'package:restaurant_app/controller/payment_controller.dart';

class PaymentBinding extends Bindings {
  @override
  void dependencies() {
    Get.put(PaymentController());
  }
}
