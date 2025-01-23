import NavBar from "@/components/NavBar";
import { useLocation } from "react-router-dom";
import { DatePicker } from "@/components/DatePicker";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { paymentSchema } from "@/zod-schema/auth";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  getDoc
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "@/firebase";
import { getAuth } from "firebase/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const Checkout = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
  });
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const [userData, setUserData] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [check, setCheck] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDoc(
          doc(db, `userInfo`, `${user.email}`)
        );
        setUserData(querySnapshot.data());
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchingData();
  }, []);

  const checkAvailability = async () => {
    if (!date || !time) return console.log("Checking aviability is required");
    const doctorCollection = collection(db, `${data.email}booking`);
    try {
      const collectionSnap = await getDocs(doctorCollection);
      if (!collectionSnap.empty) {
        const emailQuery = query(
          doctorCollection,
          where("time", "==", time),
          where("date", "==", date)
        );

        const check = await getDocs(emailQuery);
        if (check.empty) return setCheck(true);
        else return setCheck(false);
      } else return setCheck(true);
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async (formData) => {
    if (check == null) return console.log("check aviability");
    if (!date || !time) return console.log("Checking aviability is required");
    const bookingRef = doc(db, `${user.email}booking`, `${date}${time}`);
    try {
      setLoading(true);
      await setDoc(bookingRef, {
        doctorEmail: data.email,
        doctorFirstName: data.firstName,
        doctorLastName: data.lastName,
        doctorStreetAddress: data.streetAddress,
        doctorCountry: data.country,
        doctorState: data.state,
        doctorSpecialty: data.specialty,
        time: time,
        date: date,
        status: false,
      });
      doctorSubmit();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const doctorSubmit = async () => {
    console;
    const bookingRef = doc(db, `${data.email}booking`, `${date}${time}`);
    try {
      await setDoc(bookingRef, {
        date: date,
        time: time,
        useremail: user.email,
        userfirstName: userData.firstName,
        userLastName: userData.lastName,
        userStreet: userData.streetAddress,
        userCountry: userData.country,
        userCity: userData.city,
      });
      console.log("User Registered Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <NavBar />
      <section>
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Booking Summary</p>
            <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            <div className="mt-8 bg-zinc-50 space-y-3 rounded-lg border outline outline-1 outline-neutral-200 px-2 py-4 sm:px-6">
              <div className="flex flex-col rounded-lg bg-neutral-50 outline outline-1 outline-neutral-300 sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={data.imageUrl}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      Dr. {data.firstName} {data.lastName}
                    </span>
                    <p className="text-[0.7rem] bg-pink-400 rounded-xl w-fit h-fit px-2 text-white">
                      {data.specialty.toUpperCase()}
                    </p>
                  </div>
                  <span className="float-right text-gray-400">
                    {data.email}
                  </span>
                  <span className="float-right text-gray-400">
                    {data.streetAddress}, {data.city}, {data.state},{" "}
                    {data.country}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-8 text-lg font-medium">Shipping Methods</p>
            <div className="mt-5 grid gap-6 outline outline-1 outline-neutral-200 rounded-md bg-neutral-50 p-4">
              <div className="flex justify-between">
                <DatePicker setDate={setDate} date={date} />
                <div className="sm:col-span-3">
                  <Select name="time" onValueChange={(value) => setTime(value)}>
                    <SelectTrigger className="bg-white w-[240px] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <SelectValue placeholder={`Select the booking time`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8 AM">8 AM</SelectItem>
                      <SelectItem value="10 AM">10 AM</SelectItem>
                      <SelectItem value="12 AM">12 AM</SelectItem>
                      <SelectItem value="2 AM">2 PM</SelectItem>
                      <SelectItem value="4 PM">4 PM</SelectItem>
                      <SelectItem value="6 PM">6 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <button
                onClick={checkAvailability}
                className="w-full bg-blue-500 hover:bg-blue-600 font-semibold px-3 text-[0.9rem] text-white py-2 rounded-md"
              >
                Check Availability
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(submit)}
            className="mt-10 bg-gray-50 p-8 lg:mt-0"
          >
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>
            <div>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    {...register("email")}
                    className={`w-full rounded-md border px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="your.email@gmail.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    {/* Email Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Holder Field */}
              <div>
                <label
                  htmlFor="cardHolder"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Card Holder
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="cardHolder"
                    name="cardHolder"
                    {...register("cardHolder")}
                    className={`w-full rounded-md border px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.cardHolder ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Your full name here"
                  />
                  {errors.cardHolder && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.cardHolder.message}
                    </p>
                  )}
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    {/* Card Holder Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Number, Expiry, and CVC Fields */}
              <div>
                <label
                  htmlFor="cardNumber"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Card Details
                </label>
                <div className="flex space-x-2">
                  {/* Card Number */}
                  <div className="relative w-7/12 flex-shrink-0">
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      {...register("cardNumber")}
                      className={`w-full rounded-md border px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.cardNumber ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.cardNumber.message}
                      </p>
                    )}
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      {/* Card Icon */}
                      <svg
                        className="h-4 w-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                      </svg>
                    </div>
                  </div>

                  {/* Card Expiry */}
                  <div className="relative w-3/12">
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      {...register("cardExpiry")}
                      className={`w-full rounded-md border px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.cardExpiry ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="MM/YY"
                    />
                    {errors.cardExpiry && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.cardExpiry.message}
                      </p>
                    )}
                  </div>

                  {/* Card CVC */}
                  <div className="relative w-1/6">
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      {...register("cvc")}
                      className={`w-full rounded-md border px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.cvc ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="CVC"
                    />
                    {errors.cvc && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.cvc.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Total Price */}
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">$408.00</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 mb-8 w-full rounded-md bg-blue-500 hover:bg-blue-600 px-6 py-3 font-medium text-white"
            >
              {loading ? "Loading" : "Booking"}
            </button>
          </form>
        </div>
      </section>
    </section>
  );
};

export default Checkout;
