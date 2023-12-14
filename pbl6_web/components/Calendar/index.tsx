"use client";

import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import {
  EventDropArg,
} from "@fullcalendar/core/index.js";
import AddEventModal from "./AddEvent";
import { FormData } from "@/types/calendarForm";
import EditEventModal from "./EditEvent";
import { useDispatch, useSelector } from "react-redux";
import {
  addShiftData,
  deleteShiftData,
  editShiftData,
  getListShifts,
  selectShifts,
  updateIdDelete,
} from "@/store/apps/shift";
import { AppDispatch } from "@/store";
import { localStorageClient } from "@/utils/localStorage";
import { status } from "./const";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import SidebarLeft from "./SideBarLeft";
import { getStaffs } from "@/store/apps/staff";
import ConfirmDelete from "@/components/ConfirmDelete";
import { showMessage } from "@/utils/parse.util";

const Calendar: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorageClient.getItem("userToken");
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const listShift = useSelector(selectShifts);
  const listStaff = useSelector(
    (state: any) => state.staff.listStaff
  )
  const [staffs, setStaff] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([]);
  const [currEvent, setCurrEvent] = useState({});
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [selectedDate, setSelectedDate] = useState(today);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isOpenPopover, setIsOpenPopover] = useState(false) 
  const calendarRef = useRef(null);

  useEffect(() => {
    dispatch(getListShifts({ data: {}, token }));
    dispatch(getStaffs({data: {}, token}))
  }, []);
  useEffect(() => {
    let listEvent: any[] = [];
    listShift.map((shift: any) => {
      listEvent.push({
        id: shift.id,
        title: shift.staffName,
        start: shift.workDate.slice(0, 10),
        extendedProps: {
          startTime: shift.startTime,
          endTime: shift.endTime,
          status: shift.status,
          userId: shift.userId,
          workLog: shift.workLog
        },
        backgroundColor: status[shift.status as keyof typeof status],
      });
    });
    setEvents(listEvent);
  }, [listShift]);

  useEffect(() => {
    let dataStaffs: any[] = [];
    listStaff.map((staff: any) => {
      dataStaffs.push({
        id: staff.id,
        username: staff.lastName + " " + staff.firstName
      });
    });
    setStaff(dataStaffs);
  }, [listStaff])

  useEffect(() => {
    const popover = document.querySelector('.fc-popover') as HTMLElement | null;
    if (popover) {
      popover.style.display = isOpenPopover ? 'block' : 'none';
    }
  }, [isOpenPopover]);
  

  const handleEventAdd = () => {
    setIsAddEventModalOpen(true);
  };

  const handleEventEdit = (event: any) => {
    setIsOpenPopover(false)
    setCurrEvent({
      id: event.event._def.publicId,
      title: event.event._def.title,
      userId: event.event._def.extendedProps.userId,
      start: event.event._instance.range.start,
      startTime: event.event._def.extendedProps.startTime,
      endTime: event.event._def.extendedProps.endTime,
      status: event.event._def.extendedProps.status,
      backgroundColor: event.event._def.ui.backgroundColor,
      workLog: event.event._def.extendedProps.workLog,
    });
    setIsEditEventModalOpen(true);
  };

  const handleEventDelete = async (id: string) => {
    const res = await dispatch(deleteShiftData({ id, token }));
    setConfirmDialog(false);
    setEvents(events.filter((event: any) => event.id != id));
    if (res.payload) {
      showMessage("Delete shift successfully", true)
      return;
    }
    showMessage("Delete shift failed!", false)
  };

  const handleEventDrop = (info: EventDropArg) => {
    let data = {};
    events.forEach((event) => {
      if (event.id === +info.event.id) {
        data = {
          workDate: moment(info.event.start).format("YYYY-MM-DD"),
          startTime: event.extendedProps.startTime,
          endTime: event.extendedProps.endTime,
          userId: event.extendedProps.userId,
        };
      }
    });
    dispatch(editShiftData({ data, token, id: +info.event.id }));
  };

  const handleAddEventSubmit = async (formData: FormData) => {
    const title = formData.title;
    const startDate = formData.startDate;
    const startTime = formData.startTime;
    const endTime = formData.endTime;

    const data: any = {
      workDate: startDate,
      startTime: startDate + "T" + startTime,
      endTime: startDate + "T" + endTime,
      userId: title,
    };

    setIsAddEventModalOpen(false);
    const res = await dispatch(addShiftData({ data, token }));
    if (res.payload) {
      showMessage("Add shift successfully", true)
      return;
    }
    showMessage("Add shift failed!", true)
  };
  const handleEditEventSubmit = async (formData: FormData) => {
    const id = formData.id;
    const userId = formData.title;
    const startDate = formData.startDate;
    const startTime = formData.startTime;
    const endTime = formData.endTime;

    const data: any = {
      workDate: startDate,
      startTime: startDate + "T" + startTime,
      endTime: startDate + "T" + endTime,
      userId: userId,
    };

    setIsEditEventModalOpen(false);
    const res = await dispatch(editShiftData({ data, token, id }));
    if (res.payload) {
      showMessage("Updated shift successfully", true)
      return;
    }
    showMessage("Update shift failed!", true)
  };
  const eventContent = (arg: any) => {
    const eventId = arg.event.id;

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginLeft: "5px",
        }}
      >
        <IconButton
          aria-label="delete"
          className="absolute top-[-9px] right-[-3px] text-white"
          onClick={(e) => {
            e.stopPropagation();
            setConfirmDialog(true);
            setIdDelete(eventId);
            dispatch(updateIdDelete(+eventId));
          }}
          sx={{ display: "block", padding: "0", marginRight: "5px" }}
        >
          <DeleteIcon sx={{ width: "18px" }} />
        </IconButton>
        <div>{arg.event.title}</div>
      </div>
    );
  };

  return (
    <div className="max-w-800 mx-auto h-[100%] relative">
      <div id="calendar" className="relative flex">
        <SidebarLeft staffs={staffs} handleEventAdd={handleEventAdd} dispatch={dispatch} token={token}></SidebarLeft>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            start: "title datePickerButton",
            center: '',
            end: "today prev,next",
          }}
          customButtons={{
            datePickerButton: {
              click: () => {
                setIsDatePickerOpen(prevState => !prevState);
              },
            }
          }}
          ref={calendarRef}
          initialView="dayGridMonth"
          events={events}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: false,
          }}
          editable={true}
          selectable={true}
          eventClick={handleEventEdit}
          eventDrop={handleEventDrop}
          eventContent={eventContent}
          dayMaxEventRows={3}
          dateClick={handleEventAdd}
          moreLinkClick={() => setIsOpenPopover(true)}
        />
        {isDatePickerOpen && (
          <Box sx={{ position: "absolute", top: "64px", left: "18%", zIndex: "10", border: "1px solid black", background: "white" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={dayjs(selectedDate)}
                onChange={(date) => {
                  if (date) {
                    setSelectedDate(date.format("YYYY-MM-DD"));
                    setIsDatePickerOpen(false);
                    const calendarInstance = calendarRef.current as any;
                    if (calendarInstance) {
                      const calendarApi = calendarInstance.getApi();
                      calendarApi.gotoDate(date.format("YYYY-MM-DD"));
                      calendarApi.select(date.format("YYYY-MM-DD"));
                    }
                  }
                }}
              />
            </LocalizationProvider>
          </Box>
        )}
      </div>

      {/* Add Event Modal */}
      <AddEventModal
        staffs={staffs}
        open={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onSubmit={handleAddEventSubmit}
      />

      {/* Edit Event Modal */}
      <EditEventModal
        staffs={staffs}
        currEvent={currEvent}
        open={isEditEventModalOpen}
        onClose={() => setIsEditEventModalOpen(false)}
        onSubmit={handleEditEventSubmit}
      />

      {/* Delete Event Modal */}
      <ConfirmDelete
        title="calendar"
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        handleDelete={() => handleEventDelete(idDelete)}
      />
    </div>
  );
};

export default Calendar;
