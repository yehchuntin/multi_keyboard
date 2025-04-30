# multi_keyboard 中文注音打字練習計畫

## 📌 專案概述
本專案是一個多語系輸入法練習網站（如：注音、倉頡、日文、韓文），基於 keybr.com fork 並客製化支援中文輸入法的使用與教學。

---

## 🛠️ 初始設定流程

### 步驟 1：建立 GitHub Repository
- 前往 GitHub 點選 `New repository` 建立名為 `multi_keyboard` 的專案。
- ✅ **請勿勾選 Initialize with README**，以避免與後續 clone 衝突。

### 步驟 2：Clone keybr 原始碼
```bash
git clone https://github.com/aradzie/keybr.com.git
cd keybr.com
```

### 步驟 3：設置 remote 指向你自己的 GitHub 倉庫
```bash
git remote set-url origin https://github.com/你的帳號/multi_keyboard.git
```
可用 `git remote -v` 確認是否設定成功。

### 步驟 4：安裝依賴與編譯執行
```bash
npm install
copy .env.example .env
npm run compile
npm run build-dev
npm start
```

#### 補充：若使用 PowerShell 執行出現權限錯誤
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

## ⚠️ 處理樣式檔案錯誤 `/assets/$styles.css`

如果出現以下錯誤：
```
Error: Unknown asset "/assets/$styles.css"
```

### 🧾 問題原因
這是因為 `preload.ts` 使用了錯誤的樣式名稱 `$styles.css`，實際輸出檔案應為 `styles.css`（無 `$`）

### ✅ 解法 1：修正 `preload.ts`
```ts
export const preload = {
  styles: ["/assets/styles.css"], // 正確
  fonts: [
    "/assets/open-sans-400.latin.woff2",
    "/assets/open-sans-400italic.latin.woff2",
  ],
} as const;
```

### ✅ 解法 2：確認 `MiniCssExtractPlugin` 輸出名稱一致
在 `webpack.config.js` 的 browser 區塊內：
```ts
new MiniCssExtractPlugin({
  filename: `styles.css`, // 必須與 preload.ts 一致
  chunkFilename: `${chunkFilename}.css`,
  ignoreOrder: true,
}),
```

### 🔁 建議：若常更動樣式檔名，可改用 build script 自動取名並寫入 preload.ts。

---

## 🔧 webpack 常見錯誤與解法

### Module parse failed: Unexpected character
請在 `webpack.config.js` 的 browser config 中加入：
```js
{
  test: /\.(mp3|wav|svg|data|stats|png|jpe?g|gif)$/i,
  type: 'asset/resource'
},
```

### 安裝缺漏的 loader
```bash
npm install --save-dev file-loader url-loader
```

---

## 🧯 常見 Git/NPM 錯誤排除表

| 錯誤訊息 | 原因 | 解法 |
|----------|------|------|
| `not a git repository` | 尚未進入專案資料夾 | `cd keybr.com` |
| `repository not found` | GitHub repo 未建立或網址錯誤 | 建立 repo 並檢查網址 |
| `Missing script: build-dev` | NPM script 名稱錯誤 | 確認 `package.json` 是否包含 |
| `Module parse failed` | 缺少對應 loader | 加入 asset/resource loader |
| PowerShell 無法執行 npm | 權限限制 | 執行 RemoteSigned |

---

## 🔁 開發建議流程
- 每次修改前請建立新分支並 commit 說明
- 修改完畢後再進行 PR 或 merge
- 本地測試請執行 `npm run build-dev` 和 `npm start`

---

## 💡 延伸開發方向建議
- 增加輸入法切換 UI 與使用者偏好設定儲存
- 設計注音聲母/韻母/符號類型專屬練習模式
- 導入機器學習分析使用者打字錯誤趨勢
- 建立倉頡、日文五十音、韓文拼音等模組

---

