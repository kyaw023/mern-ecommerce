import {
  BaggageClaim,
  HomeIcon,
  LayoutGrid,
  NotebookPen,
  Truck,
  Users,
} from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Separator } from "../../components/ui/separator";
import { AiOutlineTags } from "react-icons/ai";

const AdminDashboardPage = () => {
  return (
    <div className="dark:bg-slate-950">
      <div className=" max-w-[1200px] mx-auto ">
        {/* admin header */}
        <div className=" grid md:grid-cols-7 gap-2 h-screen">
          <div className=" col-span-1 dark:border-slate-900 dark:bg-slate-900 dark:text-slate-200 shadow border  p-5">
            <div className=" flex items-center gap-1">
              <BaggageClaim />
              <h1 className=" text-2xl font-semibold">Shopcart</h1>
            </div>
            <Separator className=" bg-slate-400 mt-3" />

            <div className=" mt-4">
              <ul className=" space-y-4">
                <div>
                  <li className=" flex items-center gap-2">
                    <HomeIcon size={20} />
                    <Link to={"/admin"}>Home</Link>
                  </li>
                  <Separator className=" bg-slate-400 mt-3" />
                </div>
                <div>
                  <li className=" flex items-center gap-2">
                    <NotebookPen size={20} />
                    <Link to={"/admin/orders"}>Orders</Link>
                  </li>
                  <Separator className=" bg-slate-400 mt-3" />
                </div>
                <div>
                  <li className=" flex items-center gap-2">
                    <Truck size={20} />
                    <Link to={"/admin/delivery"}>Delivery</Link>
                  </li>
                  <Separator className=" bg-slate-400 mt-3" />
                </div>
                <div>
                  <li className=" flex items-center gap-2">
                    <LayoutGrid size={20} />
                    <Link to={"/admin/products"}>Products</Link>
                  </li>
                  <Separator className=" bg-slate-400 mt-3" />
                </div>
                <div>
                  <li className=" flex items-center gap-2">
                    <Users size={20} />
                    <Link to={"/admin/customers"}>Customers</Link>
                  </li>
                  <Separator className=" bg-slate-400 mt-3" />
                </div>
                <div>
                  <li className=" flex items-center gap-2">
                    <AiOutlineTags size={20} />
                    <Link to={"/admin/categories"}>Categories</Link>
                  </li>
                  <Separator className=" bg-slate-400 mt-3" />
                </div>
                <div>
                  <li className=" flex items-center gap-2">
                    <AiOutlineTags size={20} />
                    <Link to={"/admin/brand"}>Brand</Link>
                  </li>
                  <Separator className=" bg-slate-400 mt-3" />
                </div>
              </ul>
            </div>
          </div>
          <div className=" col-span-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
