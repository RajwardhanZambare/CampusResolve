import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const username = localStorage.getItem("username")

    if (!username) {
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoute