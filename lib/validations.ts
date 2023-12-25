import * as z from "zod";

export const QuestionsSchema = z.object({
    title:z.string().min(5).max(130),
    explanation:z.string().min(50),
    // it means the tag strnig length is min-1 and max-15 and you should have min 1 tag and at max you can have only 3 tags
    tags:z.array(z.string().min(3).max(15)).min(1).max(3),  
  })