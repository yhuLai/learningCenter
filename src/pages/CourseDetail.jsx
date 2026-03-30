import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'

// mock 資料，之後串接 Supabase（與 OnlineCourses 同步）
const allCourses = [
  // ── 免費課程 ──────────────────────────────────────────────
  {
    id: 1,
    free: true,
    title: 'UXR 基礎研究方法',
    type: 'UI/UX職涯發展',
    stage: 'R1',
    desc: '學習 UXR 的核心研究框架，從零建立研究思維。本課程帶你了解常見的質性與量化研究方法，掌握選擇合適研究方法的判斷邏輯，並透過實際案例建立對用戶研究的整體認識。',
    hours: 2,
    units: ['單元一：什麼是 UXR？', '單元二：質性 vs 量化研究', '單元三：研究方法選擇邏輯', '單元四：研究流程概覽'],
    instructor: { name: 'Soking', bio: '資深 UXR 研究員，擁有超過 8 年的用戶研究經驗，曾服務於多家科技公司與設計顧問公司。專注於質性研究方法、研究洞察轉化與研究團隊建立。' },
  },
  {
    id: 6,
    free: true,
    title: 'UXR 報告撰寫技巧',
    type: 'UI/UX職涯發展',
    stage: 'R2',
    desc: '學習如何撰寫具說服力的研究報告與建議。本課程涵蓋報告結構設計、洞察呈現方式與行動建議撰寫，幫助你將研究發現有效傳遞給利害關係人。',
    hours: 2,
    units: ['單元一：研究報告的目的與受眾', '單元二：報告結構設計', '單元三：洞察的呈現方式', '單元四：行動建議撰寫技巧'],
    instructor: { name: 'Soking', bio: '資深 UXR 研究員，擁有超過 8 年的用戶研究經驗，曾服務於多家科技公司與設計顧問公司。專注於質性研究方法、研究洞察轉化與研究團隊建立。' },
  },
  {
    id: 11,
    free: true,
    title: '研究倫理與訪談同意書',
    type: 'UI/UX職涯發展',
    stage: 'R1',
    desc: '了解 UXR 研究倫理規範，學習如何正確取得受訪者同意。課程涵蓋研究倫理基本原則、同意書設計要點，以及在不同研究情境下保護受訪者隱私的實務做法。',
    hours: 1,
    units: ['單元一：研究倫理基本原則', '單元二：知情同意的重要性', '單元三：同意書設計要點', '單元四：常見倫理問題與處理方式'],
    instructor: { name: 'Soking', bio: '資深 UXR 研究員，擁有超過 8 年的用戶研究經驗，曾服務於多家科技公司與設計顧問公司。專注於質性研究方法、研究洞察轉化與研究團隊建立。' },
  },
  {
    id: 12,
    free: true,
    title: '競品分析入門',
    type: 'UI/UX職涯發展',
    stage: 'R1',
    desc: '系統性地拆解競品，找出市場機會與設計缺口。本課程教你建立競品分析框架，從功能比較、用戶體驗評估到洞察整合，幫助你為產品決策提供有力的研究依據。',
    hours: 2,
    units: ['單元一：競品分析的目的與框架', '單元二：競品選擇與資料蒐集', '單元三：功能與體驗比較分析', '單元四：洞察整合與機會識別'],
    instructor: { name: 'Soking', bio: '資深 UXR 研究員，擁有超過 8 年的用戶研究經驗，曾服務於多家科技公司與設計顧問公司。專注於質性研究方法、研究洞察轉化與研究團隊建立。' },
  },
  {
    id: 13,
    free: true,
    title: 'PM 入門：從需求到驗證',
    type: 'PM職涯發展',
    stage: 'R1',
    desc: '帶你了解 PM 如何定義問題、拆解需求並設計驗證方案。課程以實際產品案例為基礎，幫助你建立 PM 思維，學習如何將模糊的業務目標轉化為可執行的產品需求。',
    hours: 3,
    units: ['單元一：PM 的核心職責', '單元二：問題定義與需求拆解', '單元三：驗證假設的方法', '單元四：從需求到功能規格'],
    instructor: { name: 'Soking', bio: '資深 UXR 研究員，擁有超過 8 年的用戶研究經驗，曾服務於多家科技公司與設計顧問公司。專注於質性研究方法、研究洞察轉化與研究團隊建立。' },
  },
  // ── 付費課程 ──────────────────────────────────────────────
  {
    id: 2,
    title: '使用者訪談技巧',
    type: 'UI/UX職涯發展',
    stage: 'R1',
    price: 2800,
    desc: '深入掌握訪談規劃、引導與分析的完整流程。本課程將帶你從研究目標設定開始，系統性地學習如何設計訪談問題、建立受訪者信任感、引導深度對話，並在訪後進行有效的資料整理與洞察萃取。適合想要提升質性研究能力的 UXR 學習者。',
    hours: 6,
    units: ['單元一：訪談前的研究目標設定', '單元二：問題設計與訪談腳本', '單元三：訪談中的引導技巧', '單元四：資料整理與洞察分析'],
    instructor: { name: 'Soking', bio: '資深 UXR 研究員，擁有超過 8 年的用戶研究經驗，曾服務於多家科技公司與設計顧問公司。專注於質性研究方法、研究洞察轉化與研究團隊建立。' },
  },
  {
    id: 3,
    title: '問卷設計與分析',
    type: 'UI/UX職涯發展',
    stage: 'R2',
    price: 3200,
    desc: '學習如何設計有效問卷並進行量化資料分析。本課程涵蓋問卷設計原則、量表選擇、題目順序規劃，以及收集資料後的統計分析基礎，幫助你將數字轉化為有意義的研究洞察。',
    hours: 8,
    units: ['單元一：研究目標與問卷設計概論', '單元二：問題類型與量表設計', '單元三：問卷發放與樣本策略', '單元四：資料分析與結果呈現'],
    instructor: { name: 'Soking', bio: '資深 UXR 研究員，擁有超過 8 年的用戶研究經驗，曾服務於多家科技公司與設計顧問公司。專注於質性研究方法、研究洞察轉化與研究團隊建立。' },
  },
  {
    id: 4,
    title: 'Usability Testing 實戰',
    type: 'UI/UX職涯發展',
    stage: 'R3',
    price: 3600,
    desc: '從規劃到執行，完整體驗易用性測試流程。課程將帶你設計測試任務、招募受測者、主持測試，並分析測試結果，最終產出具有說服力的設計改善建議。',
    hours: 10,
    units: ['單元一：易用性測試概念與規劃', '單元二：測試任務設計', '單元三：主持技巧與觀察記錄', '單元四：資料分析與報告撰寫'],
    instructor: { name: 'Soking', bio: '資深 UXR 研究員，擁有超過 8 年的用戶研究經驗，曾服務於多家科技公司與設計顧問公司。專注於質性研究方法、研究洞察轉化與研究團隊建立。' },
  },
  {
    id: 5,
    title: '研究資料視覺化',
    type: 'UI/UX職涯發展',
    stage: 'R2',
    price: 2800,
    desc: '將複雜研究資料轉化為清晰易懂的視覺呈現。學習如何選擇合適的圖表類型、設計視覺化報告，以及用故事線串聯數據，讓你的研究成果更具說服力。',
    hours: 7,
    units: ['單元一：資料視覺化基礎原則', '單元二：圖表類型選擇指南', '單元三：研究報告視覺化實作', '單元四：資料故事化與呈現技巧'],
    instructor: { name: 'Soking', bio: '資深 UXR 研究員，擁有超過 8 年的用戶研究經驗，曾服務於多家科技公司與設計顧問公司。專注於質性研究方法、研究洞察轉化與研究團隊建立。' },
  },
  {
    id: 7,
    title: 'PM 需求訪談與用戶研究',
    type: 'PM職涯發展',
    stage: 'R2',
    price: 3200,
    desc: '從 PM 視角出發，學習如何運用 UXR 方法驗證需求。課程結合產品管理與用戶研究的實務場景，幫助 PM 建立以用戶為中心的需求探索流程。',
    hours: 8,
    units: ['單元一：PM 的用戶研究思維', '單元二：需求訪談設計', '單元三：用戶洞察轉化為產品需求', '單元四：研究成果向上溝通技巧'],
    instructor: { name: 'Soking', bio: '資深 UXR 研究員，擁有超過 8 年的用戶研究經驗，曾服務於多家科技公司與設計顧問公司。專注於質性研究方法、研究洞察轉化與研究團隊建立。' },
  },
  {
    id: 8,
    title: '產品指標設計與分析',
    type: 'PM職涯發展',
    stage: 'R3',
    price: 3600,
    desc: '學習如何設定產品 KPI 並透過數據驅動決策。本課程教你建立指標體系、追蹤關鍵數據，並結合質性研究洞察，做出有依據的產品方向判斷。',
    hours: 9,
    units: ['單元一：產品指標體系設計', '單元二：北極星指標與 OKR 對齊', '單元三：數據分析基礎', '單元四：指標驅動的產品決策'],
    instructor: { name: 'Soking', bio: '資深 UXR 研究員，擁有超過 8 年的用戶研究經驗，曾服務於多家科技公司與設計顧問公司。專注於質性研究方法、研究洞察轉化與研究團隊建立。' },
  },
  {
    id: 9,
    title: '服務藍圖與顧客旅程',
    type: '服務設計系列',
    stage: 'R2',
    price: 2800,
    desc: '以系統視角繪製服務藍圖，找出關鍵接觸點。課程帶你從顧客旅程地圖出發，延伸至服務藍圖的繪製方法，幫助組織識別服務缺口並提出改善方向。',
    hours: 7,
    units: ['單元一：服務設計思維概論', '單元二：顧客旅程地圖繪製', '單元三：服務藍圖設計方法', '單元四：接觸點優化與改善提案'],
    instructor: { name: 'Soking', bio: '資深 UXR 研究員，擁有超過 8 年的用戶研究經驗，曾服務於多家科技公司與設計顧問公司。專注於質性研究方法、研究洞察轉化與研究團隊建立。' },
  },
  {
    id: 10,
    title: '服務設計工作坊方法論',
    type: '服務設計系列',
    stage: 'R3',
    price: 3600,
    desc: '掌握服務設計全流程，帶領跨部門共創工作坊。本課程聚焦於工作坊的設計與引導技巧，幫助你有效促進跨部門協作，共同創造以用戶為中心的服務解決方案。',
    hours: 10,
    units: ['單元一：服務設計工作坊概論', '單元二：工作坊流程設計', '單元三：引導技巧與工具運用', '單元四：成果整合與後續行動'],
    instructor: { name: 'Soking', bio: '資深 UXR 研究員，擁有超過 8 年的用戶研究經驗，曾服務於多家科技公司與設計顧問公司。專注於質性研究方法、研究洞察轉化與研究團隊建立。' },
  },
]

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = allCourses.find(c => c.id === Number(id))

  if (!course) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#6B6B80' }}>
          找不到課程，<button onClick={() => navigate('/online-courses')} style={{ color: '#4A3FD6', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>返回線上課程</button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* 麵包屑 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#9999AA', marginBottom: '28px' }}>
          <span onClick={() => navigate('/online-courses')} style={{ cursor: 'pointer', color: '#6B6B80' }}>線上課程</span>
          <span>/</span>
          <span style={{ color: '#1A1A2E', fontWeight: '500' }}>{course.title}</span>
        </div>

        {/* 主內容：左右兩欄 */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>

          {/* 左側 — 課程詳細資訊 */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* 類型 tag */}
            <span style={{
              display: 'inline-block',
              fontSize: '12px',
              color: '#6B6B80',
              background: '#F7F7F8',
              borderRadius: '4px',
              padding: '2px 8px',
              marginBottom: '12px',
            }}>
              {course.type}
            </span>

            {/* 課程標題 */}
            <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 16px', lineHeight: 1.4 }}>
              {course.title}
            </h1>

            {/* 課程介紹 */}
            <p style={{ fontSize: '14px', color: '#6B6B80', lineHeight: 1.8, margin: '0 0 32px' }}>
              {course.desc}
            </p>

            {/* 分隔線 */}
            <div style={{ borderTop: '0.5px solid #E5E5EE', marginBottom: '28px' }} />

            {/* 課程單元 */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 14px' }}>課程單元</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {course.units.map((unit, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    background: '#F7F7F8',
                    borderRadius: '8px',
                    border: '0.5px solid #E5E5EE',
                  }}>
                    <span style={{
                      width: '24px', height: '24px',
                      borderRadius: '50%',
                      background: '#EEF0FD',
                      color: '#4A3FD6',
                      fontSize: '12px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: '14px', color: '#1A1A2E' }}>{unit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 分隔線 */}
            <div style={{ borderTop: '0.5px solid #E5E5EE', marginBottom: '28px' }} />

            {/* 講師 */}
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 14px' }}>講師</h2>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                {/* 大頭照佔位 */}
                <div style={{
                  width: '48px', height: '48px',
                  borderRadius: '50%',
                  background: '#F7F7F8',
                  border: '0.5px solid #E5E5EE',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#9999AA',
                }}>
                  照片
                </div>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: '0 0 6px' }}>
                    {course.instructor.name}
                  </p>
                  <p style={{ fontSize: '13px', color: '#6B6B80', margin: 0, lineHeight: 1.7 }}>
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* 右側 — 封面圖 + 資訊 Card */}
          <div style={{ width: '280px', flexShrink: 0, position: 'sticky', top: '40px' }}>
            <div style={{
              background: '#FFFFFF',
              border: '0.5px solid #E5E5EE',
              borderRadius: '12px',
              overflow: 'hidden',
            }}>
              {/* 封面圖片 */}
              <div style={{
                height: '160px',
                background: '#F7F7F8',
                borderBottom: '0.5px solid #E5E5EE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: '12px', color: '#9999AA' }}>封面圖片</span>
              </div>

              {/* 資訊 Card */}
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '22px', fontWeight: '500', color: course.free ? '#0F6E56' : '#1A1A2E', marginBottom: '16px' }}>
                  {course.free ? '免費' : `NT$ ${course.price?.toLocaleString()}`}
                </div>

                <button
                  onClick={() => !course.free && navigate('/payment')}
                  style={{
                    width: '100%',
                    background: '#4A3FD6',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontFamily: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
                  onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
                >
                  {course.free ? '立即領取' : '立即購買'}
                </button>

                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#9999AA' }}>課程類型</span>
                    <span style={{ color: '#1A1A2E' }}>{course.type}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#9999AA' }}>課程長度</span>
                    <span style={{ color: '#1A1A2E' }}>{course.hours} 小時</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#9999AA' }}>單元數量</span>
                    <span style={{ color: '#1A1A2E' }}>{course.units.length} 個單元</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}
