import React, { useState, useRef } from 'react';
import { ImgABout1, ImgABout2, ImgABout3, ImgABout4 } from '@/components/icons';
import { Icon } from '@iconify/react';
import {NameLogo} from '@/components/icons'
import Button from '../ButtonWithLink';
import CountUp from 'react-countup';
import ScrollAnimation from 'react-animate-on-scroll';
import { Element } from 'react-scroll';

const About = () => {
  return (
    <Element name="about" className="element">
      <div className="container lg:!grid grid-cols-2 flex flex-col items-center gap-4 py-12 px-3 mx-auto">
        <div className="lg:block flex flex-col items-center">
          <div className="flex gap-2 mb-2 items-end">
            <ScrollAnimation animateIn="zoomIn" animateOnce={true}>
              <div className="flex gap-2 mb-2 items-end">
                <img src={ImgABout1} alt="" className="w-[48%]" />
                <img src={ImgABout2} alt="" className="w-[35%] h-[30%]" />
              </div>
            </ScrollAnimation>
          </div>
          <div className="flex gap-2 flex-end">
            <ScrollAnimation animateIn="zoomIn" animateOnce={true}>
              <div className="flex gap-2 flex-end">
                <img src={ImgABout3} alt="" className="w-[35%] h-[30%] ml-[70px]" />
                <img src={ImgABout4} alt="" className="w-[48%]" />
              </div>
            </ScrollAnimation>
          </div>
        </div>
        <div>
          <h5 className="text-primary text-xl font-pacifico font-semibold">
          About Us
            <span className="ml-2 mb-1 w-[45px] h-[2px] bg-primary inline-block"></span>
          </h5>
          <h1 className="flex items-center text-[#0F172B] font-extrabold text-[40px] mb-6 font-[Nunito]">
            Welcome to
            <Icon icon="fluent:food-24-filled" className="w-12 h-12 text-primary" />
            <img src={NameLogo} alt="name-logo" />
          </h1>
          <p className="mb-6 text-[#666565] font-normal">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos erat ipsum et lorem et sit, sed stet lorem sit.</p>
          <p className="mb-6 text-[#666565] font-normal">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
          <div className="grid grid-cols-2 mb-6">
            <div className="flex gap-6 border-l-4 border-l-[#FE724C] px-4">
              <h1 className="text-5xl text-primary font-extrabold">
              <CountUp start={0} end={15} duration={2} delay={0} />
              </h1>
              <div>
                <p className="text-[#666565] font-normal">Year of</p>
                <h6 className="text-[#0F172B] font-extrabold uppercase">Experience</h6>
              </div>
            </div>
            <div className="flex gap-6 border-l-4 border-l-[#FE724C] px-4">
              <h1 className="text-5xl text-primary font-extrabold">
              <CountUp start={0} end={50} duration={2} delay={0} />
              </h1>
              <div>
                <p className="text-[#666565] font-normal">Popular</p>
                <h6 className="text-[#0F172B] font-extrabold uppercase">MASTER CHEFS</h6>
              </div>
            </div>
          </div>
          <Button label="BOOK A TABLE" bgcolor="#FE724C" btnSize="lg" />
        </div>
      </div>
    </Element>
  );
};

export default About;
