// ignore_for_file: use_build_context_synchronously

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:restaurant_app/components/line_widget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/controller/order_controller.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/model/model_account.dart';
import 'package:restaurant_app/route/app_route.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    initialize();
  }

  void initialize() async {
    await Future.delayed(const Duration(seconds: 3));
    handleLogin();
  }

  Future<void> handleLogin() async {
    final prefs = await SharedPreferences.getInstance();
    bool? isRoleTable = prefs.getBool('isRoleTable');
    if (isRoleTable == null) {
      Navigator.of(context).pushNamed(AppRoute.home);
      return;
    }
    if (isRoleTable) {
      Get.lazyPut(() => DetailProductController());
      detailProductController.getOrderByTable();
      homeController.decodeJwt(prefs.getString('token'));
      Navigator.of(context).pushNamed(AppRoute.home);
      return;
    }
    var inValidToken =
        await homeController.fetchAccountInfo(prefs.getString('token')!);
    print("kkkkkkkkkkkkkkkkk : $inValidToken");
    if (inValidToken) {
      String? accountJson = prefs.getString('user_data');
      Map<String, dynamic> accountMap = json.decode(accountJson!);
      Account account = Account.fromJson(accountMap);
      if (account.userType == 2 || account.userType == 1) {
        print("Login by token");
        Navigator.of(context).pushNamed(AppRoute.homestaff);
      } else {
        print("Login by token fail");
        Navigator.of(context).pushNamed(AppRoute.home);
      }
    } else {
      await prefs.setString('token', "");
      print("Login by token fail");
      Navigator.of(context).pushNamed(AppRoute.home);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorPalette.primaryOrange,
      body: SafeArea(
        child: Stack(
          children: [
            Align(
              alignment: Alignment.center,
              child: Image.asset(
                AssetHelper.imageLogo,
                width: 300,
                height: 200,
                fit: BoxFit.contain,
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Padding(
                padding: const EdgeInsets.only(bottom: 20),
                child: LineWidget(
                  width: 150,
                  strokeWidth: 4,
                  color: ColorPalette.white,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
