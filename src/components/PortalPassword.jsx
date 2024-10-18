import { useState, useContext } from "react";
import { ColorRing } from "react-loader-spinner";
import NavBar from "./NavBar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { DoctorContext } from "@/context/IsDoctor";

const PortalPassword = () => {
  const { isDoctor, setIsDoctor } = useContext(DoctorContext);

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // Validate password input

    if (!password) return setError("Password is required");
    else setError("");

    setLoading(true); // Set loading state to true before async call

    try {
      // Fetch doctor information from Firestore
      const docRef = doc(db, "doctorInfo", `${isDoctor.doctorEmail}`);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setError("No registered doctor found");
        console.log("No registered doctor found");
      } else {
        const data = docSnap.data();

        // Check if password matches
        if (data.password === password) {
          setIsDoctor({ ...isDoctor, doctorLogin: true });
          console.log("Login successful");
          // Perform login actions here
        } else {
          setError("Incorrect password");
        }
      }
    } catch (error) {
      console.error("Error fetching doctor info:", error);
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false); // Set loading state back to false after async call
    }
  };

  return (
    <section>
      <NavBar />
      <section className="bg-neutral-50 flex items-center justify-center h-[80vh]">
        <section className="w-[450px] bg-white rounded-2xl flex flex-col gap-2 p-8">
          <div>
            <label
              htmlFor="PortalPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Portal Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="••••••••"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <button
            onClick={handleSubmit}
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
                colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
              />
            ) : (
              "Sign In"
            )}
          </button>
        </section>
      </section>
    </section>
  );
};

export default PortalPassword;
