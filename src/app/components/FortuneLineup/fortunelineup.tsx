"use client";
import { useState } from "react";
import styles from "./fortunelineup.module.css";

const FortuneLineup = () => {
  const [isOpen, setIsOpen] = useState(false);//初期値としてfalseを設定
  //最初、モーダルは閉じた状態に

  const fortunes = ["大吉", "中吉", "小吉", "吉", "末吉", "凶", "大凶"];

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        運勢一覧
      </button>

      {isOpen && ( //この&&は、条件がtrueの時だけ表示させるために
        <div className={styles.overlay}>
          <div className={styles.closebutton}>
            <button onClick={() => setIsOpen(false)}>閉じる</button>
          </div>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.title}>運勢一覧</h2>
            <ul className={styles.list}>
              {fortunes.map((fortune, index) => (
                <li key={index} className={styles.listItem}>
                  {fortune}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FortuneLineup;
