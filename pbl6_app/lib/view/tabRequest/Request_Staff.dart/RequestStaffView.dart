import 'package:flutter/material.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/view/tabRequest/Card/Card_TableRequest.dart';
import 'package:restaurant_app/view/tabRequest/Request_Staff.dart/RequestOfTable.dart';
import 'package:restaurant_app/model/model_TableRequest.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/model/Request.dart';
class RequestStaffView extends StatefulWidget {
  const RequestStaffView({Key? key}) : super(key: key);

  @override
  State<RequestStaffView> createState() => _RequestStaffViewState();
}

class _RequestStaffViewState extends State<RequestStaffView> {
  late List<TableRequest> requestListOffTabel;
  String selectedTable = '';
  List<Request> RequestListOfselectedTable=[];

  @override
  void initState() {
    super.initState();
    requestListOffTabel = [];

    // Gọi hàm async thông qua một hàm giữa để có thể sử dụng await
    initTableRequests();
  }

  Future<void> initTableRequests() async {
    // Lấy danh sách TableRequest từ HomeController
    List<TableRequest> tableRequests = homeController.getDistinctTableRequests();

    // Gán danh sách vào requestListOffTabel
    setState(() {
      requestListOffTabel = tableRequests;
    });
  }

  @override
  Widget build(BuildContext context) {
    return selectedTable.isNotEmpty
        ? RequestOfTable(nameTable: selectedTable,requestList: RequestListOfselectedTable)
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
                    _buildTitle('Request List'),
                    SizedBox(height: Dimensions.height30),
                    Expanded(
                      child: ListView.builder(
                        itemCount: requestListOffTabel.length,
                        itemBuilder: (context, index) {
                           if (index < 0 || index >= requestListOffTabel.length) {
                            return Container();
                          }
                          TableRequest tableRequest =
                              requestListOffTabel[index];
                          return CardTableRequest(
                            nameTable: tableRequest.name,
                            numberRequest: tableRequest.requestCount,
                            onDetailPressed: () {
                              setState(() {
                                selectedTable = tableRequest.name;
                                RequestListOfselectedTable = tableRequest.requestList;
                              });
                            },
                            height: 100,
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
          width: Dimensions.width200,
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
