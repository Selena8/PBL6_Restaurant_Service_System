import 'package:flutter/material.dart';
import 'package:restaurant_app/components/button_widget.dart';
import 'package:restaurant_app/components/line_widget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/route/app_route.dart';

class IntroScreen extends StatelessWidget {
  const IntroScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            Image.asset(
              AssetHelper.imageIntro,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
            Image.asset(
              AssetHelper.imageIntroBlur,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
            Align(
              alignment: const AlignmentDirectional(0.80, -0.95),
              child: ButtonWidget(
                onTap: () {
                  Navigator.of(context).pushReplacementNamed(AppRoute.home);
                },
                size: 18,
                title: "Skip",
                borderRadius: 20,
                background: ColorPalette.white,
                height: 50,
                width: 100,
                color: ColorPalette.primaryOrange,
                blur: 1,
              ),
            ),
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
                'FoodHub',
                style: TextStyle(
                  color: Color(0xFFFE724C),
                  fontSize: 40,
                  fontWeight: FontWeight.w800,
                ),
              ),
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
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 40),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Row(
                    children: [
                      Expanded(
                        flex: 1,
                        child: LineWidget(
                          width: 50,
                          strokeWidth: 2,
                          color: ColorPalette.white,
                        ),
                      ),
                      const Expanded(
                        flex: 1,
                        child: Text(
                          'sign in with',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                      ),
                      Expanded(
                          flex: 1,
                          child: LineWidget(
                            width: 50,
                            strokeWidth: 2,
                            color: ColorPalette.white,
                          )),
                    ],
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Row(
                    children: [
                      Expanded(
                        flex: 4,
                        child: ButtonWidget(
                          leadingImage: AssetImage(AssetHelper.icoFacebook),
                          title: "FACEBOOK",
                          size: 14,
                          borderRadius: 28,
                          width: 140,
                          height: 54,
                          color: ColorPalette.black,
                          background: ColorPalette.white,
                          blur: 1,
                        ),
                      ),
                      const Expanded(
                        flex: 1,
                        child: SizedBox(),
                      ),
                      Expanded(
                        flex: 4,
                        child: ButtonWidget(
                            leadingImage: AssetImage(AssetHelper.icoGoogle),
                            title: "GOOGLE",
                            size: 14,
                            borderRadius: 28,
                            width: 140,
                            height: 54,
                            blur: 1,
                            color: ColorPalette.black,
                            background: ColorPalette.white),
                      )
                    ],
                  ),
                  const SizedBox(
                    height: 30,
                  ),
                  ButtonWidget(
                    title: "Start with email or phone",
                    borderColor: ColorPalette.white,
                    onTap: (){
                      Navigator.of(context).pushReplacementNamed(AppRoute.signup);
                    },
                    blur: 0.2,
                    size: 17,
                    borderRadius: 30,
                    width: double.infinity,
                    height: 54,
                    color: ColorPalette.white,
                  ),
                  const SizedBox(
                    height: 30,
                  ),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Already have an account? ",
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w400,
                          fontSize: 16,
                        ),
                      ),
                      Text(
                        "Sign In",
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w400,
                          fontSize: 16,
                          decoration: TextDecoration.underline,
                        ),
                      )
                    ],
                  ),
                  const SizedBox(
                    height: 40,
                  ),
                  LineWidget(
                    width: 140,
                    strokeWidth: 4,
                    color: ColorPalette.white,
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
