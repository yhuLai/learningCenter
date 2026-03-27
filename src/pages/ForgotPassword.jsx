import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail]       = useState('')
  const [focus, setFocus]       = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: 串接 Supabase Auth resetPasswordForEmail
    setSubmitted(true)
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

        {!submitted ? (
          <>
            {/* 說明 */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <p style={{ fontSize: '22px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 8px' }}>
                忘記密碼
              </p>
              <p style={{ fontSize: '14px', color: '#6B6B80', margin: 0, lineHeight: '1.7' }}>
                輸入你的電子郵件，<br />我們會寄送重設密碼的連結給你。
              </p>
            </div>

            {/* 表單 */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>電子郵件</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocus(true)}
                  onBlur={() => setFocus(false)}
                  placeholder="name@example.com"
                  required
                  style={inputStyle(focus)}
                />
              </div>

              <button
                type="submit"
                style={primaryBtn}
                onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
                onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
              >
                寄送重設連結
              </button>
            </form>
          </>
        ) : (
          /* 寄送成功狀態 */
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '48px', height: '48px',
              background: '#E4F7EE',
              borderRadius: '999px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 11L9 16L18 7" stroke="#1D9E75" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p style={{ fontSize: '18px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 8px' }}>
              連結已寄出
            </p>
            <p style={{ fontSize: '14px', color: '#6B6B80', margin: '0 0 24px', lineHeight: '1.7' }}>
              請檢查 <strong style={{ color: '#1A1A2E' }}>{email}</strong> 的收件匣，<br />
              並點擊信中的連結重設密碼。
            </p>
          </div>
        )}

        {/* 分隔線 */}
        <div style={{ borderTop: '0.5px solid #E5E5EE', margin: '24px 0' }} />

        {/* 返回登入 */}
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#6B6B80', margin: 0 }}>
          <Link to="/login" style={{ color: '#4A3FD6', textDecoration: 'none', fontWeight: '500' }}>
            ← 返回登入
          </Link>
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
