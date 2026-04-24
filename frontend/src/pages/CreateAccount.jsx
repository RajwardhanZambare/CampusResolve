import React from 'react'
import '../css/CreateAccount.css'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateAccount = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleCreateAccount(e){
        e.preventDefault()
        // console.log("button clicked")

        // const formData = new FormData()
        // formData.append('username', username)
        // formData.append('password', password)

        const response = await axios.post('https://campusresolve-td7e.onrender.com/create-account', {
            username: username,
            password: password
        })

        navigate('/')
    }

    return (
        <div className='create-account-container'>
            <div className="create-account-div">
                <div className='create-account-heading'>
                    <h1>Create Account</h1>
                </div>
                <form onSubmit={(e) => {
                    handleCreateAccount(e)
                }}>
                    <div className="input-area">
                        <input className='username-input' type='text' required placeholder='Create your username' value={username} onChange={(e) => {
                            setUsername(e.target.value)
                        }}></input>
                        <input className='password-input' type='text' required placeholder='Create your password' value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }}></input>
                        {/* <input className='password-input' type='text' required placeholder='Confirm your password'></input> */}
                        <Link to="/login">Already have an account? Login</Link>
                    </div>
                    <div className="create-account-btn">
                        <button type='submit'>Create</button>
                    </div>
                </form>
            </div>
            <div className="bottom-div">
                <div className="left">
                    <button onClick={() => {
                        navigate('/')
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                    </button>
                </div>
                <div className="center">
                    <button onClick={() => {
                        navigate('/create-post')
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    </button>
                </div>
                <div className="right">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount
