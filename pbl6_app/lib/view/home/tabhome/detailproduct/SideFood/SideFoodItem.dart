import 'package:flutter/material.dart';
import 'package:restaurant_app/components/TextWidget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/model/SideFood.dart';

class SideFoodItem extends StatefulWidget {
  final SideFood sidefood;
  final int value;
  final int selectedOption;
  final Function(int?) onChanged;

  SideFoodItem({
    required this.sidefood,
    required this.value,
    required this.selectedOption,
    required this.onChanged,
  });

  @override
  _SideFoodItemState createState() => _SideFoodItemState();
}

class _SideFoodItemState extends State<SideFoodItem> {
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        if (widget.selectedOption == widget.value) {
          widget.onChanged(-1);
        } else {
          widget.onChanged(widget.value);
        }
      },
      child: Row(
        children: [
          Expanded(
            flex: 1,
            child: Container(
              alignment: Alignment.center,
              height: 40,
              width: 40,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: widget.sidefood.image,
              ),
            ),
          ),
          const SizedBox(
            width: 20,
          ),
          Expanded(
            flex: 4,
            child: TextSophia(
                    size: 16,
                    textData: widget.sidefood.name,
                    color: ColorPalette.dartGrey,
                    weight: FontWeight.w400)
                .textSophiaItalic,
          ),
          Expanded(
            flex: 2,
            child: TextSophia(
                    size: 18,
                    textData: '\$${widget.sidefood.price.toStringAsFixed(2)}',
                    color: ColorPalette.dartGrey,
                    weight: FontWeight.w400)
                .textSophiaItalic,
          ),
          Expanded(
            child: Radio<int>(
              value: widget.value,
              groupValue: widget.selectedOption,
              onChanged: null,
              fillColor: MaterialStateColor.resolveWith(
                  (states) => ColorPalette.primaryOrange),
            ),
          ),
        ],
      ),
    );
  }
}
