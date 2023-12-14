import 'package:get/get.dart';
import 'package:restaurant_app/route/app_route.dart';
import 'package:restaurant_app/view/shift/ShiftWorkLog.dart';
import 'package:restaurant_app/view/shift/WorklogScreen.dart';
import 'package:restaurant_app/view/shift/shift_binding.dart';
import 'package:restaurant_app/view/checkin/Checkin.dart';
import 'package:restaurant_app/view/home/home_screen.dart';
import 'package:restaurant_app/view/home/tabhome/detailproduct/DetailProduct.dart';
import 'package:restaurant_app/view/home/tabhome/detailproduct/IngredientFood/IngredientFood.dart';
import 'package:restaurant_app/view/home/tabhome/detailproduct/detail_food_binding.dart';
import 'package:restaurant_app/view/intro/IntroScreen.dart';
import 'package:restaurant_app/view/signup/SignupView.dart';
import 'package:restaurant_app/view/splash/SplashScreen.dart';
import 'package:restaurant_app/view/home/home_screen_staff.dart';
import 'package:restaurant_app/view/tabPayment/Webview.dart';
import 'package:restaurant_app/view/tabPayment/payment_binding.dart';
import 'package:restaurant_app/view/tabProfile/ProfileStaff.dart';
import 'package:restaurant_app/view/tabProfile/EditProfileStaff.dart';
import 'package:restaurant_app/view/home/home_binding.dart';

class AppPage {
  static var list = [
    GetPage(
      name: AppRoute.splash,
      page: () => const SplashScreen(),
      bindings: [
        ShiftBinding(),
        HomeBinding(),
      ],
    ),
    GetPage(
      name: AppRoute.intro,
      page: () => const IntroScreen(),
    ),
    GetPage(
        name: AppRoute.home,
        page: () => const HomeScreen(),
        bindings: [HomeBinding(), ShiftBinding()]),
    GetPage(
      name: AppRoute.signup,
      page: () => const SignUpView(),
    ),
    GetPage(
        name: AppRoute.homestaff,
        page: () => const HomeScreenStaff(selected: 0,),
        bindings: [HomeBinding(), ShiftBinding()]),
    GetPage(
      name: AppRoute.profilestaff,
      page: () => const ProfileStaff(),
    ),
    GetPage(
      name: AppRoute.editprofilestaff,
      page: () => const EditProfileStaff(),
      binding: HomeBinding(),
    ),
    GetPage(
        name: AppRoute.detailProduct,
        page: () => DetailProduct(),
        binding: DetailFoodBinding()),
    GetPage(
      name: AppRoute.ingredient,
      page: () => IngredientFood(),
    ),
    GetPage(
      name: AppRoute.checkin,
      page: () => const CheckIn(),
      binding: ShiftBinding(),
    ),
    GetPage(
      name: AppRoute.shiftworklog,
      page: () => const ShiftWorkLog(),
      bindings: [ShiftBinding()],
    ),
    GetPage(
      name: AppRoute.webviewpayment,
      page: () => WebViewApp(),
      bindings: [PaymentBinding()],
    ),
    GetPage(
      name: AppRoute.worklogscreen,
      page: () => const WorklogScreen(),
      bindings: [ShiftBinding()],
    ),
  ];
}
