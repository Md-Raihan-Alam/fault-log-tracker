import { z } from "zod";
export const createFaultSchema = z.object({
  title: z
    .string()
    .min(5, "Title is required to be at least 5 characters")
    .max(255, "Title can be most at 255 characters"),
  description: z
    .string()
    .min(10, "Description is required to be at least 10 characters"),
});
