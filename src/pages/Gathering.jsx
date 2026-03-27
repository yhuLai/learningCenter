import Layout from '../components/layout/Layout'
import CourseCard from '../components/ui/CourseCard'

const upcomingGatherings = [
  {
    id: 1,
    title: 'UXR 實務分享小聚：研究如何影響產品決策',
    date: '2026-04-02',
    time: '19:00 – 21:00',
    location: 'Taipei City',
    status: '報名中',
    url: '#',
  },
  {
    id: 2,
    title: 'UXR 職涯交流夜：從初學者到資深研究員',
    date: '2026-04-18',
    time: '19:00 – 21:30',
    location: '線上',
    status: '即將開始',
    url: '#',
  },
]

const gatherings = [
  { id: 1, title: 'UXR 職涯交流小聚',     free: true,  hideTags: true, desc: '與業界研究員面對面交流，探索 UXR 職涯發展方向。' },
  { id: 2, title: '研究方法讀書會',        free: true,  customTag: '讀書會', desc: '每月一本研究經典，共同討論與實務應用。' },
  { id: 3, title: '作品集 Review 小聚',   free: false, price: 500, hideTags: true, desc: '帶著你的作品集，獲得資深研究員的直接回饋。' },
  { id: 4, title: 'UXR x PM 跨域對談',   free: false, price: 300, hideTags: true, desc: '研究員與 PM 的視角碰撞，探討協作中的挑戰與默契。' },
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

export default function Gathering() {
  return (
    <Layout>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* 近期的活動 */}
        <section style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>
            近期的活動
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcomingGatherings.map(event => (
              <div key={event.id} style={{
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
                  <span style={statusTag}>{event.status}</span>
                  <p style={{ fontSize: '18px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
                    {event.title}
                  </p>
                  <p style={{ fontSize: '13px', color: '#6B6B80', margin: 0 }}>
                    {event.date} &nbsp;·&nbsp; {event.time} &nbsp;·&nbsp; {event.location}
                  </p>
                </div>
                <a
                  href={event.url}
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

        {/* 其他活動 */}
        <section>
          <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>
            其他活動
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {gatherings.map(g => (
              <CourseCard key={g.id} course={{ ...g, ctaLabel: '查看活動' }} />
            ))}
          </div>
        </section>

      </div>
    </Layout>
  )
}
