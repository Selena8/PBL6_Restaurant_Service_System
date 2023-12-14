import 'dart:convert';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:restaurant_app/components/TextWidget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/model/model_account.dart';
import 'package:restaurant_app/route/app_route.dart';
import 'package:restaurant_app/view/shift/ShiftWorkLog.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:swipeable_button_view/swipeable_button_view.dart';
import 'package:page_transition/page_transition.dart';

class CheckIn extends StatefulWidget {
  const CheckIn({super.key});

  @override
  State<CheckIn> createState() => _CheckInState();
}

class _CheckInState extends State<CheckIn> {
  DateTime now = DateTime.now();
  late DateTime lastDayOfMonth = DateTime(now.year, now.month + 1, 0);
  late DateTime dateTimeNow = DateTime(now.year, now.month, 0);
  Color getColorForDate(int day) {
    final currentDate = lastDayOfMonth.add(Duration(days: day));
    return currentDate.day == now.day ? ColorPalette.Amber : ColorPalette.white;
  }

  late SharedPreferences prefs;
  final ScrollController _scrollController = ScrollController();
  DateTime selectedDay = DateTime.now();
  ValueNotifier<bool> shiftListNotifier = ValueNotifier<bool>(false);

  @override
  void initState() {
    super.initState();
    selectedDay = DateTime.now();
    shiftController.getScheduleInday(null);
    scrollWidget(20);
  }

