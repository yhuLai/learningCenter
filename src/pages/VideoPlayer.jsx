import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCourseById } from '../data/courses'

export default function VideoPlayer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = getCourseById(id)

  const [activeView, setActiveView] = useState('overview')

  if (!course) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#6B6B80' }}>
        找不到課程。
        <button onClick={() => navigate('/online-courses')} style={{ marginLeft: '8px', color: '#4A3FD6', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
          返回線上課程
        </button>
      </div>
    )
  }

  const currentChapter = activeView !== 'overview'
    ? course.chapters.find(c => c.id === activeView)
    : null

  // ── 章節完成狀態計算 ────────────────────────────────────────────────────────
  const totalChapters    = course.chapters.length
  const completedCount   = Math.floor((course.progress / 100) * totalChapters)
  const inProgressIdx    = course.progress < 100 ? completedCount : -1   // 進行中章節的 index（0-based）

  const chapterStatus = (idx) => {
    if (idx < completedCount) return 'done'
    if (idx === inProgressIdx) return 'inProgress'
    return 'notStarted'
  }

  // ── Sidebar ──────────────────────────────────────────────────────────────────
  const sidebarItemStyle = (key) => ({
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: activeView === key ? '500' : '400',
    color: activeView === key ? '#1A1A2E' : '#6B6B80',
    background: activeView === key ? '#F7F7F8' : 'transparent',
    borderLeft: activeView === key ? '2px solid #4A3FD6' : '2px solid transparent',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    lineHeight: 1.5,
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F7F8' }}>

      {/* ── 左側 sidebar 佔位 ── */}
      <div style={{ width: '220px', flexShrink: 0 }} />

      {/* ── 左側 sidebar ── */}
      <aside style={{
          width: '220px',
          height: '100vh',
          background: '#FFFFFF',
          borderRight: '0.5px solid #E5E5EE',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          overflow: 'hidden',
        }}>
          {/* 返回 + 課程名稱 */}
          <div style={{ padding: '20px 20px 16px', borderBottom: '0.5px solid #E5E5EE' }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 0, fontSize: '12px', color: '#9999AA', fontFamily: 'inherit',
                marginBottom: '10px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="#9999AA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              返回
            </button>
            <p style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A2E', margin: 0, lineHeight: 1.5 }}>
              {course.title}
            </p>
            {/* 進度條 */}
            <div style={{ marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', color: '#9999AA' }}>學習進度</span>
                <span style={{ fontSize: '11px', color: '#4A3FD6', fontWeight: '500' }}>{course.progress}%</span>
              </div>
              <div style={{ height: '3px', background: '#E5E5EE', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${course.progress}%`, background: '#4A3FD6', borderRadius: '999px' }} />
              </div>
            </div>
          </div>

          {/* 導航項目 */}
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '8px', overflowY: 'auto' }}>
            {/* 課程總覽 */}
            <button style={sidebarItemStyle('overview')} onClick={() => setActiveView('overview')}>
              課程總覽
            </button>

            {/* 分隔線 */}
            <div style={{ height: '0.5px', background: '#E5E5EE', margin: '8px 0' }} />

            {/* 章節列表 */}
            {course.chapters.map((ch, idx) => {
              const status = chapterStatus(idx)
              return (
                <button
                  key={ch.id}
                  style={{ ...sidebarItemStyle(ch.id), display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}
                  onClick={() => setActiveView(ch.id)}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: '11px', color: '#9999AA', marginBottom: '2px' }}>
                      {ch.label}
                    </span>
                    {ch.title}
                  </div>
                  {status === 'done' && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="7" cy="7" r="6.25" fill="#EEF0FD" />
                      <path d="M4 7l2 2 4-4" stroke="#4A3FD6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              )
            })}
          </nav>
        </aside>

      {/* ── 固定頂部路徑導覽列 ── */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: '220px',
        right: 0,
        height: '48px',
        background: '#FFFFFF',
        borderBottom: '0.5px solid #E5E5EE',
        display: 'flex',
        alignItems: 'center',
        padding: '0 48px',
        gap: '6px',
        fontSize: '13px',
        color: '#9999AA',
        zIndex: 10,
      }}>
        <span
          onClick={() => setActiveView('overview')}
          style={{ cursor: 'pointer', color: '#6B6B80' }}
        >
          {course.title}
        </span>
        <span>/</span>
        <span style={{ color: '#1A1A2E', fontWeight: '500' }}>
          {activeView === 'overview'
            ? '課程總覽'
            : currentChapter ? `${currentChapter.label}：${currentChapter.title}` : ''
          }
        </span>
      </div>

      {/* ── 主內容區 ── */}
      <main style={{ flex: 1, minHeight: '100vh', padding: '88px 48px 48px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {activeView === 'overview'
            ? <OverviewView course={course} onStartChapter={() => setActiveView(course.chapters[0].id)} />
            : <ChapterView course={course} chapter={currentChapter} />
          }
        </div>
      </main>
    </div>
  )
}

// ── 課程總覽 ──────────────────────────────────────────────────────────────────

function OverviewView({ course, onStartChapter }) {
  const infoTag = {
    background: '#F7F7F8',
    border: '0.5px solid #E5E5EE',
    borderRadius: '8px',
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  }

  return (
    <>
      {/* 課程封面 */}
      <div style={{
        width: '100%', aspectRatio: '16 / 9',
        background: '#1A1A2E', borderRadius: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '32px',
      }}>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>課程封面圖片</span>
      </div>

      {/* 標題列 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
            <span style={{ background: '#FEF9E7', color: '#8B7320', borderRadius: '6px', padding: '2px 8px', fontSize: '12px', fontWeight: '500' }}>
              {course.stage}
            </span>
            <span style={{ background: '#F7F7F8', color: '#6B6B80', borderRadius: '6px', padding: '2px 8px', fontSize: '12px', fontWeight: '500' }}>
              {course.type}
            </span>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
            {course.title}
          </h1>
        </div>
        <button
          onClick={onStartChapter}
          style={{
            flexShrink: 0,
            background: '#4A3FD6', color: '#FFFFFF',
            border: 'none', borderRadius: '8px',
            padding: '10px 24px', fontSize: '14px', fontWeight: '500',
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'background 0.15s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
          onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
        >
          開始學習
        </button>
      </div>

      {/* 課程資訊 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
        <div style={infoTag}>
          <span style={{ fontSize: '11px', color: '#9999AA' }}>課程長度</span>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#1A1A2E' }}>{course.hours} 小時</span>
        </div>
        <div style={infoTag}>
          <span style={{ fontSize: '11px', color: '#9999AA' }}>章節數</span>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#1A1A2E' }}>{course.chapters.length} 章節</span>
        </div>
        <div style={infoTag}>
          <span style={{ fontSize: '11px', color: '#9999AA' }}>講師</span>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#1A1A2E' }}>{course.instructor.name}</span>
        </div>
      </div>

      {/* 分隔線 */}
      <div style={{ borderTop: '0.5px solid #E5E5EE', marginBottom: '28px' }} />

      {/* 課程介紹 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>課程介紹</h2>
        <p style={{ fontSize: '14px', color: '#6B6B80', lineHeight: 1.9, margin: 0 }}>
          {course.overview}
        </p>
      </section>

      {/* 課程章節 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>課程章節</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {course.chapters.map(ch => (
            <div key={ch.id} style={{
              background: '#FFFFFF',
              border: '0.5px solid #E5E5EE',
              borderRadius: '10px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}>
              <span style={{ fontSize: '12px', color: '#9999AA', flexShrink: 0, width: '40px' }}>{ch.label}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 2px' }}>{ch.title}</p>
                <p style={{ fontSize: '12px', color: '#9999AA', margin: 0 }}>{ch.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 講師介紹 */}
      <section>
        <h2 style={{ fontSize: '16px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>講師介紹</h2>
        <div style={{
          background: '#FFFFFF',
          border: '0.5px solid #E5E5EE',
          borderRadius: '10px',
          padding: '20px',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
        }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '999px',
            background: '#EEF0FD', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', fontWeight: '500', color: '#4A3FD6',
          }}>
            {course.instructor.name[0]}
          </div>
          <div>
            <p style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 6px' }}>
              {course.instructor.name}
            </p>
            <p style={{ fontSize: '13px', color: '#6B6B80', lineHeight: 1.8, margin: 0 }}>
              {course.instructor.bio}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

// ── 章節觀看 ──────────────────────────────────────────────────────────────────

const lessonTypeColors = {
  '直播課程': { background: '#EEF0FD', color: '#4A3FD6' },
  '實體活動': { background: '#E4F7EE', color: '#0F6E56' },
  '線上教材': { background: '#FEF9E7', color: '#8B7320' },
  'Email教材': { background: '#F7F7F8', color: '#6B6B80' },
}

const materialIcon = {
  slides:    <path d="M3 4h14v9H3V4zm0 9h14M7 17h6" stroke="#6B6B80" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />,
  worksheet: <path d="M5 3h10a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1zm2 4h6M7 10h6M7 14h4" stroke="#6B6B80" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />,
  link:      <path d="M10 6H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" stroke="#6B6B80" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />,
}

function ChapterView({ course, chapter }) {
  if (!chapter) return null

  const hasVideo     = !!chapter.videoUrl
  const hasMaterials = chapter.materials?.length > 0

  return (
    <>
      {/* 影片區（有 videoUrl 才顯示） */}
      {hasVideo && (
        <div style={{
          background: '#1A1A2E', borderRadius: '12px',
          width: '100%', aspectRatio: '16 / 9',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '28px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M7 4.5l12 6.5-12 6.5V4.5z" fill="#FFFFFF" />
            </svg>
          </div>
          <span style={{ position: 'absolute', top: '12px', left: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
            {chapter.label} · {chapter.duration}
          </span>
        </div>
      )}

      {/* 回放到期提示（有 replayExpiry 才顯示） */}
      {chapter.replayExpiry && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#FEF9E7', border: '0.5px solid #F0D080',
          borderRadius: '8px', padding: '10px 14px',
          marginBottom: '16px',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="8" cy="8" r="6.5" stroke="#8B7320" strokeWidth="1"/>
            <path d="M8 5v3.5l2 1.2" stroke="#8B7320" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: '13px', color: '#8B7320' }}>
            回放可持續觀看至 <strong>{chapter.replayExpiry}</strong>，逾期將無法觀看
          </span>
        </div>
      )}

      {/* 課程類型標籤 + 章節標題 */}
      {chapter.lessonType && (
        <span style={{
          display: 'inline-block',
          fontSize: '12px', fontWeight: '500',
          borderRadius: '4px', padding: '2px 8px',
          marginBottom: '8px',
          ...lessonTypeColors[chapter.lessonType],
        }}>
          {chapter.lessonType}
        </span>
      )}
      <h1 style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 6px' }}>
        {chapter.title}
      </h1>
      <p style={{ fontSize: '12px', color: '#9999AA', margin: '0 0 12px' }}>{chapter.duration}</p>

      {/* 課程說明 */}
      {chapter.desc && (
        <p style={{ fontSize: '14px', color: '#6B6B80', lineHeight: 1.9, margin: '0 0 20px' }}>
          {chapter.desc}
        </p>
      )}

      {/* 分隔線 */}
      <div style={{ borderTop: '0.5px solid #E5E5EE', marginBottom: '20px' }} />

      {/* 直播課程 card（有 liveSession 才顯示） */}
      {chapter.liveSession && (
        <section style={{ marginBottom: '16px' }}>
          <div style={{
            border: '0.5px solid #E5E5EE',
            borderRadius: '10px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            background: '#FFFFFF',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
              <span style={{
                background: '#EEF0FD', color: '#4A3FD6',
                borderRadius: '6px', padding: '3px 10px',
                fontSize: '12px', fontWeight: '500',
                display: 'inline-block', alignSelf: 'flex-start',
              }}>
                {chapter.liveSession.status}
              </span>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
                {chapter.liveSession.title}
              </p>
              <p style={{ fontSize: '12px', color: '#6B6B80', margin: 0 }}>
                {chapter.liveSession.date} &nbsp;·&nbsp; {chapter.liveSession.time}
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
        </section>
      )}

      {/* 實體活動資訊（有 eventInfo 才顯示） */}
      {chapter.eventInfo && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>活動資訊</h2>
          <div style={{
            background: '#FFFFFF', border: '0.5px solid #E5E5EE',
            borderRadius: '10px', overflow: 'hidden',
          }}>
            {/* 日期 & 時間 */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              borderBottom: '0.5px solid #E5E5EE',
            }}>
              {/* 日期 */}
              <div style={{ padding: '20px 24px', borderRight: '0.5px solid #E5E5EE' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="#9999AA" strokeWidth="1"/>
                    <path d="M1.5 5.5h11" stroke="#9999AA" strokeWidth="1"/>
                    <path d="M4.5 1.5v2M9.5 1.5v2" stroke="#9999AA" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontSize: '12px', color: '#9999AA' }}>日期</span>
                </div>
                <p style={{ fontSize: '22px', fontWeight: '500', color: '#1A1A2E', margin: 0, lineHeight: 1.2 }}>
                  {chapter.eventInfo.date}
                </p>
              </div>
              {/* 時間 */}
              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="#9999AA" strokeWidth="1"/>
                    <path d="M7 4v3l2 1.5" stroke="#9999AA" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontSize: '12px', color: '#9999AA' }}>時間</span>
                </div>
                <p style={{ fontSize: '22px', fontWeight: '500', color: '#1A1A2E', margin: 0, lineHeight: 1.2 }}>
                  {chapter.eventInfo.time}
                </p>
              </div>
            </div>
            {/* 地址 */}
            <div style={{ padding: '16px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#9999AA" strokeWidth="1" fill="none"/>
                  <circle cx="7" cy="5" r="1.2" stroke="#9999AA" strokeWidth="1"/>
                </svg>
                <span style={{ fontSize: '12px', color: '#9999AA' }}>地址</span>
              </div>
              <p style={{ fontSize: '14px', color: '#1A1A2E', margin: '0 0 6px', lineHeight: 1.6 }}>
                {chapter.eventInfo.address}
              </p>
              <span
                style={{ fontSize: '13px', color: '#4A3FD6', cursor: 'pointer', textDecoration: 'none' }}
                onClick={() => {}}
              >
                在 Google 地圖上開啟 →
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 注意事項（有 notes 才顯示） */}
      {chapter.notes?.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>注意事項</h2>
          <div style={{
            background: '#FFFFFF', border: '0.5px solid #E5E5EE',
            borderRadius: '10px', padding: '20px',
            display: 'flex', flexDirection: 'column', gap: '10px',
          }}>
            {chapter.notes.map((note, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{
                  width: '18px', height: '18px', borderRadius: '999px', flexShrink: 0,
                  background: '#F7F7F8', border: '0.5px solid #E5E5EE',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', color: '#9999AA', marginTop: '1px',
                }}>
                  {idx + 1}
                </span>
                <p style={{ fontSize: '14px', color: '#6B6B80', lineHeight: 1.7, margin: 0 }}>{note}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 教材連結（有 materials 才顯示） */}
      {hasMaterials && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>本週教材</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {chapter.materials.map((m, idx) => (
              <a
                key={idx}
                href={m.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  background: '#FFFFFF', border: '0.5px solid #E5E5EE',
                  borderRadius: '10px', padding: '14px 18px',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#C5C5D8'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E5EE'}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                  {materialIcon[m.type] ?? materialIcon.link}
                </svg>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#1A1A2E', flex: 1 }}>
                  {m.label}
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="#9999AA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Email 教材通知（有 emailNotice 才顯示） */}
      {chapter.emailNotice && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: '10px',
          background: '#F7F7F8', border: '0.5px solid #E5E5EE',
          borderRadius: '8px', padding: '14px 16px',
          marginBottom: '16px',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
            <rect x="1.5" y="4" width="15" height="10.5" rx="1.5" stroke="#6B6B80" strokeWidth="1"/>
            <path d="M1.5 6l7.5 5 7.5-5" stroke="#6B6B80" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <div>
            <p style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 2px' }}>
              本週為 Email 教材
            </p>
            <p style={{ fontSize: '13px', color: '#6B6B80', margin: 0 }}>
              教材內容已寄送至您的註冊信箱，請至 Email 收信後搭配下方內容閱讀。
            </p>
          </div>
        </div>
      )}

      {/* Email 教材內文 */}
      {chapter.content && (
        <div style={{
          background: '#FFFFFF', border: '0.5px solid #E5E5EE',
          borderRadius: '10px', padding: '24px',
        }}>
          {chapter.content.split('\n\n').map((block, idx) => (
            <p key={idx} style={{
              fontSize: '14px', color: block.startsWith('【') ? '#1A1A2E' : '#6B6B80',
              fontWeight: block.startsWith('【') ? '500' : '400',
              lineHeight: 1.9, margin: idx === 0 ? 0 : '16px 0 0',
              whiteSpace: 'pre-line',
            }}>
              {block}
            </p>
          ))}
        </div>
      )}
    </>
  )
}
