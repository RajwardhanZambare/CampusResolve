import { useEffect, useState } from 'react'
import Post from '../components/Post'
import axios from 'axios'
import '../css/Feed.css'

const Feed = ({ department }) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPosts() {
            const response = await axios.get('https://campusresolve-td7e.onrender.com/posts')

            let allPosts = response.data.posts

            if (department !== "all") {
                allPosts = allPosts.filter(post => post.location.toLowerCase() === department)
            }

            setPosts(allPosts)
            setLoading(false)
        }

        fetchPosts()
    }, [department])

    if (loading) {
        return (
            <div className="loader">

            </div>
        )
    }
    function handleDelete(id) {

        setPosts(prevPosts => prevPosts.filter(post => post._id !== id))

    }

    return (
        <div className='feed-area'>
            {posts.map((post) => {
                return (
                    <Post caption={post.caption} comments={post.comments} image={post.image} title={post.title} upvotes={post.upvotes} key={post._id} id={post._id} username={post.username} profilePhoto={post.profilePhoto} location={post.location.toUpperCase()} resolved={post.resolved} onDelete={handleDelete} />
                )
            })}
        </div>
    )
}

export default Feed
