import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import User from '../User/User'
import { fetchUsers } from '../../store/slices/usersSlice'
import { jwtDecode } from 'jwt-decode'
import { saveUserId } from '../../store/slices/loginSlice'

export default function Users() {

  const dispatch = useDispatch()
  const { usersInfo, deleteUser } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
    const decoded = jwtDecode(localStorage.getItem('access_token'))
    dispatch(saveUserId(decoded.userId))
  }, [])

  useEffect(() => {
    dispatch(fetchUsers())
  }, [deleteUser])

  return (
    <div className='users-container'>
      {Array.from(usersInfo).map((user) => 
        <User 
          key={user.id}
          id={user.id} 
          username={user.username} 
          fullname={user.fullname}
          email={user.email}
        />
      )}
    </div>
  )
}
