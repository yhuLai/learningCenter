# Soking Learning Center — CLAUDE.md

## 專案簡介
UXR 課程銷售網站，後端為學習管理系統（LMS）。
訪客可以瀏覽課程，會員登入後可進行購買、觀看課程、追蹤學習進度。

## 技術棧
- **框架**: React 19 + Vite
- **路由**: React Router v6
- **樣式**: Tailwind CSS v4
- **後端 / Auth / DB**: Supabase
- **狀態管理**: React Context

## 資料夾結構
```
src/
├── assets/          # 靜態資源（圖片、icon）
├── components/
│   ├── layout/      # Sidebar、Navbar 等版面元件
│   └── ui/          # 可重用 UI 元件（Button、Card、Tag 等）
├── context/         # React Context（Auth、User 狀態）
├── hooks/           # 自定義 hooks
├── lib/
│   └── supabase.js  # Supabase client
├── pages/           # 頁面元件（對應路由）
├── App.jsx          # 路由設定
├── main.jsx         # 進入點
└── index.css        # Global styles + Design Tokens
```

## 頁面對應路由
| 頁面 | 路由 | 權限 |
|------|------|------|
| 歡迎頁 | `/` | 訪客 |
| 登入 | `/login` | 訪客 |
| 註冊 | `/register` | 訪客 |
| 忘記密碼 | `/forgot-password` | 訪客 |
| OKR 設定 | `/okr-setup` | 訪客 |
| 課程詳細介紹 | `/courses/:id` | 訪客、會員 |
| 付款頁 | `/payment` | 訪客、會員 |
| 我的學習中心 | `/my-learning` | 會員 |
| 線上課程 | `/online-courses` | 訪客、會員 |
| 學習營 | `/bootcamp` | 訪客、會員 |
| 工作坊 | `/workshop` | 訪客、會員 |
| 小聚活動 | `/gathering` | 訪客、會員 |
| 影片觀看 | `/video/:id` | 會員 |

## 設計規範
詳見 `files/DESIGN_GUIDELINE.md` 與 `files/tokens.css`。

### 重要原則
- **無 box-shadow、無 gradient**
- 字重只用 `400`（內文）和 `500`（標題），**禁止 600、700**
- 分隔線一律 `0.5px solid #E5E5EE`
- 主色 `#4A3FD6`（Brand Purple）只用於 CTA 按鈕和連結
- 頁面背景 `#F7F7F8`，卡片背景 `#FFFFFF`

### 字型
`'Noto Sans TC', 'Microsoft JhengHei', sans-serif`

## 環境變數
`.env.local`（不進 git）：
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## 開發指令
```bash
npm run dev    # 啟動開發伺服器
npm run build  # 打包
```

## Sitemap 參考
詳見 `files/sitemap.pdf` 與 `files/pageArchitecture.pdf`。
