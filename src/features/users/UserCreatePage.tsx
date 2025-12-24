import { useNavigate } from "react-router-dom";
import { createUser } from "./users.api";
import { userFormSchema } from "./user.schemas";
import type { UserFormValues, UserPayload } from "./user.types";
import { UserForm } from "./UserForm";

export default function UserCreatePage() {
    const navigate = useNavigate();

    const initialValues: UserFormValues = {
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        confirmPassword: "",
        is_active: true,
    };

    const handleSubmit = async (data: UserPayload) => {
        try {
            await createUser(data);
            navigate("/users");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <h1>Create user</h1>
            <UserForm initialValues={initialValues} schema={userFormSchema} submitText="Create" onSubmit={handleSubmit} />
        </>
    );
}
