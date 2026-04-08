import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'

// 暫用 mock 資料，之後串接 Supabase
const myCourses = [
  { id: 1, title: 'UXR 基礎研究方法', stage: 'R1', progress: 60, type: '線上課程' },
  { id: 2, title: 'UXR 研究實戰營', stage: 'R1', progress: 30, type: '實戰營' },
  { id: 3, title: 'UX 設計思考工作坊', stage: 'R2', progress: 80, type: '工作坊' },
  { id: 4, title: 'UX 讀書會 Q1', stage: '', progress: 50, type: '小聚活動' },
]

const COURSE_FILTER_TABS = ['全部', '線上課程', '實戰營', '工作坊', '小聚活動']

const recommendedCourses = [
  { id: 3, title: '問卷設計與分析', type: '線上課程' },
  { id: 4, title: 'Usability Testing 實戰', type: '實戰營' },
]

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

        {/* UXR 認證等級 */}
        <div style={{ ...card, marginBottom: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <p style={{ ...sectionLabel, margin: 0 }}>UXR 認證等級</p>
            <Link to="/bootcamp#plans" style={{ fontSize: '13px', color: '#4A3FD6', textDecoration: 'none' }}>
              提升我的等級
            </Link>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
          }}>
            {/* 左側：等級資訊 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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

            {/* 右側：R1–R4 進度圈 */}
            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {['R1', 'R2', 'R3', 'R4'].map((stage, idx) => {
                const lit = idx < 3
                return (
                  <div key={stage} style={{ display: 'flex', alignItems: 'center' }}>
                    {idx > 0 && (
                      <div style={{ width: '40px', height: '2px', background: idx < 3 ? '#4A3FD6' : '#E5E5EE' }} />
                    )}
                    <div style={{
                      width: '52px', height: '52px',
                      borderRadius: '999px',
                      background: lit ? '#4A3FD6' : '#F7F7F8',
                      border: lit ? 'none' : '0.5px solid #E5E5EE',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      gap: '1px',
                    }}>
                      <span style={{ fontSize: '13px', fontWeight: '500', color: lit ? '#FFFFFF' : '#9999AA', lineHeight: 1 }}>
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
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div style={card}>
            <p style={{ ...sectionLabel, marginBottom: '12px' }}>學習領域</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
          </div>
          <div style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <p style={{ ...sectionLabel, margin: 0 }}>學習 OKR</p>
              <Link to="/okr-setup" style={{ fontSize: '13px', color: '#4A3FD6', textDecoration: 'none' }}>
                設定學習OKR
              </Link>
            </div>
            <p style={{ fontSize: '15px', color: '#9999AA', margin: 0 }}>尚未設定</p>
          </div>
        </div>

        {/* 學習雷達圖 + 推薦課程 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          {/* 學習雷達圖 */}
          <div style={card}>
            <p style={sectionLabel}>學習雷達圖</p>
            <div style={{
              height: '220px',
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

          {/* 推薦課程 */}
          <div style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <p style={{ ...sectionLabel, margin: 0 }}>推薦課程</p>
              <Link
                to="/online-courses"
                style={{ fontSize: '13px', color: '#4A3FD6', textDecoration: 'none' }}
              >
                查看詳情
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recommendedCourses.map(course => (
                <div key={course.id} style={{
                  border: '0.5px solid #E5E5EE',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'stretch',
                }}>
                  {/* 左側封面圖佔位 */}
                  <div style={{
                    width: '96px',
                    flexShrink: 0,
                    background: '#F7F7F8',
                    borderRight: '0.5px solid #E5E5EE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: '11px', color: '#9999AA' }}>封面圖片</span>
                  </div>
                  {/* 右側：標題 + 課程類型 */}
                  <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
                      {course.title}
                    </p>
                    <span style={{ fontSize: '12px', color: '#9999AA' }}>{course.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 我的課程 */}
        <div style={card}>
          <p style={sectionLabel}>我的課程</p>

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
                    borderRadius: '999px',
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
