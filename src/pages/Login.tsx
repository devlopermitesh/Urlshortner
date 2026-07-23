import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../utils/api";
import { LoginUserSchema, type TLoginRequest } from "../schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router";

const LoginPage = () => {

  const navigate = useNavigate(); 
  const location = useLocation();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginRequest>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      Password: "",
    },
  });

  const onSubmit = async (data: TLoginRequest) => {
    setServerError(null);
    try {
      const response = await api.post("/users/login", data);
      if(response.data.data){
        const from = (location.state as { from?: string } | null)?.from ?? "/products";
        navigate(from, { replace: true });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setServerError(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {serverError && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {serverError}
            </div>
          )}
          <div>
            <label htmlFor="login-email" className="mb-1 block text-sm font-medium">Email</label>
            <input
              id="login-email"
              type="email"
              {...register("email")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="login-password" className="mb-1 block text-sm font-medium">Password</label>
            <input
              id="login-password"
              type="password"
              {...register("Password")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
            {errors.Password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.Password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          dont  have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
