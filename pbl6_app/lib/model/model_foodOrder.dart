class FoodItemOrder {
  final String nameFood;
  final String ingredients;
  final String image;
  final String price;
  final int number;
  final String status;

  FoodItemOrder({
    required this.nameFood,
    required this.ingredients,
    required this.image,
    required this.price,
    required this.number,
    required this.status,
  });
}

List<FoodItemOrder> foodItemOrders = [
  FoodItemOrder(
    nameFood: "Five-color salad",
    ingredients: "Spicy chicken, beef",
    image: "salad.jpeg",
    price: "15.30",
    number: 1,
    status: "ordering",
  ),
  FoodItemOrder(
    nameFood: "Pizza Recipe",
    ingredients: "Tomato, chees, beef",
    image: "pizza.jpeg",
    price: "20.30",
    number: 1,
    status: "preparing",
  ),
  FoodItemOrder(
    nameFood: "Pizza Recipe",
    ingredients: "Tomato, chees, beef",
    image: "pizza.jpeg",
    price: "20.40",
    number: 2,
    status: "done",
  ),
];
