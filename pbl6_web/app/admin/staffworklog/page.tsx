"use client";

import { AppDispatch } from "@/store";
import { approveWorkLogRequest, deleteWorkLogData, getListShifts, getListWorkLogs, rejectWorkLogRequest, selectShifts, selectWorkLogs, updateIdRequest, updateIdsDeleteWorkLogs } from "@/store/apps/shift";
import { localStorageClient } from "@/utils/localStorage";
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  GridColDef,
  GridRowSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Table from "@/components/Table";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextFieldWithIcon from "@/components/TextFieldWithIcon";
import ButtonWithIcon from "@/components/ButtonWithIcon";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { showMessage } from "@/utils/parse.util";
import ConfirmDelete from "@/components/ConfirmDelete";
interface MyState {
  start:  Dayjs | null;
  end: Dayjs | null;
  time: Dayjs | null;
  status: string;
}

const StaffWorkLog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorageClient.getItem("userToken");
  const listWorkLog = useSelector(selectWorkLogs);
  const [isDisableDelete, setIsDisableDelete] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
  const [searchBy, setSearchBy] = useState("All");
  const [value, setValue] = useState<MyState>({
    start: dayjs(),
    end: dayjs(),
    time: dayjs(),
    status: ""
  });
  const listShift = useSelector(selectShifts);


  useEffect(() => {
    dispatch(getListWorkLogs({ data: {}, token }));
    dispatch(getListShifts({ data: {}, token }));
  }, []);

  useEffect(() => {
    if(searchBy === "All"){
      dispatch(getListWorkLogs({ data: {}, token }));
    } else {
      handleSearch()
    }
  }, [value])

  useEffect(() => {
    if(rowSelectionModel.length === 0){
      setIsDisableDelete(true)
    } else {
      setIsDisableDelete(false)
    }
    dispatch(updateIdsDeleteWorkLogs(rowSelectionModel));
  }, [rowSelectionModel])

  const handleDelete = async () => {
    const res: any = await dispatch(deleteWorkLogData({ids: rowSelectionModel, token}))
    if(res.payload){
      showMessage("Delete category is successful", true)
      setConfirmDialog(false)
    } else {
      showMessage(res.error.message, false)
    }
  }

  const handleApprove = async (id: number) => {
    const res: any = await dispatch(approveWorkLogRequest({id, token}))
    if(res.payload){
      showMessage("Approve is successful!", true)
    } else {
      showMessage(res.error.message, false)
    }
  }

  const handleReject = async (id: number) => {
    const res: any = await dispatch(rejectWorkLogRequest({id, token}))
    if(res.payload){
      showMessage("reject is successful!", true)
    } else {
      showMessage(res.error.message, false)

    }
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, align: "center" },
    {
      field: "staffName",
      headerName: "Name",
      width: 200,
      editable: false,
      align: "center",
      renderCell: function render({ row }) {
        return (
          <Tooltip title={row.staffName} placement="top-start">
            <span style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{row.staffName}</span>
          </Tooltip>
        )
      }
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 200,
      editable: false,
      align: "center",
      renderCell: function render({ row }) {
        return (
          <Tooltip title={row.description} placement="top-start">
            <span style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{row.description}</span>
          </Tooltip>
        )
      }
    },
    {
      field: "startTime",
      headerName: "Start time",
      width: 170,
      editable: false,
      align: "center",
      valueGetter: (params: GridValueGetterParams<any, string>) => {
        return moment(params.value).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      field: "endTime",
      headerName: "End Time",
      width: 170,
      editable: false,
      align: "center",
      valueGetter: (params: GridValueGetterParams<any, string>) => {
        return moment(params.value).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      field: "startTimeShift",
      headerName: "Start Shift time",
      width: 170,
      editable: false,
      align: "center",
      renderCell: function render({ row }) {
        const shift = listShift.find((shift : any) => shift.id === row.shiftId)
        return moment(shift?.startTime).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      field: "endTimeShift",
      headerName: "End Shift Time",
      width: 170,
      editable: false,
      align: "center",
      renderCell: function render({ row }) {
        const shift = listShift.find((shift : any) => shift.id === row.shiftId)
        return moment(shift?.endTime).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: false,
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            padding: "8px",
            borderRadius: "16px",
            width: "100px",
            textAlign: "center",
            color: "#fff",
            background:
              params.value === 0
                ? "#ffc107"
                : params.value === 1
                ? "#28A745"
                : "#DC3545",
          }}
        >
          {params.value === 0
            ? "In progress"
            : params.value === 1
            ? "Done"
            : "Reject"}
        </div>
      ),
    },
    {
      headerName: "Actions",
      headerAlign: "center",
      field: "actions",
      minWidth: 130,
      align: "center",
      flex: 1,
      sortable: false,
      renderCell: function render({ row }) {
        return (
          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label="edit"
              style={{ color: row.status === 0 ? "#28A745" : "#D9D9D9", cursor: row.status === 0 ? "pointer" :"not-allowed" }}
              onClick={() => {
                if(row.status === 0){
                  dispatch(updateIdRequest(row.id))
                  handleApprove(row.id)
                }
              }}
            >
              <CheckCircleIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              style={{ color: row.status === 0 ? "#F44336" : "#D9D9D9", cursor: row.status === 0 ? "pointer" : "not-allowed" }}
              onClick={() => {
                if(row.status === 0){
                  dispatch(updateIdRequest(row.id))
                  handleReject(row.id)
                }
              }}
            >
              <CancelIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const handleChangeSelected = (event: SelectChangeEvent) => {
    setSearchBy(event.target.value as string);
    if(event.target.value === "All"){
      dispatch(getListWorkLogs({ data: {}, token }));
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prevValue) => ({
      ...prevValue,
      status: (event.target as HTMLInputElement).value,
    }));
  };
  
  const handleSearch = () => {
    if(searchBy === "Time") {
      dispatch(getListWorkLogs({
        data : {
            StartDate: value.start?.format('YYYY-MM-DD'),
            EndDate: value.end?.format('YYYY-MM-DD')
        },
        token
    }))
  } else {
    dispatch(getListWorkLogs({
      data : {
          [searchBy]: searchBy === "Status" ? value.status : value.time?.format('YYYY-MM-DD'),
      },
      token
  }))
  }

}
  

  return (
    <div>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 8px",
        }}
      >
        <Box sx={{ width: "80%", display: "flex", gap: "20px" }}>
          <FormControl className="w-[30%] bg-white">
            <InputLabel id="demo-simple-select-label" sx={{ top: "-5px" }}>
              Search by
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchBy}
              label="SearchBy"
              onChange={handleChangeSelected}
              sx={{ height: "40px" }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Time">Time</MenuItem>
              <MenuItem value="StartDate">Start date</MenuItem>
              <MenuItem value="EndDate">End date</MenuItem>
              <MenuItem value="Status">Status</MenuItem>
            </Select>
          </FormControl>
          {["StartDate", "EndDate"].includes(searchBy) ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  "&": {
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                    },
                    "& .MuiInputLabel-outlined": {
                      position: "absolute",
                      top: "-5px",
                      color: "rgba(0, 0, 0, 0.54) !important",
                      transition: "all 0.2s",
                    },
                    "& .MuiOutlinedInput-root:focus-within .MuiInputLabel-outlined":
                      {
                        top: "0",
                      },
                  },
                }}
                label={searchBy === "StartDate" ? "Start Date" : "End Date"}
                value={value.time}
                onChange={(newValue: Dayjs | null) =>
                  setValue((prevValue) => ({ ...prevValue, time: newValue }))
                }
              />
            </LocalizationProvider>
          ) :  (
            searchBy === "status" ? (<RadioGroup
              aria-labelledby="demo-error-radios"
              name="status"
              value={value.status}
              onChange={handleRadioChange}
              className="w-[300px] h-[40px] flex"
            >
              <FormControlLabel
                value={0}
                control={
                  <Radio
                    sx={{
                      color: "#ffc107",
                      "&.Mui-checked": {
                        color: "#ffc107",
                      },
                    }}
                  />
                }
                label="In progress"
              />
              <FormControlLabel
                value={1}
                control={
                  <Radio
                    sx={{
                      color: "#28a745",
                      "&.Mui-checked": {
                        color: "#28a745",
                      },
                    }}
                  />
                }
                label="Done"
              />
              <FormControlLabel
                value={2}
                control={
                  <Radio
                    sx={{
                      color: "#f44336",
                      "&.Mui-checked": {
                        color: "#f44336",
                      },
                    }}
                  />
                }
                label="Reject"
              />
            </RadioGroup>
          ) : (
            searchBy === "Time" && (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  "&": {
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                    },
                    "& .MuiInputLabel-outlined": {
                      position: "absolute",
                      top: "-5px",
                      color: "rgba(0, 0, 0, 0.54) !important",
                      transition: "all 0.2s",
                    },
                    "& .MuiOutlinedInput-root:focus-within .MuiInputLabel-outlined":
                      {
                        top: "0",
                      },
                  },
                }}
                label="Start Date"
                value={value.start}
                onChange={(newValue: Dayjs | null) =>
                  setValue((prevValue) => ({ ...prevValue, start: newValue }))
                }
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  "&": {
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                    },
                    "& .MuiInputLabel-outlined": {
                      position: "absolute",
                      top: "-5px",
                      color: "rgba(0, 0, 0, 0.54) !important",
                      transition: "all 0.2s",
                    },
                    "& .MuiOutlinedInput-root:focus-within .MuiInputLabel-outlined":
                      {
                        top: "0",
                      },
                  },
                }}
                label="End Date"
                value={value.end}
                onChange={(newValue: Dayjs | null) =>
                  setValue((prevValue) => ({ ...prevValue, end: newValue }))
                }
              />
            </LocalizationProvider>
              </>
            )
          ))}
        </Box>
        <ButtonWithIcon
          icon={<RemoveCircleIcon />}
          label="DELETE"
          bgColor={isDisableDelete ? "rgb(217 217 217)" : "#DC3545"}
          onClick={() => setConfirmDialog(true)}
        />
      </Box>
      <Table
        rows={listWorkLog}
        columns={columns}
        rowSelectionModel={rowSelectionModel}
        setRowSelectionModel={setRowSelectionModel}
        checkboxSelection={true}
      />
      <ConfirmDelete
        title="work log"
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default StaffWorkLog;
