/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const emailSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const onsubmit = async (data: ForgotPasswordFormData) => {
    try {
      await useAuthStore.getState().forgotPassword(data.email);
      navigate("/verify-code");
    } catch (error: any) {
      if (error?.response?.status === 400) {
        toast.error("Email not found");
        return;
      }
      toast.error("Something went wrong");
      console.error("Forgot password failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Forgot Password
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Continue
          </button>

          <div className="flex flex-col items-end space-y-2">
            <div className="text-center text-sm text-gray-600">
              Don&apos;t have an account?
              <a
                href="/register"
                className="text-indigo-600 hover:text-indigo-500 font-medium ml-1"
              >
                Sign up
              </a>
            </div>
            <div className="text-center text-sm text-gray-600">
              Have an account?
              <a
                href="/login"
                className="text-indigo-600 hover:text-indigo-500 font-medium ml-1"
              >
                Sign in
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
