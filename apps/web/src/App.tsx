import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout'
import { FeedPage, LoginPage, RegisterPage, ProfilePage } from './pages'

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<FeedPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile/:userId" element={<ProfilePage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
