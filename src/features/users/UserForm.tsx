import { useState } from "react";
import { AxiosError } from "axios";
import type { ZodType } from "zod";

import type { UserFormValues, UserPayload } from "./user.types";
import type { ApiErrorResponse } from "../../shared/api/api-error.types";

import { BaseInput } from "../../shared/components/BaseInput";
import { BaseButton } from "../../shared/components/BaseButton";

import styles from "./UserForm.module.css";

type Props = {
    initialValues: UserFormValues;
    schema: ZodType<UserFormValues>;
    onSubmit: (data: UserPayload) => Promise<void>;
    submitText: string;
};

type Errors = Partial<Record<keyof UserFormValues, string>> & {
    server?: string;
};

export function UserForm({ initialValues, schema, onSubmit, submitText }: Props) {
    const [values, setValues] = useState<UserFormValues>(initialValues);
    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState(false);

    const handleChange = <K extends keyof UserFormValues>(key: K, value: UserFormValues[K]) => {
        setValues((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [key]: _, ...rest } = prev;
            return rest;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const parsed = schema.safeParse(values);

        if (!parsed.success) {
            const fieldErrors: Errors = {};

            parsed.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof UserFormValues;
                fieldErrors[field] = issue.message;
            });

            setErrors(fieldErrors);
            return;
        }

        try {
            setLoading(true);

            const payload: UserPayload = {
                username: parsed.data.username,
                first_name: parsed.data.first_name,
                last_name: parsed.data.last_name,
                is_active: parsed.data.is_active,
                password: parsed.data.password,
            };

            await onSubmit(payload);
        } catch (err: unknown) {
            console.error(err);

            if (err instanceof AxiosError) {
                const data = err.response?.data as ApiErrorResponse | undefined;

                if (data) {
                    const fieldErrors: Errors = {};

                    Object.entries(data).forEach(([key, value]) => {
                        if (Array.isArray(value)) {
                            fieldErrors[key as keyof UserFormValues] = value[0];
                        }
                    });

                    setErrors(fieldErrors);
                    return;
                }
            }

            alert("Unexpected error. Please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <BaseInput
                id="username"
                label="Username"
                value={values.username}
                error={errors.username}
                required
                autocomplete="off"
                onChange={(e) => handleChange("username", e.target.value)}
            />

            <BaseInput
                id="first_name"
                label="First name"
                value={values.first_name}
                error={errors.first_name}
                required
                autocomplete="on"
                onChange={(e) => handleChange("first_name", e.target.value)}
            />

            <BaseInput
                id="last_name"
                label="Last name"
                value={values.last_name}
                error={errors.last_name}
                required
                autocomplete="on"
                onChange={(e) => handleChange("last_name", e.target.value)}
            />

            <BaseInput
                id="password"
                label="Password"
                type="password"
                value={values.password}
                error={errors.password}
                required
                onChange={(e) => handleChange("password", e.target.value)}
            />

            <BaseInput
                id="confirmPassword"
                label="Confirm password"
                type="password"
                value={values.confirmPassword}
                error={errors.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />

            <label className={styles.checkbox}>
                <input type="checkbox" checked={values.is_active} onChange={(e) => handleChange("is_active", e.target.checked)} />
                Active
            </label>

            <BaseButton label={loading ? "Saving..." : submitText} type="submit" variant="primary" fill />
        </form>
    );
}
