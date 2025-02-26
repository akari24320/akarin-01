"use client";
import { useState } from "react";
import styles from "./fortunelineup.module.css";

const FortuneLineup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const fortunes = ["大吉", "中吉", "小吉", "吉", "末吉"];

  return (
    <div className={styles.container}>
      <button onClick={() => setIsOpen(true)} className={styles.button}>
        運勢一覧
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.title}>運勢一覧</h2>
            <ul className={styles.list}>
              {fortunes.map((fortune, index) => (
                <li key={index} className={styles.listItem}>
                  {fortune}
                </li>
              ))}
            </ul>
            <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FortuneLineup;
