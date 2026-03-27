import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [focus, setFocus]       = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate                = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (authError) {
      setError('電子郵件或密碼錯誤，請重新確認。')
    } else {
      navigate('/my-learning')
    }
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
      <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>

        {/* 返回按鈕 — card 外側左邊，垂直置中 */}
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'absolute',
            left: '-48px',
            top: '0',
            background: '#FFFFFF',
            border: '0.5px solid #E5E5EE',
            borderRadius: '999px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#6B6B80',
            fontFamily: 'inherit',
            transition: 'color 0.15s ease, border-color 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#1A1A2E'; e.currentTarget.style.borderColor = '#C5C5D8' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#6B6B80'; e.currentTarget.style.borderColor = '#E5E5EE' }}
        >
          ←
        </button>

        <div style={{
          background: '#FFFFFF',
          border: '0.5px solid #E5E5EE',
          borderRadius: '16px',
          padding: '40px',
          width: '100%',
        }}>

        {/* 品牌 */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontSize: '22px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 8px' }}>
            Soking 學習中心
          </p>
          <p style={{ fontSize: '14px', color: '#6B6B80', margin: 0 }}>
            登入你的帳號繼續學習
          </p>
        </div>

        {/* 表單 */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>電子郵件</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocus('email')}
              onBlur={() => setFocus('')}
              placeholder="name@example.com"
              required
              style={inputStyle(focus === 'email')}
            />
          </div>

          {/* 密碼 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={labelStyle}>密碼</label>
              <Link to="/forgot-password" style={linkStyle}>忘記密碼？</Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocus('password')}
              onBlur={() => setFocus('')}
              placeholder="輸入密碼"
              required
              style={inputStyle(focus === 'password')}
            />
          </div>

          {/* 錯誤訊息 */}
          {error && (
            <p style={{ fontSize: '13px', color: '#C04828', margin: 0 }}>{error}</p>
          )}

          {/* 登入按鈕 */}
          <button
            type="submit"
            disabled={loading}
            style={{ ...primaryBtn, opacity: loading ? 0.7 : 1, cursor: loading ? 'default' : 'pointer' }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#3D34B8' }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#4A3FD6' }}
          >
            {loading ? '登入中…' : '登入'}
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
