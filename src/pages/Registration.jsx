// src/components/Registration.jsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registrationSchema } from "@/zod-schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db, storageRef } from "@/firebase"; // Ensure 'storage' is exported from your firebase config
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";


const Registration = () => {
  const [isDoctor, setIsDoctor] = useState(false);
  const [info, setInfo] = useState({
    country: "",
    image: null,
    about: "",
    specialty: "",
    password: "",
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const handleImage = (event) => {
    const file = event.target.files?.[0] || null;
    setInfo({ ...info, image: file });
  };

  const registerUser = (data) => {
    uploadImage(data);
  };

  const uploadImage = async (data) => {
    if (!info.image) {
      console.log("Please choose an image.");
      return;
    }

    if (
      !info.country ||
      (isDoctor && (!info.about || !info.password || !info.specialty))
    ) {
      console.log("All fields are required.");
      return;
    }

    try {
      const imageStorageRef = ref(storageRef, `images/${info.image.name}`);
      const snapshot = await uploadBytes(imageStorageRef, info.image);
      const url = await getDownloadURL(snapshot.ref);
      await saveUserInfo(data, url);
    } catch (error) {
      console.error(error.message);
      // toast.error("Image upload failed. Please try again.");
    }
  };

  const saveUserInfo = async (data, ImageUrl) => {
    const UserData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      streetAddress: data.streetAddress,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: info.country,
      imageUrl: ImageUrl,
    };

    if (isDoctor) {
      UserData.about = info.about;
      UserData.specialty = info.specialty;
      UserData.password = info.password; 
    }

    const collectionName = isDoctor ? "doctorInfo" : "userInfo";
    const docRef = doc(db, collectionName, data.email);

    try {
      await setDoc(docRef, UserData);
      console.log("User Registered Successfully");
      navigate("/"); // Redirect to desired route
    } catch (error) {
      console.error(error.message);
      // toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-center items-center font-Poppins">
        <form
          onSubmit={handleSubmit(registerUser)}
          className="w-[80%] py-5 bg-white dark:bg-gray-800 rounded-lg shadow dark:border dark:border-gray-700"
        >
          <div className="space-y-12 p-6 md:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Registration Form
            </h1>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Use personal email address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <Label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    name="firstName"
                    className={`bg-gray-50 border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <Label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </Label>
                  <Input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    name="lastName"
                    className={`bg-gray-50 border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-4">
                  <Label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email address
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    {...register("email")}
                    name="email"
                    className={`bg-gray-50 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <Label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Country
                  </Label>
                  <Select
                    name="country"
                    onValueChange={(value) =>
                      setInfo({ ...info, country: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="pakistan">Pakistan</SelectItem>
                      <SelectItem value="china">China</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-3">
                  <Label
                    htmlFor="state"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    State
                  </Label>
                  <Input
                    type="text"
                    id="state"
                    {...register("state")}
                    name="state"
                    className={`bg-gray-50 border ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  />
                  {errors.state && (
                    <p className="text-sm text-red-600">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <Label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City
                  </Label>
                  <Input
                    type="text"
                    id="city"
                    {...register("city")}
                    name="city"
                    className={`bg-gray-50 border ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-600">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <Label
                    htmlFor="streetAddress"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Street Address
                  </Label>
                  <Input
                    type="text"
                    id="streetAddress"
                    {...register("streetAddress")}
                    name="streetAddress"
                    className={`bg-gray-50 border ${
                      errors.streetAddress
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  />
                  {errors.streetAddress && (
                    <p className="text-sm text-red-600">
                      {errors.streetAddress.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <Label
                    htmlFor="zipCode"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Zip Code
                  </Label>
                  <Input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className={`bg-gray-50 border ${
                      errors.zipCode ? "border-red-500" : "border-gray-300"
                    } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    {...register("zipCode")}
                  />
                  {errors.zipCode && (
                    <p className="text-sm text-red-600">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-10">
                <Label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload your image
                </Label>
                <Input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImage}
                  accept="image/png,image/jpeg"
                  className={`bg-gray-50 border ${
                    !info.image ? "border-gray-300" : "border-red-500"
                  } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                />
                {/* Optionally, display errors related to image if using react-hook-form */}
              </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-12">
              <div className="mt-10 space-y-10">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isDoctor"
                    name="isDoctor"
                    onClick={() => setIsDoctor((prev) => !prev)}
                    checked={isDoctor}
                  />
                  <Label
                    htmlFor="isDoctor"
                    className="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Are you a doctor?
                  </Label>
                </div>

                {isDoctor && (
                  <div>
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                        Doctor Registration Form
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                        Fill the form only if you want to register as a doctor.
                      </p>
                    </div>
                    <div className="pb-0">
                      <div className="mt-10">
                        <Label
                          htmlFor="about"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          About
                        </Label>
                        <Textarea
                          id="about"
                          name="about"
                          onChange={(e) =>
                            setInfo({ ...info, about: e.target.value })
                          }
                          className={`bg-gray-50 border ${
                            !info.about ? "border-gray-300" : "border-red-500"
                          } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        />
                        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                          Write a few sentences about yourself.
                        </p>
                      </div>

                      <div className="mt-6">
                        <Label
                          htmlFor="specialty"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Specialty
                        </Label>
                        <Select
                          name="specialty"
                          onValueChange={(value) =>
                            setInfo({ ...info, specialty: value })
                          }
                        >
                          <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <SelectValue placeholder="Select your specialty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cardiology">
                              Cardiology
                            </SelectItem>
                            <SelectItem value="neurology">Neurology</SelectItem>
                            <SelectItem value="pediatrics">
                              Pediatrics
                            </SelectItem>
                            <SelectItem value="orthopedics">
                              Orthopedics
                            </SelectItem>
                            {/* Add more specialties as needed */}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="mt-8">
                        <Label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Doctor's Portal Password
                        </Label>
                        <Input
                          type="password"
                          id="password"
                          name="password"
                          onChange={(e) =>
                            setInfo({ ...info, password: e.target.value })
                          }
                          className={`bg-gray-50 border ${
                            !info.password
                              ? "border-gray-300"
                              : "border-red-500"
                          } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[250px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="mt-10 w-full text-white bg-primaryColor hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Submit Form
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registration;
