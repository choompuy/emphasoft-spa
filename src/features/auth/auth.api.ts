import { http } from "../../shared/api/http";

type LoginResponse = {
    token: string;
};

export const loginRequest = async (username: string, password: string): Promise<LoginResponse> => {
    const { data } = await http.post<LoginResponse>("/login/", {
        username,
        password,
    });

    return data;
};
