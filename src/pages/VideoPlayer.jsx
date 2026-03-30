import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

// mock 資料，之後串接 Supabase
const COURSE_TITLE = '問卷設計與分析'

const chapters = [
  {
    id: 1,
    label: '章節一',
    title: '研究目標與問卷設計概論',
    desc: '章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹。',
  },
  {
    id: 2,
    label: '章節二',
    title: '問題類型與量表設計',
    desc: '章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹。',
  },
  {
    id: 3,
    label: '章節三',
    title: '問卷發放與樣本策略',
    desc: '章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹。',
  },
  {
    id: 4,
    label: '章節四',
    title: '資料分析與結果呈現',
    desc: '章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹章節介紹。',
  },
]

export default function VideoPlayer() {
  const [activeChapter, setActiveChapter] = useState(1)
  const navigate = useNavigate()

  const current = chapters.find(c => c.id === activeChapter)

  const chapterSidebarStyle = {
    width: '200px',
    minHeight: '100vh',
    background: '#FFFFFF',
    borderRight: '0.5px solid #E5E5EE',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0',
    position: 'fixed',
    top: 0,
    left: 0,
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F7F8' }}>

      {/* 左側章節導航 */}
      <div style={{ width: '200px', flexShrink: 0 }} />
      <aside style={chapterSidebarStyle}>
        {/* Logo / 返回 */}
        <div style={{ padding: '0 20px 24px', borderBottom: '0.5px solid #E5E5EE' }}>
          <button
            onClick={() => navigate('/my-learning')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontSize: '13px',
              color: '#6B6B80',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="#6B6B80" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            返回
          </button>
          <div style={{ marginTop: '12px', fontSize: '13px', fontWeight: '500', color: '#1A1A2E', lineHeight: 1.4 }}>
            {COURSE_TITLE}
          </div>
        </div>

        {/* 章節列表 */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '8px' }}>
          {chapters.map(ch => (
            <button
              key={ch.id}
              onClick={() => setActiveChapter(ch.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: activeChapter === ch.id ? '500' : '400',
                color: activeChapter === ch.id ? '#1A1A2E' : '#6B6B80',
                background: activeChapter === ch.id ? '#F7F7F8' : 'transparent',
                borderLeft: activeChapter === ch.id ? '2px solid #4A3FD6' : '2px solid transparent',
                border: 'none',
                borderLeft: activeChapter === ch.id ? '2px solid #4A3FD6' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              {ch.label}
            </button>
          ))}
        </nav>

        {/* 設定 */}
        <div style={{ borderTop: '0.5px solid #E5E5EE', paddingTop: '16px' }}>
          <NavLink
            to="/settings"
            style={({ isActive }) => ({
              display: 'block',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: isActive ? '500' : '400',
              color: isActive ? '#1A1A2E' : '#6B6B80',
              textDecoration: 'none',
              borderLeft: isActive ? '2px solid #4A3FD6' : '2px solid transparent',
            })}
          >
            設定
          </NavLink>
        </div>
      </aside>

      {/* 主內容 */}
      <main style={{ flex: 1, minHeight: '100vh', padding: '32px 40px' }}>

        {/* 麵包屑 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px',
          color: '#9999AA',
          marginBottom: '24px',
        }}>
          <span
            onClick={() => navigate('/my-learning')}
            style={{ cursor: 'pointer', color: '#6B6B80' }}
          >
            我的學習中心
          </span>
          <span>/</span>
          <span style={{ color: '#6B6B80' }}>{COURSE_TITLE}</span>
          <span>/</span>
          <span style={{ color: '#1A1A2E', fontWeight: '500' }}>{current.label}</span>
        </div>

        {/* 影片區 */}
        <div style={{
          background: '#1A1A2E',
          borderRadius: '12px',
          width: '100%',
          aspectRatio: '16 / 9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* 播放 icon */}
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M7 4.5l12 6.5-12 6.5V4.5z" fill="#FFFFFF"/>
            </svg>
          </div>
          {/* 影片標籤 */}
          <span style={{
            position: 'absolute',
            top: '12px',
            left: '16px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.5)',
          }}>
            影片
          </span>
        </div>

        {/* 章節標題 */}
        <h1 style={{
          fontSize: '20px',
          fontWeight: '500',
          color: '#1A1A2E',
          margin: '0 0 16px',
        }}>
          {current.title}
        </h1>

        {/* 分隔線 */}
        <div style={{ borderTop: '0.5px solid #E5E5EE', marginBottom: '16px' }} />

        {/* 章節介紹 */}
        <p style={{
          fontSize: '14px',
          color: '#6B6B80',
          lineHeight: 1.8,
          margin: 0,
        }}>
          {current.desc}
        </p>

      </main>
    </div>
  )
}
