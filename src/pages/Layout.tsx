import { Outlet } from "react-router-dom";
import { useAuthStore } from "../app/store";
import { BaseButton } from "../shared/components/BaseButton";
import styles from "./Layout.module.css";

export default function Layout() {
    const logout = useAuthStore((s) => s.logout);

    return (
        <>
            <header className={styles.header}>
                <div className={styles["header-content"]}>
                    <div className={styles.start}>
                        <BaseButton variant="secondary" label="Users" href="/app/users" />
                    </div>
                    <div className={styles.end}>
                        <BaseButton variant="danger" label="Logout" onClick={logout} />
                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <Outlet />
            </main>
        </>
    );
}
