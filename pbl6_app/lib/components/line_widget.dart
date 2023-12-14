import 'package:flutter/material.dart';

// ignore: must_be_immutable
class LineWidget extends StatelessWidget {
  LineWidget({
    Key? key,
    required this.width,
    required this.strokeWidth,
    required this.color,
  }) : super(key: key);

  double width = double.infinity;
  double strokeWidth = double.infinity;
  Color color;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      size: Size(width, 1),
      painter: LinePainter(strokeWidth: strokeWidth, color: color),
    );
  }
}

class LinePainter extends CustomPainter {
  LinePainter({
    Key? key,
    required this.strokeWidth,
    required this.color,
  });
  double strokeWidth = double.infinity;
  Color color;
  @override
  void paint(Canvas canvas, Size size) {
    final Paint paint = Paint()
      ..color = color
      ..strokeWidth = strokeWidth;

    final Offset start = Offset(0, 0);
    final Offset end = Offset(size.width, 0);

    canvas.drawLine(start, end, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return false;
  }
}
