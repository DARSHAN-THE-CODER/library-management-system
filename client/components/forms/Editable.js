import axios from "axios";
import React, { useState } from "react";
import { APIURL } from "@/constants/api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const Form = ({ fields, type, id }) => {
  const [formValues, setFormValues] = useState(fields);
  const [editMode, setEditMode] = useState(true);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);

    if(type === "admin"){
        axios.patch(`${APIURL}/admin/id/${id}`, formValues)
        .then(res => {
            console.log(res.data)
            toast.success('Updated Successfully')
        }
        )
        .catch(err => {
            console.log(err)
            toast.error('Update Failed')
        }
        )
    }

    if(type === "librarian"){
        axios.patch(`${APIURL}/librarian/id/${id}`, formValues)
        .then(res => {
            console.log(res.data)
            toast.success('Updated Successfully')
        }
        )
        .catch(err => {
            console.log(err)
            toast.error('Update Failed')
        }
        )
    }

    if(type === "student"){
        axios.patch(`${APIURL}/user/id/${id}`, formValues)
        .then(res => {
            console.log(res.data)
            toast.success('Updated Successfully')
        }
        )
        .catch(err => {
            console.log(err)
            toast.error('Update Failed')
        }
        )
    }
    
    router.push(`/dashboard`)

  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <form onSubmit={handleSubmit} className="p-6">
        {Object.keys(formValues).map((key) => (
          <div key={key} className="mb-4">
            <label
              htmlFor={key}
              className="block text-gray-700 font-bold mb-2"
            >
              {key}
            </label>
            <input
              type="text"
              name={key}
              value={formValues[key]}
              onChange={handleInputChange}
              readOnly={!editMode}
              className={`${
                editMode ? "bg-white" : "bg-gray-100"
              } appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500`}
            />
          </div>
        ))}
        <div className="flex items-center justify-between">
          {!editMode ? (
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setFormValues(fields);
                }}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
