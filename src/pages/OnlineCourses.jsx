import { useState, useEffect, useRef } from 'react'
import Layout from '../components/layout/Layout'
import CourseCard from '../components/ui/CourseCard'

// 暫用 mock 資料，之後串接 Supabase
const livestreams = [
  {
    id: 2,
    title: '使用者訪談實戰示範',
    date: '2026-04-19',
    time: '10:00 – 12:00',
    status: '即將開始',
    url: '#',
  },
  {
    id: 1,
    title: 'UXR 研究方法入門：如何從零建立研究框架',
    date: '2026-04-05',
    time: '14:00 – 16:00',
    status: '報名中',
    url: '#',
  },
]

const videoCourses = [
  { id: 1,  title: 'UXR 基礎研究方法',        stage: 'R1', free: true, type: 'UI/UX職涯發展', desc: '學習 UXR 的核心研究框架，從零建立研究思維。' },
  { id: 6,  title: 'UXR 報告撰寫技巧',        stage: 'R2', free: true, type: 'UI/UX職涯發展', desc: '學習如何撰寫具說服力的研究報告與建議。' },
  { id: 11, title: '研究倫理與訪談同意書',    stage: 'R1', free: true, type: 'UI/UX職涯發展', desc: '了解 UXR 研究倫理規範，學習如何正確取得受訪者同意。' },
  { id: 12, title: '競品分析入門',            stage: 'R1', free: true, type: 'UI/UX職涯發展', desc: '系統性地拆解競品，找出市場機會與設計缺口。' },
  { id: 13, title: 'PM 入門：從需求到驗證',  stage: 'R1', free: true, type: 'PM職涯發展',   desc: '帶你了解 PM 如何定義問題、拆解需求並設計驗證方案。' },
  { id: 2, title: '使用者訪談技巧',           stage: 'R1', free: false, price: 2800, type: 'UI/UX職涯發展', desc: '深入掌握訪談規劃、引導與分析的完整流程。' },
  { id: 3, title: '問卷設計與分析',           stage: 'R2', free: false, price: 3200, type: 'UI/UX職涯發展', desc: '學習如何設計有效問卷並進行量化資料分析。' },
  { id: 4, title: 'Usability Testing 實戰',  stage: 'R3', free: false, price: 3600, type: 'UI/UX職涯發展', desc: '從規劃到執行，完整體驗易用性測試流程。' },
  { id: 5, title: '研究資料視覺化',           stage: 'R2', free: false, price: 2800, type: 'UI/UX職涯發展', desc: '將複雜研究資料轉化為清晰易懂的視覺呈現。' },
  { id: 7, title: 'PM 需求訪談與用戶研究',   stage: 'R2', free: false, price: 3200, type: 'PM職涯發展',   desc: '從 PM 視角出發，學習如何運用 UXR 方法驗證需求。' },
  { id: 8, title: '產品指標設計與分析',       stage: 'R3', free: false, price: 3600, type: 'PM職涯發展',   desc: '學習如何設定產品 KPI 並透過數據驅動決策。' },
  { id: 9, title: '服務藍圖與顧客旅程',       stage: 'R2', free: false, price: 2800, type: '服務設計系列', desc: '以系統視角繪製服務藍圖，找出關鍵接觸點。' },
  { id: 10, title: '服務設計工作坊方法論',   stage: 'R3', free: false, price: 3600, type: '服務設計系列', desc: '掌握服務設計全流程，帶領跨部門共創工作坊。' },
]

const COURSE_TYPES = ['所有課程', 'PM職涯發展', 'UI/UX職涯發展', '服務設計系列']

const statusTag = {
  background: '#EEF0FD',
  color: '#4A3FD6',
  borderRadius: '999px',
  padding: '4px 12px',
  fontSize: '12px',
  fontWeight: '500',
  display: 'inline-block',
  alignSelf: 'flex-start',
}

