import React from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const Registration = () => {
  return (
    <div className="flex justify-center items-center font-Poppins">
      <form className="w-[80%] py-5">
        <div className="space-y-12">
          <h1 className="text-center font-semibold text-3xl">
            Registration Form
          </h1>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-chaosBlack">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use personal email address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  type="text"
                  id="firstName"
                  className="mt-2"
                />
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  type="text"
                  id="lastName"
                  className="mt-2"
                />
              </div>

              <div className="sm:col-span-4">
                <Label htmlFor="email">Email address</Label>
                <Input
                  type="email"
                  id="email"
                  className="mt-2"
                />
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger className="mt-2">
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

              <div className="col-span-full">
                <Label htmlFor="streetAddress">Street address</Label>
                <Input
                  type="text"
                  id="streetAddress"
                  className="mt-2"
                />
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <Label htmlFor="city">City</Label>
                <Input
                  type="text"
                  id="city"
                  className="mt-2"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="state">State / Province</Label>
                <Input
                  type="text"
                  id="state"
                  className="mt-2"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="zipCode">ZIP / Postal code</Label>
                <Input
                  type="number"
                  id="zipCode"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="mt-10">
              <Label htmlFor="image">Upload your image</Label>
              <Input
                type="file"
                id="image"
                accept="image/png,image/jpeg"
                className="mt-2"
              />
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Doctor Registration Form
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Fill the form only if you want to register as a doctor.
            </p>

            <div className="mt-10 space-y-10">
              <div className="flex items-center space-x-2">
                <Checkbox id="isDoctor" />
                <Label htmlFor="isDoctor">
                  Are you a doctor?
                </Label>
              </div>

              <div className="pb-0">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Doctor Profile
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p>

                <div className="mt-10">
                  <Label htmlFor="about">About</Label>
                  <Textarea
                    id="about"
                    className="mt-2"
                  />
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>

                <div className="mt-6">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Physician</SelectItem>
                      <SelectItem value="internal">Internal Medicine Physician</SelectItem>
                      <SelectItem value="pediatrician">Pediatrician</SelectItem>
                      <SelectItem value="obgyn">Obstetrician/Gynecologist</SelectItem>
                      <SelectItem value="cardiology">Cardiologist</SelectItem>
                      <SelectItem value="dermatology">Dermatologist</SelectItem>
                      <SelectItem value="orthopedic">Orthopedic Surgeon</SelectItem>
                      <SelectItem value="dentist">Dentist</SelectItem>
                      <SelectItem value="neurology">Neurologist</SelectItem>
                      <SelectItem value="gastro">Gastroenterologist</SelectItem>
                      <SelectItem value="radiology">Radiologist</SelectItem>
                      <SelectItem value="pathology">Pathologist</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-8">
                  <Label htmlFor="token-password">Doctor's Portal Password</Label>
                  <Input
                    type="password"
                    id="token-password"
                    className="mt-2 w-[250px]"
                  />
                </div>

                <Button type="submit" className="mt-10">
                  Submit Form
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;