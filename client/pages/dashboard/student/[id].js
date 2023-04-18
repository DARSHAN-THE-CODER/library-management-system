import { APIURL } from '@/constants/api';
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function Dashboard() {
    const router = useRouter();

    const rowsPerPageOptions = [5] ;
    const [borrowings, setBorrowings] = useState([])

    const headers = [{
      id: "id",
      borrowDate: "Borrowed Date",
      dueDate: "Due Date",
      // book[title]: "Book Title",
    }]

    const bookheaders = [
      {
        id: "id",
        title: "Title",
      }
    ]

    useEffect(() => {
        if(router.query['id']){
            console.log(router.query['id'])
            axios.get(`${APIURL}/user/borrowings/${router.query['id']}`)
            .then((res) => {
              console.log(res.data)
              setBorrowings(res.data)
            })
            .catch((err) => {
              console.log(err)
            })
        }
    },[router])

    // console.log(borrowings)

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(borrowings);

    // Function to handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Function to handle rows per page change
    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearchQuery(e.target.value)
        const filtered = borrowings.filter((row) =>
            Object.values(row.book)
                .join(" ")
                .toLowerCase()
                .includes(keyword)
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    };


    const handleRowClick = (rowData) => {
        console.log(rowData);
        if(confirm("Are you sure you want to Return this book ?")){
            console.log("Return")
            axios.post(`${APIURL}/librarian/${1}/return/${rowData?.book?.id}/${rowData?.user?.id}`)
            .then((res) => {
              console.log(res.data)
              setBorrowings((prev) => prev.filter((item) => item.id !== rowData.id) )
              toast.success("Book Returned Successfully")
            })
            .catch((err) => {
              console.log(err)
              toast.error("Error Returning Book")
            })
        }
    };


    const totalPages = Math.ceil(borrowings.length / rowsPerPage);

    const lastIndex = currentPage * rowsPerPage;

    const firstIndex = lastIndex - rowsPerPage;

    const currentData = borrowings.slice(firstIndex, lastIndex);

    const handleRowDelete = (row) => {
        console.log(row)
    }


  return (
    <div className='h-screen'>
      <div className='text-3xl font-bold text-center m-10 text-blue-700'>Your Borrowings</div>

      <div className='p-4 m-4 border border-solid max-w-[100vw] overflow-x-auto'>
            {/* Table */}
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    className="px-2 py-1 text-gray-600 bg-gray-100 border rounded-md mr-2"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <table className="w-full border-collapse table-auto">
                {/* Table Headers */}
                <thead>
                    <tr>
                        {Object.keys(headers[0]).map((header, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-gray-800 uppercase font-bold"
                            >
                                {header}
                            </th>
                        ))}
                        {
                          Object.keys(bookheaders[0]).map((header, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-gray-800 uppercase font-bold"
                            >
                                {header}
                            </th>
                        ))
                        }
                        <th className="px-6 py-3"></th>
                    </tr>
                </thead>
                {/* Table Data */}
                <tbody className=''>
                    {(searchQuery ? filteredData : currentData).map((row, index) => (
                        <tr key={index} className="border-t border-gray-200">
                            {
                                Object.keys(headers[0]).map((key, index) => (
                                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                                        {row[key]} 
                                    </td>
                                ))
                            }

                            {
                                Object.keys(bookheaders[0]).map((key, index) => (
                                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                                        {row.book[key]}
                                    </td>
                                ))
                            }

                            <td className="px-6 py-4 whitespace-nowrap flex gap-3">
                                {/* Render action button */}
                                <button
                                    className="px-3 py-1 text-white bg-blue-500 rounded"
                                    onClick={() => handleRowClick(row)}
                                >
                                    Return Book 
                                </button>
                                {/* <button
                                    className="px-3 py-1 text-white bg-red-500 rounded"
                                    onClick={() => handleRowDelete(row)}
                                >
                                    Delete 
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">

                <div className="flex items-center">
                    <span className="mr-2">Rows per page:</span>
                    <select
                        className="px-2 py-1 text-gray-600 bg-gray-100 border rounded-md"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                    >
                        {rowsPerPageOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center">
                    <span className="mr-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="px-3 py-1 text-gray-600 bg-gray-100 border rounded-md"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <button
                        className="px-3 py-1 text-gray-600 bg-gray-100 border rounded-md ml-2"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard