import { APIURL } from '@/constants/api';
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        if(router.query['id']){
            console.log(router.query['id'])
            axios.get(`${APIURL}/user/borrowings/${router.query['id']}`)
            .then((res) => {
              console.log(res.data)
            })
            .catch((err) => {
              console.log(err)
            })
        }
    },[router])
  return (
    <div className='h-screen'>Dashboard</div>
  )
}

export default Dashboard