import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ErrorMessage } from "formik";

const FormComponent = ({
  labelName,
  type,
  name,
  id,
  handleBlur,
  handleChange,
  value,
  placeholder,
  Icon,
}) => {
  return (
    <div className=" ">
      <Label htmlFor="password" className=" dark:text-slate-100">
        {labelName}
      </Label>
      <div className="relative">
        <Input
          className=" mt-2 pl-12 dark:text-slate-100 dark:bg-slate-900 focus:bg-slate-900"
          type={type}
          name={name}
          id={id}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          placeholder={placeholder}
        />

        <div className="absolute inset-y-0 left-1 flex items-center pl-3">
          {Icon && <Icon className="h-5 w-5 text-gray-500" />}{" "}
        </div>
      </div>
      <ErrorMessage
        className="  text-red-600 text-xs mt-1"
        component={"p"}
        name={name}
      />
    </div>
  );
};

export default FormComponent;
