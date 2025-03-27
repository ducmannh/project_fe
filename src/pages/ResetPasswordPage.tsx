import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useAuthStore from "../store/authStore";
import authApi from "../api/authApi";
import React from "react";
import { EyeIcon, EyeIconSlash } from "../components/IconEyes";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const email = useAuthStore((state) => state.email);
  const code = useAuthStore((state) => state.code);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] =
    React.useState(false);
  console.log(email, code);
  const schema = z
    .object({
      newPassword: z.string().min(5, "Password must be at least 5 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { newPassword: string }) => {
    try {
      if (!email || !code) {
        throw new Error("Email and code are required");
      }
      await authApi.resetPassword(email, code, data.newPassword);
      navigate("/login");
    } catch (error) {
      console.error("Reset password failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Reset Password
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="New Password"
                {...register("newPassword")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeIconSlash /> : <EyeIcon />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword?.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showNewConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all mb-2"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                onClick={() =>
                  setShowNewConfirmPassword(!showNewConfirmPassword)
                }
              >
                {showNewConfirmPassword ? <EyeIconSlash /> : <EyeIcon />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword?.message as string}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
