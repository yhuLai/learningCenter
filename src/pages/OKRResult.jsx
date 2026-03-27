import { useNavigate } from 'react-router-dom'

// ─── OKR 內容（未來可串接 Supabase 讀取使用者設定的目標）────────────────────

const OKR = {
  objective: '成為產品專家',
  keyResults: [
    '搞定一個從 0 到 1 的產品',
    '受邀擔任產品經理研討會 2 次',
    '完成 3 個以上的用戶訪談專案',
    '建立一份完整的產品研究作品集',
    '取得 Soking UXR R2 等級認證',
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

export default function OKRResult() {
  const navigate = useNavigate()

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
      <div style={{
        background: '#FFFFFF',
        border: '0.5px solid #E5E5EE',
        borderRadius: '16px',
        padding: '48px',
        width: '100%',
        maxWidth: '520px',
      }}>

        {/* 完成圖示 */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px', height: '56px',
            background: '#EEF0FD',
            borderRadius: '999px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M13 3L16 10L24 11L18 17L19.5 25L13 21.5L6.5 25L8 17L2 11L10 10L13 3Z"
                fill="#4A3FD6" fillOpacity="0.2" stroke="#4A3FD6" strokeWidth="1.5"
                strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ fontSize: '13px', color: '#6B6B80', margin: '0 0 6px', fontWeight: '500', letterSpacing: '0.5px' }}>
            你的學習 OKR
          </p>
          <p style={{ fontSize: '13px', color: '#9999AA', margin: 0 }}>
            根據你的回答，我們幫你整理了以下目標
          </p>
        </div>

        {/* 目標 */}
        <div style={{
          background: '#EEF0FD',
          border: '0.5px solid #4A3FD640',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '20px',
        }}>
          <p style={{ fontSize: '11px', fontWeight: '500', color: '#4A3FD6', margin: '0 0 6px', letterSpacing: '0.8px' }}>
            OBJECTIVE
          </p>
          <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
            {OKR.objective}
          </p>
        </div>

        {/* 關鍵成果 */}
        <div style={{
          background: '#FFFFFF',
          border: '0.5px solid #E5E5EE',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '32px',
        }}>
          <p style={{ fontSize: '11px', fontWeight: '500', color: '#6B6B80', margin: '0 0 16px', letterSpacing: '0.8px' }}>
            KEY RESULTS
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {OKR.keyResults.map((kr, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{
                  width: '20px', height: '20px', flexShrink: 0,
                  background: '#F7F7F8',
                  border: '0.5px solid #E5E5EE',
                  borderRadius: '999px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: '1px',
                }}>
                  <span style={{ fontSize: '11px', fontWeight: '500', color: '#9999AA' }}>
                    {i + 1}
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#1A1A2E', margin: 0, lineHeight: '1.6' }}>
                  {kr}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/login')}
          style={{
            background: '#4A3FD6',
            color: '#FFFFFF',
            border: 'none',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'background 0.15s ease',
            width: '100%',
            marginBottom: '12px',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
          onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
        >
          立即登入，實現目標更輕鬆
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#9999AA', margin: 0 }}>
          目標會儲存在你的學習中心，隨時可以調整
        </p>

      </div>
    </div>
  )
}
