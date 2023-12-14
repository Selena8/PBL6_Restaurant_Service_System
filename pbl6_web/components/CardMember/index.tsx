import React from 'react'
import { Icon } from '@iconify/react';

interface CardMemberProps {
    image: string
    name: string
    position: string
}

const CardMember = ({image, name, position} : CardMemberProps) => {
  return (
    <div className='bg-white rounded py-2' data-wow-delay="0.1s">
        <div className='m-6 flex flex-col items-center'>
            <img className='rounded-full mb-6 sm:w-[400px]' alt="" src={image} />
            <h5 className='w-full text-center text-xl font-extrabold'>{name}</h5>
            <p className='w-full text-center'>{position}</p>
            <div className='flex gap-2 justify-center mt-4'>
                <a href='#' className='p-2 rounded bg-primary hover:opacity-90'>
                    <Icon icon="ri:facebook-fill" className="text-white font-black text-2xl"/>
                </a>
                <a href='#' className='p-2 rounded bg-primary hover:opacity-90'>
                    <Icon icon="mdi:twitter" className="text-white font-black text-2xl"/>
                </a>
                <a href='#' className='p-2 rounded bg-primary hover:opacity-90'>
                    <Icon icon="mdi:instagram" className="text-white font-black text-2xl"/>
                </a>
            </div>
        </div>
    </div>
  )
}

export default CardMember
