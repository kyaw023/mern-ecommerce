import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { FaSearch } from "react-icons/fa";
import { Loader2, Pencil, Trash } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import * as yup from "yup";

import { FormComponent, LoadingComponent } from "../../components";
import { Form, Formik } from "formik";
import { MdCategory } from "react-icons/md";
import axios from "../../helpers/axios";
import { toast } from "sonner";
import Swal from "sweetalert2";
import useFetch from "../../hook/useFetch";

const AdminBrandPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [brand, setBrand] = useState([]);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const validationSchema = yup.object({
    name: yup.string().required("brand name is required"),
  });

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const res = await axios.get("/api/brand");
      setBrand(res.data);
      setIsLoading(false);
    })();
  }, []);

  const handleSubmit = async (values) => {
    try {
      let res;

      if (isEdit) {
        res = await axios.patch(
          `/api/brand/${id}`,
          {
            name: values.name,
          },

          {
            withCredentials: true,
          }
        );
      } else {
        res = await axios.post(
          "/api/brand",
          {
            name: values.name,
          },

          {
            withCredentials: true,
          }
        );
      }

      if (res.status === 200) {
        if (isEdit) {
          setBrand((prev) =>
            prev.map((item) => (item._id === id ? res.data : item))
          );
          toast.success("Brand updated successfully");
          setIsDialogOpen(false);
        } else {
          setBrand((prev) => [...prev, res.data]);
          toast.success("Brand created successfully");
          setIsDialogOpen(false);
        }

        setInitialValues({
          name: "",
        });
        setSelectedValue("");
        setIsEdit(false);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const deleteBrand = (id) => {
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
          await axios.delete(`/api/brand/${id}/`);
          setBrand((prev) => prev.filter((c) => c._id !== id));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const editHandler = (brand) => {
    setIsEdit(true);
    setId(brand?._id);
    setInitialValues({
      name: brand.name,
    });
    setIsDialogOpen(true);
  };

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };
  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.get(`/api/search/search-brand?name=${searchValue}`);

    setBrand(res.data);
    setSearchValue("");
  };

  return (
    <div className=" p-5">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className=" flex items-center justify-between">
          <h1 className=" text-xl font-semibold">Brand</h1>
          <Button
            onClick={() => setIsDialogOpen(true)}
            size="sm"
            className=" bg-blue-500 rounded-xl hover:bg-blue-400"
          >
            + New Brand
          </Button>
        </div>

        <form
          onSubmit={searchSubmitHandler}
          className=" flex items-center gap-2"
        >
          <div className="relative rounded py-5">
            <Input
              value={searchValue}
              onChange={handleSearchValue}
              size="sm"
              placeholder="search categories"
              className="w-60 pl-10 pr-3 py-2 rounded-xl border border-gray-300"
            />
            <FaSearch
              size={15}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500"
            />
          </div>
          <Button
            className=" cursor-pointer active:scale-105 transition duration-200"
            type="submit"
          >
            search
          </Button>
        </form>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Brand</DialogTitle>
            <DialogDescription>
              Make changes to your brand here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-10">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <>
                  {
                    <Form
                      onSubmit={handleSubmit}
                      className=" w-full space-y-6 border p-5 rounded"
                    >
                      <FormComponent
                        placeholder={"brand name"}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name={"name"}
                        type={"text"}
                        id={"name"}
                        value={values.name}
                        labelName={"Name"}
                        Icon={MdCategory}
                      />

                      <DialogFooter>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className=" w-full active:scale-110"
                        >
                          Saved changes
                          {isSubmitting && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                        </Button>
                      </DialogFooter>
                    </Form>
                  }
                </>
              )}
            </Formik>
          </div>
        </DialogContent>

        <LoadingComponent isLoading={isLoading}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className=" w-[200px]">Name</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brand.map((b) => (
                <TableRow key={brand?._id}>
                  <TableCell className="font-medium">{b?.name}</TableCell>
                  <TableCell>{b?.description}</TableCell>
                  <TableCell>{b?.products}</TableCell>
                  <TableCell className="">{b?.status}</TableCell>
                  <TableCell className=" space-x-2">
                    <Button
                      onClick={() => editHandler(b)}
                      size="sm"
                      className=" bg-blue-500"
                    >
                      {" "}
                      <Pencil size={15} className=" me-1 " />
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteBrand(b?._id)}
                      size="sm"
                      className="bg-red-500"
                    >
                      <Trash size={15} className="" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </LoadingComponent>
        <div className="flex items-center justify-between">
          <p className="w-full text-sm text-slate-400 px-4">page 1 of 2</p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminBrandPage;
