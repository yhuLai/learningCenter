import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const baseNavItems = [
  { label: '線上課程', path: '/online-courses' },
  { label: '實戰營',   path: '/bootcamp' },
  { label: '課程活動', path: '/activities' },
  { label: 'UX工具箱', path: '/ux-toolbox' },
]

export default function Sidebar() {
  const { user, mockLogout } = useAuth()
  const navigate = useNavigate()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const firstItem = { label: '我的學習中心', path: user ? '/my-learning' : '/' }
  const navItems = [firstItem, ...baseNavItems]

  const handleLogout = () => {
    mockLogout()
    setSettingsOpen(false)
    navigate('/')
  }

  return (
    <aside style={{
      width: '200px',
      minHeight: '100vh',
      background: '#FFFFFF',
      borderRight: '0.5px solid #E5E5EE',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0',
      position: 'fixed',
      top: 0,
      left: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '0 20px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            background: '#1A1A2E',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: '500',
            flexShrink: 0,
          }}>S</div>
          <span style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A2E' }}>Soking</span>
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: isActive ? '500' : '400',
              color: isActive ? '#1A1A2E' : '#6B6B80',
              textDecoration: 'none',
              background: isActive ? '#F7F7F8' : 'transparent',
              borderLeft: isActive ? '2px solid #4A3FD6' : '2px solid transparent',
              transition: 'background 0.15s ease',
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Settings */}
      <div style={{ borderTop: '0.5px solid #E5E5EE', paddingTop: '16px', position: 'relative' }}>
        <button
          onClick={() => setSettingsOpen(o => !o)}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: '400',
            color: '#6B6B80',
            background: 'transparent',
            border: 'none',
            borderLeft: '2px solid transparent',
            cursor: 'pointer',
            fontFamily: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
          }}
        >
          設定
        </button>

        {/* Dropdown */}
        {settingsOpen && (
          <>
            {/* 點擊外部關閉 */}
            <div
              onClick={() => setSettingsOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 10 }}
            />
            <div style={{
              position: 'absolute',
              bottom: '100%',
              left: '16px',
              right: '16px',
              background: '#FFFFFF',
              border: '0.5px solid #E5E5EE',
              borderRadius: '8px',
              overflow: 'hidden',
              zIndex: 20,
              marginBottom: '4px',
            }}>
              {user ? (
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 16px',
                    fontSize: '14px',
                    color: '#C04828',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#FFF5F3'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  登出
                </button>
              ) : (
                <button
                  onClick={() => { navigate('/login'); setSettingsOpen(false) }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 16px',
                    fontSize: '14px',
                    color: '#4A3FD6',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F7F7F8'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  登入
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
