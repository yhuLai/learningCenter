import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// ── Mock 登入模式（暫時關閉 Supabase 驗證）──
const MOCK_USER = { id: 'mock', email: 'demo@soking.com', user_metadata: { name: '示範用戶' } }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const mockLogin  = () => setUser(MOCK_USER)
  const mockLogout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, mockLogin, mockLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
