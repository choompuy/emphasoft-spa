import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store";

type Props = {
    children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
    const isAuth = useAuthStore((s) => s.isAuth);

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
