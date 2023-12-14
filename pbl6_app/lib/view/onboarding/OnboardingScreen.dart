import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/physics.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';
import 'package:restaurant_app/view/signin/SigninView.dart';
import 'package:restaurant_app/view/Reset_Password/Reset_Password.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/theme/theme.dart';
import 'package:rive/rive.dart';

class OnBoardingView extends StatefulWidget {
  const OnBoardingView({Key? key, this.closeModal}) : super(key: key);
  final Function? closeModal;

  @override
  State<OnBoardingView> createState() => _OnBoardingViewState();
}

class _OnBoardingViewState extends State<OnBoardingView>
    with TickerProviderStateMixin {
  AnimationController? _signInAnimController;
  late RiveAnimationController _btnController;
  bool showSignIn = true;

  @override
  void initState() {
    super.initState();
    _signInAnimController = AnimationController(
        duration: const Duration(milliseconds: 350),
        upperBound: 1,
        vsync: this);

    _btnController = OneShotAnimation("active", autoplay: false);

    const springDesc = SpringDescription(
      mass: 0.1,
      stiffness: 40,
      damping: 5,
    );

    _btnController.isActiveChanged.addListener(() {
      if (!_btnController.isActive) {
        final springAnim = SpringSimulation(springDesc, 0, 1, 0);
        _signInAnimController?.animateWith(springAnim);
      }
    });
  }

  @override
  void dispose() {
    _signInAnimController?.dispose();
    _btnController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Stack(children: [
        ImageFiltered(
          imageFilter: ImageFilter.blur(sigmaX: 50, sigmaY: 50),
          child: Center(
            child: OverflowBox(
              maxWidth: double.infinity,
              child: Transform.translate(
                offset: const Offset(200, 100),
                child: Image.asset(AssetHelper.spline, fit: BoxFit.cover),
              ),
            ),
          ),
        ),
        ImageFiltered(
          imageFilter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
          // child:
          //     const RiveAnimation.asset('assets/ui/rive_app/rive/shapes.riv'),
        ),
        AnimatedBuilder(
          animation: _signInAnimController!,
          builder: (context, child) {
            return Transform(
                transform: Matrix4.translationValues(
                    0, -50 * _signInAnimController!.value, 0),
                child: child);
          },
          child: SafeArea(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 100, 40, 40),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: SingleChildScrollView(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Align(
                            alignment: AlignmentDirectional(-0.62, -0.51),
                            child: Text(
                              'Welcome to',
                              style: TextStyle(
                                fontSize: 44,
                                fontWeight: FontWeight.w800,
                              ),
                            ),
                          ),
                          const Align(
                            alignment: AlignmentDirectional(-0.72, -0.37),
                            child: Text(
                              'FoodHaven',
                              style: TextStyle(
                                color: Color(0xFFFE724C),
                                fontSize: 40,
                                fontWeight: FontWeight.w800,
                              ),
                            ),
                          ),
                          SizedBox(
                            height: Dimensions.height25,
                          ),
                          Align(
                            alignment: const AlignmentDirectional(-0.5, -0.22),
                            child: Container(
                              width: 278,
                              height: 46,
                              decoration: const BoxDecoration(
                                color: Color(0x007ACAFF),
                              ),
                              child: const Text(
                                'Your favourite foods delivered fast at your door.',
                                style: TextStyle(
                                  color: Color(0xFF30384F),
                                  fontSize: 16,
                                  letterSpacing: 0.5,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  // const Spacer(),
                  Align(
                    alignment: Alignment(0, -1),
                    child: GestureDetector(
                      child: MouseRegion(
                        cursor: SystemMouseCursors.click,
                        child: Container(
                          width: 236,
                          height: 64,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(30),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.3),
                                blurRadius: 10,
                                offset: const Offset(0, 10),
                              )
                            ],
                          ),
                          child: Stack(
                            children: [
                              RiveAnimation.asset(
                                AssetHelper.buttonRiv,
                                fit: BoxFit.cover,
                                controllers: [_btnController],
                              ),
                              Center(
                                child: Transform.translate(
                                  offset: const Offset(4, 4),
                                  child: const Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Icon(Icons.arrow_forward_rounded),
                                      SizedBox(width: 4),
                                      Text(
                                        "SIGN IN",
                                        style: TextStyle(
                                            fontSize: 16,
                                            fontFamily: "Inter",
                                            fontWeight: FontWeight.bold),
                                      )
                                    ],
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                      ),
                      onTap: () {
                        _btnController.isActive = true;
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        RepaintBoundary(
          child: AnimatedBuilder(
            animation: _signInAnimController!,
            builder: (context, child) {
              return Stack(
                children: [
                  Positioned(
                      top: 30 - (_signInAnimController!.value * 200),
                      right: 20,
                      child: SafeArea(
                        child: CupertinoButton(
                          padding: EdgeInsets.zero,
                          borderRadius: BorderRadius.circular(36 / 2),
                          minSize: 36,
                          child: Container(
                            width: 36,
                            height: 36,
                            decoration: BoxDecoration(
                              color: Colors.black,
                              borderRadius: BorderRadius.circular(36 / 2),
                              boxShadow: [
                                BoxShadow(
                                    color: Colors.black.withOpacity(0.3),
                                    blurRadius: 10,
                                    offset: const Offset(0, 10))
                              ],
                            ),
                            child: const Icon(
                              Icons.close,
                              color: Colors.white,
                            ),
                          ),
                          onPressed: () {
                            widget.closeModal!();
                          },
                        ),
                      )),
                  Positioned.fill(
                    child: IgnorePointer(
                      ignoring: true,
                      child: Opacity(
                        opacity: 0.4 * _signInAnimController!.value,
                        child: Container(color: RiveAppTheme.shadow),
                      ),
                    ),
                  ),
                  Transform.translate(
                    offset: Offset(
                      0,
                      -MediaQuery.of(context).size.height *
                          (1 - _signInAnimController!.value),
                    ),
                    child: child,
                  ),
                ],
              );
            },
            child: showSignIn
                ? SignInView(
                    closeModal: () {
                      _signInAnimController?.reverse();
                    },
                    onForgotPassword: () {
                      setState(() {
                        showSignIn = false;
                      });
                    },
                  )
                : ResetPassword(
                    closeModal: () {
                      setState(() {
                        showSignIn = true;
                      });
                    },
                    onSignInClicked: () {
                      setState(() {
                        showSignIn = true;
                      });
                    },
                  ),
          ),
        ),
      ]),
    );
  }
}
