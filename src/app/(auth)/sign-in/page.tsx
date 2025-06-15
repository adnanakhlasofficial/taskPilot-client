

"use client";

import Image from "next/image"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Schema 
const formSchema = z.object({
  userid: z.string().min(4, {
    message: "User Id must be at least 4 characters.",
  }),
  password: z.string().min(6, {
    message: "User Id must be at least 6 characters.",
  }),
});

// type define
type FormData = z.infer<typeof formSchema>;

function SignIn() {
  // useForm hook setup
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userid: "",
      password: "",
    },
  });

  // submit handler
  const onSubmit = (data: FormData) => {
    console.log("Submitted data:", data);
  };

  return (
    <div className="lg:w-10/12 mx-auto lg:flex lg:flex-row-reverse h-screen gap-12 p-8 lg:px-12">
      <div className="lg:w-1/2 flex items-center justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mb-6 lg:mb-0">
           <h1 className="text-3xl font-bold mb-6">Task Pilot Client</h1>
            <FormField
              control={form.control}
              name="userid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UserId</FormLabel>
                  <FormControl>
                    <Input placeholder="User Id" {...field}  className="w-full"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field}  className="w-full"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </div>

      <div className="lg:w-1/2 flex items-center justify-center">
        <Image
          src="/loginImg.svg"
          width={500}
          height={500}
          alt="Login image"
          className="w-full"
        />
      </div>
    </div>
  );
}

export default SignIn;

