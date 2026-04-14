import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { upcomingAll } from '../data/activities'

// 暫用 mock 資料，之後串接 Supabase
const myCourses = [
  { id: 1,  title: 'UXR 基礎研究方法',  stage: 'R1', progress: 60, type: '線上課程' },
  { id: 2,  title: 'UXR 研究實戰營',    stage: 'R1', progress: 30, type: '實戰營'  },
  { id: 3,  title: '問卷設計與分析',     stage: 'R2', progress: 40, type: '線上課程' },
  { id: 5,  title: '研究資料視覺化',     stage: 'R2', progress: 90, type: '線上課程' },
]

const COURSE_FILTER_TABS = ['全部', '線上課程', '實戰營']

const activityTypeStyle = {
  直播:  { background: '#EEF0FD', color: '#4A3FD6' },
  實戰營: { background: '#FEF9E7', color: '#8B7320' },
  工作坊: { background: '#EEF0FD', color: '#4A3FD6' },
  小聚:  { background: '#E4F7EE', color: '#0F6E56' },
}

const card = {
  background: '#FFFFFF',
  border: '0.5px solid #E5E5EE',
  borderRadius: '12px',
  padding: '20px',
}

const sectionLabel = {
  fontSize: '20px',
  fontWeight: '500',
  color: '#1A1A2E',
  margin: '0 0 16px',
}

const stageTag = {
  background: '#FEF9E7',
  color: '#8B7320',
  borderRadius: '6px',
  padding: '2px 8px',
  fontSize: '12px',
  fontWeight: '500',
}

export default function MyLearning() {
  const [courseFilter, setCourseFilter] = useState('全部')
  const filteredCourses = courseFilter === '全部'
    ? myCourses
    : myCourses.filter(c => c.type === courseFilter)

  return (
    <Layout>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* 個人檔案 */}
        <p style={{ ...sectionLabel, marginBottom: '12px' }}>個人檔案</p>

        {/* 課程活動 */}
        <div style={{ ...card, marginBottom: '16px', padding: '20px' }}>
          <p style={{ ...sectionLabel, marginBottom: '16px' }}>課程活動</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcomingAll.map(activity => (
              <div key={activity.id} style={{
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
                      ...activityTypeStyle[activity.type],
                      borderRadius: '6px',
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      display: 'inline-block',
                      alignSelf: 'flex-start',
                    }}>
                      {activity.type}
                    </span>
                    <p style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
                      {activity.title}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B6B80', margin: 0 }}>
                      {activity.date} &nbsp;·&nbsp; {activity.time}
                    </p>
                  </div>
                  {activity.type === '實戰營' ? (
                    <button
                      disabled
                      style={{
                        flexShrink: 0,
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontSize: '14px',
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
                  ) : (
                    <Link
                      to={`/activities/${activity.id}`}
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
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
                      onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
                    >
                      查看詳情
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 學習領域 + 學習OKR（左） / 學習雷達圖（右） */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          {/* 左欄：學習 OKR（含學習領域） */}
          <div style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <p style={{ ...sectionLabel, margin: 0 }}>學習 OKR</p>
              <Link to="/okr-setup" style={{ fontSize: '13px', color: '#4A3FD6', textDecoration: 'none' }}>
                設定學習OKR
              </Link>
            </div>

            {/* 學習領域 */}
            <p style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 8px' }}>學習領域</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {['服務設計', 'UX 研究'].map(label => (
                <span key={label} style={{
                  background: '#EEF0FD',
                  color: '#4A3FD6',
                  borderRadius: '6px',
                  padding: '4px 12px',
                  fontSize: '13px',
                  fontWeight: '500',
                }}>
                  {label}
                </span>
              ))}
            </div>

            {/* OKR 內容 */}
            <p style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 8px' }}>目標</p>
            <p style={{ fontSize: '14px', color: '#9999AA', margin: 0 }}>尚未設定</p>
          </div>

          {/* 右欄：學習雷達圖 */}
          <div style={{ ...card, display: 'flex', flexDirection: 'column' }}>
            <p style={sectionLabel}>學習雷達圖</p>
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9999AA',
              fontSize: '13px',
              border: '0.5px solid #E5E5EE',
              borderRadius: '8px',
            }}>
              尚無學習資料
            </div>
          </div>
        </div>

        {/* 我的課程 */}
        <div style={card}>
          <p style={sectionLabel}>近期觀看的課程</p>

          {/* 類型篩選 tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {COURSE_FILTER_TABS.map(tab => {
              const isActive = courseFilter === tab
              return (
                <button
                  key={tab}
                  onClick={() => setCourseFilter(tab)}
                  style={{
                    padding: '5px 14px',
                    fontSize: '13px',
                    fontWeight: isActive ? '500' : '400',
                    color: isActive ? '#4A3FD6' : '#6B6B80',
                    background: isActive ? '#EEF0FD' : 'transparent',
                    border: `0.5px solid ${isActive ? '#4A3FD6' : '#E5E5EE'}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontFamily: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tab}
                </button>
              )
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredCourses.map(course => (
              <div key={course.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                border: '0.5px solid #E5E5EE',
                borderRadius: '8px',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    {course.type === '實戰營' && (
                      <span style={stageTag}>{course.stage}</span>
                    )}
                    <span style={{ fontSize: '12px', color: '#9999AA' }}>{course.type}</span>
                  </div>
                  <p style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 10px' }}>
                    {course.title}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ flex: 1, height: '4px', background: '#E5E5EE', borderRadius: '999px' }}>
                      <div style={{
                        width: `${course.progress}%`,
                        height: '100%',
                        background: '#4A3FD6',
                        borderRadius: '999px',
                      }} />
                    </div>
                    <span style={{ fontSize: '12px', color: '#6B6B80', whiteSpace: 'nowrap' }}>
                      {course.progress}%
                    </span>
                  </div>
                </div>
                <ContinueButton to={`/video/${course.id}`} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  )
}

function ContinueButton({ to }) {
  return (
    <Link
      to={to}
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
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
      onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
    >
      繼續學習
    </Link>
  )
}
