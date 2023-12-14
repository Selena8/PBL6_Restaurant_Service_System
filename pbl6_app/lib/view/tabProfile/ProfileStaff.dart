import 'dart:convert';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:restaurant_app/components/Rounded_TextField.dart';
import 'package:restaurant_app/components/button_widget.dart';
import 'package:restaurant_app/components/image_widgets.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/model/model_account.dart';
import 'package:restaurant_app/route/app_route.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProfileStaff extends StatefulWidget {
  const ProfileStaff({super.key});

  @override
  State<ProfileStaff> createState() => _ProfileStaffState();
}

class _ProfileStaffState extends State<ProfileStaff> {
  late SharedPreferences prefs;
  late Account account;
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _fullnameController = TextEditingController();
  final TextEditingController _addressController = TextEditingController();
  final TextEditingController _phoneNumberController = TextEditingController();
  final TextEditingController _dayOfBirthController = TextEditingController();
  @override
  void initState() {
    super.initState();
    initSharedPreferences();
  }

  Future<Account> initSharedPreferences() async {
    account = homeController.currentAccount.value!;
    _fullnameController.text = account.displayName;
    _emailController.text = account.email;
    _addressController.text = account.address!;
    _phoneNumberController.text = account.phoneNumber!;
    print(account.dateOfBirth.toString());
    _dayOfBirthController.text = account.dateOfBirth!;
    return account;
  }

  void navigateToProfileStaff(BuildContext context) {
    Navigator.pushNamed(context, AppRoute.editprofilestaff);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: ColorPalette.white,
      body: Stack(
        children: [
          ImageWidget(
              imagePath: AssetHelper.imageCircleOrangeEmpty,
              alignment: const AlignmentDirectional(-1.50, -1.15),
              width: Dimensions.width150,
              height: Dimensions.height150),
          ImageWidget(
              imagePath: AssetHelper.imageCircleAlmond,
              alignment: const AlignmentDirectional(-0.90, -1.40),
              width: Dimensions.width200,
              height: Dimensions.height200),
          ImageWidget(
              imagePath: AssetHelper.imageCircleOrange,
              alignment: const AlignmentDirectional(1.80, -1.40),
              width: Dimensions.width200,
              height: Dimensions.height200),
          Align(
            alignment: Alignment.topCenter,
            child: Container(
              width: 110,
              height: 110,
              margin: const EdgeInsets.only(top: 40),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: Colors.white,
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.3),
                    offset: const Offset(0, 4),
                    blurRadius: 8,
                    spreadRadius: 0,
                  ),
                ],
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(Dimensions.height100),
                child: CachedNetworkImage(
                  errorWidget: (context, url, error) => const Icon(Icons.error),
                  placeholder: (context, url) =>
                      Image.asset(AssetHelper.imagePlaceHolder),
                  imageUrl: account.avatar ?? "",
                  fit: BoxFit.cover,
                ),
              ),
            ),
          ),
          Positioned(
            top: 60,
            left: 20,
            child: InkWell(
              onTap: () {
                // Navigator.popUntil(
                //     context, ModalRoute.withName(AppRoute.homestaff));
                Navigator.pushNamedAndRemoveUntil(
                    context, AppRoute.homestaff, (route) => false);
              },
              child: Container(
                height: 38,
                width: 38,
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
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            top: Dimensions.height160,
            child: Container(
              padding: EdgeInsets.only(
                  left: Dimensions.width25, right: Dimensions.width25),
              child: Column(
                children: [
                  Form(
                    child: Column(
                      children: [
                        AppText(
                            text: account.displayName,
                            color: ColorPalette.black,
                            size: Dimensions.font20,
                            height: 1.2,
                            fontWeight: FontWeight.w800),
                        SizedBox(
                          height: Dimensions.height10,
                        ),
                        Align(
                          alignment: Alignment.centerLeft,
                          child: AppText(
                            text: "Full name",
                            size: Dimensions.font16,
                          ),
                        ),
                        SizedBox(
                          height: Dimensions.height10,
                        ),
                        RoundedTextField(
                          controller: _fullnameController,
                          isFill: false,
                        ),
                        SizedBox(
                          height: Dimensions.height10,
                        ),
                        Align(
                          alignment: Alignment.centerLeft,
                          child: AppText(
                            text: "E-mail",
                            size: Dimensions.font16,
                          ),
                        ),
                        SizedBox(
                          height: Dimensions.height10,
                        ),
                        RoundedTextField(
                          controller: _emailController,
                          isFill: false,
                        ),
                        SizedBox(
                          height: Dimensions.height10,
                        ),
                        Align(
                          alignment: Alignment.centerLeft,
                          child: AppText(
                            text: "Address",
                            size: Dimensions.font16,
                          ),
                        ),
                        SizedBox(
                          height: Dimensions.height10,
                        ),
                        RoundedTextField(
                          controller: _addressController,
                          isFill: false,
                        ),
                        SizedBox(
                          height: Dimensions.height10,
                        ),
                        Align(
                          alignment: Alignment.centerLeft,
                          child: AppText(
                            text: "Phone Number",
                            size: Dimensions.font16,
                          ),
                        ),
                        SizedBox(
                          height: Dimensions.height10,
                        ),
                        RoundedTextField(
                          controller: _phoneNumberController,
                          isFill: false,
                        ),
                        SizedBox(
                          height: Dimensions.height10,
                        ),
                        Align(
                          alignment: Alignment.centerLeft,
                          child: AppText(
                            text: "Day of birth",
                            size: Dimensions.font16,
                          ),
                        ),
                        SizedBox(
                          height: Dimensions.height10,
                        ),
                        RoundedTextField(
                          controller: _dayOfBirthController,
                          isFill: false,
                        ),
                      ],
                    ),
                  ),
                  SizedBox(
                    height: Dimensions.height20,
                  ),
                  ButtonWidget(
                    title: "EDIT",
                    size: Dimensions.font20,
                    borderRadius: Dimensions.radius40,
                    width: Dimensions.width250,
                    height: Dimensions.height60,
                    color: ColorPalette.white,
                    background: ColorPalette.primaryOrange,
                    blur: 1,
                    onTap: () {
                      navigateToProfileStaff(context);
                    },
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
