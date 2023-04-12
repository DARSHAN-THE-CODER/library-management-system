// import { useEffect } from "react"
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { APIURL } from '@/constants/api'

import { useRouter } from 'next/router'
import { toast } from "react-toastify"
import Table from '@/components/common/Table';

// import axios from 'axios'
// import { APIURL } from '@/constants/api'
import IssueBook from '@/components/forms/IssueBook'

function Dashboard({ loggedIn, setIsLoggedIn }) {

  const router = useRouter()

  const [studentData, setStudentData] = useState([])
  const [booksData, setBooksData] = useState([])

  useEffect(() => {
    if (localStorage.getItem('lmsuser') !== "librarian") {
      toast.error("You are not authorized to view this page, Please login as librarian")
      router.push("/auth/librarian")
    } else {
      axios.get(`${APIURL}/admin/users`)
        .then(res => {
          console.log(res.data)
          setStudentData(res.data)
        }
        )
        .catch(err => {
          console.log(err)
          toast.error("Failed to fetch students data")
        }
        )

      axios.get(`${APIURL}/admin/books`)
        .then(res => {
          console.log(res.data)
          setBooksData(res.data)
        }
        )
        .catch(err => {
          console.log(err)
        }
        )
    }
  }, [])

  const headers = [{
    id: "id",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
  }]

  const bookheaders = [{
    id: "id",
    title: "Title",
    author: "Author",
    description: "Description",
    isbn: "ISBN",
    totalCopies: "Total Copies",
    availableCopies: "Available Copies"
  }]

  const [issueData, setIssueData] = useState({
    userId: null,
    bookId: null
  })

  const [returnData, setReturnData] = useState({
    userId: null,
    bookId: null
  })

  const issueBook = (e) => {
    e.preventDefault()
    console.log(issueData)
    let temp = localStorage.getItem("lmsuserid")
    axios.post(`${APIURL}/librarian/${temp}/issue/${issueData?.bookId}/${issueData?.userId}`)
      .then((res) => {
        console.log(res)
        toast.success("Book issued successfully")
      })
      .catch((err) => {
        console.log(err)
        toast.error(` ${err?.response?.data}`)
      })
  }

  const returnBook = (e) => {
    e.preventDefault();
    let temp = localStorage.getItem("lmsuserid")
    if (!returnData?.bookId || !returnData?.userId) {
      toast.error("Please enter book id and user id")
      return
    } else {
      axios.post(`${APIURL}/librarian/${temp}/return/${returnData?.bookId}/${returnData?.userId}`)
        .then((res) => {
          console.log(res)
          toast.success("Book returned successfully")
        }
        )
        .catch((err) => {
          console.log(err)
          toast.error(` ${err?.response?.data}`)
        }
        )
    }
  }
  return (
    <div className='h-screen overflow-auto'>
      <div className='text-2xl m-4'>Students</div>
      <Table headers={headers}
        data={studentData}
      />
      <div className='text-2xl m-4'>Books</div>
      <Table headers={bookheaders}
        data={booksData}
      />
      <div className='m-4 flex flex-wrap justify-evenly'>
        <IssueBook heading={"Issue Book to a student"} data={issueData} setData={setIssueData} handleSubmit={issueBook} />
        <IssueBook heading={"Returning book"} data={returnBook} setData={setReturnData} handleSubmit={returnBook} />
      </div>
    </div>
  )
}

export default Dashboard