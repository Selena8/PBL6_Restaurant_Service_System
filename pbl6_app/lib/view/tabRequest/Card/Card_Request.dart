import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:restaurant_app/components/app_text.dart';
import 'package:restaurant_app/components/button_widget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/constant/dismension_constants.dart';

class CardRequest extends StatefulWidget {
  final int requestId;
  final String Type;
  final String content;
  final DateTime timeStartRequest;
  final Function() onDonePressed;
  final double height;

  CardRequest({
    required this.requestId,
    required this.Type,
    required this.content,
    required this.timeStartRequest,
    required this.onDonePressed,
    required this.height,
  });

  @override
  _CardRequestState createState() => _CardRequestState();
}

class _CardRequestState extends State<CardRequest> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(Dimensions.height20),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(Dimensions.radius20),
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.3),
              blurRadius: 5,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          children: <Widget>[
            Expanded(
              child: Container(
                height: widget.height,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.only(
                    topRight: Radius.circular(Dimensions.radius20),
                    bottomRight: Radius.circular(Dimensions.radius20),
                  ),
                  color: Colors.white,
                ),
                child: Padding(
                  padding: EdgeInsets.symmetric(
                    horizontal: Dimensions.width15,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      AppText(
                        text: widget.Type,
                        color: ColorPalette.black,
                        size: Dimensions.font24,
                        height: 2.0,
                        fontWeight: FontWeight.bold,
                      ),
                      SizedBox(height: Dimensions.height10),
                      AppText(
                        text: widget.content,
                      ),
                      SizedBox(height: Dimensions.height10),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Icon(Icons.access_alarm,
                                  size: Dimensions.iconSize24,
                                  color: ColorPalette.black),
                              SizedBox(width: Dimensions.width5),
                              AppText(
                                text: DateFormat('HH:mm:ss dd-MM-yyyy').format( widget.timeStartRequest),
                                color: ColorPalette.black,
                                size: Dimensions.font12,
                                height: 2.0,
                                fontWeight: FontWeight.bold,
                              ),
                            ],
                          ),
                          ButtonWidget(
                            title: "Done",
                            size: Dimensions.font14,
                            borderRadius: Dimensions.radius40,
                            width: Dimensions.width110,
                            height: Dimensions.height40,
                            color: ColorPalette.white,
                            background: ColorPalette.primaryOrange,
                            blur: 1,
                            onTap: widget.onDonePressed,
                          ),
                        ],
                      ),
                    ],
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
