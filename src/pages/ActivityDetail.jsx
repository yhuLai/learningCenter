import { useParams, useNavigate } from 'react-router-dom'
import { getActivityById } from '../data/activities'

const typeColors = {
  '工作坊': { background: '#EEF0FD', color: '#4A3FD6' },
  '小聚':   { background: '#E4F7EE', color: '#0F6E56' },
}

export default function ActivityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const activity = getActivityById(id)

  if (!activity) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#6B6B80', fontFamily: 'inherit' }}>
        找不到活動。
        <button onClick={() => navigate('/activities')} style={{ marginLeft: '8px', color: '#4A3FD6', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}>
          返回課程活動
        </button>
      </div>
    )
  }

  const typeColor = typeColors[activity.type] ?? { background: '#F7F7F8', color: '#6B6B80' }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F7F7F8',
      padding: '48px 24px',
      fontFamily: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* 返回 */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 0, fontSize: '13px', color: '#9999AA',
            fontFamily: 'inherit', marginBottom: '28px',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="#9999AA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          返回
        </button>

        {/* 類型標籤 + 標題 */}
        <span style={{
          display: 'inline-block',
          ...typeColor,
          borderRadius: '6px', padding: '3px 12px',
          fontSize: '12px', fontWeight: '500',
          marginBottom: '12px',
        }}>
          {activity.type}
        </span>
        <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 8px', lineHeight: 1.4 }}>
          {activity.title}
        </h1>
        <p style={{ fontSize: '14px', color: '#6B6B80', lineHeight: 1.8, margin: '0 0 32px' }}>
          {activity.desc}
        </p>

        {/* 活動資訊 */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>活動資訊</h2>
          <div style={{
            background: '#FFFFFF', border: '0.5px solid #E5E5EE',
            borderRadius: '10px', overflow: 'hidden',
          }}>
            {/* 日期 & 時間 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '0.5px solid #E5E5EE' }}>
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
                  {activity.date}
                </p>
              </div>
              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="#9999AA" strokeWidth="1"/>
                    <path d="M7 4v3l2 1.5" stroke="#9999AA" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontSize: '12px', color: '#9999AA' }}>時間</span>
                </div>
                <p style={{ fontSize: '22px', fontWeight: '500', color: '#1A1A2E', margin: 0, lineHeight: 1.2 }}>
                  {activity.time}
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
                {activity.address}
              </p>
              <span
                style={{ fontSize: '13px', color: '#4A3FD6', cursor: 'pointer' }}
                onClick={() => {}}
              >
                在 Google 地圖上開啟 →
              </span>
            </div>
          </div>
        </section>

        {/* 注意事項 */}
        {activity.notes?.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>注意事項</h2>
            <div style={{
              background: '#FFFFFF', border: '0.5px solid #E5E5EE',
              borderRadius: '10px', padding: '20px',
              display: 'flex', flexDirection: 'column', gap: '10px',
            }}>
              {activity.notes.map((note, idx) => (
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


      </div>
    </div>
  )
}
