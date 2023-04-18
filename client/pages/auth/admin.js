import React, { useState } from 'react'
import LoginPage from '@/components/forms/Login'

import axios from "axios"

import { APIURL } from '@/constants/api'
import { toast } from "react-toastify"

import { useRouter } from "next/router"

function Admin({ loggedIn, setIsloggedIn, setRoutes }) {
    // console.log(test)
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const adminRoutes = [
        {
            name: "Dashboard",
            path: "/dashboard",
        },
        {
            name: "All Books",
            path: "/data/books",
        },
        {
            name: "All Students",
            path: "/data/students",
        },
        {
            name: "All Librarians",
            path: "/data/librarians",
        },
        {
            name: "Edit Profile",
            path: "/edit",
        }
    ]

    function handleReset() {
        setUser({
            email: '',
            password: '',
        })
    }
    // console.log(APIURL)
    function handleSubmit(e) {
        e.preventDefault()
        console.log(user)
        axios.post(`${APIURL}/admin/login`, user)
            .then(res => {
                localStorage.setItem('lmsuser', "admin")
                localStorage.setItem('lmsuserid', res.data.id)
                console.log(res.data)
                toast.success("Login Successful")
                setIsloggedIn(true)
                setRoutes(adminRoutes)
                router.push(`/dashboard/admin/${res.data.id}`)
            }
            )
            .catch(err => {
                console.log(err)
                toast.error(err.response.data || "Something went wrong")
            }
            )
    }
    return (
        <div>
            <LoginPage content='Admin Login'
                handleReset={handleReset}
                user={user}
                setUser={setUser}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default Admin