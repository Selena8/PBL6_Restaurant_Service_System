import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:restaurant_app/components/TextWidget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/components/button_widget.dart';
import 'package:restaurant_app/components/line_widget.dart';

class WorklogScreen extends StatefulWidget {
  const WorklogScreen({super.key});

  @override
  State<WorklogScreen> createState() => _WorklogScreenState();
}

class _WorklogScreenState extends State<WorklogScreen> {
  void deleteRequestWorklogItem(int index) {
    setState(() {
      shiftController.requestWorklogList.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              flex: 1,
              child: Stack(
                children: [
                  Align(
                    alignment: Alignment.center,
                    child: TextSophia(
                            size: 26,
                            textData: "Request Change Worklog",
                            color: ColorPalette.dartGrey,
                            weight: FontWeight.w700)
                        .textSophiaRegular,
                  ),
                  InkWell(
                    onTap: () {
                      Navigator.pop(context);
                    },
                    child: Container(
                      height: 40,
                      width: 40,
                      margin: const EdgeInsets.symmetric(
                          vertical: 12, horizontal: 20),
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
                ],
              ),
            ),
            Expanded(
              flex: 10,
              child: Obx(() {
                if (shiftController.requestWorklogList.isNotEmpty) {
                  return requestWorklog();
                } else {
                  return const SizedBox();
                }
              }),
            ),
          ],
        ),
      ),
    );
  }

  Widget requestWorklog() {
    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      child: Column(
        children: List.generate(
          shiftController.requestWorklogList.length,
          (i) => requestWorklogItem(
              i, shiftController.requestWorklogList[i].status),
        ),
      ),
    );
  }

  Widget requestWorklogItem(int i, int status) {
    var startTime = DateFormat("dd-MM-yyyy HH:mm:ss")
        .format(shiftController.requestWorklogList[i].startTime);
    var endTime = DateFormat("dd-MM-yyyy HH:mm:ss")
        .format(shiftController.requestWorklogList[i].endTime);

    return InkWell(
      onTap: () {
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(Dimensions.radius20),
                side: const BorderSide(
                    color: ColorPalette.primaryOrange, width: 2.0),
              ),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  AppText(
                    text: "Description !",
                    lines: 2,
                    textAlign: TextAlign.center,
                    color: ColorPalette.black,
                    size: Dimensions.font25,
                    height: 1.2,
                    fontWeight: FontWeight.w800,
                  ),
                  SizedBox(height: Dimensions.height5),
                  LineWidget(
                    width: Dimensions.width300,
                    strokeWidth: 1,
                    color: ColorPalette.grey,
                  ),
                  SizedBox(height: Dimensions.height20),
                  AppText(
                    text: shiftController.requestWorklogList[i].description,
                    lines: 4,
                    textAlign: TextAlign.center,
                    color: ColorPalette.black,
                    size: 20,
                    height: 1.2,
                    fontWeight: FontWeight.w300,
                  ),
                  SizedBox(height: Dimensions.height20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      ButtonWidget(
                        title: "Close",
                        size: Dimensions.font14,
                        borderRadius: Dimensions.radius40,
                        width: Dimensions.height100,
                        borderColor: ColorPalette.primaryOrange,
                        height: Dimensions.height40,
                        color: ColorPalette.black,
                        background: ColorPalette.white,
                        blur: 1,
                        onTap: () {
                          Navigator.pop(context);
                        },
                      ),
                    ],
                  ),
                ],
              ),
            );
          },
        );
      },
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
        padding: const EdgeInsets.only(top: 10),
        decoration: BoxDecoration(
          color: status == 0
              ? ColorPalette.yellow.withOpacity(0.4)
              : status == 1
                  ? ColorPalette.green.withOpacity(0.4)
                  : ColorPalette.orangeRed,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          children: [
            Stack(
              children: [
                Align(
                  alignment: Alignment.topRight,
                  child: InkWell(
                    onTap: () {
                      showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return AlertDialog(
                            shape: RoundedRectangleBorder(
                              borderRadius:
                                  BorderRadius.circular(Dimensions.radius20),
                              side: const BorderSide(
                                  color: ColorPalette.primaryOrange,
                                  width: 2.0),
                            ),
                            content: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                AppText(
                                  text: "Are you sure delete !",
                                  lines: 2,
                                  textAlign: TextAlign.center,
                                  color: ColorPalette.black,
                                  size: Dimensions.font25,
                                  height: 1.2,
                                  fontWeight: FontWeight.w800,
                                ),
                                SizedBox(height: Dimensions.height5),
                                LineWidget(
                                  width: Dimensions.width300,
                                  strokeWidth: 1,
                                  color: ColorPalette.grey,
                                ),
                                SizedBox(height: Dimensions.height20),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceAround,
                                  children: [
                                    ButtonWidget(
                                      title: "No",
                                      size: Dimensions.font14,
                                      borderRadius: Dimensions.radius40,
                                      width: Dimensions.height100,
                                      borderColor: ColorPalette.primaryOrange,
                                      height: Dimensions.height40,
                                      color: ColorPalette.black,
                                      background: ColorPalette.white,
                                      blur: 1,
                                      onTap: () {
                                        Navigator.pop(context);
                                      },
                                    ),
                                    ButtonWidget(
                                      title: "Yes",
                                      size: Dimensions.font14,
                                      borderRadius: Dimensions.radius40,
                                      width: Dimensions.height100,
                                      borderColor: ColorPalette.primaryOrange,
                                      height: Dimensions.height40,
                                      color: ColorPalette.white,
                                      background: ColorPalette.primaryOrange,
                                      blur: 1,
                                      onTap: () async {
                                        var check = await shiftController
                                            .deleteRequestChangeWorklog(
                                                shiftController
                                                    .requestWorklogList[i].id);
                                        if (check) {
                                          print("okkkkeekekekekeke");
                                          deleteRequestWorklogItem(i);
                                          Navigator.pop(context);
                                          MotionToast.success(
                                            title: const Text("Success !"),
                                            description: const Text(
                                                "Delete successfully !"),
                                          ).show(context);
                                        } else {
                                          print("falseeeeeeee");
                                          Navigator.pop(context);
                                          MotionToast.error(
                                                  title: Text("Error !"),
                                                  description: const Text(
                                                      "Delete Fail !"))
                                              .show(context);
                                        }
                                      },
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          );
                        },
                      );
                    },
                    child: Container(
                        height: 40,
                        width: 40,
                        margin: const EdgeInsets.symmetric(
                            vertical: 12, horizontal: 20),
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
                        child: const Icon(
                          Icons.delete_forever,
                          size: 40,
                          color: Colors.red,
                        )),
                  ),
                ),
                Align(
                  alignment: Alignment.center,
                  child: Container(
                    margin: const EdgeInsets.symmetric(vertical: 16),
                    child: TextSophia(
                            size: 26,
                            textData: status == 0
                                ? "Inprogress"
                                : status == 1
                                    ? "Done"
                                    : "Refuse",
                            color: ColorPalette.dartGrey,
                            weight: FontWeight.w100)
                        .textSophiaRegular,
                  ),
                ),
              ],
            ),
            cardSchedule(AssetHelper.icoCheckIn, "Start Time", startTime),
            cardSchedule(AssetHelper.icoCheckIn, "End Time", endTime),
          ],
        ),
      ),
    );
  }

  Widget cardSchedule(String assetImage, String title, String time) {
    return Container(
      decoration: BoxDecoration(
          color: ColorPalette.white, borderRadius: BorderRadius.circular(20)),
      padding: const EdgeInsets.only(left: 14, top: 22, bottom: 22),
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(children: [
            Image.asset(
              assetImage,
              height: 40,
              width: 40,
              fit: BoxFit.cover,
            ),
            const SizedBox(
              width: 15,
            ),
            TextSophia(
                    size: 26,
                    textData: title,
                    color: ColorPalette.dartGrey,
                    weight: FontWeight.w100)
                .textSophiaRegular,
          ]),
          Align(
            alignment: Alignment.center,
            child: TextSophia(
              size: 32,
              textData: time,
              color: ColorPalette.dartGrey,
              weight: FontWeight.w100,
            ).textSophiaBold,
          ),
        ],
      ),
    );
  }
}
