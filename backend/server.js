import app from './src/app.js'
import connectDB from './src/db/db.js'

const PORT = process.env.PORT

connectDB()

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`)
})