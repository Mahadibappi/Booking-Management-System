import { z } from "zod";

const facilityValidation = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  pricePerHour: z.number().positive(),
  location: z.string().nonempty().optional(),
});

export default facilityValidation;
