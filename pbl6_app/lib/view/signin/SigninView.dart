import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:restaurant_app/components/Rounded_TextField.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/controller/auth_controller.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/route/app_route.dart';
import 'package:restaurant_app/theme/theme.dart';
import 'package:rive/rive.dart' hide LinearGradient;
import 'package:shared_preferences/shared_preferences.dart';

class SignInView extends StatefulWidget {
  const SignInView({Key? key, this.closeModal, this.onSignUpClicked, this.onForgotPassword})
      : super(key: key);

  final Function? closeModal;
  final Function? onSignUpClicked;
  final Function? onForgotPassword;


  @override
  State<SignInView> createState() => _SignInViewState();
}

class _SignInViewState extends State<SignInView> {
  final _emailController = TextEditingController();
  final _passController = TextEditingController();

  late SMITrigger _errorAnim;
  late SMITrigger _confettiAnim;

  bool _isLoading = false;
  final AuthController _authController = AuthController();

  @override
  void dispose() {
    _emailController.dispose();
    _passController.dispose();
    super.dispose();
  }

  void _onCheckRiveInit(Artboard artboard) {
    final controller =
        StateMachineController.fromArtboard(artboard, "State Machine 1");
    artboard.addController(controller!);
    // _successAnim = controller.findInput<bool>("Check") as SMITrigger;
    _errorAnim = controller.findInput<bool>("Error") as SMITrigger;
  }

  void _onConfettiRiveInit(Artboard artboard) {
    final controller =
        StateMachineController.fromArtboard(artboard, "State Machine 1");
    artboard.addController(controller!);
    _confettiAnim =
        controller.findInput<bool>("Trigger explosion") as SMITrigger;
  }

  void login() async {
    bool isRoleTable = false;
    _authController.removeToken();
    setState(() {
      _isLoading = true;
    });

    bool isLogin = false;
    final prefs = await SharedPreferences.getInstance();
    if (!_emailController.text.trim().toLowerCase().contains("table")) {
      isRoleTable = false;
      isLogin = await _authController.loginUser(
          _emailController.text.trim(), _passController.text.trim());
    } else {
      isRoleTable = true;
      isLogin = await _authController.loginTable(
          _emailController.text.trim(), _passController.text.trim());
    }
    await prefs.setBool('isRoleTable', isRoleTable);
    if (isLogin) {
      _confettiAnim.fire();
      Future.delayed(const Duration(seconds: 2), () async {
        setState(() {
          _isLoading = false;
        });
        handleLogin(isRoleTable);
        widget.closeModal!();
        _emailController.text = "";
        _passController.text = "";
      });
    } else {
      _errorAnim.fire();
      Future.delayed(const Duration(seconds: 2), () {
        setState(() {
          _isLoading = false;
        });
      });
    }
  }

  Future<void> handleLogin(bool isRoleTable) async {
    if (!isRoleTable) {
      print("Role Staff");
      // ignore: use_build_context_synchronously
      Navigator.of(context).pushReplacementNamed(AppRoute.homestaff);
    } else {
      print("Role User");
      // ignore: use_build_context_synchronously
      Navigator.of(context).pushReplacementNamed(AppRoute.home);
    }
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
                            text: "Sign In",
                            color: ColorPalette.black,
                            size: Dimensions.font44,
                            height: 1.2,
                            fontWeight: FontWeight.w800),
                        const SizedBox(height: 24),
                        Form(
                          child: Column(
                            children: [
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
                            ],
                          ),
                        ),
                        SizedBox(
                          height: Dimensions.height20,
                        ),
                        GestureDetector(
                          onTap: () {
                             if (widget.onForgotPassword != null) {
                                    widget.onForgotPassword!();
                                  }
                          },
                          child: Align(
                            alignment: Alignment.center,
                            child: AppText(
                              text: "Forgot password?",
                              size: Dimensions.font16,
                              color: ColorPalette.primaryOrange,
                            ),
                          ),
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
                                  "Sign In",
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
