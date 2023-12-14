import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/controller/auth_controller.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/model/model_account.dart';
import 'package:restaurant_app/route/app_route.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SideMenuStaff extends StatefulWidget {
  final ValueChanged<int> onTabChanged;

  const SideMenuStaff({Key? key, required this.onTabChanged}) : super(key: key);

  @override
  State<SideMenuStaff> createState() => _SideMenuStaffState();
}

class _SideMenuStaffState extends State<SideMenuStaff> {
  int index = 0;
  late SharedPreferences prefs;

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.only(left: 26, top: 36),
        child: FutureBuilder<Account>(
            future: homeController.getCurrenAccount(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.done) {
                Account account = snapshot.data!;
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      flex: 15,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            height: 90,
                            width: 90,
                            child: ClipOval(
                              child: CachedNetworkImage(
                                errorWidget: (context, url, error) =>
                                    const Icon(Icons.error),
                                placeholder: (context, url) =>
                                    Image.asset(AssetHelper.imagePlaceHolder),
                                imageUrl:
                                    account != null ? account!.avatar! : "",
                                fit: BoxFit.cover,
                              ),
                              // Image.asset(
                              //   AssetHelper.imageAvatar,
                              //   width: 50,
                              //   height: 50,
                              //   fit: BoxFit.cover,
                              // ),
                            ),
                          ),
                          Padding(
                            padding:
                                const EdgeInsets.only(top: 21.0, bottom: 7.0),
                            child: Text(
                              account != null ? account!.displayName : "",
                              style: const TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.w700,
                                color: ColorPalette.white,
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(bottom: 32.5),
                            child: Text(
                              account != null ? account!.email : "",
                              style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w400,
                                  color: ColorPalette.grayLavender),
                            ),
                          ),
                          SingleChildScrollView(
                            physics: const BouncingScrollPhysics(),
                            child: Column(
                              children: [...buildOrderItems()],
                            ),
                          ),
                        ],
                      ),
                    ),
                    Expanded(
                      flex: 1,
                      child: InkWell(
                        onTap: () {
                          Navigator.of(context)
                              .pushReplacementNamed(AppRoute.home);
                          AuthController _authController = AuthController();
                          _authController.removeToken();
                        },
                        child: Container(
                          width: 117,
                          height: 43,
                          decoration: const BoxDecoration(
                              color: ColorPalette.primaryOrange,
                              borderRadius:
                                  BorderRadius.all(Radius.circular(20))),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              SvgPicture.asset(
                                AssetHelper.icoLogout,
                                fit: BoxFit.contain,
                                width: 26,
                                height: 26,
                              ),
                              const SizedBox(
                                width: 10,
                              ),
                              InkWell(
                                onTap: () {
                                  Navigator.of(context)
                                      .pushReplacementNamed(AppRoute.home);
                                  AuthController _authController =
                                      AuthController();
                                  _authController.removeToken();
                                },
                                child: const Text("Log Out",
                                    style: TextStyle(
                                        color: ColorPalette.white,
                                        fontSize: 16.0)),
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(
                      height: 40,
                    ),
                  ],
                );
              } else {
                return const SizedBox();
              }
            }));
  }

  List<Widget> buildOrderItems() {
    List<Widget> orderItems = [];
    List<String> categories = [
      'Home',
      'Check-in',
      'Profile',
      'List Orders',
      'Payment',
      'Request'
    ];
    List<String> icons = [
      AssetHelper.icoHome,
      AssetHelper.icoCheckin,
      AssetHelper.icoProfile,
      AssetHelper.icoOrder,
      AssetHelper.icoPayment,
      AssetHelper.icoRequest,
    ];

    for (int i = 0; i < categories.length; i++) {
      orderItems.add(
        InkWell(
          onTap: () {
            setState(() {
              index = i;
            });
            widget.onTabChanged(index);
          },
          child: Container(
            width: 250,
            height: 70,
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: index == i
                    ? ColorPalette.blueDart
                    : ColorPalette.transparent),
            child: Row(
              children: [
                const SizedBox(
                  width: 10,
                ),
                Image.asset(icons[i], width: 40, height: 40, fit: BoxFit.fill),
                const SizedBox(width: 16),
                Text(
                  categories[i],
                  style: TextStyle(
                    fontSize: 18.0,
                    fontWeight: FontWeight.w400,
                    color:
                        index == i ? ColorPalette.primaryOrange : Colors.white,
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    }

    return orderItems;
  }
}
