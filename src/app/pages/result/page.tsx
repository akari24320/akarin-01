"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getRandomFortune, getRandomDescription } from ".././../utils/FortunesDate";


export default function Result() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // 初回は検索パラメータから取得し、再抽選時は useState で更新
    const [fortune, setFortune] = useState({
        name: searchParams.get("name") || "",
        wish: searchParams.get("wish") || "",
        work: searchParams.get("work") || "",
        lost: searchParams.get("lost") || "",
        love: searchParams.get("love") || "",
        money: searchParams.get("money") || "",
        health: searchParams.get("health") || "",
    });

    useEffect(() => {
        // クエリパラメータが空なら、新しいおみくじを引く
        if (!fortune.name) {
            drawNewFortune();
        }
    },);

    const drawNewFortune = () => {
        const newFortune = getRandomFortune();
        const newwish = getRandomDescription(newFortune.descriptions.wish);
        const newWork = getRandomDescription(newFortune.descriptions.work);
        const newlost = getRandomDescription(newFortune.descriptions.lost);
        const newLove = getRandomDescription(newFortune.descriptions.love);
        const newMoney = getRandomDescription(newFortune.descriptions.money);
        const newhealth = getRandomDescription(newFortune.descriptions.health);

        // 新しい結果を state にセット
        setFortune({
            name: newFortune.name,
            wish: newwish,
            work: newWork,
            lost: newlost,
            love: newLove,
            money: newMoney,
            health: newhealth,
        });

    };

    return (
        <div>
            <h1>おみくじ結果: {fortune.name}</h1>
            <p><strong>願事‥</strong> {fortune.wish}</p>
            <p><strong>仕事‥</strong> {fortune.work}</p>
            <p><strong>失物‥</strong> {fortune.lost}</p>
            <p><strong>恋愛‥</strong> {fortune.love}</p>
            <p><strong>金銭‥</strong> {fortune.money}</p>
            <p><strong>健康‥</strong> {fortune.health}</p>
            <button onClick={drawNewFortune}>もう一度引く</button>
            <button onClick={() => router.push("/pages/index")}>最初に戻る</button>
        </div>
    );
}
