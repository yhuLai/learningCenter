import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Layout from '../components/layout/Layout'

// UXR 認證等級
const certLevels = [
  { stage: 'R1', name: '研究入門', desc: '掌握基礎訪談與觀察方法', bg: '#EEF0FD', color: '#4A3FD6' },
  { stage: 'R2', name: '研究實踐', desc: '獨立完成量化與質化研究', bg: '#E4F7EE', color: '#1D9E75' },
  { stage: 'R3', name: '研究進階', desc: '執行複雜的易用性研究',   bg: '#FEF9E7', color: '#8B7320' },
  { stage: 'R4', name: '研究專家', desc: '深度用戶旅程與策略研究', bg: '#FEF0ED', color: '#C04828' },
]

// 學習營方案
const plans = [
  {
    stage: 'R1', stageColor: '#4A3FD6', stageBg: '#EEF0FD',
    title: '品牌印象調查游擊訪談',
    price: 3600, duration: '6 週',
    featured: true, featuredLabel: '推薦起點',
    checkColor: '#1D9E75',
    features: ['每梯次 48 人，小組制','完成 30 份真實游擊訪談','學會研究目的與假設定義','掌握訪綱設計與訪談技巧','線上直播分享研究成果','導師每週 Review','結業證書'],
  },
  {
    stage: 'R2', stageColor: '#1D9E75', stageBg: '#E4F7EE',
    title: '產品滿意度與需求調查',
    price: 6400, duration: '9 週', featured: false,
    checkColor: '#1D9E75',
    features: ['每梯次 36 人，小組制','與真實需求方合作','獨立完成問卷設計與分析','學會競品分析方法','產出可交付的研究報告','導師每週 Review','結業證書'],
  },
  {
    stage: 'R3', stageColor: '#8B7320', stageBg: '#FEF9E7',
    title: '網站易用性研究',
    price: 12800, duration: '12 週', featured: false,
    checkColor: '#C04828',
    features: ['每梯次 24 人，小組制','學會啟發式評估方法','掌握 O.P.E.N 訪談法','獨立執行線上易用性測試','產出專業易用性研究報告','導師每週 Review','結業證書'],
  },
  {
    stage: 'R4', stageColor: '#C04828', stageBg: '#FEF0ED',
    title: '目標客群與用戶旅程深度研究',
    price: 28500, duration: '17 週', featured: false,
    checkColor: '#C04828',
    features: ['每梯次 16 人，小組制','掌握時間線訪談法','建構人物誌與用戶旅程地圖','進階問卷設計與行為編碼','設計思考工作坊引導實作','導師每週 Review','結業證書'],
  },
]

// 行事曆 mock 資料
const calendarEvents = [
  // R1 春季班
  { id: 1, batch: '2026春季班R1 行事曆', year: 2026, month: 4, day: 7,  weekday: '週二', title: 'R1 品牌印象調查游擊訪談：貓咖消費者印象調查（6 週線上學習營）', time: '19:30–22:00', location: '線上（Zoom / Figjam）', type: 'live' },
  { id: 2, batch: '2026春季班R1 行事曆', year: 2026, month: 4, day: 14, weekday: '週二', title: 'R1 第 2 週：研究目的與問題定義', time: '19:30–22:00', location: '線上（Zoom / Figjam）', type: 'live' },
  { id: 3, batch: '2026春季班R1 行事曆', year: 2026, month: 4, day: 21, weekday: '週二', title: 'R1 第 3 週：研究設計與訪談規劃', time: '19:30–22:00', location: '線上（Zoom / Figjam）', type: 'live' },
  { id: 4, batch: '2026春季班R1 行事曆', year: 2026, month: 5, day: 5,  weekday: '週二', title: 'R1 實體工作坊', time: '9:00–18:00', location: 'Taipei City', type: 'workshop' },
  { id: 5, batch: '2026春季班R1 行事曆', year: 2026, month: 5, day: 12, weekday: '週二', title: 'R1 第 5 週：資料分析與洞察萃取', time: '19:30–22:00', location: '線上（Zoom / Figjam）', type: 'live' },
  // R2 春季班（一般活動）
  { id: 6, batch: '2026春季班R2 行事曆', year: 2026, month: 5, day: 10, weekday: '週日', title: 'R2 第 1 週：產品滿意度研究設計', time: '14:00–17:00', location: '線上（Zoom / Figjam）', type: 'live' },
  { id: 7, batch: '2026春季班R2 行事曆', year: 2026, month: 5, day: 17, weekday: '週日', title: 'R2 第 2 週：問卷設計與量化分析', time: '14:00–17:00', location: '線上（Zoom / Figjam）', type: 'live' },
  { id: 8, batch: '2026春季班R2 行事曆', year: 2026, month: 6, day: 7,  weekday: '週日', title: 'R2 實體工作坊', time: '9:00–18:00', location: 'Taipei City', type: 'workshop' },
  // R2 春季班（特殊公告卡）
  { id: 9,  batch: '2026春季班R2 行事曆', year: 2026, month: 4, day: 15, weekday: '週三', title: 'R2 實戰營說明會',   time: '20:00–21:00', location: '線上（Zoom）', type: 'live',  special: true, specialLabel: '說明會',   specialColor: '#5B6F8A', specialBg: '#EFF3F7', showSignup: true },
  { id: 10, batch: '2026春季班R2 行事曆', year: 2026, month: 4, day: 20, weekday: '週一', title: 'R2 實戰營開放報名', time: '00:00 起',     location: '',           type: 'email', special: true, specialLabel: '開放報名', specialColor: '#5B6F8A', specialBg: '#EFF3F7', showSignup: true },
  { id: 11, batch: '2026春季班R2 行事曆', year: 2026, month: 4, day: 30, weekday: '週四', title: 'R2 實戰營報名截止', time: '23:59 截止',   location: '',           type: 'email', special: true, specialLabel: '報名截止', specialColor: '#C04828', specialBg: '#FEF0ED', showSignup: false },
]

