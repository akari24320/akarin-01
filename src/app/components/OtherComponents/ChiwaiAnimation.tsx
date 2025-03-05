"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ChiwaiAnimation.module.css";
import Image from "next/image"; // 画像を最適化するNext.jsのコンポーネント
import chiwaiImage from "./chiwai.png"; // 画像のパス（適宜変更）

const ChiwaiAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setIsVisible(false), 1000); // 1秒後に非表示
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div className={styles.container}>
      <button onClick={() => setIsVisible(true)} className={styles.button}>
        チワい
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1}}
          >
            <motion.div
              initial={{ opacity: 0, scale: 3 }}
              animate={{ opacity: 1, scale: [3, 3, 2, 1, 0.8, 0.8, 1] }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.1}}
            >
              {/* PNG画像を表示 */}
              <Image 
                src={chiwaiImage} 
                alt="チワい" 
                width={180} // 画像サイズ（適宜調整）
                height={123} 
                className={styles.image} // 追加のスタイル（必要なら）
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChiwaiAnimation;
