import React, { useState } from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi2'
import { MdHome } from 'react-icons/md'
import { FaSearchengin } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Link, Route, Routes } from 'react-router-dom'
import Logo from '../assets/codepen-logo.png'
import Projects from './Projects'
import SignUp from './SignUp'
import { useDispatch, useSelector } from 'react-redux'
import { UserProfileDetails } from '../components'
import { SET_SEARCH_TERM } from '../context/actions/searchActions'

export default function Home() {
  const [isSideMenu, setIsSideMenu] = useState(false)
  const user = useSelector((state) => state.user?.user)
  const searchTerm = useSelector((state) => state.searchTerm.searchTerm || '')

  const dispatch = useDispatch()

  return (
    <>
      <div
        className={`w-2 ${
          isSideMenu ? 'w-2' : 'flex-[.2]'
        } min-h-screen max-h-screen relative bg-gray-800 px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSideMenu(!isSideMenu)}
          className="w-8 h-8 black rounded-tr-lg absolute -right-6 flex items-center justify-center cursor-pointer"
        >
          {!isSideMenu ? (
            <HiChevronDoubleLeft className="text-white text-xl bg-gray-800" />
          ) : (
            <HiChevronDoubleRight className="text-white text-xl bg-gray-800" />
          )}
        </motion.div>

        <div className="overflow-hidden w-full flex flex-col gap-4">
          <Link to={'/home'}>
            <img src={Logo} alt="Logo" className="object-contain w-72 h-auto" />
          </Link>
          <Link to={user ? '/newProject' : '/home/auth'}>
            <div className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200">
              <p className="text-gray-400 group-hover:text-gray-200">Start Coding</p>
            </div>
          </Link>

          {user && (
            <Link to={'/home/projects'} className="flex items-center justify-center gap-6">
              <MdHome className="text-gray-400 text-xl" />
              <p className="text-lg text-gray-400">Home</p>
            </Link>
          )}
        </div>
      </div>
      <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12">
        <div className="w-full flex items-center justify-center gap-3">
          <div className="bg-gray-800 w-full px-4 py-3 rounded-md flex items-center justify-center gap-3">
            <FaSearchengin className="text-2xl text-gray-400 " />
            <input
              type={searchTerm}
              className="flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-gray-400 placeholder:text-gray-600"
              placeholder="Search here..."
              onChange={(e) => dispatch(SET_SEARCH_TERM(e.target.value))}
            />
          </div>

          {!user && (
            <motion.div whileTap={{ scale: 0.9 }} className="flex items-center justify-center gap-3">
              <Link
                to={'/home/auth'}
                className="bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700"
              >
                SignUp
              </Link>
            </motion.div>
          )}

          {user && <UserProfileDetails />}
        </div>

        <div className="w-full">
          <Routes>
            <Route path="/*" element={<Projects />} />
            <Route path="/auth" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </>
  )
}
