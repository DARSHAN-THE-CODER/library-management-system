import React, { useState } from 'react'

function AddBook({handleSubmit, book, setBook}) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="flex flex-col items-center justify-center mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Add a new book
            </h2>
            <form className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={book?.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="author">
                        Author
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="author"
                        type="text"
                        name="author"
                        placeholder="Author"
                        value={book?.author}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="isbn">
                        ISBN
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="isbn"
                        type="text"
                        name="isbn"
                        placeholder="ISBN"
                        value={book?.isbn}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        name="description"
                        placeholder="Description"
                        rows="3"
                        value={book?.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="totalCopies"
                    >
                        Total Copies
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="totalCopies"
                        type="number"
                        name="totalCopies"
                        placeholder="Total Copies"
                        value={book.totalCopies}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="availableCopies">
                        Available Copies
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="availableCopies"
                        type="number"
                        name="availableCopies"
                        placeholder="Available Copies"
                        value={book?.availableCopies}
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        {" Add Book "}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddBook