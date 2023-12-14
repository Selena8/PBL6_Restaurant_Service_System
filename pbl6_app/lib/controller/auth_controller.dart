import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:restaurant_app/const.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/controller/home_controller.dart';
import 'package:restaurant_app/controller/order_controller.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class AuthController {
  final Dio _dio = Dio();

  Future<void> removeToken() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('user_data', "");
    await prefs.setString('token', "");
    await prefs.setString('infoTable', "");
  }

  Future<void> createAccount(String email, String password) async {
    final String apiUrl = '$BASE_URL/api/users/send/verify-email';

    final response = await http.post(
      Uri.parse(apiUrl),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 201) {
      print("Tài khoản đã được tạo thành công.");
    } else {
      print("Lỗi: ${response.body}");
    }
  }

  Future<bool> loginTable(String email, String password) async {
    try {
      // final response = await _dio.post(
      //   '$BASE_URL/api/auth/login-table',
      //   data: {'email': email, 'password': password},
      // );

      final Map<String, String> headers = {
        'accept': 'text/plain',
        'Content-Type': 'application/json',
      };
      final http.Response response = await http.post(
        Uri.parse('$BASE_URL/api/auth/login-table'),
        headers: headers,
        body: jsonEncode({'email': email, 'password': password}),
      );

      if (response.statusCode == 200) {
        final tokenData = response.body;
        // print(" HehehehehehABCSSSHH: $tokenData");
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', tokenData);
        await prefs.setBool('isRoleTable', true);
        Get.lazyPut(() => DetailProductController());
        detailProductController.getOrderByTable();
        homeController.decodeJwt(prefs.getString('token'));

        print(prefs.getString('token')!);
        return true;
      } else {
        print('Login failed. Status Code: ${response.statusCode}');
        return false;
      }
    } catch (error) {
      print('Login failed. Error: $error');
      return false;
    }
  }

  Future<bool> loginUser(String email, String password) async {
    try {
      final response = await _dio.post(
        '$BASE_URL/api/auth/login',
        data: {'email': email, 'password': password},
      );

      if (response.statusCode == 200) {
        final userData = response.data;
        Get.lazyPut(() => HomeController());
        homeController.fetchAccountInfo(userData['token']);
        final prefs = await SharedPreferences.getInstance();
        await prefs.setBool('isRoleTable', false);
        await prefs.setString('token', userData['token']);
        homeController.getToken();

        print('Login successful + ${prefs.getString('token')}');
        return true;
      } else {
        print('Login failed. Status Code: ${response.statusCode}');
        return false;
      }
    } catch (error) {
      print('Login failed. Error: $error');
      return false;
    }
  }

  //Forgot Password
  Future<String> forgotPassword(String email) async {
    final String apiUrl = '$BASE_URL/api/users/send/forgot-password';

    final response = await http.post(
      Uri.parse(apiUrl),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'email': email,
      }),
    );

    if (response.statusCode == 200) {
      return 'We sent a reset password link to your email. Not receive?';
    } else {
      final responseBody = jsonDecode(response.body);

      if (responseBody['message'] == 'Email does not exits') {
        return 'The staff email account does not exist!';
      } else if (responseBody['message'] ==
          'Unconfirmed email or account has been locked') {
        return 'Email has not been verified, please verify email through Gmail!';
      } else {
        return 'Unknown error occurred';
      }
    }
  }

  Future<String> resendConfirmMail(String email) async {
    try {
      if (email == null) {
        return 'Email cannot be null';
      }
      final String apiUrl =
          'https://api.restaurantservice.online/api/users/resend-confirm-mail';
      final Uri uri = Uri.parse('$apiUrl?email=$email');

      final response = await http.post(
        uri,
        headers: {'accept': 'application/json'},
      );

      print('Response body: ${response.body}');
      if (response.statusCode == 200) {
        return 'We sent a verification email link to your email. Not receive?';
      } else {
        final responseBody = jsonDecode(response.body);
        print(responseBody);
        if (responseBody['message'] == 'Account is not Exist') {
          return 'The staff email account does not exist!';
        } else {
          return responseBody['message'];
        }
      }
    } catch (error) {
      print('Resend confirm mail failed. Error: $error');
      return 'Failed to resend confirmation email.';
    }
  }
}
