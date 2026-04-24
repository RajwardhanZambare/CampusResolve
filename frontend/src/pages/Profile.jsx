import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../css/Profile.css"

const Profile = () => {

    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [postCount, setPostCount] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        const username = localStorage.getItem("username")

        axios.get(`https://campusresolve-td7e.onrender.com/profile/${username}`)
            .then(res => {
                setUser(res.data.user)
                setPosts(res.data.posts)
                setPostCount(res.data.postCount)
            })
            .catch(err => console.log(err))

    }, [])

    const handleLogout = () => {
        localStorage.removeItem("username")
        navigate("/")
    }

    if (!user){
        return(
           <div className="loader-wrapper">
                <div className="loader">

                </div>
           </div>
        )
    }

    return (
        <div className="profile-container">

            {/* Header */}
            <div className="profile-header">
                <img src={user.profilePhoto} className="profile-pic" />

                <div className="profile-info">
                    <h2>{user.username}</h2>
                    <p>Total Posts: {postCount}</p>
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Posts */}
            <div className="profile-posts">
                {posts.length === 0 ? (
                    <p>No posts yet</p>
                ) : (
                    posts.map(post => (
                        <div key={post._id} className="post-card">
                            <img src={post.image} />
                            <h4>{post.title}</h4>
                            <p>{post.caption}</p>
                        </div>
                    ))
                )}
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
                    <button onClick={() => {
                        navigate('/profile')
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Profile