export default function OnlineCourses() {
  const [courseType, setCourseType] = useState('所有課程')
  const [freeSlide, setFreeSlide] = useState(0)
  const freeCourses = videoCourses.filter(c => c.free)
  const VISIBLE = 3
  const GAP = 20
  const maxSlide = freeCourses.length - VISIBLE

  // 用 ref 量出容器真實寬度，確保卡片寬度和位移量都是精確 px
  const carouselRef = useRef(null)
  const [cardW, setCardW] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (carouselRef.current) {
        const w = carouselRef.current.offsetWidth
        setCardW((w - GAP * (VISIBLE - 1)) / VISIBLE)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const paidCourses = videoCourses
    .filter(c => !c.free)
    .filter(c => courseType === '所有課程' || c.type === courseType)

  return (
    <Layout>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* 近期直播 */}
        <section style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>
            近期的直播
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {livestreams.map(live => (
              <div key={live.id} style={{
                background: '#FFFFFF',
                border: '0.5px solid #E5E5EE',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                gap: '0',
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
                    <span style={statusTag}>{live.status}</span>
                    <p style={{ fontSize: '18px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
                      {live.title}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B6B80', margin: 0 }}>
                      {live.date} &nbsp;·&nbsp; {live.time}
                    </p>
                    {live.status === '即將開始' && (
                      <Countdown targetDate={live.date} targetTime={live.time.split(' – ')[0]} />
                    )}
                  </div>
                  <a
                    href={live.url}
                    target="_blank"
                    rel="noreferrer"
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
                      alignSelf: 'flex-start',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
                    onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
                  >
                    {live.status === '報名中' ? '詳細資訊' : '前往直播'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 免費課程 */}
        <section style={{ marginBottom: '40px' }}>
          {/* Header row */}
          <div style={{ marginBottom: '12px' }}>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
              免費課程
            </p>
          </div>

          {/* Carousel wrapper — position:relative 讓箭頭可絕對定位到外側 */}
          <div style={{ position: 'relative' }}>
            {/* 左箭頭 — 超出左邊界 */}
            <button
              onClick={() => setFreeSlide(i => Math.max(0, i - 1))}
              disabled={freeSlide === 0}
              style={{
                position: 'absolute',
                left: '-48px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px', height: '36px',
                background: '#FFFFFF',
                border: '0.5px solid #E5E5EE',
                borderRadius: '999px',
                cursor: freeSlide === 0 ? 'default' : 'pointer',
                fontSize: '16px',
                color: freeSlide === 0 ? '#C5C5D8' : '#1A1A2E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'inherit',
                transition: 'color 0.15s',
                zIndex: 1,
              }}
            >‹</button>

            {/* Card track */}
            <div ref={carouselRef} style={{ overflow: 'hidden' }}>
              <div style={{
                display: 'flex',
                gap: `${GAP}px`,
                transform: `translateX(${-freeSlide * (cardW + GAP)}px)`,
                transition: 'transform 0.3s ease',
              }}>
                {freeCourses.map(course => (
                  <div key={course.id} style={{ flexShrink: 0, width: `${cardW}px`, display: 'flex' }}>
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            </div>

            {/* 右箭頭 — 超出右邊界 */}
            <button
              onClick={() => setFreeSlide(i => Math.min(maxSlide, i + 1))}
              disabled={freeSlide === maxSlide}
              style={{
                position: 'absolute',
                right: '-48px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px', height: '36px',
                background: '#FFFFFF',
                border: '0.5px solid #E5E5EE',
                borderRadius: '999px',
                cursor: freeSlide === maxSlide ? 'default' : 'pointer',
                fontSize: '16px',
                color: freeSlide === maxSlide ? '#C5C5D8' : '#1A1A2E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'inherit',
                transition: 'color 0.15s',
                zIndex: 1,
              }}
            >›</button>
          </div>
        </section>

        {/* 付費課程 */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
              付費課程
            </p>
            <select
              value={courseType}
              onChange={e => setCourseType(e.target.value)}
              style={{
                background: '#FFFFFF',
                border: '0.5px solid #C5C5D8',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '14px',
                color: '#1A1A2E',
                cursor: 'pointer',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            >
              {COURSE_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {paidCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

      </div>
    </Layout>
  )
}

// ─── Countdown ────────────────────────────────────────────────────────────────

function Countdown({ targetDate, targetTime }) {
  const getRemaining = () => {
    const target = new Date(`${targetDate}T${targetTime}:00`)
    const diff = target - new Date()
    if (diff <= 0) return null
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    }
  }

  const [remaining, setRemaining] = useState(getRemaining)

  useEffect(() => {
    const timer = setInterval(() => setRemaining(getRemaining()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!remaining) return null

  const units = [
    { label: '天', value: remaining.days },
    { label: '時', value: remaining.hours },
    { label: '分', value: remaining.minutes },
    { label: '秒', value: remaining.seconds },
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
      <span style={{ fontSize: '12px', color: '#9999AA' }}>距離直播</span>
      {units.map(u => (
        <div key={u.label} style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
          <span style={{
            fontSize: '15px',
            fontWeight: '500',
            color: '#4A3FD6',
            minWidth: '20px',
            textAlign: 'right',
          }}>
            {String(u.value).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '12px', color: '#6B6B80' }}>{u.label}</span>
        </div>
      ))}
    </div>
  )
}
