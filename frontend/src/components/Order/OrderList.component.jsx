import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "../../helpers/axios";
import { toast } from "sonner";

const OrderListComponent = ({ order, setOrderLists }) => {
  const [selectStatus, setSelectStatus] = useState(
    order?.deliveryStatus || "pending"
  );
  const selectHandler = async (value) => {
    try {
      console.log(value);

      const res = await axios.patch(`/api/admin/update-order/${order?._id}`, {
        deliveryStatus: value,
      });

      if (res.status === 200) {
        toast.success("Your Order has been updated"); // Display a success message

        setSelectStatus(value);
        // Update the order in the order list
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update the order. Please try again."); // Display an error message
    }
  };

  return (
    <tr
      key={order?._id}
      className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <td className="w-4 px-4 py-3">
        <div className="flex items-center">
          <input
            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            id="checkbox-table-search-1"
            onclick="event.stopPropagation()"
            type="checkbox"
          />
          <label className="sr-only" htmlFor="checkbox-table-search-1">
            checkbox
          </label>
        </div>
      </td>
      <td>
        <h1>{order?._id}</h1>
      </td>
      <th
        className="flex items-center px-4 py-2  text-gray-900 whitespace-nowrap dark:text-white"
        scope="row"
      >
        <img
          alt="iMac Front Image"
          className="w-auto h-8 mr-3"
          src={
            import.meta.env.VITE_BACKEND_ASSET_URL +
            order?.products[0]?.product?.images
          }
        />
        <span className=" text-xs">{order?.products[0]?.product?.name}</span>
      </th>
      <td className="px-4 py-2">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
          ${order?.products[0]?.product?.price}
        </span>
      </td>
      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {order?.shippingAddress?.city}
      </td>
      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {order?.shippingAddress?.email}
      </td>
      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <Select value={selectStatus} onValueChange={selectHandler}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shipped">Shipping</SelectItem>
              <SelectItem value="delivered">delivered</SelectItem>
              <SelectItem value="cancelled">cancellled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </td>
    </tr>
  );
};

export default OrderListComponent;
