import 'package:flutter/material.dart';

class TabItem {
  TabItem({
    required this.icon,
  });

  UniqueKey? id = UniqueKey();
  IconData icon;

  static List<TabItem> tabItemsList = [
    TabItem(icon: Icons.home),
    TabItem(icon: Icons.shopping_cart),
    TabItem(icon: Icons.description),
    TabItem(icon: Icons.notifications),
  ];
}
