import Layout from '../components/layout/Layout'
import CourseCard from '../components/ui/CourseCard'

// 暫用 mock 資料，之後串接 Supabase
const livestreams = [
  {
    id: 1,
    title: 'UXR 研究方法入門：如何從零建立研究框架',
    date: '2026-04-05',
    time: '14:00 – 16:00',
    status: '報名中',
    url: '#',
  },
  {
    id: 2,
    title: '使用者訪談實戰示範',
    date: '2026-04-19',
    time: '10:00 – 12:00',
    status: '即將開始',
    url: '#',
  },
]

const videoCourses = [
  { id: 1, title: 'UXR 基礎研究方法', stage: 'R1', free: true,  desc: '學習 UXR 的核心研究框架，從零建立研究思維。' },
  { id: 2, title: '使用者訪談技巧',    stage: 'R1', free: false, price: 2800, desc: '深入掌握訪談規劃、引導與分析的完整流程。' },
  { id: 3, title: '問卷設計與分析',    stage: 'R2', free: false, price: 3200, desc: '學習如何設計有效問卷並進行量化資料分析。' },
  { id: 4, title: 'Usability Testing 實戰', stage: 'R3', free: false, price: 3600, desc: '從規劃到執行，完整體驗易用性測試流程。' },
  { id: 5, title: '研究資料視覺化',    stage: 'R2', free: false, price: 2800, desc: '將複雜研究資料轉化為清晰易懂的視覺呈現。' },
  { id: 6, title: 'UXR 報告撰寫技巧', stage: 'R2', free: true,  desc: '學習如何撰寫具說服力的研究報告與建議。' },
]

const statusTag = {
  background: '#EEF0FD',
  color: '#4A3FD6',
  borderRadius: '999px',
  padding: '4px 12px',
  fontSize: '12px',
  fontWeight: '500',
  display: 'inline-block',
}

export default function OnlineCourses() {
  return (
    <Layout>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* 近期直播 */}
        <section style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>
            近期的直播
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {livestreams.map(live => (
              <div key={live.id} style={{
                background: '#FFFFFF',
                border: '0.5px solid #E5E5EE',
                borderRadius: '12px',
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
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
                  onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
                >
                  前往直播
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 影片課程 */}
        <section>
          <p style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>
            影片課程
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}>
            {videoCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

      </div>
    </Layout>
  )
}

