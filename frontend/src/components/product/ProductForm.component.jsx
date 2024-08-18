import React from "react";
import FormComponent from "../Form/Form.component";
import { Form, Formik } from "formik";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  FaTags,
  FaFileSignature,
  FaDollarSign,
  FaBuilding,
  FaBox,
} from "react-icons/fa";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

const ProductFormComponent = ({
  initialValues,
  validationSchema,
  handleSubmit,
  selectBrandHandler,
  selectHandler,
  selectBrand,
  selectedValue,
  categoriesOptions,
  brands,
  isEdit,
  uploadHandler,
  uploadSubImagesHandler,
  previewImage,
  subPreviewImages,
}) => {
  return (
    <div className="flex items-center gap-10">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <>
            {
              <Form
                onSubmit={handleSubmit}
                className=" w-full space-y-6 border p-5 rounded"
              >
                <FormComponent
                  placeholder={"product name"}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  name={"name"}
                  type={"text"}
                  id={"name"}
                  value={values.name}
                  labelName={"Name"}
                  Icon={FaTags}
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
                  Icon={FaFileSignature}
                />

                <div className="">
                  <Label
                    htmlFor="name"
                    className="text-right dark:text-slate-100"
                  >
                    Category
                  </Label>
                  <Select
                    className=" dark:text-slate-100"
                    onValueChange={selectHandler}
                  >
                    <SelectTrigger className=" dark:text-slate-100">
                      <SelectValue
                        placeholder="Select a category"
                        value={selectedValue}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesOptions.map((category) => (
                        <SelectItem
                          className=" dark:text-slate-100"
                          key={category?._id}
                          value={category?._id}
                        >
                          {category?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="">
                  <Label
                    htmlFor="name"
                    className="text-right dark:text-slate-100"
                  >
                    Brand
                  </Label>
                  <Select onValueChange={selectBrandHandler}>
                    <SelectTrigger className=" dark:text-slate-100">
                      <SelectValue
                        placeholder="Select a brand"
                        value={selectBrand}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((b) => (
                        <SelectItem key={b?._id} value={b?._id}>
                          {b?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className=" flex items-center space-x-2">
                  <FormComponent
                    placeholder={"Price"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name={"price"}
                    type={"number"}
                    id={"price"}
                    value={values.price}
                    labelName={"Price"}
                    Icon={FaDollarSign}
                  />
                  <FormComponent
                    placeholder={"stock"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name={"stock"}
                    type={"number"}
                    id={"stock"}
                    value={values.stock}
                    labelName={"Stock"}
                    Icon={FaBuilding}
                  />
                </div>

                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className=" w-full active:scale-110 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    {isEdit ? "Update" : "Saved"}
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

      {/* login image */}
      <div className=" flex flex-col">
        <div>
          <Label className=" dark:text-slate-200" htmlFor="image">
            Upload Image
          </Label>
          <Input
            className=" mt-2 dark:text-slate-200"
            type="file"
            name="image"
            onChange={uploadHandler}
            id="image"
          />
          <div className=" mt-4">
            {previewImage && (
              <img className=" w-40 h-40" src={previewImage} alt="" />
            )}
          </div>

          <div>
            <Label className="dark:text-slate-200" htmlFor="images">
              Upload Sub Image
            </Label>
            <Input
              multiple
              className=" mt-2 dark:text-slate-200"
              type="file"
              name="images"
              onChange={uploadSubImagesHandler}
              id="images"
            />
            <div className=" mt-4 grid grid-cols-2 gap-3 ">
              {subPreviewImages?.map((subImg, index) => {
                console.log(subImg);
                return (
                  <img
                    key={index}
                    className="h-20 w-20 object-cover"
                    src={subImg}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormComponent;
