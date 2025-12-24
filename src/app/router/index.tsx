import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "../../pages/Layout";
import LoginPage from "../../features/auth/LoginPage";
import UsersListPage from "../../features/users/UsersListPage";
import UserCreatePage from "../../features/users/UserCreatePage";
import UserEditPage from "../../features/users/UserEditPage";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/app",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            { path: "users", element: <UsersListPage /> },
            { path: "users/create", element: <UserCreatePage /> },
            { path: "users/:id/edit", element: <UserEditPage /> },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/app/users" replace />,
    },
]);
