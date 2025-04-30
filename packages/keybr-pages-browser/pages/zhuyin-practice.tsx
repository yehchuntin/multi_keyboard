// 頁面檔案：/packages/keybr-pages-browser/pages/zhuyin-practice.tsx
import type * as React from "react";
import { useEffect, useState } from "react";
import styles from "./zhuyin-practice.module.less";

type PracticeItem = {
  question: string; // 顯示的注音題目
  answer: string; // 使用者實際需輸入的按鍵（英文）
}

export default function ZhuyinPractice() {
  const [data, setData] = useState<PracticeItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    fetch("/data/zhuyin-questions.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim().toLowerCase() === data[current].answer) {
        setCorrect((c) => c + 1);
      }
      setInput("");
      setCurrent((c) => (c + 1) % data.length);
    }
  };

  if (!data.length) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1>注音輸入練習</h1>
      <p>題目：{data[current].question}</p>
      <input
        autoFocus={true}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        placeholder="輸入對應英文鍵..."
      />
      <p>
        正確數：{correct} / {current}
      </p>
    </div>
  );
}
