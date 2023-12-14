import React, { useRef, useState } from "react";
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
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormData } from "@/types/calendarForm";
import moment from "moment";
import { formatTime } from "@/utils/parse.util";

interface AddEventModalProps {
  staffs: any;
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  staffs,
  open,
  onClose,
  onSubmit,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const formRef = useRef<HTMLFormElement>(null);
  const [staffName, setStaffName] = useState('')

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
        title: staffName,
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
      <DialogTitle sx={{ textAlign: "center" }}>ADD SHIFT</DialogTitle>
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
                    value={staffName}
                    onChange={(e) => {setStaffName(e.target.value)}}
                    sx={{ height: "40px" }}
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
                  fullWidth
                  inputProps={{ min: today }}
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
                />
              </Grid>
              <Grid item xs={12} className="flex flex-col gap-2">
                <label htmlFor="end-time">
                  End time <span className="text-[red] ml-1">*</span>
                </label>
                <TextField
                  type="time"
                  id="end-time"
                  placeholder="start-time"
                  fullWidth
                />
              </Grid>
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
            className="bg-green-700 w-[100px]"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventModal;
