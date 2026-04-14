/**
 * activities.js — 課程活動資料來源
 * 涵蓋直播、實戰營、工作坊與小聚，list 頁與 detail 頁共用。
 *
 * type   : '直播' | '實戰營' | '工作坊' | '小聚'
 * status : '報名中' | '即將開始' | '已結束'
 */

export const activities = [
  // ── 即將開始：實戰營 ────────────────────────────────────────────────────────
  {
    id: 102,
    type: '實戰營',
    status: '即將開始',
    title: 'R1 品牌印象調查游擊訪談：第 2 週課程',
    desc: '',
    date: '2026-04-14',
    time: '19:30 – 22:00',
  },
  // ── 即將開始：工作坊 / 小聚 ─────────────────────────────────────────────────
  {
    id: 1,
    type: '工作坊',
    status: '報名中',
    title: '使用者旅程地圖實戰工作坊',
    desc: '從顧客視角出發，一日密集學習如何繪製使用者旅程地圖，找出產品體驗的關鍵斷點並提出改善方向。適合 UX 設計師、研究員與 PM。',
    date: '2026-04-26',
    time: '10:00 – 18:00',
    address: '台北市大安區信義路四段 296 號 3F｜好樣共創空間',
    notes: [
      '請準時到場，遲到超過 15 分鐘恕無法安排補位',
      '攜帶筆記本與個人電腦，部分環節需使用 Figjam',
      '午餐自理，場地附近有多家餐廳，建議預留 1 小時',
      '活動全程中文進行',
    ],
  },
  {
    id: 2,
    type: '小聚',
    status: '即將開始',
    title: 'UXR 職涯交流夜：從初學者到資深研究員',
    desc: '集結不同年資的 UX 研究員，透過短講與開放對話，分享職涯轉折、研究實務與成長心法。無論你是剛入門還是想突破瓶頸，都歡迎來聊。',
    date: '2026-05-08',
    time: '19:00 – 21:30',
    address: '線上（Zoom，報名後寄送會議連結）',
    notes: [
      '請於活動前 30 分鐘確認 Zoom 連結可正常進入',
      '歡迎準備 1–2 個想討論的職涯問題',
      '活動將錄影，回放限當日參與者觀看',
    ],
  },

  // ── 參與過：工作坊 ──────────────────────────────────────────────────────────
  {
    id: 3,
    type: '工作坊',
    status: '已結束',
    title: '用戶訪談實戰工作坊',
    stage: 'R1',
    desc: '一日密集訓練，學習真實訪談技巧與即時分析方法。',
    date: '2025-11-08',
    time: '10:00 – 18:00',
    address: '台北市中山區南京東路二段 150 號 5F',
    notes: [],
  },
  {
    id: 4,
    type: '工作坊',
    status: '已結束',
    title: '問卷設計工作坊',
    stage: 'R2',
    desc: '設計可量化的問卷，並學習資料清洗與初步分析。',
    date: '2025-12-14',
    time: '10:00 – 18:00',
    address: '台北市大安區復興南路一段 390 號 3F｜好樣共創空間',
    notes: [],
  },
  {
    id: 5,
    type: '工作坊',
    status: '已結束',
    title: '易用性測試工作坊',
    stage: 'R3',
    desc: '從規劃到主持，完整走過一次 Usability Testing。',
    date: '2026-01-18',
    time: '10:00 – 18:00',
    address: '台北市信義區松仁路 28 號 B1｜Soking Lab',
    notes: [],
  },
  {
    id: 6,
    type: '工作坊',
    status: '已結束',
    title: '研究洞察簡報工作坊',
    stage: 'R2',
    desc: '學習如何將研究發現轉化為清晰有說服力的簡報。',
    date: '2026-02-22',
    time: '10:00 – 18:00',
    address: '台北市大安區信義路四段 296 號 3F',
    notes: [],
  },

  // ── 參與過：小聚 ────────────────────────────────────────────────────────────
  {
    id: 7,
    type: '小聚',
    status: '已結束',
    title: 'UXR 職涯交流小聚',
    desc: '與業界研究員面對面交流，探索 UXR 職涯發展方向。',
    date: '2025-10-17',
    time: '19:00 – 21:00',
    address: '台北市大安區（線下，報名後通知地點）',
    notes: [],
  },
  {
    id: 8,
    type: '小聚',
    status: '已結束',
    title: '研究方法讀書會',
    desc: '每月一本研究經典，共同討論與實務應用。',
    date: '2025-11-21',
    time: '19:00 – 21:00',
    address: '線上（Zoom）',
    notes: [],
  },
  {
    id: 9,
    type: '小聚',
    status: '已結束',
    title: '作品集 Review 小聚',
    desc: '帶著你的作品集，獲得資深研究員的直接回饋。',
    date: '2025-12-05',
    time: '19:00 – 21:00',
    address: '台北市松山區（線下，報名後通知地點）',
    notes: [],
  },
  {
    id: 10,
    type: '小聚',
    status: '已結束',
    title: 'UXR x PM 跨域對談',
    desc: '研究員與 PM 的視角碰撞，探討協作中的挑戰與默契。',
    date: '2026-01-10',
    time: '19:00 – 21:00',
    address: '線上（Zoom）',
    notes: [],
  },
]

export function getActivityById(id) {
  return activities.find(a => a.id === Number(id)) ?? null
}

/** 所有即將開始的活動（實戰營、工作坊、小聚）— 供我的學習中心使用 */
export const upcomingAll = activities.filter(a => a.status !== '已結束')

/** 即將開始的工作坊與小聚 — 供課程活動頁使用 */
export const upcomingActivities = activities.filter(a => a.status !== '已結束' && (a.type === '工作坊' || a.type === '小聚'))

export const pastWorkshops  = activities.filter(a => a.status === '已結束' && a.type === '工作坊')
export const pastGatherings = activities.filter(a => a.status === '已結束' && a.type === '小聚')
