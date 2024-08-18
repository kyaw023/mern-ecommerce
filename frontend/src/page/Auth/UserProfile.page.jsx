import React, { useContext } from "react";
import { Separator } from "../../components/ui/separator";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { AuthContext } from "../../context/AuthContext";
import { Heart, KeyRound, LogOut, Pen, Trash } from "lucide-react";
import Swal from "sweetalert2";

const UserProfilePage = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const logoutHandler = async () => {
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
        title: "Are you sure to Logout?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes,Logout",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          swalWithTailwindButtons.fire({
            title: "Logged Out!",
            text: "Logged Out Successfully",
            icon: "success",
          });
          const res = await axios.post("/api/users/logout");
          if (res.status === 200) {
            dispatch({ type: "LOGOUT" });
            toast.success(res.data.message);
            nav("/login");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire({
            title: "Cancelled",
            text: "Logout Cancelled",
            icon: "error",
          });
        }
      });
  };

  const deleteAccountHandler = async () => {
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
            text: "Your file has been deleted.",
            icon: "success",
          });
          const res = await axios.delete(`/api/users/delete-account/${id}`);
          if (res.status === 200) {
            dispatch({ type: "LOGOUT" });
            toast.success(res.data.message);
            nav("/login");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };
  return (
    <div className="max-w-[1200px] mx-auto py-4 mt-10 md:mt-0 px-2 md:px-0">
      <div className=" border p-4 mb-3 rounded-xl">
        <h1 className=" text-xl font-semibold dark:text-slate-50">Account</h1>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-2">
        <div className="col-span-1 border p-4 rounded-lg   h-[540px]">
          <ul className=" space-y-6 relative h-[500px]">
            <div>
              <li className=" flex items-center gap-2 dark:text-slate-100">
                <Link
                  className={({ isActive }) =>
                    isActive
                      ? "border text-slate-50 w-full h-[36px] text-sm font-semibold px-2 flex items-center rounded"
                      : "text-gray-100 dark:text-slate-100 px-2"
                  }
                  to={`/profile/${id}`}
                >
                  My Profile
                </Link>
              </li>
            </div>
            <div>
              <li className=" flex items-center gap-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "border dark:text-slate-50 w-full  h-[36px] text-sm font-semibold px-2 flex gap-2 items-center rounded"
                      : "text-gray-700 dark:text-slate-100 px-2 flex items-center gap-2"
                  }
                  to={`/profile/${id}/editProfile`}
                >
                  <Pen size={16} /> Edit Profile
                </NavLink>
              </li>
            </div>
            <div>
              <li className=" flex items-center gap-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "border dark:text-slate-50 w-full h-[36px] text-sm font-semibold px-2 gap-2 flex items-center rounded"
                      : "text-gray-700 dark:text-slate-100 px-2 flex items-center gap-2"
                  }
                  to={`/profile/${id}/favorite`}
                >
                  <Heart size={16} /> Favorite
                </NavLink>
              </li>
            </div>
            <div>
              <li className=" flex items-center gap-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "border dark:text-slate-50 w-full h-[36px] text-sm font-semibold px-2 flex gap-2 items-center rounded"
                      : "text-gray-700 dark:text-slate-100 px-2 flex items-center gap-2"
                  }
                  to={`/profile/${id}/reset-password`}
                >
                  <KeyRound size={16} /> Password & Security
                </NavLink>
              </li>
            </div>
            <div className=" w-full mb-auto absolute bottom-0">
              <Button
                onClick={logoutHandler}
                className="w-full mb-2  dark:bg-gray-950 dark:text-slate-100 dark:hover:bg-slate-900 dark:border border-blue-300 dark:focus:border-blue-400"
              >
                <LogOut size={16} className=" me-2" />
                Logout
              </Button>
              <Button
                onClick={deleteAccountHandler}
                className="w-full dark:bg-gray-950 dark:text-slate-100 dark:hover:bg-slate-900 dark:border border-blue-300 dark:focus:border-blue-400 bg-red-500"
              >
                <Trash size={16} className=" me-2" />
                Delete
              </Button>
            </div>
          </ul>
        </div>
        <div className=" col-span-3 p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
