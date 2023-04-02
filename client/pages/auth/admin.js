import React, { useState } from 'react'
import LoginPage from '@/components/forms/Login'

import axios from "axios"

import { APIURL } from '@/constants/api'
import { toast } from "react-toastify"

import { useRouter } from "next/router"

function Admin({loggedIn, setIsloggedIn}) {
    // console.log(test)
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

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
                console.log(res.data)
                toast.success("Login Successful")
                setIsloggedIn(true)
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