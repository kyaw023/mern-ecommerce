import React, { useContext, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";

import * as Yup from "yup";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import FormComponent from "../../components/Form/Form.component";
import { Globe, Hash, Mail, Map, MapPin, Phone, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import axios from "../../helpers/axios";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const CheckoutFormPage = () => {
  const { state: orderSummary } = useContext(CartContext);
  const { state } = useContext(AuthContext);

  const user = state?.user;

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    name: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    postalCode: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    deliveryMethod: Yup.string().required("Required"),
  });

  const initialValues = {
    email: user?.email || "",
    name: user?.name || "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    deliveryMethod: "",
  };

  const [selectedMethod, setSelectedMethod] = useState("standard");

  const handleSelection = (method) => {
    setSelectedMethod(method);
  };

  const subTotal = orderSummary.carts.reduce(
    (av, cv) => av + cv.product.price * cv.quantity,
    0
  );

  const deliveryFee = selectedMethod === "express" ? 16 : 5;
  const total = subTotal + deliveryFee;

  console.log("subTotal :", subTotal);
  console.log("deliveryFee :", deliveryFee);

  console.log("total :", total);

  const handleSubmit = async (values) => {
    console.log(values);
    const shippingAddress = {
      email: values?.email,
      name: values?.name,
      address: values.address,
      city: values.city,
      country: values?.country,
      postalCode: values?.postalCode,
      phone: values?.phone,
      deliveryMethod: selectedMethod,
    };
    console.log(orderSummary.carts);
    const res = await axios.post("/api/order", {
      user,
      products: orderSummary.carts,
      totalAmount: total,
      shippingAddress,
    });

    if (res.status === 200) {
      window.location.href = res.data.session_url;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-transparent min-h-screen py-12">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className=" grid md:grid-cols-2 grid-cols-1 gap-6 items-start">
          <div className="">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900  dark:text-slate-100 sm:text-4xl mb-8">
              Checkout
            </h2>
            <div className=" w-full">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  setFieldValue,
                  values,
                  handleBlur,
                  handleChange,
                  isSubmitting,
                }) => (
                  <Form>
                    <div className="">
                      <div className="space-y-8 border p-4 rounded-md">
                        {/* Contact Information */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">
                            Contact Information
                          </h3>
                          <FormComponent
                            placeholder={"Enter your email"}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name={"email"}
                            type={"email"}
                            id={"email"}
                            value={values.email}
                            labelName={"Email"}
                            Icon={Mail} // Use the appropriate icon
                          />
                        </div>

                        {/* Shipping Information */}
                        <div className=" space-y-3">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">
                            Shipping Information
                          </h3>
                          <FormComponent
                            placeholder={"Enter your name"}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name={"name"}
                            type={"text"}
                            id={"name"}
                            value={values.name}
                            labelName={"Name"}
                            Icon={User}
                          />

                          <FormComponent
                            placeholder={"Enter your address"}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name={"address"}
                            type={"text"}
                            id={"address"}
                            value={values.address}
                            labelName={"Address"}
                            Icon={MapPin}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormComponent
                              placeholder={"Enter your city"}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                              name={"city"}
                              type={"text"}
                              id={"city"}
                              value={values.city}
                              labelName={"City"}
                              Icon={Map}
                            />
                            <FormComponent
                              placeholder={"Enter your country"}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                              name={"country"}
                              type={"text"}
                              id={"country"}
                              value={values.country}
                              labelName={"Country"}
                              Icon={Globe}
                            />
                          </div>
                          <FormComponent
                            placeholder={"Enter your postal code"}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name={"postalCode"}
                            type={"text"}
                            id={"postalCode"}
                            value={values.postalCode}
                            labelName={"Postal Code"}
                            Icon={Hash}
                          />

                          <FormComponent
                            placeholder={"Enter your phone number"}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name={"phone"}
                            type={"text"}
                            id={"phone"}
                            value={values.phone}
                            labelName={"Phone"}
                            Icon={Phone}
                          />
                        </div>

                        {/* Delivery Method */}
                        <div>
                          <h2 className="text-lg font-medium text-gray-900 dark:text-slate-100">
                            Delivery Method
                          </h2>
                          <div className="mt-4 space-x-4 grid grid-cols-2">
                            <div
                              className={`relative flex items-start justify-between border px-2 py-4 rounded-xl ${
                                values.deliveryMethod === "standard"
                                  ? "border-blue-500"
                                  : ""
                              }`}
                              onClick={() => {
                                setFieldValue("deliveryMethod", "standard");
                                setSelectedMethod("standard");
                              }}
                            >
                              <div className="ml-3 text-sm space-y-2">
                                <label
                                  htmlFor="standard"
                                  className="font-medium text-gray-700 dark:text-slate-200"
                                >
                                  Standard
                                </label>
                                <p className="text-gray-500 dark:text-slate-200">
                                  4–10 business days
                                </p>
                                <p className="text-gray-900 dark:text-slate-200">
                                  $5.00
                                </p>
                              </div>
                              <div className="flex items-center h-5">
                                <input
                                  id="standard"
                                  name="deliveryMethod"
                                  type="radio"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                  checked={values.deliveryMethod === "standard"}
                                  onChange={() => {
                                    setFieldValue("deliveryMethod", "standard");
                                    setSelectedMethod("standard");
                                  }}
                                />
                              </div>
                            </div>
                            <div
                              className={`relative flex items-start justify-between border px-2 py-4 rounded-xl ${
                                values.deliveryMethod === "express"
                                  ? "border-blue-500"
                                  : ""
                              }`}
                              onClick={() => {
                                setFieldValue("deliveryMethod", "express");
                                setSelectedMethod("express");
                              }}
                            >
                              <div className="ml-3 text-sm space-y-2">
                                <label
                                  htmlFor="express"
                                  className="font-medium text-gray-700 dark:text-slate-200"
                                >
                                  Express
                                </label>
                                <p className="text-gray-500 dark:text-slate-200">
                                  2–5 business days
                                </p>
                                <p className="text-gray-900 dark:text-slate-200">
                                  $16.00
                                </p>
                              </div>
                              <div className="flex items-center h-5">
                                <input
                                  id="express"
                                  name="deliveryMethod"
                                  type="radio"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                  checked={values.deliveryMethod === "express"}
                                  onChange={() => {
                                    setFieldValue("deliveryMethod", "express");
                                    setSelectedMethod("express");
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <ErrorMessage
                            name="deliveryMethod"
                            component="div"
                            className="text-red-600 text-sm"
                          />
                        </div>

                        <div>
                          <Button
                            className="w-full dark:bg-slate-950 hover:dark:bg-slate-900 dark:text-slate-200"
                            type="submit"
                          >
                            Make a Payment
                            {isSubmitting && (
                              <FaSpinner className=" animate-spin dark:text-slate-200" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">
              Order summary
            </h3>
            <div className="mt-4">
              {orderSummary.carts.map((item) => {
                console.log(item);
                return (
                  <div key={item?._id} className="flex space-x-4">
                    <div className=" w-40 h-40">
                      <img
                        className="h-20 border p-2 rounded-md object-cover object-center"
                        src={
                          import.meta.env.VITE_BACKEND_ASSET_URL +
                          item?.product?.images
                        }
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm">
                          <a
                            href="#"
                            className="font-medium text-gray-700 hover:text-gray-800 dark:text-slate-200"
                          >
                            {item?.product?.name}
                          </a>
                        </h4>
                        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                          {item?.product?.description}
                        </p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-slate-200">
                          {item.quantity} x ${item?.product?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <div className="border-t border-gray-200 dark:border-slate-300 pt-4 mt-4 space-y-2">
                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-slate-200">
                  <p>Subtotal</p>
                  <p>$ {subTotal}</p>
                </div>

                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-slate-200">
                  <p>Delivery Fees</p>
                  <p>$ {deliveryFee}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-slate-200">
                  <p>Total</p>
                  <p>$ {total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFormPage;
