import { configureStore } from '@reduxjs/toolkit'

// Reducers
import auth from './apps/auth'
import category from './apps/category'
import menu from './apps/menu'
import staff from './apps/staff'
import order from './apps/order'
import table from './apps/table'
import shift from './apps/shift'
import _static from './apps/static'

export const store = configureStore({
    reducer: {
        auth: auth,
        category: category,
        menu: menu,
        staff: staff,
        order: order,
        table: table,
        shift: shift,
        static: _static
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>