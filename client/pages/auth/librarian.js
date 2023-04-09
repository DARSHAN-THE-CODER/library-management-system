import React, {useState} from 'react'
import LoginPage from '@/components/forms/Login'

import axios from 'axios'
import {APIURL} from '@/constants/api'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'

function Librarian({setRoutes, setIsloggedIn}) {
    const router = useRouter()
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

    const routes = [
        {
            name: "Dashboard",
            path: "/dashboard",
        },
        {
            name: "All Students",
            path: "/data/student",
        },
    ]

    function handleSubmit(e) {
        e.preventDefault()
        console.log(user)
        axios.post(`${APIURL}/librarian/login`, user)
            .then((res) => {
                console.log(res.data)
                toast.success('Login Successful')
                localStorage.setItem('lmsuser', 'librarian')
                localStorage.setItem('lmsuserid', res.data.id)
                setRoutes(routes)
                setIsloggedIn(true)
                router.push(`/dashboard/librarian/${res.data.id}`)
            }
            )
            .catch((err) => {
                console.log(err)
                toast.error(`${err.response.data}`)
            }
            )
    }

  return (
    <div>
        <LoginPage content='Librarian Login'
            handleReset={handleReset}
            user={user}
            setUser={setUser}   
            handleSubmit={handleSubmit}     
        />
    </div>
  )
}

export default Librarian