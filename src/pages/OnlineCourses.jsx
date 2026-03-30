import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import CourseCard from '../components/ui/CourseCard'
import { supabase } from '../lib/supabase'

// 暫用 mock 資料，之後串接 Supabase
const livestreams = [
  {
    id: 2,
    title: '使用者訪談實戰示範',
    date: '2026-04-19',
    time: '10:00 – 12:00',
    status: '即將開始',
    url: '#',
  },
  {
    id: 1,
    title: 'UXR 研究方法入門：如何從零建立研究框架',
    date: '2026-04-05',
    time: '14:00 – 16:00',
    status: '報名中',
    url: '#',
  },
]

const videoCourses = [
  { id: 1,  title: 'UXR 基礎研究方法',        stage: 'R1', free: true, type: 'UI/UX職涯發展', desc: '學習 UXR 的核心研究框架，從零建立研究思維。' },
  { id: 6,  title: 'UXR 報告撰寫技巧',        stage: 'R2', free: true, type: 'UI/UX職涯發展', desc: '學習如何撰寫具說服力的研究報告與建議。' },
  { id: 11, title: '研究倫理與訪談同意書',    stage: 'R1', free: true, type: 'UI/UX職涯發展', desc: '了解 UXR 研究倫理規範，學習如何正確取得受訪者同意。' },
  { id: 12, title: '競品分析入門',            stage: 'R1', free: true, type: 'UI/UX職涯發展', desc: '系統性地拆解競品，找出市場機會與設計缺口。' },
  { id: 13, title: 'PM 入門：從需求到驗證',  stage: 'R1', free: true, type: 'PM職涯發展',   desc: '帶你了解 PM 如何定義問題、拆解需求並設計驗證方案。' },
  { id: 2, title: '使用者訪談技巧',           stage: 'R1', free: false, price: 2800, type: 'UI/UX職涯發展', desc: '深入掌握訪談規劃、引導與分析的完整流程。' },
  { id: 3, title: '問卷設計與分析',           stage: 'R2', free: false, price: 3200, type: 'UI/UX職涯發展', desc: '學習如何設計有效問卷並進行量化資料分析。' },
  { id: 4, title: 'Usability Testing 實戰',  stage: 'R3', free: false, price: 3600, type: 'UI/UX職涯發展', desc: '從規劃到執行，完整體驗易用性測試流程。' },
  { id: 5, title: '研究資料視覺化',           stage: 'R2', free: false, price: 2800, type: 'UI/UX職涯發展', desc: '將複雜研究資料轉化為清晰易懂的視覺呈現。' },
  { id: 7, title: 'PM 需求訪談與用戶研究',   stage: 'R2', free: false, price: 3200, type: 'PM職涯發展',   desc: '從 PM 視角出發，學習如何運用 UXR 方法驗證需求。' },
  { id: 8, title: '產品指標設計與分析',       stage: 'R3', free: false, price: 3600, type: 'PM職涯發展',   desc: '學習如何設定產品 KPI 並透過數據驅動決策。' },
  { id: 9, title: '服務藍圖與顧客旅程',       stage: 'R2', free: false, price: 2800, type: '服務設計系列', desc: '以系統視角繪製服務藍圖，找出關鍵接觸點。' },
  { id: 10, title: '服務設計工作坊方法論',   stage: 'R3', free: false, price: 3600, type: '服務設計系列', desc: '掌握服務設計全流程，帶領跨部門共創工作坊。' },
]

const COURSE_TYPES = ['所有課程', 'PM職涯發展', 'UI/UX職涯發展', '服務設計系列']

const statusTag = {
  background: '#EEF0FD',
  color: '#4A3FD6',
  borderRadius: '999px',
  padding: '4px 12px',
  fontSize: '12px',
  fontWeight: '500',
  display: 'inline-block',
  alignSelf: 'flex-start',
}

