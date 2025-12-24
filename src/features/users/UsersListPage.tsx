import { useEffect, useMemo, useState } from "react";
import { useUsersStore } from "./users.store";

import { BaseButton } from "../../shared/components/BaseButton";
import { BaseInput } from "../../shared/components/BaseInput";

import styles from "./UserListPage.module.css";

export default function UsersListPage() {
    const { users, fetchUsers, isLoading } = useUsersStore();
    const [filter, setFilter] = useState("");
    const [sortAsc, setSortAsc] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const filteredUsers = useMemo(() => {
        const result = users.filter((u) => u.username.toLowerCase().includes(filter.toLowerCase()));

        return result.sort((a, b) => (sortAsc ? a.id - b.id : b.id - a.id));
    }, [users, filter, sortAsc]);

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <h1>Users</h1>

            <div className={styles["filter-wrapper"]}>
                <BaseInput id="filter" value={filter} placeholder="Filter by username" onChange={(e) => setFilter(e.target.value)} />
                <div className={styles.end}>
                    <BaseButton variant="primary" label="Create user" href="/app/users/create" />
                    <BaseButton label={`Sort by ID ${sortAsc ? "↑" : "↓"}`} variant="secondary" onClick={() => setSortAsc((v) => !v)} />
                </div>
            </div>

            <div className={styles["table-wrapper"]}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.username}</td>
                                <td>
                                    {u.first_name} {u.last_name}
                                </td>
                                <td>
                                    <BaseButton variant="link" href={`/app/users/${u.id}/edit`} label="Edit" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
