import React, {useEffect} from 'react'

import { useRouter } from 'next/router'

function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        let temp = localStorage.getItem('lmsuser')
        let id = localStorage.getItem('lmsuserid')
        router.push(`/dashboard/${temp}/${id}`)
    }, [])

  return (
    <div className='flex h-[100vh] m-auto'>Please wait ..</div>
  )
}

export default Dashboard