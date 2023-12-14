import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:restaurant_app/components/TextWidget.dart';
import 'package:restaurant_app/constant/colors_constants.dart';
import 'package:restaurant_app/controller/controllers.dart';
import 'package:restaurant_app/helper/asset_helper.dart';
import 'package:restaurant_app/model/Category.dart';
import 'package:restaurant_app/model/Food.dart';
import 'package:restaurant_app/model/model_product.dart';
import 'package:restaurant_app/theme/theme.dart';
import 'package:restaurant_app/view/home/tabhome/CarouselSalesOff.dart';
import 'package:restaurant_app/view/home/tabhome/PopularItem.dart';
import 'package:restaurant_app/view/home/tabhome/Product/CardProduct.dart';
import 'package:restaurant_app/view/home/tabhome/card_food_search/CardFood.dart';
import 'package:restaurant_app/view/home/tabhome/detailproduct/DetailProduct.dart';
import 'package:shimmer/shimmer.dart';

class HomeTabView extends StatefulWidget {
  const HomeTabView({Key? key}) : super(key: key);

  @override
  State<HomeTabView> createState() => _HomeTabViewState();
}

class _HomeTabViewState extends State<HomeTabView> {
  List<Product> productsPopular = Product.productList;
  int indexPage = 0;
  late Product product;
  int currentCategory = 0;
  String titleFood = "All";
  bool isSearching = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: ClipRRect(
        borderRadius: BorderRadius.circular(30),
        child: Container(
          width: double.infinity,
          height: double.infinity,
          padding: const EdgeInsets.only(top: 100),
          decoration: BoxDecoration(
            color: ColorPalette.white,
            borderRadius: BorderRadius.circular(30),
          ),
          child: SingleChildScrollView(
            physics: const BouncingScrollPhysics(),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 350,
                  margin: const EdgeInsets.symmetric(horizontal: 26),
                  child: TextSophia(
                    weight: FontWeight.bold,
                    size: 30,
                    color: ColorPalette.dartGrey,
                    textData: "What would you like to order?",
                  ).textSophiaBold,
                ),
                const SizedBox(
                  height: 20,
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 26),
                  child: Row(
                    children: [
                      Expanded(
                        flex: 4,
                        child: SizedBox(
                          height: 50,
                          child: TextField(
                            onChanged: (text) {
                              if (text.isNotEmpty) {
                                setState(() {
                                  isSearching = true;
                                });
                              } else {
                                setState(() {
                                  isSearching = false;
                                });
                              }
                              homeController.searchByNameFood(text);
                            },
                            decoration: InputDecoration(
                              hintText: 'Search',
                              contentPadding: EdgeInsets.symmetric(vertical: 3),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(15),
                              ),
                              hintStyle: const TextStyle(
                                  fontSize: 20,
                                  color: Colors.black), // Màu cam cho hintText
                              focusedBorder: OutlineInputBorder(
                                borderSide:
                                    BorderSide(color: ColorPalette.coralOrange),
                                borderRadius: BorderRadius.circular(15),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(color: Colors.black),
                                borderRadius: BorderRadius.circular(15),
                              ),
                              prefixIcon: const Icon(Icons.search,
                                  color:
                                      Colors.black), // Màu cam cho icon search
                            ),
                          ),
                        ),
                      ),
                      Expanded(
                        flex: 1,
                        child: Container(
                          width: 51,
                          height: 51,
                          margin: const EdgeInsets.only(left: 20),
                          decoration: BoxDecoration(
                            color: ColorPalette.white,
                            borderRadius: BorderRadius.circular(8),
                            boxShadow: const [
                              BoxShadow(
                                color: RiveAppTheme.background,
                                blurRadius: 20,
                              ),
                            ],
                          ),
                          child: SvgPicture.asset(
                            AssetHelper.icoFilter,
                            width: 18,
                            height: 18,
                            fit: BoxFit.scaleDown,
                          ),
                        ),
                      )
                    ],
                  ),
                ),
                const SizedBox(
                  height: 20,
                ),
                !isSearching
                    ? Column(
                        children: [
                          CarouselSalesOff(),
                          SingleChildScrollView(
                            physics: const BouncingScrollPhysics(),
                            scrollDirection: Axis.horizontal,
                            child: Container(
                              height: 130,
                              margin:
                                  const EdgeInsets.symmetric(horizontal: 15),
                              child: Obx(
                                () {
                                  if (homeController.categoryList.isNotEmpty) {
                                    return Row(
                                      children: buildCategoryItem(),
                                    );
                                  } else {
                                    return Row(
                                      children: buildCategoryItemLoading(),
                                    );
                                  }
                                },
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 26),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                TextSophia(
                                        textData: "Popular Items",
                                        color: ColorPalette.dartGrey,
                                        size: 24,
                                        weight: FontWeight.bold)
                                    .textSophiaBold,
                                TextSophia(
                                        textData: "View All >",
                                        color: ColorPalette.primaryOrange,
                                        size: 20,
                                        weight: FontWeight.w400)
                                    .textSophiaRegular,
                              ],
                            ),
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          SizedBox(
                            height: 246,
                            child: ListView.builder(
                              physics: const BouncingScrollPhysics(),
                              scrollDirection: Axis.horizontal,
                              itemCount: productsPopular.length,
                              itemBuilder: (context, index) {
                                return Container(
                                  height: 266,
                                  width: 155,
                                  margin: index == 0
                                      ? const EdgeInsets.symmetric(
                                          horizontal: 26, vertical: 15)
                                      : const EdgeInsets.only(
                                          right: 26, top: 15, bottom: 15),
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(20),
                                    color: ColorPalette.orangeLight,
                                    boxShadow: [
                                      BoxShadow(
                                        color: ColorPalette.orangeLight
                                            .withOpacity(0.3),
                                        spreadRadius: 5,
                                        blurRadius: 3,
                                        offset: const Offset(0, 3),
                                      ),
                                    ],
                                  ),
                                  child: InkWell(
                                    onTap: () {
                                      Get.to(
                                        () => DetailProduct(),
                                        arguments: productsPopular[index],
                                      );
                                    },
                                    child: PopularsItem(
                                        product: productsPopular[index]),
                                  ),
                                );
                              },
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 26),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                TextSophia(
                                        textData: titleFood,
                                        color: ColorPalette.dartGrey,
                                        size: 24,
                                        weight: FontWeight.bold)
                                    .textSophiaBold,
                                TextSophia(
                                        textData: "View All >",
                                        color: ColorPalette.primaryOrange,
                                        size: 20,
                                        weight: FontWeight.w400)
                                    .textSophiaRegular,
                              ],
                            ),
                          ),
                          Obx(
                            () {
                              if (homeController.foodList.isNotEmpty) {
                                return Column(
                                  children:
                                      buildListProduct(homeController.foodList),
                                );
                              } else {
                                return const SizedBox();
                              }
                            },
                          ),
                          const SizedBox(
                            height: 140,
                          )
                        ],
                      )
                    : Obx(() {
                        return Column(
                          children: [...buildListFoodSearch()],
                        );
                      })
              ],
            ),
          ),
        ),
      ),
    );
  }

  List<Widget> buildListFoodSearch() {
    List<Widget> itemProducts = [];
    List<Food> foodsBySearch = homeController.foodListBySearch;
    for (int i = 0; i < foodsBySearch.length; i++) {
      itemProducts.add(CardFood(
        food: foodsBySearch[i],
      ));
    }
    return itemProducts;
  }

  int index = 0;

  List<Widget> buildListProduct(List<Food> allFoods) {
    List<Widget> itemProducts = [];
    List<Food> foods =
        allFoods.where((food) => food.categoryId == currentCategory).toList();
    if (currentCategory == 0) {
      foods = allFoods;
    }

    for (int i = 0; i < foods.length; i++) {
      itemProducts.add(CardProduct(
        food: foods[i],
      ));
    }
    return itemProducts;
  }

  List<Widget> buildCategoryItem() {
    List<Widget> categoryItems = [];
    Category categoryAll = Category(id: 0, name: "All", description: "");
    List<Category> categories = [categoryAll, ...homeController.categoryList];
    for (int i = 0; i < categories.length; i++) {
      categoryItems.add(
        InkWell(
          onTap: () {
            setState(() {
              index = i;
              titleFood = categories[i].name;
              currentCategory = categories[i].id;
            });
          },
          child: Container(
            width: 60,
            height: 98,
            padding: const EdgeInsets.only(top: 5),
            margin: const EdgeInsets.only(right: 15),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(100),
              gradient: index != i ? Gradients.gradientItemCategory : null,
              color: index == i ? ColorPalette.primaryOrange : null,
              boxShadow: [
                BoxShadow(
                  color: ColorPalette.grey.withOpacity(0.6),
                  blurRadius: 6,
                  offset: const Offset(0, 8),
                ),
              ],
            ),
            child: Column(
              children: [
                SizedBox(
                  width: 50,
                  height: 50,
                  child: ClipOval(
                    child: Center(child: Image.asset(AssetHelper.imageAsian)),
                  ),
                ),
                Padding(
                    padding: const EdgeInsets.only(top: 10),
                    child: TextSophia(
                            weight: FontWeight.w500,
                            size: 11,
                            textData: categories[i].name,
                            color: index == i
                                ? ColorPalette.white
                                : ColorPalette.slateGray)
                        .textSophiaMedium),
              ],
            ),
          ),
        ),
      );
    }
    return categoryItems;
  }

  List<Widget> buildCategoryItemLoading() {
    List<Widget> categoryItems = [];
    for (int i = 0; i < 6; i++) {
      categoryItems.add(Shimmer.fromColors(
        baseColor: Colors.grey.shade300,
        highlightColor: Colors.white,
        child: Container(
          width: 60,
          height: 98,
          margin: const EdgeInsets.only(right: 15, top: 10),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(100),
            color: ColorPalette.primaryOrange,
          ),
          child: Column(
            children: [
              SizedBox(
                width: 50,
                height: 50,
                child: ClipOval(
                  child: Center(
                    child: Shimmer.fromColors(
                      baseColor: Colors.grey.shade300,
                      highlightColor: Colors.white,
                      child: Image.asset(AssetHelper.imageAsian),
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 10),
                child: Shimmer.fromColors(
                  baseColor: Colors.grey.shade300,
                  highlightColor: Colors.white,
                  child: TextSophia(
                          weight: FontWeight.w500,
                          size: 11,
                          textData: "         ",
                          color: ColorPalette.white)
                      .textSophiaMedium,
                ),
              ),
            ],
          ),
        ),
      ));
    }
    return categoryItems;
  }
}
