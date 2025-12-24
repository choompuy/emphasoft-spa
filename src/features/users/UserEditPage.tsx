import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "./users.api";
import { userFormSchema } from "./user.schemas";
import type { User, UserFormValues, UserPayload } from "./user.types";
import { UserForm } from "./UserForm";

export default function UserEditPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!id) return;
        getUserById(Number(id)).then(setUser);
    }, [id]);

    if (!user) return <div>Loading...</div>;

    const initialValues: UserFormValues = {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        is_active: user.is_active,
        password: "",
        confirmPassword: "",
    };

    const handleSubmit = async (data: UserPayload) => {
        await updateUser(user.id, data);
        navigate("/users");
    };

    return (
        <>
            <h1>Edit user</h1>
            <UserForm initialValues={initialValues} schema={userFormSchema} submitText="Save" onSubmit={handleSubmit} />
        </>
    );
}
