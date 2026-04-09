import { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import CourseCard from '../components/ui/CourseCard'
import { freeCourses, paidCourses as allPaidCourses } from '../data/courses'

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

  const paidCourses = allPaidCourses
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

        {/* 影片課程：原付費課程 grid + 下拉選單 */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
              影片課程
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
              <CourseCard key={course.id} course={{ ...course, ctaLabel: '前往觀看', hidePrice: true, linkTo: `/video/${course.id}` }} />
            ))}
          </div>
        </section>

        {/* 直播回放 */}
        <section>
          <div style={{ marginBottom: '12px' }}>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
              直播回放
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {freeCourses.map(course => (
              <CourseCard key={course.id} course={{ ...course, ctaLabel: '前往觀看', hideTags: true, hidePrice: true, linkTo: `/video/${course.id}` }} />
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
