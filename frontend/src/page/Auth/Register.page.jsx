import React from "react";
import Lottie from "lottie-react";
import signUp from "../../lottie/signUp.json";
import { Button } from "../../components/ui/button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { FormComponent } from "../../components";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { CiUser } from "react-icons/ci";
import { BsEnvelope } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";

const RegisterPage = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const nav = useNavigate();

  // check validation of register form using yup
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .required("Email is required!")
      .email("Invalid email format!"),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be 8 letters"),
  });

  // create user function
  const handleSubmit = async (values) => {
    try {
      const user = await axios.post(
        "http://localhost:4000/api/users/register",
        values,
        {
          withCredentials: true,
        }
      );
      if (user.status === 200) {
        nav("/login");
        toast.success(`Register Successfully`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.errors?.email?.msg);
    }
  };

  return (
    <div className=" flex items-center justify-center h-screen ">
      {/* register form */}
      <div className=" bg-white dark:bg-slate-900 w-[800px] border border-blue-500 shadow-md rounded-xl  p-10 space-y-4 ">
        <div>
          <h1 className=" text-xl font-semibold dark:text-slate-100">
            Register Form
          </h1>
          <p className=" text-sm text-slate-400 mt-2">
            Already have an account{" "}
            <Link to={"/login"} className=" text-blue-500">
              login here
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-10">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                    className=" w-full space-y-4 border p-5 rounded"
                  >
                    <FormComponent
                      placeholder={"Enter your name"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name={"name"}
                      type={"text"}
                      id={"name"}
                      value={values.name}
                      labelName={"Name"}
                      Icon={CiUser}
                    />

                    <FormComponent
                      placeholder={"Enter your email"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name={"email"}
                      type={"email"}
                      id={"email"}
                      value={values.email}
                      labelName={"Email"}
                      Icon={BsEnvelope}
                    />

                    <FormComponent
                      placeholder={"Enter your password"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name={"password"}
                      type={"password"}
                      id={"password"}
                      value={values.password}
                      labelName={"Password"}
                      Icon={RiLockPasswordLine}
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className=" w-full dark:bg-gray-950 dark:text-slate-100 dark:hover:bg-slate-900 dark:border border-blue-300 dark:focus:border-blue-400"
                    >
                      Sign Up
                      {isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                    </Button>
                  </Form>
                }
              </>
            )}
          </Formik>

          {/* login image */}
          <div>
            <Lottie animationData={signUp} loop={false} />;
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
