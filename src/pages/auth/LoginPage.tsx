/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";



interface FormData {
  emailORphone: string;
  password: string;
}


const LoginPage: React.FC = () => {

  const dispatch = useAppDispatch();
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [login] = useLoginMutation();

  const onSubmit = async (data: FormData) => {
    const tostId = toast.loading("Login in");
    const payload = {
      emailORphone: data.emailORphone,
      password: data.password,
    };

    try {
      const res = await login(payload).unwrap();
      const {name,email,role,phone} = verifyToken(res.data?.token);
      dispatch(setUser({ user: {name,email,role,phone}, token: res.data?.token }));

      if (role === "Super Admin") {
        navigate("/admin/dashboard");
      } else if (role === "Merchant") {
        navigate("/merchant/dashboard");
      } else if (role === "Delivery Man") {
        navigate("/rider/assigned-parcels");
      }

      toast.success("Loged in Success!", { id: tostId });
    } catch (error:any) {
      toast.error(error.data.message, { id: tostId });
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Login Form */}
        <div className="p-8 md:w-1/2">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <FaSignInAlt className="text-red-600 text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-600 mt-2">Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address or Phone
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="you@example.com or 016XXXXXXXX"
                  {...register("emailORphone", {
                    required: "Email or Phone is required",
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                />
                <FaEnvelope className="absolute right-2 top-2 w-5 h-5 text-gray-400" />
              </div>
              {errors.emailORphone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.emailORphone.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"

              className="w-full bg-[#d63384] text-white py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
            >
               Login
            </button>
          </form>

          <div className="mt-4 text-left">
            <p className="text-gray-600">
              Don't have an account?
              <Link
                to="/registration"
                className="text-[#d63384] font-semibold ml-2"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Full Image (Hidden on Small Devices) */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-4">
          <img
            src="https://cte.fitspick.com/public/images/default/we-courier-process.png"
            alt="Process"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
