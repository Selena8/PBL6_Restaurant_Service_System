import 'dart:convert';
import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:restaurant_app/components/Rounded_TextField.dart';
import 'package:restaurant_app/components/app_icon.dart';
import 'package:restaurant_app/components/button_widget.dart';
import 'package:restaurant_app/components/image_widgets.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/model/model_account.dart';
import 'package:restaurant_app/route/app_route.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:motion_toast/motion_toast.dart';

class EditProfileStaff extends StatefulWidget {
  const EditProfileStaff({super.key});

  @override
  State<EditProfileStaff> createState() => _EditProfileStaffState();
}

class _EditProfileStaffState extends State<EditProfileStaff> {
  late SharedPreferences prefs;
  late Account account;
  var token = "";
  final TextEditingController _displayNameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _fullnameController = TextEditingController();
  final TextEditingController _addressController = TextEditingController();
  final TextEditingController _phoneNumberController = TextEditingController();
  TextEditingController myController = TextEditingController();
  DateTime? selectedDate;

  @override
  void initState() {
    account = homeController.currentAccount.value!;
    print(account.address);
    createText(account);
    super.initState();
  }

  void navigateToProfileStaff(BuildContext context) {
    Navigator.of(context).pushReplacementNamed(AppRoute.profilestaff);
  }

  void createText(Account account) {
    print(account.phoneNumber!);
    _displayNameController.text = account.displayName;
    _fullnameController.text = "${account.firstName!} ${account.lastName!}";
    _emailController.text = account.email;
    _addressController.text = account.address!;
    _phoneNumberController.text = account.phoneNumber!;
  }

  File? image;
  final _picker = ImagePicker();
  final ValueNotifier<bool> _showSpinner = ValueNotifier<bool>(false);

  Future getImage() async {
    final pickerFile =
        await _picker.pickImage(source: ImageSource.gallery, imageQuality: 80);

    if (pickerFile != null) {
      setState(() {
        image = File(pickerFile.path);
      });
    } else {
      print("No Image Selected");
    }
  }

  Future<void> uploadImage() async {
    var check = false;
    prefs = await SharedPreferences.getInstance();
    var firstName = "";
    for (int i = 0; i < _fullnameController.text.split(" ").length - 1; i++) {
      firstName += _fullnameController.text.split(" ")[i];
    }

    var date =
        myController.text == "" ? account.dateOfBirth : myController.text;

    final Map<String, dynamic> requestBody = {
      "displayName": _displayNameController.text,
      "firstName": firstName,
      "lastName": _fullnameController.text.split(" ").last,
      "dayOfBirth": DateFormat("dd-MM-yyyy").parse(date!).toIso8601String(),
      "phoneNumber": _phoneNumberController.text,
      "address": _addressController.text,
      "gender": account.gender,
    };

    check = await homeController.updateAccount(
        requestBody, prefs.getString('token')!);

    if (image == null) {
      showToast(check);
      homeController.getCurrenAccount();
      return;
    }

    var stream = http.ByteStream(image!.openRead());
    stream.cast();

    var length = await image!.length();

    var uri = Uri.parse(
        'https://www.api.restaurantservice.online/api/users/me/set-avatar');
    var request = http.MultipartRequest("PUT", uri);
    var multiport =
        http.MultipartFile('avatar', stream, length, filename: 'avatar.jpg');
    var headers = {'Authorization': 'Bearer ${prefs.getString('token')}'};
    request.headers.addAll(headers);
    request.files.add(multiport);

    try {
      var response = await request.send();

      if (response.statusCode == 200) {
        check =
            await homeController.fetchAccountInfo(prefs.getString('token')!);
        print("Image uploaded successfully");
      } else {
        check = false;
        print("Failed with status code: ${response.statusCode}");
        print("Response body: ${await response.stream.bytesToString()}");
      }
    } catch (error) {
      print("Error: $error");
    } finally {
      homeController.getCurrenAccount();
      _showSpinner.value = false;
      showToast(check);
    }
  }

