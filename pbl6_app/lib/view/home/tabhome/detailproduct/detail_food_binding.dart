import 'package:get/get.dart';
import 'package:restaurant_app/controller/order_controller.dart';

class DetailFoodBinding extends Bindings {
  @override
  void dependencies() {
    Get.put(DetailProductController());
  }
}
