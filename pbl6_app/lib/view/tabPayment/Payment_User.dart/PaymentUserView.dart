import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/controller/order_controller.dart';
import 'package:restaurant_app/model/Food.dart';
import 'package:restaurant_app/model/IngredientsOfFood.dart';
import 'package:restaurant_app/model/OrderedFoods.dart';
import 'package:restaurant_app/view/tabPayment/Card_ItemFoodPayment.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/components/button_widget.dart';
import 'package:restaurant_app/components/line_widget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/view/tabPayment/DialogMethodPayment.dart';

class PaymentUserView extends StatefulWidget {
  const PaymentUserView({Key? key}) : super(key: key);

  @override
  State<PaymentUserView> createState() => _PaymentUserViewState();
}

class _PaymentUserViewState extends State<PaymentUserView> {
  double totalItemPrice = 0;
  late Food foodItemOrder;
  List<Food> foodList = [];
  late List<OrderedFoods> foodItemOrders = [];

  Future<void> getOrderById() async {
    setState(() {
      foodItemOrders = detailProductController.currentOrder.value != null ? detailProductController.currentOrder.value!.orderedFoods
          .where((food) =>food.orderStatus != 3)
          .toList() : [];
    });
  }

  @override
  void initState() {
    super.initState();
    foodList = homeController.foodListByOrder;
    getOrderById();
    calculateTotalItemPrice();
  }

  void calculateTotalItemPrice() {
    totalItemPrice = 0;
    for (int i = 0; i < homeController.foodListByOrder.length; i++) {
      Food foodItemOrder = homeController.foodListByOrder[i];
      int quantity =
          detailProductController.currentOrder.value!.orderedFoods[i].quantity;
      setState(() {
        totalItemPrice += foodItemOrder.price * quantity;
        print(totalItemPrice);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    String getIngredient(Food food) {
      String ingredient = "";
      for (IngredientsOfFood ingre in food.ingredients) {
        ingredient += "${ingre.description}, ";
      }
      return ingredient.substring(0, ingredient.length - 2);
    }

    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.transparent,
      body: Container(
        clipBehavior: Clip.hardEdge,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10),
        ),
        child: SafeArea(
          child: Column(
            children: [
              _buildTitle("Payment"),
              Expanded(child: Obx(() {
                if (homeController.foodListByOrder.isNotEmpty) {
                  return ListView.builder(
                    physics: const BouncingScrollPhysics(),
                    itemCount: homeController.foodListByOrder.length,
                    itemExtent: Dimensions.height150,
                    itemBuilder: (context, index) {
                      foodItemOrder = foodList[index];
                      return CardItemFoodPayment(
                        nameFood: foodItemOrder.name,
                        ingredients: getIngredient(foodItemOrder),
                        image: foodItemOrder.image,
                        price: foodItemOrder.price.toString(),
                        number: foodItemOrders[index].quantity,
                      );
                    },
                  );
                } else {
                  return const SizedBox();
                }
              })),
              SizedBox(height: Dimensions.height10),
              LineWidget(
                  width: Dimensions.width250,
                  strokeWidth: 2,
                  color: ColorPalette.black),
              SizedBox(height: Dimensions.height10),
              detailProductController.currentOrder.value != null ?_buildPriceRow("Subtotal",
                  detailProductController.currentOrder.value!.total) : const SizedBox(),
              SizedBox(height: Dimensions.height10),
              LineWidget(
                  width: Dimensions.width350,
                  strokeWidth: 0,
                  color: Colors.grey),
              SizedBox(height: Dimensions.height10),
              _buildPriceRow("Tax and Fees", 0),
              SizedBox(height: Dimensions.height10),
              LineWidget(
                  width: Dimensions.width350,
                  strokeWidth: 0,
                  color: Colors.grey),
              SizedBox(height: Dimensions.height10),
              detailProductController.currentOrder.value != null ? _buildPriceRow("Total (2 items)",
                  detailProductController.currentOrder.value!.total) : const SizedBox(),
              SizedBox(height: Dimensions.height20),
              ButtonWidget(
                title: "CHECKOUT",
                size: Dimensions.font20,
                borderRadius: Dimensions.radius40,
                width: Dimensions.width250,
                height: Dimensions.height60,
                color: ColorPalette.white,
                background: ColorPalette.primaryOrange,
                blur: 1,
                onTap: () {
                  Get.put(DetailProductController());
                  if (detailProductController.currentOrder.value != null) {
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return DialogMethodPayment(
                          orderPayment:
                              detailProductController.currentOrder.value!,
                        );
                      },
                    );
                  } else {
                    MotionToast.error(
                            title: const Text("Error !"),
                            description: const Text("Please Login !"))
                        .show(context);
                  }
                },
              ),
              SizedBox(height: Dimensions.height30),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTitle(String title) {
    return Center(
      child: Padding(
        padding: EdgeInsets.fromLTRB(
            Dimensions.width25, Dimensions.height15, Dimensions.width25, 0),
        child: Container(
          width: Dimensions.width200,
          height: Dimensions.height40,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(Dimensions.radius20),
            boxShadow: [
              BoxShadow(
                color: Colors.grey,
                offset: Offset(0, 2),
                blurRadius: 1.0,
              ),
            ],
          ),
          child: Center(
            child: Text(
              title,
              style: TextStyle(
                color: Colors.black,
                fontSize: Dimensions.font25,
                height: 1.2,
                fontWeight: FontWeight.w800,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPriceRow(String label, double amount) {
    return Padding(
      padding:
          EdgeInsets.fromLTRB(Dimensions.width25, 0, Dimensions.width25, 0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          AppText(
            text: label,
            color: ColorPalette.black,
            size: Dimensions.font16,
            height: 2.0,
            fontWeight: FontWeight.w400,
          ),
          Row(
            children: [
              Padding(
                padding: EdgeInsets.only(top: Dimensions.height10),
                child: Icon(
                  Icons.attach_money,
                  size: Dimensions.font25,
                  color: Colors.black,
                ),
              ),
              AppText(
                text: amount.toString(),
                color: ColorPalette.black,
                size: Dimensions.font20,
                height: 2.0,
                fontWeight: FontWeight.w400,
              ),
              Padding(
                padding: EdgeInsets.only(bottom: 5),
                child: AppText(
                  text: "VND",
                  color: Colors.grey,
                  size: Dimensions.font14,
                  height: 2.0,
                  fontWeight: FontWeight.w300,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
