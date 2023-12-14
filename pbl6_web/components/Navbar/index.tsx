import React, {useState} from 'react'
import {IconLogo, NameLogo} from '@/components/icons'
import Button from '../Button'
import { Icon } from '@iconify/react';
import { Link, Element } from 'react-scroll';

const links = [
    { text: 'HOME', id: 1, target: 'home' },
    { text: 'ABOUT', id: 2, target: 'about' },
    { text: 'SERVICE', id: 3, target: 'service' },
    { text: 'MENU', id: 4, target: 'menu'},
  ];

const Navbar = () => {
    const [isShowMenuMobile, setIsShowMenuMobile] = useState(false)
    const [isShowMenuChild, setIsShowMenuChild] = useState(false)
    const [activeLink, setActiveLink] = useState(null);


    const handleLinkClick = (id: any) => {
        setActiveLink(id); 
      };

    return (
            <div className='navbar px-12 py-4 lg:fixed lg:top-0 z-10  w-full left-0 bg-[#0F172B]'>
                <div className="flex justify-between items-center">
                    <div className="logo flex items-center gap-2">
                        <img src={IconLogo} alt="icon-logo" />
                        <img src={NameLogo} alt="name-logo" />
                    </div>
                    <div className="navbar-container hidden gap-4 items-center lg:flex">
                        <ul className='navbar-nav flex gap-4'>
                            {links.map(link => (
                                <li key={link.id} className="nav-item font-semibold text-white hover:text-primary cursor-pointer">
                                    <Link
                                    to={link.target}
                                    spy={true}
                                    smooth={true}
                                    duration={500}
                                    activeClass="active"
                                    className={`nav-link ${link.id === activeLink ? 'active' : ''}`}
                                    onClick={() => handleLinkClick(link.id)}
                                    >
                                    {link.text}
                                    </Link>
                                </li>
                            ))}
                            <li className="group nav-item font-semibold text-white hover:text-primary relative">
                                <button className="flex items-center gap-2">
                                    PAGES
                                    <Icon icon="bxs:down-arrow"/>    
                                </button>
                                <div className="h-[60px] absolute top[100%] w-[60px]"></div>
                                <div id="dropdown" className="group-hover:block z-10 absolute hidden top-[50px] left-[-50px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 transition-all">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                            <li className='cursor-pointer'>
                                                <Link 
                                                    to='booking'  
                                                    spy={true} 
                                                    smooth={true} 
                                                    duration={500} 
                                                    activeClass="active" 
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Booking
                                                </Link>
                                            </li>
                                            <li className='cursor-pointer'>
                                                <Link 
                                                    to="team" 
                                                    spy={true} 
                                                    smooth={true} 
                                                    duration={500} 
                                                    activeClass="active" 
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Our Team
                                                </Link>
                                            </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <Button label="BOOK A TABLE" bgcolor="#FE724C" btnSize="sm"/>
                    </div>
                    <div className="lg:hidden block">
                        <button 
                            className="px-3 py-1 border border-[#ffffff1a]"
                            onClick={() => setIsShowMenuMobile(!isShowMenuMobile)}
                        >
                            <Icon icon="ic:baseline-menu" className="text-[#ffffff8c] font-black text-2xl"/>
                        </button>
                    </div>
                </div>
                {
                    isShowMenuMobile && (
                        <div className="mt-4 border-t-1 border-t-[#ffffff1a] w-full block lg:hidden">
                            <div>
                                <div className="flex flex-col text-white">
                                    {links.map(link => (
                                       <Link
                                       to={link.target}
                                       spy={true}
                                       smooth={true}
                                       duration={500}
                                       activeClass="active"
                                       className={`nav-link ${link.id === activeLink ? 'active' : ''} cursor-pointer`}
                                       onClick={() => handleLinkClick(link.id)}
                                       >
                                       {link.text}
                                       </Link>
                                    ))}
                                </div>
                                <div className="nav-item font-semibold text-white hover:text-primary relative">
                                <button className="flex items-center gap-2 py-3" onClick={() => setIsShowMenuChild(!isShowMenuChild)}>
                                    PAGES
                                    <Icon icon="bxs:down-arrow"/>    
                                </button>
                                {
                                    isShowMenuChild && (
                                        <div id="dropdown" className="w-full bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 transition-all mb-3">
                                        <ul className="w-full py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                            <li className='cursor-pointer'>
                                                <Link to="booking"  spy={true} smooth={true} duration={500} activeClass="active" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Booking</Link>
                                            </li>
                                            <li className='cursor-pointer'>
                                                <Link to="team" spy={true} smooth={true} duration={500} activeClass="active" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Our Team</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    )
                                }
                            </div>
                                <Button label="BOOK A TABLE" bgcolor="#FE724C" btnSize="sm"/>
                            </div>
                        </div>
                    )
                }
            </div>
    )
}

export default Navbar