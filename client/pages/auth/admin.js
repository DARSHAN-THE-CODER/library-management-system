import React, { useState } from 'react'
import LoginPage from '@/components/forms/Login'

function Admin() {
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