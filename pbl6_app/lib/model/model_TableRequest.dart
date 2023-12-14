
import 'package:restaurant_app/model/Request.dart';
class TableRequest {
  int tableId;
  String name;
  int requestCount;
  List<Request> requestList;

  TableRequest({
    required this.tableId,
    required this.name,
    required this.requestCount,
    required this.requestList,
  });
}