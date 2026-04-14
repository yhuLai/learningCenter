import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Welcome from './pages/Welcome'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import MyLearning from './pages/MyLearning'
import OnlineCourses from './pages/OnlineCourses'
import BootCamp from './pages/BootCamp'
import CourseActivities from './pages/CourseActivities'
import ActivityDetail from './pages/ActivityDetail'
import VideoPlayer from './pages/VideoPlayer'
import OKRSetup from './pages/OKRSetup'
import OKRResult from './pages/OKRResult'
import UXToolbox from './pages/UXToolbox'

function App() {
  return (
    <AuthProvider>
    <BrowserRouter basename="/learningCenter">
      <Routes>
        {/* 公開頁面 */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/okr-setup" element={<OKRSetup />} />
        <Route path="/okr-result" element={<OKRResult />} />

        {/* 會員頁面 */}
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/online-courses" element={<OnlineCourses />} />
        <Route path="/bootcamp" element={<BootCamp />} />
        <Route path="/activities" element={<CourseActivities />} />
        <Route path="/activities/:id" element={<ActivityDetail />} />
        <Route path="/workshop" element={<Navigate to="/activities" replace />} />
        <Route path="/gathering" element={<Navigate to="/activities" replace />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
        <Route path="/ux-toolbox" element={<UXToolbox />} />

        {/* 其他路由導向首頁 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
