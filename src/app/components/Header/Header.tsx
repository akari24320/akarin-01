"use client";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
    const router = useRouter();

    return (
        <header className={styles.header}>
            <h1 className={styles.title} onClick={() => router.push("/")}>OMIKUJI.</h1>
        </header>
    );
}
