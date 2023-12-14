import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormData } from "@/types/calendarForm";
import moment from "moment";
import { formatDate, formatDatetime, formatTime } from "@/utils/parse.util";
import { title } from "process";

interface EditEventModalProps {
  staffs: any;
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  currEvent: any;
}

const EditEventModal: React.FC<EditEventModalProps> = ({
  staffs,
  currEvent,
  open,
  onClose,
  onSubmit,
}) => {
  const [data, setData] = useState({
    id: "",
    userId: "",
    title: "",
    startDate: "",
    startTime: "",
    endTime: "",
    workLog: null,
    status: null
  });

  useEffect(() => {
    setData({
      ...data,
      id: currEvent.id,
      userId: currEvent.userId,
      title: currEvent.title,
      startDate: formatDate(currEvent.start),
      startTime: currEvent.startTime,
      endTime: currEvent.endTime,
      workLog: currEvent.workLog,
      status: currEvent.status
    });
  }, [currEvent]);
  const today = new Date().toISOString().split("T")[0];
  const isEditable = data.startDate < today || data.status !== 1;

  const formRef = useRef<HTMLFormElement>(null);

  const handleClose = () => {
    const form = formRef.current;
    if (form) {
      form.reset();
    }
    onClose();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = formRef.current;
    if (form) {
      const formData: any = {
        id: currEvent.id,
        title: data?.userId,
        startDate: (form.elements.namedItem("start-date") as HTMLInputElement)
          .value,
        endDate: (form.elements.namedItem("start-date") as HTMLInputElement)
          .value,
        startTime: (form.elements.namedItem("start-time") as HTMLInputElement)
          .value,
        endTime: (form.elements.namedItem("end-time") as HTMLInputElement)
          .value,
      };

      onSubmit(formData);

      // Reset the event form
      form.reset();
    }
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "500px",
            left: "6%",
          },
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center" }}>EDIT SHIFT</DialogTitle>
      <Divider />
      <DialogContent className="py-4">
        <Box className="flex flex-col gap-4">
          <form ref={formRef} onSubmit={handleSubmit}>
            <Box className="flex flex-col gap-4">
              <Grid item xs={12} className="flex flex-col gap-2">
                <label htmlFor="event-title">
                  Staff's name <span className="text-[red] ml-1">*</span>
                </label>
                <FormControl className="w-full bg-white">
                  <Select
                    id="event-title"
                    value={data?.userId}
                    onChange={(e) => setData({ ...data, userId: e.target.value })}
                    sx={{ height: "40px" }}
                    disabled={!isEditable}
                  >
                    {staffs.length
                      ? staffs.map(({ id, username }: any) => (
                          <MenuItem value={id}>{username}</MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} className="flex flex-col gap-2">
                <label htmlFor="start-date">
                  Start date <span className="text-[red] ml-1">*</span>
                </label>
                <TextField
                  type="date"
                  id="start-date"
                  placeholder="start-date"
                  required
                  value={formatDate(data.startDate)}
                  onChange={(e) =>
                    setData({ ...data, startDate: e.target.value })
                  }
                  fullWidth
                  inputProps={{ min: today }}
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12} className="flex flex-col gap-2">
                <label htmlFor="start-time">
                  Start time <span className="text-[red] ml-1">*</span>
                </label>
                <TextField
                  type="time"
                  id="start-time"
                  placeholder="start-time"
                  fullWidth
                  value={formatTime(data.startTime)}
                  onChange={(e) =>
                    setData({
                      ...data,
                      startTime: data.startDate + "T" + e.target.value,
                    })
                  }
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12} className="flex flex-col gap-2">
                <label htmlFor="end-time">
                  End time <span className="text-[red] ml-1">*</span>
                </label>
                <TextField
                  type="time"
                  id="end-time"
                  placeholder="end-time"
                  fullWidth
                  value={formatTime(data.endTime)}
                  onChange={(e) =>
                    setData({
                      ...data,
                      endTime: data.startDate + "T" + e.target.value,
                    })
                  }
                  disabled={!isEditable}
                />
              </Grid>
              {data.workLog !== null && <Grid item xs={12} className="flex flex-col gap-2">
                <label htmlFor="checkin-time">
                  Checkin time
                </label>
                <TextField
                  type="datetime"
                  id="checkin-time"
                  placeholder="checkin-time"
                  fullWidth
                  value={formatDatetime((data.workLog as any)?.checkInTime)}
                  disabled
                />
              </Grid>}
              {data.workLog !== null && <Grid item xs={12} className="flex flex-col gap-2">
                <label htmlFor="checkout-time">
                  Checkout time
                </label>
                <TextField
                  type="datetime"
                  id="checkout-time"
                  placeholder="end-time"
                  fullWidth
                  value={formatDatetime((data.workLog as any)?.checkOutTime)}
                  disabled
                />
              </Grid>}
              {data.workLog !== null && <Grid item xs={12} className="flex flex-col gap-2">
                <label htmlFor="total-time">
                  Total time
                </label>
                <TextField
                  type="text"
                  id="total-time"
                  placeholder="end-time"
                  fullWidth
                  value={(data.workLog as any)?.totalTime}
                  disabled
                />
              </Grid>}
            </Box>
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box className="flex justify-between px-4 py-2 !ml-0 w-full">
          <Button
            variant="contained"
            className="bg-[#D9D9D9] hover:bg-[#D9D9D9] hover:opacity-90 text-black"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="bg-green-700 hover:bg-green-600 w-[100px]"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditEventModal;
