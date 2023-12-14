import 'dart:convert';

import 'package:restaurant_app/model/WorkLog.dart';

List<Shift> shiftListFromJson(String val) => List<Shift>.from(
    json.decode(val)['data'].map((order) => Shift.shiftFromJson(order)));

class Shift {
  final int id;
  final DateTime workDate;
  final DateTime startTime;
  final DateTime endTime;
  final int status;
  final int userId;
  final String staffName;
  final WorkLog? workLog;

  Shift(
      {required this.id,
      required this.workDate,
      required this.startTime,
      required this.endTime,
      required this.status,
      required this.userId,
      required this.staffName,
      this.workLog});

  factory Shift.shiftFromJson(Map<String, dynamic> data) {
    return Shift(
      id: data['id'] as int,
      workDate: DateTime.parse(data['workDate']),
      startTime: DateTime.parse(data['startTime']),
      endTime: DateTime.parse(data['endTime']),
      status: data['status'] as int,
      userId: data['userId'] as int,
      staffName: data['staffName'],
      workLog:
          (data['workLog'] != null && data['workLog'] is Map<String, dynamic>)
              ? WorkLog.fromJson(data['workLog'] as Map<String, dynamic>)
              : null,
    );
  }
}
