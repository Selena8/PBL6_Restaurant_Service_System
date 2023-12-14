import React from 'react';
import { Link } from 'react-scroll';

interface ButtonProps {
  isFullWidth?: boolean;
  bgcolor?: string;
  label: string;
  btnSize?: string;
  animation?: string;
}

const Button = ({ isFullWidth, bgcolor, label, btnSize, animation }: ButtonProps) => {
  
  const buttonClasses = `text-white rounded ${btnSize === "sm" ? "px-6 py-2" : "px-12 py-4"} inline-block ${isFullWidth ? 'w-full' : ''} ${animation} cursor-pointer hover:opacity-90`;
  const buttonStyle = { backgroundColor: bgcolor };

  return (
    <Link 
      to="booking"
      spy={true}
      smooth={true}
      duration={500}
      activeClass="active"
      className={buttonClasses} 
      style={buttonStyle}>
      {label}
    </Link>
  );
};

export default Button;