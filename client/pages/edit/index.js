import { APIURL } from '@/constants/api'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Form from '@/components/forms/Editable'

function Edit() {

    const [data, setData] = useState([])

    const [things, setThings] = useState({
        id: '',
        type: '',
    })

    useEffect(() => {
        let temp = localStorage.getItem('lmsuser')
        let tempId = localStorage.getItem('lmsuserid')
        setThings({
            id: tempId,
            type: temp  
        })
        if(temp === "student"){
            axios.get(`${APIURL}/user/id/${tempId}`)
            .then(res => {
                console.log(res.data)
                setData({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    password: res.data.password,
                })
            })
            .catch(err => {
                console.log(err)
            })
        }

        if(temp === "admin"){
            axios.get(`${APIURL}/admin/id/${tempId}`)
            .then(res => {
                console.log(res.data)
                setData({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    password: res.data.password,
                })
            })
            .catch(err => {
                console.log(err)
            })
        }

        if(temp === "librarian"){
            axios.get(`${APIURL}/librarian/id/${tempId}`)
            .then(res => {
                console.log(res.data)
                setData({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    password: res.data.password,
                })
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
        }

    },[])
  return (
    <div className='h-screen'>Edit

        <Form fields={data} type={things.type} id={things.id}/>
    </div>
  )
}

export default Edit