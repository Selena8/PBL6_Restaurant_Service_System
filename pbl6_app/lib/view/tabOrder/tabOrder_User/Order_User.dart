import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/controller/order_controller.dart';
import 'package:restaurant_app/view/tabOrder/tabOrder_User/HistoryUserOrderView.dart';
import 'package:restaurant_app/view/tabOrder/tabOrder_User/UpcomingUserOrderView.dart';

class OrderUserView extends StatefulWidget {
  const OrderUserView({Key? key}) : super(key: key);

  @override
  State<OrderUserView> createState() => _OrderUserViewState();
}

class _OrderUserViewState extends State<OrderUserView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
              _buildTitle('My Orders'),
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
                            borderRadius: BorderRadius.circular(20.0),
                          ),
                          padding: EdgeInsets.only(
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
                              borderRadius: BorderRadius.circular(18.0),
                              color: ColorPalette.primaryOrange,
                            ),
                            labelColor: ColorPalette.white,
                            unselectedLabelColor: ColorPalette.primaryOrange,
                          ),
                        ),
                      ),
                      Obx(() {
                        Get.lazyPut(() => DetailProductController());
                        if (detailProductController.currentOrder.value !=
                            null) {
                          return Expanded(
                            child: TabBarView(
                              children: [
                                Center(
                                    child: UpcomingUserOrderView(
                                  isstaff: false,
                                  onDonePressedCallback: () {
                                    // Reload the DetailOrderTable widget here
                                    setState(() {});
                                  },
                                )),
                                const Center(
                                  child: HistoryUserOrderView(
                                    isstaff: false,
                                  ),
                                ),
                              ],
                            ),
                          );
                        } else {
                          return const SizedBox();
                        }
                      })
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
}
