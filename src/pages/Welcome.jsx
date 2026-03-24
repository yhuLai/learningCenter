import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'

const ctaItems = [
  { label: '領取\n免費課程',   path: '/online-courses' },
  { label: '查看\n近期開課表', path: '/online-courses' },
  { label: '設定\n學習OKR',   path: '/okr-setup' },
]

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <Layout>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 80px)',
        gap: '20px',
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '500',
          lineHeight: '1.3',
          color: '#1A1A2E',
          margin: 0,
          textAlign: 'center',
        }}>
          Hi！踏上你的 UX 之路
        </h1>

        <button
          onClick={() => navigate('/login')}
          style={{
            background: '#4A3FD6',
            color: '#FFFFFF',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
          onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
        >
          登入
        </button>

        <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
          {ctaItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '148px',
                height: '72px',
                background: '#FFFFFF',
                border: '0.5px solid #E5E5EE',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '400',
                color: '#1A1A2E',
                textDecoration: 'none',
                textAlign: 'center',
                whiteSpace: 'pre-line',
                lineHeight: '1.6',
                padding: '12px 16px',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#F7F7F8'}
              onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}
