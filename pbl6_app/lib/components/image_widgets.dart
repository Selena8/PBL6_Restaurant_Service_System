import 'package:flutter/material.dart';

class ImageWidget extends StatelessWidget {
  final String imagePath;
  final AlignmentGeometry? alignment;
  final BorderRadiusGeometry? borderRadius;
  final double? width;
  final double? height;

  ImageWidget({
    Key? key,
    required this.imagePath,
    this.alignment,
    this.borderRadius,
    this.width,
    this.height,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: alignment ?? AlignmentDirectional(0,0),
      child: ClipRRect(
        borderRadius: borderRadius ?? BorderRadius.circular(8),
        child: Image.asset(
          imagePath,
          width: width ?? 200,
          height: height ?? 200,
          fit: BoxFit.contain,
        ),
      ),
    );
  }
}
