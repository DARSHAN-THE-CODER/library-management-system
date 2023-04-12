import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useRouter } from 'next/router'
import axios from 'axios';
import { APIURL } from '@/constants/api'

import Table from '@/components/common/Table';

function Student() {

    const router = useRouter();
    const [data, setData] = useState([])

    const headers = [{
        id: "id",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
    }]

    useEffect(() => {
        console.log("Student page")
        console.log(localStorage.getItem('lmsuser'))
        if ((localStorage.getItem('lmsuser') === "student") ) {
            toast.error("You are not authorized to view this page, Please login as admin or librarian")
            router.push("/auth/admin")
        } else {
            axios.get(`${APIURL}/admin/users`)
                .then(res => {
                    console.log(res.data)
                    setData(res.data)
                }
                )
                .catch(err => {
                    console.log(err)
                }
                )
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

export default Student