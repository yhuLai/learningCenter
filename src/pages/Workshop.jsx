import Layout from '../components/layout/Layout'
import CourseCard from '../components/ui/CourseCard'

// mock 資料，之後串接 Supabase
const upcomingWorkshops = [
  {
    id: 1,
    title: '目標客群用戶訪談一日實戰工作坊',
    date: '2026-03-28',
    time: '10:00 – 18:00',
    location: 'Taipei City',
    status: '報名中',
    url: '#',
  },
  {
    id: 2,
    title: '問卷設計與資料分析半日工作坊',
    date: '2026-04-12',
    time: '09:00 – 13:00',
    location: '線上',
    status: '即將開始',
    url: '#',
  },
]

const workshops = [
  { id: 1, title: '用戶訪談實戰工作坊',   stage: 'R1', free: false, price: 3200, desc: '一日密集訓練，學習真實訪談技巧與即時分析方法。' },
  { id: 2, title: '問卷設計工作坊',        stage: 'R2', free: false, price: 2800, desc: '設計可量化的問卷，並學習資料清洗與初步分析。' },
  { id: 3, title: '易用性測試工作坊',      stage: 'R3', free: false, price: 3600, desc: '從規劃到主持，完整走過一次 Usability Testing。' },
  { id: 4, title: '研究洞察簡報工作坊',    stage: 'R2', free: false, price: 2800, desc: '學習如何將研究發現轉化為清晰有說服力的簡報。' },
]

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

export default function Workshop() {
  return (
    <Layout>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* 近期的工作坊 */}
        <section style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>
            近期的工作坊
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcomingWorkshops.map(ws => (
              <div key={ws.id} style={{
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
                  <span style={statusTag}>{ws.status}</span>
                  <p style={{ fontSize: '18px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
                    {ws.title}
                  </p>
                  <p style={{ fontSize: '13px', color: '#6B6B80', margin: 0 }}>
                    {ws.date} &nbsp;·&nbsp; {ws.time} &nbsp;·&nbsp; {ws.location}
                  </p>
                </div>
                <a
                  href={ws.url}
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
                  立即報名
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 工作坊介紹 */}
        <section>
          <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>
            工作坊介紹
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {workshops.map(ws => (
              <CourseCard key={ws.id} course={{ ...ws, ctaLabel: '查看工作坊', hideTags: true }} />
            ))}
          </div>
        </section>

      </div>
    </Layout>
  )
}
