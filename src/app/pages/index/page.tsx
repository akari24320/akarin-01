"use client";
import { useRouter } from "next/navigation";
import FortuneLineup from "../../components/FortuneLineup/fortunelineup";
import styles from "./page.module.css";
import Header from "../../components/Header/Header";

export default function Home() {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/pages/result`);
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>OMIKUJI.へようこそ！</h1>
                <section className={styles.instructions}>
                    <h2>おみくじの引き方</h2>
                    <ol>
                        <li>「おみくじを引く」ボタンを押します。</li>
                        <li>結果が表示されます。どんな運勢か確かめてみましょう。</li>
                        <li>「確認」でスタンプを押したり、画像を保存して楽しめます。</li>
                    </ol>
                </section>

                <p className={styles.notice}>
                    ※ おみくじはあくまでエンターテインメントです。<br />
                    真剣に受け止めすぎず、楽しんでご利用ください。
                </p>
                <FortuneLineup />
                <button className={styles.omikujiButton} onClick={handleClick}>
                    おみくじを引く
                </button>
            </div>
        </div>
    );
}
