import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Icon } from "@iconify/react";
import MenuFoodCard from "../MenuFoodCard";
import ScrollAnimation from 'react-animate-on-scroll';
import { Element } from 'react-scroll';

const MenuList = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const foodData: any[] = [
    {
      id: 1,
      img: "https://themewagon.github.io/restoran/img/menu-4.jpg",
      name: "Burger",
      description: "A classic American burger with lettuce, tomato, and cheese",
      total: "10$",
    },
    {
      id: 2,
      img: "https://themewagon.github.io/restoran/img/menu-4.jpg",
      name: "Sushi",
      description:
        "Freshly made sushi rolls with salmon, avocado, and cucumber",
      total: "15$",
    },
    {
      id: 3,
      img: "https://themewagon.github.io/restoran/img/menu-4.jpg",
      name: "Pizza",
      description: "A delicious pizza with pepperoni, mushrooms, and olives",
      total: "12$",
    },
    {
      id: 4,
      img: "https://themewagon.github.io/restoran/img/menu-4.jpg",
      name: "Taco",
      description: "A spicy taco with seasoned ground beef, lettuce, and salsa",
      total: "8$",
    },
    {
      id: 5,
      img: "https://themewagon.github.io/restoran/img/menu-4.jpg",
      name: "Pad Thai",
      description:
        "A classic Thai dish with stir-fried noodles, shrimp, and peanuts",
      total: "11$",
    },
    {
      id: 6,
      img: "https://themewagon.github.io/restoran/img/menu-4.jpg",
      name: "Sushi Combo",
      description: "A combination of sushi rolls with tuna, salmon, and eel",
      total: "20$",
    },
    {
      id: 7,
      img: "https://themewagon.github.io/restoran/img/menu-4.jpg",
      name: "Chicken Curry",
      description: "A spicy Indian curry with chicken, potatoes, and carrots",
      total: "13$",
    },
    {
      id: 8,
      img: "https://themewagon.github.io/restoran/img/menu-4.jpg",
      name: "Pho",
      description:
        "A Vietnamese noodle soup with beef, bean sprouts, and herbs",
      total: "9$",
    },
  ];

  return (
    <Element name="menu" className="element">
      <div className="container grid grid-cols-1 gap-4 py-12 px-3 mx-auto">
      <ScrollAnimation animateIn="fadeInUp" animateOnce={true} delay={100}>

      <div className="heading flex flex-col justify-center items-center">
        <h5 className='relative font-semibold text-[#FE724C] text-[20px] font-pacifico after:content-[""] after:block after:w-[45px] after:h-[2px] after:bg-[#FE724C] after:absolute after:top-[50%] after:left-[-55px] before:content-[""] before:block before:w-[45px] before:h-[2px] before:bg-[#FE724C] before:absolute before:top-[50%] before:right-[-55px]'>
          Food Menu
        </h5>
        <h1 className="text-[40px] text-[#0F172B] font-extrabold font-[Nunito] leading-tight tracking-wider max-[415px]:text-center">
          Most Popular Items
        </h1>
      </div>
      </ScrollAnimation>

      <ScrollAnimation animateIn="fadeInUp" animateOnce={true} delay={100}>

      <div className="tab-content flex flex-col justify-center items-center">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              "@media (max-width: 950px)": {
                width: "80%",
                margin: "0 auto",
              },
              "@media (max-width: 765px)": {
                width: "70%",
                margin: "0 auto",
              },
              "@media (max-width: 415px)": {
                width: "88%",
                margin: "0 auto",
              },
              "& .MuiTabs-indicator": { backgroundColor: "#FE724C" },
              "& .MuiTab-root": {
                color: "#FE724C",
                "&.inactive": {
                  color: "#ffffff",
                },
                borderBottom: "1px solid #ccc",
              },
              "& .Mui-selected": { color: "transparent" },
              "& button.Mui-selected": { color: "transparent" },
              "@media (max-width: 600px)": {
                "& .MuiTab-root": {
                  // minWidth: "unset",
                  // width: "50%",
                }
              }
            }}
          >
            <Tab
              icon={
                <Icon
                  icon="ion:cafe"
                  className="text-[40px] text-[#FE724C]"
                ></Icon>
              }
              label={
                <div className="pl-[16px] flex flex-col flex-start">
                  <span className="text-[#666565] text-[12px] text-left">
                    Popular
                  </span>
                  <h6 className="text-[#0F172B] text-[14px] font-extrabold">
                    Breakfast
                  </h6>
                </div>
              }
              iconPosition="start"
            />
            <Tab
              icon={
                <Icon
                  icon="fa-solid:hamburger"
                  className="text-[40px] text-[#FE724C]"
                ></Icon>
              }
              label={
                <div className="pl-[16px] flex flex-col flex-start">
                  <span className="text-[#666565] text-[12px] text-left">
                    Special
                  </span>
                  <h6 className="text-[#0F172B] text-[14px] font-extrabold">
                    Lunch
                  </h6>
                </div>
              }
              iconPosition="start"
            />
            <Tab
              icon={
                <Icon
                  icon="icon-park-solid:knife-fork"
                  className="text-[40px] text-[#FE724C]"
                ></Icon>
              }
              label={
                <div className="pl-[16px] flex flex-col flex-start">
                  <span className="text-[#666565] text-[12px] text-left">
                    Lovely
                  </span>
                  <h6 className="text-[#0F172B] text-[14px] font-extrabold">
                    Dinner
                  </h6>
                </div>
              }
              iconPosition="start"
            />
          </Tabs>
          <div className="menuList mt-[50px] grid md:grid-cols-2 grid-cols-1 gap-6">
            {foodData.map((item: any, index: any) => (
              <MenuFoodCard item={item} key={index} />
            ))}
          </div>
      </div>
      </ScrollAnimation>

    </div>
    </Element>
  );
};

export default MenuList;
