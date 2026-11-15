

// Định nghĩa các kiểu message dùng chung cho toàn bộ các Room
import { z } from "zod";

export const GlobalMessages = {
  index:z.object(
    {
      index:z.number().int().min(0)
    }
  ).strict(),
  vector2: z.object({
    x: z.number(),
    y: z.number(),
  }).strict(),
  pickup:z.object({
    index:z.number(),
    id:z.string()
  }).strict(),
  id:z.object(
    {
      id:z.string()
    }
  ).strict(),
};

