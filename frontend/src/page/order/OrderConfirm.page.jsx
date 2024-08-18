import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { format, parseISO, isValid } from "date-fns";
import { LoadingComponent } from "../../components";
import useFetch from "../../hook/useFetch";

const OrderConfirmPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useFetch(`/api/order/${id}`, [id]);

  console.log("Data:", data);
  console.log("id", id);
  console.log("Loading:", isLoading);
  console.log("Error:", isError);

  let formattedDate = "Invalid Date";

  try {
    const date = parseISO(data?.date);

    if (isValid(date)) {
      formattedDate = format(date, "d/MMM/yyyy");
    }
  } catch (error) {
    console.error("Error formatting date:", error);
  }

  return (
    <LoadingComponent isLoading={isLoading}>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 ">
        <div className="mx-auto max-w-2xl lg:px-4  border py-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
            Thanks for your order!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
            Your order{" "}
            <Link
              to={"/"}
              className="font-medium text-gray-900 dark:text-white hover:underline"
            >
              #{id}
            </Link>{" "}
            will be processed within 24 hours during working days. We will
            notify you by email once your order has been shipped.
          </p>
          <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Date
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {formattedDate}
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Stripe
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                JPMorgan monthly installments
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Name
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {data?.shippingAddress?.name}
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Address
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {data?.shippingAddress?.address}
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Phone
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {data?.shippingAddress?.phone}
              </dd>
            </dl>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to={"/"}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Track your order
            </Link>
            <Link
              to={"/"}
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Return to shopping
            </Link>
          </div>
        </div>
      </section>
    </LoadingComponent>
  );
};

export default OrderConfirmPage;
