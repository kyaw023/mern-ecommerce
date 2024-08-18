import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hook/useFetch";
import { LoadingComponent } from "../../components";

const OrderDetailPage = () => {
  const { id } = useParams();

  const { data, isError, isLoading } = useFetch(`/api/order/${id}`, [id]);

  const shippingAddress = data?.shippingAddress;

  const deliveryStatus = data?.deliveryStatus;

  const getProgressWidth = () => {
    switch (deliveryStatus) {
      case "pending":
        return "25%";
      case "shipped":
        return "50%";
      case "delivered":
        return "75%";
      case "cancelled":
        return "100%";
      default:
        return "0%";
    }
  };

  return (
    <LoadingComponent>
      <div className=" bg-gray-50 dark:bg-slate-900 rounded-lg p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-50">
            Order #{id}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Order placed March 22, 2021
          </p>
          <a
            href="#"
            className="text-sm text-indigo-600 font-medium mt-2 inline-block"
          >
            View invoice →
          </a>
        </div>
        {/* Products Section */}
        <div className="space-y-6">
          {/* Product 1 */}
          <div className="border rounded-lg p-6 bg-white dark:bg-slate-900">
            <div className="flex items-start justify-between">
              {data?.products?.map((order) => {
                return (
                  <div className=" flex items-center ">
                    <img
                      src={`http://localhost:4000${order?.product?.images}`}
                      alt="Nomad Tumbler"
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                        {order.product.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-slate-300 mt-1">
                        {"$"}
                        {order.product.price}
                      </p>
                      <p className="text-sm text-gray-700 mt-3 dark:text-slate-300 w-[300px]">
                        {order.product.description}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div>
                <p className="text-sm text-gray-600 dark:text-slate-200 font-medium">
                  Delivery address
                </p>
                <p className="text-sm text-gray-700  dark:text-slate-500 mt-1">
                  {shippingAddress?.address}
                  <br />
                  City : {shippingAddress?.city}
                  <br />
                  Country : {shippingAddress?.country}
                </p>
              </div>
              <div className="">
                <p className="text-sm text-gray-600 dark:text-slate-200 font-medium">
                  Shipping updates
                </p>
                <p className="text-sm text-gray-700  dark:text-slate-500 mt-1">
                  {shippingAddress?.email}
                  <br />
                  1•••••••40
                </p>
              </div>
            </div>
            <div className="mt-4 ">
              <p className="text-sm text-gray-500">
                Preparing to ship on March 24, 2021
              </p>
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <div
                    className={`w-1/4 text-center font-medium text-sm ${
                      ["pending", "shipped", "delivered"].includes(
                        deliveryStatus
                      )
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }`}
                  >
                    Order placed
                  </div>
                  <div
                    className={`w-1/4 text-center font-medium text-sm ${
                      ["shipped", "delivered"].includes(deliveryStatus)
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }`}
                  >
                    Shipped
                  </div>
                  <div
                    className={`w-1/4 text-center font-medium text-sm ${
                      deliveryStatus === "delivered"
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }`}
                  >
                    Delivered
                  </div>
                  <div
                    className={`w-1/4 text-center font-medium text-sm ${
                      deliveryStatus === "cancelled"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    Cancelled
                  </div>
                </div>
                <div className="relative mt-2 h-1 bg-gray-200">
                  <div
                    className="absolute top-0 left-0 h-full bg-indigo-600"
                    style={{ width: getProgressWidth() }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Payment Information Section */}
        <div className="mt-8 border rounded-lg p-6 bg-white dark:bg-slate-900 flex items-center justify-between">
          <div className=" space-y-4">
            <div>
              <p className="text-sm text-gray-600 font-medium dark:text-slate-100">
                Billing address
              </p>
              <p className="text-sm text-gray-700 dark:text-slate-500 mt-1">
                {shippingAddress?.address}
                <br />
                City : {shippingAddress?.city}
                <br />
                Country : {shippingAddress?.country}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium dark:text-slate-100">
                Payment information
              </p>
              <p className="text-sm text-gray-700 dark:text-slate-500 mt-1">
                VISA ending with 4242
                <br />
                Expires 02/24
              </p>
            </div>
          </div>
          <div className=" w-[400px] space-y-4">
            {/* <div className="flex justify-between text-sm border-b py-2">
            <p className="text-gray-500">Subtotal</p>
            <p className="text-gray-700">$72</p>
          </div>
          <div className="flex justify-between text-sm mt-1 border-b py-2">
            <p className="text-gray-500">Shipping</p>
            <p className="text-gray-700">$5</p>
          </div>
          <div className="flex justify-between text-sm mt-1 border-b py-2">
            <p className="text-gray-500">Tax</p>
            <p className="text-gray-700">$6.16</p>
          </div> */}
            <div className="flex justify-between text-sm mt-1 font-semibold">
              <p className="text-gray-700 dark:text-slate-200">Order total</p>
              <p className="text-gray-700 dark:text-slate-300">${data?.totalAmount}</p>
            </div>
          </div>
        </div>
      </div>
    </LoadingComponent>
  );
};

export default OrderDetailPage;
