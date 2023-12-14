import { Icon } from '@iconify/react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Element } from 'react-scroll';

const Service = () => {
    return (
    <Element name="service" className="element">
      <div className="container grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 py-12 px-3 mx-auto">
        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
          <div className="group h-[240px] p-6 mt-4 bg-white flex flex-col justify-center gap-4 hover:bg-primary hover:text-white transition-all">
            <Icon icon="fa6-solid:user-tie" className="w-12 h-12 text-primary group-hover:text-white"/>
            <h5 className="font-bold text-xl">Master Chefs</h5>
            <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
          </div>
        </ScrollAnimation>
  
        <ScrollAnimation animateIn="fadeInUp" animateOnce={true} delay={300}>
          <div className="group h-[240px] p-6 mt-4 bg-white flex flex-col justify-center gap-4 hover:bg-primary hover:text-white transition-all">
            <Icon icon="fluent:food-24-filled" className="w-12 h-12 text-primary group-hover:text-white"/>
            <h5 className="font-bold text-xl">Quality Food</h5>
            <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
          </div>
        </ScrollAnimation>
  
        <ScrollAnimation animateIn="fadeInUp" animateOnce={true} delay={500}>
          <div className="group h-[240px] p-6 mt-4 bg-white flex flex-col justify-center gap-4 hover:bg-primary hover:text-white transition-all">
            <Icon icon="game-icons:round-table" className="w-12 h-12 text-primary group-hover:text-white"/>
            <h5 className="font-bold text-xl">Booking Table</h5>
            <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
          </div>
        </ScrollAnimation>
  
        <ScrollAnimation animateIn="fadeInUp" animateOnce={true} delay={700}>
          <div className="group h-[240px] p-6 mt-4 bg-white flex flex-col justify-center gap-4 hover:bg-primary hover:text-white transition-all">
            <Icon icon="tdesign:service" className="w-12 h-12 text-primary group-hover:text-white"/>
            <h5 className="font-bold text-xl">24/7 Service</h5>
            <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
          </div>
        </ScrollAnimation>
      </div>
    </Element>
      
    );
  };

export default Service