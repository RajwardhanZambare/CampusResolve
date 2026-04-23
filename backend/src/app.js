import express from 'express'
import postModel from './models/post.model.js'
import multer from 'multer'
import uploadFile from './services/storage.services.js'
import cors from 'cors'
import userModel from './models/user.model.js' // '/login', '/create-account', '/edit-account' api's are incomplete

//now make patch api

const app = express()

app.use(express.json())//middelware
const upload = multer({ storage: multer.memoryStorage() }) //middelware for images
app.use(cors()) //middleware for cors policy

// app.post('/create-post', upload.single("image"), async (req, res) => {
//     // console.log(req.body)
//     // console.log(req.file)
//     const result = await uploadFile(req.file.buffer)
//     // console.log(result)
//     const post = await postModel.create({
//         image: result.url,
//         title: req.body.title,
//         caption: req.body.caption,
//         upvotes: 0,
//         comments: 0,
//         username: req.body.username,
//         profilePhoto: "https://ik.imagekit.io/rajwardhan/defaultPFP.jpg?updatedAt=1771751841705",
//         location: req.body.location || "cse"
//     })

//     return res.status(201).json({
//         message: "post created successfully",
//         post: post
//     })
// })

app.post('/create-post', upload.single("image"), async (req, res) => {
    try {
        const { title, caption, username, location } = req.body

        // 1. Check user exists
        const user = await userModel.findOne({ username })

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        // 2. Upload image
        let imageUrl = ""

        if (req.file) {
            const result = await uploadFile(req.file.buffer)
            imageUrl = result.url
        }

        // 3. Create post
        const post = await postModel.create({
            image: imageUrl,
            title,
            caption,
            upvotes: 0,        // MUST
            comments: 0,       // MUST
            username,
            profilePhoto: user.profilePhoto, // ADD THIS BACK
            location: location || "cse",
            resolved: false
        })

        res.status(201).json({
            message: "Post created successfully",
            post
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: "Error creating post"
        })
    }
})


app.get('/posts', async (req, res) => {
    const posts = await postModel.find() //returns array of all the posts
    // console.log(posts)
    return res.status(200).json({
        message: "all posts fetched succesfully",
        posts: posts
    })
})
app.patch('/handle-upvote/:key', async (req, res) => {
    const key = req.params.key
    // console.log(req.body.upVotesCount)
    const updatedPost = await postModel.findByIdAndUpdate(key, { upvotes: req.body.upVotesCount })
    res.status(200).json(updatedPost)
})
app.post('/create-account', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const profilePhoto = "https://ik.imagekit.io/rajwardhan/defaultPFP.jpg?updatedAt=1771751841705"

    const user = await userModel.create({
        username,
        password,
        profilePhoto
    })

    res.status(200).json(user)
})
app.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await userModel.findOne({ username, password })

    if (!user) {
        return (res.status(400).json({
            message: "invalid credentials!"
        }))
    }

    return res.status(200).json({ username: username })
})
app.patch("/resolve/:id", async (req, res) => {

    const postId = req.params.id;

    try {

        const post = await postModel.findById(postId);

        const updatedPost = await postModel.findByIdAndUpdate(
            postId,
            { resolved: !post.resolved },
            { new: true }
        );

        res.json(updatedPost);

    } catch (error) {

        res.status(500).json({ message: "Error updating post" });

    }

});
app.delete("/delete-post/:id", async (req, res) => {

    const postId = req.params.id;

    try {

        await postModel.findByIdAndDelete(postId);

        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error deleting post"
        });

    }

});

app.get('/profile/:username', async (req, res) => {
    try {
        const username = req.params.username

        const user = await userModel.findOne({ username })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // IMPORTANT: match username (not userId)
        const posts = await postModel.find({ username }).sort({ _id: -1 })

        res.status(200).json({
            user,
            posts,
            postCount: posts.length
        })

    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

export default app