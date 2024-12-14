import { z } from "zod";

const todoSchema = z.object({
  title: z.string().min(2, { message: "title is required" }),
  description: z.string().min(2, { message: "description is required" }),
});

const editSchema = z.object({
  title: z.string().min(2, { message: "title is required" }),
  description: z.string().min(2, { message: "description is required" }),
});

export {todoSchema, editSchema}