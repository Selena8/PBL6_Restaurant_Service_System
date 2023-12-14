import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:intl/intl.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/model/Order.dart';
import 'package:restaurant_app/model/Table.dart';
import 'package:restaurant_app/view/tabPayment/Card/Card_TablePayment.dart';
import 'package:restaurant_app/view/tabPayment/Payment_Staff.dart/PaymentOfTable.dart';

class PaymentStaffView extends StatefulWidget {
  const PaymentStaffView({Key? key}) : super(key: key);

  @override
  State<PaymentStaffView> createState() => _PaymentStaffViewState();
}

class _PaymentStaffViewState extends State<PaymentStaffView> {
  DateTime parseDateTime(String input) {
    return DateFormat('dd/MM/yyyy HH:mm:ss').parseStrict(input);
  }

  Order? selectedOrder;
  List<Table_> tableList = [];
  List<String> nameTableList = [];
  String tableName = "";

  @override
  void initState() {
    super.initState();
    selectedOrder = null;
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
  }

  String formatDateTime(DateTime dateTime) {
    return DateFormat('dd/MM/yyyy HH:mm:ss').format(dateTime);
  }

  @override
  Widget build(BuildContext context) {
    return selectedOrder != null
        ? PaymentOfTable(selectedOrder: selectedOrder!, tableName: tableName)
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
                    _buildTitle('Payment List'),
                    SizedBox(height: Dimensions.height30),
                    Expanded(
                      child: Obx(() {
                        if (homeController.orderList.isNotEmpty) {
                          return ListView.builder(
                            physics: const BouncingScrollPhysics(),
                            itemCount: homeController.orderList.length,
                            itemExtent: Dimensions.height220,
                            itemBuilder: (context, index) {
                              Order tableorder =
                                  homeController.orderList[index];
                              return CardTablePayment(
                                nameTable: nameTableList[index],
                                numberItemOrder: tableorder.orderedFoods.where((element) => element.orderStatus != 3).length,
                                timeStartOrder: tableorder.orderTime,
                                onCheckoutPressed: () {
                                  setState(() {
                                    tableName = nameTableList[index];
                                    homeController.getFoodsByOrderSelected(tableorder);
                                    selectedOrder = tableorder;
                                  });
                                },
                                height: Dimensions.height100,
                              );
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
