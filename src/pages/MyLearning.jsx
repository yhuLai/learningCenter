import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'

// 暫用 mock 資料，之後串接 Supabase
const myCourses = [
  { id: 1, title: 'UXR 基礎研究方法', stage: 'R1', progress: 60, type: '線上課程' },
  { id: 2, title: 'UXR 研究實戰營', stage: 'R1', progress: 30, type: '實戰營' },
]

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
  return (
    <Layout>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* 個人檔案 */}
        <p style={{ ...sectionLabel, marginBottom: '12px' }}>個人檔案</p>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {myCourses.map(course => (
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
