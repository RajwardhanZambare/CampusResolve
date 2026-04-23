import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { useState } from 'react'
import { useEffect } from 'react'
import CreateAccount from './pages/CreateAccount'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {

    const [darkmode, setDarkmode] = useState(
        localStorage.getItem('theme') === 'dark'
    )

    useEffect(() => {
        if (darkmode) {
            document.body.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        }
        else {
            document.body.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkmode])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home darkmode={darkmode} setDarkmode={setDarkmode} />} />
                <Route path='/create-post' element={
                    <ProtectedRoute>
                        <CreatePost />
                    </ProtectedRoute>
                } />
                <Route path='/login' element={<Login />} />
                <Route path='/create-account' element={<CreateAccount />} />
                <Route path='/profile' element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default App