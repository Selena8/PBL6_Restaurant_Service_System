import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/model/Food.dart';
import 'package:restaurant_app/model/IngredientsOfFood.dart';
import 'package:restaurant_app/model/Order.dart';
import 'package:restaurant_app/model/OrderedFoods.dart';
import 'package:restaurant_app/view/home/tabhome/detailproduct/DetailProduct.dart';
import 'package:restaurant_app/view/tabOrder/Card/Card_ItemFoodOrder.dart';

class HistoryUserOrderView extends StatefulWidget {
  final bool isstaff;

  const HistoryUserOrderView({Key? key, required this.isstaff})
      : super(key: key);

  @override
  State<HistoryUserOrderView> createState() => _HistoryUserOrderViewState();
}

class _HistoryUserOrderViewState extends State<HistoryUserOrderView> {
  late Food foodItemOrder;
  late Order order;

  late List<OrderedFoods> foodItemOrders = [];

  String getIngredient(Food food) {
    String ingredient = "";
    for (IngredientsOfFood ingre in food.ingredients) {
      ingredient += "${ingre.description}, ";
    }
    return ingredient.substring(0, ingredient.length - 2);
  }

  Future<void> getOrderById() async {
    setState(() {
      foodItemOrders =
          order!.orderedFoods.where((food) => food.orderStatus == 2).toList();
    });
  }

  // List<Food> foodList = [];

  @override
  void initState() {
    super.initState();
    // super.initState();
    // homeController.getAllOrder(homeController.token);
    // homeController.getFoodsByOrderSelected(widget.order!);
    // detailProductController.getOrderByTable();
    // foodList = homeController.foodListByOrderSelectedHistory;
    homeController.getOrderById(detailProductController.currentOrder.value!.id);
    order = detailProductController.currentOrder.value!;
    homeController.getFoodsByOrderSelected(order);
    getOrderById();
  }

  Future<void> handleClick(String id) async {
    Food? food = await homeController.getFoodById(id);
    Get.to(
      () => DetailProduct(),
      arguments: food,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: Obx(() {
                if (homeController.foodListByOrderSelectedHistory.isNotEmpty &&
                    foodItemOrders.length != 0) {
                  return ListView.builder(
                    physics: const BouncingScrollPhysics(),
                    itemCount: foodItemOrders.length,
                    itemExtent: Dimensions.height280,
                    itemBuilder: (context, index) {
                      foodItemOrder =
                          homeController.foodListByOrderSelectedHistory[index];
                      bool isChecked = (foodItemOrders[index].orderStatus == 1);
                      bool isDone = false;
                      return CardItemFoodOrder(
                          nameFood: foodItemOrder.name,
                          ingredients: getIngredient(foodItemOrder),
                          image: foodItemOrder.image,
                          price: foodItemOrder.price,
                          number: foodItemOrders[index].quantity,
                          height: Dimensions.height150,
                          isChecked: isChecked,
                          isDone: isDone,
                          isStaff: widget.isstaff,
                          onCancelPressed: () {
                            print('Cancel button pressed');
                          },
                          onFoodProcessingPressed: () {
                            print('Food Processing button pressed');
                          },
                          onCallBackPressed: () {
                            handleClick(homeController
                                .foodListByOrderSelectedHistory[index].id);
                          },
                          onDonePressed: () {
                            print('Done button pressed');
                          },
                          onCheckboxPressed: () {
                            print('Checkbox pressed');
                          },
                          incrementNumber: () {
                            print('Increase pressed');
                          },
                          decrementNumber: () {
                            print('Decrease pressed');
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
