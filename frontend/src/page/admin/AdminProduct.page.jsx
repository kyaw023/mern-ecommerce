import React, { useContext, useEffect, useState } from "react";

import { Form, Formik } from "formik";
import * as yup from "yup";
import {
  FormComponent,
  LoadingComponent,
  PaginationComponent,
  ProductFormComponent,
  ProductTableComponent,
} from "../../components";
import axios from "../../helpers/axios";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import Swal from "sweetalert2";
import { ProductContext } from "../../context/ProductContext";

import useFetch from "../../hook/useFetch";

const AdminProductPage = () => {
  const { state, loading, dispatch, fetchProducts } =
    useContext(ProductContext);

  const [previewImage, setPreviewImage] = useState(null);

  const [file, setFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const [selectBrand, setSelectBrand] = useState("");

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    brand: "",
  });

  const [subImagesLists, setSubImagesLists] = useState([]);
  const [subPreviewImages, setSubPreviewImages] = useState([]);
  // get Categories
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/users/categories");
      setCategoriesOptions(res.data);
    })();
  }, []);

  // get brand
  const { data: brands, isError, isLoading } = useFetch(`/api/brand`);
  console.log(brands);

  // check validation of product form using yup
  const validationSchema = yup.object({
    name: yup.string().required("produc name is required"),
    description: yup.string().required("product description is required!"),
    stock: yup.string().required("stock is required"),
  });

  // select category
  const selectHandler = (value) => {
    setSelectedValue(value);
  };

  // select brand
  const selectBrandHandler = (value) => {
    setSelectBrand(value);
  };

  // create product function
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      let res;

      if (isEdit) {
        const updateProducts = {
          name: values.name,
          description: values.description,
          price: values.price,
          brand: selectBrand,
          stock: values.stock,
          category: selectedValue,
        };

        console.log(updateProducts);
        res = await axios.patch(`/api/admin/${id}/products`, updateProducts, {
          withCredentials: true,
        });
      } else {
        const addProducts = {
          name: values.name,
          description: values.description,
          price: values.price,
          brand: selectBrand,
          stock: values.stock,
          category: selectedValue,
        };

        res = await axios.post("/api/admin/products", addProducts, {
          withCredentials: true,
        });
      }

      let imageUpdate;

      if (file) {
        const formData = new FormData();
        formData.set("photo", file);

        imageUpdate = await axios.post(
          `/api/admin/${res.data?._id}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
      }

      let subImagesUpdate;
      if (subImagesLists.length > 0) {
        const subImagesFormData = new FormData();
        subImagesLists.forEach((file) => {
          subImagesFormData.append("subImages", file);
        });

        subImagesUpdate = await axios.post(
          `/api/admin/${res.data?._id}/uploadSubImages`,
          subImagesFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (res.status === 200) {
        if (isEdit) {
          dispatch({
            type: "UPDATE_PRODUCTS",
            payload: {
              ...res.data,
              images: imageUpdate?.data.images
                ? imageUpdate?.data.images
                : res.data.images,
              subImages: imageUpdate?.data.subImages
                ? imageUpdate?.data.subImages
                : res.data.subImages,
            },
          });
        } else {
          const addedProducts = {
            ...res.data,
            images: imageUpdate?.data.images
              ? imageUpdate?.data.images
              : res.data.images,
            subImages: imageUpdate?.data.subImages
              ? imageUpdate?.data.subImages
              : res.data.subImages,
          };

          dispatch({
            type: "ADD_PRODUCTS",
            payload: addedProducts,
          });
        }
        await fetchProducts();
        setIsDialogOpen(false);
        setInitialValues({
          name: "",
          description: "",
          price: 0,
          stock: 0,
          brand: "",
        });
        setPreviewImage(null);
        toast.success(`Product ${isEdit ? "update" : "create"} Successfully`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    }
  };

  // upload file
  const uploadHandler = (e) => {
    let file = e.target.files[0];
    setFile(file);

    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      setPreviewImage(e.target.result);
    };

    fileReader.readAsDataURL(file);
  };

  const uploadSubImagesHandler = (e) => {
    let fileLists = Array.from(e.target.files);
    setSubImagesLists(fileLists);

    let previews = [];
    fileLists.forEach((file) => {
      let fileReader = new FileReader();

      fileReader.onload = (e) => {
        previews.push(e.target.result);

        if (previews.length === fileLists.length) {
          setSubPreviewImages(previews);
        }
      };

      fileReader.readAsDataURL(file);
    });
  };

  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search);

  let page = searchQuery.get("page");

  page = parseInt(page) ? parseInt(page) : 1;

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  // delete products function
  const deleteHandler = (id) => {
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
          await axios.delete(`/api/admin/${id}/products`);
          dispatch({ type: "DELETE_PRODUCTS", payload: id });
          // setProducts((prev) => prev.filter((product) => product._id !== id));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  // edit product function
  const editHandler = (product) => {
    console.log(product);
    setIsEdit(true);
    setInitialValues({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    setSelectBrand(product?.brand);
    setSelectedValue(product.category);
    setId(product?._id);

    const subImageUrls = product?.subImages?.map((img) => {
      return import.meta.env.VITE_BACKEND_ASSET_URL + img;
    });
    console.log(subImageUrls);

    setSubPreviewImages(subImageUrls);
    setPreviewImage(import.meta.env.VITE_BACKEND_ASSET_URL + product?.images);
    setIsDialogOpen(true);
  };

  const createHandler = () => {
    setIsEdit(false);
    setInitialValues({
      name: "",
      description: "",
      price: 0,
      stock: 0,
    });
    setPreviewImage(null);
    setSubPreviewImages([]);
    setIsDialogOpen(true);
  };

  return (
    <LoadingComponent isLoading={loading}>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className=" p-5 shadow h-[1000px]">
          <div className=" flex items-center justify-between">
            <h1 className=" text-lg font-semibold">Products</h1>
            <div>
              <Button onClick={createHandler} variant="outline">
                {" "}
                + Create Products
              </Button>
              <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                  <DialogTitle>
                    {isEdit ? "Edit" : "Create"} Products
                  </DialogTitle>
                  <DialogDescription>
                    Make product to your products lists. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <ProductFormComponent
                  initialValues={initialValues}
                  selectValue={selectedValue}
                  previewImage={previewImage}
                  subPreviewImages={subPreviewImages}
                  uploadHandler={uploadHandler}
                  uploadSubImagesHandler={uploadSubImagesHandler}
                  handleSubmit={handleSubmit}
                  isEdit={isEdit}
                  brands={brands}
                  selectedValue={selectedValue}
                  selectBrand={selectBrand}
                  selectBrandHandler={selectBrandHandler}
                  categoriesOptions={categoriesOptions}
                />
              </DialogContent>
            </div>
          </div>
          <Separator className=" mt-3" />

          <div>
            <ProductTableComponent
              state={state}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
            />
            <PaginationComponent state={state} page={page} />
          </div>
        </div>
      </Dialog>
    </LoadingComponent>
  );
};

export default AdminProductPage;
