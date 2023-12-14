import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:restaurant_app/components/Rounded_TextField.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/controller/auth_controller.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/theme/theme.dart';
import 'package:rive/rive.dart' hide LinearGradient;

class SignUpView extends StatefulWidget {
  const SignUpView({Key? key, this.closeModal, this.onSignInClicked})
      : super(key: key);

  final Function? closeModal;
  final Function? onSignInClicked;

  @override
  State<SignUpView> createState() => _SignUpViewState();
}

class _SignUpViewState extends State<SignUpView> {
  final _emailController = TextEditingController();
  final _passController = TextEditingController();
  final _fullnameController = TextEditingController();
  final _phoneController = TextEditingController();

  late SMITrigger _successAnim;
  late SMITrigger _errorAnim;
  late SMITrigger _confettiAnim;

  bool _isLoading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passController.dispose();
    _fullnameController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  void _onCheckRiveInit(Artboard artboard) {
    final controller =
        StateMachineController.fromArtboard(artboard, "State Machine 1");
    artboard.addController(controller!);
    _successAnim = controller.findInput<bool>("Check") as SMITrigger;
    _errorAnim = controller.findInput<bool>("Error") as SMITrigger;
  }

  void _onConfettiRiveInit(Artboard artboard) {
    final controller =
        StateMachineController.fromArtboard(artboard, "State Machine 1");
    artboard.addController(controller!);
    _confettiAnim =
        controller.findInput<bool>("Trigger explosion") as SMITrigger;
  }

  void login() {
    setState(() {
      _isLoading = true;
    });

    String isEmailValid = _emailController.text.trim();
    String isPassValid = _passController.text.trim();
    String isFullNameValid = _fullnameController.text.trim();
    String isPhoneValid = _phoneController.text.trim();

    final AuthController _authController = AuthController();

    

    // Future.delayed(const Duration(seconds: 1), () {
    //   isValid ? _successAnim.fire() : _errorAnim.fire();
    // });

    // Future.delayed(const Duration(seconds: 3), () {
    //   setState(() {
    //     _isLoading = false;
    //   });
    //   // if (isValid) _confettiAnim.fire();
    // });

    // if (isValid) {
    //   Future.delayed(const Duration(seconds: 4), () {
    //     widget.closeModal!();
    //   });
    // }
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
                              blurRadius: 5),
                          BoxShadow(
                              color: RiveAppTheme.shadow.withOpacity(0.3),
                              offset: const Offset(0, 30),
                              blurRadius: 30)
                        ],
                        color: CupertinoColors.secondarySystemBackground,
                        // This kind of give the background iOS style "Frosted Glass" effect,
                        // it works for this particular color, might not for other
                        backgroundBlendMode: BlendMode.luminosity),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        AppText(
                            text: "Sign Up",
                            color: ColorPalette.black,
                            size: Dimensions.font44,
                            height: 1.2,
                            fontWeight: FontWeight.w800),
                        SizedBox(height: Dimensions.height10),
                        Form(
                          child: Column(
                            children: [
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
                                placeholder: 'Your full name',
                                controller: _fullnameController,
                              ),
                              SizedBox(
                                height: Dimensions.height15,
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
                                placeholder: 'Your email or phone',
                                controller: _emailController,
                              ),
                              SizedBox(
                                height: Dimensions.height15,
                              ),
                              Align(
                                alignment: Alignment.centerLeft,
                                child: AppText(
                                  text: "Password",
                                  size: Dimensions.font16,
                                ),
                              ),
                              SizedBox(
                                height: Dimensions.height10,
                              ),
                              RoundedTextField(
                                placeholder: 'Password',
                                controller: _passController,
                                isPassword: true,
                              ),
                              SizedBox(
                                height: Dimensions.height15,
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
                                placeholder: 'Phone Number',
                                controller: _phoneController,
                                height: Dimensions.height72,
                                isNumberPhone: true,
                              ),
                            ],
                          ),
                        ),
                        SizedBox(
                          height: Dimensions.height10,
                        ),
                        const SizedBox(height: 24),
                        Container(
                          decoration: BoxDecoration(
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFFF77D8E).withOpacity(0.5),
                                blurRadius: 20,
                                offset: const Offset(0, 10),
                              )
                            ],
                          ),
                          child: CupertinoButton(
                            padding: const EdgeInsets.all(20),
                            color: ColorPalette.primaryOrange,
                            borderRadius: const BorderRadius.only(
                              topLeft: Radius.circular(8),
                              topRight: Radius.circular(20),
                              bottomLeft: Radius.circular(20),
                              bottomRight: Radius.circular(20),
                            ),
                            child: const Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.arrow_forward_rounded),
                                SizedBox(width: 4),
                                Text(
                                  "Sign Up",
                                  style: TextStyle(
                                      fontSize: 17,
                                      fontFamily: "Inter",
                                      fontWeight: FontWeight.bold),
                                )
                              ],
                            ),
                            onPressed: () {
                              if (!_isLoading) login();
                            },
                          ),
                        ),
                        SizedBox(
                          height: Dimensions.height25,
                        ),
                        Align(
                          alignment: Alignment.center,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              AppText(
                                text: "Already have an account?",
                                size: Dimensions.font16,
                                color: ColorPalette.black,
                              ),
                              SizedBox(
                                width: Dimensions.width10,
                              ),
                              GestureDetector(
                                onTap: () {
                                  if (widget.onSignInClicked != null) {
                                    widget.onSignInClicked!();
                                  }
                                },
                                child: AppText(
                                  text: "Sign In",
                                  size: Dimensions.font16,
                                  color: ColorPalette.primaryOrange,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Positioned.fill(
                  child: IgnorePointer(
                    ignoring: true,
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        if (_isLoading)
                          SizedBox(
                            width: 100,
                            height: 100,
                            child: RiveAnimation.asset(
                              AssetHelper.checkRiv,
                              onInit: _onCheckRiveInit,
                            ),
                          ),
                        Positioned.fill(
                          child: SizedBox(
                            width: 500,
                            height: 500,
                            child: Transform.scale(
                              scale: 3,
                              child: RiveAnimation.asset(
                                AssetHelper.confettiRiv,
                                onInit: _onConfettiRiveInit,
                              ),
                            ),
                          ),
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
                            )
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
                )
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
          borderSide: BorderSide(color: Colors.black.withOpacity(0.1))),
      focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide(color: Colors.black.withOpacity(0.1))),
      contentPadding: const EdgeInsets.all(15),
      prefixIcon: Padding(
          padding: const EdgeInsets.only(left: 4),
          child: Image.asset("assets/ui/rive_app/images/$iconName.png")));
}
