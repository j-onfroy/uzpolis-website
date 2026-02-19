import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

function AuthLayout() {
    const token = localStorage.getItem("token")
    const nav = useNavigate()
    useEffect(() => {
        if (token) {
            nav("/auth/profile")

        } else {
            nav("/user/login")
        }
    }, [token])
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AuthLayout
