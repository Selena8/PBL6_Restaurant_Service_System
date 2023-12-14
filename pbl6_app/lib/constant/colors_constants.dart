// import 'package:flutter/material.dart';

// class ColorPalette {
//   static const Color primaryOrange = Color(0xFFFE724C);
//   static const Color grayLavender = Color(0xFF9EA1B1);
//   static const Color black = Colors.black;
//   static const Color blue = Color.fromARGB(166, 94, 249, 254);
//   static const Color blueDart = Color.fromARGB(202, 53, 53, 104);
//   static const Color white = Colors.white;
//   static const Color transparent = Colors.transparent;
// }

// class Gradients {
//   // static const Gradient defaultGradientBackground = LinearGradient(
//   //   begin: Alignment.topLeft,
//   //   end: Alignment.bottomLeft,
//   //   colors: [
//   //     ColorPalette.secondColor,
//   //     ColorPalette.primaryColor,
//   //   ],
//   // );
// }

import 'package:flutter/material.dart';

class ColorPalette {
  static const Color primaryOrange = Color(0xFFFE724C);
  static const Color orangeLight = Color.fromARGB(255, 255, 147, 117);
  static const Color primaryRed = Color.fromARGB(255, 255, 74, 24);
  static const Color grayLavender = Color(0xFF9EA1B1);
  static const Color black = Colors.black;
  static const Color white = Colors.white;
  static const Color black10 = Color.fromARGB(10, 0, 0, 0);
  static const Color black40 = Color.fromARGB(64, 0, 0, 0);
  static const Color blue40 = Color.fromARGB(48, 0, 187, 255);

  static const Color slateGray = Color(0xFF9796a1);
  static const Color aquaBlue = Color(0xFF89dad0);
  static const Color goldYellow = Color(0xFFffd28d);
  static const Color orangeRed = Color(0xFFfcab88);
  static const Color taupeGray = Color(0xFF8f837f);
  static const Color whiteSmoke = Color(0xFFf7f6f4);
  static const Color ashGray = Color(0xFFa9a29f);
  static const Color charcoalGray = Color(0xFF5c524f);
  static const Color darkEbony = Color(0xFF332d2b);
  static const Color lemonYellow = Color(0xFFffd379);
  static const Color coralOrange = Color(0xFFfa7552);
  static const Color Amber = Color(0xFFe0aa2d);
  static const Color blue = Color.fromARGB(166, 94, 249, 254);
  static const Color dartBlue = Color.fromARGB(166, 72, 173, 255);
  static const Color blueDart = Color.fromARGB(202, 53, 53, 104);
  static const Color grey = Color.fromARGB(255, 195, 195, 195);
  static const Color lightGrey = Color(0xefefefef);
  static const Color dartGrey = Color(0xFF323643);
  static const Color grayishBlue = Color(0xFF9796A1);
  static const Color transparent = Colors.transparent;
  static const Color yellow = Color(0xFFFFC529);
  static const Color green = Color(0xFF367036);
  static const Color pink = Color(0xFFff8080);
}

class Gradients {
  static const Gradient gradientItemCategory = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomLeft,
    colors: [
      ColorPalette.white,
      Color.fromARGB(255, 252, 252, 252),
    ],
  );
}
