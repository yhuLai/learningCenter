import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ width: '200px', flexShrink: 0 }} />
      <Sidebar />
      <main style={{
        flex: 1,
        background: '#F7F7F8',
        minHeight: '100vh',
        padding: '40px',
      }}>
        {children}
      </main>
    </div>
  )
}
