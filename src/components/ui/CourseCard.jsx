import { Link } from 'react-router-dom'

const stageTag = {
  background: '#FEF9E7',
  color: '#8B7320',
  borderRadius: '6px',
  padding: '2px 8px',
  fontSize: '12px',
  fontWeight: '500',
}

const freeTag = {
  background: '#E4F7EE',
  color: '#0F6E56',
  borderRadius: '6px',
  padding: '2px 8px',
  fontSize: '12px',
  fontWeight: '500',
}

const paidTag = {
  background: '#EEF0FD',
  color: '#4A3FD6',
  borderRadius: '6px',
  padding: '2px 8px',
  fontSize: '12px',
  fontWeight: '500',
}

const typeTag = {
  background: '#F7F7F8',
  color: '#6B6B80',
  borderRadius: '6px',
  padding: '2px 8px',
  fontSize: '12px',
  fontWeight: '500',
}

/**
 * CourseCard — 共用課程卡片元件
 *
 * course: {
 *   id, title, stage, free, price?, desc,
 *   ctaLabel?,   // 覆寫 CTA 文字（預設：查看課程）
 *   linkTo,      // 連結路徑（必填，無預設）
 * }
 */
export default function CourseCard({ course }) {
  const ctaLabel = course.ctaLabel ?? '查看課程'
  const linkTo   = course.linkTo ?? '#'

  return (
    <div style={{
      background: '#FFFFFF',
      border: '0.5px solid #E5E5EE',
      borderRadius: '12px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* 縮圖 */}
      <div style={{
        width: '100%',
        height: '152px',
        background: '#F7F7F8',
        borderBottom: '0.5px solid #E5E5EE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ fontSize: '12px', color: '#9999AA' }}>封面圖片</span>
      </div>

      {/* 內容 */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {/* Tags */}
        {!course.hideTags && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {course.customTag !== undefined
              ? course.customTag && <span style={typeTag}>{course.customTag}</span>
              : course.type
                ? <span style={typeTag}>{course.type}</span>
                : <>
                    <span style={stageTag}>{course.stage}</span>
                    {course.free
                      ? <span style={freeTag}>免費</span>
                      : <span style={paidTag}>付費</span>
                    }
                  </>
            }
          </div>
        )}

        {/* 標題 */}
        <p style={{
          fontSize: '15px', fontWeight: '500', color: '#1A1A2E', margin: 0,
          overflow: 'hidden', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {course.title}
        </p>

        {/* 描述 */}
        <p style={{
          fontSize: '13px', color: '#6B6B80', margin: 0, lineHeight: '1.6',
          overflow: 'hidden', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {course.desc}
        </p>

        {/* 進度條 */}
        {course.progress !== undefined && (
          <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', color: '#6B6B80' }}>學習進度</span>
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#4A3FD6' }}>{course.progress}%</span>
            </div>
            <div style={{ height: '4px', background: '#E5E5EE', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${course.progress}%`, background: '#4A3FD6', borderRadius: '999px' }} />
            </div>
          </div>
        )}

        {/* 活動日期 */}
        {course.date && (
          <p style={{ fontSize: '12px', color: '#6B6B80', margin: 0 }}>
            {course.date}
          </p>
        )}

        {/* 價格 + CTA */}
        {!course.hideButton && (
          <div style={{ marginTop: course.progress !== undefined ? '12px' : 'auto', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: course.hidePrice ? 'flex-end' : 'space-between' }}>
            {!course.hidePrice && (
              course.free
                ? <span style={{ fontSize: '13px', color: '#0F6E56', fontWeight: '500' }}>免費</span>
                : <span style={{ fontSize: '18px', fontWeight: '500', color: '#1A1A2E' }}>NT$ {course.price?.toLocaleString()}</span>
            )}
            <Link
              to={linkTo}
              style={{
                background: '#4A3FD6',
                color: '#FFFFFF',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#3D34B8'}
              onMouseLeave={e => e.currentTarget.style.background = '#4A3FD6'}
            >
              {ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
