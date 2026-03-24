# Soking Design Guideline

> 本文件為 Soking 網站的視覺設計規範，所有 UI 元件的開發請嚴格遵循此規範。
> CSS 變數請參考 `tokens.css`。

---

## 1. 色彩系統 Color System

### 主色 Primary Colors

| 名稱 | Hex | 用途 |
|------|-----|------|
| Dark Navy | `#1A1A2E` | 導覽列背景、時間軸標頭、Filter 選中按鈕 |
| Brand Purple | `#4A3FD6` | CTA 按鈕、連結、強調色、Featured 卡片框線 |
| Purple Light | `#6C63FF` | Hover 狀態、次要強調 |

### 功能色 Functional Colors

| 名稱 | Hex | 用途 |
|------|-----|------|
| Purple Tint | `#EEF0FD` | 標籤背景、強調區塊填色 |
| Green Tint | `#E4F7EE` | 成功狀態、正面標籤、學完之後欄位 |
| Yellow Tint | `#FEF9E7` | 工作坊標籤、警示性資訊 |
| Coral Tint | `#FEF0ED` | 困境/問題欄位背景 |

### 文字與背景色 Neutrals

| 名稱 | Hex | 用途 |
|------|-----|------|
| White | `#FFFFFF` | 卡片背景 |
| Off-White | `#F7F7F8` | 頁面背景 |
| Text Primary | `#1A1A2E` | 主要文字 |
| Text Secondary | `#6B6B80` | 說明文字、次要資訊 |
| Text Tertiary | `#9999AA` | placeholder、最小字級說明 |
| Border | `#E5E5EE` | 卡片框線、分隔線 |

### 規則
- 全站**無漸層**、**無陰影**（box-shadow: none）
- 分隔線一律 `0.5px solid #E5E5EE`
- Dark Navy 只用於重點區塊（nav、section header），其餘背景維持白色或 Off-White

---

## 2. 字體系統 Typography

### 字型
- 主要字型：`'Noto Sans TC', 'Microsoft JhengHei', sans-serif`
- 僅使用兩種字重：`400`（內文）、`500`（標題/強調）
- **禁止使用 600、700 或 bold**

### 字級規範

| 層級 | 大小 | 字重 | 用途 |
|------|------|------|------|
| Page Title | `36px` | `500` | 頁面主標題 |
| Section Title | `28px` | `500` | 區塊標題 |
| Card Title | `18px` | `500` | 卡片主標題 |
| Price | `28–32px` | `500` | 定價數字 |
| Body | `15–16px` | `400` | 內文 |
| Small | `13px` | `400` | 說明、標籤文字 |
| Caption | `11–12px` | `400` | 最小說明、圖例 |

### 規則
- 行高（line-height）：標題 `1.3`，內文 `1.7`
- 中文字距保持預設，不額外調整 letter-spacing（除全大寫英文標籤外）
- 頁面主標題置中，卡片/列表標題靠左

---

## 3. 間距系統 Spacing

使用固定的 4px 基礎單位：

| Token | 值 | 用途 |
|-------|-----|------|
| `--space-1` | `4px` | 元素內最小間距（icon 與文字） |
| `--space-2` | `8px` | 行內元素間距 |
| `--space-3` | `12px` | 卡片欄位間距 |
| `--space-4` | `16px` | 卡片 padding |
| `--space-5` | `20px` | 卡片內部區塊間距 |
| `--space-6` | `24px` | 欄位之間 gap |
| `--space-8` | `32px` | Section 內部上下間距 |
| `--space-10` | `40px` | Section 之間間距 |
| `--space-16` | `64px` | 頁面頂部/底部 padding |

---

## 4. 圓角系統 Border Radius

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-sm` | `6px` | 小型標籤、chip |
| `--radius-md` | `8px` | 按鈕、輸入框 |
| `--radius-lg` | `12px` | 卡片 |
| `--radius-xl` | `16px` | 大型區塊容器 |
| `--radius-full` | `999px` | 膠囊按鈕、圓點標籤 |

---

## 5. 按鈕系統 Buttons

### Primary Button（主要 CTA）
```css
background: #4A3FD6;
color: #FFFFFF;
border: none;
padding: 10px 20px;
border-radius: 8px;
font-size: 14px;
font-weight: 500;
cursor: pointer;
```
Hover: `background: #3D34B8`

### Secondary Button（次要行動）
```css
background: transparent;
color: #1A1A2E;
border: 1.5px solid #C5C5D8;
padding: 10px 20px;
border-radius: 8px;
font-size: 14px;
font-weight: 500;
cursor: pointer;
```
Hover: `background: #F7F7F8`

### Filter Button — Active（篩選器選中）
```css
background: #1A1A2E;
color: #FFFFFF;
border: none;
padding: 10px 22px;
border-radius: 999px;
font-size: 14px;
font-weight: 500;
```