  void scrollWidget(int position) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _scrollController.animateTo(
        position.toDouble() * 70 + 60 + 10 * (position - 20),
        duration: const Duration(milliseconds: 500),
        curve: Curves.easeInOut,
      );
    });
  }

  bool isFinished = false;

  @override
  Widget build(BuildContext context) {
    DateTime startDateTime = now.subtract(const Duration(days: 20));
    DateTime endDateTime = now.add(const Duration(days: 20));

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: ClipRRect(
        borderRadius: BorderRadius.circular(30),
        child: Container(
          color: ColorPalette.white,
          padding: const EdgeInsets.only(
            top: 20,
          ),
          child: SafeArea(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Stack(
                    children: [
                      Align(
                        alignment: Alignment.topLeft,
                        child: Row(
                          children: [
                            Container(
                                height: 60,
                                width: 60,
                                child: ClipOval(
                                    child: ClipRRect(
                                        borderRadius:
                                            BorderRadius.circular(100),
                                        child: CachedNetworkImage(
                                          errorWidget: (context, url, error) =>
                                              const Icon(Icons.error),
                                          placeholder: (context, url) =>
                                              Image.asset(
                                                  AssetHelper.imagePlaceHolder),
                                          imageUrl:
                                              homeController.currentAccount !=
                                                      null
                                                  ? homeController
                                                      .currentAccount!
                                                      .value!
                                                      .avatar!
                                                  : "",
                                          fit: BoxFit.cover,
                                        )))),
                            const SizedBox(
                              width: 20,
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                TextSophia(
                                        size: 30,
                                        textData:
                                            homeController.currentAccount !=
                                                    null
                                                ? homeController.currentAccount
                                                    .value!.displayName
                                                : "",
                                        color: ColorPalette.dartGrey,
                                        weight: FontWeight.w600)
                                    .textSophiaBold,
                                TextSophia(
                                        size: 20,
                                        textData:
                                            homeController.currentAccount !=
                                                    null
                                                ? homeController.currentAccount
                                                    .value!.dateOfBirth!
                                                : "",
                                        color: ColorPalette.black40,
                                        weight: FontWeight.w100)
                                    .textSophiaMedium,
                              ],
                            ),
                          ],
                        ),
                      ),
                      Align(
                        alignment: Alignment.topRight,
                        child: InkWell(
                          onTap: () {
                            Navigator.pushNamed(context, AppRoute.homestaff);
                          },
                          child: const Icon(Icons.home_outlined,
                              color: ColorPalette.grey, size: 34),
                        ),
                      ),
                      Align(
                        alignment: Alignment.bottomRight,
                        child: Padding(
                          padding: const EdgeInsets.only(right: 40),
                          child: InkWell(
                            onTap: () {
                              shiftController.getAllRequestChangeWorklog();
                              Navigator.pushNamed(
                                  context, AppRoute.worklogscreen);
                            },
                            child: const Icon(
                              Icons.live_help,
                              color: ColorPalette.aquaBlue,
                              size: 34,
                            ),
                          ),
                        ),
                      )
                    ],
                  ),
                ),
                const SizedBox(
                  height: 30,
                ),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  physics: const BouncingScrollPhysics(),
                  controller: _scrollController,
                  child: Row(
                    children: List.generate(
                      endDateTime.difference(startDateTime).inDays + 1,
                      (index) {
                        final currentDate =
                            startDateTime.add(Duration(days: index));
                        return InkWell(
                          onTap: () {
                            setState(() {
                              selectedDay = currentDate;
                              shiftController.getScheduleInday(currentDate);
                              shiftListNotifier.value =
                                  !shiftListNotifier.value;
                              print(shiftListNotifier.value);
                              scrollWidget(index);
                            });
                          },
                          child: Container(
                            height: 90,
                            width: 70,
                            margin: (index != 0
                                ? const EdgeInsets.symmetric(horizontal: 5)
                                : const EdgeInsets.only(left: 15, right: 5)),
                            decoration: BoxDecoration(
                              borderRadius:
                                  const BorderRadius.all(Radius.circular(10.0)),
                              color: selectedDay.day == currentDate.day
                                  ? ColorPalette.dartBlue
                                  : ColorPalette.black10,
                              border: Border.all(
                                color: currentDate == now
                                    ? ColorPalette.orangeRed
                                    : ColorPalette.white,
                                width: 2.0,
                              ),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 12, vertical: 16),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text(
                                    "${currentDate.day}",
                                    style: TextStyle(
                                      fontSize: 26,
                                      color: (selectedDay.day == currentDate.day
                                          ? ColorPalette.white
                                          : ColorPalette.black),
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                  Text(
                                    DateFormat('E').format(currentDate),
                                    style: TextStyle(
                                      color: (selectedDay.day == currentDate.day
                                          ? ColorPalette.white
                                          : ColorPalette.black),
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                Expanded(
                  flex: 8,
                  child: SingleChildScrollView(
                    physics: const BouncingScrollPhysics(),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(
                          height: 20,
                        ),
                        Padding(
                          padding: const EdgeInsets.only(left: 15),
                          child: TextSophia(
                                  size: 28,
                                  textData: "Today Attendance",
                                  color: ColorPalette.dartGrey,
                                  weight: FontWeight.w100)
                              .textSophiaMedium,
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        ValueListenableBuilder<bool>(
                          valueListenable: shiftListNotifier,
                          builder: (context, change, child) {
                            return shiftInDateNow();
                          },
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                      ],
                    ),
                  ),
                ),
                Container(
                  color: ColorPalette.transparent,
                  padding: const EdgeInsets.all(20),
                  child: SwipeableButtonView(
                    buttonText: shiftController.checkInShift() < 0
                        ? "Not during roll call !"
                        : !shiftController.isCheckIn.value ||
                                !shiftController.isCheckOut.value
                            ? !shiftController.isCheckIn.value
                                ? "Swipe to Check In"
                                : !shiftController.isCheckOut.value
                                    ? "Swipe to Check Out"
                                    : "The current shift attendance has been recorded."
                            : "You have completed your shift!",
                    buttonWidget: const Icon(
                      Icons.arrow_forward_ios_rounded,
                      color: ColorPalette.pink,
                    ),
                    activeColor: ColorPalette.pink,
                    isFinished: isFinished,
                    isActive: shiftController.isCheckIn.value &&
                                shiftController.isCheckOut.value ||
                            shiftController.checkInShift() < 0
                        ? false
                        : true,
                    disableColor: ColorPalette.dartGrey,
                    indicatorColor:
                        const AlwaysStoppedAnimation<Color>(Colors.white),
                    onWaitingProcess: () async {
                      await Future.delayed(const Duration(seconds: 2));
                      setState(() {
                        isFinished = true;
                      });
                    },
                    onFinish: () async {
                      shiftController.getShiftCurrent();
                      if (!shiftController.isCheckIn.value) {
                        print("Check In");
                        shiftController.checkIn(context);
                      } else {
                        if (!shiftController.isCheckOut.value) {
                          print("Check Out");
                          shiftController.checkOut(context);
                        }
                      }
                      await Navigator.push(
                        context,
                        PageTransition(
                          type: PageTransitionType.fade,
                          child: const ShiftWorkLog(),
                        ),
                      );
                      setState(() {
                        isFinished = false;
                      });
                    },
                  ),
                ),
              ],
            ),
          ),
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

  Widget shiftInDateNow() {
    List<Widget> textWidgets = [];
    for (int i = 0; i < shiftController.shiftListInDate.length; i++) {
      var startTime = shiftController.shiftListInDate[i].startTime
          .add(const Duration(seconds: 10));
      var endTime = shiftController.shiftListInDate[i].endTime
          .subtract(const Duration(seconds: 10));
      textWidgets.add(InkWell(
        onTap: () {
          Get.to(
            () => const ShiftWorkLog(),
            arguments: shiftController.shiftListInDate[i],
          );
        },
        child: Container(
          margin: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
          padding: const EdgeInsets.only(top: 10),
          decoration: BoxDecoration(
            color: ColorPalette.ashGray.withOpacity(0.4),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: !shiftController.checkInCurrentShift(startTime, endTime)
                  ? ColorPalette.ashGray.withOpacity(0)
                  : ColorPalette.aquaBlue,
              width: 4.0,
            ),
          ),
          child: Column(
            children: [
              TextSophia(
                      size: 26,
                      textData: "Shift ${i + 1}",
                      color: ColorPalette.dartGrey,
                      weight: FontWeight.w100)
                  .textSophiaRegular,
              ValueListenableBuilder<bool>(
                valueListenable: shiftListNotifier,
                builder: (context, change, child) {
                  return Column(
                    children: [
                      cardSchedule(AssetHelper.icoCheckIn, "Start Time",
                          shiftController.startTimeList[i]),
                      cardSchedule(AssetHelper.icoCheckIn, "End Time",
                          shiftController.endTimeList[i])
                    ],
                  );
                },
              ),
            ],
          ),
        ),
      ));
    }
    return Column(
      children: textWidgets,
    );
  }
}
