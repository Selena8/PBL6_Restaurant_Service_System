import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/model/model_tab_item.dart';
import 'package:restaurant_app/theme/theme.dart';
import 'package:badges/badges.dart' as badges;
import 'package:restaurant_app/controller/controllers.dart';

class CustomTabBar extends StatefulWidget {
  const CustomTabBar({Key? key, required this.onTabChange}) : super(key: key);

  final Function(int tabIndex) onTabChange;

  @override
  State<CustomTabBar> createState() => _CustomTabBarState();
}

class _CustomTabBarState extends State<CustomTabBar> {
  int _selectedTab = 0;

  void onTabPress(int index) {
    if (_selectedTab != index) {
      setState(() {
        _selectedTab = index;
      });

      widget.onTabChange(index);
    }
  }

  List<TabItem> icons = TabItem.tabItemsList;

  Widget buildBadgeContent(int index) {
    int badgeValue;

    if (index == 1) {
      badgeValue = homeController.orderList.length;
    } else if (index == 2) {
      badgeValue = homeController.orderList.length;
    } else if (index == 3) {
      badgeValue = homeController.requestList.length;
    } else {
      badgeValue = 0; // Default value
    }

    return Container(
      padding: const EdgeInsets.all(2),
      decoration: BoxDecoration(
        color: Colors.red,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        badgeValue.toString(),
        style: const TextStyle(
          color: Colors.white,
          fontSize: 12,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Container(
        margin: const EdgeInsets.fromLTRB(15, 0, 15, 5),
        padding: const EdgeInsets.all(0),
        constraints: const BoxConstraints(maxWidth: 768),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24),
          gradient: LinearGradient(colors: [
            Colors.white.withOpacity(0.5),
            Colors.white.withOpacity(0)
          ]),
        ),
        child: Container(
          clipBehavior: Clip.hardEdge,
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(1),
            borderRadius: BorderRadius.circular(24),
            boxShadow: [
              BoxShadow(
                color: RiveAppTheme.background2.withOpacity(0.5),
                blurRadius: 20,
                offset: const Offset(0, 20),
              )
            ],
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: List.generate(icons.length, (index) {
              icons[index].id;
              return Expanded(
                child: CupertinoButton(
                  padding: const EdgeInsets.all(12),
                  child: Container(
                    height: 36,
                    width: 36,
                    child: (index == 1 || index == 2 || index == 3)
                        ? badges.Badge(
                            badgeContent: buildBadgeContent(index),
                            position:
                                badges.BadgePosition.topEnd(top: -10, end: -2),
                            child: Padding(
                              padding: const EdgeInsets.only(
                                top: 6,
                              ),
                              child: Icon(
                                icons[index].icon,
                                size: 26,
                                color: _selectedTab == index
                                    ? ColorPalette.Amber
                                    : Colors.black,
                              ),
                            ),
                          )
                        : Icon(
                            icons[index].icon,
                            size: 28,
                            color: _selectedTab == index
                                ? ColorPalette.Amber
                                : Colors.black,
                          ),
                  ),
                  onPressed: () {
                    onTabPress(index);
                  },
                ),
              );
            }),
          ),
        ),
      ),
    );
  }
}
