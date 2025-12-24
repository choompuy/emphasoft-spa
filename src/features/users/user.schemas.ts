import { z } from "zod";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const passwordSchema = z.string().refine((value) => PASSWORD_REGEX.test(value), {
    message: "Password must be at least 8 characters and include uppercase, lowercase letters and a number",
});

export const userFormSchema = z
    .object({
        username: z.string().min(1, "Required"),
        first_name: z.string().min(1, "Required"),
        last_name: z.string().min(1, "Required"),
        is_active: z.boolean(),
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
