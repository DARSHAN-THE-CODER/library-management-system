import React, { useState } from 'react'
import LoginPage from '@/components/forms/Login'

function student() {
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

  function handleSubmit(e) {
    e.preventDefault()
    console.log(user)
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