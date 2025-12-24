import { forwardRef, type ChangeEvent } from "react";
import styles from "./BaseInput.module.css";

type Props = {
    label?: string;
    id: string;
    name?: string;
    value?: string;
    type?: "text" | "password" | "email" | "number";
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    autocomplete?: "on" | "off";
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const BaseInput = forwardRef<HTMLInputElement, Props>(
    ({ id, label, name, value, type = "text", placeholder, error, disabled, required, autocomplete, onChange }, ref) => {
        return (
            <div className={styles.field}>
                {label && (
                    <label htmlFor={id} className={styles.label}>
                        {label}
                        {required && <span className={styles.required}>*</span>}
                    </label>
                )}

                <input
                    ref={ref}
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    autoComplete={autocomplete}
                    className={styles.input}
                    data-error={Boolean(error)}
                    onChange={(e) => onChange?.(e)}
                />

                {error && <span className={styles.error}>{error}</span>}
            </div>
        );
    }
);

BaseInput.displayName = "BaseInput";
