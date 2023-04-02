import React, {useState} from 'react'
import LoginPage from '@/components/forms/Login'

function Librarian() {
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