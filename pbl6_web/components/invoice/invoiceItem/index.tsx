import { formatNumber } from '@/utils/parse.util';
import React from 'react';

interface InvoiceItemProps {
    name: string;
    qty: number;
    price: number;
    total: string;
  }

const InvoiceItem = ({ name, qty, price, total }: InvoiceItemProps) => {
  return (
    // <tr>
    //   <td className="w-full">
    //     <input
    //         type="text"
    //         placeholder='Item name'
    //         name='name'
    //         value={name}
    //         readOnly
    //         />
    //   </td>
    //   <td className="min-w-[65px] md:min-w-[80px]">
    //     <input
    //       type= 'number'
    //       min= '1'
    //       name= 'qty'
    //       value= {qty}
    //       readOnly
    //     />
    //   </td>
    //   <td className="relative min-w-[100px] md:min-w-[150px]">
    //     <span className="absolute left-[30%]">$</span>
    //     <input
    //       className= 'text-center'
    //       type= 'number'
    //       min= '0.01'
    //       step= '0.01'
    //       name= 'price'
    //       value={price}
    //       readOnly
    //     />
    //   </td>
    //   <td className="relative flex items-center justify-center">
    //     <span className="absolute left-[30%]">$</span>
    //     <input
    //       className= 'text-center'
    //       type= 'number'
    //       min= '0.01'
    //       step= '0.01'
    //       name= 'price'
    //       value={total}
    //       readOnly
    //     />
    //   </td>
    // </tr>
    <tr>
    <td className="min-w-[200px]">
      <p>{name}</p>
    </td>
    <td className="min-w-[65px] md:min-w-[80px]">
      <p>{qty}</p>
    </td>
    <td className="relative min-w-[100px] text-center md:min-w-[150px]">
      <p>{formatNumber(price)} (VND)</p>
    </td>
    <td className="relative flex items-center justify-center">
      <p>{formatNumber(parseInt(total))} (VND)</p>
    </td>
  </tr>
  );
};

export default InvoiceItem;