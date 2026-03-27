import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── 問題資料（未來可在此修改題目、選項、是否多選）────────────────────────────

const QUESTIONS = [
  {
    id: 'role',
    step: 1,
    title: '你想成為什麼樣的人？',
    subtitle: '我們會根據你的目標，推薦最適合的學習路徑',
    multiple: false,
    options: [
      { value: 'uxr',      label: 'UXR 研究員',   desc: '研究使用者行為與需求，以洞察驅動產品決策' },
      { value: 'designer', label: '產品設計師',    desc: '設計直覺易用的產品體驗，解決真實問題' },
      { value: 'pm',       label: '產品經理',      desc: '協調資源、定義方向，推動產品持續成長' },
      { value: 'service',  label: '服務設計師',    desc: '以系統視角優化端到端的服務體驗' },
    ],
  },
  {
    id: 'gap',
    step: 2,
    title: '你目前感受到哪些缺口？',
    subtitle: '可以選擇多個，讓我們更了解你現在的狀況',
    multiple: true,
    options: [
      { value: 'method',       label: '研究方法不夠紮實',   desc: '不確定什麼情境該用什麼方法' },
      { value: 'project',      label: '缺乏實際專案經驗',   desc: '課堂所學與實務之間落差很大' },
      { value: 'communicate',  label: '不擅長溝通研究成果', desc: '研究做完卻說不動利害關係人' },
      { value: 'career',       label: '對職涯方向感到迷茫', desc: '不確定自己下一步該怎麼走' },
    ],
  },
  {
    id: 'growth',
    step: 3,
    title: '你偏好如何成長？',
    subtitle: '選擇最符合你學習風格的方式',
    multiple: false,
    options: [
      { value: 'project',   label: '透過實作專案學習', desc: '邊做邊學，在真實情境中累積經驗' },
      { value: 'course',    label: '有系統地跟著課程', desc: '按部就班，建立完整的知識框架' },
      { value: 'community', label: '社群與同伴互助',   desc: '在討論與分享中獲得靈感與動力' },
      { value: 'mentor',    label: '接受導師直接指導', desc: '獲得針對個人狀況的建議與 Review' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────

export default function OKRSetup() {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState({})   // { role: 'uxr', gap: ['method','project'], growth: 'course' }
  const navigate              = useNavigate()

  const q        = QUESTIONS[step]
  const total    = QUESTIONS.length
  const selected = answers[q.id] ?? (q.multiple ? [] : null)

  const toggle = (value) => {
    if (q.multiple) {
      const prev = answers[q.id] ?? []
      const next = prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      setAnswers(a => ({ ...a, [q.id]: next }))
    } else {
      setAnswers(a => ({ ...a, [q.id]: value }))
    }
  }

  const isSelected = (value) =>
    q.multiple ? (selected ?? []).includes(value) : selected === value

  const canNext = q.multiple
    ? (selected ?? []).length > 0
    : selected !== null

  const handleNext = () => {
    if (step < total - 1) {
      setStep(s => s + 1)
    } else {
      // TODO: 儲存 OKR 答案至 Supabase
      navigate('/okr-result')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F7F7F8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      fontFamily: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
    }}>

      {/* 進度指示 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '48px' }}>
        {QUESTIONS.map((_, i) => (
          <div key={i} style={{
            height: '4px',
            width: i === step ? '32px' : '16px',
            borderRadius: '999px',
            background: i <= step ? '#4A3FD6' : '#E5E5EE',
            transition: 'all 0.3s ease',
          }} />
        ))}
        <span style={{ fontSize: '12px', color: '#9999AA', marginLeft: '8px' }}>
          {step + 1} / {total}
        </span>
      </div>

      {/* 問題卡片 */}
      <div style={{
        background: '#FFFFFF',
        border: '0.5px solid #E5E5EE',
        borderRadius: '16px',
        padding: '48px',
        width: '100%',
        maxWidth: '600px',
      }}>

        {/* 問題標題 */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '22px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 8px' }}>
            {q.title}
          </p>
          <p style={{ fontSize: '14px', color: '#6B6B80', margin: 0 }}>
            {q.subtitle}
          </p>
        </div>

        {/* 選項 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '40px',
        }}>
          {q.options.map(opt => {
            const active = isSelected(opt.value)
            return (
              <button
                key={opt.value}
                onClick={() => toggle(opt.value)}
                style={{
                  background: active ? '#EEF0FD' : '#FFFFFF',
                  border: active ? '1.5px solid #4A3FD6' : '0.5px solid #E5E5EE',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  if (!active) e.currentTarget.style.borderColor = '#C5C5D8'
                }}
                onMouseLeave={e => {
                  if (!active) e.currentTarget.style.borderColor = '#E5E5EE'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
                    {opt.label}
                  </p>
                  {/* 選取勾勾 */}
                  {active && (
                    <div style={{
                      width: '18px', height: '18px', flexShrink: 0,
                      background: '#4A3FD6', borderRadius: '999px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
                <p style={{ fontSize: '12px', color: active ? '#4A3FD6' : '#6B6B80', margin: 0, lineHeight: '1.5' }}>
                  {opt.desc}
                </p>
              </button>
            )
          })}
        </div>

        {/* 導覽按鈕 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {step > 0 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              style={ghostBtn}
              onMouseEnter={e => e.currentTarget.style.color = '#1A1A2E'}
              onMouseLeave={e => e.currentTarget.style.color = '#6B6B80'}
            >
              ← 上一步
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            disabled={!canNext}
            style={{
              ...primaryBtn,
              opacity: canNext ? 1 : 0.4,
              cursor: canNext ? 'pointer' : 'default',
            }}
            onMouseEnter={e => { if (canNext) e.currentTarget.style.background = '#3D34B8' }}
            onMouseLeave={e => { if (canNext) e.currentTarget.style.background = '#4A3FD6' }}
          >
            {step < total - 1 ? '下一步 →' : '完成設定'}
          </button>
        </div>

      </div>

      {/* 跳過 */}
      <button
        onClick={() => navigate('/')}
        style={{ ...ghostBtn, marginTop: '20px', fontSize: '13px' }}
        onMouseEnter={e => e.currentTarget.style.color = '#1A1A2E'}
        onMouseLeave={e => e.currentTarget.style.color = '#9999AA'}
      >
        暫時跳過
      </button>

    </div>
  )
}

// ─── styles ──────────────────────────────────────────────────────────────────

const primaryBtn = {
  background: '#4A3FD6',
  color: '#FFFFFF',
  border: 'none',
  padding: '10px 24px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  fontFamily: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
  transition: 'background 0.15s ease',
}

const ghostBtn = {
  background: 'none',
  border: 'none',
  padding: '8px 0',
  fontSize: '14px',
  color: '#6B6B80',
  cursor: 'pointer',
  fontFamily: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
  transition: 'color 0.15s ease',
}
