import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [email, setEmail]   = useState('')
  const [name, setName]     = useState('')
  const [focus, setFocus]   = useState('')
  const navigate            = useNavigate()
  const { mockLogin }       = useAuth()

  const handleRegister = (e) => {
    e.preventDefault()
    mockLogin()
    navigate('/my-learning')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F7F7F8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
    }}>
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
            建立你的帳號
          </p>
          <p style={{ fontSize: '14px', color: '#6B6B80', margin: 0 }}>
            加入 Soking，開始你的 UXR 學習旅程
          </p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>姓名</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onFocus={() => setFocus('name')}
              onBlur={() => setFocus('')}
              placeholder="請輸入你的姓名"
              style={inputStyle(focus === 'name')}
            />
          </div>

          <button
            type="submit"
            style={primaryBtn}
            onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
            onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
          >
            模擬登入畫面，按此直接註冊
          </button>

        </form>

        {/* 分隔線 */}
        <div style={{ borderTop: '0.5px solid #E5E5EE', margin: '24px 0' }} />

        {/* 前往登入 */}
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#6B6B80', margin: 0 }}>
          已經有帳號？{' '}
          <Link to="/" style={{ ...linkStyle, fontWeight: '500' }}>返回登入</Link>
        </p>

      </div>
    </div>
  )
}

// ─── styles ──────────────────────────────────────────────────────────────────

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
