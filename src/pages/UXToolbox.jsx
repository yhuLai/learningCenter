import Layout from '../components/layout/Layout'

// icon SVG components
function IconChart() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="10" width="3" height="8" rx="1" fill="#4A3FD6" fillOpacity="0.15" stroke="#4A3FD6" strokeWidth="1"/>
      <rect x="8.5" y="6" width="3" height="12" rx="1" fill="#4A3FD6" fillOpacity="0.15" stroke="#4A3FD6" strokeWidth="1"/>
      <rect x="15" y="2" width="3" height="16" rx="1" fill="#4A3FD6" fillOpacity="0.15" stroke="#4A3FD6" strokeWidth="1"/>
    </svg>
  )
}

function IconChecklist() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="16" height="16" rx="3" stroke="#4A3FD6" strokeWidth="1"/>
      <path d="M6 7h8M6 10h8M6 13h5" stroke="#4A3FD6" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="14.5" cy="13.5" r="2.5" fill="#4A3FD6" fillOpacity="0.15" stroke="#4A3FD6" strokeWidth="1"/>
      <path d="M13.5 13.5l.8.8 1.2-1.2" stroke="#4A3FD6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const tools = [
  {
    id: 1,
    icon: <IconChart />,
    title: 'UX 職能能量表',
    desc: 'UX 職能工具箱，小步分且清楚，讓你知道主要評量內容，讓你對UX的不同面向有完整了解，也讓你可以清楚行動並間題連解。',
    url: '#',
  },
  {
    id: 2,
    icon: <IconChecklist />,
    title: 'GIFT 能力自評量表',
    desc: '藉由 16 題練習，讓你清楚了解「目前」、「缺口」、「規劃」、「下一步」四個面向，幫助你制定最適合自己的成長計畫。',
    url: '#',
  },
]

export default function UXToolbox() {
  return (
    <Layout>
      {/* Hero */}
      <div style={{
        background: '#FFFFFF',
        border: '0.5px solid #E5E5EE',
        borderRadius: '12px',
        padding: '48px 40px',
        marginBottom: '32px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-block',
          fontSize: '12px',
          color: '#4A3FD6',
          fontWeight: '500',
          border: '0.5px solid #4A3FD6',
          borderRadius: '4px',
          padding: '2px 8px',
          marginBottom: '16px',
        }}>
          UX 工具箱
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '500',
          color: '#1A1A2E',
          margin: '0 0 12px',
          lineHeight: 1.4,
        }}>
          自評、診斷、找到下一步
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#6B6B80',
          margin: 0,
          maxWidth: '480px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: 1.7,
        }}>
          我們提供工具箱把你分解內功成，<br />
          幫助你可以立即行動並解決問題連結。
        </p>
      </div>

      {/* 工具卡片 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {tools.map(tool => (
          <div key={tool.id} style={{
            background: '#FFFFFF',
            border: '0.5px solid #E5E5EE',
            borderRadius: '12px',
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '24px',
          }}>
            {/* icon */}
            <div style={{
              width: '40px',
              height: '40px',
              background: '#F0EFFE',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              alignSelf: 'center',
            }}>
              {tool.icon}
            </div>

            {/* 左側資訊 */}
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#1A1A2E',
                margin: '0 0 8px',
              }}>
                {tool.title}
              </h2>
              <p style={{
                fontSize: '13px',
                color: '#6B6B80',
                margin: 0,
                lineHeight: 1.7,
                maxWidth: '520px',
              }}>
                {tool.desc}
              </p>
            </div>

            {/* 右側按鈕 */}
            <div style={{ flexShrink: 0, alignSelf: 'center' }}>
              <a
                href={tool.url}
                style={{
                  display: 'inline-block',
                  padding: '8px 20px',
                  background: '#4A3FD6',
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                查看詳情
              </a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
