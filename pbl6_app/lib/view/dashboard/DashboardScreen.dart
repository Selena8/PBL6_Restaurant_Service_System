import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/helper/asset_helper.dart';

class DashboardScreen extends StatelessWidget {
  final zoomDrawerController;
  DashboardScreen(this.zoomDrawerController);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 26, vertical: 35),
              child: InkWell(
                onTap: () =>
                    zoomDrawerController.toggle(),
                child: Container(
                  width: 38,
                  height: 38,
                  decoration: const BoxDecoration(
                    color: ColorPalette.white,
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey,
                        blurRadius: 20.0,
                        offset: Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(10.0),
                    child: SvgPicture.asset(
                      AssetHelper.icoMenu,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