export default function OnlineCourses() {
  const [showAuth, setShowAuth] = useState(true)
  const [courseType, setCourseType] = useState('所有課程')
  const [freeSlide, setFreeSlide] = useState(0)
  const freeCourses = videoCourses.filter(c => c.free)
  const VISIBLE = 3
  const GAP = 20
  const maxSlide = freeCourses.length - VISIBLE

  // 用 ref 量出容器真實寬度，確保卡片寬度和位移量都是精確 px
  const carouselRef = useRef(null)
  const [cardW, setCardW] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (carouselRef.current) {
        const w = carouselRef.current.offsetWidth
        setCardW((w - GAP * (VISIBLE - 1)) / VISIBLE)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const paidCourses = videoCourses
    .filter(c => !c.free)
    .filter(c => courseType === '所有課程' || c.type === courseType)

  return (
    <Layout>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* 近期直播 */}
        <section style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 12px' }}>
            近期的直播
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {livestreams.map(live => (
              <div key={live.id} style={{
                background: '#FFFFFF',
                border: '0.5px solid #E5E5EE',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                gap: '0',
              }}>
                {/* 封面圖片 */}
                <div style={{
                  width: '160px',
                  flexShrink: 0,
                  alignSelf: 'stretch',
                  background: '#F7F7F8',
                  borderRight: '0.5px solid #E5E5EE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '12px', color: '#9999AA' }}>封面圖片</span>
                </div>

                {/* 內容區 */}
                <div style={{
                  flex: 1,
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={statusTag}>{live.status}</span>
                    <p style={{ fontSize: '18px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
                      {live.title}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B6B80', margin: 0 }}>
                      {live.date} &nbsp;·&nbsp; {live.time}
                    </p>
                    {live.status === '即將開始' && (
                      <Countdown targetDate={live.date} targetTime={live.time.split(' – ')[0]} />
                    )}
                  </div>
                  <a
                    href={live.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-block',
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
                      flexShrink: 0,
                      alignSelf: 'flex-start',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
                    onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
                  >
                    {live.status === '報名中' ? '詳細資訊' : '前往直播'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 免費課程 */}
        <section style={{ marginBottom: '40px' }}>
          {/* Header row */}
          <div style={{ marginBottom: '12px' }}>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
              免費課程
            </p>
          </div>

          {/* Carousel wrapper — position:relative 讓箭頭可絕對定位到外側 */}
          <div style={{ position: 'relative' }}>
            {/* 左箭頭 — 超出左邊界 */}
            <button
              onClick={() => setFreeSlide(i => Math.max(0, i - 1))}
              disabled={freeSlide === 0}
              style={{
                position: 'absolute',
                left: '-48px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px', height: '36px',
                background: '#FFFFFF',
                border: '0.5px solid #E5E5EE',
                borderRadius: '999px',
                cursor: freeSlide === 0 ? 'default' : 'pointer',
                fontSize: '16px',
                color: freeSlide === 0 ? '#C5C5D8' : '#1A1A2E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'inherit',
                transition: 'color 0.15s',
                zIndex: 1,
              }}
            >‹</button>

            {/* Card track */}
            <div ref={carouselRef} style={{ overflow: 'hidden' }}>
              <div style={{
                display: 'flex',
                gap: `${GAP}px`,
                transform: `translateX(${-freeSlide * (cardW + GAP)}px)`,
                transition: 'transform 0.3s ease',
              }}>
                {freeCourses.map(course => (
                  <div key={course.id} style={{ flexShrink: 0, width: `${cardW}px`, display: 'flex' }}>
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            </div>

            {/* 右箭頭 — 超出右邊界 */}
            <button
              onClick={() => setFreeSlide(i => Math.min(maxSlide, i + 1))}
              disabled={freeSlide === maxSlide}
              style={{
                position: 'absolute',
                right: '-48px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px', height: '36px',
                background: '#FFFFFF',
                border: '0.5px solid #E5E5EE',
                borderRadius: '999px',
                cursor: freeSlide === maxSlide ? 'default' : 'pointer',
                fontSize: '16px',
                color: freeSlide === maxSlide ? '#C5C5D8' : '#1A1A2E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'inherit',
                transition: 'color 0.15s',
                zIndex: 1,
              }}
            >›</button>
          </div>
        </section>

        {/* 付費課程 */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
              付費課程
            </p>
            <select
              value={courseType}
              onChange={e => setCourseType(e.target.value)}
              style={{
                background: '#FFFFFF',
                border: '0.5px solid #C5C5D8',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '14px',
                color: '#1A1A2E',
                cursor: 'pointer',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            >
              {COURSE_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {paidCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

      </div>
    </Layout>
  )
}

// ─── Auth Modal ───────────────────────────────────────────────────────────────

function AuthModal({ onClose }) {
  const [view, setView] = useState('login') // 'login' | 'register' | 'forgot'

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26, 26, 46, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '24px',
      }}
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-44px',
            right: '0',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#FFFFFF',
            fontSize: '22px',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            opacity: 0.8,
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
          aria-label="關閉"
        >
          ✕
        </button>

        <div style={{
          background: '#FFFFFF',
          border: '0.5px solid #E5E5EE',
          borderRadius: '16px',
          padding: '40px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}>
          {view === 'login'    && <LoginForm    onSwitch={setView} onClose={onClose} />}
          {view === 'register' && <RegisterForm onSwitch={setView} />}
          {view === 'forgot'   && <ForgotForm   onSwitch={setView} />}
        </div>
      </div>
    </div>
  )
}

// ── Login ──────────────────────────────────────────────────────────────────────

function LoginForm({ onSwitch, onClose }) {
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
    <>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <p style={{ fontSize: '22px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 8px' }}>Soking 學習中心</p>
        <p style={{ fontSize: '14px', color: '#6B6B80', margin: 0 }}>登入你的帳號繼續學習</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={modalLabelStyle}>電子郵件</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocus('email')} onBlur={() => setFocus('')}
            placeholder="name@example.com" required style={modalInputStyle(focus === 'email')} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={modalLabelStyle}>密碼</label>
            <button type="button" onClick={() => onSwitch('forgot')} style={modalLinkBtn}>忘記密碼？</button>
          </div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            onFocus={() => setFocus('password')} onBlur={() => setFocus('')}
            placeholder="輸入密碼" required style={modalInputStyle(focus === 'password')} />
        </div>
        {error && <p style={{ fontSize: '13px', color: '#C04828', margin: 0 }}>{error}</p>}
        <button type="submit" disabled={loading}
          style={{ ...modalPrimaryBtn, opacity: loading ? 0.7 : 1, cursor: loading ? 'default' : 'pointer' }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#3D34B8' }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#4A3FD6' }}>
          {loading ? '登入中…' : '登入'}
        </button>
      </form>

      <div style={{ borderTop: '0.5px solid #E5E5EE', margin: '24px 0' }} />
      <p style={{ textAlign: 'center', fontSize: '13px', color: '#6B6B80', margin: 0 }}>
        還沒有帳號？{' '}
        <button type="button" onClick={() => onSwitch('register')} style={{ ...modalLinkBtn, fontWeight: '500' }}>立即註冊</button>
      </p>
    </>
  )
}

// ── Register ───────────────────────────────────────────────────────────────────

function RegisterForm({ onSwitch }) {
  const [form, setForm]     = useState({ name: '', email: '', password: '', confirm: '' })
  const [focus, setFocus]   = useState('')
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone]     = useState(false)

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('兩次輸入的密碼不一致'); return }
    if (form.password.length < 8) { setError('密碼至少需要 8 個字元'); return }
    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({
      email: form.email, password: form.password,
      options: { data: { name: form.name } },
    })
    setLoading(false)
    if (authError) { setError(authError.message) } else { setDone(true) }
  }

  const fields = [
    { key: 'name',     label: '姓名',     type: 'text',     placeholder: '你的名字' },
    { key: 'email',    label: '電子郵件', type: 'email',    placeholder: 'name@example.com' },
    { key: 'password', label: '密碼',     type: 'password', placeholder: '至少 8 個字元' },
    { key: 'confirm',  label: '確認密碼', type: 'password', placeholder: '再輸入一次密碼' },
  ]

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <p style={{ fontSize: '22px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 8px' }}>建立你的帳號</p>
        <p style={{ fontSize: '14px', color: '#6B6B80', margin: 0 }}>加入 Soking，開始你的 UXR 學習旅程</p>
      </div>

      {done ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', background: '#E4F7EE', borderRadius: '999px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 11L9 16L18 7" stroke="#1D9E75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ fontSize: '18px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 8px' }}>帳號建立成功</p>
          <p style={{ fontSize: '14px', color: '#6B6B80', margin: '0 0 24px', lineHeight: '1.7' }}>
            請前往 <strong style={{ color: '#1A1A2E' }}>{form.email}</strong> 收件匣，<br />
            點擊驗證信中的連結完成認證。
          </p>
          <button onClick={() => onSwitch('login')} style={modalPrimaryBtn}
            onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
            onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}>
            前往登入
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {fields.map(({ key, label, type, placeholder }) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={modalLabelStyle}>{label}</label>
              <input type={type} value={form[key]} onChange={set(key)}
                onFocus={() => setFocus(key)} onBlur={() => setFocus('')}
                placeholder={placeholder} required style={modalInputStyle(focus === key)} />
            </div>
          ))}
          {error && <p style={{ fontSize: '13px', color: '#C04828', margin: 0 }}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{ ...modalPrimaryBtn, marginTop: '4px', opacity: loading ? 0.7 : 1, cursor: loading ? 'default' : 'pointer' }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#3D34B8' }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#4A3FD6' }}>
            {loading ? '建立中…' : '建立帳號'}
          </button>
        </form>
      )}

      <div style={{ borderTop: '0.5px solid #E5E5EE', margin: '24px 0' }} />
      <p style={{ textAlign: 'center', fontSize: '13px', color: '#6B6B80', margin: 0 }}>
        已經有帳號？{' '}
        <button type="button" onClick={() => onSwitch('login')} style={{ ...modalLinkBtn, fontWeight: '500' }}>立即登入</button>
      </p>
    </>
  )
}

// ── Forgot Password ────────────────────────────────────────────────────────────

function ForgotForm({ onSwitch }) {
  const [email, setEmail]         = useState('')
  const [focus, setFocus]         = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {!submitted ? (
        <>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <p style={{ fontSize: '22px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 8px' }}>忘記密碼</p>
            <p style={{ fontSize: '14px', color: '#6B6B80', margin: 0, lineHeight: '1.7' }}>
              輸入你的電子郵件，<br />我們會寄送重設密碼的連結給你。
            </p>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={modalLabelStyle}>電子郵件</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                placeholder="name@example.com" required style={modalInputStyle(focus)} />
            </div>
            <button type="submit" style={modalPrimaryBtn}
              onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
              onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}>
              寄送重設連結
            </button>
          </form>
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', background: '#E4F7EE', borderRadius: '999px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 11L9 16L18 7" stroke="#1D9E75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ fontSize: '18px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 8px' }}>連結已寄出</p>
          <p style={{ fontSize: '14px', color: '#6B6B80', margin: '0 0 24px', lineHeight: '1.7' }}>
            請檢查 <strong style={{ color: '#1A1A2E' }}>{email}</strong> 的收件匣，<br />
            並點擊信中的連結重設密碼。
          </p>
        </div>
      )}

      <div style={{ borderTop: '0.5px solid #E5E5EE', margin: '24px 0' }} />
      <p style={{ textAlign: 'center', fontSize: '13px', color: '#6B6B80', margin: 0 }}>
        <button type="button" onClick={() => onSwitch('login')} style={{ ...modalLinkBtn, fontWeight: '500' }}>
          ← 返回登入
        </button>
      </p>
    </>
  )
}

// ── Modal shared styles ────────────────────────────────────────────────────────

const modalLabelStyle = {
  fontSize: '13px',
  fontWeight: '500',
  color: '#1A1A2E',
}

const modalInputStyle = (focused) => ({
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

const modalPrimaryBtn = {
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

const modalLinkBtn = {
  background: 'none',
  border: 'none',
  padding: 0,
  fontSize: '13px',
  color: '#4A3FD6',
  cursor: 'pointer',
  fontFamily: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
  textDecoration: 'none',
}

// ─── Countdown ────────────────────────────────────────────────────────────────

function Countdown({ targetDate, targetTime }) {
  const getRemaining = () => {
    const target = new Date(`${targetDate}T${targetTime}:00`)
    const diff = target - new Date()
    if (diff <= 0) return null
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    }
  }

  const [remaining, setRemaining] = useState(getRemaining)

  useEffect(() => {
    const timer = setInterval(() => setRemaining(getRemaining()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!remaining) return null

  const units = [
    { label: '天', value: remaining.days },
    { label: '時', value: remaining.hours },
    { label: '分', value: remaining.minutes },
    { label: '秒', value: remaining.seconds },
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
      <span style={{ fontSize: '12px', color: '#9999AA' }}>距離直播</span>
      {units.map(u => (
        <div key={u.label} style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
          <span style={{
            fontSize: '15px',
            fontWeight: '500',
            color: '#4A3FD6',
            minWidth: '20px',
            textAlign: 'right',
          }}>
            {String(u.value).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '12px', color: '#6B6B80' }}>{u.label}</span>
        </div>
      ))}
    </div>
  )
}
