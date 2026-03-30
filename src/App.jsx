import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import MyLearning from './pages/MyLearning'
import OnlineCourses from './pages/OnlineCourses'
import BootCamp from './pages/BootCamp'
import Workshop from './pages/Workshop'
import Gathering from './pages/Gathering'
import CourseDetail from './pages/CourseDetail'
import Payment from './pages/Payment'
import VideoPlayer from './pages/VideoPlayer'
import OKRSetup from './pages/OKRSetup'
import OKRResult from './pages/OKRResult'
import UXToolbox from './pages/UXToolbox'

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* 公開頁面 */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/okr-setup" element={<OKRSetup />} />
        <Route path="/okr-result" element={<OKRResult />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/payment" element={<Payment />} />

        {/* 會員頁面 */}
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/online-courses" element={<OnlineCourses />} />
        <Route path="/bootcamp" element={<BootCamp />} />
        <Route path="/workshop" element={<Workshop />} />
        <Route path="/gathering" element={<Gathering />} />
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
