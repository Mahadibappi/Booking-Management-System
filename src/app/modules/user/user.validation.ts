import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required"),
    email: z
      .string()
      .email("Invalid email format")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .nonempty("Password is required"),
    phone: z.string().nonempty("Phone is required"),
    role: z.enum(["admin", "user"]),
    address: z.string().nonempty("Address is required"),
  }),
});

export default userValidationSchema;
