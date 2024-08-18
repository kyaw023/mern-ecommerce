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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import * as yup from "yup";

import { Label } from "../../components/ui/label";
import { FormComponent, LoadingComponent } from "../../components";
import { Form, Formik } from "formik";
import { MdCategory } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import axios from "../../helpers/axios";
import { toast } from "sonner";
import Swal from "sweetalert2";
const AdminCategoryPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [selectedValue, setSelectedValue] = useState("active");

  const validationSchema = yup.object({
    name: yup.string().required("category name is required"),
    description: yup.string().required("category description is required!"),
  });

  const [categories, setCategories] = useState([]);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const res = await axios.get("/api/users/categories");
      setCategories(res.data);
      setIsLoading(false);
    })();
  }, []);

  const handleSubmit = async (values) => {
    try {
      let res;

      if (isEdit) {
        res = await axios.patch(
          `/api/admin/${id}/categories`,
          {
            name: values.name,
            description: values.description,
            status: selectedValue,
          },

          {
            withCredentials: true,
          }
        );
      } else {
        res = await axios.post(
          "/api/admin/categories",
          {
            name: values.name,
            description: values.description,
            status: selectedValue,
          },

          {
            withCredentials: true,
          }
        );
      }

      if (res.status === 200) {
        if (isEdit) {
          setCategories((prev) =>
            prev.map((item) => (item._id === id ? res.data : item))
          );
          toast.success("Category updated successfully");
          setIsDialogOpen(false);
        } else {
          setCategories((prev) => [...prev, res.data]);
          toast.success("Category created successfully");
          setIsDialogOpen(false);
        }

        setInitialValues({
          name: "",
          description: "",
        });
        setSelectedValue("");
        setIsEdit(false);
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    }
  };

  const deleteCategory = (id) => {
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
          await axios.delete(`/api/admin//${id}/categories`);
          setCategories((prev) => prev.filter((c) => c._id !== id));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const editHandler = (category) => {
    setIsEdit(true);
    setId(category?._id);
    setInitialValues({
      name: category.name,
      description: category.description,
    });
    setSelectedValue(category.status);
    setIsDialogOpen(true);
  };

  const selectHandler = (value) => {
    setSelectedValue(value);
  };

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };
  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `/api/search/search-category?name=${searchValue}`
    );

    setCategories(res.data);
    setSearchValue("");
  };
  return (
    <div className=" p-5">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className=" flex items-center justify-between">
          <h1 className=" text-xl font-semibold">Category</h1>
          <Button
            onClick={() => setIsDialogOpen(true)}
            size="sm"
            className=" bg-blue-500 rounded-xl hover:bg-blue-400"
          >
            + New Category
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
            <DialogTitle>Add Categories</DialogTitle>
            <DialogDescription>
              Make changes to your categories here. Click save when you're done.
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
                        placeholder={"category name"}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name={"name"}
                        type={"text"}
                        id={"name"}
                        value={values.name}
                        labelName={"Name"}
                        Icon={MdCategory}
                      />

                      <FormComponent
                        placeholder={"description"}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name={"description"}
                        type={"text"}
                        id={"description"}
                        value={values.description}
                        labelName={"Product descritpion"}
                        Icon={TbFileDescription}
                      />

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Active
                        </Label>
                        <Select onValueChange={selectHandler}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue
                              placeholder="Active"
                              value={selectedValue}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

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
                <TableHead className=" w-[200">Name</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => {
                console.log(category);
                return (
                  <TableRow key={category?._id}>
                    <TableCell className="font-medium">
                      {category?.name}
                    </TableCell>
                    <TableCell>{category?.description}</TableCell>
                    <TableCell>{category?.products?.length}</TableCell>
                    <TableCell className="">{category?.status}</TableCell>
                    <TableCell className=" space-x-2">
                      <Button
                        onClick={() => editHandler(category)}
                        size="sm"
                        className=" bg-blue-500"
                      >
                        {" "}
                        <Pencil size={15} className=" me-1 " />
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteCategory(category?._id)}
                        size="sm"
                        className="bg-red-500"
                      >
                        <Trash size={15} className="" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
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

export default AdminCategoryPage;
