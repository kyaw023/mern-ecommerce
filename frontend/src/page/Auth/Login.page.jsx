import React, { useContext } from "react";
import Lottie from "lottie-react";
import login from "../../lottie/Login.json";
import { Button } from "../../components/ui/button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { FormComponent } from "../../components";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { BsEnvelope } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";

const LoginPage = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const nav = useNavigate();

  const { dispatch } = useContext(AuthContext);

  // check validation of register form using yup
  const validationSchema = yup.object({
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
        "http://localhost:4000/api/users/login",
        values,
        {
          withCredentials: true,
        }
      );
      if (user.status === 200) {
        dispatch({ type: "LOGIN", payload: user.data.user });
        nav("/");
        toast.success(`Login Successfully`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Login Fail");
    }
  };
  return (
    <div className=" flex items-center justify-center h-screen ">
      {/* register form */}
      <div className=" bg-white dark:bg-slate-900 w-[800px] border border-blue-500 dark:border-blue-300 shadow-md rounded-xl  p-10 space-y-4 ">
        <div className=" flex items-center justify-between">
          <div>
            <h1 className=" text-xl font-semibold dark:text-slate-100">
              Login Form
            </h1>

            <p className=" text-sm text-slate-400 mt-2">
              Don't you have an account{" "}
              <Link to={"/register"} className=" text-blue-500">
                sign-up
              </Link>
            </p>
          </div>
          <Link to={"/register"} className=" text-red-500 text-sm">
            forget password
          </Link>
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
                      className=" w-full dark:bg-gray-950 dark:text-slate-100 dark:hover:bg-slate-900 dark:border border-blue-300 dark:focus:border-blue-400  "
                    >
                      Login
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
            <Lottie className=" w-[320px]" animationData={login} loop={true} />;
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
