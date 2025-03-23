"use client";
import { useRouter } from "next/navigation";
import { getRandomFortune, getRandomDescription } from ".././../utils/FortunesDate";
import { getNumber } from ".././../utils/OmikujiNumber"

export default function Home() {
    const router = useRouter();

    const handleClick = () => {
        const number = getNumber();
        const fortune = getRandomFortune();
        if (!fortune) return;

        // ランダムな説明を取得
        const wish = getRandomDescription(fortune.descriptions.wish);
        const work = getRandomDescription(fortune.descriptions.work);
        const lost = getRandomDescription(fortune.descriptions.lost);
        const love = getRandomDescription(fortune.descriptions.love);
        const money = getRandomDescription(fortune.descriptions.money);
        const health = getRandomDescription(fortune.descriptions.health);

        // クエリパラメータを使って渡す
        router.push(`/pages/result?number=${number}&name=${fortune.name}&wish=${wish}&work=${work}&lost=${lost}&love=${love}&money=${money}&health=${health}`);
    };

    return (
        <div>
            <h1>おみくじ</h1>
            <button onClick={handleClick}>おみくじを引く</button>
        </div>
    );
}
