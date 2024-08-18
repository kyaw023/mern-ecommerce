import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import noOrder from "../../assets/no-orders.png";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hook/useFetch";
import { LoadingComponent, OrderTableComponent } from "../../components";

const OrderHistoryPage = () => {
  const { state } = useContext(AuthContext);

  const [userOrders, setUserOrders] = useState([]);
  const [statusType, setStatusType] = useState("");

  const { data, isError, isLoading } = useFetch(
    `/api/order/user/${state?.user?._id}`,
    [state?.user?._id]
  );

  useEffect(() => {
    setUserOrders(data);
  }, [data]);

  const selectHandler = async (event) => {
    const selectedStatus = event.target.value;
    setStatusType(selectedStatus);

    try {
      // Fetch orders with the selected status
      const res = await axios.get(
        `/api/search/search-order?status=${selectedStatus}`
      );
      setUserOrders(res.data); // Update userOrders with the filtered data
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching filtered orders:", error);
    }
  };
  return (
    <div>
      <LoadingComponent isLoading={isLoading}>
        {userOrders.length === 0 ? (
          <div className="flex flex-col space-y-3 items-center justify-start h-screen bg-light-background dark:bg-dark-background">
            <div className="text-center">
              <img
                className="w-80 h-80 mx-auto"
                src={noOrder}
                alt="No orders"
              />
              <div>
                <h1 className="font-semibold text-light-text dark:text-dark-text">
                  No Order placed yet.
                </h1>
                <p className="max-w-sm mx-auto text-slate-600 dark:text-gray-400 text-sm">
                  You have not placed any order yet. Please add items to your
                  cart and checkout when you are ready.
                </p>
              </div>
            </div>
            <Link
              to={"/"}
              className="border border-slate-700 dark:border-gray-700 px-4 py-2 rounded text-light-text dark:text-dark-text hover:bg-light-accent dark:hover:bg-dark-accent"
            >
              Go To Order
            </Link>
          </div>
        ) : (
          <section className=" py-8 antialiased md:py-16 min-h-screen">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div>
                <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-light-text dark:text-dark-text sm:text-2xl">
                    My Orders
                  </h2>
                  <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                    <div>
                      <label
                        htmlFor="order-type"
                        className="sr-only mb-2 block text-sm font-medium text-light-text dark:text-dark-text"
                      >
                        Select order type
                      </label>
                      <select
                        value={statusType}
                        onChange={selectHandler}
                        id="order-type"
                        className="block w-full min-w-[14rem] rounded-lg border border-light-accent dark:border-dark-accent bg-light-background dark:bg-dark-background p-2.5 text-sm text-light-text dark:text-dark-text focus:border-primary focus:ring-primary"
                      >
                        <option value="">All orders</option>
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flow-root sm:mt-8">
                  <div className="divide-y divide-light-accent dark:divide-dark-accent">
                    {userOrders?.map((order) => (
                      <OrderTableComponent
                        key={order?._id}
                        {...order}
                        userOrders={userOrders}
                        setUserOrders={setUserOrders}
                      />
                    ))}
                  </div>
                </div>
                <nav
                  className="mt-6 flex items-center justify-center sm:mt-8"
                  aria-label="Page navigation example"
                >
                  <ul className="flex h-8 items-center -space-x-px text-sm">
                    <li>
                      <a
                        href="#"
                        className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-light-accent dark:border-dark-accent bg-light-background dark:bg-dark-background px-3 leading-tight text-light-text dark:text-dark-text hover:bg-light-accent dark:hover:bg-dark-accent"
                      >
                        <span className="sr-only">Previous</span>
                        <svg
                          className="h-4 w-4 rtl:rotate-180"
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
                            d="m15 19-7-7 7-7"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex h-8 items-center justify-center border border-light-accent dark:border-dark-accent bg-light-background dark:bg-dark-background px-3 leading-tight text-light-text dark:text-dark-text hover:bg-light-accent dark:hover:bg-dark-accent"
                      >
                        1
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex h-8 items-center justify-center border border-light-accent dark:border-dark-accent bg-light-background dark:bg-dark-background px-3 leading-tight text-light-text dark:text-dark-text hover:bg-light-accent dark:hover:bg-dark-accent"
                      >
                        2
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        aria-current="page"
                        className="z-10 flex h-8 items-center justify-center border border-primary bg-primary-50 dark:bg-primary-600 px-3 leading-tight text-primary-600 dark:text-primary hover:bg-primary-100 dark:hover:bg-primary-700"
                      >
                        3
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex h-8 items-center justify-center border border-light-accent dark:border-dark-accent bg-light-background dark:bg-dark-background px-3 leading-tight text-light-text dark:text-dark-text hover:bg-light-accent dark:hover:bg-dark-accent"
                      >
                        ...
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex h-8 items-center justify-center border border-light-accent dark:border-dark-accent bg-light-background dark:bg-dark-background px-3 leading-tight text-light-text dark:text-dark-text hover:bg-light-accent dark:hover:bg-dark-accent"
                      >
                        100
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex h-8 items-center justify-center rounded-e-lg border border-light-accent dark:border-dark-accent bg-light-background dark:bg-dark-background px-3 leading-tight text-light-text dark:text-dark-text hover:bg-light-accent dark:hover:bg-dark-accent"
                      >
                        <span className="sr-only">Next</span>
                        <svg
                          className="h-4 w-4 rtl:rotate-180"
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
                            d="m9 5 7 7-7 7"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
        )}
      </LoadingComponent>
    </div>
  );
};

export default OrderHistoryPage;
