// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';

class AppText extends StatelessWidget {
  Color color;
  final String text;
  double size;
  double height;
  FontWeight fontWeight;
  TextOverflow overflow;
  int lines;
  TextAlign textAlign;
  AppText({
    Key? key,
    this.color = const Color(0xFF9796a1),
    required this.text,
    this.size = 12,
    this.height = 1.2,
    this.fontWeight = FontWeight.normal,
    this.overflow = TextOverflow.ellipsis,
    this.lines = 1,
    this.textAlign = TextAlign.justify
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      maxLines: lines,
      overflow: overflow,
      textAlign: textAlign,
      style: TextStyle(
        fontFamily: 'Roboto',
        color: color,
        fontSize: size == 0 ? Dimensions.font20 : size,
        height: height,
        fontWeight: fontWeight,
      ),
    );
  }
}
