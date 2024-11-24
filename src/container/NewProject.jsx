import React, { useEffect, useState } from 'react'
import SplitPane from 'react-split-pane'
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from 'react-icons/fa'
import { FcSettings } from 'react-icons/fc'
import { MdCheck, MdEdit } from 'react-icons/md'

import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Logo from '../assets/codepen-logo.png'
import { useSelector } from 'react-redux'
import UserProfileDetails from '../components/UserProfileDetails'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase.config'
import Alert from '../components/Alert'

export default function NewProject() {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [output, setOutput] = useState('')
  const [title, setTitle] = useState('Untitled')
  const [isTitle, setIsTitle] = useState(false)
  const [alert, setAlert] = useState(false)

  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    updateOutput()
  }, [html, css, js])

  if (!user) {
    console.error('User is not authenticated')
    return
  }

  const updateOutput = () => {
    const combineOutput = `
    <html>
      <head>
        <style>${css}</style>  
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
    `
    setOutput(combineOutput)
  }

  const saveProgram = async () => {
    try {
      const id = `${Date.now()}`
      const _doc = {
        id,
        title,
        html,
        css,
        js,
        output,
        user,
      }
      await setDoc(doc(db, 'Projects', id), _doc)
      setAlert(true)
    } catch (error) {
      console.error('Failed to save project:', error)
    } finally {
      setTimeout(() => setAlert(false), 2000)
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
      <AnimatePresence>{alert && <Alert status={'Success'} alertMsg={'Project Saved'} />}</AnimatePresence>
      <header className="w-full flex items-start justify-between px-12 py-4">
        <div className="flex items-center justify-center gap-4">
          <Link to={'/home/projects'}>
            <img src={Logo} alt="Logo" className="w-32 h-auto object-contain" />
          </Link>

          <div className="flex flex-col items-start justify-start">
            <div className="flex items-center justify-center gap-3">
              <AnimatePresence>
                {isTitle ? (
                  <>
                    <motion.input
                      key={'TitleInput'}
                      type="text"
                      placeholder="Your Title"
                      className="px-3 py-2 rounded-md bg-transparent text-gray-400 text-base outline-none border-none"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <motion.p key={'titleLabel'} className="px-3 py-2 text-white text-lg">
                      {title}
                    </motion.p>
                  </>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isTitle ? (
                  <>
                    <motion.div
                      key={'MdCheck'}
                      whileTap={{ scale: 0.9 }}
                      className="cursor-pointer"
                      onClick={() => setIsTitle(false)}
                    >
                      <MdCheck className="text-2xl text-emerald-500" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      key={'MdEdit'}
                      whileTap={{ scale: 0.9 }}
                      className="text-2xl text-gray-400"
                      onClick={() => setIsTitle(true)}
                    >
                      <MdEdit className="text-2xl text-gray-400" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center px-3 -mt-2 gap-2">
              <p className="text-gray-400 text-sm">
                {user?.displayName ? user?.displayName : `${user?.email.split('@')[0]}`}
              </p>
              <motion.p
                whileTap={{ scale: 0.9 }}
                className="text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-gray-800 font-semibold cursor-pointer"
              >
                + Follow
              </motion.p>
            </div>
          </div>
        </div>

        {user && (
          <div className="flex items-center justify-center gap-4">
            <motion.button
              onClick={saveProgram}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-4 bg-gray-400 cursor-pointer text-base text-gray-800 font-semibold rounded-md"
            >
              Save
            </motion.button>
            <UserProfileDetails />
          </div>
        )}
      </header>
      <SplitPane split="horizontal" minSize={100} maxSize={-100} defaultSize="50%">
        <SplitPane split="vertical" minSize={300} maxSize={600} defaultSize="33%">
          <div className="w-full h-full flex flex-col items-start justify-start">
            <div className="w-full flex items-center justify-between">
              <div className="bg-gray-800 px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                <FaHtml5 className="text-xl text-red-500" />
                <p className="text-gray-400 font-semibold">HTML</p>
              </div>
              <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                <FcSettings className="text-xl" />
                <FaChevronDown className="text-xl text-gray-400" />
              </div>
            </div>
            <div className="w-full px-2">
              <CodeMirror
                value={html}
                height="600px"
                extensions={[javascript({ jsx: true })]}
                theme={'dark'}
                onChange={(value, viewUpdate) => {
                  setHtml(value)
                }}
              />
            </div>
          </div>

          <SplitPane split="vertical" minSize={300} maxSize={600} defaultSize="50%">
            <div className="w-full h-full flex flex-col items-start justify-start">
              <div className="w-full flex items-center justify-between">
                <div className="bg-gray-800 px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                  <FaCss3 className="text-xl text-blue-500" />
                  <p className="text-gray-400 font-semibold">CSS</p>
                </div>
                <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                  <FcSettings className="text-xl" />
                  <FaChevronDown className="text-xl text-gray-400" />
                </div>
              </div>
              <div className="w-full px-2">
                <CodeMirror
                  value={css}
                  height="600px"
                  extensions={[javascript({ jsx: true })]}
                  theme={'dark'}
                  onChange={(value, viewUpdate) => {
                    setCss(value)
                  }}
                />
              </div>
            </div>

            <div className="w-full h-full flex flex-col items-start justify-start">
              <div className="w-full flex items-center justify-between">
                <div className="bg-gray-800 px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                  <FaJs className="text-xl text-yellow-500" />
                  <p className="text-gray-400 font-semibold">JS</p>
                </div>
                <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                  <FcSettings className="text-xl" />
                  <FaChevronDown className="text-xl text-gray-400" />
                </div>
              </div>
              <div className="w-full px-2">
                <CodeMirror
                  value={js}
                  height="600px"
                  extensions={[javascript({ jsx: true })]}
                  theme={'dark'}
                  onChange={(value, viewUpdate) => {
                    setJs(value)
                  }}
                />
              </div>
            </div>
          </SplitPane>
        </SplitPane>
        <div className="bg-white" style={{ overflow: 'hidden', height: '100%' }}>
          <iframe srcDoc={output} title="Result" style={{ border: 'none', width: '100%', height: '100%' }} />
        </div>
      </SplitPane>
    </div>
  )
}
