"use client";
import { useRouter } from "next/navigation";
import { getRandomFortune, getRandomDescription } from ".././../utils/FortunesDate";
import { getNumber } from ".././../utils/OmikujiNumber"
import FortuneLineup from ".././../components/FortuneLineup/fortunelineup";

export default function Home() {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/pages/result`);
    };

    return (
        <div>
            <h1>おみくじ</h1>
            <FortuneLineup></FortuneLineup>
            <button onClick={handleClick}>おみくじを引く</button>
        </div>
    );
}
