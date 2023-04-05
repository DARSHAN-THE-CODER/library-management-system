import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '@/components/common/Table'
import { APIURL } from '@/constants/api'

import { toast } from "react-toastify"
import { useRouter } from "next/router"

function Librarian() {

    const [data, setData] = useState([])
    
    const router = useRouter();

    const headers = [{
        id: "id",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
    }]

    useEffect(() => {
        if (localStorage.getItem('lmsuser') !== "admin") {
            toast.error("You are not authorized to view this page, Please login as admin")
            router.push("/auth/admin")
        } else {
        axios.get(`${APIURL}/admin/librarians`)
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [])


  return (
    <div className='h-[80vh]'>
        <Table headers={headers}
            data={data}
        />
    </div>
  )
}

export default Librarian