import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import CourseCard from '../components/ui/CourseCard'
import { upcomingActivities, pastWorkshops, pastGatherings } from '../data/activities'

const typeTag = {
  borderRadius: '6px',
  padding: '3px 10px',
  fontSize: '12px',
  fontWeight: '500',
  display: 'inline-block',
  alignSelf: 'flex-start',
}

const typeColors = {
  '工作坊': { background: '#EEF0FD', color: '#4A3FD6' },
  '小聚':   { background: '#E4F7EE', color: '#0F6E56' },
}

// CourseCard 用的格式轉換
const toCard = (a) => ({
  id: a.id,
  title: a.title,
  date: a.date,
  desc: a.desc,
  hideTags: true,
  hidePrice: true,
  hideButton: true,
})

export default function CourseActivities() {
  return (
    <Layout>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* 即將開始的活動 */}
        <section style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>
            即將開始的活動
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcomingActivities.map(event => (
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
                  <span style={{ ...typeTag, ...typeColors[event.type] }}>{event.type}</span>
                  <p style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
                    {event.title}
                  </p>
                  <p style={{ fontSize: '13px', color: '#6B6B80', margin: 0 }}>
                    {event.date} &nbsp;·&nbsp; {event.time} &nbsp;·&nbsp; {event.location}
                  </p>
                </div>
                <Link
                  to={`/activities/${event.id}`}
                  style={{
                    flexShrink: 0,
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
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
                  onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
                >
                  查看詳情
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 參與過的工作坊 */}
        <section style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>
            參與過的工作坊
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {pastWorkshops.map(ws => (
              <CourseCard key={ws.id} course={toCard(ws)} />
            ))}
          </div>
        </section>

        {/* 參與過的小聚活動 */}
        <section>
          <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>
            參與過的小聚活動
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {pastGatherings.map(g => (
              <CourseCard key={g.id} course={toCard(g)} />
            ))}
          </div>
        </section>

      </div>
    </Layout>
  )
}
