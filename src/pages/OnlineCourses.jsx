import { useState } from 'react'
import Layout from '../components/layout/Layout'
import CourseCard from '../components/ui/CourseCard'
import { freeCourses, paidCourses as allPaidCourses } from '../data/courses'

const COURSE_TYPES = ['所有課程', 'PM職涯發展', 'UI/UX職涯發展', '服務設計系列']
// 注意：實戰營課程不在此頁，僅顯示於 /bootcamp

export default function OnlineCourses() {
  const [courseType, setCourseType] = useState('所有課程')

  const paidCourses = allPaidCourses
    .filter(c => courseType === '所有課程' || c.type === courseType)

  return (
    <Layout>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* 影片課程：原付費課程 grid + 下拉選單 */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
              影片課程
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
              <CourseCard key={course.id} course={{ ...course, ctaLabel: '前往觀看', hidePrice: true, linkTo: `/video/${course.id}` }} />
            ))}
          </div>
        </section>

        {/* 直播回放 */}
        <section>
          <div style={{ marginBottom: '12px' }}>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1A1A2E', margin: 0 }}>
              直播回放
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {freeCourses.map(course => (
              <CourseCard key={course.id} course={{ ...course, ctaLabel: '前往觀看', hideTags: true, hidePrice: true, linkTo: `/video/${course.id}` }} />
            ))}
          </div>
        </section>

      </div>
    </Layout>
  )
}
