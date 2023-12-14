import React from 'react';
import CardMember from '@/components/CardMember';
import ScrollAnimation from 'react-animate-on-scroll';
import { Element } from 'react-scroll';

const members = [
  {
    image: "/assets/images/team-1.jpg",
    name: "Robus",
    position: "Designation",
  },
  {
    image: "/assets/images/team-1.jpg",
    name: "Robus",
    position: "Designation",
  },
  {
    image: "/assets/images/team-1.jpg",
    name: "Robus",
    position: "Designation",
  },
  {
    image: "/assets/images/team-1.jpg",
    name: "Robus",
    position: "Designation",
  }
]

const Member = () => {
  return (
    <Element name="team" className="element">
        <div className='container mx-auto'>
      <div className="heading flex flex-col justify-center items-center pt-12 px-3 mb-12">
        <ScrollAnimation animateIn="fadeInUp" animateOnce={true} delay={100}>
          <h5 className='relative font-semibold text-[#FE724C] text-[20px] font-pacifico after:content-[""] after:block after:w-[45px] after:h-[2px] after:bg-[#FE724C] after:absolute after:top-[50%] after:right-[-55px]'>
            Team Members
          </h5>
        </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInUp" animateOnce={true} delay={200}>
          <h1 className="text-[40px] font-extrabold font-[Nunito] leading-tight tracking-wider max-[415px]:text-center">
            Our Master Chefs
          </h1>
        </ScrollAnimation>
      </div>

      <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4'>
        {members.map((item, index) => (
          <ScrollAnimation key={index} animateIn="fadeInUp" animateOnce={true} delay={300 + index * 100}>
            <CardMember
              image={item.image}
              name={item.name}
              position={item.position}
            />
          </ScrollAnimation>
        ))}
      </div>
    </div>
  </Element>

  )
}

export default Member;
