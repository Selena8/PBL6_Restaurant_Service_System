import React, { useEffect, useState } from "react";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import { Icon } from "@iconify/react";
import MenuFoodCard from "../MenuFoodCard";
import ScrollAnimation from "react-animate-on-scroll";
import { Element } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { getListCategory } from "@/store/apps/category";
import { AppDispatch } from "@/store";
import TabPanel from "@mui/lab/TabPanel";
import { Box } from "@mui/material";
import { getListMenu, selectMenus } from "@/store/apps/menu";
import TabContext from "@mui/lab/TabContext";

const MenuList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { listCategory } = useSelector((state: any) => state.category);
  const listMenu = useSelector(selectMenus);

  const firstValue = listCategory[1]?.id
  const [tab, setTab] = useState(firstValue || 10);

  const handleChange = (newValue: string) => {
    setTab(newValue);
  };
  const renderListMenu = (list: any, typeId: number) => {
    list =
      Object.keys(list).length !== 0
        ? list.filter((item: any) => item.categoryId === typeId)
        : [];
    return list.map((item: any) => <MenuFoodCard key={item.id} item={item} />);
  };

  useEffect(() => {
    dispatch(getListMenu({}));
    dispatch(getListCategory());
  }, []);

  let tabData: any[] = [];
  listCategory.map((item: any) => {
    tabData.push({
      id: item.id,
      label: item.name.toUpperCase(),
      component: renderListMenu(listMenu, item.id),
    });
  });
   
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
            <TabContext value={tab}>
              <TabList
                onChange={(_event, newValue) => handleChange(newValue)}
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
                    },
                  },
                }}
              >
                {tabData.map((tab) => (
                  <Tab
                    key={tab.id}
                    value={tab.id}
                    icon={tab.icon}
                    label={
                      <div className="pl-[16px] flex flex-col flex-start">
                        <h6 className="text-[#0F172B] text-[14px] font-extrabold">
                          {tab.label}
                        </h6>
                      </div>
                    }
                  />
                ))}
              </TabList>
              <div className="menuList flex justify-center items-center w-[90%] mx-auto gap-6">
                {tabData.map((tab) => (
                  <TabPanel key={tab.id} value={tab.id} sx={{width: "100%"}}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "2.5rem",
                        marginTop: "30px",
                        flexWrap: "wrap",
                      }}
                    >
                      {tab.component}
                    </Box>
                  </TabPanel>
                ))}
              </div>
            </TabContext>
          </div>
        </ScrollAnimation>
      </div>
    </Element>
  );
};

export default MenuList;
