/**
 * courses.js — 統一課程資料來源
 *
 * 這是整個專案唯一的課程 mock 資料檔，之後串接 Supabase 時只需替換此處。
 *
 * 欄位說明：
 *   id          : 課程唯一識別碼
 *   title       : 課程名稱
 *   type        : 課程類型（UI/UX職涯發展 | PM職涯發展 | 服務設計系列）
 *   stage       : 認證等級（R1 | R2 | R3 | R4）
 *   free        : 是否免費
 *   price       : 售價（免費課程不需填）
 *   desc        : 短描述（用於課程卡片）
 *   overview    : 長描述（用於課程總覽頁）
 *   hours       : 課程總時長（小時）
 *   instructor  : 講師資訊 { name, bio }
 *   chapters    : 章節列表，每章 { id, label, title, desc, duration, videoUrl }
 *   progress    : 使用者學習進度 0–100（未來改從 Supabase user_progress 取得）
 */

const INSTRUCTOR_DEFAULT = {
  name: 'Soking',
  bio: '資深 UXR 研究員，擁有超過 8 年的用戶研究經驗，曾服務於多家科技公司與設計顧問公司。專注於質性研究方法、研究洞察轉化與研究團隊建立。',
}

export const courses = [
  // ── 免費課程 ────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'UXR 基礎研究方法',
    type: 'UI/UX職涯發展',
    stage: 'R1',
    free: true,
    desc: '學習 UXR 的核心研究框架，從零建立研究思維。',
    overview: '學習 UXR 的核心研究框架，從零建立研究思維。本課程帶你了解常見的質性與量化研究方法，掌握選擇合適研究方法的判斷邏輯，並透過實際案例建立對用戶研究的整體認識。',
    hours: 2,
    instructor: INSTRUCTOR_DEFAULT,
    progress: 60,
    chapters: [
      { id: 1, label: '章節一', title: '什麼是 UXR？', duration: '20 分鐘', videoUrl: '', desc: '介紹用戶體驗研究的定義、目標與在產品開發中的角色，幫助你建立對 UXR 的基本認識。' },
      { id: 2, label: '章節二', title: '質性 vs 量化研究', duration: '25 分鐘', videoUrl: '', desc: '比較質性與量化研究的差異、適用情境與優缺點，學習如何根據研究目標選擇合適的方法。' },
      { id: 3, label: '章節三', title: '研究方法選擇邏輯', duration: '20 分鐘', videoUrl: '', desc: '建立系統性的研究方法選擇框架，了解不同研究問題如何對應到最適合的研究工具。' },
      { id: 4, label: '章節四', title: '研究流程概覽', duration: '15 分鐘', videoUrl: '', desc: '完整走過一個 UXR 專案的生命週期，從問題定義、研究設計、執行到洞察呈現。' },
    ],
  },
  {
    id: 6,
    title: 'UXR 報告撰寫技巧',
    type: 'UI/UX職涯發展',
    stage: 'R2',
    free: true,
    desc: '學習如何撰寫具說服力的研究報告與建議。',
    overview: '學習如何撰寫具說服力的研究報告與建議。本課程涵蓋報告結構設計、洞察呈現方式與行動建議撰寫，幫助你將研究發現有效傳遞給利害關係人。',
    hours: 2,
    instructor: INSTRUCTOR_DEFAULT,
    progress: 30,
    chapters: [
      { id: 1, label: '章節一', title: '研究報告的目的與受眾', duration: '20 分鐘', videoUrl: '', desc: '了解不同受眾對研究報告的期待，學習如何依據受眾調整報告的深度與呈現方式。' },
      { id: 2, label: '章節二', title: '報告結構設計', duration: '25 分鐘', videoUrl: '', desc: '掌握研究報告的黃金結構：問題背景、研究方法、主要發現、洞察與行動建議。' },
      { id: 3, label: '章節三', title: '洞察的呈現方式', duration: '20 分鐘', videoUrl: '', desc: '學習如何用故事線串聯數據，將枯燥的研究結果轉化為引人入勝的洞察敘述。' },
      { id: 4, label: '章節四', title: '行動建議撰寫技巧', duration: '15 分鐘', videoUrl: '', desc: '撰寫具體、可執行的行動建議，讓利害關係人清楚知道下一步該做什麼。' },
    ],
  },
  {
    id: 11,
    title: '研究倫理與訪談同意書',
    type: 'UI/UX職涯發展',
    stage: 'R1',
    free: true,
    desc: '了解 UXR 研究倫理規範，學習如何正確取得受訪者同意。',
    overview: '了解 UXR 研究倫理規範，學習如何正確取得受訪者同意。課程涵蓋研究倫理基本原則、同意書設計要點，以及在不同研究情境下保護受訪者隱私的實務做法。',
    hours: 1,
    instructor: INSTRUCTOR_DEFAULT,
    progress: 100,
    chapters: [
      { id: 1, label: '章節一', title: '研究倫理基本原則', duration: '15 分鐘', videoUrl: '', desc: '介紹學術與業界通用的研究倫理原則，包含尊重自主、善意與公正原則。' },
      { id: 2, label: '章節二', title: '知情同意的重要性', duration: '15 分鐘', videoUrl: '', desc: '理解知情同意的法律與道德意義，了解在不同研究情境下如何確保受訪者充分知情。' },
      { id: 3, label: '章節三', title: '同意書設計要點', duration: '15 分鐘', videoUrl: '', desc: '學習設計清晰易懂的訪談同意書，涵蓋必要條款、語言簡化與格式規範。' },
      { id: 4, label: '章節四', title: '常見倫理問題與處理方式', duration: '15 分鐘', videoUrl: '', desc: '透過實際案例分析研究過程中常見的倫理困境，學習合適的處理策略。' },
    ],
  },
  {
    id: 12,
    title: '競品分析入門',
    type: 'UI/UX職涯發展',
    stage: 'R1',
    free: true,
    desc: '系統性地拆解競品，找出市場機會與設計缺口。',
    overview: '系統性地拆解競品，找出市場機會與設計缺口。本課程教你建立競品分析框架，從功能比較、用戶體驗評估到洞察整合，幫助你為產品決策提供有力的研究依據。',
    hours: 2,
    instructor: INSTRUCTOR_DEFAULT,
    progress: 0,
    chapters: [
      { id: 1, label: '章節一', title: '競品分析的目的與框架', duration: '20 分鐘', videoUrl: '', desc: '了解競品分析在產品研究中的定位，建立系統性的分析框架與評估維度。' },
      { id: 2, label: '章節二', title: '競品選擇與資料蒐集', duration: '25 分鐘', videoUrl: '', desc: '學習如何選擇具代表性的競品，以及透過多種管道蒐集可靠的競品資訊。' },
      { id: 3, label: '章節三', title: '功能與體驗比較分析', duration: '20 分鐘', videoUrl: '', desc: '運用結構化方法比較競品功能與用戶體驗，找出差異化機會與設計缺口。' },
      { id: 4, label: '章節四', title: '洞察整合與機會識別', duration: '15 分鐘', videoUrl: '', desc: '將競品分析結果整合成可行洞察，識別市場機會並形成產品改善建議。' },
    ],
  },
  {
    id: 13,
    title: 'PM 入門：從需求到驗證',
    type: 'PM職涯發展',
    stage: 'R1',
    free: true,
    desc: '帶你了解 PM 如何定義問題、拆解需求並設計驗證方案。',
    overview: '帶你了解 PM 如何定義問題、拆解需求並設計驗證方案。課程以實際產品案例為基礎，幫助你建立 PM 思維，學習如何將模糊的業務目標轉化為可執行的產品需求。',
    hours: 3,
    instructor: INSTRUCTOR_DEFAULT,
    progress: 15,
    chapters: [
      { id: 1, label: '章節一', title: 'PM 的核心職責', duration: '25 分鐘', videoUrl: '', desc: '了解產品經理在產品開發流程中的角色、職責範圍與跨部門協作方式。' },
      { id: 2, label: '章節二', title: '問題定義與需求拆解', duration: '30 分鐘', videoUrl: '', desc: '學習如何從模糊的業務目標中找出核心問題，並將其拆解為具體的用戶需求。' },
      { id: 3, label: '章節三', title: '驗證假設的方法', duration: '25 分鐘', videoUrl: '', desc: '介紹常見的需求驗證方法，包含用戶訪談、原型測試與 A/B 測試的運用時機。' },
      { id: 4, label: '章節四', title: '從需求到功能規格', duration: '20 分鐘', videoUrl: '', desc: '學習如何撰寫清晰的功能規格文件，讓設計師與工程師能夠準確理解產品需求。' },
    ],
  },

  // ── 付費課程 ────────────────────────────────────────────────────────────────
  {
    id: 2,
    title: '使用者訪談技巧',
    type: 'UI/UX職涯發展',
    stage: 'R1',
    free: false,
    price: 2800,
    desc: '深入掌握訪談規劃、引導與分析的完整流程。',
    overview: '深入掌握訪談規劃、引導與分析的完整流程。本課程將帶你從研究目標設定開始，系統性地學習如何設計訪談問題、建立受訪者信任感、引導深度對話，並在訪後進行有效的資料整理與洞察萃取。適合想要提升質性研究能力的 UXR 學習者。',
    hours: 6,
    instructor: INSTRUCTOR_DEFAULT,
    progress: 75,
    chapters: [
      { id: 1, label: '章節一', title: '訪談前的研究目標設定', duration: '40 分鐘', videoUrl: '', desc: '學習如何釐清研究目的、定義研究問題，並將目標轉化為訪談方向與受訪者條件。' },
      { id: 2, label: '章節二', title: '問題設計與訪談腳本', duration: '50 分鐘', videoUrl: '', desc: '掌握開放式問題的設計原則，撰寫引導自然對話的訪談腳本，避免引導性問題。' },
      { id: 3, label: '章節三', title: '訪談中的引導技巧', duration: '45 分鐘', videoUrl: '', desc: '學習如何建立訪談信任感、運用追問技巧挖掘深層動機，並在訪談中保持中立。' },
      { id: 4, label: '章節四', title: '資料整理與洞察分析', duration: '45 分鐘', videoUrl: '', desc: '從訪談紀錄中提取關鍵發現，運用親和圖等工具進行主題分析，形成研究洞察。' },
    ],
  },
  {
    id: 3,
    title: '問卷設計與分析',
    type: 'UI/UX職涯發展',
    stage: 'R2',
    free: false,
    price: 3200,
    desc: '學習如何設計有效問卷並進行量化資料分析。',
    overview: '學習如何設計有效問卷並進行量化資料分析。本課程涵蓋問卷設計原則、量表選擇、題目順序規劃，以及收集資料後的統計分析基礎，幫助你將數字轉化為有意義的研究洞察。',
    hours: 8,
    instructor: INSTRUCTOR_DEFAULT,
    progress: 40,
    chapters: [
      { id: 1, label: '章節一', title: '研究目標與問卷設計概論', duration: '55 分鐘', videoUrl: '', desc: '了解問卷研究的適用情境與限制，學習從研究目標推導出問卷結構的設計邏輯。' },
      { id: 2, label: '章節二', title: '問題類型與量表設計', duration: '60 分鐘', videoUrl: '', desc: '介紹各種題型（單選、多選、李克特量表等）的特性與選用原則，避免常見的問卷設計錯誤。' },
      { id: 3, label: '章節三', title: '問卷發放與樣本策略', duration: '50 分鐘', videoUrl: '', desc: '學習如何選擇問卷發放管道、估算樣本數量，以及確保樣本代表性的實務做法。' },
      { id: 4, label: '章節四', title: '資料分析與結果呈現', duration: '55 分鐘', videoUrl: '', desc: '掌握基礎統計分析方法，學習如何解讀問卷數據並將結果轉化為清晰的研究洞察。' },
    ],
  },
  {
    id: 4,
    title: 'Usability Testing 實戰',
    type: 'UI/UX職涯發展',
    stage: 'R3',
    free: false,
    price: 3600,
    desc: '從規劃到執行，完整體驗易用性測試流程。',
    overview: '從規劃到執行，完整體驗易用性測試流程。課程將帶你設計測試任務、招募受測者、主持測試，並分析測試結果，最終產出具有說服力的設計改善建議。',
    hours: 10,
    instructor: INSTRUCTOR_DEFAULT,
    progress: 0,
    chapters: [
      { id: 1, label: '章節一', title: '易用性測試概念與規劃', duration: '60 分鐘', videoUrl: '', desc: '了解易用性測試的目的與類型，學習如何制定測試計畫並定義成功標準。' },
      { id: 2, label: '章節二', title: '測試任務設計', duration: '60 分鐘', videoUrl: '', desc: '學習撰寫自然、無引導性的測試任務，並設計能有效揭露設計問題的情境腳本。' },
      { id: 3, label: '章節三', title: '主持技巧與觀察記錄', duration: '60 分鐘', videoUrl: '', desc: '掌握測試主持的關鍵技巧：保持中立、引導思考發聲，以及有效的觀察記錄方法。' },
      { id: 4, label: '章節四', title: '資料分析與報告撰寫', duration: '60 分鐘', videoUrl: '', desc: '從測試記錄中識別易用性問題，依嚴重程度分級，並撰寫包含改善建議的測試報告。' },
    ],
  },
  {
    id: 5,
    title: '研究資料視覺化',
    type: 'UI/UX職涯發展',
    stage: 'R2',
    free: false,
    price: 2800,
    desc: '將複雜研究資料轉化為清晰易懂的視覺呈現。',
    overview: '將複雜研究資料轉化為清晰易懂的視覺呈現。學習如何選擇合適的圖表類型、設計視覺化報告，以及用故事線串聯數據，讓你的研究成果更具說服力。',
    hours: 7,
    instructor: INSTRUCTOR_DEFAULT,
    progress: 90,
    chapters: [
      { id: 1, label: '章節一', title: '資料視覺化基礎原則', duration: '50 分鐘', videoUrl: '', desc: '了解視覺化的核心目的與設計原則，學習如何讓圖表清晰傳遞資訊而非造成誤解。' },
      { id: 2, label: '章節二', title: '圖表類型選擇指南', duration: '50 分鐘', videoUrl: '', desc: '系統性地介紹各種圖表類型的適用情境，建立選擇正確圖表的判斷邏輯。' },
      { id: 3, label: '章節三', title: '研究報告視覺化實作', duration: '50 分鐘', videoUrl: '', desc: '將質性與量化研究結果轉化為視覺化頁面，學習版面配置與視覺層次的設計技巧。' },
      { id: 4, label: '章節四', title: '資料故事化與呈現技巧', duration: '50 分鐘', videoUrl: '', desc: '運用故事結構串聯數據，讓研究報告不只是數字羅列，而是引人共鳴的洞察敘事。' },
    ],
  },
  {
    id: 7,
    title: 'PM 需求訪談與用戶研究',
    type: 'PM職涯發展',
    stage: 'R2',
    free: false,
    price: 3200,
    desc: '從 PM 視角出發，學習如何運用 UXR 方法驗證需求。',
    overview: '從 PM 視角出發，學習如何運用 UXR 方法驗證需求。課程結合產品管理與用戶研究的實務場景，幫助 PM 建立以用戶為中心的需求探索流程。',
    hours: 8,
    instructor: INSTRUCTOR_DEFAULT,
    progress: 20,
    chapters: [
      { id: 1, label: '章節一', title: 'PM 的用戶研究思維', duration: '55 分鐘', videoUrl: '', desc: '建立以用戶為中心的產品思維，了解 PM 如何將用戶研究整合進產品開發週期。' },
      { id: 2, label: '章節二', title: '需求訪談設計', duration: '55 分鐘', videoUrl: '', desc: '學習針對需求驗證的訪談設計技巧，有效區分用戶的「問題」與「解法」。' },
      { id: 3, label: '章節三', title: '用戶洞察轉化為產品需求', duration: '55 分鐘', videoUrl: '', desc: '掌握將質性洞察轉化為具體產品需求的方法，並建立需求優先順序的評估框架。' },
      { id: 4, label: '章節四', title: '研究成果向上溝通技巧', duration: '55 分鐘', videoUrl: '', desc: '學習如何向主管與利害關係人有效呈現研究結論，爭取資源支持產品決策。' },
    ],
  },
  {
    id: 8,
    title: '產品指標設計與分析',
    type: 'PM職涯發展',
    stage: 'R3',
    free: false,
    price: 3600,
    desc: '學習如何設定產品 KPI 並透過數據驅動決策。',
    overview: '學習如何設定產品 KPI 並透過數據驅動決策。本課程教你建立指標體系、追蹤關鍵數據，並結合質性研究洞察，做出有依據的產品方向判斷。',
    hours: 9,
    instructor: INSTRUCTOR_DEFAULT,
    progress: 55,
    chapters: [
      { id: 1, label: '章節一', title: '產品指標體系設計', duration: '60 分鐘', videoUrl: '', desc: '了解指標體系的層次結構，學習如何設計相互連貫、能反映產品健康度的指標組合。' },
      { id: 2, label: '章節二', title: '北極星指標與 OKR 對齊', duration: '55 分鐘', videoUrl: '', desc: '學習如何定義北極星指標，並將指標系統與組織 OKR 對齊，驅動一致的產品方向。' },
      { id: 3, label: '章節三', title: '數據分析基礎', duration: '55 分鐘', videoUrl: '', desc: '掌握基礎數據分析方法，學習如何從數據中識別趨勢、異常與機會。' },
      { id: 4, label: '章節四', title: '指標驅動的產品決策', duration: '50 分鐘', videoUrl: '', desc: '透過實際案例學習如何結合量化指標與質性洞察，做出平衡且有依據的產品決策。' },
    ],
  },
  {
    id: 9,
    title: '服務藍圖與顧客旅程',
    type: '服務設計系列',
    stage: 'R2',
    free: false,
    price: 2800,
    desc: '以系統視角繪製服務藍圖，找出關鍵接觸點。',
    overview: '以系統視角繪製服務藍圖，找出關鍵接觸點。課程帶你從顧客旅程地圖出發，延伸至服務藍圖的繪製方法，幫助組織識別服務缺口並提出改善方向。',
    hours: 7,
    instructor: INSTRUCTOR_DEFAULT,
    progress: 10,
    chapters: [
      { id: 1, label: '章節一', title: '服務設計思維概論', duration: '50 分鐘', videoUrl: '', desc: '了解服務設計的核心理念與工具，建立以整體體驗為中心的設計思維。' },
      { id: 2, label: '章節二', title: '顧客旅程地圖繪製', duration: '50 分鐘', videoUrl: '', desc: '學習繪製顧客旅程地圖的方法，識別關鍵接觸點、情緒起伏與改善機會。' },
      { id: 3, label: '章節三', title: '服務藍圖設計方法', duration: '50 分鐘', videoUrl: '', desc: '從顧客旅程延伸至服務藍圖，整合前台行動、後台流程與支援系統的全貌視圖。' },
      { id: 4, label: '章節四', title: '接觸點優化與改善提案', duration: '50 分鐘', videoUrl: '', desc: '依據服務藍圖分析服務缺口，提出具體可行的接觸點優化方案與實施建議。' },
    ],
  },
  {
    id: 10,
    title: '服務設計工作坊方法論',
    type: '服務設計系列',
    stage: 'R3',
    free: false,
    price: 3600,
    desc: '掌握服務設計全流程，帶領跨部門共創工作坊。',
    overview: '掌握服務設計全流程，帶領跨部門共創工作坊。本課程聚焦於工作坊的設計與引導技巧，幫助你有效促進跨部門協作，共同創造以用戶為中心的服務解決方案。',
    hours: 10,
    instructor: INSTRUCTOR_DEFAULT,
    progress: 0,
    chapters: [
      { id: 1, label: '章節一', title: '服務設計工作坊概論', duration: '60 分鐘', videoUrl: '', desc: '了解工作坊在服務設計流程中的角色，學習規劃工作坊的目標設定與成功指標。' },
      { id: 2, label: '章節二', title: '工作坊流程設計', duration: '60 分鐘', videoUrl: '', desc: '設計有節奏感的工作坊議程，掌握暖身、發散、收斂到行動的流程設計邏輯。' },
      { id: 3, label: '章節三', title: '引導技巧與工具運用', duration: '60 分鐘', videoUrl: '', desc: '學習引導師的核心技巧，包含提問方式、能量管理與衝突處理，以及常用工作坊工具的運用。' },
      { id: 4, label: '章節四', title: '成果整合與後續行動', duration: '60 分鐘', videoUrl: '', desc: '將工作坊產出整合成可行動的計畫，學習如何維持參與者的共識並推動後續執行。' },
    ],
  },
  // ── 實戰營課程 ──────────────────────────────────────────────────────────────
  {
    id: 101,
    title: '2026春季班R1：品牌印象調查游擊訪談',
    type: '實戰營',
    stage: 'R1',
    free: false,
    price: 3600,
    desc: '以貓咖消費者為研究對象，完整走過 6 週游擊訪談學習營，從問題定義到研究成果呈現。',
    overview: '以貓咖消費者印象調查為實戰題目，帶你完整體驗 6 週線上學習營流程。課程涵蓋研究目的設定、訪綱設計、游擊訪談執行、資料分析與成果發表，是 R1 認證的核心實戰課程。',
    hours: 18,
    instructor: INSTRUCTOR_DEFAULT,
    progress: 20,
    chapters: [
      { id: 1, label: '第 1 週', title: '品牌印象調查游擊訪談：貓咖消費者印象調查', duration: '2.5 小時', videoUrl: '', desc: '課程開幕、研究背景說明，以及游擊訪談的整體規劃與分組。帶你了解本梯次的研究目的與學習目標。' },
      { id: 2, label: '第 2 週', title: '研究目的與問題定義',                       duration: '2.5 小時', videoUrl: '', desc: '深入探討如何將模糊的業務問題轉化為明確的研究問題，並定義可驗證的研究假設。' },
      { id: 3, label: '第 3 週', title: '研究設計與訪談規劃',                       duration: '2.5 小時', videoUrl: '', desc: '設計適合游擊訪談的研究方法，撰寫訪談腳本，並進行角色扮演練習。' },
      { id: 4, label: '第 4 週', title: '實體工作坊',                               duration: '9 小時',   videoUrl: '', desc: '於台北實地進行游擊訪談，完成至少 6 份真實受訪者訪談，並進行即時資料整理。' },
      { id: 5, label: '第 5 週', title: '資料分析與洞察萃取',                       duration: '2.5 小時', videoUrl: '', desc: '運用親和圖進行主題分析，萃取關鍵洞察，並準備最終研究成果發表。' },
    ],
  },
]

/** 依 id 查詢單一課程 */
export function getCourseById(id) {
  return courses.find(c => c.id === Number(id)) ?? null
}

/** 依 free 篩選 */
export const freeCourses = courses.filter(c => c.free)
export const paidCourses = courses.filter(c => !c.free)
