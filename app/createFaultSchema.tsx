import { z } from "zod";
export const faultSchema = z.object({
  title: z
    .string()
    .min(5, "Title is required to be at least 5 characters")
    .max(255, "Title can be most at 255 characters"),
  description: z
    .string()
    .min(10, "Description is required to be at least 10 characters"),
});

export const patchFaultSchema = z.object({
  title: z
    .string()
    .min(5, "Title is required to be at least 5 characters")
    .max(255, "Title can be most at 255 characters")
    .optional(),
  description: z
    .string()
    .min(10, "Description is required to be at least 10 characters")
    .max(6000, "Title can be most at 255 characters")
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});
