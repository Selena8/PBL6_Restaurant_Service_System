import 'package:flutter/material.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/model/Food.dart';
import 'package:restaurant_app/model/Order.dart';
import 'package:restaurant_app/view/tabOrder/tabOrder_Staff/Order_staff.dart';
import 'package:restaurant_app/view/tabOrder/tabOrder_User/HistoryUserOrderView.dart';
import 'package:restaurant_app/view/tabOrder/tabOrder_User/UpcomingUserOrderView.dart';

class DetailOrderTable extends StatefulWidget {
  final String tableName;
  final int Index;

  DetailOrderTable({Key? key, required this.tableName, required this.Index})
      : super(key: key);

  @override
  State<DetailOrderTable> createState() => _DetailOrderTableState();
}

class _DetailOrderTableState extends State<DetailOrderTable> {
  bool showOrderStaff = false;
  late Order selectedOrder;

  // Future<List<Food?>> getListFoodById() async {
  //   return await Future.wait(
  //     selectedOrder.orderedFoods
  //         .where((food) => food.orderStatus != 2)
  //         .map((orderedFood) =>
  //             homeController.getFoodById(orderedFood.foodId.toString())),
  //   );
  // }

  @override
  void initState() {
    selectedOrder = detailProductController.currentOrder.value!;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return showOrderStaff
        ? const OrderStaffView()
        : Scaffold(
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
                    _buildTitle(),
                    SizedBox(height: Dimensions.height30),
                    Expanded(
                      child: DefaultTabController(
                        length: 2,
                        initialIndex: 0,
                        child: Column(
                          children: [
                            Padding(
                              padding: EdgeInsets.only(
                                  left: Dimensions.width10,
                                  right: Dimensions.width10),
                              child: Container(
                                decoration: BoxDecoration(
                                  border: Border.all(color: Colors.grey),
                                  borderRadius: BorderRadius.circular(
                                      Dimensions.radius20),
                                ),
                                padding: const EdgeInsets.only(
                                    left: 2, right: 2, top: 3, bottom: 3),
                                child: TabBar(
                                  tabs: [
                                    Tab(
                                      child: Text(
                                        'Upcoming',
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: Dimensions.font16,
                                        ),
                                      ),
                                    ),
                                    Tab(
                                      child: Text(
                                        'History',
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: Dimensions.font16,
                                        ),
                                      ),
                                    ),
                                  ],
                                  indicator: BoxDecoration(
                                    borderRadius: BorderRadius.circular(
                                        Dimensions.radius18),
                                    color: ColorPalette.primaryOrange,
                                  ),
                                  labelColor: ColorPalette.white,
                                  unselectedLabelColor:
                                      ColorPalette.primaryOrange,
                                ),
                              ),
                            ),
                            Expanded(
                              child: TabBarView(
                                children: [
                                  Center(
                                      child: UpcomingUserOrderView(
                                    isstaff: true,
                                    onDonePressedCallback: () {
                                      // Reload the DetailOrderTable widget here
                                      setState(() {});
                                    },
                                  )),
                                  Center(
                                    child: HistoryUserOrderView(
                                        isstaff: true,),
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
            ),
          );
  }

  Widget _buildTitle() {
    return Center(
      child: Padding(
        padding: EdgeInsets.fromLTRB(
            Dimensions.width25, Dimensions.height15, Dimensions.width25, 0),
        child: Container(
          width: Dimensions.width180,
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
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              IconButton(
                icon: const Icon(Icons.arrow_back_ios),
                color: ColorPalette.primaryOrange,
                onPressed: () {
                  setState(() {
                    showOrderStaff = true;
                  });
                },
              ),
              Text(
                widget.tableName,
                style: TextStyle(
                  color: Colors.black,
                  fontSize: Dimensions.font25,
                  height: 1.2,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class Dimenisons {}
