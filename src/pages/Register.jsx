import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Register() {
  const [step, setStep]       = useState('form')   // 'form' | 'otp'
  const [email, setEmail]     = useState('')
  const [name, setName]       = useState('')
  const [otp, setOtp]         = useState('')
  const [focus, setFocus]     = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const navigate              = useNavigate()

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { data: { name } },
    })
    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      setStep('otp')
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: authError } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' })
    setLoading(false)
    if (authError) {
      setError('驗證碼錯誤或已過期，請重新確認。')
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
            {step === 'form' ? '加入 Soking，開始你的 UXR 學習旅程' : `驗證碼已寄至 ${email}`}
          </p>
        </div>

        {step === 'form' ? (
          /* ── Step 1：填寫資料 ── */
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle}>姓名</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onFocus={() => setFocus('name')}
                onBlur={() => setFocus('')}
                placeholder="請輸入你的姓名"
                required
                style={inputStyle(focus === 'name')}
              />
            </div>

            {error && <p style={{ fontSize: '13px', color: '#C04828', margin: 0 }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{ ...primaryBtn, opacity: loading ? 0.7 : 1, cursor: loading ? 'default' : 'pointer' }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#3D34B8' }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#4A3FD6' }}
            >
              {loading ? '寄送中…' : '開通並發送驗證碼'}
            </button>

          </form>
        ) : (
          /* ── Step 2：輸入驗證碼 ── */
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle}>驗證碼</label>
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onFocus={() => setFocus('otp')}
                onBlur={() => setFocus('')}
                placeholder="請輸入 6 位數驗證碼"
                required
                style={{ ...inputStyle(focus === 'otp'), letterSpacing: '0.1em' }}
              />
            </div>

            {error && <p style={{ fontSize: '13px', color: '#C04828', margin: 0 }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{ ...primaryBtn, opacity: loading ? 0.7 : 1, cursor: loading ? 'default' : 'pointer' }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#3D34B8' }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#4A3FD6' }}
            >
              {loading ? '驗證中…' : '完成註冊'}
            </button>

            <button
              type="button"
              onClick={() => { setStep('form'); setOtp(''); setError('') }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#6B6B80', fontFamily: 'inherit', padding: 0 }}
            >
              ← 重新填寫資料
            </button>

          </form>
        )}

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
