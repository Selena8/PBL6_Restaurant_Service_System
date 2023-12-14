import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:http/io_client.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/controller/home_controller.dart';
import 'package:restaurant_app/controller/order_controller.dart';
import 'package:restaurant_app/route/app_page.dart';
import 'package:restaurant_app/route/app_route.dart';
import 'package:restaurant_app/view/tabPayment/DialogPaymentResult.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:signalr_core/signalr_core.dart';

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..badCertificateCallback =
          (X509Certificate cert, String host, int port) => true;
  }
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // await Hive.initFlutter();

  // //register adapters
  // Hive.registerAdapter(AdBannerAdapter());
  // Hive.registerAdapter(CategoryAdapter());
  // Hive.registerAdapter(ProductAdapter());
  HttpOverrides.global = new MyHttpOverrides();
  getChangeInServer();
  runApp(const MyApp());
}

void getChangeInServer() async {
  final connection = HubConnectionBuilder()
      .withUrl(
        'https://api.restaurantservice.online/order-hub',
        HttpConnectionOptions(
          client: IOClient(HttpClient()),
          logging: (level, message) => print(message),
        ),
      )
      .build();

  await connection.start();

  connection.on('SendNotification', (message) {
    print("===================================================");
    print(message.toString());
    print("===================================================");
    handleListener(message.toString());
  });

  // await connection.invoke('SendMessage', args: ['Bob', 'Says hi!']);
}

String token = "";

void handleListener(String message) async {
  final prefs = await SharedPreferences.getInstance();
  token = prefs.getString('token') ?? "";
  bool? isRoleTable = prefs.getBool('isRoleTable');
  isRoleTable ??= false;
  Map<String, dynamic>? infoTables;
  List<String> notify = message.split(":");
  if (isRoleTable) {
    String? decodedBody = prefs.getString("infoTable");
    infoTables = jsonDecode(decodedBody!);
    print("${infoTables!['Id']} ================= ${notify.last}");
    if (infoTables!['Id'] != notify.last.substring(0, notify.last.length - 1)) {
      return;
    }
  }
  if (message.contains("ErrorPayment")) {
    if (isRoleTable) {
      Navigator.pushReplacementNamed(Get.context!, AppRoute.home);
    }
    else{
      Navigator.pushReplacementNamed(Get.context!, AppRoute.homestaff);
    }
    handleReloadInfo(isRoleTable, token);
    showDialog(
      context: Get.context!,
      builder: (BuildContext context) {
        return DialogPaymentResult(
          isPaymentSuccess: false,
          tableName: notify[1],
        );
      },
    );
  } else if (message.contains("Payment")) {
    handleReloadInfo(isRoleTable, token);
    showDialog(
      context: Get.context!,
      builder: (BuildContext context) {
        return DialogPaymentResult(
          isPaymentSuccess: true,
          tableName: notify[1],
        );
      },
    );
  }
  else if(message.contains("Order")){
    handleReloadInfo(isRoleTable, token);
  }
}

void handleReloadInfo(bool isRoleTable, String token) async {
  Get.lazyPut(() => DetailProductController());
  Get.lazyPut(() => HomeController());
  if (isRoleTable) {
    detailProductController.getOrderByTable();
    homeController.decodeJwt(token);
    Navigator.of(Get.context!).pushNamed(AppRoute.home);
    return;
  } else {
    homeController.getAllOrder(token);
    homeController.getAllTable(token);
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      getPages: AppPage.list,
      initialRoute: AppRoute.splash,
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      themeMode: ThemeMode.light,
    );
  }
}
