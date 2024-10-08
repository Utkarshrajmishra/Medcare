import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const doctorSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  specialization: z
    .string()
    .min(1, { message: "Please select a specialization." }),
  licenseNumber: z
    .string()
    .min(5, { message: "License number must be at least 5 characters." }),
  experience: z
    .string()
    .min(1, { message: "Please enter years of experience." }),
  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters." }),
  price: z
    .string()
    .min(1, { message: "Please enter your consultation price." }),
  about: z
    .string()
    .max(500, { message: "About section must not exceed 500 characters." })
    .optional(),
});
