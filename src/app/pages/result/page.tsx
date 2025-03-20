"use client"
import React from "react";
import { useRouter } from "next/navigation";

export default function Result() {
    const router = useRouter();

    const Back = () => {
        router.push("/pages/index");

    }

    return(
    <div>
        <h1>Result</h1>
        <p>ここにおみくじの結果を表示</p>
        <button onClick={Back}>戻る</button>
        </div>
    );
}