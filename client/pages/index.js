import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Library Management System</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className="m-auto pt-12 flex flex-col justify-center overflow-hidden items-center h-[85vh]">

        <h1 className="text-6xl font-bold text-gray-800 text-center mt-auto">
          Welcome to the <span className="text-blue-500" style={{ "animation": "typing 1s steps(10, end) 1s 1 normal both, blink-caret .75s step-end infinite" }}>Library Management System</span>
        </h1>

        <div className="flex flex-col md:flex-row flex-wrap h-full justify-center items-center justify-items-center">
          <div className="bg-white p-4 rounded-lg shadow m-4 ">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Search for Books</h2>
            <p className="text-gray-700">Search our catalog of books to find what you're looking for.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow m-4 ">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Borrow Books</h2>
            <p className="text-gray-700">Borrow books from our library and keep track of your loans.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow m-4 ">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Manage Library</h2>
            <p className="text-gray-700">Admins and librarians can manage the library and its resources.</p>
          </div>
        </div>

      </main>

      <style jsx>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #000 }
        }
      `}</style>
    </>
  )
}