import 'package:flutter/material.dart';

// ignore: must_be_immutable
class ButtonWidget extends StatelessWidget {
  ButtonWidget({
    Key? key,
    required this.title,
    this.onTap, 
    this.gradient,
    this.background,
    this.color,
    required this.size,
    required this.borderRadius,
    required this.width,
    required this.height,
    this.leadingImage,
    this.borderColor,
    required this.blur,
  }) : super(key: key);

  final String title;
  final Function()? onTap; 
  Gradient? gradient;
  Color? color;
  double size;
  double width = double.infinity;
  double? height;
  Color? background;
  double borderRadius;
  double blur;
  Color? borderColor;
  ImageProvider<Object>? leadingImage; 

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        width: width,
        height: height,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(borderRadius),
          border: Border.all(color: borderColor ?? Colors.transparent, width: 1,),
          color: (background ?? const Color.fromARGB(255, 60, 63, 69)).withOpacity(blur),
          boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.15), 
            spreadRadius: 2, 
            blurRadius: 3, 
            offset: Offset(0, 2),
          ),
        ],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (leadingImage != null)
              Padding(
                padding: const EdgeInsets.only(right: 10),
                child: Image(
                  image: leadingImage!,
                  width: 24,
                  height: 24,
                ),
              ),
            Text(
              title,
              style: TextStyle(
                color: color ?? const Color.fromARGB(255, 171, 139, 40),
                fontWeight: FontWeight.w500,
                fontSize: size,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
