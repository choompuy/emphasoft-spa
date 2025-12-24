import type z from "zod";
import type { userFormSchema } from "./user.schemas";

export type User = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    last_login: string | null;
    is_superuser: boolean;
};

export type UserPayload = {
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    password: string;
};

export type UserFormValues = z.infer<typeof userFormSchema>;
