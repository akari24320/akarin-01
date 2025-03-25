"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import { getRandomFortune, getRandomDescription } from "../../utils/FortunesDate";
import { getNumber } from "../../utils/OmikujiNumber";
import styles from "./page.module.css";
import ConfirmStamps from "@/app/components/ConfirmStamps/ConfirmStamps";

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

    const [entireDescription, setEntireDescription] = useState(["", "", ""]);

    const generateEntireDescription = useCallback(async (fortuneData: typeof fortune) => {
        const response = await fetch("/api/generateFortuneDescription", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fortune: fortuneData.name,
                wish: fortuneData.wish,
                work: fortuneData.work,
                lost: fortuneData.lost,
                love: fortuneData.love,
                money: fortuneData.money,
                health: fortuneData.health,
            }),
        });

        const data = await response.json();
        if (data.generatedText) {
            setEntireDescription(data.generatedText.split("\n"));
        }
    }, []);

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
        await generateEntireDescription(fortuneData);
    }, [generateEntireDescription]);

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
                    <svg className={styles.backgroundSvg} xmlns="http://www.w3.org/2000/svg" width="332" height="36" viewBox="0 0 332 36" fill="none">
                        <path d="M16.9707 0.495483H315.029L331.054 18.2432L315.029 35.991H16.9707L0.946045 18.2432L16.9707 0.495483Z" fill="#A10C0C"/>
                    </svg>
                    <p>{fortune.number}</p>
                </div>
                <p className={styles.title}>おみくじ</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="332" height="24" viewBox="0 0 332 24" fill="none">
                    <path d="M20.946 9.92798L0.946045 0.380973L0.946045 23.475L20.946 13.928V9.92798ZM331.054 11.928L311.054 0.380973V23.475L331.054 11.928ZM18.946 13.928L313.054 13.928V9.92798L18.946 9.92798V13.928Z" fill="#A10C0C"/>
                </svg>
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
                            <svg width="179" height="179" viewBox="0 0 179 179" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="89.7219" cy="89.288" r="88.8744" fill="#F8F7F1"/>
                                <circle cx="89.7219" cy="89.288" r="86.8744" stroke="#A10C0C" strokeOpacity="0.3" strokeWidth="4" strokeDasharray="4 4"/>
                                <path d="M111.952 30.4294C112.123 30.2161 112.357 29.9601 112.656 29.6614C112.955 29.3201 113.189 29.0641 113.36 28.8934C113.573 28.7227 113.765 28.6374 113.936 28.6374C114.192 28.6374 114.789 29.0641 115.728 29.9174C116.667 30.7707 117.541 31.6667 118.352 32.6054C119.163 33.5441 119.568 34.1627 119.568 34.4614C119.312 34.7174 119.013 34.9094 118.672 35.0374C118.373 35.1227 117.883 35.1867 117.2 35.2294C116.261 36.0401 115.067 36.9574 113.616 37.9814C112.208 39.0054 110.949 39.8587 109.84 40.5414L109.2 40.1574L110.736 33.9494H100.24C98.4907 38.0454 96.4427 41.6934 94.096 44.8934L94.8 45.1494H99.664C100.304 42.3761 100.624 39.7094 100.624 37.1494C100.624 36.2961 100.603 35.6774 100.56 35.2934C106.149 36.4027 108.944 37.2347 108.944 37.7894C108.944 37.9174 108.773 38.0667 108.432 38.2374L107.344 38.7494C105.637 41.0534 103.803 43.1867 101.84 45.1494H108.496L110.032 43.0374C110.16 42.8667 110.373 42.5681 110.672 42.1414C111.013 41.7147 111.291 41.3947 111.504 41.1814C111.717 40.9681 111.909 40.8614 112.08 40.8614C112.336 40.8614 112.955 41.2241 113.936 41.9494C114.917 42.6747 115.835 43.4641 116.688 44.3174C117.541 45.1281 117.968 45.6827 117.968 45.9814C117.797 46.6641 117.243 47.0054 116.304 47.0054H105.936V55.3894H108.176L109.584 53.2774C109.712 53.1067 109.925 52.8081 110.224 52.3814C110.523 51.9547 110.757 51.6347 110.928 51.4214C111.141 51.2081 111.333 51.1014 111.504 51.1014C111.76 51.1014 112.336 51.4641 113.232 52.1894C114.128 52.9147 114.96 53.7041 115.728 54.5574C116.496 55.3681 116.88 55.9227 116.88 56.2214C116.837 56.5627 116.667 56.8187 116.368 56.9894C116.112 57.1601 115.771 57.2454 115.344 57.2454H105.936V65.7574H108.304L109.712 63.5814C109.84 63.4107 110.053 63.1121 110.352 62.6854C110.651 62.2587 110.885 61.9387 111.056 61.7254C111.269 61.5121 111.461 61.4054 111.632 61.4054C111.888 61.4054 112.464 61.7894 113.36 62.5574C114.256 63.2827 115.088 64.0721 115.856 64.9254C116.667 65.7361 117.072 66.2907 117.072 66.5894C116.944 67.2721 116.411 67.6134 115.472 67.6134H105.936V76.7014H109.456L111.056 74.2694C111.269 74.0134 111.525 73.6507 111.824 73.1814C112.165 72.7121 112.421 72.3707 112.592 72.1574C112.805 71.9441 112.997 71.8374 113.168 71.8374C113.424 71.8374 114.043 72.2641 115.024 73.1174C116.048 73.9281 116.987 74.8027 117.84 75.7414C118.736 76.6374 119.184 77.2347 119.184 77.5334C119.013 78.2161 118.459 78.5574 117.52 78.5574H94.032V81.0534C94.032 81.2241 93.7973 81.4587 93.328 81.7574C92.9013 82.0987 92.2827 82.3974 91.472 82.6534C90.704 82.9094 89.8293 83.0374 88.848 83.0374C88.2933 83.0374 87.8453 82.9094 87.504 82.6534C87.1627 82.3974 86.992 82.0987 86.992 81.7574C87.1627 79.2401 87.312 76.8081 87.44 74.4614C87.568 72.0721 87.6533 68.9574 87.696 65.1174V52.0614C86.16 53.4694 84.6027 54.6854 83.024 55.7094L82.832 55.5174V62.3654C82.96 68.0827 83.1093 72.5201 83.28 75.6774C82.9813 76.1041 82.2133 76.5734 80.976 77.0854C79.7387 77.5974 78.6293 77.8534 77.648 77.8534C76.7947 77.8534 76.368 77.4267 76.368 76.5734C76.368 76.5734 76.4533 75.8054 76.624 74.2694V72.4134H71.76V74.5894C71.8027 75.0587 71.824 75.6347 71.824 76.3174L72.016 78.5574C71.8453 79.0267 71.2693 79.5174 70.288 80.0294C69.3067 80.5414 68.1333 80.7974 66.768 80.7974C66.256 80.7974 65.8507 80.6694 65.552 80.4134C65.2533 80.1574 65.104 79.8587 65.104 79.5174C65.4027 75.4641 65.5947 70.9627 65.68 66.0134V58.5894C64.4427 60.5094 63.0773 62.3227 61.584 64.0294L60.688 63.3894C64.4 55.5814 66.9173 44.7654 68.24 30.9414H66C64.8053 30.9841 63.6107 31.2827 62.416 31.8374L60.816 28.6374C63.1627 28.8934 66 29.0641 69.328 29.1494H76.496L78.096 26.7814C78.3093 26.4827 78.544 26.1627 78.8 25.8214C79.056 25.4374 79.312 25.1174 79.568 24.8614C79.824 24.5627 80.0373 24.4134 80.208 24.4134C80.464 24.4134 81.104 24.8187 82.128 25.6294C83.1947 26.3974 84.176 27.2294 85.072 28.1254C86.0107 29.0214 86.48 29.6187 86.48 29.9174C86.3093 30.6001 85.7333 30.9414 84.752 30.9414H75.408C74.5547 36.9147 73.1893 42.4187 71.312 47.4534L72.464 47.9654H76.048L77.328 46.4294C77.4987 46.2587 77.776 45.9601 78.16 45.5334C78.544 45.0641 78.864 44.8294 79.12 44.8294C79.376 44.8294 79.952 45.1494 80.848 45.7894C81.7867 46.4294 82.64 47.1334 83.408 47.9014C84.2187 48.6267 84.624 49.1387 84.624 49.4374C84.5387 49.6507 84.3253 49.8641 83.984 50.0774C83.6427 50.2481 83.2587 50.3761 82.832 50.4614V54.6214C87.312 49.5014 90.9387 42.6107 93.712 33.9494H89.616C89.744 35.7414 89.552 37.2987 89.04 38.6214C88.528 39.9014 87.824 40.8614 86.928 41.5014C86.3307 41.9281 85.6267 42.1414 84.816 42.1414C83.92 42.1414 83.152 41.8641 82.512 41.3094C81.872 40.7121 81.552 39.9227 81.552 38.9414C81.552 38.2161 81.7653 37.5547 82.192 36.9574C82.6613 36.3174 83.2587 35.7841 83.984 35.3574C84.9653 34.7601 85.8187 33.8214 86.544 32.5414C87.2693 31.2614 87.6107 29.9814 87.568 28.7014H88.4C88.9547 30.1521 89.2747 31.3041 89.36 32.1574H94.224C94.6507 30.6641 95.0133 29.0214 95.312 27.2294C95.6107 25.4374 95.7813 23.8587 95.824 22.4934C101.669 24.2427 104.592 25.3947 104.592 25.9494C104.592 26.1201 104.421 26.2694 104.08 26.3974L102.928 26.8454C102.288 28.7227 101.648 30.4934 101.008 32.1574H110.48L111.952 30.4294ZM99.6 55.3894V47.0054H94.032V55.3894H99.6ZM71.76 49.7574V70.5574H76.624V49.7574H71.76ZM94.032 65.7574H99.6V57.2454H94.032V65.7574ZM94.032 76.7014H99.6V67.6134H94.032V76.7014ZM74.576 93.5974C71.5467 93.6401 68.3467 93.9387 64.976 94.4934L63.312 91.2934C65.36 91.5494 67.8347 91.7201 70.736 91.8054H74.192L75.664 89.6294C75.8773 89.3307 76.112 88.9894 76.368 88.6054C76.6667 88.1787 76.9013 87.8801 77.072 87.7094C77.2853 87.4961 77.4773 87.3894 77.648 87.3894C77.904 87.3894 78.48 87.7734 79.376 88.5414C80.3147 89.2667 81.168 90.0561 81.936 90.9094C82.7467 91.7201 83.152 92.2747 83.152 92.5734C83.024 93.2561 82.512 93.5974 81.616 93.5974H74.576ZM91.984 93.4054C90.5333 93.4481 88.9973 93.7467 87.376 94.3014L85.648 91.0374C87.9947 91.2934 90.832 91.4641 94.16 91.5494H109.328L110.928 89.8214C111.056 89.6507 111.269 89.3947 111.568 89.0534C111.909 88.7121 112.187 88.4561 112.4 88.2854C112.613 88.1147 112.805 88.0294 112.976 88.0294C113.232 88.0294 113.851 88.4134 114.832 89.1814C115.813 89.9494 116.731 90.7601 117.584 91.6134C118.48 92.4667 118.928 93.0427 118.928 93.3414C118.544 93.8534 117.755 94.2374 116.56 94.4934C116.432 99.4001 116.219 103.283 115.92 106.141C115.664 109 115.28 111.24 114.768 112.861C114.299 114.44 113.616 115.613 112.72 116.381C111.013 117.789 108.731 118.493 105.872 118.493C105.872 117.341 105.808 116.403 105.68 115.677C105.552 114.909 105.296 114.312 104.912 113.885C104.229 112.989 102.821 112.264 100.688 111.709L100.752 110.877C102.971 111.048 104.827 111.133 106.32 111.133C107.131 111.133 107.685 110.963 107.984 110.621C108.581 110.109 109.008 108.531 109.264 105.885C109.563 103.24 109.776 99.0801 109.904 93.4054H102.096C101.627 96.4347 101.179 98.7814 100.752 100.445C102.331 101.256 103.504 102.216 104.272 103.325C105.083 104.392 105.488 105.459 105.488 106.525C105.488 107.464 105.189 108.232 104.592 108.829C103.995 109.427 103.205 109.725 102.224 109.725C102.011 109.725 101.691 109.683 101.264 109.597C100.453 108.659 99.4933 107.699 98.384 106.717C97.0187 109.448 95.2053 111.837 92.944 113.885C90.7253 115.933 87.8667 117.725 84.368 119.261L83.856 118.429C86.3733 116.339 88.3573 114.035 89.808 111.517C91.3013 109 92.4533 106.141 93.264 102.941C90.576 101.192 88.3147 99.9334 86.48 99.1654L86.864 98.4614C88.3147 98.3761 89.3387 98.3334 89.936 98.3334C91.088 98.3334 92.4747 98.4187 94.096 98.5894C94.2667 97.3947 94.48 95.6667 94.736 93.4054H91.984ZM69.072 101.661C66.768 101.704 64.3787 102.003 61.904 102.557L60.24 99.4214C62.5867 99.6774 65.424 99.8481 68.752 99.9334H77.392L78.864 97.7574C78.992 97.5867 79.2053 97.2881 79.504 96.8614C79.8027 96.4347 80.0373 96.1147 80.208 95.9014C80.4213 95.6881 80.6133 95.5814 80.784 95.5814C81.04 95.5814 81.616 95.9441 82.512 96.6694C83.4507 97.3947 84.3253 98.1841 85.136 99.0374C85.9467 99.8481 86.352 100.403 86.352 100.701C86.1813 101.341 85.6267 101.661 84.688 101.661H69.072ZM78.032 103.965C78.288 103.965 78.8427 104.328 79.696 105.053C80.592 105.736 81.424 106.483 82.192 107.293C82.96 108.104 83.344 108.659 83.344 108.957C83.1733 109.64 82.64 109.981 81.744 109.981H69.904C68.24 110.024 66.5333 110.323 64.784 110.877L63.12 107.677C65.2533 107.933 67.856 108.104 70.928 108.189H74.704L76.112 106.077C76.2827 105.864 76.496 105.565 76.752 105.181C77.0507 104.755 77.2853 104.456 77.456 104.285C77.6693 104.072 77.8613 103.965 78.032 103.965ZM78.032 112.349C78.288 112.349 78.8427 112.712 79.696 113.437C80.592 114.12 81.424 114.867 82.192 115.677C82.96 116.488 83.344 117.043 83.344 117.341C83.1733 117.981 82.64 118.301 81.744 118.301H69.904C68.24 118.344 66.5333 118.643 64.784 119.197L63.12 115.997C65.2533 116.253 67.856 116.424 70.928 116.509H74.704L76.112 114.461C76.2827 114.248 76.496 113.949 76.752 113.565C77.0507 113.139 77.2853 112.84 77.456 112.669C77.6693 112.456 77.8613 112.349 78.032 112.349ZM109.904 138.845C110.672 139.229 111.184 139.613 111.44 139.997C111.739 140.381 111.888 140.915 111.888 141.597C111.888 142.92 111.163 143.923 109.712 144.605C108.261 145.288 105.808 145.629 102.352 145.629H98.128C96.464 145.629 95.2267 145.459 94.416 145.117C93.648 144.819 93.1147 144.285 92.816 143.517C92.56 142.749 92.432 141.597 92.432 140.061V131.485C92.432 127.731 92.2613 124.765 91.92 122.589L99.984 123.613C99.088 122.504 98 121.437 96.72 120.413C95.4827 119.389 94.288 118.579 93.136 117.981L93.648 117.405C94.16 117.363 94.9067 117.341 95.888 117.341C98.4053 117.341 100.475 117.661 102.096 118.301C103.76 118.941 104.955 119.752 105.68 120.733C106.448 121.715 106.832 122.739 106.832 123.805C106.832 124.744 106.533 125.533 105.936 126.173C105.381 126.813 104.656 127.133 103.76 127.133C103.205 127.133 102.651 127.005 102.096 126.749C101.584 125.683 100.987 124.765 100.304 123.997C100.091 124.68 99.5147 125.107 98.576 125.277V138.333C98.576 138.76 98.6613 139.037 98.832 139.165C99.0027 139.293 99.3867 139.357 99.984 139.357H103.056L105.808 139.293C106.064 139.251 106.277 139.187 106.448 139.101C106.619 139.016 106.789 138.867 106.96 138.653C107.301 138.099 108.005 136.136 109.072 132.765H109.712L109.904 138.845ZM89.04 125.085C90.0213 127.901 90.512 130.483 90.512 132.829C90.512 135.731 89.8293 137.971 88.464 139.549C87.7813 140.317 86.864 140.701 85.712 140.701C85.1147 140.701 84.56 140.552 84.048 140.253C83.536 139.955 83.1307 139.528 82.832 138.973C82.6613 138.461 82.5547 138.077 82.512 137.821C82.5973 139.528 82.6827 141.064 82.768 142.429C82.5547 142.856 81.808 143.325 80.528 143.837C79.2907 144.392 78.16 144.669 77.136 144.669C76.24 144.669 75.792 144.243 75.792 143.389C75.792 143.389 75.8773 142.963 76.048 142.109V140.829H69.968V142.237C70.0107 142.792 70.032 143.283 70.032 143.709C70.0747 144.136 70.1173 144.456 70.16 144.669C70.0747 145.181 69.4347 145.715 68.24 146.269C67.0453 146.824 65.8293 147.101 64.592 147.101C64.1653 147.101 63.824 146.973 63.568 146.717C63.3547 146.461 63.248 146.163 63.248 145.821C63.4187 143.987 63.5467 141.661 63.632 138.845V134.685C63.632 129.608 63.376 125.384 62.864 122.013L70.224 125.149H75.472L76.816 123.485C76.9867 123.315 77.2 123.08 77.456 122.781C77.7547 122.44 77.9893 122.205 78.16 122.077C78.3307 121.907 78.5013 121.821 78.672 121.821C78.928 121.821 79.568 122.184 80.592 122.909C81.616 123.592 82.5547 124.339 83.408 125.149C84.304 125.917 84.752 126.451 84.752 126.749C84.2827 127.389 83.4933 127.795 82.384 127.965V132.893L82.512 137.373C82.5547 136.136 83.2587 134.984 84.624 133.917C85.5627 133.149 86.3947 131.891 87.12 130.141C87.888 128.392 88.208 126.707 88.08 125.085H89.04ZM109.776 124.637C113.019 126.301 115.387 128.157 116.88 130.205C118.416 132.253 119.184 134.216 119.184 136.093C119.184 137.416 118.843 138.525 118.16 139.421C117.52 140.275 116.709 140.701 115.728 140.701C114.704 140.701 113.701 140.189 112.72 139.165C112.763 136.947 112.443 134.6 111.76 132.125C111.077 129.608 110.224 127.219 109.2 124.957L109.776 124.637ZM69.968 139.037H76.048V127.005H69.968V139.037Z" fill="#A10C0C" fillOpacity="0.3"/>
                            </svg>
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
