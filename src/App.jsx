import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Home, NewProject } from './container'
import { auth, db } from './config/firebase.config'
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { Spinner } from './components'
import { useDispatch } from 'react-redux'
import { SET_USER } from './context/actions/userActions'
import { SET_PROJECTS } from './context/actions/projectActions'

export default function App() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setDoc(doc(db, 'users', userCred?.uid), userCred.providerData[0])
          .then(() => {
            dispatch(SET_USER(userCred?.providerData[0]))
            navigate('/home/projects', { replace: true })
            setIsLoading(false)
          })
          .catch((error) => {
            console.error('Error setting user data:', error)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
        navigate('/home/auth', { replace: true })
      }
    })

    return () => unsubscribe()
  }, [dispatch, navigate])

  useEffect(() => {
    const projectQuery = query(collection(db, 'Projects'), orderBy('id', 'desc'))

    const unsubscribe = onSnapshot(
      projectQuery,
      (querySnapshot) => {
        const projectsList = querySnapshot.docs.map((doc) => doc.data())
        dispatch(SET_PROJECTS(projectsList))
        setIsLoading(false)
      },
      (error) => {
        console.error('Error fetching projects:', error)
        setIsLoading(false)
      },
    )

    return unsubscribe
  }, [dispatch])

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <Spinner />
        </div>
      ) : (
        <div className="w-screen h-screen flex items-start justify-start overflow-hidden">
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/newProject" element={<NewProject />} />
            <Route path="*" element={<Navigate to={'/home'} />} />
          </Routes>
        </div>
      )}
    </>
  )
}
