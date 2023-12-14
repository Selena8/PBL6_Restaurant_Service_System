import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { pickBy } from "lodash";
import { addShift, approveRequest, deleteShift, deleteWorkLogs, editShift, getShiftById, getShifts, getWorkLogs, rejectRequest } from "./api/shift";

export const getListShifts = createAsyncThunk(
  "appShifts/getListShifts",
  async (params: any) => {
    const {data, token} = params
    const paramsFilter = pickBy(data);
    const response = await getShifts({ ...paramsFilter, limit: 300 }, token);

    return response;
  }
);

export const getShiftDataById = createAsyncThunk(
    "appShifts/getShiftDataById",
    async (params: any) => {
      const {id, token} = params
      const response = await getShiftById(id, token);
  
      return response;
    }
  );

export const addShiftData = createAsyncThunk(
    'appShifts/addShift', async (params: any) => {
        const {data, token} = params
        const response = await addShift(data, token)
        return response
    }
)

export const editShiftData = createAsyncThunk(
    'appShifts/editShift', async (params: any) => {
        const {data, token, id} = params
        const response = await editShift(data, token, id)
        return response
    }
)

export const deleteShiftData = createAsyncThunk(
    'appShifts/deleteShift', async (params: any) => {
        const {id, token} = params
        const response = await deleteShift(id, token)
        return response
    }
)

export const getListWorkLogs = createAsyncThunk(
    "appShifts/getListWorkLogs",
    async (params: any) => {
      const {data, token} = params
      const paramsFilter = pickBy(data);
      const response = await getWorkLogs({ ...paramsFilter, limit: 300 }, token);
  
      return response;
    }
);

export const deleteWorkLogData = createAsyncThunk(
    'appShifts/deleteListWorkLog', async (params: any) => {
        const {ids, token} = params
        const response = await deleteWorkLogs(ids, token)
        return response
    }
)

export const approveWorkLogRequest = createAsyncThunk(
    'appShifts/approveWorkLogRequest', async (params: any) => {
        const {id, token} = params
        const response = await approveRequest(id, token)
        return response
    }
)

export const rejectWorkLogRequest = createAsyncThunk(
    'appShifts/rejectWorkLogRequest', async (params: any) => {
        const {id, token} = params
        const response = await rejectRequest(id, token)
        return response
    }
)

const initialState = {
    listShift: [] as any[],
    listWorkLog: [] as any[],
    shiftDetail: {},
    idDelete: null,
    idRequest: null,
    listIdDeleteWorkLogs: [] as any[],
    error: null,
    loading: false,
}

const shiftSlice = createSlice({
    name: 'shift',
    initialState,
    reducers: {
        updateIdDelete: (state, action) => {
            state.idDelete = action.payload
        },
        updateIdRequest: (state, action) => {
            state.idRequest = action.payload
        },
        updateIdsDeleteWorkLogs: (state, action) => {
            state.listIdDeleteWorkLogs = [...action.payload]
        }
    },
    extraReducers: builder => {
        builder

        // get list shifts
        .addCase(getListShifts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getListShifts.fulfilled, (state, action) => {
            state.loading = false;
            state.listShift = action.payload.data;
        })
        .addCase(getListShifts.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.error.message;
        })

        //get shift by id
        .addCase(getShiftDataById.fulfilled, (state, action) => {
            state.shiftDetail = action.payload.data;
        })

        //add shift
        .addCase(addShiftData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addShiftData.fulfilled, (state, action) => {
            state.loading = false;
            state.listShift = [...state.listShift, action.payload];
            state.shiftDetail = action.payload.data;
        })
        .addCase(addShiftData.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.error.message;
            state.listShift = [...state.listShift];
        })

        //edit shift
        .addCase(editShiftData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(editShiftData.fulfilled, (state, action) => {
            state.loading = false;
            state.shiftDetail = action.payload.data;
            const updatedIndex = state.listShift.findIndex((food: any) => food.id === action.payload.id);
            if (updatedIndex !== -1) {
                state.listShift[updatedIndex] = action.payload;
            }
        })
        .addCase(editShiftData.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.error.message;
            state.listShift = [...state.listShift];
        })

        //delete shift
        .addCase(deleteShiftData.fulfilled, (state, action) => {
            state.listShift = state.listShift.filter((item: any) => {
                return item.id != state.idDelete
            });
        })

        // get list worklogs
        .addCase(getListWorkLogs.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getListWorkLogs.fulfilled, (state, action) => {
            state.loading = false;
            state.listWorkLog = action.payload.data;
        })
        .addCase(getListWorkLogs.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.error.message;
        })

        //delete worklog
        .addCase(deleteWorkLogData.fulfilled, (state, action) => {
            state.listIdDeleteWorkLogs.forEach((idToDelete) => {
                state.listWorkLog = state.listWorkLog.filter((worklog) => worklog.id !== idToDelete);
            });
            state.error = null
        })


        //approve request
        .addCase(approveWorkLogRequest.fulfilled, (state, action) => {
            const updatedIndex = state.listWorkLog.findIndex((worklog: any) => worklog.id === state.idRequest);
            state.listWorkLog[updatedIndex].status = 1
        })

        //reject request
        .addCase(rejectWorkLogRequest.fulfilled, (state, action) => {
            const updatedIndex = state.listWorkLog.findIndex((worklog: any) => worklog.id === state.idRequest);
            state.listWorkLog[updatedIndex].status = 2

        })
    },
})
export const { updateIdDelete, updateIdRequest, updateIdsDeleteWorkLogs } = shiftSlice.actions

export const selectShifts = (state: RootState) => state.shift.listShift;
export const selectWorkLogs = (state: RootState) => state.shift.listWorkLog;
export default shiftSlice.reducer;