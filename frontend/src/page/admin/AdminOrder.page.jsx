import React, { useEffect, useState } from "react";
import useFetch from "../../hook/useFetch";
import { LoadingComponent, OrderListComponent } from "../../components";

const AdminOrderPage = () => {
  const [orderLists, setOrderLists] = useState([]);
  const { data, isError, isLoading } = useFetch("/api/admin/list-order");

  useEffect(() => {
    setOrderLists(data);
  }, [data]);

  return (
    <LoadingComponent isLoading={isLoading}>
      <section className="bg-gray-50 dark:bg-gray-900 p-5 sm:py-5">
        <div className="">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex items-center flex-1 space-x-4">
                <h5>
                  <span className="text-gray-500">All Order:</span>
                  <span className="dark:text-white">{orderLists?.length}</span>
                </h5>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="p-4" scope="col">
                      <div className="flex items-center">
                        <input
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          id="checkbox-all"
                          type="checkbox"
                        />
                        <label className="sr-only" htmlFor="checkbox-all">
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th className="px-4 py-3" scope="col">
                      OrderID
                    </th>
                    <th className="px-4 py-3" scope="col">
                      Product
                    </th>

                    <th className="px-4 py-3" scope="col">
                      Price
                    </th>
                    <th className="px-4 py-3" scope="col">
                      Address
                    </th>
                    <th className="px-4 py-3" scope="col">
                      Email
                    </th>

                    <th className="px-4 py-3" scope="col">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderLists?.map((order) => {
                    return (
                      <OrderListComponent
                        order={order}
                        setOrderLists={setOrderLists}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <nav
              aria-label="Table navigation"
              className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white">
                  1-10
                </span>
                of
                <span className="font-semibold text-gray-900 dark:text-white">
                  1000
                </span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <a
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    href="#"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    href="#"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    href="#"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    aria-current="page"
                    className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    href="#"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    href="#"
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    href="#"
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    href="#"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </LoadingComponent>
  );
};

export default AdminOrderPage;
