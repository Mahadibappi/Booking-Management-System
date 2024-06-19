// src/validations/bookingValidation.ts
import { z } from "zod";

export const bookingValidation = z.object({
  body: z.object({
    facility: z.string().nonempty(),
    date: z.string().nonempty(),
    startTime: z.string().nonempty(),
    endTime: z.string().nonempty(),
    user: z.string().nonempty(),
    payableAmount: z.number().positive(),
    isBooked: z.enum(["confirmed", "pending", "cancelled"]),
  }),
});
