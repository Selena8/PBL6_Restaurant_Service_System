import 'package:intl/intl.dart';

class Account {
  final int id;
  final String email;
  final String displayName;
  final String? firstName;
  final String? lastName;
  final int accountStatus;
  final String? dateOfBirth;
  final int? gender;
  final String? phoneNumber;
  final int userType;
  final String? address;
  final String? token;
  final String? avatar;

  Account(
      {required this.id,
      required this.email,
      required this.displayName,
      required this.firstName,
      required this.lastName,
      required this.accountStatus,
      required this.dateOfBirth,
      required this.gender,
      required this.phoneNumber,
      required this.userType,
      required this.address,
      this.token,
      required this.avatar});

  factory Account.fromJson(Map<String, dynamic> json) {
    return Account(
      id: json['id'],
      email: json['email'],
      displayName: json['displayName'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      accountStatus: json['accountStatus'],
      dateOfBirth: DateFormat("dd-MM-yyyy").format(DateTime.parse(json['dayOfBirth'])),
      gender: json['gender'] is int ? json['gender'] : null,
      phoneNumber: json['phoneNumber'],
      userType: json['userType'],
      address: json['address'],
      token: json['token'],
      avatar: json['avatar'] ?? "",
    );
  }
}
