import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { addCategoryDB, deleteCategoriesDB, deleteCategoryDB, getCategories, getCategoryDB, updateCategoryDB } from './api/category'
import { Category } from '@/types/category'


export const getListCategory = createAsyncThunk(
    'category/getListCategory', async () => {
        const response = await getCategories()
        return response
    }
)

export const getCategory = createAsyncThunk(
    'category/getCategory', async (id: number) => {
        const response = await getCategoryDB(id)
        return response
    }
)

export const addCategory = createAsyncThunk(
    'category/addCategory', async (params: any) => {
        const {name, description, token} = params
        const response = await addCategoryDB(name, description, token)
        return response
    }
)

export const updateCategory = createAsyncThunk(
    'category/updateCategory', async (params: any) => {
        const {id, name, description, token} = params
        const response = await updateCategoryDB(id, name, description, token)
        return response
    }
)

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory', async (params: any) => {
        const {id, token} = params
        const response = await deleteCategoryDB(id, token)
        return response
    }
)

export const deleteCategories = createAsyncThunk(
    'category/deleteCategories', async (params: any) => {
        const {ids, token} = params
        const response = await deleteCategoriesDB(ids, token)
        return response
    }
)

const initialState = {
    loading: false,
    listCategory: [] as Category[],
    categoryDetail: {},
    listIdDelete: [] as number[],
    error: null
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        updateIdsDelete: (state, action) => {
            state.listIdDelete = [...action.payload]
        }
    },
    extraReducers: builder => {
        builder

        //get list category
        .addCase(getListCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(getListCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.listCategory =  action.payload.data
        })
        .addCase(getListCategory.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.error.message;
        })

        //get category
        .addCase(getCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(getCategory.fulfilled, (state, action) => {
            state.categoryDetail =  action.payload
        })

        .addCase(getCategory.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.error.message;
          })

        //add category
        .addCase(addCategory.fulfilled, (state, action) => {
            state.listCategory = [action.payload, ...state.listCategory];
            state.error = null
        })

        .addCase(addCategory.rejected, (state, action: any) => {
            state.error = action.error.message
        })

        //update category
        .addCase(updateCategory.fulfilled, (state, action) => {
            const updatedCategoryIndex = state.listCategory.findIndex((category) => category.id === action.payload.id);
            if (updatedCategoryIndex !== -1) {
                state.listCategory[updatedCategoryIndex] = action.payload;
            }
            state.error = null
        })

        .addCase(updateCategory.rejected, (state, action: any) => {
            state.error = action.error.message
        })

        //delete category
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.listIdDelete.forEach((idToDelete) => {
                state.listCategory = state.listCategory.filter((category) => category.id !== idToDelete);
            });
            state.error = null
        })

        //delete categories
        .addCase(deleteCategories.fulfilled, (state, action) => {
            state.listIdDelete.forEach((idToDelete) => {
                state.listCategory = state.listCategory.filter((category) => category.id !== idToDelete);
            });
            state.error = null
        })

        .addCase(deleteCategories.rejected, (state, action: any) => {
            state.error = action.error.message
        })
    },
})

export const { updateIdsDelete } = categorySlice.actions
export default categorySlice.reducer