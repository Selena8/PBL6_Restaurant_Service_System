import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/controller/auth_controller.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/route/app_route.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SideMenu extends StatefulWidget {
  final ValueChanged<int> onTabChanged;

  const SideMenu({Key? key, required this.onTabChanged}) : super(key: key);

  @override
  State<SideMenu> createState() => _SideMenuState();
}

class _SideMenuState extends State<SideMenu> {
  int index = 0;
  Map<String, dynamic>? infoTables;

  @override
  void initState() {
    initVariables();
    super.initState();
  }

  void initVariables() async {
    final prefs = await SharedPreferences.getInstance();
    String decodedBody = prefs.getString("infoTable") ?? "";
    if (decodedBody != "") {
      setState(() {
        infoTables = jsonDecode(decodedBody);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 26, top: 36),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            flex: 15,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  height: 90,
                  width: 90,
                  child: ClipOval(
                    child: Image.asset(
                      AssetHelper.imageAvatar,
                      width: 50,
                      height: 50,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 21.0, bottom: 7.0),
                  child: Text(
                    infoTables != null ? infoTables!['TableName'] : "",
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.w700,
                      color: ColorPalette.white,
                    ),
                  ),
                ),
                const SizedBox(
                  height: 20,
                ),
                ...buildOrderItems(3),
              ],
            ),
          ),
          Expanded(
            flex: 1,
            child: InkWell(
              onTap: () {
                Navigator.of(context).pushReplacementNamed(AppRoute.home);
                AuthController _authController = AuthController();
                _authController.removeToken();
              },
              child: Container(
                width: 117,
                height: 43,
                decoration: const BoxDecoration(
                    color: ColorPalette.primaryOrange,
                    borderRadius: BorderRadius.all(Radius.circular(20))),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SvgPicture.asset(
                      AssetHelper.icoLogout,
                      fit: BoxFit.contain,
                      width: 26,
                      height: 26,
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    const Text("Log Out",
                        style: TextStyle(
                            color: ColorPalette.white, fontSize: 16.0))
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(
            height: 40,
          ),
        ],
      ),
    );
  }

  List<Widget> buildOrderItems(int itemCount) {
    List<Widget> orderItems = [];
    List<String> categories = ['Home', 'My Orders', 'Payment', 'Request'];
    List<String> icons = [
      AssetHelper.icoHome,
      AssetHelper.icoOrder,
      AssetHelper.icoPayment,
      AssetHelper.icoRequest,
    ];

    for (int i = 0; i < itemCount; i++) {
      orderItems.add(
        InkWell(
          onTap: () {
            setState(() {
              index = i;
            });
            widget.onTabChanged(index); // Gọi callback để chuyển tab
          },
          child: Container(
            width: 250,
            height: 70,
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: index == i
                    ? ColorPalette.blueDart
                    : ColorPalette.transparent),
            child: Row(
              children: [
                const SizedBox(
                  width: 10,
                ),
                Image.asset(icons[i], width: 40, height: 40, fit: BoxFit.fill),
                const SizedBox(width: 16),
                Text(
                  categories[i],
                  style: TextStyle(
                    fontSize: 18.0,
                    fontWeight: FontWeight.w400,
                    color:
                        index == i ? ColorPalette.primaryOrange : Colors.white,
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    }

    return orderItems;
  }
}
