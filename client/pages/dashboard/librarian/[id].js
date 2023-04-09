// import { useEffect } from "react"
import React, {useEffect, useState} from 'react'

import axios from 'axios'
import { APIURL } from '@/constants/api'

import { useRouter } from 'next/router'
import { toast } from "react-toastify"

function Dashboard() {

    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem('lmsuser') !== "librarian") {
            toast.error("You are not authorized to view this page, Please login as librarian")
            router.push("/auth/librarian")
        } else {
            
        }
    }, [])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard