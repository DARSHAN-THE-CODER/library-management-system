import React from 'react'

function IssueBook({ handleSubmit, data, setData, heading }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };


    return (
        <div className="flex flex-col items-center justify-center mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {heading}
            </h2>
            <form className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="totalCopies"
                    >
                        Student Id
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="userId"
                        type="number"
                        name="userId"
                        placeholder="Student Id"
                        value={data.userId}
                        min={0}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="totalCopies"
                    >
                        Book Id
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="bookId"
                        type="number"
                        name="bookId"
                        placeholder="Book Id"
                        min={"0"}
                        value={data.bookId}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        {"Issue Book "}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default IssueBook