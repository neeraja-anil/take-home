"use client";

import api from "@/app/utils/axios-config";
import { ROUTES, UN_AUTH_PAGES } from "@/components/utils/constants";
import { handleLogin } from "@/helperFunctionsForAPI/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function LoginPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: (formData) => handleLogin(formData),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
      if ({ data }) {
        localStorage.setItem("user", JSON.stringify(data));
        router.push(ROUTES.HOME);
      }
    },
    onError: (error: any) => {
      toast.error(error.error);
    },
  });

  const onValuesChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={onSubmit}
            // data-testid="signup-form"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  autoComplete="email"
                  value={formData?.email || ""}
                  onChange={onValuesChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  value={formData?.password || ""}
                  onChange={onValuesChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                data-testid="signup-form"
              >
                {loginMutation?.isPending ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <div
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
              onClick={() => router.push(UN_AUTH_PAGES.REGISTER)}
            >
              Register Now
            </div>
          </p>
        </div>
      </div>
    </>
  );
}
