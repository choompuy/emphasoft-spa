import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { loginSchema, type LoginFormValues } from "./login.schema";
import { loginRequest } from "./auth.api";
import { useAuthStore } from "../../app/store";

import { BaseInput } from "../../shared/components/BaseInput";
import { BaseButton } from "../../shared/components/BaseButton";

import styles from "./LoginPage.module.css";

type Errors = Partial<Record<keyof LoginFormValues, string>> & {
    server?: string;
};

export default function LoginPage() {
    const navigate = useNavigate();
    const setToken = useAuthStore((s) => s.setToken);

    const [values, setValues] = useState<LoginFormValues>({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState(false);

    const handleChange = <K extends keyof LoginFormValues>(key: K, value: LoginFormValues[K]) => {
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

        const parsed = loginSchema.safeParse(values);

        if (!parsed.success) {
            const fieldErrors: Errors = {};

            parsed.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof LoginFormValues;
                fieldErrors[field] = issue.message;
            });

            setErrors(fieldErrors);
            return;
        }

        try {
            setLoading(true);

            const res = await loginRequest(parsed.data.username, parsed.data.password);

            setToken(res.token);
            navigate("/app/users", { replace: true });
        } catch (err: unknown) {
            console.error(err);

            if (err instanceof AxiosError) {
                setErrors({ server: "Invalid username or password" });
                return;
            }

            setErrors({ server: "Unexpected error. Try again later." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Sign in</h1>

                <BaseInput
                    id="username"
                    label="Username"
                    value={values.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    error={errors.username}
                    autocomplete="on"
                />

                <BaseInput
                    id="Password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    error={errors.password}
                    autocomplete="off"
                />

                {errors.server && <div className={styles.serverError}>{errors.server}</div>}

                <BaseButton type="submit" label={loading ? "Signing in..." : "Login"} fill variant="primary" disabled={loading} />
            </form>
        </div>
    );
}
