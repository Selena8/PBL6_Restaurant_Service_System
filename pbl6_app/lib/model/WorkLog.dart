class WorkLog {
  final int id;
  final int userId;
  final int shiftId;
  final double totalTime;
  final DateTime checkInTime;
  final DateTime checkOutTime;

  WorkLog({
    required this.id,
    required this.userId,
    required this.shiftId,
    required this.totalTime,
    required this.checkInTime,
    required this.checkOutTime,
  });

  factory WorkLog.fromJson(Map<String, dynamic> data) {
    return WorkLog(
      id: data['id'],
      userId: data['userId'],
      shiftId: data['shiftId'],
      totalTime: data['totalTime'] as double,
      checkInTime: DateTime.parse(data['checkInTime']),
      checkOutTime: DateTime.parse(data['checkOutTime']),
    );
  }
}
