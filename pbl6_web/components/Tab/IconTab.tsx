// ** MUI Imports
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import ButtonWithIcon from "../ButtonWithIcon";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useRouter } from "next/navigation";
import TextFieldWithIcon from "../TextFieldWithIcon";
import { useSelector } from "react-redux";

export interface TabProps {
  tabData: any[];
  value: string;
  onChange: (newValue: string) => void;
  valueSearch?: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSearch: () => void
}

const IconTab: React.FC<TabProps> = (props) => {

  const { value, onChange, tabData, valueSearch, handleChange, handleSearch } = props;

  const router = useRouter()

  const handleAdd = () => {
    router.push(`menu/add`)
  }

  return (
    <TabContext value={value}>
      <Box sx={{ display: "flex", alignItems: "center",  justifyContent: "space-between", width: "98%" }}>
        <TabList
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
            "&": {
              minHeight: "100px",
              alignItems: "center"
            },
            "& .MuiTabs-flexContainer": {
              gap: "30px",
            },
            "& .MuiTabs-scroller": {
              height: "70px",
            },
            "& .MuiTabs-indicator": { display: "none" },
            "& .MuiTab-root": {
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              minHeight: "60px",
              "&.inactive": {
                color: "#ffffff",
              },
            },
            "& .Mui-selected": { color: "transparent" },
            "& button.Mui-selected": {
              color: "#FFF",
              backgroundColor: "#FE724C",
              borderRadius: "8px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            },
            "@media (max-width: 600px)": {
              "& .MuiTab-root": {
                // minWidth: "unset",
                // width: "50%",
              },
            },
            ".MuiTabs-scrollButtons.Mui-disabled": {
              opacity: 0.3
            }
          }}
          onChange={(_event, newValue) => onChange(newValue)}
        >
          {tabData.map((tab) => (
            <Tab
              key={tab.id}
              value={tab.id}
              label={tab.label}
              icon={tab.icon}
              sx={{
                display: "flex",
                flexDirection: "row",
                fontSize: "16px",
                fontWeight: "semibold",
              }}
            />
          ))}
        </TabList>
        <TextFieldWithIcon 
          value={valueSearch || ""}
          onChange={handleChange}
          onClick={handleSearch}
        />
      </Box>
      {tabData.map((tab) => (
        <TabPanel key={tab.id} value={tab.id}>
          <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <span>{`${tab.component.length} results`}</span>
            <ButtonWithIcon
              icon={<AddCircleIcon />}
              label=" ADD"
              bgColor="#28A745"
              onClick={handleAdd}
            />
          </Box>
          <Box sx={{display: "flex", gap: "2.5rem", marginTop: "30px", flexWrap: "wrap"}}>{tab.component}</Box>
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default IconTab;
