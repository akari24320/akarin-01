"use client";
import { useState } from "react";

const fortunes = [
    { name: "大吉", probability: 0.1 }, //累積確率 : 0.10
    { name: "中吉", probability: 0.15 }, //累積確率 : 0.25
    { name: "吉", probability: 0.2 }, //累積確率 : 0.45
    { name: "小吉", probability: 0.2 }, //累積確率 : 0.65
    { name: "末吉", probability: 0.15 }, //累積確率 : 0.80
    { name: "凶", probability: 0.1 }, //累積確率 : 0.90
    { name: "狂", probability: 0.05 }, //累積確率 : 0.95
    { name: "大凶", probability: 0.05 } //累積確率 : 1.00
];

const getRandomFortune = () => {
    const random = Math.random();// 0以上1未満のランダムな数を取得(例 : random = 0.32)
    let sum = 0; // sumは、確率を合計していく変数
    for (const fortune of fortunes) {
        sum += fortune.probability; // 累積確率を更新
        if (random < sum) { // ランダムな数が累積確率を超えたら
            return fortune.name; // その運勢を返す
    } // random が sum を超えたタイミングで、その運勢を選択
    // 例 : 累積していくと 0.32 < 0.45 （random < sum）になるため、吉が選ばれる
}
};

export default function Omikuji() { // useState を使い、おみくじの結果 (result) を状態管理
    const [result, setResult] = useState<string | null>(null);

    const handleDraw = () => { // handleDraw 関数を作成し、ボタンが押されたときに getRandomFortune() を実行し、結果を setResult で更新
    setResult(getRandomFortune() ?? "エラー");
};

return (
<div style={{ textAlign: "center", marginTop: "20px" }}>
    <h1>おみくじ</h1>
    <button onClick={handleDraw}>おみくじを引く</button>
    {result && <h2>結果: {result}</h2>}
    </div>
    );
}
