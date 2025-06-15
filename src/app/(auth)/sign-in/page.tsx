"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// ✅ Mock user data (fixed: passwords as strings)
const mockUsers = [
  { id: 1001, password: "a1234" },
  { id: 1002, password: "b5678" },
  { id: 1003, password: "c9999" },
];

type Inputs = {
  enterId: string;
  password: string;
};

function SignIn() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const idNumber = parseInt(data.enterId); // keep as number if your IDs are numeric
    const password = data.password;

    const matchedUser = mockUsers.find(
      (user) => user.id === idNumber && user.password === password
    );

    if (matchedUser) {
      toast.success("Login successful!");
      router.push("/");
    } else {
      toast.error("Invalid ID or Password");
    }
  };

  return (
    <div className="lg:w-10/12 mx-auto lg:flex lg:flex-row-reverse h-screen gap-12 p-8 lg:px-12">
      <div className="lg:w-1/2 flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <h1 className="text-3xl font-bold mb-6 text-[#6C63FF]">
            Task Pilot Client
          </h1>
          {/* Enter ID Field */}
          <div className="mb-6">
            <label className="font-semibold">Enter Id</label>
            <br />
            <input
              type="text"
              placeholder="Enter your ID"
              {...register("enterId", { required: "User ID is required" })}
              className="border p-2 rounded hover:border-blue-500 focus:border-blue-500 outline-none w-full"
            />
            {errors.enterId && (
              <span className="text-red-500 mt-2 text-sm flex items-center gap-1">
                <VscError />
                {errors.enterId.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="font-semibold">Password</label> <br />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              {...register("password", { required: "Password is required" })}
              className="border p-2 rounded hover:border-blue-500 focus:border-blue-500 outline-none w-full"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-xs absolute right-4 top-9 text-[#6C63FF]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <span className="text-red-500 mt-2 text-sm flex items-center gap-1">
                <VscError />
                {errors.password.message}
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

      <div className="lg:w-1/2 flex items-center justify-center">
        <Image
          src="/loginImg.svg"
          width={150}
          height={150}
          alt="Login image"
          className="w-full"
        />
      </div>
    </div>
  );
}

export default SignIn;
