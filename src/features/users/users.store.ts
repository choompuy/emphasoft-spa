import { create } from "zustand";
import { getUsers } from "./users.api";
import type { User } from "./user.types";

type UsersState = {
    users: User[];
    isLoading: boolean;
    fetchUsers: () => Promise<void>;
};

export const useUsersStore = create<UsersState>((set) => ({
    users: [],
    isLoading: false,

    fetchUsers: async () => {
        set({ isLoading: true });
        try {
            const users = await getUsers();
            set({ users });
        } finally {
            set({ isLoading: false });
        }
    },
}));
