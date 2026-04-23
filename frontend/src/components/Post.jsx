import { useState, useEffect } from 'react'
import '../css/Post.css'
import axios from 'axios'

const Post = (props) => {
    const username = localStorage.getItem("username")

    useEffect(() => {
        const savedVote = localStorage.getItem(`upvote-${props.id}`)
        if (savedVote === "true") {
            setIsUpvoted(true)
        }
    }, [])

    const [upVoteCount, setUpVoteCount] = useState(props.upvotes ?? 0)
    const [isUpvoted, setIsUpvoted] = useState(false)
    const [resolved, setResolved] = useState(props.resolved)

    async function handleUpvote() {
        const newIsUpvoted = !isUpvoted
        const newCount = newIsUpvoted ? upVoteCount + 1 : upVoteCount - 1
        setIsUpvoted(newIsUpvoted)
        setUpVoteCount(newCount)

        localStorage.setItem(`upvote-${props.id}`, newIsUpvoted)

        await axios.patch(`http://localhost:3000/handle-upvote/${props.id}`, {
            upVotesCount: newCount
        })
    }
    async function resolvePost() {
        const res = await axios.patch(`http://localhost:3000/resolve/${props.id}`)
        setResolved(res.data.resolved)
    }
    async function deletePost() {

        try {

            await axios.delete(`http://localhost:3000/delete-post/${props.id}`)

            props.onDelete(props.id)

        } catch (error) {

            console.error("Error deleting post")

        }

    }

    return (
        <div className={`post ${resolved ? "resolved-post" : ""}`}>
            <div className="user-info">
                <img src={props.profilePhoto ?? "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"}></img>
                <h2>{props.username}</h2>
            </div>
            <div className="post-info">
                <h3>{props.location}</h3>
                <h3>{props.title}</h3>
                <p>{props.caption}</p>
                <div className="post-div">
                    <img src={props.image}></img>
                </div>
            </div>
            <div className="post-stats">
                <div className="upvote">
                    <button id='upvote-btn' onClick={handleUpvote}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isUpvoted ? "red" : "none"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-big-up-dash-icon lucide-arrow-big-up-dash"><path d="M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z" /><path d="M9 20h6" /></svg>
                    </button>
                    <p>{upVoteCount}</p>
                </div>
                <div className="comment">
                    <button id='comment-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-more-icon lucide-message-square-more"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" /><path d="M12 11h.01" /><path d="M16 11h.01" /><path d="M8 11h.01" /></svg>
                    </button>
                    <p>{props.comments ?? 0}</p>
                </div>
                {username === "admin" && (
                    <>
                        <div className="resolve">
                            <button id="resolve-btn" onClick={resolvePost}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-check-icon lucide-check-check"><path d="M18 6 7 17l-5-5" /><path d="m22 10-7.5 7.5L13 16" /></svg>
                            </button>
                        </div>
                        <div className="delete">
                            <button id="delete-btn" onClick={deletePost}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                            </button>
                        </div>
                    </>
                )}
                <div className="download">
                    <button id='download-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download-icon lucide-download"><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Post