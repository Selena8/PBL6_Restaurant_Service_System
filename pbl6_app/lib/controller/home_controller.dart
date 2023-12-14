// ignore_for_file: control_flow_in_finally

import 'dart:convert';

import 'package:get/get.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/controller/order_controller.dart';
import 'package:restaurant_app/model/Category.dart';
import 'package:restaurant_app/model/Food.dart';
import 'package:restaurant_app/model/Order.dart';
import 'package:restaurant_app/model/Table.dart';
import 'package:restaurant_app/model/Request.dart';
import 'package:restaurant_app/model/model_account.dart';
import 'package:restaurant_app/service/remote_services/remote_account_services.dart';
import 'package:restaurant_app/service/remote_services/remote_category_services.dart';
import 'package:restaurant_app/service/remote_services/remote_food_services.dart';
import 'package:restaurant_app/service/remote_services/remote_order_service.dart';
import 'package:restaurant_app/service/remote_services/remote_table_services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:restaurant_app/model/model_TableRequest.dart';
import 'package:restaurant_app/service/remote_services/remote_request_service.dart';

class HomeController extends GetxController {
  static HomeController instance = Get.find();
  RxList<Category> categoryList = List<Category>.empty(growable: true).obs;
  RxList<Food> foodList = List<Food>.empty(growable: true).obs;
  RxList<Food> foodListByOrderSelectedUpcomming =
      List<Food>.empty(growable: true).obs;
  RxList<Food> foodListByOrderSelectedHistory =
      List<Food>.empty(growable: true).obs;
  RxList<Food> foodListByOrder = List<Food>.empty(growable: true).obs;
  RxList<Food> foodListBySearch = List<Food>.empty(growable: true).obs;
  RxList<Order> orderList = List<Order>.empty(growable: true).obs;
  RxList<Table_> tableList = List<Table_>.empty(growable: true).obs;
  RxList<Request> requestList = List<Request>.empty(growable: true).obs;
  RxBool isOrderListLoading = false.obs;
  RxBool isCategoryLoading = false.obs;
  RxBool isFoodLoading = false.obs;
  RxBool isFoodSearchLoading = false.obs;
  RxBool isUpdateStatusOrder = false.obs;
  String token = "";
  Rx<Account?> currentAccount = Rx<Account?>(null);

  @override
  void onInit() {
    super.onInit();
    getCategories();
    getFoods();
    getToken();
  }

