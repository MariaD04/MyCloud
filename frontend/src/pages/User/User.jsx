import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { deleteUserStatus } from '../../store/slices/usersSlice'
import { fetchDisk } from '../../store/slices/diskSlice'
import './User.css'

const apiUrl = import.meta.env.VITE_APP_API_URL

export default function User({ id, username, fullname, email, is__superuser }) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteUser = () => {
    axios
      .delete(`${apiUrl}/delete_user/${id}/`)
      .then(response => {
        dispatch(deleteUserStatus('success'))
      })
  }

  const getUserFiles = (e) => {
    e.preventDefault()
    dispatch(fetchDisk(id))
    navigate('/disk')
  }

  return (
    <div className='user-container'>
      <span className='username'>{username}</span>
      <span className='fullname'>{fullname}</span>
      <span className='email'>{email}</span>
      <span className='admin'>Admin - {is__superuser == true ? 'Да' : 'Нет'}</span>
      <div className='user-buttons'>
        <button className='files-button' onClick={getUserFiles}>❒</button>
        <button className='delete-button' onClick={deleteUser}>✘</button>
      </div>
    </div>
  )
}
