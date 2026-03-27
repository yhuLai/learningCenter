import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Register() {
  const [form, setForm]     = useState({ name: '', email: '', password: '', confirm: '' })
  const [focus, setFocus]   = useState('')
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone]     = useState(false)
  const navigate            = useNavigate()

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) {
      setError('兩次輸入的密碼不一致')
      return
    }
    if (form.password.length < 8) {
      setError('密碼至少需要 8 個字元')
      return
    }

    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name } },
    })
    setLoading(false)

    if (authError) {
      setError(authError.message)
    } else {
      setDone(true)
    }
  }

  const fields = [
    { key: 'name',     label: '姓名',     type: 'text',     placeholder: '你的名字' },
    { key: 'email',    label: '電子郵件', type: 'email',    placeholder: 'name@example.com' },
    { key: 'password', label: '密碼',     type: 'password', placeholder: '至少 8 個字元' },
    { key: 'confirm',  label: '確認密碼', type: 'password', placeholder: '再輸入一次密碼' },
  ]

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

        {done ? (
          /* 註冊成功 */
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
            <p style={{ fontSize: '18px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 8px' }}>帳號建立成功</p>
            <p style={{ fontSize: '14px', color: '#6B6B80', margin: '0 0 24px', lineHeight: '1.7' }}>
              請前往 <strong style={{ color: '#1A1A2E' }}>{form.email}</strong> 收件匣，<br />
              點擊驗證信中的連結完成認證。
            </p>
            <button
              onClick={() => navigate('/login')}
              style={primaryBtn}
              onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
              onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
            >
              前往登入
            </button>
          </div>
        ) : (
          /* 表單 */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {fields.map(({ key, label, type, placeholder }) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={set(key)}
                  onFocus={() => setFocus(key)}
                  onBlur={() => setFocus('')}
                  placeholder={placeholder}
                  required
                  style={inputStyle(focus === key)}
                />
              </div>
            ))}

            {/* 錯誤訊息 */}
            {error && (
              <p style={{ fontSize: '13px', color: '#C04828', margin: 0 }}>{error}</p>
            )}

            {/* 註冊按鈕 */}
            <button
              type="submit"
              disabled={loading}
              style={{ ...primaryBtn, marginTop: '4px', opacity: loading ? 0.7 : 1, cursor: loading ? 'default' : 'pointer' }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#3D34B8' }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#4A3FD6' }}
            >
              {loading ? '建立中…' : '建立帳號'}
            </button>

          </form>
        )}

        {/* 分隔線 */}
        <div style={{ borderTop: '0.5px solid #E5E5EE', margin: '24px 0' }} />

        {/* 前往登入 */}
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#6B6B80', margin: 0 }}>
          已經有帳號？{' '}
          <Link to="/login" style={{ ...linkStyle, fontWeight: '500' }}>立即登入</Link>
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