  void getToken() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token') ?? "";
    bool? isRoleTable = prefs.getBool('isRoleTable');
    if (token.isEmpty && isRoleTable.isNull) {
      return;
    }
    if (isRoleTable!) {
      decodeJwt(prefs.getString('token'));
      return;
    }
    if (token != "") {
      getCurrenAccount();
      getAllOrder(token);
      getAllTable(token);
      getAllRequest(token);
    }
  }

  void getCategories() async {
    try {
      isCategoryLoading(true);
      var result = await RemoteCategoryService().get();
      if (result != null) {
        categoryList.assignAll(categoryListFromJson(result.body));
      }
    } finally {
      isCategoryLoading(false);
    }
  }

  Future<bool> updateAccount(
      Map<String, dynamic> requestBody, String token) async {
    var isSuccess = false;
    try {
      var result =
          await RemoteAccountService().updateAccount(requestBody, token);
      if (result.statusCode == 200) {
        fetchAccountInfo(token);
        isSuccess = true;
        print('Account updated successfully');
      } else {
        isSuccess = false;
        print('Failed to update account. Status code: ${result.statusCode}');
        print('Response body: ${result.body}');
      }
    } catch (e) {
      print("error $e");
    } finally {
      return isSuccess;
    }
  }

  Future<bool> fetchAccountInfo(String token) async {
    var checkToken = false;
    try {
      var result = await RemoteAccountService().fetchAccountInfo(token);
      if (result != null) {
        if (result.statusCode == 200) {
          print('Response body: ${result.body}');
          var accountInfo = json.decode(result.body);
          final userDataJson = json.encode(accountInfo);
          final prefs = await SharedPreferences.getInstance();
          await prefs.setString('user_data', userDataJson);
          checkToken = true;
        } else {
          print('Failed with status code : ${result.statusCode}');
          print('Response body abc: ${result.body}');
          checkToken = false;
        }
      }
    } finally {
      return checkToken;
    }
  }

  Future<Account>? getCurrenAccount() async {
    var prefs = await SharedPreferences.getInstance();
    String? accountJson = prefs.getString('user_data');
    Map<String, dynamic> accountMap = json.decode(accountJson!);
    currentAccount.value = Account.fromJson(accountMap);
    return currentAccount.value!;
  }

  String dateTimeToJson(DateTime dateTime) {
    return dateTime.toIso8601String();
  }

  Map<String, dynamic> accountInfoToJson(Map<String, dynamic> accountInfo) {
    // Chuyển đổi các đối tượng DateTime thành chuỗi
    for (var key in accountInfo.keys) {
      if (accountInfo[key] is DateTime) {
        accountInfo[key] = dateTimeToJson(accountInfo[key]);
      }
    }

    return accountInfo;
  }

  void getFoods() async {
    try {
      isFoodLoading(true);
      var result = await RemoteFoodService().get();
      if (result != null) {
        foodList.assignAll(foodListFromJson(result.body));
      }
    } finally {
      isFoodLoading(false);
    }
  }

  void getFoodsByOrderSelected(Order order) async {
    List<Food> foodListUpcomming = [];
    List<Food> foodListHistory = [];
    List<Food> foodListOrder = [];

    for (var orderedFood in order.orderedFoods) {
      if (orderedFood.orderStatus != 3) {
        var foodResult = await getFoodById(orderedFood.foodId.toString());
        if (foodResult != null) {
          foodListOrder.add(foodResult);
          if (orderedFood.orderStatus == 2) {
            foodListHistory.add(foodResult);
          } else {
            // print("9999999999999999999999999999999 + ${orderedFood.orderDetailId} = ${orderedFood.quantity}");
            foodListUpcomming.add(foodResult);
          }
        }
      }
    }
    foodListByOrder.assignAll(foodListOrder);
    foodListByOrderSelectedUpcomming.assignAll(foodListUpcomming);
    foodListByOrderSelectedHistory.assignAll(foodListHistory);
  }

  Future<Food?> getFoodById(String foodId) async {
    Food? food;
    try {
      var result = await RemoteFoodService().getFoodById(foodId);
      if (result != null && result.statusCode == 200) {
        food = foodByIdFromJson(result.body);
      }
    } finally {
      return food;
    }
  }

  void searchByNameFood(String text) async {
    try {
      isFoodSearchLoading(true);
      var result = await RemoteFoodService().getFoodByName(text);
      if (result != null) {
        foodListBySearch.assignAll(foodListFromJson(result.body));
      }
    } finally {
      isFoodSearchLoading(false);
    }
  }

  void getAllOrder(String token) async {
    orderList.clear();
    try {
      isOrderListLoading(true);
      var result = await RemoteOrderService().get(token);
      if (result != null) {
        orderList.assignAll(orderListFromJson(result.body));
        //print("Get again ! /n ${orderList.first.orderTime}");
      }
    } catch (e) {
      print(e);
    } finally {
      print(orderList.length);
      isOrderListLoading(false);
    }
  }

  void getAllTable(String token) async {
    tableList.clear();
    try {
      for (int status in [0, 1]) {
        var resultTable =
            await RemoteTableService().getTablesByStatus(token, status);
        if (resultTable != null) {
          //print(resultTable.body);
          tableList.addAll(tableListFromJson(resultTable.body));
        }
      }
      Set<int> uniqueIds = {};
      tableList.retainWhere((table) => uniqueIds.add(table.id));
    } finally {
      print("Length TableList: ${tableList.length}");
    }
  }

  void getAllRequest(String token) async {
    try {
      var result = await RemoteRequestService().getAllRequests(token);
      if (result != null) {
        print(result.body);
        requestList.assignAll(requestListFromJson(result.body));
      }
    } finally {
      print("Length requestList : ${requestList.length}");
      print("Contents of requestList: $requestList");
    }
  }

  Future<Order?> getOrderById(int orderId) async {
    Order? order;
    try {
      var result = await RemoteOrderService().getOrderById(orderId);
      print(result.body);
      if (result != null && result.statusCode == 200) {
        print("okkkkkeeeeeeeeeeeeeeeeeeehbdjhbhkd");
        order = Order.orderFromJson(json.decode(result.body));
        Get.put(DetailProductController());
        detailProductController.currentOrder.value = order;
      }
    } catch (e) {
      print(e);
    } finally {
      return order;
    }
  }

  Future<Account?> getInfoAccountById(int accountId) async {
    Account? account;
    try {
      var result = await RemoteAccountService().getAccountById(accountId);
      if (result != null && result.statusCode == 200) {
        print("Before infooooo ${result.body}");
        account = Account.fromJson(json.decode(result.body));
        print("infooooo ${account.email}");
        print("After infooooo");
      }
    } catch (e) {
      print("Error: " + e.toString());
    } finally {
      return account;
    }
  }

  void decodeJwt(String? token) async {
    List<String> parts = token!.split('.');
    String decodedBody =
        utf8.decode(base64Url.decode(base64Url.normalize(parts[1])));
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('infoTable', decodedBody);
    print(decodedBody);
  }

  /// REQUEST
  List<TableRequest> getDistinctTableRequests() {
    List<TableRequest> tableRequests = [];

    tableList.forEach((table) {
      List<Request> requestsForTable = requestList
          .where((request) => request.tableId == table.id)
          .toList()
        ..sort((a, b) => a.requestTime.compareTo(b.requestTime));

      tableRequests.add(TableRequest(
        tableId: table.id,
        name: table.name,
        requestCount: requestsForTable.length,
        requestList: requestsForTable,
      ));
    });

    return tableRequests.toSet().toList()
      ..sort((a, b) => a.requestList.isEmpty && b.requestList.isEmpty
          ? 0
          : a.requestList.isEmpty
              ? 1
              : b.requestList.isEmpty
                  ? -1
                  : a.requestList[0].requestTime
                      .compareTo(b.requestList[0].requestTime));
  }

  Future<bool> resolveRequest(int requestId) async {
    try {
      var result =
          await RemoteRequestService().resolveRequest(token, requestId);
      if (result != null && result.statusCode == 200) {
        print('Request resolved successfully');
        // Update the requestList or perform any other necessary actions
        getAllRequest(
            token); // Refresh the requestList after resolving a request
        return true;
      } else {
        print('Failed to resolve request. Status code: ${result?.statusCode}');
        print('Response body: ${result?.body}');
        return false;
      }
    } catch (e) {
      print('Error resolving request: $e');
      return false;
    }
  }

  Future<bool> updateStatusOrderForOrderDetail(
      int orderId, int orderDetailId, int newStatus) async {
    isUpdateStatusOrder.value = true;
    try {
      var result = await RemoteOrderService()
          .updateStatusOrder(orderId, orderDetailId, newStatus, token);
      if (result != null && result.statusCode == 200) {
        print('Status updated successfully');
        // Update the orderList or perform any other necessary actions
        // getAllOrder(token); // Refresh the orderList after updating status
        return true;
      } else {
        print('Failed to update status. Status code: ${result?.statusCode}');
        print('Response body: ${result?.body}');
        return false;
      }
    } catch (e) {
      print('Error updating status: $e');
      return false;
    } finally {
      isUpdateStatusOrder.value = false;
    }
  }
}
