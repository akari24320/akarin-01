"use client";
import { useState } from "react";
import styles from "./omikuji.module.css";

const fortunes = [
    { name: "大吉", probability: 0.1, descriptions: {
        work: ["上手くいくだろう。", "絶好調な日が続く。"],
        love: ["今がチャンス！積極的に話しかけよう！", "素敵な出会いがあるかも。","ゴーゴゴー！"],
        money: ["思わぬ収入があるかも。", "金運絶好調！"]
    }},
    { name: "中吉", probability: 0.15, descriptions: {
        work: ["順調に進むが油断は禁物。", "少し努力すれば成果が出る。","ゴーゴゴー！"],
        love: ["相手の気持ちを考えて行動しよう。", "慎重に進めると吉。"],
        money: ["無駄遣いに気をつけよう。", "堅実な運用が吉。"]
    }},
    { name: "吉", probability: 0.2, descriptions: {
        work: ["コツコツ頑張れば道が開ける。", "努力が実を結ぶ時。"],
        love: ["相手を大切にすると良い関係に。", "焦らずじっくり進めよう。"],
        money: ["貯金を意識しよう。", "少しの投資が吉。","ゴーゴゴー！"]
    }},
    { name: "小吉", probability: 0.2, descriptions: {
        work: ["慎重に進めれば良い結果に。", "周囲の助けを得ると良い。","ゴーゴゴー！"],
        love: ["相手との距離を大切に。", "自然な流れに任せよう。"],
        money: ["節約を心がけよう。", "大きな出費に注意。"]
    }},
    { name: "末吉", probability: 0.15, descriptions: {
        work: ["少し停滞気味。焦らずに。", "慎重に行動すると良い。"],
        love: ["無理をせず自然体で。", "焦ると空回り。","ゴーゴゴー！"],
        money: ["計画的な支出が必要。", "浪費に注意。"]
    }},
    { name: "凶", probability: 0.1, descriptions: {
        work: ["注意が必要な時期。", "周囲と協力すると良い。"],
        love: ["無理な行動は避けよう。", "冷静な判断が重要。"],
        money: ["節約が重要。", "不要な出費は避けるべき。","ゴーゴゴー！"]
    }},
    { name: "狂", probability: 0.05, descriptions: {
        work: ["波乱の予感。慎重に。", "冷静に対処しよう。","ゴーゴゴー！","いけるいける"],
        love: ["思わぬ展開があるかも。", "慎重な行動が吉。","ゴーゴゴー！"],
        money: ["予想外の出費に注意。", "賢く使うことが大事。","ゴーゴゴー！"]
    }},
    { name: "大凶", probability: 0.05, descriptions: {
        work: ["慎重に行動を。", "無理は禁物。"],
        love: ["今は動かない方が良い。", "相手の気持ちを尊重しよう。","ゴーゴゴー！"],
        money: ["節約が最優先。", "大きな出費は避けるべき。"]
    }}
];

const getRandomFortune = () => {
    const random = Math.random();
    let sum = 0;
    for (const fortune of fortunes) {
        sum += fortune.probability;
        if (random < sum) {
            return fortune;
        }
    }
    return null;
};

const getRandomDescription = (descriptions: string[]) => {
    return descriptions[Math.floor(Math.random() * descriptions.length)];
};

export default function Omikuji() {
    const [result, setResult] = useState<{ name: string; work: string; love: string; money: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDraw = () => {
        const fortune = getRandomFortune();
        if (fortune) {
            setResult({
                name: fortune.name,
                work: getRandomDescription(fortune.descriptions.work),
                love: getRandomDescription(fortune.descriptions.love),
                money: getRandomDescription(fortune.descriptions.money)
            });
            setIsModalOpen(true);
        }
    };

    return (
        <div className={styles.test}>
            <h1>おみくじ</h1>
            <button onClick={handleDraw}>おみくじを引く</button>
            {isModalOpen && result && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>結果: {result.name}</h2>
                        <p>仕事: {result.work}</p>
                        <p>恋愛: {result.love}</p>
                        <p>お金: {result.money}</p>
                        <button onClick={() => setIsModalOpen(false)}>閉じる</button>
                    </div>
                </div>
            )}
        </div>
    );
}
