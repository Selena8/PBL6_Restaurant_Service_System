import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pickBy } from "lodash";
import { fetchListMenu, fetchMenuDetail, addMenu, deleteMenu, updateMenu, updateAvatar } from "./api/menu";
import { RootState } from "@/store";

export const getListMenu = createAsyncThunk(
  "appMenu/getListMenu",
  async (params: any) => {
    const paramsFilter = pickBy(params);
    const response = await fetchListMenu({ ...paramsFilter, limit: 300 });

    return response;
  }
);

export const getMenuDetail = createAsyncThunk(
  "appMenu/fetchMenuDetail",
  async (id: number) => {
    const response = await fetchMenuDetail(id);

    return response;
  }
) as any;

export const addMenuData = createAsyncThunk(
  'appMenu/addMenu', async (params: any) => {
      const {data, token} = params
      const response = await addMenu(data, token)
      return response
  }
)

export const updateMenuData = createAsyncThunk(
  'appMenu/updateMenu', async (params: any) => {
      const {id, data, token} = params
      const response = await updateMenu(id, data, token)
      return response
  }
)

export const deleteMenuData = createAsyncThunk(
  'appMenu/deleteMenu', async (params: any) => {
      const {id, token} = params
      const response = await deleteMenu(id, token)
      return response
  }
)

export const updateAvatarFood = createAsyncThunk(
  'users/updateAvatarUser', async (params: any) => {
      const {id, formData, token} = params
      const response = await updateAvatar(id, formData, token)  
      return response
  }
)

const initialState = {
  loading: false,
  listMenu: [] as any[],
  menuDetail: {},
  listIdDelete: [] as number[],
  count: null,
  error: null,
  categoryId: 30,
  imageUrl: ''
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    updateIdsDelete: (state, action) => {
      state.listIdDelete = [...state.listIdDelete, action.payload]
    },
    updateIdCategory: (state, action) => {
      state.categoryId = action.payload
    },
    updateImageUrl: (state, action) => {
      state.imageUrl = action.payload
    }
  },
  extraReducers: (builder) => {
    builder

      // get list menu
      .addCase(getListMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.count = null;
      })
      .addCase(getListMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.listMenu = action.payload.data;
        state.count = action.payload.count;
      })
      .addCase(getListMenu.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error.message;
        state.count = null;
      })

      // get detail menu
      .addCase(getMenuDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMenuDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.menuDetail = action.payload;
      })
      .addCase(getMenuDetail.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // add menu
      .addCase(addMenuData.fulfilled, (state, action) => {
        state.listMenu = [...state.listMenu, action.payload];
        state.menuDetail = action.payload
      })
      .addCase(addMenuData.rejected, (state, action: any) => {
        state.listMenu = [...state.listMenu];
        state.error = action.error.message;
      })

      //update menu
      .addCase(updateMenuData.fulfilled, (state, action) => {
        const updatedMenuIndex = state.listMenu.findIndex((food: any) => food.id === action.payload.id);
        if (updatedMenuIndex !== -1) {
        state.listMenu[updatedMenuIndex] = action.payload;
        }
      })
      .addCase(updateMenuData.rejected, (state, action: any) => {
        state.listMenu = [...state.listMenu];
        state.error = action.error.message;
      })

      // delete menu
      .addCase(deleteMenuData.fulfilled, (state, action) => {
        state.listIdDelete.forEach((idToDelete) => {
          state.listMenu = state.listMenu.filter((item: any) => {
            return item.id !== idToDelete
          });
      });
      })
  },
});

export const { updateIdsDelete, updateIdCategory } = menuSlice.actions

export const selectMenus = (state: RootState) => state.menu.listMenu;
export const selectResultCount = (state: RootState) => state.menu.count;
export const selectMenuDetailData = (state: RootState) => state.menu.menuDetail;
export default menuSlice.reducer;
