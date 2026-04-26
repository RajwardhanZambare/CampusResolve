import { useState } from 'react'
import '../css/CreatePost.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreatePost = () => {
    const navigate = useNavigate()

    const [image, setImage] = useState()
    const [title, setTitle] = useState('')
    const [caption, setCaption] = useState('')
    const [location, setLocation] = useState('cse')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const username = localStorage.getItem("username")
    const profilePhoto = "https://ik.imagekit.io/rajwardhan/defaultPFP.jpg?updatedAt=1771751841705"

    async function createPost(e) {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const formData = new FormData()
            formData.append("image", image)
            formData.append("title", title)
            formData.append("caption", caption)
            formData.append("username", username)
            formData.append("profilePhoto", profilePhoto)
            formData.append("location", location)

            const response = await axios.post('https://campusresolve-td7e.onrender.com/create-post', formData)

            if (response.status === 200 || response.status === 201) {
                navigate('/')
            }
        } catch (err) {
            setError('Failed to create post. Please try again.')
            setLoading(false)
        }
    }

    return (
        <div className='create-post-container'>

            {/* Loading Overlay */}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-box">
                        <div className="loading-spinner"></div>
                        <p>Uploading your post...</p>
                    </div>
                </div>
            )}

            <div className="create-post-div">
                <div className='create-post-heading'>
                    <h1>Create Post</h1>
                </div>
                <form onSubmit={createPost}>
                    <div className="input-area">
                        <input
                            className="image-input"
                            type='file'
                            required
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <input
                            className="title-input"
                            type='text'
                            placeholder='Enter Title'
                            required
                            value={title}
                            onChange={(e) => {
                                if (e.target.value.length <= 30) setTitle(e.target.value)
                            }}
                        />
                        <textarea
                            placeholder='Enter description'
                            value={caption}
                            onChange={(e) => {
                                if (e.target.value.length <= 90) setCaption(e.target.value)
                            }}
                        />
                        <select
                            required
                            className='location-input'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="cse department">CSE Department</option>
                            <option value="electrical department">Electrical Department</option>
                            <option value="entc department">ENTC Department</option>
                            <option value="mechanical department">Mechanical Department</option>
                            <option value="civil department">Civil Department</option>
                            <option value="aiml department">AIML Department</option>
                            <option value="aids department">AIDS Department</option>
                            <option value="textile department">Textile Department</option>
                            <option value="first year department">First Year Department</option>
                            <option value="library">Library</option>
                        </select>
                        {error && <p className="error-msg">{error}</p>}
                    </div>
                    <div className="create-post-btn">
                        <button type='submit' disabled={loading}>
                            {loading ? 'Uploading...' : 'Create'}
                        </button>
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

export default CreatePost