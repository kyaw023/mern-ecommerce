import axios from "../../helpers/axios";
import { format, isValid, parseISO } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";

const OrderTableComponent = ({
  _id,
  date,
  totalAmount,
  deliveryStatus,
  setUserOrders,
}) => {
  let formattedDate = "Invalid Date";

  try {
    const dateFmt = parseISO(date);

    if (isValid(dateFmt)) {
      formattedDate = format(dateFmt, "dd.MM.yyyy");
    }
  } catch (error) {
    console.error("Error formatting date:", error);
  }

  const deleteOrderHandler = () => {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ms-4",
        cancelButton:
          "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
      },
      buttonsStyling: false,
    });
    swalWithTailwindButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          swalWithTailwindButtons.fire({
            title: "Deleted!",
            text: "Your Orders have  been Cancelled .",
            icon: "success",
          });
          const res = await axios.delete(`/api/order/${_id}`);
          console.log(res);
          if (res.status === 200) {
            setUserOrders((prev) => prev.filter((c) => c?._id !== _id));
            toast.success(res.data.msg);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire({
            title: "Cancelled",
            text: "Your order is safe :)",
            icon: "error",
          });
        }
      });
  };
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-4 py-6 border-b border-gray-300  dark:border-gray-600">
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Order ID:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-gray-100">
          <Link
            to="#"
            className="hover:underline text-primary dark:text-primary-light"
          >
            # {_id}
          </Link>
        </dd>
      </dl>
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Date:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-gray-100">
          {formattedDate}
        </dd>
      </dl>
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Price:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-gray-100">
          ${totalAmount}
        </dd>
      </dl>
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Status:
        </dt>
        <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-dark dark:text-primary-light">
          {deliveryStatus == "pending" && (
            <div className="flex items-center text-light-text dark:text-dark-text">
              <svg
                className="me-1 h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
                />
              </svg>
              Preparing
            </div>
          )}

          {deliveryStatus == "shipped" && (
            <div className="flex items-center text-light-text dark:text-dark-text">
              <svg
                className="me-1 h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                />
              </svg>
              In transit
            </div>
          )}

          {deliveryStatus == "delivered" && (
            <div className="flex items-center text-light-text dark:text-dark-text">
              <svg
                className="me-1 h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 11.917 9.724 16.5 19 7.5"
                />
              </svg>
              Confirmed
            </div>
          )}

          {deliveryStatus == "cancelled" && (
            <div className="flex items-center text-light-text dark:text-dark-text">
              <svg
                className="me-1 h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Cancelled
            </div>
          )}
        </dd>
      </dl>
      <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
        {deliveryStatus == "delivered" ? (
          <button
            onClick={deleteOrderHandler}
            type="button"
            className="w-full rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary-light dark:focus:ring-primary-dark lg:w-auto"
          >
            Order Again
          </button>
        ) : (
          <button
            onClick={deleteOrderHandler}
            type="button"
            className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
          >
            Cancel order
          </button>
        )}
        <Link
          to={`/order-detail/${_id}`}
          className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-light-card px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
        >
          View details
        </Link>
      </div>
    </div>
  );
};

export default OrderTableComponent;
