import { http } from "../../shared/api/http";
import type { User, UserPayload } from "./user.types";

export const getUsers = async (): Promise<User[]> => {
    const { data } = await http.get<User[]>("/users/");
    return data;
};

export const getUserById = async (id: number): Promise<User> => {
    const { data } = await http.get<User>(`/users/${id}/`);
    return data;
};

export const createUser = async (payload: UserPayload) => {
    const { data } = await http.post<User>("/users/", payload);
    return data;
};

export const updateUser = async (id: number, payload: UserPayload) => {
    const { data } = await http.put<User>(`/users/${id}/`, payload);
    return data;
};
