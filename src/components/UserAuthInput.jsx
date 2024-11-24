import React, { useState } from 'react'
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function UserAuthInput({ label, placeHolder, isPass, setStateFunction, Icon, setGetEmailValidation }) {
  const [value, setValue] = useState('')
  const [showPass, setShowPass] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(false)

  const handleTextChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    setStateFunction(newValue)

    if (placeHolder === 'Email') {
      const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const status = emailRegexp.test(newValue)
      setIsEmailValid(status)
      setGetEmailValidation(status)
    }
  }

  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <label className="text-sm text-gray-300">{label}</label>
      <div
        className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200 ${
          !isEmailValid && placeHolder === 'Email' && value.length > 0 && 'border-2 border-red-500'
        }`}
      >
        <Icon className="text-gray-600 text-2xl" />
        <input
          onChange={handleTextChange}
          type={isPass && showPass ? 'password' : 'text'}
          placeholder={placeHolder}
          className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-gray-600 text-lg"
        />
        {isPass && (
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => setShowPass(!showPass)} className="cursor-pointer">
            {showPass ? (
              <FaEyeSlash className="text-gray-600 text-2xl" />
            ) : (
              <FaEye className="text-gray-600 text-2xl" />
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
