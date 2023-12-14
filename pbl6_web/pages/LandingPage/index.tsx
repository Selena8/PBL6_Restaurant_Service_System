"use client"

import About from "@/components/About"
import BookingTable from "@/components/BookingTable"
import Header from "@/components/Header"
import MenuList from "@/components/MenuList"
import Member from "@/components/Member"
import Service from "@/components/Service"
import Footer from "@/components/Footer"

const LandingPage = () => {
    return (
        <div >
            <Header/>
            <Service/>
            <About/>
            <MenuList/>
            <BookingTable />
            <Member/>
            <Footer />
        </div>
    )
}

export default LandingPage