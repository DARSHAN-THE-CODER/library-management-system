import React, { useState, useEffect } from 'react'
import AddUserForm from '@/components/forms/AddUserForm'

import { toast } from "react-toastify"

import { useRouter } from "next/router"

import axios from "axios"

function Admin({loggedIn, setIsloggedIn}) {

    const router = useRouter();

    const [studentFormData, setStudentFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [librarianFormData, setLibrarianFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        if(localStorage.getItem('lmsuser') !== "admin" || !loggedIn){
            toast.error("You are not authorized to view this page, Please login as admin")
            router.push("/auth/admin")
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      };

    const handleStudentSubmit = (e) => {
        e.preventDefault();
        console.log(studentFormData);
        axios.post(`${APIURL}/user`, studentFormData)
            .then(res => {
                console.log(res.data)
                toast.success("Student Added Successfully")
                setStudentFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                });
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response.data || "Something went wrong")
            })
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main>
                <div className="container mx-auto py-12 px-4">

                    <div className="flex flex-col md:flex-row md:justify-between mb-8">
                        <div className="w-full md:w-1/2 md:mr-4 mb-4 md:mb-0">
                            <AddUserForm handleSubmit={handleSubmit} formData = {librarianFormData} setFormData={setLibrarianFormData} content={"Add Librarian"} />
                        </div>
                        <div className="w-full md:w-1/2 md:ml-4">
                            <AddUserForm handleSubmit={handleStudentSubmit} formData = {studentFormData} setFormData={setStudentFormData} content={"Add Student"} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Admin