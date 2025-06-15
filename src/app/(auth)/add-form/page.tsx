"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { VscError } from "react-icons/vsc";

type Inputs = {
  projectName: string;
  projectDescription: string;
  userName: string;
  mobileNumber: number;
  projectId: number;
  projectPrice: number;
};

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="lg:w-10/12 mx-auto lg:flex lg:flex-row-reverse h-screen gap-12 p-8 lg:px-12">
      <div className="w-full items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <h1 className="text-3xl font-bold mb-6 text-[#6C63FF]">
            Add Project
          </h1>
          {/* project name */}
          <div className="mb-6">
            <label className="font-semibold">Project name</label>
            <br />
            <input
              type="text"
              placeholder="Enter Your Project Name"
              {...register("projectName", { required: "Project Name is required" })}
              className="border p-2 rounded hover:border-blue-500 focus:border-blue-500 outline-none w-full"
            />
            {errors.projectName && (
              <span className="text-red-500 mt-2 text-sm flex items-center gap-1">
                <VscError />
                {errors.projectName.message}
              </span>
            )}
          </div>
          {/* project description */}
          <div className="mb-6">
            <label className="font-semibold">Project Description</label>
            <br />
            <input
              type="text"
              placeholder="Enter Your Project Description"
              {...register("projectDescription", { required: "Project Description is required" })}
              className="border p-2 rounded hover:border-blue-500 focus:border-blue-500 outline-none w-full"
            />
            {errors.projectName && (
              <span className="text-red-500 mt-2 text-sm flex items-center gap-1">
                <VscError />
                {errors.projectName.message}
              </span>
            )}
          </div>
          {/* user name*/}
          <div className="mb-6">
            <label className="font-semibold">User Name</label>
            <br />
            <input
              type="text"
              placeholder="Enter User Name"
              {...register("userName", { required: "User Name is required" })}
              className="border p-2 rounded hover:border-blue-500 focus:border-blue-500 outline-none w-full"
            />
            {errors.projectName && (
              <span className="text-red-500 mt-2 text-sm flex items-center gap-1">
                <VscError />
                {errors.projectName.message}
              </span>
            )}
          </div>
          {/* mobile number*/}
          <div className="mb-6">
            <label className="font-semibold">Mobile number</label>
            <br />
            <input
              type="number"
              placeholder="Enter mobile number"
              {...register("mobileNumber", { required: "User Name is required" })}
              className="border p-2 rounded hover:border-blue-500 focus:border-blue-500 outline-none w-full"
            />
            {errors.projectName && (
              <span className="text-red-500 mt-2 text-sm flex items-center gap-1">
                <VscError />
                {errors.projectName.message}
              </span>
            )}
          </div>
          {/* project id*/}
          <div className="mb-6">
            <label className="font-semibold">Project Id</label>
            <br />
            <input
              type="number"
              placeholder="Enter project Id"
              {...register("projectId", { required: "Project Id is required" })}
              className="border p-2 rounded hover:border-blue-500 focus:border-blue-500 outline-none w-full"
            />
            {errors.projectName && (
              <span className="text-red-500 mt-2 text-sm flex items-center gap-1">
                <VscError />
                {errors.projectName.message}
              </span>
            )}
          </div>
          {/* project Price*/}
          <div className="mb-6">
            <label className="font-semibold">Project Price</label>
            <br />
            <input
              type="number"
              placeholder="Enter Project Price"
              {...register("projectPrice", { required: "Project Id is required" })}
              className="border p-2 rounded hover:border-blue-500 focus:border-blue-500 outline-none w-full"
            />
            {errors.projectName && (
              <span className="text-red-500 mt-2 text-sm flex items-center gap-1">
                <VscError />
                {errors.projectName.message}
              </span>
            )}
          </div>
          {/* project Price*/}
          <div className="mb-6">
            <label className="font-semibold">Project Price</label>
            <br />
            <input
              type="number"
              placeholder="Enter Project Price"
              {...register("projectPrice", { required: "Project Id is required" })}
              className="border p-2 rounded hover:border-blue-500 focus:border-blue-500 outline-none w-full"
            />
            {errors.projectName && (
              <span className="text-red-500 mt-2 text-sm flex items-center gap-1">
                <VscError />
                {errors.projectName.message}
              </span>
            )}
          </div>
          {/* Submit Button */}
          <input
            type="submit"
            value="Sign In"
            className="bg-[#6C63FF] text-white p-2 rounded cursor-pointer w-full hover:bg-[#5a54e6] transition-colors duration-300 mt-6 mb-6 lg:mb-0"
          />
        </form>
      </div>
    </div>
  );
}

export default SignIn;