import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Menus, signOutAction } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { slideUpOut } from '../animations'

export default function UserProfileDetails() {
  const user = useSelector((state) => state.user.user)
  const [isMenu, setIsMenu] = useState(false)
  return (
    <div className="flex items-center justify-center gap-4 relative">
      <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
        {user?.photoURL ? (
          <>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={user?.photoURL}
              alt={user?.displayName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </>
        ) : (
          <p className="text-xl text-white font-semibold capitalize">{user?.email[0]}</p>
        )}
      </div>

      <motion.div
        onClick={() => setIsMenu(!isMenu)}
        whileTap={{ scale: 0.9 }}
        className="p-4 rounded-md flex items-center justify-center bg-gray-800 cursor-pointer"
      >
        {!isMenu ? <FaChevronDown className="text-gray-400" /> : <FaChevronUp className="text-gray-400" />}
      </motion.div>

      <AnimatePresence>
        {isMenu && (
          <motion.div
            {...slideUpOut}
            className="bg-gray-800 absolute top-16 right-0 px-4 py-3 rounded-xl shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[225px]"
          >
            {Menus &&
              Menus.map((menu) => {
                return (
                  <Link
                    to={menu.uri}
                    key={menu.id}
                    className="text-gray-400 text-lg hover:bg-[rgba(256,256,256, 0.05)] px-2 py-1 w-full rounded-md"
                  >
                    {menu.name}
                  </Link>
                )
              })}
            <motion.p
              onClick={signOutAction}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 text-lg hover:bg-[rgba(256,256,256, 0.05)] px-2 py-1 w-full rounded-md cursor-pointer"
            >
              Sign Out
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
