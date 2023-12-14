import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:restaurant_app/components/TextWidget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/model/Shift.dart';
import 'package:restaurant_app/view/shift/Dialog_change_worklog.dart';

class ShiftWorkLog extends StatefulWidget {
  const ShiftWorkLog({super.key});

  @override
  State<ShiftWorkLog> createState() => _ShiftWorkLogState();
}

class _ShiftWorkLogState extends State<ShiftWorkLog> {
  Shift? shift = null;
  late StreamSubscription<Shift?> shiftSubscription;

  @override
  void initState() {
    super.initState();
    if (Get.arguments != null) {
      print("==================");
      shift = Get.arguments as Shift;
      print("${shift?.workLog?.checkInTime}");
    } else {
      shift = shiftController.currentShift.value;
    }

    shiftSubscription = shiftController.currentShift.listen((newShift) {
      if (mounted) {
        setState(() {
          shift = newShift;
        });
      }
    });
  }

  @override
  void dispose() {
    shiftSubscription.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            Stack(
              children: [
                Align(
                  alignment: Alignment.topLeft,
                  child: InkWell(
                      onTap: () {
                        Navigator.pop(context);
                      },
                      child: Container(
                        height: 40,
                        width: 40,
                        margin: const EdgeInsets.only(top: 20,left: 16),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(12),
                          color: ColorPalette.white,
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.2),
                              spreadRadius: 2,
                              blurRadius: 5,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: SvgPicture.asset(
                          AssetHelper.icoBack,
                          fit: BoxFit.none,
                        ),
                      ),
                    ),
                ),
                Align(
                  alignment: Alignment.center,
                  child: Padding(
                    padding: const EdgeInsets.only(left: 15, top: 30),
                    child: TextSophia(
                            size: 28,
                            textData: "Your activity",
                            color: ColorPalette.dartGrey,
                            weight: FontWeight.w100)
                        .textSophiaMedium,
                  ),
                ),
                Align(
                  alignment: Alignment.topRight,
                  child: InkWell(
                    onTap: () {
                      if (shift?.workLog != null &&
                          shift?.workLog?.checkOutTime != null) {
                        if (shift!.workLog!.checkOutTime
                            .isAfter(DateTime.now())) {
                          MotionToast.warning(
                                  title: const Text("Waring !"),
                                  description: const Text(
                                      "Your work shift is not finished or not completed yet!"))
                              .show(context);
                          return;
                        }
                      } else {
                        if(shift!.endTime
                            .isAfter(DateTime.now())){
                          MotionToast.warning(
                                title: const Text("Waring !"),
                                description: const Text(
                                    "Your work shift is not finished or not completed yet!"))
                            .show(context);
                        return;
                        }
                      }
                      showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return DialogChangeWorklog(
                            shift: shift!,
                          );
                        },
                      );
                    },
                    child: const Padding(
                      padding: EdgeInsets.only(left: 15, right: 30, top: 20),
                      child: Icon(Icons.headphones, size: 40),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(
              height: 10,
            ),
            Obx(() {
              if (shiftController.currentShift.value != null &&
                      shift?.workLog != null ||
                  Get.arguments != null && shift?.workLog != null) {
                return Column(
                  children: [
                    cardActivity(
                        AssetHelper.icoCheckIn,
                        "Check In",
                        "November 01, 2023",
                        "${getStringByDateTime(shift?.workLog?.checkInTime)} am",
                        "On Time"),
                    const SizedBox(
                      height: 10,
                    ),
                    DateFormat("yyyy").format(shift!.workLog!.checkOutTime) !=
                            "9999"
                        ? cardActivity(
                            AssetHelper.icoCheckIn,
                            "Check Out",
                            "November 01, 2023",
                            "${getStringByDateTime(shift?.workLog?.checkOutTime)} am",
                            "On Time")
                        : const SizedBox(),
                  ],
                );
              } else {
                return TextSophia(
                        size: 24,
                        textData: "You haven't activity in this shift !",
                        color: ColorPalette.dartGrey,
                        weight: FontWeight.w100)
                    .textSophiaMedium;
              }
            })
          ],
        ),
      ),
    );
  }

  String getStringByDateTime(DateTime? date) {
    return DateFormat("HH:mm:ss").format(date!);
  }

  Widget cardActivity(
      String asset, String title, String date, String time, String des) {
    return Container(
      decoration: BoxDecoration(
          color: ColorPalette.black10, borderRadius: BorderRadius.circular(20)),
      padding: const EdgeInsets.only(left: 20, top: 22, bottom: 22, right: 20),
      margin: const EdgeInsets.only(bottom: 10, left: 14, right: 14),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          ClipRRect(
              child: Row(
            children: [
              Image.asset(
                asset,
                height: 40,
                width: 40,
                fit: BoxFit.cover,
              ),
              const SizedBox(
                width: 16,
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  TextSophia(
                          size: 26,
                          textData: title,
                          color: ColorPalette.dartGrey,
                          weight: FontWeight.w100)
                      .textSophiaBold,
                  TextSophia(
                          size: 20,
                          textData: date,
                          color: ColorPalette.black40,
                          weight: FontWeight.w100)
                      .textSophiaRegular,
                ],
              ),
            ],
          )),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              TextSophia(
                      size: 26,
                      textData: time,
                      color: ColorPalette.dartGrey,
                      weight: FontWeight.w100)
                  .textSophiaBold,
              TextSophia(
                      size: 20,
                      textData: des,
                      color: ColorPalette.black40,
                      weight: FontWeight.w100)
                  .textSophiaRegular,
            ],
          )
        ],
      ),
    );
  }
}
