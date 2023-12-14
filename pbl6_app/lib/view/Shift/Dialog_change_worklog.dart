import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:intl/intl.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/components/button_widget.dart';
import 'package:restaurant_app/components/line_widget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/model/Shift.dart';

class DialogChangeWorklog extends StatefulWidget {
  final Shift shift;
  const DialogChangeWorklog({super.key, required this.shift});

  @override
  State<DialogChangeWorklog> createState() => _DialogChangeWorklogState();
}

class _DialogChangeWorklogState extends State<DialogChangeWorklog> {
  late DateTime selectedStartTime;
  late DateTime selectedEndTime;

  TextEditingController descriptionController = TextEditingController();

  @override
  void initState() {
    selectedStartTime = widget.shift.startTime;
    selectedEndTime = widget.shift.endTime;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(Dimensions.radius20),
            side:
                const BorderSide(color: ColorPalette.primaryOrange, width: 2.0),
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              AppText(
                text: "Request Change Worklog !",
                color: ColorPalette.black,
                size: Dimensions.font25,
                height: 1.2,
                lines: 2,
                textAlign: TextAlign.center,
                fontWeight: FontWeight.w800,
              ),
              SizedBox(height: Dimensions.height5),
              LineWidget(
                width: Dimensions.width300,
                strokeWidth: 1,
                color: ColorPalette.grey,
              ),
              SizedBox(height: Dimensions.height10),
              buildTimePicker(
                label: "Start Time",
                selectedTime: selectedStartTime,
                onTimeSelected: (time) {
                  setState(() {
                    selectedStartTime = time;
                  });
                },
              ),
              SizedBox(height: Dimensions.height10),
              buildTimePicker(
                label: "End Time",
                selectedTime: selectedEndTime,
                onTimeSelected: (time) {
                  setState(() {
                    selectedEndTime = time;
                  });
                },
              ),
              SizedBox(height: Dimensions.height10),
              TextField(
                controller: descriptionController,
                decoration: const InputDecoration(
                  hintText: "Enter Description",
                ),
              ),
              SizedBox(height: Dimensions.height20),
              ButtonWidget(
                title: "Submit",
                size: Dimensions.font14,
                borderRadius: Dimensions.radius40,
                width: Dimensions.height160,
                borderColor: ColorPalette.primaryOrange,
                height: Dimensions.height40,
                color: ColorPalette.black,
                background: ColorPalette.white,
                blur: 1,
                onTap: () {
                  if (selectedStartTime == null) {
                    MotionToast.warning(
                            title: const Text("Waring !"),
                            description:
                                const Text("Please select Start Time !"))
                        .show(context);
                    return;
                  }
                  if (selectedEndTime == null) {
                    MotionToast.warning(
                            title: const Text("Waring !"),
                            description: const Text("Please select End Time !"))
                        .show(context);
                    return;
                  }
                  shiftController.requestChangeWorklog(
                      context,
                      selectedStartTime!,
                      selectedEndTime!,
                      descriptionController.text.toString(),
                      widget.shift.id);
                },
              ),
            ],
          ),
        ),
        ValueListenableBuilder<bool>(
          valueListenable: shiftController.showSpinner,
          builder: (context, showSpinner, child) {
            return showSpinner
                ? SpinKitFadingCircle(
                    itemBuilder: (BuildContext context, int index) {
                      return DecoratedBox(
                        decoration: BoxDecoration(
                          color: index.isEven
                              ? Colors.red
                              : const Color.fromARGB(255, 76, 175, 165),
                        ),
                      );
                    },
                  )
                : const SizedBox();
          },
        ),
      ],
    );
  }

  Widget buildTimePicker({
    required String label,
    required DateTime? selectedTime,
    required Function(DateTime) onTimeSelected,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label),
        ElevatedButton(
          onPressed: () async {
            TimeOfDay? pickedTime = await showTimePicker(
              context: context,
              initialTime: TimeOfDay.fromDateTime(selectedTime!),
            );

            if (pickedTime != null) {
              DateTime now = DateTime.now();

              DateTime selectedDateTime = DateTime(
                widget.shift.startTime.year,
                widget.shift.startTime.month,
                widget.shift.startTime.day,
                pickedTime.hour,
                pickedTime.minute,
                now.second,
              );

              onTimeSelected(selectedDateTime);
            }
          },
          child: Text(
            selectedTime != null
                ? DateFormat("HH:mm").format(selectedTime)
                : "Select Time",
          ),
        ),
      ],
    );
  }
}
