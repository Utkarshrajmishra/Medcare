import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/zod-schema/auth";
import { useState } from "react";
import { auth } from "@/firebase";
import { ColorRing } from "react-loader-spinner";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Login = ({ authSwitcher }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const loginUser = async (data) => {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      navigate("/doctors/list");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login in to your account
            </h1>
            <form
              onSubmit={handleSubmit(loginUser)}
              class="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="utkarsh@gmail.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex gap-1">
                <input type="checkbox" name="doctor" id="doctor" />
                <p>Login as a Doctor</p>
              </div>
              <button
                type="submit"
                class="w-full flex justify-center text-white bg-primaryColor hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? (
                  <ColorRing
                    visible={true}
                    height="25"
                    width="25"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#ffffff",
                      "#ffffff",
                      "#ffffff",
                      "#ffffff",
                      "#ffffff",
                    ]}
                  />
                ) : (
                  "Log In"
                )}
              </button>
              <p class="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <span
                  onClick={() => authSwitcher(false)}
                  className="font-semibold text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
