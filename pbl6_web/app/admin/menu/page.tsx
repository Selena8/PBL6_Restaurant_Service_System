"use client"
import MenuList from '@/components/Menu/MenuList'
import { AppDispatch } from '@/store'
import { getListMenu, selectMenus, selectResultCount } from '@/store/apps/menu'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Menu = () => {
    const [valueSearch, setValueSearch] = useState("")
    const dispatch = useDispatch<AppDispatch>()
    const listMenu = useSelector(selectMenus)
    const resultCount = useSelector(selectResultCount)
    
    // useEffect(() => {
    //     dispatch(getListMenu({}))
    // }, [])

    useEffect(() => {
        if(valueSearch === "") {
            dispatch(getListMenu({}))
        }
    }, [valueSearch])

    const handleChange = (e: any) => {
        setValueSearch(e.target.value)
    }

    const handleSearch = () => {
        dispatch(getListMenu({Search: valueSearch}))
    }

    return (
        <Box>
            <MenuList listMenu={listMenu} resultCount={resultCount} valueSearch={valueSearch} handleTextSearch={handleChange} handleSearch={handleSearch}/>
        </Box>
    )
}

export default Menu