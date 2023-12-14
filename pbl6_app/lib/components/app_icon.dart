import 'package:flutter/material.dart';

enum IconShape { circle, square, roundedRectangle }

class AppIcon extends StatefulWidget {
  final IconData icon;
  final Color backgroundColor;
  final Color iconColor;
  final double width;
  final double height;
  final double iconSize;
  final double shiftRight;
  final IconShape shape;
  final BoxShadow boxShadow;
  final String text;
  final Color textColor;
  final double fontSizeText;
  final FontWeight fontWeightText;
  final Color borderColor;
  final double borderWidth; 

  AppIcon({
    required this.icon,
    this.backgroundColor = Colors.transparent,
    this.iconColor = Colors.black,
    this.width = 50.0,
    this.height = 50.0,
    this.iconSize = 30.0,
    this.shiftRight = 0.0,
    this.shape = IconShape.circle,
    this.boxShadow = const BoxShadow(
      color: Colors.grey,
      blurRadius: 2.0,
      spreadRadius: 0.0,
      offset: Offset(0, 2),
    ),
    this.text = '',
    this.textColor = Colors.black,
    this.fontSizeText = 12.0,
    this.fontWeightText = FontWeight.normal,
    this.borderColor = Colors.white, 
    this.borderWidth = 0, 
  });

  @override
  _AppIconState createState() => _AppIconState();
}

class _AppIconState extends State<AppIcon> {
  @override
  Widget build(BuildContext context) {
    final borderRadius = widget.shape == IconShape.circle
        ? BorderRadius.circular(widget.width / 2)
        : BorderRadius.circular(10.0);
    return Container(
      width: widget.width,
      height: widget.height,
      decoration: BoxDecoration(
        color: widget.backgroundColor,
        borderRadius: borderRadius,
        boxShadow: [widget.boxShadow],
        border: Border.all(
          color: widget.borderColor, 
          width: widget.borderWidth,
        ),
      ),
      child: Stack(
        children: [
          Row(
            children: [
              Align(
                child: Transform.translate(
                  offset: Offset(widget.shiftRight, 0),
                  child: Icon(
                    widget.icon,
                    color: widget.iconColor,
                    size: widget.iconSize,
                  ),
                ),
              ),
              Align(
                alignment: Alignment.bottomCenter,
                child: Text(
                  widget.text,
                  style: TextStyle(
                    color: widget.textColor,
                    fontSize: widget.fontSizeText,
                    fontWeight: widget.fontWeightText,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
