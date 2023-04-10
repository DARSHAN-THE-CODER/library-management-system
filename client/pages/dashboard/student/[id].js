import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        if(router.query['id']){
            console.log(router.query['id'])
        }
    },[router])
  return (
    <div className='h-screen'>Dashboard</div>
  )
}

export default Dashboard