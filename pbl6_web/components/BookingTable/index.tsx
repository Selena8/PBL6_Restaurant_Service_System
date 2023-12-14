import React from 'react'
import FormBooking from '../FormBooking'
import ScrollAnimation from 'react-animate-on-scroll';
import { Element } from 'react-scroll';
import { Box, CircularProgress } from '@mui/material';

const BookingTable = () => {
  return (
    <Element name="booking" className="element">
        <ScrollAnimation animateIn="fadeInUp" animateOnce={true} delay={100}>
            <div className="relative container grid lg:grid-cols-2 grid-cols-1 py-12 px-3 mx-auto">
                <div className="img-content">
                    <img className="w-full h-full max-h-[580px]" src="https://themewagon.github.io/restoran/img/about-1.jpg" alt="" />
                </div>
                <div className="form-content bg-[#0F172B] flex justify-center items-center">
                    <div className="form p-5 pb-[30px]">
                        <div className="heading flex flex-col justify-center items-start">
                            <h5 className='relative font-semibold text-[#FE724C] text-[20px] font-pacifico after:content-[""] after:block after:w-[45px] after:h-[2px] after:bg-[#FE724C] after:absolute after:top-[50%] after:right-[-55px]'>
                            Reservation
                            </h5>
                            <h1 className="text-[40px] text-white font-extrabold font-[Nunito] leading-tight tracking-wider max-[415px]:text-center">
                            Book A Table Online
                            </h1>
                        </div>
                        <FormBooking />
                    </div>
                </div>
            </div>
        </ScrollAnimation>
    </Element>
  )
}

export default BookingTable