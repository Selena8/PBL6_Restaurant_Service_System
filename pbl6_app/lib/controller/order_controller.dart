import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/model/Order.dart';
import 'dart:convert';

import 'package:restaurant_app/service/remote_services/remote_order_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DetailProductController extends GetxController {
  static DetailProductController instance = Get.find();
  Rx<Order?> currentOrder = Rx<Order?>(null);
  String token = "";
  RxBool isOrderLoading = false.obs;
  RxBool isUpdateStatusDetailOrder = false.obs;

  @override
  void onInit() {
    super.onInit();
    getToken();
  }

  void getToken() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;
  }

  Future<void> updateStatusDetailOrder(int orderId,int orderDetailId, int status) async {
  }

  void getOrderByTable() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      token = prefs.getString('token')!;
      var result = await RemoteOrderService().getOrderByTable(token);
      if (result != null) {
        if (result.statusCode == 200) {
          currentOrder(Order.orderFromJson(json.decode(result.body)));
          homeController.getFoodsByOrderSelected(currentOrder.value!);
          print("Order Successfully ! ${currentOrder.value!.orderTime}");
        }
      } else {
        print("Order Fail !");
      }
    } catch (e) {
      print("Order Fail !");
      print(e.toString());
    }
  }

  Future<void> createNewOrder(
      int tableId, int foodId, int quantity, String token) async {
    isOrderLoading(true);
    try {
      var result = await RemoteOrderService().createOrder(tableId, token);
      if (result != null) {
        if (result.statusCode == 200) {
          print(result.body);
          addFoodIntoOrder(
              parseJson(result.body)['id'], foodId, quantity, token);
        } else {
          if (parseJson(result.body)['message'] == "Order is exist") {
            print(true);
            addFoodIntoOrder(
                getOrderByTableId(tableId)!.id, foodId, quantity, token);
          }
        }
      }
    } catch (e) {
      print(e.toString());
    }
  }

  Order? getOrderByTableId(int tableId) {
    if (homeController.orderList.isNotEmpty) {
      return homeController.orderList
          .firstWhere((element) => element.tableId == tableId);
    }
    return null;
  }

  Map<String, dynamic> parseJson(String jsonString) {
    final Map<String, dynamic> data = json.decode(jsonString);
    return data;
  }

  final ValueNotifier<bool> showSpinner = ValueNotifier<bool>(false);

  Future<void> addFoodIntoOrder(
      int orderId, int foodId, int quantity, String token, {int? orderDetailId}) async {
      showSpinner.value = true;
    isOrderLoading(true);
    try {
      var resultAdd = await RemoteOrderService()
          .orderFoodToOrder(orderId, foodId, quantity, token, orderDetailId:orderDetailId);
      print("${resultAdd.body} heheheh");
      if (resultAdd != null) {
        if (resultAdd.statusCode == 200) {
          final prefs = await SharedPreferences.getInstance();
          bool? isRoleTable = prefs.getBool('isRoleTable');
          if (isRoleTable! && currentOrder.value != null) {
            getOrderByTable();
            //print("${currentOrder.value!.orderTime} ====== hiiiiiiiiiiiiiiiiiii");
            homeController.foodListByOrderSelectedUpcomming.clear();
            homeController.foodListByOrderSelectedHistory.clear();
            homeController.getFoodsByOrderSelected(currentOrder.value!);
            return;
          }
          print("Order Successfully !");
          homeController.tableList.clear();
          homeController.orderList.clear();
          homeController.getToken();
        }
      } else {
        print("Order Fail !");
      }
    } catch (e) {
      print("Order Fail !");
      print(e.toString());
    } finally {
      showSpinner.value = false;
      isOrderLoading(false);
    }
  }
}
