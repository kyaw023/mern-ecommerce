import React, { useEffect, useState } from "react";

import { LoadingComponent } from "../../components";
import axios from "../../helpers/axios";

import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import Swal from "sweetalert2";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import useFetch from "../../hook/useFetch";

const AdminCustomerPage = () => {
  const [users, setUsers] = useState([]);
  const { data, isLoading } = useFetch(`/api/admin/users`);

  useEffect(() => {
    setUsers(data);
  }, [data]);

  const deleteUserHandler = async (_id) => {
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
          await axios.delete(`/api/admin/${_id}/users`);

          setUsers((prev) => prev.filter((user) => user?._id !== _id));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const handleRoleChange = async (userId, newRole) => {
    console.log(userId, newRole);
    try {
      const res = await axios.patch(`/api/admin/${userId}/users`, {
        isAdmin: newRole == "admin" ? true : false,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className=" p-5 shadow h-screen dark:bg-slate-900 dark:text-slate-200">
        <div className=" flex items-center justify-between">
          <h1 className=" text-lg font-semibold">Users</h1>
          <div>
            <Button variant="outline"> + Create Users</Button>
          </div>
        </div>
        <Separator className=" mt-3" />

        <div>
          <Table>
            <TableCaption>A list of users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>

                <TableHead>Active</TableHead>
                <TableHead className=" text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className=" ">
              {users?.map((user) => {
                return (
                  <TableRow key={user?._id}>
                    <TableCell className="font-medium">
                      <span className=" mt-2">{user?.name}</span>
                    </TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>
                      <Select
                        value={user?.role || "user"}
                        onValueChange={(value) =>
                          handleRoleChange(user._id, value)
                        }
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Select a Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Role</SelectLabel>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => deleteUserHandler(user?._id)}
                        size="sm"
                        className=" bg-red-600 dark:bg-slate-950 dark:text-slate-200 dark:border dark:border-l-slate-600 dark:hover:bg-slate-900"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* <div>
              <Pagination className={" mt-10 w-full py-3"}>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  {links?.paginationLinks?.map((link) => {
                    return (
                      <PaginationItem>
                        <PaginationLink href={`?page=${link?.number}`}>
                          {link?.number}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div> */}
        </div>
      </div>
    </LoadingComponent>
  );
};

export default AdminCustomerPage;
