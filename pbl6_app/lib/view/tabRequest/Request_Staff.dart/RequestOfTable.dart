import 'package:flutter/material.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:intl/intl.dart';
import 'package:restaurant_app/view/tabRequest/Card/Card_Request.dart';
import 'package:restaurant_app/view/tabRequest/Request_Staff.dart/RequestStaffView.dart';
import 'package:restaurant_app/model/Request.dart';
import 'package:restaurant_app/controller/controllers.dart';

class RequestOfTable extends StatefulWidget {
  final String nameTable;
  final List<Request> requestList;
  const RequestOfTable({
    Key? key,
    required this.nameTable,
    required this.requestList, // Add this line
  }) : super(key: key);

  @override
  State<RequestOfTable> createState() => _RequestOfTableState();
}

class _RequestOfTableState extends State<RequestOfTable> {
  DateTime parseDateTime(String input) {
    return DateFormat('dd/MM/yyyy HH:mm:ss').parseStrict(input);
  }

  late List<Request> requestList;
  String selectedTable = '';
  bool showRequestStaffView = false;
  @override
  void initState() {
    super.initState();
  }

  String formatDateTime(DateTime dateTime) {
    return DateFormat('dd/MM/yyyy HH:mm:ss').format(dateTime);
  }

  @override
  Widget build(BuildContext context) {
    return showRequestStaffView
        ? RequestStaffView()
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
                    _buildTitle('Request Of ${widget.nameTable}'),
                    SizedBox(height: Dimensions.height30),
                    Expanded(
                      child: ListView.builder(
                        physics: BouncingScrollPhysics(),
                        itemCount: widget.requestList.length,
                        itemExtent: Dimensions.height230,
                        itemBuilder: (context, index) {
                          Request tableRequest = widget.requestList[index];
                          String typeText = "";
                          switch (tableRequest.type) {
                            case 0:
                              typeText = "Serving";
                              break;
                            case 1:
                              typeText = "Instrument";
                              break;
                            case 2:
                              typeText = "Spice";
                              break;
                            case 3:
                              typeText = "Payment";
                              break;
                            case 4:
                              typeText = "Other";
                              break;
                            default:
                              typeText = "Unknown";
                              break;
                          }
                          return CardRequest(
                            requestId: tableRequest.id,
                            Type: typeText,
                            content: tableRequest.description,
                            timeStartRequest: tableRequest.requestTime,
                            onDonePressed: () async {
                              bool success = await homeController
                                  .resolveRequest(tableRequest.id);
                              if (success) {
                                // Handle success, update UI, etc.
                                print('Request resolved successfully');

                                // Remove the resolved request from the widget.requestList
                                setState(() {
                                  widget.requestList.remove(tableRequest);
                                });

                                // Reload the data by fetching the updated list of requests
                                homeController
                                    .getAllRequest(homeController.token);
                              } else {
                                // Handle failure, show error message, etc.
                                print('Failed to resolve request');
                              }
                            },
                            height: Dimensions.height100,
                          );
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
          width: Dimensions.width280,
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
                icon: Icon(Icons.arrow_back_ios),
                color: ColorPalette.primaryOrange,
                onPressed: () {
                  setState(() {
                    showRequestStaffView = true;
                  });
                },
              ),
              Text(
                title,
                style: TextStyle(
                  color: Colors.black,
                  fontSize: Dimensions.font20,
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
