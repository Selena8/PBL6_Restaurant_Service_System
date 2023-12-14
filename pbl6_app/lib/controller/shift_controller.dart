import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:restaurant_app/model/Shift.dart';
import 'package:restaurant_app/model/RequestWorkLog.dart';
import 'package:restaurant_app/service/remote_services/remote_shift_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ShiftController extends GetxController {
  static ShiftController instance = Get.find();
  RxList<Shift> shiftList = List<Shift>.empty(growable: true).obs;
  RxList<Shift> shiftListInDate = List<Shift>.empty(growable: true).obs;
  RxList<String> startTimeList = List<String>.empty(growable: true).obs;
  RxList<String> endTimeList = List<String>.empty(growable: true).obs;
  RxList<RequestWorkLog> requestWorklogList =
      List<RequestWorkLog>.empty(growable: true).obs;
  Rx<bool> isCheckIn = Rx<bool>(false);
  Rx<bool> isCheckOut = Rx<bool>(false);
  Rx<Shift?> currentShift = Rx<Shift?>(null);
  RxBool isShiftLoading = false.obs;
  RxBool isGetCurrentShift = false.obs;

  @override
  void onInit() {
    super.onInit();
    getAllShift();
  }

  void checkAttendanceShift() {
    getShiftCurrent();
    if (currentShift.value == null) {
      return;
    }
    if (currentShift.value!.workLog == null) {
      return;
    }
    isCheckIn.value = checkYearValid(currentShift.value!.workLog!.checkInTime);
    isCheckOut.value =
        checkYearValid(currentShift.value!.workLog!.checkOutTime);
  }

  void checkIn(context) async {
    final prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('token');
    if (token == null) {
      print("token checkIn invalid !");
      return;
    }
    try {
      var result =
          await RemoteShiftService().checkIn(token, currentShift.value!.id);
      print("Check in : ${result.body}");
      if (result.body != null) {
        isCheckIn.value = true;
        getShiftById(currentShift.value!.id);
        showToast(context, true, "Roll successfully !");
      } else {
        isCheckIn.value = false;
        showToast(context, false, "Roll Fail !");
      }
    } catch (e) {
      print(e);
      isCheckIn.value = false;
      showToast(context, false, "Roll Fail !");
    }
  }

  void checkOut(context) async {
    final prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('token');
    if (token == null) {
      print("token checkOut invalid !");
      return;
    }
    if (currentShift.value == null) {
      print("currentShift null !");
      return;
    }
    try {
      var result =
          await RemoteShiftService().checkOut(token, currentShift.value!.id);
      print("Check out : ${result.body}");
      if (result != null) {
        print("Check out : ${result.body}");
        isCheckOut.value = true;
        getShiftById(currentShift.value!.id);
        showToast(context, true, "Roll successfully !");
      } else {
        isCheckOut.value = false;
        showToast(context, false, "Roll Fail !");
      }
    } catch (e) {
      isCheckOut.value = false;
      showToast(context, false, "Roll Fail !");
    }
  }

  void showToast(StatefulElement context, bool isSuccess, String message) {
    if (isSuccess) {
      MotionToast.success(
        title: const Text("Success !"),
        description: Text(message),
      ).show(context);
    } else {
      MotionToast.error(
        title: const Text("Error !"),
        description: Text(message),
      ).show(context);
    }
  }

  bool checkYearValid(DateTime datetime) {
    print("---------------- ${DateFormat("yyyy").format(datetime)}");
    return DateFormat("yyyy").format(datetime) != "9999";
  }

  void getShiftCurrent() {
    for (int i = 0; i < shiftListInDate.length; i++) {
      if (DateTime.now().isAfter(shiftListInDate[i].startTime) &&
          DateTime.now().isBefore(shiftListInDate[i].endTime)) {
        currentShift.value = shiftListInDate[i];
        return;
      }
    }
  }

  Future<bool> getShiftById(int shiftId) async {
    isGetCurrentShift.value = true;
    currentShift.value = null;
    final prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('token');
    if (token == null) {
      print("token getAllShift invalid !");
      return Future(() => false);
    }
    try {
      var result = await RemoteShiftService().getShiftById(token, shiftId);
      if (result != null) {
        print("okkkkkkkkkkkkkkkkkkkkkk");
        currentShift.value = Shift.shiftFromJson(json.decode(result.body));
        return Future(() => true);
      } else {
        return Future(() => false);
      }
    } catch (e) {
      return Future(() => false);
    } finally {
      isGetCurrentShift.value = false;
    }
  }

  void getAllShift() async {
    final prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('token');
    if (token == null) {
      print("token getAllShift invalid !");
      return;
    }
    try {
      isShiftLoading(true);
      var result = await RemoteShiftService().getAllShift(token);
      print("=======================================================");
      print(result.body);
      print("=======================================================");
      if (result != null) {
        shiftList.assignAll(shiftListFromJson(result.body));
      }
    } finally {
      getScheduleInday(null);
      checkAttendanceShift();
      print("Shift length : ${shiftList.length}");
      isShiftLoading(false);
    }
  }

  void getScheduleInday(DateTime? now) {
    shiftListInDate.clear();
    now ??= DateTime.now();
    String dayNowToString = DateFormat("yyyy-MM-dd HH:mm:ss").format(now);
    print(dayNowToString);

    for (Shift shift in shiftList) {
      if (getStringByDateTime(shift.workDate).split(" ")[0] ==
          dayNowToString.split(" ")[0]) {
        shiftListInDate.add(shift);
      }
    }
    shiftListInDate.sort((a, b) => a.startTime.compareTo(b.startTime));
    getTimeList();
  }

  String getStringByDateTime(DateTime date) {
    return DateFormat("yyyy-MM-dd HH:mm:ss").format(date);
  }

  void getTimeList() {
    startTimeList.clear();
    endTimeList.clear();
    for (Shift shift in shiftListInDate) {
      startTimeList.add(getStringByDateTime(shift.startTime).split(" ")[1]);
      endTimeList.add(getStringByDateTime(shift.endTime).split(" ")[1]);
    }
  }

  int checkInShift() {
    for (int i = 0; i < shiftListInDate.length; i++) {
      if (DateTime.now().isAfter(shiftListInDate[i].startTime) &&
          DateTime.now().isBefore(shiftListInDate[i].endTime)) {
        return i;
      }
    }
    return -1;
  }

  bool checkInCurrentShift(DateTime start, DateTime end) {
    if (DateTime.now().isAfter(start) && DateTime.now().isBefore(end)) {
      return true;
    }
    return false;
  }

  final ValueNotifier<bool> showSpinner = ValueNotifier<bool>(false);

  void requestChangeWorklog(context, DateTime startTime, DateTime endTime,
      String desc, int shiftId) async {
    showSpinner.value = true;
    final prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('token');
    if (token == null) {
      print("token getAllShift invalid !");
      return;
    }
    print(shiftId);
    print(startTime.toIso8601String());
    print(endTime.toIso8601String());
    print(desc);
    Map<String, dynamic> jsonRequest = {
      "startTime": startTime.toIso8601String(),
      "endTime": endTime.toIso8601String(),
      "description": desc,
      "shiftId": shiftId,
    };
    try {
      var result =
          await RemoteShiftService().requestChangeWorklog(token, jsonRequest);
      print(result);
      if (result.statusCode == 200) {
        if (result != null) {
          showToast(context, true, "Request Change Worklog Success");
        } else {
          showToast(context, false, "Request Change Worklog Fail");
        }
      } else {
        showToast(context, false, "Request Change Worklog Fail");
      }
    } catch (e) {
      print(e);
      showToast(context, false, "Request Change Worklog Fail");
    } finally {
      showSpinner.value = false;
    }
  }

  void getAllRequestChangeWorklog() async {
    final prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('token');
    if (token == null) {
      print("token getAllShift invalid !");
      return;
    }

    try {
      var result = await RemoteShiftService().getAllRequestChangeWorklog(token);
      print(result);
      if (result.statusCode == 200) {
        requestWorklogList
            .assignAll(requestWorklogListFromJson(result.body).reversed);
      }
    } catch (e) {
      print(e);
    }
  }

  Future<bool> deleteRequestChangeWorklog(int indexDelete) async {
    final prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('token');
    if (token == null) {
      print("token getAllShift invalid !");
      return false;
    }

    try {
      var result = await RemoteShiftService()
          .deleteRequestChangeWorklog(token, indexDelete);
      print(result.body);
      if (result.statusCode == 200) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      print(e);
      return false;
    }
  }
}
