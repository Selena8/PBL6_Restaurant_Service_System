import 'dart:convert';

List<Request> requestListFromJson(String val) => List<Request>.from(
    json.decode(val)['data'].map((request) => Request.fromJson(request)));

class Request {
  final int id;
  final int tableId;
  final String description;
  final int status;
  final int type;
  final DateTime requestTime;

  Request({
    required this.id,
    required this.tableId,
    required this.description,
    required this.status,
    required this.type,
    required this.requestTime,
  });

  factory Request.fromJson(Map<String, dynamic> data) {
    return Request(
      id: data['id'] as int,
      tableId: data['tableId'] as int,
      description: data['description'] as String,
      status: data['status'] as int,
      type: data['type'] as int,
      requestTime: DateTime.parse(data['requestTime']),
    );
  }
}
