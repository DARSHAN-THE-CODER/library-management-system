import Link from 'next/link'

import { toast} from "react-toastify"

import { useRouter } from 'next/router'

const Navbar = ({loggedIn , setIsloggedIn, routes, setRoutes}) => {

  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem('lmsuser')
    toast.success("Logged out successfully")
    setIsloggedIn(false);
    setRoutes([])
    router.push('/')
  }

  return (
    <nav className="flex items-center justify-between top-0 flex-wrap bg-blue-500 p-6 sticky">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/"><span className="font-semibold text-xl tracking-tight">Library Management System</span></Link>
      </div>
      { !loggedIn ? (<div className="flex">
        <Link href="/auth/admin">
          <p className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2">Admin Login</p>
        </Link>
        <Link href="/auth/student">
          <p className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2">Student Login</p>
        </Link>
        <Link href="/auth/librarian">
          <p className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Librarian Login</p>
        </Link>
      </div>) : (
        <div className="flex flex-wrap">
          {
            routes.map((route, index) => (
              <Link href={route.path} key={index}>
                <p className=" hover:bg-white mt-2 md:mt-0 hover:text-blue-700 text-white font-semibold py-2 px-4 border rounded shadow mr-2">{route.name}</p>
              </Link>
            ))
          }
          <button onClick={handleLogout}>
            <p className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2">Logout</p>
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar;
