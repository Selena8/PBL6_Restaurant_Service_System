import 'package:flutter/material.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:restaurant_app/components/Rounded_TextField.dart';
import 'package:restaurant_app/components/app_icon.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/components/button_widget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/controller/request_controller.dart';
import 'package:get/get.dart';

class RequestUserView extends StatefulWidget {
  const RequestUserView({Key? key}) : super(key: key);

  @override
  State<RequestUserView> createState() => _RequestUserViewState();
}

class _RequestUserViewState extends State<RequestUserView> {
  final List<String> requests = [
    'Select request',
    'Serving',
    'Instrument',
    'Spice',
    'Payment',
    'Other'
  ];
  final _requestController = TextEditingController();
  // final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  String selectedRequest = 'Select request';
  int _getRequestType(String selectedRequest) {
    switch (selectedRequest) {
      case 'Serving':
        return 0;
      case 'Instrument':
        return 1;
      case 'Spice':
        return 2;
      case 'Payment':
        return 3;
      case 'Other':
        return 4;
      default:
        return -1; // or any default value if 'Select request' is unexpected
    }
  }

  void showToast(bool check) {
    if (check) {
      // ignore: use_build_context_synchronously
      MotionToast.success(
        title: const Text("Success !"),
        description: const Text("Request successfully!"),
      ).show(context);
    } else {
      if (selectedRequest != 'Select request') {
        MotionToast.error(
                title: const Text("Error !"),
                description:
                    const Text("Request fail!"))
            .show(context);
      } else {
        // ignore: use_build_context_synchronously
        MotionToast.error(
                title: const Text("Error !"),
                description:
                    const Text("You have not selected a request type!"))
            .show(context);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        backgroundColor: Colors.transparent,
        body: Container(
          clipBehavior: Clip.hardEdge,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(10),
          ),
          child: SafeArea(
            child: Stack(
              children: [
                Container(
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(
                          left: 3,
                          top: 10,
                        ),
                        child: Container(
                          width: Dimensions.width390,
                          height: Dimensions.height200,
                          decoration: BoxDecoration(
                            borderRadius:
                                BorderRadius.circular(Dimensions.radius20),
                            color: ColorPalette.lemonYellow,
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.3),
                                blurRadius: 5,
                                offset: Offset(0, 2),
                              ),
                            ],
                            image: DecorationImage(
                              fit: BoxFit.scaleDown,
                              image: AssetImage(AssetHelper.imageFoodHaven),
                            ),
                          ),
                        ),
                      ),
                      SizedBox(height: Dimensions.height10),
                      Padding(
                        padding: EdgeInsets.fromLTRB(
                            Dimensions.width25, 0, Dimensions.width10, 0),
                        child: Column(
                          children: [
                            SizedBox(
                              height: Dimensions.height10,
                            ),
                            _buildTitle('Request'),
                            SizedBox(height: Dimensions.height10),
                            Align(
                              alignment: Alignment.centerLeft,
                              child: AppText(
                                text: "Type",
                                size: Dimensions.font16,
                                color: ColorPalette.black,
                              ),
                            ),
                            SizedBox(
                              height: Dimensions.height5,
                            ),
                            DropdownButtonFormField<String>(
                              decoration: InputDecoration(
                                enabledBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Colors.grey, width: 0.7),
                                  borderRadius: BorderRadius.circular(
                                      Dimensions.radius20),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: ColorPalette.primaryOrange,
                                      width: 1),
                                  borderRadius: BorderRadius.circular(
                                      Dimensions.radius20),
                                ),
                                border: OutlineInputBorder(
                                  borderSide:
                                      BorderSide(color: Colors.white, width: 2),
                                  borderRadius: BorderRadius.circular(
                                      Dimensions.radius20),
                                ),
                                filled: true,
                                fillColor: Colors.white,
                                hintStyle: TextStyle(color: Colors.grey),
                              ),
                              dropdownColor: Colors.white,
                              value: selectedRequest,
                              onChanged: (String? newValue) {
                                setState(() {
                                  selectedRequest = newValue!;
                                });
                              },
                              items: requests.map((String request) {
                                return DropdownMenuItem<String>(
                                  value: request,
                                  child: Text(request),
                                );
                              }).toList(),
                            ),
                            SizedBox(
                              height: Dimensions.height10,
                            ),
                            Align(
                              alignment: Alignment.centerLeft,
                              child: AppText(
                                text: "Content",
                                size: Dimensions.font16,
                                color: ColorPalette.black,
                              ),
                            ),
                            SizedBox(
                              height: Dimensions.height5,
                            ),
                            Container(
                              child: RoundedTextField(
                                placeholder: 'Other Requests',
                                controller: _requestController,
                                isMultiline: true,
                                height: Dimensions.height150,
                              ),
                            ),
                            SizedBox(
                              height: Dimensions.height20,
                            ),
                            ButtonWidget(
                              title: "SUBMIT",
                              size: Dimensions.font20,
                              borderRadius: Dimensions.radius40,
                              width: Dimensions.width250,
                              height: Dimensions.height60,
                              color: ColorPalette.white,
                              background: ColorPalette.primaryOrange,
                              blur: 1,
                              onTap: () async{
                                 if (selectedRequest != 'Select request') {
                                Get.lazyPut(() => DetailRequestController());
                                bool result = await detailRequestController
                                    .createNewRequest(
                                  _getRequestType(selectedRequest),
                                  _requestController.text,
                                );
                                showToast(result);
                                } else{
                                showToast(false);}
                              },
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                Positioned(
                  top: Dimensions.height195,
                  left: Dimensions.width194point5,
                  child: AppIcon(
                    icon: Icons.check,
                    backgroundColor: ColorPalette.green,
                    iconColor: ColorPalette.white,
                    iconSize: 24,
                    width: 37,
                    height: 37,
                    borderWidth: 4,
                    shiftRight: 2,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTitle(String title) {
    return Center(
      child: Padding(
        padding:
            EdgeInsets.fromLTRB(Dimensions.width25, 0, Dimensions.width25, 0),
        child: Container(
          width: Dimensions.width200,
          height: Dimensions.height40,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20.0),
            boxShadow: [
              BoxShadow(
                color: Colors.grey,
                offset: Offset(0, 2),
                blurRadius: 1.0,
              ),
            ],
          ),
          child: Center(
            child: Text(
              title,
              style: TextStyle(
                color: Colors.black,
                fontSize: Dimensions.font25,
                height: 1.2,
                fontWeight: FontWeight.w800,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
