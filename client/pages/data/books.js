import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import axios from 'axios';

import { APIURL } from '@/constants/api';
import Table from '@/components/common/Table';
import { toast } from 'react-toastify';

function Book() {

    const router = useRouter();
    const [data, setData] = useState([])

    const headers = [{
        id: "id",
        title: "Title",
        author: "Author",
        description: "Description",
        isbn: "ISBN",
        totalCopies: "Total Copies",
        availableCopies: "Available Copies"
    }]


    useEffect(() => {
        if (localStorage.getItem('lmsuser') !== "admin") {
            toast.error("You are not authorized to view this page, Please login as admin")
            router.push("/auth/admin")
        } else {
            axios.get(`${APIURL}/admin/books`)
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

export default Book