const batches = ['2026春季班R1 行事曆', '2026春季班R2 行事曆', '2026秋季班R1 行事曆']
const batchStatus = { '2026春季班R1 行事曆': '報名已截止', '2026春季班R2 行事曆': '報名中', '2026秋季班R1 行事曆': '即將開放' }

const typeColor = { workshop: '#6B4FD6', live: '#2D9CDB', video: '#F0A500', email: '#1D9E75' }
const WEEKDAYS  = ['日', '一', '二', '三', '四', '五', '六']
const legendItems = [['實體工作坊', 'workshop'], ['直播', 'live'], ['影片課程', 'video'], ['email', 'email']]

export default function BootCamp() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2))
  const [calLevel, setCalLevel]         = useState('R1')
  const [selectedBatch, setSelectedBatch] = useState(batches[0])
  const [doneOpen, setDoneOpen]         = useState(true)
  const [undoneOpen, setUndoneOpen]     = useState(true)
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (!el) return
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }, [hash])

  const year  = currentMonth.getFullYear()
  const month = currentMonth.getMonth() + 1

  const daysInMonth  = new Date(year, month, 0).getDate()
  const firstWeekday = new Date(year, month - 1, 1).getDay()

  const calDays = []
  for (let i = 0; i < firstWeekday; i++) calDays.push(null)
  for (let d = 1; d <= daysInMonth; d++) calDays.push(d)

  // 依選擇的班次過濾
  const batchEvents = calendarEvents.filter(e => e.batch === selectedBatch)

  const monthEvents = batchEvents.filter(e => e.year === year && e.month === month)

  const eventDayMap = {}
  monthEvents.forEach(e => {
    if (!eventDayMap[e.day]) eventDayMap[e.day] = []
    eventDayMap[e.day].push(e.type)
  })

  const today = new Date()
  const isToday = (d) =>
    d === today.getDate() &&
    year  === today.getFullYear() &&
    month === today.getMonth() + 1

  // 依月份分組（已依班次過濾）
  const groupedByMonth = batchEvents.reduce((acc, e) => {
    const key = e.month
    if (!acc[key]) acc[key] = []
    acc[key].push(e)
    return acc
  }, {})

  return (
    <Layout>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* UXR 認證等級 */}
        <section style={{ marginBottom: '40px' }}>
          <p style={sectionLabel}>UXR 認證等級</p>
          <div style={{
            ...card,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            padding: '24px 32px',
          }}>
            {/* 左側：等級資訊 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* 等級 icon */}
              <div style={{
                width: '56px', height: '56px',
                background: '#EEF0FD',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 3L17.5 10.5L26 11.5L20 17.5L21.5 26L14 22L6.5 26L8 17.5L2 11.5L10.5 10.5L14 3Z"
                    fill="#4A3FD6" fillOpacity="0.15" stroke="#4A3FD6" strokeWidth="1.5"
                    strokeLinejoin="round" />
                </svg>
              </div>
              {/* 文字 */}
              <div>
                <p style={{ fontSize: '11px', color: '#9999AA', fontWeight: '500', margin: '0 0 4px', letterSpacing: '0.5px' }}>
                  目前等級
                </p>
                <p style={{ fontSize: '18px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 4px' }}>
                  初階市場研究員認證
                </p>
                <p style={{ fontSize: '13px', color: '#6B6B80', margin: 0 }}>
                  具備基礎市場研究的規劃與執行能力
                </p>
              </div>
            </div>

            {/* 右側：R0–R4 進度圈 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0', flexShrink: 0 }}>
              {['R0', 'R1', 'R2', 'R3', 'R4'].map((stage, idx) => {
                const lit = idx <= 3   // R0 R1 R2 R3 點亮
                return (
                  <div key={stage} style={{ display: 'flex', alignItems: 'center' }}>
                    {/* 連線（第一個左邊不畫） */}
                    {idx > 0 && (
                      <div style={{
                        width: '40px', height: '2px',
                        background: idx <= 3 ? '#4A3FD6' : '#E5E5EE',
                      }} />
                    )}
                    {/* 圓圈 */}
                    <div style={{
                      width: '52px', height: '52px',
                      borderRadius: '999px',
                      background: lit ? '#4A3FD6' : '#F7F7F8',
                      border: lit ? 'none' : '0.5px solid #E5E5EE',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      gap: '1px',
                    }}>
                      <span style={{
                        fontSize: '13px', fontWeight: '500',
                        color: lit ? '#FFFFFF' : '#9999AA',
                        lineHeight: 1,
                      }}>
                        {stage}
                      </span>
                      {lit && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>


        {/* 進行中的營隊 */}
        <section style={{ marginBottom: '40px' }}>
          <p style={{ ...sectionLabel }}>進行中的營隊</p>

          {/* 2026春季班R1 card */}
          <div style={{ ...card, padding: '20px', display: 'flex', gap: '24px' }}>

            {/* 左側內容 */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 20px' }}>
                2026春季班R1
              </p>

              {/* 即將開始的課程 */}
              <p style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>即將開始的課程</p>
              <div style={{
                border: '0.5px solid #E5E5EE',
                borderRadius: '10px',
                padding: '14px 16px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
                  <span style={{
                    background: '#EEF0FD', color: '#4A3FD6',
                    borderRadius: '999px', padding: '3px 10px',
                    fontSize: '12px', fontWeight: '500',
                    display: 'inline-block', alignSelf: 'flex-start',
                  }}>
                    即將開始
                  </span>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
                    R1 第 2 週：研究目的與問題定義
                  </p>
                  <p style={{ fontSize: '12px', color: '#6B6B80', margin: 0 }}>
                    2026-04-14 &nbsp;·&nbsp; 19:30 – 22:00
                  </p>
                </div>
                <button
                  disabled
                  style={{
                    flexShrink: 0,
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '500',
                    border: '0.5px solid #C5C5D8',
                    background: '#F7F7F8',
                    color: '#9999AA',
                    cursor: 'not-allowed',
                    whiteSpace: 'nowrap',
                    fontFamily: 'inherit',
                  }}
                >
                  加入直播
                </button>
              </div>

              {/* 營隊進度 */}
              <p style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 10px' }}>營隊進度</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', color: '#6B6B80' }}>已完成課程</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#4A3FD6' }}>1 / 5 堂</span>
              </div>
              <div style={{ height: '4px', background: '#E5E5EE', borderRadius: '999px', overflow: 'hidden', marginBottom: '16px' }}>
                <div style={{ height: '100%', width: '20%', background: '#4A3FD6', borderRadius: '999px' }} />
              </div>

              {/* 已完成 */}
              <button
                onClick={() => setDoneOpen(o => !o)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'none', border: 'none', padding: '6px 0', cursor: 'pointer',
                  marginBottom: '6px', fontFamily: 'inherit',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A2E' }}>已完成（1）</span>
                <span style={{ fontSize: '12px', color: '#9999AA' }}>{doneOpen ? '▼' : '▲'}</span>
              </button>
              {doneOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
                  {[{ title: 'R1 品牌印象調查游擊訪談：貓咖消費者印象調查', date: '2026-04-07' }].map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '8px 10px', background: '#F7F7F8', borderRadius: '8px',
                    }}>
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '999px', flexShrink: 0,
                        background: '#4A3FD6',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4.5 7.5L8.5 3" stroke="white" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        <p style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A2E', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                          {item.title}
                        </p>
                        <p style={{ fontSize: '12px', color: '#9999AA', margin: 0, flexShrink: 0 }}>{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 尚未開始 */}
              <button
                onClick={() => setUndoneOpen(o => !o)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'none', border: 'none', padding: '6px 0', cursor: 'pointer',
                  marginBottom: '6px', fontFamily: 'inherit',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A2E' }}>尚未開始（4）</span>
                <span style={{ fontSize: '12px', color: '#9999AA' }}>{undoneOpen ? '▼' : '▲'}</span>
              </button>
              {undoneOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { title: 'R1 第 2 週：研究目的與問題定義', date: '2026-04-14' },
                    { title: 'R1 第 3 週：研究設計與訪談規劃', date: '2026-04-21' },
                    { title: 'R1 實體工作坊',                 date: '2026-05-05' },
                    { title: 'R1 第 5 週：資料分析與洞察萃取', date: '2026-05-12' },
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '8px 10px', background: '#F7F7F8', borderRadius: '8px',
                    }}>
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '999px', flexShrink: 0,
                        border: '1.5px solid #C5C5D8',
                      }} />
                      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        <p style={{ fontSize: '13px', fontWeight: '500', color: '#6B6B80', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                          {item.title}
                        </p>
                        <p style={{ fontSize: '12px', color: '#9999AA', margin: 0, flexShrink: 0 }}>{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 右側：封面圖片（橫式）+ 按鈕 */}
            <div style={{
              width: '33%', flexShrink: 0,
              display: 'flex', flexDirection: 'column', gap: '12px',
            }}>
              <div style={{
                width: '100%',
                aspectRatio: '16 / 9',
                background: '#F7F7F8',
                border: '0.5px solid #E5E5EE',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '12px', color: '#9999AA' }}>封面圖片</span>
              </div>
              <a
                href="#"
                style={{
                  display: 'block', textAlign: 'center',
                  background: '#4A3FD6', color: '#FFFFFF',
                  padding: '10px', borderRadius: '8px',
                  fontSize: '14px', fontWeight: '500',
                  textDecoration: 'none', transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
                onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
              >
                前往觀看
              </a>
            </div>
          </div>
        </section>

        {/* 參與過的營隊 */}
        <section style={{ marginBottom: '40px' }}>
          <p style={{ ...sectionLabel }}>參與過的營隊</p>
          <div style={{
            background: '#FFFFFF',
            border: '0.5px solid #E5E5EE',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}>
            {/* 封面圖片 */}
            <div style={{
              width: '160px',
              flexShrink: 0,
              alignSelf: 'stretch',
              background: '#F7F7F8',
              borderRight: '0.5px solid #E5E5EE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: '12px', color: '#9999AA' }}>封面圖片</span>
            </div>

            {/* 內容區 */}
            <div style={{
              flex: 1,
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{
                  background: '#F7F7F8',
                  color: '#6B6B80',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  display: 'inline-block',
                  alignSelf: 'flex-start',
                }}>
                  R0
                </span>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
                  Re:從零開始學UX之旅 — 21天行動計劃
                </p>
              </div>
              <a
                href="#"
                style={{
                  display: 'inline-block',
                  background: '#4A3FD6',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.15s ease',
                  flexShrink: 0,
                  alignSelf: 'center',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
                onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
              >
                觀看回放
              </a>
            </div>
          </div>
        </section>

        {/* 實戰營行事曆 */}
        <section>
          <p style={sectionLabel}>實戰營行事曆</p>

          {/* 深色班次列：跨全寬 */}
          <div style={{
            background: '#1A1A2E',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}>
            <select
              value={selectedBatch}
              onChange={e => setSelectedBatch(e.target.value)}
              style={{
                background: 'transparent',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            >
              {batches.map(b => <option key={b} value={b} style={{ background: '#1A1A2E' }}>{b}</option>)}
            </select>
            <span style={{
              background: 'rgba(255,255,255,0.15)',
              color: '#FFFFFF',
              borderRadius: '999px',
              padding: '3px 10px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              marginLeft: '12px',
            }}>
              {batchStatus[selectedBatch]}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '16px', alignItems: 'start' }}>

            {/* 迷你日曆 */}
            <div style={card}>
              {/* 月份導覽 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <button onClick={() => setCurrentMonth(new Date(year, month - 2))} style={calNavBtn}>‹</button>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A2E' }}>{year} 年 {month} 月</span>
                <button onClick={() => setCurrentMonth(new Date(year, month))} style={calNavBtn}>›</button>
              </div>

              {/* 星期標頭 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '4px' }}>
                {WEEKDAYS.map(d => (
                  <div key={d} style={{ textAlign: 'center', fontSize: '11px', color: '#9999AA', padding: '2px 0' }}>{d}</div>
                ))}
              </div>

              {/* 日期格子 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
                {calDays.map((day, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1px 0' }}>
                    {day && (
                      <>
                        <span style={{
                          width: '24px', height: '24px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          borderRadius: '999px', fontSize: '12px',
                          background: isToday(day) ? '#1A1A2E' : 'transparent',
                          color: isToday(day) ? '#FFFFFF' : '#1A1A2E',
                          fontWeight: isToday(day) ? '500' : '400',
                        }}>
                          {day}
                        </span>
                        {eventDayMap[day] && (
                          <div style={{ display: 'flex', gap: '2px', marginTop: '1px' }}>
                            {eventDayMap[day].map((type, i) => (
                              <span key={i} style={{ width: '4px', height: '4px', borderRadius: '999px', background: typeColor[type] }} />
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* 圖例 2x2 */}
              <div style={{ borderTop: '0.5px solid #E5E5EE', marginTop: '12px', paddingTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {legendItems.map(([label, type]) => (
                  <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '999px', background: typeColor[type], flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: '#6B6B80' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 右側：事件列表 */}
            <div>
              {/* 事件依月份分組 */}
              {Object.entries(groupedByMonth)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([m, events], groupIdx) => (
                  <div key={m} style={{ marginBottom: '24px' }}>
                    {/* 月份標題 + Google 行事曆連結（第一個月份才顯示連結） */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <p style={{ fontSize: '18px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>{m}月</p>
                      {groupIdx === 0 && (
                        <a href="#" style={{ fontSize: '13px', color: '#4A3FD6', textDecoration: 'none' }}>
                          加入我的Google行事曆
                        </a>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {events.map(event => event.special ? (
                        /* 特殊公告卡：填色 + 框線 */
                        <div key={event.id} style={{
                          background: event.specialBg,
                          border: `0.5px solid ${event.specialColor}`,
                          borderLeft: `3px solid ${event.specialColor}`,
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'stretch',
                          overflow: 'hidden',
                        }}>
                          {/* 左側日期欄 */}
                          <div style={{ width: '64px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '14px 8px', borderRight: `0.5px solid ${event.specialColor}40` }}>
                            <span style={{ fontSize: '16px', fontWeight: '500', color: '#1A1A2E', lineHeight: 1 }}>{event.month}/{event.day}</span>
                            <span style={{ fontSize: '12px', color: '#9999AA', marginTop: '4px' }}>{event.weekday}</span>
                          </div>
                          {/* 右側 */}
                          <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {/* 標題列 */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                              <div>
                                <span style={{ fontSize: '11px', fontWeight: '500', color: event.specialColor, marginBottom: '4px', display: 'block' }}>{event.specialLabel}</span>
                                <p style={{ fontSize: '14px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>{event.title}</p>
                              </div>
                              {event.showSignup && (
                                <Link to="#" style={{ fontSize: '13px', color: '#4A3FD6', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                                  前往報名
                                </Link>
                              )}
                            </div>
                            {/* 時間 & 地點（icon + 文字，同課程 card） */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {event.time && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                                    <circle cx="7" cy="7" r="6" stroke="#9999AA" strokeWidth="1"/>
                                    <path d="M7 4v3l2 1.5" stroke="#9999AA" strokeWidth="1" strokeLinecap="round"/>
                                  </svg>
                                  <span style={{ fontSize: '13px', color: '#6B6B80' }}>{event.time}</span>
                                </div>
                              )}
                              {event.location && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                                    <path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#9999AA" strokeWidth="1" fill="none"/>
                                    <circle cx="7" cy="5" r="1.2" stroke="#9999AA" strokeWidth="1"/>
                                  </svg>
                                  <span style={{ fontSize: '13px', color: '#6B6B80' }}>{event.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div key={event.id} style={{
                          background: '#FFFFFF',
                          border: '0.5px solid #E5E5EE',
                          borderLeft: `3px solid ${typeColor[event.type]}`,
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'stretch',
                          overflow: 'hidden',
                        }}>
                          {/* 左側日期欄 */}
                          <div style={{
                            width: '64px',
                            flexShrink: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '16px 8px',
                            borderRight: '0.5px solid #E5E5EE',
                          }}>
                            <span style={{ fontSize: '18px', fontWeight: '500', color: '#1A1A2E', lineHeight: 1 }}>
                              {event.month}/{event.day}
                            </span>
                            <span style={{ fontSize: '12px', color: '#9999AA', marginTop: '4px' }}>{event.weekday}</span>
                          </div>

                          {/* 右側內容 */}
                          <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {/* 標題列：標題 + 課程詳情（右上角） */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                              <p style={{ fontSize: '14px', fontWeight: '500', color: '#1A1A2E', margin: 0, lineHeight: 1.5 }}>
                                {event.title}
                              </p>
                              <Link to="#" style={{ fontSize: '13px', color: '#4A3FD6', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                                課程詳情
                              </Link>
                            </div>
                            {/* 時間 & 地點 */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                                  <circle cx="7" cy="7" r="6" stroke="#9999AA" strokeWidth="1"/>
                                  <path d="M7 4v3l2 1.5" stroke="#9999AA" strokeWidth="1" strokeLinecap="round"/>
                                </svg>
                                <span style={{ fontSize: '13px', color: '#6B6B80' }}>{event.time}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                                  <path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#9999AA" strokeWidth="1" fill="none"/>
                                  <circle cx="7" cy="5" r="1.2" stroke="#9999AA" strokeWidth="1"/>
                                </svg>
                                <span style={{ fontSize: '13px', color: '#6B6B80' }}>{event.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                ))
              }
            </div>

          </div>
        </section>

      </div>
    </Layout>
  )
}

function PlanCard({ plan }) {
  return (
    <div style={{
      background: '#FFFFFF',
      border: plan.featured ? '2px solid #1D9E75' : '0.5px solid #E5E5EE',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {plan.featured && (
        <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
          <span style={{ background: '#1D9E75', color: '#FFFFFF', borderRadius: '999px', padding: '4px 14px', fontSize: '12px', fontWeight: '500' }}>
            {plan.featuredLabel}
          </span>
        </div>
      )}

      <span style={{ display: 'inline-block', background: plan.stageBg, color: plan.stageColor, borderRadius: '6px', padding: '2px 8px', fontSize: '12px', fontWeight: '500', marginBottom: '10px', alignSelf: 'flex-start' }}>
        {plan.stage}
      </span>

      <p style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 16px', lineHeight: '1.4' }}>
        {plan.title}
      </p>

      <p style={{ fontSize: '22px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 2px' }}>
        NT${plan.price.toLocaleString()}
      </p>
      <p style={{ fontSize: '13px', color: '#6B6B80', margin: '0 0 16px' }}>{plan.duration}</p>

      <div style={{ borderTop: '0.5px solid #E5E5EE', marginBottom: '16px' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', flex: 1 }}>
        {plan.features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
              <circle cx="8" cy="8" r="7" stroke={plan.checkColor} strokeWidth="1" fill="none" />
              <path d="M5 8L7 10L11 6" stroke={plan.checkColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: '13px', color: '#1A1A2E', lineHeight: '1.5' }}>{f}</span>
          </div>
        ))}
      </div>

      {plan.featured ? (
        <button
          style={{ ...primaryBtn, width: '100%' }}
          onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
          onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
        >
          立即報名
        </button>
      ) : (
        <button
          style={{ ...outlineBtn, width: '100%' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#F7F7F8' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF' }}
        >
          查看詳情
        </button>
      )}
    </div>
  )
}

// ─── shared styles ───────────────────────────────────────────────────────────

const sectionLabel = { fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }

const card = {
  background: '#FFFFFF',
  border: '0.5px solid #E5E5EE',
  borderRadius: '12px',
  padding: '16px',
}

const primaryBtn = {
  background: '#4A3FD6',
  color: '#FFFFFF',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'background 0.15s ease',
}

const outlineBtn = {
  background: '#FFFFFF',
  color: '#1A1A2E',
  border: '1.5px solid #C5C5D8',
  padding: '10px 20px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'background 0.15s ease',
}

const calNavBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px 8px',
  fontSize: '16px',
  color: '#6B6B80',
  borderRadius: '4px',
  fontFamily: 'inherit',
}
