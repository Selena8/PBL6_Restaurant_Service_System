// ignore_for_file: unused_field

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:restaurant_app/components/TextWidget.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/controller/order_controller.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/model/Food.dart';
import 'package:restaurant_app/model/SideFood.dart';
import 'package:restaurant_app/route/app_route.dart';
import 'package:restaurant_app/theme/theme.dart';
import 'package:restaurant_app/view/home/tabhome/HomeTabView.dart';
import 'package:restaurant_app/view/home/tabhome/detailproduct/HeaderDetailFood.dart';
import 'package:restaurant_app/view/home/tabhome/detailproduct/IngredientFood/IngredientFood.dart';
import 'package:restaurant_app/view/tabOrder/tabOrder_User/Order_User.dart';
import 'package:restaurant_app/view/tabPayment/Payment_Staff.dart/PaymentStaffView.dart';
import 'package:restaurant_app/view/tabRequest/Request_User.dart';
import 'package:shared_preferences/shared_preferences.dart';

// ignore: must_be_immutable
class DetailProduct extends StatefulWidget {
  DetailProduct({super.key});

  @override
  State<DetailProduct> createState() => _DetailProductState();
}

class _DetailProductState extends State<DetailProduct> {
  Widget _tabBody = Container(color: RiveAppTheme.background);
  late Food food;
  List<String> tables = [];

  String selectedTable = "";
  bool? isSelectedTable;
  Map<String, dynamic>? infoTables;
  bool? isRoleTable;
  @override
  void initState() {
    super.initState();
    isSelectedTable = false;
    initValue();
    if (Get.arguments != null) {
      food = Get.arguments as Food;
    }
  }

  String token = "";

