import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/controller/order_controller.dart';
import 'package:restaurant_app/model/Food.dart';
import 'package:restaurant_app/model/IngredientsOfFood.dart';
import 'package:restaurant_app/model/Order.dart';
import 'package:restaurant_app/model/OrderedFoods.dart';
import 'package:restaurant_app/view/tabOrder/Card/Dialog_CancelFoodOrder.dart';
import 'package:restaurant_app/view/tabOrder/Card/Card_ItemFoodOrder.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/view/tabOrder/Card/Dialog_ChangeStatus.dart';
import 'package:shared_preferences/shared_preferences.dart';

class UpcomingUserOrderView extends StatefulWidget {
  final bool isstaff;
  final Function onDonePressedCallback;

  const UpcomingUserOrderView({
    Key? key,
    required this.isstaff,
    required this.onDonePressedCallback,
  }) : super(key: key);

  @override
  State<UpcomingUserOrderView> createState() => _UpcomingUserOrderViewState();
}

class _UpcomingUserOrderViewState extends State<UpcomingUserOrderView> {
  late Food foodItemOrder;
  late List<OrderedFoods> foodItemOrders = [];
  String token = "";
  late Order order;

  String getIngredient(Food food) {
    String ingredient = "";
    for (IngredientsOfFood ingre in food.ingredients) {
      ingredient += "${ingre.description}, ";
    }
    return ingredient.substring(0, ingredient.length - 2);
  }

