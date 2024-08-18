import React from "react";

import { Form, Formik } from "formik";
import { Eye, Mail } from "lucide-react";
import * as Yup from "yup";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "../../helpers/axios";
import { FormComponent } from "../../components";
import { Button } from "../../components/ui/button";

const PasswordResetFormPage = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const nav = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be 8 letters"),
  });

  const handleSubmit = async (values) => {
    let res;
    try {
      res = await axios.post("/api/users/reset-password", values);
      if (res.status === 200) {
        toast.success(res.data.msg);
        nav("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>

            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, handleBlur, handleChange }) => (
                  <Form>
                    <div className="space-y-8 border p-4 rounded-md">
                      {/* Contact Information */}
                      <div className=" space-y-3">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">
                          Contact Information
                        </h3>
                        <FormComponent
                          placeholder={"name@gmail.com"}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name={"email"}
                          type={"email"}
                          id={"email"}
                          value={values.email}
                          labelName={"Your Email"}
                          Icon={Mail} // Use the appropriate icon
                        />
                        <FormComponent
                          placeholder={"**********"}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name={"password"}
                          type={"password"}
                          id={"password"}
                          value={values.password}
                          labelName={"New Password"}
                          Icon={Eye} // Use the appropriate icon
                        />
                        <Button className="w-full" type="submit">
                          Reset Password
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PasswordResetFormPage;
