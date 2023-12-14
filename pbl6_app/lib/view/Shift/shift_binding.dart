import 'package:get/get.dart';
import 'package:restaurant_app/controller/shift_controller.dart';

class ShiftBinding extends Bindings {
  @override
  void dependencies() {
    Get.put(ShiftController());
  }
}
