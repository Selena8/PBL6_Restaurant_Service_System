import React from 'react'

const MenuFoodCard = (props: any) => {
  const { item } = props
  return (
    <div className="px-[20px]">
        <div className="flex items-center">
            <img className="w-[80px] rounded" src={item.img} alt="" />
            <div className="w-full flex flex-col text-start pl-4">
                <h5 className="flex justify-between border-b-[1px] border-[#dee2e6] pb-2 text-[20px] font-bold">
                    <span>{item.name}</span>
                    <span className="text-[#FE724C]">{item.total}</span>
                </h5>
                <small className="italic text-[14px] mt-[10px]">{item.description}</small>
            </div>
        </div>
    </div>
  )
}

export default MenuFoodCard