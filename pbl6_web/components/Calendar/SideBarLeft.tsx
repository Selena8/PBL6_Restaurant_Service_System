// ** MUI Imports
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box, FormControl, InputLabel, MenuItem, RadioGroup, Select } from "@mui/material";
import { getListShifts } from "@/store/apps/shift";
import { useState } from "react";

const SidebarLeft = (props: any) => {
  const { staffs, handleEventAdd, dispatch, token } = props;
  const [staffName, setStaffName] = useState('view_all')

  const handleChangeStaffRadio = (e: any) => {
    setStaffName(e.target.value)
    if (e.target.value === "view_all") {
      dispatch(getListShifts({ data: {}, token }));
    }else dispatch(getListShifts({ data: { UserId: e.target.value }, token }));
  };
  const handleChangeStatusRadio = (e: any) => {
    if (e.target.value === "view_all") {
      dispatch(getListShifts({ data: {}, token }));
    } else dispatch(getListShifts({ data: { Status: e.target.value }, token }));
  };
  const renderStaffs = staffs.length
    ? staffs.map(({ id, username }: any) => (
        <MenuItem value={id}>{username}</MenuItem>
      ))
    : null;

  return (
    <Box
      sx={{
        width: "330px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: "15px 25px",
        borderRight: "1px solid #DDDDDD",
      }}
    >
      <Button
        fullWidth
        variant="contained"
        sx={{
          color: "white !important",
          backgroundColor: "#15803D !important",
        }}
        onClick={handleEventAdd}
      >
        Add Shift
      </Button>

      <Typography
        variant="body2"
        sx={{ mt: 4, mb: 4, textTransform: "uppercase" }}
      >
        Staffs
      </Typography>
      <FormControl className='w-full bg-white'>
        <InputLabel id="demo-simple-select-label" sx={{top: "-5px"}}>Staff's name</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={staffName}
            label="Staff's name"
            onChange={handleChangeStaffRadio}
            sx={{height: "40px"}}
            defaultValue="view_all"
        >
          <MenuItem value={"view_all"}>View All</MenuItem>
          {renderStaffs}
        </Select>
      </FormControl>

      <Typography
        variant="body2"
        sx={{ mt: 4, mb: 1.5, textTransform: "uppercase" }}
      >
        Status
      </Typography>
      <RadioGroup defaultValue="view_all">
        <FormControlLabel
          value="view_all"
          label="View All"
          sx={{ mr: 0, mb: 0.5 }}
          control={<Radio onChange={handleChangeStatusRadio} />}
        />
        <FormControlLabel
          label="New Shift"
          value="0"
          sx={{
            mr: 0,
            mb: 0.5,
          }}
          control={
            <Radio
              sx={{
                color: "#ffc107",
                "&.Mui-checked": {
                  color: "#ffc107",
                },
              }}
              onChange={handleChangeStatusRadio}
            />
          }
        />
        <FormControlLabel
          label="Worked Shift"
          value="1"
          sx={{
            mr: 0,
            mb: 0.5,
          }}
          control={
            <Radio
              sx={{
                color: "#28a745",
                "&.Mui-checked": {
                  color: "#28a745",
                },
              }}
              onChange={handleChangeStatusRadio}
            />
          }
        />
        <FormControlLabel
          label="Canceled Shift"
          value="2"
          sx={{
            mr: 0,
            mb: 0.5,
          }}
          control={
            <Radio
              sx={{
                color: "#f44336",
                "&.Mui-checked": {
                  color: "#f44336",
                },
              }}
              onChange={handleChangeStatusRadio}
            />
          }
        />
      </RadioGroup>
    </Box>
  );
};

export default SidebarLeft;