  void showToast(bool check) {
    if (check) {
      homeController.getCurrenAccount();
      _showSpinner.value = false;
      MotionToast.success(
        title: const Text("Success !"),
        description: const Text("Update information successfully !"),
      ).show(context);
    } else {
      MotionToast.error(
              title: const Text("Error !"),
              description: const Text("Update information Fail !"))
          .show(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      backgroundColor: ColorPalette.white,
      body: Stack(
        children: [
          ValueListenableBuilder<bool>(
            valueListenable: _showSpinner,
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
          Positioned(
              top: Dimensions.height30,
              left: Dimensions.width260,
              child: Container(
                width: 110,
                height: 110,
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
                  child: image != null
                      ? Image.file(
                          File(image!.path).absolute,
                          width: 100,
                          height: 100,
                          fit: BoxFit.cover,
                        )
                      : CachedNetworkImage(
                          errorWidget: (context, url, error) =>
                              const Icon(Icons.error),
                          placeholder: (context, url) =>
                              Image.asset(AssetHelper.imagePlaceHolder),
                          imageUrl: account.avatar ?? "",
                          height: 240,
                          width: double.infinity,
                          fit: BoxFit.cover,
                        ),
                ),
              )),
          Positioned(
            top: Dimensions.height100,
            left: Dimensions.width340,
            child: InkWell(
              onTap: () => {getImage()},
              child: AppIcon(
                icon: Icons.camera_alt,
                backgroundColor: ColorPalette.grey,
                iconColor: ColorPalette.white,
                iconSize: 25,
                width: 37,
                height: 37,
                borderWidth: 2,
                shiftRight: 4,
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.only(
              left: Dimensions.width20,
              top: Dimensions.height60,
            ),
            child: _buildTitle('Edit Profile'),
          ),
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            top: Dimensions.height140,
            child: ListView(
              padding: EdgeInsets.only(
                  left: Dimensions.width20, right: Dimensions.width20),
              children: [
                Column(
                  children: [
                    Align(
                      alignment: Alignment.centerLeft,
                      child: AppText(
                        text: "Display Name",
                        size: Dimensions.font16,
                      ),
                    ),
                    SizedBox(
                      height: Dimensions.height5,
                    ),
                    RoundedTextField(
                      controller: _displayNameController,
                    ),
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
                      height: Dimensions.height5,
                    ),
                    RoundedTextField(
                      controller: _fullnameController,
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
                      height: Dimensions.height5,
                    ),
                    RoundedTextField(
                      controller: _emailController,
                      isEnabled: false,
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
                      height: Dimensions.height5,
                    ),
                    RoundedTextField(
                      controller: _addressController,
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
                      height: Dimensions.height5,
                    ),
                    RoundedTextField(
                      controller: _phoneNumberController,
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
                      height: Dimensions.height5,
                    ),
                    TextFormField(
                      controller: myController,
                      readOnly: true,
                      onTap: () async {
                        DateTime? pickedDate = await showDatePicker(
                          context: context,
                          initialDate: selectedDate ?? DateTime.now(),
                          firstDate: DateTime(1900),
                          lastDate: DateTime.now(),
                        );

                        if (pickedDate != null && pickedDate != selectedDate) {
                          setState(() {
                            selectedDate = pickedDate;
                            myController.text =
                                DateFormat('dd-MM-yyyy').format(pickedDate);
                          });
                        }
                      },
                      style: const TextStyle(
                        color: ColorPalette.black,
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                      ),
                      decoration: InputDecoration(
                        hintText: account.dateOfBirth!,
                        hintStyle: const TextStyle(
                          color: ColorPalette.black,
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                        ),
                        contentPadding: const EdgeInsets.symmetric(
                            vertical: 15, horizontal: 30),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                          borderSide: const BorderSide(
                              width: 1, color: ColorPalette.grey),
                        ),
                      ),
                    ),
                  ],
                ),
                SizedBox(
                  height: Dimensions.height25,
                ),
                ButtonWidget(
                  title: "SAVE",
                  size: Dimensions.font20,
                  borderRadius: Dimensions.radius40,
                  width: Dimensions.width250,
                  height: Dimensions.height60,
                  color: ColorPalette.white,
                  background: ColorPalette.primaryOrange,
                  blur: 1,
                  onTap: () {
                    _showSpinner.value = true;
                    uploadImage();
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTitle(String title) {
    return Container(
      width: Dimensions.width220,
      height: Dimensions.height40,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(Dimensions.radius20),
        boxShadow: [
          BoxShadow(
            color: Colors.grey,
            offset: Offset(0, 2),
            blurRadius: 1.0,
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          IconButton(
            icon: const Icon(Icons.arrow_back_ios),
            color: ColorPalette.primaryOrange,
            onPressed: () {
              homeController.getCurrenAccount();
              Navigator.of(context).pushNamed(AppRoute.profilestaff);
            },
          ),
          Text(
            title,
            style: TextStyle(
              color: Colors.black,
              fontSize: Dimensions.font20,
              height: 1.2,
              fontWeight: FontWeight.w800,
            ),
          ),
        ],
      ),
    );
  }
}
