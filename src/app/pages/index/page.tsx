"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Lineup from ".././../components/FortuneLineup/fortunelineup"

export default function Index() {
    const router = useRouter(); //useRouterを取得！

    const ToResult = () => {
        router.push("/pages/result");
    };

    return (
    <div>
        <h1>Index</h1>
        <Lineup/>
        <div>
            <button onClick={ToResult}>おみくじを引く</button>
        </div>
    </div>
    );
}