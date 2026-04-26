import React from 'react'
import '../css/Login.css'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleLogin(e) {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await axios.post('https://campusresolve-td7e.onrender.com/login', {
                username: username,
                password: password
            })
            localStorage.setItem("username", response.data.username)
            navigate('/')
        } catch (err) {
            setError('Invalid credentials. Please try again.')
            setLoading(false)
        }
    }

    return (
        <div className='login-container'>

            {/* Loading Overlay */}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-box">
                        <div className="loading-spinner"></div>
                        <p>Logging you in...</p>
                    </div>
                </div>
            )}

            <div className="login-div">
                <div className='login-heading'>
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="input-area">
                        <input
                            className='username-input'
                            type='text'
                            required
                            placeholder='Enter your username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className='password-input'
                            type='password'
                            required
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="error-msg">{error}</p>}
                        <Link to="/create-account">New User? Create account</Link>
                    </div>
                    <div className="login-btn">
                        <button type='submit' disabled={loading}>Login</button>
                    </div>
                </form>
            </div>

            <div className="bottom-div">
                <div className="left">
                    <button onClick={() => navigate('/')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                    </button>
                </div>
                <div className="center">
                    <button onClick={() => navigate('/create-post')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    </button>
                </div>
                <div className="right">
                    <button onClick={() => navigate('/profile')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login