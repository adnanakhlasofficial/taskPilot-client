"use client"

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { VscError } from "react-icons/vsc";

type Inputs = {
    enterId: number;
    password: number;
}

function SignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <div className="p-4 max-w-sm mx-auto border rounded-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm mx-auto">

                {/* Enter ID Field */}
                <div>
                    <label className="-mb-3 font-semibold">Enter Id</label><br />
                    <input
                        type="text"
                        placeholder="Enter your ID"
                        {...register("enterId", { required: "User ID is required" })}
                        className="border p-2 rounded hover:border-blue-500 focus:border-blue-500 outline-none w-full"
                    />
                {errors.enterId && <span className="text-red-500 mt-2 text-sm flex items-center gap-1"><VscError />{errors.enterId.message}</span>}
                </div>

                {/* Password Field */}
                <div className="relative">
                    <label className="-mb-3 font-semibold">Password</label> <br />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                        {...register("password", { required: "Password is required" })}
                        className="border p-2 rounded hover:border-blue-500 focus:border-blue-500 outline-none w-full"
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="btn btn-xs absolute right-2 mb-6 text-blue-500"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    {errors.password && <span className="text-red-500 mt-2 text-sm flex items-center gap-1"><VscError />{errors.password.message}</span>}
                </div>

                {/* Submit Button */}
                <input
                    type="submit"
                    value="Sign In"
                    className="bg-blue-500 text-white p-2 rounded cursor-pointer"
                />
            </form>
        </div>
    )
}

export default SignIn
