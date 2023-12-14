import 'package:get/get.dart';

class DashboardController extends GetxController {
  var tabIndex = 2;

  void updateIndex(var index) {
    print(index);
    tabIndex = index;
  }
}
