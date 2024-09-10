// src/validations/bookingValidation.ts
import { z } from "zod";

export const bookingValidation = z.object({
  body: z.object({
    date: z.string().nonempty(),
    startTime: z.string().nonempty(),
    endTime: z.string().nonempty(),
    payableAmount: z.number().positive(),
  }),
});
