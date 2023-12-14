import 'package:flutter/cupertino.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:restaurant_app/components/Rounded_TextField.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/components/button_widget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/controller/auth_controller.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/theme/theme.dart';
import 'package:flutter_svg/flutter_svg.dart';

class ResetPassword extends StatefulWidget {
  const ResetPassword(
      {Key? key, this.closeModal, this.onSignInClicked, this.onSendClicked})
      : super(key: key);
  final Function? onSignInClicked;
  final Function? closeModal;
  final Function? onSendClicked;

  @override
  State<ResetPassword> createState() => _ResetPasswordState();
}

class _ResetPasswordState extends State<ResetPassword> {
  TextEditingController emailController = TextEditingController();
  String errorMessage = '';
  final ValueNotifier<bool> _showSpinner = ValueNotifier<bool>(false);

  void _onSendClicked() async {
    String email = emailController.text;
    if (email.isEmpty) {
      setState(() {
        errorMessage = "Please enter your email.";
      });
      return;
    }

    try {
      String result = await AuthController().forgotPassword(email);
      setState(() {
        errorMessage = result;
        if (errorMessage.contains(
            "We sent a reset password link to your email. Not receive?")) {}
      });
    } catch (error) {
      // Handle API call error
      print("API Error: $error");
      setState(() {
        errorMessage = "An error occurred. Please try again.";
      });
    } finally {
      _showSpinner.value = false;
    }
  }

