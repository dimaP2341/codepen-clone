import React, { useState } from 'react'
import Logo from '../assets/codepen-logo.png'
import { UserAuthInput } from '../components'
import { FaEnvelope, FaGithub } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import { AnimatePresence, motion } from 'framer-motion'
import { signInWithGitHub, signInWithGoogle } from '../utils/helpers'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase.config'
import { fadeInOut } from '../animations'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')

  const createNewUser = async () => {
    if (getEmailValidationStatus) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  const loginWithEmailPassword = async () => {
    if (getEmailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred)
          }
        })
        .catch((err) => {
          switch (true) {
            case err.message.includes('user-not-found'):
              setAlert(true)
              setAlertMsg('Invalid ID: User Not Found')
              break
            case err.message.includes('wrong-password'):
              setAlert(true)
              setAlertMsg('Password Mismatch')
              break
            default:
              setAlert(true)
              setAlertMsg('Temporarily disabled due to many failed login attempts')
              break
          }

          setInterval(() => {
            setAlert(false)
          }, 4000)
        })
    }
  }

  return (
    <div className="w-full py-6">
      <img src={Logo} className="object-contain w-32 opacity-50 h-auto" alt="Logo" />

      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="py-12 text-2xl text-gray-400">Join With Us!</p>

        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-gray-800 shadow-md flex flex-col items-center justify-center gap-8">
          <UserAuthInput
            label="Email"
            placeHolder="Email"
            isPass={false}
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidation={setGetEmailValidationStatus}
          />
          <UserAuthInput
            label="Password"
            placeHolder="Password"
            isPass={true}
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />

          <AnimatePresence>
            {alert && (
              <motion.p key={'AlertMessage'} {...fadeInOut} className="text-red-500">
                {alertMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {!isLogin ? (
            <motion.div
              onClick={createNewUser}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Sign In</p>
            </motion.div>
          ) : (
            <motion.div
              onClick={loginWithEmailPassword}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Login</p>
            </motion.div>
          )}

          {!isLogin ? (
            <p
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-400 flex items-center justify-center gap-3"
            >
              Already Have an account ? <span className="text-emerald-500 cursor-pointer">Login Here</span>
            </p>
          ) : (
            <p
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-400 flex items-center justify-center gap-3"
            >
              Doesn't Have an account ? <span className="text-emerald-500 cursor-pointer">Create Here</span>
            </p>
          )}

          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-red-50 rounded-md w-24"></div>
            <p className="text-sm text-red-50">OR</p>
            <div className="h-[1px] bg-red-50 rounded-md w-24"></div>
          </div>

          <motion.div
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-3 bg-gray-400 backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256, 256, 256, 0.4)] cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <FcGoogle className="text-3xl" />
            <p className="text-xl text-white">Sign In with Google</p>
          </motion.div>

          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-red-50 rounded-md w-24"></div>
            <p className="text-sm text-red-50">OR</p>
            <div className="h-[1px] bg-red-50 rounded-md w-24"></div>
          </div>

          <motion.div
            onClick={signInWithGitHub}
            className="flex items-center justify-center gap-3 bg-gray-400 backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256, 256, 256, 0.4)] cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className="text-3xl text-white" />
            <p className="text-xl text-white">Sign In with GitHub</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
