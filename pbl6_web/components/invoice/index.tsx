import { AppDispatch } from '@/store'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InvoiceItem from './invoiceItem'
import { fetchMenuDetail } from '@/store/apps/menu/api/menu'
import InvoiceModal from './InvoiceModal'
import { IconButton } from '@mui/material'
import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation'
import { formatNumber } from '@/utils/parse.util'

const Invoice = (props: any) => {
  const router = useRouter();

  const {orderDetail} = props
  const {orderTime, orderStatus, userId, tableName, orderedfoods, total, paymentType} = orderDetail
  const orderTimeFormatted = moment(orderTime).format('YYYY-MM-DD HH:mm:ss');
  const [listItem, setListItem] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      if (orderedfoods.length > 0 && listItem.length === 0) {
        for (const orderFood of orderedfoods) {
          try {
            const menuDetail = await fetchMenuDetail(orderFood.foodId);
            setListItem((prev) => [...prev, {
              ...menuDetail,
              quantity: orderFood.quantity
            }])
          } catch (error) {
            console.error(`Error fetching menu details for orderFoodId ${orderFood.id}:`, error);
          }
        }
      }
    };
  
    fetchData();
  }, [orderDetail])

  useEffect(() => {
    const total = listItem.reduce((acc : number, item : any) => acc + item.price * item.quantity, 0)
    setTotalPrice(total)
}, [listItem])

  const reviewInvoiceHandler = (event: any) => {
    event.preventDefault();
    setIsOpen(true);
  };
  return (
    <form
      className="relative flex flex-col px-2"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="basis-1/4 bg-transparent">
      <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 flex justify-between">
          <div className="flex items-center gap-4">
            <IconButton
              onClick={() => {
                router.push('/admin/orderhistory')
              }}
            >
              <Icon icon={"majesticons:arrow-left"} />
            </IconButton>
            <span>
              DETAIL INVOICE
            </span>
          </div>
          <button
            className="rounded-md bg-blue-500 p-4 text-sm text-white shadow-sm hover:bg-blue-600"
            type="submit"
          >
            Review Invoice
          </button>
        </div>
        <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 flex justify-between">
          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              invoiceNumber: 1,
              tableName,
              total: totalPrice.toFixed(2),
            }}
            items={listItem}
          />
        </div>
      </div>
      <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Current Date: </span>
            <span>{orderTimeFormatted}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="invoiceNumber">
              Invoice Number:
            </label>
            <input
              required
              className="max-w-[130px]"
              type="number"
              name="invoiceNumber"
              id="invoiceNumber"
              min="1"
              step="1"
              value="1"
              onChange={() => {}}
              readOnly
            />
          </div>
        </div>
        <h1 className="text-center text-lg font-bold">INVOICE</h1>
        <div className="grid grid-cols-2 gap-2 pt-4 pb-8">
          <div className='flex gap-4'>
            <label
              htmlFor="table"
              className="text-sm font-bold sm:text-base"
            >
              Table:
            </label>
            <input
              required
              className="flex-1"
              placeholder="Cashier name"
              type="text"
              name="table"
              id="table"
              value={tableName}
              onChange={() => {}}
              readOnly
              />
          </div>
        </div>
        <table className="w-full p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
              <th>Item</th>
              <th>Qantity</th>
              <th className="text-center">Price</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {listItem.map((item) => (
                <InvoiceItem
                  name={item.name}
                  qty={item.quantity}
                  price={item.price}
                  total={(item.quantity * item.price).toFixed(2)}
                />
            ))}
          </tbody>
        </table>
        <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              {formatNumber(totalPrice)} (VND)
            </span>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Invoice
