import Button from "../ButtonWithLink";
import Navbar from "../Navbar";
import { Hero } from "@/components/icons";
import { Element } from "react-scroll";

const Header = () => {
  return (
    <Element name="home" className="element">
      <div className="header">
        <Navbar />
        <div
          className="hero-header py-12 bg-center bg-no-repeat bg-cover bg-[#0F172B] mb-12"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15, 23, 43, .9), rgba(15, 23, 43, .9)), url('/assets/images/bg-hero.jpg')",
          }}
        >
          <div className="hero-container lg:!grid grid-cols-2 flex flex-col lg:my-12 py-12 px-3 items-center justify-center mx-auto">
            <div className="mt-12 px-6 lg:w-[90%] text-center lg:text-left">
              <h1 className="text-6xl text-white mb-2 leading-tight animated slideInLeft">
                Enjoy Our
                <br />
                Delicious Meal
              </h1>
              <p className="text-white pb-2 mb-6 animated slideInLeft">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <Button
                label="BOOK A TABLE"
                bgcolor="#FE724C"
                btnSize="lg"
                animation="animated slideInLeft"
              />
            </div>
            <div className="md:mt-8 sm:mt-8 flex justify-end">
              <img
                src={Hero}
                alt="food-hero"
                className="animation-img w-[80%]"
              />
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default Header;
