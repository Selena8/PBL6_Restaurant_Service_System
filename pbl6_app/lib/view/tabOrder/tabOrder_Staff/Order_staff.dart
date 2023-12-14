import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:intl/intl.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/controller/order_controller.dart';
import 'package:restaurant_app/model/Order.dart';
import 'package:restaurant_app/view/tabOrder/Card/Card_TableOrder.dart';
import 'package:restaurant_app/view/tabOrder/tabOrder_Staff/Detail_Order_Table.dart';
import 'package:restaurant_app/model/Table.dart';

class OrderStaffView extends StatefulWidget {
  const OrderStaffView({Key? key}) : super(key: key);

  @override
  State<OrderStaffView> createState() => _OrderStaffViewState();
}

class _OrderStaffViewState extends State<OrderStaffView> {
  // DateTime parseDateTime(String input) {
  //   return DateFormat('dd/MM/yyyy HH:mm:ss').parseStrict(input);
  // }

  Order? selectedOrder;
  List<Table_> tableList = [];
  List<String> nameTableList = [];
  String tableName = "";
  late int Index;
  @override
  void initState() {
    super.initState();
    if (homeController.orderList.isNotEmpty &&
        homeController.tableList.isNotEmpty) {
      for (Order order in homeController.orderList) {
        for (Table_ table in homeController.tableList) {
          if (order.tableId == table.id) {
            setState(() {
              print(table.name);
              nameTableList.add(table.name);
              return;
            });
          }
        }
      }
    }
    // if (homeController.tableList.isNotEmpty) {
    //   setState(() {
    //     tableList = homeController.tableList;
    //   });
    // }
  }

  String formatDateTime(DateTime dateTime) {
    return DateFormat('dd/MM/yyyy HH:mm:ss').format(dateTime);
  }

  @override
  Widget build(BuildContext context) {
    return selectedOrder != null
        ? DetailOrderTable(tableName: tableName, Index: Index)
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
                    _buildTitle('Table List'),
                    SizedBox(height: Dimensions.height30),
                    Expanded(
                      child: Obx(
                        () {
                          if (homeController.orderList.isNotEmpty) {
                            // print("Length order : ")
                            return ListView.builder(
                              physics: const BouncingScrollPhysics(),
                              itemCount: homeController.orderList.length,
                              itemExtent: Dimensions.height220,
                              itemBuilder: (context, index) {
                                Order tableorder =
                                    homeController.orderList[index];
                                return CardTableOrder(
                                  nameTable: nameTableList[index],
                                  numberItemOrder: tableorder.orderedFoods
                                      .where(
                                          (element) => element.orderStatus != 3)
                                      .length,
                                  timeStartOrder: tableorder.orderTime,
                                  onDetailPressed: () {
                                    setState(() {
                                      tableName = nameTableList[index];
                                      selectedOrder = tableorder;
                                      Get.put(DetailProductController());
                                      detailProductController
                                          .currentOrder.value = selectedOrder;
                                      Index = index;
                                    });
                                  },
                                  height: Dimensions.height100,
                                );
                              },
                            );
                          } else {
                            return const SizedBox();
                          }
                        },
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
          width: Dimensions.width180,
          height: Dimensions.height40,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20.0),
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
