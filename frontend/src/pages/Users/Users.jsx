import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import User from '../User/User'
import { fetchUsers } from '../../store/slices/usersSlice'

export default function Users() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { usersInfo, deleteUser } = useSelector((state) => state.users)

  /*useEffect(() => {

  }, [deleteUser])*/

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div className='users-container'>
      
    </div>
  )
}
/*{Array.from(usersInfo).map((user) => 
        <User 
          key={user.id}
          id={user.id} 
          username={user.username} 
          fullname={user.fullname}
          email={user.email}
          is__superuser={user.is__superuser} 
        />
      )}*/