import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { activities } from '../data/activities'

const upcomingBootcamp = activities.filter(a => a.status !== '已結束' && a.type === '實戰營')

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


export default function BootCamp() {
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
              {upcomingBootcamp.length > 0 && (
                <>
                  <p style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>即將開始的課程</p>
                  {upcomingBootcamp.map(item => (
                    <div key={item.id} style={{
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
                          borderRadius: '6px', padding: '3px 10px',
                          fontSize: '12px', fontWeight: '500',
                          display: 'inline-block', alignSelf: 'flex-start',
                        }}>
                          {item.status}
                        </span>
                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
                          {item.title}
                        </p>
                        <p style={{ fontSize: '12px', color: '#6B6B80', margin: 0 }}>
                          {item.date} &nbsp;·&nbsp; {item.time}
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
                  ))}
                </>
              )}

              {/* 營隊進度 */}
              <p style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 10px' }}>營隊進度</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', color: '#6B6B80' }}>已完成課程</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#4A3FD6' }}>2 / 5 堂</span>
              </div>
              <div style={{ height: '4px', background: '#E5E5EE', borderRadius: '999px', overflow: 'hidden', marginBottom: '16px' }}>
                <div style={{ height: '100%', width: '40%', background: '#4A3FD6', borderRadius: '999px' }} />
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
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A2E' }}>已完成（2）</span>
                <span style={{ fontSize: '12px', color: '#9999AA' }}>{doneOpen ? '▼' : '▲'}</span>
              </button>
              {doneOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
                  {[
                    { title: 'R1 品牌印象調查游擊訪談：貓咖消費者印象調查', date: '2026-04-07', type: '直播課程' },
                    { title: 'R1 第 2 週：研究目的與問題定義', date: '2026-04-14', type: '線上教材' },
                  ].map((item, idx) => (
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                          <span style={{ ...courseTypeTag, ...courseTypeColors[item.type] }}>{item.type}</span>
                          <p style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A2E', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                            {item.title}
                          </p>
                        </div>
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
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A2E' }}>尚未開始（3）</span>
                <span style={{ fontSize: '12px', color: '#9999AA' }}>{undoneOpen ? '▼' : '▲'}</span>
              </button>
              {undoneOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { title: 'R1 第 3 週：研究設計與訪談規劃', date: '2026-04-21', type: '直播課程' },
                    { title: 'R1 實體工作坊',                 date: '2026-05-05', type: '實體活動' },
                    { title: 'R1 第 5 週：資料分析與洞察萃取', date: '2026-05-12', type: 'Email教材' },
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                          <span style={{ ...courseTypeTag, ...courseTypeColors[item.type] }}>{item.type}</span>
                          <p style={{ fontSize: '13px', fontWeight: '500', color: '#6B6B80', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                            {item.title}
                          </p>
                        </div>
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
              <Link
                to="/video/101"
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
              </Link>
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
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{
                    background: '#F7F7F8',
                    color: '#6B6B80',
                    borderRadius: '6px',
                    padding: '3px 10px',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}>
                    R0
                  </span>
                  <span style={{
                    background: '#FEF9E7',
                    color: '#8B7320',
                    borderRadius: '6px',
                    padding: '3px 10px',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}>
                    觀看截止日期：6/30
                  </span>
                </div>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
                  Re:從零開始學UX之旅 — 21天行動計劃
                </p>
              </div>
              <Link
                to="/video/102"
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
              </Link>
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
          <span style={{ background: '#1D9E75', color: '#FFFFFF', borderRadius: '6px', padding: '4px 14px', fontSize: '12px', fontWeight: '500' }}>
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

const courseTypeTag = {
  fontSize: '11px', fontWeight: '500', borderRadius: '4px',
  padding: '2px 6px', whiteSpace: 'nowrap', flexShrink: 0,
}
const courseTypeColors = {
  '直播課程': { background: '#EEF0FD', color: '#4A3FD6' },
  '實體活動': { background: '#E4F7EE', color: '#0F6E56' },
  '線上教材': { background: '#FEF9E7', color: '#8B7320' },
  'Email教材': { background: '#F7F7F8', color: '#6B6B80' },
}

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
