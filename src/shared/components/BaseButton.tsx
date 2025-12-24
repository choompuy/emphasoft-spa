import { forwardRef } from "react";
import { Link } from "react-router-dom";
import styles from "./BaseButton.module.css";

type CommonProps = {
    label?: string;
    variant?: "primary" | "secondary" | "link" | "danger";
    fill?: boolean;
    disabled?: boolean;
};

type ButtonProps = CommonProps & {
    href?: never;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
};

type LinkProps = CommonProps & {
    href: string;
};

type Props = ButtonProps | LinkProps;

export const BaseButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(function BaseButton(props, ref) {
    const { label, variant = "primary", fill } = props;

    const className = styles.button;
    const dataAttrs = {
        "data-variant": variant,
        "data-fill": fill ? "true" : undefined,
        disabled: props.disabled,
    };

    return (
        <div className={styles["button-wrapper"]}>
            {"href" in props ? (
                <Link ref={ref as React.Ref<HTMLAnchorElement>} to={props.href ?? "#"} className={className} {...dataAttrs}>
                    {label}
                </Link>
            ) : (
                <button
                    ref={ref as React.Ref<HTMLButtonElement>}
                    className={className}
                    type={props.type ?? "button"}
                    onClick={props.onClick}
                    {...dataAttrs}
                >
                    {label}
                </button>
            )}
        </div>
    );
});
