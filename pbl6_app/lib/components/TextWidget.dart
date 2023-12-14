import 'package:flutter/material.dart';

class TextSophia {
  final double size;
  final String textData;
  final Color color;
  final FontWeight weight;
  final bool isLineThrough;
  final Color lineThroughColor;

  TextSophia({
    required this.size,
    required this.textData,
    required this.color,
    required this.weight,
    this.isLineThrough = false,
    this.lineThroughColor = Colors.red,
  });

  Text get textSophiaMedium => Text(
        textData,
        softWrap: true,
        style: TextStyle(
          color: color,
          fontSize: size,
          fontFamily: "Sofia-Medium",
          fontWeight: weight,
          decoration: isLineThrough ? TextDecoration.lineThrough : null,
          decorationColor: isLineThrough ? lineThroughColor : null,
        ),
      );

  Text get textSophiaBold => Text(
        textData,
        softWrap: true,
        style: TextStyle(
          color: color,
          fontSize: size,
          fontFamily: "Sofia-pro",
          fontWeight: weight,
          decoration: isLineThrough ? TextDecoration.lineThrough : null,
          decorationColor: isLineThrough ? lineThroughColor : null,
        ),
      );

  Text get textSophiaRegular => Text(
        textData,
        softWrap: true,
        style: TextStyle(
          color: color,
          fontSize: size,
          fontFamily: "Sofia-Regular",
          fontWeight: weight,
          decoration: isLineThrough ? TextDecoration.lineThrough : null,
          decorationColor: isLineThrough ? lineThroughColor : null,
        ),
      );

  Text get textSophiaItalic => Text(
        textData,
        softWrap: true,
        style: TextStyle(
          color: color,
          fontSize: size,
          fontFamily: "Sofia",
          fontWeight: weight,
          decoration: isLineThrough ? TextDecoration.lineThrough : null,
          decorationColor: isLineThrough ? lineThroughColor : null,
        ),
      );
}
