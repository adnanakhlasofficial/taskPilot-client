// "use client"

// import Image from "next/image";
// import { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form"
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { VscError } from "react-icons/vsc";

// type Inputs = {
//     enterId: number;
//     password: number;
// }

// function SignIn() {
//     const [showPassword, setShowPassword] = useState(false)
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<Inputs>()

//     const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

//     return (
//         <div className="w-11/12 lg:w-1/2 mx-auto">
//             <div className="text-center text-4xl">
//                 <h1>Task Pilot Client</h1>
//             </div>
//             <div className="grid lg:grid-cols-2 justify-center items-center">
//                 <div className="w-full">
//                     <Image className="w-full h-[500px]" src={"/signinImg.png"} height={150} width={150} alt="signin image"></Image>
//                 </div>
//                 {/* <div className="p-4 max-w-sm mx-auto border rounded-sm"> */}
//                 <form onSubmit={handleSubmit(onSubmit)}>

//                     {/* Enter ID Field */}
//                     <div className="w-full">
//                         <label className="-mb-3 font-semibold">Enter Id</label><br />
//                         <input
//                             type="text"
//                             placeholder="Enter your ID"
//                             {...register("enterId", { required: "User ID is required" })}
//                             className="border p-2 rounded hover:border-blue-500 focus:border-blue-500 outline-none w-full"
//                         />
//                         {errors.enterId && <span className="text-red-500 mt-2 text-sm flex items-center gap-1"><VscError />{errors.enterId.message}</span>}
//                     </div>

//                     {/* Password Field */}
//                     <div className="relative">
//                         <label className="-mb-3 font-semibold">Password</label> <br />
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Enter Your Password"
//                             {...register("password", { required: "Password is required" })}
//                             className="border p-2 rounded hover:border-blue-500 focus:border-blue-500 outline-none w-full"
//                         />
//                         <span
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="btn btn-xs absolute right-2 top-9 text-blue-500"
//                         >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </span>
//                         {errors.password && <span className="text-red-500 mt-2 text-sm flex items-center gap-1"><VscError />{errors.password.message}</span>}
//                     </div>

//                     {/* Submit Button */}
//                     <input
//                         type="submit"
//                         value="Sign In"
//                         className="bg-blue-500 text-white p-2 rounded cursor-pointer"
//                     />
//                 </form>
//             </div>
//         </div>
//         // </div>
//     )
// }

// export default SignIn


"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { VscError } from "react-icons/vsc";

type Inputs = {
  enterId: number;
  password: number;
};

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10">
      {/* Title */}
      <div className="text-center text-3xl md:text-4xl font-bold mb-8 text-blue-700">
        <h1>Task Pilot Client</h1>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full items-center">
        {/* Image Section */}
        <div className="w-full h-64 md:h-96 relative">
          <Image
            src="/signinImg.png"
            alt="Sign In"
            fill
            className="object-cover rounded"
          />
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-5 bg-gray-100 p-6 md:p-8 rounded shadow"
        >
          {/* Enter ID */}
          <div>
            <label className="block font-semibold mb-1">Enter ID</label>
            <input
              type="text"
              placeholder="Enter your ID"
              {...register("enterId", { required: "User ID is required" })}
              className="border p-2 rounded w-full hover:border-blue-500 focus:border-blue-500 outline-none"
            />
            {errors.enterId && (
              <span className="text-red-500 text-sm flex items-center gap-1 mt-1">
                <VscError />
                {errors.enterId.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block font-semibold mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              {...register("password", { required: "Password is required" })}
              className="border p-2 pr-10 rounded w-full hover:border-blue-500 focus:border-blue-500 outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-blue-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <span className="text-red-500 text-sm flex items-center gap-1 mt-1">
                <VscError />
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <input
            type="submit"
            value="Sign In"
            className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 cursor-pointer transition duration-200"
          />
        </form>
      </div>
    </div>
  );
}

export default SignIn;