  void _onVerifyClicked() async {
    String email = emailController.text;
    print(email);

    if (email.isEmpty) {
      setState(() {
        errorMessage = "Please enter your email.";
      });
      return;
    }

    try {
      String result = await AuthController().resendConfirmMail(email);

      setState(() {
        errorMessage = result;
      });
    } catch (error) {
      // Handle API call error
      print("API Error: $error");
      setState(() {
        errorMessage = "An error occurred. Please try again.";
      });
    } finally {
      _showSpinner.value = false;
    }
    print(errorMessage);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            child: Stack(
              children: [
                Container(
                  constraints: const BoxConstraints(maxWidth: 600),
                  margin: const EdgeInsets.all(16),
                  padding: const EdgeInsets.all(1),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    gradient: LinearGradient(
                      colors: [Colors.white.withOpacity(0.8), Colors.white10],
                    ),
                  ),
                  child: Container(
                    padding: const EdgeInsets.all(29),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20),
                      boxShadow: [
                        BoxShadow(
                          color: RiveAppTheme.shadow.withOpacity(0.3),
                          offset: const Offset(0, 3),
                          blurRadius: 5,
                        ),
                        BoxShadow(
                          color: RiveAppTheme.shadow.withOpacity(0.3),
                          offset: const Offset(0, 30),
                          blurRadius: 30,
                        )
                      ],
                      color: CupertinoColors.secondarySystemBackground,
                      backgroundBlendMode: BlendMode.luminosity,
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Positioned(
                          top: Dimensions.height45,
                          left: Dimensions.width45,
                          right: Dimensions.width20,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              InkWell(
                                onTap: () {
                                  if (widget.onSignInClicked != null) {
                                    widget.onSignInClicked!();
                                  }
                                },
                                child: Container(
                                  height: Dimensions.height37,
                                  width: Dimensions.height37,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(
                                        Dimensions.radius15),
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
                        AppText(
                          text: "Reset Password",
                          color: ColorPalette.black,
                          size: Dimensions.font20,
                          height: 1.2,
                          fontWeight: FontWeight.w800,
                        ),
                        SizedBox(
                          height: Dimensions.height30,
                        ),
                        Form(
                          child: Column(
                            children: [
                              Align(
                                alignment: Alignment.center,
                                child: Text(
                                  "Please enter your email address to request a password reset",
                                  style: TextStyle(
                                    fontSize: Dimensions.font16,
                                    color: Colors.grey,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              SizedBox(
                                height: Dimensions.height10,
                              ),
                              Stack(
                                children: [
                                  ValueListenableBuilder<bool>(
                                    valueListenable: _showSpinner,
                                    builder: (context, showSpinner, child) {
                                      return showSpinner
                                          ? SpinKitFadingCircle(
                                              itemBuilder:
                                                  (BuildContext context,
                                                      int index) {
                                                return DecoratedBox(
                                                  decoration: BoxDecoration(
                                                    color: index.isEven
                                                        ? Colors.red
                                                        : const Color.fromARGB(
                                                            255, 76, 175, 165),
                                                  ),
                                                );
                                              },
                                            )
                                          : Container();
                                    },
                                  ),
                                  RoundedTextField(
                                    placeholder: 'Your email',
                                    controller: emailController,
                                  ),
                                ],
                              ),
                              SizedBox(
                                height: Dimensions.height10,
                              ),
                              if (errorMessage.contains(
                                  "Email has not been verified, please verify email through Gmail!"))
                                RichText(
                                  text: TextSpan(
                                    style: DefaultTextStyle.of(context).style,
                                    children: [
                                      TextSpan(
                                        text:
                                            "Email has not been verified, please ",
                                        style: TextStyle(color: Colors.grey),
                                      ),
                                      TextSpan(
                                        text: "verify email!",
                                        style: TextStyle(
                                          color: Colors.red,
                                          decoration: TextDecoration.underline,
                                        ),
                                        recognizer: TapGestureRecognizer()
                                          ..onTap = () {
                                            _showSpinner.value = true;
                                            _onVerifyClicked();
                                          },
                                      ),
                                    ],
                                  ),
                                ),
                              if (errorMessage.contains(
                                  "The staff email account does not exist!"))
                                Column(
                                  children: [
                                    Padding(
                                      padding: const EdgeInsets.symmetric(
                                        vertical: 8,
                                      ),
                                      child: AppText(
                                        text:
                                            "The staff email account does not exist!",
                                        size: Dimensions.font16,
                                        color: ColorPalette.primaryOrange,
                                      ),
                                    ),
                                  ],
                                ),
                              if (errorMessage.contains(
                                  "We sent a reset password link to your email. Not receive?"))
                                RichText(
                                  textAlign: TextAlign.center,
                                  text: TextSpan(
                                    style: DefaultTextStyle.of(context).style,
                                    children: [
                                      TextSpan(
                                        text:
                                            "We sent a reset password link to your email. Not receive? ",
                                        style: TextStyle(color: Colors.grey),
                                      ),
                                      TextSpan(
                                        text: "Resend it?",
                                        style: TextStyle(
                                          color: Colors.red,
                                          decoration: TextDecoration.underline,
                                        ),
                                        recognizer: TapGestureRecognizer()
                                          ..onTap = () {
                                            _showSpinner.value = true;
                                            _onSendClicked();
                                          },
                                      ),
                                    ],
                                  ),
                                ),
                              if (errorMessage.contains(
                                  "We sent a verification email link to your email. Not receive?"))
                                RichText(
                                  textAlign: TextAlign.center,
                                  text: TextSpan(
                                    style: DefaultTextStyle.of(context).style,
                                    children: [
                                      TextSpan(
                                        text:
                                            "We sent a verification email link to your email. Not receive? ",
                                        style: TextStyle(color: Colors.grey),
                                      ),
                                      TextSpan(
                                        text: "Resend it?",
                                        style: TextStyle(
                                          color: Colors.red,
                                          decoration: TextDecoration.underline,
                                        ),
                                        recognizer: TapGestureRecognizer()
                                          ..onTap = () {
                                            _showSpinner.value = true;
                                            _onVerifyClicked();
                                          },
                                      ),
                                    ],
                                  ),
                                ),
                              if (errorMessage
                                  .contains("Please enter your email."))
                                Column(
                                  children: [
                                    Padding(
                                      padding: const EdgeInsets.symmetric(
                                        vertical: 8,
                                      ),
                                      child: AppText(
                                        text: "Please enter your email!",
                                        size: Dimensions.font16,
                                        color: ColorPalette.primaryOrange,
                                      ),
                                    ),
                                  ],
                                ),
                            ],
                          ),
                        ),
                        SizedBox(
                          height: Dimensions.height30,
                        ),
                        ButtonWidget(
                          title: "SEND",
                          size: Dimensions.font20,
                          borderRadius: Dimensions.radius40,
                          width: Dimensions.width250,
                          height: Dimensions.height60,
                          color: ColorPalette.white,
                          background: ColorPalette.primaryOrange,
                          blur: 1,
                          onTap: () {
                            _showSpinner.value = true;
                            _onSendClicked();
                          },
                        ),
                      ],
                    ),
                  ),
                ),
                Positioned(
                  bottom: 0,
                  left: 0,
                  right: 0,
                  child: Align(
                    alignment: Alignment.center,
                    child: CupertinoButton(
                      padding: EdgeInsets.zero,
                      borderRadius: BorderRadius.circular(36 / 2),
                      minSize: 36,
                      child: Container(
                        width: 36,
                        height: 36,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(36 / 2),
                          boxShadow: [
                            BoxShadow(
                              color: RiveAppTheme.shadow.withOpacity(0.3),
                              blurRadius: 5,
                              offset: const Offset(0, 3),
                            ),
                          ],
                        ),
                        child: const Icon(
                          Icons.close,
                          color: Colors.black,
                        ),
                      ),
                      onPressed: () {
                        widget.closeModal!();
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// Common style for Auth Input fields email and password
InputDecoration authInputStyle(String iconName) {
  return InputDecoration(
    filled: true,
    fillColor: Colors.white,
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide(color: Colors.black.withOpacity(0.1)),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide(color: Colors.black.withOpacity(0.1)),
    ),
    contentPadding: const EdgeInsets.all(15),
    prefixIcon: Padding(
      padding: const EdgeInsets.only(left: 4),
      child: Image.asset("assets/ui/rive_app/images/$iconName.png"),
    ),
  );
}
