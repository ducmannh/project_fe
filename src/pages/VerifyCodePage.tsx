/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";

const VerifyCodePage = () => {
  const navigate = useNavigate();
  const email = useAuthStore((state) => state.email);
  const { verifyCode, forgotPassword } = useAuthStore();

  const schema = z.object({
    code: z.string().min(6, "Please enter a valid verification code"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onsubmit = async (data: { code: string }) => {
    try {
      if (!email) {
        throw new Error("Email is required");
      }
      await verifyCode(email, data.code);
      navigate("/reset-password");
    } catch (error: any) {
      if (error?.response?.status === 400) {
        toast.error("The verification code is invalid or has expired.");
      } else {
        toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    }
  };

  const handleResendCode = async () => {
    try {
      if (!email) {
        throw new Error("Email is required");
      }
      await forgotPassword(email);
      toast.success("A new verification code has been sent to your email.");
    } catch (error: any) {
      if (error?.response?.status === 400) {
        toast.error("Something went wrong");
      } else {
        toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Verify Code
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
          <p>
            We have sent a confirmation code to your email {email} Please check
            your email and enter the code to continue.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Code
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="Code"
              {...register("code")}
            />
            {errors.code && (
              <p className="text-red-500 text-sm">{errors.code.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Continue
          </button>

          <div className="text-center text-sm text-gray-600">
            Not received code?
            <button
              type="button"
              onClick={handleResendCode}
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm underline ml-1"
            >
              Resend code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyCodePage;