  Future<void> getOrderById() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;
    setState(() {
      foodItemOrders = order.orderedFoods
          .where((food) => food.orderStatus != 2 && food.orderStatus != 3)
          .toList();
    });
  }

  @override
  void initState() {
    print("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    Get.lazyPut(() => DetailProductController());
    // homeController.getAllOrder(homeController.token);
    // homeController.getFoodsByOrderSelected(order);
    // detailProductController.getOrderByTable();
    homeController.getOrderById(detailProductController.currentOrder.value!.id);
    order = detailProductController.currentOrder.value!;
    homeController.getFoodsByOrderSelected(order);
    getOrderById();
    super.initState();
  }

  // void handleGetData() async {
  //   final prefs = await SharedPreferences.getInstance();
  //   bool? isRoleTable = prefs.getBool('isRoleTable');
  //   if (isRoleTable != null) {
  //     if (isRoleTable) {
  //     } else {
  //       foodList = homeController.foodListByOrderSelectedUpcomming;
  //       getOrderById();
  //     }
  //   }
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: Obx(() {
                if (homeController
                        .foodListByOrderSelectedUpcomming.isNotEmpty &&
                    foodItemOrders.length != 0) {
                  print("=======");
                  print(homeController.foodListByOrderSelectedUpcomming.length);
                  print("=======");
                  print(foodItemOrders.length);
                  return ListView.builder(
                    physics: const BouncingScrollPhysics(),
                    itemCount:
                        homeController.foodListByOrderSelectedUpcomming.length,
                    itemExtent: Dimensions.height300,
                    itemBuilder: (context, index) {
                      foodItemOrder = homeController
                          .foodListByOrderSelectedUpcomming[index];
                      bool isCheckbox =
                          (foodItemOrders[index].orderStatus == 1);
                      bool isDone = true;
                      return CardItemFoodOrder(
                          nameFood: foodItemOrder.name,
                          ingredients: getIngredient(foodItemOrder),
                          image: foodItemOrder.image,
                          price: foodItemOrder.price,
                          number: foodItemOrders[index].quantity,
                          height: Dimensions.height150,
                          isChecked: isCheckbox,
                          isDone: isDone,
                          isStaff: widget.isstaff,
                          onCancelPressed: () {
                            showDialog(
                              context: context,
                              builder: (BuildContext context) {
                                return CancelFoodOrderDialog(
                                  isChecked: isCheckbox,
                                  onConfirmPressed: () async {
                                    print("Huỷ món");
                                    print(order.id);
                                    print(
                                      order.orderedFoods[index].orderDetailId,
                                    );
                                    bool success = await homeController
                                        .updateStatusOrderForOrderDetail(
                                            order.id,
                                            foodItemOrders[index].orderDetailId,
                                            3);
                                    if (success) {
                                      print('Cancel successfully');
                                      setState(() {
                                        print(isCheckbox);
                                        order.orderedFoods.removeAt(index);
                                      });
                                      Navigator.pop(context);
                                    } else {
                                      print('Failed to cancel!');
                                    }
                                  },
                                );
                              },
                            );
                          },
                          onFoodProcessingPressed: () {
                            if (widget.isstaff) {
                              print('Done button pressed');
                            } else {
                              print('Food Processing button pressed');
                            }
                          },
                          onCallBackPressed: () {
                            print('Call Back button pressed');
                          },
                          onDonePressed: () {
                            showDialog(
                              context: context,
                              builder: (BuildContext context) {
                                return ChangeStatusFoodOrderDialog(
                                  isChecked: false,
                                  onConfirmPressed: () async {
                                    print(order.id);
                                    print(
                                      order.orderedFoods[index].orderDetailId,
                                    );
                                    bool success = await homeController
                                        .updateStatusOrderForOrderDetail(
                                            order.id,
                                            foodItemOrders[index].orderDetailId,
                                            2);
                                    if (success) {
                                      print('Update status:done successfully');
                                      Get.put(DetailProductController());
                                      homeController.getOrderById(order.id);
                                      setState(() {
                                        homeController
                                            .foodListByOrderSelectedUpcomming
                                            .removeAt(index);
                                        order = detailProductController
                                            .currentOrder.value!;
                                      });
                                      widget.onDonePressedCallback();
                                      Navigator.pop(context);
                                    } else {
                                      print('Failed to change!');
                                    }
                                  },
                                );
                              },
                            );
                          },
                          onCheckboxPressed: () {
                            showDialog(
                              context: context,
                              builder: (BuildContext context) {
                                return ChangeStatusFoodOrderDialog(
                                  isChecked: true,
                                  onConfirmPressed: () async {
                                    bool success = await homeController
                                        .updateStatusOrderForOrderDetail(
                                      order.id,
                                      foodItemOrders[index].orderDetailId,
                                      1,
                                    );
                                    if (success) {
                                      print('Update status: done successfully');
                                      // setState(() {
                                      print(isCheckbox);
                                      if (isCheckbox == false) {
                                        isCheckbox = true;
                                      }
                                      Get.lazyPut(
                                          () => DetailProductController());
                                      homeController
                                          .getAllOrder(homeController.token);
                                      homeController
                                          .getFoodsByOrderSelected(order);
                                      detailProductController.getOrderByTable();
                                      print(isCheckbox);
                                      widget.onDonePressedCallback();
                                      //});
                                      Navigator.pop(context);
                                    } else {
                                      print('Failed to change!');
                                    }
                                  },
                                );
                              },
                            );
                          },
                          incrementNumber: () {
                            print(order.id);
                            print(foodItemOrders[index].orderDetailId);
                            print(int.parse(foodItemOrder.id));
                            print(foodItemOrders[index].quantity);
                            try {
                              detailProductController.addFoodIntoOrder(
                                order.id,
                                int.parse(homeController
                                    .foodListByOrderSelectedUpcomming[index]
                                    .id),
                                foodItemOrders[index].quantity + 1,
                                token,
                                orderDetailId:
                                    foodItemOrders[index].orderDetailId,
                              );
                              foodItemOrders[index].quantity += 1;
                            } catch (e) {
                              print("Error adding food into order: $e");
                            }
                            print("aaaa");
                          },
                          decrementNumber: () {
                            if (isCheckbox == false &&
                                foodItemOrders[index].quantity >= 2) {
                              try {
                                detailProductController.addFoodIntoOrder(
                                  order.id,
                                  int.parse(homeController
                                      .foodListByOrderSelectedUpcomming[index]
                                      .id),
                                  foodItemOrders[index].quantity - 1,
                                  token,
                                  orderDetailId:
                                      foodItemOrders[index].orderDetailId,
                                );
                                foodItemOrders[index].quantity -= 1;
                              } catch (e) {
                                print("Error adding food into order: $e");
                              }
                            }
                          });
                    },
                  );
                } else {
                  return const SizedBox();
                }
              }),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTitle(String title) {
    return Center(
      child: Padding(
        padding: EdgeInsets.fromLTRB(
            Dimensions.width25, Dimensions.height25, Dimensions.width25, 0),
        child: AppText(
          text: title,
          color: ColorPalette.black,
          size: Dimensions.font25,
          height: 1.2,
          fontWeight: FontWeight.w800,
        ),
      ),
    );
  }
}
