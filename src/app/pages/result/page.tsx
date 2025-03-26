"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import { getRandomFortune, getRandomDescription } from "../../utils/FortunesDate";
import { getNumber } from "../../utils/OmikujiNumber";
import styles from "./page.module.css";
import ConfirmStamps from "@/app/components/ConfirmStamps/ConfirmStamps";
import { getEntireDiscription } from "../../utils/getEntireDiscription";

export default function Result() {
    const router = useRouter();
    const omikujiRef = useRef<HTMLDivElement>(null);

    const [fortune, setFortune] = useState({
        number: "",
        name: "",
        wish: "",
        work: "",
        lost: "",
        love: "",
        money: "",
        health: "",
    });

    const [entireDescription, setEntireDescription] = useState<string[]>([]);

    // const generateEntireDescription = useCallback(async (fortuneData: typeof fortune) => {
    //     const response = await fetch("/api/generateFortuneDescription", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             fortune: fortuneData.name,
    //             wish: fortuneData.wish,
    //             work: fortuneData.work,
    //             lost: fortuneData.lost,
    //             love: fortuneData.love,
    //             money: fortuneData.money,
    //             health: fortuneData.health,
    //         }),
    //     });

    //     const data = await response.json();
    //     if (data.generatedText) {
    //         setEntireDescription(data.generatedText.split("\n"));
    //     }
    // }, []);

    const drawNewFortune = useCallback(async () => {
        const newnumber = getNumber();
        const newFortune = getRandomFortune();
        const newwish = getRandomDescription(newFortune.descriptions.wish);
        const newWork = getRandomDescription(newFortune.descriptions.work);
        const newlost = getRandomDescription(newFortune.descriptions.lost);
        const newLove = getRandomDescription(newFortune.descriptions.love);
        const newMoney = getRandomDescription(newFortune.descriptions.money);
        const newhealth = getRandomDescription(newFortune.descriptions.health);

        const fortuneData = {
            number: newnumber,
            name: newFortune.name,
            wish: newwish,
            work: newWork,
            lost: newlost,
            love: newLove,
            money: newMoney,
            health: newhealth,
        };

        setFortune(fortuneData);
        // await generateEntireDescription(fortuneData);
        setEntireDescription(getEntireDiscription()); // 1行、2行、3行からランダム取得
    }, []);

    useEffect(() => {
        drawNewFortune();
    }, [drawNewFortune]);

    const [resetTrigger, setResetTrigger] = useState(0);
    const handleReset = () => {
        setResetTrigger(prev => prev + 1); // `resetTrigger` を更新して `ConfirmStamps` をリセット
    };

    const saveAsImage = async () => {
        if (!omikujiRef.current) return;

        const canvas = await html2canvas(omikujiRef.current, {
            backgroundColor: "#fff",
            foreignObjectRendering: false,
        });

        const dataURL = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "omikuji.png";
        link.click();
    };

    return (
        <div className={styles.page}>
            <h1>おみくじ結果</h1>
            <div ref={omikujiRef} className={styles.omikuji}>
                <div className={styles.number}>
                    <img src="/number.svg" alt="My Icon" className={styles.backgroundSvg} />
                    <p>{fortune.number}</p>
                </div>
                <p className={styles.title}>おみくじ</p>
                <img src="/yazirusi.svg" alt="My Icon"/>
                <div className={styles.fortunetable}>
                    <div className={styles.fortunetable2}>
                        <h1 className={styles.fotunename}>{fortune.name}</h1>
                        <div className={styles.entirediscription}>
                        <div className={styles.entirediscription2}>
                            {entireDescription.map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                        </div>
                        <div className={styles.discriptions}>
                            <div className={styles.discriptions2}>
                                <p><strong>健康 ‥</strong> {fortune.health}</p>
                                <p><strong>金銭 ‥</strong> {fortune.money}</p>
                                <p><strong>恋愛 ‥</strong> {fortune.love}</p>
                                <p><strong>失物 ‥</strong> {fortune.lost}</p>
                                <p><strong>仕事 ‥</strong> {fortune.work}</p>
                                <p><strong>願事 ‥</strong> {fortune.wish}</p>
                            </div>
                        </div>
                        <div className={styles.comfirm}>
                            <div className={styles.comfirm2}>
                            <img src="/confirm.svg" alt="My Icon" />
                            </div>
                        </div>
                        <div className={styles.stamps}>
                            <div className={styles.stamps2}>
                                <ConfirmStamps resetTrigger={resetTrigger} ></ConfirmStamps>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.return}>
                <button
                    onClick={() => {
                        handleReset(); 
                        drawNewFortune();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                >
                    もう一度引く
                </button>
            </div>
            <button onClick={saveAsImage}>画像として保存</button>
            <button onClick={() => router.push("/pages/index")}>最初に戻る</button>
        </div>
    );
}
