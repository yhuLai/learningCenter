# 頁面架構

## 全域 Sidebar（所有 Layout 頁面共用）
連結：我的學習中心 `/my-learning`　線上課程 `/online-courses`　實戰營 `/bootcamp`　課程活動 `/activities`　UX工具箱 `/ux-toolbox`
設定下拉：登出 → `/`

---

## `/` 歡迎頁
元件：登入 Modal
連結：立即註冊 → `/register`

---

## `/register` 註冊頁
（無對外連結）

---

## `/my-learning` 我的學習中心
元件：
- 課程活動 cards（資料來源：`activities.js` upcomingAll｜實戰營→加入直播 disabled｜工作坊/小聚→查看詳情）
- 學習 OKR
- 學習雷達圖
- 近期觀看的課程（含類型篩選 tabs）

連結：設定學習OKR → `/okr-setup`　繼續學習 → `/video/:id`　查看詳情 → `/activities/:id`

---

## `/okr-setup` OKR 設定
連結：→ `/okr-result`

---

## `/okr-result` OKR 結果

---

## `/online-courses` 線上課程
元件：
- 影片課程（3欄 grid，含課程類型篩選，資料來源：`courses.js` paidCourses，不含實戰營）
- 直播回放（3欄 grid，資料來源：`courses.js` freeCourses）

連結：前往觀看 → `/video/:id`

---

## `/bootcamp` 實戰營
元件：
- UXR 認證等級（R0–R4 進度）
- 進行中的營隊 card（含即將開始的課程，資料來源：`activities.js` type:'實戰營'｜加入直播 disabled）
- 參與過的營隊 card（含觀看截止日期標籤）

連結：前往觀看 → `/video/101`　觀看回放 → `/video/102`

---

## `/activities` 課程活動
元件：
- 即將開始的活動（橫式 cards，資料來源：`activities.js` upcomingActivities，type:'工作坊'/'小聚'）
- 參與過的工作坊（3欄 grid）
- 參與過的小聚活動（3欄 grid）

連結：查看詳情 → `/activities/:id`
重新導向：`/workshop` `/gathering` → `/activities`

---

## `/activities/:id` 活動詳情
元件：返回按鈕（navigate -1）、類型標籤、標題、描述、活動資訊 card（日期／時間／地址）、注意事項
連結：返回 → 上一頁（`/activities` 或 `/my-learning`）

---

## `/video/:id` VideoPlayer
**固定框架**：左側 Sidebar（返回、課程名稱、進度條、課程總覽、章節列表）、頂部麵包屑列

**課程總覽**：封面、標籤、標題、課程資訊、課程介紹、章節列表、講師介紹

**章節頁面**（依資料欄位顯示）：
- `videoUrl` → 影片播放器
- `replayExpiry` → 回放到期 banner
- `emailNotice` → Email 教材 banner
- `lessonType` → 課程類型標籤
- `liveSession` → 直播資訊 card
- `eventInfo` → 活動資訊 card（日期／時間／地址）
- `notes` → 注意事項
- `materials` → 教材連結 cards
- `desc` → 課程說明
- `content` → Email 內文

---

## `/ux-toolbox` UX 工具箱

---

## 資料來源
| 檔案 | export | 使用頁面 |
|------|--------|----------|
| `courses.js` | `freeCourses` | 線上課程（直播回放） |
| `courses.js` | `paidCourses` | 線上課程（影片課程，不含實戰營） |
| `courses.js` | `bootcampCourses` | （備用） |
| `courses.js` | `getCourseById` | VideoPlayer |
| `activities.js` | `upcomingAll` | 我的學習中心（實戰營＋工作坊＋小聚） |
| `activities.js` | `upcomingActivities` | 課程活動（工作坊＋小聚） |
| `activities.js` | `activities` (type:'實戰營') | 實戰營（即將開始的課程） |
| `activities.js` | `pastWorkshops` | 課程活動（參與過的工作坊） |
| `activities.js` | `pastGatherings` | 課程活動（參與過的小聚） |
| `activities.js` | `getActivityById` | 活動詳情 |
