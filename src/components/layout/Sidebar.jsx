import { NavLink } from 'react-router-dom'

const navItems = [
  { label: '我的學習', path: '/my-learning' },
  { label: '線上課程', path: '/online-courses' },
  { label: '學習營',   path: '/bootcamp' },
  { label: '工作坊',   path: '/workshop' },
  { label: '小聚活動', path: '/gathering' },
]

export default function Sidebar() {
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
      <div style={{ borderTop: '0.5px solid #E5E5EE', paddingTop: '16px' }}>
        <NavLink
          to="/settings"
          style={({ isActive }) => ({
            display: 'block',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: isActive ? '500' : '400',
            color: isActive ? '#1A1A2E' : '#6B6B80',
            textDecoration: 'none',
            borderLeft: isActive ? '2px solid #4A3FD6' : '2px solid transparent',
          })}
        >
          設定
        </NavLink>
      </div>
    </aside>
  )
}
