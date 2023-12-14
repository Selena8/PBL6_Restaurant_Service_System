import 'dart:convert';

List<Table_> tableListFromJson(String val) => List<Table_>.from(
    json.decode(val)['data'].map((table) => Table_.tableFromJson(table)));
Table_ tableByIdFromJson(String val) =>
    Table_.tableByIdFromJson(json.decode(val));

class Table_ {
  final int id;
  final String name;
  final int numberOfSeats;
  final int currentStatus;
  final String tableName;

  Table_({
    required this.id,
    required this.name,
    required this.numberOfSeats,
    required this.currentStatus,
    required this.tableName,
  });
  factory Table_.tableFromJson(Map<String, dynamic> data) => Table_(
        id: data['id'],
        name: data['name'].toString(),
        numberOfSeats: data['numberOfSeats'],
        currentStatus: data['currentStatus'],
        tableName: data['tableName'].toString(),
      );

  factory Table_.tableByIdFromJson(Map<String, dynamic> data) {
    return Table_(
      id: data['id'],
      name: data['name'].toString(),
      numberOfSeats: data['numberOfSeats'],
      currentStatus: data['currentStatus'],
      tableName: data['tableName'].toString(),
    );
  }
}
