import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/zod-schema/auth";
import { useContext, useState } from "react";
import { auth } from "@/firebase";
import { ColorRing } from "react-loader-spinner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "@/context/IsDoctor";
const Login = ({ authSwitcher }) => {
  const { isDoctor, setIsDoctor } = useContext(DoctorContext);
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(false); // State to check if user is a doctor
  const [loading, setLoading] = useState(false); // State for loader
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  // Toggle the "doctor" checkbox
  const handleCheckBox = () => {
    setDoctor((prev) => !prev);
  };

  // Handle login form submission
  const loginUser = async (data) => {
    setLoading(true);
    try {
      // Attempt to sign in the user
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Redirect based on whether the user is a doctor or not
      if (doctor) {
        setIsDoctor({ ...isDoctor, doctorEmail: data.email });
        navigate("/doctor/password");
      } else {
        navigate("/doctors/list");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login to your account
            </h1>
            <form
              onSubmit={handleSubmit(loginUser)}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="utkarsh@gmail.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="doctor"
                  id="doctor"
                  checked={doctor}
                  onChange={handleCheckBox} // Updated checkbox handling
                />
                <label
                  htmlFor="doctor"
                  className="text-sm text-gray-900 dark:text-white"
                >
                  Login as a Doctor
                </label>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center text-white bg-primaryColor hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
              <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <span
                  onClick={() => authSwitcher(false)}
                  className="font-semibold text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
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
