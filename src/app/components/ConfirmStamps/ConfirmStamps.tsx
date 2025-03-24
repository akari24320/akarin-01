"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const stamps = [
    "/stamp0.svg",
    "/stamp1.svg",
    "/stamp2.svg",
    "/stamp3.svg",
];

interface ConfirmStampsProps {
    resetTrigger: number; // 外部からのリセットトリガー
}

const ConfirmStamps: React.FC<ConfirmStampsProps> = ({ resetTrigger }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setCurrentIndex(0); // `resetTrigger` が変わるたびにスタンプをリセット
    }, [resetTrigger]);

    const handleClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % stamps.length);
    };

    return (
        <div onClick={handleClick} style={{ cursor: "pointer", display: "inline-block"}}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 3 }}
                    animate={{ opacity: 1, scale: [2.1, 2.1, 2, 1, 0.8, 0.8, 1] }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.08 }}
                >
                    <Image 
                        src={stamps[currentIndex]} 
                        alt={`Stamp ${currentIndex}`} 
                        width={220}
                        height={220}
                        priority
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ConfirmStamps;