### Filter Button — Inactive（篩選器未選）
```css
background: transparent;
color: #1A1A2E;
border: 1.5px solid #C5C5D8;
padding: 8px 18px;
border-radius: 999px;
font-size: 14px;
```
Hover: `background: #F7F7F8`

---

## 6. 卡片系統 Cards

### Default Card
```css
background: #FFFFFF;
border: 0.5px solid #E5E5EE;
border-radius: 12px;
padding: 20px;
```

### Featured Card（推薦卡片）
```css
background: #FFFFFF;
border: 2px solid #4A3FD6;
border-radius: 12px;
padding: 20px;
position: relative;
```
- 頂部加徽章：`background: #4A3FD6; color: #fff; border-radius: 999px; font-size: 11px; padding: 3px 12px`
- 徽章用 `position: absolute; top: -12px; left: 50%; transform: translateX(-50%)`

### Persona Card（適合誰 — 三欄）
三欄等寬 grid，各欄顏色：
- 困境欄：`background: #FEF0ED`，標題色 `#C04828`
- 成果欄：`background: #E4F7EE`，標題色 `#0F6E56`
- 建議欄：`background: #EEF0FD`，標題色 `#3A30A6`

### Pain Point Card（條列說明）
```css
background: #FFFFFF;
border: 0.5px solid #E5E5EE;
border-radius: 10px;
padding: 14px 16px;
```
- 左側圖示：空心圓（紫色 `#4A3FD6`，直徑 18px，border 1.5px）
- 標題：`font-size: 14px; font-weight: 500`
- 說明：`font-size: 12px; color: #6B6B80; margin-left: 26px`

---

## 7. 標籤與徽章 Tags & Badges

### 狀態標籤（報名中）
```css
background: #EEF0FD;
color: #4A3FD6;
border-radius: 999px;
padding: 4px 12px;
font-size: 12px;
font-weight: 500;
```

### 推薦徽章（推薦起點）
```css
background: #4A3FD6;
color: #FFFFFF;
border-radius: 999px;
padding: 4px 12px;
font-size: 11px;
font-weight: 500;
```

### 課程階段標籤（R1 / R2 / R3 / R4）
```css
background: #FEF9E7;
color: #8B7320;
border-radius: 6px;
padding: 2px 8px;
font-size: 12px;
font-weight: 500;
```

### 工作坊事件 Chip
```css
/* 線上課程 */
background: #E4F7EE;
color: #0F6E56;

/* 工作坊 */
background: #FEF9E7;
color: #8B7320;
border: 1px solid #F5E6C8;
```

### 圖例點（Legend Dot）
- 線上：`background: #4A3FD6`（紫）
- 工作坊：`background: #F0A500`（橘黃）
- UXR 營：`background: #1D9E75`（綠）
- 大小：`width: 8px; height: 8px; border-radius: 50%`

---

## 8. 導覽列 Navigation

```
[Logo Icon] Soking    關於我   課程 ▾   服務 ▾   學習資源 ▾   預約 1on1   [登入 Button]
```

- 背景：白色，底部 `border-bottom: 0.5px solid #E5E5EE`
- Logo icon：`28px × 28px`，`background: #1A1A2E`，`border-radius: 6px`，白色文字
- 連結字級：`13px`，`color: #6B6B80`
- Active 連結：`color: #1A1A2E; font-weight: 500`
- 最右側放 Primary Button（登入）

---

## 9. 時間軸元件 Schedule Timeline

- **月份標頭**：`background: #1A1A2E; color: #FFFFFF; padding: 10px 16px; border-radius: 8px 8px 0 0; font-size: 13px; font-weight: 500`
- **列表本體**：`border: 0.5px solid #E5E5EE; border-top: none; border-radius: 0 0 8px 8px`
- 每列包含：日期 + 狀態 Chip + 事件標題 + 地點/類型（靠右）
- 水平方向可顯示 Gantt 式時間 bar，依事件類型套對應 Chip 顏色

---

## 10. 版面規範 Layout

- 最大寬度：`max-width: 1280px; margin: 0 auto`
- 定價頁：4 欄等寬 grid，`gap: 24px`
- 行事曆頁：左側小日曆 + 右側主時間軸，約 `280px + 1fr`
- Persona 頁：單欄列表，每項三欄 grid
- 頁面 padding：`0 40px`（桌機）、`0 20px`（行動裝置）
- Section 間距：`margin-bottom: 64px`

---

## 11. 禁止事項 Don'ts

- ❌ 不使用 `box-shadow`
- ❌ 不使用漸層 `gradient`
- ❌ 不使用 `font-weight: 600` 或 `700`
- ❌ 不使用超過 `0.5px` 的邊框（Featured 卡片的 `2px` 例外）
- ❌ 不在普通卡片背景加色彩（只有 Persona 三欄才有背景色）
- ❌ 不在按鈕以外的地方使用 `#4A3FD6` 實心填色
