import React, { useState } from 'react'
import LoginPage from '@/components/forms/Login'
import axios from 'axios'

import { APIURL } from '@/constants/api'
import { toast } from 'react-toastify'

import { useRouter } from 'next/router'

function student({setRoutes, setIsloggedIn}) {
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
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      name: 'Edit Profile',
      path: '/edit',
    },
  ]

  function handleSubmit(e) {
    e.preventDefault()
    console.log(user)
    axios.post(`${APIURL}/user/login`, user)
      .then((res) => {
        console.log(res.data)
        toast.success('Login Successful')
        localStorage.setItem('lmsuser', 'student')
        localStorage.setItem('lmsuserid', res.data.id)
        setIsloggedIn(true)
        setRoutes(routes)
        router.push(`/dashboard/student/${res.data.id}`)
      }
      )
      .catch((err) => {
        console.log(err)
        toast.error('Login Failed')
      }
      )
}


  return (
    <div className=''>
        <LoginPage
            handleReset={handleReset}
            user={user}
            setUser={setUser}
            content='Student Login'
            handleSubmit={handleSubmit}
        />
    </div>
  )
}

export default student