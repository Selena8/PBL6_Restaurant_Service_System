import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl_phone_field/intl_phone_field.dart';

class RoundedTextField extends StatefulWidget {
  final String placeholder;
  final TextEditingController controller;
  Color colorText;
  Color borderColor;
  bool isPassword;
  bool isNumberPhone;
  bool isMultiline;
  double width;
  double height;
  bool isNumber;
  double fontSize;
  FontWeight fontWeight;
  bool isFill;
  bool isEnabled;

  RoundedTextField(
      {this.placeholder = "",
      required this.controller,
      this.colorText = const Color(0xFF000000),
      this.borderColor = const Color(0xFFC4C4C4),
      this.isPassword = false,
      this.isNumberPhone = false,
      this.isMultiline = false,
      this.width = 370.0,
      this.height = 50.0,
      this.isNumber = false,
      this.fontSize = 16.0,
      this.fontWeight = FontWeight.normal,
      this.isFill = true,
      this.isEnabled = true});

  @override
  _RoundedTextFieldState createState() => _RoundedTextFieldState();
}

class _RoundedTextFieldState extends State<RoundedTextField> {
  late FocusNode focusNode;
  bool isPasswordVisible = false;

  @override
  void initState() {
    super.initState();
    focusNode = FocusNode();
    focusNode.addListener(() {
      setState(() {
        widget.borderColor = focusNode.hasFocus
            ? const Color(0xFFf4724d)
            : const Color(0xFFC4C4C4);
      });
    });
  }

  @override
  void dispose() {
    focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    TextEditingController controller = widget.controller;

    return Container(
      width: widget.width,
      height: widget.height,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10.0),
        border: Border.all(
          color: widget.borderColor,
          width: 1.0,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12.0),
        child: Row(
          children: [
            Expanded(
              child: widget.isMultiline
                  ? SingleChildScrollView(
                      child: TextField(
                        controller: controller,
                        focusNode: focusNode,
                        maxLines: null,
                        keyboardType: TextInputType.multiline,
                        textAlignVertical: TextAlignVertical.top,
                        style: TextStyle(
                          color: widget.colorText,
                          fontSize: widget.fontSize,
                          fontWeight: widget.fontWeight,
                        ),
                        decoration: InputDecoration(
                          hintText: widget.placeholder,
                          hintStyle: TextStyle(
                            color: const Color(0xFFC4C4C4),
                            fontSize: widget.fontSize,
                            fontWeight: widget.fontWeight,
                          ),
                        contentPadding: EdgeInsets.only(top: 0.0),
                          border: InputBorder.none,
                        ),
                        readOnly: !widget.isFill, 
                      ),
                    )
                  : widget.isNumberPhone
                      ? IntlPhoneField(
                          controller: controller,
                          focusNode: focusNode,
                          decoration: InputDecoration(
                            hintText: widget.placeholder,
                            hintStyle: TextStyle(
                              color: const Color(0xFFC4C4C4),
                              fontSize: widget.fontSize,
                              fontWeight: widget.fontWeight,
                            ),
                            contentPadding: const EdgeInsets.all(15.0),
                            border: InputBorder.none,
                          ),
                        )
                      : TextField(
                          enabled: widget.isEnabled,
                          controller: controller,
                          focusNode: focusNode,
                          obscureText: widget.isPassword && !isPasswordVisible,
                          keyboardType: widget.isNumber
                              ? TextInputType.number
                              : TextInputType.text,
                          inputFormatters: widget.isNumber
                              ? [
                                  FilteringTextInputFormatter.digitsOnly,
                                  LengthLimitingTextInputFormatter(1),
                                ]
                              : null,
                          style: TextStyle(
                            color: widget.colorText,
                            fontSize: widget.fontSize,
                            fontWeight: widget.fontWeight,
                          ),
                          decoration: InputDecoration(
                            hintText: widget.placeholder,
                            hintStyle: TextStyle(
                              color: const Color(0xFFC4C4C4),
                              fontSize: widget.fontSize,
                              fontWeight: widget.fontWeight,
                            ),
                            contentPadding: const EdgeInsets.all(15.0),
                            border: InputBorder.none,
                          ),
                          readOnly: !widget.isFill,
                        ),
            ),
            if (widget.isPassword)
              IconButton(
                onPressed: () {
                  setState(() {
                    isPasswordVisible = !isPasswordVisible;
                  });
                },
                icon: Icon(
                  isPasswordVisible ? Icons.visibility : Icons.visibility_off,
                  color: Colors.grey,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
