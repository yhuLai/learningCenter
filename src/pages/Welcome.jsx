import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Welcome() {
  const { user } = useAuth()

  if (user) return <Navigate to="/my-learning" replace />

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#F7F7F8',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '40px',
    }}>
      <h1 style={{
        fontSize: '36px',
        fontWeight: '500',
        color: '#1A1A2E',
        margin: 0,
        textAlign: 'center',
      }}>
        Hi！踏上你的 UX 之路
      </h1>

      <LoginModal />
    </div>
  )
}

// ── 登入 Modal ────────────────────────────────────────────────────────────────

function LoginModal() {
  const { mockLogin } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [focus, setFocus] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    mockLogin()
    navigate('/my-learning')
  }

  return (
    <div style={{
      background: '#FFFFFF',
      border: '0.5px solid #E5E5EE',
      borderRadius: '16px',
      padding: '40px',
      width: '100%',
      maxWidth: '400px',
    }}>
      {/* 品牌 */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <p style={{ fontSize: '22px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 8px' }}>
          Soking 學習中心
        </p>
        <p style={{ fontSize: '14px', color: '#6B6B80', margin: 0 }}>
          輸入信箱以取得驗證碼
        </p>
      </div>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={labelStyle}>電子郵件</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocus('email')}
            onBlur={() => setFocus('')}
            placeholder="name@example.com"
            style={inputStyle(focus === 'email')}
          />
        </div>

        <button
          type="submit"
          style={primaryBtn}
          onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
          onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
        >
          模擬登入畫面，按此直接登入
        </button>
      </form>

      {/* 分隔線 */}
      <div style={{ borderTop: '0.5px solid #E5E5EE', margin: '24px 0' }} />

      {/* 前往註冊 */}
      <p style={{ textAlign: 'center', fontSize: '13px', color: '#6B6B80', margin: 0 }}>
        還沒有帳號？{' '}
        <Link to="/register" style={{ ...linkStyle, fontWeight: '500' }}>立即註冊</Link>
      </p>
    </div>
  )
}

// ── styles ────────────────────────────────────────────────────────────────────

const labelStyle = {
  fontSize: '13px',
  fontWeight: '500',
  color: '#1A1A2E',
}

const inputStyle = (focused) => ({
  background: '#FFFFFF',
  border: `0.5px solid ${focused ? '#4A3FD6' : '#C5C5D8'}`,
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '14px',
  color: '#1A1A2E',
  fontFamily: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
  outline: 'none',
  transition: 'border-color 0.15s ease',
  width: '100%',
  boxSizing: 'border-box',
})

const primaryBtn = {
  background: '#4A3FD6',
  color: '#FFFFFF',
  border: 'none',
  padding: '12px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  fontFamily: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
  transition: 'background 0.15s ease',
  width: '100%',
}

const linkStyle = {
  fontSize: '13px',
  color: '#4A3FD6',
  textDecoration: 'none',
}
