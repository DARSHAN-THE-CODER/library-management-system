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

  const issueBook = (e) => {
    e.preventDefault()
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
      <div className='m-4'>
        <IssueBook data={issueData} setData={setIssueData} handleSubmit={issueBook} />
      </div>
    </div>
  )
}

export default Dashboard