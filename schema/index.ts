import * as z from "zod"

export const formSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters.")
        .max(32, "Title must be at most 32 characters."),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters.")
        .max(200, "Description must be at most 200 characters."),
    type: z.string(),
    price: z.number(),
    isNegotiable: z.boolean(),
    ownerName: z.string(),
    ownerNumber: z.string(),
    images: z.array(z.string()).min(1, "برجاء إضافة صورة واحدة على الأقل"),
});

export type PropertyFormValues = z.infer<typeof formSchema>;