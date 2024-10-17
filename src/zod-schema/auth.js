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

// Create the Zod schema

export const registrationSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip code is required"),
  
  }
  );

  export const paymentSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    cardHolder: z
      .string()
      .min(1, { message: "Card holder name is required" })
      .trim(),
    cardNumber: z.string().regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, {
      message: "Invalid card number format",
    }),
    cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
      message: "Invalid expiry date format (MM/YY)",
    }),
    cvc: z.string().regex(/^\d{3,4}$/, { message: "Invalid CVC" }),
  });