  Future<void> initValue() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;
    isRoleTable = prefs.getBool('isRoleTable');
    if (isRoleTable == null) {
      tables.add("Select Table");
    } else {
      if (!isRoleTable!) {
        tables.add("Select Table");
        tables.addAll(
            homeController.tableList.map((element) => element.name).toList());
      } else {
        setState(() {
          isSelectedTable = true;
        });
        String? decodedBody = prefs.getString("infoTable");
        infoTables = jsonDecode(decodedBody!);
        tables.add(
            infoTables != null ? infoTables!['TableName'] : "Select Table");
      }
    }
    setState(() {
      selectedTable = tables[0];
    });
  }

  Future<void> handleTapBack() async {
    Navigator.pop(context, AppRoute.homestaff);
  }

  final List<Widget> _screens = [
    const HomeTabView(),
    const PaymentStaffView(),
    const OrderUserView(),
    const RequestUserView(),
  ];
  int numberOrders = 1;
  final List<SideFood> sideFoods = SideFood.foodList;
  List<int?> selectedOptions =
      List.generate(SideFood.foodList.length, (index) => null);

  void showToast(bool check) {
    if (check) {
      MotionToast.success(
        title: const Text("Success !"),
        description: const Text("Order successfully!"),
      ).show(context);
    } else {
      MotionToast.error(
              title: const Text("Error !"),
              description: const Text("Order fail!"))
          .show(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            Align(
              alignment: Alignment.center,
              child: Obx(() {
                Get.lazyPut(() => DetailProductController());
                if (detailProductController.isOrderLoading.value) {
                  return const CircularProgressIndicator();
                } else {
                  return const SizedBox();
                }
              }),
            ),
            SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: Padding(
                padding: const EdgeInsets.all(26.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    HeaderDetailFood(
                        urlImage: food.image,
                        onTapBack: () {
                          handleTapBack();
                        },
                        foodName: food.name,
                        isVisibleGredientIcon: false),
                    const SizedBox(
                      height: 10,
                    ),
                    Align(
                      alignment: Alignment.center,
                      child: TextSophia(
                        size: 34,
                        textData: food.name,
                        color: ColorPalette.dartGrey,
                        weight: FontWeight.bold,
                      ).textSophiaBold,
                    ),
                    const SizedBox(
                      height: 15,
                    ),
                    Container(
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: ColorPalette.primaryOrange, // Màu cam
                          width: 2.0, // Độ rộng của border
                        ),
                        borderRadius:
                            BorderRadius.circular(10.0), // Độ bo góc của border
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Row(
                            children: [
                              const Icon(
                                Icons.attach_money,
                                size: 34,
                                color: ColorPalette.primaryOrange,
                              ),
                              TextSophia(
                                size: 40,
                                textData: NumberFormat("#,##0", "en_US")
                                    .format(food.price),
                                color: ColorPalette.primaryOrange,
                                weight: FontWeight.bold,
                              ).textSophiaBold,
                              Padding(
                                padding: const EdgeInsets.only(bottom: 10),
                                child: AppText(
                                  text: " VND",
                                  color: ColorPalette.primaryOrange,
                                  size: 10,
                                  height: 2.0,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(
                      height: 15,
                    ),
                    Stack(
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(right: 30, top: 10),
                          child: Text(
                            food.description + "  ",
                            maxLines: 3,
                            overflow: TextOverflow.ellipsis,
                            textAlign: TextAlign.justify,
                            style: const TextStyle(
                              fontSize: 18,
                              fontFamily: "Sofia",
                              color: ColorPalette.dartGrey,
                              fontWeight: FontWeight.w400,
                            ),
                          ),
                        ),
                        Positioned(
                          bottom: 0,
                          right: 0,
                          child: InkWell(
                            onTap: () {
                              setState(() {
                                numberOrders++;
                              });
                            },
                            child: Padding(
                              padding: const EdgeInsets.only(left: 10),
                              child: GestureDetector(
                                onTap: () {
                                  Get.to(
                                    () => IngredientFood(),
                                    arguments: food,
                                  );
                                },
                                child: Container(
                                  alignment: Alignment.center,
                                  height: 30,
                                  width: 30,
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(15),
                                      border: Border.all(
                                        color: ColorPalette.primaryOrange,
                                        width: 2,
                                      )),
                                  child: SvgPicture.asset(AssetHelper.icoArow),
                                ),
                              ),
                            ),
                          ),
                        )
                      ],
                    ),
                    Visibility(
                      visible: (isRoleTable != null && isRoleTable == false),
                      child: SizedBox(
                        height: 10,
                      ),
                    ),
                    Visibility(
                      visible: (isRoleTable != null && isRoleTable == true),
                      child: SizedBox(
                        height: 0,
                      ),
                    ),
                    Visibility(
                      visible: (isRoleTable != null && isRoleTable == false),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          DropdownButton<String>(
                            menuMaxHeight: 200,
                            value: selectedTable,
                            onChanged: (String? newValue) {
                              setState(() {
                                selectedTable = newValue!;
                                if (newValue == "Select Table") {
                                  print(false);
                                  isSelectedTable = false;
                                } else {
                                  print(true);
                                  isSelectedTable = true;
                                }
                              });
                            },
                            items: tables
                                .map<DropdownMenuItem<String>>((String value) {
                              return DropdownMenuItem<String>(
                                value: value,
                                child: Text(value),
                              );
                            }).toList(),
                          ),
                          Row(
                            children: [
                              InkWell(
                                onTap: () {
                                  setState(() {
                                    numberOrders >= 2
                                        ? numberOrders--
                                        : numberOrders;
                                  });
                                },
                                child: Container(
                                  alignment: Alignment.center,
                                  height: 30,
                                  width: 30,
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(15),
                                      border: Border.all(
                                        color: ColorPalette.primaryOrange,
                                        width: 2,
                                      )),
                                  child: SvgPicture.asset(AssetHelper.icoLine),
                                ),
                              ),
                              const SizedBox(width: 10),
                              Text(
                                numberOrders < 10
                                    ? '0${numberOrders.toString()}'
                                    : numberOrders.toString(),
                                style: const TextStyle(
                                    fontSize: 24, fontWeight: FontWeight.w600),
                              ),
                              const SizedBox(width: 10),
                              InkWell(
                                onTap: () {
                                  setState(() {
                                    numberOrders++;
                                  });
                                },
                                child: Container(
                                  alignment: Alignment.center,
                                  height: 30,
                                  width: 30,
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(15),
                                      color: ColorPalette.primaryOrange),
                                  child: SvgPicture.asset(AssetHelper.icoPlus),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    Visibility(
                      visible: (isRoleTable != null && isRoleTable == true),
                      child: SizedBox(
                        height: 60,
                      ),
                    ),
                    Visibility(
                      visible: (isRoleTable != null && isRoleTable == true),
                      child: SizedBox(
                        height: 20,
                      ),
                    ),
                    Positioned(
                      bottom: 0,
                      child: Row(
                        mainAxisAlignment:
                            (isRoleTable != null && isRoleTable == true)
                                ? MainAxisAlignment.spaceBetween
                                : MainAxisAlignment.center,
                        children: [
                          Visibility(
                            visible:
                                (isRoleTable != null && isRoleTable == true),
                            child: Row(
                              children: [
                                InkWell(
                                  onTap: () {
                                    setState(() {
                                      numberOrders >= 2
                                          ? numberOrders--
                                          : numberOrders;
                                    });
                                  },
                                  child: Container(
                                    alignment: Alignment.center,
                                    height: 30,
                                    width: 30,
                                    decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(15),
                                        border: Border.all(
                                          color: ColorPalette.primaryOrange,
                                          width: 2,
                                        )),
                                    child:
                                        SvgPicture.asset(AssetHelper.icoLine),
                                  ),
                                ),
                                const SizedBox(width: 10),
                                Text(
                                  numberOrders < 10
                                      ? '0${numberOrders.toString()}'
                                      : numberOrders.toString(),
                                  style: const TextStyle(
                                      fontSize: 24,
                                      fontWeight: FontWeight.w600),
                                ),
                                const SizedBox(width: 10),
                                InkWell(
                                  onTap: () {
                                    setState(() {
                                      numberOrders++;
                                    });
                                  },
                                  child: Container(
                                    alignment: Alignment.center,
                                    height: 30,
                                    width: 30,
                                    decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(15),
                                        color: ColorPalette.primaryOrange),
                                    child:
                                        SvgPicture.asset(AssetHelper.icoPlus),
                                  ),
                                ),
                                const SizedBox(width: 10),
                              ],
                            ),
                          ),
                          Container(
                            width: (isRoleTable != null && isRoleTable == true)
                                ? 230
                                : 300,
                            height: (isRoleTable != null && isRoleTable == true)
                                ? 50
                                : 70,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(40),
                              color: ColorPalette.primaryOrange,
                            ),
                            child: InkWell(
                              onTap: isSelectedTable!
                                  ? () {
                                      Get.lazyPut(
                                          () => DetailProductController());
                                      if (tables.length == 1 &&
                                          tables[0] == "Select Table") {
                                        print("You must Login");
                                      } else {
                                        print("Ordering ...");
                                        int? id = null;
                                        if (infoTables == null) {
                                          print("1");
                                          id = homeController.tableList
                                              .firstWhere((element) =>
                                                  element.name == selectedTable)
                                              .id;
                                          try {
                                            detailProductController
                                                .createNewOrder(
                                                    id,
                                                    int.parse(food.id),
                                                    numberOrders,
                                                    token);
                                            showToast(true);
                                          } catch (e) {
                                            print(
                                                "Error creating BoxDecoration: $e");
                                            showToast(false);
                                          }
                                        } else {
                                          print("2");
                                          if (detailProductController
                                                  .currentOrder.value !=
                                              null) {
                                            try {
                                              detailProductController
                                                  .addFoodIntoOrder(
                                                      detailProductController
                                                          .currentOrder
                                                          .value!
                                                          .id,
                                                      int.parse(food.id),
                                                      numberOrders,
                                                      token);
                                              showToast(true);
                                            } catch (e) {
                                              print(
                                                  "Error creating BoxDecoration: $e");
                                              showToast(false);
                                            }
                                          } else {
                                            detailProductController
                                                .createNewOrder(
                                                    int.parse(
                                                        infoTables!['Id']),
                                                    int.parse(food.id),
                                                    numberOrders,
                                                    token);
                                          }
                                        }
                                      }
                                    }
                                  : null,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Container(
                                    height: (isRoleTable != null &&
                                            isRoleTable == true)
                                        ? 20
                                        : 30,
                                    width: (isRoleTable != null &&
                                            isRoleTable == true)
                                        ? 20
                                        : 30,
                                    padding: const EdgeInsets.all(6.0),
                                    decoration: BoxDecoration(
                                      color: ColorPalette.white,
                                      borderRadius: BorderRadius.circular(13),
                                    ),
                                    child: SvgPicture.asset(
                                      AssetHelper.icoBadge,
                                    ),
                                  ),
                                  const SizedBox(
                                    width: 10,
                                  ),
                                  Visibility(
                                      visible: (isRoleTable != null &&
                                          isRoleTable == true),
                                      child: Text("Add new order".toUpperCase(),
                                          style: const TextStyle(
                                            color: ColorPalette.white,
                                            fontSize: 18,
                                          ))),
                                  Visibility(
                                      visible: (isRoleTable != null &&
                                          isRoleTable == false),
                                      child: Text("Add new order".toUpperCase(),
                                          style: const TextStyle(
                                            color: ColorPalette.white,
                                            fontSize: 25,
                                          ))),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
