import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addTableDB, deleteTablesDB, getTableByIdDB, getTablesDB, updateTableDB } from './api/table'
import { Table } from '@/types/table'
import { RootState } from '@/store'

export const getTables = createAsyncThunk(
    'staff/getListTable', async (params: any) => {
        const {data, token} = params
        const response = await getTablesDB(data, token)
        return response
    }
)

export const getTableById = createAsyncThunk(
    'category/getTableById', async (params: any) => {
        const {id, token} = params
        const response = await getTableByIdDB(id, token)
        return response
    }
)

export const addTable = createAsyncThunk(
    'staff/addTable', async (params: any) => {
        const {data, token} = params
        const response = await addTableDB(data, token)
        return response
    }
)

export const updateTable = createAsyncThunk(
    'category/updateTable', async (params: any) => {
        const {data, token} = params
        const response = await updateTableDB(data, token)
        return response
    }
)

export const deleteTables = createAsyncThunk(
    'tale/deleteTable', async (params: any) => {
        const {ids, token} = params
        const response = await deleteTablesDB(ids, token)
        return response
    }
)


const initialState = {
    loading: false,
    listTable: [] as Table[],
    tableDetail: {
        bookings: [] as any[]
    },
    listIdDelete: [] as number[],
    error: null
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        updateIdsDelete: (state, action) => {
            state.listIdDelete = [...action.payload]
        }
    },
    extraReducers: builder => {
        builder

        //get list table
        .addCase(getTables.fulfilled, (state, action) => {
            state.listTable =  action.payload.data
        })

        //get table by id
        .addCase(getTableById.fulfilled, (state, action) => {
            state.tableDetail =  action.payload
        })

        //add table
        .addCase(addTable.fulfilled, (state, action) => {
            state.listTable = [...state.listTable, action.payload];
            state.error = null
        })

        .addCase(addTable.rejected, (state, action: any) => {
            state.error = action.error.message
        })


        //update table
        .addCase(updateTable.fulfilled, (state, action) => {
            const updatedTableIndex = state.listTable.findIndex((table) => table.id === action.payload.id);
            if (updatedTableIndex !== -1) {
                state.listTable[updatedTableIndex] = action.payload;
            }
            state.error = null
        })

        .addCase(updateTable.rejected, (state, action: any) => {
            state.error = action.error.message
        })

        //delete table
        .addCase(deleteTables.fulfilled, (state, action) => {
            state.listIdDelete.forEach((idToDelete) => {
                state.listTable = state.listTable.filter((table) => table.id !== idToDelete);
            });
            state.error = null
        })
    },
})

export const selectTables = (state: RootState) => state.table.listTable;
export const selectTableDetail = (state: RootState) => state.table.tableDetail;
export const { updateIdsDelete } = tableSlice.actions
export default tableSlice.reducer