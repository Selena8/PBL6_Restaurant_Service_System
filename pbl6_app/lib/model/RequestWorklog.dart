import 'dart:convert';

List<RequestWorkLog> requestWorklogListFromJson(String val) =>
    List<RequestWorkLog>.from(json
        .decode(val)['data']
        .map((request) => RequestWorkLog.fromJson(request)));

class RequestWorkLog {
  final int id;
  final DateTime startTime;
  final DateTime endTime;
  final int status;
  final String description;
  final int shiftId;
  final String staffName;

  RequestWorkLog({
    required this.id,
    required this.startTime,
    required this.endTime,
    required this.status,
    required this.description,
    required this.shiftId,
    required this.staffName,
  });

  factory RequestWorkLog.fromJson(Map<String, dynamic> data) {
    return RequestWorkLog(
      id: data['id'],
      startTime: DateTime.parse(data['startTime']),
      endTime: DateTime.parse(data['endTime']),
      status: data['status'] as int,
      description: data['description'],
      shiftId: data['shiftId'] as int,
      staffName: data['staffName'],
    );
  }
}
