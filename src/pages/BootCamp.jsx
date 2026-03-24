import { useState } from 'react'
import { Link } from 'react-router-dom'
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
  { id: 1, year: 2026, month: 3, day: 25, weekday: '週三', title: 'UX Writing：認知與閱讀動線的科學（3hr）', time: '19:30–22:30', location: '線上活動', status: '報名中', type: 'online' },
  { id: 2, year: 2026, month: 3, day: 28, weekday: '週六', title: '目標客群用戶訪談一日實戰工作坊：深度了解目標用戶需求情境，萃取真正的痛點，成為商業決策的偵察兵', time: '10:00–18:00', location: 'Taipei City', status: '報名中', type: 'workshop' },
]

const typeColor = { online: '#4A3FD6', workshop: '#F0A500', uxr: '#1D9E75' }
const typeBg    = { online: '#EEF0FD', workshop: '#FEF9E7', uxr: '#E4F7EE' }
const WEEKDAYS  = ['日', '一', '二', '三', '四', '五', '六']

export default function BootCamp() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2))

  const year  = currentMonth.getFullYear()
  const month = currentMonth.getMonth() + 1

  const daysInMonth  = new Date(year, month, 0).getDate()
  const firstWeekday = new Date(year, month - 1, 1).getDay()

  const calDays = []
  for (let i = 0; i < firstWeekday; i++) calDays.push(null)
  for (let d = 1; d <= daysInMonth; d++) calDays.push(d)

  const monthEvents = calendarEvents.filter(e => e.year === year && e.month === month)

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

  const upcomingEvents = calendarEvents
    .filter(e => new Date(e.year, e.month - 1, e.day) >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
    .sort((a, b) => new Date(a.year, a.month - 1, a.day) - new Date(b.year, b.month - 1, b.day))
    .slice(0, 3)

  return (
    <Layout>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* UXR 認證等級 */}
        <section style={{ marginBottom: '40px' }}>
          <p style={sectionLabel}>UXR 認證等級</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {certLevels.map(level => (
              <div key={level.stage} style={card}>
                <span style={{ display: 'inline-block', background: level.bg, color: level.color, borderRadius: '6px', padding: '2px 8px', fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>
                  {level.stage}
                </span>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 4px' }}>{level.name}</p>
                <p style={{ fontSize: '13px', color: '#6B6B80', margin: 0 }}>{level.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 學習營方案 */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <p style={{ fontSize: '28px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 8px' }}>選擇適合你的學習方案</p>
            <p style={{ fontSize: '14px', color: '#6B6B80', margin: 0 }}>
              四個階段、四種研究方法，從入門到進階依序解鎖。每階段都有真實專案，結業即有作品集。
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', paddingTop: '16px' }}>
            {plans.map(plan => <PlanCard key={plan.stage} plan={plan} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="#" style={{ fontSize: '13px', color: '#4A3FD6', textDecoration: 'none' }}>了解認證規則 →</Link>
          </div>
        </section>

        {/* 學習營行事曆 */}
        <section>
          <p style={sectionLabel}>學習營行事曆</p>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '16px', alignItems: 'start' }}>

            {/* 迷你日曆 */}
            <div style={card}>
              {/* 月份導覽 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <button
                  onClick={() => setCurrentMonth(new Date(year, month - 2))}
                  style={calNavBtn}
                >‹</button>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A2E' }}>
                  {year} 年 {month} 月
                </span>
                <button
                  onClick={() => setCurrentMonth(new Date(year, month))}
                  style={calNavBtn}
                >›</button>
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
                          borderRadius: '999px',
                          fontSize: '12px',
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

              {/* 圖例 */}
              <div style={{ borderTop: '0.5px solid #E5E5EE', marginTop: '12px', paddingTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {[['線上', 'online'], ['工作坊', 'workshop'], ['UXR 營', 'uxr']].map(([label, type]) => (
                  <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '999px', background: typeColor[type] }} />
                    <span style={{ fontSize: '11px', color: '#6B6B80' }}>{label}</span>
                  </div>
                ))}
              </div>

              {/* 近期活動小列表 */}
              {upcomingEvents.length > 0 && (
                <div style={{ borderTop: '0.5px solid #E5E5EE', marginTop: '12px', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {upcomingEvents.map(e => (
                    <div key={e.id}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '999px', background: typeColor[e.type], flexShrink: 0 }} />
                        <span style={{ fontSize: '11px', color: '#6B6B80' }}>{e.month}/{e.day}（{e.weekday}）</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#1A1A2E', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {e.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 右側活動列表 */}
            <div style={{ background: '#FFFFFF', border: '0.5px solid #E5E5EE', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ background: '#1A1A2E', padding: '14px 20px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#FFFFFF' }}>{year} 年 {month} 月</span>
              </div>
              {monthEvents.length === 0 ? (
                <p style={{ padding: '32px', textAlign: 'center', color: '#9999AA', fontSize: '14px' }}>本月暫無活動</p>
              ) : (
                monthEvents.map((event, idx) => (
                  <div key={event.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '72px 1fr',
                    borderBottom: idx < monthEvents.length - 1 ? '0.5px solid #E5E5EE' : 'none',
                  }}>
                    {/* 日期欄 */}
                    <div style={{ padding: '20px 12px', borderRight: '0.5px solid #E5E5EE', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                      <span style={{ fontSize: '18px', fontWeight: '500', color: '#1A1A2E' }}>{event.month}/{event.day}</span>
                      <span style={{ fontSize: '12px', color: '#6B6B80' }}>{event.weekday}</span>
                    </div>
                    {/* 活動內容 */}
                    <div style={{ padding: '16px 20px', borderLeft: `3px solid ${typeColor[event.type]}`, background: typeBg[event.type] }}>
                      <span style={{ display: 'inline-block', background: '#E4F7EE', color: '#0F6E56', borderRadius: '999px', padding: '2px 10px', fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>
                        {event.status}
                      </span>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 6px', lineHeight: '1.5' }}>
                        {event.title}
                      </p>
                      <p style={{ fontSize: '13px', color: '#6B6B80', margin: '0 0 4px' }}>{event.time}</p>
                      <p style={{ fontSize: '13px', color: '#6B6B80', margin: '0 0 8px' }}>📍 {event.location}</p>
                      <Link to="#" style={{ fontSize: '13px', color: '#4A3FD6', textDecoration: 'none' }}>課程詳情 ↗</Link>
                    </div>
                  </div>
                ))
              )}
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
          style={{ ...primaryBtn, width: '100%', marginBottom: '8px' }}
          onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
          onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
        >
          立即報名
        </button>
      ) : (
        <button
          style={{ ...outlineBtn, width: '100%', marginBottom: '8px' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#F7F7F8' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF' }}
        >
          查看詳情
        </button>
      )}
      <Link
        to={`/courses/${plan.stage.toLowerCase()}`}
        style={{ fontSize: '13px', color: '#4A3FD6', textDecoration: 'none', textAlign: 'center', display: 'block' }}
      >
        查看課程詳情 →
      </Link>
    </div>
  )
}

// ─── shared styles ───────────────────────────────────────────────────────────

const sectionLabel = { fontSize: '13px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }

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
