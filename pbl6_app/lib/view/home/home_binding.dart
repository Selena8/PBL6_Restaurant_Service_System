import 'package:get/get.dart';
import 'package:restaurant_app/controller/home_controller.dart';

class HomeBinding extends Bindings {
  @override
  void dependencies() {
    Get.put(HomeController());
  }
}
